export const FPS = 30;
export const BPM = 128;
export const FPB = (FPS * 60) / BPM;
export const DURATION = 450;
export const beat = (frame: number) => frame / FPB;
export const at = (b: number) => Math.round(b * FPB);
export const unit = (x: number) => Math.max(0, Math.min(1, x));
export const ease = (x: number) => 1 - (1 - unit(x)) ** 4;
export const smooth = (x: number) => {
  const t = unit(x);
  return t * t * (3 - 2 * t);
};
export const sections = [0, 4, 8, 14, 18, 22, 26, 29, 32];
export const shotAt = (frame: number) =>
  Math.max(
    0,
    sections.findIndex(
      (b, i) => frame >= at(b) && frame < at(sections[i + 1] ?? 32),
    ),
  );
export const localBeat = (frame: number) =>
  beat(frame) - sections[shotAt(frame)];
export const pulse = (b: number) => Math.exp(-(b - Math.floor(b)) * 12);

/** A short, weighted overshoot for geometry; masks and opacity still use clamped easing. */
export const pop = (x: number) => {
  const t = unit(x) - 1;
  return 1 + 2.15 * t * t * t + 1.15 * t * t;
};
