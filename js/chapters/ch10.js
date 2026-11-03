/* Chapter 10 — "Green-Eyed Monster". Jealousy, snooping, control, double standards, celebrating her wins.
   Solo route: Haziq is the jealous one; you are the friend who talks him down. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const FRIEND = {
    hina: { n: 'Faris', who: 'her cousin', what: 'first-aid drills', be: 'It Was Her Cousin' },
    mio: { n: 'Jun Hao', who: 'her co-editor on the school magazine', what: 'the magazine layout', be: 'It Was Her Editor' },
    kaede: { n: 'Arvind', who: 'her relay training partner', what: 'baton changes', be: 'It Was Her Relay Partner' },
    yuna: { n: 'Leo', who: 'her dance partner for the showcase', what: 'the lift in bar sixteen', be: 'It Was Her Dance Partner' },
    chloe: { n: 'Darren', who: "the supplier's son who delivers our pandan", what: 'the price of pandan leaves', be: 'It Was the Pandan Supplier' },
    preet: { n: 'Ethan', who: 'her debate partner', what: 'the rebuttal for the final', be: 'It Was Her Debate Partner' },
  };
  const WIN = {
    hina: "Hanis's team came first at the national first-aid competition.",
    mio: "Xin Yi won the national youth short story prize.",
    kaede: "Kavya broke the national schools record for the 400 m.",
    yuna: "Elise got a callback for the arts school audition.",
    chloe: "Chloe's kueh business plan won a youth hawker-entrepreneur grant.",
    preet: "Preet's team won the schools debate final. She was named best speaker.",
  };
  const R = (f) => SIM.byRoute(Object.fromEntries(SIM.HEROINES.map((h) => [h, f(h)])), []);

  window.CHAPTERS.ch10 = {
    id: 'ch10', part: "Part III — Being Together", title: "Chapter 10", subtitle: "Green-Eyed Monster",
    next: "Chapter 11 — The First Fight", status: 'done',
    script: [
      SIM.gate(),
      { bg: 'field' },
      WEAR('school'),
      { variant: 'mochi.morning' },
      SIM.split([
        // 10-1 jealousy
        R((h) => [
          { n: `After school, edge of the field. {her} is laughing with a tall guy you've never seen. ${FRIEND[h].n}. He says something; she laughs harder.` },
          { think: "Why is she laughing like that? She never laughs like that at my jokes. ...Does she?" },
        ]),
        { mochi: "Ah. The green-eyed monster. Feeling it is normal. Feeding it is optional.", e: 'smug' },
        { choice: "Your chest is tight. What do you do with it?", opts: [
          { t: "Admit it to yourself first. Later, calmly: \"I felt a bit jealous just now. Can I meet him?\"", fx: { trust: 8, wisdom: 6, self: 4 }, lesson: 'jealousy', then: [
            R((h) => [
              { s: h, e: 'happy', at: 'center', t: `Oh! That's ${FRIEND[h].n}, ${FRIEND[h].who}. Come, I introduce you. Thanks for just saying it.` },
              { n: `${FRIEND[h].n} shakes your hand and immediately starts complaining about ${FRIEND[h].what}. He is extremely normal.` },
            ]),
          ] },
          { t: "Sulk. Reply \"k\" to everything all evening.", fx: { '@route': -8, trust: -8 }, lesson: 'jealousy', then: [
            { phone: '@route' }, { txt: '@route', t: "did I do something?" }, { txt: 'me', t: "k" }, { txt: '@route', t: "…ok" }, { phoneOff: true },
            { mochi: "\"k\" is a door slammed very quietly.", e: 'sad' },
          ] },
          { t: "March over and confront him in front of everyone.", fx: { '@route': -20, trust: -25 }, lesson: 'jealousy', then: [
            R((h) => [
              { s: h, e: 'angry', at: 'center', t: `${FRIEND[h].n} is ${FRIEND[h].who}. Everyone is filming. Please just go home.` },
              { badEnd: { title: `BAD END #12 — ${FRIEND[h].be}`,
                text: "Jealousy writes a story fast, and it's usually wrong. Feel it, name it, then ask calmly. A public scene humiliates her, her friend and you, and shows her what your fear does when it's driving." } },
            ]),
          ] },
        ] },
        { hide: '*' },

        // 10-2 snooping
        { bg: 'cafe' },
        WEAR('school'),
        R((h) => [{ n: `Bubble tea after class. {her} goes to the washroom. Her phone lights up on the table: "${FRIEND[h].n}: about tomorrow…"` }]),
        { choice: "The screen is still lit...", opts: [
          { t: "Don't touch it. Flip it face down so you're not tempted.", fx: { trust: 6, self: 4, wisdom: 4 }, lesson: 'snooping', then: [
            { n: "She comes back, glances at it, laughs. \"He wants to swap tomorrow's practice. Boring.\" You didn't need to know. Now you know anyway." },
          ] },
          { t: "Quickly read the chat. Just to be sure.", fx: { trust: -30, '@route': -10, self: -6 }, lesson: 'snooping', then: [
            { s: '@route', e: 'sad', at: 'center', t: "You're reading my phone? ...I would've shown you if you asked. Now I don't know what you'll read next." },
          ] },
          { t: "Install a tracking app while she's away.", fx: { trust: -40 }, lesson: 'control', then: [
            { n: "Two days later her phone flags an unknown app sharing her location. She finds out who installed it." },
            { badEnd: { title: "BAD END #13 — Trust.exe Has Stopped Working",
              text: "Tracking a partner without consent is control, not care, and secretly putting spyware on someone's phone can be a crime. If you can't trust someone without watching them, the problem isn't on their phone." } },
          ] },
        ] },
        { hide: '*' },

        // 10-3 Alpha Kai on control
        { bg: 'bedroom' },
        WEAR('home'),
        { phone: "Alpha Kai 🔴 LIVE" },
        { txt: 'kai', t: "Real men know where their woman is 24/7. Make her share location. Nothing to hide = she won't mind. 💯" },
        { phoneOff: true },
        { choice: "Alpha Kai is back on your feed...", opts: [
          { t: "Close it. Unfollow. Not interested.", fx: { wisdom: 6, self: 6, proj: -4 }, lesson: 'control', ach: 'unsubscribed1', then: [
            { mochi: "Unfollowed. Your feed just got 30% less shouty.", e: 'happy' },
          ] },
          { t: "Text her: \"Share your location. If you've nothing to hide…\"", fx: { trust: -15, '@route': -8, wisdom: -6 }, lesson: 'control', then: [
            { phone: '@route' }, { txt: '@route', t: "did someone tell you to say that? because it doesn't sound like you." }, { phoneOff: true },
            { mochi: "Location sharing is fine when you both want it. Demanded, it's a leash.", e: 'angry' },
          ] },
          { t: "Ask Haziq. Then ask Uncle Ong.", fx: { wisdom: 4 }, lesson: 'control', ach: 'askOgawa', then: [
            { txt: 'kenta', t: "do it bro. alpha moves 😤" },
            { show: 'ogawa', e: 'neutral', at: 'center' },
            { s: 'ogawa', e: 'sad', t: "My ex-wife and I tracked each other one whole year. Very accurate. Every minute I knew where she was. No idea who she was anymore. Don't." },
          ] },
        ] },
        { hide: '*' },

        // 10-4 double standard
        { bg: 'street' },
        WEAR('school'),
        { s: '@route', e: 'neutral', at: 'center', t: "Can I ask something? Who's Rae? Why is she still texting you?" },
        { choice: "She saw the name on your screen.", opts: [
          { t: "Just be straight. Tell her who it is, and offer to show the chat if she wants.", fx: { trust: 10, '@route': 6, wisdom: 4 }, lesson: 'doublestandard', then: [
            { s: '@route', e: 'happy', t: "I don't need to read it. I just needed you to not get weird about it. Thanks." },
          ] },
          { t: "\"Why are you checking on me? You don't trust me?\"", fx: { trust: -12, '@route': -8 }, lesson: 'doublestandard', then: [
            { s: '@route', e: 'angry', t: "I asked ONE question. Last week you were upset about one guy I study with. Funny ah." },
            { mochi: "Rules for her, none for you. There's a name for that.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },

        // 10-5 celebrate her wins
        { bg: 'classroom' },
        WEAR('school'),
        { n: "Your maths test comes back. 38 out of 100. Ten minutes later, the class group chat explodes." },
        R((h) => [{ n: WIN[h] }]),
        { choice: "She runs over, glowing. You're holding a 38.", opts: [
          { t: "Celebrate her, all the way. Your test can wait till tomorrow.", fx: { '@route': 10, trust: 8, self: 2 }, lesson: 'celebrate', then: [
            { s: '@route', e: 'happy', at: 'center', t: "You're the first person I wanted to tell. And you look happier than my mum. Okay, almost." },
            { n: "Next day she sits with you through two hours of differentiation." },
          ] },
          { t: "\"It's just a competition. Not a big deal.\"", fx: { '@route': -12, trust: -10 }, lesson: 'celebrate', then: [
            { s: '@route', e: 'sad', at: 'center', t: "...It was a big deal to me." },
          ] },
          { t: "Make the evening about your failed test.", fx: { '@route': -5, trust: -3 }, lesson: 'celebrate', then: [
            { n: "She spends her big night comforting you. On the way home she checks her phone. Thirty congratulations. She hasn't replied to any." },
          ] },
        ] },
        SIM.byRoute({
          chloe: [
            { n: "Three days later, Chloe faints at the stall after a 6 AM shift. Dehydration, the polyclinic says. She's back at the steamer by noon." },
            { flaw: { chloe: { workaholic: 'seen' } }, why: "She collapsed after a 6 AM shift and went straight back to work." },
            { choice: "She's already wiping down the counter.", opts: [
              { t: "Take the afternoon shift with her aunty so she can sleep. \"The stall can survive one nap.\"", fx: { chloe: 6, trust: 6 }, sig: 2, then: [
                { flaw: { chloe: { workaholic: 'growing' } }, why: "You covered her shift so she could rest." },
                { s: 'chloe', e: 'shy', at: 'center', t: "...Fine. One nap. If the kueh sells out without me I'll be very offended." },
              ] },
              { t: "\"Wah, so hardworking. Inspiring.\"", fx: { chloe: 1 }, then: [
                { mochi: "Praising overwork is a refill, not a rest. She needed someone to tell her to stop.", e: 'sad' },
              ] },
            ] },
          ],
          preet: [
            { s: 'preet', e: 'neutral', at: 'center', t: "And you. You don't have to be okay about the 38, you know. You're allowed to be annoyed for one evening." },
            { reveal: { preet: 'sensitivity' }, why: "She noticed you were hurting before you said it." },
            { s: 'preet', e: 'happy', t: "Anyway. I also said yes to peer-educator training, two group projects, CC Saturdays and the debate camp. It's fine. I made a colour-coded plan." },
            { flaw: { preet: { overcommits: 'seen' } }, why: "She said yes to five things in one week." },
            { choice: "The colour-coded plan has no colour for sleep.", opts: [
              { t: "Help her pick one thing to drop, and offer to tell the group with her.", fx: { preet: 4, trust: 6 }, sig: 2, then: [
                { flaw: { preet: { overcommits: 'growing' } }, why: "You helped her drop one thing." },
                { s: 'preet', e: 'shy', t: "Dropping the second group project feels illegal. ...It also feels like breathing." },
              ] },
              { t: "\"You'll manage lah, you always do.\"", fx: { preet: -2 }, then: [
                { s: 'preet', e: 'neutral', t: "Yes. I always do. That's sort of the problem." },
              ] },
            ] },
          ],
        }, []),
        { hide: '*' },
        { talk: 'cheating' },
      ], [
        // solo branch: Haziq is the jealous one
        { n: "Haziq has a girlfriend now. Nadia, from the poly down the road. He's very happy. This week he's also a mess." },
        { show: 'kenta', e: 'sad', at: 'center' },
        { s: 'kenta', e: 'sad', t: "Bro. She went for bubble tea with a guy from her course. A GUY. What do I do?" },
        { choice: "Haziq is spiralling.", opts: [
          { t: "\"Jealous is normal. Tell her how you felt, calmly, and ask to meet him.\"", fx: { kenta: 8, wisdom: 6 }, lesson: 'jealousy', then: [
            { s: 'kenta', e: 'happy', t: "...Just say it? Like a normal person? Okay. So simple it's scary." },
          ] },
          { t: "\"Go there and tell him back off.\"", fx: { kenta: -4, wisdom: -6 }, lesson: 'jealousy', then: [
            { mochi: "Your advice nearly started a fight in a bubble tea shop.", e: 'angry' },
          ] },
        ] },
        { s: 'kenta', e: 'neutral', t: "Also. When she went toilet, her phone lit up. Should I check next time? Kai says make her share location 24/7." },
        { choice: "Your best friend is about to do something dumb.", opts: [
          { t: "\"Don't read her phone. Don't demand her location. That's control, bro, not love.\"", fx: { kenta: 6, wisdom: 6, self: 4 }, lesson: 'snooping', ach: 'unsubscribed1', then: [
            { s: 'kenta', e: 'sad', t: "Control. Okay. When you say it out loud it sounds bad. Unfollowing Kai. Again. For real this time." },
          ] },
          { t: "\"If she's got nothing to hide, she won't mind.\"", fx: { wisdom: -8, kenta: -2 }, lesson: 'control', then: [
            { n: "Two days later Nadia tells Haziq she feels watched. He calls you at midnight, crying." },
            { mochi: "Okay. Now help him fix it.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },
        { bg: 'classroom' },
        WEAR('school'),
        { n: "Your maths test comes back: 38 out of 100. Same afternoon, Mei posts in the family chat." },
        { phone: "Family 🏠" }, { txt: 'mei', t: "I GOT THE INTERNSHIP 🎉🎉🎉" }, { phoneOff: true },
        { choice: "You're holding a 38.", opts: [
          { t: "Call her and celebrate properly. Your test can wait.", fx: { self: 4, wisdom: 4, kenta: 2 }, lesson: 'celebrate', then: [
            { show: 'mei', e: 'happy', at: 'center' }, { s: 'mei', e: 'happy', t: "You screamed louder than Mum. Okay, bring the 38 tomorrow. I'll help." },
          ] },
          { t: "\"Cool.\" Then complain about your test.", fx: { wisdom: -4 }, lesson: 'celebrate', then: [
            { mochi: "Her good day just became your bad day. Celebrate first. Sulk later. Ideally never.", e: 'sad' },
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
