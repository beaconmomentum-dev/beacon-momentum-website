/**
 * SharedNav — Beacon Momentum
 * Parent visual system: one master Beacon mark and one dark navigation rail.
 */
import { useState } from "react";
import { Link } from "wouter";

interface SharedNavProps {
  /** Retained for page-level compatibility; all public routes now use the shared dark parent rail. */
  dark?: boolean;
}

const NAV_LINKS = [
  { label: "The Five Pillars", href: "/#pillars" },
  { label: "The Watch", href: "/the-watch" },
  { label: "Assessment", href: "/assessment" },
  { label: "Resources", href: "/resources" },
  { label: "How Beacon Works", href: "/how-beacon-works" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Community Build", href: "/community-build-grant" },
  { label: "The Signal", href: "/signal" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const RAIL = {
  background: "#0D1D29",
  elevated: "#132A38",
  text: "#F7F1E5",
  muted: "#B8C4C9",
  line: "rgba(247, 241, 229, 0.16)",
  focus: "#E9BC52",
  accent: "#4AA6A8",
};

export default function SharedNav(_: SharedNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 200, background: RAIL.background, borderBottom: `1px solid ${RAIL.line}` }}>
      <div style={{ borderBottom: `1px solid ${RAIL.line}`, color: RAIL.muted, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.12em", padding: "0.38rem max(1rem, calc((100vw - 1200px) / 2))", textTransform: "uppercase" }}>
        <a href="https://beaconmomentum.com/" style={{ color: RAIL.text, textDecoration: "underline", textUnderlineOffset: "0.2rem" }}>Beacon Momentum LLC</a> / Beacon Momentum / Public Front Door
      </div>
      <nav aria-label="Primary" style={{ background: RAIL.background, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }} aria-label="Beacon Momentum home">
            <img src="/brand/beacon-mark.svg" alt="Beacon Momentum LLC" style={{ width: "2rem", height: "2rem", objectFit: "contain", flexShrink: 0 }} />
            <span style={{ display: "flex", flexDirection: "column", gap: "0.12rem" }}>
              <span style={{ color: RAIL.text, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>Beacon Momentum</span>
              <span style={{ color: RAIL.muted, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.12em", lineHeight: 1, textTransform: "uppercase" }}>Public Front Door</span>
            </span>
          </Link>

          <div className="nav-desktop" style={{ alignItems: "center", display: "flex", gap: "clamp(0.55rem, 1vw, 1rem)" }}>
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} style={{ color: RAIL.muted, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 500, letterSpacing: "0.04em", padding: "0.45rem 0", textDecoration: "none" }} onMouseEnter={(event) => { event.currentTarget.style.color = RAIL.text; event.currentTarget.style.textDecoration = `2px underline ${RAIL.accent}`; event.currentTarget.style.textUnderlineOffset = "0.4rem"; }} onMouseLeave={(event) => { event.currentTarget.style.color = RAIL.muted; event.currentTarget.style.textDecoration = "none"; }}>
                {link.label}
              </a>
            ))}
            <Link href="/assessment" style={{ background: RAIL.accent, color: RAIL.background, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", padding: "0.6rem 0.9rem", textDecoration: "none" }}>
              Choose your route
            </Link>
          </div>

          <button type="button" className="nav-hamburger" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="momentum-mobile-navigation" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} style={{ background: "none", border: `1px solid ${RAIL.line}`, color: RAIL.text, cursor: "pointer", display: "none", height: "44px", justifyContent: "center", padding: "0.5rem", width: "44px" }}>
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </nav>

      <nav id="momentum-mobile-navigation" aria-label="Mobile" style={{ background: RAIL.elevated, borderTop: `1px solid ${RAIL.line}`, display: menuOpen ? "block" : "none", padding: "1rem max(1rem, calc((100vw - 1200px) / 2)) 1.5rem" }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ borderBottom: `1px solid ${RAIL.line}`, color: RAIL.text, display: "block", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.04em", padding: "0.85rem 0", textDecoration: "none" }}>
            {link.label}
          </a>
        ))}
        <Link href="/assessment" onClick={() => setMenuOpen(false)} style={{ background: RAIL.accent, color: RAIL.background, display: "block", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em", marginTop: "1rem", padding: "0.9rem 1rem", textAlign: "center", textDecoration: "none" }}>
          Choose your route
        </Link>
      </nav>

      <style>{`
        .nav-hamburger:focus-visible, .nav-desktop a:focus-visible, #momentum-mobile-navigation a:focus-visible { outline: 3px solid ${RAIL.focus}; outline-offset: 3px; }
        @media (max-width: 960px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
      `}</style>
    </header>
  );
}
