# Value Profiles, Partner Talks & Variant Pools

Design for (1) partner conversations on everyday values with genuinely conflicting viewpoints, (2) a distinct value
profile for every heroine and supporting character, and (3) the data-driven **variant system** that picks dialogue
by character values + player state. **No live AI at runtime:** every line is authored; the engine only *selects*
among authored variants with deterministic rules (ARCHITECTURE §9). Status: designed, not yet coded.

Content limits apply to every line here: non-explicit, attitude- and education-focused, visuals at most a hug
(GAME_DESIGN §3); behaviours, not genders (CORE_VALUES §2).

---

## 1. Why value profiles

Real couples rarely fight about villains. They disagree about money, family, children, honesty and time. The game
should let the player practise *disagreeing well*: say what you think, ask what she thinks, look for a workable
deal, and recognise when a difference is a dealbreaker. Two rules keep this honest:

1. **Preference topics have no correct stance.** Saving vs. enjoying, kids vs. no kids, living near parents or not:
   any stance is valid. What is graded is the *process* (honesty, curiosity, respect, keeping your own view).
2. **Integrity topics have a floor.** Lying, deception, greed, broken promises, fraud and betrayal are not a matter
   of taste. Here the stance itself is graded: honesty, keeping promises and refusing fraud are always the best outcome.

The healthy outcome of a talk is **one of**: an honest compromise, an agreed "we see this differently and that's
fine", or a kindly named dealbreaker (which can lead to the `kind_goodbye` ending — still a good ending).
Caving (dropping your own view to keep her happy) and contempt (mocking hers) are the two mistakes.

## 2. Value axes

Each axis is an integer **−2 … +2**. Neither end is "good"; the labels describe a direction.

| Axis id | −2 end | +2 end | Topic kind |
|---|---|---|---|
| `spend` | Saver: "Future me will thank me" | Spender: "You only live once" | preference |
| `gifts` | Experiences / handmade | Price and brand show care | preference |
| `family` | Independent from parents | Family first: filial piety, living close, supporting and caring for parents | preference |
| `career` | Security: stable job, steady pay | Ambition: risky dream, high ceiling (both sides feel career pressure from family and grades) | preference |
| `children` | No children / unsure | Wants children, earlier | preference |
| `childEdu` | Free play, low pressure | Structured, achievement-focused | preference |
| `learning` | Done once school ends | Lifelong learner | preference |
| `friends` | A few close friends | A wide circle | preference |
| `lending` | Never lend money | Helps freely | preference with a floor (never beyond your means) |
| `conflict` | Needs space before talking | Talk it out right now | preference (style) |
| `honesty` | Tactful: white lies are kind | Blunt: no lies, ever | integrity floor: no deception that harms |
| `promises` | Plans are flexible | A promise is a contract | integrity floor: don't break promises silently |
| `home` *(new)* | No rush: rent, study abroad or stay with parents until ready | Plan early: apply for a BTO flat young, near the parents | preference (also money: CPF for housing, marriage costs) |

Singapore life-stage topics map onto these axes: filial piety → `family`; career pressure → `career`; BTO, CPF
for housing and marriage costs → `home` + `spend`; NS timing → `career` + `learning`. The Think Deeper cards
(GAME_DESIGN §6.2) add structural context to the same talks without grading any stance.

The **player** has the same axes in `S.values` (start 0). A talk option that states a view moves the matching
axis by ±1. Integrity topics instead update Love IQ / Self-respect / Trust as usual.

## 3. Heroine profiles

Display names come from the i18n `names` table; ids stay (`hina`, `mio`, `kaede`, `yuna`, `rei`).

