/* Public site + gate routing test. Imports the Worker with a mock ASSETS binding (files from disk), no network.
   Usage: node tests/site.mjs            -> in-process checks
          node tests/site.mjs --url=https://sim4love.jstdlee.workers.dev   -> same checks over HTTP (no pass cookie) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import worker from '../src/worker.js';
import { RESOURCES } from '../src/site-resources.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const remote = (process.argv.find((a) => a.startsWith('--url=')) || '').slice(6).replace(/\/$/, '');
const ORIGIN = remote || 'https://sim4love.jstdlee.workers.dev';
const COOKIE_KEY = 'test-cookie-key-not-a-secret';
const env = {
  TURNSTILE_SITEKEY: '1x00000000000000000000AA', TURNSTILE_HOSTNAMES: 'example.invalid', COOKIE_KEY,
  ASSETS: { fetch: async (req) => {
    const u = new URL(req.url);
    let p = decodeURIComponent(u.pathname);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return new Response('Not found', { status: 404 });
    return new Response(fs.readFileSync(f), { status: 200, headers: { 'Content-Type': 'application/octet-stream' } });
  } },
};

let fails = 0;
const check = (ok, msg) => { if (!ok) { fails++; console.log('FAIL', msg); } else console.log('ok  ', msg); };

async function get(p, { nav = true, cookie } = {}) {
  const headers = { 'Sec-Fetch-Mode': nav ? 'navigate' : 'no-cors', Accept: nav ? 'text/html' : '*/*' };
  if (cookie) headers.Cookie = cookie;
  if (remote) {
    const r = await fetch(ORIGIN + p, { headers, redirect: 'manual' });
    return { status: r.status, headers: r.headers, body: await r.text() };
  }
  const r = await worker.fetch(new Request(ORIGIN + p, { headers }), env);
  return { status: r.status, headers: r.headers, body: r.body ? await r.text() : '' };
}

