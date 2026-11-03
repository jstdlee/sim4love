# sim4love art notes

Generated art for the Singapore setting. Manifest: `js/sprites.js` (`window.SPRITES = {chars, outfits, bg, sprite()}`). Contact sheet: `docs/art-contact-sheet.jpg`.

## v3 cast redraw with outfits (2026-11-03)
- Scope: the 20 main characters of `docs/CAST_BIBLE.md` (new ids `chloe`, `preet`, `ama`), 271 sprites, 3–4 outfits each in distinct fashion styles. Mochi, `goto` and `kai` are unchanged from v2.
- Style lock (text-only, so no v2 sprite leaks its old style or lighter skin): Japanese kawaii anime, big shiny eyes, round soft face, clean line art, soft cel shading, pastel-warm palette, head-to-hips framing, plain white background, then rembg `isnet-anime` cutout, alpha < 12 cleared, scaled into 800x1200 and bottom-centred (WEBP q86).
- Method: one `<id>_<outfit>_neutral` per outfit from a full text prompt; every other expression uses that neutral as the reference: "Same character, same outfit, same pose and framing, same skin tone, same kawaii anime art style as the reference image; only change the facial expression to: …".
- Expression phrases: happy "bright happy open-mouth smile, eyes curved with joy"; sad "eyebrows drooping, glossy eyes, small frown"; surprised "wide round eyes, eyebrows raised, small round open mouth"; shy "eyes glancing away, light blush, small wavy embarrassed mouth"; smug "playful confident little grin, eyes slightly narrowed, one eyebrow up"; blush "deep blush, flustered smile"; angry "puffed cheeks, furrowed brows, pouting"; cool "calm composed half-lidded look"; scheme "sly scheming smile".
- Cast and dress: multiracial Singapore cast; every character keeps their natural skin tone (no lightening, no stereotypes). Farah's hijab covers hair and neck in every outfit; Kenta's festive look is a baju melayu with samping and songkok; festive outfits follow each family's own festival. All outfits are modest; no pose goes beyond a hug. No real brands, schools or readable text.
- Contact sheet: `docs/art-contact-sheet.jpg` (every outfit's neutral). Per-tier QC sheets were checked for each batch; failures were regenerated (Chloe's phone text, Kaede's track bib, nurse camp kit carrying a red-cross-like emblem, Ama's dance outfit framing, a renamed nurse file).

### Outfit API (`js/sprites.js`)
- Files: `assets/chars/<id>_<outfit>_<expr>.webp`.
- `SPRITES.chars[id][expr]` is the default outfit (flat, so scripts without an outfit work unchanged).
- `SPRITES.chars[id].outfits[outfit][expr]` holds every outfit (default included), read by `Art.character(key, expr, label, outfit)`.
- `SPRITES.outfits[id] = { default: '<outfit>', <outfit>: [exprs] }` is a summary for tools and tests (aliases excluded).
- `SPRITES.sprite(id, expr, outfit)` returns the file path using the bible order: outfit + expression → that outfit's neutral → default outfit + expression (expression chain, e.g. blush → shy → happy) → default neutral.
- Script usage: `{s:'hina', e:'happy', o:'festive'}` or `{outfit:{hina:'festive'}}` (sticky for the scene). An unknown outfit quietly uses the default set.
- Aliases: where `js/data/cast.js` names an outfit differently, the alias points at the closest art set (table below). Every outfit named in `js/data/cast.js` has art or an alias (`yuna` dance→home, `ogawa` occasion→nightclass, `nana` occasion→gallery); `tests/validate.js` fails on any outfit name without art. Scene outfits come from the presets in `js/data/wardrobe.js`.

