import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import BeaconRouteLockup from "@/components/BeaconRouteLockup";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const C = {
  deep: "#162433",
  water: "#223345",
  teal: "#2E7A7D",
  brass: "#C49F53",
  parchment: "#F5F3EC",
  line: "rgba(22, 36, 51, 0.16)",
  muted: "#586B7D",
};

const routes = [
  {
    marker: "01",
    label: "Membership & learning",
    name: "The Watch",
    price: "$497 / year",
    body: "A year-long learning and community environment for people who want practical systems, clear context, and a steadier operating rhythm.",
    details: [
      "Five capability pathways and field guides",
      "Member resources and community structure",
      "Watch Brief Premium included for members",
      "Sentinel, Navigator, and Quartermaster progression earned through participation",
    ],
    action: "Review Watch enrollment",
    href: "/the-watch",
    featured: true,
  },
  {
    marker: "02",
    label: "Public intelligence",
    name: "Watch Brief Premium",
    price: "$27 / month",
    body: "A monthly operating dossier for people who want a concise, recurring intelligence brief without joining the annual membership.",
    details: [
      "One deeper evidence-led briefing",
      "One curated tool note",
      "One practical signal worth examining",
      "Separate from the annual Watch membership",
    ],
    action: "Review the dossier",
    href: "/watch-brief-premium",
    featured: false,
  },
  {
    marker: "03",
    label: "Organization systems",
    name: "Beacon Labs Signal Check",
    price: "Start with a free read",
    body: "A separate, organization-facing diagnostic for teams that need a clear view of their public digital posture, operating risk, and next practical decision.",
    details: [
      "Free initial digital-presence read",
      "Consent-based, separate organizational path",
      "Optional expanded diagnostic after the first read",
      "No transfer from a Watch membership or other Beacon property",
    ],
    action: "Visit Beacon Labs",
    href: "https://beaconlabs.ai/signal-check",
    featured: false,
    external: true,
  },
];

const faqs = [
  {
    question: "Why does Beacon offer different routes?",
    answer: "People arrive with different work in front of them. The Watch is an annual membership and learning environment; Watch Brief Premium is a separate monthly dossier; Beacon Labs serves organizations. Each route has its own terms, experience, and decision point.",
  },
  {
    question: "Is The Watch a subscription with multiple paid tiers?",
    answer: "No. The Watch is one annual membership at $497 per year. Sentinel, Navigator, and Quartermaster are earned stages of participation—not paid plans to compare or purchase.",
  },
  {
    question: "What happens if I am not ready to enroll?",
    answer: "Start with public Signal articles or the free Readiness Map. They stand on their own. When you are ready for a more structured path, you can return to choose the route that fits your work.",
  },
  {
    question: "Do my details move between Beacon properties?",
    answer: "No. A Beacon Community membership, Beacon Labs inquiry, commerce purchase, and other property interaction remain separate by default. Each destination explains its own privacy and consent practices.",
  },
];

