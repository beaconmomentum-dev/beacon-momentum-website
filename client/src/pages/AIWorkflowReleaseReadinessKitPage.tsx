import { FormEvent, useState } from "react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { usePageMeta } from "@/hooks/usePageMeta";

type FormStatus = "idle" | "submitting" | "success" | "error";

const audienceOptions = [
  ["independent_professional", "Independent professional"],
  ["small_team_operator", "Small-team operator"],
  ["agency_or_studio", "Agency or studio"],
  ["internal_builder", "Internal builder"],
  ["educator_or_researcher", "Educator or researcher"],
  ["other", "Other"],
] as const;

const stageOptions = [
  ["testing_ideas", "Testing ideas"],
  ["occasional_use", "Using it occasionally"],
  ["weekly_use", "Using it weekly"],
  ["frequent_cautious_use", "Using it frequently, but cautiously"],
] as const;

const paidIntentOptions = [
  ["yes", "Yes"],
  ["possibly", "Possibly, depending on final scope"],
  ["not_now", "Not at this time"],
] as const;

function readUtmValue(name: string) {
  return new URLSearchParams(window.location.search).get(name) || undefined;
}

export default function AIWorkflowReleaseReadinessKitPage() {
  usePageMeta({
    title: "AI Workflow Release Readiness Kit — Beacon Momentum",
    description:
      "A self-guided field-test kit for defining the boundaries, acceptance checks, evidence, and recovery path of one recurring AI workflow.",
    url: "https://beaconmomentum.com/ai-workflow-release-readiness-kit",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    audience: "",
    workflow: "",
    challenge: "",
    stage: "",
    paidIntent: "",
    followUpConsent: false,
  });

  const update = (field: keyof typeof form, value: string | boolean) => {
    setForm(current => ({ ...current, [field]: value }));
  };

  const requiredReady = Boolean(
    form.email && form.audience && form.workflow.trim().length >= 15 && form.challenge.trim().length >= 15 && form.stage && form.paidIntent && form.followUpConsent,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requiredReady) {
      setError("Please complete each required field and confirm the specific follow-up permission.");
      return;
    }

    setStatus("submitting");
    setError("");
    const payload = {
      event: "readiness_kit_beta_interest" as const,
      email: form.email,
      firstName: form.firstName || undefined,
      audience: form.audience,
      workflow: form.workflow.trim(),
      challenge: form.challenge.trim(),
      stage: form.stage,
      paidIntent: form.paidIntent,
      followUpConsent: true,
      consentVersion: "ai-workflow-readiness-kit-v1",
      utmSource: readUtmValue("utm_source"),
      utmMedium: readUtmValue("utm_medium"),
      utmCampaign: readUtmValue("utm_campaign"),
      utmContent: readUtmValue("utm_content"),
    };

    try {
      const response = await fetch("/api/trpc/capture.submit?batch=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "0": { json: payload } }),
      });
      if (!response.ok) throw new Error(`Capture relay ${response.status}`);
      setSubmittedEmail(form.email);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We could not receive your request right now. Please try again later or email support@beaconmomentum.com.");
    }
  }

  return (
    <div className="readiness-page">
      <SharedNav />
      <main id="main-content">
        <section className="readiness-hero">
          <div className="container readiness-hero__grid">
            <div>
              <p className="readiness-kicker">Beacon Momentum · Practical AI Skills field test</p>
              <h1>Before you rely on an AI workflow, can you show how it works when something goes wrong?</h1>
              <p className="readiness-lede">The AI Workflow Release Readiness Kit is a self-guided beta for one recurring AI-assisted task. It helps you define the job, set its boundaries, test the output, retain useful evidence, and decide what needs improvement before the workflow becomes routine.</p>
              <p className="readiness-price">Planned beta: <strong>$49</strong>. Requesting the brief is not a purchase and does not enroll you in a broader list.</p>
              <a className="readiness-button readiness-button--primary" href="#request-beta">Request the beta brief</a>
              <p className="readiness-caption">One email with the exact scope and availability details. No countdown, income claim, or promise of personal access.</p>
            </div>
            <aside className="readiness-signal" aria-label="Readiness signal diagram">
              <p>Readiness signal</p>
              <dl>
                <div><dt>01</dt><dd><strong>Job</strong><span>Can you name the repeated work and its outcome?</span></dd></div>
                <div><dt>02</dt><dd><strong>Boundary</strong><span>Can you say what the workflow may and may not do?</span></dd></div>
                <div><dt>03</dt><dd><strong>Evidence</strong><span>Can you inspect the output and the decision record?</span></dd></div>
                <div><dt>04</dt><dd><strong>Recovery</strong><span>Can you recognize a failed run and respond deliberately?</span></dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="readiness-section">
          <div className="container readiness-copy">
            <p className="readiness-kicker readiness-kicker--dark">The question underneath the prompt</p>
            <h2>A useful answer is not automatically a workflow you can rely on.</h2>
            <p>A prompt, template, or agent can produce helpful work. That does not show what it used, what action it may take, how a correct result is defined, or what happens when an input is missing, a request is unclear, or the result does not meet the standard.</p>
            <p>The question is not whether AI can perform a task once. The question is whether you can <strong>inspect, test, and recover</strong> the work when it matters.</p>
          </div>
        </section>

        <section className="readiness-section readiness-section--sand">
          <div className="container">
            <p className="readiness-kicker readiness-kicker--dark">Six practical tools</p>
            <h2 className="readiness-heading">A small kit for one recurring workflow.</h2>
            <div className="readiness-tools">
              <article><strong>Readiness Canvas</strong><span>Name the workflow, intended outcome, inputs, owner, and boundary.</span></article>
              <article><strong>Skill Contract</strong><span>Define the job, process, output, quality checks, and recovery reference.</span></article>
              <article><strong>Authority Map</strong><span>Separate work the workflow may read, draft, propose, and execute.</span></article>
              <article><strong>Acceptance Check</strong><span>Write evidence-based criteria for “good enough to use.”</span></article>
              <article><strong>Minimal Run Log</strong><span>Retain what was attempted, what happened, and what needs review.</span></article>
              <article><strong>Failure Drills</strong><span>Test a missing input, unclear request, and unsupported action before widening use.</span></article>
            </div>
            <p className="readiness-boundary">The kit uses fictional or local examples. It does not connect to Beacon production systems, require credentials, or include private operational records.</p>
          </div>
        </section>

        <section className="readiness-section">
          <div className="container readiness-split">
            <div>
              <p className="readiness-kicker readiness-kicker--dark">Right-sized use</p>
              <h2>Use this if one AI-assisted task keeps coming back.</h2>
              <p>It is for independent professionals, small teams, and builders with a recurring, non-consequential task who need clearer operating boundaries before they depend on it more often.</p>
            </div>
            <aside className="readiness-not-for"><strong>Not for consequential decisions</strong><span>It is not for legal, medical, investment, tax, employment, lending, safety, or other consequential decisions. It is not a substitute for professional compliance, security, or domain-specific review.</span></aside>
          </div>
        </section>

        <section id="request-beta" className="readiness-request">
          <div className="container readiness-request__grid">
            <div>
              <p className="readiness-kicker">A small field test</p>
              <h2>Request the beta brief.</h2>
              <p>Tell us about one recurring AI-assisted workflow. The planned self-guided beta is <strong>$49</strong>. Submitting this form requests the exact scope and availability details; it does not make a purchase.</p>
              <p className="readiness-request__small">Please describe the task, not confidential information. Do not submit credentials, client names, sensitive personal information, or regulated data.</p>
              <Link className="readiness-text-link" href="/practical-ai-skills">Explore the Practical AI Skills method</Link>
            </div>

            <div className="readiness-form-wrap">
              {status === "success" ? (
                <div className="readiness-success" role="status" aria-live="polite">
                  <p className="readiness-kicker readiness-kicker--dark">Request recorded</p>
                  <h3>Your beta-brief request is recorded.</h3>
                  <p>We will send the exact self-guided beta scope to <strong>{submittedEmail}</strong>. That email will restate the planned $49 price, delivery format, and boundaries before any purchase decision is requested.</p>
                  <Link className="readiness-button readiness-button--dark" href="/practical-ai-skills">Explore Practical AI Skills</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="readiness-first-name">First name <span>Optional</span></label>
                  <input id="readiness-first-name" type="text" autoComplete="given-name" value={form.firstName} onChange={event => update("firstName", event.target.value)} />

                  <label htmlFor="readiness-email">Email address <b>Required</b></label>
                  <input id="readiness-email" type="email" autoComplete="email" required value={form.email} onChange={event => update("email", event.target.value)} />

                  <label htmlFor="readiness-audience">Which description is closest? <b>Required</b></label>
                  <select id="readiness-audience" required value={form.audience} onChange={event => update("audience", event.target.value)}>
                    <option value="">Select one</option>
                    {audienceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>

                  <label htmlFor="readiness-workflow">What recurring AI-assisted workflow are you considering? <b>Required</b></label>
                  <textarea id="readiness-workflow" required rows={4} value={form.workflow} onChange={event => update("workflow", event.target.value)} />
                  <p className="readiness-field-help">Example: Turn approved research notes into a first client-update draft.</p>

                  <label htmlFor="readiness-challenge">What makes this workflow difficult to rely on today? <b>Required</b></label>
                  <textarea id="readiness-challenge" required rows={4} value={form.challenge} onChange={event => update("challenge", event.target.value)} />
                  <p className="readiness-field-help">For example: unclear inputs, inconsistent quality, no review record, uncertain authority, or no recovery path.</p>

                  <label htmlFor="readiness-stage">Which stage fits you now? <b>Required</b></label>
                  <select id="readiness-stage" required value={form.stage} onChange={event => update("stage", event.target.value)}>
                    <option value="">Select one</option>
                    {stageOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>

                  <fieldset>
                    <legend>Would you consider the exact self-guided beta described above at $49? <b>Required</b></legend>
                    {paidIntentOptions.map(([value, label]) => <label className="readiness-radio" key={value}><input type="radio" name="paidIntent" value={value} checked={form.paidIntent === value} onChange={event => update("paidIntent", event.target.value)} /> <span>{label}</span></label>)}
                  </fieldset>

                  <label className="readiness-consent"><input type="checkbox" checked={form.followUpConsent} onChange={event => update("followUpConsent", event.target.checked)} required /> <span>Yes. Beacon Momentum may email me the requested beta brief and one availability follow-up about this specific kit. I understand that I can unsubscribe at any time.</span></label>

                  {status === "error" && <p className="readiness-error" role="alert">{error}</p>}
                  <button className="readiness-button readiness-button--submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending your request…" : "Send my beta brief"}</button>
                  <p className="readiness-form-note">By submitting, you confirm that your description does not include confidential client information, credentials, or sensitive personal data. Beacon Momentum will use this submission to respond to the requested inquiry and record the source of your interest. See the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .readiness-page{min-height:100vh;background:var(--beacon-parchment);color:var(--beacon-charcoal)}
        .readiness-hero{background:#0B2A3B;color:#FAF8F4;padding:clamp(4.75rem,9vw,8.5rem) 0}.readiness-hero__grid,.readiness-request__grid,.readiness-split{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(280px,.8fr);gap:clamp(2rem,6vw,5.5rem);align-items:start}.readiness-kicker{margin:0;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase}.readiness-kicker--dark{color:var(--beacon-teal)}.readiness-hero h1,.readiness-heading,.readiness-copy h2,.readiness-split h2,.readiness-request h2{margin:1rem 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3.1rem,6.2vw,5.8rem);font-weight:600;letter-spacing:-.05em;line-height:.93}.readiness-heading,.readiness-copy h2,.readiness-split h2{font-size:clamp(2.4rem,4.7vw,4.35rem)}.readiness-lede{max-width:740px;margin:1.75rem 0 0;color:rgba(250,248,244,.83);font-family:'Lora',Georgia,serif;font-size:1.08rem;line-height:1.85}.readiness-price,.readiness-caption{max-width:690px;margin:1rem 0 0;color:rgba(250,248,244,.68);font-family:'Lora',Georgia,serif;font-size:.88rem;line-height:1.65}.readiness-button{display:inline-flex;align-items:center;justify-content:center;margin-top:2rem;border:1px solid var(--beacon-amber-light);padding:.92rem 1.1rem;font-family:'Outfit',system-ui,sans-serif;font-size:.73rem;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase;cursor:pointer}.readiness-button--primary{background:var(--beacon-amber-light);color:#0B2A3B}.readiness-signal{border:1px solid rgba(233,188,82,.45);background:rgba(255,255,255,.03);padding:1.35rem}.readiness-signal>p{margin:0 0 1.1rem;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.67rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.readiness-signal dl{display:grid;gap:1.15rem;margin:0}.readiness-signal dl>div{display:grid;grid-template-columns:2rem 1fr;gap:.65rem}.readiness-signal dt{color:var(--beacon-amber-light);font-family:monospace;font-size:.74rem}.readiness-signal dd{display:grid;gap:.22rem;margin:0}.readiness-signal strong{font-family:'Outfit',system-ui,sans-serif;font-size:.9rem}.readiness-signal span{color:rgba(250,248,244,.65);font-family:'Lora',Georgia,serif;font-size:.78rem;line-height:1.55}.readiness-section{padding:clamp(4rem,8vw,7rem) 0}.readiness-section--sand{background:#E6DDD0}.readiness-copy{max-width:840px}.readiness-copy p,.readiness-split p{max-width:760px;margin:1.25rem 0 0;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:1rem;line-height:1.9}.readiness-tools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:2.5rem;background:rgba(11,42,59,.16);border:1px solid rgba(11,42,59,.16)}.readiness-tools article{display:grid;gap:.55rem;min-height:155px;padding:1.25rem;background:#F7F1E5}.readiness-tools strong{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.55rem;line-height:1}.readiness-tools span,.readiness-boundary,.readiness-not-for span{color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.84rem;line-height:1.65}.readiness-boundary{max-width:700px;margin:1.25rem 0 0}.readiness-not-for{display:grid;gap:.65rem;border:1px solid var(--beacon-teal);padding:1.3rem;background:#E7F0ED}.readiness-not-for strong{font-family:'Outfit',system-ui,sans-serif;font-size:.84rem;letter-spacing:.05em;text-transform:uppercase}.readiness-request{background:#17353C;color:#FAF8F4;padding:clamp(4.5rem,8vw,7.5rem) 0}.readiness-request h2{font-size:clamp(2.9rem,5.7vw,5.2rem)}.readiness-request p{max-width:650px;margin:1.25rem 0 0;color:rgba(250,248,244,.8);font-family:'Lora',Georgia,serif;font-size:1rem;line-height:1.85}.readiness-request__small{color:rgba(250,248,244,.6)!important;font-size:.84rem!important}.readiness-text-link{display:inline-block;margin-top:1.4rem;color:var(--beacon-amber-light);font-family:'Outfit',system-ui,sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.readiness-form-wrap{background:#F7F1E5;color:var(--beacon-charcoal);padding:clamp(1.2rem,3vw,2rem)}.readiness-form-wrap form{display:grid;gap:.65rem}.readiness-form-wrap label,.readiness-form-wrap legend{font-family:'Outfit',system-ui,sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.04em}.readiness-form-wrap label span,.readiness-form-wrap label b,.readiness-form-wrap legend b{color:#557172;font-size:.68rem;font-weight:600}.readiness-form-wrap input:not([type='radio']):not([type='checkbox']),.readiness-form-wrap select,.readiness-form-wrap textarea{width:100%;box-sizing:border-box;border:1px solid rgba(11,42,59,.28);border-radius:0;background:#fffdf8;padding:.72rem .78rem;color:var(--beacon-charcoal);font-family:'Lora',Georgia,serif;font-size:.92rem}.readiness-form-wrap textarea{resize:vertical}.readiness-field-help,.readiness-form-note{margin:0 0 .45rem;color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.73rem;line-height:1.55}.readiness-form-wrap fieldset{display:grid;gap:.55rem;margin:.65rem 0 0;border:0;padding:0}.readiness-radio,.readiness-consent{display:flex;align-items:flex-start;gap:.6rem!important;font-family:'Lora',Georgia,serif!important;font-size:.83rem!important;font-weight:400!important;letter-spacing:0!important;line-height:1.45}.readiness-radio input,.readiness-consent input{margin:.2rem 0 0;accent-color:var(--beacon-teal)}.readiness-consent{margin-top:.75rem}.readiness-button--submit,.readiness-button--dark{width:100%;box-sizing:border-box;border-color:#0B2A3B;background:#0B2A3B;color:#FAF8F4}.readiness-button--submit:disabled{opacity:.58;cursor:wait}.readiness-error{margin:0;color:#8E2C2C;font-family:'Lora',Georgia,serif;font-size:.84rem;line-height:1.5}.readiness-success h3{margin:.8rem 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:2.1rem;line-height:1}.readiness-success p{color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:.92rem;line-height:1.7}.readiness-success .readiness-button{margin-top:1rem}.readiness-form-note a{color:var(--beacon-teal)}@media(max-width:850px){.readiness-hero__grid,.readiness-request__grid,.readiness-split{grid-template-columns:1fr}.readiness-tools{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.readiness-tools{grid-template-columns:1fr}.readiness-hero h1{font-size:clamp(3rem,14vw,4.5rem)}.readiness-button{width:100%;box-sizing:border-box}}
      `}</style>
    </div>
  );
}
