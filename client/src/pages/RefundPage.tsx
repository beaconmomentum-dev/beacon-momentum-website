import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const C = {
  deep: "#071523",
  water: "#0D263B",
  amber: "#D4A94D",
  cream: "#F7F1E5",
  mist: "rgba(247,241,229,0.76)",
  line: "rgba(212,169,77,0.28)",
};

const sections = [
  {
    title: "1. Scope of this policy",
    body: "This Refund and Cancellation Policy applies to purchases made directly from Beacon Momentum LLC through beaconmomentum.com. The Beacon Momentum Terms of Service remain part of this policy and control if there is a conflict.",
  },
  {
    title: "2. The Watch annual membership",
    body: "The Watch is a $497 annual membership with no free trial. A successful payment purchases access for the current annual term. Except where required by applicable law or where Beacon Momentum states otherwise in writing for a specific offer, annual membership payments are not refundable after payment is successfully completed.",
  },
  {
    title: "3. Cancellation and future renewal",
    body: "You may cancel a future Watch renewal before its renewal date by contacting support@beaconmomentum.com from the enrollment email address. Cancellation stops a future renewal; it does not shorten the annual term already purchased. Access remains available through the end of the paid annual term, subject to the Terms of Service.",
  },
  {
    title: "4. Payment problems and duplicate charges",
    body: "If you believe a charge was made in error, appears to be duplicated, or you need help with a payment failure, contact support@beaconmomentum.com before initiating a chargeback. Include your enrollment email, the charge date, and the last four digits of the payment method when available. Beacon Momentum will review the request and respond using the contact information associated with the enrollment.",
  },
  {
    title: "5. Chargebacks and account access",
    body: "A chargeback initiated without first contacting Beacon Momentum may result in suspension of membership access while the matter is reviewed, as described in the Terms of Service. This does not limit any non-waivable consumer rights that apply to your purchase.",
  },
  {
    title: "6. Contact",
    body: "For cancellation, refund-policy, or payment questions, email support@beaconmomentum.com. Please use the subject line “The Watch enrollment support” and include the email address used for enrollment.",
  },
];

export default function RefundPage() {
  usePageMeta({
    title: "Refund and Cancellation Policy",
    description: "Beacon Momentum refund, cancellation, renewal, and payment-support policy for The Watch annual membership.",
    url: "/refund",
  });

  return (
    <main id="main-content" style={{ minHeight: "100vh", background: C.deep, color: C.cream, fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
      <header style={{ borderBottom: `1px solid ${C.line}`, background: "rgba(7,21,35,0.96)" }}>
        <div className="container" style={{ minHeight: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <Link href="/" style={{ color: C.cream, display: "inline-flex", alignItems: "center", gap: "0.65rem", textDecoration: "none", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.78rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={{ width: "24px", height: "24px", flexShrink: 0 }}>
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
            Beacon Momentum
          </Link>
          <Link href="/the-watch" style={{ color: C.mist, textDecoration: "none", fontSize: "0.84rem" }}>The Watch</Link>
        </div>
      </header>

      <section style={{ padding: "clamp(3.5rem, 8vw, 7rem) 0", background: "radial-gradient(circle at 82% 7%, rgba(212,169,77,0.15), transparent 28%), linear-gradient(135deg, #071523 0%, #0D263B 100%)" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.17em", fontSize: "0.72rem", fontWeight: 800 }}>Beacon Momentum LLC</p>
          <h1 style={{ maxWidth: "760px", margin: "1rem 0 0", fontFamily: "Georgia, Cambria, serif", fontSize: "clamp(2.7rem, 6vw, 5rem)", fontWeight: 500, lineHeight: 1.03, letterSpacing: "-0.04em" }}>Refund and cancellation policy</h1>
          <p style={{ maxWidth: "700px", margin: "1.35rem 0 0", color: C.mist, fontSize: "1.05rem", lineHeight: 1.75 }}>Clear terms for Watch enrollment, annual renewal, cancellation, and payment support.</p>
          <p style={{ margin: "1rem 0 0", color: "rgba(247,241,229,0.56)", fontSize: "0.8rem", letterSpacing: "0.03em" }}>Last updated: August 11, 2026</p>
        </div>
      </section>

      <section style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {sections.map((section) => (
              <section key={section.title} style={{ padding: "1.4rem 0", borderBottom: `1px solid ${C.line}` }}>
                <h2 style={{ margin: 0, color: C.cream, fontFamily: "Georgia, Cambria, serif", fontSize: "1.45rem", fontWeight: 500 }}>{section.title}</h2>
                <p style={{ margin: "0.75rem 0 0", color: C.mist, lineHeight: 1.78 }}>{section.body}</p>
              </section>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}>
            <Link href="/terms" style={{ color: C.deep, background: C.amber, padding: "0.85rem 1rem", textDecoration: "none", fontWeight: 800, fontSize: "0.76rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Read Terms of Service</Link>
            <a href="mailto:support@beaconmomentum.com?subject=The%20Watch%20enrollment%20support" style={{ color: C.cream, padding: "0.85rem 0.25rem", textDecoration: "none", borderBottom: "1px solid rgba(247,241,229,0.34)", fontSize: "0.84rem" }}>Contact enrollment support</a>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "2rem 0", background: "#05101b" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <p style={{ margin: 0, color: "rgba(247,241,229,0.52)", fontSize: "0.75rem" }}>© {new Date().getFullYear()} Beacon Momentum LLC. All rights reserved.</p>
          <nav aria-label="Policy links" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/privacy" style={{ color: C.mist, textDecoration: "none", fontSize: "0.78rem" }}>Privacy</Link>
            <Link href="/terms" style={{ color: C.mist, textDecoration: "none", fontSize: "0.78rem" }}>Terms</Link>
            <Link href="/cookies" style={{ color: C.mist, textDecoration: "none", fontSize: "0.78rem" }}>Cookies</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
