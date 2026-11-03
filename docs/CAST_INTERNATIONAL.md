# sim4love: International Cast Supplement (v4)

> Supplement to `docs/CAST_BIBLE.md`, using the same entry format and the same systems (radar axes, values-fit,
> flaw tags, neglect 0–3, 📖 story / 👆 player-choice beats). **Status: wired in (Phase 2).** Ava, Inès, Mateo and Ollie
> are in `js/data/cast.js`, `js/sprites.js`, `js/data/wardrobe.js`, `js/chapters/*`, the zh-SG translations and `tests/`.

## 0. Why this supplement exists, and the rules it follows

The owner asked for **more characters and plot, international "skins" (Europe, America and beyond), lively and
different personalities, and different speaking styles, so the cast is not only Singapore-local.**

Rules for this pass:

1. **Additive.** The multiracial Singapore core (Chinese, Malay, Indian, Eurasian, Peranakan, migrant-worker
   characters) stays exactly as written in `CAST_BIBLE.md`. Singapore is still home; the new cast are people who
   *live in* Singapore, which is true to the city (around 30% of residents are non-citizens).
2. **Four new characters** + **two re-ethnicised minor characters** (ids kept, so no save or code breaks).
3. **Every new character has a distinct English voice**, carried into Chinese through register, sentence rhythm
   and a few signature words, not through broken grammar or accent jokes.
4. **Never preach, never mock a culture.** Every cross-cultural beat is a *difference*, not a ranking. Where a
   Think Deeper card appears it gives at least two reasonable views.
5. Same content limits as the bible: modest dress, nothing physical beyond a hug, Ch13/Ch18 non-explicit.
6. Adults are never framed as romantic options for minors. Ollie (26) only appears with the player in public or
   group settings.

### 0.1 New cast count: why "9 + 15"

| Before | After |
|---|---|
| 8 heroines (6 school-era routes, Natalie's late route, Rae's bond track) + 12 others = **20** | **9 heroines** (+ Ava, a full school-era route) + **15 others** (+ Inès, Mateo, Ollie) = **24** |

Ava is the **7th school-era route** (Ch1–Ch8 meet and build, lock at the end of Ch8, Ch9–Ch20 route content and
endings). Inès, Mateo and Ollie are friend / rival / mentor characters with arcs but no route. Total main cast
becomes 24; `CAST_BIBLE.md §1` keeps its 20-row table and Phase 2 adds rows 21–24 there with a pointer here.

## 1. The new and changed cast at a glance

| # | id | Name (EN / zh) | From | Age at Ch1 | Role | Heroine | Status |
|---|---|---|---|---|---|---|---|
| 21 | `ava` | Ava Mitchell / 艾娃·米切尔 | USA (Austin, Texas) | 16 | Expat transfer student, marine-bio and photography nerd | ✔ route | **new** |
| 22 | `ines` | Inès Diallo / 伊内丝·迪亚洛 | France (Lyon), Senegalese-Breton family | 17 | Debate rival from the French international school | — | **new** |
| 23 | `mateo` | Mateo Tan Rojas / 马特奥·陈·罗哈斯 | Colombia (Medellín) + Singapore | 16 | Poly student, futsal friend, later NS buddy | — | **new** |
| 24 | `ollie` | Ollie Bennett / 奥利·贝内特 | UK (Leeds) | 26 | Sound engineer, CC guitar teacher, open-night host; passion mentor | — | **new** |
| 19 | `ren` | Ryan Teo / 张瑞安 | Singapore (Chinese SG father, Irish mother) | 16 | Classmate, then NS section mate | — | **re-ethnicised** |
| 20 | `saki` | Sam (Samantha) de Vries / 萨姆·德弗里斯 | Netherlands → Singapore since age 9 | 19 at Ch17 | Friend of friends, events crew | — | **re-ethnicised** |

