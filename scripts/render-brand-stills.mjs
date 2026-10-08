import { bundle } from "@remotion/bundler";
import {
  selectComposition,
  renderStill,
  openBrowser,
} from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome", {
  chromiumOptions: { gl: "angle" },
});
try {
  const composition = await selectComposition({
    serveUrl,
    id: "JMI-BRAND-STUDY",
    puppeteerInstance: browser,
  });
  await mkdir("out/brand-stills", { recursive: true });
  for (const frame of [
    20, 45, 80, 105, 140, 175, 207, 236, 272, 315, 333, 350, 380, 430,
  ]) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `out/brand-stills/${frame}.jpg`,
      imageFormat: "jpeg",
      scale: 0.5,
      puppeteerInstance: browser,
      chromiumOptions: { gl: "angle" },
    });
    console.log(frame);
  }
} finally {
  await browser.close({ silent: true });
}
