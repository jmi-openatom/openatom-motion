import React from "react";
import { smooth } from "./rhythm";
import { hitScale } from "./sync";
export const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
/** Editorial motion primitives, driven solely by the composition's beat clock. */
export const PrintGrid = ({
  b,
  dark = false,
}: {
  b: number;
  dark?: boolean;
}) => (
  <svg
    width={1920}
    height={1080}
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity: dark ? 0.1 : 0.2,
    }}
  >
    {Array.from({ length: 13 }, (_, i) => (
      <line
        key={`v${i}`}
        x1={i * 160 + Math.sin(b * 0.15) * 10}
        y1={110}
        x2={i * 160 + Math.sin(b * 0.15) * 10}
        y2={970}
        stroke={dark ? PAPER : "#afb5be"}
        strokeWidth={1}
      />
    ))}
    {Array.from({ length: 7 }, (_, i) => (
      <line
        key={`h${i}`}
        x1={65}
        y1={130 + i * 140}
        x2={1855}
        y2={130 + i * 140}
        stroke={dark ? PAPER : "#afb5be"}
        strokeWidth={1}
      />
    ))}
    {[260, 660, 1060, 1460, 1860].map((x, i) => (
      <path
        key={x}
        d={`M ${x - 7} 120 H ${x + 7} M ${x} 113 V 127`}
        stroke={dark ? PAPER : INK}
        strokeWidth={1.5}
      />
    ))}
  </svg>
);
export const Sticker = ({
  b,
  at = 0,
  text,
  left,
  top,
  angle = 0,
  blue = false,
  dark = false,
  size = 30,
  end = 99,
}: {
  b: number;
  at?: number;
  text: string;
  left: number;
  top: number;
  angle?: number;
  blue?: boolean;
  dark?: boolean;
  size?: number;
  end?: number;
}) => {
  const age = b - at,
    enter = smooth((age + 0.36) / 0.36),
    exit = smooth((b - end + 0.35) / 0.35);
  if (age < -0.36 || exit >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        padding: "18px 29px",
        background: blue ? BLUE : dark ? INK : PAPER,
        color: blue || dark ? PAPER : INK,
        border: `2px solid ${dark ? PAPER : INK}`,
        fontFamily: "BrandGrotesk, BrandChinese",
        fontWeight: 650,
        fontSize: size,
        letterSpacing: -0.7,
        whiteSpace: "nowrap",
        opacity: enter * (1 - exit),
        transformOrigin: "20% 50%",
        transform: `perspective(1200px) translate(${(1 - enter) * 48 + exit * 26}px,${(1 - enter) * 24 - exit * 18}px) rotate(${angle + (1 - enter) * -2}deg) rotateY(${(1 - enter) * -3}deg) scale(${0.985 + 0.015 * enter})`,
        boxShadow: "8px 10px 0 #10111318",
      }}
    >
      {" "}
      {text}{" "}
    </div>
  );
};
export const Burst = ({
  b,
  left = 1540,
  top = 245,
  color = BLUE,
  size = 120,
}: {
  b: number;
  left?: number;
  top?: number;
  color?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="-60 -60 120 120"
    style={{
      position: "absolute",
      left,
      top,
      transform: `rotate(${b * 9}deg) scale(${hitScale(b % 1, 0.02)})`,
    }}
  >
    {Array.from({ length: 12 }, (_, i) => (
      <path
        key={i}
        d="M 0 -15 L 0 -52"
        stroke={color}
        strokeWidth={5}
        transform={`rotate(${i * 30})`}
      />
    ))}
  </svg>
);
export const EchoType = ({
  b,
  text,
  chinese = false,
  color = BLUE,
  size = 240,
  y = 250,
}: {
  b: number;
  text: string;
  chinese?: boolean;
  color?: string;
  size?: number;
  y?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: -120,
      right: -120,
      top: y,
      fontFamily: chinese ? "BrandChinese" : "BrandGrotesk",
      fontWeight: 850,
      fontSize: size,
      lineHeight: 0.9,
      letterSpacing: chinese ? -8 : -14,
      whiteSpace: "nowrap",
      color: "transparent",
      WebkitTextStroke: `1.5px ${color}`,
      opacity: 0.065,
      transform: `translateX(${Math.sin(b * 0.2) * 12}px) rotate(-2deg)`,
    }}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{ transform: `translateX(${(i % 2 ? -1 : 1) * b * 4}px)` }}
      >
        {text} {text} {text}
      </div>
    ))}
  </div>
);
/** Staggered horizontal shutters complete before the next scene's downbeat. */
export const SliceCurtain = ({
  b,
  start,
  color,
  duration = 0.6,
}: {
  b: number;
  start: number;
  color: string;
  duration?: number;
}) =>
  b < start ? null : (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {Array.from({ length: 8 }, (_, i) => {
        const p = smooth((b - start - i * 0.018) / (duration - 0.13));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: i * 135 - 1,
              width: 1920,
              height: 137,
              background: color,
              transform: `translateX(${(1 - p) * 1925 * (i % 2 ? -1 : 1)}px)`,
            }}
          />
        );
      })}
    </div>
  );
