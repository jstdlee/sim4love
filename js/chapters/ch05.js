/* Chapter 5 — "After 'Yes'". Design: docs/CHAPTERS.md#chapter-5--after-yes
   STATUS: outline. Part II spine: '@route' = route heroine, {her} = her name. Solo route: Kenta's relationship, you advise. */
CHAPTERS.ch5 = {
  id: 'ch5', title: 'Chapter 5', subtitle: 'After "Yes"', next: 'Chapter 6 — Green-Eyed Monster', status: 'outline',
  script: [
    { bg: 'bedroom' },
    SIM.split([
      SIM.todo('[5-1] Two weeks in. Saturday, nothing planned, a new game just dropped. {her}: "Are we doing anything?"'),
      { choice: '{her} is waiting for an answer...', opts: [
        { t: 'Plan a small date around something she mentioned. (Variant: Hina playground / Mio bookshop crawl / Kaede morning run / Yuna phone-free day)', fx: { trust: 10, wisdom: 5 }, lesson: 'effortdrop', then: [] },
        { t: '"Can we just stay in? I\'m in a raid." (third weekend in a row)', fx: { trust: -10 }, lesson: 'effortdrop', then: [] },
        { t: 'Make plans, but stay on Discord the whole date.', fx: { trust: -5 }, lesson: 'presence', then: [] },
      ] },
      SIM.todo('[5-2] Day 8. You feel SO in love.'),
      { choice: 'Your heart is about to explode...', opts: [
        { t: 'Tell her specifically what you love about spending time with her.', fx: { trust: 8 }, lesson: 'pace', then: [] },
        { t: '"I love you. Also I named our future kids." Change bio to "{her}\'s husband".', fx: { trust: -8, self: -5 }, lesson: 'toofast', then: [] },
        { t: 'Demand she post couple photos to make it official.', fx: { trust: -6 }, lesson: 'toofast', then: [] },
      ] },
      SIM.todo('[5-3] Locker room: "So how far did you go? 😏"'),
      { choice: 'The boys are waiting...', opts: [
        { t: '"That\'s between us."', fx: { trust: 5, self: 5, wisdom: 5 }, lesson: 'kissandtell', then: [] },
        { t: 'Exaggerate to look cool.', fx: { trust: -20, wisdom: -10 }, lesson: 'kissandtell', then: [SIM.todo('The rumour reaches her friends by Monday.')] },
        { t: 'Show them her private messages.', lesson: 'kissandtell', then: [
          { badEnd: { title: 'BAD END #11 — Group Chat Hall of Shame', text: 'Her private words became your status points. Privacy is a form of respect.' } }] },
      ] },
    ], [
      SIM.todo('SOLO: You join Mr. Ogawa\'s café part-time. Kenta got a girlfriend (Nana) and keeps asking you for advice.'),
      { choice: 'Kenta: "Bro, should I post her on my story? It\'s been 3 days."', opts: [
        { t: '"Ask her what she\'s comfortable with first."', fx: { wisdom: 8 }, lesson: 'toofast', then: [] },
        { t: '"Post everything. Mark your territory."', fx: { wisdom: -8 }, lesson: 'control', then: [] },
      ] },
    ]),

    SIM.todo('[5-4] Kenta\'s birthday karaoke. You\'ve cancelled on him 3 times.'),
    { choice: 'Kenta\'s birthday...', opts: [
      { t: 'Go. Tell {her} — she says "of course, have fun!"', fx: { self: 10, trust: 3 }, lesson: 'ownlife', then: [] },
      { t: 'Cancel again.', fx: { self: -10 }, lesson: 'ownlife', then: [SIM.todo('Kenta stops inviting you.')] },
      { t: 'Bring {her} without asking anyone.', fx: { self: -3 }, then: [] },
    ] },

    SIM.split([
      SIM.todo('[5-5] One-month mini anniversary. Use callback flags (hinaHearts / mioVol3 / kaedeReschedule / yunaClarity).'),
      { choice: 'One month together...', opts: [
        { t: 'Something small using what you know about her.', fx: { trust: 12 }, lesson: 'remember', then: [] },
        { t: 'Forget. "It\'s just a month lol."', fx: { trust: -12 }, lesson: 'remember', then: [] },
        { t: 'An expensive surprise she now feels she has to pay back.', fx: { trust: -3, self: -5 }, lesson: 'buyinglove', then: [] },
      ] },
    ]),
    { chapterEnd: true },
  ],
};
