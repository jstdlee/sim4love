/* Chapter 20 — "Your Own Story". Final exam: honesty, status spending, your own stage, money as a team,
   and Mochi's last question. Then the auto ending, side endings, and the epilogue. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch20 = {
  id: 'ch20', part: "Part V — On Your Own", title: "Chapter 20", subtitle: "Your Own Story",
  next: null, status: 'done',
  script: [
    SIM.gate(),
    { bg: 'rooftop' },
    WEAR('later', { rei: 'law' }),
    { mochi: "Final chapter, rookie. No more classes. Just you.", e: 'happy' },

    // 20-1 honesty (callback to 14-4)
    SIM.split([
      { show: '@route', e: 'neutral', at: 'center' },
      { s: '@route', e: 'neutral', t: "Random question. That \"studying\" night at the arcade, back in JC. Why didn't you just tell me?" },
      { choice: "Small lie. Two years ago.", opts: [
        { t: "\"I wanted to look better than I was. Stupid lie. Sorry.\"", fx: { trust: 8, self: 6, wisdom: 4 }, lesson: 'honesty', then: [
          { s: '@route', e: 'happy', t: "Thanks. I never cared about the arcade lah. I just wanted the real answer." },
        ] },
        { t: "\"Wasn't really a lie. I studied after. Why bring it up now?\"", fx: { trust: -10 }, lesson: 'honesty', then: [
          { s: '@route', e: 'sad', t: "Because you're still doing it. It's fine. I just wish you'd own it." },
          { mochi: "A small lie, defended, becomes a big one.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ], [
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: "Aisyah asked how much I make from my part-time. I almost said double. Should I?" },
      { choice: "Haziq wants a straight answer.", opts: [
        { t: "\"Tell her the real number. If she likes you, she likes the real you.\"", fx: { kenta: 6, wisdom: 6 }, lesson: 'honesty', then: [
          { s: 'kenta', e: 'happy', t: "She said, \"Okay, so we eat hawker. I like hawker.\" Bro. I'm in love." },
        ] },
        { t: "\"Inflate lah. Everyone does.\"", fx: { kenta: -4, wisdom: -6 }, lesson: 'honesty', then: [
          { mochi: "Then every dinner bill is a lie he has to keep up.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 20-2 status trip on credit
    { bg: 'apartment' },
    WEAR('laterHome', { rei: 'law' }),
    SIM.split([
      { n: "Your feed is all Bali villas and Maldives proposals. A travel app offers \"Luxury Couples Getaway, pay in 12 instalments\"." },
      { choice: "Your anniversary is next month.", opts: [
        { t: "A day at East Coast Park, a picnic, and the note you've been meaning to write. Pay in cash.", fx: { trust: 8, wallet: 4, wisdom: 6 }, lesson: 'materialism', then: [
          { s: '@route', e: 'happy', t: "Best one so far. You remembered the cheap egg sandwiches." },
        ] },
        { t: "Book the villa on instalments. It's for the photos.", fx: { wallet: -20, proj: 6, wisdom: -6 }, lesson: 'materialism', then: [
          { n: "The photos get 300 likes. The instalments last until next Christmas." },
          { mochi: "Feeling loved, now at 22% interest.", e: 'sad' },
        ] },
      ] },
    ], [
      { show: 'kenta', e: 'happy', at: 'center' },
      { s: 'kenta', e: 'happy', t: "Bro. Option one: \"bro trip\" to Bangkok on credit. Option two: my uncle is retiring and selling his prata stall. Half each. Crazy, right?" },
      { choice: "Haziq is serious.", opts: [
        { t: "\"The stall. But we write a real plan: costs, rent, who does what. And no lending money to Ryan.\"", fx: { kenta: 10, wisdom: 6, wallet: 2 }, lesson: 'materialism', flag: 'broStall', then: [
          { s: 'kenta', e: 'happy', t: "A real plan! On paper! Not on tissue! ...Okay, first draft is on tissue." },
        ] },
        { t: "\"Bangkok! YOLO!\"", fx: { wallet: -15, wisdom: -4 }, lesson: 'materialism', then: [
          { n: "Four days. Two sunburns. Ten months of repayments." },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 20-3 own stage
    { bg: 'park' },
    WEAR('later', { chloe: 'pitch', rei: 'law' }),
    { n: "Your project has a showcase on Saturday. Same night as something big for someone else: a family dinner, a game night, a friend's gig." },
    { choice: "You can't be in two places.", opts: [
      { t: "Go to your showcase. Tell them early, offer another time, and mean it.", fx: { self: 10, goal: 8, passion: 6 }, lesson: 'ownstage', then: [
        { mochi: "Not selfish. People who love you want to see you up there.", e: 'happy' },
      ] },
      { t: "Skip it. Your stuff can always wait.", fx: { self: -8, goal: -6 }, lesson: 'ownstage', then: [
        { mochi: "\"Always wait\" is how you end up in the audience of your own life.", e: 'sad' },
      ] },
    ] },

    // 20-open-mic: Ollie and Sam
    { if: (s) => !!s.flags.ollieMet, then: [
      { bg: 'cafe' },
      WEAR('later', { saki: 'crew' }),
      { show: 'saki', e: 'happy', at: 'left' },
      { show: 'ollie', e: 'happy', at: 'right' },
      { n: "Thursday Open Night, two years on. Sam de Vries runs the stage now, with a headset and a roll of gaffer tape. Ollie still carries the amp." },
      { s: 'saki', e: 'happy', t: "Ja, so, the last slot is free. Not so handy for me, so I'm giving it to you. Go." },
      { s: 'ollie', e: 'neutral', t: "Told you years ago it was there. Three minutes. {passion}. No pressure." },
      { choice: "The last slot is yours.", opts: [
        { t: "Take it.", fx: { passion: 8, self: 6 }, then: [
          { n: "You shake for ten seconds, then you don't. The café goes quiet in the good way." },
          { s: 'ollie', e: 'happy', t: "...Not bad, that. Not bad at all." },
          { s: 'saki', e: 'happy', t: "From him that's a standing ovation. Gezellig! Lime juice is on Uncle Ong." },
        ] },
        { t: "\"Next time.\"", fx: {}, then: [
          { s: 'saki', e: 'neutral', t: "Ja, no. \"Next time\" is how people never go. But okay. It's there." },
        ] },
      ] },
      { hide: '*' },
    ] },
    { if: (s) => !!s.flags.mateoMet, then: [
      { bg: 'dining' },
      WEAR('later'),
      { show: 'mateo', e: 'happy', at: 'left' },
      { show: 'ama', e: 'happy', at: 'right' },
      { n: "Ah Ma's kitchen. Mateo is teaching her arepas. She is teaching him the Hokkien word for everything he gets wrong." },
      { s: 'ama', e: 'happy', t: "Too thick! Like that cannot. Aiyoh, this boy. ...Okay, nice. Next week you come again." },
      { s: 'mateo', e: 'happy', t: "¡Sí, Ah Ma! Next week I bring my abuela on video. Two grandmothers, one kitchen. Dios mío." },
      { hide: '*' },
    ] },
    { if: (s) => !!s.flags.inesMet && !!s.flags.inesPreetFriends, then: [
      { n: "Before Inès leaves for Sciences Po, she couriers Preet a box: three years of debate notes, colour-coded, with one card on top. \"To my best rival. You argue. Voilà. — I.\"" },
    ] },

    // 20-4 money as a team
    { bg: 'hawker' },
    WEAR('later', { rei: 'law' }),
    SIM.split([
      { with: '@route' },
      { talk: 'jointmoney' },
      { s: '@route', e: 'sad', t: "Honestly, BTO prices scare me. And my mum keeps asking \"when\"." },
      { choice: "The pressure is real.", opts: [
        { t: "\"It's not you versus me. It's us versus the prices. Let's look at grants and timelines together.\"", fx: { trust: 10, wisdom: 6 }, lesson: 'usvsproblem', then: [
          { s: '@route', e: 'happy', t: "Us versus the prices. Okay. I can work with that." },
        ] },
        { t: "\"This is why dating is so expensive. Your side always expects too much.\"", fx: { trust: -12, wisdom: -6 }, lesson: 'usvsproblem', then: [
          { mochi: "Blame \"her side\" and it's a war. Blame the prices and it's a plan.", e: 'sad' },
        ] },
      ] },
    ], [
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: "Aisyah and I fought about wedding costs. Just planning only, ah. But my aunties want 800 guests. Her parents also. We're both stressed." },
      { choice: "Haziq wants to know whose fault it is.", opts: [
        { t: "\"Nobody's. It's you two versus the guest list. Decide together, then tell the aunties as a team.\"", fx: { kenta: 8, wisdom: 6 }, lesson: 'usvsproblem', then: [
          { s: 'kenta', e: 'happy', t: "Us versus the aunties. That one I can win. With her." },
        ] },
        { t: "\"Girls always want big weddings. Tell her no.\"", fx: { kenta: -6, wisdom: -6 }, lesson: 'usvsproblem', then: [
          { mochi: "The 800 guests were HIS aunties' idea. \"Girls\" wasn't the problem.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ]),
    { deeper: 'marriagecost' },

    // 20-5 Mochi's last question
    { bg: 'rooftop' }, WEAR('later', { rei: 'law' }), { bgm: 'reflect' },
    { mochi: "Last question, rookie. No marks. What is love?", e: 'neutral' },
    { choice: "Mochi waits.", opts: [
      { t: "\"Plain stuff. Showing up. Telling the truth. Letting each other grow, even apart.\"", fx: { wisdom: 8, self: 6 }, ach: 'plainLove', rose: true, then: [
        { mochi: "Plain love. That was the answer all along. I'm so proud I could cry. I won't. Mostly.", e: 'happy' },
      ] },
      { t: "\"Fate. Fireworks. The one person who completes me.\"", fx: { proj: 8 }, then: [
        { mochi: "Fireworks last eight seconds. Then someone has to sweep up. Hope you like sweeping.", e: 'sad' },
      ] },
      { t: "\"Don't know yet. Ask me again in ten years.\"", fx: { wisdom: 6, self: 4 }, then: [
        { mochi: "Most honest answer I've ever had. Keep asking yourself.", e: 'happy' },
      ] },
    ] },
    { if: (s) => Object.keys(s.reflections || {}).length >= 7, then: [{ ach: 'deepThinker' }] },

    { show: 'ama', e: 'happy', at: 'center' },
    { s: 'ama', e: 'happy', t: "Ah Ma now help teach the CC phone class. Advanced level. Got waiting list, you know." },
    { hide: '*' },
    { n: "Two years later." },
    { ending: '@auto' },
    { if: (s) => s.route === 'solo' && !!s.flags.nanaCoffee && (((s.cast || {}).nana || {}).aff || 0) >= 10, then: [{ ending: 'slow_start_nana' }] },
    { if: (s) => s.flags.reiRedemption, then: [{ ending: 'rei_friend' }] },
    { if: (s) => s.lessons.length >= Math.ceil(Object.keys(window.LESSONS || {}).length * 0.85), then: [{ ending: 'mochi_graduates' }] },
    { mochi: "That's the end of my guide, rookie. Not the end of your story. Go live it.", e: 'happy' },
    { chapterEnd: true },
  ],
};
