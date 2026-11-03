/* Chapter 17 — "Chalet Night". Refusing a drink, stepping in for someone at risk, drink safety, impulse, and chat privacy.
   Legal drinking age in Singapore is 18; plenty of guests don't drink and owe nobody a reason. */
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS.ch17 = {
  id: 'ch17', part: "Part V — On Your Own", title: "Chapter 17", subtitle: "Chalet Night",
  next: "Chapter 18 — The Long Talk", status: 'done',
  script: [
    SIM.gate(),
    { bg: 'partyroom' },
    WEAR('later'),
    { n: "A friend's 19th birthday at a Pasir Ris chalet. BBQ pit, a karaoke machine with one working mic, and coolers full of drinks." },
    { n: "The legal drinking age here is 18. Lots of people here drink. Lots don't, for religious, health or personal reasons, and nobody has to explain why." },
    SIM.split([{ n: "{her} is here too, back for the holidays, deep in conversation with the birthday girl." }],
      [{ n: "Haziq is here, wearing sunglasses at night, which he says is \"the look\"." }]),

    // 17-1 peer pressure
    { s: 'Darren', t: "Eh, new guy. One shot, or you're not one of us. Come!" },
    { choice: "The whole table turns to look.", opts: [
      { t: "\"I'm okay with lime juice.\" Smile. Say it again, calmly, if he pushes.", fx: { self: 10, wisdom: 4 }, lesson: 'peerpressure', ach: 'limeJuice', then: [
        { s: 'Darren', t: "Aiyah, one only..." },
        { me: "Lime juice. I'm good. Thanks though." },
        { n: "He shrugs and moves on. Two other people quietly switch to lime juice too." },
      ] },
      { t: "Drink it to fit in.", fx: { self: -8, health: -4 }, lesson: 'peerpressure', then: [
        { mochi: "You didn't want it, you drank it, and Darren already forgot. Only you remember.", e: 'sad' },
      ] },
      { t: "Pretend to drink, pour it into a plant.", fx: { self: -2 }, lesson: 'peerpressure', then: [
        { mochi: "The plant didn't want a shot either. \"No thanks\" is easier. One time only.", e: 'smug' },
      ] },
    ] },

    // 17-2 bystander
    { hide: '*' },
    { bg: 'beach' },
    WEAR('later'),
    { show: 'saki', e: 'sad', at: 'left' },
    { n: "By the water: Sam Wong, a friend of a friend, very drunk and barely standing. A guy she met tonight has his arm around her." },
    { s: 'Guy', t: "Relax, I'll send her home. My car's right there." },
    { choice: "Sam can't say where she lives.", opts: [
      { t: "Step in. Stay with her, find her friends, get her home with someone she trusts. If she can't be woken, call 995.", fx: { wisdom: 10, self: 8 }, lesson: 'bystander', ach: 'bystander', then: [
        { me: "It's okay, we got her. Sam, I'm going to find Natalie. You stay with us." },
        { show: 'nana', e: 'surprised', at: 'right' },
        { s: 'nana', e: 'surprised', t: "Sam! Okay. Water. Lie her on her side. Thank you so much. Her sister's coming to get her." },
        { n: "The guy wanders off. Sam's sister arrives twenty minutes later. Next day Sam texts: \"I don't remember much. Thank you for staying.\"" },
        { resource: 'alcohol' },
      ] },
      { t: "\"Not my business.\"", fx: { wisdom: -10, self: -6 }, lesson: 'bystander', then: [
        { mochi: "Too drunk to say her address means too drunk to agree to go anywhere. You don't need to be a hero. Just stay, and find her friends.", e: 'angry' },
        { resource: 'alcohol' },
      ] },
      { t: "Ask him \"you sure ah?\" and walk away.", fx: { wisdom: -4 }, lesson: 'bystander', then: [
        { mochi: "One question, then gone. That's not help, that's an alibi. Stay. Get her friends.", e: 'sad' },
        { resource: 'alcohol' },
      ] },
    ] },
    { hide: '*' },

    // 17-3 drink safety
    { bg: 'partyroom' },
    WEAR('later'),
    { n: "Back inside. You left your drink on the BBQ table for ten minutes while you were outside." },
    { choice: "Your cup is still there. Probably yours.", opts: [
      { t: "Pour it away and get a new one.", fx: { health: 4, wisdom: 6 }, lesson: 'drinksafety', then: [
        { mochi: "Unwatched drinks can get spiked. Any party, anyone. New cup is free.", e: 'doctor' },
      ] },
      { t: "Drink it anyway.", fx: { wisdom: -4 }, lesson: 'drinksafety', then: [
        { mochi: "\"Probably fine\" is a terrible safety plan.", e: 'sad' },
      ] },
    ] },

    // 17-4 impulse
    { show: 'nana', e: 'neutral', at: 'center' },
    { s: 'nana', e: 'neutral', t: "You were really good with Sam just now. Want to skip the rest of this and go somewhere quieter?" },
    { think: "I met her three hours ago. I feel the pull anyway." },
    { judge: { who: 'nana', id: 'nana.forward', verdict: 'unfair' } },
    SIM.split([
      { choice: "You're with {her}. She's twenty metres away.", opts: [
        { t: "\"That's nice of you. But I'm with someone. Let's go get Sam some water.\"", fx: { trust: 6, self: 8 }, lesson: 'impulse', then: [
          { s: 'nana', e: 'neutral', t: "Fair. Lucky her. Water it is." },
        ] },
        { t: "Go with her. Figure it out later.", fx: { trust: -20, self: -10, wisdom: -8 }, lesson: 'impulse', then: [
          { mochi: "\"Later\" is going to be a very long talk.", e: 'angry' },
        ] },
      ] },
    ], [
      { choice: "You like her. You also met her three hours ago.", opts: [
        { t: "\"I'd like to get to know you. Coffee on Saturday?\"", fx: { self: 8, wisdom: 6, 'aff.nana': 6, 'trust.nana': 10 }, lesson: 'impulse', sig: 2, clarity: 2, then: [
          { s: 'nana', e: 'surprised', t: "...Okay, that's weirdly charming. Saturday. You're paying." },
          { flag: 'nanaCoffee' },
          { n: "Saturday. Coffee turns into two hours. She asks more questions than she answers, and listens to every reply." },
          { reveal: { nana: ['gentleness', 'sensitivity'] }, why: "Coffee on Saturday: she listened to every answer." },
          { flaw: { nana: { 'says-yes-fast': 'seen' } }, why: "She said yes before you'd finished asking." },
          { contact: 'nana' },
          { mochi: "Her asking was fine. What did YOU want, clear-headed? Good answer.", e: 'happy' },
        ] },
        { t: "Go on impulse: no talk, no plan, no protection.", fx: { self: -8, wisdom: -10, health: -4 }, lesson: 'impulse', then: [
          { mochi: "Not evil. Just no talk and no protection, which is how people get hurt. Sober, together, prepared.", e: 'doctor' },
        ] },
        { t: "Go along because Haziq and the rest are cheering.", fx: { self: -8 }, lesson: 'impulse', then: [
          { mochi: "A cheering crowd isn't consent. It isn't your opinion either.", e: 'sad' },
        ] },
      ] },
    ]),
    { hide: '*' },

    // 17-5 chat privacy
    { bg: 'cafe' },
    WEAR('later'),
    { n: "Next morning, kaya toast and kopi. The group chat is passing round photos of a guy passed out on the chalet sofa, with drawings on his face." },
    { choice: "Forty people are typing \"HAHAHA\".", opts: [
      { t: "Don't forward. Ask people to delete. Message him to check he's okay.", fx: { wisdom: 8, self: 4 }, lesson: 'chatprivacy', then: [
        { n: "A few replies trickle in: \"ok fair. deleted. sorry.\"" },
        { n: "He replies at noon: \"thanks bro. head is dying. who drew on me.\" Nobody admits it." },
      ] },
      { t: "Forward it with a laughing emoji.", fx: { wisdom: -8 }, lesson: 'chatprivacy', then: [
        { mochi: "He was unconscious. He didn't sign up to be a meme.", e: 'angry' },
      ] },
    ] },

    // lending talk
    { s: 'ren', t: "Morning everyone. So, uh, quick one: anyone can spot me $200 till Friday?" },
    { talk: 'lending' },
    { mochi: "Adult isn't \"can drink\". It's \"can say no to a whole room\".", e: 'happy' },
    SIM.evening('ch17'),
    { chapterEnd: true },
  ],
};
