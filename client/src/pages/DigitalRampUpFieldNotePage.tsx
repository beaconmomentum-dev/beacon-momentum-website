import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Compass } from "lucide-react";
import { Link, useParams } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { DIGITAL_RAMP_UP_FIELD_NOTES, findDigitalRampUpFieldNote } from "@/data/digitalRampUpFieldNotes";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function DigitalRampUpFieldNotePage() {
  const params = useParams<{ slug: string }>();
  const note = findDigitalRampUpFieldNote(params.slug || "");

  usePageMeta({
    title: note ? `${note.number}. ${note.title}` : "Field Note Not Found",
    description: note?.excerpt || "The requested Beacon Digital Ramp-Up Field Note could not be found.",
    image: note ? `https://beaconmomentum.com${note.image}` : undefined,
    url: note ? `/field-notes/${note.slug}` : "/field-notes",
    type: "article",
  });

  if (!note) {
    return <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}><SharedNav /><main id="main-content" className="container" style={{ maxWidth: "900px", paddingTop: "8rem", paddingBottom: "8rem" }}><p style={eyebrow}>Field Notes</p><h1 style={{ margin: "1rem 0 0", fontSize: "clamp(3rem, 6vw, 5rem)" }}>That field note is not here.</h1><Link href="/field-notes" style={linkStyle}>Return to the Field Notes <ArrowRight size={15} /></Link></main><SharedFooter /></div>;
  }

  const currentIndex = DIGITAL_RAMP_UP_FIELD_NOTES.findIndex((item) => item.slug === note.slug);
  const nextNote = DIGITAL_RAMP_UP_FIELD_NOTES[currentIndex + 1];

  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4" }}>
          <div className="container field-note-hero" style={{ maxWidth: "1180px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(340px, 0.9fr)", gap: "clamp(2rem, 6vw, 6rem)", alignItems: "stretch", paddingTop: "clamp(3.25rem, 7vw, 6rem)", paddingBottom: "clamp(3.25rem, 7vw, 6rem)" }}>
            <div style={{ alignSelf: "center" }}>
              <Link href="/field-notes" style={{ ...linkStyle, color: "var(--beacon-amber-light)", marginBottom: "1.8rem" }}><ArrowLeft size={15} /> All Field Notes</Link>
              <p style={eyebrow}>Digital Ramp-Up · Field Note {note.number}</p>
              <h1 style={{ margin: "1rem 0 0", maxWidth: "700px", fontSize: "clamp(3.2rem, 6.2vw, 6rem)", lineHeight: 0.93, letterSpacing: "-0.05em" }}>{note.title}</h1>
              <p style={{ margin: "1.45rem 0 0", maxWidth: "650px", color: "rgba(250,248,244,0.78)", fontSize: "1.06rem", lineHeight: 1.82 }}>{note.deck}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", marginTop: "1.65rem", color: "rgba(250,248,244,0.62)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}><Clock3 size={14} /> {note.readTime}</span><span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}><CalendarDays size={14} /> {note.publishedDate}</span></div>
            </div>
            <div style={{ minHeight: "290px", border: `1px solid ${note.accent}`, overflow: "hidden", background: "#17353C" }}><img src={note.image} alt={note.alt} style={{ width: "100%", height: "100%", minHeight: "290px", objectFit: "cover", display: "block" }} /></div>
          </div>
        </section>

        {note.isFrameworkNote && <section style={{ background: "var(--beacon-amber-pale)", borderBottom: "1px solid rgba(200,134,10,0.28)" }}><div className="container" style={{ maxWidth: "960px", paddingTop: "1.2rem", paddingBottom: "1.2rem", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}><Compass size={18} color="var(--beacon-amber)" style={{ flexShrink: 0, marginTop: "0.15rem" }} /><p style={{ margin: 0, color: "var(--beacon-charcoal)", fontSize: "0.92rem", lineHeight: 1.65 }}><strong>Framework announcement only.</strong> Entries are not open. Final Official Rules, eligibility, entry instructions, the alternative free method, and the official program page will be published before any entry period begins.</p></div></section>}

        <section style={{ padding: "clamp(3.5rem, 8vw, 6.5rem) 0" }}>
          <div className="container field-note-reading-grid" style={{ maxWidth: "1040px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(220px, 0.34fr)", gap: "clamp(2.5rem, 8vw, 7rem)" }}>
            <div>
              <article className="field-note-body" dangerouslySetInnerHTML={{ __html: note.body }} />
              {note.slug === "choose-the-right-door" && <section aria-labelledby="foundation-year-route-map-heading" style={{ marginTop: "2.5rem", padding: "1.5rem", background: "var(--beacon-amber-pale)", border: "1px solid rgba(200,134,10,0.28)", borderLeft: "4px solid var(--beacon-amber)" }}>
                <p style={{ ...eyebrow, color: "var(--beacon-amber)" }}>Route map in context</p>
                <h2 id="foundation-year-route-map-heading" style={{ color: "var(--beacon-charcoal)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.05, margin: "0.65rem 0 0" }}>See the route map in context.</h2>
                <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", lineHeight: 1.75, margin: "0.8rem 0 0" }}>The Foundation Year film explains why Beacon keeps its public, membership, and organization-facing paths distinct.</p>
                <a href="https://www.youtube.com/watch?v=uJuvhPjcjO0" target="_blank" rel="noreferrer" style={{ ...linkStyle, marginTop: "1.2rem" }}>Watch the Foundation Year film <ArrowRight size={15} /></a>
              </section>}
            </div>
            <aside style={{ alignSelf: "start", position: "sticky", top: "96px" }} className="field-note-aside">
              <div style={{ borderTop: `3px solid ${note.accent}`, paddingTop: "1.25rem" }}>
                <p style={{ ...eyebrow, color: note.accent }}>Field question</p>
                <p style={{ margin: "0.8rem 0 0", color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.65rem", lineHeight: 1.12 }}>{note.fieldQuestion}</p>
              </div>
              <a href={note.ctaHref} style={{ ...linkStyle, marginTop: "2rem" }}>{note.ctaLabel} <ArrowRight size={15} /></a>
            </aside>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(3rem, 7vw, 5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1040px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: "2rem", flexWrap: "wrap" }}>
            <div><p style={eyebrow}>Continue the series</p><h2 style={{ margin: "0.8rem 0 0", maxWidth: "650px", fontSize: "clamp(2.1rem, 4vw, 3.6rem)", lineHeight: 0.98 }}>{nextNote ? nextNote.title : "Return to the full Digital Ramp-Up."}</h2></div>
            <Link href={nextNote ? `/field-notes/${nextNote.slug}` : "/field-notes"} style={{ ...linkStyle, color: "var(--beacon-amber-light)", whiteSpace: "nowrap" }}>{nextNote ? `Read Field Note ${nextNote.number}` : "All Field Notes"} <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`@media (max-width: 820px){.field-note-hero,.field-note-reading-grid{grid-template-columns:1fr!important}.field-note-aside{position:static!important}.field-note-body{font-size:1rem!important}.field-note-body table{font-size:.88rem!important}}.field-note-body{color:var(--beacon-charcoal-mid);font-family:'Lora',Georgia,serif;font-size:1.04rem;line-height:1.9}.field-note-body p{margin:0 0 1.35rem}.field-note-body .beacon-article-lede{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.65rem,3vw,2.25rem);line-height:1.23;color:var(--beacon-charcoal)}.field-note-body h2{margin:2.7rem 0 1rem;color:var(--beacon-charcoal);font-size:clamp(2rem,4vw,3.25rem);line-height:1.02}.field-note-body table{width:100%;border-collapse:collapse;margin:1.75rem 0 2rem;font-size:.94rem}.field-note-body th,.field-note-body td{padding:1rem;border-bottom:1px solid var(--beacon-parchment-dark);text-align:left;vertical-align:top}.field-note-body th{font-family:'Outfit',system-ui,sans-serif;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--beacon-teal)}.field-note-body em{color:var(--beacon-charcoal-mid)}}`}</style>
    </div>
  );
}

const eyebrow = { margin: 0, color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const };
const linkStyle = { display: "inline-flex", alignItems: "center", gap: "0.45rem", color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.09em", textDecoration: "none", textTransform: "uppercase" as const };
