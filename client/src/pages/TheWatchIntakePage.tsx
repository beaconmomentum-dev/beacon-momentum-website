import { useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { usePageMeta } from "@/hooks/usePageMeta";
import { submitWatchEnrollmentRequest } from "@/lib/ghl";
import { Link } from "wouter";

const C = {
  deep: "#0A1628",
  navy: "#0F1E35",
  amber: "#C8922A",
  amberLight: "#E8B84B",
  cream: "#F5F0E8",
  muted: "rgba(245,240,232,0.68)",
  border: "rgba(200,146,42,0.24)",
};
const serif = "'Playfair Display', Georgia, serif";
const body = "Inter, system-ui, sans-serif";

type Status = "idle" | "submitting" | "success" | "error";

export default function TheWatchIntakePage() {
  usePageMeta({
    title: "The Watch enrollment request",
    description: "Request current information about The Watch. This form is not a purchase and does not activate membership.",
    url: "/the-watch/intake",
  });

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acknowledged || !email.trim() || status === "submitting") return;
    setStatus("submitting");
    const accepted = await submitWatchEnrollmentRequest(
      email.trim(),
      firstName.trim() || undefined,
      acknowledged,
    );
    setStatus(accepted ? "success" : "error");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.deep, color: C.cream }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ padding: "clamp(3.5rem, 8vw, 6.5rem) 1.25rem" }}>
          <div style={{ maxWidth: "980px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 0.82fr)", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }} className="watch-request-grid">
            <div>
              <p style={{ margin: 0, color: C.amberLight, fontFamily: body, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                The Watch · Enrollment request
              </p>
              <h1 style={{ margin: "1rem 0 1.25rem", fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.04em" }}>
                Ask for the current details.
              </h1>
              <p style={{ maxWidth: "620px", color: C.muted, fontFamily: body, fontSize: "1.02rem", lineHeight: 1.8 }}>
                The Watch is Beacon Momentum’s annual membership. Its current price, included access, renewal terms, and offer conditions are published on the <Link href="/the-watch" style={{ color: C.amberLight }}>canonical offer page</Link>. Review those terms before making any decision.
              </p>
              <div role="note" style={{ marginTop: "1.5rem", maxWidth: "620px", borderLeft: `2px solid ${C.amber}`, background: "rgba(245,240,232,0.04)", padding: "1rem 1.2rem", color: C.muted, fontFamily: body, fontSize: "0.9rem", lineHeight: 1.7 }}>
                This form is an information request only. It does not take payment, create a paid membership, or activate account access. Any later payment and access step requires separate confirmation under the published terms.
              </div>
              <p style={{ marginTop: "1.5rem", color: C.muted, fontFamily: body, fontSize: "0.82rem", lineHeight: 1.7 }}>
                To keep this first step proportionate, we ask only for an email address and an optional first name—not a personal history or explanation of your circumstances.
              </p>
              <Link href="/the-watch" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "1.4rem", color: C.amberLight, fontFamily: body, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none", textTransform: "uppercase" }}>
                Review The Watch <ArrowRight size={15} />
              </Link>
            </div>

            <section aria-labelledby="request-form-title" style={{ background: C.navy, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.amber}`, padding: "clamp(1.4rem, 4vw, 2.1rem)", boxShadow: "0 18px 42px rgba(0,0,0,0.2)" }}>
              {status === "success" ? (
                <div role="status" aria-live="polite">
                  <Check aria-hidden="true" size={28} color={C.amberLight} />
                  <h2 id="request-form-title" style={{ margin: "1rem 0 0.65rem", fontFamily: serif, fontSize: "2rem", lineHeight: 1.05 }}>Your request was sent.</h2>
                  <p style={{ margin: 0, color: C.muted, fontFamily: body, fontSize: "0.92rem", lineHeight: 1.75 }}>
                    No payment was made and no membership was activated. Beacon will respond with current enrollment information and any applicable next steps; response timing is not guaranteed.
                  </p>
                  <p style={{ margin: "1.1rem 0 0", color: C.muted, fontFamily: body, fontSize: "0.84rem", lineHeight: 1.65 }}>
                    Questions? Contact <a href="mailto:support@beaconmomentum.com" style={{ color: C.amberLight }}>support@beaconmomentum.com</a>.
                  </p>
                  <Link href="/the-watch" style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", marginTop: "1.5rem", color: C.amberLight, fontFamily: body, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.07em", textDecoration: "none", textTransform: "uppercase" }}>
                    Back to The Watch <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <>
                  <h2 id="request-form-title" style={{ margin: 0, fontFamily: serif, fontSize: "2rem", lineHeight: 1.08 }}>Request information</h2>
                  <p style={{ margin: "0.8rem 0 1.4rem", color: C.muted, fontFamily: body, fontSize: "0.86rem", lineHeight: 1.65 }}>
                    Only your email and optional first name are sent with this request. Beacon’s Privacy Policy describes its handling of request information and service providers.
                  </p>
                  <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                    <label htmlFor="watch-request-name" style={{ display: "grid", gap: "0.45rem", color: C.muted, fontFamily: body, fontSize: "0.78rem", fontWeight: 650 }}>
                      First name <span style={{ fontWeight: 400 }}>(optional)</span>
                      <input id="watch-request-name" name="firstName" type="text" autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} style={inputStyle} />
                    </label>
                    <label htmlFor="watch-request-email" style={{ display: "grid", gap: "0.45rem", color: C.muted, fontFamily: body, fontSize: "0.78rem", fontWeight: 650 }}>
                      Email address <span aria-hidden="true" style={{ color: C.amberLight }}>*</span>
                      <input id="watch-request-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} style={inputStyle} />
                    </label>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem", color: C.muted, fontFamily: body, fontSize: "0.78rem", lineHeight: 1.6, cursor: "pointer" }}>
                      <input type="checkbox" required checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} style={{ marginTop: "0.18rem", accentColor: C.amber }} />
                      <span>I understand this is an information request—not a purchase or automatic membership activation—and I have reviewed the <Link href="/privacy" style={{ color: C.amberLight }}>Privacy Policy</Link>.</span>
                    </label>
                    <button type="submit" disabled={!acknowledged || !email.trim() || status === "submitting"} style={{ display: "inline-flex", minHeight: "48px", alignItems: "center", justifyContent: "center", gap: "0.55rem", border: 0, background: acknowledged && email.trim() ? C.amber : "rgba(200,146,42,0.4)", color: C.deep, cursor: acknowledged && email.trim() && status !== "submitting" ? "pointer" : "not-allowed", fontFamily: body, fontSize: "0.76rem", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase" }}>
                      {status === "submitting" ? <LoaderCircle className="animate-spin" size={17} /> : <ArrowRight size={16} />}
                      {status === "submitting" ? "Sending request…" : "Send information request"}
                    </button>
                    {status === "error" && <p role="alert" style={{ margin: 0, color: "#F0A699", fontFamily: body, fontSize: "0.83rem", lineHeight: 1.6 }}>We could not send your request just now. Please try again later or email <a href="mailto:support@beaconmomentum.com" style={{ color: C.cream }}>support@beaconmomentum.com</a>.</p>}
                  </form>
                </>
              )}
            </section>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 760px) { .watch-request-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  border: "1px solid rgba(245,240,232,0.24)",
  background: "rgba(245,240,232,0.06)",
  color: "#F5F0E8",
  padding: "0.8rem",
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "0.96rem",
  outlineOffset: "2px",
};
