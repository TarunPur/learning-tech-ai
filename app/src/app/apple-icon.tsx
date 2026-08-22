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
        <svg width="140" height="140" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="nGrad" x1="4" y1="2" x2="40" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7FA3EC" />
              <stop offset="55%" stopColor="#2F6FE0" />
              <stop offset="100%" stopColor="#1E52B0" />
            </linearGradient>
          </defs>
          <g stroke="url(#nGrad)" strokeLinecap="round" fill="none">
            <path d="M15 11 L9 5" strokeWidth="2.6" />
            <path d="M22 22 L27 17" strokeWidth="2.6" />
            <path d="M16 10 L16 38" strokeWidth="6.4" />
            <path d="M32 10 L32 38" strokeWidth="6.4" />
            <path d="M16 10 L32 38" strokeWidth="6.4" strokeLinejoin="round" />
          </g>
          <g fill="url(#nGrad)">
            <circle cx="9" cy="5" r="2.2" />
            <circle cx="27" cy="17" r="2.2" />
            <circle cx="16" cy="10" r="3.4" />
            <circle cx="16" cy="38" r="3.4" />
            <circle cx="32" cy="10" r="3.4" />
            <circle cx="32" cy="38" r="3.4" />
            <circle cx="24" cy="24" r="3.4" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
