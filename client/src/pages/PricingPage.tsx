/**
 * Beacon Momentum — /pricing
 * Design: Deep Water Editorial / Quiet Authority
 * Model: One annual Watch membership + paid standalone operating dossiers
 * Membership: The Watch ($497/yr)
 * Monthly: Watch Brief Premium ($27/mo) | Beacon Labs Stack Brief ($47/mo) | Accountability Sprint ($197/mo — waitlist)
 * Signal Check: Paid Beacon Labs diagnostic ($297)
 * Updated: June 2026
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Clock, Users, Zap } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

const HERO_IMG = "/images/beacon_hero.webp";

const cream = "#FAF8F4";
const teal = "#1A5C6B";
const tealMid = "#2A7F6F";
const charcoal = "#1C1C1E";
const charcoalMid = "#4A4A4C";
const amber = "#C8922A";
const parchment = "#F5F0E8";
const parchmentDark = "#E8E0D0";
const copper = "#7C4F2A";

// ─── Membership tiers ──────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "watch",
    name: "The Watch",
    tagline: "The annual operating environment for people ready to build with more structure, context, and company.",
    annualPrice: 497,
    valueNote: "Annual commitment · billed once",
    color: tealMid,
    highlight: true,
    included: [
      "Five-pillar curriculum pathways and member resources",
      "Community access and accountability structure",
      "Monthly Watch Brief Premium as a member benefit",
      "Beacon Pathfinder Assessment and onboarding guidance",
      "Progression through Sentinel, Navigator, and Quartermaster stages",
    ],
    notIncluded: [],
    cta: "Request Watch enrollment details",
    ctaHref: "/the-watch#join",
    note: "The Watch changes the operating environment. The free Brief and monthly dossier can prepare you for it, but neither replaces it.",
  },
];

// ─── Monthly products ──────────────────────────────────────────────────────────
const MONTHLY_PRODUCTS = [
  {
    id: "brief-premium",
    icon: "📡",
    name: "Watch Brief Premium",
    price: 27,
    cadence: "per month",
    description:
      "A paid monthly operating dossier: one deeper briefing, one curated tool note, and one high-leverage signal worth acting on. No membership required.",
    cta: "Request enrollment details",
    ctaHref: "/watch-brief-premium",
    available: true,
  },
  {
    id: "labs-brief",
    icon: "🔬",
    name: "Beacon Labs Stack Brief",
    price: 47,
    cadence: "per month",
    description:
      "A monthly 8–10 page PDF briefing on the AI tool stack. What to use, what to drop, what is overhyped, what is underrated. Three recommended stacks — solopreneur, small team, career professional — updated every 30 days as the landscape shifts. Researched and produced by the Beacon AI team.",
    cta: "Request Labs Brief details",
    ctaHref: "/contact?interest=labs-brief",
    available: true,
  },
  {
    id: "sprint",
    icon: "🧭",
    name: "Accountability Sprint",
    price: 197,
    cadence: "per cohort",
    description:
      "A structured 30-day sprint cohort — 12 to 15 people maximum, one specific outcome, daily check-ins via a private channel, one live call per week with a Beacon mentor. Runs monthly on a rolling basis. Join the waitlist to be notified when the next cohort opens.",
    cta: "Join the Waitlist",
    ctaHref: "#sprint-waitlist",
    available: false,
    waitlist: true,
  },
];

// ─── Progression stages ────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "sentinel",
    rank: "STAGE ONE",
    name: "Sentinel",
    tagline: "You have arrived. You are standing watch. The first commitment is made.",
    color: teal,
    description:
      "Every member begins here. The Sentinel stage orients you to the community, the doctrine, and the Five Pillar framework. You choose your first pathway and begin the curriculum at a pace that fits your life.",
  },
  {
    id: "navigator",
    rank: "STAGE TWO",
    name: "Navigator",
    tagline: "You know the charts. You are actively plotting your course.",
    color: tealMid,
    description:
      "Navigators have completed their first pathway and are moving through the curriculum with intention. Small-group cohort accountability activates at this stage — you are no longer working alone.",
  },
  {
    id: "quartermaster",
    rank: "STAGE THREE",
    name: "Quartermaster",
    tagline: "You sustain the ship. You help others find their bearing.",
    color: copper,
    description:
      "Quartermasters have completed multiple pathways and are operating at master's level. They contribute to curriculum direction, mentor newer members, and hold the standards of the community.",
  },
];

// ─── FAQs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do The Signal, Beacon Brief, Watch Brief Premium, and The Watch fit together?",
    a: "The Signal is the public editorial library. The Beacon Brief is the free weekly email that curates useful Signal work and one practical action. Watch Brief Premium is a separate paid monthly operating dossier for people who want more depth without joining a community. The Watch is the $497/year annual curriculum and community membership; it includes the premium briefing as a member benefit, along with the operating environment the briefing alone cannot provide.",
  },
  {
    q: "Why no free trial?",
    a: "We don't offer free trials because we don't believe in letting people sample something this serious. If you're here, you've already done the math. We trust that. A paid commitment signals intent — and the community is stronger because of it.",
  },
  {
    q: "Why is there one Watch membership instead of multiple tiers?",
    a: "The Watch is one annual operating environment at $497/year. Sentinel, Navigator, and Quartermaster are progression stages earned through participation and contribution—not separate plans to compare or purchase. Every new member begins as a Sentinel, then progresses through the work.",
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
    q: "Is there a monthly option?",
    a: "The Watch is annual-only. Annual billing is the foundation of a committed community and a longer-term curriculum. Watch Brief Premium and Beacon Labs Stack Brief are separate monthly operating products; request enrollment details for the current release and payment instructions.",
  },
  {
    q: "What is the paid Signal Check?",
    a: "The $297 Beacon Labs Signal Check is a paid diagnostic review of a brand's digital presence — website, social, paid ads, competitive landscape, and conversion posture. It is separate from The Watch membership. Request details to confirm the current scope, delivery timing, and next steps.",
  },
  {
    q: "What is the Accountability Sprint?",
    a: "A structured 30-day cohort — 12 to 15 people maximum, one specific outcome, daily check-ins, and one live call per week with a Beacon mentor. It runs monthly on a rolling basis. Join the waitlist and you will be notified when the next cohort opens.",
  },
  {
    q: "Is there a refund policy?",
    a: "You can cancel before your next renewal date. Cancellation stops the next renewal, and your Beacon Community access remains active through the end of the current paid term. For a billing question or a possible exception, contact Beacon Community support; current purchase terms apply.",
  },
  {
    q: "What is Beacon Trading?",
    a: "Beacon Trading is the fifth pathway within The Watch — AI-powered curriculum covering market fundamentals, portfolio thinking, and financial decision-making. It is an educational platform that teaches market opportunities. It is not a trading platform, investment advisory service, or financial institution. It is education — the kind that changes how you think about money.",
  },
  {
    q: "Not sure whether The Watch is the right next step?",
    a: "Take the Pathfinder Assessment. Five minutes. No sales call. No obligation. It will help you decide whether to begin with the free Signal, Watch Brief Premium, or the annual membership—and, if you join The Watch, which pathway to start with.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sprintEmail, setSprintEmail] = useState("");
  const [sprintSubmitted, setSprintSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: parchment }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
              <span style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.75rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: amber,
              }}>
                Beacon Momentum · Clear next steps
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.05, letterSpacing: "-0.025em",
              color: cream, marginBottom: "1rem", maxWidth: "680px",
            }}>
              Start with the right<br />level of depth.
            </h1>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.75, color: "rgba(250,248,244,0.7)", maxWidth: "560px",
            }}>
              Read the public Signal. Keep the line open with the free Beacon Brief. Explore Watch Brief Premium for a monthly dossier—or request Watch enrollment details when you are ready for the full operating environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Annual membership tiers ── */}
      <section style={{ padding: "6rem 0 4rem", background: parchment }}>
        <div className="container">

          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              display: "inline-block",
              padding: "0.25rem 1rem",
              background: teal,
              color: cream,
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              Annual Membership · The Watch
            </div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.9rem", lineHeight: 1.75,
              color: charcoalMid, maxWidth: "520px", margin: "0 auto",
            }}>
              One annual membership for people ready for a stronger operating environment: curriculum, community, accountability, and member resources.
            </p>
          </div>

          {/* Tier cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "2rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}>
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  border: tier.highlight
                    ? `2px solid ${tealMid}`
                    : "1.5px solid rgba(26,92,107,0.25)",
                  background: tier.highlight ? "#fff" : parchment,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {tier.highlight && (
                  <div style={{
                    position: "absolute", top: 0, left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: tealMid, color: cream,
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 600, fontSize: "0.6rem",
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    padding: "0.2rem 0.875rem",
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Card header */}
                <div style={{
                  padding: "2rem 2rem 1.5rem",
                  borderBottom: `1px solid ${parchmentDark}`,
                  background: `linear-gradient(135deg, ${tier.color}08 0%, transparent 100%)`,
                }}>
                  <div style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 500, fontSize: "0.6rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: tier.color, marginBottom: "0.5rem",
                  }}>
                    {tier.name}
                  </div>
                  <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "0.85rem", lineHeight: 1.6,
                    color: charcoalMid, marginBottom: "1.5rem",
                  }}>
                    {tier.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 600, fontSize: "2.75rem",
                        color: charcoal, lineHeight: 1,
                      }}>
                        ${tier.annualPrice}
                      </span>
                      <span style={{
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontSize: "0.8rem", color: charcoalMid,
                      }}>
                        / year
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.7rem", color: charcoalMid,
                      marginTop: "0.25rem", opacity: 0.65,
                    }}>
                      {tier.valueNote}
                    </p>
                  </div>
                </div>

                {/* Included */}
                <div style={{ padding: "1.5rem 2rem", flex: 1 }}>
                  <div style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 500, fontSize: "0.6rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: charcoalMid, marginBottom: "1rem",
                  }}>
                    What's Included
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: tier.notIncluded.length > 0 ? "1.25rem" : 0 }}>
                    {tier.included.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <CheckCircle2 style={{ width: "0.875rem", height: "0.875rem", marginTop: "2px", flexShrink: 0, color: tier.color }} />
                        <span style={{
                          fontFamily: "'Lora', Georgia, serif",
                          fontSize: "0.82rem", lineHeight: 1.5,
                          color: charcoalMid,
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  {tier.notIncluded.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {tier.notIncluded.map((item) => (
                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", opacity: 0.4 }}>
                          <span style={{ width: "0.875rem", height: "0.875rem", marginTop: "2px", flexShrink: 0, display: "inline-block", textAlign: "center", fontSize: "0.7rem", color: charcoalMid }}>—</span>
                          <span style={{
                            fontFamily: "'Lora', Georgia, serif",
                            fontSize: "0.82rem", lineHeight: 1.5,
                            color: charcoalMid,
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Note + CTA */}
                <div style={{ padding: "1.25rem 2rem 2rem", borderTop: `1px solid ${parchmentDark}` }}>
                  <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "0.78rem", lineHeight: 1.6,
                    color: charcoalMid, fontStyle: "italic",
                    marginBottom: "1.25rem",
                  }}>
                    {tier.note}
                  </p>
                  <a
                    href={tier.ctaHref}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: "0.5rem", padding: "0.875rem 1.5rem",
                      background: tier.highlight ? tealMid : "transparent",
                      color: tier.highlight ? cream : tier.color,
                      border: `1.5px solid ${tier.color}`,
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontWeight: 600, fontSize: "0.8rem",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tier.cta}
                    <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pathfinder nudge */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.875rem", lineHeight: 1.7,
              color: charcoalMid, marginBottom: "1rem",
            }}>
              Need a field recommendation before joining?
            </p>
            <Link href="/assessment" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.8rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: teal, textDecoration: "none",
            }}>
              Take the Pathfinder Assessment — 5 minutes, no obligation
              <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Progression stages ── */}
      <section style={{ padding: "5rem 0", background: charcoal }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.75rem", marginBottom: "1rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
              <span style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.7rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: amber,
              }}>
                The Progression
              </span>
              <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1, color: cream, maxWidth: "560px", margin: "0 auto",
            }}>
              Progression is earned.<br />Not purchased.
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "2rem", maxWidth: "960px", margin: "0 auto",
          }}>
            {STAGES.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  padding: "2rem",
                  border: `1px solid rgba(250,248,244,0.1)`,
                  borderTop: `3px solid ${stage.color}`,
                }}
              >
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
                  fontWeight: 600, fontSize: "1.5rem",
                  color: cream, marginBottom: "0.5rem",
                }}>
                  {stage.name}
                </h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.8rem", lineHeight: 1.6,
                  color: "rgba(250,248,244,0.5)",
                  fontStyle: "italic", marginBottom: "1rem",
                }}>
                  {stage.tagline}
                </p>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.82rem", lineHeight: 1.7,
                  color: "rgba(250,248,244,0.65)",
                }}>
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Monthly standalone products ── */}
      <section style={{ padding: "6rem 0", background: "#F0EBE0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.75rem", marginBottom: "1rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
              <span style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.7rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: teal,
              }}>
              Paid Operating Dossiers
              </span>
              <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.1, color: charcoal,
              maxWidth: "560px", margin: "0 auto 1rem",
            }}>
              Need more depth before a full membership?<br />Start with one focused operating layer.
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.9rem", lineHeight: 1.75,
              color: charcoalMid, maxWidth: "480px", margin: "0 auto",
            }}>
              These are paid standalone products for people who want more depth without entering the community and curriculum environment of The Watch.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "2rem", maxWidth: "1000px", margin: "0 auto",
          }}>
            {MONTHLY_PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(26,92,107,0.2)",
                  padding: "2rem",
                  display: "flex", flexDirection: "column",
                  position: "relative",
                }}
              >
                {product.waitlist && (
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    background: amber, color: "#fff",
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 600, fontSize: "0.55rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "0.15rem 0.5rem",
                  }}>
                    Coming Soon
                  </div>
                )}
                <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{product.icon}</div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 600, fontSize: "0.95rem",
                  color: charcoal, marginBottom: "0.25rem",
                }}>
                  {product.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "2rem",
                    color: teal, lineHeight: 1,
                  }}>
                    ${product.price}
                  </span>
                  <span style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontSize: "0.75rem", color: charcoalMid,
                  }}>
                    {product.cadence}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.82rem", lineHeight: 1.7,
                  color: charcoalMid, flex: 1, marginBottom: "1.5rem",
                }}>
                  {product.description}
                </p>

                {product.waitlist ? (
                  <div id="sprint-waitlist">
                    {sprintSubmitted ? (
                      <p style={{
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: "0.82rem", color: tealMid,
                        fontStyle: "italic",
                      }}>
                        You're on the list. We'll notify you when the next cohort opens.
                      </p>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={sprintEmail}
                          onChange={(e) => setSprintEmail(e.target.value)}
                          style={{
                            flex: 1, padding: "0.625rem 0.875rem",
                            border: "1.5px solid rgba(26,92,107,0.3)",
                            fontFamily: "'Outfit', system-ui, sans-serif",
                            fontSize: "0.8rem", background: "#fff",
                            outline: "none",
                          }}
                        />
                        <button
                          onClick={() => { if (sprintEmail) setSprintSubmitted(true); }}
                          style={{
                            padding: "0.625rem 1rem",
                            background: teal, color: cream,
                            border: "none", cursor: "pointer",
                            fontFamily: "'Outfit', system-ui, sans-serif",
                            fontWeight: 600, fontSize: "0.75rem",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Notify Me
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={product.ctaHref}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: "0.5rem", padding: "0.75rem 1.25rem",
                      background: "transparent", color: teal,
                      border: `1.5px solid ${teal}`,
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontWeight: 600, fontSize: "0.78rem",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    {product.cta}
                    <ArrowRight style={{ width: "0.8rem", height: "0.8rem" }} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signal Check ── */}
      <section style={{ padding: "5rem 0", background: parchment }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{
            border: `1.5px solid rgba(26,92,107,0.25)`,
            padding: "3rem",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.65rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: teal, marginBottom: "1rem",
            }}>
              Beacon Labs diagnostic · $297
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.1, color: charcoal, marginBottom: "1rem",
            }}>
              Start with a paid Signal Check.
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.9rem", lineHeight: 1.75,
              color: charcoalMid, maxWidth: "520px", margin: "0 auto 2rem",
            }}>
              A paid $297 diagnostic review of your brand's digital presence — website, social, paid ads, competitive landscape, and conversion posture. The Signal Check is a Beacon Labs offer, separate from The Watch’s $497 annual curriculum and community membership.
            </p>
            <a
              href="/contact?interest=signal-check"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.875rem 2rem",
                background: teal, color: cream,
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 600, fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Request Signal Check details
              <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
            </a>
            <p style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.7rem", color: charcoalMid,
              marginTop: "1rem", opacity: 0.6,
            }}>
              Agencies and consultants may request Signal Check details for a client-facing diagnostic.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "5rem 0 6rem", background: "#F0EBE0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            lineHeight: 1.1, color: charcoal,
            marginBottom: "3rem", textAlign: "center",
          }}>
            Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${parchmentDark}`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: "1.5rem 0",
                    background: "transparent", border: "none",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 600, fontSize: "0.95rem",
                    lineHeight: 1.4, color: charcoal,
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: "1.25rem", height: "1.25rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: teal, fontSize: "1.25rem", lineHeight: 1,
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ paddingBottom: "1.5rem" }}
                  >
                    <p style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.875rem", lineHeight: 1.75,
                      color: charcoalMid,
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
