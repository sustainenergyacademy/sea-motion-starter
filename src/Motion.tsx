import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand as b } from "./brand";
export type Cue = {
  type: string;
  start: number;
  duration: number;
  title: string;
  lines?: string[];
  formula?: string;
  result?: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        opacity: interpolate(f, [delay * fps, (delay + 0.45) * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0 ${interpolate(f, [delay * fps, (delay + 0.45) * fps], [18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px`,
      }}
    >
      {children}
    </div>
  );
};
export const Shell: React.FC<{
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({ title, dark = false, children }) => (
  <AbsoluteFill
    style={{
      background: dark ? b.navy : b.foam,
      color: dark ? b.foam : b.navy,
      fontFamily: "SEA",
      direction: "rtl",
      padding: 76,
    }}
  >
    <div style={{ fontSize: 28, color: dark ? b.sage : b.green }}>
      SEA · أكاديمية الطاقة المستدامة
    </div>
    <h1 style={{ fontSize: 76, lineHeight: 1.3, margin: "40px 0 44px" }}>
      {title}
    </h1>
    {children}
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 76,
        right: 76,
        borderTop: `1px solid ${b.sage}`,
        paddingTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Img
        src={staticFile(
          `brand/${dark ? "SEA-Logo-For-Dark.png" : "SEA-Logo-Trimmed.png"}`,
        )}
        style={{ width: 200 }}
      />
      <span style={{ fontSize: 24 }}>sustain-energy.com</span>
    </div>
  </AbsoluteFill>
);
export const Motion: React.FC<{ cue: Cue }> = ({ cue }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (cue.type === "focus")
    return (
      <AbsoluteFill style={{ fontFamily: "SEA" }}>
        <div
          style={{
            position: "absolute",
            left: `${cue.x ?? 10}%`,
            top: `${cue.y ?? 20}%`,
            width: `${cue.w ?? 40}%`,
            height: `${cue.h ?? 30}%`,
            border: `6px solid ${b.orange}`,
            boxShadow: "0 0 0 3000px rgba(11,37,69,.55)",
            borderRadius: 12,
            opacity: interpolate(f, [0, 0.3 * fps], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          dir="rtl"
          style={{
            position: "absolute",
            bottom: 70,
            right: 76,
            background: b.foam,
            color: b.navy,
            padding: "22px 40px",
            fontSize: 38,
            maxWidth: 1500,
          }}
        >
          {cue.title}
        </div>
      </AbsoluteFill>
    );
  if (cue.type === "callout")
    return (
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: 76,
          fontFamily: "SEA",
          direction: "rtl",
        }}
      >
        <Reveal>
          <div
            style={{
              background: b.foam,
              borderRight: `8px solid ${b.green}`,
              color: b.navy,
              padding: 32,
              fontSize: 42,
              maxWidth: 1100,
            }}
          >
            {cue.title}
          </div>
        </Reveal>
      </AbsoluteFill>
    );
  return (
    <Shell title={cue.title} dark={cue.type === "chapter"}>
      {cue.type === "equation" ? (
        <div style={{ display: "flex", gap: 70, alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 42, lineHeight: 1.8 }}>
            {cue.lines?.map((line, i) => (
              <Reveal key={i} delay={i * 0.8}>
                <div>{line}</div>
              </Reveal>
            ))}
          </div>
          <div
            dir="ltr"
            style={{
              width: 760,
              background: b.navy,
              color: b.foam,
              borderRadius: 24,
              padding: 55,
              textAlign: "center",
            }}
          >
            <Reveal delay={0.5}>
              <div style={{ fontSize: 82, fontWeight: 700 }}>{cue.formula}</div>
            </Reveal>
            <Reveal delay={2}>
              <div
                style={{
                  fontSize: 54,
                  color: b.orange,
                  marginTop: 28,
                  fontWeight: 700,
                }}
              >
                {cue.result}
              </div>
            </Reveal>
          </div>
        </div>
      ) : cue.type === "comparison" ? (
        <div style={{ display: "flex", gap: 60 }}>
          {cue.lines?.map((line, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderTop: `3px solid ${b.sage}`,
                paddingTop: 40,
                fontSize: 48,
              }}
            >
              <Reveal delay={i * 0.8}>{line}</Reveal>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 46, lineHeight: 1.8 }}>
          {cue.lines?.map((line, i) => (
            <Reveal key={i} delay={i * 0.8}>
              <div style={{ marginBottom: 24 }}>
                <span style={{ color: b.orange, marginLeft: 24 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {line}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Shell>
  );
};
