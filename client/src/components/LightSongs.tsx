/**
 * LightSongs: Bob Burr's three original songs, hosted on the Digital Grandpa Vimeo account.
 * Lazy-loaded iframes with dnt=1 (Vimeo's do-not-track mode). Titles and lengths come from
 * Vimeo's public oEmbed data, checked Nov 26, 2026.
 */
const SONGS = [
  { part: "Part 1", id: "1239809877", title: "Where the Light Finds You", length: "6:05", href: "https://vimeo.com/digitalgrandpa/wherethelightfindsyou" },
  { part: "Part 2", id: "1239933960", title: "Porch Light", length: "5:29", href: "https://vimeo.com/digitalgrandpa/porchlight" },
  { part: "Part 3", id: "1239674792", title: "The Light Kept Traveling", length: "5:17", href: "https://vimeo.com/digitalgrandpa/thelightkepttraveling" },
];

export default function LightSongs({ heading = "Where the light comes from", dark = false }: { heading?: string; dark?: boolean }) {
  const ink = dark ? "var(--beacon-parchment)" : "var(--beacon-charcoal)";
  const muted = dark ? "rgba(245,243,236,.72)" : "rgba(22,36,51,.72)";
  return (
    <section aria-labelledby="light-songs-heading" className="light-songs" style={{ color: ink }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <p className="home-eyebrow">Our story</p>
        <h2 id="light-songs-heading" style={{ fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08, margin: "0.6rem 0 0" }}>{heading}</h2>
        <p style={{ color: muted, fontSize: "1.05rem", lineHeight: 1.75, margin: "1.1rem 0 0", maxWidth: 680 }}>
          Three original songs from my own life, about the road that led me to write as Digital Grandpa and to serve through Beacon Momentum.
        </p>
        <div className="light-songs-grid">
          {SONGS.map((s) => (
            <figure key={s.id} style={{ margin: 0 }}>
              <div style={{ aspectRatio: "16 / 9", background: "#0d1a26", border: "1px solid rgba(127,127,127,.25)", overflow: "hidden" }}>
                <iframe
                  allow="fullscreen; picture-in-picture"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://player.vimeo.com/video/${s.id}?dnt=1&title=0&byline=0&portrait=0`}
                  style={{ border: 0, display: "block", height: "100%", width: "100%" }}
                  title={`${s.part}: ${s.title}, an original song by Bob Burr`}
                />
              </div>
              <figcaption style={{ fontFamily: "var(--beacon-ui)", fontSize: ".85rem", marginTop: ".7rem" }}>
                <span style={{ color: muted, display: "block", fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase" }}>{s.part}</span>
                <a href={s.href} rel="noopener noreferrer" style={{ color: ink, fontWeight: 700 }} target="_blank">{s.title}</a>
                <span style={{ color: muted }}> · {s.length}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <style>{`.light-songs{padding:clamp(4.5rem,9vw,7rem) 0;}.light-songs-grid{display:grid;gap:1.5rem;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:2.4rem}@media(max-width:820px){.light-songs-grid{grid-template-columns:1fr}}`}</style>
    </section>
  );
}
