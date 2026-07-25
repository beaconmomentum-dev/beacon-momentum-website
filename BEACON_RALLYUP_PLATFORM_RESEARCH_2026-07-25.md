# Beacon Momentum — RallyUp Platform Fit Assessment

**Status:** Preliminary research; not a platform-selection decision  
**Prepared:** July 25, 2026  
**Scope:** Whether RallyUp is suitable for a limited Beacon supporter-merchandise and scholarship campaign.  

> **Legal and tax boundary:** This is an operational platform assessment, not legal, tax, charitable-solicitation, raffle, gaming, or financial advice. Platform capability does not establish whether Beacon Momentum LLC may describe a purchase as charitable, tax-deductible, a donation, a raffle, or a sweepstakes. Those claims require qualified review before launch.

## Preliminary conclusion

**RallyUp is a credible candidate for a controlled, one-SKU supporter-shirt campaign, but it is not yet the recommended platform of record.** It is most attractive if Beacon wants a branded fundraising-style campaign page, donor/supporter reporting, a Stripe or PayPal collection connection, and a fundraising storefront distinct from The Watch membership flow. It is less attractive if the priority is ordinary commerce with sophisticated fulfillment, broad product merchandising, partial-refund flexibility, or deep native integration with the eventual Beacon commerce stack.

RallyUp should be considered only for the **supporter product and scholarship allocation**, never as the Beacon Community membership system of record. It must also remain separate from the retired RV raffle concept.

## Current first-party capabilities

| Capability | Current first-party finding | Beacon implication |
|---|---|---|
| **Storefront** | RallyUp offers a fundraising storefront with product images, price, variations, custom branding, a custom URL, and one campaign page that can support multiple activities. [1] | Suitable for a limited supporter shirt and, later, a deliberately curated merchandise collection. |
| **Fulfillment model** | RallyUp says storefronts can support pre-order/made-to-order fulfillment or existing inventory, but the organizer remains responsible for shipping, customs, local taxes, order status, and customer service. [1] | A print-on-demand or limited preorder is operationally simpler than holding inventory. |
| **Payments and payouts** | RallyUp says an organizer connects Stripe or PayPal to receive funds. [2] | Beacon must decide which entity-controlled payment account receives funds, how allocations are reconciled, and who owns refund authority. |
| **Fees** | Its current pricing page lists a 2.9% Flex platform fee for Storefront activity; the Free plan uses optional donor tipping. Payment processors charge a stated 1.9%–2.9% plus $0.30 per transaction, varying by arrangement. [2] | The campaign economics must disclose a fixed scholarship allocation after—not before—actual platform, processing, fulfillment, tax, and refund exposure are modeled. |
| **Data** | RallyUp states that campaign donor data belongs to the organization, is exportable, and is not sold/shared/transferred by RallyUp; Stripe or PayPal process payments under their own policies. [3] | Restrict the configured fields to minimum necessary purchase/fulfillment data. Do not automatically merge supporter data into Beacon Community or scholarship-applicant audiences. |
| **Refunds** | The organizer administers refunds under campaign/payment-provider policy. RallyUp states that refunds are full only, not partial, and original processing fees are refunded to the purchaser from the organization’s account. [4] [5] | The supporter-shirt terms must define shipment, cancellation, return, and allocation treatment; the pilot ledger must test a full-refund/chargeback scenario. |
| **Prize promotions** | RallyUp supports raffles and sweepstakes, but its own materials distinguish them and its terms place legal obligations on campaign administrators. [2] [6] | This capability is **not** a green light to restart the legacy RV campaign. Keep all raffle/sweepstakes activity out of the Beacon scholarship pilot. |

## Platform-fit judgment

| Decision criterion | RallyUp fit | Reasoning |
|---|---|---|
| **One $100 Beacon Supporter Edition shirt** | **Potentially strong** | It can support a standalone branded Storefront, product variations, preorders, reporting, and payment collection. [1] |
| **Scholarship allocation transparency** | **Viable, but organizer-controlled** | RallyUp can record transactions and export reports, but it cannot define Beacon’s scholarship rules, legal basis, allocation formula, award controls, or restricted-fund reconciliation. [3] |
| **General merchandise catalog** | **Adequate, not a default recommendation** | The platform can manage unlimited products, but the first 90 days should test one product and fulfilment workflow rather than make Beacon a broad retail surface. [1] |
| **Beacon membership checkout** | **Not recommended** | Beacon Community remains the membership system of record. The Watch flow and scholarship supporter flow should remain distinct in the offer and data ledgers. |
| **Legacy RV raffle** | **Not suitable at present** | The legacy facts are incomplete and raffle/sweepstakes obligations are not resolved by selecting a software platform. [6] |
| **App/data governance** | **Requires explicit configuration** | Campaign buyer data belongs to the organization, so Beacon must decide access roles, exports, retention, GHL tags, and consent boundaries before launch. [3] |

## Required pre-selection checks

Before choosing RallyUp, complete a no-publication sandbox review that answers the following questions in writing.

1. **Entity and eligibility:** Which Beacon Momentum LLC-owned account will connect to Stripe or PayPal, and does the platform accept the intended campaign/entity structure?
2. **Public language:** Does the campaign page clearly say that the supporter shirt is a purchase with a fixed disclosed allocation, rather than an undefined “proceeds” promise, tax-deductible donation, membership sale, or prize entry?
3. **Allocation:** What fixed dollar amount per completed, non-refunded $100 order will be transferred to the scholarship ledger after vendor costs, fees, taxes, refunds, and chargebacks are modeled?
4. **Refund and fulfillment:** Is the no-partial-refund limitation acceptable for this product and how will the organization handle a size exchange, non-delivery, return, full refund, or chargeback?
5. **Data boundary:** Which exact data fields will be collected? Who can access exports? What is the retention period? Which GHL tag, if any, is allowed—and what must never be merged into membership/scholarship audiences?
6. **Reconciliation:** Who checks payout deposits against orders, costs, allocations, refunds, and the scholarship ledger? A second reviewer must verify each reporting period.
7. **Brand and domain:** Can the final RallyUp campaign use Beacon-approved visual assets and an appropriately disclosed custom domain/path without implying it is the Beacon Community member portal?

## Current recommendation

Perform a **draft-only RallyUp Storefront test** after the owner approves the scholarship pilot in principle and before a public launch. Test only the proposed supporter shirt. Do not accept transactions, build a catalog, connect member accounts, import audiences, or activate any raffle/sweepstakes element during the test.

The draft test should simulate four conditions: a completed purchase, a full refund, an address/size change, and a data export/reconciliation. If the platform’s full-refund limitation, payment account ownership, privacy settings, or campaign eligibility conflicts with the operating model, choose a standard commerce route instead.

## References

[1]: https://rallyup.com/sales/ "RallyUp — Fundraising Storefront"
[2]: https://rallyup.com/pricing/ "RallyUp — Pricing"
[3]: https://rallyup.com/learn/understand-donor-data-ownership-and-privacy/ "RallyUp — Donor Data Ownership and Privacy"
[4]: https://rallyup.com/refund-policy/ "RallyUp — Contributor Refund Policy"
[5]: https://rallyup.com/learn/how-to-cancel-and-refund-credit-card-charges/ "RallyUp — Cancel and Refund Credit Card Charges"
[6]: https://rallyup.com/terms-of-use/ "RallyUp — Terms of Use"
