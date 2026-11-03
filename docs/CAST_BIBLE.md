# sim4love — Cast Bible (expanded cast: 24 main characters)

Status: **design spec, not yet coded.** This document defines the 24 main characters (the four international additions, Ava, Inès, Mateo and Ollie, are
specified in full in [CAST_INTERNATIONAL.md](CAST_INTERNATIONAL.md) and summarised in §1 and §4.13–4.16 below), the per-character systems
(radar, hidden attributes, flaw tags, judgement log, neglect and gossip, chapter recap) and the art direction for
the next sprite pass. Read [CORE_VALUES.md](CORE_VALUES.md) first; every line here obeys it. Chapter and
interaction references (`4-3` = Chapter 4, interaction 3) follow [CHAPTERS.md](CHAPTERS.md); value axes follow
[VALUE_PROFILES.md](VALUE_PROFILES.md) §2.

**Legend.** *In code* = the character already appears in `js/chapters/chNN.js`. *Planned* = a new beat proposed by
this bible, to be authored. 📖 = story-driven change (happens whatever you do). 👆 = player-triggered change (only
happens because of a choice). Radar values are written `first impression → true value`.

---

## 0. Principles for the whole cast

1. **People, not prizes.** Heroines are full people with goals, flaws and lives that go on without the player. Nobody
   is worshipped; nobody is held in contempt. Every reveal ends in empathy or a boundary, never a sneer (CORE_VALUES §2).
2. **Looks are never scored.** No radar axis, bar or tag measures appearance. Appearance exists only as (a) the
   **first impression** ("the shine": what the eye and the feed suggest) and (b) the existing **Rose Filter** 🌹, which
   inflates the first-impression estimate on screen. Seeing a person clearly lowers the filter; it never lowers the
   person.
3. **The radar describes; it does not rank.** No axis is "higher is better". High generosity can mean "gets used"
   (Elise); high sensitivity can mean "perceptive and easily hurt" (Hanis). Values-fit is about overlap with *you*,
   not about her worth. A low fit leads to a healthy talk or a kind goodbye, never to a punishment.
4. **Multiracial Singapore, one art treatment.** The cast stays Chinese, Malay, Indian, Eurasian, Sikh Punjabi,
   Peranakan and Filipino Singaporean or resident, as written. Everyone gets the same soft kawaii anime skin rendering
   with their own skin tone; nobody is lightened, removed or turned into a stereotype. Traits come from the person,
   never from the community. Faith and festive dress are each character's own choice, shown accurately and never as
   a joke, obstacle or twist.
5. **Behaviour, not identity.** Red flags, scams and flaws are framed by behaviour and risk, never by gender,
   ethnicity, faith or orientation. Villains have no ethnicity (Mr. G is faceless; Alpha Kai is an online persona).
6. **No flaw is owned by one group.** Gullibility is shared by Haziq, Ryan, Ah Ma and the player; image-polish by
   Marcus, Ryan, Elise and Rae's forced persona; overwork by Chloe, Uncle Ong, Mei and Ms. Farah.
7. **Ages.** The player is 16 at Ch1. JC1 classmates are 16–17 in Parts I–III, 17–18 in Part IV, 18–19 in Part V.
   Content stays non-explicit; visuals go no further than a hug.

## 1. The 24 at a glance

