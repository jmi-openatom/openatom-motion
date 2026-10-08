import React from "react";
import { AbsoluteFill } from "remotion";
import { PrintGrid, Sticker, Burst, EchoType } from "./MotionLanguage";
import { Frame } from "./BrandStudy";
import { FlyingType } from "./FlyingType";
import { smooth, pop } from "./rhythm";
const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
export const Contribution = ({ b }: { b: number }) => {
  const fork = smooth((b - 1) / 3),
    merge = smooth((b - 5) / 3),
    paper = smooth((b - 7.2) / 1.8);
  const rgb = (a: number, z: number) => Math.round(a + (z - a) * paper);
  const bg = `rgb(${rgb(18, 241)},${rgb(84, 240)},${rgb(255, 235)})`;
  const color = paper > 0.5 ? BLUE : PAPER;
  return (
    <AbsoluteFill style={{ background: bg, color }}>
      <PrintGrid b={b} dark={paper < 0.5} />
      <EchoType
        b={b}
        text={b < 8 ? "IDEA" : "TOGETHER"}
        color={color}
        size={285}
        y={200}
      />
      <Sticker
        b={b}
        at={4}
        text="FORK → COLLABORATE"
        left={210}
        top={685}
        angle={-8}
        dark
        end={15.5}
        size={24}
      />
      <Sticker
        b={b}
        at={8}
        text="PULL REQUEST +"
        left={1320}
        top={245}
        angle={8}
        blue
        end={15.5}
        size={25}
      />
      <Burst b={b} left={1570} top={705} color={color} size={110} />
      <Frame
        dark={paper < 0.5}
        blue={paper < 0.5}
        label="AN IDEA BECOMES A CONTRIBUTION."
      />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {[-1, 0, 1].map((side, i) => {
          const spread = fork * (1 - merge);
          const x = 960 + side * 440 * spread,
            y = 420 + (side === 0 ? -60 : 110) * spread;
          const wave = Math.sin(b * 0.7 + i) * 9;
          return (
            <g key={side}>
              <path
                d={`M 960 210 C ${x} 200 ${x} ${y - 110} ${x} ${y + wave}`}
                fill="none"
                stroke={color}
                strokeWidth={2}
                opacity={0.35 * (1 - paper * 0.4)}
              />
              <circle
                cx={x}
                cy={y + wave}
                r={65 + pop(fork) * 25 + merge * 38}
                fill={color}
              />
              <text
                x={x}
                y={y + wave + 19}
                fill={paper > 0.5 ? PAPER : BLUE}
                fontFamily="BrandGrotesk"
                fontSize={51}
                fontWeight={600}
                textAnchor="middle"
              >
                {merge > 0.8 ? "+" : ["{", "+", "}"][i]}
              </text>
              {b > 2 &&
                b < 7 &&
                Array.from({ length: 4 }, (_, j) => {
                  const t = (b * 0.4 + j * 0.25) % 1;
                  return (
                    <circle
                      key={j}
                      cx={960 + (x - 960) * t}
                      cy={210 + (y - 210) * t - 70 * Math.sin(t * Math.PI)}
                      r={3 + (j % 2)}
                      fill={color}
                      opacity={0.55}
                    />
                  );
                })}
            </g>
          );
        })}
        {b > 10 &&
          Array.from({ length: 6 }, (_, i) => {
            const a = b * 0.8 + (i * Math.PI) / 3,
              r = 130 + Math.sin(b + i) * 12;
            return (
              <circle
                key={`orbit-${i}`}
                cx={960 + Math.cos(a) * r}
                cy={420 + Math.sin(a) * r * 0.6}
                r={i % 2 ? 5 : 3}
                fill={BLUE}
                opacity={smooth((b - 10) / 1) * 0.5}
              />
            );
          })}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4 + b * 0.1,
            r = 125 + smooth((b - 8) / 3) * 105;
          return (
            <path
              key={i}
              d={`M ${960 + Math.cos(a) * r} ${420 + Math.sin(a) * r * 0.6} l ${Math.cos(a) * 22} ${Math.sin(a) * 22}`}
              stroke={BLUE}
              strokeWidth={3}
              opacity={smooth((b - 8) / 0.5) * (1 - smooth((b - 11) / 2))}
            />
          );
        })}
      </svg>
      <FlyingType
        b={b}
        end={16}
        y={784}
        chinese
        color={paper > 0.5 ? INK : PAPER}
        cues={[
          { at: 0, text: "一个想法。", size: 133 },
          { at: 4, text: "不必独自完成。", size: 133 },
          { at: 8, text: "让灵感汇成贡献。", size: 133 },
          { at: 12, text: "让创造有回响。", size: 133 },
        ]}
      />
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 21,
          letterSpacing: 2,
          opacity: 0.6,
        }}
      >
        {b < 4
          ? "idea"
          : b < 8
            ? "fork → collaborate"
            : b < 12
              ? "pull request → merge"
              : "built together"}
      </div>
    </AbsoluteFill>
  );
};
const sailShape = "M 0 -165 L -118 30 L 0 6 Z";
export const Voyage = ({ b }: { b: number }) => {
  const fold = smooth((b - 1) / 3),
    launch = smooth((b - 8) / 7.5),
    settle = smooth((b - 14.5) / 1.5);
  const cx = 960 + launch * 470,
    cy = 470 - Math.sin(launch * Math.PI) * 70;
  const shrink = 1.5 - launch * 0.95;
  const blue = smooth((b - 6) / 2);
  const mix = (a: number, z: number) => Math.round(a + (z - a) * blue);
  const bg = `rgb(${mix(241, 18)},${mix(240, 84)},${mix(235, 255)})`;
  const ink = blue > 0.5 ? PAPER : BLUE;
  return (
    <AbsoluteFill style={{ background: bg, color: ink }}>
      <PrintGrid b={b} dark={blue > 0.5} />
      <EchoType b={b} text="SET SAIL" color={ink} size={300} y={180} />
      <Sticker
        b={b}
        at={4}
        text="OPEN SOURCE ↗"
        left={210}
        top={280}
        angle={-8}
        blue
        end={14}
      />
      <Sticker
        b={b}
        at={8}
        text="OPEN HORIZONS →"
        left={1210}
        top={160}
        angle={7}
        end={14}
        size={25}
      />
      <Burst b={b} left={1560} top={240} color={ink} size={95} />
      <Frame
        dark={blue > 0.5}
        blue={blue > 0.5}
        label="OPEN SOURCE. OPEN HORIZONS."
      />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M -120 ${670 + i * 30} C 390 ${580 + i * 27 + Math.sin(b * 0.55 + i) * 15}, 1160 ${805 + i * 16}, 2050 ${615 + i * 29}`}
            stroke={ink}
            strokeWidth={i === 0 ? 2 : 1}
            opacity={0.13 + blue * 0.1}
            fill="none"
            transform={`translate(${-Math.sin(b * 0.35 + i) * 35},0)`}
          />
        ))}
        {b > 8 && (
          <path
            d="M 925 515 C 1050 565 1260 330 1640 395"
            fill="none"
            stroke={PAPER}
            strokeWidth={2}
            strokeDasharray="4 12"
            opacity={launch * 0.4}
            strokeDashoffset={-b * 18}
          />
        )}
        <g
          transform={`translate(${cx},${cy}) rotate(${-12 * (1 - fold) + Math.sin(b * 0.65) * 3 + launch * -9}) scale(${shrink})`}
        >
          <ellipse
            cx={0}
            cy={160}
            rx={175}
            ry={22}
            fill={blue > 0.5 ? "#001d7e" : "#617082"}
            opacity={0.12}
          />
          <g transform={`translate(0 ${-30 * (1 - fold)})`}>
            <path
              d={sailShape}
              fill={blue > 0.5 ? "#ffffff" : BLUE}
              transform={`translate(${-95 * (1 - fold)},0) skewY(${-24 * (1 - fold)})`}
            />
            <path
              d="M 17 -130 L 135 30 L 17 7 Z"
              fill={blue > 0.5 ? "#b6d0ff" : "#85acff"}
              transform={`translate(${95 * (1 - fold)},0) skewY(${24 * (1 - fold)})`}
            />
            <path
              d="M -180 55 L 165 55 L 105 117 L -120 117 Z"
              fill={blue > 0.5 ? PAPER : INK}
              transform={`translate(0 ${90 * (1 - fold)})`}
            />
            <path
              d="M -180 55 L 0 82 L 165 55"
              fill="none"
              stroke={blue > 0.5 ? "#9ab9ef" : "#747e95"}
              strokeWidth={2}
            />
            <path
              d="M 6 -188 V 50"
              stroke={blue > 0.5 ? PAPER : INK}
              strokeWidth={4}
            />
            <path
              d="M 8 -188 L 58 -173 L 8 -160"
              fill={blue > 0.5 ? PAPER : BLUE}
            />
          </g>
          {fold < 1 && (
            <text
              x={0}
              y={36}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize={44}
              fill={INK}
              opacity={1 - fold}
            >
              &lt;/&gt;
            </text>
          )}
        </g>
        {b > 11 &&
          [0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={1520 + i * 87}
              cy={325 - i * 40}
              r={3 + i * 0.5}
              fill={PAPER}
              opacity={smooth((b - 11 - i * 0.6) / 1)}
            />
          ))}
      </svg>
      {b > 14.5 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: PAPER,
            clipPath: `circle(${settle * 2300}px at 960px 490px)`,
          }}
        />
      )}
      {b > 14.5 && (
        <div
          style={{
            position: "absolute",
            left: 916,
            top: 446,
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: BLUE,
            opacity: settle,
            transform: `scale(${0.8 + 0.2 * settle})`,
          }}
        />
      )}
      <FlyingType
        b={b}
        end={16}
        y={831}
        chinese
        color={settle > 0.35 ? INK : blue > 0.5 ? PAPER : INK}
        cues={[
          { at: 0, text: "把代码，折成远方。", size: 121 },
          { at: 4, text: "开源筑梦。", size: 154 },
          { at: 8, text: "海事启航。", size: 154 },
          { at: 12, text: "一起，驶向更多可能。", size: 112 },
        ]}
      />
    </AbsoluteFill>
  );
};
