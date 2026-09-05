/**
 * Beacon Momentum — The Watch Founding Year page
 * Design reminder: quiet authority, deep-water editorial composition, CSS-only
 * nautical light motif. No managed-preview asset or hosted checkout.
 */
import { Link } from "wouter";
import BeaconRouteLockup from "@/components/BeaconRouteLockup";

const C = {
  deep: "#071523",
  water: "#0D263B",
  waterSoft: "#123650",
  amber: "#D4A94D",
  cream: "#F7F1E5",
  mist: "rgba(247,241,229,0.70)",
  line: "rgba(212,169,77,0.28)",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ margin: 0, color: C.amber, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 800, fontSize: "0.7rem" }}>{children}</p>;
}

const foundations = [
  ["A Founding Year rate designed to stay with you", "Enroll at $497/year—$500 below the later $997 annual rate for new members. Your annual renewal rate remains $497 while you stay continuously active and paid."],
  ["A practical member field kit", "Start with the Beacon Venture Execution Sprint, Execution Field Guide, offer-validation worksheet, prototype and delivery checklists, Pathfinder Assessment, resource library, and Watch Brief Premium member benefit."],
  ["One membership. Earned depth.", "Everyone begins at Sentinel. Navigator and Quartermaster are earned through participation and contribution—not sold as paid-up tiers."],
];

const faq = [
  ["Is this a fundraiser or an investment?", "No. The Watch is an annual membership purchase from Beacon Momentum LLC. It is not an investment, loan, equity interest, revenue-share interest, promise of financial return, charitable contribution, or tax-deductible donation."],
  ["Why does Founding Year enrollment matter now?", "The $497 Founding Year rate is available to the first 1,000 paid annual members. It is $500 below the later $997 annual rate for new members, and it stays with a member who remains continuously active and paid. This is a membership-price policy, not an investment opportunity or promise of financial upside."],
  ["What does the $300,000 figure mean?", "Over the past 18 months, Beacon Momentum LLC invested $300,000 in the infrastructure, systems, content, and delivery capacity behind Beacon. Founding Year enrollment is designed to help recover that foundational work and provide ongoing support for the member environment. At $497/year, 1,000 paid annual memberships equal $497,000 in gross first-year receipts. This is transparent operating math, not a forecast, a share in the company, or a promise of any financial outcome."],
  ["What happens if I cancel?", "Cancellation stops a future renewal when submitted under the published terms. Your access remains active through the end of the paid annual term. A lapse, cancellation, or later re-enrollment is governed by the then-current published terms and rate."],
];

