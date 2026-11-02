#!/usr/bin/env node
/* Static validation of all chapter scripts — no browser needed.  Run: node tests/validate.js
   Checks: every lesson / achievement / ending / resource / speaker / background / expression id exists. */
const path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
global.document = undefined;
const load = (f) => require(path.join(root, f));
['js/sprites.js', 'js/art.js', 'js/data/lessons.js', 'js/data/achievements.js', 'js/data/endings.js', 'js/data/resources.js',
 'js/chapters/index.js'].forEach(load);
for (const id of window.CHAPTER_ORDER) load(`js/chapters/ch${id.slice(2).padStart(2, '0')}.js`);

const BGS = ['title', 'bedroom', 'street', 'library', 'field', 'night', 'badend'];
const SPEAKERS = new Set([...Object.keys(window.Art.CAST), '@route']);
const PHONE = new Set([...SPEAKERS, 'me', 'sys']);
const errors = [], warn = [];
let interactions = 0, todos = 0, badEnds = 0;

function walk(list, where) {
  list.forEach((c, i) => {
    const at = `${where}[${i}]`;
    if (!c || typeof c !== 'object') return errors.push(`${at}: not an object`);
    if (c.bg && !BGS.includes(c.bg)) errors.push(`${at}: unknown bg "${c.bg}"`);
    if (c.s && !SPEAKERS.has(c.s)) errors.push(`${at}: unknown speaker "${c.s}"`);
    if (c.show && !SPEAKERS.has(c.show)) errors.push(`${at}: unknown show "${c.show}"`);
    if (c.txt && !PHONE.has(c.txt)) errors.push(`${at}: unknown txt sender "${c.txt}"`);
    if (c.e && !window.Art.EXPR[c.e]) errors.push(`${at}: unknown expression "${c.e}"`);
    if (c.ach && !window.ACHIEVEMENTS[c.ach]) errors.push(`${at}: unknown achievement "${c.ach}"`);
    if (c.ending && !window.ENDINGS[c.ending]) errors.push(`${at}: unknown ending "${c.ending}"`);
    if (c.resource && !window.RESOURCES[c.resource]) errors.push(`${at}: unknown resource "${c.resource}"`);
    if (c.n && /TODO/.test(c.n)) todos++;
    if (c.badEnd) badEnds++;
    if (c.choice) {
      interactions++;
      if (!Array.isArray(c.opts) || c.opts.length < 2) errors.push(`${at}: choice needs 2+ opts`);
      c.opts.forEach((o, j) => {
        if (!o.t) errors.push(`${at}.opts[${j}]: missing text`);
        if (o.lesson && !window.LESSONS[o.lesson]) errors.push(`${at}.opts[${j}]: unknown lesson "${o.lesson}"`);
        if (o.ach && !window.ACHIEVEMENTS[o.ach]) errors.push(`${at}.opts[${j}]: unknown achievement "${o.ach}"`);
        if (o.fx) for (const k of Object.keys(o.fx)) if (!['hina', 'rei', 'mio', 'kaede', 'yuna', 'trust', 'wisdom', 'self'].includes(k)) errors.push(`${at}.opts[${j}]: unknown stat "${k}"`);
        walk(o.then || [], `${at}.opts[${j}].then`);
      });
    }
    if (c.if) { walk(c.then || [], `${at}.then`); walk(c.else || [], `${at}.else`); }
  });
}

const rows = [];
for (const id of window.CHAPTER_ORDER) {
  const ch = window.CHAPTERS[id];
  if (!ch) { errors.push(`chapter ${id} missing`); continue; }
  const before = [interactions, todos, badEnds];
  walk(ch.script, id);
  if (ch.script[ch.script.length - 1].chapterEnd !== true) errors.push(`${id}: last command must be {chapterEnd:true}`);
  rows.push(`${id.padEnd(5)} ${(ch.status || '?').padEnd(8)} choices:${String(interactions - before[0]).padStart(3)}  badEnds:${badEnds - before[2]}  todo:${todos - before[1]}  "${ch.subtitle}"`);
}
const used = new Set();
JSON.stringify(Object.values(window.CHAPTERS).map(c => c.script), (k, v) => { if (k === 'lesson') used.add(v); return v; });
const unused = Object.keys(window.LESSONS).filter(l => !used.has(l));
if (unused.length) warn.push(`lessons never unlocked: ${unused.join(', ')}`);

console.log(rows.join('\n'));
console.log(`\ntotal choices: ${interactions}, bad ends: ${badEnds}, lessons: ${Object.keys(window.LESSONS).length}, TODO beats: ${todos}`);
warn.forEach(w => console.log('WARN', w));
if (errors.length) { console.error('\nERRORS:\n' + errors.join('\n')); process.exit(1); }
console.log('OK');
