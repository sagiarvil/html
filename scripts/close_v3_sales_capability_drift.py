#!/usr/bin/env python3
"""Close late-build drift between V3 sales copy and the V3 capability contract.

`enforce_v3_sales_contract.py` intentionally simplifies the comparison table late
in the build, but the product contract still requires two customer-visible
boundaries: up to 30 evidence-bound page-level machine surfaces and versioned ZIP
delivery. Re-assert only those two boundaries after the sales materializer.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
KEY_PAGES = [
    'index.html','tr/index.html','en/index.html','tr/platform/index.html','en/platform/index.html',
    'tr/methodology/index.html','en/methodology/index.html','tr/fiyatlandirma/index.html',
    'en/pricing/index.html','tr/fix-mandate/index.html','en/fix-mandate/index.html',
]

TR_NOTE = '''<p class="v3-delivery-boundary"><b>Makine yüzeyi ve teslim sınırı:</b> Tek kök llms.txt önerisi ve kanıt bulunan sayfalar için <b>30'a kadar sayfa bazlı Markdown manifesti</b> üretilebilir. Ücretli teslim, bulgulara göre içeriği değişen <b>sürümlenmiş ZIP</b> paketidir; sabit dosya sayısı taahhüt edilmez.</p>'''
EN_NOTE = '''<p class="v3-delivery-boundary"><b>Machine-surface and delivery boundary:</b> One proposed root llms.txt plus <b>up to 30 page-level Markdown manifests</b> may be produced for evidenced pages. Paid delivery is a <b>versioned ZIP</b> whose contents vary with evidenced findings; no fixed file count is promised.</p>'''

changed = 0
for rel in KEY_PAGES:
    path = ROOT / rel
    if not path.exists():
        raise SystemExit(f'V3 SALES/CAPABILITY DRIFT FAIL: missing key page {rel}')
    text = path.read_text(encoding='utf-8')
    if 'v3-capability-contract' not in text:
        raise SystemExit(f'V3 SALES/CAPABILITY DRIFT FAIL: missing V3 block {rel}')
    is_en = rel.startswith('en/')
    note = EN_NOTE if is_en else TR_NOTE
    # Replace an older copy if this pass has already run; otherwise insert once
    # immediately before the evidence boundary inside the V3 section.
    if 'class="v3-delivery-boundary"' in text:
        text = re.sub(r'<p class="v3-delivery-boundary">[\s\S]*?</p>', note, text, count=1)
    else:
        marker = '<p class="v3-boundary">'
        pos = text.find(marker, text.find('v3-capability-contract'))
        if pos < 0:
            raise SystemExit(f'V3 SALES/CAPABILITY DRIFT FAIL: missing boundary anchor {rel}')
        text = text[:pos] + note + '\n  ' + text[pos:]
    path.write_text(text, encoding='utf-8')
    changed += 1

print(f'V3 SALES/CAPABILITY DRIFT PASS: machine-surface and versioned ZIP boundaries reasserted on {changed} key pages.')
