#!/usr/bin/env python3
import re

# Standard tagline to add
TAGLINE = '<p class="text-sm" style="color: var(--beacon-gold); font-style: italic;">Lighting the Way Forward</p>'

# Standard navigation
STANDARD_NAV = '''<li><a href="/">Home</a></li>
                    <li><a href="founding-member.html">Founding Member</a></li>
                    <li><a href="digital-grandpa.html">Mentorship</a></li>
                    <li><a href="rise-reclaim.html">Rise & Reclaim</a></li>
                    <li><a href="business-suite.html">Business Suite</a></li>
                    <li><a href="labs.html">Beacon Labs</a></li>
                    <li><a href="our-compass.html">Our Compass</a></li>
                    <li><a href="press.html">Press</a></li>
                    <li><a href="contact.html">Contact</a></li>'''

# Standard footer contact
CONTACT_SECTION = '''<h3>Connect</h3>
                    <p>Email: <a href="mailto:support@beaconmomentum.com">support@beaconmomentum.com</a></p>
                    <p>Phone: <a href="tel:+14132580254">(413) 258-0254</a></p>
                    <p>PO Box 244, Cheshire, MA 01225-0244</p>
                    <p>Monday - Friday, 9AM-3PM EST (Appointment Only)</p>'''

PAGES = ["labs.html", "press.html", "about.html", "pricing.html", "resources.html", "inquiry.html"]

print(f"Will process {len(PAGES)} pages")
for page in PAGES:
    print(f"  - {page}")
