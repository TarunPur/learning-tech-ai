import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F6F5F1",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 24 24">
          <path d="M8 4 L8 20" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
          <path d="M16 4 L16 20" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
          <path d="M8.4 4.8 L11.2 10.4" stroke="#2F6FE0" strokeWidth="4.6" strokeLinecap="butt" />
          <path
            d="M13.6 10.2 L14.4 16.8 L15.6 19.2"
            stroke="#2F6FE0"
            strokeWidth="4.6"
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
