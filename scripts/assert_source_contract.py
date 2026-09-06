#!/usr/bin/env python3
from pathlib import Path
import re

# Raw-source guard runs before all build materializers; legacy pricing cannot hide behind deploy transforms.
ROOT=Path(__file__).resolve().parents[1]
SKIP={'.git','node_modules','functions','functions-firebase','scripts','tests','.github'}
paths=[]
for p in ROOT.rglob('*.html'):
    if not any(part in SKIP for part in p.parts): paths.append(p)
for rel in ['openapi.json','audit-profile.json','assets/js/validator.js','assets/js/enterprise-runtime.js']:
    p=ROOT/rel
    if p.exists(): paths.append(p)

required=[
 ROOT/'index.html',ROOT/'tr/index.html',ROOT/'en/index.html',ROOT/'checkout.html',
 ROOT/'tr/fiyatlandirma/index.html',ROOT/'en/pricing/index.html',
 ROOT/'tr/kullanim-kosullari/index.html',ROOT/'en/terms/index.html',
 ROOT/'tr/gizlilik/index.html',ROOT/'en/privacy/index.html',
 ROOT/'tr/iade-politikasi/index.html',ROOT/'en/refund/index.html',
 ROOT/'tr/iletisim/index.html',ROOT/'en/contact/index.html',
]
errors=[]
for p in required:
    if not p.exists(): errors.append(f'missing required public surface: {p.relative_to(ROOT)}')
for p in sorted(set(paths)):
    s=p.read_text(encoding='utf-8')
    if '$149' in s or '149 USD' in s: errors.append(f'legacy $149 in raw public source: {p.relative_to(ROOT)}')
    if 'Full Site Fix Mandate' in s: errors.append(f'legacy product name in raw public source: {p.relative_to(ROOT)}')
    if p.suffix=='.html' and re.search(r'\breçete(?:si|yi|sini)?\b',s,re.I): errors.append(f'novice prescription wording in raw public source: {p.relative_to(ROOT)}')
if errors: raise SystemExit('RAW SOURCE CONTRACT FAIL\n- '+'\n- '.join(errors))
print(f'RAW SOURCE CONTRACT PASS: {len(set(paths))} public source surfaces contain no $149, legacy mandate naming or prescription wording.')
