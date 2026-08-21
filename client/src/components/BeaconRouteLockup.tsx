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
      <img
        src="/brand/beacon-mark.svg"
        alt=""
        aria-hidden="true"
        style={{ flex: "0 0 auto", height: markSize, objectFit: "contain", width: markSize }}
      />
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
