import { ArrowRight, Download, Landmark, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const finalLetterPath = "/documents/beacon-founder-letter-final.pdf";

const nextPaths = [
  {
    eyebrow: "For individual practice",
    title: "The Watch",
    copy: "A structured Beacon Community path for deeper practice, shared rhythm, and the complete learning system.",
    href: "/the-watch",
    action: "Explore The Watch",
    internal: true,
    icon: UsersRound,
  },
  {
    eyebrow: "For organizations",
    title: "Beacon Labs",
    copy: "Beacon Momentum’s B2B services and organizational-outreach arm, with public package anchors and a qualified project path.",
    href: "https://beaconlabs.ai/pricing",
    action: "View B2B packages",
    internal: false,
    icon: Landmark,
  },
  {
    eyebrow: "For voluntary support",
    title: "Foundation Year",
    copy: "A clear, one-time voluntary support path for people who want to stand behind Beacon’s public work and longer horizon.",
    href: "/foundation/support",
    action: "Review voluntary support",
    internal: true,
    icon: ShieldCheck,
  },
];

export default function FounderNotePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav dark />
      <main id="main-content">
        <section style={{ background: "radial-gradient(circle at 82% 12%, rgba(207,162,86,0.20), transparent 28%), linear-gradient(135deg, #112B35 0%, var(--beacon-charcoal) 68%)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <p style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase", margin: 0 }}>Foundation Year · Founder’s Note</p>
            <h1 style={{ margin: "1rem 0 0", maxWidth: "820px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.1rem, 7vw, 6rem)", fontWeight: 600, lineHeight: 0.94, letterSpacing: "-0.045em" }}>The vision we kept, what we built, and what comes next.</h1>
            <p style={{ maxWidth: "730px", margin: "1.7rem 0 0", color: "rgba(250,248,244,0.78)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.08rem", lineHeight: 1.82 }}>A plain update on Beacon Momentum LLC’s first operating year in its current legal structure, the broader founder-funded build behind it, and the work we are continuing to ship with care.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "2rem" }}>
              <a href={finalLetterPath} download="Beacon-Founder-Letter-Final.pdf" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", background: "var(--beacon-amber)", color: "var(--beacon-charcoal)", padding: "0.9rem 1.15rem", textDecoration: "none", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.77rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}><Download size={15} /> Download the full letter</a>
              <Link href="/foundation" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", color: "#FAF8F4", border: "1px solid rgba(250,248,244,0.34)", padding: "0.9rem 1.15rem", textDecoration: "none", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.77rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Foundation Year <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(3.5rem, 7vw, 6rem) 0" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "var(--beacon-parchment-dark)", border: "1px solid var(--beacon-parchment-dark)" }} className="founder-note-facts">
              {[["$300,000+", "founder capital commitment documented in the final letter."], ["4,100+", "screen-and-keyboard hours devoted by the founder."], ["3 paths", "clear routes for B2C learning, B2B services, and voluntary support."]].map(([heading, copy]) => <div key={heading} style={{ background: "var(--beacon-parchment)", padding: "2rem" }}><p style={{ margin: 0, color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "clamp(1.55rem, 3vw, 2.25rem)", fontWeight: 700 }}>{heading}</p><p style={{ margin: "0.75rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.7 }}>{copy}</p></div>)}
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 clamp(4rem, 8vw, 7rem)" }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <p style={{ margin: 0, color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>A steadier operating foundation</p>
            <h2 style={{ margin: "0.85rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4.2rem)", lineHeight: 1.01 }}>The work is no longer a chase after every new tool.</h2>
            <p style={{ margin: "1.4rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", lineHeight: 1.9 }}>Beacon’s first LLC operating year was a period of testing, correction, and costly learning. The full letter records what it took to build the local research, archive, production, and operating foundation now beneath the public work. The lesson was not to stop adapting; it was to adapt with discipline, keep human judgment in the room, and turn useful learning into delivery people can trust.</p>
            <p style={{ margin: "1.2rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.02rem", lineHeight: 1.9 }}>The next chapter is sustained shipping: clear public work, a more structured community path, and defined organizational services. Cost recovery is an operating expectation based on visible offers and consistent delivery—not a promise of revenue, profitability, or return.</p>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "1040px" }}>
            <p style={{ margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Choose the next right door</p>
            <h2 style={{ margin: "0.85rem 0 2rem", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.45rem, 5vw, 4rem)", lineHeight: 1.02 }}>One system. Clear boundaries.</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1.2rem" }} className="founder-note-paths">
              {nextPaths.map(({ eyebrow, title, copy, href, action, internal, icon: Icon }) => <article key={title} style={{ border: "1px solid rgba(250,248,244,0.24)", padding: "1.6rem", background: "rgba(250,248,244,0.045)", display: "flex", flexDirection: "column" }}><Icon size={25} style={{ color: "var(--beacon-amber-light)" }} /><p style={{ margin: "1rem 0 0", color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>{eyebrow}</p><h3 style={{ margin: "0.55rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", lineHeight: 1 }}>{title}</h3><p style={{ color: "rgba(250,248,244,0.72)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.75, flex: 1 }}>{copy}</p>{internal ? <Link href={href} style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>{action} <ArrowRight size={14} style={{ verticalAlign: "-2px" }} /></Link> : <a href={href} style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>{action} <ArrowRight size={14} style={{ verticalAlign: "-2px" }} /></a>}</article>)}
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "790px", textAlign: "center" }}>
            <Download size={25} style={{ color: "var(--beacon-teal)" }} />
            <h2 style={{ margin: "0.85rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.35rem, 4.8vw, 3.9rem)", lineHeight: 1.02 }}>Read the complete operating letter.</h2>
            <p style={{ margin: "1.2rem auto 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.98rem", lineHeight: 1.82 }}>The complete letter carries the fuller accounting, the operating commitments, and the audience-specific closing. It is a personal operating update—not an offer to sell securities, a promise of return, or a request to make a financial decision from this document alone.</p>
            <a href={finalLetterPath} download="Beacon-Founder-Letter-Final.pdf" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", marginTop: "1.6rem", background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "0.9rem 1.15rem", textDecoration: "none", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}><Download size={15} /> Download final letter (PDF)</a>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width:760px){.founder-note-facts,.founder-note-paths{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
