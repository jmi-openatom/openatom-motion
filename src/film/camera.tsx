import {useLayoutEffect} from 'react';
import {useThree} from '@react-three/fiber';
import {useCurrentFrame} from 'remotion';
import {PerspectiveCamera} from 'three';
import {getSplinePoint,getArcPoint,mix,smooth,chasePath,Vec3} from '../motion/paths';
import {sectionAt,progress,impact,timeline,framesPerBeat,musicEnergy} from '../audio/timeline';
export type CameraState={position:Vec3;target:Vec3;roll:number;fov:number};
export const montageBeats=[0,2,4,5,6,8,10,11,12,14,16,18];
export const montageAt=(f:number)=>{
 const b=(f-timeline.techMontage.startFrame)/framesPerBeat;
 const index=Math.max(0,montageBeats.findIndex((v,i)=>b>=v&&b<(montageBeats[i+1]??19)));
 const u=(b-montageBeats[index])/(montageBeats[index+1]-montageBeats[index]);
 return {index,kind:([0,1,2,2,3,0,1,2,3,1,3][index]??0),u,local:u*(montageBeats[index+1]-montageBeats[index])*framesPerBeat,z:-235-index*13};
};
export const cameraAt=(f:number):CameraState=>{
 const s=sectionAt(f),u=progress(f,s);let position:Vec3=[0,0,22],target:Vec3=[0,0,0],roll=0,fov=58;
 if(s==='intro'){position=[Math.sin(u*3)*.05,0,mix(22,16,u**5)];}
 if(s==='codeTunnel'){
  position=getSplinePoint(u,[[-1,1,7],[-4,-1,-27],[4,2,-66],[-3,1,-107],[0,0,-133]]);
  target=getSplinePoint(Math.min(1,u+.12),[[-1,1,7],[-4,-1,-27],[4,2,-66],[-3,1,-107],[0,0,-160]]);fov=83;roll=Math.sin(u*Math.PI*4)*.13;
 }
 if(s==='logo'){
  // A genuine 130-degree orbital move followed by a forward pass through the letters.
  const orbit=Math.max(0,Math.min(1,(u-.12)/.68));position=getArcPoint(orbit,27,-1.05,1.22,[0,0,-169]);if(u<.12)position=getSplinePoint(smooth(u/.12),[[0,0,-133],[-10,1,-137],position]);target=[0,0,-169];roll=Math.sin(u*6)*.055;fov=64;
  if(u>.8){const p=smooth((u-.8)/.2);position=getSplinePoint(p,[position,[9,1,-149],[0,0,-164],[0,0,-215]]);target=[0,0,-240];fov=mix(64,88,p);}
 }
 if(s==='techMontage'){
  const m=montageAt(f);position=[Math.sin(m.u*4+m.index)*1.8,Math.sin(m.u*3)*.7,m.z+mix(13,3,m.u)];target=[-position[0]*.25,0,m.z-10];roll=Math.sin(m.u*4+m.index)*.16;fov=79;
 }
 if(s==='projects'){
  if(u<.46){const p=u/.46;position=getSplinePoint(p,[[0,1,-355],[-6,2,-366],[5,-1,-380],[0,0,-390]]);target=[Math.sin(p*4)*3,0,position[2]-24];roll=Math.sin(p*7)*.1;fov=76;}
  else {const p=(u-.46)/.54;const chase=chasePath(p);position=[chase[0]-Math.sin(p*5)*1.6,chase[1]+1,chase[2]+12];target=chasePath(Math.min(1,p+.13));roll=Math.cos(p*8)*.13;fov=83;}
 }
 if(s==='break'){position=getSplinePoint(u,[[0,1,-473],[-3,2,-489],[3,1,-513],[-2,0,-537]]);target=[Math.sin(u*6)*3,0,position[2]-30];roll=Math.sin(u*4)*.035;fov=65;}
 if(s==='community'){position=getSplinePoint(u,[[-2,0,-537],[5,9,-549],[-6,5,-566],[0,0,-604]]);target=[0,0,-605];roll=Math.sin(u*7)*.09;fov=76;}
 if(s==='build2'){position=getSplinePoint(u,[[0,0,-604],[-5,2,-628],[6,-2,-654],[0,0,-685]]);target=[0,0,position[2]-30];roll=Math.sin(u*10)*(.06+.16*u);fov=82+u*14;}
 if(s==='finalDrop'){position=[Math.sin(u*5)*.8,Math.cos(u*5)*.4,-685-u*26];target=[0,0,-740];roll=Math.sin(u*12)*.08*(1-u);fov=85;}
 if(s==='outro'||s==='silence'){position=[0,0,22];target=[0,0,0];fov=58;}
 const shake=impact(f)*.13;position[0]+=Math.sin(f*2.71)*shake;position[1]+=Math.cos(f*2.13)*shake;
 return {position,target,roll,fov:fov+impact(f)*2*musicEnergy(f)};
};
export const CameraRig=()=>{
 const f=useCurrentFrame();const {camera}=useThree();
 useLayoutEffect(()=>{const c=cameraAt(f);camera.position.set(...c.position);camera.up.set(Math.sin(c.roll),Math.cos(c.roll),0);camera.lookAt(...c.target);(camera as PerspectiveCamera).fov=c.fov;(camera as PerspectiveCamera).updateProjectionMatrix();},[camera,f]);return null;
};
