# sim4love — Architecture

Plain HTML + CSS + vanilla JS. **No build step, no framework, no dependencies at runtime** (fonts are self-hosted in `assets/fonts/`, OFL).
Open `index.html` directly or serve the folder statically (GitHub Pages works as-is).

## 1. File layout

```
index.html                 Stage markup + script tags (load order matters, see §2)
css/style.css              All UI styling (dark gilded theme), CSS variables, @font-face, mobile breakpoints
js/
  sprites.js               Manifest of generated artwork (PNG/JPG) → overrides SVG placeholders
  art.js                   Art layer: CAST (names/colours), EXPR (expressions), SVG placeholder
                           characters + backgrounds; uses SPRITES when an image exists
  data/
    lessons.js             LESSONS  — Love Notebook cards (63). Single source of truth.
    achievements.js        ACHIEVEMENTS
    endings.js             ENDINGS
    resources.js           RESOURCES — help cards; Singapore contacts (RESOURCE_CONTACTS, verified date + source URL),
                           RESOURCES_BY_LOCALE, locale fallback chain (§10)
    values.js              (planned) VALUES — value profile per character + player stance axes (§9)
    talks.js               (planned) TALKS — partner-talk definitions per topic (§9)
    variants/<loc>.js      (planned) VARIANTS — line pools per location × slot (§9)
    think.js               (planned) THINK — Think Deeper cards per topic (§9.5, GAME_DESIGN §6.2)
  i18n/                    <locale>.js UI packs; zh-SG.text.js = generated story/data table (§10)
  chapters/
    index.js               CHAPTERS registry, CHAPTER_ORDER, SIM helpers (todo, love, split, …)
    ch01.js … ch10.js      One file per chapter: { id, title, subtitle, next, status, script: [...] }
  engine.js                VN engine: compiler, state, renderer, input, save/load, modals
assets/
  chars/<id>_<expr>.png    Character sprites (transparent PNG, 2:3, ~1200×1800)
  bg/<scene>.jpg           Backgrounds (16:9, ~1920×1080)
design/character-sheets.html   Art-style exploration (A–D)
docs/                      Design docs (this folder)
tests/
  validate.js              Static checks of all scripts (node, no browser) — run before every commit
  softlock.js              Softlock checker: static choice rules + seeded simulation of every option (node, no browser)
  playthrough.js           Headless Playwright playthrough of all chapters (first|last|random)
```

## 2. Runtime model

```
 ┌──────────── data (pure, no DOM) ─────────────┐
 │ CAST/EXPR (art.js)  LESSONS  ACHIEVEMENTS    │
 │ ENDINGS  RESOURCES  CHAPTERS + CHAPTER_ORDER │
 └───────────────────────┬──────────────────────┘
                         │ compile(script) → flat program (array of commands + jumps)
                         ▼
 ┌──────────── engine.js ───────────────────────┐
 │ State S (serialisable JSON)                   │
 │   chapter, pc, name, route, stats{}, flags{},  │
 │   lessons[], badEnds[], achievements[],        │
 │   endings[], view{bg,petals,chars,phone,msgs}  │
 │ step(): run commands until one needs input     │
 │ Renderers: bg · chars · textbox · phone · HUD  │
 │ Modals: choice · lesson · bad end · ending ·   │
 │         resource · results · notebook          │
 │ save(): localStorage after each advance        │
 └───────────────────────────────────────────────┘
```

- **Load order:** `sprites → art → data/* → chapters/index → chapters/chXX → engine`. Chapter files only *register*
  data; the engine starts on `DOMContentLoaded`.
- **Compilation:** nested `then`/`else` blocks are flattened into one array with jump instructions. Because of this,
  the whole game state is just `{chapter, pc, …}` → trivially saveable, and rewind = restore a snapshot.
- **Checkpoints:** a snapshot of `S` is taken at every choice. Bad end → "rewind" restores it (lessons/bad-ends kept).
- **Functions in scripts** (`if:` predicates) are fine: they live in the program, not in the save.
- ⚠️ Changing a chapter's script changes `pc` positions, so old saves *inside that chapter* may resume at a slightly
  different line. Saves store the chapter id; bump `SAVE_KEY` in engine.js when a chapter is restructured heavily.

