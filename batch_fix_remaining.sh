#!/bin/bash
# Quick batch fix for remaining 5 pages

for page in press.html about.html pricing.html resources.html inquiry.html; do
    echo "Processing $page..."
    
    # Backup
    cp "$page" "${page}.bak"
    
    # Fix wrong phone if exists
    sed -i 's/(413) 597-8975/(413) 258-0254/g' "$page"
    sed -i 's/413-597-8975/(413) 258-0254/g' "$page"
    
    # Fix wrong email if exists  
    sed -i 's/admin@beaconmomentum.com/support@beaconmomentum.com/g' "$page"
    sed -i 's/team@beaconmomentum.com/support@beaconmomentum.com/g' "$page"
    
    echo "  ✓ Fixed $page"
done

echo "Done! All pages processed."
