#!/usr/bin/env node
/* Static validation of all chapter scripts (talks expanded) — no browser needed.  Run: node tests/validate.js
   Checks every bg / speaker / expression / lesson / achievement / ending / resource / variant / talk / deeper id,
   fx keys, option shape, chapter metadata, that every outfit resolves to real art (with a usage report), and that every lesson is unlockable somewhere. */
const { expand } = require('./load.js');
const W = window;
const BGS = new Set(Object.keys(W.SPRITES.bg));
const CAST = new Set(Object.keys(W.Art.CAST));
const SPEAKERS = new Set([...CAST, '@route', '@talk']);
const PHONE = new Set([...SPEAKERS, 'me', 'sys']);
const HEROINES = ['hina', 'rei', 'mio', 'kaede', 'yuna', 'chloe', 'preet'];
const FX = new Set([...HEROINES, 'kenta', 'trust', 'wisdom', 'self', 'proj', 'goal', 'passion', 'health', 'wallet', 'cash', '@route', '@talk']);
const CAST_IDS = new Set(Object.keys(W.CAST || {}));
const fxOk = (k) => FX.has(k) || (/^(trust|aff)\.(\w+)$/.test(k) && CAST_IDS.has(k.split('.')[1]));
/* Cast commands (docs/CAST_BIBLE.md §5.9): ids, axes, flaw tags/states, judgement ids, and a 'why' for every change. */
const CID = (id) => CAST_IDS.has(id) || id === '@route' || id === '@talk';
const AXES = new Set([...(W.CAST_AXES || []), 'fit']);
const FLAW_STATES = ['hidden', 'seen', 'growing', 'resolved'];
function castCheck(c, at) {
  if (c.reveal) for (const [id, ax] of Object.entries(c.reveal)) {
    if (!CID(id)) errors.push(`${at}: reveal for unknown cast id "${id}"`);
    for (const a of [].concat(ax)) if (!AXES.has(a)) errors.push(`${at}: reveal of unknown axis "${a}"`);
  }
  if (c.grow) for (const [id, m] of Object.entries(c.grow)) {
    if (!CID(id)) errors.push(`${at}: grow for unknown cast id "${id}"`);
    for (const a of Object.keys(m)) if (!AXES.has(a)) errors.push(`${at}: grow of unknown axis "${a}"`);
  }
  if (c.flaw) for (const [id, m] of Object.entries(c.flaw)) {
    const C = W.CAST[id];
    if (!C && !CID(id)) errors.push(`${at}: flaw for unknown cast id "${id}"`);
    for (const [tag, st] of Object.entries(m)) {
      if (C && !(C.flaws || []).includes(tag)) errors.push(`${at}: unknown flaw tag "${tag}" for ${id}`);
      if (!FLAW_STATES.includes(st)) errors.push(`${at}: unknown flaw state "${st}"`);
    }
  }
  if ((c.reveal || c.grow || c.flaw) && !c.why) errors.push(`${at}: cast change without a "why"`);
  if (c.judge) {
    if (!(W.JUDGEMENTS || {})[c.judge.id]) errors.push(`${at}: unknown judgement "${c.judge.id}"`);
    if (c.judge.verdict && !['fair', 'unfair'].includes(c.judge.verdict)) errors.push(`${at}: judgement verdict must be fair|unfair`);
  }
  if (c.contact) for (const id of [].concat(c.contact)) if (!CID(id)) errors.push(`${at}: contact for unknown cast id "${id}"`);
}
const ENDING_IDS = new Set([...Object.keys(W.ENDINGS), '@auto']);
const errors = [], warn = [];
let interactions = 0, badEnds = 0, lines = 0;
const lessonsUsed = new Set(), variantsUsed = new Set();
const exprOk = (who, e) => !!W.Art.EXPR[e] || !!((W.SPRITES.chars[who] || {})[e]);

