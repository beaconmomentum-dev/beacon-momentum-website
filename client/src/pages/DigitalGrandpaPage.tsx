/**
 * DigitalGrandpaPage.tsx
 * Design: Deep Water Editorial — warm harbor variant.
 * Digital Grandpa is the human-mentorship arm of Beacon Momentum.
 * Voice: steady, warm, earned wisdom. Not tech. Not hustle.
 */
import { usePageMeta } from "@/hooks/usePageMeta";

const PILLARS = [
  {
    icon: "⚓",
    title: "Steady Presence",
    body: "Every member gets access to a mentor who has navigated the same waters — someone who has built things, lost things, and kept moving anyway.",
  },
  {
    icon: "🧭",
    title: "Practical Guidance",
    body: "No theory. No frameworks for the sake of frameworks. Just clear, honest answers from people who have been where you are.",
  },
  {
    icon: "🤝",
    title: "Community Continuity",
    body: "The relationship doesn't end when the session does. Digital Grandpa is built for ongoing connection, not one-off consultations.",
  },
  {
    icon: "📖",
    title: "Earned Wisdom",
    body: "Our mentors aren't certified coaches. They're people who have earned their perspective through decades of real-world experience.",
  },
];

const MENTORS = [
  {
    name: "Bob",
    role: "Founder & Lead Mentor",
    bio: "Founder of Beacon Momentum. Decades of experience building businesses, raising families, and navigating the gap between where you are and where you need to be.",
  },
  {
    name: "The Network",
    role: "Community Mentors",
    bio: "As Digital Grandpa grows, so does the mentor roster — veterans, founders, educators, and community builders who have agreed to show up consistently for the people who need them.",
  },
];

export default function DigitalGrandpaPage() {
  usePageMeta({
    title: "Digital Grandpa — Beacon Momentum",
    description:
      "A steady hand for life's storms. Digital Grandpa connects you with mentors who have been where you are — practical guidance from people who have earned it.",
    url: "https://beaconmomentum.com/digital-grandpa",
  });

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
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #c9a84c, #e8c96d)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>◈</div>
          <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: "1.125rem", color: "#e8e0d0", letterSpacing: "-0.01em" }}>Beacon Momentum</span>
        </a>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <a href="/about" style={{ color: "#b8a882", textDecoration: "none", fontSize: "0.875rem" }}>About</a>
          <a href="/assessment" style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96d)", color: "#0a1628", fontWeight: 700, padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none", fontSize: "0.875rem" }}>Take the Assessment</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "20px", padding: "0.375rem 1rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.5rem" }}>
          Beacon Mentorship
        </div>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#e8e0d0", marginBottom: "1.5rem" }}>
          A steady hand<br />for life's storms.
        </h1>
        <p style={{ fontSize: "1.1875rem", lineHeight: 1.75, color: "#b8a882", maxWidth: 600, margin: "0 auto 2.5rem" }}>
          Digital Grandpa is the mentorship arm of Beacon Momentum. It exists because some questions don't need a coach — they need someone who has already been through it and came out the other side.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/assessment" style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96d)", color: "#0a1628", fontWeight: 700, padding: "0.875rem 2rem", borderRadius: "6px", textDecoration: "none", fontSize: "1rem", letterSpacing: "0.02em" }}>
            Find Your Path →
          </a>
          <a href="/contact" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#e8e0d0", fontWeight: 600, padding: "0.875rem 2rem", borderRadius: "6px", textDecoration: "none", fontSize: "1rem" }}>
            Get in Touch
          </a>
        </div>
      </section>

      {/* What it is */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 2rem 5rem" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#e8e0d0", lineHeight: 1.2, marginBottom: "1.25rem" }}>
              A legacy of wisdom.<br />A future of community.
            </h2>
            <p style={{ color: "#b8a882", lineHeight: 1.75, fontSize: "1rem", marginBottom: "1rem" }}>
              The name Digital Grandpa isn't ironic. It's intentional. There is a generation of people who built things, raised families, and navigated hard seasons — and most of them never got to pass that knowledge on in any structured way.
            </p>
            <p style={{ color: "#b8a882", lineHeight: 1.75, fontSize: "1rem" }}>
              Digital Grandpa exists to close that gap. It's mentorship that feels like a conversation at the kitchen table — honest, unhurried, and grounded in what actually works.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Not a coaching program with a certification",
              "Not a course you watch alone",
              "Not a community that disappears after 30 days",
              "A real relationship with someone who has been there",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <div style={{ width: 22, height: 22, background: i < 3 ? "rgba(255,255,255,0.06)" : "rgba(201,168,76,0.15)", border: `1px solid ${i < 3 ? "rgba(255,255,255,0.1)" : "rgba(201,168,76,0.3)"}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: i < 3 ? "#7a8fa6" : "#c9a84c", flexShrink: 0, marginTop: "0.125rem" }}>
                  {i < 3 ? "✕" : "✓"}
                </div>
                <span style={{ color: i < 3 ? "#7a8fa6" : "#e8e0d0", fontSize: "0.9375rem", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#e8e0d0", marginBottom: "0.75rem" }}>
            What makes it different
          </h2>
          <p style={{ color: "#b8a882", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Four principles that guide every Digital Grandpa relationship.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.75rem" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.0625rem", fontWeight: 700, color: "#e8e0d0", marginBottom: "0.625rem" }}>{p.title}</h3>
              <p style={{ color: "#b8a882", fontSize: "0.9rem", lineHeight: 1.65 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentors */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#e8e0d0", marginBottom: "0.75rem" }}>
            The people behind it
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {MENTORS.map((m) => (
            <div key={m.name} style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ width: 48, height: 48, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#c9a84c", marginBottom: "1rem" }}>◈</div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "1.125rem", fontWeight: 700, color: "#e8e0d0", marginBottom: "0.25rem" }}>{m.name}</h3>
              <div style={{ fontSize: "0.8125rem", color: "#c9a84c", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.875rem" }}>{m.role}</div>
              <p style={{ color: "#b8a882", fontSize: "0.9375rem", lineHeight: 1.65 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem 7rem", textAlign: "center" }}>
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "16px", padding: "3.5rem 2rem" }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#e8e0d0", marginBottom: "1rem" }}>
            Not sure where to start?
          </h2>
          <p style={{ color: "#b8a882", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2rem", fontSize: "1rem" }}>
            The Pathfinder Assessment takes five minutes and tells you exactly which Beacon path fits where you are right now — including whether Digital Grandpa mentorship is the right next step.
          </p>
          <a href="/assessment" style={{ display: "inline-block", background: "linear-gradient(135deg, #c9a84c, #e8c96d)", color: "#0a1628", fontWeight: 700, padding: "0.9375rem 2.25rem", borderRadius: "6px", textDecoration: "none", fontSize: "1rem", letterSpacing: "0.02em" }}>
            Take the Pathfinder Assessment →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "#4a5568", fontSize: "0.875rem" }}>
          © {new Date().getFullYear()} Beacon Momentum, LLC · <a href="/privacy" style={{ color: "#7a8fa6", textDecoration: "none" }}>Privacy</a> · <a href="/terms" style={{ color: "#7a8fa6", textDecoration: "none" }}>Terms</a> · <a href="/contact" style={{ color: "#7a8fa6", textDecoration: "none" }}>Contact</a>
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
