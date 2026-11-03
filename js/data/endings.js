/* Endings (GAME_DESIGN §7). SIM.endingFor picks the main ending in Ch20: Your Life 40 · integrity 35 · trust 25.
   {her} = route heroine. Side and secret endings play in addition to the main one. No ending is a punishment.
   Per-heroine zh text is generated from the same template (see the bilingual authoring notes). */
(function () {
  const E = {};
  const H = {
    hina:  { n: 'Hanis', dream: 'her nursing degree', place: 'the dragon playground at Seri Bayu', thing: 'a photo of a nasi lemak with the egg cut into a heart' },
    mio:   { n: 'Xin Yi', dream: 'her writing programme in Melbourne', place: 'the bookshop on the third floor of the mall', thing: 'a manuscript with your name in the acknowledgements, spelled right this time' },
    kaede: { n: 'Kavya', dream: 'her athletics scholarship', place: 'the track at dawn', thing: 'a race bib from her first college meet, mailed with a sticky note: "you waited, I ran"' },
    yuna:  { n: 'Elise', dream: 'her dance academy in Seoul', place: 'a quiet table at a hawker centre, no camera', thing: 'a photo that was never posted, just printed and kept' },
    chloe: { n: 'Chloe', dream: 'her kiosk', place: 'the corner table at her kiosk after closing', thing: 'the first dollar the kiosk ever made, framed, with "not keeping score" written underneath' },
    preet: { n: 'Preet', dream: 'her social-work placement', place: 'the CC tuition room on Saturday mornings', thing: 'a fractions board game held together with tape, signed by twelve kids' },
  };
  for (const [k, h] of Object.entries(H)) {
    E['true_' + k] = { type: "★ True End", title: "Plain Love",
      text: `A few years after the A-levels. ${h.n} is deep into ${h.dream}. You're deep into {passion}, your course and your own plans. Neither of you shrank to fit the other.\n`
        + `You still meet at ${h.place}. You still argue sometimes, and fix it before it sets. You know her real favourites now, not the ones you guessed.\n`
        + `On your desk: ${h.thing}. On her phone: a budget you made together. It balances.\n`
        + 'Mochi, from the windowsill: "Not fireworks. A fire you both keep lit. The good kind."' };
    E['normal_' + k] = { type: "Normal End", title: "Still Learning",
      text: `${h.n} and you are still together. Most days are good. Some days one of you goes quiet instead of saying the hard thing, or the calendar only has room for one of your lives.\n`
        + 'None of it is a disaster. It\'s all habit, and habits can change.\n'
        + 'Mochi: "You passed, rookie. Not with honours. Keep practising the boring parts. Those ARE the romantic parts."' };
    E['kind_goodbye_' + k] = { type: "Good End", title: "A Kind Goodbye",
      text: `You and ${h.n} ended it in the year that tested everyone. Nobody shouted. Nobody posted anything. You said thank you, and meant it.\n`
        + `A year later she sends a photo from ${h.dream}. You send one back from your own first real step with {passion}. You're both, quietly, better people than the two kids who met in JC1.\n`
        + 'Mochi: "Ending well is still love. You lost a girlfriend, not yourself."' };
  }
  Object.assign(E, {
    own_story: { type: "★ Best End", title: "Your Own Story",
      text: "Your grades got you where you wanted. {passion} turned into something real: a first gig, a first show, a first release. You sleep. You save. You're kind to your family and honest with everyone.\nWhoever you're with, or not with, you're a whole person. People notice that, without you ever trying to impress them.\nMochi: \"The secret all along: love doesn't complete you. You show up complete, and share.\"" },
    side_character: { type: "Lesson End", title: "Side Character in Your Own Life",
      text: "You gave everything to love: your grades, your sleep, your savings, {passion}. Somewhere along the way you became a supporting role in someone else's story, and then not even that.\nNot a punishment. A mirror. Nobody can love someone who isn't there.\nMochi: \"New Game+, rookie. This time, play the main character. Hint: the main character has a life.\"" },
    solo_growth: { type: "Good End", title: "Whole Person",
      text: "No girlfriend at the end of this story, and that's fine. You have friends who'd help you shift house, a passion that pays a little, legs that can run 5K, and a bank account that isn't on fire.\nAt a friend's book launch, someone laughs at the same moment you do. You talk for an hour. You get her number the normal way: by asking.\nMochi: \"Not a consolation prize. A head start.\"" },
    still_searching: { type: "Normal End", title: "Still Searching",
      text: "Alone, and not the good kind of alone yet. Some lessons stuck. Some didn't. You still check her stories sometimes.\nBut you're twenty-one. Nothing is decided. The chess uncles at the void deck have been losing to each other for forty years, and they still show up every evening.\nMochi: \"New Game+ starts now. I'm not giving up on you. Don't you dare give up on you.\"" },
    bro_end: { type: "Comic Good End", title: "Prata Brothers",
      text: "You and Haziq go halves on a stall at the Seri Bayu hawker centre: \"Bro Prata\". The egg prata is excellent. The business plan was written on a tissue.\nIt works, mostly because you both actually turn up, do the books every Sunday, and never lend money to Ryan.\nMochi: \"Platonic love is still love. Also, I want plain prata. Fish curry. Free.\"" },
    slow_start_nana: { type: "Side Ending", title: "A Slow Start",
      text: "Natalie finished her first year of occupational therapy. You still do Saturday coffee. Sometimes pottery. Your bowls are getting less hat-shaped.\nNobody rushed anything. When she goes quiet now, she texts \"need a day\" first, and you wait. When you're unsure, you ask.\nMochi: \"No fireworks. Just two people who keep turning up on Saturdays. That's how the good ones start.\"" },
    rei_friend: { type: "Side Ending", title: "Rae, For Real",
      text: "Rae testified. The \"agency\" is gone, and so is Mr. G. She works at a café now, studies at night, and gives talks to younger students about scam scripts.\nYou're friends. Real ones, with boundaries. She says you were the first person who helped her without trying to buy her." },
    mochi_graduates: { type: "Secret Ending", title: "Mochi Graduates",
      text: "Almost every page of the notebook is filled. Mochi closes it, adjusts her tiny glasses, and passes her Love Guide exam with distinction.\n\"Thank you, rookie. You were my thesis.\" She thinks about it. \"Your mistakes were very educational. Some were also very funny.\"" },
  });
  window.ENDINGS = E;
})();
