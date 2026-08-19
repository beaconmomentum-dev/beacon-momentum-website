/**
 * Beacon Momentum — Manifesto Q&A Page (/manifesto/questions)
 * "The Questions Everyone Asks" — companion to "Against the Noise"
 * Design: Deep Water Editorial / Quiet Authority
 */

import { Link } from "wouter";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const body = "'Lora', Georgia, serif";

function QA({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "clamp(2rem, 4vw, 3rem) 0", borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
        <h2 style={{
          fontFamily: serif,
          fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--beacon-teal)",
          margin: "0 0 1.3rem",
          fontStyle: "italic",
        }}>
          {question}
        </h2>
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: body,
      fontSize: "1.05rem",
      lineHeight: 1.85,
      color: "var(--beacon-charcoal-mid)",
      margin: "0 0 1.3rem",
    }}>
      {children}
    </p>
  );
}

export default function ManifestoQAPage() {
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
              A follow-up to "Against the Noise"
            </p>
            <h1 style={{
              margin: "1rem 0 0",
              maxWidth: "820px",
              fontFamily: serif,
              fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: "-0.045em",
            }}>
              The Questions Everyone Asks
            </h1>
            <p style={{
              maxWidth: "700px",
              margin: "1.7rem 0 0",
              color: "rgba(250,248,244,0.78)",
              fontFamily: body,
              fontSize: "1.08rem",
              lineHeight: 1.82,
            }}>
              Direct answers to the things people want to know before they decide if Beacon is for them. No hedging. No corporate non-answers.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "2rem" }}>
              <Link href="/manifesto" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                color: "#FAF8F4",
                border: "1px solid rgba(250,248,244,0.34)",
                padding: "0.9rem 1.15rem",
                textDecoration: "none",
                fontFamily: sans,
                fontSize: "0.77rem",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>
                Read the Manifesto
              </Link>
            </div>
          </div>
        </section>

        {/* ── INTRO ────────────────────────────────────────────────────────── */}
        <section style={{ padding: "clamp(2rem, 4vw, 3rem) 0", borderBottom: "1px solid var(--beacon-parchment-dark)" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
            <P>We published our manifesto. We said what we believe. And the responses came in exactly as expected — not with disagreement on the principles, but with requests for clarity on where the principles lead when applied to specific questions.</P>
            <P>Fair enough. Here they are. No hedging. No corporate non-answers. If you're going to stand with us, you deserve to know exactly where we stand.</P>
          </div>
        </section>

        {/* ── Q1: ISLAM ────────────────────────────────────────────────────── */}
        <QA question={`"Are you pro-Islam or anti-Islam?"`}>
          <P>We are against any system that seeks to replace constitutional governance with its own authority. We apply that principle without exception.</P>
          <P>If a Christian theocratic movement sought political power to replace the Constitution with biblical law, we would oppose it. If a corporate oligarchy sought to replace democratic governance with shareholder rule, we would oppose it. If a Marxist movement sought to abolish constitutional rights in favor of state authority, we would oppose it. The principle is consistent: no system gets to dismantle the constitutional order, regardless of what banner it flies.</P>
          <P>This is not academic for me. I have been to the places where this question plays out in real life. I have seen, with my own eyes, what a society looks like when Sharia is the governing authority. I did not read about it. I stood in it. And what I saw is incompatible with everything the Constitution promises.</P>
          <P>Islam, taken as a complete system rather than a private spiritual practice, includes within it a comprehensive legal and political framework that explicitly claims authority above any secular constitution. It does not recognize the separation of religious and civil law. It does not recognize equal standing regardless of sex or creed. It does not recognize the right to leave the faith without consequence. And its political doctrine calls for the establishment of this framework as governing law wherever its adherents hold sufficient power.</P>
          <P>This is not a fringe interpretation. It is the system as codified. Individual Muslims may choose to practice selectively, and many do — and their right to private belief is constitutionally protected and personally respected. I have broken bread with people of every faith on every continent. But the system itself, in its political totality, is incompatible with the constitutional order.</P>
          <P>When its political arms seek office for the purpose of advancing Sharia as law, they are not exercising religious freedom. They are conducting a political campaign to end it. And that must be opposed through every legitimate legislative and civic means available.</P>
          <P>Japan made this determination and acted to protect its cultural and legal sovereignty. That decision deserves serious consideration rather than the reflexive accusation of bigotry that currently shuts down every honest conversation about it.</P>
          <P>Beacon's position is not born of hatred. It is born of the same principle that animates every other pillar in our manifesto: no power — foreign or domestic, religious or secular — has the right to compel the conscience of a free citizen or dismantle the constitutional framework that protects that freedom. I don't hate anyone. But I will not pretend that a system designed to replace my Constitution is compatible with it. That pretense is the noise Beacon exists to cut through.</P>
        </QA>

        {/* ── Q2: CONSERVATIVE ─────────────────────────────────────────────── */}
        <QA question={`"Are you a conservative platform?"`}>
          <P>No. We are a constitutional platform.</P>
          <P>Conservatives have been right about some things. Progressives have been right about some things. Neither party has earned unconditional loyalty, and both have participated in the erosion of the compact between citizens and government.</P>
          <P>Beacon does not ask what party you belong to. Beacon asks whether you believe in personal responsibility, individual liberty, the unlimited capacity of the human spirit, and the duty to pass the American Dream forward intact. If you do, you belong here regardless of how you voted last November.</P>
          <P>The moment we become a vehicle for any party, we become captured. Captured platforms serve the party. Beacon serves the people in it.</P>
        </QA>

        {/* ── Q3: NEW AGE ──────────────────────────────────────────────────── */}
        <QA question={`"You talk about energy and quantum fields — is this a New Age thing?"`}>
          <P>No. It is an observation about the nature of reality that physics has been confirming for over a century and that institutions have been slow to integrate because it undermines their authority models.</P>
          <P>We are not selling crystals. We are not channeling spirits. We are not asking you to abandon reason. We are saying that the materialist framework — the idea that reality is only what you can measure with instruments built on assumptions from the 1800s — is incomplete. Consciousness plays a role in shaping reality. Perception is not passive. The observer affects the observed.</P>
          <P>This is not mysticism. It is what happens when you take quantum mechanics seriously instead of compartmentalizing it as "only applicable at the subatomic level." We hold this position with intellectual honesty, not dogmatic certainty. If better evidence emerges, we follow it. That is the difference between inquiry and ideology.</P>
        </QA>

        {/* ── Q4: IDEOLOGICAL WAR ──────────────────────────────────────────── */}
        <QA question={`"What do you mean the ideological war is already here?"`}>
          <P>We mean exactly what we said.</P>
          <P>The ideological war is not a future scenario. It is a present reality operating on multiple fronts: the capture of academic institutions by ideologies that reject open inquiry; the infiltration of political systems by movements that seek to replace constitutional governance with alternative legal frameworks; the corporate enforcement of speech codes that have no basis in law; and the media's active participation in manufacturing division rather than reporting truth.</P>
          <P>None of this is hidden. It is happening in plain sight. The war is not kinetic — it is ideological. It is fought through institutional capture, legislative subversion, cultural intimidation, and the deliberate confusion of citizens who might otherwise organize against it.</P>
          <P>Beacon's role is not to fight this war for you. It is to make sure you can see it clearly enough to make your own decisions about how to respond.</P>
        </QA>

        {/* ── Q5: RACISM ───────────────────────────────────────────────────── */}
        <QA question={`"You say one race, the human race — but do you acknowledge that racism exists?"`}>
          <P>Of course it exists. Denying the existence of racism would be as dishonest as the frameworks we oppose.</P>
          <P>What we reject is the weaponization of racial categories as permanent political identities. Racism exists as a human failing — a failure of individuals and sometimes institutions to see past appearance to the shared humanity underneath. That failing is real; it causes real harm, and it should be opposed wherever it appears.</P>
          <P>But the modern framework that assigns permanent victim and oppressor status based on skin color, that demands racial consciousness as a prerequisite for moral standing, that insists the solution to historical racism is more racial categorization — that framework is a tool of division, not healing. It keeps people fighting each other instead of building together.</P>
          <P>Beacon's position: racism is a failure to see clearly. The solution is clarity, not more categories. We treat every person as an individual. We demand mutual respect. And we refuse to sort human beings into boxes that serve political interests rather than human flourishing.</P>
        </QA>

        {/* ── Q6: MEMBERSHIP ───────────────────────────────────────────────── */}
        <QA question={`"Is this a membership you're selling? What's the catch?"`}>
          <P>Beacon Momentum is a community with a membership component. The manifesto is not a sales pitch. It is a statement of values. You can read it, share it, and never give us a dollar, and we consider that a success — because every person who sees the world more clearly makes the world marginally better for everyone else.</P>
          <P>For those who want to go deeper — who want the systems, the frameworks, the tools, and the community of people building on these principles — yes, there is a membership. Membership is currently $497 per year. It is called The Watch. It includes access to the Beacon community, AI-powered tools, mentorship frameworks, and content designed to sharpen your thinking and support your building.</P>
          <P>But the values are free. The manifesto is free. The clarity is free. We are not gatekeeping the worldview. We are gatekeeping the systems that help you act on it.</P>
        </QA>

        {/* ── Q7: WHO IS BOB ───────────────────────────────────────────────── */}
        <QA question={`"Who is Bob Burr? Why should I listen to him?"`}>
          <P>I am a military veteran who has been to the places most people only read about. I am a founder who has built businesses from nothing. I am a citizen who was taught the Constitution in the 1960s and watched the compact erode for six decades. I am a technologist who sees AI not as a threat but as the most powerful tool for human liberation ever created. And I am a man who got tired of watching people with platforms waste them on partisan performance instead of saying something true.</P>
          <P>I don't ask you to listen to me because of credentials. I ask you to listen because what I'm saying either resonates with what you already know to be true, or it doesn't. If it does — welcome. If it doesn't — no hard feelings. Beacon is not for everyone. It is for the people who recognize themselves in these words.</P>
        </QA>

        {/* ── Q8: DIFFERENT ────────────────────────────────────────────────── */}
        <QA question={`"What makes Beacon different from every other 'free thinking' community?"`}>
          <P>Two things.</P>
          <P>First, we actually build. Most communities in this space are consumption platforms — you watch videos, read posts, nod along, and nothing in your life changes. Beacon provides workable systems. AI-powered tools. Frameworks you can apply to your business, your health, your thinking, and your citizenship. The community exists to build, not just to agree with each other.</P>
          <P>Second, we don't flinch. Most platforms in this space eventually get captured — by a party, by an algorithm, by the fear of losing sponsors. They start strong and soften over time. Beacon's values are structural, not performative. They are built into the systems, the content approval framework, and the community guidelines. They don't change based on who's upset this week.</P>
        </QA>

        {/* ── Q9: AI ───────────────────────────────────────────────────────── */}
        <QA question={`"You mention AI a lot. Is this an AI company?"`}>
          <P>Beacon uses AI extensively — in our content production, our research tools, our member services, and our operational systems. But we are not an AI company. We are a human company that uses AI the way it should be used: to handle volume so humans can focus on meaning.</P>
          <P>Our position on AI is clear: it is the most powerful tool for human advancement since the printing press. It will eliminate diseases, solve problems we've accepted as permanent, and give individuals leverage that was previously only available to institutions. The people who learn to work with it — clearly, ethically, and intentionally — will thrive. The people who fear it or ignore it will be left behind.</P>
          <P>Beacon teaches you how to be in the first group.</P>
        </QA>

        {/* ── Q10: DISAGREE ────────────────────────────────────────────────── */}
        <QA question={`"What if I disagree with one of your positions?"`}>
          <P>Good. Disagreement is not disloyalty. It is thinking.</P>
          <P>Beacon is not a doctrine. We have stated our convictions openly so you know where we stand. We do not require agreement on every point. We require mutual respect and intellectual honesty. If you share the foundational values — human liberty, personal responsibility, clear thinking, and the refusal to submit to coercion — you belong here even if you disagree with us on specific applications.</P>
          <P>The only thing that gets you removed from this community is the violation of mutual respect. Attack ideas all day long. Attack people and you're gone.</P>
        </QA>

        {/* ── CLOSING ──────────────────────────────────────────────────────── */}
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
              margin: "0 0 0.8rem",
            }}>
              These are the questions everyone asks. If yours wasn't here, ask it. We don't hide from hard questions. We answer them.
            </p>
            <p style={{
              fontFamily: body,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--beacon-amber-light)",
              fontStyle: "italic",
              margin: "0 0 2rem",
            }}>
              If this is how you see the world, Beacon is where we build on it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.8rem" }}>
              <Link href="/manifesto" style={{
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
                Read the Manifesto
              </Link>
              <Link href="/contact" style={{
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
                Ask Your Question
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
    </div>
  );
}
