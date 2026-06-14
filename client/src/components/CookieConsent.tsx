import { useState, useEffect } from "react";
import { Link } from "wouter";

const CONSENT_KEY = "beacon_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash immediately on page load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(92vw, 640px)",
        background: "var(--beacon-charcoal, #1C1C1A)",
        borderRadius: "4px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        flexWrap: "wrap",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        animation: "cookieSlideUp 0.28s cubic-bezier(0.23,1,0.32,1) both",
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(1rem); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Beacon mark */}
      <span style={{
        flexShrink: 0,
        width: "1.5rem", height: "1.5rem",
        background: "var(--beacon-teal, #2A7B7B)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.7rem", color: "#FAF8F4",
        borderRadius: "2px",
      }}>◈</span>

      <p style={{
        flex: 1,
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 300,
        fontSize: "0.82rem",
        lineHeight: 1.6,
        color: "rgba(250,248,244,0.75)",
        margin: 0,
        minWidth: "200px",
      }}>
        We use minimal analytics cookies to understand how our content is used.
        No advertising or cross-site tracking.{" "}
        <Link
          href="/cookies"
          style={{ color: "var(--beacon-amber, #C8963E)", textDecoration: "none", fontWeight: 400 }}
        >
          Cookie Policy
        </Link>
      </p>

      <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.45)",
            background: "transparent",
            border: "1px solid rgba(250,248,244,0.15)",
            borderRadius: "2px",
            padding: "0.45rem 0.875rem",
            cursor: "pointer",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(250,248,244,0.35)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(250,248,244,0.7)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(250,248,244,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(250,248,244,0.45)";
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--beacon-charcoal, #1C1C1A)",
            background: "var(--beacon-amber, #C8963E)",
            border: "1px solid var(--beacon-amber, #C8963E)",
            borderRadius: "2px",
            padding: "0.45rem 0.875rem",
            cursor: "pointer",
            transition: "opacity 0.15s, transform 0.1s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
          onMouseDown={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"}
          onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
