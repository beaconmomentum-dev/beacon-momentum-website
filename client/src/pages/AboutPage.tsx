/**
 * Beacon Momentum — About Page (/about)
 * Design: Deep Water Editorial / Quiet Authority
 * Sections:
 *   1. Hero — lighthouse, "Built in the storm. For the people still in it."
 *   2. Founder's Statement — "Why Beacon Exists" (full text, Bob's voice)
 *   3. The Lever Has Arrived — AI power shift framing
 *   4. What We Are Building — community and mission
 *   5. The Belief at the Center — values close
 *   6. Who We Serve — six audience cards
 *   7. The Watch Manifesto — dark section
 *   8. Origin Timeline — lived history
 *   9. Five Pillars — architecture
 *  10. Practical Not Theoretical — proof stats
 *  11. Operating Doctrine — Earn · Prove · Amplify
 *  12. Ecosystem Table
 *  13. CTA
 */

import { Link } from "wouter";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";
import PillarIcon from "@/components/PillarIcon";

const ABOUT_HERO_IMG = "/manus-storage/beacon_about_hero_3f574393.png";

const TIMELINE = [
  {
    period: "The Service",
    date: "Military years",
    headline: "Honorably discharged. Community collapsed.",
    body: "Served with honor. Came home to find the economy had moved on without the people left behind — factories closed, opportunities gone, half the town scattered. That experience of watching a community lose its footing never left. It became the lens through which everything since has been understood.",
  },
  {
    period: "The Rebuild",
    date: "1990s",
    headline: "North Carolina. Millionaire status. Presidential recognition.",
    body: "Rebuilt from nothing in North Carolina. Became a licensed counselor. Built Pinnacle Insurance Agency and investment banking into genuine success. Achieved millionaire status. Received President Bush's 1000 Points of Light Award for community service. By 40, the American dream was real — and then the system saw a profit opportunity.",
  },
  {
    period: "The Choice",
    date: "Post-9/11",
    headline: "An impossible ultimatum. A father's decision.",
    body: "Government agents presented an impossible choice: plead guilty to white collar crimes that were not committed, or fight from behind bars while watching a family be destroyed. The choice was designed to be unwinnable. The decision was made to protect the people who mattered most. That cost 14 years of freedom. It was not defeat. It was the most important decision ever made.",
  },
  {
    period: "The Wire",
    date: "June 2003 – 2017",
    headline: "14 years. Teacher. Librarian. Counselor. Friend.",
    body: "Served behind the wire not as a victim but as a resource. Taught. Cut hair. Ran the library. Counseled. Learned that dignity can be found anywhere if you choose to find it. Learned that broken people often carry the most valuable wisdom. Every lesson from those 14 years is embedded in what Beacon teaches today.",
  },
  {
    period: "The Ministry",
    date: "2017 – 2021",
    headline: "GraceHouse: picking people up at the gates.",
    body: "Founded GraceHouse Transitional Ministries the day of release. Picked people up at prison gates. Took them to Walmart for basic dignity items. Helped them rebuild from zero. Used every hard lesson to serve others walking the same path. GraceHouse closed due to COVID — but the mission did not. It simply found a new form.",
  },
  {
    period: "The Voice",
    date: "2022",
    headline: "Digital Grandpa: wisdom before strategy.",
    body: "When GraceHouse closed, the work moved online. Digital Grandpa began with a simple premise: sometimes you don't need a guru. You need a grandpa. Non-judgmental, direct, grounded in lived experience. Thousands reached. Veterans, formerly incarcerated individuals, at-risk youth — people who needed someone who had actually been through something to tell them the truth with love. That audience is the proof of concept Beacon is built on.",
  },
  {
    period: "The Community",
    date: "2023 – 2024",
    headline: "Rise & Reclaim: the mission takes structural form.",
    body: "Digital Grandpa grew into Rise & Reclaim — a structured community built on real curriculum, real transformation, and the conviction that every setback is a setup for a comeback. The membership model, the curriculum architecture, the community dynamics — all tested here, with real people, before a single line of Beacon code was written. Rise & Reclaim is now retired into Beacon Momentum. Its members and its lessons are the living foundation of The Watch.",
  },
  {
    period: "The Foundation",
    date: "Early 2025",
    headline: "Building infrastructure before brand.",
    body: "Beacon Momentum began not as a brand but as a set of operational questions: How do you build a private AI operations layer for a small organization? How do you help people navigate a transition that no one is explaining honestly? The company operated initially under the name Phoenix Collective — an AI-powered transformation technology firm built for the same communities it had always served. The infrastructure came first: Phoenix, the command center, the GHL CRM architecture, the Digital Ocean droplets, the GitHub repositories. The Beacon Momentum identity emerged from that foundation. The brand came second. The systems came first.",
  },
  {
    period: "The Lesson",
    date: "Mid 2025",
    headline: "What $20,000 in Meta ads taught us.",
    body: "Hollow Threads, the alternative lifestyle apparel brand built for family, spent over $20,000 in Meta advertising without selling a single shirt. That experience became one of the most important strategic inputs in Beacon's history. It confirmed what the data already showed: paid attention is not earned trust. Cold traffic does not convert belief. The next Beacon growth engine would be built on education, proof, and public usefulness — not on ad spend. That lesson is now embedded in the Beacon operating doctrine.",
  },
  {
    period: "The Architecture",
    date: "Late 2025",
    headline: "Five pillars emerge from real questions.",
    body: "The five-pillar architecture did not come from a strategy deck. It came from the actual questions people were asking: How do I stay relevant? How do I protect my income? How do I build something of my own? How do I use AI without losing myself in it? Life, Work, Venture, Systems, Labs — each pillar is an answer to a real question from a real person navigating a real transition.",
  },
  {
    period: "The Commitment",
    date: "2026 and forward",
    headline: "Organic-first. Trust before transaction.",
    body: "Beacon's growth doctrine is written into the operating formula: Earn. Prove. Amplify. We will not buy our way out of unclear positioning. We will build a public learning presence through YouTube, organic social, search-friendly content, community implementation, and transparent case studies. Paid ads may eventually amplify what is already working. They will not be the primary engine of market validation.",
  },
];

