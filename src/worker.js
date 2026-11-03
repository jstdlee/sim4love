import { ROUTES, renderPage, robotsTxt, sitemapXml, llmsTxt, llmsFullTxt, securityTxt, webManifest } from './site.js';

/* sim4love Worker: public website + Turnstile gate in front of the static game assets.
   Every request runs through this script first (assets.run_worker_first).
   - Public, no gate: the site pages (/, /about, /privacy, /disclaimer and /zh/...), robots.txt, sitemap.xml,
     llms.txt, llms-full.txt, /.well-known/security.txt, the favicon and /assets/fonts/ + /assets/site/.
   - /play is the game (index.html). /index.html redirects there.
   - A valid signed pass cookie -> the game asset is served unchanged.
   - No / bad / expired cookie -> navigations get the gate page, everything else 403.
   - POST /__verify -> server-side Turnstile siteverify, then a 7-day pass cookie.
   Env: TURNSTILE_SITEKEY (var), TURNSTILE_HOSTNAMES (var, comma list),
        TURNSTILE_SECRET (secret), COOKIE_KEY (secret),
        TURNSTILE_ALLOW_TEST_KEYS (local .dev.vars only; never set in production). */

const COOKIE = 's4l_pass';
const PASS_SECONDS = 7 * 24 * 60 * 60;
const ACTION = 'enter';
const VERIFY_PATH = '/__verify';
const PLAY_PATH = '/play';
// Fonts and site images (favicon, OG card, landing hero) are public and harmless.
const PUBLIC_PREFIXES = ['/assets/fonts/', '/assets/site/'];

const enc = new TextEncoder();
const keyCache = new Map();

function hmacKey(secret) {
  if (!keyCache.has(secret)) {
    keyCache.set(secret, crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']));
  }
  return keyCache.get(secret);
}

function b64url(buf) {
  let s = '';
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function unb64url(str) {
  const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function makePass(env, now) {
  const exp = String(Math.floor(now / 1000) + PASS_SECONDS);
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(env.COOKIE_KEY), enc.encode(exp));
  return `${exp}.${b64url(sig)}`;
}

async function hasValidPass(request, env) {
  if (!env.COOKIE_KEY) return false;
  const header = request.headers.get('Cookie') || '';
  const match = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const value = match.slice(COOKIE.length + 1);
  const m = /^(\d{1,12})\.([A-Za-z0-9_-]{43})$/.exec(value);
  if (!m) return false;
  const exp = Number(m[1]);
  if (!(exp * 1000 > Date.now())) return false;
  let sig;
  try { sig = unb64url(m[2]); } catch { return false; }
  // crypto.subtle.verify compares in constant time.
  return crypto.subtle.verify('HMAC', await hmacKey(env.COOKIE_KEY), sig, enc.encode(m[1]));
}

// Only same-origin relative paths are allowed as the post-verify destination.
function safeNext(raw, origin) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/\\') || raw.length > 1024) return PLAY_PATH;
  try {
    const u = new URL(raw, origin);
    if (u.origin !== origin || u.pathname === VERIFY_PATH) return PLAY_PATH;
    return u.pathname + u.search + u.hash;
  } catch { return PLAY_PATH; }
}

function looksLikeNavigation(request, url) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  const mode = request.headers.get('Sec-Fetch-Mode');
  if (mode) return mode === 'navigate';
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/html') || url.pathname === PLAY_PATH || url.pathname.endsWith('.html');
}

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
};

