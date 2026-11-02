/* Chapter 17 — "Chalet Night". Refusing a drink, stepping in for someone at risk, drink safety, impulse, and chat privacy.
   Legal drinking age in Singapore is 18; plenty of guests don't drink and owe nobody a reason. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch17 = {
  id: 'ch17', part: 'Part V — On Your Own', title: 'Chapter 17', subtitle: 'Chalet Night',
  next: 'Chapter 18 — The Long Talk', status: 'done',
  script: [
    SIM.gate(),
    { bg: 'partyroom' },
    { n: 'A friend\'s 19th birthday at a chalet by the beach. Barbecue pit, a karaoke machine with one working microphone, and coolers of drinks.' },
    { n: 'The legal drinking age here is 18. Lots of people here drink. Lots don\'t, for religious, health or personal reasons, and nobody has to explain why.' },
    SIM.split([{ n: '{her} is here too, back for the holidays, deep in conversation with the birthday girl.' }],
      [{ n: 'Haziq is here, wearing sunglasses at night, which he says is "the look".' }]),

    // 17-1 peer pressure
    { s: 'Darren', t: 'Eh, new guy. One shot or you\'re not one of us. Come on!' },
    { choice: 'The whole table turns to look.', opts: [
      { t: '"I\'m good with lime juice." Smile. Say it again, calmly, if he pushes.', fx: { self: 10, wisdom: 4 }, lesson: 'peerpressure', ach: 'limeJuice', then: [
        { s: 'Darren', t: 'Aiyah, one only...' },
        { me: 'Lime juice. I\'m good. Thanks though.' },
        { n: 'He shrugs and moves on. Two other people quietly switch to lime juice too.' },
      ] },
      { t: 'Drink it to fit in.', fx: { self: -8, health: -4 }, lesson: 'peerpressure', then: [
        { mochi: 'You did not want it, you drank it, and Darren has already forgotten. The only person who remembers is you.', e: 'sad' },
      ] },
      { t: 'Pretend to drink and pour it into a plant.', fx: { self: -2 }, lesson: 'peerpressure', then: [
        { mochi: 'The plant did not ask for a shot either. A plain "no thanks" is easier, and you only have to say it once.', e: 'smug' },
      ] },
    ] },

    // 17-2 bystander
    { bg: 'beach' },
    { show: 'saki', e: 'sad', at: 'left' },
    { n: 'By the shore: Sam Wong, a friend of a friend, very drunk and barely standing. A guy she met tonight has his arm around her.' },
    { s: 'Guy', t: 'Relax, I\'ll take her home. My car\'s right there.' },
    { choice: 'Sam can\'t say where she lives.', opts: [
      { t: 'Step in. Stay with her, find her friends, get her home with someone she trusts. If she can\'t be woken, call 995.', fx: { wisdom: 10, self: 8 }, lesson: 'bystander', ach: 'bystander', then: [
        { me: 'It\'s okay, we\'ve got her. Sam, I\'m going to find Natalie. You\'re staying with us.' },
        { show: 'nana', e: 'surprised', at: 'right' },
        { s: 'nana', e: 'surprised', t: 'Sam! Okay. Water, sit her on her side. Thank you so much. Her sister is coming to get her.' },
        { n: 'The guy wanders off. Sam\'s sister arrives twenty minutes later. Sam texts the next day: "I don\'t remember much. Thank you for staying."' },
        { resource: 'alcohol' },
      ] },
      { t: '"Not my business."', fx: { wisdom: -10, self: -6 }, lesson: 'bystander', then: [
        { mochi: 'Someone too drunk to say her address cannot agree to go anywhere with anyone. You don\'t need to be a hero. You need to stay, and find her friends.', e: 'angry' },
        { resource: 'alcohol' },
      ] },
      { t: 'Ask him "you sure ah?" and walk away.', fx: { wisdom: -4 }, lesson: 'bystander', then: [
        { mochi: 'A question with no follow-up is an alibi, not help. Stay. Get her friends. Call for help if you need to.', e: 'sad' },
        { resource: 'alcohol' },
      ] },
    ] },
    { hide: '*' },

    // 17-3 drink safety
    { bg: 'partyroom' },
    { n: 'Back inside. You left your drink on the barbecue table for ten minutes while you were outside.' },
    { choice: 'Your cup is still there. Probably yours.', opts: [
      { t: 'Pour it away and get a fresh one.', fx: { health: 4, wisdom: 6 }, lesson: 'drinksafety', then: [
        { mochi: 'Drinks left alone can be tampered with, at any party, for anyone. A new cup costs nothing.', e: 'doctor' },
      ] },
      { t: 'Drink it anyway.', fx: { wisdom: -4 }, lesson: 'drinksafety', then: [
        { mochi: 'Probably fine. "Probably" is not a great safety plan. Watch your drink, and your friends\' drinks too.', e: 'sad' },
      ] },
    ] },

    // 17-4 impulse
    { show: 'nana', e: 'neutral', at: 'center' },
    { s: 'nana', e: 'neutral', t: 'You were really good with Sam earlier. Want to skip the rest of this and go somewhere quieter?' },
    { think: 'I met her three hours ago. I feel the pull anyway.' },
    SIM.split([
      { choice: 'You\'re with {her}. She\'s twenty metres away.', opts: [
        { t: '"That\'s kind of you. I\'m with someone, though. Let\'s go get Sam some water."', fx: { trust: 6, self: 8 }, lesson: 'impulse', then: [
          { s: 'nana', e: 'neutral', t: 'Fair. Lucky her. Water it is.' },
        ] },
        { t: 'Go with her. You\'ll figure it out later.', fx: { trust: -20, self: -10, wisdom: -8 }, lesson: 'impulse', then: [
          { mochi: 'A decision made in a heated minute, against a promise you made calmly. "Later" will be a very long talk.', e: 'angry' },
        ] },
      ] },
    ], [
      { choice: 'You like her. You also met her three hours ago.', opts: [
        { t: '"I\'d like to get to know you. Coffee on Saturday?"', fx: { self: 8, wisdom: 6 }, lesson: 'impulse', then: [
          { s: 'nana', e: 'surprised', t: '...Okay, that\'s weirdly charming. Saturday. You\'re buying.' },
          { mochi: 'Nothing wrong with her asking. The question was what YOU wanted, with a clear head. Good answer.', e: 'happy' },
        ] },
        { t: 'Go on impulse: no conversation, no plan, no protection.', fx: { self: -8, wisdom: -10, health: -4 }, lesson: 'impulse', then: [
          { mochi: 'Not a moral failing, and not a plan either. Impulse with no talk and no protection is how people get hurt, in every sense. Decide sober, decide together, decide prepared.', e: 'doctor' },
        ] },
        { t: 'Go along because Haziq and the others are cheering.', fx: { self: -8 }, lesson: 'impulse', then: [
          { mochi: 'A crowd cheering is not consent, and it is not your opinion either. Whose decision was that?', e: 'sad' },
        ] },
      ] },
    ]),
    { hide: '*' },

    // 17-5 chat privacy
    { bg: 'cafe' },
    { n: 'Next morning, breakfast. The group chat is passing round photos of a guest passed out on the chalet sofa, with drawings on his face.' },
    { choice: 'Forty people are typing "HAHAHA".', opts: [
      { t: 'Don\'t forward. Ask for the photos to be deleted. Message him to check he\'s okay.', fx: { wisdom: 8, self: 4 }, lesson: 'chatprivacy', then: [
        { n: 'A few replies trickle in: "ok fair. deleted. sorry."' },
        { n: 'He replies to you at noon: "thanks bro. head is dying. who drew on me." Nobody admits it.' },
      ] },
      { t: 'Forward it with a laughing emoji.', fx: { wisdom: -8 }, lesson: 'chatprivacy', then: [
        { mochi: 'He can\'t consent to being a meme while he\'s unconscious. Someone\'s worst night should not be the group\'s content.', e: 'angry' },
      ] },
    ] },

    // lending talk
    { s: 'ren', t: 'Morning, everyone. So, uh, quick one: can anyone spot me $200 till Friday?' },
    { talk: 'lending' },
    { mochi: 'An adult isn\'t someone who can drink. It\'s someone who can say no to a room.', e: 'happy' },
    SIM.evening('ch17'),
    { chapterEnd: true },
  ],
};
