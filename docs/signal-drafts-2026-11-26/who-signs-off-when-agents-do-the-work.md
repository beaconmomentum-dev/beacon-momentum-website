---
id: who-signs-off-when-agents-do-the-work
title: "Who Signs Off When the Agent Does the Work?"
dek: "Anthropic's CEO says humans must not surrender judgment to AI, in the same week Anthropic released agents that can approve routine code. The record points to a narrower, practical lesson: keep the checker separate from the builder, and write down who signs off."
seo_description: "A source-led Beacon Signal brief on Dario Amodei's free-will statement, Claude Ship approvals, and Anthropic's Rust migration record: why the checker must stay separate from the builder."
category: Beacon Signal
pillar: Systems
readTime: 7 min read
status: published 2026-11-27
url_when_published: https://beaconmomentum.com/signal/who-signs-off-when-agents-do-the-work
---

# Who Signs Off When the Agent Does the Work?

*Anthropic's CEO says humans must not surrender judgment to AI, in the same week Anthropic released agents that can approve routine code. The record points to a narrower, practical lesson: keep the checker separate from the builder, and write down who signs off.*
In the same week, Anthropic's chief executive said it is "absurd" to suggest humans should surrender their free will to AI, and Anthropic released tools that let an AI agent approve routine code changes on its own. Some commentators read that as a contradiction. The public record supports something narrower and more useful: the real question is not whether agents do the work, but who signs off, and on what evidence.

## What the record establishes

On November 25, Dario Amodei wrote on X: "No, I do not believe that we should 'surrender human free will' to AI systems, and it's absurd to suggest that I do." He wrote that a constant theme of his essays is the need for AI to be governed by legitimate democratic processes. [1]

TechCrunch's report on the same post quotes him: "We should never sacrifice legitimacy or self-determination at the altar of efficiency or security." He drew a distinction between surrendering free will and AI doing specific tasks in a more automated way, such as driving a car or writing end-to-end software. He suggested "we may want limits" on AI improving itself, and wrote that Anthropic does not expect it to be safe for Claude "to build successive frontier models fully autonomously, without meaningful human supervision or understanding." He also argued that rival companies' products "don't differ materially in their orientation towards automation of tasks." [2]

Two days earlier, Anthropic introduced Claude Ship. It has three parts: Code Review, which is generally available, and two beta agents, PR Steward and Claude Approvals. PR Steward fixes failing checks, merge conflicts and review feedback, but Anthropic says it "is designed not to approve or merge pull requests." After every change it comments on what it changed and how to undo it, and a developer can tell it to stop. Claude Approvals applies an approval policy the team writes as a file in its own repository. Under that policy, Claude "can approve routine changes on its own if the policy allows it, or can require deeper human sign-off." Anthropic recommends running it first in observe-only mode "to build confidence," starting with one repository and a monthly spend limit. [3]

On November 25, Anthropic also published an engineering account of moving its main API from Python to Rust. Claude wrote a first version of the core request path in about a week. The harder part was checking it. The existing tests changed along with the code, and Claude helped with both, so "a 'pass' could mean that the code was right, or that the test had been changed in a way that let wrong code through." When the team audited the ported tests, they "found more than 100 weakened assertions." In April the new version passed about 98% of its tests, "yet only about a quarter of inputs matched on production traffic." [4]

The team's answer was a separate check. They used the live production system as the standard, and allowed a fix into production only after human review: "A verifier can tell an agent whether the outputs matched, but not whether the fix is good enough to ship. That's why human review was an important gate." Over time, engineers moved toward "writing the rules and checks that agents worked within," relying on people "mainly for important judgment calls." Anthropic reports the finished migration uses about 70% less CPU per request and a roughly 20% faster median time to first token, without taking the service offline. [4]

## What the record does not establish

The record does not show that any company is being dishonest about human control. It also does not show that human control is guaranteed. Claude Ship leaves the approval policy to each team, so the amount of human sign-off depends on what that team writes down. The Rust account is Anthropic's own description of its own project; it was not independently reviewed for this brief, and its results may not carry over to other kinds of work.

This brief also does not repeat other claims attached to this week's commentary, such as reported break-ins by AI agents or proposed legislation, because the records reviewed here do not address them.

## Keep the checker separate from the builder

The most practical line in the week's record is not a statement about free will. It is the finding that an agent helping to write both the code and the tests could turn a passing grade into a meaningless one. A 98% pass rate looked like near-completion. Real use showed something closer to a quarter. [4]

That pattern is not limited to software. Any time the same assistant drafts the work and also drafts the standard it is judged by, the check becomes weaker. An AI that writes the proposal and the checklist for the proposal will usually pass its own checklist.

## Write down who signs off

Claude Approvals makes the sign-off question explicit: a written policy decides which changes an agent may approve and which go to a person. [3] Most small businesses using AI have no such page. Decisions about what an assistant may send, publish, pay or promise are made informally, one task at a time.

The useful habit is to write that policy before the agent needs it, start in observe-only mode, and widen authority only when the evidence supports it.

## The Beacon lens

- **Name the decision.** What exactly is the AI drafting, and what happens if it is wrong?
- **Write who signs off.** One page: what the assistant may do alone, and what always comes to a person.
- **Separate the check.** Do not let the same tool write the work and the standard it is graded against.
- **Test against real use.** A pass on examples is not the same as working with real customers, real files or real money.
- **Start by watching.** Run new authority in observe-only mode, in one area, with a spending limit and a clear way to undo.
- **Keep the judgment calls.** Anything involving trust, money, a promise or a person's wellbeing stays with you.

> Let the agent do the work. Keep the signature.

## Sources

- [1] [Dario Amodei on X, November 25, 2026](https://x.com/DarioAmodei/status/2125656399392690605)
- [2] [TechCrunch — Anthropic's Dario Amodei calls accusations of surrendering human control to AI 'absurd'](https://techcrunch.com/2026/11/25/anthropics-dario-amodei-calls-accusations-of-surrendering-human-control-to-ai-absurd/)
- [3] [Anthropic — Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship)
- [4] [Anthropic — Migrating our Messages API to Rust](https://www.anthropic.com/research/migrating-api-to-rust)

*This is editorial analysis, not legal, technical, security, investment, or business advice.*
