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
    id: "JMI-BRAND-FILM",
    puppeteerInstance: browser,
  });
  await mkdir("out/ending-v3-stills", { recursive: true });
  for (const frame of [1390,1500,1830,1845,1860,1875,1900,1930]) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `out/ending-v3-stills/${frame}.jpg`,
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
