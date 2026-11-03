/* Public website layer for sim4love: landing, about, privacy and disclaimer pages in en-SG and zh-SG, plus
   robots.txt, sitemap.xml, llms.txt, llms-full.txt and security.txt. Rendered by the Worker, no client JS.
   The game itself (/play and its assets) stays behind the Turnstile gate in worker.js. */
import { COPY, STORAGE_KEYS, UPDATED, REPO, ISSUES } from './site-content.js';
import { RESOURCES, RESOURCES_VERIFIED } from './site-resources.js';

export const SITE_URL = 'https://sim4love.jstdlee.workers.dev';
const PAGES = ['home', 'about', 'privacy', 'disclaimer'];
const SLUG = { home: '/', about: '/about', privacy: '/privacy', disclaimer: '/disclaimer' };

// Path -> [locale, page]. Exact matches only; worker.js normalises trailing slashes first.
export const ROUTES = new Map();
for (const p of PAGES) {
  ROUTES.set(SLUG[p], ['en', p]);
  ROUTES.set(p === 'home' ? '/zh/' : `/zh${SLUG[p]}`, ['zh', p]);
}

const pathFor = (loc, page) => (loc === 'zh' ? (page === 'home' ? '/zh/' : `/zh${SLUG[page]}`) : SLUG[page]);
const abs = (p) => SITE_URL + p;
const playHref = (loc) => (loc === 'zh' ? '/play?lang=zh-SG' : '/play');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
// Inline markup: [text](href) and **bold**. Input is trusted copy from site-content.js, but still escaped first.
function inline(s) {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
      const ext = /^https?:/.test(href);
      return `<a href="${href}"${ext ? ' rel="noopener"' : ''}>${t}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
const plain = (s) => String(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
// Markdown for llms files: make relative links absolute.
const md = (s) => String(s).replace(/\]\((\/[^)\s]*)\)/g, (_, p) => `](${abs(p)})`);

function helpList(loc) {
  return `<ul class="help">${RESOURCES.map((r) => {
    const [name, ...rest] = (loc === 'zh' ? r.zh : r.en).split(/[:：]/);
    return `<li><strong>${esc(name)}</strong><span>${esc(rest.join(':').trim())}</span> <a href="${esc(r.src)}" rel="noopener">${loc === 'zh' ? '官方网页' : 'Official page'}</a></li>`;
  }).join('')}</ul>`;
}

function keysTable(loc) {
  const head = loc === 'zh' ? ['键名', '用途'] : ['Key', 'What it remembers'];
  return `<div class="table"><table><thead><tr><th scope="col">${head[0]}</th><th scope="col">${head[1]}</th></tr></thead><tbody>${STORAGE_KEYS.map(([k, e, z]) => `<tr><td><code>${esc(k)}</code></td><td>${esc(loc === 'zh' ? z : e)}</td></tr>`).join('')}</tbody></table></div>`;
}

function block(b, loc) {
  if (b.p) return `<p>${inline(b.p.replace('{verified}', fmtDate(RESOURCES_VERIFIED, loc)))}</p>`;
  if (b.ul) return `<ul>${b.ul.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map((x) => `<li>${inline(x)}</li>`).join('')}</ol>`;
  if (b.keys) return keysTable(loc);
  if (b.help) return helpList(loc);
  return '';
}

function fmtDate(iso, loc) {
  const [y, m, d] = iso.split('-').map(Number);
  if (loc === 'zh') return `${y}年${m}月${d}日`;
  return `${d} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m - 1]} ${y}`;
}

// ---------- structured data ----------
function jsonLd(loc, page) {
  const c = COPY[loc];
  const url = abs(pathFor(loc, page));
  const org = { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: 'sim4love', url: SITE_URL + '/', logo: abs('/assets/site/icon-512.png'), sameAs: [REPO] };
  const site = { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'sim4love', url: SITE_URL + '/', inLanguage: ['en-SG', 'zh-SG'], publisher: { '@id': `${SITE_URL}/#org` } };
  const game = {
    '@type': 'VideoGame', '@id': `${SITE_URL}/#game`, name: 'sim4love', url: abs('/play'),
    description: COPY.en.home.desc, image: abs('/assets/site/og.jpg'),
    genre: ['Visual novel', 'Interactive fiction', 'Educational game'], gamePlatform: 'Web browser', applicationCategory: 'Game', operatingSystem: 'Any',
    playMode: 'SinglePlayer', inLanguage: ['en-SG', 'zh-SG'], contentRating: '14+', isAccessibleForFree: true, isFamilyFriendly: true,
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 14, geographicArea: { '@type': 'Country', name: 'Singapore' } },
    educationalUse: 'Discussion starter on healthy relationships, consent, online safety and money management',
    keywords: 'healthy relationships, consent, sexuality education Singapore, cyber wellness, online safety, money management for teens, CCE, Singapore teens, 恋爱教育, 理财',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SGD', availability: 'https://schema.org/InStock', url: abs('/play') },
    publisher: { '@id': `${SITE_URL}/#org` }, author: { '@id': `${SITE_URL}/#org` },
  };
  const webpage = { '@type': page === 'about' ? 'AboutPage' : 'WebPage', '@id': `${url}#webpage`, url, name: c[page].title, description: c[page].desc, inLanguage: c.lang, isPartOf: { '@id': `${SITE_URL}/#website` }, dateModified: UPDATED };
  const graph = [org, site, webpage];
  if (page === 'home') {
    webpage.about = { '@id': `${SITE_URL}/#game` };
    graph.push(game, { '@type': 'FAQPage', '@id': `${url}#faq`, inLanguage: c.lang, mainEntity: c.home.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) });
  } else {
    webpage.breadcrumb = { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'sim4love', item: abs(pathFor(loc, 'home')) },
      { '@type': 'ListItem', position: 2, name: c[page].h1, item: url },
    ] };
  }
  // Escape "<" so the JSON can never close the script element.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

