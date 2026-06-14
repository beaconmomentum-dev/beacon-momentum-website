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
    { label: "Beacon Trading", href: "/beacon-trading" },
    { label: "The Watch (Community)", href: "/the-watch" },
  ];

  const RESOURCES = [
    { label: "Pathfinder Assessment", href: "/assessment" },
    { label: "Resources & Guides", href: "/resources" },
    { label: "The Signal (Blog)", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Signal Check", href: "https://beaconlabs.ai/signal-check", external: true },
    { label: "YouTube Channel", href: "https://youtube.com/@BeaconMomentumAI", external: true },
  ];

  const PROPERTIES = [
    { label: "Digital Grandpa", href: "/digital-grandpa" },
    { label: "Beacon Trading", href: "https://beacontrading.ai", external: true },
    { label: "Beacon Labs", href: "https://beaconlabs.ai", external: true },
    { label: "Hollow Threads", href: "https://holothreads.com", external: true },
    { label: "Cask & Cuisine", href: "https://caskandcuisine.com", external: true },
    { label: "Vitality", href: "https://vitalyears.com", external: true },
  ];

  const COMPANY = [
    { label: "About Beacon", href: "/about" },
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
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

  function NavLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
    const props = {
      style: linkStyle,
      onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#FAF8F4"),
      onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(250,248,244,0.5)"),
    };
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{label}</a>;
    }
    return <Link href={href} {...props}>{label}</Link>;
  }

  return (
    <footer style={{ background: "var(--beacon-charcoal)", paddingTop: "5rem", paddingBottom: "2.5rem" }}>
      <div className="container">
        {/* Top: wordmark + tagline */}
        <div style={{ marginBottom: "3.5rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(250,248,244,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{
              width: "2rem", height: "2rem",
              background: "var(--beacon-teal)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.9rem", color: "#FAF8F4",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}>◈</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "1.25rem",
              color: "#FAF8F4", letterSpacing: "-0.01em",
            }}>Beacon Momentum</span>
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: "1rem",
            fontStyle: "italic",
            color: "rgba(250,248,244,0.45)",
            letterSpacing: "0.02em",
            maxWidth: "400px",
          }}>
            The Lighthouse Is Lit. Join Us at the Watch.
          </p>
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
            <div style={colHeadStyle}>Beacon Properties</div>
            {PROPERTIES.map((l) => <NavLink key={l.label} href={l.href} label={l.label} external={l.external} />)}
          </div>
          <div style={colStyle}>
            <div style={colHeadStyle}>Company</div>
            {COMPANY.map((l) => <NavLink key={l.label} href={l.href} label={l.label} />)}
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
            © {year} Beacon Momentum, LLC. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.72rem",
            color: "rgba(250,248,244,0.18)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            Earn · Prove · Amplify
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
