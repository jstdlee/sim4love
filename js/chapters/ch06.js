/* Chapter 6 — "Carnival Week". Supporting vs saving, the rescuer trap, the fish-pond check, masks, your own stage. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch6 = {
  id: 'ch6', part: "Part II — Behind the Filter", title: "Chapter 6", subtitle: "Carnival Week",
  next: "Chapter 7 — Behind the Screen", status: 'done',
  script: [
    { bg: 'carnival' },
    { n: "JC Carnival Week. Fairy lights, a dunk tank, and a CCA stall selling \"artisanal\" Milo for $6." },

    // 6-1 Hanis burnout
    { show: 'hina', e: 'sad', at: 'center' },
    { n: "Hanis is running the student council booth. Alone. Her eyes are red." },
    { s: 'hina', e: 'sad', t: "Three people pangseh. The banner fell down. Chem test tomorrow. I'm fine. Totally fine." },
    { choice: "Hanis is \"totally fine\"...", opts: [
      { t: "\"You want help, or you want to rant first? Either also can.\"", fx: { hina: 12, wisdom: 8 }, lesson: 'supportnotsave', rose: true, then: [
        { s: 'hina', e: 'surprised', t: "...Rant first. Then help. Then probably rant again." },
        { n: "She rants. You hold the banner. Then she tells you exactly where the tape goes. Still her booth." },
      ] },
      { t: "\"Relax, I take over. You go home.\" Start moving everything around.", fx: { hina: -4, self: 2 }, lesson: 'supportnotsave', then: [
        { s: 'hina', e: 'angry', t: "I never asked you to TAKE OVER. It's my booth. I just... needed one person who's not useless." },
      ] },
      { t: "\"Aiya, overreacting. It's just a carnival.\"", fx: { hina: -10 }, lesson: 'dismissing', then: [
        { s: 'hina', e: 'sad', t: "Okay. Thanks." },
      ] },
    ] },
    { hide: '*' },

    // 6-2 Rae again
    { bg: 'night' },
    { if: (s) => s.flags.reiHasLine, then: [{ phone: "Rae 🌙" }], else: [{ phone: "+65 8••• ••••" }] },
    { txt: 'rei', t: "sorry about before. i'm not ok. my \"manager\" says i owe them $3000. idk what to do" },
    { txt: 'rei', t: "if you loved me you'd save me" },
    { choice: "Rae says she's trapped...", opts: [
      { t: "\"I can't save you, and I'm not sending money. If you're really in trouble, here's the Anti-Scam Helpline and a counselling line. Call them.\"", fx: { wisdom: 12, self: 8 }, flag: 'reiRedemption', lesson: 'rescuer', rose: true, then: [
        { txt: 'rei', t: "..." }, { txt: 'rei', t: "nobody ever just gave me the number before." }, { phoneOff: true },
        { mochi: "Not a hero. A door. Better.", e: 'happy' },
      ] },
      { t: "Block. Not your circus, not your monkeys.", fx: { wisdom: 6, self: 4 }, lesson: 'rescuer', then: [
        { phoneOff: true },
        { n: "Blocked. The screen goes quiet." },
        { mochi: "Safe. Next time, a hotline number costs you zero dollars.", e: 'neutral' },
      ] },
      { t: "Promise to clear her debt yourself. Hero time.", fx: { cash: -150, self: -10, proj: 10 }, lesson: 'rescuer', then: [
        { txt: 'rei', t: "omg thank u. the rest by friday? 🥺" }, { phoneOff: true },
        { n: "Friday. Then the next Friday. Then a new number: \"Hi, I'm Rae's cousin...\"" },
        { badEnd: { title: "BAD END #8 — Hero Mode: Off",
          text: "\"If you loved me you'd save me\" is a lever, not a love letter. You can't rescue someone by paying into the scam they're running on you. Point to real help, then step back." } },
      ] },
    ] },

    // 6-3 Marcus fish-pond check
    { bg: 'carnival' },
    { show: 'takumi', e: 'smug', at: 'center' },
    { s: 'takumi', e: 'smug', t: "Bro. Big brain: text all four \"you're the only one I talk to like this\". See who bites. Fish pond." },
    { choice: "Marcus is grinning...", opts: [
      { t: "\"Nah. If I'm talking to a few people, I'll just say it's early and I'm still getting to know people.\"", fx: { wisdom: 10, self: 8, hina: 3, mio: 3, kaede: 3, yuna: 3 }, lesson: 'honestjuggle', rose: true, then: [
        { s: 'takumi', e: 'surprised', t: "Huh. That's... boring. And weirdly attractive? Who taught you this." },
        { mochi: "Me.", e: 'smug' },
      ] },
      { t: "Do it. Same message to all four.", fx: { wisdom: -10, hina: -6, mio: -6, kaede: -6, yuna: -6 }, flag: 'liedFishpond', lesson: 'fishpond', then: [
        { n: "Kavya and Elise share a CCA. By lunch they're comparing phones." },
        { s: 'kaede', e: 'angry', at: 'left', t: "\"The only one\"?" },
        { s: 'yuna', e: 'angry', at: 'right', t: "Same text. Same emoji. Wow." },
        { badEnd: { title: "BAD END #9 — The Fish Pond Keeper",
          text: "You lied to four people at once to keep them all on the hook. People talk to each other. Getting to know a few people is normal. Telling each one she's \"the only one\" isn't." } },
      ] },
    ] },
    { hide: '*' },

    // talk: promises
    { bg: 'carnival' },
    { n: "The dunk tank. Hanis promised the council she'd sit in it for one full hour. The water is very cold." },
    { talk: 'promises' },

    // 6-4 polished mask
    { bg: 'carnival' },
    { n: "Talent night. Marcus has a \"personal brand\" now: a borrowed watch, a memorised monologue, and a fake British accent." },
    { s: 'takumi', e: 'cool', at: 'left', t: "Be mysterious, bro. Never show the real you. The real you is mid." },
    { choice: "After-party. Your turn to talk to people...", opts: [
      { t: "Just be you. Bad jokes, real opinions, actual laugh.", fx: { self: 10, wisdom: 6, hina: 3, mio: 3, kaede: 3, yuna: 3 }, lesson: 'polishedmask', rose: true, then: [
        { n: "Xin Yi laughs at your bumboat pun. Kavya rolls her eyes, then stays ten minutes to argue about it." },
      ] },
      { t: "Borrow Marcus's accent.", fx: { self: -8, proj: 4 }, lesson: 'polishedmask', then: [
        { s: 'hina', e: 'surprised', at: 'right', t: "Why you talking like a BBC documentary? You sick ah?" },
      ] },
    ] },
    { hide: '*' },

    // Chloe's carnival stall, Preet's booth
    { if: (s) => !!s.flags.chloeMet, then: [
      { bg: 'carnival' },
      { show: 'chloe', e: 'happy', at: 'center' },
      { n: "The enterprise club stall: Chloe's kueh, priced to the cent. The sign says \"Student price = honest price\"." },
      { s: 'chloe', e: 'happy', t: "I'm forty boxes up on last year. Help me for an hour? Pay is one kueh." },
      { choice: "Chloe holds out an apron.", opts: [
        { t: "Put on the apron.", fx: { chloe: 12 }, then: [
          { s: 'chloe', e: 'happy', t: "You're terrible at giving change and great at smiling. Net positive." },
          { contact: 'chloe' },
        ] },
        { t: "\"One kueh? Exploitation.\"", fx: { chloe: 2 }, then: [
          { s: 'chloe', e: 'smug', t: "Market rate, bro." },
        ] },
      ] },
      { hide: '*' },
    ] },
    { if: (s) => !!s.flags.preetMet, then: [
      { bg: 'carnival' },
      { show: 'preet', e: 'neutral', at: 'center' },
      { n: "The debate club runs a \"Lie or Truth?\" booth. You guess wrong about a scam ad, and Preet explains why for four minutes." },
      { s: 'preet', e: 'shy', t: "...and that's why the — sorry. You paid fifty cents. You didn't pay for a lecture." },
      { choice: "Preet looks embarrassed.", opts: [
        { t: "\"I'd pay a dollar for the lecture. Go on.\"", fx: { preet: 8 }, then: [
          { s: 'preet', e: 'happy', t: "Careful. I'll invoice you." },
          { contact: 'preet' },
        ] },
        { t: "\"Yeah, bit much.\"", fx: { preet: -1 }, then: [
          { s: 'preet', e: 'neutral', t: "Noted. Short version: don't trust ads." },
        ] },
      ] },
      { hide: '*' },
    ] },

    // 6-5 your own stage
    { bg: 'carnival' },
    { n: "Open mic, last slot. Nobody signed up. The MC scans the crowd, desperate." },
    { choice: "There's an empty slot...", opts: [
      { t: "Sign up. Three minutes of {passion}. Shaky, real, yours.", fx: { passion: 12, self: 10 }, lesson: 'ownstage', ach: 'ownStage', then: [
        { n: "You mess up twice. Someone claps anyway. Then a few more. Haziq stands on a chair." },
        { s: 'kenta', e: 'happy', at: 'center', t: "THAT'S MY BRO!! Okay okay sit down, now I'm paiseh." },
      ] },
      { t: "Stay in the crowd, watching the person you like, hoping she notices you.", fx: { proj: 6, passion: -2 }, lesson: 'ownstage', then: [
        { mochi: "Audience member again. You know you're allowed on stage too, right?", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },
    SIM.evening('ch6'),
    { chapterEnd: true },
  ],
};