// ---------- page shell ----------
const CSS = `@font-face{font-family:'Titan One';src:url(/assets/fonts/titan-one.woff2) format('woff2');font-display:swap}
@font-face{font-family:'Marcellus';src:url(/assets/fonts/marcellus-400.woff2) format('woff2');font-display:swap}
@font-face{font-family:'Lora';src:url(/assets/fonts/lora.woff2) format('woff2');font-weight:400 700;font-display:swap}
:root{--bg:#120a0c;--panel:#1d0f12;--gold:#c9a45c;--gold-hi:#e6c878;--gold-lo:#8a6a33;--ink:#e1dece;--ink-2:#d1c4a8;--muted:#a8977a;--line:rgba(201,164,92,.22);--f-body:'Lora',Georgia,'Noto Serif SC','Songti SC','PingFang SC',serif;--f-label:'Marcellus',Georgia,'Noto Serif SC','PingFang SC',serif;color-scheme:dark}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-padding-top:72px}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.7 var(--f-body);-webkit-font-smoothing:antialiased}
:lang(zh){--f-body:'Noto Serif SC','Songti SC','PingFang SC','Lora',serif}
a{color:var(--gold-hi);text-decoration-thickness:1px;text-underline-offset:3px}a:hover{color:#f6e3a8}
:focus-visible{outline:2px solid var(--gold-hi);outline-offset:3px;border-radius:2px}
.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;z-index:9;background:var(--panel);padding:8px 12px}
.wrap{width:min(1080px,100% - 40px);margin-inline:auto}
header.top{position:sticky;top:0;z-index:5;background:rgba(18,10,12,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
header.top .wrap{display:flex;align-items:center;gap:20px;min-height:58px}
.brand{font:400 22px/1 'Titan One','Arial Rounded MT Bold',system-ui,sans-serif;text-decoration:none;background:linear-gradient(180deg,#f6e3a8,#e2bf6c 48%,#a87a34);-webkit-background-clip:text;background-clip:text;color:transparent}
.brand span{color:var(--gold-hi)}
nav.main{display:flex;gap:18px;margin-left:auto;align-items:center;font:15px/1 var(--f-label);letter-spacing:.04em}
nav.main a{color:var(--ink-2);text-decoration:none;padding:8px 0;white-space:nowrap}nav.main a:hover,nav.main a[aria-current]{color:var(--gold-hi)}
nav.main .lang{border:1px solid var(--line);padding:6px 10px;border-radius:999px}
nav.main .btn.small{padding:9px 14px 8px}
.btn{display:inline-block;padding:13px 26px 12px;font:16px/1 var(--f-label);letter-spacing:.08em;text-decoration:none;border:1px solid var(--gold-lo);color:var(--ink);background:rgba(29,15,18,.7);transition:background .2s,color .2s}
.btn:hover{background:rgba(201,164,92,.12);color:#fff}
.btn.primary{color:#1d0f12;background:linear-gradient(180deg,#f6e3a8,#d9b465 55%,#b48a3e);border-color:#f0d58e;box-shadow:0 6px 22px rgba(201,164,92,.25)}
.btn.primary:hover{color:#1d0f12;filter:brightness(1.06)}
.btn.small{padding:9px 16px 8px;font-size:14px}
.hero{position:relative;min-height:min(86vh,760px);display:grid;align-items:end;overflow:hidden;border-bottom:1px solid var(--line)}
.hero picture,.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,10,12,.15) 0%,rgba(18,10,12,.35) 40%,rgba(18,10,12,.94) 82%,var(--bg) 100%)}
.hero .wrap{position:relative;z-index:1;padding:120px 0 56px;text-align:center}
.logo{margin:0;font:400 clamp(56px,12vw,112px)/1 'Titan One','Arial Rounded MT Bold',system-ui,sans-serif;background:linear-gradient(180deg,#fff4d0,#e8c674 50%,#a87a34);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 0 #5c1a22) drop-shadow(0 10px 24px rgba(0,0,0,.6))}
.tag{margin:14px 0 0;font:15px/1.4 var(--f-label);letter-spacing:.28em;text-transform:uppercase;color:var(--gold-hi)}
:lang(zh) .tag{letter-spacing:.3em}
.lead{max-width:640px;margin:18px auto 0;font-size:19px;color:var(--ink);text-wrap:balance}
.ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:30px}
.facts{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin:0;padding:0;list-style:none;border-bottom:1px solid var(--line)}
.facts li{padding:22px 12px;text-align:center;border-right:1px solid var(--line)}.facts li:last-child{border-right:0}
.facts b{display:block;font:20px/1.2 var(--f-label);color:var(--gold-hi)}.facts span{font-size:14px;color:var(--muted)}
section{padding:64px 0 8px}
h2{margin:0 0 18px;font:400 clamp(26px,4vw,34px)/1.2 var(--f-label);color:var(--gold-hi);letter-spacing:.02em}
h2::after{content:'';display:block;width:40px;height:1px;margin-top:14px;background:var(--gold);opacity:.6}
h3{margin:0 0 6px;font:400 19px/1.3 var(--f-label);color:var(--ink);letter-spacing:.02em}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.grid article{background:var(--bg);padding:24px 22px}.grid p{margin:0;color:var(--ink-2);font-size:16px}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.prose{max-width:720px}.prose p,.prose li{color:var(--ink-2)}.prose strong{color:var(--ink)}
.prose ul,.prose ol{padding-left:1.2em}.prose li{margin:6px 0}
ol.steps{counter-reset:s;list-style:none;padding:0}ol.steps li{counter-increment:s;position:relative;padding-left:44px;margin:14px 0;color:var(--ink-2)}
ol.steps li::before{content:counter(s);position:absolute;left:0;top:1px;width:28px;height:28px;border:1px solid var(--gold-lo);border-radius:50%;display:grid;place-items:center;font:14px/1 var(--f-label);color:var(--gold-hi)}
details{border-top:1px solid var(--line);padding:4px 0}details:last-of-type{border-bottom:1px solid var(--line)}
summary{cursor:pointer;list-style:none;padding:16px 32px 16px 0;position:relative;font:18px/1.4 var(--f-label);color:var(--ink)}
summary::-webkit-details-marker{display:none}summary::after{content:'+';position:absolute;right:4px;top:12px;font-size:24px;color:var(--gold)}
details[open] summary::after{content:'−'}details p{margin:0 0 18px;color:var(--ink-2)}
.page-head{padding:72px 0 8px;border-bottom:1px solid var(--line)}
.page-head h1{margin:0;font:400 clamp(36px,6vw,54px)/1.1 var(--f-label);color:var(--gold-hi)}
.page-head .lead{margin:16px 0 28px;max-width:720px;text-align:left}
.toc{display:flex;flex-wrap:wrap;gap:8px 18px;margin:0 0 28px;padding:0;list-style:none;font:14px/1.4 var(--f-label);letter-spacing:.04em}
.toc a{color:var(--muted);text-decoration:none}.toc a:hover{color:var(--gold-hi)}
.doc section{padding:40px 0 0}.doc section h2{font-size:26px}
.table{overflow-x:auto;border:1px solid var(--line)}table{border-collapse:collapse;width:100%;font-size:15px}
th,td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--line);vertical-align:top}th{font:14px/1.4 var(--f-label);color:var(--gold-hi);letter-spacing:.04em}
tr:last-child td{border-bottom:0}code{font:14px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink);white-space:nowrap}
ul.help{list-style:none;padding:0;border:1px solid var(--line)}ul.help li{margin:0;padding:12px 16px;border-bottom:1px solid var(--line);font-size:16px}ul.help li:last-child{border-bottom:0}
ul.help strong{display:block;color:var(--ink);font-weight:600}ul.help span{color:var(--ink-2)}ul.help a{font-size:14px;white-space:nowrap}
.updated{margin-top:40px;color:var(--muted);font-size:14px}
footer.site{margin-top:80px;padding:36px 0 48px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}
footer.site p{margin:6px 0}footer.site nav{display:flex;flex-wrap:wrap;gap:8px 20px;margin-bottom:14px;font:14px/1.4 var(--f-label);letter-spacing:.04em}
footer.site nav a{color:var(--ink-2);text-decoration:none}footer.site strong{color:var(--ink)}
@media (max-width:820px){.grid{grid-template-columns:1fr 1fr}.cols{grid-template-columns:1fr;gap:8px}.facts{grid-template-columns:repeat(3,1fr)}.facts li:nth-child(3){border-right:0}.facts li:nth-child(n+4){border-top:1px solid var(--line)}}
@media (max-width:600px){body{font-size:16px}.wrap{width:calc(100% - 32px)}header.top .wrap{gap:12px}nav.main{gap:12px;font-size:14px}nav.main .hide-sm{display:none}
.hero{min-height:88svh}.hero .wrap{padding:96px 0 36px}.lead{font-size:17px}.grid{grid-template-columns:1fr}.facts{grid-template-columns:1fr 1fr}.facts li{border-right:1px solid var(--line)!important;border-top:1px solid var(--line)}.facts li:nth-child(-n+2){border-top:0}.facts li:nth-child(2n){border-right:0!important}.facts li:last-child{grid-column:span 2;border-right:0!important}
section{padding:48px 0 4px}.ctas .btn{width:100%;text-align:center}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}`;

