/* Chapter 7 — "Behind the Screen". De-idealisation: facts vs fantasy, real people, parasocial gifting, status, attention. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch7 = {
  id: 'ch7', part: 'Part II — Behind the Filter', title: 'Chapter 7', subtitle: 'Behind the Screen',
  next: 'Chapter 8 — National Day', status: 'done',
  script: [
    // 7-1 facts vs fantasy
    { bg: 'bedroom' },
    { mochi: 'Rookie. I read your notes app. "30 Perfect Things About Her". I fact-checked it. Twenty-six are invented.', e: 'smug' },
    { mochi: '"She loves rainy days like me." You have never discussed weather. "She would never get angry." Everyone gets angry.', e: 'neutral' },
    { choice: 'Mochi holds up your list...', opts: [
      { t: 'Split it into two columns: "things I know" and "things I assumed". Be honest.', fx: { proj: -12, wisdom: 8 }, lesson: 'factsvsfantasy', rose: true, then: [
        { n: 'Known: four. Assumed: twenty-six. The four are actually better: she\'s kind to the cleaner auntie, she laughs at herself, she\'s on time, she hates injustice.' },
        { mochi: 'Four true things beat thirty pretty ones. Now go find out number five. By asking.', e: 'happy' },
      ] },
      { t: 'Add five more. She\'s perfect.', fx: { proj: 10 }, lesson: 'factsvsfantasy', then: [
        { mochi: 'Rose Filter at max. You\'re in love with a fan-fiction character. Real her may have opinions.', e: 'sad' },
      ] },
      { t: 'Print her photos and make a little shrine on your desk.', fx: { proj: 20, self: -10 }, lesson: 'factsvsfantasy', then: [
        { n: 'Video call with your study group. Your camera is on. The shrine is behind you. Her best friend is in the call.' },
        { badEnd: { title: 'BAD END #21 — Fan Club of One',
          text: 'You built a monument to a person you had barely spoken to. Infatuation runs mostly on imagination. Separate what you know from what you assume, and get to know the real one, slowly and with respect.' } },
      ] },
    ] },
    { hide: '*' },

    // 7-2 Elise's room
    { bg: 'voiddeck' },
    { variant: 'voiddeck.pass' },
    { bg: 'apartment' },
    { n: 'You help Elise carry stage boxes back to her HDB flat in Tampines. Her room: clothes everywhere, ring light, nine empty energy drink cans.' },
    { show: 'yuna', e: 'sad', at: 'center' },
    { s: 'yuna', e: 'sad', t: 'Don\'t judge. I sleep four hours. I have to post every day or the numbers drop. The "me" online is... exhausting.' },
    { choice: 'Elise looks tired. Really tired.', opts: [
      { t: 'No judgement. "Have you eaten real food today?" Suggest sleep, and maybe the school counsellor. It\'s not your job to fix her.', fx: { yuna: 12, proj: -8, wisdom: 6 }, lesson: 'realperson', rose: true, then: [
        { s: 'yuna', e: 'surprised', t: '...Nobody asks if I\'ve eaten. They ask when the next video is.' },
        { s: 'yuna', e: 'happy', t: 'Okay. Prata. You\'re buying. Kidding! Half-half.' },
      ] },
      { t: '"Wow. You\'re nothing like your stream."', fx: { yuna: -10 }, lesson: 'realperson', then: [
        { s: 'yuna', e: 'angry', t: 'Sorry I\'m not the product you ordered.' },
      ] },
      { t: 'Clean her room. Every week. Become her unpaid assistant.', fx: { self: -8, proj: 6 }, lesson: 'realperson', then: [
        { mochi: 'Helpful is lovely. A full-time unpaid butler is not a relationship. It\'s a job with no pay and no contract.', e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // talk: greed
    { bg: 'hawker' },
    { n: 'Prata, half-half. Elise is scrolling a "how I made $10k in a week" video.' },
    { talk: 'greed' },

    // 7-3 Haziq's streamer
    { bg: 'field' },
    { show: 'kenta', e: 'sad', at: 'center' },
    { s: 'kenta', e: 'shy', t: 'Bro. Don\'t laugh. There\'s this streamer, Lulu. She said I\'m "special". She remembers my name.' },
    { s: 'kenta', e: 'sad', t: 'I spent... $600. My NS savings. She sent me this.' },
    { phone: 'Haziq\'s phone' }, { txt: 'sys', t: 'Lulu 💗: hi TOP GIFTER!! you\'re so special to me 🥺 never leave ok?' }, { phoneOff: true },
    { n: 'You\'ve seen that exact message before. On Elise\'s stream. Word for word. It\'s a template.' },
    { choice: 'Haziq is looking at you...', opts: [
      { t: 'Show him gently. No mocking. "Bro, it\'s a script. You\'re not stupid, it\'s designed to work. Come, court. Now."', fx: { kenta: 14, wisdom: 8 }, lesson: 'parasocial', rose: true, then: [
        { s: 'kenta', e: 'sad', t: '...Template. Wah. Okay. That hurts. Thanks for not being a jerk about it.' },
        { n: 'You play until it\'s dark. He misses every three-pointer. He doesn\'t open the app once.' },
      ] },
      { t: 'Screenshot it to the group chat. "LOL SIMP."', fx: { kenta: -15, wisdom: -6 }, lesson: 'mockery', then: [
        { n: 'Haziq leaves the group chat. He doesn\'t come to basketball on Saturday.' },
      ] },
      { t: '"Just tip less, bro."', fx: { kenta: 2 }, lesson: 'parasocial', then: [
        { s: 'kenta', e: 'neutral', t: 'Yeah. Less. Okay.' }, { n: 'He tips $200 that night.' },
      ] },
    ] },
    { hide: '*' },

    // 7-4 Alpha Kai
    { bg: 'night' },
    { phone: 'Alpha Kai 💪 LIVE' },
    { txt: 'kai', t: 'LAMBO OR LOSER. Real men attract the HOTTEST girls. This watch? $40k. Mindset. 💎' },
    { txt: 'sys', t: 'chat: bro the rental sticker is still on the windscreen 💀' },
    { txt: 'sys', t: 'AD: Luxury watch, ONLY $29/month for 24 months!' },
    { choice: 'Alpha Kai is yelling about mindset...', opts: [
      { t: 'Close it. Spend the evening on {passion}.', fx: { passion: 8, wisdom: 6, self: 4 }, lesson: 'materialism', rose: true, then: [
        { phoneOff: true }, { variant: 'evening.passion' },
      ] },
      { t: 'Buy the "designer" watch in 24 instalments.', fx: { cash: -29, wallet: -10, self: -6 }, lesson: 'materialism', then: [
        { phoneOff: true }, { n: 'It arrives in three weeks. The logo is spelled "Rolax". You are paying for it until NS.' },
      ] },
      { t: 'Watch three more hours. "Ironically."', fx: { health: -6, proj: 4 }, lesson: 'attention', then: [
        { phoneOff: true }, { mochi: 'Ironic watching is still watching. It is 2 AM. The man has not stopped yelling.', e: 'sad' },
      ] },
    ] },

    // 7-5 attention
    { bg: 'bedroom' },
    { mochi: 'Question, rookie. Who are you when nobody is watching?', e: 'neutral' },
    { choice: 'One free evening. Nobody will know.', opts: [
      { t: 'Practise {passion}.', fx: { passion: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.passion' }] },
      { t: 'Study. Properly.', fx: { goal: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.goal' }] },
      { t: 'Sleep at ten. Like a legend.', fx: { health: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.health' }] },
      { t: 'Four hours scrolling her feed.', fx: { proj: 10, health: -4, goal: -4 }, lesson: 'attention', then: [
        { mochi: 'Four hours. You now know her cousin\'s dog\'s birthday. You still don\'t know what she thinks about anything.', e: 'sad' },
      ] },
    ] },
    { bg: 'classroom' },
    { s: 'yuna', e: 'happy', at: 'center', t: 'Hey. Thanks for treating me like a normal person who\'s bad at sleeping. I slept seven hours. Seven!' },
    { chapterEnd: true },
  ],
};
