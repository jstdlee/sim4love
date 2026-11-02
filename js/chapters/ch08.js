/* Chapter 8 — "Closeness". Design: docs/CHAPTERS.md#chapter-8--closeness
   STATUS: outline. TEEN-SAFE: nothing explicit; the scene cuts away. Consent + privacy + respecting her people. */
CHAPTERS.ch8 = {
  id: 'ch8', title: 'Chapter 8', subtitle: 'Closeness', next: 'Chapter 9 — Storm Season', status: 'outline',
  script: [
    { bg: 'night' },
    SIM.split([
      SIM.todo('[8-1] Movie night at your place. A quiet moment. You want to kiss her.'),
      { choice: 'The credits are rolling...', opts: [
        { t: '"Can I kiss you?" (and accept "not yet" with a smile)', fx: { trust: 15 }, lesson: 'consent', then: [SIM.todo('Write both outcomes: a shy yes, or "not yet" — both end warmly.')] },
        { t: '"If you really loved me, you would."', fx: { trust: -20 }, lesson: 'pressure', then: [] },
        { t: 'Keep pushing after "not yet".', lesson: 'pressure', then: [
          { badEnd: { title: 'BAD END #15 — Movie Over', text: '"Not yet" is a complete answer. Guilt is never consent.' } }] },
      ] },
    ]),
    SIM.todo('[8-2] Kenta: "Couples send each other pics, bro. Ask her."'),
    { choice: 'Kenta is serious.', opts: [
      { t: '"No. Never. And bro — sharing pics of minors is a crime."', fx: { wisdom: 15, self: 5 }, lesson: 'imageabuse', then: [] },
      { t: 'Ask her for a private photo.', if: SIM.inRelationship, fx: { trust: -25 }, lesson: 'imageabuse', then: [SIM.todo('She is hurt and scared. Rewind recommended.')] },
      { t: 'Forward a private photo someone shared in the group chat.', lesson: 'imageabuse', then: [
        { resource: 'images' }, // shown before the bad end: nothing after a badEnd is reachable (tests/softlock.js)
        { badEnd: { title: 'BAD END #16 — Screenshot Forever', text: 'Sharing someone\'s intimate image is abuse, and for minors a serious crime. Report it instead.' } }] },
    ] },
    SIM.split([
      SIM.todo('[8-3] You planned a huge surprise party. She told you twice she hates surprises.'),
      { choice: 'The balloons are already inflated...', opts: [
        { t: 'Cancel it and plan what she actually likes.', fx: { trust: 10 }, lesson: 'prefsmatter', then: [] },
        { t: 'Do it anyway — "she\'ll love it once she sees it".', fx: { trust: -12 }, lesson: 'prefsmatter', then: [] },
      ] },
      SIM.todo('[8-4] Dinner with her friends / family.'),
      { choice: 'Her people are watching you.', opts: [
        { t: 'Ask her friends questions, help clear the dishes, phone away.', fx: { trust: 12 }, lesson: 'herpeople', then: [] },
        { t: 'Ignore her friends. Later: "they\'re kind of boring".', fx: { trust: -12 }, lesson: 'herpeople', then: [] },
        { t: 'Try too hard and brag the whole evening.', fx: { trust: -4 }, lesson: 'herpeople', then: [] },
      ] },
    ]),
    { bg: 'street', petals: false },
    SIM.todo('[8-5] Beach day. The boys joke about girls\' bodies.'),
    { choice: 'Everyone\'s laughing...', opts: [
      { t: '"Not cool, man."', fx: { wisdom: 10, self: 10, trust: 5 }, lesson: 'bodyjokes', then: [] },
      { t: 'Make a joke about {her}\'s body to fit in.', fx: { trust: -20 }, lesson: 'bodyjokes', then: [] },
      { t: 'Laugh awkwardly and say nothing.', fx: { self: -5 }, lesson: 'bodyjokes', then: [] },
    ] },
    { chapterEnd: true },
  ],
};
