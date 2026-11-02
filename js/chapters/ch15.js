/* Chapter 15 — "Results Day". Supporting her dream and keeping yours; Haziq's shame; Rae's callback; Dad and your passion. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const DREAM = {
    hina: { what: 'a place in the nursing degree, with long shift placements at the hospital', far: 'You\'ll barely see each other on placement weeks.' },
    mio: { what: 'a writing programme in Melbourne', far: 'Six hours of flying and three hours of time difference.' },
    kaede: { what: 'an athletics scholarship at a university in the US', far: 'Twelve time zones. She leaves in August.' },
    yuna: { what: 'a place at a dance academy in Seoul', far: 'Two years, six hours away.' },
  };
  const R = (f) => SIM.byRoute({ hina: f('hina'), mio: f('mio'), kaede: f('kaede'), yuna: f('yuna') }, []);

  window.CHAPTERS.ch15 = {
    id: 'ch15', part: 'Part IV — Real Life', title: 'Chapter 15', subtitle: 'Results Day',
    next: 'Chapter 16 — Book Out', status: 'done',
    script: [
      SIM.gate(),
      { bg: 'gradhall' },
      { n: 'February. The school hall, a long table of envelopes, and two hundred people pretending to be calm. Your NS enlistment letter came last week.' },
      { n: 'You open yours. It\'s good. Not perfect. Good. Enough for the course you wanted.' },

      // 15-1 her dream
      SIM.split([
        { show: '@route', e: 'surprised', at: 'center' },
        R((h) => [{ s: '@route', e: 'happy', t: `I got it. I got ${DREAM[h].what}.` }, { think: DREAM[h].far }]),
        { s: '@route', e: 'shy', t: '...Say something?' },
        { choice: 'Her dream just came true, and part of it is far away.', opts: [
          { t: '"I\'ll miss you like crazy. Go. Let\'s figure out how we stay close."', fx: { trust: 12, self: 4, '@route': 6 }, lesson: 'supportdreams', flag: 'supportedDream', then: [
            { s: '@route', e: 'blush', t: 'I was so scared you\'d ask me not to. Thank you. Really.' },
          ] },
          { t: '"If you loved me, you\'d stay."', fx: { trust: -15, wisdom: -8 }, lesson: 'supportdreams', then: [
            { s: '@route', e: 'sad', t: 'That isn\'t fair. You\'re making me choose between you and my life.' },
            { mochi: 'Guilt is not a reason to stay. It is a reason to resent. Love that shrinks someone isn\'t love.', e: 'angry' },
          ] },
          { t: 'Say "congrats" and sulk for a week.', fx: { trust: -6 }, lesson: 'supportdreams', then: [
            { mochi: 'A sulk is a demand that hasn\'t found the courage to speak. Say the real thing: "I\'m happy for you and I\'m scared."', e: 'sad' },
          ] },
        ] },
        { hide: '*' },
      ], [
        { show: 'mei', e: 'happy', at: 'center' },
        { s: 'mei', e: 'happy', t: 'Guess who got the overseas internship. Six months in Tokyo. Mum is already crying about it.' },
        { choice: 'Your sister is leaving for half a year.', opts: [
          { t: '"Go! I\'ll handle Mum. Send me photos of every vending machine."', fx: { self: 4, wisdom: 4 }, lesson: 'supportdreams', then: [
            { s: 'mei', e: 'happy', t: 'Who are you and what did you do with my annoying little brother?' },
          ] },
          { t: '"Who\'s going to help me with everything then?"', fx: { self: -4 }, lesson: 'supportdreams', then: [
            { s: 'mei', e: 'neutral', t: 'You are. You\'re eighteen. You\'ll be great at it, actually.' },
          ] },
        ] },
        { hide: '*' },
      ]),

      // 15-5 Dad and your passion
      { bg: 'dining' },
      { show: 'dad', e: 'neutral', at: 'center' },
      { s: 'dad', t: 'Results are good. So now drop the {passion}. It won\'t pay the bills. Serious time.' },
      { choice: 'Dinner has gone very quiet.', opts: [
        { t: 'Show him your plan: passion hours, grades, a budget. Ask for a trial year during NS weekends.', fx: { passion: 8, goal: 6, self: 8, wisdom: 4 }, lesson: 'familytalk', then: [
          { s: 'dad', e: 'neutral', t: '...You made a spreadsheet. With colours.' },
          { s: 'dad', e: 'happy', t: 'One year. If your grades hold. And I want to come to the first show.' },
        ] },
        { t: 'Shout and slam the door.', fx: { self: -4, health: -4 }, lesson: 'familytalk', then: [
          { mochi: 'The door is now closed. So is the conversation. Your dad is scared for you; give him something to be less scared of.', e: 'sad' },
        ] },
        { t: 'Say nothing, and secretly quit.', fx: { passion: -15, self: -8 }, lesson: 'familytalk', then: [
          { mochi: 'You gave up the thing that makes you you, to avoid one awkward dinner. Bad trade, rookie.', e: 'sad' },
        ] },
      ] },
      { hide: '*' },

      // 15-2 your offer
      { n: 'A week later your own letter arrives: a place on the course for {passion}, deferred until after NS. You can start the weekend programme now.' },
      SIM.split([
        { show: '@route', e: 'neutral', at: 'center' },
        { s: '@route', e: 'neutral', t: 'Couldn\'t you take the course at my uni instead? Then we\'d at least be in the same place.' },
      ], [
        { show: 'kenta', e: 'neutral', at: 'center' },
        { s: 'kenta', e: 'neutral', t: 'Or come do engineering at my poly with me! We could be lab partners. Who needs {passion}?' },
      ]),
      { choice: 'Your offer, or theirs?', opts: [
        { t: '"I\'m going. I want this. Let\'s work out how we stay close."', fx: { goal: 8, passion: 8, self: 10 }, lesson: 'dontshrink', flag: 'keptDream', then: [
          SIM.split([{ s: '@route', e: 'happy', t: 'Good. I\'d have felt awful if you gave it up for me. I\'m proud of you.' }],
            [{ s: 'kenta', e: 'happy', t: 'Yeah, ok. You\'d be a terrible lab partner anyway. Proud of you, bro.' }]),
        ] },
        { t: 'Turn it down "for them".', fx: { goal: -12, passion: -12, self: -10 }, lesson: 'dontshrink', then: [
          { mochi: 'Making yourself smaller doesn\'t make the relationship bigger. It just leaves less of you in it.', e: 'sad' },
        ] },
        { t: 'Accept it without talking to anyone.', fx: { goal: 6, passion: 6, trust: -4 }, lesson: 'dontshrink', flag: 'keptDream', then: [
          { mochi: 'Right decision. Wrong method. Big choices go down better when the people you love hear them from you first.', e: 'smug' },
        ] },
      ] },
      { hide: '*' },

      // 15-3 Haziq and Alpha Kai
      { bg: 'field' },
      { n: 'Alpha Kai\'s livestream gets exposed: fake testimonials, rented cars, a refund page that doesn\'t load.' },
      { show: 'kenta', e: 'sad', at: 'center' },
      { s: 'kenta', e: 'sad', t: 'Bro. I bought his course. $998. From my part-time money. I feel so stupid.' },
      { choice: 'Haziq can\'t look at you.', opts: [
        { t: '"We\'ve all fallen for stuff. Let\'s try for a refund, then prata on me."', fx: { kenta: 12, wisdom: 4 }, lesson: 'brosupport', ach: 'unsubscribed2', then: [
          { s: 'kenta', e: 'happy', t: '...Two prata. Egg. And you\'re helping me write the complaint to the bank.' },
          { mochi: 'Shame keeps people quiet, and quiet is what scammers need. You just made it easier for him to talk.', e: 'happy' },
        ] },
        { t: 'Post it in the group chat as a joke.', fx: { kenta: -15, wisdom: -6 }, lesson: 'brosupport', then: [
          { s: 'kenta', e: 'angry', t: 'Seriously? I told YOU. Not forty people.' },
        ] },
      ] },
      { hide: '*' },

      // 15-4 Rae
      { if: (s) => s.flags.reiRedemption, then: [
        { bg: 'gradhall' },
        { show: 'rei', e: 'neutral', at: 'center' },
        { s: 'rei', e: 'neutral', t: 'The police opened a case against Mr. G. I gave a statement. Three other girls did too.' },
        { s: 'rei', e: 'happy', t: 'Thank you for not trying to "save" me with money. You gave me a phone number. That was the thing that actually worked.' },
        { choice: 'Rae is smiling for real, for the first time since you met her.', opts: [
          { t: 'Stay a friend, with boundaries. "Glad you\'re okay. Kopi sometime?"', fx: { wisdom: 6, self: 4, rei: 6 }, lesson: 'rescuer', then: [
            { s: 'rei', e: 'happy', t: 'Kopi sometime. As friends. I\'d like that.' },
          ] },
          { t: 'Ask her out.', fx: { rei: -2 }, lesson: 'rescuer', then: [
            { s: 'rei', e: 'neutral', t: 'That\'s kind. And no. I need time to be just me for a while. Friends?' },
            { me: 'Friends. Of course.' },
          ] },
        ] },
        { hide: '*' },
      ] },

      // learning talk + Think Deeper
      { bg: 'hawker' },
      SIM.split([{ talk: 'learning' }], [{ talk: 'learning' }]),
      { deeper: 'nstiming' },
      SIM.split([
        R((h) => [{ bg: h === 'hina' ? 'mrt' : 'airport' }, { n: h === 'hina' ? 'You see Hanis off at the MRT for her first hospital placement week. It\'s not the airport, but it feels like one.' : 'Changi, Terminal 3. Her family, your family, too many snacks. A long hug at the gate.' }]),
        { show: '@route', e: 'shy', at: 'center' },
        { s: '@route', e: 'shy', t: 'Sunday calls. Goodnight messages. And you send me your first recording.' },
        { hide: '*' },
      ]),
      SIM.evening('ch15'),
      { chapterEnd: true },
    ],
  };
})();
