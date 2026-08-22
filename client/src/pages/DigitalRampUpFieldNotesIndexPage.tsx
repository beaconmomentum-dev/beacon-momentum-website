import { ArrowRight, Compass, Layers3 } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { DIGITAL_RAMP_UP_FIELD_NOTES } from "@/data/digitalRampUpFieldNotes";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DigitalRampUpFieldNotesIndexPage() {
  usePageMeta({
    title: "Digital Ramp-Up Field Notes",
    description: "Nine practical public notes on durable capability: work, operating memory, evidence, human review, clear relationships, careful public structures, accountable AI assistance, and better questions before buying into a breakthrough.",
    image: "https://beaconmomentum.com/images/field-notes/field-note-01-start-with-work.jpg",
    url: "/field-notes",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "1180px" }}>
            <p style={eyebrow}>Public Field Notes · Digital Ramp-Up</p>
            <div className="field-notes-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.45fr) minmax(260px, 0.55fr)", gap: "clamp(2rem, 7vw, 6rem)", alignItems: "end" }}>
              <div>
                <h1 style={{ margin: "1rem 0 0", maxWidth: "760px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.35rem, 7vw, 6.55rem)", lineHeight: 0.92, letterSpacing: "-0.05em", fontWeight: 600 }}>The Digital Ramp-Up.</h1>
                <p style={{ maxWidth: "730px", margin: "1.75rem 0 0", color: "rgba(250,248,244,0.76)", fontSize: "1.08rem", lineHeight: 1.85 }}>Nine public notes for making capability more durable: start with the work, keep the record, verify the claim, retain human review, choose a clear relationship, build trust through visible structures, keep AI assistance accountable to the people affected by it, and ask better questions before a breakthrough becomes a buy.</p>
              </div>
              <div style={{ borderLeft: "1px solid rgba(232,160,32,0.52)", paddingLeft: "1.35rem" }}>
                <Layers3 size={20} color="var(--beacon-amber-light)" />
                <p style={{ margin: "0.9rem 0 0", color: "#FAF8F4", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.85rem", lineHeight: 1.05 }}>A working notebook, not a promise machine.</p>
                <p style={{ margin: "0.7rem 0 0", color: "rgba(250,248,244,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>Free public editorial work. No membership or service enrollment is required to read it.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(3.5rem, 8vw, 6.5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1180px" }}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: "1rem", marginBottom: "2.25rem" }}>
              <div>
                <p style={{ ...eyebrow, color: "var(--beacon-teal)" }}>The public notebook</p>
                <h2 style={{ margin: "0.65rem 0 0", color: "var(--beacon-charcoal)", fontSize: "clamp(2.2rem, 4vw, 3.65rem)", lineHeight: 0.98 }}>Nine practices that travel.</h2>
              </div>
              <Compass size={23} color="var(--beacon-amber)" aria-hidden="true" />
            </div>
            <div className="field-notes-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1px", background: "var(--beacon-parchment-dark)", border: "1px solid var(--beacon-parchment-dark)" }}>
              {DIGITAL_RAMP_UP_FIELD_NOTES.map((note) => (
                <article key={note.slug} style={{ background: "var(--beacon-parchment)", display: "grid", gridTemplateColumns: "minmax(170px, 0.72fr) minmax(0, 1.28fr)", minHeight: "280px" }} className="field-notes-index-card">
                  <img src={note.image} alt={note.alt} style={{ width: "100%", height: "100%", minHeight: "205px", objectFit: "cover", background: "var(--beacon-teal-pale)" }} />
                  <div style={{ padding: "clamp(1.4rem, 3vw, 2rem)", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <p style={{ ...eyebrow, color: note.accent }}>{note.number} · {note.readTime}</p>
                    <h3 style={{ margin: "0.7rem 0 0", color: "var(--beacon-charcoal)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.02 }}>{note.title}</h3>
                    <p style={{ margin: "0.85rem 0 0", color: "var(--beacon-charcoal-mid)", fontSize: "0.94rem", lineHeight: 1.68 }}>{note.excerpt}</p>
                    <Link href={`/field-notes/${note.slug}`} style={{ marginTop: "auto", paddingTop: "1.4rem", display: "inline-flex", alignItems: "center", gap: "0.45rem", color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.09em", textDecoration: "none", textTransform: "uppercase" }}>Read Field Note {note.number} <ArrowRight size={15} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 820px){.field-notes-hero-grid,.field-notes-card-grid{grid-template-columns:1fr!important}.field-notes-index-card{grid-template-columns:1fr!important}.field-notes-index-card img{height:220px!important}}`}</style>
    </div>
  );
}

const eyebrow = { margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const };