function walk(list, where) {
  list.forEach((c, i) => {
    const at = `${where}[${i}]`;
    if (!c || typeof c !== 'object') return errors.push(`${at}: not an object`);
    if (c.n || c.s || c.me || c.think || c.mochi || c.txt) lines++;
    if (c.bg && !BGS.has(c.bg)) errors.push(`${at}: unknown bg "${c.bg}"`);
    if (c.bgm && c.bgm !== 'auto' && !W.BGM.tracks[c.bgm]) errors.push(`${at}: unknown bgm track "${c.bgm}"`);
    // Walk-on NPCs: a capitalised name not in CAST shows a name tag with no sprite (engine.js). Lower-case = typo.
    if (c.s && !SPEAKERS.has(c.s) && !/^[A-Z]/.test(c.s)) errors.push(`${at}: unknown speaker "${c.s}"`);
    if (c.show && !SPEAKERS.has(c.show)) errors.push(`${at}: unknown show "${c.show}"`);
    if (c.txt && !PHONE.has(c.txt) && !/^[A-Z]/.test(c.txt)) errors.push(`${at}: unknown txt sender "${c.txt}"`);
    if (c.e && !exprOk(c.mochi ? 'mochi' : (c.s || c.show), c.e)) errors.push(`${at}: unknown expression "${c.e}"`);
    if (c.ach && !W.ACHIEVEMENTS[c.ach]) errors.push(`${at}: unknown achievement "${c.ach}"`);
    if (c.ending && !ENDING_IDS.has(c.ending)) errors.push(`${at}: unknown ending "${c.ending}"`);
    if (c.resource && !W.RESOURCES[c.resource]) errors.push(`${at}: unknown resource "${c.resource}"`);
    if (c.variant) { variantsUsed.add(c.variant); if (!W.VARIANTS[c.variant]) errors.push(`${at}: unknown variant pool "${c.variant}"`); }
    if (c.lesson) { lessonsUsed.add(c.lesson); if (!W.LESSONS[c.lesson]) errors.push(`${at}: unknown lesson "${c.lesson}"`); }
    if (c.deeper && !W.THINK[c.deeper]) errors.push(`${at}: unknown Think Deeper card "${c.deeper}"`);
    if (c.fx) for (const k of Object.keys(c.fx)) if (!fxOk(k)) errors.push(`${at}: unknown fx key "${k}"`);
    castCheck(c, at);
    if (c.badEnd) {
      badEnds++;
      if (!c.badEnd.title || !c.badEnd.text) errors.push(`${at}: bad end needs title + text`);
      if (c.badEnd.resource && !W.RESOURCES[c.badEnd.resource]) errors.push(`${at}: unknown bad-end resource "${c.badEnd.resource}"`);
    }
    if (c.choice) {
      interactions++;
      if (!Array.isArray(c.opts) || c.opts.length < 2) errors.push(`${at}: choice needs 2+ opts`);
      c.opts.forEach((o, j) => {
        const ot = `${at}.opts[${j}]`;
        if (!o.t) errors.push(`${ot}: missing text`);
        if (o.lesson) { lessonsUsed.add(o.lesson); if (!W.LESSONS[o.lesson]) errors.push(`${ot}: unknown lesson "${o.lesson}"`); }
        if (o.ach && !W.ACHIEVEMENTS[o.ach]) errors.push(`${ot}: unknown achievement "${o.ach}"`);
        if (o.fx) for (const k of Object.keys(o.fx)) if (!fxOk(k)) errors.push(`${ot}: unknown fx key "${k}"`);
        if (o.val) for (const k of Object.keys(o.val)) if (!W.VALUE_AXES.includes(k)) errors.push(`${ot}: unknown value axis "${k}"`);
        walk(o.then || [], `${ot}.then`);
      });
    }
    if (c.if) { walk(c.then || [], `${at}.then`); walk(c.else || [], `${at}.else`); }
  });
}

