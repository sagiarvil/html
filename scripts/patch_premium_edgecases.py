#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'en/index.html'
if p.exists():
    text=p.read_text(encoding='utf-8')
    start='<!-- 08 AUTHORITY & GUIDES -->'; end='<!-- 09 SHORT FAQ -->'
    if start in text and end in text:
        a=text.index(start); b=text.index(end,a)
        text=text[:a]+text[b:]
        p.write_text(text,encoding='utf-8')
    start_alt='<!-- 08 AUTHORITY & REHBERLER -->'
    if start_alt in text and end in text:
        a=text.index(start_alt); b=text.index(end,a)
        text=text[:a]+text[b:]
        p.write_text(text,encoding='utf-8')
print('Premium edge-case patch applied.')
