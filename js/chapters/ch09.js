/* Chapter 9 — "After 'Yes'". Honeymoon traps and keeping your own life. Solo route: the same lessons, with friends. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch9 = {
  id: 'ch9', part: 'Part III — Being Together', title: 'Chapter 9', subtitle: 'After "Yes"',
  next: 'Chapter 10 — Green-Eyed Monster', status: 'done',
  script: [
    SIM.gate(),
    { bg: 'bedroom' },
    { variant: 'mochi.morning' },
    SIM.split([
      // 9-1 effort drop
      { n: 'Two weeks in. Saturday. You planned nothing. A new game just dropped.' },
      { phone: '@route' }, { txt: '@route', t: 'are we doing anything today? 🙂' }, { phoneOff: true },
      { choice: 'It\'s the third Saturday in a row with no plan...', opts: [
        { t: 'Plan a small date around something she mentioned last week.', fx: { '@route': 8, trust: 6, wisdom: 4 }, lesson: 'effortdrop', then: [
          SIM.byRoute({
            hina: [{ bg: 'park' }, { s: 'hina', e: 'happy', at: 'center', t: 'The old dragon playground! I told you about it once. ONCE. You remembered.' }],
            mio: [{ bg: 'library' }, { s: 'mio', e: 'happy', at: 'center', t: 'A bookshop crawl? Three shops? ...I\'m going to need a bigger bag.' }],
            kaede: [{ bg: 'park' }, { s: 'kaede', e: 'happy', at: 'center', t: 'A 7 AM run and then prata. You are speaking my language. You\'re slow, but you\'re speaking it.' }],
            yuna: [{ bg: 'park' }, { s: 'yuna', e: 'shy', at: 'center', t: 'Can we... not post today? Just walk around the Botanic Gardens like normal people?' }],
          }, [{ n: 'A good, small Saturday.' }]),
        ] },
        { t: '"Can we just stay in? I\'m in a raid."', fx: { '@route': -8, trust: -6 }, lesson: 'effortdrop', then: [
          { txt: '@route', t: 'oh. okay. again.' },
          { mochi: 'At the start you planned everything. Now you plan raids. She noticed the switch.', e: 'sad' },
        ] },
        { t: 'Go out, but stay on Discord the whole date.', fx: { '@route': -4, trust: -3 }, lesson: 'presence', then: [
          { s: '@route', e: 'sad', at: 'center', t: 'Should I come back when your game finishes?' },
        ] },
      ] },
      { hide: '*' },

      // 9-2 too fast
      { bg: 'night' },
      { n: 'Day eight. You feel SO in love. Your thumbs are typing things.' },
      { choice: 'What do you do with all this feeling?', opts: [
        { t: 'Tell her specifically what you like about being with her.', fx: { '@route': 6, trust: 6 }, lesson: 'toofast', then: [
          { s: '@route', e: 'blush', at: 'center', t: 'That\'s... really specific. I like it. I like you.' },
        ] },
        { t: 'Say "I love you", pick names for your future kids, change your bio to "her husband".', fx: { '@route': -6, trust: -6, proj: 8 }, lesson: 'toofast', then: [
          { s: '@route', e: 'surprised', at: 'center', t: '...Husband? It\'s been eight days. Can we slow down a little? It\'s a lot.' },
        ] },
        { t: 'Ask her to post couple photos to "make it official".', fx: { trust: -4 }, lesson: 'toofast', then: [
          { s: '@route', e: 'neutral', at: 'center', t: 'Why does it need to be on the internet to be real?' },
        ] },
      ] },
      { hide: '*' },

      // 9-3 locker room
      { bg: 'field' },
      { show: 'takumi', e: 'smug', at: 'left' }, { show: 'ren', e: 'smug', at: 'right' },
      { s: 'ren', e: 'smug', t: 'So how far did you go? 😏 Details, bro.' },
      { choice: 'The boys are waiting for a story...', opts: [
        { t: '"That\'s between us." And move on.', fx: { trust: 8, self: 6 }, lesson: 'kissandtell', then: [
          { s: 'takumi', e: 'neutral', t: 'Respect, I guess. Boring, but respect.' },
        ] },
        { t: 'Exaggerate. Make it sound like more.', fx: { trust: -20, self: -8 }, lesson: 'kissandtell', then: [
          { n: 'The rumour reaches her friends by Wednesday. She hears a version of herself that never happened.' },
          { s: '@route', e: 'angry', at: 'center', t: 'Why are people saying that about me? Did you say that?' },
        ] },
        { t: 'Show them her private messages.', fx: { trust: -30 }, lesson: 'kissandtell', then: [
          { n: 'Ryan screenshots it. It\'s in four group chats by recess.' },
          { badEnd: { title: 'BAD END #11 — Group Chat Hall of Shame',
            text: 'What someone shares with you in private is trust, not content. Once it\'s in a group chat, you can never take it back. "That\'s between us" is the only answer.' } },
        ] },
      ] },
      { hide: '*' },

      // 9-4 Haziq's birthday
      { bg: 'karaoke' },
      { phone: 'Haziq 🏀' }, { txt: 'kenta', t: 'bro my bday KTV sat. u coming? u cancelled 3 times already lol. no pressure. (pressure)' }, { phoneOff: true },
      { choice: 'You\'ve cancelled on Haziq three times...', opts: [
        { t: 'Go. Tell her. She says "of course, have fun!"', fx: { kenta: 12, trust: 4, self: 4 }, lesson: 'ownlife', then: [
          { s: 'kenta', e: 'happy', at: 'center', t: 'HE CAME. EVERYBODY, HE CAME. Okay. Mic. You\'re singing Ah Lian song with me.' },
        ] },
        { t: 'Cancel again. You\'d rather see her.', fx: { kenta: -12, self: -6 }, flag: 'broStall', lesson: 'ownlife', then: [
          { txt: 'kenta', t: 'ok bro. all good.' }, { mochi: 'He said "all good". It is not all good. He\'s going to stop asking.', e: 'sad' },
        ] },
        { t: 'Bring her along without asking anyone.', fx: { kenta: -4 }, lesson: 'ownlife', then: [
          { n: 'The boys go quiet. She sits in the corner on her phone. Nobody has fun, especially her.' },
        ] },
      ] },
      { hide: '*' },

      // 9-5 one month
      { bg: 'street' },
      { n: 'One month. A mini anniversary.' },
      { choice: 'What do you do?', opts: [
        { t: 'Something small, built from things you know about her.', fx: { '@route': 10, trust: 8 }, lesson: 'remember', then: [
          SIM.byRoute({
            hina: [{ s: 'hina', e: 'blush', at: 'center', t: 'You... made ME a bento? With egg hearts? They\'re lopsided. I love them.' }],
            mio: [{ s: 'mio', e: 'blush', at: 'center', t: 'A letter. Hand-written. Like the postman. ...I\'m going to keep this forever. Don\'t look at me.' }],
            kaede: [{ s: 'kaede', e: 'happy', at: 'center', t: 'You timed my splits and made a chart? With stickers? This is the nerdiest gift. Perfect.' }],
            yuna: [{ s: 'yuna', e: 'blush', at: 'center', t: 'You made a playlist of songs I sang in KTV? Even the bad ones? Especially the bad ones.' }],
          }, []),
        ] },
        { t: 'Forget, then "it\'s just a month lol".', fx: { '@route': -10, trust: -8 }, lesson: 'remember', then: [
          { s: '@route', e: 'sad', at: 'center', t: 'Yeah. Just a month.' },
        ] },
        { t: 'An expensive surprise. $200 of flowers delivered to her class.', fx: { cash: -200, trust: -2 }, lesson: 'buyinglove', then: [
          { s: '@route', e: 'surprised', at: 'center', t: 'Everyone was staring... it\'s nice, but now I feel like I owe you something. I don\'t like that feeling.' },
        ] },
      ] },

      // 9-6 date budget
      { bg: 'mall' },
      { think: 'My date budget this month is $60. A fancy restaurant would really impress her...' },
      { choice: 'Next date...', opts: [
        { t: 'Cheap and good: cook together, a park, the library. Split the kopi.', fx: { '@route': 6, trust: 4, wallet: 4 }, lesson: 'datebudget', then: [
          { s: '@route', e: 'happy', at: 'center', t: 'This is the best date. I didn\'t have to wear uncomfortable shoes.' },
        ] },
        { t: 'Book the fancy place with a buy-now-pay-later app.', fx: { cash: -140, wallet: -10 }, lesson: 'datebudget', then: [
          { n: 'The food is tiny. The bill is not. You spend the next month paying for three bites of foam.' },
        ] },
        { t: 'Go, then sulk about the bill all night.', fx: { '@route': -6, cash: -90 }, lesson: 'datebudget', then: [
          { s: '@route', e: 'sad', at: 'center', t: 'I would have been happy with chicken rice, you know.' },
        ] },
      ] },
      { talk: 'gifts' },
      { deeper: 'genderwar' },
    ], [
      // solo branch
      { n: 'No girlfriend. Just you, school, {passion}, and Haziq, who has decided you are his project.' },
      { s: 'kenta', e: 'happy', at: 'center', t: 'Single bros club! First rule: we don\'t cancel on each other.' },
      { phone: 'boys only 🏀' }, { txt: 'ren', t: 'yo did anyone go anywhere with anyone over the holidays 😏 details' }, { phoneOff: true },
      { choice: 'Ryan wants gossip about a girl from your class...', opts: [
        { t: '"Not my story to tell, bro."', fx: { self: 6, wisdom: 6 }, lesson: 'kissandtell', then: [{ s: 'kenta', e: 'happy', t: 'Ryan, be quiet. Basketball.' }] },
        { t: 'Make something up for laughs.', fx: { self: -8, wisdom: -6 }, lesson: 'kissandtell', then: [{ mochi: 'A rumour about a real person, invented for laughs. She has to live inside it.', e: 'angry' }] },
      ] },
      { choice: 'Haziq\'s birthday KTV, Saturday.', opts: [
        { t: 'Go. Obviously.', fx: { kenta: 12, self: 4 }, lesson: 'ownlife', then: [{ s: 'kenta', e: 'happy', t: 'MY BRO. Okay. Mic.' }] },
        { t: 'Skip it to finish an assignment.', fx: { goal: 6, kenta: -6 }, then: [{ n: 'You finish the assignment. Haziq sends you a video of himself singing your part.' }] },
      ] },
      SIM.evening('ch9'),
      { talk: 'gifts' },
      { deeper: 'genderwar' },
    ]),
    { chapterEnd: true },
  ],
};
