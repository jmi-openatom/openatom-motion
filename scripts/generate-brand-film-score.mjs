/**
 * Original score for the JMI-OPENATOM brand film.
 *
 * The arrangement deliberately reads the shared full-score.json manifest instead
 * of carrying a second duration or tempo. It is an all-synthesis score: no
 * recorded or third-party samples are used. Node's standard library is enough to
 * rebuild the delivery WAV on any machine that can render the Remotion project.
 */
import {mkdirSync, readFileSync, writeFileSync} from "node:fs";

const root = new URL("../", import.meta.url);
const score = JSON.parse(
  readFileSync(new URL("../src/brand/full-score.json", import.meta.url), "utf8"),
);

const sampleRate = 44_100;
const beatSeconds = 60 / score.bpm;
const sampleCount = Math.round(score.beats * beatSeconds * sampleRate);
const left = new Float32Array(sampleCount);
const right = new Float32Array(sampleCount);
const TAU = Math.PI * 2;
let seed = 0x4a4d4931;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const sampleAt = (seconds) => Math.round(seconds * sampleRate);
const noteHz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const easeInOut = (value) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};
const random = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return ((seed >>> 0) / 0xffffffff) * 2 - 1;
};
const gains = (pan) => {
  const angle = ((clamp(pan, -1, 1) + 1) * Math.PI) / 4;
  return [Math.cos(angle), Math.sin(angle)];
};
const envelope = (time, duration, attack, release) =>
  Math.min(1, time / attack) * Math.min(1, Math.max(0, duration - time) / release);

function mixSample(index, value, pan = 0) {
  if (index < 0 || index >= sampleCount) return;
  const [l, r] = gains(pan);
  left[index] += value * l;
  right[index] += value * r;
}

function addKick(at, gain = 0.42) {
  const start = sampleAt(at);
  const length = Math.min(Math.round(sampleRate * 0.46), sampleCount - start);
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const phase = TAU * (46 * time + (132 * (1 - Math.exp(-time * 28))) / 28);
    const body = Math.sin(phase) * Math.exp(-time * 11);
    const click = Math.sin(TAU * 2500 * time) * Math.exp(-time * 85) * 0.13;
    mixSample(start + i, (body + click) * gain);
  }
}

function addSnare(at, gain = 0.18, pan = 0.08) {
  const start = sampleAt(at);
  const length = Math.min(Math.round(sampleRate * 0.24), sampleCount - start);
  let previous = 0;
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const noise = random();
    const high = noise - previous * 0.84;
    previous = noise;
    const body = Math.sin(TAU * 185 * time) * Math.exp(-time * 27) * 0.36;
    mixSample(start + i, (high * 0.74 + body) * Math.exp(-time * 24) * gain, pan);
  }
}

function addHat(at, gain = 0.038, pan = 0) {
  const start = sampleAt(at);
  const length = Math.min(Math.round(sampleRate * 0.075), sampleCount - start);
  let previous = 0;
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const noise = random();
    const high = noise - previous;
    previous = noise;
    mixSample(start + i, high * Math.exp(-time * 78) * gain, pan);
  }
}

function addClap(at, gain = 0.11) {
  for (const offset of [0, 0.022, 0.044]) {
    const start = sampleAt(at + offset);
    const length = Math.min(Math.round(sampleRate * 0.11), sampleCount - start);
    let previous = 0;
    for (let i = 0; i < length; i++) {
      const time = i / sampleRate;
      const noise = random();
      const high = noise - previous * 0.7;
      previous = noise;
      mixSample(start + i, high * Math.exp(-time * 29) * gain * (1 - offset * 5));
    }
  }
}

function addBass(at, midi, duration, gain = 0.11, pan = -0.03) {
  const start = sampleAt(at);
  const length = Math.min(sampleAt(duration), sampleCount - start);
  const frequency = noteHz(midi);
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const phase = TAU * frequency * time;
    const sound = Math.sin(phase) + Math.sin(phase * 2) * 0.22 + Math.sin(phase * 3) * 0.06;
    const amp = envelope(time, duration, 0.012, Math.min(0.09, duration * 0.38));
    mixSample(start + i, sound * amp * gain, pan);
  }
}

function addPluck(at, midi, duration, gain = 0.04, pan = 0) {
  const start = sampleAt(at);
  const length = Math.min(sampleAt(duration), sampleCount - start);
  const frequency = noteHz(midi);
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const phase = TAU * frequency * time;
    const bright = Math.sin(phase) + Math.sin(phase * 2) * 0.31 + Math.sin(phase * 3) * 0.12;
    const amp = envelope(time, duration, 0.006, Math.min(0.11, duration * 0.55)) * Math.exp(-time * 3.7);
    mixSample(start + i, bright * amp * gain, pan);
  }
}

