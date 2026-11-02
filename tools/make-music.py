#!/usr/bin/env python3
"""Procedurally generates the sim4love background-music loops (original work, released CC0).

Every track is a seamless loop: it is rendered for an exact number of bars, and the reverb/decay tail that
spills past the loop end is folded back onto the start. Output: audio/<id>.mp3 (mono, 32 kHz, ~48 kbps).
Usage: python3 tools/make-music.py [track-id ...]   (needs numpy and ffmpeg)
"""
import os, subprocess, sys
import numpy as np

SR = 32000
OUT = os.path.join(os.path.dirname(__file__), '..', 'audio')
NOTE = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11}
QUAL = {'': [0, 4, 7], 'm': [0, 3, 7], 'maj7': [0, 4, 7, 11], 'm7': [0, 3, 7, 10], '7': [0, 4, 7, 10], 'add9': [0, 4, 7, 14],
        'madd9': [0, 3, 7, 14], 'sus2': [0, 2, 7], 'sus4': [0, 5, 7], 'm9': [0, 3, 7, 10, 14], 'maj9': [0, 4, 7, 11, 14], '6': [0, 4, 7, 9]}


def chord(name, octave=4):
    root = name[:2] if len(name) > 1 and name[1] in '#b' else name[:1]
    q = name[len(root):]
    base = 12 * (octave + 1) + NOTE[root]
    return [base + i for i in QUAL[q]]


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env(n, a, d, s, r, hold):
    """ADSR envelope of n samples; hold = samples before release starts."""
    e = np.zeros(n)
    a, d, r = max(1, int(a * SR)), max(1, int(d * SR)), max(1, int(r * SR))
    hold = max(hold, a + 1)
    t = np.arange(n)
    e = np.where(t < a, t / a, s + (1 - s) * np.exp(-(t - a) / d))
    rel = t >= hold
    level = e[min(hold, n - 1)]
    e[rel] = level * np.exp(-(t[rel] - hold) / r)
    return e


