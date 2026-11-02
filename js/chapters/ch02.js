/* Chapter 2 — "The Group Date". Sentosa, the arcade, KTV; choose your passion. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch2 = {
  id: 'ch2', part: 'Part I — Rose-Tinted', title: 'Chapter 2', subtitle: 'The Group Date',
  next: 'Chapter 3 — Seen at 2:14 AM', status: 'done',
  script: [
    { bg: 'bedroom' },
    { variant: 'mochi.morning' },
    { s: 'kenta', e: 'happy', at: 'center', t: 'Bro. BRO. I organised a group date. Saturday, Sentosa. Five girls said yes.' },
    { me: 'Five?' },
    { s: 'kenta', e: 'smug', t: 'Two said yes. Three said "maybe, see how". Basically five.' },
    { mochi: 'Group dates are job interviews where everyone pretends not to be interviewing. Be curious, not impressive.', e: 'smug' },
    { hide: '*' },

    // 2-1 cable car queue
    { bg: 'sentosa' },
    { n: 'Saturday. The cable car queue at Mount Faber is forty minutes long. You end up next to Xin Yi.' },
    { show: 'mio', e: 'shy', at: 'center' },
    { choice: 'Forty minutes of queue. What do you talk about?', opts: [
      { t: 'Ask about The Starlight Postman: "Did you finish the one with the letter that took a hundred years?"', if: (s) => s.flags.mioVol3, fx: { mio: 15, wisdom: 8 }, lesson: 'curiosity', then: [
        { s: 'mio', e: 'happy', t: 'You remembered! Volume 3 is the one where the postman... wait, I won\'t spoil it. Have you started?' },
        { me: 'Chapter two. Why does he keep the undeliverable letters?' },
        { s: 'mio', e: 'blush', t: 'That\'s... exactly the right question. Okay. So.' },
        { n: 'The forty minutes go by in about four.' },
      ] },
      { t: '"So what do you like reading, besides fantasy?" Then actually follow up on her answer.', fx: { mio: 12, wisdom: 6 }, lesson: 'curiosity', then: [
        { s: 'mio', e: 'surprised', t: 'Um. Old Singapore ghost stories? My grandma told them. I\'m trying to write some down.' },
        { me: 'Wait, you write? What\'s the scariest one?' },
        { s: 'mio', e: 'happy', t: '...The pontianak at the banana tree near her kampung. Okay, sit down. This takes a while.' },
      ] },
      { t: 'Explain your mobile game rank in detail. All forty minutes.', fx: { mio: -8, wisdom: -5 }, lesson: 'curiosity', ach: 'monologue', then: [
        { n: 'By minute twenty, chibi Xin Yi has fallen asleep standing up. By minute thirty-five, so has the uncle behind you.' },
        { mochi: 'A conversation is a game of catch, rookie. You just threw forty balls into the sea.', e: 'angry' },
      ] },
      { t: '(Stay on your phone.)', fx: { mio: -3 }, lesson: 'presence', then: [
        { n: 'She reads. You scroll. The queue moves. Nothing happens.' },
      ] },
    ] },
    { hide: '*' },

    // 2-2 negging
    { bg: 'beach' },
    { n: 'On the cable car, an ad plays on your phone.' },
    { phone: 'Alpha Kai 💪' },
    { txt: 'kai', t: 'ALPHA TIP #7: NEG her to lower her value. Try: "You\'d be cute if you smiled more." Works every time. Link in bio. 🔥' },
    { phoneOff: true },
    { show: 'kaede', e: 'cool', at: 'center' },
    { n: 'Kavya is next to you, looking at the sea. She ran a time trial this morning before coming.' },
    { choice: 'Say something to Kavya...', opts: [
      { t: '"Your 100m split at trials was insane. How do you even start that fast?"', fx: { kaede: 12, wisdom: 6 }, lesson: 'negging', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: 'You watched? ...It\'s the first three steps. Everyone thinks it\'s the legs. It\'s the arms.' },
        { s: 'kaede', e: 'happy', t: 'I\'ll show you sometime. You\'d be slow, but I\'ll show you.' },
      ] },
      { t: '"You\'d be cute if you smiled more."', fx: { kaede: -12, self: -5 }, lesson: 'negging', then: [
        { s: 'kaede', e: 'smug', t: 'Wow. Did you get that from a guy in a rented Lamborghini?' },
        { n: 'She laughs. At you. Haziq, across the cabin, facepalms so hard the cable car wobbles.' },
      ] },
      { t: '(Deep voice.) "I\'m the prize here. You should be trying to impress me."', fx: { kaede: -20, self: -10 }, lesson: 'negging', then: [
        { n: 'At the next stop, all five people in the cabin get off. You ride to Sentosa alone, with your deep voice.' },
        { badEnd: { title: 'BAD END #4 — Negged Yourself',
          text: 'You tried to make someone feel smaller so you would look bigger. It worked, sort of: you are now very alone in a very big cable car. Confidence is not putting someone down. It is being comfortable while lifting them up.' } },
      ] },
    ] },
    { hide: '*' },

    // 2-3 dessert
    { bg: 'mall' },
    { n: 'A dessert stall near the beach. Mango bingsu, $18 for the "premium" one. Your whole month\'s pocket money is about $100.' },
    { choice: 'You want to look generous...', opts: [
      { t: '"Let\'s get two big ones and share. I\'ll get this round, you guys get drinks later?"', fx: { hina: 4, mio: 4, kaede: 4, yuna: 4, wisdom: 5, cash: -18 }, lesson: 'buyinglove', then: [
        { s: 'hina', e: 'happy', at: 'center', t: 'Sharing is better anyway. Everyone gets the mango.' },
      ] },
      { t: 'Buy everyone a premium bingsu. All six. That\'s $108.', fx: { self: -8, cash: -108 }, lesson: 'buyinglove', then: [
        { s: 'yuna', e: 'happy', at: 'center', t: 'Omg, thanks!! (She takes a photo of it and doesn\'t eat it.)' },
        { mochi: 'People liked the bingsu. That is not the same as liking you. And now you have $0 until April.', e: 'sad' },
      ] },
      { t: '"Haziq, you organised this. You pay."', fx: { kenta: -6 }, then: [
        { s: 'kenta', e: 'sad', at: 'center', t: '...Bro. I have eleven dollars.' },
      ] },
    ] },
    { hide: '*' },

    // 2-4 horror ride
    { bg: 'mall' },
    { n: 'The arcade has a VR horror ride for pairs. Elise grabs your arm and points her phone at both of you.' },
    { s: 'yuna', e: 'happy', at: 'left', t: 'Say something scared for my story! Pretend you\'re protecting me~' },
    { show: 'hina', e: 'neutral', at: 'right' },
    { n: 'Hanis is standing by the claw machine, watching. Not saying anything.' },
    { choice: 'What do you do?', opts: [
      { t: '"Ha, sure. Hanis, come, we\'ll do a group one. Three people, triple the screaming."', fx: { hina: 8, yuna: 5, wisdom: 6 }, lesson: 'triangulation', rose: true, then: [
        { s: 'hina', e: 'happy', t: 'Fine. But if I scream, it didn\'t happen.' },
        { s: 'yuna', e: 'happy', t: 'Group shot! Okay this is actually cuter.' },
      ] },
      { t: 'Play it up and glance at Hanis. Let her see.', fx: { hina: -10, yuna: 3, wisdom: -6 }, lesson: 'triangulation', then: [
        { s: 'hina', e: 'sad', t: '...I\'m going to get bubble tea.' },
        { mochi: 'Using one girl to make another jealous turns two people into props. Neither of them signed up to be one.', e: 'angry' },
      ] },
      { t: 'The ride starts. You scream and run out of the booth.', fx: { yuna: 2, self: -2 }, ach: 'ghosted', then: [
        { n: 'Elise\'s story gets 4,000 views. The caption: "my brave protector 💀". You are famous now. Sort of.' },
      ] },
    ] },
    { hide: '*' },

    // 2-5 Haziq falls
    { bg: 'sentosa' },
    { n: 'Siloso Beach. Haziq tries a "cool" trick on the rope swing and lands face-first in the sea. Everyone laughs.' },
    { choice: 'Haziq is dripping and red-faced...', opts: [
      { t: 'Help him out, throw him your jacket, laugh WITH him: "Ten out of ten for commitment, bro."', fx: { kenta: 12, hina: 4, wisdom: 5 }, lesson: 'punchingdown', then: [
        { s: 'kenta', e: 'happy', at: 'center', t: 'Bro... you\'re a real one. I had a whole plan. The plan was bad.' },
      ] },
      { t: '"This is why you\'re single, bro." Wait for the laugh.', fx: { kenta: -12, hina: -5, wisdom: -5 }, lesson: 'punchingdown', then: [
        { n: 'A few people laugh. Hanis doesn\'t. Haziq laughs too, a beat late, and goes quiet for the rest of the day.' },
      ] },
    ] },
    { hide: '*' },

    // partner talk: friendship
    { bg: 'beach' },
    { n: 'Sunset on the sand. Elise is filming the sky. Xin Yi is writing on her phone. Somebody asks how many close friends you all have.' },
    { talk: 'friendship' },

    // 2-6 KTV + Rae
    { bg: 'karaoke' },
    { n: 'KTV at the mall. Haziq is murdering a Jay Chou song. Your phone buzzes.' },
    { if: (s) => s.flags.reiHasLine, then: [{ phone: 'Rae 🌙' }, { txt: 'rei', t: 'your friends are so boring, they don\'t get you like I do 🥺' }],
      else: [{ phone: '+65 8••• ••••' }, { txt: 'rei', t: 'hiii it\'s Rae from the walkway 🌙 your friends are so boring, they don\'t get you like I do 🥺' }] },
    { txt: 'rei', t: 'skip school Monday and come see me? just you and me ✨' },
    { phoneOff: true },
    { choice: 'Rae wants you to come away from your friends...', opts: [
      { t: '"I\'m having fun with my friends! See you never 😅" Put the phone away and sing.', fx: { wisdom: 10, self: 10, kenta: 4 }, lesson: 'isolation', rose: true, then: [
        { n: 'You duet "Shape of You" with Haziq. It is terrible. It is perfect.' },
      ] },
      { t: 'Leave KTV early to meet her.', fx: { kenta: -6, hina: -4, self: -6 }, lesson: 'isolation', then: [
        { n: 'You wait at the MRT for an hour. She never shows. A message: "next time 😘". Your friends finish the night without you.' },
        { mochi: 'She asked you to leave your friends. Someone who wants you alone is not someone who wants you well.', e: 'sad' },
      ] },
      { t: 'Skip school Monday. She asks for your bank PIN "for our future". You give it.', fx: { wisdom: -10 }, lesson: 'isolation', then: [
        { n: 'Monday. A man in a suit sits down where Rae was supposed to be. "Your girlfriend sends her love. Now, about the account..."' },
        { badEnd: { title: 'BAD END #5 — Just You and Me (and My Manager)',
          text: 'First she isolated you from your friends. Then she asked for access to your money. Isolation is the first step of almost every scam and every controlling relationship. Your friends are your early-warning system.' } },
      ] },
    ] },

    // 2-7 choose your passion
    { bg: 'night' },
    { n: 'Walking home from the MRT. Mochi opens a new panel on your phone: four bars called Your Life.' },
    { mochi: 'Pick something that\'s yours. Not to impress anyone. Something you\'d do even if nobody ever saw it.', e: 'neutral' },
    { choice: 'Your passion:', opts: [
      { t: 'Guitar. The secondhand one under your bed.', fx: { passion: 10, self: 3 }, flag: { passion: 'guitar' }, lesson: 'ownpassion', then: [{ mochi: 'Guitar. One hour a week, minimum. I will be listening. Please learn more than three chords.', e: 'happy' }] },
      { t: 'Drawing. The sketchbook full of void decks.', fx: { passion: 10, self: 3 }, flag: { passion: 'drawing' }, lesson: 'ownpassion', then: [{ mochi: 'Drawing. One hour a week. Start with hands. Everyone hates hands.', e: 'happy' }] },
      { t: 'Coding a small game. You have half a platformer.', fx: { passion: 10, self: 3 }, flag: { passion: 'coding' }, lesson: 'ownpassion', then: [{ mochi: 'A game! Put a cat in it. That\'s not a request.', e: 'happy' }] },
      { t: 'Basketball. The court at Block 412.', fx: { passion: 10, self: 3, health: 3 }, flag: { passion: 'basketball' }, lesson: 'ownpassion', then: [{ mochi: 'Basketball. Haziq will be thrilled. Practise free throws, not dunks.', e: 'happy' }] },
      { t: 'All four. Why choose?', fx: { passion: 5 }, flag: { passion: 'all' }, then: [{ mochi: 'All four at half speed. Ambitious. We\'ll see.', e: 'smug' }] },
      { t: '"My passion is... her."', fx: { self: -8, proj: 8, passion: 2 }, flag: { passion: 'all' }, then: [
        { mochi: 'That is a person, rookie, not a hobby. People are not projects. I\'m signing you up for all four. Pick one later.', e: 'angry' }] },
    ] },
    { s: 'hina', e: 'shy', at: 'center', t: 'Hey. You were... different today. Nicer.' },
    { mochi: 'Nicer is a good start. Now: sleep. Your Health bar is watching you.', e: 'smug' },
    { chapterEnd: true },
  ],
};
