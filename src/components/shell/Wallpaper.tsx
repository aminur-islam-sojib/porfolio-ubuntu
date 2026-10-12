import * as React from "react";

export function Wallpaper() {
  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Ubuntu 24.04 Noble Aubergine Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#77216F] via-[#5E2750] to-[#2C001E]" />

      {/* Subtle geometric atmospheric lighting */}
      <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(233,84,32,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(119,33,111,0.35)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Subtle modern polygonal accent reminiscent of the Noble Numbat geometry */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="poly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E95420" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#77216F" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2C001E" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M 1200,0 L 1920,380 L 1920,1080 L 800,1080 L 1050,650 Z"
          fill="url(#poly-grad)"
        />
        <path
          d="M 1400,200 L 1800,500 L 1550,850 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
        />
        <circle
          cx="1400"
          cy="420"
          r="180"
          fill="none"
          stroke="rgba(233, 84, 32, 0.12)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

