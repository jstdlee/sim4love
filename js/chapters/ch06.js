/* Chapter 6 — "Carnival Week". Supporting vs saving, the rescuer trap, the fish-pond check, masks, your own stage. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch6 = {
  id: 'ch6', part: "Part II — Behind the Filter", title: "Chapter 6", subtitle: "Carnival Week",
  next: "Chapter 7 — Behind the Screen", status: 'done',
  script: [
    { bg: 'carnival' },
    WEAR('carnival'),
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
    WEAR('home'),
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
    WEAR('carnival'),
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
    WEAR('carnival'),
    { n: "The dunk tank. Hanis promised the council she'd sit in it for one full hour. The water is very cold." },
    { talk: 'promises' },

    // 6-4 polished mask
    { bg: 'carnival' },
    WEAR('carnival'),
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
      WEAR('carnival'),
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
      WEAR('carnival'),
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

    // 6-debate exhibition: Ines vs Preet
    { bg: 'carnival' },
    WEAR('carnival'),
    { n: "Main stage, 4 PM: an exhibition debate. \"This house believes exams measure memory, not intelligence.\" The visiting team is from the French international school." },
    { show: 'ines', e: 'smug', at: 'right' },
    { s: 'ines', e: 'smug', t: "En fait, it is simple. You Singaporeans memorise. We argue. Voilà, that is the whole motion." },
    { flag: 'inesMet' },
    { flaw: { ines: { contrarian: 'seen' } }, why: "\"You Singaporeans memorise. We argue.\"" },
    { judge: { who: 'ines', id: 'ines.arrogant', verdict: 'unfair' } },
    { show: 'preet', e: 'neutral', at: 'left' },
    { s: 'preet', e: 'neutral', t: "Thank you. My opponent has just memorised a stereotype and argued it. I believe that proves our side." },
    { n: "The crowd laughs. Inès laughs too, a beat late, and writes on an index card very hard." },
    { s: 'ines', e: 'neutral', t: "Bof. Your argument is a feeling wearing a tie. ...A good feeling. Okay. Point to you." },
    { reveal: { ines: 'intellect' }, why: "She rebuilt her whole case in ninety seconds after Preet's rebuttal." },
    { hide: 'preet' },
    { choice: "Afterwards, Inès is packing her index cards alone by the stage.", opts: [
      { t: "\"Good debate. But 'you memorise' isn't fair. We argue plenty. You just saw.\"", fx: { 'trust.ines': 4, 'aff.ines': 4, wisdom: 3 }, then: [
        { s: 'ines', e: 'neutral', t: "...Hm. You say it without a joke about the French. That is rare. Usually people tell me about baguettes." },
        { s: 'ines', e: 'happy', t: "Inès. Tell your Preet she was good. Not better. Good." },
        { flag: 'inesCalledOut' },
        { contact: 'ines' },
      ] },
      { t: "\"Typical French. Think they're better than everyone.\"", fx: { 'aff.ines': -4 }, then: [
        { s: 'ines', e: 'neutral', t: "Ah, voilà. So we both generalise. Very educational." },
        { mochi: "She made a lazy generalisation. You answered with another one. Nobody won that round.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 6-harmony booth: Ava and Hanis
    { if: (s) => !!s.flags.avaMet, then: [
      { bg: 'carnival' },
      WEAR('carnival'),
      { n: "The Racial Harmony booth: kuih, henna, and a rack of traditional clothes for the photo corner. Ava is holding up a baju kurung." },
      { show: 'ava', e: 'happy', at: 'left' },
      { s: 'ava', e: 'happy', t: "Okay, this is SO pretty. Can I just put it on for a pic? For fun?" },
      { show: 'hina', e: 'neutral', at: 'right' },
      { choice: "Hanis is running the booth.", opts: [
        { t: "\"Hanis, Ava wants to try one. Maybe tell her about it first?\"", fx: { ava: 6, hina: 4 }, lesson: 'costume', flag: 'avaHarmony', then: [
          { s: 'hina', e: 'happy', t: "Come, I show you properly. My nenek sewed this one. We wear it for Hari Raya, weddings, some Fridays." },
          { s: 'ava', e: 'surprised', t: "Your grandma made this? Wait, then what does it mean when someone like me wears it? I don't want it to be a costume." },
          { s: 'hina', e: 'happy', t: "Wear it like you mean it, not like a costume, and I'm happy. You asked. That's already the difference." },
          { n: "Ava wears it exactly the way Hanis shows her, and hears the whole story of the pattern before she takes a single photo." },
        ] },
        { t: "\"Just wear lah, one photo only.\"", fx: { ava: 2, hina: -3 }, lesson: 'costume', then: [
          { s: 'hina', e: 'neutral', t: "Er. Ask first lah. These are people's family clothes, not props." },
          { s: 'ava', e: 'sad', t: "Oh. Right. Sorry. Can you tell me about them instead?" },
        ] },
      ] },
      { hide: 'hina' },
      { n: "Her phone lock screen is a blurry photo of baby coral growing on a rope frame." },
      { choice: "Ava catches you looking.", opts: [
        { t: "Ask about the coral.", fx: { ava: 4 }, then: [
          { s: 'ava', e: 'happy', t: "Coral nursery off Sisters' Islands! You grow little fragments on ropes, then replant them on the reef. I want to do that for a living. Like, actually." },
          { reveal: { ava: 'intellect' }, why: "She explained reef restoration in three sentences and one hand diagram." },
        ] },
        { t: "\"Nice wallpaper.\"", fx: {}, then: [
          { s: 'ava', e: 'neutral', t: "Thanks! It's coral. Long story." },
        ] },
      ] },
      { hide: '*' },
    ] },

    // 6-mateo over-promise
    { if: (s) => !!s.flags.mateoMet, then: [
      { bg: 'carnival' },
      WEAR('carnival'),
      { n: "Mateo told the class chat he'd bring \"the WHOLE futsal team, 15 guys, trust 💪\" to buy kueh and play the booth games. Two show up. One of them is Mateo." },
      { show: 'mateo', e: 'sad', at: 'center' },
      { s: 'mateo', e: 'sad', t: "Bro, they all said yes! In the chat! ...Yes in the chat is not yes in real life, sí?" },
      { flaw: { mateo: { 'over-promises': 'seen' } }, why: "He promised fifteen people. Two came." },
      { s: 'mateo', e: 'happy', t: "Okay. New rule. I promise two and bring three. ¡Qué bueno!" },
      { hide: '*' },
    ] },

    // 6-5 your own stage
    { bg: 'carnival' },
    WEAR('carnival'),
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
