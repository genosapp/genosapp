import { ImageResponse } from "next/og";

export const alt = "Contact GenOS — Book a Free Build Call";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #05070f 0%, #0a1030 45%, #101a3f 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,139,255,0.55), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(160,107,255,0.45), transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "linear-gradient(135deg, #7af0ff, #6d8bff)",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            GenOS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Let's build something
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              background: "linear-gradient(90deg, #7af0ff, #a06bff)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            remarkable.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#a7b1d4",
          }}
        >
          <div style={{ display: "flex" }}>Free 30-min build call</div>
          <div style={{ display: "flex", color: "#39406a" }}>/</div>
          <div style={{ display: "flex" }}>Fixed scope, fixed price</div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              color: "#6b76a0",
              fontSize: 24,
            }}
          >
            genosapp.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
