import React from "react";
import { Composition } from "remotion";
import { OpenAtomFilm } from "./film/OpenAtomFilm";
import { BrandStudy } from "./brand/BrandStudy";
import { BrandCover } from "./brand/BrandCover";
import { BrandFilm } from "./brand/BrandFilm";
import { FILM_FRAMES } from "./brand/full-timeline";
import score from "./audio/score.json";
export const Root: React.FC = () => (
  <>
    <Composition
      id="JMI-COVER-PORTRAIT"
      component={BrandCover}
      durationInFrames={1}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="JMI-COVER-LANDSCAPE"
      component={BrandCover}
      durationInFrames={1}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="JMI-BRAND-FILM"
      component={BrandFilm}
      durationInFrames={FILM_FRAMES * 2}
      fps={60}
      width={1920}
      height={1080}
    />
    <Composition
      id="JMI-BRAND-STUDY"
      component={BrandStudy}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="JMI-OPENATOM"
      component={OpenAtomFilm}
      durationInFrames={score.duration}
      fps={score.fps}
      width={1920}
      height={1080}
      defaultProps={{ music: true, usePhotos: true, effects: true }}
    />
  </>
);
