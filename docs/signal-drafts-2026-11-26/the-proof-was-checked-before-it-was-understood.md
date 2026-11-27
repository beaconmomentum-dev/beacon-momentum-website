---
id: the-proof-was-checked-before-it-was-understood
title: "The Proof Was Checked Before It Was Understood"
dek: "A mathematician working with Claude released a machine-checked proof of the Riemann Hypothesis, and Lean's maintainers say they have full confidence in it. What the record establishes, what it does not yet, and why verified is not the same as understood."
seo_description: "A source-led Beacon Signal brief on the Alpöge–Claude Riemann Hypothesis proof: what the Lean verification establishes, Clay's status and rules, and the lesson for anyone checking AI work."
category: Beacon Signal
pillar: Systems
readTime: 7 min read
status: DRAFT — not published
url_when_published: https://beaconmomentum.com/signal/the-proof-was-checked-before-it-was-understood
---

# The Proof Was Checked Before It Was Understood

*A mathematician working with Claude released a machine-checked proof of the Riemann Hypothesis, and Lean's maintainers say they have full confidence in it. What the record establishes, what it does not yet, and why verified is not the same as understood.*
On November 20, mathematician Levent Alpöge announced that, working with Anthropic's Claude, he believes he has found a proof of the Riemann Hypothesis, one of the most famous open problems in mathematics. Within a day, the teams behind the Lean proof checker said they had "full confidence" that the formal proof is correct. [1][2] Something unusual happened in that order: the proof was checked by machines before people could fully explain it.

## What the record establishes

Alpöge's four-page announcement says: "I believe I have, working with Claude, discovered a proof of the Riemann Hypothesis," and that the method extends to the Generalized Riemann Hypothesis. He writes that "Claude and I have also formalized the arguments without assumptions," and that he chose to "only present Lean," the formal proof language. He is candid about what is missing: he is "presenting the world with a complete argument before having mastered a massive neighbourhood around its mathematics," the argument "is incredibly long at the moment," and he intends to understand it and "write it properly." [1]

On November 21, the Lean FRO and the Mathlib Initiative issued a joint statement: "We have full confidence that Alpöge's proof of the Riemann Hypothesis is correct." The proof is a Lean library of about 17 million lines. They checked four things: that the statement is Mathlib's own vetted definition of the Riemann Hypothesis; that the library compiles, reproduced by dozens of people; that two independent tools confirmed the theorem proved is exactly that statement; and that several independent proof checkers accepted the exported proof. They look forward to work "that will help explain the new ideas in this proof." [2]

Michael Rubinstein of the University of Waterloo ran his own checks: all 175,187 modules compiled, the theorems rely only on Lean's three standard axioms, and a second, independently written checker accepted the 1,484,729 declarations they depend on. On November 25, Luke Sernau, with colleagues at Anthropic and Claude, posted a much shorter Lean version of the same theorems, about 76,000 lines in its compact form, and Rubinstein's checks of it passed on November 26. [3]

This did not come from nowhere. In August, Anthropic reported that an unreleased research version of Claude had raised the proven share of zeta zeros on the critical line from 41.6% to 67.2%, and said then that it did not expect those techniques to lead to a proof of the full hypothesis. [6]

## What the record does not establish

The Clay Mathematics Institute, which offers a $1 million prize for the problem, lists the Riemann Hypothesis under "Active problems," not "Solved problems," as of November 26. [4] Clay's rules require publication in a qualifying outlet, at least two years after publication, and general acceptance in the mathematics community before it will even consider a solution. [5] No prize has been awarded.

A finished human-readable proof does not yet exist. Rubinstein's 265-page working guide to the argument, written with AI assistance, explains the structure for the zeta function. It reduces the main inequality to thirteen numbered hypotheses that the guide itself does not yet prove; those steps currently rest on the Lean development. The guide calls itself "a work in progress." [3]

The record also does not settle how credit should be shared between the mathematician and the AI, or what was truly new in the ideas. And this brief does not address claims about prize money, encryption or "superintelligence," because the records reviewed here do not support them.

## Verified is not the same as understood

The checkers establish something strong: that the formal proof is valid for the stated theorem. They do not supply understanding. Mathematicians still have to explain why the argument works before it can be taught, simplified or built on. Alpöge says so himself. [1]

The working loop is worth noticing. A person chose the problem and the standard. The AI proposed and searched. A strict, independent checker accepted only what was valid. Then people went back to the hard human work of explanation.

## Most of us do not have a proof checker

Ordinary work has no Lean kernel. When an AI drafts a contract summary, a budget or a client email, the checker is you. That means the standard has to be set before the AI starts, and the check has to be separate from the thing that made the draft. And if you cannot explain what the AI produced, you are not yet in charge of it, however confident it sounds.

## The Beacon lens

- **Set the standard first.** Decide what "correct" means before the AI drafts anything.
- **Use an independent check.** A second source, a second person, or a test the AI did not write.
- **Explain it back.** If you cannot explain the result in your own words, do not act on it yet.
- **Keep the order honest.** Checked, understood and accepted are three different stages.
- **Record who decided.** Note what the AI proposed and what you approved.

> Verified is not the same as understood, and understood is not the same as accepted.

## Sources

- [1] [Levent Alpöge — announcement (PDF), November 20, 2026](https://alpo.ge/remark.pdf)
- [2] [Lean FRO and Mathlib Initiative — Lean verification of the Riemann Hypothesis](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/)
- [3] [Michael Rubinstein, University of Waterloo — Alpöge/Claude proof of the Generalized Riemann Hypothesis](https://math.uwaterloo.ca/~mrubinst/alpoge_claude_grh/)
- [4] [Clay Mathematics Institute — The Millennium Prize Problems](https://www.claymath.org/millennium-problems/)
- [5] [Clay Mathematics Institute — Rules for the Millennium Prize Problems](https://www.claymath.org/millennium-problems/rules/)
- [6] [Anthropic — Claude has improved on a longstanding lower bound for the fraction of zeros of the Riemann zeta function](https://www.anthropic.com/research/riemann-zeta)

*This is editorial analysis, not mathematical, academic, investment, or business advice.*
