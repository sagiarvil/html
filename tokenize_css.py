import os
import re

CSS_DIR = 'assets/css'

# Map of property + hex/rgba to CSS variable + fallback
REPLACEMENTS = [
    # Backgrounds (Base)
    (r'(background(-color)?\s*:\s*)(#14151a|#0a0b0e|#0a0f1c)(?!\w)', r'\1var(--theme-bg-base, \3)'),
    # Backgrounds (Surface/Card)
    (r'(background(-color)?\s*:\s*)(#1e2028|#181a22|#161b28|#1a2233|#1e293b|#16181d)(?!\w)', r'\1var(--theme-bg-surface, \3)'),
    # Backgrounds (Elevated/Hover)
    (r'(background(-color)?\s*:\s*)(#282b36|#2a2d39|#334155)(?!\w)', r'\1var(--theme-bg-elevated, \3)'),
    
    # Borders (Lines)
    (r'(border(-[a-z]+)?\s*:\s*[^;]*?)(rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[5-9]\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1[0-5]?\s*\)|#282b36|#1e293b|#334155)', r'\1var(--theme-border, \3)'),
    (r'(border(-color)?\s*:\s*)(rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[5-9]\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.1[0-5]?\s*\)|#282b36|#1e293b|#334155)(?!\w)', r'\1var(--theme-border, \3)'),

    # Text (Primary / Headings) - We specifically target common text colors
    (r'(color\s*:\s*)(#f8fafc|#ededed|#e2e8f0)(?!\w)', r'\1var(--theme-text-primary, \2)'),
    # Text (Secondary / Muted)
    (r'(color\s*:\s*)(#cbd5e1|#94a3b8|#64748b|#475569)(?!\w)', r'\1var(--theme-text-secondary, \2)'),
]

# We need to be careful with #ffffff and #000000. 
# We'll only replace color: #ffffff if it's NOT inside a button-looking class. 
# Actually, the fallback var(--theme-text-strong, #ffffff) will be overridden in light mode to #0f172a. 
# If it's a button, it might break. So we'll manually patch buttons later or add a specific override.
REPLACEMENTS.append((r'(color\s*:\s*)(#ffffff|#fff)(?!\w)', r'\1var(--theme-text-strong, \2)'))

def process_css():
    count = 0
    for file in os.listdir(CSS_DIR):
        if not file.endswith('.css'): continue
        filepath = os.path.join(CSS_DIR, file)
        with open(filepath, 'r') as f:
            content = f.read()
        
        original_content = content
        
        for pattern, replacement in REPLACEMENTS:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
            
        if content != original_content:
            with open(filepath, 'w') as f:
                f.write(content)
            count += 1
            print(f"Processed: {file}")
    
    print(f"Total files tokenized: {count}")

if __name__ == '__main__':
    process_css()
