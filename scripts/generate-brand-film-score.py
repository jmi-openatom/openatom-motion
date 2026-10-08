"""Original brand-film score; native 60fps onsets, no reference-audio samples."""
from pathlib import Path
import json
import wave
import numpy as np

score = json.loads(Path('src/brand/full-score.json').read_text())
sr = 44100
fps = score['fps']
beat = 60 / score['bpm']
duration = score['beats'] * beat
rng = np.random.default_rng(128)
x = np.zeros((round(sr * duration), 2))
sections = {s['name']: s for s in score['sections']}
build = sections['build']['start']
creed = sections['creed']['start']
outro = sections['outro']['start']
receipts = []


def add(at, signal, gain=1, pan=0, label=None):
    frame = int(np.floor(at * fps + .5))
    start = int(np.floor(frame * sr / fps + .5))
    if label:
        receipts.append({'label': label, 'frame': frame, 'sample': start})
    if start < 0:
        signal = signal[-start:]
        start = 0
    n = min(len(signal), len(x) - start)
    if n < 1:
        return
    x[start:start+n, 0] += signal[:n] * gain * np.sqrt((1-pan)/2)
    x[start:start+n, 1] += signal[:n] * gain * np.sqrt((1+pan)/2)


def kick(at, gain=.6):
    t = np.arange(int(.36 * sr)) / sr
    phase = 48*t + 110*(1-np.exp(-t*30))/30
    add(at, np.sin(2*np.pi*phase) * np.exp(-t*12), gain)


def snare(at, gain=1):
    t = np.arange(int(.14*sr)) / sr
    noise = rng.normal(0, 1, len(t))
    noise -= np.roll(noise, 1)*.7
    add(at, (noise*.2 + np.sin(2*np.pi*180*t)*.2)*np.exp(-t*30), .32*gain, .1)


def whoosh(at, d=.2):
    t = np.arange(int(d*sr)) / sr
    add(at, rng.normal(0, 1, len(t))*np.sin(np.pi*t/d)**3, .045)


def bass(at, note, d=.3, gain=.12):
    t = np.arange(int(d*sr)) / sr
    freq = 440*2**((note-69)/12)
    signal = np.sin(2*np.pi*freq*t) + .18*np.sin(4*np.pi*freq*t)
    add(at, signal*np.minimum(1, t/.008)*np.minimum(1, (d-t)/.08), gain)


def accent(b, label, freq=1350, gain=.062):
    t = np.arange(int(.026*sr)) / sr
    add(b*beat, np.sin(2*np.pi*freq*t)*np.exp(-t*160), gain, .12, label)


def section(b):
    return next((s['name'] for s in score['sections'] if s['start'] <= b < s['end']), 'end')


chords = [[45, 52, 57, 60], [41, 48, 53, 57], [48, 55, 60, 64], [43, 50, 55, 59]]
for b in [0, .25, .5]:
    t = np.arange(int(.012*sr)) / sr
    add(b*beat, np.sin(2*np.pi*1800*t)*np.exp(-t*240), .1)
