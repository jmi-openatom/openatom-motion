"""Original 75-second chiptune score. Deterministic; no sampled copyrighted music.
Requires numpy; outputs public/music/bgm.wav. Render project itself needs only npm.
"""
from pathlib import Path
import wave
import numpy as np

RATE = 44100
DURATION = 75
BPM = 112
BEAT = 60 / BPM
rng = np.random.default_rng(20261003)
mix = np.zeros((RATE * DURATION, 2), dtype=np.float64)

def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)

def add(t0, sound, volume=1., pan=0.):
    at = int(t0 * RATE)
    if at < 0:
        sound = sound[-at:]
        at = 0
    length = min(len(sound), len(mix) - at)
    if length <= 0:
        return
    gains = np.array([np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)])
    mix[at:at+length] += sound[:length, None] * gains * volume

def note(midi, duration, kind='triangle', release=.05):
    t = np.arange(int(duration * RATE)) / RATE
    freq = hz(midi)
    phase = (t * freq) % 1
    if kind == 'pulse':
        # Finite harmonic sum keeps the retro timbre without alias-heavy raw squares.
        raw = sum(np.sin(2*np.pi*t*freq*k)/k for k in [1, 3, 5, 7]) / 1.3
    elif kind == 'sine':
        raw = np.sin(2*np.pi*t*freq)
    else:
        raw = 2*np.abs(2*phase-1)-1
    env = np.minimum(1, t/.009) * np.minimum(1, np.maximum(0, duration-t)/release)
    return raw * env

chords = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 60, 65, 69], [48, 55, 60, 64]]

# Soft, slowly evolving harmonic foundation.
for b in range(0, 140, 8):
    at = b * BEAT
    chord = chords[(b//8) % 4]
    for i, m in enumerate(chord):
        duration = min(8*BEAT+.45, DURATION-at)
        if duration <= 0:
            continue
        t = np.arange(int(duration*RATE))/RATE
        pad = note(m+12, duration, 'sine', .8) * np.minimum(1,t/.7)
        add(at, pad, .04 if at<6 else .06, (-.5+i/3))

for b in range(12, 140):
    at = b * BEAT
    if at > 73:
        break
    section = .55 if at < 14 else 1 if at < 39 else .65 if at < 49 else 1.15 if at < 68 else .6
    chord = chords[(b//8) % 4]
    # Triangle bass, restrained first section.
    add(at, note(chord[0]-12, BEAT*.78, 'triangle'), .16*section, -.04)
    # Two arpeggio steps per beat; gives familiar retro-game momentum.
    for j in range(2):
        m = chord[(b*2+j)%4]+24
        sound = note(m, BEAT*.41, 'pulse')
        pan = -.3 if j==0 else .3
        add(at+j*BEAT/2, sound, .057*section, pan)
        add(at+j*BEAT/2+.19, sound, .016*section, -pan)
    if 14 <= at < 68:
        # Original synthetic kick, snare and bit-noise hat.
        if b%2==0:
            t=np.arange(int(.24*RATE))/RATE
            frequency=47+110*np.exp(-t*35)
            kick=np.sin(2*np.pi*np.cumsum(frequency)/RATE)*np.exp(-t*19)
            add(at,kick,.24*section)
        if b%4==2:
            t=np.arange(int(.17*RATE))/RATE
            noise=rng.uniform(-1,1,len(t))
            noise=np.repeat(noise[::4],4)[:len(t)]
            snare=(noise*.6+np.sin(2*np.pi*t*170)*.3)*np.exp(-t*28)
            add(at,snare,.12*section,.1)
        t=np.arange(int(.044*RATE))/RATE
        hat=rng.uniform(-1,1,len(t))*np.exp(-t*90)
        add(at+BEAT/2,hat,.032*section,.36)

# Keypresses and scene-change arcade sweeps.
for at in np.arange(.26, 2.0, .073):
    t=np.arange(int(.018*RATE))/RATE
    add(at,np.sin(2*np.pi*t*(1100+rng.integers(500)))*np.exp(-t*240),.025,-.12)
for at in [5.8,13.8,25.8,38.8,48.8,58.8,67.8]:
    t=np.arange(int(.45*RATE))/RATE
    sweep=np.sin(2*np.pi*(180*t+900*t*t))*np.sin(np.pi*t/.45)**2
    add(at,sweep,.045,-.2)

# Short final resolution.
for at,m in [(68.25,74),(68.5,77),(68.75,81),(69.05,86)]:
    add(at,note(m,1.6,'triangle',1.1),.09)

# Subtle, deterministic stereo ambience and fade.
for delay, gain in [(int(.13*RATE),.10),(int(.29*RATE),.07)]:
    dry=mix.copy()
    mix[delay:] += dry[:-delay, ::-1]*gain
fade_in=np.minimum(1,np.arange(len(mix))/RATE/.5)
fade_out=np.minimum(1,np.maximum(0,DURATION-np.arange(len(mix))/RATE)/2.4)
mix *= (fade_in*fade_out)[:,None]
mix=np.tanh(mix*1.6)
mix *= .86 / max(np.max(np.abs(mix)),.01)
path=Path(__file__).resolve().parent.parent/'public/music/bgm.wav'
with wave.open(str(path),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(RATE)
    f.writeframes((mix*32767).astype('<i2').tobytes())
print(f'Generated original chiptune score: {path} ({DURATION}s, {BPM} BPM)')
