#!/bin/bash

# Beacon Momentum Branding Update Script
# Updates all old pathway names to new branding
# November 28, 2025

echo "🔄 Starting Beacon Momentum branding update..."

# Backup current state
echo "📦 Creating backup..."
cp index.html index.html.backup
cp rise-reclaim.html rise-reclaim.html.backup 2>/dev/null || true
cp business-suite.html business-suite.html.backup 2>/dev/null || true

# Define replacements
declare -A replacements=(
    ["Rise & Reclaim"]="Beacon Rise"
    ["Rise &amp; Reclaim"]="Beacon Rise"
    ["rise-reclaim"]="beacon-rise"
    ["Business Suite"]="Beacon Launch"
    ["business-suite"]="beacon-launch"
    ["Solopreneur Launchpad"]="Beacon Launch"
    ["solopreneur-launchpad"]="beacon-launch"
    ["Capital Suite"]="Beacon Academy"
    ["capital-suite"]="beacon-academy"
    ["Beacon Capital Suite"]="Beacon Academy"
)

# Files to update
files=(
    "index.html"
    "rise-reclaim.html"
    "business-suite.html"
    "digital-grandpa.html"
    "founding-member.html"
    "our-compass.html"
    "pricing.html"
)

# Update each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "📝 Updating $file..."
        
        # Apply all replacements
        sed -i 's/Rise & Reclaim/Beacon Rise/g' "$file"
        sed -i 's/Rise &amp; Reclaim/Beacon Rise/g' "$file"
        sed -i 's/rise-reclaim/beacon-rise/g' "$file"
        sed -i 's/Business Suite/Beacon Launch/g' "$file"
        sed -i 's/business-suite/beacon-launch/g' "$file"
        sed -i 's/Solopreneur Launchpad/Beacon Launch/g' "$file"
        sed -i 's/solopreneur-launchpad/beacon-launch/g' "$file"
        sed -i 's/Capital Suite/Beacon Academy/g' "$file"
        sed -i 's/capital-suite/beacon-academy/g' "$file"
        sed -i 's/Beacon Capital Suite/Beacon Academy/g' "$file"
        
        echo "✅ $file updated"
    else
        echo "⚠️  $file not found, skipping..."
    fi
done

# Rename files
echo "📁 Renaming files..."
[ -f "rise-reclaim.html" ] && mv rise-reclaim.html beacon-rise.html && echo "✅ rise-reclaim.html → beacon-rise.html"
[ -f "business-suite.html" ] && mv business-suite.html beacon-launch.html && echo "✅ business-suite.html → beacon-launch.html"

# Create beacon-academy.html if it doesn't exist (placeholder)
if [ ! -f "beacon-academy.html" ]; then
    echo "📄 Creating beacon-academy.html placeholder..."
    cat > beacon-academy.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beacon Academy - Master DeFi & Modern Finance</title>
    <meta name="description" content="Beacon Academy: Educational platform teaching DeFi markets and modern financial strategies. Not financial or investment advice.">
</head>
<body>
    <h1>Beacon Academy</h1>
    <h2>Master DeFi & Modern Finance</h2>
    <p><em>Educational content only. Not financial or investment advice.</em></p>
    <p>Coming soon...</p>
    <a href="index.html">Return to Home</a>
</body>
</html>
EOF
    echo "✅ beacon-academy.html created"
fi

echo ""
echo "✅ Branding update complete!"
echo ""
echo "📊 Summary:"
echo "   - Updated pathway names across all files"
echo "   - Renamed rise-reclaim.html → beacon-rise.html"
echo "   - Renamed business-suite.html → beacon-launch.html"
echo "   - Created beacon-academy.html placeholder"
echo ""
echo "🔍 Next steps:"
echo "   1. Review changes: git diff"
echo "   2. Test locally"
echo "   3. Commit: git add . && git commit -m 'Update branding to new pathway names'"
echo "   4. Push: git push origin main"
