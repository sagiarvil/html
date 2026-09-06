#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
PREMIUM='<link rel="stylesheet" href="/assets/css/premium-experience.css?v=1">'
ENTERPRISE='<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">'
RUNTIME='<script src="/assets/js/enterprise-runtime.js?v=1"></script>'
SKIP_PARTS={'.git','node_modules','functions','functions-firebase','scripts','tests'}

for p in ROOT.rglob('*.html'):
    if any(part in SKIP_PARTS for part in p.relative_to(ROOT).parts):
        continue
    text=p.read_text(encoding='utf-8')
    text=text.replace('$149','$99').replace('USD 149','USD 99')
    text=text.replace('"price": "149"','"price": "99"').replace('"price":"149"','"price":"99"')
    text=text.replace('Düzeltme reçetesi','Uygulama planı').replace('düzeltme reçetesi','uygulama planı')
    text=text.replace('Fix Prescription','Implementation Blueprint').replace('fix prescription','implementation blueprint')
    text=re.sub(r'\s*\((?:feat|fix|chore|refactor|docs|style|test):[^\n<]{0,240}\)\s*$', '\n', text, flags=re.I)
    if 'premium-experience.css' not in text and '</head>' in text:
        text=text.replace('</head>',PREMIUM+'\n</head>',1)
    if 'enterprise-system.css' not in text and '</head>' in text:
        text=text.replace('</head>',ENTERPRISE+'\n</head>',1)
    if 'id="scanForm"' in text and 'enterprise-runtime.js' not in text and '</body>' in text:
        text=text.replace('</body>',RUNTIME+'\n</body>',1)
    p.write_text(text,encoding='utf-8')

# Runtime locale dictionaries are build artifacts too. Never let a language switch resurrect old price/copy.
validator=ROOT/'assets/js/validator.js'
if validator.exists():
    js=validator.read_text(encoding='utf-8')
    js=js.replace('$149','$99')
    js=js.replace('Uygulama reçetesi','Uygulama planı').replace('uygulama reçetesi','uygulama planı')
    js=js.replace('implementation prescription','implementation blueprint').replace('Implementation prescription','Implementation Blueprint')
    js=js.replace('Fix with a $99 mandate','Unlock the $99 implementation blueprint')
    js=js.replace('$99 mandate ile düzeltin','$99 uygulama planını açın')
    validator.write_text(js,encoding='utf-8')

for rel in ['llms.txt','index.md','openapi.json']:
    p=ROOT/rel
    if p.exists():
        text=p.read_text(encoding='utf-8').replace('$149','$99').replace('USD 149','USD 99')
        text=text.replace('Fix Prescription','Implementation Blueprint').replace('fix prescription','implementation blueprint')
        p.write_text(text,encoding='utf-8')

print('Final public artifact pass: $99 normalized, legacy prescription copy removed, enterprise responsive system and free-result runtime attached.')
