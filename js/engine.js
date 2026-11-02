/* sim4love: a small visual-novel engine (no build step).
 *
 * Script commands (one object per step):
 *   {bg:'street', petals:true}            change background (petals = falling frangipani)
 *   {show:'hina', e:'happy', at:'center'} show / move a character (at: left|center|right)
 *   {hide:'hina'} | {hide:'*'}            hide one / all characters
 *   {n:'text'}                            narration
 *   {s:'hina', e:'blush', t:'text'}       character line (auto-shows the character)
 *   {me:'text'} / {think:'text'}          player speech / inner thought
 *   {mochi:'text', e:'happy'}             mascot guide line
 *   {phone:'Contact'} {txt:'kaede'|'me'|'sys', t:'..'} {phoneOff:true}   chat overlay
 *   {choice:'prompt', opts:[{t, fx, val, lesson, flag, ach, if, rose, then:[...]}]}
 *   {if: state => bool, then:[...], else:[...]}
 *   {badEnd:{title,text}}                 fail screen with "rewind" to the last choice
 *   {chapterEnd:true}                     results screen (must be the last command of a chapter)
 *   {flag:'name'} | {flag:{a:true,b:2}}   set flags silently
 *   {fx:{...}}                            apply stat changes outside a choice (shows toasts)
 *   {val:{spend:-2}}                      set the player's stance on a value axis (S.values)
 *   {route:'hina'|'mio'|'kaede'|'yuna'|'solo'}  lock the relationship route, trust >= 20
 *   {ach:'id'} {ending:'id'} {resource:'id'}
 *   {variant:'loc.slot'}                  play one authored variant from a pool (js/data/variants)
 *   {talk:'topic', with:'kaede'}          partner talk (expanded at compile time from js/data/talks.js)
 *   {with:'kaede'|'@route'}               set who the current talk is with (speaker '@talk')
 *   {deeper:'topic'}                      optional Think Deeper card (js/data/think.js); never blocks
 *
 * fx keys: heroine ids, kenta, trust, wisdom (Love IQ), self (Self-respect), proj (Rose Filter),
 *          goal, passion, health, wallet (Your Life, 0-100), cash (SGD, also nudges wallet),
 *          '@route' (route heroine), '@talk' (current talk partner).
 * Option `rose:true`: a clear-eyed option that greys out while the Rose Filter is above 60.
 * Speakers: '@route' = route heroine; '@talk' = current talk partner.
 * Text tokens: {name} {her} {n:id} {full:id} {passion} {cash}.
 */
