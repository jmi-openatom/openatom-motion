import React,{useLayoutEffect,useMemo,useRef} from 'react';
import {useCurrentFrame} from 'remotion';
import * as THREE from 'three';
import {active,progress,timeline,pulse,framesPerBeat} from '../audio/timeline';
import {Vec3,smooth,mix,mix3,getOrbitPosition} from '../motion/paths';
import {random,typeTexture} from './resources';
import {Type,Line,Ring,Screen,Photo} from './primitives';
import {cameraAt} from './camera';
const words=['Git','Commit','Merge','Pull Request','Vue','React','Spring Boot','ArkTS','ArkUI','OpenHarmony','Linux','Docker','Nginx','AI','YOLO','Cloud','Server','const','return','export'];
export const TerminalIntro=()=>{
 const f=useCurrentFrame(),end=timeline.intro.endFrame;if(f>end+5)return null;
 return <Screen width={29} height={16.3} draw={c=>{
  const w=c.canvas.width,h=c.canvas.height;c.fillStyle='#000';c.fillRect(0,0,w,h);c.font='24px monospace';c.textBaseline='middle';c.fillStyle='#c6edff';
  if(f<34){if(Math.floor(f/10)%2===0)c.fillText('_',w*.49,h*.48);return;}
  const text='git clone https://github.com/jmi-openatom';const count=Math.min(text.length,Math.floor((f-34)*1.4));c.fillText('> '+text.slice(0,count)+(f<67?'_':''),100,200);
  const output=["Cloning into 'JMI-OPENATOM'...",'Receiving objects...','Resolving deltas...','Building...','Loading...','100%'];
  output.forEach((s,i)=>{if(f>70+i*(16-i)){c.fillStyle=i===5?'#ffffff':'#268bd0';c.fillText(s,100,255+i*45);}});
  if(f>144){c.fillStyle='#69dfff';for(let i=0;i<12;i++)c.fillRect(100+i*76,605,58,3);}
 }}/ >;
};
export const CodeTunnel=()=>{
 const f=useCurrentFrame();if(!active(f,'codeTunnel',12))return null;const u=progress(f,'codeTunnel'),cam=cameraAt(f),burst=smooth((f-timeline.codeTunnel.startFrame)/20);
 return <group>
  {Array.from({length:180},(_,i)=>{
   const z=-random(i+239)*148;const a=i*2.399;const r=6+random(i+987)*11;
   const p:Vec3=[Math.cos(a)*r+Math.sin(z*.07)*2,Math.sin(a)*r*.58,z];
   const start:Vec3=[(random(i+23)-.5)*20,(random(i+40)-.5)*8,0];
   const pos=mix3(start,p,burst);if(pos[2]>cam.position[2]+4||pos[2]<cam.position[2]-90)return null;
   return <Type key={i} text={words[i%words.length]} position={pos} rotation={[Math.sin(i)*.12,Math.cos(i)*.25,Math.sin(i*2)*.22]} width={1.8+random(i+531)*3.7} color={i%5===0?'#c5f5ff':'#147abe'} opacity={.35+random(i+281)*.6}/>;
  })}
  <Type text="GIT" position={[4.5,-.1,-37]} rotation={[0,-.24,-.18]} width={12} color="#f0fbff"/>
  <Type text="AI" position={[-6,-3,-83]} rotation={[.1,.35,.15]} width={11} color="#00c2ff"/>
  <Type text="OPEN" position={[-9,5,-122]} rotation={[0,.15,-.06]} width={27}/>
  <Type text="SOURCE" position={[10,-4,-135]} rotation={[0,-.12,.04]} width={34} color="#18beff"/>
  {Array.from({length:14},(_,i)=><Line key={i} points={Array.from({length:45},(_,j)=>{const z=-j*3.5,a=i*Math.PI/7+z*.016;return [Math.cos(a)*18+Math.sin(z*.07)*2,Math.sin(a)*10,z] as Vec3;})} opacity={.2} color="#006cff"/>)}
 </group>;
};
export const sampledWord=(text:string,width:number,height:number,count:number)=>{
 const texture=typeTexture(text);const c=texture.image as HTMLCanvasElement;const d=c.getContext('2d')!.getImageData(0,0,c.width,c.height).data;const points:Vec3[]=[];
 for(let y=0;y<c.height;y+=3)for(let x=0;x<c.width;x+=3)if(d[(y*c.width+x)*4+3]>150)points.push([(x/c.width-.5)*width,(.5-y/c.height)*height,0]);
 return Array.from({length:count},(_,i)=>points[Math.floor(i*points.length/count)]??[0,0,0] as Vec3);
};
export const LogoFormation=()=>{
 const f=useCurrentFrame(),u=progress(f,'logo');const mesh=useRef<THREE.InstancedMesh>(null);const target=useMemo(()=>sampledWord('JMI OPENATOM',30,7,1000),[]);const o=useMemo(()=>new THREE.Object3D(),[]);
 const formation=smooth(Math.min(1,u/.42));
 useLayoutEffect(()=>{if(!mesh.current)return;target.forEach((p,i)=>{
  const a=i*2.399+f*.022+formation*6;const r=(13+random(i+110)*17)*(1-formation)**1.5;const z=Math.sin(i)*14*(1-formation);
  o.position.set(p[0]*formation+Math.cos(a)*r,p[1]*formation+Math.sin(a)*r*.7,-169+z);o.scale.setScalar(.04+.024*(1-formation));o.updateMatrix();mesh.current!.setMatrixAt(i,o.matrix);
 });mesh.current.instanceMatrix.needsUpdate=true;},[f,formation,o,target]);
 if(!active(f,'logo'))return null;
 return <group>
  <instancedMesh ref={mesh} args={[undefined,undefined,1000]}><sphereGeometry args={[1,4,3]}/><meshBasicMaterial color="#62ceff"/></instancedMesh>
  <Type text="JMI OPENATOM" position={[0,0,-169.1]} width={30} opacity={smooth((u-.38)/.07)}/>
  <Photo path="logo/jmi-openatom.png" position={[0,8,-169]} width={9} opacity={smooth((u-.4)/.12)}/>
  <Ring position={[0,0,-169]} radius={21} rotation={[.6,u*2.6,.3]} opacity={.25}/>
  <Ring position={[0,0,-169]} radius={24} rotation={[-.6,-u*3,-.3]} opacity={.13}/>
  {Array.from({length:18},(_,i)=>{const a=i*.35+f*.01;return <Line key={i} points={[getOrbitPosition(a,22,[0,0,-169],10),getOrbitPosition(a+.55,25,[0,0,-169],10)]} opacity={(1-formation)*.55}/>;})}
 </group>;
};