| # | id | Name (EN / zh) | Role | Heroine | Status |
|---|---|---|---|---|---|
| 1 | `hina` | Nur Hanis / 努尔·哈妮丝 | Childhood friend, same HDB floor | ✔ route | existing, expanded |
| 2 | `mio` | Lim Xin Yi / 林欣怡 | Bookworm and writer | ✔ route | existing, expanded |
| 3 | `kaede` | Kavya Pillai / 卡维娅·皮莱 | Track star | ✔ route | existing, expanded |
| 4 | `yuna` | Elise de Souza / 伊莉丝·德索萨 | Dance-cover streamer | ✔ route | existing, expanded |
| 5 | `rei` | Rae Koh / 许瑞儿 | Scam ring's "face", then survivor and law student | ✔ bond (not romanceable) | existing, expanded |
| 6 | `chloe` | Chloe Goh / 吴可儿 | Poly student running her family's kueh stall | ✔ route | **new** |
| 7 | `preet` | Harpreet Kaur ("Preet") / 哈普丽特·考尔 | Debater, peer educator, volunteer tutor | ✔ route | **new** |
| 8 | `nana` | Natalie Rodrigues / 娜塔莉·罗德里格斯 | Art student met after school ends | ✔ late route (Part V, single only) | existing, promoted |
| 9 | `kenta` | Muhammad Haziq / 穆罕默德·哈齐克 | Best friend | — | existing, expanded |
| 10 | `mei` | Mei / 小美 | Older sister | — | existing, expanded |
| 11 | `mom` | Mum / 妈妈 | Mother, sandwich generation | — | existing, expanded |
| 12 | `dad` | Dad / 爸爸 | Father | — | existing, expanded |
| 13 | `ama` | Ah Ma / 阿嬷 | Grandmother (Mum's mother) | — | **new** |
| 14 | `ogawa` | Uncle Ong / 王伯 | Café owner, employer, mentor | — | existing, expanded |
| 15 | `farah` | Ms. Farah Aziz / 法拉·阿兹老师 | General Paper teacher, mentor | — | existing, expanded |
| 16 | `nurse` | Nurse Tan / 陈护士 | School health nurse, later at the polyclinic | — | existing, promoted |
| 17 | `joy` | Joy Santos / 乔伊·桑托斯 | Caregiver for Xin Yi's grandmother | — | existing (no lines yet), expanded |
| 18 | `takumi` | Marcus Tan / 陈马克斯 | Student-council president, rival | — | existing, expanded |
| 19 | `ren` | Ryan Teo / 张瑞安 | Classmate, later NS section mate | — | existing, expanded |
| 20 | `saki` | Sam (Samantha) de Vries / 萨姆·德弗里斯 | Friend of friends, events crew (Dutch, Singapore PR) | — | existing, re-backgrounded |
| 21 | `ava` | Ava Mitchell / 艾娃·米切尔 | Expat transfer student from Austin, Texas; marine-bio and photography | ✔ route (heroine #9) | **new** (v4) |
| 22 | `ines` | Inès Diallo / 伊内丝·迪亚洛 | Debate rival from the French international school | — | **new** (v4) |
| 23 | `mateo` | Mateo Tan Rojas / 马特奥·陈·罗哈斯 | Colombian-Singaporean futsal friend, later NS buddy | — | **new** (v4) |
| 24 | `ollie` | Ollie Bennett / 奥利·贝内特 | Sound engineer and Open Night host from Leeds; adult passion mentor | — | **new** (v4) |

That is 9 heroines (7 school-era routes including Ava, Natalie's late route and Rae's bond track) and 15 other main characters. Only one new heroine slot was left after promoting existing cast, so Chloe and Preet are new and Natalie is promoted.

### 1.1 Outside the 20

These keep their current roles and get **no radar, bars or arc**:

| id | Why outside |
|---|---|
| `mochi` | The guide and narrator (a Love-God-in-training cat). She sits *above* the cast: she runs the recap (§5.6), reads out reveals and owns the fact cards. Scoring a guide would make her a participant. |
| `kai` | Alpha Kai is an online persona and an invalid position (fraud and contempt). Giving him a radar would legitimise him. He keeps his exposure in Ch15. |
| `goto` | Mr. G, faceless scam boss. Same reason. |
| `aileen`, "Lin" | Fake profiles (Ch3, Ch19): scripts, not people. |
| Faris, Jun Hao, Arvind, Leo, Darren, Ethan | The route heroine's male friend in Ch10 (`js/chapters/ch10.js`); Darren and Ethan are added for the new routes. One-scene characters. |

### 1.2 Choices made in this bible

- **Mochi is outside the 20** (§1.1). The 12 others are Haziq, Mei, Mum, Dad, Ah Ma, Uncle Ong, Ms. Farah,
  Nurse Tan, Joy, Marcus, Ryan and Sam.
- **Natalie is promoted to heroine** (the 8th) as a *late route*: she enters in Ch17, and her romance only opens if
  the player is single in Part V (no route, or broken up). She teaches that love can also start after school, slowly.
  She ends in a "slow start" epilogue variant of the existing endings rather than a new ending.
- **Nurse Tan is promoted** (existing sprite, Ch13 and Ch18) instead of adding another new character. She mentors
  Hanis's nursing dream and carries the sexual-health facts with a person behind them.
- **Rae counts as a heroine** because the player gets close to her, but she stays **not romanceable**, as the
  existing design says (she needs time to heal; 15-4). Her Affection bar is labelled *Bond* in the UI.
- **Two new heroines with values no one else holds:** Chloe (money-smart, family-business entrepreneur whose
  ambition is her blind spot; carries lending, debt, MLM and supporting-parents topics) and Preet (service and
  education, a debater who has to learn not to judge; carries child education, lifelong learning, refusal, gossip
  and lying). Both get full routes, so `S.route` gains `'chloe' | 'preet'`.
- **One new other character, Ah Ma.** The existing `eldercare` Think Deeper card is already titled "Who looks after
  Ah Ma?". Promoting her covers eldercare, lifelong learning and scams that target seniors, with an intergenerational
  view no one else gives.
- **Kai and Mr. G are not promoted** (see above).
- **Values-fit stays "?" until the player has stated a stance** on at least two axes she cares about, then is
  computed from `S.values` (§5.2). It starts at 50 internally.
- **Rose Filter link:** the first-impression polygon of a heroine is inflated by the Rose Filter, and reveals on a
  heroine are blocked while 🌹 > 60 ("you can't see her clearly right now"). This reuses the existing rule that
  hides options above 60.
- **Consistency issue found (not fixed here):** the `children` Think Deeper card (`js/data/think.js`) opens with
  "Mei, with her baby on her hip … the second one", but Mei is a university student who leaves for a Tokyo
  internship in Ch15. Proposed fix: "Mei, holding her colleague's newborn at a full-month party: 'Everyone asks
  when they're having the second one. Nobody asks who's going to sleep.'" (en + zh).
- **Name note:** Haziq's display name is `Muhammad Haziq` in the i18n `names` table but `Haziq Ismail` in
  GAME_DESIGN §4. This bible uses **Muhammad Haziq bin Ismail** (the names table stays as is; GAME_DESIGN should be
  aligned).

## 2. Topic coverage (who carries what)

● = primary carrier (has a scene built on it) · ○ = secondary (voices a side or a callback).

| Topic | hina | mio | kaede | yuna | rei | chloe | preet | kenta | mei | mom | dad | ama | ogawa | farah | joy | takumi | ren | saki | nana | nurse |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Money / spending | ○ | ○ | ● | ● | | ● | | ● | ● | ○ | ○ | ○ | ● | | ○ | | ● | | ○ |   |
| Gifts | ● | ● | ○ | ● | ○ | ○ | ● | | ○ | | | ○ | | | | | | | |   |
| Supporting parents | ● | ○ | | ● | | ● | | | ● | ● | ○ | ● | | | ● | | | | |   |
| Children | ● | ● | ○ | | | | ● | ● | ○ | | | ○ | | ○ | ● | | | | | ○ |
| (Child) education | ○ | ● | ● | | | | ● | | | ● | | | | ● | ○ | ○ | | | |   |
| Lifelong learning | ○ | | ○ | ○ | ● | ● | ● | | | ● | ○ | ● | ● | ● | ● | | | | ○ | ● |
| Friendship | ● | ○ | ○ | ● | | | ○ | ● | | | | | | | | ○ | ○ | ● | ● |   |
| Lending / debt | | | ○ | ● | ○ | ● | ○ | ● | | | ○ | | ○ | | ● | | ● | ○ | ○ |   |
| Lying | ○ | ● | ● | ● | ● | | ● | | ○ | | ● | | | | | ● | ○ | | |   |
| Fraud / scams | | | | | ● | ● | | ● | ○ | | | ● | | | | | ● | | ● |   |
| Betrayal | | ● | ● | | ● | | | | | | | | ● | | | ● | | | |   |
| Broken promises | ● | | | ● | | ○ | | ○ | | | | | ○ | | | ● | ● | | |   |
| Refusal / impulse | ○ | ● | | ● | | | ● | ● | | | | ○ | | | ○ | | ● | ● | ● | ○ |
| Consent / sexual health | | ○ | | | | | ● | ● | ○ | | | | | | | | ○ | ● | ● | ● |
| Jealousy / control | ○ | ○ | ● | ○ | | ● | ○ | ○ | | | | | ● | | | | | | |   |
| Career pressure / dreams | ● | ● | ● | ● | ○ | ● | ○ | | ● | | ● | | ○ | ● | ○ | ● | | ○ | | ● |
| Eldercare / care work | ● | ○ | | | | ○ | ● | | ○ | ● | | ● | | | ● | | | | | ● |
| Gossip / chat privacy | ● | | | ○ | | | ● | ● | | ○ | | | | | | | ● | ○ | |   |
| Greed / materialism | | | | ● | ● | ○ | | ● | | | | | ● | | | ● | ● | | |   |
| Housing / BTO / CPF | ● | ○ | ○ | ● | | ● | | ● | ● | ○ | ● | ○ | ● | | | | | | |   |

Every topic has at least two primary carriers; every character carries at least two primary topics.


---

## 3. The eight heroines

Radar axes (definitions in §5.1): **INT** intellect · **WRM** warmth · **CMP** compassion · **GEN** gentleness ·
**GNR** generosity · **SEN** sensitivity · **FIT** values-fit (computed, starts "?"). Values use the 13 axes from
VALUE_PROFILES §2 on −2..+2. Flaw tags start hidden and are revealed at the listed beat. Neglect sensitivity runs
from 0 (never minds) to 3 (feels it at once); see §5.4.

### 3.1 Nur Hanis (`hina`) · heroine, route · existing

| | |
|---|---|
| Names | EN *Hanis* / *Nur Hanis* · zh *哈妮丝* / *努尔·哈妮丝* |
| Age | 16 at Ch1 (turns 17 in JC1) |
| Background | Malay Singaporean. Lives on the player's HDB floor in Seri Bayu with her parents, two younger brothers and her Nenek. Her family cooks for the whole corridor at Hari Raya. Wants to be a nurse. First-aid CCA. |
| Role | Childhood friend; the "always there" person the player takes for granted |
| Personality | Warm, blunt, teasing, practical, quick to anger and quick to forgive |
| Values | family +2, conflict +2, honesty +2, promises +2, children +1, learning +1, lending +1, home +1, spend −1, gifts −1, career −1, childEdu −1, friends −1 |
| Flaw tags | `hot-tempered` (Ch2, 2-4) · `stubborn` (Ch6, 6-1) · `yes-at-home` (can't refuse her family; Ch12) · `teases-to-hide` (Ch11, 11-1) |

**First impression (the shine):** "Just Hanis." Familiar, loud and easy; the player assumes there is nothing new to
learn. Her estimate is the only one that starts *below* the truth on most axes.
**Hidden:** she is the sharpest observer in the cast and quietly carries her Nenek's care at night. The teasing hides
how easily she is hurt. She keeps a list of every promise the player has broken, not to punish him but because she
is counting how many more she can take.

**Radar** (first → true): INT 55→72 · WRM 80→85 · CMP 70→88 · GEN 60→55 · GNR 70→75 · SEN 40→80 · FIT ?

| Reveal | Trigger |
|---|---|
| CMP | 👆 1-1 notice the egg hearts, or 📖 Ch5 ankle (she hid the pain to keep the group going) |
| SEN | 👆 6-1 the broken-promises talk, or 11-1 "Just say it" |
| INT | 👆 2-4 boundary talk (she names the pattern before you do) |
| GEN | 📖 2-4 temper flare |
| FIT | first partner talk (Ch6 lies, Ch16 home) |

**Appearances:** in code Ch1 (street, classroom), Ch2 (Sentosa), Ch3 (birthday, party room), Ch5 (campsite), Ch6
(carnival), Ch9 (dragon playground), Ch10 (Faris), route chapters 11–20. Planned: Ch12 Hari Raya open house at her
flat (gifts, supporting parents); Ch16 Nenek's hospital week (eldercare, her care load).
**Topics:** broken promises, refusal, supporting parents, children, eldercare, gifts (useful over pricey), gossip
(void-deck aunties), career dreams (nursing).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Hides a sprained ankle so the hike goes on | 5 | 📖 | reveal CMP; flaw `stubborn` hinted |
| Broken-promises talk at the carnival | 6 | 👆 | reveal SEN; Trust +5 if you own it, −5 if you joke |
| Nenek falls; she skips her CCA leadership camp to cover night care | 12 | 📖 | flaw `yes-at-home` revealed |
| You help her say "I can't this week" to an aunt | 12 or 16 | 👆 | GEN +6; `yes-at-home` → growing; Trust +4 |
| Burnout in the health room (with Nurse Tan) | 14 | 📖 | SEN stays high; shows care work has a cost |
| Nursing degree offer; she chooses it herself | 15 | 📖 | INT +4 (she studies for it) |
| She tells you what she wants instead of hinting | 18 | 👆 if you asked plainly in 11-1 | `teases-to-hide` → resolved |

**Neglect sensitivity: 3.** She never chases. Each chapter without contact costs Trust, and the void-deck aunties
notice ("You two quarrel ah?") and pass it around the estate circle.

**Key judgements logged:** "She's just the girl next door" (1-1, unfair, struck when CMP is revealed) · "She
overreacts" (2-4, unfair once SEN is revealed) · "She remembers every promise" (6-1, fair).

**Visual spec.** Round face, big warm amber eyes, small ahoge, short chestnut bob with an orange star hair clip,
warm light-brown skin. Palette: sunflower yellow, cream, teal accent.
1. *Uniform:* Bayview JC white short-sleeved blouse, teal-and-navy skirt, yellow cardigan, teal ribbon.
2. *Casual:* striped tee, denim overall shorts, canvas sneakers, a corridor-slippers variant for home scenes.
3. *Activity, first-aid CCA:* white-and-red first-aid polo (fictional crest), cargo pants, a kit pouch on a lanyard.
4. *Festive, Hari Raya:* sunflower-yellow baju kurung with songket trim, matching the family's colour theme, star
   clip kept. (She does not wear a tudung; that is her own choice and is not commented on.)
Expressions: neutral, happy, angry, sad, blush, plus planned *tired* (Ch14).

### 3.2 Lim Xin Yi (`mio`) · heroine, route · existing

| | |
|---|---|
| Names | EN *Xin Yi* / *Lim Xin Yi* · zh *欣怡* / *林欣怡* |
| Age | 16 at Ch1 |
| Background | Chinese Singaporean. Only child; her parents (a radiographer and a civil servant) want medicine. Her grandmother lives with them and is cared for by Joy. School-magazine co-editor; writes short fiction under a pen name. |
| Role | Bookworm in the library, and the cast's best writer |
| Personality | Shy in person, fierce on paper, dry humour, precise, avoids open conflict |
| Values | learning +2, career +1, family −1, home −1, children −1, lending 0, spend −2, gifts −2, childEdu −2, friends −2, conflict −2, honesty +2, promises +1 |
| Flaw tags | `avoids-conflict` (Ch2, 2-1) · `says-it-on-paper` (writes the letter instead of saying it; Ch11) · `perfectionist` (Ch14) · `obeys-to-keep-peace` (Ch15) |

**First impression:** "A shy, sweet girl who needs protecting." The player expects softness and agreement.
**Hidden:** she has strong opinions and a sharp tongue, judges the player as fast as he judges her (Ch5 two-way
projection), and her quietness is a strategy for surviving a loud house, not a personality.

**Radar:** INT 70→90 · WRM 55→60 · CMP 65→75 · GEN 85→65 · GNR 60→55 · SEN 75→85 · FIT ?

| Reveal | Trigger |
|---|---|
| INT | 👆 2-1 ask a follow-up about her book |
| GEN | 📖 Ch5 her sharp read of the player ("You looked at my book, not at me") |
| SEN | 👆 Ch9 date: notice she stopped talking when her mother called |
| WRM | 👆 11-x letter scene: reply in person rather than in writing |
| FIT | first partner talk (Ch6 conflict, Ch14 dreams) |

**Appearances:** in code Ch1 (library), Ch2 (library, the shared-umbrella scene), Ch5 (Ubin camp), Ch9 (bookshop),
Ch10 (Jun Hao), route 11–20. Planned: Ch12 CNY at her flat (Joy, her grandmother, the "when are you studying
medicine" relatives); Ch15 she gets a writing scholarship to Melbourne while her parents push medicine.
**Topics:** child education (parents' plan versus her own), lying (she lies to her parents about the magazine),
betrayal (Ch14, a magazine friend leaks her pen name), refusal, gifts (she hates expensive ones), career dreams.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Projection works both ways at camp | 5 | 📖 | reveal GEN; flaw `avoids-conflict` |
| A friend leaks her pen name to the class chat | 14 | 📖 | Trust in friends drops; topic betrayal |
| You back her when she tells her parents the truth | 15 | 👆 | `obeys-to-keep-peace` → growing; WRM +6 |
| She sends a draft instead of saying "I'm hurt" | 11 | 📖 | flaw `says-it-on-paper` |
| You ask her to say it out loud, and wait | 11 or 18 | 👆 | `says-it-on-paper` → growing; Trust +5 |
| She submits an imperfect story on time | 14 | 👆 if you helped her plan, not write it | `perfectionist` → growing |

**Neglect sensitivity: 2.** She will not complain; she withdraws and the recap says so. Gossip spreads through the
school circle via the magazine team.

**Key judgements:** "She's too shy to have opinions" (1-x, unfair) · "She judged me first" (Ch5, fair; both did) ·
"She is lying to her parents" (Ch12, fair but understood).

**Visual spec.** Round face, big violet eyes behind round glasses, long lavender hair in a single side braid with a
small ribbon. Palette: lavender, cream, navy.
1. *Uniform:* JC blouse, teal-and-navy skirt, oversized cream cardigan, a book under one arm.
2. *Casual:* knit vest over a white shirt, long pleated skirt, canvas tote with a paperback and pens.
3. *Activity, Ubin camp:* camp tee, quick-dry shorts, bucket hat, life vest for kayaking.
4. *Festive, CNY:* lilac modern qipao-style top with frog buttons, wide-leg trousers, jade hairpin.
Expressions: neutral, happy, sad, blush, angry, plus planned *focused* (writing) and *deadpan*.

### 3.3 Kavya Pillai (`kaede`) · heroine, route · existing

| | |
|---|---|
| Names | EN *Kavya* / *Kavya Pillai* · zh *卡维娅* / *卡维娅·皮莱* |
| Age | 17 at Ch1 (January birthday, the oldest in the cohort) |
| Background | Indian Singaporean (Tamil). Lives with her aunt while her parents work overseas; video calls at 11 pm. Track CCA, 400 m. Hopeless cook. |
| Role | Track star; the "cool, untouchable" one |
| Personality | Competitive, direct, impatient, secretly goofy, hot-and-cold under pressure |
| Values | career +2, childEdu +2, spend +1, conflict +1, friends +1, gifts 0, learning 0, lending −1, children −1, family −2, home −2, honesty +1, promises +1 |
| Flaw tags | `hot-and-cold` (Ch3) · `competitive-to-a-fault` (Ch4, 4-1) · `won't-rest` (Ch10) · `jealous` (Ch10, the Arvind scene) |

**First impression:** "Ice queen. Out of your league." Cool, confident, rich-looking in her branded track kit.
**Hidden:** lonely with her parents abroad, terrified of being ordinary, and much funnier than she lets anyone see.
Her coldness is fatigue and fear, not contempt.

**Radar:** INT 60→75 · WRM 35→70 · CMP 45→65 · GEN 30→50 · GNR 50→60 · SEN 30→70 · FIT ?

| Reveal | Trigger |
|---|---|
| WRM | 👆 4-1 losing the bet gracefully; or 📖 Ch5 camp curry disaster |
| SEN | 👆 Ch9 notice the 11 pm call and ask about it |
| CMP | 📖 Ch6 she pulls a hurt junior off the track |
| GEN | 👆 Ch10 control talk (she apologises for the Arvind outburst) |
| FIT | first partner talk (Ch6 education, Ch14 dreams) |

**Appearances:** in code Ch1 (field), Ch2, Ch3, Ch4 (mall, the bet), Ch5, Ch6 (carnival), Ch9, Ch10 (Arvind),
route 11–20. Planned: Ch12 Deepavali at her aunt's (she cannot make murukku, and that's fine); Ch15 sports
scholarship abroad.
**Topics:** jealousy and control, career pressure, child education (she wants hothousing for her own future kids
and has to look at why), lying (she lies to her parents that she's fine), money (spends on gear), betrayal (Ch14,
a teammate posts her injury before she told her parents).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Loses the bet, pays up, laughs | 4 | 👆 | reveal WRM if you didn't gloat |
| Jealous of Arvind; you ask instead of retaliating | 10 | 👆 | `jealous` revealed; GEN +5 if she apologises |
| Hamstring injury before Nationals | 14 | 📖 | `won't-rest` revealed; SEN shown |
| You tell her to rest, not to "push through" | 14 | 👆 | `won't-rest` → growing; Trust +6 |
| Tells her parents the truth on a call | 15 | 👆 if you encouraged it in Ch9 or 14 | WRM +5; `hot-and-cold` → growing |

**Neglect sensitivity: 1.** She is busy too and rarely notices a quiet week. But she reads silence before a race as
"you don't care", so missing Ch10-5 or Ch14 counts double.

**Key judgements:** "She thinks she's better than everyone" (1-x, unfair) · "She's controlling" (Ch10, partly fair:
it was jealousy, and she owned it).

**Visual spec.** Heart-shaped face, big teal eyes, a silver high ponytail with a teal band, warm caramel-tan skin.
Palette: navy, teal, silver.
1. *Uniform:* JC blouse and navy track jacket (fictional Bayview crest, teal stripes) over a teal-and-navy skirt.
2. *Activity, track:* racing singlet with a bib number, running shorts, spikes, kinesiology tape on one knee (Ch14).
3. *Casual:* oversized grey hoodie, bike shorts, chunky sneakers, earbuds.
4. *Festive, Deepavali:* teal-and-gold silk half-saree (pavadai davani), small jhumka earrings, jasmine in her hair.
Expressions: neutral, cool, smug, happy, angry, plus planned *pain* (injury) and *laughing*.

### 3.4 Elise de Souza (`yuna`) · heroine, route · existing

| | |
|---|---|
| Names | EN *Elise* / *Elise de Souza* · zh *伊莉丝* / *伊莉丝·德索萨* |
| Age | 16 at Ch1 |
| Background | Eurasian Singaporean (Kristang family). Lives with her single mother, a night-shift call-centre lead, in a 3-room flat. Runs a dance-cover stream with 40k followers; sends half her income home. |
| Role | Streamer and class idol; the "shine" heroine |
| Personality | Bubbly on camera, tired off it, generous to a fault, avoids saying no |
| Values | spend +2, career +2, friends +2, lending +2, gifts +1, family +1, home +1, children 0, childEdu 0, learning −1, conflict −1, honesty +1, promises 0 |
| Flaw tags | `white-lies` (Ch4) · `flaky` (Ch6) · `overspends` (Ch7) · `keeps-backups` (fish-pond texting; Ch6, 6-3) · `can't-say-no` (Ch16) |

**First impression:** the idol. Perfect, sparkly, always happy, surrounded by fans. The Rose Filter starts highest
on her.
**Hidden:** exhausted, messy room, energy drinks for dinner, kind to everyone (including people who use her). Her
stream persona is a job; she is lonelier than anyone in the class.

**Radar:** INT 45→65 · WRM 90→70 · CMP 60→80 · GEN 85→70 · GNR 70→90 · SEN 50→75 · FIT ?

| Reveal | Trigger |
|---|---|
| WRM (lowered) | 📖 Ch5 the unfiltered morning at camp |
| GNR | 👆 Ch7 notice she paid for the whole table again |
| INT | 👆 Ch4 ask how she edits and schedules her stream |
| SEN | 👆 Ch9 "She's not her stream" choice |
| FIT | first partner talk (Ch6 lies, Ch16 lending) |

**Appearances:** in code Ch2, Ch4 (mall), Ch5, Ch6 (carnival), Ch7 (Kai era), Ch9, Ch10 (Leo), route 11–20.
Planned: Ch12 Christmas lunch with her mother and Kristang aunties (supporting parents, gifts); Ch16 a fan asks her
for a $500 loan.
**Topics:** money and spending, lending, supporting parents, lying (small and kind), broken promises, greed (the
platform's, not hers), refusal, gifts.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Unfiltered at camp; no make-up, bad mood | 5 | 📖 | WRM estimate drops to truth; Rose Filter −10 |
| Fish-pond texting found out | 6 | 📖 | `keeps-backups` revealed |
| You tell her what you saw instead of ghosting | 6 | 👆 | Trust +5; she apologises |
| The $500 fan loan | 16 | 📖 | `can't-say-no` revealed |
| You help her draft the refusal (not send it for her) | 16 | 👆 | GNR −5 (healthier); `can't-say-no` → growing; Trust +6 |
| She takes a stream break; numbers drop, she's fine | 15 | 👆 if you didn't ask her to "go viral" | `overspends` → growing |

**Neglect sensitivity: 2.** She is used to people leaving when the stream stops. Silence is read as "you only liked
the show", and her fan Discord is the fastest gossip circle in the game.

**Key judgements:** "She's fake" (Ch4, unfair) · "She owes me the person on stream" (Ch5, unfair; struck at once) ·
"She lies to keep peace" (Ch6, fair).

**Visual spec.** Round face, big magenta eyes, pink twin tails with white bows and a star clip, warm olive-tan skin.
Palette: candy pink, white, mint.
1. *Uniform:* JC blouse, skirt, pink scrunchies, phone always in hand.
2. *Stream / stage:* pastel cropped-length bomber over a high-neck top, pleated skirt over leggings, LED hair bows
   (cute, not sexualised).
3. *Home, unfiltered:* oversized hoodie, glasses, a messy bun, no bows. Used in Ch5 and Ch7 to undo the shine.
4. *Festive, Christmas:* green knit dress with a red ribbon, white cardigan.
5. *Activity, dance practice:* tee knotted at the hip, joggers, sneakers.
Expressions: neutral, happy, smug, sad, blush, plus planned *tired* and *forced smile*.

### 3.5 Rae Koh (`rei`) · heroine, bond only (not romanceable) · existing

| | |
|---|---|
| Names | EN *Rae* / *Rae Koh* · zh *瑞儿* / *许瑞儿* |
| Age | 22 at Ch1 |
| Background | Chinese Singaporean. Former law student who dropped out when her family took on debt; recruited by Mr. G's ring as the "face" of romance scams. Escapes in Part III, testifies, returns to study law part-time. |
| Role | The first "perfect girl", revealed as a scam script; later the player's ally |
| Personality | Charming on script, guarded off it, dry, self-blaming, fiercely honest once safe |
| Values | learning +2, career −1, family −1, spend −1, gifts −1, friends −1, lending −2, children 0, childEdu 0, conflict 0, home 0, honesty +2 (after Ch15), promises +1 |
| Flaw tags | `white-lies` (the script; Ch3) · `self-blame` (Ch15) · `distrusts-kindness` (Ch15) · `isolates` (Ch19) |

**First impression:** perfect. Beautiful, older, adoring, always available, love-bombing. Her Ch1 Connection
already shows "???": that is the hidden-attribute system's first lesson.
**Hidden:** the warmth was a script; the person behind it is wary, clever and kind in a quiet way. She was coerced
and is a victim and a witness. She is never written as a seductress.

**Radar:** INT 60→85 · WRM 98→55 · CMP 90→70 · GEN 95→60 · GNR 85→55 · SEN 50→80 · FIT ?

| Reveal | Trigger |
|---|---|
| WRM, GEN, GNR (all lowered) | 📖 Ch3 emergency script exposed, or 👆 earlier if you call the 1-x red flags |
| INT | 📖 Ch15 testimony |
| SEN | 👆 Ch15-4 "I'm not going anywhere, as a friend" |
| CMP | 📖 Ch19 she warns others in her talk |
| FIT | Ch19 partner-style talk |

**Appearances:** in code Ch1 (phone and mall), Ch3 (emergency), Ch6 (Mr. G), Ch14 (arcade), Ch15 (escape), Ch19
(talk). Planned: Ch20 epilogue cameo at her first moot.
**Topics:** fraud (both sides), lying, betrayal, lifelong learning (back to law at 25), lending ("never again"),
greed (the ring's).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| The emergency script fails | 3 | 📖 | the big reveal: three axes drop to truth |
| She asks for help, not money | 15 | 📖 | `self-blame` revealed |
| You stay as a friend and offer nothing romantic | 15 | 👆 | Bond Trust +10; `distrusts-kindness` → growing |
| She gives the Ch19 scam-awareness talk | 19 | 📖 | CMP shown |
| You attend and bring Haziq | 19 | 👆 | `isolates` → resolved |

**Neglect sensitivity: 1** in Parts I–II (she is working a script), **2** after Ch15 (she expects to be dropped).
**Key judgements:** "She's into me" (Ch1, unfair: projection) · "She's a liar" (Ch3, fair but incomplete) · "She
was a victim" (Ch15, fair).

**Visual spec.** Oval face, big crimson eyes, a beauty mark, long straight glossy black hair. Palette: crimson and
gold (persona), then oatmeal and denim (herself).
1. *Persona (Parts I–II):* red midi dress with a square neck (not low-cut), gold heart necklace, salon hair.
2. *Herself (Ch15):* oversized oatmeal shirt, jeans, hair in a low tie, no necklace.
3. *Law student:* navy blazer over a white tee, lanyard, tote of case files.
4. *Occasion, the Ch19 talk:* soft grey cardigan and slacks, a lapel mic.
Expressions: neutral, happy, scheme, sad, plus planned *relieved* and *steady*.

### 3.6 Chloe Goh (`chloe`) · heroine, route · **new**

| | |
|---|---|
| Names | EN *Chloe* / *Chloe Goh* · zh *可儿* / *吴可儿* |
| Age | 16 at Ch1 (Year 1 at a polytechnic, Diploma in Business) |
| Background | Peranakan Chinese Singaporean on her mother's side. Her family runs *Goh's Kueh*, a nonya kueh stall at the Seri Bayu hawker centre. Her father's first shop closed with debts the family is still paying; she does the stall's books at 16. Opens the stall at 6 am before class. |
| Role | Hawker-centre regular turned friend; the money-smart, family-business heroine |
| Personality | Sharp, funny, frank about money, proud, competitive, soft with the elderly regulars |
| Values | family +2, career +2, learning +2, childEdu +1, conflict +1, gifts 0, friends 0, children 0, home −1, spend −2, lending −2, honesty +2, promises +2 |
| Flaw tags | `keeps-score` (Ch4) · `transactional` (prices every kindness; Ch9) · `workaholic` (Ch10) · `proud` (won't take help; Ch12) · `ambition-blind-spot` (Ch19) |

**First impression:** "Money-minded. Cold. An auntie-in-training who'll judge my wallet."
**Hidden:** she quietly runs a tab for Mdm. Rokiah, an elderly regular who can't pay (against her own "never lend"
rule), and her hardness is fear of the debt that nearly sank her family. Her blind spot is ambition: a slick
"business coach" almost recruits her into an MLM in Ch19.

**Radar:** INT 60→82 · WRM 30→70 · CMP 35→80 · GEN 40→55 · GNR 20→65 · SEN 45→60 · FIT ?

| Reveal | Trigger |
|---|---|
| CMP, GNR | 👆 planned 4-x: notice the unpaid tab and don't mention it in front of Mdm. Rokiah |
| INT | 👆 4-x ask how she prices a kueh (cost, waste, rent) |
| WRM | 📖 Ch9 date: she brings kueh for your Mum |
| SEN | 👆 Ch12 "You don't have to prove anything to me" |
| FIT | first partner talk (Ch6 money, Ch16 lending) |

**Appearances (all planned):** Ch4 hawker centre, the spending lesson (she points out the "$15 fancy drink"
maths; meeting flag `chloeMet`); Ch6 carnival booth (she runs a stall, and it's how the player sees her work);
Ch7 she knows what a fake luxury watch costs (Kai's materialism); Ch9 date: a $10 hawker crawl challenge;
Ch10 Darren, her supplier's son who delivers pandan at 6 am (control lesson); Ch10-5 her kueh wins a youth
hawker-entrepreneur grant; Ch12 CNY at her family stall rush; Ch15-1 dream: an incubator place with a starter loan
for her own kiosk (seven-day weeks); Ch16 lending talk; Ch19 the MLM "coach"; Ch20 money as a couple.
**Topics:** money, lending and debt, supporting parents, fraud (MLM), greed (ambition versus greed), career dreams,
lifelong learning (night courses), jealousy (Darren).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| You notice the unpaid tab and say nothing in public | 4 | 👆 | reveal CMP and GNR; Trust +4 |
| She calls the date a "transaction" as a joke | 9 | 📖 | flaw `transactional` |
| You tell her you're not keeping score | 9 | 👆 | WRM +5; `keeps-score` → growing |
| Collapses after a 6 am shift and a test | 10 | 📖 | `workaholic` revealed |
| Her dad's old debt letter arrives | 12 | 📖 | `proud` revealed (she hides it) |
| You offer help that respects her pride (labour, not cash) | 12 | 👆 | Trust +6; `proud` → growing |
| The MLM coach ("be your own boss") | 19 | 📖 | `ambition-blind-spot` revealed |
| You ask her to run the numbers out loud, not tell her no | 19 | 👆 | she walks away herself; INT +3; flaw → resolved |

**Neglect sensitivity: 1.** She is busier than the player and respects his time. But she keeps score: three missed
plans in a row and she quietly "closes the tab" (Trust −8), and the hawker uncles talk.

**Key judgements:** "She only cares about money" (Ch4, unfair; struck by the tab) · "She's proud" (Ch12, fair) ·
"She almost fell for it" (Ch19, fair and human).

**Visual spec.** Round face with a dimple, big amber-brown eyes, black hair in a short high bun with a pencil
through it, warm light skin. Palette: pandan green, kueh-lapis pink, cream.
1. *Poly casual:* oversized pandan-green hoodie, cargo shorts, crossbody pouch, a calculator app open.
2. *Stall:* pink-striped apron, pandan-green bandana, arm sleeves, hair fully tied.
3. *Pitch day:* thrifted beige blazer over a pink tee, wide-leg trousers, a clipboard.
4. *Festive, CNY:* pink nonya kebaya with green embroidery and kerongsang brooches, batik sarong skirt.
Expressions: neutral, grin, smug, annoyed, tired, blush.

### 3.7 Harpreet "Preet" Kaur (`preet`) · heroine, route · **new**

| | |
|---|---|
| Names | EN *Preet* / *Harpreet Kaur* · zh *普丽特* / *哈普丽特·考尔* |
| Age | 16 at Ch1 |
| Background | Sikh Punjabi Singaporean. Bayview JC classmate in Ms. Farah's GP class; debate CCA. Tutors primary-school children for free at the Seri Bayu community centre; on Saturdays teaches seniors (including Ah Ma) to use their phones. Wants to be a social worker. Her parents run a printing shop. |
| Role | The class debater and Ch13 peer educator; the service-and-education heroine |
| Personality | Articulate, principled, energetic, impatient with excuses, gentle with children |
| Values | learning +2, children +2, conflict +2, friends +1, family +1, lending +1, home 0, career 0, spend −1, childEdu −1, gifts −2, honesty +2, promises +1 |
| Flaw tags | `judgemental` (Ch3, the gossip talk) · `lectures` (Ch6) · `overcommits` (Ch10) · `can't-switch-off` (Ch14) |

**First impression:** "Preachy debate queen who looks down on everyone."
**Hidden:** anxious that she's never doing enough, cries in the toilet after losing debates, endlessly patient with a
struggling eight-year-old. She knows she judges fast and is working on it, which is her arc.

**Radar:** INT 85→88 · WRM 35→75 · CMP 50→90 · GEN 25→60 · GNR 55→80 · SEN 40→75 · FIT ?

| Reveal | Trigger |
|---|---|
| WRM, GEN | 👆 planned 3-x: walk past the CC tuition room and stay to help |
| CMP | 📖 Ch13 peer-educator card sort: she handles a crude joke without shaming anyone |
| SEN | 👆 Ch10 after the debate final: "You don't have to be okay" |
| INT | 📖 Ch1 GP lesson (shown at once; it was never in doubt) |
| FIT | first partner talk (Ch6 conflict, Ch18 children) |

**Appearances (planned unless noted):** Ch1 GP class (one line; flag `preetMet`); Ch3 she shuts down the
group-chat gossip about a classmate (gossip, privacy); Ch5 camp, Ms. Farah's group; Ch6 carnival "lie or truth"
booth; Ch9 date: volunteering together at the CC then prata; Ch10 Ethan, her debate partner (control lesson);
Ch10-5 schools debate final; Ch12 Vaisakhi / Gurpurab with her family; Ch13 the peer educator (existing unnamed role,
now Preet); Ch15-1 dream: a social-work degree with a six-month NGO placement in Chiang Mai; Ch16 she brings the
care-work lens to the `eldercare` card; Ch18 children talk (she wants kids, is open to fostering).
**Topics:** child education, lifelong learning, children, refusal ("no is a full sentence"), lying (she catches
small lies and has to learn grace), gossip, consent education, eldercare.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| She shuts down gossip in the class chat | 3 | 📖 | flaw `judgemental` shown (she shames the gossiper) |
| You help her correct without humiliating | 3 or 6 | 👆 | GEN +6; `judgemental` → growing |
| Lectures the player about a white lie | 6 | 📖 | flaw `lectures` |
| Says yes to five things and breaks down | 10 | 📖 | `overcommits` revealed |
| You help her drop one thing (not take it on yourself) | 10 | 👆 | Trust +6; `overcommits` → growing |
| Teaches Ah Ma ScamShield | 16 | 👆 if you introduced them in Ch12 | pays off in Ch19 (see Ah Ma) |
| Forgives a lie she would have judged in Ch6 | 18 | 👆 if `judgemental` is growing | `judgemental` → resolved |

**Neglect sensitivity: 2.** She notices and says so directly ("You've gone quiet. Are we okay?"). Ignoring that
direct question costs double Trust. She does not gossip and refuses to pass rumours on, which makes her the one
circle node that **blocks** gossip (§5.5).

**Key judgements:** "She thinks she's better than me" (Ch1, unfair) · "She judges people" (Ch3, fair; and she
knows) · "She's kind to people who can't do anything for her" (Ch3, fair).

**Visual spec.** Round face, thick expressive brows, big deep-brown eyes, a long thick black braid with a navy
ribbon, a steel kara bracelet, warm medium-brown skin. Palette: royal blue, marigold, white.
1. *Uniform:* JC blouse and skirt, navy debate blazer with gold piping on competition days.
2. *Volunteer:* royal-blue CC volunteer tee, jeans, lanyard, a tote of worksheets and crayons.
3. *Activity, park run:* dri-fit tee, leggings, headband, braid tucked in.
4. *Festive:* marigold salwar kameez with a phulkari-embroidered dupatta.
Expressions: neutral, determined, happy, sad (after a loss), embarrassed, stern.

### 3.8 Natalie Rodrigues (`nana`) · heroine, late route (Part V) · existing, promoted

| | |
|---|---|
| Names | EN *Natalie* / *Natalie Rodrigues* · zh *娜塔莉* / *娜塔莉·罗德里格斯* |
| Age | 19 at Ch17 |
| Background | Eurasian Singaporean. Switched from a business degree to ceramics at an arts college at 19; rents a room in Tiong Bahru since her parents moved to Perth. Lost $1,200 to a romance scammer last year and told no one. |
| Role | Friend of friends met at the Ch17 chalet; the "love can start later, slowly" heroine |
| Personality | Forward on a brave day, shy on the other six, curious, restless, self-deprecating |
| Values | learning +2, career +1, friends +1, conflict +1, spend +1, family 0, lending 0, childEdu 0, children −1, gifts −1, home −1, honesty +2, promises +1 |
| Flaw tags | `impulsive` (Ch17) · `ghosts-when-overwhelmed` (Ch19) · `says-yes-fast` (Ch17) · `hides-shame` (Ch19) |

**First impression:** "Confident, flirty, way too forward." (The game shows no judgement of her for asking; CHAPTERS
17-1.)
**Hidden:** she asked because she was brave for once; she likes slow things (wheel-throwing, long walks). She is
ashamed of being scammed, which is why she ghosts when dating apps get intense.

**Radar:** INT 55→75 · WRM 80→70 · CMP 50→70 · GEN 45→75 · GNR 60→60 · SEN 35→80 · FIT ?

| Reveal | Trigger |
|---|---|
| GEN, SEN | 👆 17-1 "Coffee on Saturday?" and listen at the coffee |
| INT | 👆 Ch18 ask about her course switch |
| CMP | 📖 Ch19 she warns Haziq about the love-bomb account |
| FIT | first talk (Ch18 children or Ch19 dating) |

**Appearances:** in code Ch17 (chalet). Planned: Ch18 Saturday coffee and pottery studio; Ch19 dating-app chapter
(she spots a fake "Lin" profile from experience, then admits her own loss); Ch20 slow-start epilogue.
**Topics:** fraud (romance scam survivor), impulse and refusal, lifelong learning (career switch), friendship,
consent (asks before a hug), shame and asking for help.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| She asks first | 17 | 📖 | `says-yes-fast` hinted |
| Coffee instead of a drink | 17 | 👆 | opens her track; Affection +6 |
| Ghosts for a week after a hard conversation | 19 | 📖 | `ghosts-when-overwhelmed` |
| Tells you about the $1,200 | 19 | 👆 if Trust ≥ 40 | `hides-shame` → growing; Trust +8 |
| Reports the scammer with Rae's help | 19 | 👆 | `hides-shame` → resolved |

**Romance gate:** Affection and Trust always count, but the romance only opens when `S.route` is null or
`S.flags.brokeUp`. On a locked route she stays a friend and that is written as a good outcome.
**Neglect sensitivity: 1** (she half-expects it; that's the problem). One missed reply after she opens up counts
as three.
**Key judgements:** "She's too forward" (Ch17, unfair) · "She's flaky" (Ch19, unfair once she explains) · "She was
scammed because she was stupid" (Ch19, unfair; the game corrects it with the fact card).

**Visual spec.** Soft oval face, big hazel eyes, voluminous dark curly hair in a half-up clip, warm tan skin, clay
under her nails. Palette: terracotta, sage, cream.
1. *Casual (chalet):* coral tee, high-waist jeans, hair clip.
2. *Studio:* sage apron splashed with clay, rolled sleeves, a headscarf for her hair.
3. *Weekend:* linen overshirt, slip skirt over bike shorts, sandals, tote.
4. *Occasion, gallery show:* terracotta wrap dress (knee-length, modest), small hoop earrings.
Expressions: neutral, surprised, happy, shy, sad.

---

## 4. The twelve other main characters

Same fields as the heroines. Their Affection bar is labelled by relationship (*Friendship*, *Family*, *Mentor*).
Trust works the same way for everyone.

### 4.1 Muhammad Haziq (`kenta`) · best friend · existing

| | |
|---|---|
| Names | EN *Haziq* / *Muhammad Haziq bin Ismail* · zh *哈齐克* / *穆罕默德·哈齐克·本·伊斯迈尔* |
| Age | 16 at Ch1 |
| Background | Malay Singaporean, youngest of four, two blocks away. Basketball captain. Brilliant with his nephews. Later NS section mate. |
| Role | Best friend; the player's mirror for every bad idea the internet sells boys |
| Personality | Loud, loyal, funny, gullible, emotionally honest once he stops performing |
| Values | friends +2, children +2, home +2, spend +1, lending +1, family +1, career 0, gifts 0, childEdu 0, learning −1, conflict −1, honesty +1, promises +1 |
| Flaw tags | `gullible` (Ch4, the course) · `impulse-buyer` (Ch7) · `overshares` (Ch9) · `bad-bro-advice` (Ch2) |

**First impression:** comic relief who never thinks. **Hidden:** the most emotionally honest boy in the game; he
admits shame (Ch15 Kai exposure, Ch19 love-bomb) before the player does. His gullibility is age-typical and shared by
Ryan and the player; it is never tied to who he is.

**Radar:** INT 40→60 · WRM 85→90 · CMP 60→80 · GEN 50→70 · GNR 80→85 · SEN 40→70 · FIT ?
Reveals: SEN 👆 4-4 talk him out of the course gently · CMP 📖 Ch13 he reports the grooming DM · INT 👆 Ch18 he
explains the clinic visit better than the leaflet.

**Appearances:** in code almost every chapter (1, 2, 5–20): classroom, field, hawker, MRT, camp, NS. Planned: Ch12
Hari Raya at his family's (Hanis's Nenek and his mum are friends).
**Topics:** friendship, lending, fraud (course, streamer, love-bomb), consent and grooming (13-5), myths (18),
spending, gossip (he leaks things by accident), children (he wants four).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| The $299 "alpha" course | 4 | 👆 | `gullible` revealed; Trust +5 if you don't mock him |
| Kai's watch: he puts $400 in a streamer's tip jar | 7 | 📖 | `impulse-buyer` |
| Reports the grooming DM instead of hiding it | 13 | 📖 | CMP shown |
| Kai exposed; he says "I felt stupid" | 15 | 📖 | SEN shown |
| You cancel on him at 9-4 | 9 | 👆 | Trust −6; he stops inviting you for one chapter |
| "No shame" talk after the Ch19 love-bomb | 19 | 👆 | `gullible` → growing; Friendship +8 |

**Neglect sensitivity: 2.** Bros don't say it. He stops inviting you instead, and the NS chat notices.
**Key judgements:** "He's an idiot" (Ch4, unfair) · "He tells everyone everything" (Ch9, fair) · "He was brave to
admit it" (Ch15, fair).

**Visual spec.** Round face, big grin, brown eyes, a fade with curls on top, warm tan skin. Palette: basketball
orange, navy, white.
1. *Uniform:* JC shirt untucked, navy trousers, a basketball keyring.
2. *Sport:* orange basketball jersey (number 7), shorts, high-tops.
3. *Festive, Hari Raya:* emerald baju melayu with a songket samping and a songkok.
4. *NS:* generic green field uniform, no real insignia (Part V).
Expressions: neutral, happy, sad, surprised, smug, plus planned *embarrassed* and *determined*.

### 4.2 Mei (`mei`) · older sister · existing

| | |
|---|---|
| Names | EN *Mei* · zh *小美* (the family surname is never shown, so the player can project his own) |
| Age | 20 at Ch1 (university year 2, business) |
| Background | Chinese Singaporean. Tutors three kids to cover her own fees and quietly pays part of the utility bill after Dad's shifts are cut. Tokyo internship in Ch15. |
| Role | Practical mentor; the one who says the money things out loud |
| Personality | Organised, bossy, wry, protective, hides stress |
| Values | family +2, career +1, learning +1, honesty +2, promises +2, spend −2, gifts −1, home 0, children 0, childEdu 0, friends 0, lending −1, conflict +1 |
| Flaw tags | `carries-it-alone` (Ch4) · `bossy` (Ch3) · `hides-stress` (Ch15) |

**First impression:** the sister who has it all together. **Hidden:** exhausted, lonely, quietly paying bills, and
afraid that leaving for Tokyo means abandoning the family.

**Radar:** INT 80→85 · WRM 50→75 · CMP 55→80 · GEN 40→55 · GNR 50→75 · SEN 35→65 · FIT ?
Reveals: GNR 👆 Ch4 see the bill on her phone and ask · SEN 📖 Ch15 the Tokyo call · WRM 👆 Ch12 her birthday
(remember it).

**Appearances:** in code Ch3, Ch10, Ch12, Ch14, Ch15, Ch16 (bedroom, dining, airport, phone). Planned: Ch4 the bill
beat. **Topics:** money, supporting parents, career, eldercare (planning Ah Ma's care), children (corrected card,
see §1.2), lending (she refuses to lend to a cousin).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Quietly pays the utilities | 4 | 📖 | `carries-it-alone` (hidden until 👆 you ask) |
| Tokyo internship; Dad's "one year" | 15 | 📖 | `hides-stress` revealed |
| You call her in Ch16 "askhelp" | 16 | 👆 | she admits she's lonely; Family +8; Trust +5 |
| You take one household task off her list | 16 | 👆 | `carries-it-alone` → growing |

**Neglect sensitivity: 1** (family: she doesn't leave, but she stops telling you things).
**Key judgements:** "She's bossy" (Ch3, fair) · "She's fine" (Ch15, unfair).

**Visual spec.** Slightly longer face, big dark eyes, shoulder-length black hair in a low ponytail, light skin.
Palette: mustard, white, denim.
1. *Casual:* mustard cardigan, tee, jeans. 2. *Internship:* navy blazer, lanyard, laptop bag. 3. *Home:* oversized
tee, shorts, house slippers, hair clipped up. 4. *Festive, CNY:* red modern qipao-style top, black culottes.
Expressions: neutral, happy, angry, plus planned *tired* and *teary* (airport).

### 4.3 Mum (`mom`) · mother · existing

| | |
|---|---|
| Names | EN *Mum* · zh *妈妈* |
| Age | 49 |
| Background | Chinese Singaporean. Part-time clerk at a neighbourhood clinic. Gave up her diploma when Mei was born; now doing a SkillsFuture bookkeeping course at night. Visits Ah Ma daily. |
| Role | Sandwich generation: caring up and down at once |
| Personality | Warm, worried, practical, compares her kids with cousins, never asks for help |
| Values | family +2, children +2, childEdu +1, home +1, spend −1, learning +1, lending 0, honesty +1, promises +1, conflict −1 |
| Flaw tags | `worries-out-loud` (Ch4) · `compares` (Ch12) · `self-sacrificing` (Ch16) |

**First impression:** nagging. **Hidden:** she is carrying her mother's care and a night course while nobody
notices, and she hopes you'll be more open than she was.

**Radar:** INT 55→70 · WRM 70→85 · CMP 70→90 · GEN 60→70 · GNR 70→85 · SEN 50→75 · FIT ?
Reveals: CMP 📖 Ch16 Ah Ma's fall · INT 👆 Ch12 notice her course workbook · SEN 👆 Ch16 cook dinner without being
asked.

**Appearances:** in code Ch4, Ch16. Planned: Ch12 CNY visiting, Ch20 epilogue (she passes her course).
**Topics:** supporting parents, eldercare, lifelong learning, child education, money ("a bit back to the house").

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Asks for "a bit back to the house" | 4 | 📖 | the family-money talk |
| Compares you with a cousin at CNY | 12 | 📖 | `compares` |
| You tell her how it lands, calmly | 12 | 👆 | GEN +5; `compares` → growing |
| Ah Ma falls | 16 | 📖 | `self-sacrificing` revealed |
| You take one care shift | 16 | 👆 | Family +8; Trust +6 |
| Passes her course | 20 | 📖 | INT +5 |

**Neglect sensitivity: 1.** She doesn't sulk; relatives ask "Why your son never visit Ah Ma?", which is gossip in
the family circle.
**Visual spec.** Soft round face, short permed black hair, small gold studs, light skin, gentle eyes. Palette: sage,
cream. 1. *Home:* sage blouse, apron. 2. *Work:* cardigan, lanyard, sensible flats. 3. *Night class:* tote,
reading glasses, workbook. 4. *Festive, CNY:* rose-pink blouse, black slacks. Expressions: neutral, sad, plus
planned *happy*, *worried*, *proud*.

### 4.4 Dad (`dad`) · father · existing

| | |
|---|---|
| Names | EN *Dad* · zh *爸爸* |
| Age | 52 |
| Background | Chinese Singaporean. Warehouse shift supervisor; his shifts are cut in Ch4 and he hides it. Played bass in a getai band at 19 and quit for a stable job. Gave his first pay packet to his mother. |
| Role | The "security first" voice on dreams, NS timing and money |
| Personality | Quiet, stubborn, saves face, dry jokes, cries at weddings |
| Values | career −2, spend −1, home +1, family +2, learning −1 (grows to +1), honesty 0 (grows), promises +2, lending −1, conflict −1 |
| Flaw tags | `saves-face` (Ch4) · `dismisses-dreams` (Ch10) · `stubborn` (Ch15) |

**First impression:** dismissive of your passion. **Hidden:** he had one too and gave it up out of fear; his "no" is
protection, not contempt.

**Radar:** INT 55→70 · WRM 40→75 · CMP 45→70 · GEN 35→60 · GNR 60→80 · SEN 30→70 · FIT ?
Reveals: WRM 👆 Ch10 ask about the old band photo · SEN 📖 Ch15 he sees your spreadsheet · GNR 📖 Ch4 the pay-packet
story.

**Appearances:** in code Ch4, Ch15, Ch16. Planned: Ch10 the band photo; Ch20 he comes to your first show (if you
took the trial year). **Topics:** career and dreams, lying (hiding the cut shifts), supporting parents, NS timing,
housing, money.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Hides the shift cut | 4 | 📖 | `saves-face` (revealed 👆 if you notice his early home time) |
| "Music is not a job" | 10 | 📖 | `dismisses-dreams` |
| You show him a plan, not an argument | 15 | 👆 | "One year. If your grades hold"; `dismisses-dreams` → growing |
| Comes to the show | 20 | 👆 | Family +10 |

**Neglect sensitivity: 0.** He won't say anything; the recap still notes long silences.
**Visual spec.** Square-soft face, rectangular glasses, short greying hair, light skin. Palette: steel blue, grey.
1. *Work:* polo with reflective vest. 2. *Home:* old tee, pyjama pants. 3. *Weekend:* checked short-sleeve shirt.
4. *Occasion:* long-sleeve dress shirt for results day and the show. Expressions: neutral, happy, angry, plus
planned *proud* and *quiet* (sad).

### 4.5 Ah Ma (`ama`) · grandmother · **new**

| | |
|---|---|
| Names | EN *Ah Ma* (Mdm. Lee Ah Lian) · zh *阿嬷* (李亚莲) |
| Age | 78 |
| Background | Chinese Singaporean, Hokkien-speaking, Mum's mother. Widowed; lives alone in a 2-room rental flat one block away; grows chillies in the corridor and line-dances at the CC. Takes a digital-skills class taught by Preet. Moves in after a fall in Ch16. |
| Role | The intergenerational voice; target of a scam; a lifelong learner at 78 |
| Personality | Sharp, funny, independent, stubborn, frugal, terrified of being a burden |
| Values | family +2, children +2, learning +1 (grows to +2), spend −2, gifts −2, home +1, lending −1, honesty +1, promises +2, conflict 0 |
| Flaw tags | `refuses-help` (Ch12) · `trusts-official-voices` (Ch19) · `worries-about-money` (Ch16) |

**First impression:** frail old lady who doesn't understand phones. **Hidden:** quick, funny and still learning; her
real fear is being a burden, which is why she hides falls and would rather send money to a "police officer" than
tell her daughter she's been scared.

**Radar:** INT 30→70 · WRM 70→85 · CMP 70→80 · GEN 60→55 · GNR 60→85 · SEN 50→70 · FIT ?
Reveals: INT 👆 Ch12 let her show you her class homework · GNR 📖 Ch12 the red packet she can't afford · SEN 📖 Ch16
the fall she hid.

**Appearances (all planned):** Ch4 Sunday visit (frugality, the "$15 drink" from her side); Ch12 CNY at her flat
(gifts, red packets, Preet introduced); Ch16 the fall, eldercare; Ch19 a government-impersonation scam call; Ch20
epilogue. **Topics:** eldercare, fraud, lifelong learning, supporting parents, gifts, money, children ("when got
baby?", answered kindly, not mocked).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Shows you her phone-class homework | 12 | 👆 | reveal INT; Family +5 |
| Hides a fall from Mum | 16 | 📖 | `refuses-help` revealed |
| You set up ScamShield and a "call me first" rule | 12 or 16 | 👆 | flag `amaShield` |
| "Officer Tan" calls: transfer $8,000 or be arrested | 19 | 📖 | `trusts-official-voices` revealed |
| With `amaShield`, she hangs up and calls you | 19 | 👆 (earlier choice) | flaw → resolved; Trust +10; recap names the Ch12/16 choice |
| Without it, she loses $2,000 before the bank freezes it | 19 | 📖 | no stat penalty and no blame on her; fact card on reporting and the bank hotline |

**Neglect sensitivity: 2.** If you never visit, she stops telling you when she's unwell (Trust drop) and Mum hears
it from a neighbour.
**Visual spec.** Tiny, round, big kind eyes behind thick glasses, white-grey short curly perm, light skin with
smile lines, a jade bangle. Palette: jade, lavender, white.
1. *Home:* floral samfu-style blouse, loose trousers, plastic slippers. 2. *CC class:* windbreaker, visor, a phone
in a pouch on a lanyard. 3. *Line dancing:* CC event tee, sneakers. 4. *Festive, CNY:* red cheongsam-style blouse,
jade bangle. Expressions: neutral, laughing, worried, stern, teary.

### 4.6 Uncle Ong (`ogawa`) · employer and mentor · existing

| | |
|---|---|
| Names | EN *Uncle Ong* / *Mr. Ong Boon Huat* · zh *王伯* / *王文发先生* |
| Age | 52 |
| Background | Chinese Singaporean. Owns the café where the player works part-time. Divorced; his daughter (22) barely speaks to him because he "worked through her childhood". Studying for an accounting diploma at night. Plays chess with regulars. |
| Role | `consumption` Think Deeper mentor; the cautionary and redemptive adult |
| Personality | Calm, proverb-heavy, generous with advice, avoids his own feelings |
| Values | learning +2, promises +2, spend −1, career −1, family 0 (grows), home +1, lending 0, honesty +1, conflict −1 |
| Flaw tags | `avoids-feelings` (Ch11) · `unasked-advice` (Ch4) · `workaholic-past` (Ch11) |

**First impression:** a wise, calm uncle who has life figured out. **Hidden:** his advice is what he wishes he'd
done; he regrets his marriage and is afraid to call his daughter.

**Radar:** INT 70→80 · WRM 70→70 · CMP 70→75 · GEN 75→70 · GNR 70→80 · SEN 40→75 · FIT ?
Reveals: SEN 👆 Ch11 ask about the photo by the till · GNR 📖 Ch10 he extends a struggling worker's pay advance.

**Appearances:** in code Ch4, Ch10, Ch11 (café). Planned: Ch15 he fails one module and retakes it; Ch20
`marriagecost` and the daughter's visit.
**Topics:** money and consumption, lifelong learning, betrayal (his business partner once cheated him), broken
promises (to his daughter), jealousy and control (Ch10 advice), housing.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Asks about the photo | 11 | 👆 | `avoids-feelings` revealed; Mentor +5 |
| Fails a module, retakes it | 15 | 📖 | shows failing is part of learning |
| You suggest one small message to his daughter | 11 or 15 | 👆 | flag `ongCalls` |
| Daughter visits the café | 20 | 📖 (needs `ongCalls`) | `avoids-feelings` → resolved |

**Neglect sensitivity: 0.** **Visual spec.** Round kind face, salt-and-pepper short hair, small moustache, light
skin. Palette: brown, cream, checks. 1. *Café:* check shirt, brown apron. 2. *Night class:* polo, backpack,
reading glasses. 3. *Morning:* tracksuit for qigong in the park. 4. *Occasion:* batik shirt (the daughter's visit).
Expressions: neutral, happy, sad, angry, plus planned *thoughtful*.

### 4.7 Ms. Farah Aziz (`farah`) · teacher and mentor · existing

| | |
|---|---|
| Names | EN *Ms. Farah* / *Ms. Farah Aziz* · zh *法拉老师* / *法拉·阿兹老师* |
| Age | 34 |
| Background | Malay Singaporean. General Paper teacher and debate coach. Mother of a two-year-old. Failed GP herself at JC and retook it. Wears a hijab. |
| Role | `genderwar` and `careerpressure` mentor; asks, never preaches |
| Personality | Curious, firm, funny, over-prepared, takes students' setbacks personally |
| Values | learning +2, conflict +1, honesty +2, children +1, childEdu −1, career 0, family +1, promises +1 |
| Flaw tags | `over-prepares` (Ch5) · `can't-switch-off` (Ch14) · `takes-it-personally` (Ch14) |

**First impression:** strict teacher who confiscates phones. **Hidden:** she failed once herself, marks at midnight
with a toddler asleep on her, and will drop everything for a student who asks.

**Radar:** INT 85→90 · WRM 40→80 · CMP 55→85 · GEN 45→75 · GNR 50→70 · SEN 40→70 · FIT ?
Reveals: WRM 📖 Ch5 camp night talk · SEN 👆 Ch14 stay after class and ask how she's doing.

**Appearances:** in code Ch5 (camp). Planned: Ch1 GP class, Ch9 `genderwar` card, Ch14 `careerpressure` and prelims,
Ch10 Preet's debate final. **Topics:** education, lifelong learning ("I failed GP"), career pressure, gender-war
content, children (working mother).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| "I failed GP once" | 5 | 📖 | reveal WRM |
| Prelims: a student collapses | 14 | 📖 | `takes-it-personally` |
| You ask her for help early instead of hiding marks | 14 | 👆 | Mentor +8; Trust +5 |

**Neglect sensitivity: 0.** **Visual spec.** Oval gentle face, warm brown eyes, light-blue hijab, light-brown skin.
Palette: sky blue, white, grey. 1. *School:* long-sleeve blouse, long skirt, lanyard. 2. *Camp:* long-sleeve dri-fit
tee, track pants, sports hijab, cap. 3. *Weekend marking:* cardigan, tote of scripts, coffee. 4. *Festive, Hari
Raya:* pastel blue baju kurung. Expressions: neutral, happy, angry, plus planned *concerned* and *laughing*.

### 4.8 Nurse Tan (`nurse`) · health nurse · existing, promoted

| | |
|---|---|
| Names | EN *Nurse Tan* (Tan Hui Min) · zh *陈护士* |
| Age | 41 |
| Background | Chinese Singaporean. School health nurse in Parts I–III, polyclinic nurse in Part V. Studying part-time for an advanced-practice nursing master's. Single mother of a 14-year-old son. |
| Role | Facts with a face: sexual health (Ch13, Ch18), first aid, burnout; Hanis's mentor |
| Personality | Blunt, unflappable, impatient with myths, kind without fuss |
| Values | learning +2, honesty +2, children +1, career +1, conflict +1, spend −1, family +1, promises +1 |
| Flaw tags | `blunt` (Ch13) · `overworked` (Ch18) |

**First impression:** strict, scary, "she'll tell my mum". **Hidden:** confidential, funny, and the reason Hanis
wants to be a nurse.

**Radar:** INT 80→85 · WRM 35→70 · CMP 60→85 · GEN 40→65 · GNR 50→65 · SEN 40→60 · FIT ?
Reveals: WRM 👆 Ch13 ask a real question without joking · CMP 📖 Ch14 Hanis's burnout.

**Appearances:** in code Ch13 (health room), Ch18 (polyclinic). Planned: Ch5 camp first aid (Hanis's ankle), Ch14
burnout, Ch15 Hanis's nursing reference. **Topics:** consent and sexual health, care work, lifelong learning, career
(nursing), children (single parenting).

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Health class: "Ask anything; I've heard worse" | 13 | 📖 | reveals her as safe |
| You bring Haziq to the polyclinic | 18 | 👆 | Trust +5; Haziq's myth arc closes |
| Writes Hanis's reference | 15 | 👆 (Hanis route or Hanis Trust ≥ 50) | Mentor +5 |

**Neglect sensitivity: 0.** **Visual spec.** Soft square face, short black bob, small glasses on a chain, light
skin. Palette: white, pale blue, navy. 1. *School health room:* light-blue nurse top, navy trousers, lanyard. 2.
*Polyclinic:* white uniform with name tag. 3. *Camp:* first-aid vest over a tee. Expressions: neutral, plus planned
*smile*, *stern*, *concerned*.

### 4.9 Joy Santos (`joy`) · caregiver · existing (no lines yet)

| | |
|---|---|
| Names | EN *Joy* / *Joy Santos* · zh *乔伊* / *乔伊·桑托斯* |
| Age | 38 |
| Background | Filipino, from Iloilo. Migrant domestic worker in Xin Yi's household, mainly caring for Xin Yi's grandmother. Two children (12 and 9) raised by her sister back home. Sends most of her pay home. Takes a Sunday caregiving and small-business course; plans a bakery in Iloilo. |
| Role | Care work seen from the inside; the adult who notices Xin Yi first |
| Personality | Cheerful, observant, practical, homesick in private, can't say no |
| Values | family +2, children +2, learning +2, spend −2, lending −1, honesty +2, promises +2, home +1, friends +1, conflict −1 |
| Flaw tags | `puts-everyone-first` (Ch12) · `can't-say-no` (Ch16) · `hides-homesickness` (Ch18) |

**First impression:** the player barely sees her ("Xin Yi's family's helper"). **Hidden:** a full person with plans,
a course and a sharp read on everyone in that flat; she has seen friends drown in agency-loan debt, which is why her
lending rule is firm.

**Radar:** INT 40→75 · WRM 70→85 · CMP 70→90 · GEN 70→80 · GNR 70→75 · SEN 50→80 · FIT ?
Reveals: INT 👆 Ch12 ask about her Sunday course · SEN 📖 Ch14 she tells you Xin Yi hasn't slept · CMP 📖 Ch16.

**Appearances (all planned; sprite exists):** Ch2 or Ch9 Xin Yi route variants at the flat; Ch12 CNY at Xin Yi's;
Ch14 she flags Xin Yi's stress; Ch16 the lending talk (agency debt) and the `eldercare` card (care-work lens); Ch18
children (raising kids from afar). **Topics:** supporting parents, children, lending and debt, lifelong learning,
care work, refusal.
**Respect rules:** never a joke, never servile framing, never pitied; she has a day off and her own life on screen.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Talks about her course | 12 | 👆 | reveal INT; Friendship +5 |
| "Xin Yi hasn't slept" | 14 | 📖 | the player can act on it |
| Warns about agency loans | 16 | 📖 | lending fact card |
| Her video call with her kids | 18 | 👆 if you ask about them | `hides-homesickness` → growing |

**Neglect sensitivity: 0.** **Visual spec.** Soft round face, bright dark eyes, long dark hair in a low ponytail,
warm brown skin. Palette: coral pink, white, denim. 1. *Work:* coral polo tee, jeans, hair tied. 2. *Sunday off:*
floral sundress with a denim jacket, crossbody bag. 3. *Course:* cardigan, notebook. 4. *Festive, Christmas:* red
blouse, a parol star lantern in hand. Expressions: neutral, sad, plus planned *happy*, *worried*.

### 4.10 Marcus Tan (`takumi`) · rival · existing

| | |
|---|---|
| Names | EN *Marcus* / *Marcus Tan* · zh *马克斯* / *陈马克斯* |
| Age | 17 at Ch1 |
| Background | Chinese Singaporean. Student-council president. His father is a senior partner at a law firm and expects a scholarship. |
| Role | The "perfect guy" everyone admires; the polished mask |
| Personality | Charming, confident, image-conscious, avoids hard work out of sight, gives bad "bro" advice |
| Values | career +2, friends +2, spend +1, childEdu +2, honesty −1, promises −2, conflict −1, learning 0 |
| Flaw tags | `credit-taker` (Ch6) · `saves-face` (Ch6) · `flaky` (Ch9) · `copies` (Ch14) |

**First impression:** the guy everyone wants to be. **Hidden:** terrified of disappointing his father, behind on
everything, and lonely in a crowd of followers.

**Radar:** INT 80→70 · WRM 70→45 · CMP 50→55 · GEN 60→55 · GNR 65→50 · SEN 30→70 · FIT ?
Reveals: WRM, GNR 📖 6-x he takes credit for the booth · SEN 👆 Ch14 find him alone after prelims.

**Appearances:** in code Ch5, Ch6, Ch9 (classroom, carnival). Planned: Ch14 the copied project; Ch15 he misses the
scholarship and is okay. **Topics:** betrayal (credit theft), lying, broken promises, career pressure, child education
(his father's), greed for status.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| "Be mysterious, bro" | 5 | 📖 | bad advice; flaw hidden |
| Takes credit for your booth work | 6 | 📖 | `credit-taker` |
| You decline to cover his shift | 6 | 👆 | Trust +3 (respect), no drama |
| Copied project found | 14 | 📖 | `copies` revealed |
| You urge him to come clean rather than cover for him | 14 | 👆 | he confesses; CMP +8; `saves-face` → growing |
| Misses the scholarship and says "I'm relieved" | 15 | 📖 (if he came clean) | SEN shown |

**Neglect sensitivity: 0.** **Visual spec.** Oval face, neat side-part black hair, confident eyes, light skin.
Palette: navy, silver, white. 1. *Uniform:* shirt with a student-council badge. 2. *Council event:* council polo,
lanyard, clipboard. 3. *Casual:* polo, chinos, loafers. 4. *Occasion, Racial Harmony Day:* mandarin-collar shirt.
Expressions: neutral, smug, plus planned *panic* and *relieved*.

### 4.11 Ryan Teo (`ren`) · classmate, then NS section mate · existing

| | |
|---|---|
| Names | EN *Ryan* / *Ryan Teo* · zh *瑞安* / *张瑞安* |
| Age | 16 at Ch1 |
| Background | Chinese Singaporean father, Irish mother who moved back to Cork after the divorce. Citizen; lives with his father, who is rarely home. Skips his mum's birthday call in Ch16 and finally rings her in Ch19 (with her: "Grand, Mam, yeah" / zh "挺好的，妈。"). Pays his own phone bill and spends to fit in. Same NS unit as the player and Haziq. |
| Role | The friend who "rates the girls" and later borrows money; a debt arc that ends in asking for help |
| Personality | Stylish, quick, crude jokes to fill silence, generous when flush, avoids his own feelings |
| Values | spend +2, friends +2, gifts +1, lending +1 (as a borrower), learning −1, honesty −1, promises −1, conflict −1 |
| Flaw tags | `crude-jokes` (Ch9, Ch12) · `borrows-never-repays` (Ch16) · `image-obsessed` (Ch12) · `peer-pressure` (Ch17) |

**First impression:** stylish, confident, has it together. **Hidden:** in debt, lonely, and copying the only version
of manhood he's been shown.

**Radar:** INT 55→60 · WRM 60→55 · CMP 35→55 · GEN 40→45 · GNR 70→50 · SEN 25→65 · FIT ?
Reveals: GNR 📖 Ch16 the loans · SEN 👆 Ch19 "maybe I should actually talk to someone".

**Appearances:** in code Ch5, Ch9, Ch12 (classroom: "rate the girls", "how far already"), Ch16, Ch17, Ch19 (NS,
chalet, VIP matchmaking deposit). **Topics:** lending and debt, gossip and objectifying talk, peer pressure, fraud
(VIP matchmaking), greed for status, broken promises.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| "Rate lah. Out of ten." | 12 | 📖 | `crude-jokes` |
| You shut it down without humiliating him | 12 | 👆 | he stops; Trust +3; logged as gossip blocked |
| Borrows $600 then $200 | 16–17 | 📖 | `borrows-never-repays` |
| You lend with a written plan, or refuse kindly | 16 | 👆 | both valid; recap explains each |
| VIP matchmaking $300 deposit | 19 | 📖 | fraud fact card |
| "I don't need another debt" → Credit Counselling | 19 | 👆 if you suggested it | flaw → growing |

**Neglect sensitivity: 1.** He is the NS chat's main gossip node; going cold on him spreads fast.
**Visual spec.** Angular-soft face, wavy chestnut-auburn hair, hazel-green eyes, faint freckles, a stud earring, fair skin (v4 redraw). Palette:
beige, black, gold. 1. *Uniform:* sleeves rolled, tie loose. 2. *Streetwear:* oversized cream jacket, chain, cargo
pants. 3. *NS:* generic green field uniform. 4. *Chalet:* Hawaiian shirt, shorts. Expressions: neutral, sad, plus
planned *smirk* and *ashamed*.

### 4.12 Sam de Vries (`saki`) · friend of friends · existing, re-backgrounded

| | |
|---|---|
| Names | EN *Sam* / *Sam de Vries* (Samantha) · zh *萨姆* / *萨姆·德弗里斯* |
| Age | 19 at Ch17 |
| Background | Dutch; moved to Singapore at 9 (dad in port logistics), Singapore PR, "Singaporean with a Dutch passport". Dutch directness ("Ja, no." / zh "嗯，不。", "Gezellig!"). Polytechnic graduate working as a junior stage manager for an events company. Usually the one who doesn't drink. |
| Role | The friend the player protects in Ch17; later the one who opens a door for his music |
| Personality | Organised, warm, people-pleasing with seniors, funny on headset |
| Values | friends +2, career +1, learning +1, conflict +1, spend 0, honesty +1, promises +2 |
| Flaw tags | `people-pleaser` (Ch17) · `trusts-too-fast` (Ch17) |

**First impression:** "the party girl". **Hidden:** a stage manager who normally runs the night sober; she drank to
keep up with seniors once. The game never blames her and never frames her as a reward.

**Radar:** INT 50→70 · WRM 70→80 · CMP 55→75 · GEN 55→70 · GNR 55→70 · SEN 40→65 · FIT ?
Reveals: INT, GEN 📖 Ch19 you see her run a show · SEN 👆 Ch17 morning: ask how she is without lecturing.

**Appearances:** in code Ch17 (chalet) and Ch20 (`20-open-mic`: she and Ollie give you the last slot). Planned: Ch19
she asks you to help at a gig, and leads a drink-safety talk for her crew. The Ch17 incident is about peer pressure
from seniors, never about nationality.
**Topics:** consent and bystander action, friendship, refusal, career, peer pressure.

| Arc beat | Ch | Kind | Change |
|---|---|---|---|
| Too drunk; the player keeps her safe | 17 | 📖 + 👆 | Trust +10 if you get her friend and water, never "take her home" |
| Morning after: she sets her own limit | 17 | 📖 | `people-pleaser` → growing |
| Open-mic slot | 20 | 👆 (earlier help, no strings) | Friendship +8 |

**Neglect sensitivity: 0.** **Visual spec.** Soft round face, straight blonde chin-length bob, blue-grey eyes, fair
skin (v4 redraw). Palette: black, mustard, denim. 1. *Chalet casual:* mustard tee, denim shorts. 2. *Show crew:* all-black
crew tee, cargo pants, headset, gaffer tape on her belt. 3. *Occasion:* simple black jumpsuit. Expressions:
neutral, sad, plus planned *happy*, *focused*.

### 4.13 Ava Mitchell (`ava`) · heroine #9 · new (v4)

American expat transfer student (Austin, Texas; fifth country), marine-biology and photography nerd. Casual,
upbeat, asks before she hugs. Flaws: `one-foot-out` (leaves before she can be left), `blunt-without-context`,
`allowance-bubble`, `fixes-not-listens`. Neglect 2. Route beats in Ch1, Ch4, Ch6, Ch8 (the "are we dating?" talk
and the dating-norms think card), Ch9 (bill system), Ch10 (study plan), Ch11 (money fight), Ch12 (Friendsgiving),
Ch13, Ch14 (Seattle move; Ollie's long-distance story; stay or end it properly), Ch15, Ch16, Ch19 (too-cheap
flight). Endings: `true_ava` *Two Time Zones*, `normal_ava`, `kind_goodbye_ava` *See You Around*. Full spec:
CAST_INTERNATIONAL.md §2.

### 4.14 Inès Diallo (`ines`) · debate rival, then friend · new (v4)

Senegalese-Breton, from Lyon; French international school. Articulate, dry, keeps "En fait", "Voilà", "Bof" in
both languages. Flaws: `contrarian`, `cutting-wit`, `superior-defence`, `wont-admit-homesick`. Neglect 1. Beats:
Ch6 debate booth, Ch8 think card, Ch10 debate final (apology to Preet), Ch12 Christmas Eve, Ch13 peer-education
fair, Ch20 notes to Preet. Full spec: CAST_INTERNATIONAL.md §3.1.

### 4.15 Mateo Tan Rojas (`mateo`) · futsal friend, NS buddy · new (v4)

Colombian mother, Chinese Singaporean father (a ship's officer); grew up in Medellín. Lively, physical, "¡Hermano!".
Flaws: `over-promises`, `hugs-first-asks-later`, `jokes-past-pain`, `sends-too-much-home`. Neglect 2. Beats: Ch4 void-deck
futsal (asking before a hug), Ch6, Ch12 novena and ancestor altar, Ch16 allowance home, Ch17 designated hermano,
Ch19 fake embassy call, Ch20 arepas with Ah Ma. Full spec: CAST_INTERNATIONAL.md §3.2.

### 4.16 Ollie Bennett (`ollie`) · passion mentor · new (v4)

26, from Leeds; sound engineer, community-club guitar teacher, Thursday Open Night host at Uncle Ong's café.
British understatement ("Not bad, that." / zh "还不赖。"). Flaws: `understates-everything`, `cant-ask-for-help`,
`jokes-to-avoid-conflict`, `too-polite-to-check`. Neglect 0. **Adult mentor only: always in public or group settings,
never romantic, never alone with the player.** Beats: Ch4 Open Night, Ch10 debate sound desk, Ch14 long-distance
story, Ch19 rental-deposit scam (with Rae), Ch20 open mic. Full spec: CAST_INTERNATIONAL.md §3.3.

---

## 5. Systems (for engine developers)

### 5.1 Radar axes

| Key | Axis | Meaning (descriptive, never "better") |
|---|---|---|
| `intellect` | Intellect | How she reasons, plans and learns, not grades |
| `warmth` | Warmth | How openly she shows affection and welcome |
| `compassion` | Compassion | How much she acts on other people's pain, including strangers' |
| `gentleness` | Gentleness | How softly she handles conflict and mistakes (low = blunt or hot-tempered) |
| `generosity` | Generosity | How much she gives time, money and help (very high can mean "gets used") |
| `sensitivity` | Sensitivity | How much she notices moods, and how easily she is hurt |
| `fit` | Values-fit | Computed overlap between her values and the player's stated values (§5.2) |

All values are 0–100. Each of the 24 has a `first` (first-impression) and a `true` value for the six authored axes.
There is **no appearance axis**.

### 5.2 Values-fit

- The engine already stores `S.values[axis]` on −2..+2 (`js/engine.js`, 13 axes). Add `S.valuesSet`, a set of the
  axes the player has actually taken a stance on (written by the same `applyVal` path).
- Preference axes: `spend, gifts, family, career, children, childEdu, learning, friends, lending, conflict, home`.
  Integrity axes (`honesty`, `promises`) are not distance-based; see below.

```js
function valuesFit(id) {
  const c = CAST[id], st = S.cast[id];
  const axes = PREF_AXES.filter(a => S.valuesSet.has(a) && c.values[a] !== undefined);
  if (axes.length < 2) return null;                       // UI shows "?"
  const gap = axes.reduce((n, a) => n + Math.abs(c.values[a] - S.values[a]), 0) / axes.length; // 0..4
  let fit = Math.round(100 - 25 * gap);
  // Integrity: people who hold honesty or promises at +2 react to how the player has treated THEM.
  if ((c.values.honesty | 0) >= 2 || (c.values.promises | 0) >= 2)
    fit += Math.min(15, 5 * st.honestHard) - Math.min(30, 10 * st.liesTo);
  return Math.max(0, Math.min(100, fit));
}
```

- Fit is shown only after `fitSeen` is set (the first partner talk with her, or an authored `reveal`). Before
  that the radar shows "?" and stores 50 internally.
- Low fit never blocks a route or lowers Affection; it changes which partner-talk lines play (VALUE_PROFILES §4).

### 5.3 Hidden attributes, first impressions and reveals

- Each axis has `seen: false` at the start. The radar draws two polygons: a **dashed first-impression** polygon
  (`first`), and a **solid observed** polygon over the axes that have been revealed. An unrevealed axis shows "?" next to
  its estimate.
- **Rose Filter link (heroines only):** the dashed polygon is drawn as
  `first[a] + round(S.stats.proj / 4)` on `warmth`, `gentleness` and `generosity` (capped at 100). When
  `S.stats.proj > 60`, `reveal` commands targeting a heroine are queued instead of applied, with the recap line "You
  couldn't see her clearly this time." They apply when the filter drops to 60 or below. This mirrors the existing
  rule that hides some options above 60.
- Reveal sources: (a) story beats (`kind: 'story'`), (b) ✅ observation or asking choices (`kind: 'choice'`),
  (c) partner talks (reveal `fit`). The per-character "Reveal / Trigger" tables in §3–4 are the authoring list.
- Reveals never change the true value. Growth changes it (`grow`), and does so modestly: ±3 to ±10 per beat, at
  most +20 total per axis per character.

### 5.4 Neglect

- Every character has `neglect` 0–3 (listed in §3–4) and an `avail` list of chapters they appear in.
- **Contact:** a choice that raises their Affection or Trust, an explicit `{contact:'id'}`, or a ✅ choice in a scene
  they speak in.
- At chapter end, for each character where the chapter is in `avail`, Affection ≥ 20 (family: always) and there
  was no contact, add 1 to `missed`. Contact resets `missed` to 0.

| Sensitivity | Grace (missed chapters before the fuse lights) | When the fuse lights | Next chapter, still no contact |
|---|---|---|---|
| 0 | never | — | recap note only |
| 1 | 3 | Trust −3, recap warning | Trust −5 |
| 2 | 2 | Trust −5, recap warning | Trust −8, gossip seed |
| 3 | 1 | Trust −5, recap warning | Trust −10, gossip seed |

- A lit fuse shows a small fuse icon on her card. **Defuse:** any contact, or an authored repair line from the
  `repair.<id>` variant pool (generic fallback required; §5.9). An honest repair ("I've been absent, that's on me")
  gives Trust +3 more than a plain one.
- After the route locks (Ch8), sensitivity for non-route heroines drops by 1: they're friends now, not waiting.
- Neglect never closes a route on its own. Its only lever is Trust, which already drives the existing Ch14-5 split
  branch (Trust < 30).

### 5.5 Juggling and gossip

- Options can carry `sig: 'romance:<id>'` (flirting, date-like invitations, "only you" texts) and
  `clarity: '<id>'` (honestly telling her where things stand).
- **Before route lock:** if a chapter contains romance signals to two or more heroines and any of them lacks a
  `clarity` that chapter, raise a **juggle** event (this generalises the existing 6-3 fish-pond check). Each
  heroine involved: Trust −4. Gossip seeded in the circles of everyone involved.
- **After route lock:** a romance signal to anyone except `S.route` is **two-timing**: route Trust −15, gossip
  seeded in the partner's circles, and judgement `player.twotiming` logged by her. A `clarity` option is always
  offered alongside (no trap choices).
- **Circles:** `school` (JC classmates, Marcus, Ryan, Preet, Haziq, Ms. Farah), `estate` (Hanis, Chloe, Ah Ma,
  Mum, the void-deck aunties), `online` (Elise's fan Discord), `ns` (Ryan, Haziq, the player), `family` (Mum, Dad,
  Mei, Ah Ma), `art` (Natalie, Sam).
- **Spread:** deterministic, one hop per chapter. A rumour reaches everyone in its origin circle at the next chapter
  end, then adjacent circles (people in two circles bridge them). A heroine who hears it: Trust −5, unless she already
  had `clarity` from the player that chapter.
- **Blockers:** Preet never forwards gossip. A player who has shut gossip down (3-3, 9-3, 12 Ryan, 17-5) earns
  `trustedIn[circle]`, which halves gossip Trust loss in that circle.
- **Content rule:** gossip is only ever about **the player's behaviour** (juggling, going cold, broken promises).
  It is never about a woman's body, sexuality or reputation, and it never slut-shames.

### 5.6 Chapter recap ("What changed")

- Every write to Affection, Trust, radar, flaw state, judgement, fuse or gossip appends a change event:

```js
S.changes.push({ ch, who, field, delta, kind, reason, src });
// field: 'aff' | 'trust' | 'radar.<axis>' | 'reveal.<axis>' | 'flaw.<tag>' | 'judge.<id>' | 'fuse' | 'gossip'
// kind:  'story' | 'choice'   (auto-set: inside a choice option's fx/then = 'choice', otherwise 'story')
// reason: i18n key, e.g. 'recap.hina.promises'   src: interaction id, e.g. '6-1'
```

- After the chapter's `done`, before the results screen, Mochi presents **What changed**: grouped by person, with
  their portrait, a before/after radar (old polygon ghosted), bar deltas, newly seen flaw tags and judgements.
  Each row has a 📖 or 👆 icon, the reason sentence and the interaction id ("👆 6-1 You owned the broken promise.
  Hanis: Trust +5").
- At most 8 rows show by default (largest absolute deltas first, reveals always shown); "Show all" expands.
  A footer lists lit fuses and gossip in flight.
- Delayed payoffs name the earlier choice ("👆 12-4 You set up ScamShield with Ah Ma. She hung up on 'Officer Tan'.").
- `S.changes` is archived per chapter in `S.recaps[ch]` for the end-of-game review.

### 5.7 Judgement log

- `{judge:{who, id, verdict}}` with `verdict: 'fair' | 'unfair' | 'partly'`. Text lives in `js/data/judgements.js`
  (en + zh). Each character has 2–3 authored judgements (listed in §3–4).
- When a later reveal contradicts an `unfair` judgement, the engine strikes it through and logs a `judge.<id>`
  change: "You thought she only cared about money. Then you saw the tab." This is the timeline view on each
  character's profile page: a vertical list of chapters with judgements, reveals and arc beats.

### 5.8 Data model

```js
// js/data/cast.js: authored, static
window.CAST = {
  hina: {
    heroine: true, route: true,            // rei: heroine true, route false; nana: route 'late'
    rel: 'romance',                        // 'romance' | 'bond' | 'friend' | 'family' | 'mentor' (bar label)
    circles: ['estate', 'school'],
    neglect: 3, avail: [1,2,3,5,6,9,10,11,12,13,14,15,16,17,18,19,20],
    first: { intellect:55, warmth:80, compassion:70, gentleness:60, generosity:70, sensitivity:40 },
    radar: { intellect:72, warmth:85, compassion:88, gentleness:55, generosity:75, sensitivity:80 },
    values: { family:2, conflict:2, honesty:2, promises:2, children:1, learning:1, lending:1, home:1,
              spend:-1, gifts:-1, career:-1, childEdu:-1, friends:-1 },
    flaws: ['hot-tempered', 'stubborn', 'yes-at-home', 'teases-to-hide'],
    outfits: ['uniform', 'casual', 'cca', 'festive'],
  },
  // ...one entry per character in §3–4
};

// Save state
S.cast[id] = {
  aff,                 // ids already in S.stats (hina, mio, kaede, yuna, rei, kenta): alias of S.stats[id]; others: own value 0..100
  trust,               // 0..100, starts 20 (family 40, mentors 30)
  radar: {...},        // current true values (copied from CAST, then grown)
  seen: { intellect:false, ..., fit:false },
  flaws: { 'hot-tempered': 'hidden' | 'seen' | 'growing' | 'resolved' },
  judgements: [{ ch, id, verdict, struck:false }],
  missed: 0, fuse: false, honestHard: 0, liesTo: 0,
};
S.valuesSet = new Set(); S.gossip = []; S.trustedIn = {}; S.changes = []; S.recaps = {};
```

**Script commands (new):**

| Command | Effect |
|---|---|
| `{reveal:'hina.sensitivity', why}` or `{reveal:{hina:['sensitivity','compassion']}, why}` | marks axes seen |
| `{grow:{hina:{gentleness:+6}}, why}` | changes the true value |
| `{flaw:{hina:{'yes-at-home':'growing'}}, why}` | flaw state |
| `{judge:{who:'chloe', id:'chloe.onlymoney', verdict:'unfair'}}` | judgement log |
| `{contact:'ama'}` | counts as contact |
| option keys `sig`, `clarity`, `lieTo:'id'`, `honestHard:'id'` | juggling and integrity counters |
| fx keys `'trust.<id>': n`, `'aff.<id>': n` | bars for any character (existing `{hina:n}` stays as Affection) |
| `{s:'hina', e:'happy', o:'festive'}` or `{outfit:{hina:'festive'}}` | outfit (sticky for the scene) |

### 5.9 Validation (add to `tests/`)

- Every `CAST` entry has all six axes in `first` and `radar`, at least 4 `values`, 2+ flaws, 3+ outfits, `neglect`
  0–3, and en + zh names.
- Every `why`, judgement and recap key exists in both `en-SG` and `zh-SG`.
- Every `reveal` and `grow` targets a valid id and axis; total growth per axis ≤ +20.
- Every character with `neglect ≥ 1` has a `repair.<id>` pool or uses the generic one.
- Replaying any choice path twice gives identical `S.changes` (determinism; no `Math.random` in neglect or gossip).
- No string in a gossip pool mentions bodies or sexuality (keyword lint plus a review checklist).

### 5.10 Migration from the current engine

- `HEROINES` becomes `['hina','mio','kaede','yuna','chloe','preet']` for route checks; `rei` (bond) and `nana`
  (late route) get bars and the profile page but are excluded from the Ch8 route lock.
- `S.stats[id]` stays the Affection value for every id it already holds (the four heroines, `rei`, `kenta`), so existing endings keep working; `chloe` and `preet` are added to `S.stats`. `S.stats.trust` stays the
  route trust; on route lock it is set from `S.cast[route].trust`, and later writes go to both.
- Rae's existing "???" Connection display becomes the general unrevealed-axis rendering.
- Old saves: build `S.cast` from `CAST` defaults on load; mark axes revealed by chapters already completed.

## 6. Art direction (v3 sprite pass)

**Style.** Cuter kawaii: big expressive eyes with two highlights, round faces and soft jawlines, small noses,
slightly larger heads (about 1:5.5 waist-up framing), soft cel shading with a pastel rim light, warm lineart. It
replaces the current sharper v2 faces but keeps each character's hair, eye colour, palette and silhouette.
**Skin.** One shared soft anime skin shader for everyone, applied to each character's own tone (listed per
character). Never lighten, never desaturate darker tones, never swap features. Blush uses the same treatment on
every tone.
**Modesty.** Everyone is dressed age-appropriately. No low necklines, no short-skirt angles, no fan-service poses,
no swimwear sprites (beach scenes use rash guards and shorts). Romance art goes no further than a hug.
**Accuracy.** Festive and faith dress (baju kurung, baju melayu, songkok, hijab, half-saree, salwar kameez, kebaya,
qipao-style tops, kara) is drawn correctly and with respect. No real school crests, brands, stall names or
military insignia.

**Files.** `assets/chars/<id>_<outfit>_<expr>.webp`, 800×1200 transparent (rembg isnet-anime pass). The current
files are the `uniform` (or default) outfit, so `<id>_<expr>.webp` stays valid as a fallback.
`js/sprites.js` gains `outfits: { <id>: { <outfit>: [exprs] } }`. Fallback order: requested outfit + expression →
the outfit's neutral → default outfit + expression → default neutral.

**Budget and priority.**

| Tier | Who | Outfits × expressions | Images |
|---|---|---|---|
| 1 | 6 route heroines | 4 × 5 | 120 |
| 2 | Rae, Natalie | 4 × 4 | 32 |
| 3 | Haziq, Mei, Mum, Dad, Ah Ma | 4 × 3 | 60 |
| 4 | Uncle Ong, Ms. Farah, Nurse Tan, Joy, Marcus, Ryan, Sam | 3 × 3 | 63 |
| | | **Total** | **≈ 275** |

Generate tier 1 first (the new kawaii style is locked on Hanis, then applied to everyone), and do Chloe and Preet
before the other heroines' extra outfits, since they have no art at all.

## 7. Implementation checklist and continuity notes

1. Add `js/data/cast.js` (from §3–4) and the `S.cast` state with migration (§5.10).
2. Radar component on the character profile page plus the recap screen (§5.6).
3. Neglect, juggling and gossip at chapter end (§5.4–5.5), behind a settings toggle for the first release.
4. Author the planned beats, in this order: Chloe (Ch4, 6, 9, 10, 12, 15, 16, 19, 20), Preet (Ch1, 3, 5, 6, 9, 10,
   12, 13, 15, 16, 18), Ah Ma (Ch4, 12, 16, 19, 20), Joy (Ch12, 14, 16, 18), Natalie (Ch18–20).
5. Route additions for `chloe` and `preet`: confession flags (`chloeMet`, `preetMet`; Affection ≥ 30), Ch9 date
   variants, Ch10 male friends (Darren, Ethan), Ch10-5 wins, Ch15-1 dreams, endings `true_chloe` and `true_preet`,
   VALUE_PROFILES §3 entries and partner-talk lines (generic fallbacks work until then).
6. Update CHAPTERS.md, VALUE_PROFILES.md and GAME_DESIGN §4 to point to this bible.

**Status (Nov 2026):** items 1–6 are implemented (`js/data/cast.js`, `js/cast-sim.js`, `js/data/judgements.js`, the Cast
tab and profile in `js/engine.js`; tests in `tests/validate.js`, `tests/softlock.js` and `tests/playthrough.js`).

**Continuity notes (found while writing; marked where fixed):**
- (Fixed) `js/data/think.js`, card `children`: the hook gave Mei a baby, which contradicts her Ch15 internship. Proposed
  text is in §1.2.
- (Fixed) Haziq's surname: `Muhammad Haziq` (i18n) versus `Haziq Ismail` (GAME_DESIGN §4). Use `Muhammad Haziq bin Ismail`.
- Marcus and Ryan speak as JC classmates in `ch5`, `ch9` and `ch12`, but GAME_DESIGN introduces Ryan only in NS.
  This bible follows the code: both are JC classmates, and Ryan is also in the player's NS unit.
- (Fixed) `joy` had a sprite but no lines; her beats are now in Ch12, 14, 16 and 18.
- (Fixed) Art prompts listed Hanis as "17yo" and Kavya as "18yo"; this bible sets 16 and 17 at Ch1 (they age through the
  story). The prompts should say "late teens" and be checked per Part.
