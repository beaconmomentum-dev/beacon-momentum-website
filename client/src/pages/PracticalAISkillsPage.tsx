import { Activity, ArrowRight, BookOpen, FileCheck2, Gauge, GitBranch, ShieldCheck, Wrench } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const artifacts = [
  { icon: FileCheck2, title: "Skill Package", text: "A clear purpose, trigger, inputs, process, output contract, quality checks, and recovery path." },
  { icon: ShieldCheck, title: "Authority Map", text: "A visible distinction between work that may read, draft, propose, and execute." },
  { icon: Gauge, title: "Evaluation Set", text: "Representative test cases and evidence-based acceptance criteria—not a request to ‘make it better.’" },
  { icon: Activity, title: "Operational Evidence", text: "Run records, health signals, alerts, and rollback references that make the work reviewable." },
] as const;

const modules = [
  ["01", "The Skills Reality Check", "Separate prompts, templates, skills, routines, agents, tools, connectors, and harnesses."],
  ["02", "Find a Job Worth Turning Into a Skill", "Choose a narrow recurring workflow with a visible output and definition of done."],
  ["03", "Write the Skill Contract", "Build the seven-part package that makes a capability understandable and reusable."],
  ["04", "Context, Tools, and Authority", "Map sources, deterministic checks, boundaries, and the right execution lane."],
  ["05", "Evaluation Is Not Vibes", "Test for evidence, requirements, accessibility, and prohibited fabrication."],
  ["06", "Observe and Operate", "Turn a skill into a visible workflow with health states, logs, alerts, and recovery."],
  ["07", "Version and Improve", "Use change notes, release criteria, and trust records to keep the work useful."],
  ["08", "Phoenix Harness Starter", "Build a synthetic operations harness that proves the system can accept, reject, record, and recover."],
] as const;

