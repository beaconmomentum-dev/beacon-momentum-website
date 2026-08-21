/**
 * Beacon Momentum — Pillar Share Landing Pages
 * Design: Deep Water Editorial / Quiet Authority
 * Route: /path/:pillar (e.g., /path/labs, /path/life)
 *
 * Purpose: When a user shares their Pathfinder result, the shared URL points
 * here instead of the Assessment intro. The recipient sees the pillar result
 * immediately — what it means, what Beacon offers for it — with a clear CTA
 * to take the Assessment themselves.
 *
 * OG meta tags are set per-pillar so social previews show the correct
 * pillar name, tagline, and accent color context.
 */

import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Compass, CheckCircle2 } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const PILLAR_COLORS: Record<string, string> = {
  life:     "#2A7F6F",
  work:     "#1A5C6B",
  venture:  "#B8860B",
  systems:  "#4A3728",
  labs:     "#5C3A6B",
};

const PILLAR_LIGHT_BG: Record<string, string> = {
  life:     "#F0FAF8",
  work:     "#EEF6F9",
  venture:  "#FDF8EC",
  systems:  "#F5F1EE",
  labs:     "#F6F0FA",
};

const PILLAR_LABELS: Record<string, string> = {
  life:     "Beacon Life",
  work:     "Beacon Work",
  venture:  "Beacon Venture",
  systems:  "Beacon Systems",
  labs:     "Beacon Labs",
};

const PILLAR_TAGLINES: Record<string, string> = {
  life:     "Rebuild your capacity, confidence, and sense of direction.",
  work:     "Adapt your skills and professional value for the AI era.",
  venture:  "Create resilient income through solopreneurship and digital ventures.",
  systems:  "Install private, trusted, AI-enabled operations for your organization.",
  labs:     "Prove, test, and document what actually works in the AI transition.",
};

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  life:
    "Beacon Life is built for people navigating a major transition — a job loss, a military separation, a life disruption, or the AI era arriving faster than expected. You are not broken. You are between chapters. Beacon Life gives you the structure, community, and practical tools to stabilize, rebuild, and move forward on your own terms.",
  work:
    "Beacon Work is built for professionals navigating the AI transition without losing what makes them valuable. You will learn which skills matter, how to prove your value in an AI-era workplace, and how to adapt your workflow without becoming dependent on tools you do not fully understand.",
  venture:
    "Beacon Venture is built for people who want to create resilient income on their own terms. Whether you have a skill, an idea, or just the determination to build something real, you will get a practical system — not another course — for launching and sustaining a digital venture.",
  systems:
    "Beacon Systems is built for founders and operators who need private, trusted, AI-enabled operations. You will get implementation support, not just advice — real systems installed in your organization that you own, understand, and control.",
  labs:
    "Beacon Labs is built for people who want to understand AI from the inside. You will get access to documented experiments, Signal Check reports, tool reviews, and case studies that prove what works — not what sounds good in a marketing email.",
};

const PILLAR_WHAT_YOU_GET: Record<string, string[]> = {
  life: [
    "The four-stage Stabilize → Build → Rise → Reclaim path",
    "Daily structure frameworks for people in the middle of change",
    "AI-era identity and income resilience modules",
    "Cohort accountability and community access",
  ],
  work: [
    "AI-era skills audit and professional value mapping",
    "Workflow adaptation playbooks for your specific role",
    "Proof-of-value portfolio frameworks",
    "Peer cohort of professionals navigating the same transition",
  ],
  venture: [
    "Solopreneur launch system — from idea to first revenue",
    "Digital product and service positioning frameworks",
    "Resilient income architecture (not single-stream dependency)",
    "Beacon Venture community and mentor access",
  ],
  systems: [
    "AI operations audit for your organization",
    "Private, self-hosted tool stack recommendations",
    "Implementation support — not just strategy",
    "Ongoing Signal Check reports on the tools you rely on",
  ],
  labs: [
    "Documented AI tool experiments with real results",
    "Signal Check reports — independent analysis, no affiliate bias",
    "Case studies from Beacon ecosystem implementations",
    "Early access to new research and tool evaluations",
  ],
};

const PILLAR_OG_IMAGES: Record<string, string> = {
  life:    "/images/og-life.png",
  work:    "/images/og-work.png",
  venture: "/images/og-venture.png",
  systems: "/images/og-systems.png",
  labs:    "/images/og-labs.png",
};

const PILLAR_OG_DESCRIPTIONS: Record<string, string> = {
  life:    "Someone in your network found their path through the AI transition — Beacon Life. Find out which Beacon pillar fits where you are right now.",
  work:    "Someone in your network found their path through the AI transition — Beacon Work. Find out which Beacon pillar fits where you are right now.",
  venture: "Someone in your network found their path through the AI transition — Beacon Venture. Find out which Beacon pillar fits where you are right now.",
  systems: "Someone in your network found their path through the AI transition — Beacon Systems. Find out which Beacon pillar fits where you are right now.",
  labs:    "Someone in your network found their path through the AI transition — Beacon Labs. Find out which Beacon pillar fits where you are right now.",
};

