# Handoff — what to build next

For the next developer/agent taking over (e.g. the Grok bot). Read in this order:
1. [GAME_DESIGN.md](GAME_DESIGN.md) — vision, cast, systems, endings
2. [CHAPTERS.md](CHAPTERS.md) — every chapter's interactions, options, lessons, bad ends
3. [ARCHITECTURE.md](ARCHITECTURE.md) — code layout and the script DSL
4. [MISTAKES.md](MISTAKES.md) — the educational catalog
5. [art-prompts.md](art-prompts.md) — image generation

## Current state
| Area | Status |
|---|---|
| Engine (choices, lessons, bad ends + rewind, phone, routes, flags, achievements, endings, resources, chapter flow, save) | ✅ working |
| Chapter 1 | ✅ fully written |
| Chapters 2–10 | 🟡 **playable outlines**: all choices/fx/lessons/bad ends/route logic in place; story beats are `SIM.todo(...)` placeholders (67 total) |
| Lessons (63), resources, endings, achievements data | ✅ lessons final · 🟡 endings/achievements text partly TODO |
| Art (Chapter 1) | ✅ Generated hand-drawn anime art in `assets/`: 5 heroines (3–7 expressions each, see `js/sprites.js`), Mochi (6 expressions), 8 backgrounds incl. `keyart` (title hero) and `badend`. Rendered via the `SPRITES` manifest; SVG fallback kept for anything missing. Ch2–10 locations still use SVG fallbacks |
| UI | ✅ Dark gilded theme (gold-framed panels, Cinzel / Marcellus / Lora, Titan One logo), self-hosted fonts in `assets/fonts/`, mobile-first. Background crossfade, expression crossfade, two-character layout (left/right, speaker in front, others dimmed), asset preloading |
| Tests | ✅ `tests/validate.js`, `tests/playthrough.js` |

## Backlog (priority order)

### P0 — content
- [ ] **Write Ch2–Ch4 dialogue** (replace every `SIM.todo` with beats; match Ch1's voice). Set `status:'done'`.
- [ ] Add supporting cast to `Art.CAST` (`kenta`, `kai`, `ogawa`, `goto`) with placeholder SVG or sprites, and use them as speakers.
- [ ] **Write Ch5–Ch8** using `'@route'` + `{her}`; add per-route flavour blocks (`SIM.isRoute`) for the variants listed in CHAPTERS.md.
- [ ] **Write Ch9–Ch10** + epilogue text per ending and per route (`ENDINGS[id].byRoute`, then render it in `showEnding`).

### P0 — art
- [x] Chapter 1 sprites (5 heroines + Mochi) and 6 base backgrounds + key art + bad-end background, registered in `js/sprites.js`.
- [ ] Missing expressions (engine falls back to `neutral`): e.g. kaede sad/angry/blush, yuna sad/blush/angry, rei sad/angry. Yuna's sprite sits lower in its frame than the others (petite framing) — fine alone, re-crop if she shares a scene.
- [ ] Supporting cast sprites (neutral/happy/angry) per `art-prompts.md`.
- [ ] New locations: amusement park, karaoke room, café, festival stage, fireworks night, beach, train station, graduation.
      Add their ids to `BGS` in `tests/validate.js` and to `Art.background` fallback list.

### P1 — systems (designs in ARCHITECTURE §8)
- [ ] Timed choices (Ch1 1-4 and Ch7 7-4 are good candidates).
- [ ] Phone reply choices *inside* the phone UI (style choices as chat bubbles when `S.view.phone` is open).
- [ ] Red-Flag Radar for Part I (Rei, Alpha Kai, "Airi" lines).
- [ ] Route map / flowchart with jump-back.
- [ ] Gallery: endings + achievements on the title screen; remaining achievements from GAME_DESIGN §7.
- [ ] BGM/SFX.

### P2 — polish
- [ ] Localisation (中文 / 日本語).
- [ ] Multiple save slots, backlog/log.
- [x] Publish: Cloudflare Workers static assets (`wrangler.jsonc`, `npx wrangler deploy`).
- [ ] Screenshot script for visual review lives outside the repo; consider adding `tests/screenshots.js`.

## Rules (do not break)
1. **Original content only.** The reference game (完蛋！我被美女包围了！) is for design patterns. Never copy its characters, plot, dialogue or images.
2. **Teen-safe.** No sexual content. Kiss only with an "ask". Serious topics end with `{resource:…}`.
3. **Behaviours, not genders.** Never write a line that frames women in general as scammers/gold-diggers. Bad ends mock the *player's* mistake.
4. The healthy (✅) option must always be the best overall outcome — and the most romantic.
5. Run `node tests/validate.js` (and ideally `node tests/playthrough.js first`) before every commit.