for b in range(1, score['beats']):
    if b >= outro+4:
        break
    sec = section(b)
    chord = chords[(b//8) % 4]
    quiet = sec in ['campus', 'sculpture']
    energy = .3 if quiet else .65 if sec in ['contribution', 'voyage'] else .75 if sec == 'community' else 1
    if not quiet:
        if b % 2 == 0 or sec == 'creed':
            kick(b*beat, .52*energy)
        if b % 2:
            snare(b*beat, energy)
        for sub in [0, .5]:
            t = np.arange(int(.03*sr)) / sr
            add((b+sub)*beat, rng.normal(0, 1, len(t))*np.exp(-t*120), .028*energy, -.35 if sub else .35)
    bass(b*beat, chord[0]-12, beat*.72, .095*energy)
    if b % 2 == 0:
        t = np.arange(int(beat*1.4*sr)) / sr
        freq = 440*2**((chord[(b//2) % 4]+12-69)/12)
        note = (np.sin(2*np.pi*freq*t)+.18*np.sin(2*np.pi*freq*2*t))*np.minimum(1, t/.006)*np.exp(-t*5)
        add(b*beat, note, .036 if quiet else .025, (-1 if b % 4 else 1)*.45)
        add(b*beat+.19, note, .01, (-1 if b % 4 else 1)*-.45)
for b in range(0, score['beats'], 8):
    if b >= outro+2:
        break
    chord = chords[(b//8) % 4]
    d = min(8, outro+2-b)*beat
    t = np.arange(int(d*sr)) / sr
    for i, note in enumerate(chord):
        freq = 440*2**((note-69)/12)
        waveform = np.sin(2*np.pi*freq*t)+.14*np.sin(2*np.pi*freq*1.003*t)
        env = np.minimum(1, t/.3)*np.minimum(1, (d-t)/.5)
        add(b*beat, waveform*env, .025 if section(b) == 'campus' else .013, -.6+i*.4)
for s in score['sections']:
    b = s['start']
    if s['name'] in ['code', 'campus', 'community']:
        continue
    whoosh(b*beat-.18)
    kick(b*beat, .85 if b >= creed else .7)
for b in [16, 37, 40, 43, 49, 52, 55, creed+4, creed+8, creed+12]:
    whoosh(b*beat-.13, .15)
# Creative sequences: paper folds / glass sparks land with the typography.
for cue in score['creativeCues']:
    b = cue['beat']
    accent(b, cue['label'], 1900 if b < sections['voyage']['start'] else 1100, .06)
    whoosh(b*beat-.16, .16)
    if b % 4 != 0:
        kick(b*beat, .38)
# Accelerating percussion follows the actual English build section.
build_length = sections['build']['end']-build
t = np.arange(int(build_length*beat*sr)) / sr
u = t/(build_length*beat)
add(build*beat, rng.normal(0, 1, len(t))*np.sin(np.pi*u/2)**4, .035)
for b in np.arange(build+8, build+16, .25):
    t = np.arange(int(.022*sr)) / sr
    add(b*beat, rng.normal(0, 1, len(t))*np.exp(-t*160), .021, -.5 if int(b*4) % 2 else .5)
word_cues = [*range(build, build+8), *np.arange(build+8, build+16, .5),
             *[sections['publish']['start']+i*3 for i in range(4)],
             *[creed+i*4+row for i in range(4) for row in range(2)],
             outro, outro+1, outro+2, outro+8, outro+9]
for b in word_cues:
    accent(float(b), f'type-{float(b):g}', gain=.045 if b >= outro else .062)
for cue in score['systemWords']:
    accent(cue['beat'], cue['text'], 1500, .045)
for cue in score['communityWords']:
    kick(cue['beat']*beat, .34)
    accent(cue['beat'], cue['text'], 1000, .06)
accent(sections['community']['start']+10, 'together', 900, .055)
# Sustained harmony carries the final expanding blue circle and logo resolve.
for j, note in enumerate([45, 52, 57, 60]):
    d = 5.5*beat
    t = np.arange(int(d*sr)) / sr
    freq = 440*2**((note-69)/12)
    env = np.minimum(1, t/.4)*np.minimum(1, (d-t)/.7)
    add((outro+2)*beat, np.sin(2*np.pi*freq*t)*env, .023, -.45+j*.3)
a, z = int((outro+4)*beat*sr), int((outro+7)*beat*sr)
u = np.linspace(0, 1, z-a)
x[a:z] *= (1-.65*(u*u*(3-2*u)))[:, None]
resolve = outro+6.5
kick(resolve*beat, .42)
accent(resolve, 'logo-resolve', 900, .035)
for i, note in enumerate([45, 52, 57, 60, 64]):
    d = 5.2
    t = np.arange(int(d*sr)) / sr
    freq = 440*2**((note-69)/12)
    signal = np.sin(2*np.pi*freq*t)*np.minimum(1, t/.04)*np.exp(-t*.9)
    add(resolve*beat, signal, .055, -.6+i*.3)
x *= np.minimum(1, (duration-np.arange(len(x))/sr)/.6)[:, None]
x = np.tanh(x*1.3)
x *= .86/max(.86, float(np.max(np.abs(x))))
p = Path('public/audio/brand-film.wav')
with wave.open(str(p), 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(sr)
    w.writeframes((x*32767).astype('<i2').tobytes())
Path('out/audio-onsets.json').write_text(json.dumps({'fps': fps, 'sampleRate': sr, 'duration': duration, 'cues': receipts}, indent=2, ensure_ascii=False))
print(f'{p}: {duration}s, {len(receipts)} recorded text/creative accents')
