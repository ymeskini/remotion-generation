import parseSRT from "parse-srt";
import React, { useEffect, useMemo, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ensureFont } from "./ensure-font";
import { Word } from "./Word";

const useCurrentSubtitle = (
  src: string,
  options: { windowStart: number; windowEnd: number },
) => {
  const { windowStart, windowEnd } = options;
  const config = useVideoConfig();
  const { fps } = config;

  const parsed = useMemo(() => parseSRT(src), [src]);

  return useMemo(() => {
    return parsed
      .map((item) => {
        const start = Math.floor(item.start * fps);
        const end = Math.floor(item.end * fps);
        return { item, start, end };
      })
      .filter(({ start, end }) => {
        return start >= windowStart && end <= windowEnd;
      });
  }, [fps, parsed, windowEnd, windowStart]);
};

export const PaginatedSubtitles: React.FC<{
  subtitles: string;
  startFrame: number;
  endFrame: number;
  subtitlesTextColor: string;
}> = ({
  startFrame,
  endFrame,
  subtitles,
  subtitlesTextColor: transcriptionColor,
}) => {
  const frame = useCurrentFrame();
  const [fontHandle] = useState(() => delayRender());
  const [fontLoaded, setFontLoaded] = useState(false);
  const currentSubtitles = useCurrentSubtitle(subtitles, {
    windowStart: startFrame,
    windowEnd: endFrame,
  });

  useEffect(() => {
    ensureFont()
      .then(() => {
        continueRender(fontHandle);
        setFontLoaded(true);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [fontHandle, fontLoaded]);

  const currentSubtitle = currentSubtitles.find(
    (subtitle) => subtitle.start <= frame && subtitle.end >= frame,
  );

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        right: 0,
        left: 0,
        textAlign: "center",
        color: transcriptionColor,
      }}
      dir="rtl"
      lang="ar"
    >
      {fontLoaded && currentSubtitle && (
        <span
          style={{
            fontSize: 48,
          }}
          id={String(currentSubtitle.item.id)}
        >
          <Word
            frame={frame}
            item={currentSubtitle.item}
            transcriptionColor={transcriptionColor}
          />
        </span>
      )}
    </div>
  );
};

declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: unknown,
    ): number;
  }
}
