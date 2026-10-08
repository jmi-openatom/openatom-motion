import React from "react";
import { smooth, unit } from "./rhythm";
export type DeformMode = "stretch" | "accordion" | "wave" | "ribbon";
/** A single small settle after arrival. The reading pose remains still throughout the hold. */
export const letterShape = (
  age: number,
  duration: number,
  i: number,
  count: number,
  mode: DeformMode,
) => {
  const t = unit(age / 0.58);
  const settle = Math.sin(t * Math.PI) * (1 - smooth(t));
  const bias = (i - (count - 1) / 2) / Math.max(1, count);
  return {
    x: mode === "accordion" ? bias * settle * 2 : 0,
    y: mode === "wave" ? Math.sin(i * 0.45) * settle * 3 : 0,
    sx: mode === "stretch" ? 1 + settle * 0.009 : 1,
    sy: mode === "accordion" ? 1 + settle * 0.006 : 1,
    skew: 0,
    rotate: 0,
    outline: 0,
    weight: 800,
  };
};
export const ElasticLetters = ({
  text,
  age,
  duration,
  mode = "stretch",
}: {
  text: string;
  age: number;
  duration: number;
  mode?: DeformMode;
}) => (
  <>
    {Array.from(text).map((letter, i) => {
      const p = letterShape(age, duration, i, text.length, mode);
      return (
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            whiteSpace: "pre",
            lineHeight: 1,
            fontVariationSettings: `'wght' ${p.weight}`,
            transformOrigin: "50% 75%",
            transform: `translate(${p.x}px,${p.y}px) scale(${p.sx},${p.sy})`,
          }}
        >
          {letter}
        </span>
      );
    })}
  </>
);
