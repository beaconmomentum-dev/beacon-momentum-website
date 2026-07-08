/**
 * Beacon Momentum — Signal Starter Pack Opt-In Page (/start)
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Purpose: YouTube-to-CRM conversion page. Visitor enters name + email
 * to receive the Signal Starter Pack PDF. On submit, contact is upserted
 * in GHL Beacon Momentum location with tag BM_Starter_Pack, which triggers
 * the 4-email nurture sequence.
 *
 * GHL Tag: BM_Starter_Pack
 * PDF URL: /Signal_Starter_Pack.pdf
 */
import { useState } from "react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { submitToGHL } from "@/lib/ghl";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#0E1F3A",
  teal: "#1B4F72",
  amber: "#C8922A",
  amberLight: "#D4A843",
  cream: "#FAF8F4",
  muted: "rgba(250,248,244,0.65)",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const body = "'Lora', Georgia, serif";

const PDF_URL = "/Signal_Starter_Pack.pdf";

export default function StarterPackPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    setErrorMsg("");

    const ok = await submitToGHL({
      email: email.trim(),
      firstName: firstName.trim() || undefined,
      tags: ["BM_Starter_Pack", "BM_YouTube_Optin"],
      source: "beaconmomentum.com/start",
    });

    if (ok) {
      setStatus("success");
      // Trigger PDF download
      const a = document.createElement("a");
      a.href = PDF_URL;
      a.download = "Signal_Starter_Pack.pdf";
      a.click();
    } else {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email admin@beaconmomentum.com.");
    }
  }

  return (
    <div style={{ background: C.navy, minHeight: "100vh", color: C.cream }}>
      <SharedNav />

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "80px 24px 48px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: sans,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.amber,
            marginBottom: 20,
          }}
        >
          Free Resource — Beacon Momentum
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 400,
            lineHeight: 1.18,
            color: C.cream,
            marginBottom: 24,
          }}
        >
          The Signal Starter Pack
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontFamily: body,
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            lineHeight: 1.75,
            color: C.muted,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Five essays on why the leverage in the economy has shifted — and how to capture it.
          Written for builders who are done renting their infrastructure and ready to own what
          they build.
        </p>

        {/* What's inside */}
        <div
          style={{
            background: C.navyMid,
            border: `1px solid rgba(200,146,42,0.25)`,
            borderRadius: 4,
            padding: "28px 32px",
            textAlign: "left",
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontFamily: sans,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.amber,
              marginBottom: 16,
            }}
          >
            What's Inside
          </p>
          {[
            "The Founders' Framework — what an economy is actually for",
            "The Trap of the API — why platform dependency is a liability",
            "The Architecture of Control — building infrastructure you own",
            "The Intelligence Arbitrage — the window that is closing",
            "The Lighthouse Protocol — how to navigate the shift",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: i < 4 ? 12 : 0,
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: C.amber, fontFamily: sans, fontSize: 13, flexShrink: 0, marginTop: 2 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.6 }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* ── Form ── */}
        {status === "success" ? (
          <div
            style={{
              background: C.navyMid,
              border: `1px solid rgba(200,146,42,0.4)`,
              borderRadius: 4,
              padding: "32px 24px",
            }}
          >
            <p
              style={{
                fontFamily: serif,
                fontSize: "1.5rem",
                color: C.cream,
                marginBottom: 12,
              }}
            >
              Your download is starting.
            </p>
            <p style={{ fontFamily: body, fontSize: "0.95rem", color: C.muted, lineHeight: 1.7 }}>
              Check your email — the first message from Bob is on its way. If the download didn't
              start automatically,{" "}
              <a
                href={PDF_URL}
                download
                style={{ color: C.amber, textDecoration: "underline" }}
              >
                click here
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 440, margin: "0 auto" }}>
            <div style={{ marginBottom: 14 }}>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  background: C.navyMid,
                  border: `1px solid rgba(250,248,244,0.15)`,
                  borderRadius: 3,
                  color: C.cream,
                  fontFamily: sans,
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <input
                type="email"
                placeholder="Email address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  background: C.navyMid,
                  border: `1px solid rgba(250,248,244,0.15)`,
                  borderRadius: 3,
                  color: C.cream,
                  fontFamily: sans,
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                width: "100%",
                padding: "16px 24px",
                background: C.amber,
                color: C.navy,
                border: "none",
                borderRadius: 3,
                fontFamily: sans,
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: status === "submitting" ? "wait" : "pointer",
                opacity: status === "submitting" ? 0.7 : 1,
              }}
            >
              {status === "submitting" ? "Sending..." : "Send Me the Starter Pack"}
            </button>
            {status === "error" && (
              <p
                style={{
                  fontFamily: sans,
                  fontSize: "0.85rem",
                  color: "#e07070",
                  marginTop: 12,
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </p>
            )}
            <p
              style={{
                fontFamily: sans,
                fontSize: "0.78rem",
                color: "rgba(250,248,244,0.4)",
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              No spam. No countdown timers. Just the foundation. Unsubscribe anytime.
            </p>
          </form>
        )}
      </section>

      {/* ── About Bob ── */}
      <section
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 24px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 1,
            background: `rgba(200,146,42,0.4)`,
            margin: "0 auto 32px",
          }}
        />
        <p
          style={{
            fontFamily: body,
            fontSize: "0.95rem",
            color: C.muted,
            lineHeight: 1.8,
            fontStyle: "italic",
          }}
        >
          "I wrote these because I was tired of watching capable builders build real things on
          rented land, only to lose them when the platform changed the rules. Ownership is the
          only true leverage."
        </p>
        <p
          style={{
            fontFamily: sans,
            fontSize: "0.82rem",
            color: C.amber,
            marginTop: 16,
            letterSpacing: "0.08em",
          }}
        >
          — Bob Burr, Founder, Beacon Momentum
        </p>
      </section>

      <SharedFooter />
    </div>
  );
}
