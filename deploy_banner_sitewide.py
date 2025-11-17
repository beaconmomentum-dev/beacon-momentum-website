#!/usr/bin/env python3
"""
Deploy Black Friday Banner V2 site-wide to all HTML pages
"""
import os
import re

# Read the banner V2 content
with open('partials/black-friday-banner-v2.html', 'r') as f:
    banner_content = f.read()

# Get all HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

# Pages to skip (if any)
skip_files = ['404.html', 'error.html']

updated_count = 0
skipped_count = 0

for html_file in html_files:
    if html_file in skip_files:
        print(f"⊘ Skipping {html_file}")
        skipped_count += 1
        continue
    
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if banner already exists
        if 'black-friday-banner' in content or 'blackFridayBanner' in content:
            print(f"→ {html_file} already has banner")
            continue
        
        # Find <body> tag and insert banner after it
        pattern = r'(<body[^>]*>)'
        if re.search(pattern, content):
            new_content = re.sub(
                pattern,
                r'\1\n' + banner_content + '\n',
                content,
                count=1
            )
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✓ Added banner to {html_file}")
            updated_count += 1
        else:
            print(f"✗ No <body> tag found in {html_file}")
            skipped_count += 1
            
    except Exception as e:
        print(f"✗ Error processing {html_file}: {str(e)}")
        skipped_count += 1

print(f"\n{'='*50}")
print(f"Banner deployment complete!")
print(f"Updated: {updated_count} files")
print(f"Skipped: {skipped_count} files")
print(f"{'='*50}")
