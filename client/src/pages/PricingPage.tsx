/**
 * Beacon Momentum — /pricing
 * Design: Deep Water Editorial / Quiet Authority
 * Shows all six Beacon products side by side in a single-page comparison.
 * Pattern: Reforge / Maven / altMBA — premium education pricing page.
 *
 * Products:
 * - Beacon Life     $297/mo  $2,497/yr  — Life transitions
 * - Beacon Work     $297/mo  $2,497/yr  — Career & income
 * - Beacon Venture  $297/mo  $2,497/yr  — Solopreneur / digital products
 * - Beacon Systems  $297/mo  $2,497/yr  — AI operations
 * - Beacon Labs     $297/mo  $2,497/yr  — AI consulting (pillar)
 * - Beacon Trading  $97/mo   $797/yr    — Financial education (entry point)
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";

type BillingCycle = "monthly" | "annual";

interface Product {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  lightBg: string;
  monthly: number;
  annual: number;
  annualMonthly: number;
  savings: number;
  entryPoint?: boolean;
  features: string[];
  annualExtras: string[];
  ctaLink: string;
  pillarLink?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "life",
    name: "Beacon Life",
    shortName: "Life",
    tagline: "Rebuild capacity, confidence, and direction.",
    color: "#2A7F6F",
    lightBg: "#F0FAF8",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/life",
  },
  {
    id: "work",
    name: "Beacon Work",
    shortName: "Work",
    tagline: "Navigate the AI-era job market with clarity.",
    color: "#1A5C6B",
    lightBg: "#EFF7FA",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/work",
  },
  {
    id: "venture",
    name: "Beacon Venture",
    shortName: "Venture",
    tagline: "Build income that does not depend on an employer.",
    color: "#7C4F2A",
    lightBg: "#FAF5EF",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/venture",
  },
  {
    id: "systems",
    name: "Beacon Systems",
    shortName: "Systems",
    tagline: "Automate operations. Deploy AI that works.",
    color: "#3D5A80",
    lightBg: "#EFF3FA",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/systems",
  },
  {
    id: "labs",
    name: "Beacon Labs",
    shortName: "Labs",
    tagline: "AI consulting, signal checks, and custom builds.",
    color: "#5A3E8A",
    lightBg: "#F3EFF9",
    monthly: 297,
    annual: 2497,
    annualMonthly: 208,
    savings: 1067,
    features: [
      "Full curriculum access",
      "Weekly live mentor sessions",
      "Private member community",
      "AI tools and templates",
      "Monthly cohort check-ins",
    ],
    annualExtras: ["Priority mentor scheduling", "Annual member retreat access"],
    ctaLink: "/assessment",
    pillarLink: "/pillar/labs",
  },
  {
    id: "trading",
    name: "Beacon Trading",
    shortName: "Trading",
    tagline: "AI-powered financial education. Your entry point.",
    color: "#B8860B",
    lightBg: "#FDF8EC",
    monthly: 97,
    annual: 797,
    annualMonthly: 66,
    savings: 367,
    entryPoint: true,
    features: [
      "Full AI trading curriculum",
      "Real-time pricing support",
      "Weekly market newsletter",
      "Private member community",
      "AI tools and templates",
    ],
    annualExtras: ["Priority support", "Advanced strategy modules"],
    ctaLink: "/beacon-trading",
    pillarLink: "/beacon-trading",
  },
];

function PricingCard({
  product,
  billing,
  index,
}: {
  product: Product;
  billing: BillingCycle;
  index: number;
}) {
  const price = billing === "monthly" ? product.monthly : product.annual;
  const period = billing === "monthly" ? "/month" : "/year";
  const subline =
    billing === "annual"
      ? `~$${product.annualMonthly}/month · save $${product.savings}`
      : "Cancel anytime";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={`relative border rounded-sm flex flex-col ${
        product.entryPoint
          ? "border-[#C8A84B] bg-[#FFFDF4]"
          : "border-[#E8E4DC] bg-white"
      }`}
    >
      {/* Entry point badge */}
      {product.entryPoint && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-ui tracking-widest uppercase text-white"
          style={{ backgroundColor: product.color }}
        >
          <Zap className="w-3 h-3" />
          Entry Point
        </div>
      )}

      {/* Header */}
      <div
        className="p-6 border-b"
        style={{
          borderColor: product.entryPoint ? "#E8D89A" : "#E8E4DC",
          backgroundColor: product.lightBg,
        }}
      >
        <div
          className="text-xs font-ui tracking-widest uppercase mb-2"
          style={{ color: product.color }}
        >
          {product.shortName}
        </div>
        <h3 className="font-display text-xl text-[#2C2416] mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-[#9B8E7E] leading-snug">{product.tagline}</p>
      </div>

      {/* Price */}
      <div className="px-6 py-5 border-b border-[#E8E4DC]">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl text-[#2C2416]">
            ${price.toLocaleString()}
          </span>
          <span className="text-[#9B8E7E] font-ui text-sm">{period}</span>
        </div>
        <p
          className="text-xs mt-1 font-ui"
          style={{ color: billing === "annual" ? product.color : "#9B8E7E" }}
        >
          {subline}
        </p>
      </div>

      {/* Features */}
      <div className="px-6 py-5 flex-1">
        <ul className="space-y-2.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[#6B5E4E]">
              <CheckCircle2
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: product.color }}
              />
              {f}
            </li>
          ))}
          {billing === "annual" &&
            product.annualExtras.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#6B5E4E]">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: product.color }}
                />
                <span>
                  {f}{" "}
                  <span
                    className="text-xs font-ui tracking-wide"
                    style={{ color: product.color }}
                  >
                    (annual)
                  </span>
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 pt-2 space-y-2">
        <a
          href={product.ctaLink}
          className="block text-center py-3 px-5 rounded-sm font-ui text-sm tracking-widest uppercase text-white transition-all duration-200 active:scale-[0.97]"
          style={{ backgroundColor: product.color }}
        >
          Reserve Your Spot
        </a>
        <p className="text-center text-[10px] text-[#9B8E7E] font-ui tracking-wide leading-snug">
          Enrollment opens soon. Take the assessment to reserve your place.
        </p>
        {product.pillarLink && product.pillarLink !== product.ctaLink && (
          <Link
            href={product.pillarLink}
            className="block text-center py-2 px-5 text-xs font-ui tracking-widest uppercase transition-colors"
            style={{ color: product.color }}
          >
            Learn more →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  const mainProducts = PRODUCTS.filter((p) => !p.entryPoint);
  const entryProduct = PRODUCTS.find((p) => p.entryPoint)!;

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-7 h-7 rounded-sm bg-[#1A5C6B] flex items-center justify-center">
              <span className="text-white" style={{fontSize:"0.9rem"}}>◈</span>
            </div>
            <span className="font-display text-[#2C2416] text-lg tracking-tight">
              Beacon Momentum
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-ui text-[#6B5E4E] hover:text-[#2C2416] tracking-wide transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-ui text-[#6B5E4E] hover:text-[#2C2416] tracking-wide transition-colors">
              About
            </Link>
          </div>
          <Link
            href="/assessment"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-ui tracking-widest uppercase text-white bg-[#1A5C6B] rounded-sm transition-colors hover:bg-[#154F5C]"
          >
            Find Your Path
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-4">
              Membership Pricing
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-[#2C2416] leading-tight mb-6">
              One price. Full access.
              <br />
              No hidden tiers.
            </h1>
            <p className="text-[#6B5E4E] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Every Beacon membership includes the full curriculum, live mentor
              sessions, the private community, and all AI tools. Choose the
              pillar that matches where you are right now.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-1 p-1 border border-[#E8E4DC] rounded-sm bg-white">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 text-sm font-ui tracking-widest uppercase rounded-sm transition-all duration-200 ${
                  billing === "monthly"
                    ? "bg-[#1A5C6B] text-white"
                    : "text-[#9B8E7E] hover:text-[#2C2416]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 text-sm font-ui tracking-widest uppercase rounded-sm transition-all duration-200 flex items-center gap-2 ${
                  billing === "annual"
                    ? "bg-[#1A5C6B] text-white"
                    : "text-[#9B8E7E] hover:text-[#2C2416]"
                }`}
              >
                Annual
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-sm font-ui tracking-wide ${
                    billing === "annual"
                      ? "bg-white/20 text-white"
                      : "bg-[#F0FAF8] text-[#2A7F6F]"
                  }`}
                >
                  Save 30%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Pillar Grid */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-6 text-center">
            The Five Pillars
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {mainProducts.map((product, i) => (
              <PricingCard
                key={product.id}
                product={product}
                billing={billing}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Entry Point — Beacon Trading */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-ui tracking-widest uppercase text-[#9B8E7E] mb-6 text-center">
            Start Here
          </div>
          <div className="max-w-sm mx-auto">
            <PricingCard
              product={entryProduct}
              billing={billing}
              index={mainProducts.length}
            />
          </div>
          <p className="text-center text-xs text-[#9B8E7E] mt-6 font-ui tracking-wide max-w-lg mx-auto">
            Beacon Trading is the recommended entry point for members who want to
            build financial literacy before committing to a full pillar. At
            $97/month, it is designed to be accessible while you find your path.
          </p>
        </div>
      </section>

      {/* FAQ / Guarantee Strip */}
      <section className="py-16 px-6 border-t border-[#E8E4DC] bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-display text-lg text-[#2C2416] mb-3">
                Can I switch pillars?
              </h3>
              <p className="text-sm text-[#6B5E4E] leading-relaxed">
                Yes. Members can move between pillars at any time. Your billing
                cycle resets to the new pillar's rate on your next billing date.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2416] mb-3">
                Is there a refund policy?
              </h3>
              <p className="text-sm text-[#6B5E4E] leading-relaxed">
                Monthly memberships can be cancelled before the next billing
                date. Annual memberships include a 30-day satisfaction
                guarantee from the start date.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2416] mb-3">
                Not sure where to start?
              </h3>
              <p className="text-sm text-[#6B5E4E] leading-relaxed">
                Take the Pathfinder Assessment. It takes about 5 minutes and maps your current situation to the pillar most likely to move the needle fastest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 bg-[#1A5C6B]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl text-white leading-tight mb-4">
            Not sure which path is right?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            The Pathfinder Assessment takes about 5 minutes and tells you exactly where to start.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1A5C6B] rounded-sm font-ui text-sm tracking-widest uppercase transition-all duration-200 active:scale-[0.97] hover:bg-[#F0FAF8]"
          >
            Take the Assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
