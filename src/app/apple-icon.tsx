import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0F2E 0%, #081120 100%)",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 24,
            background: "linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #0EA5E9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(79, 70, 229, 0.6)",
          }}
        >
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 72,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            D
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#00C2FF",
            boxShadow: "0 0 10px rgba(0, 194, 255, 0.8)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
