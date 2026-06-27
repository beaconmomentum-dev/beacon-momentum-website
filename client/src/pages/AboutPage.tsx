/**
 * Beacon Momentum — About Page (/about)
 * Design: Deep Water Editorial / Quiet Authority
 * Sections:
 *   1. Hero — lighthouse, "Built in the storm. For the people still in it."
 *   2. Founder's Statement — "Why Beacon Exists" (full text, Bob's voice)
 *   3. The Lever Has Arrived — AI power shift framing (Watch Brief 04 integration)
 *   4. What We Are Building — community and mission
 *   5. The Belief at the Center — values close
 *   6. Who We Serve — six audience cards
 *   7. Origin Timeline — lived history
 *   8. Ecosystem Table
 *   9. CTA
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
    period: "The Foundation",
    date: "2025",
    headline: "Building infrastructure before brand.",
    body: "Beacon Momentum began not as a brand but as a set of operational questions: How do you build a private AI operations layer for a small organization? How do you help people navigate a transition that no one is explaining honestly? The infrastructure came first: Phoenix, the command center, the GHL CRM architecture, the Digital Ocean droplets, the GitHub repositories. The Beacon Momentum identity emerged from that foundation.",
  },
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
            Beacon Momentum exists to place the leverage of AI in the hands of the people the system forgot to count. Practical, not theoretical. Built for people who have been through something real and need tools that work in the actual world.
          </p>
        </div>
      </section>

      {/* ── 2. FOUNDER'S STATEMENT — "Why Beacon Exists" ────────────────────── */}
      <section style={{ background: "#F5F1EA", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
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

          <div style={{ borderLeft: "4px solid #1A5C6B", paddingLeft: "2rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: ink, lineHeight: 1.5, fontStyle: "italic", marginBottom: "1.25rem" }}>
              I know because I lived it.
            </p>
            <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.25rem" }}>
              I served in the military. I became a prisoner to protect people I had a duty to protect, over my own freedom. I came home and built ministries for the people the system wrote off — the ones with records, the ones the institutions had decided were finished. I have watched ordinary people of extraordinary character get ground down — not by their own failures, but by systems designed to grind them down.
            </p>
          </div>

          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            I have spent my entire life looking for the lever that could change that equation. I have found it.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "1.5rem" }}>
            My purpose in the time I have left is this: to place that lever in the hands of every person who was told it was not for them.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.05rem", marginBottom: "3rem" }}>
            The door is open. The lighthouse is lit. And I am not leaving until the work is done.
          </p>

          <div style={{ borderTop: "1px solid rgba(107,94,78,0.2)", paddingTop: "2rem" }}>
            <p style={{ fontFamily: serif, fontSize: "1.5rem", fontStyle: "italic", color: ink, marginBottom: "0.5rem" }}>Bob Burr</p>
            <p style={{ fontFamily: sans, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: muted }}>Founder, Beacon Momentum</p>
          </div>
        </div>
      </section>

      {/* ── 3. THE LEVER HAS ARRIVED — AI POWER SHIFT ───────────────────────── */}
      <section style={{ padding: "6rem 0", background: cream }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: amber, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: amber }}>The Intelligence Arbitrage</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
            The lever is here. And the cost of intelligence is collapsing.
          </h2>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            For all of human history, the constraint on how much value you could create was fundamentally the number of capable brains and the hours in the day. The market paid 3,000 times more for what a brain produced than it cost in energy to run it. That gap was untouchable.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            That is what just changed.
          </p>
          <p style={{ color: muted, lineHeight: 1.9, fontSize: "1.1rem", marginBottom: "2.5rem" }}>
            Artificial intelligence is the machine that closes the gap. For the first time, you can manufacture intelligence out of electricity. The moment that becomes true, the economy stops being capped by how many smart humans exist and starts being capped by something completely physical: energy. The surplus value does not vanish; it migrates. First to the AI owners, and then to the consumer.
          </p>

          <div style={{ background: "#F5F1EA", padding: "2.5rem", borderRadius: "8px", borderLeft: `4px solid ${amber}` }}>
            <h3 style={{ fontFamily: serif, fontSize: "1.5rem", color: ink, marginBottom: "1rem" }}>You do not need permission to build a local swarm.</h3>
            <p style={{ color: muted, lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "0" }}>
              While the tech giants fight over massive data centers, operators are building local AI swarms. Using tools like Claude Code, businesses are running entirely on AI workers without writing a single line of code. The people who win in this transition are the ones who stop being buyers of intelligence and start being distributors of it. That is what Beacon teaches you how to do.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHO WE SERVE ─────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", background: "#F5F1EA" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "600px", marginX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
              <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>The Community</span>
              <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: ink, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Who is the lighthouse for?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { title: "The Veteran", desc: "Who came home to a country that had rearranged itself while they were gone, and who needs a mission that honors their capacity." },
              { title: "The Formerly Incarcerated", desc: "Who was told their options were permanently limited by a record, but who carries the resilience required to build something real." },
              { title: "The Small Business Owner", desc: "Who is still standing after every system tried to squeeze them out, and who needs the leverage to stop fighting the algorithm." },
              { title: "The Parent", desc: "Who wants to leave their children something that cannot be taken away by a corporate restructuring or an economic downturn." },
              { title: "The 63-Year-Old", desc: "Who has been told the window has closed, but who knows their earned wisdom is exactly what the market is starving for." },
              { title: "The Builder", desc: "Who sees the AI transition not as a threat, but as the greatest redistribution of power in history, and wants the tools to capture it." }
            ].map((audience, i) => (
              <div key={i} style={{ background: cream, padding: "2.5rem", borderRadius: "8px", border: "1px solid rgba(107,94,78,0.1)" }}>
                <h3 style={{ fontFamily: serif, fontSize: "1.4rem", color: ink, marginBottom: "1rem" }}>{audience.title}</h3>
                <p style={{ color: muted, lineHeight: 1.7, fontSize: "1rem", margin: 0 }}>{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ORIGIN TIMELINE ──────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", background: cream }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: sand, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: sand }}>The Architecture of Legacy</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "4rem", letterSpacing: "-0.02em" }}>
            The path to the lighthouse.
          </h2>

          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: "rgba(107,94,78,0.2)" }} />
            
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "4rem" }}>
                <div style={{ position: "absolute", left: "-2.35rem", top: "0.4rem", width: "0.75rem", height: "0.75rem", borderRadius: "50%", background: cream, border: `2px solid ${amber}` }} />
                <div style={{ fontFamily: sans, fontSize: "0.85rem", color: amber, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {item.period} <span style={{ color: "rgba(107,94,78,0.4)", margin: "0 0.5rem" }}>|</span> {item.date}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: "1.5rem", color: ink, marginBottom: "1rem" }}>{item.headline}</h3>
                <p style={{ color: muted, lineHeight: 1.8, fontSize: "1.05rem", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ECOSYSTEM TABLE ──────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", background: "#F5F1EA" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: teal, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: teal }}>The Ecosystem</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: ink, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            The infrastructure we built.
          </h2>

          <div style={{ background: cream, borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(107,94,78,0.1)" }}>
            {ECOSYSTEM.map((prop, i) => (
              <div key={i} style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 2fr", 
                gap: "2rem", 
                padding: "1.5rem 2rem",
                borderBottom: i !== ECOSYSTEM.length - 1 ? "1px solid rgba(107,94,78,0.1)" : "none",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontFamily: serif, fontSize: "1.25rem", color: ink, fontWeight: 600 }}>{prop.name}</div>
                  <div style={{ fontFamily: sans, fontSize: "0.85rem", color: teal, marginTop: "0.25rem" }}>{prop.domain}</div>
                </div>
                <div style={{ color: muted, fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {prop.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 0", background: ink, textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: cream, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            The door is open.
          </h2>
          <p style={{ color: "rgba(250,248,244,0.7)", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: "2.5rem" }}>
            If you are ready to stop playing by the rules of an economy that no longer exists, we are ready to show you the lever.
          </p>
          <Link href="/join">
            <a style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: sand, color: ink,
              fontFamily: sans, fontWeight: 500, fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase",
              padding: "1rem 2.5rem", borderRadius: "4px", textDecoration: "none",
              transition: "all 0.2s ease"
            }}>
              Join The Watch
            </a>
          </Link>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
