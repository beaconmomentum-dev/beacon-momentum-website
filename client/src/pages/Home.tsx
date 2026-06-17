/*
 * BEACON MOMENTUM — HOMEPAGE
 * Design: Deep Water Editorial / Quiet Authority
 * Sections:
 *   1. Navigation
 *   2. Hero — Full-bleed lighthouse, mission headline
 *   3. Mission Statement — The AI-era human capability company
 *   4. Five Pillars — Life, Work, Venture, Systems, Labs
 *   5. Pathfinder Assessment — Diagnostic front door
 *   6. Organic Trust Engine — YouTube + content strategy
 *   7. Beacon Labs Signal — Lead into beaconlabs.ai
 *   8. Footer
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { subscribeToBeaconBrief } from "@/lib/ghl";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import PillarIcon from "@/components/PillarIcon";

// ─── Asset URLs ────────────────────────────────────────────────────────────────
const HERO_IMG = "/images/beacon_hero.webp";
const PATHFINDER_IMG = "/images/beacon_pathfinder.webp";
const PILLARS_IMG = "/images/beacon_five_pillars.webp";
const TRUST_IMG = "/images/beacon_trust_engine.webp";
const WATCH_IMG = "/manus-storage/beacon_watch_community_c3645886.png";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Pillar {
  id: string;
  label: string;
  tagline: string;
  description: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  icon: string; // kept for legacy uses
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const PILLARS: Pillar[] = [
  {
    id: "life",
    label: "Beacon Life",
    tagline: "Staying capable and grounded through change",
    description:
      "The AI transition is not just a technology shift — it is a human one. Beacon Life helps people rebuild personal capacity, confidence, and identity when the ground is moving. Practical tools for staying whole when everything around you is accelerating.",
    accent: "#2E7D6B",
    accentBg: "rgba(46,125,107,0.07)",
    accentBorder: "rgba(46,125,107,0.25)",
    icon: "life",
  },
  {
    id: "work",
    label: "Beacon Work",
    tagline: "Adapting your skills and professional value",
    description:
      "The skills that built your career are not disappearing — but the context around them is changing fast. Beacon Work helps people understand what AI can and cannot replace, and how to position themselves for relevance, income, and dignity in the AI era.",
    accent: "#1A5C6B",
    accentBg: "rgba(26,92,107,0.07)",
    accentBorder: "rgba(26,92,107,0.25)",
    icon: "work",
  },
  {
    id: "venture",
    label: "Beacon Venture",
    tagline: "Building resilient income without paid-ad dependency",
    description:
      "Solopreneurship, digital products, and creator commerce built on organic trust — not cold traffic. Beacon Venture teaches people how to earn attention before asking for money, and how to build income streams that do not require a paid-ads budget to survive.",
    accent: "#8B5E3C",
    accentBg: "rgba(139,94,60,0.07)",
    accentBorder: "rgba(139,94,60,0.25)",
    icon: "venture",
  },
  {
    id: "systems",
    label: "Beacon Systems",
    tagline: "Private AI operations for small organizations",
    description:
      "Founders and small organizations need AI that works for them — not platforms that harvest their data, lock them into subscriptions, or make them dependent on tools they do not control. Beacon Systems installs trusted, private, AI-enabled operations built around sovereignty and usefulness.",
    accent: "#3D4F6B",
    accentBg: "rgba(61,79,107,0.07)",
    accentBorder: "rgba(61,79,107,0.25)",
    icon: "systems",
  },
  {
    id: "labs",
    label: "Beacon Labs",
    tagline: "The research, proof, and signal engine",
    description:
      "Every tool Beacon recommends, every system Beacon installs, and every method Beacon teaches has been tested and documented by Beacon Labs. We run the experiments, measure the results, and publish what works — including what failed and why. Beacon Labs is the proof that Beacon's credibility is earned, not claimed.",
    accent: "#5C3D6B",
    accentBg: "rgba(92,61,107,0.07)",
    accentBorder: "rgba(92,61,107,0.25)",
    icon: "labs",
  },
];

const PATHFINDER_PATHS = [
  {
    id: "life",
    label: "Beacon Life",
    question: "I need to rebuild my footing — personally, mentally, or financially.",
    accent: "#2E7D6B",
  },
  {
    id: "work",
    label: "Beacon Work",
    question: "I need to understand how AI affects my career and what to do about it.",
    accent: "#1A5C6B",
  },
  {
    id: "venture",
    label: "Beacon Venture",
    question: "I want to build income that does not depend on a job or paid ads.",
    accent: "#8B5E3C",
  },
  {
    id: "systems",
    label: "Beacon Systems",
    question: "I run a small organization and need trusted AI operations.",
    accent: "#3D4F6B",
  },
];

// ─── Scroll reveal hook ────────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(250,248,244,0.96)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(28,28,30,0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <span style={{
            width: "1.75rem", height: "1.75rem",
            background: "var(--beacon-teal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.9rem", color: "#FAF8F4",
          }}>
            ◈
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "1.125rem",
            color: scrolled ? "var(--beacon-charcoal)" : "#FAF8F4",
            letterSpacing: "-0.01em",
            transition: "color 0.3s",
          }}>
            Beacon Momentum
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
          {([
            { label: "The Five Pillars", href: "#pillars" },
            { label: "Beacon Labs", href: "https://beaconlabs.ai" },
            { label: "Signal Check", href: "https://beaconlabs.ai/signal-check" },
            { label: "About", href: "/about" },
          ] as { label: string; href: string }[]).map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.8125rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: scrolled ? "var(--beacon-charcoal-mid)" : "rgba(250,248,244,0.82)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? "var(--beacon-teal)" : "#FAF8F4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "var(--beacon-charcoal-mid)" : "rgba(250,248,244,0.82)")}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/assessment"
            className="btn-press"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.8125rem",
              letterSpacing: "0.04em",
              padding: "0.5rem 1.25rem",
              background: "var(--beacon-amber)",
              color: "#FAF8F4",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--beacon-amber-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--beacon-amber)")}
          >
            Find Your Path
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none", border: "none",
            color: scrolled ? "var(--beacon-charcoal)" : "#FAF8F4",
            fontSize: "1.25rem", cursor: "pointer",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "var(--beacon-parchment)",
          borderTop: "1px solid var(--beacon-parchment-dark)",
          padding: "1.5rem 1.25rem",
          display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>
          {([
            { label: "The Five Pillars", href: "#pillars" },
            { label: "Beacon Labs", href: "https://beaconlabs.ai" },
            { label: "Signal Check", href: "https://beaconlabs.ai/signal-check" },
            { label: "About", href: "/about" },
          ] as { label: string; href: string }[]).map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.875rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "var(--beacon-charcoal-mid)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/assessment"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.875rem",
              padding: "0.75rem 1.5rem",
              background: "var(--beacon-amber)",
              color: "#FAF8F4",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Find Your Path
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${HERO_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center 30%",
      }} />
      {/* Gradient overlay — dark at bottom for text, lighter at top */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(28,28,30,0.15) 0%, rgba(28,28,30,0.35) 50%, rgba(28,28,30,0.82) 100%)",
      }} />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "6rem", paddingTop: "8rem" }}>
        <div style={{ maxWidth: "720px" }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-amber-light)",
            marginBottom: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
            The AI-Era Human Capability Company
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
            lineHeight: 1.08, letterSpacing: "-0.025em",
            color: "#FAF8F4",
            marginBottom: "1.75rem",
            maxWidth: "640px",
          }}>
            You know what to do.<br />
            <em style={{ fontStyle: "italic", fontSize: "clamp(2.2rem, 4.8vw, 4.2rem)", color: "rgba(250,248,244,0.88)" }}>You just can't make yourself do it consistently.</em>
          </h1>

          {/* Reframe line */}
          <div style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
            letterSpacing: "0.04em",
            color: "var(--beacon-amber-light)",
            marginBottom: "1.5rem",
            paddingLeft: "0",
          }}>
            That is not a character flaw. That is what we solve.
          </div>

          {/* Closing promise */}
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            letterSpacing: "0.12em",
            color: "rgba(250,248,244,0.92)",
            marginBottom: "1.75rem",
            textTransform: "uppercase",
          }}>
            Stay human.&nbsp; Stay capable.&nbsp; Stay economically alive.
          </div>

          {/* Sub-headline */}
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: "clamp(1rem, 2vw, 1.15rem)",
            lineHeight: 1.75, color: "rgba(250,248,244,0.78)",
            maxWidth: "560px",
            marginBottom: "2.5rem",
          }}>
            Beacon closes the gap between knowing and doing — with practical systems, structured accountability, and guidance built for people navigating real transitions: career change, military service, life disruption, or the AI era arriving faster than expected.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <a
              href="/assessment"
              className="btn-press"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "0.875rem 2rem",
                background: "var(--beacon-amber)",
                color: "#FAF8F4",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--beacon-amber-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--beacon-amber)")}
            >
              Find Your Beacon Path
            </a>
            <a
              href="#pillars"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.85rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "rgba(250,248,244,0.75)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(250,248,244,0.3)",
                paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#FAF8F4"; e.currentTarget.style.borderColor = "#FAF8F4"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250,248,244,0.75)"; e.currentTarget.style.borderColor = "rgba(250,248,244,0.3)"; }}
            >
              Explore the Five Pillars
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        color: "rgba(250,248,244,0.5)",
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
        animation: "scrollBob 2.5s ease-in-out infinite",
      }}>
        <span>Scroll</span>
        <span style={{ fontSize: "1rem" }}>↓</span>
      </div>
      <style>{`
        @keyframes scrollBob {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}

// ─── Mission ───────────────────────────────────────────────────────────────────
function Mission() {
  const ref = useFadeUp();
  return (
    <section style={{ background: "var(--beacon-charcoal)", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span className="beam-divider" style={{ margin: "0 auto 1.5rem" }} />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            lineHeight: 1.3, letterSpacing: "-0.02em",
            color: "#FAF8F4",
            marginBottom: "2rem",
            fontStyle: "italic",
          }}>
            "Most people do not fail for lack of information. They fail for lack of implementation. Beacon is built for that gap."
          </h2>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.875rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(250,248,244,0.45)",
          }}>
            Beacon Momentum · Founded on Earned Trust
          </p>
        </div>

        {/* Three principles */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0",
          marginTop: "5rem",
          borderTop: "1px solid rgba(250,248,244,0.08)",
        }}>
          {[
            { rule: "The gap is real — and fixable.", sub: "Knowing what to do and consistently doing it are two completely different skills. We teach the second one." },
            { rule: "Systems over willpower.", sub: "Motivation is unreliable. Structure is not. Every Beacon method is built around that fact." },
            { rule: "Earned trust, not borrowed authority.", sub: "We document what works, what fails, and why — before we ask for a sale." },
          ].map((p, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 2rem",
                borderRight: i < 2 ? "1px solid rgba(250,248,244,0.08)" : "none",
                borderBottom: "none",
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "1.2rem",
                color: "#FAF8F4",
                marginBottom: "0.75rem",
                lineHeight: 1.3,
              }}>
                {p.rule}
              </div>
              <div style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "0.875rem",
                color: "rgba(250,248,244,0.5)",
                lineHeight: 1.7,
              }}>
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Five Pillars ──────────────────────────────────────────────────────────────
function FivePillars() {
  const [activePillar, setActivePillar] = useState<string>("life");
  const ref = useFadeUp();
  const active = PILLARS.find((p) => p.id === activePillar)!;

  return (
    <section id="pillars" style={{ background: "var(--beacon-parchment)", padding: "7rem 0" }}>
      <div className="container">
        {/* Section header */}
        <div ref={ref} className="fade-up" style={{ marginBottom: "4rem" }}>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-teal)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-teal)", display: "inline-block" }} />
            The Five Pillars
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: "var(--beacon-charcoal)",
            maxWidth: "600px",
          }}>
            Five ways Beacon keeps the light on.
          </h2>
        </div>

        {/* Pillars layout: tabs left, detail right */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          border: "1px solid var(--beacon-parchment-dark)",
        }}
          className="pillars-grid"
        >
          {/* Left: pillar list */}
          <div style={{ borderRight: "1px solid var(--beacon-parchment-dark)" }}>
            {PILLARS.map((pillar, i) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "1.75rem 2rem",
                  background: activePillar === pillar.id ? pillar.accentBg : "transparent",
                  borderLeft: activePillar === pillar.id ? `3px solid ${pillar.accent}` : "3px solid transparent",
                  borderBottom: i < PILLARS.length - 1 ? "1px solid var(--beacon-parchment-dark)" : "none",
                  cursor: "pointer",
                  transition: "background 0.25s, border-color 0.25s",
                  display: "flex", alignItems: "center", gap: "1rem",
                }}
              >
                <span style={{ flexShrink: 0, opacity: activePillar === pillar.id ? 1 : 0.45, transition: "opacity 0.25s" }}>
                  <PillarIcon pillarId={pillar.id} size={28} />
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 500, fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                    color: activePillar === pillar.id ? pillar.accent : "var(--beacon-charcoal)",
                    transition: "color 0.25s",
                    marginBottom: "0.2rem",
                  }}>
                    {pillar.label}
                  </div>
                  <div style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 400, fontSize: "0.8rem",
                    color: "var(--beacon-charcoal-mid)",
                    opacity: 0.7,
                    lineHeight: 1.4,
                  }}>
                    {pillar.tagline}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: active pillar detail */}
          <div style={{
            padding: "3rem",
            background: active.accentBg,
            display: "flex", flexDirection: "column", justifyContent: "center",
            minHeight: "420px",
          }}>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: active.accent,
              marginBottom: "1rem",
            }}>
              {active.label}
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.2, letterSpacing: "-0.02em",
              color: "var(--beacon-charcoal)",
              marginBottom: "1.5rem",
            }}>
              {active.tagline}
            </h3>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "1rem",
              lineHeight: 1.8, color: "var(--beacon-charcoal-mid)",
              marginBottom: "2rem",
            }}>
              {active.description}
            </p>
            <Link
              href={`/pillar/${active.id}`}
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: active.accent,
                textDecoration: "none",
                borderBottom: `1px solid ${active.accentBorder}`,
                paddingBottom: "2px",
                display: "inline-block",
                width: "fit-content",
                transition: "border-color 0.2s",
              }}
            >
              Explore {active.label} in depth →
            </Link>
          </div>
        </div>

        {/* Five pillars aerial image */}
        <div style={{ marginTop: "4rem", position: "relative", overflow: "hidden" }}>
          <img
            src={PILLARS_IMG}
            alt="Five lighthouse towers representing the five Beacon pillars"
            style={{ width: "100%", height: "320px", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(250,248,244,0.7) 0%, transparent 50%, rgba(250,248,244,0.7) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400, fontStyle: "italic",
              fontSize: "clamp(1.25rem, 3vw, 2rem)",
              color: "var(--beacon-charcoal)",
              textAlign: "center",
              maxWidth: "600px",
              lineHeight: 1.4,
            }}>
              Five lights. One mission. Every path leads to the same shore.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .pillars-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--beacon-parchment-dark);
          }
        }
      `}</style>
    </section>
  );
}

