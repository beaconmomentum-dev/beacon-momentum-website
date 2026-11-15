import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  getBeaconAnalyticsConsent,
  loadBeaconAnalytics,
  setBeaconAnalyticsConsent,
} from "@/lib/beaconAnalytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getBeaconAnalyticsConsent();

    if (consent === "granted") {
      loadBeaconAnalytics();
      return;
    }

    if (consent === null) {
      const timer = window.setTimeout(() => setVisible(true), 900);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function allowAnalytics() {
    setBeaconAnalyticsConsent("granted");
    loadBeaconAnalytics();
    setVisible(false);
  }

  function declineAnalytics() {
    setBeaconAnalyticsConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics preference"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        width: "min(92vw, 540px)",
        background: "var(--beacon-charcoal, #162433)",
        borderRadius: "4px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        flexWrap: "wrap",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        animation: "beaconConsentSlideUp 0.28s cubic-bezier(0.23,1,0.32,1) both",
      }}
    >
      <style>{`
        @keyframes beaconConsentSlideUp {
          from { opacity: 0; transform: translateY(1rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          [aria-label="Analytics preference"] { bottom: 1rem !important; right: 1rem !important; }
        }
      `}</style>

      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: "1.5rem",
          height: "1.5rem",
          background: "var(--beacon-teal, #2A7B7B)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          color: "#FAF8F4",
          borderRadius: "2px",
        }}
      >
        ◈
      </span>

      <p
        style={{
          flex: 1,
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: "0.82rem",
          lineHeight: 1.6,
          color: "rgba(250,248,244,0.75)",
          margin: 0,
          minWidth: "200px",
        }}
      >
        May Beacon use privacy-respecting, self-hosted analytics to understand
        which public pages are useful? We do not use advertising pixels,
        cross-site tracking, or personal profiles. {" "}
        <Link
          href="/cookies"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            color: "var(--beacon-amber, #C8963E)",
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          Learn how it works
        </Link>
      </p>

      <div style={{ display: "flex", gap: "0.625rem", flexShrink: 0 }}>
        <button
          type="button"
          onClick={declineAnalytics}
          style={{
            fontFamily: "'Manrope', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(250,248,244,0.65)",
            background: "transparent",
            border: "1px solid rgba(250,248,244,0.25)",
            borderRadius: "2px",
            padding: "0.45rem 0.875rem",
            minHeight: "44px",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={allowAnalytics}
          style={{
            fontFamily: "'Manrope', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "0.78rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--beacon-charcoal, #1C1C1A)",
            background: "var(--beacon-amber, #C8963E)",
            border: "1px solid var(--beacon-amber, #C8963E)",
            borderRadius: "2px",
            padding: "0.45rem 0.875rem",
            minHeight: "44px",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        >
          Allow analytics
        </button>
      </div>
    </div>
  );
}
