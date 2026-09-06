#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
CSS='<link rel="stylesheet" href="/assets/css/premium-experience.css?v=1">'
SKIP_PARTS={'.git','node_modules','functions','functions-firebase','scripts','tests'}

for p in ROOT.rglob('*.html'):
    if any(part in SKIP_PARTS for part in p.relative_to(ROOT).parts):
        continue
    text=p.read_text(encoding='utf-8')
    text=text.replace('$149','$99').replace('USD 149','USD 99')
    text=text.replace('"price": "149"','"price": "99"').replace('"price":"149"','"price":"99"')
    text=re.sub(r'\s*\((?:feat|fix|chore|refactor|docs|style|test):[^\n<]{0,240}\)\s*$', '\n', text, flags=re.I)
    if 'premium-experience.css' not in text and '</head>' in text:
        text=text.replace('</head>',CSS+'\n</head>',1)
    p.write_text(text,encoding='utf-8')

for rel in ['llms.txt','index.md','openapi.json']:
    p=ROOT/rel
    if p.exists():
        text=p.read_text(encoding='utf-8').replace('$149','$99').replace('USD 149','USD 99')
        p.write_text(text,encoding='utf-8')

print('Final public artifact pass: $99 contract normalized, commit metadata stripped, premium responsive layer attached.')
