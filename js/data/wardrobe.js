/* Scene wardrobe: what everyone wears, by place, time and occasion (docs/CAST_BIBLE.md §3–4).
   A chapter sets it once per scene, right after the bg line:  { bg: 'hawker' }, WEAR('hawker'),
   and can override single people:                            WEAR('out', { kaede: 'track' }).
   `bg` clears outfits (engine), so every scene states its own. Every preset names all 20 people,
   so nobody falls back to a default that is wrong for the place (e.g. a JC uniform at home).
   tests/validate.js checks that every name here resolves to real art in js/sprites.js. */
(() => {
  // Off-duty baseline (Parts I–IV): weekend clothes for the young cast, home clothes for the elders.
  const base = {
    hina: 'casual', mio: 'casual', kaede: 'casual', yuna: 'stream', chloe: 'casual', preet: 'run',
    rei: 'persona', nana: 'weekend', kenta: 'sport', mei: 'casual', mom: 'home', dad: 'weekend',
    ama: 'home', ogawa: 'cafe', farah: 'school', nurse: 'health', joy: 'sunday', takumi: 'casual',
    ren: 'street', saki: 'chalet',
  };
  const jc = { hina: 'uniform', mio: 'uniform', kaede: 'uniform', yuna: 'uniform', preet: 'uniform', kenta: 'uniform', takumi: 'uniform', ren: 'uniform' };
  const home = { yuna: 'home', mei: 'home', mom: 'home', dad: 'home', ama: 'home' };
  // Part V (after A-Levels): nobody is in JC uniform; Mei is interning, Rae is herself.
  const later = { ...base, mei: 'internship', rei: 'herself' };
  const P = {
    school: { ...base, ...jc },                                   // school days, school hours
    track: { ...base, ...jc, kaede: 'track', kenta: 'sport' },    // after CCA at the school field
    out: { ...base },                                             // weekends, outings, after school off campus
    home: { ...base, ...home },                                   // at home, late at night, on the phone
    hawker: { ...base, chloe: 'stall' },                          // Seri Bayu hawker centre: Chloe works the kueh stall
    camp: { ...base, hina: 'cca', mio: 'camp', kaede: 'track', yuna: 'home', preet: 'run', kenta: 'sport', takumi: 'council', farah: 'camp', nurse: 'camp' }, // Ubin camp
    carnival: { ...base, ...jc, hina: 'cca', kaede: 'track', yuna: 'stream', chloe: 'stall', takumi: 'council', kenta: 'sport' }, // JC carnival: CCA booths
    festive: { ...base, ...home, hina: 'festive', mio: 'festive', kaede: 'festive', yuna: 'festive', chloe: 'festive', preet: 'festive', kenta: 'festive', mom: 'festive', ama: 'festive', joy: 'festive' }, // family festivals
    results: { ...base, ...jc, rei: 'herself', dad: 'occasion' }, // results day in the school hall
    later: { ...later },                                          // Part V book-out weekends, outings
    laterHome: { ...later, ...home },                             // Part V at home
    ns: { ...later, kenta: 'ns', ren: 'ns' },                     // Part V in camp
  };
  window.WARDROBE = P;
  window.WEAR = (preset, over) => {
    if (!P[preset]) throw new Error('WEAR: unknown preset ' + preset);
    return { outfit: { ...P[preset], ...(over || {}) }, wear: preset };
  };
})();
