/* Chapter 14 — "Prelims & Storm Season". Focus, sleep, supporting her, small lies, a possible breakup, and recovery.
   A healthy breakup sets flags.kindGoodbye = heroine id and moves the story to the solo route. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const WHY = {
    hina: "Her nenek was admitted to hospital last week. Hanis has been visiting every evening, then studying till 2 AM, and she keeps saying she's \"fine\" in a voice that is not fine.",
    mio: "Her parents saw her mid-year chemistry grade. Now every dinner is medicine-or-nothing. Xin Yi hasn't written a word of her own in a month.",
    kaede: "She tore a hamstring two weeks before the SEA Games selection trial. Her parents are overseas, and her aunt keeps saying it's \"a sign to focus on studies\".",
    yuna: "A clip of hers went viral for the wrong reasons. The comments are vicious, her mum is doing double shifts, and Elise has stopped streaming.",
    chloe: "The supplier stopped giving her dad credit. Chloe has been doing the 5 AM prep before school every day, and yesterday she fell asleep standing at the steamer.",
    preet: "She said yes to everything again: debate camp, CC tuition, peer-educator training, two projects. Last night she cried over a printer jam and then apologised to the printer.",
    ava: "Her dad's company is moving him to Seattle after the A-levels. Ava has been posting sunsets all week and replying to your texts with one word.",
  };
  const ARCADE = {
    hina: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
    mio: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
    kaede: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
    yuna: "You told {her} you were studying tonight. You're at the mall arcade with Haziq, and it was fun right up until Haziq posted a story.",
    chloe: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
    preet: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
    ava: "You told {her} you were studying tonight. You're at the mall arcade with Elise, and it was fun right up until Elise posted a story.",
  };
  const R = (f) => SIM.byRoute(Object.fromEntries(SIM.HEROINES.map((h) => [h, f(h)])), []);
  const goodbye = (extra) => R((h) => [{ flag: { kindGoodbye: h, brokeUp14: true } }, { route: 'solo' }].concat(extra || []));
  const endIt = (h) => [{ flag: { brokeUp14: true } }, { route: 'solo' }];

  const breakup = [
    { show: '@route', e: 'sad', at: 'center' },
    { s: '@route', e: 'sad', t: "I've been thinking about this for weeks. I care about you. But I don't think we're good for each other right now. I need to end it." },
    { choice: "Your chest goes very tight.", opts: [
      { t: "\"It hurts. But okay. I respect it. Thank you, really. For everything.\"", fx: { self: 10, wisdom: 8 }, lesson: 'breakup', then: [
        { s: '@route', e: 'shy', t: "...Thanks for making this a goodbye I can remember without cringing." },
        { n: "She walks to the MRT. You don't follow. Hardest, kindest thing you've done all year." },
        goodbye(),
      ] },
      { t: "Beg. Send forty messages tonight. Wait outside her block tomorrow.", fx: { self: -12, wisdom: -8 }, lesson: 'breakup', then: [
        { s: '@route', e: 'angry', t: "Please stop. You waiting downstairs is scary, not romantic. I mean it. We're done." },
        { mochi: "No means no for breakups too. Following her doesn't feel like love to her. It feels unsafe.", e: 'sad' },
        R(endIt),
      ] },
      { t: "Post a revenge story about her and go find her new friends' accounts.", fx: { self: -20, wisdom: -15 }, lesson: 'breakup', then: [
        { badEnd: { title: "BAD END #18 — Main Character Syndrome",
          text: "She left, and you made it a show: a revenge post, then watching her new friends' accounts. That's harassment, the opposite of love. A breakup isn't a betrayal you get to punish. It hurts, and the only healthy move is to let her go and look after yourself." } },
      ] },
    ] },
    { hide: '*' },
  ];

  window.CHAPTERS.ch14 = {
    id: 'ch14', part: "Part IV — Real Life", title: "Chapter 14", subtitle: "Prelims & Storm Season",
    next: "Chapter 15 — Results Day", status: 'done',
    script: [
      SIM.gate(),
      { bg: 'library' },
      WEAR('school'),
      { n: "August. Prelims in five weeks, A-Levels in ten. The library smells of highlighters and panic." },

      // 14-1 focus
      SIM.split([
        { phone: '{her}' },
        { txt: '@route', t: "are u there" },
        { txt: '@route', t: "helloooo" },
        { txt: '@route', t: "why u not replying 🥺" },
        { phoneOff: true },
        { think: "Study block, 7 to 10. I've answered every message for a week and remembered nothing. Skipped CCA twice to be \"available\"." },
      ], [
        { phone: "boys only 🏀" },
        { txt: 'kenta', t: "bro one game. ONE. ok three" },
        { txt: 'kenta', t: "u skipped cca again? coach asked" },
        { phoneOff: true },
        { think: "Study block, 7 to 10. I've been gaming with Haziq every night and skipped CCA twice. My notes look like a crime scene." },
      ]),
      { choice: "The study block is slipping away.", opts: [
        { t: "Phone-free hours, one call at 10, back to CCA.", fx: { goal: 10, passion: 4, trust: 4, self: 4 }, lesson: 'focus', then: [
          SIM.split([{ txt: '@route', t: "ok that's actually smart. 10pm call. i'll do the same 📚" }], [{ txt: 'kenta', t: "fine. 10pm one game. and cca saturday, i'll come watch" }]),
          { mochi: "Always online, never actually there. Fixed.", e: 'happy' },
        ] },
        { t: "Answer every message. Skip CCA again.", fx: { goal: -8, passion: -6, self: -6 }, lesson: 'selfneglect', then: [
          { mochi: "No studying, no CCA, and she still felt ignored because you were half there. Everyone lost.", e: 'sad' },
        ] },
        { t: "Go silent without telling anyone.", fx: { goal: 4, trust: -6 }, lesson: 'focus', then: [
          { mochi: "Right idea, missing one text: \"studying till 10, talk then.\"", e: 'smug' },
        ] },
      ] },

      // 14-2 sleep
      { bg: 'bedroom' },
      WEAR('home'),
      { n: "Three all-nighters. Four cans of energy drink on the desk. Your hands are shaking a bit, which you decide is \"focus\"." },
      { choice: "It's 2 AM. Paper 2 is tomorrow.", opts: [
        { t: "Close the books. Eat, shower, sleep. Walk to school in the morning.", fx: { health: 12, goal: 6 }, lesson: 'sleep', then: [
          { mochi: "Your brain saves while you sleep. All-nighters are studying with autosave off.", e: 'doctor' },
        ] },
        { t: "Fourth all-nighter. Just one more.", fx: { health: -10, goal: -4 }, lesson: 'sleep', then: [
          { n: "You read the same paragraph eleven times. In the morning you can't remember the formula you wrote at 4 AM." },
          { choice: "Paper 3 is tomorrow. The energy drink is right there.", opts: [
            { t: "Stop. Sleep tonight, no matter what.", fx: { health: 8 }, lesson: 'sleep' },
            { t: "Fifth all-nighter.", fx: { health: -20 }, then: [
              { badEnd: { title: "BAD END #22 — Energy Drink Speedrun",
                text: "Five nights without sleep, then you fell asleep twenty minutes into the paper. Sleep isn't a reward for finishing work; it's how your brain stores it. Exhausted students do worse, not better, and too much caffeine can also cause palpitations and anxiety." } },
            ] },
          ] },
        ] },
      ] },

      // 14-3 support
      SIM.split([
        { bg: 'mrt' },
        WEAR('school'),
        { show: '@route', e: 'sad', at: 'center' },
        R((h) => [{ n: WHY[h] }]),
        { s: '@route', e: 'sad', t: "I'm so tired. Of everything. Sorry. I'm being dramatic." },
        { choice: "She's crying quietly on the platform.", opts: [
          { t: "Sit with her. Listen. \"You don't have to be okay. Want to see the school counsellor? I'll walk you there.\"", fx: { trust: 10, wisdom: 6, '@route': 4 }, lesson: 'support', then: [
            { s: '@route', e: 'shy', t: "...You didn't try to fix it. Thanks. Maybe I'll go see the counsellor. You wait outside?" },
            { resource: 'mentalhealth' },
          ] },
          { t: "\"Cheer up lah. Everyone's stressed.\"", fx: { trust: -10, wisdom: -6 }, lesson: 'support', then: [
            { s: '@route', e: 'sad', t: "Right. Forget I said anything." },
            { mochi: "She said she was drowning. You graded her swimming.", e: 'sad' },
          ] },
          { t: "Become her only support. Midnight calls every night, skip your own revision.", fx: { trust: 4, health: -8, goal: -6 }, lesson: 'support', then: [
            { mochi: "Sweet, but you're not a counsellor, and you can't be her only one. Help her find more people. Sleep too.", e: 'sad' },
            { resource: 'mentalhealth' },
          ] },
        ] },
        { hide: '*' },
      ], [
        { bg: 'night' },
        WEAR('home'),
        { show: 'kenta', e: 'sad', at: 'center' },
        { s: 'kenta', e: 'sad', t: "My dad said if I don't get into engineering at NUS I'm \"wasting the family's money\". I can't sleep, bro. I just... can't." },
        { choice: "Haziq never talks like this.", opts: [
          { t: "Listen. Then: \"Want me to come with you to the school counsellor?\"", fx: { kenta: 10, wisdom: 6 }, lesson: 'support', then: [
            { s: 'kenta', e: 'neutral', t: "...Yeah. Okay. Don't tell the group chat." },
            { resource: 'mentalhealth' },
          ] },
          { t: "\"Bro, man up.\"", fx: { kenta: -10, wisdom: -6 }, lesson: 'support', then: [
            { mochi: "\"Man up\", until he stops talking at all. Just listen.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },
      ]),

      // 14-4 a small lie
      { bg: 'mall' },
      WEAR('out'),
      SIM.split([
        R((h) => [{ n: ARCADE[h] }]),
        { phone: '{her}' },
        { txt: '@route', t: "studying huh. nice arcade 🙂" },
        { phoneOff: true },
      ], [
        { n: "You told Mum you were studying at the library. You're at the arcade with Haziq. Mum just texted: \"Which library? I'm driving past, I pick you up.\"" },
      ]),
      { choice: "Caught in a small lie.", opts: [
        { t: "Come clean right away. \"I lied. I needed a break and didn't want to admit it. Sorry.\"", fx: { trust: 6, self: 6, wisdom: 4 }, lesson: 'smalllies', then: [
          SIM.split([{ txt: '@route', t: "thanks for not making it worse. next time just say \"i need a break\" lol. i'd have come" }],
            [{ n: "Mum picks you up from the arcade, unimpressed, and buys you both bubble tea anyway. \"Next time just tell me.\"" }]),
        ] },
        { t: "Double down with a bigger lie.", fx: { trust: -10, self: -4 }, lesson: 'smalllies', then: [
          { mochi: "Lie two needs lie three. You're now running a small, failing company.", e: 'smug' },
        ] },
        { t: "Get Haziq to fake an alibi in the group chat.", fx: { trust: -15, wisdom: -10 }, then: [
          { badEnd: { title: "BAD END #17 — The Alibi Group Chat",
            text: "Haziq posted a fake library photo. Yesterday's date was on the whiteboard. Now it isn't a small lie: it's a planned deception with a witness. Small lies grow. The cheapest moment to tell the truth is always the first one." } },
        ] },
      ] },

      // 14-ava: "Easier if we end it now, right?"
      SIM.split([SIM.byRoute({ ava: [
        { bg: 'cafe' },
        WEAR('out', { ollie: 'teaching' }),
        { n: "Thursday Open Night. Ava came, but she's been quiet all evening at the back table, camera in her lap. Between sets, Ollie sits down across from you both with an iced tea." },
        { show: 'ollie', e: 'neutral', at: 'right' },
        { s: 'ollie', e: 'neutral', t: "Seattle, I hear. Did long-distance myself. Singapore and Manchester. Eight hours apart." },
        { s: 'ollie', e: 'neutral', t: "Didn't work, to be honest. Not the distance. We both stopped saying the hard stuff to keep the calls nice. Bit of a nightmare by the end." },
        { s: 'ollie', e: 'happy', t: "Doesn't mean yours won't. Just... say the hard stuff. Right. My set." },
        { hide: 'ollie' },
        { show: 'ava', e: 'sad', at: 'center' },
        { s: 'ava', e: 'sad', t: "So. Seattle. Then probably California for uni. It's fine. I've done this four times." },
        { s: 'ava', e: 'sad', t: "Easier if we end it now, right? Before it gets hard. Clean." },
        { judge: { who: 'ava', id: 'ava.leave', verdict: 'fair' } },
        { choice: "She's already half looking at the door.", opts: [
          { t: "\"Easier, maybe. I don't want easier. I want to try. And if you're scared, tell me, instead of leaving early.\"", fx: { ava: 8, trust: 10, wisdom: 4 }, lesson: 'goodbye', flag: 'avaHonest14', then: [
            { s: 'ava', e: 'surprised', t: "...Nobody's ever said the \"tell me\" part." },
            { s: 'ava', e: 'neutral', t: "Okay. I'm scared. Of the time zones, and of being the one who stops calling first. That's the real version." },
            { flaw: { ava: { 'one-foot-out': 'growing' } }, why: "She told you she was scared instead of leaving early." },
          ] },
          { t: "\"If that's what you want, let's end it properly. Face to face. No fading out.\"", fx: { ava: 4, self: 6, wisdom: 6 }, lesson: 'goodbye', then: [
            { s: 'ava', e: 'sad', t: "Properly. I've never done a proper one. I always just... stopped replying." },
            { s: 'ava', e: 'neutral', t: "Thank you for this one. I'm gonna miss you. There. I said it out loud." },
            goodbye(),
          ] },
          { t: "Shrug. \"Up to you.\"", fx: { ava: -6, trust: -10 }, lesson: 'goodbye', then: [
            { s: 'ava', e: 'sad', t: "...Right. Up to me. Cool." },
            { mochi: "She asked a question she was scared of. You handed it back unopened.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },
      ] }, [])], []),

      // 14-5 breakup branch
      SIM.split([
        { bg: 'night' },
        WEAR('out'),
        { if: (s) => s.stats.trust < 30, then: breakup, else: [
          { show: '@route', e: 'neutral', at: 'center' },
          { n: "After prelims. You're both wrecked, and it's been a hard term for the two of you." },
          { choice: "Where are you two?", opts: [
            { t: "Still in it. \"This term was rough. Let's get through A-Levels together.\" Then plan one small, cheap thing to look forward to.", fx: { trust: 8, self: 4, wisdom: 4 }, then: [
              { s: '@route', e: 'happy', t: "Together. Okay. And after the last paper, first thing is prata. I belanja." },
            ] },
            { t: "Be honest: you think it might be time to end it. Say it kindly.", fx: { self: 6, wisdom: 6 }, lesson: 'breakup', then: [
              { s: '@route', e: 'sad', t: "...I've been feeling it too. I'm sad. But I'm glad you said it gently, and to my face." },
              { n: "You both cry a little at the void deck, then split the last curry puff. It's the right ending. It's still an ending." },
              goodbye(),
            ] },
          ] },
          { hide: '*' },
        ] },
      ], [
        { n: "After prelims. Nadia breaks up with Haziq, kindly and clearly. Haziq does not take it kindly or clearly." },
      ]),

      // 14-6 recovery
      { if: (s) => s.flags.brokeUp14, then: [
        { bg: 'bedroom' },
        WEAR('home'),
        { n: "3 AM. Her profile is open on your phone. Your thumb is hovering over the old chats." },
        { choice: "3 AM.", opts: [
          { t: "Close it. Mute her for a while. Message Haziq in the morning. Back to the stuff that makes you you.", fx: { passion: 8, health: 8, self: 6 }, lesson: 'recovery', then: [
            { mochi: "Muting isn't hating. It's a cast while it heals.", e: 'happy' },
          ] },
          { t: "Read every old message till sunrise.", fx: { health: -8, self: -4 }, lesson: 'recovery', then: [
            { mochi: "Pressing the bruise to check it still hurts. It does. Phone down.", e: 'sad' },
          ] },
          { t: "Send \"u up?\"", fx: { self: -8, trust: -4 }, lesson: 'recovery', then: [
            { n: "Read at 3:04 AM. No reply. Which is, honestly, the healthiest reply possible." },
          ] },
        ] },
      ], else: [SIM.split([], [
        { bg: 'night' },
        WEAR('home'),
        { phone: "Haziq" },
        { txt: 'kenta', t: "3am. on her profile. should i text her. i'm gonna text her" },
        { phoneOff: true },
        { choice: "Haziq at 3 AM.", opts: [
          { t: "\"Don't. Mute her for a while. Run with me at 7. Supper tomorrow I belanja.\"", fx: { kenta: 10, health: 4 }, lesson: 'recovery', then: [
            { txt: 'kenta', t: "ok. muted. 7am. if u oversleep i'm telling mei" },
          ] },
          { t: "\"Send lah, what's the worst that can happen.\"", fx: { kenta: -6, wisdom: -6 }, lesson: 'recovery', then: [
            { mochi: "The worst: read, no reply, and Haziq feeling worse at 3:05.", e: 'sad' },
          ] },
        ] },
      ])] },

      // financial-support talk (still together) and Think Deeper
      SIM.split([
        { bg: 'cafe' },
        WEAR('out'),
        { n: "The class trip after A-Levels costs $480. {her} can't afford it this year." },
        { talk: 'support' },
      ]),
      { bg: 'classroom' },
      WEAR('school'),
      { bg: 'voiddeck' },
      WEAR('out', { joy: 'work' }),
      { show: 'joy', e: 'neutral', at: 'center' },
      { s: 'joy', e: 'neutral', t: "Eh, you're Xin Yi's classmate, right? She hasn't slept properly in a week. Light still on at 3 AM. Her parents think it's studying. I don't think it's studying." },
      { reveal: { joy: 'sensitivity' }, why: "She noticed Xin Yi wasn't sleeping before anyone else did." },
      { choice: "Joy looks worried.", opts: [
        { t: "Send Xin Yi a no-pressure check-in, and thank Joy for noticing.", fx: { mio: 3, 'aff.joy': 3, wisdom: 2 }, then: [
          { txt: 'me', t: "hey. no need to reply. just: you ok? 🍵" },
          { s: 'joy', e: 'happy', t: "Thank you. Sometimes the aunty sees things. Nobody asks the aunty." },
          { contact: ['joy', 'mio'] },
        ] },
        { t: "\"Not really my business.\"", fx: { 'aff.joy': -2 } },
      ] },
      { hide: '*' },
      { deeper: 'careerpressure' },
      { bg: 'bedroom' },
      WEAR('home'),
      { show: 'mei', e: 'neutral', at: 'center' },
      { s: 'mei', t: "Eh. You look like a zombie. Whatever happened this year, you're still here, and you're nicer than last year. Now eat something." },
      { hide: '*' },
      SIM.evening('ch14'),
      { chapterEnd: true },
    ],
  };
})();
