# Work That Fits Advertising and Social Recovery Package

**Status:** Draft-only. Prepared 2026-08-27. This package may be staged in platform draft mode after account recovery, but it must not be activated, published, boosted, or used to incur advertising spend without Bob’s explicit final approval.

## Purpose and boundary

The campaign’s only public destination is:

> `https://beaconmomentum.com/work-that-fits`

Its only primary action is a first-party, explicit-consent request for the free **One-Task Experiment Card**. The page immediately exposes an owned PDF download after a successful server-owned capture request. It does not promise employment, income, productivity, health, medical, accessibility, legal, financial, privacy, security, or job-security outcomes. It does not sell or promise Bob’s personal time.

## Release condition

Do not activate paid or organic traffic until all applicable rows below are verified.

| Gate | Current state | Required release evidence |
|---|---|---|
| Owned landing page code | Locally built and tested | GitHub commit merged/pushed, existing CI/CD deployment completed, public route returns 200 |
| Card PDF | Produced and locally verified | Public `/downloads/one-task-experiment-card.pdf` returns 200 after deployment |
| First-party form | Locally simulated against a successful relay response | A controlled real request succeeds through the production relay and delivers the accessible card link |
| Email nurture | Copy is versioned; workflow has not been verified | HighLevel workflow is visible, tagged to `BM_Work_That_Fits`, activated only after copy/link/unsubscribe review, then tested with a controlled consented address |
| Facebook publishing | Expired connection observed | Account owner completes Facebook re-integration and confirms page permissions; future post status rechecked |
| Advertising account | No eligible current delivery observed | Payment error cleared, any required verification completed, account and ads approved/eligible |
| Measurement | No Meta Pixel located in the site source | Either document a consent-compatible measurement implementation or use the limited first-party aggregate measure plan below |
| Approval | Not requested | Bob explicitly approves public publication and separate advertising activation/spend |

## Approved asset set

All assets are original, text-free editorial still-life images. Platform-native primary text and headline fields contain the copy; the image must not carry unverified promotional text.

| Placement | Source asset | Intended use |
|---|---|---|
| Feed portrait, 4:5 | `client/public/images/work-that-fits/work-that-fits-one-task-ad-4x5.jpg` | Meta feed placement and organic portrait post |
| Feed square, 1:1 | `client/public/images/work-that-fits/work-that-fits-one-task-ad-1x1.jpg` | Square feed placement and LinkedIn draft post |
| Story/Reel, 9:16 | `client/public/images/work-that-fits/work-that-fits-one-task-ad-9x16.jpg` | Meta Stories and Reels only, if the account/review permits |
| Link-preview, 16:9 | `client/public/images/work-that-fits/work-that-fits-social-preview-16x9.jpg` | Open Graph preview and landscape placement |

## Draft campaign structure

Use one campaign only for the first release. Do not use the legacy Hollow Threads campaign or any Beacon account marked disabled/with issues. Do not enable automatic targeting expansion, automated copy variation, automatic creative, or an unreviewed audience import for this campaign.

| Field | Draft value |
|---|---|
| Campaign name | `BM | Work That Fits | Card | Draft 01` |
| Destination | `https://beaconmomentum.com/work-that-fits` |
| Objective | Website visits to a first-party educational resource; optimize only after the consented form and measurement method are verified |
| Audience principle | Broad adult professional-learning/relevant work-skills audience approved in the account; exclude customer-list uploads and sensitive-attribute targeting |
| Geography/language | Choose only after account-owner review; do not infer or target a disability, health status, job insecurity, or protected characteristic |
| Placements | Start with approved feed placements. Add Story/Reel only after reviewing the vertical asset and live placement preview. |
| Budget and duration | Not set. They require Bob’s explicit spend authorization immediately before activation. |
| Exclusions | No retargeting, lookalikes, customer-list uploads, partner-list uploads, scraped audiences, or sensitive-interest targeting in the first run |

## Primary copy variants

These are mutually exclusive draft variants. Start with one and keep the visual/destination constant so the early learning signal is interpretable. Do not add claims, urgency, personal-attribute framing, or health/employment guarantees.

### Variant A — Start smaller

**Primary text:**

> AI at work does not have to start with a new system or a high-pressure plan. Choose one repeated task, set a boundary, and keep the decision human. Beacon Momentum’s free One-Task Experiment Card gives you a calm seven-day place to begin.