## 3. Script DSL (chapter files)

One object per step. Full list (also documented at the top of `engine.js`):

| Command | Effect | Waits for click? |
|---|---|---|
| `{bg:'street', petals:true}` | Background (+ falling petals; to become tropical frangipani / rain-tree blossoms, HANDOFF) | no |
| `{show:'hina', e:'happy', at:'left'}` | Show/move character (`left`/`center`/`right`) | no |
| `{hide:'hina'}` / `{hide:'*'}` | Hide one / all | no |
| `{n:'…'}` | Narration (italic) | yes |
| `{s:'hina', e:'blush', t:'…'}` | Character line; auto-shows & sets expression | yes |
| `{me:'…'}` / `{think:'…'}` | Player line / inner thought | yes |
| `{mochi:'…', e:'smug'}` | Mascot line | yes |
| `{phone:'Contact name'}` · `{txt:'kaede'\|'me'\|'sys', t:'…'}` · `{phoneOff:true}` | Phone chat overlay | `txt` yes |
| `{choice:'prompt', opts:[…]}` | Interaction (see below) | yes |
| `{if: s => bool, then:[…], else:[…]}` | Branch | no |
| `{flag:'x'}` / `{flag:{x:true}}` | Set flags | no |
| `{fx:{self:5}}` | Stat change with toasts | no |
| `{route:'hina'\|'mio'\|'kaede'\|'yuna'\|'solo'}` | Route lock; trust starts at 20 | no |
| `{ach:'id'}` | Achievement toast | no |
| `{ending:'id'}` | Ending card (recorded in `S.endings`) | yes |
| `{resource:'id'}` | Safety/help card | yes |
| `{badEnd:{title, text}}` | Bad-end screen + rewind to the last choice | yes |
| `{chapterEnd:true}` | Results screen + "Next chapter" button. **Must be the last command** | yes |

**Choice option fields:** `t` (text, required) · `fx` (stats) · `lesson` (id → lesson card) · `flag` · `ach` ·
`if` (predicate: option only visible when true) · `then` (nested commands; may contain further choices).

**Placeholders:** `{name}` → player name, `{her}` → route heroine's name. **Speaker `'@route'`** = route heroine
(use in Part II so one script serves all routes).

**Helpers** (`js/chapters/index.js`): `SIM.todo(text)` placeholder narration · `SIM.love(k, n)` predicate ·
`SIM.isRoute(r)` · `SIM.inRelationship` · `SIM.split(relationshipBeats, soloBeats)`.

### 3.1 Writing a chapter (outline → done)
1. Open `docs/CHAPTERS.md` for the chapter's design table.
2. In `js/chapters/chXX.js`, replace each `SIM.todo(...)` with real beats (`n`, `s`, `me`, `think`, `mochi`, `phone`/`txt`).
3. Keep choice options, `fx`, `lesson`, bad ends as designed (tune numbers if needed; ✅ must stay best overall).
4. Part II/III: use `'@route'` and `{her}`; add route-specific flavour with `{ if: SIM.isRoute('kaede'), then: [...] }`.
5. Set `status: 'done'`, run `node tests/validate.js`, `node tests/softlock.js` and `node tests/playthrough.js first`.

### 3.2 Stat & tuning rules
- Connection per scene: ✅ +8…+15 · ⚠️ −3…+5 · ❌ −8…−15 · catastrophic −20…−40.
- Love IQ/Self: ✅ +5…+15, ❌ −5…−20. Trust (Part II): ✅ +5…+15, ❌ −10…−30 (lies/snooping hit hardest).
- Route-lock thresholds (Ch4): confession option ≥ 30, "yes" ≥ 40. Ending thresholds: GAME_DESIGN §7 / ch10.js.

## 4. Art pipeline

### 4.1 Placeholder → generated art
`js/sprites.js`:
```js
window.SPRITES = {
  chars: { hina: { neutral: 'assets/chars/hina_neutral.png', happy: 'assets/chars/hina_happy.png', /* … */ } },
  bg:    { street: 'assets/bg/street.jpg' /* … */ },
};
```
Missing expressions fall back to that character's `neutral` image; missing characters/backgrounds fall back to SVG.

