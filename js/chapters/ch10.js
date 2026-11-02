/* Chapter 10 — "What Love Actually Is". Design: docs/CHAPTERS.md#chapter-10--what-love-actually-is
   STATUS: outline. Ending evaluation at the end (thresholds: docs/GAME_DESIGN.md §7). */
CHAPTERS.ch10 = {
  id: 'ch10', title: 'Chapter 10', subtitle: 'What Love Actually Is', next: null, status: 'outline',
  script: [
    { bg: 'title', petals: true },
    SIM.split([
      SIM.todo('[10-1] {her}\'s dream opportunity in another city (Hina: nursing school in Sendai; Mio: Tokyo writing program; Kaede: sports university; Yuna: dance academy in Seoul).'),
      { choice: 'She shows you the acceptance letter.', opts: [
        { t: '"I\'ll miss you like crazy. Go. Let\'s figure out how we stay close."', fx: { trust: 15, wisdom: 10 }, lesson: 'supportdreams', flag: 'supportedDream', then: [] },
        { t: '"If you loved me, you\'d stay."', fx: { trust: -25 }, lesson: 'supportdreams', then: [] },
        { t: 'Say nothing. Sulk for a week.', fx: { trust: -10 }, lesson: 'supportdreams', then: [] },
      ] },
    ], [
      SIM.todo('SOLO: You get into the program you wanted. Mr. Ogawa and Kenta throw you a party.'),
      { fx: { self: 10 } },
    ]),
    SIM.todo('[10-2] Alpha Kai is exposed on a livestream. Kenta admits he bought the ¥98,000 course.'),
    { choice: 'Kenta can\'t look at you.', opts: [
      { t: '"Bro, we\'ve all fallen for stuff. Let\'s get a refund and get ramen."', fx: { wisdom: 10 }, lesson: 'brosupport', flag: 'kentaBond', then: [] },
      { t: 'Post it in the group chat for laughs.', fx: { wisdom: -10 }, lesson: 'punchingdown', then: [] },
    ] },
    { if: (s) => s.flags.reiRedemption, then: [
      SIM.todo('[10-3] Rei: the police case against Goto. She thanks you for NOT trying to rescue her with money.'),
      { ending: 'rei_friend' },
    ] },
    SIM.split([
      SIM.todo('[10-4] Honesty quiz. {her}: "Did you notice what changed about me?" / "Have you ever lied to me?" / "What\'s my favourite thing?"'),
      { choice: '"Did you notice what changed about me?"', opts: [
        { t: '"Honestly? I\'m not sure — tell me?"', fx: { trust: 8 }, lesson: 'honesty', then: [] },
        { t: 'A confident, wrong guess.', fx: { trust: -5 }, lesson: 'honesty', then: [] },
      ] },
      { choice: '"Have you ever lied to me?"', opts: [
        { t: 'Tell the truth — including the arcade.', fx: { trust: 10 }, lesson: 'honesty', then: [] },
        { t: '"Never."', if: (s) => !!s.flags.liedArcade, fx: { trust: -30 }, lesson: 'smalllies', then: [] },
      ] },
    ]),

    SIM.todo('[10-5] Graduation. Mochi\'s exam result. Ending evaluation.'),
    // ---- Ending evaluation (order matters: first match wins) ----
    { if: (s) => SIM.inRelationship(s) && s.stats.trust >= 70 && s.stats.self >= 40 && s.stats.wisdom >= 60 && s.flags.supportedDream, then: [
      { ending: 'true' },
    ], else: [
      { if: (s) => SIM.inRelationship(s) && s.stats.trust >= 30, then: [{ ending: 'normal' }], else: [
        { if: (s) => s.flags.kindGoodbye || (SIM.inRelationship(s) && s.stats.trust < 30), then: [{ ending: 'kind_goodbye' }], else: [
          { if: (s) => s.route === 'solo' && s.flags.kentaBond && s.stats.self < 50, then: [{ ending: 'bro_end' }], else: [
            { if: (s) => s.stats.self >= 50, then: [{ ending: 'solo_growth' }], else: [{ ending: 'still_searching' }] },
          ] },
        ] },
      ] },
    ] },
    { if: (s) => s.lessons.length >= Object.keys(window.LESSONS).length, then: [{ ending: 'mochi_graduates' }] },
    { mochi: 'Love isn\'t something you find. It\'s something you DO, every day, on purpose.', e: 'happy' },
    { chapterEnd: true },
  ],
};