async function pass() {
  const { webcrypto: c } = await import('node:crypto');
  const exp = String(Math.floor(Date.now() / 1000) + 3600);
  const key = await c.subtle.importKey('raw', new TextEncoder().encode(COOKIE_KEY), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = Buffer.from(await c.subtle.sign('HMAC', key, new TextEncoder().encode(exp))).toString('base64url');
  return `s4l_pass=${exp}.${sig}`;
}

const PAGES = ['/', '/about', '/privacy', '/disclaimer', '/zh/', '/zh/about', '/zh/privacy', '/zh/disclaimer'];
const xmllint = (() => { try { execFileSync('xmllint', ['--version'], { stdio: 'ignore' }); return true; } catch { return false; } })();

for (const p of PAGES) {
  const r = await get(p);
  check(r.status === 200 && /text\/html/.test(r.headers.get('content-type')), `${p} -> 200 html without a pass`);
  const b = r.body;
  const zh = p.startsWith('/zh');
  check(new RegExp(`<html lang="${zh ? 'zh-Hans-SG' : 'en-SG'}">`).test(b), `${p} lang attribute`);
  check(b.includes(`<link rel="canonical" href="https://sim4love.jstdlee.workers.dev${p}">`), `${p} canonical`);
  check(['en-SG', 'zh-SG', 'x-default'].every((h) => b.includes(`hreflang="${h}"`)), `${p} hreflang en-SG/zh-SG/x-default`);
  check(/<title>[^<]{10,}<\/title>/.test(b) && /<meta name="description" content="[^"]{50,}">/.test(b), `${p} title + description`);
  check(['og:title', 'og:image', 'og:locale', 'twitter:card'].every((k) => b.includes(k)), `${p} OG/Twitter tags`);
  check(b.split('<h1').length === 2 && b.includes('<main id="main">') && b.includes('<nav'), `${p} one h1, main and nav landmarks`);
  check(!/<script(?![^>]*application\/ld\+json)/.test(b), `${p} no executable scripts`);
  const m = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(b);
  let ld = null;
  try { ld = JSON.parse(m[1]); } catch { /* reported below */ }
  check(ld && ld['@context'] === 'https://schema.org' && Array.isArray(ld['@graph']), `${p} JSON-LD parses`);
  const types = ld ? ld['@graph'].map((n) => n['@type']) : [];
  if (p === '/' || p === '/zh/') check(['VideoGame', 'WebSite', 'Organization', 'FAQPage'].every((t) => types.includes(t)), `${p} JSON-LD has VideoGame, WebSite, Organization, FAQPage`);
  check(b.includes(zh ? '/play?lang=zh-SG' : 'href="/play"'), `${p} links to the game`);
  for (const href of [...b.matchAll(/href="(\/[^"#]*)/g)].map((x) => x[1])) {
    if (href.startsWith('/play')) continue;
    const t = await get(href.split('?')[0], { nav: false });
    if (t.status !== 200) check(false, `${p} internal link ${href} -> ${t.status}`);
  }
}

const dis = (await get('/disclaimer')).body;
const disZh = (await get('/zh/disclaimer')).body;
check(RESOURCES.length >= 10 && RESOURCES.every((r) => dis.includes(r.src.replace(/&/g, '&amp;')) && dis.includes(r.en.split(':')[0].replace(/&/g, '&amp;'))), `disclaimer lists all ${RESOURCES.length} in-game help contacts`);
check(RESOURCES.every((r) => disZh.includes(r.zh.split(/[:：]/)[0])), 'zh disclaimer lists all help contacts in Chinese');
const priv = (await get('/privacy')).body;
const keys = [...new Set([...fs.readFileSync(path.join(root, 'js/engine.js'), 'utf8').matchAll(/'(sim4love\.[a-z0-9_.]+)'/gi)].map((x) => x[1]))];
check(keys.length >= 8 && keys.every((k) => priv.includes(`<code>${k}</code>`)), `privacy lists every localStorage key in engine.js (${keys.join(', ')})`);
check(['s4l_pass', 'cloudflare.com/privacypolicy', 'turnstile-privacy-policy', 'PDPA', 'github.com/jstdlee/sim4love/issues', 'mailto:sim4love@ohmyai.xyz'].every((s) => priv.includes(s)), 'privacy mentions cookie, Cloudflare policies, PDPA, contact');
check(!/collect(s)? nothing|no data at all/i.test(priv), 'privacy makes no "collects nothing at all" claim');

const robots = await get('/robots.txt', { nav: false });
check(robots.status === 200 && /Disallow: \/play/.test(robots.body) && /Sitemap: https:\/\/sim4love\.jstdlee\.workers\.dev\/sitemap\.xml/.test(robots.body) && /User-agent: GPTBot/.test(robots.body), 'robots.txt allows crawlers, disallows /play, points to sitemap');
const sm = await get('/sitemap.xml', { nav: false });
check(sm.status === 200 && (sm.body.match(/<loc>/g) || []).length === PAGES.length, `sitemap.xml has ${PAGES.length} URLs`);
if (xmllint) {
  const tmp = path.join(root, '.wrangler', 'sitemap.test.xml'); fs.mkdirSync(path.dirname(tmp), { recursive: true }); fs.writeFileSync(tmp, sm.body);
  try { execFileSync('xmllint', ['--noout', tmp]); check(true, 'sitemap.xml is well-formed XML (xmllint)'); } catch { check(false, 'sitemap.xml is well-formed XML (xmllint)'); }
} else {
  check(/^<\?xml[^>]+\?>\s*<urlset[^>]*>[\s\S]*<\/urlset>\s*$/.test(sm.body) && (sm.body.match(/<url>/g) || []).length === (sm.body.match(/<\/url>/g) || []).length, 'sitemap.xml structure (no xmllint)');
}
for (const p of ['/llms.txt', '/llms-full.txt', '/.well-known/security.txt', '/site.webmanifest', '/favicon.ico', '/assets/site/og.jpg', '/assets/site/favicon.svg', '/assets/fonts/lora.woff2']) {
  const r = await get(p, { nav: false });
  check(r.status === 200, `${p} -> 200 without a pass`);
}
check((await get('/llms.txt', { nav: false })).body.startsWith('# sim4love\n\n> '), 'llms.txt follows the llms.txt format');
const MAIL = 'sim4love@ohmyai.xyz';
for (const p of ['/about', '/privacy', '/disclaimer', '/zh/about', '/zh/privacy', '/zh/disclaimer']) {
  check((await get(p)).body.includes(`href="mailto:${MAIL}"`), `${p} links the contact email`);
}
check((await get('/llms.txt', { nav: false })).body.includes(MAIL), 'llms.txt lists the contact email');
check((await get('/.well-known/security.txt', { nav: false })).body.split('\n')[0] === `Contact: mailto:${MAIL}`, 'security.txt Contact: mailto: comes first');
check((await get('/about/')).status === 301 && (await get('/zh')).status === 301, 'trailing-slash redirects');

// Gated game.
const play = await get('/play');
check(play.status === 200 && play.body.includes('id="gate"') && play.body.includes('value="/play"'), '/play without a pass -> gate page, returns to /play');
for (const p of ['/js/engine.js', '/css/style.css', '/assets/bg/keyart.jpg', '/assets/chars/ava/base.webp', '/audio/', '/index.html?x']) {
  const r = await get(p, { nav: false });
  check(r.status === 403 || r.status === 301 || r.status === 404, `${p} without a pass -> ${r.status} (gated)`);
}
const idx = await get('/index.html');
check(idx.status === 301 && idx.headers.get('location') === '/play', '/index.html -> 301 /play');
if (!remote) {
  const cookie = await pass();
  const g = await get('/play', { cookie });
  check(g.status === 200 && g.body.includes('id="title-links"') && g.headers.get('cache-control') === 'private, no-cache', '/play with a pass -> the game (private, no-cache)');
  check((await get('/js/engine.js', { cookie, nav: false })).status === 200, 'game assets with a pass -> 200');
  check((await get('/', { cookie })).body.includes('class="hero"'), '/ with a pass is still the landing page');
}

console.log(fails ? `\n${fails} check(s) FAILED` : '\nsite: all checks passed');
process.exit(fails ? 1 : 0);
