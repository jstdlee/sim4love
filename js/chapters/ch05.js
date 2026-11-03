/* Chapter 5 — "Ubin Camp". Unfiltered people, fair share, refusing drinks, projection, staying put. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch5 = {
  id: 'ch5', part: "Part II — Behind the Filter", title: "Chapter 5", subtitle: "Ubin Camp",
  next: "Chapter 6 — Carnival Week", status: 'done',
  script: [
    { bg: 'camp' },
    { n: "Pulau Ubin. JC1 adventure camp, three days. No aircon. Fourteen mosquito bites per person, minimum." },
    { s: 'farah', e: 'neutral', at: 'center', t: "Phones in the box. Yes, yours also. You'll survive. Your grandparents survived without Wi-Fi." },
    { hide: '*' },

    // Preet in the kayak
    { if: (s) => !!s.flags.preetMet, then: [
      { bg: 'beach' },
      { show: 'preet', e: 'neutral', at: 'center' },
      { n: "Day two. Kayak pairs. You're with Preet, who has read the safety briefing twice and is now explaining it to you a third time." },
      { s: 'preet', e: 'neutral', t: "Paddle together on \"one\". Lean into the turn, not away. ...Sorry. I lecture when I'm nervous. I can't swim very well." },
      { flaw: { preet: { lectures: 'seen' } }, why: "She lectured because she was scared." },
      { choice: "Preet is gripping the paddle very hard.", opts: [
        { t: "\"Then you steer, I'll count. Deal?\"", fx: { preet: 6 }, sig: 'romance:preet', then: [
          { s: 'preet', e: 'happy', t: "Deal. ...You didn't laugh. Thank you." },
          { contact: 'preet' },
        ] },
        { t: "\"Relax lah, it's just a kayak.\"", fx: { preet: -2 }, then: [
          { s: 'preet', e: 'sad', t: "Right. Just a kayak." },
        ] },
      ] },
      { hide: '*' },
    ] },

    // 5-1 unfiltered Elise
    { bg: 'campsite' },
    { n: "Day two, after the kayak capsize drill. Elise is soaked, no make-up, hair everywhere, laughing so hard she snorts." },
    { show: 'yuna', e: 'happy', at: 'center' },
    { s: 'yuna', e: 'surprised', t: "Don't look at me! I look like a kuih that fell in the drain." },
    { choice: "What do you say?", opts: [
      { t: "\"Honestly? You look the most real you've looked all year. Also you laugh like a goose. It's great.\"", fx: { yuna: 12, wisdom: 6 }, lesson: 'unfiltered', rose: true, then: [
        { s: 'yuna', e: 'blush', t: "A GOOSE?? ...Rude. (She's grinning.) Nobody's ever liked the snort." },
      ] },
      { t: "\"Haha, ya. You look way better on your stories.\"", fx: { yuna: -10, wisdom: -4 }, lesson: 'unfiltered', then: [
        { s: 'yuna', e: 'sad', t: "...Right. Ya. I know." },
      ] },
      { t: "(Say nothing. Politely look away.)", fx: { yuna: -2 }, then: [
        { n: "She sees you look away. She pulls her hood up." },
      ] },
    ] },
    { hide: '*' },

    // 5-2 dinner duty
    { bg: 'campsite_night' },
    { n: "Dinner duty. Your group of six has to cook curry for forty. Hanis is cutting onions, eyes streaming. Marcus is \"supervising\"." },
    { show: 'hina', e: 'neutral', at: 'right' }, { show: 'takumi', e: 'smug', at: 'left' },
    { s: 'takumi', e: 'smug', t: "Bro, girls are better at this lah. Let Hanis handle, we go set up the speaker." },
    { choice: "Marcus wants to skip the cooking...", opts: [
      { t: "\"Onions don't check your IC, bro. Here, you're on potatoes.\" Grab a knife.", fx: { hina: 10, wisdom: 6, self: 4 }, lesson: 'fairshare', then: [
        { s: 'hina', e: 'happy', t: "Finally. Thank you. Marcus, peel. Don't murder it." },
        { s: 'takumi', e: 'sad', t: "This potato hates me." },
      ] },
      { t: "Go set up the speaker with Marcus. Hanis has it.", fx: { hina: -8, wisdom: -5 }, lesson: 'fairshare', then: [
        { n: "Hanis cooks for forty. She eats last, after everyone. Nobody says thank you." },
      ] },
    ] },
    { hide: '*' },

    // talk: goodlife
    { bg: 'campsite_night' },
    { n: "Campfire. Someone's toasting marshmallows on a satay stick. Someone else asks: \"Eh, what's a good life, actually?\"" },
    { talk: 'goodlife' },

    // 5-3 refusal: the bottle
    { bg: 'campsite_night' },
    { n: "After lights out. Behind the bunks, Ryan has a bottle he smuggled in his sleeping bag." },
    { show: 'ren', e: 'smug', at: 'center' },
    { s: 'ren', e: 'smug', t: "Come on. One shot only. Don't be the baby. Everyone's having." },
    { think: "Seventeen. Island. Nearest hospital is a boat ride away." },
    { choice: "Ryan holds out the cup...", opts: [
      { t: "\"Nah, I'm good.\" No excuse, no speech. Go back and play cards.", fx: { wisdom: 8, self: 10, kenta: 3 }, lesson: 'refusal', rose: true, then: [
        { s: 'kenta', e: 'happy', at: 'right', t: "Same. Bro, Uno. Hanis has destroyed me four times already." },
      ] },
      { t: "Take one shot so they stop asking.", fx: { self: -6, health: -4 }, lesson: 'refusal', then: [
        { n: "It tastes like cough syrup on fire. Ryan pours another. \"See? Easy.\" It doesn't stop at one." },
      ] },
      { t: "Drink. Then go \"explore the mangroves\" in the dark with Ryan.", fx: { self: -10, health: -10 }, lesson: 'refusal', then: [
        { n: "You get lost. The torch dies. At 3 AM every instructor on Ubin is out with a flashlight, shouting your name." },
        { badEnd: { title: "BAD END #20 — Search Party of One", resource: 'alcohol',
          text: "\"No thanks\" is a full sentence. Alcohol, darkness, water and no adults around is how people actually get hurt. And under 18, it's also against the law." } },
      ] },
    ] },
    { hide: '*' },

    // 5-4 projection — Xin Yi at the jetty
    { bg: 'field' },
    { n: "Day three, the jetty. Waiting for the bumboat back. Xin Yi is sketching the boats. She looks like a page out of Starlight Postman." },
    { show: 'mio', e: 'neutral', at: 'center' },
    { think: "Quiet, likes books... she must be gentle and fragile and need protecting. Like the heroine." },
    { choice: "What do you do?", opts: [
      { t: "Ask what she's drawing. Listen to what she actually says.", fx: { mio: 10, wisdom: 8, proj: -8 }, lesson: 'projection', rose: true, then: [
        { s: 'mio', e: 'smug', t: "The engine. Bumboat engines are so cool. Most of them are old lorry engines, you know? I want to take one apart." },
        { think: "...Not fragile. Into engines. Way more interesting than the one in my head." },
      ] },
      { t: "Keep the story in your head. Asking would ruin it.", fx: { proj: 10 }, lesson: 'projection', then: [
        { mochi: "You're falling for a character you wrote. The real one is sitting right there.", e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 5-5 stay put
    { bg: 'camp' },
    { n: "Last day. Flying fox. Kavya is at the top of the tower, frozen. Everyone below is yelling \"JUST GO!\"" },
    { choice: "You're next in line, right beside her...", opts: [
      { t: "Stand next to her. \"No rush. Can take the stairs also. I'm staying here either way.\"", fx: { kaede: 12, wisdom: 6 }, lesson: 'stayput', ach: 'stayPut', then: [
        { s: 'kaede', e: 'shy', at: 'center', t: "...Count to three with me?" },
        { n: "On three, she goes. Screams the whole way. At the bottom she's laughing." },
      ] },
      { t: "Yell \"you can do it!!\" with everyone else.", fx: { kaede: -2 }, lesson: 'stayput', then: [
        { n: "She takes the stairs down. Later, quietly: \"The shouting made it worse.\"" },
      ] },
      { t: "Go first to \"show her it's easy\".", fx: { kaede: -4, self: 2 }, lesson: 'stayput', then: [
        { n: "You zoom off. She's still alone at the top." },
      ] },
    ] },
    { hide: '*' },
    { bg: 'bedroom' },
    { n: "Home. You shower for forty minutes. Mosquito bites in places you didn't know you had." },
    { mochi: "Ubin report: zero phones, many mosquitoes, a few real people. You're getting better at seeing them.", e: 'happy' },
    { chapterEnd: true },
  ],
};
