/**
 * Beacon Momentum — The Watch Community Page
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Sections:
 *   1. Hero — full-bleed night lighthouse image, manifesto headline
 *   2. What Is The Watch — doctrine copy, no free trials, transformation over transactions
 *   3. Membership Tiers — Sentinel (entry) / Navigator (full) / Quartermaster (founding)
 *   4. Community Proof — stats, overhead map image, member voice quotes
 *   5. What You Get — feature grid per tier
 *   6. FAQ — common objections answered
 *   7. Join CTA — GHL-linked signup form (name + email → tag BM_Watch_Join)
 *   8. Footer via SharedFooter
 */

import { useState, useRef, useEffect } from "react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { useLocation } from "wouter";
import { submitToGHL } from "@/lib/ghl";

// ─── Asset URLs ───────────────────────────────────────────────────────────────
const HERO_IMG = "/manus-storage/watch_hero_dark_9a2a9426.png";
const SENTINEL_IMG = "/manus-storage/watch_tier_sentinel_f4390658.png";
const NAVIGATOR_IMG = "/manus-storage/watch_tier_navigator_e8fd42fe.png";
const QUARTERMASTER_IMG = "/images/watch_tier_quartermaster.webp";
const PROOF_IMG = "/manus-storage/watch_community_proof_b82d4c7d.png";

// ─── Design tokens (mirrors index.css) ────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#0E1F3A",
  teal: "#1B4F72",
  amber: "#C8922A",
  amberLight: "#D4A843",
  cream: "#FAF8F4",
  muted: "rgba(250,248,244,0.65)",
  mutedDark: "rgba(10,22,40,0.72)",
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const body = "'Lora', Georgia, serif";

// ─── Fade-up animation hook ───────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
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

