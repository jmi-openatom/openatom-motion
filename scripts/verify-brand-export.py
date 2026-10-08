"""Inspect final encoded streams and measure AAC timing against the original score."""
import json
import io
import os
import subprocess
import sys
import wave
from pathlib import Path
import numpy as np

film = Path(sys.argv[1] if len(sys.argv) > 1 else 'out/jmi-openatom-brand-film-v7-60fps.mp4')
bin_dir = Path('node_modules/@remotion/compositor-darwin-arm64').resolve()
env = dict(os.environ, DYLD_LIBRARY_PATH=str(bin_dir))
metadata = json.loads(subprocess.check_output([str(bin_dir/'ffprobe'), '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(film)], env=env))
video = next(s for s in metadata['streams'] if s['codec_type'] == 'video')
audio = next(s for s in metadata['streams'] if s['codec_type'] == 'audio')
score = json.loads(Path('src/brand/full-score.json').read_text())
expected = score['beats']*60/score['bpm']
assert (video['width'], video['height']) == (1920, 1080)
assert video['r_frame_rate'] == '60/1'
assert int(video['nb_frames']) == round(expected*60)
assert abs(float(video['duration'])-expected) <= 1/60
# AAC's last packet may extend the container by up to 1024 output samples.
assert abs(float(metadata['format']['duration'])-expected) <= 1024/int(audio['sample_rate'])
assert audio['codec_name'] == 'aac'
with wave.open('public/audio/brand-film.wav') as w:
    sr = w.getframerate()
    source = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').reshape(-1, 2).mean(axis=1)
pcm = subprocess.check_output([str(bin_dir/'ffmpeg'), '-hide_banner', '-loglevel', 'error', '-i', str(film), '-vn', '-ac', '2', '-ar', str(sr), '-f', 'wav', '-acodec', 'pcm_s16le', 'pipe:1'], env=env)
with wave.open(io.BytesIO(pcm)) as w:
    decoded = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').reshape(-1, 2).mean(axis=1)
rows = []
# Cross-correlate unique cue neighborhoods; any systematic encode delay appears here.
for cue in [*score['communityWords'], {'beat':126}, {'beat':142}, {'beat':166}]:
    frame = round(cue['beat']*60*60/score['bpm'])
    center = int(np.floor(frame*sr/60+.5))
    start = center-2048
    reference = source[start:start+8192]
    padding = 882  # Search +/-20ms, finer than a single 60fps video frame.
    actual = decoded[start-padding:start+8192+padding]
    size = 1 << (len(reference)+len(actual)-1).bit_length()
    correlation = np.fft.irfft(np.fft.rfft(actual, size)*np.fft.rfft(reference[::-1], size), size)
    correlation = correlation[len(reference)-1:len(actual)]
    lag = int(np.argmax(correlation))-padding
    aligned = actual[padding+lag:padding+lag+len(reference)]
    similarity = float(np.corrcoef(reference, aligned)[0,1])
    assert abs(lag) < sr/60, f'Encoded audio timing shift at beat {cue["beat"]}: {lag/sr}s'
    assert similarity > .95, f'Encoded score mismatch at beat {cue["beat"]}'
    rows.append({'beat':cue['beat'], 'offsetSamples':lag, 'offsetMs':lag/sr*1000, 'similarity':round(similarity,5)})
report = {'file':str(film.resolve()), 'durationSeconds':expected, 'width':1920, 'height':1080, 'fps':60, 'frames':int(video['nb_frames']), 'videoCodec':video['codec_name'], 'audioCodec':audio['codec_name'], 'bytes':film.stat().st_size, 'encodedAudioChecks':rows, 'slogan':'开源筑梦，海事启航'}
Path('out/brand-film-export-manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
