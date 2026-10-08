import { ElasticLetters } from "./ElasticLetters";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  useCurrentFrame,
  useDelayRender,
  staticFile,
  spring,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { asset } from "../film/resources";
import { AtomSculpture } from "./AtomSculpture";
import {
  at,
  beat,
  localBeat,
  shotAt,
  ease,
  smooth,
  unit,
  pulse,
  FPB,
} from "./rhythm";
import "./brand.css";
import { PrintGrid, Sticker, Burst, EchoType } from "./MotionLanguage";
import { FlyingType } from "./FlyingType";
import { hitScale } from "./sync";
const BLUE = "#1254ff",
  INK = "#101113",
  PAPER = "#f1f0eb";
const Center: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{ alignItems: "center", justifyContent: "center", ...style }}
  >
    {children}
  </AbsoluteFill>
);
const Frame: React.FC<{ dark?: boolean; blue?: boolean; label?: string }> = ({
  dark,
  blue,
  label = "OPEN BY DESIGN.",
}) => (
  <>
    <div
      className="brand-corner"
      style={{ top: 53, left: 70, color: dark ? "#ffffff99" : "#10111388" }}
    >
      JMI—OPENATOM
    </div>
    <div
      className="brand-corner"
      style={{ top: 53, right: 70, color: dark ? "#ffffff99" : "#10111388" }}
    >
      FROM CODE TO COMMUNITY.
    </div>
    <div
      className="brand-corner"
      style={{ bottom: 48, left: 70, color: dark ? "#ffffff77" : "#10111377" }}
    >
      {label}
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 52,
        right: 73,
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: blue ? "white" : BLUE,
      }}
    />
  </>
);
const Atom: React.FC<{ progress?: number; color?: string; scale?: number }> = ({
  progress = 1,
  color = "currentColor",
  scale = 1,
}) => (
  <svg viewBox="-130 -100 260 200" width={260 * scale} height={200 * scale}>
    <g fill="none" stroke={color} strokeWidth={6}>
      {[0, 60, 120].map((r) => (
        <ellipse
          key={r}
          rx="110"
          ry="40"
          transform={`rotate(${r})`}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
        />
      ))}
    </g>
    <circle r="11" fill={color} />
  </svg>
);
const Code = ({
  b,
  f,
  onBeat = false,
}: {
  b: number;
  f: number;
  onBeat?: boolean;
}) => {
  const intro = b < 0.5;
  const word = b < 2 ? "CODE." : "OPEN.";
  const age = f - at(b < 2 ? 0.5 : 2);
  const p = onBeat ? 1 : ease(age / 9);
  const wipe = ease((b - 3.55) / 0.45);
  return (
    <AbsoluteFill style={{ background: INK, color: PAPER }}>
      {onBeat && <PrintGrid b={b} dark />}
      {onBeat && !intro && (
        <EchoType
          b={b}
          text={word.slice(0, -1)}
          color={PAPER}
          size={390}
          y={170}
        />
      )}
      {!intro && <Frame dark label="EVERYTHING STARTS WITH A LINE." />}
      {intro ? (
        <Center>
          <div
            style={{
              width: 18,
              height: 84,
              background: BLUE,
              opacity: f % 12 < 8 ? 1 : 0,
            }}
          />
        </Center>
      ) : (
        <Center>
          <div
            style={{
              fontSize: onBeat ? 420 : 350,
              fontWeight: 850,
              letterSpacing: -24,
              lineHeight: 0.8,
              transform: `translateY(${(1 - p) * 250}px) scaleX(${onBeat ? hitScale(Math.max(0, b - (b < 2 ? 0.5 : 2)), 0.008) : 1 + (1 - p) * 0.35})`,
              clipPath: `inset(0 0 ${100 * (1 - p)}% 0)`,
            }}
          >
            {onBeat ? (
              <ElasticLetters
                text={word.slice(0, -1)}
                age={Math.max(0, b - (b < 2 ? 0.5 : 2))}
                duration={b < 2 ? 1.5 : 2}
                mode={b < 2 ? "stretch" : "accordion"}
              />
            ) : (
              word.slice(0, -1)
            )}
            <span style={{ color: BLUE }}>.</span>
          </div>
          <div
            style={{
              position: "absolute",
              top: 785,
              fontSize: 30,
              color: "#c9c9c5",
              letterSpacing: 3,
              opacity: ease((age - 6) / 8),
              fontFamily: "BrandChinese",
            }}
          >
            从一行代码开始。
          </div>
        </Center>
      )}
      {onBeat && !intro && (
        <>
          <Sticker
            b={b}
            at={0.5}
            text="从一行代码开始 ↗"
            left={1160}
            top={780}
            angle={-7}
            blue
            end={3.4}
          />
          <Burst b={b} left={1570} top={250} size={115} />
        </>
      )}
      {b > 3.55 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: BLUE,
            transform: `translateY(${(1 - wipe) * 125}%) rotate(${(1 - wipe) * -8}deg)`,
            transformOrigin: "bottom left",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
const Syntax = ({ b }: { b: number }) => {
  const split = ease(b / 0.55),
    morph = smooth((b - 1.5) / 1.1),
    exit = ease((b - 3.45) / 0.55);
  const angle = -24 + 24 * split;
  return (
    <AbsoluteFill style={{ background: BLUE, color: PAPER }}>
      <Frame dark blue label="AN IDEA. AN OPEN POSSIBILITY." />
      <Center>
        <div
          style={{
            position: "absolute",
            fontSize: 460,
            fontWeight: 450,
            lineHeight: 1,
            transform: `translateX(${-205 * (1 - morph)}px) rotate(${angle}deg) scale(${1 - morph * 0.75})`,
            opacity: 1 - morph,
          }}
        >
          &lt;
        </div>
        <div
          style={{
            position: "absolute",
            fontSize: 460,
            fontWeight: 450,
            lineHeight: 1,
            transform: `translateX(${205 * (1 - morph)}px) rotate(${-angle}deg) scale(${1 - morph * 0.75})`,
            opacity: 1 - morph,
          }}
        >
          &gt;
        </div>
        <div
          style={{
            transform: `rotate(${b * 18}deg) scale(${0.4 + 1.6 * morph})`,
            opacity: morph,
          }}
        >
          <Atom progress={morph} color={PAPER} scale={1.4} />
        </div>
      </Center>
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          width: 2300,
          height: 2300,
          borderRadius: "50%",
          background: PAPER,
          transform: `translate(-50%,-50%) scale(${exit})`,
        }}
      />
    </AbsoluteFill>
  );
};
const Product = ({ b }: { b: number }) => (
  <AbsoluteFill style={{ background: PAPER, color: INK }}>
    <Frame label="CONNECTED BY CURIOSITY." />
    <div
      style={{
        position: "absolute",
        left: 590,
        top: 805,
        width: 740,
        height: 58,
        borderRadius: "50%",
        background: "#152857",
        filter: "blur(43px)",
        opacity: 0.15,
        transform: `scaleX(${0.8 + 0.2 * smooth(b / 3)})`,
      }}
    />
    <AtomSculpture />
    <div
      style={{
        position: "absolute",
        bottom: 148,
        width: "100%",
        textAlign: "center",
        fontSize: 43,
        fontWeight: 650,
        letterSpacing: -1,
        opacity: ease((b - 0.6) / 0.6),
      }}
    >
      Ideas in orbit.
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 102,
        width: "100%",
        textAlign: "center",
        fontFamily: "BrandChinese",
        fontSize: 22,
        color: "#737984",
        letterSpacing: 3,
        opacity: ease((b - 1) / 0.6),
      }}
    >
      因好奇而相遇，因开源而连接。
    </div>
  </AbsoluteFill>
);
const Statement = ({
  b,
  f,
  onBeat = false,
}: {
  b: number;
  f: number;
  onBeat?: boolean;
}) => {
  const second = b >= 2,
    age = f - at(second ? 16 : 14),
    p = onBeat ? 1 : ease(age / 7);
  return (
    <AbsoluteFill style={{ background: second ? BLUE : INK, color: PAPER }}>
      <Frame
        dark
        blue={second}
        label={
          second ? "WE BUILD WITH IT." : "WE DON’T JUST LEARN OPEN SOURCE."
        }
      />
      {onBeat && (
        <>
          <PrintGrid b={b} dark />
          <EchoType
            b={b}
            text={second ? "创造" : "学习"}
            chinese
            color={PAPER}
            size={310}
            y={150}
          />
          <Burst b={b} color={PAPER} left={1550} top={710} />
          <FlyingType
            b={b}
            end={4}
            chinese
            cues={[
              { at: 0, text: "不止学习。", size: 240 },
              { at: 2, text: "动手创造。", size: 258 },
            ]}
          />
        </>
      )}
      <Center style={{ opacity: onBeat ? 0 : 1 }}>
        <div
          style={{
            fontFamily: "BrandChinese",
            fontSize: second ? 209 : 190,
            fontWeight: 900,
            letterSpacing: -10,
            lineHeight: 1.2,
            transform: `scale(${onBeat ? hitScale(b % 2) : 1 + (1 - p) * 0.4}) translateY(${(1 - p) * 80}px)`,
            filter: `blur(${(1 - p) * 9}px)`,
          }}
        >
          {second ? "动手创造。" : "不止学习。"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 225,
            width: second ? 1000 * ease((age - 3) / 9) : 0,
            height: 14,
            background: PAPER,
            transform: "rotate(-2deg)",
          }}
        />
      </Center>
    </AbsoluteFill>
  );
};
const Network = ({ b }: { b: number }) => {
  const p = smooth(b / 2.2),
    out = ease((b - 3.3) / 0.7);
  const points = Array.from({ length: 25 }, (_, i) => {
    const a = i * 2.399;
    const r = i === 0 ? 0 : 140 + Math.sqrt(i) * 65;
    return [960 + Math.cos(a) * r * p, 540 + Math.sin(a) * r * 0.72 * p];
  });
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <Frame label="ONE CONTRIBUTION. MANY CONNECTIONS." />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        {points.slice(1).map((v, i) => (
          <line
            key={i}
            x1={points[Math.floor(i / 2)][0]}
            y1={points[Math.floor(i / 2)][1]}
            x2={v[0]}
            y2={v[1]}
            stroke="#c2c9d2"
            strokeWidth={2}
            opacity={ease((b - i * 0.05) / 0.4)}
          />
        ))}
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={(i === 0 ? 64 : 12 + (i % 4) * 6) * ease((b - i * 0.035) / 0.4)}
            fill={i % 3 === 0 ? BLUE : INK}
          />
        ))}
      </svg>
      <Center>
        <div
          style={{
            fontSize: 48,
            fontWeight: 750,
            color: "white",
            transform: `scale(${ease(b / 0.3)})`,
          }}
        >
          +
        </div>
      </Center>
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 540,
          width: 2400,
          height: 2400,
          borderRadius: "50%",
          background: INK,
          transform: `translate(-50%,-50%) scale(${out})`,
        }}
      />
    </AbsoluteFill>
  );
};
const Verbs = ({ b, f }: { b: number; f: number }) => {
  const index = Math.min(3, Math.floor(b)),
    word = ["BUILD", "SHARE", "CONTRIBUTE", "BELONG"][index];
  const age = f - at(22 + index),
    p = ease(age / 6),
    blue = index === 2;
  const size = word === "CONTRIBUTE" ? 230 : 340;
  return (
    <AbsoluteFill
      style={{
        background: blue ? BLUE : index % 2 ? PAPER : INK,
        color: index % 2 ? INK : PAPER,
      }}
    >
      <Frame
        dark={index % 2 === 0}
        blue={blue}
        label={
          [
            "WE BUILD WITH IT.",
            "WE SHARE WHAT WE KNOW.",
            "WE CONTRIBUTE TO IT.",
            "WE ARE PART OF IT.",
          ][index]
        }
      />
      <Center>
        <div
          style={{
            fontSize: size,
            fontWeight: 850,
            letterSpacing: -size * 0.055,
            lineHeight: 0.88,
            transform: `translateX(${(1 - p) * (index % 2 ? -270 : 270)}px) scaleY(${1 + (1 - p) * 0.6})`,
            clipPath: `inset(${(1 - p) * 100}% 0 0 0)`,
          }}
        >
          {word}
          <span style={{ color: blue ? PAPER : BLUE }}>.</span>
        </div>
      </Center>
    </AbsoluteFill>
  );
};
const BrandPromise = ({ b }: { b: number }) => {
  const p = ease(b / 0.5);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <Frame label="AN OPEN SOURCE COMMUNITY." />
      <div
        style={{
          position: "absolute",
          left: 125,
          top: 258,
          fontSize: 137,
          lineHeight: 1.06,
          fontWeight: 800,
          letterSpacing: -8,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div style={{ transform: `translateY(${(1 - p) * 110}%)` }}>
            FROM <span style={{ color: BLUE }}>CODE</span>
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              transform: `translateY(${(1 - ease((b - 0.45) / 0.5)) * 110}%)`,
            }}
          >
            TO COMMUNITY.
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 136,
          bottom: 244,
          fontFamily: "BrandChinese",
          fontSize: 32,
          fontWeight: 500,
          letterSpacing: 1,
          opacity: ease((b - 0.8) / 0.7),
        }}
      >
        从一行代码，到一个真正的开源社区。
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: BLUE,
          transform: `translateX(${(1 - ease((b - 2.6) / 0.4)) * 110}%) skewX(${(1 - ease((b - 2.6) / 0.4)) * -12}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};
const End = ({ b }: { b: number }) => {
  const logo = asset("logo/jmi-openatom.png");
  return (
    <AbsoluteFill style={{ background: BLUE, color: PAPER }}>
      <Frame dark blue label="JOIN. BUILD. CONTRIBUTE." />
      <Center>
        <div
          style={{
            position: "absolute",
            top: 216,
            transform: `scale(${0.9 + 0.1 * ease(b / 0.5)})`,
          }}
        >
          {logo ? (
            <Img
              src={logo}
              style={{
                width: 190,
                height: 190,
                filter: "brightness(0) invert(1)",
                objectFit: "contain",
              }}
            />
          ) : (
            <Atom color="white" scale={0.8} />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: 450,
            fontSize: 139,
            letterSpacing: -8,
            fontWeight: 800,
          }}
        >
          JMI—OPENATOM
        </div>
        <div
          style={{
            position: "absolute",
            top: 652,
            fontFamily: "BrandChinese",
            fontSize: 30,
            letterSpacing: 4,
            fontWeight: 500,
          }}
        >
          江苏海事职业技术学院 · 开放原子开源社团
        </div>
        <div
          style={{
            position: "absolute",
            top: 785,
            fontSize: 23,
            letterSpacing: 2,
            opacity: 0.8,
          }}
        >
          jmi-openatom.cn
        </div>
      </Center>
    </AbsoluteFill>
  );
};
export const BrandStudy: React.FC = () => {
  const f = useCurrentFrame(),
    shot = shotAt(f),
    b = localBeat(f);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading brand typography"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    Promise.all([
      loadFont({
        family: "BrandGrotesk",
        url: staticFile("fonts/FilmGrotesk.ttf"),
        weight: "100 900",
      }),
      loadFont({
        family: "BrandChinese",
        url: staticFile("fonts/FilmChinese.ttf"),
        weight: "100 900",
      }),
    ])
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch(cancelRender);
  }, [handle, continueRender, cancelRender]);
  const audio = asset("audio/brand-study.wav");
  return (
    <AbsoluteFill className="brand-study">
      {ready && (
        <>
          {shot === 0 && <Code b={b} f={f} />} {shot === 1 && <Syntax b={b} />}{" "}
          {shot === 2 && <Product b={b} />}{" "}
          {shot === 3 && <Statement b={b} f={f} />}{" "}
          {shot === 4 && <Network b={b} />}{" "}
          {shot === 5 && <Verbs b={b} f={f} />}{" "}
          {shot === 6 && <BrandPromise b={b} />} {shot === 7 && <End b={b} />}
        </>
      )}
      {audio && <Audio src={audio} />}
    </AbsoluteFill>
  );
};

export {
  Frame,
  Center,
  Atom,
  Code,
  Syntax,
  Product,
  Statement,
  Network,
  BrandPromise,
  End,
};
