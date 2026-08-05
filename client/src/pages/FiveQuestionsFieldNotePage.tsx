import { ArrowRight, CheckCircle2, Eye, LockKeyhole, UserRoundCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const questions = [
  ["What exact job is this workflow allowed to do?", "A useful AI workflow has a single stated job. ‘Improve our operations’ is not a job. ‘Compare these approved sources and flag claims that lack a citation’ is a job."],
  ["What systems, data, and credentials can it reach?", "Access should follow the job. Read-only access is different from write access; a narrow folder is different from an entire drive. Start with the smallest useful surface."],
  ["What is explicitly off limits?", "Say what the workflow must not change, send, delete, publish, purchase, approve, or infer. Clear non-goals protect the work as much as clear goals."],
  ["What record will show what happened and what it cost?", "Retain the approved source set, relevant prompts or task instructions, actions taken, test results, reviewer decision, and a simple cost record. If a workflow cannot be explained, it cannot be improved responsibly."],
  ["Which named human still owns the final decision?", "AI can prepare, compare, and recommend. A person remains responsible for public claims, customer messages, financial actions, access changes, and releases."],
] as const;

export default function FiveQuestionsFieldNotePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <p style={{ margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>Public field note · controlled capability</p>
            <h1 style={{ maxWidth: "880px", margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(3.1rem, 7vw, 6.1rem)", lineHeight: 0.94, letterSpacing: "-0.045em" }}>Five questions that keep you in charge.</h1>
            <p style={{ maxWidth: "720px", margin: "1.75rem 0 0", color: "rgba(250,248,244,0.76)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.08rem", lineHeight: 1.85 }}>The goal is not to make an AI workflow timid. It is to make its authority visible, limited, reviewable, and useful.</p>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.72fr) minmax(0, 1.28fr)", gap: "clamp(2rem, 8vw, 7rem)" }} className="five-note-intro">
              <div>
                <p style={{ margin: 0, color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>The operating question</p>
                <h2 style={{ margin: "0.8rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 1.02 }}>Can you explain the work after it runs?</h2>
              </div>
              <p style={{ margin: 0, color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.85 }}>More capable systems make vague operating habits more expensive. A strong prompt is helpful, but a strong work contract is better: it names the task, the permitted access, the evidence, the budget, and the person who owns the decision. This is practical operations—not a prediction about where AI is headed.</p>
            </div>

            <div style={{ marginTop: "clamp(3rem, 7vw, 6rem)", borderTop: "1px solid var(--beacon-parchment-dark)" }}>
              {questions.map(([question, answer], index) => (
                <article key={question} style={{ display: "grid", gridTemplateColumns: "5.5rem minmax(0, 1fr)", gap: "clamp(1rem, 4vw, 3rem)", padding: "2.25rem 0", borderBottom: "1px solid var(--beacon-parchment-dark)" }} className="five-question-row">
                  <span style={{ color: "var(--beacon-amber)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3rem", fontWeight: 600, lineHeight: 0.9 }}>0{index + 1}</span>
                  <div>
                    <h3 style={{ margin: 0, color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.55rem, 3vw, 2.25rem)", lineHeight: 1.08 }}>{question}</h3>
                    <p style={{ maxWidth: "700px", margin: "0.8rem 0 0", color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.98rem", lineHeight: 1.8 }}>{answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4rem, 8vw, 6.5rem) 0" }}>
          <div className="container five-note-grid" style={{ maxWidth: "980px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: "rgba(250,248,244,0.18)" }}>
            {[[Eye, "Visible scope", "The task and its boundaries are written before the work begins."], [LockKeyhole, "Limited authority", "The workflow receives only the tools and access required for that task."], [UserRoundCheck, "Human accountability", "A named person approves consequential decisions and public releases."]].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof Eye;
              return <article key={title as string} style={{ padding: "2rem", background: "#17353C" }}><ItemIcon size={20} color="var(--beacon-amber-light)" /><h3 style={{ margin: "1rem 0 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.65rem", fontWeight: 600 }}>{title as string}</h3><p style={{ margin: "0.7rem 0 0", color: "rgba(250,248,244,0.72)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.7 }}>{copy as string}</p></article>;
            })}
          </div>
          <div className="container" style={{ maxWidth: "980px", marginTop: "3rem" }}>
            <p style={{ maxWidth: "720px", margin: 0, color: "rgba(250,248,244,0.72)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", lineHeight: 1.8 }}>Beacon’s control pattern is consistent with the practical guidance in the <a href="https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html" target="_blank" rel="noreferrer" style={{ color: "var(--beacon-amber-light)" }}>OWASP AI Agent Security Cheat Sheet</a>: least privilege, explicit authorization for sensitive actions, protected context, monitoring, and human-in-the-loop review.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "1.8rem" }}>
              <Link href="/the-watch/controlled-ai-workflow-kit" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>Explore the workflow kit <ArrowRight size={15} /></Link>
              <Link href="/how-beacon-works" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#FAF8F4", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>How Beacon works <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 760px) {.five-note-intro,.five-note-grid{grid-template-columns:1fr!important}.five-question-row{grid-template-columns:3rem minmax(0,1fr)!important}}`}</style>
    </div>
  );
}