function addPadVoice(at, midi, duration, gain = 0.017, pan = 0, detune = 0) {
  const start = sampleAt(at);
  const length = Math.min(sampleAt(duration), sampleCount - start);
  const frequency = noteHz(midi) * (1 + detune);
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const phase = TAU * frequency * time;
    const warm = Math.sin(phase) + Math.sin(phase * 2) * 0.18 + Math.sin(phase * 3) * 0.06;
    const amp = envelope(time, duration, 0.3, Math.min(0.95, duration * 0.36)) * (0.9 + Math.sin(time * TAU * 0.16) * 0.1);
    mixSample(start + i, warm * amp * gain, pan);
  }
}

function addPad(at, chord, beats, gain = 0.045) {
  const duration = beats * beatSeconds + 0.14;
  chord.forEach((midi, index) => {
    const pan = -0.58 + (index / Math.max(1, chord.length - 1)) * 1.16;
    addPadVoice(at, midi + 12, duration, gain / chord.length, pan, -0.0018);
    addPadVoice(at, midi + 12, duration, gain / chord.length, -pan * 0.72, 0.0016);
  });
}

function addWhoosh(at, duration = 0.28, gain = 0.035, reverse = false) {
  const start = sampleAt(at);
  const length = Math.min(sampleAt(duration), sampleCount - start);
  let previous = 0;
  for (let i = 0; i < length; i++) {
    const position = i / Math.max(1, length - 1);
    const shape = Math.sin(Math.PI * position) ** 1.7;
    const noise = random();
    const high = noise - previous * 0.76;
    previous = noise;
    const pan = (reverse ? -1 : 1) * (position * 1.45 - 0.72);
    mixSample(start + i, high * shape * gain, pan);
  }
}

function addRiser(at, duration, gain = 0.035) {
  const start = sampleAt(at);
  const length = Math.min(sampleAt(duration), sampleCount - start);
  let previous = 0;
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const progress = i / Math.max(1, length - 1);
    const noise = random();
    const high = noise - previous * (0.9 - progress * 0.22);
    previous = noise;
    const tone = Math.sin(TAU * (220 + 1350 * progress * progress) * time);
    const amp = progress * progress * (0.25 + 0.75 * easeInOut(progress));
    mixSample(start + i, (high * 0.72 + tone * 0.11) * amp * gain, progress * 0.5 - 0.25);
  }
}

function addMetal(at, gain = 0.07, pan = 0) {
  const start = sampleAt(at);
  const duration = 0.88;
  const length = Math.min(sampleAt(duration), sampleCount - start);
  const ratios = [1, 1.414, 1.739, 2.193];
  for (let i = 0; i < length; i++) {
    const time = i / sampleRate;
    const sound = ratios.reduce(
      (sum, ratio, index) => sum + Math.sin(TAU * (338 + index * 55) * ratio * time) / (index + 1),
      0,
    );
    mixSample(start + i, sound * Math.exp(-time * 4.2) * gain, pan);
  }
}

function addImpact(at, gain = 0.72) {
  addKick(at, gain * 0.82);
  addClap(at + 0.012, gain * 0.16);
  addMetal(at, gain * 0.09);
}

function addChordStab(at, chord, gain = 0.075) {
  chord.slice(1).forEach((midi, index) => {
    addPluck(at, midi + 12, 1.25, gain, -0.4 + index * 0.4);
  });
}

function sectionAt(beat) {
  return score.sections.find((section) => beat >= section.start && beat < section.end)?.name ?? "outro";
}

const chords = [
  [38, 45, 50, 53], // D minor
  [34, 41, 46, 50], // B-flat
  [41, 48, 53, 57], // F
  [36, 43, 48, 52], // C
];
const energetic = new Set(["web", "server", "vision", "harmony", "system", "publish", "community", "build"]);
const driving = new Set(["system", "publish", "community", "build"]);
const transitionBeats = [4, 8, 14, 18, 22, 26, 30, 34, 46, 58, 74, 94, 110, 126];