(function () {
  'use strict';
  const $ = (q) => document.querySelector(q);
  const SAVE_KEY = 'sim4love.save.v2';
  const HEROINES = ['hina', 'mio', 'kaede', 'yuna'];
  const LIFE_KEYS = ['goal', 'passion', 'health', 'wallet'];
  const AXES = ['spend', 'gifts', 'family', 'career', 'children', 'childEdu', 'learning', 'friends', 'lending', 'conflict', 'honesty', 'promises', 'home'];

  // ---------- i18n ----------
  const LOCALE = (() => {
    const packs = window.I18N || {};
    let want = null;
    try { want = localStorage.getItem('sim4love.locale'); } catch (e) { /* ignore */ }
    if (want && packs[want] && packs[want].ready) return want;
    return 'en-SG';
  })();
  const PACK = () => (window.I18N || {})[LOCALE] || {};
  const BASE = () => (window.I18N || {})['en-SG'] || {};
  const ui = (id, vars) => {
    let s = (PACK().ui || {})[id] || (BASE().ui || {})[id] || id;
    if (vars) for (const k in vars) s = s.replace(`{${k}}`, vars[k]);
    return s;
  };
  const nameOf = (id, full) => {
    const n = (PACK().names || {})[id] || (BASE().names || {})[id];
    if (n) return full ? n.full : n.short;
    const c = Art.CAST[id];
    return c ? (full ? c.full : c.name) : id;
  };
  const story = (text, ctx) => {
    const tb = (PACK().story || {})[ctx];
    return (tb && tb[text]) || text;
  };

  const STAT_META = {
    hina: { icon: 'heart' }, mio: { icon: 'heart' }, kaede: { icon: 'heart' }, yuna: { icon: 'heart' },
    rei: { icon: 'heart', hidden: true }, kenta: { icon: 'heart', quiet: true },
    trust: { label: 'stat.trust', icon: 'link', routeOnly: true },
    wisdom: { label: 'stat.wisdom', icon: 'spark' },
    self: { label: 'stat.self', icon: 'crown' },
    proj: { label: 'stat.proj', icon: 'rose' },
    goal: { label: 'life.goal', icon: 'target', life: true },
    passion: { label: 'life.passion', icon: 'note', life: true },
    health: { label: 'life.health', icon: 'moon', life: true },
    wallet: { label: 'life.wallet', icon: 'coin', life: true },
    cash: { label: 'life.cash', icon: 'coin' },
  };
  const statLabel = (k) => STAT_META[k] && STAT_META[k].label ? ui(STAT_META[k].label) : nameOf(k);

  // ---------- compile nested script into a flat program ----------
  function compile(list) {
    const out = [];
    function emit(arr) {
      for (const cmd of arr) {
        if (cmd.talk) { emit(window.SIM.talk(cmd.talk, cmd.with)); continue; }
        if (cmd.choice) {
          const c = { choice: cmd.choice, opts: [] };
          out.push(c);
          const ends = [];
          for (const o of cmd.opts) {
            c.opts.push({ t: o.t, fx: o.fx, val: o.val, lesson: o.lesson, flag: o.flag, ach: o.ach, show: o.if, rose: o.rose, pc: out.length });
            emit(o.then || []);
            const j = { jmp: -1 }; out.push(j); ends.push(j);
          }
          ends.forEach(j => (j.jmp = out.length));
          c.after = out.length; // safety exit used when no option is visible (see showChoice)
        } else if (cmd.if) {
          const br = { cond: cmd.if, jfalse: -1 }; out.push(br);
          emit(cmd.then || []);
          const j = { jmp: -1 }; out.push(j);
          br.jfalse = out.length;
          emit(cmd.else || []);
          j.jmp = out.length;
        } else out.push(cmd);
      }
    }
    emit(list);
    return out;
  }

  // ---------- state ----------
  const ORDER = () => window.CHAPTER_ORDER || Object.keys(window.CHAPTERS);
  const fresh = () => ({
    chapter: ORDER()[0], pc: 0, name: 'Ethan', route: null,
    stats: { hina: 0, rei: 0, mio: 0, kaede: 0, yuna: 0, kenta: 0, trust: 0, wisdom: 0, self: 0, proj: 0 },
    life: { goal: 40, passion: 20, health: 60, wallet: 50 },
    money: 150,
    values: Object.fromEntries(AXES.map(a => [a, 0])),
    flags: {}, lessons: [], badEnds: [], achievements: [], endings: [],
    reflections: {}, seenVariants: [], poolVisits: {}, seed: (Math.random() * 1e9) | 0, vq: [], talkWith: null,
    view: { bg: 'title', petals: false, chars: {}, phone: null, msgs: [] },
  });
  let S = fresh();
  let PROG = [];
  let checkpoint = null;
  let busy = false;
  let typing = null;
  let auto = false, autoTimer = null;

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const routeKey = () => (S.route && S.route !== 'solo' ? S.route : null);
  const who = (k) => (k === '@route' ? routeKey() || 'hina' : k === '@talk' ? (S.talkWith || routeKey() || 'kenta') : k);
  const passionLabel = () => ((window.PASSIONS || {})[S.flags.passion] || { label: 'your hobby' }).label;
  const herName = () => S.talkWith && S.talkWith !== 'kenta' && !routeKey() ? nameOf(S.talkWith) : routeKey() ? nameOf(routeKey()) : S.talkWith ? nameOf(S.talkWith) : 'her';
  const fmt = (t, ctx) => story(String(t), ctx || S.chapter)
    .replace(/\{name\}/g, S.name)
    .replace(/\{her\}/g, herName())
    .replace(/\{n:(\w+)\}/g, (m, id) => nameOf(id))
    .replace(/\{full:(\w+)\}/g, (m, id) => nameOf(id, true))
    .replace(/\{passion\}/g, passionLabel())
    .replace(/\{cash\}/g, () => money(S.money));
  const money = (v) => (v < 0 ? '−$' : '$') + Math.abs(Math.round(v)).toLocaleString('en-SG');
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = (k) => (window.ICONS && ICONS.svg(k)) || '';

  // ---------- rendering ----------
  function renderBg(instant) {
    const host = $('#bg');
    $('#petals').classList.toggle('on', !!S.view.petals);
    const cur = host.querySelector('.bg-layer.on:not(.out)');
    if (cur && cur.dataset.key === S.view.bg) return;
    const layer = document.createElement('div');
    layer.className = 'bg-layer';
    layer.dataset.key = S.view.bg;
    layer.innerHTML = Art.background(S.view.bg);
    host.appendChild(layer);
    const old = [...host.children].filter(el => el !== layer);
    const show = () => {
      layer.classList.add('on');
      old.forEach(el => { el.classList.add('out'); setTimeout(() => el.remove(), 750); });
    };
    if (instant || !cur) { layer.style.transition = 'none'; show(); void layer.offsetWidth; layer.style.transition = ''; return; }
    requestAnimationFrame(() => requestAnimationFrame(show));
  }
  function swapExpr(el, k, e) {
    const tmp = document.createElement('div');
    tmp.innerHTML = Art.character(k, e, nameOf(k, true));
    const next = tmp.firstElementChild;
    const prev = [...el.children];
    if (!prev.length || next.tagName !== 'IMG') { el.innerHTML = ''; el.appendChild(next); return; }
    next.classList.add('incoming');
    el.appendChild(next);
    const reveal = () => { next.classList.remove('incoming'); prev.forEach(p => { p.style.opacity = '0'; setTimeout(() => p.remove(), 300); }); };
    if (next.complete) requestAnimationFrame(reveal); else { next.onload = reveal; next.onerror = reveal; }
  }
  function renderChars(speaker) {
    const layer = $('#chars');
    const keys = Object.keys(S.view.chars);
    [...layer.children].forEach(el => { if (!S.view.chars[el.dataset.key]) { el.classList.add('leaving'); setTimeout(() => el.remove(), 300); } });
    keys.forEach(k => {
      const st = S.view.chars[k];
      let el = layer.querySelector(`[data-key="${k}"]:not(.leaving)`);
      if (!el) { el = document.createElement('div'); el.className = 'char entering'; el.dataset.key = k; layer.appendChild(el); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('entering'))); }
      if (el.dataset.expr !== st.e) {
        const first = !el.dataset.expr;
        swapExpr(el, k, st.e); el.dataset.expr = st.e;
        if (!first) { el.classList.remove('bounce'); void el.offsetWidth; el.classList.add('bounce'); }
      }
      el.dataset.at = st.at || 'center';
      el.dataset.frame = (Art.FRAMING && Art.FRAMING[k]) || '';
      el.classList.toggle('dim', !!speaker && speaker !== k && keys.length > 1);
      el.classList.toggle('speaking', !!speaker && speaker === k);
      el.classList.toggle('rose', S.stats.proj > 60 && HEROINES.includes(k));
    });
    layer.classList.toggle('multi', keys.length > 1);
  }
  function renderPhone() {
    const ph = $('#phone');
    ph.classList.toggle('on', !!S.view.phone);
    $('#game').classList.toggle('phone-on', !!S.view.phone);
    if (!S.view.phone) return;
    $('#phone-title').textContent = /^@(route|talk)$/.test(S.view.phone) ? nameOf(who(S.view.phone)) : fmt(S.view.phone);
    const box = $('#phone-msgs');
    box.innerHTML = S.view.msgs.length
      ? S.view.msgs.map(m => `<div class="bubble ${m.from === 'me' ? 'me' : m.from === 'sys' ? 'sys' : 'them'}">${esc(fmt(m.t))}</div>`).join('')
      : `<div class="typing" aria-label="${esc(ui('phone.typing'))}"><i></i><i></i><i></i></div>`;
    box.scrollTop = box.scrollHeight;
  }
  function renderHud() {
    const chips = [];
    const hearts = routeKey() ? [routeKey()] : S.route === 'solo' ? [] : HEROINES.filter(k => S.stats[k]);
    hearts.forEach(k => chips.push(`<span class="chip" style="--c:${Art.CAST[k].color}" title="${esc(nameOf(k))}">${icon('heart')}${esc(nameOf(k))} <i>${S.stats[k]}</i></span>`));
    if (routeKey()) chips.push(`<span class="chip" style="--c:#8fc7e6" title="${esc(ui('stat.trust'))}">${icon('link')}${esc(ui('stat.trust'))} <i>${S.stats.trust}</i></span>`);
    chips.push(`<span class="chip" style="--c:#7fa6ff" title="${esc(ui('stat.wisdom'))}">${icon('spark')}${esc(ui('stat.wisdom'))} <i>${S.stats.wisdom}</i></span>`);
    chips.push(`<span class="chip" style="--c:#e6c878" title="${esc(ui('stat.self'))}">${icon('crown')}${esc(ui('stat.self'))} <i>${S.stats.self}</i></span>`);
    if (S.stats.proj > 0) chips.push(`<span class="chip rosechip ${S.stats.proj > 60 ? 'hot' : ''}" style="--c:#ff7a9c" title="${esc(ui('stat.proj'))}">${icon('rose')}${esc(ui('stat.proj'))} <i>${S.stats.proj}</i></span>`);
    const life = LIFE_KEYS.map(k => `<span class="lm" title="${esc(ui('life.' + k))}: ${S.life[k]}">${icon(STAT_META[k].icon)}<span class="lt"><span class="lf ${S.life[k] < 25 ? 'low' : ''}" style="width:${S.life[k]}%"></span></span></span>`).join('');
    $('#hud').innerHTML = chips.join('') + `<span class="chip life" title="${esc(ui('life.title'))}"><em>${esc(ui('life.title'))}</em>${life}<i class="cash ${S.money < 0 ? 'neg' : ''}">${money(S.money)}</i></span>`;
  }

  function setBox(kind, name, text, color, expr) {
    const box = $('#textbox');
    box.className = 'textbox ' + kind;
    const tag = $('#nametag');
    tag.textContent = name || '';
    tag.style.display = name ? '' : 'none';
    tag.style.setProperty('--c', color || '#ff6fae');
    $('#mochi-face').innerHTML = kind === 'mochi' ? mochiFace(expr) : '';
    typeText(fmt(text));
  }
  function typeText(full) {
    const el = $('#text');
    clearInterval(typing && typing.timer);
    let i = 0;
    el.textContent = '';
    typing = { full, done: false, timer: setInterval(() => {
      i += 2; el.textContent = full.slice(0, i);
      if (i >= full.length) finishType();
    }, 18) };
    $('#next').classList.remove('show');
  }
  function finishType() {
    if (!typing) return;
    clearInterval(typing.timer);
    $('#text').textContent = typing.full;
    typing.done = true;
    $('#next').classList.add('show');
    if (auto) { clearTimeout(autoTimer); autoTimer = setTimeout(() => { if (auto && !busy) advance(); }, 1200 + typing.full.length * 25); }
  }

  function mochiFace(e) {
    const art = (window.SPRITES && SPRITES.chars && SPRITES.chars.mochi) || null;
    const src = art && (art[e] || art[Art.fallbackExpr ? Art.fallbackExpr('mochi', e) : 'neutral'] || art.neutral);
    return src ? `<img src="${src}" alt="Mochi" draggable="false">` : mochiSvg();
  }
  function mochiSvg() {
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M8,52 Q-6,30 14,30 Q20,44 22,50Z M92,52 Q106,30 86,30 Q80,44 78,50Z" fill="#fff" stroke="#f7a8c6" stroke-width="3"/>
      <path d="M22,40 L28,14 L44,32 Z M78,40 L72,14 L56,32 Z" fill="#fff8f0" stroke="#e8b89a" stroke-width="3"/>
      <ellipse cx="50" cy="56" rx="34" ry="30" fill="#fff8f0" stroke="#e8b89a" stroke-width="3"/>
      <ellipse cx="38" cy="54" rx="5" ry="7" fill="#3a2a2a"/><ellipse cx="62" cy="54" rx="5" ry="7" fill="#3a2a2a"/>
      <circle cx="36" cy="51" r="2" fill="#fff"/><circle cx="60" cy="51" r="2" fill="#fff"/>
      <path d="M44,66 Q50,71 50,65 Q50,71 56,66" fill="none" stroke="#3a2a2a" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="28" cy="64" rx="6" ry="3" fill="#ffadc4"/><ellipse cx="72" cy="64" rx="6" ry="3" fill="#ffadc4"/>
      <path d="M50,20 c-4,-6 -12,-2 -8,4 l8,6 l8,-6 c4,-6 -4,-10 -8,-4z" fill="#ff6fae"/></svg>`;
  }

  // ---------- stats ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function resolveKey(k) {
    if (k === '@route') return routeKey();
    if (k === '@talk') { const t = who('@talk'); return S.stats[t] !== undefined ? t : null; }
    return k;
  }
  function applyFx(fx, quiet) {
    if (!fx) return;
    let i = 0;
    const show = (label, d, color) => { if (!quiet) { const n = i++; setTimeout(() => toast(label, d >= 0 ? 'up' : 'down', color), n * 250); } };
    Object.entries(fx).forEach(([k0, d]) => {
      const k = resolveKey(k0);
      if (!k || !d) return;
      if (k === 'trust' && !routeKey()) return; // trust only exists inside a relationship
      if (k === 'cash') {
        S.money += d;
        if (!fx.wallet) S.life.wallet = clamp(S.life.wallet + clamp(Math.round(d / 10), -20, 20), 0, 100);
        show(`${d > 0 ? '+' : '−'}$${Math.abs(d)}`, d, '#e6c878');
        return;
      }
      if (LIFE_KEYS.includes(k)) {
        S.life[k] = clamp(S.life[k] + d, 0, 100);
        show(`${ui('life.' + k)} ${d > 0 ? '+' : ''}${d}`, d, '#9fd08a');
        return;
      }
      S.stats[k] = (S.stats[k] || 0) + d;
      if (k === 'trust') S.stats.trust = clamp(S.stats.trust, 0, 100);
      if (k === 'proj') S.stats.proj = clamp(S.stats.proj, 0, 100);
      const m = STAT_META[k] || {};
      if (m.quiet && !routeKey()) { show(`${nameOf(k)} ${d > 0 ? '+' : ''}${d}`, d, '#c9a45c'); return; }
      const label = m.hidden ? `${nameOf(k)} ???` : `${statLabel(k)} ${d > 0 ? '+' : ''}${d}`;
      show(label, k === 'proj' ? -d : d, Art.CAST[k] && Art.CAST[k].color);
    });
    renderHud();
    if (fx.proj) renderChars();
  }
  function applyVal(v) { if (v) Object.entries(v).forEach(([a, x]) => { S.values[a] = clamp(x, -2, 2); }); }
  function toast(text, kind, color) {
    const t = document.createElement('div');
    t.className = 'toast ' + kind;
    if (color) t.style.setProperty('--c', color);
    t.textContent = text;
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  // ---------- variants ----------
  // Deterministic: same save + same pool visit -> same pick (rewind-safe). See docs/VALUE_PROFILES.md §6.2.
  function hash(...parts) {
    let h = 2166136261;
    for (const ch of parts.join('|')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function chNum() { return ORDER().indexOf(S.chapter) + 1; }
  function pickVariant(poolId, st) {
    return window.SIM.pickVariant(poolId, st || S, chNum());
  }
  function playVariant(poolId) {
    const v = pickVariant(poolId);
    if (!v) { console.warn('sim4love: empty pool', poolId); return; }
    if (!S.seenVariants.includes(v.id)) S.seenVariants.push(v.id);
    S.poolVisits[poolId] = (S.poolVisits[poolId] || 0) + 1;
    S.vq = clone(v.lines).concat(S.vq || []);
  }

  // ---------- program step ----------
  let fromVq = false;
  function nextCmd() {
    if (S.vq && S.vq.length) { fromVq = true; return S.vq.shift(); }
    fromVq = false;
    if (S.pc < PROG.length) return PROG[S.pc++];
    return null;
  }
  function step() {
    let c;
    while ((c = nextCmd())) {
      if (c.jmp !== undefined) { S.pc = c.jmp; continue; }
      if (c.cond) { if (!c.cond(S)) S.pc = c.jfalse; continue; }
      if (c.variant) { playVariant(c.variant); continue; }
      if (c.with !== undefined && !c.talk) { S.talkWith = window.SIM.resolveWith(c, S); continue; }
      if (c.bg !== undefined) { S.view.bg = c.bg; S.view.petals = !!c.petals; renderBg(); continue; }
      if (c.flag !== undefined) { typeof c.flag === 'string' ? (S.flags[c.flag] = true) : Object.assign(S.flags, c.flag); continue; }
      if (c.fx) { applyFx(c.fx); continue; }
      if (c.val) { applyVal(c.val); continue; }
      if (c.route) { S.route = c.route; if (routeKey()) S.stats.trust = Math.max(S.stats.trust, 20); renderHud(); continue; }
      if (c.ach) { unlockAch(c.ach); continue; }
      if (c.lesson) { showLesson(c.lesson, () => { step(); save(); }); return; }
      if (c.deeper) { showDeeper(c.deeper); return; }
      if (c.resource) { showResource(c.resource); return; }
      if (c.ending) { showEnding(c.ending === '@auto' ? window.SIM.endingFor(S) : c.ending); return; }
      if (c.show) { const k = who(c.show); S.view.chars[k] = { e: c.e || 'neutral', at: c.at || 'center' }; renderChars(); continue; }
      if (c.hide) { const k = c.hide === '*' ? '*' : who(c.hide); if (k === '*') S.view.chars = {}; else delete S.view.chars[k]; renderChars(); continue; }
      if (c.phone) { S.view.phone = c.phone; S.view.msgs = []; renderPhone(); continue; }
      if (c.phoneOff) { S.view.phone = null; S.view.msgs = []; renderPhone(); continue; }
      if (c.txt) {
        const from = who(c.txt);
        S.view.msgs.push({ from, t: c.t }); renderPhone();
        const nm = from === 'me' ? S.name : from === 'sys' ? '' : nameOf(from);
        setBox('phonebox', nm || ui('phone.title'), c.t, (Art.CAST[from] && Art.CAST[from].color) || (from === 'me' ? '#8fa8e6' : '#c9a45c'));
        return;
      }
      if (c.s) {
        const k = who(c.s);
        if (!Art.CAST[k]) { renderChars(); setBox('say', fmt(k), c.t, '#c9a45c'); return; } // walk-on NPC: name only, no sprite
        const prev = S.view.chars[k];
        S.view.chars[k] = { e: c.e || (prev && prev.e) || 'neutral', at: c.at || (prev && prev.at) || 'center' };
        renderChars(k);
        setBox('say', nameOf(k), c.t, (Art.CAST[k] || {}).color);
        return;
      }
      if (c.n) { renderChars(); setBox('narr', '', c.n); return; }
      if (c.me) { setBox('say', S.name, c.me, '#8fa8e6'); return; }
      if (c.think) { setBox('think', S.name, c.think, '#a8977a'); return; }
      if (c.mochi) { setBox('mochi', 'Mochi', c.mochi, '#ff8fb8', c.e); return; }
      if (c.choice) { showChoice(c); return; }
      if (c.badEnd) { showBadEnd(c.badEnd); return; }
      if (c.chapterEnd) { showResults(); return; }
    }
  }
  function advance() {
    if (busy) return;
    if (typing && !typing.done) { finishType(); return; }
    step();
    save();
  }

  // ---------- choices ----------
  function showChoice(c) {
    busy = true;
    checkpoint = fromVq ? clone({ ...S, vq: [c].concat(S.vq) }) : clone({ ...S, pc: S.pc - 1 });
    setBox('narr choicebox', '', c.choice);
    finishType();
    const wrap = $('#choices');
    const visible = c.opts.map((o, i) => [o, i]).filter(([o]) => !o.show || o.show(S));
    if (!visible.length) {
      console.warn('sim4love: no visible option for choice, skipping:', c.choice);
      busy = false; S.pc = c.after; step(); return;
    }
    // Rose Filter: above 60, clear-eyed options grey out, but never all of them.
    const rosy = S.stats.proj > 60;
    const blocked = (o) => rosy && o.rose && visible.some(([x]) => !x.rose);
    wrap.innerHTML = visible.map(([o, i], n) => blocked(o)
      ? `<button class="opt rosed" data-i="${i}" disabled aria-disabled="true"><span class="num">${icon('rose')}</span><span>${esc(fmt(o.t))}<small>${esc(ui('rose.blocked'))}</small></span></button>`
      : `<button class="opt" data-i="${i}"><span class="num">${n + 1}</span><span>${esc(fmt(o.t))}</span></button>`).join('');
    wrap.classList.add('on');
    const first = wrap.querySelector('button:not([disabled])');
    first && first.focus({ preventScroll: true });
    const shownAt = Date.now();
    wrap.onclick = (ev) => {
      const b = ev.target.closest('.opt'); if (!b || b.disabled) return;
      if (Date.now() - shownAt < 450) return;
      const o = c.opts[+b.dataset.i];
      wrap.classList.remove('on'); wrap.innerHTML = '';
      applyFx(o.fx);
      applyVal(o.val);
      if (o.flag) S.flags[o.flag] = true;
      if (o.ach) unlockAch(o.ach);
      S.pc = o.pc;
      const go = () => { busy = false; step(); save(); };
      if (o.lesson) showLesson(o.lesson, go); else go();
    };
  }

  // ---------- lesson card ----------
  function showLesson(id, then) {
    const L = LESSONS[id];
    const isNew = !S.lessons.includes(id);
    if (isNew) S.lessons.push(id);
    const kindName = ui('lesson.' + L.kind);
    modal(`<div class="lesson ${L.kind}">
        <div class="lesson-kind ornament">${esc(kindName)}${isNew ? ' · ' + esc(ui('lesson.new')) : ''}</div>
        <div class="lesson-icon" aria-hidden="true">${icon(L.ic)}</div>
        <h2>${esc(fmt(L.title))}</h2>
        <p>${esc(fmt(L.text))}</p>
        <div class="lesson-mochi">${mochiFace(L.kind === 'green' ? 'happy' : L.kind === 'trap' ? 'surprised' : 'sad')}<span>${esc(ui('lesson.added'))}</span></div>
        <button class="btn primary" data-close>${esc(ui('btn.gotit'))}</button>
      </div>`, then);
  }

  function modal(html, onClose, variant) {
    busy = true;
    const m = $('#modal');
    m.className = variant || '';
    m.innerHTML = `<div class="modal-card">${html}</div>`;
    m.classList.add('on');
    const btn = m.querySelector('[data-close]');
    btn && btn.focus({ preventScroll: true });
    m.onclick = (ev) => {
      const b = ev.target.closest('[data-close],[data-act],[data-tab],[data-lens]');
      if (!b) return;
      if (b.dataset.tab) { m.querySelectorAll('[data-tab]').forEach(x => x.classList.toggle('on', x === b)); m.querySelectorAll('[data-pane]').forEach(p => (p.hidden = p.dataset.pane !== b.dataset.tab)); return; }
      if (b.dataset.lens !== undefined) { m._lens && m._lens(b.dataset.lens, b); return; }
      if (b.dataset.act) { handleAct(b.dataset.act); return; }
      m.classList.remove('on'); m.innerHTML = ''; m.className = '';
      busy = false;
      onClose && onClose(b.dataset.close);
    };
  }

  // ---------- bad end ----------
  function showBadEnd(be) {
    if (!S.badEnds.includes(be.title)) S.badEnds.push(be.title);
    S.view.chars = {}; renderChars();
    const prevBg = S.view.bg;
    S.view.bg = 'badend'; renderBg();
    if (!be.serious) { document.body.classList.add('shake'); setTimeout(() => document.body.classList.remove('shake'), 600); }
    modal(`<div class="badend ${be.serious ? 'serious' : ''}">
        <div class="be-label">${esc(ui('badend.label'))}</div>
        <h2>${esc(be.title.replace(/^BAD END #\d+ — /, ''))}</h2>
        <p>${esc(fmt(be.text))}</p>
        <div class="lesson-mochi">${mochiFace('sad')}<span>${esc(be.serious ? ui('badend.serious') : ui('badend.mochi'))}</span></div>
        <button class="btn primary" data-close>${esc(ui('btn.rewind'))}</button>
      </div>`, () => {
        const rewind = () => {
          const keep = { lessons: S.lessons, badEnds: S.badEnds, reflections: S.reflections, achievements: S.achievements };
          S = Object.assign(clone(checkpoint), keep);
          S.view.bg = S.view.bg || prevBg;
          restoreView();
          step();
        };
        if (be.resource) showResource(be.resource, rewind); else rewind();
      }, 'bad');
  }

  // ---------- achievements / endings / resources ----------
  function unlockAch(id) {
    if (S.achievements.includes(id)) return;
    S.achievements.push(id);
    const A = (window.ACHIEVEMENTS || {})[id] || { title: id };
    toast(`${ui('ach.toast')}: ${A.title}`, 'up', '#e6c878');
  }
  function endingText(E) {
    const r = routeKey();
    return (E.byRoute && r && E.byRoute[r]) || E.text || '';
  }
  function showEnding(id) {
    const E = (window.ENDINGS || {})[id] || { type: 'Ending', title: id, text: '' };
    if (!S.endings.includes(id)) S.endings.push(id);
    try { const g = JSON.parse(localStorage.getItem('sim4love.gallery') || '[]'); if (!g.includes(id)) { g.push(id); localStorage.setItem('sim4love.gallery', JSON.stringify(g)); } } catch (e) { /* ignore */ }
    modal(`<div class="results ending">
        <div class="be-label ok ornament">${esc(E.type)}</div>
        <h2>${esc(fmt(E.title))}</h2>
        ${endingText(E).split('\n').map(p => `<p>${esc(fmt(p))}</p>`).join('')}
        <button class="btn primary" data-close>${esc(ui('btn.continue'))}</button>
      </div>`, () => step());
  }
  function showResource(id, then) {
    const R = (window.RESOURCES || {})[id] || { title: 'Get help', lines: [] };
    modal(`<div class="lesson green resource">
        <div class="lesson-kind ornament">${esc(ui('resource.kicker'))}</div>
        <div class="lesson-icon" aria-hidden="true">${icon('shield')}</div>
        <h2>${esc(R.title)}</h2>
        <ul class="resource-list">${R.lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        <p class="muted small">${esc(ui('resource.verified', { date: R.verified || '' }))}</p>
        <button class="btn primary" data-close>${esc(ui('btn.okay'))}</button>
      </div>`, () => (then ? then() : step()));
  }

  // ---------- Think Deeper ----------
  // Optional and never graded: "Not now" is always shown. First read gives Love IQ +2.
  function showDeeper(id) {
    const T = (window.THINK || {})[id];
    if (!T) { step(); return; }
    modal(`<div class="deeper-ask">
        <div class="lesson-icon" aria-hidden="true">${icon('lens')}</div>
        <div class="lesson-kind ornament">${esc(ui('deeper.kicker'))}</div>
        <h2>${esc(fmt(T.title))}</h2>
        <p>${esc(fmt(T.hook))}</p>
        <div class="row"><button class="btn" data-close="skip">${esc(ui('deeper.skip'))}</button><button class="btn primary" data-close="read">${esc(ui('deeper.read'))}</button></div>
      </div>`, (how) => { if (how === 'read') deeperCard(T, id, () => step()); else step(); });
  }
  function deeperCard(T, id, then, readonly) {
    const mentor = T.mentor && T.mentor !== 'mochi' ? nameOf(T.mentor) : 'Dr. Mochi';
    const lensName = (k) => ui('lens.' + k);
    const picked = S.reflections[id] && S.reflections[id].lens;
    modal(`<div class="deeper">
        <div class="lesson-kind ornament">${esc(ui('deeper.kicker'))} · ${esc(mentor)}</div>
        <h2>${esc(fmt(T.title))}</h2>
        <p class="hook">${esc(fmt(T.hook))}</p>
        ${T.lenses.map((L, i) => `<section class="lens ${L.kind}"><h3>${icon(L.kind === 'structural' ? 'scale' : L.kind === 'personal' ? 'target' : 'home')}${esc(L.label || lensName(L.kind))}</h3><p>${esc(fmt(L.text))}</p></section>`).join('')}
        <section class="lens sg"><h3>${icon('pin')}${esc(ui('deeper.sg'))}</h3><ul>${T.sg.map(x => `<li>${esc(x.t)}${x.src ? ` <a href="${esc(x.src)}" target="_blank" rel="noopener">${esc(ui('deeper.source'))}</a>` : ''}</li>`).join('')}</ul></section>
        <p class="reframe">${esc(fmt(T.reframe))}</p>
        <p class="closing">${esc(ui('deeper.closing'))}</p>
        <h3 class="q">${esc(fmt(T.question))}</h3>
        <div class="lens-pick">${T.lenses.map((L, i) => `<button class="btn small ${picked === L.kind ? 'on' : ''}" data-lens="${L.kind}">${esc(L.label || lensName(L.kind))}</button>`).join('')}<button class="btn small ${picked === 'none' ? 'on' : ''}" data-lens="none">${esc(ui('deeper.nopick'))}</button></div>
        <button class="btn primary" data-close>${esc(readonly ? ui('btn.close') : ui('btn.continue'))}</button>
      </div>`, then, 'deep');
    const m = $('#modal');
    if (!readonly && !S.reflections[id]) {
      S.reflections[id] = { lens: null, ch: S.chapter };
      applyFx({ wisdom: 2 });
    }
    m._lens = (k, b) => {
      S.reflections[id] = Object.assign(S.reflections[id] || { ch: S.chapter }, { lens: k });
      m.querySelectorAll('[data-lens]').forEach(x => x.classList.toggle('on', x === b));
      save();
    };
  }

  // ---------- results ----------
  function rankOf() {
    const iq = S.stats.wisdom, sr = S.stats.self;
    return iq + sr >= 60 ? ['S', ui('rank.s')] : iq + sr >= 30 ? ['A', ui('rank.a')] : iq + sr >= 0 ? ['B', ui('rank.b')] : ['C', ui('rank.c')];
  }
  function lifeBars() {
    return LIFE_KEYS.map(k => `<div class="bar"><span>${icon(STAT_META[k].icon)}${esc(ui('life.' + k))}</span><div class="track"><div class="fill" style="width:${S.life[k]}%;--c:#9fd08a"></div></div><b>${S.life[k]}</b></div>`).join('')
      + `<div class="bar"><span>${icon('coin')}${esc(ui('life.cash'))}</span><div class="track"></div><b class="${S.money < 0 ? 'neg' : ''}">${money(S.money)}</b></div>`;
  }
  function showResults() {
    busy = true;
    const ch = CHAPTERS[S.chapter];
    const nextId = ORDER()[ORDER().indexOf(S.chapter) + 1];
    const people = routeKey() ? [routeKey()] : S.route === 'solo' ? ['kenta'] : HEROINES.concat('rei');
    const bars = people.map(k => {
      const c = Art.CAST[k], v = S.stats[k];
      const pct = clamp(v * 2 + 10, 0, 100);
      const shown = k === 'rei' ? '???' : v;
      return `<div class="bar"><span>${esc(nameOf(k))}</span><div class="track"><div class="fill" style="width:${k === 'rei' ? 50 : pct}%;--c:${c.color}"></div></div><b>${shown}</b></div>`;
    }).join('') + (routeKey() ? `<div class="bar"><span>${esc(ui('stat.trust'))}</span><div class="track"><div class="fill" style="width:${S.stats.trust}%;--c:#8fc7e6"></div></div><b>${S.stats.trust}</b></div>` : '');
    const rank = rankOf();
    const lessons = S.lessons.map(id => `<li class="${LESSONS[id].kind}">${esc(fmt(LESSONS[id].title))}</li>`).join('');
    try { const p = JSON.parse(localStorage.getItem('sim4love.progress') || '{}'); p[S.chapter] = true; localStorage.setItem('sim4love.progress', JSON.stringify(p)); } catch (e) { /* ignore */ }
    modal(`<div class="results">
      <div class="be-label ok ornament">${esc(ui('results.complete', { ch: ch.title }))}</div>
      <h2>${esc(ch.subtitle)}</h2>
      <div class="rank"><b>${rank[0]}</b><span>${esc(rank[1])}</span></div>
      <div class="pair"><div>${esc(ui('stat.wisdom'))} <b>${S.stats.wisdom}</b></div><div>${esc(ui('stat.self'))} <b>${S.stats.self}</b></div>${S.stats.proj ? `<div>${esc(ui('stat.proj'))} <b>${S.stats.proj}</b></div>` : ''}</div>
      <h3>${esc(ui('life.title'))}</h3>
      ${lifeBars()}
      <h3>${esc(ui('results.people'))}</h3>
      ${bars}
      <h3>${esc(ui('notebook.title'))} (${S.lessons.length}/${Object.keys(LESSONS).length})</h3>
      <ul class="lesson-list">${lessons}</ul>
      ${S.badEnds.length ? `<p class="muted">${esc(ui('results.badends', { n: S.badEnds.length, total: BAD_END_TOTAL }))}</p>` : ''}
      ${S.endings.length && !nextId ? `<p class="muted">${esc(ui('results.endings'))}: ${S.endings.map(e => esc((ENDINGS[e] || { title: e }).title)).join(' · ')}</p>` : ''}
      ${nextId ? '' : `<p class="muted">${esc(ui('results.thanks'))}</p>`}
      <div class="row"><button class="btn" data-act="restart">${esc(ui('btn.again'))}</button><button class="btn ${nextId ? '' : 'primary'}" data-act="title">${esc(ui('btn.title'))}</button>${nextId ? `<button class="btn primary" data-act="next">${esc(ui('btn.next', { ch: CHAPTERS[nextId].title }))}</button>` : ''}</div>
    </div>`);
  }

  // ---------- menus ----------
  function openNotebook(tab) {
    const all = Object.entries(LESSONS).map(([id, L]) => S.lessons.includes(id)
      ? `<li class="${L.kind}"><i aria-hidden="true">${icon(L.ic)}</i><b>${esc(fmt(L.title))}</b><span>${esc(fmt(L.text))}</span></li>`
      : `<li class="locked"><i aria-hidden="true">${icon('lock')}</i><b>${esc(ui('notebook.locked'))}</b><span>${esc(ui('notebook.lockedhint'))}</span></li>`).join('');
    const deep = Object.entries(window.THINK || {}).map(([id, T]) => S.reflections[id]
      ? `<li class="deep"><i aria-hidden="true">${icon('lens')}</i><b><button class="linkish" data-act="deep:${id}">${esc(fmt(T.title))}</button></b><span>${esc(fmt(T.hook))}${S.reflections[id].lens && S.reflections[id].lens !== 'none' ? ' · ' + esc(ui('deeper.yourlens')) + ': ' + esc(ui('lens.' + S.reflections[id].lens)) : ''}</span></li>`
      : `<li class="locked"><i aria-hidden="true">${icon('lock')}</i><b>${esc(ui('deeper.locked'))}</b><span>${esc(ui('deeper.lockedhint'))}</span></li>`).join('');
    const life = `<div class="life-pane">${lifeBars()}<p class="muted">${esc(ui('life.hint'))}</p></div>`;
    const t = tab || 'lessons';
    modal(`<div class="notebook"><h2>${esc(ui('notebook.title'))}</h2>
      <div class="tabs" role="tablist"><button class="tab ${t === 'lessons' ? 'on' : ''}" data-tab="lessons">${esc(ui('notebook.lessons'))} <small>${S.lessons.length}/${Object.keys(LESSONS).length}</small></button><button class="tab ${t === 'deep' ? 'on' : ''}" data-tab="deep">${esc(ui('notebook.deeper'))} <small>${Object.keys(S.reflections).length}/${Object.keys(window.THINK || {}).length}</small></button><button class="tab ${t === 'life' ? 'on' : ''}" data-tab="life">${esc(ui('life.title'))}</button></div>
      <ul data-pane="lessons" ${t === 'lessons' ? '' : 'hidden'}>${all}</ul>
      <ul data-pane="deep" ${t === 'deep' ? '' : 'hidden'}>${deep}</ul>
      <div data-pane="life" ${t === 'life' ? '' : 'hidden'}>${life}</div>
      <button class="btn primary" data-close>${esc(ui('btn.close'))}</button></div>`);
  }
  function handleAct(a) {
    const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; m.className = ''; busy = false;
    if (a.startsWith('deep:')) { const id = a.slice(5); deeperCard(THINK[id], id, () => openNotebook('deep'), true); return; }
    if (a === 'restart') startGame(S.name);
    if (a === 'title') showTitle();
    if (a === 'next') {
      const nextId = ORDER()[ORDER().indexOf(S.chapter) + 1];
      if (!nextId) return;
      S.chapter = nextId; S.pc = 0; S.vq = []; S.view.chars = {}; S.view.phone = null; S.view.msgs = [];
      PROG = compile(CHAPTERS[S.chapter].script); restoreView(); save();
      chapterCard(() => step());
    }
  }

  // ---------- save / load ----------
  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ }
  }
  function loadSave() {
    try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function restoreView() {
    renderBg(); $('#chars').innerHTML = ''; renderChars(); renderPhone(); renderHud();
  }

  // ---------- title / start ----------
  function showTitle() {
    auto = false; $('#btn-auto').classList.remove('on');
    $('#game').classList.add('at-title');
    S.view.bg = 'title'; S.view.petals = true; renderBg();
    $('#chars').innerHTML = '';
    const saved = loadSave();
    $('#title').classList.add('on');
    const key = window.SPRITES && SPRITES.bg && SPRITES.bg.keyart;
    if (key) {
      if (!$('#title-hero img')) $('#title-hero').innerHTML = `<img src="${key}" alt="" draggable="false">`;
      $('#title-chars').innerHTML = '';
    } else {
      $('#title-hero').innerHTML = '';
      $('#title-chars').innerHTML = ['mio', 'hina', 'yuna'].map(k => `<div class="tc">${Art.character(k, k === 'hina' ? 'happy' : k === 'mio' ? 'shy' : 'smug', nameOf(k, true))}</div>`).join('');
    }
    $('#btn-continue').hidden = !(saved && (saved.pc > 0 || saved.chapter !== ORDER()[0]));
    if (saved && !$('#btn-continue').hidden) {
      const ch = CHAPTERS[saved.chapter];
      $('#btn-continue').textContent = ch ? `${ui('btn.continue')} · ${ch.title}` : ui('btn.continue');
    }
    const loc = $('#locale');
    if (loc) {
      const packs = Object.entries(window.I18N || {}).filter(([, p]) => p.ready);
      loc.hidden = packs.length < 2;
      loc.innerHTML = packs.map(([id, p]) => `<option value="${id}" ${id === LOCALE ? 'selected' : ''}>${esc(p.label)}</option>`).join('');
    }
  }
  function startGame(name, fromSave) {
    $('#title').classList.remove('on');
    $('#game').classList.remove('at-title');
    const f = fresh();
    S = fromSave ? Object.assign(f, fromSave, {
      stats: Object.assign(f.stats, fromSave.stats), life: Object.assign(f.life, fromSave.life),
      values: Object.assign(f.values, fromSave.values) }) : f;
    if (!fromSave) S.name = (name || 'Ethan').trim().slice(0, 12) || 'Ethan';
    if (!CHAPTERS[S.chapter]) S.chapter = ORDER()[0];
    PROG = compile(CHAPTERS[S.chapter].script);
    busy = false;
    if (fromSave) { if (!(S.vq && S.vq.length)) S.pc = Math.max(0, S.pc - 1); restoreView(); step(); return; }
    restoreView();
    chapterCard(() => step());
  }
  function chapterCard(then) {
    const ch = CHAPTERS[S.chapter];
    const card = $('#chapter-card');
    card.innerHTML = `<small class="ornament">${esc(ch.part ? ch.part + ' · ' : '')}${esc(ch.title)}</small><h1>${esc(ch.subtitle)}</h1>`;
    card.classList.add('on');
    busy = true;
    setTimeout(() => { card.classList.remove('on'); busy = false; then(); }, 2200);
  }

  // ---------- input ----------
  function bind() {
    $('#stage').addEventListener('click', (e) => { if (e.target.closest('button,#choices,#modal,#title,#topbar,select,a')) return; advance(); });
    document.addEventListener('keydown', (e) => {
      if ($('#title').classList.contains('on')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement && document.activeElement.tagName === 'BUTTON' && document.activeElement.closest('#choices,#modal')) return;
        e.preventDefault(); advance();
      }
      if (/^[1-9]$/.test(e.key) && $('#choices').classList.contains('on')) {
        const b = $('#choices').querySelectorAll('.opt:not([disabled])')[+e.key - 1]; b && b.click();
      }
    });
    $('#btn-start').onclick = () => startGame($('#player-name').value);
    $('#player-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') startGame(e.target.value); });
    $('#btn-continue').onclick = () => { const s = loadSave(); if (s) startGame(s.name, s); };
    $('#btn-notebook').onclick = (e) => { e.stopPropagation(); if (busy) return; openNotebook(); };
    $('#btn-auto').onclick = (e) => { e.stopPropagation(); auto = !auto; e.currentTarget.classList.toggle('on', auto); if (auto && typing && typing.done && !busy) advance(); };
    $('#btn-title').onclick = (e) => { e.stopPropagation(); if (busy && $('#modal').classList.contains('on')) return; save(); showTitle(); };
    const loc = $('#locale');
    if (loc) loc.onchange = () => { try { localStorage.setItem('sim4love.locale', loc.value); } catch (e) { /* ignore */ } location.reload(); };
  }

  let BAD_END_TOTAL = 0;
  window.addEventListener('DOMContentLoaded', () => {
    BAD_END_TOTAL = new Set(Object.values(CHAPTERS).flatMap(ch => compile(ch.script).filter(c => c.badEnd).map(c => c.badEnd.title))).size;
    document.documentElement.lang = LOCALE;
    document.querySelectorAll('[data-ui]').forEach(el => { el.textContent = ui(el.dataset.ui); });
    bind(); renderHud(); showTitle();
    preload();
  });
  function preload() {
    const sp = window.SPRITES; if (!sp) return;
    const urls = [...Object.values(sp.bg || {}), ...Object.values(sp.chars || {}).flatMap(o => Object.values(o))];
    const keep = (window.__simPreload = []);
    let i = 0;
    const next = () => { if (i >= urls.length) return; const img = new Image(); img.decoding = 'async'; img.onload = img.onerror = next; img.src = urls[i++]; keep.push(img); };
    for (let n = 0; n < 4; n++) next();
  }
  window.SimEngine = { compile, fresh, get state() { return S; }, ui, nameOf, hash };
})();
