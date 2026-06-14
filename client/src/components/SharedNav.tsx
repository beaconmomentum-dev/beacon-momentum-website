/**
 * SharedNav — Beacon Momentum
 * Design: Deep Water Editorial / Quiet Authority
 * Consistent navigation used across ALL pages.
 * Sticky, backdrop-blur, parchment background.
 */
import { useState } from "react";
import { Link } from "wouter";

const LOGO_MARK = (
  <span style={{
    width: "1.75rem", height: "1.75rem",
    background: "var(--beacon-teal)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.8rem", color: "#FAF8F4",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    flexShrink: 0,
  }}>◈</span>
);

interface SharedNavProps {
  /** If true, renders a dark (charcoal) nav for dark-background pages */
  dark?: boolean;
}

export default function SharedNav({ dark = false }: SharedNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = dark
    ? "rgba(28,28,30,0.97)"
    : "rgba(250,248,244,0.97)";
  const border = dark
    ? "rgba(250,248,244,0.08)"
    : "var(--beacon-parchment-dark)";
  const wordmarkColor = dark ? "#FAF8F4" : "var(--beacon-charcoal)";
  const linkColor = dark ? "rgba(250,248,244,0.6)" : "#6B5E4E";
  const linkHover = dark ? "#FAF8F4" : "var(--beacon-charcoal)";
  const hamburgerColor = dark ? "rgba(250,248,244,0.7)" : "#6B5E4E";

  const NAV_LINKS = [
    { label: "The Five Pillars", href: "/#pillars" },
    { label: "The Watch", href: "/the-watch" },
    { label: "Assessment", href: "/assessment" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: bg,
        borderBottom: `1px solid ${border}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            {LOGO_MARK}
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "1.1rem",
              color: wordmarkColor, letterSpacing: "-0.01em",
            }}>Beacon Momentum</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="nav-desktop">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  color: linkColor,
                  textDecoration: "none",
                  transition: "color 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >{l.label}</a>
            ))}
            <Link
              href="/assessment"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.78rem",
                letterSpacing: "0.06em",
                padding: "0.5rem 1.25rem",
                background: "var(--beacon-teal)",
                color: "#FAF8F4",
                textDecoration: "none",
                transition: "background 0.18s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--beacon-teal-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--beacon-teal)")}
            >
              Find Your Path
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "0.5rem", color: hamburgerColor,
              display: "none",
            }}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="2" y1="2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="2" x2="2" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: bg,
            borderTop: `1px solid ${border}`,
            padding: "1.25rem 1.5rem 1.75rem",
          }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                  color: linkColor,
                  textDecoration: "none",
                  padding: "0.75rem 0",
                  borderBottom: `1px solid ${border}`,
                }}
              >{l.label}</a>
            ))}
            <Link
              href="/assessment"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                marginTop: "1rem",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.85rem",
                letterSpacing: "0.06em",
                padding: "0.875rem 1.5rem",
                background: "var(--beacon-teal)",
                color: "#FAF8F4",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Find Your Path
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
