import { ImageResponse } from "next/og";

export const alt = "Arifur Rahman Arif (A R Arif) — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #eef0f7 0%, #ddd6fe 45%, #a5f3fc 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
            color: "white",
            fontSize: 60,
            fontWeight: 700,
          }}
        >
          A
        </div>
        <div style={{ marginTop: 40, fontSize: 78, fontWeight: 700, color: "#12121a", letterSpacing: -2 }}>
          Arifur Rahman Arif
        </div>
        <div style={{ marginTop: 8, fontSize: 38, color: "#6d28d9" }}>
          Full-Stack Developer · Next.js · Node.js · Shopify Remix
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "rgba(18,18,26,0.6)" }}>
          A R Arif · ararif.me · Laravel Certified
        </div>
      </div>
    ),
    { ...size },
  );
}
