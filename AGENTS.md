# SEA educational video workflow

Read README.md, STYLE.md, REBUILD-WORKFLOW.md and lessons/lesson.json first.
Preserve the original local recordings. Apply the supplied SEA assets.

## Choose the visual treatment

Inspect the actual recording and slide reference before planning edits.
When the raw video uses slides, graphics or layouts outside SEA's identity, default to **audio-led visual rebuild**:

- Use the original video as a factual and timing reference.
- Use only the instructor's original audio in the finished lesson; replace the original picture with newly authored SEA scenes throughout.
- Rebuild the explanation, not merely the title or a frame around the old slides. Do not leave mismatched slide screenshots beneath a SEA overlay.
- Recreate diagrams, equations, comparisons and progressive steps from verified content. Preserve values, units, caveats and meaning.
- For a software walkthrough, do not invent program controls, outputs or clicks. If the picture is needed to prove the steps, flag that section and request an explicit exception to reuse it or a new capture. Until resolved, do not silently retain raw visuals or fake them.
  If the source already follows SEA's identity, retain useful source visuals with contain framing, unless the user requests a full rebuild.

## Production

1. Inspect the real recording, audio and any transcript. Never invent speech, scientific claims or timestamps.
2. Prepare a source-time cut list and scene plan: source in/out, retained audio, SEA visual treatment, and short SFX events. Tie scenes to actual spoken phrases.
3. Follow REBUILD-WORKFLOW.md for audio extraction/playback, complete visual coverage, assets, mixing and review.
4. Edit lessons/lesson.json or extend the renderer as needed. sourceIn is seconds in the original source; cue.start is seconds after that clip's trimmed beginning. Changing sourceIn requires reviewing its cues. Reordering a whole clip keeps its cues and SFX with it.
5. The current starter plays source clips through Video; it is NOT automatically audio-only. For rebuild projects, implement an Audio-only source path using Audio from @remotion/media, with matching trimBefore and clip duration. An opaque overlay over Video is not the required audio-only source path. Confirm the renderer supports any new data fields before using them.
6. Keep instructor audio intact under rebuilt scenes. Do not create replacement narration or add music unless requested. Short, appropriate sound effects ARE authorized by default: subtle click/tick, soft whoosh, or gentle result chime. Keep them brief, sparse and below speech.
7. Use chapter, steps, equation, comparison, focus, callout as appropriate. Add purpose-built diagrams when required. In rebuild mode, focus/callout need a newly authored SEA visual underneath, never an old slide as fallback.
8. Run npm run check and any checks for new data fields. Inspect cue boundaries, complete visual coverage, Arabic, equations, audio sync, SFX balance and cuts. Existing validation does not prove rebuilt coverage or audio correctness.
9. Produce a 45–90-second sample for review when requested, then complete the lesson in the agreed style. Render when requested and review the complete exported picture and audio.

## Local assets and publication

Recordings, extracted audio, transcripts and exports stay local. Put private inputs and derivatives inside public/recordings or another explicitly Git-ignored local directory. Verify exclusion before publishing. A file elsewhere in public may be tracked.
Use only local, supplied, locally generated or appropriately licensed SFX/B-roll. Record source/license for third-party assets. Do not upload private materials to external services without user authorization.
Do not publish recordings or exports. Data-driven clips are intentionally edited through JSON, not independent Studio source manipulation.
