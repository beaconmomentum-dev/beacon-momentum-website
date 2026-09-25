import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import { usePageMeta } from "@/hooks/usePageMeta";

const C = {
  ink: "#071923",
  navy: "#0D263B",
  tide: "#143B4D",
  brass: "#D8A94A",
  cream: "#F7F1E5",
  fog: "#D9E2E1",
  mist: "#B8C4C9",
  teal: "#58A6A4",
  line: "rgba(247,241,229,0.16)",
};

const primaryButton: React.CSSProperties = {
  alignItems: "center",
  background: C.brass,
  color: C.ink,
  display: "inline-flex",
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontSize: "0.76rem",
  fontWeight: 800,
  justifyContent: "center",
  letterSpacing: "0.11em",
  minHeight: "48px",
  padding: "0.9rem 1.15rem",
  textDecoration: "none",
  textTransform: "uppercase",
};

const secondaryButton: React.CSSProperties = {
  alignItems: "center",
  background: "transparent",
  border: `1px solid ${C.line}`,
  color: C.cream,
  display: "inline-flex",
  fontFamily: "'Outfit', system-ui, sans-serif",
  fontSize: "0.76rem",
  fontWeight: 750,
  justifyContent: "center",
  letterSpacing: "0.11em",
  minHeight: "48px",
  padding: "0.9rem 1.15rem",
  textDecoration: "none",
  textTransform: "uppercase",
};

function SectionMarker({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ alignItems: "center", color: C.brass, display: "flex", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 800, gap: "0.65rem", letterSpacing: "0.17em", textTransform: "uppercase" }}>
      <span aria-hidden="true" style={{ background: C.brass, display: "inline-block", height: "2px", width: "2.25rem" }} />
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote style={{ borderLeft: `2px solid ${C.brass}`, color: C.cream, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.7rem, 3vw, 2.65rem)", fontStyle: "italic", lineHeight: 1.1, margin: "2rem 0 0", maxWidth: "32rem", paddingLeft: "1.15rem" }}>
      {children}
    </blockquote>
  );
}

