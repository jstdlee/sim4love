#!/usr/bin/env node
/* Collects every player-visible English string (story, choices, data cards) so locale packs can be checked
   for coverage. Usage: node tools/i18n-extract.js [--json] → prints the strings (or a JSON array). */
const { expand } = require('../tests/load.js');
const TEXT_KEYS = new Set(['t', 'n', 'mochi', 'me', 'think', 'choice', 'title', 'subtitle', 'part', 'next', 'text', 'hook', 'question',
  'reframe', 'share', 'contempt', 'cave', 'prompt', 'stancePrompt', 'type', 'label', 'verb', 'lines', 'phone', 'q', 'a', 'answer', 'body', 'note']);
const NAME_KEYS = new Set(['s', 'txt']);
function collect(grouped) {
  const seen = new Set();
  const groups = [];
  let cur = null;
  const group = (name) => { cur = { name, strings: [] }; groups.push(cur); };
  const add = (v) => { if (typeof v === 'string' && v.trim() && !/^@\w+$/.test(v) && /[A-Za-z]/.test(v) && !seen.has(v)) { seen.add(v); cur.strings.push(v); } };
  const walk = (o, key) => {
    if (typeof o === 'string') { if (TEXT_KEYS.has(key)) add(o); else if (NAME_KEYS.has(key) && /^[A-Z]/.test(o)) add(o); return; }
    if (Array.isArray(o)) { o.forEach((x) => walk(x, key)); return; }
    if (o && typeof o === 'object') for (const k in o) { if (k === 'src' || k === 'id') continue; walk(o[k], k); }
  };
  for (const id of window.CHAPTER_ORDER) {
    const c = window.CHAPTERS[id]; if (!c) continue;
    group(id);
    ['title', 'subtitle', 'part', 'next'].forEach((k) => add(c[k]));
    walk(expand(c.script), 'script');
  }
  group('talks');
  for (const topic of Object.keys(window.TALKS || {})) walk(expand(window.SIM.talk(topic, window.TALKS[topic].with)), 'script');
  walk(window.TALKS, 'talks');
  const pools = Object.keys(window.VARIANTS || {});
  group('variants-talk'); pools.filter((p) => p.startsWith('talk.')).forEach((p) => walk(window.VARIANTS[p], 'variants'));
  group('variants-place'); pools.filter((p) => !p.startsWith('talk.')).forEach((p) => walk(window.VARIANTS[p], 'variants'));
  group('lessons'); walk(window.LESSONS, 'lessons');
  group('think'); walk(window.THINK, 'think');
  group('endings'); walk(window.ENDINGS, 'endings');
  group('misc'); walk(window.ACHIEVEMENTS, 'ach'); walk(window.PASSIONS, 'passions');
  for (const r of Object.values(window.RESOURCES || {})) { add(r.title); r.lines.forEach(add); }
  return grouped ? groups.filter((g) => g.strings.length) : [...seen];
}
module.exports = { collect };
if (require.main === module) {
  if (process.argv.includes('--groups')) {
    for (const g of collect(true)) console.log(g.name.padEnd(16), String(g.strings.length).padStart(5), String(g.strings.reduce((a, s) => a + s.length, 0)).padStart(7));
  } else {
    const list = collect();
    if (process.argv.includes('--json')) console.log(JSON.stringify(list, null, 1));
    else { list.forEach((s) => console.log(s)); console.error(`${list.length} strings, ${list.reduce((a, s) => a + s.length, 0)} characters`); }
  }
}
