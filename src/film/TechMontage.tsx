import React from 'react';
import {useCurrentFrame} from 'remotion';
import {active} from '../audio/timeline';
import {getBezierPoint,getArcPoint,Vec3,smooth} from '../motion/paths';
import {montageAt} from './camera';
import {Type,Box,Screen,Line,Ring} from './primitives';
import {drawUI} from './panels';
export const Phone:React.FC<{u:number;frame:number}>=({u,frame})=>{
 const p=getBezierPoint(u,[-8,-2,-7],[-1,3,-2],[2,-1,0],[9,7,5]);return <group position={p} rotation={[Math.sin(u*4)*.16,-.9+u*1.7,-.3+Math.sin(u*4)*.22]}>
  <Box scale={[4.6,8.9,.43]} color="#305374"/><Screen portrait draw={c=>drawUI(c,'phone',frame)} width={4.3} height={8.3} position={[0,0,.23]}/><Box position={[0,3.9,.4]} scale={[1.2,.2,.04]} color="#000811"/>
  <Type text="ArkUI" position={[5,0,-2]} width={5}/><Type text="OpenHarmony" position={[-4,-5,-1]} width={10} color="#2bbfff"/>
 </group>;
};
export const Servers:React.FC<{frame:number}>=({frame})=><group>
 {[-1,1].flatMap(side=>Array.from({length:5},(_,i)=><group key={side+':'+i} position={[side*5.5,0,-i*4]}>
  <Box scale={[2.4,8.8,2.8]} color="#163047"/>
  {Array.from({length:12},(_,j)=><group key={j}><Box position={[0,-3.7+j*.65,1.43]} scale={[2.1,.5,.05]} color="#06131d"/><Box position={[.78,-3.7+j*.65,1.48]} scale={[.1,.12,.04]} color={(j+Math.floor(frame/4))%4?'#008cff':'#6bffde'} glow/>
  <Box position={[-.3,-3.7+j*.65,1.48]} scale={[1.2,.025,.04]} color="#234461" glow/></group>)}
 </group>))}
 {['docker ps','nginx -t','systemctl status'].map((t,i)=><Type key={t} text={'$ '+t} position={[i%2?2:-2,3-i*2,-3-i*6]} rotation={[0,i%2?-.2:.2,0]} width={5.5} mono color="#7adcff"/>)}
 {Array.from({length:24},(_,i)=>{const p=(frame*.018+i*.073)%1;const path=(t:number):Vec3=>[Math.sin(t*10+i)*3,Math.cos(t*8+i)*2,-t*23];return <group key={i}><Box position={path(p)} scale={[.06,.06,.5]} color="#85f2ff" glow/><Line points={[path(Math.max(0,p-.015)),path(p)]} opacity={.55}/></group>;})}
</group>;
const Tracking=({u,frame}:{u:number;frame:number})=>{
 const x=Math.sin(frame*.035)*2,y=Math.cos(frame*.03)*.35,expand=1+smooth((u-.7)/.3)*5;
 return <group>
  {Array.from({length:16},(_,i)=><Line key={i} points={[[i-8,-5,-3],[i-8,5,-3]]} opacity={.07}/>)}
  <group position={[x,y,-1]}><mesh position={[0,1.6,0]}><sphereGeometry args={[.6,16,12]}/><meshStandardMaterial color="#416e8e"/></mesh><Box position={[0,0,0]} scale={[1.6,2.2,.7]} color="#204d6c"/>{[-1,1].map(s=><Box key={s} position={[s*.43,-1.8,0]} scale={[.52,1.7,.6]} color="#2b5673"/>)}</group>
  <group position={[x+.12,y,0]} scale={[expand,expand,1]}>
   <Line points={[[-1.2,-3,0],[-1.2,2.4,0],[1.2,2.4,0],[1.2,-3,0],[-1.2,-3,0]]} color="#72ffcc" opacity={1}/>
   <Type text="person 0.98" position={[0,2.8,0]} width={4.2} mono color="#72ffcc"/>
  </group>
  <Line points={[[x-.7,y+.8,.2],[x-.7,y+2.4,.2],[x+.7,y+2.4,.2],[x+.7,y+.8,.2],[x-.7,y+.8,.2]]} color="#00c2ff"/>
  <Type text="face 0.94" position={[x+2.5,y+2,.2]} width={3.6} mono/>
  <Type text="object 0.91" position={[-5,-2,0]} width={3.2} mono color="#76b8df"/>
  <Box position={[0,4-(frame*.2)%8,.3]} scale={[22,.025,.03]} color="#38cdff" glow/>
  <Type text="YOLO / TARGET LOCK" position={[0,-5,-1]} width={12} color="#389fc7"/>
 </group>;
};
export const TechMontage=()=>{
 const f=useCurrentFrame();if(!active(f,'techMontage'))return null;const m=montageAt(f);
 return <group position={[0,0,m.z]}>
  {m.kind===0&&<group position={getBezierPoint(m.u,[8,1,-7],[0,2,-3],[-2,-1,1],[-15,-3,7])} rotation={[.08,-.61+m.u*.8,-.07-m.u*.12]}>
   <Screen draw={c=>drawUI(c,'web',m.local)} width={16} height={9}/><Type text="Vue / React" position={[0,5.8,0]} width={8} color="#51d6c2"/><Type text="Spring Boot / API" position={[0,-5.8,0]} width={10}/>
  </group>}
  {m.kind===1&&<Servers frame={m.local}/>}
  {m.kind===2&&<Tracking frame={m.local+m.index*4} u={m.u}/>}
  {m.kind===3&&<Phone frame={m.local} u={m.u}/>}
 </group>;
};
