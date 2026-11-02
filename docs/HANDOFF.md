# Handoff — what to build next

For the next developer/agent taking over (e.g. the Grok bot). Read in this order:
0. [CORE_VALUES.md](CORE_VALUES.md) — the moral spine; every line must pass its checklist
1. [GAME_DESIGN.md](GAME_DESIGN.md) — vision, cast, systems, endings
2. [CHAPTERS.md](CHAPTERS.md) — every chapter's interactions, options, lessons, bad ends
3. [ARCHITECTURE.md](ARCHITECTURE.md) — code layout and the script DSL
4. [MISTAKES.md](MISTAKES.md) — the educational catalog
4b. [VALUE_PROFILES.md](VALUE_PROFILES.md) — value axes, heroine/cast profiles, partner talks, variant pools, topic map
5. [art-prompts.md](art-prompts.md) — image generation

## Current state
| Area | Status |
|---|---|
| Engine (choices, lessons, bad ends + rewind, phone, routes, flags, achievements, endings, resources, chapter flow, save) | ✅ working |
| Chapter 1 | ✅ fully written |
| Chapters 2–10 | 🟡 **playable outlines**: all choices/fx/lessons/bad ends/route logic in place; story beats are `SIM.todo(...)` placeholders (67 total) |
| Lessons (63), resources, endings, achievements data | ✅ lessons final · ✅ resource cards rewritten with verified Singapore contacts (`en-SG`, 2026-11-02) · 🟡 endings/achievements text partly TODO |
| Art (Chapter 1) | ✅ Generated hand-drawn anime art in `assets/`: 5 heroines (3–7 expressions each, see `js/sprites.js`), Mochi (6 expressions), 8 backgrounds incl. `keyart` (title hero) and `badend`. Rendered via the `SPRITES` manifest; SVG fallback kept for anything missing. Ch2–10 locations still use SVG fallbacks |
| UI | ✅ Dark gilded theme (gold-framed panels, Cinzel / Marcellus / Lora, Titan One logo), self-hosted fonts in `assets/fonts/`, mobile-first. Background crossfade, expression crossfade, two-character layout (left/right, speaker in front, others dimmed), asset preloading |
| Tests | ✅ `tests/validate.js` · ✅ `tests/softlock.js` (static + seeded simulation; passes) · 🟡 `tests/playthrough.js` needs Playwright, not installed on the build box |
| Engine robustness | ✅ empty-choice guard (continues after the choice instead of freezing); ch08 resource card that sat after a bad end (unreachable) moved before it |
| **Design v2: 20 chapters** | 🟡 **designed, awaiting owner sign-off, not coded.** CHAPTERS.md, GAME_DESIGN.md, MISTAKES.md §4 and CORE_VALUES.md describe a 20-chapter, 5-part game (16+). The code still has the old 10 chapters (`js/chapters/ch01–ch10.js`); chapters 11–20 do not exist in code yet |

## Backlog (priority order)

### P0 — restructure to the 20-chapter design (after owner sign-off)
- [ ] Renumber chapter files to the new order (old→new: 1→1, 2→2, 3→3, 4→6 + 8, 5→9, 6→10, 7→11, 8→12, 9→14 + 15-5,
      10→15 + 20). Split old ch04 / ch09 / ch10 as shown in CHAPTERS.md; update `CHAPTER_ORDER` in `js/chapters/index.js`.
- [ ] Move the route lock from the end of old Ch4 to the end of new Ch8 (8-4 solo choice); update route-dependent code.
- [ ] Create new chapter files for Ch4, Ch5, Ch7, **Ch13 Health Class**, Ch16, Ch17, Ch18 The Long Talk, Ch19 (and the new beats in 2, 6, 8, 9, 12, 14, 15, 20).
- [ ] **Your Life system**: `life.goal`, `life.passion`, `life.health`, `life.wallet` — HUD meters, save data, fx keys;
      add them to the stat whitelist in `tests/validate.js`. Passion chosen in 2-7 (`flags.passion`).
