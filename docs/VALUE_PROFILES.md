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
| `family` | Independent from parents | Family first: duty, living close, supporting parents | preference |
| `career` | Security: stable job, steady pay | Ambition: risky dream, high ceiling | preference |
| `children` | No children / unsure | Wants children, earlier | preference |
| `childEdu` | Free play, low pressure | Structured, achievement-focused | preference |
| `learning` | Done once school ends | Lifelong learner | preference |
| `friends` | A few close friends | A wide circle | preference |
| `lending` | Never lend money | Helps freely | preference with a floor (never beyond your means) |
| `conflict` | Needs space before talking | Talk it out right now | preference (style) |
| `honesty` | Tactful: white lies are kind | Blunt: no lies, ever | integrity floor: no deception that harms |
| `promises` | Plans are flexible | A promise is a contract | integrity floor: don't break promises silently |

The **player** has the same axes in `S.values` (start 0). A talk option that states a view moves the matching
axis by ±1. Integrity topics instead update Love IQ / Self-respect / Trust as usual.

## 3. Heroine profiles

| Axis | Hina Aoki | Mio Shirakawa | Kaede Tachibana | Yuna Hoshino | Rei Kurosawa (not romanceable) |
|---|---|---|---|---|---|
| `spend` | −1 saves for nursing school | −2 frugal, except books | +1 spends on gear and food | +2 spends, then panics | debt-trapped by Goto's "salon fees" |
| `gifts` | −1 useful things | −2 handmade, letters | 0 "Just don't buy me something pink" | +1 likes brand gifts (learns otherwise) | was taught gifts are "proof" |
| `family` | +2 helps care for her grandmother | −1 strict parents push medicine | −2 left home early, distant parents | +1 sends stream money to her single mother | estranged |
| `career` | −1 steady: nurse | +1 risky: novelist | +2 pro athlete or bust | +2 streaming / dance | wants an ordinary job |
| `children` | +1 wants kids, in her late 20s | −1 unsure, maybe never | −1 later, after her career | 0 undecided | — |
| `childEdu` | −1 free play, lots of outdoors | −2 no cram school, ever (her own past) | +2 discipline and training | 0 "let them try everything" | — |
| `learning` | +1 night classes for a nursing licence | +2 always reading | 0 → grows (hates homework) | −1 → grows (online course) | +2 after escaping (studies law) |
| `friends` | −1 a few lifelong friends | −2 one close friend | +1 her team | +2 everyone online | isolated by Goto |
| `lending` | +1 lends to family | 0 | −1 "pay me back or don't ask" | +2 lends to everyone, gets used | — |
| `conflict` | +2 says it now, loudly | −2 needs a day; writes a letter | +1 competitive, wants to "win" | −1 avoids, laughs it off | — |
| `honesty` | +2 blunt | +1 honest, says it on paper | +2 blunt | −1 white lies to keep the peace (arc) | −2 → +2 (redemption arc) |
| `promises` | +2 | +1 | +1 | −1 flaky when overworked (arc) | — |
| **Typical clash with the player** | money for her family vs. your savings; she wants to talk *now* | she needs space when you need answers; kids | she ranks career above everything, you may not | spending, honesty, flakiness | your urge to "rescue" her with money |
| **Growth arc** | learns that saying yes to every family request burns her out | learns to say difficult things out loud | learns to rest and to cook one meal | learns to say no, keep promises, drop white lies | rebuilds honesty; testifies against Goto |

## 4. Supporting cast profiles

Every supporting character has a profile so they can argue a side in group talks and give the player
contrasting advice. They are not mouthpieces: each has a strength and a blind spot.

