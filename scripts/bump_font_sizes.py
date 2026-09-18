import os
import re
from pathlib import Path

CSS_DIR = Path('/Users/macair1/projects/html/assets/css')

replacements = [
    (re.compile(r'font-size:\s*10px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*10\.5px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*11px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*11\.5px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*12px'), r'font-size: 14px'),
    (re.compile(r'font-size:\s*12\.5px'), r'font-size: 14.5px'),
    (re.compile(r'font-size:\s*13px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*13\.5px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*\.8rem'), r'font-size: .95rem'),
    (re.compile(r'font-size:\s*\.85rem'), r'font-size: 1rem'),
    (re.compile(r'font-size:\s*\.88rem'), r'font-size: 1rem'),
    (re.compile(r'font-size:\s*\.9rem'), r'font-size: 1.05rem'),
    (re.compile(r'font-size:\s*\.92rem'), r'font-size: 1.05rem'),
    (re.compile(r'font-size:\s*\.95rem'), r'font-size: 1.05rem'),
]

for css_file in CSS_DIR.glob('*.css'):
    content = css_file.read_text(encoding='utf-8')
    orig_content = content
    for pattern, repl in replacements:
        content = pattern.sub(repl, content)
    
    if content != orig_content:
        css_file.write_text(content, encoding='utf-8')
        print(f"Updated {css_file.name}")

print("Font sizes bumped.")
