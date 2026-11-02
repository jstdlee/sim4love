# sim4love — Story & Design Research

> Research brief for an **original** anime-style HTML visual novel that teaches young men healthy relationship skills.
> Reference work studied for *design only*: **Love Is All Around** (完蛋！我被美女包围了！, intiny, 2023) and its sequel.
> We do **not** reuse its story, characters, names, scenes or dialogue. Everything in Part B is original.

Research date: 2026-11-02. Note: `en.wikipedia.org` could not be fetched directly from this session (network allow-list), so Wikipedia content was read through the Exa fetch tool instead.

---

## Table of contents

- Part A: What the reference game does
  - A1. Facts at a glance
  - A2. Structure: chapters, routes, branching, endings
  - A3. How choices and affection work (systems)
  - A4. Opening chapter flow (paraphrased)
  - A5. Heroine archetypes and the "trap" each one represents
  - A6. Why it went viral
  - A7. Common criticisms
  - A8. The sequel and the wider "wandan-like" genre (incl. a cautionary case)
  - A9. Design takeaways: keep / change / avoid
- Part B: Recommendations for sim4love
  - B1. Design pillars
  - B2. Core systems
  - B3. Original cast (6 heroines + supporting cast)
  - B4. Six-chapter story outline
  - B5. Endings
  - B6. Love Lessons library (20 cards)
  - B7. Funny fail states and achievements
  - B8. Tone and safety guardrails
- Sources

---

# Part A — What the reference game does

## A1. Facts at a glance

| Item | Detail |
| --- | --- |
| Title | 完蛋！我被美女包围了！ (lit. "I'm done for! I'm surrounded by beauties!"); English: *Love Is All Around* |
| Developer | intiny (global); 小有兴致 / Xiaoyouxingzhi (mainland China) |
| Release | PC (Steam, Epic) 18 Oct 2023; consoles + mobile Aug 2024 |
| Engine / format | Unity; live-action FMV, first-person camera |
| Price | ~42 CNY (~US$6) at launch |
| Content size | ~100+ story branches, 12 main endings, 6 numbered chapters + 5 heroine "personal chapters" |
| Playtime | One run ~4 h; all endings ~8–10 h |
| Reception | Topped Steam China, reached global top 10; peak 60k+ concurrent; ~93–95% positive on 29k–46k reviews; 1.3 billion views on related Douyin/Bilibili hashtags |
| DLC | "Heartbeat in the Room" / *Love In The Room* (Feb 2024): three new heroines (athlete, teacher, STEM PhD) |
| Prequel | *Love is All Around: Echoes of Yesterday* |
| Sequel | *Love Is All Around 2* (16 Jul 2025): ancient-China setting, romance + mystery dual track |

Protagonist: a broke, indebted young man whose art business failed. His face is never shown (pure first-person), so every heroine talks straight into the lens, at the player.

## A2. Structure: chapters, routes, branching, endings

**Macro-structure** (chapter titles paraphrased from the Steam community guide):

| Ch. | Rough theme (paraphrased) | Heroines in focus |
| --- | --- | --- |
| 1 | "Wait, did we... last night?" — wake-up mystery | Heroines 1–3 introduced |
| 2 | "Let's have a savings contest!" — getting a job, a place to live | Same three, deeper |
| 3 | "I like you when you're fierce" | Childhood-friend heiress joins |
| 4 | "Want to come over for dinner?" | Single mom joins |
| 5 | "I've made up my mind, it's you I want" | Cold CEO joins |
| 6 | "To be or not to be" — the final choice | Pick a heroine |
| Personal chapters | One per heroine, plus a hidden ending reachable from all of them | Single heroine |

**Staggered introductions.** Three heroines appear in Chapter 1, then one more in each of Chapters 3, 4 and 5. Each new arrival brings a new "life problem" (debt, a job, a family crisis) and a new setting, which keeps the episodic pacing of a short drama.

**Branching pattern.** Mostly a *linear spine with branching scenes* (string-of-pearls). Each scene ends in a 2–4 option choice. Choices change (a) affection, (b) which short side-scene plays next, and occasionally (c) trigger an *early ending*. The main spine is the same for everyone; variety comes from side-scenes, reactions and endings.

**Ending families** (names paraphrased, not copied as content):

- **Heroine good endings** — one per personal chapter (e.g. a quiet domestic ending, a "travel the world together" ending).
- **"Direct route" (直通) early endings** — max one heroine's affection very early, and the game skips ahead into her ending. Rewards single-minded devotion.
- **Hidden "destiny" ending** — a secret online pen-pal from earlier turns out to be one of the heroines. Unlocked only if you made a specific off-the-wall set of answers in Chapter 2 and keep her affection above 50%. It can be triggered from inside *any* other heroine's personal chapter — a clever reward for replay.
- **Bad endings** — reached when a heroine's heart meter "breaks" (affection bottoms out) at a key scene. Several are dark-comic (e.g. the player ends up in a graveyard; trouble in a back alley; a fable-titled betrayal ending after taking a bribe that bankrupts a heroine).
- **Honesty test ending** — in one personal chapter the heroine runs a rapid "trap question" quiz ("Did you notice what changed about me?", "Have you dated others?"). Lie and you get a Pinocchio-themed ending; tell the truth and you get the girlfriend.
- **Alone / bro endings** — end up single, or end up best friends with the male sidekick.

