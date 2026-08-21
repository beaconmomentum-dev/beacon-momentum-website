import { useState } from "react";
import { ArrowRight, CheckCircle2, CheckCircle, FileText, Landmark, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { COMMUNITY_BUILD_RELEASE } from "@/data/communityBuildRelease";
import { trpc } from "@/lib/trpc";

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
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", city: "", state: "" });

  const enterMutation = trpc.communityBuildEntry.enter.useMutation({
    onSuccess: () => setFormState("success"),
    onError: (error) => {
      setFormState("idle");
      alert(error.message || "Something went wrong. Please try again or email support@beaconmomentum.com.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    enterMutation.mutate(formData);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "960px" }}>
            <p style={eyebrowStyle}>Community Build Award · entries open</p>
            <h1 style={heroTitleStyle}>Chance first.<br />Purpose after selection.</h1>
            <p style={heroLeadStyle}>
              Beacon Momentum is announcing a fair, purpose-based framework for a {COMMUNITY_BUILD_RELEASE.awardValue} Community Build Award.
            </p>
            <div style={{ ...noticeStyle, borderColor: "rgba(74,222,128,0.5)" }} role="status">
              <CheckCircle size={18} color="#4ade80" aria-hidden="true" />
              <span><strong>Entries are now open.</strong> One recipient will be drawn at random on {COMMUNITY_BUILD_RELEASE.drawingDate}. Annual cycle. No purchase necessary. Submit the free entry form below.</span>
            </div>
            <p style={{ ...heroLeadStyle, marginTop: "1.5rem", fontSize: "0.95rem" }}>
              {COMMUNITY_BUILD_RELEASE.missionContext}
            </p>
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

        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 6rem) 0" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <p style={{ ...eyebrowStyle, textAlign: "center" }}>Free entry</p>
            <h2 style={{ ...sectionTitleStyle, color: "#FAF8F4", textAlign: "center", marginBottom: "0.5rem" }}>Enter the $4,970 Community Build Award</h2>
            <p style={{ textAlign: "center", color: "rgba(250,248,244,0.7)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              One entry per person. Drawing on {COMMUNITY_BUILD_RELEASE.drawingDate}. No purchase necessary. No obligation of any kind.
            </p>
            {formState === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem", border: "1px solid rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.08)" }}>
                <CheckCircle size={32} color="#4ade80" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>You're entered.</h3>
                <p style={{ color: "rgba(250,248,244,0.7)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem" }}>One entry recorded. Drawing on {COMMUNITY_BUILD_RELEASE.drawingDate}. We'll contact the selected recipient by email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <label style={formLabelStyle}>Full name<input required style={formInputStyle} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></label>
                  <label style={formLabelStyle}>Email<input required type="email" style={formInputStyle} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></label>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <label style={formLabelStyle}>City<input required style={formInputStyle} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} /></label>
                  <label style={formLabelStyle}>State<input required style={formInputStyle} value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} /></label>
                </div>
                <button type="submit" disabled={formState === "submitting"} style={{ marginTop: "0.5rem", padding: "0.9rem 2rem", background: "var(--beacon-amber-light, #e9bc52)", color: "#0d1b2a", border: "none", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                  {formState === "submitting" ? "Submitting..." : "Enter the drawing — free"}
                </button>
                <p style={{ color: "rgba(250,248,244,0.5)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", lineHeight: 1.6, marginTop: "0.5rem" }}>
                  By entering, you confirm you are 18+ and a US resident. One entry per person per annual cycle. {COMMUNITY_BUILD_RELEASE.universalDisclosure}
                </p>
              </form>
            )}
          </div>
        </section>

        <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", background: "var(--beacon-parchment)" }}>
          <div className="container" style={{ maxWidth: "860px", textAlign: "center" }}>
            <p style={sectionLabelStyle}>Two programs. Two purposes.</p>
            <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>Completely separate.</h2>
            <p style={{ ...bodyStyle, maxWidth: "720px", margin: "1.5rem auto 0", textAlign: "center" }}>{COMMUNITY_BUILD_RELEASE.separatePrograms}</p>
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
const formLabelStyle = { display: "flex", flexDirection: "column" as const, gap: "0.4rem", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" as const, color: "rgba(250,248,244,0.7)" };
const formInputStyle = { padding: "0.7rem 0.8rem", background: "rgba(250,248,244,0.08)", border: "1px solid rgba(250,248,244,0.2)", color: "#FAF8F4", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem" };
