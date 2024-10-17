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
        "https://cf-media.sndcdn.com/GGYePFJEfQjr.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vR0dZZVBGSkVmUWpyLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzI5MTYyMjg2fX19XX0_&Signature=VZUGtxLwFH3WiLajgqwrxpDUWuTQT62bB~zkZjFUY7cKvY5vnQ0F0FqHhb3N6JCwY-GHhB2cMiEz1ErtjkyOM2jFFZXboO-ao7bEQ8JIYo9W7BXqcxuFZztE-e3wTu4T3Qa5fWOyQKHHGbHw7RBFHdNd~RzroiaBeyYt~a7H2jJ3uN4lFjUbtYuAMW4sbL1ONJrEi6AfXW1zIWFtR3bla0y~eM7-znbuRnotLwoSyCTShmal2jn9ShuUjFEteB4aBoy3YvnXijTckPILc7SgMAk4SU0eOtiLrEo7rIPyMc-IMvr~qfwv~YwEj7g49VU7DJXGBHyRRnxTzXA6oNu6ew__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
      coverImgFileName: "https://images.youssefmeskini.me/badr.jpeg",
      subtitlesFileName:
        "https://youssefmeskini.s3.eu-central-1.amazonaws.com/transcriptions/1932351005.srt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWX657XCGV5B7U456%2F20241017%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20241017T100520Z&X-Amz-Expires=3600&X-Amz-Signature=283273b2c07fe967a2870a1c3befc603e2ff3964f9869e6dd7f8bf0b9caf1f69&X-Amz-SignedHeaders=host&x-id=GetObject",
      titleText: "شرح الأدب المفرد (في قناة السنة)",
      author: "لفضيلة الشيخ عبد الرزاق بن عبد المحسن البد",
      durationInSeconds: 60,
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
