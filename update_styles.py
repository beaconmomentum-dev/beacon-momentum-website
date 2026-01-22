import os
import re

# Configuration
TARGET_DIR = "/home/ubuntu/beacon-momentum-website"
EXCLUDE_DIRS = [".git", "node_modules", "server"]

# New Color Palette (Deep Ocean & Lighthouse Gold)
COLOR_MAP = {
    # Teal -> Deep Ocean Slate
    r"#0F766E": "#0F172A", 
    r"var\(--beacon-teal\)": "#0F172A",
    
    # Gold -> Amber Gold (Brighter)
    r"#D97706": "#F59E0B",
    r"var\(--beacon-gold\)": "#F59E0B",
    
    # Cream -> Slate 50 (Cooler White)
    r"#F8F5F1": "#F8FAFC",
    r"var\(--beacon-cream\)": "#F8FAFC",
    
    # Dark -> Slate 950 (Deepest Blue-Black)
    r"#1F1F1F": "#020617",
    r"var\(--beacon-dark\)": "#020617",
}

# Font Replacement
FONT_REPLACEMENT = {
    r"Playfair Display": "Space Grotesk",
    r"Inter": "Inter", # Keep Inter but ensure it's linked
}

def update_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    
    # 1. Update Colors
    for old, new in COLOR_MAP.items():
        content = re.sub(old, new, content, flags=re.IGNORECASE)
        
    # 2. Update Fonts
    for old, new in FONT_REPLACEMENT.items():
        content = re.sub(old, new, content)
        
    # 3. Inject New Google Fonts Link if missing
    if "<head>" in content and "Space+Grotesk" not in content:
        font_link = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
        # Replace existing font link or add new one
        if "fonts.googleapis.com" in content:
            content = re.sub(r'<link href="https://fonts.googleapis.com.*?>', font_link, content)
        else:
            content = content.replace("</head>", f"    {font_link}\n</head>")

    # 4. Update CSS Variables Root
    if ":root {" in content:
        new_root = """:root {
            --beacon-primary: #0F172A; /* Deep Ocean */
            --beacon-accent: #F59E0B; /* Lighthouse Gold */
            --beacon-background: #F8FAFC; /* Slate 50 */
            --beacon-foreground: #020617; /* Slate 950 */
            --beacon-glass: rgba(255, 255, 255, 0.1);
            --beacon-border: rgba(255, 255, 255, 0.15);
        }"""
        # Simple replacement for the specific root block structure we saw in index.html
        content = re.sub(r':root\s*{[^}]+}', new_root, content)

    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated: {filepath}")
    else:
        print(f"No changes: {filepath}")

def main():
    for root, dirs, files in os.walk(TARGET_DIR):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file.endswith(".html") or file.endswith(".css"):
                update_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
