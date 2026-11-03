/* sim4love — procedural SVG art: characters (with swappable expressions) + backgrounds.
   Placeholder style until the final art style is chosen (see design/character-sheets.html). */
(function () {
  'use strict';

  let SKIN = '#ffe7d9', SKIN_SHADE = '#f5c9b6';
  const LINE = '#4a2e2a';

  // ---------- cast palette & features ----------
  const CAST = {
    hina: {
      name: 'Hanis', full: 'Nur Hanis', color: '#f2a93b',
      hair: '#4a2c1e', hairShade: '#2e1a12', hairHi: '#8a5a3e',
      iris: '#8a5a2f', irisDark: '#3e2410',
      style: 'bob', outfit: 'cardigan',
    },
    rei: {
      name: 'Rae', full: 'Rae Koh', color: '#d4223c',
      hair: '#252036', hairShade: '#120f1d', hairHi: '#6a5f96',
      iris: '#d43a52', irisDark: '#5e0f1f',
      style: 'long', outfit: 'dress',
    },
    mio: {
      name: 'Xin Yi', full: 'Lim Xin Yi', color: '#8f76c4',
      hair: '#2a2438', hairShade: '#16121f', hairHi: '#6c5f8f',
      iris: '#5a4a3a', irisDark: '#241a12',
      style: 'braid', outfit: 'blazer', glasses: true,
    },
    kaede: {
      name: 'Kavya', full: 'Kavya Pillai', color: '#2a9d9a', skin: '#c98e6a', skinShade: '#a8704e',
      hair: '#1d1512', hairShade: '#0c0806', hairHi: '#5a463c',
      iris: '#4a2e1c', irisDark: '#1c0f06',
      style: 'ponytail', outfit: 'track',
    },
    yuna: {
      name: 'Elise', full: 'Elise de Souza', color: '#ff6fae', skin: '#f0cdb2',
      hair: '#7a4a32', hairShade: '#563220', hairHi: '#c48a66',
      iris: '#6a8a3a', irisDark: '#2a3a12',
      style: 'twintails', outfit: 'hoodie',
    },
    kenta: { name: 'Haziq', full: 'Muhammad Haziq bin Ismail', color: '#e5874a', skin: '#e2b48e', skinShade: '#c79470',
      hair: '#1e1612', hairShade: '#0e0a08', hairHi: '#4e3e34', iris: '#4a3020', irisDark: '#1e120a', style: 'short', outfit: 'jersey', male: true },
    ogawa: { name: 'Uncle Ong', full: 'Mr. Ong Boon Huat', color: '#b98a4e', hair: '#d8d8d8', hairShade: '#a8a8a8', hairHi: '#ffffff',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'short', outfit: 'apron', male: true, old: true },
    goto: { name: 'Mr. G', full: 'Mr. Gopal', color: '#7c8bd6', skin: '#b57d5c', skinShade: '#94603f', hair: '#2a2a2a', hairShade: '#121212', hairHi: '#666',
      iris: '#2a1a10', irisDark: '#0c0604', style: 'short', outfit: 'shirt', male: true, glasses: true },
    mei: { name: 'Mei', full: 'Mei (your sister)', color: '#e07a8e', hair: '#1c1a24', hairShade: '#0c0b12', hairHi: '#55506a',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'bun', outfit: 'blouse' },
    dad: { name: 'Dad', full: 'Dad', color: '#8aa0b8', hair: '#3a3a3a', hairShade: '#1e1e1e', hairHi: '#888', iris: '#3a2a1a', irisDark: '#140c06', style: 'short', outfit: 'polo', male: true, old: true },
    mom: { name: 'Mum', full: 'Mum', color: '#d69aa8', hair: '#2a2228', hairShade: '#140f12', hairHi: '#6a5a62', iris: '#3a2a1a', irisDark: '#140c06', style: 'bun', outfit: 'blouse' },
    farah: { name: 'Ms. Farah', full: 'Ms. Farah Aziz', color: '#5aa58a', skin: '#e9be98', skinShade: '#cc9c76', hair: '#3a6a5a', hairShade: '#28503f', hairHi: '#7ab09a',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'tudung', outfit: 'blouse', glasses: true },
    joy: { name: 'Joy', full: 'Joy Santos', color: '#f0b85a', skin: '#d9a77e', skinShade: '#ba875e', hair: '#1a1410', hairShade: '#0a0806', hairHi: '#4a3e34',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'bun', outfit: 'scrubs' },
    nurse: { name: 'Nurse Tan', full: 'Nurse Tan', color: '#6ab0d8', hair: '#1c1a24', hairShade: '#0c0b12', hairHi: '#55506a', iris: '#3a2a1a', irisDark: '#140c06', style: 'bun', outfit: 'scrubs' },
    takumi: { name: 'Marcus', full: 'Marcus Tan', color: '#5b7bd6', hair: '#141218', hairShade: '#050407', hairHi: '#4a4658', iris: '#2a1a10', irisDark: '#0c0604', style: 'short', outfit: 'suit', male: true },
    ren: { name: 'Ryan', full: 'Ryan Teo', color: '#d6a84e', hair: '#5a3a22', hairShade: '#3a2414', hairHi: '#9a7050', iris: '#2a1a10', irisDark: '#0c0604', style: 'short', outfit: 'jersey', male: true },
    ava: { name: 'Ava', full: 'Ava Mitchell', color: '#3fb7a0', skin: '#fbe3d2', skinShade: '#eec3aa', hair: '#d9a95a', hairShade: '#b5863c', hairHi: '#f2d08a',
      iris: '#3f8a4f', irisDark: '#1c4a26', style: 'ponytail', outfit: 'hoodie' },
    ines: { name: 'Inès', full: 'Inès Diallo', color: '#d39b2a', skin: '#6b4230', skinShade: '#55321f', hair: '#120c0a', hairShade: '#050302', hairHi: '#3a2a22',
      iris: '#2a1a10', irisDark: '#0c0604', style: 'bun', outfit: 'blazer' },
    mateo: { name: 'Mateo', full: 'Mateo Tan Rojas', color: '#f0c419', skin: '#d8a57c', skinShade: '#bb875f', hair: '#231810', hairShade: '#0e0906', hairHi: '#5a4232',
      iris: '#3a2214', irisDark: '#140a04', style: 'short', outfit: 'jersey', male: true },
    ollie: { name: 'Ollie', full: 'Ollie Bennett', color: '#5d7fa8', skin: '#f6d9c8', skinShade: '#e5b9a2', hair: '#9a7a52', hairShade: '#76593a', hairHi: '#c8a87a',
      iris: '#5a6a7a', irisDark: '#2a3440', style: 'short', outfit: 'shirt', male: true },
    saki: { name: 'Sam', full: 'Sam de Vries', color: '#8ac46a', hair: '#1a1820', hairShade: '#08070c', hairHi: '#4a4658', iris: '#2a1a10', irisDark: '#0c0604', style: 'short', outfit: 'uniform' },
    nana: { name: 'Natalie', full: 'Natalie Rodrigues', color: '#c46aa8', skin: '#c99272', skinShade: '#a87254', hair: '#2a1a14', hairShade: '#140c08', hairHi: '#6a4a3a',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'long', outfit: 'blouse' },
    chloe: { name: 'Chloe', full: 'Chloe Goh', color: '#5fae6e', skin: '#f3d2b5', skinShade: '#ddb293', hair: '#17141a', hairShade: '#08070a', hairHi: '#4a4452',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'bun', outfit: 'hoodie' },
    preet: { name: 'Preet', full: 'Harpreet Kaur', color: '#3557b7', skin: '#b9805a', skinShade: '#99623f', hair: '#16100c', hairShade: '#080504', hairHi: '#4a3a30',
      iris: '#3a2214', irisDark: '#140a04', style: 'braid', outfit: 'blazer' },
    ama: { name: 'Ah Ma', full: 'Mdm. Lee Ah Lian', color: '#7fae9a', skin: '#f1d6c0', skinShade: '#d9b89e', hair: '#d6d2d0', hairShade: '#aaa5a2', hairHi: '#f4f2f0',
      iris: '#3a2a1a', irisDark: '#140c06', style: 'short', outfit: 'blouse', old: true, glasses: true },
    kai: { name: 'Alpha Kai', full: 'Alpha Kai (influencer)', color: '#c9a227', hair: '#e8c45a', hairShade: '#b8942a', hairHi: '#fff0b0', iris: '#2a1a10', irisDark: '#0c0604', style: 'short', outfit: 'suit', male: true, glint: true },
    aileen: { name: '"Aileen"', full: '"Aileen" (unknown account)', color: '#9a8aa8', hair: '#2a2228', hairShade: '#140f12', hairHi: '#6a5a62', iris: '#3a2a1a', irisDark: '#140c06', style: 'long', outfit: 'blouse' },
  };
  // Sprite framing tweaks (css: .char[data-frame]); Elise's art sits high in its canvas.
  const FRAMING = { yuna: 'low' };
  // Expression fallback chains: when an expression has no sprite, use the closest one that exists.
  const CHAINS = {
    blush: ['shy', 'happy'], shy: ['blush', 'sad'], sad: ['shy'], angry: ['cool', 'sad'], surprised: ['blush', 'happy'],
    smug: ['happy', 'cool'], scheme: ['smug', 'cool'], cool: ['smug'], happy: ['smug', 'blush'],
  };
  function fallbackExpr(key, e) {
    const art = (window.SPRITES || { chars: {} }).chars[key];
    if (!art) return EXPR[e] ? e : 'neutral';
    if (art[e]) return e;
    for (const alt of CHAINS[e] || []) if (art[alt]) return alt;
    return 'neutral';
  }

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
    // upper lash (a simple lid line for the male cast)
    if (c.male) s += `<path d="M${cx - 26},${top + 8} Q${cx},${top - 4} ${cx + 26},${top + 8}" fill="none" stroke="${LINE}" stroke-width="5" stroke-linecap="round"/>`;
    else s += `<path d="M${cx - side * 26},${top + 8} Q${cx},${top - 8} ${lashOuter},${top + 6} L${lashOuter + side * 6},${top + 1} L${lashOuter - side * 1},${top + 12} Q${cx},${top} ${cx - side * 24},${top + 13} Z" fill="${LINE}"/>`;
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
      case 'short': return `<path d="M112,210 C106,120 156,90 200,90 C246,90 296,120 288,210 L282,236 L118,236 Z" fill="${sh}"/>`;
      case 'bun': return `<circle cx="200" cy="86" r="40" fill="${sh}"/><path d="M104,226 C96,120 150,90 200,90 C250,90 304,120 296,226 L290,280 L110,280 Z" fill="${sh}"/>`;
      case 'tudung': return `<path d="M92,250 C84,110 150,74 200,74 C250,74 316,110 308,250 C318,330 330,380 350,440 L50,440 C70,380 82,330 92,250 Z" fill="${sh}"/>`;
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
      case 'short':
        return `<path d="M114,214 C104,124 156,96 200,96 C246,96 298,124 288,214 Q282,180 266,164 Q252,182 230,170 Q214,186 192,172 Q170,188 150,170 Q130,180 122,200 Z" fill="${h}"/>${ring}`;
      case 'bun':
        return `<circle cx="200" cy="84" r="34" fill="${h}"/><path d="M112,222 C104,126 156,96 200,96 C246,96 298,126 290,222 Q284,170 250,150 Q220,170 200,150 Q178,170 150,150 Q118,170 112,222 Z" fill="${h}"/>${ring}`;
      case 'tudung':
        return `<path d="M108,250 C100,130 154,96 200,96 C246,96 300,130 292,250 L288,250 C286,180 250,150 200,150 C150,150 114,180 112,250 Z" fill="${h}"/>
                <path d="M112,250 C116,320 150,352 200,356 C250,352 284,320 288,250 L300,300 C306,360 300,400 250,420 L150,420 C100,400 94,360 100,300 Z" fill="${h}"/>
                <path d="M126,170 Q200,130 274,170" fill="none" stroke="${hi}" stroke-width="5" opacity=".5"/>`;
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
    const collar = (fill, acc) => body(fill) + `<path d="M172,398 L200,436 L228,398 Z" fill="${acc || '#fff'}"/>`;
    switch (c.outfit) {
      case 'jersey': return body('#e5874a') + `<path d="M170,398 Q200,430 230,398" fill="none" stroke="#fff" stroke-width="8"/><text x="200" y="540" font-size="80" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700">7</text>`;
      case 'apron': return body('#f2efe6') + `<path d="M130,600 L140,450 L260,450 L270,600 Z" fill="#6b4a32"/><path d="M140,450 L170,398 M260,450 L230,398" stroke="#6b4a32" stroke-width="8"/>`;
      case 'shirt': return collar('#cfe0f2') + `<path d="M200,420 L190,440 L200,530 L210,440 Z" fill="#3a4a85"/>`;
      case 'polo': return collar('#7a9ab8', '#5a7a98');
      case 'blouse': return collar(c.color, '#fff8f0');
      case 'scrubs': return body('#7ab8d6') + `<path d="M170,398 L200,450 L230,398" fill="none" stroke="#5a98b6" stroke-width="6"/>`;
      case 'suit': return collar('#2a2a34', '#fff') + `<path d="M200,420 L192,436 L200,540 L208,436 Z" fill="${c.color}"/>`;
      case 'uniform': return body('#5a6a3a') + `<path d="M172,398 L200,432 L228,398" fill="none" stroke="#3a4a22" stroke-width="6"/><rect x="230" y="470" width="50" height="14" fill="#2a3a1a"/>`;
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

  /* Sprite lookup with outfits (docs/CAST_BIBLE.md §6): outfit+expr -> outfit neutral -> default+expr (expression
     chain) -> default neutral -> SVG. An outfit set may be SPRITES.chars[key].outfits[outfit][expr] or a flat
     SPRITES.chars[key]['outfit:expr'] key; until the art exists every outfit request quietly uses the default set. */
  function spriteFor(key, exprName, outfitId) {
    const art = SP().chars[key];
    if (!art) return null;
    if (outfitId) {
      const set = (art.outfits || {})[outfitId] || {};
      const hit = set[exprName] || art[`${outfitId}:${exprName}`] || set.neutral || art[`${outfitId}:neutral`];
      if (hit) return hit;
    }
    if (!art.neutral) return null;
    return art[fallbackExpr(key, exprName)] || art.neutral;
  }
  function character(key, exprName, label, outfitId) {
    const c = CAST[key] || CAST.kenta;
    const alt = label || c.full || c.name || key;
    const src = spriteFor(key, exprName, outfitId);
    if (src) return `<img class="char-svg" src="${src}" alt="${alt}" draggable="false">`;
    SKIN = c.skin || '#ffe7d9'; SKIN_SHADE = c.skinShade || '#f5c9b6';
    const e = EXPR[exprName] || EXPR.neutral;
    const id = `${key}${++uid}`;
    let s = `<svg class="char-svg" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" aria-label="${alt}" role="img">`;
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
    if (c.old) s += `<path d="M150,214 q10,-4 20,0 M230,214 q10,-4 20,0 M170,324 q30,10 60,0" fill="none" stroke="${SKIN_SHADE}" stroke-width="3" stroke-linecap="round"/>`;
    if (c.glasses) {
      s += `<g fill="rgba(255,255,255,.12)" stroke="#5b4a7a" stroke-width="4"><circle cx="160" cy="250" r="33"/><circle cx="240" cy="250" r="33"/></g><path d="M193,246 Q200,240 207,246" fill="none" stroke="#5b4a7a" stroke-width="4"/><path d="M140,232 l12,-8" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/>`;
    }
    if (e.vein) s += `<path d="M262,150 q8,-2 6,8 M278,148 q2,8 -8,8 M266,170 q-2,-8 8,-8 M282,166 q-8,2 -6,-8" stroke="#e5484d" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    if (e.glint || c.glint) s += `<path d="M300,180 l4,-14 l4,14 l14,4 l-14,4 l-4,14 l-4,-14 l-14,-4z" fill="#fff6a8"/>`;
    s += `</svg>`;
    return s;
  }

  // ---------- backgrounds ----------
  // Frangipani: cream five-petal flowers with a yellow heart (Singapore's school-yard tree).
  const sakura = (n, seed) => {
    let s = '', r = seed;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < n; i++) {
      const x = (rnd() * 1600) | 0, y = (rnd() * 500) | 0, k = 0.4 + rnd() * 0.9, rot = (rnd() * 72) | 0;
      s += `<g transform="translate(${x},${y}) rotate(${rot}) scale(${k.toFixed(2)})" opacity="${(.7 + rnd() * .3).toFixed(2)}">` +
        [0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-14" rx="9" ry="16" transform="rotate(${a})" fill="#fff8ea"/>`).join('') +
        `<circle r="7" fill="#ffd04d"/></g>`;
    }
    return s;
  };
  const sky = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1600" height="900" fill="url(#${id})"/>`;
  const hdb = (x, w, h, col) => `<rect x="${x}" y="${900 - h - 260}" width="${w}" height="${h}" fill="${col}"/>` +
    Array.from({ length: Math.floor(h / 50) }, (_, r) => Array.from({ length: Math.floor(w / 40) }, (_, c2) => `<rect x="${x + 10 + c2 * 40}" y="${900 - h - 250 + r * 50}" width="22" height="26" fill="${(r + c2) % 4 ? '#e8eef6' : '#ffe8a8'}" opacity=".85"/>`).join('')).join('');

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
      <g>${sakura(28, 3).replace(/translate\((\d+),(\d+)\)/g, (m, x, y) => `translate(${x},${(y * 0.5 + 120) | 0})`)}</g>
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
    hawker: `${sky('hk', '#ffcf8a', '#ffe9c6')}<rect y="120" width="1600" height="40" fill="#b55a3a"/>
      <rect y="160" width="1600" height="420" fill="#f2e2c4"/>${[0, 1, 2, 3].map(i => `<rect x="${60 + i * 390}" y="210" width="330" height="250" fill="#fff" stroke="#c98a5a" stroke-width="6"/><rect x="${60 + i * 390}" y="210" width="330" height="56" fill="${['#e5484d', '#2a9d9a', '#f2a93b', '#5b7bd6'][i]}"/><text x="${225 + i * 390}" y="250" font-size="30" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700">${['NASI LEMAK', 'CHICKEN RICE', 'KOPI · TEH', 'MEE POK'][i]}</text>`).join('')}
      <rect y="580" width="1600" height="320" fill="#d6c6a8"/>${[200, 700, 1200].map(x => `<ellipse cx="${x}" cy="700" rx="170" ry="40" fill="#e8e0d0"/><rect x="${x - 8}" y="700" width="16" height="140" fill="#9a8a7a"/>`).join('')}`,
    cafe: `<rect width="1600" height="900" fill="#3b2a22"/><rect y="0" width="1600" height="560" fill="#5a4030"/>
      ${[0, 1, 2].map(i => `<rect x="${120 + i * 480}" y="120" width="360" height="260" fill="#ffe9b8" opacity=".9"/><path d="M${120 + i * 480},250 H${480 + i * 480} M${300 + i * 480},120 V380" stroke="#5a4030" stroke-width="8"/>`).join('')}
      <rect y="560" width="1600" height="60" fill="#8a5a3a"/><rect y="620" width="1600" height="280" fill="#2e1f18"/>
      <circle cx="400" cy="70" r="26" fill="#ffd27a"/><circle cx="1200" cy="70" r="26" fill="#ffd27a"/>
      <text x="800" y="90" font-size="44" text-anchor="middle" fill="#ffd27a" font-family="serif">ONG'S KOPI &amp; TOAST</text>`,
    beach: `${sky('bc', '#6fc6ff', '#dff4ff')}<circle cx="1300" cy="160" r="70" fill="#fff6c2"/>
      <rect y="470" width="1600" height="160" fill="#3aa6c8"/><path d="M0,520 Q400,500 800,520 T1600,520" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/>
      <path d="M0,620 Q800,580 1600,620 L1600,900 L0,900Z" fill="#f4dca8"/>
      <path d="M180,640 C170,500 200,380 240,300" stroke="#8a5a3a" stroke-width="22" fill="none"/>${[0, 60, 120, 180, 240, 300].map(a => `<path d="M240,300 q70,-20 120,40" transform="rotate(${a} 240 300)" stroke="#3a8a4a" stroke-width="16" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M900,130 L1600,60" stroke="#666" stroke-width="3"/><rect x="1100" y="96" width="60" height="50" rx="10" fill="#e5484d"/>`,
    mall: `<rect width="1600" height="900" fill="#f4f0ec"/>${[0, 1, 2].map(r => `<rect y="${80 + r * 200}" width="1600" height="16" fill="#d8d0c8"/>`).join('')}
      ${[0, 1, 2, 3].map(i => `<rect x="${60 + i * 390}" y="300" width="330" height="290" fill="#fff" stroke="#c9a45c" stroke-width="4"/><rect x="${100 + i * 390}" y="380" width="250" height="160" fill="${['#ffe0e8', '#e0f0ff', '#fff4d0', '#e8ffe8'][i]}"/>`).join('')}
      <rect y="600" width="1600" height="300" fill="#e0d8d0"/><path d="M0,750 L1600,750" stroke="#fff" stroke-width="4"/>`,
    mrt: `<rect width="1600" height="900" fill="#d8dee6"/><rect y="120" width="1600" height="420" fill="#f4f6f8"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${40 + i * 320}" y="200" width="220" height="200" rx="16" fill="#9ab6d0"/>`).join('')}
      <rect y="120" width="1600" height="30" fill="#e5484d"/><rect y="540" width="1600" height="30" fill="#ffd04d"/><rect y="570" width="1600" height="330" fill="#b8c0c8"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${140 + i * 380}" y="600" width="80" height="160" rx="6" fill="#5a6a7a"/>`).join('')}`,
    campfire: `${sky('cf', '#141a3a', '#3a2a4a')}${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 397) % 1600}" cy="${(i * 131) % 420}" r="${i % 3 + 1}" fill="#fff"/>`).join('')}
      <path d="M0,560 Q300,440 600,540 T1200,500 T1600,540 L1600,900 L0,900Z" fill="#1a2a22"/><rect y="640" width="1600" height="260" fill="#2a3a2a"/>
      <circle cx="800" cy="700" r="160" fill="#ff9a3a" opacity=".18"/><path d="M760,760 L840,760 L800,640 Z" fill="#ffb84a"/><path d="M780,760 L820,760 L800,690 Z" fill="#fff1a8"/>`,
    rooftop: `${sky('rt', '#ff9a76', '#ffd8b0')}${hdb(40, 300, 360, '#c9b8a8')}${hdb(1240, 320, 420, '#b8c9d0')}
      <rect y="600" width="1600" height="300" fill="#9aa8a0"/><rect y="580" width="1600" height="24" fill="#6a7a70"/>
      ${[200, 600, 1000, 1400].map(x => `<rect x="${x}" y="520" width="12" height="80" fill="#5a6a60"/>`).join('')}<path d="M0,540 L1600,540" stroke="#5a6a60" stroke-width="6"/>`,
    garden: `${sky('gd', '#1a2050', '#5a3a6a')}
      ${[300, 700, 1100, 1400].map((x, i) => `<path d="M${x - 40},650 L${x - 16},${260 + i * 30} L${x + 16},${260 + i * 30} L${x + 40},650Z" fill="#3a4a5a"/><ellipse cx="${x}" cy="${250 + i * 30}" rx="${110 - i * 6}" ry="40" fill="#8a5ac9" opacity=".8"/>${[0, 1, 2, 3, 4, 5].map(k => `<circle cx="${x - 90 + k * 36}" cy="${250 + i * 30}" r="6" fill="#ffd8f8"/>`).join('')}`).join('')}
      <rect y="650" width="1600" height="250" fill="#14202a"/>`,
    clinic: `<rect width="1600" height="900" fill="#eef4f6"/><rect y="600" width="1600" height="300" fill="#cfdde2"/>
      <rect x="120" y="140" width="420" height="300" fill="#fff" stroke="#9ab6c0" stroke-width="6"/><path d="M330,200 v120 M270,260 h120" stroke="#e5484d" stroke-width="30"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${700 + i * 160}" y="460" width="120" height="140" rx="10" fill="#6ab0d8"/>`).join('')}`,
    classroom: `<rect width="1600" height="900" fill="#f6efe2"/><rect x="300" y="100" width="1000" height="360" fill="#2e4a3a" stroke="#8a6a4a" stroke-width="16"/>
      <path d="M380,180 h300 M380,240 h420 M380,300 h260" stroke="#e8f0e8" stroke-width="6" opacity=".7"/>
      <rect x="1380" y="120" width="180" height="280" fill="#bfe6ff" stroke="#fff" stroke-width="10"/><rect y="640" width="1600" height="260" fill="#c9a47a"/>
      ${[200, 600, 1000, 1400].map(x => `<rect x="${x - 120}" y="600" width="240" height="30" fill="#a87c52"/><rect x="${x - 110}" y="630" width="16" height="140" fill="#7a5a3a"/><rect x="${x + 94}" y="630" width="16" height="140" fill="#7a5a3a"/>`).join('')}`,
    park: `${sky('pk', '#9ad8ff', '#f0faff')}<path d="M0,560 Q400,500 800,560 T1600,540 L1600,900 L0,900Z" fill="#7ac46a"/>
      <path d="M600,900 Q760,700 800,560 Q840,700 1000,900Z" fill="#d8c8a8"/>${hdb(1100, 360, 300, '#e8dcc8')}
      ${[200, 400, 1350].map(x => `<rect x="${x - 10}" y="380" width="20" height="200" fill="#7a5a3a"/><circle cx="${x}" cy="360" r="90" fill="#4a9a4a"/>`).join('')}
      <g>${sakura(10, 5).replace(/translate\((\d+),(\d+)\)/g, (m, x, y) => `translate(${(+x * 0.2 + 120) | 0},${(+y * 0.3 + 300) | 0})`)}</g>`,
    camp: `${sky('cp', '#c9d8a8', '#f0f4e0')}<rect y="560" width="1600" height="340" fill="#a89a6a"/>
      ${[200, 700, 1200].map(x => `<rect x="${x}" y="300" width="360" height="260" fill="#6a7a4a"/><path d="M${x - 20},300 L${x + 180},200 L${x + 380},300Z" fill="#4a5a32"/>${[0, 1, 2].map(k => `<rect x="${x + 30 + k * 110}" y="360" width="70" height="60" fill="#e8ecd8"/>`).join('')}`).join('')}
      <rect x="0" y="540" width="1600" height="20" fill="#7a6a4a"/>`,
    stage: `<rect width="1600" height="900" fill="#1a1020"/><path d="M0,0 H260 Q200,450 260,900 H0Z M1600,0 H1340 Q1400,450 1340,900 H1600Z" fill="#8a1a2a"/>
      <ellipse cx="800" cy="760" rx="520" ry="80" fill="#ffd27a" opacity=".2"/><rect y="720" width="1600" height="180" fill="#3a2a2a"/>
      <path d="M560,0 L700,720 M1040,0 L900,720" stroke="#fff6c2" stroke-width="3" opacity=".3"/>`,
    voiddeck: `<rect width="1600" height="900" fill="#e8e0d4"/><rect y="0" width="1600" height="110" fill="#c9bca8"/>
      ${[100, 500, 900, 1300].map(x => `<rect x="${x}" y="110" width="70" height="560" fill="#d8cdb8"/>`).join('')}
      <rect y="670" width="1600" height="230" fill="#b8ad98"/><ellipse cx="760" cy="640" rx="120" ry="30" fill="#8a7a6a"/>${[640, 880].map(x => `<rect x="${x - 25}" y="600" width="50" height="40" rx="10" fill="#8a7a6a"/>`).join('')}
      <rect x="1180" y="300" width="300" height="200" fill="#fff" stroke="#9a8a7a" stroke-width="6"/><text x="1330" y="390" font-size="30" text-anchor="middle" fill="#5a4a3a" font-family="sans-serif">BLK 512</text>`,
    badend: `<rect width="1600" height="900" fill="#1a1020"/>${sakura(30, 11).replace(/#fff8ea/g, '#4a2440').replace(/#ffd04d/g, '#6a3450')}`,
  };

  function background(key) {
    const bg = SP().bg[key];
    if (bg) return `<img src="${bg}" alt="" aria-hidden="true" style="width:100%;height:100%;object-fit:cover;display:block">`;
    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${BG[key] || BG.title}</svg>`;
  }

  // Bible expressions for the newer cast map onto the closest drawn face until their own art exists.
  Object.assign(CHAINS, { grin: ['happy', 'smug'], annoyed: ['angry', 'cool'], tired: ['sad'], determined: ['cool', 'smug'], embarrassed: ['shy', 'blush'],
    stern: ['cool', 'angry'], laughing: ['happy'], worried: ['sad', 'shy'], teary: ['sad'] });
  ['grin', 'annoyed', 'tired', 'determined', 'embarrassed', 'stern', 'laughing', 'worried', 'teary'].forEach((k) => {
    if (!EXPR[k]) EXPR[k] = EXPR[CHAINS[k][0]] || EXPR.neutral;
  });
  window.Art = { CAST, EXPR, FRAMING, fallbackExpr, spriteFor, character, background };
})();
