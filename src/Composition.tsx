import React, { useRef } from "react";
import { AbsoluteFill, Audio, Sequence, Img } from "remotion";
import { z } from "zod";
import { Visualizer } from "./Visualizer";

export const fps = 30;

export const AudioGramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),
  audioFileName: z.string().refine((s) => s.endsWith(".mp3"), {
    message: "Audio file must be a .mp3 file",
  }),
  coverImgFileName: z
    .string()
    .refine(
      (s) =>
        s.endsWith(".jpg") ||
        s.endsWith(".jpeg") ||
        s.endsWith(".png") ||
        s.endsWith(".bmp"),
      {
        message: "Image file must be a .jpg / .jpeg / .png / .bmp file",
      },
    ),
  titleText: z.string(),
});

type AudiogramCompositionSchemaType = z.infer<typeof AudioGramSchema>;

export const AudiogramComposition: React.FC<AudiogramCompositionSchemaType> = ({
  audioFileName,
  coverImgFileName,
  audioOffsetInSeconds,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div ref={ref}>
      <AbsoluteFill>
        <Sequence from={-audioOffsetInFrames}>
          <Audio pauseWhenBuffering src={audioFileName} />
          <div
            className="h-full w-full"
            style={{
              fontFamily: "IBM Plex Sans",
            }}
          >
            <div className="h-full w-full flex flex-col justify-center items-center gap-6 bg-[#042330]">
              <Img className="rounded-full w-80 h-80" src={coverImgFileName} />
              <Visualizer
                mirrorWave
                audioSrc={audioFileName}
                numberOfSamples={256}
                freqRangeStartIndex={7}
                waveLinesToDisplay={100}
                waveColor="#2CE07F"
              />
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </div>
  );
};
