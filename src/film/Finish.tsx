import React from 'react';
import {AbsoluteFill,Img,spring,useCurrentFrame} from 'remotion';
import {timeline,framesPerBeat,beatFrame,sectionAt,impact,musicEnergy,pulse} from '../audio/timeline';
import {smooth,mix} from '../motion/paths';
import {asset,random} from './resources';
const slogans=[['WE',1], ["DON’T JUST",1], ['LEARN',1], ['OPEN SOURCE.',1], ['WE BUILD WITH IT.',1], ['WE CONTRIBUTE TO IT.',1], ['WE ARE PART OF IT.',1]] as const;
export const Finish=()=>{
 const f=useCurrentFrame(),s=sectionAt(f),energy=musicEnergy(f),hit=impact(f),logo=asset('logo/jmi-openatom.png');
 const b=f/framesPerBeat;const ix=Math.floor(b-121),local=f-beatFrame(121+ix);const show=s==='finalDrop'&&ix>=0&&ix<slogans.length;
 const slam=spring({frame:Math.max(0,local),fps:30,config:{damping:16,stiffness:380,mass:.55}});
 const outro=f-timeline.outro.startFrame,fade=1-smooth((f-2220)/29);
 return <>
  {s!=='intro'&&s!=='silence'&&<>
   <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at center,transparent 35%,#0009 100%)'}}/>
   <svg width={1920} height={1080} style={{position:'absolute',inset:0,opacity:.04,pointerEvents:'none'}}>{Array.from({length:180},(_,i)=><rect key={i} x={(random(i+34)*1920+Math.floor(f)*73)%1920} y={(random(i+51)*1080+Math.floor(f)*37)%1080} width={1.5} height={1.5} fill="#fff"/>)}</svg>
   {energy>.7&&<svg width={1920} height={1080} style={{position:'absolute',inset:0,opacity:.15+hit*.2,pointerEvents:'none'}}>{Array.from({length:28},(_,i)=>{const a=i*2.399,r=360+(random(i+8)*800+f*18)%750,len=energy*55+hit*100;return <line key={i} x1={960+Math.cos(a)*r} y1={540+Math.sin(a)*r*.6} x2={960+Math.cos(a)*(r+len)} y2={540+Math.sin(a)*(r+len)*.6} stroke={i%3?'#147bdd':'#84eaff'} strokeWidth={1}/>;})}</svg>}
  </>}
  {[12,28,34,52,72,120].some(b=>f===beatFrame(b)||f===beatFrame(b)+1)&&<AbsoluteFill style={{background:'#c5edff',opacity:f===beatFrame(120)?.8:.34}}/>}
  {show&&<AbsoluteFill style={{display:'flex',alignItems:'center',justifyContent:'center',background:'#020711dd',perspective:1100,overflow:'hidden'}}>
   {[4,2,0].map((trail,i)=><div key={trail} style={{position:'absolute',fontFamily:'FilmDisplay',fontSize:ix<3?260:ix===5?124:160,lineHeight:.95,textAlign:'center',letterSpacing:ix<3?-4:-2,color:i===2?'#f0fbff':i===1?'#00c2ff':'#1864ff',opacity:i===2?1:Math.max(0,.28-local*.025),transform:`translate3d(${trail*(1-slam)*70}px,0,${(1-slam)*350}px) rotateX(${(1-slam)*-22}deg) rotateZ(${(1-slam)*-6}deg) scale(${.85+slam*.15},${1+(1-slam)*.5})`,filter:local<2?`blur(${2-local}px)`:'none',clipPath:`inset(0 ${Math.max(0,1-slam)*50}% 0 0)`}}>{slogans[ix][0]}</div>)}
  </AbsoluteFill>}
  {s==='silence'&&<AbsoluteFill style={{background:'#000'}}/>}
  {s==='outro'&&<AbsoluteFill style={{background:'#020710',alignItems:'center',justifyContent:'center',opacity:fade}}>
   <div style={{position:'absolute',width:950,height:950,background:'radial-gradient(circle,#0066ff12,transparent 64%)',transform:`scale(${1+Math.sin(outro*.035)*.025})`}}/>
   {logo&&<Img src={logo} style={{position:'absolute',width:205,height:205,top:112,objectFit:'contain',filter:`drop-shadow(0 0 ${12+Math.sin(outro*.04)*3}px #00aaff44)`,transform:`scale(${.94+smooth(outro/15)*.06})`}}/>}
   <div style={{position:'absolute',top:logo?325:220,width:'100%',textAlign:'center',fontFamily:'FilmDisplay',fontSize:116,letterSpacing:2,color:'#f1fbff'}}>JMI-OPENATOM</div>
   <div style={{position:'absolute',top:logo?480:380,width:'100%',textAlign:'center',fontFamily:'FilmChinese',fontSize:27,fontWeight:400,lineHeight:1.8,letterSpacing:4,color:'#87a6bf'}}>江苏海事职业技术学院<br/>开放原子开源社团</div>
   <div style={{position:'absolute',top:622,textAlign:'center',fontFamily:'FilmDisplay',fontSize:74,lineHeight:1.02,letterSpacing:1,color:'#a4e9ff',clipPath:`inset(0 0 ${100*(1-smooth((outro-18)/22))}% 0)`}}>FROM CODE<br/>TO COMMUNITY.</div>
   <div style={{position:'absolute',top:804,fontFamily:'FilmChinese',fontSize:22,color:'#7a99b2',opacity:smooth((outro-35)/20)}}>从一行代码，到一个真正的开源社区。</div>
   <div style={{position:'absolute',bottom:100,fontFamily:'monospace',fontSize:22,color:'#52809f',letterSpacing:1,opacity:smooth((outro-48)/20)}}>github.com/jmi-openatom <span style={{padding:'0 28px',color:'#17394d'}}> / </span> jmi-openatom.cn</div>
  </AbsoluteFill>}
 </>;
};
