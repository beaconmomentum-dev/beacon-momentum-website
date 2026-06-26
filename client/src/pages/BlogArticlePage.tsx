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
  body: string; // HTML string for article body
}

// ─── Full Article Content ─────────────────────────────────────────────────────
const ARTICLE_CONTENT: ArticleContent[] = [
  {
    id: "ai-roi-reckoning",
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
    title: "The AI Tools That Actually Work (And the Ones That Just Look Like They Do)",
    excerpt:
      "After running dozens of AI audits for businesses across five industries, Beacon Labs has identified the tools that produce measurable results versus the ones that produce impressive demos.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "9 min",
    date: "May 2026",
    body: `
      <p class="beacon-article-lede">After running dozens of AI audits for businesses across five industries, Beacon Labs has identified the tools that produce measurable results versus the ones that produce impressive demos. The gap is wider than most people expect.</p>

      <h2>The Demo Problem</h2>

      <p>Every AI tool looks good in a demo. The demo is designed to show the tool at its best — clean inputs, clear tasks, favorable conditions. The real test is what happens when you put the tool into a messy real-world workflow with inconsistent inputs, legacy systems, and users who are not AI experts.</p>

      <p>Most tools fail that test. Not because they are fraudulent — the capabilities are real. But because the gap between "impressive demo" and "reliable operational tool" is enormous, and most vendors do not acknowledge it.</p>

      <h2>The Tools That Produce Measurable Results</h2>

      <p>Based on Beacon Labs audits, the tools that consistently produce measurable ROI share three characteristics: they do one thing exceptionally well, they integrate cleanly with existing workflows, and they have a clear verification mechanism so you can tell when the output is wrong.</p>

      <p>In the writing and content category, AI tools that assist with editing, summarization, and first-draft generation consistently produce measurable time savings — typically 30–50% reduction in time-to-first-draft. The key word is "assist." The tools that replace the human writer entirely tend to produce content that is technically correct but strategically empty.</p>

      <p>In the operations category, AI tools that automate data extraction, classification, and routing from structured inputs (forms, emails, spreadsheets) produce consistent results. The inputs are clean; the task is well-defined; the output can be verified. These tools work.</p>

      <h2>The Tools That Just Look Like They Do</h2>

      <p>The tools that consistently underperform in real-world deployments are the ones that promise to replace judgment. AI-powered "strategy" tools, "autonomous" sales agents, and "self-managing" customer service systems all share the same failure mode: they perform well on the cases they were trained on and fail unpredictably on the edge cases that actually matter.</p>

      <p>The edge cases are where the business lives. The routine cases take care of themselves.</p>

      <h2>The Beacon Systems Evaluation Framework</h2>

      <p>Before deploying any AI tool in a real operational context, Beacon Labs recommends a three-question evaluation: Does it do one thing well? Can you verify the output without being an AI expert? Does it fail gracefully when it fails? If the answer to any of these questions is no, the tool is not ready for production use.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "wisdom-over-information",
    title: "Why Wisdom Matters More Than Information in the Age of AI",
    excerpt:
      "Information is now free and infinite. Wisdom — the ability to know what to do with information — has never been more scarce or more valuable.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "5 min",
    date: "May 2026",
    body: `
      <p class="beacon-article-lede">Information is now free and infinite. Wisdom — the ability to know what to do with information — has never been more scarce or more valuable. The Digital Grandpa thesis is simple: the people who have lived through hard things have something AI cannot replicate.</p>

      <h2>The Information Paradox</h2>

      <p>We live in the most information-rich environment in human history. Every question you can think of has been answered somewhere on the internet. Every skill you want to learn has a tutorial. Every problem you face has a forum thread. And yet, by most measures, people are not making better decisions than they were 30 years ago.</p>

      <p>The reason is that information and wisdom are not the same thing. Information is data. Wisdom is the judgment to know which data matters, when to apply it, and what to do when the data conflicts with itself — which it always does in real life.</p>

      <h2>What AI Can and Cannot Do</h2>

      <p>AI is the most powerful information retrieval and synthesis tool ever built. It can summarize, compare, analyze, and generate at a scale no human can match. But it cannot tell you what matters to you specifically. It cannot weigh the tradeoffs in your particular situation with your particular constraints. It cannot account for the things you know that you have never said out loud.</p>

      <p>That is the domain of wisdom. And wisdom is not downloaded. It is earned — through experience, failure, reflection, and the kind of mentorship that only happens in real relationships.</p>

      <h2>The Digital Grandpa Thesis</h2>

      <p>The people who have lived through hard transitions — career changes, financial setbacks, health crises, relationship losses — carry something that cannot be Googled or generated. They carry the knowledge of what it actually feels like to navigate uncertainty, and what actually works when the theory runs out.</p>

      <p>That knowledge is the most undervalued asset in the AI era. As information becomes cheaper and more abundant, the people who can help others apply it wisely become more valuable, not less.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "beacon-trading-entry-point",
    title: "Why Financial Literacy Is the Foundation of Every Other Kind of Freedom",
    excerpt:
      "You cannot make good decisions about your career, your business, or your life if you are financially illiterate. Not because money is everything — but because financial stress is the single most common reason people make decisions they later regret.",
    pillar: "Trading",
    pillarColor: "#B8860B",
    readTime: "6 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">You cannot make good decisions about your career, your business, or your life if you are financially illiterate. Not because money is everything — it is not. But because financial stress is the single most common reason people make decisions they later regret.</p>

      <h2>The Stress Tax</h2>

      <p>Financial stress does not just feel bad. It impairs cognition. Research from Princeton and Harvard has shown that financial scarcity consumes cognitive bandwidth — the mental resources you need for planning, judgment, and self-control. When you are worried about money, you have less capacity for everything else.</p>

      <p>This is not a character flaw. It is a documented cognitive effect. And it means that financial literacy is not just about money — it is about the quality of every other decision you make.</p>

      <h2>What Financial Literacy Actually Means</h2>

      <p>Financial literacy is not about knowing how to pick stocks or time the market. Most professional fund managers cannot reliably do those things. Financial literacy is about understanding the basic mechanics of how money moves: income, expenses, assets, liabilities, cash flow, and compounding.</p>

      <p>With those fundamentals in place, you can make informed decisions about your career (is this job offer actually better?), your business (is this investment worth it?), and your life (can I actually afford this?). Without them, you are navigating by feel — and feel is unreliable.</p>

      <h2>The Beacon Trading Pathway</h2>

      <p>The Beacon Trading pathway is not a trading course. It is a financial literacy foundation built for people who want to understand how markets work, how wealth is actually built outside the traditional system, and how to make financial decisions from a position of knowledge rather than anxiety.</p>

      <p>The simulation-first approach means you learn with real market data and real mechanics, without real financial risk. The goal is not to make you a trader. The goal is to make you financially literate enough to make good decisions about everything else.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "identity-after-job-loss",
    title: "Who Are You When the Job Title Is Gone?",
    excerpt:
      "For most people, their job title is their identity. When the title disappears — through layoff, retirement, or a deliberate exit — the identity crisis that follows is real and often underestimated.",
    pillar: "Life",
    pillarColor: "#2A7F6F",
    readTime: "8 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">For most people, their job title is their identity. When the title disappears — through layoff, retirement, or a deliberate exit — the identity crisis that follows is real and often underestimated. Here is how to navigate it without losing yourself.</p>

      <h2>The Title Was Never You</h2>

      <p>The job title was a role you played. It came with a script, a costume, a set of relationships, and a place in a hierarchy. Those things are real and they matter. But they were never the whole of who you are — even if, over time, they came to feel that way.</p>

      <p>The problem with building your identity around a role is that roles end. Jobs are eliminated. Companies are acquired. Careers are disrupted. When the role ends, the identity built around it goes with it — and what is left can feel like nothing.</p>

      <h2>The Transition Is Not a Crisis — It Is an Inventory</h2>

      <p>The period after a job title disappears is disorienting. But it is also, if you approach it correctly, an opportunity to take inventory of who you actually are when the role is stripped away.</p>

      <p>What do you care about when no one is watching? What problems do you find yourself thinking about even when you are not being paid to? What skills do you have that exist independent of any employer? What relationships do you have that are not contingent on your professional status?</p>

      <p>The answers to those questions are the raw material of whatever comes next.</p>

      <h2>The Beacon Life Approach</h2>

      <p>The Beacon Life pathway was built specifically for people navigating this kind of transition. The curriculum is not about finding a new job title to replace the old one. It is about building a stable identity that does not depend on any single role, employer, or external validation.</p>

      <p>The work is internal before it is external. You cannot build a sustainable next chapter on an unstable foundation. The Beacon Life approach starts with the foundation.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "automation-first-business",
    title: "Build the Automation First, Then Hire the Human",
    excerpt:
      "The old model: hire a person, then automate their repetitive tasks later. The new model: automate everything you can first, then hire a human for the judgment calls that automation cannot make.",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    readTime: "7 min",
    date: "Apr 2026",
    body: `
      <p class="beacon-article-lede">The old model: hire a person, then automate their repetitive tasks later. The new model: automate everything you can first, then hire a human for the judgment calls that automation cannot make. The businesses that get this right will operate at a fraction of the cost of those that do not.</p>

      <h2>Why the Old Model Fails</h2>

      <p>The old model of hiring first and automating later has a structural problem: people build habits, relationships, and institutional knowledge around the way things are done. When you try to automate a process that a human has been doing for two years, you are not just replacing a task — you are disrupting a person's workflow, their sense of value, and often their job security.</p>

      <p>The result is that automation projects in established organizations face enormous resistance — not because the technology does not work, but because the human and organizational costs of the transition are underestimated.</p>

      <h2>The Automation-First Approach</h2>

      <p>When you build the automation first, you start with a clean slate. You design the workflow around what the technology can do reliably, then identify the specific points in that workflow where human judgment is genuinely required. Those are the only points where you hire a human.</p>

      <p>The result is a leaner, more resilient operation. The human you hire is doing work that actually requires a human — judgment, relationship management, creative problem-solving, accountability. They are not spending 60% of their day on tasks that a well-designed system could handle.</p>

      <h2>What This Looks Like in Practice</h2>

      <p>For a small business owner, the automation-first approach means mapping every repeating process before hiring anyone to do it. Customer onboarding, invoice generation, follow-up sequences, content scheduling, data reporting — these are all candidates for automation before they are candidates for a hire.</p>

      <p>The hire comes when you hit a genuine judgment bottleneck: a customer situation that requires empathy and context, a strategic decision that requires experience, a relationship that requires a human presence. That is where the human adds irreplaceable value.</p>

      <p class="beacon-article-closing">The Lighthouse is lit. Join us at the Watch.</p>
    `,
  },
  {
    id: "resume-is-dead",
    title: "The Resume Is Not Dead — But the Way You Use It Is",
    excerpt:
      "The resume is not a history document. It is a marketing document. Most people treat it like the former and wonder why it does not work like the latter.",
    pillar: "Work",
    pillarColor: "#1A5C6B",
    readTime: "6 min",
    date: "Mar 2026",
    body: `
      <p class="beacon-article-lede">The resume is not a history document. It is a marketing document. Most people treat it like the former and wonder why it does not work like the latter. Here is how to reframe every line of your resume for the AI-era job market.</p>

      <h2>The History Document Problem</h2>

      <p>Most resumes read like a chronological list of things the person did. Dates, titles, bullet points describing responsibilities. The implicit message is: here is my past. The hiring manager's job is to figure out what it means for their future.</p>

      <p>That is backwards. The hiring manager is not an archaeologist. They are a buyer. They are trying to answer one question: can this person solve the problem I have right now? A history document does not answer that question. A marketing document does.</p>

      <h2>The Marketing Document Reframe</h2>

      <p>A marketing document starts with the buyer's problem, not the seller's history. Before you write a single line of your resume, you need to know: what problem is this organization trying to solve? What does success look like in this role? What does the person who gets this job need to be able to do?</p>

      <p>Every line of your resume should be written to answer those questions. Not "I managed a team of five" but "I built and led the team that reduced customer churn by 23% in 18 months." Not "I was responsible for social media" but "I grew organic social reach from 2,000 to 47,000 followers without a paid budget."</p>

      <h2>The AI-Era Adjustment</h2>

      <p>In the current job market, your resume is read by an AI before it is read by a human. The AI is looking for keyword matches to a job description. This means that the marketing document reframe has an additional layer: you need to use the language of the job description, not just the language of your experience.</p>

      <p>This is not gaming the system. It is speaking the buyer's language. If the job description says "cross-functional collaboration" and your resume says "worked with other teams," you are describing the same thing in different words — but the AI will not make that connection.</p>

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