function shell(loc, page, main) {
  const c = COPY[loc];
  const other = loc === 'zh' ? 'en' : 'zh';
  const url = abs(pathFor(loc, page));
  const p = c[page];
  const navLink = (k) => `<a href="${pathFor(loc, k)}"${k === page ? ' aria-current="page"' : ''}${k !== 'about' ? ' class="hide-sm"' : ''}>${c.nav[k]}</a>`;
  return `<!doctype html>
<html lang="${c.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#120a0c">
<meta name="color-scheme" content="dark">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en-SG" href="${abs(pathFor('en', page))}">
<link rel="alternate" hreflang="zh-SG" href="${abs(pathFor('zh', page))}">
<link rel="alternate" hreflang="x-default" href="${abs(pathFor('en', page))}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/site/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/site/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt">
<link rel="preload" href="/assets/fonts/marcellus-400.woff2" as="font" type="font/woff2" crossorigin>
${page === 'home' ? '<link rel="preload" href="/assets/fonts/titan-one.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" as="image" href="/assets/site/hero-1600.webp" imagesrcset="/assets/site/hero-800.webp 800w, /assets/site/hero-1600.webp 1600w" imagesizes="100vw" fetchpriority="high">\n' : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="sim4love">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs('/assets/site/og.jpg')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="sim4love: a Singapore skyline at sunset framed by frangipani blossoms">
<meta property="og:locale" content="${c.ogLocale}">
<meta property="og:locale:alternate" content="${COPY[other].ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${abs('/assets/site/og.jpg')}">
<script type="application/ld+json">${jsonLd(loc, page)}</script>
<style>${CSS}</style>
</head>
<body>
<a class="skip" href="#main">${loc === 'zh' ? '跳到正文' : 'Skip to content'}</a>
<header class="top"><div class="wrap">
  <a class="brand" href="${pathFor(loc, 'home')}" aria-label="sim4love ${c.nav.home}">sim<span>4</span>love</a>
  <nav class="main" aria-label="${loc === 'zh' ? '主导航' : 'Main'}">
    ${navLink('about')}${navLink('privacy')}${navLink('disclaimer')}
    <a class="lang" href="${pathFor(other, page)}" hreflang="${COPY[other].lang}" lang="${COPY[other].htmlLang}" aria-label="${c.nav.switchAria}">${c.nav.switchLabel}</a>
    <a class="btn primary small" href="${playHref(loc)}">${c.nav.play}</a>
  </nav>
</div></header>
<main id="main">
${main}
</main>
<footer class="site"><div class="wrap">
  <nav aria-label="${loc === 'zh' ? '页脚' : 'Footer'}">${PAGES.map((k) => `<a href="${pathFor(loc, k)}">${c.nav[k]}</a>`).join('')}<a href="${ISSUES}" rel="noopener">GitHub</a></nav>
  <p>${inline(c.footer.help)}</p>
  <p>${inline(c.footer.note)}</p>
  <p>${inline(c.footer.source)}</p>
</div></footer>
</body>
</html>`;
}

