/* Chapter 8 — "National Day". Why her, confessing well, accepting the answer, route lock. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const H = {
    hina: { intro: 'Hanis is on the steps of the Esplanade, holding two cups of bandung.',
      yes: 'I... yes. Obviously yes. I\'ve been cutting eggs into hearts for weeks, you blur sotong.',
      no: 'You\'re one of my favourite people. But I don\'t feel that way. I\'m sorry. I really am.' },
    mio: { intro: 'Xin Yi is sitting on the waterfront rail, writing something about the fireworks.',
      yes: '...Yes. Can I write this down? I want to remember exactly how the sky looked.',
      no: 'I like talking to you so much. But not like that. I hope that\'s... okay.' },
    kaede: { intro: 'Kavya is doing calf stretches by the Merlion, because of course she is.',
      yes: 'Yes. Don\'t make it weird. ...Okay, make it a little weird. Yes.',
      no: 'I respect you. Honestly. But no. I want to be straight with you, not keep you guessing.' },
    yuna: { intro: 'Elise has her phone in her pocket. Not filming. Just watching the sky.',
      yes: 'Yes. And... can we not post about it for a while? I want one thing that\'s just mine.',
      no: 'You\'re the first boy who saw the real me. That\'s why I want to be honest: I don\'t feel the same.' },
  };
  const answer = (h) => [
    { if: (s) => (s.stats[h] || 0) >= 40 && !s.flags.liedFishpond, then: [
      { s: h, e: 'blush', at: 'center', t: H[h].yes },
      { choice: 'The fireworks are still going. You want to hold her hand.', opts: [
        { t: '"Can I hold your hand?"', fx: { [h]: 6, wisdom: 6 }, lesson: 'consent', then: [
          { s: h, e: 'happy', t: 'You asked. ...Yes.' },
        ] },
        { t: 'Just grab it. It\'s romantic.', fx: { [h]: -6 }, lesson: 'consent', then: [
          { s: h, e: 'surprised', t: '—oh! (She flinches, then laughs it off.) Next time, maybe ask? I startle easily.' },
        ] },
      ] },
      { route: h },
      { mochi: 'Congratulations. You got a "yes". The hard part starts now.', e: 'happy' },
    ], else: [
      { s: h, e: 'sad', at: 'center', t: H[h].no },
      { choice: 'She said no.', opts: [
        { t: '"Thank you for being honest. I\'m really glad I told you. Friends still?"', fx: { [h]: 10, self: 10, wisdom: 8 }, lesson: 'rejection', ach: 'respect100', then: [
          { s: h, e: 'happy', t: 'Friends. Definitely. ...That was really kind of you.' },
          { route: 'solo' },
        ] },
        { t: '"I\'ll wait forever, until you change your mind."', fx: { self: -10, proj: 8 }, lesson: 'rejection', then: [
          { s: h, e: 'sad', t: 'Please don\'t. I don\'t want you to put your life on hold for me.' },
          { route: 'solo' },
        ] },
        { t: '"After everything I did for you?!"', fx: { [h]: -20, self: -15 }, lesson: 'rejection', then: [
          { s: h, e: 'angry', t: 'I didn\'t know your kindness came with an invoice.' },
          { badEnd: { title: 'BAD END #10 — Nice Guy™',
            text: 'Being kind to someone does not mean she owes you a relationship. "After all I did for you" turns past kindness into a bill. Take no with grace: it proves you were a good person to like.' } },
        ] },
      ] },
    ] },
  ];
  const confessTo = (h) => [
    { bg: 'fireworks' }, { n: H[h].intro }, { show: h, e: 'neutral', at: 'center' },
    { choice: 'How do you tell her?', opts: [
      { t: 'Somewhere quiet. Simple and honest: "I like you. You don\'t have to answer now."', fx: { [h]: 6, wisdom: 6 }, lesson: 'publicpressure', then: answer(h) },
      { t: 'Grab the NDP watch-party mic and confess in front of the whole school.', fx: { [h]: -15 }, lesson: 'publicpressure', then: [
        { n: 'Three hundred phones come out. She goes very red, and not the good red.' },
        { s: h, e: 'angry', t: 'Why would you do this HERE? Now if I say no I\'m the villain.' },
        ...answer(h),
      ] },
      { t: 'Text her. Twenty emojis.', fx: { [h]: -4 }, lesson: 'publicpressure', then: [
        { phone: { hina: 'Hanis', mio: 'Xin Yi', kaede: 'Kavya', yuna: 'Elise' }[h] }, { txt: 'me', t: 'i like u 😳😳💕💕🌸🌸🎆🎆🥺🥺💘💘✨✨🙈🙈❤️❤️🔥🔥' }, { phoneOff: true },
        { n: 'She calls instead. "Can you say that with words? To my face?" She\'s walking over.' },
        ...answer(h),
      ] },
    ] },
  ];
  const can = (h) => (s) => (s.stats[h] || 0) >= 30 && (h !== 'yuna' || s.flags.yunaClarity);

  window.CHAPTERS.ch8 = {
    id: 'ch8', part: 'Part II — Behind the Filter', title: 'Chapter 8', subtitle: 'National Day',
    next: 'Chapter 9 — After "Yes"', status: 'done',
    script: [
      { bg: 'park' },
      { n: '9 August. The NDP watch party at the community club. Everyone is in red. The uncle with the flag on his bicycle is here again.' },
      { s: 'kenta', e: 'happy', at: 'center', t: 'Bro. Tonight\'s the night, right? Fireworks. Confession. Romance. I\'ll hold your bag.' },
      { talk: 'whylike' },
      { hide: '*' },

      // 8-1 why her
      { bg: 'night' },
      { mochi: 'Before the fireworks. One question. Why her? Whoever "her" is.', e: 'neutral' },
      { choice: 'Why her?', opts: [
        { t: 'Because of how she treats people, and who I am when we\'re together.', fx: { wisdom: 8, proj: -6 }, lesson: 'whyher', then: [
          { mochi: 'That\'s a real reason. It will still be true in ten years.', e: 'happy' } ] },
        { t: '"She\'s the prettiest."', fx: { proj: 8 }, lesson: 'whyher', then: [
          { mochi: 'Pretty is fine. Pretty is not a personality. What happens on her bad days?', e: 'neutral' } ] },
        { t: '"I can\'t live without her."', fx: { self: -8, proj: 6 }, lesson: 'whyher', then: [
          { mochi: 'You lived without her for seventeen years. You were fine. "Can\'t live without" is a hostage note, not a love letter.', e: 'sad' } ] },
      ] },

      // 8-2 who
      { bg: 'fireworks' },
      { n: 'The first firework goes up over the bay. Everyone gasps.' },
      { choice: 'Who do you want to tell?', opts: [
        { t: 'Hanis.', if: can('hina'), then: confessTo('hina') },
        { t: 'Xin Yi.', if: can('mio'), then: confessTo('mio') },
        { t: 'Kavya.', if: can('kaede'), then: confessTo('kaede') },
        { t: 'Elise.', if: can('yuna'), then: confessTo('yuna') },
        { t: '"Not now. This year I\'m focusing on my exams and {passion}."', fx: { goal: 8, passion: 8, self: 10 }, lesson: 'ownlife', then: [
          { route: 'solo' },
          { mochi: 'No girlfriend, but you kept something better: your dignity. Also me.', e: 'happy' },
        ] },
      ] },
      { bg: 'night' },
      { n: 'The last firework fades. Somewhere, the uncle on the bicycle is singing Home, badly and beautifully.' },
      { chapterEnd: true },
    ],
  };
})();
