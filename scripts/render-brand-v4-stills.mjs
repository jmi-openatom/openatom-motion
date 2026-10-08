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
  await mkdir("out/brand-film-v4-stills", { recursive: true });
  for (const frame of [280,330,390,445,500,580,665,715,775,860,1000,1140,1240,1390,1500,1570,1640,1710,1815,1950]) {
    await renderStill({
      serveUrl,
      composition,
      frame: frame*2,
      output: `out/brand-film-v4-stills/${frame}.jpg`,
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
