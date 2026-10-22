import {
  AbsoluteFill,
  Img,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { Motion, type Cue } from "./Motion";
export type LessonData = {
  title: string;
  clips: {
    id: string;
    source: string | null;
    sourceIn: number;
    duration: number;
    cues: Cue[];
  }[];
};
// The JSON file intentionally owns all clips and timing as one reusable template.
export const Lesson: React.FC<{ lesson: LessonData }> = ({ lesson }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#0B2545" }}>
      <Series>
        {lesson.clips.map((clip) => (
          <Series.Sequence
            key={clip.id}
            name={clip.id}
            durationInFrames={Math.round(clip.duration * fps)}
            premountFor={fps}
          >
            {clip.source ? (
              <Video
                src={staticFile(clip.source)}
                trimBefore={Math.round(clip.sourceIn * fps)}
                premountFor={fps}
                objectFit="contain"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Img
                src={staticFile("demo/slide.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
            {clip.cues.map((cue, i) => (
              <Sequence
                key={i}
                name={cue.title}
                from={Math.round(cue.start * fps)}
                durationInFrames={Math.round(cue.duration * fps)}
                premountFor={fps}
              >
                <Motion cue={cue} />
              </Sequence>
            ))}
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
