import "./tailwind.css";

import { Composition } from "remotion";
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
      audioOffsetInSeconds: 1,
      audioUrl:
        "https://cf-media.sndcdn.com/GGYePFJEfQjr.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR0dZZVBGSkVmUWpyLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzI5MDA0OTk5fX19XX0_&Signature=bHyTGbszsLrMRytWxH~WUQRml85gLHMSVs-2MBuEJSu5R~xGKcbrkx-BlAw~dX4e1zrd0MwHLNmaWoSGLyLufam7Bta5iZ2eZA404AQrzbRy1lqZ6AGLjhN0JakqfzxluBaXeBbHtNnuXMwwozpA2KykOGkieJ0ht78Uidbc6q1AtNuPazpzErCcXO8JZ-ummo0EAVt8611sdf1fySpxIxVDFbq~0a8hsJTYISNe2YyALLIdYQLsTOhr83vfe2W9zsmgHmeWvsRbE9qj7YSrg8NoSqmdZriae25iU9lLvP5Rmt9hQaWfRpz6dAzVJ-hykfGysoidpVkdqeSnT3h6PA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
      coverImgFileName: "https://images.youssefmeskini.me/badr.jpeg",
      subtitlesFileName:
        "https://youssefmeskini.s3.eu-central-1.amazonaws.com/transcriptions/1932351005.srt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWX657XCGV5B7U456%2F20241015%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T150625Z&X-Amz-Expires=3600&X-Amz-Signature=f7ff99f1a2dcfb29b08770fb24845e0da828aadc1bfd18c689cd15a82e0e0b58&X-Amz-SignedHeaders=host&x-id=GetObject",
      titleText: "شرح الأدب المفرد (في قناة السنة)",
      durationInSeconds: 15,
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
