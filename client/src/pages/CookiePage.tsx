import { Link } from "wouter";
import { resetBeaconAnalyticsConsent } from "@/lib/beaconAnalytics";

function SimpleNav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,248,244,0.97)", borderBottom: "1px solid var(--beacon-parchment-dark)", backdropFilter: "blur(8px)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={{ width: "1.75rem", height: "1.75rem", flexShrink: 0 }}>
            <rect width="64" height="64" rx="12" fill="#0D1D29" />
            <g fill="none" stroke="#F7F1E5" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 19.5 14.5 16" opacity=".72" />
              <path d="M43 19.5 49.5 16" opacity=".72" />
              <path d="M21 23.5h-7" opacity=".48" />
              <path d="M43 23.5h7" opacity=".48" />
              <path d="m24 18 8-6 8 6Z" />
              <rect x="25" y="18" width="14" height="8" rx="1" />
              <path d="M23 26h18" />
              <path d="M24 26v3M40 26v3" />
              <path d="m25 29-3 22h20l-3-22Z" />
              <path d="M23 40h18" opacity=".58" />
              <path d="M30 51v-5q2-2 4 0v5" />
              <path d="M12 54q4-2 8 0t8 0 8 0 8 0 8 0 8 0" opacity=".6" />
            </g>
            <circle cx="32" cy="22" r="2.2" fill="#E9BC52" />
          </svg>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--beacon-charcoal)", letterSpacing: "-0.01em" }}>Beacon Momentum</span>
        </Link>
        <Link href="/" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", textDecoration: "none" }}>← Home</Link>
      </div>
    </nav>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 600,
  fontSize: "1.5rem",
  color: "var(--beacon-charcoal)",
  marginBottom: "1rem",
  marginTop: "2.75rem",
};

const pStyle: React.CSSProperties = { marginBottom: "1.5rem" };

