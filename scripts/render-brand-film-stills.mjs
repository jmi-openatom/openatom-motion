import { bundle } from "@remotion/bundler";
import {
  selectComposition,
  renderStill,
  openBrowser,
} from "@remotion/renderer";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
const score = JSON.parse(await readFile("src/brand/full-score.json", "utf8"));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome", {
  chromiumOptions: { gl: "angle" },
});
try {
  const composition = await selectComposition({
    serveUrl,
    id: "JMI-BRAND-FILM",
    puppeteerInstance: browser,
  });
  await mkdir("out/brand-film-v8-stills", { recursive: true });
  for (const beat of [
    0.5, 0.95, 1.5, 1.9, 2, 2.5, 14.5, 15.9, 16, 16.5, 110.5, 111.9, 112, 112.5,
    120.5, 126.5, 127.9, 128, 131.5, 138.25, 140.25, 142.5, 143.5, 160, 166,
    167, 172,
  ]) {
    const frame = Math.round((beat * composition.fps * 60) / score.bpm);
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `out/brand-film-v8-stills/beat-${beat}.jpg`,
      imageFormat: "jpeg",
      scale: 0.5,
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
    });
    console.log(`Beat ${beat} / frame ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
