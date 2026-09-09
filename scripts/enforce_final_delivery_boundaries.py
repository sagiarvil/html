#!/usr/bin/env python3
"""Re-assert the verified paid-delivery boundary after all claim scrubbers.

The capability block is generated earlier in the build. Later epistemic scrubbers may
normalize nearby prose. This final materializer keeps only two evidence-backed facts
that are already canonical in audit-profile/delivery tests: max 30 page-level machine
surfaces and versioned ZIP delivery.
"""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
PAGES=[
 'index.html','tr/index.html','en/index.html','tr/platform/index.html','en/platform/index.html',
 'tr/methodology/index.html','en/methodology/index.html','tr/fiyatlandirma/index.html',
 'en/pricing/index.html','tr/fix-mandate/index.html','en/fix-mandate/index.html',
]

def inject(path:Path)->None:
    text=path.read_text(encoding='utf-8')
    text=re.sub(r'\s*<p class="v3-delivery-boundary">.*?</p>','',text,flags=re.S)
    is_en=path.as_posix().startswith(str(ROOT/'en')) or '/en/' in path.as_posix()
    boundary=(
        '<p class="v3-delivery-boundary"><b>Paid delivery boundary:</b> up to 30 evidence-bound page-level Markdown machine surfaces and a versioned ZIP delivery package.</p>'
        if is_en else
        '<p class="v3-delivery-boundary"><b>Ücretli teslim sınırı:</b> Kanıtlanan URL’lere bağlı 30\'a kadar sayfa bazlı Markdown makine yüzeyi ve sürümlenmiş ZIP teslim paketi.</p>'
    )
    # A word-boundary after the closing quote is invalid here because both the quote
    # and following whitespace are non-word characters. Use an explicit tag boundary.
    pattern=re.compile(r'(<section class="v3-capability-contract"(?=\s|>).*?)(</section>)',re.S)
    updated,count=pattern.subn(lambda m:m.group(1)+boundary+m.group(2),text,count=1)
    if count!=1: raise SystemExit(f'FINAL DELIVERY BOUNDARY FAIL: v3 block missing in {path.relative_to(ROOT)}')
    path.write_text(updated,encoding='utf-8')

for rel in PAGES: inject(ROOT/rel)
for rel in PAGES:
    text=(ROOT/rel).read_text(encoding='utf-8')
    if not (("30'a kadar" in text) or re.search(r'up to 30',text,re.I)) or not re.search(r'ZIP',text,re.I):
        raise SystemExit(f'FINAL DELIVERY BOUNDARY FAIL: boundary missing in {rel}')
print('FINAL DELIVERY BOUNDARY PASS: up-to-30 machine surfaces + versioned ZIP restored on 11 canonical sales surfaces.')
