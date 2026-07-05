/**
 * SharedFooter — Beacon Momentum
 * Design: Deep Water Editorial / Quiet Authority
 * Consistent footer used across ALL pages.
 * Dark charcoal background, four-column layout.
 * Tagline: "The Lighthouse Is Lit. Join Us at the Watch."
 * Matches sandbox redesign (beaconredesign-6hqukxcf.manus.space) exactly.
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
    { label: "The Signal", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Signal Check", href: "https://beaconlabs.ai/signal-check", external: true },
    { label: "YouTube Channel", href: "https://youtube.com/@BeaconMomentumAI", external: true },
  ];

  const PROPERTIES = [
    { label: "Beacon Labs", sublabel: "beaconlabs.ai", href: "https://beaconlabs.ai", external: true },
    { label: "Beacon Trading · Simulation Academy", sublabel: "beacontrading.ai", href: "https://beacontrading.ai", external: true },
    { label: "Beacon Community", sublabel: "beaconcommunity.net", href: "https://beaconcommunity.net", external: true },
    { label: "Hollow Threads", sublabel: "hollowthreads.store", href: "https://hollowthreads.store", external: true },
    { label: "Digital Grandpa", sublabel: "digitalgrandpa.org", href: "https://digitalgrandpa.org", external: true },
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
            <img
              src="/icons/beacon-logo.webp"
              alt="Beacon Momentum"
              style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
              onError={(e) => {
                // Fallback to teal square with ◈ if logo not found
                const el = e.currentTarget;
                el.style.display = "none";
                const fallback = document.createElement("span");
                fallback.style.cssText = "width:2rem;height:2rem;background:var(--beacon-teal);display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#FAF8F4;font-family:'Cormorant Garamond',Georgia,serif;";
                fallback.textContent = "◈";
                el.parentNode!.insertBefore(fallback, el);
              }}
            />
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
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: "1rem",
            fontStyle: "italic",
            color: "rgba(250,248,244,0.45)",
            letterSpacing: "0.02em",
            maxWidth: "400px",
            marginTop: "0.75rem",
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
            {PROPERTIES.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} sublabel={l.sublabel} external={l.external} />
            ))}
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
