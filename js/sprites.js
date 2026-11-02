// sim4love sprite manifest.
// Character sprites: transparent WEBP/PNG, 800x1200 (2:3, matches .char aspect-ratio), bottom-aligned.
// Heroines (hina, mio, kaede, yuna) wear the Singapore JC uniform. Supporting cast included so nobody falls back to SVG.
// Mochi images are SQUARE (800x800) for the textbox icon (#mochi-face); 'doctor' = Dr. Mochi with glasses.
// 'goto' is the faceless Mr. G silhouette; 'kai' (Alpha Kai) is meant for phone-screen use.
// Backgrounds: 1920x1080 JPG/WEBP, used with object-fit: cover. No people in any background.
// Missing expressions fall back to the character's neutral image (see Art.character).
window.SPRITES = {
  chars: {
    hina: {
      neutral: 'assets/chars/hina_neutral.webp',
      happy: 'assets/chars/hina_happy.webp',
      sad: 'assets/chars/hina_sad.webp',
      angry: 'assets/chars/hina_angry.webp',
      blush: 'assets/chars/hina_blush.webp',
      shy: 'assets/chars/hina_shy.webp'
    },
    mio: {
      neutral: 'assets/chars/mio_neutral.webp',
      happy: 'assets/chars/mio_happy.webp',
      sad: 'assets/chars/mio_sad.webp',
      surprised: 'assets/chars/mio_surprised.webp',
      blush: 'assets/chars/mio_blush.webp',
      shy: 'assets/chars/mio_shy.webp'
    },
    kaede: {
      neutral: 'assets/chars/kaede_neutral.webp',
      happy: 'assets/chars/kaede_happy.webp',
      sad: 'assets/chars/kaede_sad.webp',
      smug: 'assets/chars/kaede_smug.webp',
      angry: 'assets/chars/kaede_angry.webp',
      cool: 'assets/chars/kaede_cool.webp',
      blush: 'assets/chars/kaede_blush.webp'
    },
    yuna: {
      neutral: 'assets/chars/yuna_neutral.webp',
      happy: 'assets/chars/yuna_happy.webp',
      sad: 'assets/chars/yuna_sad.webp',
      surprised: 'assets/chars/yuna_surprised.webp',
      smug: 'assets/chars/yuna_smug.webp',
      angry: 'assets/chars/yuna_angry.webp',
      blush: 'assets/chars/yuna_blush.webp'
    },
    rei: {
      neutral: 'assets/chars/rei_neutral.png',
      happy: 'assets/chars/rei_happy.png',
      sad: 'assets/chars/rei_sad.webp',
      surprised: 'assets/chars/rei_surprised.png',
      smug: 'assets/chars/rei_smug.png',
      angry: 'assets/chars/rei_angry.webp',
      cool: 'assets/chars/rei_cool.png',
      blush: 'assets/chars/rei_blush.png',
      scheme: 'assets/chars/rei_scheme.png'
    },
    mochi: {
      neutral: 'assets/chars/mochi_neutral.png',
      happy: 'assets/chars/mochi_happy.png',
      sad: 'assets/chars/mochi_sad.png',
      surprised: 'assets/chars/mochi_surprised.png',
      smug: 'assets/chars/mochi_smug.png',
      angry: 'assets/chars/mochi_angry.png',
      doctor: 'assets/chars/mochi_doctor.webp'
    },
    kenta: {
      neutral: 'assets/chars/kenta_neutral.webp',
      happy: 'assets/chars/kenta_happy.webp',
      sad: 'assets/chars/kenta_sad.webp',
      surprised: 'assets/chars/kenta_surprised.webp',
      smug: 'assets/chars/kenta_smug.webp'
    },
    ogawa: {
      neutral: 'assets/chars/ogawa_neutral.webp',
      happy: 'assets/chars/ogawa_happy.webp',
      sad: 'assets/chars/ogawa_sad.webp',
      angry: 'assets/chars/ogawa_angry.webp'
    },
    farah: {
      neutral: 'assets/chars/farah_neutral.webp',
      happy: 'assets/chars/farah_happy.webp',
      angry: 'assets/chars/farah_angry.webp'
    },
    nurse: {
      neutral: 'assets/chars/nurse_neutral.webp'
    },
    joy: {
      neutral: 'assets/chars/joy_neutral.webp',
      sad: 'assets/chars/joy_sad.webp'
    },
    goto: {
      neutral: 'assets/chars/goto_neutral.webp'
    },
    dad: {
      neutral: 'assets/chars/dad_neutral.webp',
      happy: 'assets/chars/dad_happy.webp',
      angry: 'assets/chars/dad_angry.webp'
    },
    mom: {
      neutral: 'assets/chars/mom_neutral.webp',
      sad: 'assets/chars/mom_sad.webp'
    },
    mei: {
      neutral: 'assets/chars/mei_neutral.webp',
      happy: 'assets/chars/mei_happy.webp',
      angry: 'assets/chars/mei_angry.webp'
    },
    takumi: {
      neutral: 'assets/chars/takumi_neutral.webp',
      smug: 'assets/chars/takumi_smug.webp'
    },
    ren: {
      neutral: 'assets/chars/ren_neutral.webp',
      sad: 'assets/chars/ren_sad.webp'
    },
    saki: {
      neutral: 'assets/chars/saki_neutral.webp',
      sad: 'assets/chars/saki_sad.webp'
    },
    nana: {
      neutral: 'assets/chars/nana_neutral.webp',
      surprised: 'assets/chars/nana_surprised.webp'
    },
    kai: {
      neutral: 'assets/chars/kai_neutral.webp'
    }
  },
  bg: {
    badend: 'assets/bg/badend.jpg',
    bedroom: 'assets/bg/bedroom.jpg',
    field: 'assets/bg/field.jpg',
    keyart: 'assets/bg/keyart.jpg',
    library: 'assets/bg/library.jpg',
    night: 'assets/bg/night.jpg',
    street: 'assets/bg/street.jpg',
    title: 'assets/bg/title.jpg'
  }
};
