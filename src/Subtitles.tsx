import parseSRT from "parse-srt";
import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
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
  endFrame: number;
}> = ({ endFrame, subtitles }) => {
  const frame = useCurrentFrame();
  const currentSubtitles = useCurrentSubtitle(subtitles, {
    windowStart: 0,
    windowEnd: endFrame,
  });

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
        color: "white",
      }}
      dir="rtl"
      lang="ar"
    >
      {currentSubtitle && (
        <span
          style={{
            fontSize: 48,
          }}
          id={String(currentSubtitle.item.id)}
        >
          <Word
            frame={frame}
            item={currentSubtitle.item}
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
