/**
 * Digital Grandpa Library — Coming Soon
 * Design: Deep Water Editorial / Quiet Authority
 * Warm, compass-and-lighthouse motif. Dark navy base with amber accents.
 * Book catalog with waitlist CTAs — flips to live storefront when prices are set.
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Clock, Star, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BOOKS = [
  {
    id: "discovering-true-north",
    title: "Discovering Your True North",
    subtitle: "What You Actually Want",
    pages: 60,
    description:
      "Most people spend decades chasing someone else's definition of success. This book is the compass that points back to you — your values, your direction, your life. Written for anyone who has ever achieved something and still felt empty.",
    pillar: "Beacon Life",
    status: "coming-soon",
    badge: "Most Complete",
    accent: "#c8a96e",
  },
  {
    id: "power-of-getting-started",
    title: "The Power of Getting Started",
    subtitle: "A Digital Grandpa's Guide to Rising Again",
    pages: 127,
    description:
      "For people paralyzed by overwhelm. How to take the first step when you can't see the whole staircase and everything feels impossible. Battle-tested strategies from someone who has rebuilt from nothing — more than once.",
    pillar: "Beacon Work",
    status: "coming-soon",
    badge: "Most Requested",
    accent: "#7eb8c9",
  },
  {
    id: "voices-of-inspiration",
    title: "Voices of Inspiration",
    subtitle: "Volume 1",
    pages: 156,
    description:
      "Twelve real stories from real people who rebuilt their lives from nothing. Not inspiration porn — actual blueprints from people who have walked this road. Their voices carry the weight of lived experience, not theory.",
    pillar: "Beacon Life",
    status: "coming-soon",
    badge: "Fan Favorite",
    accent: "#8fbc8f",
  },
  {
    id: "a-life-that-matters",
    title: "A Life That Matters",
    subtitle: "Legacy, Purpose, and the Long Game",
    pages: null,
    description:
      "What does it mean to leave something behind that outlasts you? This book is for people in the second half of life who want their remaining years to count for something larger than themselves.",
    pillar: "Beacon Life",
    status: "coming-soon",
    badge: null,
    accent: "#c8a96e",
  },
  {
    id: "stop-calling-it-lazy",
    title: "Stop Calling It Lazy",
    subtitle: "The Truth About Rest, Recovery, and Rebuilding",
    pages: null,
    description:
      "The culture of relentless hustle has broken more people than it has built. This guide reframes rest as strategy — not weakness — and gives you permission to recover without guilt.",
    pillar: "Beacon Systems",
    status: "coming-soon",
    badge: null,
    accent: "#b8a0d4",
  },
  {
    id: "digital-grandpa-manifesto",
    title: "The Digital Grandpa Manifesto",
    subtitle: "Why Wisdom Matters More Than Ever",
    pages: null,
    description:
      "A short, sharp declaration of what this work is about. Why the world needs grandpas more than gurus. Why lived experience is the rarest currency in the information age. Free for everyone.",
    pillar: "Free",
    status: "free",
    badge: "Free",
    accent: "#c8a96e",
  },
];

const FREE_RESOURCES = [
  { title: "Foundation Guide", description: "Where to start when everything feels uncertain" },
  { title: "Phoenix Moments Workbook", description: "Turn your hardest moments into your clearest direction" },
  { title: "Strategic Rest Protocol", description: "The science and practice of intentional recovery" },
  { title: "Next Chapter Guide", description: "Mapping the life you actually want from here" },
  { title: "Little Things Guide", description: "Why small consistent actions outperform big dramatic ones" },
  { title: "Solopreneur Launchpad", description: "From idea to income without losing yourself in the process" },
];

export default function DigitalGrandpaLibraryPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID || "ve9EPM428h8vShlRW1KT";
      const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY || "";
      await fetch(`https://services.leadconnectorhq.com/contacts/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          email,
          tags: ["dg_library_waitlist"],
        }),
      });
    } catch (_) {
      // Silent — still show success
    }
    setSubmitting(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0d1b2a 0%, #1a2f45 60%, #0d1b2a 100%)" }}
    >
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
              <ArrowLeft size={16} />
              Beacon Momentum
            </a>
          </Link>
          <Link href="/digital-grandpa">
            <a className="text-amber-400/80 hover:text-amber-400 text-sm transition-colors">
              About Digital Grandpa
            </a>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
          style={{ background: "rgba(200,169,110,0.15)", color: "#c8a96e", border: "1px solid rgba(200,169,110,0.3)" }}
        >
          The Digital Grandpa Library
        </div>
        <h1
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
        >
          Wisdom you can hold
          <br />
          <span style={{ color: "#c8a96e" }}>in your hands.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
          Every book in this library was written from the inside of a hard season — not from a stage, not from a
          theory, but from the lived experience of someone who lost everything and rebuilt. Twice.
        </p>

        {/* Waitlist */}
        {!submitted ? (
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400/60"
              aria-label="Email address for library waitlist"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="whitespace-nowrap font-semibold"
              style={{ background: "#c8a96e", color: "#0d1b2a" }}
            >
              {submitting ? "Joining…" : "Notify Me at Launch"}
            </Button>
          </form>
        ) : (
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
            style={{ background: "rgba(143,188,143,0.15)", color: "#8fbc8f", border: "1px solid rgba(143,188,143,0.3)" }}
            role="status"
          >
            <Check size={16} />
            You're on the list. We'll reach out the moment the library opens.
          </div>
        )}
        <p className="text-white/30 text-xs mt-3">No spam. One email when the library opens. That's it.</p>
      </section>

      {/* Coming Soon Banner */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div
          className="rounded-2xl px-8 py-5 flex items-center gap-4"
          style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.2)" }}
        >
          <Clock size={20} style={{ color: "#c8a96e", flexShrink: 0 }} />
          <p className="text-white/70 text-sm leading-relaxed">
            <span style={{ color: "#c8a96e" }} className="font-semibold">
              Library opening soon.
            </span>{" "}
            All titles are being rewritten in the current Beacon voice — deeper, cleaner, and more actionable than
            their original editions. Join the waitlist to be first in the door.
          </p>
        </div>
      </div>

      {/* Book Catalog */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
        >
          The Collection
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BOOKS.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.2s",
              }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: book.accent }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} style={{ color: book.accent, flexShrink: 0 }} />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: book.accent }}>
                    {book.pillar}
                  </span>
                </div>
                {book.badge && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: book.status === "free" ? "rgba(143,188,143,0.15)" : "rgba(200,169,110,0.15)",
                      color: book.status === "free" ? "#8fbc8f" : "#c8a96e",
                      border: `1px solid ${book.status === "free" ? "rgba(143,188,143,0.3)" : "rgba(200,169,110,0.3)"}`,
                    }}
                  >
                    {book.badge}
                  </span>
                )}
              </div>

              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
                >
                  {book.title}
                </h3>
                <p className="text-sm" style={{ color: book.accent }}>
                  {book.subtitle}
                </p>
              </div>

              <p className="text-white/60 text-sm leading-relaxed flex-1">{book.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {book.pages && (
                  <span className="text-xs text-white/30">{book.pages} pages</span>
                )}
                {book.status === "free" ? (
                  <span className="text-xs font-semibold" style={{ color: "#8fbc8f" }}>
                    Free — Available at Launch
                  </span>
                ) : (
                  <span className="text-xs text-white/30 italic">Pricing announced at launch</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free Resources */}
      <section
        className="py-20"
        style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <Star size={18} style={{ color: "#c8a96e" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#c8a96e" }}>
              Free Resources
            </span>
          </div>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
          >
            Start here. Prove it to yourself.
          </h2>
          <p className="text-white/50 mb-10 max-w-xl">
            Six guides available at no cost. No email required. Just take what helps.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FREE_RESOURCES.map((r) => (
              <div
                key={r.title}
                className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="font-semibold text-white/90 mb-1 text-sm">{r.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{r.description}</p>
                <p className="text-xs mt-3 font-medium" style={{ color: "#8fbc8f" }}>
                  Available at launch
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Take the Assessment */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-white/40 text-sm mb-4">Not sure where to start?</p>
        <h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0e6d3" }}
        >
          The Pathfinder Assessment will tell you.
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          Five minutes. Five questions. One clear direction. The Assessment maps your answers to the book — and the
          Beacon pillar — that fits where you are right now.
        </p>
        <Link href="/assessment">
          <a>
            <Button
              className="font-semibold px-8 py-3 text-base"
              style={{ background: "#c8a96e", color: "#0d1b2a" }}
            >
              Take the Free Assessment
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </a>
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-white/10 py-8 px-6 text-center"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        <p className="text-white/30 text-xs">
          Digital Grandpa is part of the{" "}
          <Link href="/">
            <a className="hover:text-white/60 transition-colors underline underline-offset-2">
              Beacon Momentum
            </a>
          </Link>{" "}
          ecosystem. &copy; {new Date().getFullYear()} Beacon Momentum. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
