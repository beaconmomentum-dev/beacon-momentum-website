/**
 * Beacon Momentum — Pillar Landing Pages
 * Design: Deep Water Editorial / Quiet Authority
 * Five pillars: Life, Work, Venture, Systems, Labs
 * Each pillar has its own accent color, curriculum, mentor, and conversion CTA.
 *
 * Historical context:
 * - Beacon Life ← Rise & Reclaim (Stabilize → Build → Rise → Reclaim)
 * - Beacon Work ← Beacon Academy (Elena Voss mentor)
 * - Beacon Venture ← Beacon Launch + beacontrading.ai (Dante Rivera mentor)
 * - Beacon Systems ← Phoenix + Beacon Labs client delivery
 * - Beacon Labs ← Signal Check, DeerFlow research, case studies
 */

import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";

const MENTOR_PHOTOS: Record<string, string> = {
  life:    "/images/mentor-life.webp",
  work:    "/images/mentor-work.webp",
  venture: "/images/mentor-venture.webp",
  systems: "/images/mentor-systems.webp",
  labs:    "/images/mentor-labs.webp",
};

const PILLARS: Record<string, PillarData> = {
  life: {
    id: "life",
    name: "Beacon Life",
    tagline: "Rebuild your capacity, confidence, and sense of direction.",
    description:
      "Beacon Life is for people in the middle of something hard. A job loss. A health event. A military transition. A relationship that changed everything. You are not broken. You are between chapters. Beacon Life gives you the structure, community, and practical tools to stabilize, rebuild, and move forward on your own terms.",
    color: "#2A7F6F",
    lightBg: "#F0FAF8",
    mentor: {
      name: "Marcus Cole",
      role: "Beacon Life Guide",
      bio: "Marcus works with veterans, caregivers, and survivors navigating major life transitions. His approach is direct, practical, and built around the principle that capability is not lost — it is temporarily displaced.",
    },
    stages: [
      { name: "Stabilize", description: "Stop the bleeding. Identify your actual situation, your real resources, and what needs to happen first." },
      { name: "Build", description: "Rebuild daily structure, physical capacity, and the habits that make everything else possible." },
      { name: "Rise", description: "Develop new skills, new income pathways, and a clear picture of where you are going." },
      { name: "Reclaim", description: "Own your story. Build the life you designed, not the one that happened to you." },
    ],
    curriculum: [
      "The Transition Map: Understanding where you are and what comes next",
      "Stabilization Protocol: Daily structure for people in the middle of change",
      "Capacity Rebuilding: Physical, cognitive, and emotional recovery frameworks",
      "AI-Era Identity: Who you are when your job title no longer defines you",
      "Income Resilience: Building financial stability without a single employer",
      "Community and Accountability: The Beacon Life cohort model",
    ],
    cta: "Begin Your Pathfinder Assessment",
    ctaLink: "/assessment",
    bridge: null,
  },
  work: {
    id: "work",
    name: "Beacon Work",
    tagline: "Adapt your skills and professional value for the AI era.",
    description:
      "Beacon Work is for professionals who feel the ground shifting beneath them. AI is not replacing people — it is replacing people who do not understand how to work alongside it. Beacon Work gives you the practical skills, workflow frameworks, and professional positioning to stay valuable, stay human, and stay employed on your own terms.",
    color: "#1A5C6B",
    lightBg: "#F0F7FA",
    mentor: {
      name: "Elena Voss",
      role: "Beacon Work Curriculum Lead",
      bio: "Elena built the original Beacon Academy curriculum and has spent two years documenting exactly which skills matter in an AI-era workplace and which ones are being automated away. Her approach is evidence-based and ruthlessly practical.",
    },
    stages: [
      { name: "Assess", description: "Understand which of your current skills are durable, which are at risk, and what the AI-era workplace actually rewards." },
      { name: "Adapt", description: "Build the specific skills that make you more valuable alongside AI, not in competition with it." },
      { name: "Position", description: "Learn how to communicate your value in a world where everyone claims to be 'AI-enabled.'" },
      { name: "Sustain", description: "Build a professional practice that keeps you current without burning you out on constant learning." },
    ],
    curriculum: [
      "The AI-Era Skills Map: What matters, what doesn't, and why",
      "Prompt Engineering for Professionals: Not a gimmick — a genuine productivity multiplier",
      "Workflow Integration: Installing AI tools into your actual work without chaos",
      "The Human Advantage: Communication, judgment, and relationship skills that AI cannot replicate",
      "Professional Positioning: How to talk about AI competence without sounding like everyone else",
      "The Continuous Learning System: Staying current without spending your life on LinkedIn",
    ],
    cta: "Find Your Work Path",
    ctaLink: "/assessment",
    bridge: null,
  },
  venture: {
    id: "venture",
    name: "Beacon Venture",
    tagline: "Create resilient income through solopreneurship and digital ventures.",
    description:
      "Beacon Venture is for people who want to build income that does not depend on one employer, one platform, or one algorithm. Whether you have a skill, an idea, or just the determination to build something real, Beacon Venture gives you a practical system — not another course — for launching and sustaining a digital venture in the AI era.",
    color: "#B8860B",
    lightBg: "#FDF8EE",
    mentor: {
      name: "Dante Rivera",
      role: "Beacon Venture Lead",
      bio: "Dante built the Beacon Launch curriculum and has worked with solopreneurs, creators, and small business owners across multiple industries. He is the architect of the Beacon Venture income resilience framework and the lead instructor for the Beacon Trading educational simulation. His operating doctrine: prove demand before you build, earn trust before you spend, and never let a single platform own your income.",
    },
    stages: [
      { name: "Validate", description: "Test your idea, skill, or offer before you build anything. Proof of demand first, product second." },
      { name: "Launch", description: "Build your minimum viable offer, your delivery system, and your first paying customers." },
      { name: "Grow", description: "Build organic traffic, community, and recurring revenue without depending on paid ads." },
      { name: "Systematize", description: "Install the AI-assisted workflows that let you run a real business without a full team." },
    ],
    curriculum: [
      "The Resilient Income Framework: Multiple streams, not multiple jobs",
      "Digital Product Architecture: What to build, how to price it, and how to deliver it",
      "Organic Growth Engine: YouTube, content, and community before paid ads",
      "The Beacon Trading Simulation: Understanding financial markets as a venture skill",
      "AI-Assisted Operations: Running a solopreneur business with private AI tools",
      "The Limited Drop Strategy: Small, testable offers that prove demand before you scale",
      "Financial Sovereignty: Understanding capital, markets, and money as a founder skill",
    ],
    cta: "Start Your Venture Path",
    ctaLink: "/assessment",
    bridge: {
      label: "Beacon Trading Academy",
      description: "The financial market literacy and simulation track inside Beacon Venture. Learn to read markets, understand capital flows, and build financial sovereignty — without risking real money until you are ready.",
      url: "https://beacontrading.ai",
    },
  },
  systems: {
    id: "systems",
    name: "Beacon Systems",
    tagline: "Install private, trusted, AI-enabled operations for your organization.",
    description:
      "Beacon Systems is for founders and operators who are done paying for tools they don't control, ads that don't convert, and consultants who disappear after the invoice. Beacon Systems installs real AI-enabled operations in your organization — systems you own, understand, and can run without dependency on any single vendor or platform.",
    color: "#4A3728",
    lightBg: "#F7F3F0",
    mentor: {
      name: "Phoenix",
      role: "Beacon Systems AI Operations Layer",
      bio: "Phoenix is the internal AI operations layer that powers Beacon Systems implementations. Every system we install for clients is built on the same infrastructure we use to run Beacon itself — documented, private, and sovereign.",
    },
    stages: [
      { name: "Audit", description: "Map your current operations, identify the highest-cost inefficiencies, and document what actually needs to change." },
      { name: "Design", description: "Build the systems architecture: AI tools, workflows, data flows, and integration points." },
      { name: "Install", description: "Implement the systems with full documentation, training, and handoff — not a black box." },
      { name: "Operate", description: "Run your organization on systems you own. We stay available for iteration, not dependency." },
    ],
    curriculum: [
      "The Beacon Systems Audit: A complete operational assessment for small organizations",
      "Private AI Infrastructure: Self-hosted and sovereign alternatives to SaaS dependency",
      "Odysseus Integration: The Beacon-secured AI workspace for internal operations",
      "CRM and Lead Systems: GoHighLevel implementation without the agency markup",
      "Content Operations: AI-assisted content production, scheduling, and distribution",
      "The Phoenix Dashboard: Real-time operational visibility for Beacon-powered organizations",
    ],
    cta: "Request a Systems Consultation",
    ctaLink: "/assessment",
    bridge: {
      label: "Beacon Labs Signal Check",
      description: "Before we install anything, we run a complete digital posture audit.",
      url: "https://beaconlabs.ai/signal-check",
    },
  },
  labs: {
    id: "labs",
    name: "Beacon Labs",
    tagline: "Prove, test, and document what actually works in the AI transition.",
    description:
      "Beacon Labs is the research and proof layer of the Beacon ecosystem. We do not publish opinion pieces about AI. We run experiments, document results, publish Signal Check reports, and build the case studies that prove what works — and what costs $20,000 and produces nothing. Beacon Labs is where hype goes to die and real knowledge gets built.",
    color: "#5C3A6B",
    lightBg: "#F7F0FA",
    mentor: {
      name: "The Beacon Labs Team",
      role: "Research, Documentation, and Proof",
      bio: "Beacon Labs is not a single person. It is a documented methodology for testing AI tools, marketing strategies, and business systems against real-world outcomes. Every report is grounded in actual spend, actual results, and actual lessons.",
    },
    stages: [
      { name: "Research", description: "Deep-scan a brand, tool, or strategy using DeerFlow and our proprietary Signal Check methodology." },
      { name: "Test", description: "Run controlled experiments with documented hypotheses, budgets, and success criteria." },
      { name: "Document", description: "Publish the full results — including failures — as case studies and Signal Check reports." },
      { name: "Apply", description: "Turn documented proof into repeatable playbooks for the broader Beacon ecosystem." },
    ],
    curriculum: [
      "The Signal Check Methodology: A complete digital posture audit for any brand",
      "AEO and AI Search: How to be found when people ask AI instead of Google",
      "The $20K Meta Ads Autopsy: What we learned from spending $20,000 and selling zero shirts",
      "YouTube as a Trust Engine: Building organic authority before paid amplification",
      "DeerFlow Research Protocol: Deep-scan methodology for competitive intelligence",
      "The Beacon Labs Case Study Library: Documented experiments, results, and playbooks",
    ],
    cta: "Request a Signal Check",
    ctaLink: "https://beaconlabs.ai/signal-check",
    bridge: {
      label: "Beacon Labs",
      description: "The full Beacon Labs research platform and Signal Check service.",
      url: "https://beaconlabs.ai",
    },
  },
};

