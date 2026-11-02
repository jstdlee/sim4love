/* Chapter 5 — "Ubin Camp". Unfiltered people, fair share, refusing drinks, projection, staying put. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch5 = {
  id: 'ch5', part: 'Part II — Behind the Filter', title: 'Chapter 5', subtitle: 'Ubin Camp',
  next: 'Chapter 6 — Carnival Week', status: 'done',
  script: [
    { bg: 'camp' },
    { n: 'Pulau Ubin. Three days of OBS-style camp. No air-con. Fourteen mosquitoes per person, minimum.' },
    { s: 'goto', e: 'neutral', at: 'center', t: 'Phones in the box. Yes, all of them. You\'ll survive. Your ancestors survived without Wi-Fi.' },
    { hide: '*' },

    // 5-1 unfiltered Elise
    { bg: 'campsite' },
    { n: 'Day two. After the kayak capsize drill. Elise is soaked, no make-up, hair everywhere, laughing so hard she snorts.' },
    { show: 'yuna', e: 'happy', at: 'center' },
    { s: 'yuna', e: 'surprised', t: 'Don\'t look at me! I look like a drowned kuih.' },
    { choice: 'What do you say?', opts: [
      { t: '"Honestly? This is the most real you\'ve looked all year. You laugh like a goose. It\'s great."', fx: { yuna: 12, wisdom: 6 }, lesson: 'unfiltered', rose: true, then: [
        { s: 'yuna', e: 'blush', t: 'A GOOSE?? ...Okay that\'s rude. (She is grinning.) Nobody\'s ever liked the snort.' },
      ] },
      { t: '"Haha, yeah. You look way better on your stories."', fx: { yuna: -10, wisdom: -4 }, lesson: 'unfiltered', then: [
        { s: 'yuna', e: 'sad', t: '...Right. Yeah. I know.' },
      ] },
      { t: '(Say nothing. Look away politely.)', fx: { yuna: -2 }, then: [
        { n: 'She notices you looking away. She puts her hood up.' },
      ] },
    ] },
    { hide: '*' },

    // 5-2 dinner duty
    { bg: 'campsite_night' },
    { n: 'Dinner duty. Your group of six has to cook curry for forty. Hanis is cutting onions. Marcus is "supervising".' },
    { show: 'hina', e: 'neutral', at: 'right' }, { show: 'takumi', e: 'smug', at: 'left' },
    { s: 'takumi', e: 'smug', t: 'Bro, girls are better at this. Let Hanis handle it, we\'ll set up the speakers.' },
    { choice: 'Marcus wants to skip the cooking...', opts: [
      { t: '"Nah. Onions don\'t care about gender. Here, Marcus, you\'re on potatoes." Grab a knife.', fx: { hina: 10, wisdom: 6, self: 4 }, lesson: 'fairshare', then: [
        { s: 'hina', e: 'happy', t: 'Finally. Thank you. Marcus, peel, don\'t massacre.' },
        { s: 'takumi', e: 'sad', t: 'This potato hates me.' },
      ] },
      { t: 'Go set up the speakers with Marcus. Hanis has it.', fx: { hina: -8, wisdom: -5 }, lesson: 'fairshare', then: [
        { n: 'Hanis cooks for forty. She doesn\'t eat until everyone else has. Nobody says thank you.' },
      ] },
    ] },
    { hide: '*' },

    // talk: goodlife
    { bg: 'campsite_night' },
    { n: 'Around the fire. Somebody asks the big question: what\'s a good life, actually?' },
    { talk: 'goodlife' },

    // 5-3 refusal: the bottle
    { bg: 'campsite_night' },
    { n: 'After lights out. Ryan has smuggled in a bottle of something. Behind the bunks.' },
    { show: 'ren', e: 'smug', at: 'center' },
    { s: 'ren', e: 'smug', t: 'Come on. One shot. Don\'t be the kid. Everyone\'s doing it.' },
    { n: 'You\'re seventeen. The legal drinking age in Singapore is 18. You\'re on an island with no hospital.' },
    { choice: 'Ryan holds out the cup...', opts: [
      { t: '"Nah, I\'m good." No excuse, no lecture. Go back to the bunk and play cards.', fx: { wisdom: 8, self: 10, kenta: 3 }, lesson: 'refusal', rose: true, then: [
        { s: 'kenta', e: 'happy', at: 'right', t: 'Same. Bro, Uno. I\'ve been robbed by Hanis four times.' },
      ] },
      { t: 'Take one shot so they stop asking.', fx: { self: -6, health: -4 }, lesson: 'refusal', then: [
        { n: 'It tastes like cough syrup on fire. Ryan pours another. "See? Easy." It does not stop at one.' },
      ] },
      { t: 'Drink. Then go "explore the mangroves" at night with Ryan.', fx: { self: -10, health: -10 }, lesson: 'refusal', then: [
        { n: 'You get lost. Your torch dies. At 3 AM, every instructor on Ubin is out with flashlights, calling your name.' },
        { badEnd: { title: 'BAD END #20 — Search Party of One', resource: 'alcohol',
          text: 'Saying no to a drink is a complete sentence. You don\'t need an excuse. Alcohol plus darkness plus water plus no adult is how people actually get hurt, and under 18 it is also against the law.' } },
      ] },
    ] },
    { hide: '*' },

    // 5-4 projection — Xin Yi at the jetty
    { bg: 'field' },
    { n: 'Day three, the jetty. Xin Yi is sketching the bumboats. She looks like a character from Starlight Postman.' },
    { show: 'mio', e: 'neutral', at: 'center' },
    { think: 'She\'s quiet, she likes books... she must be shy and gentle and need protecting. She\'s basically the heroine.' },
    { choice: 'What do you do?', opts: [
      { t: 'Ask her what she\'s drawing, and listen to what she actually says.', fx: { mio: 10, wisdom: 8, proj: -8 }, lesson: 'projection', rose: true, then: [
        { s: 'mio', e: 'smug', t: 'The engine. Bumboat engines are amazing. Did you know they\'re mostly old truck engines? I want to take one apart.' },
        { think: '...Not shy and gentle. Into engines. Way more interesting than the version in my head.' },
      ] },
      { t: 'Keep the story in your head. Don\'t ruin it by asking.', fx: { proj: 10 }, lesson: 'projection', then: [
        { mochi: 'You\'re falling for a character you wrote. She\'s sitting right there, being a different person. Rose Filter rising.', e: 'sad' },
      ] },
    ] },
    { hide: '*' },

    // 5-5 stay put
    { bg: 'camp' },
    { n: 'Last day. Ziplining. Kavya is at the top of the tower, frozen. Everyone below is yelling "JUST GO!".' },
    { choice: 'You\'re next in line, beside her...', opts: [
      { t: 'Stand next to her. "No rush. We can go down the stairs too. I\'ll stay here either way."', fx: { kaede: 12, wisdom: 6 }, lesson: 'stayput', ach: 'stayPut', then: [
        { s: 'kaede', e: 'shy', at: 'center', t: '...Count to three with me?' },
        { n: 'On three, she goes. She screams the whole way. At the bottom she\'s laughing.' },
      ] },
      { t: 'Shout "you can do it!!" with everyone else.', fx: { kaede: -2 }, lesson: 'stayput', then: [
        { n: 'She goes down the stairs. Later, quietly: "The shouting made it worse."' },
      ] },
      { t: 'Go first to "show her it\'s easy."', fx: { kaede: -4, self: 2 }, lesson: 'stayput', then: [
        { n: 'You zoom off. She\'s still alone at the top.' },
      ] },
    ] },
    { hide: '*' },
    { bg: 'bedroom' },
    { mochi: 'Ubin report: zero phones, many mosquitoes, one or two real people met. You\'re getting better at seeing them.', e: 'happy' },
    { chapterEnd: true },
  ],
};
