import {random} from './resources';
const label=(c:CanvasRenderingContext2D,t:string,x:number,y:number,size=24,color='#a4c9e5')=>{c.font=`${size}px FilmDisplay`;c.fillStyle=color;c.fillText(t,x,y);};
export const drawUI=(c:CanvasRenderingContext2D,kind:string,f:number)=>{
 const w=c.canvas.width,h=c.canvas.height;c.clearRect(0,0,w,h);c.fillStyle='#071525';c.fillRect(0,0,w,h);c.fillStyle='#0b2137';c.fillRect(0,0,w,52);
 ['#ec8e55','#75d6bb','#409fee'].forEach((v,i)=>{c.fillStyle=v;c.beginPath();c.arc(23+i*22,26,5,0,7);c.fill();});label(c,'JMI / '+kind.toUpperCase(),110,34,20);
 if(kind==='phone'){
  label(c,'OpenHarmony',35,142,48,'#fff');label(c,'DISTRIBUTED / CONNECTED',35,181,22,'#45c9ff');
  const y=310+Math.sin(f*.08)*35;c.strokeStyle='#158bff';c.lineWidth=3;c.beginPath();c.arc(w/2,y,88,0,Math.PI*2);c.stroke();
  label(c,'ArkTS',w/2-49,y+18,46,'#e2f8ff');for(let i=0;i<4;i++){c.fillStyle='#102b44';c.fillRect(30,480+i*115,w-60,92);label(c,['DEVICE ONLINE','ARKUI RESPONSE','SYNC COMPLETE','COMMUNITY'][i],55,537+i*115,31,'#70d7ff');}
 }else if(kind==='web'){
  c.save();c.beginPath();c.rect(0,53,w,h-53);c.clip();c.translate(0,-(f*5%290));label(c,'BUILD SOMETHING',55,192,90,'#f1faff');label(c,'THAT MATTERS.',55,285,90,'#40c2ff');
  label(c,'Vue / React / Spring Boot / API',60,346,29);c.strokeStyle='#157aa2';c.lineWidth=2;
  for(let i=0;i<3;i++){const x=60+i*395;c.strokeRect(x,415,360,225);label(c,['CREATE','CONNECT','CONTRIBUTE'][i],x+25,485,40,'#f0fcff');for(let j=0;j<4;j++){c.fillStyle='#12436b';c.fillRect(x+25,515+j*20,270-j*35,5);}}
  label(c,'git commit -m "feat: build together"',60,738,34,'#63dcc6');c.restore();
 }else{
  label(c,kind.toUpperCase(),50,139,66,'#e6f9ff');label(c,'OPENATOM SYSTEM  /  DEMONSTRATION',53,181,21,'#4c89b0');
  const count=Math.min(500,Math.floor(120+Math.max(0,f)*2.7));label(c,kind==='statistics'?count+'+':'120  /  240  /  500+',50,278,70,'#56d0ff');
  c.strokeStyle='#123857';c.lineWidth=1;for(let i=0;i<7;i++){c.beginPath();c.moveTo(50,335+i*47);c.lineTo(w-45,335+i*47);c.stroke();}
  c.strokeStyle='#39d3ff';c.lineWidth=4;c.beginPath();for(let i=0;i<50;i++){const x=55+i*23.8,y=609-i*4.2+Math.sin(i*.5+f*.035)*32;if(i===0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();
  for(let i=0;i<25;i++){c.fillStyle='#0066dd';c.fillRect(55+i*47,645,29,-(40+random(i+32)*100)*Math.min(1,f/40));}
 }
};
