import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { flightAt } from "./FlyingType";
import { Frame } from "./BrandStudy";
import { ease, smooth, pop } from "./rhythm";
const BLUE = "#1254ff",
  PAPER = "#f1f0eb",
  INK = "#101113";
/** One continuous shot: the punctuation becomes the blue field; logo and type settle into it. */
export const BrandOutro = ({ b }: { b: number }) => {
  const fill = smooth((b - 4.4) / 2.15),
    leave = smooth((b - 4.1) / 1.6);
  const logoIn = smooth((b - 5.5) / 1),
    titleIn = ease((b - 7) / 1),
    schoolIn = ease((b - 9) / 1.2),
    urlIn = ease((b - 10) / 1.3);
  return (
    <AbsoluteFill style={{ background: PAPER, color: INK }}>
      <AbsoluteFill
        style={{ opacity: 1 - smooth((b - 5) / 1), pointerEvents: "none" }}
      >
        <Frame label="FROM CODE TO COMMUNITY." />
      </AbsoluteFill>
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
          opacity: 1 - leave,
          transform: `translateY(${-leave * 40}px)`,
        }}
      >
        {["从一行代码，", "到一个真正的", "开源社区。"].map((line, i) => (
          <div key={line} style={{ color: i === 2 ? BLUE : INK }}>
            <div
              style={{
                transform: `translate(${flightAt(b - i, 6.1 - i, i % 2 ? 1 : -1, i === 0).x}px,${flightAt(b - i, 6.1 - i, i % 2 ? 1 : -1, i === 0).y}px) rotate(${flightAt(b - i, 6.1 - i, i % 2 ? 1 : -1, i === 0).rotate}deg)`,
                opacity: flightAt(b - i, 6.1 - i, i % 2 ? 1 : -1, i === 0)
                  .opacity,
              }}
            >
              {line}
            </div>
          </div>
        ))}
      </div>
      {b > 4.4 && (
        <div
          style={{
            position: "absolute",
            left: 795 + (960 - 795) * fill,
            top: 745 + (540 - 745) * fill,
            width: 4800,
            height: 4800,
            borderRadius: "50%",
            background: BLUE,
            transform: `translate(-50%,-50%) scale(${0.004 + (1 - 0.004) * fill})`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: smooth((b - 6.3) / 1.1),
          color: PAPER,
        }}
      >
        <Frame dark blue label="JOIN. BUILD. CONTRIBUTE." />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 148,
          display: "flex",
          justifyContent: "center",
          opacity: logoIn,
          transform: `translateY(${(1 - logoIn) * 30}px) scale(${0.88 + 0.12 * logoIn})`,
        }}
      >
        <Img
          src={staticFile("logo/jmi-openatom-outro-white.svg")}
          style={{
            width: 175,
            height: 175,
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 357,
          width: "100%",
          textAlign: "center",
          color: PAPER,
          fontSize: 139,
          letterSpacing: -8,
          fontWeight: 800,
          clipPath: `inset(0 0 ${(1 - titleIn) * 100}% 0)`,
          transform: `translateY(${(1 - titleIn) * 38}px)`,
        }}
      >
        JMI—OPENATOM
      </div>

      <div
        style={{
          position: "absolute",
          top: 565,
          width: "100%",
          textAlign: "center",
          color: PAPER,
          fontFamily: "BrandChinese",
          fontSize: 69,
          fontWeight: 750,
          letterSpacing: 3,
        }}
      >
        {["开源筑梦，", "海事启航"].map((text, i) => {
          const q = ease((b - 8 - i + 0.35) / 0.35);
          return (
            <span
              key={text}
              style={{
                display: "inline-block",
                opacity: q,
                transform: `translateY(${(1 - pop((b - 8 - i + 0.35) / 0.35)) * 35}px)`,
              }}
            >
              {text}
            </span>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 707,
          width: "100%",
          textAlign: "center",
          color: PAPER,
          fontFamily: "BrandChinese",
          fontSize: 27,
          letterSpacing: 4,
          fontWeight: 500,
          opacity: schoolIn,
          transform: `translateY(${(1 - schoolIn) * 20}px)`,
        }}
      >
        江苏海事职业技术学院 · 开放原子开源社团
      </div>
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: urlIn * 0.15,
        }}
      >
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M -100 ${960 + i * 17} C 400 ${870 + i * 21 + Math.sin(b * 0.6) * 15}, 1260 ${1060 + i * 17}, 2020 ${930 + i * 17}`}
            fill="none"
            stroke={PAPER}
            strokeWidth={1.5}
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          top: 810,
          width: "100%",
          textAlign: "center",
          color: "#ffffffcc",
          fontSize: 23,
          letterSpacing: 2,
          lineHeight: 2.4,
          opacity: urlIn,
        }}
      >
        jmi-openatom.cn
        <br />
        <span style={{ fontSize: 21, letterSpacing: 1 }}>
          github.com/jmi-openatom
        </span>
      </div>
    </AbsoluteFill>
  );
};
