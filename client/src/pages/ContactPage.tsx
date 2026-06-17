/**
 * ContactPage.tsx
 * Design: Deep Water Editorial — Navy/gold maritime, lighthouse metaphor.
 * Quiet authority voice. GHL form submission via fetch.
 */
import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";

const GHL_LOCATION_ID = "lMSPBMOlJfKMlhLqCnxS";
const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY as string;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  usePageMeta({
    title: "Contact — Beacon Momentum",
    description:
      "Reach the Beacon Momentum team. Whether you have a question about the Pathfinder Assessment, Beacon Labs, or anything else — we read every message.",
    url: "https://beaconmomentum.com/contact",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const payload: Record<string, unknown> = {
        locationId: GHL_LOCATION_ID,
        email: form.email,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        phone: form.phone || undefined,
        tags: ["bm_contact_form"],
        customFields: [
          {
            id: "contact_message_field",
            field_value: `[${form.subject || "General"}] ${form.message}`,
          },
        ],
      };

      const res = await fetch(
        "https://services.leadconnectorhq.com/contacts/upsert",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(`GHL ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please email us directly at info@beaconmomentum.com."
      );
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    color: "#e8e0d0",
    fontSize: "0.9375rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#b8a882",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a1628 0%, #0d1f3c 60%, #0a1628 100%)",
        color: "#e8e0d0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,22,40,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/icons/beacon-logo.webp"
            alt="Beacon Momentum"
            style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "#e8e0d0",
              letterSpacing: "-0.01em",
            }}
          >
            Beacon Momentum
          </span>
        </a>
        <a
          href="/"
          style={{
            color: "#b8a882",
            textDecoration: "none",
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
          }}
        >
          ← Back to Home
        </a>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "5rem 2rem 3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "20px",
            padding: "0.375rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "1.5rem",
          }}
        >
          Get in Touch
        </div>
        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#e8e0d0",
            marginBottom: "1.25rem",
          }}
        >
          We read every message.
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: "#b8a882",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Whether you have a question about the Pathfinder Assessment, want to
          learn more about Beacon Labs, or just need to find the right next
          step — reach out. Someone on the team will respond within one
          business day.
        </p>
      </section>

      {/* Form + Contact Info */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 2rem 6rem",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Form */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "2.5rem",
          }}
        >
          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              style={{ textAlign: "center", padding: "2rem 0" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: "rgba(201,168,76,0.15)",
                  border: "2px solid rgba(201,168,76,0.4)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 1.5rem",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "1.5rem",
                  color: "#e8e0d0",
                  marginBottom: "0.75rem",
                }}
              >
                Message received.
              </h2>
              <p style={{ color: "#b8a882", lineHeight: 1.6 }}>
                We'll be in touch within one business day. In the meantime,
                if you haven't taken the Pathfinder Assessment yet, it's a
                good use of five minutes.
              </p>
              <a
                href="/assessment"
                style={{
                  display: "inline-block",
                  marginTop: "1.5rem",
                  background: "linear-gradient(135deg, #c9a84c, #e8c96d)",
                  color: "#0a1628",
                  fontWeight: 700,
                  padding: "0.75rem 1.75rem",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                }}
              >
                Take the Assessment →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <label htmlFor="firstName" style={labelStyle}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First"
                    style={inputStyle}
                    aria-label="First name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" style={labelStyle}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last"
                    style={inputStyle}
                    aria-label="Last name"
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="email" style={labelStyle}>
                  Email <span style={{ color: "#c9a84c" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                  aria-label="Email address"
                  aria-required="true"
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="phone" style={labelStyle}>
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  style={inputStyle}
                  aria-label="Phone number"
                />
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label htmlFor="subject" style={labelStyle}>
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  aria-label="Message subject"
                >
                  <option value="">Select a topic…</option>
                  <option value="Pathfinder Assessment">
                    Pathfinder Assessment
                  </option>
                  <option value="Beacon Labs / AI Consulting">
                    Beacon Labs / AI Consulting
                  </option>
                  <option value="Beacon Community">Beacon Community</option>
                  <option value="Signal Check Report">
                    Signal Check Report
                  </option>
                  <option value="Partnership / Press">
                    Partnership / Press
                  </option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <label htmlFor="message" style={labelStyle}>
                  Message <span style={{ color: "#c9a84c" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind…"
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  aria-label="Your message"
                  aria-required="true"
                />
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  style={{
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.3)",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    color: "#fca5a5",
                    fontSize: "0.875rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !form.email || !form.message}
                aria-label="Send message"
                style={{
                  width: "100%",
                  background:
                    status === "submitting"
                      ? "rgba(201,168,76,0.5)"
                      : "linear-gradient(135deg, #c9a84c, #e8c96d)",
                  color: "#0a1628",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.04em",
                  padding: "0.875rem 2rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor:
                    status === "submitting" ? "not-allowed" : "pointer",
                  transition: "opacity 0.2s, transform 0.16s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {status === "submitting" ? (
                  <>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        border: "2px solid rgba(10,22,40,0.3)",
                        borderTopColor: "#0a1628",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Sending…
                  </>
                ) : (
                  "Send Message →"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            {
              icon: "✉",
              label: "Email",
              value: "info@beaconmomentum.com",
              href: "mailto:info@beaconmomentum.com",
            },
            {
              icon: "☎",
              label: "Phone",
              value: "+1 (888) 437-7657",
              href: "tel:+18884377657",
            },
            {
              icon: "◈",
              label: "Assessment",
              value: "Start the Pathfinder Assessment",
              href: "/assessment",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.25)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.125rem",
                  color: "#c9a84c",
                  marginBottom: "0.875rem",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7a8fa6",
                  marginBottom: "0.375rem",
                }}
              >
                {item.label}
              </div>
              <a
                href={item.href}
                style={{
                  color: "#e8e0d0",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  lineHeight: 1.4,
                }}
              >
                {item.value}
              </a>
            </div>
          ))}

          <div
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "10px",
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                color: "#b8a882",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              <strong style={{ color: "#c9a84c" }}>Response time:</strong>{" "}
              We respond to all messages within one business day. For urgent
              matters, email is the fastest path.
            </p>
          </div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          section:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
