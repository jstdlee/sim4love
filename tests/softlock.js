#!/usr/bin/env node
/* Softlock checker — no browser needed.  Run: node tests/softlock.js [--runs N] [--seed S]
   Proves that the story can always move forward:
   1. Static: every choice has at least one UNGATED option (the fallback shown when every `if` fails);
      every bad end sits inside a choice option (so "rewind" has a checkpoint); every chapter ends with
      {chapterEnd:true}; nothing follows a bad end in the same block (unreachable).
   2. Reachability: for EVERY option of EVERY choice, simulate the chapter from many random player states,
      force that option when it is visible, play on with random choices, and require that {chapterEnd} is reached.
      Fails on: an empty choice set, a choice where every visible option is a bad end (rewind loop),
      running off the end of the program, or a step budget overrun (infinite loop).
   3. Full game: random playthroughs from a fresh save carry state across all chapters and must reach the last
      chapter's end with at least one ending recorded.
   The interpreter below mirrors compile()/step() in js/engine.js — keep them in sync. */
const { expand } = require('./load.js');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? +process.argv[i + 1] : d; };
const RUNS = arg('--runs', 12);
let seed = arg('--seed', 20261102);
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const pick = (a) => a[Math.floor(rnd() * a.length)];

// ---------- compile (mirror of engine.js compile) ----------
function compile(list) {
  list = expand(list);
  const out = [];
  (function emit(arr) {
    for (const cmd of arr) {
      if (cmd.choice) {
        const c = { choice: cmd.choice, opts: [] }; out.push(c);
        const ends = [];
        for (const o of cmd.opts) {
          c.opts.push({ t: o.t, fx: o.fx, val: o.val, flag: o.flag, lesson: o.lesson, ach: o.ach, rose: o.rose, show: o.if, sig: o.sig, clarity: o.clarity, lieTo: o.lieTo, honestHard: o.honestHard, pc: out.length });
          emit(o.then || []);
          const j = { jmp: -1 }; out.push(j); ends.push(j);
        }
        ends.forEach((j) => (j.jmp = out.length));
      } else if (cmd.if) {
        const br = { cond: cmd.if, jfalse: -1 }; out.push(br);
        emit(cmd.then || []);
        const j = { jmp: -1 }; out.push(j);
        br.jfalse = out.length;
        emit(cmd.else || []);
        j.jmp = out.length;
      } else out.push(cmd);
    }
  })(list);
  return out;
}

const errors = [], warns = [];
const STAT_KEYS = ['hina', 'rei', 'mio', 'kaede', 'yuna', 'chloe', 'preet', 'ava', 'kenta', 'trust', 'wisdom', 'self', 'proj'];
const ROUTES = window.SIM.HEROINES.slice();
const CS = window.CastSim;
const castWho = (S) => (k) => (k === '@route' ? routeKey(S) || 'kenta' : k === '@talk' ? S.talkWith || routeKey(S) || 'kenta' : k);
const LIFE_KEYS = ['goal', 'passion', 'health', 'wallet'];
const clampN = (v, a, b) => Math.max(a, Math.min(b, v));
const routeKey = (S) => (S.route && S.route !== 'solo' ? S.route : null);
const freshState = () => ({ route: null, stats: Object.fromEntries(STAT_KEYS.map((k) => [k, 0])),
  life: { goal: 40, passion: 20, health: 60, wallet: 50 }, money: 150, values: Object.fromEntries((window.VALUE_AXES || []).map((a) => [a, 0])), flags: {}, lessons: [],
  badEnds: [], achievements: [], endings: [], reflections: {}, talkWith: null });

