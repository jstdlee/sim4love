# sim4love — Chapter Design (Ch1–Ch10)

How to read this:
- Each chapter lists **scenes** in order. Each **interaction** (`2-3` = chapter 2, interaction 3) gives the setup and
  options. Marks: ✅ healthy · ⚠️ mild mistake · ❌ mistake · 💀 bad end (rewindable).
- `fx` are suggested stat changes (`♥` = the focused heroine's Connection, `🤝` trust, `🧠` Love IQ, `👑` Self-respect).
  Tune freely; keep ✅ options clearly best in total.
- `→ lesson` is the lesson ID unlocked (defined in `js/lessons.js`; new IDs listed in [MISTAKES.md](MISTAKES.md)).
- `⚑ flag` = flag set for later callbacks.
- In Part II/III, **`H`** means the route heroine. Variant lines per heroine are listed under *Route variants*.
- Every chapter ends with the results screen and a Mochi summary line.
- Write dialogue in the established voice (see `js/chapter1.js`): short lines, comedic narration, Mochi's sarcasm, sincere quiet beats.

---

# PART I — Getting to Know You

## Chapter 1 — "Spring, Again" ✅ IMPLEMENTED (`js/chapter1.js`)
First school day. Mochi appears. One interaction per heroine.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 1-1 | Hina brings "leftover" heart tamagoyaki | ✅ notice & thank (♥+15) · ⚠️ tease (♥+5) · ❌ keep scrolling (♥−10) | appreciation / teasing / presence |
| 1-2 | Rei bumps into you: "soulmates", crypto app | 💀 invest savings → BAD END #1 *The Soulmate Portfolio* · ✅ "we just met" · ⚠️ give LINE, refuse money ⚑`reiHasLine` | romancescam / lovebomb |
| 1-3 | Mio drops her book in the library | ✅ ask, listen, leave before it's awkward · 💀 grab her hand → BAD END #2 *The Council Would Like a Word* · ❌ mock the book | signals / consent / mockery |
| 1-4 | Kaede stands you up, "you actually waited? 😏" | ❌ "I'll wait every day ♡" · ✅ calm, clear reply ⚑ (Ch2 date is real) · ❌ revenge story | hotcold / clearwords / games |
| 1-5 | Yuna: homework + concert ticket, karaoke with 3 "besties" | ❌ do it all · ✅ help study, decline ticket, "what are we?" · 💀 14 jealous texts → BAD END #3 *Message Not Delivered* | fishpond / clarity / neediness |

**Todo for Ch1:** set flags used later — `hinaHearts` (1-1 ✅), `kaedeReschedule` (1-4 ✅), `yunaClarity` (1-5 ✅), `mioVol3` (1-3 ✅); Hina mentions her birthday is "next Friday" in the morning scene → `hinaBirthdayKnown`.

---

## Chapter 2 — "The Group Date"
**Setting:** Saturday, Sakura Land amusement park → karaoke. **New:** Kenta (organiser), Alpha Kai (phone ads).
**Goal:** the "talking stage" in a group — conversation skills, showing off, and the first manipulation the *player* is tempted by.

**Opening:** Kenta bursts in: "Bro. I organised a group date. Five girls said yes." (Three said maybe.) Hina, Mio (dragged by Hina), Kaede and Yuna come. Rei texts all day if `reiHasLine`.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 2-1 | 40-minute queue for the coaster, standing next to Mio | ❌ monologue about your game rank for 40 min (Mio's eyes glaze — chibi Mio sleeping) · ✅ ask about *The Starlight Postman* volume 3 (callback `mioVol3`) and ask follow-ups · ⚠️ stay silent on your phone | curiosity |
| 2-2 | Alpha Kai ad: "NEG HER to lower her value! 'You'd be cute if you smiled more.'" Kaede is next to you | ❌ try the neg on Kaede (she laughs *at* you; Kenta facepalms) · ✅ compliment something she *did*: "your last 100m split was insane" · 💀 go full Kai ("I'm the prize") with a fake deep voice → BAD END #4 *Negged Yourself* (everyone leaves you on the Ferris wheel) | negging |
| 2-3 | Snack stand. You want to impress | ❌ buy everyone the ¥3,000 deluxe parfait with your whole month's money (👑−) · ✅ treat once, modestly, or split · ⚠️ make Kenta pay for everything | buyinglove |
| 2-4 | Haunted house pairs. Yuna clings to you for her story video while Hina watches | ❌ play it up to make Hina jealous · ✅ keep it friendly, invite Hina into the photo, include everyone · ⚠️ panic and run out screaming (achievement *Ghosted*) | triangulation |
| 2-5 | Kenta falls into the fountain. Everyone laughs | ❌ mock him to look cool ("this is why you're single, bro") · ✅ help him out, give him your jacket, laugh *with* him | punchingdown |
| 2-6 | Karaoke. Rei (if `reiHasLine`, else an unknown number): "your friends are boring, they don't get you like I do. Skip school Monday and come see me" | ✅ "I'm having fun with my friends — see you never 😅" · ❌ leave karaoke to meet her · 💀 skip school, give her your bank PIN "for our future" → BAD END #5 *Just You and Me (and My Manager)* | isolation |

**Ending beat:** Walking home, Hina: "You were… different today. Nicer." (if 2-4/2-5 ✅). Mochi: "Group dates are job interviews where everyone pretends not to be interviewing."

---

## Chapter 3 — "Seen at 2:14 AM"
**Setting:** One school week, mostly at night on the phone. Phone UI heavy (reply choices in the chat).
**Goal:** texting dynamics, digital privacy, online dangers that specifically target boys.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 3-1 | Kaede's real date (if `kaedeReschedule`; else she apologises and asks again). Café after practice | ❌ talk about how cute her teammate is (comparing) · ✅ ask about her race goals, share yours · ⚠️ check your phone every 2 minutes | comparing / presence |
| 3-2 | You texted Mio at 9 PM. 11 PM: "Seen". 2:14 AM: still nothing | ❌ double, triple, quadruple text ("??", "did I do something wrong", "ok then") → achievement *Read at 2:14 AM* · ✅ put the phone down, sleep; she replies next morning ("I fell asleep reading! sorry!") · ⚠️ un-send and re-send a "casual" message | textanxiety |
| 3-3 | Boys' group chat: Kenta: "bro send screenshots of what Yuna says to you lol" | ❌ send them — the screenshot leaks to Yuna's group · ✅ "nah, those are private" · ⚠️ send but crop names (still leaks) | chatprivacy |
| 3-4 | A gorgeous stranger "Airi 💋" adds you, flirts for 2 days, then asks for a "private photo, just for me" | ✅ don't send, block, report (🧠+20) · ❌ send it → **scene, not bad end:** "Airi" threatens to post it to your school contacts unless you pay ¥50,000. Second choice: ✅ don't pay, keep evidence, block, report, tell a trusted adult (Mei calls — supportive) · 💀 pay → BAD END #6 *They Always Ask Again* (demand doubles). Ends with resource card | sextortion |
| 3-5 | Rei: "my mom's in hospital, I need ¥80,000 tonight, you're the only one I can trust 😭" (link to a payment app) | ✅ refuse money, suggest she call family/hospital social worker; notice the pattern (🧠+) ⚑`reiDoubt` · ❌ send half · 💀 borrow from Mei's savings → BAD END #7 *The Hospital That Wasn't* | emergencyscam |
| 3-6 | Friday = Hina's birthday (`hinaBirthdayKnown`) | ✅ small thoughtful gift tied to something she said (a cat-face bento cloth) · ❌ forget, then a generic convenience-store gift card at 11:58 PM · ⚠️ expensive brand-name gift bought in panic (she's uncomfortable) | remember / buyinglove |

**Ending beat:** Mei on the phone: "Have you eaten? Also — never send photos to people you haven't met. Ever." Mochi: "The internet is just a big room full of strangers pretending to be your type."

---

## Chapter 4 — "Culture Festival"
**Setting:** Two-day school festival: class maid/butler café, stage readings, night fireworks.
**Goal:** honesty when interested in several people, the "rescuer" trap, confession style, **handling rejection**, route lock.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 4-1 | Mio is scheduled to read her short story on stage; she's terrified and wants to quit | ✅ "Want me to sit front row so you can look at a friendly face?" · ❌ "Just don't be nervous lol" · ⚠️ take over and read it for her (she feels erased) | supportnotsave |
| 4-2 | Rei appears with a man in a suit — **Manager Goto**. Alone, she cracks: she's in debt to his "agency" and is made to chat with boys | ✅ boundary + real help: "I won't give money, but I'll go with you to the police / anti-fraud centre" ⚑`reiRedemption` · ❌ "I'll pay off your debt!" (Goto smiles) · 💀 confront Goto alone in the back alley → BAD END #8 *Hero Mode: Off* | rescuer |
| 4-3 | **Fish-pond check.** If you flirted with 3+ heroines (♥ ≥ 25 for 3+ and no clarity), all of them end up at your café table. If not, Kenta tries to juggle two girls and you advise him | ✅ honest: "I've been getting to know a few people; I'm figuring out my feelings and I'll be straight with you" · ❌ lie to each one ("you're the only one") · 💀 hide in the costume closet → BAD END #9 *The Fish Pond Keeper* (the tables are turned: you are now the fish-pond) | honestjuggle |
| 4-4 | Fireworks. Who do you confess to? (options for each heroine with ♥ ≥ 30; Yuna needs `yunaClarity`) · or **"Not now — I want to work on myself first"** → `solo` | Confession style: ✅ private, simple, honest, "you don't have to answer now" · ❌ megaphone confession on stage with the whole school watching (pressure) · ⚠️ confess by text with 20 emojis | publicpressure |
| 4-5 | **Her answer.** Yes if ♥ ≥ 40 (and no ❌ in 4-3). Otherwise a kind no | If **no**: ✅ "Thank you for being honest. I'm glad I told you." (friendship kept, ♥ bonus, → `solo`) achievement *Respect +100* · 💀 "After everything I did for you?!" → BAD END #10 *Nice Guy™* · ❌ "I'll wait forever until you change your mind" (👑−). If **yes**: hand-holding consent check — ✅ "Can I hold your hand?" · ❌ grab it (she flinches; fx −) | rejection / consent |

**Route lock:** `S.route = 'hina' | 'mio' | 'kaede' | 'yuna' | 'solo'`, `stats.trust = 20`.
**Ending beat:** Mochi: "Congratulations. You got a 'yes'. The hard part starts now." (solo: "No girlfriend, but you got something better: your dignity. Also me.")

---

# PART II — Being Together
Shared spine; `H` = route heroine. **Solo route** replays the same lessons through friendships, family and a new
hobby (club, part-time job at Mr. Ogawa's café), with Kenta's own relationship as the "relationship" storyline (you
are *his* adviser — the player now gives the advice, and must pick correct advice).

## Chapter 5 — "After 'Yes'"
**Setting:** The first month as a couple. **Goal:** the honeymoon traps.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 5-1 | Two weeks in. Saturday: you'd planned nothing; a new game just dropped. H: "Are we doing anything?" | ❌ "Can we just stay in? I'm in a raid" (third weekend in a row) · ✅ plan a small date around something she mentioned · ⚠️ make plans but stay on Discord the whole date | effortdrop |
| 5-2 | Day 8. You feel *so* in love | ❌ say "I love you", pick names for your future kids, change your bio to "H's husband" · ✅ tell her specifically what you like about spending time with her · ⚠️ demand she post couple photos to "make it official" | toofast |
| 5-3 | Boys' locker room: "So how far did you go? 😏" | ✅ "That's between us." · ❌ exaggerate to look cool — the rumour reaches H's friends (🤝−20) · 💀 show them private messages → BAD END #11 *Group Chat Hall of Shame* | kissandtell |
| 5-4 | Kenta's birthday karaoke — you've cancelled on him 3 times for H | ✅ go; tell H, she says "of course, have fun!" · ❌ cancel again; Kenta stops inviting you · ⚠️ bring H without asking anyone | ownlife |
| 5-5 | One-month mini anniversary | ✅ something small using things you know (callback flags: hearts / vol. 3 / race / idol song) · ❌ forget, then "it's just a month lol" · ⚠️ expensive surprise she has to "pay back" emotionally | remember |

**Route variants:** Hina — the date is the old playground; Mio — a bookshop crawl; Kaede — a morning run + breakfast; Yuna — a photo-free day ("can we… not post today?").

## Chapter 6 — "Green-Eyed Monster"
**Setting:** H spends time with a male friend. Alpha Kai's channel is back. **Goal:** jealousy and control.
**H's male friend (variant):** Hina → cousin **Shun** (visiting from Osaka); Mio → book-club president **Haruki**; Kaede → relay teammate **Riku**; Yuna → dance partner **Leo**.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 6-1 | You see H laughing with him after school | ❌ sulk, answer her messages with "k" · ✅ name the feeling to yourself, then tell her calmly: "I felt a bit jealous — can I meet him?" · 💀 confront him in front of everyone → BAD END #12 *It Was Her Cousin* (Hina) / matching variant | jealousy |
| 6-2 | H's phone lights up on the table: "[Friend]: about tomorrow…" She's in the bathroom | ✅ don't touch it · ❌ read her chat → she sees you (🤝−30) · 💀 install a tracking app → BAD END #13 *Trust.exe Has Stopped Working* | snooping |
| 6-3 | Alpha Kai: "Real men know where their woman is 24/7. Make her share her location." | ✅ close the video (achievement progress *Unsubscribed*) · ❌ demand location sharing "if you have nothing to hide" · ⚠️ ask Kenta, who says "do it bro" — then ask Mr. Ogawa, who says don't | control |
| 6-4 | H: "Who's Rei / Yuna? Why do you still text her?" | ✅ open and honest; show the chat if she wants · ❌ "Why are you checking on me? Don't you trust me?" (after doing 6-2 yourself) | doublestandard |
| 6-5 | H wins something big (Hina: nursing-school mock exam rank 1; Mio: story prize; Kaede: prefectural record; Yuna: audition callback) and you just failed a test | ✅ celebrate her fully; your feelings can wait until later · ❌ "it's just a [thing], not a big deal" · ⚠️ make the evening about your failed test | celebrate |

## Chapter 7 — "The First Fight"
**Setting:** Rainy week, exam stress. **Goal:** conflict skills — the most important chapter.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 7-1 | H vents about a terrible day (teacher, friend, parents) | ❌ instantly list 5 solutions · ✅ listen, reflect, then ask "do you want advice or just a hug?" · ⚠️ "that's nothing, my day was worse" | listenfirst |
| 7-2 | You forgot a promise (you said you'd come to her match/reading/clinic visit) | ✅ real apology: name it, own it, no "but", ask how to make it right · ❌ "sorry you feel that way" · ❌ excuses ("I was tired, and anyway you forgot X last month") | apology |
| 7-3 | The fight escalates | ❌ "You're overreacting / being crazy" · ❌ bring up old mistakes from months ago · ✅ "I can see this really hurt you." | dismissing |
| 7-4 | You're both upset | ✅ "I need 20 minutes to calm down, I'll come back and we'll talk" · ❌ silent treatment for 3 days · 💀 "Maybe we should just break up then" (you don't mean it) → BAD END #14 *She Took You Seriously* | stonewalling / breakupthreat |
| 7-5 | Next day, repair conversation | ✅ say your own need clearly ("I need a heads-up when plans change") and ask hers · ❌ expect her to "just know" what you need · ⚠️ pretend nothing happened | mindreading / repair |

**Mentor beat:** Mr. Ogawa over shogi: "My marriage didn't end because we fought. It ended because we stopped repairing."

## Chapter 8 — "Closeness"
**Setting:** Summer. Movie nights, her friends, her family dinner. **Goal:** consent, privacy, respect for her people. *Teen-safe; nothing explicit.*

| # | Setup | Options | Lesson |
|---|---|---|---|
| 8-1 | Movie night at your place. A quiet moment — you want to kiss her | ✅ ask: "Can I kiss you?" — she may say yes or "not yet"; both are fine · ❌ "if you really loved me you would" · 💀 keep pushing after "not yet" → BAD END #15 *Movie Over* | pressure / consent |
| 8-2 | Kenta: "Couples send each other pics bro, ask her" | ✅ "No. Never." (and tell Kenta why — sharing images of minors is a crime) · ❌ ask her for a private photo — she's hurt and scared · 💀 if anything private is ever shared to others → BAD END #16 *Screenshot Forever* + resource card | imageabuse |
| 8-3 | You plan a huge surprise party; she told you twice she hates surprises | ✅ cancel it, plan what she likes · ❌ do it anyway "she'll love it once she sees it" | prefsmatter |
| 8-4 | Dinner with her friends / family | ✅ ask her friends questions, help clear dishes, put the phone away · ❌ ignore her friends, joke that they're "boring" · ⚠️ try too hard and brag | herpeople |
| 8-5 | Beach day. Boys joking about girls' bodies; you want to fit in | ❌ joke about H's body to get a laugh · ✅ shut it down: "not cool, man" · ⚠️ laugh awkwardly and say nothing | bodyjokes |

---

# PART III — Storms & Promises

## Chapter 9 — "Storm Season"
**Setting:** Autumn: exams, a two-week training camp/trip apart, family stress. **Goal:** sustaining love under pressure; healthy breakups.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 9-1 | H is away 2 weeks (camp/trip). | ✅ agree on a rhythm ("goodnight message + call on Sunday") · ❌ "why didn't you reply in 10 minutes?" ×30 · ⚠️ "post less with other people" | distance |
| 9-2 | You've skipped your club and studying to be "always available" | ✅ go back to your own goals; tell her about them · ❌ fail your exam; blame her | selfneglect |
| 9-3 | You were at the arcade with Yuna/Rei but said you were studying. She sees a story | ✅ come clean immediately · ❌ double down with a bigger lie · 💀 fake an alibi with Kenta → BAD END #17 *The Alibi Group Chat* | smalllies |
| 9-4 | She can't afford the class trip extras; you can | ✅ choose something you can both do; talk openly about money · ❌ pay for everything and remind her later · ⚠️ keep a spreadsheet of who paid what | money |
| 9-5 | H has been withdrawn, exhausted, crying (family/exam pressure) | ✅ be present, listen, gently encourage her to talk to a counsellor/trusted adult; you don't have to fix it · ❌ "cheer up, you're being dramatic" · ⚠️ try to be her only support and burn out yourself | support |
| 9-6 | **Breakup branch** (if 🤝 < 30 or chosen): H says she needs to end it | ✅ "It hurts, but I respect it. Thank you for everything." → `kind_goodbye` path · ❌ beg, send 40 messages, wait at her house · 💀 revenge post / stalk her new friends → BAD END #18 *Main Character Syndrome* | breakup |

**Mentor beat:** Mei: "Losing someone doesn't mean you lost. Did you become a better person? Then you won something."

## Chapter 10 — "What Love Actually Is"
**Setting:** Winter → graduation spring. Finale.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 10-1 | H's dream opportunity in another city (Hina: nursing school in Sendai; Mio: Tokyo writing program; Kaede: sports university recruitment; Yuna: dance academy in Seoul) | ✅ "I'll miss you like crazy. Go. Let's figure out how we stay close." · ❌ "If you loved me, you'd stay." (guilt-tripping) · ⚠️ say nothing, sulk for a week | supportdreams |
| 10-2 | Alpha Kai's livestream gets exposed; Kenta admits he bought the ¥98,000 course and is ashamed | ✅ "Bro, we've all fallen for stuff. Let's get a refund and get ramen." · ❌ mock him in the group chat | brosupport |
| 10-3 | Rei's ending (if `reiRedemption`): police case against Goto; Rei thanks you for not "saving" her with money | ✅ stay a friend with boundaries · ⚠️ try to date her now (she gently says no — she needs time to heal) | rescuer (callback) |
| 10-4 | **Honesty quiz** (reference-game homage, original questions): "Did you notice what changed about me?" / "Have you ever lied to me?" / "What's my favourite thing?" | ✅ honest answers ("I don't know — tell me?") beat confident wrong guesses; flattery loses · ❌ lie about 9-3 again | honesty |
| 10-5 | Graduation. Ending evaluation (see GAME_DESIGN §7). Mochi's exam result | — | — |

**Epilogue:** One year later — short scenes per ending. Mochi: "Love isn't something you find. It's something you *do*, every day, on purpose."
