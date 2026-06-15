/**
 * Beacon Momentum — Cohort Lead Dashboard
 * Route: /the-watch/cohort
 *
 * Password-protected (shared cohort lead password, no Manus OAuth required).
 * Shows all Watch members with their intake answers, track, tier, and lead notes.
 * Leads can filter by track/tier, view full intake answers, add notes, and assign members.
 */

import { useState, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Design tokens (matching The Watch dark navy aesthetic) ───────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#0F1E35",
  navyLight: "#162440",
  navyCard: "#111D30",
  amber: "#C8922A",
  amberLight: "#E8B84B",
  cream: "#F5F0E8",
  muted: "rgba(245,240,232,0.6)",
  faint: "rgba(245,240,232,0.08)",
  border: "rgba(200,146,42,0.2)",
  borderFaint: "rgba(245,240,232,0.1)",
  green: "#2E7D6B",
  red: "#8B2E2E",
};
const serif = "'Playfair Display', Georgia, serif";
const body = "'Inter', system-ui, sans-serif";

// ─── Track / tier labels ───────────────────────────────────────────────────────
const TRACK_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  transition: { label: "Transition", icon: "⚓", color: "#2E7D6B" },
  builder: { label: "Builder", icon: "⚙", color: "#C8922A" },
  systems: { label: "Systems", icon: "◈", color: "#3D4F6B" },
  legacy: { label: "Legacy", icon: "◉", color: "#5C3D6B" },
};
const TIER_LABELS: Record<string, { label: string; color: string }> = {
  sentinel: { label: "Sentinel", color: "#4A5568" },
  navigator: { label: "Navigator", color: "#2E7D6B" },
  quartermaster: { label: "Quartermaster", color: "#C8922A" },
};

const QUESTION_LABELS: Record<string, string> = {
  tier: "Membership Tier",
  current_situation: "Current Situation",
  biggest_obstacle: "Biggest Obstacle",
  time_horizon: "Time Horizon",
  ai_comfort: "AI Comfort Level",
  accountability: "Accountability Style",
  track_choice: "Chosen Track",
};