// ---------- 1. static checks ----------
const FLAG_NAMES = new Set();
function scanFlags(v) {
  if (typeof v === 'function') { for (const m of v.toString().matchAll(/flags\.(\w+)/g)) FLAG_NAMES.add(m[1]); return; }
  if (Array.isArray(v)) return v.forEach(scanFlags);
  if (v && typeof v === 'object') {
    if (typeof v.flag === 'string') FLAG_NAMES.add(v.flag);
    else if (v.flag && typeof v.flag === 'object') Object.keys(v.flag).forEach((k) => FLAG_NAMES.add(k));
    Object.values(v).forEach(scanFlags);
  }
}
function staticWalk(list, where, inOption) {
  list.forEach((c, i) => {
    const at = `${where}[${i}]`;
    if (c.badEnd) {
      if (!inOption) errors.push(`${at}: bad end outside a choice option (rewind has no checkpoint)`);
      if (i < list.length - 1) warns.push(`${at}: ${list.length - 1 - i} command(s) after a bad end are unreachable`);
    }
    if (c.chapterEnd && where.includes('.')) errors.push(`${at}: chapterEnd inside a nested block`);
    if (c.choice) {
      const ungated = c.opts.filter((o) => !o.if).length;
      if (!ungated) errors.push(`${at}: choice "${c.choice}" has no ungated fallback option`);
      c.opts.forEach((o, j) => staticWalk(o.then || [], `${at}.opts[${j}]`, true));
    }
    if (c.if) { staticWalk(c.then || [], `${at}.then`, inOption); staticWalk(c.else || [], `${at}.else`, inOption); }
  });
}
for (const id of window.CHAPTER_ORDER) {
  const ch = window.CHAPTERS[id];
  scanFlags(ch.script);
  staticWalk(ch.script, id, false);
  if (!ch.script.length || ch.script[ch.script.length - 1].chapterEnd !== true) errors.push(`${id}: last command must be {chapterEnd:true}`);
}

// ---------- 2. simulation ----------
const clone = (o) => JSON.parse(JSON.stringify(o));
function randomState(chIndex) {
  const stats = {}; STAT_KEYS.forEach((k) => (stats[k] = Math.round(rnd() * 120 - 20)));
  stats.trust = clampN(stats.trust, 0, 100); stats.proj = clampN(stats.proj, 0, 100);
  const life = Object.fromEntries(LIFE_KEYS.map((k) => [k, Math.round(rnd() * 100)]));
  const flags = {}; FLAG_NAMES.forEach((f) => { if (rnd() < 0.5) flags[f] = true; });
  const route = chIndex >= 8 ? pick(ROUTES.concat('solo')) : null;
  if (flags.kindGoodbye) flags.kindGoodbye = route === 'solo' ? pick(ROUTES) : undefined; // value flag: heroine id
  if (flags.passion) flags.passion = pick(Object.keys(window.PASSIONS || { music: 1 }));
  const lessons = Object.keys(window.LESSONS).filter(() => rnd() < (rnd() < 0.1 ? 1 : 0.5));
  const reflections = {}; Object.keys(window.THINK || {}).forEach((k) => { if (rnd() < 0.5) reflections[k] = { lens: null }; });
  const values = Object.fromEntries((window.VALUE_AXES || []).map((a) => [a, Math.round(rnd() * 4 - 2)]));
  const S = Object.assign(freshState(), { route, stats, life, flags, lessons, reflections, values, money: Math.round(rnd() * 600 - 100) });
  // cast layer: random reveals/flaws/trust, and the social toggle on or off
  S.chN = chIndex + 1; CS.init(S); S.opts.social = rnd() < 0.5;
  for (const e of Object.values(S.cast)) { e.trust = Math.round(rnd() * 100); e.aff = Math.round(rnd() * 100); Object.keys(e.seen).forEach((a) => { if (rnd() < 0.3) e.seen[a] = true; }); }
  return S;
}
/* mirror of engine.js applyFx */
function applyFx(S, fx) {
  if (!fx) return;
  for (const [k0, d] of Object.entries(fx)) {
    const k = k0 === '@route' ? routeKey(S) : k0 === '@talk' ? (S.stats[S.talkWith || routeKey(S) || 'kenta'] !== undefined ? (S.talkWith || routeKey(S) || 'kenta') : null) : k0;
    if (!k || !d) continue;
    if (/^(trust|aff)\./.test(k)) { if (S.cast) CS.fx(S, k, d); continue; }
    if (k === 'trust' && !routeKey(S)) continue;
    if (k === 'cash') { S.money += d; if (!fx.wallet) S.life.wallet = clampN(S.life.wallet + clampN(Math.round(d / 10), -20, 20), 0, 100); continue; }
    if (LIFE_KEYS.includes(k)) { S.life[k] = clampN(S.life[k] + d, 0, 100); continue; }
    S.stats[k] = (S.stats[k] || 0) + d;
    if (k === 'trust' || k === 'proj') S.stats[k] = clampN(S.stats[k], 0, 100);
  }
}
const addLesson = (S, id) => { if (id && !S.lessons.includes(id)) S.lessons.push(id); };
const addAch = (S, id) => { if (id && !S.achievements.includes(id)) S.achievements.push(id); };
/* policy: 'random' or 'greedy' (a thoughtful player: the option with the healthiest fx, small random tie-break) */
let POLICY = 'random';
const GOOD = { wisdom: 1, self: 1, trust: 1, '@route': 0.5, kenta: 0.4, goal: 0.6, passion: 0.6, health: 0.6, wallet: 0.6, cash: 0.05, proj: -1.5 };
const NAMES = { hina: 'Hanis.', mio: 'Xin Yi.', kaede: 'Kavya.', yuna: 'Elise.', chloe: 'Chloe.', preet: 'Preet.', ava: 'Ava.' };
let TARGET = null; // greedy on a heroine route: also courts her and confesses to her
const optScore = (o) => Object.entries(o.fx || {}).reduce((n, [k, v]) => n + (GOOD[k] || 0) * v + (k === TARGET ? v : 0), 0)
  + (o.rose ? 3 : 0) + (TARGET && o.t === NAMES[TARGET] ? 1000 : 0) + rnd() * 0.5;

