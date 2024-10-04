import './tailwind.css';

import { Composition, staticFile } from "remotion";
import { AudioGramSchema, AudiogramComposition, fps } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1080}
        height={1080}
        schema={AudioGramSchema}
        defaultProps={{
          // Audio settings
          audioOffsetInSeconds: 6.9,
          // Title settings
          audioFileName: staticFile("audio.mp3"),
          coverImgFileName: staticFile("cover.jpg"),
          titleText:
            "#234 – Money, Kids, and Choosing Your Market with Justin Jackson of Transistor.fm",
          titleColor: "rgba(186, 186, 186, 0.93)",
          durationInSeconds: 33,
        }}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * fps,
            props,
          };
        }}
      />
    </>
  );
};
