"""Analyze supplied score without modifying it. Python + numpy, Remotion FFmpeg.
Stores measured tempo candidates, per-second RMS, and cue rationale.
"""
import json,os,subprocess,tempfile,wave
from pathlib import Path
import numpy as np
root=Path(__file__).resolve().parent.parent
binary=next((root/'node_modules/@remotion').glob('compositor-*/ffmpeg'))
env={**os.environ,'DYLD_LIBRARY_PATH':str(binary.parent)}
with tempfile.TemporaryDirectory() as temp:
 out=Path(temp)/'score.wav'
 subprocess.run([str(binary),'-v','error','-y','-i',str(root/'public/music/bgm.mp3'),'-ac','1','-ar','22050',str(out)],check=True,env=env)
 with wave.open(str(out)) as w:sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),'<i2')/32768
 hop=220;n=1024
 spectrum=np.array([np.abs(np.fft.rfft(x[i:i+n]*np.hanning(n))) for i in range(0,len(x)-n,hop)])
 flux=np.maximum(0,np.diff(np.log1p(spectrum),axis=0)).sum(axis=1);flux=np.maximum(0,flux-np.median(flux))
 scores=[]
 for bpm in np.arange(85,151,.1):
  lag=sr*60/bpm/hop
  score=sum(np.dot(flux[:-int(round(lag*k))],flux[int(round(lag*k)):])/len(flux)/k for k in [1,2,4]);scores.append((float(score),round(float(bpm),1)))
 rms=[round(float(np.sqrt(np.mean(x[i*sr:(i+1)*sr]**2))),5) for i in range(int(len(x)/sr))]
 result={'source':'public/music/bgm.mp3','duration':len(x)/sr,'tempoCandidates':sorted(scores,reverse=True)[:8],'chosenBPM':112,'method':'Positive log-spectral flux autocorrelation, 85–151 BPM; existing source synthesis script independently declares 112 BPM. Beat origin 0s from source.','rmsPerSecond':rms,'phrases':{'intro':'0–12 beats; keyboard and harmonic bed','firstMotionAccent':'12 beats: accompaniment entry, reinforced by original SFX','logoResolve':'28 beats: percussion section active','break':'74 beats: lower source RMS near 39s','community':'92 beats: source rises near 49s','finalBuild':'108–120 beats: rising SFX over source groove','finalDrop':'120 beats: designed impact; not claimed as an automatically detected source drop','silence':'128–128.5 beats: explicit final mix silence'}}
 (root/'docs/music-analysis.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
 print(json.dumps({k:result[k] for k in ['duration','chosenBPM','tempoCandidates']},indent=2))
