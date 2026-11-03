/* Chapter 8 — "National Day". Why her, confessing well, accepting the answer, route lock. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const H = {
    hina: { intro: "Hanis is on the Esplanade steps holding two cups of bandung. One is for you, apparently.",
      yes: "I... yes. Obviously yes. I've been cutting eggs into hearts for weeks, you blur sotong.",
      no: "You're one of my favourite people. But I don't feel that way. Sorry. I really am." },
    mio: { intro: "Xin Yi is sitting on the waterfront railing, writing something about the fireworks in a tiny notebook.",
      yes: "...Yes. Can I write this down? I want to remember exactly what the sky looked like.",
      no: "I really like talking to you. But not like that. I hope that's... okay." },
    kaede: { intro: "Kavya is doing calf stretches next to the Merlion. Because of course she is.",
      yes: "Yes. Don't make it weird. ...Okay, a bit weird can. Yes.",
      no: "I respect you, seriously. But no. I'd rather be straight with you than keep you guessing." },
    yuna: { intro: "Elise's phone is in her pocket. Not filming. Just watching the sky.",
      yes: "Yes. And... can we not post about it for a while? I want one thing that's just mine.",
      no: "You're the first boy who saw the real me. That's why I want to be honest: I don't feel the same." },
    chloe: { intro: "Chloe is sitting on the Esplanade steps with a tiffin carrier of kueh lapis. \"Leftovers. Don't make it a thing.\"",
      yes: "Okay. Yes. I ran the numbers on you weeks ago, you know. You came out positive. ...That was a joke. Mostly. Yes.",
      no: "You're a good guy, and I mean that. But I don't feel it like that. Better I say it straight than keep you on a tab." },
    preet: { intro: "Preet has lost her voice from cheering at the parade screen and is now arguing with Haziq by typing on her phone.",
      yes: "Yes. ...Wait, let me say it properly. Yes. I had a counter-argument ready in case you didn't ask.",
      no: "I like you a lot as a friend. Not like that. I'd rather be honest with you than polite." },
  };
  const answer = (h) => [
    { if: (s) => (s.stats[h] || 0) >= 40 && !s.flags.liedFishpond, then: [
      { s: h, e: 'blush', at: 'center', t: H[h].yes },
      { choice: "The fireworks are still going. You want to hold her hand.", opts: [
        { t: "\"Can I hold your hand?\"", fx: { [h]: 6, wisdom: 6 }, lesson: 'consent', then: [
          { s: h, e: 'happy', t: "You asked. ...Yes." },
        ] },
        { t: "Just grab it. So romantic.", fx: { [h]: -6 }, lesson: 'consent', then: [
          { s: h, e: 'surprised', t: "—oh! (She flinches, then laughs it off.) Next time ask can? I get startled easily." },
        ] },
      ] },
      { route: h },
      { mochi: "You got a yes. Now the actual hard part.", e: 'happy' },
    ], else: [
      { s: h, e: 'sad', at: 'center', t: H[h].no },
      { choice: "She said no.", opts: [
        { t: "\"Thanks for being honest. I'm still glad I told you. Friends?\"", fx: { [h]: 10, self: 10, wisdom: 8 }, lesson: 'rejection', ach: 'respect100', then: [
          { s: h, e: 'happy', t: "Friends. Of course. ...That was really nice of you." },
          { route: 'solo' },
        ] },
        { t: "\"I'll wait. However long it takes.\"", fx: { self: -10, proj: 8 }, lesson: 'rejection', then: [
          { s: h, e: 'sad', t: "Please don't. I don't want you to pause your life for me." },
          { route: 'solo' },
        ] },
        { t: "\"After everything I did for you?!\"", fx: { [h]: -20, self: -15 }, lesson: 'rejection', then: [
          { s: h, e: 'angry', t: "I didn't know your kindness came with an invoice." },
          { badEnd: { title: "BAD END #10 — Nice Guy™",
            text: "Being kind to someone doesn't mean she owes you a relationship. \"After all I did for you\" turns kindness into a bill. Taking no well is what shows you were worth liking." } },
        ] },
      ] },
    ] },
  ];
  const confessTo = (h) => [
    { bg: 'fireworks' }, WEAR('out'), { bgm: 'romance' }, { n: H[h].intro }, { show: h, e: 'neutral', at: 'center' },
    { choice: "How do you tell her?", opts: [
      { t: "Step away from the crowd. Keep it simple: \"I like you. No need to answer now.\"", fx: { [h]: 6, wisdom: 6 }, lesson: 'publicpressure', then: answer(h) },
      { t: "Get the whole class to chant her name, then confess in front of everyone.", fx: { [h]: -15 }, lesson: 'publicpressure', then: [
        { n: "Thirty phones come out. She goes very red. Not the good red." },
        { s: h, e: 'angry', t: "Why must you do this HERE? Now if I say no, I'm the villain." },
        ...answer(h),
      ] },
      { t: "Text her. Twenty emojis.", fx: { [h]: -4 }, lesson: 'publicpressure', then: [
        { phone: { hina: "Hanis", mio: "Xin Yi", kaede: "Kavya", yuna: "Elise", chloe: "Chloe", preet: "Preet" }[h] }, { txt: 'me', t: "i like u 😳😳💕💕🌸🌸🎆🎆🥺🥺💘💘✨✨🙈🙈❤️❤️🔥🔥" }, { phoneOff: true },
        { n: "She calls instead. \"Can you say that with words? To my face?\" She's already walking over." },
        ...answer(h),
      ] },
    ] },
  ];
  const can = (h) => (s) => (s.stats[h] || 0) >= 30 && (h !== 'yuna' || s.flags.yunaClarity)
    && (h !== 'chloe' || s.flags.chloeMet) && (h !== 'preet' || s.flags.preetMet);

  window.CHAPTERS.ch8 = {
    id: 'ch8', part: "Part II — Behind the Filter", title: "Chapter 8", subtitle: "National Day",
    next: "Chapter 9 — After \"Yes\"", status: 'done',
    script: [
      { bg: 'park' },
      WEAR('out'),
      { n: "9 August. Your class has staked out a patch of grass near Marina Bay since 4 PM. Everyone's in red. The uncle with the flag on his bicycle is here again." },
      { s: 'kenta', e: 'happy', at: 'center', t: "Bro. Tonight right? Fireworks. Confession. Romance. I hold your bag." },
      { talk: 'whylike' },
      { hide: '*' },

      // 8-1 why her
      { bg: 'night' },
      WEAR('out'),
      { mochi: "Before the fireworks. Why her? Whoever \"her\" is.", e: 'neutral' },
      { choice: "Why her?", opts: [
        { t: "How she treats people. And who I am around her.", fx: { wisdom: 8, proj: -6 }, lesson: 'whyher', then: [
          { mochi: "That one will still be true in ten years.", e: 'happy' } ] },
        { t: "\"She's the prettiest.\"", fx: { proj: 8 }, lesson: 'whyher', then: [
          { mochi: "Okay. And on her bad days?", e: 'neutral' } ] },
        { t: "\"I can't live without her.\"", fx: { self: -8, proj: 6 }, lesson: 'whyher', then: [
          { mochi: "You lived without her for seventeen years. You were fine. That's a ransom note, not a love letter.", e: 'sad' } ] },
      ] },

      // 8-2 who
      { bg: 'fireworks' },
      WEAR('out'),
      { n: "The first firework goes up over the bay. The whole crowd goes \"woooo\"." },
      { choice: "Who do you want to tell?", opts: [
        { t: "Hanis.", if: can('hina'), then: confessTo('hina') },
        { t: "Xin Yi.", if: can('mio'), then: confessTo('mio') },
        { t: "Kavya.", if: can('kaede'), then: confessTo('kaede') },
        { t: "Elise.", if: can('yuna'), then: confessTo('yuna') },
        { t: "Chloe.", if: can('chloe'), then: confessTo('chloe') },
        { t: "Preet.", if: can('preet'), then: confessTo('preet') },
        { t: "\"Not now. This year is exams and {passion}.\"", fx: { goal: 8, passion: 8, self: 10 }, lesson: 'ownlife', then: [
          { route: 'solo' },
          { mochi: "No girlfriend. But you kept your dignity. And me.", e: 'happy' },
        ] },
      ] },
      { bg: 'night' },
      WEAR('out'),
      { n: "The last firework fades. Somewhere nearby, the bicycle uncle is singing Home. Off-key. Beautiful." },
      { chapterEnd: true },
    ],
  };
})();
