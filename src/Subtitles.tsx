import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import parseSRT from "parse-srt";

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
    <div className="w-full text-center" dir="rtl" lang="ar">
      {currentSubtitle && (
        <div className="text-5xl break-words leading-normal" id={String(currentSubtitle.item.id)}>
          {currentSubtitle.item.text.replace("<br />", " ")}
        </div>
      )}
    </div>
  );
};
