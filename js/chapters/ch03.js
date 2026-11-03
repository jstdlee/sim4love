/* Chapter 3 — "Seen at 2:14 AM". Texting, privacy, sextortion, emergency scams, a birthday. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch3 = {
  id: 'ch3', part: "Part I — Rose-Tinted", title: "Chapter 3", subtitle: "Seen at 2:14 AM",
  next: "Chapter 4 — Payday", status: 'done',
  script: [
    // 3-1 Kavya's date
    { bg: 'cafe' },
    WEAR('out', { kaede: 'track' }),
    { variant: 'cafe.arrive' },
    { if: (s) => s.flags.kaedeReschedule, then: [
      { s: 'kaede', e: 'happy', at: 'center', t: "See? I came. On time. Screenshot this." },
    ], else: [
      { s: 'kaede', e: 'shy', at: 'center', t: "Hey. About last week... sorry I made you wait. Not cool. Kaya toast? I belanja." },
    ] },
    { n: "Kavya, still in her running shoes, tearing her toast into very neat strips. Teh-O-ice for her, kopi-C for you." },
    { choice: "What do you talk about?", opts: [
      { t: "Ask about her race goals. Tell her one of yours.", fx: { kaede: 12, wisdom: 6 }, lesson: 'presence', rose: true, then: [
        { s: 'kaede', e: 'neutral', t: "Under 13 seconds for the 100m by nationals. People say talent. It's 5:30 AM. Every day." },
        { me: "I want to get properly good at {passion}. Not famous. Just good." },
        { s: 'kaede', e: 'happy', t: "Okay. So we both have a 5:30 AM. Respect." },
      ] },
      { t: "\"Your teammate Priya ah, quite cute. She single?\"", fx: { kaede: -12, wisdom: -6 }, lesson: 'comparing', then: [
        { s: 'kaede', e: 'cool', t: "...Ask her yourself. I need to go stretch." },
      ] },
      { t: "Check your phone every two minutes. The group chat is popping off.", fx: { kaede: -6 }, lesson: 'presence', then: [
        { s: 'kaede', e: 'cool', t: "You can go if you're busy, you know." },
      ] },
    ] },
    { hide: '*' },

    // 3-2 text anxiety
    { bg: 'night' },
    WEAR('home'),
    { n: "9 PM. You text Xin Yi about Starlight Postman." },
    { phone: "Xin Yi 📖" }, { txt: 'me', t: "just finished ch 5. the letter scene?? 😭" }, { txt: 'sys', t: "Seen 11:02 PM" },
    { n: "2:14 AM. Nothing." },
    { choice: "Your thumb hovers...", opts: [
      { t: "Put the phone face down. Sleep. She has a life.", fx: { mio: 6, health: 4, self: 6 }, lesson: 'textanxiety', rose: true, then: [
        { phoneOff: true }, { n: "Morning." }, { phone: "Xin Yi 📖" },
        { txt: 'mio', t: "SORRY i fell asleep reading 😭 the letter scene!!! ok i have SO many thoughts" }, { phoneOff: true },
      ] },
      { t: "\"??\" \"did i do something wrong\" \"ok then\" \"nvm\"", fx: { mio: -6, self: -8 }, lesson: 'textanxiety', ach: 'read214', then: [
        { txt: 'me', t: "??" }, { txt: 'me', t: "did i do something wrong" }, { txt: 'me', t: "ok then" }, { txt: 'me', t: "nvm" }, { phoneOff: true },
        { n: "Morning: \"sorry i fell asleep! ...r u ok?\" She sounds worried. Not the good kind." },
        { mochi: "2 AM silence usually means sleep. Not a verdict.", e: 'neutral' },
      ] },
      { t: "Unsend. Resend something \"casual\". Unsend again.", fx: { health: -3 }, lesson: 'textanxiety', then: [
        { phoneOff: true }, { n: "3:40 AM. The message now just says \"hey\". You hate it." },
      ] },
    ] },

    // 3-3 chat privacy
    { bg: 'classroom' },
    WEAR('school'),
    { n: "Econs lecture. The aircon is blasting. Your phone buzzes under the table." },
    { phone: "boys only 🏀" }, { txt: 'kenta', t: "bro send ss of what Elise texts u lol" }, { txt: 'kenta', t: "we need content" },
    { choice: "The boys are waiting...", opts: [
      { t: "\"Nah, private lah.\" Then: \"Sat game still on?\"", fx: { wisdom: 6, self: 6, yuna: 4 }, lesson: 'chatprivacy', rose: true, then: [
        { txt: 'kenta', t: "ok ok respect. sat 5pm" }, { phoneOff: true },
      ] },
      { t: "Send them. It's just the boys.", fx: { yuna: -15, wisdom: -6 }, lesson: 'chatprivacy', then: [
        { phoneOff: true }, { n: "By lunch, the screenshot is in Elise's CCA chat. She doesn't look at you for a week." },
      ] },
      { t: "Send them, but crop out her name.", fx: { yuna: -10, wisdom: -3 }, lesson: 'chatprivacy', then: [
        { phoneOff: true }, { n: "Everyone knows those sparkle emojis. It leaks anyway." },
      ] },
    ] },

    // Preet: the gossip, then the CC tuition room
    { bg: 'classroom' },
    WEAR('school'),
    { n: "Recess. A girl at the next table is telling everyone that a classmate's parents are divorcing. Preet turns around." },
    { show: 'preet', e: 'angry', at: 'center' },
    { s: 'preet', e: 'angry', t: "That's not your story to tell. And you got the facts wrong, which makes it worse." },
    { n: "The girl goes red. The whole table goes quiet. Preet is right, and it was also brutal." },
    { flaw: { preet: { judgemental: 'seen' } }, why: "She shamed a gossiper in front of everyone." },
    { judge: { who: 'preet', id: 'preet.judges', verdict: 'fair' } },
    { choice: "Preet is still standing there.", opts: [
      { t: "Later, tell her she was right, and ask if there's a way to say it without making the girl cry.", fx: { preet: 6, wisdom: 2 }, then: [
        { grow: { preet: { gentleness: 6 } }, why: "You helped her correct someone without humiliating them." },
        { flaw: { preet: { judgemental: 'growing' } }, why: "You helped her correct someone without humiliating them." },
        { s: 'preet', e: 'shy', t: "...Yes. I do that. I'll apologise for the how, not the what." },
      ] },
      { t: "Laugh along. Savage.", fx: { preet: -2, self: -2 }, then: [
        { mochi: "She was right about the gossip. Cheering the takedown is just more gossip.", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },
    { n: "After school you see Preet heading to the CC with a bag of worksheets. She runs a free tuition room there." },
    { choice: "Follow her?", opts: [
      { t: "Stay and help for an hour.", fx: { preet: 10, wisdom: 2 }, then: [
        { show: 'preet', e: 'happy', at: 'center' },
        { n: "Six kids, one whiteboard. Preet kneels beside an eight-year-old and explains fractions with kaya toast. She doesn't sound like a poster at all." },
        { reveal: { preet: ['warmth', 'gentleness'] }, why: "You watched her teach at the CC tuition room." },
        { judge: { who: 'preet', id: 'preet.kind', verdict: 'fair' } },
        { contact: 'preet' },
        { hide: '*' },
      ] },
      { t: "Go home. You have your own homework.", fx: { goal: 2 } },
    ] },

    // 3-4 Aileen
    { bg: 'night' },
    WEAR('home'),
    { n: "A new follower: \"Aileen 💋\". Model photos, zero mutuals. Two days of flirty DMs." },
    { phone: "Aileen 💋" }, { txt: 'aileen', t: "ur so different from other guys 🥰" }, { txt: 'aileen', t: "send me a private pic? just for me. i'll send one back 😘" },
    { choice: "Aileen wants a private photo...", opts: [
      { t: "Don't send. Block. Report the account.", fx: { wisdom: 20, self: 8 }, lesson: 'sextortion', rose: true, then: [
        { txt: 'sys', t: "Account reported. You won't see messages from this account." }, { phoneOff: true },
        { mochi: "Model photos, no mutuals, private pic by day two? That's a script, not a person.", e: 'happy' },
      ] },
      { t: "Send it. She seems nice.", fx: { wisdom: -10 }, lesson: 'sextortion', then: [
        { txt: 'aileen', t: "lol. now pay $500 or this goes to everyone on ur school followers list. u have 2 hours." },
        { phoneOff: true },
        { n: "Your hands are shaking. Then your phone rings. Mei. Your sister never calls this late." },
        { s: 'mei', e: 'neutral', at: 'center', t: "Eh, you okay? You sounded weird in the family chat. ...What happened? Okay. Okay. Breathe first. I'm here." },
        { choice: "Mei is on the line...", opts: [
          { t: "Don't pay. Screenshot everything, block, report, and let Mei help you tell an adult and the police.", fx: { wisdom: 12, self: 8 }, lesson: 'sextortion', then: [
            { s: 'mei', e: 'happy', t: "Good. Don't pay, paying never stops it. We report, and if anything goes up we get it taken down. I'm not hanging up." },
            { resource: 'sextortion' },
          ] },
          { t: "Pay the $500. Just make it go away.", fx: { cash: -500, wisdom: -10 }, then: [
            { phone: "Aileen 💋" }, { txt: 'aileen', t: "thanks 🙂 now $1000." }, { phoneOff: true },
            { badEnd: { title: "BAD END #6 — They Always Ask Again", resource: 'sextortion',
              text: "Paying just proves you'll pay, so the price doubles. The way out: don't pay, keep the evidence, block, report, tell someone you trust. It's never your fault." } },
          ] },
        ] },
      ] },
    ] },

    // partner talk: white lies
    { hide: '*' },
    { bg: 'classroom' },
    WEAR('school'),
    { n: "Recess. Elise's aunt gave her a very ugly keychain. She posted it: \"LOVE IT 😍\"." },
    { talk: 'whitelies' },

    // 3-5 Rae emergency
    { hide: '*' },
    { bg: 'night' },
    WEAR('home'),
    { if: (s) => s.flags.reiHasLine, then: [{ phone: "Rae 🌙" }], else: [{ phone: '+65 8••• ••••' }] },
    { txt: 'rei', t: "my mom's in hospital, i need $800 tonight 😭 ur the only one i can trust" }, { txt: 'rei', t: "pls send here: payl1nk.co/rae" },
    { choice: "Rae is begging...", opts: [
      { t: "\"Sorry, I can't send money. Call your family, or ask for the hospital's medical social worker. They can actually help.\"", fx: { wisdom: 12, self: 6 }, flag: 'reiDoubt', lesson: 'emergencyscam', rose: true, then: [
        { txt: 'rei', t: "...wow. ok." }, { phoneOff: true },
        { think: "Soulmates. Crypto. \"Your friends are boring.\" Now a hospital. ...Hm." },
      ] },
      { t: "Send half. $400.", fx: { cash: -400, wisdom: -6 }, lesson: 'emergencyscam', then: [
        { txt: 'rei', t: "thank u 🥺 need the other half tmr ok" }, { phoneOff: true },
        { mochi: "The emergency never ends. The emergency is the product.", e: 'sad' },
      ] },
      { t: "Take $800 from Mei's savings tin without asking.", fx: { wisdom: -10, self: -10 }, lesson: 'emergencyscam', then: [
        { phoneOff: true }, { n: "The link wasn't a payment app. The hospital doesn't exist. Mei finds the empty tin on Sunday." },
        { badEnd: { title: "BAD END #7 — The Hospital That Wasn't",
          text: "Sudden emergency, a payment link, \"you're the only one\". Real emergencies have family, hospitals and social workers. Never send money in a rush." } },
      ] },
    ] },

    // 3-6 Hanis's birthday
    { hide: '*' },
    { bg: 'street' },
    WEAR('school'),
    { n: "Friday. Hanis's birthday. She's waiting by the lift like always, pretending it's a normal day." },
    { if: (s) => s.flags.hinaHearts, then: [{ think: "Hearts in the egg. The cat-face cloth. \"Not that I'm expecting anything.\"" }] },
    { choice: "Her present...", opts: [
      { t: "A little cat-face lunch bag from the pasar malam, $9, and a card you wrote yourself.", fx: { hina: 15, wisdom: 6, cash: -9 }, lesson: 'remember', ach: 'leftoverHearts', then: [
        { s: 'hina', e: 'blush', at: 'center', t: "You... the cloth. You noticed the cloth." },
        { s: 'hina', e: 'happy', t: "Okay this is the best present I got. Don't tell my mum." },
      ] },
      { t: "Forget. Grab a $10 gift card at 7-Eleven at 11:58 PM.", fx: { hina: -8, cash: -10 }, lesson: 'remember', then: [
        { s: 'hina', e: 'sad', at: 'center', t: "Oh. Thanks. ...It's okay." },
      ] },
      { t: "Panic and buy a $150 designer purse.", fx: { hina: -3, cash: -150, self: -4 }, lesson: 'buyinglove', then: [
        { s: 'hina', e: 'surprised', at: 'center', t: "I... can't take this. Too much. I'll feel like I owe you." },
      ] },
    ] },
    { hide: '*' },
    { bg: 'bedroom' },
    WEAR('home'),
    { s: 'mei', e: 'happy', at: 'center', t: "Eat already or not? There's mee goreng in the fridge. ...And don't ever send photos to people you haven't met. Okay. Night." },
    { chapterEnd: true },
  ],
};
