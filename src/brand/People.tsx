import { letterShape } from "./ElasticLetters";
import score from "./full-score.json";
import { PrintGrid, Sticker, Burst, EchoType } from "./MotionLanguage";
import { FlyingType, flightAt } from "./FlyingType";
import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { Frame, Center, Atom } from "./BrandStudy";
import { ease, smooth, pulse, pop } from "./rhythm";
import { hitScale } from "./sync";
import { imageFiles, asset } from "../film/resources";
const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
export const Campus = ({ b }: { b: number }) => {
  const paths = [...imageFiles("activities"), ...imageFiles("campus")];
  const index = Math.min(Math.max(0, paths.length - 1), Math.floor(b / 10));
  const photo = paths[index] && asset(paths[index]);
  const local = b % 10;
  const enter = ease(local / 1.6);
  const end = ease((b - 18) / 2);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <Frame label="REAL PEOPLE. REAL POSSIBILITIES." />
      {photo ? (
        <div
          style={{
            position: "absolute",
            left: 140,
            top: 147,
            width: 1640,
            height: 660,
            overflow: "hidden",
            clipPath: `inset(${(1 - enter) * 50}% 0)`,
            transform: `translateX(${Math.sin(local * 0.36) * 22}px) rotate(${Math.sin(local * 0.3) * 0.8}deg) scale(${0.96 + smooth(local / 10) * 0.06})`,
          }}
        >
          <Img
            src={photo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${1.18 + local * 0.006}) translateX(${(smooth(local / 10) - 0.5) * (index % 2 ? -160 : 160)}px) translateY(${Math.sin(local * 0.27) * 15}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent 65%,#0005)",
            }}
          />
        </div>
      ) : (
        <Center>
          <Atom scale={2.3} color={BLUE} />
        </Center>
      )}
      <div
        style={{
          position: "absolute",
          left: 145,
          bottom: 130,
          fontFamily: "BrandChinese",
          fontWeight: 650,
          fontSize: 46,
          letterSpacing: 0,
        }}
      >
        {b < 10 ? "代码之外，是一起创造的人。" : "开源筑梦，海事启航。"}
      </div>
      <div
        style={{
          position: "absolute",
          right: 150,
          bottom: 138,
          fontSize: 20,
          letterSpacing: 2,
          color: "#757b82",
        }}
      >
        JMI /{" "}
        {paths[index]?.startsWith("activities") ? "TOGETHER" : "OUR CAMPUS"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 111,
          width: 700 * ease(local / 2),
          height: 5,
          background: BLUE,
          transform: `translateX(${smooth(local / 10) * 90}px)`,
        }}
      />
      {local > 9 && b < 18 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: PAPER,
            transform: `translateX(${(1 - ease((local - 9) / 1)) * 120}%) skewX(-12deg)`,
          }}
        />
      )}
      {b > 18 && (
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 540,
            width: 2500,
            height: 2500,
            borderRadius: "50%",
            background: PAPER,
            transform: `translate(-50%,-50%) scale(${end})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const Community = ({ b }: { b: number }) => {
  const grow = smooth(b / 9),
    word = b >= 9.62;
  const count = Math.min(75, Math.floor(1 + grow * 74));
  const nodes = Array.from({ length: 75 }, (_, i) => {
    const a = i * 2.399 + b * 0.07,
      r = i === 0 ? 0 : 80 + Math.sqrt(i) * 48 + Math.sin(b * 1.6 + i) * 17;
    return [960 + Math.cos(a) * r, 490 + Math.sin(a) * r * 0.7];
  });
  const collapse = smooth((b - 9.62) / 0.7);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <PrintGrid b={b} />
      <Frame label="A COMMUNITY IS BUILT, ONE CONTRIBUTION AT A TIME." />
      <Sticker
        b={b}
        at={2}
        text="CREATE ↗"
        left={1320}
        top={228}
        angle={8}
        blue
        end={10}
      />
      <Sticker
        b={b}
        at={4}
        text="SHARE →"
        left={320}
        top={690}
        angle={-10}
        end={10}
      />
      <Sticker
        b={b}
        at={6}
        text="CONTRIBUTE +"
        left={1270}
        top={730}
        angle={-5}
        dark
        end={10}
      />
      <Burst b={b} left={340} top={245} size={95} />

      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${1 - collapse * 0.3})`,
          opacity: 1 - collapse * 0.95,
        }}
      >
        {nodes.slice(1, count).map(([x, y], i) => (
          <line
            key={i}
            x1={nodes[Math.floor(i / 2)][0]}
            y1={nodes[Math.floor(i / 2)][1]}
            x2={x}
            y2={y}
            stroke="#c7ccd4"
            strokeWidth={1.5}
          />
        ))}
        {!word && (
          <circle
            cx={960}
            cy={490}
            r={48 + (b % 2) * 92}
            fill="none"
            stroke={BLUE}
            strokeWidth={2}
            opacity={Math.exp(-(b % 2) * 4) * 0.45}
          />
        )}
        {nodes.slice(0, count).map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={
              i === 0
                ? 44 + pulse(b) * 8
                : 7 + (i % 4) * 3 + pulse(b + i * 0.05) * 5
            }
            fill={i % 4 ? INK : BLUE}
          />
        ))}
      </svg>
      {!word && (
        <FlyingType
          b={b}
          end={10}
          chinese
          color={INK}
          y={868}
          cues={score.communityWords.map((c) => ({
            at:
              c.beat -
              score.sections.find((s) => s.name === "community")!.start,
            text: c.text,
            size: 142,
          }))}
        />
      )}
      {word && (
        <FlyingType
          b={b}
          end={16}
          chinese
          color={INK}
          cues={[{ at: 10, text: "一起，成为社区。", size: 182 }]}
        />
      )}
      {b > 15.5 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BLUE,
            transform: `translateY(${(1 - ease((b - 15.5) / 0.5)) * 110}%)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const BuildFinal = ({ b }: { b: number }) => {
  const fast = b > 8;
  const phase = Math.floor(b * (fast ? 2 : 1));
  const words = [
    "feat",
    "fix",
    "docs",
    "refactor",
    "merge",
    "build",
    "commit",
    "pull request",
  ];
  const hitAge = (b * (fast ? 2 : 1) - phase) / (fast ? 2 : 1);
  const p = 1;
  const field = b < 12 ? BLUE : b < 14 ? INK : PAPER;
  const foreground = field === PAPER ? INK : PAPER;
  const active =
    words[Math.min(23, Math.floor(b < 8 ? b : 8 + (b - 8) * 2)) % 8];
  return (
    <AbsoluteFill style={{ background: field, color: foreground }}>
      <PrintGrid b={b} dark={field !== PAPER} />
      <EchoType
        b={b}
        text={active.toUpperCase()}
        color={foreground}
        size={310}
        y={230}
      />
      <Frame
        dark={field !== PAPER}
        blue={field === BLUE}
        label="EVERY CONTRIBUTION COUNTS."
      />
      <Sticker
        b={b}
        at={1}
        text="OPEN SOURCE ↗"
        left={230}
        top={205}
        angle={-9}
        end={15.5}
      />
      <Sticker
        b={b}
        at={4}
        text="MERGE / BUILD / SHIP"
        left={1220}
        top={785}
        angle={6}
        dark
        end={15.5}
        size={26}
      />
      <Burst b={b} left={1570} top={230} color={foreground} />

      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse
            key={i}
            cx={960}
            cy={540}
            rx={150 + i * 75}
            ry={75 + i * 40}
            fill="none"
            stroke={foreground}
            strokeWidth={1}
            opacity={0.08 + (i % 3) * 0.03}
            transform={`rotate(${b * 8 + i * 12},960,540)`}
          />
        ))}
      </svg>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {[0, 1, 2, 3].map((i) => {
          const phase = (b * 0.5 + i * 0.25) % 1;
          const a = (i * Math.PI) / 2 + b * 0.25;
          const r = 330 + phase * 145;
          return (
            <g
              key={i}
              transform={`translate(${960 + Math.cos(a) * r},${540 + Math.sin(a) * r * 0.65}) rotate(${b * 35 + i * 45})`}
              opacity={Math.sin(phase * Math.PI) * 0.45}
              stroke={foreground}
              strokeWidth={2.5}
              fill="none"
            >
              {i % 2 ? (
                <path d="M -12 0 H 12 M 0 -12 V 12" />
              ) : (
                <circle r={9} />
              )}
            </g>
          );
        })}
      </svg>
      <FlyingType
        b={b}
        end={16}
        suffix="+"
        color={foreground}
        cues={Array.from({ length: 24 }, (_, i) => ({
          at: i < 8 ? i : 8 + (i - 8) * 0.5,
          text: words[i % 8],
          size:
            words[i % 8] === "pull request"
              ? 230
              : words[i % 8].length <= 4
                ? 390
                : 320,
        }))}
      />

      <div
        style={{
          position: "absolute",
          left: 130,
          bottom: 135,
          fontSize: 24,
          fontFamily: "BrandChinese",
          letterSpacing: 1,
        }}
      >
        每一次贡献，都让我们更进一步。
      </div>
      {b > 15.5 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: PAPER,
            transform: `scaleY(${ease((b - 15.5) / 0.5)})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const Creed = ({ b }: { b: number }) => {
  const index = Math.min(3, Math.floor(b / 4)),
    local = b - index * 4,
    p = ease(local / 0.4);
  const lines = [
    ["不止于", "学习开源。"],
    ["用开源", "创造。"],
    ["为开源", "贡献。"],
    ["我们，也是", "开源的一部分。"],
  ];
  const dark = index % 2 === 1;
  return (
    <AbsoluteFill
      style={{ background: dark ? INK : PAPER, color: dark ? PAPER : INK }}
    >
      <Frame
        dark={dark}
        label={
          [
            "不止学习开源。",
            "用开源创造。",
            "为开源贡献。",
            "成为开源的一部分。",
          ][index]
        }
      />
      <PrintGrid b={b} dark={dark} />
      <EchoType
        b={b}
        text={["学习", "创造", "贡献", "开源"][index]}
        chinese
        color={dark ? PAPER : BLUE}
        size={320}
        y={225}
      />
      <Burst b={b} left={1520} top={735} color={dark ? PAPER : BLUE} />
      <Center>
        <div
          style={{
            fontSize: index === 3 ? 156 : 185,
            fontFamily: "BrandChinese",
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1.35,
            textAlign: "center",
            transform: `scale(${1 + local * 0.002})`,
          }}
        >
          {lines[index].map((line, row) => (
            <div
              key={row}
              style={{
                whiteSpace: "nowrap",
                color: row === 1 ? BLUE : undefined,
                transform: "none",
              }}
            >
              {Array.from(line).map((word, i) => {
                const age = local - row;
                const movement = flightAt(
                  age,
                  3.85 - row,
                  row ? -1 : 1,
                  row === 0,
                );
                const flutter = 0;
                const elastic = letterShape(
                  Math.max(0, age),
                  3.85 - row,
                  i,
                  line.length,
                  index % 2 ? "wave" : "ribbon",
                );
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      marginRight: 3,
                      transform: `translate(${movement.x + elastic.x}px,${movement.y + flutter + elastic.y}px) rotate(${movement.rotate + elastic.rotate}deg) skewX(${elastic.skew}deg) scale(${movement.scale * elastic.sx},${movement.scale * elastic.sy})`,
                      opacity: movement.opacity,
                      filter:
                        movement.blur > 0.2
                          ? `blur(${movement.blur}px)`
                          : "none",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </Center>
    </AbsoluteFill>
  );
};

export const ChinesePromise = ({ b }: { b: number }) => {
  const lines = ["从一行代码，", "到一个真正的", "开源社区。"];
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <Frame label="FROM CODE TO COMMUNITY." />
      <div
        style={{
          position: "absolute",
          left: 155,
          top: 222,
          fontFamily: "BrandChinese",
          fontSize: 132,
          fontWeight: 850,
          lineHeight: 1.45,
          letterSpacing: -3,
        }}
      >
        {lines.map((line, i) => (
          <div
            key={line}
            style={{ overflow: "hidden", color: i === 2 ? BLUE : INK }}
          >
            <div
              style={{
                transform: `translateY(${(1 - ease((b - i * 0.45) / 0.75)) * 115}%) translateX(${Math.sin(b * 0.45 + i) * 8}px)`,
              }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>
      {b > 5.25 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BLUE,
            transform: `translateX(${(1 - ease((b - 5.25) / 0.75)) * 115}%)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
