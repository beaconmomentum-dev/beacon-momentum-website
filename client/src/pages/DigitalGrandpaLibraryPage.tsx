import { ArrowUpRight, BookOpen, Clock3, Heart } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const DG_URL = "https://digitalgrandpa.org";

const books = [
  {
    title: "Discovering Your True North",
    subtitle: "What You Actually Want",
    description: "A reflection on values, direction, and the quiet work of returning to a life that feels like your own.",
    accent: "#B77B42",
  },
  {
    title: "The Power of Getting Started",
    subtitle: "A Digital Grandpa’s Guide to Rising Again",
    description: "A companion for people taking a first step through overwhelm, uncertainty, or a season that has changed the map.",
    accent: "#5A8B7A",
  },
  {
    title: "Voices of Inspiration",
    subtitle: "Volume One",
    description: "Stories shaped by lived experience—not theory—collected to remind us that rebuilding is a human art.",
    accent: "#55718B",
  },
  {
    title: "A Life That Matters",
    subtitle: "Legacy, Purpose, and the Long Game",
    description: "A gentle look at what we carry forward, what we leave behind, and the ordinary acts that become a legacy.",
    accent: "#7A5A43",
  },
  {
    title: "Stop Calling It Lazy",
    subtitle: "Rest, Recovery, and Rebuilding",
    description: "A humane case for recovery: why rest is not a failure of purpose and why the next chapter needs room to breathe.",
    accent: "#7B688D",
  },
  {
    title: "The Digital Grandpa Manifesto",
    subtitle: "Why Wisdom Matters More Than Ever",
    description: "A short declaration of the project’s purpose: wisdom with love, direction without domination, and a light kept on for others.",
    accent: "#B77B42",
  },
];

function FieldLabel({ children }: { children: string }) {
  return <p style={{ color: "#D8A56A", fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0, textTransform: "uppercase" }}>{children}</p>;
}

