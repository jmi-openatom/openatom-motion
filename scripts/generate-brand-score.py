"""Original 128-BPM brand study score. 32 beats / 15s. No reference audio sampled."""
from pathlib import Path
import wave
import numpy as np
sr=44100;beat=60/128;duration=15;rng=np.random.default_rng(128)
x=np.zeros((sr*duration,2))
def add(at,s,gain=1,pan=0):
 start=int(at*sr)
 if start<0:s=s[-start:];start=0
 n=min(len(s),len(x)-start)
 if n<1:return
 x[start:start+n,0]+=s[:n]*gain*np.sqrt((1-pan)/2);x[start:start+n,1]+=s[:n]*gain*np.sqrt((1+pan)/2)
def kick(at,gain=.6):
 t=np.arange(int(.36*sr))/sr;p=48*t+110*(1-np.exp(-t*30))/30
 add(at,np.sin(2*np.pi*p)*np.exp(-t*12),gain)
def snare(at):
 t=np.arange(int(.14*sr))/sr;n=rng.normal(0,1,len(t));n=n-np.roll(n,1)*.7
 add(at,(n*.2+np.sin(2*np.pi*180*t)*.2)*np.exp(-t*30),.32,.1)
def whoosh(at,d=.2):
 t=np.arange(int(d*sr))/sr;n=rng.normal(0,1,len(t));add(at,n*np.sin(np.pi*t/d)**3,.045)
def bass(at,note,d=.3,gain=.12):
 t=np.arange(int(d*sr))/sr;freq=440*2**((note-69)/12);s=np.sin(2*np.pi*freq*t)+.18*np.sin(4*np.pi*freq*t)
 add(at,s*np.minimum(1,t/.008)*np.minimum(1,(d-t)/.08),gain)
# Quiet cursor, then dry transient-led groove.
for b in [0,.25,.5]:
 t=np.arange(int(.012*sr))/sr;add(b*beat,np.sin(2*np.pi*1800*t)*np.exp(-t*240),.1)
for b in range(1,32):
 if b>=29:continue
 if 8<=b<14:
  if b in [8,12]:kick(b*beat,.4)
  bass(b*beat,[45,52,57][b%3],.4,.055)
  continue
 if b%2==0 or b in [1,14,18,22,23,24,25,26]:kick(b*beat,.6)
 if b%2:snare(b*beat)
 bass(b*beat,[33,33,40,36][b%4],beat*.64,.14)
 for sub in [0,.5]:
  t=np.arange(int(.03*sr))/sr;n=rng.normal(0,1,len(t));add((b+sub)*beat,n*np.exp(-t*120),.036,-.35 if sub else .35)
for b in [4,8,14,16,18,22,26,29]:whoosh(b*beat-.18);kick(b*beat,.85)
# Product-shot crystal harmonics, then clean final brand chord.
for start,length,gain in [(8,6,.032),(29,3,.05)]:
 for i,note in enumerate([57,64,69,72]):
  d=length*beat;t=np.arange(int(d*sr))/sr;freq=440*2**((note-69)/12)
  s=(np.sin(2*np.pi*freq*t)+.1*np.sin(2*np.pi*freq*2.003*t))*np.minimum(1,t/.035)*np.exp(-t*1.4)
  add(start*beat,s,gain,(-.65+i*.4))
# Small breathing pocket before final lockup; a resolved tail ends at 15s.
x[int(28.6*beat*sr):int(29*beat*sr)]*=.08
x*=np.minimum(1,(duration-np.arange(len(x))/sr)/.25)[:,None]
x=np.tanh(x*1.3);x*=.86/max(.86,float(np.max(np.abs(x))))
p=Path('public/audio/brand-study.wav')
with wave.open(str(p),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype('<i2').tobytes())
print(p)
