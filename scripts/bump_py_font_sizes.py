import os
import re
from pathlib import Path

PY_DIR = Path('/Users/macair1/projects/html/scripts')

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

for py_file in PY_DIR.glob('*.py'):
    content = py_file.read_text(encoding='utf-8')
    orig_content = content
    for pattern, repl in replacements:
        content = pattern.sub(repl, content)
    
    if content != orig_content:
        py_file.write_text(content, encoding='utf-8')
        print(f"Updated {py_file.name}")

print("PY font sizes bumped.")
