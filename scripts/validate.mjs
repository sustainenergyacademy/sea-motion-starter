import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const lesson = JSON.parse(fs.readFileSync("lessons/lesson.json", "utf8"));
assert(
  Array.isArray(lesson.clips) && lesson.clips.length,
  "Add at least one clip",
);
const ids = new Set();
let total = 0;
const finite = (n) => typeof n === "number" && Number.isFinite(n);
for (const c of lesson.clips) {
  assert(typeof c.id === "string" && !ids.has(c.id), "Clip IDs must be unique");
  ids.add(c.id);
  assert(finite(c.duration) && c.duration >= 1 / 30, "Invalid clip duration");
  assert(finite(c.sourceIn) && c.sourceIn >= 0, "Invalid sourceIn");
  if (c.source !== null) {
    assert(
      typeof c.source === "string" && c.source.length > 0,
      "Invalid source",
    );
    const root = path.resolve("public");
    const file = path.resolve(root, c.source);
    assert(file.startsWith(root + path.sep), "Media must be inside public");
    assert(fs.existsSync(file), "Missing recording: " + c.source);
  }
  assert(Array.isArray(c.cues), "Missing cues");
  for (const cue of c.cues) {
    assert(
      [
        "chapter",
        "steps",
        "equation",
        "comparison",
        "focus",
        "callout",
      ].includes(cue.type),
      "Unknown animation type",
    );
    assert(
      finite(cue.start) &&
        cue.start >= 0 &&
        finite(cue.duration) &&
        cue.duration >= 1 / 30,
      "Invalid cue timing",
    );
    assert(
      Math.round(cue.start * 30) + Math.round(cue.duration * 30) <=
        Math.round(c.duration * 30),
      "Cue extends beyond clip: " + c.id,
    );
    assert(
      typeof cue.title === "string" &&
        cue.title.length > 0 &&
        cue.title.length <= 65,
      "Use a short cue title (1–65 characters)",
    );
    if (["chapter", "steps", "equation", "comparison"].includes(cue.type)) {
      assert(
        Array.isArray(cue.lines) &&
          cue.lines.length > 0 &&
          cue.lines.length <= 3,
        "Use 1–3 short lines",
      );
      assert(
        cue.lines.every((s) => typeof s === "string" && s.length <= 75),
        "Line too long",
      );
    }
    if (cue.type === "equation")
      assert(
        typeof cue.formula === "string" && typeof cue.result === "string",
        "Missing formula/result",
      );
    if (cue.type === "focus") {
      for (const k of ["x", "y", "w", "h"])
        assert(finite(cue[k]), "Focus requires x,y,w,h percentages");
      assert(
        cue.x >= 0 &&
          cue.y >= 0 &&
          cue.w > 0 &&
          cue.h > 0 &&
          cue.x + cue.w <= 100 &&
          cue.y + cue.h <= 100,
        "Focus outside frame",
      );
    }
  }
  total += Math.round(c.duration * 30);
}
console.log(
  "Valid lesson: " +
    lesson.clips.length +
    " clips, " +
    total +
    " frames at 30 fps",
);
console.log(
  lesson.clips.some((c) => c.source === null)
    ? "DEMO: Some clips use a still image, without instructor audio."
    : "Recordings found. Verify source duration and audio in preview.",
);
