/* Chapter 6 — "Green-Eyed Monster". Design: docs/CHAPTERS.md#chapter-6--green-eyed-monster
   STATUS: outline. Her male friend: hina→Shun (cousin), mio→Haruki (book club), kaede→Riku (relay), yuna→Leo (dance). */
CHAPTERS.ch6 = {
  id: 'ch6', title: 'Chapter 6', subtitle: 'Green-Eyed Monster', next: 'Chapter 7 — The First Fight', status: 'outline',
  script: [
    { bg: 'street' },
    SIM.split([
      SIM.todo('[6-1] You see {her} laughing with her male friend after school.'),
      { choice: 'Your stomach drops...', opts: [
        { t: 'Calm down first, then: "I felt a bit jealous — can I meet him?"', fx: { trust: 10, wisdom: 8 }, lesson: 'jealousy', then: [] },
        { t: 'Sulk. Answer her messages with "k".', fx: { trust: -10 }, lesson: 'jealousy', then: [] },
        { t: 'Confront him in front of everyone.', lesson: 'jealousy', then: [
          { badEnd: { title: 'BAD END #12 — It Was Her Cousin', text: '(Variant per route.) Jealousy is a feeling, not a fact. Talk before you act.' } }] },
      ] },
      SIM.todo('[6-2] Her phone lights up on the table: "[friend]: about tomorrow..." She is in the bathroom.'),
      { choice: 'The phone is right there...', opts: [
        { t: 'Don\'t touch it.', fx: { trust: 5, self: 5 }, lesson: 'snooping', then: [] },
        { t: 'Read the chat.', fx: { trust: -30 }, lesson: 'snooping', flag: 'snooped', then: [SIM.todo('She comes back and sees you.')] },
        { t: 'Install a tracking app "just in case".', lesson: 'snooping', then: [
          { badEnd: { title: 'BAD END #13 — Trust.exe Has Stopped Working', text: 'Tracking someone destroys more trust than anything you could ever find.' } }] },
      ] },
    ], [
      SIM.todo('SOLO: Kenta is jealous of Nana\'s classmate and wants to check her phone. Advise him.'),
      { choice: 'Kenta: "Should I check her phone, bro?"', opts: [
        { t: '"No. Tell her how you feel."', fx: { wisdom: 10 }, lesson: 'snooping', then: [] },
        { t: '"Yeah, you deserve to know."', fx: { wisdom: -10 }, lesson: 'snooping', then: [] },
      ] },
    ]),

    SIM.todo('[6-3] Alpha Kai: "Real men know where their woman is 24/7."'),
    { choice: 'Alpha Kai is still talking...', opts: [
      { t: 'Close the video.', fx: { wisdom: 8 }, lesson: 'control', ach: 'unsubscribed2', then: [] },
      { t: 'Demand location sharing: "If you have nothing to hide..."', if: SIM.inRelationship, fx: { trust: -20 }, lesson: 'control', then: [] },
      { t: 'Ask Kenta (says "do it bro"), then Mr. Ogawa (says don\'t).', fx: { wisdom: 5 }, ach: 'askOgawa', then: [] },
    ] },

    SIM.split([
      SIM.todo('[6-4] {her}: "Why do you still text Rei / Yuna?"'),
      { choice: '{her} looks hurt.', opts: [
        { t: 'Be open and show her the chat if she wants.', fx: { trust: 12 }, lesson: 'honesty', then: [] },
        { t: '"Why are you checking on me? Don\'t you trust me?"', fx: { trust: -15 }, lesson: 'doublestandard', then: [] },
      ] },
      SIM.todo('[6-5] {her} wins something big the same day you fail a test.'),
      { choice: 'She is glowing.', opts: [
        { t: 'Celebrate her fully. Your feelings can wait until later.', fx: { trust: 12 }, lesson: 'celebrate', then: [] },
        { t: '"It\'s not that big a deal."', fx: { trust: -12 }, lesson: 'celebrate', then: [] },
        { t: 'Make the evening about your failed test.', fx: { trust: -5 }, lesson: 'celebrate', then: [] },
      ] },
    ]),
    { chapterEnd: true },
  ],
};
