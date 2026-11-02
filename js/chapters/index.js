/* Chapter registry and shared script helpers.
   Each chapter file does: CHAPTERS.chXX = { id, part, title, subtitle, next, status, script }.
   This file is loaded by the browser AND by tests/validate.js + tests/softlock.js (no DOM here). */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTER_ORDER = Array.from({ length: 20 }, (_, i) => 'ch' + (i + 1));

window.SIM = {
  love: (k, v) => (s) => (s.stats[k] || 0) >= v,
  isRoute: (r) => (s) => s.route === r,
  inRelationship: (s) => !!s.route && s.route !== 'solo',
  lifeAvg: (s) => Math.round((s.life.goal + s.life.passion + s.life.health + s.life.wallet) / 4),
  integrity: (s) => (s.stats.wisdom || 0) + (s.stats.self || 0),
};
const SIM = window.SIM;

/* Part III-V: play `relationship` beats on a heroine route, `solo` beats on the solo route. */
SIM.split = (relationship, solo) => ({ if: SIM.inRelationship, then: relationship, else: solo || [] });
/* One branch per route heroine, with a fallback: SIM.byRoute({ hina:[...], mio:[...] }, [...fallback]). */
SIM.byRoute = (map, fallback) => {
  const keys = Object.keys(map);
  const build = (i) => (i >= keys.length ? (fallback || []) : [{ if: SIM.isRoute(keys[i]), then: map[keys[i]], else: build(i + 1) }]);
  return build(0)[0] || { n: '' };
};

/* Free evening: one mini choice spent on goal / passion / health / friends / partner.
   Partner time has diminishing returns after the first evening in a chapter (flag eveningPartner_<ch>). */
SIM.evening = (ch, label) => ({ choice: label || 'A free evening. Where does it go?', opts: [
  { t: 'Study, properly, phone in the other room.', fx: { goal: 6, wisdom: 1 }, then: [{ variant: 'evening.goal' }] },
  { t: 'An hour on {passion}. Just for you.', fx: { passion: 7, self: 1 }, then: [{ variant: 'evening.passion' }] },
  { t: 'A run at the park connector, a proper dinner, bed by eleven.', fx: { health: 7 }, then: [{ variant: 'evening.health' }] },
  { t: 'Kopi with Haziq. He has been weird lately.', fx: { kenta: 4, health: 2 }, then: [{ variant: 'evening.friends' }] },
  { t: 'Call {her}. Again.', if: (s) => SIM.inRelationship(s), fx: { '@route': 2 }, then: [
    { if: (s) => s.flags['eveningPartner_' + ch], then: [{ fx: { '@route': -1, goal: -3 } }, { variant: 'evening.partnerAgain' }],
      else: [{ flag: 'eveningPartner_' + ch }, { fx: { trust: 2 } }, { variant: 'evening.partner' }] },
  ] },
] });

/* Ch9+ gate: integrity < 0 or Your Life < 20 → Mochi's remedial lesson (never a hard block). */
SIM.gate = () => ({ if: (s) => SIM.integrity(s) < 0 || SIM.lifeAvg(s) < 20, then: [
  { bg: 'bedroom' },
  { mochi: 'Stop. Before we go on, rookie, a remedial lesson. Mandatory. I made slides.', e: 'angry' },
  { mochi: 'Love IQ and Self-respect are below zero, or your own life is running on empty. A relationship cannot fix either one.', e: 'sad' },
  { choice: 'Mochi is waiting. What do you do?', opts: [
    { t: 'Sleep, eat something green, finish one assignment, play {passion} for an hour.', fx: { goal: 10, passion: 10, health: 10, self: 8, wisdom: 8 }, lesson: 'selfrespect', then: [
      { mochi: 'Look at that. A person with a life. Much more datable. Also much more alive.', e: 'happy' }] },
    { t: '"I\'ll fix it later. After I get a girlfriend."', fx: { goal: 8, passion: 8, health: 8, self: 5, wisdom: 5 }, then: [
      { mochi: 'Wrong order. I am fixing it now anyway. You may thank me in Chapter 20.', e: 'smug' }] },
  ] },
] });

