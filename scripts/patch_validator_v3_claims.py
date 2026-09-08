#!/usr/bin/env python3
"""Hard-stop legacy/unverified claims inside the customer-side validator runtime."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / 'assets/js/validator.js'
text = path.read_text(encoding='utf-8')

replacements = (
    ('14KB AST bütçe aşımı', 'ölçülen HTML yükü ve semantik yapı sorunları'),
    ('14KB AST Budama Şablonu', 'HTML Yük ve Semantik Yapı Optimizasyonu'),
    ('14KB AST budget window', 'measured HTML payload and semantic-structure budget'),
    ('14KB AST budget', 'measured HTML payload budget'),
    ('Sub-14KB AST Purge Template', 'HTML Payload & Semantic Structure Template'),
)
for old, new in replacements:
    text = text.replace(old, new)

# Case-insensitive absolute cleanup for every remaining fixed-window spelling.
text = re.sub(r'14\s*kb', 'HTML payload', text, flags=re.I)
text = re.sub(r'14[,.]?336\s*(?:bytes?|bayt)', 'measured HTML payload', text, flags=re.I)

text = text.replace('Wikidata sameAs QID and Corporation triples anchor brand in Google &amp; Perplexity.', 'Verified sameAs and Organization/Corporation schema strengthen explicit entity identity signals.')
text = text.replace('Wikidata QID ve Corporation şeması doğrudan &lt;head&gt; içine eklenerek marka teyit edilir.', 'Doğrulanmış sameAs ve Organization/Corporation schema alanlarıyla açık varlık kimliği güçlendirilir.')
text = text.replace('qualified B2B enterprise leads leaking to competitors monthly', 'website-side source-readiness risk that can suppress commercial discovery')
text = text.replace('aylık nitelikli kurumsal müşteri / B2B satış fırsatlarının doğrudan rakiplere yönlendirildiği tespit edilmiştir', 'site kaynaklı görünürlük ve kaynak-hazırlığı riskleri tespit edilmiştir')
text = text.replace('High-intent commercial pipeline is suppressed due to crawler truncation and missing schema.', 'Commercial discovery can be weakened by measurable crawl, content-structure and schema issues.')

path.write_text(text, encoding='utf-8')

final_text = path.read_text(encoding='utf-8')
remaining = re.search(r'14\s*kb|14[,.]?336\s*(?:bytes?|bayt)', final_text, flags=re.I)
if remaining:
    start = max(0, remaining.start() - 80)
    end = min(len(final_text), remaining.end() + 120)
    raise SystemExit('VALIDATOR V3 CLAIM PATCH FAIL: ' + final_text[start:end])

print('VALIDATOR V3 CLAIM PATCH PASS: fixed-window and unsupported causal claims removed from client runtime.')
