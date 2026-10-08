import React from "react";
import { AbsoluteFill } from "remotion";
import {
  PrintGrid,
  Sticker,
  Burst,
  EchoType,
  SliceCurtain,
} from "./MotionLanguage";
import { Frame, Center } from "./BrandStudy";
import { ease, smooth, pulse } from "./rhythm";
const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
export const WebCraft = ({ b }: { b: number }) => {
  const open = ease(b / 0.6),
    sweep = ease((b - 3.35) / 0.65);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <PrintGrid b={b} />
      <Frame label="WEB / FROM STRUCTURE TO EXPERIENCE." />
      <Sticker
        b={b}
        at={0.5}
        text="WEB ↗"
        left={190}
        top={160}
        angle={-9}
        blue
        end={3.3}
        size={41}
      />
      <Sticker
        b={b}
        at={1.5}
        text="BUILD SOMETHING."
        left={1245}
        top={785}
        angle={8}
        dark
        end={3.3}
        size={26}
      />
      <Burst b={b} left={1565} top={230} size={95} />

      <div style={{ position: "absolute", inset: 0, perspective: 1600 }}>
        <div
          style={{
            position: "absolute",
            left: 390,
            top: 190,
            width: 1140,
            height: 665,
            border: "3px solid #101113",
            borderRadius: 20,
            overflow: "hidden",
            background: PAPER,
            transform: `rotateY(${-14 + open * 14 + Math.sin(b * 1.1) * 3}deg) rotateX(${Math.sin(b * 0.8) * 3}deg) rotateZ(${-5 + open * 5 + Math.sin(b * 1.5) * 1.2}deg) translateY(${(1 - open) * 260}px) scale(${0.85 + 0.15 * open + sweep * 0.4})`,
          }}
        >
          <div
            style={{
              height: 58,
              borderBottom: "2px solid #101113",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 22,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: i === 2 ? BLUE : INK,
                }}
              />
            ))}
          </div>
          <div
            style={{
              padding: "55px 60px",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            MAKE
            <br />
            <span style={{ color: BLUE }}>IT WORK.</span>
          </div>
          <svg
            width={1140}
            height={225}
            style={{ position: "absolute", bottom: 0 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d={`M -50 ${180 - i * 13} C 350 ${-80 + i * 12} 590 ${410 - i * 8} 1210 ${-40 + i * 10}`}
                fill="none"
                stroke={i % 3 === 0 ? BLUE : "#bec8db"}
                strokeWidth={2}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - ease((b - 0.6 - i * 0.03) / 1.2)}
              />
            ))}
          </svg>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 119,
          width: "100%",
          textAlign: "center",
          fontSize: 27,
          letterSpacing: 1,
        }}
      >
        Vue <span style={{ color: "#a2a2a2", margin: 25 }}>/</span> React{" "}
        <span style={{ color: "#a2a2a2", margin: 25 }}>/</span> Spring Boot
      </div>
      {sweep > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: INK,
            transform: `translateX(${(1 - sweep) * 110}%)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const ServerCraft = ({ b }: { b: number }) => (
  <AbsoluteFill style={{ background: INK, color: PAPER }}>
    <PrintGrid b={b} dark />
    <Frame dark label="SERVER / KEEP IDEAS RUNNING." />
    <Sticker
      b={b}
      at={0.5}
      text="INFRASTRUCTURE ↗"
      left={160}
      top={165}
      angle={-7}
      blue
      end={3.4}
      size={28}
    />
    <Burst b={b} left={1590} top={765} color={PAPER} size={100} />

    <div style={{ position: "absolute", inset: 0, perspective: 1500 }}>
      <div
        style={{
          position: "absolute",
          left: 290,
          top: 210,
          width: 1340,
          height: 660,
          transform: `rotateY(${-18 + b * 4}deg) rotateX(${7 + Math.sin(b) * 3}deg) translateX(${Math.sin(b * 0.9) * 35}px) scale(${1 + b * 0.008})`,
        }}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 194,
              top: Math.sin(i * 0.9 + b) * 28,
              width: 156,
              height: 570,
              background:
                "linear-gradient(100deg,#747c88,#30343d 24%,#505969 87%,#1d242f)",
              border: "1px solid #a4aab2",
              borderRadius: 8,
              transform: `translateY(${(1 - ease((b - i * 0.075) / 0.7)) * 650}px)`,
            }}
          >
            {Array.from({ length: 12 }, (_, j) => (
              <div
                key={j}
                style={{
                  position: "absolute",
                  left: 16,
                  top: 26 + j * 43,
                  width: 121,
                  height: 29,
                  background: "#0a0c10",
                  borderBottom: "1px solid #363a44",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 14,
                    width: 64,
                    height: 2,
                    background: "#343942",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 10,
                    width: 6,
                    height: 6,
                    borderRadius: 2,
                    background:
                      (j + i + Math.floor(b * 4)) % 4 === 0 ? "#f1f0eb" : BLUE,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 115,
        width: "100%",
        textAlign: "center",
        fontSize: 25,
        letterSpacing: 3,
        color: "#a2a6ae",
      }}
    >
      LINUX <span style={{ padding: 30, color: BLUE }}>→</span> DOCKER{" "}
      <span style={{ padding: 30, color: BLUE }}>→</span> NGINX
    </div>
    <SliceCurtain b={b} start={3.4} color={PAPER} />
  </AbsoluteFill>
);
export const VisionCraft = ({ b }: { b: number }) => {
  const x = 960 + Math.sin(b * 1.3) * 210,
    y = 510 + Math.cos(b * 1.9) * 80,
    exp = 1 + ease((b - 3.2) / 0.8) * 12;
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <Frame label="AI / SEE THE POSSIBILITY." />
      <Sticker
        b={b}
        at={0.5}
        text="SEE / LEARN / CREATE"
        left={1270}
        top={750}
        angle={6}
        blue
        end={3.15}
        size={25}
      />
      <Burst b={b} left={260} top={255} size={90} />

      <svg width={1920} height={1080}>
        <defs>
          <pattern
            id="vision-dots"
            width={44}
            height={44}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={22} cy={22} r={1} fill="#d4d3cf" />
          </pattern>
        </defs>
        <rect width={1920} height={1080} fill="url(#vision-dots)" />
        <circle cx={x} cy={y} r={138 * exp} fill={BLUE} />
        <ellipse
          cx={x}
          cy={y + 157}
          rx={142}
          ry={12}
          fill="#000"
          opacity={0.07}
        />
        <g
          transform={`translate(${x},${y}) scale(${exp})`}
          stroke={INK}
          fill="none"
          strokeWidth={3}
          opacity={1 - ease((b - 3.2) / 0.6)}
        >
          {[-1, 1].flatMap((s) =>
            [-1, 1].map((t) => (
              <path
                key={s + ":" + t}
                d={`M ${s * 100} ${t * 175} H ${s * 175} V ${t * 100}`}
              />
            )),
          )}
          <path d="M -16 0 H 16 M 0 -16 V 16" stroke="white" />
        </g>
        <line
          x1={430}
          y1={220 + ((b * 0.8) % 1) * 600}
          x2={1490}
          y2={220 + ((b * 0.8) % 1) * 600}
          stroke={BLUE}
          opacity={0.35}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: x - 175,
          top: y - 231,
          fontSize: 25,
          fontFamily: "monospace",
        }}
      >
        object / {Math.floor(96 + pulse(b) * 3)}%
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          bottom: 145,
          fontSize: 76,
          fontWeight: 750,
          letterSpacing: -4,
        }}
      >
        AI <span style={{ color: BLUE }}>×</span> YOLO
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 153,
          fontSize: 20,
          letterSpacing: 2,
          color: "#72767c",
        }}
      >
        TRACKING / MOTION STUDY
      </div>
    </AbsoluteFill>
  );
};
export const HarmonyCraft = ({ b }: { b: number }) => {
  const p = ease(b / 0.6);
  return (
    <AbsoluteFill style={{ background: BLUE, color: PAPER }}>
      <EchoType b={b} text="CONNECT" color={PAPER} size={310} y={240} />
      <Frame dark blue label="OPENHARMONY / BUILD BEYOND THE SCREEN." />
      <Sticker
        b={b}
        at={0.5}
        text="OPENHARMONY ↗"
        left={220}
        top={200}
        angle={-8}
        end={3.3}
        size={36}
      />
      <Sticker
        b={b}
        at={1.5}
        text="ONE CONNECTED WORLD"
        left={1190}
        top={760}
        angle={8}
        dark
        end={3.3}
        size={26}
      />
      <Burst b={b} left={1550} top={260} color={PAPER} />

      <div style={{ position: "absolute", inset: 0, perspective: 1800 }}>
        <div
          style={{
            position: "absolute",
            left: 748,
            top: 155,
            width: 424,
            height: 755,
            borderRadius: 60,
            padding: 13,
            background:
              "linear-gradient(110deg,#98a3b8,#182031 20%,#444e62 80%,#adb7c9)",
            boxShadow: "35px 42px 70px #00174b66",
            transform: `translateY(${(1 - p) * 220}px) rotateY(${-26 + smooth(b / 4) * 46}deg) rotateZ(${-8 + b * 3}deg) scale(${1 + ease((b - 3.35) / 0.65) * 0.45})`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 47,
              background: PAPER,
              color: INK,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 135,
                width: 128,
                height: 29,
                borderRadius: 30,
                background: INK,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 102,
                left: 31,
                fontSize: 24,
                fontWeight: 650,
              }}
            >
              OpenHarmony
            </div>
            <div
              style={{
                position: "absolute",
                left: 29,
                top: 158,
                fontSize: 64,
                lineHeight: 1.04,
                letterSpacing: -3,
                fontWeight: 750,
              }}
            >
              ONE
              <br />
              CONNECTED
              <br />
              <span style={{ color: BLUE }}>WORLD.</span>
            </div>
            <svg
              width={390}
              height={245}
              style={{ position: "absolute", bottom: 105 }}
            >
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={198}
                  cy={122}
                  r={40 + i * 31 + pulse(b) * 5}
                  stroke={BLUE}
                  fill="none"
                  strokeWidth={i === 0 ? 12 : 2}
                />
              ))}
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: 45,
                left: 33,
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              ArkTS / ArkUI
            </div>
          </div>
        </div>
      </div>
      <SliceCurtain b={b} start={3.4} color={PAPER} />
    </AbsoluteFill>
  );
};
