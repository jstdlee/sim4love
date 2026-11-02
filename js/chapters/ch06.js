/* Chapter 6 — "Carnival Week". Supporting vs saving, the rescuer trap, the fish-pond check, masks, your own stage. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch6 = {
  id: 'ch6', part: 'Part II — Behind the Filter', title: 'Chapter 6', subtitle: 'Carnival Week',
  next: 'Chapter 7 — Behind the Screen', status: 'done',
  script: [
    { bg: 'carnival' },
    { n: 'JC Carnival Week. Fairy lights, a dunk tank, and a stall selling "artisanal" Milo for $6.' },

    // 6-1 Hanis burnout
    { show: 'hina', e: 'sad', at: 'center' },
    { n: 'Hanis is running the student council booth. Alone. Her eyes are red.' },
    { s: 'hina', e: 'sad', t: 'Three people dropped out. The banner fell down. And I have a chem test tomorrow. I\'m fine. I\'m totally fine.' },
    { choice: 'Hanis is "totally fine"...', opts: [
      { t: '"Do you want help, or do you want to vent first? Either is fine."', fx: { hina: 12, wisdom: 8 }, lesson: 'supportnotsave', rose: true, then: [
        { s: 'hina', e: 'surprised', t: '...Vent first. Then help. Then vent again probably.' },
        { n: 'She vents. You hold the banner. Then she tells you exactly where the tape goes. She\'s the boss of the booth, still.' },
      ] },
      { t: '"Relax, I\'ll take over. Go home." Start rearranging everything.', fx: { hina: -4, self: 2 }, lesson: 'supportnotsave', then: [
        { s: 'hina', e: 'angry', t: 'I didn\'t ask you to TAKE OVER. It\'s my booth. I just... needed one person to not be useless.' },
      ] },
      { t: '"You\'re overreacting. It\'s just a carnival."', fx: { hina: -10 }, lesson: 'dismissing', then: [
        { s: 'hina', e: 'sad', t: 'Okay. Thanks.' },
      ] },
    ] },
    { hide: '*' },

    // 6-2 Rae again
    { bg: 'night' },
    { if: (s) => s.flags.reiHasLine, then: [{ phone: 'Rae 🌙' }], else: [{ phone: '+65 8••• ••••' }] },
    { txt: 'rei', t: 'I\'m sorry about before. I\'m not okay. my "manager" says I owe them $3000. I don\'t know what to do' },
    { txt: 'rei', t: 'if you loved me you\'d save me' },
    { choice: 'Rae says she\'s trapped...', opts: [
      { t: '"I can\'t save you, and I won\'t send money. But if you\'re in trouble, here\'s the Anti-Scam Helpline and a counsellor line. Call them. That\'s real help."', fx: { wisdom: 12, self: 8 }, flag: 'reiRedemption', lesson: 'rescuer', rose: true, then: [
        { txt: 'rei', t: '...' }, { txt: 'rei', t: 'no one\'s ever just told me the number before.' }, { phoneOff: true },
        { mochi: 'You didn\'t become her hero. You gave her a door. That\'s the most anyone can do.', e: 'happy' },
      ] },
      { t: 'Promise to pay off her debt yourself. You\'ll be her hero.', fx: { cash: -150, self: -10, proj: 10 }, lesson: 'rescuer', then: [
        { txt: 'rei', t: 'omg thank you. the rest by Friday? 🥺' }, { phoneOff: true },
        { n: 'Friday. Then the Friday after. Then a new number: "Hi, I\'m Rae\'s cousin..."' },
        { badEnd: { title: 'BAD END #8 — Hero Mode: Off',
          text: '"If you loved me you\'d save me" is a lever, not a love letter. You cannot rescue someone by paying their way out of a scam they\'re running on you. Point to real help, then step back.' } },
      ] },
    ] },

    // 6-3 Marcus fish-pond check
    { bg: 'carnival' },
    { show: 'takumi', e: 'smug', at: 'center' },
    { s: 'takumi', e: 'smug', t: 'Bro. Big brain move: text all four of them "you\'re the only one I talk to like this". See who bites. That\'s a fish pond.' },
    { choice: 'Marcus is grinning...', opts: [
      { t: '"No. If I\'m talking to a few people, I\'ll just be honest that it\'s early and I\'m getting to know people."', fx: { wisdom: 10, self: 8, hina: 3, mio: 3, kaede: 3, yuna: 3 }, lesson: 'honestjuggle', rose: true, then: [
        { s: 'takumi', e: 'surprised', t: 'Huh. That\'s... boring. And weirdly attractive? Who taught you this.' },
        { mochi: 'Me. I taught you this.', e: 'smug' },
      ] },
      { t: 'Do it. Send all four the same message.', fx: { wisdom: -10, hina: -6, mio: -6, kaede: -6, yuna: -6 }, flag: 'liedFishpond', lesson: 'fishpond', then: [
        { n: 'Kavya and Elise are in the same CCA. They compare phones by lunch.' },
        { s: 'kaede', e: 'angry', at: 'left', t: '"The only one"?' },
        { s: 'yuna', e: 'angry', at: 'right', t: 'Same text. Same emoji. Wow.' },
        { badEnd: { title: 'BAD END #9 — The Fish Pond Keeper',
          text: 'You lied to four people at once to keep them all on the hook. People talk to each other. Getting to know a few people is normal; pretending each one is "the only one" is not.' } },
      ] },
    ] },
    { hide: '*' },

    // talk: promises
    { bg: 'carnival' },
    { n: 'The dunk tank. Hanis promised her council she\'d sit in it for one hour. It is very cold.' },
    { talk: 'promises' },

    // 6-4 polished mask
    { bg: 'carnival' },
    { n: 'Talent night. Marcus has a "personal brand" now: a rented watch, a pre-written monologue, and a fake British accent.' },
    { s: 'takumi', e: 'cool', at: 'left', t: 'Be mysterious, bro. Never let them see the real you. The real you is mid.' },
    { choice: 'Your turn to talk to people at the after-party...', opts: [
      { t: 'Be yourself. Bad jokes, real opinions, actual laugh.', fx: { self: 10, wisdom: 6, hina: 3, mio: 3, kaede: 3, yuna: 3 }, lesson: 'polishedmask', rose: true, then: [
        { n: 'Xin Yi laughs at your pun about bumboats. Kavya rolls her eyes and stays to argue about it. Real people stay for the real you.' },
      ] },
      { t: 'Borrow Marcus\'s accent.', fx: { self: -8, proj: 4 }, lesson: 'polishedmask', then: [
        { s: 'hina', e: 'surprised', at: 'right', t: 'Why are you talking like a BBC narrator? Are you sick?' },
      ] },
    ] },
    { hide: '*' },

    // 6-5 your own stage
    { bg: 'carnival' },
    { n: 'Open mic, last slot. Nobody signed up. The MC looks at the crowd.' },
    { choice: 'There\'s an empty slot...', opts: [
      { t: 'Sign up. Do three minutes of {passion}. Shaky, real, yours.', fx: { passion: 12, self: 10 }, lesson: 'ownstage', ach: 'ownStage', then: [
        { n: 'You mess up twice. Somebody claps anyway. Then a few more. Haziq stands on a chair.' },
        { s: 'kenta', e: 'happy', at: 'center', t: 'THAT\'S MY BRO!! Okay sit down, I\'m embarrassed now.' },
      ] },
      { t: 'Spend it in the crowd watching whoever you like most, hoping they notice you.', fx: { proj: 6, passion: -2 }, lesson: 'ownstage', then: [
        { mochi: 'You were in the audience of someone else\'s night. Again. You have a stage too, you know.', e: 'neutral' },
      ] },
    ] },
    { hide: '*' },
    SIM.evening('ch6'),
    { chapterEnd: true },
  ],
};
