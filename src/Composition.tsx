import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Img,
  continueRender,
  delayRender,
  useVideoConfig,
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
});

type AudiogramCompositionSchemaType = z.infer<typeof AudioGramSchema>;

export const AudiogramComposition: React.FC<AudiogramCompositionSchemaType> = ({
  audioUrl,
  coverImgFileName,
  audioOffsetInSeconds,
  subtitlesFileName,
  titleText,
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
          <div className="h-full w-full">
            <div className="h-full w-full flex flex-col justify-center items-center gap-6 bg-[#042330]">
              <Img className="rounded-full w-80 h-80" src={coverImgFileName} />
              <h1 className="text-white text-4xl">{titleText}</h1>
              <Visualizer
                mirrorWave
                audioSrc={audioUrl}
                numberOfSamples={512}
                freqRangeStartIndex={68}
                waveLinesToDisplay={100}
                waveColor="#2CE07F"
              />
              <PaginatedSubtitles
                subtitles={subtitles}
                endFrame={audioOffsetInFrames + durationInFrames}
              />
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </div>
  );
};
