import { Link } from "wouter";
import BeaconRouteLockup from "@/components/BeaconRouteLockup";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const COLORS = {
  deep: "#162433",
  water: "#223345",
  teal: "#2E7A7D",
  brass: "#C49F53",
  parchment: "#F5F3EC",
  mist: "rgba(245, 243, 236, 0.76)",
  line: "rgba(196, 159, 83, 0.28)",
};

const membershipCommitments = [
  {
    number: "01",
    title: "A clear annual membership",
    body: "Founding Year membership is $497 per year for the first 1,000 paid annual members. It is a membership purchase—not an investment, ownership interest, or promise of a financial outcome.",
  },
  {
    number: "02",
    title: "A practical place to work",
    body: "Begin with field guides, curriculum, a resource library, and a community environment designed to help you put one useful idea into practice at a time.",
  },
  {
    number: "03",
    title: "Progression you earn",
    body: "Every member begins as a Sentinel. Navigator and Quartermaster are marks of participation and contribution, not add-on plans or badges for sale.",
  },
];

const questions = [
  {
    question: "What does membership include?",
    answer: "The Watch includes member access to Beacon curriculum pathways, practical operating guides, community structure, and the recurring Watch Brief Premium member benefit. The exact member experience is shown before secure enrollment.",
  },
  {
    question: "What happens after the Founding Year period?",
    answer: "The current Founding Year rate is $497 per year for the first 1,000 paid annual members. A member who remains continuously active and paid keeps that renewal rate; later new-member pricing is published separately as terms change.",
  },
  {
    question: "Is The Watch an investment or a business opportunity?",
    answer: "No. The Watch is an annual learning and community membership. It does not create an investment, a loan, equity, revenue share, tax deduction, or an expected financial result.",
  },
  {
    question: "Can I cancel?",
    answer: "Cancellation stops a future renewal under the published terms. Access remains available through the paid annual period, and any later re-enrollment follows the terms and rate then in effect.",
  },
];

