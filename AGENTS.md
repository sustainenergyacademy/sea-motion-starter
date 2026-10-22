# SEA educational video workflow

Read README.md, STYLE.md and lessons/lesson.json first.
Use the supplied SEA assets, not another creator's style. Preserve original recordings.

1. Inspect the actual recording and slide reference. Never invent speech, transcript, scientific claims, or timestamps.
2. Prepare a cut list: source file, source in/out, retained content, and why each animation helps.
3. Edit lessons/lesson.json. sourceIn is seconds in the original file; cue.start is seconds after that clip's trimmed beginning. Changing sourceIn requires reviewing its cues. Reordering a whole clip keeps its cues with it.
4. Keep instructor audio playing under full-screen explanations. No synthetic narration, music, or automated silence cutting unless requested.
5. Use chapter, steps, equation, comparison, focus, callout. Add purpose-built diagrams when the content requires them; these six templates are not a substitute for every explanation.
6. Run npm run check, inspect Studio at cue starts/middles/ends, check Arabic, equations, legibility, audio sync and cuts.
7. Render when requested; inspect the complete export before delivery. Do not upload recordings or publish the repo without a specified destination.
   Data-driven clips are intentionally edited through JSON, not independently through Studio source editing.
