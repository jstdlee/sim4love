#!/usr/bin/env node
/* Headless playthrough of all 20 chapters with Playwright.
   Run: node tests/playthrough.js [first|last|random] [--mobile] [--shots[=dir]]
   - first:  always pick the first enabled option (options are shuffled per player name)
   - last:   always pick the last enabled option (mostly mistakes / bad ends → tests rewind)
   - random: seeded random choices
   --mobile: iPhone-sized portrait viewport with touch
   --lang=zh: play in Simplified Chinese and flag on-screen lines that are still English
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
const shotArg = process.argv.find((a) => a.startsWith('--shots'));
const shotDir = shotArg ? (shotArg.split('=')[1] || path.join(__dirname, '..', 'screenshots', `${mobile ? 'mobile' : 'desktop'}-${strategy}${lang === 'zh-SG' ? '-zh' : ''}`)) : null;
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
  const hudBad = []; let choices = 0, badEnds = 0, done = false, same = 0, last = '';
  for (let i = 0; i < 40000 && !done; i++) {
    const st = await page.evaluate(() => {
      const q = (x) => document.querySelector(x);
      return { ch: SimEngine.state.chapter, pc: SimEngine.state.pc, card: q('#chapter-card').classList.contains('on'),
        modal: q('#modal').classList.contains('on'), next: !!q('#modal [data-act="next"]'), title: !!q('#modal [data-act="title"]'),
        bad: !!q('#modal .badend'), ending: (q('#modal .ending h2') || q('#modal .ending') || {}).textContent || '',
        choices: q('#choices').classList.contains('on'), ctext: q('#choices').textContent,
        nopts: q('#choices').querySelectorAll('.opt:not([disabled])').length, text: q('#text').textContent };
    });
    seen.add(st.ch);
    if (leak(st.text.trim())) english.add(`${st.ch}: ${st.text.trim().slice(0, 70)}`);
    if (st.choices) for (const o of await page.$$eval('#choices .opt', (els) => els.map((e) => e.textContent.trim()))) if (leak(o)) english.add(`${st.ch} choice: ${o.slice(0, 70)}`);
    if (st.modal && lang === 'zh-SG') for (const t of await page.$$eval('#modal h1, #modal h2, #modal h3, #modal p, #modal li, #modal button', (els) => els.map((e) => e.textContent.trim()))) if (leak(t)) english.add(`${st.ch} modal: ${t.slice(0, 70)}`);
    if (i % 25 === 0) { const m = await page.evaluate(() => SimEngine.music.state()); if (m.playing) tracks.add(m.playing); }
    const sig = JSON.stringify([st.ch, st.pc, st.modal, st.choices, st.text]);
    same = sig === last ? same + 1 : 0; last = sig;
    if (same > 400) { errors.push(`Stuck at ${st.ch} pc ${st.pc}: "${st.text.slice(0, 80)}"`); break; }
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
  const outOfRange = await page.evaluate(() => [...document.querySelectorAll('#hud .chip i, #modal .bar b, #modal .pair b')]
    .map((e) => e.textContent.trim()).filter((t) => /^-?\d+$/.test(t) && (+t < 0 || +t > 100)));
  if (outOfRange.length || hudBad.length) errors.push('Meter outside 0-100 on screen: ' + outOfRange.concat(hudBad).join(', '));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) errors.push('Horizontal overflow on the final screen');
  const final = await page.evaluate(() => ({ route: SimEngine.state.route, stats: SimEngine.state.stats, endings: SimEngine.state.endings, lessons: SimEngine.state.lessons.length, ach: SimEngine.state.achievements.length }));
  const music = await page.evaluate(() => SimEngine.music.state());
  if (music.playing) tracks.add(music.playing);
  if (!music.unlocked || !tracks.size) errors.push('Music never started: ' + JSON.stringify(music));
  if (english.size) errors.push(`Untranslated English on screen (${english.size}):\n  ` + [...english].slice(0, 40).join('\n  '));
  await browser.close(); if (!remote) server.close();
  console.log(JSON.stringify({ strategy, mobile, lang, music: [...tracks], chapters: seen.size, choices, badEnds, endingScreens: endings, ...final }));
  if (shotDir) console.log('screenshots: ' + shotDir);
  if (errors.length) { console.error('PAGE ERRORS:\n' + errors.join('\n')); process.exit(1); }
  if (!done || !seen.has('ch20')) { console.error('Did not reach the end of Chapter 20'); process.exit(1); }
  console.log('OK');
})();