// ─── Pathfinder Assessment ─────────────────────────────────────────────────────
function PathfinderAssessment() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useFadeUp();

  return (
    <section id="pathfinder" style={{ background: "var(--beacon-cream)", padding: "7rem 0" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
          className="pathfinder-grid"
        >
          {/* Left: image */}
          <div style={{ position: "relative" }}>
            <img
              src={PATHFINDER_IMG}
              alt="Nautical compass on an aged maritime chart"
              style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
              background: "var(--beacon-teal)",
              padding: "1.5rem 2rem",
              maxWidth: "240px",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "1.1rem",
                color: "#FAF8F4", lineHeight: 1.3,
              }}>
                5 minutes.<br />No sales call.<br />Real clarity.
              </div>
            </div>
          </div>

          {/* Right: assessment */}
          <div ref={ref} className="fade-up">
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber)",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber)", display: "inline-block" }} />
              The Pathfinder Assessment
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.15, letterSpacing: "-0.02em",
              color: "var(--beacon-charcoal)",
              marginBottom: "1.25rem",
            }}>
              Which Beacon path is right for you?
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "1rem",
              lineHeight: 1.75, color: "var(--beacon-charcoal-mid)",
              marginBottom: "2rem",
            }}>
              The AI transition affects everyone differently. The Pathfinder Assessment finds where you are standing right now and routes you to the Beacon pillar that will help you most — without a sales pitch, a call, or an obligation.
            </p>

            {/* Path selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              <p style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.75rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--beacon-charcoal-mid)",
                marginBottom: "0.25rem",
              }}>
                What describes you best right now?
              </p>
              {PATHFINDER_PATHS.map((path) => (
                <button
                  key={path.id}
                  onClick={() => setSelected(path.id)}
                  style={{
                    textAlign: "left",
                    padding: "1rem 1.25rem",
                    background: selected === path.id ? `${path.accent}12` : "white",
                    border: selected === path.id ? `1.5px solid ${path.accent}` : "1.5px solid var(--beacon-parchment-dark)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: "0.875rem",
                  }}
                >
                  <span style={{
                    width: "0.5rem", height: "0.5rem",
                    borderRadius: "50%",
                    background: selected === path.id ? path.accent : "var(--beacon-parchment-dark)",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }} />
                  <div>
                    <div style={{
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      fontWeight: 500, fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                      color: selected === path.id ? path.accent : "var(--beacon-charcoal-mid)",
                      marginBottom: "0.2rem",
                      transition: "color 0.2s",
                    }}>
                      {path.label}
                    </div>
                    <div style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontWeight: 400, fontSize: "0.875rem",
                      color: "var(--beacon-charcoal)",
                      lineHeight: 1.5,
                    }}>
                      {path.question}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Link
              href={selected ? `/assessment?path=${selected}` : "/assessment"}
              className="btn-press"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "0.875rem 2rem",
                background: selected ? "var(--beacon-teal)" : "var(--beacon-parchment-dark)",
                color: selected ? "#FAF8F4" : "var(--beacon-charcoal-mid)",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.3s, color 0.3s",
                pointerEvents: selected ? "auto" : "none",
              }}
            >
              {selected ? `Begin My ${PATHFINDER_PATHS.find(p => p.id === selected)?.label} Assessment →` : "Select a path above"}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pathfinder-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Who Beacon Is For ────────────────────────────────────────────────────────
function WhoItIsFor() {
  const ref = useFadeUp();
  const personas = [
    {
      icon: "life",
      label: "Veterans & Caregivers in Transition",
      desc: "You served, sacrificed, or gave years to someone else's needs. Now the world has changed and your skills feel invisible. Beacon Life and Beacon Work were built around your reality.",
      accent: "#2E7D6B",
      path: "life",
    },
    {
      icon: "work",
      label: "Mid-Career Professionals Feeling the Shift",
      desc: "Your job is not gone yet — but you can feel the ground moving. You need to understand what AI actually means for your career, not the hype version. Beacon Work gives you that clarity.",
      accent: "#1A5C6B",
      path: "work",
    },
    {
      icon: "venture",
      label: "Solopreneurs & Creators Without a Budget",
      desc: "You have a skill, an idea, or just the determination to build something real. You have probably already learned that paid ads are not the answer. Beacon Venture is the organic-first alternative.",
      accent: "#8B5E3C",
      path: "venture",
    },
    {
      icon: "systems",
      label: "Small Business Owners & Operators",
      desc: "You run a real organization with real people and real complexity. You need AI that works for you — not platforms that harvest your data or consultants who disappear after the invoice. Beacon Systems.",
      accent: "#3D4F6B",
      path: "systems",
    },
  ];

  return (
    <section style={{ background: "white", padding: "7rem 0", borderTop: "1px solid var(--beacon-parchment-dark)" }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ marginBottom: "4rem" }}>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-amber)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber)", display: "inline-block" }} />
            Who Beacon Is For
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: "var(--beacon-charcoal)",
            maxWidth: "560px",
          }}>
            If you recognize yourself here, you are in the right place.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}>
          {personas.map((p) => (
            <Link
              key={p.path}
              href={`/pillar/${p.path}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "2rem",
                  border: "1px solid var(--beacon-parchment-dark)",
                  background: "var(--beacon-parchment)",
                  height: "100%",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = p.accent;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${p.accent}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--beacon-parchment-dark)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <PillarIcon pillarId={p.icon} size={40} />
                </div>
                <div style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 600, fontSize: "0.9rem",
                  letterSpacing: "0.01em",
                  color: "var(--beacon-charcoal)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}>
                  {p.label}
                </div>
                <p style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.875rem",
                  lineHeight: 1.75, color: "var(--beacon-charcoal-mid)",
                  marginBottom: "1.25rem",
                }}>
                  {p.desc}
                </p>
                <span style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.75rem",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: p.accent,
                  borderBottom: `1px solid ${p.accent}40`,
                  paddingBottom: "2px",
                }}>
                  Find my path →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
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
      // Silent fail — still show confirmation so UX is uninterrupted
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section style={{ background: "var(--beacon-parchment)", padding: "5rem 0", borderTop: "1px solid var(--beacon-parchment-dark)" }}>
      <div className="container">
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-teal)",
            display: "block", marginBottom: "1rem",
          }}>
            The Beacon Brief
          </span>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.2, letterSpacing: "-0.02em",
            color: "var(--beacon-charcoal)",
            marginBottom: "0.875rem",
          }}>
            One weekly signal. No noise.
          </h3>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: "0.9rem",
            lineHeight: 1.75, color: "var(--beacon-charcoal-mid)",
            marginBottom: "2rem",
          }}>
            The Beacon Brief summarizes the week's most important AI transition developments, Beacon Labs experiments, and practical actions — in five minutes or less.
          </p>
          {submitted ? (
            <div style={{
              padding: "1.25rem 2rem",
              background: "rgba(46,125,107,0.08)",
              border: "1px solid rgba(46,125,107,0.25)",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.9rem",
              color: "var(--beacon-teal)",
            }}>
              You are on the list. The first Brief arrives this week.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0", maxWidth: "440px", margin: "0 auto" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: "0.875rem 1.25rem",
                  border: "1.5px solid var(--beacon-parchment-dark)",
                  borderRight: "none",
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.9rem",
                  color: "var(--beacon-charcoal)",
                  background: "white",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-press"
                style={{
                  padding: "0.875rem 1.5rem",
                  background: loading ? "var(--beacon-teal-muted, #2e7d6b)" : "var(--beacon-teal)",
                  color: "#FAF8F4",
                  border: "none",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.8rem",
                  letterSpacing: "0.04em",
                  cursor: loading ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "var(--beacon-charcoal-mid)",
            opacity: 0.5,
            marginTop: "1rem",
          }}>
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Organic Trust Engine ──────────────────────────────────────────────────────
function TrustEngine() {
  const ref = useFadeUp();
  return (
    <section style={{ background: "var(--beacon-charcoal)", padding: "7rem 0", position: "relative", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${TRUST_IMG})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.12,
      }} />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div ref={ref} className="fade-up" style={{ maxWidth: "640px", marginBottom: "4rem" }}>
          <span style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 400, fontSize: "0.75rem",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--beacon-amber-light)",
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1rem",
          }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
            How Beacon Grows
          </span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15, letterSpacing: "-0.025em",
            color: "#FAF8F4",
            marginBottom: "1.25rem",
          }}>
            We earn trust before we ask for anything.
          </h2>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 400, fontSize: "1rem",
            lineHeight: 1.8, color: "rgba(250,248,244,0.65)",
          }}>
            Beacon does not buy its way to relevance. We build public usefulness through YouTube education, transparent case studies, organic community, and documented proof — and we amplify only what the market has already shown it wants.
          </p>
        </div>

        {/* Trust engine pillars */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "0",
          borderTop: "1px solid rgba(250,248,244,0.1)",
          borderLeft: "1px solid rgba(250,248,244,0.1)",
        }}>
          {[
            {
              icon: "▶",
              label: "YouTube Education",
              desc: "Long-form teaching, case studies, and transparent experiments. Published weekly.",
            },
            {
              icon: "◈",
              label: "Organic Discovery",
              desc: "AI search visibility, SEO, and content that earns its own traffic without paid amplification.",
            },
            {
              icon: "◇",
              label: "Documented Proof",
              desc: "Beacon Labs publishes what works, what failed, and what the data actually shows.",
            },
            {
              icon: "◉",
              label: "Community Trust",
              desc: "Peer learning, shared implementation, and real results from real people — not testimonials.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 2rem",
                borderRight: "1px solid rgba(250,248,244,0.1)",
                borderBottom: "1px solid rgba(250,248,244,0.1)",
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                color: "var(--beacon-amber-light)",
                marginBottom: "1rem",
              }}>
                {item.icon}
              </div>
              <div style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.875rem",
                letterSpacing: "0.04em",
                color: "#FAF8F4",
                marginBottom: "0.625rem",
              }}>
                {item.label}
              </div>
              <div style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "0.875rem",
                lineHeight: 1.7, color: "rgba(250,248,244,0.5)",
              }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Doctrine line */}
        <div style={{
          marginTop: "4rem",
          padding: "2rem 2.5rem",
          borderLeft: "3px solid var(--beacon-amber)",
          background: "rgba(200,134,10,0.06)",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            lineHeight: 1.5, color: "#FAF8F4",
          }}>
            "We will not buy our way out of unclear positioning. We will earn trust through public usefulness, then amplify what the market has already proven it wants."
          </p>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(250,248,244,0.35)",
            marginTop: "0.75rem",
          }}>
            Beacon Operating Doctrine
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── The Watch ────────────────────────────────────────────────────────────────
function TheWatch() {
  const ref = useFadeUp();
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "0" }}>
      {/* Full-bleed image */}
      <div style={{
        position: "relative",
        minHeight: "520px",
        display: "flex", alignItems: "center",
        background: "#0A1628",
      }}>
        <img
          src={WATCH_IMG}
          alt="The Watch — Beacon Momentum community"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.55,
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,22,40,0.92) 40%, rgba(10,22,40,0.3) 100%)",
        }} />
        {/* Content */}
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "6rem 0" }}>
          <div ref={ref} className="fade-up" style={{ maxWidth: "580px" }}>
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)",
              display: "flex", alignItems: "center", gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
              The Watch
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              lineHeight: 1.1, letterSpacing: "-0.025em",
              color: "#FAF8F4",
              marginBottom: "1.5rem",
            }}>
              The Lighthouse Is Lit.<br />
              <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.82)" }}>Join Us at the Watch.</em>
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "1rem",
              lineHeight: 1.8, color: "rgba(250,248,244,0.72)",
              marginBottom: "2.5rem",
            }}>
              Beacon is not a course platform. It is a team on watch — a collective of people who have decided to navigate the AI transition together, with clear eyes and practical tools. We do not promise transformation. We build the conditions for it.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="/assessment"
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  padding: "0.875rem 2rem",
                  background: "var(--beacon-amber)",
                  color: "#FAF8F4",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--beacon-amber-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--beacon-amber)")}
              >
                Find Your Path
              </a>
              <a
                href="/about"
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 400, fontSize: "0.8rem",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: "rgba(250,248,244,0.65)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(250,248,244,0.25)",
                  paddingBottom: "2px",
                }}
              >
                Our Doctrine →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Beacon Labs Signal ────────────────────────────────────────────────────────