const PILLARS = [
  { id: "life",    name: "Beacon Life",    color: "#2A7F6F", description: "Rebuilds personal capacity, confidence, identity, and resilience in a world changing faster than most people can absorb." },
  { id: "work",    name: "Beacon Work",    color: "#1A5C6B", description: "Helps people adapt their skills, workflows, and professional value for AI-era employment — augmentation, repositioning, and survival with dignity." },
  { id: "venture", name: "Beacon Venture", color: "#B8860B", description: "Creates resilient income through solopreneurship, digital products, and practical ventures — including the Beacon Trading financial sovereignty track." },
  { id: "systems", name: "Beacon Systems", color: "#4A3728", description: "Installs private, trusted, AI-enabled operations for founders and small organizations — including Phoenix, Odysseus, and the full Beacon infrastructure stack." },
  { id: "labs",    name: "Beacon Labs",    color: "#5C3A6B", description: "Tests, documents, and proves the tools, methods, and case studies that power the ecosystem. The Signal Check, research layer, and public proof surface." },
];

const ECOSYSTEM = [
  { name: "Beacon Momentum",  domain: "beaconmomentum.com",          role: "Umbrella brand and five-pillar education hub" },
  { name: "Beacon Labs",      domain: "beaconlabs.ai",               role: "Signal Check, AI audit, and research delivery" },
  { name: "Beacon Trading",   domain: "beacontrading.ai",            role: "Financial sovereignty and market literacy academy" },
  { name: "Hollow Threads",   domain: "hollowthreads.store",          role: "Alternative lifestyle apparel brand — dark-aesthetic, made-to-order fashion for the beautifully complex" },
  { name: "The Void",         domain: "hollowthreads.store/discord",  role: "Hollow Threads' Discord community — the home of the brand's alt-lifestyle audience" },
];

