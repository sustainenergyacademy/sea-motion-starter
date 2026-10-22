import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
export const brand = {
  navy: "#0B2545",
  green: "#1F7A4D",
  orange: "#F79B4B",
  foam: "#F4F1EA",
  sage: "#9AC3AF",
};
export const fontsReady = Promise.all([
  loadFont({
    family: "SEA",
    url: staticFile("brand/IBMPlexSansArabic-Regular.ttf"),
    weight: "400",
  }),
  loadFont({
    family: "SEA",
    url: staticFile("brand/IBMPlexSansArabic-Bold.ttf"),
    weight: "700",
  }),
]);
