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
 *   {route:'hina'|'mio'|'kaede'|'yuna'|'chloe'|'preet'|'ava'|'solo'}  lock the route; trust starts from her cast Trust
 *   {ach:'id'} {ending:'id'} {resource:'id'}
 *   {variant:'loc.slot'}                  play one authored variant from a pool (js/data/variants)
 *   {talk:'topic', with:'kaede'}          partner talk (expanded at compile time from js/data/talks.js)
 *   {with:'kaede'|'@route'}               set who the current talk is with (speaker '@talk')
 *   {deeper:'topic'}                      optional Think Deeper card (js/data/think.js); never blocks
 * Cast commands (js/cast-sim.js, docs/CAST_BIBLE.md §5). Each may carry why:'reason' for Mochi's recap:
 *   {reveal:'chloe.compassion'} | {reveal:{chloe:['compassion','warmth']}}   show a hidden radar axis
 *   {grow:{chloe:{gentleness:4}}}         a character changes (capped at ±20 per axis)
 *   {flaw:{chloe:{guarded:'seen'}}}       flaw state: hidden -> seen -> growing -> resolved (forward only)
 *   {judge:{who:'chloe', id:'chloe.onlymoney', verdict:'unfair'}}   log a judgement (js/data/judgements.js)
 *   {contact:'ama'}                       count as real time with someone this chapter (stops neglect)
 *   {outfit:{hina:'festive'}}             outfit for the rest of the scene (also o:'x' on show/s lines);
 *                                         falls back to the default sprite when the art does not exist
 *

 * fx keys: heroine ids, kenta, trust, wisdom (Love IQ), self (Self-respect), proj (Rose Filter),
 *          goal, passion, health, wallet (Your Life, 0-100), cash (SGD, also nudges wallet),
 *          '@route' (route heroine), '@talk' (current talk partner),
 *          'trust.<id>' / 'aff.<id>' (any cast member's Trust / Affection, js/data/cast.js).
 * Option extras: sig:'romance:chloe' (a romantic signal), clarity:'chloe' (you were clear about where things
 *          stand), lieTo:'id', honestHard:'id', id:'6-2' (internal source id used to merge recap rows; not shown).
 * Option `rose:true`: a clear-eyed option that greys out while the Rose Filter is above 60.
 * Speakers: '@route' = route heroine; '@talk' = current talk partner.
 * Text tokens: {name} {her} {n:id} {full:id} {passion} {cash}.
 */
(function () {
  'use strict';
  const $ = (q) => document.querySelector(q);
  const SAVE_KEY = 'sim4love.save.v2';
  const HEROINES = ['hina', 'mio', 'kaede', 'yuna', 'chloe', 'preet', 'ava'];
  const CS = () => window.CastSim;
  const LIFE_KEYS = ['goal', 'passion', 'health', 'wallet'];
  const AXES = ['spend', 'gifts', 'family', 'career', 'children', 'childEdu', 'learning', 'friends', 'lending', 'conflict', 'honesty', 'promises', 'home'];

  // ---------- i18n ----------
  const LOCALE = (() => {
    const packs = window.I18N || {};
    let want = null;
    // ?lang=zh-SG / ?lang=en-SG (used by the public site's "Play" links) wins once and is remembered.
    let q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) { /* ignore */ }
    if (q && packs[q] && packs[q].ready) { try { localStorage.setItem('sim4love.locale', q); } catch (e) { /* ignore */ } return q; }
    try { want = localStorage.getItem('sim4love.locale'); } catch (e) { /* ignore */ }
    if (want && packs[want] && packs[want].ready) return want;
    // First visit: follow the browser language (zh* -> Simplified Chinese, everything else -> English).
    const nav = (typeof navigator !== 'undefined' && (navigator.languages || [navigator.language])) || [];
    for (const l of nav) { if (/^zh/i.test(l || '') && packs['zh-SG'] && packs['zh-SG'].ready) return 'zh-SG'; if (/^en/i.test(l || '')) break; }
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
  // Story/data text: English is the source; a pack maps English -> translation, per chapter first, then globally.
  const story = (text, ctx) => {
    const p = PACK();
    const tb = (p.story || {})[ctx];
    return (tb && tb[text]) || (p.text && p.text[text]) || text;
  };
  const tx = (text) => (text == null ? '' : story(String(text)));

  const STAT_META = {
    hina: { icon: 'heart' }, mio: { icon: 'heart' }, kaede: { icon: 'heart' }, yuna: { icon: 'heart' },
    chloe: { icon: 'heart' }, preet: { icon: 'heart' }, ava: { icon: 'heart' },
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
  function compile(list, chN) {
    const out = [];
    let k = 0;
    function emit(arr) {
      for (const cmd of arr) {
        if (cmd.talk) { emit(window.SIM.talk(cmd.talk, cmd.with)); continue; }
        if (cmd.choice) {
          const c = { choice: cmd.choice, opts: [] };
          out.push(c);
          const ends = [];
          const src = cmd.id || `${chN || '?'}-c${++k}`;
          for (const o of cmd.opts) {
            c.opts.push({ t: o.t, fx: o.fx, val: o.val, lesson: o.lesson, flag: o.flag, ach: o.ach, show: o.if, rose: o.rose, pc: out.length,
              sig: o.sig, clarity: o.clarity, lieTo: o.lieTo, honestHard: o.honestHard, src: o.id || src });
            emit(o.then || []);
            out.push({ _k: -1 }); // end of this option's consequences: recap rows after this are "story" again
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
  const chIdx = (id) => ORDER().indexOf(id) + 1;
  const compileCh = (id) => compile(CHAPTERS[id].script, chIdx(id));

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
    view: { bg: 'title', petals: false, chars: {}, phone: null, msgs: [], outfit: {} },
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
  const passionLabel = () => { const p = (window.PASSIONS || {})[S.flags.passion]; return p ? tx(p.label) : ui('word.hobby'); };
  const herName = () => S.talkWith && S.talkWith !== 'kenta' && !routeKey() ? nameOf(S.talkWith) : routeKey() ? nameOf(routeKey()) : S.talkWith ? nameOf(S.talkWith) : ui('word.her');
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


  // ---------- background music ----------
  // WebAudio player: gapless loops, 1.6 s crossfade between moods, starts only after the first user gesture.
  // Volume and mute persist in localStorage. Tracks and the background->mood map live in js/data/music.js.
  const Music = (() => {
    const B = window.BGM || { tracks: {}, byBg: {}, moments: {} };
    const get = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } };
    const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };
    let vol = parseFloat(get('sim4love.bgm.vol', '0.6')); if (!(vol >= 0 && vol <= 1)) vol = 0.6;
    let muted = get('sim4love.bgm.mute', '0') === '1';
    let ctx = null, master = null, cur = null, want = null, unlocked = false, stopped = false;
    const buffers = {};
    const level = () => (muted ? 0 : vol * vol); // squared: closer to perceived loudness
    const FADE = 1.6;
    function load(id) {
      if (!buffers[id]) {
        buffers[id] = fetch(B.tracks[id].src).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
          .then(a => new Promise((res, rej) => ctx.decodeAudioData(a, res, rej)))
          .catch(e => { delete buffers[id]; console.warn('sim4love: music', id, e && e.message); throw e; });
      }
      return buffers[id];
    }
    function play() {
      if (!ctx || muted || stopped || !want || (cur && cur.id === want)) return;
      const id = want, tr = B.tracks[id];
      load(id).then(buf => {
        if (want !== id || muted || (cur && cur.id === id)) return;
        const src = ctx.createBufferSource();
        src.buffer = buf; src.loop = true;
        // Some decoders keep the MP3 encoder delay (~35 ms): skip it so the loop seam stays seamless.
        const extra = tr.loop ? buf.duration - tr.loop : 0;
        const head = extra > 0.03 ? Math.min(extra, 1105 / 32000) : 0;
        if (tr.loop && tr.loop + head <= buf.duration) { src.loopStart = head; src.loopEnd = head + tr.loop; }
        const g = ctx.createGain();
        src.connect(g); g.connect(master);
        const t = ctx.currentTime;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + FADE);
        src.start(t, head);
        if (cur) fadeOut(cur, t);
        cur = { id, src, gain: g };
      }).catch(() => { /* missing track: stay silent */ });
    }
    function fadeOut(o, t) {
      const gn = o.gain.gain;
      gn.cancelScheduledValues(t); gn.setValueAtTime(gn.value, t); gn.linearRampToValueAtTime(0, t + FADE);
      try { o.src.stop(t + FADE + 0.1); } catch (e) { /* already stopped */ }
    }
    function apply() { if (master) master.gain.setTargetAtTime(level(), ctx.currentTime, 0.05); }
    function unlock() {
      if (unlocked) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      unlocked = true;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = level(); master.connect(ctx.destination);
      if (ctx.resume) ctx.resume();
      ['pointerdown', 'keydown', 'touchend'].forEach(ev => window.removeEventListener(ev, unlock, true));
      play();
    }
    ['pointerdown', 'keydown', 'touchend'].forEach(ev => window.addEventListener(ev, unlock, true));
    document.addEventListener('visibilitychange', () => { if (ctx) { if (document.hidden) ctx.suspend(); else ctx.resume(); } });
    return {
      tracks: B.tracks,
      forBg: (bg) => B.byBg[bg],
      moment: (k) => (B.moments || {})[k],
      want(id) { if (id && B.tracks[id]) { want = id; play(); } },
      get volume() { return vol; },
      setVolume(v) { vol = Math.max(0, Math.min(1, v)); put('sim4love.bgm.vol', String(vol)); apply(); },
      get muted() { return muted; },
      setMuted(m) {
        muted = !!m; put('sim4love.bgm.mute', muted ? '1' : '0'); apply();
        if (!muted) play(); else if (cur && ctx) { fadeOut(cur, ctx.currentTime); cur = null; }
      },
      // Permanent stop for this page (age gate exit): nothing plays again until a reload.
      stop() { stopped = true; want = null; if (cur && ctx) { fadeOut(cur, ctx.currentTime); cur = null; } if (ctx && ctx.suspend) setTimeout(() => ctx.suspend(), 1800); },
      state: () => ({ unlocked, stopped, playing: cur && cur.id, wanted: want, volume: vol, muted, ctx: ctx && ctx.state }),
    };
  })();
  const bgmFor = () => S.view.bgm || Music.forBg(S.view.bg);
  const syncMusic = () => Music.want(bgmFor());

  // ---------- rendering ----------
  function renderBg(instant) {
    syncMusic();
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
  function swapExpr(el, k, e, o) {
    const tmp = document.createElement('div');
    tmp.innerHTML = Art.character(k, e, nameOf(k, true), o);
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
      const o = (S.view.outfit || {})[k] || '';
      const ek = o ? st.e + '@' + o : st.e;
      if (el.dataset.expr !== ek) {
        const first = !el.dataset.expr;
        swapExpr(el, k, st.e, o || undefined); el.dataset.expr = ek;
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
  let hudOpen = false;
  function renderHud() {
    const chips = [];
    const hearts = routeKey() ? [routeKey()] : S.route === 'solo' ? [] : HEROINES.filter(k => S.stats[k]);
    // Narrow screens (CSS <=600px): several hearts fold into one summary chip; tapping it opens the full list as a dropdown.
    if (hearts.length > 1) {
      const top = hearts.slice().sort((a, b) => (shown(b) - shown(a)) || (HEROINES.indexOf(a) - HEROINES.indexOf(b)))[0];
      chips.push(`<button type="button" class="chip hsum" style="--c:${Art.CAST[top].color}" aria-expanded="${hudOpen}" aria-controls="hud-hearts" title="${esc(ui('hud.hearts'))}">${icon('heart')}${esc(nameOf(top))} <i>${shown(top)}</i><b class="more">· ${esc(ui('hud.count').replace('{n}', hearts.length))}</b></button>`);
      chips.push(`<span id="hud-hearts" class="hearts${hudOpen ? ' open' : ''}" role="group" aria-label="${esc(ui('hud.hearts'))}">`);
    } else chips.push('<span class="hearts single">');
    hearts.forEach(k => chips.push(`<span class="chip" style="--c:${Art.CAST[k].color}" title="${esc(nameOf(k))}">${icon('heart')}${esc(nameOf(k))} <i>${shown(k)}</i></span>`));
    chips.push('</span>');
    if (routeKey()) chips.push(`<span class="chip" style="--c:#8fc7e6" title="${esc(ui('stat.trust'))}">${icon('link')}${esc(ui('stat.trust'))} <i>${shown('trust')}</i></span>`);
    chips.push(`<span class="chip" style="--c:#7fa6ff" title="${esc(ui('stat.wisdom'))}">${icon('spark')}${esc(ui('stat.wisdom'))} <i>${shown('wisdom')}</i></span>`);
    chips.push(`<span class="chip" style="--c:#e6c878" title="${esc(ui('stat.self'))}">${icon('crown')}${esc(ui('stat.self'))} <i>${shown('self')}</i></span>`);
    if (S.stats.proj > 0) chips.push(`<span class="chip rosechip ${S.stats.proj > 60 ? 'hot' : ''}" style="--c:#ff7a9c" title="${esc(ui('stat.proj'))}">${icon('rose')}${esc(ui('stat.proj'))} <i>${shown('proj')}</i></span>`);
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
    if (auto) { clearTimeout(autoTimer); autoTimer = setTimeout(() => { if (auto && !busy) advance(); }, 1200 + typing.full.length * (/^zh/.test(LOCALE) ? 70 : 25)); }
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
  // Display only: meters read 0-100 on screen. The raw values (which can run past either end) still drive every ending and rank.
  const shown = (k) => clamp(Math.round(S.stats[k] || 0), 0, 100);
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
      if (/^(trust|aff)\./.test(k)) {
        const id = k.split('.')[1];
        if (CS().fx(S, k, d)) show(`${nameOf(id)} · ${k[0] === 't' ? ui('stat.trust') : relName(id)} ${d > 0 ? '+' : ''}${d}`, d, (Art.CAST[id] || {}).color || '#8fc7e6');
        return;
      }
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
      const before = S.stats[k] || 0;
      S.stats[k] = before + d;
      if (k === 'trust') S.stats.trust = clamp(S.stats.trust, 0, 100);
      if (k === 'proj') { S.stats.proj = clamp(S.stats.proj, 0, 100); if (S.stats.proj <= 60) CS().flush(S); }
      if (k === 'trust') CS().note(S, null, 'trust', S.stats.trust - before);
      else if (CS().STAT_IDS.includes(k)) CS().note(S, k, 'aff', d);
      const m = STAT_META[k] || {};
      if (m.quiet && !routeKey()) { show(`${nameOf(k)} ${d > 0 ? '+' : ''}${d}`, d, '#c9a45c'); return; }
      const label = m.hidden ? `${nameOf(k)} ???` : `${statLabel(k)} ${d > 0 ? '+' : ''}${d}`;
      show(label, k === 'proj' ? -d : d, Art.CAST[k] && Art.CAST[k].color);
    });
    renderHud();
    if (fx.proj) renderChars();
  }
  function applyVal(v) {
    if (v) Object.entries(v).forEach(([a, x]) => { S.values[a] = clamp(x, -2, 2); if (S.valuesSet && !S.valuesSet.includes(a)) S.valuesSet.push(a); });
  }
  const relName = (id) => ui('rel.' + (((window.CAST || {})[id] || {}).rel || 'friend'));
  function toast(text, kind, color, html) {
    const t = document.createElement('div');
    t.className = 'toast ' + kind;
    if (color) t.style.setProperty('--c', color);
    if (html) t.innerHTML = text; else t.textContent = text;
    const box = $('#toasts');
    box.appendChild(t);
    // Keep the stack short so toasts never cover a whole card; narrow screens keep two and fold the rest into "+N".
    const cap = window.matchMedia && window.matchMedia('(max-width: 600px)').matches ? 2 : 3;
    const live = () => [...box.children].filter((x) => !x.classList.contains('more'));
    let dropped = 0;
    while (live().length > cap) { live()[0].remove(); dropped++; }
    if (cap === 2 && dropped) {
      let m = box.querySelector('.toast.more');
      if (!m) { m = document.createElement('div'); m.className = 'toast more'; m.dataset.n = '0'; }
      m.dataset.n = String(+m.dataset.n + dropped); m.textContent = ui('hud.more').replace('{n}', m.dataset.n);
      box.appendChild(m); clearTimeout(m._t); m._t = setTimeout(() => m.remove(), 2600);
    }
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
      if (c._k) { kPop(); continue; }
      if (c.cond) { if (!c.cond(S)) S.pc = c.jfalse; continue; }
      if (c.variant) { playVariant(c.variant); continue; }
      if (c.with !== undefined && !c.talk) { S.talkWith = window.SIM.resolveWith(c, S); continue; }
      if (c.bg !== undefined) { S.view.bg = c.bg; S.view.bgm = null; S.view.petals = !!c.petals; S.view.outfit = {}; renderBg(); continue; }
      if (c.reveal || c.grow || c.flaw || c.judge || c.contact) { castCmd(c); continue; }
      if (c.outfit) { Object.entries(c.outfit).forEach(([k0, o]) => { const k = who(k0); (S.view.outfit = S.view.outfit || {})[k] = typeof o === 'string' ? o : o && o.id; }); renderChars(); continue; }
      if (c.bgm !== undefined) { S.view.bgm = c.bgm === 'auto' ? null : c.bgm; syncMusic(); continue; }
      if (c.flag !== undefined) { typeof c.flag === 'string' ? (S.flags[c.flag] = true) : Object.assign(S.flags, c.flag); continue; }
      if (c.fx) { applyFx(c.fx); continue; }
      if (c.val) { applyVal(c.val); continue; }
      if (c.route) {
        S.route = c.route;
        // Trust carries over from before the lock: juggling and gossip lower where the relationship starts.
        const r = routeKey();
        if (r && S.cast && S.cast[r]) { S.stats.trust = Math.max(S.stats.trust, clamp(S.cast[r].trust, 10, 100)); S.cast[r].trust = S.stats.trust; }
        else if (r) S.stats.trust = Math.max(S.stats.trust, 20);
        renderHud(); continue;
      }
      if (c.ach) { unlockAch(c.ach); continue; }
      if (c.lesson) { showLesson(c.lesson, () => { step(); save(); }); return; }
      if (c.deeper) { showDeeper(c.deeper); return; }
      if (c.resource) { showResource(c.resource); return; }
      if (c.ending) { showEnding(c.ending === '@auto' ? window.SIM.endingFor(S) : c.ending); return; }
      if (c.show) { const k = who(c.show); if (c.o) (S.view.outfit = S.view.outfit || {})[k] = c.o; S.view.chars[k] = { e: c.e || 'neutral', at: c.at || 'center' }; CS().stage(S, k); renderChars(); continue; }
      if (c.hide) { const k = c.hide === '*' ? '*' : who(c.hide); if (k === '*') S.view.chars = {}; else delete S.view.chars[k]; renderChars(); continue; }
      if (c.phone) { S.view.phone = c.phone; S.view.msgs = []; renderPhone(); continue; }
      if (c.phoneOff) { S.view.phone = null; S.view.msgs = []; renderPhone(); continue; }
      if (c.txt) {
        const from = who(c.txt);
        CS().stage(S, from);
        S.view.msgs.push({ from, t: c.t }); renderPhone();
        const nm = from === 'me' ? S.name : from === 'sys' ? '' : nameOf(from) === from ? fmt(from) : nameOf(from);
        setBox('phonebox', nm || ui('phone.title'), c.t, (Art.CAST[from] && Art.CAST[from].color) || (from === 'me' ? '#8fa8e6' : '#c9a45c'));
        return;
      }
      if (c.s) {
        const k = who(c.s);
        if (!Art.CAST[k]) { renderChars(); setBox('say', nameOf(k) === k ? fmt(k) : nameOf(k), c.t, '#c9a45c'); return; } // walk-on NPC: name only, no sprite
        const prev = S.view.chars[k];
        if (c.o) (S.view.outfit = S.view.outfit || {})[k] = c.o;
        CS().stage(S, k);
        S.view.chars[k] = { e: c.e || (prev && prev.e) || 'neutral', at: c.at || (prev && prev.at) || 'center' };
        renderChars(k);
        setBox('say', nameOf(k), c.t, (Art.CAST[k] || {}).color);
        return;
      }
      if (c.n) { renderChars(); setBox('narr', '', c.n); return; }
      if (c.me) { setBox('say', S.name, c.me, '#8fa8e6'); return; }
      if (c.think) { setBox('think', S.name, c.think, '#a8977a'); return; }
      if (c.mochi) { setBox('mochi', ui('name.mochi'), c.mochi, '#ff8fb8', c.e); return; }
      if (c.choice) { showChoice(c); return; }
      if (c.badEnd) { showBadEnd(c.badEnd); return; }
      if (c.chapterEnd) { endChapter(); return; }
    }
  }
  // Choice depth: rows logged while an option's consequences run are "your choice" rows with that choice's id.
  function kPush(o) { (S.kst = S.kst || []).push({ src: o.src, reason: o.t }); kSync(); }
  function kPop() { if (S.kst && S.kst.length) S.kst.pop(); kSync(); }
  function kSync() { const top = (S.kst || [])[S.kst.length - 1]; S.kd = (S.kst || []).length; S.ksrc = top ? top.src : null; S.kreason = top ? top.reason : null; }
  function castCmd(c) {
    const n0 = S.changes.length;
    CS().cmd(S, c, who);
    castToasts(S.changes.slice(n0));
  }
  // Mid-scene toasts for what you just learned (reveals, flaws, judgements). Numbers stay in the recap.
  function castToasts(rows) {
    rows.forEach((r, i) => {
      let t = null;
      if (r.field.startsWith('reveal.')) t = `${icon('lens')}${ui('toast.reveal', { name: nameOf(r.who), axis: ui('axis.' + r.field.slice(7)) })}`;
      else if (r.field === 'blur') t = `${icon('rose')}${ui('toast.blur', { name: nameOf(r.who) })}`;
      else if (r.field.startsWith('flaw.')) t = `${icon('spark')}${ui('toast.flaw', { name: nameOf(r.who), flaw: flawName(r.field.slice(5)) })}`;
      else if (r.field.startsWith('judge.')) t = `${icon('scale')}${ui(r.struck ? 'toast.struck' : 'toast.judge', { name: nameOf(r.who) })}`;
      if (t) setTimeout(() => toast(t, 'up cast', (Art.CAST[r.who] || {}).color || '#c9a45c', true), i * 300);
    });
  }
  const flawName = (tag) => tx(((window.CAST_TEXT || {}).flaw || {})[tag] || tag);
  function endChapter() {
    S.kst = []; kSync();
    if (!S.cast) { showResults(); return; }
    const rows = CS().chapterEnd(S);
    save();
    showRecap(rows, S.cs.ch, () => showResults());
  }
  function advance() {
    if (busy) return;
    if (typing && !typing.done) { finishType(); return; }
    step();
    save();
  }

  // ---------- choices ----------
  let curChoice = null; // read-only test hook (tests/playthrough.js --route=)
  function showChoice(c) {
    busy = true; curChoice = c;
    checkpoint = fromVq ? clone({ ...S, vq: [c].concat(S.vq) }) : clone({ ...S, pc: S.pc - 1 });
    setBox('narr choicebox', '', c.choice);
    finishType();
    const wrap = $('#choices');
    // Options appear in a stable per-player order (same save, same order, so rewinds stay consistent),
    // so the clear-eyed answer is not always in the same slot.
    const visible = c.opts.map((o, i) => [o, i]).filter(([o]) => !o.show || o.show(S))
      .sort((a, b) => hash(S.name, S.chapter, c.choice, a[0].t) - hash(S.name, S.chapter, c.choice, b[0].t));
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
      if (o.pc !== undefined) kPush(o);
      const n0 = S.changes ? S.changes.length : 0;
      if (S.cast) CS().choose(S, o, Object.keys(S.view.chars), who);
      if (S.changes) castToasts(S.changes.slice(n0));
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
      if (ev.target === m && m.classList.contains('sheet')) { m.querySelector('[data-close]').click(); return; }
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
        <h2>${esc(tx(be.title).replace(/^BAD END #\d+ — /, ''))}</h2>
        <p>${esc(fmt(be.text))}</p>
        <div class="lesson-mochi">${mochiFace('sad')}<span>${esc(be.serious ? ui('badend.serious') : ui('badend.mochi'))}</span></div>
        <button class="btn primary" data-close>${esc(ui('btn.rewind'))}</button>
      </div>`, () => {
        const rewind = () => {
          const keep = { lessons: S.lessons, badEnds: S.badEnds, reflections: S.reflections, achievements: S.achievements };
          S = Object.assign(clone(checkpoint), keep);
          // A bad end is a wake-up call: the Rose Filter drops to its threshold so the clear-eyed option is open again (no rewind loops).
          if (S.stats.proj > 60) S.stats.proj = 60;
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
    toast(`${ui('ach.toast')}: ${tx(A.title)}`, 'up', '#e6c878');
  }
  function endingText(E) {
    const r = routeKey();
    return (E.byRoute && r && E.byRoute[r]) || E.text || '';
  }
  function showEnding(id) {
    const E = (window.ENDINGS || {})[id] || { type: 'Ending', title: id, text: '' };
    if (!S.endings.includes(id)) S.endings.push(id);
    Music.want(Music.moment('ending'));
    try { const g = JSON.parse(localStorage.getItem('sim4love.gallery') || '[]'); if (!g.includes(id)) { g.push(id); localStorage.setItem('sim4love.gallery', JSON.stringify(g)); } } catch (e) { /* ignore */ }
    modal(`<div class="results ending">
        <div class="be-label ok ornament">${esc(tx(E.type))}</div>
        <h2>${esc(fmt(E.title))}</h2>
        ${fmt(endingText(E)).split('\n').map(p => `<p>${esc(p)}</p>`).join('')}
        <button class="btn primary" data-close>${esc(ui('btn.continue'))}</button>
      </div>`, () => step());
  }
  function showResource(id, then) {
    const R = (window.RESOURCES || {})[id] || { title: ui('resource.kicker'), lines: [] };
    modal(`<div class="lesson green resource">
        <div class="lesson-kind ornament">${esc(ui('resource.kicker'))}</div>
        <div class="lesson-icon" aria-hidden="true">${icon('shield')}</div>
        <h2>${esc(tx(R.title))}</h2>
        <ul class="resource-list">${R.lines.map(l => `<li>${esc(tx(l))}</li>`).join('')}</ul>
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
  function deeperCard(T, id, then0, readonly) {
    Music.want(Music.moment('deeper'));
    const then = () => { syncMusic(); then0 && then0(); };
    const mentor = T.mentor && T.mentor !== 'mochi' ? nameOf(T.mentor) : ui('name.drmochi');
    const lensName = (k) => ui('lens.' + k);
    const picked = S.reflections[id] && S.reflections[id].lens;
    modal(`<div class="deeper">
        <div class="lesson-kind ornament">${esc(ui('deeper.kicker'))} · ${esc(mentor)}</div>
        <h2>${esc(fmt(T.title))}</h2>
        <p class="hook">${esc(fmt(T.hook))}</p>
        ${T.lenses.map((L, i) => `<section class="lens ${L.kind}"><h3>${icon(L.kind === 'structural' ? 'scale' : L.kind === 'personal' ? 'target' : 'home')}${esc(L.label ? tx(L.label) : lensName(L.kind))}</h3><p>${esc(fmt(L.text))}</p></section>`).join('')}
        <section class="lens sg"><h3>${icon('pin')}${esc(ui('deeper.sg'))}</h3><ul>${T.sg.map(x => `<li>${esc(fmt(x.t))}${x.src ? ` <a href="${esc(x.src)}" target="_blank" rel="noopener">${esc(ui('deeper.source'))}</a>` : ''}</li>`).join('')}</ul></section>
        <p class="reframe">${esc(fmt(T.reframe))}</p>
        <p class="closing">${esc(ui('deeper.closing'))}</p>
        <h3 class="q">${esc(fmt(T.question))}</h3>
        <div class="lens-pick">${T.lenses.map((L, i) => `<button class="btn small ${picked === L.kind ? 'on' : ''}" data-lens="${L.kind}">${esc(L.label ? tx(L.label) : lensName(L.kind))}</button>`).join('')}<button class="btn small ${picked === 'none' ? 'on' : ''}" data-lens="none">${esc(ui('deeper.nopick'))}</button></div>
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
    const met = (k) => (S.stats[k] || 0) !== 0 || (S.cast && S.cast[k] && S.cast[k].met);
    const people = routeKey() ? [routeKey()] : S.route === 'solo' ? ['kenta'] : HEROINES.filter((k, i) => i < 4 || met(k)).concat('rei');
    const bars = people.map(k => {
      const c = Art.CAST[k], v = S.stats[k];
      const pct = clamp(v * 2 + 10, 0, 100);
      const label = k === 'rei' ? '???' : shown(k);
      return `<div class="bar"><span>${esc(nameOf(k))}</span><div class="track"><div class="fill" style="width:${k === 'rei' ? 50 : pct}%;--c:${c.color}"></div></div><b>${label}</b></div>`;
    }).join('') + (routeKey() ? `<div class="bar"><span>${esc(ui('stat.trust'))}</span><div class="track"><div class="fill" style="width:${shown('trust')}%;--c:#8fc7e6"></div></div><b>${shown('trust')}</b></div>` : '');
    const rank = rankOf();
    const lessons = S.lessons.map(id => `<li class="${LESSONS[id].kind}">${esc(fmt(LESSONS[id].title))}</li>`).join('');
    try { const p = JSON.parse(localStorage.getItem('sim4love.progress') || '{}'); p[S.chapter] = true; localStorage.setItem('sim4love.progress', JSON.stringify(p)); } catch (e) { /* ignore */ }
    modal(`<div class="results">
      <div class="be-label ok ornament">${esc(ui('results.complete', { ch: tx(ch.title) }))}</div>
      <h2>${esc(tx(ch.subtitle))}</h2>
      <div class="rank"><b>${rank[0]}</b><span>${esc(rank[1])}</span></div>
      <div class="pair"><div>${esc(ui('stat.wisdom'))} <b>${shown('wisdom')}</b></div><div>${esc(ui('stat.self'))} <b>${shown('self')}</b></div>${S.stats.proj ? `<div>${esc(ui('stat.proj'))} <b>${shown('proj')}</b></div>` : ''}</div>
      <h3>${esc(ui('life.title'))}</h3>
      ${lifeBars()}
      <h3>${esc(ui('results.people'))}</h3>
      ${bars}
      <h3>${esc(ui('notebook.title'))} (${S.lessons.length}/${Object.keys(LESSONS).length})</h3>
      <ul class="lesson-list">${lessons}</ul>
      ${S.badEnds.length ? `<p class="muted">${esc(ui('results.badends', { n: S.badEnds.length, total: BAD_END_TOTAL }))}</p>` : ''}
      ${S.endings.length && !nextId ? `<p class="muted">${esc(ui('results.endings'))}: ${S.endings.map(e => esc(tx((ENDINGS[e] || { title: e }).title))).join(' · ')}</p>` : ''}
      ${nextId ? '' : `<p class="muted">${esc(ui('results.thanks'))}</p>`}
      <div class="row"><button class="btn" data-act="restart">${esc(ui('btn.again'))}</button><button class="btn ${nextId ? '' : 'primary'}" data-act="title">${esc(ui('btn.title'))}</button>${nextId ? `<button class="btn primary" data-act="next">${esc(ui('btn.next', { ch: tx(CHAPTERS[nextId].title) }))}</button>` : ''}</div>
    </div>`);
  }


  // ---------- cast: recap, Cast tab, profile (docs/CAST_BIBLE.md §5.6-5.8) ----------
  const castIds = () => Object.keys(window.CAST || {});
  const axisName = (a) => ui('axis.' + a);
  function fieldText(r) {
    const f = r.field;
    if (f === 'trust') return ui('stat.trust');
    if (f === 'aff') return relName(r.who);
    if (f.startsWith('reveal.')) return ui('recap.reveal', { axis: axisName(f.slice(7)) });
    if (f.startsWith('radar.')) return axisName(f.slice(6));
    if (f.startsWith('flaw.')) return `${flawName(f.slice(5))} · ${ui('flaw.' + r.state)}`;
    if (f.startsWith('judge.')) return ui(r.struck ? 'recap.struck' : 'recap.judge');
    if (f === 'fuse') return ui(r.off ? 'recap.fuseoff' : 'recap.fuse');
    if (f === 'blur') return ui('recap.blur');
    if (f === 'quiet') return ui('recap.quiet');
    return f;
  }
  function judgeText(id, struck) {
    const J = (window.JUDGEMENTS || {})[id] || {};
    return fmt(struck ? J.strike || J.t || id : J.t || id);
  }
  function rowHtml(r) {
    const d = r.delta ? `<b class="${r.delta > 0 ? 'up' : 'down'}">${r.delta > 0 ? '+' : '−'}${Math.abs(r.delta)}</b>` : '';
    const reason = r.field.startsWith('judge.') ? judgeText(r.field.slice(6), r.struck) : r.reason ? fmt(r.reason) : '';
    const judge = r.field.startsWith('judge.');
    return `<li class="rc-row ${r.kind}${r.struck ? ' struck' : ''}"><i aria-label="${esc(ui('recap.' + r.kind))}" title="${esc(ui('recap.' + r.kind))}">${r.kind === 'choice' ? '👆' : '📖'}</i>`
      + `<span class="rc-main"><span class="rc-field">${esc(fieldText(r))} ${d}</span>${reason ? `<span class="rc-why">${judge && r.struck ? `<s>${esc(judgeText(r.field.slice(6), false))}</s> ` : ''}${esc(reason)}</span>` : ''}</span>`
      + '</li>'; // r.src is an internal id (merge key only); never shown to players
  }
  // Rows of one chapter: same person + field + source are merged; the most important 8 show first.
  function recapRows(rows) {
    const merged = [];
    rows.filter(r => r.who !== '*').forEach(r => {
      const key = [r.who, r.field, r.src, r.kind].join('|');
      const m = !r.field.startsWith('judge.') && !r.field.startsWith('flaw.') && merged.find(x => x.key === key);
      if (m) m.delta += r.delta; else merged.push(Object.assign({ key }, r));
    });
    const weight = (r) => (r.field.startsWith('reveal.') || r.field.startsWith('judge.') ? 100 : r.field.startsWith('flaw.') ? 90 : r.field === 'fuse' ? 80 : 0) + Math.abs(r.delta || 0);
    return merged.filter(r => r.delta || !/^(trust|aff|radar\.)/.test(r.field)).map((r, i) => Object.assign(r, { w: weight(r), i }));
  }
  function recapBody(rows, all) {
    const list = recapRows(rows);
    const top = new Set(list.slice().sort((a, b) => b.w - a.w || a.i - b.i).slice(0, 8).map(r => r.i));
    const keep = all ? list : list.filter(r => top.has(r.i));
    const groups = [];
    keep.forEach(r => { let g = groups.find(x => x.who === r.who); if (!g) groups.push(g = { who: r.who, rows: [] }); g.rows.push(r); });
    const html = groups.map(g => `<section class="rc-person" style="--c:${(Art.CAST[g.who] || {}).color || '#c9a45c'}"><h3><button class="linkish" data-act="cast:${g.who}">${esc(nameOf(g.who))}</button></h3><ul>${g.rows.map(rowHtml).join('')}</ul></section>`).join('');
    return { html, more: list.length - keep.length, total: list.length };
  }
  function recapFoot(rows) {
    const fuses = castIds().filter(id => S.cast[id] && S.cast[id].fuse);
    const live = (S.gossip || []).filter(g => !g.dead);
    const seeded = rows.filter(r => r.who === '*' && r.field === 'gossip').length;
    const bits = [];
    if (fuses.length) bits.push(`<p>${icon('moon')}${esc(ui('recap.fuses'))}: ${fuses.map(id => esc(nameOf(id))).join(' · ')}</p>`);
    if (live.length || seeded) bits.push(`<p>${icon('note')}${esc(ui('recap.gossip', { n: live.length }))}</p>`);
    if ((S.cs.q || []).length) bits.push(`<p>${icon('rose')}${esc(ui('recap.queued'))}</p>`);
    return bits.length ? `<footer class="rc-foot">${bits.join('')}</footer>` : '';
  }
  function showRecap(rows, chN, then, readonly) {
    const b = recapBody(rows, false);
    const ch = CHAPTERS[ORDER()[chN - 1]] || {};
    modal(`<div class="recap" data-ch="${chN}">
        <div class="lesson-kind ornament">${esc(ui('recap.kicker'))}${ch.title ? ' · ' + esc(tx(ch.title)) : ''}</div>
        <h2>${esc(ui('recap.title'))}</h2>
        <div class="lesson-mochi">${mochiFace(b.total ? 'happy' : 'neutral')}<span>${esc(b.total ? ui('recap.mochi') : ui('recap.none'))}</span></div>
        <div class="rc-list">${b.html}</div>
        ${b.more > 0 ? `<button class="btn small rc-all" type="button">${esc(ui('recap.showall', { n: b.total }))}</button>` : ''}
        ${recapFoot(rows)}
        <p class="muted small rc-legend">👆 ${esc(ui('recap.choice'))} · 📖 ${esc(ui('recap.story'))}</p>
        <button class="btn primary" data-close>${esc(ui(readonly ? 'btn.close' : 'btn.continue'))}</button>
      </div>`, then, 'recapm');
    const m = $('#modal');
    m._recap = { rows, chN, then };
    const allBtn = m.querySelector('.rc-all');
    if (allBtn) allBtn.onclick = (e) => { e.stopPropagation(); m.querySelector('.rc-list').innerHTML = recapBody(rows, true).html; allBtn.remove(); };
  }

  function radarSvg(id) {
    const P = CS().perceived(S, id), e = S.cast[id];
    const axes = (window.CAST_AXES || []).concat('fit');
    const fit = e.seen.fit ? CS().fit(S, id) : null;
    const first = axes.map(a => (a === 'fit' ? 50 : P.first[a]));
    const now = axes.map((a, i) => (a === 'fit' ? (fit == null ? null : fit) : P.now[a]));
    const R = 92, cx = 150, cy = 128, N = axes.length;
    const pt = (i, v) => { const ang = -Math.PI / 2 + i * 2 * Math.PI / N, r = R * clamp(v, 0, 100) / 100; return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]; };
    const poly = (vals) => vals.map((v, i) => pt(i, v).map(n => n.toFixed(1)).join(',')).join(' ');
    const rings = [25, 50, 75, 100].map(v => `<polygon class="rd-ring" points="${poly(axes.map(() => v))}"/>`).join('');
    const spokes = axes.map((a, i) => { const [x, y] = pt(i, 100); return `<line class="rd-spoke" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
    const anySeen = now.some(v => v != null);
    const solid = anySeen ? `<polygon class="rd-now" points="${poly(now.map((v, i) => (v == null ? first[i] : v)))}"/>` + now.map((v, i) => (v == null ? '' : `<circle class="rd-dot" cx="${pt(i, v)[0].toFixed(1)}" cy="${pt(i, v)[1].toFixed(1)}" r="3.2"/>`)).join('') : '';
    const labels = axes.map((a, i) => {
      const [x, y] = pt(i, 122);
      const anchor = Math.abs(x - cx) < 8 ? 'middle' : x > cx ? 'start' : 'end';
      const v = now[i];
      return `<text class="rd-label ${v == null ? 'unk' : ''}" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${esc(axisName(a))} <tspan class="rd-val">${v == null ? '?' : v}</tspan></text>`;
    }).join('');
    return `<svg class="radar" viewBox="0 0 300 256" role="img" aria-label="${esc(ui('cast.radar', { name: nameOf(id) }))}">${rings}${spokes}<polygon class="rd-first" points="${poly(first)}"/>${solid}${labels}</svg>
      <div class="rd-key"><span class="k-first">${esc(ui('cast.first'))}</span><span class="k-now">${esc(ui('cast.seen'))}</span></div>`;
  }
  function castBar(label, v, color) {
    return `<div class="bar"><span>${esc(label)}</span><div class="track"><div class="fill" style="width:${clamp(Math.round(v), 0, 100)}%;--c:${color}"></div></div><b>${clamp(Math.round(v), 0, 100)}</b></div>`;
  }
  function castRole(id) { return tx(((window.CAST_TEXT || {}).role || {})[id] || ''); }
  function castGrid() {
    const all = castIds(), ids = all.filter(id => window.CAST[id].heroine).concat(all.filter(id => !window.CAST[id].heroine));
    return `<div class="cast-grid">${ids.map(id => {
      const e = S.cast && S.cast[id];
      if (!e || !e.met) return `<div class="cast-card locked"><div class="cc-face">?</div><b>???</b><small>${esc(ui('cast.notmet'))}</small></div>`;
      const c = Art.CAST[id] || {};
      return `<button class="cast-card" data-act="cast:${id}" style="--c:${c.color || '#c9a45c'}"><div class="cc-face">${Art.character(id, 'neutral', nameOf(id, true))}</div><b>${esc(nameOf(id))}</b><small>${esc(castRole(id))}</small>${e.fuse ? `<i class="cc-fuse" title="${esc(ui('recap.fuse'))}">${icon('moon')}</i>` : ''}</button>`;
    }).join('')}</div>`;
  }
  function openProfile(id) {
    const C = window.CAST[id], e = S.cast[id];
    if (!C || !e) { openNotebook('cast'); return; }
    const color = (Art.CAST[id] || {}).color || '#c9a45c';
    const fit = e.seen.fit ? CS().fit(S, id) : null;
    const flaws = Object.entries(e.flaws).map(([tag, st]) => `<li class="flaw ${st}"><b>${esc(st === 'hidden' ? '?' : flawName(tag))}</b><small>${esc(ui('flaw.' + st))}</small></li>`).join('');
    const tl = CS().timeline(S, id);
    const judg = e.judgements.map(j => `<li class="${j.struck ? 'struck' : ''}"><small>${esc(ui('cast.ch', { n: j.ch }))}</small>${j.struck ? `<s>${esc(judgeText(j.id, false))}</s><span>${esc(judgeText(j.id, true))}</span>` : `<span>${esc(judgeText(j.id, false))}</span>`}</li>`).join('');
    const hist = tl.filter(r => !r.field.startsWith('judge.')).slice(-12).reverse().map(r => `<li><small>${esc(ui('cast.ch', { n: r.ch }))}</small>${rowHtml(r).replace(/^<li[^>]*>|<\/li>$/g, '')}</li>`).join('');
    const proj = C.heroine && (S.stats.proj || 0) > 0 ? `<p class="muted small">${icon('rose')}${esc(ui('cast.rosehint'))}</p>` : '';
    modal(`<div class="notebook profile" style="--c:${color}">${sheetHead(nameOf(id, true))}
      <div class="pf-top"><div class="pf-face">${Art.character(id, 'neutral', nameOf(id, true))}</div>
        <div class="pf-meta"><p class="pf-role">${esc(castRole(id))}</p>
          ${castBar(relName(id), CS().aff(S, id) * (CS().STAT_IDS.includes(id) ? 2 : 1) + (CS().STAT_IDS.includes(id) ? 10 : 0), color)}
          ${castBar(ui('stat.trust'), e.trust, '#8fc7e6')}
          <p class="pf-fit">${esc(ui('cast.fit'))}: <b>${fit == null ? '?' : fit}</b>${fit == null ? `<small>${esc(ui('cast.fithint'))}</small>` : ''}</p>
          ${e.fuse ? `<p class="pf-fuse">${icon('moon')}${esc(ui('recap.fuse'))}</p>` : ''}</div></div>
      <div class="pf-radar">${radarSvg(id)}</div>${proj}
      <h3>${esc(ui('cast.flaws'))}</h3><ul class="pf-flaws">${flaws || `<li class="muted">${esc(ui('cast.empty'))}</li>`}</ul>
      ${judg ? `<h3>${esc(ui('cast.judgements'))}</h3><ul class="pf-judge">${judg}</ul>` : ''}
      <h3>${esc(ui('cast.timeline'))}</h3><ul class="pf-tl">${hist || `<li class="muted">${esc(ui('cast.empty'))}</li>`}</ul>
      <div class="sheet-foot"><button class="btn" data-act="notebook:cast">${esc(ui('btn.back'))}</button><button class="btn primary" data-close>${esc(ui('btn.close'))}</button></div></div>`, null, 'sheet');
    const back = $('#modal .sheet-back'); if (back) { back.removeAttribute('data-close'); back.dataset.act = 'notebook:cast'; }
  }

  // ---------- menus ----------
  function sheetHead(title) {
    return `<div class="sheet-head"><button class="icon-btn sheet-back" data-close="back" aria-label="${esc(ui('btn.back'))}" title="${esc(ui('btn.back'))}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${esc(ui('btn.back'))}</span></button><h2>${esc(title)}</h2><button class="icon-btn sheet-x" data-close="x" aria-label="${esc(ui('btn.close'))}" title="${esc(ui('btn.close'))}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button></div>`;
  }
  function openNotebook(tab) {
    const all = Object.entries(LESSONS).map(([id, L]) => S.lessons.includes(id)
      ? `<li class="${L.kind}"><i aria-hidden="true">${icon(L.ic)}</i><b>${esc(fmt(L.title))}</b><span>${esc(fmt(L.text))}</span></li>`
      : `<li class="locked"><i aria-hidden="true">${icon('lock')}</i><b>${esc(ui('notebook.locked'))}</b><span>${esc(ui('notebook.lockedhint'))}</span></li>`).join('');
    const deep = Object.entries(window.THINK || {}).map(([id, T]) => S.reflections[id]
      ? `<li class="deep"><i aria-hidden="true">${icon('lens')}</i><b><button class="linkish" data-act="deep:${id}">${esc(fmt(T.title))}</button></b><span>${esc(fmt(T.hook))}${S.reflections[id].lens && S.reflections[id].lens !== 'none' ? ' · ' + esc(ui('deeper.yourlens')) + ': ' + esc(ui('lens.' + S.reflections[id].lens)) : ''}</span></li>`
      : `<li class="locked"><i aria-hidden="true">${icon('lock')}</i><b>${esc(ui('deeper.locked'))}</b><span>${esc(ui('deeper.lockedhint'))}</span></li>`).join('');
    const life = `<div class="life-pane">${lifeBars()}<p class="muted">${esc(ui('life.hint'))}</p></div>`;
    const t = tab || 'lessons';
    const castN = S.cast ? castIds().filter(id => S.cast[id].met).length : 0;
    modal(`<div class="notebook">${sheetHead(ui('notebook.title'))}
      <div class="tabs" role="tablist"><button class="tab ${t === 'lessons' ? 'on' : ''}" data-tab="lessons">${esc(ui('notebook.lessons'))} <small>${S.lessons.length}/${Object.keys(LESSONS).length}</small></button><button class="tab ${t === 'deep' ? 'on' : ''}" data-tab="deep">${esc(ui('notebook.deeper'))} <small>${Object.keys(S.reflections).length}/${Object.keys(window.THINK || {}).length}</small></button><button class="tab ${t === 'life' ? 'on' : ''}" data-tab="life">${esc(ui('life.title'))}</button><button class="tab ${t === 'cast' ? 'on' : ''}" data-tab="cast">${esc(ui('notebook.cast'))} <small>${castN}/${castIds().length}</small></button></div>
      <ul data-pane="lessons" ${t === 'lessons' ? '' : 'hidden'}>${all}</ul>
      <ul data-pane="deep" ${t === 'deep' ? '' : 'hidden'}>${deep}</ul>
      <div data-pane="life" ${t === 'life' ? '' : 'hidden'}>${life}</div>
      <div data-pane="cast" ${t === 'cast' ? '' : 'hidden'}>${S.cast ? castGrid() : ''}${S.recaps && Object.keys(S.recaps).length ? `<div class="row recaps">${Object.keys(S.recaps).map(Number).sort((a, b) => a - b).map(n => `<button class="btn small" data-act="recap:${n}">${esc(ui('recap.chip', { n }))}</button>`).join('')}</div>` : ''}</div>
      <div class="sheet-foot"><button class="btn primary" data-close>${esc(ui('btn.close'))}</button></div></div>`, null, 'sheet');
    const on = document.querySelector('#modal .notebook .tab.on');
    if (on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  // Links to the public site pages. On the deployed Worker (/play) they are same-origin; anywhere else
  // (a local copy, file://) they point at the public site.
  function siteLinks() {
    const base = (location.pathname === '/play' && /^https?:$/.test(location.protocol)) ? '' : 'https://sim4love.jstdlee.workers.dev';
    const pre = LOCALE === 'zh-SG' ? '/zh' : '';
    return ['about', 'privacy', 'disclaimer'].map(k => `<a href="${base}${pre}/${k}">${esc(ui('site.' + k))}</a>`).join('<span aria-hidden="true"> · </span>');
  }

  function openSettings() {
    const wasBusy = busy;
    const packs = Object.entries(window.I18N || {}).filter(([, p]) => p.ready);
    modal(`<div class="settings">${sheetHead(ui('settings.title'))}
      <label class="set-row"><span>${esc(ui('settings.music'))}</span>
        <input id="set-vol" type="range" min="0" max="100" step="5" value="${Math.round(Music.volume * 100)}" aria-label="${esc(ui('settings.music'))}"><b id="set-vol-n">${Math.round(Music.volume * 100)}</b></label>
      <label class="set-row"><span>${esc(ui('settings.mute'))}</span>
        <button id="set-mute" class="btn small toggle ${Music.muted ? 'on' : ''}" role="switch" aria-checked="${Music.muted}">${esc(ui(Music.muted ? 'settings.on' : 'settings.off'))}</button></label>
      <label class="set-row"><span>${esc(ui('settings.social'))}<small class="muted">${esc(ui('settings.socialhint'))}</small></span>
        <button id="set-social" class="btn small toggle ${S.opts && S.opts.social === false ? '' : 'on'}" role="switch" aria-checked="${!(S.opts && S.opts.social === false)}">${esc(ui(S.opts && S.opts.social === false ? 'settings.off' : 'settings.on'))}</button></label>
      ${packs.length > 1 ? `<label class="set-row"><span>${esc(ui('title.lang'))}</span><select id="set-locale">${packs.map(([id, p]) => `<option value="${id}" ${id === LOCALE ? 'selected' : ''}>${esc(p.label)}</option>`).join('')}</select></label>` : ''}
      <p class="muted small">${esc(ui('settings.credits'))}</p>
      <nav class="site-links small" aria-label="${esc(ui('site.nav'))}">${siteLinks()}</nav>
      <div class="sheet-foot"><button class="btn primary" data-close>${esc(ui('btn.close'))}</button></div></div>`, () => { busy = wasBusy; }, 'sheet');
    const vol = $('#set-vol');
    vol.oninput = () => { Music.setVolume(vol.value / 100); $('#set-vol-n').textContent = vol.value; if (Music.muted && +vol.value > 0) setMute(false); };
    const mute = $('#set-mute');
    const setMute = (m) => { Music.setMuted(m); mute.classList.toggle('on', m); mute.setAttribute('aria-checked', String(m)); mute.textContent = ui(m ? 'settings.on' : 'settings.off'); };
    mute.onclick = (e) => { e.preventDefault(); setMute(!Music.muted); };
    const sel = $('#set-locale');
    if (sel) sel.onchange = () => switchLocale(sel.value);
    const soc = $('#set-social');
    soc.onclick = (e) => {
      e.preventDefault();
      S.opts = Object.assign({}, S.opts, { social: S.opts ? S.opts.social === false : false });
      try { localStorage.setItem('sim4love.social', S.opts.social ? '1' : '0'); } catch (x) { /* ignore */ }
      soc.classList.toggle('on', S.opts.social); soc.setAttribute('aria-checked', String(S.opts.social)); soc.textContent = ui(S.opts.social ? 'settings.on' : 'settings.off');
      save();
    };
  }
  // Re-point every close control of the open modal at `fn` (used when a profile is opened from the recap).
  function patchClose(fn) {
    const m = $('#modal');
    m.querySelectorAll('[data-act^="notebook:"]').forEach(b => { b.removeAttribute('data-act'); b.dataset.close = 'back'; });
    const prev = m.onclick;
    m.onclick = (ev) => {
      const b = ev.target.closest('[data-close]');
      if (b || (ev.target === m && m.classList.contains('sheet'))) { m.classList.remove('on'); m.innerHTML = ''; m.className = ''; busy = false; fn(); return; }
      prev && prev(ev);
    };
  }
  function switchLocale(id) {
    if (!$('#game').classList.contains('at-title')) save();
    try { localStorage.setItem('sim4love.locale', id); } catch (e) { /* ignore */ }
    location.reload();
  }
  function handleAct(a) {
    const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; m.className = ''; busy = false;
    if (a.startsWith('deep:')) { const id = a.slice(5); deeperCard(THINK[id], id, () => openNotebook('deep'), true); return; }
    if (a.startsWith('cast:')) {
      const rc = m._recap; m._recap = null;
      const id = a.slice(5);
      openProfile(id);
      // From the end-of-chapter recap: closing the profile returns to the recap so the chapter can continue.
      if (rc) { const back = () => showRecap(rc.rows, rc.chN, rc.then); patchClose(back); }
      return;
    }
    if (a.startsWith('notebook:')) { openNotebook(a.slice(9)); return; }
    if (a.startsWith('recap:')) { const n = +a.slice(6); showRecap((S.recaps || {})[n] || [], n, () => openNotebook('cast'), true); return; }
    if (a === 'restart') startGame(S.name);
    if (a === 'title') showTitle();
    if (a === 'next') {
      const nextId = ORDER()[ORDER().indexOf(S.chapter) + 1];
      if (!nextId) return;
      S.chapter = nextId; S.pc = 0; S.vq = []; S.view.chars = {}; S.view.phone = null; S.view.msgs = [];
      PROG = compileCh(S.chapter); CS().begin(S, chIdx(S.chapter)); restoreView(); save();
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
      $('#btn-continue').textContent = ch ? `${ui('btn.continue')} · ${tx(ch.title)}` : ui('btn.continue');
    }
    const loc = $('#locale');
    if (loc) {
      const packs = Object.entries(window.I18N || {}).filter(([, p]) => p.ready);
      loc.closest('.lang-field').hidden = packs.length < 2;
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
    S.view.outfit = S.view.outfit || {};
    if (fromSave) CS().migrate(S, chIdx(S.chapter) - 1); else CS().init(S);
    if (!fromSave) { let pref = null; try { pref = localStorage.getItem('sim4love.social'); } catch (e) { /* ignore */ } if (pref === '0') S.opts.social = false; }
    if (!fromSave || !S.cs.ch) CS().begin(S, chIdx(S.chapter));
    PROG = compileCh(S.chapter);
    busy = false;
    if (fromSave) { if (!(S.vq && S.vq.length)) S.pc = Math.max(0, S.pc - 1); restoreView(); step(); return; }
    restoreView();
    chapterCard(() => step());
  }
  function chapterCard(then) {
    const ch = CHAPTERS[S.chapter];
    const card = $('#chapter-card');
    card.innerHTML = `<small class="ornament">${esc(ch.part ? tx(ch.part) + ' · ' : '')}${esc(tx(ch.title))}</small><h1>${esc(tx(ch.subtitle))}</h1>`;
    card.classList.add('on');
    busy = true;
    setTimeout(() => { card.classList.remove('on'); busy = false; then(); }, 2200);
  }

  // ---------- input ----------
  function bind() {
    $('#hud').addEventListener('click', (e) => { if (!e.target.closest('.hsum')) return; hudOpen = !hudOpen; renderHud(); });
    document.addEventListener('click', (e) => { if (hudOpen && !e.target.closest('#hud')) { hudOpen = false; renderHud(); e.stopPropagation(); e.preventDefault(); } }, true); // a tap outside only closes the list
    $('#stage').addEventListener('click', (e) => { if (e.target.closest('button,#choices,#modal,#title,#topbar,select,a')) return; advance(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $('#modal').classList.contains('on') && $('#modal').classList.contains('sheet')) { e.preventDefault(); $('#modal').querySelector('[data-close]').click(); return; }
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
    if (loc) loc.onchange = () => switchLocale(loc.value);
    const openSet = (e) => { e.stopPropagation(); if (busy && $('#modal').classList.contains('on')) return; openSettings(); };
    $('#btn-settings').onclick = openSet;
    const ts = $('#btn-title-settings'); if (ts) ts.onclick = openSet;
  }

  let BAD_END_TOTAL = 0;
  window.addEventListener('DOMContentLoaded', () => {
    BAD_END_TOTAL = new Set(Object.values(CHAPTERS).flatMap(ch => compile(ch.script, 0).filter(c => c.badEnd).map(c => c.badEnd.title))).size;
    document.documentElement.lang = LOCALE;
    document.querySelectorAll('[data-ui]').forEach(el => { el.textContent = ui(el.dataset.ui); });
    document.querySelectorAll('[data-ui-label]').forEach(el => { const t = ui(el.dataset.uiLabel); el.title = t; el.setAttribute('aria-label', t); });
    document.title = ui('title.doc');
    const tl = $('#title-links'); if (tl) { tl.innerHTML = siteLinks(); tl.setAttribute('aria-label', ui('site.nav')); }
    bind(); renderHud(); showTitle();
    ageGate();
    preload();
  });
  // ---------- age confirmation (14+) ----------
  // Asked once per device before the title screen. "Yes" is remembered in localStorage; "No" shows a calm exit
  // screen and is remembered for this browser session only, so a fresh session asks again.
  const AGE_YES = 'sim4love.age14', AGE_NO = 'sim4love.age14.no';
  const store = (k, area) => { try { return (area || localStorage).getItem(k); } catch (e) { return null; } };
  function ageGate() {
    if (store(AGE_NO, sessionStorage) === '1') { ageExit(); return; }
    if (store(AGE_YES) === '1') return;
    const title = $('#title');
    title.inert = true;
    const packs = Object.entries(window.I18N || {}).filter(([, p]) => p.ready);
    const langs = packs.length < 2 ? '' : `<label class="age-lang"><span>${esc(ui('title.lang'))}</span><select id="age-locale" aria-label="${esc(ui('title.lang'))}">${packs.map(([id, p]) => `<option value="${id}" ${id === LOCALE ? 'selected' : ''}>${esc(p.label)}</option>`).join('')}</select></label>`;
    modal(`<div class="age" aria-labelledby="age-q" aria-describedby="age-note">
        <div class="lesson-kind ornament">sim4love</div>
        <h2 id="age-q">${esc(ui('age.title'))}</h2>
        <p id="age-note">${esc(ui('age.note'))}</p>
        <div class="row age-actions">
          <button class="btn primary" data-close="yes" id="age-yes">${esc(ui('age.yes'))}</button>
          <button class="btn" data-close="no" id="age-no">${esc(ui('age.no'))}</button>
        </div>
        ${langs}
      </div>`, (answer) => {
      title.inert = false;
      if (answer === 'yes') {
        try { localStorage.setItem(AGE_YES, '1'); } catch (e) { /* private mode: ask again next visit */ }
        const nm = $('#player-name'); nm && nm.focus({ preventScroll: true });
      } else ageExit(true);
    }, 'age');
    const sel = $('#age-locale');
    if (sel) sel.onchange = () => switchLocale(sel.value);
  }
  function ageExit(fresh) {
    try { sessionStorage.setItem(AGE_NO, '1'); } catch (e) { /* ignore */ }
    Music.stop();
    const game = $('#game'); if (game) game.remove();
    const out = document.createElement('main');
    out.id = 'age-exit';
    out.innerHTML = `<div class="age-exit-card" role="alert"><div class="logo" aria-hidden="true">sim<span>4</span>love</div><p tabindex="-1">${esc(ui('age.exit'))}</p></div>`;
    document.body.appendChild(out);
    out.querySelector('p').focus({ preventScroll: true });
    if (fresh) { try { window.close(); } catch (e) { /* most browsers refuse for tabs the user opened */ } }
  }
  function preload() {
    const sp = window.SPRITES; if (!sp) return;
    const flat = (o) => Object.values(o || {}).flatMap(v => (typeof v === 'string' ? [v] : v && typeof v === 'object' ? flat(v) : []));
    const urls = [...flat(sp.bg), ...flat(sp.chars)].filter(u => !/^(data:|blob:)/.test(u) || u.length < 4096);
    const keep = (window.__simPreload = []);
    let i = 0;
    const next = () => { if (i >= urls.length) return; const img = new Image(); img.decoding = 'async'; img.onload = img.onerror = next; img.src = urls[i++]; keep.push(img); };
    for (let n = 0; n < 4; n++) next();
  }
  window.SimEngine = { compile, fresh, openProfile: (id) => openProfile(id), openNotebook: (t) => openNotebook(t), showRecap: (n) => showRecap((S.recaps || {})[n] || S.changes || [], n, () => {}, true), get state() { return S; }, get choice() { return curChoice; }, ui, nameOf, hash, tx, locale: LOCALE, music: Music };
})();
