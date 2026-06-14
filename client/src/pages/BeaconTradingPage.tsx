/**
 * Beacon Trading Bridge Page — /beacon-trading
 * Design: Deep Water Editorial / Quiet Authority
 * Purpose: Full landing page for beacontrading.ai within the Beacon ecosystem.
 * Positioned as the financial sovereignty and market literacy track inside Beacon Venture.
 *
 * Pricing model (updated June 2026):
 * - Monthly subscription: $97/month — full access, real-time pricing support, weekly market newsletter
 * - Annual subscription: $797/year — ~$66/month, same full access benefits
 * - Scholarship Fund One-Time: $97 one-time, limited to 10,000 units — curriculum access,
 *   free updates, delayed pricing support for testing only (no real-time support, no newsletter)
 *
 * Legal positioning: Educational simulation platform. Not a brokerage, not financial advice.
 * Historical context: Beacon Trading evolved from the Financial Sovereignty curriculum
 * and the Rise & Reclaim four-stage path.
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  TrendingUp, BookOpen, Shield, Target, ArrowRight,
  BarChart2, Compass, Award, ChevronRight, Check, Heart, Clock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// Hero elements are above the fold — animate immediately on mount, not on scroll
const heroFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" as const },
  }),
};

const CURRICULUM = [
  {
    module: "Module 1",
    title: "Market Literacy Foundations",
    description:
      "Understand how markets actually work — price action, liquidity, macro forces, and the psychology of crowd behavior — before placing a single simulated trade.",
    icon: BookOpen,
    color: "#B8860B",
  },
  {
    module: "Module 2",
    title: "Risk Architecture",
    description:
      "Build a personal risk framework: position sizing, drawdown limits, and the discipline of protecting capital as the primary objective of every session.",
    icon: Shield,
    color: "#1A5C6B",
  },
  {
    module: "Module 3",
    title: "System Design & Backtesting",
    description:
      "Design a rules-based trading system, test it against historical data, and understand the difference between a strategy that works and one that merely worked once.",
    icon: BarChart2,
    color: "#2A7F6F",
  },
  {
    module: "Module 4",
    title: "Simulation Lab",
    description:
      "Execute your system in a live simulation environment. Track performance, identify behavioral patterns, and refine your approach before any real capital is at stake.",
    icon: Target,
    color: "#4A3728",
  },
  {
    module: "Module 5",
    title: "Financial Sovereignty Practicum",
    description:
      "Integrate market literacy with the broader Beacon Venture framework: income diversification, asset building, and the long-term architecture of economic independence.",
    icon: Compass,
    color: "#5C3A6B",
  },
];

const PRINCIPLES = [
  {
    title: "Education Before Capital",
    body: "No real money is ever required. Beacon Trading is a learning environment, not a brokerage. The goal is competence and confidence, not commissions.",
  },
  {
    title: "System Over Intuition",
    body: "Emotional trading destroys capital. We teach rule-based systems that remove guesswork and build the kind of discipline that survives market volatility.",
  },
  {
    title: "Sovereignty as the Outcome",
    body: "Financial literacy is not a hobby. It is a survival skill in the AI era. Beacon Trading exists to give people one more source of economic independence.",
  },
];

// Subscription plan features
const SUBSCRIPTION_FEATURES = [
  "Full five-module Financial Sovereignty curriculum",
  "Real-time pricing support and market analysis",
  "Weekly Beacon Market Newsletter",
  "Live simulation lab access",
  "System design and backtesting tools",
  "Community access — The Void (Discord)",
  "New content and strategy updates as released",
  "Cancel anytime",
];

const SCHOLARSHIP_FEATURES = [
  "Full five-module Financial Sovereignty curriculum",
  "Delayed pricing support for simulation testing",
  "Free curriculum updates for life",
  "Permanent access — no recurring charges",
  "Contributes directly to the Beacon Scholarship Fund",
];

const SCHOLARSHIP_NOT_INCLUDED = [
  "Real-time pricing support",
  "Weekly Market Newsletter",
  "Community access",
];

export default function BeaconTradingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-sm bg-[#1A5C6B] flex items-center justify-center">
              <span className="text-white" style={{fontSize:"0.9rem"}}>◈</span>
            </div>
            <span className="font-display text-[#2C2416] text-lg tracking-tight">Beacon Momentum</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/pillar/venture" className="text-sm text-[#6B5E4E] hover:text-[#1A5C6B] transition-colors tracking-wide uppercase font-ui">
              Beacon Venture
            </Link>
            <a
              href="https://beacontrading.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-[#B8860B] text-white px-5 py-2 hover:bg-[#9A7009] transition-colors tracking-wide uppercase font-ui"
            >
              Enter the Academy
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[#0D1F2D] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-8 rounded-sm bg-[#B8860B] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-ui">
              Beacon Venture · Financial Sovereignty Track
            </span>
          </motion.div>

          <motion.h1
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-5xl md:text-7xl text-white leading-[1.05] mb-6"
          >
            Beacon Trading
            <span className="block text-[#B8860B] italic mt-1">Academy</span>
          </motion.h1>

          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-xl text-[#A8B8C4] max-w-2xl mb-10 leading-relaxed"
          >
            Market literacy and financial sovereignty education for people who
            want one more source of economic independence in the AI era.
            No real capital required. No hype. No commissions.
          </motion.p>

          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://beacontrading.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B8860B] text-white px-8 py-4 text-sm tracking-widest uppercase font-ui hover:bg-[#9A7009] transition-all duration-200 active:scale-[0.97]"
            >
              Enter the Academy
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 border border-[#A8B8C4]/40 text-[#A8B8C4] px-8 py-4 text-sm tracking-widest uppercase font-ui hover:border-[#B8860B] hover:text-[#B8860B] transition-all duration-200"
            >
              View Pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 px-6 bg-[#F5F1EA]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-ui">Operating Principles</span>
            </div>
            <h2 className="font-display text-4xl text-[#2C2416]">
              What Beacon Trading is — and is not
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.15}
                className="bg-white p-8 border border-[#E8E4DC]"
              >
                <h3 className="font-display text-xl text-[#2C2416] mb-4">{p.title}</h3>
                <p className="text-[#6B5E4E] leading-relaxed text-sm">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-6 bg-[#FAF8F4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#1A5C6B]" />
              <span className="text-[#1A5C6B] text-xs tracking-[0.2em] uppercase font-ui">Curriculum Overview</span>
            </div>
            <h2 className="font-display text-4xl text-[#2C2416]">
              Five modules. One outcome: sovereignty.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {CURRICULUM.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.module}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="group flex gap-6 p-6 bg-white border border-[#E8E4DC] hover:border-[#B8860B]/40 transition-all duration-300"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs tracking-[0.15em] uppercase font-ui" style={{ color: item.color }}>
                        {item.module}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-[#2C2416] mb-2">{item.title}</h3>
                    <p className="text-[#6B5E4E] text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center">
                    <ChevronRight className="w-5 h-5 text-[#C4B8A8] group-hover:text-[#B8860B] transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#0D1F2D]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-ui">Enrollment</span>
              <div className="w-8 h-px bg-[#B8860B]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Choose your path into the Academy
            </h2>
            <p className="text-[#A8B8C4] max-w-xl mx-auto leading-relaxed">
              The subscription model is the full Beacon Trading experience.
              The Scholarship Option exists to make financial education accessible
              to those who need it most — and to fund the Beacon Scholarship Fund.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 text-sm tracking-wide uppercase font-ui transition-all duration-200 ${
                billingCycle === "monthly"
                  ? "bg-[#B8860B] text-white"
                  : "text-[#A8B8C4] border border-[#A8B8C4]/30 hover:border-[#B8860B]/50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 text-sm tracking-wide uppercase font-ui transition-all duration-200 relative ${
                billingCycle === "annual"
                  ? "bg-[#B8860B] text-white"
                  : "text-[#A8B8C4] border border-[#A8B8C4]/30 hover:border-[#B8860B]/50"
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-[#2A7F6F] text-white px-1.5 py-0.5 rounded-sm">
                Save 31%
              </span>
            </button>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">

            {/* Subscription Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              className="bg-[#1A2D3D] border-2 border-[#B8860B] p-8 relative"
            >
              <div className="absolute -top-3 left-8">
                <span className="bg-[#B8860B] text-white text-xs tracking-widest uppercase font-ui px-4 py-1">
                  Full Access
                </span>
              </div>

              <div className="mb-8 pt-2">
                <h3 className="font-display text-2xl text-white mb-1">Beacon Trading Subscription</h3>
                <p className="text-[#A8B8C4] text-sm leading-relaxed">
                  The complete Financial Sovereignty experience — real-time support, weekly newsletter, and full community access.
                </p>
              </div>

              <div className="mb-8">
                {billingCycle === "monthly" ? (
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="font-display text-5xl text-white">$97</span>
                      <span className="text-[#A8B8C4] text-sm mb-2 font-ui">/month</span>
                    </div>
                    <p className="text-[#7A8E9A] text-xs mt-1 font-ui">Cancel anytime. No contracts.</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-end gap-2">
                      <span className="font-display text-5xl text-white">$797</span>
                      <span className="text-[#A8B8C4] text-sm mb-2 font-ui">/year</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#2A7F6F] text-xs font-ui">~$66/month · Save $367 vs. monthly</span>
                    </div>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {SUBSCRIPTION_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#B8860B] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C8D8E4] text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://beacontrading.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#B8860B] text-white py-4 text-sm tracking-widest uppercase font-ui hover:bg-[#9A7009] transition-all duration-200 active:scale-[0.98]"
              >
                Start Subscription
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Scholarship Fund Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              className="bg-[#1A2D3D] border border-[#3A5060] p-8 relative"
            >
              <div className="absolute -top-3 left-8">
                <span className="bg-[#2A7F6F] text-white text-xs tracking-widest uppercase font-ui px-4 py-1 flex items-center gap-1.5">
                  <Heart className="w-3 h-3" />
                  Scholarship Fund
                </span>
              </div>

              <div className="mb-8 pt-2">
                <h3 className="font-display text-2xl text-white mb-1">Scholarship Access</h3>
                <p className="text-[#A8B8C4] text-sm leading-relaxed">
                  One-time purchase. Permanent curriculum access. Your purchase directly funds the Beacon Scholarship Fund for those who cannot afford the subscription.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="font-display text-5xl text-white">$97</span>
                  <span className="text-[#A8B8C4] text-sm mb-2 font-ui">one-time</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span className="text-[#B8860B] text-xs font-ui tracking-wide">Limited to 10,000 units</span>
                </div>
              </div>

              {/* Units remaining indicator */}
              <div className="mb-8 bg-[#0D1F2D] p-4 border border-[#2A3D4D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#7A8E9A] text-xs font-ui uppercase tracking-wide">Units Available</span>
                  <span className="text-white text-xs font-ui">10,000 total</span>
                </div>
                <div className="w-full bg-[#0D1F2D] border border-[#2A3D4D] h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2A7F6F] rounded-full" style={{ width: "100%" }} />
                </div>
                <p className="text-[#7A8E9A] text-xs mt-2 font-ui">
                  Once 10,000 units are sold, this option closes permanently.
                </p>
              </div>

              <ul className="space-y-3 mb-4">
                {SCHOLARSHIP_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#2A7F6F] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C8D8E4] text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <ul className="space-y-2 mb-8">
                {SCHOLARSHIP_NOT_INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#4A5E6E] text-xs flex items-center justify-center">✕</span>
                    <span className="text-[#4A5E6E] text-sm line-through leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://beacontrading.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-[#2A7F6F] text-[#2A7F6F] py-4 text-sm tracking-widest uppercase font-ui hover:bg-[#2A7F6F]/10 transition-all duration-200 active:scale-[0.98]"
              >
                <Heart className="w-4 h-4" />
                Claim Scholarship Access
              </a>
            </motion.div>
          </div>

          {/* Scholarship fund explainer */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
            className="bg-[#0D1F2D] border border-[#2A3D4D] p-8 text-center"
          >
            <Heart className="w-6 h-6 text-[#2A7F6F] mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white mb-3">The Beacon Scholarship Fund</h3>
            <p className="text-[#A8B8C4] max-w-2xl mx-auto leading-relaxed text-sm">
              Every Scholarship Access purchase contributes directly to the Beacon Scholarship Fund —
              a dedicated pool that provides full subscription access to individuals who cannot afford
              the monthly rate. Financial education should not be a luxury. The 10,000-unit limit
              ensures the fund remains meaningful and the offer remains exclusive. When the units
              are gone, this option closes permanently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mentor Card */}
      <section className="py-20 px-6 bg-[#F5F1EA]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-sm bg-[#B8860B]/20 border border-[#B8860B]/30 flex items-center justify-center">
                <Award className="w-10 h-10 text-[#B8860B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#B8860B]" />
                <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-ui">Your Mentor</span>
              </div>
              <h3 className="font-display text-3xl text-[#2C2416] mb-2">Dante Rivera</h3>
              <p className="text-[#B8860B] text-sm tracking-wide uppercase font-ui mb-6">
                Beacon Venture · Financial Sovereignty Lead
              </p>
              <p className="text-[#6B5E4E] leading-relaxed max-w-2xl mb-6">
                Dante Rivera built his financial literacy from zero after a decade of working-class
                employment left him with no savings, no safety net, and no map. He spent three years
                studying market structure, risk architecture, and behavioral finance before developing
                the Beacon Trading curriculum. His approach is direct, practical, and built entirely
                around one question: what does a person with no inherited wealth actually need to know
                to build financial sovereignty from scratch?
              </p>
              <p className="text-[#8A7E6E] text-sm italic">
                "The market does not care about your story. But your system can be built to survive it."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#B8860B]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Financial sovereignty starts with literacy.
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Enter the Beacon Trading Academy at beacontrading.ai and begin the
              Financial Sovereignty curriculum at your own pace. No capital required.
              No commissions. No shortcuts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://beacontrading.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#B8860B] px-10 py-4 text-sm tracking-widest uppercase font-ui hover:bg-[#FAF8F4] transition-all duration-200 active:scale-[0.97]"
              >
                Enter the Academy
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 text-sm tracking-widest uppercase font-ui hover:bg-white/10 transition-all duration-200"
              >
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer bridge */}
      <footer className="py-12 px-6 bg-[#2C2416] border-t border-[#3A3020]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#1A5C6B] flex items-center justify-center">
              <span className="text-white" style={{fontSize:"0.9rem"}}>◈</span>
            </div>
            <span className="font-display text-white text-lg tracking-tight">Beacon Momentum</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#8A7E6E]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pillar/venture" className="hover:text-white transition-colors">Beacon Venture</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <a href="https://beaconlabs.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Beacon Labs</a>
          </div>
          <p className="text-[#5A4E3E] text-xs font-ui">
            Beacon Trading is an educational simulation platform. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
