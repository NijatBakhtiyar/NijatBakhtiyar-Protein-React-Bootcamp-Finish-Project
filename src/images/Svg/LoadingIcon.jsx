import React from "react";

function LoadingIcon({ params }) {
  return (
    <svg
      width={params?.width || 40}
      height={params?.height || 40}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="none"
        stroke={params?.color || "#fff"}
        strokeWidth="8"
        strokeDasharray="64.14723205566406 64.14723205566406"
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="1.408450704225352s"
          keyTimes="0;1"
          values="0;256.58892822265625"
        ></animate>
      </path>
    </svg>
  );
}

export default LoadingIcon;
