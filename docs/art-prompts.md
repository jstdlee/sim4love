# Art generation plan (Grok Imagine via fal)

Model: `xai/grok-imagine-image` (~$0.02/image). Sprites: generate on plain white, then background-removal pass.
Files go to `assets/chars/<name>_<expr>.png` and `assets/bg/<scene>.jpg`; the engine uses them automatically
and falls back to the SVG placeholders when a file is missing.

## Shared style prefix
"Hand-drawn anime-style visual novel character sprite, waist-up, facing viewer, clean cel shading, soft pastel colours,
crisp lineart, cute, high quality, plain white background, centered, 2:3 portrait"

## Singapore setting (v4)
The story is set in Singapore (GAME_DESIGN §3.1). Keep each heroine's hair, eyes, palette and silhouette; change
only clothing and scenery. School uniform for all JC heroines: white short-sleeved blouse, teal-and-navy skirt or
trousers, small fictional "Bayview JC" crest; PE kit and CCA kits as needed. Backgrounds: tropical light, HDB blocks,
covered walkways, rain trees, ceiling fans, hawker centres, MRT. **Never**: sakura / cherry blossoms, sailor
uniforms, Japanese signage, real school crests, real brand or stall names. Falling petals become frangipani.
Respect: Hanis's design stays as is; any religious or festive detail is accurate and respectful, never a joke.

## Characters (neutral first; then happy, blush, sad, angry, surprised, smug with the same seed)
- hina: 17yo Malay Singaporean girl, short chestnut bob, orange hair clip, ahoge, warm amber eyes, yellow cardigan over the white JC blouse, teal ribbon
- rei: early-20s Chinese Singaporean woman, long straight glossy black hair, crimson eyes, beauty mark, red dress, gold heart necklace, glamorous
- mio: 17yo shy Chinese Singaporean girl, long lavender hair in a single side braid, round glasses, violet eyes, white JC blouse with teal-and-navy skirt, holding a book
- kaede: 18yo athletic Indian Singaporean girl, silver high ponytail, teal eyes, school CCA track jacket (navy, teal stripes, fictional Bayview crest), cool confident look
- yuna: 17yo idol-like Eurasian Singaporean girl, pink twin tails with bows, star hair clip, magenta eyes, pink and white outfit, holding a smartphone
- mochi: tiny white chibi cat mascot with small angel wings and a pink heart on its head, sticker style

## Backgrounds (16:9, no people, anime VN background art)
bedroom (HDB bedroom, morning sun, window grilles, ceiling fan), street (covered walkway from HDB blocks to school, rain trees, frangipani), library (school library, tropical windows), field (school track at tropical sunset, HDB blocks behind), night (HDB estate at night, void deck lights), title (dusk skyline with HDB blocks, frangipani petals). New: see VALUE_PROFILES §8.

Estimated first pass: 6 chars x 7 expressions + 6 backgrounds + extras = ~60 images, about $1.5-3 including retries and background removal.
