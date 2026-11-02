# Handoff — what to build next

For the next developer/agent taking over (e.g. the Grok bot). Read in this order:
0. [CORE_VALUES.md](CORE_VALUES.md) — the moral spine; every line must pass its checklist
1. [GAME_DESIGN.md](GAME_DESIGN.md) — vision, cast, systems, endings
2. [CHAPTERS.md](CHAPTERS.md) — every chapter's interactions, options, lessons, bad ends
3. [ARCHITECTURE.md](ARCHITECTURE.md) — code layout and the script DSL
4. [MISTAKES.md](MISTAKES.md) — the educational catalog
4b. [VALUE_PROFILES.md](VALUE_PROFILES.md) — value axes, heroine/cast profiles, partner talks, variant pools, topic map
5. [art-prompts.md](art-prompts.md) — image generation

## Current state (2026-11-02): finished game

| Area | Status |
|---|---|
| Story | ✅ All 20 chapters written per CHAPTERS.md (5 parts, about 1,010 script lines, 240 choices, 43 bad ends), Singapore setting, new cast and locations |
| Systems | ✅ Routes locked in Ch8, Rose Filter, value talks with variant pools, Your Life meters, money, Think Deeper cards (Ch4, 9, 14, 15, 16, 18, 20), 17 runtime endings via `SIM.endingFor`, achievements, verified Singapore help resources |
| Art | ✅ Final art via `js/sprites.js` / `assets/` (do not edit) |
| UI | ✅ Dark gilded theme, mobile-first; options appear in a stable per-player shuffled order; toast stack capped at 3 |
| Tests | ✅ `tests/validate.js` · ✅ `tests/softlock.js` (random + greedy full runs, Rose Filter, ending reachability) · ✅ `tests/playthrough.js first|last|random [--mobile] [--shots]` (Playwright) |
| Deploy | ✅ `npx wrangler deploy` → https://sim4love.jstdlee.workers.dev |

Engine note: a bad-end rewind drops the Rose Filter to 60 so a clear-eyed option is always selectable again (fixes a Ch6 rewind loop).

The backlog below is historical (the 20-chapter restructure and Singapore relocation are done); check items against the code before acting on them.

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
- [ ] **Wallet**: real SGD ($) balance, labelled costs on spending options, debt state.
- [ ] Ending evaluation with the new weights (Life 40 / integrity 35 / trust 25); new endings `own_story`, `side_character`;
      Your Life thresholds on `true_*` and `solo_growth` (GAME_DESIGN §7).
- [ ] 56 new lessons (incl. `usvsproblem`), bad ends #19–#28, new resource cards (`sexhealth`, `grooming`, `consent`, `alcohol`, `debt`) — MISTAKES §4.
- [ ] **Value profiles** `js/data/values.js` (13 axes per character, incl. `home`) and `S.values` / `S.seenVariants` / `S.poolVisits` / `S.seed` in the save (ARCHITECTURE §9).
- [ ] **Partner talks** `js/data/talks.js` + `{talk:'topic'}` command; one per chapter (VALUE_PROFILES §5, CHAPTERS final table).
- [ ] **Variant system** `js/data/variants/<loc>.js` + `{variant:'loc.slot'}`; deterministic selection; generic fallback required.
- [ ] Extend `validate.js`: every choice has an ungated option; every `variant`/`talk` reference resolves; every pool has a fallback.
- [ ] Run `node tests/validate.js && node tests/softlock.js` in CI (GitHub Actions) on every push.
- [ ] Install Playwright + Chromium on the build box and run `tests/playthrough.js` for every route.
- [ ] New cast in `Art.CAST`: `takumi`, `ren`, `saki`, `nana`, `farah`, `nurse`, `joy`; Dr. Mochi (glasses) variant.
- [ ] **Think Deeper** `js/data/think.js` (7 cards) + optional card command after talks, `S.reflections`, Notebook tab (ARCHITECTURE §9.5).
- [ ] New backgrounds and supporting-cast sprites per the per-chapter art table at the end of CHAPTERS.md and VALUE_PROFILES §8 (incl. classroom, rooftop, health room/clinic, school nurse).
- [ ] **Before release:** have a qualified sex educator / health professional review every Ch12, Ch13 and Ch18 fact card and all
      resource cards. **Re-verify every Singapore contact** (number, hours, still operating) and update `VERIFIED` in `js/data/resources.js`.

