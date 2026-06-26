/**
 * Beacon Momentum — /blog
 * Design: Deep Water Editorial / Quiet Authority
 * Curated articles tied to the five Beacon pillars.
 * Pattern: editorial magazine layout with category filters.
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import { subscribeToBeaconBrief } from "@/lib/ghl";

// ─── Hero image ────────────────────────────────────────────────────────────────
const BLOG_HERO_IMG =
  "/images/beacon_hero.webp";

type Pillar = "All" | "Life" | "Work" | "Venture" | "Systems" | "Trading";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  pillar: Pillar;
  pillarColor: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: "ai-roi-reckoning",
    title: "Beacon Watch Brief: The AI ROI Reckoning",
    excerpt:
      "The enterprise AI narrative has collapsed. 95% of projects delivered zero measurable ROI. Here is what the data actually shows — and what it means for operators building real systems.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "Jun 2026",
    featured: true,
  },
  {
    id: "frontier-models-in-motion",
    title: "Beacon Watch Brief: Frontier Models in Motion",
    excerpt:
      "Claude Opus 5 is returning, Grok 5 is in training, and AI is deciphering a 5,000-year-old script. Here is what each development means for Beacon operators right now.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "8 min",
    date: "Jun 2026",
    featured: true,
  },
  {
    id: "follow-the-dollar-ai-ipo-wave",
    title: "Follow the Dollar: What the AI IPO Wave Is Really Telling You",
    excerpt:
      "Within a 60-day window this spring, SpaceX, OpenAI, and Anthropic moved toward public markets simultaneously — combined implied valuation: $4.5 trillion. The convergence is not coincidental. Private investors who entered at earlier valuations are seeking a liquidity event. The question worth asking is who the exit is for, and what it means for anyone building a business or managing a portfolio right now.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "11 min",
    date: "Jun 2026",
    featured: true,
  },
  {
    id: "ai-transition-not-replacement",
    title: "The AI Transition Is Not a Replacement Story — It Is a Redistribution Story",
    excerpt:
      "Every major technological shift in history has redistributed power, income, and relevance. The printing press did not eliminate writers. It eliminated scribes and created publishers. The question is not whether AI will change your work — it will. The question is whether you will be on the redistribution side or the displacement side.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Jun 2026",
    featured: true,
  },
  {
    id: "five-questions-before-starting-over",
    title: "Five Questions to Ask Before You Start Over",
    excerpt:
      "Most people who want to start over are not actually trying to escape their life. They are trying to escape the version of themselves that built it. Before you blow up what you have, ask these five questions — they will tell you whether you need a new life or just a new chapter.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "Jun 2026",
    featured: true,
  },
  {
    id: "solopreneur-vs-freelancer",
    title: "Solopreneur vs. Freelancer: The Difference That Changes Everything",
    excerpt:
      "A freelancer sells time. A solopreneur builds systems. Both can produce income. Only one can produce freedom. The distinction is not about what you do — it is about how you structure what you do. Here is the framework that separates the two.",
    pillar: "Venture",
    pillarColor: "#7C4F2A",
    readTime: "7 min",
    date: "May 2026",
  },
  {
    id: "ai-tools-that-actually-work",
    title: "The AI Tools That Actually Work (And the Ones That Just Look Like They Do)",
    excerpt:
      "After running dozens of AI audits for businesses across five industries, Beacon Labs has identified the tools that produce measurable results versus the ones that produce impressive demos. The gap is wider than most people expect.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "May 2026",
  },
  {
    id: "wisdom-over-information",
    title: "Why Wisdom Matters More Than Information in the Age of AI",
    excerpt:
      "Information is now free and infinite. Wisdom — the ability to know what to do with information — has never been more scarce or more valuable. The Digital Grandpa thesis is simple: the people who have lived through hard things have something AI cannot replicate.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "May 2026",
  },
  {
    id: "beacon-trading-entry-point",
    title: "Why Financial Literacy Is the Foundation of Every Other Kind of Freedom",
    excerpt:
      "You cannot make good decisions about your career, your business, or your life if you are financially illiterate. Not because money is everything — it is not. But because financial stress is the single most common reason people make decisions they later regret.",
    pillar: "Trading",
    pillarColor: "#B8860B",
    readTime: "6 min",
    date: "Apr 2026",
  },
  {
    id: "identity-after-job-loss",
    title: "Who Are You When the Job Title Is Gone?",
    excerpt:
      "For most people, their job title is their identity. When the title disappears — through layoff, retirement, or a deliberate exit — the identity crisis that follows is real and often underestimated. Here is how to navigate it without losing yourself.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "8 min",
    date: "Apr 2026",
  },
  {
    id: "automation-first-business",
    title: "Build the Automation First, Then Hire the Human",
    excerpt:
      "The old model: hire a person, then automate their repetitive tasks later. The new model: automate everything you can first, then hire a human for the judgment calls that automation cannot make. The businesses that get this right will operate at a fraction of the cost of those that do not.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "7 min",
    date: "Apr 2026",
  },
  {
    id: "resume-is-dead",
    title: "The Resume Is Not Dead — But the Way You Use It Is",
    excerpt:
      "The resume is not a history document. It is a marketing document. Most people treat it like the former and wonder why it does not work like the latter. Here is how to reframe every line of your resume for the AI-era job market.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Mar 2026",
  },
];

const PILLARS: Pillar[] = ["All", "Life", "Work", "Venture", "Systems", "Trading"];

const PILLAR_COLORS: Record<Pillar, string> = {
  All: "#1A5C6B",
  Life: "#2A7F6F",
  Work: "#1A5C6B",
  Venture: "#7C4F2A",
  Systems: "#3D5A80",
  Trading: "#B8860B",
};

// ─── Article Card ──────────────────────────────────────────────────────────────
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <Link href={`/blog/${article.id}`} style={{ textDecoration: "none", display: "block" }}>
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="group"
      style={{
        background: "var(--beacon-parchment)",
        border: "1px solid var(--beacon-parchment-dark)",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        transition: "border-color 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = article.pillarColor;
        e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.06)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--beacon-parchment-dark)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Pillar tag + meta */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
        <span style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: 500, fontSize: "0.7rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: article.pillarColor,
        }}>
          {`Beacon ${article.pillar}`}
        </span>
        <span style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontSize: "0.7rem", color: "var(--beacon-charcoal-mid)",
          opacity: 0.6,
        }}>
          {article.readTime} read · {article.date}
        </span>
      </div>

      {/* Pillar accent rule */}
      <div style={{ width: "2rem", height: "2px", background: article.pillarColor, opacity: 0.5 }} />

      {/* Title */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 600, fontSize: "1.2rem",
        lineHeight: 1.3, letterSpacing: "-0.01em",
        color: "var(--beacon-charcoal)",
        margin: 0,
      }}>
        {article.title}
      </h3>

      {/* Excerpt */}
      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: "0.875rem", lineHeight: 1.7,
        color: "var(--beacon-charcoal-mid)", margin: 0, flex: 1,
      }}>
        {article.excerpt}
      </p>

      {/* Read more */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.375rem",
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: "0.75rem", fontWeight: 500,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: article.pillarColor,
        transition: "gap 0.18s",
      }}>
        Read article <ArrowRight size={13} />
      </div>
    </motion.article>
    </Link>
  );
}