### 4.2 Expression set (per heroine)
Required: `neutral happy blush shy sad angry surprised smug`. Optional: `scheme` (Rae), `cool` (Kavya/Rae/Xin Yi).
Supporting cast to add to `Art.CAST` + sprites when their scenes are written: `kenta`, `kai`, `ogawa`, `goto`
(Mei and Mochi appear via phone / textbox face). Add them to `SPEAKERS` in `tests/validate.js` as well.

### 4.3 Generation rules (see `art-prompts.md`)
- Same seed + same base prompt per character, only change the expression clause → consistency.
- Waist-up, facing viewer, plain white background → background removal → transparent PNG, 2:3, character
  centred with the head in the top 40 %.
- Backgrounds: 16:9, no people, soft anime VN style, matching palette (warm light, hand-drawn anime look of `assets/bg/keyart.jpg`).
- Compress: PNG via `pngquant`, JPG quality ~80. Target < 400 KB per sprite, < 500 KB per background.

## 5. UI layers (z-order, bottom → top)
`#bg` → `#petals` → `#chars` → `#phone` → `#textbox` → `#topbar` → `#choices` → `#toasts` → `#modal` →
`#chapter-card` → `#title`.

## 6. Testing
- `node tests/validate.js` — validates ids/structure; prints per-chapter counts (choices, bad ends, TODO beats).
- `node tests/softlock.js [--runs N] [--seed S]` — proves the story can always move forward (§9.4). Deterministic
  (default seed 20261102). Run before every commit, together with validate.js; both should run in CI.
- `node tests/playthrough.js first|last|random` — needs Playwright + Chromium installed (`npm i -D playwright &&
  npx playwright install chromium`); plays the whole game and fails on
  any page error or if Chapter 10's ending is not reached. `--shots` saves results screenshots.
- Manual: test at 375×812 (phone) and 1280×720.

## 7. Conventions
- Data files are pure data (no DOM). Engine is the only file touching the DOM besides `art.js` markup builders.
- IDs: lower camelCase for flags/lessons/achievements; chapter ids `ch1…ch10`; files `ch01…ch10.js`.
- Never put real people, brands or the reference game's characters/dialogue in scripts or art prompts.
- Rated 14+ (in-game age confirmation, see "Age confirmation" below), content limits in GAME_DESIGN §3: non-explicit, attitude and education focus, **visuals at most a hug**;
  sexual-health facts only in Ch12–13 (high-school level) and Ch18 (adult); risks and red flags are framed by
  behaviour, never by gender or orientation. Serious topics must include a `{resource:…}` card.
- No live AI. Every line is authored; the engine only *selects* among authored variants (§9).
- Keep lines short (≤ ~160 chars) so the textbox never scrolls on phones.

## 8. Planned extensions (designed, not yet built)
| Feature | Design | Where |
|---|---|---|
| Timed choices | `choice.timer: seconds`, `choice.timeoutOpt: index`; progress bar in `#choices`; timeout picks that option | engine `showChoice` |
| Red-Flag Radar | per-line `flag:'lovebomb'` on `s`/`txt` commands; 🚩 button in textbox; correct tap → Love IQ + lesson | engine `setBox` + UI button |
| Route map | derive choice nodes from compiled program; store visited options in `S.visited`; modal flowchart with jump-back | new `js/routemap.js` |
| Multiple save slots | `SAVE_KEY + slot`, save menu with thumbnails | engine save/load |
| Chapter gate | before Ch5: if `wisdom + self < 0`, insert a Mochi "remedial lesson" scene | `ch05.js` start |
| Audio | `{bgm:'id'}`, `{sfx:'id'}` commands, `assets/audio/`, mute toggle | engine + data/audio.js |
| Localisation | see §10 (string tables per locale, resources per locale, locale switch) | `js/i18n/`, engine `fmt` |
| Value profiles, partner talks, variants | see §9 | `js/data/values.js`, `talks.js`, `variants/` |
| Backlog | keep last 100 lines in `S.log`; "Log" button | engine |
| Gallery / ending list | show `S.endings`, `S.achievements` from the title screen | engine title |

