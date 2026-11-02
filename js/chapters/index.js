/* Chapter registry. Each chapter file does: CHAPTERS.chXX = { id, title, subtitle, next, status, script }.
   status: 'done' = final dialogue · 'outline' = playable skeleton from docs/CHAPTERS.md, dialogue still to be written. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTER_ORDER = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'ch10'];

/* Shared helpers for chapter scripts */
window.SIM = {
  // A placeholder beat so outline chapters read well while dialogue is missing.
  todo: (text) => ({ n: `【TODO】 ${text}` }),
  // Route heroine has at least `v` Connection.
  love: (k, v) => (s) => (s.stats[k] || 0) >= v,
  isRoute: (r) => (s) => s.route === r,
  inRelationship: (s) => !!s.route && s.route !== 'solo',
};

/* Part II/III helper: play `relationship` beats on a heroine route, `solo` beats on the solo route. */
SIM.split = (relationship, solo) => ({ if: SIM.inRelationship, then: relationship, else: solo || [] });
