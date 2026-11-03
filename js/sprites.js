// sim4love sprite manifest (art v3, Japanese kawaii style; see docs/art-notes.md).
// Character sprites: transparent WEBP, 800x1200 (2:3, matches .char aspect-ratio), bottom-aligned.
// Files: assets/chars/<id>_<outfit>_<expr>.webp (docs/CAST_BIBLE.md section 6).
// SPRITES.chars[id][expr]            -> the default outfit (flat, used when no outfit is set).
// SPRITES.chars[id].outfits[o][expr] -> a named outfit, read by Art.character(key, expr, label, outfit).
//   Lookup order: outfit+expr -> outfit neutral -> default outfit+expr (expression chain) -> default neutral.
//   Some outfits are listed under two ids (alias) so the outfit names in js/data/cast.js resolve to art.
// SPRITES.outfits[id] = { default: '<outfit>', <outfit>: [exprs] }  (summary; aliases excluded).
// SPRITES.sprite(id, expr, outfit) -> file path or null, same lookup order (for tests and tools).
// Mochi images are SQUARE (800x800) for the textbox icon (#mochi-face); 'doctor' = Dr. Mochi with glasses.
// 'goto' is the faceless Mr. G silhouette; 'kai' (Alpha Kai) is meant for phone-screen use.
// Backgrounds: 1920x1080 JPG/WEBP, used with object-fit: cover. No people in any background.
window.SPRITES = {
  chars: {
    hina: {
      neutral: 'assets/chars/hina_uniform_neutral.webp',
      happy: 'assets/chars/hina_uniform_happy.webp',
      sad: 'assets/chars/hina_uniform_sad.webp',
      surprised: 'assets/chars/hina_uniform_surprised.webp',
      angry: 'assets/chars/hina_uniform_angry.webp',
      blush: 'assets/chars/hina_uniform_blush.webp',
      shy: 'assets/chars/hina_uniform_shy.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/hina_uniform_neutral.webp',
          happy: 'assets/chars/hina_uniform_happy.webp',
          sad: 'assets/chars/hina_uniform_sad.webp',
          surprised: 'assets/chars/hina_uniform_surprised.webp',
          angry: 'assets/chars/hina_uniform_angry.webp',
          blush: 'assets/chars/hina_uniform_blush.webp',
          shy: 'assets/chars/hina_uniform_shy.webp'
        },
        casual: {
          neutral: 'assets/chars/hina_casual_neutral.webp',
          happy: 'assets/chars/hina_casual_happy.webp',
          sad: 'assets/chars/hina_casual_sad.webp',
          angry: 'assets/chars/hina_casual_angry.webp',
          blush: 'assets/chars/hina_casual_blush.webp'
        },
        cca: {
          neutral: 'assets/chars/hina_cca_neutral.webp',
          happy: 'assets/chars/hina_cca_happy.webp',
          sad: 'assets/chars/hina_cca_sad.webp',
          angry: 'assets/chars/hina_cca_angry.webp',
          blush: 'assets/chars/hina_cca_blush.webp'
        },
        festive: {
          neutral: 'assets/chars/hina_festive_neutral.webp',
          happy: 'assets/chars/hina_festive_happy.webp',
          sad: 'assets/chars/hina_festive_sad.webp',
          angry: 'assets/chars/hina_festive_angry.webp',
          blush: 'assets/chars/hina_festive_blush.webp'
        }
      }
    },
    mio: {
      neutral: 'assets/chars/mio_uniform_neutral.webp',
      happy: 'assets/chars/mio_uniform_happy.webp',
      sad: 'assets/chars/mio_uniform_sad.webp',
      surprised: 'assets/chars/mio_uniform_surprised.webp',
      smug: 'assets/chars/mio_uniform_smug.webp',
      blush: 'assets/chars/mio_uniform_blush.webp',
      shy: 'assets/chars/mio_uniform_shy.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/mio_uniform_neutral.webp',
          happy: 'assets/chars/mio_uniform_happy.webp',
          sad: 'assets/chars/mio_uniform_sad.webp',
          surprised: 'assets/chars/mio_uniform_surprised.webp',
          smug: 'assets/chars/mio_uniform_smug.webp',
          blush: 'assets/chars/mio_uniform_blush.webp',
          shy: 'assets/chars/mio_uniform_shy.webp'
        },
        camp: {
          neutral: 'assets/chars/mio_camp_neutral.webp',
          happy: 'assets/chars/mio_camp_happy.webp',
          sad: 'assets/chars/mio_camp_sad.webp',
          angry: 'assets/chars/mio_camp_angry.webp',
          blush: 'assets/chars/mio_camp_blush.webp'
        },
        casual: {
          neutral: 'assets/chars/mio_casual_neutral.webp',
          happy: 'assets/chars/mio_casual_happy.webp',
          sad: 'assets/chars/mio_casual_sad.webp',
          angry: 'assets/chars/mio_casual_angry.webp',
          blush: 'assets/chars/mio_casual_blush.webp'
        },
        festive: {
          neutral: 'assets/chars/mio_festive_neutral.webp',
          happy: 'assets/chars/mio_festive_happy.webp',
          sad: 'assets/chars/mio_festive_sad.webp',
          angry: 'assets/chars/mio_festive_angry.webp',
          blush: 'assets/chars/mio_festive_blush.webp'
        }
      }
    },
    kaede: {
      neutral: 'assets/chars/kaede_uniform_neutral.webp',
      happy: 'assets/chars/kaede_uniform_happy.webp',
      surprised: 'assets/chars/kaede_uniform_surprised.webp',
      smug: 'assets/chars/kaede_uniform_smug.webp',
      angry: 'assets/chars/kaede_uniform_angry.webp',
      cool: 'assets/chars/kaede_uniform_cool.webp',
      blush: 'assets/chars/kaede_uniform_blush.webp',
      shy: 'assets/chars/kaede_uniform_shy.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/kaede_uniform_neutral.webp',
          happy: 'assets/chars/kaede_uniform_happy.webp',
          surprised: 'assets/chars/kaede_uniform_surprised.webp',
          smug: 'assets/chars/kaede_uniform_smug.webp',
          angry: 'assets/chars/kaede_uniform_angry.webp',
          cool: 'assets/chars/kaede_uniform_cool.webp',
          blush: 'assets/chars/kaede_uniform_blush.webp',
          shy: 'assets/chars/kaede_uniform_shy.webp'
        },
        casual: {
          neutral: 'assets/chars/kaede_casual_neutral.webp',
          happy: 'assets/chars/kaede_casual_happy.webp',
          smug: 'assets/chars/kaede_casual_smug.webp',
          angry: 'assets/chars/kaede_casual_angry.webp',
          cool: 'assets/chars/kaede_casual_cool.webp'
        },
        festive: {
          neutral: 'assets/chars/kaede_festive_neutral.webp',
          happy: 'assets/chars/kaede_festive_happy.webp',
          smug: 'assets/chars/kaede_festive_smug.webp',
          angry: 'assets/chars/kaede_festive_angry.webp',
          cool: 'assets/chars/kaede_festive_cool.webp'
        },
        track: {
          neutral: 'assets/chars/kaede_track_neutral.webp',
          happy: 'assets/chars/kaede_track_happy.webp',
          smug: 'assets/chars/kaede_track_smug.webp',
          angry: 'assets/chars/kaede_track_angry.webp',
          cool: 'assets/chars/kaede_track_cool.webp'
        }
      }
    },
    yuna: {
      neutral: 'assets/chars/yuna_uniform_neutral.webp',
      happy: 'assets/chars/yuna_uniform_happy.webp',
      sad: 'assets/chars/yuna_uniform_sad.webp',
      surprised: 'assets/chars/yuna_uniform_surprised.webp',
      angry: 'assets/chars/yuna_uniform_angry.webp',
      blush: 'assets/chars/yuna_uniform_blush.webp',
      shy: 'assets/chars/yuna_uniform_shy.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/yuna_uniform_neutral.webp',
          happy: 'assets/chars/yuna_uniform_happy.webp',
          sad: 'assets/chars/yuna_uniform_sad.webp',
          surprised: 'assets/chars/yuna_uniform_surprised.webp',
          angry: 'assets/chars/yuna_uniform_angry.webp',
          blush: 'assets/chars/yuna_uniform_blush.webp',
          shy: 'assets/chars/yuna_uniform_shy.webp'
        },
        festive: {
          neutral: 'assets/chars/yuna_festive_neutral.webp',
          happy: 'assets/chars/yuna_festive_happy.webp',
          sad: 'assets/chars/yuna_festive_sad.webp',
          smug: 'assets/chars/yuna_festive_smug.webp',
          blush: 'assets/chars/yuna_festive_blush.webp'
        },
        home: {
          neutral: 'assets/chars/yuna_home_neutral.webp',
          happy: 'assets/chars/yuna_home_happy.webp',
          sad: 'assets/chars/yuna_home_sad.webp',
          smug: 'assets/chars/yuna_home_smug.webp',
          blush: 'assets/chars/yuna_home_blush.webp'
        },
        stream: {
          neutral: 'assets/chars/yuna_stream_neutral.webp',
          happy: 'assets/chars/yuna_stream_happy.webp',
          sad: 'assets/chars/yuna_stream_sad.webp',
          smug: 'assets/chars/yuna_stream_smug.webp',
          blush: 'assets/chars/yuna_stream_blush.webp'
        },
        stage: {
          neutral: 'assets/chars/yuna_stream_neutral.webp',
          happy: 'assets/chars/yuna_stream_happy.webp',
          sad: 'assets/chars/yuna_stream_sad.webp',
          smug: 'assets/chars/yuna_stream_smug.webp',
          blush: 'assets/chars/yuna_stream_blush.webp'
        },
        dance: {
          neutral: 'assets/chars/yuna_home_neutral.webp',
          happy: 'assets/chars/yuna_home_happy.webp',
          sad: 'assets/chars/yuna_home_sad.webp',
          smug: 'assets/chars/yuna_home_smug.webp',
          blush: 'assets/chars/yuna_home_blush.webp'
        }
      }
    },
    chloe: {
      neutral: 'assets/chars/chloe_casual_neutral.webp',
      happy: 'assets/chars/chloe_casual_happy.webp',
      sad: 'assets/chars/chloe_casual_sad.webp',
      surprised: 'assets/chars/chloe_casual_surprised.webp',
      smug: 'assets/chars/chloe_casual_smug.webp',
      angry: 'assets/chars/chloe_casual_angry.webp',
      blush: 'assets/chars/chloe_casual_blush.webp',
      outfits: {
        casual: {
          neutral: 'assets/chars/chloe_casual_neutral.webp',
          happy: 'assets/chars/chloe_casual_happy.webp',
          sad: 'assets/chars/chloe_casual_sad.webp',
          surprised: 'assets/chars/chloe_casual_surprised.webp',
          smug: 'assets/chars/chloe_casual_smug.webp',
          angry: 'assets/chars/chloe_casual_angry.webp',
          blush: 'assets/chars/chloe_casual_blush.webp'
        },
        festive: {
          neutral: 'assets/chars/chloe_festive_neutral.webp',
          happy: 'assets/chars/chloe_festive_happy.webp',
          smug: 'assets/chars/chloe_festive_smug.webp',
          angry: 'assets/chars/chloe_festive_angry.webp',
          blush: 'assets/chars/chloe_festive_blush.webp'
        },
        pitch: {
          neutral: 'assets/chars/chloe_pitch_neutral.webp',
          happy: 'assets/chars/chloe_pitch_happy.webp',
          smug: 'assets/chars/chloe_pitch_smug.webp',
          angry: 'assets/chars/chloe_pitch_angry.webp',
          blush: 'assets/chars/chloe_pitch_blush.webp'
        },
        stall: {
          neutral: 'assets/chars/chloe_stall_neutral.webp',
          happy: 'assets/chars/chloe_stall_happy.webp',
          smug: 'assets/chars/chloe_stall_smug.webp',
          angry: 'assets/chars/chloe_stall_angry.webp',
          blush: 'assets/chars/chloe_stall_blush.webp'
        }
      }
    },
    preet: {
      neutral: 'assets/chars/preet_uniform_neutral.webp',
      happy: 'assets/chars/preet_uniform_happy.webp',
      sad: 'assets/chars/preet_uniform_sad.webp',
      surprised: 'assets/chars/preet_uniform_surprised.webp',
      angry: 'assets/chars/preet_uniform_angry.webp',
      blush: 'assets/chars/preet_uniform_blush.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/preet_uniform_neutral.webp',
          happy: 'assets/chars/preet_uniform_happy.webp',
          sad: 'assets/chars/preet_uniform_sad.webp',
          surprised: 'assets/chars/preet_uniform_surprised.webp',
          angry: 'assets/chars/preet_uniform_angry.webp',
          blush: 'assets/chars/preet_uniform_blush.webp'
        },
        festive: {
          neutral: 'assets/chars/preet_festive_neutral.webp',
          happy: 'assets/chars/preet_festive_happy.webp',
          sad: 'assets/chars/preet_festive_sad.webp',
          angry: 'assets/chars/preet_festive_angry.webp',
          blush: 'assets/chars/preet_festive_blush.webp'
        },
        run: {
          neutral: 'assets/chars/preet_run_neutral.webp',
          happy: 'assets/chars/preet_run_happy.webp',
          sad: 'assets/chars/preet_run_sad.webp',
          angry: 'assets/chars/preet_run_angry.webp',
          blush: 'assets/chars/preet_run_blush.webp'
        },
        volunteer: {
          neutral: 'assets/chars/preet_volunteer_neutral.webp',
          happy: 'assets/chars/preet_volunteer_happy.webp',
          sad: 'assets/chars/preet_volunteer_sad.webp',
          angry: 'assets/chars/preet_volunteer_angry.webp',
          blush: 'assets/chars/preet_volunteer_blush.webp'
        }
      }
    },
    rei: {
      neutral: 'assets/chars/rei_persona_neutral.webp',
      happy: 'assets/chars/rei_persona_happy.webp',
      sad: 'assets/chars/rei_persona_sad.webp',
      surprised: 'assets/chars/rei_persona_surprised.webp',
      smug: 'assets/chars/rei_persona_smug.webp',
      scheme: 'assets/chars/rei_persona_scheme.webp',
      outfits: {
        persona: {
          neutral: 'assets/chars/rei_persona_neutral.webp',
          happy: 'assets/chars/rei_persona_happy.webp',
          sad: 'assets/chars/rei_persona_sad.webp',
          surprised: 'assets/chars/rei_persona_surprised.webp',
          smug: 'assets/chars/rei_persona_smug.webp',
          scheme: 'assets/chars/rei_persona_scheme.webp'
        },
        herself: {
          neutral: 'assets/chars/rei_herself_neutral.webp',
          happy: 'assets/chars/rei_herself_happy.webp',
          sad: 'assets/chars/rei_herself_sad.webp',
          surprised: 'assets/chars/rei_herself_surprised.webp'
        },
        law: {
          neutral: 'assets/chars/rei_law_neutral.webp',
          happy: 'assets/chars/rei_law_happy.webp',
          sad: 'assets/chars/rei_law_sad.webp',
          surprised: 'assets/chars/rei_law_surprised.webp'
        },
        occasion: {
          neutral: 'assets/chars/rei_occasion_neutral.webp',
          happy: 'assets/chars/rei_occasion_happy.webp',
          sad: 'assets/chars/rei_occasion_sad.webp',
          surprised: 'assets/chars/rei_occasion_surprised.webp'
        },
        student: {
          neutral: 'assets/chars/rei_law_neutral.webp',
          happy: 'assets/chars/rei_law_happy.webp',
          sad: 'assets/chars/rei_law_sad.webp',
          surprised: 'assets/chars/rei_law_surprised.webp'
        },
        talk: {
          neutral: 'assets/chars/rei_occasion_neutral.webp',
          happy: 'assets/chars/rei_occasion_happy.webp',
          sad: 'assets/chars/rei_occasion_sad.webp',
          surprised: 'assets/chars/rei_occasion_surprised.webp'
        }
      }
    },
    nana: {
      neutral: 'assets/chars/nana_casual_neutral.webp',
      happy: 'assets/chars/nana_casual_happy.webp',
      sad: 'assets/chars/nana_casual_sad.webp',
      surprised: 'assets/chars/nana_casual_surprised.webp',
      shy: 'assets/chars/nana_casual_shy.webp',
      outfits: {
        casual: {
          neutral: 'assets/chars/nana_casual_neutral.webp',
          happy: 'assets/chars/nana_casual_happy.webp',
          sad: 'assets/chars/nana_casual_sad.webp',
          surprised: 'assets/chars/nana_casual_surprised.webp',
          shy: 'assets/chars/nana_casual_shy.webp'
        },
        gallery: {
          neutral: 'assets/chars/nana_gallery_neutral.webp',
          happy: 'assets/chars/nana_gallery_happy.webp',
          surprised: 'assets/chars/nana_gallery_surprised.webp',
          shy: 'assets/chars/nana_gallery_shy.webp'
        },
        studio: {
          neutral: 'assets/chars/nana_studio_neutral.webp',
          happy: 'assets/chars/nana_studio_happy.webp',
          surprised: 'assets/chars/nana_studio_surprised.webp',
          shy: 'assets/chars/nana_studio_shy.webp'
        },
        weekend: {
          neutral: 'assets/chars/nana_weekend_neutral.webp',
          happy: 'assets/chars/nana_weekend_happy.webp',
          surprised: 'assets/chars/nana_weekend_surprised.webp',
          shy: 'assets/chars/nana_weekend_shy.webp'
        },
        occasion: {
          neutral: 'assets/chars/nana_gallery_neutral.webp',
          happy: 'assets/chars/nana_gallery_happy.webp',
          surprised: 'assets/chars/nana_gallery_surprised.webp',
          shy: 'assets/chars/nana_gallery_shy.webp'
        }
      }
    },
    kenta: {
      neutral: 'assets/chars/kenta_uniform_neutral.webp',
      happy: 'assets/chars/kenta_uniform_happy.webp',
      sad: 'assets/chars/kenta_uniform_sad.webp',
      surprised: 'assets/chars/kenta_uniform_surprised.webp',
      smug: 'assets/chars/kenta_uniform_smug.webp',
      angry: 'assets/chars/kenta_uniform_angry.webp',
      shy: 'assets/chars/kenta_uniform_shy.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/kenta_uniform_neutral.webp',
          happy: 'assets/chars/kenta_uniform_happy.webp',
          sad: 'assets/chars/kenta_uniform_sad.webp',
          surprised: 'assets/chars/kenta_uniform_surprised.webp',
          smug: 'assets/chars/kenta_uniform_smug.webp',
          angry: 'assets/chars/kenta_uniform_angry.webp',
          shy: 'assets/chars/kenta_uniform_shy.webp'
        },
        festive: {
          neutral: 'assets/chars/kenta_festive_neutral.webp',
          happy: 'assets/chars/kenta_festive_happy.webp',
          sad: 'assets/chars/kenta_festive_sad.webp'
        },
        ns: {
          neutral: 'assets/chars/kenta_ns_neutral.webp',
          happy: 'assets/chars/kenta_ns_happy.webp',
          sad: 'assets/chars/kenta_ns_sad.webp'
        },
        sport: {
          neutral: 'assets/chars/kenta_sport_neutral.webp',
          happy: 'assets/chars/kenta_sport_happy.webp',
          sad: 'assets/chars/kenta_sport_sad.webp'
        }
      }
    },
    mei: {
      neutral: 'assets/chars/mei_casual_neutral.webp',
      happy: 'assets/chars/mei_casual_happy.webp',
      angry: 'assets/chars/mei_casual_angry.webp',
      outfits: {
        casual: {
          neutral: 'assets/chars/mei_casual_neutral.webp',
          happy: 'assets/chars/mei_casual_happy.webp',
          angry: 'assets/chars/mei_casual_angry.webp'
        },
        festive: {
          neutral: 'assets/chars/mei_festive_neutral.webp',
          happy: 'assets/chars/mei_festive_happy.webp'
        },
        home: {
          neutral: 'assets/chars/mei_home_neutral.webp',
          happy: 'assets/chars/mei_home_happy.webp'
        },
        internship: {
          neutral: 'assets/chars/mei_internship_neutral.webp',
          happy: 'assets/chars/mei_internship_happy.webp'
        },
        work: {
          neutral: 'assets/chars/mei_internship_neutral.webp',
          happy: 'assets/chars/mei_internship_happy.webp'
        }
      }
    },
    mom: {
      neutral: 'assets/chars/mom_home_neutral.webp',
      happy: 'assets/chars/mom_home_happy.webp',
      sad: 'assets/chars/mom_home_sad.webp',
      surprised: 'assets/chars/mom_home_surprised.webp',
      outfits: {
        home: {
          neutral: 'assets/chars/mom_home_neutral.webp',
          happy: 'assets/chars/mom_home_happy.webp',
          sad: 'assets/chars/mom_home_sad.webp',
          surprised: 'assets/chars/mom_home_surprised.webp'
        },
        festive: {
          neutral: 'assets/chars/mom_festive_neutral.webp',
          happy: 'assets/chars/mom_festive_happy.webp'
        },
        nightclass: {
          neutral: 'assets/chars/mom_nightclass_neutral.webp',
          happy: 'assets/chars/mom_nightclass_happy.webp'
        },
        work: {
          neutral: 'assets/chars/mom_work_neutral.webp',
          happy: 'assets/chars/mom_work_happy.webp'
        }
      }
    },
    dad: {
      neutral: 'assets/chars/dad_home_neutral.webp',
      happy: 'assets/chars/dad_home_happy.webp',
      angry: 'assets/chars/dad_home_angry.webp',
      outfits: {
        home: {
          neutral: 'assets/chars/dad_home_neutral.webp',
          happy: 'assets/chars/dad_home_happy.webp',
          angry: 'assets/chars/dad_home_angry.webp'
        },
        occasion: {
          neutral: 'assets/chars/dad_occasion_neutral.webp',
          happy: 'assets/chars/dad_occasion_happy.webp'
        },
        weekend: {
          neutral: 'assets/chars/dad_weekend_neutral.webp',
          happy: 'assets/chars/dad_weekend_happy.webp'
        },
        work: {
          neutral: 'assets/chars/dad_work_neutral.webp',
          happy: 'assets/chars/dad_work_happy.webp'
        }
      }
    },
    ama: {
      neutral: 'assets/chars/ama_home_neutral.webp',
      happy: 'assets/chars/ama_home_happy.webp',
      sad: 'assets/chars/ama_home_sad.webp',
      outfits: {
        home: {
          neutral: 'assets/chars/ama_home_neutral.webp',
          happy: 'assets/chars/ama_home_happy.webp',
          sad: 'assets/chars/ama_home_sad.webp'
        },
        class: {
          neutral: 'assets/chars/ama_class_neutral.webp',
          happy: 'assets/chars/ama_class_happy.webp'
        },
        dance: {
          neutral: 'assets/chars/ama_dance_neutral.webp',
          sad: 'assets/chars/ama_dance_sad.webp'
        },
        festive: {
          neutral: 'assets/chars/ama_festive_neutral.webp',
          happy: 'assets/chars/ama_festive_happy.webp'
        }
      }
    },
    ogawa: {
      neutral: 'assets/chars/ogawa_cafe_neutral.webp',
      happy: 'assets/chars/ogawa_cafe_happy.webp',
      sad: 'assets/chars/ogawa_cafe_sad.webp',
      outfits: {
        cafe: {
          neutral: 'assets/chars/ogawa_cafe_neutral.webp',
          happy: 'assets/chars/ogawa_cafe_happy.webp',
          sad: 'assets/chars/ogawa_cafe_sad.webp'
        },
        morning: {
          neutral: 'assets/chars/ogawa_morning_neutral.webp',
          happy: 'assets/chars/ogawa_morning_happy.webp'
        },
        nightclass: {
          neutral: 'assets/chars/ogawa_nightclass_neutral.webp',
          happy: 'assets/chars/ogawa_nightclass_happy.webp'
        },
        apron: {
          neutral: 'assets/chars/ogawa_cafe_neutral.webp',
          happy: 'assets/chars/ogawa_cafe_happy.webp',
          sad: 'assets/chars/ogawa_cafe_sad.webp'
        },
        casual: {
          neutral: 'assets/chars/ogawa_nightclass_neutral.webp',
          happy: 'assets/chars/ogawa_nightclass_happy.webp'
        },
        occasion: {
          neutral: 'assets/chars/ogawa_nightclass_neutral.webp',
          happy: 'assets/chars/ogawa_nightclass_happy.webp'
        }
      }
    },
    farah: {
      neutral: 'assets/chars/farah_school_neutral.webp',
      happy: 'assets/chars/farah_school_happy.webp',
      angry: 'assets/chars/farah_school_angry.webp',
      outfits: {
        school: {
          neutral: 'assets/chars/farah_school_neutral.webp',
          happy: 'assets/chars/farah_school_happy.webp',
          angry: 'assets/chars/farah_school_angry.webp'
        },
        camp: {
          neutral: 'assets/chars/farah_camp_neutral.webp',
          happy: 'assets/chars/farah_camp_happy.webp'
        },
        festive: {
          neutral: 'assets/chars/farah_festive_neutral.webp',
          happy: 'assets/chars/farah_festive_happy.webp'
        },
        work: {
          neutral: 'assets/chars/farah_school_neutral.webp',
          happy: 'assets/chars/farah_school_happy.webp',
          angry: 'assets/chars/farah_school_angry.webp'
        },
        occasion: {
          neutral: 'assets/chars/farah_festive_neutral.webp',
          happy: 'assets/chars/farah_festive_happy.webp'
        }
      }
    },
    nurse: {
      neutral: 'assets/chars/nurse_health_neutral.webp',
      happy: 'assets/chars/nurse_health_happy.webp',
      sad: 'assets/chars/nurse_health_sad.webp',
      outfits: {
        health: {
          neutral: 'assets/chars/nurse_health_neutral.webp',
          happy: 'assets/chars/nurse_health_happy.webp',
          sad: 'assets/chars/nurse_health_sad.webp'
        },
        camp: {
          neutral: 'assets/chars/nurse_camp_neutral.webp',
          happy: 'assets/chars/nurse_camp_happy.webp'
        },
        polyclinic: {
          neutral: 'assets/chars/nurse_polyclinic_neutral.webp',
          happy: 'assets/chars/nurse_polyclinic_happy.webp'
        },
        scrubs: {
          neutral: 'assets/chars/nurse_health_neutral.webp',
          happy: 'assets/chars/nurse_health_happy.webp',
          sad: 'assets/chars/nurse_health_sad.webp'
        },
        clinic: {
          neutral: 'assets/chars/nurse_polyclinic_neutral.webp',
          happy: 'assets/chars/nurse_polyclinic_happy.webp'
        },
        casual: {
          neutral: 'assets/chars/nurse_camp_neutral.webp',
          happy: 'assets/chars/nurse_camp_happy.webp'
        }
      }
    },
    joy: {
      neutral: 'assets/chars/joy_work_neutral.webp',
      happy: 'assets/chars/joy_work_happy.webp',
      sad: 'assets/chars/joy_work_sad.webp',
      outfits: {
        work: {
          neutral: 'assets/chars/joy_work_neutral.webp',
          happy: 'assets/chars/joy_work_happy.webp',
          sad: 'assets/chars/joy_work_sad.webp'
        },
        festive: {
          neutral: 'assets/chars/joy_festive_neutral.webp',
          happy: 'assets/chars/joy_festive_happy.webp'
        },
        sunday: {
          neutral: 'assets/chars/joy_sunday_neutral.webp',
          happy: 'assets/chars/joy_sunday_happy.webp'
        }
      }
    },
    takumi: {
      neutral: 'assets/chars/takumi_uniform_neutral.webp',
      sad: 'assets/chars/takumi_uniform_sad.webp',
      surprised: 'assets/chars/takumi_uniform_surprised.webp',
      smug: 'assets/chars/takumi_uniform_smug.webp',
      cool: 'assets/chars/takumi_uniform_cool.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/takumi_uniform_neutral.webp',
          sad: 'assets/chars/takumi_uniform_sad.webp',
          surprised: 'assets/chars/takumi_uniform_surprised.webp',
          smug: 'assets/chars/takumi_uniform_smug.webp',
          cool: 'assets/chars/takumi_uniform_cool.webp'
        },
        casual: {
          neutral: 'assets/chars/takumi_casual_neutral.webp',
          smug: 'assets/chars/takumi_casual_smug.webp'
        },
        council: {
          neutral: 'assets/chars/takumi_council_neutral.webp',
          smug: 'assets/chars/takumi_council_smug.webp'
        },
        blazer: {
          neutral: 'assets/chars/takumi_council_neutral.webp',
          smug: 'assets/chars/takumi_council_smug.webp'
        }
      }
    },
    ren: {
      neutral: 'assets/chars/ren_uniform_neutral.webp',
      sad: 'assets/chars/ren_uniform_sad.webp',
      smug: 'assets/chars/ren_uniform_smug.webp',
      outfits: {
        uniform: {
          neutral: 'assets/chars/ren_uniform_neutral.webp',
          sad: 'assets/chars/ren_uniform_sad.webp',
          smug: 'assets/chars/ren_uniform_smug.webp'
        },
        ns: {
          neutral: 'assets/chars/ren_ns_neutral.webp',
          sad: 'assets/chars/ren_ns_sad.webp'
        },
        street: {
          neutral: 'assets/chars/ren_street_neutral.webp',
          smug: 'assets/chars/ren_street_smug.webp'
        },
        casual: {
          neutral: 'assets/chars/ren_street_neutral.webp',
          smug: 'assets/chars/ren_street_smug.webp'
        }
      }
    },
    saki: {
      neutral: 'assets/chars/saki_chalet_neutral.webp',
      happy: 'assets/chars/saki_chalet_happy.webp',
      sad: 'assets/chars/saki_chalet_sad.webp',
      outfits: {
        chalet: {
          neutral: 'assets/chars/saki_chalet_neutral.webp',
          happy: 'assets/chars/saki_chalet_happy.webp',
          sad: 'assets/chars/saki_chalet_sad.webp'
        },
        crew: {
          neutral: 'assets/chars/saki_crew_neutral.webp',
          happy: 'assets/chars/saki_crew_happy.webp'
        },
        occasion: {
          neutral: 'assets/chars/saki_occasion_neutral.webp',
          happy: 'assets/chars/saki_occasion_happy.webp'
        },
        casual: {
          neutral: 'assets/chars/saki_chalet_neutral.webp',
          happy: 'assets/chars/saki_chalet_happy.webp',
          sad: 'assets/chars/saki_chalet_sad.webp'
        },
        gig: {
          neutral: 'assets/chars/saki_crew_neutral.webp',
          happy: 'assets/chars/saki_crew_happy.webp'
        }
      }
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
    goto: {
      neutral: 'assets/chars/goto_neutral.webp'
    },
    kai: {
      neutral: 'assets/chars/kai_neutral.webp'
    }
  },
  outfits: {
    hina: { default: 'uniform', uniform: ['neutral', 'happy', 'sad', 'surprised', 'angry', 'blush', 'shy'], casual: ['neutral', 'happy', 'sad', 'angry', 'blush'], cca: ['neutral', 'happy', 'sad', 'angry', 'blush'], festive: ['neutral', 'happy', 'sad', 'angry', 'blush'] },
    mio: { default: 'uniform', uniform: ['neutral', 'happy', 'sad', 'surprised', 'smug', 'blush', 'shy'], camp: ['neutral', 'happy', 'sad', 'angry', 'blush'], casual: ['neutral', 'happy', 'sad', 'angry', 'blush'], festive: ['neutral', 'happy', 'sad', 'angry', 'blush'] },
    kaede: { default: 'uniform', uniform: ['neutral', 'happy', 'surprised', 'smug', 'angry', 'cool', 'blush', 'shy'], casual: ['neutral', 'happy', 'smug', 'angry', 'cool'], festive: ['neutral', 'happy', 'smug', 'angry', 'cool'], track: ['neutral', 'happy', 'smug', 'angry', 'cool'] },
    yuna: { default: 'uniform', uniform: ['neutral', 'happy', 'sad', 'surprised', 'angry', 'blush', 'shy'], festive: ['neutral', 'happy', 'sad', 'smug', 'blush'], home: ['neutral', 'happy', 'sad', 'smug', 'blush'], stream: ['neutral', 'happy', 'sad', 'smug', 'blush'] },
    chloe: { default: 'casual', casual: ['neutral', 'happy', 'sad', 'surprised', 'smug', 'angry', 'blush'], festive: ['neutral', 'happy', 'smug', 'angry', 'blush'], pitch: ['neutral', 'happy', 'smug', 'angry', 'blush'], stall: ['neutral', 'happy', 'smug', 'angry', 'blush'] },
    preet: { default: 'uniform', uniform: ['neutral', 'happy', 'sad', 'surprised', 'angry', 'blush'], festive: ['neutral', 'happy', 'sad', 'angry', 'blush'], run: ['neutral', 'happy', 'sad', 'angry', 'blush'], volunteer: ['neutral', 'happy', 'sad', 'angry', 'blush'] },
    rei: { default: 'persona', persona: ['neutral', 'happy', 'sad', 'surprised', 'smug', 'scheme'], herself: ['neutral', 'happy', 'sad', 'surprised'], law: ['neutral', 'happy', 'sad', 'surprised'], occasion: ['neutral', 'happy', 'sad', 'surprised'] },
    nana: { default: 'casual', casual: ['neutral', 'happy', 'sad', 'surprised', 'shy'], gallery: ['neutral', 'happy', 'surprised', 'shy'], studio: ['neutral', 'happy', 'surprised', 'shy'], weekend: ['neutral', 'happy', 'surprised', 'shy'] },
    kenta: { default: 'uniform', uniform: ['neutral', 'happy', 'sad', 'surprised', 'smug', 'angry', 'shy'], festive: ['neutral', 'happy', 'sad'], ns: ['neutral', 'happy', 'sad'], sport: ['neutral', 'happy', 'sad'] },
    mei: { default: 'casual', casual: ['neutral', 'happy', 'angry'], festive: ['neutral', 'happy'], home: ['neutral', 'happy'], internship: ['neutral', 'happy'] },
    mom: { default: 'home', home: ['neutral', 'happy', 'sad', 'surprised'], festive: ['neutral', 'happy'], nightclass: ['neutral', 'happy'], work: ['neutral', 'happy'] },
    dad: { default: 'home', home: ['neutral', 'happy', 'angry'], occasion: ['neutral', 'happy'], weekend: ['neutral', 'happy'], work: ['neutral', 'happy'] },
    ama: { default: 'home', home: ['neutral', 'happy', 'sad'], class: ['neutral', 'happy'], dance: ['neutral', 'sad'], festive: ['neutral', 'happy'] },
    ogawa: { default: 'cafe', cafe: ['neutral', 'happy', 'sad'], morning: ['neutral', 'happy'], nightclass: ['neutral', 'happy'] },
    farah: { default: 'school', school: ['neutral', 'happy', 'angry'], camp: ['neutral', 'happy'], festive: ['neutral', 'happy'] },
    nurse: { default: 'health', health: ['neutral', 'happy', 'sad'], camp: ['neutral', 'happy'], polyclinic: ['neutral', 'happy'] },
    joy: { default: 'work', work: ['neutral', 'happy', 'sad'], festive: ['neutral', 'happy'], sunday: ['neutral', 'happy'] },
    takumi: { default: 'uniform', uniform: ['neutral', 'sad', 'surprised', 'smug', 'cool'], casual: ['neutral', 'smug'], council: ['neutral', 'smug'] },
    ren: { default: 'uniform', uniform: ['neutral', 'sad', 'smug'], ns: ['neutral', 'sad'], street: ['neutral', 'smug'] },
    saki: { default: 'chalet', chalet: ['neutral', 'happy', 'sad'], crew: ['neutral', 'happy'], occasion: ['neutral', 'happy'] }
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
  },
  // Same lookup order as Art.character; CHAINS mirrors the expression fallback in js/art.js.
  sprite(id, expr, outfit) {
    const CHAINS = { blush: ['shy', 'happy'], shy: ['blush', 'sad'], sad: ['shy'], angry: ['cool', 'sad'],
      surprised: ['blush', 'happy'], smug: ['happy', 'cool'], scheme: ['smug', 'cool'], cool: ['smug'],
      happy: ['smug', 'blush'] };
    const art = this.chars[id];
    if (!art) return null;
    const e = expr || 'neutral';
    const set = outfit && art.outfits && art.outfits[outfit];
    if (set && (set[e] || set.neutral)) return set[e] || set.neutral;
    for (const k of [e, ...(CHAINS[e] || [])]) if (typeof art[k] === 'string') return art[k];
    return art.neutral || null;
  }
};
