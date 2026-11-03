/* Chapter 7 — "Behind the Screen". De-idealisation: facts vs fantasy, real people, parasocial gifting, status, attention. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch7 = {
  id: 'ch7', part: "Part II — Behind the Filter", title: "Chapter 7", subtitle: "Behind the Screen",
  next: "Chapter 8 — National Day", status: 'done',
  script: [
    // 7-1 facts vs fantasy
    { bg: 'bedroom' },
    WEAR('home'),
    { mochi: "Rookie. I read your notes app. \"30 Perfect Things About Her\". I fact-checked. Twenty-six are made up.", e: 'smug' },
    { mochi: "\"She loves rainy days like me.\" You've never talked about weather. \"She would never get angry.\" Everyone gets angry.", e: 'neutral' },
    { choice: "Mochi holds up your list...", opts: [
      { t: "Split it: \"things I know\" and \"things I assumed\". Be honest.", fx: { proj: -12, wisdom: 8 }, lesson: 'factsvsfantasy', rose: true, then: [
        { n: "Known: four. Assumed: twenty-six. The four are better anyway: she's nice to the cleaner auntie, laughs at herself, is always on time, hates unfairness." },
        { mochi: "Four true beats thirty pretty. Number five, go ask.", e: 'happy' },
      ] },
      { t: "Add five more. She's perfect.", fx: { proj: 10 }, lesson: 'factsvsfantasy', then: [
        { mochi: "Rose Filter at max. Real her may have opinions, you know.", e: 'sad' },
      ] },
      { t: "Print her photos. Make a little shrine on your desk.", fx: { proj: 20, self: -10 }, lesson: 'factsvsfantasy', then: [
        { n: "Zoom with your study group. Camera on. The shrine is behind you. Her best friend is in the call." },
        { badEnd: { title: "BAD END #21 — Fan Club of One",
          text: "You built a monument to someone you'd barely spoken to. A crush runs mostly on imagination. Separate what you know from what you assume, and get to know the real one, slowly and respectfully." } },
      ] },
    ] },
    { hide: '*' },

    // 7-2 Elise's room
    { bg: 'voiddeck' },
    WEAR('out'),
    { variant: 'voiddeck.pass' },
    { bg: 'apartment' },
    WEAR('out', { yuna: 'home' }),
    { n: "You help Elise carry the dance props back to her flat in Tampines. Her room: clothes everywhere, ring light, nine empty energy drink cans." },
    { show: 'yuna', e: 'sad', at: 'center' },
    { s: 'yuna', e: 'sad', t: "Don't judge. I sleep four hours. If I don't post every day the numbers drop. Online me is... so tiring." },
    { choice: "Elise looks tired. Really tired.", opts: [
      { t: "No judging. \"Have you eaten actual food today?\" Suggest sleep, maybe the school counsellor. You can't fix her, and you don't need to.", fx: { yuna: 12, proj: -8, wisdom: 6 }, lesson: 'realperson', rose: true, then: [
        { s: 'yuna', e: 'surprised', t: "...Nobody asks if I ate. They ask when the next video is." },
        { s: 'yuna', e: 'happy', t: "Okay. Prata. You belanja. Kidding! Half-half." },
      ] },
      { t: "\"Wah. You're nothing like your stream.\"", fx: { yuna: -10 }, lesson: 'realperson', then: [
        { s: 'yuna', e: 'angry', t: "Sorry I'm not the product you ordered." },
      ] },
      { t: "Clean her room. Every week. Become her unpaid assistant.", fx: { self: -8, proj: 6 }, lesson: 'realperson', then: [
        { mochi: "Helping is nice. Full-time free butler is a job with no pay.", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // talk: greed
    { bg: 'hawker' },
    WEAR('hawker'),
    { n: "Prata, half-half. Elise is scrolling a \"how I made $10k in a week\" video with the sound on." },
    { talk: 'greed' },

    // 7-3 Haziq's streamer
    { bg: 'field' },
    WEAR('out'),
    { show: 'kenta', e: 'sad', at: 'center' },
    { s: 'kenta', e: 'shy', t: "Bro. Don't laugh. There's this streamer, Lulu. She says I'm \"special\". She remembers my name." },
    { s: 'kenta', e: 'sad', t: "I spent... $600. All my CNY angbao money. She sent me this." },
    { phone: "Haziq's phone" }, { txt: 'sys', t: "Lulu 💗: hi TOP GIFTER!! you're so special to me 🥺 never leave ok?" }, { phoneOff: true },
    { n: "You've seen that exact message before. On Elise's stream. Word for word." },
    { choice: "Haziq is looking at you...", opts: [
      { t: "Show him. Gently, no laughing. \"Bro, it's a copy-paste. Not because you're stupid, it's built to work. Come, court. Now.\"", fx: { kenta: 14, wisdom: 8 }, lesson: 'parasocial', rose: true, then: [
        { s: 'kenta', e: 'sad', t: "...Copy-paste. Wah. Okay. That one pain. Thanks for not being a jerk." },
        { n: "You play till it's dark. He misses every three-pointer. He doesn't open the app once." },
      ] },
      { t: "Screenshot it to the group chat. \"LOL SIMP.\"", fx: { kenta: -15, wisdom: -6 }, lesson: 'mockery', then: [
        { n: "Haziq leaves the group chat. He doesn't show up for basketball on Saturday." },
      ] },
      { t: "\"Just tip less lah.\"", fx: { kenta: 2 }, lesson: 'parasocial', then: [
        { s: 'kenta', e: 'neutral', t: "Ya. Less. Okay." }, { n: "He tips $200 that night." },
      ] },
    ] },
    { hide: '*' },

    // 7-4 Alpha Kai
    { bg: 'night' },
    WEAR('home'),
    { phone: "Alpha Kai 💪 LIVE" },
    { txt: 'kai', t: "LAMBO OR LOSER. Real men attract the HOTTEST girls. This watch? $40k. MINDSET. 💎" },
    { txt: 'sys', t: "chat: bro the rental sticker still on the windscreen 💀" },
    { txt: 'sys', t: "AD: Luxury watch, ONLY $29/month for 24 months!" },
    { choice: "Alpha Kai is yelling about mindset...", opts: [
      { t: "Close it. Spend the evening on {passion}.", fx: { passion: 8, wisdom: 6, self: 4 }, lesson: 'materialism', rose: true, then: [
        { phoneOff: true }, { variant: 'evening.passion' },
      ] },
      { t: "Buy the \"designer\" watch. 24 instalments.", fx: { cash: -29, wallet: -10, self: -6 }, lesson: 'materialism', then: [
        { phoneOff: true }, { n: "It arrives three weeks later. The logo says \"Rolax\". You're paying for it until A-Levels." },
      ] },
      { t: "Watch three more hours. \"Ironically.\"", fx: { health: -6, proj: 4 }, lesson: 'attention', then: [
        { phoneOff: true }, { mochi: "Ironic watching is still watching. It's 2 AM. He is still yelling.", e: 'sad' },
      ] },
    ] },

    // Chloe does the maths
    { if: (s) => !!s.flags.chloeMet, then: [
      { bg: 'hawker' },
      WEAR('hawker'),
      { show: 'chloe', e: 'smug', at: 'center' },
      { s: 'chloe', e: 'smug', t: "I saw that watch ad on your phone. $29 a month for 24 months is $696, for a watch that says \"Rolax\". Want to see what $696 does in a savings account instead?" },
      { choice: "Chloe already has the calculator out.", opts: [
        { t: "\"Show me.\"", fx: { chloe: 12, wallet: 4 }, then: [
          { s: 'chloe', e: 'happy', t: "Finally. Someone who wants to see the spreadsheet." },
          { contact: 'chloe' },
        ] },
        { t: "\"It's my money.\"", fx: { chloe: -1 }, then: [
          { s: 'chloe', e: 'neutral', t: "It is. That's why I'd rather you kept it." },
        ] },
      ] },
      { hide: '*' },
    ] },

    // 7-5 attention
    { bg: 'bedroom' },
    WEAR('home'),
    { mochi: "Question. Who are you when nobody's watching?", e: 'neutral' },
    { choice: "One free evening. Nobody will know.", opts: [
      { t: "Practise {passion}.", fx: { passion: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.passion' }] },
      { t: "Study. Properly.", fx: { goal: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.goal' }] },
      { t: "Sleep at ten. Like a legend.", fx: { health: 8, self: 3 }, lesson: 'attention', then: [{ variant: 'evening.health' }] },
      { t: "Four hours scrolling her feed.", fx: { proj: 10, health: -4, goal: -4 }, lesson: 'attention', then: [
        { mochi: "Four hours. You know her cousin's dog's birthday now. Still no idea what she thinks about anything.", e: 'sad' },
      ] },
    ] },
    { bg: 'classroom' },
    WEAR('school'),
    { s: 'yuna', e: 'happy', at: 'center', t: "Hey. Thanks for treating me like a normal person who's bad at sleeping. I slept seven hours. SEVEN!" },
    { chapterEnd: true },
  ],
};