/* Runs one chapter. force = {pc, opt}: when the choice at `pc` is reached and option `opt` is visible, take it.
   Returns { ok, reason, S, hit } — hit = the forced option was actually taken. */
function runChapter(prog, S0, force) {
  let S = clone(S0), pc = 0, steps = 0, hit = false, checkpoint = null;
  CS.begin(S, S.chN || 1);
  const tried = new Map(); // choice pc → set of option indexes that led to a bad end
  while (steps++ < 20000) {
    if (pc >= prog.length) return { ok: false, reason: 'ran past the end of the program without chapterEnd', S, hit };
    const c = prog[pc++];
    if (c.jmp !== undefined) { pc = c.jmp; continue; }
    if (c.cond) { if (!c.cond(S)) pc = c.jfalse; continue; }
    if (c.variant) continue;
    if (c.with !== undefined && !c.talk) { S.talkWith = window.SIM.resolveWith(c, S); continue; }
    if (c.lesson) { addLesson(S, c.lesson); continue; }
    if (c.ach) { addAch(S, c.ach); continue; }
    if (c.deeper) { S.reflections[c.deeper] = S.reflections[c.deeper] || { lens: null }; continue; }
    if (c.flag !== undefined) { typeof c.flag === 'string' ? (S.flags[c.flag] = true) : Object.assign(S.flags, c.flag); continue; }
    if (c.fx) { applyFx(S, c.fx); continue; }
    if (c.reveal || c.grow || c.flaw || c.judge || c.contact) { CS.cmd(S, c, castWho(S)); continue; }
    if (c.show || c.s) { const k = castWho(S)(c.show || c.s); if (S.cast[k]) CS.stage(S, k); }
    if (c.val) { Object.entries(c.val).forEach(([a, x]) => { S.values[a] = clampN(x, -2, 2); }); continue; }
    if (c.route) { S.route = c.route; if (c.route !== 'solo') S.stats.trust = Math.max(S.stats.trust, 20); continue; }
    if (c.ending) {
      const e = c.ending === '@auto' ? window.SIM.endingFor(S) : c.ending;
      if (!window.ENDINGS[e]) return { ok: false, reason: `ending "${e}" does not exist`, S, hit };
      if (!S.endings.includes(e)) S.endings.push(e); continue;
    }
    if (c.chapterEnd) { CS.chapterEnd(S); for (const [id, e] of Object.entries(S.cast)) if (!(e.trust >= 0 && e.trust <= 100)) return { ok: false, reason: `cast trust out of range for ${id}`, S, hit }; return { ok: true, S, hit }; }
    if (c.choice) {
      const here = pc - 1;
      let visible = c.opts.map((o, i) => i).filter((i) => !c.opts[i].show || c.opts[i].show(S));
      if (S.stats.proj > 60 && visible.some((i) => !c.opts[i].rose)) visible = visible.filter((i) => !c.opts[i].rose); // Rose Filter
      if (!visible.length) return { ok: false, reason: `empty choice set at "${c.choice}"`, S, hit };
      const bad = tried.get(here) || new Set();
      const left = visible.filter((i) => !bad.has(i));
      if (!left.length) return { ok: false, reason: `every visible option of "${c.choice}" is a bad end (rewind loop)`, S, hit };
      let i;
      if (force && force.pc === here && left.includes(force.opt) && !hit) { i = force.opt; hit = true; }
      else if (POLICY === 'greedy') i = left.reduce((a, b) => (optScore(c.opts[b]) > optScore(c.opts[a]) ? b : a));
      else i = pick(left);
      checkpoint = { S: clone(S), pc: here, i };
      const o = c.opts[i];
      CS.choose(S, o, Object.keys(S.cs.stage), castWho(S));
      applyFx(S, o.fx); addLesson(S, o.lesson); addAch(S, o.ach);
      if (o.val) Object.entries(o.val).forEach(([a, x]) => { S.values[a] = clampN(x, -2, 2); });
      if (o.flag) typeof o.flag === 'string' ? (S.flags[o.flag] = true) : Object.assign(S.flags, o.flag);
      pc = o.pc; continue;
    }
    if (c.badEnd) {
      if (!checkpoint) return { ok: false, reason: 'bad end with no checkpoint', S, hit };
      if (!tried.has(checkpoint.pc)) tried.set(checkpoint.pc, new Set());
      tried.get(checkpoint.pc).add(checkpoint.i);
      const keep = S.badEnds.concat(c.badEnd.title);
      S = Object.assign(checkpoint.S, { badEnds: keep }); pc = checkpoint.pc; checkpoint = null;
      if (S.stats.proj > 60) S.stats.proj = 60; // mirror of engine rewind: the Rose Filter lifts after a bad end
      continue;
    }
    // presentation-only commands (bg, show, hide, n, s, me, think, mochi, phone, txt, resource, ach): no flow effect
  }
  return { ok: false, reason: 'step budget exceeded (infinite loop?)', S, hit };
}

