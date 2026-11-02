/* Chapter 7 — "The First Fight". Design: docs/CHAPTERS.md#chapter-7--the-first-fight
   STATUS: outline. The most important chapter: conflict skills. Solo route: a fight with Kenta / Mei. */
CHAPTERS.ch7 = {
  id: 'ch7', title: 'Chapter 7', subtitle: 'The First Fight', next: 'Chapter 8 — Closeness', status: 'outline',
  script: [
    { bg: 'night' },
    SIM.todo('[7-1] {her} (solo: Kenta) vents about a terrible day.'),
    { choice: 'They\'ve had the worst day...', opts: [
      { t: 'Listen. Then: "Do you want advice, or just a hug?"', fx: { trust: 10, wisdom: 8 }, lesson: 'listenfirst', then: [] },
      { t: 'Immediately list five solutions.', fx: { trust: -6 }, lesson: 'listenfirst', then: [] },
      { t: '"That\'s nothing, my day was worse."', fx: { trust: -10 }, lesson: 'listenfirst', then: [] },
    ] },
    SIM.todo('[7-2] You forgot a promise (her match / reading / clinic visit).'),
    { choice: 'She is upset.', opts: [
      { t: '"I forgot, and that wasn\'t okay. I know you were counting on me. How can I make it right?"', fx: { trust: 12, wisdom: 8 }, lesson: 'apology', then: [] },
      { t: '"Sorry you feel that way."', fx: { trust: -12 }, lesson: 'apology', then: [] },
      { t: '"I was tired. And you forgot something last month too."', fx: { trust: -12 }, lesson: 'apology', then: [] },
    ] },
    SIM.todo('[7-3] The fight escalates.'),
    { choice: 'Voices are getting louder...', opts: [
      { t: '"I can see this really hurt you."', fx: { trust: 10 }, lesson: 'dismissing', then: [] },
      { t: '"You\'re overreacting."', fx: { trust: -15 }, lesson: 'dismissing', then: [] },
      { t: 'Bring up something she did three months ago.', fx: { trust: -10 }, lesson: 'dismissing', then: [] },
    ] },
    SIM.todo('[7-4] You are both too upset to talk well.'),
    { choice: 'Now what?', opts: [
      { t: '"I need 20 minutes to calm down. I\'ll come back and we\'ll talk."', fx: { trust: 10, self: 5 }, lesson: 'stonewalling', then: [] },
      { t: 'Silent treatment for three days.', fx: { trust: -15 }, lesson: 'stonewalling', then: [] },
      { t: '"Maybe we should just break up then."', if: SIM.inRelationship, lesson: 'breakupthreat', then: [
        { badEnd: { title: 'BAD END #14 — She Took You Seriously', text: 'Never threaten to leave to win a fight. Only say it if you mean it.' } }] },
    ] },
    SIM.todo('[7-5] Next day. Repair conversation. Mr. Ogawa: "My marriage didn\'t end because we fought. It ended because we stopped repairing."'),
    { choice: 'Time to talk properly.', opts: [
      { t: 'Say your own need clearly ("I need a heads-up when plans change") and ask for hers.', fx: { trust: 15, wisdom: 10 }, lesson: 'repair', then: [] },
      { t: 'Expect her to "just know" what you need.', fx: { trust: -8 }, lesson: 'mindreading', then: [] },
      { t: 'Pretend nothing happened.', fx: { trust: -5 }, lesson: 'repair', then: [] },
    ] },
    { chapterEnd: true },
  ],
};