// ─── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.cohort.login.useMutation({
    onSuccess: (data) => {
      onLogin(data.leadEmail);
    },
    onError: (err) => {
      setError(err.message === "Invalid password" ? "Incorrect password. Please try again." : err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Both email and password are required.");
      return;
    }
    loginMutation.mutate({ password, leadEmail: email });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.navy,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: C.navyCard,
          border: `1px solid ${C.border}`,
          padding: "3rem 2.5rem",
        }}
      >
        {/* Logo / header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: `2px solid ${C.amber}`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              fontSize: "1.25rem",
              color: C.amber,
            }}
          >
            ◈
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: "1.75rem",
              fontWeight: 600,
              color: C.cream,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            Cohort Lead Access
          </h1>
          <p style={{ fontFamily: body, fontSize: "0.875rem", color: C.muted, lineHeight: 1.6 }}>
            The Watch · Beacon Momentum
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontFamily: body,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: "0.5rem",
              }}
            >
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="lead@beaconmomentum.com"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: C.navyLight,
                border: `1px solid ${C.borderFaint}`,
                color: C.cream,
                fontFamily: body,
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.amber)}
              onBlur={(e) => (e.target.style.borderColor = C.borderFaint)}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontFamily: body,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: "0.5rem",
              }}
            >
              Cohort Lead Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: C.navyLight,
                border: `1px solid ${C.borderFaint}`,
                color: C.cream,
                fontFamily: body,
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = C.amber)}
              onBlur={(e) => (e.target.style.borderColor = C.borderFaint)}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(139,46,46,0.15)",
                border: "1px solid rgba(139,46,46,0.4)",
                color: "#E88B8B",
                fontFamily: body,
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            style={{
              padding: "0.875rem",
              background: loginMutation.isPending ? "rgba(200,146,42,0.5)" : C.amber,
              color: C.navy,
              border: "none",
              fontFamily: body,
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: loginMutation.isPending ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loginMutation.isPending ? "Authenticating…" : "Access Dashboard"}
          </button>
        </form>

        <p
          style={{
            fontFamily: body,
            fontSize: "0.75rem",
            color: "rgba(245,240,232,0.3)",
            textAlign: "center",
            marginTop: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          This dashboard is restricted to authorized Beacon cohort leads.
          <br />
          Contact{" "}
          <a href="mailto:info@beaconmomentum.com" style={{ color: C.muted, textDecoration: "underline" }}>
            info@beaconmomentum.com
          </a>{" "}
          for access.
        </p>
      </div>
    </div>
  );
}

// ─── Intake answers modal ──────────────────────────────────────────────────────
interface Member {
  id: number;
  email: string;
  firstName?: string | null;
  tier: string;
  track: string;
  intakeAnswers: unknown;
  cohortLeadEmail?: string | null;
  cohortGroup?: string | null;
  leadNotes?: string | null;
  createdAt: Date;
}

function IntakeModal({ member, onClose, onSaveNotes, onAssigned }: {
  member: Member;
  onClose: () => void;
  onSaveNotes: (notes: string) => void;
  onAssigned: (memberId: number, leadEmail: string | null, group: string | null) => void;
}) {
  const [notes, setNotes] = useState(member.leadNotes || "");
  const [saving, setSaving] = useState(false);
  const [assignEmail, setAssignEmail] = useState(member.cohortLeadEmail || "");
  const [assignGroup, setAssignGroup] = useState(member.cohortGroup || "");
  const [assigning, setAssigning] = useState(false);

  const assignMutation = trpc.cohort.assignMember.useMutation({
    onSuccess: () => {
      onAssigned(
        member.id,
        assignEmail.trim() || null,
        assignGroup.trim() || null
      );
      toast.success("Member assignment saved");
      setAssigning(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save assignment");
      setAssigning(false);
    },
  });

  const saveNotesMutation = trpc.cohort.saveNotes.useMutation({
    onSuccess: () => {
      onSaveNotes(notes);
      toast.success("Notes saved");
      setSaving(false);
    },
    onError: () => {
      toast.error("Failed to save notes");
      setSaving(false);
    },
  });

  const answers = (member.intakeAnswers as Record<string, string>) || {};
  const trackInfo = TRACK_LABELS[member.track] || { label: member.track, icon: "◇", color: C.amber };
  const tierInfo = TIER_LABELS[member.tier] || { label: member.tier, color: C.muted };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,22,40,0.92)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        overflowY: "auto",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: C.navyCard,
          border: `1px solid ${C.border}`,
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "1.75rem 2rem",
            borderBottom: `1px solid ${C.borderFaint}`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "1.25rem", color: trackInfo.color }}>{trackInfo.icon}</span>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: "1.375rem",
                  fontWeight: 600,
                  color: C.cream,
                  letterSpacing: "-0.02em",
                }}
              >
                {member.firstName ? `${member.firstName}` : "Member"} — Intake Answers
              </h2>
            </div>
            <p style={{ fontFamily: body, fontSize: "0.8rem", color: C.muted }}>
              {member.email} · Joined {new Date(member.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              fontSize: "1.25rem",
              cursor: "pointer",
              padding: "0.25rem",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Tier + Track badges */}
        <div
          style={{
            padding: "1rem 2rem",
            borderBottom: `1px solid ${C.borderFaint}`,
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "0.3rem 0.75rem",
              background: `${tierInfo.color}22`,
              border: `1px solid ${tierInfo.color}55`,
              color: tierInfo.color,
              fontFamily: body,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {tierInfo.label}
          </span>
          <span
            style={{
              padding: "0.3rem 0.75rem",
              background: `${trackInfo.color}22`,
              border: `1px solid ${trackInfo.color}55`,
              color: trackInfo.color,
              fontFamily: body,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {trackInfo.icon} {trackInfo.label} Track
          </span>
          {member.cohortGroup && (
            <span
              style={{
                padding: "0.3rem 0.75rem",
                background: "rgba(245,240,232,0.05)",
                border: `1px solid ${C.borderFaint}`,
                color: C.muted,
                fontFamily: body,
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
              }}
            >
              Group: {member.cohortGroup}
            </span>
          )}
        </div>

        {/* Intake Q&A */}
        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3
            style={{
              fontFamily: body,
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              marginBottom: "0.25rem",
            }}
          >
            Intake Responses
          </h3>
          {Object.entries(QUESTION_LABELS).map(([key, label]) => {
            const value = answers[key];
            if (!value) return null;
            return (
              <div key={key} style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: "1rem" }}>
                <div
                  style={{
                    fontFamily: body,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: C.amber,
                    marginBottom: "0.35rem",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: body,
                    fontSize: "0.9rem",
                    color: C.cream,
                    lineHeight: 1.65,
                  }}
                >
                  {value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead notes */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderTop: `1px solid ${C.borderFaint}`,
          }}
        >
          <label
            style={{
              display: "block",
              fontFamily: body,
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              marginBottom: "0.75rem",
            }}
          >
            Lead Notes (private)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add private notes about this member's progress, needs, or follow-up actions…"
            rows={4}
            style={{
              width: "100%",
              padding: "0.875rem 1rem",
              background: C.navyLight,
              border: `1px solid ${C.borderFaint}`,
              color: C.cream,
              fontFamily: body,
              fontSize: "0.875rem",
              lineHeight: 1.6,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = C.amber)}
            onBlur={(e) => (e.target.style.borderColor = C.borderFaint)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem", gap: "0.75rem" }}>
            <button
              onClick={onClose}
              style={{
                padding: "0.625rem 1.25rem",
                background: "transparent",
                border: `1px solid ${C.borderFaint}`,
                color: C.muted,
                fontFamily: body,
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                setSaving(true);
                saveNotesMutation.mutate({ memberId: member.id, notes });
              }}
              disabled={saving}
              style={{
                padding: "0.625rem 1.5rem",
                background: saving ? "rgba(200,146,42,0.5)" : C.amber,
                border: "none",
                color: C.navy,
                fontFamily: body,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving…" : "Save Notes"}
            </button>
          </div>
        </div>

        {/* Assignment section */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderTop: `1px solid ${C.borderFaint}`,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h4
            style={{
              fontFamily: body,
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.35)",
              marginBottom: "1rem",
            }}
          >
            Cohort Assignment
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: body,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: C.amber,
                  marginBottom: "0.4rem",
                }}
              >
                Cohort Lead Email
              </label>
              <input
                type="email"
                value={assignEmail}
                onChange={(e) => setAssignEmail(e.target.value)}
                placeholder="lead@beaconmomentum.com"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  background: C.navyLight,
                  border: `1px solid ${C.borderFaint}`,
                  color: C.cream,
                  fontFamily: body,
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.amber)}
                onBlur={(e) => (e.target.style.borderColor = C.borderFaint)}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: body,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: C.amber,
                  marginBottom: "0.4rem",
                }}
              >
                Cohort Group
              </label>
              <input
                type="text"
                value={assignGroup}
                onChange={(e) => setAssignGroup(e.target.value)}
                placeholder="e.g. Watch-A, Cohort-3"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  background: C.navyLight,
                  border: `1px solid ${C.borderFaint}`,
                  color: C.cream,
                  fontFamily: body,
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = C.amber)}
                onBlur={(e) => (e.target.style.borderColor = C.borderFaint)}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                setAssigning(true);
                assignMutation.mutate({
                  memberId: member.id,
                  cohortLeadEmail: assignEmail.trim() || null,
                  cohortGroup: assignGroup.trim() || null,
                });
              }}
              disabled={assigning}
              style={{
                padding: "0.625rem 1.5rem",
                background: assigning ? "rgba(46,125,107,0.4)" : C.green,
                border: "none",
                color: "#FAF8F4",
                fontFamily: body,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: assigning ? "not-allowed" : "pointer",
              }}
            >
              {assigning ? "Saving…" : "Save Assignment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Member row ────────────────────────────────────────────────────────────────
function MemberRow({ member, onViewIntake }: { member: Member; onViewIntake: () => void }) {
  const trackInfo = TRACK_LABELS[member.track] || { label: member.track, icon: "◇", color: C.amber };
  const tierInfo = TIER_LABELS[member.tier] || { label: member.tier, color: C.muted };
  const answers = (member.intakeAnswers as Record<string, string>) || {};

  return (
    <div
      style={{
        padding: "1.25rem 1.5rem",
        borderBottom: `1px solid ${C.borderFaint}`,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "1rem",
        alignItems: "start",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(245,240,232,0.03)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
    >
      <div>
        {/* Name + email */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: body,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: C.cream,
            }}
          >
            {member.firstName || "—"}
          </span>
          <span style={{ fontFamily: body, fontSize: "0.8rem", color: C.muted }}>
            {member.email}
          </span>
        </div>

        {/* Badges row */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.625rem" }}>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              background: `${tierInfo.color}22`,
              border: `1px solid ${tierInfo.color}44`,
              color: tierInfo.color,
              fontFamily: body,
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {tierInfo.label}
          </span>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              background: `${trackInfo.color}22`,
              border: `1px solid ${trackInfo.color}44`,
              color: trackInfo.color,
              fontFamily: body,
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {trackInfo.icon} {trackInfo.label}
          </span>
          {member.cohortGroup && (
            <span
              style={{
                padding: "0.2rem 0.6rem",
                background: "rgba(245,240,232,0.04)",
                border: `1px solid ${C.borderFaint}`,
                color: C.muted,
                fontFamily: body,
                fontSize: "0.7rem",
                letterSpacing: "0.04em",
              }}
            >
              {member.cohortGroup}
            </span>
          )}
        </div>

        {/* Obstacle preview */}
        {answers.biggest_obstacle && (
          <p
            style={{
              fontFamily: body,
              fontSize: "0.8rem",
              color: "rgba(245,240,232,0.45)",
              lineHeight: 1.5,
              fontStyle: "italic",
              maxWidth: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            "{answers.biggest_obstacle}"
          </p>
        )}

        {/* Lead notes indicator */}
        {member.leadNotes && (
          <div
            style={{
              marginTop: "0.4rem",
              fontFamily: body,
              fontSize: "0.75rem",
              color: C.amber,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span>◈</span>
            <span>Has notes</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
        <span style={{ fontFamily: body, fontSize: "0.7rem", color: "rgba(245,240,232,0.3)" }}>
          {new Date(member.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={onViewIntake}
          style={{
            padding: "0.5rem 1rem",
            background: "transparent",
            border: `1px solid ${C.border}`,
            color: C.amber,
            fontFamily: body,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(200,146,42,0.1)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          View Intake →
        </button>
      </div>
    </div>
  );
}

// ─── Main dashboard ────────────────────────────────────────────────────────────
function Dashboard({ leadEmail, onLogout }: { leadEmail: string; onLogout: () => void }) {
  const [filterTrack, setFilterTrack] = useState("");
  const [filterTier, setFilterTier] = useState("");
  const [myOnly, setMyOnly] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const { data, isLoading, refetch } = trpc.cohort.members.useQuery(
    { myMembersOnly: myOnly, track: filterTrack || undefined, tier: filterTier || undefined },
    { retry: false }
  );

  const logoutMutation = trpc.cohort.logout.useMutation({
    onSuccess: () => onLogout(),
  });

  useEffect(() => {
    if (data) setMembers(data as Member[]);
  }, [data]);

  const handleNotesSaved = useCallback((memberId: number, notes: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, leadNotes: notes } : m))
    );
    setSelectedMember((prev) => (prev?.id === memberId ? { ...prev, leadNotes: notes } : prev));
  }, []);

  const handleAssigned = useCallback(
    (memberId: number, leadEmail: string | null, group: string | null) => {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId ? { ...m, cohortLeadEmail: leadEmail, cohortGroup: group } : m
        )
      );
      setSelectedMember((prev) =>
        prev?.id === memberId
          ? { ...prev, cohortLeadEmail: leadEmail, cohortGroup: group }
          : prev
      );
    },
    []
  );

  // Stats
  const totalMembers = members.length;
  const trackCounts = members.reduce<Record<string, number>>((acc, m) => {
    acc[m.track] = (acc[m.track] || 0) + 1;
    return acc;
  }, {});
  const tierCounts = members.reduce<Record<string, number>>((acc, m) => {
    acc[m.tier] = (acc[m.tier] || 0) + 1;
    return acc;
  }, {});

  const selectStyle = {
    padding: "0.5rem 0.875rem",
    background: C.navyLight,
    border: `1px solid ${C.borderFaint}`,
    color: C.cream,
    fontFamily: body,
    fontSize: "0.8rem",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.navy, color: C.cream }}>
      {/* Header */}
      <header
        style={{
          background: C.navyMid,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <span style={{ fontSize: "1.1rem", color: C.amber }}>◈</span>
          <div>
            <span
              style={{
                fontFamily: serif,
                fontSize: "1.1rem",
                fontWeight: 600,
                color: C.cream,
                letterSpacing: "-0.01em",
              }}
            >
              The Watch
            </span>
            <span
              style={{
                fontFamily: body,
                fontSize: "0.75rem",
                color: C.muted,
                marginLeft: "0.75rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Cohort Lead Dashboard
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <span style={{ fontFamily: body, fontSize: "0.8rem", color: C.muted }}>
            {leadEmail}
          </span>
          <button
            onClick={() => logoutMutation.mutate()}
            style={{
              padding: "0.4rem 1rem",
              background: "transparent",
              border: `1px solid ${C.borderFaint}`,
              color: C.muted,
              fontFamily: body,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Total */}
          <div
            style={{
              background: C.navyCard,
              border: `1px solid ${C.borderFaint}`,
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ fontFamily: body, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: "0.5rem" }}>
              Total Members
            </div>
            <div style={{ fontFamily: serif, fontSize: "2rem", fontWeight: 600, color: C.cream }}>
              {totalMembers}
            </div>
          </div>

          {/* Track breakdown */}
          {Object.entries(TRACK_LABELS).map(([key, info]) => (
            <div
              key={key}
              style={{
                background: C.navyCard,
                border: `1px solid ${info.color}33`,
                padding: "1.25rem 1.5rem",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
              onClick={() => setFilterTrack(filterTrack === key ? "" : key)}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = info.color)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = `${info.color}33`)}
            >
              <div style={{ fontFamily: body, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: info.color, marginBottom: "0.5rem" }}>
                {info.icon} {info.label}
              </div>
              <div style={{ fontFamily: serif, fontSize: "2rem", fontWeight: 600, color: C.cream }}>
                {trackCounts[key] || 0}
              </div>
            </div>
          ))}
        </div>

        {/* Tier breakdown */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {Object.entries(TIER_LABELS).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setFilterTier(filterTier === key ? "" : key)}
              style={{
                padding: "0.4rem 1rem",
                background: filterTier === key ? `${info.color}22` : "transparent",
                border: `1px solid ${filterTier === key ? info.color : C.borderFaint}`,
                color: filterTier === key ? info.color : C.muted,
                fontFamily: body,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {info.label}: {tierCounts[key] || 0}
            </button>
          ))}
        </div>

        {/* Filters + controls */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "1.5rem",
            padding: "1rem 1.5rem",
            background: C.navyCard,
            border: `1px solid ${C.borderFaint}`,
          }}
        >
          <span style={{ fontFamily: body, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}>
            Filter:
          </span>

          <select
            value={filterTrack}
            onChange={(e) => setFilterTrack(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Tracks</option>
            {Object.entries(TRACK_LABELS).map(([key, info]) => (
              <option key={key} value={key}>{info.icon} {info.label}</option>
            ))}
          </select>

          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Tiers</option>
            {Object.entries(TIER_LABELS).map(([key, info]) => (
              <option key={key} value={key}>{info.label}</option>
            ))}
          </select>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: body,
              fontSize: "0.8rem",
              color: C.muted,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={myOnly}
              onChange={(e) => setMyOnly(e.target.checked)}
              style={{ accentColor: C.amber }}
            />
            My members only
          </label>

          {(filterTrack || filterTier || myOnly) && (
            <button
              onClick={() => { setFilterTrack(""); setFilterTier(""); setMyOnly(false); }}
              style={{
                padding: "0.4rem 0.875rem",
                background: "transparent",
                border: `1px solid ${C.borderFaint}`,
                color: C.muted,
                fontFamily: body,
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Clear filters
            </button>
          )}

          <button
            onClick={() => refetch()}
            style={{
              marginLeft: "auto",
              padding: "0.4rem 0.875rem",
              background: "transparent",
              border: `1px solid ${C.border}`,
              color: C.amber,
              fontFamily: body,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            ↺ Refresh
          </button>
        </div>

        {/* Members list */}
        <div
          style={{
            background: C.navyCard,
            border: `1px solid ${C.borderFaint}`,
          }}
        >
          {/* List header */}
          <div
            style={{
              padding: "0.875rem 1.5rem",
              borderBottom: `1px solid ${C.borderFaint}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: body,
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.35)",
              }}
            >
              Members ({members.length})
            </span>
            <span style={{ fontFamily: body, fontSize: "0.7rem", color: "rgba(245,240,232,0.25)" }}>
              Sorted by most recent
            </span>
          </div>

          {isLoading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: C.muted, fontFamily: body, fontSize: "0.9rem" }}>
              Loading members…
            </div>
          ) : members.length === 0 ? (
            <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem", color: C.muted }}>◈</div>
              <p style={{ fontFamily: body, fontSize: "0.9rem", color: C.muted, lineHeight: 1.6 }}>
                {myOnly ? "No members assigned to you yet." : "No members found matching the current filters."}
              </p>
              <p style={{ fontFamily: body, fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", marginTop: "0.5rem" }}>
                Members appear here after completing the intake form at /the-watch/intake
              </p>
            </div>
          ) : (
            members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onViewIntake={() => setSelectedMember(member)}
              />
            ))
          )}
        </div>
      </main>

      {/* Intake modal */}
      {selectedMember && (
        <IntakeModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onSaveNotes={(notes) => handleNotesSaved(selectedMember.id, notes)}
          onAssigned={(memberId, leadEmail, group) => handleAssigned(memberId, leadEmail, group)}
        />
      )}
    </div>
  );
}

// ─── Root: auth gate ───────────────────────────────────────────────────────────
export default function CohortDashboardPage() {
  const [leadEmail, setLeadEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const { data: session, isLoading } = trpc.cohort.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        setLeadEmail(session.leadEmail);
      }
      setChecking(false);
    }
  }, [session, isLoading]);

  if (checking || isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: C.navy,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: body, fontSize: "0.875rem", color: C.muted, letterSpacing: "0.06em" }}>
          Loading…
        </div>
      </div>
    );
  }

  if (!leadEmail) {
    return <LoginScreen onLogin={(email) => setLeadEmail(email)} />;
  }

  return <Dashboard leadEmail={leadEmail} onLogout={() => setLeadEmail(null)} />;
}
