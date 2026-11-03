# Music credits

All background music in sim4love is **original work, procedurally generated** for this game by
[`tools/make-music.py`](../tools/make-music.py) (numpy synthesis, rendered to MP3 with ffmpeg). No samples,
loops, presets or third-party recordings are used.

**License: [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) (public domain dedication).**
You may copy, modify and redistribute the tracks for any purpose without asking or crediting.

| Track id | Mood | File | Loop | Size | Sound | Used for |
|---|---|---|---|---|---|---|
| `title` | Title / endings | `audio/title.mp3` | 22.857 s | 134 KB | C major, gentle synth keys and pad (I–vi–IV–V) | title screen, key art, ending screens |
| `school` | School day | `audio/school.mp3` | 17.143 s | 101 KB | D major, light plucks and soft beat | classroom, library, lecture, field, camp, graduation hall |
| `home` | Home | `audio/home.mp3` | 27.429 s | 161 KB | F major, warm electric-piano-style chords | bedroom, apartment, dining, void deck |
| `city` | Out and about | `audio/city.mp3` | 19.2 s | 113 KB | G major, bright mixolydian groove | hawker centre, mall, café, street, MRT, karaoke, party room, carnival |
| `night` | Night | `audio/night.mp3` | 25.263 s | 148 KB | E♭ major, slow pad and bells | night, fireworks, rooftop, campsite at night |
| `tense` | Tension | `audio/tense.mp3` | 20 s | 117 KB | D minor, pulsing bass and low strings | polyclinic, health room; scam scene override |
| `sad` | Bad end | `audio/sad.mp3` | 32 s | 187 KB | A minor, sparse synth keys | bad-end screen background |
| `romance` | Romance | `audio/romance.mp3` | 26.667 s | 156 KB | B♭ major, soft melody over maj7 chords | script override only: confessions, dates |
| `outdoor` | Outdoors | `audio/outdoor.mp3` | 20.87 s | 122 KB | G major pentatonic, airy plucks | park, beach, campsite, Sentosa, airport |
| `reflect` | Reflection | `audio/reflect.mp3` | 32 s | 187 KB | E minor add9, slow arpeggio | Think Deeper cards; script override for quiet talks |

Total: 1.4 MB for 10 tracks (mono, 32 kHz, ~48 kbps MP3).

## How it is wired

- `js/data/music.js` maps every background id to a track (`byBg`) and names the tracks for special moments
  (`moments.deeper`, `moments.ending`). `tests/validate.js` fails if a background has no track, a track file is
  missing, or a script uses an unknown `{bgm}` id.
- A script can override the mood with `{ bgm: 'romance' }`; the next `{ bg }` (or `{ bgm: 'auto' }`) returns
  to the background's default.
- The engine (WebAudio) crossfades for 1.6 s between tracks, loops sample-accurately, starts only after the
  player's first tap or key press, and pauses while the tab is hidden.
- Volume and mute live in Settings (gear icon) and persist in `localStorage`. Music is on by default.

## Regenerating

```bash
pip install numpy   # ffmpeg must be on PATH
python3 tools/make-music.py            # all tracks
python3 tools/make-music.py romance    # one track
```

If a loop length changes, update `loop` in `js/data/music.js` (the script prints each track length).
