import "./tailwind.css";
import { Composition, staticFile } from "remotion";
import { AudioGramSchema, AudiogramComposition, fps } from "./Composition";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Audiogram"
    component={AudiogramComposition}
    fps={fps}
    width={1920}
    height={1080}
    schema={AudioGramSchema}
    defaultProps={{
      audioUrl: staticFile("002.mp3"),
      subtitlesFileName: staticFile("transcript.srt"),
      coverImgFileName: "https://images.youssefmeskini.me/badr.jpeg",
      titleText: "شرح الأدب المفرد (في قناة السنة)",
      author: "لفضيلة الشيخ عبد الرزاق بن عبد المحسن البد",
      audioOffsetInSeconds: 1,
      durationInSeconds: 60 * 15 + 30,
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
