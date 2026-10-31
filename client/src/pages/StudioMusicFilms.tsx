import { Music2 } from "lucide-react";

const films = [
  {
    number: "01",
    title: "The Light Kept Traveling",
    story: "An autobiographical song about a light Bob says he first recognized after his mother’s death—and found again through loss, rebuilding, incarceration, reentry, and service. Its central question is what it means to carry a hard-won light forward for someone else.",
    imageNote: "Symbolic AI illustration; not documentary footage.",
    theme: "music-film-traveling",
  },
  {
    number: "02",
    title: "Porch Light",
    story: "A welcome received becomes a welcome offered. In Bob’s account, the thread begins with service through Grace House, then extends through Digital Grandpa and into Beacon Momentum. The story is about care passed forward, not an assigned outcome for any person shown.",
    imageNote: "The film combines Durham and Grace House archive footage with AI-generated symbolic scenes.",
    theme: "music-film-porch",
  },
  {
    number: "03",
    title: "Where the Light Finds You",
    story: "A companion to The Light Kept Traveling. Bob describes it as the moment the light found him in prison and the later work of carrying it onward. It follows his first-person account; no identity or individual outcome is assigned to people in the archive footage.",
    imageNote: "The film combines Durham and Grace House archive footage with AI-generated symbolic scenes.",
    theme: "music-film-finds",
  },
];

export default function StudioMusicFilms() {
  return (
    <section className="studio-music section-pad" id="music-films">
      <div className="container">
        <div className="studio-section-head studio-music-head">
          <div><p className="studio-eyebrow">05 · Digital Grandpa music films</p><h2>A light received.<br/><em>A light carried forward.</em></h2></div>
          <p>Three Digital Grandpa music films selected for the Studio portfolio at Bob Burr’s direction. Digital Grandpa remains a separate legacy property; featuring this editorial context does not combine audiences, accounts, or customer records.</p>
        </div>
        <div className="studio-music-grid">
          {films.map((film) => (
            <article className={`studio-music-card ${film.theme}`} key={film.number}>
              <div className="studio-music-card-art" aria-hidden="true">
                <div className="studio-music-art-orbit"/><div className="studio-music-art-core"><Music2 size={26} strokeWidth={1.4}/></div>
                <span className="studio-music-number">{film.number} / DIGITAL GRANDPA</span>
                <span className="studio-music-art-title">{film.title}</span>
              </div>
              <div className="studio-music-card-copy">
                <p className="studio-music-credit">BOB BURR · DIGITAL GRANDPA</p>
                <h3>{film.title}</h3>
                <p className="studio-music-story">{film.story}</p>
                <p className="studio-music-note">{film.imageNote}</p>
                <p className="studio-work-link">Film link and lyrics withheld pending rights and exact-version review.</p>
              </div>
            </article>
          ))}
        </div>
        <div className="studio-music-footer">
          <p><strong>Portfolio note:</strong> This is text-only editorial context. No source film, music, artwork, lyrics, archive footage, or AI-generated media is linked, embedded, hosted, or distributed here.</p>
          <p>The films will remain off the public page until exact versions and the rights and attribution record for each component are verified. Any later release will identify the source and applicable credits.</p>
        </div>
      </div>
      <style>{`
        [data-studio-page="true"] .studio-music { background:#F1EEE5; }
        [data-studio-page="true"] .studio-music-head { margin-bottom:2.7rem; }
        [data-studio-page="true"] .studio-music-head h2 em { color:var(--studio-teal); font-weight:500; }
        [data-studio-page="true"] .studio-music-grid { display:grid; gap:1rem; grid-template-columns:repeat(3,minmax(0,1fr)); }
        [data-studio-page="true"] .studio-music-card { background:#FFFEFA; border:1px solid rgba(22,36,51,.1); display:flex; flex-direction:column; }
        [data-studio-page="true"] .studio-music-card-art { align-items:center; background:radial-gradient(circle at 50% 45%,rgba(217,185,109,.27),transparent 34%),linear-gradient(150deg,#1B2F3E,#31545A); color:#F5F3EC; display:flex; flex-direction:column; height:225px; justify-content:center; overflow:hidden; position:relative; }
        [data-studio-page="true"] .music-film-porch .studio-music-card-art { background:radial-gradient(ellipse at 68% 70%,rgba(196,159,83,.38),transparent 34%),linear-gradient(145deg,#273B3D,#31484A); }
        [data-studio-page="true"] .music-film-finds .studio-music-card-art { background:radial-gradient(ellipse at 26% 30%,rgba(78,150,149,.42),transparent 36%),linear-gradient(145deg,#14283A,#455060); }
        [data-studio-page="true"] .studio-music-art-orbit { border:1px solid rgba(245,243,236,.28); border-radius:50%; height:245px; position:absolute; width:245px; }
        [data-studio-page="true"] .studio-music-art-orbit:before,[data-studio-page="true"] .studio-music-art-orbit:after { border:1px solid rgba(245,243,236,.14); border-radius:50%; content:""; inset:22px; position:absolute; }
        [data-studio-page="true"] .studio-music-art-orbit:after { inset:53px; }
        [data-studio-page="true"] .studio-music-art-core { align-items:center; border:1px solid rgba(217,185,109,.75); border-radius:50%; color:#E8CD88; display:flex; height:58px; justify-content:center; position:relative; width:58px; }
        [data-studio-page="true"] .studio-music-number { bottom:1rem; color:rgba(245,243,236,.57); font-family:var(--beacon-mono); font-size:.53rem; letter-spacing:.12em; position:absolute; right:1rem; }
        [data-studio-page="true"] .studio-music-art-title { color:rgba(245,243,236,.82); font-family:var(--beacon-display); font-size:1.08rem; margin-top:.6rem; position:relative; }
        [data-studio-page="true"] .studio-music-card-copy { display:flex; flex:1; flex-direction:column; padding:1.25rem; }
        [data-studio-page="true"] .studio-music-credit { color:var(--studio-teal); font-family:var(--beacon-mono); font-size:.56rem; font-weight:700; letter-spacing:.1em; margin:0; }
        [data-studio-page="true"] .studio-music-card-copy h3 { font-size:1.55rem; line-height:1.08; margin:.65rem 0 .55rem; }
        [data-studio-page="true"] .studio-music-story { color:#586B7D; font-size:.82rem; line-height:1.72; margin:.3rem 0 .8rem; }
        [data-studio-page="true"] .studio-music-note { border-left:2px solid var(--studio-brass); color:#6F6855; font-size:.7rem; line-height:1.55; margin:0 0 1rem; padding-left:.65rem; }
        [data-studio-page="true"] .studio-music-card-copy .studio-work-link { color:#6F5C2B; font-size:.72rem; font-weight:600; line-height:1.5; margin:auto 0 0; }
        [data-studio-page="true"] .studio-music-footer { border-top:1px solid #D9D5C9; display:grid; gap:1rem 2rem; grid-template-columns:1fr 1fr; margin-top:1.4rem; padding-top:1.1rem; }
        [data-studio-page="true"] .studio-music-footer p { color:#586B7D; font-size:.73rem; line-height:1.65; margin:0; }
        [data-studio-page="true"] .studio-music-footer strong { color:#223345; }
        @media(max-width:920px){[data-studio-page="true"] .studio-music-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){[data-studio-page="true"] .studio-music-grid,[data-studio-page="true"] .studio-music-footer{grid-template-columns:1fr}[data-studio-page="true"] .studio-music-card-art{height:190px}}
      `}</style>
    </section>
  );
}
