import { ArrowLeft, Copy, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { COMMUNITY_BUILD_RELEASE } from "@/data/communityBuildRelease";

export default function CommunityBuildSocialPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "920px" }}>
            <p style={eyebrowStyle}>Community Build Grant · public release kit</p>
            <h1 style={heroTitleStyle}>The framework, in public.</h1>
            <p style={heroLeadStyle}>This is Beacon’s approved framework announcement and platform-native public copy. It documents the program structure; it does not open entries.</p>
          </div>
        </section>

        <section style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", padding: "1.1rem", border: "1px solid #C9B89B", background: "#F7F1E7", color: "var(--beacon-charcoal)" }}>
              <ShieldCheck size={20} color="var(--beacon-teal)" aria-hidden="true" />
              <p style={{ margin: 0, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.9rem", lineHeight: 1.65 }}><strong>Framework announcement only.</strong> {COMMUNITY_BUILD_RELEASE.frameworkStatus} The entry-opening release will be published only with the final Official Rules and official program page.</p>
            </div>

            <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
              <p style={sectionLabelStyle}>The non-negotiable public boundary</p>
              <blockquote style={{ margin: "1rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.1rem, 4.5vw, 4rem)", lineHeight: 1.04, letterSpacing: "-0.03em" }}>{COMMUNITY_BUILD_RELEASE.universalDisclosure}</blockquote>
            </div>

            <div style={{ display: "grid", gap: "1.25rem", marginTop: "clamp(3rem, 6vw, 5rem)" }}>
              {COMMUNITY_BUILD_RELEASE.socialPosts.map((post, index) => (
                <article key={post.platform} style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)", border: "1px solid var(--beacon-parchment-dark)", background: index % 2 === 0 ? "#FCFAF5" : "var(--beacon-parchment)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <p style={sectionLabelStyle}>{post.platform} · {post.label}</p>
                    <Copy size={17} color="var(--beacon-teal)" aria-hidden="true" />
                  </div>
                  <p style={{ margin: "1rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{post.copy}</p>
                </article>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--beacon-parchment-dark)", marginTop: "clamp(3rem, 6vw, 5rem)", paddingTop: "2rem" }}>
              <Link href="/community-build-grant" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}><ArrowLeft size={15} /> Read the framework announcement</Link>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </div>
  );
}

const eyebrowStyle = { color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase" as const, margin: 0 };
const heroTitleStyle = { margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.1rem, 7vw, 6rem)", fontWeight: 600, lineHeight: 0.94, letterSpacing: "-0.045em" };
const heroLeadStyle = { maxWidth: "720px", margin: "1.7rem 0 0", color: "rgba(250,248,244,0.76)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.08rem", lineHeight: 1.8 };
const sectionLabelStyle = { color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, margin: 0 };
