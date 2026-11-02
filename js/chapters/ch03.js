/* Chapter 3 — "Seen at 2:14 AM". Design: docs/CHAPTERS.md#chapter-3--seen-at-214-am
   STATUS: outline. Phone-heavy chapter. */
CHAPTERS.ch3 = {
  id: 'ch3', title: 'Chapter 3', subtitle: 'Seen at 2:14 AM', next: 'Chapter 4 — Culture Festival', status: 'outline',
  script: [
    { bg: 'street' },
    SIM.todo('[3-1] Kaede\'s real date at a café after practice (if flag kaedeReschedule; otherwise she apologises and asks again).'),
    { choice: 'Across the table, Kaede stirs her iced tea...', opts: [
      { t: 'Ask about her race goals and share yours.', fx: { kaede: 12, wisdom: 5 }, lesson: 'clearwords', then: [] },
      { t: '"Your teammate Sana is really cute, huh?"', fx: { kaede: -15 }, lesson: 'comparing', then: [] },
      { t: 'Check your phone every two minutes.', fx: { kaede: -8 }, lesson: 'presence', then: [] },
    ] },

    { bg: 'night' },
    SIM.todo('[3-2] You texted Mio at 9 PM. 2:14 AM: "Seen", no reply.'),
    { phone: 'Mio 📚' },
    { txt: 'me', t: 'hey! did you finish volume 4?' },
    { txt: 'sys', t: 'Seen 11:02 PM' },
    { choice: '2:14 AM. Still nothing.', opts: [
      { t: 'Put the phone down and sleep.', fx: { self: 8, wisdom: 5, mio: 5 }, lesson: 'textanxiety', then: [
        { txt: 'mio', t: 'I fell asleep reading!! sorry!! yes I finished it 😭' }, { phoneOff: true }] },
      { t: '"??" "did I do something wrong" "ok then"', fx: { self: -10, mio: -8 }, lesson: 'textanxiety', ach: 'read214', then: [
        { txt: 'me', t: '??' }, { txt: 'me', t: 'did I do something wrong' }, { txt: 'me', t: 'ok then' }, { phoneOff: true }] },
      { t: 'Unsend it and resend a more "casual" version.', fx: { self: -3 }, lesson: 'textanxiety', then: [{ phoneOff: true }] },
    ] },

    SIM.todo('[3-3] Boys\' group chat. Kenta: "bro send screenshots of what Yuna says to you lol".'),
    { choice: 'Kenta wants screenshots...', opts: [
      { t: '"Nah, those are private."', fx: { wisdom: 8, yuna: 5 }, lesson: 'chatprivacy', then: [] },
      { t: 'Send them. It\'s just the boys.', fx: { yuna: -15, wisdom: -8 }, lesson: 'chatprivacy', then: [SIM.todo('The screenshot reaches Yuna\'s group by lunch.')] },
      { t: 'Send them, but crop out the names.', fx: { yuna: -10, wisdom: -5 }, lesson: 'chatprivacy', then: [] },
    ] },

    SIM.todo('[3-4] "Airi 💋" (a stranger) adds you. Two days of flirting. Then: "send me a private photo, just for me".'),
    { phone: 'Airi 💋' },
    { txt: 'sys', t: '(TODO) Airi: "you\'re so mature for your age... send me something private? just for me 🙈"' },
    { choice: 'Airi is waiting...', opts: [
      { t: 'Don\'t send. Block and report the account.', fx: { wisdom: 20, self: 10 }, lesson: 'sextortion', then: [{ phoneOff: true }] },
      { t: 'Send a photo.', fx: { self: -10 }, lesson: 'sextortion', then: [
        { txt: 'sys', t: '(TODO) Airi: "pay ¥50,000 in 1 hour or I send this to everyone in your school."' },
        { choice: 'Your hands are shaking.', opts: [
          { t: 'Don\'t pay. Screenshot everything, block, report, and call Mei.', fx: { wisdom: 15 }, lesson: 'sextortion', then: [
            { phoneOff: true }, SIM.todo('Mei calls: supportive, not angry. "This is a crime against YOU. We report it together."'), { resource: 'sextortion' }] },
          { t: 'Pay so it goes away.', fx: { self: -15 }, lesson: 'sextortion', then: [
            { phoneOff: true },
            { badEnd: { title: 'BAD END #6 — They Always Ask Again', text: 'The next message asked for double. Paying never ends it — reporting and telling a trusted adult does.' } }] },
        ] }] },
    ] },
    { phoneOff: true },

    SIM.todo('[3-5] Rei: "my mom is in hospital, I need ¥80,000 tonight, you\'re the only one I can trust 😭".'),
    { choice: 'Rei sends a payment link...', opts: [
      { t: 'No money. "Please call your family or the hospital social worker."', fx: { wisdom: 15, self: 5 }, lesson: 'emergencyscam', flag: 'reiDoubt', then: [] },
      { t: 'Send half. Just in case it\'s real.', fx: { wisdom: -10, self: -5 }, lesson: 'emergencyscam', then: [] },
      { t: 'Borrow from Mei\'s savings and send it all.', fx: { wisdom: -20 }, lesson: 'emergencyscam', then: [
        { badEnd: { title: 'BAD END #7 — The Hospital That Wasn\'t', text: 'There was no hospital. Urgent + money + secret is the shape of a scam.' } }] },
    ] },

    SIM.todo('[3-6] Friday is Hina\'s birthday (she mentioned it in Ch1 → flag hinaBirthdayKnown).'),
    { choice: 'Hina\'s birthday...', opts: [
      { t: 'A cat-face bento cloth, because hers is getting worn out.', fx: { hina: 15 }, lesson: 'remember', then: [] },
      { t: 'Forget. Convenience-store gift card at 11:58 PM.', fx: { hina: -10 }, lesson: 'remember', then: [] },
      { t: 'A panic-bought designer bag.', fx: { hina: -3, self: -5 }, lesson: 'buyinglove', then: [] },
    ] },

    { mochi: 'The internet is just a big room full of strangers pretending to be your type.', e: 'neutral' },
    { chapterEnd: true },
  ],
};
