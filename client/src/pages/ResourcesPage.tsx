/**
 * Beacon Momentum — /resources
 * Design: Deep Water Editorial / Quiet Authority
 * Content hub: YouTube channel, Beacon Brief, Signal Check, Beacon Labs case studies.
 * Landing destination for organic/YouTube traffic.
 */

import { Link } from "wouter";
import { ArrowUpRight, BookOpen, Video, FileText, Compass, FlaskConical, TrendingUp, Shield, Globe } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

const RESOURCES_HERO_IMG = "/manus-storage/beacon_resources_editorial_f4e411d8.png";

const RESOURCES = [
  {
    icon: Video,
    category: "Video Education",
    title: "Beacon YouTube Channel",
    description:
      "Free AI-era education published weekly. No courses to sell. No hype. Just documented proof of what works, what doesn't, and what to do next — for people navigating the AI transition on their own terms.",
    cta: "Watch on YouTube",
    href: "https://youtube.com/@BeaconMomentumAI",
    external: true,
    color: "#B8860B",
    bg: "#FFFDF4",
  },
  {
    icon: FileText,
    category: "Newsletter",
    title: "The Beacon Brief",
    description:
      "A weekly dispatch on AI tools, human capability, and the practical realities of staying economically active in the AI era. No filler. No affiliate links. Written for people who are serious about the transition.",
    cta: "Subscribe Free",
    href: "/assessment",
    external: false,
    color: "#1A5C6B",
    bg: "#F0F7FA",
  },
  {
    icon: FlaskConical,
    category: "Research & Intelligence",
    title: "Beacon Signal Check",
    description:
      "A full-spectrum AI visibility audit for your brand or business. Beacon Labs runs the research, scores your digital posture across AEO, SEO, social, and paid, and delivers a branded PDF report with specific recommendations.",
    cta: "Request a Signal Check",
    href: "https://beaconlabs.ai/signal-check",
    external: true,
    color: "#2A7F6F",
    bg: "#F0FAF8",
  },
  {
    icon: BookOpen,
    category: "Case Studies",
    title: "Beacon Labs Research",
    description:
      "Every tool Beacon recommends, every system Beacon installs, and every method Beacon teaches has been tested and documented. Beacon Labs publishes what works — including what failed and why.",
    cta: "Visit Beacon Labs",
    href: "https://beaconlabs.ai",
    external: true,
    color: "#5C3A6B",
    bg: "#F8F4FC",
  },
  {
    icon: Compass,
    category: "Assessment",
    title: "The Pathfinder Assessment",
    description:
      "Five questions. No hype. No sales pitch. An honest look at where you are and which Beacon path is built for people in your situation. Built from 12+ months of working with veterans, displaced workers, solopreneurs, and founders.",
    cta: "Take the Assessment",
    href: "/assessment",
    external: false,
    color: "#3D4F6B",
    bg: "#F4F6FA",
  },
];

