import { ArrowRight, CheckCircle2, FileText, Lightbulb, UsersRound } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const steps = [
  ["01", "Name the work", "Start with a real task, decision, or recurring frustration. A useful tool has to earn its place in the work you already do."],
  ["02", "Try the smallest safe improvement", "Use a worksheet, a practice exercise, a source, or a carefully bounded test to learn what actually helps."],
  ["03", "Check what comes back", "Look at the result in context. Fix the weak spots. Keep a person responsible for the final decision and what happens next."],
  ["04", "Keep the useful part", "Turn what worked into a guide, a habit, or a shared resource that can make the next round of work clearer."],
] as const;

const principles = [
  [FileText, "Keep the source close", "When a claim, tool, or decision matters, Beacon points back to what supports it and says when something still needs checking."],
  [Lightbulb, "Teach the practice, not just the trick", "A clever prompt is not a durable skill. The goal is to help people understand the task, the limits, and the check that makes the output useful."],
  [UsersRound, "Leave the final call with people", "Technology can prepare, sort, summarize, or suggest. People remain responsible for a promise, a sensitive decision, and a public release."],
] as const;

function FieldLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p style={{ color: light ? "#D9B96D" : "#2E7A7D", fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

export default function HowBeaconWorksPage() {
  return <div data-how-v3="true" style={{ background: "var(--beacon-parchment)", color: "var(--beacon-charcoal)", minHeight: "100vh" }}>
    <SharedNav />
    <main id="main-content">
      <section className="how-hero"><div className="container"><FieldLabel light>How Beacon works</FieldLabel><h1>A practical way to use new tools without losing the thread.</h1><p>Beacon helps people and teams turn a fast-moving technology landscape into one clear next step at a time. No mystery language. No pressure to become someone else. Just useful work, made more visible.</p></div></section>
      <section className="how-steps"><div className="container"><div className="how-heading"><div><FieldLabel>Four moves that travel well</FieldLabel><h2>Start with the work. Keep the person.</h2></div><p>This is the simple rhythm beneath Beacon resources, The Watch, and our organization-facing work. The details change, but the care does not.</p></div><div className="how-step-grid">{steps.map(([number,title,body])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="how-principles"><div className="container"><FieldLabel light>What keeps the work honest</FieldLabel><h2>Useful technology needs a human home.</h2><div>{principles.map(([Icon,title,body])=><article key={title}><Icon aria-hidden="true" size={23}/><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="how-routes"><div className="container"><div><FieldLabel>Choose the right door</FieldLabel><h2>One family of work. Different places to continue.</h2></div><div><p>Beacon Momentum is the public place to begin. The Watch is the annual member practice. Beacon Labs serves organizations with separate inquiries and scoped projects. Other Beacon properties have their own roles, terms, and support paths.</p><p>No route assumes a shared account, a shared record, or an obligation to continue. You should know what a next step is before you take it.</p></div></div></section>
      <section className="how-closing"><div className="container"><CheckCircle2 aria-hidden="true" color="#D9B96D" size={27}/><FieldLabel light>Start with one visible job</FieldLabel><h2>You do not need a complete map to find your next bearing.</h2><p>The Readiness Map is free and useful on its own. If you want a year-long place to put the practice into motion, The Watch is ready when you are.</p><div><Link className="how-primary" href="/ReadinessMap">Get the free Readiness Map <ArrowRight size={16}/></Link><Link className="how-text" href="/the-watch">Review The Watch <ArrowRight size={15}/></Link></div></div></section>
    </main><SharedFooter />
    <style>{`
      [data-how-v3="true"] .how-hero { background: linear-gradient(125deg,#162433,#223345); color: var(--beacon-parchment); padding: clamp(5rem,10vw,8.5rem) 0; }[data-how-v3="true"] .how-hero .container { max-width: 1100px; }[data-how-v3="true"] .how-hero h1,[data-how-v3="true"] h2 { font-size: clamp(2.5rem,5.5vw,5.7rem); line-height: .98; margin: 1rem 0 0; max-width: 900px; }[data-how-v3="true"] .how-hero p { color: rgba(245,243,236,.78); font-size: 1.08rem; line-height: 1.78; margin: 1.6rem 0 0; max-width: 670px; }
      [data-how-v3="true"] .how-steps,[data-how-v3="true"] .how-routes { padding: clamp(4.5rem,9vw,8rem) 0; }[data-how-v3="true"] .how-heading,[data-how-v3="true"] .how-routes .container { align-items: end; display: grid; gap: clamp(2rem,8vw,7rem); grid-template-columns: minmax(0,1fr) minmax(0,.78fr); }[data-how-v3="true"] .how-heading > p,[data-how-v3="true"] .how-routes .container > div:nth-child(2) { color: var(--beacon-charcoal-mid); font-size: .99rem; line-height: 1.75; margin: 0; }[data-how-v3="true"] .how-routes .container > div:nth-child(2) p { margin: 0 0 1rem; }.how-step-grid { display: grid; gap: 1px; grid-template-columns: repeat(4,minmax(0,1fr)); margin-top: 3rem; }.how-step-grid article { background: #fffaf2; border: 1px solid var(--beacon-parchment-dark); min-height: 255px; padding: 1.5rem; }.how-step-grid span { color: var(--beacon-teal); font-family: var(--beacon-mono); font-size: .65rem; font-weight: 700; letter-spacing: .14em; }.how-step-grid h3 { font-size: 1.5rem; margin: 2rem 0 0; }.how-step-grid p { color: var(--beacon-charcoal-mid); font-size: .9rem; line-height: 1.7; margin: .75rem 0 0; }
      [data-how-v3="true"] .how-principles { background: var(--beacon-teal); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,8rem) 0; }[data-how-v3="true"] .how-principles h2 { margin-bottom: 3rem; }[data-how-v3="true"] .how-principles .container > div { display: grid; gap: 1px; grid-template-columns: repeat(3,minmax(0,1fr)); }.how-principles article { background: rgba(22,36,51,.25); border: 1px solid rgba(245,243,236,.2); min-height: 250px; padding: 1.7rem; }.how-principles article svg { color: var(--beacon-amber-light); }.how-principles article h3 { font-size: 1.5rem; margin: 1.2rem 0 0; }.how-principles article p { color: rgba(245,243,236,.78); font-size: .9rem; line-height: 1.72; margin: .75rem 0 0; }
      [data-how-v3="true"] .how-routes { background: var(--beacon-teal-pale); }.how-closing { background: linear-gradient(125deg,#223345,#162433); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,7.5rem) 0; }.how-closing .container { max-width: 1100px; }.how-closing h2 { margin-top: 1rem; }.how-closing p { color: rgba(245,243,236,.76); font-size: 1.04rem; line-height: 1.75; margin: 1.3rem 0 0; max-width: 690px; }.how-closing .container > div { align-items: center; display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }.how-primary { align-items: center; background: var(--beacon-amber); color: var(--beacon-charcoal); display: inline-flex; font-family: var(--beacon-ui); font-size: .76rem; font-weight: 800; gap: .5rem; letter-spacing: .06em; padding: 1rem 1.15rem; text-decoration: none; text-transform: uppercase; }.how-text { align-items: center; border-bottom: 1px solid rgba(245,243,236,.45); color: var(--beacon-parchment); display: inline-flex; font-size: .9rem; gap: .4rem; padding: .72rem 0; text-decoration: none; }
      @media(max-width:820px){[data-how-v3="true"] .how-heading,[data-how-v3="true"] .how-routes .container,.how-step-grid,[data-how-v3="true"] .how-principles .container > div{grid-template-columns:1fr;}}
    `}</style>
  </div>;
}
