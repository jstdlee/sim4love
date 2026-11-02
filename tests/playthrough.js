#!/usr/bin/env node
/* Headless playthrough of every chapter with Playwright.
   Run: node tests/playthrough.js [first|last|random] [--shots]
   - first: always pick the first visible option (mostly the healthy path)
   - last:  always pick the last option (mostly mistakes / bad ends → tests rewind)
   - random: seeded random choices
   Fails (exit 1) on any page error or if the final results screen is not reached. */
const { chromium } = require('playwright');
const path = require('path');
const strategy = process.argv[2] || 'first';
const shots = process.argv.includes('--shots');
let seed = 42; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g/.test(m.text())) errors.push(m.text()); });
  await page.goto('file://' + path.join(__dirname, '..', 'index.html'));
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.click('#btn-start');
  await page.waitForTimeout(2400);

  const seen = new Set(); const attempts = {}; let choices = 0, badEnds = 0, done = false;
  for (let i = 0; i < 20000 && !done; i++) {
    const st = await page.evaluate(() => {
      const q = (x) => document.querySelector(x);
      return { ch: SimEngine.state.chapter, card: q('#chapter-card').classList.contains('on'),
        modal: q('#modal').classList.contains('on'), next: !!q('#modal [data-act="next"]'), title: !!q('#modal [data-act="title"]'),
        bad: !!q('#modal .badend'), choices: q('#choices').classList.contains('on'), ctext: q('#choices').textContent,
        nopts: q('#choices').querySelectorAll('.opt').length };
    });
    seen.add(st.ch);
    if (st.card) { await page.waitForTimeout(250); continue; }
    if (st.modal) {
      if (st.bad) badEnds++;
      if (st.next) { if (shots) await page.screenshot({ path: `results-${st.ch}.png` }); await page.click('#modal [data-act="next"]'); await page.waitForTimeout(2400); continue; }
      if (st.title) { done = true; break; }
      await page.click('#modal [data-close]'); await page.waitForTimeout(40); continue;
    }
    if (st.choices && st.nopts) {
      await page.waitForTimeout(460);
      const key = st.ch + st.ctext; const tries = attempts[key] = (attempts[key] || 0) + 1;
      const base = strategy === 'last' ? st.nopts - 1 : strategy === 'random' ? Math.floor(rnd() * st.nopts) : 0;
      // On a revisit (after a bad-end rewind) move to a different option so the run always progresses.
      const k = (base + (tries - 1) * (strategy === 'last' ? -1 : 1) + st.nopts * 10) % st.nopts;
      await page.click(`#choices .opt >> nth=${k}`); choices++; await page.waitForTimeout(40); continue;
    }
    await page.evaluate(() => { const e = new KeyboardEvent('keydown', { key: ' ', bubbles: true }); document.dispatchEvent(e); document.dispatchEvent(e); });
    await page.waitForTimeout(10);
  }
  const final = await page.evaluate(() => ({ route: SimEngine.state.route, stats: SimEngine.state.stats, endings: SimEngine.state.endings, lessons: SimEngine.state.lessons.length, ach: SimEngine.state.achievements }));
  if (shots) await page.screenshot({ path: 'results-final.png' });
  await browser.close();
  console.log(JSON.stringify({ strategy, chapters: [...seen], choices, badEnds, ...final }));
  if (errors.length) { console.error('PAGE ERRORS:\n' + errors.join('\n')); process.exit(1); }
  if (!done || !seen.has('ch10')) { console.error('Did not reach the end of Chapter 10'); process.exit(1); }
  console.log('OK');
})();