function FieldLabel({ children }: { children: string }) {
  return (
    <p
      style={{
        color: COLORS.brass,
        fontFamily: "var(--beacon-mono)",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        margin: 0,
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

export default function TheWatchPage() {
  return (
    <div
      data-design-system="foundation-v2"
      style={{
        background: COLORS.deep,
        color: COLORS.parchment,
        minHeight: "100vh",
      }}
    >
      <SharedNav />
      <main id="main-content">
        <section
          aria-label="The Watch identity"
          style={{ background: "rgba(22, 36, 51, 0.97)", borderBottom: `1px solid ${COLORS.line}` }}
        >
          <div
            className="container"
            style={{
              alignItems: "center",
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              minHeight: "76px",
            }}
          >
            <BeaconRouteLockup
              compact
              descriptor="The Watch · Founding Year"
              mutedColor={COLORS.mist}
              textColor={COLORS.parchment}
            />
            <Link
              href="/the-watch/checkout"
              style={{
                background: COLORS.brass,
                color: COLORS.deep,
                fontFamily: "var(--beacon-ui)",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                padding: "0.72rem 0.95rem",
                textDecoration: "none",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Review enrollment
            </Link>
          </div>
        </section>

        <section
          style={{
            background:
              "radial-gradient(ellipse 52% 78% at 88% 12%, rgba(196,159,83,0.18), transparent 55%), radial-gradient(ellipse 42% 60% at 70% 38%, rgba(46,122,125,0.23), transparent 62%), linear-gradient(125deg, #162433 0%, #223345 58%, #162433 100%)",
            borderBottom: `1px solid ${COLORS.line}`,
            padding: "clamp(5rem, 11vw, 9.5rem) 0 clamp(4.5rem, 9vw, 8rem)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: "850px" }}>
              <div className="watch-signal-strip" aria-hidden="true">
                <span />
                <span />
                <span>THE WATCH · MEMBER FIELD 01</span>
                <span>45°36′ N / 73°33′ W</span>
              </div>
              <div style={{ marginTop: "2.25rem" }}>
                <FieldLabel>The Watch · Founding Year</FieldLabel>
                <h1
                  style={{
                    fontFamily: "var(--beacon-display)",
                    fontSize: "clamp(3.35rem, 8vw, 7rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.06em",
                    lineHeight: 0.94,
                    margin: "1.1rem 0 0",
                    maxWidth: "800px",
                  }}
                >
                  The lighthouse is lit.
                  <br />
                  <em style={{ color: "rgba(245,243,236,0.78)", fontWeight: 500 }}>
                    Take your post for the year ahead.
                  </em>
                </h1>
                <p
                  style={{
                    color: COLORS.mist,
                    fontSize: "clamp(1.05rem, 1.75vw, 1.25rem)",
                    lineHeight: 1.75,
                    margin: "1.75rem 0 0",
                    maxWidth: "670px",
                  }}
                >
                  The Watch is a practical learning and community environment for people who want a steadier way to
                  navigate work, technology, and change. It begins with a clear commitment: do useful work, keep your
                  judgment visible, and build an operating rhythm that can carry forward.
                </p>
                <div className="watch-actions" style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", marginTop: "2.4rem" }}>
                  <Link
                    href="/the-watch/checkout"
                    style={{
                      background: COLORS.brass,
                      color: COLORS.deep,
                      fontFamily: "var(--beacon-ui)",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      letterSpacing: "0.06em",
                      padding: "1rem 1.25rem",
                      textDecoration: "none",
                      textTransform: "uppercase",
                    }}
                  >
                    Review Founding Year enrollment
                  </Link>
                  <a
                    href="#membership"
                    style={{
                      borderBottom: "1px solid rgba(245,243,236,0.42)",
                      color: COLORS.parchment,
                      fontSize: "0.86rem",
                      padding: "1rem 0.25rem",
                      textDecoration: "none",
                    }}
                  >
                    See what membership holds ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="membership" style={{ background: COLORS.parchment, color: COLORS.deep, padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container">
            <div className="watch-intro-grid">
              <div>
                <FieldLabel>Membership, without the maze</FieldLabel>
                <h2 style={{ fontSize: "clamp(2.3rem, 4.6vw, 4.7rem)", lineHeight: 1.01, margin: "1rem 0 0", maxWidth: "610px" }}>
                  A clear purchase.
                  <br />
                  <em style={{ color: "var(--beacon-teal)", fontWeight: 500 }}>A living practice.</em>
                </h2>
              </div>
              <div style={{ alignSelf: "end" }}>
                <p style={{ color: "rgba(22,36,51,0.78)", fontSize: "1.08rem", lineHeight: 1.8, margin: 0 }}>
                  Founding Year enrollment is $497 per year for the first 1,000 paid annual members. We state the
                  membership, access, renewal terms, and boundaries plainly before you enroll—because a good decision
                  does not need a pressure trick.
                </p>
                <p style={{ color: "rgba(22,36,51,0.7)", fontSize: "0.94rem", lineHeight: 1.7, margin: "1.15rem 0 0" }}>
                  The later new-member annual rate is $997. A Founding Year member who stays continuously active and
                  paid retains the $497 annual renewal rate under the published terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: COLORS.water, padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container">
            <FieldLabel>What begins here</FieldLabel>
            <h2 style={{ fontSize: "clamp(2.35rem, 4.7vw, 4.8rem)", lineHeight: 1.02, margin: "1rem 0 3rem", maxWidth: "780px" }}>
              Start with a field kit.
              <br />
              <em style={{ color: "rgba(245,243,236,0.72)", fontWeight: 500 }}>Stay for the operating rhythm.</em>
            </h2>
            <div className="watch-commitment-grid">
              {membershipCommitments.map((commitment) => (
                <article key={commitment.number} style={{ background: "rgba(22,36,51,0.35)", border: `1px solid ${COLORS.line}`, minHeight: "275px", padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  <p style={{ color: COLORS.brass, fontFamily: "var(--beacon-mono)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", margin: 0 }}>{commitment.number}</p>
                  <h3 style={{ fontSize: "1.78rem", margin: "2.4rem 0 0" }}>{commitment.title}</h3>
                  <p style={{ color: COLORS.mist, fontSize: "0.95rem", lineHeight: 1.75, margin: "0.85rem 0 0" }}>{commitment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: COLORS.deep, padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container watch-intro-grid">
            <div>
              <FieldLabel>Clear terms, held in view</FieldLabel>
              <h2 style={{ fontSize: "clamp(2.25rem, 4.2vw, 4.25rem)", lineHeight: 1.03, margin: "1rem 0 0" }}>
                Questions deserve
                <br />
                <em style={{ color: "rgba(245,243,236,0.72)", fontWeight: 500 }}>straight answers.</em>
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
              {questions.map(({ question, answer }) => (
                <article key={question} style={{ borderBottom: `1px solid ${COLORS.line}`, padding: "1.35rem 0" }}>
                  <h3 style={{ color: COLORS.parchment, fontFamily: "var(--beacon-ui)", fontSize: "1rem", fontWeight: 750, letterSpacing: 0, margin: 0 }}>{question}</h3>
                  <p style={{ color: COLORS.mist, fontSize: "0.93rem", lineHeight: 1.72, margin: "0.65rem 0 0" }}>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "linear-gradient(130deg, #223345, #162433)", padding: "clamp(4.5rem, 9vw, 8rem) 0" }}>
          <div className="container" style={{ maxWidth: "1100px" }}>
            <FieldLabel>Founding Year enrollment</FieldLabel>
            <h2 style={{ fontSize: "clamp(2.4rem, 5vw, 5.2rem)", lineHeight: 1.02, margin: "1rem 0 0", maxWidth: "860px" }}>
              If the work is useful to you, choose your post for the year ahead.
            </h2>
            <p style={{ color: COLORS.mist, fontSize: "1.08rem", lineHeight: 1.75, margin: "1.35rem 0 0", maxWidth: "680px" }}>
              Review the access, annual renewal terms, and payment details before you enroll. The Watch is here for a
              steady practice—not a rush toward a checkout.
            </p>
            <Link
              href="/the-watch/checkout"
              style={{ background: COLORS.brass, color: COLORS.deep, display: "inline-block", fontFamily: "var(--beacon-ui)", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.07em", marginTop: "2rem", padding: "1rem 1.25rem", textDecoration: "none", textTransform: "uppercase" }}
            >
              Continue to secure enrollment
            </Link>
          </div>
        </section>
      </main>
      <SharedFooter />
      <style>{`
        .watch-signal-strip { align-items: center; border-bottom: 1px solid rgba(245,243,236,0.17); color: rgba(245,243,236,0.56); display: flex; font-family: var(--beacon-mono); font-size: 0.62rem; gap: 0.85rem; letter-spacing: 0.09em; padding-bottom: 0.8rem; }
        .watch-signal-strip span:first-child { background: var(--beacon-amber); height: 1px; width: 2rem; }
        .watch-signal-strip span:nth-child(2) { background: var(--beacon-teal-light); height: 1px; width: 1rem; }
        .watch-signal-strip span:last-child { margin-left: auto; white-space: nowrap; }
        .watch-intro-grid { align-items: start; display: grid; gap: clamp(2rem, 8vw, 7rem); grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
        .watch-commitment-grid { display: grid; gap: 1px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        @media (max-width: 760px) {
          .watch-intro-grid, .watch-commitment-grid { grid-template-columns: 1fr; }
          .watch-signal-strip { align-items: flex-start; flex-wrap: wrap; }
          .watch-signal-strip span:last-child { margin-left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
