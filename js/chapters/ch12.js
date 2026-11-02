/* Chapter 12 — "Closeness". Asking first, "not yet", image-based abuse, her preferences, her people, body jokes,
   and your own "not yet". Kiss-level only; nothing explicit (characters are 17). Solo route: friends and family. */
window.CHAPTERS = window.CHAPTERS || {};
(function () {
  const VISIT = {
    hina: { intro: "Sunday lunch at Hanis's grandmother's flat in Geylang Serai. Twenty relatives, rendang and ketupat, and every single one of them is looking at you.",
      custom: "Shoes off at the door, salam her grandmother properly, and a tin of kuih from a halal bakery." },
    mio: { intro: "Xin Yi's grandmother's 80th birthday dinner at her aunt's place. Twenty relatives, longevity noodles and peach buns, and every single one of them is looking at you.",
      custom: "You bring two mandarin oranges, greet every elder by the right title, and avoid saying \"four\" all night. When Joy, who helps look after Xin Yi's grandmother, brings out the soup, you get up to help and thank her by name." },
    kaede: { intro: "Kavya's cousin's engagement lunch at her family's place. Twenty relatives, murukku and mutton varuval, and every single one of them is looking at you.",
      custom: "Shoes off, a real compliment for the kolam at the door, and yes to the third helping of murukku." },
    yuna: { intro: "Christmas lunch with Elise's Eurasian family. Twenty relatives, devil's curry and sugee cake, and every single one of them is looking at you.",
      custom: "You bring a card for her grandmother, call her \"Granny\" because she insists, and say yes to more sugee cake." },
  };
  const R = (f) => SIM.byRoute({ hina: f('hina'), mio: f('mio'), kaede: f('kaede'), yuna: f('yuna') }, []);

  window.CHAPTERS.ch12 = {
    id: 'ch12', part: "Part III — Being Together", title: "Chapter 12", subtitle: "Closeness",
    next: "Chapter 13 — Health Class", status: 'done',
    script: [
      SIM.gate(),
      { bg: 'apartment' },
      { n: "Year-end holidays. No school, long afternoons, the whole of December lying there like a cat in the sun." },
      SIM.split([
        // 12-1 asking first
        { n: "Movie night at your flat. Mum is in the kitchen, very loudly pretending not to listen. The credits roll. It's quiet." },
        { show: '@route', e: 'shy', at: 'center' },
        { think: "I want to kiss her. I really, really want to kiss her." },
        { choice: "A quiet moment...", opts: [
          { t: "Ask: \"Can I kiss you?\"", fx: { trust: 8, wisdom: 4, self: 2 }, lesson: 'consent', then: [
            { if: (s) => s.stats.trust >= 55, then: [
              { s: '@route', e: 'blush', t: "...Yes. I was hoping you'd ask." },
              { n: "It's short and a bit clumsy and you'll remember it for the rest of your life." },
            ], else: [
              { s: '@route', e: 'shy', t: "Not yet? I like you a lot. I'm just... not there yet. Is that okay?" },
              { choice: "She said \"not yet\".", opts: [
                { t: "\"Of course can. Thanks for telling me.\" And mean it.", fx: { trust: 10, '@route': 6, self: 4 }, lesson: 'pace', then: [
                  { s: '@route', e: 'happy', t: "You're the first person I felt okay saying that to. ...Movie again next week?" },
                ] },
                { t: "Sulk through the credits.", fx: { trust: -10, '@route': -6 }, lesson: 'pace', then: [
                  { mochi: "She was honest, and you made it cost something. Let it grow at its own pace.", e: 'sad' },
                ] },
                { t: "Keep asking. \"Come on, one only.\"", fx: { trust: -30 }, lesson: 'pressure', then: [
                  { s: '@route', e: 'angry', t: "I said not yet. I want to go home now." },
                  { badEnd: { title: "BAD END #15 — Movie Over",
                    text: "\"Not yet\" means not yet. Asking again and again after an answer is pressure, and pressure is the opposite of consent. Respecting the first answer is what makes the next yes real." } },
                ] },
              ] },
            ] },
          ] },
          { t: "\"If you really liked me, you would.\"", fx: { trust: -20, '@route': -12 }, lesson: 'pressure', then: [
            { s: '@route', e: 'sad', t: "That's... not fair. Liking you has nothing to do with being ready." },
          ] },
          { t: "Just lean in without asking.", fx: { trust: -12, '@route': -6 }, lesson: 'consent', then: [
            { n: "She turns her head away just in time. The silence is very loud. Mum coughs in the kitchen." },
            { mochi: "Asking isn't unromantic. Guessing wrong is.", e: 'angry' },
          ] },
        ] },
        { hide: '*' },

        // 12-2 private photos
        { bg: 'bedroom' },
        { phone: "boys only 🏀" },
        { txt: 'kenta', t: "bro couples send each other pics. ask her 😏" },
        { phoneOff: true },
        { choice: "Haziq is being Haziq.", opts: [
          { t: "\"No. Never.\" And say why.", fx: { wisdom: 8, self: 6, kenta: 2 }, lesson: 'imageabuse', then: [
            { txt: 'me', t: "no. she's 17. asking for, keeping or forwarding a sexual image of someone her age can be a crime here. and sharing anyone's private image without consent is a crime at any age." },
            { txt: 'kenta', t: "wait serious?? ok deleting this msg. thanks bro" },
          ] },
          { t: "Ask her for a private photo.", fx: { trust: -25, '@route': -15, wisdom: -8 }, lesson: 'imageabuse', then: [
            { phone: '@route' }, { txt: '@route', t: "why would you ask me that? that really scared me." }, { phoneOff: true },
            { choice: "She's hurt and scared.", opts: [
              { t: "Apologise properly. Never ask again.", fx: { trust: 6, wisdom: 4 }, lesson: 'apology', then: [
                { txt: 'me', t: "you're right. I'm sorry. I won't ask again, ever. that was wrong of me." },
              ] },
              { t: "Keep asking, and say you'll show the boys you're \"legit\".", fx: { trust: -40 }, lesson: 'imageabuse', then: [
                { badEnd: { title: "BAD END #16 — Screenshot Forever", resource: 'images',
                  text: "Pressuring someone for intimate images, and threatening to share them, is abuse. In Singapore, sexual images of anyone under 16 are child abuse material, getting a 16- or 17-year-old to make one can also be an offence, and sharing or threatening to share anyone's intimate image without consent is an offence at any age. Once an image is out, it may never fully come back." } },
              ] },
            ] },
          ] },
        ] },

        // 12-3 surprises
        { bg: 'mall' },
        { think: "Her birthday's next week. HUGE surprise party. Thirty people, balloons, a cake with her face printed on it..." },
        { think: "She's told me twice she hates surprises. But this one is different. Right?" },
        { choice: "The surprise party...", opts: [
          { t: "Cancel it. Plan what she actually likes.", fx: { '@route': 10, trust: 6 }, lesson: 'prefsmatter', then: [
            { n: "Three friends, her favourite food, and you tell her the plan a week ahead. She smiles the whole night." },
          ] },
          { t: "Do it anyway. \"She'll love it once she sees it.\"", fx: { '@route': -10, trust: -6, cash: -80 }, lesson: 'prefsmatter', then: [
            { show: '@route', e: 'surprised', at: 'center' },
            { s: '@route', e: 'sad', t: "Thank you. Really. Can I... go home early? I told you I hate this." },
          ] },
        ] },
        { hide: '*' },

        // 12-4 her people
        { bg: 'dining' },
        R((h) => [{ n: VISIT[h].intro }]),
        { choice: "How do you handle her people?", opts: [
          { t: "Follow the house's customs, ask her relatives real questions, help clear the plates, phone in pocket.", fx: { '@route': 8, trust: 8, wisdom: 4 }, lesson: 'herpeople', then: [
            R((h) => [{ n: VISIT[h].custom }]),
            { s: '@route', e: 'happy', at: 'center', t: "My aunty just asked if you're coming next year. In my family that's the highest honour." },
          ] },
          { t: "Stay on your phone and joke that her cousins are \"boring\".", fx: { '@route': -12, trust: -10 }, lesson: 'herpeople', then: [
            { s: '@route', e: 'angry', at: 'center', t: "Those are my people. If you can't like them, at least be nice to them." },
          ] },
          { t: "Try too hard. Tell everyone your grades.", fx: { '@route': -3 }, lesson: 'herpeople', then: [
            { n: "An uncle asks three follow-up questions about your grades. You did not prepare for follow-up questions." },
          ] },
        ] },
        { hide: '*' },
        { talk: 'familymoney' },

        // 12-5 body jokes at East Coast Park
        { bg: 'beach' },
        { n: "East Coast Park. Cycling, satay, and some boys from your class at the next table, rating girls who walk past." },
        { show: 'ren', e: 'smug', at: 'left' },
        { s: 'ren', e: 'smug', t: "Eh, your girlfriend ah, quite— you know. Rate lah. Out of ten." },
        { choice: "They're waiting for you to join in.", opts: [
          { t: "\"Not cool, man.\" Change the topic.", fx: { trust: 8, self: 8, wisdom: 4 }, lesson: 'bodyjokes', then: [
            { s: 'ren', e: 'neutral', t: "...Okay okay. Relax. Satay?" },
          ] },
          { t: "Make a joke about her body for a laugh.", fx: { trust: -20, self: -10 }, lesson: 'bodyjokes', then: [
            { n: "The laugh lasts four seconds. By Monday one of them has told her. She stops wearing that dress." },
          ] },
          { t: "Laugh awkwardly. Say nothing.", fx: { self: -6 }, lesson: 'bodyjokes', then: [
            { mochi: "To them, silence sounds like yes. One sentence would've done it.", e: 'sad' },
          ] },
        ] },
        { hide: '*' },

        // 12-6 your own "not yet"
        { bg: 'night' },
        { n: "Later that week, walking her home. At the lift lobby she pulls you closer. She wants to go faster than you're ready for." },
        { choice: "You're not ready.", opts: [
          { t: "\"I really like you, and I'm not ready. Can we slow down?\"", fx: { self: 10, trust: 6, wisdom: 4 }, lesson: 'yourno', then: [
            { s: '@route', e: 'shy', at: 'center', t: "Oh! Okay. Yes. Thanks for telling me. ...I thought boys always wanted to." },
            { mochi: "Boys get to say \"not yet\" too. Same weight.", e: 'happy' },
          ] },
          { t: "Go along so you don't look uncool.", fx: { self: -10 }, lesson: 'yourno', then: [
            { mochi: "You went along to protect an image. Next time, protect you.", e: 'sad' },
          ] },
          { t: "Make an excuse. \"My mum is waiting.\"", fx: { self: -3 }, lesson: 'yourno', then: [
            { n: "It works. But next time you'll need another excuse. And another. The truth only needs saying once." },
          ] },
        ] },
        { hide: '*' },
      ], [
        // solo branch
        { show: 'kenta', e: 'happy', at: 'center' },
        { s: 'kenta', e: 'happy', t: "My nenek's 70th birthday kenduri! You're coming. Wear something with a collar. NOT the basketball jersey." },
        { bg: 'dining' },
        { n: "Haziq's grandmother's flat. Twenty relatives, rendang, nasi minyak, and every aunty is looking at you." },
        { choice: "How do you handle Haziq's family?", opts: [
          { t: "Shoes off, salam his nenek properly, ask his cousins stuff, help clear the plates.", fx: { kenta: 10, wisdom: 4 }, lesson: 'herpeople', then: [
            { s: 'kenta', e: 'happy', t: "My nenek says you're \"a good boy\". She has never said that about me." },
          ] },
          { t: "Sit in the corner on your phone.", fx: { kenta: -6 }, lesson: 'herpeople', then: [
            { n: "An aunty asks if you're feeling unwell. Twice." },
          ] },
        ] },
        { hide: '*' },
        { bg: 'bedroom' },
        { phone: "JC1 class chat" },
        { txt: 'ren', t: "[photo] lol look what someone sent me. is this the girl from 1T3??" },
        { phoneOff: true },
        { choice: "A classmate's private photo is going around.", opts: [
          { t: "Don't open it, don't forward it. Tell Ryan to delete it, and tell a teacher.", fx: { wisdom: 8, self: 8 }, lesson: 'imageabuse', then: [
            { txt: 'me', t: "delete it. sharing someone's private photo without consent is a crime, and she's a minor. not funny." },
            { txt: 'ren', t: "...ok. deleted." },
            { resource: 'images' },
          ] },
          { t: "Forward it to the boys' chat.", fx: { wisdom: -20, self: -20 }, lesson: 'imageabuse', then: [
            { badEnd: { title: "BAD END #16 — Screenshot Forever", resource: 'images',
              text: "Forwarding someone's intimate image without consent is abuse and an offence in Singapore at any age, and far more serious when the person is a minor. Every forward multiplies the harm. The only right move: don't open, don't forward, report." } },
          ] },
        ] },
        { bg: 'mall' },
        { think: "Mei's birthday is next week. Huge surprise party? She's told me three times she hates surprises." },
        { choice: "Mei's birthday...", opts: [
          { t: "Ask her what she wants. Do that.", fx: { wisdom: 4 }, lesson: 'prefsmatter', then: [{ show: 'mei', e: 'happy', at: 'center' }, { s: 'mei', e: 'happy', t: "Laksa, a movie, and nobody singing at me? You know me." }] },
          { t: "Surprise party anyway.", fx: { cash: -60 }, lesson: 'prefsmatter', then: [{ show: 'mei', e: 'angry', at: 'center' }, { s: 'mei', e: 'angry', t: "I said NO surprises. Three times. I'm leaving in ten minutes." }] },
        ] },
        { hide: '*' },
        { bg: 'beach' },
        { show: 'ren', e: 'smug', at: 'left' },
        { s: 'ren', e: 'smug', t: "East Coast, bro. Let's rate the girls walking past. Out of ten." },
        { choice: "The boys are waiting.", opts: [
          { t: "\"Not cool, man. Satay?\"", fx: { self: 8, wisdom: 4 }, lesson: 'bodyjokes', then: [{ s: 'kenta', e: 'happy', at: 'right', t: "Satay. Yes. Ryan, shut up." }] },
          { t: "Join in.", fx: { self: -10, wisdom: -6 }, lesson: 'bodyjokes', then: [{ mochi: "People walking in a park. Not a score sheet.", e: 'angry' }] },
        ] },
        { hide: '*' },
        { bg: 'night' },
        { n: "At a classmate's party, a girl you barely know dares you to kiss her while everyone counts down." },
        { choice: "You don't want to.", opts: [
          { t: "\"Nah, I'm good.\" Smile, and mean it.", fx: { self: 10 }, lesson: 'yourno', then: [{ mochi: "Your no counts. Same as anyone's.", e: 'happy' }] },
          { t: "Do it so you don't look uncool.", fx: { self: -8 }, lesson: 'yourno', then: [{ n: "Everyone cheers. You feel weird for the rest of the night." }] },
        ] },
      ]),
      SIM.evening('ch12'),
      { chapterEnd: true },
    ],
  };
})();
