import React,{useMemo,useRef,useLayoutEffect,useEffect} from 'react';
import {useCurrentFrame} from 'remotion';
import {useFrame,useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {cameraAt} from './camera';
import {random} from './resources';
import {musicEnergy,impact,pulse,sectionAt} from '../audio/timeline';
import {Line,Ring} from './primitives';
import {Vec3} from '../motion/paths';
export const Environment=()=>{
 const f=useCurrentFrame(),cam=cameraAt(f),energy=musicEnergy(f);const particles=useRef<THREE.InstancedMesh>(null);
 const o=useMemo(()=>new THREE.Object3D(),[]);
 useLayoutEffect(()=>{if(!particles.current)return;for(let i=0;i<650;i++){
 const z=cam.position[2]+12-((random(i+113)*150+f*.055*(.5+energy))%160);
 const a=random(i+773)*Math.PI*2+Math.sin(f*.002+i)*.07;const r=6+random(i+843)*58;
 o.position.set(Math.cos(a)*r,Math.sin(a)*r*.6,z);const near=cam.position[2]-z<14;
 o.scale.set(.012+random(i+511)*.04,.018,near?.8+energy*1.2:.06);o.rotation.set(0,0,a);o.updateMatrix();particles.current.setMatrixAt(i,o.matrix);
 }particles.current.instanceMatrix.needsUpdate=true;},[f,cam.position,energy,o]);
 const s=sectionAt(f);if(s==='intro'||s==='outro'||s==='silence')return null;
 const base=Math.floor(-cam.position[2]/12)*12;
 return <group>
  <instancedMesh ref={particles} args={[undefined,undefined,650]}><boxGeometry/><meshBasicMaterial color="#348ede" transparent opacity={.6}/></instancedMesh>
  {(s==='codeTunnel'||s==='build2'||s==='finalDrop')&&Array.from({length:9},(_,i)=>{const z=-base-i*12;const bend=Math.sin(z*.038)*2;return <group key={i}>
   <Ring position={[bend,0,z]} radius={18} rotation={[.1*Math.sin(z),.12,Math.sin(z*.05)*.25]} opacity={.08+energy*.08}/>
   <Line points={[[-40,-9,z],[40,-9,z]]} opacity={.09}/>
  </group>;})}
  {[-1,1].map(side=><Line key={side} points={Array.from({length:60},(_,i)=>[side*14+Math.sin(i*.1+f*.001)*3,-9,cam.position[2]-i*2] as Vec3)} opacity={.18} color="#087acb"/>)}
 </group>;
};
/** Render-frame driven postprocessing. No elapsed wall-clock time or random state. */
export const Lens=()=>{
 const {gl,scene,camera,size}=useThree();const f=useCurrentFrame();
 const {composer,bloom}=useMemo(()=>{const composer=new EffectComposer(gl);composer.addPass(new RenderPass(scene,camera));const bloom=new UnrealBloomPass(new THREE.Vector2(size.width,size.height),.3,.4,.95);composer.addPass(bloom);return {composer,bloom};},[gl,scene,camera]);
 useLayoutEffect(()=>composer.setSize(size.width,size.height),[composer,size.width,size.height]);
 useLayoutEffect(()=>{bloom.strength=.18+musicEnergy(f)*.12+impact(f)*.85;bloom.radius=.4;},[bloom,f]);
 useEffect(()=>()=>{bloom.dispose();composer.dispose();},[bloom,composer]);
 useFrame(()=>composer.render(),1);return null;
};
