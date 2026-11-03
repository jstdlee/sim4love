/* Chapter 11 — "The First Fight". Listening, real apologies, no contempt, time-outs instead of silent treatment,
   saying your needs out loud, repair. Solo route: the same fight, with Haziq. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const PROMISE = {
    hina: 'her first-aid competition prize-giving',
    mio: 'her reading at the library',
    kaede: 'her relay final',
    yuna: 'her showcase dress rehearsal',
    chloe: 'her stall at the youth enterprise fair',
    preet: 'her debate prize-giving',
  };
  const R = (f) => SIM.byRoute(Object.fromEntries(SIM.HEROINES.map((h) => [h, f(h)])), []);

  window.CHAPTERS.ch11 = {
    id: 'ch11', part: "Part III — Being Together", title: "Chapter 11", subtitle: "The First Fight",
    next: "Chapter 12 — Closeness", status: 'done',
    script: [
      SIM.gate(),
      { bg: 'night' },
      WEAR('home'),
      { n: "October. Monsoon season. Promos. It's rained for nine days straight and everyone is one bad day away from crying." },
      SIM.split([
        // 11-1 listen first
        { bg: 'cafe' },
        WEAR('school'),
        { s: '@route', e: 'sad', at: 'center', t: "Today was the worst. Cher read my mark out loud, my best friend ignored me at recess, and my mum says I'm \"always on the phone with that boy\"." },
        { choice: "She's venting. What do you do?", opts: [
          { t: "Listen. Repeat back what you heard. Then: \"You want advice, or just a hug?\"", fx: { '@route': 8, trust: 8, wisdom: 4 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'shy', t: "...Just a hug. And maybe chicken rice. Advice tomorrow." },
          ] },
          { t: "Immediately list five solutions.", fx: { '@route': -4, trust: -2 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'neutral', t: "I know how to email a teacher. I wanted you on my side for five minutes." },
          ] },
          { t: "\"That's nothing. My day was worse.\"", fx: { '@route': -8, trust: -6 }, lesson: 'listenfirst', then: [
            { s: '@route', e: 'sad', t: "Okay. Tell me about your day then." },
            { mochi: "Not a competition. It was her turn.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },

        // 11-2 the forgotten promise
        { bg: 'bedroom' },
        WEAR('home'),
        R((h) => [{ n: `Saturday, 4:40 PM. You wake up from a nap. Six missed calls. You promised to come to ${PROMISE[h]}. It started at three.` }]),
        { phone: '@route' }, { txt: '@route', t: "you said you'd come." }, { phoneOff: true },
        { choice: "You messed up. How do you apologise?", opts: [
          { t: "Properly: say what you did, own it, no \"but\", ask how to make it right.", fx: { trust: 10, '@route': 6, self: 4 }, lesson: 'apology', then: [
            { txt: 'me', t: "I said I'd be there and I wasn't. I fell asleep. No excuse. I'm really sorry. Can I make it up to you?" },
            { txt: '@route', t: "thanks for not making excuses. come for dinner. you're buying the satay." },
          ] },
          { t: "\"Sorry you feel that way.\"", fx: { trust: -10, '@route': -6 }, lesson: 'apology', then: [
            { txt: '@route', t: "that's not an apology. that's a weather report." },
          ] },
          { t: "\"I was tired. And you also forgot my thing last month.\"", fx: { trust: -8, '@route': -6 }, lesson: 'apology', then: [
            { mochi: "An apology with a \"but\" is a counter-attack wearing a tie.", e: 'angry' },
          ] },
        ] },

        // 11-3 escalation
        { bg: 'street' },
        WEAR('out'),
        { s: '@route', e: 'angry', at: 'center', t: "It's not just today. You keep saying you'll come and then you don't. I feel like I'm always the one trying!" },
        { choice: "Her voice is shaking. Yours wants to go up.", opts: [
          { t: "\"I can see this really hurt you.\"", fx: { trust: 8, '@route': 6, wisdom: 4 }, lesson: 'dismissing', then: [
            { s: '@route', e: 'sad', t: "...It did. Thanks for saying that instead of arguing." },
          ] },
          { t: "\"You're overreacting. It's one event.\"", fx: { trust: -12, '@route': -8 }, lesson: 'dismissing', then: [
            { s: '@route', e: 'angry', t: "Don't tell me what I feel." },
          ] },
          { t: "\"Oh, like YOU never forget? Remember April?\"", fx: { trust: -10, '@route': -6 }, lesson: 'dismissing', then: [
            { mochi: "One problem just became seven. Stay on this one.", e: 'sad' },
          ] },
        ] },

        // 11-4 time-out vs silent treatment vs breakup threat
        { n: "You're both upset now. The rain on the bus stop roof gets louder." },
        { choice: "What happens next?", opts: [
          { t: "\"I need twenty minutes to cool down. Then I'll come back and we talk. Promise.\"", fx: { trust: 8, self: 4, wisdom: 4 }, lesson: 'stonewalling', then: [
            { n: "You walk around the block twice. Twenty minutes later you text: \"Back. Can talk?\" She replies in five seconds." },
          ] },
          { t: "Walk off and say nothing for three days.", fx: { trust: -15, '@route': -10 }, lesson: 'stonewalling', then: [
            { phone: '@route' }, { txt: '@route', t: "are we okay?" }, { txt: '@route', t: "hello?" }, { txt: '@route', t: "I guess not." }, { phoneOff: true },
            { mochi: "A short break you promise to come back from: healthy. Vanishing: not.", e: 'sad' },
          ] },
          { t: "\"Maybe we should just break up then.\" (You don't mean it.)", fx: { trust: -30 }, lesson: 'breakupthreat', then: [
            { s: '@route', e: 'sad', at: 'center', t: "...Okay. If that's what you want. I'm not going to beg." },
            { badEnd: { title: "BAD END #14 — She Took You Seriously",
              text: "Threatening a breakup to win a fight teaches the other person the relationship is never safe. Sometimes they believe you. If you need a break from the fight, ask for twenty minutes, not an ending." } },
          ] },
        ] },
        { hide: '*' },

        // 11-5 repair
        { bg: 'rooftop' }, WEAR('out'), { bgm: 'reflect' },
        { n: "Next day. The rain's finally stopped. You meet at the rooftop garden of her block." },
        { choice: "Time to fix it. What do you say?", opts: [
          { t: "Say what you need, then ask hers: \"I need a heads-up when plans change. What do you need from me?\"", fx: { trust: 10, '@route': 6, self: 4, wisdom: 4 }, lesson: 'repair', then: [
            { s: '@route', e: 'happy', at: 'center', t: "I need you to show up when you say you will. If you can't, tell me before, not after. ...Okay. We can do this." },
          ] },
          { t: "Expect her to \"just know\" what you need.", fx: { trust: -6 }, lesson: 'mindreading', then: [
            { mochi: "She's your girlfriend, not a mind-reader.", e: 'smug' },
          ] },
          { t: "Pretend nothing happened. Buy her bubble tea.", fx: { trust: -2, cash: -6 }, lesson: 'repair', then: [
            { n: "The bubble tea is nice. The problem is still there, under the pearls." },
          ] },
        ] },
        { hide: '*' },
        { talk: 'coupletime' },
      ], [
        // solo branch: the fight is with Haziq
        { bg: 'hawker' },
        WEAR('out'),
        { s: 'kenta', e: 'sad', at: 'center', t: "Bro. Nadia broke up with me, my dad scolded me over my results, and Coach benched me. Worst week." },
        { choice: "Haziq is venting.", opts: [
          { t: "Listen. Then: \"You want advice, or you want me to just sit here?\"", fx: { kenta: 8, wisdom: 4 }, lesson: 'listenfirst', then: [
            { s: 'kenta', e: 'neutral', t: "Just sit. And order another plate of carrot cake. Black." },
          ] },
          { t: "\"At least you had a girlfriend. My week worse.\"", fx: { kenta: -6 }, lesson: 'listenfirst', then: [
            { s: 'kenta', e: 'sad', t: "Oh. Okay. Sorry. Your turn, I guess." },
          ] },
        ] },
        { hide: '*' },
        { bg: 'bedroom' },
        WEAR('home'),
        { n: "Saturday. You promised to come to Haziq's basketball final. You fall asleep. Six missed calls." },
        { choice: "You let him down.", opts: [
          { t: "Call him: \"I said I'd come and I didn't. No excuse. Sorry. Supper on me?\"", fx: { kenta: 10, self: 4 }, lesson: 'apology', then: [
            { s: 'kenta', e: 'happy', t: "We lost anyway. But okay. Prata. Double egg. Forgiven." },
          ] },
          { t: "\"Chill lah. It's just basketball.\"", fx: { kenta: -10 }, lesson: 'dismissing', then: [
            { s: 'kenta', e: 'angry', t: "It's not \"just\" anything to me. Forget it." },
          ] },
        ] },
        { choice: "Haziq stops replying. Days pass.", opts: [
          { t: "Text first: \"Miss you bro. Can talk? I'll listen first.\"", fx: { kenta: 8, wisdom: 4 }, lesson: 'repair', then: [
            { txt: 'kenta', t: "ok. void deck. 8pm. bring your own kopi" },
          ] },
          { t: "Wait for him to \"just know\" you're sorry.", fx: { kenta: -6 }, lesson: 'mindreading', then: [
            { mochi: "He's not going to read your mind. Nobody is. Ever.", e: 'smug' },
          ] },
          { t: "Go silent too. Two can play.", fx: { kenta: -8 }, lesson: 'stonewalling', then: [
            { mochi: "Nobody wins a silence.", e: 'sad' },
          ] },
        ] },
      ]),

      // mentor beat: Uncle Ong over Chinese chess
      { bg: 'voiddeck' },
      WEAR('out', { ogawa: 'nightclass' }),
      { show: 'ogawa', e: 'neutral', at: 'center' },
      { n: "The void deck, after his café closes. Uncle Ong has the Chinese chess board out. He's beating you in eleven moves." },
      { s: 'ogawa', e: 'neutral', t: "You know why my marriage ended? Not because we fought. Everybody fights." },
      { s: 'ogawa', e: 'sad', t: "We just never finished any of them. Every fight, stack on top of the next one. Like these pieces. Your move." },
      { hide: '*' },
      SIM.evening('ch11'),
      { chapterEnd: true },
    ],
  };
})();
