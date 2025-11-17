# Beacon Momentum Website - Complete Page Inventory

**Date:** November 17, 2025  
**Total Pages:** 58 HTML files  
**Purpose:** Comprehensive audit for header/footer/navigation consistency

---

## Page Categories

### Public-Facing Pages (Priority 1 - Customer Journey)
1. index.html - Homepage
2. founder.html - Founder page (Bob's story)
3. founder-page.html - Alias for founder.html
4. digital-grandpa.html - Mentorship program
5. rise-reclaim.html - Rise & Reclaim program
6. business-suite.html - Business Suite program
7. founding-member.html - Founding Member offer
8. our-compass.html - Our Compass page
9. labs.html - Beacon Labs page
10. contact.html - Contact page
11. press.html - Press page
12. about.html - About page
13. pricing.html - Pricing page
14. resources.html - Resources page

### Legal Pages (Priority 2 - Compliance)
15. privacy-policy.html - Privacy Policy
16. terms-of-service.html - Terms of Service
17. refund-policy.html - Refund Policy

### Payment Pages (Priority 3 - Conversion)
18. rise-reclaim-payment.html - Rise & Reclaim checkout
19. solopreneur-launchpad-payment.html - Solopreneur checkout
20. capital-suite-payment.html - Capital Suite checkout
21. digital-grandpa-payment-monthly.html - DG monthly checkout
22. digital-grandpa-payment-annual.html - DG annual checkout
23. beacon-labs-payment-monthly.html - Labs monthly checkout
24. beacon-labs-payment-annual.html - Labs annual checkout
25. community-membership-payment-monthly.html - Community monthly
26. community-membership-payment-annual.html - Community annual

### Thank You Pages (Priority 4 - Post-Purchase)
27. payment-success.html - Generic success
28. subscription-success.html - Subscription success
29. thank-you-rise-reclaim.html - Rise & Reclaim thank you
30. thank-you-digital-grandpa.html - DG thank you
31. thank-you-beacon-labs.html - Labs thank you
32. thank-you-contact.html - Contact form thank you
33. thank-you-digital-nomad.html - Digital Nomad thank you
34. thank-you-financial-sovereignty.html - Financial Sovereignty thank you

### Member Portal Pages (Priority 5 - Post-Login)
35. login.html - Login page
36. register.html - Registration page
37. forgot-password.html - Password recovery
38. reset-password.html - Password reset
39. verify-email.html - Email verification
40. resend-verification.html - Resend verification
41. member-dashboard.html - Member dashboard
42. admin-dashboard.html - Admin dashboard
43. my-progress.html - Progress tracking
44. courses.html - Course catalog
45. course-detail.html - Individual course
46. lesson-view.html - Lesson viewer
47. events.html - Events calendar
48. event-detail.html - Individual event
49. community.html - Community hub
50. community-space.html - Community space
51. community-post.html - Individual post
52. create-post.html - Create new post
53. messages.html - Messaging system

### Inquiry/Demo Pages (Priority 6 - Lead Generation)
54. inquiry.html - General inquiry
55. request-demo.html - Demo request

### Backup/Archive Files (Priority 7 - Not Live)
56. index_backup_BEFORE_FULL_HOMEPAGE.html - Backup
57. index_backup_BEFORE_HOMEPAGE_EXPANSION.html - Backup
58. index_new_part1.html - Backup/Draft

---

## Audit Checklist for Each Page

### Header Consistency
- [ ] Logo present and correct
- [ ] "Beacon Momentum" branding
- [ ] "Lighting the Way Forward" tagline
- [ ] Navigation menu structure
- [ ] "Mentorship" vs "Digital Grandpa" label
- [ ] Responsive design

### Footer Consistency
- [ ] Contact email: support@beaconmomentum.com
- [ ] Phone: (413) 258-0254
- [ ] Mailing address: PO Box 244, Cheshire, MA 01225-0244
- [ ] Office hours: Monday - Friday, 9AM-3PM EST (Appointment Only)
- [ ] Site credit: "Built by Beacon Labs" (not Phoenix Collective)
- [ ] Legal links (Privacy, Terms, Refund)
- [ ] Social media links (if applicable)
- [ ] Copyright year: 2025

### Navigation Consistency
- [ ] Home link
- [ ] Founding Member link
- [ ] Digital Grandpa / Mentorship link
- [ ] Rise & Reclaim link
- [ ] Beacon Labs link
- [ ] Our Compass link
- [ ] Contact link
- [ ] Consistent across all pages

### Content Consistency
- [ ] "25+ years of mentoring experience" (not 8+ years)
- [ ] Correct Stripe payment links
- [ ] Brand voice and messaging
- [ ] Color scheme (teal gradient: #008080 to #00cc66)
- [ ] Typography consistency

---

## Known Issues from Screenshots

### Issue 1: Mismatched Headers
- Homepage: Has full logo + tagline
- Founding Member: Different header style
- Digital Grandpa: Different navigation structure
- Rise & Reclaim: Different logo treatment
- Beacon Labs: Different header entirely
- Contact: Different navigation menu

### Issue 2: Inconsistent Footers
- Contact page: Shows "admin@beaconmomentum.com" + wrong phone + "Phoenix Collective"
- Homepage: Should have correct info (recently updated)
- Financial Sovereignty pages: May have old footer
- Beacon Labs: Different footer structure

### Issue 3: Navigation Labels
- Some pages: "Digital Grandpa"
- Some pages: "Mentorship"
- Need: Consistent labeling strategy

### Issue 4: Contact Information Variations
- admin@beaconmomentum.com (WRONG)
- support@beaconmomentum.com (CORRECT)
- team@beaconmomentum.com (WRONG)
- Phone: (413) 597-8975 (WRONG)
- Phone: (413) 258-0254 (CORRECT)
- Address: Cheshire, MA 01225-0244 (WRONG - missing PO Box)
- Address: PO Box 244, Cheshire, MA 01225-0244 (CORRECT)

---

## Audit Priority Order

1. **Public-Facing Pages** (14 pages) - Customer-facing, highest priority
2. **Legal Pages** (3 pages) - Compliance requirement
3. **Payment Pages** (9 pages) - Conversion critical
4. **Thank You Pages** (8 pages) - Post-purchase experience
5. **Member Portal Pages** (19 pages) - User experience
6. **Inquiry/Demo Pages** (2 pages) - Lead generation
7. **Backup Files** (3 pages) - Archive only, low priority

---

## Standard Header Template (To Be Applied)

```html
<header>
    <nav>
        <a href="/" class="logo">
            <img src="beacon-logo.png" alt="Beacon Momentum">
            <span>Beacon Momentum</span>
            <span class="tagline">Lighting the Way Forward</span>
        </a>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/founding-member.html">Founding Member</a>
            <a href="/digital-grandpa.html">Mentorship</a>
            <a href="/rise-reclaim.html">Rise & Reclaim</a>
            <a href="/labs.html">Beacon Labs</a>
            <a href="/our-compass.html">Our Compass</a>
            <a href="/contact.html">Contact</a>
        </div>
    </nav>
</header>
```

## Standard Footer Template (To Be Applied)

```html
<footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>Beacon Momentum</h3>
            <p>Lighting the Way Forward through education, empowerment, and community.</p>
        </div>
        <div class="footer-section">
            <h3>Contact</h3>
            <p>Email: support@beaconmomentum.com</p>
            <p>Phone: (413) 258-0254</p>
            <p>Mailing Address: PO Box 244, Cheshire, MA 01225-0244</p>
            <p>Office Hours: Monday - Friday, 9AM-3PM EST (Appointment Only)</p>
        </div>
        <div class="footer-section">
            <h3>Quick Links</h3>
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/terms-of-service.html">Terms of Service</a>
            <a href="/refund-policy.html">Refund Policy</a>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2025 Beacon Momentum. All rights reserved.</p>
        <p>Built by Beacon Labs</p>
    </div>
</footer>
```

---

## Next Steps

1. Audit Priority 1 pages (Public-Facing) for header/footer consistency
2. Document all inconsistencies found
3. Create standardized header/footer templates
4. Apply templates to all pages systematically
5. Test navigation flow across all pages
6. Verify contact information on every page
7. Deploy updates to GitHub

---

**Status:** Inventory complete, ready for systematic audit  
**Estimated Time:** 4-6 hours for complete audit and fixes  
**Priority:** CRITICAL - Brand consistency affects credibility
