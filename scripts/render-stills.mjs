import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const frames=process.argv.slice(2).map(Number);
const samples=frames.length?frames:[24,110,204,270,375,459,555,590,621,661,752,810,871,952,1050,1140,1250,1370,1510,1620,1718,1830,1940,1980,2050,2150];
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const browser=await openBrowser('chrome',{chromiumOptions:{gl:'angle'}});
try{
 const composition=await selectComposition({serveUrl,id:'JMI-OPENATOM',puppeteerInstance:browser});
 await mkdir('out/rebuild-stills',{recursive:true});
 for(const frame of samples){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,output:`out/rebuild-stills/${String(frame).padStart(4,'0')}.jpg`,imageFormat:'jpeg',scale:.5,chromiumOptions:{gl:'angle'}});console.log('Rendered',frame);}
}finally{await browser.close({silent:true});}
