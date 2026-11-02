/* sim4love — tiny visual-novel engine.
 *
 * Script commands (one object per step):
 *   {bg:'street', petals:true}            change background
 *   {show:'hina', e:'happy', at:'center'} show / move a character (at: left|center|right)
 *   {hide:'hina'} | {hide:'*'}            hide one / all characters
 *   {n:'text'}                            narration
 *   {s:'hina', e:'blush', t:'text'}       character line (auto-shows the character)
 *   {me:'text'} / {think:'text'}          player speech / inner thought
 *   {mochi:'text', e:'happy'}             mascot guide line
 *   {phone:'Contact'} {txt:'kaede'|'me'|'sys', t:'..'} {phoneOff:true}   chat overlay
 *   {choice:'prompt', opts:[{t, fx:{hina:10, wisdom:5, self:5}, lesson:'id', flag:'x', then:[...]}]}
 *   {if: state => bool, then:[...], else:[...]}
 *   {badEnd:{title,text}}                 fail screen with "rewind" to the last choice
 *   {chapterEnd:true}                     results screen
 * Text supports {name}. Nested `then`/`else` blocks are flattened by compile().
 */
(function () {
  'use strict';
  const $ = (q) => document.querySelector(q);
  const SAVE_KEY = 'sim4love.save.v1';

  const STAT_META = {
    hina:  { label: 'Hina',  icon: '♥' },
    rei:   { label: 'Rei',   icon: '♥', hidden: true },
    mio:   { label: 'Mio',   icon: '♥' },
    kaede: { label: 'Kaede', icon: '♥' },
    yuna:  { label: 'Yuna',  icon: '♥' },
    wisdom:{ label: 'Love IQ', icon: '🧠' },
    self:  { label: 'Self-respect', icon: '👑' },
  };

  // ---------- compile nested script into flat program ----------
  function compile(list) {
    const out = [];
    function emit(arr) {
      for (const cmd of arr) {
        if (cmd.choice) {
          const c = { choice: cmd.choice, opts: [] };
          out.push(c);
          const ends = [];
          for (const o of cmd.opts) {
            const target = out.length;
            c.opts.push({ t: o.t, fx: o.fx, lesson: o.lesson, flag: o.flag, pc: target });
            emit(o.then || []);
            const j = { jmp: -1 }; out.push(j); ends.push(j);
          }
          ends.forEach(j => (j.jmp = out.length));
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
  const fresh = () => ({
    chapter: 'ch1', pc: 0, name: 'Sota',
    stats: { hina: 0, rei: 0, mio: 0, kaede: 0, yuna: 0, wisdom: 0, self: 0 },
    flags: {}, lessons: [], badEnds: [],
    view: { bg: 'title', petals: false, chars: {}, phone: null, msgs: [] },
  });
  let S = fresh();
  let PROG = [];
  let checkpoint = null;
  let busy = false;          // waiting on choice / modal
  let typing = null;         // typewriter state
  let auto = false, autoTimer = null;

  const clone = (o) => JSON.parse(JSON.stringify(o));
  const fmt = (t) => String(t).replace(/\{name\}/g, S.name);

  // ---------- rendering ----------
  function renderBg() {
    $('#bg').innerHTML = Art.background(S.view.bg);
    $('#petals').classList.toggle('on', !!S.view.petals);
  }
  function renderChars(speaker) {
    const layer = $('#chars');
    const keys = Object.keys(S.view.chars);
    // remove gone
    [...layer.children].forEach(el => { if (!S.view.chars[el.dataset.key]) { el.classList.add('leaving'); setTimeout(() => el.remove(), 300); } });
    keys.forEach(k => {
      const st = S.view.chars[k];
      let el = layer.querySelector(`[data-key="${k}"]:not(.leaving)`);
      if (!el) { el = document.createElement('div'); el.className = 'char entering'; el.dataset.key = k; layer.appendChild(el); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('entering'))); }
      if (el.dataset.expr !== st.e) { el.innerHTML = Art.character(k, st.e); el.dataset.expr = st.e; el.classList.remove('bounce'); void el.offsetWidth; el.classList.add('bounce'); }
      el.dataset.at = st.at || 'center';
      el.classList.toggle('dim', !!speaker && speaker !== k && keys.length > 1);
    });
  }
  function renderPhone() {
    const ph = $('#phone');
    ph.classList.toggle('on', !!S.view.phone);
    if (!S.view.phone) return;
    $('#phone-title').textContent = fmt(S.view.phone);
    const box = $('#phone-msgs');
    box.innerHTML = S.view.msgs.map(m => `<div class="bubble ${m.from === 'me' ? 'me' : m.from === 'sys' ? 'sys' : 'them'}">${esc(fmt(m.t))}</div>`).join('');
    box.scrollTop = box.scrollHeight;
  }
  function renderHud() {
    $('#hud').innerHTML = Object.entries(STAT_META).map(([k, m]) => {
      const v = S.stats[k];
      const shown = m.hidden ? (v ? '???' : '—') : v;
      const col = Art.CAST[k] ? Art.CAST[k].color : (k === 'wisdom' ? '#4f8cff' : '#e0a800');
      return `<span class="chip" style="--c:${col}" title="${m.label}"><b>${m.icon}</b> ${m.label} <i>${shown}</i></span>`;
    }).join('');
  }
  const esc = (s) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function setBox(kind, name, text, color) {
    const box = $('#textbox');
    box.className = 'textbox ' + kind;
    const tag = $('#nametag');
    tag.textContent = name || '';
    tag.style.display = name ? '' : 'none';
    tag.style.setProperty('--c', color || '#ff6fae');
    $('#mochi-face').innerHTML = kind === 'mochi' ? mochiSvg() : '';
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

  function mochiSvg(e) {
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M8,52 Q-6,30 14,30 Q20,44 22,50Z M92,52 Q106,30 86,30 Q80,44 78,50Z" fill="#fff" stroke="#f7a8c6" stroke-width="3"/>
      <path d="M22,40 L28,14 L44,32 Z M78,40 L72,14 L56,32 Z" fill="#fff8f0" stroke="#e8b89a" stroke-width="3"/>
      <ellipse cx="50" cy="56" rx="34" ry="30" fill="#fff8f0" stroke="#e8b89a" stroke-width="3"/>
      <ellipse cx="38" cy="54" rx="5" ry="7" fill="#3a2a2a"/><ellipse cx="62" cy="54" rx="5" ry="7" fill="#3a2a2a"/>
      <circle cx="36" cy="51" r="2" fill="#fff"/><circle cx="60" cy="51" r="2" fill="#fff"/>
      <path d="M44,66 Q50,71 50,65 Q50,71 56,66" fill="none" stroke="#3a2a2a" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="28" cy="64" rx="6" ry="3" fill="#ffadc4"/><ellipse cx="72" cy="64" rx="6" ry="3" fill="#ffadc4"/>
      <path d="M50,20 c-4,-6 -12,-2 -8,4 l8,6 l8,-6 c4,-6 -4,-10 -8,-4z" fill="#ff6fae"/></svg>`;
  }

  // ---------- stat toasts ----------
  function applyFx(fx) {
    if (!fx) return;
    Object.entries(fx).forEach(([k, d], i) => {
      S.stats[k] = (S.stats[k] || 0) + d;
      const m = STAT_META[k];
      const label = m.hidden ? `${m.label} ${m.icon} ???` : `${m.label} ${m.icon} ${d > 0 ? '+' : ''}${d}`;
      setTimeout(() => toast(label, d >= 0 ? 'up' : 'down', Art.CAST[k] && Art.CAST[k].color), i * 250);
    });
    renderHud();
  }
  function toast(text, kind, color) {
    const t = document.createElement('div');
    t.className = 'toast ' + kind;
    if (color) t.style.setProperty('--c', color);
    t.textContent = text;
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  // ---------- program step ----------
  function step() {
    while (S.pc < PROG.length) {
      const c = PROG[S.pc++];
      if (c.jmp !== undefined) { S.pc = c.jmp; continue; }
      if (c.cond) { if (!c.cond(S)) S.pc = c.jfalse; continue; }
      if (c.bg !== undefined) { S.view.bg = c.bg; S.view.petals = !!c.petals; renderBg(); continue; }
      if (c.show) { S.view.chars[c.show] = { e: c.e || 'neutral', at: c.at || 'center' }; renderChars(); continue; }
      if (c.hide) { if (c.hide === '*') S.view.chars = {}; else delete S.view.chars[c.hide]; renderChars(); continue; }
      if (c.phone) { S.view.phone = c.phone; S.view.msgs = []; renderPhone(); continue; }
      if (c.phoneOff) { S.view.phone = null; S.view.msgs = []; renderPhone(); continue; }
      if (c.txt) {
        S.view.msgs.push({ from: c.txt, t: c.t }); renderPhone();
        const who = c.txt === 'me' ? S.name : c.txt === 'sys' ? '' : Art.CAST[c.txt].name;
        setBox('phonebox', who ? `${who} 📱` : '📱', c.t, Art.CAST[c.txt] && Art.CAST[c.txt].color);
        return;
      }
      if (c.s) {
        const prev = S.view.chars[c.s];
        S.view.chars[c.s] = { e: c.e || (prev && prev.e) || 'neutral', at: c.at || (prev && prev.at) || 'center' };
        renderChars(c.s);
        setBox('say', Art.CAST[c.s].name, c.t, Art.CAST[c.s].color);
        return;
      }
      if (c.n) { renderChars(); setBox('narr', '', c.n); return; }
      if (c.me) { setBox('say', S.name, c.me, '#5b7bd6'); return; }
      if (c.think) { setBox('think', S.name + ' (thinking)', c.think, '#8a8fa8'); return; }
      if (c.mochi) { setBox('mochi', 'Mochi', c.mochi, '#ff8fb8'); return; }
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
    checkpoint = clone({ ...S, pc: S.pc - 1 });
    setBox('narr choicebox', '', c.choice);
    finishType();
    const wrap = $('#choices');
    wrap.innerHTML = c.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="num">${i + 1}</span>${esc(fmt(o.t))}</button>`).join('');
    wrap.classList.add('on');
    wrap.querySelector('button').focus({ preventScroll: true });
    const shownAt = Date.now();
    wrap.onclick = (ev) => {
      const b = ev.target.closest('.opt'); if (!b) return;
      if (Date.now() - shownAt < 450) return; // ignore taps carried over from advancing text
      const o = c.opts[+b.dataset.i];
      wrap.classList.remove('on'); wrap.innerHTML = '';
      applyFx(o.fx);
      if (o.flag) S.flags[o.flag] = true;
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
    const kindName = { green: 'Healthy habit', red: 'Pitfall', trap: 'Trap alert' }[L.kind];
    modal(`<div class="lesson ${L.kind}">
        <div class="lesson-kind">${kindName}${isNew ? ' · NEW' : ''}</div>
        <div class="lesson-icon">${L.icon}</div>
        <h2>${esc(L.title)}</h2>
        <p>${esc(L.text)}</p>
        <div class="lesson-mochi">${mochiSvg()}<span>Added to your Love Notebook</span></div>
        <button class="btn primary" data-close>Got it</button>
      </div>`, then);
  }

  function modal(html, onClose) {
    busy = true;
    const m = $('#modal');
    m.innerHTML = `<div class="modal-card">${html}</div>`;
    m.classList.add('on');
    const btn = m.querySelector('[data-close]');
    btn && btn.focus({ preventScroll: true });
    m.onclick = (ev) => {
      const b = ev.target.closest('[data-close],[data-act]');
      if (!b) return;
      if (b.dataset.act) { handleAct(b.dataset.act); return; }
      m.classList.remove('on'); m.innerHTML = '';
      busy = false;
      onClose && onClose();
    };
  }

  // ---------- bad end ----------
  function showBadEnd(be) {
    busy = true;
    if (!S.badEnds.includes(be.title)) S.badEnds.push(be.title);
    S.view.chars = {}; renderChars();
    const prevBg = S.view.bg;
    S.view.bg = 'badend'; renderBg();
    document.body.classList.add('shake'); setTimeout(() => document.body.classList.remove('shake'), 600);
    modal(`<div class="badend">
        <div class="be-label">BAD END</div>
        <h2>${esc(be.title.replace(/^BAD END #\d+ — /, ''))}</h2>
        <p>${esc(be.text)}</p>
        <div class="lesson-mochi">${mochiSvg()}<span>Mochi: "Okay okay, I'll rewind time. Try again, rookie."</span></div>
        <button class="btn primary" data-close>⏪ Rewind to the choice</button>
      </div>`, () => {
        const keep = { lessons: S.lessons, badEnds: S.badEnds };
        S = Object.assign(clone(checkpoint), keep);
        S.view.bg = S.view.bg || prevBg;
        restoreView();
        step();
      });
  }

  // ---------- results ----------
  function showResults() {
    busy = true;
    const ch = CHAPTERS[S.chapter];
    const heroines = ['hina', 'mio', 'kaede', 'yuna', 'rei'];
    const bars = heroines.map(k => {
      const c = Art.CAST[k], v = S.stats[k];
      const pct = Math.max(0, Math.min(100, v * 3 + 10));
      const shown = k === 'rei' ? '???' : v;
      return `<div class="bar"><span>${c.name}</span><div class="track"><div class="fill" style="width:${k === 'rei' ? 50 : pct}%;--c:${c.color}"></div></div><b>${shown}</b></div>`;
    }).join('');
    const iq = S.stats.wisdom, sr = S.stats.self;
    const rank = iq + sr >= 60 ? ['S', 'Love Sensei in the making'] : iq + sr >= 30 ? ['A', 'Getting it!'] : iq + sr >= 0 ? ['B', 'Still learning'] : ['C', 'Mochi is worried about you'];
    const lessons = S.lessons.map(id => `<li class="${LESSONS[id].kind}">${LESSONS[id].icon} ${esc(LESSONS[id].title)}</li>`).join('');
    modal(`<div class="results">
      <div class="be-label ok">${esc(ch.title)} complete</div>
      <h2>${esc(ch.subtitle)}</h2>
      <div class="rank"><b>${rank[0]}</b><span>${rank[1]}</span></div>
      <div class="pair"><div>🧠 Love IQ <b>${iq}</b></div><div>👑 Self-respect <b>${sr}</b></div></div>
      ${bars}
      <h3>Love Notebook (${S.lessons.length}/${Object.keys(LESSONS).length})</h3>
      <ul class="lesson-list">${lessons}</ul>
      ${S.badEnds.length ? `<p class="muted">Bad endings discovered: ${S.badEnds.length}/3</p>` : ''}
      <p class="muted">Next: ${esc(ch.next)} — coming soon</p>
      <div class="row"><button class="btn" data-act="restart">Play again</button><button class="btn primary" data-act="title">Title</button></div>
    </div>`);
  }

  // ---------- menus ----------
  function openNotebook() {
    const all = Object.entries(LESSONS).map(([id, L]) => S.lessons.includes(id)
      ? `<li class="${L.kind}"><b>${L.icon} ${esc(L.title)}</b><span>${esc(L.text)}</span></li>`
      : `<li class="locked"><b>🔒 ???</b><span>Make different choices to discover this lesson.</span></li>`).join('');
    modal(`<div class="notebook"><h2>📓 Love Notebook</h2><p class="muted">${S.lessons.length} of ${Object.keys(LESSONS).length} lessons</p><ul>${all}</ul><button class="btn primary" data-close>Close</button></div>`);
  }
  function handleAct(a) {
    const m = $('#modal'); m.classList.remove('on'); m.innerHTML = ''; busy = false;
    if (a === 'restart') startGame(S.name);
    if (a === 'title') showTitle();
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
    const t = $('#title');
    t.classList.add('on');
    $('#title-chars').innerHTML = ['mio', 'hina', 'yuna'].map(k => `<div class="tc">${Art.character(k, k === 'hina' ? 'happy' : k === 'mio' ? 'shy' : 'smug')}</div>`).join('');
    $('#btn-continue').hidden = !(saved && saved.pc > 0);
  }
  function startGame(name, fromSave) {
    $('#title').classList.remove('on');
    $('#game').classList.remove('at-title');
    S = fromSave || fresh();
    if (!fromSave) S.name = (name || 'Sota').trim().slice(0, 12) || 'Sota';
    PROG = compile(CHAPTERS[S.chapter].script);
    busy = false;
    if (fromSave) { S.pc = Math.max(0, S.pc - 1); restoreView(); step(); return; }
    restoreView();
    chapterCard(() => step());
  }
  function chapterCard(then) {
    const ch = CHAPTERS[S.chapter];
    const card = $('#chapter-card');
    card.innerHTML = `<small>${esc(ch.title)}</small><h1>${esc(ch.subtitle)}</h1>`;
    card.classList.add('on');
    busy = true;
    setTimeout(() => { card.classList.remove('on'); busy = false; then(); }, 2200);
  }

  // ---------- input ----------
  function bind() {
    $('#stage').addEventListener('click', (e) => { if (e.target.closest('button,#choices,#modal,#title,#topbar')) return; advance(); });
    document.addEventListener('keydown', (e) => {
      if ($('#title').classList.contains('on')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (document.activeElement && document.activeElement.tagName === 'BUTTON' && document.activeElement.closest('#choices,#modal')) return;
        e.preventDefault(); advance();
      }
      if (/^[1-9]$/.test(e.key) && $('#choices').classList.contains('on')) {
        const b = $('#choices').querySelectorAll('.opt')[+e.key - 1]; b && b.click();
      }
    });
    $('#btn-start').onclick = () => startGame($('#player-name').value);
    $('#player-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') startGame(e.target.value); });
    $('#btn-continue').onclick = () => { const s = loadSave(); if (s) startGame(s.name, s); };
    $('#btn-notebook').onclick = (e) => { e.stopPropagation(); if (!busy || !$('#modal').classList.contains('on')) { if (busy) return; openNotebook(); } };
    $('#btn-auto').onclick = (e) => { e.stopPropagation(); auto = !auto; e.currentTarget.classList.toggle('on', auto); if (auto && typing && typing.done && !busy) advance(); };
    $('#btn-title').onclick = (e) => { e.stopPropagation(); if (busy && $('#modal').classList.contains('on')) return; save(); showTitle(); };
  }

  window.addEventListener('DOMContentLoaded', () => { bind(); renderHud(); showTitle(); });
  window.SimEngine = { compile, get state() { return S; } };
})();