let sims = 0, options = 0, neverVisible = 0; // neverVisible: options no random state could reach
const rows = [];
const reachedKeys = new Set(), unreachedKeys = new Map();
window.CHAPTER_ORDER.forEach((id, chIndex) => {
  const prog = compile(window.CHAPTERS[id].script);
  const choices = prog.map((c, pc) => [c, pc]).filter(([c]) => c.choice);
  let fails = 0;
  for (const [c, pc] of choices) {
    c.opts.forEach((o, opt) => {
      options++;
      // RUNS runs where the forced option is actually taken; give up after RUNS * 40 attempts (gated/deep options).
      let hits = 0, tries = 0;
      while (hits < RUNS && tries < RUNS * 40) {
        tries++; sims++;
        const res = runChapter(prog, randomState(chIndex), { pc, opt });
        if (res.hit) hits++;
        if (!res.ok) { fails++; errors.push(`${id} choice "${c.choice}" option "${o.t}": ${res.reason}`); break; }
      }
      const key = `${id} "${c.choice}" → "${o.t}"`; // shared blocks (talk replies) compile to several copies: warn only if no copy is reachable
      if (hits) reachedKeys.add(key); else unreachedKeys.set(key, tries);
    });
  }
  rows.push(`${id.padEnd(5)} choices:${String(choices.length).padStart(3)}  options:${String(choices.reduce((n, [c]) => n + c.opts.length, 0)).padStart(3)}  ${fails ? 'FAIL' : 'ok'}`);
});

