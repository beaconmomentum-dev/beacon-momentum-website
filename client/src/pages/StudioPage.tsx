import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Clapperboard, Compass, Film, Lightbulb, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";
import StudioMusicFilms from "./StudioMusicFilms";

const selectedWork = [
  {
    number: "01",
    kind: "Founder-led practical learning film",
    title: "How I Use Claude AI to Build a One-Person Business in 2026",
    body: "A working demonstration that moves from a clear question into an applied framework, a repeatable routine, and an explicit limitations section. It teaches a process; it is not a promise of business results.",
    href: "https://www.youtube.com/watch?v=lhbxtqqmH6w",
    theme: "studio-work-card-ai",
    icon: Lightbulb,
  },
  {
    number: "02",
    kind: "Founder-perspective essay",
    title: "The Exit Ramp: How to Stop Running to Stand Still",
    body: "An essay about pressure, work, and leverage. Its direct opening creates an emotional point of entry, then moves toward a practical reframing—not a typical customer story or measured result.",
    href: "https://www.youtube.com/watch?v=vi1EkYANhQs",
    theme: "studio-work-card-exit",
    icon: Compass,
  },
];

const studioLanes = [
  { icon: Film, number: "01", title: "Stories", copy: "Human-scale narratives about work, change, responsibility, and the choices people make. Fiction is labeled as fiction; personal accounts stay attributed to their teller." },
  { icon: BookOpen, number: "02", title: "Source-led explainers", copy: "Clear visual treatments of tools, claims, and changes in the world of work. We show what the evidence supports and what still needs checking." },
  { icon: Clapperboard, number: "03", title: "Learning media", copy: "Video, audio, and visual guides that make a practical idea easier to understand and revisit—with access and terms made clear before a viewer continues." },
];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`studio-eyebrow${light ? " is-light" : ""}`}>{children}</p>;
}