**Headline:**

> One task. One boundary. One honest review.

**Description:**

> Free printable educational resource.

**Call to action:** Learn more

### Variant B — Boundary first

**Primary text:**

> Before a tool helps with a work task, decide three things: the purpose, what information stays out, and what you will personally verify. Get the free One-Task Experiment Card and run one bounded seven-day test.

**Headline:**

> Start with the boundary, not the tool.

**Description:**

> Free printable educational resource.

**Call to action:** Learn more

### Variant C — Learn, do not prove

**Primary text:**

> A useful first AI experiment can end in Keep, Change, or Stop. The point is to learn from one small, reviewable task—not to automate everything. Request the free printable One-Task Experiment Card.

**Headline:**

> A calmer first step with AI at work.

**Description:**

> Free printable educational resource.

**Call to action:** Learn more

## Organic social recovery copy

Use only after the Facebook connection is re-integrated and a human reviews the final destination. Do not re-publish the failed Monday item automatically. Each post uses the same owned URL and an asset above.

**LinkedIn / professional post draft:**

> The first question about AI at work is not “Which model?” It is “Which task deserves a small, safe experiment?”
>
> Beacon Momentum’s free One-Task Experiment Card helps you choose one repeated task, set a purpose and information boundary, name the human decision, and review what happens after seven days.
>
> There is no pressure to automate everything, and no promise about outcomes. Start smaller than the pressure suggests: `https://beaconmomentum.com/work-that-fits`

**Facebook / Instagram draft:**

> One task. One boundary. One honest review.
>
> The free One-Task Experiment Card offers a calm seven-day way to try one AI-assisted work task while keeping your judgment and information boundaries visible.
>
> Get the printable card: `https://beaconmomentum.com/work-that-fits`

## Source tagging and aggregate measurement

Use a distinct, manually reviewed query string for every approved placement. Do not use personal or partner data in URL parameters.

| Channel | Example source-tagged destination |
|---|---|
| Meta Feed A | `https://beaconmomentum.com/work-that-fits?utm_source=meta&utm_medium=paid-social&utm_campaign=work-that-fits&utm_content=one-task-start` |
| Meta Feed B | `https://beaconmomentum.com/work-that-fits?utm_source=meta&utm_medium=paid-social&utm_campaign=work-that-fits&utm_content=boundary-first` |
| LinkedIn organic | `https://beaconmomentum.com/work-that-fits?utm_source=linkedin&utm_medium=organic-social&utm_campaign=work-that-fits&utm_content=one-task-card` |
| Recovered Facebook organic | `https://beaconmomentum.com/work-that-fits?utm_source=facebook&utm_medium=organic-social&utm_campaign=work-that-fits&utm_content=one-task-card` |

The server-owned form maps a valid consented request to `BM_Work_That_Fits`, `BM_One_Task_Experiment_Card`, and `BM_Work_That_Fits_Email_Consent`. Until a separate consent-compatible measurement solution is approved and tested, use aggregated first-party measures only: tagged landing sessions (if available from owned analytics), successful tagged contact captures, successful card download events if safely added, unsubscribe count, and relay error count. Do not treat views, impressions, clicks, or a small early sample as proof of product-market fit.

## Human review and stop rules

| Condition | Required response |
|---|---|
| Facebook is not re-integrated | Do not re-schedule, retry, or publish Facebook content |
| Advertising payment/verification status unresolved | Do not activate any ad set or spend |
| Form fails in a controlled production test | Do not direct traffic to the page; investigate the server relay and retry only after human review |
| Card URL fails or returns a non-PDF response | Pause/withhold traffic; restore the owned resource first |
| Nurture workflow not confirmed or unsubscribe unavailable | Do not advertise an email sequence; use the card download only until the workflow is ready |
| Any copy is changed to imply a personal trait, guaranteed outcome, clinical benefit, job security, or income | Decline the change and return it to human editorial review |
| Material complaint, privacy issue, or accessibility issue | Pause new spend/publication pending review and documented corrective action |

## What this package does not do

It does not create an active advertising campaign, incur spend, re-enable a disabled account, repair payment, complete Facebook authentication, publish a social post, or switch on email automation. Those actions remain separate owner-controlled gates.
