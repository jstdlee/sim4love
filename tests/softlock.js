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
const path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
global.document = undefined;
const load = (f) => require(path.join(root, f));
['js/sprites.js', 'js/art.js', 'js/data/lessons.js', 'js/data/achievements.js', 'js/data/endings.js', 'js/data/resources.js',
 'js/chapters/index.js'].forEach(load);
for (const id of window.CHAPTER_ORDER) load(`js/chapters/ch${id.slice(2).padStart(2, '0')}.js`);

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? +process.argv[i + 1] : d; };
const RUNS = arg('--runs', 12);
let seed = arg('--seed', 20261102);
const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const pick = (a) => a[Math.floor(rnd() * a.length)];

// ---------- compile (mirror of engine.js compile) ----------
function compile(list) {
  const out = [];
  (function emit(arr) {
    for (const cmd of arr) {
      if (cmd.choice) {
        const c = { choice: cmd.choice, opts: [] }; out.push(c);
        const ends = [];
        for (const o of cmd.opts) {
          c.opts.push({ t: o.t, fx: o.fx, flag: o.flag, show: o.if, pc: out.length });
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
const STAT_KEYS = ['hina', 'rei', 'mio', 'kaede', 'yuna', 'trust', 'wisdom', 'self'];

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
  const flags = {}; FLAG_NAMES.forEach((f) => { if (rnd() < 0.5) flags[f] = true; });
  const route = chIndex >= 4 ? pick(['hina', 'mio', 'kaede', 'yuna', 'solo']) : null;
  const lessons = Object.keys(window.LESSONS).filter(() => rnd() < (rnd() < 0.1 ? 1 : 0.5));
  return { route, stats, flags, lessons, badEnds: [], achievements: [], endings: [] };
}
function applyFx(S, fx) { if (fx) for (const [k, v] of Object.entries(fx)) S.stats[k] = (S.stats[k] || 0) + v; }

/* Runs one chapter. force = {pc, opt}: when the choice at `pc` is reached and option `opt` is visible, take it.
   Returns { ok, reason, S, hit } — hit = the forced option was actually taken. */
function runChapter(prog, S0, force) {
  let S = clone(S0), pc = 0, steps = 0, hit = false, checkpoint = null;
  const tried = new Map(); // choice pc → set of option indexes that led to a bad end
  while (steps++ < 20000) {
    if (pc >= prog.length) return { ok: false, reason: 'ran past the end of the program without chapterEnd', S, hit };
    const c = prog[pc++];
    if (c.jmp !== undefined) { pc = c.jmp; continue; }
    if (c.cond) { if (!c.cond(S)) pc = c.jfalse; continue; }
    if (c.flag !== undefined) { typeof c.flag === 'string' ? (S.flags[c.flag] = true) : Object.assign(S.flags, c.flag); continue; }
    if (c.fx) { applyFx(S, c.fx); continue; }
    if (c.route) { S.route = c.route; if (c.route !== 'solo') S.stats.trust = Math.max(S.stats.trust, 20); continue; }
    if (c.ending) { if (!S.endings.includes(c.ending)) S.endings.push(c.ending); continue; }
    if (c.chapterEnd) return { ok: true, S, hit };
    if (c.choice) {
      const here = pc - 1;
      const visible = c.opts.map((o, i) => i).filter((i) => !c.opts[i].show || c.opts[i].show(S));
      if (!visible.length) return { ok: false, reason: `empty choice set at "${c.choice}"`, S, hit };
      const bad = tried.get(here) || new Set();
      const left = visible.filter((i) => !bad.has(i));
      if (!left.length) return { ok: false, reason: `every visible option of "${c.choice}" is a bad end (rewind loop)`, S, hit };
      let i;
      if (force && force.pc === here && left.includes(force.opt) && !hit) { i = force.opt; hit = true; }
      else i = pick(left);
      checkpoint = { S: clone(S), pc: here, i };
      const o = c.opts[i];
      applyFx(S, o.fx); if (o.flag) S.flags[o.flag] = true;
      pc = o.pc; continue;
    }
    if (c.badEnd) {
      if (!checkpoint) return { ok: false, reason: 'bad end with no checkpoint', S, hit };
      if (!tried.has(checkpoint.pc)) tried.set(checkpoint.pc, new Set());
      tried.get(checkpoint.pc).add(checkpoint.i);
      const keep = S.badEnds.concat(c.badEnd.title);
      S = Object.assign(checkpoint.S, { badEnds: keep }); pc = checkpoint.pc; checkpoint = null;
      continue;
    }
    // presentation-only commands (bg, show, hide, n, s, me, think, mochi, phone, txt, resource, ach): no flow effect
  }
  return { ok: false, reason: 'step budget exceeded (infinite loop?)', S, hit };
}

let sims = 0, options = 0, neverVisible = 0; // neverVisible: options no random state could reach
const rows = [];
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
      if (!hits) { neverVisible++; warns.push(`${id} "${c.choice}" → "${o.t}" was never reached in ${tries} random states (unreachable content?)`); }
    });
  }
  rows.push(`${id.padEnd(5)} choices:${String(choices.length).padStart(3)}  options:${String(choices.reduce((n, [c]) => n + c.opts.length, 0)).padStart(3)}  ${fails ? 'FAIL' : 'ok'}`);
});

// ---------- 3. full-game random playthroughs ----------
const FULL = Math.max(50, RUNS * 10);
let fullOk = 0;
const endingsSeen = new Set();
for (let r = 0; r < FULL; r++) {
  let S = { route: null, stats: Object.fromEntries(STAT_KEYS.map((k) => [k, 0])), flags: {}, lessons: [], badEnds: [], achievements: [], endings: [] };
  let ok = true;
  for (const id of window.CHAPTER_ORDER) {
    const res = runChapter(compile(window.CHAPTERS[id].script), S, null);
    if (!res.ok) { errors.push(`full playthrough #${r} stuck in ${id}: ${res.reason}`); ok = false; break; }
    S = res.S;
  }
  if (ok && !S.endings.length) { errors.push(`full playthrough #${r} finished with no ending recorded`); ok = false; }
  if (ok) { fullOk++; S.endings.forEach((e) => endingsSeen.add(e)); }
}

console.log(rows.join('\n'));
console.log(`\noptions checked: ${options} · chapter simulations: ${sims} · full playthroughs: ${fullOk}/${FULL} · endings reached: ${[...endingsSeen].sort().join(', ')}`);
warns.forEach((w) => console.log('WARN', w));
if (errors.length) { console.error('\nSOFTLOCK ERRORS:\n' + [...new Set(errors)].join('\n')); process.exit(1); }
console.log('OK — no softlocks found');
