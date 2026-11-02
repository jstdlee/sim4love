/* Chapter 10 — "Green-Eyed Monster". Jealousy, snooping, control, double standards, celebrating her wins.
   Solo route: Haziq is the jealous one; you are the friend who talks him down. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const FRIEND = {
    hina: { n: 'Faris', who: 'her cousin', what: 'first-aid drills', be: 'It Was Her Cousin' },
    mio: { n: 'Jun Hao', who: 'her co-editor on the school magazine', what: 'the magazine layout', be: 'It Was Her Editor' },
    kaede: { n: 'Arvind', who: 'her relay training partner', what: 'baton changes', be: 'It Was Her Relay Partner' },
    yuna: { n: 'Leo', who: 'her dance partner for the showcase', what: 'the lift in bar sixteen', be: 'It Was Her Dance Partner' },
  };
  const WIN = {
    hina: 'Hanis\'s team came first at the national first-aid competition.',
    mio: 'Xin Yi won the national youth short story prize.',
    kaede: 'Kavya broke the national schools record for the 400 m.',
    yuna: 'Elise got a callback for the arts school audition.',
  };
  const R = (f) => SIM.byRoute({ hina: f('hina'), mio: f('mio'), kaede: f('kaede'), yuna: f('yuna') }, []);

  window.CHAPTERS.ch10 = {
    id: 'ch10', part: 'Part III — Being Together', title: 'Chapter 10', subtitle: 'Green-Eyed Monster',
    next: 'Chapter 11 — The First Fight', status: 'done',
    script: [
      SIM.gate(),
      { bg: 'field' },
      { variant: 'mochi.morning' },
      SIM.split([
        // 10-1 jealousy
        R((h) => [
          { n: `After school. {her} is laughing at the edge of the field with a tall guy you have never met. ${FRIEND[h].n}. He says something; she laughs harder.` },
          { think: 'Why is she laughing like that? She never laughs like that at my jokes. ...Does she?' },
        ]),
        { mochi: 'There it is. The green-eyed monster. Feeling it is normal. Feeding it is a choice.', e: 'smug' },
        { choice: 'Your chest is tight. What do you do with it?', opts: [
          { t: 'Name it to yourself first. Later, calmly: "I felt a bit jealous. Can I meet him?"', fx: { trust: 8, wisdom: 6, self: 4 }, lesson: 'jealousy', then: [
            R((h) => [
              { s: h, e: 'happy', at: 'center', t: `Oh! That's ${FRIEND[h].n}, ${FRIEND[h].who}. Come, I'll introduce you. Thank you for just saying it.` },
              { n: `${FRIEND[h].n} shakes your hand and immediately complains about ${FRIEND[h].what}. He is extremely normal.` },
            ]),
          ] },
          { t: 'Sulk. Answer her messages with "k" all evening.', fx: { '@route': -8, trust: -8 }, lesson: 'jealousy', then: [
            { phone: '@route' }, { txt: '@route', t: 'did I do something?' }, { txt: 'me', t: 'k' }, { txt: '@route', t: '…ok' }, { phoneOff: true },
            { mochi: '"k" is not a feeling. It\'s a door you slammed while pretending it\'s open.', e: 'sad' },
          ] },
          { t: 'March over and confront him in front of everyone.', fx: { '@route': -20, trust: -25 }, lesson: 'jealousy', then: [
            R((h) => [
              { s: h, e: 'angry', at: 'center', t: `${FRIEND[h].n} is ${FRIEND[h].who}. Everyone is filming. Please go home.` },
              { badEnd: { title: `BAD END #12 — ${FRIEND[h].be}`,
                text: 'Jealousy tells a story fast, and the story is usually wrong. Feel it, name it to yourself, then ask calmly. A public confrontation humiliates her, her friend and you, and it shows her what your fear does when it is in charge.' } },
            ]),
          ] },
        ] },
        { hide: '*' },

        // 10-2 snooping
        { bg: 'cafe' },
        R((h) => [{ n: `A cafe after class. {her} goes to the washroom. Her phone lights up on the table: "${FRIEND[h].n}: about tomorrow…"` }]),
        { choice: 'The screen is still lit...', opts: [
          { t: 'Don\'t touch it. Turn it face down so you are not tempted.', fx: { trust: 6, self: 4, wisdom: 4 }, lesson: 'snooping', then: [
            { n: 'She comes back, glances at it and laughs. "He wants to swap tomorrow\'s practice. Boring." You did not need to know. Now you know anyway.' },
          ] },
          { t: 'Quickly read the chat. Just to be sure.', fx: { trust: -30, '@route': -10, self: -6 }, lesson: 'snooping', then: [
            { s: '@route', e: 'sad', at: 'center', t: 'You\'re reading my phone? ...I would have shown you if you asked. Now I don\'t know what you\'ll read next.' },
          ] },
          { t: 'Install a tracking app on it while she\'s away.', fx: { trust: -40 }, lesson: 'control', then: [
            { n: 'Two days later her phone flags an unknown app that shares her location. She finds out who installed it.' },
            { badEnd: { title: 'BAD END #13 — Trust.exe Has Stopped Working',
              text: 'Tracking a partner without consent is control, not care, and secretly installing spyware on someone\'s phone can be a crime. If you can\'t trust someone without watching them, the problem is not on their phone. Talk, or end it kindly.' } },
          ] },
        ] },
        { hide: '*' },

        // 10-3 Alpha Kai on control
        { bg: 'bedroom' },
        { phone: 'Alpha Kai 🔴 LIVE' },
        { txt: 'kai', t: 'Real men know where their woman is 24/7. Make her share her location. If she has nothing to hide, she won\'t mind. 💯' },
        { phoneOff: true },
        { choice: 'Alpha Kai is back on your feed...', opts: [
          { t: 'Close the video. Unfollow. Not interested.', fx: { wisdom: 6, self: 6, proj: -4 }, lesson: 'control', ach: 'unsubscribed1', then: [
            { mochi: 'A man selling "how to own your girlfriend" is selling you a lonelier life. Good riddance.', e: 'happy' },
          ] },
          { t: 'Text her: "Share your location. If you have nothing to hide…"', fx: { trust: -15, '@route': -8, wisdom: -6 }, lesson: 'control', then: [
            { phone: '@route' }, { txt: '@route', t: 'did someone tell you to say that? because it doesn\'t sound like you.' }, { phoneOff: true },
            { mochi: '"Nothing to hide" is how control dresses up as trust. Location sharing can be nice when both people freely want it. Demanded, it is a leash.', e: 'angry' },
          ] },
          { t: 'Ask Haziq. Then ask Uncle Ong.', fx: { wisdom: 4 }, lesson: 'control', ach: 'askOgawa', then: [
            { txt: 'kenta', t: 'do it bro. alpha moves 😤' },
            { show: 'ogawa', e: 'neutral', at: 'center' },
            { s: 'ogawa', e: 'sad', t: 'My ex-wife and I tracked each other for a year. Very accurate. We knew where the other person was every minute and had no idea who they were any more. Don\'t.' },
          ] },
        ] },
        { hide: '*' },

        // 10-4 double standard
        { bg: 'street' },
        { s: '@route', e: 'neutral', at: 'center', t: 'Can I ask something? Who\'s Rae? And Elise? Why do you still text them?' },
        { choice: 'She saw the names on your screen.', opts: [
          { t: 'Open and honest. Tell her who they are, and offer to show the chats if she wants.', fx: { trust: 10, '@route': 6, wisdom: 4 }, lesson: 'doublestandard', then: [
            { s: '@route', e: 'happy', t: 'I don\'t need to read them. I just needed you to not get weird about it. Thanks.' },
          ] },
          { t: '"Why are you checking on me? Don\'t you trust me?"', fx: { trust: -12, '@route': -8 }, lesson: 'doublestandard', then: [
            { s: '@route', e: 'angry', t: 'I asked one question. Last week you were upset about one guy I study with. Funny how that works.' },
            { mochi: 'The rules you want for her are the rules you have to live by. Otherwise it is not a rule. It is a double standard.', e: 'sad' },
          ] },
        ] },
        { hide: '*' },

        // 10-5 celebrate her wins
        { bg: 'classroom' },
        { n: 'Your maths test comes back. 38 out of 100. Ten minutes later, the class group chat explodes.' },
        R((h) => [{ n: WIN[h] }]),
        { choice: 'She runs over, glowing. You\'re holding a 38.', opts: [
          { t: 'Celebrate her fully. Your test can wait for tomorrow.', fx: { '@route': 10, trust: 8, self: 2 }, lesson: 'celebrate', then: [
            { s: '@route', e: 'happy', at: 'center', t: 'You\'re the first person I wanted to tell. And you look happier than my mum. Okay, almost.' },
            { n: 'The next day she sits with you through two hours of differentiation. Turns out support goes both ways.' },
          ] },
          { t: '"It\'s just a competition. Not a big deal."', fx: { '@route': -12, trust: -10 }, lesson: 'celebrate', then: [
            { s: '@route', e: 'sad', at: 'center', t: '...It was a big deal to me.' },
          ] },
          { t: 'Make the evening about your failed test.', fx: { '@route': -5, trust: -3 }, lesson: 'celebrate', then: [
            { n: 'She spends her big night comforting you. On the way home she checks her phone. Thirty congratulations. She has not replied to any.' },
          ] },
        ] },
        { hide: '*' },
        { talk: 'cheating' },
      ], [
        // solo branch: Haziq is the jealous one
        { n: 'Haziq has a girlfriend. Nadia, from the polytechnic down the road. He is very happy. He is also, this week, a mess.' },
        { show: 'kenta', e: 'sad', at: 'center' },
        { s: 'kenta', e: 'sad', t: 'Bro. She went for bubble tea with a guy from her course. A GUY. What do I do?' },
        { choice: 'Haziq is spiralling.', opts: [
          { t: '"It\'s okay to feel jealous. Tell her how you felt, calmly, and ask to meet him."', fx: { kenta: 8, wisdom: 6 }, lesson: 'jealousy', then: [
            { s: 'kenta', e: 'happy', t: '...Just say it? Like a normal person? Okay. That\'s so simple it\'s scary.' },
          ] },
          { t: '"Go there and tell him to back off."', fx: { kenta: -4, wisdom: -6 }, lesson: 'jealousy', then: [
            { mochi: 'Your advice nearly started a fight in a bubble tea shop. Jealousy needs a calm voice, not a bodyguard.', e: 'angry' },
          ] },
        ] },
        { s: 'kenta', e: 'neutral', t: 'Also. When she was in the toilet I saw her phone light up. Should I check it next time? Kai says make her share location 24/7.' },
        { choice: 'Your best friend is about to do something dumb.', opts: [
          { t: '"Don\'t read her phone, and don\'t demand her location. That\'s control, not love."', fx: { kenta: 6, wisdom: 6, self: 4 }, lesson: 'snooping', ach: 'unsubscribed1', then: [
            { s: 'kenta', e: 'sad', t: 'Control. Okay. When you say it out loud it sounds bad. Unfollowing Kai. Again. For real this time.' },
          ] },
          { t: '"If she has nothing to hide, she won\'t mind."', fx: { wisdom: -8, kenta: -2 }, lesson: 'control', then: [
            { n: 'Two days later Nadia tells Haziq she feels watched. He calls you at midnight, crying.' },
            { mochi: '"Nothing to hide" is how control dresses up as trust. Now help him fix it.', e: 'sad' },
          ] },
        ] },
        { hide: '*' },
        { bg: 'classroom' },
        { n: 'Your maths test comes back: 38 out of 100. Mei texts the family chat the same afternoon.' },
        { phone: 'Family 🏠' }, { txt: 'mei', t: 'I GOT THE INTERNSHIP 🎉🎉🎉' }, { phoneOff: true },
        { choice: 'You are holding a 38.', opts: [
          { t: 'Call her and celebrate properly. Your test can wait.', fx: { self: 4, wisdom: 4, kenta: 2 }, lesson: 'celebrate', then: [
            { show: 'mei', e: 'happy', at: 'center' }, { s: 'mei', e: 'happy', t: 'You screamed louder than Mum. Okay, bring the 38 tomorrow. I\'ll help.' },
          ] },
          { t: '"Cool." Then complain about your test.', fx: { wisdom: -4 }, lesson: 'celebrate', then: [
            { mochi: 'Her good day became your bad day. Celebrate first, sulk later. Ideally never.', e: 'sad' },
          ] },
        ] },
        { hide: '*' },
        { talk: 'cheating' },
      ]),
      SIM.evening('ch10'),
      { chapterEnd: true },
    ],
  };
})();
