># Beacon Momentum Stripe Integration Guide
>## Date: November 16, 2025 - 3:00 AM EST
>
>---
>
>## OVERVIEW
>
>This guide provides step-by-step instructions for creating products and payment links in Stripe, and then integrating them into the new payment pages for Beacon Momentum. All payment pages have been created and are ready for you to add your unique Stripe links.
>
>---
>
>## HOW TO CREATE STRIPE PRODUCTS & PAYMENT LINKS
>
>### Step 1: Create Products in Stripe
>
>For each of the following offerings, you will need to create a new product in your Stripe Dashboard.
>
>1.  **Log in to your Stripe Dashboard.**
>2.  Navigate to **Products** > **+ Add product**.
>3.  Fill in the product details:
>    *   **Name:** (e.g., "Rise & Reclaim Program")
>    *   **Description:** (e.g., "12-week trauma recovery program")
>    *   **Pricing:** Select "Standard pricing" and enter the price.
>        *   For one-time payments, select **One time**.
>        *   For subscriptions, select **Recurring**.
>4.  Click **Save product**.
>
>#### Products to Create:
>
>| Product Name | Price (One-Time) | Price (Recurring) |
>| --- | --- | --- |
>| Rise & Reclaim | $1,997 | $197/month (for 12 months) |
>| Solopreneur Launchpad | $997 | $97/month (for 12 months) |
>| Capital Suite | $497 | $47/month (for 12 months) |
>| Digital Grandpa Support | | $47/month or $497/year |
>| Community Membership | | $29/month or $297/year |
>| Beacon Labs Access | | $97/month or $970/year |

>### Step 2: Create Payment Links for Each Product
>
>After creating a product, you can create a payment link for it.
>
>1.  From the product page in your Stripe Dashboard, click **Create payment link**.
>2.  Customize the payment page if desired (you can add your logo and brand colors).
>3.  Under **After payment**, select **Redirect customers to a custom URL** and enter the following URL:
>    `https://beaconmomentum.com/payment-success.html`
>4.  Click **Create link**.
>5.  Copy the generated payment link URL. It will look like this: `https://buy.stripe.com/UNIQUE_ID`
>
>---
>
>## HOW TO ADD PAYMENT LINKS TO YOUR WEBSITE
>
>You will need to edit the following HTML files and replace the placeholder `YOUR_STRIPE_PAYMENT_LINK_HERE` with the corresponding payment link you created in Stripe.
>
>| File to Edit | Product | Price |
>| --- | --- | --- |
>| `rise-reclaim-payment.html` | Rise & Reclaim | $1,997 (One-Time) |
>| `solopreneur-launchpad-payment.html` | Solopreneur Launchpad | $997 (One-Time) |
>| `digital-grandpa-payment-monthly.html` | Digital Grandpa Support | $47/month |
>| `digital-grandpa-payment-annual.html` | Digital Grandpa Support | $497/year |
>| `community-membership-payment-monthly.html`| Community Membership | $29/month |
>| `community-membership-payment-annual.html` | Community Membership | $297/year |
>| `capital-suite-payment.html` | Capital Suite | $497 (One-Time) |
>| `beacon-labs-payment-monthly.html` | Beacon Labs Access | $97/month |
>| `beacon-labs-payment-annual.html` | Beacon Labs Access | $970/year |
>
>### Example:
>
>In `rise-reclaim-payment.html`, find this line:
>
>`<a href="YOUR_STRIPE_PAYMENT_LINK_HERE" class="cta-primary">Enroll Now</a>`
>
>Replace it with your actual Stripe payment link:
>
>`<a href="https://buy.stripe.com/GENERATED_LINK_FOR_RISE_RECLAIM" class="cta-primary">Enroll Now</a>`
>
>---
>
>## NEXT STEPS
>
>1.  **Create all products and payment links in Stripe.**
>2.  **Update the HTML files with your new payment links.**
>3.  **Upload the updated HTML files to your server.**
>4.  **Test each payment link to ensure it directs to the correct Stripe checkout page.**
>
>This completes the Stripe integration. All new payment pages are ready and waiting for your links.
