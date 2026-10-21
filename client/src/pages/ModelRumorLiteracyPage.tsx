import { ArrowRight, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const claimCategories = [
  ["First-party fact", "An official release, model card, technical paper, pricing page, or documented interface."],
  ["Independent observation", "A named evaluator reports enough method and evidence for someone else to inspect."],
  ["Reported claim", "A publication or anonymous source is cited, but the underlying test cannot be inspected."],
  ["Hypothetical example", "An illustration of what a model might do, not a record of what it did."],
  ["Speculation", "A guess about a model name, release, capability, or future event."],
  ["Vendor benchmark", "A provider-supplied score that still needs benchmark definitions and conditions."],
  ["User anecdote", "A personal experience that may suggest a test but cannot establish general performance."],
] as const;

const worksheetFields = [
  "Exact claim, written without hype wording",
  "Entity and model identifier, including version or unknown",
  "Source, date, and source category",
  "Evidence needed to verify the statement",
  "Missing conditions: tools, prompt, sample size, cost, and human intervention",
  "Current verdict and the evidence that would change it",
] as const;

export default function ModelRumorLiteracyPage() {
  usePageMeta({
    title: "The Model Rumor Is Not the Model",
    description:
      "A Beacon Labs media-literacy exercise for separating AI rumors, benchmarks, anecdotes, demonstrations, and evidence before making a tool decision.",
    url: "https://beaconmomentum.com/labs/the-model-rumor-is-not-the-model",
    type: "article",
  });

  return (
    <div className="model-rumor-page">
      <SharedNav />
      <main id="main-content">
        <section className="model-rumor-hero">
          <div className="container model-rumor-hero-inner">
            <div>
              <p className="model-rumor-eyebrow">Beacon Labs · Media Literacy</p>
              <h1>The Model Rumor Is Not the Model.</h1>
              <p className="model-rumor-deck">
                A practical exercise for reading frontier-model claims without mistaking a compelling story for a completed evaluation.
              </p>
              <div className="model-rumor-actions">
                <a href="#exercise" className="model-rumor-button model-rumor-button-primary">Start the exercise <ArrowRight size={16} /></a>
                <Link href="/signal" className="model-rumor-button model-rumor-button-quiet">Read The Signal <ArrowRight size={16} /></Link>
              </div>
            </div>
            <aside className="model-rumor-callout" aria-label="The Beacon Labs rule">
              <ShieldCheck size={22} aria-hidden="true" />
              <p className="model-rumor-callout-label">The Beacon Labs rule</p>
              <p className="model-rumor-callout-quote">A model rumor can be worth watching. It is not yet a model evaluation.</p>
            </aside>
          </div>
        </section>

        <section className="model-rumor-intro">
          <div className="container model-rumor-reading-grid">
            <article className="model-rumor-body">
              <p className="model-rumor-lede">A new model is rumored to reason better. A benchmark says another model is faster. A video claims a third can run a business for you.</p>
              <p>The claims may be interesting. They are not all the same kind of evidence.</p>
              <p>This exercise teaches you to separate what is known, what is reported, what is hypothetical, what is vendor-controlled, and what would need to be tested before it becomes useful for a real decision.</p>

              <section id="exercise" aria-labelledby="extract-heading">
                <p className="model-rumor-section-label">Part 1</p>
                <h2 id="extract-heading">Extract the claims.</h2>
                <p>Read a hype-heavy transcript once without checking the internet. Underline every factual proposition, then split the story into claims small enough for one source to support or contradict.</p>
                <div className="model-rumor-example">
                  <p>Do not write: <strong>“The new model is better.”</strong></p>
                  <p>Write: <strong>“The model asked for permission before making a wider code change.”</strong></p>
                </div>
                <ul className="model-rumor-checklist">
                  <li><CheckCircle2 size={18} /> An unreleased model exists.</li>
                  <li><CheckCircle2 size={18} /> A tester used it.</li>
                  <li><CheckCircle2 size={18} /> It identified a broader class of coding problems.</li>
                  <li><CheckCircle2 size={18} /> It asked before widening the change.</li>
                  <li><CheckCircle2 size={18} /> It generated a claimed financial or business result.</li>
                </ul>
              </section>

              <section aria-labelledby="classify-heading">
                <p className="model-rumor-section-label">Part 2</p>
                <h2 id="classify-heading">Classify the evidence.</h2>
                <p>Place each claim into one category. The same sentence may contain more than one category, so split it again when necessary.</p>
                <div className="model-rumor-category-grid">
                  {claimCategories.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
                </div>
              </section>

              <section aria-labelledby="ledger-heading">
                <p className="model-rumor-section-label">Part 3</p>
                <h2 id="ledger-heading">Build the claim ledger.</h2>
                <p>For every claim, record enough context that another person could inspect your reasoning later.</p>
                <div className="model-rumor-ledger" role="list">
                  {worksheetFields.map((field, index) => <div key={field} className="model-rumor-ledger-row" role="listitem"><span>{String(index + 1).padStart(2, "0")}</span><strong>{field}</strong></div>)}
                </div>
              </section>

              <section aria-labelledby="benchmark-heading">
                <p className="model-rumor-section-label">Part 4</p>
                <h2 id="benchmark-heading">Repair the benchmark claim.</h2>
                <p>Rewrite one benchmark statement using this pattern:</p>
                <blockquote>
                  On <strong>[benchmark name and version]</strong>, under <strong>[test conditions]</strong>, <strong>[model/version]</strong> reportedly scored <strong>[number]</strong>, according to <strong>[source]</strong>. The result is not directly comparable with <strong>[comparison]</strong> unless <strong>[missing conditions]</strong> are matched.
                </blockquote>
                <p>If a field is unknown, write “not disclosed.” Do not replace a missing fact with a guess.</p>
              </section>

              <section aria-labelledby="autonomy-heading">
                <p className="model-rumor-section-label">Part 5</p>
                <h2 id="autonomy-heading">Separate capability from autonomy.</h2>
                <p>Discuss the difference between noticing a related issue, proposing a broader fix, asking for authorization, making the change, testing it, deploying it, and accepting responsibility for the result.</p>
                <p>A model may be strong at the first two and still be unsafe at the last four. Design a control sequence in which the agent may investigate but cannot widen scope or change production without explicit approval.</p>
              </section>

              <section aria-labelledby="conclusion-heading">
                <p className="model-rumor-section-label">Part 6</p>
                <h2 id="conclusion-heading">Write the calibrated conclusion.</h2>
                <p>Write about 150 words covering three levels:</p>
                <ol className="model-rumor-numbered-list">
                  <li>What the source supports.</li>
                  <li>What the source does not support.</li>
                  <li>What should happen next.</li>
                </ol>
                <p>Do not use “revolutionary,” “human intuition,” “best,” “autonomous,” or “will make money” unless you define the evidence that would justify the word.</p>
              </section>
            </article>

            <aside className="model-rumor-aside">
              <div className="model-rumor-aside-card">
                <ClipboardList size={20} aria-hidden="true" />
                <p className="model-rumor-section-label">Use this before</p>
                <h2>Buying the tool. Repeating the claim. Widening the authority.</h2>
                <p>Rumor can be a reason to watch. It is not a reason to grant access.</p>
              </div>
              <div className="model-rumor-aside-card model-rumor-aside-card-dark">
                <p className="model-rumor-section-label">The next step</p>
                <h2>Small. Reversible. Instrumented.</h2>
                <p>Test the behavior in a bounded environment with a human approval gate.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="model-rumor-close">
          <div className="container">
            <p className="model-rumor-eyebrow">Beacon operating rule</p>
            <h2>A compelling anecdote can suggest a test. It cannot replace the test.</h2>
            <p>Use the worksheet, keep the uncertainty visible, and let the evidence earn the next permission.</p>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .model-rumor-page{min-height:100vh;background:var(--beacon-parchment);color:var(--beacon-charcoal)}
        .model-rumor-hero{background:#0B2A3B;color:#FAF8F4;padding:clamp(4.5rem,9vw,8rem) 0}
        .model-rumor-hero-inner{max-width:1120px;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.52fr);gap:clamp(2rem,7vw,7rem);align-items:end}
        .model-rumor-eyebrow,.model-rumor-section-label{margin:0;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
        .model-rumor-hero h1{max-width:760px;margin:1rem 0 0;font-size:clamp(3.2rem,7vw,6.7rem);line-height:.9;letter-spacing:-.055em}
        .model-rumor-deck{max-width:650px;margin:1.5rem 0 0;color:rgba(250,248,244,.76);font-size:1.08rem;line-height:1.8}
        .model-rumor-actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem}
        .model-rumor-button{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1rem;border:1px solid rgba(250,248,244,.28);font-family:'Outfit',system-ui,sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase}
        .model-rumor-button-primary{background:var(--beacon-amber);border-color:var(--beacon-amber);color:#102A35}.model-rumor-button-quiet{color:#FAF8F4}
        .model-rumor-callout{border-top:3px solid var(--beacon-amber);padding-top:1.2rem}.model-rumor-callout-label{margin:1rem 0 0;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase}.model-rumor-callout-quote{margin:.7rem 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;line-height:1.05}
        .model-rumor-intro{padding:clamp(4rem,8vw,7rem) 0}.model-rumor-reading-grid{max-width:1080px;display:grid;grid-template-columns:minmax(0,1fr) minmax(230px,.34fr);gap:clamp(2.5rem,8vw,7rem)}
        .model-rumor-body{font-family:'Lora',Georgia,serif;color:var(--beacon-charcoal-mid);font-size:1.03rem;line-height:1.86}.model-rumor-body p{margin:0 0 1.25rem}.model-rumor-lede{font-family:'Cormorant Garamond',Georgia,serif;color:var(--beacon-charcoal);font-size:clamp(1.7rem,3vw,2.35rem);line-height:1.2}.model-rumor-body section{margin-top:4rem}.model-rumor-body h2{margin:.7rem 0 1rem;color:var(--beacon-charcoal);font-size:clamp(2rem,4vw,3.2rem);line-height:1.02;letter-spacing:-.03em}.model-rumor-body h3{margin:0;color:var(--beacon-charcoal);font-family:'Outfit',system-ui,sans-serif;font-size:1rem;line-height:1.25}.model-rumor-example{margin:1.5rem 0;padding:1.2rem 1.3rem;border-left:4px solid var(--beacon-amber);background:var(--beacon-amber-pale);font-size:.96rem}.model-rumor-example p{margin:0 0 .45rem}.model-rumor-example p:last-child{margin:0}.model-rumor-checklist{display:grid;gap:.8rem;margin:1.5rem 0;padding:0;list-style:none}.model-rumor-checklist li{display:flex;gap:.6rem;align-items:flex-start}.model-rumor-checklist svg{flex:none;margin-top:.25rem;color:var(--beacon-teal)}.model-rumor-category-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;margin-top:1.5rem;background:var(--beacon-parchment-dark)}.model-rumor-category-grid article{padding:1.2rem;background:#fff}.model-rumor-category-grid p{margin:.45rem 0 0;font-size:.87rem;line-height:1.55}.model-rumor-ledger{margin-top:1.5rem;border-top:2px solid var(--beacon-teal)}.model-rumor-ledger-row{display:grid;grid-template-columns:3rem 1fr;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--beacon-parchment-dark)}.model-rumor-ledger-row span{color:var(--beacon-teal);font-family:'Outfit',system-ui,sans-serif;font-size:.76rem;font-weight:700;letter-spacing:.1em}.model-rumor-ledger-row strong{color:var(--beacon-charcoal);font-family:'Outfit',system-ui,sans-serif;font-size:.9rem;line-height:1.4}.model-rumor-body blockquote{margin:1.5rem 0;padding:1.4rem 1.5rem;border-left:4px solid var(--beacon-teal);background:#fff;color:var(--beacon-charcoal);font-size:1rem}.model-rumor-numbered-list{padding-left:1.25rem}.model-rumor-numbered-list li{padding:.35rem 0}.model-rumor-aside{align-self:start;position:sticky;top:96px}.model-rumor-aside-card{padding:1.5rem;border-top:3px solid var(--beacon-amber);background:#fff}.model-rumor-aside-card h2{margin:.8rem 0;font-size:1.75rem;line-height:1.05;color:var(--beacon-charcoal)}.model-rumor-aside-card p{font-family:'Lora',Georgia,serif;color:var(--beacon-charcoal-mid);line-height:1.7}.model-rumor-aside-card-dark{margin-top:1rem;background:#17353C;border-color:var(--beacon-teal);color:#FAF8F4}.model-rumor-aside-card-dark h2,.model-rumor-aside-card-dark p{color:#FAF8F4}.model-rumor-close{background:#17353C;color:#FAF8F4;padding:clamp(4rem,8vw,7rem) 0}.model-rumor-close .container{max-width:900px}.model-rumor-close h2{max-width:780px;margin:.8rem 0 1rem;font-size:clamp(2.5rem,5vw,5rem);line-height:.96;letter-spacing:-.04em}.model-rumor-close p:last-child{max-width:650px;color:rgba(250,248,244,.72);font-family:'Lora',Georgia,serif;font-size:1.08rem;line-height:1.8}
        @media(max-width:820px){.model-rumor-hero-inner,.model-rumor-reading-grid{grid-template-columns:1fr!important}.model-rumor-aside{position:static}.model-rumor-category-grid{grid-template-columns:1fr}.model-rumor-hero h1{font-size:clamp(3rem,15vw,5rem)}}
      `}</style>
    </div>
  );
}