// ─── Featured Article ──────────────────────────────────────────────────────────
function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.id}`} style={{ textDecoration: "none", display: "block" }}>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: "var(--beacon-parchment)",
        border: "1px solid var(--beacon-parchment-dark)",
        borderLeft: `4px solid ${article.pillarColor}`,
        padding: "2.5rem",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1rem",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.07)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: 500, fontSize: "0.7rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: article.pillarColor,
        }}>
          {`Beacon ${article.pillar}`}
        </span>
        <span style={{ width: "1px", height: "12px", background: "var(--beacon-parchment-dark)" }} />
        <span style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontSize: "0.7rem", color: "var(--beacon-charcoal-mid)", opacity: 0.6,
        }}>
          {article.readTime} read · {article.date}
        </span>
        <span style={{
          fontFamily: "'Outfit', system-ui, sans-serif",
          fontWeight: 500, fontSize: "0.65rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#FAF8F4", background: article.pillarColor,
          padding: "0.2rem 0.6rem",
        }}>
          Featured
        </span>
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 600, fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
        lineHeight: 1.25, letterSpacing: "-0.02em",
        color: "var(--beacon-charcoal)", margin: 0,
      }}>
        {article.title}
      </h2>
      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: "0.95rem", lineHeight: 1.75,
        color: "var(--beacon-charcoal-mid)", margin: 0,
        maxWidth: "680px",
      }}>
        {article.excerpt}
      </p>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "0.375rem",
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: "0.75rem", fontWeight: 500,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: article.pillarColor,
      }}>
        Read article <ArrowRight size={13} />
      </div>
    </motion.article>
    </Link>
  );
}

// ─── Beacon Brief Strip ────────────────────────────────────────────────────────
function BeaconBriefStrip() {
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
      // Silent fail
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section style={{ background: "var(--beacon-charcoal)", padding: "5rem 0" }}>
      <div className="container">
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber-light)", display: "inline-block" }} />
            <Mail size={14} color="var(--beacon-amber-light)" />
            <span style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontWeight: 400, fontSize: "0.75rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--beacon-amber-light)",
            }}>
              The Beacon Brief
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            lineHeight: 1.2, letterSpacing: "-0.02em",
            color: "#FAF8F4", marginBottom: "0.875rem",
          }}>
            One weekly signal. No noise.
          </h3>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "0.9rem", lineHeight: 1.8,
            color: "rgba(250,248,244,0.6)", marginBottom: "2rem",
          }}>
            The Beacon Brief summarizes the week's most important AI transition developments, Beacon Labs experiments, and practical actions — in five minutes or less. Every article on this page started as a Brief.
          </p>
          {submitted ? (
            <div style={{
              padding: "1rem 1.5rem",
              background: "rgba(46,125,107,0.15)",
              border: "1px solid rgba(46,125,107,0.3)",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "0.875rem",
              color: "var(--beacon-teal-light)",
              display: "inline-block",
            }}>
              You are on the list. The first Brief arrives this week.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 0, maxWidth: "440px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: "0.875rem 1.25rem",
                  border: "1.5px solid rgba(250,248,244,0.12)",
                  borderRight: "none",
                  background: "rgba(250,248,244,0.05)",
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.875rem",
                  color: "#FAF8F4",
                  outline: "none",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--beacon-teal)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(250,248,244,0.12)"; }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "0.875rem 1.5rem",
                  background: "var(--beacon-teal)",
                  color: "#FAF8F4",
                  border: "none",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontWeight: 500, fontSize: "0.8rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "background 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--beacon-teal-light, #2E7D6B)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--beacon-teal)"; }}
              >
                {loading ? "Joining…" : "Join the Brief"}
              </button>
            </form>
          )}
          <p style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontSize: "0.7rem", color: "rgba(250,248,244,0.3)",
            marginTop: "0.75rem", letterSpacing: "0.04em",
          }}>
            No spam. Unsubscribe anytime. One email per week.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Pillar>("All");

  const featured = ARTICLES.filter((a) => a.featured);
  const filtered =
    activeFilter === "All"
      ? ARTICLES.filter((a) => !a.featured)
      : ARTICLES.filter((a) => a.pillar === activeFilter && !a.featured);

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />

      <main id="main-content">
        {/* ── Hero band ── */}
        <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
          {/* Background image */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${BLOG_HERO_IMG})`,
            backgroundSize: "cover", backgroundPosition: "center 25%",
          }} />
          {/* Dark overlay — heavier at bottom for text legibility */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(28,28,30,0.45) 0%, rgba(28,28,30,0.72) 60%, rgba(28,28,30,0.92) 100%)",
          }} />

          {/* Content */}
          <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "4rem", paddingTop: "8rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
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
                Beacon Momentum — The Signal
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                lineHeight: 1.1, letterSpacing: "-0.03em",
                color: "#FAF8F4", marginBottom: "1rem",
              }}>
                Ideas worth acting on.
              </h1>

              {/* Sub-headline */}
              <p style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                lineHeight: 1.75, color: "rgba(250,248,244,0.72)",
                maxWidth: "560px",
              }}>
                Practical thinking on AI transitions, career reinvention, solopreneurship, financial literacy, and the wisdom that only comes from having lived through hard things.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Featured articles ── */}
        {activeFilter === "All" && featured.length > 0 && (
          <section style={{ padding: "3.5rem 0", borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
            <div className="container">
              <div style={{
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontWeight: 400, fontSize: "0.7rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--beacon-charcoal-mid)", opacity: 0.6,
                marginBottom: "1.5rem",
                display: "flex", alignItems: "center", gap: "0.75rem",
              }}>
                <span style={{ width: "1.5rem", height: "1px", background: "currentColor", display: "inline-block" }} />
                Featured this week
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))", gap: "1.5rem" }}>
                {featured.map((a) => (
                  <FeaturedArticle key={a.id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Filter bar ── */}
        <section style={{
          padding: "0",
          borderBottom: "1px solid var(--beacon-parchment-dark)",
          background: "var(--beacon-cream, #F5F0E8)",
          position: "sticky", top: "64px", zIndex: 10,
        }}>
          <div className="container">
            <div style={{ display: "flex", gap: "0", overflowX: "auto" }}>
              {PILLARS.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveFilter(p)}
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "'Outfit', system-ui, sans-serif",
                    fontWeight: 400, fontSize: "0.78rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    background: "none", border: "none",
                    borderBottom: activeFilter === p
                      ? `2px solid ${PILLAR_COLORS[p]}`
                      : "2px solid transparent",
                    color: activeFilter === p
                      ? PILLAR_COLORS[p]
                      : "var(--beacon-charcoal-mid)",
                    cursor: "pointer",
                    transition: "color 0.18s, border-color 0.18s",
                    whiteSpace: "nowrap",
                    opacity: activeFilter === p ? 1 : 0.65,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Article grid ── */}
        <section style={{ padding: "3.5rem 0 6rem", background: "var(--beacon-parchment)" }}>
          <div className="container">
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400, fontStyle: "italic",
                  fontSize: "1.5rem", color: "var(--beacon-charcoal)",
                  marginBottom: "1rem",
                }}>
                  No articles in this category yet.
                </div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", color: "var(--beacon-charcoal-mid)" }}>
                  Check back soon — or{" "}
                  <Link href="/assessment" style={{ color: "var(--beacon-teal)", textDecoration: "underline" }}>
                    take the assessment
                  </Link>{" "}
                  to find your path.
                </p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
                gap: "1.5rem",
              }}>
                {filtered.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        <BeaconBriefStrip />
      </main>

      <SharedFooter />
    </div>
  );
}