function LighthouseMark() {
  return (
    <svg className="studio-beacon-art" aria-hidden="true" viewBox="0 0 720 520" fill="none">
      <defs>
        <linearGradient id="studio-beam" x1="300" y1="180" x2="695" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D9B96D" stopOpacity=".64" />
          <stop offset="1" stopColor="#D9B96D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="studio-beam-low" x1="300" y1="200" x2="690" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E9695" stopOpacity=".5" />
          <stop offset="1" stopColor="#4E9695" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M317 179 690 66 690 177 317 199Z" fill="url(#studio-beam)" />
      <path d="M317 194 685 340 685 405 317 210Z" fill="url(#studio-beam-low)" />
      <g stroke="#F5F3EC" strokeOpacity=".16" strokeWidth="1">
        <path d="M48 425C184 356 313 354 468 411" />
        <path d="M16 458C168 377 323 374 518 442" />
        <path d="M0 490C152 413 343 402 565 476" />
        <path d="M478 50v380M543 36v394M608 25v405" />
      </g>
      <path d="m262 384 16-173h75l18 173h-109Z" fill="#0F1E2B" stroke="#F5F3EC" strokeOpacity=".72" strokeWidth="2" />
      <path d="m279 210 13-46h47l14 46h-74Z" fill="#223345" stroke="#D9B96D" strokeWidth="2" />
      <path d="M287 163h57l-8-28h-42l-7 28Z" fill="#162433" stroke="#F5F3EC" strokeOpacity=".72" strokeWidth="2" />
      <path d="M281 216h68M267 384h103M291 299h44" stroke="#D9B96D" strokeWidth="2" />
      <path d="M307 337v-32c0-9 14-9 14 0v32" stroke="#F5F3EC" strokeWidth="2" />
      <circle cx="315" cy="177" r="5" fill="#F6D785" />
      <circle cx="315" cy="177" r="20" stroke="#F6D785" strokeOpacity=".38" />
      <path d="M208 404c64-14 157-16 227 0" stroke="#4E9695" strokeWidth="2" />
      <text x="466" y="455" fill="#F5F3EC" fillOpacity=".42" fontFamily="monospace" fontSize="11" letterSpacing="3">CHESHIRE · MASSACHUSETTS</text>
    </svg>
  );
}

export default function StudioPage() {
  return (
    <div data-studio-page="true">
      {import.meta.env.DEV && <div className="studio-local-preview-banner">LOCAL DESIGN REVIEW · STAGED BRANCH · NOT DEPLOYED</div>}
      <SharedNav />
      <main id="main-content">
        <section className="studio-hero">
          <div className="container studio-hero-layout">
            <div className="studio-hero-copy">
              <Eyebrow light>Beacon Momentum · Studio</Eyebrow>
              <h1>Stories and learning media for work that still feels human.</h1>
              <p className="studio-hero-lede">We shape original stories, explainers, and learning media for people who want a clearer view of the work in front of them. Lived experience, careful research, and thoughtful production meet here. Technology can help with parts of the work; people remain accountable for what a piece says and where it goes.</p>
              <div className="studio-hero-actions">
                <a className="studio-button studio-button-brass" href="#selected-work">Explore selected work <ArrowDown aria-hidden="true" size={16} /></a>
                <a className="studio-quiet-link" href="#how-we-work">How Studio works <ArrowRight aria-hidden="true" size={16} /></a>
              </div>
              <p className="studio-hero-boundary">Studio is a creative function of Beacon Momentum—not a separate membership or service company.</p>
            </div>
            <div className="studio-hero-visual" aria-label="An original Beacon lighthouse illustration with a beam crossing a route map">
              <LighthouseMark />
              <div className="studio-hero-caption"><span>BUILT IN A SMALL MASSACHUSETTS TOWN</span><span>CONNECTED TO A WIDER WORLD</span></div>
            </div>
          </div>
          <div className="studio-hero-bottom"><span>THE WORK</span><span>THE STORY</span><span>THE HUMAN JUDGMENT</span><span className="studio-hero-bottom-line" /></div>
        </section>

        <section className="studio-intro section-pad">
          <div className="container studio-intro-grid">
            <div>
              <Eyebrow>01 · The role</Eyebrow>
              <h2>A public home for the work we make.</h2>
            </div>
            <div className="studio-intro-copy">
              <p>Beacon Studio is where Beacon Momentum presents original stories, source-led explainers, and learning media. The page is a window into the editorial practice—not a promise of a particular result.</p>
              <p>For organizations with a defined production need, Beacon Labs is a separate business-to-business service property. Its scope, price, terms, inquiry process, and records are distinct from The Watch membership.</p>
              <div className="studio-path-note"><ShieldCheck aria-hidden="true" size={20} /><p><strong>Different work, different door.</strong> Visiting Beacon Labs does not enroll you in The Watch; a membership does not create an organization engagement.</p></div>
            </div>
          </div>
        </section>

        <section className="studio-lanes">
          <div className="container">
            <div className="studio-section-head">
              <div><Eyebrow>02 · What we make</Eyebrow><h2>One steady standard. Three useful forms.</h2></div>
              <p>The format follows the purpose. The human review stays with the work.</p>
            </div>
            <div className="studio-lane-grid">
              {studioLanes.map(({ icon: Icon, number, title, copy }) => (
                <article className="studio-lane-card" key={number}>
                  <div className="studio-lane-top"><span>{number}</span><Icon aria-hidden="true" size={23} /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-work section-pad" id="selected-work">
          <div className="container">
            <div className="studio-section-head studio-section-head-dark">
              <div><Eyebrow light>03 · Selected work</Eyebrow><h2>Made to be followed.<br /><em>Not just watched.</em></h2></div>
              <p>Two public films that show how Beacon moves from a human question toward a practical idea—without asking a story to prove more than it can.</p>
            </div>
            <div className="studio-work-grid">
              {selectedWork.map(({ number, kind, title, body, href, theme, icon: Icon }) => (
                <article className={`studio-work-card ${theme}`} key={number}>
                  <div className="studio-work-art" aria-hidden="true"><div className="studio-work-art-lines" /><Icon size={34} strokeWidth={1.2} /><span>{number} / BEACON STUDIO</span></div>
                  <div className="studio-work-content">
                    <Eyebrow>{kind}</Eyebrow>
                    <h3>{title}</h3>
                    <p>{body}</p>
                    <a className="studio-work-link" href={href} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight aria-hidden="true" size={16} /></a>
                  </div>
                </article>
              ))}
            </div>
            <p className="studio-external-note">These links open YouTube, a separate third-party service with its own player, privacy practices, and terms. No video is embedded or autoplayed here.</p>
          </div>
        </section>

        <section className="studio-origin section-pad">
          <div className="container studio-origin-grid">
            <div className="studio-origin-visual" aria-hidden="true">
              <div className="studio-origin-coordinate">42°33′ N · BERKSHIRE COUNTY</div>
              <div className="studio-origin-path"><span /><span /><span /></div>
              <div className="studio-origin-labels"><span>NORTH ADAMS</span><span>CHESHIRE</span><span>THE WIDER WORLD</span></div>
              <p>PLACE<br /><em>AND</em><br />POSSIBILITY</p>
            </div>
            <div className="studio-origin-copy">
              <Eyebrow>04 · A story rooted in place</Eyebrow>
              <h2>The work was here before the tools changed.</h2>
              <p>Bob Burr grew up in a small hill town above North Adams, left for school and Navy service, and spent much of his life away before returning to the area in 2022. In his account, his father spent a working lifetime at Sprague Electric in North Adams. Beacon’s home lab in Cheshire is part of a new chapter in that family’s relationship with work and place.</p>
              <p>This is one family’s story, told from Bob’s perspective—not a claim that rural life is free of difficulty or right for everyone. The thread is more modest: patience, responsibility, craft, and care can carry forward while tools and forms of work change.</p>
              <p>Beacon is built in a small Massachusetts town and connected to people far beyond it. Digital Grandpa, Bob’s separate creative project, explores generational wisdom and what people pass forward. The two properties remain distinct; one does not enroll or transfer the audience of the other.</p>
              <p className="studio-attribution">Family history in this section is attributed to Bob and has not been independently verified.</p>
            </div>
          </div>
        </section>

        <StudioMusicFilms />

        <section className="studio-practice section-pad" id="how-we-work">
          <div className="container">
            <Eyebrow light>06 · How we work</Eyebrow>
            <h2>Human judgment stays in the frame.</h2>
            <div className="studio-practice-grid">
              <article><span>01</span><h3>Start with purpose</h3><p>Name the people a piece is meant to serve and the work it should help them understand.</p></article>
              <article><span>02</span><h3>Check sources and permissions</h3><p>Keep the evidence, attribution, and rights questions close to the material—not tucked away after the edit.</p></article>
              <article><span>03</span><h3>Review the finished work</h3><p>A person remains accountable for the story, its claims, its accessibility, and the decision to publish.</p></article>
            </div>
            <p className="studio-practice-close">Beacon’s work is shaped by knowledge forged in real practice, not abstract motivation. The Lighthouse is for direction, not pressure. Transformation over transactions. The lighthouse is lit.</p>
          </div>
        </section>

        {import.meta.env.DEV && (
          <section className="studio-review-only section-pad" aria-label="Internal production workflow review">
            <div className="container">
              <div className="studio-review-banner"><span>LOCAL PREVIEW ONLY</span><p>This internal review panel is removed from production builds.</p></div>
              <Eyebrow>Production workflow candidate</Eyebrow>
              <h2>Ecamm 4.6 on the Apple Studio.</h2>
              <p className="studio-review-intro">Owner reports Ecamm 4.6 is available on the Studio. Recommended for camera capture, live switching, interviews, and isolated source recording where those modes fit. It complements—not replaces—script development, local visual generation, editorial review, caption QA, and final assembly. Validate one short lesson before naming it as a public production capability.</p>
              <p className="studio-review-intro">The separate Digital Grandpa concept <em>The Work We Inherit</em> remains private until the owner approves public disclosure and factual treatment.</p>
            </div>
          </section>
        )}

        <section className="studio-next section-pad">
          <div className="container">
            <div className="studio-section-head">
              <div><Eyebrow>07 · Choose your next step</Eyebrow><h2>Different questions.<br />Different places to continue.</h2></div>
              <p>There is no need to choose a bigger commitment than the work calls for.</p>
            </div>
            <div className="studio-next-grid">
              <article><span className="studio-next-index">FOR INDIVIDUAL LEARNING</span><h3>The Watch</h3><p>Beacon Momentum’s annual membership for ongoing practice. Review the current offer and terms before deciding.</p><Link to="/the-watch">Review The Watch <ArrowRight aria-hidden="true" size={16} /></Link></article>
              <article><span className="studio-next-index">FOR ORGANIZATIONS</span><h3>Beacon Labs</h3><p>A separate organization-service property. Its own current scope, terms, and inquiry path apply.</p><a href="https://beaconlabs.ai" target="_blank" rel="noopener noreferrer">Visit Beacon Labs <ArrowUpRight aria-hidden="true" size={16} /></a></article>
              <article><span className="studio-next-index">A SEPARATE LEGACY PROPERTY</span><h3>Digital Grandpa</h3><p>Bob’s distinct creative project centered on legacy, generational wisdom, and compassionate direction.</p><a href="https://digitalgrandpa.org" target="_blank" rel="noopener noreferrer">Visit Digital Grandpa <ArrowUpRight aria-hidden="true" size={16} /></a></article>
            </div>
            <p className="studio-next-boundary">These are separate properties and services. Accounts, submitted details, and customer records do not transfer automatically.</p>
          </div>
        </section>

        <section className="studio-disclosure">
          <div className="container"><p><strong>About the work:</strong> A creator’s personal account reflects their perspective and is not independent verification of every historical detail. Selected work is not a promise of revenue, audience growth, or business results. Where a featured work includes AI-generated or archival material, the page will identify it in context after its source, rights, and disclosure have been reviewed. An AI disclosure is not a rights grant.</p></div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        [data-studio-page="true"] { --studio-ink:#162433; --studio-ink-2:#223345; --studio-paper:#F5F3EC; --studio-paper-2:#EAE6DB; --studio-teal:#2E7A7D; --studio-teal-light:#4E9695; --studio-brass:#C49F53; --studio-brass-light:#D9B96D; --studio-muted:#586B7D; background:var(--studio-paper); color:var(--studio-ink); overflow:clip; }
        [data-studio-page="true"] .studio-local-preview-banner { background:#483A23; color:#F2D995; font-family:var(--beacon-mono); font-size:.58rem; font-weight:700; letter-spacing:.12em; padding:.55rem 1rem; text-align:center; }
        [data-studio-page="true"] .studio-hero { background:radial-gradient(ellipse at 77% 45%,rgba(78,150,149,.18),transparent 38%),linear-gradient(126deg,#162433 0%,#1B2B3C 56%,#243E4A 100%); color:var(--studio-paper); min-height:690px; padding:clamp(4.75rem,9vw,8rem) 0 3rem; position:relative; }
        [data-studio-page="true"] .studio-hero:before { background:linear-gradient(rgba(245,243,236,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(245,243,236,.045) 1px,transparent 1px); background-size:54px 54px; content:""; inset:0; mask-image:linear-gradient(90deg,transparent,black 50%,black); pointer-events:none; position:absolute; }
        [data-studio-page="true"] .studio-hero-layout { align-items:center; display:grid; gap:2rem; grid-template-columns:minmax(0,1.02fr) minmax(320px,.98fr); max-width:1440px; position:relative; }
        [data-studio-page="true"] .studio-hero-copy { max-width:760px; position:relative; z-index:1; }
        [data-studio-page="true"] .studio-eyebrow { color:var(--studio-teal); font-family:var(--beacon-mono); font-size:.68rem; font-weight:700; letter-spacing:.14em; line-height:1.5; margin:0; text-transform:uppercase; }
        [data-studio-page="true"] .studio-eyebrow.is-light { color:var(--studio-brass-light); }
        [data-studio-page="true"] .studio-hero h1 { font-size:clamp(3.25rem,6.5vw,6.3rem); letter-spacing:-.055em; line-height:.97; margin:1rem 0 0; max-width:790px; }
        [data-studio-page="true"] .studio-hero-lede { color:rgba(245,243,236,.79); font-size:clamp(1rem,1.35vw,1.15rem); line-height:1.78; margin:1.5rem 0 0; max-width:660px; }
        [data-studio-page="true"] .studio-hero-actions { align-items:center; display:flex; flex-wrap:wrap; gap:1.35rem; margin-top:2rem; }
        [data-studio-page="true"] .studio-button { align-items:center; display:inline-flex; font-size:.76rem; font-weight:800; gap:.55rem; letter-spacing:.07em; min-height:48px; padding:.9rem 1.05rem; text-decoration:none; text-transform:uppercase; }
        [data-studio-page="true"] .studio-button-brass { background:var(--studio-brass-light); color:var(--studio-ink); }
        [data-studio-page="true"] .studio-button:hover { background:#F2D995; }
        [data-studio-page="true"] .studio-quiet-link,.studio-work-link,.studio-next-grid a { align-items:center; display:inline-flex; gap:.45rem; text-underline-offset:.25rem; }
        [data-studio-page="true"] .studio-quiet-link { color:var(--studio-paper); font-size:.9rem; }
        [data-studio-page="true"] .studio-hero-boundary { color:rgba(245,243,236,.58); font-size:.78rem; line-height:1.6; margin:1.3rem 0 0; max-width:610px; }
        [data-studio-page="true"] .studio-hero-visual { min-width:0; position:relative; }
        [data-studio-page="true"] .studio-beacon-art { display:block; height:auto; max-height:480px; overflow:visible; width:100%; }
        [data-studio-page="true"] .studio-hero-caption { color:rgba(245,243,236,.55); display:flex; flex-wrap:wrap; font-family:var(--beacon-mono); font-size:.57rem; gap:.65rem 1.3rem; justify-content:space-between; letter-spacing:.13em; margin:.1rem 1rem 0; }
        [data-studio-page="true"] .studio-hero-bottom { align-items:center; color:rgba(245,243,236,.35); display:flex; font-family:var(--beacon-mono); font-size:.57rem; gap:1rem; letter-spacing:.12em; margin:clamp(3rem,6vw,5.5rem) max(1.25rem,calc((100vw - 1320px)/2)); }
        [data-studio-page="true"] .studio-hero-bottom-line { background:linear-gradient(90deg,var(--studio-brass),rgba(245,243,236,.12)); flex:1; height:1px; }
        [data-studio-page="true"] .section-pad { padding:clamp(4.5rem,8vw,7rem) 0; }
        [data-studio-page="true"] .studio-intro-grid,.studio-origin-grid { align-items:start; display:grid; gap:clamp(2rem,8vw,8rem); grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr); }
        [data-studio-page="true"] .studio-intro h2,[data-studio-page="true"] .studio-section-head h2,[data-studio-page="true"] .studio-origin h2,[data-studio-page="true"] .studio-practice h2,[data-studio-page="true"] .studio-review-only h2 { font-size:clamp(2.5rem,4.8vw,4.8rem); letter-spacing:-.045em; line-height:1.01; margin:1rem 0 0; max-width:780px; }
        [data-studio-page="true"] .studio-intro-copy { color:var(--studio-muted); font-size:1rem; line-height:1.8; max-width:720px; }
        [data-studio-page="true"] .studio-intro-copy p { margin:0 0 1.15rem; }
        [data-studio-page="true"] .studio-path-note { align-items:flex-start; background:#fffaf2; border-left:3px solid var(--studio-teal); color:var(--studio-ink); display:flex; gap:.85rem; margin-top:1.5rem; padding:1.05rem 1.1rem; }
        [data-studio-page="true"] .studio-path-note svg { color:var(--studio-teal); flex:0 0 auto; margin-top:.15rem; }
        [data-studio-page="true"] .studio-path-note p { font-size:.88rem; line-height:1.65; margin:0; }
        [data-studio-page="true"] .studio-lanes { background:#EAE6DB; padding:clamp(4.5rem,8vw,7rem) 0; }
        [data-studio-page="true"] .studio-section-head { align-items:end; display:grid; gap:2rem; grid-template-columns:minmax(0,1fr) minmax(240px,.62fr); }
        [data-studio-page="true"] .studio-section-head > p { color:var(--studio-muted); font-size:.98rem; line-height:1.75; margin:0 0 .3rem; max-width:510px; }
        [data-studio-page="true"] .studio-lane-grid { display:grid; gap:1px; grid-template-columns:repeat(3,minmax(0,1fr)); margin-top:2.8rem; }
        [data-studio-page="true"] .studio-lane-card { background:#F8F6F0; border:1px solid rgba(22,36,51,.08); min-height:240px; padding:1.55rem; }
        [data-studio-page="true"] .studio-lane-top { align-items:center; color:var(--studio-teal); display:flex; font-family:var(--beacon-mono); font-size:.66rem; justify-content:space-between; letter-spacing:.1em; }
        [data-studio-page="true"] .studio-lane-card h3 { font-size:1.65rem; margin:2.1rem 0 .65rem; }
        [data-studio-page="true"] .studio-lane-card p { color:var(--studio-muted); font-size:.88rem; line-height:1.75; margin:0; max-width:410px; }
        [data-studio-page="true"] .studio-work { background:#162433; color:var(--studio-paper); }
        [data-studio-page="true"] .studio-section-head-dark { margin-bottom:2.8rem; }
        [data-studio-page="true"] .studio-section-head-dark h2 em { color:rgba(245,243,236,.7); font-weight:500; }
        [data-studio-page="true"] .studio-section-head-dark > p { color:rgba(245,243,236,.68); }
        [data-studio-page="true"] .studio-work-grid { display:grid; gap:1.2rem; grid-template-columns:repeat(2,minmax(0,1fr)); }
        [data-studio-page="true"] .studio-work-card { background:#203244; border:1px solid rgba(245,243,236,.13); display:grid; grid-template-columns:minmax(160px,.7fr) minmax(0,1.3fr); min-height:350px; }
        [data-studio-page="true"] .studio-work-art { align-items:center; background:radial-gradient(ellipse at 70% 30%,rgba(196,159,83,.36),transparent 30%),linear-gradient(150deg,#31565A,#203244); color:#F5F3EC; display:flex; flex-direction:column; justify-content:center; min-height:260px; overflow:hidden; position:relative; }
        [data-studio-page="true"] .studio-work-card-exit .studio-work-art { background:radial-gradient(ellipse at 28% 72%,rgba(78,150,149,.5),transparent 38%),linear-gradient(150deg,#1C3142,#3D5260); }
        [data-studio-page="true"] .studio-work-art svg { color:#D9B96D; position:relative; z-index:1; }
        [data-studio-page="true"] .studio-work-art > span { bottom:1.1rem; color:rgba(245,243,236,.64); font-family:var(--beacon-mono); font-size:.53rem; letter-spacing:.1em; position:absolute; }
        [data-studio-page="true"] .studio-work-art-lines { border:1px solid rgba(245,243,236,.18); border-radius:50%; height:260px; left:50%; position:absolute; top:50%; transform:translate(-50%,-50%); width:260px; }
        [data-studio-page="true"] .studio-work-art-lines:before,[data-studio-page="true"] .studio-work-art-lines:after { border:1px solid rgba(245,243,236,.12); border-radius:50%; content:""; inset:17px; position:absolute; }
        [data-studio-page="true"] .studio-work-art-lines:after { inset:42px; }
        [data-studio-page="true"] .studio-work-content { align-self:center; padding:1.5rem; }
        [data-studio-page="true"] .studio-work-content .studio-eyebrow { color:#D9B96D; font-size:.58rem; }
        [data-studio-page="true"] .studio-work-content h3 { font-size:clamp(1.5rem,2vw,2rem); line-height:1.12; margin:.75rem 0; }
        [data-studio-page="true"] .studio-work-content p { color:rgba(245,243,236,.71); font-size:.86rem; line-height:1.7; margin:.75rem 0 1.2rem; }
        [data-studio-page="true"] .studio-work-link { color:#F5F3EC; font-size:.82rem; font-weight:700; }
        [data-studio-page="true"] .studio-external-note { color:rgba(245,243,236,.5); font-size:.75rem; line-height:1.65; margin:1.25rem 0 0; }
        [data-studio-page="true"] .studio-origin { background:#F9F7F0; }
        [data-studio-page="true"] .studio-origin-visual { align-self:stretch; background:linear-gradient(160deg,#203447,#1A3A43); color:#F5F3EC; display:flex; flex-direction:column; justify-content:space-between; min-height:490px; overflow:hidden; padding:1.7rem; position:relative; }
        [data-studio-page="true"] .studio-origin-visual:before { background:repeating-radial-gradient(ellipse at 48% 58%,transparent 0 26px,rgba(245,243,236,.09) 27px 28px,transparent 29px 51px); content:""; inset:-10%; position:absolute; }
        [data-studio-page="true"] .studio-origin-coordinate,[data-studio-page="true"] .studio-origin-labels { color:rgba(245,243,236,.65); font-family:var(--beacon-mono); font-size:.57rem; letter-spacing:.1em; position:relative; }
        [data-studio-page="true"] .studio-origin-path { align-items:center; display:flex; justify-content:space-between; margin:2rem 0; position:relative; }
        [data-studio-page="true"] .studio-origin-path:before { background:linear-gradient(90deg,#D9B96D,#4E9695); content:""; height:2px; left:0; position:absolute; right:0; }
        [data-studio-page="true"] .studio-origin-path span { background:#F5F3EC; border:4px solid #C49F53; border-radius:50%; height:16px; position:relative; width:16px; }
        [data-studio-page="true"] .studio-origin-path span:last-child { border-color:#4E9695; }
        [data-studio-page="true"] .studio-origin-labels { display:flex; justify-content:space-between; gap:.5rem; }
        [data-studio-page="true"] .studio-origin-visual > p { color:#F5F3EC; font-family:var(--beacon-display); font-size:clamp(2.8rem,5vw,4.7rem); font-weight:600; letter-spacing:-.05em; line-height:.86; margin:2.8rem 0 1.1rem; position:relative; }
        [data-studio-page="true"] .studio-origin-visual > p em { color:#D9B96D; font-size:.54em; font-weight:400; }
        [data-studio-page="true"] .studio-origin-copy { max-width:740px; }
        [data-studio-page="true"] .studio-origin-copy > p { color:var(--studio-muted); font-size:.98rem; line-height:1.8; margin:1.15rem 0 0; }
        [data-studio-page="true"] .studio-origin-copy .studio-attribution { border-left:2px solid var(--studio-brass); color:#344453; font-size:.82rem; padding-left:.9rem; }
        [data-studio-page="true"] .studio-practice { background:#2E7A7D; color:var(--studio-paper); }
        [data-studio-page="true"] .studio-practice h2 { max-width:830px; }
        [data-studio-page="true"] .studio-practice-grid { border-top:1px solid rgba(245,243,236,.3); display:grid; gap:1px; grid-template-columns:repeat(3,minmax(0,1fr)); margin-top:2.7rem; }
        [data-studio-page="true"] .studio-practice-grid article { border-bottom:1px solid rgba(245,243,236,.3); min-height:220px; padding:1.35rem 1.25rem 1.5rem 0; }
        [data-studio-page="true"] .studio-practice-grid span { color:#D9B96D; font-family:var(--beacon-mono); font-size:.65rem; letter-spacing:.14em; }
        [data-studio-page="true"] .studio-practice-grid h3 { font-size:1.45rem; margin:1.7rem 0 .6rem; }
        [data-studio-page="true"] .studio-practice-grid p { color:rgba(245,243,236,.78); font-size:.88rem; line-height:1.7; margin:0; max-width:370px; }
        [data-studio-page="true"] .studio-practice-close { color:rgba(245,243,236,.86); font-family:var(--beacon-display); font-size:1.4rem; line-height:1.5; margin:2rem 0 0; max-width:850px; }
        [data-studio-page="true"] .studio-review-only { background:#F5EEDC; border-bottom:1px solid #D7C693; border-top:1px solid #D7C693; }
        [data-studio-page="true"] .studio-review-banner { align-items:center; background:#47371E; color:#F9F4E7; display:flex; flex-wrap:wrap; gap:.75rem 1rem; margin-bottom:2rem; padding:.8rem 1rem; }
        [data-studio-page="true"] .studio-review-banner span { color:#F2D995; font-family:var(--beacon-mono); font-size:.65rem; font-weight:700; letter-spacing:.12em; }
        [data-studio-page="true"] .studio-review-banner p { font-size:.78rem; margin:0; }
        [data-studio-page="true"] .studio-review-only h2 { font-size:clamp(2.1rem,4vw,3.7rem); }
        [data-studio-page="true"] .studio-review-intro { color:#586B7D; font-size:.9rem; line-height:1.7; margin:1rem 0 0; max-width:820px; }
        [data-studio-page="true"] .studio-review-film-list { border-top:1px solid #D7C693; margin:1.5rem 0; }
        [data-studio-page="true"] .studio-review-film-list > div { align-items:center; border-bottom:1px solid #D7C693; display:grid; gap:.7rem; grid-template-columns:42px minmax(180px,1fr) minmax(220px,1fr); padding:.9rem 0; }
        [data-studio-page="true"] .studio-review-film-list span,.studio-review-film-list small { color:#63572F; font-family:var(--beacon-mono); font-size:.63rem; letter-spacing:.04em; }
        [data-studio-page="true"] .studio-review-film-list strong { font-family:var(--beacon-display); font-size:1.13rem; }
        [data-studio-page="true"] .studio-next { background:#E3F0EE; }
        [data-studio-page="true"] .studio-next-grid { display:grid; gap:1px; grid-template-columns:repeat(3,minmax(0,1fr)); margin-top:2.8rem; }
        [data-studio-page="true"] .studio-next-grid article { background:#F8FBF8; border-top:3px solid var(--studio-teal); min-height:290px; padding:1.55rem; }
        [data-studio-page="true"] .studio-next-index { color:var(--studio-teal); display:block; font-family:var(--beacon-mono); font-size:.59rem; font-weight:700; letter-spacing:.12em; }
        [data-studio-page="true"] .studio-next-grid h3 { font-size:1.8rem; margin:1.6rem 0 .65rem; }
        [data-studio-page="true"] .studio-next-grid p { color:var(--studio-muted); font-size:.86rem; line-height:1.7; min-height:4.7em; }
        [data-studio-page="true"] .studio-next-grid a { color:var(--studio-ink); font-size:.8rem; font-weight:800; }
        [data-studio-page="true"] .studio-next-boundary { color:var(--studio-muted); font-size:.76rem; line-height:1.65; margin:1.2rem 0 0; }
        [data-studio-page="true"] .studio-disclosure { background:#F9F7F0; border-top:1px solid rgba(22,36,51,.12); padding:1.6rem 0; }
        [data-studio-page="true"] .studio-disclosure p { color:var(--studio-muted); font-size:.75rem; line-height:1.7; margin:0; max-width:1050px; }
        [data-studio-page="true"] :where(a,button):focus-visible { outline:3px solid #C49F53; outline-offset:4px; }
        [data-studio-page="true"] a { transition:color 160ms ease,background-color 160ms ease; }
        [data-studio-page="true"] section[id] { scroll-margin-top:100px; }
        @media (max-width:960px) { [data-studio-page="true"] .studio-hero-layout { grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr); } [data-studio-page="true"] .studio-work-card { grid-template-columns:1fr; } [data-studio-page="true"] .studio-work-art { min-height:190px; } [data-studio-page="true"] .studio-origin-grid { gap:2.5rem; } }
        @media (max-width:760px) { [data-studio-page="true"] .studio-hero { padding-top:4rem; } [data-studio-page="true"] .studio-hero-layout,.studio-intro-grid,.studio-origin-grid,.studio-section-head { grid-template-columns:1fr; } [data-studio-page="true"] .studio-hero-visual { margin:-.5rem auto 0; max-width:560px; width:100%; } [data-studio-page="true"] .studio-hero { min-height:auto; } [data-studio-page="true"] .studio-hero-bottom { flex-wrap:wrap; } [data-studio-page="true"] .studio-lane-grid,.studio-practice-grid,.studio-next-grid,.studio-work-grid { grid-template-columns:1fr; } [data-studio-page="true"] .studio-lane-card { min-height:0; } [data-studio-page="true"] .studio-practice-grid article { min-height:0; padding-right:0; } [data-studio-page="true"] .studio-next-grid p { min-height:0; } [data-studio-page="true"] .studio-section-head { align-items:start; } [data-studio-page="true"] .studio-origin-visual { min-height:360px; } [data-studio-page="true"] .studio-review-film-list > div { align-items:start; grid-template-columns:34px 1fr; } [data-studio-page="true"] .studio-review-film-list small { grid-column:2; } }
        @media (max-width:440px) { [data-studio-page="true"] .studio-hero h1 { font-size:clamp(3rem,13vw,4rem); } [data-studio-page="true"] .studio-hero-caption { flex-direction:column; } [data-studio-page="true"] .studio-hero-bottom { font-size:.51rem; gap:.55rem; } [data-studio-page="true"] .studio-work-content { padding:1.2rem; } [data-studio-page="true"] .studio-origin-visual { min-height:320px; padding:1.2rem; } }
        @media (prefers-reduced-motion: reduce) { [data-studio-page="true"] *,[data-studio-page="true"] *::before,[data-studio-page="true"] *::after { scroll-behavior:auto!important; transition-duration:.01ms!important; } }
      `}</style>
    </div>
  );
}
