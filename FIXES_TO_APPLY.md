# Beacon Momentum - Complete Fix List

**Created:** November 17, 2025 3:15 PM EST  
**Status:** IN PROGRESS

## Issues Found & Fixes Needed

### ✅ GOOD NEWS
- Privacy Policy, Terms of Service, and Refund Policy pages EXIST and have correct footer links
- Privacy Policy has correct support@beaconmomentum.com contact info
- No "Phoenix Collective" webmaster attribution found (only CSS class names remain, which is fine)
- All 59 pages have Black Friday banner

### 🔧 FIXES REQUIRED

#### 1. Add support@beaconmomentum.com to Missing Pages

Pages without support email in footer (need to add):
- about.html
- admin-dashboard.html
- All payment pages:
  - beacon-labs-payment-annual.html
  - beacon-labs-payment-monthly.html
  - capital-suite-payment.html
  - community-membership-payment-annual.html
  - community-membership-payment-monthly.html
  - digital-grandpa-payment-annual.html
  - digital-grandpa-payment-monthly.html
  - rise-reclaim-payment.html
  - solopreneur-launchpad-payment.html
- Community pages:
  - community.html
  - community-space.html
  - community-post.html
  - create-post.html
- Course pages:
  - courses.html
  - course-detail.html
  - lesson-view.html
- Event pages:
  - events.html
  - event-detail.html
- Auth pages:
  - forgot-password.html
  - login.html
  - register.html
  - reset-password.html
  - verify-email.html
  - resend-verification.html
- Member pages:
  - member-dashboard.html
  - my-progress.html
  - messages.html
- Other:
  - inquiry.html
  - request-demo.html

**Action:** Add footer with support@beaconmomentum.com to all these pages

#### 2. Test All Stripe Payment Links

Need to verify these work:
- Rise & Reclaim: https://buy.stripe.com/fZu3cv2k446m5e9eK02400a
- Business Suite: https://buy.stripe.com/fZudR94scbyOfSNbxO2400c
- Digital Grandpa Base: https://buy.stripe.com/dRm3cv0bW32i7mhfO42400e
- Digital Grandpa Premium: https://buy.stripe.com/8x26oH6AkdGWaytgS82400d
- Founding Member: Need to find the payment link

**Action:** Click each link to verify Stripe checkout loads

#### 3. Verify Countdown Timer

Homepage shows "7 Days 12 Hours 34 Minutes" - need to verify JavaScript calculates correctly from December 24th, 2025.

**Action:** Check JavaScript code and test countdown

#### 4. Test Contact Form

Contact page form needs testing:
- Form submission works
- Email delivers to support@beaconmomentum.com
- Thank you page redirect works

**Action:** Submit test form and verify

#### 5. Test Internal Anchor Links

Homepage has links to:
- #rise-reclaim-section
- #solopreneur-section
- #capital-suite-section

**Action:** Click each link to verify sections exist and scroll works

#### 6. Verify All Thank-You Pages

Check these redirect correctly:
- thank-you-beacon-labs.html
- thank-you-contact.html
- thank-you-digital-grandpa.html
- thank-you-digital-nomad.html
- thank-you-financial-sovereignty.html
- thank-you-rise-reclaim.html

**Action:** Navigate to each page and verify content

#### 7. Remove Unused Phoenix CSS Variables

These files have `--phoenix-red` CSS variables (cosmetic, low priority):
- admin-dashboard.html
- forgot-password.html
- login.html
- member-dashboard.html
- messages.html

**Action:** Replace with `--beacon-gold` or appropriate Beacon color

---

## Fix Priority

**URGENT (Do First):**
1. Test all Stripe payment links
2. Verify countdown timer accuracy
3. Test contact form submission

**HIGH (Do Second):**
1. Add support@beaconmomentum.com to all missing pages
2. Test internal anchor links on homepage
3. Verify all thank-you pages

**MEDIUM (Do Third):**
1. Replace Phoenix CSS variables with Beacon colors
2. Test mobile responsiveness
3. Verify all external links

---

## Progress Tracker

- [ ] Stripe payment links tested
- [ ] Countdown timer verified
- [ ] Contact form tested
- [ ] Support email added to all pages
- [ ] Internal anchor links tested
- [ ] Thank-you pages verified
- [ ] Phoenix CSS variables replaced
- [ ] All fixes deployed to droplet
- [ ] Cloudflare cache purged
- [ ] Final verification complete
