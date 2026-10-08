import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill,openBrowser} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const browser=await openBrowser('chrome',{chromiumOptions:{gl:'angle'}});
const files=[];
try{
 await mkdir('out/social',{recursive:true});
 for(const [id,name] of [['JMI-COVER-PORTRAIT','jmi-openatom-douyin-cover-v8.png'],['JMI-COVER-LANDSCAPE','jmi-openatom-landscape-cover-v8.png']]){
  const composition=await selectComposition({serveUrl,id,puppeteerInstance:browser});
  const output=path.resolve('out/social',name);
  await renderStill({serveUrl,composition,frame:0,output,imageFormat:'png',puppeteerInstance:browser,chromiumOptions:{gl:'angle'}});
  files.push({id,file:output,width:composition.width,height:composition.height});
  console.log(output);
 }
 await writeFile('out/social/cover-manifest.json',JSON.stringify({title:'开源筑梦，海事启航',files},null,2));
}finally{await browser.close({silent:true});}
