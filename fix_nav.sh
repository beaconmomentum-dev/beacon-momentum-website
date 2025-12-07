#!/bin/bash
# Fix navigation links to use absolute paths on all pages

for file in *.html; do
  echo "Fixing $file..."
  
  # Fix logo paths
  sed -i 's|href="index\.html" class="flex items-center|href="/index.html" class="flex items-center|g' "$file"
  sed -i 's|src="/images/beacon-logo-icon\.png"|src="/images/beacon-logo.png"|g' "$file"
  
  # Fix navigation links - desktop menu
  sed -i 's|href="index\.html" class="text-beacon-teal|href="/index.html" class="text-beacon-teal|g' "$file"
  sed -i 's|href="beacon-rise\.html"|href="/beacon-rise.html"|g' "$file"
  sed -i 's|href="beacon-launch\.html"|href="/beacon-launch.html"|g' "$file"
  sed -i 's|href="beacon-academy\.html"|href="/beacon-academy.html"|g' "$file"
  sed -i 's|href="founding-member\.html"|href="/founding-member.html"|g' "$file"
  sed -i 's|href="contact\.html"|href="/contact.html"|g' "$file"
  sed -i 's|href="pricing\.html"|href="/pricing.html"|g' "$file"
  sed -i 's|href="digital-grandpa\.html"|href="/digital-grandpa.html"|g' "$file"
  sed -i 's|href="labs\.html"|href="/labs.html"|g' "$file"
done

echo "Done!"
