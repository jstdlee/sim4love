# sim4love 💗

A cute anime-style HTML visual novel that teaches what healthy love looks like — and the common mistakes and traps
boys run into: love bombing, romance & sextortion scams, hot-and-cold games, being kept as a backup, jealousy and
control, bad apologies, pressure, and how to handle rejection and breakups with respect.

Genre reference: the interactive dating game *完蛋！我被美女包围了！ / Love Is All Around* — we borrow its design
patterns (POV scenes, funny rewindable bad endings, phone chats, routes), with fully original story, cast and art.

**Play:** open `index.html` in a browser (no build step).

## Status
- Engine: done (choices, lesson cards, bad ends + rewind, phone chats, routes, flags, achievements, endings, save).
- Chapter 1: fully written. Chapters 2–10: playable outlines (all choices/lessons/bad ends; dialogue marked `【TODO】`).
- Art: SVG placeholders; generated artwork plugs in via `js/sprites.js`.

## Docs
| Doc | What |
|---|---|
| [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) | Vision, pillars, cast, systems, structure, endings |
| [docs/CHAPTERS.md](docs/CHAPTERS.md) | All 10 chapters, every interaction and option |
| [docs/MISTAKES.md](docs/MISTAKES.md) | Catalog of common mistakes, 63 lessons, 18 bad ends |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Code layout, script DSL, art pipeline, tests |
| [docs/HANDOFF.md](docs/HANDOFF.md) | Prioritised backlog for the next developer/agent |
| [docs/story-research.md](docs/story-research.md) | Research on the reference game |
| [docs/art-prompts.md](docs/art-prompts.md) | Image-generation prompts |
| [design/character-sheets.html](design/character-sheets.html) | Art-style options A–D |

## Tests
```bash
node tests/validate.js            # static checks of every chapter script
node tests/playthrough.js first   # headless full playthrough (needs Playwright + Chromium); also: last | random
```