function FieldLabel({ children, color = C.brass }: { children: string; color?: string }) {
  return <p style={{ color, fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

function RouteAction({ href, children, external }: { href: string; children: string; external?: boolean }) {
  const style: React.CSSProperties = {
    alignItems: "center",
    background: "transparent",
    border: `1px solid ${C.teal}`,
    color: C.deep,
    display: "inline-flex",
    fontFamily: "var(--beacon-ui)",
    fontSize: "0.75rem",
    fontWeight: 800,
    gap: "0.5rem",
    letterSpacing: "0.06em",
    padding: "0.86rem 1rem",
    textDecoration: "none",
    textTransform: "uppercase",
  };

  if (external) {
    return <a href={href} rel="noopener noreferrer" style={style} target="_blank">{children}<ArrowRight size={15} /></a>;
  }
  return <Link href={href} style={style}>{children}<ArrowRight size={15} /></Link>;
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div data-design-system="foundation-v2" style={{ background: C.parchment, color: C.deep, minHeight: "100vh" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "linear-gradient(125deg, #162433 0%, #223345 66%, #162433 100%)", color: C.parchment, overflow: "hidden", padding: "clamp(5rem, 10vw, 8.5rem) 0 clamp(4rem, 8vw, 7rem)" }}>
          <div className="container">
            <div className="pricing-signal-strip" aria-hidden="true"><span /><span /><span>BEACON MOMENTUM · ROUTE BOARD 03</span><span>CHOOSE WITH CLARITY</span></div>
            <div className="pricing-hero-grid">
              <div>
                <FieldLabel>Clear next steps</FieldLabel>
                <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.4rem)", letterSpacing: "-0.06em", lineHeight: 0.95, margin: "1.1rem 0 0", maxWidth: "760px" }}>
                  Start with the
                  <br />
                  <em style={{ color: "rgba(245,243,236,0.76)", fontWeight: 500 }}>right level of depth.</em>
                </h1>
                <p style={{ color: "rgba(245,243,236,0.78)", fontSize: "clamp(1.02rem, 1.7vw, 1.2rem)", lineHeight: 1.75, margin: "1.7rem 0 0", maxWidth: "650px" }}>
                  Beacon is not one funnel. It is a set of distinct places to begin: public guidance for self-directed learning, a member environment for deeper practice, and a separate organization path for systems work.
                </p>
              </div>
              <aside className="pricing-hero-note">
                <FieldLabel color="#D9B96D">The decision rule</FieldLabel>
                <p>Choose the smallest useful next step. You can return for more structure when the work—not the pressure—calls for it.</p>
              </aside>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container">
            <div className="pricing-section-heading">
              <div>
                <FieldLabel>Three routes, held apart on purpose</FieldLabel>
                <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.45rem)", lineHeight: 1.02, margin: "1rem 0 0", maxWidth: "720px" }}>
                  Choose the route that names the work in front of you.
                </h2>
              </div>
              <p>Membership, B2B, and public resources serve different needs. Accounts, submitted details, payment information, and access do not transfer automatically between them.</p>
            </div>

            <div className="pricing-route-grid">
              {routes.map((route) => (
                <article key={route.name} className={route.featured ? "pricing-route-card pricing-route-card-featured" : "pricing-route-card"}>
                  <p className="pricing-route-marker">{route.marker}</p>
                  <FieldLabel color={route.featured ? C.brass : C.teal}>{route.label}</FieldLabel>
                  <h3>{route.name}</h3>
                  <p className="pricing-route-price">{route.price}</p>
                  <p className="pricing-route-body">{route.body}</p>
                  <ul>
                    {route.details.map((detail) => <li key={detail}><CheckCircle2 size={16} aria-hidden="true" />{detail}</li>)}
                  </ul>
                  <RouteAction external={route.external} href={route.href}>{route.action}</RouteAction>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "var(--beacon-teal-pale)", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "clamp(4rem, 8vw, 6.5rem) 0" }}>
          <div className="container pricing-signal-check-grid">
            <div>
              <FieldLabel color={C.teal}>Beacon Labs · a separate organization path</FieldLabel>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.85rem)", lineHeight: 1.05, margin: "1rem 0 0" }}>
                Start with clarity. Continue only when it serves the work.
              </h2>
            </div>
            <div>
              <p style={{ color: "rgba(22,36,51,0.78)", fontSize: "1.05rem", lineHeight: 1.78, margin: 0 }}>
                The Signal Check begins with a no-cost initial read of a brand’s digital presence. An organization can choose an expanded diagnostic afterward, but there is no fee for the first read and no cross-property handoff by default.
              </p>
              <a href="https://beaconlabs.ai/signal-check" rel="noopener noreferrer" target="_blank" className="pricing-primary-action">Visit Beacon Labs for a Signal Check <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section style={{ background: C.deep, color: C.parchment, padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container pricing-faq-grid">
            <div>
              <FieldLabel>Questions before commitment</FieldLabel>
              <h2 style={{ fontSize: "clamp(2.25rem, 4.35vw, 4.1rem)", lineHeight: 1.04, margin: "1rem 0 0" }}>
                A better choice begins with a plain answer.
              </h2>
            </div>
            <div style={{ borderTop: "1px solid rgba(196,159,83,0.3)" }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={faq.question} className="pricing-faq-item">
                    <button aria-controls={`pricing-faq-${index}`} aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)} type="button">
                      <span>{faq.question}</span><ChevronDown size={18} aria-hidden="true" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 160ms ease" }} />
                    </button>
                    {isOpen && <p id={`pricing-faq-${index}`}>{faq.answer}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ background: "linear-gradient(130deg, #223345, #162433)", color: C.parchment, padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1100px" }}>
            <BeaconRouteLockup compact descriptor="Public Front Door" mutedColor="rgba(245,243,236,0.7)" textColor={C.parchment} />
            <h2 style={{ fontSize: "clamp(2.5rem, 5.2vw, 5.4rem)", lineHeight: 1.01, margin: "1.5rem 0 0", maxWidth: "860px" }}>
              Not ready for a purchase? Start with one visible job.
            </h2>
            <p style={{ color: "rgba(245,243,236,0.76)", fontSize: "1.05rem", lineHeight: 1.75, margin: "1.35rem 0 0", maxWidth: "650px" }}>The Readiness Map is free, useful alone, and designed to help you name the next practical step without joining a list or a program.</p>
            <Link href="/ReadinessMap" className="pricing-primary-action" style={{ marginTop: "2rem" }}>Get the free Readiness Map <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .pricing-signal-strip { align-items: center; border-bottom: 1px solid rgba(245,243,236,0.18); color: rgba(245,243,236,0.58); display: flex; font-family: var(--beacon-mono); font-size: 0.62rem; gap: 0.85rem; letter-spacing: 0.09em; padding-bottom: 0.8rem; }
        .pricing-signal-strip span:first-child { background: var(--beacon-amber); height: 1px; width: 2rem; }.pricing-signal-strip span:nth-child(2) { background: var(--beacon-teal-light); height: 1px; width: 1rem; }.pricing-signal-strip span:last-child { margin-left: auto; }
        .pricing-hero-grid, .pricing-section-heading, .pricing-signal-check-grid, .pricing-faq-grid { display: grid; gap: clamp(2rem, 7vw, 6.5rem); grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr); }.pricing-hero-grid { align-items: end; margin-top: 2.4rem; }.pricing-hero-note { border-left: 1px solid rgba(196,159,83,0.5); color: rgba(245,243,236,0.82); font-size: 1.26rem; line-height: 1.5; padding: 0.5rem 0 0.5rem 1.5rem; }.pricing-hero-note p { font-family: var(--beacon-display); margin: 1rem 0 0; }
        .pricing-section-heading { align-items: end; margin-bottom: 3rem; }.pricing-section-heading > p { color: var(--beacon-charcoal-mid); font-size: 0.97rem; line-height: 1.72; margin: 0; }.pricing-route-grid { display: grid; gap: 1px; grid-template-columns: repeat(3, minmax(0, 1fr)); }.pricing-route-card { background: #fff; border: 1px solid var(--beacon-parchment-dark); display: flex; flex-direction: column; min-height: 525px; padding: clamp(1.4rem, 2.7vw, 2.2rem); position: relative; }.pricing-route-card-featured { background: #F7F0DE; border-color: rgba(196,159,83,0.7); }.pricing-route-marker { color: var(--beacon-amber); font-family: var(--beacon-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; margin: 0 0 2.3rem; }.pricing-route-card h3 { font-size: 2rem; margin: 0.8rem 0 0; }.pricing-route-price { color: var(--beacon-teal); font-family: var(--beacon-display); font-size: 1.5rem; font-weight: 600; line-height: 1.2; margin: 1rem 0 0; }.pricing-route-body { color: var(--beacon-charcoal-mid); font-size: 0.93rem; line-height: 1.7; margin: 1.1rem 0 0; }.pricing-route-card ul { display: grid; gap: 0.7rem; list-style: none; margin: 1.6rem 0 auto; padding: 0 0 1.6rem; }.pricing-route-card li { align-items: flex-start; color: var(--beacon-charcoal-mid); display: flex; font-size: 0.84rem; gap: 0.55rem; line-height: 1.48; }.pricing-route-card li svg { color: var(--beacon-teal); flex: 0 0 auto; margin-top: 0.1rem; }
        .pricing-primary-action { align-items: center; background: var(--beacon-amber); border: 0; color: var(--beacon-charcoal); display: inline-flex; font-family: var(--beacon-ui); font-size: 0.76rem; font-weight: 800; gap: 0.5rem; letter-spacing: 0.06em; margin-top: 1.5rem; padding: 0.95rem 1.1rem; text-decoration: none; text-transform: uppercase; }.pricing-faq-item { border-bottom: 1px solid rgba(196,159,83,0.3); }.pricing-faq-item button { align-items: center; background: transparent; border: 0; color: var(--beacon-parchment); display: flex; font-family: var(--beacon-ui); font-size: 1rem; font-weight: 750; gap: 1rem; justify-content: space-between; padding: 1.25rem 0; text-align: left; width: 100%; }.pricing-faq-item p { color: rgba(245,243,236,0.76); font-size: 0.93rem; line-height: 1.72; margin: 0; padding: 0 0 1.3rem; }
        @media (max-width: 820px) { .pricing-hero-grid, .pricing-section-heading, .pricing-signal-check-grid, .pricing-faq-grid, .pricing-route-grid { grid-template-columns: 1fr; }.pricing-signal-strip { align-items: flex-start; flex-wrap: wrap; }.pricing-signal-strip span:last-child { margin-left: 0; width: 100%; }.pricing-route-card { min-height: 0; }.pricing-hero-note { max-width: 520px; } }
      `}</style>
    </div>
  );
}