| Character | Role | Strong values | Blind spot | Typical talk role |
|---|---|---|---|---|
| **Mochi** (cat mentor) | Sarcastic narrator; "Dr. Mochi" fact cards | honesty +2, learning +2 | mocks the player a little too much | facts, never opinions on preference topics |
| **Kenta** (best friend) | Comic relief, loyal | friends +2, children +2 (wants a big family), lending +1 | gullible: scams, myths, impulse buys | voices the myth, then learns the fact |
| **Mei** (older sister) | Practical mentor | spend −2, family +2, honesty +2 | carries the family alone, rarely asks for help | the frugal, family-duty side |
| **Mr. Ogawa** (café owner) | Employer, quiet mentor | learning +2 (studying accounting at 52), promises +2 | regrets putting work above his marriage | lifelong learning; balance |
| **Dad** | Player's father | career −2 (security), spend −1 | dismisses passions as "not a job" | the safe-career side in Ch15 |
| **Mom** | Player's mother | family +2, childEdu +1 | worries out loud | caring for parents; how she raised you |
| **Takumi** | Polished festival leader | career +2 | promises −2: delegates and disappears | broken promises (Ch6) |
| **Ren** | Stylish classmate (Part V) | spend +2, friends +2 | lending as a borrower; lives on image | lending, polish vs. reality (Ch16) |
| **Saki** | Classmate (Part V) | friends +1, conflict +1 | trusts seniors too fast | the person the player protects (Ch17) |
| **Nana** | Classmate (Part V) | spend +1, learning +1 | acts on impulse | impulse vs. getting to know someone (Ch17) |
| **Alpha Kai** | Online "guru" | — (greed) | sells contempt as confidence | greed / materialism (not a valid side) |
| **Goto** | Scam ring boss | — (fraud) | — | fraud (not a valid side) |

Kai and Goto are the only characters whose positions are never presented as legitimate: they are fraud and
contempt, and the game says so.

## 5. Partner talks (topic × chapter)

A **partner talk** is a short structured scene (4–8 lines + one choice) at a reused location. Before route lock
(Ch1–Ch8) talks happen in groups (heroines as friends, Kenta, Mei); after route lock they happen with the route
partner (on solo: with Kenta, Mei or friends). Each talk has two genuinely reasonable sides, voiced by different
characters according to their profiles.

