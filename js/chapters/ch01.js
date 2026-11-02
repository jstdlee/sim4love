/* Chapter 1 — "First Week of JC". Five interactions, one per heroine. Commands: see the top of js/engine.js. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch1 = {
  id: 'ch1', part: 'Part I — Rose-Tinted', title: 'Chapter 1', subtitle: 'First Week of JC',
  next: 'Chapter 2 — The Group Date', status: 'done',
  script: [
    { bg: 'bedroom', petals: false },
    { n: 'February. Orientation week at Bayview Junior College.' },
    { n: 'Last year, in Sec 4, {name} confessed to a girl at the canteen drinks stall. She said "eww" and bought a bandung.' },
    { think: 'JC is a fresh start. New school, new people. This year I am getting a girlfriend. Somehow.' },
    { n: '*bzzzt*. The phone on the desk lights up by itself.' },
    { mochi: 'Nyaa~! Finally awake! I am Mochi, a Love-God-in-training. Your phone has been selected for... LOVE TRAINING!', e: 'happy' },
    { me: 'A talking cat in my phone. Great. I\'m still dreaming.' },
    { mochi: 'Listen, rookie. My exam is to teach ONE hopeless boy what love really is. Not tricks. Not pick-up lines. The real thing.' },
    { mochi: 'Every choice changes how close you are to people, and your own Love IQ and Self-respect. Some choices are traps. Some are... very bad endings.' },
    { mochi: 'Don\'t worry. If you mess up badly, I can rewind time. Once or twice. Okay, a lot. I am very patient.', e: 'smug' },
    { n: '*knock knock*' },
    { s: 'hina', e: 'happy', at: 'center', t: '{name}! First day of orientation and you\'re going to be late! Again!' },
    { n: 'Nur Hanis. Same HDB corridor since kindergarten. She has seen every embarrassing thing {name} has ever done.' },
    { s: 'hina', e: 'shy', t: 'Um... also. My mum made too much nasi lemak, so... here. Leftovers! Don\'t make it weird.' },
    { n: 'The tupperware is wrapped in a cloth with little cat faces. Inside, the egg has been cut into hearts. Very "leftover".' },
    { s: 'hina', e: 'neutral', t: 'Oh, and my birthday\'s the Friday after next. Not that I expect anything. At all.' },
    { flag: 'hinaBirthdayKnown' },
    { mochi: 'Interaction 1! Think carefully, rookie.', e: 'neutral' },
    { choice: 'Hanis hands you the box...', opts: [
      { t: '"Thanks, Hanis. You cut the egg into hearts? That really made my morning."', fx: { hina: 15, wisdom: 5 }, lesson: 'appreciation', flag: 'hinaHearts', then: [
        { s: 'hina', e: 'blush', t: 'Y-you noticed?! ...I mean. Obviously. Hearts are just easier to cut. Everyone knows that.' },
        { s: 'hina', e: 'happy', t: 'Now hurry up and change. I\'ll wait at the lift!' },
      ] },
      { t: '"Leftovers, huh? Trying to fatten me up so nobody else likes me?"', fx: { hina: 5 }, lesson: 'teasing', then: [
        { s: 'hina', e: 'angry', t: 'Hah?! As if I need to sabotage you! You do that perfectly by yourself!' },
        { s: 'hina', e: 'happy', t: '...Finish all of it though. Okay?' },
      ] },
      { t: '(Keep scrolling your phone.) "Mm. Put it on the desk."', fx: { hina: -10, wisdom: -5 }, lesson: 'presence', flag: 'hinaWalkedAhead', then: [
        { s: 'hina', e: 'sad', t: '...Okay. I\'ll go ahead first.' },
        { hide: 'hina' },
        { mochi: 'She woke up early to cut those hearts. And you gave her the top of your head.', e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 1-2 Rae
    { bg: 'street', petals: true },
    { n: 'The covered walkway from Seri Bayu to the MRT. Frangipani petals on the path, everyone in their new JC uniforms.' },
    { n: 'Someone walks straight into you. Coffee everywhere. Mostly on her.' },
    { s: 'rei', e: 'surprised', at: 'center', t: 'Oh my gosh, I\'m so sorry! ...Wait. Have we met before? You feel so familiar.' },
    { s: 'rei', e: 'happy', t: 'This is going to sound crazy, but I think we\'re soulmates. I can just tell. I\'m Rae.' },
    { n: 'Rae Koh. Perfect hair. Perfect smile. Nobody in your year has ever seen her before.' },
    { s: 'rei', e: 'smug', t: 'Hey, soulmate, you\'re smart, right? My uncle showed me this crypto app, MoonRich. My money doubled in a week. We could grow our future together~' },
    { mochi: 'Interaction 2! Hmm... my whiskers are tingling.', e: 'neutral' },
    { choice: 'Rae holds out her phone with the MoonRich app open...', opts: [
      { t: '"Soulmates?! Okay! Let\'s invest my savings together!"', fx: { wisdom: -5 }, lesson: 'romancescam', ach: 'moonrichInvestor', then: [
        { s: 'rei', e: 'happy', t: 'Yay! I knew you were special. Just scan here...' },
        { n: 'One week later. The MoonRich app has gone dark. So has Rae\'s Telegram account.' },
        { badEnd: { title: 'BAD END #1 — The Soulmate Portfolio',
          text: 'Your savings: $0. Your soulmate: gone. Your portfolio: 100% heartbreak. Someone who calls you "soulmate" in the first minute and then talks about money is not looking at you. They are looking at your wallet.' } },
      ] },
      { t: '"Ha, we literally just met. Let me get you some tissue for that coffee though."', fx: { wisdom: 15, self: 10 }, lesson: 'lovebomb', rose: true, then: [
        { s: 'rei', e: 'surprised', t: '...Huh. You\'re no fun.' },
        { s: 'rei', e: 'smug', t: 'Most boys just say yes. Interesting. See you around, {name}.' },
        { hide: 'rei' },
        { think: 'How does she know my name?' },
      ] },
      { t: '"No money. But... here\'s my Telegram."', fx: { wisdom: 5, rei: 5 }, flag: 'reiHasLine', lesson: 'romancescam', then: [
        { s: 'rei', e: 'happy', t: 'Ehh, no money? Okay, okay. I\'ll message you, soulmate~' },
        { hide: 'rei' },
        { mochi: 'You kept your wallet closed. Good. But you opened another door. We\'ll see where it leads.', e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // 1-3 Xin Yi
    { bg: 'library', petals: false },
    { n: 'Lunch break. The school library is cold enough to keep durians fresh. You came for the aircon.' },
    { n: 'A girl reaching for the top shelf drops a book. It slides to your feet.' },
    { n: '"The Starlight Postman", volume 7. A fantasy series about a boy who delivers letters between stars.' },
    { show: 'mio', e: 'shy', at: 'center' },
    { s: 'mio', e: 'shy', t: '...S-sorry. That\'s mine.' },
    { n: 'Lim Xin Yi. Same civics class. She has not said one word all week. Her bookmark is a bus ticket from 2019.' },
    { mochi: 'Interaction 3! Read the room, not just the book.', e: 'neutral' },
    { choice: 'You pick up the book...', opts: [
      { t: '"Starlight Postman? Is it good? What\'s it about?" (Listen, then let her get back to reading.)', fx: { mio: 15, wisdom: 10 }, flag: 'mioVol3', lesson: 'signals', then: [
        { s: 'mio', e: 'surprised', t: 'Y-you want to know? It\'s about... letters that take a hundred years to arrive. So people write to someone they\'ll never meet.' },
        { s: 'mio', e: 'happy', t: '...Volume 3 is the saddest one. If you ever read it, we could... talk about it. Maybe.' },
        { n: 'She goes back to reading. You go back to your aircon. A good conversation is allowed to be short.' },
      ] },
      { t: '(Grab her hand dramatically.) "It\'s fate. We were meant to meet here."', fx: { mio: -20, self: -10 }, lesson: 'consent', then: [
        { s: 'mio', e: 'surprised', t: '!!!' },
        { hide: 'mio' },
        { n: 'She leaves the book and runs. The next day, a teacher asks to see you at the student-development office.' },
        { badEnd: { title: 'BAD END #2 — The Council Would Like a Word',
          text: 'You touched a stranger without asking. In anime it is romantic. In real life it is scary. Touch needs a yes, every time.' } },
      ] },
      { t: '"Starlight Postman? Isn\'t that for kids? Bit old for that, no?"', fx: { mio: -15, wisdom: -5 }, lesson: 'mockery', then: [
        { s: 'mio', e: 'sad', t: '...It\'s not for kids.' },
        { hide: 'mio' },
        { mochi: 'Mocking what someone loves is mocking a piece of them. She will remember.', e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 1-4 Kavya
    { bg: 'field', petals: false },
    { n: 'After CCA trials, Kavya Pillai from the track team said: "Wait for me at the field after school." You waited. 45 minutes.' },
    { n: 'She finally appears, ponytail swinging, bag over one shoulder.' },
    { s: 'kaede', e: 'smug', at: 'center', t: 'Oh. You actually waited? 😏' },
    { s: 'kaede', e: 'cool', t: 'Ehh, something came up. Maybe next time. Or not. We\'ll see.' },
    { mochi: 'Interaction 4. Hot, then cold, then hot again. Classic.', e: 'neutral' },
    { choice: 'Kavya looks at you, waiting...', opts: [
      { t: '"Of course! I\'d wait for you every day ♡"', fx: { kaede: -5, self: -15 }, lesson: 'hotcold', then: [
        { s: 'kaede', e: 'smug', t: 'Every day? Cute. Then wait tomorrow too.' },
        { hide: 'kaede' },
        { mochi: 'If you\'ll accept anything, people may give you exactly that: anything.', e: 'sad' },
      ] },
      { t: '"No worries. Next time, just text if plans change. Want to reschedule?"', fx: { kaede: 15, self: 15 }, flag: 'kaedeReschedule', lesson: 'clearwords', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: '...Huh. Okay. That\'s fair.' },
        { s: 'kaede', e: 'blush', t: 'Saturday. Café near the MRT, after practice. I\'ll actually come. Promise.' },
      ] },
      { t: '(Post an Instagram story with a sad song: "some people don\'t keep promises 💔")', fx: { kaede: -15, wisdom: -10 }, lesson: 'games', then: [
        { s: 'kaede', e: 'angry', t: 'Seriously? You posted about me? Wow.' },
        { hide: 'kaede' },
        { mochi: 'Games invite more games. Clear words would have been faster.', e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // partner talk: refusal
    { bg: 'classroom', petals: false },
    { n: 'Canteen, Thursday. A boy with a fade haircut and a basketball under one arm drops into the seat next to you.' },
    { s: 'kenta', e: 'happy', at: 'left', t: 'Bro! Muhammad Haziq. Same CT. We\'re friends now, that\'s decided.' },
    { s: 'kenta', e: 'smug', t: 'Hanis, let me copy your chem tutorial lah. Friends never say no, right?' },
    { s: 'hina', e: 'neutral', at: 'right', t: 'No. But I\'ll explain question 3 to you at recess. That\'s a friend.' },
    { s: 'kenta', e: 'surprised', t: 'Wah. Cold.' },
    { talk: 'refusal' },
    { s: 'kenta', e: 'happy', t: 'Okay, okay. Question 3 at recess. ...What\'s a mole, actually?' },
    { hide: '*' },

    // 1-5 Elise
    { bg: 'night', petals: false },
    { n: 'Evening. Your phone buzzes.' },
    { phone: 'Elise ✨' },
    { txt: 'yuna', t: 'heyyy {name} 🥺 can you do my GP essay outline? you\'re SO smart' },
    { txt: 'yuna', t: 'also there\'s this concert next month!! $120 per ticket. you\'d get me one right? 💕' },
    { txt: 'yuna', t: 'oh and I\'m at KTV with my 3 besties rn lol. they\'re all guys btw hahaha' },
    { phoneOff: true },
    { n: 'Elise de Souza. Dance CCA, a few thousand followers, everyone\'s "bestie". She calls you every night. But what are you, exactly?' },
    { mochi: 'Last one, interaction 5! This one\'s tricky.', e: 'neutral' },
    { choice: 'You think about how to reply...', opts: [
      { t: '"Of course! I\'ll write the outline AND get the ticket!"', fx: { yuna: 5, self: -20, cash: -120 }, lesson: 'fishpond', then: [
        { phone: 'Elise ✨' }, { txt: 'yuna', t: 'omg you\'re the BEST 😘😘 (sent 2:41 AM)' }, { phoneOff: true },
        { mochi: 'You\'re her... what, exactly? Essay service? Wallet? You\'re a fish in a pond, rookie.', e: 'sad' },
      ] },
      { t: '"I\'ll help you study tomorrow, but you write it. No ticket. Also, real question: what are we?"', fx: { yuna: 10, self: 20, wisdom: 10 }, flag: 'yunaClarity', lesson: 'clarity', rose: true, then: [
        { phone: 'Elise ✨' }, { txt: 'yuna', t: '...oh.' }, { txt: 'yuna', t: 'honestly? nobody\'s asked me that before' }, { txt: 'yuna', t: 'study session is fine. let\'s talk tmr 🙂' }, { phoneOff: true },
        { mochi: 'Asking "what are we?" takes courage. And it protects your heart.', e: 'happy' },
      ] },
      { t: '(Send 14 jealous messages in a row.) "Who are these besties?? Why are you with them??"', fx: { yuna: -20, self: -10 }, lesson: 'neediness', then: [
        { phone: 'Elise ✨' }, { txt: 'me', t: 'who are they' }, { txt: 'me', t: 'why are you w them' }, { txt: 'me', t: 'reply' }, { txt: 'me', t: '???' }, { txt: 'me', t: '...' },
        { txt: 'sys', t: '⚠ This person is not receiving your messages.' }, { phoneOff: true },
        { badEnd: { title: 'BAD END #3 — Message Not Delivered',
          text: 'Fourteen messages, zero replies, one block. Jealousy is a feeling, not a plan. The healthy move was to ask clearly what you are, and decide what you want.' } },
      ] },
    ] },

    // wrap-up
    { bg: 'bedroom', petals: false },
    { n: 'That night.' },
    { mochi: 'Phew! Your first week of training is done!', e: 'happy' },
    { if: (s) => s.stats.wisdom >= 30, then: [
      { mochi: 'Not bad, rookie. You looked at people, not just their shine. There\'s hope for you yet.', e: 'happy' },
    ], else: [
      { mochi: 'Hmm. Lots to learn. That\'s fine. That\'s why I\'m here.', e: 'neutral' },
    ] },
    { if: (s) => s.flags.reiHasLine, then: [
      { phone: 'Rae 🌙' }, { txt: 'rei', t: 'goodnight, soulmate~ 🌙 sweet dreams of me ok' }, { phoneOff: true },
      { mochi: '...My whiskers again. Stay alert, rookie.', e: 'neutral' },
    ] },
    { mochi: 'Also: you have a life. Grades, a hobby, sleep, money. Look at the Your Life bars up top. Try to keep them alive.', e: 'smug' },
    { mochi: 'Next week, a group outing! I\'ll see you there.', e: 'happy' },
    { chapterEnd: true },
  ],
};
