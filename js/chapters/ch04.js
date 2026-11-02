/* Chapter 4 — "Culture Festival". Design: docs/CHAPTERS.md#chapter-4--culture-festival
   STATUS: outline. Ends with the confession and ROUTE LOCK (S.route). */
(function () {
  const yesFrom = (k) => [
    SIM.todo(`${k}'s answer — written per heroine.`),
    { if: SIM.love(k, 40), then: [
      { s: k, e: 'blush', at: 'center', t: '(TODO) ...Yes.' },
      { choice: 'She said yes. Her hand is right there...', opts: [
        { t: '"Can I hold your hand?"', fx: { [k]: 10 }, lesson: 'consent', then: [{ s: k, e: 'happy', t: '(TODO) She nods and takes it.' }] },
        { t: 'Just grab it.', fx: { [k]: -10 }, lesson: 'consent', then: [{ s: k, e: 'surprised', t: '(TODO) She flinches, then laughs nervously.' }] },
      ] },
      { route: k },
    ], else: [
      { s: k, e: 'sad', at: 'center', t: '(TODO) A kind, honest no.' },
      { choice: 'She said no.', opts: [
        { t: '"Thank you for being honest. I\'m really glad I told you."', fx: { [k]: 10, self: 15, wisdom: 10 }, lesson: 'rejection', ach: 'respect100', then: [{ route: 'solo' }] },
        { t: '"I\'ll wait forever until you change your mind."', fx: { self: -15 }, lesson: 'rejection', then: [{ route: 'solo' }] },
        { t: '"After everything I did for you?!"', fx: { [k]: -40 }, lesson: 'rejection', then: [
          { badEnd: { title: 'BAD END #10 — Nice Guy™', text: 'Kindness that comes with an invoice was never kindness. "No" is an answer, not an opening offer.' } }] },
      ] },
    ] },
  ];

  CHAPTERS.ch4 = {
    id: 'ch4', title: 'Chapter 4', subtitle: 'Culture Festival', next: 'Chapter 5 — After "Yes"', status: 'outline',
    script: [
      { bg: 'library' },
      SIM.todo('[4-1] Mio is scheduled to read her short story on stage and wants to quit.'),
      { choice: 'Mio is shaking behind the curtain...', opts: [
        { t: '"Want me to sit front row so you have a friendly face to look at?"', fx: { mio: 12, wisdom: 5 }, lesson: 'supportnotsave', then: [] },
        { t: '"Just don\'t be nervous lol."', fx: { mio: -5 }, lesson: 'dismissing', then: [] },
        { t: 'Take the paper and read it for her.', fx: { mio: -10 }, lesson: 'supportnotsave', then: [] },
      ] },

      { bg: 'street' },
      SIM.todo('[4-2] Rei appears with Manager Goto. Alone, she admits she is in debt to his "agency" and made to chat with boys.'),
      { choice: 'Rei, for once, isn\'t acting.', opts: [
        { t: '"I won\'t give money. But I\'ll go with you to the police and the anti-fraud centre."', fx: { wisdom: 15, self: 10 }, lesson: 'rescuer', flag: 'reiRedemption', then: [{ resource: 'scam' }] },
        { t: '"I\'ll pay off your debt!"', fx: { wisdom: -10, self: -10 }, lesson: 'rescuer', then: [SIM.todo('Goto smiles. The debt somehow grows.')] },
        { t: 'Go confront Goto alone in the back alley.', fx: {}, lesson: 'rescuer', then: [
          { badEnd: { title: 'BAD END #8 — Hero Mode: Off', text: 'Real help is boundaries and calling people who can actually help — not a solo boss fight.' } }] },
      ] },

      SIM.todo('[4-3] Fish-pond check at the class café.'),
      { if: (s) => ['hina', 'mio', 'kaede', 'yuna'].filter(k => s.stats[k] >= 25).length >= 3 && !s.flags.yunaClarity, then: [
        SIM.todo('Three girls you have been flirting with sit at the same café table.'),
        { choice: 'Everyone is looking at you.', opts: [
          { t: 'Be honest: "I\'ve been getting to know a few of you, I\'m figuring out my feelings, and I\'ll be straight with you."', fx: { wisdom: 15, self: 5 }, lesson: 'honestjuggle', then: [] },
          { t: 'Whisper "you\'re the only one" to each of them.', fx: { hina: -15, mio: -15, kaede: -15, yuna: -15 }, lesson: 'honestjuggle', then: [] },
          { t: 'Hide in the costume closet.', fx: {}, lesson: 'honestjuggle', then: [
            { badEnd: { title: 'BAD END #9 — The Fish Pond Keeper', text: 'You became the thing you hated in Chapter 1. One honest answer beats many maybes.' } }] },
        ] },
      ], else: [
        SIM.todo('Kenta is juggling two girls and asks for your advice — pick the honest advice.'),
      ] },

      { bg: 'night' },
      SIM.todo('[4-4] Fireworks. Who do you confess to? (Only heroines with ♥ ≥ 30 appear; Yuna also needs yunaClarity.)'),
      { choice: 'The first firework goes up...', opts: [
        { t: 'Find Hina.', if: SIM.love('hina', 30), then: yesFrom('hina') },
        { t: 'Find Mio.', if: SIM.love('mio', 30), then: yesFrom('mio') },
        { t: 'Find Kaede.', if: SIM.love('kaede', 30), then: yesFrom('kaede') },
        { t: 'Find Yuna.', if: (s) => s.stats.yuna >= 30 && s.flags.yunaClarity, then: yesFrom('yuna') },
        { t: 'Not now. I want to work on myself first.', fx: { self: 15 }, lesson: 'selfrespect', then: [{ route: 'solo' }] },
        { t: 'Grab the stage megaphone and confess to the whole school.', fx: { self: -10, wisdom: -10 }, lesson: 'publicpressure', then: [
          SIM.todo('Total silence. Everyone stares. Rewind and confess privately instead.'),
          { badEnd: { title: 'BAD END — Feedback Loop', text: 'A public confession pressures the other person. Confess privately and make it easy to answer honestly.' } }] },
      ] },

      { if: SIM.inRelationship, then: [{ mochi: 'Congratulations. You got a "yes". The hard part starts now.', e: 'happy' }],
        else: [{ mochi: 'No girlfriend — but you kept your dignity. Also, you have me.', e: 'smug' }] },
      { chapterEnd: true },
    ],
  };
})();
