import { ImageResponse } from "next/og";
import { services, getService } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const alt = "GenOS Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const accentMap: Record<string, string> = {
  "3d-websites": "#21d4fd",
  "ai-apps": "#6d8bff",
  crm: "#a06bff",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  const title = s?.title ?? "GenOS Services";
  const price = s?.price ?? "";
  const timeline = s?.timeline ?? "";
  const accent = accentMap[slug] ?? "#7af0ff";

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
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}88, transparent 70%)`,
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

        {/* brand */}
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

        {/* title + price */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {price && (
            <div
              style={{
                display: "flex",
                gap: 24,
                fontSize: 28,
                color: accent,
                fontWeight: 600,
              }}
            >
              <div style={{ display: "flex" }}>{price}</div>
              {timeline && (
                <>
                  <div style={{ display: "flex", color: "#39406a" }}>/</div>
                  <div style={{ display: "flex" }}>{timeline}</div>
                </>
              )}
            </div>
          )}
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
          <div style={{ display: "flex" }}>Services</div>
          <div style={{ display: "flex", color: "#39406a" }}>/</div>
          <div style={{ display: "flex" }}>genosapp.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