class Track:
    def __init__(self, bpm, bars, beats=4, seed=1):
        self.bpm, self.bars, self.beats = bpm, bars, beats
        self.beat = 60.0 / bpm
        self.len = int(round(bars * beats * self.beat * SR))
        self.buf = np.zeros(self.len + SR * 6)
        self.rng = np.random.default_rng(seed)

    def at(self, beat):
        return int(round(beat * self.beat * SR))

    def add(self, start, sig, gain=1.0):
        s = self.at(start)
        self.buf[s:s + len(sig)] += sig[: len(self.buf) - s] * gain

    # ---- instruments ----
    def tone(self, m, dur, kind='piano', gain=0.2, start=0.0):
        f = hz(m)
        hold = int(dur * self.beat * SR)
        if kind == 'piano':
            n = hold + int(1.2 * SR); t = np.arange(n) / SR
            sig = sum((0.6 ** k) * np.sin(2 * np.pi * f * (k + 1) * t * (1 + 0.0004 * k)) * np.exp(-t * (1.6 + 1.2 * k)) for k in range(5))
            sig *= env(n, 0.004, 0.6, 0.35, 0.35, hold)
        elif kind == 'pluck':
            n = hold + int(0.6 * SR); t = np.arange(n) / SR
            sig = sum((0.5 ** k) * np.sin(2 * np.pi * f * (k + 1) * t) * np.exp(-t * (4 + 3 * k)) for k in range(6))
            sig *= env(n, 0.002, 0.25, 0.0, 0.15, hold)
        elif kind == 'bell':
            n = hold + int(2.0 * SR); t = np.arange(n) / SR
            sig = (np.sin(2 * np.pi * f * t) * np.exp(-t * 1.4) + 0.4 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 3)
                   + 0.2 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 6))
            sig *= env(n, 0.002, 1.0, 0.6, 0.8, hold)
        elif kind == 'marimba':
            n = hold + int(0.5 * SR); t = np.arange(n) / SR
            sig = (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 20)) * np.exp(-t * 6)
            sig *= env(n, 0.002, 0.3, 0.0, 0.1, hold)
        elif kind == 'flute':
            n = hold + int(0.4 * SR); t = np.arange(n) / SR
            vib = 1 + 0.006 * np.sin(2 * np.pi * 5.2 * t) * np.clip(t * 2, 0, 1)
            ph = 2 * np.pi * f * np.cumsum(vib) / SR
            sig = np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.05 * np.sin(3 * ph) + 0.02 * self.rng.standard_normal(n)
            sig *= env(n, 0.08, 0.3, 0.8, 0.2, hold)
        elif kind == 'pad':
            n = hold + int(1.5 * SR); t = np.arange(n) / SR
            sig = np.zeros(n)
            for det in (-0.006, 0, 0.007):
                ph = 2 * np.pi * f * (1 + det) * t + self.rng.uniform(0, 6.28)
                sig += sum(np.sin(ph * (k + 1)) / (k + 1) ** 1.6 for k in range(5))
            sig *= env(n, 0.9, 1.5, 0.8, 1.0, hold) / 3
        elif kind == 'bass':
            n = hold + int(0.3 * SR); t = np.arange(n) / SR
            sig = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) * np.exp(-t * 8)
            sig *= env(n, 0.01, 0.4, 0.6, 0.12, hold)
        elif kind == 'drone':
            n = hold + int(1.0 * SR); t = np.arange(n) / SR
            sig = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.5 * t + 1) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.2 * t))
            sig *= env(n, 1.5, 2.0, 0.9, 1.0, hold)
        self.add(start, sig, gain)

    def kick(self, start, gain=0.35):
        n = int(0.35 * SR); t = np.arange(n) / SR
        f = 45 + 90 * np.exp(-t * 30)
        self.add(start, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9), gain)

    def hat(self, start, gain=0.05, decay=40):
        n = int(0.12 * SR); t = np.arange(n) / SR
        x = self.rng.standard_normal(n); x = np.diff(x, prepend=0)
        self.add(start, x * np.exp(-t * decay), gain)

    def snare(self, start, gain=0.12):
        n = int(0.25 * SR); t = np.arange(n) / SR
        x = self.rng.standard_normal(n) * np.exp(-t * 18) + 0.5 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 25)
        self.add(start, x, gain)

    def shaker(self, start, gain=0.03):
        n = int(0.09 * SR); t = np.arange(n) / SR
        x = np.diff(self.rng.standard_normal(n), prepend=0)
        self.add(start, x * np.sin(np.pi * t / t[-1]) ** 2, gain)

    # ---- mixdown ----
    def render(self, name, reverb=0.25, lowpass=0.0):
        x = self.buf.copy()
        if reverb:
            n = int(2.4 * SR); t = np.arange(n) / SR
            ir = self.rng.standard_normal(n) * np.exp(-t * 2.6); ir[0] = 0
            ir /= np.sqrt(np.sum(ir ** 2))
            L = len(x) + n
            wet = np.fft.irfft(np.fft.rfft(x, L) * np.fft.rfft(ir, L), L)[: len(x)]
            x = x + reverb * wet
        if lowpass:  # gentle one-pole smoothing, done in the frequency domain
            X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / SR)
            X /= np.sqrt(1 + (fr / lowpass) ** 2); x = np.fft.irfft(X, len(x))
        loop = x[: self.len].copy()
        tail = x[self.len:]
        loop[: len(tail)] += tail[: self.len]          # fold the tail back so the loop is seamless
        loop -= np.mean(loop)
        loop *= 0.7 / (np.max(np.abs(loop)) + 1e-9)
        loop = np.tanh(loop * 1.2) / np.tanh(1.2)
        os.makedirs(OUT, exist_ok=True)
        raw = (np.clip(loop, -1, 1) * 32767).astype('<i2').tobytes()
        path = os.path.join(OUT, name + '.mp3')
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                        '-codec:a', 'libmp3lame', '-b:a', '48k', path], input=raw, check=True)
        print(f'{name}: {self.len / SR:.1f}s, {os.path.getsize(path) // 1024} KB')


