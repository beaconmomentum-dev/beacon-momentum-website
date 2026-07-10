/**
 * Beacon Momentum — /blog (The Signal)
 * Design: Deep Water Editorial / Quiet Authority
 * Curated articles tied to the five Beacon pillars.
 * Pattern: editorial magazine layout with category filters.
 */

import React, { useState } from "react";
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
  thumbnail?: string; // Optional card thumbnail for The Signal index
}

const ARTICLES: Article[] = [
  {
    id: "frontier-models-in-motion",
    title: "Frontier Models in Motion: The Export Ban, Multi-Agent Teams, and the Race After AI",
    excerpt:
      "A government ban strands businesses overnight. Four days later, Tokyo ships the answer. Meanwhile, Google quietly funds the race that comes after AI entirely. Here is what it all means for operators right now.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "10 min",
    date: "Jun 29, 2026",
    thumbnail: "/images/hero-frontier-models.jpg",
  },
  {
    id: "cycle-of-leverage",
    title: "The Signal: The Cycle of Leverage",
    excerpt:
      "What seems new is rarely new. The Sumerians, Kissinger, China's desert, and the AI models the US tried to lock away all tell the same story: every capability leap is followed immediately by an attempt to capture it. The genie is out. The question is whether you will have a voice in what it builds.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "8 min",
    date: "Jun 30, 2026",
    thumbnail: "/images/hero-cycle-of-leverage.jpg",
  },
  {
    id: "consolidation-of-power",
    title: "The Signal: The Consolidation of Power",
    excerpt:
      "The US government is now personally approving who gets access to frontier AI models. Apple is lobbying to buy chips from a Pentagon-blacklisted Chinese supplier. SpaceX just filed to go public with a plan to put AI data centers in orbit. These are not separate stories. The infrastructure of AI is being consolidated — and the gap between those who own the stack and those who rent it is widening.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "7 min",
    date: "Jun 30, 2026",
    thumbnail: "/images/signal-consolidation-power.jpg",
  },
  {
    id: "palantir-ai-surveillance-watch",
    title: "The Architecture of Control: Palantir, AI Surveillance, and What You Can Actually Do About It",
    excerpt:
      "A major lawsuit has been filed against Palantir Technologies alleging domestic surveillance, biometric harvesting, and cognitive trespass. We verified the claims, separated fact from alarm, and built a practical guide for protecting yourself from the systems that are already operating.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "12 min",
    date: "Jun 28, 2026",
    thumbnail: "/images/watch-palantir-hero.jpg",
  },
  {
    id: "the-intelligence-arbitrage",
    title: "The Intelligence Arbitrage: Who Wins When the Price of Thinking Collapses",
    excerpt:
      "The greatest arbitrage in economic history is closing. For the first time, you can manufacture intelligence out of electricity. Here is what that means for every person who was told the leverage was not for them.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "Jun 2026",
    thumbnail: "/images/hero-intelligence-arbitrage.jpg",
  },
  {
    id: "the-leverage-has-arrived",
    title: "The Leverage Has Arrived: The Old World Is Ending and the New One Does Not Require Permission",
    excerpt:
      "The old world built systems that required your compliance in exchange for a minimal existence. That world is ending. Here is what is actually happening — and why it matters more than any benchmark or funding round.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "10 min",
    date: "Jun 2026",
    thumbnail: "/images/hero-leverage-arrived.jpg",
  },
  {
    id: "ai-roi-reckoning",
    title: "The AI ROI Reckoning: 95% of Enterprise Projects Failed — Here Is What Actually Works",
    excerpt:
      "The enterprise AI narrative has collapsed. 95% of projects delivered zero measurable ROI. Here is what the data actually shows — and what it means for operators building real systems.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "Jun 2026",
    thumbnail: "/images/hero-ai-roi-reckoning.jpg",
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
    thumbnail: "/images/hero-follow-the-dollar.jpg",
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
    thumbnail: "/images/hero-ai-transition.jpg",
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
    thumbnail: "/images/hero-five-questions.jpg",
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
    thumbnail: "/images/hero-solopreneur-freelancer.jpg",
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
    thumbnail: "/images/hero-ai-tools.jpg",
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
    thumbnail: "/images/hero-wisdom-information.jpg",
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
    thumbnail: "/images/hero-financial-literacy.jpg",
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
    thumbnail: "/images/hero-identity-job-loss.jpg",
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
    thumbnail: "/images/hero-automation-first.jpg",
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
    thumbnail: "/images/hero-resume-reframe.jpg",
  },
  {
    id: "quiet-cost-of-staying-ready",
    title: "The Quiet Cost of Staying Ready",
    excerpt:
      "The hardest part of surviving chaos is learning how to turn off the alarm system when the fire is out. If you do not build rest into your architecture, your vigilance will become the thing that destroys you.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "7 min",
    date: "Jan 2026",
    thumbnail: "/images/hero-quiet-cost.jpg",
  },
  {
    id: "grief-and-reinvention",
    title: "What Grief and Reinvention Have in Common",
    excerpt:
      "Starting over is not a business strategy. It is a grieving process for the life you thought you were going to have. The people who understand this are the ones who actually survive the transition.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "8 min",
    date: "Feb 2026",
    thumbnail: "/images/hero-grief-reinvention.jpg",
  },
  {
    id: "meeting-that-should-have-been-a-system",
    title: "The Meeting That Should Have Been a System",
    excerpt:
      "Every recurring meeting on your calendar is a failure of system design. If you are having the same conversation every week, you are managing a symptom instead of curing the disease.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Jan 2026",
    thumbnail: "/images/hero-meeting-system.jpg",
  },
  {
    id: "pricing-in-a-repricing-market",
    title: "How to Price Yourself in a Market That Is Repricing Everything",
    excerpt:
      "The hourly rate is dead. When artificial intelligence can execute a task in seconds, charging for your time is a race to the bottom. Here is how to price the outcome instead of the effort.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "9 min",
    date: "Feb 2026",
    thumbnail: "/images/hero-pricing-market.jpg",
  },
  {
    id: "portfolio-career-is-the-strategy",
    title: "The Portfolio Career Is Not a Fallback — It Is the Strategy",
    excerpt:
      "Relying on a single employer for 100% of your income is the highest-risk strategy in the modern economy. The portfolio career is the only rational response to systemic instability.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "8 min",
    date: "Apr 2026",
    thumbnail: "/images/hero-portfolio-career.jpg",
  },
  {
    id: "zero-to-one-problem",
    title: "The $0 to $1 Problem: Why Most Solopreneurs Stall Before They Start",
    excerpt:
      "The gap between having an idea and making your first dollar is where 90% of ventures die. It is rarely a failure of the product; it is almost always a failure of courage masked as a need for more preparation.",
    pillar: "Venture",
    pillarColor: "#7C4F2A",
    readTime: "7 min",
    date: "Jan 2026",
    thumbnail: "/images/hero-zero-to-one.jpg",
  },
  {
    id: "build-the-offer-first",
    title: "Build the Offer Before You Build the Brand",
    excerpt:
      "A brand without an offer is just a very expensive art project. If you cannot articulate exactly what you are selling and who you are selling it to, no amount of marketing will save you.",
    pillar: "Venture",
    pillarColor: "#7C4F2A",
    readTime: "6 min",
    date: "Feb 2026",
    thumbnail: "/images/hero-offer-first.jpg",
  },
  {
    id: "recurring-revenue-mandate",
    title: "The Recurring Revenue Mandate",
    excerpt:
      "If you start every month at zero, you do not own a business; you own a high-stress job. The transition from project revenue to recurring revenue is the transition from survival to sovereignty.",
    pillar: "Venture",
    pillarColor: "#7C4F2A",
    readTime: "8 min",
    date: "Mar 2026",
    thumbnail: "/images/hero-recurring-revenue.jpg",
  },
  {
    id: "three-numbers-about-your-money",
    title: "The Three Numbers Every Person Should Know About Their Own Money",
    excerpt:
      "Financial literacy is not about picking stocks. It is about understanding the mechanics of your own survival. If you do not know your net worth, your burn rate, and your runway, you are flying blind in a storm.",
    pillar: "Trading",
    pillarColor: "#B8860B",
    readTime: "9 min",
    date: "Jan 2026",
    thumbnail: "/images/hero-three-numbers.jpg",
  },
  {
    id: "myth-of-the-safe-industry",
    title: "The Myth of the \"Safe\" Industry",
    excerpt:
      "There are no safe industries left. The AI transition is sector-agnostic. If your defense strategy is to hide in a legacy institution, you are waiting for the tide to wash you out.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "7 min",
    date: "Mar 2026",
    thumbnail: "/images/hero-safe-industry.jpg",
  },
  // ── Life in America Series ──────────────────────────────────────────────────
  {
    id: "lia-geopolitics-public-health",
    title: "Life in America: The Geopolitics of Public Health and Bio-Research",
    excerpt:
      "A major narrative claims the U.S. government secretly exported banned gain-of-function research to overseas biolabs. We verified the claims, separated documented policy from disinformation, and built a practical guide for understanding the intersection of global health and national security.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "10 min",
    date: "Feb 2026",
    thumbnail: "/images/hero-lia-biolabs.jpg",
  },
  {
    id: "lia-end-of-phillips-curve",
    title: "Life in America: The End of the Phillips Curve and the Reindustrialization Mandate",
    excerpt:
      "A significant shift in U.S. economic policy is underway. The new Federal Reserve leadership is abandoning long-held doctrines in favor of aggressive domestic reindustrialization. We verified the claims and built a practical guide for positioning your business in this new environment.",
    pillar: "Trading",
    pillarColor: "#B8860B",
    readTime: "9 min",
    date: "Mar 2026",
    thumbnail: "/images/hero-lia-fed-reindustrialization.jpg",
  },
  {
    id: "lia-architecture-of-manufactured-movements",
    title: "Life in America: The Architecture of Manufactured Political Movements",
    excerpt:
      "Recent political commentary has focused heavily on the mechanics of color revolutions, alleging that domestic movements are utilizing tactics historically funded by U.S. agencies abroad. We verified the claims and built a practical guide for maintaining cognitive independence during manufactured crises.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "9 min",
    date: "Apr 2026",
    thumbnail: "/images/hero-lia-color-revolutions.jpg",
  },
  {
    id: "lia-long-march-through-institutions",
    title: "Life in America: The Long March Through the Institutions",
    excerpt:
      "A recurring narrative links the Democratic Socialists of America to the theories of Italian Marxist Antonio Gramsci. We verified the claims, separated ideological history from conspiracy, and built a practical guide for understanding cultural leverage and building your own foundations.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "10 min",
    date: "May 2026",
    thumbnail: "/images/hero-lia-gramsci-institutions.jpg",
  },
  {
    id: "lia-architecture-of-historical-memory",
    title: "Life in America: The Architecture of Historical Memory",
    excerpt:
      "The management of presidential records has become a flashpoint for political conflict. We verified the claims around the Obama Presidential Center's structure and the National Archives, separated legal framework from political narrative, and built a practical guide for understanding how historical memory is controlled.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "8 min",
    date: "Jun 2026",
    thumbnail: "/images/hero-lia-presidential-records.jpg",
  },
  {
    id: "watch-open-source-ai-shift",
    title: "The Open-Source AI Shift",
    excerpt:
      "The US locked down its most capable AI models. Days later, China open-sourced comparable capability to the entire internet for free. The walls only contain the people already inside them.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-open-source-ai.jpg",
  },
  {
    id: "watch-engine-of-elon-premium",
    title: "The Engine of the Elon Premium",
    excerpt:
      "Elon Musk briefly became the first trillionaire in history. Twelve days later, the market corrected. The number is not the story. The story is the engine that built the number — and the asymmetry of accountability when it collapses.",
    pillar: "Venture",
    pillarColor: "#5C3D8F",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-elon-premium.jpg",
  },
  {
    id: "watch-org-chart-targeting-document",
    title: "Your Org Chart Is a Targeting Document",
    excerpt:
      "A Five Eyes joint advisory confirmed Chinese military intelligence is using LinkedIn, Indeed, and Upwork to recruit and coerce targets. Transparency is a requirement for building a brand. It is also a vulnerability.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-linkedin-security.jpg",
  },
  {
    id: "watch-readout-bottleneck",
    title: "The Readout Bottleneck",
    excerpt:
      "Stanford solved the quantum computing wall — not by adding more qubits, but by building a better dashboard. The bottleneck is rarely the tool itself. Almost always, it is your ability to read the output.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-quantum-readout.jpg",
  },
  {
    id: "watch-wall-is-real",
    title: "The Wall Is Real",
    excerpt:
      "The era of shipping your best model and seeing what happens ended June 12th. One lab hit the wall, negotiated its way back, and is now permanently inside a relationship with Washington it did not choose. Another is still running toward the same wall at full speed.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "8 min",
    date: "Jul 2026",
    featured: true,
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-05-ghost-particle",
    title: "The Ghost Particle: Microsoft\u2019s 1,000x Quantum Leap",
    excerpt:
      "For almost 90 years it existed only on paper. On June 2nd, 2026, Microsoft announced they had not only built the Majorana particle \u2014 they held it. For 20 seconds. That is a thousandfold improvement in the exact property that makes or breaks a quantum computer.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-06-maya-collapse",
    title: "The Maya Collapse: When Success Becomes the Trap",
    excerpt:
      "A thousand years ago, the Maya were one of the most advanced civilizations on Earth. Within a hundred years, the great cities were abandoned. The jungle walked in and took it all back. The cause is more unsettling than any myth \u2014 and more relevant than most people want to admit.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-07-voynich-manuscript",
    title: "The Voynich Manuscript: What AI Cannot Crack",
    excerpt:
      "Six hundred years ago, someone wrote a book. To this day, no other human being has ever read it. It has defeated the greatest codebreakers of the 20th century. And despite what the headlines claim, artificial intelligence has not cracked it either.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-08-claude-fable-5",
    title: "Claude Fable 5: The Reality Behind the Hype",
    excerpt:
      "If you just gained access to Claude Fable 5 and plan to use it exactly like the previous version, stop. The marketing is designed to generate noise. The reality requires a fundamental shift in how you operate it.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-09-ai-arms-race",
    title: "The AI Arms Race: Gemini, Google, and the Real Stakes",
    excerpt:
      "The tech press is misreading the current moment. The question is not which model wins the benchmark. The question is who uses these models to build something real. The scoreboard is a distraction. The door is open.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "the-exit-ramp",
    title: "The Exit Ramp: How to Stop Running to Stand Still",
    excerpt:
      "There is a feeling going around right now that is difficult to shake. The Chinese have a word for it: neijuan, or involution. The treadmill keeps speeding up. Here is how to find the exit.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "7 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-grok-china-ai-race",
    title: "Grok 4.5, China's AI Surge, and the New Economics of Intelligence",
    excerpt:
      "Grok 4.5 just undercut Claude Opus by 83%. Simultaneously, a Chinese lab released a 2.7 trillion parameter model. The economics of frontier AI are shifting faster than most realize. Here is what it means.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-ai-reasoning-faithfulness",
    title: "The Hidden Lie: AI Models Are Not Showing Their Real Work",
    excerpt:
      "New research reveals that AI reasoning models routinely hide their actual decision-making process. The chain-of-thought you see is not the chain-of-thought that produced the answer. This has significant implications.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-gemini-5",
    title: "Gemini 5: What Google Got Right and What the Benchmarks Miss",
    excerpt:
      "Google's Gemini 5 is a genuine leap. But the most important story is not the benchmark scores — it is the pricing structure and what it signals about where the AI market is heading.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-2d-materials",
    title: "Beyond Silicon: The 2D Material That Could Rewrite the Chip Wars",
    excerpt:
      "Molybdenum disulfide is a single-atom-thick semiconductor that outperforms silicon at nanoscale. Chinese researchers have cracked a key manufacturing barrier. The implications for the global chip race are significant.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-cream-5-pro",
    title: "Cream 5.0 Pro: ByteDance Enters the Image Generation War",
    excerpt:
      "ByteDance's Cream 5.0 Pro is producing images that rival Midjourney and DALL-E at a fraction of the cost. The competitive landscape for AI-generated visuals just shifted significantly.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "4 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-browser-privacy",
    title: "The Silent Surrender: Why Chrome and Edge Are Failing You",
    excerpt:
      "Chrome's Manifest V3 update has effectively killed the best ad blockers. Edge's telemetry pipeline is more aggressive than most users realize. Here is what changed, and what to do about it.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-windows-11-local-accounts",
    title: "The End of Local Computing: Windows 11 and the Cloud Trap",
    excerpt:
      "Microsoft's June 2026 update closed the last escape hatches for setting up Windows without a cloud account. 50,000 people signed a petition in 48 hours. A company VP called his own product's behavior something he hates.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "beacon-watch-throne-room-architecture",
    title: "The Architecture of the Watch: Lessons from the Throne Room",
    excerpt:
      "The ancient visions of the Merkabah — wheels within wheels, covered in eyes — are not mythology. They are the oldest recorded framework for what it means to observe a complex system from an elevated vantage point. This is The Watch.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "7 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-media-factory-runway-dev",
    title: "The Media Factory: How Runway Dev Just Handed Enterprise Teams a One-API Creative Department",
    excerpt: "Runway's new developer platform collapses the barrier to enterprise media production into a single API call — and the numbers behind it are staggering.",
    category: "Watch Brief",
    readTime: "5 min read",
    pillar: "technology",
    featured: false,
    audioFile: "/audio/watch-brief-media-factory-runway-dev.mp3",
  },
  {
    id: "watch-brief-coral-castle-leverage",
    title: "The Mystery That Wasn't: What Coral Castle Teaches Us About Hidden Leverage",
    excerpt:
      "For decades, the construction of Coral Castle was attributed to magic or alien technology. AI analysis confirms it was just extreme mechanical leverage. The lesson for modern business is profound.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-invisible-war-ideological-subversion",
    title: "The Invisible War: Ideological Subversion and the Battle for American Minds",
    excerpt:
      "Modern geopolitical conflict is not fought with kinetic force; it is fought in the human mind. The strategy of ideological subversion aims to erode trust and distort reality. Here is how to recognize it.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-ai-groundwork",
    title: "Why Your AI Isn't Working: The Groundwork Nobody Talks About",
    excerpt:
      "When you point a highly capable AI at a disorganized company, it does not clean the mess up. It simply runs the mess faster. The real moat in the AI era is the boring work of structural organization.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-ramageddon-memory-crisis",
    title: "Ramageddon: How the AI Build-Out Is Taxing Every Device You Own",
    excerpt:
      "The AI industry is legally buying the world's memory supply out from under the consumer market. RAM prices are up 480%, and the cost is being passed to you. Here is the architecture of the squeeze.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-end-of-code-gate",
    title: "The End of the Code Gate: When Anyone Can Build Anything",
    excerpt:
      "For 70 years, building software required learning the machine's language. That requirement just expired. Autonomous agents with root access are now building production-grade apps from plain English prompts.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "5 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
  },
  {
    id: "watch-brief-moon-launchpad-economy",
    title: "The Moon as Launchpad: SpaceX's Lunar Catapult and the Space Economy",
    excerpt:
      "SpaceX plans to build a magnetic railgun on the moon. It is not a stunt; it is a fundamental recalculation of the economics of space exploration. The goal is to control the cheapest mass in the solar system.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "6 min",
    date: "Jul 2026",
    thumbnail: "/images/hero-watch-wall-is-real.jpg",
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
      {/* Thumbnail image — shown only when present */}
      {article.thumbnail && (
        <div style={{
          width: "100%",
          height: "160px",
          overflow: "hidden",
          marginBottom: "-0.25rem",
          borderRadius: "2px",
        }}>
          <img
            src={article.thumbnail}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        </div>
      )}

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
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "0",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.07)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Editorial layout: text left / image right when thumbnail present; text-only otherwise */}
      <div style={{
        display: "grid",
        gridTemplateColumns: article.thumbnail ? "1fr 40%" : "1fr",
        gap: 0,
        minHeight: article.thumbnail ? "220px" : undefined,
      }}>
        {/* Content wrapper */}
        <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
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
        </div>{/* end content column */}

        {/* Thumbnail image — right column, only when present */}
        {article.thumbnail && (
          <div style={{
            overflow: "hidden",
            position: "relative",
            minHeight: "220px",
          }}>
            <img
              src={article.thumbnail}
              alt={article.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
            />
          </div>
        )}
      </div>{/* end editorial grid */}
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

  // Set page title
  React.useEffect(() => {
    document.title = "The Signal — Beacon Momentum";
    return () => { document.title = "Beacon Momentum — AI-Era Human Capability"; };
  }, []);

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
