/* Chapter 14 — "Prelims & Storm Season". Focus, sleep, supporting her, small lies, a possible breakup, and recovery.
   A healthy breakup sets flags.kindGoodbye = heroine id and moves the story to the solo route. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const WHY = {
    hina: 'Her nenek was admitted to hospital last week. Hanis has been visiting every evening, then studying until 2 AM, and she says she\'s "fine" in a voice that is not fine.',
    mio: 'Her parents found out her prelim chemistry grade. Now it\'s medicine-or-nothing at every dinner. Xin Yi hasn\'t written a word of her own in a month.',
    kaede: 'She tore a hamstring two weeks before the SEA Games selection trial. Her parents are overseas, and her aunt keeps saying it\'s "a sign to focus on studies".',
    yuna: 'A clip of hers went viral for the wrong reasons. The comments are vicious, her mum is working double shifts, and Elise has stopped streaming.',
  };
  const ALIBI = { hina: 'Elise', mio: 'Elise', kaede: 'Elise', yuna: 'Haziq' };
  const R = (f) => SIM.byRoute({ hina: f('hina'), mio: f('mio'), kaede: f('kaede'), yuna: f('yuna') }, []);
  const goodbye = (extra) => R((h) => [{ flag: { kindGoodbye: h, brokeUp14: true } }, { route: 'solo' }].concat(extra || []));
  const endIt = (h) => [{ flag: { brokeUp14: true } }, { route: 'solo' }];

  const breakup = [
    { show: '@route', e: 'sad', at: 'center' },
    { s: '@route', e: 'sad', t: 'I\'ve been thinking about this for weeks. I care about you. But I don\'t think we\'re good for each other right now. I need to end it.' },
    { choice: 'Your chest goes very tight.', opts: [
      { t: '"It hurts. But I respect it. Thank you for everything, really."', fx: { self: 10, wisdom: 8 }, lesson: 'breakup', then: [
        { s: '@route', e: 'shy', t: '...Thank you for making this the kind of goodbye I can remember without wincing.' },
        { n: 'She walks to the MRT. You don\'t follow. That is the hardest, kindest thing you have done all year.' },
        goodbye(),
      ] },
      { t: 'Beg. Send forty messages tonight. Wait outside her block tomorrow.', fx: { self: -12, wisdom: -8 }, lesson: 'breakup', then: [
        { s: '@route', e: 'angry', t: 'Please stop. Waiting outside my home is scary, not romantic. I mean it: we\'re done.' },
        { mochi: 'No means no for breakups too. Following someone who left is not love. It is a reason for her to feel unsafe.', e: 'sad' },
        R(endIt),
      ] },
      { t: 'Post a revenge story about her and find her new friends\' accounts.', fx: { self: -20, wisdom: -15 }, lesson: 'breakup', then: [
        { badEnd: { title: 'BAD END #18 — Main Character Syndrome',
          text: 'She left, and you made it a show: a revenge post, then watching her new friends\' accounts. That is harassment, and it is the opposite of love. A breakup is not a betrayal you get to punish. It hurts, and the only healthy move is to let her go and look after yourself.' } },
      ] },
    ] },
    { hide: '*' },
  ];

  window.CHAPTERS.ch14 = {
    id: 'ch14', part: 'Part IV — Real Life', title: 'Chapter 14', subtitle: 'Prelims & Storm Season',
    next: 'Chapter 15 — Results Day', status: 'done',
    script: [
      SIM.gate(),
      { bg: 'library' },
      { n: 'August. JC2 prelims in five weeks, A-levels in ten. The library smells of highlighters and panic.' },

      // 14-1 focus
      SIM.split([
        { phone: '{her}' },
        { txt: '@route', t: 'are u there' },
        { txt: '@route', t: 'helloooo' },
        { txt: '@route', t: 'why aren\'t u replying 🥺' },
        { phoneOff: true },
        { think: 'Study block, 7 to 10. I\'ve answered every message for a week and remembered nothing. I\'ve skipped CCA twice to be "available".' },
      ], [
        { phone: 'boys only 🏀' },
        { txt: 'kenta', t: 'bro one game. ONE. ok three' },
        { txt: 'kenta', t: 'u skipped cca again? coach asked' },
        { phoneOff: true },
        { think: 'Study block, 7 to 10. I\'ve been gaming with Haziq every night and skipped CCA twice. My notes are a crime scene.' },
      ]),
      { choice: 'The study block is slipping away.', opts: [
        { t: 'Agree on phone-free hours, one call at 10, and go back to CCA.', fx: { goal: 10, passion: 4, trust: 4, self: 4 }, lesson: 'focus', then: [
          SIM.split([{ txt: '@route', t: 'ok that\'s actually smart. 10pm call. i\'ll do the same 📚' }], [{ txt: 'kenta', t: 'fine. 10pm one game. and cca saturday, i\'ll come watch' }]),
          { mochi: 'Being always available is not love. It is a slow way of disappearing.', e: 'happy' },
        ] },
        { t: 'Answer every message. Skip CCA again.', fx: { goal: -8, passion: -6, self: -6 }, lesson: 'selfneglect', then: [
          { mochi: 'You studied nothing, played nothing, and she still felt ignored because you were half there. Everyone lost.', e: 'sad' },
        ] },
        { t: 'Go silent without telling anyone.', fx: { goal: 4, trust: -6 }, lesson: 'focus', then: [
          { mochi: 'Right idea, missing one sentence: "I\'m studying until 10, talk then." Silence without a reason reads as a problem.', e: 'smug' },
        ] },
      ] },

      // 14-2 sleep
      { bg: 'bedroom' },
      { n: 'Three all-nighters. Four cans of energy drink on the desk. Your hands are shaking slightly, which you decide is "focus".' },
      { choice: 'It\'s 2 AM. Paper 2 is tomorrow.', opts: [
        { t: 'Close the books. Eat, shower, sleep. Walk to school in the morning.', fx: { health: 12, goal: 6 }, lesson: 'sleep', then: [
          { mochi: 'Memory is filed while you sleep. An all-nighter is studying with the save button switched off.', e: 'doctor' },
        ] },
        { t: 'A fourth all-nighter. Just one more.', fx: { health: -10, goal: -4 }, lesson: 'sleep', then: [
          { n: 'You read the same paragraph eleven times. In the morning you can\'t remember the formula you wrote at 4 AM.' },
          { choice: 'Paper 3 is tomorrow. The energy drink is right there.', opts: [
            { t: 'Stop. Sleep tonight, whatever happens.', fx: { health: 8 }, lesson: 'sleep' },
            { t: 'A fifth all-nighter.', fx: { health: -20 }, then: [
              { badEnd: { title: 'BAD END #22 — Energy Drink Speedrun',
                text: 'Five nights without sleep, then you fell asleep twenty minutes into the paper. Sleep isn\'t a reward for finishing work; it is how your brain stores it. Exhausted students do worse, not better, and too much caffeine can also cause palpitations and anxiety.' } },
            ] },
          ] },
        ] },
      ] },

      // 14-3 support
      SIM.split([
        { bg: 'mrt' },
        { show: '@route', e: 'sad', at: 'center' },
        R((h) => [{ n: WHY[h] }]),
        { s: '@route', e: 'sad', t: 'I\'m so tired. Of everything. Sorry. I\'m being dramatic.' },
        { choice: 'She\'s crying quietly on the platform.', opts: [
          { t: 'Sit with her. Listen. "You don\'t have to be okay. Would talking to the school counsellor help? I\'ll walk you there."', fx: { trust: 10, wisdom: 6, '@route': 4 }, lesson: 'support', then: [
            { s: '@route', e: 'shy', t: '...You didn\'t try to fix it. Thank you. Maybe I will see the counsellor. Will you wait outside?' },
            { resource: 'mentalhealth' },
          ] },
          { t: '"Cheer up. You\'re being dramatic. Everyone\'s stressed."', fx: { trust: -10, wisdom: -6 }, lesson: 'support', then: [
            { s: '@route', e: 'sad', t: 'Right. Forget I said anything.' },
            { mochi: 'She told you she was drowning and you graded her swimming. Listen first. Always.', e: 'sad' },
          ] },
          { t: 'Become her only support. Midnight calls, every night, skip your own revision.', fx: { trust: 4, health: -8, goal: -6 }, lesson: 'support', then: [
            { mochi: 'Kind, and not sustainable. You are not a counsellor and you cannot be her only one. Help her reach other people, and look after yourself too.', e: 'sad' },
            { resource: 'mentalhealth' },
          ] },
        ] },
        { hide: '*' },
      ], [
        { bg: 'night' },
        { show: 'kenta', e: 'sad', at: 'center' },
        { s: 'kenta', e: 'sad', t: 'My dad said if I don\'t get into poly engineering I\'m "wasting the family\'s money". I can\'t sleep, bro. I just... can\'t.' },
        { choice: 'Haziq never talks like this.', opts: [
          { t: 'Listen. Then: "Want me to come with you to the school counsellor?"', fx: { kenta: 10, wisdom: 6 }, lesson: 'support', then: [
            { s: 'kenta', e: 'neutral', t: '...Yeah. Okay. Don\'t tell the group chat.' },
            { resource: 'mentalhealth' },
          ] },
          { t: '"Bro, man up."', fx: { kenta: -10, wisdom: -6 }, lesson: 'support', then: [
            { mochi: 'Boys are told to "man up" right up until they stop talking at all. Listen to him.', e: 'sad' },
          ] },
        ] },
        { hide: '*' },
      ]),

      // 14-4 a small lie
      { bg: 'mall' },
      SIM.split([
        R((h) => [{ n: `You told {her} you were studying tonight. You are at the mall arcade with ${ALIBI[h]}, and it was fun right up until ${ALIBI[h]} posted a story.` }]),
        { phone: '{her}' },
        { txt: '@route', t: 'studying huh. nice arcade 🙂' },
        { phoneOff: true },
      ], [
        { n: 'You told Mum you were studying at the library. You are at the arcade with Haziq. Mum has just texted: "Which library? I\'m driving past to pick you up."' },
      ]),
      { choice: 'Caught in a small lie.', opts: [
        { t: 'Come clean immediately. "I lied. I needed a break and didn\'t want to admit it. Sorry."', fx: { trust: 6, self: 6, wisdom: 4 }, lesson: 'smalllies', then: [
          SIM.split([{ txt: '@route', t: 'thank u for not making it worse. next time just say "i need a break" lol. i\'d have come' }],
            [{ n: 'Mum picks you up from the arcade, unimpressed, and buys you both bubble tea anyway. "Next time just tell me."' }]),
        ] },
        { t: 'Double down with a bigger lie.', fx: { trust: -10, self: -4 }, lesson: 'smalllies', then: [
          { mochi: 'A lie told to cover a lie needs a third lie to cover it. You are now running a small, failing company.', e: 'smug' },
        ] },
        { t: 'Get Haziq to fake an alibi in the group chat.', fx: { trust: -15, wisdom: -10 }, then: [
          { badEnd: { title: 'BAD END #17 — The Alibi Group Chat',
            text: 'Haziq posted a fake library photo. It had yesterday\'s date on the whiteboard. Now it isn\'t a small lie: it is a planned deception with a witness. Small lies grow. The cheapest moment to tell the truth is always the first one.' } },
        ] },
      ] },

      // 14-5 breakup branch
      SIM.split([
        { bg: 'night' },
        { if: (s) => s.stats.trust < 30, then: breakup, else: [
          { show: '@route', e: 'neutral', at: 'center' },
          { n: 'After the prelims. You\'re both exhausted, and it has been a hard term for the two of you.' },
          { choice: 'Where are you two?', opts: [
            { t: 'Still in it. "This term was rough. Let\'s get through the A-levels together."', fx: { trust: 4 } },
            { t: 'Be honest: you think it might be time to end it, and say so kindly.', fx: { self: 6, wisdom: 6 }, lesson: 'breakup', then: [
              { s: '@route', e: 'sad', t: '...I\'ve been feeling it too. I\'m sad. But I\'m glad you said it gently, and to my face.' },
              { n: 'You both cry a little at the void deck, and then share the last curry puff. It\'s the right ending. It\'s still an ending.' },
              goodbye(),
            ] },
          ] },
          { hide: '*' },
        ] },
      ], [
        { n: 'After the prelims. Nadia breaks up with Haziq, kindly and clearly. Haziq does not take it kindly or clearly.' },
      ]),

      // 14-6 recovery
      { if: (s) => s.flags.brokeUp14, then: [
        { bg: 'bedroom' },
        { n: '3 AM. Her profile is open on your phone. Your thumb is hovering over your old chats.' },
        { choice: '3 AM.', opts: [
          { t: 'Close it. Mute her for a while. Message Haziq in the morning. Back to the routines that make you you.', fx: { passion: 8, health: 8, self: 6 }, lesson: 'recovery', then: [
            { mochi: 'Muting isn\'t hating her. It\'s giving your heart a cast while it heals.', e: 'happy' },
          ] },
          { t: 'Read every old message until sunrise.', fx: { health: -8, self: -4 }, lesson: 'recovery', then: [
            { mochi: 'Re-reading old chats is pressing on a bruise to check it still hurts. It does. Put the phone down.', e: 'sad' },
          ] },
          { t: 'Send "u up?"', fx: { self: -8, trust: -4 }, lesson: 'recovery', then: [
            { n: 'Read at 3:04 AM. No reply. Which is, honestly, the healthiest reply possible.' },
          ] },
        ] },
      ], else: [SIM.split([], [
        { bg: 'night' },
        { phone: 'Haziq' },
        { txt: 'kenta', t: '3am. on her profile. should i text her. i\'m gonna text her' },
        { phoneOff: true },
        { choice: 'Haziq at 3 AM.', opts: [
          { t: '"Don\'t. Mute her for a while. Run with me at 7. Supper on me tomorrow."', fx: { kenta: 10, health: 4 }, lesson: 'recovery', then: [
            { txt: 'kenta', t: 'ok. muted. 7am. if u oversleep i\'m telling mei' },
          ] },
          { t: '"Send it, what\'s the worst that could happen."', fx: { kenta: -6, wisdom: -6 }, lesson: 'recovery', then: [
            { mochi: 'The worst that could happen is exactly what happened. Read, no reply, and Haziq feeling worse at 3:05.', e: 'sad' },
          ] },
        ] },
      ])] },

      // financial-support talk (still together) and Think Deeper
      SIM.split([
        { bg: 'cafe' },
        { n: 'The class trip after the A-levels costs $480. {her} can\'t afford it this year.' },
        { talk: 'support' },
      ]),
      { bg: 'classroom' },
      { deeper: 'careerpressure' },
      { bg: 'bedroom' },
      { show: 'mei', e: 'neutral', at: 'center' },
      { s: 'mei', t: 'Losing someone doesn\'t mean you lost. Did you become a better person this year? Then you won something.' },
      { hide: '*' },
      SIM.evening('ch14'),
      { chapterEnd: true },
    ],
  };
})();
