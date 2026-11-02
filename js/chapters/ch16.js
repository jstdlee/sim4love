/* Chapter 16 — "Book Out". NS weekdays, book-out weekends: adulting, buy-now-pay-later debt, lending, distance, asking for help. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch16 = {
  id: 'ch16', part: 'Part V — On Your Own', title: 'Chapter 16', subtitle: 'Book Out',
  next: 'Chapter 17 — Chalet Night', status: 'done',
  script: [
    SIM.gate(),
    { bg: 'camp' },
    { n: 'You enlisted in March. Weekdays in camp: early mornings, a shaved head, a section of strangers who are slowly becoming friends.' },
    { mochi: 'I have also enlisted. As morale support. My rank is Cat.', e: 'smug' },

    // 16-1 adulting
    { bg: 'apartment' },
    { n: 'First book-out weekend. You have ordered food delivery four nights in a row, and Mum is still doing your laundry.' },
    { show: 'mom', e: 'neutral', at: 'center' },
    { s: 'mom', t: 'Your NSF allowance is not a delivery-app subscription, ah. And your uniform is not going to wash itself.' },
    { choice: 'Mum has a point. Mum usually has a point.', opts: [
      { t: 'Learn three cheap dishes, cook one for the family, do your own laundry, plan a hawker budget.', fx: { wallet: 10, health: 8, self: 6 }, lesson: 'adulting', ach: 'momWasRight', then: [
        { n: 'Egg fried rice, a passable tomato egg, and a soup that Dad describes as "brave". Mum takes a photo of it for the family chat.' },
        { s: 'mom', e: 'happy', t: 'Next week, you move the sofa so I can clean behind it.' },
        { n: 'You move the sofa. Then the cupboard. Then, somehow, the fridge.' },
        { ach: 'furnitureMover' },
      ] },
      { t: 'Keep ordering. Mum enjoys laundry, probably.', fx: { wallet: -10, health: -6 }, lesson: 'adulting', then: [
        { mochi: 'Twenty-one dollars for a bowl of noodles and a delivery fee. Your allowance is evaporating, and so is Mum\'s patience.', e: 'sad' },
      ] },
      { t: 'Instant noodles, every weekend.', fx: { wallet: 4, health: -8 }, lesson: 'adulting', then: [
        { mochi: 'Cheap. Also a nutrition plan designed by a raccoon. Learn one vegetable.', e: 'smug' },
      ] },
    ] },
    { hide: '*' },

    // 16-2 buy now, pay later
    { bg: 'mall' },
    { n: 'A mall kiosk: "New phone, $0 today! Buy now, pay later!" Next to it, a gaming PC with "only $89 a month" in giant letters.' },
    { choice: 'Your old phone has a crack shaped like a lightning bolt.', opts: [
      { t: 'Read the terms and the total. Walk away, or make one small purchase you can actually pay off.', fx: { wallet: 8, wisdom: 6 }, lesson: 'debt', then: [
        { mochi: '"$0 today" means "all of it later, plus late fees if you slip". If you can\'t afford it now, you usually can\'t afford it in instalments either.', e: 'doctor' },
      ] },
      { t: 'Stack three BNPL plans for a gaming PC, "for my passion".', fx: { wallet: -10, passion: 2 }, lesson: 'debt', then: [
        { n: 'Three apps, three due dates, one allowance. By the second month you are late on two of them.' },
        { choice: 'The late fees are piling up. A loan ad pops up: "Fast cash, no questions."', opts: [
          { t: 'Stop. List every payment, call each provider, ask Dad for help making a plan.', fx: { wallet: 4, self: 4 }, lesson: 'debt', then: [
            { s: 'dad', t: 'Okay. Spreadsheet. With colours. You learned that from somewhere.' },
          ] },
          { t: 'Take the loan to cover them, and add a few more plans for dates and gadgets.', fx: { wallet: -25 }, then: [
            { badEnd: { title: 'BAD END #23 — Minimum Payment Forever', resource: 'debt',
              text: 'Plans stacked on plans, then a loan to pay the plans. Now most of your allowance goes to interest and fees, and the debt is bigger every month. Buy-now-pay-later is still debt. Add up the total before you tap, and ask for help early: Credit Counselling Singapore is free and confidential.' } },
          ] },
        ] },
      ] },
    ] },

    // 16-3 Ryan
    { bg: 'camp' },
    { show: 'ren', e: 'neutral', at: 'center' },
    { n: 'Ryan Teo, your section mate. Perfect outfits on every book-out, a feed that looks like a watch advert.' },
    { s: 'ren', t: 'Bro, can borrow $600? Till allowance day. Promise. You\'re the only one I trust.' },
    { think: 'He already owes two other guys in the section. They told me.' },
    { choice: 'Ryan is smiling the confident smile of a man who owes $1,400.', opts: [
      { t: 'Say no kindly, and point him to the unit welfare officer or Credit Counselling Singapore.', fx: { wallet: 4, wisdom: 8, self: 6 }, lesson: 'lending', then: [
        { s: 'ren', t: '...Yeah. Okay. Maybe I should actually talk to someone. Don\'t tell the section?' },
        { me: 'I won\'t. But the welfare officer has seen worse. Go on Monday.' },
        { resource: 'debt' },
      ] },
      { t: 'Lend it. He looks so put-together, he must be good for it.', fx: { wallet: -12, wisdom: -6 }, lesson: 'lending', then: [
        { mochi: 'A perfect feed is not a bank statement. Often it is the reason for the bank statement.', e: 'smug' },
      ] },
      { t: 'Lend half.', fx: { wallet: -6, wisdom: -2 }, lesson: 'lending', then: [
        { mochi: 'Now you are half a creditor and fully awkward at every section dinner. Only lend what you could give away and never mention again.', e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 16-4 distance and money
    SIM.split([
      { bg: 'apartment' },
      { phone: '{her}' },
      { txt: '@route', t: 'why didn\'t u reply for an hour?? 😭' },
      { txt: '@route', t: 'can u fly over next month? i found flights. only $680' },
      { phoneOff: true },
      { think: 'Phones go in the box during training. And $680 is about two months of allowance.' },
      { choice: 'Distance is hard, and money is real.', opts: [
        { t: 'Explain camp phone rules. Propose a rhythm you can afford: a goodnight message, a Sunday call, a visit you save up for. Talk money openly.', fx: { trust: 8, wallet: 6, wisdom: 6 }, lesson: 'distance', then: [
          { txt: '@route', t: 'ok. sunday calls are sacred. and i\'ll stop counting minutes. i\'ll save up too, let\'s split the next ticket' },
          { lesson: 'money' },
          { mochi: 'Talking about money is not unromantic. Debt is unromantic.', e: 'happy' },
        ] },
        { t: 'Book the flight on BNPL.', fx: { wallet: -12, trust: 2 }, lesson: 'money', then: [
          { mochi: 'A lovely weekend, followed by six months of a payment reminder that says "remember that lovely weekend?"', e: 'sad' },
        ] },
        { t: 'Text back thirty times a day, even from the toilet in camp.', fx: { health: -6, goal: -4 }, lesson: 'distance', then: [
          { mochi: 'Constant contact is not closeness. A good long call beats a hundred anxious "where are you"s.', e: 'sad' },
        ] },
      ] },
    ], [
      { bg: 'hawker' },
      { show: 'kenta', e: 'neutral', at: 'center' },
      { s: 'kenta', e: 'neutral', t: 'Bro, every book-out you\'re busy. I panic when you don\'t reply for an hour. Also, Bali trip? Only $680. Let\'s go next month!' },
      { choice: 'Haziq misses you. Your wallet does not miss Bali.', opts: [
        { t: 'Explain the camp phone box. Agree on Saturday supper every book-out, and save up for a cheaper trip together.', fx: { kenta: 8, wallet: 6, wisdom: 6 }, lesson: 'distance', then: [
          { s: 'kenta', e: 'happy', t: 'Saturday supper. Sacred. And JB day trip instead. Fine. You\'re so adult now, it\'s disgusting.' },
          { lesson: 'money' },
        ] },
        { t: 'Book Bali on BNPL.', fx: { wallet: -12, kenta: 4 }, lesson: 'money', then: [
          { mochi: 'Bali was great. The six payments after Bali, less so.', e: 'sad' },
        ] },
      ] },
      { hide: '*' },
    ]),

    // 16-5 asking for help
    { bg: 'bedroom' },
    { n: 'A few weeks later. You\'ve barely spoken to anyone. Every book-out you game until 5 AM and sleep until 3 PM. Everything feels grey.' },
    { choice: 'Your phone has twelve unread messages. You haven\'t opened any.', opts: [
      { t: 'Call Mei. Join the weekend run club. Book a chat with the unit counsellor, or call mindline 1771.', fx: { health: 10, self: 8, kenta: 4 }, lesson: 'askhelp', ach: 'touchGrass', then: [
        { show: 'mei', e: 'neutral', at: 'center' },
        { s: 'mei', t: 'Of course I\'ll pick up. Even from Tokyo. Even at 2 AM. Thank you for calling instead of disappearing.' },
        { mochi: 'Asking for help is not weakness. It is maintenance. Even soldiers. Especially soldiers.', e: 'happy' },
        { resource: 'mentalhealth' },
        { hide: '*' },
      ] },
      { t: '"I\'m fine." Stay in the room.', fx: { health: -8, self: -6 }, lesson: 'askhelp', then: [
        { mochi: '"I\'m fine" is the most common lie in Singapore. If the grey lasts weeks, talk to someone: a friend, a counsellor, mindline 1771. You do not have to wait until it\'s worse.', e: 'sad' },
        { resource: 'mentalhealth' },
      ] },
    ] },

    // eldercare talk + Think Deeper
    { bg: 'dining' },
    { talk: 'eldercare' },
    { deeper: 'eldercare' },
    SIM.evening('ch16', 'A free book-out evening. Where does it go?'),
    { chapterEnd: true },
  ],
};