**New circle:** `intl` (international-school / expat / mixed-family network). Members: ava, ines, ollie (edge),
mateo (bridge to `estate` via Haziq's futsal), saki (bridge to `work`). Gossip propagates inside `intl` like other
circles (§5.5 of the bible).

### 1.1 Voice matrix (so writers never blur them)

| Character | EN register | Signature EN | zh register | Signature zh | Never does |
|---|---|---|---|---|---|
| Ava | Fast, warm, American teen; says the quiet part out loud | "Okay, real talk." · "Y'all." · "Lowkey…" · "I'm not gonna lie." | 直接、短句、感叹多 | "说真的。" · "超酷！" · "你们大家" | sarcasm aimed at people |
| Inès | Precise, argumentative, French-inflected logic | "Bof." · "En fait…" · "Voilà." · "I find that…" | 论证式长句, 爱用"其实/所以", 夹法语 | "Bof，一般吧。" · "En fait，其实……" · "Voilà，就这样。" | raises her voice |
| Mateo | Loud, affectionate, Spanglish | "¡Hermano!" · "Dios mío." · "¡Qué bueno!" · "Bro, trust." | 热情、叠词、夹西班牙语 | "兄弟！" · "Dios mío，天哪。" · "太好了太好了！" | stays angry overnight |
| Ollie | Northern English understatement, dry | "Not bad, that." (= brilliant) · "Bit of a nightmare, to be honest." · "Cheers." | 冷幽默、轻描淡写 | "还行吧，这个。"（=很棒）· "说实话，有点头大。" | flirts with students |
| Sam | Dutch directness, practical, warm | "Ja, no." · "That's not so handy." · "Gezellig!" · "Going Dutch is literally my name." | 直截了当、口头禅短 | "嗯，不。" · "这不太方便。" · "好温馨（gezellig）！" | sugar-coats |
| Ryan | Singlish-first, quick banter (unchanged) | "Rate lah." · "Chill one." | 口语化新加坡华语 | "安啦。" | — |

Chinese localisation note: the foreign words (*bof, voilà, hermano, gezellig*) stay in Latin script inside the zh
line, the way bilingual teens actually text. Each first use gets a one-time glossary tooltip.

---

## 2. Heroine #9

### 2.1 Ava Mitchell (`ava`) · heroine, route · **new**

| | |
|---|---|
| Names | EN *Ava* / *Ava Mitchell* · zh *艾娃* / *艾娃·米切尔* |
| Age | 16 at Ch1 (JC1, international-student intake at Bayview JC) |
| Background | American, from Austin, Texas. Her dad is a semiconductor engineer on a 3-year posting; Singapore is her **4th country** (Texas → Shanghai → Dubai → Singapore). Mum is a remote UX designer. Lives in a condo near the East Coast. Chose a local JC over an international school "because I wanted to actually live here this time". |
| Role | The bright new kid who befriends everyone in a week; the cross-cultural, long-distance heroine |
| Personality | Sunny, curious, physically expressive, blunt, brave about new food and new people, secretly avoidant |
| Passions | Marine biology (wants to study coral restoration) and film photography (a hand-me-down camera from her grandpa) |
| Values | friends +2, learning +2, career +2, honesty +2, conflict +1 (says it straight), gifts 0, promises +1, spend +1, home −1, family 0 (loves hers, expects independence), lending 0, children 0, childEdu +1 |
| Flaw tags | `one-foot-out` (Ch5, Ch14) · `blunt-without-context` (Ch2, Ch11) · `allowance-bubble` (Ch4, Ch11) · `fixes-not-listens` (Ch10, Ch16) |

**First impression:** "Loud American. Main-character energy. Treats Singapore like a holiday."
**Hidden:** her cheerfulness is a practised *new-kid routine*. She has done "first day" four times and learned to
make friends fast and keep them shallow, because every friendship has ended at an airport. Her old group chats from
Shanghai and Dubai have quietly gone silent and she has never told anyone it hurts.

**Radar:** INT 65→80 · WRM 75→85 · CMP 45→80 · GEN 40→70 · GNR 55→75 · SEN 30→75 · FIT ?

| Reveal | Trigger |
|---|---|
| WRM | 📖 Ch1: she photographs frangipani and gives you the print |
| SEN | 👆 Ch5 Ubin night walk: ask "which goodbye was the worst?" instead of "which country was best?" |
| GEN | 👆 Ch4: you explain giving part of your pay to Mum without judging her allowance |
| CMP | 📖 Ch7: she quietly helps Rae after the screenshot incident |
| INT | 👆 Ch6: ask about her coral-nursery project at the carnival science booth |
| FIT | first partner talk (Ch8 dating norms, Ch11 family money) |

**Appearances (all planned):** Ch1 short new scene; Ch2 group date; Ch4 café; Ch5 Ubin; Ch6 Carnival
(Racial-Harmony booth); Ch7; Ch8 National Day confession; route Ch9–Ch20. Locations: Bayview JC, East Coast
Park, her condo (Ch12), Uncle Ong's café, Pulau Ubin, Changi Airport (Ch16, Ch20).

**Topics:** cross-cultural dating norms, consent norms, family money (allowance vs supporting parents),
tipping/spending, long-distance when a family moves, expat-kid loneliness, scams targeting long-distance couples.

#### Route beats

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| New short scene "Frangipani": she's photographing the school's frangipani tree, asks you what it's called in Malay and Chinese (bunga kemboja / 鸡蛋花) | 1 | 📖 | meeting flag `avaMet`; WRM reveal |
| Group date: "Can I hug you? I'm a hugger, you don't have to be." | 2 | 👆 | consent modelled by **her**; the player may say yes, no, or "high five instead"; all three are ✅ and give Trust +2 |
| She tells Haziq his food is "kinda weird" without context | 2 | 📖 | flaw `blunt-without-context` |
| Café: she tips Uncle Ong in cash; he's confused (service charge + GST is already on the bill). She gets **$80/week** allowance and keeps it all; you give part of your pay to Mum | 4 | 📖 + 👆 | **Think Deeper card** "Allowance vs supporting parents": independence-first and family-first both shown as reasonable; `allowance-bubble` flagged |
| Ubin night: "I've done the new-kid thing four times. I'm really good at the first month." | 5 | 📖 | `one-foot-out` revealed |
| Carnival Racial Harmony booth: she wants to wear a cheongsam "for fun"; Hanis invites her to try a baju kurung *properly*, and she asks what it means first | 6 | 👆 | appreciation vs costume; she wears only what she's invited to wear; CMP +3 if you introduced her |
| Perfect Instagram, empty old chats | 7 | 📖 | expat-kid loneliness; SEN path opens |
| National Day confession. She: "So… are we dating? Like, *dating* dating? Where I'm from you go on dates *before* you decide." | 8 | 👆 | dating-norms talk: "what are we" conversation; **route lock** |
| Splitting the bill: she wants 50/50 every time, you were raised to "treat" | 9 | 👆 | no wrong answer; agree a system together → Trust +4 |
| Lucas, an old friend from Dubai, visits and she hugs him at the airport | 10 | 👆 | jealousy lesson: hugs are culture, not signals; ask, don't accuse; `fixes-not-listens` shows when *you* are upset |
| First fight: "Why do you even give your parents money? They're adults." | 11 | 📖 + 👆 | family-money clash; repair = both explain the *why*, not who's right |
| Friendsgiving at her condo: she cooks a Texas brisket, you bring Ah Ma's dish | 12 | 📖 | families meet; her dad's "Call me Mike" vs your Mum's "Uncle/Auntie" formality, played warmly |
| Health class: she compares her US health class (consent unit) with the local CCE programme | 13 | 📖 | consent and sexual-health facts, non-explicit; both systems shown with strengths |
| Her dad's company moves him to **Seattle** after A-levels; she pulls back | 14 | 📖 | `one-foot-out` peaks: "Easier if we end it now, right?" |
| You ask her to stay in it, or you let her go kindly | 14 | 👆 | both valid; Trust check feeds Ch14-5 split branch |
| Dream: marine science at a California university vs staying for NUS | 15 | 👆 | support her dream without making yourself the reason she stays |
| Long-distance begins: Changi goodbye; 15-hour time difference | 16 | 📖 | LDR mechanic: weekly "call slot" choice |
| Video-call chapter: missed calls, a time-zone spreadsheet she made | 17 | 👆 | "Ask, don't assume" applied to distance |
| The long talk (18+, non-explicit): family independence expectations, future country, money | 18 | 👆 | values-fit settles |
| Fake "cheap flight" scam targeting long-distance couples ($450 for a $1,300 ticket via a Telegram agent) | 19 | 👆 | ScamShield fact card; you check the airline site together on a call |
| Finale | 20 | — | ending select |

#### Endings

- **`true_ava` "Two Time Zones"** (Trust ≥ 70, values-fit ≥ 60, honest Ch14 talk, Ch19 scam avoided together):
  she comes back for the NUS exchange semester; final CG at the East Coast frangipani tree with both of you
  holding the same old camera.
- **`normal_ava`**: you stay together long-distance, still working out the "what next"; hopeful and open.
- **`kind_goodbye_ava` "See You Around"**: you part as friends. For the first time in five countries she says a
  **proper goodbye** instead of fading out; she sends you a print every year. Framed as growth, not loss.

**Neglect sensitivity: 2.** She's used to people drifting; two missed chapters and she starts "pre-leaving"
(Trust −5, recap: *"Ava's been posting from places you weren't invited to."*).

**Key judgements:** "She thinks she's better than us" (Ch4, unfair; struck by her apology to Uncle Ong) ·
"She'll leave anyway" (Ch14, partly fair, and the route is about changing it).

#### Speaking style samples

| Moment | EN | zh |
|---|---|---|
| Ch1 hello | "Okay, real talk, what's this tree called? It smells like sunscreen and heaven." | "说真的，这棵树叫什么？闻起来像防晒霜加天堂。" |
| Ch2 hug | "Can I hug you? I'm a hugger. You don't have to be. High fives are also elite." | "我能抱你一下吗？我很爱抱人。你不用勉强哦，击掌也超酷！" |
| Ch11 fight | "I'm not gonna lie, I don't get it. They're adults. Why do *you* pay for *them*?" | "说真的，我不懂。他们是大人啊，为什么是你给他们钱？" |
| Ch20 true | "Two time zones, one tree. Lowkey the best plan I've ever been part of." | "两个时区，一棵树。说真的，这是我参与过最棒的计划。" |

#### Visual spec (v4, generated)

Fair skin with light freckles, green eyes, wavy honey-blonde hair in a high ponytail with a mint scrunchie.
Palette: mint, teal, sunshine yellow, sage.

1. *Uniform* (`ava_uniform_*`): white blouse, teal ribbon, teal/navy plaid skirt, open mint hoodie, film camera.
2. *Casual* (`ava_casual_*`): yellow tee with a tiny sea-turtle, denim shorts, open white linen overshirt, tote,
   friendship bracelet.
3. *Sport* (`ava_sport_*`): mint/white Ultimate jersey #7, mint headband, black shorts, flying disc.
4. *Occasion* (`ava_occasion_*`): sage wrap midi dress, cream cardigan, hair down over one shoulder, pearl clip,
   seashell pendant.

Expressions per outfit: neutral, happy, sad, surprised, blush (20 sprites).

---

## 3. The three other new characters

### 3.1 Inès Diallo (`ines`) · debate rival, then friend · **new**

| | |
|---|---|
| Names | EN *Inès* / *Inès Diallo* · zh *伊内丝* / *伊内丝·迪亚洛* |
| Age | 17 at Ch1 (Première at the French international school) |
| Background | French, from Lyon. Father is Senegalese and Muslim (a hospital doctor on contract in SG), mother is Breton and Catholic (a French teacher). The family celebrates **Tabaski (Eid al-Adha) and Christmas**. Grandparents in Dakar and in Brittany. Second year in Singapore. |
| Role | Preet's debate rival (Ch6 inter-school booth debate, Ch10-5 final); friend of Haziq through the mosque's youth tuition |
| Personality | Brilliant, combative, theatrical, funny, generous with notes after she wins, terrible at losing |
| Values | learning +2, honesty +2, conflict +2 (debates for fun), family +1, friends +1, career +2, spend 0, gifts −1, promises +1, home 0 |
| Flaw tags | `contrarian` (Ch6) · `cutting-wit` (Ch6, Ch10) · `superior-defence` (Ch10) · `wont-admit-homesick` (Ch12) |

**First impression:** "Arrogant. Thinks Singapore schools are factories."
**Hidden:** she argues because in most rooms she's been *the only one*: the only Black girl in her Lyon class, the
only Muslim at Breton Christmas, the only French student in a Singapore tuition centre. Winning the argument is
armour. She misses her grandparents badly and never says so.

**Radar:** INT 85→90 · WRM 40→70 · CMP 50→75 · GEN 35→65 · GNR 60→75 · SEN 45→70 · FIT —

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Ch6 booth debate: "En fait, you Singaporeans memorise, we argue." | 6 | 📖 | `contrarian`, `cutting-wit`; Preet beats her on the rebuttal |
| You call the generalisation out *without* mocking France back | 6 | 👆 | Trust +4; she remembers |
| Ch8 Think Deeper "No DTR?": in France you're often together without a formal "will you be my girlfriend"; vs the asked-out norm | 8 | 📖 | dating-norms card, balanced |
| Ch10-5 final, she loses to Preet and apologises for "you memorise" | 10 | 📖 + 👆 | `superior-defence` → growing; rival → friend with Preet |
| Frank consent talk at the Ch13 peer-education booth: "Silence is not a yes. Voilà." | 13 | 📖 | consent norms delivered by a peer, not a lecture |
| Ch12 her family's Tabaski lunch then Christmas Eve, same month; she cries on a video call with her Dakar grandmother | 12 | 👆 | mixed-faith family; `wont-admit-homesick` revealed; just sit with her (SEN reveal) |
| Ch20 she sends Preet her old debate notes before leaving for Sciences Po | 20 | 📖 | epilogue |

**Neglect sensitivity: 1.** **Circles:** intl, school (via debate). **Chapters:** 6, 8, 10, 10-5, 12, 13, 20.

| Moment | EN | zh |
|---|---|---|
| Debate | "Bof. I find that your argument is a feeling wearing a tie." | "Bof，我觉得你的论点只是一种穿了领带的情绪。" |
| Apology | "En fait… I was wrong about you all. It's annoying. Voilà." | "En fait，其实……我之前看错你们了。真烦。Voilà，就这样。" |

**Visual spec (v4):** deep brown skin, coily black high puff, dark brown eyes, gold hoops. Palette: navy, mustard,
rust, emerald. 1. *Debate* (default): navy blazer, white shirt, grey trousers, mustard headband, index cards.
2. *Casual*: white linen shirt, rust wide trousers, brown belt, tote with a book, terracotta headband.
3. *Festive*: emerald boubou-style kaftan with gold embroidery and matching head wrap (Tabaski).
Expressions: debate = neutral, happy, smug; casual/festive = neutral, happy (7 sprites).

### 3.2 Mateo Tan Rojas (`mateo`) · futsal friend, NS buddy · **new**

| | |
|---|---|
| Names | EN *Mateo* / *Mateo Tan Rojas* · zh *马特奥* / *马特奥·陈·罗哈斯* |
| Age | 16 at Ch1 (Year 1 at a polytechnic, Diploma in Sports and Exercise Sciences) |
| Background | Colombian mother (a Spanish teacher), Singaporean Chinese father (a ship engineer). Grew up in **Medellín until 15**, moved "back" to a Singapore he'd only visited. Citizen, so he does NS. Catholic; his dad keeps the family ancestor altar. Mandarin weak, Spanish fluent. |
| Role | Plays futsal with Haziq at the void deck (Ch4, Ch6); enlists with the player and Ryan (Ch16) |
| Personality | Loud, loving, the first to hug and the first to cry at a film, a great cheerleader, avoids his own pain with jokes |
| Values | family +2, friends +2, gifts +2, children +1, spend 0, lending +1, home +1, honesty +1, promises 0, conflict −1, learning 0, career 0 |
| Flaw tags | `over-promises` (Ch6) · `hugs-first-asks-later` (Ch4, learns to ask) · `jokes-past-pain` (Ch12) · `sends-too-much-home` (Ch16) |

**First impression:** "Clown. Probably can't be serious about anything."
**Hidden:** "Too Latino for Singapore, too Chinese for Medellín." Classmates call him *ang moh* and his
Medellín cousins call him *el chino*; he laughs at both. His Mandarin shame stops him talking to his Ah Ma.

**Radar:** INT 50→65 · WRM 85→90 · CMP 70→85 · GEN 80→85 · GNR 60→75 · SEN 35→70 · FIT —

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Hugs the new goalkeeper who flinches | 4 | 👆 | you suggest "ask first, bro"; he does it from then on (`hugs-first-asks-later` → resolved) |
| Promises to bring the whole team to Preet's carnival booth; 2 show up | 6 | 📖 | `over-promises` |
| Christmas novena at home **and** offerings at his dad's ancestor altar on the same day | 12 | 📖 | mixed-faith family, played warmly; you're invited to both |
| Jokes through the story of his dad missing his Medellín graduation | 12 | 👆 | "You don't have to make it funny" → SEN reveal |
| Sends half his NSF allowance to his abuela | 16 | 👆 | family money from a third angle; budget fact card |
| Chalet night: doesn't drink, "I'm the designated hermano" | 17 | 📖 | anti-stereotype; helps the player with Sam |
| His mum receives a Spanish-language "embassy" call (official impersonation scam) | 19 | 👆 | you help her hang up and call the real number; ScamShield fact card |
| Teaches Ah Ma a Colombian dish, she teaches him the Hokkien for it | 20 | 📖 | epilogue |

**Neglect sensitivity: 2.** **Circles:** estate, ns, intl. **Chapters:** 4, 6, 12, 16, 17, 19, 20.

| Moment | EN | zh |
|---|---|---|
| Goal | "¡Hermano! ¡Qué bueno! Did you SEE that?!" | "兄弟！太好了太好了！你看到没有？！" |
| Learning | "Can I hug you? Asking now. I'm growing, Dios mío." | "我能抱你吗？先问了哦。我在成长，Dios mío，天哪。" |

**Visual spec (v4):** olive-tan skin, dark wavy hair, brown eyes, dimpled grin, silver cross pendant. Palette:
Colombia yellow, navy, white. 1. *Casual* (default): yellow tee with blue collar, navy shorts, football.
2. *NS*: olive field uniform, short hair. 3. *Festive*: white guayabera, beige chinos, gift box with red ribbon.
Expressions: casual = neutral, happy, sad; ns/festive = neutral, happy (7 sprites).

### 3.3 Ollie Bennett (`ollie`) · passion mentor · **new**

| | |
|---|---|
| Names | EN *Ollie* / *Ollie Bennett* · zh *奥利* / *奥利·贝内特* |
| Age | 26 |
| Background | British, from Leeds. Left a London finance graduate job for sound engineering; came to SG on an events contract. Teaches guitar at the community centre on weekday nights, runs the **Thursday Open Night** (music + art wall) at Uncle Ong's café, and freelances for Sam's events company. Shares a rented room in a Tiong Bahru walk-up. |
| Role | Mentor for the player's passion (music, art or writing, whichever the player picked). Only ever in public or group settings: the café, the CC class, gigs |
| Personality | Dry, kind, patient, terrible at asking for anything, quietly excellent |
| Values | learning +2, career +1 (passion over pay), honesty +1, conflict −2, spend −1, friends +1, gifts 0, promises +2, home 0, family +1 |
| Flaw tags | `understates-everything` (Ch4) · `cant-ask-for-help` (Ch19) · `jokes-to-avoid-conflict` (Ch14) · `too-polite-to-check` (Ch19) |

**First impression:** "Posh ang moh with a guitar. Probably rich."
**Hidden:** took a big pay cut, lives in a shared room, eats at the hawker centre every night, and is lonely: his
long-distance relationship with a girlfriend in Manchester ended last year. He would never mention it.

**Radar:** INT 70→75 · WRM 65→80 · CMP 70→80 · GEN 80→85 · GNR 75→80 · SEN 40→70 · FIT —

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Ch4 tipping: he explains to Ava why you don't tip at hawker stalls; service charge and GST explained | 4 | 📖 | spending fact card; meeting flag `ollieMet` |
| "Not bad, that." = the highest praise you'll ever get | 4, 10 | 📖 | the player learns to read understatement |
| Tells Ava about his own long-distance break-up, briefly and kindly | 14 (Ava route) | 📖 | LDR realism, not doom |
| Nearly pays a **$2,000 deposit** for a fake condo listing; too polite to ask for a viewing | 19 | 👆 | you and Rae spot the signs and help him report it; `cant-ask-for-help` → growing |
| Open mic with Sam: gives the player the slot | 20 | 👆 (earlier help) | passion epilogue |

**Neglect sensitivity: 0.** **Circles:** work, intl. **Chapters:** 4, 10, 14, 19, 20 (Thursday Open Night as
a repeatable free-time spot from Ch4).

| Moment | EN | zh |
|---|---|---|
| Praise | "Not bad, that. Not bad at all." | "还行吧，这个。真的还行。" |
| Scam | "Bit of a nightmare, to be honest. I'd already sent the deposit… nearly." | "说实话，有点头大。我差一点就把押金转过去了。" |

**Visual spec (v4):** fair rosy skin, freckles, messy sandy-brown hair, blue-grey eyes, clean-shaven. Palette:
denim, grey, navy, sage. 1. *Open mic* (default): open denim shirt over grey tee, guitar on his back, pencil behind
the ear. 2. *Teaching*: navy polo, blank lanyard, khakis, folder and capo. 3. *Weekend*: sage leaf-print shirt,
cream shorts, bucket hat in hand, iced tea. Expressions: openmic = neutral, happy, sad; teaching = neutral, happy;
weekend = neutral, sad (7 sprites).

---

## 4. Re-ethnicised characters (ids unchanged)

Both changes replace the corresponding background/name rows of `CAST_BIBLE.md §4.11–4.12` in Phase 2. **All flaw
tags, arc beats, topics and chapter appearances stay the same**; none of their flaws are tied to ethnicity.

### 4.1 Ryan Teo (`ren`): now Chinese-Singaporean / Irish

| Field | Before | After |
|---|---|---|
| Background | Chinese Singaporean; divorced parents; lives with his dad | Chinese Singaporean father, **Irish mother who moved back to Cork after the divorce**. Citizen, does NS. Lives with his dad. |
| Names | Ryan Teo / 张瑞安 | unchanged |
| New angle | — | A **long-distance parent**: Ch16 his mum's birthday call he skips; Ch19 he finally calls her before the debt talk. Mirrors Ava's LDR theme from the child's side. |
| Voice | Singlish banter | unchanged; with his mum he switches to "Grand, Mam, yeah" (zh: "挺好的，妈。"), which the player overhears once |

**Visual (v4 redraw):** fair skin with faint freckles, wavy chestnut-auburn hair, hazel-green eyes, ear stud.
Same outfits: *uniform* (white shirt, loose navy tie), *ns* (olive field uniform), *street* (beige bomber, black
tee, chain, olive cargo). Expressions: uniform = neutral, sad, smug; ns = neutral, sad; street = neutral, smug.

### 4.2 Sam (`saki`): now Sam (Samantha) de Vries, Dutch

| Field | Before | After |
|---|---|---|
| Names | Sam Wong / 萨姆·黄 | **Sam (Samantha) de Vries / 萨姆·德弗里斯** |
| Background | Chinese Singaporean poly graduate | Dutch, moved to SG at 9 (dad in port logistics), **Singapore PR**, poly graduate, junior stage manager. Thinks of herself as "Singaporean with a Dutch passport". |
| Voice | Organised, warm | Dutch directness: "Ja, no." · "That's not so handy." · "Gezellig!" · "Going Dutch is literally my name." zh: 直截了当, "嗯，不。" |
| Arc | Ch17 chalet / Ch19 gig / Ch20 open mic | unchanged. Writers' note: the Ch17 drink incident must never be framed as "Europeans drink more"; it stays about peer pressure from seniors, exactly as in the bible |
| New link | — | Works with Ollie (Ch19–20); splits every bill and teaches Ava's Ch9 bill system a name |

**Visual (v4 redraw):** straight blonde chin-length bob, blue-grey eyes, fair skin. Same outfits: *chalet*
(mustard tee, denim shorts), *crew* (blacks, headset, gaffer tape), *occasion* (black top and trousers).
Expressions: chalet = neutral, happy, sad; crew = neutral, happy; occasion = neutral, happy.

**Legacy files:** the old flat sprites `assets/chars/ren_neutral.webp`, `ren_sad.webp`, `saki_neutral.webp`,
`saki_sad.webp` were deleted in Phase 2; all references use the v4 outfit sprites.

---

## 5. Plot-integration plan (Phase 2 writing brief)

### 5.1 New short scenes

| Scene id | Ch | Where | Cast | Purpose | Length |
|---|---|---|---|---|---|
| `1-ava-frangipani` | 1 | school courtyard | ava | meet Ava; names of the tree in three languages | 8–12 lines |
| `4-thursday-open-night` | 4 | Uncle Ong's café | ollie, ava, ogawa | tipping / service charge / allowance card | 20 lines |
| `4-voiddeck-futsal` | 4 | void deck | mateo, kenta | meet Mateo; "ask before hugging" beat | 12 lines |
| `6-debate-booth` | 6 | carnival | ines, preet | rivalry; the "you memorise" line | 18 lines |
| `6-harmony-booth` | 6 | carnival | ava, hina | appreciation vs costume | 12 lines |
| `8-think-deeper-dtr` | 8 | card | ines, ava | dating-norms card | card |
| `10-5-debate-final` | 10-5 | auditorium | ines, preet | apology, rival → friend | 16 lines |
| `12-two-feasts` | 12 | Diallo flat / Tan Rojas home | ines, mateo | mixed-faith families, two short vignettes | 2 × 10 lines |
| `16-allowance-home` | 16 | NS bunk | mateo, ren | sending money home; Ryan's skipped call | 12 lines |
| `19-deposit-scam` | 19 | café | ollie, rei | rental-deposit scam | 18 lines |
| `19-embassy-call` | 19 | Mateo's home | mateo, his mum | Spanish-language official-impersonation scam | 12 lines |
| `20-open-mic` | 20 | café | ollie, saki | passion epilogue | 14 lines |

### 5.2 Topic coverage

| Topic | Carriers | Ch |
|---|---|---|
| Cross-cultural dating norms | Ava, Inès | 8, 9 |
| Family money: allowance vs supporting parents | Ava, Mateo, player | 4, 11, 16 |
| Tipping and spending | Ollie, Ava | 4 |
| Long-distance when a family moves | Ava, Ryan, Ollie | 14–17 |
| Consent norms | Ava (asks first), Mateo (learns to), Inès (peer talk) | 2, 4, 13 |
| Mixed-faith families | Inès, Mateo | 12 |
| Expat-kid loneliness | Ava, Inès | 5, 7, 12 |
| Scams targeting foreigners / LDR couples | Ollie, Mateo's mum, Ava | 19 |

### 5.3 Engine notes for Phase 2

- `cast.js`: add `ava` (heroine: true, route: true, neglect 2), `ines` (1), `mateo` (2), `ollie` (0); add circle
  `intl`; update `ren`/`saki` names and backgrounds.
- Route list gains `ava`; endings `true_ava`, `normal_ava`, `kind_goodbye_ava`. Route lock at the end of Ch8 is
  unchanged.
- `sprites.js`: register the outfit/expression sets listed in §6.
- Tests: heroine count 8 → 9; every route has three endings; every `ava` route chapter has a scene; every sprite
  file referenced exists.

## 6. Art (v4 pass): file list and QC

Pipeline (same as v3): GenerateImage (neutral first, then expression variants using the neutral as reference) →
rembg `isnet-anime` cutout → bottom-centred on 800×1200 transparent canvas → `assets/chars/<id>_<outfit>_<expr>.webp`.
QC contact sheet: `docs/art-contact-sheet-intl.jpg` (55 sprites, all passed; Inès's first *smug* was too close to
neutral and was regenerated).

| id | Outfits | Expressions | Count |
|---|---|---|---|
| ava | uniform, casual, sport, occasion | neutral, happy, sad, surprised, blush (each) | 20 |
| ines | debate*, casual, festive | debate: neutral/happy/smug; others: neutral/happy | 7 |
| mateo | casual*, ns, festive | casual: neutral/happy/sad; others: neutral/happy | 7 |
| ollie | openmic*, teaching, weekend | openmic: neutral/happy/sad; teaching: neutral/happy; weekend: neutral/sad | 7 |
| ren (redraw) | uniform*, ns, street | uniform: neutral/sad/smug; ns: neutral/sad; street: neutral/smug | 7 |
| saki (redraw) | chalet*, crew, occasion | chalet: neutral/happy/sad; crew: neutral/happy; occasion: neutral/happy | 7 |

\* default outfit. Total: 55 sprites (41 new + 14 replaced).