export default function DigitalGrandpaLibraryPage() {
  return (
    <div data-design-system="digital-grandpa-library-v2" style={{ background: "#F8F1E7", color: "#2A2118", minHeight: "100vh" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: "linear-gradient(125deg, #3A2B20, #2A2118)", color: "#FFF8EE", padding: "clamp(5rem, 10vw, 8.5rem) 0 clamp(4rem, 8vw, 7rem)" }}>
          <div className="container">
            <div className="dgl-signal-strip" aria-hidden="true"><span /><span /><span>DIGITAL GRANDPA · PORCH LIGHT LIBRARY</span><span>BOOKS &amp; COMPANIONS</span></div>
            <div style={{ marginTop: "2.5rem", maxWidth: "870px" }}>
              <FieldLabel>The Porch Light Library</FieldLabel>
              <h1 style={{ fontSize: "clamp(3.1rem, 7.3vw, 6.6rem)", letterSpacing: "-0.06em", lineHeight: 0.95, margin: "1.1rem 0 0" }}>
                Wisdom you can hold
                <br />
                <em style={{ color: "rgba(255,248,238,0.8)", fontWeight: 500 }}>in your hands.</em>
              </h1>
              <p style={{ color: "rgba(255,248,238,0.8)", fontSize: "clamp(1.03rem, 1.7vw, 1.2rem)", lineHeight: 1.78, margin: "1.7rem 0 0", maxWidth: "650px" }}>
                A growing shelf of books and companion works for people who have lived through hard things, are still finding their direction, and want to leave a little more light behind them.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: "#EFE1CE", borderBottom: "1px solid rgba(42,33,24,0.14)", padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
          <div className="container dgl-status-grid">
            <div style={{ alignItems: "center", display: "flex", gap: "0.8rem" }}><Clock3 aria-hidden="true" color="#B77B42" size={22} /><FieldLabel>Being prepared with care</FieldLabel></div>
            <p>Titles are in private editorial development. This is a library preview, not a storefront or a pre-order page. When a book is ready, its availability and terms will be stated plainly at Digital Grandpa.</p>
          </div>
        </section>

        <section style={{ padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container">
            <div className="dgl-heading-grid">
              <div><FieldLabel>The collection</FieldLabel><h2 style={{ fontSize: "clamp(2.25rem, 4.5vw, 4.5rem)", lineHeight: 1.02, margin: "1rem 0 0", maxWidth: "620px" }}>Books for the season you are carrying.</h2></div>
              <p>These works are not clinical care, legal advice, financial advice, or a substitute for a relationship of trust. They are reflections, stories, and practical companionship for the road.</p>
            </div>
            <div className="dgl-book-grid">
              {books.map((book, index) => (
                <article key={book.title} style={{ borderTop: `3px solid ${book.accent}` }}>
                  <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}><BookOpen aria-hidden="true" color={book.accent} size={19} /><span>{`0${index + 1}`}</span></div>
                  <h3>{book.title}</h3>
                  <p className="dgl-subtitle" style={{ color: book.accent }}>{book.subtitle}</p>
                  <p className="dgl-book-body">{book.description}</p>
                  <p className="dgl-status">In editorial development</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#3A2B20", color: "#FFF8EE", padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container dgl-purpose-grid">
            <div><FieldLabel>Built to be passed forward</FieldLabel><h2 style={{ fontSize: "clamp(2.3rem, 4.6vw, 4.6rem)", lineHeight: 1.03, margin: "1rem 0 0" }}>The library is a porch light, not a product funnel.</h2></div>
            <div><Heart aria-hidden="true" color="#D8A56A" size={26} /><p style={{ color: "rgba(255,248,238,0.8)", fontSize: "1.06rem", lineHeight: 1.8, margin: "1rem 0 0" }}>A book may be picked up by someone rebuilding after a loss, handed to a friend who needs hope, or read aloud in a family room. The aim is not urgency. It is usefulness that remains.</p><p style={{ color: "rgba(255,248,238,0.68)", fontSize: "0.94rem", lineHeight: 1.72, margin: "1rem 0 0" }}>This Beacon Momentum preview does not create a Digital Grandpa account, capture your information, or enroll you in another Beacon property.</p></div>
          </div>
        </section>

        <section style={{ background: "linear-gradient(125deg, #EFE1CE, #F8F1E7)", padding: "clamp(4.5rem, 9vw, 7.5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1100px" }}>
            <FieldLabel>Continue at the dedicated property</FieldLabel>
            <h2 style={{ fontSize: "clamp(2.45rem, 5.2vw, 5.35rem)", lineHeight: 1.02, margin: "1rem 0 0", maxWidth: "900px" }}>When the porch light is ready, it will be there for you.</h2>
            <p style={{ color: "rgba(42,33,24,0.76)", fontSize: "1.05rem", lineHeight: 1.75, margin: "1.35rem 0 0", maxWidth: "680px" }}>Digital Grandpa is a separate legacy property. Visit it directly to explore its current public work and future releases under its own terms and privacy choices.</p>
            <a className="dgl-primary-action" href={DG_URL} rel="noopener noreferrer" target="_blank">Visit Digital Grandpa <ArrowUpRight size={16} /></a>
            <Link href="/digital-grandpa" className="dgl-return-link">Return to the Digital Grandpa introduction</Link>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        [data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip { align-items: center; border-bottom: 1px solid rgba(255,248,238,0.22); color: rgba(255,248,238,0.62); display: flex; font-family: var(--beacon-mono); font-size: 0.62rem; gap: 0.85rem; letter-spacing: 0.09em; padding-bottom: 0.8rem; }[data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip span:first-child { background: #D8A56A; height: 1px; width: 2rem; }[data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip span:nth-child(2) { background: #8DB3A2; height: 1px; width: 1rem; }[data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip span:last-child { margin-left: auto; }
        [data-design-system="digital-grandpa-library-v2"] .dgl-status-grid, [data-design-system="digital-grandpa-library-v2"] .dgl-heading-grid, [data-design-system="digital-grandpa-library-v2"] .dgl-purpose-grid { align-items: center; display: grid; gap: clamp(1.8rem, 7vw, 6rem); grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr); }[data-design-system="digital-grandpa-library-v2"] .dgl-status-grid p, [data-design-system="digital-grandpa-library-v2"] .dgl-heading-grid > p { color: rgba(42,33,24,0.72); font-size: 0.94rem; line-height: 1.7; margin: 0; }[data-design-system="digital-grandpa-library-v2"] .dgl-heading-grid { align-items: end; margin-bottom: 3rem; }
        [data-design-system="digital-grandpa-library-v2"] .dgl-book-grid { display: grid; gap: 1px; grid-template-columns: repeat(3, minmax(0, 1fr)); }[data-design-system="digital-grandpa-library-v2"] .dgl-book-grid article { background: #fffaf2; border: 1px solid rgba(42,33,24,0.12); min-height: 300px; padding: clamp(1.4rem, 2.7vw, 2rem); }[data-design-system="digital-grandpa-library-v2"] .dgl-book-grid span { color: rgba(42,33,24,0.52); font-family: var(--beacon-mono); font-size: 0.64rem; font-weight: 700; letter-spacing: 0.12em; }[data-design-system="digital-grandpa-library-v2"] .dgl-book-grid h3 { font-size: 1.65rem; margin: 2.1rem 0 0; }[data-design-system="digital-grandpa-library-v2"] .dgl-subtitle { font-family: var(--beacon-ui); font-size: 0.79rem; font-weight: 700; letter-spacing: 0.03em; margin: 0.5rem 0 0; }[data-design-system="digital-grandpa-library-v2"] .dgl-book-body { color: rgba(42,33,24,0.7); font-size: 0.9rem; line-height: 1.68; margin: 1rem 0 0; }[data-design-system="digital-grandpa-library-v2"] .dgl-status { color: #B77B42; font-family: var(--beacon-mono); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.1em; margin: 1.5rem 0 0; text-transform: uppercase; }
        [data-design-system="digital-grandpa-library-v2"] .dgl-primary-action { align-items: center; background: #B77B42; color: #FFF8EE; display: inline-flex; font-family: var(--beacon-ui); font-size: 0.77rem; font-weight: 800; gap: 0.5rem; letter-spacing: 0.06em; margin-top: 2rem; padding: 1rem 1.15rem; text-decoration: none; text-transform: uppercase; }[data-design-system="digital-grandpa-library-v2"] .dgl-return-link { color: #5D4633; display: block; font-family: var(--beacon-ui); font-size: 0.86rem; margin-top: 1.15rem; text-underline-offset: 0.25rem; }
        @media (max-width: 820px) { [data-design-system="digital-grandpa-library-v2"] .dgl-status-grid, [data-design-system="digital-grandpa-library-v2"] .dgl-heading-grid, [data-design-system="digital-grandpa-library-v2"] .dgl-purpose-grid, [data-design-system="digital-grandpa-library-v2"] .dgl-book-grid { grid-template-columns: 1fr; }[data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip { align-items: flex-start; flex-wrap: wrap; }[data-design-system="digital-grandpa-library-v2"] .dgl-signal-strip span:last-child { margin-left: 0; width: 100%; } }
      `}</style>
    </div>
  );
}
