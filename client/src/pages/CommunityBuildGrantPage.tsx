import { ArrowRight, CheckCircle2, CircleAlert, FileText, Landmark, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { COMMUNITY_BUILD_RELEASE } from "@/data/communityBuildRelease";

const facts = [
  ["The chance", "One recipient will be selected at random from eligible free entries under the final Official Rules."],
  ["What never changes the chance", "A purchase, voluntary support payment, membership, referral, social action, project idea, build plan, or orientation choice."],
  ["What follows selection", "After verification, the selected recipient accepts a permitted education/build package administered through approved vendor payments and documented reimbursement."],
] as const;

const canSupport = [
  "Education and training",
  "Credentials and certifications",
  "Relevant software and tools",
  "Equipment and project materials",
  "Defined community-building costs",
] as const;

export default function CommunityBuildGrantPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "960px" }}>
            <p style={eyebrowStyle}>Community Build Grant · framework announcement</p>
            <h1 style={heroTitleStyle}>Chance first.<br />Purpose after selection.</h1>
            <p style={heroLeadStyle}>
              Beacon Momentum is announcing a fair, purpose-based framework for a {COMMUNITY_BUILD_RELEASE.awardValue} Community Build Award.
            </p>
            <div style={noticeStyle} role="status">
              <CircleAlert size={18} aria-hidden="true" />
              <span><strong>Entries are not open.</strong> Final Official Rules, eligibility, entry methods, the alternative free method, and the official program page will be published before entry begins.</span>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "1080px" }}>
            <div className="community-build-intro" style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "clamp(2rem, 8vw, 7rem)" }}>
              <div>
                <p style={sectionLabelStyle}>The public commitment</p>
                <h2 style={sectionTitleStyle}>A clear line between chance and purpose.</h2>
              </div>
              <div>
                <p style={bodyStyle}>{COMMUNITY_BUILD_RELEASE.universalDisclosure}</p>
                <p style={{ ...bodyStyle, marginTop: "1.15rem" }}>{COMMUNITY_BUILD_RELEASE.purposeSequence}</p>
              </div>
            </div>

            <div className="community-build-facts" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "var(--beacon-parchment-dark)", border: "1px solid var(--beacon-parchment-dark)", marginTop: "clamp(3rem, 6vw, 5rem)" }}>
              {facts.map(([title, copy], index) => (
                <article key={title} style={{ background: "var(--beacon-parchment)", padding: "2rem" }}>
                  <p style={{ ...sectionLabelStyle, color: index === 1 ? "var(--beacon-teal)" : "#A66B30" }}>{String(index + 1).padStart(2, "0")}</p>
                  <h3 style={{ margin: "0.85rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.7rem", lineHeight: 1.03 }}>{title}</h3>
                  <p style={{ ...bodyStyle, fontSize: "0.93rem", marginTop: "1rem" }}>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container community-build-purpose" style={{ maxWidth: "1080px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.85fr)", gap: "clamp(2rem, 7vw, 6rem)", alignItems: "start" }}>
            <div>
              <p style={{ ...sectionLabelStyle, color: "var(--beacon-amber-light)" }}>The purpose-based package</p>
              <h2 style={{ ...sectionTitleStyle, color: "#FAF8F4" }}>A real next step, not a cash headline.</h2>
              <p style={{ ...bodyStyle, color: "rgba(250,248,244,0.76)", marginTop: "1.5rem" }}>
                The award is designed to support a defined act of learning, building, or community contribution after the drawing—not to test who has the best pitch, the biggest audience, or the strongest connection to Beacon.
              </p>
              <p style={{ ...bodyStyle, color: "rgba(250,248,244,0.76)", marginTop: "1rem" }}>
                It does not fund unrestricted cash, cash equivalents, personal debt, ordinary household expenses, investments or speculation, political activity, gambling, unlawful activity, or unrelated personal consumption.
              </p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(250,248,244,0.18)" }}>
              {canSupport.map((item) => (
                <li key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid rgba(250,248,244,0.18)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.92rem", letterSpacing: "0.02em" }}>
                  <CheckCircle2 size={17} color="var(--beacon-amber-light)" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container community-build-boundaries" style={{ maxWidth: "1080px", display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: "clamp(2rem, 8vw, 7rem)", alignItems: "start" }}>
            <div>
              <p style={sectionLabelStyle}>Separate by design</p>
              <h2 style={sectionTitleStyle}>Awareness should not become pressure.</h2>
            </div>
            <div>
              <p style={bodyStyle}>{COMMUNITY_BUILD_RELEASE.futureSupportBoundary}</p>
              <p style={{ ...bodyStyle, marginTop: "1rem" }}>{COMMUNITY_BUILD_RELEASE.orientationBoundary}</p>
              <p style={{ ...bodyStyle, marginTop: "1rem" }}>The selected recipient is not required to join Beacon, buy an offer, promote Beacon, give a testimonial, share personal history, or grant publicity rights.</p>
            </div>
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--beacon-parchment-dark)", padding: "clamp(3.5rem, 7vw, 5.5rem) 0" }}>
          <div className="container community-build-actions" style={{ maxWidth: "1080px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1px", background: "var(--beacon-parchment-dark)", border: "1px solid var(--beacon-parchment-dark)" }}>
            <Link href="/community-build-grant/social" style={{ background: "var(--beacon-parchment)", padding: "2rem", textDecoration: "none", color: "var(--beacon-charcoal)" }}>
              <Landmark size={22} color="var(--beacon-teal)" aria-hidden="true" />
              <h2 style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", lineHeight: 1.03 }}>Read the public release kit</h2>
              <p style={{ ...bodyStyle, fontSize: "0.92rem", marginTop: "0.85rem" }}>View the framework announcement and approved public social copy.</p>
              <span style={inlineLinkStyle}>Open social release hub <ArrowRight size={15} /></span>
            </Link>
            <a href="mailto:support@beaconmomentum.com?subject=Community%20Build%20Award%20media%20inquiry" style={{ background: "var(--beacon-charcoal)", padding: "2rem", textDecoration: "none", color: "#FAF8F4" }}>
              <FileText size={22} color="var(--beacon-amber-light)" aria-hidden="true" />
              <h2 style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", lineHeight: 1.03 }}>Media and program inquiries</h2>
              <p style={{ ...bodyStyle, color: "rgba(250,248,244,0.72)", fontSize: "0.92rem", marginTop: "0.85rem" }}>For framework information or media use, contact Beacon Momentum Communications.</p>
              <span style={{ ...inlineLinkStyle, color: "var(--beacon-amber-light)" }}>Contact Beacon <ArrowRight size={15} /></span>
            </a>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 760px) {.community-build-intro,.community-build-purpose,.community-build-boundaries,.community-build-facts,.community-build-actions{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

const eyebrowStyle = { color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase" as const, margin: 0 };
const heroTitleStyle = { margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.3rem, 7vw, 6.4rem)", fontWeight: 600, lineHeight: 0.92, letterSpacing: "-0.05em" };
const heroLeadStyle = { maxWidth: "720px", margin: "1.7rem 0 0", color: "rgba(250,248,244,0.76)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.08rem", lineHeight: 1.8 };
const noticeStyle = { display: "flex", gap: "0.75rem", alignItems: "flex-start", maxWidth: "760px", marginTop: "2rem", padding: "1rem 1.1rem", border: "1px solid rgba(225,176,106,0.38)", color: "rgba(250,248,244,0.9)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.86rem", lineHeight: 1.6 };
const sectionLabelStyle = { color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, margin: 0 };
const sectionTitleStyle = { margin: "0.8rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.4rem, 4vw, 4rem)", lineHeight: 0.99, letterSpacing: "-0.03em" };
const bodyStyle = { margin: 0, color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.85 };
const inlineLinkStyle = { display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "1.25rem", color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const };
