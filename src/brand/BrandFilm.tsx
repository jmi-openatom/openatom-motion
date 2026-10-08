import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  useVideoConfig,
  useDelayRender,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/fonts";
import { asset } from "../film/resources";
import {
  Code,
  Syntax,
  Product,
  Statement,
  BrandPromise,
  End,
} from "./BrandStudy";
import { WebCraft, ServerCraft, VisionCraft, HarmonyCraft } from "./Technology";
import { SystemProject, PublishProject } from "./Projects";
import { Campus, Community, BuildFinal, Creed, ChinesePromise } from "./People";
import { sectionAtBeat, FILM_FRAMES } from "./full-timeline";
import { Contribution, Voyage } from "./Imagination";
import { BrandOutro } from "./BrandOutro";
import { nativeBeat } from "./sync";
import { beat, ease, smooth } from "./rhythm";
export const BrandFilm = () => {
  const { fps } = useVideoConfig();
  const outputFrame = useCurrentFrame();
  const clock = nativeBeat(outputFrame, fps);
  const f = (outputFrame * 30) / fps;
  const s = sectionAtBeat(clock),
    b = Math.max(0, clock - s.start);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [handle] = useState(() => delayRender("Loading brand fonts"));
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
  const audio = asset("audio/brand-film.wav");
  return (
    <AbsoluteFill className="brand-study">
      {ready && (
        <>
          {s.name === "code" && <Code b={b} f={f} onBeat />}
          {s.name === "syntax" && <Syntax b={b} />}
          {s.name === "sculpture" && <Product b={b} />}
          {s.name === "statement" && <Statement b={b} f={f} onBeat />}
          {s.name === "web" && <WebCraft b={b} />}
          {s.name === "server" && <ServerCraft b={b} />}
          {s.name === "vision" && <VisionCraft b={b} />}
          {s.name === "harmony" && <HarmonyCraft b={b} />}
          {s.name === "system" && <SystemProject b={b} />}
          {s.name === "publish" && <PublishProject b={b} />}
          {s.name === "contribution" && <Contribution b={b} />}
          {s.name === "voyage" && <Voyage b={b} />}
          {s.name === "campus" && <Campus b={b} />}
          {s.name === "community" && <Community b={b} />}
          {s.name === "build" && <BuildFinal b={b} />}
          {s.name === "creed" && <Creed b={b} />}
          {s.name === "outro" && <BrandOutro b={b} />}
          {f > FILM_FRAMES - 45 && (
            <AbsoluteFill
              style={{
                background: "#000",
                opacity: smooth((f - FILM_FRAMES + 45) / 44),
              }}
            />
          )}
        </>
      )}
      {audio && <Audio src={audio} />}
    </AbsoluteFill>
  );
};
