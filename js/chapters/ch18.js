/* Chapter 18 — "The Long Talk". Adults now (18+), still non-explicit: intimate moments cut away, nothing beyond a hug.
   Talking first, shared protection, testing, ongoing consent, your own timeline, a scare plan, and the children talk.
   Fact check (2026-11-02): emergency contraception in Singapore is prescription-only, so she sees a GP or polyclinic
   doctor herself (AWARE; DSC Clinic). Levonorgestrel works best within 72 hours; ulipristal up to 120 hours. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch18 = {
  id: 'ch18', part: "Part V — On Your Own", title: "Chapter 18", subtitle: "The Long Talk",
  next: "Chapter 19 — The Perfect Match", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'apartment' },
    WEAR('laterHome'),
    { n: "Late in the year. You're nineteen, halfway through NS, and stuff that felt far away in JC is suddenly a real question." },
    { mochi: "Dr. Mochi is back. Same glasses. Older audience. Still nothing explicit. This one's about talking.", e: 'doctor' },

    // 18-1 talk first
    SIM.split([
      { n: "December. {her} finally has two free weeks. You're at your flat with a packet of kacang puteh between you." },
      { show: '@route', e: 'shy', at: 'center' },
      { s: '@route', e: 'shy', t: "Can we talk properly? About us. Where we are, what we each want, what we're not ready for. I'd rather talk than guess." },
      { choice: "She's nervous. So are you.", opts: [
        { t: "Talk it through: what you each want, what's off the table, and that waiting is totally fine.", fx: { trust: 10, wisdom: 6, self: 4 }, lesson: 'talkfirst', then: [
          { s: '@route', e: 'happy', t: "Okay, that was less awkward than I thought. So. Not yet, for me. Maybe one day. And we talk again before anything changes." },
          { me: "Deal. Same for me: either of us can say \"not yet\", anytime." },
        ] },
        { t: "Make a joke and change the topic.", fx: { trust: -6 }, lesson: 'talkfirst', then: [
          { mochi: "Can't talk about it? Then not ready for it. That's the whole rule.", e: 'doctor' },
        ] },
        { t: "\"Whatever you want.\"", fx: { self: -6, trust: -2 }, lesson: 'talkfirst', then: [
          { mochi: "She asked what YOU want. \"Whatever\" isn't an answer.", e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ], [
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: "Okay so, Aisyah and me, five months already. She wants to have \"the talk\". What do I even say?" },
      { choice: "Haziq is asking you. Brave of him.", opts: [
        { t: "\"Say what you want, what you don't, and actually listen. And it's fine if the answer is 'not yet'.\"", fx: { kenta: 8, wisdom: 6 }, lesson: 'talkfirst', then: [
          { s: 'kenta', e: 'happy', t: "So basically what Dr. Mochi said in JC. Wah. That cat was right about everything." },
        ] },
        { t: "\"Just play by ear lah.\"", fx: { kenta: -2, wisdom: -4 }, lesson: 'talkfirst', then: [
          { mochi: "\"By ear\" means nobody says anything until the heated moment. Exactly when nobody listens.", e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 18-2 shared protection
    { bg: 'park' },
    WEAR('later'),
    { show: 'kenta', e: 'smug', at: 'center' },
    { s: 'kenta', e: 'smug', t: "Anyway, Aisyah's on the pill, so protection is her job. Easy." },
    { choice: "Haziq has learned a lot. Not everything.", opts: [
      { t: "\"Both your job. The pill doesn't stop STIs. Talk about it, split the cost, use condoms too.\"", fx: { wisdom: 8, kenta: 4 }, lesson: 'sharedprotection', then: [
        { s: 'kenta', e: 'neutral', t: "...Oh. Ya. Health class, chapter whatever. I pay half. Obviously." },
        { mochi: "Shared means it actually gets done.", e: 'doctor' },
      ] },
      { t: "\"Ya, easy.\"", fx: { wisdom: -6 }, lesson: 'sharedprotection', then: [
        { mochi: "The pill stops pregnancy, not STIs. And it's not her solo homework. Two people, two kinds of protection, two wallets.", e: 'angry' },
      ] },
    ] },

    // 18-5 your timeline
    { s: 'kenta', e: 'surprised', t: "Wait. Bro. You're NINETEEN and you still haven't?!" },
    { choice: "Haziq looks genuinely shocked.", opts: [
      { t: "\"My timeline, my business.\"", fx: { self: 10 }, lesson: 'yourtimeline', then: [
        { s: 'kenta', e: 'neutral', t: "...Fair. Sorry. That was a very group-chat thing to say." },
      ] },
      { t: "Panic, and plan to \"catch up\" with someone you barely know.", fx: { self: -8, wisdom: -6 }, lesson: 'yourtimeline', then: [
        { mochi: "Catch up to what? No race, no finish line. The group chat's numbers are mostly fiction.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 18-3 testing
    { bg: 'polyclinic' },
    WEAR('later', { nurse: 'polyclinic' }),
    SIM.split([
      { n: "You both decided: before anything changes, get tested together. The polyclinic waiting room is very beige and very quiet. Your queue number is 2047." },
      { show: '@route', e: 'shy', at: 'left' },
    ], [
      { n: "Haziq asked you to come along when he and Aisyah get tested. You're the emotional-support friend. With snacks." },
      { show: 'kenta', e: 'neutral', at: 'left' },
    ]),
    { choice: "It's awkward.", opts: [
      { t: "Go in. Ask the nurse every question you have.", fx: { wisdom: 8, health: 6 }, lesson: 'testing', then: [
        { show: 'nurse', e: 'neutral', at: 'right' },
        { s: 'nurse', t: "Good on you. Many STIs have no symptoms, so testing is the only way to know. And if you haven't had the HPV vaccine, ask us about it." },
        { s: 'nurse', t: "Results are confidential. Nobody here is judging you. We're just glad you came." },
        { resource: 'sexhealth' },
      ] },
      { t: "\"I'm clean. I would know.\"", fx: { wisdom: -6 }, lesson: 'testing', then: [
        { mochi: "\"I would know\": the most common wrong answer in sexual health. Many STIs show nothing. Hence, tests.", e: 'doctor' },
      ] },
    ] },
    { hide: '*' },

    // 18-4 ongoing consent
    SIM.split([
      { bg: 'apartment' },
      WEAR('laterHome'),
      { n: "Months later. A quiet evening, a close moment, a hug that goes on a long time." },
      { show: '@route', e: 'shy', at: 'center' },
      { s: '@route', e: 'shy', t: "Actually... not tonight. Sorry. I thought I wanted to, and I don't, right now." },
      { choice: "She pulls back a little.", opts: [
        { t: "Stop. \"I'm really glad you told me. Tea and a movie?\" No sulking.", fx: { trust: 12, self: 6, wisdom: 6 }, lesson: 'ongoingconsent', then: [
          { s: '@route', e: 'happy', t: "Yes. Tea and a terrible movie. ...I feel really safe with you, you know." },
          { mochi: "Changed mind? Stop, and mean it. Every time.", e: 'doctor' },
        ] },
        { t: "\"But we planned it...\"", fx: { trust: -10, self: -6 }, lesson: 'ongoingconsent', then: [
          { s: '@route', e: 'sad', t: "Plans can change. I need you to be okay with that." },
          { mochi: "A plan isn't a contract. Guilt-tripping her for changing it is pressure.", e: 'angry' },
        ] },
        { t: "Keep pushing.", fx: { trust: -40, self: -20, wisdom: -20 }, then: [
          { badEnd: { title: "BAD END #24 — Not Tonight Means Not Tonight", resource: 'consent',
            text: "She said no, and you kept going. That is not a misunderstanding; pressuring someone after they say no is abuse, and continuing is sexual assault. Consent can be withdrawn at any time, and \"not tonight\" means stop, immediately and without sulking." } },
        ] },
      ] },
      { hide: '*' },
    ], [
      { bg: 'park' },
      WEAR('later'),
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: "Bro. Last night Aisyah said \"not tonight\" after we planned it. I said okay but I was a bit sulky. Was that bad?" },
      { choice: "Haziq is asking honestly.", opts: [
        { t: "\"Stopping was right. The sulking, not so much. Tell her you're glad she said it.\"", fx: { kenta: 8, wisdom: 6 }, lesson: 'ongoingconsent', then: [
          { s: 'kenta', e: 'neutral', t: "Ya. I'll tell her today. Don't want her to ever feel bad for saying no." },
        ] },
        { t: "\"She led you on, bro.\"", fx: { kenta: -4, wisdom: -10 }, lesson: 'ongoingconsent', then: [
          { mochi: "Changing your mind isn't \"leading on\". And sulking about it is pressure.", e: 'angry' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 18-6 a scare
    SIM.split([
      { n: "Another night, a long while later. Something goes wrong: the condom broke. She's scared. So are you." },
      { show: '@route', e: 'surprised', at: 'center' },
    ], [
      { n: "7 AM, Haziq calls, panicking. The condom broke last night. Aisyah is scared." },
      { show: 'kenta', e: 'surprised', at: 'center' },
    ]),
    { choice: "Someone needs to stay calm.", opts: [
      { t: "Stay calm. Emergency contraception works best the sooner it's taken: she sees a GP or polyclinic doctor today, and you go with her. Support her decisions, share the cost, plan STI tests.", fx: { wisdom: 10, self: 6, trust: 6, kenta: 4 }, lesson: 'scareplan', then: [
        { mochi: "In Singapore emergency contraception needs a doctor's prescription, and she sees the doctor herself. The common pill works best within 72 hours; another type works up to five days. Sooner is better.", e: 'doctor' },
        { resource: 'sexhealth' },
      ] },
      { t: "Panic, blame each other, go silent.", fx: { trust: -10, wisdom: -8, kenta: -4 }, lesson: 'scareplan', then: [
        { mochi: "Every hour counts here. Blame: never. Plan: doctor today, together.", e: 'sad' },
        { resource: 'sexhealth' },
      ] },
    ] },
    { hide: '*' },

    // Natalie: slow start
    { if: (s) => s.route === 'solo' && !!s.flags.nanaCoffee, then: [
      { bg: 'cafe' },
      WEAR('later', { nana: 'studio' }),
      { show: 'nana', e: 'happy', at: 'center' },
      { n: "Saturday coffee again, then a pottery studio she found. Your bowl looks like a hat." },
      { s: 'nana', e: 'neutral', t: "I'm switching from accountancy to occupational therapy. My parents think I'm throwing away a safe course. I think I'm throwing away a course I hate." },
      { choice: "Natalie waits to see what you'll say.", opts: [
        { t: "\"Tell me why OT.\"", fx: { 'aff.nana': 5, 'trust.nana': 10 }, sig: 2, then: [
          { s: 'nana', e: 'happy', t: "My grandma's therapist taught her to button her own blouse again after the stroke. I want to be that person for someone." },
          { reveal: { nana: 'intellect' }, why: "You asked why she was switching courses." },
          { contact: 'nana' },
        ] },
        { t: "\"Accountancy is safer lah.\"", fx: { 'aff.nana': -3 }, then: [
          { s: 'nana', e: 'neutral', t: "Everyone says that. I hoped you wouldn't." },
        ] },
      ] },
      { hide: '*' },
    ] },
    // Joy's video call
    { bg: 'voiddeck' },
    WEAR('later'),
    { show: 'joy', e: 'happy', at: 'center' },
    { n: "Joy is on a video call at the void deck, phone propped on a water bottle. Two kids in Iloilo are holding up a school certificate." },
    { choice: "She hangs up and wipes her eyes quickly.", opts: [
      { t: "\"Your kids? Tell me about them.\"", fx: { 'aff.joy': 4, 'trust.joy': 4 }, then: [
        { s: 'joy', e: 'happy', t: "Angel, fourteen, and Paolo, nine. Paolo is top in maths. Seven years I've watched him grow up on a phone screen." },
        { flaw: { joy: { 'hides-homesickness': 'growing' } }, why: "You asked about her kids, and she let you see how much she misses them." },
        { contact: 'joy' },
      ] },
      { t: "Pretend you didn't see.", fx: { 'aff.joy': -1 } },
    ] },
    { hide: '*' },
    // Preet forgives a lie
    { if: (s) => !!s.flags.preetMet, then: [
      { bg: 'park' },
      WEAR('later'),
      { show: 'preet', e: 'neutral', at: 'center' },
      { n: "Preet's younger brother lied about where he was on Friday night. You expect a lecture. Instead:" },
      { s: 'preet', e: 'neutral', t: "He lied because he was scared I'd judge him. So I told him I'm glad he's safe, and we'll talk about the lie tomorrow. ...Who even am I." },
      { flaw: { preet: { judgemental: 'resolved' } }, why: "She forgave her brother's lie before judging it." },
      { contact: 'preet' },
      { hide: '*' },
    ] },

    // children talk + Think Deeper
    { bg: 'park' },
    WEAR('later'),
    { talk: 'children' },
    { deeper: 'children' },
    SIM.evening('ch18'),
    { chapterEnd: true },
  ],
};