// ─── Shared style tokens ───────────────────────────────────────────────────────
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Outfit', system-ui, sans-serif";
const body  = "'Lora', Georgia, serif";
const cream = "#FAF8F4";
const ink   = "#2C2416";
const muted = "#6B5E4E";
const teal  = "#1A5C6B";
const amber = "#B8860B";
const sand  = "#C4A882";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: cream, fontFamily: body }}>
      <SharedNav />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "520px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src={ABOUT_HERO_IMG}
          alt="Beacon Momentum — lighthouse at golden hour"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(28,22,14,0.94) 30%, rgba(28,22,14,0.45) 75%, rgba(28,22,14,0.15) 100%)",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem", paddingTop: "8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: sand, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: sand }}>The Beacon Story</span>
          </div>
          <h1 style={{
            fontFamily: serif, fontWeight: 600,
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: cream, marginBottom: "1.5rem", maxWidth: "700px",
          }}>
            Built in the storm.
            <span style={{ display: "block", color: sand, fontStyle: "italic", marginTop: "0.25rem" }}>For the people still in it.</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(250,248,244,0.72)", maxWidth: "580px", lineHeight: 1.8 }}>
            Beacon Momentum is the AI-era human capability and operations company. Practical, not theoretical. Built for people who have been through something real and need tools that work in the actual world — not a stage-managed version of it.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER'S STATEMENT — "Why Beacon Exists" ────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          {/* Lighthouse hero icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <img
              src="/icons/beacon-logo-hero.webp"
              alt="Beacon Momentum lighthouse"
              style={{ width: "clamp(180px, 28vw, 320px)", height: "auto", display: "block" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>Founder's Statement</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            Why Beacon Exists
          </h2>

          {/* Part I */}
          <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", color: ink, lineHeight: 1.4, marginBottom: "2.5rem", fontStyle: "italic" }}>
            I see you.
          </p>
          {[
            "Not the version the algorithm shows other people. Not the label someone else put on you. Not the number in a system that decided what you were worth a long time ago and stopped paying attention.",
            "I see the one who gets up anyway. Who keeps building when the math doesn't add up. Who has watched the people in charge make decision after decision that benefited them and cost you — and who has done the math on that too, quietly, and knows exactly what it adds up to.",
          ].map((para, i) => (
            <p key={i} style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>{para}</p>
          ))}

          <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: ink, lineHeight: 1.5, marginBottom: "1.5rem", fontStyle: "italic" }}>
            You are not imagining it.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "2.5rem" }}>
            The systems that were supposed to serve you — the economy, healthcare, the markets, the institutions of government — were quietly rewritten, over decades, by people who understood a simple thing: if you control the rules, you never have to win fairly. Money was untethered from anything real. Courts were stacked. Supply lines were bought. And whenever anyone got close to asking the right question, the noise got loud enough to drown it out.
          </p>

          {/* Divider */}
          <div style={{ borderLeft: "4px solid #1A5C6B", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: ink, lineHeight: 1.5, fontStyle: "italic", marginBottom: "1.25rem" }}>
              I know because I lived it.
            </p>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
              I was born into the tail end of an America that still believed the promise — work hard, serve faithfully, keep your word, and you will have a place. I served in the military. I became a prisoner to protect people I had a duty to protect, over my own freedom. I came home and built ministries for people the system had written off — people with records, people who needed someone to hand them a door instead of a wall.
            </p>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem" }}>
              I have watched ordinary people of extraordinary character get ground down — not by their own failures, but by systems designed to grind them down. And I have spent my life looking for the lever that could change the equation.
            </p>
          </div>

          <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: ink, lineHeight: 1.4, fontStyle: "italic" }}>
            This is the moment I've been waiting for.
          </p>
          <p style={{ marginTop: "2rem", fontFamily: sans, fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: muted }}>
            — Bob, Founder, Beacon Momentum
          </p>
        </div>
      </section>

      {/* ── 3. THE LEVER HAS ARRIVED ─────────────────────────────────────────── */}
      <section style={{ background: "#0A1628", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>The Shift</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            The Lever Has Arrived
          </h2>
          {[
            "For fifty years, the tools that create leverage — reach, distribution, production, analysis — were concentrated in the hands of the few. Not because ordinary people couldn't use them. Because the price of admission was set deliberately beyond their reach.",
            "That is ending.",
            "The AI generation is not a tech story. It is a power story. For the first time in modern history, the tools that used to require a team of fifty and a seven-figure budget are available to anyone willing to learn to use them. One person with the right knowledge can now multiply their effort a hundred-thousand-fold. Not metaphorically. Literally.",
            "The people who held the leverage know this. They are moving fast to capture these tools too — to wrap them in subscriptions, lock them behind enterprise contracts, and make the learning curve steep enough that most people quit before they start.",
          ].map((para, i) => (
            <p key={i} style={{
              color: i === 1 ? cream : "rgba(250,248,244,0.7)",
              fontFamily: i === 1 ? serif : body,
              fontWeight: i === 1 ? 700 : 400,
              fontStyle: i === 1 ? "italic" : "normal",
              fontSize: i === 1 ? "clamp(1.5rem, 3vw, 2rem)" : "1.05rem",
              lineHeight: i === 1 ? 1.3 : 1.9,
              marginBottom: "1.75rem",
            }}>{para}</p>
          ))}
          <div style={{ borderTop: "1px solid rgba(250,248,244,0.15)", paddingTop: "2rem", marginTop: "0.5rem" }}>
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: amber, lineHeight: 1.4, fontStyle: "italic" }}>
              Beacon Momentum exists to make sure that does not happen.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE ARE BUILDING ──────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>What We Are Building</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Not a platform. A community with a purpose.
          </h2>
          {[
            "Beacon is not a software company. Not a content platform. Not another course teaching you a tool that will be obsolete in eighteen months.",
            "Beacon is a community of people who have decided the feeling of being invisible is a lie — and who are learning, together, to use the most powerful tools in human history to build something real.",
            "We teach the tools. More than that, we teach the thinking. How to evaluate what is worth building. How to construct an offer that genuinely serves people. How to build a business that compounds — one that creates real value for real people and earns their loyalty because it deserves it. Not one that extracts. Not one that manipulates.",
          ].map((para, i) => (
            <p key={i} style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>{para}</p>
          ))}
          <div style={{ background: "#F5F1EA", border: "1px solid #E8E4DC", padding: "2rem 2.5rem", marginTop: "2rem" }}>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: "1rem", marginBottom: "1rem" }}>
              We serve the entrepreneur starting over. The small business owner squeezed by every cost increase and algorithm change, still standing. The person with a record who was told their options were limited. The veteran who came home to a country that had been rearranged while they were gone. The parent who wants to leave their children something the system cannot take away.
            </p>
            <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.1rem", color: ink, lineHeight: 1.6, fontStyle: "italic" }}>
              These are Beacon's people. Not because they are victims — they are not. Because they are the ones with the most to gain when the leverage shifts, and the most reason to use it well.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. THE BELIEF AT THE CENTER ──────────────────────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>The Belief</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            The Belief at the Center
          </h2>
          {[
            "I believe in the collective good — not in the way that asks you to surrender your independence, but in the way that recognizes we rise together or we do not rise at all. The tools of this moment are powerful enough to lift individuals and communities at the same time. That is not a contradiction. It is the whole point.",
            "The old world built systems that demanded your compliance in exchange for a minimal existence. The new world — the one we are building — offers the knowledge, the tools, and the community to secure your own future and the future of the people you are responsible for.",
          ].map((para, i) => (
            <p key={i} style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>{para}</p>
          ))}
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", color: ink, lineHeight: 1.4, fontStyle: "italic", marginBottom: "1.25rem" }}>
              You have been invisible long enough.
            </p>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
              The door is open. The tools are real. The knowledge of how to use them is the only thing that ever stood between you and the leverage you were told was not for you. That is what Beacon is for.
            </p>
            <p style={{ fontFamily: serif, fontWeight: 700, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: teal, lineHeight: 1.4, fontStyle: "italic" }}>
              Beacon is here to change that.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. WHO WE SERVE ──────────────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>Who We Serve</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            Built for people navigating real transitions.
          </h2>
          <p style={{ color: muted, lineHeight: 1.8, fontSize: "1rem", maxWidth: "680px", marginBottom: "3rem" }}>
            Beacon was not built for people who have it figured out. It was built for people in the middle of a transition — career disruption, life rebuild, financial reset, or the quiet crisis of watching the world change faster than anyone can absorb. If you have been through something hard and are still standing, you are exactly who this is for.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                label: "Veterans & Service Members",
                body: "You served with discipline and purpose. The civilian world does not always know what to do with that. Beacon does. We translate military-grade capability into AI-era economic power.",
                accent: teal,
              },
              {
                label: "People Rebuilding After Setback",
                body: "Incarceration, financial collapse, health crisis, or any of the hundred ways life can take the floor out from under you. Beacon is not a sympathy platform. It is a rebuild platform. There is a difference.",
                accent: "#2A7F6F",
              },
              {
                label: "Founders & Solopreneurs",
                body: "You are building something real with limited resources and no corporate safety net. Beacon Systems and Beacon Venture exist specifically for you — AI-enabled operations without enterprise overhead.",
                accent: amber,
              },
              {
                label: "Professionals in Transition",
                body: "Your industry is changing. Your role may not exist in five years. Beacon Work and Beacon Life help you adapt, reposition, and remain economically active — on your terms, not your employer's.",
                accent: "#4A3728",
              },
              {
                label: "Small Organizations",
                body: "Nonprofits, ministries, community organizations, and small businesses that need AI-enabled operations but cannot afford enterprise solutions. Beacon Systems was built for exactly this gap.",
                accent: "#5C3A6B",
              },
              {
                label: "Anyone Who Needs Real Over Polished",
                body: "If you are tired of gurus who have never lost anything telling you how to win, you are in the right place. Beacon's credibility is built on lived experience, not a highlight reel.",
                accent: teal,
              },
            ].map((item) => (
              <div key={item.label} style={{ padding: "1.75rem", border: "1px solid #E8E4DC", background: "#FFFFFF" }}>
                <div style={{ width: "3px", height: "2rem", background: item.accent, marginBottom: "1.25rem" }} />
                <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.2rem", color: ink, marginBottom: "0.75rem" }}>{item.label}</h3>
                <p style={{ color: muted, fontSize: "0.875rem", lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. THE WATCH MANIFESTO ───────────────────────────────────────────── */}
      <section style={{ background: "#0A1628", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>The Watch</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
            The Lighthouse Is Lit.<br />
            <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.72)" }}>Join Us at the Watch.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              "Beacon is not a course platform. It is a team on watch — a collective of people who have decided to navigate the AI transition together, with clear eyes and practical tools.",
              "We do not promise transformation. We build the conditions for it. The lighthouse does not move the ship. It shows the rocks. You do the sailing.",
              "Every member, every mentor, every piece of content we publish is part of the same operating premise: that the people who stay human, stay capable, and stay economically alive through this transition will be the ones who chose to navigate it deliberately — not the ones who waited for it to pass.",
            ].map((para, i) => (
              <p key={i} style={{ fontFamily: body, fontWeight: 400, fontSize: "1rem", lineHeight: 1.85, color: "rgba(250,248,244,0.65)" }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ORIGIN TIMELINE ───────────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>The Journey</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
            Years of living. Months of building.
          </h2>
          <div style={{ position: "relative" }}>
            {TIMELINE.map((item, i) => (
              <div key={item.period} style={{ display: "flex", gap: "2rem", paddingBottom: i < TIMELINE.length - 1 ? "3.5rem" : "0", position: "relative" }}>
                {i < TIMELINE.length - 1 && (
                  <div style={{ position: "absolute", left: "19px", top: "40px", bottom: 0, width: "1px", background: "#E8E4DC" }} />
                )}
                <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: teal, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4px" }}>
                  <span style={{ color: cream, fontSize: "0.75rem", fontWeight: 700, fontFamily: sans }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: sans, fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: teal }}>{item.period}</span>
                    <span style={{ fontFamily: sans, fontWeight: 300, fontSize: "0.7rem", color: "#C4B8A8" }}>· {item.date}</span>
                  </div>
                  <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.5rem", color: ink, marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>{item.headline}</h3>
                  <p style={{ color: muted, lineHeight: 1.8, fontSize: "0.95rem" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FIVE PILLARS ──────────────────────────────────────────────────── */}
      <section style={{ background: "#2C2416", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: sand, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: sand }}>The Architecture</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Five pillars. One mission.
          </h2>
          <p style={{ color: "#A89880", marginBottom: "3rem", maxWidth: "560px", lineHeight: 1.75, fontSize: "0.95rem" }}>
            Each pillar is an answer to a real question from a real person navigating a real transition.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {PILLARS.map((pillar) => (
              <Link key={pillar.id} href={`/pillar/${pillar.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ padding: "1.75rem", border: "1px solid rgba(255,255,255,0.1)", transition: "border-color 0.25s", cursor: "pointer", height: "100%" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  <div style={{ marginBottom: "1.25rem" }}><PillarIcon pillarId={pillar.id} size={40} /></div>
                  <h3 style={{ fontFamily: serif, fontWeight: 600, fontSize: "1.25rem", color: cream, marginBottom: "0.75rem" }}>{pillar.name}</h3>
                  <p style={{ color: "#8A8070", fontSize: "0.85rem", lineHeight: 1.7 }}>{pillar.description}</p>
                  <div style={{ marginTop: "1.25rem", fontFamily: sans, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: pillar.color }}>
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. PRACTICAL NOT THEORETICAL ───────────────────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>The Beacon Difference</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Practical. Not theoretical.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <p style={{ color: muted, lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.5rem" }}>
                Every tool, curriculum, and framework in Beacon has been tested in conditions that matter — not in a lab, not in a mastermind, but in the actual lives of people navigating real transitions with real stakes.
              </p>
              <p style={{ color: muted, lineHeight: 1.85, fontSize: "1rem", marginBottom: "1.5rem" }}>
                The founder spent 14 years behind the wire teaching, counseling, and learning what actually helps people rebuild. GraceHouse picked people up at prison gates and walked them back into the world. Digital Grandpa reached thousands with non-judgmental, grounded wisdom. Rise & Reclaim tested the community and curriculum model before a single line of Beacon code was written.
              </p>
              <p style={{ color: muted, lineHeight: 1.85, fontSize: "1rem" }}>
                That is not a backstory. That is a quality control process. Beacon's methods work because they have been proven in the hardest possible conditions — not the easiest.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { stat: "Lifetime", label: "of experience in human transformation" },
                { stat: "1,200+", label: "lives touched before Beacon was built" },
                { stat: "Presidential", label: "1000 Points of Light Award recipient" },
                { stat: "Zero", label: "theoretical frameworks untested in the real world" },
              ].map((item) => (
                <div key={item.stat} style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem", background: cream, border: "1px solid #E8E4DC" }}>
                  <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "1.75rem", color: amber, minWidth: "120px", lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ color: muted, fontSize: "0.875rem", lineHeight: 1.5 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. OPERATING DOCTRINE ───────────────────────────────────────────── */}
      <section style={{ background: cream, padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>Operating Doctrine</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            How Beacon grows
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { word: "Earn", body: "Build trust through public usefulness before asking for money. Education, proof, and demonstrated competence come before any transaction." },
              { word: "Prove", body: "Document what works, what fails, and what can be repeated. Beacon Labs turns every experiment into a case study and every case study into a curriculum." },
              { word: "Amplify", body: "Paid ads may eventually amplify what is already working. They will not be the primary engine of market validation. We earn attention before we buy it." },
            ].map((item) => (
              <div key={item.word} style={{ background: "#F5F1EA", padding: "2rem", border: "1px solid #E8E4DC" }}>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: "3rem", color: amber, marginBottom: "1rem" }}>{item.word}</div>
                <p style={{ color: muted, lineHeight: 1.75, fontSize: "0.9rem" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "2rem", margin: 0 }}>
            <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: ink, lineHeight: 1.55, fontStyle: "italic" }}>
              "We will not buy our way out of unclear positioning. We will earn trust through public usefulness, then amplify what the market has already proven it wants."
            </p>
            <footer style={{ marginTop: "1rem", fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: muted }}>
              Beacon Operating Doctrine
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── 12. ECOSYSTEM TABLE ──────────────────────────────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>The Ecosystem</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Every property. One mission.
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: body }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DC" }}>
                  {["Property", "Domain", "Mission Role"].map((h) => (
                    <th key={h} style={{ textAlign: "left", paddingBottom: "0.75rem", paddingRight: "2rem", fontFamily: sans, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ECOSYSTEM.map((item) => (
                  <tr key={item.name} style={{ borderBottom: "1px solid #E8E4DC" }}>
                    <td style={{ padding: "1rem 2rem 1rem 0", fontFamily: serif, fontWeight: 600, fontSize: "1.05rem", color: ink, whiteSpace: "nowrap" }}>{item.name}</td>
                    <td style={{ padding: "1rem 2rem 1rem 0", fontFamily: sans, fontSize: "0.75rem", letterSpacing: "0.04em", color: teal, whiteSpace: "nowrap" }}>{item.domain}</td>
                    <td style={{ padding: "1rem 0", color: muted, fontSize: "0.9rem", lineHeight: 1.6 }}>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 13. CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: teal, padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
            Find your path in Beacon.
          </h2>
          <p style={{ color: "rgba(250,248,244,0.75)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem" }}>
            The Pathfinder Assessment takes five minutes and routes you to the pillar that matches your current situation — not where you want to be, but where you are right now.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assessment" style={{
              fontFamily: sans, fontWeight: 500, fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 2.5rem", background: cream, color: teal, textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Take the Assessment →
            </Link>
            <a href="https://beaconlabs.ai" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: sans, fontWeight: 400, fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 2.5rem", border: "2px solid rgba(250,248,244,0.5)", color: cream, textDecoration: "none",
            }}>
              Visit Beacon Labs
            </a>
          </div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
