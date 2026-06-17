/*
 * Beacon Momentum — Pathfinder Assessment
 * Design: Deep Water Editorial / Quiet Authority
 * Purpose: Multi-step diagnostic quiz that routes visitors to one of five Beacon pillars
 *
 * Historical context: Evolved from the Financial Sovereignty Quiz and
 * Rise & Reclaim four-stage path (Stabilize → Build → Rise → Reclaim).
 * Personas: Veterans in transition, displaced workers, mid-career professionals,
 * small business owners, survivors of personal/economic storms.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Compass, Loader2, Share2, Check } from "lucide-react";

import { submitPathfinderResult } from "@/lib/ghl";
import { usePageMeta } from "@/hooks/usePageMeta";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

// sessionStorage key for progress persistence
const STORAGE_KEY = "bm_pathfinder_progress";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:      "#0A1628",
  navyMid:   "#0E1F3A",
  teal:      "#1A5C6B",
  tealDark:  "#154F5C",
  amber:     "#C8922A",
  amberLight:"#D4A843",
  parchment: "#FAF8F4",
  parchmentDark: "#E8E4DC",
  cream:     "#F5F0E8",
  charcoal:  "#2C2416",
  mid:       "#6B5E4E",
  muted:     "#9B8E7E",
  mutedOnDark: "rgba(250,248,244,0.65)",
};

const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Outfit', system-ui, sans-serif";
const body  = "'Lora', Georgia, serif";

// ─── Hero image (same lighthouse used across Beacon pages) ────────────────────
const HERO_IMG = "/images/beacon_hero.webp";

interface SavedProgress {
  step: "intro" | "quiz" | "result";
  currentQ: number;
  answers: string[];
  result: string | null;
}

// ─── Pillar data ───────────────────────────────────────────────────────────────
const PILLAR_COLORS: Record<string, string> = {
  life:    "#2E7D6B",
  work:    "#1A5C6B",
  venture: "#8B5E3C",
  systems: "#3D4F6B",
  labs:    "#5C3D6B",
};

const PILLAR_LABELS: Record<string, string> = {
  life:    "Beacon Life",
  work:    "Beacon Work",
  venture: "Beacon Venture",
  systems: "Beacon Systems",
  labs:    "Beacon Labs",
};

const PILLAR_TAGLINES: Record<string, string> = {
  life:    "Rebuild your capacity, confidence, and sense of direction.",
  work:    "Adapt your skills and professional value for the AI era.",
  venture: "Create resilient income through solopreneurship and digital ventures.",
  systems: "Install private, trusted, AI-enabled operations for your organization.",
  labs:    "Prove, test, and document what actually works in the AI transition.",
};

const PILLAR_ICONS: Record<string, string> = {
  life: "◈", work: "◇", venture: "◉", systems: "◎", labs: "◐",
};

const PILLAR_NEXT_STEPS: Record<string, string> = {
  life:    "/pillar/life",
  work:    "/pillar/work",
  venture: "/pillar/venture",
  systems: "/pillar/systems",
  labs:    "/pillar/labs",
};

const PILLAR_SHARE_TEXT: Record<string, string> = {
  life:    "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Life — rebuilding capacity, confidence, and direction in the AI era. Find your path:",
  work:    "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Work — adapting professional value for the AI era. Find your path:",
  venture: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Venture — building resilient income on my own terms. Find your path:",
  systems: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Systems — private, trusted, AI-enabled operations. Find your path:",
  labs:    "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Labs — proving what actually works in the AI transition. Find your path:",
};

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  life:    "Beacon Life is built for people who are in the middle of something hard and need practical support to stabilize, rebuild capacity, and find direction. You will work through the four-stage path — Stabilize, Build, Rise, Reclaim — at the pace that is right for you, not a curriculum's timeline.",
  work:    "Beacon Work is built for professionals navigating the AI transition without losing what makes them valuable. You will learn which skills matter, how to prove your value in an AI-era workplace, and how to adapt your workflow without becoming dependent on tools you don't understand.",
  venture: "Beacon Venture is built for people who want to create resilient income on their own terms. Whether you have a skill, an idea, or just the determination to build something real, you will get a practical system — not another course — for launching and sustaining a digital venture.",
  systems: "Beacon Systems is built for founders and operators who need private, trusted, AI-enabled operations. You will get implementation support, not just advice — real systems installed in your organization that you own, understand, and control.",
  labs:    "Beacon Labs is built for people who want to understand AI from the inside. You will get access to documented experiments, Signal Check reports, tool reviews, and case studies that prove what works — not what sounds good in a marketing email.",
};

interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: { label: string; value: string; pillar: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Where are you right now?",
    subtext: "Be honest. There are no wrong answers here.",
    options: [
      { label: "I'm in the middle of a major life transition and need to find my footing again.", value: "a", pillar: "life" },
      { label: "My industry or job is changing fast and I'm not sure my skills are keeping up.", value: "b", pillar: "work" },
      { label: "I want to build income that doesn't depend on one employer or one platform.", value: "c", pillar: "venture" },
      { label: "I run a small organization and need better systems, AI tools, and operations.", value: "d", pillar: "systems" },
      { label: "I want to understand what AI actually means for people like me — with real proof.", value: "e", pillar: "labs" },
    ],
  },
  {
    id: 2,
    text: "What is the most honest description of your current situation?",
    options: [
      { label: "I'm rebuilding after something hard — a job loss, a health event, a major change.", value: "a", pillar: "life" },
      { label: "I'm employed but watching my role shrink or shift around me.", value: "b", pillar: "work" },
      { label: "I have an idea or skill I want to turn into income but don't know where to start.", value: "c", pillar: "venture" },
      { label: "I'm a founder or operator who needs to run leaner and smarter with AI.", value: "d", pillar: "systems" },
      { label: "I'm a researcher, educator, or early adopter who wants to stay ahead of the curve.", value: "e", pillar: "labs" },
    ],
  },
  {
    id: 3,
    text: "What would a real win look like for you in the next 90 days?",
    options: [
      { label: "I feel stable, capable, and clear about what I'm doing next.", value: "a", pillar: "life" },
      { label: "I have new skills and a plan that makes me valuable in an AI-era workplace.", value: "b", pillar: "work" },
      { label: "I have my first digital product, service, or revenue stream running.", value: "c", pillar: "venture" },
      { label: "My organization runs on trusted AI systems I actually understand and control.", value: "d", pillar: "systems" },
      { label: "I have documented proof of what works, what doesn't, and what to do next.", value: "e", pillar: "labs" },
    ],
  },
  {
    id: 4,
    text: "What has held you back the most?",
    options: [
      { label: "I don't know where to start. Everything feels uncertain.", value: "a", pillar: "life" },
      { label: "I don't know which skills matter anymore or how to prove my value.", value: "b", pillar: "work" },
      { label: "I've tried before and it didn't work. I need a real system, not another course.", value: "c", pillar: "venture" },
      { label: "I've spent money on tools and ads that didn't produce results.", value: "d", pillar: "systems" },
      { label: "I can't tell what's real from what's hype when it comes to AI.", value: "e", pillar: "labs" },
    ],
  },
  {
    id: 5,
    text: "Which of these feels most like you?",
    options: [
      { label: "A veteran, caregiver, or survivor who is ready to rebuild on their own terms.", value: "a", pillar: "life" },
      { label: "A professional who wants to stay relevant without losing what makes them human.", value: "b", pillar: "work" },
      { label: "A solopreneur, creator, or side-hustler who wants to build something real.", value: "c", pillar: "venture" },
      { label: "A founder or operator who wants private, sovereign AI operations.", value: "d", pillar: "systems" },
      { label: "A researcher, educator, or builder who wants to understand AI from the inside.", value: "e", pillar: "labs" },
    ],
  },
];

function scorePillar(answers: string[]): string {
  const tally: Record<string, number> = { life: 0, work: 0, venture: 0, systems: 0, labs: 0 };
  answers.forEach((ans, idx) => {
    const q = QUESTIONS[idx];
    const opt = q.options.find((o) => o.value === ans);
    if (opt) tally[opt.pillar] = (tally[opt.pillar] || 0) + 1;
  });
  return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
}

/** Returns per-pillar scores as a percentage of total questions answered */
function scorePillarBreakdown(answers: string[]): Record<string, number> {
  const tally: Record<string, number> = { life: 0, work: 0, venture: 0, systems: 0, labs: 0 };
  answers.forEach((ans, idx) => {
    const q = QUESTIONS[idx];
    const opt = q.options.find((o) => o.value === ans);
    if (opt) tally[opt.pillar] = (tally[opt.pillar] || 0) + 1;
  });
  return tally;
}

