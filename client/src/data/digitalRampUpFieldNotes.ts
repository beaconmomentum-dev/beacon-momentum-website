export interface DigitalRampUpFieldNote {
  number: string;
  slug: string;
  title: string;
  deck: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  accent: string;
  image: string;
  alt: string;
  body: string;
  fieldQuestion: string;
  ctaLabel: string;
  ctaHref: string;
  isFrameworkNote?: boolean;
}

export const DIGITAL_RAMP_UP_FIELD_NOTES: DigitalRampUpFieldNote[] = [
  {
    number: "01",
    slug: "start-with-the-work-not-the-tool",
    title: "Start With the Work, Not the Tool",
    deck: "A digital ramp-up begins when a real piece of work becomes clearer—not when another application is added to the stack.",
    excerpt: "Capability begins by naming the repeated piece of work worth making clearer, more reliable, and easier to carry forward.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#2E7D6B",
    image: "/images/field-notes/field-note-01-start-with-work.jpg",
    alt: "A field-card illustration of scattered task notes becoming one clear working sequence.",
    body: `<p class="beacon-article-lede">The loudest part of the technology conversation is usually the tool. Which model is new? Which app can do the most? Which automation is supposed to change everything?</p><p>That is rarely where the useful work begins.</p><p>The better starting point is quieter: <strong>What do you keep doing that deserves to become clearer, more reliable, or easier to carry forward?</strong> It might be preparing a client update, comparing sources before making a decision, collecting the materials for a class, organizing a production handoff, or rebuilding the same explanation for a new audience.</p><p>When that work is named plainly, technology has a job. It can help gather, compare, organize, draft, check, and prepare. When the work is not named, technology creates a different kind of activity: more tabs, more subscriptions, more fragments, and more pressure to look busy.</p><p>Beacon learned this through iteration. A tool can be impressive and still be the wrong answer to the task in front of you. A workflow becomes valuable only when it improves the next useful action: a clearer decision, a better source record, a more complete draft, a shorter handoff, or a piece of work that does not have to be rebuilt from scratch next week.</p><h2>Start with the work.</h2><p>Write down one repeated task in one sentence. Name the source material it depends on. Name the human decision that follows it. Then ask whether a tool could reduce the friction in the middle without taking responsibility for the beginning or the end.</p><p>That is a real starting point. It is not glamorous, but it is how capability accumulates.</p>`,
    fieldQuestion: "What is one repeated piece of work you are still rebuilding because nobody has given it a durable process?",
    ctaLabel: "Explore Beacon Momentum’s public orientation",
    ctaHref: "/",
  },
  {
    number: "02",
    slug: "your-work-needs-a-memory",
    title: "Your Work Needs a Memory",
    deck: "The point is not to own every tool. The point is to keep useful context from disappearing whenever a project, prompt, or subscription ends.",
    excerpt: "Useful effort becomes cumulative when the source set, working notes, decision record, and approved result remain close to the work.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#1A5C6B",
    image: "/images/field-notes/field-note-02-work-needs-memory.jpg",
    alt: "A Beacon field card showing source material, work notes, and a final human decision connected in one retained record.",
    body: `<p class="beacon-article-lede">Most people do not lose work because they failed to work hard. They lose it because the work has no memory.</p><p>The source is in one place. The draft is in another. The decision that changed the direction lives in an old message. The final version was created inside a platform that cannot explain where it came from. A month later, the same question returns and everyone begins again.</p><p>That is not a lack of intelligence. It is a lack of continuity.</p><p>Beacon’s operating lesson is not that every organization must own every server, model, or service. It is more practical: <strong>own enough of the rails that the work does not lose its evidence, its decisions, or its accountability.</strong> Keep the source material, the working notes, the reusable patterns, and the human approval close enough that the next project can start from what was already learned.</p><p>Outside tools still have a place. A public platform can help distribute work. A specialist service can help complete a one-time task. A cloud provider can add reach or redundancy. The trouble begins when those outside systems become the only place where the organization remembers what it did and why.</p><h2>Retain four things.</h2><table><thead><tr><th>Keep this</th><th>Why it matters</th></tr></thead><tbody><tr><td><strong>The source set</strong></td><td>You can return to the actual material instead of a vague recollection.</td></tr><tr><td><strong>The working notes</strong></td><td>Useful thinking does not disappear between projects.</td></tr><tr><td><strong>The decision record</strong></td><td>People can understand why a direction was chosen.</td></tr><tr><td><strong>The approved result</strong></td><td>The next version starts from a known baseline.</td></tr></tbody></table><p>That is not bureaucracy. It is how effort becomes cumulative.</p>`,
    fieldQuestion: "If someone asked why a recent public decision was made, could you show the source, the working notes, and the person who approved the final result?",
    ctaLabel: "Read how Beacon works",
    ctaHref: "/how-beacon-works",
  },
  {
    number: "03",
    slug: "proof-before-output",
    title: "Proof Before Output",
    deck: "Fast output can be useful. Untraceable output is expensive.",
    excerpt: "Before a public claim gains authority, make the source, context, permission, and human review visible.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#3D4F6B",
    image: "/images/field-notes/field-note-03-proof-before-output.jpg",
    alt: "A three-stage Beacon field card showing a source dossier, a review lens, and a finished public page linked by one amber verification line.",
    body: `<p class="beacon-article-lede">AI can produce a draft quickly. That does not make the draft ready to represent you.</p><p>The difference between useful assistance and public confusion is often one question: <strong>Where did this come from?</strong> If the answer is unclear, a polished paragraph can carry a weak claim farther and faster than an honest person ever intended.</p><p>Beacon’s answer is not to reject drafting tools. It is to make the evidence visible before the output gains authority. A useful workflow begins with a known source set, records the important judgment calls, and keeps a person accountable for what is interpreted and published.</p><p>This does not have to become a research department. It can be simple.</p><h2>Before you publish, ask five questions.</h2><table><thead><tr><th>Check</th><th>Ask this</th></tr></thead><tbody><tr><td><strong>Source</strong></td><td>What is the original material?</td></tr><tr><td><strong>Date</strong></td><td>Is the information current enough for the use?</td></tr><tr><td><strong>Context</strong></td><td>What might the source not prove?</td></tr><tr><td><strong>Permission</strong></td><td>Do you have the right to use or quote it?</td></tr><tr><td><strong>Human review</strong></td><td>Who is accountable for the final statement?</td></tr></tbody></table><p>That small discipline changes the role of AI. Instead of asking a system to invent the answer, you ask it to help organize, compare, summarize, draft, and challenge the answer against material you can actually inspect.</p><p>The public benefit is trust. The internal benefit is speed that does not erase responsibility.</p>`,
    fieldQuestion: "Which public claim in your work would become more trustworthy if you could answer, in one sentence, where it came from and who reviewed it?",
    ctaLabel: "Read how Beacon works",
    ctaHref: "/how-beacon-works",
  },
  {
    number: "04",
    slug: "human-review-is-the-real-control-surface",
    title: "Human Review Is the Real Control Surface",
    deck: "The goal is not an autonomous machine. The goal is a better working relationship between tools, evidence, and human responsibility.",
    excerpt: "A tool can prepare work, but a named person still owns the public claim, sensitive decision, and final release.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#5C3D6B",
    image: "/images/field-notes/field-note-04-human-review.jpg",
    alt: "An AI-assisted workflow diagram ending at a highlighted human review step marked by an amber approval stamp.",
    body: `<p class="beacon-article-lede">There is a temptation to treat human review as the part that slows everything down.</p><p>That is the wrong frame.</p><p>Human review is the part that decides what the work means, whether the evidence supports it, whether it belongs in public, and whether the organization is prepared to stand behind it. A tool can organize material. It can identify patterns. It can prepare a first draft or surface a contradiction. It cannot carry the responsibility for a public commitment, a sensitive decision, a relationship with a community, or the interpretation of incomplete evidence.</p><p>The Digital Ramp-Up is not about replacing the people in the process. It is about moving human attention away from repetitive reconstruction and toward the decisions that require judgment.</p><h2>Define one human-owned control point.</h2><table><thead><tr><th>Workflow</th><th>Human-owned decision</th></tr></thead><tbody><tr><td><strong>Research</strong></td><td>What sources are credible enough to use.</td></tr><tr><td><strong>Writing</strong></td><td>What claim is accurate, fair, and ready to publish.</td></tr><tr><td><strong>Community communication</strong></td><td>What tone, promise, and follow-up are appropriate.</td></tr><tr><td><strong>Operations</strong></td><td>What action should be taken when information is incomplete or conflicting.</td></tr><tr><td><strong>Sensitive work</strong></td><td>Whether the task should be paused, escalated, or handled by a qualified professional.</td></tr></tbody></table><p>Beacon uses local AI assistance and selected external tools where they improve the work. The governing point is that the work stays connected to human review, known source material, and a deliberate public boundary. That is more useful than claiming a system can run on its own.</p>`,
    fieldQuestion: "What decision in your work should never be outsourced, no matter how capable the tool becomes?",
    ctaLabel: "Explore Beacon Momentum’s public orientation",
    ctaHref: "/",
  },
  {
    number: "05",
    slug: "choose-the-right-door",
    title: "Choose the Right Door",
    deck: "Good systems do not push every person through the same funnel. They make the next relationship clear.",
    excerpt: "Clear public, membership, voluntary-support, and organization-service paths respect consent and keep promises specific.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#8B5E3C",
    image: "/images/field-notes/field-note-05-choose-right-door.jpg",
    alt: "A Beacon route map showing four separate paper paths, a compass, and understated amber route markers.",
    body: `<p class="beacon-article-lede">The digital world is full of doors that pretend to lead to the same room.</p><p>You read an article and discover you have been added to a list. You ask a question and receive a sales sequence. You join one product and find your details folded into an unrelated offer. A simple act of curiosity becomes a relationship you never chose.</p><p>Beacon is taking a different position: <strong>clarity is part of respect.</strong> The public work, the voluntary-support path, the membership environment, and organization services should each answer a different question. They should not quietly merge accounts, assume consent, or imply that one choice is required to be worthy of another.</p><h2>Choose the relationship that matches the work.</h2><table><thead><tr><th>If you are asking…</th><th>The right Beacon door is…</th><th>What it is not</th></tr></thead><tbody><tr><td>“What is Beacon, and what can I learn from the public work?”</td><td><strong>Beacon Momentum</strong></td><td>An automatic membership or service enrollment.</td></tr><tr><td>“Do I want a fuller individual learning and member environment?”</td><td><strong>The Watch at Beacon Community</strong><br/><em>Annual individual learning and membership environment.</em></td><td>A Beacon Labs engagement or investment relationship.</td></tr><tr><td>“Do I want to stand behind the longer public horizon?”</td><td><strong>Foundation Year</strong><br/><em>Separate voluntary-support path.</em></td><td>A membership, ownership position, or promise of return.</td></tr><tr><td>“Does an organization need a systems or operating conversation?”</td><td><strong>Beacon Labs</strong><br/><em>Organization-facing systems and service path.</em></td><td>A consumer membership or automatic client relationship.</td></tr></tbody></table><p>This distinction protects people from pressure and helps Beacon keep its promises specific. You do not have to be convinced of everything at once. You can choose the relationship that matches the work in front of you.</p>`,
    fieldQuestion: "Does every public path in your work tell people what it is for, what it costs if anything, and what will not happen automatically?",
    ctaLabel: "Explore Beacon Momentum’s public orientation",
    ctaHref: "/",
  },
  {
    number: "06",
    slug: "chance-first-purpose-after-selection",
    title: "Chance First. Purpose After Selection.",
    deck: "A fair public invitation separates awareness from payment and random selection from what the award makes possible afterward.",
    excerpt: "The Community Build Award framework keeps free random selection separate from the practical purpose package that follows verified selection.",
    readTime: "3 min read",
    publishedDate: "August 7, 2026",
    accent: "#C8860A",
    image: "/images/field-notes/field-note-06-chance-first.jpg",
    alt: "A two-stage Beacon field card showing free random selection first and a verified recipient purpose package second.",
    isFrameworkNote: true,
    body: `<p class="beacon-article-lede">Public trust is not built by louder promises. It is built by structures people can inspect.</p><p>That is the idea behind Beacon Momentum’s Community Build Award framework. The planned $4,970 award is purpose-based. One recipient will be selected at random from eligible free entries under the final Official Rules. Payment, membership, voluntary support, referrals, social activity, project ideas, build plans, and even a person’s interest in Beacon do not affect eligibility, entries, selection, or odds.</p><h2>The sequence is deliberate.</h2><p>First comes the fair chance. People enter through the free path described in the Official Rules. The drawing determines who is selected. No polished application, audience size, or payment changes the result.</p><p>Then comes verification and purpose. The selected recipient accepts a simple education or build package. Beacon can pay approved training, credentials, relevant tools, materials, or community-building costs directly or reimburse documented, permitted expenses. The award is not unrestricted cash, and it is not designed to finance speculation, personal debt, or a generic spending spree.</p><p>This is not a test of who “deserves” help. It is not a competition for the best pitch. It is a fair public drawing followed by responsible stewardship of a purpose-based award.</p><p>The same separation applies to voluntary support. Any future support path is separate from the active drawing and cannot buy a chance, priority, or better odds. And if someone wants to understand Beacon’s larger work, there is a separate public orientation. Reading it or requesting updates does not change the drawing either.</p><p>That is what a clear public invitation looks like: no hidden exchange, no pressure to perform, no manipulation disguised as engagement. Chance first. Purpose after selection.</p>`,
    fieldQuestion: "In your own public work, where might a clearer separation between attention, payment, selection, and purpose create more trust?",
    ctaLabel: "Read the Community Build Award framework",
    ctaHref: "/community-build-grant",
  },
];

export function findDigitalRampUpFieldNote(slug: string) {
  return DIGITAL_RAMP_UP_FIELD_NOTES.find((note) => note.slug === slug);
}
