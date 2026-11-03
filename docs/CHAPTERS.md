# sim4love — Chapter Design (20 chapters, 5 parts)

Read [CORE_VALUES.md](CORE_VALUES.md) first. Every interaction below lists the value(s) it reinforces (V1–V10).

How to read this:
- Each chapter has a **setting**, a **goal**, its **core values**, then 4–6 **interactions** (`7-3` = chapter 7,
  interaction 3). Marks: ✅ healthy (always the best total outcome) · ⚠️ mild mistake · ❌ mistake · 💀 bad end (comic,
  instantly rewindable).
- Stats: `♥` the focused heroine's Connection, `🤝` trust, `🧠` Love IQ, `👑` Self-respect. **Your Life** track
  (see GAME_DESIGN §6): `🎯` goal (study/career), `🎸` passion (the hobby chosen in 2-7), `💤` health, `$` wallet (Singapore dollars; all prices approximate, see GAME_DESIGN §3.1).
  `🌹` = Rose Filter (projection) — idealising raises it, fact-checking lowers it.
- `→ lesson` IDs: existing ones are in `js/data/lessons.js`; **new IDs** are marked *new* and listed in
  [MISTAKES.md](MISTAKES.md) §4. `⚑ flag` = flag for later callbacks.
- From Part III, **`H`** = the route heroine. On the **solo** route, relationship scenes are replayed through Haziq's
  relationship (you are his adviser and must pick the correct advice), friends, family and your passion.
- **Setting: Singapore** (GAME_DESIGN §3.1). The player and the heroines attend **Bayview Junior College** (fictional)
  and live around the fictional HDB estate of **Seri Bayu**. Real public places (MRT, hawker centres, East Coast Park,
  Sentosa, Gardens by the Bay, Pulau Ubin, polyclinics, library@ branches) appear as generic, non-branded scenery.
- **Ages and calendar.** Parts I–III: JC1 (16–17; Feb → year-end holidays). Part IV: JC2 (17–18; A-levels in Oct–Nov,
  results the next February). Part V: the year after A-levels (18–19); the player is doing **National Service** (NS)
  as a full-time NSF, the heroines are at university, polytechnic, an academy or work.
  Sexual-health education sits in **JC** (Ch12 consent and images, **Ch13 "Health Class"**: contraception, STIs,
  red-flag behaviours, refusal) at a school sex-education level; Ch18 covers adult-relationship topics (18+).
  Everything is non-explicit: scenes cut away; facts are given on Mochi's fact cards; visuals are at most a hug.
- **Think Deeper 🔍.** Seven partner talks are followed by an optional **Think Deeper** card (GAME_DESIGN §6.2): a
  mentor offers 2–3 balanced lenses (structural/economic, personal responsibility, culture/family) on a big-life topic,
  with Singapore context, then a reflection prompt. No grading. Chapters: 4, 9, 14, 15, 16, 18, 20 (table at the end).
- **Cast layer.** Every chapter also feeds the character systems in [CAST_BIBLE.md](CAST_BIBLE.md) §5: per-person
  Affection and Trust, hidden "?" radar axes revealed by story beats, flaws (hidden → seen → growing → resolved),
  first-impression judgements that are struck through when proved unfair, optional neglect / juggling / gossip
  (Settings toggle), mid-scene toasts and Mochi's end-of-chapter "What changed" recap. Chloe (`chloe`), Preet
  (`preet`), Ah Ma (`ama`), Joy and Natalie have beats from Ch1 onward; Chloe and Preet are confessable in Ch8.
- **Partner talks and variants.** Each chapter also has one **partner talk** (a value discussion with genuinely
  opposing views) and reuses locations with different lines per visit. Profiles, talk template, variant pools and
  the per-chapter topic map: [VALUE_PROFILES.md](VALUE_PROFILES.md). Per-chapter art needs: the table at the end.
- Old numbering → new numbering (code files still use the old numbers until restructured, see HANDOFF):
  old 1→1, 2→2, 3→3, 4→6 + 8, 5→9, 6→10, 7→11, 8→12, 9→14 (+ 15-5), 10→15 + 20. Ch13 is new.

## Overview

| Part | Ch | Title | Focus | Core values |
|---|---|---|---|---|
| I — Rose-Tinted | 1 | First Week of JC ✅ *(playable; Singapore text pass pending, HANDOFF)* | First impressions, love bombing, consent, mixed signals, fish pond | V1 V5 V6 V9 |
| | 2 | The Group Date | Outing; curiosity, negging, buying love, isolation; **choose your passion** | V2 V4 V8 |
| | 3 | Seen at 2:14 AM | Texting, chat privacy, sextortion, emergency scams | V1 V6 |
| | 4 | Payday *(new)* | Part-time job, budgeting, family money, paid attention, installments | V3 V4 V7 |
| II — Behind the Filter | 5 | Ubin Camp *(new)* | June-holiday camp; people unfiltered, fair share, refusing a drink, group safety, projection | V5 V6 V9 |
| | 6 | Carnival Week | Rescuer trap, honest juggling, polished masks, keeping your own stage | V2 V5 V8 |
| | 7 | Behind the Screen *(new)* | De-idealisation chapter: fantasy vs facts, idol burnout, parasocial spending, materialism | V5 V6 V7 V8 |
| | 8 | National Day | "Why her?", confession, rejection, **route lock** (or solo) | V1 V6 V8 |
| III — Being Together | 9 | After "Yes" | Effort drop, moving too fast, kiss-and-tell, own life, date budget | V2 V4 |
| | 10 | Green-Eyed Monster | Jealousy, snooping, control, double standards | V1 V8 |
| | 11 | The First Fight | Listening, apology, stonewalling, repair | V1 V10 |
| | 12 | Closeness | Asking, pressure, intimate images, your own "not yet" | V9 |
| IV — Real Life | 13 | Health Class *(new)* | High-school sex education: contraception facts, serious STI consequences, risk by behaviour (not orientation), red-flag behaviours, grooming, refusal | V1 V8 V9 |
| | 14 | Prelims & Storm Season | Focus, sleep, supporting her, small lies, breakup and recovery | V1 V2 V3 V4 |
| | 15 | Results Day | Her dream, your dream, Dad and your passion, Kai exposed, Rae's case, the NS letter | V2 V3 V8 |
| V — On Your Own | 16 | Book Out *(new)* | NS rhythm, adulting at home, buy-now-pay-later traps, lending money, sustainable distance, BTO talk | V2 V4 V5 |
| | 17 | Chalet Night *(new)* | Peer pressure, alcohol (legal at 18, never required), bystander help, impulse, drink safety | V6 V9 |
| | 18 | The Long Talk *(new)* | Adult relationships: talking first, shared responsibility, testing, ongoing consent, your timeline, a scare, the children talk | V1 V9 V10 |
| | 19 | The Perfect Match *(new)* | Adult scams: investment romance, deposit "agencies", video sextortion, MLM | V4 V6 V7 |
| | 20 | Your Own Story | Honesty quiz, life review, final choices, endings | V2 V10 |

---

# PART I — Rose-Tinted (JC1, Term 1: February–March)

