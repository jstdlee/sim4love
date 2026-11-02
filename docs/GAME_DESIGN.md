# sim4love — Game Design Document

> A cute, funny, Japanese-anime-style HTML visual novel that teaches teenage boys and young men what healthy love
> looks like: how to start a relationship, how to keep one, the common mistakes boys make, and the traps
> (manipulation, scams, control) to recognise and avoid.

Related docs: [CHAPTERS.md](CHAPTERS.md) (full chapter scripts outline) · [MISTAKES.md](MISTAKES.md) (mistake
and lesson catalog) · [ARCHITECTURE.md](ARCHITECTURE.md) (code) · [HANDOFF.md](HANDOFF.md) (task backlog) ·
[story-research.md](story-research.md) (reference-game research) · [art-prompts.md](art-prompts.md) (image generation).

---

## 1. Reference & originality

The genre reference is **完蛋！我被美女包围了！ / "Love Is All Around" / "Oh No, I'm Surrounded by Beauties"** (intiny, 2023).
We borrow its *design patterns*, not its content:

| Borrowed pattern | How sim4love uses it |
|---|---|
| First-person POV, heroines talk "to you" | Bust-up sprites facing the player, player is the protagonist |
| Short, punchy scenes ending in a 2–4 option choice | Every scene ≈ 1–3 minutes, ends in an interaction |
| Funny, shareable **bad endings** + instant rewind | Comic BAD END cards, Mochi rewinds to the choice |
| Phone / text-message scenes | Built-in phone chat overlay |
| Staggered heroine introductions | 5 heroines in Ch1, supporting cast added Ch2–4 |
| Personal routes + multiple ending types | Route lock in Ch4, per-heroine endings in Ch10 |
| Joke options rewarded with achievements | Achievement list (§7) — jokes aim at the *mistake*, never at a heroine |
| Honesty quiz | Finale "honesty check" in Ch10 |

**Everything else is original:** names, characters, story, dialogue, art.
**Do not copy** plot, characters, dialogue, or images from the reference game.

