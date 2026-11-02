# Art generation plan (Grok Imagine via fal)

Model: `xai/grok-imagine-image` (~$0.02/image). Sprites: generate on plain white, then background-removal pass.
Files go to `assets/chars/<name>_<expr>.png` and `assets/bg/<scene>.jpg`; the engine uses them automatically
and falls back to the SVG placeholders when a file is missing.

## Shared style prefix
"Japanese anime visual novel character sprite, waist-up, facing viewer, clean cel shading, soft pastel colours,
crisp lineart, cute, high quality, plain white background, centered, 2:3 portrait"

## Characters (neutral first; then happy, blush, sad, angry, surprised, smug with the same seed)
- hina: 17yo girl, short chestnut bob, orange hair clip, ahoge, warm amber eyes, yellow cardigan over white school shirt, red ribbon
- rei: early-20s woman, long straight glossy black hair, crimson eyes, beauty mark, red dress, gold heart necklace, glamorous
- mio: 17yo shy girl, long lavender hair in a single side braid, round glasses, violet eyes, navy sailor uniform, holding a book
- kaede: 18yo athletic girl, silver high ponytail, teal eyes, navy track jacket with teal stripes, cool confident look
- yuna: 17yo idol-like girl, pink twin tails with bows, star hair clip, magenta eyes, pink and white outfit, holding a smartphone
- mochi: tiny white chibi cat mascot with small angel wings and a pink heart on its head, sticker style

## Backgrounds (16:9, no people, anime VN background art)
bedroom (morning sun), street (cherry blossom school road), library, field (school track at sunset), night (bedroom at night, moon), title (pastel sakura sky)

Estimated first pass: 6 chars x 7 expressions + 6 backgrounds + extras = ~60 images, about $1.5-3 including retries and background removal.