- [ ] **Rose Filter** (`stats.proj`): soft-focus sprite effect; grey out one healthy option above 60; ending penalty.
- [ ] **Free evenings** mini-choice per chapter with diminishing returns on partner time.
- [ ] **Wallet**: real ¥ balance, labelled costs on spending options, debt state.
- [ ] Ending evaluation with the new weights (Life 40 / integrity 35 / trust 25); new endings `own_story`, `side_character`;
      Your Life thresholds on `true_*` and `solo_growth` (GAME_DESIGN §7).
- [ ] 55 new lessons, bad ends #19–#28, new resource cards (`sexhealth`, `grooming`, `consent`, `alcohol`, `debt`) — MISTAKES §4.
- [ ] **Value profiles** `js/data/values.js` (12 axes per character) and `S.values` / `S.seenVariants` / `S.poolVisits` / `S.seed` in the save (ARCHITECTURE §9).
- [ ] **Partner talks** `js/data/talks.js` + `{talk:'topic'}` command; one per chapter (VALUE_PROFILES §5, CHAPTERS final table).
- [ ] **Variant system** `js/data/variants/<loc>.js` + `{variant:'loc.slot'}`; deterministic selection; generic fallback required.
- [ ] Extend `validate.js`: every choice has an ungated option; every `variant`/`talk` reference resolves; every pool has a fallback.
- [ ] Run `node tests/validate.js && node tests/softlock.js` in CI (GitHub Actions) on every push.
- [ ] Install Playwright + Chromium on the build box and run `tests/playthrough.js` for every route.
- [ ] New cast in `Art.CAST`: `takumi`, `ren`, `saki`, `nana`; Dr. Mochi (glasses) variant.
- [ ] New backgrounds and supporting-cast sprites per the per-chapter art table at the end of CHAPTERS.md and VALUE_PROFILES §8 (incl. classroom, rooftop, health room/clinic, school nurse).
- [ ] **Before release:** have a qualified sex educator / health professional review every Ch12, Ch13 and Ch18 fact card and all
      resource cards. **Re-verify every Singapore contact** (number, hours, still operating) and update `VERIFIED` in `js/data/resources.js`.

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
- [ ] **i18n framework** (ARCHITECTURE §10): `js/i18n/<locale>.js` string tables, `fmt()` lookup with fallback, locale switch on the title screen
      (`localStorage['sim4love.locale']`), CJK font fallback, `tests/i18n.js` coverage report. Move this to P1 once Ch1–4 text is final.
- [ ] **Chinese (`zh-SG`)**: translate UI + Ch1 first; Chinese resource card texts with the same verified Singapore contacts
      (consider Care Corner Mandarin counselling 1800 3535 800 after verifying it).
- [ ] Multiple save slots, backlog/log.
- [x] Publish: Cloudflare Workers static assets (`wrangler.jsonc`, `npx wrangler deploy`). Live: https://sim4love.jstdlee.workers.dev
- [ ] Screenshot script for visual review lives outside the repo; consider adding `tests/screenshots.js`.

## Rules (do not break)
1. **Original content only.** The reference game (完蛋！我被美女包围了！) is for design patterns. Never copy its characters, plot, dialogue or images.
2. **16+, non-explicit.** No nudity or sexual description; intimacy cuts away; **visuals at most a hug**. High-school chapters: kiss only with an "ask".
   Sexual-health education sits in high school at a school sex-education level (Ch12, **Ch13 Health Class**: nobody has sex,
   facts via nurse/peer educator/Dr. Mochi) and adult-relationship topics in Ch18 (18+). Factual and reviewed.
   **Red flags are behaviours and risks, never orientations**; never present homosexuality as abnormal.
   Serious topics end with a `{resource:…}` card with verified Singapore contacts.
3. **Behaviours, not genders.** Never write a line that frames women in general as scammers/gold-diggers. Bad ends mock the *player's* mistake.
   De-idealise without contempt: no objectifying lines, no comparing women to sex workers, no worship (CORE_VALUES §2).
4. The healthy (✅) option must always be the best overall outcome — and the most romantic.
5. Your Life (goals, passion, health, money) must never be the price of the healthy option.
6. Run `node tests/validate.js` **and `node tests/softlock.js`** (and ideally `node tests/playthrough.js first`) before every commit.
7. **Every node has an exit.** Every choice keeps one ungated option; bad ends only inside options; every variant pool has a generic fallback.
8. **No live AI** at runtime. All lines are authored; the engine only selects variants.
