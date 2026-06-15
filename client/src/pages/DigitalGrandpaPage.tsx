/**
 * Digital Grandpa — AI Literacy Platform for Older Adults & Families
 * Design: Deep Water Editorial — warm harbor variant
 * Voice: steady, warm, earned wisdom. Patient. Encouraging. Never condescending.
 * Mission: Help older adults and families navigate the digital world with confidence.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { subscribeToBeaconBrief } from "@/lib/ghl";

const DG_HERO_IMG =
  "/manus-storage/beacon_digital_grandpa_hero_f181270e.png";

// ─── Scroll reveal ─────────────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("dg-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const AUDIENCES = [
  {
    icon: "👴",
    label: "Older Adults",
    headline: "You are not behind. You are just starting.",
    body: "Whether you have never touched a smartphone or you use one every day but feel uneasy about AI — Digital Grandpa meets you exactly where you are. No judgment. No rushing. Just clear, patient guidance from someone who understands what it feels like to learn something new later in life.",
    accent: "#C9A84C",
  },
  {
    icon: "👨‍👩‍👧",
    label: "Families",
    headline: "Help the people you love feel safe online.",
    body: "When a parent or grandparent is confused, worried, or being targeted by digital scams, the whole family feels it. Digital Grandpa gives families practical tools to protect their loved ones, bridge the digital gap, and have conversations about technology that do not end in frustration.",
    accent: "#2E7D6B",
  },
  {
    icon: "🎓",
    label: "Educators & Caregivers",
    headline: "Teach with patience. Lead with compassion.",
    body: "If you work with older adults — in senior centers, libraries, faith communities, or care facilities — Digital Grandpa provides structured curriculum, printable guides, and a framework for teaching AI literacy that respects the dignity and experience of every learner.",
    accent: "#1A5C6B",
  },
];

const CURRICULUM = [
  {
    module: "01",
    title: "What AI Actually Is",
    tagline: "No hype. No fear. Just the truth.",
    description:
      "A plain-English explanation of artificial intelligence — what it can do, what it cannot do, and why it is not as mysterious or dangerous as the headlines suggest. We start here because fear is the biggest barrier to learning.",
    duration: "30 min",
    accent: "#C9A84C",
  },
  {
    module: "02",
    title: "Staying Safe Online",
    tagline: "Scams, privacy, and protecting what matters.",
    description:
      "The digital world has real risks — and older adults are disproportionately targeted. This module covers the most common scams, how to spot them, how to protect personal information, and what to do if something goes wrong.",
    duration: "45 min",
    accent: "#2E7D6B",
  },
  {
    module: "03",
    title: "Helpful AI Tools",
    tagline: "Technology that works for you, not against you.",
    description:
      "A guided tour of AI tools that genuinely improve daily life — from voice assistants and health reminders to video calls with family and finding information without getting lost in the internet. Practical, hands-on, and paced for comfort.",
    duration: "60 min",
    accent: "#1A5C6B",
  },
  {
    module: "04",
    title: "Talking to Your Family",
    tagline: "Bridge the gap. Build the connection.",
    description:
      "Technology should bring families closer, not create distance. This module is designed to be done together — a shared lesson that helps older adults and their family members understand each other's digital world and communicate better about it.",
    duration: "45 min",
    accent: "#8B5E3C",
  },
  {
    module: "05",
    title: "Your Digital Legacy",
    tagline: "What you leave behind in the digital world.",
    description:
      "Photos, accounts, memories, and records — the digital world holds more of our lives than we realize. This module helps older adults organize their digital life, protect their legacy, and make things easier for the people they love.",
    duration: "30 min",
    accent: "#3D4F6B",
  },
];

const PRINCIPLES = [
  {
    symbol: "◈",
    title: "Patient by Design",
    body: "Every lesson is built for people who are not in a hurry to learn — and who deserve to be met with patience, not impatience. We repeat. We simplify. We never rush.",
    accent: "#C9A84C",
  },
  {
    symbol: "◇",
    title: "No Condescension",
    body: "The people who come to Digital Grandpa have lived full, capable lives. They are not slow — they are unfamiliar. There is a difference, and we never forget it.",
    accent: "#2E7D6B",
  },
  {
    symbol: "◉",
    title: "Earned Trust",
    body: "We do not sell fear. We do not exaggerate threats or oversimplify solutions. We tell the truth about AI — including the parts that are genuinely uncertain — because that is what respect looks like.",
    accent: "#1A5C6B",
  },
  {
    symbol: "◎",
    title: "Family-First",
    body: "The best outcomes happen when families learn together. Digital Grandpa is designed to be shared — between generations, across kitchen tables, and in community spaces.",
    accent: "#8B5E3C",
  },
];

const ONBOARDING_STEPS = [
  {
    step: "1",
    title: "Tell us where you are starting",
    body: "A short, friendly questionnaire — no right or wrong answers — that helps us understand your comfort level with technology and what matters most to you.",
    cta: null,
  },
  {
    step: "2",
    title: "Get your personal learning path",
    body: "Based on your answers, we recommend the modules and resources that fit your situation — whether you are a complete beginner, a cautious intermediate, or a family member helping someone else.",
    cta: null,
  },
  {
    step: "3",
    title: "Learn at your own pace",
    body: "Every module is self-paced, printable, and designed to be done in a comfortable chair — not in front of a classroom. Come back whenever you are ready.",
    cta: null,
  },
  {
    step: "4",
    title: "Share with the people you love",
    body: "Forward a lesson to a family member. Print a guide for a neighbor. Bring a module to your community group. Digital Grandpa is built to spread through trust, not advertising.",
    cta: null,
  },
];

// ─── Newsletter strip ──────────────────────────────────────────────────────────
function DGNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeToBeaconBrief(email);
    } catch (_) {
      // Silent
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section
      style={{
        background: "#2C2416",
        padding: "5rem 0",
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div className="container" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          Stay Connected
        </span>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "#FAF8F4",
            marginBottom: "0.875rem",
          }}
        >
          A gentle weekly note from Digital Grandpa.
        </h3>
        <p
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400,
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "rgba(250,248,244,0.55)",
            marginBottom: "2rem",
          }}
        >
          One email a week. A short lesson, a practical tip, or a story worth sharing. No tech jargon. No sales pitch. Just something useful.
        </p>
        {submitted ? (
          <div
            style={{
              padding: "1.25rem 2rem",
              background: "rgba(46,125,107,0.1)",
              border: "1px solid rgba(46,125,107,0.3)",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.9rem",
              color: "#2E7D6B",
            }}
          >
            You are on the list. The first note arrives this week.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "0", maxWidth: "420px", margin: "0 auto" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                padding: "0.875rem 1.25rem",
                border: "1.5px solid rgba(201,168,76,0.3)",
                borderRight: "none",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.9rem",
                color: "#FAF8F4",
                background: "rgba(250,248,244,0.06)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.875rem 1.5rem",
                background: "#C9A84C",
                color: "#1C1208",
                border: "none",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                opacity: loading ? 0.75 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        <p
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300,
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "rgba(250,248,244,0.25)",
            marginTop: "1rem",
          }}
        >
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function DigitalGrandpaPage() {
  const missionRef = useFadeUp();
  const audienceRef = useFadeUp();
  const curriculumRef = useFadeUp();
  const principlesRef = useFadeUp();
  const onboardingRef = useFadeUp();

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
      <SharedNav />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "580px",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          src={DG_HERO_IMG}
          alt="Digital Grandpa — AI literacy for older adults and families"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 25%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(28,18,8,0.96) 30%, rgba(28,18,8,0.55) 70%, rgba(28,18,8,0.15) 100%)",
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 2, paddingBottom: "5.5rem", paddingTop: "9rem" }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: "2rem",
                height: "1px",
                background: "#C9A84C",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              AI Literacy for Older Adults & Families
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#FAF8F4",
              marginBottom: "1.5rem",
              maxWidth: "680px",
            }}
          >
            The digital world is changing fast.
            <br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>
              You do not have to face it alone.
            </em>
          </h1>

          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.8,
              color: "rgba(250,248,244,0.72)",
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}
          >
            Digital Grandpa is a free AI literacy platform built for older adults and the families who love them. Patient, plain-English, and built on the belief that it is never too late to feel confident in the digital world.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="#start"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.04em",
                padding: "0.875rem 2rem",
                background: "#C9A84C",
                color: "#1C1208",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Start Learning — It's Free
            </a>
            <a
              href="#curriculum"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "0.8rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(250,248,244,0.65)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(250,248,244,0.25)",
                paddingBottom: "2px",
                alignSelf: "center",
              }}
            >
              See the Curriculum ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission Statement ────────────────────────────────────────────────── */}
      <section style={{ background: "#2C2416", padding: "6rem 0" }}>
        <div className="container">
          <div
            ref={missionRef}
            className="dg-fade-up"
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <span
              style={{
                display: "block",
                width: "2.5rem",
                height: "1px",
                background: "#C9A84C",
                margin: "0 auto 1.5rem",
              }}
            />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
                color: "#FAF8F4",
                marginBottom: "2rem",
              }}
            >
              "AI is not going away. But confusion, fear, and isolation do not have to be the price of living in the digital age. Digital Grandpa exists to make sure they are not."
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(250,248,244,0.35)",
              }}
            >
              Digital Grandpa · Part of the Beacon Momentum Ecosystem
            </p>
          </div>

          {/* Three pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0",
              marginTop: "5rem",
              borderTop: "1px solid rgba(250,248,244,0.08)",
            }}
          >
            {[
              {
                rule: "Confidence, not just competence.",
                sub: "Knowing how to use a tool is only half the battle. Feeling safe and in control is the other half. We teach both.",
              },
              {
                rule: "Families learn together.",
                sub: "The digital gap between generations is real — but it is bridgeable. Our curriculum is designed to be shared across the kitchen table.",
              },
              {
                rule: "Free, always.",
                sub: "AI literacy should not cost money. The core Digital Grandpa curriculum is free and will remain free.",
              },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem 2rem",
                  borderRight:
                    i < 2 ? "1px solid rgba(250,248,244,0.08)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    color: "#FAF8F4",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {p.rule}
                </div>
                <div
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    color: "rgba(250,248,244,0.45)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ────────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F4", padding: "7rem 0" }}>
        <div className="container">
          <div ref={audienceRef} className="dg-fade-up" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "#C9A84C",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                Who It's For
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#2C2416",
                maxWidth: "580px",
              }}
            >
              If you recognize yourself here, you are in the right place.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {AUDIENCES.map((a) => (
              <div
                key={a.label}
                style={{
                  padding: "2.5rem",
                  background: "#F5F1EA",
                  border: "1px solid #E8E4DC",
                  borderLeft: `4px solid ${a.accent}`,
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${a.accent}18`)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                }
              >
                <div style={{ fontSize: "2rem", marginBottom: "1.25rem" }}>{a.icon}</div>
                <div
                  style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: a.accent,
                    marginBottom: "0.5rem",
                  }}
                >
                  {a.label}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "1.35rem",
                    color: "#2C2416",
                    marginBottom: "1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {a.headline}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: 1.8,
                    color: "#6B5E4E",
                  }}
                >
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ──────────────────────────────────────────────────────── */}
      <section id="curriculum" style={{ background: "#F5F1EA", padding: "7rem 0" }}>
        <div className="container">
          <div ref={curriculumRef} className="dg-fade-up" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "#C9A84C",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                The Curriculum
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#2C2416",
                maxWidth: "600px",
                marginBottom: "1rem",
              }}
            >
              Five modules. One clear path.
            </h2>
            <p
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "#6B5E4E",
                maxWidth: "560px",
              }}
            >
              Each module is self-paced, printable, and designed to be completed in a single sitting — or spread across several days. There is no wrong pace.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {CURRICULUM.map((m, i) => (
              <div
                key={m.module}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                  padding: "2.5rem 0",
                  borderBottom:
                    i < CURRICULUM.length - 1
                      ? "1px solid #E8E4DC"
                      : "none",
                }}
                className="dg-module-row"
              >
                {/* Module number */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: m.accent,
                    opacity: 0.35,
                    paddingTop: "0.25rem",
                  }}
                >
                  {m.module}
                </div>

                {/* Content */}
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.7rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: m.accent,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {m.tagline}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      color: "#2C2416",
                      marginBottom: "0.875rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "0.9rem",
                      lineHeight: 1.8,
                      color: "#6B5E4E",
                      maxWidth: "560px",
                    }}
                  >
                    {m.description}
                  </p>
                </div>

                {/* Duration badge */}
                <div
                  style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    color: "#6B5E4E",
                    whiteSpace: "nowrap",
                    paddingTop: "0.5rem",
                    opacity: 0.65,
                  }}
                >
                  ≈ {m.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .dg-module-row {
              grid-template-columns: 48px 1fr !important;
            }
            .dg-module-row > *:last-child {
              display: none;
            }
          }
        `}</style>
      </section>

      {/* ── Four Principles ─────────────────────────────────────────────────── */}
      <section style={{ background: "#FAF8F4", padding: "7rem 0", borderTop: "1px solid #E8E4DC" }}>
        <div className="container">
          <div ref={principlesRef} className="dg-fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "#C9A84C",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                The Approach
              </span>
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "#C9A84C",
                  display: "inline-block",
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#2C2416",
                letterSpacing: "-0.02em",
              }}
            >
              What makes Digital Grandpa different
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "#F5F1EA",
                  border: "1px solid #E8E4DC",
                  borderTop: `3px solid ${p.accent}`,
                  padding: "2rem",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${p.accent}14`)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                }
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.5rem",
                    color: p.accent,
                    marginBottom: "1.25rem",
                    lineHeight: 1,
                  }}
                >
                  {p.symbol}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    color: "#2C2416",
                    marginBottom: "0.75rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    color: "#6B5E4E",
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Onboarding Path ─────────────────────────────────────────────────── */}
      <section id="start" style={{ background: "#1A5C6B", padding: "7rem 0" }}>
        <div className="container">
          <div ref={onboardingRef} className="dg-fade-up" style={{ marginBottom: "4rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  width: "2rem",
                  height: "1px",
                  background: "rgba(250,248,244,0.4)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(250,248,244,0.5)",
                }}
              >
                How to Get Started
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#FAF8F4",
                maxWidth: "560px",
              }}
            >
              Four steps. No pressure. No wrong answers.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "0",
              borderTop: "1px solid rgba(250,248,244,0.1)",
              borderLeft: "1px solid rgba(250,248,244,0.1)",
            }}
          >
            {ONBOARDING_STEPS.map((s, i) => (
              <div
                key={s.step}
                style={{
                  padding: "2.5rem 2rem",
                  borderRight: "1px solid rgba(250,248,244,0.1)",
                  borderBottom: "1px solid rgba(250,248,244,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: "#C9A84C",
                    opacity: 0.4,
                    marginBottom: "1.25rem",
                  }}
                >
                  {s.step}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    color: "#FAF8F4",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    lineHeight: 1.75,
                    color: "rgba(250,248,244,0.55)",
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "4rem", textAlign: "center" }}>
            <Link
              href="/assessment"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "1rem 2.5rem",
                background: "#C9A84C",
                color: "#1C1208",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Begin with the Pathfinder Assessment →
            </Link>
            <p
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400,
                fontSize: "0.8rem",
                color: "rgba(250,248,244,0.4)",
                marginTop: "1rem",
              }}
            >
              Free. Five minutes. No account required.
            </p>
          </div>
        </div>
      </section>

      {/* ── Beacon Connection ────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0", borderTop: "1px solid #E8E4DC" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "2rem",
                height: "1px",
                background: "#C9A84C",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              Part of the Ecosystem
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#2C2416",
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            Digital Grandpa lives inside Beacon Momentum.
          </h2>
          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#6B5E4E",
              marginBottom: "1.25rem",
            }}
          >
            It is not a standalone product. It is the AI literacy and family-bridge layer of the Beacon ecosystem — connected to the Five Pillars, the Pathfinder Assessment, and a broader community of people navigating the same transition. When you are ready to go deeper, Beacon is there.
          </p>
          <a
            href="/"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#C9A84C",
              textDecoration: "none",
              borderBottom: "1px solid rgba(201,168,76,0.4)",
              paddingBottom: "2px",
            }}
          >
            Explore Beacon Momentum →
          </a>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────────── */}
      <DGNewsletter />

      <SharedFooter />

      <style>{`
        .dg-fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.55s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .dg-fade-up.dg-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
