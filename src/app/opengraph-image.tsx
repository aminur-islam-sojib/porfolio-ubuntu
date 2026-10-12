import { ImageResponse } from "next/og";
import { profileData } from "@/data/profile";

export const alt = `${profileData.name} — Full-Stack Developer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #2C001E 0%, #4D1234 40%, #77216F 75%, #E95420 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#E95420",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: "600",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            UBUNTU 24.04 LTS • PORTFOLIO
          </span>
        </div>

        {/* Center Title & Role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              letterSpacing: "-2px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {profileData.name}
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: "500",
              color: "#E95420",
              margin: 0,
            }}
          >
            {profileData.title}
          </p>
          <p
            style={{
              fontSize: "22px",
              color: "rgba(255, 255, 255, 0.75)",
              maxWidth: "850px",
              margin: 0,
            }}
          >
            {profileData.subtitle}
          </p>
        </div>

        {/* Bottom Feature Tags */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {["Next.js 16", "TypeScript", "Tailwind CSS", "Zustand", "60fps Window Manager"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "10px 20px",
                  borderRadius: "999px",
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
