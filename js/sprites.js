// sim4love sprite manifest - Chapter 1 artwork.
// Character sprites: transparent PNG, 800x1200 (exactly 2:3 to match .char aspect-ratio), bottom-aligned.
// Backgrounds: 1920x1080 JPG, used with object-fit: cover.
// Missing expressions fall back to the character's neutral image (see Art.character).
window.SPRITES = {
  chars: {
    hina: {
      neutral: 'assets/chars/hina_neutral.png',
      happy: 'assets/chars/hina_happy.png',
      shy: 'assets/chars/hina_shy.png',
      blush: 'assets/chars/hina_blush.png',
      sad: 'assets/chars/hina_sad.png',
      angry: 'assets/chars/hina_angry.png'
    },
    rei: {
      neutral: 'assets/chars/rei_neutral.png',
      happy: 'assets/chars/rei_happy.png',
      surprised: 'assets/chars/rei_surprised.png',
      blush: 'assets/chars/rei_blush.png',
      smug: 'assets/chars/rei_smug.png',
      scheme: 'assets/chars/rei_scheme.png',
      cool: 'assets/chars/rei_cool.png'
    },
    mio: {
      neutral: 'assets/chars/mio_neutral.png',
      happy: 'assets/chars/mio_happy.png',
      shy: 'assets/chars/mio_shy.png',
      blush: 'assets/chars/mio_blush.png',
      sad: 'assets/chars/mio_sad.png',
      surprised: 'assets/chars/mio_surprised.png'
    },
    kaede: {
      neutral: 'assets/chars/kaede_neutral.png',
      happy: 'assets/chars/kaede_happy.png',
      cool: 'assets/chars/kaede_cool.png',
      smug: 'assets/chars/kaede_smug.png'
    },
    yuna: {
      neutral: 'assets/chars/yuna_neutral.png',
      happy: 'assets/chars/yuna_happy.png',
      smug: 'assets/chars/yuna_smug.png'
    },
    // Mochi images are SQUARE (800x800) for the textbox icon (#mochi-face).
    // The engine currently draws Mochi with mochiSvg() and ignores this entry;
    // a hook is needed in engine.js to use these images.
    mochi: {
      neutral: 'assets/chars/mochi_neutral.png',
      happy: 'assets/chars/mochi_happy.png',
      smug: 'assets/chars/mochi_smug.png',
      angry: 'assets/chars/mochi_angry.png',
      surprised: 'assets/chars/mochi_surprised.png',
      sad: 'assets/chars/mochi_sad.png'
    }
  },
  bg: {
    title: 'assets/bg/title.jpg',
    bedroom: 'assets/bg/bedroom.jpg',
    street: 'assets/bg/street.jpg',
    library: 'assets/bg/library.jpg',
    field: 'assets/bg/field.jpg',
    night: 'assets/bg/night.jpg',
    badend: 'assets/bg/badend.jpg',
    // Group key art with the cast (no engine slot yet; usable for a gallery or splash screen).
    keyart: 'assets/bg/keyart.jpg'
  }
};
