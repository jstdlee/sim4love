/* Chapter 2 — "The Group Date". Design: docs/CHAPTERS.md#chapter-2--the-group-date
   STATUS: outline — choices, fx, lessons, bad ends are final-ish; dialogue to be written. */
CHAPTERS.ch2 = {
  id: 'ch2', title: 'Chapter 2', subtitle: 'The Group Date', next: 'Chapter 3 — Seen at 2:14 AM', status: 'outline',
  script: [
    { bg: 'street', petals: true },
    SIM.todo('Kenta bursts in: "Bro. I organised a group date." Introduce Kenta (best friend). Sakura Land amusement park.'),
    { mochi: 'Group dates are job interviews where everyone pretends not to be interviewing.', e: 'smug' },

    SIM.todo('[2-1] 40-minute coaster queue next to Mio.'),
    { choice: 'Forty minutes in line with Mio...', opts: [
      { t: 'Ask about The Starlight Postman volume 3 — then ask a follow-up about her answer.', fx: { mio: 12, wisdom: 5 }, lesson: 'curiosity', then: [{ s: 'mio', e: 'happy', at: 'center', t: '(TODO) Mio lights up and talks about the North Star letters.' }] },
      { t: 'Explain your ranked game strategy. For forty minutes.', fx: { mio: -8, wisdom: -5 }, lesson: 'curiosity', ach: 'monologue',
        then: [{ s: 'mio', e: 'cool', at: 'center', t: '(TODO) Mio is visibly asleep standing up.' }] },
      { t: 'Stay silent on your phone.', fx: { mio: -3 }, lesson: 'presence', then: [] },
    ] },
    { hide: '*' },

    SIM.todo('[2-2] Alpha Kai ad pops up: "NEG HER to lower her value!" Kaede stands next to you.'),
    { choice: 'Alpha Kai whispers in your earbuds...', opts: [
      { t: '"Your last 100m split was insane. How do you train for that?"', fx: { kaede: 12, wisdom: 8 }, lesson: 'negging', ach: 'unsubscribed1', then: [] },
      { t: '"You\'d be cute if you smiled more."', fx: { kaede: -12, self: -5 }, lesson: 'negging', then: [
        { s: 'kaede', e: 'smug', at: 'center', t: '(TODO) Kaede laughs AT you. Kenta facepalms.' }] },
      { t: 'Deep fake voice: "I\'m the prize here, babe."', fx: { kaede: -20, wisdom: -10 }, lesson: 'negging', then: [
        { badEnd: { title: 'BAD END #4 — Negged Yourself', text: 'Everyone left you alone at the top of the Ferris wheel. Manipulation "techniques" make you the joke.' } }] },
    ] },
    { hide: '*' },

    SIM.todo('[2-3] Snack stand. You want to impress everyone.'),
    { choice: 'The ¥3,000 deluxe parfait glitters...', opts: [
      { t: 'Buy one round of drinks and split the rest.', fx: { self: 5, wisdom: 5 }, lesson: 'buyinglove', then: [] },
      { t: 'Buy everyone the deluxe parfait with your whole month\'s money.', fx: { self: -10, wisdom: -5 }, lesson: 'buyinglove', then: [] },
      { t: 'Let Kenta pay for everything.', fx: { self: -3 }, then: [] },
    ] },

    SIM.todo('[2-4] Haunted house pairs. Yuna clings to you for her story video. Hina is watching.'),
    { choice: 'Yuna is filming. Hina is watching.', opts: [
      { t: 'Keep it friendly and pull Hina into the photo too.', fx: { hina: 8, yuna: 3, wisdom: 5 }, lesson: 'triangulation', then: [] },
      { t: 'Play it up so Hina gets jealous.', fx: { hina: -12, yuna: 2, wisdom: -8 }, lesson: 'triangulation', then: [] },
      { t: 'Scream and sprint out the exit alone.', fx: {}, ach: 'ghosted', then: [] },
    ] },

    SIM.todo('[2-5] Kenta falls into the fountain. Everyone laughs.'),
    { choice: 'Kenta is soaked...', opts: [
      { t: 'Help him out, give him your jacket, laugh with him.', fx: { hina: 5, kaede: 5, wisdom: 5 }, lesson: 'punchingdown', then: [] },
      { t: '"This is why you\'re single, bro."', fx: { hina: -5, kaede: -5, wisdom: -5 }, lesson: 'punchingdown', then: [] },
    ] },

    { bg: 'night' },
    SIM.todo('[2-6] Karaoke. Rei (or an unknown number) messages.'),
    { phone: 'Rei 🌹' },
    { txt: 'rei', t: 'your friends are so boring. they don\'t get you like I do' },
    { txt: 'rei', t: 'skip school monday and come see me? just us ♡' },
    { choice: 'Rei is waiting for an answer...', opts: [
      { t: '"I\'m having fun with my friends. Not skipping school."', fx: { wisdom: 10, self: 10 }, lesson: 'isolation', then: [{ phoneOff: true }] },
      { t: 'Leave karaoke early to call her.', fx: { self: -8, hina: -5 }, lesson: 'isolation', then: [{ phoneOff: true }] },
      { t: 'Skip school and give her your bank PIN "for our future".', fx: { wisdom: -20 }, lesson: 'isolation', then: [
        { phoneOff: true },
        { badEnd: { title: 'BAD END #5 — Just You and Me (and My Manager)', text: 'Someone who cuts you off from friends and asks for access to your money is not building a future with you.' } }] },
    ] },

    SIM.todo('Walk home with Hina: "You were... different today. Nicer." (if 2-4/2-5 healthy).'),
    { chapterEnd: true },
  ],
};