export default function PracticalAISkillsPage() {
  usePageMeta({
    title: "Practical AI Skills — Beacon Momentum",
    description: "A project-based course for building AI skills and the harnesses that make them testable, observable, bounded, and useful.",
    url: "https://beaconmomentum.com/practical-ai-skills",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)", color: "var(--beacon-charcoal)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "#0B2A3B", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "1080px" }}>
            <p className="skills-eyebrow">Beacon Momentum · Practical Learning Series</p>
            <div className="skills-hero-grid">
              <div>
                <h1 className="skills-display">Build AI skills you can inspect, test, and trust.</h1>
                <p className="skills-lede">A project-based course for turning real work into reusable AI capabilities—without pretending that a prompt, a bot, or a webinar shortcut is the whole system.</p>
                <p className="skills-lede skills-lede--compact">Practical AI Skills teaches the capability <em>and</em> the harness around it: clear instructions, right-sized authority, tool boundaries, test cases, run logs, health signals, and a path for when the workflow fails.</p>
                <div className="skills-actions">
                  <Link href="/contact" className="skills-button skills-button--primary">Ask about course availability <ArrowRight size={16} /></Link>
                  <a href="#harness" className="skills-button skills-button--quiet">Explore the harness</a>
                </div>
                <p className="skills-caption">Planned Core program: <strong>$297</strong>. Self-paced learning. No income claims, no artificial countdown, and no promise of personal access to the founder.</p>
              </div>
              <aside className="skills-blueprint" aria-label="Skill to harness workflow diagram">
                <p className="skills-blueprint-label">The operating chain</p>
                <div className="skills-blueprint-step"><span>01</span><strong>Prompt</strong><small>A single instruction</small></div>
                <div className="skills-blueprint-line" />
                <div className="skills-blueprint-step"><span>02</span><strong>Skill</strong><small>A reusable capability package</small></div>
                <div className="skills-blueprint-line" />
                <div className="skills-blueprint-step"><span>03</span><strong>Harness</strong><small>Authority, evidence, signals, recovery</small></div>
                <div className="skills-blueprint-line" />
                <div className="skills-blueprint-step"><span>04</span><strong>Workflow</strong><small>Observed work with a clear outcome</small></div>
              </aside>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <p className="skills-kicker">The practical difference</p>
            <h2 className="skills-heading">The internet calls many things a skill. The missing question is whether it can be operated responsibly.</h2>
            <p className="skills-copy">A prompt, template folder, scheduled routine, or cloud bot can be useful. None automatically tells you what the system may touch, what a correct outcome is, whether it has been tested, or what happens when it fails. Practical AI Skills teaches the operating method that turns a promising demonstration into a capability you can explain and improve.</p>
            <div className="skills-contrast">
              <div><p className="skills-mini-label">Typical shortcut</p><ul><li>Copy this prompt</li><li>Install this skill</li><li>Launch this agent</li><li>Add a critic</li><li>Automate the task</li></ul></div>
              <div><p className="skills-mini-label">Practical AI Skills</p><ul><li>Define the job, inputs, constraints, and output contract</li><li>Inspect provenance, resources, tools, and dependencies</li><li>Choose read, draft, propose, or execute authority</li><li>Write a rubric and collect independent evidence</li><li>Log runs, surface health, and retain a recovery reference</li></ul></div>
            </div>
          </div>
        </section>

        <section style={{ background: "#E6DDD0", padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "1080px" }}>
            <p className="skills-kicker">What you build</p>
            <h2 className="skills-heading">Working artifacts, not a folder of borrowed prompts.</h2>
            <div className="skills-artifact-grid">{artifacts.map(({ icon: Icon, title, text }) => <article key={title} className="skills-artifact"><div className="skills-icon"><Icon size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "1080px" }}>
            <p className="skills-kicker">The curriculum</p>
            <h2 className="skills-heading">Eight modules. A usable method. One observable capstone.</h2>
            <div className="skills-module-grid">{modules.map(([number, title, text]) => <article key={number} className="skills-module"><p>{number}</p><h3>{title}</h3><span>{text}</span></article>)}</div>
          </div>
        </section>

        <section id="harness" style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4.5rem, 8vw, 7.5rem) 0" }}>
          <div className="container skills-harness" style={{ maxWidth: "1080px" }}>
            <div><p className="skills-eyebrow">Capstone build-along</p><h2 className="skills-display skills-display--section">The Phoenix Harness Starter.</h2><p className="skills-lede">Most courses stop when a prompt returns a good answer. This course continues until the work can be observed, constrained, tested, and recovered.</p><p className="skills-lede skills-lede--compact">Learners build a sanitized, open-source operations harness around a fictional Field Lab. It includes synthetic resources, signed local telemetry, authority lanes, task records, health trends, audit history, and controlled failure drills.</p><div className="skills-actions"><Link href="/the-watch/controlled-ai-workflow-kit" className="skills-button skills-button--primary">View the workflow kit <ArrowRight size={16} /></Link><a href="https://phoenixdash-genepdk4.manus.space" className="skills-button skills-button--quiet" target="_blank" rel="noreferrer">See the Phoenix control plane</a></div></div>
            <div className="skills-harness-panel"><div><BookOpen size={19} /><span>Skill package</span><small>Purpose, sources, checks, recovery</small></div><div><Wrench size={19} /><span>Authority map</span><small>Read, draft, propose, execute</small></div><div><GitBranch size={19} /><span>Evidence trail</span><small>Runs, outcomes, and references</small></div><div><Activity size={19} /><span>Health and trend</span><small>Signed snapshots and honest states</small></div></div>
          </div>
        </section>

        <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <p className="skills-kicker">A grounded learning promise</p>
            <h2 className="skills-heading">The work stays useful when the platform changes.</h2>
            <p className="skills-copy">Model names, interfaces, and connector menus will change. The durable parts of the work do not: defining a job, setting boundaries, testing outputs, observing runs, retaining evidence, and improving a version over time.</p>
            <div className="skills-faq"><details><summary>Do I need to be a developer?</summary><p>No. The early modules teach the operating method in plain language. The capstone begins with inspection and configuration, then offers an extension path for learners who want to work in code.</p></details><details><summary>Does this teach a fully autonomous business?</summary><p>No. It teaches bounded, observable AI capabilities for real work. The learner remains responsible for choosing appropriate authority, review, and recovery controls.</p></details><details><summary>Is the Phoenix capstone connected to Beacon’s production systems?</summary><p>No. The learner starter uses a fictional environment, synthetic telemetry, local configuration, and no production credentials or private audit data.</p></details><details><summary>Will I receive ready-made skills?</summary><p>You will receive examples and templates, but the central outcome is a method for creating, testing, adapting, and maintaining skills in your own context.</p></details></div>
            <div className="skills-final"><p>Build the skill. Build the harness. Keep the evidence.</p><Link href="/contact" className="skills-button skills-button--primary">Ask about Practical AI Skills <ArrowRight size={16} /></Link></div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .skills-eyebrow,.skills-kicker,.skills-mini-label{margin:0;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase}.skills-kicker{color:var(--beacon-teal)}.skills-hero-grid,.skills-harness{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr);gap:clamp(2.5rem,6vw,6rem);align-items:center}.skills-display{max-width:850px;margin:1rem 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3.4rem,7vw,6.4rem);font-weight:600;letter-spacing:-.05em;line-height:.9}.skills-display--section{font-size:clamp(3rem,6vw,5.5rem)}.skills-lede{max-width:720px;margin:1.75rem 0 0;color:rgba(250,248,244,.8);font-family:'Lora',Georgia,serif;font-size:1.08rem;line-height:1.85}.skills-lede--compact{font-size:.96rem}.skills-actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.skills-button{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;border:1px solid var(--beacon-amber-light);padding:.88rem 1.1rem;font-family:'Outfit',system-ui,sans-serif;font-size:.73rem;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}.skills-button--primary{background:var(--beacon-amber-light);color:#0B2A3B}.skills-button--quiet{background:transparent;color:var(--beacon-amber-light)}.skills-caption{max-width:660px;margin:1rem 0 0;color:rgba(250,248,244,.55);font-family:'Outfit',system-ui,sans-serif;font-size:.74rem;line-height:1.6}.skills-blueprint{border:1px solid rgba(233,188,82,.45);background:rgba(255,255,255,.03);padding:1.5rem}.skills-blueprint-label{margin:0 0 1rem;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.skills-blueprint-step{display:grid;grid-template-columns:2rem 1fr;column-gap:.75rem;align-items:baseline}.skills-blueprint-step span{grid-row:span 2;color:var(--beacon-amber-light);font-family:monospace;font-size:.72rem}.skills-blueprint-step strong{font-family:'Outfit',system-ui,sans-serif;font-size:.95rem}.skills-blueprint-step small{color:rgba(250,248,244,.62);font-family:'Lora',Georgia,serif;font-size:.78rem;line-height:1.5}.skills-blueprint-line{height:1.25rem;border-left:1px solid rgba(233,188,82,.5);margin-left:.95rem}.skills-heading{max-width:840px;margin:.8rem 0 0;color:var(--beacon-charcoal);font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.35rem,4.8vw,4.5rem);font-weight:600;letter-spacing:-.04em;line-height:.98}.skills-copy{max-width:780px;margin:1.35rem 0 0;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:1rem;line-height:1.9}.skills-contrast{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem;margin-top:3rem}.skills-contrast>div{padding:1.75rem;border:1px solid var(--beacon-parchment-dark);background:#FAF8F4}.skills-contrast>div:last-child{border-color:var(--beacon-teal);background:#E7F0ED}.skills-contrast ul{display:grid;gap:.7rem;padding:0;margin:1rem 0 0;list-style:none;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.92rem;line-height:1.55}.skills-contrast li{display:flex;gap:.55rem}.skills-contrast li:before{content:'—';color:var(--beacon-amber);font-weight:700}.skills-artifact-grid,.skills-module-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-top:2.5rem}.skills-artifact{padding:1.5rem;border:1px solid rgba(11,42,59,.18);background:#F7F1E5}.skills-icon{display:grid;place-items:center;width:2.6rem;height:2.6rem;background:var(--beacon-teal);color:#FAF8F4}.skills-artifact h3,.skills-module h3{margin:1.1rem 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.55rem;line-height:1.05}.skills-artifact p,.skills-module span{margin:.65rem 0 0;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.86rem;line-height:1.65}.skills-module{padding:1.35rem 0;border-top:1px solid var(--beacon-parchment-dark)}.skills-module p{margin:0;color:var(--beacon-teal);font-family:'Outfit',system-ui,sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.12em}.skills-module h3{font-size:1.45rem}.skills-harness-panel{display:grid;gap:1px;background:rgba(233,188,82,.4);border:1px solid rgba(233,188,82,.4)}.skills-harness-panel>div{display:grid;grid-template-columns:1.8rem 1fr;column-gap:.65rem;padding:1rem;background:#102F38}.skills-harness-panel svg{color:var(--beacon-amber-light);grid-row:span 2}.skills-harness-panel span{font-family:'Outfit',system-ui,sans-serif;font-size:.85rem;font-weight:700}.skills-harness-panel small{color:rgba(250,248,244,.62);font-family:'Lora',Georgia,serif;font-size:.75rem;line-height:1.45}.skills-faq{display:grid;gap:.75rem;margin-top:2.5rem}.skills-faq details{border:1px solid var(--beacon-parchment-dark);background:#FAF8F4;padding:1rem 1.15rem}.skills-faq summary{cursor:pointer;color:var(--beacon-charcoal);font-family:'Outfit',system-ui,sans-serif;font-size:.9rem;font-weight:700}.skills-faq p{margin:1rem 0 .1rem;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.9rem;line-height:1.7}.skills-final{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.25rem;margin-top:3rem;padding:1.5rem;border:1px solid var(--beacon-teal);background:#E7F0ED}.skills-final p{margin:0;color:var(--beacon-charcoal);font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.55rem,3vw,2.1rem);font-weight:600}@media(max-width:850px){.skills-hero-grid,.skills-harness{grid-template-columns:1fr}.skills-artifact-grid,.skills-module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.skills-contrast,.skills-artifact-grid,.skills-module-grid{grid-template-columns:1fr}.skills-display{font-size:clamp(3rem,14vw,4.5rem)}.skills-final{align-items:flex-start;flex-direction:column}.skills-button{width:100%}}
      `}</style>
    </div>
  );
}
