import { ArrowUpRight, BookOpen, Heart, Lightbulb, ShieldCheck } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const DG_URL = "https://digitalgrandpa.org";
const heroImage = "/images/owned/beacon-digital-grandpa-hero.png";

const promises = [
  {
    icon: Heart,
    number: "01",
    title: "Hope without hurry",
    body: "A place to pause, find your footing, and remember that a meaningful next chapter does not have to begin with all the answers.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Wisdom with a practical edge",
    body: "Stories, books, and gentle field notes that honor lived experience while helping people make one honest move forward.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Direction with dignity",
    body: "No condescension, fear leverage, or pressure funnel. Just patient guidance for people carrying a real life and a long memory.",
  },
];

const paths = [
  ["The Porch Light Library", "Books, companion pieces, and reflections for people looking for steadiness, purpose, and a way through a hard season."],
  ["Stories worth carrying", "Short films, lived reflections, and family-ready stories that make room for hope, wisdom, love, and compassion."],
  ["A legacy that can travel", "A growing body of work designed to remain useful across generations—at a kitchen table, in a community group, or in the quiet of an ordinary day."],
];

function FieldLabel({ children }: { children: string }) {
  return <p style={{ color: "#B77B42", fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

export default function DigitalGrandpaPage() {
  return (
    <div data-design-system="digital-grandpa-v2" style={{ background: "#F8F1E7", color: "#2A2118", minHeight: "100vh" }}>
      <SharedNav />
      <main id="main-content">
        <section
          style={{
            background: "linear-gradient(90deg, rgba(40,30,20,0.96) 0%, rgba(40,30,20,0.84) 48%, rgba(40,30,20,0.42) 100%), url(" + heroImage + ") center/cover",
            color: "#FFF8EE",
            minHeight: "clamp(560px, 74vh, 760px)",
            padding: "clamp(5rem, 11vw, 9rem) 0 clamp(4.5rem, 9vw, 7rem)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: "780px" }}>
              <div className="dg-signal-strip" aria-hidden="true"><span /><span /><span>DIGITAL GRANDPA · PORCH LIGHT 01</span><span>LEGACY &amp; MISSION</span></div>
              <div style={{ marginTop: "2.35rem" }}>
                <FieldLabel>Digital Grandpa · a distinct Beacon property</FieldLabel>
                <h1 style={{ fontSize: "clamp(3.2rem, 7.6vw, 6.8rem)", letterSpacing: "-0.06em", lineHeight: 0.94, margin: "1.1rem 0 0" }}>
                  A light for the road
                  <br />
                  <em style={{ color: "rgba(255,248,238,0.82)", fontWeight: 500 }}>when the way feels uncertain.</em>
                </h1>
                <p style={{ color: "rgba(255,248,238,0.82)", fontSize: "clamp(1.06rem, 1.7vw, 1.24rem)", lineHeight: 1.78, margin: "1.75rem 0 0", maxWidth: "650px" }}>
                  Digital Grandpa is a legacy and wisdom project for people seeking hope, direction, love, and compassion in an unsettled world. It respects the experience people already carry—and offers a steadier companion for the next part of the journey.
                </p>
                <div className="dg-actions" style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", marginTop: "2.4rem" }}>
                  <a className="dg-primary-action" href={DG_URL} rel="noopener noreferrer" target="_blank">Visit Digital Grandpa <ArrowUpRight size={16} /></a>
                  <a href="#purpose" style={{ borderBottom: "1px solid rgba(255,248,238,0.48)", color: "#FFF8EE", fontSize: "0.86rem", padding: "1rem 0.25rem", textDecoration: "none" }}>Read the purpose ↓</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="purpose" style={{ background: "#F8F1E7", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container dg-purpose-grid">
            <div>
              <FieldLabel>A compassionate sage, not another guru</FieldLabel>
              <h2 style={{ fontSize: "clamp(2.25rem, 4.6vw, 4.7rem)", lineHeight: 1.02, margin: "1rem 0 0", maxWidth: "600px" }}>
                The wisdom is not in the years alone.
                <br />
                <em style={{ color: "#8B5E3C", fontWeight: 500 }}>It is in the love carried through them.</em>
              </h2>
            </div>
            <div style={{ alignSelf: "end" }}>
              <p style={{ color: "rgba(42,33,24,0.8)", fontSize: "1.08rem", lineHeight: 1.82, margin: 0 }}>
                Digital Grandpa does not exist to sell fear about technology or to turn later life into a training problem. It exists to share hard-won perspective: the kind that can make a difficult day feel less lonely and a next step feel possible.
              </p>
              <p style={{ color: "rgba(42,33,24,0.7)", fontSize: "0.95rem", lineHeight: 1.72, margin: "1.25rem 0 0" }}>
                The property has its own public experience and its own choices. Visiting or sharing Digital Grandpa does not create a Beacon Momentum membership, Beacon Labs inquiry, or shared account.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: "#3A2B20", color: "#FFF8EE", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container">
            <FieldLabel>What the light holds</FieldLabel>
            <h2 style={{ fontSize: "clamp(2.35rem, 4.8vw, 4.8rem)", lineHeight: 1.02, margin: "1rem 0 3rem", maxWidth: "790px" }}>
              A wiser pace. A warmer voice. A path that stays human.
            </h2>
            <div className="dg-promise-grid">
              {promises.map(({ icon: Icon, number, title, body }) => (
                <article key={number}>
                  <p>{number}</p>
                  <Icon aria-hidden="true" size={22} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#EFE1CE", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container">
            <div className="dg-path-heading">
              <div>
                <FieldLabel>The work taking shape</FieldLabel>
                <h2 style={{ fontSize: "clamp(2.2rem, 4.4vw, 4.4rem)", lineHeight: 1.03, margin: "1rem 0 0", maxWidth: "650px" }}>A living library for the years ahead.</h2>
              </div>
              <p>Digital Grandpa is being built for longevity—not for a trend cycle. The work can grow into books, audio, lessons, films, and community use without losing the care at its center.</p>
            </div>
            <div className="dg-path-list">
              {paths.map(([title, body], index) => (
                <article key={title}>
                  <span>{`0${index + 1}`}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "linear-gradient(125deg, #3A2B20, #2A2118)", color: "#FFF8EE", padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1100px" }}>
            <BookOpen aria-hidden="true" color="#D8A56A" size={28} />
            <FieldLabel>Continue at the right door</FieldLabel>
            <h2 style={{ fontSize: "clamp(2.5rem, 5.2vw, 5.35rem)", lineHeight: 1.02, margin: "1.1rem 0 0", maxWidth: "890px" }}>
              Take what helps. Carry it forward. Share it with someone you love.
            </h2>
            <p style={{ color: "rgba(255,248,238,0.78)", fontSize: "1.06rem", lineHeight: 1.75, margin: "1.3rem 0 0", maxWidth: "680px" }}>Digital Grandpa is a separate destination with its own work, policies, and future publishing rhythm. It is offered in the spirit of companionship—not a cross-property funnel.</p>
            <a className="dg-primary-action" href={DG_URL} rel="noopener noreferrer" style={{ marginTop: "2rem" }} target="_blank">Explore Digital Grandpa <ArrowUpRight size={16} /></a>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        [data-design-system="digital-grandpa-v2"] .dg-signal-strip { align-items: center; border-bottom: 1px solid rgba(255,248,238,0.22); color: rgba(255,248,238,0.62); display: flex; font-family: var(--beacon-mono); font-size: 0.62rem; gap: 0.85rem; letter-spacing: 0.09em; padding-bottom: 0.8rem; }
        [data-design-system="digital-grandpa-v2"] .dg-signal-strip span:first-child { background: #D8A56A; height: 1px; width: 2rem; }[data-design-system="digital-grandpa-v2"] .dg-signal-strip span:nth-child(2) { background: #8DB3A2; height: 1px; width: 1rem; }[data-design-system="digital-grandpa-v2"] .dg-signal-strip span:last-child { margin-left: auto; }
        [data-design-system="digital-grandpa-v2"] .dg-primary-action { align-items: center; background: #D8A56A; color: #2A2118; display: inline-flex; font-family: var(--beacon-ui); font-size: 0.77rem; font-weight: 800; gap: 0.5rem; letter-spacing: 0.06em; padding: 1rem 1.15rem; text-decoration: none; text-transform: uppercase; }
        [data-design-system="digital-grandpa-v2"] .dg-purpose-grid, [data-design-system="digital-grandpa-v2"] .dg-path-heading { align-items: start; display: grid; gap: clamp(2rem, 8vw, 7rem); grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }[data-design-system="digital-grandpa-v2"] .dg-promise-grid { display: grid; gap: 1px; grid-template-columns: repeat(3, minmax(0, 1fr)); }[data-design-system="digital-grandpa-v2"] .dg-promise-grid article { background: rgba(255,248,238,0.05); border: 1px solid rgba(216,165,106,0.28); min-height: 260px; padding: clamp(1.5rem, 3vw, 2.25rem); }[data-design-system="digital-grandpa-v2"] .dg-promise-grid article > p:first-child { color: #D8A56A; font-family: var(--beacon-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; margin: 0 0 2rem; }[data-design-system="digital-grandpa-v2"] .dg-promise-grid h3 { font-size: 1.75rem; margin: 1.1rem 0 0; }[data-design-system="digital-grandpa-v2"] .dg-promise-grid p:last-child { color: rgba(255,248,238,0.76); font-size: 0.94rem; line-height: 1.75; margin: 0.75rem 0 0; }
        [data-design-system="digital-grandpa-v2"] .dg-path-heading { align-items: end; margin-bottom: 3rem; }[data-design-system="digital-grandpa-v2"] .dg-path-heading > p { color: rgba(42,33,24,0.72); font-size: 0.98rem; line-height: 1.75; margin: 0; }[data-design-system="digital-grandpa-v2"] .dg-path-list { border-top: 1px solid rgba(42,33,24,0.18); }[data-design-system="digital-grandpa-v2"] .dg-path-list article { align-items: start; border-bottom: 1px solid rgba(42,33,24,0.18); display: grid; gap: 2rem; grid-template-columns: 70px minmax(0, 1fr); padding: 1.8rem 0; }[data-design-system="digital-grandpa-v2"] .dg-path-list span { color: #B77B42; font-family: var(--beacon-mono); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; padding-top: 0.4rem; }[data-design-system="digital-grandpa-v2"] .dg-path-list h3 { font-size: 1.5rem; margin: 0; }[data-design-system="digital-grandpa-v2"] .dg-path-list p { color: rgba(42,33,24,0.72); font-size: 0.95rem; line-height: 1.72; margin: 0.55rem 0 0; }
        @media (max-width: 760px) { [data-design-system="digital-grandpa-v2"] .dg-purpose-grid, [data-design-system="digital-grandpa-v2"] .dg-path-heading, [data-design-system="digital-grandpa-v2"] .dg-promise-grid { grid-template-columns: 1fr; }[data-design-system="digital-grandpa-v2"] .dg-signal-strip { align-items: flex-start; flex-wrap: wrap; }[data-design-system="digital-grandpa-v2"] .dg-signal-strip span:last-child { margin-left: 0; width: 100%; } }
      `}</style>
    </div>
  );
}
