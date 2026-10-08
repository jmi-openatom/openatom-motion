export type Vec3=[number,number,number];
export const clamp01=(x:number)=>Math.max(0,Math.min(1,x));
export const smooth=(x:number)=>{const t=clamp01(x);return t*t*(3-2*t);};
export const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export const mix3=(a:Vec3,b:Vec3,t:number):Vec3=>a.map((v,i)=>mix(v,b[i],t)) as Vec3;
export const getBezierPoint=(t:number,a:Vec3,b:Vec3,c:Vec3,d:Vec3):Vec3=>a.map((v,i)=>(1-t)**3*v+3*(1-t)**2*t*b[i]+3*(1-t)*t*t*c[i]+t**3*d[i]) as Vec3;
/** Uniform Catmull–Rom: C1 continuity; no stop at camera waypoints. */
export const getSplinePoint=(t:number,points:Vec3[]):Vec3=>{
 const p=clamp01(t)*(points.length-1),i=Math.min(points.length-2,Math.floor(p)),u=p-i;
 const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],d=points[Math.min(points.length-1,i+2)];
 return b.map((v,k)=>.5*((2*v)+(-a[k]+c[k])*u+(2*a[k]-5*v+4*c[k]-d[k])*u*u+(-a[k]+3*v-3*c[k]+d[k])*u*u*u)) as Vec3;
};
export const getArcPoint=(t:number,radius:number,start:number,end:number,center:Vec3=[0,0,0]):Vec3=>[center[0]+Math.sin(mix(start,end,t))*radius,center[1]+Math.sin(t*Math.PI)*radius*.13,center[2]+Math.cos(mix(start,end,t))*radius];
export const getOrbitPosition=(angle:number,radius:number,center:Vec3=[0,0,0],height=0):Vec3=>[center[0]+Math.cos(angle)*radius,center[1]+Math.sin(angle)*radius*.62,center[2]+Math.sin(angle*.7)*height];
export const settle=(t:number,weight=1)=>1-Math.exp(-clamp01(t)*8/weight)*Math.cos(clamp01(t)*11/weight);
export const chasePath=(t:number):Vec3=>getSplinePoint(t,[[0,0,-390],[5,1,-410],[-5,-1,-435],[4,2,-460],[0,0,-485]]);
export const trailFrames=(frame:number)=>[0,2,4].map(age=>({frame:Math.max(0,frame-age),opacity:age===0?1: .2/(age/2)}));
