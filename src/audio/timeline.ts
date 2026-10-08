import score from './score.json';
export const BPM = score.bpm;
export const FPS = score.fps;
export const framesPerBeat = FPS * 60 / BPM;
export const beatFrame = (beat: number) => Math.round(beat * framesPerBeat);
export type SectionName = keyof typeof score.sections;
export const timeline = Object.fromEntries(Object.entries(score.sections).map(([name, [startBeat, endBeat, energy]]) => [name, {
 startBeat, endBeat, energy, startFrame: beatFrame(startBeat), endFrame: Math.min(score.duration, beatFrame(endBeat)),
}])) as Record<SectionName, {startBeat:number;endBeat:number;startFrame:number;endFrame:number;energy:number}>;
export const sectionAt = (frame:number):SectionName => (Object.keys(timeline) as SectionName[]).find(k=>frame>=timeline[k].startFrame&&frame<timeline[k].endFrame) ?? 'outro';
export const progress = (frame:number, name:SectionName) => Math.max(0,Math.min(1,(frame-timeline[name].startFrame)/(timeline[name].endFrame-timeline[name].startFrame)));
export const musicEnergy = (frame:number) => timeline[sectionAt(frame)].energy;
export const getBeat = (frame:number) => Math.floor(frame/framesPerBeat);
export const getBeatProgress = (frame:number) => ((frame/framesPerBeat)%1+1)%1;
const crossing=(frame:number,division:number)=>Math.floor(frame/framesPerBeat*division)!==Math.floor((frame-1)/framesPerBeat*division);
export const isBeat=(frame:number)=>crossing(frame,1);
export const isHalfBeat=(frame:number)=>crossing(frame,2);
export const isQuarterBeat=(frame:number)=>crossing(frame,4);
export const pulse=(frame:number,division=1)=>Math.exp(-(((frame/framesPerBeat*division)%1+1)%1)*9);
export const impact=(frame:number)=>Math.max(0,...score.impacts.map(b=>{const age=frame-beatFrame(b);return age>=0&&age<15?Math.exp(-age*.3):0;}));
export const active=(frame:number,name:SectionName,pad=0)=>frame>=timeline[name].startFrame-pad&&frame<timeline[name].endFrame+pad;
