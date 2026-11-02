# sim4love — Chapter Design (20 chapters, 5 parts)

Read [CORE_VALUES.md](CORE_VALUES.md) first. Every interaction below lists the value(s) it reinforces (V1–V10).

How to read this:
- Each chapter has a **setting**, a **goal**, its **core values**, then 4–6 **interactions** (`7-3` = chapter 7,
  interaction 3). Marks: ✅ healthy (always the best total outcome) · ⚠️ mild mistake · ❌ mistake · 💀 bad end (comic,
  instantly rewindable).
- Stats: `♥` the focused heroine's Connection, `🤝` trust, `🧠` Love IQ, `👑` Self-respect. **Your Life** track
  (see GAME_DESIGN §6): `🎯` goal (study/career), `🎸` passion (the hobby chosen in 2-7), `💤` health, `¥` wallet.
  `🌹` = Rose Filter (projection) — idealising raises it, fact-checking lowers it.
- `→ lesson` IDs: existing ones are in `js/data/lessons.js`; **new IDs** are marked *new* and listed in
  [MISTAKES.md](MISTAKES.md) §4. `⚑ flag` = flag for later callbacks.
- From Part III, **`H`** = the route heroine. On the **solo** route, relationship scenes are replayed through Kenta's
  relationship (you are his adviser and must pick the correct advice), friends, family and your passion.
- **Ages.** Parts I–IV: second and third year of high school (16–18). Part V: the first year after graduation (18–19).
  Sexual-health education sits in **high school** (Ch12 consent and images, **Ch13 "Health Class"**: contraception, STIs,
  red-flag behaviours, refusal) at a school sex-education level; Ch18 covers adult-relationship topics (18+).
  Everything is non-explicit: scenes cut away; facts are given on Mochi's fact cards; visuals are at most a hug.
- **Partner talks and variants.** Each chapter also has one **partner talk** (a value discussion with genuinely
  opposing views) and reuses locations with different lines per visit. Profiles, talk template, variant pools and
  the per-chapter topic map: [VALUE_PROFILES.md](VALUE_PROFILES.md). Per-chapter art needs: the table at the end.
- Old numbering → new numbering (code files still use the old numbers until restructured, see HANDOFF):
  old 1→1, 2→2, 3→3, 4→6 + 8, 5→9, 6→10, 7→11, 8→12, 9→14 (+ 15-5), 10→15 + 20. Ch13 is new.

## Overview

| Part | Ch | Title | Focus | Core values |
|---|---|---|---|---|
| I — Rose-Tinted | 1 | Spring, Again ✅ *(playable)* | First impressions, love bombing, consent, mixed signals, fish pond | V1 V5 V6 V9 |
| | 2 | The Group Date | Outing; curiosity, negging, buying love, isolation; **choose your passion** | V2 V4 V8 |
| | 3 | Seen at 2:14 AM | Texting, chat privacy, sextortion, emergency scams | V1 V6 |
| | 4 | Payday *(new)* | Part-time job, budgeting, family money, paid attention, installments | V3 V4 V7 |
| II — Behind the Filter | 5 | Summer Camp *(new)* | Class trip; people unfiltered, fair share, refusing beer, group safety, projection | V5 V6 V9 |
| | 6 | Culture Festival | Rescuer trap, honest juggling, polished masks, keeping your own stage | V2 V5 V8 |
| | 7 | Behind the Screen *(new)* | De-idealisation chapter: fantasy vs facts, idol burnout, parasocial spending, materialism | V5 V6 V7 V8 |
| | 8 | Fireworks | "Why her?", confession, rejection, **route lock** (or solo) | V1 V6 V8 |
| III — Being Together | 9 | After "Yes" | Effort drop, moving too fast, kiss-and-tell, own life, date budget | V2 V4 |
| | 10 | Green-Eyed Monster | Jealousy, snooping, control, double standards | V1 V8 |
| | 11 | The First Fight | Listening, apology, stonewalling, repair | V1 V10 |
| | 12 | Closeness | Asking, pressure, intimate images, your own "not yet" | V9 |
| IV — Real Life | 13 | Health Class *(new)* | High-school sex education: contraception facts, serious STI consequences, risk by behaviour (not orientation), red-flag behaviours, grooming, refusal | V1 V8 V9 |
| | 14 | Exam & Storm Season | Focus, sleep, supporting her, small lies, breakup and recovery | V1 V2 V3 V4 |
| | 15 | Graduation | Her dream, your dream, Dad and your passion, Kai exposed, Rei's case | V2 V3 V8 |
| V — On Your Own | 16 | Living Alone *(new)* | Self-care, cooking, credit traps, lending money, sustainable distance | V2 V4 V5 |
| | 17 | Welcome Party *(new)* | Peer pressure, alcohol (under the legal age), bystander help, impulse, drink safety | V6 V9 |
| | 18 | The Long Talk *(new)* | Adult relationships: talking first, shared responsibility, testing, ongoing consent, your timeline, a scare, the children talk | V1 V9 V10 |
| | 19 | The Perfect Match *(new)* | Adult scams: investment romance, deposit "agencies", video sextortion, MLM | V4 V6 V7 |
| | 20 | Your Own Story | Honesty quiz, life review, final choices, endings | V2 V10 |

---

# PART I — Rose-Tinted (second year, spring)