function forbidden() {
  return new Response('Forbidden', { status: 403, headers: { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' } });
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function gatePage(env, next, failed) {
  const sitekey = escapeAttr(env.TURNSTILE_SITEKEY || '');
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="color-scheme" content="dark">
<title>sim4love</title>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<style>
@font-face { font-family: 'Titan One'; src: url(/assets/fonts/titan-one.woff2) format('woff2'); font-display: swap; }
@font-face { font-family: 'Marcellus'; src: url(/assets/fonts/marcellus-400.woff2) format('woff2'); font-display: swap; }
@font-face { font-family: 'Lora'; src: url(/assets/fonts/lora.woff2) format('woff2'); font-weight: 400 700; font-display: swap; }
:root { --bg: #120a0c; --panel: #1d0f12; --gold: #c9a45c; --gold-hi: #e6c878; --gold-lo: #8a6a33; --ink: #e1dece; --ink-2: #d1c4a8; --muted: #a8977a; --red: #d65a50; }
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
body { min-height: 100dvh; display: grid; place-items: center; padding: 24px; background: radial-gradient(ellipse at 50% 30%, #2b1d16 0%, var(--bg) 60%, #0b0607 100%); color: var(--ink); font: 16px/1.6 'Lora', Georgia, 'Noto Serif SC', 'Songti SC', 'PingFang SC', serif; }
main { width: min(420px, 100%); padding: 36px 28px 30px; text-align: center; background: linear-gradient(180deg, rgba(43, 29, 22, .96), rgba(29, 15, 18, .97)); border: 1px solid var(--gold-lo); outline: 1px solid rgba(201, 164, 92, .28); outline-offset: 5px; box-shadow: 0 10px 30px rgba(0, 0, 0, .55); }
h1 { margin: 0 0 18px; font: 400 clamp(34px, 9vw, 44px)/1 'Titan One', 'Arial Rounded MT Bold', system-ui, sans-serif; letter-spacing: .01em; background: linear-gradient(180deg, #f6e3a8 0%, #e2bf6c 48%, #a87a34 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
p { margin: 0; color: var(--ink-2); text-wrap: balance; }
p.zh { margin-top: 2px; color: var(--muted); font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', serif; }
.rule { width: 48px; height: 1px; margin: 22px auto; background: var(--gold); opacity: .6; }
.cf-turnstile { min-height: 65px; display: flex; justify-content: center; }
.err { margin-top: 14px; color: var(--red); font-size: 14px; }
noscript p { margin-top: 14px; font-size: 14px; }
footer { margin-top: 18px; font: 12px/1.4 'Marcellus', Georgia, serif; letter-spacing: .06em; color: var(--muted); }
footer a { color: var(--muted); }
</style>
</head>
<body>
<main>
  <h1>sim4love</h1>
  <p>Quick check before you play</p>
  <p class="zh" lang="zh-Hans">开始前的快速验证</p>
  <div class="rule" aria-hidden="true"></div>
  <form id="gate" method="POST" action="${VERIFY_PATH}">
    <input type="hidden" name="next" value="${escapeAttr(next)}">
    <div class="cf-turnstile" data-sitekey="${sitekey}" data-action="${ACTION}" data-theme="dark" data-callback="s4lPassed"></div>
  </form>
  ${failed ? '<p class="err" role="alert">Verification failed. Please try again. / 验证失败，请重试。</p>' : ''}
  <noscript><p>Please enable JavaScript to play. / 请开启 JavaScript。</p></noscript>
  <footer>Protected by Cloudflare Turnstile · <a href="/privacy">Privacy</a> · <a href="/zh/privacy" lang="zh-Hans">隐私</a></footer>
</main>
<script>
  function s4lPassed() { document.getElementById('gate').submit(); }
</script>
</body>
</html>`;
  return new Response(html, {
    status: failed ? 403 : 200,
    headers: {
      ...SECURITY_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src https://challenges.cloudflare.com; style-src 'unsafe-inline'; font-src 'self'; img-src 'self' data:; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}

async function siteverify(token, request, env) {
  const expectedHostnames = new Set((env.TURNSTILE_HOSTNAMES || '').split(',').map((h) => h.trim()).filter(Boolean));
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048 || expectedHostnames.size === 0 || !env.TURNSTILE_SECRET) return false;
  let result;
  try {
    const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) body.set('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    result = await r.json();
  } catch {
    return false; // Network error, non-2xx or non-JSON: fail closed.
  }
  if (!result || result.success !== true || !expectedHostnames.has(result.hostname)) return false;
  // Turnstile's dummy test keys return no action; only local dev may opt in to accepting them.
  const testResult = result.metadata && result.metadata.result_with_testing_key === true;
  if (testResult) return env.TURNSTILE_ALLOW_TEST_KEYS === '1';
  return result.action === ACTION;
}

async function handleVerify(request, env, url) {
  if (request.method !== 'POST') return forbidden();
  const type = request.headers.get('Content-Type') || '';
  if (!type.startsWith('application/x-www-form-urlencoded') && !type.startsWith('multipart/form-data')) return forbidden();
  let form;
  try { form = await request.formData(); } catch { return forbidden(); }
  const next = safeNext(form.get('next'), url.origin);
  const ok = await siteverify(form.get('cf-turnstile-response'), request, env);
  if (!ok || !env.COOKIE_KEY) return gatePage(env, next, true);
  const pass = await makePass(env, Date.now());
  return new Response(null, {
    status: 303,
    headers: {
      ...SECURITY_HEADERS,
      Location: next,
      'Set-Cookie': `${COOKIE}=${pass}; Max-Age=${PASS_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    },
  });
}

const PUBLIC_HEADERS = {
  'Cache-Control': 'public, max-age=300',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
};
// Site pages have no scripts at all (JSON-LD is a data block and is not executed).
const SITE_CSP = "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; img-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";

function textResponse(body, type, request, extra = {}) {
  return new Response(request.method === 'HEAD' ? null : body, { headers: { ...PUBLIC_HEADERS, 'Content-Type': type, ...extra } });
}

function redirect(location, status = 301) {
  return new Response(null, { status, headers: { ...PUBLIC_HEADERS, Location: location } });
}

// Public site routes. Returns a Response, or null when the path belongs to the gated game.
async function publicRoute(request, env, url) {
  const path = url.pathname;
  if (PUBLIC_PREFIXES.some((p) => path.startsWith(p))) {
    const res = await env.ASSETS.fetch(request);
    if (!res.ok || !path.startsWith('/assets/site/')) return res;
    const out = new Response(res.body, res);
    out.headers.set('Cache-Control', 'public, max-age=86400');
    return out;
  }
  // Canonical forms: /zh -> /zh/, /about/ -> /about.
  if (path === '/zh') return redirect('/zh/' + url.search);
  if (path.length > 1 && path.endsWith('/') && path !== '/zh/' && ROUTES.has(path.slice(0, -1))) return redirect(path.slice(0, -1) + url.search);
  const route = ROUTES.get(path);
  if (route) return textResponse(renderPage(route[0], route[1]), 'text/html; charset=utf-8', request, { 'Content-Security-Policy': SITE_CSP, 'Content-Language': route[0] === 'zh' ? 'zh-SG' : 'en-SG' });
  switch (path) {
    case '/robots.txt': return textResponse(robotsTxt(), 'text/plain; charset=utf-8', request);
    case '/sitemap.xml': return textResponse(sitemapXml(), 'application/xml; charset=utf-8', request);
    case '/llms.txt': return textResponse(llmsTxt(), 'text/plain; charset=utf-8', request);
    case '/llms-full.txt': return textResponse(llmsFullTxt(), 'text/plain; charset=utf-8', request);
    case '/.well-known/security.txt': return textResponse(securityTxt(), 'text/plain; charset=utf-8', request);
    case '/site.webmanifest': return textResponse(webManifest(), 'application/manifest+json; charset=utf-8', request);
    case '/favicon.ico': {
      const res = await env.ASSETS.fetch(new Request(new URL('/assets/site/favicon.ico', url), request));
      const out = new Response(res.body, res);
      if (res.ok) out.headers.set('Cache-Control', 'public, max-age=86400');
      return out;
    }
    default: return null;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === VERIFY_PATH) return handleVerify(request, env, url);
    if (request.method === 'GET' || request.method === 'HEAD') {
      const pub = await publicRoute(request, env, url);
      if (pub) return pub;
      // Old entry point: the game used to live at / (index.html); keep any query or hash working.
      if (url.pathname === '/index.html') return redirect(PLAY_PATH + url.search, 301);
    }
    if (await hasValidPass(request, env)) {
      // /play serves the game's index.html. Its relative asset URLs (css/, js/, assets/) still resolve from /.
      const assetReq = url.pathname === PLAY_PATH ? new Request(new URL('/', url), request) : request;
      const res = await env.ASSETS.fetch(assetReq);
      // Gated content must not be stored by shared caches.
      const out = new Response(res.body, res);
      out.headers.set('Cache-Control', 'private, no-cache');
      out.headers.set('X-Robots-Tag', 'noindex');
      return out;
    }
    if (looksLikeNavigation(request, url)) return gatePage(env, url.pathname + url.search, false);
    return forbidden();
  },
};