## Chapter 1 — "First Week of JC" ✅ IMPLEMENTED (`js/chapters/ch01.js`; Singapore text pass in HANDOFF)
**Setting:** JC1 orientation week at Bayview JC, February; the covered walkway from the Seri Bayu HDB blocks; Mochi appears. **Goal:** first impressions — the shine vs the person.
**Core values:** V1, V5 (Rae's polish is a tool), V6, V9. Stays as implemented. Only addition planned: Mochi's last
line introduces the Your Life panel ("Also: you have a life. Try to keep it.").

| # | Setup | Options | Lesson |
|---|---|---|---|
| 1-1 | Hanis (same HDB floor since kindergarten) brings "leftover" nasi lemak with the egg cut into hearts | ✅ notice & thank (♥+15) · ⚠️ tease (♥+5) · ❌ keep scrolling (♥−10) | appreciation / teasing / presence |
| 1-2 | Rae bumps into you: "soulmates", crypto app | 💀 invest savings → BAD END #1 *The Soulmate Portfolio* · ✅ "we just met" · ⚠️ give your Telegram handle, refuse money ⚑`reiHasLine` | romancescam / lovebomb |
| 1-3 | Xin Yi drops her book in the library | ✅ ask, listen, leave before it's awkward · 💀 grab her hand → BAD END #2 *The Council Would Like a Word* · ❌ mock the book | signals / consent / mockery |
| 1-4 | Kavya stands you up, "you actually waited? 😏" | ❌ "I'll wait every day ♡" · ✅ calm, clear reply ⚑ (Ch2 date is real) · ❌ revenge story | hotcold / clearwords / games |
| 1-5 | Elise: homework + $120 concert ticket, KTV with 3 "besties" | ❌ do it all · ✅ help study, decline ticket, "what are we?" · 💀 14 jealous texts → BAD END #3 *Message Not Delivered* | fishpond / clarity / neediness |

---

## Chapter 2 — "The Group Date"
**Setting:** Saturday at Sentosa: the beach, an arcade and the cable car → KTV in a mall. **New:** Haziq (organiser), Alpha Kai (phone ads).
**Goal:** the group "talking stage": conversation, showing off, buying love; then build a life of your own.
**Core values:** V2, V4, V8.

**Opening:** Haziq bursts in: "Bro. I organised a group date. Five girls said yes." (Three said maybe.)

| # | Setup | Options | Lesson |
|---|---|---|---|
| 2-1 | 40-minute queue for the cable car, standing next to Xin Yi | ❌ monologue about your game rank for 40 min (Xin Yi's eyes glaze — chibi Xin Yi sleeping) · ✅ ask about *The Starlight Postman* volume 3 (callback `mioVol3`) and ask follow-ups · ⚠️ stay silent on your phone | curiosity |
| 2-2 | Alpha Kai ad: "NEG HER to lower her value! 'You'd be cute if you smiled more.'" Kavya is next to you | ❌ try the neg on Kavya (she laughs *at* you; Haziq facepalms) · ✅ compliment something she *did*: "your last 100m split was insane" · 💀 go full Kai ("I'm the prize") with a fake deep voice → BAD END #4 *Negged Yourself* (everyone leaves you alone in a cable car) | negging |
| 2-3 | Dessert stall. You want to impress | ❌ buy everyone the $18 "premium" bingsu with your whole month's money (👑−) · ✅ treat once, modestly, or split · ⚠️ make Haziq pay for everything | buyinglove |
| 2-4 | Arcade horror-ride pairs. Elise clings to you for her story video while Hanis watches | ❌ play it up to make Hanis jealous · ✅ keep it friendly, invite Hanis into the photo, include everyone · ⚠️ panic and run out screaming (achievement *Ghosted*) | triangulation |
| 2-5 | Haziq falls off the beach swing into the sea. Everyone laughs | ❌ mock him to look cool ("this is why you're single, bro") · ✅ help him out, give him your jacket, laugh *with* him | punchingdown |
| 2-6 | KTV. Rae (if `reiHasLine`, else an unknown number): "your friends are boring, they don't get you like I do. Skip school Monday and come see me" | ✅ "I'm having fun with my friends — see you never 😅" · ❌ leave KTV to meet her · 💀 skip school, give her your bank PIN "for our future" → BAD END #5 *Just You and Me (and My Manager)* | isolation |
| 2-7 | Walking home, Mochi opens the **Your Life** panel: "Pick something that's yours." | ✅ pick one passion (guitar / drawing / coding a small game / basketball) and a weekly hour for it (🎸+10) ⚑`passion` · ⚠️ pick all four (each grows at half speed) · ❌ "My passion is… her." (Mochi: "That's a person, not a hobby." 👑−) | *new* `ownpassion` |

**Ending beat:** Hanis: "You were… different today. Nicer." Mochi: "Group dates are job interviews where everyone pretends not to be interviewing."

---

## Chapter 3 — "Seen at 2:14 AM"
**Setting:** One school week, mostly at night on the phone. **Goal:** texting dynamics, privacy, online traps aimed at boys.
**Core values:** V1, V6 ("Aileen" is a glamorous fake profile: beauty used as bait).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 3-1 | Kavya's real date (if `kaedeReschedule`; else she apologises and asks again). Café after practice | ❌ talk about how cute her teammate is (comparing) · ✅ ask about her race goals, share yours · ⚠️ check your phone every 2 minutes | comparing / presence |
| 3-2 | You texted Xin Yi at 9 PM. 11 PM: "Seen". 2:14 AM: still nothing | ❌ double, triple, quadruple text ("??", "did I do something wrong", "ok then") → achievement *Read at 2:14 AM* · ✅ put the phone down, sleep; she replies next morning ("I fell asleep reading! sorry!") · ⚠️ un-send and re-send a "casual" message | textanxiety |
| 3-3 | Boys' group chat: Haziq: "bro send screenshots of what Elise says to you lol" | ❌ send them — the screenshot leaks to Elise's group · ✅ "nah, those are private" · ⚠️ send but crop names (still leaks) | chatprivacy |
| 3-4 | A gorgeous stranger "Aileen 💋" adds you, flirts for 2 days, then asks for a "private photo, just for me" | ✅ don't send, block, report (🧠+20) · ❌ send it → **scene, not bad end:** "Aileen" threatens to post it to your school contacts unless you pay $500. Second choice: ✅ don't pay, keep evidence, block, report, tell a trusted adult (Mei calls — supportive) · 💀 pay → BAD END #6 *They Always Ask Again* (demand doubles). Ends with resource card | sextortion |
| 3-5 | Rae: "my mom's in hospital, I need $800 tonight, you're the only one I can trust 😭" (link to a payment app) | ✅ refuse money, suggest she call family or the hospital's medical social worker; notice the pattern (🧠+) ⚑`reiDoubt` · ❌ send half · 💀 borrow from Mei's savings → BAD END #7 *The Hospital That Wasn't* | emergencyscam |
| 3-6 | Friday = Hanis's birthday (`hinaBirthdayKnown`) | ✅ small thoughtful gift tied to something she said (a cat-face lunch-box bag) · ❌ forget, then a generic 7-Eleven-style gift card at 11:58 PM · ⚠️ expensive brand-name gift bought in panic (she's uncomfortable) | remember / buyinglove |

**Ending beat:** Mei: "Have you eaten? Also — never send photos to people you haven't met. Ever."

---

## Chapter 4 — "Payday" *(new)*
**Setting:** First month of weekend shifts at Uncle Ong's kopitiam-style café near the MRT (about $10/hour). You earn about $480. Mei calls: Dad's shifts were cut.
**Goal:** money is a boundary. Spending to be liked buys a moment; investing in yourself buys years.
**Core values:** V3, V4, V7. Male characters model the bad habits too (Haziq, Kai).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 4-1 | First wages in your hand | ✅ split it: savings, passion (new strings / tablet pen), a little fun ($+, 🎸+) · ❌ spend it all on sneakers and a designer charm "so they notice me" ($−−) · ⚠️ lend all of it to Haziq without asking what for | *new* `budget` |
| 4-2 | Elise's livestream. Top gifters get a shout-out and a heart. You feel seen when you tip | ✅ enjoy the stream, say hi to her in person tomorrow · ❌ tip $100 to get on screen · 💀 a gift battle with a stranger, paid with Mei's card → **BAD END #19** *Top Gifter of Nothing* (she reads your name out once, mispronounced) | *new* `paidattention` |
| 4-3 | Kavya, half-joking: "A good teammate would buy me those $240 spikes." | ✅ "Ha. No. But I'll time your intervals." (♥+, 👑+) · ❌ spend the month's wages on them (she's embarrassed: she didn't mean it) · ⚠️ buy cheap knock-offs | *new* `moneyboundary` |
| 4-4 | Haziq signs up for Alpha Kai's "Alpha Mindset" course, $998 in 12 easy instalments of $83, and wants you to split it | ✅ show him the total cost and the refund reviews; suggest the free library@ e-book · ❌ split it with him · ⚠️ shrug and say nothing | *new* `installments` |
| 4-5 | Mei: Mum asked if you could skip the class-trip extras this year | ✅ talk honestly, contribute something, keep your savings plan (🎯+) · ❌ "Not my problem" and buy a gift for a crush anyway · ⚠️ secretly give everything and skip lunches for a month (💤−) | *new* `familymoney` |

**Mentor beat:** Uncle Ong: "Money you spend to be liked buys you a moment. Money you spend on becoming someone buys you years."
**🔍 Think Deeper** (`deeper:'consumption'`, after the spending talk; Uncle Ong): why spending feels like love (§ table at the end).

---

# PART II — Behind the Filter (JC1, June holidays → August)

## Chapter 5 — "Ubin Camp" *(new)*
**Setting:** Three-day CCA/class camp on Pulau Ubin in the June holidays: bumboat, campsite tents, cooking duty, kayaking, cycling, stargazing, a forest trail.
**Goal:** see people without the filter; refuse, stay with the group, notice your own projection.
**Core values:** V5, V6, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 5-1 | 6 AM at the wash basins. Elise, no makeup, hoodie, toothbrush; Kavya grumpy and half-asleep | ✅ "Morning." Treat it as completely normal (♥+ for both) · ❌ "Whoa, you look so different!" · ⚠️ snap a candid "for memories" without asking | *new* `unfiltered` |
| 5-2 | Cooking duty. Kavya, cool on the track, burns the curry; she can't cook at all. Elise is on her phone | ✅ show Kavya the basics; split the jobs fairly, including Elise's · ❌ do everything yourself to impress them and miss the kayak race (🎸−, 💤−) · ⚠️ mock the curry | *new* `fairshare` |
| 5-3 | Night. Older strangers camping nearby invite you to their fire, away from the teachers, and hand you a can of beer (you're 16–17; it's also illegal for them to supply it) | ✅ "Nah, I'm good," and stay with the group (👑+) · ❌ go and drink "just one" · 💀 wander off along the dark trail with them → **BAD END #20** *Search Party of One* + resource card | *new* `refusal` |
| 5-4 | Stargazing. Xin Yi admits she wrote you into her novel as a "perfect prince". You realise you've been imagining her as the "perfect quiet girlfriend". Neither is real | ✅ laugh about it; tell her one boring, embarrassing true thing about yourself and ask hers (🌹−, ♥+) · ❌ "You're exactly how I imagined you." (🌹+) · ⚠️ get offended | *new* `projection` |
| 5-5 | Cycling trail. Hanis twists her ankle; you're off the marked path; phone at 3% | ✅ stay put, call the teacher-in-charge, share your location, save battery · ❌ "I know a shortcut" to look capable · ⚠️ panic-post in the group chat instead of calling | *new* `stayput` |

**Ending beat:** Mochi: "Turns out nobody wakes up with idol lighting. Not even idols."

---

## Chapter 6 — "Carnival Week"
**Setting:** Racial Harmony Day (21 July) opens the school's carnival week: traditional-costume day, food stalls run by
classes and CCAs, the CCA showcase stage, your passion slot. Every community's food and dress is shown with respect.
**Goal:** the rescuer trap, honesty when interested in several people, polished masks, keeping your own stage.
**Core values:** V2, V5 (Marcus), V8. (The confession and route lock move to Ch8.)
**New:** **Marcus**, the polished, universally admired student-council president.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 6-1 | Xin Yi is scheduled to read her short story on stage; she's terrified and wants to quit | ✅ "Want me to sit front row so you can look at a friendly face?" · ❌ "Just don't be nervous lol" · ⚠️ take over and read it for her (she feels erased) | supportnotsave |
| 6-2 | Rae appears with a man in a suit — **Mr. G**. Alone, she cracks: she's in debt to his "agency" and is made to chat with boys | ✅ boundary + real help: "I won't give money, but I'll go with you to the police or call the ScamShield Helpline 1799" ⚑`reiRedemption` · ❌ "I'll pay off your debt!" (Mr. G smiles) · 💀 confront Mr. G alone in the back alley → BAD END #8 *Hero Mode: Off* | rescuer |
| 6-3 | **Fish-pond check.** If you flirted with 3+ heroines (♥ ≥ 25 for 3+ and no clarity), all of them end up at your class's food stall. If not, Haziq tries to juggle two girls and you advise him | ✅ honest: "I've been getting to know a few people; I'm figuring out my feelings and I'll be straight with you" · ❌ lie to each one ("you're the only one") · 💀 hide in the costume closet → BAD END #9 *The Fish Pond Keeper* (the tables are turned: you are now the fish-pond) | honestjuggle |
| 6-4 | Marcus offers you a place in his "inner circle" if you cover his class's stall shifts. Behind the polish he is lazy and takes credit for other people's work | ✅ decline politely, do your own shift well · ❌ cover his shifts to be accepted (💤−, 🎯−); he thanks the teacher for "his team's hard work" | *new* `polishedmask` |
| 6-5 | Your passion slot on the CCA showcase stage is at 3 PM. Elise asks you to skip it and carry her props instead | ✅ keep your slot, help her straight after (🎸+15) · ❌ cancel your slot "for her" (🎸−, 👑−) · ⚠️ rush your set and do both badly | *new* `ownstage` |

---

## Chapter 7 — "Behind the Screen" *(new)*
**Setting:** Late July, between carnival and National Day. The player's crushes peak; so does the internet. Haziq is hooked on a streamer; Alpha Kai shows his lifestyle.
**Goal:** the de-idealisation chapter. Infatuation is mostly projection; glamour is packaging; nobody owes you a fantasy.
**Core values:** V5, V6, V7, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 7-1 | Mochi reads your notes app: 30 "perfect" traits of your crush, 26 of them invented. The Rose Filter is at max | ✅ split the list into "things I know" and "things I assumed" (🌹−−, 🧠+) · ❌ add five more · 💀 print her photos and build a desk shrine; her friends see it on a video call → **BAD END #21** *Fan Club of One* | *new* `factsvsfantasy` |
| 7-2 | You help Elise carry stage boxes back to her HDB flat. Her room is chaos; she lives on energy drinks, sleeps four hours, and is exhausted by her online persona | ✅ treat her like a normal person: no judgement; suggest food and sleep; it's not your job to fix her, so suggest she talk to a counsellor (♥+, 🌹−) · ❌ "You're nothing like your stream." (as if she owed you an image) · ⚠️ become her unpaid cleaner and assistant | *new* `realperson` |
| 7-3 | Haziq has spent his savings on a streamer. Her "you're special" message is a template every top gifter gets | ✅ show him gently, no mockery, and get him back to basketball · ❌ call him a "simp" in the group chat · ⚠️ "Just tip less, bro" | *new* `parasocial` |
| 7-4 | Alpha Kai's stream: Lamborghini, watch, "attract the hottest girls". Chat proves the car is rented by the hour. An ad for an installment watch pops up | ✅ close it and spend the evening on your passion (🎸+) · ❌ buy the fake designer watch in 24 instalments ($−) · ⚠️ watch three hours "ironically" | *new* `materialism` |
| 7-5 | Mochi: "Who are you when nobody is watching?" One free evening | ✅ practise (🎸+), study (🎯+) or sleep (💤+): all are healthy · ❌ four hours scrolling her feed (🌹+) | *new* `attention` |

**Ending beat:** Elise, later: "Thanks for treating me like a normal person who's bad at sleeping."

---

## Chapter 8 — "National Day"
**Setting:** 9 August: the National Day fireworks seen from the Marina Bay waterfront (or a heartland viewing spot), after the NDP watch party. **Goal:** know *why* before you confess; confess well; accept the answer; route lock.
**Core values:** V1, V6, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 8-1 | Mochi, before the fireworks: "Why her?" | ✅ reasons about how she treats people and how you are together (🧠+) · ❌ "She's the prettiest." (🌹+) · ❌ "I can't live without her." (👑−) | *new* `whyher` |
| 8-2 | Fireworks. Who do you confess to? (options for each heroine with ♥ ≥ 30; Elise needs `yunaClarity`) · or **"Not now — I want to work on myself first"** → `solo` | Confession style: ✅ private, simple, honest, "you don't have to answer now" · ❌ megaphone confession on stage with the whole school watching (pressure) · ⚠️ confess by text with 20 emojis | publicpressure |
| 8-3 | **Her answer.** Yes if ♥ ≥ 40 (and no ❌ in 6-3). Otherwise a kind no | If **no**: ✅ "Thank you for being honest. I'm glad I told you." (friendship kept, ♥ bonus, → `solo`) achievement *Respect +100* · 💀 "After everything I did for you?!" → BAD END #10 *Nice Guy™* · ❌ "I'll wait forever until you change your mind" (👑−). If **yes**: hand-holding consent check — ✅ "Can I hold your hand?" · ❌ grab it (she flinches; fx −) | rejection / consent |
| 8-4 | **The solo choice**, available all chapter: "This year I'm focusing on my exams and my passion." | ✅ a fully valid route, not a consolation prize (🎯+, 🎸+, 👑+) → `solo` | `ownlife` |

**Route lock:** `S.route = 'hina' | 'mio' | 'kaede' | 'yuna' | 'solo'`, `stats.trust = 20`.
**Ending beat:** Mochi: "Congratulations. You got a 'yes'. The hard part starts now." (solo: "No girlfriend, but you kept something better: your dignity. Also me.")

---

# PART III — Being Together (JC1 Term 4 → year-end holidays → Chinese New Year)
Shared spine; `H` = route heroine. **Solo:** the same lessons through Haziq's relationship, friends, family and your passion.

## Chapter 9 — "After 'Yes'"
**Setting:** The first month together (late August–September). **Goal:** honeymoon traps, and keeping your own life.
**Core values:** V2, V4.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 9-1 | Two weeks in. Saturday: you'd planned nothing; a new game just dropped. H: "Are we doing anything?" | ❌ "Can we just stay in? I'm in a raid" (third weekend in a row) · ✅ plan a small date around something she mentioned · ⚠️ make plans but stay on Discord the whole date | effortdrop |
| 9-2 | Day 8. You feel *so* in love | ❌ say "I love you", pick names for your future kids, change your bio to "H's husband" · ✅ tell her specifically what you like about spending time with her · ⚠️ demand she post couple photos to "make it official" | toofast |
| 9-3 | Boys' locker room: "So how far did you go? 😏" | ✅ "That's between us." · ❌ exaggerate to look cool — the rumour reaches H's friends (🤝−20) · 💀 show them private messages → BAD END #11 *Group Chat Hall of Shame* | kissandtell |
| 9-4 | Haziq's birthday karaoke — you've cancelled on him 3 times for H | ✅ go; tell H, she says "of course, have fun!" · ❌ cancel again; Haziq stops inviting you · ⚠️ bring H without asking anyone | ownlife |
| 9-5 | One-month mini anniversary | ✅ something small using things you know (callback flags: hearts / vol. 3 / race / idol song) · ❌ forget, then "it's just a month lol" · ⚠️ expensive surprise she has to "pay back" emotionally | remember |
| 9-6 | Your monthly date budget is $60. A fancy restaurant would "really impress her" | ✅ a cheap, good date: cook together, a park, the bookshop (♥+, $ ok) · ❌ book it with a buy-now-pay-later app ($−−) · ⚠️ go, then sulk about the bill all night | *new* `datebudget` |

**Route variants:** Hanis — the old dragon playground in your estate; Xin Yi — a bookshop crawl; Kavya — a morning run + breakfast; Elise — a photo-free day ("can we… not post today?").

## Chapter 10 — "Green-Eyed Monster"
**Setting:** H spends time with a male friend. Alpha Kai's channel is back. **Goal:** jealousy and control.
**Core values:** V1, V8. **H's male friend:** Hanis → cousin **Faris**; Xin Yi → **Jun Hao**; Kavya → **Arvind**; Elise → **Leo**.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 10-1 | You see H laughing with him after school | ❌ sulk, answer her messages with "k" · ✅ name the feeling to yourself, then tell her calmly: "I felt a bit jealous — can I meet him?" · 💀 confront him in front of everyone → BAD END #12 *It Was Her Cousin* (Hanis) / matching variant | jealousy |
| 10-2 | H's phone lights up on the table: "[Friend]: about tomorrow…" She's in the bathroom | ✅ don't touch it · ❌ read her chat → she sees you (🤝−30) · 💀 install a tracking app → BAD END #13 *Trust.exe Has Stopped Working* | snooping |
| 10-3 | Alpha Kai: "Real men know where their woman is 24/7. Make her share her location." | ✅ close the video (achievement progress *Unsubscribed*) · ❌ demand location sharing "if you have nothing to hide" · ⚠️ ask Haziq, who says "do it bro" — then ask Uncle Ong, who says don't | control |
| 10-4 | H: "Who's Rae / Elise? Why do you still text her?" | ✅ open and honest; show the chat if she wants · ❌ "Why are you checking on me? Don't you trust me?" (after doing 6-2 yourself) | doublestandard |
| 10-5 | H wins something big (Hanis: top of the first-aid competition; Xin Yi: a national youth story prize; Kavya: a national schools record; Elise: audition callback) and you just failed a test | ✅ celebrate her fully; your feelings can wait until later · ❌ "it's just a [thing], not a big deal" · ⚠️ make the evening about your failed test | celebrate |

## Chapter 11 — "The First Fight"
**Setting:** Monsoon rain, JC1 promotional-exam week (October). **Goal:** conflict skills — still the most important relationship chapter.
**Core values:** V1, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 11-1 | H vents about a terrible day (teacher, friend, parents) | ❌ instantly list 5 solutions · ✅ listen, reflect, then ask "do you want advice or just a hug?" · ⚠️ "that's nothing, my day was worse" | listenfirst |
| 11-2 | You forgot a promise (you said you'd come to her match/reading/clinic visit) | ✅ real apology: name it, own it, no "but", ask how to make it right · ❌ "sorry you feel that way" · ❌ excuses ("I was tired, and anyway you forgot X last month") | apology |
| 11-3 | The fight escalates | ❌ "You're overreacting / being crazy" · ❌ bring up old mistakes from months ago · ✅ "I can see this really hurt you." | dismissing |
| 11-4 | You're both upset | ✅ "I need 20 minutes to calm down, I'll come back and we'll talk" · ❌ silent treatment for 3 days · 💀 "Maybe we should just break up then" (you don't mean it) → BAD END #14 *She Took You Seriously* | stonewalling / breakupthreat |
| 11-5 | Next day, repair conversation | ✅ say your own need clearly ("I need a heads-up when plans change") and ask hers · ❌ expect her to "just know" what you need · ⚠️ pretend nothing happened | mindreading / repair |

**Mentor beat:** Uncle Ong over Chinese chess: "My marriage didn't end because we fought. It ended because we stopped repairing."

## Chapter 12 — "Closeness"
**Setting:** Year-end holidays into the festive season: movie nights, her friends, a family visit (per route: Hari Raya open house, Chinese New Year visiting, Deepavali, Christmas), East Coast Park. **Goal:** asking, pressure, privacy, and your own "not yet".
**Core values:** V9. Kiss-level only; nothing explicit (characters are 17).

| # | Setup | Options | Lesson |
|---|---|---|---|
| 12-1 | Movie night at your place. A quiet moment — you want to kiss her | ✅ ask: "Can I kiss you?" — she may say yes or "not yet"; both are fine · ❌ "if you really loved me you would" · 💀 keep pushing after "not yet" → BAD END #15 *Movie Over* | pressure / consent |
| 12-2 | Haziq: "Couples send each other pics bro, ask her" | ✅ "No. Never." (and tell Haziq why: asking for, keeping or forwarding a sexual image of a 16–17-year-old can be a criminal offence, and sharing anyone's intimate image without consent is an offence at any age) · ❌ ask her for a private photo — she's hurt and scared · 💀 if anything private is ever shared to others → BAD END #16 *Screenshot Forever* + resource card | imageabuse |
| 12-3 | You plan a huge surprise party; she told you twice she hates surprises | ✅ cancel it, plan what she likes · ❌ do it anyway "she'll love it once she sees it" | prefsmatter |
| 12-4 | Dinner with her friends / family | ✅ ask her friends questions, respect the house's customs (shoes off, halal food, greetings), help clear dishes, put the phone away · ❌ ignore her friends, joke that they're "boring" · ⚠️ try too hard and brag | herpeople |
| 12-5 | East Coast Park day. Boys joking about girls' bodies; you want to fit in | ❌ joke about H's body to get a laugh · ✅ shut it down: "not cool, man" · ⚠️ laugh awkwardly and say nothing | bodyjokes |
| 12-6 | This time *you* aren't ready: H wants to move faster than you do | ✅ "I really like you, and I'm not ready. Can we slow down?" (👑+, 🤝+) · ❌ go along so you don't look uncool · ⚠️ make an excuse instead of saying it | *new* `yourno` |

---

# PART IV — Real Life (JC2: February → A-levels → results day)

## Chapter 13 — "Health Class" *(new — sexual health at a high-school sex-education level; non-explicit)*
**Setting:** JC2, Term 2. The school's sexual-health week: the school nurse, a peer-educator workshop, an
anonymous question box, and Haziq's group chat full of myths. Dr. Mochi (glasses) gives the fact cards. Characters
are 17–18. Nobody in this chapter has sex; every scene is a classroom, the health room, the rooftop or a chat.
**Goal:** accurate facts; how serious STIs are; red flags named by **behaviour and risk**, never by orientation;
refusal and impulse control. Waiting is normal and respected; the facts are there for whenever the player needs them.
**Core values:** V1, V8, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 13-1 | Haziq's myths in the group chat: "Pulling out works." / "She's on the pill, so no STIs." / "First time, you can't get pregnant." / "You can tell if someone has something." | ✅ check with Dr. Mochi: not having sex is the only 100% protection, and waiting is normal (most classmates haven't); condoms used correctly every time greatly reduce the risk of pregnancy *and* most STIs; the pill does not stop STIs; withdrawal is unreliable; pregnancy can happen the first time; you can't tell by looking · ❌ repost the myth · ⚠️ "I already know all this" | `protection` |
| 13-2 | The nurse's slides on STIs. Haziq: "Whatever, there's a pill for everything." | ✅ take it seriously: many STIs have no symptoms; untreated chlamydia or gonorrhoea can cause infertility; syphilis can damage organs; HIV is lifelong (treatable, not curable); some HPV types cause cancers (there is a vaccine); testing is confidential (resource card) · ❌ "It'd never happen to me." | *new* `stiserious` |
| 13-3 | Question box: "Which kind of sex has the highest STI risk?" A classmate laughs: "Only gay guys get HIV." | ✅ the fact: unprotected anal sex carries the highest risk of HIV and many STIs for anyone, whatever the partners' genders; oral sex can pass on STIs too; risk depends on what people do and whether they use protection, not on who they love. Say "That's not true, and it's not funny" (🧠+) · ❌ laugh along (the stereotype also makes people think *they* are safe) · ⚠️ stay quiet | *new* `riskbybehaviour` |
| 13-4 | Peer-educator card sort: "Green flag or red flag?" (a partner who keeps pressuring after no · wants to try choking "because it's in videos" · wants to film · gets someone drunk or high first · checks in and stops when asked) | ✅ sort correctly: pressure and coercion are never OK; choking/strangulation can cause brain injury or death within seconds, even "gently", so never; filming anyone without free agreement is abuse; in Singapore sexual images of anyone under 16 are child abuse material, using a 16–17-year-old in an exploitative relationship to make abusive material is an offence, and sharing or threatening to share anyone's intimate image without consent is an offence at any age (deepfakes included), so never ask for, keep or forward one; a drunk or high person cannot consent; checking in is the green flag. These are red flags whoever does them · ❌ "If they're into it, anything goes" · ❌ "Videos show it, so it's normal" | *new* `redflags` |
| 13-5 | Haziq has a secret online "girlfriend" who says she is 24. She sends gifts, says his friends are "immature", tells him to keep it secret, and asks for photos | ✅ tell him gently: an adult who seeks a secret relationship with a teenager, gives gifts, isolates him and asks for photos is grooming; it is not his fault; help him stop, keep the evidence and tell a trusted adult or the police (resource card). Groomers can be any gender · ❌ "Lucky you, an older woman!" · 💀 help him keep the secret and send the photos → **BAD END #28** *Our Little Secret* (serious tone, no joke; resource card) | *new* `grooming` |
| 13-6 | Rooftop partner talk: "What do we want, and when?" (solo: Haziq and his girlfriend ask your advice). Later, alone at your place, the moment gets heated | ✅ talk first and agree to wait; when the moment comes, stop: "Let's not — we agreed. I'll walk you home." (👑+, 🤝+) · ❌ "Just this once," no talk, no plan, no protection · ⚠️ "Everyone else has already" (they haven't; Dr. Mochi card) | *new* `waitingok` |

**Law card (Dr. Mochi, non-graphic, Singapore):** sexual activity with anyone under 16 is illegal whatever they "agree";
at 16–17 it is still an offence in an exploitative relationship (teacher, coach, guardian, big age gap or control),
where consent is no defence; grooming and sexual messages to under-16s are offences. Legal is not the same as
ready. Sources: Penal Code s376A, s376AA, s377CA, s377BE, s377BG–BL (sso.agc.gov.sg; verified 2026-11-02).

**Mentor beat:** the nurse: "Knowing the facts isn't permission and it isn't pressure. It's so that when you decide
— in a year or in ten — you decide well." Mochi: "And 'no' is a full sentence. Yours too."

## Chapter 14 — "Prelims & Storm Season" *(merges the old exam beats and the old storm chapter)*
**Setting:** JC2 prelims (August–September) into the A-levels (October–November): study blocks, all-nighters, a lie, maybe the end. **Goal:** your goals and health
come first; sustaining love under pressure; healthy breakups.
**Core values:** V1, V2, V3, V4.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 14-1 | H texts all evening; your study block is 7–10 PM. You've already skipped CCA twice to be "always available" | ✅ agree on phone-free study hours and a call at 10; go back to CCA (🎯+, 🤝+) · ❌ answer every message, learn nothing, skip CCA again · ⚠️ go silent without telling her | *new* `focus` / selfneglect |
| 14-2 | Three all-nighters on energy drinks before the prelims | ✅ sleep, eat, walk (💤+, 🎯+) · ❌ a fourth all-nighter · 💀 a fifth, then fall asleep in the exam → **BAD END #22** *Energy Drink Speedrun* | *new* `sleep` |
| 14-3 | H has been withdrawn, exhausted, crying (family/exam pressure) | ✅ be present, listen, gently encourage her to talk to a counsellor/trusted adult; you don't have to fix it (resource card) · ❌ "cheer up, you're being dramatic" · ⚠️ try to be her only support and burn out yourself | support |
| 14-4 | You were at the arcade with Elise/Rae but said you were studying. She sees a story | ✅ come clean immediately · ❌ double down with a bigger lie · 💀 fake an alibi with Haziq → BAD END #17 *The Alibi Group Chat* | smalllies |
| 14-5 | **Breakup branch** (if 🤝 < 30 or chosen): H says she needs to end it | ✅ "It hurts, but I respect it. Thank you for everything." → `kind_goodbye` path · ❌ beg, send 40 messages, wait at her house · 💀 revenge post / stalk her new friends → BAD END #18 *Main Character Syndrome* | breakup |
| 14-6 | After any breakup (route or Haziq's on solo), 3 AM, her profile open | ✅ close it; mute for a while, lean on friends, go back to your routines (🎸+, 💤+) · ❌ read her old messages until sunrise · ❌ drunk-text style "u up?" message | *new* `recovery` |

Moved: the two-weeks-apart beat (`distance`) → 16-4; the class-trip money beat (`money`) → the Ch14 partner talk
(financial support between partners); Dad and your passion (`familytalk`) → 15-5.

**🔍 Think Deeper** (`deeper:'careerpressure'`, after the financial-support talk; Ms. Farah): grades, careers and whose expectations they are.

**Mentor beat:** Mei: "Losing someone doesn't mean you lost. Did you become a better person? Then you won something."

## Chapter 15 — "Results Day"
**Setting:** After the A-levels: the long wait, then results day in the school hall the next February; the NS enlistment letter arrives. **Goal:** support dreams — hers *and* yours.
**Core values:** V2, V3, V8.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 15-1 | H's dream opportunity, some of it far away (Hanis: a nursing degree with long shift placements; Xin Yi: a writing programme in Melbourne; Kavya: an athletics scholarship in the US; Elise: a dance academy in Seoul) | ✅ "I'll miss you like crazy. Go. Let's figure out how we stay close." · ❌ "If you loved me, you'd stay." (guilt-tripping) · ⚠️ say nothing, sulk for a week | supportdreams |
| 15-2 | **Your** offer arrives: a place in a course for your passion (deferred until after NS) or a part-time programme you can start on weekends. H asks you to take her choice of course instead | ✅ "I'm going. Let's work out how we stay close." · ❌ turn it down "for her" (🎯−−, 🎸−−, 👑−) · ⚠️ accept without talking to her | *new* `dontshrink` |
| 15-3 | Alpha Kai's livestream gets exposed; Haziq admits he bought the $998 course and is ashamed | ✅ "Bro, we've all fallen for stuff. Let's try for a refund and get supper at the prata shop." · ❌ mock him in the group chat | brosupport |
| 15-4 | Rae's ending (if `reiRedemption`): police case against Mr. G; Rae thanks you for not "saving" her with money | ✅ stay a friend with boundaries · ⚠️ try to date her now (she gently says no — she needs time to heal) | rescuer (callback) |
| 15-5 | Before your offer arrives, Dad: "Drop the guitar/drawing. It won't pay the bills." | ✅ show your plan: passion hours, grades, a budget; ask for a trial year during NS weekends · ❌ shout and slam the door · ⚠️ secretly quit your passion | *new* `familytalk` |

**🔍 Think Deeper** (`deeper:'nstiming'`, after the learning & career talk; Dad, then Uncle Ong): NS, timing and the
feeling of being "behind".

---

# PART V — On Your Own (the year after A-levels, 18–19)

## Chapter 16 — "Book Out" *(new)*
**Setting:** You enlisted. Weekdays in camp, weekends at home in Seri Bayu: laundry, your NSF allowance, your parents,
your own room again. **New:** **Ryan Teo**, a section mate with a perfect feed.
**Goal:** looking after yourself is the basis of looking after anyone. Debt and lending traps.
**Core values:** V2, V4, V5.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 16-1 | First book-out weekend: food delivery every night, Mum still does your laundry | ✅ learn three cheap dishes, cook one for the family, do your own laundry, plan a hawker-centre budget ($+, 💤+) · ❌ keep ordering ($−, 💤−) · ⚠️ instant noodles every weekend | *new* `adulting` |
| 16-2 | Mall kiosk: "New phone, $0 today! Buy now, pay later!" | ✅ read the terms and the total; decline, or one small purchase you can pay off · ❌ stack three BNPL plans for a gaming PC "for my passion" · 💀 stack plans for dates and gadgets, then cover them with a loan → **BAD END #23** *Minimum Payment Forever* | *new* `debt` |
| 16-3 | Ryan — perfect outfits, perfect feed — asks to borrow $600 "till allowance day". Again. He still owes two other guys | ✅ say no kindly; point him to the unit's welfare officer or Credit Counselling Singapore · ❌ lend it: "he looks so put-together" · ⚠️ lend half | *new* `lending` |
| 16-4 | Distance: H (or, on solo, Haziq) wants every book-out weekend and a flight to visit; she panics when you don't reply for an hour (phones are restricted in camp) | ✅ agree a rhythm you can afford (one weekend in three + a goodnight message + a Sunday call), explain camp phone rules, talk money openly · ❌ fly on BNPL · ❌ "why didn't you reply in 10 minutes?" ×30 · ⚠️ go, then resent it | `distance` / `money` |
| 16-5 | You've barely spoken to anyone in two weeks; you game until 5 AM every book-out | ✅ call Mei, join a weekend run club, talk to your unit counsellor or the national mindline 1771 (💤+) · ❌ "I'm fine," and isolate | *new* `askhelp` |

**Partner talk:** supporting parents (send money home ↔ build your own life first), with the BTO question ("near your parents?").
**🔍 Think Deeper** (`deeper:'eldercare'`, Mom on the phone): caring for parents, the sandwich generation, and who carries the load.

## Chapter 17 — "Chalet Night" *(new)*
**Setting:** A friend's 19th-birthday chalet by the beach. The legal drinking age in Singapore is 18, so most people
here may drink. Legal is not required: several guests don't drink, for religious, health or personal reasons, and
nobody has to explain why. **New:** **Sam** (Samantha Wong) and **Natalie** (Natalie Rodrigues), friends of friends.
**Goal:** refusal, impulse control, and stepping in to keep someone safe.
**Core values:** V6, V9.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 17-1 | An older guest: "One shot or you're not one of us." | ✅ "I'm good with lime juice." Repeat it calmly if pushed (👑+) · ❌ drink to fit in · ⚠️ pretend to drink and pour it in a plant | *new* `peerpressure` |
| 17-2 | Sam is very drunk. A guy she met tonight offers to "take her home" | ✅ step in: stay with her, find her friends, get her home with someone she trusts; call 995 if she can't be woken · ❌ "Not my business." · ⚠️ ask him if he's sure, then leave | *new* `bystander` |
| 17-3 | You left your drink on the barbecue table for ten minutes | ✅ get a new one · ❌ drink it anyway | *new* `drinksafety` |
| 17-4 | Natalie, whom you met tonight, invites you to skip the rest of the party and go somewhere quieter. You feel the impulse | ✅ "I'd like to get to know you. Coffee on Saturday?" (no judgement of her; it's about your own decision) · ❌ go on impulse: no conversation, no plan, no protection · ⚠️ go along because your friends are cheering | *new* `impulse` |
| 17-5 | Morning: the group chat is sharing photos of a guest passed out at the chalet | ✅ don't forward; ask for them to be deleted; check on him · ❌ forward with a laughing emoji | `chatprivacy` |

**Ending beat:** Mochi: "An adult isn't someone who can drink. It's someone who can say no to a room."

## Chapter 18 — "The Long Talk" *(new — adult relationships, 18+; non-explicit)*
**Setting:** The relationship gets serious; you are both adults now. On solo, Haziq brings you the same questions
about his girlfriend, and you go with him to the clinic. Dr. Mochi gives the fact cards. Intimate moments cut away;
nothing is shown beyond a hug. The high-school facts from Ch13 are called back, not repeated.
**Goal:** adult relationships are built on talking: readiness, shared responsibility, testing, ongoing consent,
your own timeline, and the future (the children talk, VALUE_PROFILES §5).
**Core values:** V1, V9, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 18-1 | H brings up "the talk": readiness, boundaries, what each of you wants | ✅ talk openly: what each of you wants, what's off the table, that waiting is fine (🤝+) · ❌ make a joke and change the subject · ⚠️ "Whatever you want." (no voice of your own) | *new* `talkfirst` |
| 18-2 | Haziq: "She's on the pill, so protection is her job." | ✅ contraception and STI protection are both partners' responsibility: talk about it, share the cost, use condoms as well as other methods (callback to 13-1) · ❌ leave it all to her | *new* `sharedprotection` |
| 18-3 | Getting tested together before a new relationship becomes intimate. It's awkward | ✅ go; ask the nurse your questions (callback: many STIs have no symptoms; HPV vaccine) · ❌ "I'm clean, I'd know." | *new* `testing` |
| 18-4 | A close moment. She hesitates: "Actually, not tonight." Or there's no condom | ✅ stop; "I'm glad you told me," no sulking; no condom means not tonight · ❌ "But we planned it…" · 💀 keep pushing → **BAD END #24** *Not Tonight Means Not Tonight* (serious tone; resource card) | *new* `ongoingconsent` |
| 18-5 | Haziq: "You're 18 and you still haven't?!" | ✅ "My timeline is mine." (👑+) · ❌ rush to "catch up" with someone you barely know | *new* `yourtimeline` |
| 18-6 | A scare: the condom broke (on solo: Haziq's girlfriend) | ✅ stay calm; emergency contraception works best the sooner it's taken, so go to a pharmacy or clinic together, support her decisions, share the cost; plan an STI test (resource card) · ❌ panic, blame, go silent | *new* `scareplan` |

**🔍 Think Deeper** (`deeper:'children'`, after the children talk; Mei): who carries the cost of raising children and caring.

## Chapter 19 — "The Perfect Match" *(new)*
**Setting:** Lonely after a long week in camp, you download a dating app. Rae returns, now giving talks on how scams target lonely men.
**Goal:** adult-grade scams and manipulation; the polished profile is a script.
**Core values:** V4, V6, V7.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 19-1 | "Lin, 24, finance": a stunning profile, a week of love bombing, then screenshots of her crypto gains — "let me teach you" | ✅ reverse-image search, don't invest, report the profile · 💀 invest, then "add margin" → **BAD END #25** *The Soulmate Portfolio 2: Leveraged* (callback BE #1) + resource card | *new* `pigbutcher` |
| 19-2 | A "VIP matchmaking agency" promises dates with models for a $300 deposit | ✅ walk away: you can't buy a person's time and affection, and the agency doesn't exist · ❌ pay the deposit, then the "verification fee" | *new* `depositscam` |
| 19-3 | A match asks for a video call and asks you to undress | ✅ decline and end the call · ❌ comply → it was recorded → second choice: ✅ don't pay, keep evidence, report (ScamShield 1799, the Online Safety Commission, police) · 💀 pay → **BAD END #26** *Paid in Full, Twice* | `sextortion` |
| 19-4 | A man from Kai's network invites you to a "wealth mindset" seminar: "Your friends are holding you back." | ✅ decline, check the reviews, warn Haziq · ❌ sign up · 💀 recruit Haziq and Mei → **BAD END #27** *Downline* | *new* `mlm` |
| 19-5 | After Rae's talk, Haziq admits he's being "love-bombed" by a stranger asking for money | ✅ help him stop and report it, with zero shaming · ❌ "How dumb are you?" | *new* `noshame` |

## Chapter 20 — "Your Own Story" (finale)
**Setting:** One year after the A-levels: ORD is in sight, university places, the first BTO and CPF conversations. **Goal:** the honesty test and the life review. Endings weigh Your Life most.
**Core values:** V2, V10.

| # | Setup | Options | Lesson |
|---|---|---|---|
| 20-1 | **Honesty quiz** (reference-game homage, original questions): "Did you notice what changed about me?" / "Have you ever lied to me?" / "What's my favourite thing?" | ✅ honest answers ("I don't know — tell me?") beat confident wrong guesses; flattery loses · ❌ lie about 14-4 again | honesty |
| 20-2 | A luxury couple trip "to post online", on credit (solo: Haziq proposes a luxury "bro trip") | ✅ "Let's do the trip we can afford." · ❌ book it on credit | `materialism` |
| 20-3 | Your passion pays off (first gig / exhibition / game release / tournament). It clashes with H's plan for the weekend | ✅ talk early; she comes, or you agree on another weekend · ❌ cancel your big day · ⚠️ decide alone and announce it | `ownstage` |
| 20-3b | Partner talk: money as a couple, the BTO application, the wedding question | ✅ talk numbers and wishes, then 🔍 Think Deeper (`deeper:'marriagecost'`, Uncle Ong and Mei) · ❌ "the guy should pay for everything" / "the girl should" (blame by gender) · ⚠️ avoid the topic | `usvsproblem` |
| 20-4 | Mochi's final exam question: "So — what is love?" | Any honest answer is accepted; flattery or "she's my everything" makes Mochi sigh (🌹 check) | — |
| 20-5 | **Ending evaluation** (GAME_DESIGN §7). Epilogue scenes per ending | — | — |

**Epilogue:** Mochi: "Love isn't something you find. It's something you *do*, every day, on purpose. Mostly by being someone worth knowing."

---

# Partner talks and art needs per chapter

Partner talks follow the template in [VALUE_PROFILES.md](VALUE_PROFILES.md) §5.1 (topic, opposing views, healthy
outcomes). Locations marked ★ exist in `assets/bg/` but are **redrawn for Singapore** (HANDOFF art redo list); everything else is a new background (full list and reuse plan:
VALUE_PROFILES §8). Sprites: the five heroines and Mochi exist (heroine uniforms are redrawn as the fictional Bayview JC uniform); supporting cast are new unless noted. Visuals are at
most a hug in every chapter.

| Ch | Partner talk (topic → opposing views) | Locations | Cast on screen (beyond the player) |
|---|---|---|---|
| 1 | Refusal: Haziq "friends never say no" ↔ Hanis "friends can hear no" | classroom, street ★, library ★, field ★, bedroom ★ | 5 heroines, Mochi, Haziq |
| 2 | Friendship: wide circle (Elise) ↔ a few deep friends (Hanis, Xin Yi) | sentosa, street ★, karaoke | heroines, Haziq, Alpha Kai (phone) |
| 3 | White lies: kind (Elise) ↔ "tell me straight" (Kavya, Hanis) | bedroom ★, library ★, classroom, night ★ | heroines, Rae, Haziq, "Aileen" (phone) |
| 4 | Spending: enjoy now (Kavya) ↔ save first (Hanis, Mei) · 🔍 `consumption` | cafe, mall, hawker, dining, bedroom ★ | Uncle Ong, Mei, Haziq, Elise (stream), Kavya |
| 5 | Life outlook: win · meaning · family · be known | campsite (Ubin; day + night), field ★ | heroines, Haziq, Uncle Ong (phone) |
| 6 | Broken promises: Marcus "plans change" ↔ Hanis "say so before" | classroom, carnival, cafe, night ★ | heroines, Marcus, Haziq |
| 7 | Greed: Kai (invalid) ↔ Uncle Ong "enough" ↔ Elise "nice things are nice" | street ★, mall, bedroom ★ | heroines, Haziq, Alpha Kai (phone) |
| 8 | Why do you like someone? Haziq looks ↔ Mei character | rooftop, classroom, fireworks (National Day) | heroines, Haziq, Mei |
| 9 | Gifts & who pays: brand (Elise) ↔ letter (Xin Yi); split vs. take turns · 🔍 `genderwar` | street ★, cafe, mall, mrt | H, Haziq, Mei |
| 10 | What counts as cheating? (per heroine) | night ★, field ★, classroom | H, H's male friend, Alpha Kai (phone) |
| 11 | Couple time vs. friends and hobby | bedroom ★, cafe, rooftop | H, Haziq, Uncle Ong |
| 12 | Shopping & her family's views on money | mall, dining (festive visit), beach (East Coast Park), bedroom ★ | H, H's parents (silhouette OK), Haziq, beach boys |
| 13 | Boundaries as a couple: wait ↔ "everyone has" | classroom, healthroom, rooftop, bedroom ★ | H, Haziq, school nurse, peer educator, Mochi (Dr.) |
| 14 | Financial support: "I'll pay" ↔ "I don't want to owe you" · 🔍 `careerpressure` | library ★, bedroom ★, mrt, night ★ | H, Haziq, Elise/Rae (14-4) |
| 15 | Learning & career: Dad security ↔ passion; Uncle Ong still studying · 🔍 `nstiming` | gradhall (results day), dining, airport, field ★ | H, Dad, Mom, Haziq, Rae, Uncle Ong |
| 16 | Supporting parents: send money home ↔ build your own life first; BTO near parents? · 🔍 `eldercare` | camp, apartment (your HDB flat), mall, hawker | H (phone), Mei, Mom, Ryan |
| 17 | Friendship & lending: "friends help" ↔ "friends aren't a bank" | partyroom (chalet), beach, cafe | Sam, Natalie, Ryan, an older guest |
| 18 | Children & child education (per heroine) · 🔍 `children` | apartment, park (Gardens by the Bay), polyclinic | H, Haziq, nurse, Mochi (Dr.) |
| 19 | "Easy investment": a friend's sure thing ↔ Rae's scam-script talk | camp, lecture, cafe | Rae, Haziq, "Lin" (phone), Kai's recruiter |
| 20 | Money as a couple: joint ↔ separate ↔ shared pot; BTO and wedding costs · 🔍 `marriagecost` | rooftop (sunset), apartment, park, hawker | H, Haziq, Mei, Mochi |

# Think Deeper cards per chapter

Optional cards after the partner talk (GAME_DESIGN §6.2; data planned in `js/data/think.js`). Each card: hook
question → 2–3 lenses → "us vs the problem" reframe → reflection prompt → optional opener to bring back to H. No
lens is marked correct; facts carry a source and a verification date before release.

| Ch | Card id | Mentor | Hook | Lenses (structural/economic · personal responsibility · culture/family) | Singapore context |
|---|---|---|---|---|---|
| 4 | `consumption` | Uncle Ong | "Why does spending feel like love?" | Ads, feeds and BNPL are built to make spending feel like caring · you choose your budget and your gifts · gift and "face" customs differ across families | allowance vs prices, BNPL, gifting at festivals |
| 9 | `genderwar` | Ms. Farah | "Online it's 'men vs women'. Is it?" | Rising costs of housing, weddings and children squeeze *both*; outrage content is profitable · each couple can set fair terms · provider and caregiver expectations from parents and tradition | NS vs career-break timelines, costs of dating and weddings |
| 14 | `careerpressure` | Ms. Farah | "Whose expectations are these?" | A competitive economy rewards credentials · effort, rest and your own definition of success · parents' sacrifices and hopes | A-levels, university places, scholarships and bonds |
| 15 | `nstiming` | Dad → Uncle Ong | "Two years 'behind'?" | National needs and service set the timeline; careers and caregiving cost different people different years · using the time well · family pride and worry | full-time NS (about 2 years), deferment rules, caregiving gaps |
| 16 | `eldercare` | Mom | "Who looks after Ah Ma?" | Care work for elders is largely unpaid and lands on households, often on daughters · planning, saving and showing up · filial piety and multigenerational homes | CPF top-ups for parents, foreign domestic workers, eldercare and caregiver support |
| 18 | `children` | Mei | "Who pays for a child?" | Much of the cost of raising children, caring and rest is unpaid and pushed onto households; when budgets are tight it turns into "who sacrifices?" fights between partners · readiness and shared choices · family expectations ("when got baby?") | Baby Bonus and Child Development Account, childcare costs, parental leave |
| 20 | `marriagecost` | Uncle Ong + Mei | "Us vs the problem" | Horizontal gender conflict can mask vertical structural pressure (housing, care, wages); rigid welfare can strain when growth slows, so many societies share costs between state, employers and families · a budget you both choose · wedding customs across communities | BTO timelines and grants, CPF for housing, wedding banquets, hantaran and other customs |

Rule: every card ends with "Don't blame your partner for a pressure neither of you created. Name it together."