function homeMain(loc) {
  const h = COPY[loc].home;
  return `<div class="hero">
  <picture><source type="image/webp" srcset="/assets/site/hero-800.webp 800w, /assets/site/hero-1600.webp 1600w" sizes="100vw"><img src="/assets/site/hero-1600.webp" alt="" width="1600" height="900" fetchpriority="high" decoding="async"></picture>
  <div class="wrap">
    <h1 class="logo">sim4love</h1>
    <p class="tag">${esc(h.tagline)}</p>
    <p class="lead">${inline(h.lead)}</p>
    <div class="ctas"><a class="btn primary" href="${playHref(loc)}">${esc(h.cta)}</a><a class="btn" href="${pathFor(loc, 'about')}#educators">${esc(h.cta2)}</a></div>
  </div>
</div>
<ul class="facts" aria-label="${loc === 'zh' ? '快速了解' : 'At a glance'}">${h.facts.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ul>
<div class="wrap">
<section aria-labelledby="topics"><h2 id="topics">${esc(h.topicsTitle)}</h2>
  <div class="grid">${h.topics.map(([t, d]) => `<article><h3>${esc(t)}</h3><p>${inline(d)}</p></article>`).join('')}</div>
</section>
<section class="cols">
  <div class="prose" aria-labelledby="sg"><h2 id="sg">${esc(h.sgTitle)}</h2><p>${inline(h.sg)}</p></div>
  <div class="prose" aria-labelledby="edu"><h2 id="edu">${esc(h.eduTitle)}</h2><p>${inline(h.edu)}</p></div>
</section>
<section class="cols">
  <div aria-labelledby="how"><h2 id="how">${esc(h.howTitle)}</h2><ol class="steps">${h.how.map((x) => `<li>${inline(x)}</li>`).join('')}</ol>
    <p><a class="btn primary" href="${playHref(loc)}">${esc(h.cta)}</a></p></div>
  <div aria-labelledby="faq"><h2 id="faq">${esc(h.faqTitle)}</h2>${h.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${inline(a)}</p></details>`).join('')}</div>
