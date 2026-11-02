#!/usr/bin/env node
/* Static validation of all chapter scripts (talks expanded) — no browser needed.  Run: node tests/validate.js
   Checks every bg / speaker / expression / lesson / achievement / ending / resource / variant / talk / deeper id,
   fx keys, option shape, chapter metadata, and that every lesson is unlockable somewhere. */
const { expand } = require('./load.js');
const W = window;
const BGS = new Set(Object.keys(W.SPRITES.bg));
const CAST = new Set(Object.keys(W.Art.CAST));
const SPEAKERS = new Set([...CAST, '@route', '@talk']);
const PHONE = new Set([...SPEAKERS, 'me', 'sys']);
const HEROINES = ['hina', 'rei', 'mio', 'kaede', 'yuna'];
const FX = new Set([...HEROINES, 'kenta', 'trust', 'wisdom', 'self', 'proj', 'goal', 'passion', 'health', 'wallet', 'cash', '@route', '@talk']);
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
    // Walk-on NPCs: a capitalised name not in CAST shows a name tag with no sprite (engine.js). Lower-case = typo.
    if (c.s && !SPEAKERS.has(c.s) && !/^[A-Z]/.test(c.s)) errors.push(`${at}: unknown speaker "${c.s}"`);
    if (c.show && !SPEAKERS.has(c.show)) errors.push(`${at}: unknown show "${c.show}"`);
    if (c.txt && !PHONE.has(c.txt)) errors.push(`${at}: unknown txt sender "${c.txt}"`);
    if (c.e && !exprOk(c.mochi ? 'mochi' : (c.s || c.show), c.e)) errors.push(`${at}: unknown expression "${c.e}"`);
    if (c.ach && !W.ACHIEVEMENTS[c.ach]) errors.push(`${at}: unknown achievement "${c.ach}"`);
    if (c.ending && !ENDING_IDS.has(c.ending)) errors.push(`${at}: unknown ending "${c.ending}"`);
    if (c.resource && !W.RESOURCES[c.resource]) errors.push(`${at}: unknown resource "${c.resource}"`);
    if (c.variant) { variantsUsed.add(c.variant); if (!W.VARIANTS[c.variant]) errors.push(`${at}: unknown variant pool "${c.variant}"`); }
    if (c.deeper && !W.THINK[c.deeper]) errors.push(`${at}: unknown Think Deeper card "${c.deeper}"`);
    if (c.fx) for (const k of Object.keys(c.fx)) if (!FX.has(k)) errors.push(`${at}: unknown fx key "${k}"`);
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
        if (o.fx) for (const k of Object.keys(o.fx)) if (!FX.has(k)) errors.push(`${ot}: unknown fx key "${k}"`);
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

console.log(rows.join('\n'));
console.log(`\nchapters: ${rows.length} · script lines: ${totalLines} · choices: ${interactions} · bad ends: ${badEnds} · lessons: ${Object.keys(W.LESSONS).length} · variant pools: ${Object.keys(W.VARIANTS).length} · think cards: ${Object.keys(W.THINK).length}`);
if (unusedEnd.length) console.log(`(endings chosen at runtime by SIM.endingFor: ${unusedEnd.length})`);
warn.forEach((w) => console.log('WARN', w));
if (errors.length) { console.error('\nERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
