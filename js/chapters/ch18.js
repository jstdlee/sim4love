/* Chapter 18 — "The Long Talk". Adults now (18+), still non-explicit: intimate moments cut away, nothing beyond a hug.
   Talking first, shared protection, testing, ongoing consent, your own timeline, a scare plan, and the children talk.
   Fact check (2026-11-02): emergency contraception in Singapore is prescription-only, so she sees a GP or polyclinic
   doctor herself (AWARE; DSC Clinic). Levonorgestrel works best within 72 hours; ulipristal up to 120 hours. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch18 = {
  id: 'ch18', part: 'Part V — On Your Own', title: 'Chapter 18', subtitle: 'The Long Talk',
  next: 'Chapter 19 — The Perfect Match', status: 'done',
  script: [
    SIM.gate(),
    { bg: 'apartment' },
    { n: 'Late in the year. You\'re nineteen, halfway through NS, and things that felt far away in JC are suddenly real questions.' },
    { mochi: 'Dr. Mochi is back. Same glasses. Older audience. Still nothing explicit, because this is about talking.', e: 'doctor' },

    // 18-1 talk first
    SIM.split([
      { show: '@route', e: 'shy', at: 'center' },
      { s: '@route', e: 'shy', t: 'Can we have a proper talk? About us. Where we are, what we each want, what we\'re not ready for. I\'d rather talk than guess.' },
      { choice: 'She\'s nervous. So are you.', opts: [
        { t: 'Talk openly: what you each want, what\'s off the table, and that waiting is completely fine.', fx: { trust: 10, wisdom: 6, self: 4 }, lesson: 'talkfirst', then: [
          { s: '@route', e: 'happy', t: 'That was less awkward than I thought. Okay. Not yet, for me. Maybe one day. And we talk again before anything changes.' },
          { me: 'Deal. And it\'s the same for me: either of us can say "not yet", any time.' },
        ] },
        { t: 'Make a joke and change the subject.', fx: { trust: -6 }, lesson: 'talkfirst', then: [
          { mochi: 'If you can\'t talk about it, you\'re not ready to do it. That is the whole rule.', e: 'doctor' },
        ] },
        { t: '"Whatever you want."', fx: { self: -6, trust: -2 }, lesson: 'talkfirst', then: [
          { mochi: 'She asked what YOU want. "Whatever" is not consent and not a voice. Both of you need one.', e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ], [
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: 'Okay so, Aisyah and I have been together five months. She wants to have "the talk". What do I even say?' },
      { choice: 'Haziq is asking you. Brave of him.', opts: [
        { t: '"Say what you want, what you don\'t, and listen properly. And it\'s fine if the answer is \'not yet\'."', fx: { kenta: 8, wisdom: 6 }, lesson: 'talkfirst', then: [
          { s: 'kenta', e: 'happy', t: 'So basically do what Dr. Mochi said in JC. Wow. That cat was right about everything.' },
        ] },
        { t: '"Just play it by ear."', fx: { kenta: -2, wisdom: -4 }, lesson: 'talkfirst', then: [
          { mochi: '"By ear" means nobody says anything until a heated moment. That is exactly when people stop listening.', e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 18-2 shared protection
    { bg: 'park' },
    { show: 'kenta', e: 'smug', at: 'center' },
    { s: 'kenta', e: 'smug', t: 'Anyway, Aisyah\'s on the pill, so protection is her job. Easy.' },
    { choice: 'Haziq has learned a lot. Not everything.', opts: [
      { t: '"It\'s both your jobs. The pill doesn\'t stop STIs. Talk about it, share the cost, use condoms as well."', fx: { wisdom: 8, kenta: 4 }, lesson: 'sharedprotection', then: [
        { s: 'kenta', e: 'neutral', t: '...Oh. Yeah. Health class, chapter whatever. I\'ll pay half. Obviously.' },
        { mochi: 'Responsibility shared is responsibility actually done.', e: 'doctor' },
      ] },
      { t: '"Yeah, easy."', fx: { wisdom: -6 }, lesson: 'sharedprotection', then: [
        { mochi: 'The pill prevents pregnancy, not STIs, and it is not her solo homework. Both people, both kinds of protection, both wallets.', e: 'angry' },
      ] },
    ] },

    // 18-5 your timeline
    { s: 'kenta', e: 'surprised', t: 'Wait. Bro. You\'re NINETEEN and you still haven\'t?!' },
    { choice: 'Haziq looks genuinely shocked.', opts: [
      { t: '"My timeline is mine."', fx: { self: 10 }, lesson: 'yourtimeline', then: [
        { s: 'kenta', e: 'neutral', t: '...Fair. Sorry. That was a group-chat thing to say.' },
      ] },
      { t: 'Panic, and plan to "catch up" with someone you barely know.', fx: { self: -8, wisdom: -6 }, lesson: 'yourtimeline', then: [
        { mochi: 'There is nothing to catch up on. It is not a race, there is no finish line, and the group chat\'s numbers are mostly fiction.', e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 18-3 testing
    { bg: 'polyclinic' },
    SIM.split([
      { n: 'You both decided: before anything changes, get tested together. The polyclinic waiting room is very beige and very quiet.' },
      { show: '@route', e: 'shy', at: 'left' },
    ], [
      { n: 'Haziq asked you to come with him and Aisyah to get tested. You are the emotional support friend, with snacks.' },
      { show: 'kenta', e: 'neutral', at: 'left' },
    ]),
    { choice: 'It\'s awkward.', opts: [
      { t: 'Go in. Ask the nurse every question you have.', fx: { wisdom: 8, health: 6 }, lesson: 'testing', then: [
        { show: 'nurse', e: 'neutral', at: 'right' },
        { s: 'nurse', t: 'Good on you both. Many STIs have no symptoms, so testing is the only way to know. And if you haven\'t had the HPV vaccine, ask us about it.' },
        { s: 'nurse', t: 'Results are confidential. Nobody here is judging you. We\'re just glad you came.' },
        { resource: 'sexhealth' },
      ] },
      { t: '"I\'m clean. I\'d know."', fx: { wisdom: -6 }, lesson: 'testing', then: [
        { mochi: '"I\'d know" is the most common wrong answer in sexual health. Many STIs show nothing at all. That is why tests exist.', e: 'doctor' },
      ] },
    ] },
    { hide: '*' },

    // 18-4 ongoing consent
    SIM.split([
      { bg: 'apartment' },
      { n: 'Months later. A quiet evening, a close moment, a hug that goes on a long time.' },
      { show: '@route', e: 'shy', at: 'center' },
      { s: '@route', e: 'shy', t: 'Actually... not tonight. Sorry. I thought I wanted to and I don\'t, right now.' },
      { choice: 'She pulls back a little.', opts: [
        { t: 'Stop. "I\'m really glad you told me. Want some tea and a movie?" No sulking.', fx: { trust: 12, self: 6, wisdom: 6 }, lesson: 'ongoingconsent', then: [
          { s: '@route', e: 'happy', t: 'Yes. Tea and a terrible movie. I feel so safe with you.' },
          { mochi: 'Consent can change at any moment, and the right response is always the same: stop, and mean it.', e: 'doctor' },
        ] },
        { t: '"But we planned it..."', fx: { trust: -10, self: -6 }, lesson: 'ongoingconsent', then: [
          { s: '@route', e: 'sad', t: 'Plans can change. I need that to be okay with you.' },
          { mochi: 'A plan is not a contract. "Not tonight" ends the plan. Guilt-tripping her for it is pressure.', e: 'angry' },
        ] },
        { t: 'Keep pushing.', fx: { trust: -40, self: -20, wisdom: -20 }, then: [
          { badEnd: { title: 'BAD END #24 — Not Tonight Means Not Tonight', resource: 'consent',
            text: 'She said no, and you kept going. That is not a misunderstanding; pressuring someone after they say no is abuse, and continuing is sexual assault. Consent can be withdrawn at any time, and "not tonight" means stop, immediately and without sulking.' } },
        ] },
      ] },
      { hide: '*' },
    ], [
      { bg: 'park' },
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: 'Bro. Last night Aisyah said "not tonight" after we\'d planned it. I said okay but I was kind of sulky. Was that bad?' },
      { choice: 'Haziq is asking honestly.', opts: [
        { t: '"Stopping was right. The sulking wasn\'t. Tell her you\'re glad she said it."', fx: { kenta: 8, wisdom: 6 }, lesson: 'ongoingconsent', then: [
          { s: 'kenta', e: 'neutral', t: 'Yeah. I\'ll tell her today. I don\'t want her to ever feel bad for saying no.' },
        ] },
        { t: '"She led you on, bro."', fx: { kenta: -4, wisdom: -10 }, lesson: 'ongoingconsent', then: [
          { mochi: 'Nobody "leads anyone on" by changing their mind. Consent can be withdrawn at any moment. Sulking about it is pressure.', e: 'angry' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 18-6 a scare
    SIM.split([
      { n: 'Another night, a long while later. Something goes wrong: the condom broke. She\'s frightened. So are you.' },
      { show: '@route', e: 'surprised', at: 'center' },
    ], [
      { n: 'A 7 AM call from Haziq, panicking. The condom broke last night. Aisyah is frightened.' },
      { show: 'kenta', e: 'surprised', at: 'center' },
    ]),
    { choice: 'Someone needs to stay calm.', opts: [
      { t: 'Stay calm. Emergency contraception works best the sooner it\'s taken: she sees a GP or polyclinic doctor today, and you go with her. Support her decisions, share the cost, plan STI tests.', fx: { wisdom: 10, self: 6, trust: 6, kenta: 4 }, lesson: 'scareplan', then: [
        { mochi: 'In Singapore emergency contraception needs a doctor\'s prescription, and she sees the doctor herself. The common pill works best within 72 hours; another type works up to five days. Sooner is better.', e: 'doctor' },
        { resource: 'sexhealth' },
      ] },
      { t: 'Panic, blame each other, go silent.', fx: { trust: -10, wisdom: -8, kenta: -4 }, lesson: 'scareplan', then: [
        { mochi: 'Every hour of silence matters here. Blame later, never. Plan now: doctor today, together.', e: 'sad' },
        { resource: 'sexhealth' },
      ] },
    ] },
    { hide: '*' },

    // children talk + Think Deeper
    { bg: 'park' },
    { talk: 'children' },
    { deeper: 'children' },
    SIM.evening('ch18'),
    { chapterEnd: true },
  ],
};
