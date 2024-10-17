import { FC } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

export const Visualizer: FC<{
  audioSrc: string;
  numberOfSamples: number;
  freqRangeStartIndex: number;
  waveLinesToDisplay: number;
  mirrorWave: boolean;
}> = ({
  audioSrc,
  numberOfSamples,
  freqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return null;
  }

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples, // Use more samples to get a nicer visualisation
    optimizeFor: "accuracy",
  });

  // Pick the low values because they look nicer than high values
  // feel free to play around :)
  const frequencyDataSubset = frequencyData.slice(
    freqRangeStartIndex,
    freqRangeStartIndex +
      (mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay),
  );

  const frequenciesToDisplay = mirrorWave
    ? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
    : frequencyDataSubset;

  return (
    <div className="flex w-full h-80 items-center justify-center gap-1 mt-1">
      {frequenciesToDisplay.map((v, i) => {
        return (
          <div
            key={i}
            className="w-2 rounded-sm bg-[#2CE07F]"
            style={{
              height: `${400 * Math.sqrt(v)}%`,
            }}
          />
        );
      })}
    </div>
  );
};
