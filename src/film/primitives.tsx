import React,{useMemo,useEffect} from 'react';
import * as THREE from 'three';
import {Vec3} from '../motion/paths';
import {typeTexture,useTextures,makeTexture} from './resources';
export const Type:React.FC<{text:string;position?:Vec3;rotation?:Vec3;width?:number;color?:string;opacity?:number;mono?:boolean}>=({text,position=[0,0,0],rotation=[0,0,0],width=10,color='#e6f7ff',opacity=1,mono=false})=>{
 const map=useMemo(()=>typeTexture(text,color,mono),[text,color,mono]);const im=map.image as HTMLCanvasElement;
 return <mesh position={position} rotation={rotation}><planeGeometry args={[width,width*im.height/im.width]}/><meshBasicMaterial map={map} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide}/></mesh>;
};
export const Box:React.FC<{position?:Vec3;rotation?:Vec3;scale?:Vec3;color?:string;glow?:boolean;opacity?:number}>=({position=[0,0,0],rotation=[0,0,0],scale=[1,1,1],color='#0a1830',glow=false,opacity=1})=><mesh position={position} rotation={rotation} scale={scale}><boxGeometry/>{glow?<meshBasicMaterial color={color} transparent={opacity<1} opacity={opacity}/>:<meshStandardMaterial color={color} metalness={.65} roughness={.27}/>}</mesh>;
export const Line:React.FC<{points:Vec3[];color?:string;opacity?:number}>=({points,color='#078bff',opacity=.5})=>{
 const geometry=useMemo(()=>new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p))),[points]);useEffect(()=>()=>geometry.dispose(),[geometry]);
 const object=useMemo(()=>new THREE.Line(geometry,new THREE.LineBasicMaterial({color,transparent:true,opacity})),[geometry,color,opacity]);useEffect(()=>()=>object.material.dispose(),[object]);return <primitive object={object}/>;
};
export const Ring:React.FC<{position?:Vec3;rotation?:Vec3;radius?:number;color?:string;opacity?:number}>=({position=[0,0,0],rotation=[0,0,0],radius=7,color='#168fff',opacity=1})=><mesh position={position} rotation={rotation}><torusGeometry args={[radius,.024,4,100]}/><meshBasicMaterial color={color} transparent opacity={opacity}/></mesh>;
export const Photo:React.FC<{path:string;position?:Vec3;rotation?:Vec3;width?:number;opacity?:number}>=({path,position=[0,0,0],rotation=[0,0,0],width=20,opacity=1})=>{const map=useTextures()[path];if(!map)return null;const im=map.image as HTMLImageElement;return <mesh position={position} rotation={rotation}><planeGeometry args={[width,width*im.height/im.width]}/><meshBasicMaterial map={map} transparent opacity={opacity} side={THREE.DoubleSide}/></mesh>;};
export const Screen:React.FC<{draw:(c:CanvasRenderingContext2D)=>void;position?:Vec3;rotation?:Vec3;width?:number;height?:number;portrait?:boolean}>=({draw,position=[0,0,0],rotation=[0,0,0],width=14,height=8,portrait=false})=>{
 const map=useMemo(()=>{const c=document.createElement('canvas');c.width=portrait?540:1280;c.height=portrait?1080:720;return makeTexture(c);},[portrait]);
 useEffect(()=>()=>map.dispose(),[map]);draw((map.image as HTMLCanvasElement).getContext('2d')!);map.needsUpdate=true;
 return <group position={position} rotation={rotation}><Box position={[0,0,-.14]} scale={[width+.12,height+.12,.25]} color="#0b223d"/><mesh><planeGeometry args={[width,height]}/><meshBasicMaterial map={map} side={THREE.DoubleSide}/></mesh></group>;
};
