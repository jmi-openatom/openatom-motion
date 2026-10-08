import { BPM } from "./rhythm";
/** Nearest output-frame beat clock. Never quantize through a 30fps frame first. */
export const frameAtBeat = (b: number, fps: number) =>
  Math.round((b * fps * 60) / BPM);
export const nativeBeat = (frame: number, fps: number) =>
  ((frame + 0.5 - 1e-7) * BPM) / (fps * 60);
/** Full legibility on the beat, then a brief damped recoil. */
export const hitScale = (localBeat: number, amount = 0.065) =>
  1 + amount * Math.cos(localBeat * 19) * Math.exp(-localBeat * 9);
