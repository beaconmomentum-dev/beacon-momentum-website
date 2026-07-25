/**
 * Beacon Momentum — Watch Brief Premium
 * Funnel role: a paid monthly operating dossier between the free Beacon Brief and The Watch membership.
 * Design: Deep Water Editorial / Quiet Authority — no checkout implication until a confirmed payment path exists.
 */
import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { requestWatchBriefPremiumDetails } from "@/lib/ghl";

const navy = "#0B2A3B";
const deep = "#061A29";
const teal = "#3E777A";
const amber = "#D8A94A";
const cream = "#F8F5EC";

export default function WatchBriefPremiumPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");
    const accepted = await requestWatchBriefPremiumDetails(email, name || undefined);
    setStatus(accepted ? "success" : "error");
  }

  return (
    <div style={{ minHeight: "100vh", background: cream, color: navy }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ position: "relative", overflow: "hidden", background: deep, color: cream, padding: "7rem 0 6rem" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 85% 18%, rgba(62,119,122,0.42), transparent 27%), linear-gradient(120deg, rgba(216,169,74,0.13), transparent 35%)" }} />
          <div className="container" style={{ position: "relative", maxWidth: "1080px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span style={{ width: "2.5rem", height: 1, background: amber }} />
              <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: amber }}>Watch Brief Premium · $27/month</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.15fr) minmax(280px, 0.65fr)", gap: "3rem", alignItems: "end" }} className="premium-hero-grid">
              <div>
                <h1 style={{ margin: 0, maxWidth: "760px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 5.25rem)", lineHeight: 0.95, letterSpacing: "-0.045em", fontWeight: 600 }}>
                  A deeper operating dossier. <em style={{ color: "#72B8B4" }}>Once a month.</em>
                </h1>
                <p style={{ margin: "1.75rem 0 0", maxWidth: "650px", fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(248,245,236,0.74)" }}>
                  Watch Brief Premium is for readers who value the public Signal and free Beacon Brief—but want one more considered layer without joining a full membership community.
                </p>
              </div>
              <div style={{ borderLeft: `1px solid rgba(216,169,74,0.45)`, paddingLeft: "1.5rem" }}>
                <p style={{ margin: 0, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: amber }}>The distinction</p>
                <p style={{ margin: "0.75rem 0 0", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(248,245,236,0.7)" }}>The Beacon Brief is a free weekly email. This is a paid monthly dossier. The Watch is the annual curriculum and community membership.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "5rem 0", background: cream }}>
          <div className="container" style={{ maxWidth: "1080px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.72fr)", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ margin: 0, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: teal }}>One monthly release</p>
              <h2 style={{ margin: "1rem 0 1.25rem", maxWidth: "650px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.02, letterSpacing: "-0.035em", fontWeight: 600 }}>Keep the useful signal. Add the operating context.</h2>
              <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
                {[
                  "One deeper Watch Brief that connects a live development to the operating implication.",
                  "One curated tool recommendation with a short implementation note.",
                  "One high-leverage Signal of the Month: a data point, shift, or action worth carrying forward.",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start", paddingBottom: "1rem", borderBottom: "1px solid rgba(11,42,59,0.13)" }}>
                    <CheckCircle2 size={18} color={teal} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.96rem", lineHeight: 1.65, color: "#42606A" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.25rem" }}>
                <a href="/blog" style={{ color: teal, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 600, fontSize: "0.76rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Read The Signal <ArrowRight size={14} style={{ display: "inline", verticalAlign: "-2px" }} /></a>
                <a href="/the-watch#join" style={{ color: navy, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 600, fontSize: "0.76rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Explore The Watch membership <ArrowRight size={14} style={{ display: "inline", verticalAlign: "-2px" }} /></a>
              </div>
            </div>

            <aside style={{ background: navy, color: cream, padding: "2rem", borderTop: `4px solid ${amber}`, boxShadow: "0 20px 45px rgba(6,26,41,0.16)" }}>
              <Mail size={20} color={amber} />
              <p style={{ margin: "1.5rem 0 0", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: amber }}>Request enrollment details</p>
              <p style={{ margin: "0.75rem 0 1.5rem", fontFamily: "'Lora', Georgia, serif", fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(248,245,236,0.72)" }}>We will send the current release schedule and secure enrollment instructions. This form is not a checkout.</p>
              {status === "success" ? (
                <div role="status" style={{ border: "1px solid rgba(114,184,180,0.55)", padding: "1rem", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.6, color: "#B7E0DA" }}>Your request is in. We’ll send the next steps and current enrollment details.</div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.9rem" }}>
                  <label style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(248,245,236,0.68)" }}>First name <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                    <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="given-name" style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: "0.45rem", padding: "0.8rem", background: "rgba(248,245,236,0.06)", border: "1px solid rgba(248,245,236,0.24)", color: cream, fontFamily: "'Lora', Georgia, serif" }} />
                  </label>
                  <label style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(248,245,236,0.68)" }}>Email
                    <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: "0.45rem", padding: "0.8rem", background: "rgba(248,245,236,0.06)", border: "1px solid rgba(248,245,236,0.24)", color: cream, fontFamily: "'Lora', Georgia, serif" }} />
                  </label>
                  <button type="submit" disabled={status === "submitting"} style={{ marginTop: "0.35rem", padding: "0.9rem 1rem", border: `1px solid ${amber}`, background: amber, color: deep, cursor: status === "submitting" ? "wait" : "pointer", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: status === "submitting" ? 0.7 : 1 }}>{status === "submitting" ? "Sending…" : "Request enrollment details"}</button>
                  {status === "error" && <p role="alert" style={{ margin: 0, fontFamily: "'Lora', Georgia, serif", fontSize: "0.82rem", color: "#F0A699" }}>We could not send your request. Please try again in a moment.</p>}
                </form>
              )}
            </aside>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 760px) { .premium-hero-grid { grid-template-columns: 1fr !important; } .premium-hero-grid > div:last-child { border-left: 0 !important; border-top: 1px solid rgba(216,169,74,0.45); padding-left: 0 !important; padding-top: 1.25rem; } main .container[style*="1080px"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
