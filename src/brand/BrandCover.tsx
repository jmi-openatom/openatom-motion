import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import "./brand.css";
/** Static cover artwork: exact logo and copy share the film's native fonts. */
export const BrandCover = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading cover typography"));
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
  if (!ready) return null;
  const x = portrait ? 90 : 112,
    top = portrait ? 340 : 260;
  const cx = portrait ? 740 : 1450,
    cy = portrait ? 1230 : 560;
  return (
    <AbsoluteFill
      className="brand-study"
      style={{
        background: "#1254ff",
        color: "#f1f0eb",
        fontFamily: "BrandGrotesk",
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={320 + i * 105}
            ry={175 + i * 65}
            fill="none"
            stroke="#f1f0eb"
            strokeWidth={1.2}
            opacity={0.085}
            transform={`rotate(-31,${cx},${cy})`}
          />
        ))}
      </svg>
      <Img
        src={staticFile("logo/jmi-openatom.png")}
        style={{
          position: "absolute",
          left: x,
          top: portrait ? 108 : 82,
          width: portrait ? 80 : 66,
          height: portrait ? 80 : 66,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x + (portrait ? 108 : 94),
          top: portrait ? 133 : 100,
          fontSize: portrait ? 31 : 29,
          fontWeight: 650,
          letterSpacing: 1,
        }}
      >
        JMI—OPENATOM
      </div>
      <div
        style={{
          position: "absolute",
          left: x,
          top,
          fontFamily: "BrandChinese",
          fontSize: portrait ? 158 : 139,
          lineHeight: 1.16,
          fontWeight: 800,
          letterSpacing: portrait ? -6 : -5,
        }}
      >
        开源筑梦
        <br />
        海事启航<span style={{ color: "#a8c5ff" }}>。</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: x + 5,
          top: portrait ? 754 : 622,
          fontFamily: "BrandChinese",
          fontSize: portrait ? 31 : 29,
          fontWeight: 450,
          letterSpacing: 1,
          color: "#f1f0ebdc",
        }}
      >
        从一行代码，到一个开源社区。
      </div>
      <Img
        src={staticFile("generated/cover-atom-v8.png")}
        style={{
          position: "absolute",
          left: portrait ? 112 : 925,
          top: portrait ? 810 : 152,
          width: portrait ? 856 : 854,
          height: portrait ? 856 : 854,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: portrait ? 1744 : 929,
          width: portrait ? 900 : 1660,
          height: 1,
          background: "#ffffff3d",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: portrait ? 1776 : 957,
          fontFamily: "BrandChinese",
          fontSize: portrait ? 24 : 25,
          fontWeight: 450,
          letterSpacing: portrait ? 1 : 2,
          color: "#f1f0ebcf",
        }}
      >
        江苏海事职业技术学院 · 开放原子开源社团
      </div>
      <div
        style={{
          position: "absolute",
          left: x,
          top: portrait ? 1830 : 1001,
          fontSize: portrait ? 23 : 21,
          letterSpacing: 1.6,
          color: "#f1f0ebaa",
        }}
      >
        OPEN SOURCE. OPEN HORIZONS.
      </div>
    </AbsoluteFill>
  );
};