### Counts (v3)
| id | outfits | sprites | outfits and expressions | cast.js aliases |
|---|---|---|---|---|
| hina | 4 | 22 | **uniform** (default): neutral, happy, sad, surprised, angry, blush, shy; **casual**: neutral, happy, sad, angry, blush; **cca**: neutral, happy, sad, angry, blush; **festive**: neutral, happy, sad, angry, blush | — |
| mio | 4 | 22 | **uniform** (default): neutral, happy, sad, surprised, smug, blush, shy; **camp**: neutral, happy, sad, angry, blush; **casual**: neutral, happy, sad, angry, blush; **festive**: neutral, happy, sad, angry, blush | — |
| kaede | 4 | 23 | **uniform** (default): neutral, happy, surprised, smug, angry, cool, blush, shy; **casual**: neutral, happy, smug, angry, cool; **festive**: neutral, happy, smug, angry, cool; **track**: neutral, happy, smug, angry, cool | — |
| yuna | 4 | 22 | **uniform** (default): neutral, happy, sad, surprised, angry, blush, shy; **festive**: neutral, happy, sad, smug, blush; **home**: neutral, happy, sad, smug, blush; **stream**: neutral, happy, sad, smug, blush | stage→stream, dance→home |
| chloe | 4 | 22 | **casual** (default): neutral, happy, sad, surprised, smug, angry, blush; **festive**: neutral, happy, smug, angry, blush; **pitch**: neutral, happy, smug, angry, blush; **stall**: neutral, happy, smug, angry, blush | — |
| preet | 4 | 21 | **uniform** (default): neutral, happy, sad, surprised, angry, blush; **festive**: neutral, happy, sad, angry, blush; **run**: neutral, happy, sad, angry, blush; **volunteer**: neutral, happy, sad, angry, blush | — |
| rei | 4 | 18 | **persona** (default): neutral, happy, sad, surprised, smug, scheme; **herself**: neutral, happy, sad, surprised; **law**: neutral, happy, sad, surprised; **occasion**: neutral, happy, sad, surprised | student→law, talk→occasion |
| nana | 4 | 17 | **casual** (default): neutral, happy, sad, surprised, shy; **gallery**: neutral, happy, surprised, shy; **studio**: neutral, happy, surprised, shy; **weekend**: neutral, happy, surprised, shy | occasion→gallery |
| kenta | 4 | 16 | **uniform** (default): neutral, happy, sad, surprised, smug, angry, shy; **festive**: neutral, happy, sad; **ns**: neutral, happy, sad; **sport**: neutral, happy, sad | — |
| mei | 4 | 9 | **casual** (default): neutral, happy, angry; **festive**: neutral, happy; **home**: neutral, happy; **internship**: neutral, happy | work→internship |
| mom | 4 | 10 | **home** (default): neutral, happy, sad, surprised; **festive**: neutral, happy; **nightclass**: neutral, happy; **work**: neutral, happy | — |
| dad | 4 | 9 | **home** (default): neutral, happy, angry; **occasion**: neutral, happy; **weekend**: neutral, happy; **work**: neutral, happy | — |
| ama | 4 | 9 | **home** (default): neutral, happy, sad; **class**: neutral, happy; **dance**: neutral, sad; **festive**: neutral, happy | — |
| ogawa | 3 | 7 | **cafe** (default): neutral, happy, sad; **morning**: neutral, happy; **nightclass**: neutral, happy | apron→cafe, casual→nightclass, occasion→nightclass |
| farah | 3 | 7 | **school** (default): neutral, happy, angry; **camp**: neutral, happy; **festive**: neutral, happy | work→school, occasion→festive |
| nurse | 3 | 7 | **health** (default): neutral, happy, sad; **camp**: neutral, happy; **polyclinic**: neutral, happy | scrubs→health, clinic→polyclinic, casual→camp |
| joy | 3 | 7 | **work** (default): neutral, happy, sad; **festive**: neutral, happy; **sunday**: neutral, happy | — |
| takumi | 3 | 9 | **uniform** (default): neutral, sad, surprised, smug, cool; **casual**: neutral, smug; **council**: neutral, smug | blazer→council |
| ren | 3 | 7 | **uniform** (default): neutral, sad, smug; **ns**: neutral, sad; **street**: neutral, smug | casual→street |
| saki | 3 | 7 | **chalet** (default): neutral, happy, sad; **crew**: neutral, happy; **occasion**: neutral, happy | casual→chalet, gig→crew |

### Known gaps and accepted details
- Tier 3/4 alternate outfits have 2 expressions (neutral + one), below the 3 the bible budgets; missing expressions resolve to that outfit's neutral. Heroine alternate outfits have 5 expressions each (the 5 the bible budgets).
- Accepted as drawn: Kaede's festive half-saree shows a small midriff gap; Hina's CCA first-aid pouch has a small white cross on red; Preet's uniform has no blazer; Ren's hair is light ash-brown; Saki has a faint rainbow rim light and her occasion look is a black tee with trousers, close to her crew look; Joy's Christmas outfit is a red polo with a parol star lantern; Farah's camp look has no cap; Ama's dance neutral is smiling; the nurse's badge in `health_sad` has blurred unreadable marks; Mom wears glasses at night class.

## Rules followed (v1/v2)
- Heroines (hina, mio, kaede, yuna) redrawn in a generic Singapore JC uniform (fictional crest, no real school).
- v2 (kawaii redraw): every human sprite (heroines + supporting cast, 78 files) redrawn in one consistent Japanese-anime style. Mochi unchanged.
- Backgrounds: no people, frangipani instead of sakura, no real brands/logos. No CGs.
- Content: all-ages; nothing beyond a hug.

