import os
import re
from pathlib import Path

JS_DIR = Path('/Users/macair1/projects/html/assets/js')

replacements = [
    (re.compile(r'font-size:\s*10px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*10\.5px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*11px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*11\.5px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*12px'), r'font-size: 14px'),
    (re.compile(r'font-size:\s*12\.5px'), r'font-size: 14.5px'),
    (re.compile(r'font-size:\s*13px'), r'font-size: 15px'),
    (re.compile(r'font-size:\s*13\.5px'), r'font-size: 15px')
]

for js_file in JS_DIR.glob('*.js'):
    content = js_file.read_text(encoding='utf-8')
    orig_content = content
    for pattern, repl in replacements:
        content = pattern.sub(repl, content)
    
    if content != orig_content:
        js_file.write_text(content, encoding='utf-8')
        print(f"Updated {js_file.name}")

print("JS font sizes bumped.")