function LabsSignal() {
  const ref = useFadeUp();
  return (
    <section style={{ background: "var(--beacon-teal)", padding: "5rem 0" }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "2rem",
        }}>
          <div style={{ maxWidth: "560px" }}>
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.7rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(250,248,244,0.6)",
              display: "block", marginBottom: "0.75rem",
            }}>
              Beacon Labs · AI Visibility Intelligence
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              lineHeight: 1.15, letterSpacing: "-0.02em",
              color: "#FAF8F4",
              marginBottom: "1rem",
            }}>
              Is your business visible to AI?
            </h2>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "0.975rem",
              lineHeight: 1.75, color: "rgba(250,248,244,0.72)",
            }}>
              The Beacon Signal Check queries ChatGPT, Gemini, Perplexity, and Claude with the exact prompts your customers are using — and scores how often and how accurately your business appears. Free. No sales call. Delivered within 24 hours.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
            <a
              href="https://beaconlabs.ai/signal-check"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 500, fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "0.875rem 2rem",
                background: "var(--beacon-amber)",
                color: "#FAF8F4",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--beacon-amber-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--beacon-amber)")}
            >
              Get My Free Signal Check
            </a>
            <a
              href="https://beaconlabs.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.8rem",
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "rgba(250,248,244,0.6)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(250,248,244,0.2)",
                paddingBottom: "2px",
              }}
            >
              Visit Beacon Labs →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--beacon-charcoal)", borderTop: "1px solid rgba(250,248,244,0.06)", padding: "4rem 0 2.5rem" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "3rem",
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
              <span style={{
                width: "1.5rem", height: "1.5rem",
                background: "var(--beacon-teal)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", color: "#FAF8F4",
              }}>◈</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "1rem",
                color: "#FAF8F4", letterSpacing: "-0.01em",
              }}>Beacon Momentum</span>
            </div>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 400, fontSize: "0.875rem",
              lineHeight: 1.75, color: "rgba(250,248,244,0.45)",
              maxWidth: "280px",
            }}>
              The AI-era human capability and operations company. Helping people remain human, capable, and economically alive through the transition.
            </p>
            {/* Contact details */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="tel:+18884377657" style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.8rem",
                color: "rgba(250,248,244,0.45)",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.45)")}>
                (888) 437-7657
              </a>
              <a href="mailto:info@beaconmomentum.com" style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.8rem",
                color: "rgba(250,248,244,0.45)",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.45)")}>
                info@beaconmomentum.com
              </a>
              <span style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.8rem",
                color: "rgba(250,248,244,0.35)",
                letterSpacing: "0.03em",
              }}>
                PO Box 244, Cheshire, MA 01225
              </span>
            </div>
          </div>

          {/* Pillars */}
          <div>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.7rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(250,248,244,0.35)",
              marginBottom: "1rem",
            }}>The Five Pillars</div>
            {([
              { label: "Beacon Life", id: "life" },
              { label: "Beacon Work", id: "work" },
              { label: "Beacon Venture", id: "venture" },
              { label: "Beacon Systems", id: "systems" },
              { label: "Beacon Labs", id: "labs" },
            ] as { label: string; id: string }[]).map((item) => (
              <Link key={item.id} href={`/pillar/${item.id}`} style={{
                display: "block",
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "0.875rem",
                color: "rgba(250,248,244,0.55)",
                textDecoration: "none",
                marginBottom: "0.5rem",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF8F4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.55)")}
              >{item.label}</Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.7rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(250,248,244,0.35)",
              marginBottom: "1rem",
            }}>Resources</div>
            {([
              { label: "Pathfinder Assessment", href: "/assessment" },
              { label: "Free Resources", href: "/resources" },
              { label: "Digital Grandpa", href: "/digital-grandpa" },
              { label: "Contact Us", href: "/contact" },
              { label: "Signal Check", href: "https://beaconlabs.ai/signal-check" },
              { label: "YouTube Channel", href: "https://youtube.com/@BeaconMomentumAI" },
              { label: "Beacon Labs", href: "https://beaconlabs.ai" },
              { label: "Beacon Trading", href: "https://beacontrading.ai" },
            ] as { label: string; href: string }[]).map((item) => (
              <a key={item.label} href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "block",
                  fontFamily: "'Lora', Georgia, serif",
                  fontWeight: 400, fontSize: "0.875rem",
                  color: "rgba(250,248,244,0.55)",
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF8F4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.55)")}
              >{item.label}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 500, fontSize: "0.7rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(250,248,244,0.35)",
              marginBottom: "1rem",
            }}>Company</div>
            {([
              { label: "About Beacon", href: "/about" },
              { label: "Company Information", href: "/company" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Disclaimer", href: "/disclaimer" },
            ] as { label: string; href: string }[]).map((item) => (
              <a key={item.label} href={item.href} style={{
                display: "block",
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "0.875rem",
                color: "rgba(250,248,244,0.55)",
                textDecoration: "none",
                marginBottom: "0.5rem",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF8F4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.55)")}
              >{item.label}</a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(250,248,244,0.08)",
          paddingTop: "1.5rem",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
        }}>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            color: "rgba(250,248,244,0.3)",
            letterSpacing: "0.04em",
          }}>
            © {new Date().getFullYear()} Beacon Momentum. All rights reserved.
          </p>
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontWeight: 300, fontSize: "0.75rem",
            color: "rgba(250,248,244,0.2)",
            letterSpacing: "0.04em",
          }}>
            Earn · Prove · Amplify
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  // Initialize scroll reveal for all .fade-up elements
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <Hero />
      <Mission />
      <FivePillars />
      <WhoItIsFor />
      <PathfinderAssessment />
      <TrustEngine />
      <TheWatch />
      <LabsSignal />
      <Newsletter />
      <SharedFooter />
    </div>
  );
}
