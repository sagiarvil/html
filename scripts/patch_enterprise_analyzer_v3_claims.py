#!/usr/bin/env python3
"""Syntax-safe cleanup for generated Enterprise Analyzer client copy.

Only bounded public-claim fragments are normalized. Executable structure is kept
intact while unmeasured fixed-window, prompt-count, live-probe and guaranteed-
outcome language is removed before the final sales/evidence gate runs.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
TARGETS = (
    ROOT / 'enterprise-analyzer/app.js',
    ROOT / 'enterprise-analyzer.html',
    ROOT / 'enterprise-analyzer/index.html',
    ROOT / 'enterprise-analyzer/htmlandhtml-ai-report.html',
    ROOT / 'enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html',
)

COMMON_REPLACEMENTS = (
    ('14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js', '14_CLOUDFLARE_WORKER_HTML_PAYLOAD_OPTIMIZER.js'),
    ('14KB altı mikro-HTML', 'ölçülen HTML yükünü azaltmaya yönelik mikro-HTML'),
    ('14KB AST', 'HTML yük ve semantik yapı'),
    ('14KB', 'HTML_PAYLOAD'),
    ('15-prompt paneli', 'sağlayıcı-verisi varsa sorgu gözlem paneli'),
    ('15-prompt', 'provider-backed query'),
    ('15 nötr prompt', 'en fazla 3 nötr sorgu'),
    ('15 neutral prompt', 'up to 3 neutral queries'),
    ('Canlı Wikidata API Sorgusu', 'Wikidata API referansı'),
    ('canlı Wikidata API sorgusu', 'Wikidata API referansı'),
    ('Wikidata: QID Taranıyor', 'Wikidata: NOT_MEASURED'),
    ('Wikidata: QID Scanning', 'Wikidata: NOT_MEASURED'),
    ('Bu yol haritasındaki onarımlar tamamlandığında AI Visibility Skoru 70\'ten 92+\'ye yükselecektir.', 'Skor değişimi yalnızca yeniden tarama ile ölçülür; sabit skor artışı, sıralama, atıf veya gelir garantisi verilmez.'),
    ('Siteniz Google AI Overviews, Perplexity ve Claude botları tarafından taranabilmekte ancak yapısal bariyerler (eksik canonical, ağır HTML, isimsiz kontroller, mixed content riski) nedeniyle alıntı güven puanı (Citation Confidence) baskılanmaktadır.', 'Tarama sonucu ölçülen erişim, canonical, HTML yükü, erişilebilirlik ve güvenlik bulguları kanıt seviyeleriyle raporlanır; dış AI sistemlerinin atıf veya tavsiye kararı garanti edilmez.'),
    ('yapay zeka arama motorları ve botlar tarafından taranabilir ve önerilebilir durumda.', 'ölçülen teknik erişim ve kaynak-hazırlığı kontrollerinde güçlü durumda.'),
    ('için tespit edilen engeller yapay zeka görünürlük ve alıntı güven puanını baskılıyor.', 'için ölçülen teknik engeller kaynak-hazırlığı ve bulunabilirlik riskini artırıyor.'),
)

for path in TARGETS:
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    for old, new in COMMON_REPLACEMENTS:
        text = text.replace(old, new)

    # Fixed-window remnants are copy tokens, not executable identifiers.
    text = re.sub(r'14\s*kb', 'HTML_PAYLOAD', text, flags=re.I)
    text = re.sub(r'14[,.]?336(?:\s*(?:bytes?|bayt))?', 'MEASURED_HTML_PAYLOAD', text, flags=re.I)

    # Any remaining prompt-count promise is downgraded to the currently bounded
    # provider-observation contract. Keep this substitution text-only and short.
    text = re.sub(r'\b15[- ]prompt\b', 'provider-backed query', text, flags=re.I)
    text = re.sub(r'\b15\s+nötr\s+prompt\b', 'en fazla 3 nötr sorgu', text, flags=re.I)
    text = re.sub(r'\b15\s+neutral\s+prompt\b', 'up to 3 neutral queries', text, flags=re.I)

    # Do not claim a live Wikidata measurement unless the response actually
    # carries that measured result. Static/analyzer copy stays reference-only.
    text = re.sub(r'Canlı\s+Wikidata\s+(?:API\s+)?Sorgusu', 'Wikidata API referansı', text, flags=re.I)
    text = re.sub(r'Live\s+Wikidata\s+(?:API\s+)?Query', 'Wikidata API reference', text, flags=re.I)

    path.write_text(text, encoding='utf-8')

problems = []
for path in TARGETS:
    if not path.exists():
        continue
    final = path.read_text(encoding='utf-8')
    if re.search(r'14\s*kb|14[,.]?336', final, flags=re.I):
        problems.append(f'fixed-window claim remains: {path.relative_to(ROOT)}')
    if re.search(r'\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt', final, flags=re.I):
        problems.append(f'fixed prompt-count claim remains: {path.relative_to(ROOT)}')
    if re.search(r'(?:Wikidata[^\n<]{0,80}(?:SPARQL|query|sorgu)|(?:SPARQL|query|sorgu)[^\n<]{0,80}Wikidata)', final, flags=re.I):
        problems.append(f'unverified Wikidata query claim remains: {path.relative_to(ROOT)}')

if problems:
    raise SystemExit('ENTERPRISE ANALYZER V3 CLAIM PATCH FAIL\n- ' + '\n- '.join(problems))

print('ENTERPRISE ANALYZER V3 CLAIM PATCH PASS: fixed-window, prompt-count, live-probe and guaranteed-outcome copy normalized.')
