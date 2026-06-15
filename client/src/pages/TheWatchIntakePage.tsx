/**
 * Beacon Momentum — The Watch Cohort Placement Intake
 * Design: Deep Water Editorial / Quiet Authority
 *
 * Route: /the-watch/intake
 * Purpose: 7-step questionnaire for Navigator and Quartermaster members.
 *   Collects context, assigns cohort track, pushes to GHL with tags and custom fields.
 *
 * GHL tags applied:
 *   BM_Watch_Intake         — any intake completion
 *   BM_Track_Transition     — primary track: career/life transition
 *   BM_Track_Builder        — primary track: building a business/venture
 *   BM_Track_Systems        — primary track: systems and AI integration
 *   BM_Track_Legacy         — primary track: legacy and long-term planning
 *
 * Custom fields written:
 *   watch_intake_track      — assigned cohort track
 *   watch_intake_answers    — JSON blob of all answers
 *   watch_intake_tier       — Sentinel / Navigator / Quartermaster
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { submitToGHL } from "@/lib/ghl";
import { trpc } from "@/lib/trpc";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#0F1E35",
  navyLight: "#162440",
  amber: "#C8922A",
  amberLight: "#E8B84B",
  cream: "#F5F0E8",
  muted: "rgba(245,240,232,0.6)",
  faint: "rgba(245,240,232,0.08)",
  border: "rgba(200,146,42,0.2)",
};
const serif = "'Playfair Display', Georgia, serif";
const body = "'Inter', system-ui, sans-serif";

// ─── GHL custom field IDs for Watch intake (Beacon Momentum location) ──────────
const WATCH_FIELD_IDS = {
  watch_intake_track: "watch_intake_track",   // placeholder — update with real GHL field ID
  watch_intake_answers: "watch_intake_answers",
  watch_intake_tier: "watch_intake_tier",
};

// ─── Track definitions ─────────────────────────────────────────────────────────
const TRACKS = {
  transition: {
    id: "transition",
    label: "The Transition Track",
    icon: "⚓",
    description:
      "For members navigating a major life or career shift — military separation, job change, relocation, or identity reset. Cohort focus: clarity, momentum, and landing on your feet.",
    tag: "BM_Track_Transition",
  },
  builder: {
    id: "builder",
    label: "The Builder Track",
    icon: "⚙",
    description:
      "For members building something — a business, a side venture, a consulting practice, or a new income stream. Cohort focus: execution, accountability, and revenue.",
    tag: "BM_Track_Builder",
  },
  systems: {
    id: "systems",
    label: "The Systems Track",
    icon: "◈",
    description:
      "For members who want to integrate AI tools, automate workflows, and build durable personal operating systems. Cohort focus: leverage, efficiency, and future-proofing.",
    tag: "BM_Track_Systems",
  },
  legacy: {
    id: "legacy",
    label: "The Legacy Track",
    icon: "◉",
    description:
      "For members focused on the long game — estate planning, knowledge transfer, mentorship, and building something that outlasts them. Cohort focus: permanence and impact.",
    tag: "BM_Track_Legacy",
  },
};

// ─── Question definitions ───────────────────────────────────────────────────────
interface Question {
  id: string;
  step: number;
  label: string;
  sublabel?: string;
  type: "radio" | "select" | "textarea" | "text" | "track";
  options?: { value: string; label: string; sub?: string }[];
  placeholder?: string;
  required?: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: "tier",
    step: 1,
    label: "Which membership tier did you select?",
    sublabel: "This helps us route your onboarding correctly.",
    type: "radio",
    required: true,
    options: [
      { value: "sentinel", label: "Sentinel", sub: "$47/month — entry tier" },
      { value: "navigator", label: "Navigator", sub: "$97/month — full cohort access" },
      { value: "quartermaster", label: "Quartermaster", sub: "$247/month — founding tier" },
    ],
  },
  {
    id: "current_situation",
    step: 2,
    label: "What best describes where you are right now?",
    sublabel: "Be honest. This is for placement, not judgment.",
    type: "radio",
    required: true,
    options: [
      { value: "separating", label: "Separating from military service" },
      { value: "career_change", label: "Changing careers or industries" },
      { value: "building", label: "Building a business or side venture" },
      { value: "displaced", label: "Displaced by AI or industry shift" },
      { value: "plateau", label: "Stuck on a plateau — capable but not moving" },
      { value: "legacy", label: "Planning for the long game — legacy and impact" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "biggest_obstacle",
    step: 3,
    label: "What is the single biggest obstacle between you and where you want to be?",
    sublabel: "One sentence is enough. Be specific.",
    type: "textarea",
    required: true,
    placeholder: "e.g. I know what to do but I can't make myself do it consistently.",
  },
  {
    id: "time_horizon",
    step: 4,
    label: "What is your primary time horizon?",
    sublabel: "Where is your focus right now?",
    type: "radio",
    required: true,
    options: [
      { value: "90_days", label: "90 days", sub: "Immediate stabilization or launch" },
      { value: "1_year", label: "12 months", sub: "Building something durable" },
      { value: "3_years", label: "3–5 years", sub: "Long-term positioning" },
      { value: "legacy", label: "Legacy horizon", sub: "Beyond my own timeline" },
    ],
  },
  {
    id: "ai_comfort",
    step: 5,
    label: "How comfortable are you with AI tools right now?",
    sublabel: "No wrong answer — this determines your starting point in the Systems track.",
    type: "radio",
    required: true,
    options: [
      { value: "none", label: "Not at all — I avoid them" },
      { value: "curious", label: "Curious but haven't started" },
      { value: "occasional", label: "I use them occasionally (ChatGPT, etc.)" },
      { value: "regular", label: "I use AI tools regularly in my work" },
      { value: "building", label: "I'm building with AI (APIs, automations, agents)" },
    ],
  },
  {
    id: "accountability",
    step: 6,
    label: "What kind of accountability works best for you?",
    sublabel: "We'll use this to structure your cohort experience.",
    type: "radio",
    required: true,
    options: [
      { value: "public", label: "Public commitment — I need to say it out loud" },
      { value: "partner", label: "One-on-one partner — a specific person checking in" },
      { value: "group", label: "Small group — 4–8 people in the same situation" },
      { value: "async", label: "Async check-ins — written, on my schedule" },
      { value: "self", label: "Self-directed — I just need the structure, not the check-ins" },
    ],
  },
  {
    id: "track_choice",
    step: 7,
    label: "Based on what you've shared, which cohort track fits you best?",
    sublabel:
      "We'll validate this against your answers and assign your cohort. You can always switch tracks after your first 30 days.",
    type: "track",
    required: true,
  },
];

// ─── Track scoring logic ────────────────────────────────────────────────────────
function scoreTrack(answers: Record<string, string>): keyof typeof TRACKS {
  const scores: Record<keyof typeof TRACKS, number> = {
    transition: 0,
    builder: 0,
    systems: 0,
    legacy: 0,
  };

  // situation
  if (answers.current_situation === "separating" || answers.current_situation === "career_change")
    scores.transition += 3;
  if (answers.current_situation === "building") scores.builder += 3;
  if (answers.current_situation === "displaced") scores.systems += 2;
  if (answers.current_situation === "legacy") scores.legacy += 3;
  if (answers.current_situation === "plateau") { scores.transition += 1; scores.builder += 1; }

  // time horizon
  if (answers.time_horizon === "90_days") scores.transition += 2;
  if (answers.time_horizon === "1_year") scores.builder += 2;
  if (answers.time_horizon === "3_years") { scores.systems += 1; scores.legacy += 1; }
  if (answers.time_horizon === "legacy") scores.legacy += 3;

  // AI comfort
  if (answers.ai_comfort === "none" || answers.ai_comfort === "curious") scores.transition += 1;
  if (answers.ai_comfort === "regular" || answers.ai_comfort === "building") scores.systems += 3;

  // tier
  if (answers.tier === "quartermaster") scores.legacy += 1;

  const top = (Object.keys(scores) as (keyof typeof TRACKS)[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );
  return top;
}

// ─── Progress bar ───────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: body,
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: C.muted,
          marginBottom: "0.5rem",
        }}
      >
        <span>Step {step} of {total}</span>
        <span>{pct}% complete</span>
      </div>
      <div
        style={{
          height: "2px",
          background: C.faint,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${C.amber}, ${C.amberLight})`,
            transition: "width 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Radio option ───────────────────────────────────────────────────────────────
function RadioOption({
  value,
  label,
  sub,
  selected,
  onSelect,
}: {
  value: string;
  label: string;
  sub?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        padding: "1rem 1.25rem",
        background: selected ? "rgba(200,146,42,0.1)" : C.faint,
        border: `1px solid ${selected ? C.amber : C.border}`,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.15s ease-out",
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: `2px solid ${selected ? C.amber : C.muted}`,
          flexShrink: 0,
          marginTop: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s ease-out",
        }}
      >
        {selected && (
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: C.amber,
            }}
          />
        )}
      </div>
      <div>
        <div
          style={{
            fontFamily: body,
            fontSize: "0.95rem",
            fontWeight: 500,
            color: selected ? C.cream : "rgba(245,240,232,0.85)",
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
        {sub && (
          <div
            style={{
              fontFamily: body,
              fontSize: "0.8rem",
              color: C.muted,
              marginTop: "0.2rem",
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Track card ─────────────────────────────────────────────────────────────────
function TrackCard({
  track,
  selected,
  recommended,
  onSelect,
}: {
  track: (typeof TRACKS)[keyof typeof TRACKS];
  selected: boolean;
  recommended: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "block",
        padding: "1.5rem",
        background: selected ? "rgba(200,146,42,0.12)" : C.faint,
        border: `1px solid ${selected ? C.amber : C.border}`,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.18s ease-out",
        marginBottom: "0.75rem",
        position: "relative",
      }}
    >
      {recommended && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "1rem",
            background: C.amber,
            color: C.navy,
            fontFamily: body,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.2rem 0.6rem",
          }}
        >
          Recommended for you
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "1.25rem" }}>{track.icon}</span>
        <span
          style={{
            fontFamily: serif,
            fontSize: "1.05rem",
            fontWeight: 600,
            color: selected ? C.amberLight : C.cream,
          }}
        >
          {track.label}
        </span>
      </div>
      <p
        style={{
          fontFamily: body,
          fontSize: "0.85rem",
          lineHeight: 1.7,
          color: C.muted,
          margin: 0,
        }}
      >
        {track.description}
      </p>
    </button>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────────
export default function TheWatchIntakePage() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedTrack, setRecommendedTrack] = useState<keyof typeof TRACKS>("transition");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const totalSteps = QUESTIONS.length;
  const currentQ = QUESTIONS[step - 1];

  // Persist intake to DB for the cohort lead dashboard
  const submitIntakeMutation = trpc.cohort.submitIntake.useMutation();

  // Compute recommended track whenever answers change (for step 7)
  useEffect(() => {
    if (step === 7) {
      const rec = scoreTrack(answers);
      setRecommendedTrack(rec);
      // Pre-select recommended track if not already chosen
      if (!answers.track_choice) {
        setAnswers((prev) => ({ ...prev, track_choice: rec }));
      }
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  function setAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function canAdvance(): boolean {
    if (!currentQ.required) return true;
    return !!answers[currentQ.id]?.trim();
  }

  function handleNext() {
    if (step < totalSteps) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleSubmit() {
    // Retrieve email from session storage (set by TheWatchPage JoinForm)
    const email = sessionStorage.getItem("watch_intake_email") || "";
    const firstName = sessionStorage.getItem("watch_intake_name") || undefined;
    const tier = answers.tier || sessionStorage.getItem("watch_intake_tier") || "navigator";
    const track = answers.track_choice || recommendedTrack;
    const trackData = TRACKS[track as keyof typeof TRACKS] || TRACKS.transition;

    setSubmitStatus("submitting");

    const ok = await submitToGHL({
      email,
      firstName,
      tags: [
        "BM_Watch_Intake",
        "BM_Watch_Join",
        `BM_Watch_${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
        trackData.tag,
      ],
      source: "beaconmomentum.com/the-watch/intake",
      customFields: [
        { id: WATCH_FIELD_IDS.watch_intake_track, field_value: track },
        { id: WATCH_FIELD_IDS.watch_intake_tier, field_value: tier },
        { id: WATCH_FIELD_IDS.watch_intake_answers, field_value: JSON.stringify(answers) },
      ],
    });

    // Also persist to DB for cohort lead dashboard (fire-and-forget, non-blocking)
    if (email) {
      submitIntakeMutation.mutate({
        email,
        firstName,
        tier,
        track,
        intakeAnswers: answers,
      });
    }

    setSubmitStatus(ok ? "success" : "error");
  }

  // ── Success screen ────────────────────────────────────────────────────────────
  if (submitStatus === "success") {
    const track = answers.track_choice || recommendedTrack;
    const trackData = TRACKS[track as keyof typeof TRACKS] || TRACKS.transition;
    return (
      <div style={{ background: C.navy, minHeight: "100vh", color: C.cream }}>
        <SharedNav />
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1.5rem",
          }}
        >
          <div style={{ maxWidth: "560px", textAlign: "center" }}>
            {/* Compass icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                border: `2px solid ${C.amber}`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
                fontSize: "1.75rem",
              }}
            >
              {trackData.icon}
            </div>
            <h1
              style={{
                fontFamily: serif,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: C.cream,
                marginBottom: "1rem",
              }}
            >
              You're in.
            </h1>
            <p
              style={{
                fontFamily: body,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: C.muted,
                marginBottom: "0.75rem",
              }}
            >
              Your cohort placement is confirmed:{" "}
              <strong style={{ color: C.amberLight }}>{trackData.label}</strong>.
            </p>
            <p
              style={{
                fontFamily: body,
                fontSize: "0.9rem",
                lineHeight: 1.8,
                color: C.muted,
                marginBottom: "2.5rem",
              }}
            >
              A member of the Beacon team will send your onboarding details and
              cohort introduction within 24 hours. Check your inbox — and your
              spam folder.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/the-watch">
                <button
                  style={{
                    background: C.amber,
                    color: C.navy,
                    border: "none",
                    padding: "0.85rem 2rem",
                    fontFamily: body,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Back to The Watch
                </button>
              </Link>
              <Link href="/">
                <button
                  style={{
                    background: "transparent",
                    color: C.cream,
                    border: `1px solid ${C.border}`,
                    padding: "0.85rem 2rem",
                    fontFamily: body,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Explore Beacon
                </button>
              </Link>
            </div>
          </div>
        </div>
        <SharedFooter />
      </div>
    );
  }

  // ── Question renderer ─────────────────────────────────────────────────────────
  function renderQuestion() {
    const q = currentQ;

    if (q.type === "radio" && q.options) {
      return (
        <div>
          {q.options.map((opt) => (
            <RadioOption
              key={opt.value}
              value={opt.value}
              label={opt.label}
              sub={opt.sub}
              selected={answers[q.id] === opt.value}
              onSelect={() => setAnswer(q.id, opt.value)}
            />
          ))}
        </div>
      );
    }

    if (q.type === "textarea") {
      return (
        <textarea
          value={answers[q.id] || ""}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          placeholder={q.placeholder}
          rows={4}
          style={{
            width: "100%",
            background: C.faint,
            border: `1px solid ${answers[q.id] ? C.amber : C.border}`,
            padding: "1rem",
            fontFamily: body,
            fontSize: "0.95rem",
            color: C.cream,
            lineHeight: 1.7,
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.15s ease-out",
            boxSizing: "border-box",
          }}
        />
      );
    }

    if (q.type === "text") {
      return (
        <input
          type="text"
          value={answers[q.id] || ""}
          onChange={(e) => setAnswer(q.id, e.target.value)}
          placeholder={q.placeholder}
          style={{
            width: "100%",
            background: C.faint,
            border: `1px solid ${answers[q.id] ? C.amber : C.border}`,
            padding: "0.9rem 1rem",
            fontFamily: body,
            fontSize: "0.95rem",
            color: C.cream,
            outline: "none",
            transition: "border-color 0.15s ease-out",
            boxSizing: "border-box",
          }}
        />
      );
    }

    if (q.type === "track") {
      return (
        <div>
          {(Object.values(TRACKS) as (typeof TRACKS)[keyof typeof TRACKS][]).map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              selected={answers.track_choice === track.id}
              recommended={track.id === recommendedTrack}
              onSelect={() => setAnswer("track_choice", track.id)}
            />
          ))}
        </div>
      );
    }

    return null;
  }

  // ── Main render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ background: C.navy, minHeight: "100vh", color: C.cream }}>
      <SharedNav />

      {/* Hero strip */}
      <div
        style={{
          background: C.navyMid,
          borderBottom: `1px solid ${C.border}`,
          padding: "3rem 1.5rem 2.5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: body,
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: C.amber,
            marginBottom: "0.75rem",
          }}
        >
          The Watch · Cohort Placement
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: C.cream,
            margin: "0 auto 0.75rem",
            maxWidth: "600px",
          }}
        >
          Tell us where you are.
        </h1>
        <p
          style={{
            fontFamily: body,
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: C.muted,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Seven questions. Five minutes. Your answers determine your cohort
          track and starting point inside The Watch.
        </p>
      </div>

      {/* Questionnaire */}
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "3rem 1.5rem 6rem",
        }}
      >
        <ProgressBar step={step} total={totalSteps} />

        {/* Question card */}
        <div
          style={{
            background: C.navyMid,
            border: `1px solid ${C.border}`,
            padding: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Step label */}
          <div
            style={{
              fontFamily: body,
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: C.amber,
              marginBottom: "0.75rem",
            }}
          >
            Question {step}
          </div>

          {/* Question text */}
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              color: C.cream,
              marginBottom: currentQ.sublabel ? "0.5rem" : "1.5rem",
            }}
          >
            {currentQ.label}
          </h2>

          {currentQ.sublabel && (
            <p
              style={{
                fontFamily: body,
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: C.muted,
                marginBottom: "1.5rem",
              }}
            >
              {currentQ.sublabel}
            </p>
          )}

          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              style={{
                background: "transparent",
                color: C.muted,
                border: `1px solid ${C.border}`,
                padding: "0.8rem 1.5rem",
                fontFamily: body,
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.15s ease-out, border-color 0.15s ease-out",
              }}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance()}
              style={{
                background: canAdvance() ? C.amber : "rgba(200,146,42,0.3)",
                color: canAdvance() ? C.navy : "rgba(10,22,40,0.5)",
                border: "none",
                padding: "0.85rem 2.5rem",
                fontFamily: body,
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: canAdvance() ? "pointer" : "not-allowed",
                transition: "background 0.15s ease-out, color 0.15s ease-out",
                transform: "scale(1)",
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canAdvance() || submitStatus === "submitting"}
              style={{
                background: canAdvance() ? C.amber : "rgba(200,146,42,0.3)",
                color: canAdvance() ? C.navy : "rgba(10,22,40,0.5)",
                border: "none",
                padding: "0.85rem 2.5rem",
                fontFamily: body,
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: canAdvance() && submitStatus !== "submitting" ? "pointer" : "not-allowed",
                transition: "background 0.15s ease-out",
              }}
            >
              {submitStatus === "submitting" ? "Submitting…" : "Confirm My Track →"}
            </button>
          )}
        </div>

        {/* Error state */}
        {submitStatus === "error" && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem 1.25rem",
              background: "rgba(220,50,50,0.1)",
              border: "1px solid rgba(220,50,50,0.3)",
              fontFamily: body,
              fontSize: "0.875rem",
              color: "#f87171",
              lineHeight: 1.6,
            }}
          >
            Something went wrong submitting your intake. Please try again, or
            email{" "}
            <a href="mailto:hello@beaconmomentum.com" style={{ color: C.amberLight }}>
              hello@beaconmomentum.com
            </a>{" "}
            with your name and selected tier.
          </div>
        )}

        {/* Reassurance note */}
        <p
          style={{
            fontFamily: body,
            fontSize: "0.78rem",
            color: "rgba(245,240,232,0.35)",
            lineHeight: 1.6,
            textAlign: "center",
            marginTop: "2.5rem",
          }}
        >
          Your answers are used only for cohort placement and are never shared
          outside the Beacon team. You can update your track at any time by
          contacting your cohort lead.
        </p>
      </div>

      <SharedFooter />
    </div>
  );
}
