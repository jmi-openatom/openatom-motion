import React,{createContext,useContext,useEffect,useState} from 'react';
import {useDelayRender,staticFile} from 'remotion';
import {getStaticFiles} from '@remotion/studio';
import {loadFont} from '@remotion/fonts';
import * as THREE from 'three';
export const asset=(name:string)=>getStaticFiles().some(f=>f.name===name)?staticFile(name):undefined;
export const imageFiles=(folder:string)=>getStaticFiles().filter(f=>f.name.startsWith(folder+'/')&&/\.(png|jpe?g|webp)$/i.test(f.name)).map(f=>f.name).sort();
export const random=(i:number)=>{const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n);};
export const makeTexture=(source:HTMLCanvasElement|HTMLImageElement)=>{const t=new THREE.CanvasTexture(source);t.colorSpace=THREE.SRGBColorSpace;t.minFilter=THREE.LinearFilter;t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;return t;};
type ResourceMap=Record<string,THREE.Texture>;
const Context=createContext<ResourceMap>({});
export const useTextures=()=>useContext(Context);
const cache=new Map<string,THREE.Texture>();
export const typeTexture=(text:string,color='#eefaff',mono=false)=>{
 const key=text+color+mono;if(cache.has(key))return cache.get(key)!;
 const c=document.createElement('canvas'),ctx=c.getContext('2d')!;
 const font=mono?'500 56px monospace':'700 128px FilmDisplay';ctx.font=font;
 c.width=Math.ceil(ctx.measureText(text).width+40);c.height=mono?104:184;
 ctx.font=font;ctx.textBaseline='middle';ctx.fillStyle=color;ctx.fillText(text,20,c.height*.47);
 const t=makeTexture(c);cache.set(key,t);return t;
};
export const Resources:React.FC<{children:React.ReactNode}>=({children})=>{
 const {delayRender,continueRender,cancelRender}=useDelayRender();const [handle]=useState(()=>delayRender('Loading film assets'));const [textures,setTextures]=useState<ResourceMap|null>(null);
 useEffect(()=>{let live=true;const paths=['logo/jmi-openatom.png',...imageFiles('activities'),...imageFiles('campus'),...imageFiles('projects')].filter(p=>asset(p));
 Promise.all([
  loadFont({family:'FilmDisplay',url:staticFile('fonts/FilmDisplay.ttf'),weight:'700'}),
  loadFont({family:'FilmChinese',url:staticFile('fonts/FilmChinese.ttf'),weight:'100 900'}),
  Promise.all(paths.map(async path=>{const im=new Image();im.src=staticFile(path);try{await im.decode();return [path,makeTexture(im)] as const;}catch{return null;}}))
 ]).then(([, , entries])=>{if(live){setTextures(Object.fromEntries(entries.filter((x):x is NonNullable<typeof x>=>x!==null)));continueRender(handle);}}).catch(cancelRender);
 return ()=>{live=false;};},[handle,continueRender,cancelRender]);
 return textures?<Context.Provider value={textures}>{children}</Context.Provider>:null;
};
