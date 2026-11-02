/* Shared loader for the Node tests: loads the same data files, in the same order, as index.html (no DOM). */
const path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
global.document = undefined;
const FILES = ['js/sprites.js', 'js/art.js', 'js/icons.js', 'js/i18n/en-SG.js', 'js/i18n/zh-SG.js', 'js/i18n/zh-SG.text.js', 'js/data/music.js',
  'js/data/values.js', 'js/data/lessons.js', 'js/data/achievements.js', 'js/data/endings.js', 'js/data/resources.js',
  'js/data/talks.js', 'js/data/think.js', 'js/data/variants/talks.js', 'js/data/variants/places.js', 'js/chapters/index.js'];
FILES.forEach((f) => require(path.join(root, f)));
for (const id of window.CHAPTER_ORDER) {
  const f = path.join(root, `js/chapters/ch${id.slice(2).padStart(2, '0')}.js`);
  try { require(f); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
}
/* Expand {talk} commands exactly as engine.js compile() does, so tests see the real script. */
function expand(list) {
  const out = [];
  for (const c of list) {
    if (c && c.talk) { out.push(...expand(window.SIM.talk(c.talk, c.with))); continue; }
    if (c && c.choice) { out.push(Object.assign({}, c, { opts: c.opts.map((o) => Object.assign({}, o, { then: expand(o.then || []) })) })); continue; }
    if (c && c.if) { out.push(Object.assign({}, c, { then: expand(c.then || []), else: expand(c.else || []) })); continue; }
    out.push(c);
  }
  return out;
}
module.exports = { root, FILES, expand };