| Ch | Topic | Kind | Location | Opposing views (voiced by profile) |
|---|---|---|---|---|
| 1 | Refusal: saying no to a friend | integrity | classroom | Kenta: "Real friends never say no" ↔ Hina: "Real friends can hear no" |
| 2 | Friendship: what makes a good friend | preference | amusement park | Yuna: many friends, light ties ↔ Hina/Mio: a few deep ones |
| 3 | Lying: are white lies kind? | integrity | library | Yuna: "A small lie saves feelings" ↔ Kaede/Hina: "Tell me straight" (floor: no lie that hides harm) |
| 4 | Everyday spending & personal finance | preference | café | Kaede: spend on what you love now ↔ Hina/Mei: save first |
| 5 | Life outlook: what is a good life? | preference | campsite (night) | Kaede: win · Mio: meaning · Hina: family · Yuna: be known · Ogawa (by phone): balance |
| 6 | Broken promises | integrity | festival stage | Takumi: "Plans change, relax" ↔ Hina: "Then say so before, not after" |
| 7 | Greed & materialism: how much is enough? | integrity | street / arcade | Kai's video: "Lambo or loser" (invalid) ↔ Ogawa: "Enough is a number you choose" ↔ Yuna: "Nice things *are* nice" (valid middle) |
| 8 | Life outlook: why do you like someone? | preference | rooftop | Kenta: looks · Mei: character · Mochi: "Did you ask what *she* values?" |
| 9 | Gift-giving & who pays | preference | shopping street | Yuna: a brand gift shows effort ↔ Mio: a letter means more · split vs. take turns vs. whoever earns more |
| 10 | Betrayal: what counts as cheating? | integrity + preference | night street | lines differ by heroine (texting an ex: Kaede fine, Mio hurt); floor: secrecy and lies are betrayal |
| 11 | Friendship vs. couple time | preference | bedroom (call) | partner wants weekends together ↔ player's friends and hobby |
| 12 | Shopping & her family's views on money | preference | mall / her family's dinner table | impulse buy vs. a monthly budget; her parents' opinions |
| 13 | Refusal & boundaries as a couple: "what do we want, and when?" | integrity | rooftop | waiting until older ↔ "everyone else has"; floor: either person's no decides |
| 14 | Financial support between partners | preference with floor | station | "I'll pay for you, it's fine" ↔ "I don't want to owe you" |
| 15 | Lifelong learning & career | preference | graduation hall | Dad: secure job ↔ player's passion; Ogawa: "I'm 52 and still studying" |
| 16 | Supporting parents | preference | apartment (call home) | Mei: send money home monthly ↔ Kaede-style: "Build your own life first"; Hina: move back to help |
| 17 | Friendship & lending | preference with floor | party room / morning café | Ren asks again; Saki: "Friends help" ↔ Nana: "Friends don't make you their bank" |
| 18 | Children: whether, when, and how to raise them | preference | park bench | per heroine (Hina wants kids · Mio maybe never · Kaede later · Yuna undecided); child education: free play vs. structure |
| 19 | Fraud, deception & greed: "an easy investment" | integrity | lecture hall / café | a friend's "sure thing" ↔ Rei's talk on scam scripts (floor: don't join fraud) |
| 20 | Life outlook & money as a couple: joint account? | preference | rooftop (sunset) | merge everything ↔ keep separate ↔ a shared pot for shared costs |

Every one of the user's requested topics is covered at least once (§7 has the full map).

### 5.1 Talk scene template

```
[location bg, both sprites]
1. Hook: a concrete everyday trigger (a receipt, a sale, a call from Mom, a baby on the train).
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
```

Integrity talks (lying, broken promises, betrayal, greed, fraud, refusal) use the same template, but step 4 has a
right answer, and the wrong stance is a ❌ (sometimes a 💀 bad end, as in Ch19).

### 5.2 Example: Ch18 "Children" on two routes (abridged)

- **Hina** (`children +1`, `childEdu −1`): "I want kids one day. Not now — after I'm a nurse. Lots of outdoor time,
  no cram school." Player stance "Maybe never" → gap 3 → dealbreaker beat. Healthy outcomes: "Let's keep talking as
  we grow" or a kind goodbye; never pretending.
- **Kaede** (`children −1`, `childEdu +2`): "Kids? After the Olympics. And they'd train every morning." Player stance
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
| `location` | from the pool id prefix (`cafe`, `rooftop`, `station`, …) |
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
| Supporting-cast drop-ins (`<loc>.dropin`) | 1 per supporting character who can appear there | Kenta/Mei/Ogawa have the most |

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

## 8. Locations: reuse plan and art needs

Locations are reused deliberately (familiarity), but every revisit plays a different variant (§6). ★ = exists in
`assets/bg/` today; the rest are new backgrounds. Day/evening variants are tint overlays, not new paintings, unless noted.

| Location id | Status | Used in chapters | Notes |
|---|---|---|---|
| `bedroom` | ★ | 1, 3, 4, 9, 11, 13, 14 | player's room; phone scenes |
| `street` | ★ | 1, 2, 7, 9, 10, 12 | school road / shopping street |
| `library` | ★ | 1, 3, 13, 14 | study scenes |
| `field` | ★ | 1, 5, 6, 10, 15 | track field (Kaede) |
| `night` | ★ | 3, 6, 10, 14, 16 | night street / park |
| `title`, `keyart`, `badend` | ★ | — | system screens |
| `classroom` | new | 1, 3, 6, 8, 13, 14 | most-used new background |
| `rooftop` | new | 2, 8, 12, 13, 20 | private talks; sunset tint for Ch20 |
| `cafe` | new | 4, 6, 9, 11, 16, 17, 19 | Ogawa's café; part-time job |
| `amusement` | new | 2 | group date |
| `campsite` | new (day + night) | 5 | trip |
| `festival` | new | 6 | stage / stalls |
| `fireworks` | new | 6 or 10 | riverbank at night |
| `mall` | new | 4, 7, 12 | shopping, sales |
| `beach` | new | 12 | summer |
| `dining` | new | 4, 12, 15 | family dinner table (player's / hers via tint) |
| `healthroom` | new | 13, 18 | school health room → clinic waiting room (second painting for Ch18) |
| `station` | new | 14, 15, 16 | departures, long distance |
| `gradhall` | new | 15 | graduation |
| `apartment` | new | 16, 18, 19, 20 | player's flat |
| `partyroom` | new | 17 | izakaya-style party room |
| `lecture` | new | 17, 19 | college lecture hall |
| `park` | new | 18, 20 | bench talks |

Total: 8 existing + **18 new** backgrounds (+2 extra paintings: campsite night, clinic). Supporting-cast sprites
needed (neutral / happy / annoyed minimum): Kenta, Mei, Mr. Ogawa, Dad, Mom, Takumi, Ren, Saki, Nana, Alpha Kai
(on a phone screen only), Goto (silhouette only), the school nurse; Dr. Mochi (glasses). The per-chapter list is
in [CHAPTERS.md](CHAPTERS.md) ("Art needs").