## Chapter 1 — "Spring, Again" ✅ IMPLEMENTED (`js/chapters/ch01.js`)
**Setting:** First school day; Mochi appears. **Goal:** first impressions — the shine vs the person.
**Core values:** V1, V5 (Rei's polish is a tool), V6, V9. Stays as implemented. Only addition planned: Mochi's last
line introduces the Your Life panel ("Also: you have a life. Try to keep it.").

| # | Setup | Options | Lesson |
|---|---|---|---|
| 1-1 | Hina brings "leftover" heart tamagoyaki | ✅ notice & thank (♥+15) · ⚠️ tease (♥+5) · ❌ keep scrolling (♥−10) | appreciation / teasing / presence |
| 1-2 | Rei bumps into you: "soulmates", crypto app | 💀 invest savings → BAD END #1 *The Soulmate Portfolio* · ✅ "we just met" · ⚠️ give LINE, refuse money ⚑`reiHasLine` | romancescam / lovebomb |
| 1-3 | Mio drops her book in the library | ✅ ask, listen, leave before it's awkward · 💀 grab her hand → BAD END #2 *The Council Would Like a Word* · ❌ mock the book | signals / consent / mockery |
| 1-4 | Kaede stands you up, "you actually waited? 😏" | ❌ "I'll wait every day ♡" · ✅ calm, clear reply ⚑ (Ch2 date is real) · ❌ revenge story | hotcold / clearwords / games |
| 1-5 | Yuna: homework + concert ticket, karaoke with 3 "besties" | ❌ do it all · ✅ help study, decline ticket, "what are we?" · 💀 14 jealous texts → BAD END #3 *Message Not Delivered* | fishpond / clarity / neediness |

---

## Chapter 2 — "The Group Date"
**Setting:** Saturday, Sakura Land amusement park → karaoke. **New:** Kenta (organiser), Alpha Kai (phone ads).
**Goal:** the group "talking stage": conversation, showing off, buying love; then build a life of your own.
**Core values:** V2, V4, V8.

**Opening:** Kenta bursts in: "Bro. I organised a group date. Five girls said yes." (Three said maybe.)

| # | Setup | Options | Lesson |
|---|---|---|---|
| 2-1 | 40-minute queue for the coaster, standing next to Mio | ❌ monologue about your game rank for 40 min (Mio's eyes glaze — chibi Mio sleeping) · ✅ ask about *The Starlight Postman* volume 3 (callback `mioVol3`) and ask follow-ups · ⚠️ stay silent on your phone | curiosity |
| 2-2 | Alpha Kai ad: "NEG HER to lower her value! 'You'd be cute if you smiled more.'" Kaede is next to you | ❌ try the neg on Kaede (she laughs *at* you; Kenta facepalms) · ✅ compliment something she *did*: "your last 100m split was insane" · 💀 go full Kai ("I'm the prize") with a fake deep voice → BAD END #4 *Negged Yourself* (everyone leaves you on the Ferris wheel) | negging |
| 2-3 | Snack stand. You want to impress | ❌ buy everyone the ¥3,000 deluxe parfait with your whole month's money (👑−) · ✅ treat once, modestly, or split · ⚠️ make Kenta pay for everything | buyinglove |
| 2-4 | Haunted house pairs. Yuna clings to you for her story video while Hina watches | ❌ play it up to make Hina jealous · ✅ keep it friendly, invite Hina into the photo, include everyone · ⚠️ panic and run out screaming (achievement *Ghosted*) | triangulation |
| 2-5 | Kenta falls into the fountain. Everyone laughs | ❌ mock him to look cool ("this is why you're single, bro") · ✅ help him out, give him your jacket, laugh *with* him | punchingdown |
| 2-6 | Karaoke. Rei (if `reiHasLine`, else an unknown number): "your friends are boring, they don't get you like I do. Skip school Monday and come see me" | ✅ "I'm having fun with my friends — see you never 😅" · ❌ leave karaoke to meet her · 💀 skip school, give her your bank PIN "for our future" → BAD END #5 *Just You and Me (and My Manager)* | isolation |
| 2-7 | Walking home, Mochi opens the **Your Life** panel: "Pick something that's yours." | ✅ pick one passion (guitar / drawing / coding a small game / basketball) and a weekly hour for it (🎸+10) ⚑`passion` · ⚠️ pick all four (each grows at half speed) · ❌ "My passion is… her." (Mochi: "That's a person, not a hobby." 👑−) | *new* `ownpassion` |

**Ending beat:** Hina: "You were… different today. Nicer." Mochi: "Group dates are job interviews where everyone pretends not to be interviewing."

---

## Chapter 3 — "Seen at 2:14 AM"
**Setting:** One school week, mostly at night on the phone. **Goal:** texting dynamics, privacy, online traps aimed at boys.
**Core values:** V1, V6 ("Airi" is a glamorous fake profile: beauty used as bait).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 3-1 | Kaede's real date (if `kaedeReschedule`; else she apologises and asks again). Café after practice | ❌ talk about how cute her teammate is (comparing) · ✅ ask about her race goals, share yours · ⚠️ check your phone every 2 minutes | comparing / presence |
| 3-2 | You texted Mio at 9 PM. 11 PM: "Seen". 2:14 AM: still nothing | ❌ double, triple, quadruple text ("??", "did I do something wrong", "ok then") → achievement *Read at 2:14 AM* · ✅ put the phone down, sleep; she replies next morning ("I fell asleep reading! sorry!") · ⚠️ un-send and re-send a "casual" message | textanxiety |
| 3-3 | Boys' group chat: Kenta: "bro send screenshots of what Yuna says to you lol" | ❌ send them — the screenshot leaks to Yuna's group · ✅ "nah, those are private" · ⚠️ send but crop names (still leaks) | chatprivacy |
| 3-4 | A gorgeous stranger "Airi 💋" adds you, flirts for 2 days, then asks for a "private photo, just for me" | ✅ don't send, block, report (🧠+20) · ❌ send it → **scene, not bad end:** "Airi" threatens to post it to your school contacts unless you pay ¥50,000. Second choice: ✅ don't pay, keep evidence, block, report, tell a trusted adult (Mei calls — supportive) · 💀 pay → BAD END #6 *They Always Ask Again* (demand doubles). Ends with resource card | sextortion |
| 3-5 | Rei: "my mom's in hospital, I need ¥80,000 tonight, you're the only one I can trust 😭" (link to a payment app) | ✅ refuse money, suggest she call family/hospital social worker; notice the pattern (🧠+) ⚑`reiDoubt` · ❌ send half · 💀 borrow from Mei's savings → BAD END #7 *The Hospital That Wasn't* | emergencyscam |
| 3-6 | Friday = Hina's birthday (`hinaBirthdayKnown`) | ✅ small thoughtful gift tied to something she said (a cat-face bento cloth) · ❌ forget, then a generic convenience-store gift card at 11:58 PM · ⚠️ expensive brand-name gift bought in panic (she's uncomfortable) | remember / buyinglove |

**Ending beat:** Mei: "Have you eaten? Also — never send photos to people you haven't met. Ever."

---

## Chapter 4 — "Payday" *(new)*
**Setting:** First month of a part-time job at Mr. Ogawa's café. You earn ¥28,000. Mei calls: Dad's shifts were cut.
**Goal:** money is a boundary. Spending to be liked buys a moment; investing in yourself buys years.
**Core values:** V3, V4, V7. Male characters model the bad habits too (Kenta, Kai).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 4-1 | First wages in your hand | ✅ split it: savings, passion (new strings / tablet pen), a little fun (¥+, 🎸+) · ❌ spend it all on sneakers and a designer charm "so they notice me" (¥−−) · ⚠️ lend all of it to Kenta without asking what for | *new* `budget` |
| 4-2 | Yuna's livestream. Top gifters get a shout-out and a heart. You feel seen when you tip | ✅ enjoy the stream, say hi to her in person tomorrow · ❌ tip ¥10,000 to get on screen · 💀 a gift battle with a stranger, paid with Mei's card → **BAD END #19** *Top Gifter of Nothing* (she reads your name out once, mispronounced) | *new* `paidattention` |
| 4-3 | Kaede, half-joking: "A good kōhai would buy me those ¥24,000 spikes." | ✅ "Ha. No. But I'll time your intervals." (♥+, 👑+) · ❌ spend the month's wages on them (she's embarrassed: she didn't mean it) · ⚠️ buy cheap knock-offs | *new* `moneyboundary` |
| 4-4 | Kenta signs up for Alpha Kai's "Alpha Mindset" course, ¥98,000 in 12 easy installments, and wants you to split it | ✅ show him the total cost and the refund reviews; suggest the free library book · ❌ split it with him · ⚠️ shrug and say nothing | *new* `installments` |
| 4-5 | Mei: Mum asked if you could skip the class-trip extras this year | ✅ talk honestly, contribute something, keep your savings plan (🎯+) · ❌ "Not my problem" and buy a gift for a crush anyway · ⚠️ secretly give everything and skip lunches for a month (💤−) | *new* `familymoney` |

**Mentor beat:** Mr. Ogawa: "Money you spend to be liked buys you a moment. Money you spend on becoming someone buys you years."

---

# PART II — Behind the Filter (second year, summer → autumn)

## Chapter 5 — "Summer Camp" *(new)*
**Setting:** Three-day class trip to a lake in the mountains: bus, cabins, cooking duty, stargazing, a hike.
**Goal:** see people without the filter; refuse, stay with the group, notice your own projection.
**Core values:** V5, V6, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 5-1 | 6 AM at the wash basins. Yuna, no makeup, hoodie, toothbrush; Kaede grumpy and half-asleep | ✅ "Morning." Treat it as completely normal (♥+ for both) · ❌ "Whoa, you look so different!" · ⚠️ snap a candid "for memories" without asking | *new* `unfiltered` |
| 5-2 | Cooking duty. Cool senpai Kaede burns the curry; she can't cook at all. Yuna is on her phone | ✅ show Kaede the basics; split the jobs fairly, including Yuna's · ❌ do everything yourself to impress them and miss the canoe race (🎸−, 💤−) · ⚠️ mock the curry | *new* `fairshare` |
| 5-3 | Night. University students camping nearby invite you to their fire, away from the teachers, and hand you a beer | ✅ "Nah, I'm good," and stay with the group (👑+) · ❌ go and drink "just one" · 💀 wander off into the dark woods with them → **BAD END #20** *Search Party of One* + resource card | *new* `refusal` |
| 5-4 | Stargazing. Mio admits she wrote you into her novel as a "perfect prince". You realise you've been imagining her as the "perfect quiet girlfriend". Neither is real | ✅ laugh about it; tell her one boring, embarrassing true thing about yourself and ask hers (🌹−, ♥+) · ❌ "You're exactly how I imagined you." (🌹+) · ⚠️ get offended | *new* `projection` |
| 5-5 | Hike. Hina twists her ankle; you're off the trail; phone at 3% | ✅ stay put, call the teacher, share your location, save battery · ❌ "I know a shortcut" to look capable · ⚠️ panic-post in the group chat instead of calling | *new* `stayput` |

**Ending beat:** Mochi: "Turns out nobody wakes up with idol lighting. Not even idols."

---

## Chapter 6 — "Culture Festival"
**Setting:** Two-day school festival: class café, stage readings, your passion showcase.
**Goal:** the rescuer trap, honesty when interested in several people, polished masks, keeping your own stage.
**Core values:** V2, V5 (Takumi), V8. (The confession and route lock move to Ch8.)
**New:** **Takumi**, the polished, universally admired student-council president.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 6-1 | Mio is scheduled to read her short story on stage; she's terrified and wants to quit | ✅ "Want me to sit front row so you can look at a friendly face?" · ❌ "Just don't be nervous lol" · ⚠️ take over and read it for her (she feels erased) | supportnotsave |
| 6-2 | Rei appears with a man in a suit — **Manager Goto**. Alone, she cracks: she's in debt to his "agency" and is made to chat with boys | ✅ boundary + real help: "I won't give money, but I'll go with you to the police / anti-fraud centre" ⚑`reiRedemption` · ❌ "I'll pay off your debt!" (Goto smiles) · 💀 confront Goto alone in the back alley → BAD END #8 *Hero Mode: Off* | rescuer |
| 6-3 | **Fish-pond check.** If you flirted with 3+ heroines (♥ ≥ 25 for 3+ and no clarity), all of them end up at your café table. If not, Kenta tries to juggle two girls and you advise him | ✅ honest: "I've been getting to know a few people; I'm figuring out my feelings and I'll be straight with you" · ❌ lie to each one ("you're the only one") · 💀 hide in the costume closet → BAD END #9 *The Fish Pond Keeper* (the tables are turned: you are now the fish-pond) | honestjuggle |
| 6-4 | Takumi offers you a place in his "inner circle" if you cover his class's café shifts. Behind the polish he is lazy and takes credit for other people's work | ✅ decline politely, do your own shift well · ❌ cover his shifts to be accepted (💤−, 🎯−); he thanks the teacher for "his team's hard work" | *new* `polishedmask` |
| 6-5 | Your passion slot on the small stage is at 3 PM. Yuna asks you to skip it and carry her props instead | ✅ keep your slot, help her straight after (🎸+15) · ❌ cancel your slot "for her" (🎸−, 👑−) · ⚠️ rush your set and do both badly | *new* `ownstage` |

---

## Chapter 7 — "Behind the Screen" *(new)*
**Setting:** Autumn. The player's crushes peak; so does the internet. Kenta is hooked on a streamer; Alpha Kai shows his lifestyle.
**Goal:** the de-idealisation chapter. Infatuation is mostly projection; glamour is packaging; nobody owes you a fantasy.
**Core values:** V5, V6, V7, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 7-1 | Mochi reads your notes app: 30 "perfect" traits of your crush, 26 of them invented. The Rose Filter is at max | ✅ split the list into "things I know" and "things I assumed" (🌹−−, 🧠+) · ❌ add five more · 💀 print her photos and build a desk shrine; her friends see it on a video call → **BAD END #21** *Fan Club of One* | *new* `factsvsfantasy` |
| 7-2 | You help Yuna carry stage boxes home. Her room is chaos; she lives on energy drinks, sleeps four hours, and is exhausted by her online persona | ✅ treat her like a normal person: no judgement; suggest food and sleep; it's not your job to fix her, so suggest she talk to a counsellor (♥+, 🌹−) · ❌ "You're nothing like your stream." (as if she owed you an image) · ⚠️ become her unpaid cleaner and assistant | *new* `realperson` |
| 7-3 | Kenta has spent his savings on a streamer. Her "you're special" message is a template every top gifter gets | ✅ show him gently, no mockery, and get him back to basketball · ❌ call him a "simp" in the group chat · ⚠️ "Just tip less, bro" | *new* `parasocial` |
| 7-4 | Alpha Kai's stream: Lamborghini, watch, "attract the hottest girls". Chat proves the car is rented by the hour. An ad for an installment watch pops up | ✅ close it and spend the evening on your passion (🎸+) · ❌ buy the fake designer watch in 24 installments (¥−) · ⚠️ watch three hours "ironically" | *new* `materialism` |
| 7-5 | Mochi: "Who are you when nobody is watching?" One free evening | ✅ practise (🎸+), study (🎯+) or sleep (💤+): all are healthy · ❌ four hours scrolling her feed (🌹+) | *new* `attention` |

**Ending beat:** Yuna, later: "Thanks for treating me like a normal person who's bad at sleeping."

---

## Chapter 8 — "Fireworks"
**Setting:** The autumn fireworks festival. **Goal:** know *why* before you confess; confess well; accept the answer; route lock.
**Core values:** V1, V6, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 8-1 | Mochi, before the fireworks: "Why her?" | ✅ reasons about how she treats people and how you are together (🧠+) · ❌ "She's the prettiest." (🌹+) · ❌ "I can't live without her." (👑−) | *new* `whyher` |
| 8-2 | Fireworks. Who do you confess to? (options for each heroine with ♥ ≥ 30; Yuna needs `yunaClarity`) · or **"Not now — I want to work on myself first"** → `solo` | Confession style: ✅ private, simple, honest, "you don't have to answer now" · ❌ megaphone confession on stage with the whole school watching (pressure) · ⚠️ confess by text with 20 emojis | publicpressure |
| 8-3 | **Her answer.** Yes if ♥ ≥ 40 (and no ❌ in 6-3). Otherwise a kind no | If **no**: ✅ "Thank you for being honest. I'm glad I told you." (friendship kept, ♥ bonus, → `solo`) achievement *Respect +100* · 💀 "After everything I did for you?!" → BAD END #10 *Nice Guy™* · ❌ "I'll wait forever until you change your mind" (👑−). If **yes**: hand-holding consent check — ✅ "Can I hold your hand?" · ❌ grab it (she flinches; fx −) | rejection / consent |
| 8-4 | **The solo choice**, available all chapter: "This year I'm focusing on my exams and my passion." | ✅ a fully valid route, not a consolation prize (🎯+, 🎸+, 👑+) → `solo` | `ownlife` |

**Route lock:** `S.route = 'hina' | 'mio' | 'kaede' | 'yuna' | 'solo'`, `stats.trust = 20`.
**Ending beat:** Mochi: "Congratulations. You got a 'yes'. The hard part starts now." (solo: "No girlfriend, but you kept something better: your dignity. Also me.")

---

# PART III — Being Together (third year, spring → summer)
Shared spine; `H` = route heroine. **Solo:** the same lessons through Kenta's relationship, friends, family and your passion.

## Chapter 9 — "After 'Yes'"
**Setting:** The first month together. **Goal:** honeymoon traps, and keeping your own life.
**Core values:** V2, V4.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 9-1 | Two weeks in. Saturday: you'd planned nothing; a new game just dropped. H: "Are we doing anything?" | ❌ "Can we just stay in? I'm in a raid" (third weekend in a row) · ✅ plan a small date around something she mentioned · ⚠️ make plans but stay on Discord the whole date | effortdrop |
| 9-2 | Day 8. You feel *so* in love | ❌ say "I love you", pick names for your future kids, change your bio to "H's husband" · ✅ tell her specifically what you like about spending time with her · ⚠️ demand she post couple photos to "make it official" | toofast |
| 9-3 | Boys' locker room: "So how far did you go? 😏" | ✅ "That's between us." · ❌ exaggerate to look cool — the rumour reaches H's friends (🤝−20) · 💀 show them private messages → BAD END #11 *Group Chat Hall of Shame* | kissandtell |
| 9-4 | Kenta's birthday karaoke — you've cancelled on him 3 times for H | ✅ go; tell H, she says "of course, have fun!" · ❌ cancel again; Kenta stops inviting you · ⚠️ bring H without asking anyone | ownlife |
| 9-5 | One-month mini anniversary | ✅ something small using things you know (callback flags: hearts / vol. 3 / race / idol song) · ❌ forget, then "it's just a month lol" · ⚠️ expensive surprise she has to "pay back" emotionally | remember |
| 9-6 | Your monthly date budget is ¥6,000. A fancy restaurant would "really impress her" | ✅ a cheap, good date: cook together, a park, the bookshop (♥+, ¥ ok) · ❌ book it on a credit app (¥−−) · ⚠️ go, then sulk about the bill all night | *new* `datebudget` |

**Route variants:** Hina — the old playground; Mio — a bookshop crawl; Kaede — a morning run + breakfast; Yuna — a photo-free day ("can we… not post today?").

## Chapter 10 — "Green-Eyed Monster"
**Setting:** H spends time with a male friend. Alpha Kai's channel is back. **Goal:** jealousy and control.
**Core values:** V1, V8. **H's male friend:** Hina → cousin **Shun**; Mio → **Haruki**; Kaede → **Riku**; Yuna → **Leo**.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 10-1 | You see H laughing with him after school | ❌ sulk, answer her messages with "k" · ✅ name the feeling to yourself, then tell her calmly: "I felt a bit jealous — can I meet him?" · 💀 confront him in front of everyone → BAD END #12 *It Was Her Cousin* (Hina) / matching variant | jealousy |
| 10-2 | H's phone lights up on the table: "[Friend]: about tomorrow…" She's in the bathroom | ✅ don't touch it · ❌ read her chat → she sees you (🤝−30) · 💀 install a tracking app → BAD END #13 *Trust.exe Has Stopped Working* | snooping |
| 10-3 | Alpha Kai: "Real men know where their woman is 24/7. Make her share her location." | ✅ close the video (achievement progress *Unsubscribed*) · ❌ demand location sharing "if you have nothing to hide" · ⚠️ ask Kenta, who says "do it bro" — then ask Mr. Ogawa, who says don't | control |
| 10-4 | H: "Who's Rei / Yuna? Why do you still text her?" | ✅ open and honest; show the chat if she wants · ❌ "Why are you checking on me? Don't you trust me?" (after doing 6-2 yourself) | doublestandard |
| 10-5 | H wins something big (Hina: nursing-school mock exam rank 1; Mio: story prize; Kaede: prefectural record; Yuna: audition callback) and you just failed a test | ✅ celebrate her fully; your feelings can wait until later · ❌ "it's just a [thing], not a big deal" · ⚠️ make the evening about your failed test | celebrate |

## Chapter 11 — "The First Fight"
**Setting:** Rainy week, exam stress. **Goal:** conflict skills — still the most important relationship chapter.
**Core values:** V1, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 11-1 | H vents about a terrible day (teacher, friend, parents) | ❌ instantly list 5 solutions · ✅ listen, reflect, then ask "do you want advice or just a hug?" · ⚠️ "that's nothing, my day was worse" | listenfirst |
| 11-2 | You forgot a promise (you said you'd come to her match/reading/clinic visit) | ✅ real apology: name it, own it, no "but", ask how to make it right · ❌ "sorry you feel that way" · ❌ excuses ("I was tired, and anyway you forgot X last month") | apology |
| 11-3 | The fight escalates | ❌ "You're overreacting / being crazy" · ❌ bring up old mistakes from months ago · ✅ "I can see this really hurt you." | dismissing |
| 11-4 | You're both upset | ✅ "I need 20 minutes to calm down, I'll come back and we'll talk" · ❌ silent treatment for 3 days · 💀 "Maybe we should just break up then" (you don't mean it) → BAD END #14 *She Took You Seriously* | stonewalling / breakupthreat |
| 11-5 | Next day, repair conversation | ✅ say your own need clearly ("I need a heads-up when plans change") and ask hers · ❌ expect her to "just know" what you need · ⚠️ pretend nothing happened | mindreading / repair |

**Mentor beat:** Mr. Ogawa over shogi: "My marriage didn't end because we fought. It ended because we stopped repairing."

## Chapter 12 — "Closeness"
**Setting:** Summer: movie nights, her friends, her family, the beach. **Goal:** asking, pressure, privacy, and your own "not yet".
**Core values:** V9. Kiss-level only; nothing explicit (characters are 17).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 12-1 | Movie night at your place. A quiet moment — you want to kiss her | ✅ ask: "Can I kiss you?" — she may say yes or "not yet"; both are fine · ❌ "if you really loved me you would" · 💀 keep pushing after "not yet" → BAD END #15 *Movie Over* | pressure / consent |
| 12-2 | Kenta: "Couples send each other pics bro, ask her" | ✅ "No. Never." (and tell Kenta why — sharing images of minors is a crime) · ❌ ask her for a private photo — she's hurt and scared · 💀 if anything private is ever shared to others → BAD END #16 *Screenshot Forever* + resource card | imageabuse |
| 12-3 | You plan a huge surprise party; she told you twice she hates surprises | ✅ cancel it, plan what she likes · ❌ do it anyway "she'll love it once she sees it" | prefsmatter |
| 12-4 | Dinner with her friends / family | ✅ ask her friends questions, help clear dishes, put the phone away · ❌ ignore her friends, joke that they're "boring" · ⚠️ try too hard and brag | herpeople |
| 12-5 | Beach day. Boys joking about girls' bodies; you want to fit in | ❌ joke about H's body to get a laugh · ✅ shut it down: "not cool, man" · ⚠️ laugh awkwardly and say nothing | bodyjokes |
| 12-6 | This time *you* aren't ready: H wants to move faster than you do | ✅ "I really like you, and I'm not ready. Can we slow down?" (👑+, 🤝+) · ❌ go along so you don't look uncool · ⚠️ make an excuse instead of saying it | *new* `yourno` |

---

# PART IV — Real Life (third year, autumn → graduation)

## Chapter 13 — "Health Class" *(new — sexual health at a high-school sex-education level; non-explicit)*
**Setting:** Third-year autumn. The school's sexual-health week: the school nurse, a peer-educator workshop, an
anonymous question box, and Kenta's group chat full of myths. Dr. Mochi (glasses) gives the fact cards. Characters
are 17. Nobody in this chapter has sex; every scene is a classroom, the health room, the rooftop or a chat.
**Goal:** accurate facts; how serious STIs are; red flags named by **behaviour and risk**, never by orientation;
refusal and impulse control. Waiting is normal and respected; the facts are there for whenever the player needs them.
**Core values:** V1, V8, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 13-1 | Kenta's myths in the group chat: "Pulling out works." / "She's on the pill, so no STIs." / "First time, you can't get pregnant." / "You can tell if someone has something." | ✅ check with Dr. Mochi: not having sex is the only 100% protection, and waiting is normal (most classmates haven't); condoms used correctly every time greatly reduce the risk of pregnancy *and* most STIs; the pill does not stop STIs; withdrawal is unreliable; pregnancy can happen the first time; you can't tell by looking · ❌ repost the myth · ⚠️ "I already know all this" | `protection` |
| 13-2 | The nurse's slides on STIs. Kenta: "Whatever, there's a pill for everything." | ✅ take it seriously: many STIs have no symptoms; untreated chlamydia or gonorrhoea can cause infertility; syphilis can damage organs; HIV is lifelong (treatable, not curable); some HPV types cause cancers (there is a vaccine); testing is confidential (resource card) · ❌ "It'd never happen to me." | *new* `stiserious` |
| 13-3 | Question box: "Which kind of sex has the highest STI risk?" A classmate laughs: "Only gay guys get HIV." | ✅ the fact: unprotected anal sex carries the highest risk of HIV and many STIs for anyone, whatever the partners' genders; oral sex can pass on STIs too; risk depends on what people do and whether they use protection, not on who they love. Say "That's not true, and it's not funny" (🧠+) · ❌ laugh along (the stereotype also makes people think *they* are safe) · ⚠️ stay quiet | *new* `riskbybehaviour` |
| 13-4 | Peer-educator card sort: "Green flag or red flag?" (a partner who keeps pressuring after no · wants to try choking "because it's in videos" · wants to film · gets someone drunk or high first · checks in and stops when asked) | ✅ sort correctly: pressure and coercion are never OK; choking/strangulation can cause brain injury or death within seconds, even "gently", so never; filming anyone without free agreement is abuse, and any intimate image of a minor is a crime; a drunk or high person cannot consent; checking in is the green flag. These are red flags whoever does them · ❌ "If they're into it, anything goes" · ❌ "Videos show it, so it's normal" | *new* `redflags` |
| 13-5 | Kenta has a secret online "girlfriend" who says she is 24. She sends gifts, says his friends are "immature", tells him to keep it secret, and asks for photos | ✅ tell him gently: an adult who seeks a secret relationship with a teenager, gives gifts, isolates him and asks for photos is grooming; it is not his fault; help him stop, keep the evidence and tell a trusted adult or the police (resource card). Groomers can be any gender · ❌ "Lucky you, an older woman!" · 💀 help him keep the secret and send the photos → **BAD END #28** *Our Little Secret* (serious tone, no joke; resource card) | *new* `grooming` |
| 13-6 | Rooftop partner talk: "What do we want, and when?" (solo: Kenta and his girlfriend ask your advice). Later, alone at your place, the moment gets heated | ✅ talk first and agree to wait; when the moment comes, stop: "Let's not — we agreed. I'll walk you home." (👑+, 🤝+) · ❌ "Just this once," no talk, no plan, no protection · ⚠️ "Everyone else has already" (they haven't; Dr. Mochi card) | *new* `waitingok` |

**Mentor beat:** the nurse: "Knowing the facts isn't permission and it isn't pressure. It's so that when you decide
— in a year or in ten — you decide well." Mochi: "And 'no' is a full sentence. Yours too."

## Chapter 14 — "Exam & Storm Season" *(merges the old exam beats and the old storm chapter)*
**Setting:** Entrance-exam winter: study blocks, all-nighters, a lie, maybe the end. **Goal:** your goals and health
come first; sustaining love under pressure; healthy breakups.
**Core values:** V1, V2, V3, V4.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 14-1 | H texts all evening; your study block is 7–10 PM. You've already skipped club twice to be "always available" | ✅ agree on phone-free study hours and a call at 10; go back to club (🎯+, 🤝+) · ❌ answer every message, learn nothing, skip club again · ⚠️ go silent without telling her | *new* `focus` / selfneglect |
| 14-2 | Three all-nighters on energy drinks before the mock exam | ✅ sleep, eat, walk (💤+, 🎯+) · ❌ a fourth all-nighter · 💀 a fifth, then fall asleep in the exam → **BAD END #22** *Energy Drink Speedrun* | *new* `sleep` |
| 14-3 | H has been withdrawn, exhausted, crying (family/exam pressure) | ✅ be present, listen, gently encourage her to talk to a counsellor/trusted adult; you don't have to fix it (resource card) · ❌ "cheer up, you're being dramatic" · ⚠️ try to be her only support and burn out yourself | support |
| 14-4 | You were at the arcade with Yuna/Rei but said you were studying. She sees a story | ✅ come clean immediately · ❌ double down with a bigger lie · 💀 fake an alibi with Kenta → BAD END #17 *The Alibi Group Chat* | smalllies |
| 14-5 | **Breakup branch** (if 🤝 < 30 or chosen): H says she needs to end it | ✅ "It hurts, but I respect it. Thank you for everything." → `kind_goodbye` path · ❌ beg, send 40 messages, wait at her house · 💀 revenge post / stalk her new friends → BAD END #18 *Main Character Syndrome* | breakup |
| 14-6 | After any breakup (route or Kenta's on solo), 3 AM, her profile open | ✅ close it; mute for a while, lean on friends, go back to your routines (🎸+, 💤+) · ❌ read her old messages until sunrise · ❌ drunk-text style "u up?" message | *new* `recovery` |

Moved: the two-weeks-apart beat (`distance`) → 16-4; the class-trip money beat (`money`) → the Ch14 partner talk
(financial support between partners); Dad and your passion (`familytalk`) → 15-5.

**Mentor beat:** Mei: "Losing someone doesn't mean you lost. Did you become a better person? Then you won something."

## Chapter 15 — "Graduation"
**Setting:** Winter → graduation spring. **Goal:** support dreams — hers *and* yours.
**Core values:** V2, V3, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 15-1 | H's dream opportunity in another city (Hina: nursing school in Sendai; Mio: Tokyo writing program; Kaede: sports university recruitment; Yuna: dance academy in Seoul) | ✅ "I'll miss you like crazy. Go. Let's figure out how we stay close." · ❌ "If you loved me, you'd stay." (guilt-tripping) · ⚠️ say nothing, sulk for a week | supportdreams |
| 15-2 | **Your** offer arrives: a program/apprenticeship for your passion, in another city. H asks you to turn it down and stay | ✅ "I'm going. Let's work out how we stay close." · ❌ turn it down "for her" (🎯−−, 🎸−−, 👑−) · ⚠️ accept without talking to her | *new* `dontshrink` |
| 15-3 | Alpha Kai's livestream gets exposed; Kenta admits he bought the ¥98,000 course and is ashamed | ✅ "Bro, we've all fallen for stuff. Let's get a refund and get ramen." · ❌ mock him in the group chat | brosupport |
| 15-4 | Rei's ending (if `reiRedemption`): police case against Goto; Rei thanks you for not "saving" her with money | ✅ stay a friend with boundaries · ⚠️ try to date her now (she gently says no — she needs time to heal) | rescuer (callback) |
| 15-5 | Before your offer arrives, Dad: "Drop the guitar/drawing. It won't pay the bills." | ✅ show your plan: passion hours, grades, a part-time-job budget; ask for a trial year · ❌ shout and slam the door · ⚠️ secretly quit your passion | *new* `familytalk` |

---

# PART V — On Your Own (first year after school, 18–19)

## Chapter 16 — "Living Alone" *(new)*
**Setting:** A tiny flat in a new city. Laundry, groceries, rent. **New:** **Ren**, a stylish classmate with a perfect feed.
**Goal:** looking after yourself is the basis of looking after anyone. Debt and lending traps.
**Core values:** V2, V4, V5.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 16-1 | Week one: delivery every night | ✅ learn three cheap recipes; plan a weekly shop (¥+, 💤+) · ❌ keep ordering (¥−, 💤−) · ⚠️ instant noodles for a month | *new* `adulting` |
| 16-2 | Station booth: "Student credit card! Free tumbler! Pay later!" | ✅ read the terms; decline, or take it with a tiny limit · ❌ take it and buy a gaming PC "for my passion" · 💀 max it on dates and gadgets, pay only the minimum → **BAD END #23** *Minimum Payment Forever* | *new* `debt` |
| 16-3 | Ren — perfect outfits, perfect feed — asks to borrow ¥60,000 for rent. Again. His flat is a mess and he's lost two jobs | ✅ say no kindly; point him to the student support office · ❌ lend it: "he looks so put-together" · ⚠️ lend half | *new* `lending` |
| 16-4 | Long distance: H (or, on solo, Kenta) wants you home every weekend; the train is ¥14,000. She panics when you don't reply for an hour | ✅ agree a rhythm you can afford (every third weekend + a goodnight message + a Sunday call) and talk money openly · ❌ go every weekend on credit · ❌ "why didn't you reply in 10 minutes?" ×30 · ⚠️ go, then resent it | `distance` / `money` |
| 16-5 | You've barely spoken to anyone in two weeks; you game until 5 AM | ✅ join a club, call Mei, or book the campus counsellor (💤+) · ❌ "I'm fine," and isolate | *new* `askhelp` |

## Chapter 17 — "Welcome Party" *(new)*
**Setting:** The school/company welcome party. Drinking age is 20; you're 18. **New:** **Saki** (classmate), **Nana** (classmate).
**Goal:** refusal, impulse control, and stepping in to keep someone safe.
**Core values:** V6, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 17-1 | A senior: "One shot or you're not one of us." | ✅ "I'm good with oolong tea." Repeat it calmly if pushed (👑+) · ❌ drink to fit in · ⚠️ pretend to drink and pour it in a plant | *new* `peerpressure` |
| 17-2 | Saki is very drunk. A male senior offers to "take her home" | ✅ step in: stay with her, find her friends, tell the staff, get her home with someone she trusts · ❌ "Not my business." · ⚠️ ask the senior if he's sure, then leave | *new* `bystander` |
| 17-3 | You left your drink at the table for ten minutes | ✅ get a new one · ❌ drink it anyway | *new* `drinksafety` |
| 17-4 | Nana, whom you met tonight, invites you to skip the after-party and go to her place. You feel the impulse | ✅ "I'd like to get to know you. Coffee on Saturday?" (no judgement of her; it's about your own decision) · ❌ go on impulse: no conversation, no plan, no protection · ⚠️ go along because your friends are cheering | *new* `impulse` |
| 17-5 | Morning: the group chat is sharing photos of a classmate passed out at the party | ✅ don't forward; ask for them to be deleted; check on him · ❌ forward with a laughing emoji | `chatprivacy` |

**Ending beat:** Mochi: "An adult isn't someone who can drink. It's someone who can say no to a room."

## Chapter 18 — "The Long Talk" *(new — adult relationships, 18+; non-explicit)*
**Setting:** The relationship gets serious; you are both adults now. On solo, Kenta brings you the same questions
about his girlfriend, and you go with him to the clinic. Dr. Mochi gives the fact cards. Intimate moments cut away;
nothing is shown beyond a hug. The high-school facts from Ch13 are called back, not repeated.
**Goal:** adult relationships are built on talking: readiness, shared responsibility, testing, ongoing consent,
your own timeline, and the future (the children talk, VALUE_PROFILES §5).
**Core values:** V1, V9, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 18-1 | H brings up "the talk": readiness, boundaries, what each of you wants | ✅ talk openly: what each of you wants, what's off the table, that waiting is fine (🤝+) · ❌ make a joke and change the subject · ⚠️ "Whatever you want." (no voice of your own) | *new* `talkfirst` |
| 18-2 | Kenta: "She's on the pill, so protection is her job." | ✅ contraception and STI protection are both partners' responsibility: talk about it, share the cost, use condoms as well as other methods (callback to 13-1) · ❌ leave it all to her | *new* `sharedprotection` |
| 18-3 | Getting tested together before a new relationship becomes intimate. It's awkward | ✅ go; ask the nurse your questions (callback: many STIs have no symptoms; HPV vaccine) · ❌ "I'm clean, I'd know." | *new* `testing` |
| 18-4 | A close moment. She hesitates: "Actually, not tonight." Or there's no condom | ✅ stop; "I'm glad you told me," no sulking; no condom means not tonight · ❌ "But we planned it…" · 💀 keep pushing → **BAD END #24** *Not Tonight Means Not Tonight* (serious tone; resource card) | *new* `ongoingconsent` |
| 18-5 | Kenta: "You're 18 and you still haven't?!" | ✅ "My timeline is mine." (👑+) · ❌ rush to "catch up" with someone you barely know | *new* `yourtimeline` |
| 18-6 | A scare: the condom broke (on solo: Kenta's girlfriend) | ✅ stay calm; emergency contraception works best the sooner it's taken, so go to a pharmacy or clinic together, support her decisions, share the cost; plan an STI test (resource card) · ❌ panic, blame, go silent | *new* `scareplan` |

## Chapter 19 — "The Perfect Match" *(new)*
**Setting:** Lonely in a new city, you download a dating app. Rei returns, now giving talks on how scams target lonely men.
**Goal:** adult-grade scams and manipulation; the polished profile is a script.
**Core values:** V4, V6, V7.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 19-1 | "Lin, 24, finance": a stunning profile, a week of love bombing, then screenshots of her crypto gains — "let me teach you" | ✅ reverse-image search, don't invest, report the profile · 💀 invest, then "add margin" → **BAD END #25** *The Soulmate Portfolio 2: Leveraged* (callback BE #1) + resource card | *new* `pigbutcher` |
| 19-2 | A "VIP matchmaking agency" promises dates with models for a ¥30,000 deposit | ✅ walk away: you can't buy a person's time and affection, and the agency doesn't exist · ❌ pay the deposit, then the "verification fee" | *new* `depositscam` |
| 19-3 | A match asks for a video call and asks you to undress | ✅ decline and end the call · ❌ comply → it was recorded → second choice: ✅ don't pay, keep evidence, report (Take It Down / police) · 💀 pay → **BAD END #26** *Paid in Full, Twice* | `sextortion` |
| 19-4 | A man from Kai's network invites you to a "wealth mindset" seminar: "Your friends are holding you back." | ✅ decline, check the reviews, warn Kenta · ❌ sign up · 💀 recruit Kenta and Mei → **BAD END #27** *Downline* | *new* `mlm` |
| 19-5 | After Rei's talk, Kenta admits he's being "love-bombed" by a stranger asking for money | ✅ help him stop and report it, with zero shaming · ❌ "How dumb are you?" | *new* `noshame` |

## Chapter 20 — "Your Own Story" (finale)
**Setting:** One year after graduation. **Goal:** the honesty test and the life review. Endings weigh Your Life most.
**Core values:** V2, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 20-1 | **Honesty quiz** (reference-game homage, original questions): "Did you notice what changed about me?" / "Have you ever lied to me?" / "What's my favourite thing?" | ✅ honest answers ("I don't know — tell me?") beat confident wrong guesses; flattery loses · ❌ lie about 14-4 again | honesty |
| 20-2 | A luxury couple trip "to post online", on credit (solo: Kenta proposes a luxury "bro trip") | ✅ "Let's do the trip we can afford." · ❌ book it on credit | `materialism` |
| 20-3 | Your passion pays off (first gig / exhibition / game release / tournament). It clashes with H's plan for the weekend | ✅ talk early; she comes, or you agree on another weekend · ❌ cancel your big day · ⚠️ decide alone and announce it | `ownstage` |
| 20-4 | Mochi's final exam question: "So — what is love?" | Any honest answer is accepted; flattery or "she's my everything" makes Mochi sigh (🌹 check) | — |
| 20-5 | **Ending evaluation** (GAME_DESIGN §7). Epilogue scenes per ending | — | — |

**Epilogue:** Mochi: "Love isn't something you find. It's something you *do*, every day, on purpose. Mostly by being someone worth knowing."

---

# Partner talks and art needs per chapter

Partner talks follow the template in [VALUE_PROFILES.md](VALUE_PROFILES.md) §5.1 (topic, opposing views, healthy
outcomes). Locations marked ★ exist in `assets/bg/`; everything else is a new background (full list and reuse plan:
VALUE_PROFILES §8). Sprites: the five heroines and Mochi exist; supporting cast are new unless noted. Visuals are at
most a hug in every chapter.

| Ch | Partner talk (topic → opposing views) | Locations | Cast on screen (beyond the player) |
|---|---|---|---|
| 1 | Refusal: Kenta "friends never say no" ↔ Hina "friends can hear no" | classroom, street ★, library ★, field ★, bedroom ★ | 5 heroines, Mochi, Kenta |
| 2 | Friendship: wide circle (Yuna) ↔ a few deep friends (Hina, Mio) | amusement, street ★, karaoke (tint of partyroom) | heroines, Kenta, Alpha Kai (phone) |
| 3 | White lies: kind (Yuna) ↔ "tell me straight" (Kaede, Hina) | bedroom ★, library ★, classroom, night ★ | heroines, Rei, Kenta, "Airi" (phone) |
| 4 | Spending: enjoy now (Kaede) ↔ save first (Hina, Mei) | cafe, mall, dining, bedroom ★ | Ogawa, Mei, Kenta, Yuna (stream), Kaede |
| 5 | Life outlook: win · meaning · family · be known | campsite (day + night), field ★ | heroines, Kenta, Ogawa (phone) |
| 6 | Broken promises: Takumi "plans change" ↔ Hina "say so before" | classroom, festival, cafe, night ★ | heroines, Takumi, Kenta |
| 7 | Greed: Kai (invalid) ↔ Ogawa "enough" ↔ Yuna "nice things are nice" | street ★, mall, bedroom ★ | heroines, Kenta, Alpha Kai (phone) |
| 8 | Why do you like someone? Kenta looks ↔ Mei character | rooftop, classroom, fireworks | heroines, Kenta, Mei |
| 9 | Gifts & who pays: brand (Yuna) ↔ letter (Mio); split vs. take turns | street ★, cafe, mall | H, Kenta, Mei |
| 10 | What counts as cheating? (per heroine) | night ★, field ★, classroom | H, H's male friend, Alpha Kai (phone) |
| 11 | Couple time vs. friends and hobby | bedroom ★, cafe, rooftop | H, Kenta, Ogawa |
| 12 | Shopping & her family's views on money | mall, dining, beach, bedroom ★ | H, H's parents (silhouette OK), Kenta, beach boys |
| 13 | Boundaries as a couple: wait ↔ "everyone has" | classroom, healthroom, rooftop, bedroom ★ | H, Kenta, school nurse, peer educator, Mochi (Dr.) |
| 14 | Financial support: "I'll pay" ↔ "I don't want to owe you" | library ★, bedroom ★, station, night ★ | H, Kenta, Yuna/Rei (14-4) |
| 15 | Learning & career: Dad security ↔ passion; Ogawa still studying | gradhall, dining, station, field ★ | H, Dad, Mom, Kenta, Rei, Ogawa |
| 16 | Supporting parents: send money home ↔ build your own life first | apartment, station, cafe | H (phone), Mei, Mom (phone), Ren |
| 17 | Friendship & lending: "friends help" ↔ "friends aren't a bank" | partyroom, cafe, lecture | Saki, Nana, Ren, a senior |
| 18 | Children & child education (per heroine) | apartment, park, healthroom (clinic version) | H, Kenta, nurse, Mochi (Dr.) |
| 19 | "Easy investment": a friend's sure thing ↔ Rei's scam-script talk | apartment, lecture, cafe | Rei, Kenta, "Lin" (phone), Kai's recruiter |
| 20 | Money as a couple: joint ↔ separate ↔ shared pot | rooftop (sunset), apartment, park | H, Kenta, Mei, Mochi |
