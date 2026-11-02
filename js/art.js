/* sim4love — procedural SVG art: characters (with swappable expressions) + backgrounds.
   Placeholder style until the final art style is chosen (see design/character-sheets.html). */
(function () {
  'use strict';

  const SKIN = '#ffe7d9', SKIN_SHADE = '#f5c9b6', LINE = '#4a2e2a';

  // ---------- cast palette & features ----------
  const CAST = {
    hina: {
      name: 'Hina', full: 'Hina Aoki', color: '#f2a93b',
      hair: '#9a6240', hairShade: '#6e4029', hairHi: '#d9a07a',
      iris: '#c98a3f', irisDark: '#6b3d1c',
      style: 'bob', outfit: 'cardigan',
    },
    rei: {
      name: 'Rei', full: 'Rei Kurosawa', color: '#d4223c',
      hair: '#252036', hairShade: '#120f1d', hairHi: '#6a5f96',
      iris: '#d43a52', irisDark: '#5e0f1f',
      style: 'long', outfit: 'dress',
    },
    mio: {
      name: 'Mio', full: 'Mio Shirakawa', color: '#8f76c4',
      hair: '#bda6e4', hairShade: '#8c72c2', hairHi: '#ece2ff',
      iris: '#7a62c9', irisDark: '#33236e',
      style: 'braid', outfit: 'blazer', glasses: true,
    },
    kaede: {
      name: 'Kaede', full: 'Kaede Tachibana', color: '#2a9d9a',
      hair: '#dfe3ec', hairShade: '#a7aec2', hairHi: '#ffffff',
      iris: '#2fb3ae', irisDark: '#0f4f52',
      style: 'ponytail', outfit: 'track',
    },
    yuna: {
      name: 'Yuna', full: 'Yuna Hoshino', color: '#ff6fae',
      hair: '#ffa3cb', hairShade: '#ea6fa5', hairHi: '#ffe0ee',
      iris: '#e8418d', irisDark: '#7a1446',
      style: 'twintails', outfit: 'hoodie',
    },
  };

  // ---------- expressions: combination of eyes / brows / mouth / extras ----------
  const EXPR = {
    neutral:   { eyes: 'open',  brows: 'normal',  mouth: 'soft' },
    happy:     { eyes: 'smile', brows: 'normal',  mouth: 'grin' },
    blush:     { eyes: 'open',  brows: 'worried', mouth: 'o',     blush: 2 },
    shy:       { eyes: 'side',  brows: 'worried', mouth: 'wavy',  blush: 2 },
    sad:       { eyes: 'teary', brows: 'worried', mouth: 'frown' },
    angry:     { eyes: 'open',  brows: 'angry',   mouth: 'pout',  vein: true },
    surprised: { eyes: 'wide',  brows: 'raised',  mouth: 'o' },
    smug:      { eyes: 'half',  brows: 'raised',  mouth: 'smirk' },
    scheme:    { eyes: 'half',  brows: 'angry',   mouth: 'smirk', glint: true },
    cool:      { eyes: 'half',  brows: 'normal',  mouth: 'flat' },
  };

  let uid = 0;

  function eye(cx, cy, side, c, mode, id) {
    // side: -1 left (viewer), 1 right
    const lashOuter = cx + side * 30;
    if (mode === 'smile') {
      return `<path d="M${cx - 22},${cy + 4} Q${cx},${cy - 20} ${cx + 22},${cy + 4}" fill="none" stroke="${LINE}" stroke-width="6" stroke-linecap="round"/>`;
    }
    if (mode === 'closed') {
      return `<path d="M${cx - 22},${cy} Q${cx},${cy + 14} ${cx + 22},${cy}" fill="none" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>`;
    }
    const ry = mode === 'half' ? 17 : mode === 'wide' ? 30 : 28;
    const top = cy - ry + (mode === 'half' ? 8 : 0);
    const irisR = mode === 'wide' ? 14 : 19;
    const lookX = mode === 'side' ? side * -1 * 0 + 8 : 0; // looking away (to viewer's right)
    const icx = cx + lookX, icy = cy + 3;
    const clip = `ec${id}${side < 0 ? 'l' : 'r'}`;
    let s = `<clipPath id="${clip}"><ellipse cx="${cx}" cy="${cy + (mode === 'half' ? 6 : 0)}" rx="24" ry="${ry}"/></clipPath>`;
    s += `<g class="eye" style="transform-origin:${cx}px ${cy}px">`;
    s += `<ellipse cx="${cx}" cy="${cy + (mode === 'half' ? 6 : 0)}" rx="24" ry="${ry}" fill="#fff"/>`;
    s += `<g clip-path="url(#${clip})">`;
    s += `<ellipse cx="${icx}" cy="${icy}" rx="${irisR}" ry="${irisR + 6}" fill="url(#ig${id})"/>`;
    s += `<ellipse cx="${icx}" cy="${icy + 2}" rx="${irisR * 0.5}" ry="${irisR * 0.7}" fill="${c.irisDark}"/>`;
    s += `<ellipse cx="${icx}" cy="${icy + irisR * 0.75}" rx="${irisR * 0.65}" ry="${irisR * 0.35}" fill="#fff" opacity=".28"/>`;
    s += `<circle cx="${icx - 7}" cy="${icy - 9}" r="${mode === 'wide' ? 4 : 6.5}" fill="#fff"/>`;
    s += `<circle cx="${icx + 7}" cy="${icy + 9}" r="3" fill="#fff" opacity=".9"/>`;
    s += `<rect x="${cx - 30}" y="${top - 6}" width="60" height="10" fill="${c.irisDark}" opacity=".25"/>`;
    s += `</g>`;
    // upper lash
    s += `<path d="M${cx - side * 26},${top + 8} Q${cx},${top - 8} ${lashOuter},${top + 6} L${lashOuter + side * 6},${top + 1} L${lashOuter - side * 1},${top + 12} Q${cx},${top} ${cx - side * 24},${top + 13} Z" fill="${LINE}"/>`;
    // lower lash
    s += `<path d="M${cx - 12},${cy + ry - 1} Q${cx},${cy + ry + 3} ${cx + 12},${cy + ry - 1}" fill="none" stroke="${LINE}" stroke-width="2" stroke-linecap="round" opacity=".6"/>`;
    s += `</g>`;
    if (mode === 'teary') {
      s += `<path d="M${cx + side * 14},${cy + 26} q${side * 4},12 0,16 q${-side * 6},-4 0,-16z" fill="#8fd3ff" opacity=".9"/>`;
    }
    return s;
  }

  function brows(mode, hair) {
    const col = hair;
    const P = {
      normal:  ['M136,198 Q158,188 180,196', 'M220,196 Q242,188 264,198'],
      worried: ['M138,196 Q160,196 180,186', 'M220,186 Q240,196 262,196'],
      angry:   ['M136,186 Q160,192 182,202', 'M218,202 Q240,192 264,186'],
      raised:  ['M136,190 Q158,176 180,186', 'M220,186 Q242,176 264,190'],
    }[mode];
    return P.map(d => `<path d="${d}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`).join('');
  }

  function mouth(mode) {
    const y = 306;
    switch (mode) {
      case 'grin':  return `<path d="M184,${y - 4} Q200,${y - 6} 216,${y - 4} Q214,${y + 18} 200,${y + 18} Q186,${y + 18} 184,${y - 4}Z" fill="#b8434f"/><path d="M190,${y + 10} Q200,${y + 4} 210,${y + 10} Q206,${y + 17} 200,${y + 17} Q194,${y + 17} 190,${y + 10}Z" fill="#ff8f9c"/>`;
      case 'o':     return `<ellipse cx="200" cy="${y + 4}" rx="7" ry="8" fill="#b8434f"/>`;
      case 'frown': return `<path d="M188,${y + 6} Q200,${y - 4} 212,${y + 6}" fill="none" stroke="${LINE}" stroke-width="3.5" stroke-linecap="round"/>`;
      case 'pout':  return `<path d="M190,${y + 4} Q195,${y - 2} 200,${y + 3} Q205,${y - 2} 210,${y + 4}" fill="none" stroke="${LINE}" stroke-width="3.5" stroke-linecap="round"/>`;
      case 'wavy':  return `<path d="M188,${y + 2} q4,-5 8,0 q4,5 8,0 q4,-5 8,0" fill="none" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>`;
      case 'smirk': return `<path d="M188,${y + 2} Q204,${y + 8} 214,${y - 4}" fill="none" stroke="${LINE}" stroke-width="3.5" stroke-linecap="round"/>`;
      case 'flat':  return `<path d="M192,${y + 2} L208,${y + 2}" stroke="${LINE}" stroke-width="3.5" stroke-linecap="round"/>`;
      default:      return `<path d="M190,${y} Q200,${y + 9} 210,${y}" fill="none" stroke="${LINE}" stroke-width="3.5" stroke-linecap="round"/>`;
    }
  }

  // ---------- hair (back & front) per style ----------
  function hairBack(c) {
    const h = c.hair, sh = c.hairShade;
    switch (c.style) {
      case 'bob':
        return `<path d="M98,215 C92,118 150,82 200,82 C250,82 308,118 302,215 L306,318 C300,350 270,352 258,334 L258,290 L142,290 L142,334 C130,352 100,350 94,318 Z" fill="${sh}"/>`;
      case 'long':
        return `<path d="M96,220 C88,108 150,76 200,76 C252,76 312,108 304,220 C312,340 330,470 338,600 L62,600 C70,470 88,340 96,220 Z" fill="${sh}"/>`;
      case 'braid':
        return `<path d="M100,220 C94,116 152,84 200,84 C248,84 306,116 300,220 L300,380 L100,380 Z" fill="${sh}"/>`;
      case 'ponytail':
        return `<path d="M232,108 C300,80 360,140 352,240 C346,320 360,380 334,440 C326,370 300,330 300,270 C300,210 288,150 232,140 Z" fill="${sh}"/>
                <path d="M248,104 C296,92 340,140 334,220 C330,280 340,330 326,380 C318,320 304,290 304,240 C304,180 290,140 248,126 Z" fill="${h}"/>
                <path d="M100,220 C94,118 150,86 200,86 C250,86 306,118 300,220 L298,300 L102,300 Z" fill="${sh}"/>
                <ellipse cx="246" cy="112" rx="14" ry="10" fill="#2a9d9a"/>`;
      case 'twintails': {
        const tail = (x, dir) => `<path d="M${x},150 C${x + dir * 80},150 ${x + dir * 105},250 ${x + dir * 88},350 C${x + dir * 78},410 ${x + dir * 98},460 ${x + dir * 70},500 C${x + dir * 60},450 ${x + dir * 40},420 ${x + dir * 44},360 C${x + dir * 48},290 ${x + dir * 30},220 ${x},200 Z" fill="${h}" stroke="${sh}" stroke-width="3"/>`;
        return tail(108, -1) + tail(292, 1) +
          `<path d="M100,220 C94,118 150,84 200,84 C250,84 306,118 300,220 L298,300 L102,300 Z" fill="${sh}"/>`;
      }
    }
    return '';
  }

  function hairFront(c) {
    const h = c.hair, sh = c.hairShade, hi = c.hairHi;
    const ring = `<path d="M136,138 Q200,108 264,138" fill="none" stroke="${hi}" stroke-width="7" stroke-linecap="round" opacity=".55"/>`;
    switch (c.style) {
      case 'bob':
        return `<path d="M110,222 C102,126 156,94 200,94 C246,94 298,126 290,222 L280,212 Q276,182 262,166 Q258,196 246,206 Q238,170 222,158 Q218,190 202,204 Q194,168 178,160 Q170,192 152,206 Q148,180 138,168 Q124,192 122,214 Z" fill="${h}"/>
                <path d="M114,196 C104,250 110,300 126,334 C134,300 136,250 136,212 Z" fill="${h}"/>
                <path d="M286,196 C296,250 290,300 274,334 C266,300 264,250 264,212 Z" fill="${h}"/>
                ${ring}
                <g transform="translate(250,150) rotate(-20)"><rect x="-16" y="-5" width="32" height="10" rx="5" fill="#ffd34d" stroke="#e0a400" stroke-width="2"/><circle cx="12" cy="0" r="7" fill="#ff8a65"/></g>`;
      case 'long':
        return `<path d="M106,226 C98,120 160,88 206,90 C262,92 304,132 294,226 C288,198 278,178 264,164 C252,188 230,198 204,202 C178,205 152,206 132,212 C120,216 112,220 106,226 Z" fill="${h}"/>
                <path d="M116,200 C100,300 106,430 124,500 C140,430 142,310 142,226 Z" fill="${h}"/>
                <path d="M284,200 C300,300 294,430 276,500 C260,430 258,310 258,226 Z" fill="${h}"/>
                ${ring}`;
      case 'braid': {
        let b = '';
        for (let i = 0; i < 7; i++) {
          const y = 340 + i * 30, x = 262 + i * 3;
          b += `<ellipse cx="${x}" cy="${y}" rx="${20 - i}" ry="19" fill="${i % 2 ? sh : h}" stroke="${sh}" stroke-width="2"/>`;
        }
        b += `<path d="M${262 + 21},${560} l-10,8 l10,22 l10,-22z" fill="${h}"/><circle cx="283" cy="562" r="8" fill="#5b7bd6"/>`;
        return `<path d="M112,216 C104,124 158,96 200,96 C242,96 296,124 288,216 L284,212 Q282,202 270,200 L130,200 Q118,202 116,212 Z" fill="${h}"/>
                <path d="M174,200 L180,186 L186,200 Z M222,200 L228,188 L234,200 Z" fill="${sh}" opacity=".5"/>
                <path d="M114,196 C104,250 108,300 120,330 C132,300 134,250 136,206 Z" fill="${h}"/>
                <path d="M268,200 C290,240 292,300 270,340 L250,340 C262,300 262,240 254,206 Z" fill="${h}"/>
                ${b}${ring}`;
      }
      case 'ponytail':
        return `<path d="M112,222 C102,124 156,94 200,94 C246,94 298,124 290,216 Q280,196 270,186 Q266,206 256,214 Q252,178 232,160 Q226,196 210,214 Q206,240 198,252 Q194,220 186,196 Q172,176 160,170 Q150,196 132,206 Q120,212 112,222 Z" fill="${h}"/>
                <path d="M116,196 C108,240 112,280 120,300 C130,270 134,240 136,210 Z" fill="${h}"/>
                <path d="M284,196 C292,240 288,280 280,300 C270,270 266,240 264,210 Z" fill="${h}"/>
                ${ring}`;
      case 'twintails':
        return `<path d="M110,222 C102,124 156,92 200,92 C246,92 298,124 290,222 Q284,196 270,180 Q266,200 252,208 Q246,180 228,166 Q222,194 204,206 Q196,178 178,166 Q170,196 150,208 Q144,186 132,178 Q118,198 110,222 Z" fill="${h}"/>
                <path d="M196,96 Q186,60 214,52 Q204,72 210,94 Z" fill="${h}"/>
                <circle cx="110" cy="160" r="12" fill="#fff" stroke="${sh}" stroke-width="3"/><circle cx="290" cy="160" r="12" fill="#fff" stroke="${sh}" stroke-width="3"/>
                <path d="M146,130 l6,12 l13,2 l-10,9 l3,13 l-12,-7 l-12,7 l3,-13 l-10,-9 l13,-2z" fill="#ffe066" stroke="#f0b400" stroke-width="2"/>
                ${ring}`;
    }
    return '';
  }

  function outfit(c) {
    const body = (fill) => `<path d="M64,600 C70,470 118,420 172,398 L228,398 C282,420 330,470 336,600 Z" fill="${fill}"/>`;
    switch (c.outfit) {
      case 'cardigan':
        return body('#f6c95b') +
          `<path d="M172,398 L200,470 L228,398 Z" fill="#fff"/>
           <path d="M172,398 L190,430 L200,404 Z M228,398 L210,430 L200,404 Z" fill="#fff" stroke="#e5e5e5" stroke-width="2"/>
           <path d="M200,470 L200,600" stroke="#e0a830" stroke-width="3"/>
           <circle cx="212" cy="500" r="5" fill="#fff"/><circle cx="212" cy="540" r="5" fill="#fff"/>
           <path d="M200,418 l-18,-10 l0,20z M200,418 l18,-10 l0,20z" fill="#e5484d"/><circle cx="200" cy="418" r="5" fill="#c9343a"/>`;
      case 'dress':
        return `<path d="M64,600 C70,470 118,420 172,398 L228,398 C282,420 330,470 336,600 Z" fill="${SKIN}"/>
           <path d="M96,600 C100,520 120,470 140,452 Q170,476 200,462 Q230,476 260,452 C280,470 300,520 304,600 Z" fill="#d4223c"/>
           <path d="M140,452 L150,410 M260,452 L250,410" stroke="#d4223c" stroke-width="5"/>
           <path d="M176,420 Q200,446 224,420" fill="none" stroke="#e8b84a" stroke-width="3"/><circle cx="200" cy="440" r="6" fill="#ffd56a"/>`;
      case 'blazer':
        return body('#2e3a6b') +
          `<path d="M168,398 L200,500 L232,398 Z" fill="#fff"/>
           <path d="M168,398 L150,470 L200,520 Z M232,398 L250,470 L200,520 Z" fill="#3a4a85"/>
           <path d="M200,424 l-20,-12 l0,24z M200,424 l20,-12 l0,24z" fill="#5b7bd6"/><circle cx="200" cy="424" r="5" fill="#3f5fbf"/>
           <circle cx="190" cy="560" r="5" fill="#d9c27a"/>`;
      case 'track':
        return body('#2f7f86') +
          `<path d="M170,392 L230,392 L236,420 L164,420 Z" fill="#2f7f86" stroke="#1f5f64" stroke-width="2"/>
           <path d="M200,420 L200,600" stroke="#cfd8dc" stroke-width="4"/>
           <path d="M110,480 L90,600 M290,480 L310,600" stroke="#fff" stroke-width="8"/>
           <path d="M120,470 L100,600 M280,470 L300,600" stroke="#fff" stroke-width="3"/>`;
      case 'hoodie':
        return body('#fff1f6') +
          `<path d="M150,404 Q200,450 250,404 Q240,430 200,436 Q160,430 150,404Z" fill="#ffc6dc"/>
           <path d="M186,436 L182,490 M214,436 L218,490" stroke="#ff8fbd" stroke-width="3"/>
           <path d="M200,540 c-14,-16 -34,-4 -22,12 l22,18 l22,-18 c12,-16 -8,-28 -22,-12z" fill="#ff6fae"/>`;
    }
    return body('#ccc');
  }

  // Generated artwork manifest (js/sprites.js): SPRITES.chars[key][expr] / SPRITES.bg[scene] -> file path.
  const SP = () => window.SPRITES || { chars: {}, bg: {} };

  function character(key, exprName) {
    const art = SP().chars[key];
    if (art && (art[exprName] || art.neutral)) {
      return `<img class="char-svg" src="${art[exprName] || art.neutral}" alt="${CAST[key].full} (${exprName})" draggable="false">`;
    }
    const c = CAST[key];
    const e = EXPR[exprName] || EXPR.neutral;
    const id = `${key}${++uid}`;
    let s = `<svg class="char-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" aria-label="${c.full} (${exprName})" role="img">`;
    s += `<defs><radialGradient id="ig${id}" cx=".5" cy=".7" r=".8"><stop offset="0" stop-color="${c.iris}"/><stop offset="1" stop-color="${c.irisDark}"/></radialGradient></defs>`;
    s += hairBack(c);
    s += outfit(c);
    // neck
    s += `<path d="M178,318 L178,404 Q200,416 222,404 L222,318 Z" fill="${SKIN}"/><path d="M178,330 Q200,356 222,330 L222,350 Q200,372 178,350Z" fill="${SKIN_SHADE}"/>`;
    // ears + face
    s += `<ellipse cx="120" cy="250" rx="12" ry="20" fill="${SKIN}"/><ellipse cx="280" cy="250" rx="12" ry="20" fill="${SKIN}"/>`;
    if (key === 'rei') s += `<circle cx="120" cy="276" r="6" fill="#ffd56a"/><circle cx="280" cy="276" r="6" fill="#ffd56a"/>`;
    s += `<path d="M118,196 C118,130 282,130 282,196 L280,250 C274,300 232,340 200,342 C168,340 126,300 120,250 Z" fill="${SKIN}"/>`;
    // blush
    const bl = e.blush || 1;
    s += `<ellipse cx="148" cy="288" rx="20" ry="9" fill="#ff8fa3" opacity="${bl > 1 ? .6 : .28}"/><ellipse cx="252" cy="288" rx="20" ry="9" fill="#ff8fa3" opacity="${bl > 1 ? .6 : .28}"/>`;
    if (bl > 1) s += `<path d="M138,284 l6,-8 M148,286 l6,-8 M158,288 l6,-8 M242,288 l6,-8 M252,286 l6,-8 M262,284 l6,-8" stroke="#e8587a" stroke-width="2.5" stroke-linecap="round"/>`;
    // features
    s += `<g class="eyes">${eye(160, 248, -1, c, e.eyes, id)}${eye(240, 248, 1, c, e.eyes, id)}</g>`;
    s += brows(e.brows, c.hairShade);
    s += `<path d="M198,284 Q201,288 204,285" fill="none" stroke="${SKIN_SHADE}" stroke-width="3" stroke-linecap="round"/>`;
    s += mouth(e.mouth);
    s += hairFront(c);
    if (c.glasses) {
      s += `<g fill="rgba(255,255,255,.12)" stroke="#5b4a7a" stroke-width="4"><circle cx="160" cy="250" r="33"/><circle cx="240" cy="250" r="33"/></g><path d="M193,246 Q200,240 207,246" fill="none" stroke="#5b4a7a" stroke-width="4"/><path d="M140,232 l12,-8" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
    }
    if (e.vein) s += `<path d="M262,150 q8,-2 6,8 M278,148 q2,8 -8,8 M266,170 q-2,-8 8,-8 M282,166 q-8,2 -6,-8" stroke="#e5484d" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    if (e.glint) s += `<path d="M300,180 l4,-14 l4,14 l14,4 l-14,4 l-4,14 l-4,-14 l-14,-4z" fill="#fff6a8"/>`;
    s += `</svg>`;
    return s;
  }

  // ---------- backgrounds ----------
  const sakura = (n, seed) => {
    let s = '', r = seed;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < n; i++) s += `<circle cx="${(rnd() * 1600) | 0}" cy="${(rnd() * 500) | 0}" r="${(8 + rnd() * 26) | 0}" fill="${rnd() > .5 ? '#ffc7da' : '#ffb0cb'}" opacity="${(.6 + rnd() * .4).toFixed(2)}"/>`;
    return s;
  };

  const BG = {
    title: `<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9e8"/><stop offset="1" stop-color="#c9b8ff"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#tg)"/>${sakura(40, 7)}
      <path d="M0,760 Q400,680 800,740 T1600,720 L1600,900 L0,900Z" fill="#ffe8f1"/>`,
    bedroom: `<rect width="1600" height="900" fill="#fff4e3"/>
      <rect x="0" y="640" width="1600" height="260" fill="#e8c9a6"/><path d="M0,640 L1600,640" stroke="#d1ad85" stroke-width="8"/>
      <rect x="560" y="110" width="480" height="380" rx="10" fill="#bfe6ff" stroke="#fff" stroke-width="18"/>
      <circle cx="930" cy="200" r="50" fill="#fff6c2"/>
      <path d="M800,110 L800,490 M560,300 L1040,300" stroke="#fff" stroke-width="12"/>
      <path d="M520,90 Q600,300 540,520 L500,520 L500,90Z M1080,90 Q1000,300 1060,520 L1100,520 L1100,90Z" fill="#ffb6c8"/>
      <rect x="1180" y="520" width="380" height="180" rx="30" fill="#fff" /><rect x="1180" y="480" width="380" height="80" rx="30" fill="#a8d8ff"/>
      <rect x="80" y="380" width="260" height="300" rx="12" fill="#c9905e"/><rect x="100" y="400" width="220" height="120" fill="#ffe3b3"/>
      <circle cx="210" cy="350" r="34" fill="#ff8fa3"/>`,
    street: `<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e4f6ff"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#sg)"/>
      <ellipse cx="300" cy="160" rx="130" ry="40" fill="#fff" opacity=".9"/><ellipse cx="1250" cy="120" rx="160" ry="44" fill="#fff" opacity=".9"/>
      <rect x="0" y="560" width="1600" height="340" fill="#cfcfd8"/><rect x="0" y="540" width="1600" height="30" fill="#b9b9c6"/>
      <path d="M0,760 L1600,760" stroke="#fff" stroke-width="10" stroke-dasharray="60 50"/>
      <rect x="180" y="300" width="30" height="270" fill="#8a5a44"/><rect x="1380" y="290" width="30" height="280" fill="#8a5a44"/>
      <g>${sakura(28, 3).replace(/cy="(\d+)"/g, (m, y) => `cy="${(y * 0.5 + 120) | 0}"`)}</g>
      <rect x="560" y="300" width="480" height="250" fill="#ffefe0"/><path d="M540,300 L800,200 L1060,300Z" fill="#e7837e"/>
      <rect x="760" y="420" width="80" height="130" fill="#b07a5a"/>`,
    library: `<rect width="1600" height="900" fill="#f5ead8"/>
      <rect x="0" y="700" width="1600" height="200" fill="#c79b6e"/>
      ${[60, 460, 1080].map(x => `<rect x="${x}" y="80" width="360" height="620" fill="#9b6b45"/>` + [0, 1, 2, 3].map(r => `<rect x="${x + 16}" y="${100 + r * 150}" width="328" height="120" fill="#7b5233"/>` + Array.from({ length: 12 }, (_, i) => `<rect x="${x + 22 + i * 27}" y="${118 + r * 150 + (i % 3) * 6}" width="22" height="${100 - (i % 3) * 6}" fill="${['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8', '#4db6ac'][(i + r) % 6]}"/>`).join('')).join('')).join('')}
      <rect x="840" y="90" width="220" height="300" fill="#cdeeff" stroke="#fff" stroke-width="12"/>
      <rect x="0" y="620" width="1600" height="30" fill="#b07a4f"/>`,
    field: `<defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a76"/><stop offset=".6" stop-color="#ffd3a5"/><stop offset="1" stop-color="#ffe9c9"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#fg)"/><circle cx="1200" cy="420" r="110" fill="#fff1c1" opacity=".9"/>
      <rect x="0" y="520" width="1600" height="380" fill="#d9734f"/>
      <path d="M0,600 Q800,560 1600,600 M0,680 Q800,640 1600,680 M0,770 Q800,730 1600,770" stroke="#fff" stroke-width="6" fill="none" opacity=".8"/>
      <path d="M0,520 L1600,520" stroke="#6fbf73" stroke-width="22"/>
      <rect x="100" y="300" width="400" height="220" fill="#f4e1d2"/><path d="M80,300 L520,300 L480,250 L120,250Z" fill="#6d8fb3"/>`,
    night: `<rect width="1600" height="900" fill="#2b2a4c"/>
      <rect x="0" y="640" width="1600" height="260" fill="#4a3f5c"/>
      <rect x="560" y="110" width="480" height="380" rx="10" fill="#14163a" stroke="#4b4870" stroke-width="18"/>
      <circle cx="930" cy="210" r="56" fill="#fff4c2"/><circle cx="952" cy="196" r="50" fill="#14163a"/>
      ${Array.from({ length: 18 }, (_, i) => `<circle cx="${590 + (i * 137) % 430}" cy="${140 + (i * 71) % 320}" r="${i % 3 + 1.5}" fill="#fff"/>`).join('')}
      <path d="M800,110 L800,490 M560,300 L1040,300" stroke="#4b4870" stroke-width="12"/>
      <rect x="1180" y="520" width="380" height="180" rx="30" fill="#6a6290"/><rect x="1180" y="480" width="380" height="80" rx="30" fill="#5b7bb6"/>
      <circle cx="210" cy="420" r="70" fill="#ffd27a" opacity=".25"/><rect x="190" y="440" width="40" height="200" fill="#6b5a7a"/>`,
    badend: `<rect width="1600" height="900" fill="#1a1020"/>${sakura(30, 11).replace(/#ffc7da|#ffb0cb/g, '#4a2440')}`,
  };

  function background(key) {
    const bg = SP().bg[key];
    if (bg) return `<img src="${bg}" alt="" aria-hidden="true" style="width:100%;height:100%;object-fit:cover;display:block">`;
    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${BG[key] || BG.title}</svg>`;
  }

  window.Art = { CAST, EXPR, character, background };
})();
