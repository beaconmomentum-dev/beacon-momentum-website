/**
 * Beacon Momentum — Pathfinder Assessment
 * Design: Deep Water Editorial / Quiet Authority
 * Purpose: Multi-step diagnostic quiz that routes visitors to one of five Beacon pillars
 *
 * Historical context: Evolved from the Financial Sovereignty Quiz and
 * Rise & Reclaim four-stage path (Stabilize → Build → Rise → Reclaim).
 * Personas: Veterans in transition, displaced workers, mid-career professionals,
 * small business owners, survivors of personal/economic storms.
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Compass, Loader2, Share2, Check } from "lucide-react";
import { submitPathfinderResult } from "@/lib/ghl";
import { usePageMeta } from "@/hooks/usePageMeta";

// sessionStorage key for progress persistence
const STORAGE_KEY = "bm_pathfinder_progress";

interface SavedProgress {
  step: "intro" | "quiz" | "result";
  currentQ: number;
  answers: string[];
  result: string | null;
}

const PILLAR_COLORS: Record<string, string> = {
  life: "#2A7F6F",
  work: "#1A5C6B",
  venture: "#B8860B",
  systems: "#4A3728",
  labs: "#5C3A6B",
};

const PILLAR_LABELS: Record<string, string> = {
  life: "Beacon Life",
  work: "Beacon Work",
  venture: "Beacon Venture",
  systems: "Beacon Systems",
  labs: "Beacon Labs",
};

const PILLAR_TAGLINES: Record<string, string> = {
  life: "Rebuild your capacity, confidence, and sense of direction.",
  work: "Adapt your skills and professional value for the AI era.",
  venture: "Create resilient income through solopreneurship and digital ventures.",
  systems: "Install private, trusted, AI-enabled operations for your organization.",
  labs: "Prove, test, and document what actually works in the AI transition.",
};

const PILLAR_NEXT_STEPS: Record<string, string> = {
  life: "/pillar/life",
  work: "/pillar/work",
  venture: "/pillar/venture",
  systems: "/pillar/systems",
  labs: "/pillar/labs",
};

// Pillar-specific share text — concise enough for social, specific enough to be meaningful
const PILLAR_SHARE_TEXT: Record<string, string> = {
  life: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Life — rebuilding capacity, confidence, and direction in the AI era. Find your path:",
  work: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Work — adapting professional value for the AI era. Find your path:",
  venture: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Venture — building resilient income on my own terms. Find your path:",
  systems: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Systems — private, trusted, AI-enabled operations. Find your path:",
  labs: "I just took the Beacon Momentum Pathfinder Assessment and my path is Beacon Labs — proving what actually works in the AI transition. Find your path:",
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

export default function Assessment() {
  usePageMeta({
    title: "Pathfinder Assessment",
    description: "Answer 7 questions and discover which Beacon Momentum pillar fits where you are right now. Free, no email required to see your result.",
    url: "/assessment",
  });

  // Restore saved progress from sessionStorage on mount
  const [step, setStep] = useState<"intro" | "quiz" | "result">(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p: SavedProgress = JSON.parse(saved);
        return p.step ?? "intro";
      }
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
    if (step === "intro") return; // don't persist intro state
    try {
      const progress: SavedProgress = { step, currentQ, answers, result };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch { /* ignore — private browsing may block writes */ }
  }, [step, currentQ, answers, result]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (!result) return;
    // Share to the pillar-specific landing page so recipients see their result directly
    const shareUrl = `${window.location.origin}/path/${result}`;
    const shareText = PILLAR_SHARE_TEXT[result];
    const fullText = `${shareText} ${shareUrl}`;

    // Use native Web Share API if available (mobile + modern desktop)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Beacon Path: ${PILLAR_LABELS[result]}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed — fall through to clipboard
        if ((err as Error).name === "AbortError") return;
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Last resort: select a temporary textarea
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

  function handleSelect(value: string) {
    setSelected(value);
  }

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
        // Clear saved progress once successfully submitted
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

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-sm bg-[#1A5C6B] flex items-center justify-center">
              <span className="text-white" style={{fontSize:"0.9rem"}}>◈</span>
            </div>
            <span className="font-display text-[#2C2416] text-lg tracking-tight">Beacon Momentum</span>
          </Link>
          <Link href="/" className="text-sm text-[#6B5E4E] hover:text-[#1A5C6B] transition-colors">
            ← Back to home
          </Link>
        </div>
      </nav>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="text-center pt-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A5C6B]/10 rounded-full mb-8">
                  <Compass className="w-4 h-4 text-[#1A5C6B]" />
                  <span className="text-sm font-ui text-[#1A5C6B] tracking-widest uppercase">The Pathfinder Assessment</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-[#2C2416] leading-tight mb-6">
                  Find your path<br />through the transition.
                </h1>
                <p className="text-lg text-[#6B5E4E] leading-relaxed mb-4 max-w-lg mx-auto">
                  Five questions. No hype. No sales pitch. Just an honest look at where you are and which Beacon path is built for people in your situation.
                </p>
                <p className="text-sm text-[#9B8E7E] mb-10 max-w-md mx-auto">
                  This assessment was built from 12+ months of working with veterans, displaced workers, solopreneurs, founders, and people navigating the AI transition on their own terms.
                </p>
                <button
                  onClick={() => setStep("quiz")}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A5C6B] text-white font-ui text-sm tracking-widest uppercase rounded-sm hover:bg-[#154F5C] transition-all duration-200 active:scale-[0.97]"
                >
                  Begin the Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-[#9B8E7E] mt-4">Takes about 5 minutes. No account required.</p>
              </motion.div>
            )}

            {/* QUIZ */}
            {step === "quiz" && (
              <motion.div
                key={`quiz-${currentQ}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="pt-8"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-ui text-[#9B8E7E] tracking-widest uppercase">
                      Question {currentQ + 1} of {QUESTIONS.length}
                    </span>
                    <span className="text-xs font-ui text-[#9B8E7E]">{Math.round(progress)}% complete</span>
                  </div>
                  <div className="h-1 bg-[#E8E4DC] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#1A5C6B] rounded-full"
                      initial={{ width: `${progress}%` }}
                      animate={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-[#2C2416] leading-tight mb-3">
                  {QUESTIONS[currentQ].text}
                </h2>
                {QUESTIONS[currentQ].subtext && (
                  <p className="text-[#9B8E7E] mb-8 text-sm">{QUESTIONS[currentQ].subtext}</p>
                )}

                <div className="space-y-3 mb-10">
                  {QUESTIONS[currentQ].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-sm border transition-all duration-200 active:scale-[0.99] ${
                        selected === opt.value
                          ? "border-[#1A5C6B] bg-[#1A5C6B]/8 text-[#2C2416]"
                          : "border-[#E8E4DC] bg-white text-[#4A3E30] hover:border-[#1A5C6B]/40 hover:bg-[#F5F2EC]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                          selected === opt.value ? "border-[#1A5C6B] bg-[#1A5C6B]" : "border-[#C8BFB0]"
                        }`} aria-hidden="true">
                          {selected === opt.value && (
                            <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                          )}
                        </div>
                        <span className="text-sm leading-relaxed">{opt.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selected}
                    aria-label={
                      !selected
                        ? "Select an answer to continue"
                        : currentQ + 1 === QUESTIONS.length
                        ? "See my Beacon path result"
                        : `Continue to question ${currentQ + 2}`
                    }
                    className={`flex items-center gap-2 px-6 py-3 rounded-sm font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97] ${
                      selected
                        ? "bg-[#1A5C6B] text-white hover:bg-[#154F5C]"
                        : "bg-[#E8E4DC] text-[#9B8E7E] cursor-not-allowed"
                    }`}
                  >
                    {currentQ + 1 === QUESTIONS.length ? "See My Path" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* RESULT */}
            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="pt-8"
              >
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-[#2A7F6F]" />
                  <span className="text-sm font-ui text-[#2A7F6F] tracking-widest uppercase">Your Path Is Clear</span>
                </div>

                <h2 className="font-display text-4xl md:text-5xl text-[#2C2416] leading-tight mb-4">
                  Your Beacon path is<br />
                  <span style={{ color: PILLAR_COLORS[result] }}>{PILLAR_LABELS[result]}.</span>
                </h2>

                <p className="text-lg text-[#6B5E4E] leading-relaxed mb-8 max-w-lg">
                  {PILLAR_TAGLINES[result]}
                </p>

                {/* Result card */}
                <div
                  className="rounded-sm p-6 mb-8 border"
                  style={{
                    borderColor: PILLAR_COLORS[result] + "40",
                    backgroundColor: PILLAR_COLORS[result] + "08",
                  }}
                >
                  <h3 className="font-display text-xl text-[#2C2416] mb-3">What this means for you</h3>
                  {result === "life" && (
                    <p className="text-sm text-[#6B5E4E] leading-relaxed">
                      Beacon Life is built for people who are in the middle of something hard and need practical support to stabilize, rebuild capacity, and find direction. You will work through the four-stage path — Stabilize, Build, Rise, Reclaim — at the pace that is right for you, not a curriculum's timeline.
                    </p>
                  )}
                  {result === "work" && (
                    <p className="text-sm text-[#6B5E4E] leading-relaxed">
                      Beacon Work is built for professionals navigating the AI transition without losing what makes them valuable. You will learn which skills matter, how to prove your value in an AI-era workplace, and how to adapt your workflow without becoming dependent on tools you don't understand.
                    </p>
                  )}
                  {result === "venture" && (
                    <p className="text-sm text-[#6B5E4E] leading-relaxed">
                      Beacon Venture is built for people who want to create resilient income on their own terms. Whether you have a skill, an idea, or just the determination to build something real, you will get a practical system — not another course — for launching and sustaining a digital venture.
                    </p>
                  )}
                  {result === "systems" && (
                    <p className="text-sm text-[#6B5E4E] leading-relaxed">
                      Beacon Systems is built for founders and operators who need private, trusted, AI-enabled operations. You will get implementation support, not just advice — real systems installed in your organization that you own, understand, and control.
                    </p>
                  )}
                  {result === "labs" && (
                    <p className="text-sm text-[#6B5E4E] leading-relaxed">
                      Beacon Labs is built for people who want to understand AI from the inside. You will get access to documented experiments, Signal Check reports, tool reviews, and case studies that prove what works — not what sounds good in a marketing email.
                    </p>
                  )}
                </div>

                {/* Email capture */}
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="email-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="bg-white border border-[#E8E4DC] rounded-sm p-6 mb-6"
                    >
                      <h3 className="font-display text-lg text-[#2C2416] mb-2">Send me the full {PILLAR_LABELS[result]} overview</h3>
                      <p className="text-sm text-[#9B8E7E] mb-4">Get the curriculum, next steps, and how to get started — no spam, no pressure.</p>
                      <form onSubmit={handleEmailSubmit} className="space-y-3" aria-label="Email capture form">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            aria-label="Your first name (optional)"
                            autoComplete="given-name"
                            disabled={submitting}
                            className="flex-1 px-4 py-2.5 border border-[#E8E4DC] rounded-sm text-sm text-[#2C2416] placeholder:text-[#C8BFB0] focus:outline-none focus:border-[#1A5C6B] bg-[#FAF8F4] disabled:opacity-60 transition-opacity"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            aria-label="Your email address (required)"
                            autoComplete="email"
                            required
                            disabled={submitting}
                            className="flex-1 px-4 py-2.5 border border-[#E8E4DC] rounded-sm text-sm text-[#2C2416] placeholder:text-[#C8BFB0] focus:outline-none focus:border-[#1A5C6B] bg-[#FAF8F4] disabled:opacity-60 transition-opacity"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting || !email}
                          aria-label={submitting ? "Sending your details, please wait" : "Submit email to receive your Beacon path overview"}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A5C6B] text-white text-sm font-ui tracking-widest uppercase rounded-sm hover:bg-[#154F5C] transition-all duration-200 active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                              Sending…
                            </>
                          ) : "Send It"}
                        </button>
                        {submitError && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-600 text-center pt-1"
                            role="alert"
                          >
                            Something went wrong. Please try again or email us at hello@beaconmomentum.com.
                          </motion.p>
                        )}
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="email-confirmed"
                      initial={{ opacity: 0, scale: 0.97, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="bg-[#2A7F6F]/10 border border-[#2A7F6F]/30 rounded-sm p-5 mb-6"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2A7F6F]/20 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#2A7F6F]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm font-ui text-[#2A7F6F] tracking-widest uppercase mb-1">You're on the list.</p>
                          <p className="text-sm text-[#4A6B5E] leading-relaxed">
                            Check your inbox — the {PILLAR_LABELS[result]} overview is on its way.{firstName ? ` We'll address it to ${firstName}.` : ""}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={PILLAR_NEXT_STEPS[result]}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97] text-white"
                    style={{ backgroundColor: PILLAR_COLORS[result] }}
                  >
                    Explore {PILLAR_LABELS[result]}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={handleShare}
                    aria-label={copied ? "Link copied to clipboard" : "Share your Pathfinder result"}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97]"
                    style={{
                      borderColor: copied ? "#2A7F6F" : PILLAR_COLORS[result] + "60",
                      color: copied ? "#2A7F6F" : PILLAR_COLORS[result],
                      backgroundColor: copied ? "#2A7F6F10" : PILLAR_COLORS[result] + "08",
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          className="inline-flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" aria-hidden="true" />
                          Link Copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="share"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          className="inline-flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" aria-hidden="true" />
                          Share Result
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Retake link — lower visual weight than primary actions */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
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
                    }}
                    aria-label="Retake the Pathfinder Assessment from the beginning"
                    className="text-sm text-[#9B8E7E] hover:text-[#6B5E4E] transition-colors underline underline-offset-4 decoration-[#C8BFB0] hover:decoration-[#9B8E7E]"
                  >
                    Retake Assessment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
