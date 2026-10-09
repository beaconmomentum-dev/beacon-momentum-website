import { ArrowRight, ArrowUpRight, BookOpen, Compass, FileText, Landmark, Sparkles } from "lucide-react";
import { Link } from "wouter";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const LABS_URL = "https://beaconlabs.ai";

const watchBenefits = [
  {
    number: "01",
    title: "A steadier practice",
    body: "Field guides, practical learning paths, and a place to turn a useful idea into a repeatable way of working.",
  },
  {
    number: "02",
    title: "Useful intelligence",
    body: "Clear, source-led notes and member resources that help you ask better questions before a new tool becomes another distraction.",
  },
  {
    number: "03",
    title: "A human pace",
    body: "A member environment built for thoughtful progress, not constant urgency, performative productivity, or pressure to be visible.",
  },
];

const startingPoints = [
  {
    icon: Landmark,
    label: "The member path",
    title: "The Watch",
    body: "For people who want a year-long place to learn, practice, and build a steadier way of working.",
    cta: "Review The Watch",
    href: "/the-watch",
    primary: true,
  },
  {
    icon: Compass,
    label: "The free starting point",
    title: "The Readiness Map",
    body: "For anyone who needs to make one real job visible before choosing a tool, a program, or a bigger commitment.",
    cta: "Get the free map",
    href: "/ReadinessMap",
  },
  {
    icon: Sparkles,
    label: "The organization path",
    title: "Beacon Labs",
    body: "For teams that need a practical, evidence-led way to choose what to improve, test, defer, or leave alone.",
    cta: "Visit Beacon Labs",
    href: LABS_URL,
    external: true,
  },
];

const signalCards = [
  {
    title: "A Claim Is Not Evidence",
    body: "A practical way to separate a polished feature, a demonstration, a reported result, and a claim that still needs proof.",
    href: "/signal/a-claim-is-not-evidence",
  },
  {
    title: "Can This Agent Do It—or May It Do It?",
    body: "A plain-language frame for deciding what an AI agent should be allowed to read, prepare, or pass to a person.",
    href: "/signal/can-this-agent-do-it-or-may-it-do-it",
  },
  {
    title: "Before You Connect an App",
    body: "A short permission inventory for checking what a new tool can see, change, and keep before you connect it.",
    href: "/signal/before-you-connect-an-app",
  },
];

function SignalLine({ label, coordinates = false }: { label: string; coordinates?: boolean }) {
  return (
    <div className="home-signal-line" aria-hidden="true">
      <span />
      <span />
      <span>{label}</span>
      <i />
      {coordinates && <span className="home-signal-coordinates">45°36′ N / 73°33′ W</span>}
    </div>
  );
}

function PrimaryLink({ href, children, external = false, inverted = false }: { href: string; children: string; external?: boolean; inverted?: boolean }) {
  const className = inverted ? "home-primary-link home-primary-link-inverted" : "home-primary-link";
  if (external) {
    return <a className={className} href={href} rel="noopener noreferrer" target="_blank">{children}<ArrowUpRight size={16} /></a>;
  }
  return <Link className={className} href={href}>{children}<ArrowRight size={16} /></Link>;
}