interface PillarData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  lightBg: string;
  mentor: { name: string; role: string; bio: string };
  stages: { name: string; description: string }[];
  curriculum: string[];
  cta: string;
  ctaLink: string;
  bridge: { label: string; description: string; url: string } | null;
}

export default function PillarPage() {
  const params = useParams<{ id: string }>();
  const pillar = PILLARS[params.id || "life"];

  if (!pillar) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#9B8E7E] mb-4">That path doesn't exist yet.</p>
          <Link href="/" className="text-[#1A5C6B] hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/icons/beacon-logo.webp"
              alt="Beacon Momentum"
              className="w-7 h-7"
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            <span className="font-display text-[#2C2416] text-lg tracking-tight">Beacon Momentum</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {Object.values(PILLARS).map((p) => (
              <Link
                key={p.id}
                href={`/pillar/${p.id}`}
                className={`text-sm font-ui tracking-wide transition-colors ${
                  p.id === pillar.id ? "font-semibold" : "text-[#6B5E4E] hover:text-[#2C2416]"
                }`}
                style={p.id === pillar.id ? { color: pillar.color } : {}}
              >
                {p.name.replace("Beacon ", "")}
              </Link>
            ))}
          </div>
          <Link
            href="/assessment"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-ui tracking-widest uppercase text-white rounded-sm transition-colors"
            style={{ backgroundColor: pillar.color }}
          >
            Take the Assessment
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="pt-28 pb-20 px-6"
        style={{ backgroundColor: pillar.lightBg }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Beacon Paths
            </Link>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-ui tracking-widest uppercase mb-6"
              style={{ backgroundColor: pillar.color + "20", color: pillar.color }}
            >
              {pillar.name}
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-[#2C2416] leading-tight mb-6">
              {pillar.tagline}
            </h1>
            <p className="text-lg text-[#6B5E4E] leading-relaxed max-w-2xl mb-10">
              {pillar.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={pillar.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm font-ui text-sm tracking-widest uppercase text-white transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: pillar.color }}
              >
                {pillar.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              {pillar.bridge && (
                <a
                  href={pillar.bridge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-sm border font-ui text-sm tracking-widest uppercase text-[#6B5E4E] hover:text-[#2C2416] border-[#E8E4DC] hover:border-[#C8BFB0] transition-colors"
                >
                  {pillar.bridge.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Four Stages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-[#2C2416] mb-3">The four stages</h2>
          <p className="text-[#9B8E7E] mb-12 text-sm">A structured path, not a random collection of content.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillar.stages.map((stage, i) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="p-6 border border-[#E8E4DC] rounded-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold font-ui"
                    style={{ backgroundColor: pillar.color }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg text-[#2C2416]">{stage.name}</h3>
                </div>
                <p className="text-sm text-[#6B5E4E] leading-relaxed">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-6" style={{ backgroundColor: pillar.lightBg }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-[#2C2416] mb-3">What you will learn</h2>
          <p className="text-[#9B8E7E] mb-10 text-sm">Practical, documented, and built from real experience — not theory.</p>
          <div className="space-y-3">
            {pillar.curriculum.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-start gap-3 p-4 bg-white border border-[#E8E4DC] rounded-sm"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pillar.color }} />
                <span className="text-sm text-[#4A3E30] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 w-24 h-24 rounded-sm overflow-hidden" style={{ border: `2px solid ${pillar.color}` }}>
              {MENTOR_PHOTOS[pillar.id] ? (
                <img
                  src={MENTOR_PHOTOS[pillar.id]}
                  alt={pillar.mentor.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white font-display text-2xl"
                  style={{ backgroundColor: pillar.color }}
                >
                  {pillar.mentor.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-2">{pillar.mentor.role}</div>
              <h3 className="font-display text-2xl text-[#2C2416] mb-3">{pillar.mentor.name}</h3>
              <p className="text-[#6B5E4E] leading-relaxed">{pillar.mentor.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to other Beacon properties */}
      {pillar.bridge && (
        <section className="py-16 px-6 border-t border-[#E8E4DC]">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-[#E8E4DC] rounded-sm bg-white">
              <div>
                <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-1">Connected Beacon Property</div>
                <h4 className="font-display text-xl text-[#2C2416] mb-1">{pillar.bridge.label}</h4>
                <p className="text-sm text-[#6B5E4E]">{pillar.bridge.description}</p>
              </div>
              <a
                href={pillar.bridge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#E8E4DC] text-sm font-ui tracking-widest uppercase text-[#6B5E4E] hover:text-[#2C2416] hover:border-[#C8BFB0] transition-colors"
              >
                Visit
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-[#FAF8F4]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-3">Membership</div>
            <h2 className="font-display text-4xl text-[#2C2416] mb-4">Join {pillar.name}</h2>
            <p className="text-[#6B5E4E] max-w-xl mx-auto">
              Full access to the curriculum, mentor sessions, community, and all tools. No upsells. No hidden tiers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly */}
            <div className="border border-[#E8E4DC] rounded-sm p-8 bg-white">
              <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-4">Monthly</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-5xl text-[#2C2416]">$297</span>
                <span className="text-[#9B8E7E] font-ui">/month</span>
              </div>
              <p className="text-sm text-[#6B5E4E] mb-6">Cancel anytime. Full access from day one.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full curriculum access",
                  "Weekly live mentor sessions",
                  "Private member community",
                  "AI tools and templates",
                  "Monthly cohort check-ins",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#6B5E4E]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pillar.color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={pillar.ctaLink}
                className="block text-center py-3 px-6 rounded-sm font-ui text-sm tracking-widest uppercase text-white transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: pillar.color }}
              >
                Reserve Monthly Spot
              </a>
              <p className="text-center text-[10px] text-[#9B8E7E] font-ui tracking-wide mt-2 leading-snug">
                Enrollment opens soon. Assessment required.
              </p>
            </div>

            {/* Annual */}
            <div
              className="border-2 rounded-sm p-8 relative"
              style={{ borderColor: pillar.color, backgroundColor: pillar.lightBg }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-ui tracking-widest uppercase text-white rounded-sm"
                style={{ backgroundColor: pillar.color }}
              >
                Best Value
              </div>
              <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-4">Annual</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-5xl text-[#2C2416]">$2,497</span>
                <span className="text-[#9B8E7E] font-ui">/year</span>
              </div>
              <p className="text-sm mb-1" style={{ color: pillar.color }}>
                ~$208/month — save $1,067 annually
              </p>
              <p className="text-sm text-[#6B5E4E] mb-6">Everything in monthly, plus priority access.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full curriculum access",
                  "Weekly live mentor sessions",
                  "Private member community",
                  "AI tools and templates",
                  "Monthly cohort check-ins",
                  "Priority mentor scheduling",
                  "Annual member retreat access",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#6B5E4E]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pillar.color }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={pillar.ctaLink}
                className="block text-center py-3 px-6 rounded-sm font-ui text-sm tracking-widest uppercase text-white transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: pillar.color }}
              >
                Reserve Annual Spot
              </a>
              <p className="text-center text-[10px] text-[#9B8E7E] font-ui tracking-wide mt-2 leading-snug">
                Enrollment opens soon. Assessment required.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-[#9B8E7E] mt-8 font-ui tracking-wide">
            Not sure which pillar is right for you? Take the{" "}
            <Link href="/assessment" className="underline hover:text-[#2C2416] transition-colors">
              Pathfinder Assessment
            </Link>{" "}
            first.
          </p>
        </div>
      </section>

      {/* CTA Footer */}
      <section
        className="py-20 px-6"
        style={{ backgroundColor: pillar.color }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl text-white leading-tight mb-4">
            Ready to begin?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Take the Pathfinder Assessment to confirm this is the right path for you, or go directly to {pillar.name}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white rounded-sm font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97]"
              style={{ color: pillar.color }}
            >
              Take the Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/40 text-white rounded-sm font-ui text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
            >
              View All Paths
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
