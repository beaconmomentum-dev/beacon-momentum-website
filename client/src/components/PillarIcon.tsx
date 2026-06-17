import React from "react";

const ICON_MAP: Record<string, string> = {
  life:     "/icons/icon-life.webp",
  work:     "/icons/icon-work.webp",
  venture:  "/icons/icon-venture.webp",
  systems:  "/icons/icon-systems.webp",
  labs:     "/icons/icon-labs.webp",
};

interface PillarIconProps {
  pillarId: string;
  size?: number;
  /** Apply brightness(0) invert(1) to render white on dark backgrounds */
  invert?: boolean;
  className?: string;
}

export default function PillarIcon({ pillarId, size = 28, invert = false, className = "" }: PillarIconProps) {
  const src = ICON_MAP[pillarId];
  if (!src) return null;

  const label = pillarId.charAt(0).toUpperCase() + pillarId.slice(1);

  return (
    <img
      src={src}
      alt={`Beacon ${label} icon`}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{
        display: "inline-block",
        objectFit: "contain",
        ...(invert ? { filter: "brightness(0) invert(1) opacity(0.85)" } : {}),
      }}
    />
  );
}
