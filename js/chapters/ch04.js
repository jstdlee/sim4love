/* Chapter 4 — "Payday". First pay from Uncle Ong's café: budget, livestream gifting, money boundaries, instalments. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch4 = {
  id: 'ch4', part: 'Part I — Rose-Tinted', title: 'Chapter 4', subtitle: 'Payday',
  next: 'Chapter 5 — Ubin Camp', status: 'done',
  script: [
    { bg: 'cafe' },
    { s: 'ogawa', e: 'happy', at: 'center', t: 'Four weekends of washing cups. $480. Count it. Then count it again, because nobody else will.' },
    { fx: { cash: 480 } },
    { s: 'ogawa', e: 'neutral', t: 'First pay is dangerous. It feels like a lot. It is exactly $480.' },

    // 4-1 budget
    { choice: 'How do you plan your $480?', opts: [
      { t: '50% savings, 30% fun, 20% for people you care about. Write it in your notes app.', fx: { wisdom: 8, wallet: 10, self: 4 }, lesson: 'budget', ach: 'budgetKing', then: [
        { s: 'ogawa', e: 'happy', t: 'Notes app. Good. My notes app is a biscuit tin, but same idea.' },
      ] },
      { t: 'Keep it all for fun. You earned it.', fx: { passion: 3, wallet: -4 }, lesson: 'budget', then: [
        { s: 'ogawa', e: 'neutral', t: 'Fun is good. Fun without a plan is how my cousin owns six air fryers.' },
      ] },
      { t: 'Put it aside "for dates". For whoever.', fx: { proj: 6, self: -4 }, lesson: 'budget', then: [
        { mochi: 'A date fund for a girl who doesn\'t exist yet. That\'s a budget for a daydream.', e: 'smug' },
      ] },
    ] },
    { hide: '*' },

    // 4-2 livestream
    { bg: 'night' },
    { phone: 'LIVE 🔴 Elise ✨ 2.3k watching' },
    { txt: 'sys', t: 'TOP GIFTER gets a shoutout! 🚀 Rocket = $50' },
    { txt: 'yuna', t: 'thank u babe for the rose!! 🌹 omg who\'s gonna be my top gifter tonight~' },
    { choice: 'Elise is live, smiling at 2,300 people...', opts: [
      { t: 'Close the stream. Ask her at school tomorrow how her rehearsal went.', fx: { yuna: 8, wisdom: 6, self: 6 }, lesson: 'paidattention', rose: true, then: [
        { phoneOff: true }, { bg: 'classroom' },
        { s: 'yuna', e: 'surprised', at: 'center', t: 'You... asked about rehearsal? Nobody asks about rehearsal. They ask about the stream.' },
        { s: 'yuna', e: 'happy', t: 'It went badly, actually. Want to hear the horror story?' },
      ] },
      { t: 'Send one $5 heart. Just to be nice.', fx: { cash: -5, yuna: 1 }, lesson: 'paidattention', then: [
        { txt: 'yuna', t: 'thanks for the heart, {name}! 💕' }, { phoneOff: true },
        { mochi: 'She said your name. And 400 others. That\'s her job, rookie.', e: 'neutral' },
      ] },
      { t: 'Rocket. Rocket. Rocket. Become TOP GIFTER.', fx: { cash: -350, self: -10, proj: 10 }, lesson: 'paidattention', then: [
        { txt: 'yuna', t: 'omg TOP GIFTER!! thank you uh... (reads screen) ...{name}??' }, { phoneOff: true },
        { n: 'At school she walks right past you. She doesn\'t recognise you without a username.' },
        { badEnd: { title: 'BAD END #19 — Top Gifter of Nothing',
          text: 'You paid for attention, and got exactly what you paid for: three seconds of your name, read off a screen. Attention you buy is a transaction. Interest you earn is a relationship.' } },
      ] },
    ] },

    // 4-3 Kavya spikes
    { bg: 'mall' },
    { s: 'kaede', e: 'happy', at: 'center', t: 'These spikes are $240. Nationals are in six weeks. Mine are falling apart.' },
    { s: 'kaede', e: 'smug', t: 'You just got paid, right? Buy them for me? Kidding. Mostly.' },
    { choice: 'Kavya is looking at the spikes, then at you...', opts: [
      { t: '"$240 is half my pay. I can\'t. But I can help you find a second-hand pair, or come with you to ask your coach about team gear."', fx: { kaede: 10, wisdom: 8, self: 8 }, lesson: 'moneyboundary', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: '...Okay, I didn\'t expect a real answer. The coach has a gear fund. I forgot. You\'re kind of useful.' },
      ] },
      { t: 'Buy them. You want to see her smile.', fx: { cash: -240, kaede: 4, self: -8, proj: 8 }, lesson: 'moneyboundary', then: [
        { s: 'kaede', e: 'happy', t: 'Wait, seriously? ...Okay. Thanks. (She looks a bit uncomfortable.)' },
        { mochi: 'Her smile lasted four seconds. Your wallet will remember for four months.', e: 'sad' },
      ] },
      { t: '"Ha, no way. Buy your own stuff." (Walk off.)', fx: { kaede: -8 }, lesson: 'moneyboundary', then: [
        { s: 'kaede', e: 'cool', t: 'I said kidding. You didn\'t have to be weird about it.' },
      ] },
    ] },
    { hide: '*' },

    // 4-4 instalments
    { bg: 'mall' },
    { n: 'The phone shop. The new model is $998. A big sign: ONLY $83/MONTH! 0% FOR 12 MONTHS!*' },
    { n: '*Late fee $30. After month 12, interest applies at 26.8% a year.' },
    { choice: 'Your current phone works fine...', opts: [
      { t: 'Read the asterisk. Walk out. Your phone works.', fx: { wisdom: 8, wallet: 6 }, lesson: 'installments', rose: true, then: [
        { think: '$83 a month is twelve weekends of washing cups. For a better camera.' },
      ] },
      { t: 'Sign up. It\'s only $83.', fx: { cash: -83, wallet: -12, wisdom: -5 }, lesson: 'installments', then: [
        { mochi: 'It is not "only $83". It is $998 that you will be paying until next year. Buy-now-pay-later is just later.', e: 'angry' },
      ] },
    ] },

    // 4-5 family money
    { bg: 'bedroom' },
    { s: 'mom', e: 'neutral', at: 'center', t: 'So. First pay. Your father and I were thinking. Some families give a little back to the house.' },
    { show: 'dad', e: 'neutral', at: 'right' },
    { s: 'dad', e: 'happy', t: 'No pressure. I gave my mother my first pay packet. Whole thing. She cried. I cried. Then I was broke for a month.' },
    { choice: 'Your parents are being careful about it...', opts: [
      { t: 'Give $50 for the house, and say thank you for the rice you\'ve eaten for seventeen years.', fx: { cash: -50, wisdom: 6, self: 4 }, lesson: 'familymoney', then: [
        { s: 'mom', e: 'happy', t: 'We\'ll put it towards your school fees. ...Thank you. That\'s very grown-up.' },
      ] },
      { t: '"It\'s my money. I worked for it."', fx: { self: -2 }, lesson: 'familymoney', then: [
        { s: 'dad', e: 'neutral', t: 'It is. You\'re right. ...We worked for the flat, too. Just something to think about.' },
      ] },
      { t: 'Give it all. Every dollar. Guilt is heavy.', fx: { cash: -150, wallet: -6 }, lesson: 'familymoney', then: [
        { s: 'mom', e: 'surprised', t: 'Aiyo, no! We said a little. Keep most. Learning to manage it is the whole point.' },
      ] },
    ] },
    { hide: '*' },

    // talk: spending
    { bg: 'hawker' },
    { variant: 'hawker.arrive' },
    { talk: 'spending' },
    { deeper: 'consumption' },
    SIM.evening('ch4'),
    { mochi: 'Your wallet bar moved this chapter. So did your Love IQ. Funny how those two keep holding hands.', e: 'smug' },
    { chapterEnd: true },
  ],
};
