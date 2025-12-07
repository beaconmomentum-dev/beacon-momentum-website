#!/bin/bash
# Fix hero section contrast issues across all pages

# Fix main pages with hero sections
sed -i 's/background: rgba(26, 43, 61, 0\.75)/background: rgba(26, 43, 61, 0.85)/g' beacon-rise.html beacon-rise-current.html
sed -i 's/background: rgba(26, 43, 61, 0\.7)/background: rgba(26, 43, 61, 0.85)/g' beacon-launch.html digital-grandpa.html beacon-academy.html

echo "Hero contrast fixes applied to main program pages"
