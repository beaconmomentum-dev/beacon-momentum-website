import { ArrowRight, Download, FileCheck2, ShieldCheck, WalletCards } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { downloadText } from "@/lib/controlledWorkflowPilotLogic";

const sections = [
  { icon: FileCheck2, title: "01 · Agent Execution Contract", purpose: "Use before any AI-assisted workflow that can touch a repository, public content, CRM, file store, or external application.", fields: ["Workload and single objective", "Approved source set", "Allowed systems and paths", "Read/write authority", "Explicit non-goals", "Acceptance criteria", "Budget and time ceiling", "Named human approval gate", "Stop and rollback path", "Evidence to retain"] },
  { icon: ShieldCheck, title: "02 · Source Review & Authority Log", purpose: "Use when material could become a public claim, a member lesson, an internal operating rule, or a recommendation.", fields: ["Claim or decision", "Source URL or retained record", "Source type and evidence status", "What remains uncertain", "Eligible destination", "Editor/reviewer decision", "Publication or release boundary"] },
  { icon: WalletCards, title: "03 · Cost & Outcome Ledger", purpose: "Use for recurring workflows so Beacon learns from actual runs rather than general claims about AI ROI.", fields: ["Run date and workflow", "Model, tool, and service usage", "Direct cost", "Human review time", "Accepted, revised, or rejected output", "Quality or delivery indicator", "Decision: repeat, revise, expand, or stop"] },
] as const;

function blankKit() {
  return `# Controlled AI Workflow Kit\n\n## 01 · Agent Execution Contract\n- Workload and single objective:\n- Approved source set:\n- Allowed systems and paths:\n- Read/write authority:\n- Explicit non-goals:\n- Acceptance criteria:\n- Budget and time ceiling:\n- Named human approval gate:\n- Stop and rollback path:\n- Evidence to retain:\n\n## 02 · Source Review & Authority Log\n- Claim or decision:\n- Source URL or retained record:\n- Source type and evidence status:\n- What remains uncertain:\n- Eligible destination:\n- Editor/reviewer decision:\n- Publication or release boundary:\n\n## 03 · Cost & Outcome Ledger\n- Run date and workflow:\n- Model, tool, and service usage:\n- Direct cost:\n- Human review time:\n- Accepted, revised, or rejected output:\n- Quality or delivery indicator:\n- Decision: repeat, revise, expand, or stop:\n`;
}

export default function ControlledAIWorkflowKitPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "#0B2A3B", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <p style={{ margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>The Watch · member practice preview</p>
            <h1 style={{ maxWidth: "850px", margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.94, letterSpacing: "-0.045em" }}>The Controlled AI Workflow Kit.</h1>
            <p style={{ maxWidth: "730px", margin: "1.7rem 0 0", color: "rgba(250,248,244,0.76)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.06rem", lineHeight: 1.85 }}>A field-ready set of records for turning AI capability into work you can inspect, improve, and stand behind. The kit does not authorize automation; it makes authority explicit.</p>
            <button onClick={() => downloadText("beacon-controlled-ai-workflow-kit.md", blankKit(), "text/markdown")} style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", marginTop: "2rem", border: "1px solid var(--beacon-amber-light)", padding: "0.82rem 1.1rem", background: "var(--beacon-amber-light)", color: "#0B2A3B", cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}><Download size={15} /> Download blank kit</button>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <div style={{ maxWidth: "760px" }}><p style={{ margin: 0, color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>A practical operating rhythm</p><h2 style={{ margin: "0.8rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.7rem)", lineHeight: 1.02 }}>Use the kit before, during, and after the work.</h2><p style={{ margin: "1rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", lineHeight: 1.8 }}>The Watch member practice is built around durable habits, not a promise that one tool will solve every problem. These templates preserve the questions that make an AI workflow safer, more useful, and easier to explain.</p></div>
            <div style={{ display: "grid", gap: "1.25rem", marginTop: "3rem" }}>{sections.map(({ icon: Icon, title, purpose, fields }) => <article key={title} style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: "1.5rem", padding: "2rem", background: "#FAF8F4", border: "1px solid var(--beacon-parchment-dark)" }} className="kit-row"><div style={{ width: "2.7rem", height: "2.7rem", display: "grid", placeItems: "center", background: "var(--beacon-teal)", color: "#FAF8F4" }}><Icon size={18} /></div><div><h3 style={{ margin: 0, color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", lineHeight: 1.1 }}>{title}</h3><p style={{ margin: "0.65rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.94rem", lineHeight: 1.75 }}>{purpose}</p><ul style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0.45rem 1.25rem", padding: 0, margin: "1.25rem 0 0", listStyle: "none" }} className="kit-fields">{fields.map((field) => <li key={field} style={{ display: "flex", gap: "0.5rem", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.85rem", lineHeight: 1.55 }}><span aria-hidden="true" style={{ color: "var(--beacon-amber)", fontWeight: 700 }}>—</span>{field}</li>)}</ul></div></article>)}</div>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 6.5rem) 0" }}><div className="container kit-cta" style={{ maxWidth: "980px", display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(250px,0.8fr)", gap: "3rem", alignItems: "end" }}><div><p style={{ margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Apply the practice</p><h2 style={{ margin: "0.8rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.03 }}>Three controlled pilots make the method concrete.</h2><p style={{ margin: "1rem 0 0", color: "rgba(250,248,244,0.72)", fontFamily: "'Lora', Georgia, serif", lineHeight: 1.8 }}>The pilots are browser-local decision aids. They do not reach external systems, publish work, retain customer data, or change permissions. A human still decides what becomes real.</p></div><Link href="/the-watch/controlled-workflow-pilots" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem", border: "1px solid var(--beacon-amber-light)", padding: "0.9rem 1.1rem", color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>Open the pilots <ArrowRight size={15} /></Link></div></section>
      </main>
      <SharedFooter />
      <style>{`@media(max-width:760px){.kit-row,.kit-cta{grid-template-columns:1fr!important}.kit-fields{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
