import "./tailwind.css";

import { Composition, staticFile } from "remotion";
import { AudioGramSchema, AudiogramComposition, fps } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Audiogram"
      component={AudiogramComposition}
      fps={fps}
      width={1920}
      height={1080}
      schema={AudioGramSchema}
      defaultProps={{
        audioOffsetInSeconds: 6.9,
        audioFileName: staticFile("audio.mp3"),
        coverImgFileName: "https://images.youssefmeskini.me/badr.jpeg",
        titleText: "Title",
        durationInSeconds: 30,
        subtitlesFileName: staticFile("transcription.srt"),
      }}
      // Determine the length of the video based on the duration of the audio file
      calculateMetadata={({ props }) => {
        return {
          durationInFrames: props.durationInSeconds * fps,
          props,
        };
      }}
    />
  );
};
