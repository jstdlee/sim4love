#!/usr/bin/env node
/* Headless playthrough of all 20 chapters with Playwright.
   Run: node tests/playthrough.js [first|last|random] [--mobile] [--shots[=dir]]
   - first:  always pick the first enabled option (options are shuffled per player name)
   - last:   always pick the last enabled option (mostly mistakes / bad ends → tests rewind)
   - random: seeded random choices
   --mobile: iPhone-sized portrait viewport with touch
   --route=ava: a thoughtful player courting one heroine (healthiest option by effects, confesses to her);
             fails unless that heroine's true ending is reached
   --lang=zh: play in Simplified Chinese and flag on-screen lines that are still English
   --outfit-shots=hina:casual,chloe:stall  screenshot the first time each outfit is on stage (screenshots/outfits/)
   --shots:  save a screenshot at every chapter card, bad end, results screen and the final screen
   --url=http://127.0.0.1:8787/  play against a running Worker (e.g. `wrangler dev` with the Turnstile
             test keys in .dev.vars) instead of the built-in static server; the Turnstile gate is passed first
   Fails (exit 1) on any page error, a stuck screen, or if the Chapter 20 ending is not reached. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const lang = ((process.argv.find((a) => a.startsWith('--lang=')) || '').split('=')[1] || 'en') === 'zh' ? 'zh-SG' : 'en-SG';
// Serve the game over http (not file://) so fetch() of the music works like in production.
const ROOT = path.join(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.mp3': 'audio/mpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
const strategy = (process.argv[2] && !process.argv[2].startsWith('--')) ? process.argv[2] : 'first';
const mobile = process.argv.includes('--mobile');
const routeTarget = (process.argv.find((a) => a.startsWith('--route=')) || '').slice(8);
const shotArg = process.argv.find((a) => a.startsWith('--shots'));
const shotDir = shotArg ? (shotArg.split('=')[1] || path.join(__dirname, '..', 'screenshots', `${mobile ? 'mobile' : 'desktop'}-${routeTarget ? 'route-' + routeTarget : strategy}${lang === 'zh-SG' ? '-zh' : ''}`)) : null;
if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
let seed = 42; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

const remote = (process.argv.find((a) => a.startsWith('--url=')) || '').slice(6);

(async () => {
  let url = remote;
  if (!remote) {
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    url = `http://127.0.0.1:${server.address().port}/index.html`;
  }
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1280, height: 720 } });
  // "No" path in a separate context (fresh storage and session): exit screen, game removed, sticks on reload.
  {
    const c2 = await browser.newContext(); const p2 = await c2.newPage();
    await p2.goto(url);
    await p2.waitForSelector('#age-no', { timeout: 30000 });
    await p2.click('#age-no');
    const ok1 = await p2.evaluate(() => !!document.querySelector('#age-exit') && !document.querySelector('#game'));
    await p2.reload(); await p2.waitForTimeout(400);
    const ok2 = await p2.evaluate(() => !!document.querySelector('#age-exit') && !document.querySelector('#game'));
    if (!ok1 || !ok2) { console.error(`Age "no" exit screen failed (after click: ${ok1}, after reload: ${ok2})`); process.exit(1); }
    await c2.close();
  }
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(new URL(url).origin)) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g|favicon/.test(m.text())) errors.push(m.text()); });
  await page.goto(url);
  if (await page.$('#gate')) {
    // Turnstile gate (Worker): the widget auto-submits on success, then the game page loads.
    await page.waitForSelector('#btn-start', { timeout: 30000 });
  }
  await page.evaluate((l) => { try { localStorage.clear(); localStorage.setItem('sim4love.locale', l); } catch (e) { /* ignore */ } }, lang);
  await page.reload();
  // Age confirmation (14+): must appear on a fresh device, cannot be dismissed with Esc, and "Yes" is remembered.
  await page.waitForSelector('#age-yes', { timeout: 10000 });
  await page.keyboard.press('Escape');
  if (!(await page.$('#age-yes'))) errors.push('Age prompt closed on Escape');
  await page.click('#age-yes');
  if (await page.evaluate(() => localStorage.getItem('sim4love.age14')) !== '1') errors.push('Age "yes" not stored');
  await page.reload();
  await page.waitForTimeout(400);
  if (await page.$('#age-yes')) errors.push('Age prompt shown again after "yes"');
  const locale = await page.evaluate(() => SimEngine.locale);
  if (locale !== lang) errors.push(`Locale is ${locale}, expected ${lang}`);
  const english = new Set(); const tracks = new Set();
  // A zh line with no CJK at all and several English words is an untranslated leak (names, URLs and numbers are fine).
  const leak = (t) => lang === 'zh-SG' && t && !/[\u3400-\u9fff]/.test(t) && (t.match(/[A-Za-z]{2,}/g) || []).length >= 4;
  let n = 0; const shot = async (name) => { if (shotDir) await page.screenshot({ path: path.join(shotDir, `${String(++n).padStart(3, '0')}-${name}.png`) }); };
  await page.waitForTimeout(600); await shot('title');
  await page.click('#btn-start');
  await page.waitForTimeout(1200);

  const seen = new Set(); const attempts = {}; const cards = new Set(); const endings = [];
  const recaps = new Set(); const toasts = new Set();
  // --outfit-shots=hina:casual,chloe:stall  save one screenshot the first time each listed outfit is on stage.
  const outfitsSeen = new Map();
  const outfitShots = new Set(((process.argv.find((a) => a.startsWith('--outfit-shots=')) || '').split('=')[1] || '').split(',').filter(Boolean));
  const outfitDir = shotDir ? path.join(shotDir, 'outfits') : path.join(__dirname, '..', 'screenshots', 'outfits');
  if (outfitShots.size) fs.mkdirSync(outfitDir, { recursive: true });
  const hudBad = []; let choices = 0, badEnds = 0, done = false, same = 0, last = '';
  for (let i = 0; i < 40000 && !done; i++) {
    const st = await page.evaluate(() => {
      const q = (x) => document.querySelector(x);
      return { ch: SimEngine.state.chapter, pc: SimEngine.state.pc, card: q('#chapter-card').classList.contains('on'),
        modal: q('#modal').classList.contains('on'), next: !!q('#modal [data-act="next"]'), title: !!q('#modal [data-act="title"]'),
        bad: !!q('#modal .badend'), ending: (q('#modal .ending h2') || q('#modal .ending') || {}).textContent || '',
        choices: q('#choices').classList.contains('on'), ctext: q('#choices').textContent,
        nopts: q('#choices').querySelectorAll('.opt:not([disabled])').length, text: q('#text').textContent,
        recap: !!q('#modal .recap'), sprites: [...document.querySelectorAll('#chars .char:not(.leaving) img')].map((i) => i.getAttribute('src') || ''), toast: [...document.querySelectorAll('#toasts .toast.cast')].map((t) => t.textContent.trim()) };
    });
    seen.add(st.ch);
    for (const f of st.sprites) {
      const m = f.match(/chars\/([a-z]+)_([a-z]+)_[a-z]+\.webp$/);
      if (!m) continue;
      const k = `${m[1]}:${m[2]}`;
      if (!outfitsSeen.has(k)) { outfitsSeen.set(k, st.ch); if (outfitShots.has(k)) { await page.waitForTimeout(700); await page.screenshot({ path: path.join(outfitDir, `${k.replace(':', '-')}-${st.ch}.png`) }); } }
    }
    for (const t of st.toast) { if (!toasts.size) await shot(`${st.ch}-toast`); toasts.add(t); if (leak(t)) english.add(`${st.ch} toast: ${t.slice(0, 70)}`); }
    if (st.recap && !recaps.has(st.ch)) {
      recaps.add(st.ch);
      const rc = await page.evaluate(() => ({ rows: document.querySelectorAll('#modal .rc-list .rc-row').length, more: !!document.querySelector('#modal .rc-all'),
        text: (document.querySelector('#modal .recap') || {}).innerText || '' }));
      if (rc.rows > 8) errors.push(`${st.ch} recap shows ${rc.rows} rows before "Show all" (max 8)`);
      // Internal source ids ("3-c1", "ch3") must never reach players.
      const ids = rc.text.match(/\b\d+-c\d+\b|\bch\d+\b/g);
      if (ids) errors.push(`${st.ch} recap shows internal ids: ${[...new Set(ids)].join(', ')}`);
      if (recaps.size === 3) { await page.waitForTimeout(400); await shot(`${st.ch}-recap`); }
    }
    if (leak(st.text.trim())) english.add(`${st.ch}: ${st.text.trim().slice(0, 70)}`);
    if (st.choices) for (const o of await page.$$eval('#choices .opt', (els) => els.map((e) => e.textContent.trim()))) if (leak(o)) english.add(`${st.ch} choice: ${o.slice(0, 70)}`);
    if (st.modal && lang === 'zh-SG') for (const t of await page.$$eval('#modal h1, #modal h2, #modal h3, #modal p, #modal li, #modal button', (els) => els.map((e) => e.textContent.trim()))) if (leak(t)) english.add(`${st.ch} modal: ${t.slice(0, 70)}`);
    if (i % 25 === 0) { const m = await page.evaluate(() => SimEngine.music.state()); if (m.playing) tracks.add(m.playing); }
    const sig = JSON.stringify([st.ch, st.pc, st.modal, st.choices, st.text]);
    same = sig === last ? same + 1 : 0; last = sig;
    if (same > 400) { errors.push(`Stuck at ${st.ch} pc ${st.pc}: "${st.text.slice(0, 80)}"`); break; }
    if (st.card && routeTarget && !cards.has(st.ch) && process.env.ROUTE_DEBUG) console.log(st.ch, JSON.stringify(await page.evaluate(() => { const S = SimEngine.state; return { route: S.route, trust: S.stats.trust, ava: S.stats.ava, f: Object.keys(S.flags).filter((k) => /ava|broke/i.test(k)), fit: window.CastSim && window.CastSim.fit ? window.CastSim.fit(S, 'ava') : null }; })));
    if (st.card) { if (!cards.has(st.ch)) { cards.add(st.ch); await page.waitForTimeout(500); await shot(`${st.ch}-card`); } await page.waitForTimeout(200); continue; }
    if (st.modal) {
      if (st.bad) { badEnds++; await page.waitForTimeout(450); await shot(`${st.ch}-badend-${badEnds}`); }
      if (st.ending && !st.bad) { endings.push(st.ending.trim().slice(0, 40)); }
      if (st.next) { hudBad.push(...await page.evaluate(() => [...document.querySelectorAll('#hud .chip i, #modal .bar b, #modal .pair b')].map((e) => e.textContent.trim()).filter((t) => /^-?\d+$/.test(t) && (+t < 0 || +t > 100)))); await page.waitForTimeout(500); await shot(`${st.ch}-results`); await page.click('#modal [data-act="next"]'); await page.waitForTimeout(1200); continue; }
      if (st.title) { await shot('final'); done = true; break; }
      const close = await page.$('#modal [data-close]');
      if (close) { if (st.ending && !st.bad) await shot(`${st.ch}-ending`); await close.click(); }
      else { errors.push('Modal without a close button at ' + st.ch); break; }
      await page.waitForTimeout(60); continue;
    }
    if (st.choices && st.nopts) {
      await page.waitForTimeout(360);
      const key = st.ch + st.ctext; const tries = attempts[key] = (attempts[key] || 0) + 1;
      if (routeTarget) {
        // Rank enabled options by the same "healthy player" weights as tests/softlock.js greedy; after a rewind take the next best.
        const order = await page.evaluate((T) => {
          const GOOD = { wisdom: 1, self: 1, trust: 1, '@route': 0.5, kenta: 0.4, goal: 0.6, passion: 0.6, health: 0.6, wallet: 0.6, cash: 0.05, proj: -1.5 };
          const NAME = { ava: 'Ava.', hina: 'Hanis.', mio: 'Xin Yi.', kaede: 'Kavya.', yuna: 'Elise.', chloe: 'Chloe.', preet: 'Preet.' }[T];
          const c = SimEngine.choice; const btns = [...document.querySelectorAll('#choices .opt:not([disabled])')];
          const sc = (o) => Object.entries(o.fx || {}).reduce((n, [k, v]) => n + (GOOD[k] || 0) * v + (k === T ? v : 0), 0) + (o.rose ? 3 : 0) + (o.t === NAME ? 1000 : 0)
            - Object.entries(o.val || {}).reduce((n, [a, x]) => n + 10 * Math.abs(x - (((window.VALUES || {})[T] || {})[a] || 0)), 0); // answer value questions the way the target would, so fit() stays high
          return btns.map((b, n) => [n, sc(c.opts[+b.dataset.i])]).sort((x, y) => y[1] - x[1]).map((x) => x[0]);
        }, routeTarget);
        const k = order[(tries - 1) % order.length];
        const sel = `#choices .opt:not([disabled]) >> nth=${k}`;
        await page.waitForTimeout(150); // the engine ignores taps in the first 450 ms; a dropped tap must not count as a try
        if (mobile) await page.tap(sel); else await page.click(sel);
        await page.waitForTimeout(40);
        if (await page.evaluate((t) => document.querySelector('#choices').classList.contains('on') && document.querySelector('#choices').textContent === t, st.ctext)) attempts[key]--;
        choices++; continue;
      }
      const base = strategy === 'last' ? st.nopts - 1 : strategy === 'random' ? Math.floor(rnd() * st.nopts) : 0;
      // On a revisit (after a bad-end rewind) move to a different option so the run always progresses.
      const k = (base + (tries - 1) * (strategy === 'last' ? -1 : 1) + st.nopts * 10) % st.nopts;
      const sel = `#choices .opt:not([disabled]) >> nth=${k}`;
      if (mobile) await page.tap(sel); else await page.click(sel);
      choices++; await page.waitForTimeout(40); continue;
    }
    await page.evaluate(() => { const e = new KeyboardEvent('keydown', { key: ' ', bubbles: true }); document.dispatchEvent(e); document.dispatchEvent(e); });
    await page.waitForTimeout(8);
  }
  // Cast layer: every chapter ends with Mochi's recap, archived to S.recaps; the Cast tab and a profile with a radar render.
  if (recaps.size < 20) errors.push(`Recap shown in ${recaps.size}/20 chapters`);
  const archived = await page.evaluate(() => Object.keys(SimEngine.state.recaps || {}).length);
  if (archived < 20) errors.push(`Recaps archived for ${archived}/20 chapters`);
  if (!toasts.size) errors.push('No mid-scene cast toast was ever shown');
  await page.evaluate(() => SimEngine.openNotebook('cast')); await page.waitForTimeout(500);
  const castCards = await page.$$eval('#modal .cast-card', (els) => els.length);
  if (castCards < 24) errors.push(`Cast tab shows ${castCards} cards, expected 24`);
  const panes = await page.evaluate(() => {
    const vis = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none';
    const tab = document.querySelector('#modal .notebook .tab.on');
    const tr = tab && tab.getBoundingClientRect(), br = tab && tab.parentElement.getBoundingClientRect();
    return { cast: vis(document.querySelector('#modal [data-pane="cast"] .cast-card')), lessons: vis(document.querySelector('#modal [data-pane="lessons"]')),
      tabInView: !!tr && tr.left >= br.left - 1 && tr.right <= br.right + 1 };
  });
  if (!panes.cast || panes.lessons) errors.push(`Cast tab: wrong pane visible (cast ${panes.cast}, lessons ${panes.lessons})`);
  if (!panes.tabInView) errors.push('Cast tab: active tab is scrolled out of view');
  await shot('cast-tab');
  // Open the profile with the most partial reveals (some axes seen, some still "?").
  const pick = await page.evaluate(() => {
    const C = SimEngine.state.cast || {}; let best = null, bestN = -1;
    for (const [id, e] of Object.entries(C)) {
      if (!e.met || !document.querySelector(`#modal .cast-card[data-act="cast:${id}"]`)) continue;
      const v = Object.values(e.seen || {}), n = v.filter(Boolean).length;
      const score = n < v.length ? n : n - 10;
      if (score > bestN) { bestN = score; best = id; }
    }
    return best;
  });
  const cardSel = pick ? `#modal .cast-card[data-act="cast:${pick}"]` : '#modal .cast-card >> nth=0';
  if (mobile) await page.tap(cardSel); else await page.click(cardSel);
  await page.waitForTimeout(500);
  const pf = await page.evaluate(() => ({ radar: !!document.querySelector('#modal .pf-radar svg.radar'), first: !!document.querySelector('#modal .rd-first'),
    face: (() => { const f = document.querySelector('#modal .pf-face'), i = f && f.firstElementChild; if (!i) return false;
      const fr = f.getBoundingClientRect(), ir = i.getBoundingClientRect(); const cx = (ir.left + ir.right) / 2; return getComputedStyle(i).position !== 'absolute' && cx >= fr.left && cx <= fr.right && ir.top <= fr.top + fr.height / 2; })(),
    labels: document.querySelectorAll('#modal .rd-label').length, overflow: (document.querySelector('#modal .sheet, #modal .notebook') || document.body).scrollWidth > window.innerWidth + 1,
    texts: [...document.querySelectorAll('#modal h3, #modal li, #modal p')].map((e) => e.textContent.trim()) }));
  if (!pf.radar || !pf.first || pf.labels !== 7) errors.push(`Profile radar did not render (radar ${pf.radar}, first ${pf.first}, labels ${pf.labels})`);
  if (pf.overflow) errors.push('Profile overflows horizontally');
  if (!pf.face) errors.push('Profile portrait escapes its frame');
  for (const t of pf.texts) if (leak(t)) english.add(`profile: ${t.slice(0, 70)}`);
  await shot('cast-profile');
  const ownBack = await page.$('#modal [data-act="notebook:cast"]'); if (ownBack) await ownBack.click(); await page.waitForTimeout(300);
  const fin = await page.$('#modal [data-close]'); if (fin) await fin.click();
  const outOfRange = await page.evaluate(() => [...document.querySelectorAll('#hud .chip i, #modal .bar b, #modal .pair b')]
    .map((e) => e.textContent.trim()).filter((t) => /^-?\d+$/.test(t) && (+t < 0 || +t > 100)));
  if (outOfRange.length || hudBad.length) errors.push('Meter outside 0-100 on screen: ' + outOfRange.concat(hudBad).join(', '));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) errors.push('Horizontal overflow on the final screen');
  const final = await page.evaluate(() => ({ route: SimEngine.state.route, stats: SimEngine.state.stats, endings: SimEngine.state.endings, lessons: SimEngine.state.lessons.length, ach: SimEngine.state.achievements.length }));
  const under = routeTarget ? await page.evaluate(() => { const T = JSON.parse(JSON.stringify(SimEngine.state)); T.stats.proj = Math.max(T.stats.proj, 21); return [window.SIM.endingFor(T), !!T.flags.avaHonest14, !!T.flags.avaScamSafe, !!T.flags.brokeUp14, window.CastSim && window.CastSim.fit ? window.CastSim.fit(T, 'ava') : null, T.route]; }) : null;
  const diag = under && under.slice(1); const underEnd = under && under[0];
  const music = await page.evaluate(() => SimEngine.music.state());
  if (music.playing) tracks.add(music.playing);
  if (!music.unlocked || !tracks.size) errors.push('Music never started: ' + JSON.stringify(music));
  if (english.size) errors.push(`Untranslated English on screen (${english.size}):\n  ` + [...english].slice(0, 40).join('\n  '));
  await browser.close(); if (!remote) server.close();
  console.log(JSON.stringify({ strategy, mobile, lang, music: [...tracks], chapters: seen.size, recaps: recaps.size, outfitsOnStage: outfitsSeen.size, ...(process.env.OUTFIT_DEBUG ? { outfitKeys: [...outfitsSeen.keys()], outfitWanted: [...outfitShots] } : {}), castToasts: toasts.size, choices, badEnds, endingScreens: endings, ...final }));
  if (shotDir) console.log('screenshots: ' + shotDir);
  if (errors.length) { console.error('PAGE ERRORS:\n' + errors.join('\n')); process.exit(1); }
  if (routeTarget) {
    // "Your Own Story" is the best end and sits on top of a route ending; check the route ending underneath it.
    const got = (final.endings || []).includes('true_' + routeTarget) || underEnd === 'true_' + routeTarget;
    console.log(`route ${routeTarget}: endings ${(final.endings || []).join(', ')} · route ending ${underEnd} · diag ${JSON.stringify(diag)}`);
    if (!got) { console.error(`Route run did not reach true_${routeTarget}`); process.exit(1); }
  }
  if (!done || !seen.has('ch20')) { console.error('Did not reach the end of Chapter 20'); process.exit(1); }
  console.log('OK');
})();