export default function CookiePage() {
  function resetAnalyticsPreference() {
    resetBeaconAnalyticsConsent();
    window.location.reload();
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SimpleNav />
      <section style={{ padding: "7rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--beacon-amber)", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber)", display: "inline-block" }} />
            Legal
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--beacon-charcoal)", marginBottom: "1rem" }}>
            Cookie and Analytics Policy
          </h1>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", marginBottom: "3rem", letterSpacing: "0.04em" }}>
            Last updated: October 15, 2026 &nbsp;·&nbsp; Effective: October 15, 2026
          </p>

          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.85, color: "var(--beacon-charcoal-mid)" }}>
            <p style={pStyle}>
              This policy explains how Beacon Momentum LLC ("Beacon Momentum," "we," "us," or "our") uses browser storage, cookies, and privacy-respecting measurement on beaconmomentum.com. It should be read with our <Link href="/privacy" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Privacy Policy</Link> and <Link href="/terms" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Terms of Use</Link>.
            </p>

            <h2 style={h2Style}>1. Our approach</h2>
            <p style={pStyle}>
              Beacon uses a self-hosted instance of Umami for limited first-party measurement. We do not use Google Analytics, advertising pixels, retargeting tags, cross-site behavioral tracking, or a system that builds advertising profiles from your reading or listening.
            </p>
            <p style={pStyle}>
              Optional analytics loads only after you select <strong>Allow analytics</strong> in the preference notice. Choosing <strong>No thanks</strong> prevents the Umami script from loading in that browser. Cloudflare may still use strictly necessary security controls to protect the site from abusive traffic.
            </p>

            <h2 style={h2Style}>2. Storage and tools we use</h2>
            <div style={{ overflowX: "auto", marginBottom: "1.75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--beacon-parchment-dark)" }}>
                    {["Tool or storage", "Type", "Purpose", "Duration"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "0.75rem 0.75rem 0.75rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["beacon_analytics_consent", "Browser local storage", "Remembers whether you allowed or declined optional Beacon analytics", "Until changed or browser storage is cleared"],
                    ["umami.disabled", "Browser local storage", "Honors a decline by preventing Umami from sending analytics events", "Until changed or browser storage is cleared"],
                    ["Self-hosted Umami", "Optional first-party analytics", "Measures aggregate page use and the limited engagement events described below after you allow analytics", "No Google Analytics cookie used by this implementation"],
                    ["__cf_bm", "Functional security cookie", "Cloudflare bot-management control that helps protect the site from automated abuse", "Typically 30 minutes"],
                  ].map(([name, type, purpose, duration], index) => (
                    <tr key={index} style={{ borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
                      <td style={{ padding: "0.75rem 0.75rem 0.75rem 0", verticalAlign: "top", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{name}</td>
                      <td style={{ padding: "0.75rem", verticalAlign: "top" }}>{type}</td>
                      <td style={{ padding: "0.75rem", verticalAlign: "top" }}>{purpose}</td>
                      <td style={{ padding: "0.75rem 0 0.75rem 0.75rem", verticalAlign: "top" }}>{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={h2Style}>3. What optional analytics measures</h2>
            <p style={pStyle}>
              If you allow analytics, Beacon may measure the page path, page title, referring domain, broad browser/device information, language, country, permitted campaign parameters, and technical page-performance signals. For Signal articles, it may also measure a user-initiated narration start, bounded narration-progress thresholds, and reading-depth thresholds.
            </p>
            <p style={pStyle}>
              Beacon does not send the contents of your messages, your contact details, payment information, free-form reading notes, or a cross-property profile through these article analytics events. We do not use these measurements to make automated decisions about you.
            </p>

            <h2 style={h2Style}>4. Your choice</h2>
            <p style={pStyle}>
              You can allow or decline optional analytics in the notice shown on your first visit. You can reopen that choice below. Resetting it clears the local preference in this browser and shows the notice again; it does not alter security controls that are necessary to operate the site.
            </p>
            <button
              type="button"
              onClick={resetAnalyticsPreference}
              style={{
                background: "transparent",
                border: "1px solid var(--beacon-teal)",
                borderRadius: "2px",
                color: "var(--beacon-teal)",
                cursor: "pointer",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "0.76rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "0.7rem 1rem",
                textTransform: "uppercase",
              }}
            >
              Review analytics preference
            </button>

            <h2 style={h2Style}>5. Cookies we do not use</h2>
            <p style={pStyle}>
              Beacon does not use Google Analytics cookies, advertising or retargeting cookies, Facebook Pixel, LinkedIn Insight Tag, or cookies that follow your activity across other websites to build a marketing profile.
            </p>

            <h2 style={h2Style}>6. Regional privacy choices</h2>
            <p style={pStyle}>
              In locations where consent is required for optional analytics, Beacon presents the analytics notice before loading Umami. Choosing No thanks prevents those optional analytics events in that browser. Necessary security controls may continue to operate on the basis of legitimate interests in protecting the service and its visitors.
            </p>

            <h2 style={h2Style}>7. Changes to this policy</h2>
            <p style={pStyle}>
              We may update this policy when our measurement approach or legal obligations change. Material changes will be reflected in the date at the top of this page.
            </p>

            <h2 style={h2Style}>8. Contact</h2>
            <p style={pStyle}>For questions about this policy, contact:</p>
            <p style={{ ...pStyle, fontStyle: "normal" }}>
              <strong>Beacon Momentum LLC</strong><br />
              1309 Coffeen Avenue, Suite 19387<br />
              Sheridan, Wyoming 82801<br />
              Mailing: PO Box 244, Cheshire, Massachusetts 01225<br />
              <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a><br />
              (888) 437-7657
            </p>
          </div>
        </div>
      </section>
      <footer style={{ background: "var(--beacon-charcoal)", padding: "2.5rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", letterSpacing: "0.04em" }}>© {new Date().getFullYear()} Beacon Momentum LLC. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/privacy" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", textDecoration: "none", letterSpacing: "0.04em" }}>Privacy</Link>
            <Link href="/terms" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", textDecoration: "none", letterSpacing: "0.04em" }}>Terms</Link>
            <Link href="/cookies" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", textDecoration: "none", letterSpacing: "0.04em" }}>Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
