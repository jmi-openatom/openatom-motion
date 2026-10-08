import React,{useLayoutEffect,useRef,useMemo} from 'react';
import {useCurrentFrame} from 'remotion';
import * as THREE from 'three';
import {active,progress,timeline} from '../audio/timeline';
import {Vec3,smooth,mix,mix3} from '../motion/paths';
import {Type,Box,Photo,Screen,Line,Ring} from './primitives';
import {imageFiles,useTextures,random} from './resources';
import {drawUI} from './panels';
import {sampledWord} from './CodeSequence';
export const RealWorld:React.FC<{usePhotos:boolean}>=({usePhotos})=>{
 const f=useCurrentFrame(),u=progress(f,'break'),textures=useTextures();if(!active(f,'break',6))return null;
 const activity=imageFiles('activities').filter(p=>textures[p]),campus=imageFiles('campus').filter(p=>textures[p]);const photos=usePhotos?[...activity,...campus]:[];
 return <group>
  {photos.length>0?Array.from({length:Math.min(5,photos.length)},(_,i)=>{
   const path=photos[i%photos.length],x=i%2===0?5:-7,z=-500-i*17;return <group key={i} position={[x,Math.sin(i)*1.6,z]} rotation={[.02,Math.sin(i+u)*.13,i%2?.025:-.025]}>
    <Photo path={path} width={26}/><Line points={[[-13,-6,0],[13,-6,0]]} opacity={.2}/>
    <Type text={path.startsWith('campus')?(i===0?'WHERE IT BEGINS':'TOGETHER, WE BUILD'):['BUILD TOGETHER','SHARE WHAT YOU KNOW','MAKE IT REAL'][i%3]} position={[0,8,0]} width={15} color="#91d8ee"/>
   </group>;
  }):<>
   {[0,1,2].map(i=><group key={i} position={[i%2?6:-5,0,-503-i*17]} rotation={[.06,i%2?-.24:.2,0]}><Screen draw={c=>drawUI(c,i===1?'phone':'web',f)} portrait={i===1} width={i===1?5:18} height={i===1?10:10}/><Type text={['MAKE IT REAL','BUILD TOGETHER','SHARE THE WORK'][i]} position={[0,7,0]} width={18}/></group>)}
  </>}
  {Array.from({length:20},(_,i)=><Type key={i} text={['code','commit','build','share'][i%4]} position={[(random(i+7)-.5)*32,(random(i+37)-.5)*20,-480-i*4]} width={1.5} mono color="#245a7b" opacity={.4}/>)}
 </group>;
};
export const CommunityNetwork=()=>{
 const f=useCurrentFrame(),u=progress(f,'community'),form=smooth((u-.46)/.38),textures=useTextures();const mesh=useRef<THREE.InstancedMesh>(null);const target=useMemo(()=>sampledWord('COMMUNITY',40,8,650),[]);const o=useMemo(()=>new THREE.Object3D(),[]);
 const node=(i:number):Vec3=>{const a=i*2.399+f*.003,r=12+random(i+84)*15;return mix3([Math.cos(a)*r,Math.sin(a)*r*.55,-579+Math.sin(i)*15],[target[i][0],target[i][1],-606],form);};
 const count=Math.min(650,Math.floor(1+smooth(u/.52)*649));
 useLayoutEffect(()=>{if(!mesh.current)return;target.forEach((_,i)=>{o.position.set(...node(i));o.scale.setScalar(i<count?(form>.8?.065:.11):0);o.updateMatrix();mesh.current!.setMatrixAt(i,o.matrix);});mesh.current.instanceMatrix.needsUpdate=true;},[f,form,count]);
 if(!active(f,'community'))return null;
 const photos=[...imageFiles('activities'),...imageFiles('campus')].filter(p=>textures[p]);
 return <group>
  <instancedMesh ref={mesh} args={[undefined,undefined,650]}><sphereGeometry args={[1,6,4]}/><meshBasicMaterial color="#73d8ff"/></instancedMesh>
  {Array.from({length:75},(_,i)=>i<count&&<Line key={i} points={[node(i),node((i+7)%650)]} opacity={(1-form)*.27*smooth((count-i)/7)}/>)}
  {photos.length>0&&Array.from({length:12},(_,i)=><group key={i} position={node(i)} scale={Math.max(.005,(1-smooth(u/.4))*2)} rotation={[0,Math.sin(i)*.3,Math.sin(i)*.06]}><Photo path={photos[i%photos.length]} width={4}/></group>)}
  {['LEARN','BUILD','SHARE','CONTRIBUTE'].map((s,i)=><Type key={s} text={s} position={[i%2?16:-16,i<2?6:-6,-561-i*10]} width={i===3?22:14} rotation={[0,i%2?-.15:.15,i%2?.06:-.06]} color="#99ddfa" opacity={1-form*.8}/>)}
  <Type text="COMMUNITY" position={[0,0,-606]} width={40} opacity={smooth((u-.76)/.1)}/>
 </group>;
};
