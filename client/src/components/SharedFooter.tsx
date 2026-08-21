/**
 * SharedFooter — Beacon Momentum
 * Design: Deep Water Editorial / Quiet Authority
 * Consistent footer used across ALL pages.
 * Dark charcoal background, four-column layout.
 * Tagline: "The Lighthouse Is Lit. Join Us at the Watch."
 */
import { Link } from "wouter";

export default function SharedFooter() {
  const year = new Date().getFullYear();

  const PILLARS = [
    { label: "Beacon Life", href: "/pillar/life" },
    { label: "Beacon Work", href: "/pillar/work" },
    { label: "Beacon Venture", href: "/pillar/venture" },
    { label: "Beacon Systems", href: "/pillar/systems" },
    { label: "Beacon Labs", href: "/pillar/labs" },
    { label: "The Watch (Community)", href: "/the-watch" },
  ];

  const RESOURCES = [
    { label: "Pathfinder Assessment", href: "/assessment" },
    { label: "Resources & Guides", href: "/resources" },
    { label: "How Beacon Works", href: "/how-beacon-works" },
    { label: "Field Notes", href: "/field-notes" },
    { label: "Foundation Year", href: "/foundation" },
    { label: "The Signal", href: "/signal" },
    { label: "Pricing", href: "/pricing" },
    { label: "Signal Check", href: "https://beaconlabs.ai/signal-check", external: true },
    { label: "YouTube Channel", href: "https://www.youtube.com/@BeaconMomentum", external: true },
  ];

  const CONTINUE_INTENTIONALLY = [
    {
      label: "Beacon Community — Membership, learning, and member support",
      sublabel: "The Watch is the annual membership. Enrollment and the member experience continue at Beacon Community.",
      href: "https://beaconcommunity.net",
      external: true,
    },
    {
      label: "Beacon Labs — B2B systems and diagnostics",
      sublabel: "For organizations seeking a consented Signal Check or scoped systems work.",
      href: "https://beaconlabs.ai",
      external: true,
    },
    {
      label: "Beacon Trading — Educational simulation academy",
      sublabel: "For market-literacy practice with artificial capital; no brokerage, custody, or advice.",
      href: "https://beacontrading.ai",
      external: true,
    },
  ];

  const SUPPORT_AND_POLICIES = [
    { label: "Support", href: "mailto:support@beaconmomentum.com" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "The Watch membership information", href: "/the-watch" },
    { label: "Education & simulation boundary", href: "/disclaimer" },
    { label: "Accessibility", href: "mailto:support@beaconmomentum.com?subject=Accessibility%20request" },
  ];

  const colStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  };

  const colHeadStyle: React.CSSProperties = {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontWeight: 500, fontSize: "0.68rem",
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: "rgba(250,248,244,0.35)",
    marginBottom: "1rem",
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Lora', Georgia, serif",
    fontWeight: 400, fontSize: "0.85rem",
    color: "rgba(250,248,244,0.5)",
    textDecoration: "none",
    marginBottom: "0.5rem",
    display: "block",
    transition: "color 0.18s",
  };

  const sublabelStyle: React.CSSProperties = {
    fontFamily: "'Outfit', system-ui, sans-serif",
    fontWeight: 300, fontSize: "0.7rem",
    color: "rgba(250,248,244,0.22)",
    letterSpacing: "0.03em",
    display: "block",
    marginTop: "-0.25rem",
    marginBottom: "0.5rem",
  };

  function NavLink({ href, label, sublabel, external }: { href: string; label: string; sublabel?: string; external?: boolean }) {
    const hoverEnter = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.querySelector(".link-label")! as HTMLElement).style.color = "#FAF8F4";
    const hoverLeave = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.querySelector(".link-label")! as HTMLElement).style.color = "rgba(250,248,244,0.5)";

    const inner = (
      <>
        <span className="link-label" style={linkStyle}>{label}</span>
        {sublabel && <span style={sublabelStyle}>{sublabel}</span>}
      </>
    );

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block" }}
          onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
        {inner}
      </Link>
    );
  }

  return (
    <footer style={{ background: "var(--beacon-charcoal)", paddingTop: "5rem", paddingBottom: "2.5rem" }}>
      <div className="container">
        {/* Top: logo image + wordmark + LLC + tagline */}
        <div style={{ marginBottom: "3.5rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(250,248,244,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Beacon Momentum" style={{ width: "3rem", height: "3rem", flexShrink: 0 }}>
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
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "1.25rem",
                color: "#FAF8F4", letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}>Beacon Momentum</div>
              <div style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 300, fontSize: "0.72rem",
                color: "rgba(250,248,244,0.3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>LLC</div>
            </div>
          </div>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: "1rem",
            color: "rgba(250,248,244,0.72)",
            lineHeight: 1.6,
            maxWidth: "560px",
            marginTop: "0.75rem",
          }}>
            A public orientation point for people building durable work, useful capability, and a steadier next move.
          </p>
          <Link href="/how-beacon-works" style={{ display: "inline-block", marginTop: "0.9rem", color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "underline", textUnderlineOffset: "0.25rem", textTransform: "uppercase" }}>
            Choose your route
          </Link>
        </div>

        <div style={{ borderBottom: "1px solid rgba(250,248,244,0.08)", color: "rgba(250,248,244,0.52)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", paddingBottom: "1rem", textTransform: "uppercase" }}>
          <a href="https://beaconmomentum.com/" style={{ color: "#FAF8F4", textDecoration: "underline", textUnderlineOffset: "0.2rem" }}>Beacon Momentum LLC</a> / Beacon Momentum / Public front door
        </div>

        {/* Four-column grid */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3rem",
          marginBottom: "3rem",
        }}>
          <div style={colStyle}>
            <div style={colHeadStyle}>The Five Pillars</div>
            {PILLARS.map((l) => <NavLink key={l.label} href={l.href} label={l.label} />)}
          </div>
          <div style={colStyle}>
            <div style={colHeadStyle}>Resources</div>
            {RESOURCES.map((l) => <NavLink key={l.label} href={l.href} label={l.label} external={l.external} />)}
          </div>
          <div style={colStyle}>
            <div style={colHeadStyle}>Continue intentionally</div>
            <p style={{ color: "rgba(250,248,244,0.55)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.78rem", lineHeight: 1.55, margin: "0 0 0.9rem" }}>
              You are continuing to a separate Beacon property with its own experience, policies, and enrollment or inquiry process. Accounts, submitted details, payment information, and access do not transfer automatically.
            </p>
            {CONTINUE_INTENTIONALLY.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} sublabel={l.sublabel} external={l.external} />
            ))}
          </div>
          <div style={colStyle}>
            <div style={colHeadStyle}>Support & policies</div>
            <p style={{ color: "rgba(250,248,244,0.55)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.78rem", lineHeight: 1.55, margin: "0 0 0.9rem" }}>
              Need help or a policy document? Contact <a href="mailto:support@beaconmomentum.com" style={{ color: "#FAF8F4" }}>support@beaconmomentum.com</a>. Include the property name and the page or action involved so we can route your request correctly.
            </p>
            {SUPPORT_AND_POLICIES.map((l) => <NavLink key={l.label} href={l.href} label={l.label} />)}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(250,248,244,0.08)",
          paddingTop: "1.5rem",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
        }}>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.72rem",
            color: "rgba(250,248,244,0.25)",
            letterSpacing: "0.04em",
          }}>
            © {year} Beacon Momentum LLC. Beacon Momentum is the public front door of the Beacon ecosystem.
          </p>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.72rem",
            color: "rgba(250,248,244,0.18)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Support: support@beaconmomentum.com
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