function StorySection({
  index,
  title,
  children,
  quote,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  quote: React.ReactNode;
}) {
  return (
    <section style={{ borderTop: "1px solid rgba(13,38,59,0.13)", padding: "clamp(4rem, 9vw, 8rem) 0" }}>
      <div className="container founder-story-grid" style={{ alignItems: "start", display: "grid", gap: "clamp(2rem, 7vw, 7rem)", gridTemplateColumns: "minmax(0, 0.68fr) minmax(0, 1.32fr)" }}>
        <div>
          <div style={{ color: C.teal, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>{index}</div>
          <h2 style={{ color: C.ink, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.4rem, 4.3vw, 4.35rem)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 0.95, margin: "0.8rem 0 0" }}>{title}</h2>
        </div>
        <div>
          <div style={{ color: "#254353", fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1rem, 1.45vw, 1.17rem)", lineHeight: 1.9, maxWidth: "48rem" }}>{children}</div>
          <PullQuote>{quote}</PullQuote>
        </div>
      </div>
    </section>
  );
}

export default function FounderStoryPage() {
  usePageMeta({
    title: "Somebody Left a Light On | Bob Burr and Beacon Momentum",
    description: "A founder reflection connecting Where the Light Finds You, Porch Light, and The Storm Navigator’s Guide to Beacon Momentum’s practical work: durable capability, clear direction, and one useful next step.",
    image: "/images/founder/where-the-light-finds-you-social.jpg",
    url: "/stories/somebody-left-a-light-on",
    type: "article",
  });

  return (
    <div style={{ background: C.cream, color: C.ink, minHeight: "100vh" }}>
      <SharedNav />
      <main id="main-content">
        <section style={{ background: C.ink, color: C.cream, minHeight: "min(770px, calc(100vh - 64px))", overflow: "hidden", position: "relative" }}>
          <img
            src="/images/founder/where-the-light-finds-you-social.jpg"
            alt="Silhouette looking toward a lighthouse beam across dark water"
            style={{ height: "100%", inset: 0, objectFit: "cover", objectPosition: "center", opacity: 0.66, position: "absolute", width: "100%" }}
          />
          <div aria-hidden="true" style={{ background: "linear-gradient(90deg, rgba(7,25,35,0.98) 0%, rgba(7,25,35,0.86) 42%, rgba(7,25,35,0.32) 100%), linear-gradient(0deg, rgba(7,25,35,0.95) 0%, transparent 58%)", inset: 0, position: "absolute" }} />
          <div className="container" style={{ display: "flex", minHeight: "min(770px, calc(100vh - 64px))", paddingBottom: "clamp(4rem, 8vw, 7rem)", paddingTop: "clamp(5rem, 10vw, 9rem)", position: "relative", zIndex: 1 }}>
            <div style={{ alignSelf: "end", maxWidth: "51rem" }}>
              <SectionMarker>Beacon Momentum · The Founder</SectionMarker>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(4rem, 9vw, 8.7rem)", fontWeight: 600, letterSpacing: "-0.065em", lineHeight: 0.82, margin: "1.35rem 0 0", maxWidth: "9ch" }}>Somebody left a light on.</h1>
              <p style={{ color: C.fog, fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.05rem, 2vw, 1.34rem)", lineHeight: 1.75, margin: "1.9rem 0 0", maxWidth: "42rem" }}>I served fourteen years. Beacon Momentum is what I built afterward, out of the same principles the songs are about. This is the line between the two.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "2.25rem" }}>
                <a href="https://youtu.be/AfnGWHMwO9A" style={primaryButton} target="_blank" rel="noreferrer">Watch the film</a>
                <Link href="/how-beacon-works" style={secondaryButton}>Explore Beacon Momentum</Link>
              </div>
            </div>
          </div>
        </section>

        <StorySection index="01 / The Storm" title="Fourteen years.
The old map gone." quote={<>“Empty rooms and heavier silence.<br />Photographs I had to leave.”</>}>
          <p style={{ marginTop: 0 }}>Fourteen years takes more than time. It takes ordinary mornings, family photographs, birthdays, work you might have done, and the confidence that your life still belongs to you. I do not owe anyone the offense on this page, and I will not build the story around it. What matters here is the cost: the empty rooms, the heavier silence, and the long work of deciding that the rest of my life could still be used for something honest.</p>
        </StorySection>

        <StorySection index="02 / The Turn" title="The question changed." quote={<>“I spent so long asking the dark why me.<br />The answer wasn’t why.<br />The answer was what for.”</>}>
          <p style={{ marginTop: 0 }}>For a long time, I asked the dark why me. It is a question with no finish line, and you can spend years circling it. The question changed when someone sat with me before I had done anything to earn their confidence. They did not ask for a promise or tell me who to become. They stayed until I could make the next call, take the next step, and understand that whatever came next had to be mine to carry.</p>
          <p>I will not turn that person into a character or a debt I can repay with a story. I can say this: their presence taught me that real help is practical, patient, and free of performance. It changed what I wanted to build. If another person reached the point where the old map no longer worked, I wanted there to be a light on and a chair pulled close enough to begin again.</p>
        </StorySection>

        <StorySection index="03 / The Light" title="What I built." quote={<>“We don’t have to reach the whole horizon.<br />We can start with who’s in sight.<br />Leave a little courage where you’ve been.”</>}>
          <p style={{ marginTop: 0 }}>Beacon Momentum is the porch light I chose to leave on. It is a public orientation point for people navigating transition, building durable work, and studying modern financial systems with care. The work is practical: learning how money, work, ownership, and modern tools fit together; building systems that protect judgment instead of consuming it; and choosing a steadier next move when the old path has disappeared.</p>
          <p>Beacon does not ask anyone to become a version of Bob Burr or to arrive with a polished story. It offers field guides, curriculum, working tools, and a community environment for people who want to build useful capability over time. A reader can begin with a song, a book, or a question. The point is not to promise a finish line. The point is to make the next useful step visible.</p>
          <p style={{ color: C.tide, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontStyle: "italic", lineHeight: 1.15, marginBottom: 0, marginTop: "2rem" }}>Somebody left a porch light on for me. Tonight I’m leaving mine.</p>
        </StorySection>

        <section style={{ background: "#0A2231", color: C.cream, padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container founder-film-grid" style={{ alignItems: "center", display: "grid", gap: "clamp(2rem, 6vw, 6rem)", gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)" }}>
            <div>
              <SectionMarker>Watch the film</SectionMarker>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.75rem, 5vw, 5.2rem)", fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 0.92, margin: "1.15rem 0 0" }}>Where the Light Finds You</h2>
              <p style={{ color: C.mist, fontFamily: "'Lora', Georgia, serif", fontSize: "1.05rem", lineHeight: 1.82, margin: "1.45rem 0 0", maxWidth: "33rem" }}>A symbolic Beacon Story about moving through darkness, choosing the next responsible step, and leaving a clearer path for someone else. It is not a documentary, literal autobiography, testimony, or promise about anyone else’s outcome.</p>
              <a href="https://youtu.be/AfnGWHMwO9A" style={{ ...primaryButton, marginTop: "2rem" }} target="_blank" rel="noreferrer">Watch on YouTube</a>
            </div>
            <div style={{ aspectRatio: "16 / 9", background: "#020B10", boxShadow: "0 30px 80px rgba(0,0,0,0.32)", overflow: "hidden" }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/AfnGWHMwO9A"
                title="Where the Light Finds You | A Beacon Story"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ border: 0, display: "block" }}
              />
            </div>
          </div>
        </section>

        <section style={{ background: "#E9E6DE", padding: "clamp(4.5rem, 8vw, 7.5rem) 0" }}>
          <div className="container">
            <SectionMarker>The work continues</SectionMarker>
            <h2 style={{ color: C.ink, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 6rem)", fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.87, margin: "1.15rem 0 0", maxWidth: "11ch" }}>Songs, a guide, and the work of showing up.</h2>
            <div className="founder-cards" style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: "3rem" }}>
              <article style={{ background: C.ink, color: C.cream, display: "flex", flexDirection: "column", minHeight: "20rem", padding: "1.55rem" }}>
                <div style={{ color: C.brass, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Song · 5:49</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.3rem", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, margin: "1rem 0 0" }}>Where the Light Finds You</h3>
                <p style={{ color: C.mist, fontFamily: "'Lora', Georgia, serif", fontSize: "0.93rem", lineHeight: 1.7, margin: "1rem 0 0" }}>The storm, the night the question changed, and the decision to keep moving when the old map is gone.</p>
                <a href="https://youtu.be/AfnGWHMwO9A" style={{ color: C.cream, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.08em", marginTop: "auto", paddingTop: "1.75rem", textDecoration: "underline", textDecorationColor: C.brass, textUnderlineOffset: "0.36rem", textTransform: "uppercase" }} target="_blank" rel="noreferrer">Watch the public film</a>
              </article>

              <article style={{ background: C.tide, color: C.cream, display: "flex", flexDirection: "column", minHeight: "20rem", padding: "1.55rem" }}>
                <div style={{ color: C.brass, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Song · In development</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.3rem", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, margin: "1rem 0 0" }}>Porch Light</h3>
                <p style={{ color: C.fog, fontFamily: "'Lora', Georgia, serif", fontSize: "0.93rem", lineHeight: 1.7, margin: "1rem 0 0" }}>What comes after the turn: practical kindness someone leaves on for you, and the light you learn to leave on for another person.</p>
                <p style={{ color: "rgba(247,241,229,0.74)", fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 750, letterSpacing: "0.08em", marginBottom: 0, marginTop: "auto", paddingTop: "1.75rem", textTransform: "uppercase" }}>The work continues</p>
              </article>

              <article style={{ background: "#F3EFE5", border: "1px solid rgba(13,38,59,0.12)", color: C.ink, display: "flex", flexDirection: "column", minHeight: "20rem", overflow: "hidden", padding: "1.55rem", position: "relative" }}>
                <img src="/images/founder/storm-navigator-cover.webp" alt="Harbor and lighthouse artwork for The Storm Navigator’s Guide" style={{ bottom: 0, height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.17, position: "absolute", right: 0, width: "44%" }} />
                <div style={{ color: C.teal, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", position: "relative", textTransform: "uppercase" }}>Book · Editorial development</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.3rem", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.95, margin: "1rem 0 0", maxWidth: "9ch", position: "relative" }}>The Storm Navigator’s Guide</h3>
                <p style={{ color: "#264657", fontFamily: "'Lora', Georgia, serif", fontSize: "0.93rem", lineHeight: 1.7, margin: "1rem 0 0", maxWidth: "24rem", position: "relative" }}>A practical companion for people whose old maps no longer fit, offering questions and navigation tools to notice what has changed, choose one useful next step, and return when they are ready.</p>
                <Link href="/resources" style={{ color: C.ink, fontFamily: "'Outfit', system-ui, sans-serif", fontSize: "0.74rem", fontWeight: 800, letterSpacing: "0.08em", marginTop: "auto", paddingTop: "1.75rem", position: "relative", textDecoration: "underline", textDecorationColor: C.brass, textUnderlineOffset: "0.36rem", textTransform: "uppercase" }}>Begin at Beacon Momentum</Link>
              </article>
            </div>
          </div>
        </section>

        <section style={{ background: "#071923", color: C.cream, padding: "clamp(4.5rem, 8vw, 7rem) 0" }}>
          <div className="container founder-final-cta" style={{ alignItems: "end", display: "flex", gap: "2rem", justifyContent: "space-between" }}>
            <div style={{ maxWidth: "48rem" }}>
              <SectionMarker>One useful next step</SectionMarker>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.8rem, 5vw, 5.6rem)", fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.89, margin: "1.15rem 0 0" }}>The lighthouse is lit. Join us at the Watch.</h2>
              <p style={{ color: C.mist, fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", lineHeight: 1.78, margin: "1.5rem 0 0", maxWidth: "40rem" }}>The Watch is a separate annual Beacon Momentum membership with its own enrollment, renewal, cancellation, privacy, and refund terms. Review those terms before you decide whether it fits.</p>
            </div>
            <Link href="/the-watch" style={{ ...primaryButton, flex: "0 0 auto", whiteSpace: "nowrap" }}>Explore The Watch</Link>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .founder-story-grid p + p { margin-top: 1.2rem; }
        .founder-story-grid h2 { white-space: pre-line; }
        @media (max-width: 900px) {
          .founder-story-grid, .founder-film-grid { grid-template-columns: 1fr !important; }
          .founder-final-cta { align-items: flex-start !important; flex-direction: column; }
        }
        @media (max-width: 720px) {
          .founder-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
