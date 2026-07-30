/**
 * Tide & Tension — Beacon Momentum's canonical public-front-door route board: a vertical chartroom with
 * Fraunces/Manrope/IBM Plex Mono hierarchy, inverse Roundel on dark surfaces, and route-aware accents.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COMMUNITY_URL = "https://beaconcommunity.net";
const LABS_URL = "https://beaconlabs.ai";

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

type PillarIconName = "life" | "work" | "venture" | "finance" | "lab";

type Pillar = {
  number: string;
  name: string;
  rail: string;
  description: string;
  icon: PillarIconName;
};

const pillars: Pillar[] = [
  {
    number: "01",
    name: "Life & Resilience",
    rail: "Protect the operating capacity behind the work.",
    description:
      "Build personal systems that protect time, energy, and focus so you can operate with steady capability without sacrificing your foundation.",
    icon: "life",
  },
  {
    number: "02",
    name: "Work & Systems",
    rail: "Move from manual execution to architectural design.",
    description:
      "Learn to build AI-enabled workflows that absorb routine tasks, clarify priorities, and multiply professional output without making you more available to everyone else.",
    icon: "work",
  },
  {
    number: "03",
    name: "Venture & Ownership",
    rail: "Build assets, not just income.",
    description:
      "Use modern infrastructure to launch and scale one-person businesses and independent commercial vehicles with a longer horizon than the next client invoice.",
    icon: "venture",
  },
  {
    number: "04",
    name: "Modern Finance",
    rail: "Understand the mechanisms of capital.",
    description:
      "Access educational frameworks and simulations for navigating modern financial markets and decentralized systems with care, context, and strategic discipline.",
    icon: "finance",
  },
  {
    number: "05",
    name: "The Local Lab",
    rail: "Control the compute beneath your systems.",
    description:
      "Learn how to deploy and use local, proprietary AI models in ways that protect privacy, preserve margin, and reduce dependency on outside platforms.",
    icon: "lab",
  },
];

const portfolio = [
  {
    number: "A1",
    field: "Field 01",
    coordinate: "45°31′ N / 73°34′ W",
    category: "B2B Infrastructure & Diagnostics",
    name: "Beacon Labs",
    description: "Enterprise AI consulting, system building, and the deep-dive Signal Check diagnostic.",
    href: "https://beaconlabs.ai",
    accent: "var(--property-labs-accent)",
  },
  {
    number: "A2",
    field: "Field 02",
    coordinate: "45°32′ N / 73°32′ W",
    category: "Advanced Education",
    name: "Beacon Trading",
    description: "Scenario-based education for studying modern financial systems with discipline and context.",
    href: "https://beacontrading.ai",
    accent: "var(--property-trading-accent)",
  },
  {
    number: "A3",
    field: "Field 03",
    coordinate: "45°34′ N / 73°31′ W",
    category: "Independent Commerce",
    name: "Hollow Threads",
    description: "Premium, independent e-commerce made with a point of view.",
    href: "https://hollowthreads.store",
    accent: "var(--property-related-accent)",
  },
  {
    number: "A4",
    field: "Field 04",
    coordinate: "45°35′ N / 73°29′ W",
    category: "Legacy & Mission",
    name: "Digital Grandpa",
    description: "A mission property focused on agency, strength, and practical modern capability.",
    href: "https://digitalgrandpa.org",
    accent: "var(--property-community-accent)",
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 15 15 3M6 3h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path d={open ? "m5 5 14 14M19 5 5 19" : "M3 7h18M3 12h18M3 17h18"} stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 30 30" fill="none" aria-hidden="true" className="h-8 w-8">
      <path d="M9.5 6.5 23 15 9.5 23.5v-17Z" fill="currentColor" />
      <circle cx="15" cy="15" r="13.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PillarIcon({ name }: { name: PillarIconName }) {
  const iconPaths: Record<PillarIconName, React.ReactNode> = {
    life: (
      <>
        <path d="M8 22c6.7-2.4 10.4-7.4 11.2-15.2C13 7.4 8.7 10.5 8 16.4V22Z" />
        <path d="M8 22c.3-6.4 3.6-10.7 9.8-12.8" />
        <path d="M8 16.5c-1.9-2-3.7-3-5.5-3.1" />
      </>
    ),
    work: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="0" />
        <path d="M8 2v6M16 2v6M7.5 13h9M7.5 16.5h5" />
      </>
    ),
    venture: (
      <>
        <path d="M4 20 12 4l8 16H4Z" />
        <path d="M12 4v16M8 12h8" />
      </>
    ),
    finance: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v10M15.3 9.3c-.8-.7-1.7-1-3.1-1-1.6 0-2.7.8-2.7 2 0 3.1 5.4 1.3 5.4 4.3 0 1.1-1 2-2.8 2-1.4 0-2.6-.4-3.5-1.2" />
      </>
    ),
    lab: (
      <>
        <path d="M8 3h8M10 3v6l-5.4 9.1A2.5 2.5 0 0 0 6.7 22h10.6a2.5 2.5 0 0 0 2.1-3.9L14 9V3" />
        <path d="M7.2 17h9.6M9.5 13.5h5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
      <g stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name]}
      </g>
    </svg>
  );
}

function SignalStrip({ label, inverse = false }: { label: string; inverse?: boolean }) {
  return (
    <div className={`signal-strip relative flex items-center gap-3 ${inverse ? "text-[#8fa7aa]" : "text-[#49636b]"}`} aria-hidden="true">
      <span className="h-px w-9 bg-[#D8A94A]" />
      <span className="h-px w-4 bg-[#58A6A4]" />
      <span className="font-mono text-[0.59rem] font-semibold uppercase tracking-[0.2em]">{label}</span>
      <span className={`h-px flex-1 ${inverse ? "bg-white/15" : "bg-[#0B2A3B]/15"}`} />
      <span className={`signal-strip-coordinate border-l pl-3 font-mono text-[0.57rem] tracking-[0.16em] ${inverse ? "border-[#58A6A4]/45" : "border-[#58A6A4]/55"}`}>45°36′ N / 73°33′ W</span>
    </div>
  );
}

function BeaconMark() {
  return (
    <img
      src="/images/home/beacon-routeboard-mark.webp"
      alt=""
      className="brand-roundel-image"
      aria-hidden="true"
    />
  );
}

function BrandLockup({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${footer ? "gap-3.5" : "gap-3"}`}>
      <span className="brand-roundel-frame relative grid h-11 w-11 place-items-center border border-[#D8A94A]/45 bg-[#061A29]/60 p-0.5 transition-colors duration-200 group-hover:border-[#D8A94A]">
        <BeaconMark />
      </span>
      <span className="relative flex min-w-0 flex-col border-l border-[#58A6A4]/55 pl-3">
        <span className="font-display text-[1.14rem] leading-[0.82] tracking-[-0.055em] text-[#EEF3EF] sm:text-[1.28rem]">Beacon</span>
        <span className="mt-1 flex items-center gap-1.5 text-[0.47rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">
          <span className="h-px w-3 bg-[#58A6A4]" /> Momentum · {footer ? "Home Port" : "Field Systems"}
        </span>
      </span>
    </span>
  );
}

function PrimaryCta({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      className={`brass-button group inline-flex min-h-12 items-center justify-center gap-3 border px-5 py-3 text-center font-ui text-xs font-semibold uppercase tracking-[0.14em] sm:px-6 ${
        light
          ? "border-[#0B2A3B] bg-[#0B2A3B] text-[#EEF0EB] hover:border-[#D8A94A] hover:bg-[#D8A94A] hover:text-[#061A29]"
          : "border-[#D8A94A] bg-[#D8A94A] text-[#061A29] hover:bg-[#F0C76B]"
      }`}
    >
      <span>{children}</span>
      <ArrowIcon className="link-arrow h-4 w-4" />
    </a>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const stagger = reduceMotion ? 0 : 0.08;
  const entry = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="tide-home min-h-screen overflow-x-clip bg-[#061A29] text-[#EEF3EF]">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          scrolled ? "fog-glass border-white/10" : "border-transparent bg-transparent"
        }`}
      >
        <div className="container flex h-[74px] items-center justify-between gap-5">
          <a href="#top" className="group flex shrink-0 items-center" aria-label="Beacon Momentum home">
            <BrandLockup />
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {[
              ["Choose a route", "#routes"],
              ["The Watch", "#watch"],
              ["The Atlas", "#portfolio"],
            ].map(([label, href]) => (
              <a
                href={href}
                key={label}
                className="text-[0.69rem] font-semibold uppercase tracking-[0.15em] text-[#B8C6C2] transition-colors hover:text-[#D8A94A]"
              >
                {label}
              </a>
            ))}
            <a
              href="#routes"
              className="brass-button inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#EEF3EF] hover:border-[#D8A94A] hover:text-[#D8A94A]"
            >
              Find your route <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="brass-button grid h-11 w-11 place-items-center border border-white/20 text-[#EEF3EF] hover:border-[#D8A94A] hover:text-[#D8A94A] lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fog-glass border-t border-white/10 px-5 py-5 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-xl flex-col gap-1">
              {[
                ["Choose a route", "#routes"],
                ["The Watch", "#watch"],
                ["The Atlas", "#portfolio"],
              ].map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-medium text-[#EEF3EF]"
                >
                  <span>{label}</span>
                  <span className="font-ui text-xs tracking-[0.16em] text-[#D8A94A]">0{index + 1}</span>
                </a>
              ))}
              <a
                href="#routes"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-between bg-[#D8A94A] px-4 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#061A29]"
              >
                Find your route <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </header>

      <main id="top">
        <section className="tide-grid tide-grain relative isolate flex min-h-[760px] items-end overflow-hidden border-b border-white/10 pb-14 pt-32 sm:min-h-[820px] sm:pb-20 lg:min-h-[880px] lg:pb-24">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/home/beacon-routeboard-hero.webp')" }}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,26,41,0.98)_0%,rgba(6,26,41,0.91)_38%,rgba(6,26,41,0.54)_68%,rgba(6,26,41,0.65)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-64 -z-10 bg-[linear-gradient(0deg,#061A29,transparent)]" />

          <div className="container relative">
            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.42fr)] lg:gap-16">
              <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: stagger }} className="max-w-3xl lg:ml-[7%]">
                <motion.div variants={entry} transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.23, 1, 0.32, 1] }}>
                  <SignalStrip label="Beacon Momentum · Field Position 01" inverse />
                </motion.div>
                <motion.p
                  variants={entry}
                  transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-7 text-[0.66rem] font-semibold uppercase tracking-[0.23em] text-[#D8A94A]"
                >
                  Beacon Momentum · Public Front Door
                </motion.p>
                <motion.h1
                  variants={entry}
                  transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.23, 1, 0.32, 1] }}
                  className="font-display mt-5 max-w-3xl text-[clamp(3.35rem,8.2vw,7.3rem)] leading-[0.91] tracking-[-0.055em] text-[#F6F5EF]"
                >
                  Find a steadier
                  <br />
                  <span className="italic text-[#D8A94A]">next move.</span>
                </motion.h1>
                <motion.p
                  variants={entry}
                  transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-8 max-w-2xl text-base leading-7 text-[#C8D3CF] sm:text-lg sm:leading-8"
                >
                  Beacon Momentum is a public orientation point for people navigating transition, building durable work, and studying modern financial systems with care. Start with the path that fits; every destination has a clear purpose and its own operating boundary.
                </motion.p>
                <motion.div
                  variants={entry}
                  transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <PrimaryCta href="#routes">Choose your route</PrimaryCta>
                  <a
                    href="#watch"
                    className="brass-button group inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#EEF3EF] hover:border-[#58A6A4] hover:text-[#B7E0DA] sm:px-6"
                  >
                    Visit The Watch <ArrowIcon className="link-arrow h-4 w-4" />
                  </a>
                </motion.div>
                <motion.p
                  variants={entry}
                  transition={{ duration: reduceMotion ? 0 : 0.44, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-5 text-xs leading-5 text-[#9BB0B0]"
                >
                  The Watch is a $497 annual membership hosted at Beacon Community. Beacon Labs is a separate organization-facing services destination.
                </motion.p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.36, duration: reduceMotion ? 0 : 0.52, ease: [0.23, 1, 0.32, 1] }}
                className="relative border-l border-[#D8A94A]/65 pl-5 text-[#D6E3DE] lg:mb-3"
              >
                <div className="absolute -left-[5px] top-0 h-2 w-2 bg-[#D8A94A]" />
                <p className="text-[0.61rem] font-semibold uppercase tracking-[0.22em] text-[#D8A94A]">Start with orientation</p>
                <p className="font-display mt-4 max-w-[18rem] text-2xl leading-tight tracking-[-0.02em] sm:text-3xl">
                  A clearer next move begins with the right <span className="italic">destination.</span>
                </p>
                <div className="mt-7 grid grid-cols-2 gap-x-6 border-t border-white/15 pt-4 text-[0.62rem] uppercase tracking-[0.15em] text-[#9BB0B0]">
                  <span>Membership route</span>
                  <span className="text-right text-[#EEF3EF]">The Watch</span>
                </div>
              </motion.aside>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.58rem] uppercase tracking-[0.28em] text-[#829999] sm:flex" aria-hidden="true">
            <span className="h-px w-8 bg-[#58A6A4]" /> Scroll the chart <span className="h-7 w-px bg-[#58A6A4]" />
          </div>
        </section>

        <section id="routes" className="relative overflow-hidden bg-[#DDE7E3] py-20 text-[#0B2A3B] sm:py-28 lg:py-32">
          <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(rgba(11,42,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(11,42,59,0.1)_1px,transparent_1px)] [background-size:60px_60px]" aria-hidden="true" />
          <div className="container relative">
            <SignalStrip label="Start Here · Route Board 02" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.21em] text-[#3E777A]">One public front door. Distinct onward paths.</p>
                <h2 className="font-display mt-5 max-w-lg text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl">Choose the path that fits <span className="italic text-[#3E777A]">where you are.</span></h2>
                <p className="mt-7 max-w-md text-base leading-7 text-[#42606A]">The Watch supports individual learning and membership. Beacon Labs works with organizations on systems and diagnostics. Both belong to the wider Beacon ecosystem, but they operate as distinct destinations.</p>
                <div className="relative mt-10 hidden min-h-[170px] overflow-hidden border border-[#0B2A3B]/15 bg-[#0B2A3B] p-5 lg:block">
                  <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: "url('/images/home/beacon-routeboard-wayfinding.webp')" }} aria-hidden="true" />
                  <p className="relative max-w-[14rem] text-sm leading-6 text-[#EEF3EF]">No false funnel. No assumed handoff. Select the route that names the work in front of you.</p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="route-board-card group relative flex min-h-[480px] flex-col overflow-hidden border border-[#0B2A3B]/25 bg-[#071D2E] p-6 text-[#EEF3EF] sm:p-7">
                  <div className="absolute inset-0 bg-cover bg-center opacity-45 transition-transform duration-300 group-hover:scale-[1.035]" style={{ backgroundImage: "url('/images/home/beacon-routeboard-watch.webp')" }} aria-hidden="true" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,29,46,0.26)_0%,rgba(7,29,46,0.96)_80%)]" aria-hidden="true" />
                  <div className="relative flex items-center justify-between gap-4 text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">
                    <span>Route 01 · For individuals</span><ArrowIcon className="link-arrow h-4 w-4" />
                  </div>
                  <div className="relative mt-auto">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#B7E0DA]">Membership &amp; learning</p>
                    <h3 className="font-display mt-4 text-5xl leading-[0.92] tracking-[-0.045em]">The <span className="italic text-[#D8A94A]">Watch.</span></h3>
                    <p className="mt-5 max-w-sm text-sm leading-6 text-[#C7D4D0]">A $497/year membership for people building a steadier operating position through curriculum, playbooks, and a community environment.</p>
                    <p className="mt-5 border-t border-white/15 pt-4 text-[0.61rem] font-semibold uppercase tracking-[0.15em] text-[#B7E0DA]">Continue to Beacon Community ↗</p>
                  </div>
                </a>
                <a href={LABS_URL} target="_blank" rel="noreferrer" className="route-board-card group relative flex min-h-[480px] flex-col overflow-hidden border border-[#0B2A3B]/25 bg-[#0B2A3B] p-6 text-[#EEF3EF] sm:p-7">
                  <div className="absolute inset-0 bg-cover bg-center opacity-45 transition-transform duration-300 group-hover:scale-[1.035]" style={{ backgroundImage: "url('/images/home/beacon-routeboard-labs.webp')" }} aria-hidden="true" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,42,59,0.28)_0%,rgba(11,42,59,0.97)_82%)]" aria-hidden="true" />
                  <div className="relative flex items-center justify-between gap-4 text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">
                    <span>Route 02 · For organizations</span><ArrowIcon className="link-arrow h-4 w-4" />
                  </div>
                  <div className="relative mt-auto">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#B7E0DA]">Systems &amp; diagnostics</p>
                    <h3 className="font-display mt-4 text-5xl leading-[0.92] tracking-[-0.045em]">Beacon <span className="italic text-[#D8A94A]">Labs.</span></h3>
                    <p className="mt-5 max-w-sm text-sm leading-6 text-[#C7D4D0]">An organization-facing practice for evidence-led Signal Checks, operating systems, and practical AI integration.</p>
                    <p className="mt-5 border-t border-white/15 pt-4 text-[0.61rem] font-semibold uppercase tracking-[0.15em] text-[#B7E0DA]">Continue to Beacon Labs ↗</p>
                  </div>
                </a>
              </div>
            </div>
            <p className="mt-7 max-w-3xl border-l-2 border-[#D8A94A] pl-5 text-sm leading-6 text-[#49636B]">These routes are intentionally separate. A Beacon Community account, a Beacon Labs inquiry, and any information you submit at one destination do not transfer automatically to another.</p>
          </div>
        </section>

        <section id="promise" className="relative bg-[#EEF0EB] py-20 text-[#0B2A3B] sm:py-28 lg:py-32">
          <div className="container">
            <SignalStrip label="The Why · Field Note 02" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.21em] text-[#3E777A]">A change in the operating math</p>
                <h2 className="font-display mt-5 max-w-xl text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  The Exit Ramp <span className="italic text-[#3E777A]">is Leverage.</span>
                </h2>
                <div className="mt-9 border-l-2 border-[#D8A94A] pl-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0B2A3B]">Own the infrastructure beneath the output.</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#49636B]">We do not use AI to make you work faster just to be handed more work. We use it to make your capability more durable.</p>
                </div>
              </div>

              <div>
                <div className="max-w-2xl space-y-5 text-base leading-8 text-[#34505B] sm:text-lg">
                  <p>For thirty years, the answer was always to work harder. Put in more hours. Get another degree. But the math no longer works. The human body does not scale, and corporate efficiency engines are using artificial intelligence to squeeze more out of the workforce.</p>
                  <p>Beacon Momentum treats AI as an emancipation tool: a way to separate useful outcomes from endless availability. The work is to build systems for lead generation, content, and operations that retain your judgment instead of consuming it.</p>
                  <p className="font-display text-2xl leading-8 text-[#0B2A3B] sm:text-3xl">Stop renting your capacity to the moment. Build an operating position that compounds.</p>
                </div>

                <div className="relative mt-11 overflow-hidden border border-[#0B2A3B]/20 bg-[#0B2A3B] p-2 shadow-[0_22px_45px_rgba(11,42,59,0.14)]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-35"
                    style={{ backgroundImage: "url('/images/home/beacon-routeboard-wayfinding.webp')" }}
                    aria-hidden="true"
                  />
                  <div className="relative aspect-video overflow-hidden border border-white/10 bg-[#061A29]">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/vi1EkYANhQs?rel=0"
                      title="The Exit Ramp: How to Stop Running to Stand Still"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="relative flex items-center justify-between gap-4 px-3 py-4 text-[#DCE4DF] sm:px-4">
                    <span className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                      <span className="text-[#D8A94A]"><PlayIcon /></span>
                      The Exit Ramp · Field Transmission
                    </span>
                    <span className="hidden text-[0.58rem] uppercase tracking-[0.16em] text-[#9BB0B0] sm:block">Watch time: on demand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pillars" className="relative overflow-hidden bg-[#DDE7E3] py-20 text-[#0B2A3B] sm:py-28 lg:py-32">
          <div className="absolute inset-0 opacity-[0.3] [background-image:linear-gradient(rgba(11,42,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(11,42,59,0.1)_1px,transparent_1px)] [background-size:60px_60px]" aria-hidden="true" />
          <div className="container relative">
            <SignalStrip label="The Architecture · Registry 03" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.21em] text-[#3E777A]">One membership. Five fields of capability.</p>
                <h2 className="font-display mt-5 max-w-md text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl">The Five Pillars of <span className="italic text-[#3E777A]">Operational Resilience.</span></h2>
                <p className="mt-7 max-w-md text-base leading-7 text-[#42606A]">Transformation requires more than a single tactic. The Watch is a curriculum and community environment designed to build useful capability across five connected pillars.</p>
                <div className="mt-10 flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#0B2A3B]">
                  <span className="h-px w-10 bg-[#D8A94A]" /> Select a field to hold position
                </div>
              </div>

              <div className="border-t border-[#0B2A3B]/20">
                {pillars.map((pillar, index) => {
                  const active = activePillar === index;
                  return (
                    <motion.button
                      type="button"
                      key={pillar.name}
                      onClick={() => setActivePillar(index)}
                      onMouseEnter={() => setActivePillar(index)}
                      aria-pressed={active}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                      className={`group grid w-full grid-cols-[34px_42px_1fr_22px] items-start gap-x-3 border-b py-6 text-left transition-colors duration-200 sm:grid-cols-[46px_56px_minmax(150px,0.85fr)_minmax(180px,1.3fr)_24px] sm:gap-x-4 sm:py-7 ${
                        active ? "border-[#D8A94A] bg-[#EDF0EA]/65" : "border-[#0B2A3B]/20 hover:bg-[#EDF0EA]/45"
                      }`}
                    >
                      <span className={`mt-1 text-[0.65rem] font-semibold tracking-[0.14em] ${active ? "text-[#D8A94A]" : "text-[#527078]"}`}>{pillar.number}</span>
                      <span className={`grid h-10 w-10 place-items-center border ${active ? "border-[#D8A94A] bg-[#0B2A3B] text-[#D8A94A]" : "border-[#0B2A3B]/30 text-[#0B2A3B]"}`}>
                        <PillarIcon name={pillar.icon} />
                      </span>
                      <span className="min-w-0 pt-1 sm:col-start-3">
                        <span className="block font-display text-2xl leading-none tracking-[-0.025em] sm:text-[1.7rem]">{pillar.name}</span>
                        <span className="mt-2 block text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-[#3E777A] sm:hidden">{pillar.rail}</span>
                      </span>
                      <span className="col-span-3 col-start-2 mt-4 pr-2 text-sm leading-6 text-[#42606A] sm:col-span-1 sm:col-start-4 sm:mt-0 sm:pt-1">{pillar.description}</span>
                      <span className={`mt-2 text-lg transition-transform duration-200 sm:mt-1 ${active ? "rotate-45 text-[#D8A94A]" : "text-[#53757A]"}`}>+</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="watch" className="tide-grid tide-grain relative isolate overflow-hidden bg-[#071D2E] py-20 sm:py-28 lg:py-32">
          <div className="container relative">
            <SignalStrip label="The Offer · Watch Post 04" inverse />
            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.62fr)] lg:items-end lg:gap-24">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.21em] text-[#D8A94A]">A working environment for builders</p>
                <h2 className="font-display mt-5 max-w-3xl text-5xl leading-[0.96] tracking-[-0.05em] text-[#F6F5EF] sm:text-6xl lg:text-7xl">The Lighthouse is Lit. <span className="italic text-[#D8A94A]">Join Us at the Watch.</span></h2>
                <p className="mt-8 max-w-2xl text-base leading-7 text-[#C7D4D0] sm:text-lg sm:leading-8">The Watch is not a content warehouse. It is a working environment for people who want a durable operating position in a changing world of work and technology.</p>
                <div className="mt-10 grid max-w-2xl gap-5 border-t border-white/15 pt-7 sm:grid-cols-2">
                  {[
                    ["Complete Curriculum", "Unrestricted access to field guides and training modules across the Five Pillars."],
                    ["Operating Playbooks", "Standardized, ethical templates for AI integration, content deployment, and automation."],
                    ["Community Environment", "A member environment for respectful, practical peer exchange."],
                    ["Continuous Intelligence", "Regular system reviews and strategic insights from the Beacon operating team."],
                  ].map(([title, description], index) => (
                    <div key={title} className="relative pl-5">
                      <span className="absolute left-0 top-1.5 h-2 w-2 border border-[#D8A94A] bg-[#071D2E]" />
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-[#EEF3EF]">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#AFC0BC]">{description}</p>
                      <span className="mt-3 block text-[0.58rem] uppercase tracking-[0.17em] text-[#3E777A]">Module 0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden border border-[#D8A94A]/70 bg-[#071D2E]/90 p-6 shadow-[0_24px_55px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-8">
                <div className="absolute right-0 top-0 h-20 w-20 border-b border-l border-[#D8A94A]/35" aria-hidden="true" />
                <p className="text-[0.63rem] font-semibold uppercase tracking-[0.21em] text-[#D8A94A]">The Watch · Annual Membership</p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="font-display text-7xl leading-none tracking-[-0.06em] text-[#F8F5EC]">$497</span>
                  <span className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-[#B8C6C2]">/ Year</span>
                </div>
                <p className="mt-5 border-y border-white/15 py-5 text-sm leading-6 text-[#C7D4D0]">The Watch is a $497 annual membership. You will continue to Beacon Community, the separate membership destination, to review enrollment and member details.</p>
                <div className="mt-7">
                  <PrimaryCta href={COMMUNITY_URL}>Visit Beacon Community</PrimaryCta>
                  <p id="membership" className="mt-5 text-xs leading-5 text-[#9BB0B0]">Review membership details at the destination. If you need an organization-facing diagnostic instead, return to the route board and visit Beacon Labs.</p>
                  <a href="#routes" className="group mt-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#B7E0DA] hover:text-[#D8A94A]">
                    Compare the routes <ArrowIcon className="link-arrow h-3.5 w-3.5" />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="portfolio" className="relative overflow-hidden bg-[#EEF0EB] py-20 text-[#0B2A3B] sm:py-28 lg:py-32">
          <div
            className="absolute inset-y-0 right-0 hidden w-[46%] bg-cover bg-center opacity-20 lg:block"
            style={{ backgroundImage: "url('/images/home/beacon-routeboard-atlas.webp')" }}
            aria-hidden="true"
          />
          <div className="container relative">
            <SignalStrip label="The Ecosystem · Atlas 05" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.21em] text-[#3E777A]">Beyond the core membership</p>
                <h2 className="font-display mt-5 max-w-lg text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl">The Beacon <span className="italic text-[#3E777A]">Portfolio.</span></h2>
                <p className="mt-7 max-w-md text-base leading-7 text-[#42606A]">Beacon Momentum is the learning vessel inside a broader operating atlas. Each property holds a distinct field position; together, they test practical capability and durable ownership in public.</p>
                <div className="mt-9 hidden border-l-2 border-[#D8A94A] pl-5 text-sm leading-6 text-[#49636B] lg:block">The Watch is the chartroom. The registry records where Beacon work meets the real world.</div>
              </div>
              <div className="relative grid gap-px border border-[#0B2A3B]/25 bg-[#0B2A3B]/20 before:absolute before:inset-y-0 before:left-[40%] before:hidden before:w-px before:bg-[#58A6A4]/35 sm:grid-cols-2 sm:before:block">
                {portfolio.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="atlas-registry-card group relative min-h-[258px] overflow-hidden bg-[#EEF0EB] p-6 hover:bg-[#E2EAE6] sm:p-7"
                  >
                    <span className="absolute left-0 top-0 h-1 w-16" style={{ backgroundColor: item.accent }} />
                    <span className="absolute right-[-2.5rem] top-[-2.8rem] h-24 w-24 rounded-full border border-[#58A6A4]/20" aria-hidden="true" />
                    <span className="absolute right-[1.6rem] top-[-1rem] h-10 w-px bg-[#58A6A4]/30" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-5">
                      <span className="flex items-center gap-2 text-[0.59rem] font-semibold uppercase tracking-[0.16em] text-[#537078]"><span className="h-px w-4 bg-[#D8A94A]" />{item.number} · {item.field}</span>
                      <ArrowIcon className="link-arrow h-4 w-4 text-[#0B2A3B]" />
                    </div>
                    <p className="mt-9 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-[#3E777A]">{item.category}</p>
                    <h3 className="font-display mt-3 text-3xl leading-none tracking-[-0.03em]">{item.name}</h3>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-[#49636B]">{item.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#0B2A3B]/15 pt-3 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[#527078]">
                      <span className="font-mono">{item.number} · {item.coordinate}</span>
                      <span className="text-[#3E777A]">External field ↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden bg-[#04141F] py-12 text-[#B8C6C2] sm:py-16">
        <div className="container">
          <SignalStrip label="Return Bearing · Home Port 06" inverse />
          <div className="flex flex-col gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mt-10"><BrandLockup footer /></div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[#9BB0B0]">Practical systems, curriculum, and community for people building a longer horizon in the AI transition.</p>
            </div>
              <a href="#routes" className="brass-button group inline-flex min-h-11 items-center justify-center gap-3 border border-[#D8A94A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#D8A94A] hover:bg-[#D8A94A] hover:text-[#061A29]">
              Choose a route <ArrowIcon className="link-arrow h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
            <p className="text-[0.62rem] uppercase tracking-[0.17em] text-[#6F898A]">© {new Date().getFullYear()} Beacon Momentum. The lighthouse is lit.</p>
            <div>
              <p className="text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">Navigate</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href="#routes" className="hover:text-[#EEF3EF]">Choose a route</a>
                <a href="#watch" className="hover:text-[#EEF3EF]">The Watch</a>
                <a href="#pillars" className="hover:text-[#EEF3EF]">Five Pillars</a>
              </div>
            </div>
            <div>
              <p className="text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">Explore</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href={COMMUNITY_URL} className="hover:text-[#EEF3EF]">Beacon Community ↗</a>
                <a href={LABS_URL} className="hover:text-[#EEF3EF]">Beacon Labs ↗</a>
                <a href="#portfolio" className="hover:text-[#EEF3EF]">Beacon Portfolio</a>
              </div>
            </div>
            <div>
              <p className="text-[0.61rem] font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">Position</p>
              <p className="mt-3 text-sm leading-6">Need help finding the right destination? <a className="text-[#EEF3EF] underline decoration-[#D8A94A]/70 underline-offset-4 hover:text-[#D8A94A]" href="mailto:support@beaconmomentum.com">support@beaconmomentum.com</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
