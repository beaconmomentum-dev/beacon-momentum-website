/**
 * Beacon Momentum — About Page (/about)
 * Design: Deep Water Editorial / Quiet Authority
 * Full Beacon narrative: 12-month origin story, five-pillar evolution,
 * operating doctrine, ecosystem overview, and founding philosophy.
 */

import { Link } from "wouter";

const TIMELINE = [
  {
    period: "The Foundation",
    date: "Early 2025",
    headline: "Building infrastructure before brand",
    body: "Beacon Momentum began not as a brand but as a set of operational questions: How do you build a private AI operations layer for a small organization? How do you help people navigate a transition that no one is explaining honestly? The first year was infrastructure — Phoenix, the command center, the GHL CRM architecture, the Digital Ocean droplets, the GitHub repositories. The brand came second. The systems came first.",
  },
  {
    period: "The Lesson",
    date: "Mid 2025",
    headline: "What $20,000 in Meta ads taught us",
    body: "Hollow Threads, the creative commerce brand built for family, spent over $20,000 in Meta advertising without selling a single shirt. That experience became one of the most important strategic inputs in Beacon's history. It confirmed what the data already showed: paid attention is not earned trust. Cold traffic does not convert belief. The next Beacon growth engine would be built on education, proof, and public usefulness — not on ad spend. That lesson is now embedded in the Beacon operating doctrine.",
  },
  {
    period: "The Architecture",
    date: "Late 2025",
    headline: "Five pillars emerge from real questions",
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
  { id: "life",     name: "Beacon Life",     color: "#2A7F6F", description: "Rebuilds personal capacity, confidence, identity, and resilience in a world changing faster than most people can absorb." },
  { id: "work",     name: "Beacon Work",     color: "#1A5C6B", description: "Helps people adapt their skills, workflows, and professional value for AI-era employment — augmentation, repositioning, and survival with dignity." },
  { id: "venture",  name: "Beacon Venture",  color: "#B8860B", description: "Creates resilient income through solopreneurship, digital products, and practical ventures — including the Beacon Trading financial sovereignty track." },
  { id: "systems",  name: "Beacon Systems",  color: "#4A3728", description: "Installs private, trusted, AI-enabled operations for founders and small organizations — including Phoenix, Odysseus, and the full Beacon infrastructure stack." },
  { id: "labs",     name: "Beacon Labs",     color: "#5C3A6B", description: "Tests, documents, and proves the tools, methods, and case studies that power the ecosystem. The Signal Check, research layer, and public proof surface." },
];

const ECOSYSTEM = [
  { name: "Beacon Momentum",  domain: "beaconmomentum.com",         role: "Umbrella brand and five-pillar education hub" },
  { name: "Beacon Labs",      domain: "beaconlabs.ai",              role: "Signal Check, AI audit, and research delivery" },
  { name: "Beacon Trading",   domain: "beacontrading.ai",           role: "Financial sovereignty and market literacy academy" },
  { name: "Phoenix",          domain: "phoenix.beaconmomentum.com", role: "Internal AI operations command center" },
  { name: "Digital Grandpa",  domain: "digitalgrandpa.com",          role: "AI literacy for older adults and families" },
  { name: "Hollow Threads",   domain: "holothreads.com",            role: "Organic-first creative commerce lab" },
  { name: "Cask & Cuisine",   domain: "caskandcuisine.com",         role: "Food, drink, and lifestyle content brand" },
  { name: "Vitality",         domain: "vitalyears.com",             role: "Health and longevity content for the AI era" },
  { name: "The Void",         domain: "Discord community",          role: "Private Beacon community and accountability space" },
];

function Nav() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(250,248,244,0.97)",
      borderBottom: "1px solid #E8E4DC",
      backdropFilter: "blur(8px)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{ width: "1.5rem", height: "1.5rem", background: "#1A5C6B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "#FAF8F4" }}>◈</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.05rem", color: "#2C2416", letterSpacing: "-0.01em" }}>Beacon Momentum</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/#pillars" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B5E4E", textDecoration: "none" }}>
            The Five Pillars
          </Link>
          <Link href="/assessment" style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.04em", padding: "0.5rem 1.25rem", background: "#1A5C6B", color: "#FAF8F4", textDecoration: "none" }}>
            Find Your Path
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F4", fontFamily: "'Lora', Georgia, serif" }}>
      <Nav />

      {/* Hero */}
      <section style={{ background: "#2C2416", padding: "7rem 0 5rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
            <span style={{ width: "2rem", height: "1px", background: "#C4A882", display: "inline-block" }} />
            <span style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A882" }}>The Beacon Story</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FAF8F4", marginBottom: "1.5rem" }}>
            Built in the storm.
            <span style={{ display: "block", color: "#C4A882", fontStyle: "italic", marginTop: "0.25rem" }}>For the people still in it.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#A89880", maxWidth: "640px", lineHeight: 1.8 }}>
            Beacon Momentum is the AI-era human capability and operations company. We help people and small organizations remain human, capable, economically active, and sovereign through the AI transition — without hype, shame, spam, or guru dependency.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ background: "#F5F1EA", padding: "5rem 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <blockquote style={{ borderLeft: "4px solid #1A5C6B", paddingLeft: "2rem", margin: 0 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#2C2416", lineHeight: 1.5, fontStyle: "italic", marginBottom: "1.25rem" }}>
              "Beacon exists to help people and small organizations remain human, capable, economically active, and sovereign through the AI transition."
            </p>
            <footer style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 400, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B5E4E" }}>
              Beacon Momentum Mission Statement
            </footer>
          </blockquote>
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
            Twelve months of building toward this moment
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
                <div style={{
                  padding: "1.75rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "border-color 0.25s",
                  cursor: "pointer",
                  height: "100%",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: pillar.color, marginBottom: "1.25rem" }} />
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

      {/* Footer */}
      <footer style={{ background: "#2C2416", padding: "2.5rem 0", borderTop: "1px solid #3A3020" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <span style={{ width: "1.5rem", height: "1.5rem", background: "#1A5C6B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "#FAF8F4" }}>◈</span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1rem", color: "#FAF8F4" }}>Beacon Momentum</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Assessment", href: "/assessment" },
              { label: "Beacon Trading", href: "/beacon-trading" },
              { label: "Privacy", href: "/privacy" },
            ].map((l) => (
              <Link key={l.label} href={l.href} style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(250,248,244,0.45)", textDecoration: "none", letterSpacing: "0.04em" }}>
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ fontFamily: "'Outfit', system-ui, sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "rgba(250,248,244,0.25)", letterSpacing: "0.04em" }}>
            Earn · Prove · Amplify
          </p>
        </div>
      </footer>
    </div>
  );
}
