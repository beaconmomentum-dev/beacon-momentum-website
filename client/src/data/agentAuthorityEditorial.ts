export const AGENT_AUTHORITY_ARTICLE_CONTENT = [
  {
    id: "can-this-agent-do-it-or-may-it-do-it",
    title: "Can This Agent Do It—or May It Do It?",
    category: "Beacon Signal",
    date: "October 8, 2026",
    readTime: "7 min read",
    pillar: "Systems",
    pillarColor: "#3D5A80",
    featured: true,
    audioSrc: "/audio/agent-authority/can-this-agent-do-it-or-may-it-do-it.mp3",
    transcriptSrc:
      "/audio/agent-authority/transcripts/can-this-agent-do-it-or-may-it-do-it.txt",
    captionSrc:
      "/audio/agent-authority/captions/can-this-agent-do-it-or-may-it-do-it.vtt",
    excerpt:
      "An AI agent may be able to read, draft, or act across connected systems. Before it does, separate capability from permission, review, and responsibility.",
    body: `
      <p class="beacon-article-lede">A new generation of AI agents can inspect connected information, prepare documents, update a plan, draft a message, and keep working after you close the tab. That is a real change in what software can attempt. But it creates a question more important than the demo: <strong>Can this agent do the work—or may it do the work?</strong></p>

      <p>Those are not the same thing. An agent may be technically capable of reading an inbox, preparing a proposal, updating a record, or drafting a post. That does not mean it has permission to see the information, authority to make the decision, or clearance to take the action.</p>

      <p>The moment an agent is connected to real work, it can touch more than a task. It can touch trust, customer relationships, private information, money, commitments, and the record of what happened. The purpose of a control is not to make us afraid of new tools. It is to help us see where responsibility still belongs.</p>

      <h2>Capability is not authority</h2>

      <p>Vendor announcements can establish what a product is designed to do. They do not establish that the product is appropriate for every task, every organization, or every set of information.</p>

      <p>OpenAI’s current Dots documentation describes agents with cloud computers that can work with connected applications. It says background research uses restricted read-only tools, while other actions are governed by permissions, rules, review, and approval paths.<sup><a href="#source-1">1</a></sup></p>

      <p>Meta’s Muse announcement describes an agent running in a dedicated virtual machine. Meta says people choose which applications it can access, can set an access level, and are asked before certain sensitive actions such as sending an email or making a purchase.<sup><a href="#source-2">2</a></sup></p>

      <p>Salesforce describes Salesforce in Claude as operating through the permissions and business rules an organization already uses, with organization-controlled checks for write actions and external communications.<sup><a href="#source-3">3</a></sup></p>

      <p>Those are meaningful product conditions. They are not proof that an agent will be correct, that a process will be safe, or that a particular organization has made a wise connection. A product can be able to do something and still need a human decision before it is allowed to do it.</p>

      <h2>The four questions before a connection</h2>

      <h3>1. What is the bounded job?</h3>

      <p>“Help with operations” is not a job. “Manage the business” is not a job. Both are invitations to ambiguity. A bounded job describes a clear input, a visible output, and a stopping point.</p>

      <div class="beacon-evidence-grid" role="group" aria-label="Examples of broad and bounded agent jobs">
        <article><h4>Too broad</h4><p>“Handle our customer email.”</p><h4>Bounded instead</h4><p>Prepare a draft summary of three approved public support themes. Do not send anything.</p></article>
        <article><h4>Too broad</h4><p>“Run our content.”</p><h4>Bounded instead</h4><p>Turn an approved transcript into a draft outline and three draft post options. Do not publish or schedule.</p></article>
        <article><h4>Too broad</h4><p>“Fix our CRM.”</p><h4>Bounded instead</h4><p>Identify duplicate records in a non-production copy and flag them for a human reviewer. Do not change records.</p></article>
      </div>

      <p>The smaller version may feel less dramatic. That is the point. A bounded job allows someone to inspect what happened, find errors, and decide whether the next step is appropriate.</p>

      <h3>2. What information is necessary?</h3>

      <p>A connection is not a blank check. If an agent is preparing a draft from an approved public transcript, it does not need access to a full mailbox, a customer database, payment records, or private team conversations. If a task can be tested with synthetic, public, or expressly authorized non-sensitive information, start there.</p>

      <p>The National Institute of Standards and Technology describes its AI Risk Management Framework as voluntary guidance for incorporating trustworthiness considerations into the design, use, and evaluation of AI systems.<sup><a href="#source-4">4</a></sup> In plain language: name the purpose, understand the risk, and do not hand a system more access than the work requires.</p>

      <ul>
        <li>What exact information does this task require?</li>
        <li>What information is useful but not necessary?</li>
        <li>Who has authority to grant access?</li>
        <li>What is retained, remembered, logged, or sent to another service?</li>
        <li>What happens to material already seen if the connection is later removed?</li>
      </ul>

      <p>The answer should be written down before the connection, not reconstructed after a problem.</p>

      <h3>3. Which decisions stay human-owned?</h3>

      <p>A human approval step is valuable only when the person can meaningfully review the work, say no, and understand the consequence of saying yes. Decisions that create a commitment, financial consequence, relationship consequence, or hard-to-reverse change should remain human-owned.</p>

      <ul>
        <li>Sending an external message;</li>
        <li>Accepting or changing a contract, price, or promise;</li>
        <li>Spending money or authorizing payment;</li>
        <li>Changing permissions, passwords, or account access;</li>
        <li>Changing customer records or contact preferences; and</li>
        <li>Publishing, scheduling, or promoting public content.</li>
      </ul>

      <p><strong>A useful agent reduces the searching and assembling a person must do. It does not remove the responsibility to decide.</strong></p>

      <h3>4. What is the stop path?</h3>

      <p>Every test needs a way to pause, review, and reverse course. Before an agent works in a live environment, identify the person who owns the task, the person who can pause or disconnect it, the activity record that will be reviewed, the actions requiring approval, the action that cannot be delegated, and the condition that ends the test.</p>

      <p>If no one can explain how the work can be paused, checked, or corrected, the system is not ready for a larger role.</p>

      <h2>Approval is not the whole control system</h2>

      <p>It is tempting to believe an approval button solves the problem. It does not solve every problem. An approval step may come too late if an agent has already gathered unnecessary information. It may be too shallow if the reviewer cannot see the sources used. It may be ineffective if the person approving is rushed, lacks context, or has no practical ability to reject the work.</p>

      <div class="beacon-evidence-grid" role="group" aria-label="Agent control questions">
        <article><h4>Purpose</h4><p>What is the agent allowed to accomplish?</p><h4>Scope</h4><p>Which systems and information may it use?</p></article>
        <article><h4>Authority</h4><p>Which action can it take alone, and which must return to a named person?</p><h4>Evidence</h4><p>Can a reviewer see what shaped the output?</p></article>
        <article><h4>Record and stop path</h4><p>Can the team reconstruct what happened, pause the work, correct it, or end it?</p></article>
      </div>

      <p>This is not bureaucracy for its own sake. It is how a team preserves responsibility while using a more capable tool.</p>

      <h2>A small test is not a weak test</h2>

      <ol>
        <li><strong>Choose one non-consequential job.</strong> Start with a draft, comparison, or research note—not an external action.</li>
        <li><strong>Set the baseline.</strong> Describe today’s process and the quality criteria, reviewer effort, error types, and exceptions that matter.</li>
        <li><strong>Use limited information.</strong> Use synthetic, public, or expressly authorized non-sensitive material whenever possible.</li>
        <li><strong>Set the rules in writing.</strong> State what the agent may read, what it may draft, what it must not change, and what returns for review.</li>
        <li><strong>Keep a record.</strong> Retain the source materials, outputs, review comments, and changes made because of the test.</li>
        <li><strong>Decide from evidence.</strong> Keep the scope, revise it, pause it, or stop it. One good result is not a general claim about every task.</li>
      </ol>

      <p>This kind of pilot does not promise a saving, a staffing outcome, or a performance result. It gives a team something more durable: evidence about one clearly defined piece of work.</p>

      <h2>Five sentences that should make you pause</h2>

      <ol>
        <li><strong>“Just connect everything.”</strong> More access is not the same as a better test.</li>
        <li><strong>“It has approval, so it is safe.”</strong> Ask what it can read before approval, what is logged, and whether the reviewer has real authority.</li>
        <li><strong>“The demo did it by itself.”</strong> A vendor scenario shows a possibility. It does not establish typical behavior in your environment.</li>
        <li><strong>“It is only a draft.”</strong> Drafts can still expose information, shape a decision, or be mistaken for reviewed work.</li>
        <li><strong>“We can fix it later.”</strong> An external message, changed permission, public post, payment, or damaged relationship may not be easily undone.</li>
      </ol>

      <h2>The better question for builders</h2>

      <p>The point is not to make every agent wait for an unnecessary click. The point is to place human judgment where it matters most. A carefully designed system can let an agent prepare a useful first pass while keeping authority with the people who bear the consequences. It can use a narrow connection instead of a broad one. It can distinguish an approved draft from a public statement.</p>

      <p>Before an agent enters a workflow, write one sentence that answers each question: What may it do? What may it see? What must it ask before doing? Who decides when it stops?</p>

      <p class="beacon-article-closing">If those answers are not clear, the next move is not a bigger integration. It is a smaller, better-defined test. The lighthouse is lit. Direction comes before delegation.</p>

      <h2>Sources and boundaries</h2>

      <p>This article evaluates governance questions, not the quality, availability, suitability, security, privacy, or performance of a named product. Vendor documentation is cited to describe vendor-stated controls and conditions. It is not independent proof of reliability, safety, accuracy, cost, or business results. Product capabilities, permissions, plan availability, retention settings, model behavior, and policies can change; verify current first-party evidence before relying on them. This article is educational and is not legal, privacy, cybersecurity, financial, regulatory, or compliance advice.</p>

      <ol class="beacon-source-list">
        <li id="source-1"><a href="https://openai.com/index/introducing-dots/" target="_blank" rel="noreferrer">OpenAI, “Introducing dots”</a> (product documentation, September 29, 2026; accessed October 7, 2026).</li>
        <li id="source-2"><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" target="_blank" rel="noreferrer">Meta, “Introducing Muse: The World’s First Personal AI Agent Built for Everyone”</a> (product announcement, September 2026; accessed October 7, 2026).</li>
        <li id="source-3"><a href="https://www.salesforce.com/claudeforce/" target="_blank" rel="noreferrer">Salesforce, “Claudeforce: Salesforce and Claude Partnership”</a> (product/partner documentation; accessed October 7, 2026).</li>
        <li id="source-4"><a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noreferrer">National Institute of Standards and Technology, “AI Risk Management Framework”</a> (government guidance; accessed October 7, 2026).</li>
      </ol>
    `,
  },
] as const;

export const AGENT_AUTHORITY_ARTICLE_SUMMARIES =
  AGENT_AUTHORITY_ARTICLE_CONTENT.map(({ body, ...summary }) => ({
    ...summary,
    featured: "featured" in summary ? summary.featured === true : false,
  }));
