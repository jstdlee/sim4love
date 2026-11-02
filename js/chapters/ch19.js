/* Chapter 19 — "The Perfect Match". Adult-grade scams: pig-butchering, deposit "agencies", sextortion, MLM, and shame-free help. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch19 = {
  id: 'ch19', part: "Part V — On Your Own", title: "Chapter 19", subtitle: "The Perfect Match",
  next: "Chapter 20 — Your Own Story", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'camp' },
    SIM.split([
      { n: "A long week in camp. {her} is busy with exams. You're scrolling on the bus home when a message request pops up." },
      { phone: 'Lin' },
      { txt: 'Lin', t: "Oh sorry, wrong number! 😅 But you seem really nice. Can we chat?" },
    ], [
      { n: "A long week in camp. Everyone in your section has a dating app. You download one at 11 PM, which Mochi calls \"the loneliest hour\"." },
      { phone: 'Lin' },
      { txt: 'Lin', t: "Hi! Lin, 24, finance 💼 Your profile made me smile. Chat?" },
    ]),

    // 19-1 pig-butchering
    { txt: 'Lin', t: "Good morning dear 🌸 Have you eaten? You work so hard. I wish someone would take care of you like I would." },
    { txt: 'Lin', t: "Look, my crypto app made 18% this week 📈 My uncle taught me. Let me teach you, so we can build our future together." },
    { phoneOff: true },
    { choice: "A week of good-morning texts, and now a trading app.", opts: [
      { t: "Reverse-image search her photos. Don't invest. Report and block.", fx: { wisdom: 12, wallet: 4 }, lesson: 'pigbutcher', ach: 'scamSpotter', then: [
        { n: "The photos belong to a lifestyle influencer in another country, with 400,000 followers and no idea \"Lin\" exists." },
        { mochi: "Sweet talk, then a money tip, then \"our future\". The romance is the bait. The app is the hook.", e: 'doctor' },
        { resource: 'scam' },
      ] },
      { t: "Put in $200 to try. Only a little what.", fx: { wallet: -8, wisdom: -6 }, lesson: 'pigbutcher', then: [
        { txt: 'Lin', t: "See? +$46 already! 🥰 Now add margin and it doubles. Only $3,000. For us." },
        { choice: "The app shows profit. You can't withdraw it.", opts: [
          { t: "Stop. Screenshot everything. Report to the police and call ScamShield 1799.", fx: { wisdom: 8, wallet: 2 }, lesson: 'pigbutcher', then: [
            { mochi: "Lost $200 and stopped? That's a win. This only works on people too paiseh to stop.", e: 'happy' },
            { resource: 'scam' },
          ] },
          { t: "Borrow money and add margin.", fx: { wallet: -30 }, then: [
            { badEnd: { title: "BAD END #25 — The Soulmate Portfolio 2: Leveraged", resource: 'scam',
              text: "The \"profits\" were numbers on a fake app. Every top-up went straight to the scammers, and the withdrawal fee was another trick. You were warned about this in JC, and it still worked, because it was built to work on lonely people. Never invest on the advice of someone you've only met online." } },
          ] },
        ] },
      ] },
    ] },

    // 19-2 deposit "agency"
    { bg: 'camp' },
    { show: 'ren', e: 'neutral', at: 'center' },
    { s: 'ren', t: "Guys, guys. VIP matchmaking agency. Dates with models, guaranteed. Just $300 deposit. Then a small \"verification fee\". Should I?" },
    { choice: "Ryan is holding his phone like it's a winning 4D ticket.", opts: [
      { t: "\"Walk away, bro. You can't buy someone liking you. And that agency doesn't exist.\"", fx: { wisdom: 8, self: 4 }, lesson: 'depositscam', then: [
        { s: 'ren', e: 'sad', t: "...The website was made last week. Huh. Okay. I don't need another debt." },
        { mochi: "Deposit, verification fee, \"insurance\", silence. The girl in the photos never existed.", e: 'doctor' },
      ] },
      { t: "\"Go lah! Models!\"", fx: { wisdom: -8 }, lesson: 'depositscam', then: [
        { n: "Ryan pays $300, then $150 \"verification\", then $500 \"insurance\". The agency's number stops working on Friday." },
        { mochi: "If it's selling you a person, it's selling you nothing.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 19-3 sextortion
    { bg: 'bedroom' }, { bgm: 'tense' },
    SIM.split([{ n: "A few nights later. A stranger from a gaming server you're in suddenly wants a video call. On camera, she starts undressing and asks you to do the same." }],
      [{ n: "Another match, very flirty. A video call at midnight. On camera, she starts undressing and asks you to do the same." }]),
    { choice: "Something about the video looks pre-recorded.", opts: [
      { t: "Decline and end the call. Block and report.", fx: { wisdom: 10, self: 6 }, lesson: 'sextortion', then: [
        { mochi: "The \"woman\" was a loop of someone else's video. The target was a recording of you. Hanging up ended the scam.", e: 'doctor' },
      ] },
      { t: "Go along with it.", fx: { wisdom: -10, self: -6 }, lesson: 'sextortion', then: [
        { phone: "Unknown" },
        { txt: 'Lin', t: "I recorded everything. Pay $3,000 or I send it to all your contacts and your camp." },
        { phoneOff: true },
        { choice: "Your stomach drops.", opts: [
          { t: "Don't pay. Keep the evidence, report to the platform and the police, call ScamShield 1799, tell someone you trust.", fx: { wisdom: 10, self: 6 }, lesson: 'sextortion', then: [
            { mochi: "You're the victim of a crime, not the one in trouble. Paying never ends it. It just proves you'll pay again.", e: 'doctor' },
            { resource: 'sextortion' },
          ] },
          { t: "Pay, so it goes away.", fx: { wallet: -25, self: -10 }, then: [
            { badEnd: { title: "BAD END #26 — Paid in Full, Twice", resource: 'sextortion',
              text: "You paid. Two days later they asked for more. Sextortion never ends with a payment, because paying shows them you will pay. Don't pay, keep the evidence, report it, and tell someone you trust. It's a crime against you, and you're not alone." } },
          ] },
        ] },
      ] },
    ] },

    // 19-4 MLM
    { bg: 'cafe' },
    { s: 'Brandon', t: "Bro! Long time! I'm with Alpha Kai's new network now. \"Wealth Mindset\" seminar on Saturday. Your friends are holding you back. You need a circle of winners." },
    { choice: "\"A circle of winners\" sounds suspiciously like a circle.", opts: [
      { t: "Decline. Look up the reviews. Warn Haziq before they reach him.", fx: { wisdom: 8, kenta: 4 }, lesson: 'mlm', then: [
        { n: "Reviews: \"had to buy $2,000 of starter stock\", \"lost all my friends\", \"the seminar was four hours of a man in a rented Lamborghini\"." },
      ] },
      { t: "Sign up. You could be a winner.", fx: { wallet: -10, wisdom: -6 }, lesson: 'mlm', then: [
        { s: 'Brandon', t: "Great! Now bring three people and your starter pack pays for itself!" },
        { choice: "Your upline wants three names.", opts: [
          { t: "Quit. Ask for a refund. Warn your friends instead.", fx: { wisdom: 8, kenta: 2 }, lesson: 'mlm' },
          { t: "Recruit Haziq and Mei.", fx: { kenta: -20, wallet: -10 }, then: [
            { badEnd: { title: "BAD END #27 — Downline",
              text: "You recruited your best friend and your sister. They lost money, and you lost their trust. If a scheme mainly pays you for bringing in people, not for selling to real customers, the people at the bottom almost always lose. \"Your friends are holding you back\" is a tactic to isolate you." } },
          ] },
        ] },
      ] },
    ] },
    { talk: 'fraud' },

    // Rae's talk and 19-5
    { bg: 'lecture' },
    { show: 'rei', e: 'neutral', at: 'center' },
    { if: (s) => s.flags.reiRedemption, then: [
      { n: "A community talk at the polytechnic: \"How scams target lonely men\". The speaker is Rae." },
      { s: 'rei', e: 'neutral', t: "Two years ago, I was the girl in the script. I know every line. Here they are." },
    ], else: [
      { n: "A community talk at the polytechnic: \"How scams target lonely men\". The speaker, to your surprise, is Rae." },
      { s: 'rei', e: 'neutral', t: "I got out of an \"agency\" last year, with help from a hotline and a very patient caseworker. Now I teach the script, so you can spot it." },
    ] },
    { s: 'rei', e: 'neutral', t: "Sweet talk. A crisis. Money. Secrecy. See that pattern, stop. And if it already got you: you're not stupid. You were targeted by professionals." },
    { hide: '*' },
    { show: 'kenta', e: 'sad', at: 'center' },
    { s: 'kenta', e: 'sad', t: "Bro. After that talk... there's this girl messaging me. Sweet, every day. Now she needs $800 for a \"hospital bill\". I almost sent it." },
    { choice: "Haziq looks like he wants the floor to swallow him.", opts: [
      { t: "\"That's exactly the script. You did the hardest part, telling me. Let's report it together. No judgement.\"", fx: { kenta: 12, wisdom: 6 }, lesson: 'noshame', then: [
        { s: 'kenta', e: 'neutral', t: "...Okay. Thanks for not laughing. I really thought she liked me." },
        { mochi: "Scammers need shame. You just took it away.", e: 'happy' },
        { resource: 'scam' },
      ] },
      { t: "\"How dumb are you?\"", fx: { kenta: -12, wisdom: -6 }, lesson: 'noshame', then: [
        { s: 'kenta', e: 'angry', t: "This is why nobody tells anyone anything." },
        { mochi: "He came to you before sending money. Next time, he'll come to no one.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },
    SIM.evening('ch19'),
    { chapterEnd: true },
  ],
};
