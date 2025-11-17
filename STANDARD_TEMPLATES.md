# Standard Header and Footer Templates

**Date:** November 17, 2025  
**Purpose:** Reference templates for standardizing all pages

---

## Standard Header HTML

```html
<!-- Header -->
<header class="header">
    <div class="container">
        <nav class="nav">
            <a href="/" class="logo" style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="images/beacon-logo.png" alt="Beacon Momentum" style="width: 70px; height: 70px; object-fit: contain;">
                <div style="display: flex; flex-direction: column; line-height: 1.2;">
                    <span style="font-size: 1.25rem; font-weight: 700;">Beacon Momentum</span>
                    <span style="font-size: 0.75rem; font-weight: 500; color: var(--beacon-gold); font-style: italic;">Lighting the Way Forward</span>
                </div>
            </a>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="founding-member.html">Founding Member</a></li>
                <li><a href="digital-grandpa.html">Mentorship</a></li>
                <li><a href="rise-reclaim.html">Rise & Reclaim</a></li>
                <li><a href="business-suite.html">Business Suite</a></li>
                <li><a href="labs.html">Beacon Labs</a></li>
                <li><a href="our-compass.html">Our Compass</a></li>
                <li><a href="press.html">Press</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </div>
</header>
```

---

## Standard Footer HTML (Full Version)

```html
<!-- Footer -->
<footer class="site-footer">
    <div class="footer-container">
        <div class="footer-grid">
            <!-- Column 1: About Beacon -->
            <div class="footer-column">
                <h3>Beacon Momentum</h3>
                <p>Lighting the way forward through education, empowerment, and community. We help rebuilders transform their setbacks into comebacks.</p>
            </div>
            
            <!-- Column 2: Our Programs -->
            <div class="footer-column">
                <h3>Our Programs</h3>
                <ul class="footer-links">
                    <li><a href="/founding-member.html">Founding Member</a></li>
                    <li><a href="/digital-grandpa.html">Mentorship</a></li>
                    <li><a href="/rise-reclaim.html">Rise & Reclaim</a></li>
                    <li><a href="/business-suite.html">Business Suite</a></li>
                    <li><a href="/labs.html">Beacon Labs</a></li>
                </ul>
            </div>
            
            <!-- Column 3: Resources -->
            <div class="footer-column">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="/our-compass.html">Our Compass</a></li>
                    <li><a href="/press.html">Press</a></li>
                    <li><a href="/resources.html">Free Resources</a></li>
                    <li><a href="/about.html">About Us</a></li>
                </ul>
            </div>
            
            <!-- Column 4: Connect -->
            <div class="footer-column">
                <h3>Connect</h3>
                <ul class="footer-links">
                    <li><a href="/contact.html">Contact Us</a></li>
                    <li><a href="mailto:support@beaconmomentum.com">support@beaconmomentum.com</a></li>
                    <li><a href="tel:+14132580254">(413) 258-0254</a></li>
                    <li>PO Box 244<br>Cheshire, MA 01225</li>
                    <li><a href="contact.html">Help Center</a></li>
                    <li><a href="our-compass.html">About Us</a></li>
                    <li><a href="contact.html">Partner With Us</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-legal">
            <p>&copy; 2025 Beacon Momentum. All rights reserved.</p>
            <p>
                <a href="/privacy-policy.html">Privacy Policy</a> |
                <a href="/terms-of-service.html">Terms of Service</a> |
                <a href="/refund-policy.html">Refund Policy</a>
            </p>
            <p class="phoenix-attribution">
                Built by <a href="/labs.html" style="color: var(--beacon-gold);">Beacon Labs</a>
            </p>
        </div>
    </div>
</footer>
```

---

## Standard Footer HTML (Compact Version)

```html
<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Beacon Momentum</h3>
                <p>Lighting the way forward through storytelling, recovery support, and innovative tools for transparent growth.</p>
            </div>
            <div class="footer-section">
                <h3>Our Divisions</h3>
                <a href="digital-grandpa.html">Mentorship</a>
                <a href="rise-reclaim.html">Rise & Reclaim</a>
                <a href="labs.html">Beacon Labs</a>
            </div>
            <div class="footer-section">
                <h3>Connect</h3>
                <a href="contact.html">Contact Us</a>
                <p style="margin-top: 1rem; color: #D1D5DB;">
                    Email: support@beaconmomentum.com<br>
                    Phone: (413) 258-0254<br>
                    Mailing Address: PO Box 244, Cheshire, MA 01225-0244<br>
                    Office Hours: Monday - Friday, 9AM-3PM EST (Appointment Only)
                </p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Beacon Momentum. All rights reserved. | Built by Beacon Labs</p>
        </div>
    </div>
</footer>
```

---

## Contact Information Standards

**Email:** support@beaconmomentum.com  
**Phone:** (413) 258-0254  
**Mailing Address:** PO Box 244, Cheshire, MA 01225-0244  
**Office Hours:** Monday - Friday, 9AM-3PM EST (Appointment Only)

---

## Navigation Standards

**Primary Navigation (All Pages):**
1. Home
2. Founding Member
3. Mentorship (links to digital-grandpa.html)
4. Rise & Reclaim
5. Business Suite
6. Beacon Labs
7. Our Compass
8. Press
9. Contact

**Note:** Use "Mentorship" in navigation, but "Digital Grandpa" is Bob's brand within content.

---

## Branding Standards

**Logo:** images/beacon-logo.png (70x70px)  
**Tagline:** "Lighting the Way Forward"  
**Site Credit:** "Built by Beacon Labs"  
**Copyright:** "© 2025 Beacon Momentum. All rights reserved."

**Color Variables:**
```css
--beacon-orange: #FF7A00;
--beacon-dark: #1F1F1F;
--beacon-cream: #F8F5F1;
--beacon-gold: #D97706;
--beacon-gray: #6B7280;
--beacon-light: #F9FAFB;
--beacon-teal: #0F766E; /* Legacy compatibility */
```

---

## Meta Description Standard

```html
<meta name="description" content="Beacon Momentum: Transforming lives through storytelling, mentorship, and innovative community tools. Lighting the way forward for rebuilders.">
```

---

## Schema.org Contact Point Standard

```json
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "Customer Service",
  "email": "support@beaconmomentum.com",
  "telephone": "+1-413-258-0254",
  "areaServed": "US",
  "availableLanguage": "English"
}
```

---

**Status:** Templates documented for reference  
**Next:** Apply systematically to all pages
