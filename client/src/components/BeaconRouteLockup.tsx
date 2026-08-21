import { Link } from "wouter";

interface BeaconRouteLockupProps {
  descriptor: string;
  href?: string;
  textColor?: string;
  mutedColor?: string;
  compact?: boolean;
}

export default function BeaconRouteLockup({
  descriptor,
  href = "/",
  textColor = "#F7F1E5",
  mutedColor = "#B8C4C9",
  compact = false,
}: BeaconRouteLockupProps) {
  const markSize = compact ? "1.9rem" : "2.15rem";

  return (
    <Link
      href={href}
      aria-label={`Beacon Momentum — ${descriptor}`}
      data-beacon-parent-lockup="true"
      style={{
        alignItems: "center",
        display: "inline-flex",
        gap: compact ? "0.55rem" : "0.65rem",
        minWidth: 0,
        textDecoration: "none",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={{ flex: "0 0 auto", height: markSize, width: markSize }}>
        <rect width="64" height="64" rx="12" fill="#0D1D29"/>
        <g fill="none" stroke="#F7F1E5" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 19.5 14.5 16" opacity=".72"/>
          <path d="M43 19.5 49.5 16" opacity=".72"/>
          <path d="M21 23.5h-7" opacity=".48"/>
          <path d="M43 23.5h7" opacity=".48"/>
          <path d="m24 18 8-6 8 6Z"/>
          <rect x="25" y="18" width="14" height="8" rx="1"/>
          <path d="M23 26h18"/>
          <path d="M24 26v3M40 26v3"/>
          <path d="m25 29-3 22h20l-3-22Z"/>
          <path d="M23 40h18" opacity=".58"/>
          <path d="M30 51v-5q2-2 4 0v5"/>
          <path d="M12 54q4-2 8 0t8 0 8 0 8 0 8 0 8 0" opacity=".6"/>
        </g>
        <circle cx="32" cy="22" r="2.2" fill="#E9BC52"/>
      </svg>
      <span style={{ display: "flex", flexDirection: "column", gap: "0.12rem", minWidth: 0 }}>
        <span
          style={{
            color: textColor,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: compact ? "0.98rem" : "1.08rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Beacon Momentum
        </span>
        <span
          style={{
            color: mutedColor,
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontSize: compact ? "0.52rem" : "0.58rem",
            fontWeight: 650,
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            overflowWrap: "anywhere",
            textTransform: "uppercase",
          }}
        >
          {descriptor}
        </span>
      </span>
    </Link>
  );
}