## 9. Value profiles, variants and robustness

Full design: [VALUE_PROFILES.md](VALUE_PROFILES.md). This section is the engine contract.

### 9.1 No live AI
All dialogue is authored and reviewed. A runtime language model is deliberately **not** used: it could produce unsafe
or explicit text, inaccurate health facts or off-tone lines in an educational 14+ game, needs a network and a paid
API, and makes behaviour untestable. Variety comes from authored pools selected deterministically. AI may be used
offline by writers to *draft* variants, which are then reviewed, committed and validated like any other line.

### 9.2 Data
- `VALUES[charId] = { spend, gifts, family, career, children, childEdu, learning, friends, lending, conflict,
  honesty, promises, home }`, each −2..+2 (axes in VALUE_PROFILES §2). Integrity axes (`honesty`, `promises`) have a floor:
  invalid sides belong only to cast written as wrong (Alpha Kai, Mr. G, scammers).
- Player state: `S.values[axis]` (the stance the player has expressed), `S.seenVariants` (set of variant ids),
  `S.poolVisits[poolId]` (counter), `S.seed` (set once at new game). All serialised with the save.
- `TALKS[topic] = { axis, kind:'preference'|'integrity', lines:{ default, <charId>… }, opts:[share, ask, cave,
  contempt, avoid, dealbreaker?] }`.
- `VARIANTS['<loc>.<slot>'] = [ { id, who?, ch?, when?(S), lines:[…] }, … ]` — at least one entry with no
  `who/ch/when` (the generic fallback; the validator fails without it).

### 9.3 Commands and selection
- `{variant:'cafe.arrive'}` → choose one entry and splice its `lines` in; `{talk:'children'}` → expand the talk
  template for the route heroine (or Haziq on solo) into a normal `choice`.
- Selection (pure function of state, so a rewind replays the same line): filter by `who` (route heroine / on-screen
  cast), `ch`, `when(S)` → prefer entries not in `S.seenVariants` → score (who 4, ch 2, each matching value condition
  2, each flag/stat condition 1) → among the top score pick index `hash(S.seed, poolId, S.poolVisits[poolId]) % n` →
  if nothing survives, the generic fallback. Record the id in `S.seenVariants`; increment `S.poolVisits`.
- Compilation happens at chapter load; variant expansion happens at run time but only ever inserts `s`/`txt`/`fx`
  commands (never `choice`, `badEnd` or `chapterEnd`), so the compiled control flow and checkpoints are unchanged.

### 9.5 Think Deeper cards
- `THINK[topic] = { mentor:'farah'|'ogawa'|'mei'|'mochi', hook, lenses:[{ kind:'structural'|'personal'|'cultural',
  text }] (2–3), sg:[context lines with optional src], question }` in `js/data/think.js`. Topics: `consumption`,
  `genderwar`, `careerpressure`, `nstiming`, `eldercare`, `children`, `marriagecost` (CHAPTERS final table).
