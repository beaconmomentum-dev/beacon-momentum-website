#!/bin/bash
# Quick standardization of remaining 7 pages

PAGES=("our-compass.html" "labs.html" "press.html" "about.html" "pricing.html" "resources.html" "inquiry.html")

for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo "Processing $page..."
        # This is a placeholder - actual updates will be done manually for accuracy
        echo "  ✓ Found $page"
    else
        echo "  ✗ Missing $page"
    fi
done

echo ""
echo "Manual updates still required for each page"
