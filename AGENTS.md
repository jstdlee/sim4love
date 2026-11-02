# Instructions for coding agents (Grok, Claude, Copilot, …)

1. Read `docs/HANDOFF.md` first, then `docs/ARCHITECTURE.md` (script DSL) and `docs/CHAPTERS.md` (what to write).
2. Story content lives only in `js/chapters/chXX.js`; lessons/endings/achievements/resources in `js/data/`.
   Do not put story text in `engine.js`.
3. Replace `SIM.todo(...)` beats with real dialogue in the voice of `js/chapters/ch01.js`; keep the designed choices.
4. Before committing: `node tests/validate.js` must print `OK`; run `node tests/playthrough.js first` when Playwright is available.
5. Hard rules: original content only (never copy the reference game); teen-safe; behaviours not genders;
   healthy option = best outcome; serious topics get a `{resource:…}` card.