- Script: `{deeper:'genderwar'}` placed right after a `{talk:…}`. It renders an **optional** prompt ("🔍 Think deeper?
  / Not now"); "Not now" is always visible, so it can never block. Reading it adds the topic to `S.reflections`
  (saved) and gives 🧠 Love IQ +2 the first time only. No choice inside a card is graded; no `badEnd`, no stat loss.
- The command is `deeper`, not `think`: `{think:'…'}` already means the player's inner thought.
- The Notebook gets a "Think Deeper" tab listing read cards. validate.js checks every referenced topic exists and has
  2–3 lenses including one structural and one personal lens.

### 9.4 Robustness: every node has an exit
| Rule | Enforced by |
|---|---|
| Every `choice` has at least one option without `if` (the fallback that is always visible) | `tests/softlock.js` static pass; `validate.js` (planned) |
| A `badEnd` appears only inside a choice option and nothing follows it in that block | softlock.js static pass |
| `{chapterEnd:true}` is the last top-level command of every chapter | softlock.js, validate.js |
| If all options are hidden at run time anyway, the engine logs a warning and continues after the choice (`c.after`) instead of freezing | `engine.js` `showChoice` guard |
| Every variant pool has a generic fallback; every `variant`/`talk` reference resolves | validate.js (planned, with the variant system) |
| The talk template always renders the share/ask option, whatever the heroine's profile | `talks.js` schema + validate.js |
| Every option of every choice can reach `chapterEnd` from many random states; no choice where every visible option is a bad end; no step-budget overrun (loops); full random playthroughs reach an ending | softlock.js simulation (current: 174 options, 8,523 chapter simulations, 120/120 full playthroughs) |

The simulator in softlock.js mirrors `compile()`/`step()`; any engine change to control flow must be mirrored there.

## 10. Internationalisation (i18n)

Default locale **`en-SG`** (English text, Singapore help cards). Chinese (`zh-SG`) is the first planned translation.

- **String tables per locale.** English source text stays in the chapter files and is the key (gettext style), with
  the chapter id as context: `I18N['zh-SG'].story['ch3']['Seen at 2:14 AM'] = '<Chinese translation>'`. UI strings
  (buttons, menus, stat names, notebook headings) live in a separate `ui` table keyed by id. Lessons, achievements
  and endings are keyed by their ids. Packs: `js/i18n/<locale>.js`, loaded after the data files.
- **Lookup.** `fmt(text, ctx)` → `I18N[locale].story[ctx][text]` → fallback chain → the English source. Interpolation
  (`{name}`) runs after lookup. Missing strings never break play.
- **Resources per locale.** `RESOURCES_BY_LOCALE[locale][cardId] = { title, lines, contacts:[ids] }`; contacts are
  shared records (`RESOURCE_CONTACTS`) with `name, how, hours, src` and a `VERIFIED` date. Fallback chain
  `RESOURCE_LOCALE_FALLBACK`: `zh-SG → en-SG → en`. A help card must show real, verified contacts for its region; a
  locale for another country needs its own contact list, not a translation.
- **Locale switch.** Title-screen and settings menu; stored in `localStorage['sim4love.locale']` (a setting, not part
  of the save, so saves are portable between languages). Default from `navigator.language` if a pack exists, else
  `en-SG`. Switching re-renders the current line.
- **Display names.** Character ids are stable code keys (`hina`, `mio`, `kaede`, `yuna`, `rei`, `kenta`, `ogawa`,
  `goto`, `takumi`, `ren`, `saki`, `nana`, plus new `farah`, `nurse`, `joy`). Shown names come from
  `I18N[locale].names[id] = { short, full }` (en-SG: `hina` → Hanis / Nur Hanis, `mio` → Xin Yi / Lim Xin Yi, `kaede`
  → Kavya / Kavya Pillai, `yuna` → Elise / Elise de Souza, `rei` → Rae / Rae Koh, `kenta` → Haziq, `ogawa` → Uncle
  Ong, `goto` → Mr. G, `takumi` → Marcus, `ren` → Ryan, `saki` → Sam, `nana` → Natalie; GAME_DESIGN §4). Script
  text uses `{n:hina}` / `{full:hina}` tokens instead of literal names; phone contact labels use the same table.
  Saves store ids only, so a rename never breaks a save.
- **Fonts and layout.** CJK fallback in the font stack (self-hosted Noto Sans SC subset, OFL); line-length budget is
  per locale (≈ 60 CJK characters per textbox line).
- **As built (2026-11).** Story and data text use one flat table per locale, `I18N[loc].text[english] = translation`
  (the per-chapter `story[ctx]` table is still consulted first, for the rare line that needs a context-specific
  translation). Sources: `i18n/zh-SG/<group>.js` (not deployed), bundled by `tools/i18n-pack.js` into
  `js/i18n/zh-SG.text.js`, which `index.html` only loads when the game starts in Chinese. Help cards are translated
  in place (same contacts and numbers). Extraction: `tools/i18n-extract.js`.
- **Coverage test.** `tests/validate.js` fails if any ready locale misses a UI key, a name, or any extracted string, or
  if placeholders (`{name}`, `{her}`, `{n:id}`, …) or line breaks differ from the English. `tests/playthrough.js --lang=zh`
  flags English left on screen.

## Hosting and the Turnstile gate

- **Worker.** `src/worker.js` runs before every asset (`assets.run_worker_first: true`, binding `ASSETS`). Requests
  with a valid pass cookie get the static asset unchanged (`Cache-Control: private, no-cache`). Without one,
  navigations get a small gate page rendered by the Worker (not in the asset tree) and everything else gets `403`.
  Only `/assets/fonts/*` and `/assets/site/*` are public, so the gate and the site can use the typefaces and icons.
- **Public site.** The Worker renders a no-JS site from `src/site.js` + `src/site-content.js` (EN and zh-SG):
  `/`, `/about`, `/privacy`, `/disclaimer` and `/zh/…`, plus `robots.txt`, `sitemap.xml`, `llms.txt`,
  `llms-full.txt`, `/.well-known/security.txt`, `site.webmanifest` and `favicon.ico`. Pages carry canonical,
  hreflang (en-SG, zh-SG, x-default), OG/Twitter tags and JSON-LD (Organization, WebSite, WebPage, plus VideoGame
  and FAQPage on the home page). The help list comes from `src/site-resources.js`, generated from
  `js/data/resources.js` by `tools/build-site-data.js` (`--check` fails when stale).
- **Game path.** The game lives at gated `/play` (served from the `/` asset). `/index.html` 301-redirects to
  `/play`, the gate's default `next` is `/play`, and gated responses carry `X-Robots-Tag: noindex`.
- **Verify.** The gate embeds a managed Turnstile widget (action `enter`) that auto-submits to `POST /__verify`.
  The Worker calls siteverify server-side (token 1–2048 chars, 10 s timeout, `remoteip` from `CF-Connecting-IP`,
  fail closed) and requires `success`, `action === 'enter'` and a hostname in `TURNSTILE_HOSTNAMES`. On success it
  sets `s4l_pass=<expiry>.<HMAC-SHA256(expiry)>` (HttpOnly, Secure, SameSite=Lax, Path=/, 7 days) and 303-redirects
  to the requested same-origin path. Bad, tampered or expired cookies show the gate again.
- **Config.** `wrangler.jsonc` vars: `TURNSTILE_SITEKEY` (public, widget `sim4love` for
  `sim4love.jstdlee.workers.dev`, `localhost`, `127.0.0.1`) and `TURNSTILE_HOSTNAMES` (production host only).
  Secrets: `TURNSTILE_SECRET`, `COOKIE_KEY` (`wrangler secret put`, value via stdin). Rotating `COOKIE_KEY`
  logs everyone out once.
- **Local dev.** `npx wrangler dev` reads `.dev.vars` (git- and asset-ignored) with Turnstile's test keys:
  `TURNSTILE_SITEKEY=1x00000000000000000000AA`, `TURNSTILE_SECRET=1x0000000000000000000000000000000AA`,
  `TURNSTILE_HOSTNAMES=example.com`, `TURNSTILE_ALLOW_TEST_KEYS=1`, and any random `COOKIE_KEY`. Test-key results
  carry no action, so they are accepted only when `TURNSTILE_ALLOW_TEST_KEYS=1` (never set in production).
  `tests/playthrough.js --url=http://127.0.0.1:8787/play` passes the gate and fails on any 4xx from the game origin.
  Opening `index.html` directly or via a static server still works without the gate.

## Age confirmation

- Client side, after the Turnstile gate: `ageGate()` in `js/engine.js` shows a modal (`#modal.age`) over the title
  screen on first visit ("Are you 14 or older?", strings `age.*` in `js/i18n/`). It cannot be dismissed with Esc or
  the backdrop; the title screen is `inert` while it is open; the language picker is offered inside the prompt.
- **Yes** stores `localStorage['sim4love.age14'] = '1'` (never asked again on that device).
- **No** stores `sessionStorage['sim4love.age14.no'] = '1'`, stops music (`Music.stop()`), removes `#game`, shows a
  calm full-screen `#age-exit` message and tries `window.close()`. Reloading in the same session shows the exit
  screen again; a fresh session asks again. This is a self-declaration, not age verification.
- `tests/playthrough.js` checks the prompt (including Esc), "yes" persistence, and the "no" exit screen in a
  separate browser context.