export default function ResourcesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />

      {/* Hero — editorial image with overlay */}
      <section style={{ position: "relative", minHeight: "360px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src={RESOURCES_HERO_IMG}
          alt="Beacon Momentum Resources — editorial flat-lay"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,22,14,0.92) 25%, rgba(28,22,14,0.4) 70%, rgba(28,22,14,0.05) 100%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem", paddingTop: "7rem" }}>
          <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4A882", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#C4A882", display: "inline-block" }} />
            Free Resources
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "#FAF8F4", marginBottom: "1.5rem" }}>
            Everything Beacon publishes<br />is free before it's sold.
          </h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(250,248,244,0.7)", maxWidth: "580px" }}>
            Beacon does not buy its way to relevance. We build public usefulness through video education, transparent research, and documented proof — and we amplify only what the market has already shown it wants.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section style={{ padding: "0 0 6rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {RESOURCES.map((resource, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "2rem",
                alignItems: "start",
                padding: "2.5rem",
                background: resource.bg,
                border: "1px solid var(--beacon-parchment-dark)",
              }}>
                {/* Icon */}
                <div style={{
                  width: "2.5rem", height: "2.5rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: resource.color,
                  flexShrink: 0,
                }}>
                  <resource.icon size={16} color="#FAF8F4" />
                </div>

                {/* Content */}
                <div>
                  <div style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 400, fontSize: "0.7rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: resource.color, marginBottom: "0.5rem",
                  }}>
                    {resource.category}
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 600, fontSize: "1.35rem",
                    color: "var(--beacon-charcoal)",
                    lineHeight: 1.2, marginBottom: "0.75rem",
                  }}>
                    {resource.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400, fontSize: "0.9rem",
                    lineHeight: 1.75, color: "var(--beacon-charcoal-mid)",
                  }}>
                    {resource.description}
                  </p>
                </div>

                {/* CTA */}
                <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
                  {resource.external ? (
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontWeight: 500, fontSize: "0.75rem",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        color: resource.color, textDecoration: "none",
                        borderBottom: `1px solid ${resource.color}40`,
                        paddingBottom: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {resource.cta} <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <Link
                      href={resource.href}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.4rem",
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontWeight: 500, fontSize: "0.75rem",
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        color: resource.color, textDecoration: "none",
                        borderBottom: `1px solid ${resource.color}40`,
                        paddingBottom: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {resource.cta} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Sovereignty Section */}
      <section style={{ padding: "0 0 6rem", background: "var(--beacon-charcoal)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          {/* Section header */}
          <div style={{ padding: "4rem 0 2.5rem" }}>
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber)",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber)", display: "inline-block" }} />
              Financial Sovereignty Framework
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: "#FAF8F4", marginBottom: "1rem",
            }}>
              Clarity before action.
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "0.95rem",
              lineHeight: 1.8, color: "rgba(250,248,244,0.55)",
              maxWidth: "560px",
            }}>
              Three public framework modules from the Beacon Momentum curriculum. No investment advice.
              No predictions. Orientation, mental models, and decision frameworks for navigating the modern financial environment.
            </p>
          </div>

          {/* Three article cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(250,248,244,0.08)" }}>

            {/* Card 1 — Modern Wealth Navigation */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "2rem",
              alignItems: "start",
              padding: "2.5rem",
              background: "#0F1E2A",
            }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#B8860B",
                flexShrink: 0,
              }}>
                <TrendingUp size={16} color="#FAF8F4" />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.7rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#B8860B", marginBottom: "0.5rem",
                }}>Module 01 — Orientation</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "1.35rem",
                  color: "#FAF8F4", lineHeight: 1.2, marginBottom: "0.75rem",
                }}>Modern Wealth Navigation</h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.88rem",
                  lineHeight: 1.75, color: "rgba(250,248,244,0.55)",
                }}>
                  Financial sovereignty starts with vision, not tactics. This module builds the mental models that let you
                  read the landscape clearly — so sudden market shifts lose their emotional grip and decisions come from
                  understanding rather than fear. You will leave with language, pattern recognition, and frameworks for
                  evaluating opportunities independently, regardless of market cycle or technology.
                </p>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                  {["Decision frameworks", "Pattern recognition", "Sovereign thinking", "Cycle literacy"].map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(250,248,244,0.35)",
                      borderLeft: "1px solid rgba(250,248,244,0.15)",
                      paddingLeft: "0.75rem",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
                <Link href="/pillar/venture" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.75rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#B8860B", textDecoration: "none",
                  borderBottom: "1px solid rgba(184,134,11,0.3)",
                  paddingBottom: "2px", whiteSpace: "nowrap",
                }}>Explore Beacon Venture →</Link>
              </div>
            </div>

            {/* Card 2 — Financial Resilience */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "2rem",
              alignItems: "start",
              padding: "2.5rem",
              background: "#0D1A1E",
            }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#1A5C6B",
                flexShrink: 0,
              }}>
                <Shield size={16} color="#FAF8F4" />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.7rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#1A8CA0", marginBottom: "0.5rem",
                }}>Module 02 — Foundation</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "1.35rem",
                  color: "#FAF8F4", lineHeight: 1.2, marginBottom: "0.75rem",
                }}>Financial Resilience</h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.88rem",
                  lineHeight: 1.75, color: "rgba(250,248,244,0.55)",
                }}>
                  Resilience is not wealth — it is capacity. The capacity to adapt, endure, adjust, and move forward
                  when circumstances shift. This module covers the three-tier progression: Stability (knowing your real
                  numbers, maintaining buffers), Adaptation (adjusting with intention rather than panic), and Sovereignty
                  (making decisions based on clarity, not dependence on whoever is loudest).
                </p>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
                  {["Stability", "Adaptation", "Sovereignty", "Habit architecture"].map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(250,248,244,0.35)",
                      borderLeft: "1px solid rgba(250,248,244,0.15)",
                      paddingLeft: "0.75rem",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
                <Link href="/pillar/life" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.75rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#1A8CA0", textDecoration: "none",
                  borderBottom: "1px solid rgba(26,140,160,0.3)",
                  paddingBottom: "2px", whiteSpace: "nowrap",
                }}>Explore Beacon Life →</Link>
              </div>
            </div>

            {/* Card 3 — Digital Asset Landscape */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "2rem",
              alignItems: "start",
              padding: "2.5rem",
              background: "#0F1A2A",
            }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "#3D4F6B",
                flexShrink: 0,
              }}>
                <Globe size={16} color="#FAF8F4" />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.7rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "#6B82A0", marginBottom: "0.5rem",
                }}>Module 03 — Landscape</div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "1.35rem",
                  color: "#FAF8F4", lineHeight: 1.2, marginBottom: "0.75rem",
                }}>The Digital Asset Landscape</h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.88rem",
                  lineHeight: 1.75, color: "rgba(250,248,244,0.55)",
                }}>
                  The digital world is not coming — it is here. This module provides grounded orientation to how
                  digital assets work, what forces are shaping the landscape, and how to read the terrain with
                  discernment rather than reacting to headlines. No predictions. No investment recommendations.
                  Plain-language clarity on the structures reshaping money, ownership, and opportunity.
                </p>
                {/* Disclaimer */}
                <div style={{
                  marginTop: "1.25rem",
                  padding: "0.875rem 1rem",
                  background: "rgba(250,248,244,0.04)",
                  borderLeft: "2px solid rgba(250,248,244,0.15)",
                }}>
                  <p style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontSize: "0.7rem", lineHeight: 1.6,
                    color: "rgba(250,248,244,0.3)", letterSpacing: "0.02em",
                  }}>
                    Educational content only. Beacon Momentum does not provide financial, investment, or legal advice.
                    Nothing in this module constitutes a recommendation to buy, sell, or hold any asset.
                    Consult a licensed professional before making financial decisions.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                  {["Digital systems", "Market structure", "Emerging tools", "Regulatory context"].map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(250,248,244,0.35)",
                      borderLeft: "1px solid rgba(250,248,244,0.15)",
                      paddingLeft: "0.75rem",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
                <Link href="/pillar/venture" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.75rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#6B82A0", textDecoration: "none",
                  borderBottom: "1px solid rgba(107,130,160,0.3)",
                  paddingBottom: "2px", whiteSpace: "nowrap",
                }}>Explore Beacon Venture →</Link>
              </div>
            </div>
          </div>

          {/* Section footer note */}
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            color: "rgba(250,248,244,0.2)", letterSpacing: "0.04em",
            marginTop: "2rem",
          }}>
            These modules are public-facing orientation content. Member-area curriculum (Beacon Academy, advanced modules) is available through the Beacon Momentum membership.
          </p>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
