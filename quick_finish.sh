#!/bin/bash
# Quick standardization script for remaining 4 pages

for page in about.html pricing.html resources.html inquiry.html; do
    echo "Updating $page..."
    
    # Add tagline to logo (if not already there)
    if ! grep -q "Lighting the Way Forward" "$page"; then
        sed -i 's|Beacon Momentum</a>|Beacon Momentum<span style="font-size: 0.75em; font-style: italic; color: var(--beacon-gold); display: block;">Lighting the Way Forward</span></a>|' "$page"
    fi
    
    # Update phone in footer
    sed -i 's|(919) 800-7265|(413) 258-0254|g' "$page"
    sed -i 's|tel:+19198007265|tel:+14132580254|g' "$page"
    
    # Add "Built by Beacon Labs" if not present
    if ! grep -q "Built by" "$page"; then
        sed -i 's|All rights reserved\.|All rights reserved. | Built by <a href="labs.html" style="color: var(--beacon-gold);">Beacon Labs</a>|' "$page"
    fi
    
    echo "  ✓ Updated $page"
done

echo "All 4 pages updated!"
