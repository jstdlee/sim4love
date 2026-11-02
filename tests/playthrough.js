#!/usr/bin/env node
/* Headless playthrough of all 20 chapters with Playwright.
   Run: node tests/playthrough.js [first|last|random] [--mobile] [--shots[=dir]]
   - first:  always pick the first enabled option (options are shuffled per player name)
   - last:   always pick the last enabled option (mostly mistakes / bad ends → tests rewind)
   - random: seeded random choices
   --mobile: iPhone-sized portrait viewport with touch
   --shots:  save a screenshot at every chapter card, bad end, results screen and the final screen
   Fails (exit 1) on any page error, a stuck screen, or if the Chapter 20 ending is not reached. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const strategy = (process.argv[2] && !process.argv[2].startsWith('--')) ? process.argv[2] : 'first';
const mobile = process.argv.includes('--mobile');
const shotArg = process.argv.find((a) => a.startsWith('--shots'));
const shotDir = shotArg ? (shotArg.split('=')[1] || path.join(__dirname, '..', 'screenshots', `${mobile ? 'mobile' : 'desktop'}-${strategy}`)) : null;
if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
let seed = 42; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(mobile
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1280, height: 720 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g|favicon/.test(m.text())) errors.push(m.text()); });
  await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* ignore */ } });
  await page.reload();
  let n = 0; const shot = async (name) => { if (shotDir) await page.screenshot({ path: path.join(shotDir, `${String(++n).padStart(3, '0')}-${name}.png`) }); };
  await page.waitForTimeout(600); await shot('title');
  await page.click('#btn-start');
  await page.waitForTimeout(1200);

  const seen = new Set(); const attempts = {}; const cards = new Set(); const endings = [];
  let choices = 0, badEnds = 0, done = false, same = 0, last = '';
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
    const sig = JSON.stringify([st.ch, st.pc, st.modal, st.choices, st.text]);
    same = sig === last ? same + 1 : 0; last = sig;
    if (same > 400) { errors.push(`Stuck at ${st.ch} pc ${st.pc}: "${st.text.slice(0, 80)}"`); break; }
    if (st.card) { if (!cards.has(st.ch)) { cards.add(st.ch); await page.waitForTimeout(500); await shot(`${st.ch}-card`); } await page.waitForTimeout(200); continue; }
    if (st.modal) {
      if (st.bad) { badEnds++; await page.waitForTimeout(450); await shot(`${st.ch}-badend-${badEnds}`); }
      if (st.ending && !st.bad) { endings.push(st.ending.trim().slice(0, 40)); }
      if (st.next) { await page.waitForTimeout(500); await shot(`${st.ch}-results`); await page.click('#modal [data-act="next"]'); await page.waitForTimeout(1200); continue; }
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
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (overflow) errors.push('Horizontal overflow on the final screen');
  const final = await page.evaluate(() => ({ route: SimEngine.state.route, stats: SimEngine.state.stats, endings: SimEngine.state.endings, lessons: SimEngine.state.lessons.length, ach: SimEngine.state.achievements.length }));
  await browser.close();
  console.log(JSON.stringify({ strategy, mobile, chapters: seen.size, choices, badEnds, endingScreens: endings, ...final }));
  if (shotDir) console.log('screenshots: ' + shotDir);
  if (errors.length) { console.error('PAGE ERRORS:\n' + errors.join('\n')); process.exit(1); }
  if (!done || !seen.has('ch20')) { console.error('Did not reach the end of Chapter 20'); process.exit(1); }
  console.log('OK');
})();
