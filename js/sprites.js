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
      surprised: 'assets/chars/hina_surprised.webp',
      smug: 'assets/chars/hina_smug.webp',
      angry: 'assets/chars/hina_angry.webp',
      cool: 'assets/chars/hina_cool.webp',
      blush: 'assets/chars/hina_blush.webp',
      shy: 'assets/chars/hina_shy.webp'
    },
    mio: {
      neutral: 'assets/chars/mio_neutral.webp',
      happy: 'assets/chars/mio_happy.webp',
      sad: 'assets/chars/mio_sad.webp',
      surprised: 'assets/chars/mio_surprised.webp',
      smug: 'assets/chars/mio_smug.webp',
      angry: 'assets/chars/mio_angry.webp',
      cool: 'assets/chars/mio_cool.webp',
      blush: 'assets/chars/mio_blush.webp',
      shy: 'assets/chars/mio_shy.webp'
    },
    kaede: {
      neutral: 'assets/chars/kaede_neutral.webp',
      happy: 'assets/chars/kaede_happy.webp',
      sad: 'assets/chars/kaede_sad.webp',
      surprised: 'assets/chars/kaede_surprised.webp',
      smug: 'assets/chars/kaede_smug.webp',
      angry: 'assets/chars/kaede_angry.webp',
      cool: 'assets/chars/kaede_cool.webp',
      blush: 'assets/chars/kaede_blush.webp',
      shy: 'assets/chars/kaede_shy.webp'
    },
    yuna: {
      neutral: 'assets/chars/yuna_neutral.webp',
      happy: 'assets/chars/yuna_happy.webp',
      sad: 'assets/chars/yuna_sad.webp',
      surprised: 'assets/chars/yuna_surprised.webp',
      smug: 'assets/chars/yuna_smug.webp',
      angry: 'assets/chars/yuna_angry.webp',
      cool: 'assets/chars/yuna_cool.webp',
      blush: 'assets/chars/yuna_blush.webp',
      shy: 'assets/chars/yuna_shy.webp'
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
    airport: 'assets/bg/airport.webp',
    apartment: 'assets/bg/apartment.webp',
    badend: 'assets/bg/badend.jpg',
    beach: 'assets/bg/beach.webp',
    bedroom: 'assets/bg/bedroom.jpg',
    cafe: 'assets/bg/cafe.webp',
    camp: 'assets/bg/camp.webp',
    campsite: 'assets/bg/campsite.webp',
    campsite_night: 'assets/bg/campsite_night.webp',
    carnival: 'assets/bg/carnival.webp',
    classroom: 'assets/bg/classroom.webp',
    dining: 'assets/bg/dining.webp',
    field: 'assets/bg/field.jpg',
    fireworks: 'assets/bg/fireworks.webp',
    gradhall: 'assets/bg/gradhall.webp',
    hawker: 'assets/bg/hawker.webp',
    healthroom: 'assets/bg/healthroom.webp',
    karaoke: 'assets/bg/karaoke.webp',
    keyart: 'assets/bg/keyart.jpg',
    lecture: 'assets/bg/lecture.webp',
    library: 'assets/bg/library.jpg',
    mall: 'assets/bg/mall.webp',
    mrt: 'assets/bg/mrt.webp',
    night: 'assets/bg/night.jpg',
    park: 'assets/bg/park.webp',
    partyroom: 'assets/bg/partyroom.webp',
    polyclinic: 'assets/bg/polyclinic.webp',
    rooftop: 'assets/bg/rooftop.webp',
    sentosa: 'assets/bg/sentosa.webp',
    street: 'assets/bg/street.jpg',
    title: 'assets/bg/title.jpg',
    voiddeck: 'assets/bg/voiddeck.webp'
  }
};