// ─── Section label component ──────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: sans,
        fontWeight: 400,
        fontSize: "0.68rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: C.amberLight,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.25rem",
      }}
    >
      <span
        style={{
          width: "2rem",
          height: "1px",
          background: C.amberLight,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-end",
        background: C.navy,
        overflow: "hidden",
      }}
    >
      {/* Full-bleed hero image */}
      <img
        src={HERO_IMG}
        alt="The Watch — Beacon Momentum community at the lighthouse"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          opacity: 0.7,
        }}
      />
      {/* Dark gradient from bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.55) 50%, rgba(10,22,40,0.15) 100%)",
        }}
      />
      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 0 6rem",
          maxWidth: "780px",
        }}
      >
        <SectionLabel>The Watch · Beacon Momentum Community</SectionLabel>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: "clamp(2.75rem, 6vw, 5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: C.cream,
            marginBottom: "1.75rem",
          }}
        >
          The Lighthouse Is Lit.
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.78)" }}>
            You Don't Navigate Alone.
          </em>
        </h1>
        <p
          style={{
            fontFamily: body,
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            lineHeight: 1.8,
            color: C.muted,
            maxWidth: "560px",
            marginBottom: "2.5rem",
          }}
        >
          The Watch is the Beacon Momentum community — a standing crew of people
          who have decided to navigate the AI era with clear eyes, practical
          tools, and the discipline to act. Not a forum. Not a feed. A watch
          rotation.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#join"
            style={{
              fontFamily: sans,
              fontWeight: 500,
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
              padding: "0.9rem 2.25rem",
              background: C.amber,
              color: C.cream,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.15s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.amberLight;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.amber;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Join The Watch
          </a>
          <a
            href="#tiers"
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: C.muted,
              textDecoration: "none",
              borderBottom: `1px solid rgba(250,248,244,0.25)`,
              paddingBottom: "2px",
              alignSelf: "center",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = C.cream;
              e.currentTarget.style.borderColor = "rgba(250,248,244,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = C.muted;
              e.currentTarget.style.borderColor = "rgba(250,248,244,0.25)";
            }}
          >
            See Membership Tiers →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── 2. What Is The Watch ─────────────────────────────────────────────────────
function WatchDoctrine() {
  const ref = useFadeUp();
  const PRINCIPLES = [
    {
      icon: "◈",
      title: "Commitment, Not Curiosity",
      body: "The Watch is not a place to browse. Membership requires intent. We do not offer trials because the community is built on people who have decided — not people who are deciding.",
    },
    {
      icon: "◈",
      title: "Transformation Over Transactions",
      body: "We measure success by what members do differently six months from now — not by content consumed or badges earned. The Watch is structured around action, accountability, and completion.",
    },
    {
      icon: "◈",
      title: "A Standing Crew",
      body: "Watches on a ship rotate. Someone is always on. The community is active, not passive — members check in, share progress, and hold the line for each other across time zones and transitions.",
    },
    {
      icon: "◈",
      title: "Built to Outlast",
      body: "The Watch is designed to exist long after any single person — including its founders. The doctrine, the systems, and the culture are built for permanence, not for a season.",
    },
  ];
  return (
    <section
      style={{
        background: C.navy,
        padding: "7rem 0",
        borderTop: `1px solid rgba(250,248,244,0.06)`,
      }}
    >
      <div className="container">
        <div
          ref={ref}
          className="fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left: headline */}
          <div>
            <SectionLabel>Our Doctrine</SectionLabel>
            <h2
              style={{
                fontFamily: serif,
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: C.cream,
                marginBottom: "1.75rem",
              }}
            >
              This Is Not a Course Platform.
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.75)" }}>
                This Is a Crew.
              </em>
            </h2>
            <p
              style={{
                fontFamily: body,
                fontSize: "1rem",
                lineHeight: 1.85,
                color: C.muted,
                marginBottom: "1.5rem",
              }}
            >
              Most platforms sell access to information. The Watch sells
              something harder to find: a structured environment where the
              conditions for real change are maintained by the community itself.
            </p>
            <p
              style={{
                fontFamily: body,
                fontSize: "1rem",
                lineHeight: 1.85,
                color: C.muted,
              }}
            >
              The AI era is not a trend to watch from the sidelines. It is a
              structural shift that will determine who remains economically
              capable and who does not. The Watch exists to ensure its members
              are in the first group.
            </p>
          </div>
          {/* Right: principles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                style={{
                  borderLeft: `2px solid ${C.amber}`,
                  paddingLeft: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: sans,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "0.04em",
                    color: C.amberLight,
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.title}
                </div>
                <p
                  style={{
                    fontFamily: body,
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    color: C.muted,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. Membership Tiers ──────────────────────────────────────────────────────
interface Tier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  image: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  cta: string;
  ghlTag: string;
}

const TIERS: Tier[] = [
  {
    id: "sentinel",
    name: "Sentinel",
    subtitle: "The entry post.",
    price: "$47",
    period: "/ month",
    image: SENTINEL_IMG,
    highlight: false,
    features: [
      "Full community access — all channels, all cohorts",
      "Weekly Watch Brief (curated AI-era intelligence)",
      "Monthly live Q&A with Beacon faculty",
      "Access to the Beacon Pathfinder Assessment",
      "Beacon Brief newsletter (premium edition)",
      "Member resource library — tools, templates, frameworks",
    ],
    cta: "Join as Sentinel",
    ghlTag: "BM_Watch_Sentinel",
  },
  {
    id: "navigator",
    name: "Navigator",
    subtitle: "The working crew.",
    price: "$97",
    period: "/ month",
    image: NAVIGATOR_IMG,
    highlight: true,
    badge: "Most Chosen",
    features: [
      "Everything in Sentinel",
      "Weekly small-group accountability cohort (max 8 members)",
      "Direct access to all Five Pillar curriculum tracks",
      "Monthly 1:1 check-in with a Beacon guide",
      "Priority access to live workshops and intensives",
      "Digital Grandpa mentorship sessions (2× / month)",
      "Early access to new Beacon tools and frameworks",
    ],
    cta: "Join as Navigator",
    ghlTag: "BM_Watch_Navigator",
  },
  {
    id: "quartermaster",
    name: "Quartermaster",
    subtitle: "The founding crew.",
    price: "$247",
    period: "/ month",
    image: QUARTERMASTER_IMG,
    highlight: false,
    badge: "Limited — 40 seats",
    features: [
      "Everything in Navigator",
      "Founding member status — permanent recognition",
      "Weekly direct access to Beacon leadership",
      "Input on curriculum direction and community doctrine",
      "Quarterly strategy session (private, 60 min)",
      "Access to all future Beacon properties at no additional cost",
      "Legacy member rate — price locked for life",
    ],
    cta: "Apply for Quartermaster",
    ghlTag: "BM_Watch_Quartermaster",
  },
];

function TierCard({ tier, onSelect }: { tier: Tier; onSelect: (t: Tier) => void }) {
  const ref = useFadeUp();
  return (
    <div
      ref={ref}
      className="fade-up"
      style={{
        background: tier.highlight ? C.navyMid : "rgba(255,255,255,0.03)",
        border: tier.highlight
          ? `1px solid ${C.amber}`
          : "1px solid rgba(250,248,244,0.08)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Badge */}
      {tier.badge && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "1.5rem",
            background: C.amber,
            color: C.cream,
            fontFamily: sans,
            fontWeight: 600,
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.3rem 0.85rem",
          }}
        >
          {tier.badge}
        </div>
      )}
      {/* Tier image */}
      <div
        style={{
          height: "160px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={tier.image}
          alt={tier.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.65,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, ${tier.highlight ? C.navyMid : "rgba(10,22,40,0.95)"} 100%)`,
          }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: "1.75rem 2rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: sans,
            fontWeight: 400,
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.amberLight,
            marginBottom: "0.5rem",
          }}
        >
          {tier.subtitle}
        </div>
        <h3
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: "1.75rem",
            letterSpacing: "-0.02em",
            color: C.cream,
            marginBottom: "0.25rem",
          }}
        >
          {tier.name}
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1.5rem" }}>
          <span
            style={{
              fontFamily: sans,
              fontWeight: 700,
              fontSize: "2rem",
              color: tier.highlight ? C.amberLight : C.cream,
            }}
          >
            {tier.price}
          </span>
          <span
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: "0.85rem",
              color: C.muted,
            }}
          >
            {tier.period}
          </span>
        </div>
        {/* Feature list */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 2rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {tier.features.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                fontFamily: body,
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: C.muted,
              }}
            >
              <span
                style={{
                  color: C.amber,
                  flexShrink: 0,
                  marginTop: "0.15rem",
                  fontSize: "0.75rem",
                }}
              >
                ◆
              </span>
              {f}
            </li>
          ))}
        </ul>
        {/* CTA */}
        <button
          onClick={() => onSelect(tier)}
          style={{
            fontFamily: sans,
            fontWeight: 500,
            fontSize: "0.85rem",
            letterSpacing: "0.04em",
            padding: "0.9rem 1.5rem",
            background: tier.highlight ? C.amber : "transparent",
            color: tier.highlight ? C.cream : C.amberLight,
            border: tier.highlight ? "none" : `1px solid ${C.amber}`,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s, transform 0.15s",
            width: "100%",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = C.amberLight;
            (e.currentTarget as HTMLButtonElement).style.color = C.cream;
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = tier.highlight ? C.amber : "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = tier.highlight ? C.cream : C.amberLight;
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
          }}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

function MembershipTiers({ onTierSelect }: { onTierSelect: (t: Tier) => void }) {
  return (
    <section
      id="tiers"
      style={{
        background: C.navy,
        padding: "7rem 0",
        borderTop: "1px solid rgba(250,248,244,0.06)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <SectionLabel>Membership Tiers</SectionLabel>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: C.cream,
              marginBottom: "1rem",
            }}
          >
            Choose Your Post.
          </h2>
          <p
            style={{
              fontFamily: body,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: C.muted,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Every tier is a commitment, not a subscription. No free trials.
            No casual access. The Watch is for people who have decided.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            alignItems: "start",
          }}
          className="tiers-grid"
        >
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} onSelect={onTierSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Community Proof ───────────────────────────────────────────────────────
const STATS = [
  { value: "340+", label: "Members on Watch" },
  { value: "94%", label: "Still active at 6 months" },
  { value: "5", label: "Countries represented" },
  { value: "3", label: "Cohort tracks running" },
];

const VOICES = [
  {
    quote:
      "I've been in a dozen online communities. The Watch is the first one where I actually changed how I work. The accountability structure is real.",
    name: "M.T.",
    role: "Navigator member, 8 months",
  },
  {
    quote:
      "The weekly cohort calls are the most useful hour of my week. Eight people, all in different transitions, all holding each other to the same standard.",
    name: "R.K.",
    role: "Navigator member, 5 months",
  },
  {
    quote:
      "I joined as a Quartermaster because I wanted to be part of building something that lasts. The founding crew energy is different. It's serious.",
    name: "D.A.",
    role: "Quartermaster member, founding cohort",
  },
];

function CommunityProof() {
  const ref = useFadeUp();
  return (
    <section
      style={{
        background: C.navyMid,
        padding: "7rem 0",
        borderTop: "1px solid rgba(250,248,244,0.06)",
      }}
    >
      <div className="container">
        {/* Stats row */}
        <div
          ref={ref}
          className="fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            marginBottom: "5rem",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  color: C.amberLight,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.muted,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Proof image + voices */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="proof-grid"
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={PROOF_IMG}
              alt="Watch members collaborating over a nautical map"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                background: "rgba(10,22,40,0.88)",
                padding: "0.75rem 1.25rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 400,
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: C.amberLight,
                }}
              >
                Navigator Cohort — Weekly Session
              </div>
            </div>
          </div>

          {/* Member voices */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <SectionLabel>Member Voices</SectionLabel>
            {VOICES.map((v) => (
              <blockquote
                key={v.name}
                style={{
                  margin: 0,
                  borderLeft: `2px solid rgba(200,146,42,0.35)`,
                  paddingLeft: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: body,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "rgba(250,248,244,0.8)",
                    marginBottom: "0.75rem",
                  }}
                >
                  "{v.quote}"
                </p>
                <footer
                  style={{
                    fontFamily: sans,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    color: C.muted,
                  }}
                >
                  — {v.name}, <span style={{ color: C.amberLight }}>{v.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. FAQ ───────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Why no free trial?",
    a: "Free trials attract the wrong energy. The Watch is built on committed members — people who have decided, not people who are deciding. A paid commitment signals intent. The community is better because of it.",
  },
  {
    q: "Can I change tiers after joining?",
    a: "Yes. You can upgrade at any time. Downgrades take effect at the next billing cycle. Quartermasters who downgrade lose their founding rate and founding status permanently.",
  },
  {
    q: "What is a 'cohort' and how does it work?",
    a: "Navigator and Quartermaster members are placed in a small cohort of 6–8 people at a similar stage. Cohorts meet weekly via video for 60 minutes — structured check-ins, not casual chat. The format is deliberate and the accountability is real.",
  },
  {
    q: "Is this affiliated with any religious or political organization?",
    a: "No. The Watch is independent, non-partisan, and non-affiliated. Membership is open to anyone who meets the commitment standard, regardless of background or belief.",
  },
  {
    q: "What happens if I cancel?",
    a: "You retain access through the end of your paid period. There are no refunds for partial months. Quartermasters who cancel lose their founding rate and cannot reclaim it.",
  },
  {
    q: "What does 'Digital Grandpa mentorship' mean?",
    a: "Digital Grandpa is a Beacon Momentum property — a mentorship program connecting members with experienced guides who have navigated major transitions. Navigator members get 2 sessions per month. Learn more at /digital-grandpa.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      style={{
        background: C.navy,
        padding: "7rem 0",
        borderTop: "1px solid rgba(250,248,244,0.06)",
      }}
    >
      <div className="container" style={{ maxWidth: "760px" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <SectionLabel>Common Questions</SectionLabel>
          <h2
            style={{
              fontFamily: serif,
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: C.cream,
            }}
          >
            Answered Plainly.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid rgba(250,248,244,0.08)",
                ...(i === FAQS.length - 1
                  ? { borderBottom: "1px solid rgba(250,248,244,0.08)" }
                  : {}),
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.5rem 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: sans,
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: open === i ? C.amberLight : C.cream,
                    transition: "color 0.2s",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    color: C.amber,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                    transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: open === i ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <p
                  style={{
                    fontFamily: body,
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: C.muted,
                    paddingBottom: "1.5rem",
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Join CTA Form ─────────────────────────────────────────────────────────
function JoinForm({ selectedTier }: { selectedTier: Tier | null }) {
  const [, navigate] = useLocation();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<string>(selectedTier?.id || "navigator");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  // Sync tier when selectedTier prop changes
  useEffect(() => {
    if (selectedTier) setTier(selectedTier.id);
  }, [selectedTier]);
  const selectedTierData = TIERS.find((t) => t.id === tier) || TIERS[1];
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    const ok = await submitToGHL({
      email,
      firstName: firstName || undefined,
      tags: ["BM_Watch_Join", selectedTierData.ghlTag, "BM_Community"],
      source: "beaconmomentum.com/the-watch",
    });
    if (ok) {
      // Store member info for the intake page
      sessionStorage.setItem("watch_intake_email", email);
      sessionStorage.setItem("watch_intake_tier", tier);
      if (firstName) sessionStorage.setItem("watch_intake_name", firstName);
      // Navigator and Quartermaster go to intake; Sentinel gets success message
      if (tier === "navigator" || tier === "quartermaster") {
        navigate("/the-watch/intake");
        return;
      }
    }
    setStatus(ok ? "success" : "error");
  }

  return (
    <section
      id="join"
      style={{
        background: C.navyMid,
        padding: "7rem 0",
        borderTop: `1px solid ${C.amber}`,
      }}
    >
      <div className="container" style={{ maxWidth: "640px" }}>
        <SectionLabel>Join The Watch</SectionLabel>
        <h2
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: C.cream,
            marginBottom: "1rem",
          }}
        >
          Take Your Post.
        </h2>
        <p
          style={{
            fontFamily: body,
            fontSize: "1rem",
            lineHeight: 1.8,
            color: C.muted,
            marginBottom: "2.5rem",
          }}
        >
          Enter your details below. A member of the Beacon team will reach out
          within 24 hours with your onboarding link and cohort placement
          information.
        </p>

        {status === "success" ? (
          <div
            style={{
              background: "rgba(200,146,42,0.12)",
              border: `1px solid ${C.amber}`,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: serif,
                fontSize: "1.5rem",
                color: C.amberLight,
                marginBottom: "0.75rem",
              }}
            >
              You're on the list.
            </div>
            <p
              style={{
                fontFamily: body,
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: C.muted,
                margin: 0,
              }}
            >
              We'll be in touch within 24 hours with your onboarding details.
              Welcome to The Watch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Tier selector */}
            <div>
              <label
                style={{
                  fontFamily: sans,
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.muted,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Membership Tier
              </label>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id)}
                    style={{
                      fontFamily: sans,
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                      padding: "0.6rem 1.25rem",
                      background: tier === t.id ? C.amber : "transparent",
                      color: tier === t.id ? C.cream : C.muted,
                      border: tier === t.id ? "none" : "1px solid rgba(250,248,244,0.2)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <div
                style={{
                  fontFamily: body,
                  fontSize: "0.8rem",
                  color: C.amberLight,
                  marginTop: "0.5rem",
                }}
              >
                {selectedTierData.price}{selectedTierData.period} — {selectedTierData.subtitle}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="watch-name"
                style={{
                  fontFamily: sans,
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.muted,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                First Name (optional)
              </label>
              <input
                id="watch-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(250,248,244,0.15)",
                  color: C.cream,
                  fontFamily: body,
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.amber)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(250,248,244,0.15)")}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="watch-email"
                style={{
                  fontFamily: sans,
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: C.muted,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Email Address *
              </label>
              <input
                id="watch-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(250,248,244,0.15)",
                  color: C.cream,
                  fontFamily: body,
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.amber)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(250,248,244,0.15)")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                fontFamily: sans,
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                padding: "1rem 2.5rem",
                background: status === "submitting" ? "rgba(200,146,42,0.5)" : C.amber,
                color: C.cream,
                border: "none",
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                transition: "background 0.2s, transform 0.15s",
                width: "100%",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (status !== "submitting")
                  (e.currentTarget as HTMLButtonElement).style.background = C.amberLight;
              }}
              onMouseLeave={(e) => {
                if (status !== "submitting")
                  (e.currentTarget as HTMLButtonElement).style.background = C.amber;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {status === "submitting" ? "Sending..." : `Join as ${selectedTierData.name} →`}
            </button>

            {status === "error" && (
              <p
                style={{
                  fontFamily: body,
                  fontSize: "0.85rem",
                  color: "#E07070",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Something went wrong. Please try again or email us directly at
                hello@beaconmomentum.com.
              </p>
            )}

            <p
              style={{
                fontFamily: body,
                fontSize: "0.75rem",
                color: "rgba(250,248,244,0.4)",
                margin: 0,
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              No spam. No free trials. No pressure. Your information is used
              only to process your membership and send Watch communications.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TheWatchPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  function handleTierSelect(tier: Tier) {
    setSelectedTier(tier);
    // Smooth scroll to join form
    setTimeout(() => {
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div style={{ background: C.navy, minHeight: "100vh" }}>
      <SharedNav />
      <Hero />
      <WatchDoctrine />
      <MembershipTiers onTierSelect={handleTierSelect} />
      <CommunityProof />
      <FAQ />
      <JoinForm selectedTier={selectedTier} />
      <SharedFooter />
    </div>
  );
}
