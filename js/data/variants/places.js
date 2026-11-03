/* Variant pools for reused places and the free-evening beats. Same place, different lines per visit.
   Every pool ends with a generic entry (no who / ch / when) so a pick always exists. */
window.VARIANTS = window.VARIANTS || {};
(function (V) {
  const m = (t, e) => ({ mochi: t, e: e || 'neutral' });
  const n = (t) => ({ n: t });
  const R = (e, t) => ({ s: '@route', e, t });
  const add = (pool, entries) => { V[pool] = entries.map((x, i) => Object.assign({ id: `${pool}.${i}` }, x)); };

  // ---------- free evenings ----------
  add('evening.goal', [
    { ch: [1, 8], lines: [n('Two hours of maths tutorial. The phone buzzes twice in the other room. It survives without you.'), m('Look at you. Studying like a person with a future.', 'happy')] },
    { ch: [9, 15], lines: [n('Past-year papers, a highlighter, a cup of Milo. By ten the H2 Chemistry that scared you in March almost makes sense.')] },
    { ch: [16, 20], lines: [n('After lights-out in camp you can\'t study, so on book-out you do the online module for the course you\'ve been eyeing. Slowly. One unit.')] },
    { when: { stats: { goal: '>=70' } }, lines: [n('You finish early and actually understand it. Weird feeling. Good feeling.'), m('That is called competence. It is very attractive. Also, it\'s yours.', 'smug')] },
    { lines: [n('An evening of proper work. Nothing exciting. That\'s the point.')] },
  ]);
  add('evening.passion', [
    { when: (s) => s.flags.passion === 'guitar', lines: [n('The F chord still buzzes. Then, around the fortieth try, it rings.'), m('Nyaa. Even my ears are impressed.', 'happy')] },
    { when: (s) => s.flags.passion === 'drawing', lines: [n('You draw the void deck from memory: the uncle with his bird cage, the chess table, the light at six.')] },
    { when: (s) => s.flags.passion === 'coding', lines: [n('Your little game now has a jump that feels good. Nobody will ever notice. You will.')] },
    { when: (s) => s.flags.passion === 'basketball', lines: [n('The court at Block 412 under the streetlight. Free throws until your arms give up. Seventy percent tonight.')] },
    { when: (s) => s.flags.passion === 'all', lines: [n('Twenty minutes of everything. A bit of guitar, a sketch, a bug fixed, ten free throws. Spread thin, but warm.')] },
    { lines: [n('An hour that belongs to nobody but you.')] },
  ]);
  add('evening.health', [
    { ch: [1, 8], lines: [n('The park connector at dusk. Aunties power-walking, a cat on a bench judging you. Dinner, shower, bed by eleven.')] },
    { ch: [9, 15], lines: [n('A slow 5K along the canal. Mum\'s fish soup. Eight hours of sleep, which feels illegal in JC2.')] },
    { ch: [16, 20], lines: [n('Book-out run along East Coast. Your IPPT time thanks you. So does your mood.')] },
    { when: { stats: { health: '<=30' } }, lines: [n('You go to bed at ten and sleep eleven hours. Your body was clearly owed this.'), m('Rest is not laziness, rookie. It\'s maintenance.', 'neutral')] },
    { lines: [n('A walk, a real dinner, an early night. Boring. Excellent.')] },
  ]);
  add('evening.friends', [
    { ch: [1, 8], lines: [{ s: 'kenta', e: 'happy', t: 'Bro. Milo dinosaur. My treat. Don\'t get used to it.' }, n('You talk about nothing for two hours. It is the best two hours of the week.')] },
    { ch: [9, 15], lines: [{ s: 'kenta', e: 'neutral', t: 'You know you\'re the only one I can say stupid stuff to, right?' }, { s: 'kenta', e: 'happy', t: 'Don\'t make it weird. Pass the chilli.' }] },
    { ch: [16, 20], lines: [{ s: 'kenta', e: 'neutral', t: 'Book-out supper at the prata shop is a constitutional right.' }, n('He tells you about his unit, his mum, his girlfriend Aisha. You realise you missed him.')] },
    { lines: [{ s: 'kenta', e: 'happy', t: 'Bro! Kopi?' }, n('Kopi it is.')] },
  ]);
  add('evening.partner', [
    { who: 'hina', lines: [R('happy', 'You called! ...I mean. Obviously you called. Tell me about your day. All of it.')] },
    { who: 'mio', lines: [R('shy', 'I wrote two pages today. Can I read you one sentence? Just one.')] },
    { who: 'kaede', lines: [R('cool', 'Time trial tomorrow. Talk to me about anything except running.')] },
    { who: 'yuna', lines: [R('happy', 'No camera, no filter, just you and my face mask. Romantic, right?')] },
    { lines: [R('happy', 'Hey. I was hoping you\'d call.')] },
  ]);
  add('evening.partnerAgain', [
    { lines: [R('neutral', 'Again? Not that I mind, but... didn\'t you have that thing to finish?'), m('She is not wrong. Love that eats your whole calendar stops being fun for both of you.', 'neutral')] },
    { when: { stats: { goal: '<=30' } }, lines: [R('sad', 'Honestly? I like talking to you. I also want you to pass. Go study, okay?')] },
    { lines: [R('neutral', 'Hey. Third call this week. Everything okay?')] },
  ]);

  // ---------- recurring places ----------
  add('hawker.arrive', [
    { ch: [1, 4], lines: [n('Seri Bayu Market & Food Centre. Tissue packets on every empty seat: the national way of saying "taken".')] },
    { ch: [5, 12], lines: [n('The hawker centre at seven. The chicken rice queue is long, the satay smoke is longer.')] },
    { ch: [13, 20], lines: [n('Same hawker centre, same uncle at the drinks stall. He still remembers your order. Kopi peng, less sweet.')] },
    { lines: [n('The hawker centre hums: plates, fans, a radio playing Hokkien oldies.')] },
  ]);
  add('cafe.arrive', [
    { ch: [1, 6], lines: [n('Ong\'s Kopi & Toast. Kaya, butter, the smell of coffee roasted in margarine. Uncle Ong waves a towel at you.')] },
    { ch: [7, 15], lines: [{ s: 'ogawa', e: 'happy', t: 'Ah, my best worker who doesn\'t work here anymore. Sit. Same as usual?' }] },
    { ch: [16, 20], lines: [{ s: 'ogawa', e: 'happy', t: 'Encik NSF! Your hair is very short. Your toast is on the house. Once.' }] },
    { lines: [n('The café smells like toast and old wood.')] },
  ]);
  add('mochi.morning', [
    { ch: [1, 5], lines: [m('Good morning, rookie. Today\'s weather: humid with a chance of bad decisions.', 'smug')] },
    { ch: [6, 12], lines: [m('Rise and shine. I reviewed yesterday. I have notes. Many notes.', 'neutral')] },
    { ch: [13, 20], lines: [m('Morning. You\'ve grown, you know. A little. Don\'t let it go to your head.', 'happy')] },
    { when: { stats: { proj: '>=40' } }, lines: [m('Your Rose Filter is fogging up my screen. Today, look at what people DO, not what you hope.', 'angry')] },
    { lines: [m('New day. Same rule: be honest, be kind, be yourself.', 'happy')] },
  ]);
  add('voiddeck.pass', [
    { ch: [1, 8], lines: [n('The void deck under Block 412. Uncles playing chess, a wedding tent being set up for Saturday.')] },
    { ch: [9, 15], lines: [n('Void deck at night. Someone\'s tingkat waiting by the lift. The chess uncles have moved on to arguing about football.')] },
    { lines: [n('The void deck is cool and quiet.')] },
  ]);
})(window.VARIANTS);