for (const [key, tries] of unreachedKeys) if (!reachedKeys.has(key)) { neverVisible++; warns.push(`${key} was never reached in ${tries} random states (gated by design?)`); }

// ---------- 3. full-game random playthroughs ----------
const FULL = Math.max(50, RUNS * 10);
let fullOk = 0;
const endingsSeen = new Set();
const tally = { random: {}, greedy: {} };
const lessonPct = { random: [], greedy: [] };
const TARGETS = [null].concat(ROUTES);
for (let r = 0; r < FULL * 2; r++) {
  POLICY = r < FULL ? 'random' : 'greedy';
  TARGET = POLICY === 'greedy' ? TARGETS[r % TARGETS.length] : null;
  let S = freshState();
  let ok = true;
  for (const id of window.CHAPTER_ORDER) {
    S.chN = window.CHAPTER_ORDER.indexOf(id) + 1; if (!S.opts) { CS.init(S); S.opts.social = r % 2 === 0; }
    const res = runChapter(compile(window.CHAPTERS[id].script), S, null);
    if (!res.ok) { errors.push(`full playthrough #${r} stuck in ${id}: ${res.reason}`); ok = false; break; }
    S = res.S;
  }
  if (ok && !S.endings.length) { errors.push(`full playthrough #${r} finished with no ending recorded`); ok = false; }
  if (ok) {
    fullOk++; S.endings.forEach((e) => endingsSeen.add(e));
    let main = S.endings[0];
    if (main === 'own_story') { // which route/solo ending sits beneath it (calibration of true_* / bro_end thresholds)
      const T = JSON.parse(JSON.stringify(S)); T.stats.proj = Math.max(T.stats.proj, 21);
      main += '>' + window.SIM.endingFor(T);
    }
    tally[POLICY][main] = (tally[POLICY][main] || 0) + 1;
    lessonPct[POLICY].push(S.lessons.length / Object.keys(window.LESSONS).length);
  }
}
POLICY = 'random'; TARGET = null;
if (!(tally.greedy.true_ava || Object.keys(tally.greedy).some((k) => k.endsWith('>true_ava')))) errors.push('no greedy Ava-route playthrough reached true_ava');

console.log(rows.join('\n'));
const avg = (a) => (a.length ? Math.round((a.reduce((x, y) => x + y, 0) / a.length) * 100) : 0);
console.log(`\noptions checked: ${options} · chapter simulations: ${sims} · full playthroughs: ${fullOk}/${FULL * 2} · endings reached: ${[...endingsSeen].sort().join(', ')}`);
for (const p of ['random', 'greedy']) console.log(`  ${p.padEnd(6)} main endings: ${Object.entries(tally[p]).sort((a, b) => b[1] - a[1]).map(([e, n]) => `${e}×${n}`).join(', ')} · lessons avg ${avg(lessonPct[p])}% max ${Math.round(Math.max(0, ...lessonPct[p]) * 100)}%`);
warns.forEach((w) => console.log('WARN', w));
if (errors.length) { console.error('\nSOFTLOCK ERRORS:\n' + [...new Set(errors)].join('\n')); process.exit(1); }
console.log('OK — no softlocks found');
