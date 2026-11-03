/* Chapter 15 — "Results Day". Supporting her dream and keeping yours; Haziq's shame; Rae's callback; Dad and your passion. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const DREAM = {
    hina: { got: "I got it. I got the nursing degree. With hospital placements, the long-shift kind.", far: "Placement weeks, she'll be on twelve-hour shifts. You'll barely see each other." },
    mio: { got: "I got it. I got the writing programme in Melbourne.", far: "Melbourne. Seven hours of flying. A different time zone." },
    kaede: { got: "I got it. I got the athletics scholarship. In the US.", far: "Twelve time zones. She leaves in August." },
    yuna: { got: "I got it. I got into the dance academy in Seoul.", far: "Seoul. Two years. Six hours away." },
    chloe: { got: "I got it. The incubator kiosk at the new hawker centre, with a starter loan. My own stall.", far: "Seven-day weeks from 5 AM. Same island, but you'll barely see each other." },
    preet: { got: "I got it. Social work, with a six-month NGO placement in Chiang Mai.", far: "Chiang Mai. Six months. A different country, one hour behind." },
  };
  const R = (f) => SIM.byRoute(Object.fromEntries(SIM.HEROINES.map((h) => [h, f(h)])), []);

  window.CHAPTERS.ch15 = {
    id: 'ch15', part: "Part IV — Real Life", title: "Chapter 15", subtitle: "Results Day",
    next: "Chapter 16 — Book Out", status: 'done',
    script: [
      SIM.gate(),
      { bg: 'gradhall' },
      WEAR('results'),
      { n: "February. The school hall, a long table of envelopes, and two hundred people pretending to be calm. Your NS enlistment letter came last week." },
      { n: "You open yours. It's good. Not perfect. Good. Enough for the course you wanted." },

      // 15-1 her dream
      SIM.split([
        { show: '@route', e: 'surprised', at: 'center' },
        R((h) => [{ s: '@route', e: 'happy', t: DREAM[h].got }, { think: DREAM[h].far }]),
        { s: '@route', e: 'shy', t: "...Say something leh?" },
        { choice: "Her dream just came true, and part of it is far away.", opts: [
          { t: "\"I'll miss you like crazy. Go. We'll figure out the rest.\"", fx: { trust: 12, self: 4, '@route': 6 }, lesson: 'supportdreams', flag: 'supportedDream', then: [
            { s: '@route', e: 'blush', t: "I was so scared you'd ask me not to go. Thank you. Really." },
          ] },
          { t: "\"If you loved me, you'd stay.\"", fx: { trust: -15, wisdom: -8 }, lesson: 'supportdreams', then: [
            { s: '@route', e: 'sad', t: "That's not fair. You're making me choose between you and my life." },
            { mochi: "Guilt-trip her into staying and she'll resent you for it. Forever, probably.", e: 'angry' },
          ] },
          { t: "Say \"congrats\" and sulk for a week.", fx: { trust: -6 }, lesson: 'supportdreams', then: [
            { mochi: "Try the real version: \"I'm happy for you and I'm scared.\"", e: 'sad' },
          ] },
        ] },
        { hide: '*' },
      ], [
        { show: 'mei', e: 'happy', at: 'center' },
        { s: 'mei', e: 'happy', t: "Guess who got the overseas internship. Six months in Tokyo. Mum is already crying." },
        { choice: "Your sister is leaving for half a year.", opts: [
          { t: "\"Go! I'll handle Mum. Send me photos of every vending machine.\"", fx: { self: 4, wisdom: 4 }, lesson: 'supportdreams', then: [
            { s: 'mei', e: 'happy', t: "Who are you and what did you do with my annoying little brother?" },
          ] },
          { t: "\"Then who's going to help me with everything?\"", fx: { self: -4 }, lesson: 'supportdreams', then: [
            { s: 'mei', e: 'neutral', t: "You are. You're eighteen. You'll be good at it, actually." },
          ] },
        ] },
        { hide: '*' },
      ]),

      // 15-5 Dad and your passion
      { bg: 'dining' },
      WEAR('home'),
      { show: 'dad', e: 'neutral', at: 'center' },
      { s: 'dad', t: "Results not bad. So now, stop the {passion}. Cannot pay bills one. Time to be serious." },
      { choice: "Dinner has gone very quiet.", opts: [
        { t: "Show him your plan: passion hours, grades, a budget. Ask for a trial year on NS weekends.", fx: { passion: 8, goal: 6, self: 8, wisdom: 4 }, lesson: 'familytalk', then: [
          { s: 'dad', e: 'neutral', t: "...You made a spreadsheet. With colours." },
          { s: 'dad', e: 'happy', t: "One year. If your grades hold. And I want to come to the first show." },
        ] },
        { t: "Shout and slam the door.", fx: { self: -4, health: -4 }, lesson: 'familytalk', then: [
          { mochi: "Door closed. Conversation closed. He's scared for you, by the way.", e: 'sad' },
        ] },
        { t: "Say nothing, and quietly quit.", fx: { passion: -15, self: -8 }, lesson: 'familytalk', then: [
          { mochi: "You traded the thing that makes you you for one less awkward dinner. Bad trade.", e: 'sad' },
        ] },
      ] },
      { hide: '*' },

      // 15-2 your offer
      { n: "A week later your own letter comes: a place on the {passion} course, deferred until after NS. You can start the weekend programme now." },
      SIM.split([
        { show: '@route', e: 'neutral', at: 'center' },
        { s: '@route', e: 'neutral', t: "Can't you take the course at my uni instead? Then at least we're in the same place." },
      ], [
        { show: 'kenta', e: 'neutral', at: 'center' },
        { s: 'kenta', e: 'neutral', t: "Or come do engineering at NUS with me! Lab partners! Who needs {passion}?" },
      ]),
      { choice: "Your offer, or theirs?", opts: [
        { t: "\"I'm going. I want this. We'll work out how to stay close.\"", fx: { goal: 8, passion: 8, self: 10 }, lesson: 'dontshrink', flag: 'keptDream', then: [
          SIM.split([{ s: '@route', e: 'happy', t: "Good. I'd have felt terrible if you gave it up for me. I'm proud of you." }],
            [{ s: 'kenta', e: 'happy', t: "Ya ok. You'd be a terrible lab partner anyway. Proud of you, bro." }]),
        ] },
        { t: "Turn it down \"for them\".", fx: { goal: -12, passion: -12, self: -10 }, lesson: 'dontshrink', then: [
          { mochi: "Smaller you doesn't make a bigger relationship. Just less of you in it.", e: 'sad' },
        ] },
        { t: "Accept it without telling anyone.", fx: { goal: 6, passion: 6, trust: -4 }, lesson: 'dontshrink', flag: 'keptDream', then: [
          { mochi: "Right call. They'd have liked to hear it from you first, though.", e: 'smug' },
        ] },
      ] },
      { hide: '*' },

      // 15-3 Haziq and Alpha Kai
      { bg: 'field' },
      WEAR('out', { rei: 'herself' }),
      { n: "Alpha Kai's whole thing gets exposed online: fake testimonials, rented cars, a refund page that never loads." },
      { show: 'kenta', e: 'sad', at: 'center' },
      { s: 'kenta', e: 'sad', t: "Bro. I bought his course. $998. My part-time money. I feel so stupid." },
      { choice: "Haziq can't look at you.", opts: [
        { t: "\"Everyone kena something before. Let's try get a refund, then prata, I belanja.\"", fx: { kenta: 12, wisdom: 4 }, lesson: 'brosupport', ach: 'unsubscribed2', then: [
          { s: 'kenta', e: 'happy', t: "...Two prata. Egg. And you're helping me write the complaint to the bank." },
          { mochi: "Scammers love shame. You just ruined their day.", e: 'happy' },
        ] },
        { t: "Post it in the group chat as a joke.", fx: { kenta: -15, wisdom: -6 }, lesson: 'brosupport', then: [
          { s: 'kenta', e: 'angry', t: "Seriously? I told YOU. Not forty people." },
        ] },
      ] },
      { hide: '*' },

      // 15-4 Rae
      { if: (s) => s.flags.reiRedemption, then: [
        { bg: 'gradhall' },
        WEAR('out', { rei: 'herself' }),
        { show: 'rei', e: 'neutral', at: 'center' },
        { s: 'rei', e: 'neutral', t: "The police opened a case against Mr. G. I gave a statement. Three other girls did too." },
        { s: 'rei', e: 'happy', t: "You didn't try to \"save\" me with money. You gave me a phone number. That's what actually worked." },
        { choice: "Rae is smiling for real, for the first time since you met her.", opts: [
          { t: "Stay a friend, with boundaries. \"Glad you're okay. Kopi sometime?\"", fx: { wisdom: 6, self: 4, rei: 6 }, lesson: 'rescuer', then: [
            { s: 'rei', e: 'happy', t: "Kopi sometime. As friends. I'd like that." },
          ] },
          { t: "Ask her out.", fx: { rei: -2 }, lesson: 'rescuer', then: [
            { s: 'rei', e: 'neutral', t: "That's sweet. And no. I need to just be me for a while. Friends?" },
            { me: "Friends. Of course." },
          ] },
        ] },
        { hide: '*' },
      ] },

      // learning talk + Think Deeper
      { bg: 'hawker' },
      WEAR('out', { rei: 'herself' }),
      SIM.split([{ talk: 'learning' }], [{ talk: 'learning' }]),
      { deeper: 'nstiming' },
      SIM.split([
        R((h) => [{ bg: h === 'hina' ? 'mrt' : h === 'chloe' ? 'hawker' : 'airport' }, WEAR('later', { hina: 'cca', chloe: 'pitch' }), { n: h === 'hina' ? "You see Hanis off at the MRT for her first hospital placement week. It's not the airport, but it feels like one." : h === 'chloe' ? "Opening day at Chloe's kiosk, 5 AM. You carry trays and watch her sell the first box. It's not the airport, but it feels like one." : "Changi, Terminal 3. Her family, your family, way too many snacks. A long hug at the gate." }]),
        { show: '@route', e: 'shy', at: 'center' },
        { s: '@route', e: 'shy', t: "Sunday calls. Goodnight texts. And you send me your first recording." },
        { hide: '*' },
      ]),
      SIM.evening('ch15'),
      { chapterEnd: true },
    ],
  };
})();
