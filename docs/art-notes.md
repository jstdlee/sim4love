# sim4love art notes

Generated art for the Singapore setting. Manifest: `js/sprites.js` (`window.SPRITES = {chars, bg}`). Contact sheet: `docs/art-contact-sheet.jpg`.

## Rules followed
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

## Characters (20 ids, 85 sprites)
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
