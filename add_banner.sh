#!/bin/bash
# Add Black Friday banner to program pages

BANNER_FILE="partials/black-friday-banner.html"
PAGES="digital-grandpa.html rise-reclaim.html business-suite.html founding-member.html"

echo "Black Friday banner will be added manually to:"
for page in $PAGES; do
    if [ -f "$page" ]; then
        echo "  ✓ $page"
    else
        echo "  ✗ $page (not found)"
    fi
done

echo ""
echo "Banner content is in: $BANNER_FILE"
echo "Insert after <body> tag in each file"
