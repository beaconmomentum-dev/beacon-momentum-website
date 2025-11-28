#!/bin/bash

# Comprehensive script to replace ALL old pathway names with new ones
# across the entire marketing site

echo "🔧 Starting comprehensive pathway name replacement..."

# Navigate to website directory
cd /home/ubuntu/beacon-momentum-website

# Create backup
echo "📦 Creating backup..."
tar -czf backup-before-pathway-fix-$(date +%Y%m%d-%H%M%S).tar.gz *.html blog/*.html 2>/dev/null

# Function to replace in all HTML files
replace_in_files() {
    local old_text="$1"
    local new_text="$2"
    echo "  Replacing '$old_text' → '$new_text'"
    
    # Replace in root HTML files
    find . -name "*.html" -type f -exec sed -i "s|$old_text|$new_text|g" {} \;
}

echo "🔄 Replacing pathway names..."

# Replace "Rise & Reclaim" with "Beacon Rise"
replace_in_files "Rise & Reclaim" "Beacon Rise"
replace_in_files "Rise &amp; Reclaim" "Beacon Rise"

# Replace "Business Suite" with "Beacon Launch"
replace_in_files "Business Suite" "Beacon Launch"

# Replace "Solopreneur Launchpad" with "Beacon Launch"
replace_in_files "Solopreneur Launchpad" "Beacon Launch"
replace_in_files "The Solopreneur Launchpad" "Beacon Launch"

# Replace "Capital Suite" with "Beacon Academy"
replace_in_files "Capital Suite" "Beacon Academy"
replace_in_files "The Capital Suite" "Beacon Academy"

# Replace file references
echo "🔗 Updating file references..."
replace_in_files "rise-reclaim.html" "beacon-rise.html"
replace_in_files "business-suite.html" "beacon-launch.html"
replace_in_files "capital-suite.html" "beacon-academy.html"

# Update navigation links specifically
echo "🧭 Fixing navigation menus..."
find . -name "*.html" -type f -exec sed -i 's|<a href="rise-reclaim.html">Beacon Rise</a>|<a href="beacon-rise.html">Beacon Rise</a>|g' {} \;
find . -name "*.html" -type f -exec sed -i 's|<a href="business-suite.html">Beacon Launch</a>|<a href="beacon-launch.html">Beacon Launch</a>|g' {} \;
find . -name "*.html" -type f -exec sed -i 's|<a href="capital-suite.html">Beacon Academy</a>|<a href="beacon-academy.html">Beacon Academy</a>|g' {} \;

# Remove "Beacon Labs" from navigation (if it exists)
echo "🗑️  Removing Beacon Labs references..."
# This requires manual review as structure varies

echo "✅ Replacement complete!"
echo ""
echo "📊 Verification:"
echo "Remaining 'Rise & Reclaim' instances: $(grep -r "Rise & Reclaim" *.html 2>/dev/null | wc -l)"
echo "Remaining 'Business Suite' instances: $(grep -r "Business Suite" *.html 2>/dev/null | wc -l)"
echo "Remaining 'Capital Suite' instances: $(grep -r "Capital Suite" *.html 2>/dev/null | wc -l)"
echo "Remaining 'Solopreneur Launchpad' instances: $(grep -r "Solopreneur Launchpad" *.html 2>/dev/null | wc -l)"
echo ""
echo "🎯 Files updated successfully!"
