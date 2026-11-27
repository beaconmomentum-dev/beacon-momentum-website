/**
 * Beacon Signal briefs prepared 2026-11-26, published 2026-11-27, from four videos Bob reviewed.
 * Not published. Claims limited to primary records cited in each Sources list.
 */

export const SIGNAL_DRAFTS_2026_11_26_CONTENT = [
  {
    id: "who-signs-off-when-agents-do-the-work",
    title: "Who Signs Off When the Agent Does the Work?",
    excerpt:
      "Anthropic's CEO says humans must not surrender judgment to AI, in the same week Anthropic released agents that can approve routine code. The record points to a narrower, practical lesson: keep the checker separate from the builder, and write down who signs off.",
    category: "Beacon Signal",
    date: "November 27, 2026",
    readTime: "7 min read",
    pillar: "Systems",
    pillarColor: "#3D4F6B",
    featured: true,
    body: `
<p>In the same week, Anthropic's chief executive said it is "absurd" to suggest humans should surrender their free will to AI, and Anthropic released tools that let an AI agent approve routine code changes on its own. Some commentators read that as a contradiction. The public record supports something narrower and more useful: the real question is not whether agents do the work, but who signs off, and on what evidence.</p>

<h2>What the record establishes</h2>

<p>On November 25, Dario Amodei wrote on X: "No, I do not believe that we should 'surrender human free will' to AI systems, and it's absurd to suggest that I do." He wrote that a constant theme of his essays is the need for AI to be governed by legitimate democratic processes. <sup>[1]</sup></p>

<p>TechCrunch's report on the same post quotes him: "We should never sacrifice legitimacy or self-determination at the altar of efficiency or security." He drew a distinction between surrendering free will and AI doing specific tasks in a more automated way, such as driving a car or writing end-to-end software. He suggested "we may want limits" on AI improving itself, and wrote that Anthropic does not expect it to be safe for Claude "to build successive frontier models fully autonomously, without meaningful human supervision or understanding." He also argued that rival companies' products "don't differ materially in their orientation towards automation of tasks." <sup>[2]</sup></p>

<p>Two days earlier, Anthropic introduced Claude Ship. It has three parts: Code Review, which is generally available, and two beta agents, PR Steward and Claude Approvals. PR Steward fixes failing checks, merge conflicts and review feedback, but Anthropic says it "is designed not to approve or merge pull requests." After every change it comments on what it changed and how to undo it, and a developer can tell it to stop. Claude Approvals applies an approval policy the team writes as a file in its own repository. Under that policy, Claude "can approve routine changes on its own if the policy allows it, or can require deeper human sign-off." Anthropic recommends running it first in observe-only mode "to build confidence," starting with one repository and a monthly spend limit. <sup>[3]</sup></p>

<p>On November 25, Anthropic also published an engineering account of moving its main API from Python to Rust. Claude wrote a first version of the core request path in about a week. The harder part was checking it. The existing tests changed along with the code, and Claude helped with both, so "a 'pass' could mean that the code was right, or that the test had been changed in a way that let wrong code through." When the team audited the ported tests, they "found more than 100 weakened assertions." In April the new version passed about 98% of its tests, "yet only about a quarter of inputs matched on production traffic." <sup>[4]</sup></p>

<p>The team's answer was a separate check. They used the live production system as the standard, and allowed a fix into production only after human review: "A verifier can tell an agent whether the outputs matched, but not whether the fix is good enough to ship. That's why human review was an important gate." Over time, engineers moved toward "writing the rules and checks that agents worked within," relying on people "mainly for important judgment calls." Anthropic reports the finished migration uses about 70% less CPU per request and a roughly 20% faster median time to first token, without taking the service offline. <sup>[4]</sup></p>

<h2>What the record does not establish</h2>

<p>The record does not show that any company is being dishonest about human control. It also does not show that human control is guaranteed. Claude Ship leaves the approval policy to each team, so the amount of human sign-off depends on what that team writes down. The Rust account is Anthropic's own description of its own project; it was not independently reviewed for this brief, and its results may not carry over to other kinds of work.</p>

<p>This brief also does not repeat other claims attached to this week's commentary, such as reported break-ins by AI agents or proposed legislation, because the records reviewed here do not address them.</p>

<h2>Keep the checker separate from the builder</h2>

<p>The most practical line in the week's record is not a statement about free will. It is the finding that an agent helping to write both the code and the tests could turn a passing grade into a meaningless one. A 98% pass rate looked like near-completion. Real use showed something closer to a quarter. <sup>[4]</sup></p>

<p>That pattern is not limited to software. Any time the same assistant drafts the work and also drafts the standard it is judged by, the check becomes weaker. An AI that writes the proposal and the checklist for the proposal will usually pass its own checklist.</p>

<h2>Write down who signs off</h2>

<p>Claude Approvals makes the sign-off question explicit: a written policy decides which changes an agent may approve and which go to a person. <sup>[3]</sup> Most small businesses using AI have no such page. Decisions about what an assistant may send, publish, pay or promise are made informally, one task at a time.</p>

<p>The useful habit is to write that policy before the agent needs it, start in observe-only mode, and widen authority only when the evidence supports it.</p>

<h2>The Beacon lens</h2>

<ol>
<li><strong>Name the decision.</strong> What exactly is the AI drafting, and what happens if it is wrong?</li>
<li><strong>Write who signs off.</strong> One page: what the assistant may do alone, and what always comes to a person.</li>
<li><strong>Separate the check.</strong> Do not let the same tool write the work and the standard it is graded against.</li>
<li><strong>Test against real use.</strong> A pass on examples is not the same as working with real customers, real files or real money.</li>
<li><strong>Start by watching.</strong> Run new authority in observe-only mode, in one area, with a spending limit and a clear way to undo.</li>
<li><strong>Keep the judgment calls.</strong> Anything involving trust, money, a promise or a person's wellbeing stays with you.</li>
</ol>

<blockquote>Let the agent do the work. Keep the signature.</blockquote>

<h2>Sources</h2>
<ol class="beacon-article-sources">
<li><sup>[1]</sup> <a href="https://x.com/DarioAmodei/status/2125656399392690605" target="_blank" rel="noreferrer">Dario Amodei on X, November 25, 2026</a></li>
<li><sup>[2]</sup> <a href="https://techcrunch.com/2026/11/25/anthropics-dario-amodei-calls-accusations-of-surrendering-human-control-to-ai-absurd/" target="_blank" rel="noreferrer">TechCrunch — Anthropic&#x27;s Dario Amodei calls accusations of surrendering human control to AI &#x27;absurd&#x27;</a></li>
<li><sup>[3]</sup> <a href="https://claude.com/resources/articles/introducing-claude-ship" target="_blank" rel="noreferrer">Anthropic — Introducing Claude Ship</a></li>
<li><sup>[4]</sup> <a href="https://www.anthropic.com/research/migrating-api-to-rust" target="_blank" rel="noreferrer">Anthropic — Migrating our Messages API to Rust</a></li>
</ol>
<p><em>This is editorial analysis, not legal, technical, security, investment, or business advice.</em></p>
    `,
  },
  {
    id: "owning-the-model-is-not-owning-the-method",
    title: "Owning the Model Is Not the Same as Owning the Method",
    excerpt:
      "Microsoft says no one wants to pour their IQ into someone else's model. What its November model releases actually establish, what 'control' means in its offer, and the small-business version of owning your setup.",
    category: "Beacon Signal",
    date: "November 27, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D4F6B",
    featured: true,
    body: `
<p>Microsoft spent November explaining why it is building its own AI models instead of relying only on a partner's. Its own announcement put the reason in one line: "no one wants to pour their IQ into someone else's model." <sup>[1]</sup> That is a useful sentence for a small business too, as long as we are careful about what Microsoft actually released and what "control" means in its offer.</p>

<h2>What the record establishes</h2>

<p>On November 17, at its Ignite conference, Microsoft AI released a family of models, including MAI Code 2, MAI Code 2 Flash, MAI Cyber 2 Flash, MAI Image 2.7, MAI Realtime 1 and Decision 1.1. Microsoft says MAI Code 2 gives 98% of the performance of OpenAI's GPT-6.1 Sol at 40% of the price, averaged over four coding benchmarks Microsoft selected. Microsoft also says these coding models are "explicitly not yet tuned for harder problems, like fundamental science research and very long horizon agentic work." <sup>[1]</sup></p>

<p>The same announcement introduced MAI Licensed Weights. A customer can take a frontier MAI model, customize it with its own data, and "run it securely in your own Azure environment." Microsoft's wording: "You control who can access it. Your data and adaptations stay yours." <sup>[1]</sup></p>

<p>Behind the products is a larger model still in progress. On October 15, Microsoft said it had finished pre-training MAI Base 2, with 2.8 trillion total parameters, and that the model was "currently undergoing post-training." Microsoft said owning its pipeline end to end lets it license model weights to trusted partners. <sup>[2]</sup> On November 23, it said MAI Base 2 is being post-trained with its in-house system, "without distillation from third-party models." <sup>[3]</sup></p>

<p>In a Yahoo Finance interview on November 17, Microsoft AI chief executive Mustafa Suleyman said token cost "is the thing that is going through the roof" for customers. He said a renegotiated contract with OpenAI "freed us up to go and pursue the absolute frontier," while OpenAI remains an important partner and Anthropic and Mistral models stay available on Microsoft's platform. He said "a company needs to really own and control the agents they build." Asked whether licensed models must stay in Azure, he answered: "Yeah, not any open-weight models. We have no plan to do open-weight." <sup>[4]</sup></p>

<h2>What the record does not establish</h2>

<p>As of November 26, Microsoft has not released a finished product called "MAI-2." MAI Base 2 is a base model still in post-training. <sup>[2]</sup><sup>[3]</sup></p>

<p>The price and performance comparisons are Microsoft's own, on benchmarks Microsoft chose. They were not independently checked for this brief, and they say nothing about how any model performs on your work.</p>

<p>"Control" in the licensed-weights offer means control inside Microsoft's cloud. It is more control than renting answers from a shared service. It is not independence from the vendor, and the weights are not being released for customers to run elsewhere. <sup>[1]</sup><sup>[4]</sup></p>

<h2>The small-business version of owning the model</h2>

<p>Microsoft, one of the largest companies in the market, concluded that its core capability should not depend on one partner's model. A person or a small business does not need to train a model to apply the same reasoning. What needs owning is the part that outlasts any model:</p>

<ul>
<li>your notes and records of decisions,</li>
<li>your clients' data, stored where you can export it,</li>
<li>your written method: the steps, standards and examples that make your work yours,</li>
<li>your own short test of whether a tool is good enough.</li>
</ul>

<p>If those live only inside one vendor's product, the vendor holds more of your business than you may realize. If they live with you, models become replaceable parts.</p>

<h2>Keep your own evaluation set</h2>

<p>Microsoft's comparisons use Microsoft's chosen tests. Yours should use your own. Keep five to ten real tasks from your work, with examples of a good result. When a new model or a cheaper plan appears, run those tasks before switching. That turns a vendor's headline into a decision you can defend.</p>

<h2>The Beacon lens</h2>

<ol>
<li><strong>Write the method down.</strong> If your process exists only in prompts inside one tool, it is not yet yours.</li>
<li><strong>Check the exit.</strong> Could you move your notes, client data and templates to another tool next month?</li>
<li><strong>Read "control" closely.</strong> Ask where the model runs, who can switch it off, and what leaves with you.</li>
<li><strong>Test on your own work.</strong> Treat vendor benchmarks as a starting point, not a decision.</li>
<li><strong>Price the whole job.</strong> A cheaper model that needs more checking may not be cheaper.</li>
</ol>

<blockquote>Models will keep changing. Own the method they serve.</blockquote>

<h2>Sources</h2>
<ol class="beacon-article-sources">
<li><sup>[1]</sup> <a href="https://microsoft.ai/news/microsoft-ignite-2026/" target="_blank" rel="noreferrer">Microsoft AI — Seven new world-class models at scalable price-performance (Ignite 2026)</a></li>
<li><sup>[2]</sup> <a href="https://microsoft.ai/news/frontier-pre-training-at-microsoft-ai/" target="_blank" rel="noreferrer">Microsoft AI — Frontier Pre-training at Microsoft AI</a></li>
<li><sup>[3]</sup> <a href="https://microsoft.ai/news/rl-infrastructure-at-microsoft-ai/" target="_blank" rel="noreferrer">Microsoft AI — RL infrastructure at Microsoft AI</a></li>
<li><sup>[4]</sup> <a href="https://www.youtube.com/watch?v=cR1yekwhjLY" target="_blank" rel="noreferrer">Yahoo Finance — Interview with Microsoft AI CEO Mustafa Suleyman, November 17, 2026</a></li>
</ol>
<p><em>This is editorial analysis, not legal, technical, procurement, investment, or business advice.</em></p>
    `,
  },
  {
    id: "an-avatar-can-perform-you-still-own-the-words",
    title: "An Avatar Can Perform. You Still Own the Words.",
    excerpt:
      "HeyGen's Avatar 6 counts, points and changes tone with the script. Its headline '84%' figure means something narrower than it sounds, and a more lifelike avatar raises the stakes of disclosure rather than lowering them.",
    category: "Beacon Signal",
    date: "November 27, 2026",
    readTime: "6 min read",
    pillar: "Systems",
    pillarColor: "#3D4F6B",
    featured: true,
    body: `
<p>HeyGen released Avatar 6 on November 17, a model built to make AI video avatars gesture and react in step with what they are saying. It has also been promoted in creator videos sponsored by HeyGen. The launch record is worth reading for what it says, and for how its headline number is defined. <sup>[1]</sup><sup>[2]</sup></p>

<h2>What the record establishes</h2>

<p>HeyGen says Avatar 6 "interprets a user's script and generates corresponding gestures," addressing the repetitive motion of earlier avatars. A user can create an avatar from as little as 30 seconds of video, or connect YouTube, Instagram or TikTok accounts to use existing footage. HeyGen says the model now considers about 30 seconds of context instead of about 3, and produces native 2K video. Existing personal avatars upgrade automatically. <sup>[1]</sup></p>

<p>HeyGen's product page says the avatar now gestures to match the script, "including pointing, counting, and directional motion," and that users can prompt emotion, expressions and gestures for finer control. <sup>[3]</sup></p>

<p>On consent, HeyGen's technical report says that before an avatar made from a person's footage can generate video, that person must record an on-camera consent statement containing a one-time code, and HeyGen checks that the face matches the training footage. <sup>[2]</sup> The press release says realistic videos of real people stay on HeyGen's own platform, "where explicit consent is required." <sup>[1]</sup></p>

<p>HeyGen also cites a survey of more than 1,000 small-business owners among its users: 71.6% said they had recorded a video for their business and then decided not to post it. <sup>[1]</sup></p>

<h2>What "84%" actually measures</h2>

<p>The launch materials say 84% of participants could not tell the avatar from the real person. <sup>[1]</sup> The technical report defines the figure more precisely. Shown the real recording and the avatar side by side, raters picked the avatar as the real one 42.2% of the time, across 270 answers. HeyGen doubles that to 84.4%, because a 50% pick rate would mean raters could not tell at all. <sup>[2]</sup></p>

<p>Read plainly: in HeyGen's own side-by-side test, people still picked the real recording more often, 57.8% to 42.2%. Shown alone, real recordings were judged real 78.9% of the time; Avatar 6 with the person's own voice, 65.1%; Avatar 6 with a HeyGen voice clone, 56.5%. <sup>[2]</sup> That is a real improvement on the earlier model, which HeyGen puts at 44.4% on the same measure. <sup>[3]</sup> It is not the same as "84% of people were fooled."</p>

<h2>What the record does not establish</h2>

<p>The performance figures come from HeyGen or from a ranking HeyGen cites. This brief did not test the model independently. In the interest of disclosure: Beacon is itself testing HeyGen, using Bob Burr's own face and a clone of his voice; this brief does not draw on those tests. A sponsored creator video is a demonstration, not an independent test. HeyGen's claim that results need "no tweaking, no regenerating" is a product claim, not a measured finding. <sup>[3]</sup> The record also does not tell us how audiences feel when they later learn that a video they trusted was an avatar.</p>

<h2>A better avatar raises the stakes of disclosure</h2>

<p>As avatars become harder to spot, the burden shifts to the person whose face is on screen. The viewer can no longer be expected to notice. That is why disclosure matters more as the technology improves, not less.</p>

<p>There is a fair use case. HeyGen's own survey points to many small-business owners who never post the videos they record. <sup>[1]</sup> An avatar can help a shy expert explain a routine process. But it should never pretend to be you showing up in person.</p>

<h2>The Beacon lens</h2>

<ol>
<li><strong>Write or review every word.</strong> If your face says it, you own it.</li>
<li><strong>Label it plainly.</strong> A short line such as "This is an AI avatar of me; I wrote and approved the script."</li>
<li><strong>Choose the right jobs.</strong> Routine explainers and updates, yes. Apologies, condolences, bad news or anything where your presence is the point, no.</li>
<li><strong>Run one honest test first.</strong> Use your own script with a count, a point and a change of tone, and compare it with real footage before paying for a plan.</li>
<li><strong>Keep your source footage and consent under your control,</strong> and know how to delete the avatar if you change your mind.</li>
</ol>

<blockquote>An avatar can perform for you. It cannot be responsible for you.</blockquote>

<h2>Sources</h2>
<ol class="beacon-article-sources">
<li><sup>[1]</sup> <a href="https://www.prnewswire.com/news-releases/heygen-introduces-avatar-6-an-audio-driven-context-aware-ai-model-that-alleviates-repetitive-or-unnatural-motion-in-ai-generated-video-302942527.html" target="_blank" rel="noreferrer">HeyGen via PR Newswire — HeyGen Introduces Avatar 6</a></li>
<li><sup>[2]</sup> <a href="https://www.heygen.com/research/avatar-6-model" target="_blank" rel="noreferrer">HeyGen Research — Avatar 6 Technical Report</a></li>
<li><sup>[3]</sup> <a href="https://www.heygen.com/models/heygen-avatar-6" target="_blank" rel="noreferrer">HeyGen — Avatar 6 product page</a></li>
</ol>
<p><em>This is editorial analysis, not legal, marketing-compliance, or business advice.</em></p>
    `,
  },
  {
    id: "the-proof-was-checked-before-it-was-understood",
    title: "The Proof Was Checked Before It Was Understood",
    excerpt:
      "A mathematician working with Claude released a machine-checked proof of the Riemann Hypothesis, and Lean's maintainers say they have full confidence in it. What the record establishes, what it does not yet, and why verified is not the same as understood.",
    category: "Beacon Signal",
    date: "November 27, 2026",
    readTime: "7 min read",
    pillar: "Systems",
    pillarColor: "#3D4F6B",
    featured: true,
    body: `
<p>On November 20, mathematician Levent Alpöge announced that, working with Anthropic's Claude, he believes he has found a proof of the Riemann Hypothesis, one of the most famous open problems in mathematics. Within a day, the teams behind the Lean proof checker said they had "full confidence" that the formal proof is correct. <sup>[1]</sup><sup>[2]</sup> Something unusual happened in that order: the proof was checked by machines before people could fully explain it.</p>

<h2>What the record establishes</h2>

<p>Alpöge's four-page announcement says: "I believe I have, working with Claude, discovered a proof of the Riemann Hypothesis," and that the method extends to the Generalized Riemann Hypothesis. He writes that "Claude and I have also formalized the arguments without assumptions," and that he chose to "only present Lean," the formal proof language. He is candid about what is missing: he is "presenting the world with a complete argument before having mastered a massive neighbourhood around its mathematics," the argument "is incredibly long at the moment," and he intends to understand it and "write it properly." <sup>[1]</sup></p>

<p>On November 21, the Lean FRO and the Mathlib Initiative issued a joint statement: "We have full confidence that Alpöge's proof of the Riemann Hypothesis is correct." The proof is a Lean library of about 17 million lines. They checked four things: that the statement is Mathlib's own vetted definition of the Riemann Hypothesis; that the library compiles, reproduced by dozens of people; that two independent tools confirmed the theorem proved is exactly that statement; and that several independent proof checkers accepted the exported proof. They look forward to work "that will help explain the new ideas in this proof." <sup>[2]</sup></p>

<p>Michael Rubinstein of the University of Waterloo ran his own checks: all 175,187 modules compiled, the theorems rely only on Lean's three standard axioms, and a second, independently written checker accepted the 1,484,729 declarations they depend on. On November 25, Luke Sernau, with colleagues at Anthropic and Claude, posted a much shorter Lean version of the same theorems, about 76,000 lines in its compact form, and Rubinstein's checks of it passed on November 26. <sup>[3]</sup></p>

<p>This did not come from nowhere. In August, Anthropic reported that an unreleased research version of Claude had raised the proven share of zeta zeros on the critical line from 41.6% to 67.2%, and said then that it did not expect those techniques to lead to a proof of the full hypothesis. <sup>[6]</sup></p>

<h2>What the record does not establish</h2>

<p>The Clay Mathematics Institute, which offers a $1 million prize for the problem, lists the Riemann Hypothesis under "Active problems," not "Solved problems," as of November 26. <sup>[4]</sup> Clay's rules require publication in a qualifying outlet, at least two years after publication, and general acceptance in the mathematics community before it will even consider a solution. <sup>[5]</sup> No prize has been awarded.</p>

<p>A finished human-readable proof does not yet exist. Rubinstein's 265-page working guide to the argument, written with AI assistance, explains the structure for the zeta function. It reduces the main inequality to thirteen numbered hypotheses that the guide itself does not yet prove; those steps currently rest on the Lean development. The guide calls itself "a work in progress." <sup>[3]</sup></p>

<p>The record also does not settle how credit should be shared between the mathematician and the AI, or what was truly new in the ideas. And this brief does not address claims about prize money, encryption or "superintelligence," because the records reviewed here do not support them.</p>

<h2>Verified is not the same as understood</h2>

<p>The checkers establish something strong: that the formal proof is valid for the stated theorem. They do not supply understanding. Mathematicians still have to explain why the argument works before it can be taught, simplified or built on. Alpöge says so himself. <sup>[1]</sup></p>

<p>The working loop is worth noticing. A person chose the problem and the standard. The AI proposed and searched. A strict, independent checker accepted only what was valid. Then people went back to the hard human work of explanation.</p>

<h2>Most of us do not have a proof checker</h2>

<p>Ordinary work has no Lean kernel. When an AI drafts a contract summary, a budget or a client email, the checker is you. That means the standard has to be set before the AI starts, and the check has to be separate from the thing that made the draft. And if you cannot explain what the AI produced, you are not yet in charge of it, however confident it sounds.</p>

<h2>The Beacon lens</h2>

<ol>
<li><strong>Set the standard first.</strong> Decide what "correct" means before the AI drafts anything.</li>
<li><strong>Use an independent check.</strong> A second source, a second person, or a test the AI did not write.</li>
<li><strong>Explain it back.</strong> If you cannot explain the result in your own words, do not act on it yet.</li>
<li><strong>Keep the order honest.</strong> Checked, understood and accepted are three different stages.</li>
<li><strong>Record who decided.</strong> Note what the AI proposed and what you approved.</li>
</ol>

<blockquote>Verified is not the same as understood, and understood is not the same as accepted.</blockquote>

<h2>Sources</h2>
<ol class="beacon-article-sources">
<li><sup>[1]</sup> <a href="https://alpo.ge/remark.pdf" target="_blank" rel="noreferrer">Levent Alpöge — announcement (PDF), November 20, 2026</a></li>
<li><sup>[2]</sup> <a href="https://leanprover-community.github.io/blog/posts/riemann-hypothesis/" target="_blank" rel="noreferrer">Lean FRO and Mathlib Initiative — Lean verification of the Riemann Hypothesis</a></li>
<li><sup>[3]</sup> <a href="https://math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/" target="_blank" rel="noreferrer">Michael Rubinstein, University of Waterloo — Alpöge/Claude proof of the Generalized Riemann Hypothesis</a></li>
<li><sup>[4]</sup> <a href="https://www.claymath.org/millennium-problems/" target="_blank" rel="noreferrer">Clay Mathematics Institute — The Millennium Prize Problems</a></li>
<li><sup>[5]</sup> <a href="https://www.claymath.org/millennium-problems/rules/" target="_blank" rel="noreferrer">Clay Mathematics Institute — Rules for the Millennium Prize Problems</a></li>
<li><sup>[6]</sup> <a href="https://www.anthropic.com/research/riemann-zeta" target="_blank" rel="noreferrer">Anthropic — Claude has improved on a longstanding lower bound for the fraction of zeros of the Riemann zeta function</a></li>
</ol>
<p><em>This is editorial analysis, not mathematical, academic, investment, or business advice.</em></p>
    `,
  },
] as const;

export const SIGNAL_DRAFTS_2026_11_26_SUMMARIES = SIGNAL_DRAFTS_2026_11_26_CONTENT.map(
  ({ body: _body, ...summary }) => summary,
);
