# sim4love — Game Design Document

> A funny, Japanese-anime-style HTML visual novel (20 chapters, ages 16+) that teaches boys and young men what
> healthy love looks like, and above all that **your own life comes first**: self-respect, your goals and passion,
> your health and your money. Along the way: how to start and keep a relationship, the common mistakes boys make,
> sexual health and consent, and the traps (manipulation, scams, control, overspending) to recognise and avoid.
>
> **Education first.** The moral spine is in [CORE_VALUES.md](CORE_VALUES.md): love other people, love yourself more;
> looks are packaging; infatuation is mostly projection; never spend beyond your means for anyone.

Related docs: [CORE_VALUES.md](CORE_VALUES.md) (moral spine) · [CHAPTERS.md](CHAPTERS.md) (full chapter scripts outline) · [MISTAKES.md](MISTAKES.md) (mistake
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
| Personal routes + multiple ending types | Route lock in Ch8, per-heroine endings in Ch20 |
| Joke options rewarded with achievements | Achievement list (§7) — jokes aim at the *mistake*, never at a heroine |
| Honesty quiz | Finale "honesty check" in Ch20 |

**Everything else is original:** names, characters, story, dialogue, art.
**Do not copy** plot, characters, dialogue, or images from the reference game.

Things we deliberately do *differently* (fixing the reference's criticisms):
- **No reward for juggling.** The reference gates chapters on *total* affection across all heroines. We gate on
  integrity (Love IQ + Self-respect), and juggling triggers the "Fish Pond Keeper" bad end.
- **Women are not prizes or villains.** Trap *behaviours* are labelled, not "types of girls". Male characters model
  both bad (Alpha Kai, sometimes Kenta) and good (Mr. Ogawa) behaviour. The scam is run by an organisation, and the
  person used as its "face" gets a path out.
- **The player is the main source of mistakes.** Most of the game is about mistakes *the boy* makes: neediness,
  obsession, overspending, self-neglect, pressure.
- **The premise is not the reward.** "Surrounded by beauties" is the comedy setup. The game systematically
  de-idealises it (CORE_VALUES §2): behind every glamorous exterior is an ordinary, flawed person, and the player's
  infatuation is shown to be mostly his own projection. Worship and contempt are both mistakes.

## 2. Pillars

1. **Fun first, lesson second.** Every scene must be enjoyable without the lesson card.
2. **You are the variable.** Your neediness, pushiness, honesty and self-respect drive outcomes.
3. **Behaviours, not genders.** Red flags are tactics anyone can use.
4. **Every heroine is a person**, with her own goals, friends and the right to say no.
5. **Your life is the main story.** Goals, passion, health and money are tracked all game and weigh most in the endings.
6. **Healthy is the most romantic.** The best scenes in the game come from secure, honest, respectful choices.
7. **Mistakes are safe here.** Rewind is free and unlimited; the lesson card names what happened, without lecturing.

## 3. Audience & tone

- **Ages 16+.** Primary audience: boys and young men 16–22. Parts I–IV are set in high school (characters 16–18);
  Part V is the first year after graduation (characters 18–19).
- **Romance and sexual health are non-explicit.** High-school chapters stay at hand-holding, hugs and an asked-for
  kiss. Ch18 covers sexual health at a sex-education level (talking first, consent, contraception, STI testing,
  delaying, saying no, a pregnancy scare) through conversation and fact cards; intimate moments cut away. No nudity,
  no sexual description.
- **Alcohol** appears only as something to refuse (characters are under the legal drinking age) and as a safety topic.
- Sensitive topics (sextortion, intimate images, scams, debt, sexual health, alcohol, mental health) are handled
  factually and end with "what to do" + "tell a trusted adult / report / where to get confidential help" cards
  (locale-configurable).
- Tone: bright slice-of-life comedy, light tsundere banter, Mochi's sarcastic cat commentary; quiet sincere beats.
  The game never preaches before it shows: consequence first, lesson card second (two lines max).
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

Routes available after Ch8: `hina`, `mio`, `kaede`, `yuna` (Yuna only if the player asked "what are we?" — flag
`yunaClarity`), plus **`solo`** (choosing to stay single and grow — a fully valid, good route).

### Supporting cast

| ID | Name | Role | Lesson function |
|---|---|---|---|
| `mochi` | **Mochi** | Love-God-in-training cat living in the phone. Narrator, coach, rewinds time | Names the lesson; comic relief |
| `kenta` | **Kenta Mori** | Best friend, loud, loyal | Bro advice — sometimes terrible ("don't reply for 3 days"), sometimes wise; friendships matter |
| `kai` | **"Alpha" Kai** | Online dating-guru streamer selling a course | The *player-side* temptation: negging, control, "never accept no". His tactics always backfire; exposed in Ch15 |
| `ogawa` | **Mr. Ogawa** | Kind café owner, divorced, plays shogi | Mentor; models secure, reflective masculinity; normalises asking for help |
| `mei` | **Mei** | Player's older sister (phone calls) | Reality checks; family support |
| `goto` | **"Manager" Goto** | Runs the scam ring that uses Rei | The real villain behind the romance scam (Ch6, Ch15) |
| `takumi` | **Takumi** | Polished, adored student-council president | A *male* "looks are packaging" lesson: lazy, takes credit (Ch6) |
| `ren` | **Ren** | Stylish classmate with a perfect feed (Part V) | Polished exterior, chaotic private life; borrows and never repays (Ch16) |
| `saki`, `nana` | **Saki**, **Nana** | Classmates in Part V | Bystander help (Saki) and impulse control (Nana) at the welcome party (Ch17) |

**Heroine depth (de-idealisation, never contempt).** Each heroine has an ordinary, flawed private side the player
discovers: Yuna lives on energy drinks and is burnt out by her online persona; Kaede is cool on the track and
hopeless at cooking and homework; Mio writes the player into her novel as a "perfect prince" (projection runs both
ways); Hina is stubborn and quick-tempered; Rei's glamour is a costume she was forced to wear. Discovering these
makes them *more* likeable, never less respected.

## 5. Structure

```
PART I   — "Rose-Tinted"        (2nd year, spring; meeting everyone)          Ch1–Ch4
PART II  — "Behind the Filter"  (2nd year, summer–autumn; de-idealisation)    Ch5–Ch8
   Ch8 ends with "Why her?" → confession → ROUTE LOCK (hina | mio | kaede | yuna | solo)
PART III — "Being Together"     (3rd year; relationship stage, route spine)   Ch9–Ch12
PART IV  — "Real Life"          (3rd year; exams, storms, graduation)         Ch13–Ch15
PART V   — "On Your Own"        (first year after school, 18–19)              Ch16–Ch20 + epilogue
```

Full chapter list with every interaction: [CHAPTERS.md](CHAPTERS.md). Coverage map:

| Topic | Chapters |
|---|---|
| Campus life | 1, 3, 6, 8, 13 |
| Daily life: family, money, part-time job, self-care | 4, 13, 16 |
| Group trips and outings | 2, 5, 17 |
| Dating | 2, 8, 9, 10, 11 |
| Sexual health and protection (non-explicit) | 12 (asking, images, your "not yet"), 18 (talk, protection, testing, ongoing consent, scare) |
| Refusal and impulse control | 5, 12, 17, 18 |
| Scams and manipulation | 1, 2, 3, 6, 7, 19 |
| Career and passion | 2, 6, 7, 13, 15, 20 |
| Breakups | 8 (rejection), 14, 16 |
| Money boundaries | 2, 4, 9, 14, 16, 19, 20 |
| De-idealisation (looks are packaging, projection) | 5, 6, 7, 8, 16, 19 |

Each chapter: **4–6 interactions**, 1–2 comic bad ends, 4–8 new lessons, ~15–25 minutes of play.
Part III–V chapters use **one shared spine** with heroine-specific variant lines (see ARCHITECTURE §4.3). On the
solo route, relationship beats are replayed through Kenta's relationship, friends, family and the player's passion.

## 6. Systems

| System | Stored as | Rules | Teaches |
|---|---|---|---|
| **Connection ♥** (per heroine) | `stats.hina` … | Grows by listening, honesty, keeping promises. Gifts/flattery give tiny or no gains. Rei's is shown as `???` (fake affection) | Love is built, not bought |
| **Trust 🤝** (route partner, Part II+) | `stats.trust` | Starts at 20 on route lock. Drops hard on lies, snooping, control; recovers slowly through repair | Trust is the relationship's bank account |
| **Love IQ 🧠** | `stats.wisdom` | Recognising traps and healthy patterns | Pattern recognition |
| **Self-respect 👑** | `stats.self` | Drops when begging, over-texting, tolerating disrespect, paying for affection, abandoning friends/goals | You can't give what you don't have |
| **Your Life 🌱** *(new, central)* | `life.goal`, `life.passion`, `life.health`, `life.wallet` | Four always-visible meters (0–100; wallet also shows a real ¥ balance). Goal 🎯 = study/career; Passion 🎸 = the hobby chosen in Ch2; Health 💤 = sleep, food, movement, mood; Wallet ¥ = living within your means. Choices that sacrifice them "for her" are always net-negative | Your life is the main story (V2) |
| **Free evenings** *(new)* | per-chapter mini choice | 2–3 evenings per chapter: spend on goal, passion, health, friends or partner. Partner time has diminishing returns after one evening a chapter; goal/passion time compounds (unlocks later scenes, e.g. the Ch6 stage slot, the Ch15 offer, the Ch20 payoff) | Invest where it grows (V3) |
| **Wallet** *(new)* | `life.wallet` + `money` | Allowance + café wages. Overspending options are labelled with their real cost; going below zero triggers a debt state (Ch4, Ch16). No option where spending more is the best outcome | Never spend beyond your means (V4) |
| **Rose Filter 🌹** *(new)* | `stats.proj` | Idealising choices raise it; the heroine's sprite gets a soft-focus sparkle. Above 60, one healthy option per choice is greyed out ("You can't see this through the rose filter") until a fact-check scene lowers it. Ending penalty if high | Infatuation is projection (V6) |
| **Flags** | `flags.*` | Memory of choices (e.g. `reiHasLine`, `hinaBirthday`, `yunaClarity`) used for callbacks | Consequences |
| **Love Notebook** | `lessons[]` | Lesson card after key choices: green = healthy habit, red = pitfall, trap = manipulation tactic | Retention |
| **Bad ends + rewind** | `badEnds[]` | Comic fail screen, rewind to the choice. Lessons learned are kept after rewind | Safe experimentation |
| **Phone** | view state | Chat overlay; future: typing dots, "seen", double-text temptation, reply choices inside the phone | Texting dynamics |
| **Achievements** *(todo)* | `achievements[]` | Unlocked by joke options and milestones (§7) | Replay |
| **Consent check** *(todo)* | choice option `ask:true` | Before any physical step, an **Ask** option always exists; asking never costs Connection | Asking is romantic |
| **Timed choices** *(todo)* | `choice.timer` | Countdown; timeout fires `timeoutOpt` (often "say nothing") | Avoidance is also a choice |
| **Red-Flag Radar** *(todo, Part I)* | per-line `flag:'lovebomb'` | Tap 🚩 on a manipulative line → bonus Love IQ; tapping a healthy line shows "that's a green flag" | Spotting tactics without paranoia |
| **Route map** *(todo)* | derived from script | Flowchart of a chapter's choices; jump back to any explored choice | Replay |
| **Chapter gate** | `stats.wisdom + stats.self` + Your Life average | Ch9+ requires integrity ≥ 0 and Your Life ≥ 20 (else Mochi forces a "remedial lesson" scene) — integrity, not total affection | One honest relationship > many maybes |

### Route lock rule (end of Ch8)
Confession options appear for heroines with Connection ≥ 30 (Yuna also needs `yunaClarity`). If she says no
(Connection < 40), handling it gracefully moves the player to the `solo` route with a friendship bonus.
`solo` is also directly selectable ("I'm not ready — I want to work on myself first").

## 7. Endings & achievements

### Endings
Evaluated in Ch20. **Score weights: Your Life 40% · integrity (Love IQ + Self-respect) 35% · relationship trust 25%**
(on solo, trust is replaced by friendships). The single best ending, `own_story`, is reachable on every route,
including solo. High Rose Filter subtracts from the score.

| ID | Type | Condition (Ch20) |
|---|---|---|
| `own_story` | ★★ Best end | Your Life ≥ 75, Self ≥ 60, Love IQ ≥ 60, Rose Filter ≤ 20, any route. Epilogue: your passion and career thriving; relationships (if any) as equals |
| `true_<route>` | ★ True end (×4) | Trust ≥ 70, Self ≥ 40, Love IQ ≥ 60, Your Life ≥ 55, supported her dream (15-1 ✅) and kept yours (15-2 ✅) |
| `normal_<route>` | Normal end (×4) | Together, but one threshold missed — epilogue shows what to keep working on |
| `kind_goodbye_<route>` | Good end (×4) | Healthy breakup handled with respect (Ch14 or later) — "love that ends well is still love" |
| `solo_growth` | Good end | Solo route, Self ≥ 50 and Your Life ≥ 55 — new friends, your passion, a hint of a future meeting |
| `still_searching` | Normal end | Solo route below the thresholds — Mochi offers "New Game+" |
| `side_character` | Cautionary end | Your Life < 30 on any route: together or not, you gave up your goals, passion, health or money for someone else. "You became a side character in your own story." |
| `bro_end` | Comic good end | Solo route with Kenta Connection maxed — the boys open a ramen stall |
| `rei_friend` | Side ending | `reiRedemption` flag — Rei testifies against Goto, later teaches scam awareness (Ch19); she thanks you for *not* trying to rescue her with money |
| `mochi_graduates` | Secret | All lessons collected — Mochi passes her exam and reveals her true form |
| `bad_*` | Comic bad ends | 27 in total, catalogued in MISTAKES.md; each is instantly rewindable |

### Achievements (examples)
`Leftover Hearts` (notice Hina's hearts) · `MoonRich Investor` (BAD END #1) · `The Council Would Like a Word` ·
`Respect +100` (accept a rejection with grace and buy her a snack) · `Unsubscribed` (close Alpha Kai's video every
time) · `Read at 2:14 AM` (triple-text) · `Professional Furniture Mover` (do 3 favours for Yuna without a date) ·
`Mom Was Right` (take Mei's advice 3 times) · `Touch Grass` (choose your hobby over your phone 5 times) ·
`Plain Love` (reach any true end) · `Main Character` (reach `own_story`) · `Window Shopper` (finish with the wallet never below zero) · `Filter Off` (Rose Filter at 0 in Ch8) · `Oolong Tea` (refuse every drink) · `Professional Disaster` (see every bad end).

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

## 10. What works in educational games and sex education (benchmark)

| Source | What it found | How sim4love applies it |
|---|---|---|
| **UNESCO International Technical Guidance on Sexuality Education** (2018) | Effective programmes are scientifically accurate, age-appropriate, skills-based (communication, refusal, decision-making) and challenge harmful gender norms | Fact cards checked for accuracy; refusal practised in several contexts (Ch5, 12, 17, 18); "behaviours, not genders"; worship *and* contempt both treated as mistakes |
| **PlayForward: Elm City Stories** (Yale play2PREVENT; randomised trial, JMIR 2017) | A narrative game improved sexual-health knowledge and attitudes for 12 months (attitude gains strongest in boys), but did not measurably delay first sex | Games are good at knowledge and attitudes: we invest there. Behaviour needs rehearsed scripts, so healthy options are written as sentences the player can actually say |
| **It's Your Game… Keep It Real** (computer-based + classroom + journaling) | Delayed first sex in the original trial; a later replication did not reproduce the effect | Don't over-claim. Pair play with reflection: the Notebook keeps every lesson, and the Ch20 life review asks the player to look back |
| **Life is Strange** (time rewind), **Florence** (relationship told through play) | Rewind lets players explore consequences without fear; feelings are shown through interaction, not exposition | Free, unlimited rewind after bad ends; consequences shown first, lesson card second |
| **The reference game** (2023) | Comic, shareable bad ends and staggered heroines drive replay | Kept, but the joke is always on the player's mistake, and the scoring rewards integrity and Your Life, not total affection |

Design rules distilled from the above: **show, don't preach** (consequence before label; lesson cards two lines
max) · **consequences carry forward** (flags, Your Life meters, callbacks across parts) · **safe rewind** (mistakes
are explored, not punished) · **rehearse real lines** (refusal and consent scripts) · **accurate facts with a way
to get help** (resource cards; health content to be reviewed by a qualified sex educator before release) · **no
shaming** (Kenta's scam, the passed-out classmate, a breakup: support, not mockery).
