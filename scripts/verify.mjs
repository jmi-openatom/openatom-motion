import assert from 'node:assert/strict';
import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser,getVideoMetadata} from '@remotion/renderer';
import {readFile,mkdtemp,cp,rm,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
const score=JSON.parse(await readFile('src/audio/score.json','utf8'));
const gl={gl:'angle'};const browser=await openBrowser('chrome',{chromiumOptions:gl});
const report={resolution:'1920×1080',fps:30,duration:75,bpm:score.bpm,renderedFrames:[],fallbackFrames:[],mp4:null};
const check=async(serveUrl,frames,fallback=false)=>{
 const composition=await selectComposition({serveUrl,id:'JMI-OPENATOM',puppeteerInstance:browser});
 assert.equal(composition.durationInFrames,2250);assert.equal(composition.fps,30);assert.equal(composition.width,1920);assert.equal(composition.height,1080);
 for(const frame of frames){await renderStill({serveUrl,composition,frame,output:null,scale:.25,puppeteerInstance:browser,chromiumOptions:gl});report[fallback?'fallbackFrames':'renderedFrames'].push(frame);console.log('PASS',fallback?'without optional assets':'frame',frame);}
};
try{
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
 const boundaries=[...new Set(Object.values(score.sections).flatMap(([start,end])=>[Math.round(start*30*60/score.bpm)-1,Math.round(start*30*60/score.bpm),Math.round(end*30*60/score.bpm)-1]).filter(f=>f>=0&&f<2250))];
 await check(serveUrl,[...boundaries,2249]);
 const temp=await mkdtemp(path.join(os.tmpdir(),'jmi-fallback-'));
 try{await cp('public/fonts',path.join(temp,'fonts'),{recursive:true});const fallbackUrl=await bundle({entryPoint:path.resolve('src/index.ts'),publicDir:temp});await check(fallbackUrl,[110,459,871,1250,1620,1940,2150],true);}finally{await rm(temp,{recursive:true,force:true});}
 if(existsSync('out/jmi-openatom.mp4')){const m=await getVideoMetadata(path.resolve('out/jmi-openatom.mp4'));assert.equal(m.width,1920);assert.equal(m.height,1080);assert.ok(Math.abs(m.durationInSeconds-75)<.06);report.mp4=m;}
 await writeFile('out/verification.json',JSON.stringify(report,null,2));console.log('PASS: verification report saved.');
}finally{await browser.close({silent:true});}