export default function Home() {
  return (
    <div className="home-v3" id="top">
      <SharedNav />
      <main id="main-content">
        <section className="home-hero">
          <img alt="" aria-hidden="true" className="home-hero-image" decoding="async" fetchPriority="high" loading="eager" src="/images/home/beacon-routeboard-hero.webp" />
          <div className="home-hero-scrim" />
          <div className="container home-hero-content">
            <SignalLine coordinates label="BEACON MOMENTUM · PUBLIC FRONT DOOR" />
            <div className="home-hero-grid">
              <div>
                <p className="home-eyebrow">For people who want a sane way forward with AI</p>
                <h1>
                  Build work that
                  <br />
                  <em>still feels like yours.</em>
                </h1>
                <p className="home-hero-copy">
                  AI can make good work easier to start, easier to repeat, and easier to carry forward. It can also make the noise louder. Beacon helps you sort the useful from the urgent, keep your judgment close, and choose a next step you can actually live with.
                </p>
                <div className="home-hero-actions">
                  <PrimaryLink href="/the-watch">Review The Watch</PrimaryLink>
                  <Link className="home-text-link" href="/ReadinessMap">Start free with the Readiness Map <ArrowRight size={15} /></Link>
                </div>
                <p className="home-boundary-note">The Watch, Beacon Labs, and other Beacon properties have separate experiences, records, and choices. Visiting one does not enroll you in another.</p>
              </div>
              <aside className="home-hero-aside">
                <p>THE WATCH · ANNUAL MEMBERSHIP</p>
                <h2>One year to build a steadier way of working.</h2>
                <div><span>$497</span><small>per year</small></div>
                <p>Review the member experience, annual terms, and enrollment details before you decide.</p>
                <Link href="/the-watch">See what The Watch holds <ArrowRight size={15} /></Link>
              </aside>
            </div>
          </div>
        </section>

        <section className="home-introduction">
          <div className="container home-introduction-grid">
            <div>
              <SignalLine label="THE BEACON APPROACH" />
              <h2>AI is here. The question is how you carry it into your life and work.</h2>
            </div>
            <div>
              <p>Beacon is not here to sell a shortcut, a fear story, or the idea that a tool can take responsibility for your life. We are here to help people and teams make work clearer, save effort where it is safe to do so, and remain accountable for what matters.</p>
              <p>That means starting with the work itself. Name what needs attention. Try a small, useful step. Check the result. Keep what helps. Change what does not.</p>
              <p className="home-promise">Use what is useful. Keep judgment visible. Build work that can carry forward.</p>
            </div>
          </div>
        </section>

        <section className="home-watch" id="watch">
          <div className="container">
            <SignalLine label="THE WATCH · MEMBER FIELD" />
            <div className="home-watch-grid">
              <div>
                <p className="home-eyebrow">A practical place to keep going</p>
                <h2>The lighthouse is lit.<br /><em>Take your post for the year ahead.</em></h2>
                <p className="home-watch-copy">The Watch is Beacon’s annual membership for people who want more than an occasional article or a generic course library. It gives you a practical place to learn, organize what matters, and build an operating rhythm that stays human.</p>
                <PrimaryLink href="/the-watch" inverted>Review Founding Year enrollment</PrimaryLink>
              </div>
              <div className="home-watch-benefits">
                {watchBenefits.map((benefit) => <article key={benefit.number}>
                  <span>{benefit.number}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="home-routes" id="start-here">
          <div className="container">
            <SignalLine label="START WITH THE WORK IN FRONT OF YOU" />
            <div className="home-section-heading">
              <div><p className="home-eyebrow">Three clear places to begin</p><h2>Choose the smallest useful next step.</h2></div>
              <p>No one needs to become an expert overnight. Start with the route that matches your real question today. You can return for more depth when it serves the work.</p>
            </div>
            <div className="home-route-grid">
              {startingPoints.map((route) => {
                const Icon = route.icon;
                const action = route.external
                  ? <a href={route.href} rel="noopener noreferrer" target="_blank">{route.cta} <ArrowUpRight size={15} /></a>
                  : <Link href={route.href}>{route.cta} <ArrowRight size={15} /></Link>;
                return <article className={route.primary ? "home-route-card home-route-card-primary" : "home-route-card"} key={route.title}>
                  <Icon aria-hidden="true" size={21} />
                  <p>{route.label}</p>
                  <h3>{route.title}</h3>
                  <span>{route.body}</span>
                  {action}
                </article>;
              })}
            </div>
            <p className="home-route-boundary">Beacon Labs is a separate organization service. A Beacon Labs inquiry is not a Watch membership, and a Watch membership does not create an organization engagement.</p>
          </div>
        </section>

        <section className="home-signal">
          <div className="container">
            <SignalLine label="THE SIGNAL · PUBLIC INTELLIGENCE" />
            <div className="home-section-heading home-section-heading-light">
              <div><p className="home-eyebrow">Useful before persuasive</p><h2>Good information should leave you steadier, not more confused.</h2></div>
              <p>The Signal is Beacon’s public editorial library for people who want to examine a claim, a tool, or a change in the world of work with a little more care.</p>
            </div>
            <div className="home-signal-grid">
              {signalCards.map((card) => <Link className="home-signal-card" href={card.href} key={card.title}><FileText aria-hidden="true" size={19} /><h3>{card.title}</h3><p>{card.body}</p><span>Read the Signal <ArrowRight size={15} /></span></Link>)}
            </div>
            <Link className="home-signal-all" href="/signal"><BookOpen size={17} />Browse all Signal articles <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="home-closing">
          <div className="container">
            <p className="home-eyebrow">A public front door, not a pressure funnel</p>
            <h2>Start where you are. Build from there.</h2>
            <p>Beacon Momentum is the public orientation point for the Beacon family of properties. Every path should tell you what it is for, what it costs when there is a cost, and what happens when you continue.</p>
            <div className="home-closing-actions"><PrimaryLink href="/the-watch">Review The Watch</PrimaryLink><Link className="home-text-link" href="/resources">Explore public resources <ArrowRight size={15} /></Link></div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .home-v3 { background: var(--beacon-parchment); color: var(--beacon-charcoal); overflow-x: clip; }
        .home-v3 .home-signal-line { align-items: center; border-bottom: 1px solid currentColor; color: rgba(245,243,236,0.35); display: flex; font-family: var(--beacon-mono); font-size: 0.6rem; gap: 0.75rem; letter-spacing: 0.12em; padding-bottom: 0.8rem; }
        .home-v3 .home-signal-line > span:first-child { background: var(--beacon-amber); height: 1px; width: 2rem; }.home-v3 .home-signal-line > span:nth-child(2) { background: var(--beacon-teal-light); height: 1px; width: 1rem; }.home-v3 .home-signal-line i { flex: 1; }.home-v3 .home-signal-coordinates { white-space: nowrap; }
        .home-hero { background: var(--beacon-charcoal); color: var(--beacon-parchment); min-height: 760px; overflow: hidden; padding: clamp(9rem, 16vw, 13rem) 0 clamp(5rem, 9vw, 7rem); position: relative; }.home-hero-image,.home-hero-scrim { height: 100%; inset: 0; position: absolute; width: 100%; }.home-hero-image { object-fit: cover; object-position: center; }.home-hero-scrim { background: linear-gradient(90deg, rgba(22,36,51,.98) 0%, rgba(22,36,51,.92) 43%, rgba(22,36,51,.62) 72%, rgba(22,36,51,.72) 100%); }.home-hero-content { position: relative; }.home-hero-grid { align-items: end; display: grid; gap: clamp(2.5rem, 7vw, 7rem); grid-template-columns: minmax(0, 1.3fr) minmax(250px, .55fr); margin-top: clamp(2.5rem, 7vw, 5rem); }.home-eyebrow { color: var(--beacon-amber); font-family: var(--beacon-mono); font-size: .68rem; font-weight: 700; letter-spacing: .14em; margin: 0; text-transform: uppercase; }.home-hero h1 { font-size: clamp(3.25rem, 7.5vw, 7rem); letter-spacing: -.06em; line-height: .93; margin: 1.05rem 0 0; max-width: 820px; }.home-hero h1 em,.home-watch h2 em { color: rgba(245,243,236,.78); font-weight: 500; }.home-hero-copy { color: rgba(245,243,236,.8); font-size: clamp(1.04rem,1.65vw,1.22rem); line-height: 1.77; margin: 1.75rem 0 0; max-width: 680px; }.home-hero-actions,.home-closing-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.2rem; }.home-primary-link { align-items: center; background: var(--beacon-amber); color: var(--beacon-charcoal); display: inline-flex; font-family: var(--beacon-ui); font-size: .76rem; font-weight: 800; gap: .55rem; letter-spacing: .06em; padding: 1rem 1.15rem; text-decoration: none; text-transform: uppercase; }.home-primary-link:hover { background: var(--beacon-amber-light); }.home-primary-link-inverted { background: var(--beacon-amber); }.home-text-link { align-items: center; border-bottom: 1px solid rgba(245,243,236,.44); color: var(--beacon-parchment); display: inline-flex; font-size: .9rem; gap: .4rem; padding: .72rem 0; text-decoration: none; }.home-boundary-note { color: rgba(245,243,236,.58); font-size: .78rem; line-height: 1.6; margin: 1.1rem 0 0; max-width: 650px; }.home-hero-aside { border-left: 1px solid rgba(196,159,83,.65); color: rgba(245,243,236,.8); padding-left: 1.5rem; }.home-hero-aside > p:first-child { color: var(--beacon-amber); font-family: var(--beacon-mono); font-size: .65rem; font-weight: 700; letter-spacing: .13em; margin: 0; }.home-hero-aside h2 { font-family: var(--beacon-display); font-size: 2rem; line-height: 1.1; margin: 1.15rem 0 0; }.home-hero-aside div { align-items: end; display: flex; gap: .55rem; margin-top: 1.65rem; }.home-hero-aside div span { color: var(--beacon-parchment); font-family: var(--beacon-display); font-size: 3.6rem; font-weight: 600; line-height: .9; letter-spacing: -.06em; }.home-hero-aside div small { font-family: var(--beacon-mono); font-size: .65rem; letter-spacing: .1em; margin-bottom: .35rem; text-transform: uppercase; }.home-hero-aside > p:nth-of-type(2) { border-top: 1px solid rgba(245,243,236,.18); font-size: .85rem; line-height: 1.65; margin: 1.3rem 0 0; padding-top: 1rem; }.home-hero-aside a { align-items: center; color: var(--beacon-parchment); display: inline-flex; font-size: .82rem; gap: .4rem; margin-top: 1rem; text-underline-offset: .25rem; }
        .home-introduction { background: var(--beacon-parchment); padding: clamp(4.5rem,9vw,8rem) 0; }.home-introduction .home-signal-line,.home-routes .home-signal-line,.home-closing .home-signal-line { color: rgba(22,36,51,.25); }.home-introduction-grid { display: grid; gap: clamp(2.5rem,9vw,8rem); grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr); }.home-introduction h2,.home-section-heading h2,.home-closing h2 { font-size: clamp(2.35rem,4.8vw,4.85rem); line-height: 1.02; margin: 1.1rem 0 0; }.home-introduction-grid > div:nth-child(2) { color: rgba(22,36,51,.78); font-size: 1.06rem; line-height: 1.8; }.home-introduction-grid > div:nth-child(2) p { margin: 0 0 1.25rem; }.home-introduction-grid .home-promise { color: var(--beacon-charcoal); font-family: var(--beacon-display); font-size: 1.8rem; font-weight: 600; line-height: 1.25; }
        .home-watch { background: linear-gradient(135deg, #162433, #223345); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,8rem) 0; }.home-watch-grid { align-items: start; display: grid; gap: clamp(2.5rem,8vw,7.5rem); grid-template-columns: minmax(0,1fr) minmax(0,.9fr); margin-top: 3rem; }.home-watch h2 { font-size: clamp(2.7rem,5.5vw,5.8rem); line-height: .98; margin: 1rem 0 0; }.home-watch-copy { color: rgba(245,243,236,.78); font-size: 1.07rem; line-height: 1.78; margin: 1.55rem 0 0; max-width: 620px; }.home-watch .home-primary-link { margin-top: 2rem; }.home-watch-benefits { border-top: 1px solid rgba(196,159,83,.38); }.home-watch-benefits article { border-bottom: 1px solid rgba(196,159,83,.38); padding: 1.45rem 0 1.5rem 3rem; position: relative; }.home-watch-benefits article > span { color: var(--beacon-amber); font-family: var(--beacon-mono); font-size: .65rem; font-weight: 700; left: 0; letter-spacing: .14em; position: absolute; top: 1.65rem; }.home-watch-benefits h3 { font-family: var(--beacon-ui); font-size: 1.05rem; font-weight: 750; letter-spacing: 0; margin: 0; }.home-watch-benefits p { color: rgba(245,243,236,.7); font-size: .92rem; line-height: 1.7; margin: .6rem 0 0; }
        .home-routes { background: #E3F0EE; padding: clamp(4.5rem,9vw,8rem) 0; }.home-section-heading { align-items: end; display: grid; gap: clamp(2rem,8vw,7rem); grid-template-columns: minmax(0,1fr) minmax(0,.75fr); margin: 3rem 0; }.home-section-heading > p { color: var(--beacon-charcoal-mid); font-size: .99rem; line-height: 1.75; margin: 0; }.home-route-grid { display: grid; gap: 1px; grid-template-columns: repeat(3,minmax(0,1fr)); }.home-route-card { background: var(--beacon-parchment); border: 1px solid rgba(22,36,51,.14); display: flex; flex-direction: column; min-height: 340px; padding: clamp(1.4rem,3vw,2.25rem); }.home-route-card-primary { background: #F7F0DE; border-color: rgba(196,159,83,.75); }.home-route-card svg { color: var(--beacon-teal); }.home-route-card > p { color: var(--beacon-teal); font-family: var(--beacon-mono); font-size: .64rem; font-weight: 700; letter-spacing: .12em; margin: 2.1rem 0 0; text-transform: uppercase; }.home-route-card h3 { font-size: 2rem; margin: .8rem 0 0; }.home-route-card > span { color: var(--beacon-charcoal-mid); font-size: .92rem; line-height: 1.7; margin-top: .95rem; }.home-route-card a { align-items: center; color: var(--beacon-charcoal); display: inline-flex; font-family: var(--beacon-ui); font-size: .76rem; font-weight: 800; gap: .45rem; letter-spacing: .05em; margin-top: auto; padding-top: 1.75rem; text-decoration: underline; text-underline-offset: .25rem; text-transform: uppercase; }.home-route-boundary { border-left: 2px solid var(--beacon-amber); color: var(--beacon-charcoal-mid); font-size: .86rem; line-height: 1.65; margin: 2rem 0 0; max-width: 780px; padding-left: 1rem; }
        .home-signal { background: var(--beacon-charcoal); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,8rem) 0; }.home-section-heading-light > p { color: rgba(245,243,236,.7); }.home-signal-grid { display: grid; gap: 1px; grid-template-columns: repeat(3,minmax(0,1fr)); }.home-signal-card { background: rgba(245,243,236,.04); border: 1px solid rgba(245,243,236,.16); color: var(--beacon-parchment); display: flex; flex-direction: column; min-height: 290px; padding: clamp(1.4rem,2.7vw,2rem); text-decoration: none; }.home-signal-card:hover { background: rgba(245,243,236,.09); }.home-signal-card svg { color: var(--beacon-amber); }.home-signal-card h3 { font-size: 1.55rem; margin: 1.55rem 0 0; }.home-signal-card p { color: rgba(245,243,236,.72); font-size: .91rem; line-height: 1.7; margin: .85rem 0 0; }.home-signal-card span { align-items: center; color: var(--beacon-amber-light); display: inline-flex; font-family: var(--beacon-ui); font-size: .73rem; font-weight: 800; gap: .4rem; letter-spacing: .05em; margin-top: auto; padding-top: 1.4rem; text-transform: uppercase; }.home-signal-all { align-items: center; color: var(--beacon-parchment); display: inline-flex; font-family: var(--beacon-ui); font-size: .78rem; font-weight: 800; gap: .5rem; letter-spacing: .05em; margin-top: 2rem; text-decoration: underline; text-underline-offset: .28rem; text-transform: uppercase; }
        .home-closing { background: linear-gradient(125deg, #223345, #162433); color: var(--beacon-parchment); padding: clamp(4.5rem,9vw,7.5rem) 0; }.home-closing > .container { max-width: 1100px; }.home-closing > .container > p:not(.home-eyebrow) { color: rgba(245,243,236,.76); font-size: 1.05rem; line-height: 1.75; margin: 1.35rem 0 0; max-width: 680px; }.home-closing .home-text-link { color: var(--beacon-parchment); }
        @media (max-width: 820px) { .home-hero { min-height: 0; }.home-hero-grid,.home-introduction-grid,.home-watch-grid,.home-section-heading,.home-route-grid,.home-signal-grid { grid-template-columns: 1fr; }.home-hero-aside { max-width: 440px; }.home-section-heading { margin: 2.3rem 0; }.home-v3 .home-signal-line { align-items: flex-start; flex-wrap: wrap; }.home-v3 .home-signal-line i { display: none; }.home-signal-coordinates { width: 100%; }.home-route-card,.home-signal-card { min-height: 0; } }
      `}</style>
    </div>
  );
}
