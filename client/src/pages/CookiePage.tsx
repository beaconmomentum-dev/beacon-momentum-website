import { Link } from "wouter";

function SimpleNav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,248,244,0.97)", borderBottom: "1px solid var(--beacon-parchment-dark)", backdropFilter: "blur(8px)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{ width: "1.25rem", height: "1.25rem", background: "var(--beacon-teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#FAF8F4" }}>◈</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.05rem", color: "var(--beacon-charcoal)", letterSpacing: "-0.01em" }}>Beacon Momentum</span>
        </Link>
        <Link href="/" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", textDecoration: "none" }}>← Home</Link>
      </div>
    </nav>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 600, fontSize: "1.5rem",
  color: "var(--beacon-charcoal)",
  marginBottom: "1rem", marginTop: "2.75rem",
};

const pStyle: React.CSSProperties = { marginBottom: "1.5rem" };

export default function CookiePage() {
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
            Cookie Policy
          </h1>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", marginBottom: "3rem", letterSpacing: "0.04em" }}>
            Last updated: June 13, 2026 &nbsp;·&nbsp; Effective: June 13, 2026
          </p>

          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.85, color: "var(--beacon-charcoal-mid)" }}>

            <p style={pStyle}>
              This Cookie Policy explains how Beacon Momentum LLC ("Beacon Momentum," "we," "us," or "our") uses cookies and similar technologies on beaconmomentum.com and associated Beacon properties. It should be read alongside our <Link href="/privacy" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Privacy Policy</Link> and <Link href="/terms" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Terms of Use</Link>.
            </p>

            <h2 style={h2Style}>1. What Are Cookies?</h2>
            <p style={pStyle}>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website operators. Cookies can be "session cookies" (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).
            </p>

            <h2 style={h2Style}>2. Cookies We Use</h2>
            <p style={pStyle}>
              Beacon Momentum uses a minimal set of cookies. We do not use advertising cookies, cross-site tracking cookies, or cookies that build individual profiles for marketing purposes on other platforms. The following table describes the cookies we use:
            </p>

            <div style={{ overflowX: "auto", marginBottom: "1.75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--beacon-parchment-dark)" }}>
                    {["Cookie Name", "Type", "Purpose", "Duration"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "0.75rem 0.75rem 0.75rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["beacon_cookie_consent", "Functional", "Stores your cookie consent preference so we do not show the consent banner on every visit", "1 year"],
                    ["_ga, _ga_*", "Analytics", "Google Analytics — anonymized page view and session data used in aggregate to understand how content is used. IP anonymization is enabled.", "2 years"],
                    ["__cf_bm", "Functional", "Cloudflare bot management — distinguishes human visitors from automated traffic for security purposes", "30 minutes"],
                  ].map(([name, type, purpose, duration], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
                      <td style={{ padding: "0.75rem 0.75rem 0.75rem 0", verticalAlign: "top", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{name}</td>
                      <td style={{ padding: "0.75rem 0.75rem", verticalAlign: "top" }}>{type}</td>
                      <td style={{ padding: "0.75rem 0.75rem", verticalAlign: "top" }}>{purpose}</td>
                      <td style={{ padding: "0.75rem 0 0.75rem 0.75rem", verticalAlign: "top", whiteSpace: "nowrap" }}>{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={h2Style}>3. Cookies We Do Not Use</h2>
            <p style={pStyle}>
              Beacon Momentum does not use: advertising or retargeting cookies; social media tracking pixels (Facebook Pixel, LinkedIn Insight Tag, etc.); cookies that track your activity across other websites; or cookies that build individual behavioral profiles for the purpose of serving you targeted advertisements elsewhere on the internet.
            </p>

            <h2 style={h2Style}>4. Your Choices and How to Manage Cookies</h2>
            <p style={pStyle}>
              When you first visit the Beacon Momentum website, you will be shown a cookie consent notice. You may accept analytics cookies or decline them. If you decline analytics cookies, only the strictly necessary functional cookies (consent preference and Cloudflare security) will be set.
            </p>
            <p style={pStyle}>
              You may also manage cookies through your browser settings. Most browsers allow you to view, delete, and block cookies. Please note that blocking all cookies may affect the functionality of some websites. The following links provide instructions for managing cookies in common browsers:
            </p>
            <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", lineHeight: 2 }}>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Microsoft Edge</a></li>
            </ul>
            <p style={pStyle}>
              To opt out of Google Analytics specifically, you may install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Google Analytics Opt-out Browser Add-on</a>.
            </p>

            <h2 style={h2Style}>5. Lawful Basis for Cookie Use (GDPR)</h2>
            <p style={pStyle}>
              For users in the European Economic Area, United Kingdom, or Switzerland, our use of cookies is governed by the GDPR and applicable national ePrivacy laws. Strictly necessary cookies (consent preference, Cloudflare security) are used on the basis of legitimate interests (Art. 6(1)(f) GDPR) — they are required for the basic operation and security of the website. Analytics cookies are used only with your explicit consent (Art. 6(1)(a) GDPR), which you may withdraw at any time by adjusting your browser settings or contacting us.
            </p>

            <h2 style={h2Style}>6. Changes to This Policy</h2>
            <p style={pStyle}>
              We may update this Cookie Policy as our technology or legal obligations change. Material changes will be reflected by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
            </p>

            <h2 style={h2Style}>7. Contact</h2>
            <p style={pStyle}>
              For questions about our use of cookies, contact us at:
            </p>
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
