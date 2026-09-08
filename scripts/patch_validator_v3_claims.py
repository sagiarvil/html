#!/usr/bin/env python3
"""Hard-stop legacy/unverified claims inside the customer-side validator runtime."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / 'assets/js/validator.js'
text = path.read_text(encoding='utf-8')

replacements = (
    ('14KB AST bütçe aşımı', 'ölçülen HTML yükü ve semantik yapı sorunları'),
    ('14KB AST Budama Şablonu', 'HTML Yük ve Semantik Yapı Optimizasyonu'),
    ('14KB AST budget window', 'measured HTML payload and semantic-structure budget'),
    ('14KB AST budget', 'measured HTML payload budget'),
    ('Sub-14KB AST Purge Template', 'HTML Payload & Semantic Structure Template'),
    ('14KB', 'HTML payload'),
)
for old, new in replacements:
    text = text.replace(old, new)

text = text.replace('Wikidata sameAs QID and Corporation triples anchor brand in Google &amp; Perplexity.', 'Verified sameAs and Organization/Corporation schema strengthen explicit entity identity signals.')
text = text.replace('Wikidata QID ve Corporation şeması doğrudan &lt;head&gt; içine eklenerek marka teyit edilir.', 'Doğrulanmış sameAs ve Organization/Corporation schema alanlarıyla açık varlık kimliği güçlendirilir.')
text = text.replace('qualified B2B enterprise leads leaking to competitors monthly', 'website-side source-readiness risk that can suppress commercial discovery')
text = text.replace('aylık nitelikli kurumsal müşteri / B2B satış fırsatlarının doğrudan rakiplere yönlendirildiği tespit edilmiştir', 'site kaynaklı görünürlük ve kaynak-hazırlığı riskleri tespit edilmiştir')
text = text.replace('High-intent commercial pipeline is suppressed due to crawler truncation and missing schema.', 'Commercial discovery can be weakened by measurable crawl, content-structure and schema issues.')

path.write_text(text, encoding='utf-8')

for forbidden in ('14KB', '14kb'):
    if forbidden in path.read_text(encoding='utf-8'):
        raise SystemExit(f'VALIDATOR V3 CLAIM PATCH FAIL: {forbidden} remains')

print('VALIDATOR V3 CLAIM PATCH PASS: fixed-window and unsupported causal claims removed from client runtime.')