// Variant pools: every entry needs lines; every pool needs a generic fallback; speakers/expressions must exist.
for (const [pool, entries] of Object.entries(W.VARIANTS)) {
  if (!entries.some(W.SIM.isGeneric)) errors.push(`variant pool "${pool}" has no generic fallback entry`);
  entries.forEach((v, i) => { if (!Array.isArray(v.lines) || !v.lines.length) errors.push(`variant ${pool}[${i}] has no lines`); else walk(v.lines, `variant ${pool}[${i}]`); });
}
for (const [id, t] of Object.entries(W.THINK)) if (!t.title || !(t.sg || []).length || !(t.sg || []).every((f) => /^https:\/\//.test(f.src))) errors.push(`think card ${id}: needs title + sourced SG facts`);

const rows = [];
let totalLines = 0;
for (const id of W.CHAPTER_ORDER) {
  const ch = W.CHAPTERS[id];
  if (!ch) { errors.push(`chapter ${id} missing`); continue; }
  if (!ch.part || !ch.subtitle || !ch.title) errors.push(`${id}: needs part/title/subtitle`);
  const b = [interactions, badEnds, lines];
  const script = expand(ch.script);
  walk(script, id);
  if (script[script.length - 1].chapterEnd !== true) errors.push(`${id}: last command must be {chapterEnd:true}`);
  totalLines += lines - b[2];
  rows.push(`${id.padEnd(5)} lines:${String(lines - b[2]).padStart(4)}  choices:${String(interactions - b[0]).padStart(3)}  badEnds:${String(badEnds - b[1]).padStart(2)}  "${ch.subtitle}"`);
}
const unused = Object.keys(W.LESSONS).filter((l) => !lessonsUsed.has(l));
if (unused.length) errors.push(`lessons never unlocked: ${unused.join(', ')}`);
const unusedPools = Object.keys(W.VARIANTS).filter((p) => !variantsUsed.has(p));
if (unusedPools.length) warn.push(`variant pools never played: ${unusedPools.join(', ')}`);
const unusedEnd = Object.keys(W.ENDINGS).filter((e) => !JSON.stringify(Object.values(W.CHAPTERS).map((c) => c.script)).includes(`"${e}"`));

// ---------- wardrobe: every outfit a script asks for must resolve to real art (js/sprites.js) ----------
// Walks every chapter (talks expanded, every branch) tracking the outfit map the engine would hold:
// bg clears it, {outfit} merges into it, {show/s, o} sets one. Each person on stage in a scene is counted once.
const SPR = W.SPRITES.chars;
const outfitOk = (id, o) => !!(SPR[id] && SPR[id].outfits && SPR[id].outfits[o]);
const defOutfit = (id) => (W.SPRITES.outfits[id] || {}).default;
for (const [name, map] of Object.entries(W.WARDROBE || {})) for (const [id, o] of Object.entries(map)) {
  if (!SPR[id]) errors.push(`WARDROBE.${name}: unknown character "${id}"`);
  else if (!outfitOk(id, o)) errors.push(`WARDROBE.${name}: ${id} has no "${o}" art`);
}
for (const [id, c] of Object.entries(W.CAST || {})) for (const o of c.outfits || []) if (SPR[id] && !outfitOk(id, o)) errors.push(`CAST.${id}.outfits: "${o}" has no art`);
const usage = {}; let unset = 0;
const ROUTE = ['hina', 'mio', 'kaede', 'yuna', 'chloe', 'preet', 'rei'];
function wear(list, where, st) {
  list.forEach((c, i) => {
    const at = `${where}[${i}]`;
    if (!c || typeof c !== 'object') return;
    if (c.bg !== undefined) { st.scene = at; st.map = {}; }
    if (c.outfit) for (const [k, o0] of Object.entries(c.outfit)) {
      const o = typeof o0 === 'string' ? o0 : o0 && o0.id;
      for (const id of k === '@route' ? ROUTE : [k]) {
        if (!SPR[id]) errors.push(`${at}: outfit for unknown character "${id}"`);
        else if (!outfitOk(id, o)) errors.push(`${at}: ${id} has no "${o}" art (would fall back to ${defOutfit(id)})`);
        st.map[id] = o;
      }
    }
    const who = c.show || c.s;
    if (who && who !== '@talk') for (const id of who === '@route' ? ROUTE : [who]) {
      if (!SPR[id]) continue;
      if (c.o) { if (!outfitOk(id, c.o)) errors.push(`${at}: ${id} has no "${c.o}" art`); st.map[id] = c.o; }
      const o = st.map[id] || `(default ${defOutfit(id)})`;
      if (!st.map[id]) unset++;
      const key = `${st.scene}|${id}`;
      if (!st.counted.has(key + '|' + o)) { st.counted.add(key + '|' + o); ((usage[id] = usage[id] || {})[o] = (usage[id][o] || 0) + 1); }
    }
    // Branches start from the current map; what they set carries on after them (as in the engine).
    const ends = [];
    const sub = (l, w) => { const b = { ...st, map: { ...st.map } }; wear(l, w, b); ends.push(b); };
    if (c.choice) c.opts.forEach((o, j) => sub(o.then || [], `${at}.opts[${j}].then`));
    if (c.if) { sub(c.then || [], `${at}.then`); sub(c.else || [], `${at}.else`); }
    const start = { ...st.map };
    for (const b of ends) {
      if (b.scene !== st.scene) st.scene = b.scene;
      for (const [k, o] of Object.entries(b.map)) if (o !== start[k]) st.map[k] = o;
    }
  });
  return st;
}
for (const id of W.CHAPTER_ORDER) if (W.CHAPTERS[id]) wear(expand(W.CHAPTERS[id].script), id, { scene: id, map: {}, counted: new Set() });
const wardrobeReport = Object.keys(SPR).filter((id) => usage[id]).map((id) =>
  `  ${id.padEnd(7)} ` + Object.entries(usage[id]).sort((a, b) => b[1] - a[1]).map(([o, n]) => `${o} ${n}`).join(' · '));
if (unset) warn.push(`${unset} on-stage appearances with no scene outfit set (default art used)`);

// ---------- music ----------
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
for (const [id, t] of Object.entries(W.BGM.tracks)) {
  if (!fs.existsSync(path.join(root, t.src))) errors.push(`bgm track ${id}: missing file ${t.src}`);
  if (!(t.loop > 0)) errors.push(`bgm track ${id}: needs a loop length`);
}
for (const bg of BGS) if (!W.BGM.byBg[bg]) errors.push(`bg "${bg}" has no music in BGM.byBg`);
for (const [bg, tr] of Object.entries(W.BGM.byBg)) if (!W.BGM.tracks[tr]) errors.push(`BGM.byBg.${bg}: unknown track "${tr}"`);
for (const [m, tr] of Object.entries(W.BGM.moments)) if (!W.BGM.tracks[tr]) errors.push(`BGM.moments.${m}: unknown track "${tr}"`);

// ---------- locales: every English key needs a translation in every ready pack ----------
const { collect } = require('../tools/i18n-extract.js');
const EN = W.I18N['en-SG'];
const ph = (x) => (x.match(/\{[^}]+\}/g) || []).sort().join(' ');
const allText = collect(true).flatMap((g) => g.strings);
const coverage = [];
for (const [loc, pack] of Object.entries(W.I18N)) {
  if (loc === 'en-SG' || !pack.ready) continue;
  for (const k of Object.keys(EN.ui)) {
    if (!pack.ui[k]) errors.push(`${loc}: missing ui "${k}"`);
    else if (ph(EN.ui[k]) !== ph(pack.ui[k])) errors.push(`${loc}: ui "${k}" placeholders differ`);
  }
  for (const k of Object.keys(EN.names)) if (!pack.names[k] || !pack.names[k].short || !pack.names[k].full) errors.push(`${loc}: missing name "${k}"`);
  const T = pack.text || {};
  let have = 0;
  for (const en of allText) {
    const tr = T[en];
    if (!tr) { errors.push(`${loc}: untranslated "${en.slice(0, 50).replace(/\n/g, ' ')}"`); continue; }
    have++;
    if (ph(en) !== ph(tr)) errors.push(`${loc}: placeholders differ in "${en.slice(0, 50)}"`);
    if ((en.match(/\n/g) || []).length !== (tr.match(/\n/g) || []).length) errors.push(`${loc}: line breaks differ in "${en.slice(0, 50)}"`);
  }
  coverage.push(`${loc} ${have}/${allText.length} text, ${Object.keys(pack.ui).length}/${Object.keys(EN.ui).length} ui`);
}

console.log(rows.join('\n'));
console.log(`\nchapters: ${rows.length} · script lines: ${totalLines} · choices: ${interactions} · bad ends: ${badEnds} · lessons: ${Object.keys(W.LESSONS).length} · variant pools: ${Object.keys(W.VARIANTS).length} · think cards: ${Object.keys(W.THINK).length}`);
if (unusedEnd.length) console.log(`(endings chosen at runtime by SIM.endingFor: ${unusedEnd.length})`);
console.log(`\nwardrobe (scenes per outfit, every branch counted):\n${wardrobeReport.join('\n')}`);
console.log(`music: ${Object.keys(W.BGM.tracks).length} tracks · locales: ${coverage.join(' · ') || 'en only'}`);
warn.forEach((w) => console.log('WARN', w));
if (errors.length) { console.error('\nERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