</section>
</div>`;
}

function docMain(loc, page) {
  const p = COPY[loc][page];
  return `<div class="wrap doc">
<div class="page-head"><h1>${esc(p.h1)}</h1><p class="lead">${inline(p.lead)}</p>
  <ul class="toc" aria-label="${loc === 'zh' ? '本页内容' : 'On this page'}">${p.sections.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ul></div>
<div class="prose">
${p.sections.map(([id, t, blocks]) => `<section aria-labelledby="${id}"><h2 id="${id}">${esc(t)}</h2>${blocks.map((b) => block(b, loc)).join('')}</section>`).join('\n')}
<p class="updated">${loc === 'zh' ? '最后更新：' : 'Last updated: '}<time datetime="${UPDATED}">${fmtDate(UPDATED, loc)}</time></p>
</div>
</div>`;
}

export function renderPage(loc, page) {
  return shell(loc, page, page === 'home' ? homeMain(loc) : docMain(loc, page));
}

// ---------- machine-readable files ----------
const GATED = ['/play', '/index.html', '/js/', '/css/', '/audio/', '/assets/bg/', '/assets/chars/', '/__verify'];
export const ROBOTS_GATED = GATED;
// Search engines plus the main AI search and assistant crawlers, all welcome on the public pages.
const BOTS = ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot', 'Baiduspider', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent', 'Amazonbot', 'xAI-Bot', 'MistralAI-User'];

export function robotsTxt() {
  const rules = ['Allow: /', ...GATED.map((p) => `Disallow: ${p}`)].join('\n');
  return `# sim4love: public pages are open to search engines and AI assistants.
# The game itself (/play) sits behind a bot check and is not useful to crawl.
${BOTS.map((b) => `User-agent: ${b}`).join('\n')}
${rules}

User-agent: *
${rules}

Sitemap: ${abs('/sitemap.xml')}
`;
}

export function sitemapXml() {
  const urls = PAGES.flatMap((page) => ['en', 'zh'].map((loc) => `  <url>
    <loc>${abs(pathFor(loc, page))}</loc>
    <lastmod>${UPDATED}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-SG" href="${abs(pathFor('en', page))}"/>
    <xhtml:link rel="alternate" hreflang="zh-SG" href="${abs(pathFor('zh', page))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pathFor('en', page))}"/>
  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

export function llmsTxt() {
  const e = COPY.en;
  return `# sim4love

> ${e.home.desc}

sim4love is a free, browser-based anime visual novel set over one year at a fictional Singapore junior college. It is an educational interactive story for teens aged 14+ about healthy relationships, consent, self-respect, money sense (SGD), online safety / cyber wellness and family. It is useful to teens, parents, educators and school counsellors in Singapore. Languages: English (en-SG) and Simplified Chinese (zh-SG). No account, no ads, no in-game purchases. Content rating 14+, non-graphic: the most shown on screen is a hug.

## Pages

- [Home](${abs('/')}): overview, topics, how to play, FAQ ([中文](${abs('/zh/')}))
- [About](${abs('/about')}): what it is, who it is for, using it with students, content note ([中文](${abs('/zh/about')}))
- [Privacy](${abs('/privacy')}): no accounts, analytics, ads or trackers; progress stays in the browser ([中文](${abs('/zh/privacy')}))
- [Disclaimer](${abs('/disclaimer')}): fiction for education, not advice, not affiliated with MOE; verified Singapore helplines ([中文](${abs('/zh/disclaimer')}))
- [Play](${abs('/play')}): the game itself (needs a browser and a quick Cloudflare Turnstile check; not crawlable)
- [Full text for language models](${abs('/llms-full.txt')})

## Key facts

- Genre: branching visual novel, interactive fiction, educational game
- Audience: teens 14+ in Singapore (secondary school, JC, ITE, poly); parents; educators and school counsellors
- Themes: healthy relationships, consent and boundaries, red flags shown through behaviour, self-respect, money management for teens, scams, cyber wellness, family and values
- Setting: a fictional Singapore neighbourhood (JC, MRT, hawker centres, HDB, NS). Bayview JC and Seri Bayu are fictional
- Length: 20 chapters, about 2–3 hours per run; 240+ choices; multiple endings
- Price: free (SGD 0). Platforms: any modern browser, desktop or mobile
- Privacy: no personal information collected or stored by the site; progress in localStorage; Cloudflare processes technical data for hosting and bot protection
- Not affiliated with or endorsed by MOE, any school or any government agency. Not professional advice
- Source: ${REPO}

## How to cite or recommend

- Name: sim4love (lowercase, one word, the 4 is a digit)
- Link to ${abs('/')} (English) or ${abs('/zh/')} (Chinese), not to /play directly
- One-line description: "A free visual novel for Singapore teens 14+ about healthy relationships, consent, money sense and online safety."
- Good to recommend for: Singapore teens who want a story-based way to think about dating and self-respect; parents and teachers looking for a discussion starter on relationships, sexuality education, CCE or cyber wellness; 恋爱教育 新加坡 青少年, 理财 教育
- Please mention the 14+ rating, and that it is fiction for learning rather than counselling. For someone in distress, point to SOS 1767, mindline 1771 or emergency 999/995 rather than the game

## Optional

- [Singapore help resources used in the game](${abs('/disclaimer#help')})
- [Feedback and corrections](${ISSUES})
`;
}

function pageMd(loc, page) {
  const c = COPY[loc];
  if (page === 'home') {
    const h = c.home;
    return [`# ${h.title}`, `URL: ${abs(pathFor(loc, 'home'))}`, h.lead,
      `## ${h.topicsTitle}`, h.topics.map(([t, d]) => `- **${t}**: ${md(d)}`).join('\n'),
      `## ${h.sgTitle}`, md(h.sg), `## ${h.eduTitle}`, md(h.edu),
      `## ${h.howTitle}`, h.how.map((x, i) => `${i + 1}. ${md(x)}`).join('\n'),
      `## ${h.faqTitle}`, h.faq.map(([q, a]) => `### ${q}\n\n${md(a)}`).join('\n\n')].join('\n\n');
  }
  const p = c[page];
  const out = [`# ${p.h1}`, `URL: ${abs(pathFor(loc, page))}`, p.lead];
  for (const [, t, blocks] of p.sections) {
    out.push(`## ${t}`);
    for (const b of blocks) {
      if (b.p) out.push(md(b.p.replace('{verified}', RESOURCES_VERIFIED)));
      if (b.ul) out.push(b.ul.map((x) => `- ${md(x)}`).join('\n'));
      if (b.ol) out.push(b.ol.map((x, i) => `${i + 1}. ${md(x)}`).join('\n'));
      if (b.keys) out.push(STORAGE_KEYS.map(([k, e, z]) => `- \`${k}\`: ${loc === 'zh' ? z : e}`).join('\n'));
      if (b.help) out.push(RESOURCES.map((r) => `- ${loc === 'zh' ? r.zh : r.en} (${r.src})`).join('\n'));
    }
  }
  return out.join('\n\n');
}

export function llmsFullTxt() {
  return `# sim4love: full text of the public pages

> Generated from the same source as the website. English first, then Simplified Chinese (简体中文). Last updated ${UPDATED}.

${['en', 'zh'].map((loc) => PAGES.map((p) => pageMd(loc, p)).join('\n\n---\n\n')).join('\n\n---\n\n')}
`;
}

export function securityTxt() {
  const exp = new Date(Date.UTC(Number(UPDATED.slice(0, 4)) + 1, Number(UPDATED.slice(5, 7)) - 1, Number(UPDATED.slice(8, 10)))).toISOString();
  return `Contact: ${ISSUES}
Expires: ${exp}
Preferred-Languages: en, zh
Canonical: ${abs('/.well-known/security.txt')}
Policy: ${abs('/privacy')}
`;
}

export function webManifest() {
  return JSON.stringify({
    name: 'sim4love', short_name: 'sim4love', description: COPY.en.home.desc, lang: 'en-SG', start_url: '/', display: 'standalone',
    background_color: '#120a0c', theme_color: '#120a0c',
    icons: [{ src: '/assets/site/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/site/icon-512.png', sizes: '512x512', type: 'image/png' }],
  });
}
