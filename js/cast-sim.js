/* Cast state and rules (docs/CAST_BIBLE.md §5): bars, hidden attributes, flaws, judgements, neglect, juggling,
   gossip and the chapter recap. Pure and DOM-free: the engine (browser) and tests/softlock.js (Node) share it.
   Everything is deterministic: no Math.random anywhere in this file. */
window.CastSim = (function () {
  const CAST = () => window.CAST || {};
  const AX = () => window.CAST_AXES;
  const STAT_IDS = ['hina', 'mio', 'kaede', 'yuna', 'rei', 'kenta', 'chloe', 'preet', 'ava'];   // Affection lives in S.stats
  const ROUTES = ['hina', 'mio', 'kaede', 'yuna', 'chloe', 'preet', 'ava'];                    // Ch8 route lock
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rel = (id) => (CAST()[id] || {}).rel;
  const baseAff = (id) => (rel(id) === 'family' ? 50 : rel(id) === 'mentor' ? 30 : 0);
  const baseTrust = (id) => (rel(id) === 'family' ? 40 : rel(id) === 'mentor' ? 30 : 20);
  const WHY = {
    blur: "You couldn't see her clearly this time.",
    juggle: "You flirted with more than one person and told none of them where things stood.",
    twotiming: "You flirted with someone else while you're together.",
    fuse: "You haven't really been there lately.",
    fuse2: "Still nothing from you. They've stopped expecting it.",
    quiet: "A long silence. Nobody said anything, but it was noticed.",
    gossip: "Word got around about how you've been acting.",
    gossipSeed: "People noticed. This will travel.",
    repair: "You came back and owned the silence.",
    met: "First meeting.",
  };

  function entry(id) {
    const c = CAST()[id];
    const e = { trust: baseTrust(id), radar: Object.assign({}, c.radar), grown: {}, seen: {}, flaws: {}, judgements: [],
      missed: 0, fuse: false, honestHard: 0, liesTo: 0, met: false };
    if (!STAT_IDS.includes(id)) e.aff = baseAff(id);
    AX().forEach((a) => { e.seen[a] = false; }); e.seen.fit = false;
    (c.flaws || []).forEach((f) => { e.flaws[f] = 'hidden'; });
    return e;
  }
  /* Build S.cast and the bookkeeping fields. Safe to call on every load; never overwrites existing data. */
  function init(S) {
    S.cast = S.cast || {};
    for (const id of Object.keys(CAST())) if (!S.cast[id]) S.cast[id] = entry(id);
    for (const id of STAT_IDS) if (typeof S.stats[id] !== 'number') S.stats[id] = 0;
    S.gossip = S.gossip || []; S.trustedIn = S.trustedIn || {}; S.changes = S.changes || []; S.recaps = S.recaps || {};
    S.opts = Object.assign({ social: true }, S.opts || {});
    S.valuesSet = S.valuesSet || [];
    S.cs = Object.assign({ ch: 0, stage: {}, contact: {}, sig: {}, clar: {}, blur: {}, q: [] }, S.cs || {});
    S.kd = S.kd || 0;
    return S;
  }
  /* Old saves (no S.cast): build it from defaults, then mark what the story had already shown before chapter `done+1`. */
  function migrate(S, done) {
    const had = !!S.cast;
    init(S);
    if (had) return S;
    for (const [id, c] of Object.entries(CAST())) {
      const e = S.cast[id];
      for (const [ax, ch] of Object.entries(c.story || {})) if (ch <= done) e.seen[ax] = true;
      if (STAT_IDS.includes(id) ? (S.stats[id] || 0) > 0 : false) e.met = true;
    }
    for (const [k, ch] of Object.entries(window.CAST_FLAW_CH || {})) {
      const [id, tag] = k.split(':');
      if (ch <= done && S.cast[id] && S.cast[id].flaws[tag] === 'hidden') S.cast[id].flaws[tag] = 'seen';
    }
    if (S.route && S.cast[S.route]) S.cast[S.route].trust = S.stats.trust;
    return S;
  }
  const aff = (S, id) => (STAT_IDS.includes(id) ? S.stats[id] || 0 : (S.cast[id] || {}).aff || 0);
  const isRouteLocked = (S) => !!S.route;
  const partner = (S) => (S.route && S.route !== 'solo' ? S.route : null);

  /* A change row for the recap. kind/src come from the engine: inside a choice option = 'choice'. */
  function log(S, who, field, delta, reason, extra) {
    const choice = S.kd > 0;
    const row = Object.assign({ ch: S.cs.ch, who, field, delta, kind: choice ? 'choice' : 'story',
      reason: reason || (choice ? S.kreason : '') || '', src: (choice && S.ksrc) || ('ch' + S.cs.ch) }, extra || {});
    S.changes.push(row);
    return row;
  }
  function touch(S, id) { const e = S.cast[id]; if (!e) return; S.cs.contact[id] = true; if (e.fuse) { e.fuse = false; e.missed = 0; log(S, id, 'fuse', 0, WHY.repair, { off: true }); } e.missed = 0; }
  function meet(S, id) { const e = S.cast[id]; if (e && !e.met) { e.met = true; } }

  function setTrust(S, id, d, reason) {
    const e = S.cast[id]; if (!e || !d) return 0;
    const before = e.trust; e.trust = clamp(e.trust + d, 0, 100);
    if (partner(S) === id) S.stats.trust = clamp((S.stats.trust || 0) + d, 0, 100);
    const got = e.trust - before;
    if (got || partner(S) === id) log(S, id, 'trust', got || d, reason);
    if (d > 0) touch(S, id);
    return got;
  }
  /* fx keys: 'trust.<id>' and 'aff.<id>' are applied here. Plain stat keys (hina, kenta…) and route 'trust' are
     applied by the engine, which then calls note() with the real delta so the recap and contact see them. */
  function fx(S, key, d, reason) {
    const m = /^(trust|aff)\.(\w+)$/.exec(key);
    if (!m || !S.cast[m[2]]) return false;
    const id = m[2];
    if (m[1] === 'trust') { setTrust(S, id, d, reason); return true; }
    if (STAT_IDS.includes(id)) { S.stats[id] = (S.stats[id] || 0) + d; } else { S.cast[id].aff = clamp(S.cast[id].aff + d, 0, 100); }
    meet(S, id);
    log(S, id, 'aff', d, reason);
    if (d > 0) touch(S, id);
    return true;
  }
  function note(S, id, field, d, reason) {
    if (!d) return;
    if (field === 'trust') { const p = partner(S); if (!p || !S.cast[p]) return; S.cast[p].trust = clamp(S.cast[p].trust + d, 0, 100); log(S, p, 'trust', d, reason); if (d > 0) touch(S, p); return; }
    if (!S.cast[id]) return;
    meet(S, id);
    log(S, id, 'aff', d, reason);
    if (d > 0) touch(S, id);
  }

  // ---------- reveals, growth, flaws, judgements ----------
  function strikeFor(S, id, axis) {
    const e = S.cast[id];
    for (const j of e.judgements) {
      const J = (window.JUDGEMENTS || {})[j.id];
      if (!j.struck && j.verdict === 'unfair' && J && (J.by || []).includes(axis)) { j.struck = S.cs.ch; log(S, id, 'judge.' + j.id, 0, J.strike || J.t, { struck: true }); }
    }
  }
  function doReveal(S, id, axis, reason, src) {
    const e = S.cast[id]; if (!e || !(axis in e.seen) || e.seen[axis]) return false;
    e.seen[axis] = S.cs.ch || true; meet(S, id);
    log(S, id, 'reveal.' + axis, 0, reason, src ? { src } : undefined);
    strikeFor(S, id, axis);
    return true;
  }
  function flush(S) {
    if ((S.stats.proj || 0) > 60 || !S.cs.q.length) return;
    const q = S.cs.q; S.cs.q = [];
    q.forEach((r) => doReveal(S, r.id, r.axis, r.why, r.src));
  }
  const pairs = (spec, who) => {
    const out = [];
    if (typeof spec === 'string') { const [id, ...ax] = spec.split('.'); ax.forEach((a) => out.push([who(id), a])); return out; }
    for (const [k, v] of Object.entries(spec || {})) [].concat(v).forEach((a) => out.push([who(k), a]));
    return out;
  };
  /* Script commands. `who` resolves @route/@talk. Returns true if c was a cast command. */
  function cmd(S, c, who) {
    who = who || ((x) => x);
    if (c.reveal) {
      for (const [id, axis] of pairs(c.reveal, who)) {
        const C = CAST()[id]; if (!C || !S.cast[id] || S.cast[id].seen[axis]) continue;
        if (C.heroine && (S.stats.proj || 0) > 60) {
          S.cs.q.push({ id, axis, why: c.why, src: S.kd > 0 ? S.ksrc : undefined });
          if (!S.cs.blur[id]) { S.cs.blur[id] = 1; log(S, id, 'blur', 0, WHY.blur); }
        } else doReveal(S, id, axis, c.why);
      }
      return true;
    }
    if (c.grow) {
      for (const [k, axes] of Object.entries(c.grow)) {
        const id = who(k), e = S.cast[id]; if (!e) continue;
        for (const [a, d] of Object.entries(axes)) {
          const g = e.grown[a] || 0, nd = clamp(g + d, -20, 20) - g;
          if (!nd) continue;
          e.grown[a] = g + nd; e.radar[a] = clamp(e.radar[a] + nd, 0, 100);
          log(S, id, 'radar.' + a, nd, c.why);
        }
      }
      return true;
    }
    if (c.flaw) {
      for (const [k, tags] of Object.entries(c.flaw)) {
        const id = who(k), e = S.cast[id]; if (!e) continue;
        for (const [tag, st] of Object.entries(tags)) {
          if (!(tag in e.flaws) || e.flaws[tag] === st) continue;
          const order = ['hidden', 'seen', 'growing', 'resolved'];
          if (order.indexOf(st) < order.indexOf(e.flaws[tag])) continue;   // flaws only move forward
          e.flaws[tag] = st; log(S, id, 'flaw.' + tag, 0, c.why, { state: st });
        }
      }
      return true;
    }
    if (c.judge) {
      const j = c.judge, id = who(j.who), e = S.cast[id];
      if (e && !e.judgements.some((x) => x.id === j.id)) {
        const J = (window.JUDGEMENTS || {})[j.id] || {};
        const row = { ch: S.cs.ch, id: j.id, verdict: j.verdict || 'fair', struck: false };
        e.judgements.push(row);
        log(S, id, 'judge.' + j.id, 0, J.t || j.id, { verdict: row.verdict });
        if (row.verdict === 'unfair' && (J.by || []).some((a) => e.seen[a])) { row.struck = S.cs.ch; log(S, id, 'judge.' + j.id, 0, J.strike || J.t, { struck: true }); }
      }
      return true;
    }
    if (c.contact) { [].concat(c.contact).forEach((k) => { const id = who(k); if (S.cast[id]) { meet(S, id); touch(S, id); } }); return true; }
    return false;
  }

  /* The engine shows a character (show / s lines). */
  function stage(S, id) { if (S.cast[id]) { S.cs.stage[id] = true; meet(S, id); } }

  /* A choice option was picked. onStage = ids currently on screen. Call before its fx. */
  function choose(S, o, onStage, who) {
    who = who || ((x) => x);
    const fx = o.fx || {};
    const neg = (k) => Object.entries(fx).some(([key, v]) => v < 0 && (key === k || key === 'trust.' + k || key === 'aff.' + k));
    (onStage || []).forEach((id) => { if (S.cast[id] && !neg(id) && !neg('wisdom') && !neg('self') && Object.keys(fx).length) touch(S, id); });
    if (o.clarity) [].concat(o.clarity).forEach((k) => { S.cs.clar[who(k)] = true; });
    if (o.lieTo) { const e = S.cast[who(o.lieTo)]; if (e) e.liesTo++; }
    if (o.honestHard) { const e = S.cast[who(o.honestHard)]; if (e) e.honestHard++; }
    if (o.sig) {
      const id = who(String(o.sig).replace(/^romance:/, ''));
      if (!S.cast[id]) return;
      S.cs.sig[id] = true;
      const p = partner(S);
      if (S.opts.social && p && id !== p && S.cast[p]) {
        setTrust(S, p, -15, WHY.twotiming);
        cmd(S, { judge: { who: p, id: 'player.twotiming', verdict: 'fair' } });
        seed(S, 'twotiming', CAST()[p].circles || []);
      }
    }
  }

  // ---------- gossip ----------
  function seed(S, about, circles) {
    if (!S.opts.social || !circles.length) return;
    const id = about + ':' + S.cs.ch + ':' + circles.join(',');
    if (S.gossip.some((g) => g.id === id)) return;
    S.gossip.push({ id, about, origin: circles.slice(), ch: S.cs.ch, reached: [], hops: 0, dead: false });
    log(S, '*', 'gossip', 0, WHY.gossipSeed, { about });
  }
  function members(circle) { return Object.keys(CAST()).filter((id) => (CAST()[id].circles || []).includes(circle)); }
  function adjacent(circle) {
    const out = new Set();
    for (const id of members(circle)) { const c = CAST()[id]; if (c.gossipBlock) continue; (c.circles || []).forEach((x) => { if (x !== circle) out.add(x); }); }
    return [...out];
  }
  function spread(S) {
    for (const g of S.gossip) {
      if (g.dead || g.ch >= S.cs.ch) continue;
      const next = g.hops === 0 ? g.origin : [...new Set(g.reached.flatMap(adjacent))].filter((c) => !g.reached.includes(c));
      if (!next.length || g.hops >= 3) { g.dead = true; continue; }
      g.hops++; g.reached.push(...next);
      for (const circle of next) for (const id of members(circle)) {
        const C = CAST()[id];
        if (!C.heroine || S.cs.clar[id] || (g.heard || []).includes(id)) continue;
        (g.heard = g.heard || []).push(id);
        const loss = S.trustedIn[circle] ? -3 : -5;
        setTrust(S, id, loss, WHY.gossip);
      }
      if (g.hops >= 3) g.dead = true;
    }
  }

  // ---------- chapter boundaries ----------
  function begin(S, chN) {
    init(S);
    S.cs = { ch: chN, stage: {}, contact: {}, sig: {}, clar: {}, blur: {}, q: S.cs.q || [] };
    S.changes = []; S.kd = 0;
    flush(S);
  }
  function sensitivity(S, id) {
    const c = CAST()[id]; let n = c.neglect || 0;
    if (id === 'rei' && S.cs.ch > 15) n = 2;
    if (c.heroine && c.route === true && S.route && S.route !== id) n = Math.max(0, n - 1);
    return n;
  }
  const GRACE = { 1: 3, 2: 2, 3: 1 }, HIT1 = { 1: -3, 2: -5, 3: -5 }, HIT2 = { 1: -5, 2: -8, 3: -10 };
  function neglect(S) {
    for (const [id, c] of Object.entries(CAST())) {
      const e = S.cast[id];
      if (!S.cs.stage[id] || (c.avail && !c.avail.includes(S.cs.ch))) continue;
      if (!(aff(S, id) >= 20 || c.rel === 'family')) continue;
      if (S.cs.contact[id]) { e.missed = 0; continue; }
      e.missed++;
      const n = sensitivity(S, id);
      if (n === 0) { if (e.missed === 2) log(S, id, 'quiet', 0, WHY.quiet, { kind: 'story' }); continue; }
      if (!e.fuse && e.missed >= GRACE[n]) { e.fuse = true; setTrust(S, id, HIT1[n], WHY.fuse); log(S, id, 'fuse', 0, WHY.fuse); }
      else if (e.fuse === true && e.missed > GRACE[n]) {
        e.fuse = 'burnt'; setTrust(S, id, HIT2[n], WHY.fuse2);
        if (n >= 2) seed(S, 'cold', c.circles || []);
      }
    }
  }
  function juggle(S) {
    if (isRouteLocked(S)) return;
    const hs = Object.keys(S.cs.sig).filter((id) => (CAST()[id] || {}).heroine);
    if (hs.length < 2 || hs.every((id) => S.cs.clar[id])) return;
    hs.forEach((id) => setTrust(S, id, -4, WHY.juggle));
    seed(S, 'juggle', [...new Set(hs.flatMap((id) => CAST()[id].circles || []))]);
  }
  /* After the chapter's last line, before the results screen. Returns the archived rows. */
  function chapterEnd(S) {
    const kd = S.kd; S.kd = 0;
    flush(S);
    if (S.opts.social) { juggle(S); spread(S); neglect(S); }
    S.kd = kd;
    S.recaps[S.cs.ch] = S.changes.slice();
    return S.recaps[S.cs.ch];
  }

  // ---------- reads for the UI ----------
  function fit(S, id) {
    const V = (window.VALUES || {})[id]; const set = S.valuesSet || [];
    if (!V || !set.length) return null;
    const gaps = set.map((a) => Math.abs((S.values[a] || 0) - (V[a] || 0)));
    return Math.round(100 - (gaps.reduce((x, y) => x + y, 0) / gaps.length) * 25);
  }
  /* What the player currently perceives on each axis: the first impression (with the Rose Filter on heroines)
     until revealed, the true value after. */
  function perceived(S, id) {
    const c = CAST()[id], e = S.cast[id], boost = c.heroine ? Math.round(Math.max(0, S.stats.proj || 0) / 4) : 0;
    const first = {}, now = {};
    AX().forEach((a) => {
      first[a] = clamp(c.first[a] + (['warmth', 'gentleness', 'generosity'].includes(a) ? boost : 0), 0, 100);
      now[a] = e.seen[a] ? e.radar[a] : null;
    });
    return { first, now, seen: e.seen };
  }
  function timeline(S, id) {
    const rows = [];
    for (const ch of Object.keys(S.recaps).map(Number).sort((a, b) => a - b)) {
      if (ch === S.cs.ch) continue;
      S.recaps[ch].forEach((r) => { if (r.who === id) rows.push(r); });
    }
    S.changes.forEach((r) => { if (r.who === id) rows.push(r); });
    return rows;
  }
  function relLabel(id) { const r = rel(id); return r === 'romance' ? 'Affection' : r === 'bond' ? 'Bond' : r === 'family' ? 'Family' : r === 'mentor' ? 'Respect' : 'Friendship'; }

  return { STAT_IDS, ROUTES, WHY, init, migrate, fx, note, cmd, stage, choose, begin, chapterEnd, seed, flush,
    aff, fit, perceived, timeline, relLabel, sensitivity, partner };
})();
