import { ArrowRight, BookOpen, Compass, Landmark, Lightbulb, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const coverPath = "/images/owned/storm-navigators-guide-cover.webp";

const practiceCards = [
  {
    icon: Compass,
    number: "01",
    title: "Name the weather",
    copy: "Begin with an honest account of what has changed. A clear description is not a verdict; it is a way to stop navigating by fog.",
  },
  {
    icon: MapPinned,
    number: "02",
    title: "Find a bearing",
    copy: "Return to the people, values, responsibilities, and practical facts that still give the next decision a place to stand.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Choose one useful step",
    copy: "A durable move is often smaller than the whole horizon. The work is to make the next action visible and carry it with care.",
  },
] as const;

export default function StormNavigatorsGuidePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav />
      <main id="main-content">
        <section
          style={{
            background: "radial-gradient(circle at 79% 20%, rgba(216,169,74,0.22), transparent 26%), linear-gradient(136deg, #061A29 0%, #0B2A3B 58%, #17353C 100%)",
            color: "#FAF8F4",
            overflow: "hidden",
            padding: "clamp(4.5rem, 8vw, 7.5rem) 0 clamp(3.75rem, 7vw, 6.5rem)",
            position: "relative",
          }}
        >
          <div aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(183,222,218,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(183,222,218,0.07) 1px, transparent 1px)", backgroundPosition: "center", backgroundSize: "58px 58px", inset: 0, opacity: 0.7, pointerEvents: "none", position: "absolute" }} />
          <div className="container storm-book-hero" style={{ alignItems: "center", display: "grid", gap: "clamp(2.5rem, 6vw, 6rem)", gridTemplateColumns: "minmax(0, 1.2fr) minmax(270px, 0.62fr)", position: "relative" }}>
            <div>
              <p style={{ alignItems: "center", color: "#D8A94A", display: "flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, gap: "0.7rem", letterSpacing: "0.17em", margin: 0, textTransform: "uppercase" }}>
                <span aria-hidden="true" style={{ background: "#D8A94A", display: "inline-block", height: "1px", width: "2rem" }} />
                Beacon Momentum field guide
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(3.2rem, 7vw, 6.3rem)", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.91, margin: "1.15rem 0 0", maxWidth: "780px" }}>
                The Storm Navigator’s Guide
              </h1>
              <p style={{ color: "#D8A94A", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.45rem)", fontStyle: "italic", lineHeight: 1.15, margin: "1.15rem 0 0", maxWidth: "670px" }}>
                A compass for the moment when the old map no longer fits.
              </p>
              <p style={{ color: "rgba(250,248,244,0.8)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.04rem", lineHeight: 1.85, margin: "1.75rem 0 0", maxWidth: "650px" }}>
                This book is being prepared as a practical companion for people facing a difficult change, carrying an unfinished question, or trying to find one responsible next move. It is not a promise of a particular outcome. It is a place to begin looking again.
              </p>
              <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: "2rem" }}>
                <Link href="/resources" className="storm-book-primary-action" style={{ alignItems: "center", background: "#D8A94A", color: "#061A29", display: "inline-flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 800, gap: "0.5rem", letterSpacing: "0.08em", padding: "0.95rem 1.1rem", textDecoration: "none", textTransform: "uppercase" }}>
                  Explore Beacon resources <ArrowRight size={15} />
                </Link>
                <a href="#the-guide" className="storm-book-secondary-action" style={{ alignItems: "center", border: "1px solid rgba(250,248,244,0.4)", color: "#FAF8F4", display: "inline-flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 700, gap: "0.5rem", letterSpacing: "0.08em", padding: "0.95rem 1.1rem", textDecoration: "none", textTransform: "uppercase" }}>
                  Read the guide’s purpose <ArrowRight size={15} />
                </a>
              </div>
              <p style={{ color: "rgba(250,248,244,0.48)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", letterSpacing: "0.06em", lineHeight: 1.6, margin: "1rem 0 0", maxWidth: "610px" }}>
                Public edition in preparation. This page is an introduction to the work, not a checkout or download page.
              </p>
            </div>

            <figure style={{ margin: 0, maxWidth: "390px", justifySelf: "center", position: "relative", width: "100%" }}>
              <div aria-hidden="true" style={{ background: "rgba(216,169,74,0.65)", height: "100%", left: "1.1rem", position: "absolute", top: "1.1rem", width: "100%" }} />
              <img src={coverPath} alt="Illustrated harbor scene with a person looking toward a lighthouse beam after a storm" style={{ border: "1px solid rgba(250,248,244,0.45)", boxShadow: "0 26px 65px rgba(0,0,0,0.36)", display: "block", position: "relative", width: "100%" }} />
              <figcaption style={{ color: "rgba(250,248,244,0.64)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.64rem", letterSpacing: "0.08em", lineHeight: 1.5, marginTop: "1.15rem", textTransform: "uppercase" }}>
                Cover artwork · public edition in preparation
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="the-guide" style={{ padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container storm-book-purpose" style={{ display: "grid", gap: "clamp(2.25rem, 7vw, 7rem)", gridTemplateColumns: "minmax(0, 0.68fr) minmax(0, 1fr)", maxWidth: "1120px" }}>
            <div>
              <p style={{ color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", margin: 0, textTransform: "uppercase" }}>The purpose</p>
              <h2 style={{ color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4.45rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.99, margin: "1rem 0 0" }}>
                Not a shortcut. A clearer place to stand.
              </h2>
            </div>
            <div>
              <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.9, margin: 0 }}>
                Some changes arrive before a person has language for them. A familiar role shifts. A relationship, plan, or old certainty no longer carries the same weight. The Storm Navigator’s Guide gathers questions, observations, and field-tested ways of taking stock without pretending that every hard season has a neat answer.
              </p>
              <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.9, margin: "1.25rem 0 0" }}>
                Its premise is modest: people do not need to reach the whole horizon at once. They need an honest bearing, a useful next step, and enough room to keep their judgment intact while they move.
              </p>
              <blockquote style={{ borderLeft: "3px solid var(--beacon-amber)", color: "var(--beacon-teal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.55rem, 3vw, 2.2rem)", fontStyle: "italic", lineHeight: 1.23, margin: "2.25rem 0 0", padding: "0.35rem 0 0.35rem 1.25rem" }}>
                “The next useful step is still a direction.”
              </blockquote>
            </div>
          </div>
        </section>

        <section style={{ background: "#EAF2F3", borderBottom: "1px solid #D4E3E4", borderTop: "1px solid #D4E3E4", padding: "clamp(4.5rem, 8vw, 7.5rem) 0" }}>
          <div className="container" style={{ maxWidth: "1120px" }}>
            <p style={{ color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", margin: 0, textAlign: "center", textTransform: "uppercase" }}>A navigator’s practice</p>
            <h2 style={{ color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 4.35rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, margin: "0.9rem auto 0", maxWidth: "790px", textAlign: "center" }}>A field guide for moving without leaving yourself behind.</h2>
            <div className="storm-book-practice-grid" style={{ display: "grid", gap: "1px", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: "3rem", background: "#C9DCDD", border: "1px solid #C9DCDD" }}>
              {practiceCards.map(({ icon: Icon, number, title, copy }) => (
                <article key={number} style={{ background: "#F8FBFA", padding: "clamp(1.65rem, 3vw, 2.5rem)" }}>
                  <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                    <Icon aria-hidden="true" color="var(--beacon-teal)" size={25} strokeWidth={1.6} />
                    <span style={{ color: "var(--beacon-amber)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em" }}>{number}</span>
                  </div>
                  <h3 style={{ color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, lineHeight: 1.02, margin: "1.75rem 0 0" }}>{title}</h3>
                  <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.92rem", lineHeight: 1.78, margin: "1rem 0 0" }}>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "clamp(4.5rem, 8vw, 7rem) 0" }}>
          <div className="container storm-book-boundary" style={{ alignItems: "start", display: "grid", gap: "clamp(2.25rem, 7vw, 7rem)", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.86fr)", maxWidth: "1080px" }}>
            <div>
              <p style={{ color: "var(--beacon-teal)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", margin: 0, textTransform: "uppercase" }}>An honest boundary</p>
              <h2 style={{ color: "var(--beacon-charcoal)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.45rem, 4.8vw, 4rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, margin: "0.95rem 0 0" }}>The guide is being prepared with care.</h2>
              <p style={{ color: "var(--beacon-charcoal-mid)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.98rem", lineHeight: 1.85, margin: "1.35rem 0 0" }}>The public edition, sample pages, and delivery path are still under editorial and rights review. This page will be updated when those pieces are ready. Until then, Beacon is keeping the promise simple: make the work visible without pretending it is already a finished offer.</p>
            </div>
            <aside style={{ background: "var(--beacon-charcoal)", color: "#FAF8F4", padding: "clamp(1.6rem, 3vw, 2.35rem)" }}>
              <ShieldCheck aria-hidden="true" color="var(--beacon-amber-light)" size={25} strokeWidth={1.6} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, lineHeight: 1.05, margin: "1.1rem 0 0" }}>What this page does not do</h3>
              <ul style={{ color: "rgba(250,248,244,0.74)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.9rem", lineHeight: 1.75, margin: "1rem 0 0", paddingLeft: "1.15rem" }}>
                <li>It does not sell or deliver the book today.</li>
                <li>It does not promise a personal outcome.</li>
                <li>It does not replace professional, legal, financial, or emergency support.</li>
                <li>It does not treat Beacon’s separate membership as the book’s checkout.</li>
              </ul>
            </aside>
          </div>
        </section>

        <section style={{ background: "#17353C", color: "#FAF8F4", padding: "clamp(4.5rem, 8vw, 7rem) 0" }}>
          <div className="container storm-book-next" style={{ alignItems: "center", display: "grid", gap: "3rem", gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 0.72fr)", maxWidth: "1080px" }}>
            <div>
              <p style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", margin: 0, textTransform: "uppercase" }}>While the book is in preparation</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.55rem, 5vw, 4.5rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.98, margin: "0.9rem 0 0" }}>Keep the next useful step within reach.</h2>
              <p style={{ color: "rgba(250,248,244,0.74)", fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.85, margin: "1.35rem 0 0", maxWidth: "680px" }}>Beacon Momentum’s public resource library is open now. The Watch is a separate annual membership for people who want an ongoing learning and community rhythm; it is not required to read this page or to follow the guide’s development.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1.75rem" }}>
                <Link href="/resources" className="storm-book-primary-action" style={{ alignItems: "center", background: "var(--beacon-amber-light)", color: "#061A29", display: "inline-flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 800, gap: "0.5rem", letterSpacing: "0.08em", padding: "0.95rem 1.1rem", textDecoration: "none", textTransform: "uppercase" }}>
                  Browse public resources <ArrowRight size={15} />
                </Link>
                <Link href="/the-watch" className="storm-book-secondary-action" style={{ alignItems: "center", border: "1px solid rgba(250,248,244,0.35)", color: "#FAF8F4", display: "inline-flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 700, gap: "0.5rem", letterSpacing: "0.08em", padding: "0.95rem 1.1rem", textDecoration: "none", textTransform: "uppercase" }}>
                  Learn about The Watch <Landmark size={15} />
                </Link>
              </div>
            </div>
            <div style={{ border: "1px solid rgba(250,248,244,0.22)", padding: "1.7rem" }}>
              <BookOpen aria-hidden="true" color="var(--beacon-amber-light)" size={25} strokeWidth={1.5} />
              <p style={{ color: "var(--beacon-amber-light)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.13em", margin: "1rem 0 0", textTransform: "uppercase" }}>The Storm Navigator’s Guide</p>
              <p style={{ color: "#FAF8F4", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontStyle: "italic", lineHeight: 1.15, margin: "0.55rem 0 0" }}>A practical companion for life’s hard transitions.</p>
              <p style={{ color: "rgba(250,248,244,0.65)", fontFamily: "'Lora', Georgia, serif", fontSize: "0.86rem", lineHeight: 1.7, margin: "1rem 0 0" }}>The lighthouse is lit. The work continues.</p>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .storm-book-primary-action, .storm-book-secondary-action { transition: transform 160ms var(--ease-out), background-color 180ms var(--ease-out), border-color 180ms var(--ease-out), color 180ms var(--ease-out); }
        .storm-book-primary-action:hover { background: #F7D67F !important; transform: translateY(-2px); }
        .storm-book-secondary-action:hover { border-color: #D8A94A !important; color: #D8A94A !important; transform: translateY(-2px); }
        .storm-book-primary-action:focus-visible, .storm-book-secondary-action:focus-visible { outline: 3px solid #58A6A4; outline-offset: 4px; }
        @media (max-width: 820px) {
          .storm-book-hero, .storm-book-purpose, .storm-book-boundary, .storm-book-next { grid-template-columns: 1fr !important; }
          .storm-book-hero figure { max-width: 330px !important; justify-self: start !important; }
          .storm-book-practice-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .storm-book-hero figure { max-width: 285px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .storm-book-primary-action, .storm-book-secondary-action { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