/* ---------- variant pools (deterministic; see docs/VALUE_PROFILES.md §6) ---------- */
SIM.hash = (...parts) => {
  let h = 2166136261;
  for (const ch of parts.join('|')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
SIM.valueOf = (id, axis) => ((window.VALUES || {})[id] || {})[axis] || 0;
const cmp = (v, expr) => {
  const m = String(expr).match(/^(<=|>=|<|>|=|==)?\s*(-?\d+)$/);
  if (!m) return v === expr;
  const n = +m[2];
  switch (m[1]) { case '<=': return v <= n; case '>=': return v >= n; case '<': return v < n; case '>': return v > n; default: return v === n; }
};
SIM.whoCtx = (s) => s.talkWith || (s.route && s.route !== 'solo' ? s.route : s.route === 'solo' ? 'solo' : null);
function whenOk(v, s, pool) {
  const w = v.when;
  if (!w) return { ok: true, score: 0 };
  if (typeof w === 'function') return { ok: !!w(s), score: 1 };
  let score = 0;
  const ctx = SIM.whoCtx(s);
  if (w.values) for (const [k, e] of Object.entries(w.values)) {
    const val = k.startsWith('player.') ? (s.values || {})[k.slice(7)] || 0 : SIM.valueOf(ctx, k);
    if (!cmp(val, e)) return { ok: false }; score += 2;
  }
  if (w.flags) for (const f of w.flags) { if (!s.flags[f]) return { ok: false }; score += 1; }
  if (w.notFlags) for (const f of w.notFlags) { if (s.flags[f]) return { ok: false }; score += 1; }
  if (w.stats) for (const [k, e] of Object.entries(w.stats)) { if (!cmp(s.stats[k] || 0, e)) return { ok: false }; score += 1; }
  if (w.visit && !cmp((s.poolVisits || {})[pool] || 0, w.visit)) return { ok: false };
  if (w.route && s.route !== w.route) return { ok: false };
  return { ok: true, score };
}
const chOk = (c, n) => !c || c === '*' || (Array.isArray(c) ? n >= c[0] && n <= (c[1] || c[0]) : c === n);
SIM.isGeneric = (v) => (!v.who || v.who === '*') && (!v.ch || v.ch === '*') && !v.when;
SIM.pickVariant = (poolId, s, chN) => {
  const pool = (window.VARIANTS || {})[poolId];
  if (!pool || !pool.length) return null;
  const ctx = SIM.whoCtx(s);
  const seen = new Set(s.seenVariants || []);
  const live = [];
  for (const v of pool) {
    if (v.who && v.who !== '*') {
      const list = Array.isArray(v.who) ? v.who : [v.who];
      if (!list.includes(ctx)) continue;
    }
    if (!chOk(v.ch, chN)) continue;
    if (v.once && seen.has(v.id)) continue;
    const w = whenOk(v, s, poolId);
    if (!w.ok) continue;
    const score = (v.who && v.who !== '*' ? 4 : 0) + (v.ch && v.ch !== '*' ? 2 : 0) + w.score + (seen.has(v.id) ? -10 : 0);
    live.push({ v, score });
  }
  if (!live.length) return pool.find(SIM.isGeneric) || pool[0];
  const top = Math.max(...live.map((x) => x.score));
  const best = live.filter((x) => x.score === top).map((x) => x.v);
  return best[SIM.hash(s.seed || 0, poolId, (s.poolVisits || {})[poolId] || 0) % best.length];
};

/* ---------- partner talk template (docs/VALUE_PROFILES.md §5.1) ----------
   Expanded at compile time into ordinary commands; the reply pools are chosen at run time by the value gap. */
SIM.gap = (axis) => (s) => Math.abs(((s.values || {})[axis] || 0) - SIM.valueOf(SIM.whoCtx(s) === 'solo' ? 'kenta' : SIM.whoCtx(s), axis));
SIM.pool = (topic, slot, fallback) => ((window.VARIANTS || {})[`talk.${topic}.${slot}`] ? `talk.${topic}.${slot}` : fallback);
SIM.talk = (topic, withWho) => {
  const T = (window.TALKS || {})[topic];
  if (!T) throw new Error('unknown talk topic ' + topic);
  const W = withWho || T.with || '@route';
  const out = [{ with: W, solo: T.solo || 'kenta' }];
  if (T.hook) out.push(...T.hook);
  out.push({ variant: `talk.${topic}.her` });
  const shareThen = [];
  if (T.kind === 'integrity') {
    shareThen.push({ choice: T.stancePrompt || 'Where do you stand?', opts: T.stances.map((st) => ({
      t: st.t, fx: st.ok ? { wisdom: 4, self: 3, '@talk': 3 } : Object.assign({ wisdom: -4, '@talk': -4, trust: -3 }, st.fx || {}),
      lesson: st.ok ? 'integrityfloor' : st.lesson, flag: st.ok ? `talk_${topic}_ok` : `talk_${topic}_wrong`,
      then: [{ variant: st.ok ? SIM.pool(topic, 'ok', 'talk.agree') : SIM.pool(topic, 'wrong', 'talk.integrityWrong') }].concat(st.then || []),
    })) });
  } else {
    const reply = [{ if: (s) => SIM.gap(T.axis)(s) <= 1, then: [{ variant: SIM.pool(topic, 'agree', 'talk.agree') }],
      else: [{ if: (s) => SIM.gap(T.axis)(s) >= 3, then: [{ variant: SIM.pool(topic, 'clash', 'talk.clash') }].concat(T.dealbreaker ? [SIM.dealbreaker(topic)] : []),
        else: [{ variant: SIM.pool(topic, 'differ', 'talk.differ') }] }] }];
    shareThen.push({ choice: T.stancePrompt || 'And your own view?', opts: T.stances.map((st) => ({
      t: st.t, val: { [T.axis]: st.v }, lesson: 'differentok', then: reply.concat(st.then || []) })) });
  }
  if (T.after) shareThen.push(...T.after);
  out.push({ choice: T.prompt || 'How do you answer?', opts: [
    { t: T.share, fx: { '@talk': 3, trust: 3, self: 2, wisdom: 1 }, then: shareThen },
    { t: T.cave || '"Yeah. Whatever you think. I agree."', fx: { self: -6, '@talk': 1 }, lesson: 'dontcave', flag: `talk_${topic}_caved`, then: [{ variant: 'talk.cave' }] },
    { t: T.contempt, fx: { '@talk': -8, trust: -6, wisdom: -3 }, lesson: 'nocontempt', flag: `talk_${topic}_contempt`, then: [{ variant: 'talk.contempt' }] },
    { t: T.avoid || '"Eh. Can we talk about something else?"', fx: { '@talk': -1 }, flag: `talk_${topic}_avoided`, then: [{ variant: 'talk.avoid' }] },
  ] });
  out.push({ with: null });
  return out;
};
SIM.dealbreaker = (topic) => ({ choice: 'This one goes deep. What now?', opts: [
  { t: '"Let\'s keep talking about it. We have time, and we\'ll both change."', fx: { trust: 2, wisdom: 2 }, then: [{ variant: 'talk.keepTalking' }] },
  { t: '"Is there a middle we could both actually live with?"', fx: { trust: 2, wisdom: 2 }, then: [{ variant: 'talk.middle' }] },
  { t: '"I think we might want different lives. I would rather say it kindly now than pretend."', fx: { wisdom: 4, self: 4 }, lesson: 'dealbreaker', flag: 'namedDealbreaker', then: [{ variant: 'talk.differentLives' }] },
] });

/* ---------- endings (GAME_DESIGN §7): Your Life 40 · integrity 35 · trust 25; Rose Filter subtracts ---------- */
SIM.score = (s) => {
  const life = SIM.lifeAvg(s);
  const integ = Math.max(0, Math.min(100, (s.stats.wisdom + s.stats.self) / 2));
  const rel = s.route && s.route !== 'solo' ? s.stats.trust : Math.max(0, Math.min(100, (s.stats.kenta || 0) * 1.5 + 20));
  return Math.round(life * 0.4 + integ * 0.35 + rel * 0.25 - Math.max(0, s.stats.proj - 20) * 0.3);
};
SIM.endingFor = (s) => {
  const life = SIM.lifeAvg(s), st = s.stats, r = s.route && s.route !== 'solo' ? s.route : null;
  if (life < 30) return 'side_character';
  if (life >= 75 && st.self >= 60 && st.wisdom >= 60 && st.proj <= 20) return 'own_story';
  if (s.flags.kindGoodbye) return 'kind_goodbye_' + s.flags.kindGoodbye;
  if (r) {
    if (st.trust >= 70 && st.self >= 40 && st.wisdom >= 60 && life >= 55 && s.flags.supportedDream && s.flags.keptDream && st.proj <= 40) return 'true_' + r;
    return 'normal_' + r;
  }
  if ((st.kenta || 0) >= 60 && s.flags.broStall) return 'bro_end';
  if (st.self >= 50 && life >= 55) return 'solo_growth';
  return 'still_searching';
};
SIM.allLessons = (s) => Object.keys(window.LESSONS || {}).every((id) => s.lessons.includes(id));

/* Resolve a {with} command: '@route' → route heroine (solo → c.solo), '@top' → closest heroine. */
SIM.HEROINES = ['hina', 'mio', 'kaede', 'yuna'];
SIM.resolveWith = (c, s) => {
  const r = s.route && s.route !== 'solo' ? s.route : null;
  if (c.with === '@route') return r || c.solo || 'kenta';
  if (c.with === '@top') return r || SIM.HEROINES.reduce((a, b) => ((s.stats[b] || 0) > (s.stats[a] || 0) ? b : a), 'hina');
  return c.with;
};