## v2 kawaii style (2026-11-02)
- Style: large shiny expressive anime eyes, round soft faces, clean line art, soft cel shading, pastel-warm palette; waist-up, plain white bg, then rembg `isnet-anime` cutout.
- Method: one `neutral` per character first; every other expression is generated from that neutral as reference ("same character, same outfit, same framing, same art style; only change the expression to …") so outfits/faces stay consistent. Adults/supporting cast used a heroine/Kenta neutral as style reference plus "not realistic" to avoid semi-realistic faces.
- Skin tones / cast: the multicultural cast is kept (Kenta Malay, Farah Malay in a light-blue hijab, Kaede Indian with warm caramel-tan skin, Nana Eurasian with warm tan and curly hair, others Chinese). Everyone gets the same soft anime skin rendering; no one was lightened or had their ethnicity removed. Faces are non-sexualised and age-appropriate.
- Kai redesign: dropped the gold-blazer trope; now a neutral smart-casual look (navy unstructured blazer over a white tee, holding a phone), ethnicity unspecified so the antagonist is not coded to any group.
- Goto remains a faceless silhouette by design. No name tags or on-image text (nurse badge removed).
- Filenames/ids unchanged: rei's legacy ids stay `.png` (neutral, happy, surprised, blush, smug, scheme, cool); everything else `.webp`. `js/sprites.js` unchanged (20 chars, 85 sprites).

## Formats
- Characters: transparent WEBP (q86) or legacy PNG, 800x1200, bottom-centred. Mochi: 800x800 square.
- Backgrounds: 1920x1080 WEBP (new) / JPG (legacy ids), shown with `object-fit: cover`.

## v2 characters (legacy `<id>_<expr>` files, superseded by v3 except mochi, goto, kai)
| id | count | expressions |
|---|---|---|
| hina | 9 | neutral, happy, sad, surprised, smug, angry, cool, blush, shy |
| mio | 9 | neutral, happy, sad, surprised, smug, angry, cool, blush, shy |
| kaede | 9 | neutral, happy, sad, surprised, smug, angry, cool, blush, shy |
| yuna | 9 | neutral, happy, sad, surprised, smug, angry, cool, blush, shy |
| rei | 9 | neutral, happy, sad, surprised, smug, angry, cool, blush, scheme |
| mochi | 7 | neutral, happy, sad, surprised, smug, angry, doctor |
| kenta | 5 | neutral, happy, sad, surprised, smug |
| ogawa | 4 | neutral, happy, sad, angry |
| farah | 3 | neutral, happy, angry |
| nurse | 1 | neutral |
| joy | 2 | neutral, sad |
| goto | 1 | neutral |
| dad | 3 | neutral, happy, angry |
| mom | 2 | neutral, sad |
| mei | 3 | neutral, happy, angry |
| takumi | 2 | neutral, smug |
| ren | 2 | neutral, sad |
| saki | 2 | neutral, sad |
| nana | 2 | neutral, surprised |
| kai | 1 | neutral |

Missing expressions fall back to the character's `neutral` sprite (Art.character). No character id falls back to SVG. `goto` is a faceless silhouette; `kai` is intended for phone-screen use.

## Backgrounds (32 ids)
airport, apartment, badend, beach, bedroom, cafe, camp, campsite, campsite_night, carnival, classroom, dining, field, fireworks, gradhall, hawker, healthroom, karaoke, keyart, lecture, library, mall, mrt, night, park, partyroom, polyclinic, rooftop, sentosa, street, title, voiddeck

Legacy ids (title, keyart, bedroom, street, library, field, night, badend) are redrawn for Singapore; the rest are new location ids from VALUE_PROFILES §8.

## Integration notes (outside the art worker's file scope)
- `tests/validate.js` hard-codes `BGS = ['title','bedroom','street','library','field','night','badend']`. Chapters that use the new bg ids will fail validation until that list is extended (or derived from `SPRITES.bg`).
- `js/art.js` `background()` already prefers `SPRITES.bg[key]`, so new ids render; only the SVG fallback `BG` table lacks them (falls back to `BG.title`).
- `js/art.js` `character()` builds alt text from `CAST[key].full`. Supporting-cast ids (kenta, ogawa, farah, nurse, joy, goto, dad, mom, mei, takumi, ren, saki, nana, kai) are not in `CAST`, so this throws if a script shows them. Add CAST entries or guard with `(CAST[key]||{}).full||key`.
- `js/engine.js` `mochiFace()` already reads `SPRITES.chars.mochi`.