Things we deliberately do *differently* (fixing the reference's criticisms):
- **No reward for juggling.** The reference gates chapters on *total* affection across all heroines. We gate on
  integrity (Love IQ + Self-respect), and juggling triggers the "Fish Pond Keeper" bad end.
- **Women are not prizes or villains.** Trap *behaviours* are labelled, not "types of girls". Male characters model
  both bad (Alpha Kai, sometimes Kenta) and good (Mr. Ogawa) behaviour. The scam is run by an organisation, and the
  person used as its "face" gets a path out.
- **The player is the main source of mistakes.** Most of the game (Part II) is about mistakes *the boy* makes inside
  a relationship.

## 2. Pillars

1. **Fun first, lesson second.** Every scene must be enjoyable without the lesson card.
2. **You are the variable.** Your neediness, pushiness, honesty and self-respect drive outcomes.
3. **Behaviours, not genders.** Red flags are tactics anyone can use.
4. **Every heroine is a person**, with her own goals, friends and the right to say no.
5. **Healthy is the most romantic.** The best scenes in the game come from secure, honest, respectful choices.
6. **Mistakes are safe here.** Rewind is free and unlimited; the lesson card names what happened, without lecturing.

## 3. Audience & tone

- Ages 13+ (teen-safe). Romance limited to hand-holding, hugs and an asked-for kiss. No sexual content.
- Sensitive topics (sextortion, intimate images, scams, mental health) are handled factually, without graphic
  detail, and end with "what to do" + "tell a trusted adult / report" guidance (locale-configurable).
- Tone: bright slice-of-life comedy, light tsundere banter, Mochi's sarcastic cat commentary; quiet sincere beats.
- Language: English first; text is kept in chapter files so localisation (中文 / 日本語) can be added later (see ARCHITECTURE §8).

## 4. Cast

### Heroines

| ID | Name | Look | Personality | Part I theme (dating) | Part II route theme (relationship) |
|---|---|---|---|---|---|
| `hina` | **Hina Aoki** | Chestnut bob, hair clip, yellow cardigan | Childhood friend, warm, honest, teasing | Noticing quiet, sincere care | Taking her for granted · effort drop · listening vs fixing |
| `mio` | **Mio Shirakawa** | Lavender braid, round glasses | Shy bookworm, writer | Reading signals · consent · curiosity | Supporting her dream · pressure · privacy |
| `kaede` | **Kaede Tachibana** | Silver ponytail, track jacket | Cool senpai, competitive, hot-and-cold | Mixed signals · self-respect · clear words | Jealousy of her male teammates · her success · fights |
| `yuna` | **Yuna Hoshino** | Pink twin tails, phone always in hand | Idol-like, social butterfly | Being kept as a backup · asking "what are we?" | Her growth arc: from fish pond to honesty · insecurity · social media |
| `rei` | **Rei Kurosawa** | Long black hair, red dress | Glamorous "stranger" | Love bombing · romance/investment scam · isolation | **Not romanceable.** Revealed as a debt-trapped "face" of a scam ring → friendship/redemption ending |

Routes available after Ch4: `hina`, `mio`, `kaede`, `yuna` (Yuna only if the player asked "what are we?" — flag
`yunaClarity`), plus **`solo`** (choosing to stay single and grow — a fully valid, good route).

### Supporting cast

| ID | Name | Role | Lesson function |
|---|---|---|---|
| `mochi` | **Mochi** | Love-God-in-training cat living in the phone. Narrator, coach, rewinds time | Names the lesson; comic relief |
| `kenta` | **Kenta Mori** | Best friend, loud, loyal | Bro advice — sometimes terrible ("don't reply for 3 days"), sometimes wise; friendships matter |
| `kai` | **"Alpha" Kai** | Online dating-guru streamer selling a course | The *player-side* temptation: negging, control, "never accept no". His tactics always backfire; exposed in Ch10 |
| `ogawa` | **Mr. Ogawa** | Kind café owner, divorced, plays shogi | Mentor; models secure, reflective masculinity; normalises asking for help |
| `mei` | **Mei** | Player's older sister (phone calls) | Reality checks; family support |
| `goto` | **"Manager" Goto** | Runs the scam ring that uses Rei | The real villain behind the romance scam (Ch4, Ch10) |

## 5. Structure

```
PART I — "Getting to Know You"   (dating stage, all heroines)      Ch1–Ch4
   Ch4 ends with confession → ROUTE LOCK (hina | mio | kaede | yuna | solo)
PART II — "Being Together"       (relationship stage, route spine) Ch5–Ch8
PART III — "Storms & Promises"   (hard times, endings)             Ch9–Ch10 + Epilogue
```

| Ch | Title | Stage | Core topics |
|---|---|---|---|
| 1 | Spring, Again ✅ *(playable)* | Part I | First impressions, love bombing, consent, mixed signals, fish pond |
| 2 | The Group Date | Part I | Curiosity vs. monologue, negging, buying love, triangulation, punching down, isolation |
| 3 | Seen at 2:14 AM | Part I | Texting anxiety, privacy of chats, **sextortion**, emergency money scams, remembering details |
| 4 | Culture Festival | Part I | Rescuer trap, honesty vs. juggling, confession style, **handling rejection**, route lock |
| 5 | After "Yes" | Part II | Effort drop, moving too fast, kiss-and-tell, losing your own life |
| 6 | Green-Eyed Monster | Part II | Jealousy, phone snooping, control/location tracking, double standards, envy of her success |
| 7 | The First Fight | Part II | Listening vs. fixing, real apologies, dismissing feelings, stonewalling, breakup threats, mind-reading |
| 8 | Closeness | Part II | Consent & pressure, intimate images, surprises she said no to, her friends/family, body jokes |
| 9 | Storm Season | Part III | Distance & constant contact, small lies, money, supporting mental health, **healthy breakups** |
| 10 | What Love Actually Is | Part III | Supporting her dreams, honesty quiz, helping a friend, Rei's ending, Mochi's graduation |

Each chapter: **5–6 interactions**, 2–3 comic bad ends, 4–8 new lessons, ~15–25 minutes of play.
Part II/III chapters use **one shared spine** with heroine-specific variant lines (see ARCHITECTURE §4.3) so we write
each chapter once, not four times.

## 6. Systems

| System | Stored as | Rules | Teaches |
|---|---|---|---|
| **Connection ♥** (per heroine) | `stats.hina` … | Grows by listening, honesty, keeping promises. Gifts/flattery give tiny or no gains. Rei's is shown as `???` (fake affection) | Love is built, not bought |
| **Trust 🤝** (route partner, Part II+) | `stats.trust` | Starts at 20 on route lock. Drops hard on lies, snooping, control; recovers slowly through repair | Trust is the relationship's bank account |
| **Love IQ 🧠** | `stats.wisdom` | Recognising traps and healthy patterns | Pattern recognition |
| **Self-respect 👑** | `stats.self` | Drops when begging, over-texting, tolerating disrespect, paying for affection, abandoning friends/goals | You can't give what you don't have |
| **Flags** | `flags.*` | Memory of choices (e.g. `reiHasLine`, `hinaBirthday`, `yunaClarity`) used for callbacks | Consequences |
| **Love Notebook** | `lessons[]` | Lesson card after key choices: green = healthy habit, red = pitfall, trap = manipulation tactic | Retention |
| **Bad ends + rewind** | `badEnds[]` | Comic fail screen, rewind to the choice. Lessons learned are kept after rewind | Safe experimentation |
| **Phone** | view state | Chat overlay; future: typing dots, "seen", double-text temptation, reply choices inside the phone | Texting dynamics |
| **Achievements** *(todo)* | `achievements[]` | Unlocked by joke options and milestones (§7) | Replay |
| **Consent check** *(todo)* | choice option `ask:true` | Before any physical step, an **Ask** option always exists; asking never costs Connection | Asking is romantic |
| **Timed choices** *(todo)* | `choice.timer` | Countdown; timeout fires `timeoutOpt` (often "say nothing") | Avoidance is also a choice |
| **Red-Flag Radar** *(todo, Part I)* | per-line `flag:'lovebomb'` | Tap 🚩 on a manipulative line → bonus Love IQ; tapping a healthy line shows "that's a green flag" | Spotting tactics without paranoia |
| **Route map** *(todo)* | derived from script | Flowchart of a chapter's choices; jump back to any explored choice | Replay |
| **Chapter gate** | `stats.wisdom + stats.self` | Ch5+ requires ≥ 0 (else Mochi forces a "remedial lesson" scene) — integrity, not total affection | One honest relationship > many maybes |

### Route lock rule (end of Ch4)
Confession options appear for heroines with Connection ≥ 30 (Yuna also needs `yunaClarity`). If she says no
(Connection < 40), handling it gracefully moves the player to the `solo` route with a friendship bonus.
`solo` is also directly selectable ("I'm not ready — I want to work on myself first").

## 7. Endings & achievements

### Endings
| ID | Type | Condition (Ch10) |
|---|---|---|
| `true_<route>` | ★ True end (×4) | Trust ≥ 70, Self ≥ 40, Love IQ ≥ 60, supported her dream (10-1 ✅) |
| `normal_<route>` | Normal end (×4) | Together, but one threshold missed — epilogue shows what to keep working on |
| `kind_goodbye_<route>` | Good end (×4) | Healthy breakup handled with respect (Ch9 or Ch10) — "love that ends well is still love" |
| `solo_growth` | Good end | Solo route, Self ≥ 50 — new friends, a hobby, and a hint of a future meeting |
| `still_searching` | Normal end | Solo route, Self < 50 — Mochi offers "New Game+" |
| `bro_end` | Comic good end | Solo route with Kenta Connection maxed — the boys open a ramen stall |
| `rei_friend` | Side ending | `reiRedemption` flag — Rei testifies against Goto, becomes a friend; she thanks you for *not* trying to rescue her with money |
| `mochi_graduates` | Secret | All lessons collected — Mochi passes her exam and reveals her true form |
| `bad_*` | Comic bad ends | ~25 in total, catalogued in MISTAKES.md; each is instantly rewindable |

### Achievements (examples)
`Leftover Hearts` (notice Hina's hearts) · `MoonRich Investor` (BAD END #1) · `The Council Would Like a Word` ·
`Respect +100` (accept a rejection with grace and buy her a snack) · `Unsubscribed` (close Alpha Kai's video every
time) · `Read at 2:14 AM` (triple-text) · `Professional Furniture Mover` (do 3 favours for Yuna without a date) ·
`Mom Was Right` (take Mei's advice 3 times) · `Touch Grass` (choose your hobby over your phone 5 times) ·
`Plain Love` (reach any true end) · `Professional Disaster` (see every bad end).

## 8. Presentation

- **Art style:** anime VN, bust-up sprites (style B "shoujo" from `design/character-sheets.html`) for normal scenes,
  chibi (style A) for comic beats/bad ends. Final art generated with Grok Imagine (see `art-prompts.md`), 7 expressions
  per character: neutral, happy, blush, shy, sad, angry, surprised, smug (+ `scheme`, `cool` for some).
- **UI:** dark gilded game UI (warm dark panels, gold double-line frames, Cinzel / Marcellus / Lora, chunky cream-and-red logo), name tag accent in character colour,
  stat chips top-left, Notebook/Auto/Title top-right. Mobile-first (works at 375px).
- **Audio (todo):** light piano/city-pop BGM per location, comic stingers for bad ends, phone vibrate SFX.

## 9. Safety & resource lines

Scenes on scams, sextortion, intimate images, self-harm/depression must end with a short resource card from
`js/data/resources.js` (todo), configurable per locale, e.g.:
- "Don't pay, don't send more, keep the evidence, block, and tell a trusted adult. Report to police / your
  country's anti-fraud centre."
- "If someone shares or threatens to share intimate images of a minor, it is a crime. Report it (e.g. NCMEC
  *Take It Down* / local police)."
- "If a friend is struggling, you don't have to fix it alone — encourage them to talk to a counsellor or crisis line."
