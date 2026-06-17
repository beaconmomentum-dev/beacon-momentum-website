import { Link } from "wouter";

function SimpleNav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,248,244,0.97)", borderBottom: "1px solid var(--beacon-parchment-dark)", backdropFilter: "blur(8px)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <img src="/icons/beacon-logo.webp" alt="Beacon Momentum" style={{ width: "1.75rem", height: "1.75rem", objectFit: "contain", flexShrink: 0 }} />
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

const h3Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontWeight: 600, fontSize: "1.15rem",
  color: "var(--beacon-charcoal)",
  marginBottom: "0.75rem", marginTop: "1.75rem",
};

const pStyle: React.CSSProperties = { marginBottom: "1.5rem" };

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", marginBottom: "3rem", letterSpacing: "0.04em" }}>
            Last updated: June 13, 2026 &nbsp;·&nbsp; Effective: June 13, 2026
          </p>

          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.85, color: "var(--beacon-charcoal-mid)" }}>

            <p style={pStyle}>
              Beacon Momentum ("Beacon," "we," "us," or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights with respect to that data. It applies to all visitors and users of beaconmomentum.com and any associated Beacon properties.
            </p>
            <p style={pStyle}>
              If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, this policy also describes our compliance with the General Data Protection Regulation (GDPR) and equivalent national laws. Although Beacon Momentum is a United States company that does not actively market to persons outside the United States, we recognize that our website is accessible globally and we extend GDPR-equivalent rights to all users regardless of location.
            </p>

            <h2 style={h2Style}>1. Who We Are</h2>
            <p style={pStyle}>
              Beacon Momentum LLC is the data controller for personal information collected through this website. Beacon Momentum LLC is a limited liability company organized under the laws of the State of Wyoming, with its registered office at 1309 Coffeen Avenue, Suite 19387, Sheridan, Wyoming 82801, United States. Our mailing address is PO Box 244, Cheshire, Massachusetts 01225. You may contact us regarding data privacy matters at <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a> or by calling (888) 437-7657.
            </p>

            <h2 style={h2Style}>2. Information We Collect</h2>

            <h3 style={h3Style}>Information You Provide Directly</h3>
            <p style={pStyle}>
              We collect information you voluntarily provide when you interact with Beacon, including: your name and email address when you subscribe to the Beacon Brief newsletter; your email address and assessment responses when you complete the Pathfinder Assessment; your name, email address, and payment information when you purchase a Beacon program or membership; and any information you include when you contact us directly.
            </p>

            <h3 style={h3Style}>Information Collected Automatically</h3>
            <p style={pStyle}>
              When you visit our website, we automatically collect certain technical information, including your IP address (anonymized where possible), browser type and version, operating system, referring URL, pages visited, and time spent on pages. This information is collected through analytics tools and is used in aggregate form to understand how our content is used. We do not use this data to build individual profiles for advertising purposes.
            </p>

            <h3 style={h3Style}>Cookies and Similar Technologies</h3>
            <p style={pStyle}>
              We use a limited number of cookies to operate and improve our website. These are described in detail in our <Link href="/cookies" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Cookie Policy</Link>. We do not use advertising cookies or cross-site tracking technologies.
            </p>

            <h2 style={h2Style}>3. Lawful Basis for Processing (GDPR)</h2>
            <p style={pStyle}>
              For users in the EEA, UK, or Switzerland, we process your personal data only where we have a lawful basis to do so under GDPR Article 6. The following table describes the basis for each category of processing:
            </p>

            <div style={{ overflowX: "auto", marginBottom: "1.75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--beacon-parchment-dark)" }}>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem 0.75rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Processing Activity</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Lawful Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sending the Beacon Brief newsletter", "Consent (Art. 6(1)(a)) — you opt in explicitly"],
                    ["Delivering a program or membership you purchased", "Contract performance (Art. 6(1)(b))"],
                    ["Processing payment for a purchase", "Contract performance (Art. 6(1)(b))"],
                    ["Responding to your direct inquiries", "Legitimate interests (Art. 6(1)(f)) — responding to communications you initiated"],
                    ["Website analytics (anonymized/aggregated)", "Legitimate interests (Art. 6(1)(f)) — understanding how our content is used"],
                    ["Complying with legal obligations (e.g., tax records)", "Legal obligation (Art. 6(1)(c))"],
                  ].map(([activity, basis], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
                      <td style={{ padding: "0.75rem 1rem 0.75rem 0", verticalAlign: "top" }}>{activity}</td>
                      <td style={{ padding: "0.75rem 1rem", verticalAlign: "top" }}>{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={h2Style}>4. How We Use Your Information</h2>
            <p style={pStyle}>
              We use the information we collect to deliver and improve our services, including: sending the Beacon Brief and program communications you have subscribed to; routing you to the appropriate Beacon pillar based on your Pathfinder Assessment results; processing payments and fulfilling program enrollments; responding to your questions and support requests; understanding aggregate usage patterns to improve our content; and complying with applicable laws and regulations.
            </p>
            <p style={pStyle}>
              We do not sell your personal information to third parties. We do not use your data to serve you advertisements on other platforms. We do not engage in automated decision-making that produces legal or similarly significant effects without human review.
            </p>

            <h2 style={h2Style}>5. Third-Party Processors</h2>
            <p style={pStyle}>
              We share your data only with service providers who process it on our behalf and are bound by data processing agreements. Our primary processors are:
            </p>
            <div style={{ overflowX: "auto", marginBottom: "1.75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--beacon-parchment-dark)" }}>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem 0.75rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Processor</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Purpose</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["GoHighLevel (GHL)", "CRM, email marketing, assessment routing", "Name, email, assessment responses"],
                    ["Stripe", "Payment processing", "Name, email, payment card data (PCI-compliant)"],
                    ["Cloudflare", "Website hosting and CDN", "IP address, technical request data"],
                    ["Analytics provider", "Anonymized website analytics", "Anonymized/aggregated usage data only"],
                  ].map(([processor, purpose, data], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
                      <td style={{ padding: "0.75rem 1rem 0.75rem 0", verticalAlign: "top", fontWeight: 500 }}>{processor}</td>
                      <td style={{ padding: "0.75rem 1rem", verticalAlign: "top" }}>{purpose}</td>
                      <td style={{ padding: "0.75rem 1rem", verticalAlign: "top" }}>{data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={pStyle}>
              Each processor is contractually required to process your data only as instructed by Beacon Momentum and to maintain appropriate security measures. We do not authorize any processor to use your data for their own marketing purposes.
            </p>

            <h2 style={h2Style}>6. International Data Transfers</h2>
            <p style={pStyle}>
              Beacon Momentum is based in the United States. If you are located in the EEA, UK, or Switzerland, your personal data will be transferred to and processed in the United States, which may not provide the same level of data protection as your home jurisdiction. Where such transfers occur, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission, or equivalent transfer mechanisms, to ensure adequate protection of your data. You may request a copy of the applicable transfer mechanism by contacting us at <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a>.
            </p>

            <h2 style={h2Style}>7. Data Retention</h2>
            <p style={pStyle}>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Our retention schedule is as follows:
            </p>
            <div style={{ overflowX: "auto", marginBottom: "1.75rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--beacon-parchment-dark)" }}>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem 0.75rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Data Category</th>
                    <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, color: "var(--beacon-charcoal)", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Newsletter subscriber data", "Until you unsubscribe, then deleted within 30 days"],
                    ["Pathfinder Assessment responses", "24 months from submission, or until deletion is requested"],
                    ["Program enrollment and purchase records", "7 years (US tax and financial record requirements)"],
                    ["Customer support communications", "3 years from last interaction"],
                    ["Anonymized analytics data", "26 months (rolling)"],
                  ].map(([category, period], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
                      <td style={{ padding: "0.75rem 1rem 0.75rem 0", verticalAlign: "top" }}>{category}</td>
                      <td style={{ padding: "0.75rem 1rem", verticalAlign: "top" }}>{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={h2Style}>8. Your Rights</h2>
            <p style={pStyle}>
              Regardless of your location, you have the following rights with respect to your personal data. Users in the EEA, UK, and Switzerland have these rights under GDPR; US users have equivalent rights under applicable state laws where applicable (including the California Consumer Privacy Act for California residents).
            </p>
            <p style={pStyle}>
              <strong>Right of access.</strong> You may request a copy of the personal data we hold about you, along with information about how it is processed.
            </p>
            <p style={pStyle}>
              <strong>Right to rectification.</strong> You may request correction of inaccurate or incomplete personal data we hold about you.
            </p>
            <p style={pStyle}>
              <strong>Right to erasure ("right to be forgotten").</strong> You may request deletion of your personal data where we no longer have a lawful basis to retain it. Note that we may be required to retain certain data for legal or contractual reasons.
            </p>
            <p style={pStyle}>
              <strong>Right to restriction of processing.</strong> You may request that we limit how we use your data in certain circumstances, such as while a dispute about accuracy is being resolved.
            </p>
            <p style={pStyle}>
              <strong>Right to data portability.</strong> Where processing is based on consent or contract and carried out by automated means, you may request a copy of your data in a structured, machine-readable format.
            </p>
            <p style={pStyle}>
              <strong>Right to object.</strong> You may object to processing based on legitimate interests at any time. You may also object to receiving direct marketing communications at any time by using the unsubscribe link in any Beacon email.
            </p>
            <p style={pStyle}>
              <strong>Right to withdraw consent.</strong> Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of processing prior to withdrawal.
            </p>
            <p style={pStyle}>
              <strong>Right not to be subject to automated decisions.</strong> You have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. Beacon does not engage in such automated decision-making.
            </p>
            <p style={pStyle}>
              To exercise any of these rights, contact us at <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a>. We will respond within 30 days. EEA/UK users also have the right to lodge a complaint with their local supervisory authority if they believe their rights have been violated.
            </p>

            <h2 style={h2Style}>9. Security</h2>
            <p style={pStyle}>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include encrypted data transmission (TLS), access controls, and regular security reviews. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 style={h2Style}>10. Children's Privacy</h2>
            <p style={pStyle}>
              Beacon Momentum's services are not directed to individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected data from a minor, please contact us immediately and we will delete it promptly.
            </p>

            <h2 style={h2Style}>11. California Privacy Rights (CCPA)</h2>
            <p style={pStyle}>
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, the right to opt out of the sale of personal information (Beacon does not sell personal information), and the right to non-discrimination for exercising CCPA rights. To exercise your California privacy rights, contact us at <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a>.
            </p>

            <h2 style={h2Style}>12. Changes to This Policy</h2>
            <p style={pStyle}>
              We may update this Privacy Policy as our services evolve or as required by law. Material changes will be communicated via the Beacon Brief and by updating the "Last updated" date at the top of this page. Your continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>

            <h2 style={h2Style}>13. Contact Us</h2>
            <p style={pStyle}>
              For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
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
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.3)", letterSpacing: "0.04em" }}>© {new Date().getFullYear()} Beacon Momentum. All rights reserved.</p>
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
