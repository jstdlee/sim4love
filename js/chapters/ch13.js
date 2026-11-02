/* Chapter 13 — "Health Class". JC2 sexual-health week, at a high-school sex-education level and non-explicit.
   Nobody here has sex; every scene is a classroom, the health room, the rooftop or a chat.
   Accurate facts; risk named by behaviour, never by orientation; waiting is normal and respected.
   Law card sources: Singapore Penal Code ss 376A, 376AA, 377BE, 377BG–377BL, 377CA (sso.agc.gov.sg; checked 2026-11-02). */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch13 = {
  id: 'ch13', part: 'Part IV — Real Life', title: 'Chapter 13', subtitle: 'Health Class',
  next: 'Chapter 14 — Prelims & Storm Season', status: 'done',
  script: [
    SIM.gate(),
    { bg: 'classroom' },
    { n: 'JC2, Term 2. Sexual-health week. Forty seventeen-year-olds, one school nurse, and a level of giggling that could power the MRT.' },
    { mochi: 'Ahem. Today I am DOCTOR Mochi. The glasses are real. The degree is from the University of Trust Me.', e: 'doctor' },

    // 13-1 myths
    { phone: 'boys only 🏀' },
    { txt: 'kenta', t: 'ok facts. pulling out works. if she\'s on the pill, no STIs. first time you can\'t get pregnant. and you can tell if someone has something 💯' },
    { phoneOff: true },
    { choice: 'Haziq has posted four myths in one message. A personal record.', opts: [
      { t: 'Check with Dr. Mochi before anyone believes him.', fx: { wisdom: 8, kenta: 2 }, lesson: 'protection', then: [
        { mochi: 'Fact one: not having sex is the only 100% protection. Waiting is normal. Most people in this room haven\'t, whatever the group chat says.', e: 'doctor' },
        { mochi: 'Fact two: condoms, used correctly every single time, greatly reduce the risk of pregnancy AND most STIs. Not perfectly, but a lot.', e: 'doctor' },
        { mochi: 'Fact three: the pill prevents pregnancy, not STIs. Withdrawal is unreliable. Pregnancy can happen the very first time. And you cannot tell if someone has an STI by looking.', e: 'doctor' },
        { txt: 'kenta', t: 'ok that\'s 0 out of 4 for me. deleting.' },
      ] },
      { t: 'Repost it with a laughing emoji.', fx: { wisdom: -8 }, lesson: 'protection', then: [
        { mochi: 'Congratulations. Four myths now have forty readers. Myths spread faster than facts. So do STIs, when people believe myths.', e: 'angry' },
      ] },
      { t: '"I already know all this."', fx: { wisdom: -2 }, lesson: 'protection', then: [
        { mochi: 'Then you will love the quiz. Everyone who "already knows" gets question three wrong.', e: 'smug' },
      ] },
    ] },

    // 13-2 STIs are serious
    { bg: 'healthroom' },
    { show: 'nurse', e: 'neutral', at: 'center' },
    { s: 'nurse', t: 'STIs. Many have no symptoms at all, so people pass them on without knowing.' },
    { s: 'nurse', t: 'Untreated chlamydia or gonorrhoea can lead to infertility. Syphilis can damage the heart and brain. HIV is lifelong: very treatable now, not curable. Some types of HPV cause cancers, and there is a vaccine.' },
    { s: 'kenta', t: 'Whatever. There\'s a pill for everything.' },
    { choice: 'The nurse is waiting to see if anyone takes this seriously.', opts: [
      { t: 'Take it seriously. Ask how testing works.', fx: { wisdom: 8, self: 4 }, lesson: 'stiserious', then: [
        { s: 'nurse', t: 'Good question. Testing is confidential, quick and normal. Polyclinics, GPs and the DSC Clinic do it. I\'ll leave the details on the card.' },
        { resource: 'sexhealth' },
      ] },
      { t: '"It\'d never happen to me."', fx: { wisdom: -6 }, lesson: 'stiserious', then: [
        { s: 'nurse', t: 'That\'s what nearly everyone I\'ve ever treated said. Then it did. Testing is free of judgement. Remember that.' },
      ] },
    ] },
    { hide: '*' },

    // 13-3 question box: risk by behaviour
    { bg: 'classroom' },
    { n: 'The anonymous question box. The nurse reads one out: "Which kind of sex has the highest STI risk?"' },
    { s: 'Classmate', t: 'Easy. Only gay guys get HIV. Hahaha.' },
    { choice: 'Some people laugh. Some look at the floor.', opts: [
      { t: '"That\'s not true, and it\'s not funny." Then let the nurse give the real answer.', fx: { wisdom: 8, self: 6 }, lesson: 'riskbybehaviour', then: [
        { show: 'nurse', e: 'neutral', at: 'center' },
        { s: 'nurse', t: 'Thank you. The facts: unprotected anal sex carries the highest risk of HIV and many STIs, for anyone, whatever the partners\' genders. Oral sex can pass on STIs too.' },
        { s: 'nurse', t: 'Risk depends on what people do and whether they use protection. Not on who they love. And the stereotype hurts twice: it shames people, and it makes everyone else think they\'re safe.' },
      ] },
      { t: 'Laugh along.', fx: { wisdom: -8, self: -4 }, lesson: 'riskbybehaviour', then: [
        { mochi: 'That joke is wrong about the facts and cruel to real people. It also convinces the people laughing that they are safe. They are not, if they skip protection.', e: 'angry' },
      ] },
      { t: 'Stay quiet.', fx: { self: -2 }, lesson: 'riskbybehaviour', then: [
        { n: 'The nurse corrects it herself. Nobody looks at the boy at the back who went very still.' },
      ] },
    ] },
    { hide: '*' },

    // 13-4 green flag / red flag card sort
    { n: 'Peer-educator workshop. A JC2 senior hands out cards: "Green flag or red flag?" Your group sorts them.' },
    { n: 'The cards: a partner who keeps pushing after a no. Wants to try choking "because it\'s in videos". Wants to film. Gets someone drunk first. Checks in and stops when asked.' },
    { choice: 'How does your group sort them?', opts: [
      { t: 'Only "checks in and stops when asked" is green. Every other card is red, whoever does it.', fx: { wisdom: 10, self: 4 }, lesson: 'redflags', then: [
        { mochi: 'Correct. Pressure after a no is never okay. Choking or strangling can cause brain injury or death within seconds, even "gently", so never. Filming anyone without their free agreement is abuse.', e: 'doctor' },
        { mochi: 'A drunk or high person cannot consent. And checking in is not awkward. It is the green flag.', e: 'doctor' },
      ] },
      { t: '"If they\'re both into it, anything goes."', fx: { wisdom: -6 }, lesson: 'redflags', then: [
        { mochi: '"Into it" needs to be sober, free, and able to change its mind at any moment. Choking is never safe, no matter who agrees.', e: 'angry' },
      ] },
      { t: '"Videos show it, so it\'s normal."', fx: { wisdom: -8 }, lesson: 'redflags', then: [
        { mochi: 'Videos are made to be watched, not to be copied. They show nothing about consent, safety or how real people feel.', e: 'angry' },
      ] },
    ] },
    { mochi: 'Law card, Singapore. Sexual activity with anyone under 16 is a crime, whatever they "agree". At 16 or 17 it is still an offence in an exploitative relationship: a teacher, coach, guardian, a big age gap or control. Consent is no defence there.', e: 'doctor' },
    { mochi: 'Sexual messages to under-16s, and grooming, are offences. Sexual images of anyone under 16 are child abuse material. Sharing or threatening to share anyone\'s intimate image without consent is an offence at any age, deepfakes included. Legal is not the same as ready.', e: 'doctor' },

    // 13-5 Haziq and the "24-year-old girlfriend"
    { bg: 'voiddeck' },
    { show: 'kenta', e: 'happy', at: 'center' },
    { s: 'kenta', e: 'happy', t: 'Bro. Don\'t tell anyone. I have an online girlfriend. She\'s 24. She sends me gifts, she says my friends are immature, and she wants it to be our secret.' },
    { s: 'kenta', e: 'neutral', t: 'Now she wants photos. Like, private ones. That\'s normal right? She\'s mature.' },
    { choice: 'Your best friend is in danger and doesn\'t know it.', opts: [
      { t: 'Tell him gently: this is grooming, it\'s not his fault, and you\'ll help him tell someone.', fx: { wisdom: 10, self: 6, kenta: 8 }, lesson: 'grooming', then: [
        { me: 'An adult who wants a secret relationship with a teenager, sends gifts, cuts you off from friends and asks for photos? That\'s grooming, bro. It\'s not your fault. Don\'t send anything, don\'t delete the chat. Let\'s tell your mum, or a teacher.' },
        { s: 'kenta', e: 'sad', t: '...She said nobody would understand us. That\'s what you\'re supposed to say, isn\'t it. If you\'re that kind of person.' },
        { mochi: 'Groomers can be any gender. The pattern is the same: gifts, secrets, isolation, then a request. Haziq did nothing wrong by being targeted.', e: 'doctor' },
        { resource: 'grooming' },
      ] },
      { t: '"Lucky you! An older woman!"', fx: { wisdom: -10, kenta: -4 }, lesson: 'grooming', then: [
        { mochi: 'Switch the genders and you would see it instantly. An adult targeting a seventeen-year-old in secret is not luck. It is grooming.', e: 'angry' },
      ] },
      { t: 'Help him keep the secret and take the photos.', fx: { wisdom: -20, kenta: -10 }, lesson: 'grooming', then: [
        { badEnd: { title: 'BAD END #28 — Our Little Secret', resource: 'grooming',
          text: 'Secrets, gifts, isolation and a request for photos: that is grooming, whoever the adult is. Once the photos were sent, they became leverage. The right move was always to say it isn\'t his fault, keep the evidence, and tell a trusted adult or the police.' } },
      ] },
    ] },
    { hide: '*' },

    // 13-6 the rooftop talk, and the moment after
    { bg: 'rooftop' },
    SIM.split([
      { n: 'After the last workshop. The rooftop garden, sunset, both of you a bit embarrassed by the whole week.' },
      { talk: 'boundaries' },
      { bg: 'apartment' },
      { n: 'A week later. Your flat, nobody home, a study session that stopped being about studying. The moment gets heated.' },
      { choice: 'You both agreed to wait.', opts: [
        { t: 'Stop. "Let\'s not. We agreed. I\'ll walk you home."', fx: { self: 10, trust: 10, wisdom: 4 }, lesson: 'waitingok', then: [
          { s: '@route', e: 'shy', at: 'center', t: '...Yeah. Thank you. I mean it. You kept our word for both of us.' },
          { n: 'You walk her home. You hold hands the whole way, and that turns out to be plenty.' },
        ] },
        { t: '"Just this once." No talk, no plan, no protection.', fx: { self: -10, trust: -12, wisdom: -8 }, lesson: 'waitingok', then: [
          { s: '@route', e: 'sad', at: 'center', t: 'Wait. Stop. This isn\'t what we said. I want to go home.' },
          { n: 'You stop. That part you got right. Everything before it, you\'ll think about for a long time.' },
          { mochi: 'A plan made calmly beats a decision made in a heated minute. That is the whole point of agreeing first.', e: 'doctor' },
        ] },
        { t: '"Everyone else has already."', fx: { self: -6, trust: -8 }, lesson: 'waitingok', then: [
          { mochi: 'Plenty haven\'t, whatever they claim. And "everyone" is never a reason. You two are the only people in this room.', e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ], [
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: 'So. Nadia and I are kind of back together. Real one, same age, from poly. She asked: "What do we want, and when?" Bro, what do I SAY?' },
      { choice: 'Haziq wants your advice.', opts: [
        { t: '"Tell her the truth, listen to hers, and agree to wait until you\'re both sure. Waiting is normal."', fx: { wisdom: 8, kenta: 6 }, lesson: 'waitingok', then: [
          { s: 'kenta', e: 'happy', t: 'Okay. And if either of us says no, that decides it. Doctor Mochi said. ...I can\'t believe I\'m quoting a cat.' },
        ] },
        { t: '"Everyone else has already. You\'re behind, bro."', fx: { wisdom: -8, kenta: -2 }, lesson: 'pressure', then: [
          { mochi: 'Most of them haven\'t. And "behind" is not a thing. Nobody is racing you.', e: 'doctor' },
        ] },
      ] },
      { hide: '*' },
    ]),
    { show: 'nurse', e: 'neutral', at: 'center' },
    { s: 'nurse', t: 'Knowing the facts isn\'t permission and it isn\'t pressure. It\'s so that when you decide, in a year or in ten, you decide well.' },
    { mochi: 'And "no" is a full sentence. Yours too.', e: 'doctor' },
    { hide: '*' },
    SIM.evening('ch13'),
    { chapterEnd: true },
  ],
};
