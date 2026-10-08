"""Deterministic original sound design, layered over (never replaces) supplied music.
Run with Python + numpy. Playback/render needs only npm; WAV is checked in.
All cue times derive from src/audio/score.json.
"""
import json,wave
from pathlib import Path
import numpy as np
root=Path(__file__).resolve().parent.parent
score=json.loads((root/'src/audio/score.json').read_text())
sr=32000;duration=75;beat=60/score['bpm'];rng=np.random.default_rng(3010)
mix=np.zeros((int(sr*duration),2),dtype=np.float64)
def add(at,sound,gain=.3,pan=0):
 start=int(at*sr)
 if start<0:sound=sound[-start:];start=0
 n=min(len(sound),len(mix)-start)
 if n<=0:return
 if np.isscalar(pan):pan=np.full(n,pan)
 else:pan=pan[:n]
 mix[start:start+n,0]+=sound[:n]*np.sqrt((1-pan)/2)*gain
 mix[start:start+n,1]+=sound[:n]*np.sqrt((1+pan)/2)*gain
def noise(t):
 n=rng.normal(0,1,len(t));return n-np.roll(n,1)*.85
def boom(at,gain=.6):
 t=np.arange(int(sr*.95))/sr
 tone=np.sin(2*np.pi*(43*t+72*(1-np.exp(-t*22))/22))*np.exp(-t*5)
 click=noise(t)*np.exp(-t*45)*.12
 add(at,tone+click,gain)
def whoosh(at,direction=1,d=.38,gain=.15):
 t=np.arange(int(sr*d))/sr;e=np.sin(np.pi*t/d)**3
 n=noise(t);s=(n*.3+np.sin(2*np.pi*(220*t+700*t*t))*.15)*e
 add(at,s,gain,np.linspace(-.85,.85,len(t))*direction)
for at in np.arange(.25,2.4,.095):
 t=np.arange(int(.015*sr))/sr;add(at,np.sin(2*np.pi*2100*t)*np.exp(-t*230),.09,-.18)
for b in score['impacts']:boom(b*beat,.8 if b in [12,120,128.5] else .35)
for i,b in enumerate([34,36,38,39,40,42,44,45,46,48,50,52,62,66,70,74]):whoosh(b*beat-.17,1 if i%2 else -1)
for start,end in [(8,12),(108,120)]:
 d=(end-start)*beat;t=np.arange(int(d*sr))/sr;u=t/d
 s=(noise(t)*.12+np.sin(2*np.pi*(90*t+30*t*t))* .04)*u**2
 add(start*beat,s,.7,np.sin(u*7)*.5)
# Subtle data-room hum; stereo packets alternate with camera banking.
for b in range(34,74,2):
 t=np.arange(int(.26*sr))/sr;add(b*beat,np.sin(2*np.pi*(720*t+900*t*t))*np.exp(-t*21),.045,(-1 if b%4 else 1)*.7)
# Exact 0.268-second silence shared with visual timeline, including tails.
start,end,_=score['sections']['silence'];mix[int(start*beat*sr):int(end*beat*sr)]=0
mix*=np.minimum(1,np.maximum(0,75-np.arange(len(mix))/sr)/1.2)[:,None]
mix=np.tanh(mix)*.85
path=root/'public/audio/sound-design.wav'
with wave.open(str(path),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((mix*32767).astype('<i2').tobytes())
print(path)
