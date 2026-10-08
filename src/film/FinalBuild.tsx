import React,{useRef,useMemo,useLayoutEffect} from 'react';
import {useCurrentFrame} from 'remotion';
import * as THREE from 'three';
import {active,progress,timeline,framesPerBeat} from '../audio/timeline';
import {Vec3,smooth,mix} from '../motion/paths';
import {Type,Line,Ring,Box} from './primitives';
import {cameraAt} from './camera';
import {random} from './resources';
import {sampledWord} from './CodeSequence';
const words=['feat','fix','docs','refactor','merge','build','pull request','commit'];
export const FinalBuild=()=>{
 const f=useCurrentFrame(),u=progress(f,'build2'),drop=progress(f,'finalDrop');const cam=cameraAt(f),collapse=smooth((f-timeline.finalDrop.startFrame)/12);
 const mesh=useRef<THREE.InstancedMesh>(null),o=useMemo(()=>new THREE.Object3D(),[]),target=useMemo(()=>sampledWord('JMI-OPENATOM',32,7,1500),[]);
 useLayoutEffect(()=>{if(!mesh.current)return;for(let i=0;i<1500;i++){
  const a=i*2.399+f*.018*(1+u)+collapse*8,r=(5+random(i+132)*25)*(1-collapse)**1.7;
  const x=Math.cos(a)*r+target[i][0]*collapse,y=Math.sin(a)*r*.55+target[i][1]*collapse,z=mix(cam.position[2]-10-random(i+57)*65,-720,collapse);
  o.position.set(x,y,z);o.scale.setScalar(.028+.024*collapse);o.updateMatrix();mesh.current.setMatrixAt(i,o.matrix);
 }mesh.current.instanceMatrix.needsUpdate=true;},[f,u,collapse,o,target,cam.position]);
 if(!active(f,'build2')&&!active(f,'finalDrop'))return null;
 return <group>
  <instancedMesh ref={mesh} args={[undefined,undefined,1500]}><sphereGeometry args={[1,4,3]}/><meshBasicMaterial color="#49bfff"/></instancedMesh>
  {collapse<1&&Array.from({length:64},(_,i)=>{const a=i*2.399+f*.013,r=8+random(i+778)*13,z=cam.position[2]-8-((i*3.2+f*.14*(1+u))%95);return <Type key={i} text={words[i%8]} position={[Math.cos(a)*r*(1-collapse),Math.sin(a)*r*.6*(1-collapse),mix(z,-720,collapse)]} rotation={[.1*Math.sin(a),.3*Math.cos(a),a*.12]} width={2.3+random(i+97)*4} color={i%4?'#1289d6':'#d1f7ff'}/>;})}
  {active(f,'finalDrop')&&<Type text="JMI-OPENATOM" position={[0,0,-720]} width={32} opacity={smooth(collapse)}/>}
  {Array.from({length:5},(_,i)=><Ring key={i} position={[0,0,cam.position[2]-15-i*13]} radius={17} rotation={[.25,.1,f*.005+i*.2]} opacity={(1-collapse)*(.12+u*.14)}/>)}
 </group>;
};
