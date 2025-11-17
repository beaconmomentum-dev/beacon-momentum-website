#!/usr/bin/env python3
import re
import os

# Pages to update (excluding index.html and contact.html which are done)
PAGES = [
    "founder.html",
    "founder-page.html", 
    "digital-grandpa.html",
    "rise-reclaim.html",
    "business-suite.html",
    "founding-member.html",
    "our-compass.html",
    "labs.html",
    "press.html",
    "about.html",
    "pricing.html",
    "resources.html",
    "inquiry.html",
    "request-demo.html"
]

# Standard footer contact info
STANDARD_FOOTER_CONTACT = """Email: support@beaconmomentum.com<br>
                        Phone: (413) 258-0254<br>
                        Mailing Address: PO Box 244, Cheshire, MA 01225-0244<br>
                        Office Hours: Monday - Friday, 9AM-3PM EST (Appointment Only)"""

for page in PAGES:
    if os.path.exists(page):
        print(f"✓ Found {page}")
    else:
        print(f"✗ Missing {page}")

print("\nBatch update script ready")