const VALID_PILLARS = ["life", "work", "venture", "systems", "labs"];

export default function PillarSharePage() {
  const params = useParams<{ pillar: string }>();
  const pillar = params.pillar?.toLowerCase() ?? "";
  const isValid = VALID_PILLARS.includes(pillar);

  // Set OG meta tags per pillar
  usePageMeta({
    title: isValid ? `${PILLAR_LABELS[pillar]} — Your Beacon Path` : "Beacon Pathfinder",
    description: isValid
      ? PILLAR_OG_DESCRIPTIONS[pillar]
      : "Discover which Beacon Momentum pillar fits where you are right now. Free Pathfinder Assessment.",
    image: isValid ? PILLAR_OG_IMAGES[pillar] : undefined,
    url: isValid ? `/path/${pillar}` : "/assessment",
  });

  // Redirect gracefully if pillar is invalid
  if (!isValid) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <p className="font-display text-2xl text-[#2C2416] mb-4">Path not found.</p>
          <p className="text-sm text-[#6B5E4E] mb-6">This link may be outdated. Take the Assessment to find your path.</p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A5C6B] text-white text-sm font-ui tracking-widest uppercase rounded-sm hover:bg-[#154F5C] transition-colors"
          >
            Take the Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const color = PILLAR_COLORS[pillar];
  const lightBg = PILLAR_LIGHT_BG[pillar];

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" style={{ , flexShrink: 0 }}>
              <rect width="64" height="64" rx="12" fill="#0D1D29"/>
              <g fill="none" stroke="#F7F1E5" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 19.5 14.5 16" opacity=".72"/>
                <path d="M43 19.5 49.5 16" opacity=".72"/>
                <path d="M21 23.5h-7" opacity=".48"/>
                <path d="M43 23.5h7" opacity=".48"/>
                <path d="m24 18 8-6 8 6Z"/>
                <rect x="25" y="18" width="14" height="8" rx="1"/>
                <path d="M23 26h18"/>
                <path d="M24 26v3M40 26v3"/>
                <path d="m25 29-3 22h20l-3-22Z"/>
                <path d="M23 40h18" opacity=".58"/>
                <path d="M30 51v-5q2-2 4 0v5"/>
                <path d="M12 54q4-2 8 0t8 0 8 0 8 0 8 0 8 0" opacity=".6"/>
              </g>
              <circle cx="32" cy="22" r="2.2" fill="#E9BC52"/>
            </svg>
            <span className="font-display text-[#2C2416] text-lg tracking-tight">Beacon Momentum</span>
          </Link>
          <Link href="/assessment" className="text-sm text-[#6B5E4E] hover:text-[#1A5C6B] transition-colors">
            Take the Assessment →
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Shared-by badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-2 mb-10"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-ui tracking-widest uppercase"
              style={{ backgroundColor: color + "15", color }}
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              Someone shared their Beacon path with you
            </div>
          </motion.div>

          {/* Pillar hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-sm font-ui tracking-widest uppercase mb-3" style={{ color }}>
              Their path
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-[#2C2416] leading-tight mb-4">
              {PILLAR_LABELS[pillar]}
            </h1>
            <p className="text-lg text-[#6B5E4E] leading-relaxed mb-8 max-w-lg">
              {PILLAR_TAGLINES[pillar]}
            </p>
          </motion.div>

          {/* Description card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-sm p-6 mb-8 border"
            style={{ borderColor: color + "30", backgroundColor: lightBg }}
          >
            <p className="text-sm text-[#4A3728] leading-relaxed">
              {PILLAR_DESCRIPTIONS[pillar]}
            </p>
          </motion.div>

          {/* What you get */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mb-10"
          >
            <h2 className="font-display text-xl text-[#2C2416] mb-4">What {PILLAR_LABELS[pillar]} includes</h2>
            <ul className="space-y-3">
              {PILLAR_WHAT_YOU_GET[pillar].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[#6B5E4E] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="border-t border-[#E8E4DC] mb-10"
          />

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white border border-[#E8E4DC] rounded-sm p-6 mb-6"
          >
            <h2 className="font-display text-xl text-[#2C2416] mb-2">
              Is this your path too?
            </h2>
            <p className="text-sm text-[#9B8E7E] mb-5 leading-relaxed">
              The Pathfinder Assessment takes about 3 minutes. Answer 7 questions and find out which Beacon pillar fits where you are right now — no email required to see your result.
            </p>
            <Link
              href="/assessment"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97] text-white"
              style={{ backgroundColor: color }}
            >
              Find My Path
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Secondary: explore the pillar directly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="text-center"
          >
            <Link
              href={`/pillar/${pillar}`}
              className="text-sm underline underline-offset-4 decoration-[#C8BFB0] hover:decoration-current transition-colors"
              style={{ color }}
            >
              Learn more about {PILLAR_LABELS[pillar]} →
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E8E4DC] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9B8E7E]">
            © {new Date().getFullYear()} Beacon Momentum. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-xs text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
