# sim4love — Architecture

Plain HTML + CSS + vanilla JS. **No build step, no framework, no dependencies at runtime** (only a Google Font).
Open `index.html` directly or serve the folder statically (GitHub Pages works as-is).

## 1. File layout

```
index.html                 Stage markup + script tags (load order matters, see §2)
css/style.css              All UI styling, CSS variables, light/dark, mobile breakpoints
js/
  sprites.js               Manifest of generated artwork (PNG/JPG) → overrides SVG placeholders
  art.js                   Art layer: CAST (names/colours), EXPR (expressions), SVG placeholder
                           characters + backgrounds; uses SPRITES when an image exists
  data/
    lessons.js             LESSONS  — Love Notebook cards (63). Single source of truth.
    achievements.js        ACHIEVEMENTS
    endings.js             ENDINGS
    resources.js           RESOURCES — safety/help cards for serious topics
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
| `{bg:'street', petals:true}` | Background (+ falling sakura) | no |
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
5. Set `status: 'done'`, run `node tests/validate.js` and `node tests/playthrough.js first`.

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
Required: `neutral happy blush shy sad angry surprised smug`. Optional: `scheme` (Rei), `cool` (Kaede/Rei/Mio).
Supporting cast to add to `Art.CAST` + sprites when their scenes are written: `kenta`, `kai`, `ogawa`, `goto`
(Mei and Mochi appear via phone / textbox face). Add them to `SPEAKERS` in `tests/validate.js` as well.

### 4.3 Generation rules (see `art-prompts.md`)
- Same seed + same base prompt per character, only change the expression clause → consistency.
- Waist-up, facing viewer, plain white background → background removal → transparent PNG, 2:3, character
  centred with the head in the top 40 %.
- Backgrounds: 16:9, no people, soft anime VN style, matching palette (pastel, warm light).
- Compress: PNG via `pngquant`, JPG quality ~80. Target < 400 KB per sprite, < 500 KB per background.

## 5. UI layers (z-order, bottom → top)
`#bg` → `#petals` → `#chars` → `#phone` → `#textbox` → `#topbar` → `#choices` → `#toasts` → `#modal` →
`#chapter-card` → `#title`.

## 6. Testing
- `node tests/validate.js` — validates ids/structure; prints per-chapter counts (choices, bad ends, TODO beats).
- `node tests/playthrough.js first|last|random` — needs Playwright + Chromium; plays the whole game and fails on
  any page error or if Chapter 10's ending is not reached. `--shots` saves results screenshots.
- Manual: test at 375×812 (phone) and 1280×720; light + dark mode.

## 7. Conventions
- Data files are pure data (no DOM). Engine is the only file touching the DOM besides `art.js` markup builders.
- IDs: lower camelCase for flags/lessons/achievements; chapter ids `ch1…ch10`; files `ch01…ch10.js`.
- Never put real people, brands or the reference game's characters/dialogue in scripts or art prompts.
- Teen-safe content only (GAME_DESIGN §3). Serious topics must include a `{resource:…}` card.
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
| Localisation | `t:` strings → `{ en: '…', zh: '…', ja: '…' }`; `fmt()` picks `S.lang` | engine `fmt`, chapter files |
| Backlog | keep last 100 lines in `S.log`; "Log" button | engine |
| Gallery / ending list | show `S.endings`, `S.achievements` from the title screen | engine title |