// Harmonic bed, pulse, and percussion are organized in whole beats. Every
// musical onset is therefore on the exact beat origin shared by the visuals.
for (let beat = 0; beat < score.beats; beat++) {
  const section = sectionAt(beat);
  const chord = chords[Math.floor(beat / 8) % chords.length];
  const root = chord[0];
  const inHighEnergy = energetic.has(section);
  const inDrive = driving.has(section);

  if (beat % 8 === 0) {
    const padGain = section === "campus" ? 0.09 : section === "outro" ? 0.13 : section === "creed" ? 0.075 : 0.045;
    addPad(beat * beatSeconds, chord, Math.min(8, score.beats - beat), padGain);
  }

  if (section === "code") {
    addPluck((beat + 0.25) * beatSeconds, chord[(beat + 1) % 4] + 24, 0.22, 0.022, -0.4 + beat * 0.2);
    if (beat === 0) addBass(beat * beatSeconds, root - 12, beatSeconds * 1.6, 0.09);
    continue;
  }

  if (section === "syntax") {
    addBass(beat * beatSeconds, root - 12, beatSeconds * 0.85, 0.08);
    addPluck((beat + 0.5) * beatSeconds, chord[(beat + 2) % 4] + 19, 0.3, 0.027, beat % 2 ? 0.4 : -0.4);
    if (beat % 2 === 0) addKick(beat * beatSeconds, 0.24);
    continue;
  }

  if (section === "sculpture" || section === "statement") {
    addBass(beat * beatSeconds, root - 12, beatSeconds * 0.9, 0.105);
    if (beat % 2 === 0) addKick(beat * beatSeconds, 0.35);
    if (beat % 4 === 2) addSnare(beat * beatSeconds, 0.12);
    addPluck((beat + 0.5) * beatSeconds, chord[(beat + 1) % 4] + 19, 0.4, 0.034, beat % 2 ? 0.35 : -0.35);
    continue;
  }

  if (section === "contribution") {
    addBass(beat * beatSeconds, root - 12, beatSeconds * 0.78, 0.105);
    if (beat % 2 === 0) addKick(beat * beatSeconds, 0.36);
    if (beat % 4 === 2) addSnare(beat * beatSeconds, 0.13);
    addHat((beat + 0.5) * beatSeconds, 0.024, beat % 2 ? -0.32 : 0.32);
    if (beat % 2 === 0) addPluck((beat + 0.25) * beatSeconds, chord[(beat / 2) % 4] + 24, 0.34, 0.031, beat % 4 ? -0.38 : 0.38);
    continue;
  }

  if (section === "campus") {
    // Campus imagery gets air: warm pad, sparse piano-like pulses, no four-on-floor groove.
    if (beat % 4 === 0) addBass(beat * beatSeconds, root - 12, beatSeconds * 2.1, 0.07);
    if (beat % 2 === 0) addPluck((beat + 0.18) * beatSeconds, chord[(beat / 2) % 4] + 12, 1.05, 0.033, beat % 4 ? 0.42 : -0.42);
    if (beat === 90) addRiser(beat * beatSeconds, 4 * beatSeconds, 0.03);
    continue;
  }

  if (section === "voyage") {
    addBass(beat * beatSeconds, root - 12, beatSeconds * 0.9, 0.1);
    if (beat % 2 === 0) addKick(beat * beatSeconds, 0.37);
    if (beat % 4 === 2) addSnare(beat * beatSeconds, 0.14);
    for (const fraction of [0.25, 0.75]) {
      addHat((beat + fraction) * beatSeconds, 0.022, fraction < 0.5 ? -0.28 : 0.28);
    }
    addPluck((beat + 0.5) * beatSeconds, chord[(beat + 1) % 4] + 24, 0.5, 0.041, beat % 2 ? -0.42 : 0.42);
    continue;
  }

  if (section === "creed" || section === "outro") continue;

  if (inHighEnergy) {
    addBass(beat * beatSeconds, root - 12, beatSeconds * 0.82, inDrive ? 0.128 : 0.11);
    addKick(beat * beatSeconds, inDrive ? 0.47 : 0.4);
    if (beat % 4 === 2) {
      addSnare(beat * beatSeconds, inDrive ? 0.19 : 0.15);
      addClap(beat * beatSeconds + 0.012, inDrive ? 0.055 : 0.04);
    }
    const steps = section === "build" && beat >= 134 ? [0.25, 0.5, 0.75] : [0.5];
    steps.forEach((fraction, index) => addHat((beat + fraction) * beatSeconds, inDrive ? 0.034 : 0.025, index % 2 ? -0.34 : 0.34));
    const note = chord[(beat * 2 + 1) % 4] + (inDrive ? 24 : 19);
    addPluck((beat + 0.25) * beatSeconds, note, 0.38, inDrive ? 0.042 : 0.031, beat % 2 ? -0.43 : 0.43);
    if (inDrive) addPluck((beat + 0.75) * beatSeconds, chord[(beat + 2) % 4] + 24, 0.26, 0.022, beat % 2 ? 0.28 : -0.28);
  }
}

