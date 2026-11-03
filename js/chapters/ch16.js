/* Chapter 16 — "Book Out". NS weekdays, book-out weekends: adulting, buy-now-pay-later debt, lending, distance, asking for help. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch16 = {
  id: 'ch16', part: "Part V — On Your Own", title: "Chapter 16", subtitle: "Book Out",
  next: "Chapter 17 — Chalet Night", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'camp' },
    WEAR('ns'),
    { n: "You enlisted in March. Weekdays in camp: 5:30 AM wake-ups, a shaved head, a section of strangers slowly turning into friends." },
    { mochi: "I have also enlisted. Morale support. My rank is Cat.", e: 'smug' },

    // 16-1 adulting
    { bg: 'apartment' },
    WEAR('laterHome'),
    { n: "First book-out weekend. You've ordered delivery four nights in a row, and Mum is still doing your laundry." },
    { show: 'mom', e: 'neutral', at: 'center' },
    { s: 'mom', t: "Your NSF allowance is not for Grab Food every day, ah. And your uniform won't wash itself." },
    { choice: "Mum has a point. Mum usually has a point.", opts: [
      { t: "Learn three cheap dishes, cook one for the family, do your own laundry, set a hawker budget.", fx: { wallet: 10, health: 8, self: 6 }, lesson: 'adulting', ach: 'momWasRight', then: [
        { n: "Egg fried rice, a passable tomato egg, and a soup Dad calls \"brave\". Mum takes a photo for the family chat." },
        { s: 'mom', e: 'happy', t: "Next week, you move the sofa so I can clean behind." },
        { n: "You move the sofa. Then the cupboard. Then, somehow, the fridge." },
        { ach: 'furnitureMover' },
      ] },
      { t: "Keep ordering. Mum probably enjoys laundry.", fx: { wallet: -10, health: -6 }, lesson: 'adulting', then: [
        { mochi: "Twenty-one dollars for noodles plus delivery fee. Your allowance is evaporating. So is Mum's patience.", e: 'sad' },
      ] },
      { t: "Instant noodles every weekend.", fx: { wallet: 4, health: -8 }, lesson: 'adulting', then: [
        { mochi: "Cheap. Also a diet designed by a raccoon. Learn one vegetable.", e: 'smug' },
      ] },
    ] },
    { hide: '*' },

    // 16-2 buy now, pay later
    { bg: 'mall' },
    WEAR('later'),
    { n: "A mall kiosk: \"New phone, $0 today! Buy now, pay later!\" Next to it, a gaming PC with \"only $89 a month\" in giant letters." },
    { choice: "Your old phone has a crack shaped like a lightning bolt.", opts: [
      { t: "Read the terms and the total. Walk away, or buy one small thing you can actually pay off.", fx: { wallet: 8, wisdom: 6 }, lesson: 'debt', then: [
        { mochi: "\"$0 today\" means \"everything later, plus late fees\".", e: 'doctor' },
      ] },
      { t: "Stack three BNPL plans for a gaming PC, \"for my passion\".", fx: { wallet: -10, passion: 2 }, lesson: 'debt', then: [
        { n: "Three apps, three due dates, one allowance. By month two you're late on two of them." },
        { choice: "Late fees are piling up. An ad pops up: \"Fast cash, no questions.\"", opts: [
          { t: "Stop. List every payment, call each company, ask Dad to help make a plan.", fx: { wallet: 4, self: 4 }, lesson: 'debt', then: [
            { s: 'dad', t: "Okay. Spreadsheet. With colours. You learned that from somewhere." },
          ] },
          { t: "Take the loan to cover them, then add a few more plans for dates and gadgets.", fx: { wallet: -25 }, then: [
            { badEnd: { title: "BAD END #23 — Minimum Payment Forever", resource: 'debt',
              text: "Plans stacked on plans, then a loan to pay the plans. Now most of your allowance goes to interest and fees, and the debt grows every month. Buy-now-pay-later is still debt. Add up the total before you tap, and ask for help early: Credit Counselling Singapore is free and confidential." } },
          ] },
        ] },
      ] },
    ] },

    // 16-3 Ryan
    { hide: '*' },
    { bg: 'camp' },
    WEAR('ns'),
    { show: 'ren', e: 'neutral', at: 'center' },
    { n: "Ryan from your JC class ended up in your section. Of course he did. Perfect outfit every book-out, a feed that looks like a watch ad." },
    { s: 'ren', t: "Bro, can borrow $600? Till allowance day. Promise. You're the only one I trust." },
    { think: "He already owes two other guys in the section. They told me." },
    { choice: "Ryan is smiling the confident smile of a man who owes $1,400.", opts: [
      { t: "Say no nicely, and point him to the unit welfare officer or Credit Counselling Singapore.", fx: { wallet: 4, wisdom: 8, self: 6 }, lesson: 'lending', then: [
        { s: 'ren', t: "...Ya. Okay. Maybe I should actually talk to someone. Don't tell the section?" },
        { me: "I won't. Welfare officer has seen worse. Go on Monday." },
        { resource: 'debt' },
      ] },
      { t: "Lend it. He looks so put-together, sure can pay back.", fx: { wallet: -12, wisdom: -6 }, lesson: 'lending', then: [
        { mochi: "A perfect feed isn't a bank statement. Often it's the reason for one.", e: 'smug' },
      ] },
      { t: "Lend half.", fx: { wallet: -6, wisdom: -2 }, lesson: 'lending', then: [
        { mochi: "Now you're half a creditor and fully awkward at every section dinner.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 16-allowance-home: Mateo and Ryan in the bunk
    { if: (s) => !!s.flags.mateoMet, then: [
      { bg: 'camp' },
      WEAR('ns'),
      { show: 'mateo', e: 'neutral', at: 'left' },
      { n: "Ten minutes to lights out. Mateo, in the next bunk, is doing something on his banking app with great seriousness." },
      { s: 'mateo', e: 'happy', t: "Half my allowance to my abuela in Medellín. Every month. She says don't. I do anyway. Then I eat Maggi until payday. ¡Qué rico!" },
      { flaw: { mateo: { 'sends-too-much-home': 'seen' } }, why: "He sends half his NS allowance home and lives on instant noodles." },
      { choice: "He's laughing. Dinner was Maggi again.", opts: [
        { t: "\"Respect, bro. But fix an amount, and keep some for you. Your abuela wants you to eat.\"", fx: { 'aff.mateo': 5, 'trust.mateo': 3, wisdom: 3 }, then: [
          { s: 'mateo', e: 'neutral', t: "A fixed amount. Like a grown-up. Okay, sí. She'll be happy I eat vegetables. One vegetable." },
          { flaw: { mateo: { 'sends-too-much-home': 'growing' } }, why: "He set a fixed amount and kept some for himself." },
        ] },
        { t: "\"Siao ah, half?\"", fx: { 'aff.mateo': -2 }, then: [
          { s: 'mateo', e: 'neutral', t: "She raised me, bro. Half is a small number." },
        ] },
      ] },
      { show: 'ren', e: 'neutral', at: 'right' },
      { n: "Ryan's phone lights up on his bunk: \"Mam ☘️ calling\". He lets it ring out." },
      { s: 'ren', e: 'neutral', t: "Her birthday. It's lunchtime in Cork. I'll call later. Probably." },
      { choice: "The screen goes dark.", opts: [
        { t: "\"Two minutes, bro. Just say happy birthday. We won't listen. Much.\"", fx: { wisdom: 3 }, flag: 'renCalledMum', then: [
          { n: "He takes it to the corridor. Through the door: \"Grand, Mam, yeah. ...Happy birthday. I miss you too.\"" },
          { s: 'mateo', e: 'happy', t: "Hermano. Beautiful. I'm not crying. NS is very dusty." },
        ] },
        { t: "Leave it. Not your business.", fx: {}, then: [
          { mochi: "Distance doesn't only happen to couples. Sometimes it's a son and his mum.", e: 'neutral' },
        ] },
      ] },
      { hide: '*' },
    ] },

    // 16-4 distance and money
    SIM.split([
      { bg: 'apartment' },
      WEAR('laterHome'),
      { phone: '{her}' },
      { txt: '@route', t: "why u didn't reply for an hour?? 😭" },
      SIM.byRoute({
        hina: [{ txt: '@route', t: "can we do bintan next month? ferry + resort, i found a deal. only $680" }],
        mio: [{ txt: '@route', t: "can u fly over next month? i found flights. only $680" }],
        kaede: [{ txt: '@route', t: "can u fly over next month? i found flights. only $680" }],
        yuna: [{ txt: '@route', t: "can u fly over next month? i found flights. only $680" }],
        chloe: [{ txt: '@route', t: "penang next month? \"market research\" for the kiosk. ferry + hostel, i found a deal. only $680" }],
        preet: [{ txt: '@route', t: "can u fly over next month? i found flights. only $680" }],
        ava: [{ txt: '@route', t: "can u fly to california next month?? found flights w two layovers. only $680. also i made a spreadsheet of when we're both awake 📊" }],
      }, []),
      { phoneOff: true },
      { think: "Phones go in the box during training. And $680 is about two months of allowance." },
      { choice: "Distance is hard, and money is real.", opts: [
        { t: "Explain the camp phone rules. Suggest a rhythm you can afford: goodnight text, Sunday call, one trip you save up for. Talk money openly.", fx: { trust: 8, wallet: 6, wisdom: 6 }, lesson: 'distance', then: [
          { txt: '@route', t: "ok. sunday calls are sacred. and i'll stop counting minutes. i'll save too, we split the next one" },
          { lesson: 'money' },
          { mochi: "Talking about money: unromantic. Debt: way more unromantic.", e: 'happy' },
        ] },
        { t: "Book it on BNPL.", fx: { wallet: -12, trust: 2 }, lesson: 'money', then: [
          { mochi: "Lovely weekend. Then six months of reminders saying \"remember that lovely weekend?\"", e: 'sad' },
        ] },
        { t: "Text back thirty times a day, even from the camp toilet.", fx: { health: -6, goal: -4 }, lesson: 'distance', then: [
          { mochi: "One long call beats a hundred anxious \"where are you\"s.", e: 'sad' },
        ] },
      ] },
    ], [
      { bg: 'hawker' },
      WEAR('later'),
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: "Bro, every book-out you busy. I panic when you don't reply for an hour. Also, Bali? Only $680. Next month, jom!" },
      { choice: "Haziq misses you. Your wallet does not miss Bali.", opts: [
        { t: "Explain the camp phone box. Saturday supper every book-out, and save up for a cheaper trip together.", fx: { kenta: 8, wallet: 6, wisdom: 6 }, lesson: 'distance', then: [
          { s: 'kenta', e: 'happy', t: "Saturday supper. Sacred. And JB day trip instead. Fine. You're so adult now, it's disgusting." },
          { lesson: 'money' },
        ] },
        { t: "Book Bali on BNPL.", fx: { wallet: -12, kenta: 4 }, lesson: 'money', then: [
          { mochi: "Bali was great. The six payments after Bali, less so.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 16-5 asking for help
    { bg: 'bedroom' },
    WEAR('laterHome'),
    { n: "A few weeks later. You've barely talked to anyone. Every book-out you game till 5 AM and sleep till 3 PM. Everything feels grey." },
    { choice: "Twelve unread messages. You haven't opened any.", opts: [
      { t: "Call Mei. Join the weekend run club. Book a chat with the unit counsellor, or call mindline 1771.", fx: { health: 10, self: 8, kenta: 4 }, lesson: 'askhelp', ach: 'touchGrass', then: [
        { show: 'mei', e: 'neutral', at: 'center' },
        { s: 'mei', t: "Of course I pick up. Even from Tokyo. Even at 2 AM. ...Thanks for calling instead of disappearing, okay?" },
        { mochi: "Soldiers need maintenance too. Especially soldiers.", e: 'happy' },
        { resource: 'mentalhealth' },
        { hide: '*' },
      ] },
      { t: "\"I'm fine.\" Stay in the room.", fx: { health: -8, self: -6 }, lesson: 'askhelp', then: [
        { mochi: "\"I'm fine\": Singapore's most popular lie. If the grey lasts weeks, talk to someone. mindline 1771. Don't wait for worse.", e: 'sad' },
        { resource: 'mentalhealth' },
      ] },
    ] },

    // Ah Ma's hidden fall; Joy on agency loans
    { bg: 'dining' },
    WEAR('laterHome'),
    { show: 'ama', e: 'sad', at: 'center' },
    { n: "Book-out weekend. Ah Ma has a bruise on her arm the size of a mandarin orange. \"Bump the door only.\" Mum's face says she doesn't believe it." },
    { flaw: { ama: { 'refuses-help': 'seen', 'worries-about-money': 'seen' } }, why: "She hid a fall so nobody would spend money on her." },
    { s: 'ama', e: 'sad', t: "Don't tell your mother. Polyclinic so expensive. I don't want to trouble anybody." },
    { reveal: { ama: 'sensitivity' }, why: "She hid her fall to protect the family, not herself." },
    { judge: { who: 'ama', id: 'ama.burden', verdict: 'fair' } },
    { choice: "Ah Ma is asking you to keep a secret.", opts: [
      { t: "\"You're not trouble, Ah Ma.\" Tell Mum together, and check the CHAS and MediSave rules for her visit.", fx: { 'trust.ama': 6, 'aff.ama': 4, wisdom: 4 }, sig: 2, then: [
        { flaw: { ama: { 'refuses-help': 'growing' } }, why: "You told Mum together, and showed her it wouldn't cost what she feared." },
        { s: 'mom', e: 'sad', at: 'right', t: "Ma. Next time you call me first. Not after. First." },
        { if: (s) => !!s.flags.amaPreet && !s.flags.amaShield, then: [
          { s: 'ama', e: 'happy', t: "Preet teacher also say same thing. She put the ScamShield for me last week. Very clever girl." },
          { flag: 'amaShield' },
        ] },
      ] },
      { t: "Keep her secret. She asked.", fx: { 'aff.ama': 2, 'trust.ama': -2 }, then: [
        { mochi: "Respecting her is right. Hiding a fall from the people who'd help is not the same thing.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },
    { bg: 'voiddeck' },
    WEAR('later'),
    { show: 'joy', e: 'neutral', at: 'center' },
    { s: 'joy', e: 'neutral', t: "My cousin's agency says she 'owes' them eight months' salary for placement. Then they keep her passport. That's not a loan, that's a trap. I told her: call the MOM hotline. She says she can't say no to them." },
    { reveal: { joy: 'compassion' }, why: "She spent her day off helping her cousin fight an agency loan." },
    { flaw: { joy: { 'cant-say-no': 'seen' } }, why: "You saw the same habit in her that she warned her cousin about." },
    { contact: 'joy' },
    { hide: '*' },

    // eldercare talk + Think Deeper
    { bg: 'dining' },
    WEAR('laterHome'),
    { talk: 'eldercare' },
    { deeper: 'eldercare' },
    SIM.evening('ch16', "A free book-out evening. Where does it go?"),
    { chapterEnd: true },
  ],
};
