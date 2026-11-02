/* Chapter 11 — "The First Fight". Listening, real apologies, no contempt, time-outs instead of silent treatment,
   saying your needs out loud, repair. Solo route: the same fight, with Haziq. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const PROMISE = {
    hina: 'her first-aid competition prize-giving',
    mio: 'her reading at the library',
    kaede: 'her relay final',
    yuna: 'her showcase dress rehearsal',
  };
  const R = (f) => SIM.byRoute({ hina: f('hina'), mio: f('mio'), kaede: f('kaede'), yuna: f('yuna') }, []);

  window.CHAPTERS.ch11 = {
    id: 'ch11', part: 'Part III — Being Together', title: 'Chapter 11', subtitle: 'The First Fight',
    next: 'Chapter 12 — Closeness', status: 'done',
    script: [
      SIM.gate(),
      { bg: 'night' },
      { n: 'October. Monsoon season. Promotional exams. It has rained for nine days, and everyone is one bad day away from crying.' },
      SIM.split([
        // 11-1 listen first
        { bg: 'cafe' },
        { s: '@route', e: 'sad', at: 'center', t: 'Today was the worst. The teacher read my mark out loud, my best friend ignored me at recess, and my mum says I\'m "always on the phone with that boy".' },
        { choice: 'She\'s venting. What do you do?', opts: [
          { t: 'Listen. Say back what you heard. Then: "Do you want advice, or just a hug?"', fx: { '@route': 8, trust: 8, wisdom: 4 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'shy', t: '...Just a hug. And maybe chicken rice. Advice tomorrow.' },
          ] },
          { t: 'Instantly list five solutions.', fx: { '@route': -4, trust: -2 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'neutral', t: 'I know how to email a teacher. I wanted you to be on my side for five minutes.' },
          ] },
          { t: '"That\'s nothing. My day was worse."', fx: { '@route': -8, trust: -6 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'sad', t: 'Okay. Tell me about your day then.' },
            { mochi: 'Pain is not a competition. When she opens up, it is her turn.', e: 'sad' },
          ] },
        ] },
        { hide: '*' },

        // 11-2 the forgotten promise
        { bg: 'bedroom' },
        R((h) => [{ n: `Saturday, 4:40 PM. You wake up from a nap. Your phone shows six missed calls. You promised to come to ${PROMISE[h]}. It started at three.` }]),
        { phone: '@route' }, { txt: '@route', t: 'you said you\'d come.' }, { phoneOff: true },
        { choice: 'You messed up. How do you apologise?', opts: [
          { t: 'A real apology: name it, own it, no "but", and ask how to make it right.', fx: { trust: 10, '@route': 6, self: 4 }, lesson: 'apology', then: [
            { txt: 'me', t: 'I promised to be there and I wasn\'t. I fell asleep. No excuse. I\'m really sorry. Can I make it up to you?' },
            { txt: '@route', t: 'thank you for not making excuses. come for dinner. you\'re buying the satay.' },
          ] },
          { t: '"Sorry you feel that way."', fx: { trust: -10, '@route': -6 }, lesson: 'apology', then: [
            { txt: '@route', t: 'that\'s not an apology. that\'s a weather report.' },
          ] },
          { t: '"I was tired. And you forgot my thing last month anyway."', fx: { trust: -8, '@route': -6 }, lesson: 'apology', then: [
            { mochi: 'An apology with a "but" in it is a counter-attack wearing a tie.', e: 'angry' },
          ] },
        ] },

        // 11-3 escalation
        { bg: 'street' },
        { s: '@route', e: 'angry', at: 'center', t: 'It\'s not just today. You keep saying you\'ll come and then you don\'t. I feel like I\'m always the one who tries!' },
        { choice: 'Her voice is shaking. Yours wants to rise.', opts: [
          { t: '"I can see this really hurt you."', fx: { trust: 8, '@route': 6, wisdom: 4 }, lesson: 'dismissing', then: [
            { s: '@route', e: 'sad', t: '...It did. Thank you for saying that instead of arguing.' },
          ] },
          { t: '"You\'re overreacting. It\'s one event."', fx: { trust: -12, '@route': -8 }, lesson: 'dismissing', then: [
            { s: '@route', e: 'angry', t: 'Don\'t tell me what I feel.' },
          ] },
          { t: '"Oh, like YOU never forget? Remember April?"', fx: { trust: -10, '@route': -6 }, lesson: 'dismissing', then: [
            { mochi: 'Bringing up old mistakes turns one problem into seven. Stay on this one.', e: 'sad' },
          ] },
        ] },

        // 11-4 time-out vs silent treatment vs breakup threat
        { n: 'You are both upset now. The rain gets louder.' },
        { choice: 'What happens next?', opts: [
          { t: '"I need twenty minutes to calm down. I\'ll come back and we\'ll talk. I promise."', fx: { trust: 8, self: 4, wisdom: 4 }, lesson: 'stonewalling', then: [
            { n: 'You walk around the block twice. Twenty minutes later you knock. She opens the door. That is the promise kept.' },
          ] },
          { t: 'Walk away and say nothing for three days.', fx: { trust: -15, '@route': -10 }, lesson: 'stonewalling', then: [
            { phone: '@route' }, { txt: '@route', t: 'are we okay?' }, { txt: '@route', t: 'hello?' }, { txt: '@route', t: 'I guess not.' }, { phoneOff: true },
            { mochi: 'Silence as punishment is called stonewalling. A short, promised break is healthy. Disappearing is not.', e: 'sad' },
          ] },
          { t: '"Maybe we should just break up then." (You don\'t mean it.)', fx: { trust: -30 }, lesson: 'breakupthreat', then: [
            { s: '@route', e: 'sad', at: 'center', t: '...Okay. If that\'s what you want. I\'m not going to beg.' },
            { badEnd: { title: 'BAD END #14 — She Took You Seriously',
              text: 'Threatening to break up to win an argument teaches the other person that the relationship is never safe. Sometimes they believe you. Say what you mean, and if you need a break from the fight, ask for twenty minutes, not an ending.' } },
          ] },
        ] },
        { hide: '*' },

        // 11-5 repair
        { bg: 'rooftop' }, { bgm: 'reflect' },
        { n: 'The next day. The rain has stopped. You meet on the rooftop garden.' },
        { choice: 'Time to repair. What do you say?', opts: [
          { t: 'Say your own need clearly and ask for hers: "I need a heads-up when plans change. What do you need from me?"', fx: { trust: 10, '@route': 6, self: 4, wisdom: 4 }, lesson: 'repair', then: [
            { s: '@route', e: 'happy', at: 'center', t: 'I need you to show up when you say you will. And if you can\'t, tell me before, not after. ...We can do this.' },
          ] },
          { t: 'Expect her to "just know" what you need.', fx: { trust: -6 }, lesson: 'mindreading', then: [
            { mochi: 'She is a person, not a mind-reader. Needs that are never said can never be met.', e: 'smug' },
          ] },
          { t: 'Pretend nothing happened. Buy her bubble tea.', fx: { trust: -2, cash: -6 }, lesson: 'repair', then: [
            { n: 'The bubble tea is nice. The problem is still there, under the pearls.' },
          ] },
        ] },
        { hide: '*' },
        { talk: 'coupletime' },
      ], [
        // solo branch: the fight is with Haziq
        { bg: 'hawker' },
        { s: 'kenta', e: 'sad', at: 'center', t: 'Bro. Nadia broke up with me, my dad shouted at me about my results, and the coach benched me. Worst week.' },
        { choice: 'Haziq is venting.', opts: [
          { t: 'Listen. Then: "You want advice, or you just want me to sit here?"', fx: { kenta: 8, wisdom: 4 }, lesson: 'listenfirst', then: [
            { s: 'kenta', e: 'neutral', t: 'Just sit here. And order another plate of carrot cake. Black.' },
          ] },
          { t: '"At least you had a girlfriend. My week was worse."', fx: { kenta: -6 }, lesson: 'listenfirst', then: [
            { s: 'kenta', e: 'sad', t: 'Oh. Okay. Sorry. Your turn, I guess.' },
          ] },
        ] },
        { hide: '*' },
        { bg: 'bedroom' },
        { n: 'Saturday. You promised to come to Haziq\'s basketball final. You fall asleep. Six missed calls.' },
        { choice: 'You let him down.', opts: [
          { t: 'Call him: "I said I\'d come and I didn\'t. No excuse. I\'m sorry. Supper on me?"', fx: { kenta: 10, self: 4 }, lesson: 'apology', then: [
            { s: 'kenta', e: 'happy', t: 'We lost anyway. But okay. Prata. Double egg. You\'re forgiven.' },
          ] },
          { t: '"Chill, bro. It\'s just basketball."', fx: { kenta: -10 }, lesson: 'dismissing', then: [
            { s: 'kenta', e: 'angry', t: 'It\'s not "just" anything to me. Forget it.' },
          ] },
        ] },
        { choice: 'Haziq stops replying. Days pass.', opts: [
          { t: 'Text first: "I miss you, bro. Can we talk? I\'ll listen first."', fx: { kenta: 8, wisdom: 4 }, lesson: 'repair', then: [
            { txt: 'kenta', t: 'ok. void deck. 8pm. bring your own kopi' },
          ] },
          { t: 'Wait for him to "just know" you\'re sorry.', fx: { kenta: -6 }, lesson: 'mindreading', then: [
            { mochi: 'He is not going to read your mind. Neither is anyone else. Ever.', e: 'smug' },
          ] },
          { t: 'Go silent too. Two can play this game.', fx: { kenta: -8 }, lesson: 'stonewalling', then: [
            { mochi: 'It is not a game. Nobody wins a silence.', e: 'sad' },
          ] },
        ] },
      ]),

      // mentor beat: Uncle Ong over Chinese chess
      { bg: 'voiddeck' },
      { show: 'ogawa', e: 'neutral', at: 'center' },
      { n: 'The void deck. Uncle Ong has set up the Chinese chess board. He is beating you in eleven moves.' },
      { s: 'ogawa', e: 'neutral', t: 'You know why my marriage ended? Not because we fought. Everybody fights.' },
      { s: 'ogawa', e: 'sad', t: 'It ended because we stopped repairing. Every fight we never finished, we just stacked on top of the next one. Like these pieces. Your move.' },
      { hide: '*' },
      SIM.evening('ch11'),
      { chapterEnd: true },
    ],
  };
})();
