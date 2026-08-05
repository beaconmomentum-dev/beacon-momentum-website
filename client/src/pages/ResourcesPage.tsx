/**
 * Beacon Momentum — /resources
 * Design: Deep Water Editorial / Quiet Authority.
 * Content boundary: public field notes, The Watch for individuals, Beacon Labs for organizations.
 */

import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight, BookOpen, Compass, FileText, FlaskConical, Landmark, ShieldCheck, Video } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const RESOURCES_HERO_IMG = "/images/owned/beacon-resources-editorial.png";

const RESOURCES = [
  {
    icon: Video,
    category: "Video Education",
    title: "Beacon YouTube Channel",
    description: "Free AI-era education from the field: what is changing, what we are testing, and the practical work worth paying attention to.",
    cta: "Watch on YouTube",
    href: "https://www.youtube.com/@BeaconMomentum",
    external: true,
    color: "#B8860B",
    bg: "#FFFDF4",
  },
  {
    icon: FileText,
    category: "Public Field Notes",
    title: "The Beacon Brief",
    description: "A growing public library of Watch Briefs and field notes on AI, human capability, and the realities of staying economically active through change.",
    cta: "Read the Brief",
    href: "/blog",
    external: false,
    color: "#1A5C6B",
    bg: "#F0F7FA",
  },
  {
    icon: ShieldCheck,
    category: "Public Field Note",
    title: "Five Questions That Keep You in Charge",
    description: "A practical five-question control check for anyone giving an AI workflow access to meaningful work.",
    cta: "Read the field note",
    href: "/field-notes/five-questions-keep-you-in-charge",
    external: false,
    color: "#285F61",
    bg: "#EEF6F4",
  },
  {
    icon: Landmark,
    category: "Individual Membership",
    title: "The Watch",
    description: "Beacon's $497/year member practice for people who want a steadier way to orient, learn, and work through the AI transition together.",
    cta: "Explore The Watch",
    href: "/the-watch",
    external: false,
    color: "#264653",
    bg: "#EEF4F5",
  },
  {
    icon: FlaskConical,
    category: "Research & Intelligence",
    title: "Beacon Signal Check",
    description: "A full-spectrum AI visibility audit for an organization. Beacon Labs assesses digital posture across AEO, SEO, social, and paid, then delivers a branded report with specific recommendations.",
    cta: "Request a Signal Check",
    href: "https://beaconlabs.ai/signal-check",
    external: true,
    color: "#2A7F6F",
    bg: "#F0FAF8",
  },
  {
    icon: BookOpen,
    category: "Organizations",
    title: "Beacon Labs",
    description: "The separate Beacon path for organizational research, visibility intelligence, and AI-enabled systems work. This is not a Watch membership offer.",
    cta: "Visit Beacon Labs",
    href: "https://beaconlabs.ai",
    external: true,
    color: "#5C3A6B",
    bg: "#F8F4FC",
  },
  {
    icon: Compass,
    category: "Orientation",
    title: "The Pathfinder Assessment",
    description: "Five questions and no hype: a practical starting point for identifying what may be useful to examine next.",
    cta: "Take the Assessment",
    href: "/assessment",
    external: false,
    color: "#3D4F6B",
    bg: "#F4F6FA",
  },
] as const;

const ctaStyle = (color: string): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  color,
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontWeight: 500,
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
  borderBottom: `1px solid ${color}40`,
  paddingBottom: "2px",
  whiteSpace: "nowrap",
});

export default function ResourcesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />

      <main id="main-content">
        <section style={{ position: "relative", minHeight: "390px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          <img src={RESOURCES_HERO_IMG} alt="Beacon Momentum Resources — editorial field-notes desk" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,31,38,0.94) 20%, rgba(15,31,38,0.5) 67%, rgba(15,31,38,0.1) 100%)" }} />
          <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "900px", paddingTop: "8rem", paddingBottom: "4.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", color: "#D5B778", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              <span style={{ width: "2rem", height: "1px", background: "#D5B778", display: "inline-block" }} />
              Resource Library
            </span>
            <h1 style={{ maxWidth: "780px", marginBottom: "1.5rem", color: "#FAF8F4", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2.35rem, 5vw, 4rem)", lineHeight: 1.03, letterSpacing: "-0.03em" }}>
              Public notes for the work ahead.
            </h1>
            <p style={{ maxWidth: "620px", color: "rgba(250,248,244,0.78)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Start with field notes and practical education. When you are ready for an ongoing individual practice, The Watch is the member path. Organizations belong with Beacon Labs.
            </p>
          </div>
        </section>

        <section style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {RESOURCES.map((resource) => {
                const Icon = resource.icon;
                return (
                  <article key={resource.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-8 border border-[var(--beacon-parchment-dark)] p-7 max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-x-5 max-md:gap-y-4" style={{ background: resource.bg }}>
                    <div aria-hidden="true" style={{ display: "flex", width: "2.5rem", height: "2.5rem", flexShrink: 0, alignItems: "center", justifyContent: "center", background: resource.color }}>
                      <Icon size={16} color="#FAF8F4" />
                    </div>
                    <div>
                      <p style={{ marginBottom: "0.5rem", color: resource.color, fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>{resource.category}</p>
                      <h2 style={{ marginBottom: "0.75rem", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.45rem", lineHeight: 1.15 }}>{resource.title}</h2>
                      <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.75 }}>{resource.description}</p>
                    </div>
                    <div className="max-md:col-start-2" style={{ flexShrink: 0, paddingTop: "0.25rem" }}>
                      {resource.external ? (
                        <a href={resource.href} target="_blank" rel="noopener noreferrer" style={ctaStyle(resource.color)}>{resource.cta} <ArrowUpRight size={13} /></a>
                      ) : (
                        <Link href={resource.href} style={ctaStyle(resource.color)}>{resource.cta} <ArrowUpRight size={13} /></Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ background: "var(--beacon-charcoal)", paddingTop: "4rem", paddingBottom: "4.5rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <p style={{ marginBottom: "1rem", color: "var(--beacon-amber)", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>A clear boundary</p>
            <h2 style={{ maxWidth: "720px", marginBottom: "1.25rem", color: "#FAF8F4", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Public education, individual membership, and organizational work each have their own place.
            </h2>
            <p style={{ maxWidth: "690px", color: "rgba(250,248,244,0.68)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.98rem", lineHeight: 1.8 }}>
              Beacon Momentum remains the public front door. The Watch is the annual individual membership. Beacon Labs serves organizations. This library is here to make the next step visible without blurring those paths.
            </p>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
