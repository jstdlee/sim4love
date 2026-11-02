/* Chapter 9 — "Storm Season". Design: docs/CHAPTERS.md#chapter-9--storm-season
   STATUS: outline. Ends with a possible breakup branch (trust < 30) → kind goodbye path. */
CHAPTERS.ch9 = {
  id: 'ch9', title: 'Chapter 9', subtitle: 'Storm Season', next: 'Chapter 10 — What Love Actually Is', status: 'outline',
  script: [
    { bg: 'bedroom' },
    SIM.split([
      SIM.todo('[9-1] {her} is away for two weeks (camp / trip).'),
      { choice: 'Two weeks apart...', opts: [
        { t: 'Agree on a rhythm: a goodnight message and a call on Sunday.', fx: { trust: 10 }, lesson: 'distance', then: [] },
        { t: '"Why didn\'t you reply in 10 minutes?" ×30', fx: { trust: -15, self: -10 }, lesson: 'distance', then: [] },
        { t: '"Post less with other people."', fx: { trust: -10 }, lesson: 'control', then: [] },
      ] },
    ]),
    SIM.todo('[9-2] You have been skipping club and studying to be "always available".'),
    { choice: 'Exams are in a week.', opts: [
      { t: 'Go back to your own goals — and tell people about them.', fx: { self: 15 }, lesson: 'selfneglect', then: [] },
      { t: 'Keep skipping. Fail. Blame someone else.', fx: { self: -15, trust: -5 }, lesson: 'selfneglect', then: [] },
    ] },
    SIM.split([
      SIM.todo('[9-3] You said you were studying. You were at the arcade with Yuna/Rei. She sees a story.'),
      { choice: 'She asks: "Where were you?"', opts: [
        { t: 'Come clean immediately.', fx: { trust: 5, wisdom: 8 }, lesson: 'smalllies', then: [] },
        { t: 'Double down with a bigger lie.', fx: { trust: -25 }, lesson: 'smalllies', flag: 'liedArcade', then: [] },
        { t: 'Get Kenta to fake an alibi.', lesson: 'smalllies', then: [
          { badEnd: { title: 'BAD END #17 — The Alibi Group Chat', text: 'Kenta forwarded the plan to the wrong group. Small lies make big cracks.' } }] },
      ] },
      SIM.todo('[9-4] She can\'t afford the class-trip extras; you can.'),
      { choice: 'Money talk...', opts: [
        { t: 'Choose something you can both do, and talk openly about money.', fx: { trust: 8 }, lesson: 'money', then: [] },
        { t: 'Pay for everything — and remind her later.', fx: { trust: -10 }, lesson: 'money', then: [] },
        { t: 'Start a spreadsheet of who paid what.', fx: { trust: -5 }, lesson: 'money', then: [] },
      ] },
    ]),
    SIM.todo('[9-5] {her} (solo: Kenta) has been withdrawn, exhausted, crying.'),
    { choice: 'They\'re not okay.', opts: [
      { t: 'Be there, listen, and gently encourage talking to a counsellor or trusted adult.', fx: { trust: 12, wisdom: 10 }, lesson: 'support', then: [{ resource: 'mentalhealth' }] },
      { t: '"Cheer up, you\'re being dramatic."', fx: { trust: -20 }, lesson: 'dismissing', then: [] },
      { t: 'Try to be their only support until you burn out.', fx: { self: -10 }, lesson: 'support', then: [] },
    ] },
    { if: (s) => SIM.inRelationship(s) && s.stats.trust < 30, then: [
      SIM.todo('[9-6] {her}: "I think we need to end this."'),
      { choice: 'It hurts.', opts: [
        { t: '"It hurts, but I respect it. Thank you for everything."', fx: { self: 15, wisdom: 10 }, lesson: 'breakup', flag: 'kindGoodbye', then: [] },
        { t: 'Beg. Send 40 messages. Wait outside her house.', fx: { self: -20 }, lesson: 'breakup', then: [] },
        { t: 'Post a revenge story and stalk her new friends.', lesson: 'breakup', then: [
          { badEnd: { title: 'BAD END #18 — Main Character Syndrome', text: 'Revenge only proves they were right to leave. Grieve, lean on friends, and let go.' } }] },
      ] },
    ] },
    { mochi: 'Losing someone doesn\'t mean you lost. Did you become a better person? Then you won something.', e: 'neutral' },
    { chapterEnd: true },
  ],
};
