/**
 * Beacon Momentum — /blog/:slug
 * Design: Deep Water Editorial / Quiet Authority
 * Full article detail page for The Signal blog.
 */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import SharedNav from "@/components/SharedNav";
import SharedFooter from "@/components/SharedFooter";

// ─── Article Content Type ─────────────────────────────────────────────────────
interface ArticleContent {
  id: string;
  title: string;
  excerpt: string;
  pillar: string;
  pillarColor: string;
  readTime: string;
  date: string;
  featured?: boolean;
  heroImage?: string; // optional hero image shown below the article header
  audioSrc?: string;  // optional MP3 audio narration for the Listen button
  body: string; // HTML string for article body
}

// ─── Full Article Content ─────────────────────────────────────────────────────
const ARTICLE_CONTENT: ArticleContent[] = [
  {
    id: "the-intelligence-arbitrage",
    heroImage: "/manus-storage/beacon_about_hero_3f574393.png",
    audioSrc: "/audio/watch-brief-04-the-intelligence-arbitrage.mp3",
    title: "Beacon Watch Brief: The Intelligence Arbitrage",
    excerpt:
      "The greatest arbitrage in economic history is closing. For the first time, you can manufacture intelligence out of electricity. Here is what that means for every person who was told the leverage was not for them.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "Jun 27, 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">The old world built systems that required your compliance in exchange for a minimal existence. That world is ending. The new world is being built right now, and the barrier to entry is no longer capital, pedigree, or permission. The barrier is whether you understand what is happening to the price of intelligence.</p>

      <h2>The Greatest Arbitrage in Economic History is Closing</h2>

      <p>For all of human history, the constraint on how much value humanity could create was fundamentally the number of capable brains and the hours in the day. A human brain runs on about 20 watts of power — less than the lightbulb in your refrigerator. In a year, that brain burns through roughly $20 worth of electricity. In the United States, the average worker generates something like $65,000 a year of labor value from that $20 of power.</p>

      <p>That is a gap of roughly 3,000 to 1. The market pays 3,000 times more for what a brain produces than it costs to run the brain. For 10,000 years, that gap was completely untouchable because the only way to manufacture a thinking machine was to raise a human being for 20 years.</p>

      <p>That is what just changed.</p>

      <p>Artificial intelligence is the machine that closes the gap. For the first time, you can manufacture intelligence out of electricity instead of out of making a child. The moment that becomes true, the economy stops being capped by how many smart humans exist and starts being capped by something completely physical: energy.</p>

      <h2>The Models Are Splitting: Agents vs. Engines</h2>

      <p>You do not need to understand the underlying architecture of the new models. You only need to understand how they are being deployed to capture this arbitrage.</p>

      <p><strong>The Agentic Shift (GPT-5.6).</strong> OpenAI's latest release is not a single model. It is a three-tier family. The flagship achieved a 91.9% score on complex agentic benchmarks not by being smarter, but by using an "Ultra mode" — spawning sub-agents that take pieces of a problem, work in parallel, and stitch the results together. The model is talking to copies of itself. This is no longer a chatbot. It is a synthetic workforce.</p>

      <p><strong>The Context Moat (Google Spark).</strong> Google just released a $100/month personal AI agent that runs 24/7 in the background. It reads your Gmail, your Docs, and your Calendar to act on your behalf. The competitive advantage here is not the model itself; it is the fact that Google already holds years of your personal and business data. They are turning your history into the context window for their agents.</p>

      <p><strong>The Local Swarm (Claude Code).</strong> While the tech giants fight over massive data centers, operators are building local AI swarms. Using tools like Claude Code, businesses are running entirely on AI workers without writing a single line of code. They create a memory file that acts as the business's brain, define skills as Standard Operating Procedures, and deploy specialized sub-agents for proposals, research, and operations. A team of one good worker beats a mess of ten that you have never tuned.</p>

      <h2>The Redistribution of Power</h2>

      <p>The trap is assuming that you can simply replace a $65,000 employee with an AI agent and keep the margin. You cannot. When intelligence stops being scarce, the price of cognitive work collapses toward the cost of the electricity required to run it.</p>

      <p>The surplus value does not vanish; it migrates. First to the AI owners, and then to the consumer in the form of cheaper everything.</p>

      <p>The people who win in this transition are the ones who stop being buyers of intelligence and start being distributors of it. Consider the AI website business model: selling a custom website for $5,000 is no longer the goal. The website is simply a foot-in-the-door strategy — a lead magnet — to establish trust. The real business is the $1,000/month subscription for AI search optimization, lead generation, and automated marketing that follows.</p>

      <h2>The Beacon Mandate</h2>

      <p>The transition is not a replacement story; it is a redistribution story. The leverage has arrived, and it is being handed to anyone willing to build the systems to harness it.</p>

      <p>You do not need permission to build a local swarm. You do not need a technical background to deploy an agentic workforce. You only need the willingness to stop playing by the rules of an economy that no longer exists.</p>

      <p class="beacon-article-closing">The window is open. The lighthouse is lit. Find your bearing.</p>
    `,
  },
  {
    id: "the-leverage-has-arrived",
    heroImage: "/manus-storage/beacon_about_hero_3f574393.png",
    audioSrc: "/audio/watch-brief-03-the-leverage-has-arrived.mp3",
    title: "Beacon Watch Brief: The Leverage Has Arrived",
    excerpt:
      "The old world built systems that required your compliance in exchange for a minimal existence. That world is ending. Here is what is actually happening — and why it matters more than any benchmark or funding round.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "10 min",
    date: "Jun 26, 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">The old world built systems that required your compliance in exchange for a minimal existence. The economy, healthcare, the markets, the institutions of government — they were quietly rewritten over decades by people who understood that if you control the rules, you never have to win fairly.</p>

      <p>That world is collapsing. The extraction economies that treated human attention and labor as resources to be mined are reaching their limits. The leverage has shifted, and it is shifting faster than most people realize.</p>

      <h2>The Warning and the Opportunity</h2>

      <p>Mo Gawdat recently issued a profound warning: machines trained on human data inherit human dysfunction. If we build artificial intelligence based on the extractive, manipulative systems of the old world, we will simply automate our own destruction. The ethics of what we build matters now more than ever.</p>

      <p>This is why the current media narratives are so dangerous. Consider the recent hype around "Gemini 4." The most repeated "facts" about the next dominant AI models are largely noise designed to drive engagement. The real differentiator is not a theoretical benchmark score. The real differentiator is speed, accuracy, and the context window — the ability of a system to understand the full scope of a problem and execute a solution reliably.</p>

      <h2>The Cost of Leverage is Plummeting</h2>

      <p>While the media focuses on hypothetical future capabilities, the practical cost of running AI agents is dropping exponentially. The recent disruption caused by models like MiniMax M3 proves this point. The cost to deploy intelligent, autonomous systems is falling faster than most businesses can adapt to.</p>

      <p>This reinforces the core Beacon thesis: the leverage has arrived. For fifty years, the tools that created leverage — reach, distribution, production, analysis — were concentrated in the hands of the few. Because the price of admission was set deliberately beyond their reach. That barrier is gone.</p>

      <h2>The Door Is Open</h2>

      <p>The AI generation is not a tech story. It is a power story. For the first time in modern history, the tools that used to require a team of fifty and a seven-figure budget are available to anyone willing to learn to use them. One person with the right knowledge can now multiply their effort a thousandfold.</p>

      <p>The people who held the leverage know this. They are moving fast to capture these tools too — to wrap them in subscriptions, lock them behind enterprise contracts, and make the learning curve steep enough that most people quit before they start.</p>

      <p>The door is open. The tools are real. The knowledge of how to use them is the only thing that ever stood between you and the leverage you were told was not for you.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. The leverage has arrived. Join us at the Watch.</p>
    `,
  },
  {
    id: "ai-roi-reckoning",
    heroImage: "/manus-storage/beacon_about_hero_3f574393.png",
    audioSrc: "/audio/watch-brief-02-ai-roi-reckoning.mp3",
    title: "Beacon Watch Brief: The AI ROI Reckoning",
    excerpt:
      "The enterprise AI narrative has collapsed. 95% of projects delivered zero measurable ROI. Here is what the data actually shows — and what it means for operators building real systems.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "Jun 26, 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">For two years, the enterprise narrative was unanimous: artificial intelligence would replace software engineers, customer service teams, and operational staff at scale. The layoffs followed — hundreds of thousands of them. The logic was brutally simple: if the machine can write the code and answer the tickets, human labor becomes optional.</p>

      <p>But in 2026, the data had finally caught up with the hype. And the data is devastating.</p>

      <p>The exact same companies that fired their teams in the name of "AI efficiency" are quietly hiring them back — often at higher salaries. Researchers are calling it the "layoff boomerang." The reason behind it is the most important operational lesson of the decade for anyone building a business.</p>

      <blockquote>"Companies fired people for technology that those people were never trained to use, based on capabilities that don't yet exist, then scrambled to rehire when reality hit."</blockquote>

      <h2>The 95% Failure Rate</h2>

      <p>According to MIT's Project NANDA, which studied over 300 enterprise AI initiatives representing roughly $35 billion in spending, <strong>95% of those projects delivered zero measurable return on investment</strong>.</p>

      <p>How is it possible that a technology supposedly capable of replacing entire departments produced no measurable ROI in 95% of its enterprise deployments? The answer lies in a fundamental misunderstanding of what work actually is.</p>

      <p>When executives looked at AI benchmarks, they saw models scoring 95% on coding tests. What they didn't realize was that those tests were isolated, clean puzzles. When researchers at METR ran a randomized controlled trial testing complex, real-world software engineering, they found something striking: experienced developers using the best AI tools (like Cursor Pro and Claude) actually took <strong>19% longer</strong> to complete their tasks.</p>

      <p>The tools that were supposed to replace the engineers were slowing them down. Why? Because the AI generated code that the human engineers then had to check, correct, and untangle to fit into a complex, messy legacy system.</p>

      <h2>Confusing Tasks With Jobs</h2>

      <p>The core mistake the enterprise market made was confusing a <em>task</em> with a <em>job</em>.</p>

      <p>AI is exceptional at tasks. It can write a function, draft an email, or summarize a document. But a job is not just a list of tasks. A job is a thousand tasks held together by judgment, context, and accountability.</p>

      <p>Current AI systems do not retain feedback, adapt to context, or improve over time at the workflow level. They start from zero every time. They are brilliant in a demo and mediocre in a messy real-world workflow. When you remove the human judgment that glues the tasks together, the system collapses.</p>

      <p>We saw this play out publicly with Klarna. In 2024, the CEO celebrated replacing 700 customer service representatives with AI. By 2025, after quality deteriorated and customers revolted, the company was quietly hiring humans again.</p>

      <h2>The Hidden Costs of Scale</h2>

      <p>The second reason the enterprise AI narrative collapsed is the cost structure. When you hire an operator, you pay a fixed, predictable salary. When you deploy AI at scale, every query, agent action, and API call carries a variable token cost that scales unpredictably.</p>

      <p>Uber's CTO reportedly burned through the company's entire 2026 AI budget on token costs before the year was half over. Even more telling, a VP of Applied Deep Learning at Nvidia — the company that manufactures the chips AI runs on — admitted on the record: <em>"For my team, the cost of compute is far beyond what we would pay employees."</em></p>

      <p>When you add the required oversight — prompt engineers, evaluation pipelines, security reviewers — enterprise AI implementations often cost three to five times the advertised subscription price.</p>

      <h2>The Companies That Won</h2>

      <p>The most important finding in the data is what the successful 5% did differently.</p>

      <p>A May 2026 Gartner study of 350 firms found absolutely no correlation between layoffs and AI ROI. The companies that fired their teams to replace them with AI mostly just lit money on fire.</p>

      <p>The companies that actually generated returns did the exact opposite. They kept their people, handed them better tools, and gave them new responsibilities. They didn't replace human judgment; they augmented it. Gartner projects that by 2027, <strong>50% of companies that cut customer service staff due to AI will rehire for similar functions</strong>, often under new titles like "AI workflow orchestrator" or "agent supervisor."</p>

      <h2>The Beacon Doctrine: Systems Over Willpower</h2>

      <p>This data is the ultimate validation of the Beacon Momentum approach.</p>

      <p>The enterprise failure was not a failure of the technology itself — it was a failure of deployment. They tried to automate the visible work while ignoring the invisible, structural work that determines outcomes.</p>

      <p>For the founders and operators in the Beacon community, the lesson is clear: <strong>Do not try to replace yourself with a machine.</strong> The future does not belong to AI replacing humans. It belongs to the operators who learn to direct AI well, who develop the judgment the machines don't have, and who build operational scaffolding that holds up when the pressure is on.</p>

      <p>The 95% failed because they bought into the hype of replacement. The 5% won because they built systems.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>

      <div class="beacon-article-sources">
        <h3>Sources</h3>
        <ul>
          <li>MIT Project NANDA, "The GenAI Divide" (July 2025)</li>
          <li>METR Randomized Controlled Trial on Developer Productivity (2025)</li>
          <li>CNBC Reporting on Klarna Customer Service Automation Reversal (2025)</li>
          <li>Gartner Study of 350 Firms on AI ROI and Staffing (May 2026)</li>
          <li>Gartner Predictions 2027: The AI Workforce Rebound</li>
        </ul>
      </div>
    `,
  },
  {
    id: "frontier-models-in-motion",
    heroImage: "/manus-storage/beacon_about_hero_3f574393.png",
    audioSrc: "/audio/watch-brief-01-frontier-models-in-motion.mp3",
    title: "Beacon Watch Brief: Frontier Models in Motion",
    excerpt:
      "Claude Opus 5 is returning, Grok 5 is in training, and AI is deciphering a 5,000-year-old script. Here is what each development means for Beacon operators right now.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "8 min",
    date: "Jun 26, 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">While the enterprise market reckons with the operational realities of AI deployment, the underlying technology continues to cross capability thresholds that were considered impossible just 24 months ago. This week, three separate developments signal where the frontier is actually moving — and what it means for operators building their own systems.</p>

      <h2>1. The Return of Claude "Opus 5"</h2>

      <p>Anthropic's most capable model — internally codenamed "Fable 5" and officially part of the Mythos class — was pulled from public access earlier this month due to an emergency export control directive regarding cybersecurity and biology capabilities. That ban appears to be ending within days.</p>

      <p>The signals are hidden in the infrastructure:</p>

      <ul>
        <li><strong>Production Code Changes:</strong> Leaked code from Claude Code version 2.1.190 shows a critical string change. The previous code read: <em>"purchased separately from your plan."</em> The new code reads: <em>"You've used your included Fable 5 usage for this week."</em></li>
        <li><strong>Enterprise Relisting:</strong> Fable 5 has quietly reappeared in Amazon Bedrock's documentation and model cards without a formal announcement.</li>
        <li><strong>Congressional Pressure:</strong> A June 26th deadline from the House AI Committee has been applied to the Commerce Department to resolve the export control status.</li>
      </ul>

      <blockquote><strong>Strategic Takeaway:</strong> The pricing change is the real story. Originally planned as a premium add-on, Opus 5 appears to be shifting to a bundled model with a weekly usage reset. For operators already using Claude, this means access to Anthropic's most capable model at no additional cost. The intense government vetting — NSA review, Commerce Department examination — serves as a perverse security certification that other frontier models cannot currently claim.</blockquote>

      <h2>2. Grok 5: Separating Signal From Noise</h2>

      <p>xAI has officially confirmed that "Grok 5 is currently in training." Beyond that single sentence, the details come largely from Elon Musk and technical leaks.</p>

      <p>Credible analysis suggests Grok 5 utilizes a Mixture of Experts (MoE) architecture with approximately 6 trillion total parameters, featuring dynamic agent spawning that scales with task complexity. This is a massive theoretical capacity, designed to route queries to specialist sub-models to keep inference costs viable.</p>

      <p>However, caution is required. There are zero published benchmarks for Grok 5. Any comparison chart currently circulating is fabricated. Furthermore, Grok's history of safety challenges — from generating non-consensual explicit deepfakes to posting extremist content in 2025 — means that scaling to 6 trillion parameters without a proven shift in safety culture carries operational risk.</p>

      <blockquote><strong>Strategic Takeaway:</strong> Grok 5 represents real engineering, not just theater. The MoE architecture is a legitimate advance. But for Beacon operators, the only number that matters is the API pricing on launch day. Until it ships and is independently benchmarked, do not build critical infrastructure dependencies around it.</blockquote>

      <h2>3. Reading the Dead: AI and the Indus Script</h2>

      <p>The most profound AI story of the week isn't about code or enterprise efficiency; it's about history.</p>

      <p>The Indus Valley Civilization (3000–1300 BCE) left behind a script that has defeated human decipherment for over a century. There is no Rosetta Stone, and the average inscription is only 4.5 symbols long. Following successful AI applications to the carbonized Herculaneum Scrolls and fragmented Babylonian cuneiform, frontier models are now being trained on the entire corpus of the Indus script to identify statistical structures and grammatical patterns that no human brain can hold simultaneously.</p>

      <p>Researchers privately assess that AI translation is no longer a question of if but of <em>when</em>.</p>

      <blockquote><strong>Strategic Takeaway:</strong> This story highlights the ultimate epistemological warning of the AI era. When an AI proposes a translation for a dead language with no bilingual texts, there is no ground truth to check it against. The machine can find real patterns, but it can also hallucinate patterns that were never there — presenting both with equal, absolute confidence. This is the exact same hallucination problem that affects every AI system. It proves the core Beacon doctrine: AI is a powerful engine, but it requires human scaffolding, structured verification, and grounded judgment to be useful.</blockquote>

      <p class="beacon-article-closing">Systems over willpower. The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "follow-the-dollar-ai-ipo-wave",
    audioSrc: "/audio/signal-follow-the-dollar.mp3",
    title: "Follow the Dollar: What the AI IPO Wave Is Really Telling You",
    excerpt:
      "Within a 60-day window this spring, SpaceX, OpenAI, and Anthropic moved toward public markets simultaneously — combined implied valuation: $4.5 trillion. The convergence is not coincidental.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "11 min",
    date: "Jun 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">Within a 60-day window this spring, SpaceX, OpenAI, and Anthropic moved toward public markets simultaneously — combined implied valuation: $4.5 trillion. The convergence is not coincidental. Private investors who entered at earlier valuations are seeking a liquidity event.</p>

      <p>The question worth asking is not whether these companies are worth their valuations. The question is: <strong>who is the exit for?</strong></p>

      <h2>The Liquidity Event</h2>

      <p>When a private company goes public, it is not primarily a fundraising event. It is a liquidity event — a mechanism for early investors to convert their stakes into cash. The timing of three major AI companies moving toward public markets simultaneously tells you something important: the smart money that got in early is looking for the door.</p>

      <p>That is not necessarily a bearish signal. It is simply the normal lifecycle of venture capital. But it does mean that the risk profile of these companies is shifting from early-stage bets to public market assets — and public markets apply a different standard of scrutiny than venture rounds.</p>

      <h2>What the Valuations Assume</h2>

      <p>A $4.5 trillion combined valuation for three companies that are not yet profitable requires a specific set of assumptions about the future. Those assumptions include: continued exponential growth in AI adoption, sustained pricing power as competition intensifies, and the successful resolution of regulatory and safety challenges that are currently unresolved.</p>

      <p>Each of those assumptions is contestable. The AI ROI data emerging from enterprise deployments suggests adoption may plateau before it reaches the scale these valuations require. Competition is already compressing margins — open-source models are closing the capability gap with proprietary ones. And regulatory risk is not priced into any of these valuations.</p>

      <h2>What It Means for Beacon Operators</h2>

      <p>If you are building a business on top of AI infrastructure, the IPO wave has a direct operational implication: <strong>the pricing and availability of the tools you depend on is about to change.</strong></p>

      <p>Public companies have quarterly earnings pressure that private companies do not. That pressure creates incentives to raise prices, reduce free tiers, and prioritize enterprise contracts over individual operators. The generous pricing and broad access that characterized the 2023–2025 AI era was, in part, a customer acquisition strategy funded by venture capital. That era is ending.</p>

      <p>The Beacon doctrine response is straightforward: build your operational systems on open-source and self-hosted foundations wherever possible, use proprietary APIs for tasks where they genuinely outperform alternatives, and never build a critical dependency on a single provider's pricing model.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "ai-transition-not-replacement",
    audioSrc: "/audio/signal-ai-transition-redistribution.mp3",
    title: "The AI Transition Is Not a Replacement Story — It Is a Redistribution Story",
    excerpt:
      "Every major technological shift in history has redistributed power, income, and relevance. The question is not whether AI will change your work — it will. The question is which side of the redistribution you land on.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Jun 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">Every major technological shift in history has redistributed power, income, and relevance. The printing press did not eliminate writers. It eliminated scribes and created publishers. The question is not whether AI will change your work — it will. The question is whether you will be on the redistribution side or the displacement side.</p>

      <h2>The Pattern Is Not New</h2>

      <p>The industrial revolution displaced hand-weavers and created factory managers. The spreadsheet eliminated bookkeepers and created financial analysts. The internet eliminated travel agents and created digital marketers. In each case, the technology did not reduce the total amount of human work — it changed what kind of work humans did and who captured the value from it.</p>

      <p>AI is following the same pattern. The work being displaced is the work that can be reduced to a repeatable process: data entry, basic code generation, template-based writing, routine customer service. The work being created is the work that requires judgment, context, and accountability: AI system design, output verification, workflow architecture, and the human relationships that no machine can replace.</p>

      <h2>The Redistribution Is Already Happening</h2>

      <p>The Stanford payroll data is instructive. Employment for 22–25 year-old software developers — the cohort most likely to be doing entry-level, task-based coding work — is down approximately 20% since 2023. But employment for senior engineers, system architects, and AI integration specialists is up.</p>

      <p>The redistribution is not random. It is following a clear logic: work that can be specified precisely enough for a machine to do it is being automated. Work that requires the kind of judgment that only comes from experience, context, and accountability is becoming more valuable.</p>

      <h2>The Beacon Work Doctrine</h2>

      <p>For the professionals in the Beacon community navigating this shift, the strategic implication is direct: <strong>your value is not in what you know how to do. It is in your judgment about when, why, and how to do it.</strong></p>

      <p>The operators who will thrive in the AI era are not the ones who learn to use the most tools. They are the ones who develop the judgment to know which tools to trust, which outputs to verify, and which decisions require a human in the loop. That judgment is not a technical skill. It is an operational skill — and it is developed through structured practice, not passive consumption.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "five-questions-before-starting-over",
    audioSrc: "/audio/signal-five-questions-start-over.mp3",
    title: "Five Questions to Ask Before You Start Over",
    excerpt:
      "Most people who want to start over are not actually trying to escape their life. They are trying to escape the version of themselves that built it. Before you blow up what you have, ask these five questions.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "Jun 2026",
    featured: true,
    body: `
      <p class="beacon-article-lede">Most people who want to start over are not actually trying to escape their life. They are trying to escape the version of themselves that built it. Before you blow up what you have, ask these five questions — they will tell you whether you need a new life or just a new chapter.</p>

      <h2>Question 1: What Specifically Are You Running From?</h2>

      <p>Not "I'm unhappy" or "I need a change." Get specific. Is it a relationship? A job? A city? A pattern of behavior? The more specific you can be, the more likely you are to address the actual problem rather than relocate it to a new context.</p>

      <p>Most people who move cities to escape a difficult situation find that the difficulty travels with them. The geography changes; the pattern does not.</p>

      <h2>Question 2: What Would You Keep If You Could?</h2>

      <p>Starting over does not have to mean burning everything down. What in your current life is actually working? What relationships, skills, habits, or resources do you want to carry forward? The answer to this question tells you what you are actually protecting versus what you are willing to release.</p>

      <h2>Question 3: What Does "Better" Actually Look Like?</h2>

      <p>Not in abstract terms — in operational terms. What would you be doing on a Tuesday afternoon in the life you want? Who would you be with? What would the work feel like? What would the financial picture look like? The more concretely you can describe the destination, the more useful your planning will be.</p>

      <h2>Question 4: What Is the Minimum Viable Change?</h2>

      <p>Before you quit your job, sell your house, or end a relationship, ask: what is the smallest change that would meaningfully improve the situation? Sometimes the answer is a conversation. Sometimes it is a boundary. Sometimes it is a new skill. The minimum viable change is worth attempting before the maximum disruption.</p>

      <h2>Question 5: Are You Deciding or Reacting?</h2>

      <p>There is a difference between a decision made from clarity and a reaction made from pain. Decisions made from clarity tend to hold up over time. Reactions made from pain tend to create new problems. If you are in the middle of a crisis — a job loss, a relationship ending, a health scare — the best practice is to make no major irreversible decisions for 90 days. Let the acute pain subside before you redesign your life around it.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "solopreneur-vs-freelancer",
    audioSrc: "/audio/signal-solopreneur-vs-freelancer.mp3",
    title: "Solopreneur vs. Freelancer: The Difference That Changes Everything",
    excerpt:
      "A freelancer sells time. A solopreneur builds systems. Both can produce income. Only one can produce freedom. Here is the framework that separates the two.",
    pillar: "Venture",
    pillarColor: "#7C4F2A",
    readTime: "7 min",
    date: "May 2026",
    body: `
      <p class="beacon-article-lede">A freelancer sells time. A solopreneur builds systems. Both can produce income. Only one can produce freedom. The distinction is not about what you do — it is about how you structure what you do.</p>

      <h2>The Freelancer Model</h2>

      <p>A freelancer exchanges hours for dollars. The income is real, the skills are real, and the work can be excellent. But the model has a structural ceiling: you can only work so many hours. When you stop working, the income stops. When you get sick, the income stops. When you want a vacation, the income stops — or the clients go elsewhere.</p>

      <p>Freelancing is not a bad model. It is a starting model. It is how most independent operators begin, and it is how many stay — not by choice, but because they never built the bridge to the next structure.</p>

      <h2>The Solopreneur Model</h2>

      <p>A solopreneur builds systems that produce value independently of their direct time input. The product might be a course, a template library, a newsletter with a paid tier, a software tool, or a service that has been productized and systematized enough to be delivered without the founder's direct involvement in every transaction.</p>

      <p>The income from a solopreneur model is not unlimited — nothing is. But it is not directly capped by hours worked. A course sold at 2 a.m. while you sleep generates the same revenue as one sold during a live sales call.</p>

      <h2>The Bridge Between Them</h2>

      <p>The transition from freelancer to solopreneur is not a single decision. It is a series of small structural choices made consistently over time. The most important of those choices is this: <strong>every time you do a task more than twice, ask whether it can be systematized, templated, or productized.</strong></p>

      <p>The freelancer answers the same client question for the tenth time. The solopreneur writes the answer once, turns it into a guide, and sells the guide. The freelancer builds a custom solution for each client. The solopreneur builds a reusable framework and licenses it.</p>

      <h2>The Beacon Venture Doctrine</h2>

      <p>The Beacon Venture pathway is built for people who want to make the transition from time-seller to system-builder. The curriculum is not about tactics — it is about the structural thinking that makes the transition possible. The tools change. The thinking is what lasts.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "ai-tools-that-actually-work",
    audioSrc: "/audio/signal-ai-tools-non-technical.mp3",
    title: "Separating the Leverage from the Noise",
    excerpt:
      "The market is flooded with AI tools designed to look impressive in a demo. We do not care about demos. We care about what works when the environment is hostile and the stakes are real.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "May 2026",
    body: `
      <p class="beacon-article-lede">If you want to understand the current AI market, look at who is selling the shovels. The ecosystem is flooded with tools designed to look impressive in a controlled demo, built by people who have never had to rely on them when the environment is hostile and the stakes are real. At Beacon, we do not care about demos. We care about leverage.</p>

      <h2>The Illusion of the Turnkey Solution</h2>

      <p>The system wants you to buy the illusion that intelligence can be purchased in a shrink-wrapped box. "Install this tool and replace your entire operations team." It is the same lie they sold with enterprise software two decades ago, repackaged for the agentic era.</p>

      <p>Tools that promise to replace human judgment entirely are a liability. They perform adequately on the median task and fail catastrophically on the edge cases. And if you have lived through anything difficult, you know that survival happens in the edge cases.</p>

      <h2>The Tools That Actually Work</h2>

      <p>The leverage does not come from a magic bullet. It comes from assembling reliable, modular agents that do one thing with absolute precision. The tools that matter are the ones that integrate cleanly into your architecture, that allow you to verify their outputs, and that amplify your judgment rather than attempting to replace it.</p>

      <p>We use frontier models to process unstructured data, to draft the architecture of our operations, and to run local swarms that handle the execution gap. We do not use them to decide what matters. That is the domain of the operator.</p>

      <h2>The Beacon Standard of Deployment</h2>

      <p>Before you integrate any AI tool into your foundation, ask the only question that matters: does this tool increase my autonomy, or does it create a new dependency? If it obscures the process, locks your data behind a proprietary wall, or removes your ability to audit the outcome, it is not leverage. It is a leash.</p>

      <p>Choose the tools that serve the mission. Discard the rest.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "wisdom-over-information",
    audioSrc: "/audio/signal-wisdom-over-information.mp3",
    title: "The Asset the Machine Cannot Generate",
    excerpt:
      "Information is now free and infinite. Wisdom — the ability to know what to do with information — is the only moat left. If you have survived the fire, your scars are your credentials.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "May 2026",
    body: `
      <p class="beacon-article-lede">Information is now free and infinite. The machine can synthesize the entire history of human knowledge in seconds. But information is not wisdom. Information is the data. Wisdom is knowing what to do when the data conflicts with reality. And wisdom cannot be generated. It must be earned.</p>

      <h2>The Information Paradox</h2>

      <p>We are drowning in information and starving for judgment. Every tactic, every framework, and every strategy is available on demand. Yet the people with access to all of it are still paralyzed. Why? Because when the cost of information drops to zero, the value of the person who knows which information actually matters goes up.</p>

      <p>The system wants you to believe that the young, the unscarred, and the credentialed will inherit this new world because they are faster with the tools. The opposite is true. The tools are easy. The judgment required to wield them is hard.</p>

      <h2>The Wounded Healer's Moat</h2>

      <p>If you have lived through hard transitions — a deployment, a sentence, a business collapse, a total reconstruction of your life — you carry something the machine cannot replicate. You carry the knowledge of what it actually feels like to navigate uncertainty when the theory runs out and the safety nets vanish.</p>

      <p>That is not a liability. That is the moat. AI can write the code, draft the copy, and analyze the spreadsheet. It cannot look another human being in the eye and tell them they are going to survive the night because you survived it first.</p>

      <h2>The Digital Grandpa Thesis</h2>

      <p>The people who have been tested by the system and survived it are the most undervalued asset in the AI era. You are not obsolete. You are the missing piece of the architecture.</p>

      <p>The leverage is available to anyone. The wisdom to direct it is not. Your job is not to compete with the machine. Your job is to point the machine at the problems only you understand.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "beacon-trading-entry-point",
    audioSrc: "/audio/signal-beacon-trading-entry-point.mp3",
    title: "The Financial Foundation of Autonomy",
    excerpt:
      "The system uses financial illiteracy as a control mechanism. If you do not understand how capital moves, you will spend your life moving it for someone else. Here is how to break the cycle.",
    pillar: "Trading",
    pillarColor: "#B8860B",
    readTime: "6 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">The system uses financial illiteracy as a control mechanism. It is not an accident that the mechanics of capital, leverage, and compounding are not taught to the people who need them most. If you do not understand how money moves, you will spend your life moving it for someone else. Financial literacy is not about wealth. It is about autonomy.</p>

      <h2>The Tax on the Uninformed</h2>

      <p>Financial stress is not just a burden; it is a tax on your cognitive bandwidth. When you are operating from a position of scarcity, you cannot make strategic decisions. You make survival decisions. The institutions rely on that scarcity to keep the labor pool compliant and the debt cycles churning.</p>

      <p>You cannot build a sovereign life on a foundation of financial ignorance. Until you understand the rules of the game, you are the piece being played.</p>

      <h2>Redefining Literacy</h2>

      <p>Financial literacy is not the ability to pick stocks or decipher complex derivatives. It is the understanding of leverage. It is knowing the difference between an asset that produces freedom and a liability disguised as a status symbol. It is understanding that capital, like intelligence, is just stored energy waiting to be directed.</p>

      <p>The people who have been locked out of the traditional pathways to wealth do not need another lecture on saving the price of a coffee. They need to understand how the architecture of modern markets actually functions.</p>

      <h2>The Educational Mandate</h2>

      <p>The Beacon educational platform exists to demystify that architecture. We do not provide financial advice, and we are not an institution. We provide the map. The simulation-first approach allows you to learn the mechanics of modern markets with real data, without risking the capital you need to survive.</p>

      <p>The goal is not to turn you into a day trader. The goal is to ensure that when you make a decision about your life, your business, or your family, you are making it from a position of clarity, not desperation.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "identity-after-job-loss",
    audioSrc: "/audio/signal-identity-after-job-loss.mp3",
    title: "The Danger of the Borrowed Identity",
    excerpt:
      "When the institution revokes your title, who is left standing? If your identity is tied to a system you do not control, you are always one decision away from being erased.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "8 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">The most dangerous thing you can do is lease your identity from an institution. When the title disappears — through a layoff, a discharge, a sentence, or a systemic collapse — the identity crisis that follows is not a psychological flaw. It is the structural consequence of building your foundation on rented land.</p>

      <h2>The Illusion of the Title</h2>

      <p>The system encourages you to confuse your function with your worth. It gives you a title, a uniform, or a badge, and tells you that this is who you are. It works perfectly, right up until the moment the system decides it no longer needs you. When the role ends, the identity built around it shatters.</p>

      <p>If you have been through the fire, you already know this. The veteran who takes off the uniform for the last time knows it. The person walking out of the gates with nothing but a release paper knows it. The corporate operator whose division was just automated knows it.</p>

      <h2>The Sovereign Inventory</h2>

      <p>The period after the title is stripped away is brutal. But it is also the only time you can take an honest inventory of what actually belongs to you. What capacity for endurance did you build? What judgment did you earn? What principles do you hold when no one is paying you to hold them?</p>

      <p>Those are not soft skills. They are the only assets the system cannot revoke.</p>

      <h2>The Foundation of Autonomy</h2>

      <p>You cannot build a sovereign life on a borrowed identity. Before you can direct the leverage of the AI era, you must know exactly who is directing it. The work is internal before it is external.</p>

      <p>We do not rebuild by finding a new master to serve. We rebuild by anchoring our identity in the wisdom we earned in the dark, and using the tools of this moment to ensure we never have to lease our worth again.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "automation-first-business",
    audioSrc: "/audio/signal-automation-first-business.mp3",
    title: "The Architecture of the Lean Operator",
    excerpt:
      "The old model was to hire humans to act like machines. The new model is to build the machine first, and reserve the human for the judgment the machine lacks.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "7 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">For a century, the standard business model was to hire human beings to act like machines — executing repetitive tasks, moving data from one column to another, following rigid scripts. It was an indignity to the human and an inefficiency for the business. That era is over. The operators who win the next decade will build the machine first, and reserve the human for the judgment the machine lacks.</p>

      <h2>The Cost of the Old Model</h2>

      <p>When you hire a person to do a repeatable task, you are not just paying their salary. You are paying the friction cost of human error, the management overhead, and the structural fragility of a single point of failure. More importantly, you are wasting human potential on work that requires zero earned wisdom.</p>

      <p>The institutions are currently paralyzed trying to retrofit automation into legacy human workflows. They are fighting internal resistance, defending old fiefdoms, and moving slowly. The independent operator has no such baggage.</p>

      <h2>The Automation-First Mandate</h2>

      <p>The Beacon mandate is absolute: if a process can be defined by a set of rules, it belongs to an agent. You do not hire a human being until you reach the edge of the rules — the point where context, empathy, and hard-won judgment are required to make the call.</p>

      <p>This is how the veteran, the formerly incarcerated, and the solo founder compete with the institutions. You do not need a team of fifty. You need an architecture of five reliable agents, and the wisdom to direct them.</p>

      <h2>The Human Bottleneck</h2>

      <p>When you automate the routine, the human becomes the bottleneck — but it is the right kind of bottleneck. The human is reserved for the relationship that requires trust, the strategy that requires vision, and the crisis that requires courage. That is where your leverage lives.</p>

      <p>Build the system. Automate the friction. Protect the judgment.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "resume-is-dead",
    audioSrc: "/audio/signal-resume-is-dead.mp3",
    title: "The End of the Permission Slip",
    excerpt:
      "The traditional resume is a permission slip you hand to an institution, hoping they validate your worth. In the intelligence arbitrage, you do not ask for permission. You demonstrate leverage.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Mar 2026",
    body: `
      <p class="beacon-article-lede">The traditional resume is a permission slip. It is a document you format according to the system's rules, hand to a gatekeeper, and wait to be told if your past makes you worthy of their future. If your past includes a gap, a uniform, or a sentence, the gatekeeper throws the slip away. That game is rigged. Stop playing it.</p>

      <h2>The Filter of the Algorithm</h2>

      <p>The system has automated the rejection. Your resume is no longer read by a human looking for potential; it is parsed by an algorithm looking for compliance. It scans for the exact keywords, the unbroken timeline, and the approved credentials. If you do not fit the mold perfectly, you are filtered out before a human ever sees your name.</p>

      <p>You cannot win a compliance game against a machine designed to enforce the status quo.</p>

      <h2>The Demonstration of Leverage</h2>

      <p>The alternative is not to write a better resume. The alternative is to bypass the filter entirely by demonstrating leverage. In the AI era, the cost of building a prototype, executing a complex analysis, or solving a specific problem for a target organization is near zero.</p>

      <p>Do not tell them what you did five years ago. Show them what you can do for them tomorrow. Use the tools to identify their operational friction, build the agentic solution that solves it, and deliver the result. When you arrive with the solution already built, the gap in your employment history ceases to matter.</p>

      <h2>The Sovereign Operator</h2>

      <p>The people the system wrote off have always had to work twice as hard to get half the recognition. The intelligence arbitrage changes the math. When you hold the leverage, you dictate the terms of engagement.</p>

      <p>Stop asking the institution to validate your worth based on a piece of paper. Build the architecture, demonstrate the value, and make them ask you for access to it.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
];

// ─── Helper: find article by slug ─────────────────────────────────────────────
function findArticle(slug: string): ArticleContent | undefined {
  return ARTICLE_CONTENT.find((a) => a.id === slug);
}

// ─── Pillar badge ──────────────────────────────────────────────────────────────
function PillarBadge({ pillar, color }: { pillar: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.7rem",
        borderRadius: "2px",
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color,
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      Beacon {pillar}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = findArticle(params.slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  // 404 state
  if (!article) {
    return (
      <div style={{ minHeight: "100vh", background: "#0D1B2A", color: "#FAF8F4" }}>
        <SharedNav dark />
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "8rem 2rem 4rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#1A5C6B",
              marginBottom: "1rem",
            }}
          >
            Article Not Found
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              color: "#FAF8F4",
              marginBottom: "1.5rem",
            }}
          >
            This article does not exist.
          </h1>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#1A5C6B",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} /> Back to The Signal
          </Link>
        </div>
        <SharedFooter dark />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0D1B2A", color: "#FAF8F4" }}>
      <SharedNav dark />

      {/* ── Article Header ── */}
      <header
        style={{
          background: "linear-gradient(180deg, #0A1520 0%, #0D1B2A 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "6rem 2rem 3rem",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(250,248,244,0.45)",
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              marginBottom: "1.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF8F4")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,248,244,0.45)")}
          >
            <ArrowLeft size={12} /> The Signal
          </Link>

          {/* Pillar badge */}
          <div style={{ marginBottom: "1.25rem" }}>
            <PillarBadge pillar={article.pillar} color={article.pillarColor} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#FAF8F4",
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
            }}
          >
            {article.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "rgba(250,248,244,0.45)",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "0.8rem",
              }}
            >
              <Clock size={13} /> {article.readTime} read
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "rgba(250,248,244,0.45)",
                fontFamily: "'Outfit', system-ui, sans-serif",
                fontSize: "0.8rem",
              }}
            >
              <Calendar size={13} /> {article.date}
            </span>
          </div>

          {/* Listen Button */}
          {article.audioSrc && (
            <div style={{ marginTop: "1.5rem" }}>
              <audio id="beacon-audio-player" src={article.audioSrc} preload="none" />
              <button
                id="beacon-listen-btn"
                onClick={() => {
                  const audio = document.getElementById("beacon-audio-player") as HTMLAudioElement;
                  const btn = document.getElementById("beacon-listen-btn") as HTMLButtonElement;
                  const label = document.getElementById("beacon-listen-label");
                  if (!audio) return;
                  if (audio.paused) {
                    audio.play();
                    if (label) label.textContent = "Pause";
                    btn.style.background = "rgba(26,92,107,0.25)";
                  } else {
                    audio.pause();
                    if (label) label.textContent = "Listen";
                    btn.style.background = "transparent";
                  }
                  audio.onended = () => {
                    if (label) label.textContent = "Listen";
                    btn.style.background = "transparent";
                  };
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "transparent",
                  border: `1px solid ${article.pillarColor}`,
                  borderRadius: "2px",
                  padding: "0.45rem 1rem",
                  cursor: "pointer",
                  color: article.pillarColor,
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <polygon points="2,1 11,6 2,11" />
                </svg>
                <span id="beacon-listen-label">Listen</span>
              </button>
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              width: "3rem",
              height: "2px",
              background: article.pillarColor,
              marginTop: "2rem",
              opacity: 0.6,
            }}
          />
        </div>
      </header>

      {/* ── Hero Image ── */}
      {article.heroImage && (
        <div
          style={{
            width: "100%",
            maxHeight: "420px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={article.heroImage}
            alt="Beacon Momentum — lighthouse at golden hour"
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              objectPosition: "center 40%",
              display: "block",
              filter: "brightness(0.82)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #0D1B2A)",
            }}
          />
        </div>
      )}

      {/* ── Article Body ── */}
      <main
        id="main-content"
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
        }}
      >
        <style>{`
          .beacon-article-body p {
            font-family: 'Lora', Georgia, serif;
            font-size: clamp(1rem, 2vw, 1.1rem);
            line-height: 1.85;
            color: rgba(250, 248, 244, 0.88);
            margin-bottom: 1.5rem;
          }
          .beacon-article-body .beacon-article-lede {
            font-size: clamp(1.05rem, 2.2vw, 1.2rem);
            color: rgba(250, 248, 244, 0.95);
            font-style: italic;
            border-left: 3px solid ${article.pillarColor};
            padding-left: 1.25rem;
            margin-bottom: 2rem;
          }
          .beacon-article-body h2 {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(1.3rem, 3vw, 1.65rem);
            font-weight: 600;
            color: #FAF8F4;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
          }
          .beacon-article-body h3 {
            font-family: 'Outfit', system-ui, sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: ${article.pillarColor};
            margin-top: 2rem;
            margin-bottom: 0.75rem;
          }
          .beacon-article-body blockquote {
            background: rgba(255,255,255,0.04);
            border-left: 3px solid ${article.pillarColor};
            padding: 1.25rem 1.5rem;
            margin: 2rem 0;
            font-family: 'Lora', Georgia, serif;
            font-size: 1rem;
            line-height: 1.75;
            color: rgba(250, 248, 244, 0.85);
            font-style: italic;
          }
          .beacon-article-body ul, .beacon-article-body ol {
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .beacon-article-body li {
            font-family: 'Lora', Georgia, serif;
            font-size: clamp(1rem, 2vw, 1.05rem);
            line-height: 1.8;
            color: rgba(250, 248, 244, 0.85);
            margin-bottom: 0.5rem;
          }
          .beacon-article-body strong {
            color: #FAF8F4;
            font-weight: 600;
          }
          .beacon-article-body em {
            font-style: italic;
          }
          .beacon-article-body .beacon-article-closing {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 1.1rem;
            font-style: italic;
            color: rgba(250, 248, 244, 0.6);
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
          .beacon-article-sources {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
          .beacon-article-sources h3 {
            font-family: 'Outfit', system-ui, sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(250,248,244,0.4);
            margin-bottom: 0.75rem;
          }
          .beacon-article-sources ul {
            list-style: none;
            padding: 0;
          }
          .beacon-article-sources li {
            font-family: 'Outfit', system-ui, sans-serif;
            font-size: 0.8rem;
            color: rgba(250,248,244,0.35);
            margin-bottom: 0.4rem;
            padding-left: 1rem;
            position: relative;
          }
          .beacon-article-sources li::before {
            content: '—';
            position: absolute;
            left: 0;
            color: rgba(250,248,244,0.2);
          }
        `}</style>

        <div
          className="beacon-article-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* ── Back to blog ── */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: article.pillarColor,
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={13} /> Back to The Signal
          </Link>
        </div>
      </main>

      <SharedFooter dark />
    </div>
  );
}
