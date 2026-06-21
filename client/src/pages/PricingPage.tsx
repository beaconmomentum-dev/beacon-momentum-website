/**
 * Beacon Momentum — /pricing
 * Design: Deep Water Editorial / Quiet Authority
 * Model: Single membership — $497/year (annual only)
 * Progression: Sentinel → Navigator → Quartermaster (beginner → intermediate → master's)
 * All Five Pillar pathways included. No free trials.
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

const HERO_IMG = "/images/beacon_hero.webp";

// ─── Progression stages ────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "sentinel",
    rank: "STAGE ONE",
    name: "Sentinel",
    tagline: "You have arrived. You are standing watch. The first commitment is made.",
    color: "#1A5C6B",
    description:
      "Every member begins here. The Sentinel stage orients you to the community, the doctrine, and the Five Pillar framework. You choose your first pathway and begin the curriculum at a pace that fits your life.",
  },
  {
    id: "navigator",
    rank: "STAGE TWO",
    name: "Navigator",
    tagline: "You know the charts. You are actively plotting your course.",
    color: "#2A7F6F",
    description:
      "Navigators have completed their first pathway and are moving through the curriculum with intention. Small-group cohort accountability activates at this stage — you are no longer working alone.",
  },
  {
    id: "quartermaster",
    rank: "STAGE THREE",
    name: "Quartermaster",
    tagline: "You sustain the ship. You help others find their bearing.",
    color: "#7C4F2A",
    description:
      "Quartermasters have completed multiple pathways and are operating at master's level. They contribute to curriculum direction, mentor newer members, and hold the standards of the community.",
  },
];

// ─── What's included ───────────────────────────────────────────────────────────
const INCLUDED = [
  "Access to all Five Pillar pathways — Life, Work, Venture, Systems, Trading",
  "Progress through pathways at your own pace, in any order",
  "Weekly Watch Brief — curated AI-era intelligence",
  "Monthly live Q&A with Beacon faculty",
  "Small-group cohort accountability (activates at Navigator stage)",
  "Full community access — all channels, all cohorts",
  "Beacon Pathfinder Assessment — find your entry pathway",
  "Member resource library — tools, templates, frameworks",
  "Beacon Brief newsletter (premium edition)",
  "Access to all future Beacon properties at no additional cost",
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const annualPrice = 497;

  const FAQS = [
    {
      q: "Why no free trial?",
      a: "Free trials attract the wrong energy. The Watch is built on committed members — people who have decided, not people who are deciding. A paid commitment signals intent. The community is better because of it.",
    },
    {
      q: "What are the progression stages?",
      a: "Every member begins as a Sentinel — oriented to the community and their first pathway. As you complete pathways and deepen your practice, you advance to Navigator (small-group cohort accountability activates here) and eventually to Quartermaster (master's level — curriculum input, mentorship, community leadership). Progression is earned through completion, not time.",
    },
    {
      q: "Which pathway do I start with?",
      a: "Take the Pathfinder Assessment — it maps your current situation to the pathway most likely to move the needle fastest. If you already know where you want to start, you can choose directly at enrollment. You can move to any other pathway after completing your first one.",
    },
    {
      q: "Can I switch pathways?",
      a: "Yes. Once you complete a pathway, you move to the next one of your choosing. All five pathways are included in your membership — the goal is to work through as many as have value for you, in the order that makes sense for your life.",
    },
    {
      q: "Is there a monthly option?",
      a: "The Watch is annual-only. Annual membership is $497/year — less than $42/month. Annual billing is the foundation of a committed community: it filters out casual browsers and ensures every member is invested in the long-term work. You can cancel before your renewal date at any time.",
    },
    {
      q: "Is there a refund policy?",
      a: "Memberships can be cancelled before the next billing date. There are no refunds for partial months or partial years. Annual members who cancel mid-year do not receive a prorated refund.",
    },
    {
      q: "What is Beacon Trading?",
      a: "Beacon Trading is the fifth pathway within The Watch — AI-powered curriculum covering market fundamentals, portfolio thinking, and financial decision-making. It is not a trading platform or investment advisory service. It is education — the kind that changes how you think about money.",
    },
    {
      q: "Not sure if The Watch is right for you?",
      a: "Take the Pathfinder Assessment. Five minutes. No sales call. No obligation. It will tell you honestly whether The Watch is the right next step — and if it is, which pathway to start with.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />

      {/* ── Hero band ── */}
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(28,28,30,0.92) 0%, rgba(28,28,30,0.55) 60%, rgba(28,28,30,0.2) 100%)",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: "4rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
              <span style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.75rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--beacon-amber-light)",
              }}>
                Membership · Beacon Momentum
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.05, letterSpacing: "-0.025em",
              color: "#FAF8F4", marginBottom: "1rem",
              maxWidth: "680px",
            }}>
              One Membership. Every Path.
            </h1>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.75, color: "rgba(250,248,244,0.7)",
              maxWidth: "560px",
            }}>
              All five pathways. One standing crew. You choose where to start — and you keep going for as long as the work has value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Membership card ── */}
      <section style={{ padding: "6rem 0 4rem", background: "var(--beacon-parchment)" }}>
        <div className="container">

          {/* Annual-only badge */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "3.5rem",
          }}>
            <span style={{
              padding: "0.25rem 1rem",
              background: "var(--beacon-teal)",
              color: "#FAF8F4",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
            }}>
              Annual Membership Only
            </span>
          </div>

          {/* Single membership card */}
          <motion.div
            key="annual"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{
              maxWidth: "820px", margin: "0 auto",
              border: "1.5px solid rgba(26,92,107,0.35)",
              background: "var(--beacon-parchment)",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div style={{
              padding: "2.5rem 2.5rem 2rem",
              background: "rgba(26,92,107,0.04)",
              borderBottom: "1px solid var(--beacon-parchment-dark)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "start",
            }}>
              <div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.65rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--beacon-teal)", marginBottom: "0.5rem",
                }}>
                  The Watch · Full Membership
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "2rem",
                  lineHeight: 1.1, letterSpacing: "-0.02em",
                  color: "var(--beacon-charcoal)", marginBottom: "0.5rem",
                }}>
                  All five pathways. One standing crew.
                </h2>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.875rem", lineHeight: 1.7,
                  color: "var(--beacon-charcoal-mid)",
                  maxWidth: "480px",
                }}>
                  Complete any pathway. Move to the next. Progress through Sentinel → Navigator → Quartermaster as your practice deepens. No ceiling. No graduation date.
                </p>
              </div>

              {/* Price block */}
              <div style={{ textAlign: "right", minWidth: "160px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", justifyContent: "flex-end" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "3rem",
                    color: "var(--beacon-charcoal)", lineHeight: 1,
                  }}>
                    ${annualPrice}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontSize: "0.8rem", color: "var(--beacon-charcoal-mid)",
                  }}>
                    / year
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "0.72rem", color: "var(--beacon-charcoal-mid)",
                  marginTop: "0.25rem", opacity: 0.7,
                }}>
                  Less than $42/month — cancel anytime
                </p>
                <p style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "0.68rem", marginTop: "0.375rem",
                  color: "var(--beacon-charcoal-mid)", opacity: 0.5,
                }}>
                  No free trial. Commitment signals intent.
                </p>
              </div>
            </div>

            {/* What's included */}
            <div style={{
              padding: "2rem 2.5rem",
              borderBottom: "1px solid var(--beacon-parchment-dark)",
            }}>
              <div style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.65rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--beacon-charcoal-mid)", marginBottom: "1.25rem",
              }}>
                What's Included
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: "0.625rem 2rem",
              }}>
                {INCLUDED.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                    <CheckCircle2 style={{ width: "0.875rem", height: "0.875rem", marginTop: "2px", flexShrink: 0, color: "var(--beacon-teal)" }} />
                    <span style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.85rem", lineHeight: 1.5,
                      color: "var(--beacon-charcoal-mid)",
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{
              padding: "1.75rem 2.5rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1.5rem", flexWrap: "wrap",
            }}>
              <p style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.85rem", lineHeight: 1.6,
                color: "var(--beacon-charcoal-mid)",
                maxWidth: "400px", margin: 0,
              }}>
                Membership is open to anyone who meets the commitment standard — regardless of background, industry, or starting point.
              </p>
              <a
                href="/the-watch"
                className="btn-press"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.875rem 2rem",
                  background: "var(--beacon-teal)",
                  color: "#FAF8F4",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.8rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "opacity 0.18s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Join The Watch
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Progression stages ── */}
      <section style={{ padding: "2rem 0 6rem", background: "var(--beacon-parchment)" }}>
        <div className="container">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            marginBottom: "3rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-charcoal-mid)", opacity: 0.3, display: "inline-block" }} />
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-charcoal-mid)", opacity: 0.55,
            }}>
              The Watch · Progression
            </span>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-charcoal-mid)", opacity: 0.3, display: "inline-block" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "1.5rem",
            maxWidth: "900px", margin: "0 auto",
          }}>
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  border: "1px solid var(--beacon-parchment-dark)",
                  background: "var(--beacon-parchment)",
                  padding: "2rem",
                  position: "relative",
                }}
              >
                {/* Stage number */}
                <div style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "3rem",
                  color: stage.color, opacity: 0.08, lineHeight: 1,
                }}>
                  {i + 1}
                </div>

                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.6rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: stage.color, marginBottom: "0.5rem",
                }}>
                  {stage.rank}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "1.6rem",
                  lineHeight: 1.1, letterSpacing: "-0.02em",
                  color: "var(--beacon-charcoal)", marginBottom: "0.5rem",
                }}>
                  {stage.name}
                </h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.78rem", lineHeight: 1.55,
                  color: stage.color, fontStyle: "italic",
                  marginBottom: "0.875rem",
                }}>
                  {stage.tagline}
                </p>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.82rem", lineHeight: 1.65,
                  color: "var(--beacon-charcoal-mid)",
                }}>
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>

          <p style={{
            textAlign: "center",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "0.875rem", lineHeight: 1.75,
            color: "var(--beacon-charcoal-mid)",
            marginTop: "2.5rem",
            maxWidth: "560px", margin: "2.5rem auto 0",
          }}>
            Progression is earned through completion — not time served, not tier upgrades, not additional fees. Your membership price never changes as you advance.
          </p>
        </div>
      </section>

      {/* ── Beacon Trading note ── */}
      <section style={{ padding: "2rem 0 5rem", background: "var(--beacon-parchment)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              maxWidth: "680px", margin: "0 auto",
              border: "1px solid rgba(184,134,11,0.3)",
              background: "rgba(184,134,11,0.03)",
              padding: "2.5rem",
              display: "flex", flexDirection: "column", gap: "1rem",
            }}
          >
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#B8860B",
            }}>
              Beacon Trading · Fifth Pathway
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "1.5rem",
              lineHeight: 1.15, letterSpacing: "-0.02em",
              color: "var(--beacon-charcoal)",
            }}>
              Financial literacy for the AI era is included.
            </h3>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.875rem", lineHeight: 1.75,
              color: "var(--beacon-charcoal-mid)",
            }}>
              Beacon Trading is the fifth pillar pathway — AI-powered curriculum covering market fundamentals, portfolio thinking, and financial decision-making. It is not a trading platform. It is not investment advice. It is education that changes how you think about money. Included in your Watch membership at no additional cost.
            </p>
            <a
              href="/beacon-trading"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.375rem",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.75rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#B8860B", textDecoration: "none",
                transition: "opacity 0.18s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Learn more about Beacon Trading
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section style={{ padding: "5rem 0", borderTop: "1px solid var(--beacon-parchment-dark)", background: "var(--beacon-cream, #F5F0E8)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            marginBottom: "3rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-charcoal-mid)", opacity: 0.3, display: "inline-block" }} />
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-charcoal-mid)", opacity: 0.55,
            }}>
              Answered Plainly
            </span>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-charcoal-mid)", opacity: 0.3, display: "inline-block" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? "1px solid var(--beacon-parchment-dark)" : "none",
                  borderBottom: "1px solid var(--beacon-parchment-dark)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1.25rem 0",
                    background: "none", border: "none", cursor: "pointer",
                    gap: "1rem",
                  }}
                >
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "1.1rem",
                    lineHeight: 1.3, letterSpacing: "-0.01em",
                    color: "var(--beacon-charcoal)",
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontSize: "1.1rem", color: "var(--beacon-teal)",
                    flexShrink: 0, lineHeight: 1,
                  }}>
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "1.25rem" }}>
                    <p style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.875rem", lineHeight: 1.8,
                      color: "var(--beacon-charcoal-mid)", margin: 0,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA footer band ── */}
      <section style={{ background: "var(--beacon-charcoal)", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
              Not Sure Where to Start
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#FAF8F4", marginBottom: "1rem",
            }}>
              Take the Pathfinder Assessment.
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "1rem",
              lineHeight: 1.75, color: "rgba(250,248,244,0.65)",
              marginBottom: "2.5rem",
            }}>
              Five minutes. No sales call. No obligation. It maps your current situation to the pathway most likely to move the needle fastest — then you decide.
            </p>
            <Link
              href="/assessment"
              className="btn-press"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.875rem 2.25rem",
                background: "var(--beacon-amber)",
                color: "#FAF8F4",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.875rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--beacon-amber-light)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--beacon-amber)"; }}
            >
              Find Your Path
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
