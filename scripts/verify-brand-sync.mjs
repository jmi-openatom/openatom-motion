import { build as buildBundle } from "esbuild";
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
await buildBundle({
  entryPoints: ["src/brand/sync.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "out/sync-check.cjs",
});
const require = createRequire(import.meta.url);
const { nativeBeat, frameAtBeat } = require("../out/sync-check.cjs");
const score = JSON.parse(await readFile("src/brand/full-score.json", "utf8"));
const audio = JSON.parse(await readFile("out/audio-onsets.json", "utf8"));
const start = (name) => score.sections.find((s) => s.name === name).start;
assert.equal(
  audio.duration,
  (score.beats * 60) / score.bpm,
  "Audio was not regenerated",
);
const build = start("build"),
  creed = start("creed"),
  outro = start("outro");
const textBeats = [
  ...score.communityWords.map((c) => c.beat),
  ...score.systemWords.map((c) => c.beat),
  ...score.creativeCues.map((c) => c.beat),
  ...Array.from(
    { length: 24 },
    (_, i) => build + (i < 8 ? i : 8 + (i - 8) * 0.5),
  ),
  ...Array.from({ length: 4 }, (_, i) => start("publish") + i * 3),
  ...Array.from(
    { length: 8 },
    (_, i) => creed + Math.floor(i / 2) * 4 + (i % 2),
  ),
  start("community") + 10,
  outro,
  outro + 1,
  outro + 2,
  outro + 6.5,
  outro + 8,
  outro + 9,
];
const beats = [
  ...new Set([...score.sections.map((s) => s.start), ...textBeats]),
].sort((a, b) => a - b);
const rows = beats.map((b) => {
  const frame = frameAtBeat(b, score.fps),
    sample = Math.floor((frame * 44100) / score.fps + 0.5);
  assert.ok(
    nativeBeat(frame, score.fps) >= b,
    `Cue ${b} missing at frame ${frame}`,
  );
  assert.ok(
    frame === 0 || nativeBeat(frame - 1, score.fps) < b,
    `Cue ${b} appears early`,
  );
  if (textBeats.includes(b)) {
    assert.ok(
      audio.cues.some((c) => c.frame === frame && c.sample === sample),
      `Missing generated audio accent for beat ${b}`,
    );
  }
  return { beat: b, frame, seconds: frame / score.fps, audioSample: sample };
});
const report = {
  fps: score.fps,
  durationSeconds: (score.beats * 60) / score.bpm,
  outputFrames: frameAtBeat(score.beats, score.fps),
  cues: rows,
};
await writeFile("out/beat-sync.json", JSON.stringify(report, null, 2));
console.log(
  `PASS: ${rows.length} cue boundaries checked; ${textBeats.length} text/creative cues have generated audio accents. ${report.outputFrames} frames / ${report.fps}fps / ${report.durationSeconds}s.`,
);
