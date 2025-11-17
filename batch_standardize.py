#!/usr/bin/env python3
"""
Batch standardize headers and footers across all Beacon Momentum pages.
This script updates the remaining public-facing pages with consistent branding.
"""

import re
import os
from pathlib import Path

# Standard header template (simplified - will be inserted via regex)
STANDARD_NAV_LINKS = '''                <div class="hidden md:flex items-center space-x-6">
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

# Pages to update (excluding already completed ones)
PAGES_TO_UPDATE = [
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
    "inquiry.html"
]

def check_files_exist():
    """Check which files exist"""
    print("Checking files...")
    existing = []
    for page in PAGES_TO_UPDATE:
        if os.path.exists(page):
            print(f"  ✓ {page}")
            existing.append(page)
        else:
            print(f"  ✗ {page} (not found)")
    return existing

def main():
    print("="*60)
    print("Beacon Momentum - Batch Header/Footer Standardization")
    print("="*60)
    
    existing_files = check_files_exist()
    
    print(f"\nFound {len(existing_files)} files to update")
    print("\nThis script prepares the file list.")
    print("Manual updates will be done page-by-page for accuracy.")
    
    return existing_files

if __name__ == "__main__":
    files = main()
