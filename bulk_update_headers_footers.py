#!/usr/bin/env python3
"""
Bulk update headers and footers for remaining Beacon Momentum pages
"""
import re

# Standard header HTML (logo + tagline section)
STANDARD_HEADER_LOGO = '''                <div class="flex items-center space-x-3">
                    <a href="/"><img src="images/beacon-logo.png" alt="Beacon Momentum" class="w-16 h-16 object-contain"></a>
                    <div>
                        <h1 class="text-xl font-bold playfair" style="color: var(--beacon-teal);">Beacon Momentum</h1>
                        <p class="text-xs italic" style="color: var(--beacon-gold);">Lighting the Way Forward</p>
                    </div>
                </div>'''

# Standard navigation HTML
STANDARD_NAV = '''                <div class="hidden md:flex items-center space-x-6">
                    <a href="/" class="font-medium" style="color: var(--warm-gray);">Home</a>
                    <a href="founding-member.html" class="font-medium" style="color: var(--warm-gray);">Founding Member</a>
                    <a href="digital-grandpa.html" class="font-medium" style="color: var(--warm-gray);">Mentorship</a>
                    <a href="rise-reclaim.html" class="font-medium" style="color: var(--warm-gray);">Rise & Reclaim</a>
                    <a href="business-suite.html" class="font-medium" style="color: var(--warm-gray);">Business Suite</a>
                    <a href="labs.html" class="font-medium" style="color: var(--warm-gray);">Beacon Labs</a>
                    <a href="our-compass.html" class="font-medium" style="color: var(--warm-gray);">Our Compass</a>
                    <a href="press.html" class="font-medium" style="color: var(--warm-gray);">Press</a>
                    <a href="contact.html" class="font-medium" style="color: var(--warm-gray);">Contact</a>
                </div>'''

# Standard footer HTML
STANDARD_FOOTER = '''    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 class="text-xl font-bold mb-4 playfair" style="color: var(--beacon-gold);">Beacon Momentum</h3>
                    <p class="text-gray-300">Lighting the way forward through education, empowerment, and community.</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4 playfair" style="color: var(--beacon-gold);">Our Programs</h3>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="founding-member.html" class="hover:text-white">Founding Member</a></li>
                        <li><a href="digital-grandpa.html" class="hover:text-white">Mentorship</a></li>
                        <li><a href="rise-reclaim.html" class="hover:text-white">Rise & Reclaim</a></li>
                        <li><a href="business-suite.html" class="hover:text-white">Business Suite</a></li>
                        <li><a href="labs.html" class="hover:text-white">Beacon Labs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4 playfair" style="color: var(--beacon-gold);">Connect</h3>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="contact.html" class="hover:text-white">Contact Us</a></li>
                        <li>Email: <a href="mailto:support@beaconmomentum.com" class="hover:text-white">support@beaconmomentum.com</a></li>
                        <li>Phone: <a href="tel:+14132580254" class="hover:text-white">(413) 258-0254</a></li>
                        <li>Mailing Address: PO Box 244, Cheshire, MA 01225-0244</li>
                        <li>Office Hours: Monday - Friday, 9AM-3PM EST (Appointment Only)</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Beacon Momentum. All rights reserved. | Built by <a href="labs.html" class="hover:text-white" style="color: var(--beacon-gold);">Beacon Labs</a></p>
                <p class="mt-2"><a href="privacy-policy.html" class="hover:text-white">Privacy Policy</a> | <a href="terms-of-service.html" class="hover:text-white">Terms of Service</a> | <a href="refund-policy.html" class="hover:text-white">Refund Policy</a></p>
            </div>
        </div>
    </footer>'''

print("Templates ready for manual application to remaining pages")
print("Pages to update:")
pages = [
    "rise-reclaim.html",
    "business-suite.html",
    "founding-member.html",
    "our-compass.html",
    "labs.html",
    "press.html",
    "about.html",
    "pricing.html",
    "resources.html",
    "inquiry.html"
]
for p in pages:
    print(f"  - {p}")
