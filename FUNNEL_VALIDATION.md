# Funnel Validation Record

**Scope:** Beacon Momentum’s free editorial, free email, paid briefing, and annual membership paths.

## Confirmed local paths

| Visitor intent | Destination | Confirmed role |
|---|---|---|
| Read public ideas | `/blog` | **The Signal** is the public editorial library. |
| Receive a weekly digest | Homepage or Signal **Beacon Brief** form | The **free weekly email** captures an email through GoHighLevel and is not a paid enrollment. |
| Get more depth without joining a community | `/watch-brief-premium` | **Watch Brief Premium** is a $27/month operating dossier. Its form explicitly requests enrollment details; it is not presented as checkout. |
| Join the curriculum and community | `/the-watch#join` | **The Watch** is one $297/year annual membership, initiated through an enrollment request and onboarding handoff. |

## Verification notes

The local production build completed successfully on July 24, 2026. A private local-model review using `llama3.1:8b` identified language that could imply a direct checkout or obscure the $27 offer name. The affected calls to action were tightened to name the actual destination, and The Watch progression stages were confirmed as earned stages rather than separate purchasable plans.

The repository-wide test suite still contains existing environment-dependent server failures outside this funnel scope. The frontend production bundle completed successfully with non-secret local validation placeholders.

Browser validation of the local preview confirmed that `/pricing` presents the sequence in plain language: free Signal and Beacon Brief first, Watch Brief Premium at $27/month for the middle path, and one $297/year Watch membership entered through a request for enrollment details. The page visibly states that progression is earned, not purchased.

Browser validation also confirmed that `/watch-brief-premium` plainly states both the $27/month price and that its form requests release and secure enrollment details rather than processing checkout. The `/the-watch` page consistently presents one $297/year annual membership, identifies Sentinel, Navigator, and Quartermaster as earned stages, and explains that the enrollment form leads to onboarding and cohort-placement information.

After correcting the remaining intake mismatch, browser validation confirmed that `/the-watch/intake` is now a six-question enrollment request, not a multi-tier purchase selector. It says explicitly that it is neither checkout nor membership activation. The revised `/the-watch` request form now calls for a short enrollment request before payment, accurately identifies the $297/year annual commitment, and calls the visible stages earned membership stages rather than separately purchasable tiers.

## Live production verification — July 24, 2026

The DigitalOcean origin at `159.203.81.39` was verified at Git revision `5d3860a`; PM2 process `beacon-momentum-www` was online, its root response was HTTP 200, and the deployed JavaScript bundle contained the new `watch-brief-premium` route. Browser checks of the public site confirmed:

- [`https://beaconmomentum.com/watch-brief-premium`](https://beaconmomentum.com/watch-brief-premium) presents **Watch Brief Premium · $27/month**, distinguishes the free Beacon Brief and annual Watch membership, and says its request form is not checkout.
- [`https://beaconmomentum.com/the-watch`](https://beaconmomentum.com/the-watch) presents one **$297/year** annual membership, three earned progression stages, and a request-first handoff that does not imply payment or immediate activation.
