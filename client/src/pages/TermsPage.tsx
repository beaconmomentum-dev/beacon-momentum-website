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

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)", marginBottom: "3rem", letterSpacing: "0.04em" }}>
            Last updated: June 13, 2026 &nbsp;·&nbsp; Effective: June 13, 2026
          </p>

          <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.85, color: "var(--beacon-charcoal-mid)" }}>

            <p style={pStyle}>
              These Terms of Use ("Terms") govern your access to and use of the Beacon Momentum website located at beaconmomentum.com and all associated Beacon properties, platforms, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, you must not use the Services.
            </p>
            <p style={pStyle}>
              These Terms constitute a legally binding agreement between you and Beacon Momentum LLC, a limited liability company organized under the laws of the State of Wyoming ("Beacon Momentum," "we," "us," or "our").
            </p>

            <h2 style={h2Style}>1. Eligibility</h2>
            <p style={pStyle}>
              You must be at least 18 years of age to use the Services. By using the Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement. If you are accessing the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
            </p>

            <h2 style={h2Style}>2. Educational Purpose and Disclaimer</h2>
            <p style={pStyle}>
              Beacon Momentum provides educational content, tools, assessments, and programs designed to support personal and professional development in the context of technological change. All content on the Services — including articles, assessments, course materials, coaching frameworks, and community resources — is provided for educational and informational purposes only.
            </p>
            <p style={pStyle}>
              <strong>Nothing on the Services constitutes financial, investment, legal, medical, psychological, or professional advice of any kind.</strong> Results described in Beacon content reflect individual experiences and are not guarantees of outcomes. Your results will depend on your individual circumstances, effort, and application of the material.
            </p>
            <p style={pStyle}>
              Beacon Trading (beacontrading.ai) is an educational simulation platform. All trading activity on that platform is simulated and does not involve real financial transactions, real currency, or real securities. Beacon Trading content does not constitute investment advice or a recommendation to buy, sell, or hold any financial instrument.
            </p>
            <p style={pStyle}>
              Any use of artificial intelligence tools within the Beacon ecosystem is provided as an educational aid. AI-generated content may contain errors and should not be relied upon as a substitute for professional judgment.
            </p>

            <h2 style={h2Style}>3. Intellectual Property</h2>
            <h3 style={h3Style}>Beacon Content</h3>
            <p style={pStyle}>
              All content on the Services — including text, images, assessments, course materials, frameworks, logos, trademarks, and software — is the exclusive property of Beacon Momentum LLC or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws. All rights are reserved.
            </p>
            <h3 style={h3Style}>Permitted Use</h3>
            <p style={pStyle}>
              You may access and use the Services for your own personal, non-commercial purposes. You may share links to Beacon content and reference Beacon concepts with appropriate attribution. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any Beacon content without prior written permission from Beacon Momentum LLC.
            </p>
            <h3 style={h3Style}>Your Content</h3>
            <p style={pStyle}>
              If you submit content to Beacon through assessments, community platforms, or other interactive features, you grant Beacon Momentum a non-exclusive, royalty-free license to use, reproduce, and display that content in connection with operating and improving the Services. You retain ownership of your content and may request its deletion at any time.
            </p>

            <h2 style={h2Style}>4. Acceptable Use</h2>
            <p style={pStyle}>
              You agree not to use the Services to: violate any applicable law or regulation; infringe the intellectual property rights of Beacon Momentum or any third party; transmit any content that is unlawful, harassing, defamatory, obscene, or otherwise objectionable; attempt to gain unauthorized access to any part of the Services or any connected systems; use automated tools to scrape, crawl, or extract data from the Services without written permission; impersonate any person or entity; or interfere with the security or integrity of the Services.
            </p>
            <p style={pStyle}>
              Beacon Momentum reserves the right to suspend or terminate access to the Services for any user who violates these Terms or engages in conduct that we determine, in our sole discretion, to be harmful to other users, to Beacon Momentum, or to the integrity of the Services.
            </p>

            <h2 style={h2Style}>5. Purchases and Payments</h2>
            <p style={pStyle}>
              Certain Beacon programs, memberships, and resources are available for purchase. All prices are stated in United States dollars. Payment is processed through Stripe, a PCI-compliant payment processor. Beacon Momentum does not store your payment card information.
            </p>
            <p style={pStyle}>
              All sales are final unless otherwise stated at the time of purchase. If a specific refund policy applies to a program, it will be disclosed on the program's purchase page. Chargebacks initiated without first contacting Beacon Momentum may result in suspension of access to the Services.
            </p>

            <h2 style={h2Style}>6. Third-Party Links and Services</h2>
            <p style={pStyle}>
              The Services may contain links to third-party websites, tools, and resources. These links are provided for convenience and do not constitute an endorsement of the linked content or services. Beacon Momentum has no control over and assumes no responsibility for the content, privacy practices, or terms of any third-party site. You access third-party sites at your own risk.
            </p>

            <h2 style={h2Style}>7. Disclaimer of Warranties</h2>
            <p style={pStyle}>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. BEACON MOMENTUM DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK.
            </p>

            <h2 style={h2Style}>8. Limitation of Liability</h2>
            <p style={pStyle}>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, BEACON MOMENTUM LLC AND ITS MEMBERS, MANAGERS, EMPLOYEES, CONTRACTORS, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF BEACON MOMENTUM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p style={pStyle}>
              IN NO EVENT SHALL BEACON MOMENTUM'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO BEACON MOMENTUM IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
            </p>
            <p style={pStyle}>
              Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such jurisdictions, the above limitations apply to the fullest extent permitted by law.
            </p>

            <h2 style={h2Style}>9. Indemnification</h2>
            <p style={pStyle}>
              You agree to indemnify, defend, and hold harmless Beacon Momentum LLC and its members, managers, employees, contractors, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Services, your violation of these Terms, or your violation of any third-party rights.
            </p>

            <h2 style={h2Style}>10. Privacy</h2>
            <p style={pStyle}>
              Your use of the Services is also governed by our <Link href="/privacy" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Services, you consent to the data practices described in the Privacy Policy.
            </p>

            <h2 style={h2Style}>11. Governing Law and Dispute Resolution</h2>
            <p style={pStyle}>
              These Terms are governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or the Services shall be resolved exclusively in the state or federal courts located in Sheridan County, Wyoming, and you consent to the personal jurisdiction of those courts.
            </p>
            <p style={pStyle}>
              Notwithstanding the foregoing, Beacon Momentum reserves the right to seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of its intellectual property rights.
            </p>

            <h2 style={h2Style}>12. California Consumer Privacy Act (CCPA)</h2>
            <p style={pStyle}>
              California residents have specific rights under the CCPA, including the right to know what personal information is collected, the right to request deletion of personal information, and the right to opt out of the sale of personal information. Beacon Momentum does not sell personal information. To exercise your California privacy rights, contact us at <a href="mailto:info@beaconmomentum.com" style={{ color: "var(--beacon-teal)", textDecoration: "none" }}>info@beaconmomentum.com</a>.
            </p>

            <h2 style={h2Style}>13. Non-Discrimination and Equal Access</h2>
            <p style={pStyle}>
              Beacon Momentum LLC is committed to providing equal access to its Services regardless of race, color, national origin, sex, age, disability, religion, sexual orientation, gender identity, or any other characteristic protected by applicable law. We do not discriminate in the provision of our Services, and we do not tolerate harassment or discriminatory conduct within any Beacon community or platform. Any user who engages in discriminatory or harassing conduct may have their access to the Services suspended or terminated.
            </p>

            <h2 style={h2Style}>14. Modifications to These Terms</h2>
            <p style={pStyle}>
              Beacon Momentum reserves the right to modify these Terms at any time. We will notify you of material changes by updating the "Last updated" date at the top of this page and, where appropriate, by sending a notice to subscribers of the Beacon Brief. Your continued use of the Services after any modification constitutes your acceptance of the updated Terms. If you do not agree to the modified Terms, you must stop using the Services.
            </p>

            <h2 style={h2Style}>15. Severability and Entire Agreement</h2>
            <p style={pStyle}>
              If any provision of these Terms is found to be unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect. These Terms, together with the Privacy Policy and Cookie Policy, constitute the entire agreement between you and Beacon Momentum LLC with respect to the Services and supersede all prior agreements and understandings.
            </p>

            <h2 style={h2Style}>16. Contact</h2>
            <p style={pStyle}>
              Questions about these Terms should be directed to:
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