export default function TheWatchPage() {
  return (
    <main id="main-content" style={{ background: C.deep, color: C.cream, fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
      <header style={{ position: "relative", zIndex: 2, borderBottom: `1px solid ${C.line}`, background: "rgba(7,21,35,0.96)" }}>
        <div className="container" style={{ minHeight: "76px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <BeaconRouteLockup descriptor="The Watch" textColor={C.cream} mutedColor={C.mist} />
          <Link href="/the-watch/checkout" style={{ color: C.deep, background: C.amber, padding: "0.7rem 0.95rem", textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 800, fontSize: "0.7rem" }}>Founding Year enrollment</Link>
        </div>
      </header>

      <section style={{ minHeight: "min(760px, calc(100svh - 76px))", display: "grid", alignItems: "end", padding: "clamp(4rem, 10vw, 9rem) 0", overflow: "hidden", background: "radial-gradient(ellipse 55% 75% at 87% 12%, rgba(212,169,77,0.18), transparent 55%), radial-gradient(ellipse 40% 55% at 70% 35%, rgba(72,123,152,0.20), transparent 60%), linear-gradient(125deg, #071523 0%, #0D263B 60%, #071523 100%)" }}>
        <div className="container" style={{ position: "relative" }}>
          <div style={{ width: "min(100%, 840px)" }}>
            <Eyebrow>The Watch · Founding Year Enrollment</Eyebrow>
            <h1 style={{ margin: "1.15rem 0 0", fontFamily: "Georgia, Cambria, serif", fontSize: "clamp(3rem, 7.4vw, 6.8rem)", fontWeight: 500, lineHeight: 0.97, letterSpacing: "-0.055em" }}>The lighthouse is lit.<br /><em style={{ color: "rgba(247,241,229,0.78)" }}>Take your post for the year ahead.</em></h1>
            <p style={{ margin: "1.7rem 0 0", maxWidth: "660px", color: C.mist, fontFamily: "Georgia, serif", fontSize: "clamp(1.03rem, 1.55vw, 1.23rem)", lineHeight: 1.75 }}>
              The Watch is the Beacon Momentum community for people who want clear direction, useful tools, and an operating rhythm that holds when the work gets real. Founding Year enrollment is $497/year for the first 1,000 paid annual members—$500 below the later $997 annual rate for new members—with a rate that stays at $497 on uninterrupted paid renewals.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginTop: "2.3rem" }}>
              <Link href="/the-watch/checkout" style={{ background: C.amber, color: C.deep, textDecoration: "none", padding: "1rem 1.3rem", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 800, fontSize: "0.76rem" }}>Review Founding Year enrollment</Link>
              <a href="#what-begins" style={{ color: C.cream, textDecoration: "none", padding: "1rem 0.25rem", borderBottom: "1px solid rgba(247,241,229,0.34)", fontSize: "0.82rem" }}>See what begins with membership ↓</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: C.cream, color: C.deep }}>
        <div className="container watch-split" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)", gap: "clamp(2rem, 7vw, 7rem)", alignItems: "start" }}>
          <div><Eyebrow>Why this year matters</Eyebrow><h2 style={{ margin: "1rem 0 0", fontFamily: "Georgia, serif", fontSize: "clamp(2.25rem, 4.4vw, 4.4rem)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.045em" }}>We built the foundation. Founding Year enrollment helps carry it forward.</h2></div>
          <div style={{ paddingTop: "0.35rem" }}>
            <p style={{ margin: 0, color: "rgba(7,21,35,0.78)", fontFamily: "Georgia, serif", fontSize: "1.1rem", lineHeight: 1.85 }}>Over the past 18 months, Beacon Momentum LLC invested $300,000 in the infrastructure, systems, content, and delivery capacity behind Beacon. The Watch is open as a real annual membership purchase: customer revenue helps recover that foundational work and support the ongoing member environment.</p>
            <p style={{ margin: "1.4rem 0 0", color: "rgba(7,21,35,0.78)", fontFamily: "Georgia, serif", fontSize: "1.1rem", lineHeight: 1.85 }}>The first 1,000 paid annual members enroll at $497/year—$500 below the later $997 annual rate for new members. At $497/year, 1,000 paid annual memberships equal $497,000 in gross first-year receipts. This is transparent operating math, not a demand forecast, a share in the company, or a promise of any financial outcome.</p>
          </div>
        </div>
      </section>

      <section id="what-begins" style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: C.water }}>
        <div className="container"><Eyebrow>What begins with membership</Eyebrow><h2 style={{ maxWidth: "700px", margin: "1rem 0 3rem", fontFamily: "Georgia, serif", fontSize: "clamp(2.25rem, 4.5vw, 4.6rem)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.045em" }}>Start with a field kit.<br /><em style={{ color: "rgba(247,241,229,0.70)" }}>Stay for the operating rhythm.</em></h2>
          <div className="watch-foundation-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1px", background: C.line, border: `1px solid ${C.line}` }}>
            {foundations.map(([title, copy], index) => <article key={title} style={{ padding: "clamp(1.35rem, 3vw, 2.2rem)", background: index === 1 ? "#102E46" : C.water, minHeight: "285px" }}><p style={{ color: C.amber, margin: 0, fontWeight: 800, letterSpacing: "0.16em", fontSize: "0.68rem" }}>0{index + 1}</p><h3 style={{ margin: "2.6rem 0 0", fontFamily: "Georgia, serif", fontWeight: 500, fontSize: "1.72rem", lineHeight: 1.1 }}>{title}</h3><p style={{ margin: "0.85rem 0 0", color: C.mist, lineHeight: 1.75, fontSize: "0.93rem" }}>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0", background: C.deep }}>
        <div className="container watch-split" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.85fr) minmax(0, 1.15fr)", gap: "clamp(2rem, 7vw, 7rem)" }}>
          <div><Eyebrow>Founding Year terms</Eyebrow><h2 style={{ margin: "1rem 0 0", fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 4.1rem)", fontWeight: 500, lineHeight: 1.03, letterSpacing: "-0.045em" }}>A clear purchase.<br /><em style={{ color: "rgba(247,241,229,0.70)" }}>A clear boundary.</em></h2></div>
          <div style={{ borderTop: `1px solid ${C.line}` }}>
            {faq.map(([question, answer]) => <article key={question} style={{ padding: "1.45rem 0", borderBottom: `1px solid ${C.line}` }}><h3 style={{ margin: 0, color: C.cream, fontSize: "1rem", fontWeight: 750 }}>{question}</h3><p style={{ margin: "0.65rem 0 0", color: C.mist, lineHeight: 1.72, fontSize: "0.91rem" }}>{answer}</p></article>)}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(4rem, 9vw, 8rem) 0", background: "linear-gradient(130deg, #0D263B, #071523)" }}>
        <div className="container" style={{ textAlign: "left" }}><Eyebrow>Founding Year enrollment</Eyebrow><h2 style={{ maxWidth: "840px", margin: "1rem 0 0", fontFamily: "Georgia, serif", fontSize: "clamp(2.35rem, 5vw, 5rem)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.05em" }}>If the work is useful to you, join as a Founding Year member while the first 1,000 places remain.</h2><p style={{ maxWidth: "650px", margin: "1.4rem 0 0", color: C.mist, fontFamily: "Georgia, serif", fontSize: "1.08rem", lineHeight: 1.75 }}>Founding Year members enroll at $497/year, $500 below the later $997 annual rate for new members, and keep the $497 renewal rate while continuously active and paid. Review the access, annual renewal terms, and payment details before you enroll.</p><Link href="/the-watch/checkout" style={{ display: "inline-block", marginTop: "2rem", background: C.amber, color: C.deep, textDecoration: "none", padding: "1rem 1.25rem", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 800, fontSize: "0.76rem" }}>Continue to Beacon-secured enrollment</Link></div>
      </section>
      <footer style={{ padding: "1.75rem 0", borderTop: `1px solid ${C.line}`, background: C.deep }}><div className="container" style={{ color: "rgba(247,241,229,0.52)", fontSize: "0.78rem", lineHeight: 1.6 }}>© Beacon Momentum LLC · The Watch is an annual membership purchase. Questions: <a href="mailto:support@beaconmomentum.com" style={{ color: C.cream }}>support@beaconmomentum.com</a></div></footer>
      <style>{`@media (max-width: 760px) { .watch-split, .watch-foundation-grid { grid-template-columns: 1fr !important; } .watch-foundation-grid article { min-height: 0 !important; } }`}</style>
    </main>
  );
}
