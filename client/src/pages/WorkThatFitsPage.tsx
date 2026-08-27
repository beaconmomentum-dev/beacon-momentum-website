import { useState } from "react";
import { Check, Download, FileText, ShieldCheck } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

type FormState = "idle" | "submitting" | "success" | "error";

const C = {
  navy: "#0A1628",
  navyMid: "#102641",
  teal: "#1A5C6B",
  copper: "#B7772B",
  paper: "#FBF8F1",
  sand: "#EEE6D8",
  ink: "#172534",
  muted: "#5B6773",
  line: "#D1C4B1",
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="wtf-eyebrow">{children}</p>;
}

export default function WorkThatFitsPage() {
  usePageMeta({
    title: "Work That Fits",
    description:
      "A calm seven-day AI work experiment built around one repeated, reversible, reviewable task.",
    url: "https://beaconmomentum.com/work-that-fits",
  });

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !consent || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = {
        event: "work_that_fits_card_request" as const,
        email,
        firstName: firstName || undefined,
        emailConsent: true as const,
        consentVersion: "work-that-fits-card-v1",
      };
      const response = await fetch("/api/trpc/capture.submit?batch=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "0": { json: payload } }),
      });
      if (!response.ok) throw new Error(`Capture relay ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not receive your request right now. Please try again later or contact support@beaconmomentum.com."
      );
    }
  }

  return (
    <div className="wtf-page">
      <SharedNav />
      <main id="main-content">
        <section className="wtf-hero" aria-labelledby="work-that-fits-title">
          <div className="container wtf-hero-grid">
            <div>
              <SectionEyebrow>Beacon Work · Public field resource</SectionEyebrow>
              <h1 id="work-that-fits-title">Work that fits the task, the tool, and the person doing the work.</h1>
              <p className="wtf-lead">
                Start with one repeated task. Keep the scope small. Keep the decision human. Learn from a week of real use before you expand anything.
              </p>
              <div className="wtf-hero-actions">
                <a className="wtf-primary-link" href="#request-card">Get the printable card <span aria-hidden="true">→</span></a>
                <a className="wtf-secondary-link" href="#how-it-works">See the seven-day structure</a>
              </div>
              <p className="wtf-quiet-note">Free educational resource. No sales call, personal consultation, or outcome promise.</p>
            </div>
            <aside className="wtf-card-preview" aria-label="One-Task Experiment Card overview">
              <div className="wtf-card-kicker">THE ONE-TASK EXPERIMENT CARD</div>
              <div className="wtf-card-rule" />
              <ol>
                <li><span>01</span><strong>Name one task you repeat.</strong></li>
                <li><span>02</span><strong>Set purpose, information, and decision boundaries.</strong></li>
                <li><span>03</span><strong>Choose one workable condition.</strong></li>
                <li><span>04</span><strong>After seven days, keep, change, or stop.</strong></li>
              </ol>
              <div className="wtf-card-foot">A one-page printable worksheet</div>
            </aside>
          </div>
        </section>

        <section id="how-it-works" className="wtf-section wtf-section-paper" aria-labelledby="method-title">
          <div className="container">
            <SectionEyebrow>A low-pressure starting point</SectionEyebrow>
            <div className="wtf-method-heading">
              <h2 id="method-title">This is a way to learn from one small experiment—not a productivity system.</h2>
              <p>
                The card is deliberately narrow. It does not ask you to disclose a diagnosis, rebuild your job, give a tool broader authority, or decide whether AI is “good” or “bad.” It helps you make one bounded observation about one task.
              </p>
            </div>
            <div className="wtf-principles" role="list">
              <article role="listitem">
                <span className="wtf-number">01</span>
                <h3>Repeated</h3>
                <p>Choose something you already return to, such as outlining a routine update, shaping meeting questions, or organizing a non-confidential draft.</p>
              </article>
              <article role="listitem">
                <span className="wtf-number">02</span>
                <h3>Reversible</h3>
                <p>Use a first experiment that you can pause, change, or stop without creating a high-stakes consequence.</p>
              </article>
              <article role="listitem">
                <span className="wtf-number">03</span>
                <h3>Reviewable</h3>
                <p>Keep a human reviewer and a clear decision point. The tool can prepare work; it does not take responsibility for the choice.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="wtf-section wtf-boundary-section" aria-labelledby="boundaries-title">
          <div className="container wtf-boundary-grid">
            <div>
              <SectionEyebrow>Three boundaries before you begin</SectionEyebrow>
              <h2 id="boundaries-title">A useful experiment is clear about what the tool may help with—and what stays with you.</h2>
            </div>
            <div className="wtf-boundary-list">
              <div>
                <span className="wtf-boundary-label">Purpose</span>
                <p>State the narrow result you are trying to learn from. A first draft, question set, outline, or checklist is enough.</p>
              </div>
              <div>
                <span className="wtf-boundary-label">Information</span>
                <p>Keep private, customer, account, confidential, regulated, and unapproved information out unless your approved route permits it.</p>
              </div>
              <div>
                <span className="wtf-boundary-label">Decision</span>
                <p>Decide what you will personally verify, approve, or choose before an output is used.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="wtf-section wtf-section-paper" aria-labelledby="conditions-title">
          <div className="container wtf-condition-grid">
            <div>
              <SectionEyebrow>Optional workable conditions</SectionEyebrow>
              <h2 id="conditions-title">Make the experiment easier to return to.</h2>
              <p>
                You can choose one adjustment that reduces friction in your own work setting. This is optional, individual, and non-medical; no disclosure or label is required.
              </p>
            </div>
            <ul className="wtf-check-list">
              <li><Check aria-hidden="true" /> A written agenda before a meeting</li>
              <li><Check aria-hidden="true" /> A quiet review window between calls</li>
              <li><Check aria-hidden="true" /> Fewer nonessential alerts while reviewing</li>
              <li><Check aria-hidden="true" /> The next action written before changing context</li>
            </ul>
          </div>
        </section>

        <section className="wtf-section wtf-request-section" id="request-card" aria-labelledby="request-title">
          <div className="container wtf-request-grid">
            <div>
              <SectionEyebrow>Free printable resource</SectionEyebrow>
              <h2 id="request-title">Get the One-Task Experiment Card.</h2>
              <p>
                Request the printable card, then use it for one seven-day experiment. If you choose to opt in, the short Work That Fits sequence offers a few spaced prompts to support your review. You can unsubscribe at any time.
              </p>
              <div className="wtf-delivery-note">
                <FileText aria-hidden="true" />
                <span>The card becomes available on this page after your request is received.</span>
              </div>
            </div>
            <div className="wtf-form-shell">
              {status === "success" ? (
                <div className="wtf-success" role="status" aria-live="polite">
                  <ShieldCheck aria-hidden="true" />
                  <h3>Your card is ready.</h3>
                  <p>Download it now, then choose one task you can learn from over the next seven days.</p>
                  <a className="wtf-download-link" href="/downloads/one-task-experiment-card.pdf" download>
                    <Download aria-hidden="true" /> Download the One-Task Experiment Card (PDF)
                  </a>
                  <p className="wtf-success-note">The follow-up sequence is limited to the resource and related Work That Fits prompts. You may unsubscribe at any time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <label htmlFor="wtf-first-name">First name <span>(optional)</span></label>
                  <input
                    id="wtf-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <label htmlFor="wtf-email">Email address</label>
                  <input
                    id="wtf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-describedby="wtf-email-help"
                  />
                  <p id="wtf-email-help" className="wtf-field-help">Used only to send the resource sequence you request and to support your unsubscribe choice.</p>
                  <label className="wtf-consent-label" htmlFor="wtf-consent">
                    <input
                      id="wtf-consent"
                      name="emailConsent"
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      required
                    />
                    <span>I agree to receive the One-Task Experiment Card and the short Work That Fits email sequence. I can unsubscribe at any time.</span>
                  </label>
                  <button type="submit" disabled={!email || !consent || status === "submitting"}>
                    {status === "submitting" ? "Receiving request…" : "Send me the card"}
                  </button>
                  <p className="wtf-privacy-note">By requesting the card, you agree to Beacon Momentum’s <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>.</p>
                  {status === "error" && <p className="wtf-form-error" role="alert">{errorMessage}</p>}
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="wtf-section wtf-next-section" aria-labelledby="next-title">
          <div className="container wtf-next-grid">
            <div>
              <SectionEyebrow>After the first week</SectionEyebrow>
              <h2 id="next-title">Keep, change, or stop—based on what you observed.</h2>
            </div>
            <p>
              The next Beacon lesson, <em>Validate Before You Build</em>, extends the same idea: start with a bounded question, inspect the evidence, and keep human judgment visible. It does not require a purchase or a personal appointment.
            </p>
          </div>
        </section>
      </main>
      <SharedFooter />

      <style>{`
        .wtf-page { background: ${C.paper}; color: ${C.ink}; min-height: 100vh; }
        .wtf-page h1, .wtf-page h2, .wtf-page h3 { font-family: 'Cormorant Garamond', Georgia, serif; }
        .wtf-page p, .wtf-page li, .wtf-page label, .wtf-page button, .wtf-page input { font-family: 'Outfit', system-ui, sans-serif; }
        .wtf-hero { background: linear-gradient(122deg, ${C.navy} 0%, ${C.navyMid} 62%, #17384B 100%); color: #fff; padding: 7.5rem 0 5.8rem; }
        .wtf-hero-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr); align-items: center; gap: 4rem; }
        .wtf-eyebrow { color: ${C.copper}; font-size: 0.74rem; font-weight: 800; letter-spacing: 0.14em; line-height: 1.2; margin: 0 0 1rem; text-transform: uppercase; }
        .wtf-hero h1 { font-size: clamp(3rem, 6vw, 5.7rem); font-weight: 600; letter-spacing: -0.045em; line-height: 0.92; margin: 0; max-width: 860px; }
        .wtf-lead { color: rgba(255,255,255,0.76); font-size: 1.12rem; line-height: 1.7; margin: 1.7rem 0 0; max-width: 650px; }
        .wtf-hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 1.35rem; margin-top: 2.15rem; }
        .wtf-primary-link { background: ${C.copper}; color: #fff; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.95rem 1.2rem; text-decoration: none; text-transform: uppercase; }
        .wtf-primary-link:focus-visible, .wtf-secondary-link:focus-visible, .wtf-download-link:focus-visible, .wtf-page button:focus-visible, .wtf-page input:focus-visible { outline: 3px solid #F3D6A1; outline-offset: 3px; }
        .wtf-primary-link:hover { background: #CA8736; }
        .wtf-secondary-link { color: #F3D6A1; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em; text-decoration: underline; text-underline-offset: 0.28rem; }
        .wtf-quiet-note { color: rgba(255,255,255,0.55); font-size: 0.78rem; line-height: 1.55; margin: 1.25rem 0 0; }
        .wtf-card-preview { background: #F4ECDD; color: ${C.ink}; padding: 1.6rem 1.55rem 1.35rem; transform: rotate(1.4deg); box-shadow: 12px 14px 0 rgba(0,0,0,0.18); }
        .wtf-card-kicker { color: ${C.teal}; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.13em; }
        .wtf-card-rule { background: ${C.copper}; height: 3px; margin: 0.85rem 0 1rem; width: 3rem; }
        .wtf-card-preview ol { display: grid; gap: 0.95rem; list-style: none; margin: 0; padding: 0; }
        .wtf-card-preview li { align-items: flex-start; display: flex; gap: 0.8rem; font-size: 0.95rem; line-height: 1.35; }
        .wtf-card-preview li span { color: ${C.copper}; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; padding-top: 0.2rem; }
        .wtf-card-foot { border-top: 1px solid #CFC2AB; color: ${C.muted}; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; margin-top: 1.25rem; padding-top: 0.85rem; text-transform: uppercase; }
        .wtf-section { padding: 6.2rem 0; }
        .wtf-section-paper { background: ${C.paper}; }
        .wtf-method-heading { align-items: end; display: grid; gap: 3rem; grid-template-columns: 1.1fr 0.9fr; }
        .wtf-method-heading h2, .wtf-boundary-section h2, .wtf-condition-grid h2, .wtf-request-grid h2, .wtf-next-grid h2 { color: ${C.navy}; font-size: clamp(2.2rem, 4vw, 3.75rem); font-weight: 600; letter-spacing: -0.035em; line-height: 0.98; margin: 0; }
        .wtf-method-heading > p, .wtf-condition-grid > div > p, .wtf-request-grid > div > p, .wtf-next-grid > p { color: ${C.muted}; font-size: 1rem; line-height: 1.72; margin: 0; }
        .wtf-principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.4rem; }
        .wtf-principles article { border-top: 2px solid ${C.copper}; padding: 1rem 0 0; }
        .wtf-number { color: ${C.teal}; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; }
        .wtf-principles h3 { color: ${C.navy}; font-size: 1.8rem; font-weight: 600; margin: 0.6rem 0 0.6rem; }
        .wtf-principles p { color: ${C.muted}; font-size: 0.9rem; line-height: 1.65; margin: 0; }
        .wtf-boundary-section { background: ${C.sand}; }
        .wtf-boundary-grid { align-items: start; display: grid; gap: 4.5rem; grid-template-columns: 0.9fr 1.1fr; }
        .wtf-boundary-list { border-top: 1px solid ${C.line}; }
        .wtf-boundary-list > div { border-bottom: 1px solid ${C.line}; display: grid; gap: 1rem; grid-template-columns: 10rem 1fr; padding: 1.15rem 0; }
        .wtf-boundary-label { color: ${C.teal}; font-size: 0.73rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }
        .wtf-boundary-list p { color: ${C.ink}; font-size: 0.92rem; line-height: 1.6; margin: 0; }
        .wtf-condition-grid { align-items: center; display: grid; gap: 5rem; grid-template-columns: 1fr 1fr; }
        .wtf-check-list { display: grid; gap: 1rem; list-style: none; margin: 0; padding: 0; }
        .wtf-check-list li { align-items: flex-start; border-bottom: 1px solid ${C.line}; color: ${C.ink}; display: flex; font-size: 0.94rem; font-weight: 600; gap: 0.65rem; line-height: 1.5; padding: 0 0 0.9rem; }
        .wtf-check-list svg { color: ${C.teal}; flex: 0 0 auto; height: 1rem; margin-top: 0.18rem; width: 1rem; }
        .wtf-request-section { background: ${C.navy}; color: #fff; }
        .wtf-request-grid { align-items: center; display: grid; gap: 5rem; grid-template-columns: 0.9fr 1.1fr; }
        .wtf-request-grid h2 { color: #fff; }
        .wtf-request-grid > div > p { color: rgba(255,255,255,0.68); margin-top: 1.25rem; }
        .wtf-delivery-note { align-items: center; color: #F3D6A1; display: flex; font-size: 0.82rem; font-weight: 700; gap: 0.6rem; line-height: 1.5; margin-top: 1.5rem; }
        .wtf-delivery-note svg { flex: 0 0 auto; height: 1rem; width: 1rem; }
        .wtf-form-shell { background: ${C.paper}; color: ${C.ink}; padding: 2rem; }
        .wtf-form-shell form { display: grid; gap: 0.65rem; }
        .wtf-form-shell label { color: ${C.ink}; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.07em; margin-top: 0.25rem; text-transform: uppercase; }
        .wtf-form-shell label span { color: ${C.muted}; font-weight: 600; letter-spacing: 0; text-transform: none; }
        .wtf-form-shell input[type="text"], .wtf-form-shell input[type="email"] { background: #fff; border: 1px solid ${C.line}; border-radius: 0; color: ${C.ink}; font-size: 0.97rem; min-height: 2.75rem; padding: 0.65rem 0.75rem; }
        .wtf-field-help { color: ${C.muted}; font-size: 0.76rem; line-height: 1.45; margin: 0.05rem 0 0.35rem; }
        .wtf-consent-label { align-items: flex-start; display: flex; font-size: 0.78rem !important; gap: 0.7rem; letter-spacing: 0 !important; line-height: 1.52; margin: 0.75rem 0 0.4rem !important; text-transform: none !important; }
        .wtf-consent-label input { accent-color: ${C.teal}; flex: 0 0 auto; height: 1.05rem; margin: 0.06rem 0 0; width: 1.05rem; }
        .wtf-form-shell button { background: ${C.copper}; border: none; color: #fff; cursor: pointer; font-size: 0.76rem; font-weight: 800; letter-spacing: 0.1em; margin-top: 0.15rem; min-height: 2.9rem; padding: 0.85rem 1rem; text-transform: uppercase; }
        .wtf-form-shell button:hover:not(:disabled) { background: #CA8736; }
        .wtf-form-shell button:disabled { cursor: not-allowed; opacity: 0.55; }
        .wtf-privacy-note, .wtf-success-note { color: ${C.muted}; font-size: 0.72rem; line-height: 1.55; margin: 0.55rem 0 0; }
        .wtf-privacy-note a { color: ${C.teal}; text-underline-offset: 0.18rem; }
        .wtf-form-error { color: #992E24; font-size: 0.8rem; line-height: 1.5; margin: 0.5rem 0 0; }
        .wtf-success { align-items: flex-start; display: flex; flex-direction: column; }
        .wtf-success > svg { color: ${C.teal}; height: 1.7rem; width: 1.7rem; }
        .wtf-success h3 { color: ${C.navy}; font-size: 2rem; font-weight: 600; margin: 0.75rem 0 0; }
        .wtf-success p { color: ${C.muted}; font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 0; }
        .wtf-download-link { align-items: center; background: ${C.teal}; color: #fff; display: inline-flex; font-family: 'Outfit', system-ui, sans-serif; font-size: 0.74rem; font-weight: 800; gap: 0.55rem; letter-spacing: 0.08em; line-height: 1.35; margin-top: 1.4rem; padding: 0.92rem 1rem; text-decoration: none; text-transform: uppercase; }
        .wtf-download-link:hover { background: #134955; }
        .wtf-download-link svg { height: 1rem; width: 1rem; }
        .wtf-next-section { background: #E2D6C5; padding-bottom: 6.5rem; padding-top: 5.5rem; }
        .wtf-next-grid { align-items: start; display: grid; gap: 4rem; grid-template-columns: 1fr 0.95fr; }
        @media (max-width: 900px) {
          .wtf-hero { padding: 6rem 0 4.5rem; }
          .wtf-hero-grid, .wtf-method-heading, .wtf-boundary-grid, .wtf-condition-grid, .wtf-request-grid, .wtf-next-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .wtf-card-preview { max-width: 36rem; transform: none; }
          .wtf-principles { gap: 1.6rem; grid-template-columns: 1fr; }
          .wtf-section { padding: 4.5rem 0; }
        }
        @media (max-width: 560px) {
          .wtf-hero { padding-top: 4.6rem; }
          .wtf-hero h1 { font-size: 3.25rem; }
          .wtf-hero-actions { align-items: stretch; flex-direction: column; }
          .wtf-primary-link { text-align: center; }
          .wtf-secondary-link { padding: 0.3rem 0; text-align: center; }
          .wtf-method-heading h2, .wtf-boundary-section h2, .wtf-condition-grid h2, .wtf-request-grid h2, .wtf-next-grid h2 { font-size: 2.45rem; }
          .wtf-boundary-list > div { gap: 0.4rem; grid-template-columns: 1fr; }
          .wtf-form-shell { padding: 1.3rem; }
        }
      `}</style>
    </div>
  );
}
