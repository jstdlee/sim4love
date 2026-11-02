# sim4love 💗

**A hand-drawn anime-style visual novel about love, choices, and becoming someone you like.**

> One ordinary year in Singapore. Five very different people. Every choice you make says something about who you are.

**▶ Play in your browser:** https://sim4love.jstdlee.workers.dev

---

## What kind of game is this?

sim4love is a **branching romance visual novel** with a heart: it's funny, a little chaotic, and quietly honest
about what makes relationships healthy. You're not here to "win" anyone. You're here to find out what you want
from love, and from your own life.

## Features

- 🌿 **Branching story.** Your choices change conversations, relationships and the path you end up on. Wrong turns
  lead to (often ridiculous) bad endings you can instantly rewind.
- 💞 **Multiple heroines with distinct values.** Everyone has her own views on money, family, career, friendship
  and the future. Sometimes you'll agree. Sometimes you won't, and learning to disagree well is the point.
- 📊 **Your Life meters.** Love is only one part of life. Your goals, passion, health and wallet matter too.
- 🔍 **Think Deeper cards.** Optional, balanced reflections on the bigger pressures behind everyday arguments:
  money, careers, housing, family and more. No lectures, no right answer.
- 🎬 **Multiple endings.** Different routes, different outcomes. Some of the best endings aren't the obvious ones.
- 🇸🇬 **Singapore setting.** School days, hawker food, the MRT and HDB life, in a multicultural cast.
- 🆘 **Help resources.** Where the story touches on serious topics, in-game cards point to real, verified Singapore
  support services.
- 📱 Phone chats, a notebook of what you've learned, achievements, autosave, and a mobile-first dark-and-gold UI.

## Content note

Rated **16+**. The game deals with dating, peer pressure, online scams and relationship red flags, always in an
educational, non-graphic way. There is **no explicit content**: the most you'll see on screen is a hug.

## How to play

- **Online:** open the live link above. Works on desktop and mobile browsers.
- **Offline:** download or clone this repository and open `index.html` in a modern browser. No build step.
- **Local server (optional):** `npx serve .` (or any static file server), then open the address it prints.
- **Deploy your own copy:** `npx wrangler deploy` (Cloudflare Workers static assets, see `wrangler.jsonc`).

Progress saves automatically in your browser.

## Development

```bash
node tests/validate.js   # script and data checks
node tests/softlock.js   # proves every path can move forward
```

Design and developer docs are in [`docs/`](docs/). ⚠️ They contain full spoilers.

## Tech

Vanilla HTML, CSS and JavaScript with a small custom visual-novel engine; no framework and no build step. Hosted as
static assets on Cloudflare Workers. All dialogue is authored by hand (no live AI at runtime).

## License

No open-source license has been chosen yet. Until one is added, all rights are reserved by the project owner.
