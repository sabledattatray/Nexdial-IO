import React from "react";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
        <mask id="cutout">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          {/* Small gap for the arrow exactly where it crosses the circle (approx 18.5, 5.5) */}
          <circle cx="18.5" cy="5.5" r="3.5" fill="black" />
        </mask>
      </defs>

      <g mask="url(#cutout)">
        {/* Speech bubble tail and circle */}
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" stroke="url(#logo-gradient)" />
      </g>

      {/* Inbound Arrow - smaller and cleaner */}
      <path d="M21 3L12 12" stroke="url(#logo-gradient)" />
      <path d="M16 12H12V8" stroke="url(#logo-gradient)" />
    </svg>
  );
}