### P0 — Singapore relocation (do before writing new dialogue)
**Art redo** (keep each character's face, hair, eyes and palette; prompts in art-prompts.md "Singapore setting"):
- [ ] Heroine sprites, 19 files: `hina` ×6, `mio` ×6 (sailor uniform → JC uniform), `kaede` ×4 (school CCA track
      jacket, fictional crest), `yuna` ×3 (school-day outfit check). `rei` ×7 and `mochi` ×6 unchanged.
- [ ] Backgrounds redrawn: `street`, `field`, `library`, `bedroom`, `night`, `title`, `keyart`; `badend` recoloured
      (frangipani petals). Then the new Singapore backgrounds (VALUE_PROFILES §8).
- [ ] `js/art.js` SVG fallbacks: `sakura()` (lines ~264–312) → frangipani / rain-tree blossoms; same for the
      `petals:true` overlay; rename the helper.

**Ch1 code edits** (`js/chapters/ch01.js`; text only, no logic changes; keep all ids, flags, lessons):
- [ ] Header comment + `subtitle: 'Spring, Again'` → "First Week of JC" (match CHAPTERS.md).
- [ ] L13 "Last spring" → "Last year, in Sec 4".
- [ ] L23 "Next-door neighbour since kindergarten" → "Same HDB floor since kindergarten" (+ `{full:hina}` token).
- [ ] L24–25, 29, 43, 99, 226, 229: tamagoyaki / bento → nasi lemak with egg cut into hearts / "lunch box" (halal home cooking).
- [ ] L51 "The road to Sakuragaoka High. Cherry blossoms…" → the covered walkway to Bayview JC, rain trees, frangipani.
- [ ] L76 "2,000,000 yen" → "$20,000".
- [ ] L103 "class 2-B" → a JC civics class name (e.g. "26S2"); L135 "entrance ceremony" → "JC1 orientation", drop "kouhai".
- [ ] L144 phone label "Kaede-senpai" → display name via names table; L150/152 drop "senpai".
- [ ] L188 "12,000-yen ticket" → "$120 ticket".
- [ ] All literal names → `{n:id}` tokens resolved by `I18N[locale].names` (ARCHITECTURE §10); add the `names` table to `js/i18n/en-SG.js` (and `zh-SG`).
- [ ] Remaining Japan references in other files, find with
      `grep -nE "¥|yen|sakura|senpai|bento|ramen|izakaya|festival|LINE|shogi|kouhai|-kun|-chan|-san" js/**/*.js`
      (2026-11-02 counts: ch01 14, ch02 1, ch03 4, ch04 2, ch10 2, data/endings.js 1, art.js 15). Most of ch02–ch10
      is replaced by the 20-chapter rewrite anyway.
- [ ] Re-run `node tests/validate.js && node tests/softlock.js` after each step.

### P0 — content
- [ ] **Write Ch2–Ch4 dialogue** (replace every `SIM.todo` with beats; match Ch1's voice). Set `status:'done'`.
- [ ] Add supporting cast to `Art.CAST` (`kenta`, `kai`, `ogawa`, `goto`) with placeholder SVG or sprites, and use them as speakers.
- [ ] **Write Ch5–Ch8** using `'@route'` + `{her}`; add per-route flavour blocks (`SIM.isRoute`) for the variants listed in CHAPTERS.md.
- [ ] **Write Ch9–Ch10** + epilogue text per ending and per route (`ENDINGS[id].byRoute`, then render it in `showEnding`).

### P0 — art
- [x] Chapter 1 sprites (5 heroines + Mochi) and 6 base backgrounds + key art + bad-end background, registered in `js/sprites.js`.
- [ ] Missing expressions (engine falls back to `neutral`): e.g. kaede sad/angry/blush, yuna sad/blush/angry, rei sad/angry. Elise's sprite sits lower in its frame than the others (petite framing) — fine alone, re-crop if she shares a scene.
- [ ] Supporting cast sprites (neutral/happy/angry) per `art-prompts.md`.
- [ ] New locations per VALUE_PROFILES §8 (Singapore): voiddeck, classroom, rooftop, cafe, hawker, mrt, sentosa, karaoke, campsite, carnival, fireworks (National Day), mall, beach (East Coast), dining, healthroom, polyclinic, gradhall, airport, camp, apartment (HDB), partyroom (chalet), lecture, park.
      Add their ids to `BGS` in `tests/validate.js` and to `Art.background` fallback list.

### P1 — systems (designs in ARCHITECTURE §8)
- [ ] Timed choices (Ch1 1-4 and Ch7 7-4 are good candidates).
- [ ] Phone reply choices *inside* the phone UI (style choices as chat bubbles when `S.view.phone` is open).
- [ ] Red-Flag Radar for Part I (Rae, Alpha Kai, "Aileen" lines).
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
   Sexual-health education sits in JC at a school sex-education level (Ch12, **Ch13 Health Class**: nobody has sex,
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
