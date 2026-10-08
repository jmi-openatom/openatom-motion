import { at } from "./rhythm";
import score from "./full-score.json";
export const FILM_BEATS = score.beats;
export const FILM_FRAMES = at(FILM_BEATS);
export const fullTimeline = score.sections;
export const sectionFor = (f: number) =>
  fullTimeline.find((s) => f >= at(s.start) && f < at(s.end)) ??
  fullTimeline[fullTimeline.length - 1];

export const sectionAtBeat = (b: number) =>
  fullTimeline.find((s) => b >= s.start && b < s.end) ??
  fullTimeline[fullTimeline.length - 1];
