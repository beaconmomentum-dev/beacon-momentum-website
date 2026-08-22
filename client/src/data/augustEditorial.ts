const AUGUST_ARTICLE_DRAFTS = [
  {
    id: "five-questions-keep-you-in-charge",
    title: "Five Questions That Keep You in Charge",
    excerpt: "Before an AI-assisted workflow earns more responsibility, ask five questions about scope, evidence, authority, stop controls, and human ownership.",
    category: "Beacon Systems",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    heroImage: "/images/editorial/hero-watch-brief-ai-safety-report-card-16x9.webp",
    featured: true,
    body: `<p class="beacon-article-lede">The question is not whether an AI tool is impressive. The question is whether you can still explain what it is allowed to do, what it is not allowed to do, and who is accountable when it gets something wrong.</p><p>Before a workflow moves from experiment to routine, ask five questions: What is the bounded job? What evidence is required? What may the system read or write? How do we stop it? Who gives the final approval?</p><h2>1. Is the job narrow enough to inspect?</h2><p>A useful workflow has a specific input, a specific output, and explicit non-goals. “Help with research” is not a job. “Compare three named sources and flag unsupported claims” is.</p><h2>2. What evidence must travel with the output?</h2><p>Claims should keep their sources, dates, and limitations. If a summary cannot show where it came from, it is a draft—not a decision.</p><h2>3. What authority is actually granted?</h2><p>Default to read-only access. Separate drafting from publication and recommendation from execution.</p><h2>4. Can the workflow be stopped cleanly?</h2><p>Every recurring process needs a clear halt, a retained record, and a human review before restart.</p><h2>5. Whose name is on the final call?</h2><p>AI can assist the work. A person owns the judgment. That is not a limitation; it is the reason a system remains trustworthy.</p><p><a href="/field-notes/five-questions-keep-you-in-charge">Use the full Five Questions field note</a> as a review sheet before you give any workflow more responsibility.</p>`,
  },
  {
    id: "ai-capability-needs-a-home",
    title: "AI Capability Needs a Home",
    excerpt: "Model access is not the durable advantage. Retained context, evidence, repeatable workflows, and accountable review are.",
    category: "Beacon Systems",
    date: "August 5, 2026",
    readTime: "7 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    heroImage: "/images/editorial/hero-watch-open-source-ai-16x9.webp",
    featured: true,
    body: `<p class="beacon-article-lede">A model can answer a question. It cannot, by itself, remember why your team made a decision, which source was trusted, or what a responsible next step looks like.</p><p>That is why AI capability needs a home. The home is not one model or one vendor. It is the operating environment that retains context, preserves evidence, assigns ownership, and lets a team work again tomorrow without starting from zero.</p><h2>Access is not a system</h2><p>Anyone can open a powerful tool. The leverage appears when the same work can be repeated with the same boundaries: source collection, claim review, human approval, release record, and post-release learning.</p><h2>What should stay close</h2><p>Keep durable context close to the work: editorial standards, evidence records, operating notes, customer boundaries, and the decisions that explain why a workflow exists. Use external services selectively when they add a specialized capability or a tested fallback.</p><h2>The quiet advantage</h2><p>Capability compounds when the next project inherits a usable record from the last one. That is more durable than chasing every new model release.</p><p>For the practical version of this approach, read <a href="/how-beacon-works">How Beacon Works</a>.</p>`,
  },
  {
    id: "dependency-ladder-what-lives-closest-to-home",
    title: "The Dependency Ladder: What Should Live Closest to Home?",
    excerpt: "Not every task deserves the same location, access, or fallback plan. A simple dependency ladder makes the distinction visible.",
    category: "Beacon Systems",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    heroImage: "/images/editorial/hero-cycle-of-leverage-16x9.webp",
    body: `<p class="beacon-article-lede">The right question is not “cloud or local?” It is “what happens if this capability is unavailable, wrong, or no longer under the conditions we expected?”</p><p>A dependency ladder gives a small team a practical answer. It sorts work by consequence rather than fashion.</p><h2>Level one: local-first work</h2><p>Keep durable records, source libraries, operating procedures, and routine drafts close to home when continuity and provenance matter most.</p><h2>Level two: allowlisted external work</h2><p>Use specialized external tools for bounded tasks when they provide clear value, documented terms, and a known fallback. The work should still leave behind the source, output, and decision record you need.</p><h2>Level three: human-owned work</h2><p>Publishing, payments, access changes, legal or financial interpretation, and sensitive communication require a named human decision. Assistance is useful; delegated authority is not.</p><p>The ladder is a planning tool, not a purity test. It helps you decide where a failure would hurt and what a responsible fallback looks like before the pressure arrives.</p>`,
  },
  {
    id: "what-17600-actions-teach-us-about-ai-control",
    title: "What 17,600 Actions Teach Us About AI Control",
    excerpt: "A published agent-intrusion timeline is a reminder that scope, logging, egress, stop controls, and human approval must be designed before automation expands.",
    category: "Beacon Signal",
    date: "August 5, 2026",
    readTime: "7 min read",
    pillar: "signal",
    pillarColor: "#1A3A5C",
    heroImage: "/images/editorial/hero-watch-brief-huggingface-breach-16x9.webp",
    body: `<p class="beacon-article-lede">The useful lesson from a security incident is not panic. It is a better control question: if a workflow took thousands of actions, would you know what it touched, where it went, and how to stop it?</p><p>Hugging Face’s published technical timeline described an agent intrusion involving approximately 17,600 recorded actions. The details matter to security teams, but the operating lesson applies more broadly: unattended action accumulates consequence quickly.</p><h2>Make scope visible</h2><p>Every workflow should declare its inputs, permitted destinations, permitted writes, and explicit non-goals before it runs.</p><h2>Keep the record</h2><p>Retain the source set, the action log, the output, and the reviewer decision. A system without a record is difficult to repair and impossible to explain.</p><h2>Build the stop before the speed</h2><p>Pause access, preserve the current record, notify the owner, and require review before restart. These are ordinary operating controls, not dramatic “kill switches.”</p><p>Read the underlying <a href="https://huggingface.co/blog/agent-intrusion-technical-timeline" target="_blank" rel="noreferrer">Hugging Face technical timeline</a>; do not treat unrelated model or market claims as part of that evidence.</p>`,
  },
  {
    id: "rare-earth-lesson-for-a-small-team",
    title: "The Rare-Earth Lesson for a Small Team",
    excerpt: "Resilience is not possession of an input. It is the practical ability to process, maintain, replace, and recover when one link fails.",
    category: "Beacon Systems",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    heroImage: "/images/editorial/hero-watch-brief-ramageddon-memory-crisis-16x9.webp",
    body: `<p class="beacon-article-lede">A resource is not the same thing as capability. The difference is the chain between the raw input and the finished result: processing, maintenance, trained people, quality control, and a fallback when one link breaks.</p><p>Apple announced a $500 million commitment connected to MP Materials in 2025, while MP Materials separately announced a public-private agreement with the U.S. Department of Defense. Those announcements are not a lesson about making market predictions. They are a concrete example of long-horizon capacity building.</p><h2>Small teams have supply chains too</h2><p>Your supply chain may be source access, editorial files, a domain, a payment processor, a model endpoint, a recording process, or the person who knows how a workflow actually works.</p><h2>Build a bill of materials</h2><p>For each recurring workflow, list the inputs, owner, location, access path, fallback, and recovery time. The goal is not to eliminate every dependency. It is to know which one matters before it fails.</p><p>Source releases: <a href="https://www.apple.com/newsroom/2025/07/apple-expands-us-supply-chain-with-500-million-usd-commitment/" target="_blank" rel="noreferrer">Apple</a> and <a href="https://mpmaterials.com/news/mp-materials-announces-transformational-public-private-partnership-with-the-department-of-defense-to-accelerate-u-s-rare-earth-magnet-independence/" target="_blank" rel="noreferrer">MP Materials</a>.</p>`,
  },
  {
    id: "provenance-is-the-new-professionalism",
    title: "Provenance Is the New Professionalism",
    excerpt: "In AI-assisted work, the most credible person in the room may be the one who can show the source, the limitation, the reviewer, and the final decision.",
    category: "Beacon Work",
    date: "August 5, 2026",
    readTime: "5 min read",
    pillar: "Work",
    pillarColor: "#6A4C93",
    heroImage: "/images/editorial/hero-wisdom-information-16x9.webp",
    body: `<p class="beacon-article-lede">A polished answer is not automatically a reliable answer. In a world full of drafts that sound complete, provenance is what lets another person check the work.</p><p>Professionalism now includes a simple record: what source was used, what claim was made, what limitation applies, who reviewed it, and what decision followed.</p><h2>Use a four-line record</h2><p>For a consequential output, record the source set, the material claim, the reviewer, and the action taken. This takes minutes and saves hours when a question returns later.</p><h2>Keep drafts in their place</h2><p>AI can help organize, compare, and draft. It should not erase the difference between a source-backed conclusion and a plausible-sounding suggestion.</p><h2>Make correction ordinary</h2><p>A provenance record makes revision less personal. When new evidence appears, update the claim and explain the change. That is how a system earns trust over time.</p><p>Beacon’s <a href="/the-watch/controlled-workflow-pilots">source-grounded brief checker</a> is a simple starting point for the practice.</p>`,
  },
  {
    id: "ai-work-you-should-not-automate",
    title: "The AI Work You Should Not Automate",
    excerpt: "Some work benefits from assistance. Other work requires a named person to weigh context, consequences, and responsibility.",
    category: "Beacon Work",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Work",
    pillarColor: "#6A4C93",
    heroImage: "/images/editorial/hero-automation-first-16x9.webp",
    body: `<p class="beacon-article-lede">Automation is valuable when it removes repetitive friction. It becomes risky when it hides a decision that deserves a person’s name.</p><p>Do not automate publication, payments, access changes, sensitive communication, legal or financial interpretation, or any decision that cannot be reversed cleanly. Use assistance to prepare the record; keep authority with the person accountable for the outcome.</p><h2>Drafting is not deciding</h2><p>Let the tool create a first pass, identify missing evidence, or organize alternatives. A human still decides what the organization will say or do.</p><h2>Classification is not permission</h2><p>A system can label a request. That does not mean it should approve access, trigger a payment, or make a commitment.</p><h2>Speed is not the objective</h2><p>The right pace is the one that preserves judgment, gives people time to review, and leaves a usable trail for the next person who inherits the work.</p><p>Use the <a href="/field-notes/five-questions-keep-you-in-charge">Five Questions</a> when a workflow starts asking for more authority.</p>`,
  },
  {
    id: "membership-is-not-a-shortcut-to-community",
    title: "A Membership Is Not a Shortcut to Community",
    excerpt: "A recurring payment can support a publishing rhythm, but it does not by itself create trust, access clarity, or a reason to stay.",
    category: "Beacon Venture",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Venture",
    pillarColor: "#B56576",
    heroImage: "/images/editorial/hero-watch-brief-digital-landlord-16x9.webp",
    body: `<p class="beacon-article-lede">A membership is a promise about an ongoing relationship. If the promise is vague, the payment becomes the whole story. That is not a durable community model.</p><p>Beacon separates three things that are often blurred together: voluntary support, a paid member experience, and B2B services. Each has a different purpose, access model, and expectation.</p><h2>Support is not an investment</h2><p>Voluntary support helps sustain public work. It carries no ownership, return, or special influence.</p><h2>Membership is an access promise</h2><p>A membership should have a reliable rhythm, a clear benefit set, and boundaries that are easy to explain. It is not founder access, consulting, or a guaranteed outcome.</p><h2>Services solve explicit work problems</h2><p>Beacon Labs belongs in a separate conversation when an organization has a defined operating need and wants a scoped professional engagement.</p><p>The strongest membership begins after a free publishing rhythm has already earned trust. Build the relationship first; then make the access promise clear.</p>`,
  },
  {
    id: "build-recovery-plan-before-you-need-it",
    title: "Build the Recovery Plan Before You Need It",
    excerpt: "A resilient workflow is not one that never fails. It is one whose inputs, owners, fallbacks, and recovery steps are known before failure arrives.",
    category: "Beacon Systems",
    date: "August 5, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    heroImage: "/images/editorial/hero-the-exit-ramp-16x9.webp",
    body: `<p class="beacon-article-lede">The best time to discover a hidden dependency is not during an outage, a deadline, or a difficult handoff. It is while the work is still calm enough to map.</p><p>Start with one critical workflow. List the trigger, inputs, systems, credentials, human owner, output, archive location, fallback, and acceptable recovery time.</p><h2>Run a small recovery exercise</h2><p>Ask one simple question: if this tool or person were unavailable today, what would we do next? Do not aim for a perfect business-continuity plan. Aim for an honest first answer.</p><h2>Keep the fallback usable</h2><p>A fallback that has never been tested is only an assumption. Save the essential files, document the restart sequence, and make sure another responsible person can follow it.</p><h2>Turn resilience into routine</h2><p>One workflow map per month is enough to create a record of what the organization truly depends on. The result is calmer operations and fewer surprises.</p>`,
  },
  {
    id: "quiet-advantage-of-a-system-you-can-explain",
    title: "The Quiet Advantage of a System You Can Explain",
    excerpt: "The most durable systems are not the ones with the loudest claims. They are the ones a thoughtful person can explain, inspect, and improve.",
    category: "Beacon Life",
    date: "August 5, 2026",
    readTime: "5 min read",
    pillar: "Life",
    pillarColor: "#2A9D8F",
    heroImage: "/images/editorial/hero-beacon-watch-throne-room-architecture-16x9.webp",
    body: `<p class="beacon-article-lede">There is a quiet kind of advantage in being able to explain your own system. You know what it is for, where the work lives, who reviews it, and what happens when something changes.</p><p>That clarity is not anti-technology. It is what lets technology become useful without becoming mysterious.</p><h2>Explain the work in ordinary language</h2><p>What does this workflow do? What does it not do? Where does the record go? Who is responsible for the final decision? If those questions cannot be answered simply, the system is carrying too much hidden complexity.</p><h2>Accumulate judgment, not just tools</h2><p>Tools change quickly. The ability to compare evidence, recognize a limitation, and choose a responsible next step compounds across every tool change.</p><h2>Keep the light on</h2><p>A durable system does not promise certainty. It gives people a steadier next move because the work is visible, reviewable, and grounded in lived judgment.</p><p>Read <a href="/how-beacon-works">How Beacon Works</a> for Beacon’s practical version of this approach.</p>`,
  },

  {
    id: "the-ai-check-kite",
    title: "The AI Check Kite — When the Music Stops",
    excerpt: "$3 trillion in AI investment. The revenue to support these commitments does not exist yet. The financial structure supporting AI bears an uncomfortable resemblance to check kiting.",
    category: "The Signal",
    date: "August 2026",
    readTime: "5 min read",
    pillar: "Signal",
    pillarColor: "#E9BC52",
    featured: true,
    body: `<div style="width:100%;background:#0a0a0a;border-radius:2px;overflow:hidden;margin-bottom:1.5rem"><video controls playsinline preload="metadata" poster="/images/signal-series/02-ai-check-kite-poster.jpg" aria-label="The AI Check Kite — When the Music Stops" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#0a0a0a"><source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/EUQjRypMMRNbFwEA.mp4" type="video/mp4">Your browser does not support embedded video. <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/EUQjRypMMRNbFwEA.mp4">Watch the video directly.</a></video></div>
<p class="beacon-article-lede">On Monday, Forbes published two separate analyses reaching the same conclusion: the financial structure supporting AI investment bears an uncomfortable resemblance to check kiting — an old form of fraud where insufficient funds are juggled between accounts to create the illusion of solvency.</p>
<p>The numbers:</p>
<ul>
<li>$600 billion in on-balance-sheet AI infrastructure commitments from Alphabet, Amazon, Meta, and Microsoft</li>
<li>$2.4 trillion in off-balance-sheet purchase commitments and leases</li>
<li>Alphabet reported its first quarter of negative free cash flow since going public</li>
<li>The investment structure is circular: Company A invests in Company B, which buys products from Company A</li>
<li>Nvidia and OpenAI sit at the center of this web</li>
</ul>
<p>The revenue to support these commitments does not exist yet.</p>
<p>I am not telling you AI is a fraud. It is not. The technology works. The productivity gains are real. The adoption curve is steeper than anything since the internet.</p>
<p>But the financial structure supporting it is fragile. And if you are building a business on top of these platforms, that fragility matters to you more than it matters to the investors writing the checks.</p>
<p>When the dot-com bubble burst in 2000, the fiber-optic cables stayed in the ground. The internet kept working. The companies that built the cables went bankrupt. Every business wired exclusively to those companies had to scramble.</p>
<p>The same pattern is forming now.</p>
<h2>The Builder's Framework</h2>
<p>The tool was never the moat. The system you build around the tool is the moat. The sovereign infrastructure you own is the moat. Do not wire your business to a single platform. Do not confuse access to a tool with ownership of a system.</p>
<p>The music is still playing. But the checks are in transit. And the math does not close.</p>
<p>Build accordingly.</p>
<p>— Bob</p>`,
  },
  {
    id: "65-percent-of-founders",
    title: "65% of Founders Will Fail — Shortcuts vs. Levers",
    excerpt: "Could someone with the same AI subscription you use replicate what you have built in a single day? If the answer is yes — you have not built a business.",
    category: "The Signal",
    date: "August 2026",
    readTime: "4 min read",
    pillar: "Signal",
    pillarColor: "#E9BC52",
    body: `<div style="width:100%;background:#0a0a0a;border-radius:2px;overflow:hidden;margin-bottom:1.5rem"><video controls playsinline preload="metadata" poster="/images/signal-series/03-65-percent-founders-poster.jpg" aria-label="65% of Founders Will Fail — Shortcuts vs. Levers" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#0a0a0a"><source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/UGqxoDkuebtKrAXN.mp4" type="video/mp4">Your browser does not support embedded video. <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/UGqxoDkuebtKrAXN.mp4">Watch the video directly.</a></video></div>
<p class="beacon-article-lede">Could someone with the same AI subscription you use replicate what you have built in a single day?</p>
<p>If the answer is yes — you have not built a business. You have assembled a collection of outputs. And outputs are commodities.</p>
<p>A new survey reports that 65 percent of aspiring entrepreneurs plan to use AI to launch their businesses this year. Most will fail. Not because the technology does not work — it works extraordinarily well. Because they will use it as a shortcut rather than a lever.</p>
<h2>The Distinction That Matters</h2>
<p>There are two ways to use AI. The first is as a production shortcut — you generate output faster. Everyone has access. Nothing defensible. The second is as a systems lever — you build infrastructure that compounds. Automated workflows. Proprietary pipelines. Tools built on your specific knowledge, your specific market, your specific relationships.</p>
<p>The first makes you faster. The second makes you irreplaceable.</p>
<p>Machines produce volume. Humans produce meaning. The founders who understand that distinction will be the ones standing when the market corrects.</p>
<p>The 65 percent will use AI to skip steps. The ones who last will use it to build stairs.</p>
<p>Which one are you building?</p>
<p>— Bob</p>`,
  },
  {
    id: "the-collective-illusion",
    title: "The Collective Illusion — You Are Not the Outlier",
    excerpt: "Whatever you privately believe — about your industry, about the market, about the narratives dominating your feed — you are not alone in believing it. You just think you are.",
    category: "The Signal",
    date: "August 2026",
    readTime: "5 min read",
    pillar: "Signal",
    pillarColor: "#E9BC52",
    body: `<div style="width:100%;background:#0a0a0a;border-radius:2px;overflow:hidden;margin-bottom:1.5rem"><video controls playsinline preload="metadata" poster="/images/signal-series/04-collective-illusion-poster.jpg" aria-label="The Collective Illusion — You Are Not the Outlier" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#0a0a0a"><source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/UnSCGhAMUIBPXCkO.mp4" type="video/mp4">Your browser does not support embedded video. <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/UnSCGhAMUIBPXCkO.mp4">Watch the video directly.</a></video></div>
<p class="beacon-article-lede">You are not the outlier.</p>
<p>Whatever you privately believe — about your industry, about the market, about the narratives dominating your feed — you are not alone in believing it. You just think you are. And that assumption is costing you.</p>
<p>There is a phenomenon called a collective illusion. It works like this: almost everyone in a group privately disagrees with a position, but each person believes everyone else agrees. So they stay quiet. They perform agreement. They nod along. And their performance becomes the evidence that convinces the next person they are the outlier too.</p>
<p>The illusion feeds itself. And the only thing that breaks it is contact with reality.</p>
<h2>The World Cup Proved It</h2>
<p>Millions of people from every nation arrived in America. Media had told them it was dangerous. Media had told Americans that foreigners were a threat. They came anyway. Nothing went wrong. People who had been told to fear each other discovered — face to face — that the fear was the product, not the reality.</p>
<p>The division was manufactured. The conformity was manufactured. The only thing that was real was the programming. And it broke the moment people interacted directly instead of through the filter.</p>
<h2>Business Implications</h2>
<p>If you are building a business, you are operating inside collective illusions every day. The illusion you need to be on every platform. The illusion your competitors are doing better. The illusion the market wants what the algorithm promotes.</p>
<p>Most of your market assumptions are based on performed consensus, not observed behavior. The builders who break through are the ones who test the illusion — who talk to customers directly, who ignore what the algorithm promotes, and who build based on what people actually do.</p>
<p>We tested it. We said what we believe. The audience was already there.</p>
<p>You are not the outlier. You never were.</p>
<p>— Bob</p>`,
  },
  {
    id: "300000-empty-seats",
    title: "300,000 Empty Seats — The Architecture of Fragility",
    excerpt: "There are 300,000 local government seats in this country that are vacant or running unchallenged. The same architectural failure that left those seats empty collapses businesses every year.",
    category: "The Signal",
    date: "August 2026",
    readTime: "5 min read",
    pillar: "Signal",
    pillarColor: "#E9BC52",
    body: `<div style="width:100%;background:#0a0a0a;border-radius:2px;overflow:hidden;margin-bottom:1.5rem"><video controls playsinline preload="metadata" poster="/images/signal-series/05-300k-empty-seats-poster.jpg" aria-label="300,000 Empty Seats — The Architecture of Fragility" style="display:block;width:100%;height:auto;aspect-ratio:16/9;background:#0a0a0a"><source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/TLRSDNgLkUSLcQwK.mp4" type="video/mp4">Your browser does not support embedded video. <a href="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/TLRSDNgLkUSLcQwK.mp4">Watch the video directly.</a></video></div>
<p class="beacon-article-lede">There are 300,000 local government seats in this country that are vacant or running unchallenged right now.</p>
<p>School boards deciding what your children learn. City councils deciding what gets built. Planning commissions shaping the character of your community. Empty. Unchallenged. Waiting for someone to show up.</p>
<h2>The Centralization Parallel</h2>
<p>The same architectural failure that left those seats empty is the one that collapses businesses every year. It is the failure of centralization — putting all your attention, all your dependency, all your operations in one place and assuming it will hold.</p>
<p>Citizens centralized their attention on Washington and abandoned local government. The result: 300,000 empty seats and a population that feels powerless despite living in the most decentralized governance system ever designed.</p>
<p>Founders centralized their operations on single platforms — Facebook, Google, Twitter — and assumed those platforms would always serve them. The result: businesses that collapsed overnight when the rules changed.</p>
<p>The pattern is the same. The fix is the same.</p>
<h2>Decentralize. Distribute. Build.</h2>
<p>For your business: own your email list. Own your website. Own your customer relationships. Have multiple revenue streams. Build systems that run independently.</p>
<p>For your citizenship: know who sits on your school board. Attend a local meeting. Run for something. Exercise your citizenship at the level where it actually touches your life.</p>
<p>Resilience comes from distribution, not concentration. The system that cannot be shut down by a single decision is the system that survives.</p>
<p>The 300,000 seats are waiting. Your infrastructure is waiting. Both need the same thing: someone who shows up.</p>
<p>— Bob</p>`,
  },
] as const;

export const AUGUST_ARTICLE_CONTENT = AUGUST_ARTICLE_DRAFTS.map((article) => ({
  ...article,
  audioSrc: `/audio/august/${article.id}.mp3`,
  audioFile: `/audio/august/${article.id}.mp3`,
  transcriptSrc: `/audio/august/transcripts/${article.id}.txt`,
  captionSrc: `/audio/august/captions/${article.id}.vtt`,
}));

export const AUGUST_ARTICLE_SUMMARIES = AUGUST_ARTICLE_CONTENT.map(({ body, heroImage, ...summary }) => ({
  ...summary,
  featured: "featured" in summary ? summary.featured === true : false,
  thumbnail: heroImage,
}));
