/**
 * Beacon Momentum — /pricing
 * Design: Deep Water Editorial / Quiet Authority
 * Shows all six Beacon products side by side in a single-page comparison.
 * Pattern: Reforge / Maven / altMBA — premium education pricing page.
 *
 * Products:
 * - Beacon Life     $297/mo  $2,497/yr  — Life transitions
 * - Beacon Work     $297/mo  $2,497/yr  — Career & income
 * - Beacon Venture  $297/mo  $2,497/yr  — Solopreneur / digital products
 * - Beacon Systems  $297/mo  $2,497/yr  — AI operations
 * - Beacon Labs     $297/mo  $2,497/yr  — AI consulting (pillar)
 * - Beacon Trading  $97/mo   $797/yr    — Financial education (entry point)
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

// ─── Hero image ────────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663026807979/6HQukXCFG84Vf5HioWLpsZ/beacon_hero_v2-cshWgeWfiqEDwxDKjqHLXG.webp";

type BillingCycle = "monthly" | "annual";

interface Product {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  accentBg: string;
  monthly: number;
  annual: number;
  annualMonthly: number;
  savings: number;
  entryPoint?: boolean;
  features: string[];
  annualExtras: string[];
  ctaLink: string;
  pillarLink?: string;
  icon: string;
}

const PRODUCTS: Product[] = [
  {
    id: "life",
    name: "Beacon Life",
    shortName: "Life",
    tagline: "Rebuild capacity, confidence, and direction.",
    color: "#2A7F6F",
    accentBg: "rgba(42,127,111,0.06)",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    icon: "◈",
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/life",
  },
  {
    id: "work",
    name: "Beacon Work",
    shortName: "Work",
    tagline: "Navigate the AI-era job market with clarity.",
    color: "#1A5C6B",
    accentBg: "rgba(26,92,107,0.06)",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    icon: "◇",
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/work",
  },
  {
    id: "venture",
    name: "Beacon Venture",
    shortName: "Venture",
    tagline: "Build income that does not depend on an employer.",
    color: "#7C4F2A",
    accentBg: "rgba(124,79,42,0.06)",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    icon: "◉",
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/venture",
  },
  {
    id: "systems",
    name: "Beacon Systems",
    shortName: "Systems",
    tagline: "Automate operations. Deploy AI that works.",
    color: "#3D5A80",
    accentBg: "rgba(61,90,128,0.06)",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    icon: "◎",
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/systems",
  },
  {
    id: "labs",
    name: "Beacon Labs",
    shortName: "Labs",
    tagline: "AI consulting, signal checks, and custom builds.",
    color: "#5A3E8A",
    accentBg: "rgba(90,62,138,0.06)",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    icon: "◐",
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/labs",
  },
  {
    id: "trading",
    name: "Beacon Trading",
    shortName: "Trading",
    tagline: "AI-powered financial education. Your entry point.",
    color: "#B8860B",
    accentBg: "rgba(184,134,11,0.06)",
    monthly: 97,
    annual: 797,
    annualMonthly: 66,
    savings: 367,
    entryPoint: true,
    icon: "◆",
    features: [
      "Full AI trading curriculum",
      "Real-time pricing support",
      "Weekly market newsletter",
      "Private member community",
      "AI tools and templates",
    ],
    annualExtras: ["Priority support", "Advanced strategy modules"],
    ctaLink: "/beacon-trading",
    pillarLink: "/beacon-trading",
  },
];

// ─── Pricing Card ──────────────────────────────────────────────────────────────
function PricingCard({
  product,
  billing,
  index,
}: {
  product: Product;
  billing: BillingCycle;
  index: number;
}) {
  const price = billing === "monthly" ? product.monthly : product.annual;
  const period = billing === "monthly" ? "/month" : "/year";
  const subline =
    billing === "annual"
      ? `~$${product.annualMonthly}/month · save $${product.savings}`
      : "Cancel anytime";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: "relative",
        border: product.entryPoint
          ? `1.5px solid ${product.color}40`
          : "1px solid var(--beacon-parchment-dark)",
        background: "var(--beacon-parchment)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = product.color;
        e.currentTarget.style.boxShadow = `0 8px 32px ${product.color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = product.entryPoint
          ? `${product.color}40`
          : "var(--beacon-parchment-dark)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Entry point badge */}
      {product.entryPoint && (
        <div style={{
          position: "absolute", top: "-14px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: "0.375rem",
          padding: "0.25rem 0.875rem",
          background: product.color,
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: 500, fontSize: "0.65rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#FAF8F4",
          whiteSpace: "nowrap",
        }}>
          ◆ Start Here
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: "1.75rem 1.75rem 1.25rem",
        borderBottom: "1px solid var(--beacon-parchment-dark)",
        background: product.accentBg,
      }}>
        {/* Icon + short name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.25rem",
            color: product.color,
            lineHeight: 1,
          }}>
            {product.icon}
          </span>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 500, fontSize: "0.7rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: product.color,
          }}>
            {product.shortName}
          </span>
        </div>
        {/* Name */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 600, fontSize: "1.25rem",
          lineHeight: 1.2, letterSpacing: "-0.01em",
          color: "var(--beacon-charcoal)",
          marginBottom: "0.375rem",
        }}>
          {product.name}
        </h3>
        {/* Tagline */}
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "0.8rem", lineHeight: 1.5,
          color: "var(--beacon-charcoal-mid)",
        }}>
          {product.tagline}
        </p>
      </div>

      {/* Price */}
      <div style={{
        padding: "1.25rem 1.75rem",
        borderBottom: "1px solid var(--beacon-parchment-dark)",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "2.5rem",
            color: "var(--beacon-charcoal)",
            lineHeight: 1,
          }}>
            ${price.toLocaleString()}
          </span>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "var(--beacon-charcoal-mid)",
          }}>
            {period}
          </span>
        </div>
        <p style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontSize: "0.75rem", marginTop: "0.25rem",
          color: billing === "annual" ? product.color : "var(--beacon-charcoal-mid)",
          opacity: billing === "annual" ? 1 : 0.6,
        }}>
          {subline}
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: "1.25rem 1.75rem", flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {product.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
              <CheckCircle2
                style={{ width: "0.875rem", height: "0.875rem", marginTop: "2px", flexShrink: 0, color: product.color }}
              />
              <span style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "0.85rem", lineHeight: 1.5,
                color: "var(--beacon-charcoal-mid)",
              }}>
                {f}
              </span>
            </li>
          ))}
          {billing === "annual" &&
            product.annualExtras.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                <CheckCircle2
                  style={{ width: "0.875rem", height: "0.875rem", marginTop: "2px", flexShrink: 0, color: product.color }}
                />
                <span style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.85rem", lineHeight: 1.5,
                  color: "var(--beacon-charcoal-mid)",
                }}>
                  {f}{" "}
                  <span style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontSize: "0.7rem", letterSpacing: "0.06em",
                    color: product.color,
                  }}>
                    (annual)
                  </span>
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* CTA */}
      <div style={{ padding: "1rem 1.75rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <a
          href={product.ctaLink}
          className="btn-press"
          style={{
            display: "block", textAlign: "center",
            padding: "0.875rem 1.25rem",
            background: product.color,
            color: "#FAF8F4",
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 500, fontSize: "0.8rem",
            letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.18s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Reserve Your Spot
        </a>
        <p style={{
          textAlign: "center",
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontSize: "0.68rem", letterSpacing: "0.04em",
          color: "var(--beacon-charcoal-mid)", opacity: 0.55,
          lineHeight: 1.4,
        }}>
          Enrollment opens soon. Take the assessment to reserve your place.
        </p>
        {product.pillarLink && product.pillarLink !== product.ctaLink && (
          <Link
            href={product.pillarLink}
            style={{
              display: "block", textAlign: "center",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.75rem", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: product.color, textDecoration: "none",
              padding: "0.375rem 0",
              borderBottom: `1px solid ${product.color}30`,
              transition: "border-color 0.18s",
            }}
          >
            Learn more →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  const mainProducts = PRODUCTS.filter((p) => !p.entryPoint);
  const entryProduct = PRODUCTS.find((p) => p.entryPoint)!;

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />

      {/* ── Hero band ── */}
      <section style={{ position: "relative", minHeight: "380px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover", backgroundPosition: "center 30%",
        }} />
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(28,28,30,0.4) 0%, rgba(28,28,30,0.7) 55%, rgba(28,28,30,0.92) 100%)",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4.5rem", paddingTop: "8rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            style={{ maxWidth: "680px" }}
          >
            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
              Membership Pricing
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "#FAF8F4", marginBottom: "1rem",
            }}>
              One price. Full access.<br />
              <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.85)" }}>No hidden tiers.</em>
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              lineHeight: 1.75, color: "rgba(250,248,244,0.72)",
              maxWidth: "560px", marginBottom: "2rem",
            }}>
              Every Beacon membership includes the full curriculum, live mentor sessions, the private community, and all AI tools. Choose the pillar that matches where you are right now.
            </p>

            {/* Billing toggle */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "2px",
              padding: "3px",
              border: "1px solid rgba(250,248,244,0.2)",
              background: "rgba(28,28,30,0.4)",
              backdropFilter: "blur(8px)",
            }}>
              {(["monthly", "annual"] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBilling(cycle)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 400, fontSize: "0.78rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "none",
                    background: billing === cycle ? "var(--beacon-teal)" : "transparent",
                    color: billing === cycle ? "#FAF8F4" : "rgba(250,248,244,0.6)",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                >
                  {cycle === "annual" ? "Annual" : "Monthly"}
                  {cycle === "annual" && (
                    <span style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontSize: "0.65rem", letterSpacing: "0.06em",
                      padding: "0.15rem 0.4rem",
                      background: billing === "annual" ? "rgba(255,255,255,0.2)" : "rgba(46,125,107,0.25)",
                      color: billing === "annual" ? "#FAF8F4" : "var(--beacon-teal-light, #2E7D6B)",
                    }}>
                      Save 30%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Five Pillars grid ── */}
      <section style={{ padding: "5rem 0 3rem", background: "var(--beacon-parchment)" }}>
        <div className="container">
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-charcoal-mid)", opacity: 0.55,
            marginBottom: "2rem", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
            The Five Pillars
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
            gap: "1.25rem",
          }}>
            {mainProducts.map((product, i) => (
              <PricingCard key={product.id} product={product} billing={billing} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Entry point — Beacon Trading ── */}
      <section style={{ padding: "0 0 5rem", background: "var(--beacon-parchment)" }}>
        <div className="container">
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-charcoal-mid)", opacity: 0.55,
            marginBottom: "2rem", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
            Start Here
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
          </div>
          <div style={{ maxWidth: "360px", margin: "0 auto" }}>
            <PricingCard product={entryProduct} billing={billing} index={mainProducts.length} />
          </div>
          <p style={{
            textAlign: "center",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "0.875rem", lineHeight: 1.75,
            color: "var(--beacon-charcoal-mid)",
            marginTop: "1.5rem",
            maxWidth: "520px", margin: "1.5rem auto 0",
          }}>
            Beacon Trading is the recommended entry point for members who want to build financial literacy before committing to a full pillar. At $97/month, it is designed to be accessible while you find your path.
          </p>
        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section style={{ padding: "5rem 0", borderTop: "1px solid var(--beacon-parchment-dark)", background: "var(--beacon-cream, #F5F0E8)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.7rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-charcoal-mid)", opacity: 0.55,
            marginBottom: "3rem", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
            Common Questions
            <span style={{ width: "2rem", height: "1px", background: "currentColor", display: "inline-block" }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "3rem",
          }}>
            {[
              {
                q: "Can I switch pillars?",
                a: "Yes. Members can move between pillars at any time. Your billing cycle resets to the new pillar's rate on your next billing date.",
              },
              {
                q: "Is there a refund policy?",
                a: "Monthly memberships can be cancelled before the next billing date. Annual memberships include a 30-day satisfaction guarantee from the start date.",
              },
              {
                q: "Not sure where to start?",
                a: "Take the Pathfinder Assessment. It takes about 5 minutes and maps your current situation to the pillar most likely to move the needle fastest.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <div style={{ width: "1.5rem", height: "2px", background: "var(--beacon-teal)", marginBottom: "1rem" }} />
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 600, fontSize: "1.2rem",
                  lineHeight: 1.3, letterSpacing: "-0.01em",
                  color: "var(--beacon-charcoal)",
                  marginBottom: "0.75rem",
                }}>
                  {q}
                </h3>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.875rem", lineHeight: 1.75,
                  color: "var(--beacon-charcoal-mid)",
                }}>
                  {a}
                </p>
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
            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
              The Pathfinder Assessment
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#FAF8F4", marginBottom: "1rem",
            }}>
              Not sure which path is right?
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "1rem",
              lineHeight: 1.75, color: "rgba(250,248,244,0.65)",
              marginBottom: "2.5rem",
            }}>
              The Pathfinder Assessment takes about 5 minutes and tells you exactly where to start — without a sales call, a commitment, or an obligation.
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
              Take the Assessment
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
