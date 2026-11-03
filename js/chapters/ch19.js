/* Chapter 19 — "The Perfect Match". Adult-grade scams: pig-butchering, deposit "agencies", sextortion, MLM, and shame-free help. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch19 = {
  id: 'ch19', part: "Part V — On Your Own", title: "Chapter 19", subtitle: "The Perfect Match",
  next: "Chapter 20 — Your Own Story", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'camp' },
    WEAR('ns'),
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

    // 19-ava: the too-cheap flight
    SIM.split([SIM.byRoute({ ava: [
      { phone: 'Ava' },
      { txt: '@route', t: "OKAY found a telegram travel agent. $450 return SFO to SIN for december!!! airline site says $1,300" },
      { txt: '@route', t: "he says only 2 seats left and i have to paynow him tonight to hold them. should i??" },
      { choice: "$450 for a $1,300 ticket. Tonight only.", opts: [
        { t: "\"Video call me. Let's check the airline's own site together first. Real fares don't come from Telegram.\"", fx: { trust: 8, wisdom: 8 }, lesson: 'toocheap', flag: 'avaScamSafe', then: [
          { phoneOff: true },
          { n: "On the call you both check the booking reference he sent. It doesn't exist. His Telegram account is nine days old." },
          { show: 'ava', e: 'surprised', at: 'center' },
          { s: 'ava', e: 'surprised', t: "Oh my gosh. I almost sent it. I was so excited about seeing you I stopped thinking. Reporting him right now." },
          { mochi: "Too cheap, too urgent, strange way to pay. Scammers love long-distance couples, because missing someone makes you hurry.", e: 'doctor' },
          { resource: 'scam' },
        ] },
        { t: "\"Book it fast before it's gone!\"", fx: { trust: -4, wallet: -6 }, lesson: 'toocheap', then: [
          { txt: '@route', t: "sent 😭 now he wants $200 more for \"seat insurance\"" },
          { phoneOff: true },
          { mochi: "The ticket never existed. The \"insurance\" won't either. Report it, and next time check the airline's site first.", e: 'sad' },
          { resource: 'scam' },
        ] },
      ] },
      { phoneOff: true },
      { hide: '*' },
    ] }, [])], []),

    // 19-2 deposit "agency"
    { bg: 'camp' },
    WEAR('ns'),
    { show: 'ren', e: 'neutral', at: 'center' },
    { s: 'ren', t: "Guys, guys. VIP matchmaking agency. Dates with models, guaranteed. Just $300 deposit. Then a small \"verification fee\". Should I?" },
    { choice: "Ryan is holding his phone like it's a winning 4D ticket.", opts: [
      { t: "\"Walk away, bro. You can't buy someone liking you. And that agency doesn't exist.\"", fx: { wisdom: 8, self: 4 }, lesson: 'depositscam', then: [
        { s: 'ren', e: 'sad', t: "...The website was made last week. Huh. Okay. I don't need another debt." },
        { n: "That night he finally rings his mum in Cork. You hear \"Mam? It's me,\" then a long quiet, then: \"Actually, Mam, no. Not grand. Can I tell you something?\"" },
        { mochi: "Deposit, verification fee, \"insurance\", silence. The girl in the photos never existed.", e: 'doctor' },
      ] },
      { t: "\"Go lah! Models!\"", fx: { wisdom: -8 }, lesson: 'depositscam', then: [
        { n: "Ryan pays $300, then $150 \"verification\", then $500 \"insurance\". The agency's number stops working on Friday." },
        { mochi: "If it's selling you a person, it's selling you nothing.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 19-3 sextortion
    { bg: 'bedroom' }, WEAR('laterHome'), { bgm: 'tense' },
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
    WEAR('later', { rei: 'law' }),
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

    // Chloe and the "business coach"
    { if: (s) => !!s.flags.chloeMet, then: [
      { hide: '*' },
      { bg: 'hawker' },
      WEAR('later', { chloe: 'stall', rei: 'law' }),
      { show: 'chloe', e: 'neutral', at: 'center' },
      { n: "Chloe has a new \"business coach\" from the same network. He wants her to sell wellness tea from her stall. Starter pack: $3,000." },
      { s: 'chloe', e: 'neutral', t: "He says I'm thinking too small. Maybe I am?" },
      { flaw: { chloe: { 'ambition-blind-spot': 'seen' } }, why: "She nearly signed up for a scheme because it sounded like ambition." },
      { judge: { who: 'chloe', id: 'chloe.almost', verdict: 'fair' } },
      { choice: "Chloe has the contract open.", opts: [
        { t: "Sit down and run the numbers out loud with her: starter pack, margins, who actually buys.", fx: { chloe: 4, wisdom: 4 }, lesson: 'mlm', then: [
          { grow: { chloe: { intellect: 3 } }, why: "You ran the numbers out loud together." },
          { flaw: { chloe: { 'ambition-blind-spot': 'resolved' } }, why: "You ran the numbers out loud together." },
          { s: 'chloe', e: 'surprised', t: "Three thousand dollars to sell tea to my own customers, who'd rather buy kueh. ...Wow. I almost did that." },
          { contact: 'chloe' },
        ] },
        { t: "\"Your call. You're the business person.\"", fx: { chloe: -2 }, lesson: 'mlm', then: [
          { mochi: "Respecting her choices doesn't mean staying quiet when you can see the trap.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ] },

    // Ah Ma and "Officer Tan"
    { hide: '*' },
    { bg: 'dining' },
    WEAR('laterHome'),
    { show: 'ama', e: 'neutral', at: 'center' },
    { n: "Thursday, 2 PM. Ah Ma's phone rings. \"This is Officer Tan from the police. Your bank account is involved in money laundering. Transfer $8,000 to a safe account now, or we arrest you.\"" },
    { flaw: { ama: { 'trusts-official-voices': 'seen' } }, why: "A voice that sounded official told her to move her savings." },
    { if: (s) => !!s.flags.amaShield, then: [
      { s: 'ama', e: 'angry', t: "Officer Tan, my grandson say real police never ask money on the phone. I call him first. Bye bye!" },
      { n: "She hangs up, calls you, and then reports the number on ScamShield herself." },
      { flaw: { ama: { 'trusts-official-voices': 'resolved' } }, why: "She hung up and called you first." },
      { fx: { 'trust.ama': 10 } },
      { contact: 'ama' },
    ], else: [
      { n: "By the time Mum gets home, Ah Ma has transferred $2,000. The bank freezes the rest." },
      { s: 'ama', e: 'sad', t: "Ah Ma so stupid. Don't tell anybody." },
      { choice: "Ah Ma won't look at anyone.", opts: [
        { t: "\"You're not stupid, Ah Ma. They're professionals. Let's call the bank and the police together, now.\"", fx: { 'trust.ama': 6, wisdom: 4 }, lesson: 'noshame', then: [
          { mochi: "Scam fact card: call your bank's 24-hour hotline to freeze transfers. Report to the police: 999 if it's urgent, or the police e-services website. Install ScamShield. Real officers never ask you to transfer money.", e: 'doctor' },
          { resource: 'scam' },
          { contact: 'ama' },
        ] },
        { t: "\"Ah Ma, how could you fall for that?\"", fx: { 'trust.ama': -6 }, lesson: 'noshame', then: [
          { mochi: "She's already blaming herself. Shame is what scammers count on to keep people quiet. Report it, together, now.", e: 'sad' },
          { resource: 'scam' },
        ] },
      ] },
    ] },
    { hide: '*' },

    // 19-embassy-call: Mateo's mum
    { if: (s) => !!s.flags.mateoMet, then: [
      { bg: 'apartment' },
      WEAR('later'),
      { show: 'mateo', e: 'neutral', at: 'center' },
      { n: "Sunday lunch at the Tan Rojas flat. Mateo's mum answers her phone in Spanish, then goes pale." },
      { s: 'mateo', e: 'neutral', t: "Bro. It's \"the Colombian embassy\". They say her passport is linked to a money-laundering case. She has to move her savings to a \"safe account\" today or be arrested." },
      { choice: "His mum is already opening her banking app.", opts: [
        { t: "\"Tell her to hang up. We find the embassy's real number on its official website and call that.\"", fx: { 'aff.mateo': 6, 'trust.mateo': 6, wisdom: 8 }, lesson: 'officialcall', then: [
          { n: "She hangs up. Mateo finds the number on the embassy's official site. The real embassy says what real embassies always say: we never ask for money over the phone." },
          { s: 'mateo', e: 'happy', t: "Hermano. You saved my mamá's savings. She says you're invited to lunch forever." },
          { mochi: "Real officials never ask you to move money to a \"safe account\". Hang up, find the number yourself, call back. In any language.", e: 'doctor' },
          { resource: 'scam' },
        ] },
        { t: "\"Better do what they say. Just in case.\"", fx: { 'aff.mateo': -4, wisdom: -8 }, lesson: 'officialcall', then: [
          { n: "Mateo grabs the phone a second before she presses send. Nobody says much for the rest of lunch." },
          { mochi: "\"Just in case\" is exactly the feeling they're selling. Real officials don't rush you to transfer money.", e: 'sad' },
          { resource: 'scam' },
        ] },
      ] },
      { hide: '*' },
    ] },

    // Natalie spots a fake profile, then goes quiet
    { if: (s) => s.route === 'solo' && !!s.flags.nanaCoffee, then: [
      { bg: 'cafe' },
      WEAR('later', { rei: 'law' }),
      { show: 'nana', e: 'neutral', at: 'center' },
      { s: 'nana', e: 'neutral', t: "Look. \"Lin, 26, wine trader.\" My friend from church has been chatting with him for a month. Same photos as an influencer in Taiwan. I reverse-searched. Help me tell her gently? She's so lonely." },
      { reveal: { nana: 'compassion' }, why: "She spotted a fake profile and wanted to protect her friend's feelings." },
      { choice: "How do you help?", opts: [
        { t: "Help her write a kind message: the evidence, no \"how could you\", and the scam hotline.", fx: { 'trust.nana': 6, wisdom: 2 }, then: [{ contact: 'nana' }] },
        { t: "\"Just screenshot it to her lah.\"", fx: { 'trust.nana': -2 } },
      ] },
      { n: "Then Natalie goes quiet. A whole week. No replies." },
      { flaw: { nana: { 'ghosts-when-overwhelmed': 'seen' } }, why: "She went silent for a week." },
      { judge: { who: 'nana', id: 'nana.stupid', verdict: 'unfair' } },
      { if: (s) => (((s.cast || {}).nana || {}).trust || 0) >= 40, then: [
        { s: 'nana', e: 'sad', t: "Before I spotted Lin, there was someone else. I sent him $1,200. I couldn't tell you. I couldn't tell anyone." },
        { flaw: { nana: { 'hides-shame': 'growing' } }, why: "She told you about the $1,200." },
        { choice: "Natalie can't look at you.", opts: [
          { t: "\"Thank you for telling me. Let's report it together. Rae's hotline helped Haziq. No judgement.\"", fx: { 'trust.nana': 8, 'aff.nana': 4 }, lesson: 'noshame', then: [
            { flaw: { nana: { 'hides-shame': 'resolved', 'ghosts-when-overwhelmed': 'growing' } }, why: "You reported it together, with no judgement." },
            { s: 'nana', e: 'shy', t: "...Okay. Together. Thank you for not looking at me like I'm stupid." },
            { resource: 'scam' },
          ] },
          { t: "\"You of all people? You spotted Lin!\"", fx: { 'trust.nana': -8 }, lesson: 'noshame', then: [
            { s: 'nana', e: 'sad', t: "I know. That's why I didn't tell you." },
          ] },
        ] },
      ], else: [
        { n: "A week later she sends a thumbs-up. Nothing else. Some things take more trust than you've built so far." },
      ] },
      { hide: '*' },
    ] },

    // Rae's talk and 19-5
    { bg: 'lecture' },
    WEAR('later', { rei: 'occasion' }),
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
    // 19-deposit-scam: Ollie, with Rae
    { if: (s) => !!s.flags.ollieMet, then: [
      { bg: 'cafe' },
      WEAR('later', { rei: 'occasion', ollie: 'weekend' }),
      { show: 'ollie', e: 'sad', at: 'right' },
      { n: "After the talk, Rae walks with you to Uncle Ong's café. Ollie is at the counter, staring at his phone." },
      { s: 'ollie', e: 'sad', t: "Found a studio. Tiong Bahru, $1,100 a month, which is mad. Agent's overseas, so no viewing. Just a $2,000 deposit to hold it. Was about to send it, to be honest." },
      { flaw: { ollie: { 'cant-ask-for-help': 'seen', 'too-polite-to-check': 'seen' } }, why: "He nearly paid a $2,000 deposit rather than ask for a viewing." },
      { show: 'rei', e: 'neutral', at: 'left' },
      { choice: "Rae raises an eyebrow at you.", opts: [
        { t: "\"Ollie, that's a third of the usual rent, no viewing, overseas agent. Can we check the agent on the CEA register first?\"", fx: { 'aff.ollie': 5, 'trust.ollie': 5, wisdom: 6 }, lesson: 'toocheap', then: [
          { s: 'rei', e: 'neutral', t: "Too cheap, no viewing, pay first. That's three lines from my script. Check the register." },
          { n: "The agent's name isn't on the Council for Estate Agencies public register. The flat photos come from a listing in another city." },
          { s: 'ollie', e: 'neutral', t: "Right. Should've asked. I'm rubbish at asking. ...Thanks, both of you. Reporting it now." },
          { flaw: { ollie: { 'cant-ask-for-help': 'growing' } }, why: "He let you and Rae help him check, then reported it." },
          { resource: 'scam' },
        ] },
        { t: "\"Wah, cheap. Grab it.\"", fx: { 'aff.ollie': -2 }, lesson: 'toocheap', then: [
          { s: 'rei', e: 'neutral', t: "No. Ollie, don't. Check the agent's registration first." },
          { mochi: "Rae spotted it. You nearly cheered it on. Too good to be true usually is.", e: 'sad' },
          { resource: 'scam' },
        ] },
      ] },
      { hide: '*' },
    ] },
    SIM.evening('ch19'),
    { chapterEnd: true },
  ],
};
