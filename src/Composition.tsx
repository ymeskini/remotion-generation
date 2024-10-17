import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Img,
  continueRender,
  delayRender,
  useVideoConfig,
  staticFile,
} from "remotion";
import { z } from "zod";
import { PaginatedSubtitles } from "./Subtitles";

import { Visualizer } from "./Visualizer";

export const fps = 30;

export const AudioGramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),
  audioUrl: z.string().url(),
  coverImgFileName: z.string(),
  titleText: z.string(),
  subtitlesFileName: z.string(),
  author: z.string(),
});

type AudiogramCompositionSchemaType = z.infer<typeof AudioGramSchema>;

export const AudiogramComposition: React.FC<AudiogramCompositionSchemaType> = ({
  audioUrl,
  coverImgFileName,
  audioOffsetInSeconds,
  subtitlesFileName,
  titleText,
  author,
}) => {
  const { durationInFrames } = useVideoConfig();
  const ref = useRef<HTMLDivElement>(null);
  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);
  const [subtitles, setSubtitles] = useState<string | null>(null);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetch(subtitlesFileName)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, subtitlesFileName]);

  if (!subtitles) {
    return null;
  }

  return (
    <div ref={ref}>
      <AbsoluteFill>
        <Sequence>
          <Audio pauseWhenBuffering src={audioUrl} />
          <div className="h-full w-full flex flex-col items-center gap-6 bg-[#042330] text-white">
            <header className="flex flex-col items-center mt-24 gap-6">
              <Img className="rounded-full w-80 h-80" src={coverImgFileName} />
              <h1 className="text-4xl">{titleText}</h1>
              <h2 className="text-3xl">{author}</h2>
            </header>
            <main className="flex flex-col items-center max-w-screen-xl">
              <Visualizer
                mirrorWave
                audioSrc={audioUrl}
                numberOfSamples={256}
                freqRangeStartIndex={8}
                waveLinesToDisplay={100}
              />
              <PaginatedSubtitles
                subtitles={subtitles}
                endFrame={audioOffsetInFrames + durationInFrames}
              />
            </main>
            <footer className="absolute right-4 bottom-4">
              <div className="flex flex-col gap-4 w-full justify-end">
                <Img className="w-48" src={staticFile("app-store.svg")} />
                <Img className="w-48" src={staticFile("play-store.png")} />
              </div>
            </footer>
          </div>
        </Sequence>
      </AbsoluteFill>
    </div>
  );
};
