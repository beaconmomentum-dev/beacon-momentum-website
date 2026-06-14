/**
 * Digital Grandpa — Beacon Momentum (/digital-grandpa)
 * Design: Deep Water Editorial — warm harbor variant
 * Voice: steady, warm, earned wisdom. Not tech. Not hustle.
 * Uses SharedNav and SharedFooter for brand congruence.
 */

import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { Link } from "wouter";

const DG_HERO_IMG = "/manus-storage/beacon_digital_grandpa_hero_f181270e.png";

const PRINCIPLES = [
  {
    symbol: "⚓",
    title: "Steady Presence",
    body: "Every member gets access to a mentor who has navigated the same waters — someone who has built things, lost things, and kept moving anyway.",
  },
  {
    symbol: "🧭",
    title: "Practical Guidance",
    body: "No theory. No frameworks for the sake of frameworks. Just clear, honest answers from people who have been where you are.",
  },
  {
    symbol: "🤝",
    title: "Community Continuity",
    body: "The relationship does not end when the session does. Digital Grandpa is built for ongoing connection, not one-off consultations.",
  },
  {
    symbol: "📖",
    title: "Earned Wisdom",
    body: "Our mentors are not certified coaches. They are people who have earned their perspective through decades of real-world experience.",
  },
];

const WHAT_IT_IS = [
  "Someone to talk to when the path forward is not clear",
  "Perspective from people who have already navigated what you are facing",
  "A consistent presence — not a one-time consultation",
  "Practical, honest answers without the coaching jargon",
  "Part of the Beacon Momentum ecosystem — connected to tools, community, and resources",
];

const WHAT_IT_IS_NOT = [
  "A replacement for professional medical, legal, or financial advice",
  "A tech support service or software tutorial",
  "A sales funnel disguised as mentorship",
  "A promise of specific outcomes or guarantees",
  "A one-size-fits-all program",
];

export default function DigitalGrandpaPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
      <SharedNav />

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "520px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src={DG_HERO_IMG}
          alt="Digital Grandpa — earned wisdom, steady presence"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,18,8,0.94) 30%, rgba(28,18,8,0.45) 75%, rgba(28,18,8,0.1) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem", paddingTop: "8rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", padding: "0.375rem 1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.75rem" }}>
            ◈ Beacon Mentorship
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#FAF8F4", marginBottom: "1.5rem", maxWidth: "640px" }}>
            A steady hand<br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>for life's storms.</em>
          </h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.8, color: "rgba(250,248,244,0.72)", maxWidth: "540px", marginBottom: "2.5rem" }}>
            Digital Grandpa is the mentorship arm of Beacon Momentum. It exists because some questions do not need a coach — they need someone who has already been through it and came out the other side.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/assessment" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.04em", padding: "0.875rem 2rem", background: "#C9A84C", color: "#1C1208", textDecoration: "none" }}>
              Find Your Path
            </Link>
            <a href="#what-it-is" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(250,248,244,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(250,248,244,0.25)", paddingBottom: "2px", alignSelf: "center" }}>
              Learn More ↓
            </a>
          </div>
        </div>
      </section>

      {/* What it is / What it is not */}
      <section id="what-it-is" style={{ background: "#2C2416", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }} className="dg-two-col">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ width: "2rem", height: "1px", background: "#C9A84C", display: "inline-block" }} />
                <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>What it is</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#FAF8F4", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Mentorship that meets you where you are.
              </h2>
              {WHAT_IT_IS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 0", borderBottom: "1px solid rgba(250,248,244,0.06)" }}>
                  <span style={{ color: "#C9A84C", fontSize: "0.8rem", marginTop: "0.2rem", flexShrink: 0 }}>◈</span>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(250,248,244,0.65)", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <span style={{ width: "2rem", height: "1px", background: "rgba(250,248,244,0.25)", display: "inline-block" }} />
                <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,244,0.35)" }}>What it is not</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "rgba(250,248,244,0.55)", marginBottom: "2rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                No pretense. No promises we cannot keep.
              </h2>
              {WHAT_IT_IS_NOT.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 0", borderBottom: "1px solid rgba(250,248,244,0.06)" }}>
                  <span style={{ color: "rgba(250,248,244,0.2)", fontSize: "0.8rem", marginTop: "0.2rem", flexShrink: 0 }}>—</span>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(250,248,244,0.35)", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four Principles */}
      <section style={{ background: "#F5F1EA", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ width: "2rem", height: "1px", background: "#B8860B", display: "inline-block" }} />
              <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B" }}>The Approach</span>
              <span style={{ width: "2rem", height: "1px", background: "#B8860B", display: "inline-block" }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#2C2416", letterSpacing: "-0.02em" }}>
              What makes it different
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} style={{ background: "#FAF8F4", border: "1px solid #E8E4DC", padding: "2rem", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,168,76,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E4DC"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "1.25rem" }}>{p.symbol}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", color: "#2C2416", marginBottom: "0.75rem" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.75, color: "#6B5E4E" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Beacon Connection */}
      <section style={{ background: "#1A5C6B", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "rgba(250,248,244,0.4)", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,248,244,0.5)" }}>Part of the Ecosystem</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#FAF8F4", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            Digital Grandpa lives inside Beacon Momentum.
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.8, color: "rgba(250,248,244,0.72)", marginBottom: "1.5rem" }}>
            It is not a separate platform. It is the human-mentorship layer of the Beacon ecosystem — connected to the Five Pillars, the Pathfinder Assessment, and the broader community of people navigating the same transition.
          </p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.8, color: "rgba(250,248,244,0.55)" }}>
            If you are not sure whether you need a pillar, a mentor, or just a starting point — the Pathfinder Assessment will tell you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#FAF8F4", padding: "7rem 0" }}>
        <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
          <div style={{ width: "3rem", height: "3rem", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#1C1208", margin: "0 auto 2rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>◈</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2416", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
            Not sure where to start?
          </h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.8, color: "#6B5E4E", marginBottom: "2.5rem" }}>
            The Pathfinder Assessment takes five minutes and tells you exactly which Beacon path fits where you are right now — including whether Digital Grandpa mentorship is the right next step.
          </p>
          <Link href="/assessment" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "1rem 2.5rem", background: "#2C2416", color: "#FAF8F4", textDecoration: "none", display: "inline-block" }}>
            Take the Pathfinder Assessment →
          </Link>
        </div>
      </section>

      <SharedFooter />


    </div>
  );
}
