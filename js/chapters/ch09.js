/* Chapter 9 — "After 'Yes'". Honeymoon traps and keeping your own life. Solo route: the same lessons, with friends. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch9 = {
  id: 'ch9', part: "Part III — Being Together", title: "Chapter 9", subtitle: "After \"Yes\"",
  next: "Chapter 10 — Green-Eyed Monster", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'bedroom' },
    WEAR('home'),
    { variant: 'mochi.morning' },
    SIM.split([
      // 9-1 effort drop
      { n: "Two weeks in. Saturday. You planned nothing. A new game just dropped." },
      { phone: '@route' }, { txt: '@route', t: "are we doing anything today? 🙂" }, { phoneOff: true },
      { choice: "Third Saturday in a row with no plan...", opts: [
        { t: "Plan something small around a thing she mentioned last week.", fx: { '@route': 8, trust: 6, wisdom: 4 }, lesson: 'effortdrop', then: [
          SIM.byRoute({
            hina: [{ bg: 'park' }, WEAR('out'), { bgm: 'romance' }, { s: 'hina', e: 'happy', at: 'center', t: "The old dragon playground in Toa Payoh! I mentioned it ONCE. You remembered." }],
            mio: [{ bg: 'library' }, WEAR('out'), { bgm: 'romance' }, { s: 'mio', e: 'happy', at: 'center', t: "Bookshop crawl? Three shops? ...I need a bigger tote bag." }],
            kaede: [{ bg: 'park' }, WEAR('out', { kaede: 'track' }), { bgm: 'romance' }, { s: 'kaede', e: 'happy', at: 'center', t: "7 AM run then prata. Now you're talking. Slowly, but talking." }],
            yuna: [{ bg: 'park' }, WEAR('out', { yuna: 'home' }), { bgm: 'romance' }, { s: 'yuna', e: 'shy', at: 'center', t: "Can we... not post today? Just walk around Botanic Gardens like normal people?" }],
            chloe: [{ bg: 'hawker' }, WEAR('out'), { bgm: 'romance' },
              { s: 'chloe', e: 'happy', at: 'center', t: "Ten-dollar hawker crawl. Five stalls, two dollars each. Best value wins. Loser buys sugarcane." },
              { s: 'chloe', e: 'smug', t: "Okay. You paid for the satay, I paid for the rojak, so you owe me forty cents. Transaction complete. ...Joking." },
              { flaw: { chloe: { transactional: 'seen' } }, why: "She joked that the date was a transaction." },
              { choice: "She already has the notes app open.", opts: [
                { t: "\"I'm not keeping score. You can stop counting with me.\"", fx: { chloe: 4, trust: 3 }, sig: 3, clarity: 2, then: [
                  { grow: { chloe: { warmth: 5 } }, why: "You told her you weren't keeping score." },
                  { flaw: { chloe: { 'keeps-score': 'growing' } }, why: "You told her you weren't keeping score." },
                  { s: 'chloe', e: 'blush', t: "...Okay. That will take practice. Here. I packed kueh for your mum. Don't read into it." },
                  { reveal: { chloe: 'warmth' }, why: "She packed kueh for your mum." },
                ] },
                { t: "\"Forty cents. I'll PayNow you.\"", fx: { chloe: 1 }, then: [
                  { s: 'chloe', e: 'neutral', t: "Received. ...Huh. That was less fun than I thought it would be." },
                ] },
              ] }],
            preet: [{ bg: 'classroom' }, WEAR('out', { preet: 'volunteer' }), { bgm: 'romance' },
              { s: 'preet', e: 'happy', at: 'center', t: "Two hours of fractions at the CC tuition room, then prata. My idea of a perfect date. You're allowed to say it isn't yours." },
              { n: "You stay. Danish, nine, finally gets equivalent fractions and does a victory lap around the tables." },
              { s: 'preet', e: 'happy', t: "See? Best feeling in the world. ...Okay, second best. The prata is coming." },
              { reveal: { preet: 'warmth' }, why: "You saw her with the kids at the CC." }],
            ava: [{ bg: 'hawker' }, WEAR('out'), { bgm: 'romance' },
              { s: 'ava', e: 'happy', at: 'center', t: "Hawker date! Okay, I'm paying for mine. You pay for yours. Fifty-fifty, every time. That's how it works, right?" },
              { choice: "Where you grew up, the guy usually treats.", opts: [
                { t: "\"Let's make our own system. Take turns for small stuff, split the big ones.\"", fx: { trust: 4 }, then: [
                  { s: 'ava', e: 'happy', t: "Turns for small, split for big. That's genius. We need a name for it." },
                  { flag: 'avaBillSystem' },
                ] },
                { t: "\"Fifty-fifty works for me.\"", fx: { trust: 4 }, then: [
                  { s: 'ava', e: 'happy', t: "Cool. Easy. No weird owing-each-other energy." },
                ] },
                { t: "\"Let me treat. Always.\"", fx: { trust: 4 }, then: [
                  { s: 'ava', e: 'neutral', t: "That's sweet. But then I'd feel like I owe you, and I hate owing. Turns?" },
                  { me: "Turns." },
                ] },
              ] }],
          }, [{ n: "A good, small Saturday." }]),
        ] },
        { t: "\"Can just stay home? I'm in a raid.\"", fx: { '@route': -8, trust: -6 }, lesson: 'effortdrop', then: [
          { txt: '@route', t: "oh. ok. again." },
          { mochi: "Week one you planned everything. Now you plan raids. She noticed.", e: 'sad' },
        ] },
        { t: "Go out, but stay on Discord the whole date.", fx: { '@route': -4, trust: -3 }, lesson: 'presence', then: [
          { s: '@route', e: 'sad', at: 'center', t: "Should I come back when your game finishes?" },
        ] },
      ] },
      { hide: '*' },

      // 9-2 too fast
      { bg: 'night' },
      WEAR('home'),
      { n: "Day eight. You feel SO in love. Your thumbs are typing things." },
      { choice: "What do you do with all this feeling?", opts: [
        { t: "Tell her one specific thing you like about being with her.", fx: { '@route': 6, trust: 6 }, lesson: 'toofast', then: [
          { s: '@route', e: 'blush', at: 'center', t: "That's... really specific. I like it. I like you." },
        ] },
        { t: "Say \"I love you\", name your future kids, change your bio to \"her husband\".", fx: { '@route': -6, trust: -6, proj: 8 }, lesson: 'toofast', then: [
          { s: '@route', e: 'surprised', at: 'center', t: "...Husband? It's been eight days. Can slow down a bit? It's a lot." },
        ] },
        { t: "Ask her to post couple photos to \"make it official\".", fx: { trust: -4 }, lesson: 'toofast', then: [
          { s: '@route', e: 'neutral', at: 'center', t: "Why must it be on the internet to be real?" },
        ] },
      ] },
      { hide: '*' },

      // 9-3 locker room
      { bg: 'field' },
      WEAR('school'),
      { show: 'takumi', e: 'smug', at: 'left' }, { show: 'ren', e: 'smug', at: 'right' },
      { s: 'ren', e: 'smug', t: "So how far already? 😏 Details, bro." },
      { choice: "The boys are waiting for a story...", opts: [
        { t: "\"That's between us.\" Change the topic.", fx: { trust: 8, self: 6 }, lesson: 'kissandtell', then: [
          { s: 'takumi', e: 'neutral', t: "Respect. Boring, but respect." },
        ] },
        { t: "Exaggerate. Make it sound like more.", fx: { trust: -20, self: -8 }, lesson: 'kissandtell', then: [
          { n: "By Wednesday it reaches her friends. She hears a version of herself that never happened." },
          { s: '@route', e: 'angry', at: 'center', t: "Why are people saying that about me? Did you say that?" },
        ] },
        { t: "Show them her private messages.", fx: { trust: -30 }, lesson: 'kissandtell', then: [
          { n: "Ryan screenshots it. By recess it's in four group chats." },
          { badEnd: { title: "BAD END #11 — Group Chat Hall of Shame",
            text: "What someone tells you in private is trust, not content. Once it's in a group chat, you can't take it back." } },
        ] },
      ] },
      { hide: '*' },

      // 9-4 Haziq's birthday
      { bg: 'karaoke' },
      WEAR('out'),
      { phone: "Haziq 🏀" }, { txt: 'kenta', t: "bro my bday ktv sat. u coming? u pangseh 3 times already lol. no pressure. (pressure)" }, { phoneOff: true },
      { choice: "You've bailed on Haziq three times...", opts: [
        { t: "Go. Tell her. She says \"of course, have fun!\"", fx: { kenta: 12, trust: 4, self: 4 }, lesson: 'ownlife', then: [
          { s: 'kenta', e: 'happy', at: 'center', t: "HE CAME. EVERYBODY, HE CAME. Okay. Mic. You're doing the Jay Chou duet with me." },
        ] },
        { t: "Cancel again. You'd rather see her.", fx: { kenta: -12, self: -6 }, flag: 'broStall', lesson: 'ownlife', then: [
          { txt: 'kenta', t: "ok bro. all good." }, { mochi: "\"All good.\" It's not. He's going to stop asking.", e: 'sad' },
        ] },
        { t: "Bring her along without asking anyone.", fx: { kenta: -4 }, lesson: 'ownlife', then: [
          { n: "The boys go quiet. She sits in the corner on her phone. Nobody has fun, especially her." },
        ] },
      ] },
      { hide: '*' },

      // 9-5 one month
      { bg: 'street' },
      WEAR('out'),
      { n: "One month. A mini anniversary." },
      { choice: "What do you do?", opts: [
        { t: "Something small, made from things you know about her.", fx: { '@route': 10, trust: 8 }, lesson: 'remember', then: [
          SIM.byRoute({
            hina: [{ s: 'hina', e: 'blush', at: 'center', t: "You... made ME a bento? With egg hearts? They're lopsided. I love them." }],
            mio: [{ s: 'mio', e: 'blush', at: 'center', t: "A letter. Handwritten. Like the postman. ...I'm keeping this forever. Don't look at me." }],
            kaede: [{ s: 'kaede', e: 'happy', at: 'center', t: "You timed my splits and made a chart? With stickers? Nerdiest gift ever. Perfect." }],
            yuna: [{ s: 'yuna', e: 'blush', at: 'center', t: "A playlist of songs I sang at KTV? Even the bad ones? Especially the bad ones." }],
            chloe: [{ s: 'chloe', e: 'blush', at: 'center', t: "A list of every kueh I ever said I liked? With a \"why\" column? ...That's the most romantic spreadsheet I've ever seen." }],
            preet: [{ s: 'preet', e: 'blush', at: 'center', t: "You made a fractions board game for my tuition kids? I'm not crying. It's the prata steam." }],
            ava: [{ s: 'ava', e: 'blush', at: 'center', t: "You printed my frangipani photo? And framed it? And wrote \"egg flower\" on the back? Okay. This is coming with me through every move. Every single one." }],
          }, []),
        ] },
        { t: "Forget. Then \"it's just one month lol\".", fx: { '@route': -10, trust: -8 }, lesson: 'remember', then: [
          { s: '@route', e: 'sad', at: 'center', t: "Ya. Just one month." },
        ] },
        { t: "Go big. $200 of flowers delivered to her class.", fx: { cash: -200, trust: -2 }, lesson: 'buyinglove', then: [
          { s: '@route', e: 'surprised', at: 'center', t: "Everyone was staring... it's nice, but now I feel like I owe you something. I don't like that feeling." },
        ] },
      ] },

      // 9-6 date budget
      { bg: 'mall' },
      WEAR('out'),
      { think: "Date budget this month: $60. A fancy restaurant would really impress her..." },
      { choice: "Next date...", opts: [
        { t: "Cheap and good: cook together, a park, the library. Split the kopi.", fx: { '@route': 6, trust: 4, wallet: 4 }, lesson: 'datebudget', then: [
          { s: '@route', e: 'happy', at: 'center', t: "Best date. I didn't have to wear uncomfortable shoes." },
        ] },
        { t: "Book the fancy place with a buy-now-pay-later app.", fx: { cash: -140, wallet: -10 }, lesson: 'datebudget', then: [
          { n: "The portions are tiny. The bill isn't. You spend next month paying for three bites of foam." },
        ] },
        { t: "Go, then sulk about the bill all night.", fx: { '@route': -6, cash: -90 }, lesson: 'datebudget', then: [
          { s: '@route', e: 'sad', at: 'center', t: "I would've been happy with chicken rice, you know." },
        ] },
      ] },
      { talk: 'gifts' },
      { deeper: 'genderwar' },
    ], [
      // solo branch
      { n: "No girlfriend. Just you, school, {passion}, and Haziq, who has decided you're his project." },
      { s: 'kenta', e: 'happy', at: 'center', t: "Single bros club! Rule one: we don't pangseh each other." },
      { phone: "boys only 🏀" }, { txt: 'ren', t: "yo anyone go anywhere with anyone over the hols 😏 details" }, { phoneOff: true },
      { choice: "Ryan wants gossip about a girl in your class...", opts: [
        { t: "\"Not my story to tell, bro.\"", fx: { self: 6, wisdom: 6 }, lesson: 'kissandtell', then: [{ s: 'kenta', e: 'happy', t: "Ryan, shh. Basketball." }] },
        { t: "Make something up for laughs.", fx: { self: -8, wisdom: -6 }, lesson: 'kissandtell', then: [{ mochi: "You made it up for laughs. She has to live in it.", e: 'angry' }] },
      ] },
      { choice: "Haziq's birthday KTV, Saturday.", opts: [
        { t: "Go. Obviously.", fx: { kenta: 12, self: 4 }, lesson: 'ownlife', then: [{ s: 'kenta', e: 'happy', t: "MY BRO. Okay. Mic." }] },
        { t: "Skip it to finish an assignment.", fx: { goal: 6, kenta: -6 }, then: [{ n: "You finish the assignment. Haziq sends you a video of himself singing your part." }] },
      ] },
      SIM.evening('ch9'),
      { talk: 'gifts' },
      { deeper: 'genderwar' },
    ]),
    { chapterEnd: true },
  ],
};
