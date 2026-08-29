import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/insights";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const alt = "GenOS Insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "GenOS Insights";
  const tag = post?.tags?.[0] ?? "Insight";

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
        {/* aurora glow */}
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

        {/* brand + tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                letterSpacing: -0.5,
              }}
            >
              GenOS
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#7af0ff",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              border: "1px solid rgba(122,240,255,0.3)",
              borderRadius: 8,
              padding: "6px 16px",
            }}
          >
            {tag}
          </div>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 52 : 62,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: "95%",
          }}
        >
          {title}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#a7b1d4",
          }}
        >
          <div style={{ display: "flex" }}>Insights</div>
          <div style={{ display: "flex", color: "#39406a" }}>/</div>
          <div style={{ display: "flex" }}>genosapp.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
