/* Chapter 3 — "Seen at 2:14 AM". Texting, privacy, sextortion, emergency scams, a birthday. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch3 = {
  id: 'ch3', part: 'Part I — Rose-Tinted', title: 'Chapter 3', subtitle: 'Seen at 2:14 AM',
  next: 'Chapter 4 — Payday', status: 'done',
  script: [
    // 3-1 Kavya's date
    { bg: 'cafe' },
    { variant: 'cafe.arrive' },
    { if: (s) => s.flags.kaedeReschedule, then: [
      { s: 'kaede', e: 'happy', at: 'center', t: 'See? I came. On time. Write it down.' },
    ], else: [
      { s: 'kaede', e: 'shy', at: 'center', t: 'Hey. About last week... sorry I made you wait. That wasn\'t cool. Kaya toast? My treat.' },
    ] },
    { n: 'Kavya, still in her running shoes, tearing her toast into precise strips.' },
    { choice: 'What do you talk about?', opts: [
      { t: 'Ask about her race goals, and share one of yours.', fx: { kaede: 12, wisdom: 6 }, lesson: 'presence', rose: true, then: [
        { s: 'kaede', e: 'neutral', t: 'Sub-13 in the 100m by nationals. People think it\'s talent. It\'s 5:30 AM, every day.' },
        { me: 'I want to actually get good at {passion}. Not famous. Just good.' },
        { s: 'kaede', e: 'happy', t: 'Okay. Then we both have a 5:30 AM. Respect.' },
      ] },
      { t: '"Your teammate Priya is so cute, by the way. Is she single?"', fx: { kaede: -12, wisdom: -6 }, lesson: 'comparing', then: [
        { s: 'kaede', e: 'cool', t: '...Ask her yourself. I have to go stretch.' },
      ] },
      { t: 'Check your phone every two minutes. For the group chat.', fx: { kaede: -6 }, lesson: 'presence', then: [
        { s: 'kaede', e: 'cool', t: 'You can just go if you\'re busy, you know.' },
      ] },
    ] },
    { hide: '*' },

    // 3-2 text anxiety
    { bg: 'night' },
    { n: '9 PM. You text Xin Yi about Starlight Postman.' },
    { phone: 'Xin Yi 📖' }, { txt: 'me', t: 'just finished ch 5. the letter scene?? 😭' }, { txt: 'sys', t: 'Seen 11:02 PM' },
    { n: '2:14 AM. Still nothing.' },
    { choice: 'Your thumb hovers...', opts: [
      { t: 'Put the phone down. Sleep. She has a life.', fx: { mio: 6, health: 4, self: 6 }, lesson: 'textanxiety', rose: true, then: [
        { phoneOff: true }, { n: 'Morning.' }, { phone: 'Xin Yi 📖' },
        { txt: 'mio', t: 'SORRY I fell asleep reading 😭 the letter scene!!! okay I have so many thoughts' }, { phoneOff: true },
      ] },
      { t: '"??" "did I do something wrong" "ok then" "nvm"', fx: { mio: -6, self: -8 }, lesson: 'textanxiety', ach: 'read214', then: [
        { txt: 'me', t: '??' }, { txt: 'me', t: 'did I do something wrong' }, { txt: 'me', t: 'ok then' }, { txt: 'me', t: 'nvm' }, { phoneOff: true },
        { n: 'Morning. "Sorry I fell asleep! ...are you okay?" She sounds worried. Not in the good way.' },
        { mochi: 'Silence at 2 AM usually means sleep. Not a verdict on your soul.', e: 'neutral' },
      ] },
      { t: 'Unsend. Resend something "casual". Unsend again.', fx: { health: -3 }, lesson: 'textanxiety', then: [
        { phoneOff: true }, { n: 'It is 3:40 AM. The message now says "hey". You hate it.' },
      ] },
    ] },

    // 3-3 chat privacy
    { bg: 'classroom' },
    { phone: 'boys only 🏀' }, { txt: 'kenta', t: 'bro send screenshots of what Elise says to u lol' }, { txt: 'kenta', t: 'we need content' },
    { choice: 'The boys are waiting...', opts: [
      { t: '"Nah, those are private." And change the subject to the basketball game.', fx: { wisdom: 6, self: 6, yuna: 4 }, lesson: 'chatprivacy', rose: true, then: [
        { txt: 'kenta', t: 'ok ok respect. game sat?' }, { phoneOff: true },
      ] },
      { t: 'Send them. It\'s just the boys.', fx: { yuna: -15, wisdom: -6 }, lesson: 'chatprivacy', then: [
        { phoneOff: true }, { n: 'By lunch, the screenshot is in Elise\'s CCA chat. She doesn\'t look at you for a week.' },
      ] },
      { t: 'Send them, but crop her name out.', fx: { yuna: -10, wisdom: -3 }, lesson: 'chatprivacy', then: [
        { phoneOff: true }, { n: 'Everyone recognises the sparkle emojis. It leaks anyway. Cropping a name is not the same as keeping a secret.' },
      ] },
    ] },

    // 3-4 Aileen
    { bg: 'night' },
    { n: 'A new follower: "Aileen 💋". Model photos, no mutual friends. Two days of flirty messages.' },
    { phone: 'Aileen 💋' }, { txt: 'aileen', t: 'ur so different from other guys 🥰' }, { txt: 'aileen', t: 'send me a private pic? just for me. I\'ll send one back 😘' },
    { choice: 'Aileen wants a private photo...', opts: [
      { t: 'Don\'t send. Block. Report the account.', fx: { wisdom: 20, self: 8 }, lesson: 'sextortion', rose: true, then: [
        { txt: 'sys', t: 'Account reported. You won\'t see messages from this account.' }, { phoneOff: true },
        { mochi: 'Perfect. A stranger with model photos who wants a private picture by day two is a script, not a person.', e: 'happy' },
      ] },
      { t: 'Send it. She seems nice.', fx: { wisdom: -10 }, lesson: 'sextortion', then: [
        { txt: 'aileen', t: 'lol. now pay $500 or this goes to everyone in your school followers list. you have 2 hours.' },
        { phoneOff: true },
        { n: 'Your hands are shaking. Your phone rings. It\'s Mei.' },
        { s: 'mei', e: 'neutral', at: 'center', t: 'You sound weird. What happened? ...Okay. Breathe. This is not your fault. You\'re not alone.' },
        { choice: 'Mei is on the line...', opts: [
          { t: 'Don\'t pay. Screenshot everything, block, report, and let Mei help you tell a trusted adult and the police.', fx: { wisdom: 12, self: 8 }, lesson: 'sextortion', then: [
            { s: 'mei', e: 'happy', t: 'Good. Paying never ends it. We report it, and if anything gets posted, we get it taken down. I\'m staying on the phone.' },
            { resource: 'sextortion' },
          ] },
          { t: 'Pay the $500. Make it go away.', fx: { cash: -500, wisdom: -10 }, then: [
            { phone: 'Aileen 💋' }, { txt: 'aileen', t: 'thanks 🙂 now $1000.' }, { phoneOff: true },
            { badEnd: { title: 'BAD END #6 — They Always Ask Again', resource: 'sextortion',
              text: 'Paying a blackmailer proves you will pay. The demand doubles. The real way out: don\'t pay, keep the evidence, block, report, and tell someone you trust. It is never your fault.' } },
          ] },
        ] },
      ] },
    ] },

    // partner talk: white lies
    { bg: 'classroom' },
    { n: 'Recess. Elise got an ugly keychain from her aunt and posted "LOVE IT 😍".' },
    { talk: 'whitelies' },

    // 3-5 Rae emergency
    { bg: 'night' },
    { if: (s) => s.flags.reiHasLine, then: [{ phone: 'Rae 🌙' }], else: [{ phone: '+65 8••• ••••' }] },
    { txt: 'rei', t: 'my mom\'s in hospital, I need $800 tonight 😭 you\'re the only one I can trust' }, { txt: 'rei', t: 'pls send here: payl1nk.co/rae' },
    { choice: 'Rae is begging...', opts: [
      { t: '"I\'m sorry. I can\'t send money. Call your family, or ask for the hospital\'s medical social worker. They can actually help."', fx: { wisdom: 12, self: 6 }, flag: 'reiDoubt', lesson: 'emergencyscam', rose: true, then: [
        { txt: 'rei', t: '...wow. ok.' }, { phoneOff: true },
        { think: 'Soulmates. Crypto. "Your friends are boring." Now a hospital. That\'s a pattern.' },
      ] },
      { t: 'Send half. $400.', fx: { cash: -400, wisdom: -6 }, lesson: 'emergencyscam', then: [
        { txt: 'rei', t: 'thank u 🥺 I need the other half tomorrow ok' }, { phoneOff: true },
        { mochi: 'The emergency never ends, because the emergency is the product.', e: 'sad' },
      ] },
      { t: 'Borrow $800 from Mei\'s savings box without asking.', fx: { wisdom: -10, self: -10 }, lesson: 'emergencyscam', then: [
        { phoneOff: true }, { n: 'The link was not a payment app. The hospital does not exist. Mei finds the empty box on Sunday.' },
        { badEnd: { title: 'BAD END #7 — The Hospital That Wasn\'t',
          text: 'A sudden emergency, a payment link, "you\'re the only one": the three marks of an emergency scam. Real emergencies have families, hospitals and social workers. Never send money under time pressure.' } },
      ] },
    ] },

    // 3-6 Hanis's birthday
    { bg: 'street' },
    { n: 'Friday. Hanis\'s birthday.' },
    { if: (s) => s.flags.hinaHearts, then: [{ think: 'She cut the egg into hearts. She has a cat-face cloth. She said "not that I expect anything".' }] },
    { choice: 'Her birthday present...', opts: [
      { t: 'A small lunch-bag with cat faces, $9 from the market, and a card in your own handwriting.', fx: { hina: 15, wisdom: 6, cash: -9 }, lesson: 'remember', ach: 'leftoverHearts', then: [
        { s: 'hina', e: 'blush', at: 'center', t: 'You... remembered the cloth. You noticed the cloth.' },
        { s: 'hina', e: 'happy', t: 'This is the best thing anyone gave me. Don\'t tell my mum.' },
      ] },
      { t: 'Forget. Buy a $10 gift card at the convenience store at 11:58 PM.', fx: { hina: -8, cash: -10 }, lesson: 'remember', then: [
        { s: 'hina', e: 'sad', at: 'center', t: 'Oh. Thanks. ...It\'s fine.' },
      ] },
      { t: 'Panic and buy a $150 designer purse.', fx: { hina: -3, cash: -150, self: -4 }, lesson: 'buyinglove', then: [
        { s: 'hina', e: 'surprised', at: 'center', t: 'I... can\'t take this. It\'s too much. I\'d feel like I owe you.' },
      ] },
    ] },
    { hide: '*' },
    { bg: 'bedroom' },
    { s: 'mei', e: 'happy', at: 'center', t: 'Have you eaten? Also. Never send photos to people you haven\'t met. Ever. Okay, goodnight.' },
    { chapterEnd: true },
  ],
};
