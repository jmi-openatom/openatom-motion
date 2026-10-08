import { ElasticLetters, DeformMode } from "./ElasticLetters";
import React from "react";
import { smooth } from "./rhythm";
export type WordCue = { at: number; text: string; size?: number };
/** Anticipate before each cue; the word reaches its reading position ON the beat. */
export const flightAt = (
  age: number,
  duration: number,
  direction: number,
  first = false,
) => {
  const lead = Math.min(0.2, duration * 0.2);
  const enter = first && age >= 0 ? 1 : smooth((age + lead) / lead);
  const leave = smooth((age - duration + lead * 2) / lead);
  const a = 1 - enter;
  return {
    x: direction * (-18 * a + 14 * leave),
    y: 30 * a - 24 * leave,
    rotate: 0,
    scale: 0.992 + 0.008 * enter,
    opacity: enter * (1 - leave),
    blur: a * 0.7 + leave * 0.4,
  };
};
export const FlyingType: React.FC<{
  b: number;
  cues: WordCue[];
  end: number;
  chinese?: boolean;
  color?: string;
  y?: number;
  suffix?: string;
  kinetic?: boolean;
}> = ({
  b,
  cues,
  end,
  chinese = false,
  color = "#f1f0eb",
  y = 540,
  suffix = "",
  kinetic = true,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      perspective: 1400,
      pointerEvents: "none",
    }}
  >
    {cues.map((cue, i) => {
      const age = b - cue.at,
        duration = (cues[i + 1]?.at ?? end) - cue.at;
      if (age < -0.4 || age > duration + 0.06) return null;
      const p = flightAt(age, duration, i % 2 ? -1 : 1, i === 0);
      const lead = Math.min(0.2, duration * 0.2);
      const incoming = 1 - smooth((age + lead) / lead);
      const style = i % 3;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: y - 170,
            width: "100%",
            height: 340,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: chinese ? "BrandChinese" : "BrandGrotesk",
            fontSize: cue.size ?? 230,
            fontWeight: 800,
            letterSpacing: chinese ? -9 : -10,
            whiteSpace: "nowrap",
            color,
            opacity: p.opacity,
            transform: `translate3d(${p.x}px,${p.y}px,0) scale(${p.scale})`,
            transformOrigin: "50% 50%",
            clipPath:
              kinetic && style === 2
                ? `inset(0 0 ${incoming * 32}% 0)`
                : undefined,
            filter: p.blur > 0.2 ? `blur(${p.blur}px)` : "none",
          }}
        >
          {kinetic ? (
            <ElasticLetters
              text={cue.text}
              age={Math.max(0, age)}
              duration={duration}
              mode={
                (["stretch", "accordion", "wave", "ribbon"] as DeformMode[])[
                  i % 4
                ]
              }
            />
          ) : (
            cue.text
          )}
          <span style={{ fontWeight: 400 }}>{suffix}</span>
        </div>
      );
    })}
  </div>
);
