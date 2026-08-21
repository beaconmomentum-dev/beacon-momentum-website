/**
 * Beacon Momentum — Manifesto Page (/manifesto)
 * "Against the Noise" — A letter from Beacon's founder.
 * Design: Deep Water Editorial / Quiet Authority — matches FounderNotePage and AboutPage
 */

import { Link } from "wouter";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const body = "'Lora', Georgia, serif";

/* ── Reusable section wrapper ─────────────────────────────────────────────── */
function Prose({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
      color: "var(--beacon-charcoal)",
      margin: "0 0 1.5rem",
      paddingTop: "1rem",
      borderTop: "2px solid var(--beacon-amber)",
    }}>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: body,
      fontSize: "1.05rem",
      lineHeight: 1.85,
      color: "var(--beacon-charcoal-mid)",
      margin: "0 0 1.4rem",
    }}>
      {children}
    </p>
  );
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: serif,
      fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
      fontWeight: 500,
      lineHeight: 1.5,
      color: "var(--beacon-teal)",
      margin: "1.5rem 0 1.8rem",
      fontStyle: "italic",
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--beacon-parchment-dark)", margin: "2.5rem 0" }} />;
}

export default function ManifestoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--beacon-parchment)" }}>
      <SharedNav dark />
      <main id="main-content">
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section style={{
          background: "radial-gradient(circle at 82% 12%, rgba(207,162,86,0.20), transparent 28%), linear-gradient(135deg, #112B35 0%, var(--beacon-charcoal) 68%)",
          color: "#FAF8F4",
          padding: "clamp(5rem, 10vw, 9rem) 0 clamp(3.5rem, 7vw, 6rem)",
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
            <p style={{
              color: "var(--beacon-amber-light)",
              fontFamily: sans,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.17em",
              textTransform: "uppercase",
              margin: 0,
            }}>
              A letter from Beacon's founder
            </p>
            <h1 style={{
              margin: "1rem 0 0",
              maxWidth: "820px",
              fontFamily: serif,
              fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: "-0.045em",
            }}>
              Against the Noise
            </h1>
            <p style={{
              maxWidth: "700px",
              margin: "1.7rem 0 0",
              color: "rgba(250,248,244,0.78)",
              fontFamily: body,
              fontSize: "1.08rem",
              lineHeight: 1.82,
            }}>
              What Beacon Momentum believes, what we stand against, and why any of it matters. No hedging. No performance. A direct statement of conviction.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "2rem" }}>
              <Link href="/manifesto/questions" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: "var(--beacon-amber)",
                color: "var(--beacon-charcoal)",
                padding: "0.9rem 1.15rem",
                textDecoration: "none",
                fontFamily: sans,
                fontSize: "0.77rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                The Questions Everyone Asks
              </Link>
            </div>
          </div>
        </section>

        {/* ── VIDEO ──────────────────────────────────────────────────────────── */}
        <Prose id="video">
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            background: "#0a0a0a",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}>
            <video
              controls
              preload="metadata"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            >
              <source src="https://files2.heygen.ai/aws_pacific/avatar_tmp/6800fc6a59db48da912a3e4e7c308dea/3cb0f81caa8745ec8dd60e52d014b6f6.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p style={{
            fontFamily: sans,
            fontSize: "0.75rem",
            color: "var(--beacon-charcoal-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 1rem",
          }}>Watch: Against the Noise — 6:02</p>
        </Prose>

        <Divider />

        {/* ── OPENING ──────────────────────────────────────────────────────── */}
        <Prose>
          <P>I have been quiet for too long about what this is.</P>
          <P>Beacon Momentum has existed for a while now. We have built systems. We have produced content. We have assembled tools and frameworks and pipelines. But I have never stood in front of you and said, plainly, what we believe. What we stand for. What we stand against. And why any of it matters.</P>
          <P>That ends today.</P>
        </Prose>

        <Divider />

        {/* ── WHAT WE SEE ──────────────────────────────────────────────────── */}
        <Prose id="what-we-see">
          <SectionHeading>What We See</SectionHeading>
          <P>The world around us is energy. Not metaphor — energy. A quantum field that is above, around, and through everything that exists. What we call reality is shaped by our perception, and that perception has been colored by every institution that ever claimed authority over your understanding — religious, scientific, political, corporate. Each of them framing the infinite in ways that serve their power rather than your clarity.</P>
          <P>I am not anti-religion. I believe there is something greater than us — something woven into the fabric of everything. But I will not pretend that any single institution has cornered the market on truth. They haven't. And the honest admission that we don't have all the answers is more valuable than the false certainty that pretends we do.</P>
          <P>We are standing on the next great cusp of human evolution. AI is not coming. It is here. Many long-held truths will be proved wrong in our lifetime. That is not a threat — it is the most extraordinary opportunity any generation has been handed. The people who thrive will be the ones who can think clearly, adapt honestly, and build with intention. Not the ones who cling to frameworks that no longer hold.</P>
        </Prose>

        <Divider />

        {/* ── WHAT WE BELIEVE ABOUT YOU ─────────────────────────────────────── */}
        <Prose id="what-we-believe">
          <SectionHeading>What We Believe About You</SectionHeading>
          <P>When people think clearly and have honest direction, there is no limit to what they can accomplish. None. The human spirit — the ability to mix logic and emotion, to create meaning from chaos, to operate beyond mere intellect and animalistic survival — makes us unique in ways no machine will ever replicate.</P>
          <Emphasis>Machines produce volume. Humans produce meaning.</Emphasis>
          <P>That distinction is the foundation of everything we teach.</P>
          <P>And we believe this capacity belongs to everyone. There is one race: the human race. We are not divided by appearance, though powerful interests have spent centuries making it seem that way. The frameworks that separate people by skin color, geography, religion, or political tribe are tools of control. They are not descriptions of reality. Beacon exists for anyone, anywhere, who wants to become their best self. The only requirement is mutual respect.</P>
        </Prose>

        <Divider />

        {/* ── WHAT WE STAND AGAINST ────────────────────────────────────────── */}
        <Prose id="what-we-stand-against">
          <SectionHeading>What We Stand Against</SectionHeading>
          <P>I will be direct.</P>
          <P>The government is not currently accountable to the people it serves. We stand against the lying and manipulation that keeps citizens fighting each other instead of collectively addressing the power above them. This is not a partisan statement. I don't care which party is doing it. When any institution — government, media, corporate, academic — operates without accountability, it becomes an instrument of control rather than service. We stand against that inversion. Full stop.</P>
          <P>We stand against coercion in all its forms. Not against any individual's faith or spiritual practice — every person has the right to believe and worship as they choose. What we oppose is the ideology of coercion: the political use of any belief system, religious or secular, to demand submission, eliminate dissent, and override individual liberty.</P>
          <P>This is not theoretical for me. I have been to the places where coercive ideology operates. I have seen what it produces on the ground — not through a news feed, but with my own eyes. America has faced this confrontation before. Jefferson and Madison refused to pay tribute to the Barbary States not because of what those states believed, but because of what they demanded: submission or destruction.</P>
          <P>The American answer then was the same as it should be now. We do not submit. We do not bow to any ideology that requires obedience over consent. The ideological war is not coming to this country. It is here. It has been here. And we stand on the side of liberty.</P>
        </Prose>

        <Divider />

        {/* ── WHAT WE OWE FORWARD ──────────────────────────────────────────── */}
        <Prose id="what-we-owe">
          <SectionHeading>What We Owe Forward</SectionHeading>
          <P>I was taught the American Dream in the 1960s and 1970s. Not the reframed version. The original. The promise that any person, regardless of where they start, can build a life of meaning, prosperity, and freedom through hard work, clear thinking, and personal responsibility.</P>
          <P>That dream was real. I received it. And I want for the children coming up what was available to me. Not a degraded version. Not a redefined version. The original: freedom, responsibility, opportunity, and the right to build something that outlasts you.</P>
          <P>Being a citizen of this country — whether born into it or having chosen it — carries the responsibility to protect what it affords each individual. That responsibility does not end at your own front door. We must defend not only our own rights, but the rights of our peers, our children, and our elders to live in peace and harmony with one another.</P>
          <P>That means being disciplined enough to look past the noise. Past the fake news. Past the political rhetoric. Past all forms of deceit designed to keep us confused, afraid, and at each other's throats. The covenant of citizenship demands that we see clearly — especially when powerful interests are spending enormous resources to make sure we don't.</P>
        </Prose>

        <Divider />

        {/* ── WHAT BEACON IS ───────────────────────────────────────────────── */}
        <Prose id="what-beacon-is">
          <SectionHeading>What Beacon Is</SectionHeading>
          <P>Beacon provides a solid foundation — workable systems that support the American Dream to flourish and eliminate the noise so that all can succeed.</P>
          <P>We are not a political movement. We are not a religion. We are not selling certainty. We are a community built on shared values: the unlimited capacity of the human spirit, the responsibility of citizenship, the refusal to submit to coercion, and the conviction that every person deserves the clarity to build their own life on solid ground.</P>
          <Emphasis>We don't tell you what to think. We insist that you think at all.</Emphasis>
          <P>If that resonates — if you have been looking for a place that holds these values without the partisanship, without the conspiracy framing, without the exclusionary tribalism, without the noise — then you are already one of us. You just didn't know we were here.</P>
          <P>Now you do.</P>
        </Prose>

        {/* ── SIGNATURE ────────────────────────────────────────────────────── */}
        <section style={{ padding: "0 0 clamp(2rem, 4vw, 3rem)" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
            <div style={{
              borderTop: "2px solid var(--beacon-charcoal)",
              paddingTop: "1.5rem",
              marginTop: "1rem",
            }}>
              <p style={{
                fontFamily: serif,
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "var(--beacon-charcoal)",
                margin: 0,
              }}>
                Bob Burr
              </p>
              <p style={{
                fontFamily: sans,
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--beacon-charcoal-mid)",
                letterSpacing: "0.04em",
                margin: "0.3rem 0 0",
              }}>
                Founder, Beacon Momentum
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={{
          background: "var(--beacon-charcoal)",
          color: "#FAF8F4",
          padding: "clamp(3rem, 6vw, 5rem) 0",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
            <p style={{
              fontFamily: body,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(250,248,244,0.7)",
              fontStyle: "italic",
              margin: "0 0 1.5rem",
            }}>
              Beacon Momentum exists for anyone who wants to become their best self based on holistic principles of health, human consciousness, and good citizenry. The light is not ours. We just point at it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" }}>
              <Link href="/manifesto/questions" style={{
                display: "inline-block",
                background: "var(--beacon-amber)",
                color: "var(--beacon-charcoal)",
                padding: "0.9rem 1.5rem",
                textDecoration: "none",
                fontFamily: sans,
                fontSize: "0.77rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                Read the Q&A
              </Link>
              <Link href="/the-watch" style={{
                display: "inline-block",
                border: "1px solid rgba(250,248,244,0.34)",
                color: "#FAF8F4",
                padding: "0.9rem 1.5rem",
                textDecoration: "none",
                fontFamily: sans,
                fontSize: "0.77rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                Explore The Watch
              </Link>
            </div>
            <p style={{
              fontFamily: body,
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--beacon-amber-light)",
              margin: "2rem 0 0",
              fontStyle: "italic",
            }}>
              If this is how you see the world, Beacon is where we build on it.
            </p>
          </div>
        </section>
      </main>
      <SharedFooter />
    </div>
  );
}
