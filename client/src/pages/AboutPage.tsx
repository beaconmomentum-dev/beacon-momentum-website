import { ArrowRight, Compass, HeartHandshake, Lightbulb, UsersRound } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const commitments = [
  {
    icon: Compass,
    title: "Start with the real question",
    body: "A new tool is not a plan. Beacon begins with the work, the people doing it, and the change that would actually make a difference.",
  },
  {
    icon: Lightbulb,
    title: "Make useful things understandable",
    body: "We explain what a tool or system can do in plain language, then help people decide whether it belongs in their own work.",
  },
  {
    icon: UsersRound,
    title: "Keep people in the picture",
    body: "Responsibility, care, context, creativity, and the final decision remain human work. Better technology should make those things easier to carry, not easier to ignore.",
  },
  {
    icon: HeartHandshake,
    title: "Leave people with something they own",
    body: "A good resource, lesson, or system should leave a person or team with a clearer practice they can understand, revise, and carry forward.",
  },
];

const properties = [
  ["Beacon Momentum", "Public orientation, practical resources, and The Watch membership path.", "Native public front door"],
  ["The Watch", "Annual learning and member practice for people building a steadier way of working.", "Separate membership experience"],
  ["Beacon Labs", "A separate organization service for research, diagnostics, and practical systems work.", "Separate organization path"],
  ["Beacon Trading", "A separate education and simulation destination for people studying markets with care.", "Separate education property"],
  ["Digital Grandpa", "A separate legacy and wisdom property grounded in hope, love, compassion, and direction.", "Separate legacy property"],
  ["Hollow Threads", "A separate retail property with its own products, orders, and customer support.", "Separate commerce property"],
];

function FieldLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p style={{ color: light ? "#D9B96D" : "#2E7A7D", fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

export default function AboutPage() {
  return (
    <div data-about-v3="true" style={{ background: "var(--beacon-parchment)", color: "var(--beacon-charcoal)", minHeight: "100vh" }}>
      <SharedNav />
      <main id="main-content">
        <section className="about-hero">
          <img alt="A lighthouse at golden hour" src="/images/owned/beacon-about-hero.png" />
          <div />
          <div className="container about-hero-content">
            <FieldLabel light>The Beacon story</FieldLabel>
            <h1>Built for people who want a clearer way forward.</h1>
            <p>Beacon Momentum is a public orientation point for people and organizations navigating change in work, technology, and daily life. We believe progress should make people more capable—not less visible.</p>
          </div>
        </section>

        <section className="about-introduction">
          <div className="container about-split">
            <div><FieldLabel>Why Beacon exists</FieldLabel><h2>AI will keep changing the world. People still need a place to make sense of it.</h2></div>
            <div>
              <p>Every generation has met a tool that changed how people learn, earn, create, and connect. AI is one of those tools. It can help with repetitive work, speed up a first draft, make knowledge easier to reach, and give small teams new capacity.</p>
              <p>It can also create pressure to move faster than good judgment allows. Beacon exists for the middle path: neither denial nor hype. We help people see what a tool is for, try it with care, and remain responsible for the work that follows.</p>
              <p className="about-manifesto">Use what is useful. Keep judgment visible. Build work that can carry forward.</p>
            </div>
          </div>
        </section>

        <section className="about-commitments">
          <div className="container">
            <FieldLabel light>What we are committed to</FieldLabel>
            <h2>Care first. Clarity next. Useful action after that.</h2>
            <div className="about-commitment-grid">
              {commitments.map(({ icon: Icon, title, body }, index) => <article key={title}><span>{`0${index + 1}`}</span><Icon aria-hidden="true" size={22} /><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about-paths">
          <div className="container about-split">
            <div><FieldLabel>One family. Clear doors.</FieldLabel><h2>Related in purpose. Distinct in what each place is for.</h2></div>
            <div><p>Beacon Momentum makes the next route visible. Each property has its own audience, experience, terms, support path, and information choices. A link is a referral—not an assumed shared account, membership, or record.</p><p>That clarity matters because people deserve to know where they are going before they continue.</p></div>
          </div>
          <div className="container about-property-grid">
            {properties.map(([name, description, boundary], index) => <article key={name}><span>{`0${index + 1}`}</span><h3>{name}</h3><p>{description}</p><small>{boundary}</small></article>)}
          </div>
        </section>

        <section className="about-closing">
          <div className="container">
            <FieldLabel light>Start where the work is</FieldLabel>
            <h2>You do not have to have everything figured out to take a useful next step.</h2>
            <p>Start with the free Readiness Map, read a Signal article, or explore The Watch when you are ready for a more sustained practice.</p>
            <div><Link className="about-primary-link" href="/the-watch">Review The Watch <ArrowRight size={16} /></Link><Link className="about-text-link" href="/ReadinessMap">Get the free Readiness Map <ArrowRight size={15} /></Link></div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        [data-about-v3="true"] .about-hero { color: var(--beacon-parchment); min-height: 620px; overflow: hidden; padding: clamp(9rem,14vw,12rem) 0 5rem; position: relative; }[data-about-v3="true"] .about-hero img,[data-about-v3="true"] .about-hero > div:nth-child(2) { height: 100%; inset: 0; position: absolute; width: 100%; }[data-about-v3="true"] .about-hero img { object-fit: cover; object-position: center; }[data-about-v3="true"] .about-hero > div:nth-child(2) { background: linear-gradient(90deg,rgba(22,36,51,.96),rgba(22,36,51,.78) 52%,rgba(22,36,51,.35)); }[data-about-v3="true"] .about-hero-content { max-width: 790px; position: relative; }[data-about-v3="true"] .about-hero h1 { font-size: clamp(3.2rem,7vw,6.5rem); line-height: .95; margin: 1rem 0 0; }[data-about-v3="true"] .about-hero p { color: rgba(245,243,236,.81); font-size: 1.1rem; line-height: 1.8; margin: 1.55rem 0 0; max-width: 650px; }
        [data-about-v3="true"] .about-introduction,[data-about-v3="true"] .about-paths { padding: clamp(4.5rem,9vw,8rem) 0; }[data-about-v3="true"] .about-split { display: grid; gap: clamp(2.5rem,9vw,8rem); grid-template-columns: minmax(0,.92fr) minmax(0,1.08fr); }[data-about-v3="true"] .about-split h2,[data-about-v3="true"] .about-commitments h2,[data-about-v3="true"] .about-closing h2 { font-size: clamp(2.3rem,4.7vw,4.8rem); line-height: 1.02; margin: 1rem 0 0; }[data-about-v3="true"] .about-split > div:nth-child(2) { color: rgba(22,36,51,.78); font-size: 1.06rem; line-height: 1.82; }[data-about-v3="true"] .about-split > div:nth-child(2) p { margin: 0 0 1.2rem; }[data-about-v3="true"] .about-manifesto { color: var(--beacon-charcoal); font-family: var(--beacon-display); font-size: 1.8rem; font-weight: 600; line-height: 1.28; }
        [data-about-v3="true"] .about-commitments { background: var(--beacon-charcoal); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,8rem) 0; }[data-about-v3="true"] .about-commitment-grid { display: grid; gap: 1px; grid-template-columns: repeat(4,minmax(0,1fr)); margin-top: 3rem; }[data-about-v3="true"] .about-commitment-grid article { background: rgba(245,243,236,.05); border: 1px solid rgba(196,159,83,.3); min-height: 300px; padding: clamp(1.4rem,2.5vw,2rem); }[data-about-v3="true"] .about-commitment-grid article > span { color: var(--beacon-amber); display: block; font-family: var(--beacon-mono); font-size: .65rem; font-weight: 700; letter-spacing: .14em; margin-bottom: 2rem; }[data-about-v3="true"] .about-commitment-grid svg { color: var(--beacon-amber); }[data-about-v3="true"] .about-commitment-grid h3 { font-size: 1.45rem; margin: 1.2rem 0 0; }[data-about-v3="true"] .about-commitment-grid p { color: rgba(245,243,236,.72); font-size: .9rem; line-height: 1.72; margin: .75rem 0 0; }
        [data-about-v3="true"] .about-paths { background: var(--beacon-teal-pale); }[data-about-v3="true"] .about-property-grid { display: grid; gap: 1px; grid-template-columns: repeat(3,minmax(0,1fr)); margin-top: 3.5rem; }[data-about-v3="true"] .about-property-grid article { background: var(--beacon-parchment); border: 1px solid rgba(22,36,51,.13); min-height: 230px; padding: 1.6rem; }[data-about-v3="true"] .about-property-grid article > span { color: var(--beacon-teal); font-family: var(--beacon-mono); font-size: .64rem; font-weight: 700; letter-spacing: .12em; }[data-about-v3="true"] .about-property-grid h3 { font-size: 1.45rem; margin: 1.5rem 0 0; }[data-about-v3="true"] .about-property-grid p { color: var(--beacon-charcoal-mid); font-size: .88rem; line-height: 1.65; margin: .65rem 0 0; }[data-about-v3="true"] .about-property-grid small { color: var(--beacon-teal); display: block; font-family: var(--beacon-mono); font-size: .59rem; font-weight: 700; letter-spacing: .09em; margin-top: 1rem; text-transform: uppercase; }
        [data-about-v3="true"] .about-closing { background: linear-gradient(125deg,#223345,#162433); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,7.5rem) 0; }[data-about-v3="true"] .about-closing > .container { max-width: 1100px; }[data-about-v3="true"] .about-closing p:not(.about-manifesto) { color: rgba(245,243,236,.76); font-size: 1.05rem; line-height: 1.75; margin: 1.35rem 0 0; max-width: 680px; }[data-about-v3="true"] .about-closing > .container > div { align-items: center; display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }[data-about-v3="true"] .about-primary-link { align-items: center; background: var(--beacon-amber); color: var(--beacon-charcoal); display: inline-flex; font-family: var(--beacon-ui); font-size: .76rem; font-weight: 800; gap: .5rem; letter-spacing: .06em; padding: 1rem 1.15rem; text-decoration: none; text-transform: uppercase; }[data-about-v3="true"] .about-text-link { align-items: center; border-bottom: 1px solid rgba(245,243,236,.45); color: var(--beacon-parchment); display: inline-flex; font-size: .9rem; gap: .4rem; padding: .72rem 0; text-decoration: none; }
        @media(max-width:820px){[data-about-v3="true"] .about-split,[data-about-v3="true"] .about-commitment-grid,[data-about-v3="true"] .about-property-grid{grid-template-columns:1fr;}}
      `}</style>
    </div>
  );
}
