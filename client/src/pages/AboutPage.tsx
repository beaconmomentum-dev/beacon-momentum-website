/**
 * Beacon Momentum — About Page (/about)
 * Design: Deep Water Editorial / Quiet Authority
 * Full Beacon narrative: origin story, five-pillar architecture,
 * operating doctrine, ecosystem overview, Watch manifesto.
 * Uses SharedNav and SharedFooter for brand congruence.
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
  { name: "Hollow Threads",   domain: "hollowthread.store",          role: "Alternative lifestyle apparel brand — dark-aesthetic, made-to-order fashion for the beautifully complex" },
  { name: "The Void",         domain: "hollowthread.store/discord",  role: "Hollow Threads' Discord community — the home of the brand's alt-lifestyle audience" },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F4", fontFamily: "'Lora', Georgia, serif" }}>
      <SharedNav />

      {/* Hero — lighthouse image with dark overlay */}
      <section style={{ position: "relative", minHeight: "480px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <img
          src={ABOUT_HERO_IMG}
          alt="Beacon Momentum — lighthouse at golden hour"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(28,22,14,0.92) 30%, rgba(28,22,14,0.4) 80%, rgba(28,22,14,0.15) 100%)",
        }} />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "5rem", paddingTop: "8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#C4A882", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A882" }}>The Beacon Story</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2.8rem, 6vw, 5rem)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: "#FAF8F4", marginBottom: "1.5rem",
            maxWidth: "700px",
          }}>
            Built in the storm.
            <span style={{ display: "block", color: "#C4A882", fontStyle: "italic", marginTop: "0.25rem" }}>For the people still in it.</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(250,248,244,0.72)", maxWidth: "580px", lineHeight: 1.8 }}>
            Beacon Momentum is the AI-era human capability and operations company. We help people and small organizations remain human, capable, economically active, and sovereign through the AI transition — without hype, shame, spam, or guru dependency.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <blockquote style={{ borderLeft: "4px solid #1A5C6B", paddingLeft: "2rem", margin: 0 }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: "#2C2416", lineHeight: 1.5, fontStyle: "italic", marginBottom: "1.25rem",
            }}>
              "Beacon exists to help people and small organizations remain human, capable, economically active, and sovereign through the AI transition."
            </p>
            <footer style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B5E4E" }}>
              Beacon Momentum Mission Statement
            </footer>
          </blockquote>
        </div>
      </section>

      {/* The Watch Manifesto */}
      <section style={{ background: "#0A1628", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "var(--beacon-amber, #C8860A)", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--beacon-amber, #C8860A)" }}>The Watch</span>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#FAF8F4", marginBottom: "2rem", letterSpacing: "-0.02em",
          }}>
            The Lighthouse Is Lit.<br />
            <em style={{ fontStyle: "italic", color: "rgba(250,248,244,0.72)" }}>Join Us at the Watch.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              "Beacon is not a course platform. It is a team on watch — a collective of people who have decided to navigate the AI transition together, with clear eyes and practical tools.",
              "We do not promise transformation. We build the conditions for it. The lighthouse does not move the ship. It shows the rocks. You do the sailing.",
              "Every member, every mentor, every piece of content we publish is part of the same operating premise: that the people who stay human, stay capable, and stay economically alive through this transition will be the ones who chose to navigate it deliberately — not the ones who waited for it to pass.",
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: 400, fontSize: "1rem",
                lineHeight: 1.85, color: "rgba(250,248,244,0.65)",
              }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Timeline */}
      <section style={{ background: "#FAF8F4", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#1A5C6B", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A5C6B" }}>The Journey</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2416", marginBottom: "3.5rem", letterSpacing: "-0.02em" }}>
            Years of living. Months of building.
          </h2>
          <div style={{ position: "relative" }}>
            {TIMELINE.map((item, i) => (
              <div key={item.period} style={{ display: "flex", gap: "2rem", paddingBottom: i < TIMELINE.length - 1 ? "3.5rem" : "0", position: "relative" }}>
                {i < TIMELINE.length - 1 && (
                  <div style={{ position: "absolute", left: "19px", top: "40px", bottom: 0, width: "1px", background: "#E8E4DC" }} />
                )}
                <div style={{ flexShrink: 0, width: "40px", height: "40px", borderRadius: "50%", background: "#1A5C6B", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4px" }}>
                  <span style={{ color: "#FAF8F4", fontSize: "0.75rem", fontWeight: 700, fontFamily: "'Outfit', system-ui, sans-serif" }}>{i + 1}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A5C6B" }}>{item.period}</span>
                    <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "#C4B8A8" }}>· {item.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.5rem", color: "#2C2416", marginBottom: "0.875rem", letterSpacing: "-0.01em" }}>{item.headline}</h3>
                  <p style={{ color: "#6B5E4E", lineHeight: 1.8, fontSize: "0.95rem" }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section style={{ background: "#2C2416", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#C4A882", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A882" }}>The Architecture</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FAF8F4", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
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
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", color: "#FAF8F4", marginBottom: "0.75rem" }}>{pillar.name}</h3>
                  <p style={{ color: "#8A8070", fontSize: "0.85rem", lineHeight: 1.7 }}>{pillar.description}</p>
                  <div style={{ marginTop: "1.25rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: pillar.color }}>
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Doctrine */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#B8860B", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B" }}>Operating Doctrine</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2416", marginBottom: "3rem", letterSpacing: "-0.02em" }}>
            How Beacon grows
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {[
              { word: "Earn", body: "Build trust through public usefulness before asking for money. Education, proof, and demonstrated competence come before any transaction." },
              { word: "Prove", body: "Document what works, what fails, and what can be repeated. Beacon Labs turns every experiment into a case study and every case study into a curriculum." },
              { word: "Amplify", body: "Paid ads may eventually amplify what is already working. They will not be the primary engine of market validation. We earn attention before we buy it." },
            ].map((item) => (
              <div key={item.word} style={{ background: "#FAF8F4", padding: "2rem", border: "1px solid #E8E4DC" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, fontSize: "3rem", color: "#B8860B", marginBottom: "1rem" }}>{item.word}</div>
                <p style={{ color: "#6B5E4E", lineHeight: 1.75, fontSize: "0.9rem" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <blockquote style={{ borderLeft: "4px solid #B8860B", paddingLeft: "2rem", margin: 0 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#2C2416", lineHeight: 1.55, fontStyle: "italic" }}>
              "We will not buy our way out of unclear positioning. We will earn trust through public usefulness, then amplify what the market has already proven it wants."
            </p>
            <footer style={{ marginTop: "1rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B5E4E" }}>
              Beacon Operating Doctrine
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Ecosystem Table */}
      <section style={{ background: "#FAF8F4", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#1A5C6B", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A5C6B" }}>The Ecosystem</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2416", marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
            Every property. One mission.
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Lora', Georgia, serif" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E4DC" }}>
                  {["Property", "Domain", "Mission Role"].map((h) => (
                    <th key={h} style={{ textAlign: "left", paddingBottom: "0.75rem", paddingRight: "2rem", fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5E4E" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ECOSYSTEM.map((item) => (
                  <tr key={item.name} style={{ borderBottom: "1px solid #E8E4DC" }}>
                    <td style={{ padding: "1rem 2rem 1rem 0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.05rem", color: "#2C2416", whiteSpace: "nowrap" }}>{item.name}</td>
                    <td style={{ padding: "1rem 2rem 1rem 0", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.75rem", letterSpacing: "0.04em", color: "#1A5C6B", whiteSpace: "nowrap" }}>{item.domain}</td>
                    <td style={{ padding: "1rem 0", color: "#6B5E4E", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A5C6B", padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FAF8F4", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
            Find your path in Beacon.
          </h2>
          <p style={{ color: "rgba(250,248,244,0.75)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem" }}>
            The Pathfinder Assessment takes five minutes and routes you to the pillar that matches your current situation — not where you want to be, but where you are right now.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assessment" style={{
              fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 2.5rem", background: "#FAF8F4", color: "#1A5C6B", textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Take the Assessment →
            </Link>
            <a href="https://beaconlabs.ai" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "1rem 2.5rem", border: "2px solid rgba(250,248,244,0.5)", color: "#FAF8F4", textDecoration: "none",
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
