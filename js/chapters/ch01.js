/* Chapter 1 — "First Week of JC". Five interactions, one per heroine. Commands: see the top of js/engine.js. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch1 = {
  id: 'ch1', part: "Part I — Rose-Tinted", title: "Chapter 1", subtitle: "First Week of JC",
  next: "Chapter 2 — The Group Date", status: 'done',
  script: [
    { bg: 'bedroom', petals: false },
    { n: "February. Orientation week at Bayview JC. 6:52 AM." },
    { n: "Last year in Sec 4, {name} confessed to a girl at the canteen drinks stall. She said \"eww\" and ordered a bandung." },
    { think: "New school. Nobody here knows about the bandung. This year, confirm got girlfriend. ...Probably." },
    { n: "*bzzzt*. The phone on the desk lights up. Nobody is calling." },
    { mochi: "Nyaa~! Morning! I'm Mochi, Love God, trainee grade. Your phone just got picked for LOVE TRAINING!", e: 'happy' },
    { me: "A cat. In my phone. Okay. Still dreaming." },
    { mochi: "My final exam is you. One hopeless boy, one year, one actual clue about love. No pick-up lines." },
    { mochi: "Your choices move people closer or further. Some are traps. Some end very, very badly." },
    { mochi: "Relax. If you crash, I rewind. Once. Twice. Okay, as many times as it takes.", e: 'smug' },
    { n: "*knock knock knock*" },
    { s: 'hina', e: 'happy', at: 'center', t: "{name}! Orientation starts at 7:30! Don't tell me you're still in your pyjamas." },
    { n: "Nur Hanis. Same HDB corridor since K1. She was there for the bandung. She was there for everything." },
    { s: 'hina', e: 'shy', t: "Also. My mum cooked too much nasi lemak, so... here. Leftovers. Don't make it weird." },
    { n: "The tupperware is wrapped in a cloth with cat faces on it. Inside, the egg has been cut into little hearts. Very leftover." },
    { s: 'hina', e: 'neutral', t: "Oh ya, my birthday's the Friday after next. Not that I'm expecting anything. At all." },
    { flag: 'hinaBirthdayKnown' },
    { mochi: "First one. Look properly, rookie.", e: 'neutral' },
    { choice: "Hanis holds out the box...", opts: [
      { t: "\"Thanks, Hanis. Wait, you cut the egg into hearts? Okay, my morning is made.\"", fx: { hina: 15, wisdom: 5 }, lesson: 'appreciation', flag: 'hinaHearts', then: [
        { s: 'hina', e: 'blush', t: "You— you saw that?! ...Hearts are easier to cut, okay. Everyone knows." },
        { s: 'hina', e: 'happy', t: "Go change. Five minutes. I'm waiting at the lift." },
      ] },
      { t: "\"Leftovers, huh? Trying to make me fat so no one else wants me?\"", fx: { hina: 5 }, lesson: 'teasing', then: [
        { s: 'hina', e: 'angry', t: "Hah?! You don't need my help for that. You're doing great on your own." },
        { s: 'hina', e: 'happy', t: "...But finish it. All of it." },
      ] },
      { t: "(Keep scrolling TikTok.) \"Mm. Just put it on the table.\"", fx: { hina: -10, wisdom: -5 }, lesson: 'presence', flag: 'hinaWalkedAhead', then: [
        { s: 'hina', e: 'sad', t: "...Okay. I go first." },
        { hide: 'hina' },
        { mochi: "She was up at six cutting hearts. You showed her the top of your head.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 1-2 Rae
    { bg: 'street', petals: true },
    { n: "The covered walkway to the MRT. Frangipani on the ground, everyone in uniforms that still have the fold lines." },
    { n: "Someone walks straight into you, eyes on her phone. Iced kopi everywhere. Mostly on her." },
    { s: 'rei', e: 'surprised', at: 'center', t: "Oh my gosh, sorry sorry! ...Wait. Have we met? Your face is so familiar." },
    { s: 'rei', e: 'happy', t: "Okay this sounds crazy, but I think we're soulmates. I can feel it. I'm Rae." },
    { n: "Rae Koh. Perfect hair, perfect smile. Nobody in your batch has ever seen her before." },
    { s: 'rei', e: 'smug', t: "Eh, you look smart. My uncle showed me this app, MoonRich. My money doubled in one week. We can grow it together~" },
    { mochi: "Hm. My whiskers are tingling.", e: 'neutral' },
    { choice: "Rae holds out her phone, MoonRich already open...", opts: [
      { t: "\"Soulmates?! Okay! I'll put in my savings!\"", fx: { wisdom: -5 }, lesson: 'romancescam', ach: 'moonrichInvestor', then: [
        { s: 'rei', e: 'happy', t: "Yay, I knew you were different! Just scan this QR..." },
        { n: "One week later, MoonRich won't open. Rae's Telegram says \"Deleted Account\"." },
        { badEnd: { title: "BAD END #1 — The Soulmate Portfolio",
          text: "Savings: $0. Soulmate: gone. \"Soulmate\" in minute one and an app in minute two? She was looking at your wallet, not at you." } },
      ] },
      { t: "\"Haha, we met like thirty seconds ago. Here, I've got tissue for the kopi.\"", fx: { wisdom: 15, self: 10 }, lesson: 'lovebomb', rose: true, then: [
        { s: 'rei', e: 'surprised', t: "...Huh. You're no fun." },
        { s: 'rei', e: 'smug', t: "Most boys just say yes, you know. See you around, {name}." },
        { hide: 'rei' },
        { think: "...I never told her my name." },
      ] },
      { t: "\"No money, sorry. But... here's my Telegram.\"", fx: { wisdom: 5, rei: 5 }, flag: 'reiHasLine', lesson: 'romancescam', then: [
        { s: 'rei', e: 'happy', t: "Aww, no money? Okay lah. I'll text you, soulmate~" },
        { hide: 'rei' },
        { mochi: "Wallet closed, good. Door open, hmm.", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // 1-3 Xin Yi
    { bg: 'library', petals: false },
    { n: "Lunch break. The library aircon is set to \"durian storage\". You are here for the aircon." },
    { n: "A girl on tiptoe at the top shelf. A book slips, bounces once, lands by your shoe." },
    { n: "\"The Starlight Postman\", volume 7. A fantasy series about a boy who delivers letters between stars." },
    { show: 'mio', e: 'shy', at: 'center' },
    { s: 'mio', e: 'shy', t: "...S-sorry. That's mine." },
    { n: "Lim Xin Yi. Same civics class. Hasn't said a word all week. Her bookmark is an old SBS bus ticket." },
    { mochi: "Read the room. Not just the cover.", e: 'neutral' },
    { choice: "You pick up the book...", opts: [
      { t: "\"Starlight Postman? Is it good?\" (Ask, listen, then let her go back to reading.)", fx: { mio: 15, wisdom: 10 }, flag: 'mioVol3', lesson: 'signals', then: [
        { s: 'mio', e: 'surprised', t: "You... want to know? Um. The letters take a hundred years to arrive. So people write to someone they'll never meet." },
        { s: 'mio', e: 'happy', t: "Volume 3 is the saddest. If you read it... we can talk about it. If you want." },
        { n: "She goes back to her book. You go back to the aircon. That's it. It's nice." },
      ] },
      { t: "(Grab her hand.) \"This is fate. We were meant to meet here.\"", fx: { mio: -20, self: -10 }, lesson: 'consent', then: [
        { s: 'mio', e: 'surprised', t: "!!!" },
        { hide: 'mio' },
        { n: "She drops the book and runs. Next morning, your civics tutor asks you to come to the staff room." },
        { badEnd: { title: "BAD END #2 — The Staff Room Would Like a Word",
          text: "In anime, grabbing her hand is romantic. In a real library, with a stranger, it's just scary. Ask first. Every time." } },
      ] },
      { t: "\"Starlight Postman? That one's for primary school kids, right?\"", fx: { mio: -15, wisdom: -5 }, lesson: 'mockery', then: [
        { s: 'mio', e: 'sad', t: "...It's not." },
        { hide: 'mio' },
        { mochi: "Ouch. That book was a piece of her. She'll remember.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 1-4 Kavya
    { bg: 'field', petals: false },
    { n: "After CCA trials, Kavya Pillai from track said, \"Wait for me at the field after school.\" You've been waiting 45 minutes. Your Milo is warm now." },
    { n: "She finally jogs up, ponytail swinging, spikes in one hand." },
    { s: 'kaede', e: 'smug', at: 'center', t: "Oh. You actually waited? 😏" },
    { s: 'kaede', e: 'cool', t: "Eh, something came up. Next time maybe. Or not. See how." },
    { mochi: "Hot, cold, hot. Classic.", e: 'neutral' },
    { choice: "Kavya looks at you, waiting...", opts: [
      { t: "\"Of course! I'd wait for you every day ♡\"", fx: { kaede: -5, self: -15 }, lesson: 'hotcold', then: [
        { s: 'kaede', e: 'smug', t: "Every day? Cute. Then wait tomorrow also." },
        { hide: 'kaede' },
        { mochi: "Say you'll take anything, and anything is what you'll get.", e: 'sad' },
      ] },
      { t: "\"No worries. Next time just text me if plans change, can? Want to do another day?\"", fx: { kaede: 15, self: 15 }, flag: 'kaedeReschedule', lesson: 'clearwords', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: "...Huh. Okay. Fair." },
        { s: 'kaede', e: 'blush', t: "Saturday. The café near the MRT, after training. I'll really come this time. Promise." },
      ] },
      { t: "(Post an IG story with a sad song: \"some people don't keep promises 💔\")", fx: { kaede: -15, wisdom: -10 }, lesson: 'games', then: [
        { s: 'kaede', e: 'angry', t: "Seriously? You posted about me? Wow." },
        { hide: 'kaede' },
        { mochi: "One game invites another. A text would've been faster.", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // partner talk: refusal
    { bg: 'classroom', petals: false },
    { n: "Thursday, canteen. The chicken rice queue is eight people long. A guy with a fade and a basketball drops into the seat beside you." },
    { s: 'kenta', e: 'happy', at: 'left', t: "Bro! Haziq. Same CT. We're friends now, settled." },
    { s: 'kenta', e: 'smug', t: "Hanis, lend me your chem tutorial to copy lah. Friends don't say no, right?" },
    { s: 'hina', e: 'neutral', at: 'right', t: "No. But I'll explain Question 3 to you at recess." },
    { s: 'kenta', e: 'surprised', t: "Wah. Cold sia." },
    { talk: 'refusal' },
    { s: 'kenta', e: 'happy', t: "Okay okay, Question 3 at recess. ...Wait, what's a mole actually?" },
    { hide: '*' },

    // 1-5 Elise
    { bg: 'night', petals: false },
    { n: "11:40 PM. You should be asleep. Your phone buzzes." },
    { phone: "Elise ✨" },
    { txt: 'yuna', t: "heyyy {name} 🥺 can u do my GP essay outline?? ur SO smart" },
    { txt: 'yuna', t: "also there's this concert next month!! $120 a ticket. u'd get me one right? 💕" },
    { txt: 'yuna', t: "btw at KTV w my 3 besties rn lol. all guys hahaha" },
    { phoneOff: true },
    { n: "Elise de Souza. Dance CCA, a few thousand followers, everybody's \"bestie\". She calls you most nights. You still don't know what you are to her." },
    { mochi: "Last one for the week. Tricky.", e: 'neutral' },
    { choice: "You stare at the screen...", opts: [
      { t: "\"Of course! I'll do the outline AND get the ticket!\"", fx: { yuna: 5, self: -20, cash: -120 }, lesson: 'fishpond', then: [
        { phone: "Elise ✨" }, { txt: 'yuna', t: "omg ur the BEST 😘😘 (sent 2:41 AM)" }, { phoneOff: true },
        { mochi: "So you're... her essay service? Her ATM? Blub blub, little fish.", e: 'sad' },
      ] },
      { t: "\"I can study with you tmr, but you write it. No ticket. Also, honest question: what are we?\"", fx: { yuna: 10, self: 20, wisdom: 10 }, flag: 'yunaClarity', lesson: 'clarity', rose: true, then: [
        { phone: "Elise ✨" }, { txt: 'yuna', t: "...oh" }, { txt: 'yuna', t: "honestly? nobody's asked me that before" }, { txt: 'yuna', t: "study tmr ok. talk then 🙂" }, { phoneOff: true },
        { mochi: "Scary question. Good question.", e: 'happy' },
      ] },
      { t: "(Fire off 14 jealous texts.) \"Who are these besties?? Why are you with them??\"", fx: { yuna: -20, self: -10 }, lesson: 'neediness', then: [
        { phone: "Elise ✨" }, { txt: 'me', t: "who are they" }, { txt: 'me', t: "why are u w them" }, { txt: 'me', t: "reply" }, { txt: 'me', t: "???" }, { txt: 'me', t: "..." },
        { txt: 'sys', t: "⚠ Message not delivered." }, { phoneOff: true },
        { badEnd: { title: "BAD END #3 — Message Not Delivered",
          text: "Fourteen messages, zero replies, one block. Jealousy is a feeling, not a plan. One clear question would have told you more." } },
      ] },
    ] },

    // wrap-up
    { bg: 'bedroom', petals: false },
    { n: "Later. The fan is on 3. You can't sleep." },
    { mochi: "Phew. Week one: survived!", e: 'happy' },
    { if: (s) => s.stats.wisdom >= 30, then: [
      { mochi: "Not bad, rookie. You looked at people, not just their sparkle.", e: 'happy' },
    ], else: [
      { mochi: "Hmm. Lots to learn. Good thing I'm a patient cat.", e: 'neutral' },
    ] },
    { if: (s) => s.flags.reiHasLine, then: [
      { phone: "Rae 🌙" }, { txt: 'rei', t: "nightsss soulmate~ 🌙 dream of me ok" }, { phoneOff: true },
      { mochi: "...Whiskers again. Hmm.", e: 'neutral' },
    ] },
    { mochi: "Also, you have a life. Grades, a hobby, sleep, money. Those bars up top? Keep them alive.", e: 'smug' },
    { mochi: "Next week: group outing. Wear something that isn't your PE shirt.", e: 'happy' },
    { chapterEnd: true },
  ],
};
