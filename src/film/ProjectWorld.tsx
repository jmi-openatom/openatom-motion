import React from 'react';
import {useCurrentFrame} from 'remotion';
import {active,progress,timeline} from '../audio/timeline';
import {Vec3,chasePath,smooth,mix,getBezierPoint} from '../motion/paths';
import {Type,Box,Screen,Line,Ring,Photo} from './primitives';
import {drawUI} from './panels';
import {useTextures} from './resources';
const modules=['Members','Activities','Projects','Lottery','Forms','Statistics'];
const placements:Vec3[]=[[-8,3,-378],[7,2,-387],[-5,-3,-395],[10,-1,-407],[-8,2,-415],[0,0,-423]];
export const ProjectWorld=()=>{
 const f=useCurrentFrame(),u=progress(f,'projects'),textures=useTextures();if(!active(f,'projects',5))return null;
 const local=f-timeline.projects.startFrame;const chase=smooth((u-.42)/.58),commit=chasePath(chase);
 return <group>
  {u<.53&&<>
   <Type text="OPENATOM SYSTEM" position={[0,8,-391]} width={28}/>
   {modules.map((name,i)=>{const p=placements[i];const a=local*.005+i;return <group key={name} position={[p[0]+Math.sin(a)*.8,p[1]+Math.cos(a)*.4,p[2]]} rotation={[Math.sin(a)*.06,(i%2?-.23:.23)+Math.sin(a)*.06,i%2?.05:-.05]}>
    {i===2&&textures['projects/openatom-system.png']?<Photo path="projects/openatom-system.png" width={12}/>:<Screen draw={c=>drawUI(c,name,local)} width={12} height={6.75}/>}
    <Type text={name.toUpperCase()} position={[0,4.4,0]} width={8} color="#8de6ff"/>
   </group>;})}
  </>}
  {u>.35&&<>
   <Type text="OPENATOM PUBLISH" position={[0,8,-414]} width={25}/>
   <Line points={Array.from({length:100},(_,i)=>chasePath(i/99))} color="#24baff" opacity={.7}/>
   <group position={commit} rotation={[local*.02,local*.03,local*.012]}><Box scale={[.7,.7,.7]} color="#a4f5ff" glow/><Ring radius={1.2} rotation={[.7,0,0]} color="#258dff"/></group>
   <Type text="git push origin main" position={[commit[0],commit[1]+2.3,commit[2]]} width={7.5} mono color="#b8edff"/>
   {['BUILD','TEST','DEPLOY','ONLINE'].map((text,i)=>{const p=chasePath(.18+i*.235);return <group key={text} position={p} rotation={[0,0,Math.sin(i)*.1]}>
    <Ring radius={8} color={i===3?'#58e2bd':'#157cff'}/><Ring radius={8.3} opacity={.2}/><Type text={text} position={[0,5.5,0]} width={12} color={i===3?'#6fffe0':'#eaf8ff'}/>
    <Line points={[[-9,-4,0],[9,-4,0]]} opacity={.4}/>
   </group>;})}
   {Array.from({length:26},(_,i)=>{const t=(chase+i*.047)%1,p=chasePath(t);return <Box key={i} position={[p[0]+Math.sin(t*17+i)*2,p[1]+Math.cos(t*13+i),p[2]]} scale={[.05,.05,.6]} color="#2bbeff" glow/>;})}
   <Type text="DEPLOY SUCCESS" position={[0,-3.4,-486]} width={15} color="#7fe5c4"/>
  </>}
 </group>;
};
