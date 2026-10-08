import { useState } from "react";
import { Check, Download, LoaderCircle } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import { usePageMeta } from "@/hooks/usePageMeta";

const C = {
  deep: "#17353c",
  deepest: "#0d262e",
  amber: "#d5b778",
  parchment: "#f5f1e8",
  ink: "#253537",
  muted: "#5d6664",
  rule: "#d8d0bf",
  white: "#ffffff",
  danger: "#9a3535",
};

const steps = [
  [
    "01",
    "One real job",
    "Identify the piece of work that deserves attention—not the whole business, the whole team, or your whole life.",
  ],
  [
    "02",
    "A clear boundary",
    "Decide what a tool or process may help with, and what it may not decide, send, change, or promise.",
  ],
  [
    "03",
    "A human review point",
    "Name the person and decision that remain visible and owned before the work is used.",
  ],
  [
    "04",
    "A correction step",
    "Decide what happens when the result is incomplete, wrong, or unclear—before the problem is allowed to travel.",
  ],
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ReadinessMapPage() {
  usePageMeta({
    title: "The Readiness Map",
    description:
      "A free printable worksheet to map one real job, set a boundary, keep human judgment visible, and choose a practical next step.",
    url: "/ReadinessMap",
  });

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setError("Enter an email address so the Readiness Map can be delivered.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const response = await fetch("/api/readiness-map/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          marketingConsent,
          consentVersion: "readiness-map-v1",
        }),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        downloadUrl?: string;
      } | null;
      if (!response.ok || !body?.ok)
        throw new Error(
          body?.message || "The worksheet could not be sent right now.",
        );
      setStatus("success");
      window.location.assign(body.downloadUrl || "/downloads/readiness-map");
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The worksheet could not be sent right now. Please try again shortly or contact support@beaconmomentum.com.",
      );
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, color: C.ink }}>
      <header
        style={{ borderBottom: `1px solid ${C.rule}`, background: C.white }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingTop: "1.15rem",
            paddingBottom: "1.15rem",
          }}
        >
          <a
            href="/"
            style={{
              color: C.deep,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.45rem",
              fontWeight: 650,
              textDecoration: "none",
            }}
          >
            Beacon Momentum
          </a>
          <a
            href="/"
            style={{
              color: C.deep,
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Return to BeaconMomentum.com
          </a>
        </div>
      </header>

      <main id="main-content">
        <section
          style={{
            borderBottom: `1px solid ${C.rule}`,
            padding: "clamp(3.7rem, 8vw, 7rem) 0 clamp(3.8rem, 7vw, 6rem)",
          }}
        >
          <div
            className="container readiness-hero-grid"
            style={{
              maxWidth: "1120px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.78fr)",
              alignItems: "start",
              gap: "clamp(2rem, 6vw, 6rem)",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <p
                style={{
                  margin: 0,
                  color: C.amber,
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Free printable field worksheet
              </p>
              <h1
                style={{
                  margin: "1.05rem 0 1.2rem",
                  color: C.deep,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3rem, 6vw, 5.15rem)",
                  fontWeight: 650,
                  letterSpacing: "-0.042em",
                  lineHeight: 0.96,
                }}
              >
                Choose one real job before you choose another tool.
              </h1>
              <div
                style={{
                  maxWidth: "650px",
                  color: C.muted,
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "1.03rem",
                  lineHeight: 1.82,
                }}
              >
                <p>
                  New tools arrive with a lot of noise: move faster, do more,
                  hand it over. But before any tool can help, the work needs a
                  name.
                </p>
                <p>
                  The Readiness Map is a short, four-page printable worksheet
                  for making one piece of work visible. In 20–30 minutes, you
                  will name the job, set a clear boundary, keep human judgment
                  in the loop, and decide what happens if the result is wrong.
                </p>
                <p>
                  You do not need to understand every system before you begin.
                  You need one honest job worth looking at clearly.
                </p>
              </div>
            </div>

            <section
              aria-labelledby="delivery-form-heading"
              style={{
                background: C.deep,
                color: "#f9f7f1",
                padding: "clamp(1.5rem, 4vw, 2.35rem)",
                boxShadow: "0 18px 42px rgba(24, 49, 55, 0.13)",
              }}
            >
              {status === "success" ? (
                <div role="status" aria-live="polite">
                  <Check aria-hidden="true" size={28} color={C.amber} />
                  <h2
                    id="delivery-form-heading"
                    style={{
                      margin: "1rem 0 0.65rem",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "2rem",
                      fontWeight: 650,
                      lineHeight: 1.05,
                    }}
                  >
                    Your Readiness Map is ready.
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "rgba(249,247,241,0.78)",
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.97rem",
                      lineHeight: 1.7,
                    }}
                  >
                    Download the worksheet, choose one real job, and give
                    yourself enough room to see it clearly. The same link is
                    also on its way to your inbox.
                  </p>
                  <a href="/downloads/readiness-map" style={primaryButtonStyle}>
                    <Download size={16} /> Download the Readiness Map (PDF)
                  </a>
                  <p
                    style={{
                      margin: "1rem 0 0",
                      color: "rgba(249,247,241,0.7)",
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.84rem",
                      lineHeight: 1.6,
                    }}
                  >
                    If the download does not arrive, contact{" "}
                    <a
                      href="mailto:support@beaconmomentum.com"
                      style={{ color: C.amber }}
                    >
                      support@beaconmomentum.com
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2
                    id="delivery-form-heading"
                    style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "2.15rem",
                      fontWeight: 650,
                      lineHeight: 1.05,
                    }}
                  >
                    Send the Readiness Map to my inbox.
                  </h2>
                  <div style={{ marginTop: "1.65rem" }}>
                    <label htmlFor="readiness-first-name" style={labelStyle}>
                      First name{" "}
                      <span
                        style={{
                          color: "rgba(249,247,241,0.65)",
                          fontWeight: 400,
                          textTransform: "none",
                        }}
                      >
                        (optional)
                      </span>
                    </label>
                    <input
                      id="readiness-first-name"
                      name="firstName"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <label htmlFor="readiness-email" style={labelStyle}>
                      Email address{" "}
                      <span aria-hidden="true" style={{ color: C.amber }}>
                        *
                      </span>
                    </label>
                    <input
                      id="readiness-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      aria-describedby="readiness-delivery-notice readiness-error"
                      style={inputStyle}
                    />
                  </div>
                  <p
                    id="readiness-delivery-notice"
                    style={{
                      margin: "1.15rem 0 0",
                      color: "rgba(249,247,241,0.74)",
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.83rem",
                      lineHeight: 1.62,
                    }}
                  >
                    We will use your email to send the Readiness Map and, only
                    if needed, one delivery reminder. Read the{" "}
                    <a href="/privacy" style={{ color: C.amber }}>
                      Privacy Policy
                    </a>{" "}
                    before submitting.
                  </p>
                  <label
                    className="readiness-consent"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.7rem",
                      marginTop: "1.25rem",
                      color: "rgba(249,247,241,0.9)",
                      cursor: "pointer",
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.87rem",
                      lineHeight: 1.55,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(event) =>
                        setMarketingConsent(event.target.checked)
                      }
                      style={{
                        accentColor: C.amber,
                        width: "1rem",
                        height: "1rem",
                        marginTop: "0.16rem",
                        flex: "0 0 auto",
                      }}
                    />
                    <span>
                      Yes, send me occasional Beacon Momentum field notes and
                      practical system updates. I can unsubscribe at any time.
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    style={{
                      ...primaryButtonStyle,
                      width: "100%",
                      justifyContent: "center",
                      border: 0,
                      cursor: status === "submitting" ? "wait" : "pointer",
                      opacity: status === "submitting" ? 0.72 : 1,
                    }}
                  >
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />{" "}
                        Sending the Readiness Map…
                      </>
                    ) : (
                      "Send me the Readiness Map"
                    )}
                  </button>
                  {status === "error" && (
                    <p
                      id="readiness-error"
                      role="alert"
                      style={{
                        margin: "1rem 0 0",
                        borderLeft: `3px solid ${C.amber}`,
                        color: "#fff0e8",
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: "0.86rem",
                        lineHeight: 1.55,
                        paddingLeft: "0.75rem",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <p
                    style={{
                      margin: "0.95rem 0 0",
                      color: "rgba(249,247,241,0.62)",
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.055em",
                      lineHeight: 1.5,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    A four-page printable PDF. No membership is created by this
                    request.
                  </p>
                </form>
              )}
            </section>
          </div>
        </section>

        <section
          style={{ background: C.white, padding: "clamp(3.6rem, 7vw, 6rem) 0" }}
        >
          <div className="container" style={{ maxWidth: "1120px" }}>
            <p style={eyebrowStyle}>A practical beginning</p>
            <h2 style={headingStyle}>
              Four things to make visible before the work moves on
            </h2>
            <div
              className="readiness-step-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1px",
                marginTop: "2.2rem",
                background: C.rule,
                border: `1px solid ${C.rule}`,
              }}
            >
              {steps.map(([number, title, description]) => (
                <article
                  key={number}
                  style={{
                    background: C.white,
                    padding: "clamp(1.5rem, 3vw, 2.1rem)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: C.amber,
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {number}
                  </p>
                  <h3
                    style={{
                      margin: "0.8rem 0 0.7rem",
                      color: C.deep,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.85rem",
                      fontWeight: 650,
                      lineHeight: 1.05,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: C.muted,
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.93rem",
                      lineHeight: 1.72,
                    }}
                  >
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(3.6rem, 7vw, 6rem) 0" }}>
          <div
            className="container readiness-audience-grid"
            style={{
              maxWidth: "1120px",
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "clamp(2.5rem, 8vw, 8rem)",
            }}
          >
            <div>
              <p style={eyebrowStyle}>Who this is for</p>
              <h2 style={headingStyle}>
                This is for people who want to begin with the work, not the
                hype.
              </h2>
              <h3 style={subheadingStyle}>It may be useful if you:</h3>
              <ul style={listStyle}>
                <li>
                  Are considering AI or a new process but want to keep judgment
                  visible.
                </li>
                <li>
                  Carry work that affects a customer, family, teammate, or
                  community.
                </li>
                <li>
                  Feel pressure to automate before the work is fully understood.
                </li>
                <li>
                  Want to start with one manageable action instead of
                  redesigning everything at once.
                </li>
              </ul>
            </div>
            <div
              style={{
                borderLeft: `1px solid ${C.rule}`,
                paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
              }}
            >
              <p style={eyebrowStyle}>A clear boundary</p>
              <h3
                style={{
                  ...headingStyle,
                  fontSize: "clamp(2rem, 3vw, 2.9rem)",
                }}
              >
                It is not:
              </h3>
              <ul style={listStyle}>
                <li>A promise that every job should be automated.</li>
                <li>
                  Legal, financial, compliance, employment, or
                  technical-security advice.
                </li>
                <li>
                  A trial, membership enrollment, or a handoff to another Beacon
                  property.
                </li>
                <li>
                  A substitute for the people, records, or professional guidance
                  a high-stakes decision requires.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          style={{
            background: C.deep,
            color: "#f9f7f1",
            padding: "clamp(3.4rem, 6vw, 5.6rem) 0",
          }}
        >
          <div className="container" style={{ maxWidth: "900px" }}>
            <p style={{ ...eyebrowStyle, color: C.amber }}>
              A quiet measure of readiness
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 3.55rem)",
                fontWeight: 650,
                letterSpacing: "-0.025em",
                lineHeight: 1.06,
              }}
            >
              <strong>
                If the map shows that a job is not ready for a tool, that is
                still a useful result.
              </strong>
            </p>
            <p
              style={{
                maxWidth: "680px",
                margin: "1.2rem 0 0",
                color: "rgba(249,247,241,0.76)",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              A visible boundary is part of good work. The lighthouse is lit to
              give direction—not to make the decision for you.
            </p>
          </div>
        </section>

        <section
          style={{
            background: C.white,
            padding: "clamp(3.6rem, 7vw, 6rem) 0",
            textAlign: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "700px" }}>
            <p style={eyebrowStyle}>Your next small step</p>
            <h2 style={headingStyle}>Start with one honest job.</h2>
            <p
              style={{
                margin: "1rem auto 1.8rem",
                color: C.muted,
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              Take the Readiness Map. Make the work visible. Keep the next move
              small enough to carry.
            </p>
            <a
              href="#readiness-email"
              style={{
                ...primaryButtonStyle,
                margin: "0 auto",
                width: "fit-content",
              }}
            >
              Send me the free Readiness Map
            </a>
            <p
              style={{
                margin: "1rem 0 0",
                color: C.muted,
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Four printable pages · 20–30 minutes · No membership created
            </p>
          </div>
        </section>

        <section
          style={{
            borderTop: `1px solid ${C.rule}`,
            padding: "3.5rem 0 4.5rem",
          }}
        >
          <div className="container" style={{ maxWidth: "800px" }}>
            <p style={eyebrowStyle}>A separate next route</p>
            <h2 style={{ ...headingStyle, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              When you want more structure
            </h2>
            <p
              style={{
                margin: "1rem 0 0",
                color: C.muted,
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.98rem",
                lineHeight: 1.75,
              }}
            >
              The Watch is Beacon’s separate learning and community path for
              people who want curriculum, playbooks, and a place to keep
              building with care.
            </p>
            <a
              href="/the-watch"
              style={{
                display: "inline-block",
                marginTop: "1.1rem",
                color: C.deep,
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textDecoration: "underline",
                textTransform: "uppercase",
              }}
            >
              Explore The Watch at Beacon Community
            </a>
            <p
              style={{
                margin: "1rem 0 0",
                color: C.muted,
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.86rem",
                lineHeight: 1.6,
              }}
            >
              Beacon Community is a separate destination. Your download request
              does not create an account there or transfer your submitted
              details automatically.
            </p>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 780px) {.readiness-hero-grid,.readiness-audience-grid { grid-template-columns: 1fr !important; }.readiness-step-grid { grid-template-columns: 1fr !important; }.readiness-audience-grid > div + div { border-left: 0 !important; border-top: 1px solid ${C.rule}; padding-left: 0 !important; padding-top: 2.5rem; } } input:focus-visible, a:focus-visible, button:focus-visible { outline: 3px solid ${C.amber}; outline-offset: 3px; }`}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  color: "rgba(249,247,241,0.88)",
  display: "block",
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};
const inputStyle: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  marginTop: "0.45rem",
  border: "1px solid rgba(249,247,241,0.38)",
  borderRadius: 0,
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontFamily: "'Lora', Georgia, serif",
  fontSize: "1rem",
  lineHeight: 1.2,
  padding: "0.8rem 0.88rem",
};
const primaryButtonStyle: React.CSSProperties = {
  alignItems: "center",
  background: C.amber,
  color: C.deepest,
  display: "inline-flex",
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontSize: "0.75rem",
  fontWeight: 800,
  gap: "0.5rem",
  justifyContent: "center",
  letterSpacing: "0.095em",
  marginTop: "1.45rem",
  minHeight: "48px",
  padding: "0.9rem 1.1rem",
  textDecoration: "none",
  textTransform: "uppercase",
};
const eyebrowStyle: React.CSSProperties = {
  color: "#a97724",
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontSize: "0.7rem",
  fontWeight: 800,
  letterSpacing: "0.15em",
  margin: 0,
  textTransform: "uppercase",
};
const headingStyle: React.CSSProperties = {
  color: C.deep,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "clamp(2.35rem, 4.7vw, 3.75rem)",
  fontWeight: 650,
  letterSpacing: "-0.032em",
  lineHeight: 1.02,
  margin: "0.72rem 0 0",
};
const subheadingStyle: React.CSSProperties = {
  color: C.deep,
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "1.8rem",
  fontWeight: 650,
  lineHeight: 1.08,
  margin: "1.8rem 0 0",
};
const listStyle: React.CSSProperties = {
  color: C.muted,
  display: "grid",
  fontFamily: "'Lora', Georgia, serif",
  fontSize: "0.95rem",
  gap: "0.85rem",
  lineHeight: 1.62,
  margin: "1.2rem 0 0",
  paddingLeft: "1.2rem",
};
