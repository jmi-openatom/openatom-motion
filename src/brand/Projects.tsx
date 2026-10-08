import score from "./full-score.json";
import { PrintGrid, Sticker, Burst, EchoType } from "./MotionLanguage";
import { FlyingType } from "./FlyingType";
import React from "react";
import { AbsoluteFill } from "remotion";
import { hitScale } from "./sync";
import { Frame, Center } from "./BrandStudy";
import { ease, smooth, pulse, pop } from "./rhythm";
const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
export const SystemProject = ({ b }: { b: number }) => {
  const labels = ["成员", "活动", "项目", "抽奖", "表单", "统计"];
  const phase = Math.min(5, Math.floor(b / 2)),
    local = b - phase * 2;
  const shape = (phase: number, i: number): [number, number] => {
    const a = (i * Math.PI * 2) / 48;
    switch ((phase + 6) % 6) {
      case 0:
        return [960 + Math.cos(a) * 300, 470 + Math.sin(a) * 225];
      case 1:
        return [
          960 + Math.cos(a) * (170 + (i % 3) * 70),
          470 + Math.sin(a) * (170 + (i % 3) * 70),
        ];
      case 2:
        return [620 + (i % 12) * 62, 335 + Math.floor(i / 12) * 83];
      case 3:
        return [
          960 + Math.cos(a * 2) * (90 + i * 5),
          470 + Math.sin(a * 2) * (65 + i * 3),
        ];
      case 4:
        return [655 + (i % 8) * 88, 290 + Math.floor(i / 8) * 67];
      default:
        return [
          620 + (i % 12) * 62,
          670 - Math.floor(i / 12) * 56 - (i % 12) * 23,
        ];
    }
  };
  const morph = pop(local / 0.85);
  const breath = 1 + 0.035 * Math.sin(b * Math.PI);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <PrintGrid b={b} />
      <EchoType
        b={b}
        text={labels[phase]}
        chinese
        color={BLUE}
        size={300}
        y={180}
      />
      <Frame label="OPENATOM SYSTEM / MADE FOR OUR COMMUNITY." />
      <Sticker
        b={b}
        at={0}
        text="BUILT TOGETHER ↗"
        left={180}
        top={210}
        angle={-8}
        blue
        end={11.5}
      />
      <Sticker
        b={b}
        at={2}
        text="OPENATOM SYSTEM"
        left={1270}
        top={665}
        angle={8}
        end={11.5}
        size={24}
      />
      <Burst b={b} left={1490} top={230} size={85} />

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <g
          transform={`translate(960 470) scale(${breath}) rotate(${Math.sin(b * 0.7) * 5}) translate(-960 -470)`}
        >
          {Array.from({ length: 48 }, (_, i) => {
            const prev = shape(phase - 1, i),
              next = shape(phase, i);
            const x = prev[0] + (next[0] - prev[0]) * morph,
              y = prev[1] + (next[1] - prev[1]) * morph;
            const kick = Math.exp(-((b + i * 0.023) % 1) * 8);
            return (
              <g key={i}>
                {i % 8 === 0 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={12 + ((local + i * 0.09) % 1) * 54}
                    fill="none"
                    stroke={BLUE}
                    strokeWidth={1.5}
                    opacity={Math.exp(-((local + i * 0.09) % 1) * 5) * 0.4}
                  />
                )}
                {i % 4 === 0 && (
                  <path
                    d={`M 960 470 Q ${x + Math.sin(b + i) * 50} ${y - 80} ${x} ${y}`}
                    fill="none"
                    stroke="#cbd1db"
                    strokeWidth={1.5}
                    opacity={0.6}
                  />
                )}
                <rect
                  x={x - 8 - kick * 4}
                  y={y - 8 - kick * 4}
                  width={16 + kick * 8}
                  height={16 + kick * 8}
                  rx={phase % 2 ? 3 : 20}
                  fill={i % 4 === 0 ? BLUE : INK}
                  transform={`rotate(${phase * 45 + morph * 45},${x},${y})`}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <FlyingType
        b={b}
        end={12}
        y={810}
        chinese
        color={INK}
        cues={score.systemWords.map((cue, i) => ({
          at: cue.beat - score.sections.find((s) => s.name === "system")!.start,
          text: cue.text,
          size: 125,
        }))}
      />
      <div
        style={{
          position: "absolute",
          top: 890,
          width: "100%",
          textAlign: "center",
          fontSize: 23,
          letterSpacing: 3,
          color: "#7d8086",
        }}
      >
        OPENATOM SYSTEM
      </div>
      {b > 11.5 && (
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 488,
            width: 2400,
            height: 2400,
            borderRadius: "50%",
            background: INK,
            transform: `translate(-50%,-50%) scale(${ease((b - 11.5) / 0.5)})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const PublishProject = ({ b }: { b: number }) => {
  const stage = Math.min(3, Math.floor(b / 3));
  const p = smooth((b % 3) / 2.4);
  const words = ["构建", "测试", "部署", "上线"];
  const english = ["BUILD", "TEST", "DEPLOY", "ONLINE"];
  const progress = (stage + p) / 4;
  const runner = (t: number) => {
    const x = 160 + 1600 * t;
    return [x, 540 + Math.sin(t * Math.PI * 3) * 160];
  };
  const position = runner(progress);
  return (
    <AbsoluteFill
      style={{ background: stage === 3 ? BLUE : INK, color: PAPER }}
    >
      <PrintGrid b={b} dark />
      <EchoType b={b} text={english[stage]} color={PAPER} size={290} y={180} />
      <Burst b={b} left={1470} top={245} color={PAPER} size={95} />
      <Frame
        dark
        blue={stage === 3}
        label="OPENATOM PUBLISH / FROM COMMIT TO LIVE."
      />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={Array.from({ length: 100 }, (_, i) => {
            const [x, y] = runner(i / 99);
            return `${i ? "L" : "M"} ${x} ${y}`;
          }).join(" ")}
          fill="none"
          stroke={stage === 3 ? "#ffffff38" : "#383b43"}
          strokeWidth={2}
        />
        <path
          d={Array.from({ length: 100 }, (_, i) => {
            const [x, y] = runner(i / 99);
            return `${i ? "L" : "M"} ${x} ${y}`;
          }).join(" ")}
          fill="none"
          stroke={stage === 3 ? PAPER : BLUE}
          strokeWidth={7}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - Math.min(1, progress)}
        />
      </svg>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {[0.028, 0.014, 0].map((lag, i) => {
          const [x, y] = runner(Math.max(0, progress - lag));
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === 2 ? 19 : 13}
              fill={stage === 3 ? PAPER : BLUE}
              opacity={i === 2 ? 1 : 0.2 + i * 0.1}
            />
          );
        })}
        <circle
          cx={position[0]}
          cy={position[1]}
          r={28 + pulse(b) * 45}
          stroke={stage === 3 ? PAPER : BLUE}
          fill="none"
          opacity={pulse(b) * 0.4}
        />
      </svg>
      <FlyingType
        b={b}
        end={12}
        chinese
        y={475}
        cues={words.map((text, i) => ({ at: i * 3, text, size: 230 }))}
      />

      <div
        style={{
          position: "absolute",
          bottom: 225,
          width: "100%",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 28,
          color: stage === 3 ? PAPER : "#838a98",
        }}
      >
        {stage === 3 ? "✓ 上线成功 / ONLINE" : "git push origin main"}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 72,
          fontSize: 18,
          letterSpacing: 3,
        }}
      >
        {english.map((w, i) => (
          <span key={w} style={{ opacity: i <= stage ? 1 : 0.25 }}>
            {i < stage ? "✓ " : ""}
            {w}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