// ─── Pillar Breakdown Chart ────────────────────────────────────────────────────
const PILLAR_ORDER = ["life", "work", "venture", "systems", "labs"] as const;

function PillarBreakdownChart({
  breakdown,
  primaryPillar,
  animate,
}: {
  breakdown: Record<string, number>;
  primaryPillar: string;
  animate: boolean;
}) {
  // Animated bar widths: start at 0, grow to real value
  const [displayed, setDisplayed] = useState<Record<string, number>>(
    Object.fromEntries(PILLAR_ORDER.map((p) => [p, 0]))
  );

  useEffect(() => {
    if (!animate) return;
    // Stagger each bar's animation by 60ms per pillar
    const timers = PILLAR_ORDER.map((pillar, i) =>
      setTimeout(() => {
        setDisplayed((prev) => ({ ...prev, [pillar]: breakdown[pillar] ?? 0 }));
      }, 180 + i * 80)
    );
    return () => timers.forEach(clearTimeout);
  }, [animate, breakdown]);

  const total = QUESTIONS.length; // max possible score per pillar = 1 per question

  return (
    <div style={{ width: "100%" }}>
      {PILLAR_ORDER.map((pillar, i) => {
        const score = displayed[pillar] ?? 0;
        const rawScore = breakdown[pillar] ?? 0;
        const pct = total > 0 ? (score / total) * 100 : 0;
        const isPrimary = pillar === primaryPillar;
        const color = PILLAR_COLORS[pillar];
        const label = PILLAR_LABELS[pillar];

        return (
          <div
            key={pillar}
            style={{
              marginBottom: i < PILLAR_ORDER.length - 1 ? "1rem" : 0,
            }}
          >
            {/* Row header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.375rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isPrimary && (
                  <span style={{
                    fontFamily: sans,
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color,
                    background: `${color}12`,
                    border: `1px solid ${color}30`,
                    padding: "0.1rem 0.45rem",
                    lineHeight: 1.8,
                  }}>
                    Your Path
                  </span>
                )}
                <span style={{
                  fontFamily: sans,
                  fontSize: "0.8rem",
                  fontWeight: isPrimary ? 600 : 400,
                  letterSpacing: "0.02em",
                  color: isPrimary ? color : C.mid,
                }}>
                  {label}
                </span>
              </div>
              <span style={{
                fontFamily: sans,
                fontSize: "0.75rem",
                color: isPrimary ? color : C.muted,
                fontWeight: isPrimary ? 600 : 400,
              }}>
                {rawScore}/{total}
              </span>
            </div>

            {/* Bar track */}
            <div style={{
              height: isPrimary ? "10px" : "6px",
              background: C.parchmentDark,
              borderRadius: "3px",
              overflow: "hidden",
            }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: isPrimary
                    ? `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`
                    : `${color}70`,
                  borderRadius: "3px",
                  transition: "width 0.55s cubic-bezier(0.23, 1, 0.32, 1)",
                  boxShadow: isPrimary ? `0 0 8px ${color}40` : "none",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Eyebrow label (amber rule + uppercase text) ──────────────────────────────
function EyebrowLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  const color = light ? C.amberLight : C.amber;
  return (
    <span style={{
      fontFamily: sans,
      fontWeight: 400,
      fontSize: "0.68rem",
      letterSpacing: "0.22em",
      textTransform: "uppercase" as const,
      color,
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1.25rem",
    }}>
      <span style={{ width: "2rem", height: "1px", background: color, display: "inline-block", flexShrink: 0 }} />
      {children}
    </span>
  );
}

export default function Assessment() {
  usePageMeta({
    title: "Pathfinder Assessment",
    description: "Answer 5 questions and discover which Beacon Momentum pillar fits where you are right now. Free, no email required to see your result.",
    url: "/assessment",
  });

  // Restore saved progress from sessionStorage on mount
  const [step, setStep] = useState<"intro" | "quiz" | "result">(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return (JSON.parse(saved) as SavedProgress).step ?? "intro";
    } catch { /* ignore */ }
    return "intro";
  });
  const [currentQ, setCurrentQ] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return (JSON.parse(saved) as SavedProgress).currentQ ?? 0;
    } catch { /* ignore */ }
    return 0;
  });
  const [answers, setAnswers] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return (JSON.parse(saved) as SavedProgress).answers ?? [];
    } catch { /* ignore */ }
    return [];
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return (JSON.parse(saved) as SavedProgress).result ?? null;
    } catch { /* ignore */ }
    return null;
  });

  // Persist progress to sessionStorage whenever quiz state changes
  useEffect(() => {
    if (step === "intro") return;
    try {
      const progress: SavedProgress = { step, currentQ, answers, result };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { /* ignore */ }
  }, [step, currentQ, answers, result]);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (!result) return;
    const shareUrl = `${window.location.origin}/path/${result}`;
    const shareText = PILLAR_SHARE_TEXT[result];
    const fullText = `${shareText} ${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `My Beacon Path: ${PILLAR_LABELS[result]}`, text: shareText, url: shareUrl });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function handleSelect(value: string) { setSelected(value); }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      const pillar = scorePillar(newAnswers);
      setResult(pillar);
      setStep("result");
    }
  }

  function handleBack() {
    if (currentQ === 0) {
      setStep("intro");
      setAnswers([]);
      setSelected(null);
      setResult(null);
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    } else {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
      setSelected(null);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !result || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    try {
      const ok = await submitPathfinderResult(email, result, undefined, firstName || undefined);
      if (ok) {
        setSubmitted(true);
        try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      } else {
        setSubmitError(true);
      }
    } catch (_) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetake() {
    setStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError(false);
    setCopied(false);
    setEmail("");
    setFirstName("");
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }

  const progress = (currentQ / QUESTIONS.length) * 100;
  const pillarColor = result ? PILLAR_COLORS[result] : C.teal;

  return (
    <div style={{ minHeight: "100vh", background: C.parchment, fontFamily: body }}>
      <SharedNav />

      {/* ── HERO BAND ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        minHeight: step === "intro" ? "72vh" : "38vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background: C.navy,
        transition: "min-height 0.6s ease",
      }}>
        {/* Background image */}
        <img
          src={HERO_IMG}
          alt="Lighthouse at sea — Beacon Momentum Pathfinder Assessment"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: step === "intro" ? "center 30%" : "center 20%",
            opacity: step === "intro" ? 0.55 : 0.3,
            transition: "opacity 0.6s ease",
          }}
        />
        {/* Gradient overlay — dark at bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,22,40,0.2) 0%, rgba(10,22,40,0.55) 55%, rgba(10,22,40,0.97) 100%)",
        }} />

        {/* Hero content — only shown on intro step */}
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem", paddingTop: "8rem" }}>
          <AnimatePresence mode="wait">
            {step === "intro" && (
              <motion.div
                key="hero-intro"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ maxWidth: "680px" }}
              >
                <EyebrowLabel light>The Pathfinder Assessment · Beacon Momentum</EyebrowLabel>
                <h1 style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: C.parchment,
                  marginBottom: "1.5rem",
                }}>
                  Find your path<br />
                  <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.82)" }}>through the transition.</em>
                </h1>
                <p style={{
                  fontFamily: body,
                  fontWeight: 400,
                  fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                  lineHeight: 1.8,
                  color: C.mutedOnDark,
                  maxWidth: "540px",
                  marginBottom: "2.5rem",
                }}>
                  Five questions. No hype. No sales pitch. Just an honest look at where you are and which Beacon path is built for people in your situation.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                  <button
                    onClick={() => setStep("quiz")}
                    style={{
                      fontFamily: sans,
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.9rem 2.25rem",
                      background: C.amber,
                      color: C.parchment,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      transition: "background 0.2s, transform 0.16s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = C.amberLight)}
                    onMouseLeave={e => (e.currentTarget.style.background = C.amber)}
                    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    Begin the Assessment
                    <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </button>
                  <span style={{
                    fontFamily: sans,
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    color: "rgba(250,248,244,0.45)",
                  }}>
                    5 minutes · No account required
                  </span>
                </div>
              </motion.div>
            )}

            {(step === "quiz" || step === "result") && (
              <motion.div
                key="hero-compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <EyebrowLabel light>
                  {step === "quiz"
                    ? `Question ${currentQ + 1} of ${QUESTIONS.length} · Pathfinder Assessment`
                    : "Your Path Is Clear · Pathfinder Assessment"}
                </EyebrowLabel>
                {step === "result" && result && (
                  <h2 style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: C.parchment,
                    marginBottom: "0.5rem",
                  }}>
                    Your path is{" "}
                    <span style={{ color: C.amberLight }}>{PILLAR_LABELS[result]}.</span>
                  </h2>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── QUIZ / RESULT CONTENT AREA ────────────────────────────────────────── */}
      <section style={{
        background: step === "result" ? C.parchment : C.cream,
        minHeight: "60vh",
        paddingTop: "4rem",
        paddingBottom: "6rem",
        transition: "background 0.5s ease",
      }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <AnimatePresence mode="wait">

            {/* ── QUIZ ── */}
            {step === "quiz" && (
              <motion.div
                key={`quiz-${currentQ}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Progress bar */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                    <span style={{
                      fontFamily: sans,
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: C.muted,
                    }}>
                      Question {currentQ + 1} of {QUESTIONS.length}
                    </span>
                    <span style={{ fontFamily: sans, fontSize: "0.7rem", color: C.muted }}>
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                  <div style={{ height: "3px", background: C.parchmentDark, borderRadius: "2px", overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", background: C.teal, borderRadius: "2px" }}
                      initial={{ width: `${progress}%` }}
                      animate={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 style={{
                  fontFamily: serif,
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: C.charcoal,
                  marginBottom: QUESTIONS[currentQ].subtext ? "0.625rem" : "2rem",
                }}>
                  {QUESTIONS[currentQ].text}
                </h2>
                {QUESTIONS[currentQ].subtext && (
                  <p style={{
                    fontFamily: body,
                    fontSize: "0.9rem",
                    color: C.muted,
                    marginBottom: "2rem",
                    fontStyle: "italic",
                  }}>
                    {QUESTIONS[currentQ].subtext}
                  </p>
                )}

                {/* Answer options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
                  {QUESTIONS[currentQ].options.map((opt) => {
                    const isSelected = selected === opt.value;
                    const pillarColor = PILLAR_COLORS[opt.pillar];
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "1.125rem 1.375rem",
                          background: isSelected ? `${pillarColor}0D` : "white",
                          border: `1.5px solid ${isSelected ? pillarColor : C.parchmentDark}`,
                          borderLeft: `4px solid ${isSelected ? pillarColor : "transparent"}`,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = `${pillarColor}60`;
                            (e.currentTarget as HTMLButtonElement).style.background = `${pillarColor}06`;
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = C.parchmentDark;
                            (e.currentTarget as HTMLButtonElement).style.background = "white";
                          }
                        }}
                      >
                        {/* Radio dot */}
                        <div style={{
                          marginTop: "2px",
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "50%",
                          border: `2px solid ${isSelected ? pillarColor : C.parchmentDark}`,
                          background: isSelected ? pillarColor : "transparent",
                          flexShrink: 0,
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {isSelected && (
                            <div style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "white",
                            }} />
                          )}
                        </div>
                        <span style={{
                          fontFamily: body,
                          fontSize: "0.9375rem",
                          lineHeight: 1.6,
                          color: isSelected ? C.charcoal : C.mid,
                          transition: "color 0.2s",
                        }}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <button
                    onClick={handleBack}
                    style={{
                      fontFamily: sans,
                      fontSize: "0.8rem",
                      letterSpacing: "0.06em",
                      color: C.muted,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.mid)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                  >
                    <ArrowLeft style={{ width: "1rem", height: "1rem" }} />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selected}
                    style={{
                      fontFamily: sans,
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.75rem 1.75rem",
                      background: selected ? C.teal : C.parchmentDark,
                      color: selected ? C.parchment : C.muted,
                      border: "none",
                      cursor: selected ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { if (selected) (e.currentTarget as HTMLButtonElement).style.background = C.tealDark; }}
                    onMouseLeave={e => { if (selected) (e.currentTarget as HTMLButtonElement).style.background = C.teal; }}
                    onMouseDown={e => { if (selected) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
                    onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
                  >
                    {currentQ + 1 === QUESTIONS.length ? "See My Path" : "Next"}
                    <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Block 1: Pillar icon + tagline ── */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                    paddingBottom: "2rem",
                    borderBottom: `1px solid ${pillarColor}30`,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      background: `${pillarColor}15`,
                      border: `1.5px solid ${pillarColor}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      color: pillarColor,
                      fontFamily: serif,
                      flexShrink: 0,
                    }}
                  >
                    {PILLAR_ICONS[result]}
                  </motion.div>
                  <div>
                    <div style={{
                      fontFamily: sans,
                      fontSize: "0.7rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: pillarColor,
                      marginBottom: "0.25rem",
                    }}>
                      Your Beacon Path
                    </div>
                    <p style={{
                      fontFamily: body,
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      color: C.mid,
                    }}>
                      {PILLAR_TAGLINES[result]}
                    </p>
                  </div>
                </motion.div>

                {/* ── Block 2: Pillar Breakdown Chart ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    padding: "1.75rem 2rem",
                    background: "white",
                    border: `1px solid ${C.parchmentDark}`,
                    marginBottom: "1.75rem",
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}>
                    <h3 style={{
                      fontFamily: serif,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: C.charcoal,
                      margin: 0,
                    }}>
                      Your Pillar Breakdown
                    </h3>
                    <span style={{
                      fontFamily: sans,
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: C.muted,
                    }}>
                      {answers.length} answers
                    </span>
                  </div>
                  <PillarBreakdownChart
                    breakdown={scorePillarBreakdown(answers)}
                    primaryPillar={result}
                    animate={true}
                  />
                  <p style={{
                    fontFamily: body,
                    fontSize: "0.78rem",
                    color: C.muted,
                    marginTop: "1.25rem",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}>
                    Each bar shows how many of your answers pointed toward that pillar. Your primary path is the strongest signal — but secondary pillars may also be relevant to your situation.
                  </p>
                </motion.div>

                {/* ── Block 3: Result description card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    padding: "2rem 2.25rem",
                    background: `${pillarColor}08`,
                    borderLeft: `4px solid ${pillarColor}`,
                    marginBottom: "2.5rem",
                  }}
                >
                  <h3 style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: C.charcoal,
                    marginBottom: "0.875rem",
                  }}>
                    What this means for you
                  </h3>
                  <p style={{
                    fontFamily: body,
                    fontSize: "0.9375rem",
                    lineHeight: 1.8,
                    color: C.mid,
                  }}>
                    {PILLAR_DESCRIPTIONS[result]}
                  </p>
                </motion.div>

                {/* ── Block 4: Email capture ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.38, ease: [0.23, 1, 0.32, 1] }}
                >
                {/* Email capture */}
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="email-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        background: "white",
                        border: `1px solid ${C.parchmentDark}`,
                        padding: "1.75rem 2rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <h3 style={{
                        fontFamily: serif,
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        color: C.charcoal,
                        marginBottom: "0.375rem",
                      }}>
                        Send me the full {PILLAR_LABELS[result]} overview
                      </h3>
                      <p style={{
                        fontFamily: body,
                        fontSize: "0.875rem",
                        color: C.muted,
                        marginBottom: "1.25rem",
                      }}>
                        Get the curriculum, next steps, and how to get started — no spam, no pressure.
                      </p>
                      <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder="First name"
                            disabled={submitting}
                            style={{
                              flex: "1 1 140px",
                              padding: "0.75rem 1rem",
                              border: `1.5px solid ${C.parchmentDark}`,
                              fontFamily: body,
                              fontSize: "0.875rem",
                              color: C.charcoal,
                              background: C.parchment,
                              outline: "none",
                            }}
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={submitting}
                            style={{
                              flex: "2 1 200px",
                              padding: "0.75rem 1rem",
                              border: `1.5px solid ${C.parchmentDark}`,
                              fontFamily: body,
                              fontSize: "0.875rem",
                              color: C.charcoal,
                              background: C.parchment,
                              outline: "none",
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting || !email}
                          style={{
                            fontFamily: sans,
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            padding: "0.8rem 1.5rem",
                            background: submitting || !email ? C.parchmentDark : C.teal,
                            color: submitting || !email ? C.muted : C.parchment,
                            border: "none",
                            cursor: submitting || !email ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {submitting ? (
                            <><Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} /> Sending…</>
                          ) : "Send It"}
                        </button>
                        {submitError && (
                          <p style={{ fontFamily: body, fontSize: "0.8rem", color: "#c0392b", textAlign: "center" }}>
                            Something went wrong. Please try again or email us at hello@beaconmomentum.com.
                          </p>
                        )}
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="email-confirmed"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        padding: "1.5rem 2rem",
                        background: `${pillarColor}0D`,
                        border: `1px solid ${pillarColor}30`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <CheckCircle2 style={{ width: "1.25rem", height: "1.25rem", color: pillarColor, flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <p style={{ fontFamily: sans, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: pillarColor, marginBottom: "0.25rem" }}>
                          You're on the list.
                        </p>
                        <p style={{ fontFamily: body, fontSize: "0.875rem", color: C.mid, lineHeight: 1.6 }}>
                          Check your inbox — the {PILLAR_LABELS[result]} overview is on its way.
                          {firstName ? ` We'll address it to ${firstName}.` : ""}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.div>

                {/* ── Block 5: CTA buttons ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.48, ease: [0.23, 1, 0.32, 1] }}
                >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <Link
                      href={PILLAR_NEXT_STEPS[result]}
                      style={{
                        flex: "1 1 200px",
                        fontFamily: sans,
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.9rem 1.5rem",
                        background: pillarColor,
                        color: C.parchment,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >
                      Explore {PILLAR_LABELS[result]}
                      <ArrowRight style={{ width: "1rem", height: "1rem" }} />
                    </Link>
                    <button
                      onClick={handleShare}
                      style={{
                        flex: "1 1 160px",
                        fontFamily: sans,
                        fontWeight: 400,
                        fontSize: "0.8rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.9rem 1.5rem",
                        background: copied ? `${pillarColor}12` : "transparent",
                        color: copied ? pillarColor : C.mid,
                        border: `1.5px solid ${copied ? pillarColor : C.parchmentDark}`,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        transition: "all 0.2s",
                      }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="copied" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            <Check style={{ width: "1rem", height: "1rem" }} /> Link Copied
                          </motion.span>
                        ) : (
                          <motion.span key="share" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            <Share2 style={{ width: "1rem", height: "1rem" }} /> Share Result
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>

                  {/* Retake link */}
                  <div style={{ textAlign: "center", paddingTop: "0.5rem" }}>
                    <button
                      onClick={handleRetake}
                      style={{
                        fontFamily: sans,
                        fontSize: "0.8rem",
                        color: C.muted,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.mid)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                    >
                      Retake Assessment
                    </button>
                  </div>
                </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── DOCTRINE BAND (shown only on intro) ──────────────────────────────── */}
      {step === "intro" && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: C.navy, padding: "5rem 0" }}
        >
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0",
              borderTop: "1px solid rgba(250,248,244,0.08)",
            }}>
              {[
                {
                  rule: "No sales call required.",
                  sub: "See your result immediately. No email gate, no obligation — just an honest diagnostic.",
                },
                {
                  rule: "Built from real transitions.",
                  sub: "12+ months of working with veterans, displaced workers, solopreneurs, and founders shaped every question.",
                },
                {
                  rule: "Five paths. One mission.",
                  sub: "Every Beacon pillar addresses a different dimension of the AI-era transition. The assessment finds yours.",
                },
              ].map((p, i) => (
                <div key={i} style={{
                  padding: "2.5rem 2rem",
                  borderRight: i < 2 ? "1px solid rgba(250,248,244,0.08)" : "none",
                }}>
                  <div style={{
                    fontFamily: serif,
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: C.parchment,
                    marginBottom: "0.625rem",
                    lineHeight: 1.3,
                  }}>
                    {p.rule}
                  </div>
                  <div style={{
                    fontFamily: body,
                    fontSize: "0.875rem",
                    color: "rgba(250,248,244,0.45)",
                    lineHeight: 1.7,
                  }}>
                    {p.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <SharedFooter />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
