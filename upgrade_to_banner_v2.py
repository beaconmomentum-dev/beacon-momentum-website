#!/usr/bin/env python3
"""
Upgrade all pages from Banner V1 to Banner V2 (Jarvis-optimized)
"""
import os
import re

# Get all HTML files
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

updated_count = 0

for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file has V1 banner
        if 'black-friday-banner' not in content:
            continue
        
        # Check if already V2 (has mobile text)
        if 'black-friday-banner-text-mobile' in content:
            print(f"→ {html_file} already has V2")
            continue
        
        # Upgrade V1 to V2
        modified = False
        
        # 1. Update CTA text
        if 'Claim Your Spot →' in content:
            content = content.replace('Claim Your Spot →', 'Claim Lifetime Access →')
            modified = True
        
        # 2. Update banner text with clearer deadline
        old_text = '🎁 Black Friday Early Access: Lifetime Membership - Limited Time Until December 24th - Give the Gift of Transformation'
        new_text = '🎁 Black Friday Early Access: Lifetime Membership - Offer Ends December 24 at 11:59pm EST - Give the Gift of Transformation'
        if old_text in content:
            content = content.replace(old_text, new_text)
            modified = True
        
        # 3. Add UTM tracking to CTA link
        old_link = 'href="/founding-member.html"'
        new_link = 'href="/founding-member.html?utm_source=banner&utm_medium=blackfriday&utm_campaign=lifetime2025"'
        if old_link in content and 'utm_source' not in content:
            content = content.replace(old_link, new_link)
            modified = True
        
        # 4. Add mobile-optimized text
        banner_text_pattern = r'(<span class="black-friday-banner-text">[\s\S]*?</span>)'
        if re.search(banner_text_pattern, content):
            mobile_text = '''</span>
        <!-- Mobile version -->
        <span class="black-friday-banner-text-mobile">
            🎁 Lifetime Membership - Ends Dec 24
        </span>'''
            content = re.sub(banner_text_pattern, r'\1' + mobile_text, content)
            modified = True
        
        # 5. Add mobile CSS if not present
        if '.black-friday-banner-text-mobile' not in content:
            mobile_css = '''    
    .black-friday-banner-text-mobile {
        display: none;
    }
    '''
            # Insert after .black-friday-banner-text definition
            content = re.sub(
                r'(\.black-friday-banner-text \{[^}]+\})',
                r'\1\n' + mobile_css,
                content
            )
            modified = True
        
        # 6. Update mobile media query
        if '@media (max-width: 768px)' in content and '.black-friday-banner-text-mobile' not in content:
            mobile_responsive = '''        
        .black-friday-banner-text {
            display: none;
        }
        
        .black-friday-banner-text-mobile {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
        }
        '''
            # Add to existing mobile media query
            content = re.sub(
                r'(@media \(max-width: 768px\) \{[\s\S]*?)(\.black-friday-banner-text \{)',
                r'\1' + mobile_responsive + r'\n        \2',
                content
            )
            modified = True
        
        # 7. Update dismissBanner function name to avoid conflicts
        content = content.replace('onclick="dismissBanner()"', 'onclick="dismissBFBanner()"')
        content = content.replace('function dismissBanner()', 'function dismissBFBanner()')
        modified = True
        
        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Upgraded {html_file} to V2")
            updated_count += 1
        else:
            print(f"→ {html_file} no changes needed")
            
    except Exception as e:
        print(f"✗ Error processing {html_file}: {str(e)}")

print(f"\n{'='*50}")
print(f"Banner V2 upgrade complete!")
print(f"Updated: {updated_count} files")
print(f"{'='*50}")