| Axis | Nur Hanis (`hina`) | Lim Xin Yi (`mio`) | Kavya Pillai (`kaede`) | Elise de Souza (`yuna`) | Rae Koh (`rei`, not romanceable) |
|---|---|---|---|---|---|
| Background | Malay Singaporean; same HDB floor since kindergarten; helps care for her *nenek*; halal home cooking | Chinese Singaporean; strict parents push medicine; grandmother lives with them, helped by Joy | Indian Singaporean; parents work overseas; lives with her aunt; aims for the SEA Games | Eurasian Singaporean; dance-cover streamer; single mother | Chinese Singaporean, early 20s; trapped by Mr. G's "agency" |
| `spend` | −1 saves for her nursing degree | −2 frugal, except books | +1 spends on gear and food | +2 spends, then panics | debt-trapped by Mr. G's "salon fees" |
| `gifts` | −1 useful things | −2 handmade, letters | 0 "Just don't buy me something pink" | +1 likes brand gifts (learns otherwise) | was taught gifts are "proof" |
| `family` | +2 filial; helps care for her grandmother | −1 loves her family, resists their plan for her | −2 independent; video calls with distant parents | +1 sends stream money to her single mother | estranged |
| `career` | −1 steady: nurse | +1 risky: novelist (vs. her parents' medicine) | +2 pro athlete or bust | +2 streaming / dance | wants an ordinary job |
| `children` | +1 wants kids, in her late 20s | −1 unsure, maybe never | −1 later, after her career | 0 undecided | — |
| `childEdu` | −1 free play, lots of outdoors | −2 no tuition-centre marathons, ever (her own past) | +2 discipline and training | 0 "let them try everything" | — |
| `learning` | +1 part-time courses toward advanced nursing | +2 always reading | 0 → grows (hates homework) | −1 → grows (online course) | +2 after escaping (studies law) |
| `friends` | −1 a few lifelong friends | −2 one close friend | +1 her team | +2 everyone online | isolated by Mr. G |
| `lending` | +1 lends to family | 0 | −1 "pay me back or don't ask" | +2 lends to everyone, gets used | — |
| `conflict` | +2 says it now, loudly | −2 needs a day; writes a letter | +1 competitive, wants to "win" | −1 avoids, laughs it off | — |
| `honesty` | +2 blunt | +1 honest, says it on paper | +2 blunt | −1 white lies to keep the peace (arc) | −2 → +2 (redemption arc) |
| `promises` | +2 | +1 | +1 | −1 flaky when overworked (arc) | — |
| `home` | +1 a BTO near her parents and *nenek* | −1 study abroad first, decide later | −2 no rush; career and travel first | +1 her own place soon, near her mum | — |
| **Typical clash with the player** | money for her family vs. your savings; she wants to talk *now* | she needs space when you need answers; kids | she ranks career above everything, you may not | spending, honesty, flakiness | your urge to "rescue" her with money |
| **Growth arc** | learns that saying yes to every family request burns her out | learns to say difficult things out loud, including to her parents | learns to rest and to cook one meal | learns to say no, keep promises, drop white lies | rebuilds honesty; testifies against Mr. G |

## 4. Supporting cast profiles

Every supporting character has a profile so they can argue a side in group talks and give the player
contrasting advice. They are not mouthpieces: each has a strength and a blind spot.

| Character | Role | Strong values | Blind spot | Typical talk role |
|---|---|---|---|---|
| **Mochi** (cat mentor) | Sarcastic narrator; "Dr. Mochi" fact cards | honesty +2, learning +2 | mocks the player a little too much | facts, never opinions on preference topics |
| **Haziq** (`kenta`, best friend) | Comic relief, loyal | friends +2, children +2 (wants a big family), home +2 (marry and BTO early), lending +1 | gullible: scams, myths, impulse buys | voices the myth, then learns the fact |
| **Mei** (older sister) | Practical mentor | spend −2, family +2, honesty +2 | carries the family alone, rarely asks for help | the frugal, family-duty side |
| **Uncle Ong** (`ogawa`, café owner) | Employer, quiet mentor; Think Deeper mentor | learning +2 (studying accounting at 52 via a part-time diploma), promises +2 | regrets putting work above his marriage | lifelong learning; balance |
| **Dad** | Player's father | career −2 (security), spend −1, home +1 | dismisses passions as "not a job" | the safe-career side in Ch15; NS stories |
| **Mom** | Player's mother | family +2, childEdu +1 | worries out loud | caring for parents (her own mother); how she raised you |
| **Ms. Farah Aziz** (`farah`) | General Paper teacher | learning +2, honesty +1 | over-prepares every question | Think Deeper mentor: asks, never preaches |
| **Joy** (`joy`, optional) | Domestic worker caring for Xin Yi's grandmother | family +2, spend −2 (sends money to her children) | puts everyone else first | the human side of care work (Ch16 Think Deeper) |
| **Marcus Tan** (`takumi`) | Polished student-council president | career +2 | promises −2: delegates and disappears | broken promises (Ch6) |
| **Ryan Teo** (`ren`) | Section mate in NS (Part V) | spend +2, friends +2 | lending as a borrower; lives on image | lending, polish vs. reality (Ch16) |
| **Sam Wong** (`saki`) | Friend of friends (Part V) | friends +1, conflict +1 | trusts seniors too fast | the person the player protects (Ch17) |
| **Natalie Rodrigues** (`nana`) | Friend of friends (Part V) | spend +1, learning +1 | acts on impulse | impulse vs. getting to know someone (Ch17) |
| **Alpha Kai** | Online "guru" | — (greed) | sells contempt as confidence | greed / materialism (not a valid side) |
| **"Mr. G"** (`goto`) | Faceless scam ring boss | — (fraud) | — | fraud (not a valid side) |

Kai and Mr. G are the only characters whose positions are never presented as legitimate: they are fraud and
contempt, and the game says so.

## 5. Partner talks (topic × chapter)

A **partner talk** is a short structured scene (4–8 lines + one choice) at a reused location. Before route lock
(Ch1–Ch8) talks happen in groups (heroines as friends, Haziq, Mei); after route lock they happen with the route
partner (on solo: with Haziq, Mei or friends). Each talk has two genuinely reasonable sides, voiced by different
characters according to their profiles.

| Ch | Topic | Kind | Location | Opposing views (voiced by profile) |
|---|---|---|---|---|
| 1 | Refusal: saying no to a friend | integrity | classroom | Haziq: "Real friends never say no" ↔ Hanis: "Real friends can hear no" |
| 2 | Friendship: what makes a good friend | preference | Sentosa beach | Elise: many friends, light ties ↔ Hanis/Xin Yi: a few deep ones |
| 3 | Lying: are white lies kind? | integrity | library | Elise: "A small lie saves feelings" ↔ Kavya/Hanis: "Tell me straight" (floor: no lie that hides harm) |
| 4 | Everyday spending & personal finance (🔍 `consumption`) | preference | café | Kavya: spend on what you love now ↔ Hanis/Mei: save first |
| 5 | Life outlook: what is a good life? | preference | campsite (night) | Kavya: win · Xin Yi: meaning · Hanis: family · Elise: be known · Uncle Ong (by phone): balance |
| 6 | Broken promises | integrity | carnival / CCA stage | Marcus: "Plans change, relax" ↔ Hanis: "Then say so before, not after" |
| 7 | Greed & materialism: how much is enough? | integrity | street / arcade | Kai's video: "Lambo or loser" (invalid) ↔ Uncle Ong: "Enough is a number you choose" ↔ Elise: "Nice things *are* nice" (valid middle) |
| 8 | Life outlook: why do you like someone? | preference | rooftop | Haziq: looks · Mei: character · Mochi: "Did you ask what *she* values?" |
| 9 | Gift-giving & who pays (🔍 `genderwar`) | preference | mall | Elise: a brand gift shows effort ↔ Xin Yi: a letter means more · split vs. take turns vs. whoever earns more |
| 10 | Betrayal: what counts as cheating? | integrity + preference | night street | lines differ by heroine (texting an ex: Kavya fine, Xin Yi hurt); floor: secrecy and lies are betrayal |
| 11 | Friendship vs. couple time | preference | bedroom (call) | partner wants weekends together ↔ player's friends and hobby |
| 12 | Shopping & her family's views on money | preference | mall / her family's festive table | impulse buy vs. a monthly budget; her parents' opinions |
| 13 | Refusal & boundaries as a couple: "what do we want, and when?" | integrity | rooftop | waiting until older ↔ "everyone else has"; floor: either person's no decides |
| 14 | Financial support between partners; career pressure (🔍 `careerpressure`) | preference with floor | MRT station | "I'll pay for you, it's fine" ↔ "I don't want to owe you" |
| 15 | Lifelong learning & career; NS timing (🔍 `nstiming`) | preference | school hall (results day) | Dad: secure job ↔ player's passion; Uncle Ong: "I'm 52 and still studying" |
| 16 | Supporting parents; BTO near them? (🔍 `eldercare`) | preference | your HDB flat on book-out | Mei: give Mom and Dad a monthly allowance ↔ Kavya-style: "Build your own life first"; Hanis: a BTO near her parents to help |
| 17 | Friendship & lending | preference with floor | chalet / morning kopitiam | Ryan asks again; Sam: "Friends help" ↔ Natalie: "Friends don't make you their bank" |
| 18 | Children: whether, when, and how to raise them (🔍 `children`) | preference | Gardens by the Bay bench | per heroine (Hanis wants kids · Xin Yi maybe never · Kavya later · Elise undecided); child education: free play vs. structure |
| 19 | Fraud, deception & greed: "an easy investment" | integrity | lecture hall / café | a friend's "sure thing" ↔ Rae's talk on scam scripts (floor: don't join fraud) |
| 20 | Life outlook & money as a couple: joint account? BTO, CPF, wedding costs (🔍 `marriagecost`) | preference | rooftop garden (sunset) | merge everything ↔ keep separate ↔ a shared pot for shared costs; BTO now ↔ later |

Every one of the user's requested topics is covered at least once (§7 has the full map).

### 5.1 Talk scene template

```
[location bg, both sprites]
1. Hook: a concrete everyday trigger (a receipt, a sale, a call from Mom, a baby on the MRT, a BTO launch).
2. Her view: 2–3 lines from her profile bucket (see §6 keys). Concrete, personal, with a reason.
3. Player choice (always ≥ 4 options, at least one always visible):
   ✅ Share + ask      "I see it differently: … What makes it important to you?"   → Trust+, Self+
   ❌ Cave             "Whatever you want." (you secretly disagree)                → Self−, flag talk.<topic>.caved
   ❌ Contempt         mock or lecture her view                                    → Trust−−, Connection−
   ⚠️ Avoid            change the subject                                          → nothing learned; topic returns later
4. If ✅: a follow-up choice of the *player's own stance* (e.g. spend: "save first" / "balance" / "enjoy now").
   All three are valid; the stance moves S.values.<axis>. Her reply comes from the variant pool keyed by
   her value × your stance (agree / differ / strong clash).
5. If the gap |her − you| ≥ 3 on a dealbreaker axis (children, family, career location): a third beat offers
   "Let's keep talking" / "Can we find a middle?" / "I think we want different lives" — all healthy.
6. Lesson card: differentok · dontcave · nocontempt · dealbreaker · integrityfloor (MISTAKES §4.2).
7. Optional 🔍 Think Deeper card (seven topics; GAME_DESIGN §6.2): lenses, reflection, no grading.
```

Integrity talks (lying, broken promises, betrayal, greed, fraud, refusal) use the same template, but step 4 has a
right answer, and the wrong stance is a ❌ (sometimes a 💀 bad end, as in Ch19).

### 5.2 Example: Ch18 "Children" on two routes (abridged)

- **Hanis** (`children +1`, `childEdu −1`): "I want kids one day. Not now — after I'm a nurse. Lots of outdoor time,
  not tuition every night." Player stance "Maybe never" → gap 3 → dealbreaker beat. Healthy outcomes: "Let's keep talking as
  we grow" or a kind goodbye; never pretending.
- **Kavya** (`children −1`, `childEdu +2`): "Kids? After the SEA Games. And they'd train every morning." Player stance
  "I'd want them to play, not train" → differ (gap 2) → "We have years to figure that out — I'm glad we can talk
  about it." Lesson `differentok`.

## 6. Variant pools (the data model)

Lines are reused locations with **different situations and lines on repeat visits**. Every line set lives in a
pool. The engine picks one variant each time a pool is played.

```js
// js/data/variants/cafe.js  (one file per location; pools keyed "<location>.<slot>")
VARIANTS['cafe.smalltalk'] = [
  { id: 'cafe.smalltalk.hina.savings', who: 'hina', ch: [9, 14],
    when: { values: { spend: '<=0' }, flags: ['hinaNursingPlan'] },
    lines: [ /* ordinary script commands: { s:'hina', e:'happy', t:'…' }, choices allowed */ ] },
  { id: 'cafe.smalltalk.kaede.gear', who: 'kaede', ch: [9, 20], when: { visit: '>=2' }, lines: [ … ] },
  { id: 'cafe.smalltalk.any.rain', who: '*', ch: '*', lines: [ … ] },   // REQUIRED generic fallback
];
```

Script usage: `{ variant: 'cafe.smalltalk' }` (a normal command; may appear anywhere `s`/`txt` can).
Partner talks: `{ talk: 'children' }` expands the §5.1 template from `js/data/talks.js`, whose per-heroine lines
are themselves variant pools (`talk.children.her`, `talk.children.reply.agree|differ|clash`).

### 6.1 Keys and conditions

| Key / condition | Meaning |
|---|---|
| `location` | from the pool id prefix (`cafe`, `rooftop`, `mrt`, …) |
| `ch` | chapter number, range `[min, max]`, or `'*'` |
| `who` | heroine/speaker id, `'@route'` (current partner), or `'*'` |
| `when.values` | heroine profile *or* player `S.values` comparisons (`'player.spend': '>=1'`) |
| `when.flags` / `when.notFlags` | story memory |
| `when.stats` | e.g. `{ trust: '>=50' }` |
| `when.visit` | how many times this pool has been played (`S.poolVisits[pool]`) |
| `when.route` | `'solo'`, `'hina'`, … |
| `weight` | optional bias (default 1) |
| `once` | never repeat this variant in one playthrough |

### 6.2 Selection algorithm (deterministic, no AI)

```
candidates = pool.filter(v => matches(v.when, S) && chMatches(v.ch) && whoMatches(v.who))
fresh      = candidates.filter(v => !S.seenVariants.includes(v.id))   // prefer unseen
use        = fresh.length ? fresh : candidates                        // then allow repeats (except `once`)
score(v)   = 4·(who is specific) + 2·(ch is specific) + 2·(#value conditions) + 1·(#flag/stat conditions)
best       = use.filter(v => score(v) === max score)
pick       = best[ seededIndex(S.seed, poolId, S.poolVisits[poolId]) ]   // same save → same pick (rewind-safe)
if (!pick) pick = pool.find(v => v.who === '*' && v.ch === '*' && !v.when)   // guaranteed generic fallback
record S.seenVariants, S.poolVisits[poolId]++
```

Deterministic seeding means a rewind after a bad end replays the same lines (no "reroll" exploit), while a new game
(new `S.seed`) produces a different mix. The validator rejects any pool without an unconditional generic fallback
and any `{variant}` / `{talk}` reference to a missing pool (ARCHITECTURE §9).

### 6.3 Volume targets (per pool)

| Pool kind | Variants | Notes |
|---|---|---|
| Location small talk (`<loc>.smalltalk`) | 1 generic + 1–2 per heroine + 2–3 chapter-specific | ~8–12 per frequently used location |
| Partner talk "her view" (`talk.<topic>.her`) | 1 per heroine + 1 solo/friend + 1 generic | 6 per topic |
| Partner talk replies (`…reply.agree|differ|clash`) | 1 per heroine per bucket + 1 generic | ~15 per topic |
| Supporting-cast drop-ins (`<loc>.dropin`) | 1 per supporting character who can appear there | Haziq/Mei/Uncle Ong have the most |

## 7. Topic coverage by chapter

✔ = main scene (interaction or partner talk) · · = callback / variant lines only.

| Topic | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Everyday spending | · | ✔ | | ✔ | | | · | | ✔ | | | ✔ | | | | ✔ | | | | ✔ |
| Shopping | | | | ✔ | | | ✔ | | · | | | ✔ | | | | | | | | · |
| Personal finance / debt | | | | ✔ | | | | | | | | | | ✔ | | ✔ | | | ✔ | ✔ |
| Gift-giving | | | | ✔ | | | | | ✔ | | | ✔ | | | | | | | | |
| Life outlook & values | | ✔ | | | ✔ | | | ✔ | | | | | | | ✔ | | | | | ✔ |
| Caring for parents | | | | ✔ | | | | | | | | · | | | ✔ | ✔ | | · | | |
| Having children (whether/when) | | | | | | | | | | | | | | | | | | ✔ | | · |
| Child education | | | | | | | | | | | | | | | · | | | ✔ | | |
| Lifelong learning | | | | | · | | | | | | | | | | ✔ | ✔ | | | ✔ | · |
| Friendship | ✔ | ✔ | | | ✔ | | | | | | ✔ | | | | ✔ | ✔ | ✔ | | ✔ | |
| Financial support / lending | | | | ✔ | | | | | | | | | | ✔ | | ✔ | ✔ | | | |
| Lying | | | ✔ | | | | | | | ✔ | | | | ✔ | | | | | | ✔ |
| Deception / manipulation | ✔ | ✔ | ✔ | | | ✔ | ✔ | | | | | | ✔ | | | | | | ✔ | |
| Greed / materialism | | | | ✔ | | | ✔ | | | | | | | | | | | | ✔ | ✔ |
| Broken promises | | | | | | ✔ | | | | | ✔ | | | | | ✔ | | | | |
| Fraud / scams | ✔ | ✔ | ✔ | ✔ | | ✔ | ✔ | | | | | | | | ✔ | | | | ✔ | |
| Betrayal | | | | | | | | | | ✔ | | | | ✔ | | | | | | |
| Refusal & impulse control | ✔ | | | ✔ | ✔ | | | | | | | ✔ | ✔ | | | ✔ | ✔ | ✔ | ✔ | |
| Sexual health & red flags (non-explicit) | | | | | | | | | | | | ✔ | ✔ | | | | ✔ | ✔ | ✔ | |
| Housing / BTO & CPF | | | | | | | | | | | | · | | | | ✔ | | · | | ✔ |
| Career pressure | | | | | | | | | | ✔ | | | | ✔ | ✔ | | | | | · |
| NS & life timing | | | | | | | | | | | | | | | ✔ | ✔ | · | | ✔ | · |
| Marriage costs | | | | | | | | | · | | | | | | | | | · | | ✔ |
| Gender conflict ("men vs women") | | ✔ | | | | | | | ✔ | | | | ✔ | | · | | | | | ✔ |
| 🔍 Think Deeper card | | | | ✔ | | | | | ✔ | | | | | ✔ | ✔ | ✔ | | ✔ | | ✔ |

## 8. Locations: reuse plan and art needs (Singapore)

Locations are reused deliberately (familiarity), but every revisit plays a different variant (§6). ★ = a file exists
in `assets/bg/` today but **must be redrawn for Singapore** (HANDOFF art redo list); ids stay so scripts don't change.
Day/evening variants are tint overlays, not new paintings, unless noted. No real school, brand or shop names on signs.

| Location id | Status | Used in chapters | Notes |
|---|---|---|---|
| `bedroom` | ★ redraw | 1, 3, 4, 9, 11, 13, 14 | player's room in an HDB flat: window grilles, ceiling fan, study desk |
| `street` | ★ redraw | 1, 2, 7, 9, 10, 12 | covered walkway from the Seri Bayu blocks to school; rain trees; MRT viaduct behind |
| `library` | ★ redraw | 1, 3, 13, 14 | school library (tropical windows); a library@-style public library variant for Part V |
| `field` | ★ redraw | 1, 5, 6, 10, 15 | school track at tropical sunset, HDB blocks behind (Kavya) |
| `night` | ★ redraw | 3, 6, 10, 14, 16 | estate at night: void deck lights, playground, HDB windows |
| `title`, `keyart` | ★ redraw | — | no sakura: skyline at dusk, HDB blocks, frangipani petals |
| `badend` | ★ recolour | — | swap petal shapes to frangipani |
| `classroom` | new | 1, 3, 6, 8, 13, 14 | JC classroom, ceiling fans, louvre windows |
| `voiddeck` | new | 1, 3, 12, 16 | HDB void deck: stone tables, letterboxes, Mochi's old spot |
| `rooftop` | new | 2, 8, 12, 13, 20 | HDB/carpark rooftop garden; sunset tint for Ch20 |
| `cafe` | new | 4, 6, 9, 11, 16, 17, 19 | Uncle Ong's kopitiam-style café near the MRT |
| `hawker` | new | 4, 16, 17, 20 | hawker centre (stalls without real names) |
| `mrt` | new | 9, 14, 16 | MRT platform and train interior |
| `sentosa` | new | 2 | beach, arcade front, cable car view (group date) |
| `karaoke` | new | 2 | KTV room |
| `campsite` | new (day + night) | 5 | Pulau Ubin-style campsite, bumboat jetty |
| `carnival` | new | 6 | school carnival stalls + CCA showcase stage; Racial Harmony Day costumes |
| `fireworks` | new | 8 | National Day fireworks over Marina Bay |
| `mall` | new | 4, 7, 12, 16 | shopping, sales, BNPL kiosk |
| `beach` | new | 12 | East Coast Park |
| `dining` | new | 4, 12, 15 | family dinner table (player's / hers via tint; festive variants) |
| `healthroom` | new | 13 | school health room |
| `polyclinic` | new | 18 | polyclinic / clinic waiting room |
| `gradhall` | new | 15 | school hall on results day |
| `airport` | new | 15, 16 | departure hall (her dream abroad, long distance) |
| `camp` | new | 16, 19 | NS bunk (generic, no real camp or unit) |
| `apartment` | new | 16, 18, 19, 20 | your family's HDB living room |
| `partyroom` | new | 17 | chalet living room + barbecue pit |
| `lecture` | new | 19 | university lecture theatre (Rae's talk) |
| `park` | new | 18, 20 | Gardens by the Bay / park connector bench |

Total: 8 existing files (7 redrawn, 1 recoloured) + **24 new** backgrounds (+1 extra painting: campsite night).
Supporting-cast sprites needed (neutral / happy / annoyed minimum): Haziq, Mei, Uncle Ong, Dad, Mom, Ms. Farah,
Marcus, Ryan, Sam, Natalie, Joy, the school nurse, Alpha Kai (on a phone screen only), Mr. G (silhouette only);
Dr. Mochi (glasses). The per-chapter list is in [CHAPTERS.md](CHAPTERS.md) ("Art needs").
