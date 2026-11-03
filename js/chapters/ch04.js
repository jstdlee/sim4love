/* Chapter 4 — "Payday". First pay from Uncle Ong's café: budget, livestream gifting, money boundaries, instalments. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch4 = {
  id: 'ch4', part: "Part I — Rose-Tinted", title: "Chapter 4", subtitle: "Payday",
  next: "Chapter 5 — Ubin Camp", status: 'done',
  script: [
    { bg: 'cafe' },
    WEAR('out'),
    { n: "Sunday closing time at Uncle Ong's café. Chairs up on the tables, the floor still wet. He slides an envelope across the counter." },
    { s: 'ogawa', e: 'happy', at: 'center', t: "Four weekends washing cups. $480. Count it. Then count again. Nobody else will count for you." },
    { fx: { cash: 480 } },
    { s: 'ogawa', e: 'neutral', t: "First pay ah, very dangerous. Feels like a lot. It's exactly $480." },

    // 4-1 budget
    { choice: "What do you do with the $480?", opts: [
      { t: "Half to savings, some for fun, some for people you care about. Type it into your notes app.", fx: { wisdom: 8, wallet: 10, self: 4 }, lesson: 'budget', ach: 'budgetKing', then: [
        { s: 'ogawa', e: 'happy', t: "Notes app. Good. Mine is a Khong Guan biscuit tin. Same idea." },
      ] },
      { t: "Keep it all for fun. You earned it.", fx: { passion: 3, wallet: -4 }, lesson: 'budget', then: [
        { s: 'ogawa', e: 'neutral', t: "Fun is good. Fun with no plan is how my cousin ended up with six air fryers." },
      ] },
      { t: "Put it aside \"for dates\". With... whoever.", fx: { proj: 6, self: -4 }, lesson: 'budget', then: [
        { mochi: "A date fund for a girl who doesn't exist yet. Budgeting for a daydream.", e: 'smug' },
      ] },
    ] },
    { hide: '*' },

    // 4-2 livestream
    { bg: 'night' },
    WEAR('home'),
    { n: "That night, lying in bed. A notification: Elise is live." },
    { phone: "LIVE 🔴 Elise ✨ 2.3k watching" },
    { txt: 'sys', t: "TOP GIFTER gets a shoutout! 🚀 Rocket = $50" },
    { txt: 'yuna', t: "thank u babe for the rose!! 🌹 omg who's gonna be my top gifter tonight~" },
    { choice: "Elise is live, smiling at 2,300 people...", opts: [
      { t: "Close the app. Tomorrow, ask her how rehearsal went.", fx: { yuna: 8, wisdom: 6, self: 6 }, lesson: 'paidattention', rose: true, then: [
        { phoneOff: true }, { bg: 'classroom' }, WEAR('school'),
        { s: 'yuna', e: 'surprised', at: 'center', t: "You... asked about rehearsal? Nobody asks about rehearsal. They ask about the live." },
        { s: 'yuna', e: 'happy', t: "It was a disaster, actually. Want to hear? It's so bad." },
      ] },
      { t: "Send one $5 heart. Just to be nice.", fx: { cash: -5, yuna: 1 }, lesson: 'paidattention', then: [
        { txt: 'yuna', t: "thanks for the heart, {name}! 💕" }, { phoneOff: true },
        { mochi: "She said your name. And 400 other names. That's the job.", e: 'neutral' },
      ] },
      { t: "Rocket. Rocket. Rocket. Become TOP GIFTER.", fx: { cash: -350, self: -10, proj: 10 }, lesson: 'paidattention', then: [
        { txt: 'yuna', t: "omg TOP GIFTER!! thank u uh... (squints) ...{name}??" }, { phoneOff: true },
        { n: "At school she walks right past you. Without the username, she doesn't know your face." },
        { badEnd: { title: "BAD END #19 — Top Gifter of Nothing",
          text: "You paid for attention and got exactly that: three seconds of your name, read off a screen. Bought attention is a receipt, not a relationship." } },
      ] },
    ] },

    // 4-3 Kavya spikes
    { hide: '*' },
    { bg: 'mall' },
    WEAR('out'),
    { n: "Saturday, the sports shop at Jurong Point. Kavya asked you to come \"for a second opinion\"." },
    { s: 'kaede', e: 'happy', at: 'center', t: "These spikes. $240. Nationals in six weeks, and mine are literally falling apart." },
    { s: 'kaede', e: 'smug', t: "You just got paid right? Buy for me? ...Kidding. Mostly." },
    { choice: "Kavya looks at the spikes, then at you...", opts: [
      { t: "\"$240 is half my pay, cannot. But I can help you look for second-hand ones, or come with you to ask Coach about team gear.\"", fx: { kaede: 10, wisdom: 8, self: 8 }, lesson: 'moneyboundary', rose: true, then: [
        { s: 'kaede', e: 'surprised', t: "...Okay, didn't expect a real answer. Coach has a gear fund. I totally forgot. You're kind of useful." },
      ] },
      { t: "Buy them. You want to see her smile.", fx: { cash: -240, kaede: 4, self: -8, proj: 8 }, lesson: 'moneyboundary', then: [
        { s: 'kaede', e: 'happy', t: "Wait, serious? ...Okay. Thanks. Um. Thanks." },
        { n: "She holds the bag like it's slightly too heavy." },
        { mochi: "The smile lasted four seconds. Your wallet will remember for four months.", e: 'sad' },
      ] },
      { t: "\"Haha, no way. Buy your own stuff.\" (Walk off.)", fx: { kaede: -8 }, lesson: 'moneyboundary', then: [
        { s: 'kaede', e: 'cool', t: "I said kidding. No need to be weird about it." },
      ] },
    ] },
    { hide: '*' },

    // 4-4 instalments
    { bg: 'mall' },
    WEAR('out'),
    { n: "On the way out, the phone shop. The new model, $998. Huge sign: ONLY $83/MONTH! 0% FOR 12 MONTHS!*" },
    { n: "*Late fee $30. After month 12, interest at 26.8% a year." },
    { choice: "Your current phone works fine...", opts: [
      { t: "Read the asterisk. Walk out. Your phone works.", fx: { wisdom: 8, wallet: 6 }, lesson: 'installments', rose: true, then: [
        { think: "$83 a month is twelve weekends of washing cups. For a better camera." },
      ] },
      { t: "Sign up. It's only $83.", fx: { cash: -83, wallet: -12, wisdom: -5 }, lesson: 'installments', then: [
        { mochi: "Not \"only $83\". It's $998, paid till next year. Buy now, pay later is just... later.", e: 'angry' },
      ] },
    ] },

    // 4-5 family money
    { bg: 'dining' },
    WEAR('home'),
    { n: "Dinner at home. Steamed fish, kangkong, the TV on Channel 8 with no one watching." },
    { s: 'mom', e: 'neutral', at: 'center', t: "So. First pay ah. Your father and I were saying... some families give a bit back to the house." },
    { show: 'dad', e: 'neutral', at: 'right' },
    { s: 'dad', e: 'happy', t: "No pressure. I gave my mother my whole first pay packet. She cried. I cried. Then I was broke for a month." },
    { choice: "Your parents are being careful about it...", opts: [
      { t: "Give $50 for the house. \"Thanks for seventeen years of rice.\"", fx: { cash: -50, wisdom: 6, self: 4 }, lesson: 'familymoney', then: [
        { s: 'mom', e: 'happy', t: "We put it towards your school fees. ...Wah. So grown-up already." },
      ] },
      { t: "\"It's my money. I worked for it.\"", fx: { self: -2 }, lesson: 'familymoney', then: [
        { s: 'dad', e: 'neutral', t: "It is. You're right. ...We worked for this flat also. Just saying." },
      ] },
      { t: "Give everything. Every dollar. The guilt is heavy.", fx: { cash: -150, wallet: -6 }, lesson: 'familymoney', then: [
        { s: 'mom', e: 'surprised', t: "Aiyo, no! We said a bit only. Keep most of it. Learning to manage it is the whole point." },
      ] },
    ] },
    { hide: '*' },

    // 4-thursday-open-night
    { bg: 'cafe' },
    WEAR('out'),
    { n: "Thursday Open Night at Uncle Ong's café: a borrowed amp, a wall of pinned-up drawings, a sign-up sheet on a clipboard. You're on shift." },
    { show: 'ollie', e: 'neutral', at: 'right' },
    { s: 'ollie', e: 'neutral', t: "Evening. Ollie. I run this, sort of. Mostly I carry the amp." },
    { flag: 'ollieMet' },
    { judge: { who: 'ollie', id: 'ollie.rich', verdict: 'unfair' } },
    { if: (s) => !!s.flags.avaMet, then: [
      { show: 'ava', e: 'happy', at: 'left' },
      { s: 'ava', e: 'happy', t: "Hey! I saw your story, so I came! Okay, real talk, that brownie was amazing." },
      { n: "She pays, then slides a five-dollar note across the counter to Uncle Ong. He looks at it like it might be a test." },
      { show: 'ogawa', e: 'neutral', at: 'center' },
      { s: 'ogawa', e: 'neutral', t: "Girl, what's this for? You paid already." },
      { s: 'ava', e: 'surprised', t: "It's a tip? For the service?" },
      { judge: { who: 'ava', id: 'ava.better', verdict: 'unfair' } },
      { s: 'ollie', e: 'happy', t: "Did that my first week. Bit of a nightmare, to be honest. The chicken rice uncle chased me down the road with my change." },
      { s: 'ollie', e: 'neutral', t: "Restaurants here add a ten percent service charge, then GST on top. Hawker stalls have neither, and nobody expects a tip. It's either built in or it's not a thing." },
      { s: 'ava', e: 'blush', t: "Oh my gosh. Uncle Ong, I'm so sorry. I wasn't trying to be weird about it." },
      { s: 'ogawa', e: 'happy', t: "Never mind. Put it in the Open Night jar. Then Ollie can buy new strings and stop complaining." },
      { hide: 'ogawa' },
      { s: 'ava', e: 'neutral', t: "So you work here? For money? My dad gives me eighty a week and I keep all of it. My mom says it's practice for real life." },
      { s: 'ava', e: 'surprised', t: "Wait, you give some of your pay to your MOM? Why? Isn't she supposed to give it to you?" },
      { flaw: { ava: { 'allowance-bubble': 'seen' } }, why: "She gets $80 a week and was surprised you give part of your pay at home." },
      { choice: "She's genuinely asking.", opts: [
        { t: "Explain, no judging: \"Lots of families here do it. It's thanks for the rice. Yours is practice, mine is belonging. Both okay.\"", fx: { ava: 8, wisdom: 4 }, lesson: 'cultures', then: [
          { s: 'ava', e: 'happy', t: "Huh. Belonging. Okay, I like that. I'm gonna ask my mom what she gave her parents. I have literally no idea." },
          { n: "She asks Uncle Ong if she can help stack chairs at closing instead. He says yes before she finishes the sentence." },
          { reveal: { ava: 'generosity' }, why: "She listened, apologised to Uncle Ong, and stayed to stack chairs." },
        ] },
        { t: "\"Must be nice to be rich.\"", fx: { ava: -4 }, then: [
          { s: 'ava', e: 'sad', t: "...Yeah. Okay. We're not, really. But I get why it looks like that." },
          { mochi: "She asked a real question. You answered a stereotype.", e: 'sad' },
        ] },
        { t: "\"Eighty a week?! Teach me how to get that from my dad.\"", fx: { ava: 3 }, then: [
          { s: 'ava', e: 'happy', t: "Step one: be born in Texas. Step two... actually, I don't know. I've never thought about it." },
        ] },
      ] },
      { hide: 'ava' },
    ] },
    { n: "Later, a nervous Sec 4 boy plays one song on Ollie's guitar. Ollie listens with his arms folded, then nods." },
    { s: 'ollie', e: 'happy', t: "Not bad, that." },
    { n: "The boy looks crushed. Ollie notices." },
    { s: 'ollie', e: 'neutral', t: "No, that's... where I'm from, that's a standing ovation. Come back next Thursday. Bring a second song." },
    { s: 'ollie', e: 'happy', t: "Same goes for you, by the way. If you ever want a slot for {passion}, it's there. No pressure." },
    { n: "He lends the boy his own guitar for the week. You find out later that he rents one room in Tiong Bahru, and the amp is borrowed too." },
    { reveal: { ollie: 'generosity' }, why: "He lent his own guitar to a kid he'd just met." },
    { contact: 'ollie' },
    { deeper: 'allowance' },
    { hide: '*' },

    // 4-voiddeck-futsal
    { bg: 'voiddeck' },
    WEAR('out'),
    { n: "Saturday night, the void deck court. Haziq's futsal kakis are one short. A new guy in a yellow jersey has already scored twice and hugged everyone, including a cat." },
    { show: 'mateo', e: 'happy', at: 'center' },
    { s: 'mateo', e: 'happy', t: "¡Hermano! ¡Qué bueno! Did you SEE that?! Mateo. Mateo Tan Rojas. Yes, Tan. Long story." },
    { flag: 'mateoMet' },
    { reveal: { mateo: 'warmth' }, why: "He knew everyone's name in ten minutes, including the cat's." },
    { show: 'kenta', e: 'happy', at: 'left' },
    { s: 'kenta', e: 'happy', t: "He moved from Medellín last year. His dad's from Bedok. Bro plays like he got four legs." },
    { judge: { who: 'mateo', id: 'mateo.clown', verdict: 'unfair' } },
    { n: "The new goalkeeper, a skinny Sec 3 kid, makes a save. Mateo charges over for a bear hug. The kid flinches and steps back." },
    { flaw: { mateo: { 'hugs-first-asks-later': 'seen' } }, why: "He went in to hug the new goalkeeper, who flinched." },
    { choice: "Mateo's arms are still out. The kid is looking at the floor.", opts: [
      { t: "Quietly, at the water cooler: \"Not everyone's a hugger, bro. Ask first. 'Can I hug you?' Two seconds only.\"", fx: { 'aff.mateo': 6, 'trust.mateo': 4, wisdom: 3 }, lesson: 'askfirst', then: [
        { s: 'mateo', e: 'sad', t: "Dios mío. In Medellín everybody hugs. My abuela hugs the postman. ...But he's not my abuela, sí." },
        { n: "Next save, Mateo stops two metres away." },
        { s: 'mateo', e: 'happy', t: "Can I hug you? I'm asking now. Look at me, growing." },
        { n: "The goalkeeper laughs and offers a fist bump instead. Mateo celebrates it like a World Cup final." },
        { flag: 'mateoAsks' },
        { flaw: { mateo: { 'hugs-first-asks-later': 'growing' } }, why: "He started asking before hugging." },
        { contact: 'mateo' },
      ] },
      { t: "Laugh it off. \"Relax lah, he's just friendly.\"", fx: { 'aff.mateo': 2 }, then: [
        { n: "The goalkeeper doesn't come back the next week." },
        { mochi: "Friendly is a feeling. Whether a hug is welcome is the other person's call.", e: 'neutral' },
      ] },
    ] },
    { hide: '*' },

    // Ah Ma, one block away
    { bg: 'dining' },
    WEAR('home'),
    { show: 'ama', e: 'neutral', at: 'center' },
    { n: "Sunday. Mum sends you to visit Ah Ma, one block away. She's folding plastic bags from the market into tiny triangles." },
    { s: 'ama', e: 'neutral', t: "You buy bubble tea? Fifteen dollar? Aiyoh. Fifteen dollar, Ah Ma can eat three days." },
    { n: "She holds her phone at arm's length and jabs at it like it owes her money." },
    { judge: { who: 'ama', id: 'ama.phones', verdict: 'unfair' } },
    { choice: "Ah Ma's phone is winning.", opts: [
      { t: "Pull up a stool. \"Show me what you're trying to do.\"", fx: { 'aff.ama': 4, 'trust.ama': 2 }, then: [
        { contact: 'ama' },
        { s: 'ama', e: 'happy', t: "The CC phone class teacher say must practise. You come every Sunday, I practise on you." },
      ] },
      { t: "\"Just give me, Ah Ma. Faster.\"", fx: { 'aff.ama': 1 }, then: [
        { s: 'ama', e: 'neutral', t: "Faster for you lah. For me, still don't know how." },
      ] },
    ] },
    { hide: '*' },

    // Chloe at the kueh stall
    { bg: 'hawker' },
    WEAR('hawker'),
    { show: 'chloe', e: 'neutral', at: 'center' },
    { n: "The kueh stall at the Seri Bayu hawker centre. The girl behind the counter is doing sums on a calculator while serving three customers." },
    { s: 'chloe', e: 'smug', t: "Fifteen-dollar bubble tea? That's three plates of chicken rice. You're not buying a drink, you're buying a photo. I'm Chloe. Kueh lapis, two dollars." },
    { flag: 'chloeMet' },
    { judge: { who: 'chloe', id: 'chloe.onlymoney', verdict: 'unfair' } },
    { n: "An old aunty shuffles up. Chloe hands her two pieces of ondeh-ondeh, writes nothing down, and waves her off." },
    { choice: "The aunty didn't pay.", opts: [
      { t: "Ask, quietly, about the aunty.", fx: { chloe: 12, 'trust.chloe': 4 }, then: [
        { s: 'chloe', e: 'neutral', t: "Mdm. Rokiah. Her pension comes on the 5th. Some months it doesn't stretch. Don't tell my dad. ...Okay, he knows. He pretends he doesn't." },
        { reveal: { chloe: ['compassion', 'generosity'] }, why: "You saw the tab she never collects." },
        { contact: 'chloe' },
      ] },
      { t: "Ask how she prices a kueh.", fx: { chloe: 8 }, then: [
        { s: 'chloe', e: 'happy', t: "Rice flour, coconut, pandan, gas, time. Then I round down for students. Want to see the spreadsheet?" },
        { reveal: { chloe: 'intellect' }, why: "She walked you through her costing." },
        { contact: 'chloe' },
      ] },
      { t: "\"Must be nice. Free kueh for your friends.\"", fx: { chloe: -4 }, then: [
        { s: 'chloe', e: 'angry', t: "She's not my friend. She's a customer. ...Who doesn't pay. Never mind." },
      ] },
    ] },
    { hide: '*' },

    // talk: spending
    { bg: 'hawker' },
    WEAR('hawker'),
    { variant: 'hawker.arrive' },
    { talk: 'spending' },
    { deeper: 'consumption' },
    SIM.evening('ch4'),
    { mochi: "Your Wallet bar moved this chapter. So did your Love IQ. Funny how those two keep holding hands.", e: 'smug' },
    { chapterEnd: true },
  ],
};
