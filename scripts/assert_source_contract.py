#!/usr/bin/env python3
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
paths=[
 ROOT/'index.html',ROOT/'tr/index.html',ROOT/'en/index.html',ROOT/'checkout.html',
 ROOT/'tr/fiyatlandirma/index.html',ROOT/'en/pricing/index.html',
 ROOT/'tr/kullanim-kosullari/index.html',ROOT/'en/terms/index.html',
 ROOT/'tr/iletisim/index.html',ROOT/'en/contact/index.html',
]
errors=[]
for p in paths:
    if not p.exists(): errors.append(f'missing: {p.relative_to(ROOT)}'); continue
    s=p.read_text(encoding='utf-8')
    if '$149' in s or '149 USD' in s: errors.append(f'legacy $149 in raw source: {p.relative_to(ROOT)}')
    if 'Full Site Fix Mandate' in s: errors.append(f'legacy product name in raw source: {p.relative_to(ROOT)}')
    if re.search(r'\breçete(?:si|yi|sini)?\b',s,re.I): errors.append(f'novice prescription wording in raw source: {p.relative_to(ROOT)}')
if errors: raise SystemExit('RAW SOURCE CONTRACT FAIL\n- '+'\n- '.join(errors))
print('RAW SOURCE CONTRACT PASS: no $149, legacy mandate naming or prescription wording in primary raw funnel sources.')
