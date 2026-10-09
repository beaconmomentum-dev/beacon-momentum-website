/**
 * SharedNav — Beacon Momentum
 *
 * The public front door has five primary choices. Specialist properties remain
 * deliberately separate and are disclosed in the Explore menu rather than
 * competing with the first-screen decision.
 */
import { useState } from "react";
import { Link } from "wouter";

interface SharedNavProps {
  /** Retained for page-level compatibility; public routes use the shared dark rail. */
  dark?: boolean;
}

type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

const PRIMARY_LINKS: NavigationLink[] = [
  { label: "The Watch", href: "/the-watch" },
  { label: "Beacon Labs", href: "https://beaconlabs.ai", external: true },
  { label: "Readiness Map", href: "/ReadinessMap" },
  { label: "Signal", href: "/signal" },
];

const EXPLORE_LINKS: NavigationLink[] = [
  { label: "Beacon Trading", href: "https://beacontrading.ai", external: true },
  { label: "Hollow Threads", href: "https://hollowthreads.store", external: true },
  { label: "Digital Grandpa", href: "https://digitalgrandpa.org", external: true },
  { label: "Resources", href: "/resources" },
];

const RAIL = {
  background: "#162433",
  elevated: "#223345",
  text: "#F5F3EC",
  muted: "#C7CFD2",
  line: "rgba(245, 243, 236, 0.18)",
  focus: "#C49F53",
  accent: "#2E7A7D",
};

function NavAnchor({ link, onClick }: { link: NavigationLink; onClick?: () => void }) {
  const style: React.CSSProperties = {
    color: RAIL.muted,
    fontFamily: "'Manrope', system-ui, sans-serif",
    fontSize: "0.74rem",
    fontWeight: 600,
    letterSpacing: "0.04em",
    padding: "0.45rem 0",
    textDecoration: "none",
  };

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} style={style} onClick={onClick}>
      {link.label}
    </Link>
  );
}

export default function SharedNav(_: SharedNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setExploreOpen(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: RAIL.background,
        borderBottom: `1px solid ${RAIL.line}`,
      }}
    >
      <div
        style={{
          borderBottom: `1px solid ${RAIL.line}`,
          color: RAIL.muted,
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          padding: "0.38rem max(1rem, calc((100vw - 1200px) / 2))",
          textTransform: "uppercase",
        }}
      >
        <a
          href="https://beaconmomentum.com/"
          style={{
            color: RAIL.text,
            textDecoration: "underline",
            textUnderlineOffset: "0.2rem",
          }}
        >
          Beacon Momentum LLC
        </a>{" "}
        / Public Front Door
      </div>

      <nav aria-label="Primary" style={{ background: RAIL.background }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
            aria-label="Beacon Momentum home"
          >
            <img
              src="/brand/beacon-mark.svg"
              alt="Beacon Momentum LLC"
              style={{ width: "2.75rem", height: "2.75rem", flexShrink: 0 }}
            />
            <span style={{ display: "flex", flexDirection: "column", gap: "0.12rem" }}>
              <span
                style={{
                  color: RAIL.text,
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                Beacon Momentum
              </span>
              <span
                style={{
                  color: RAIL.muted,
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                Public Front Door
              </span>
            </span>
          </Link>

          <div
            className="nav-desktop"
            style={{ alignItems: "center", display: "flex", gap: "clamp(0.7rem, 1.2vw, 1.25rem)" }}
          >
            {PRIMARY_LINKS.map((link) => (
              <NavAnchor key={link.label} link={link} />
            ))}
            <div
              className="nav-explore"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setExploreOpen(false);
                }
              }}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                onClick={() => setExploreOpen((open) => !open)}
                aria-expanded={exploreOpen}
                aria-controls="beacon-explore-menu"
                style={{
                  background: "transparent",
                  border: 0,
                  color: RAIL.muted,
                  cursor: "pointer",
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "0.45rem 0",
                }}
              >
                Explore <span aria-hidden="true">{exploreOpen ? "−" : "+"}</span>
              </button>
              {exploreOpen && (
                <div
                  id="beacon-explore-menu"
                  role="menu"
                  aria-label="Explore related Beacon properties"
                  style={{
                    background: RAIL.elevated,
                    border: `1px solid ${RAIL.line}`,
                    display: "grid",
                    gap: "0.1rem",
                    minWidth: "220px",
                    padding: "0.6rem 0.85rem",
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 0.6rem)",
                  }}
                >
                  <p
                    style={{
                      color: RAIL.muted,
                      fontFamily: "'Manrope', system-ui, sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      margin: "0.15rem 0 0.35rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Separate properties
                  </p>
                  {EXPLORE_LINKS.map((link) => (
                    <NavAnchor key={link.label} link={link} onClick={() => setExploreOpen(false)} />
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/ReadinessMap"
              style={{
                background: RAIL.accent,
                color: RAIL.background,
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
                padding: "0.65rem 0.85rem",
                textDecoration: "none",
              }}
            >
              Make one job visible
            </Link>
          </div>

          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="momentum-mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              background: "none",
              border: `1px solid ${RAIL.line}`,
              color: RAIL.text,
              cursor: "pointer",
              display: "none",
              height: "44px",
              justifyContent: "center",
              padding: "0.5rem",
              width: "44px",
            }}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </nav>

      <nav
        id="momentum-mobile-navigation"
        aria-label="Mobile"
        style={{
          background: RAIL.elevated,
          borderTop: `1px solid ${RAIL.line}`,
          display: menuOpen ? "block" : "none",
          padding: "1rem max(1rem, calc((100vw - 1200px) / 2)) 1.5rem",
        }}
      >
        {PRIMARY_LINKS.map((link) => (
          <NavAnchor key={link.label} link={link} onClick={closeMenus} />
        ))}
        <div style={{ borderTop: `1px solid ${RAIL.line}`, marginTop: "0.6rem", paddingTop: "0.7rem" }}>
          <p
            style={{
              color: RAIL.muted,
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              margin: "0 0 0.3rem",
              textTransform: "uppercase",
            }}
          >
            Explore separate properties
          </p>
          {EXPLORE_LINKS.map((link) => (
            <NavAnchor key={link.label} link={link} onClick={closeMenus} />
          ))}
        </div>
        <Link
          href="/ReadinessMap"
          onClick={closeMenus}
          style={{
            background: RAIL.accent,
            color: RAIL.background,
            display: "block",
            fontFamily: "'Manrope', system-ui, sans-serif",
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            marginTop: "1rem",
            padding: "0.9rem 1rem",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          Make one job visible
        </Link>
      </nav>

      <style>{`
        .nav-hamburger:focus-visible, .nav-desktop a:focus-visible, .nav-desktop button:focus-visible, #momentum-mobile-navigation a:focus-visible { outline: 3px solid ${RAIL.focus}; outline-offset: 3px; }
        .nav-desktop a:hover, .nav-desktop button:hover { color: ${RAIL.text} !important; text-decoration: underline; text-decoration-color: ${RAIL.accent}; text-underline-offset: 0.4rem; }
        #momentum-mobile-navigation a { border-bottom: 1px solid ${RAIL.line}; display: block; padding: 0.85rem 0; }
        @media (max-width: 1140px) { .nav-desktop { display: none !important; } .nav-hamburger { display: flex !important; align-items: center; font-size: 1.3rem; } }
      `}</style>
    </header>
  );
}
