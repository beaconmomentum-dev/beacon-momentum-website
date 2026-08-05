import { ArrowRight, Database, FileText, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const principles = [
  [FileText, "Keep the evidence close", "Source material, working notes, and final claims should be traceable."],
  [Database, "Build memory, not just output", "Useful work is retained so the next project can reuse and inspect it."],
  [ShieldCheck, "Keep people at approval", "A person owns the public claim, customer promise, and final release."],
] as const;

export default function HowBeaconWorksPage() {
  return <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
    <SharedNav />
    <main id="main-content">
      <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}><div className="container" style={{ maxWidth: "920px" }}>
        <p style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase", margin: 0 }}>Field brief · operating method</p>
        <h1 style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.1rem, 7vw, 6.1rem)", fontWeight: 600, lineHeight: 0.94, letterSpacing: "-0.045em" }}>How Beacon works when the tools change.</h1>
        <p style={{ maxWidth: "720px", margin: "1.7rem 0 0", color: "rgba(250,248,244,0.76)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.08rem", lineHeight: 1.8 }}>Beacon uses technology to make careful human work more durable—not to remove human responsibility.</p>
      </div></section>
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}><div className="container" style={{ maxWidth: "1040px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: "clamp(2rem, 8vw, 7rem)" }} className="brief-split"><div><p style={{ color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>A practical explanation</p><h2 style={{ margin: "0.8rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 1.02 }}>Capability is more than access to a model.</h2></div><p style={{ margin: 0, color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.85 }}>Beacon keeps durable operating memory, source records, working routines, and review responsibility close to equipment and systems it controls where appropriate. External services are used selectively when they add a needed capability, current information, distribution, or resilience. That does not mean refusing the cloud. It means not surrendering every workflow, source, or decision to a remote platform.</p></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "var(--beacon-parchment-dark)", border: "1px solid var(--beacon-parchment-dark)", marginTop: "clamp(3rem, 6vw, 5rem)" }} className="brief-grid">{principles.map(([Icon, title, body]) => <article key={title} style={{ background: "var(--beacon-parchment)", padding: "2rem" }}><Icon size={20} style={{ color: "var(--beacon-teal)" }} /><h3 style={{ margin: "1rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem" }}>{title}</h3><p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.7 }}>{body}</p></article>)}</div>
      </div></section>
      <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 7rem) 0" }}><div className="container" style={{ maxWidth: "850px", textAlign: "center" }}><p style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>What experience has taught us</p><blockquote style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.3rem, 4.6vw, 4.2rem)", lineHeight: 1.02 }}>“We do not use AI to avoid responsibility. We use it to make careful human work more durable.”</blockquote><p style={{ color: "rgba(250,248,244,0.7)", fontFamily: "'Lora', Georgia, serif", lineHeight: 1.8 }}>Beacon’s operating habits were built through revision: testing ideas, finding weak handoffs, correcting claims, retaining what worked, and creating systems that can survive beyond one tool or campaign.</p><Link href="/foundation" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>Read the Foundation Year note <ArrowRight size={15} /></Link></div></section>
    </main><SharedFooter /><style>{`@media (max-width: 760px) {.brief-split,.brief-grid{grid-template-columns:1fr!important;}}`}</style>
  </div>;
}
