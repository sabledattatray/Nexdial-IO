import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0F2E 0%, #081120 100%)",
          borderRadius: 96,
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: "3px solid rgba(0, 194, 255, 0.18)",
            display: "flex",
          }}
        />
        {/* Inner hexagon-like shape */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 56,
            background: "linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #0EA5E9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 80px rgba(79, 70, 229, 0.6), 0 0 40px rgba(0, 194, 255, 0.3)",
            transform: "rotate(0deg)",
          }}
        >
          {/* DM monogram */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Signal arc dots */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(0,194,255,0.9)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
            </div>
            {/* D letter */}
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: 130,
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1,
                letterSpacing: -4,
                textShadow: "0 2px 20px rgba(0,194,255,0.4)",
              }}
            >
              D
            </div>
          </div>
        </div>
        {/* Accent dot top-right */}
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 110,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#00C2FF",
            boxShadow: "0 0 20px rgba(0, 194, 255, 0.8)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
