import { Link } from "wouter";
import { BookOpen, Headphones, ArrowRight, ShieldCheck } from "lucide-react";
import SharedFooter from "@/components/SharedFooter";
import SharedNav from "@/components/SharedNav";

const GUIDES = [
  {
    slug: "machine-layer-method",
    brand: "Beacon Momentum",
    title: "The Machine-Layer Method",
    subtitle: "Calm systems thinking for practical AI use.",
    description: "A practical guide to identifying where AI can remove friction without outsourcing judgment, attention, or responsibility.",
    thumbnail: "/images/field-guides/machine-layer-method-thumbnail.png",
    cover: "/images/field-guides/machine-layer-method-cover.png",
  },
  {
    slug: "thoughtful-automation-map",
    brand: "Beacon Momentum",
    title: "The Thoughtful Automation Map",
    subtitle: "Low-risk systems for reducing repeated friction.",
    description: "A grounded method for selecting, designing, and reviewing automations that create momentum without making life more brittle.",
    thumbnail: "/images/field-guides/thoughtful-automation-map-thumbnail.png",
    cover: "/images/field-guides/thoughtful-automation-map-cover.png",
  },
  {
    slug: "evidence-layer",
    brand: "Beacon Momentum",
    title: "The Evidence Layer",
    subtitle: "Trust, proof, and public credibility.",
    description: "Build a useful public record of how you think, what you have learned, and why people can trust your work.",
    thumbnail: "/images/field-guides/evidence-layer-thumbnail.png",
    cover: "/images/field-guides/evidence-layer-cover.png",
  },
  {
    slug: "ethical-architect",
    brand: "Beacon Momentum",
    title: "The Ethical Architect",
    subtitle: "Responsible AI-assisted independent work.",
    description: "A practical decision framework for using AI in independent work while protecting people, privacy, and your own standards.",
    thumbnail: "/images/field-guides/ethical-architect-thumbnail.png",
    cover: "/images/field-guides/ethical-architect-cover.png",
  },
  {
    slug: "clear-website-protocol",
    brand: "Beacon Momentum",
    title: "The Clear Website Protocol",
    subtitle: "Website clarity, trust, and next-step design.",
    description: "A useful framework for making a website easier to understand, easier to trust, and easier for the right visitor to act on.",
    thumbnail: "/images/field-guides/clear-website-protocol-thumbnail.png",
    cover: "/images/field-guides/clear-website-protocol-cover.png",
  },
  {
    slug: "ai-without-fear",
    brand: "Digital Grandpa",
    title: "AI Without Fear",
    subtitle: "A calm guide to safety, confidence, and connection.",
    description: "A human-centered introduction to AI that emphasizes good judgment, privacy, scam awareness, and staying connected to the people who matter.",
    thumbnail: "/images/field-guides/ai-without-fear-thumbnail.png",
    cover: "/images/field-guides/ai-without-fear-cover.png",
  },
];

export default function FieldGuidesPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#102337]">
      <SharedNav />
      <main id="main-content">
        <section className="bg-[#102337] px-6 pb-20 pt-28 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#D8A94A]">Beacon Momentum Field Guides</p>
            <h1 className="max-w-4xl font-ui text-4xl font-bold leading-tight md:text-6xl">Practical guidance for the work in front of you.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">Six focused guides for people who want useful systems, calmer judgment, and a more responsible relationship with AI. Each release is independently produced, self-hosted, and built to be used—not merely read.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-10 grid gap-6 border-b border-[#102337]/15 pb-10 md:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A5C6B]">Simple retail structure</p>
              <h2 className="mt-3 font-ui text-3xl font-bold">Choose the format that fits your life.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="border border-[#1A5C6B]/30 bg-white p-4"><BookOpen className="mb-3 h-5 w-5 text-[#1A5C6B]"/><strong className="block text-xl">$27</strong><span className="text-[#4E6670]">Printable guide</span></div>
              <div className="border border-[#D8A94A]/50 bg-[#FFF9E9] p-4"><Headphones className="mb-3 h-5 w-5 text-[#A7731E]"/><strong className="block text-xl">$34</strong><span className="text-[#6E5A30]">Guide + Bob-voice MP3</span></div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {GUIDES.map((guide) => (
              <article key={guide.slug} className="overflow-hidden border border-[#102337]/15 bg-white">
                <div className="grid grid-cols-[1.65fr_.85fr] gap-0 bg-[#0F2237]">
                  <img src={guide.thumbnail} alt={`${guide.title} artwork`} className="h-52 w-full object-cover" />
                  <img src={guide.cover} alt={`${guide.title} book cover`} className="h-52 w-full object-contain p-4" />
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A5C6B]">{guide.brand}</p>
                  <h2 className="mt-2 font-ui text-2xl font-bold">{guide.title}</h2>
                  <p className="mt-1 font-medium text-[#A7731E]">{guide.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#4E6670]">{guide.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#102337]/10 pt-5">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#315760]"><ShieldCheck className="h-4 w-4"/>Owned-site delivery</span>
                    {guide.brand === "Digital Grandpa" ? (
                      <Link href="/digital-grandpa/library" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A5C6B]">Explore Digital Grandpa <ArrowRight className="h-4 w-4"/></Link>
                    ) : (
                      <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A5C6B]">Request release link <ArrowRight className="h-4 w-4"/></Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SharedFooter />
    </div>
  );
}