def arp(tr, chords, pattern, step, kind, gain, octave_up=0, beats_per_chord=4, start_bar=0):
    b = start_bar * tr.beats
    for ch in chords:
        notes = chord(ch, 4 + octave_up)
        i = 0.0
        while i < beats_per_chord - 1e-9:
            idx = pattern[int(round(i / step)) % len(pattern)]
            if idx is not None:
                m = notes[idx % len(notes)] + 12 * (idx // len(notes))
                tr.tone(m, step * 1.5, kind, gain, b + i)
            i += step
        b += beats_per_chord


def pads(tr, chords, kind='pad', gain=0.08, octave=3, beats_per_chord=4):
    b = 0
    for ch in chords:
        for m in chord(ch, octave):
            tr.tone(m, beats_per_chord, kind, gain, b)
        b += beats_per_chord


def bassline(tr, chords, rhythm, gain=0.25, beats_per_chord=4, octave=2):
    b = 0
    for ch in chords:
        r = chord(ch, octave)[0]
        for (off, dur, iv) in rhythm:
            tr.tone(r + iv, dur, 'bass', gain, b + off)
        b += beats_per_chord


def melody(tr, notes, kind, gain, start=0):
    """notes: list of (midi or None, beats)."""
    b = start
    for m, d in notes:
        if m is not None:
            tr.tone(m, d * 0.95, kind, gain, b)
        b += d


def title():
    ch = ['Cmaj7', 'Am7', 'Fmaj7', 'G', 'Cmaj7', 'Em7' if False else 'Am7', 'Dm7', 'G']
    tr = Track(84, 8, seed=11)
    pads(tr, ch, gain=0.05)
    arp(tr, ch, [0, 1, 2, 3, 2, 1, 0, 2], 0.5, 'piano', 0.12)
    bassline(tr, ch, [(0, 2, 0), (2, 2, 7)], 0.18)
    mel = [(76, 1.5), (74, .5), (72, 2), (72, 1.5), (71, .5), (69, 2), (69, 1.5), (71, .5), (72, 2), (74, 3), (None, 1),
           (76, 1.5), (79, .5), (76, 2), (72, 1.5), (74, .5), (72, 2), (74, 1.5), (72, .5), (69, 2), (71, 4)]
    melody(tr, mel, 'bell', 0.07)
    tr.render('title', 0.35)


def school():
    ch = ['D', 'A', 'Bm', 'G', 'D', 'A', 'G', 'A']
    tr = Track(112, 8, seed=12)
    arp(tr, ch, [0, 2, 1, 2], 0.5, 'pluck', 0.12, 1)
    bassline(tr, ch, [(0, 1, 0), (1.5, .5, 0), (2, 1, 7), (3, 1, 12)], 0.2)
    pads(tr, ch, gain=0.035)
    for bar in range(8):
        for k in range(4):
            b = bar * 4 + k
            if k in (0, 2): tr.kick(b, 0.25)
            if k in (1, 3): tr.snare(b, 0.06)
            tr.hat(b + 0.5, 0.04)
    mel = [(78, 1), (76, .5), (74, .5), (76, 2), (73, 1), (74, .5), (76, .5), (73, 2), (74, 1), (76, .5), (78, .5), (81, 2),
           (79, 1), (78, .5), (76, .5), (74, 2), (78, 1), (76, .5), (74, .5), (76, 2), (73, 1), (74, .5), (76, .5), (78, 2),
           (79, 1), (78, .5), (76, .5), (74, 1), (71, 1), (73, 2), (69, 2)]
    melody(tr, mel, 'marimba', 0.1)
    tr.render('school', 0.18)


def home():
    ch = ['Fmaj7', 'Dm7', 'Bbmaj7', 'C', 'Fmaj7', 'Am7', 'Bbmaj7', 'Csus4']
    tr = Track(70, 8, seed=13)
    pads(tr, ch, gain=0.06)
    arp(tr, ch, [0, None, 2, None, 1, None, 3, None], 0.5, 'piano', 0.11)
    bassline(tr, ch, [(0, 4, 0)], 0.16)
    tr.render('home', 0.35, lowpass=3500)


def city():
    ch = ['G', 'F', 'C', 'G', 'G', 'F', 'Am', 'D']
    tr = Track(100, 8, seed=14)
    arp(tr, ch, [0, 2, None, 1, 2, None, 0, 2], 0.5, 'marimba', 0.11, 1)
    bassline(tr, ch, [(0, .75, 0), (1, .5, 12), (1.5, .5, 7), (2.5, .5, 0), (3, 1, 10)], 0.22)
    for bar in range(8):
        for k in range(4):
            b = bar * 4 + k
            if k in (0, 2): tr.kick(b, 0.24)
            if k in (1, 3): tr.snare(b, 0.07)
            for s in (0, .25, .5, .75): tr.shaker(b + s, 0.03 if s else 0.045)
    tr.render('city', 0.15)


def night():
    ch = ['Ebmaj7', 'Fadd9' if False else 'F', 'Gm7', 'Ebmaj7', 'Cm7', 'Bb', 'Ab', 'Bbsus4']
    tr = Track(76, 8, seed=15)
    pads(tr, ch, gain=0.06)
    arp(tr, ch, [0, 1, 2, 3, 4, 3, 2, 1], 0.5, 'bell', 0.06, 1)
    bassline(tr, ch, [(0, 3, 0), (3, 1, 7)], 0.14)
    tr.render('night', 0.45)


def tense():
    ch = ['Dm', 'Dm', 'Bb', 'A', 'Dm', 'Dm', 'Gm', 'A']
    tr = Track(96, 8, seed=16)
    for bar, c in enumerate(ch):
        r = chord(c, 2)[0]
        for k in range(8):
            tr.tone(r, 0.4, 'bass', 0.2 if k % 2 == 0 else 0.13, bar * 4 + k * 0.5)
        tr.tone(chord(c, 3)[0], 4, 'drone', 0.07, bar * 4)
        tr.kick(bar * 4, 0.3); tr.kick(bar * 4 + 2.5, 0.18)
    arp(tr, ch, [2, None, 1, None, 2, 0, None, 1], 0.5, 'pluck', 0.08, 1)
    for b in range(32): tr.hat(b + 0.5, 0.03, 60)
    tr.render('tense', 0.22, lowpass=4000)


def sad():
    ch = ['Am', 'F', 'C', 'G', 'Am', 'F', 'Dm', 'E']
    tr = Track(60, 8, seed=17)
    pads(tr, ch, gain=0.05)
    arp(tr, ch, [0, 1, 2, 1], 1, 'piano', 0.1)
    mel = [(76, 3), (74, 1), (72, 3), (71, 1), (72, 3), (74, 1), (71, 4), (72, 3), (69, 1), (72, 2), (74, 2), (77, 3), (76, 1), (76, 4)]
    melody(tr, mel, 'piano', 0.09)
    tr.render('sad', 0.4, lowpass=3000)


def romance():
    ch = ['Bbmaj7', 'Gm7', 'Ebmaj7', 'F', 'Bbmaj7', 'Dm7', 'Ebmaj7', 'F']
    tr = Track(72, 8, seed=18)
    pads(tr, ch, gain=0.055)
    arp(tr, ch, [0, 2, 1, 3], 1, 'piano', 0.09)
    mel = [(77, 1), (79, 1), (81, 2), (79, 1), (77, 1), (74, 2), (75, 1), (77, 1), (79, 2), (77, 4),
           (77, 1), (79, 1), (81, 2), (82, 1), (81, 1), (77, 2), (79, 1), (77, 1), (75, 1), (74, 1), (72, 4)]
    melody(tr, mel, 'bell', 0.06, 0)
    tr.render('romance', 0.4)


def outdoor():
    ch = ['G', 'Em', 'C', 'D', 'G', 'Em', 'Am', 'D']
    tr = Track(92, 8, seed=19)
    arp(tr, ch, [0, 1, 2, 3, 2, 1], 2 / 3, 'pluck', 0.11)
    bassline(tr, ch, [(0, 2, 0), (2, 2, 7)], 0.16)
    pads(tr, ch, gain=0.03)
    pent = [67, 69, 71, 74, 76, 79]
    mel = [(74, 1.5), (76, .5), (79, 2), (76, 1), (74, 1), (71, 2), (72, 1.5), (74, .5), (76, 2), (74, 4),
           (79, 1.5), (81, .5), (79, 1), (76, 1), (74, 2), (71, 2), (72, 1.5), (71, .5), (69, 2), (74, 4)]
    melody(tr, mel, 'flute', 0.08)
    for b in range(32): tr.shaker(b + 0.5, 0.02)
    tr.render('outdoor', 0.3)


def reflect():
    ch = ['Emadd9', 'Cmaj7', 'G', 'Dsus2' if False else 'D']
    tr = Track(60, 8, seed=20)
    pads(tr, ch, gain=0.07, beats_per_chord=8)
    for bar in range(8):
        notes = [71, 74, 76, 78, 79, 83]
        for k in (0, 2.5):
            tr.tone(int(tr.rng.choice(notes)), 2, 'bell', 0.045, bar * 4 + k)
    bassline(tr, ch, [(0, 8, 0)], 0.1, beats_per_chord=8)
    tr.render('reflect', 0.5, lowpass=3200)


TRACKS = dict(title=title, school=school, home=home, city=city, night=night, tense=tense, sad=sad,
              romance=romance, outdoor=outdoor, reflect=reflect)

if __name__ == '__main__':
    for name in (sys.argv[1:] or TRACKS):
        TRACKS[name]()