// Scene changes get a short aspirated lead-in followed by an impact on the visual cut.
for (const beat of transitionBeats) {
  addWhoosh((beat - 0.42) * beatSeconds, 0.24, beat === 74 ? 0.023 : 0.038, beat % 2 === 0);
  if (beat !== 74) addImpact(beat * beatSeconds, beat === 126 ? 0.9 : 0.57);
}

// Word-level hits: contribution, voyage, community, and the accelerating Git build.
for (const beat of [58, 62, 66, 70, 94, 98, 102, 106, 110, 112, 114, 116]) {
  addMetal(beat * beatSeconds, 0.07, beat % 4 ? -0.28 : 0.28);
}
for (let beat = 126; beat < 134; beat++) addMetal(beat * beatSeconds, 0.06, beat % 2 ? -0.25 : 0.25);
for (let beat = 134; beat < 142; beat += 0.5) {
  addMetal(beat * beatSeconds, 0.045, Math.floor(beat * 2) % 2 ? -0.24 : 0.24);
}
addRiser(138 * beatSeconds, 4 * beatSeconds, 0.06);

// Four declaration lines need clarity rather than an uninterrupted wall of drums.
for (const beat of [142, 146, 150, 154]) {
  const chord = chords[Math.floor(beat / 8) % chords.length];
  addImpact(beat * beatSeconds, 0.8);
  addChordStab(beat * beatSeconds, chord, 0.082);
  addBass(beat * beatSeconds, chord[0] - 12, beatSeconds * 2.7, 0.13);
  addWhoosh((beat - 0.32) * beatSeconds, 0.2, 0.036, beat % 8 === 0);
}

// The final identity shot: a restrained entrance at 158, then tactile landmarks
// on the blue expansion, logo, title, promise, school name, and URL.
addWhoosh((158 - 0.4) * beatSeconds, 0.27, 0.045, false);
addImpact(158 * beatSeconds, 0.55);
addPad(158 * beatSeconds, chords[3], 8, 0.095);
addBass(158 * beatSeconds, chords[3][0] - 12, beatSeconds * 3.3, 0.1);
addRiser(160 * beatSeconds, 2.4 * beatSeconds, 0.042);
for (const [beat, midi, gain, pan] of [
  [162.4, 72, 0.07, -0.3],
  [163.5, 76, 0.085, 0.25],
  [164.8, 79, 0.075, -0.22],
  [166, 76, 0.065, 0.2],
  [167, 74, 0.055, -0.15],
  [168, 72, 0.05, 0.12],
]) {
  addPluck(beat * beatSeconds, midi, 1.45, gain, pan);
  addMetal(beat * beatSeconds, gain * 0.45, -pan);
}
addPad(166 * beatSeconds, chords[0], 10, 0.12);
addBass(166 * beatSeconds, chords[0][0] - 12, 5.6, 0.085);

// Subtle cross-channel reflections make the synthetic score feel spatial while
// preserving every original downbeat. The tail is intentionally contained in
// the composition duration and fades before its final frame.
const dryLeft = left.slice();
const dryRight = right.slice();
for (const [seconds, gain] of [[0.115, 0.12], [0.235, 0.075], [0.365, 0.045]]) {
  const delay = sampleAt(seconds);
  for (let i = delay; i < sampleCount; i++) {
    left[i] += dryRight[i - delay] * gain;
    right[i] += dryLeft[i - delay] * gain;
  }
}

let peak = 0;
for (let i = 0; i < sampleCount; i++) {
  const tail = Math.min(1, Math.max(0, (sampleCount - i) / sampleAt(1.75)));
  left[i] *= tail;
  right[i] *= tail;
  peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
}
const targetPeak = 0.86;
const normalize = targetPeak / Math.max(peak, targetPeak);
const wav = Buffer.alloc(44 + sampleCount * 4);
wav.write("RIFF", 0);
wav.writeUInt32LE(wav.length - 8, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(sampleCount * 4, 40);
for (let i = 0; i < sampleCount; i++) {
  const l = Math.tanh(left[i] * normalize * 1.18) / Math.tanh(1.18);
  const r = Math.tanh(right[i] * normalize * 1.18) / Math.tanh(1.18);
  wav.writeInt16LE(Math.round(clamp(l, -1, 1) * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(clamp(r, -1, 1) * 32767), 46 + i * 4);
}

const output = new URL("../public/audio/brand-film.wav", import.meta.url);
mkdirSync(new URL("../public/audio/", root), {recursive: true});
writeFileSync(output, wav);
console.log(
  `Generated ${output.pathname}: ${score.beats} beats / ${(sampleCount / sampleRate).toFixed(3)}s / ${sampleRate}Hz stereo PCM16`,
);
