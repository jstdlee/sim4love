/* Chapter 2 — "The Group Date". Sentosa, the arcade, KTV; choose your passion. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch2 = {
  id: 'ch2', part: "Part I — Rose-Tinted", title: "Chapter 2", subtitle: "The Group Date",
  next: "Chapter 3 — Seen at 2:14 AM", status: 'done',
  script: [
    { bg: 'bedroom' },
    WEAR('home'),
    { variant: 'mochi.morning' },
    { s: 'kenta', e: 'happy', at: 'center', t: "Bro. BRO. I organised a group outing. Saturday, Sentosa. Five girls said yes." },
    { me: "Five?" },
    { s: 'kenta', e: 'smug', t: "Two said yes. Three said \"see how\". Which is basically yes." },
    { mochi: "Tip: be curious, not impressive. Nobody falls for a résumé.", e: 'smug' },
    { hide: '*' },

    // 2-1 cable car queue
    { bg: 'sentosa' },
    WEAR('out'),
    { n: "Saturday, Mount Faber. The cable car queue is forty minutes and has no shade. You end up next to Xin Yi." },
    { show: 'mio', e: 'shy', at: 'center' },
    { choice: "Forty minutes. What do you talk about?", opts: [
      { t: "\"Eh, did you finish the Starlight Postman one? With the hundred-year letter?\"", if: (s) => s.flags.mioVol3, fx: { mio: 15, wisdom: 8 }, lesson: 'curiosity', then: [
        { s: 'mio', e: 'happy', t: "You remembered! Volume 3 is where the postman— no wait, I won't spoil. Did you start?" },
        { me: "Chapter two. Why does he keep the letters he can't deliver?" },
        { s: 'mio', e: 'blush', t: "That's... exactly the right question. Okay. So." },
        { n: "The forty minutes feel like four." },
      ] },
      { t: "\"What else do you read? Not just fantasy, right?\" (Then actually follow up.)", fx: { mio: 12, wisdom: 6 }, lesson: 'curiosity', then: [
        { s: 'mio', e: 'surprised', t: "Um. Old Singapore ghost stories? My ah ma used to tell them. I'm trying to write them down." },
        { me: "Wait, you write? Okay, what's the scariest one?" },
        { s: 'mio', e: 'happy', t: "...The pontianak at the banana tree near her kampung. Okay. This one takes a while." },
      ] },
      { t: "Explain your mobile game rank. In detail. For forty minutes.", fx: { mio: -8, wisdom: -5 }, lesson: 'curiosity', ach: 'monologue', then: [
        { n: "Minute twenty: Xin Yi's eyes have gone glassy. Minute thirty-five: the uncle behind you is asleep standing up." },
        { mochi: "Conversation is catch, rookie. You just threw forty balls into the sea.", e: 'angry' },
      ] },
      { t: "(Stay on your phone.)", fx: { mio: -3 }, lesson: 'presence', then: [
        { n: "She reads. You scroll. The queue moves. That's all." },
      ] },
    ] },
    { hide: '*' },

    // 2-2 negging
    { bg: 'beach' },
    WEAR('out'),
    { n: "In the cable car, an ad autoplays on your phone. You forgot it was on loudspeaker." },
    { phone: "Alpha Kai 💪" },
    { txt: 'kai', t: "ALPHA TIP #7: NEG her to lower her value. Try: \"You'd be cute if you smiled more.\" Works every time. Link in bio. 🔥" },
    { phoneOff: true },
    { show: 'kaede', e: 'cool', at: 'center' },
    { n: "Kavya pretends she didn't hear. She's looking out at the sea, calves still taped from this morning's time trial." },
    { choice: "Say something to Kavya...", opts: [
      { t: "\"Your 100m start this morning was crazy. How do you get out of the blocks that fast?\"", fx: { kaede: 12, wisdom: 6 }, lesson: 'negging', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: "You saw? ...It's the first three steps. Everyone thinks it's legs. It's arms." },
        { s: 'kaede', e: 'happy', t: "I'll show you one day. You'll be slow, but I'll show you." },
      ] },
      { t: "\"You'd be cute if you smiled more.\"", fx: { kaede: -12, self: -5 }, lesson: 'negging', then: [
        { s: 'kaede', e: 'smug', t: "Wow. You got that from the guy who rents a Lamborghini for his videos, right?" },
        { n: "She laughs. At you. Across the cabin, Haziq facepalms so hard the cable car sways." },
      ] },
      { t: "(Deep voice.) \"I'm the prize here. You should be impressing me.\"", fx: { kaede: -20, self: -10 }, lesson: 'negging', then: [
        { n: "At the next station, everyone else in the cabin gets off. You ride to Sentosa alone. With your deep voice." },
        { badEnd: { title: "BAD END #4 — Negged Yourself",
          text: "You tried to make her feel small so you'd feel big. Now you're very alone in a very big cable car. Confidence doesn't need anyone to shrink." } },
      ] },
    ] },
    { hide: '*' },

    // 2-3 dessert
    { bg: 'mall' },
    WEAR('out'),
    { n: "Beach Station, a dessert kiosk. Mango bingsu, $18 for the \"premium\". Your pocket money for the whole month is about $100." },
    { choice: "You kind of want to look generous...", opts: [
      { t: "\"Two big ones, we share? I'll get this, you all belanja drinks later.\"", fx: { hina: 4, mio: 4, kaede: 4, yuna: 4, wisdom: 5, cash: -18 }, lesson: 'buyinglove', then: [
        { s: 'hina', e: 'happy', at: 'center', t: "Share better lah. Then everybody gets mango." },
      ] },
      { t: "Buy everyone a premium one. All six. $108.", fx: { self: -8, cash: -108 }, lesson: 'buyinglove', then: [
        { s: 'yuna', e: 'happy', at: 'center', t: "Omg thank you!! Wait wait, don't eat yet— photo first." },
        { n: "She posts it. She doesn't eat it. It melts." },
        { mochi: "They liked the bingsu. Different thing. Also, you're broke till April.", e: 'sad' },
      ] },
      { t: "\"Haziq, you organised this. You pay.\"", fx: { kenta: -6 }, then: [
        { s: 'kenta', e: 'sad', at: 'center', t: "...Bro. I have eleven dollars. And my ez-link is in the negative." },
      ] },
    ] },
    { hide: '*' },

    // 2-4 horror ride
    { bg: 'mall' },
    WEAR('out'),
    { n: "Too hot outside, so everyone ends up in the arcade. There's a VR horror ride for two. Elise grabs your arm and points her phone at you both." },
    { s: 'yuna', e: 'happy', at: 'left', t: "Say something scared for my story! Pretend you're protecting me~" },
    { show: 'hina', e: 'neutral', at: 'right' },
    { n: "Hanis is by the claw machine, a token in her hand. Watching. Not saying anything." },
    { choice: "What do you do?", opts: [
      { t: "\"Can. Hanis, come, we do three people. Triple the screaming.\"", fx: { hina: 8, yuna: 5, wisdom: 6 }, lesson: 'triangulation', rose: true, then: [
        { s: 'hina', e: 'happy', t: "Fine. But if I scream, you didn't hear anything." },
        { s: 'yuna', e: 'happy', t: "Group shot! Okay, this is actually cuter." },
      ] },
      { t: "Play it up. Glance at Hanis to make sure she's watching.", fx: { hina: -10, yuna: 3, wisdom: -6 }, lesson: 'triangulation', then: [
        { s: 'hina', e: 'sad', t: "...I'm going to buy bubble tea." },
        { mochi: "Two girls, zero of them asked to be your props.", e: 'angry' },
      ] },
      { t: "The ride starts. You scream and run out of the booth.", fx: { yuna: 2, self: -2 }, ach: 'ghosted', then: [
        { n: "Elise's story hits 4,000 views. Caption: \"my brave protector 💀\". You're famous now. Kind of." },
      ] },
    ] },
    { hide: '*' },

    // 2-5 Haziq falls
    { bg: 'sentosa' },
    WEAR('out'),
    { n: "Siloso Beach. Haziq tries a \"cool\" move on the rope swing and goes face-first into the sea. Everyone laughs." },
    { choice: "Haziq crawls out, dripping, ears red...", opts: [
      { t: "Pull him up, throw him your towel, laugh with him: \"Ten out of ten for commitment, bro.\"", fx: { kenta: 12, hina: 4, wisdom: 5 }, lesson: 'punchingdown', then: [
        { s: 'kenta', e: 'happy', at: 'center', t: "Bro... you're a real one. I had a whole plan. The plan was bad." },
      ] },
      { t: "\"This is why you're single, bro.\" Wait for the laugh.", fx: { kenta: -12, hina: -5, wisdom: -5 }, lesson: 'punchingdown', then: [
        { n: "A few people laugh. Hanis doesn't. Haziq laughs too, one beat late, then goes quiet for the rest of the day." },
      ] },
    ] },
    { hide: '*' },

    // 2-ava hugs and sambal
    { if: (s) => !!s.flags.avaMet, then: [
      { bg: 'beach' },
      WEAR('out'),
      { n: "Ava tagged along. Hanis invited her in the class chat and she said yes in four seconds. She's soaked, sandy and holding three people's slippers." },
      { show: 'ava', e: 'happy', at: 'center' },
      { s: 'ava', e: 'happy', t: "Can I hug you? I'm a hugger. You don't have to be. High fives are also elite." },
      { choice: "She waits, arms half out, not moving until you answer.", opts: [
        { t: "\"Sure, come.\"", fx: { ava: 6, 'trust.ava': 2 }, lesson: 'askfirst', then: [
          { n: "A quick, sandy hug. She steps back right after." },
          { s: 'ava', e: 'happy', t: "Thank you! Okay. Friendship officially sandy." },
        ] },
        { t: "\"Not really a hugger. High five?\"", fx: { ava: 6, 'trust.ava': 2 }, lesson: 'askfirst', then: [
          { s: 'ava', e: 'happy', t: "Elite choice. Up top!" },
          { n: "The high five is so loud that Haziq looks over." },
        ] },
        { t: "\"Maybe later. Not now.\"", fx: { ava: 6, 'trust.ava': 2 }, lesson: 'askfirst', then: [
          { s: 'ava', e: 'neutral', t: "Totally fair. Offer stands. No expiry date." },
        ] },
      ] },
      { mochi: "Three answers, three right ones. She asked, and she meant the question.", e: 'happy' },
      { n: "Lunch on the sand. Haziq opens his mum's tupperware: sambal goreng, tempeh and long beans." },
      { s: 'ava', e: 'surprised', t: "Oh, that's kinda weird. Beans with... is that peanut? And chilli?" },
      { show: 'kenta', e: 'sad', at: 'right' },
      { s: 'kenta', e: 'sad', t: "...It's my mum's." },
      { flaw: { ava: { 'blunt-without-context': 'seen' } }, why: "She called Haziq's mum's sambal goreng \"kinda weird\"." },
      { choice: "Haziq goes quiet. Ava hasn't noticed yet.", opts: [
        { t: "\"It's sambal goreng. His mum makes it every Raya. Try one bite before you decide?\"", fx: { ava: 4, kenta: 4, wisdom: 3 }, lesson: 'cultures', then: [
          { s: 'ava', e: 'blush', t: "Oh no. I said that out loud. Haziq, I'm sorry. Can I try some? Please?" },
          { n: "She tries it. Her eyes go wide. She asks for the recipe, then asks whether his mum would mind her asking for the recipe." },
          { s: 'kenta', e: 'happy', t: "Okay, okay. Forgiven. Ten out of ten for commitment." },
        ] },
        { t: "Laugh along. \"Haha, ya, bit weird.\"", fx: { kenta: -6, ava: -2 }, then: [
          { n: "Haziq closes the box. He eats it later, alone, on the bus." },
          { mochi: "'Weird' about someone's mum's cooking is never small. She didn't have the context. You did.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ] },

    // partner talk: friendship
    { bg: 'beach' },
    WEAR('out'),
    { n: "Sunset. Everyone's sandy and tired, sharing one packet of keropok. Elise is filming the sky. Somebody asks how many close friends you each have." },
    { talk: 'friendship' },

    // 2-6 KTV + Rae
    { bg: 'karaoke' },
    WEAR('out'),
    { n: "Nobody wants to go home yet, so: KTV at VivoCity. Haziq is murdering a Jay Chou song. Your phone buzzes." },
    { if: (s) => s.flags.reiHasLine, then: [{ phone: "Rae 🌙" }, { txt: 'rei', t: "ur friends are so boring, they don't get u like i do 🥺" }],
      else: [{ phone: '+65 8••• ••••' }, { txt: 'rei', t: "hiii it's Rae from the walkway 🌙 ur friends are so boring, they don't get u like i do 🥺" }] },
    { txt: 'rei', t: "skip school monday and come see me? just u and me ✨" },
    { phoneOff: true },
    { choice: "Rae wants you away from your friends...", opts: [
      { t: "\"Having fun with my friends! Bye 😅\" Phone in pocket. Grab the mic.", fx: { wisdom: 10, self: 10, kenta: 4 }, lesson: 'isolation', rose: true, then: [
        { n: "You and Haziq duet \"Shape of You\". It's terrible. It's perfect." },
      ] },
      { t: "Leave KTV early to go meet her.", fx: { kenta: -6, hina: -4, self: -6 }, lesson: 'isolation', then: [
        { n: "You wait at HarbourFront MRT for an hour. She never comes. Then: \"next time 😘\". Your friends finish the night without you." },
        { mochi: "First she wanted you alone. Remember that part.", e: 'sad' },
      ] },
      { t: "Skip school on Monday. She asks for your bank PIN \"for our future\". You give it.", fx: { wisdom: -10 }, lesson: 'isolation', then: [
        { n: "Tuesday, 6 AM. Your bank app: $0.00. Three transfers to accounts you've never heard of. Rae's number is not in service." },
        { badEnd: { title: "BAD END #5 — Just You and Me",
          text: "First: \"your friends don't get you.\" Then: \"just you and me.\" Then: your PIN. Almost every scam starts by getting you alone. Your friends are your alarm system." } },
      ] },
    ] },

    // 2-7 choose your passion
    { bg: 'night' },
    WEAR('home'),
    { n: "Walking home from the MRT, legs aching, a bit sunburnt. Mochi opens a new panel on your phone: four bars called Your Life." },
    { mochi: "Pick something that's yours. Not to impress anyone. Something you'd do even if nobody ever saw.", e: 'neutral' },
    { choice: "Your passion:", opts: [
      { t: "Guitar. The secondhand one under your bed.", fx: { passion: 10, self: 3 }, flag: { passion: 'guitar' }, lesson: 'ownpassion', then: [{ mochi: "Guitar. One hour a week, minimum. I'll be listening. Please learn more than three chords.", e: 'happy' }] },
      { t: "Drawing. The sketchbook full of void decks.", fx: { passion: 10, self: 3 }, flag: { passion: 'drawing' }, lesson: 'ownpassion', then: [{ mochi: "Drawing. One hour a week. Start with hands. Everyone hates hands.", e: 'happy' }] },
      { t: "Coding a small game. You've got half a platformer.", fx: { passion: 10, self: 3 }, flag: { passion: 'coding' }, lesson: 'ownpassion', then: [{ mochi: "A game! Put a cat in it. Not a request.", e: 'happy' }] },
      { t: "Basketball. The court at Block 412.", fx: { passion: 10, self: 3, health: 3 }, flag: { passion: 'basketball' }, lesson: 'ownpassion', then: [{ mochi: "Basketball. Haziq will cry happy tears. Practise free throws, not dunks.", e: 'happy' }] },
      { t: "All four. Why choose?", fx: { passion: 5 }, flag: { passion: 'all' }, then: [{ mochi: "All four at half speed. Ambitious. We'll see.", e: 'smug' }] },
      { t: "\"My passion is... her.\"", fx: { self: -8, proj: 8, passion: 2 }, flag: { passion: 'all' }, then: [
        { mochi: "That's a person, not a hobby. Fine, I'm signing you up for all four. Pick one later.", e: 'angry' }] },
    ] },
    { s: 'hina', e: 'shy', at: 'center', t: "Eh. You were... different today. Nicer." },
    { n: "She says it at the lift lobby, not looking at you, and goes in before you can answer." },
    { mochi: "\"Nicer.\" From Hanis, that's basically a medal. Now sleep. Your Health bar is judging you.", e: 'smug' },
    { chapterEnd: true },
  ],
};