**Chapter 6 gate.** At the final choice, you can only enter the personal chapter of a heroine whose affection is above 50%.

## A3. How choices and affection work (systems)

1. **Per-heroine affection** shown as hearts (`+`, `++`, `-`, `--`, a cracked heart when broken). A heart meter is shown at chapter end.
2. **Zero-sum choices.** Many choices are "who do you give the cake to / whose party do you go to / whose apartment do you move into" — `+` for one, `-` for all others. This is what creates the "surrounded" tension.
3. **Chapter gating by *total* affection.** To unlock the next chapter, the *sum* of all heroines' affection must pass a threshold. Players must keep everyone happy. Reviewers flagged this as the biggest friction point (and it quietly rewards juggling partners).
4. **Timed choices.** A countdown bar on many choices. If it runs out, a default fires — sometimes a hidden branch. "Silence" is a real choice.
5. **Exploration scenes.** Point-and-click hotspots in each heroine's home (paintings, calendar, cups) reveal character detail before the story continues.
6. **Text-message mini-scenes.** Choose replies in a phone UI; some replies cost affection (e.g. vain or crude replies).
7. **Route map + rewind.** Each chapter ends with a flowchart of explored nodes; players can jump back to any choice. Replay is the core loop; a 100% exploration percentage drives completionists.
8. **Joke achievements.** Deliberately terrible options unlock named achievements (e.g. choosing to "fix" a torn dress with tape; claiming to be the cleaner; asking the landlord to let you live with him). There's a meta-achievement for choosing *every* clown option.
9. **Collectible "bears" and a popularity leaderboard.** Earned via chapters and achievements, then "gifted" to your favourite character, feeding a global popularity ranking (the male sidekick sitting at #6 became a running joke).
10. **Off-the-wall answers are sometimes correct.** An absurd joke answer about a painting earns *more* affection from the intellectual heroine than a "correct" art-critic answer — sincerity and humour beat performing.

## A4. Opening chapter flow (paraphrased, our words)

1. **Cold open — hangover mystery.** The player wakes in an unfamiliar, expensive apartment with no memory of last night.
2. **Exploration.** Click around the room to learn whose place this is (artworks, calendar, dishes).
3. **Awkward first encounter.** A glamorous woman appears; a wardrobe malfunction gives an instant "gentleman or creep?" choice (help discreetly / offer your jacket / do something absurd that becomes a joke achievement).
4. **The loaded question.** She asks whether "something happened" between you last night. Options: say yes, say no, dodge. Dodging lowers her opinion; the scene teases the player's integrity.
5. **Second woman enters.** The actual homeowner — calm, sophisticated — asks if you even remember how you met. It's a *timed* choice; guessing wrong or flippantly costs affection.
6. **Flashback.** A memory of meeting her at an art exhibition; a sincere, slightly goofy comment wins her over more than a pretentious one.
7. **Goodbye style.** Wave / handshake / hug — calibrating physical closeness.
8. **Breakfast dilemma.** Both women invite you; choose one (the other is mildly hurt) or freeze (both are annoyed).
9. **Third woman.** Outside, a sweet young woman asks the same "do you remember?" question; crude or defensive answers hurt her a lot.
10. **Phone phase.** Exchange messages with all three; one vain reply is a trap.
11. **Where will you live?** The comic best friend arrives; you choose a shared flat or crashing with him. The chapter closes on slapstick between the two guys.

**Why this opening works (structurally):** a mystery hook in the first 10 seconds; three archetypes introduced in ~15 minutes, each in a different emotional register (seductive / composed / innocent); a repeated question ("do you remember?") reframed three times; first choices test *manners and honesty*, not "pickup skill"; ends with a light comic beat and a reason to come back (housing, money).

## A5. Heroine archetypes and the "trap" each represents

Described as archetypes only. The game itself is wish-fulfilment and rarely *frames* these as lessons; the "lesson" column is our design reading.

| # | Archetype (how it's presented) | What the route rewards | Relationship trap / lesson we can extract |
| --- | --- | --- | --- |
| 1 | **The Femme Fatale** — party-loving, flirtatious, intense, possessive, dramatic; has a dark-comic "you're dead to me" extreme | Going along with her impulses ("whatever makes her happy"); passing her rapid-fire honesty quiz | Intensity ≠ intimacy. Possessiveness and "loyalty tests" are red flags, but her quiz also shows **honesty beats clever lies**. |
| 2 | **The Intellectual Older Sister** — composed curator, high standards, aloof "high-mountain flower" | Sincerity, humour, being yourself; a hidden pen-pal connection | Pedestalising someone "out of your league"; real connection comes from authentic conversation, not performance. |
| 3 | **The Innocent Girl-Next-Door** — fresh graduate/intern, sweet, earnest; bad ending if you treat her carelessly | Protecting her, keeping promises, showing up for milestones (posing as family at her graduation) | The "pure" archetype hides a trap: mistaking someone's kindness for a guarantee; carelessness and crude jokes cause real hurt. |
| 4 | **The Spoiled Heiress / Childhood Friend** — bratty, competitive, offers to wipe out the hero's debt; old childhood "marriage promise" | Playful rivalry, standing your ground | **Being "saved" by money** — dependency and imbalance; nostalgia pressure ("you promised when we were kids"). |
| 5 | **The Single Mom** — warm, mature, practical, a child in the picture; a dangerous ex-partner subplot | Defending her, accepting her child, being responsible | Respecting someone's existing commitments; **stepping up vs. being a fantasy**; real-life complications (ex, kids, safety). |
| 6 | **The Ice-Cold CEO** — powerful boss who promotes the hero instantly; betrayal bad ending if he takes a rival's bribe | Integrity at work, loyalty under temptation | Power imbalance and workplace romance; the **"farmer and the snake"** ending = betraying someone who trusted you. |
| + | **The Loyal Bro** — comic sidekick, real-estate agent; has his own "bromance" ending | Friendship | Friends as a support system (and comic relief). |

DLC archetypes (athlete, teacher, STEM PhD) follow the same pattern: one "life domain" per heroine.

**Key observation for us:** the game's women are mostly *devoted from the start* (scholar Kong Degang: "players don't need to work to earn affection... the challenge lies in choosing... without causing jealousy"). It is about **managing** many admirers, not building one healthy relationship. That is exactly the habit we want to *un-teach*.

## A6. Why it went viral

1. **Direct-to-camera POV.** Actresses look into the lens and speak to "you". Combined with a faceless protagonist this produced very strong immersion and endlessly clippable reaction shots.
2. **Overacted, self-aware comedy.** Push Square called it "laugh-out-loud stupid" and "perfectly overacted"; it's played with friends to see silly outcomes. The game knows it's absurd.
3. **Funny fail states as content.** Joke options with named achievements were made to be screenshot and shared. Bad endings are often dark-comic rather than depressing. Streamers chase "all clown choices".
4. **Short-drama rhythm.** Scenes mirror the 1–15-minute vertical micro-drama format Chinese audiences binge.
5. **Cheap price and low barrier.** ~$6, mouse-only, no skill required.
6. **Emotional need.** Southern Weekly and academic papers argue it met a neglected need among young men facing dating anxiety, economic pressure and loneliness; a highly upvoted English review: "very nice game but a bit unrealistic based on the fact that attractive women actually talk back to me."
7. **Casting & parasocial buzz.** Actresses gained huge followings (one roughly tripled her Douyin followers to 1M+ in a week); the popularity leaderboard turned fandom into a game.
8. **Replay hooks.** Route maps, 100% exploration, the cross-route hidden ending.
9. **Breaking genre expectations.** Analysts noted it brought FMV out of niche mystery games into mass-appeal romance, while dropping the anime art style that limits traditional galgames.

## A7. Common criticisms

- **Male gaze and stereotypes.** Women are flat "database" archetypes; their love is unearned (Sixth Tone, DiGRA paper, Porcelain journal). Women act as "social mobility proxies" (they pay debts, give homes and promotions).
- **The protagonist becomes a cheater on replay.** Because all routes are interleaved in each chapter, the hero reads as "a womaniser who can't do anything" (17173 review).
- **Affection-sum gating** forces you to please everyone; choosing honestly can soft-lock progress.
- **Shallow, cliché script; insta-romance; disjointed routes** (one heroine pops in and out with little logic).
- **Technical:** always-online DRM, low video resolution, awkward UI, partial dubbing.
- **Sequel:** better production, but fragmented arcs and abrupt endings.

## A8. The sequel and the wider genre

**Love Is All Around 2 (2025).** Same studio, partly returning cast, but a new ancient-China world: the hero survives a massacre of his family and investigates the fire. Six heroines (two sisters from a merchant house, an assassin, a courtesan who first tries to kill him, a princess, a frail poet). New idea: a **dual track** — following love may cost you the truth of the mystery, and vice versa. It added letter-writing, AI chat and in-game bullet comments. Critics praised production but called middle chapters fragmented and endings abrupt.

**"Wandan-likes".** The game spawned a sub-genre of one-man-many-women FMV dating games (DiGRA analysis of 16 such titles): affection meters, reversible choices, achievements for exhausting romantic options.

**Cautionary case — *Revenge on Gold Diggers* / 《捞女游戏》 (2025).** An FMV "anti-scam" game about pig-butchering romance fraud: 7 chapters, 472 minutes, 200+ choices, 38 endings; sold 1M+ copies. But **every scammer was a woman**; critics (incl. state media and academics) said it framed a whole gender as fraudsters. It was renamed "Emotional Anti-Fraud Simulator" within a day and its director was banned on several platforms. Its defenders cited real data (~2bn CNY lost to romance scams in 2023).
**Lesson for sim4love:** teach *behaviours and tactics*, never "this kind of woman". Scams must be shown as run by criminal operations (often male-run, using fake personas), and the player character must also be shown capable of unhealthy behaviour.

## A9. Design takeaways

**Keep**
- Faceless first-person protagonist; heroines addressing "you" (in anime style: close-up portraits, direct gaze sprites).
- Hook-first openings, short scenes, a comic close on every chapter.
- Timed choices where *silence is a choice*.
- Exploration hotspots that reveal character.
- Joke options with named achievements; dark-comic (never cruel) fail states.
- Route map with rewind; a hidden ending that rewards replay.
- Honesty tests that reward truth over cleverness.
- Sincere-and-goofy beats "smooth" answers.

**Change**
- Replace "keep everyone happy" gating with **gating by integrity** (self-respect + honesty).
- Make heroines **have their own goals**; affection is earned and can say no.
- Make zero-sum choices about *values*, not about which girl gets the cake.
- Make juggling partners visibly lead to a funny-but-clear bad ending.

**Avoid**
- Women as money/status rewards.
- Gendering of scams or "gold digger" framing.
- Shame-based lessons; lecturing tone.

---

# Part B — Recommendations for sim4love

## B1. Design pillars

1. **Fun first, lesson second.** Every scene must be enjoyable without the lesson card.
2. **You're the variable.** The player's own behaviour (neediness, pushiness, honesty) matters as much as the heroines'.
3. **Behaviours, not genders.** Red flags are tactics anyone can use. Include a male manipulator and a male good role model.
4. **Every heroine is a person.** Even the "trap" routes have a human reason and a path where the player handles it well (sometimes that's a kind goodbye).
5. **Healthy is attractive.** The best endings come from secure, honest, respectful choices — and they should be the most romantic scenes in the game.

## B2. Core systems (original)

| System | How it works | What it teaches |
| --- | --- | --- |
| **Connection meter** (per heroine) | Real trust/closeness, grows slowly through honesty, listening and keeping promises. Not raised by gifts or flattery. | Love is built, not bought. |
| **Self-Respect meter** (player) | Drops when the player begs, over-texts, tolerates disrespect, sends money, abandons friends. Rises with boundaries and honest "no"s. | You can't give what you don't have. |
| **Red-Flag Radar** | A small flag button on any line of dialogue. Correctly flag a manipulation tactic → "Flag spotted!" + Love Lesson card. Flagging a healthy line ("Can we talk tomorrow? I'm tired") shows a gentle "That's actually a green flag". | Pattern recognition without paranoia. |
| **Consent check moments** | Before any physical step (hug, hand-holding, kiss), the game offers an "Ask" option. Asking never costs Connection. Skipping asking with a heroine who isn't comfortable gives a firm stop and a lesson. | Asking is romantic. "No" ends the moment, not the person. |
| **Phone UI** | Chat app with typing dots, read receipts, "seen" pressure, double-text temptation. | Texting anxiety, pacing, love bombing, scams. |
| **Timed choices** | Countdown; default is silence, which has its own consequence. | Avoidance is a choice too. |
| **Gating by integrity** | Chapters unlock based on Self-Respect + honesty, not total affection. Juggling heroines dishonestly triggers the "Fish Pond" comic bad end. | One honest relationship > many maybes. |
| **Route map + rewind** | Flowchart per chapter; rewind any choice. A "Why?" button on each node shows the lesson. | Safe experimentation. |
| **Love Lesson cards** | Pop after key choices (see B6), collected in a "Journal". | Retention. |

## B3. Original cast

All names, designs and personalities are original to sim4love. Setting: a fictional mid-size city, the protagonist (default name editable, e.g. "Haru") is 20, just moved for his first job / college transfer, a bit lonely and broke.

### Heroines

#### 1. Aoi Minase — "The Sincere One" (true route)
- **Look:** short dark-blue bob, paint-stained hoodie, bike courier bag.
- **Who she is:** a part-time illustrator and bike-repair shop worker. Direct, warm, a little awkward, says what she means. Has her own dream (a comic) and won't drop it for anyone.
- **Behaviour pattern:** consistent replies, makes plans and keeps them, says "I'm busy tonight, Thursday?" instead of ghosting, disagrees kindly.
- **Lesson:** **Healthy communication & secure love.** Boring-looking consistency is actually what love feels like. She rejects the player if he copies "guru" tactics (negging, playing games) — "Why are you being weird? Just talk to me."
- **Trap for the player:** mistaking calm for "no spark" and chasing drama instead.

#### 2. Rin Kurosawa — "Hot-and-Cold"
- **Look:** long black hair, silver earrings, band T-shirt, guitar case.
- **Who she is:** a charismatic campus band vocalist. Some days she's all-in (late-night calls, "you're the only one who gets me"), then disappears for a week, then acts like nothing happened.
- **Behaviour pattern:** intermittent reinforcement — the unpredictability makes the player crave her more.
- **Lesson:** **Hot-and-cold manipulation / mixed signals.** Inconsistency is information. Ask once, clearly; if the pattern continues, step back. Her good ending is a mature talk where she admits she's avoidant and not ready — and they part kindly, or rebuild slowly only after she changes behaviour (not promises).
- **Trap:** chasing, over-texting, waiting by the phone → Self-Respect drain.

#### 3. Sakura "Saki" Amamiya — "The Love Bomber"
- **Look:** pastel pink twin tails, oversized cardigan, heart hairclips, always holding a gift.
- **Who she is:** a sparkling new coworker. Day 2: "I think we're soulmates." Day 5: matching keychains. Week 2: "Why were you with your friends? I thought we were special." Week 3: wants your phone password.
- **Behaviour pattern:** overwhelming affection → fast commitment → isolation from friends → guilt and control.
- **Lesson:** **Love bombing and control.** Real intimacy has a pace; "too much, too soon" plus "only me" is a red flag. Her route rewards slowing down and keeping friends; she's written with a sympathetic backstory (fear of abandonment) and a referral to get help, not as a villain.
- **Trap:** feeling flattered and saying yes to everything.

#### 4. "Lily" — "The Perfect Stranger" (pig-butchering scam)
- **Look:** flawless profile photos — sunny café, yacht, designer bag. Only ever appears through the phone.
- **Who she is:** a "wrong number" message that turns into daily good-morning texts, shared dreams, then tips on a "guaranteed" crypto platform her "uncle" uses. Never video calls ("my camera is broken").
- **Twist (important for tone):** "Lily" isn't a real woman. The final reveal shows a scam compound where a team — led by a man reading a script — runs dozens of "Lily" accounts with stolen photos. The point is **the tactic**, not a gender.
- **Lesson:** **Romance & investment scams (pig-butchering).** Never send money, gift cards or crypto to someone you've never met; insist on a live video call; a small "profit" withdrawal is bait. Report and talk to someone.
- **Trap:** sunk-cost ("I've already put in so much").

#### 5. Natsuki Arai — "The Fish-Pond Queen" (being kept as backup)
- **Look:** stylish, glossy brown waves, always on her phone, effortless social-media glamour.
- **Who she is:** popular, fun, and keeps several guys in "talking stage" limbo. She calls the player when bored or when she needs a ride, laptop fixed, or homework done, then says "you're like my best friend" when he asks what they are.
- **Behaviour pattern:** breadcrumbing, using people as backups ("备胎" / spare tire), never defining the relationship.
- **Lesson:** **Self-respect and asking for clarity.** If you have to wonder whether you're an option, you have your answer. Her good ending: player asks clearly once, she admits she isn't interested romantically, they stay casual acquaintances with healthy boundaries; she even respects him more.
- **Trap:** doing favours to "earn" love; being a "nice guy" with a hidden agenda.
- **Mirror note:** the protagonist can *also* become the fish-pond keeper if he juggles heroines — the game shows that from the other side.

#### 6. Yui Tachibana — "The Friend Who Says No"
- **Look:** sporty ponytail, track jacket, convenience-store snacks.
- **Who she is:** the protagonist's childhood friend who moved to the same city. Loyal, funny, roasts him relentlessly. She likes him **as a friend** — and says so clearly when he confesses.
- **Behaviour pattern:** clear, kind boundaries.
- **Lesson:** **Respecting "no" and consent.** A "no" isn't a challenge or a "not yet". The best outcome on her route is staying great friends — she later becomes his wing-woman and the person who tells him when he's being an idiot. Pushing ("but I did so much for you") triggers a comic-but-pointed fail state and loses the friendship.
- **Trap:** the "friend zone" resentment mindset; persistence-as-romance myths.

### Supporting cast (male characters matter!)

| Character | Role | Lesson function |
| --- | --- | --- |
| **Kenta Mori** — best friend, roommate, food-delivery rider | Comic relief, bro-route ending, sometimes gives *bad* advice ("Just don't text her back for 3 days, bro") and sometimes great advice | Friends matter; not all bro advice is good; vulnerability between guys is OK |
| **"Alpha" Kai Ryuzaki** — online dating "guru" streamer | Antagonist voice. Sells a course on negging, pressure tactics, "never take no for an answer". Appears as pop-up videos when the player is insecure. | Manipulation is a *player-side* trap too. Using his tactics always backfires; the final chapter exposes his course as a scam. |
| **Mr. Ogawa** — older café owner, divorced, kind | Mentor; plays chess with the player | Models secure, reflective masculinity; normalises asking for help |
| **Haru's older sister Mei** — via phone calls | Reality checks, sibling humour | Healthy family support; "Have you eaten? Also, she sounds controlling." |

## B4. Six-chapter story outline (original)

Premise: **"Haru's First Year"** — a lonely 20-year-old moves to a new city and, within one chaotic month, his empty social life suddenly fills up. The game asks: *which of these is love, and which is a trap?*

### Chapter 1 — "Three Notifications"
- **Cold open (hook):** Haru wakes at 3 a.m. to his phone buzzing: three different messages from three people he barely knows. "Who are you, and why do I have your number?"
- **Scene flow:** rewind to moving day → a bike chain snaps, Aoi helps fix it (first choice: let her teach you vs. insist "I've got it" vs. joke achievement for trying to fix it with your teeth) → first day at work, Saki gifts him a handmade lunch and asks for his number within an hour → a "wrong number" text from Lily arrives → evening: Kenta drags him to a gig where Rin sings and stares right at him.
- **Choice themes:** honesty about who you are; asking vs. assuming; replying pace.
- **Lessons unlocked:** "Manners are attractive", "Reply when you can, not when you panic", "A wrong number is not a meet-cute".
- **Comic close:** Kenta eats Saki's lunch; it had a love note inside addressed to Haru.

### Chapter 2 — "The Talking Stage"
- **Introduces:** Natsuki (needs help moving furniture; flirts; vanishes).
- **Flow:** group hangout → texting mini-game across five chats (double-text temptations) → first "Alpha Kai" pop-up ad when Haru feels ignored → Rin's first hot phase (2 a.m. voice call) followed by silence.
- **Systems tutorial:** Red-Flag Radar, Self-Respect meter.
- **Key choice:** Natsuki asks Haru to skip Kenta's birthday to drive her somewhere. Go / say no kindly / timer runs out.
- **Lessons:** "Breadcrumbs aren't a meal", "Hot-and-cold isn't chemistry", "Your friends aren't optional".

### Chapter 3 — "Too Much, Too Soon"
- **Focus:** Saki's love bombing escalates (soulmate talk, matching items, jealousy of Yui).
- **Introduces:** Yui (childhood friend arrives in town; instant banter).
- **Flow:** surprise "anniversary" party for a two-week relationship → Saki asks for his phone password → Lily shares a crypto "opportunity" and a fake small profit → Aoi's comic deadline; Haru can help her hit it (supportive) or try to impress her (performative).
- **Key choices:** setting the first boundary with Saki; taking the "small profit" or not.
- **Lessons:** "Love has a speed limit", "Privacy is not a betrayal", "If it sounds too good to be true...".

### Chapter 4 — "The Confession"
- **Focus:** Yui + consent.
- **Flow:** festival night; fireworks; Haru's big confession to Yui. She says no, kindly and clearly. Options: accept gracefully / "I'll change your mind" / list everything he did for her (fail state). Alpha Kai's video: "No means try harder" — the player can call it out.
- **Also:** consent check moment with Aoi (hand-holding) — asking makes the moment *better*.
- **Natsuki:** Haru learns he's one of four guys she's "talking to".
- **Lessons:** "No is a complete sentence", "Asking is romantic", "You don't earn people with favours".

### Chapter 5 — "Red Flags, Green Flags"
- **Focus:** Lily's scam closes in; Rin's pattern repeats; Saki's crisis.
- **Flow:** Lily needs "just $500 for a fee to unlock your profits" → Haru can send it, stall, or demand a live video call. Mr. Ogawa notices his stress. → Rin returns as if nothing happened — clear conversation option. → Saki threatens to "disappear" if he goes to Kenta's thing; the game models responding with care *and* contacting a trusted person/hotline, not giving in.
- **Twist:** reveal of the scam compound (the man behind "Lily") — and that Alpha Kai's "premium course" uses the same payment wallet.
- **Lessons:** "Never send money to someone you haven't met", "A threat is not love", "Inconsistency is information".

### Chapter 6 — "What Love Actually Is"
- **Final structure:** first a clean-up: reporting the scam, a kind ending with Rin, a boundaried peace with Saki, an honest last word with Natsuki, a friendship reaffirmed with Yui.
- **Final choice:** only heroines with high Connection **and** a player with healthy Self-Respect unlock a romance ending. Aoi's true route culminates in a quiet, funny, honest date — the most romantic scene in the game — where she asks what *he* wants for his life, not just from her.
- **Epilogue:** a year later, Haru helps Kenta through his first heartbreak, using the Journal.

## B5. Endings (original)

| Ending | Trigger | Tone |
| --- | --- | --- |
| **True Ending: "Plain Love"** | Aoi route, high Connection + high Self-Respect, no juggling | Warm, earned |
| **"Kind Goodbye"** (Rin) | Clear conversation, no chasing | Bittersweet, healthy |
| **"Slow Rebuild"** (Rin, hidden) | Clear boundary in Ch.2 + Ch.5; she changes behaviour | Hopeful |
| **"Healthy Distance"** (Saki) | Boundaries kept, support offered | Mature |
| **"Wingwoman"** (Yui friendship) | Accepted her "no" gracefully | Funny, wholesome |
| **"Scam Buster"** (Lily) | Refused all payments, demanded a video call, reported | Triumphant |
| **"Main Character Energy"** (single + whole) | High Self-Respect, chose no romance | Positive — being single is a good ending |
| **"Bro Forever"** | Max Kenta friendship | Comedy |
| Bad: **"The Fish Pond"** | Player juggles 3+ heroines dishonestly; they all meet at the same café | Comic exposure |
| Bad: **"Wallet.exe Has Stopped"** | Sent money to Lily | Dark comic + resources |
| Bad: **"Password Prison"** | Gave in to every Saki demand; lost all friends | Unsettling-comic |
| Bad: **"Waiting Room"** | Kept waiting for Rin; months pass, phone in hand | Melancholy comic |
| Bad: **"Persistence Is Not Romance"** | Kept pushing Yui after "no" | Pointed, short, not cruel |
| Bad: **"Alpha Kai's #1 Student"** | Used guru tactics on multiple heroines | Satire; everyone blocks him |

Every bad ending ends with a **"What went wrong?" recap** and a one-click rewind to the key choice.

## B6. Love Lessons library (20 cards)

Each card: title + two-sentence takeaway. Shown after relevant choices and collected in the Journal.

1. **Love Is Consistent** — Healthy love feels steady, not like a rollercoaster. If you're always anxious about where you stand, that's a signal, not chemistry.
2. **No Is a Complete Sentence** — When someone says no, the conversation about that thing is over. Respecting it gracefully keeps your dignity and often keeps the friendship.
3. **Asking Is Romantic** — "Can I hold your hand?" is not awkward; it shows care and confidence. Consent is ongoing, and anyone can change their mind at any time.
4. **Love Has a Speed Limit** — Soulmate talk, big gifts and "only you" in the first weeks can be love bombing. Real intimacy grows at a pace that leaves room for both lives.
5. **Inconsistency Is Information** — When someone is warm then cold on repeat, believe the pattern, not the good days. Ask once, clearly, and decide based on what they do next.
6. **Breadcrumbs Aren't a Meal** — Occasional attention that keeps you hoping is not a relationship. If you have to wonder whether you're an option, you already know.
7. **You Can't Earn Someone with Favours** — Kindness with a hidden expectation is a transaction, not generosity. Help people because you want to, and ask directly for what you want.
8. **Never Send Money to Someone You Haven't Met** — Romance scams build trust for weeks, then introduce an "opportunity" or emergency. No real partner needs your crypto, gift cards or wire transfer.
9. **The Small Win Is the Bait** — Scam platforms let you withdraw a little "profit" to hook you for more. If you can't verify it independently, walk away and report it.
10. **Demand a Live Video Call** — A broken camera every single time is a script, not bad luck. Real people can show up, even awkwardly.
11. **Privacy Is Not Betrayal** — Healthy partners don't need your passwords or location 24/7. Trust is built by behaviour, not surveillance.
12. **Your Friends Aren't Optional** — Someone who pulls you away from friends and family is shrinking your world. Love should add to your life, not replace it.
13. **A Threat Is Not Love** — "I'll hurt myself if you leave" is a crisis, not a reason to give in. Take it seriously, get a trusted adult or helpline involved, and keep your boundary.
14. **Neediness Isn't Love, It's Fear** — Double-texting, constant checking and panic when they're offline come from anxiety. Build a full life — hobbies, friends, goals — so love is a bonus, not oxygen.
15. **Self-Respect Is Attractive** — People trust someone who can say "That doesn't work for me." Begging and tolerating disrespect teach others how to treat you.
16. **Honesty Beats Clever Lines** — Scripts and tricks might get a reaction, but they never get you known. The right person likes the real, slightly awkward you.
17. **"Pickup Gurus" Sell Insecurity** — Tactics like negging and pressure are manipulation, and they backfire with healthy people. If a course teaches you to ignore "no", it's teaching you to hurt people.
18. **Calm Isn't Boring** — If you're used to drama, peace can feel like "no spark". Give steady, kind people a real chance.
19. **One Honest Choice > Many Maybes** — Keeping several people on hold hurts them and you. Be clear about what you want, even if it means fewer options.
20. **Being Single Is a Good Ending** — A relationship isn't a scoreboard for your worth. Knowing yourself and your values is the foundation for any future love.
21. **Disagreement Isn't Disaster** — Healthy couples argue about things without attacking each other. "I feel..." works better than "You always...".
22. **Ask Once, Clearly** — "Are we dating, or just friends?" is a fair question. Their answer — or their dodge — is your answer.

## B7. Funny fail states and achievements (original ideas)

Keep the reference game's best design trick — absurd options as rewards — but point the joke at the *mistake*, never at a heroine.

- **"Chain Reaction"** — Try to fix Aoi's bike chain with your teeth.
- **"Read at 2:14 a.m."** — Send Rin 7 messages in a row.
- **"Tuesday Is Our 2-Week Anniversary"** — Attend Saki's party for a relationship you never agreed to.
- **"Uncle Crypto Sends His Regards"** — Ask Lily for her uncle's LinkedIn.
- **"Professional Furniture Mover"** — Help Natsuki move three times without a single date.
- **"Respect +100"** — Accept Yui's "no" with a joke and buy her a snack.
- **"Unsubscribed"** — Close Alpha Kai's ad 10 times.
- **"The Café Incident"** — Trigger the Fish Pond ending.
- **"Mom Was Right"** — Take Mei's advice three times.
- **"Plain Love"** — Reach the true ending.
- **"Touch Grass"** — Choose the gym/hobby option instead of checking your phone, 5 times.
- **Meta achievement: "Professional Disaster"** — Unlock every comic fail option.

## B8. Tone and safety guardrails

- **No gendered villainy.** Lily's scam is run by an operation; the guru is male; the protagonist can be the "fish-pond keeper". All tactics are presented as gender-neutral behaviours.
- **No sexual content; teen-friendly.** Romance is hand-holding, a consented kiss at most.
- **Sympathetic complexity.** Love bomber and hot-and-cold heroines get backstories and dignified endings.
- **Helpful resources.** Scam and crisis endings link to generic resources ("talk to a trusted adult", "report scams to local police / anti-fraud centre", "contact a crisis line in your country") — keep them configurable for locale.
- **No lecturing.** Lesson cards are short, optional to expand, and witty. The scene does the teaching; the card just names it.
- **Rewind is free.** Mistakes are for learning, not punishment.

---

## Sources

- Wikipedia (en), *Love Is All Around (video game)*: https://en.wikipedia.org/wiki/Love_Is_All_Around_(video_game)
- Wikipedia (zh), 完蛋！我被美女包围了！: https://zh.wikipedia.org/wiki/完蛋！我被美女包围了！
- Steam store, Love Is All Around: https://store.steampowered.com/app/2322560/
- Steam store, Love is All Around 2: https://store.steampowered.com/app/3282390/Love_is_All_Around_2/
- Steam reviews: https://steamcommunity.com/app/2322560/reviews/
- Steam community guide (chapters, endings, achievements, systems): https://steamcommunity.com/sharedfiles/filedetails/?id=3056926398 and https://steamcommunity.com/sharedfiles/filedetails/?id=3059007695
- GamerSky full-chapter walkthrough with affection effects: https://www.gamersky.com/handbook/202310/1659817.shtml and https://www.gamersky.com/handbook/202310/1661128_2.shtml
- GamerSky heroine route guide: https://www.gamersky.com/handbook/202310/1660649.shtml
- Ali213 chapter 1 guide: https://gl.ali213.net/html/2023-10/1194257.html
- 360game walkthrough: https://v5.360game.360.cn/gknow_article/content?id=6542173e1758f4f551490def
- 3loumao endings guide: https://game.3loumao.org/808118816?language=zh-tw
- 17173 review (criticisms, gating, protagonist reading as a cheater): https://newgame.17173.com/game-demo-1035822.html?demoId=2604
- Sixth Tone, "Love Bytes": https://www.sixthtone.com/news/1014279
- Push Square review (PS5): https://www.pushsquare.com/reviews/ps5/love-is-all-around
- ReviewForge Steam sentiment summary: https://reviewforge.io/en/games/love-is-all-around-2322560
- DiGRA paper on "wandan-likes" (Navarro Remesal): https://dl.digra.org/index.php/dl/article/download/2685/2675
- Cao & Alimu, "Click for 'Being Loved'": https://porcelainpublishing.com/journal/IVC/1/1/10.47297/ppiivc2025010102
- Full Motion Emotion review of LIAA 2: https://fullmotionemotion.com/love-is-all-around-2-review/
- Steam reviews of LIAA 2: https://steamcommunity.com/app/3282390/reviews/?browsefilter=toprated
- 17173 on LIAA 2: https://news.17173.com/content/07212025/070059607.shtml
- Douban review of LIAA 2: https://www.douban.com/review/16863763/
- CNA on *Revenge on Gold Diggers*: https://www.channelnewsasia.com/east-asia/china-revenge-gold-diggers-video-game-sexism-backlash-dating-scam-5228006
- BBC (en): https://www.bbc.com/news/articles/c0rvzw1jk2do
- BBC 中文: https://www.bbc.com/zhongwen/articles/cm2lx0j55jpo/simp
- Steam, Revenge on Gold Diggers: https://store.steampowered.com/app/3350200/Revenge_on_gold_diggers/
