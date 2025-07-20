"use client";
import React, { memo } from "react";

export const AuroraText = memo(({
  children,
  className = "",
  colors = ["#ff1a1a", "#00cc66", "#ff6666", "#009933"],
  speed = 2 // slightly faster
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
});

AuroraText.displayName = "AuroraText";
