import React from 'react';
import {AbsoluteFill,Audio,useCurrentFrame} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {montageAt} from './camera';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {Resources,asset} from './resources';
import {CameraRig} from './camera';
import {Environment,Lens} from './Environment';
import {TerminalIntro,CodeTunnel,LogoFormation} from './CodeSequence';
import {TechMontage} from './TechMontage';
import {ProjectWorld} from './ProjectWorld';
import {RealWorld,CommunityNetwork} from './Community';
import {FinalBuild} from './FinalBuild';
import {Finish} from './Finish';
import {sectionAt,timeline} from '../audio/timeline';
import {smooth} from '../motion/paths';
import './film.css';
export type FilmProps={music:boolean;usePhotos:boolean;effects:boolean};
const World:React.FC<FilmProps>=({usePhotos,effects})=>{
 const f=useCurrentFrame(),s=sectionAt(f);
 const blur=effects&&((s==='codeTunnel'&&f<timeline.codeTunnel.startFrame+18)||(s==='techMontage'&&montageAt(f).u>.75)||(s==='finalDrop'&&f<timeline.finalDrop.startFrame+13));
 return <AbsoluteFill>
  <CameraMotionBlur samples={blur?3:1} shutterAngle={150}>
  {s!=='silence'&&s!=='outro'&&<ThreeCanvas width={1920} height={1080} dpr={1} camera={{fov:58,near:.12,far:170,position:[0,0,22]}} gl={{antialias:true,alpha:false,toneMapping:THREE.NoToneMapping}}>
   <color attach="background" args={[s==='intro'?'#000000':'#020710']}/><fog attach="fog" args={['#020710',45,150]}/>
   <ambientLight intensity={1.3}/><directionalLight position={[5,12,10]} intensity={3} color="#90c9ff"/><pointLight position={[0,6,-250]} intensity={90} color="#00baff" distance={80}/>
   <CameraRig/><Environment/><TerminalIntro/><CodeTunnel/><LogoFormation/><TechMontage/><ProjectWorld/><RealWorld usePhotos={usePhotos}/><CommunityNetwork/><FinalBuild/>
   {effects&&<Lens/>}
  </ThreeCanvas>}
  </CameraMotionBlur>
  <Finish/>
 </AbsoluteFill>;
};
export const OpenAtomFilm:React.FC<FilmProps>=(props)=>{
 const bgm=asset('music/bgm.mp3')??asset('audio/bgm.mp3')??asset('music/bgm.wav');const sfx=asset('audio/sound-design.wav');
 return <Resources><AbsoluteFill className="motion-film"><World {...props}/>
  {props.music&&bgm&&<Audio src={bgm} volume={f=>{const s=sectionAt(f);if(s==='silence')return 0;return (s==='intro'?.4:s==='break'?.48:s==='outro'?.42:.7)*(1-smooth((f-2210)/39));}}/>}
  {props.music&&sfx&&<Audio src={sfx} volume={.78}/>}
 </AbsoluteFill></Resources>;
};
