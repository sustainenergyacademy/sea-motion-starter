import { Composition } from "remotion";
import { Lesson } from "./Lesson";
import data from "../lessons/lesson.json";
import { fontsReady } from "./brand";
export const RemotionRoot = () => (
  <Composition
    id="SEA-Lesson"
    component={Lesson}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={900}
    defaultProps={{ lesson: data }}
    calculateMetadata={async ({ props }) => {
      await fontsReady;
      return {
        durationInFrames: props.lesson.clips.reduce(
          (n, c) => n + Math.round(c.duration * 30),
          0,
        ),
      };
    }}
  />
);
