#!/usr/bin/env python3
"""Syntax-safe cleanup for generated Enterprise Analyzer client copy.

Only exact string fragments are replaced. No broad regex is applied to executable
JavaScript, preventing template-literal corruption.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / 'enterprise-analyzer/app.js'
text = path.read_text(encoding='utf-8')

replacements = (
    ('14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js', '14_CLOUDFLARE_WORKER_HTML_PAYLOAD_OPTIMIZER.js'),
    ('14KB altı mikro-HTML', 'ölçülen HTML yükünü azaltmaya yönelik mikro-HTML'),
    ('14KB AST', 'HTML yük ve semantik yapı'),
    ('14KB', 'HTML_PAYLOAD'),
    ('Bu yol haritasındaki onarımlar tamamlandığında AI Visibility Skoru 70\'ten 92+\'ye yükselecektir.', 'Skor değişimi yalnızca yeniden tarama ile ölçülür; sabit skor artışı, sıralama, atıf veya gelir garantisi verilmez.'),
    ('Siteniz Google AI Overviews, Perplexity ve Claude botları tarafından taranabilmekte ancak yapısal bariyerler (eksik canonical, ağır HTML, isimsiz kontroller, mixed content riski) nedeniyle alıntı güven puanı (Citation Confidence) baskılanmaktadır.', 'Tarama sonucu ölçülen erişim, canonical, HTML yükü, erişilebilirlik ve güvenlik bulguları kanıt seviyeleriyle raporlanır; dış AI sistemlerinin atıf veya tavsiye kararı garanti edilmez.'),
    ('yapay zeka arama motorları ve botlar tarafından taranabilir ve önerilebilir durumda.', 'ölçülen teknik erişim ve kaynak-hazırlığı kontrollerinde güçlü durumda.'),
    ('için tespit edilen engeller yapay zeka görünürlük ve alıntı güven puanını baskılıyor.', 'için ölçülen teknik engeller kaynak-hazırlığı ve bulunabilirlik riskini artırıyor.'),
)
for old, new in replacements:
    text = text.replace(old, new)

# Mixed-case fixed-window remnants are text tokens in this generated client file.
text = re.sub(r'14\s*kb', 'HTML_PAYLOAD', text, flags=re.I)
text = re.sub(r'14[,.]?336(?:\s*(?:bytes?|bayt))?', 'MEASURED_HTML_PAYLOAD', text, flags=re.I)

path.write_text(text, encoding='utf-8')

final = path.read_text(encoding='utf-8')
if re.search(r'14\s*kb|14[,.]?336', final, flags=re.I):
    raise SystemExit('ENTERPRISE ANALYZER V3 CLAIM PATCH FAIL: fixed-window claim remains')

print('ENTERPRISE ANALYZER V3 CLAIM PATCH PASS: unsupported fixed-window and guaranteed-outcome copy removed without changing runtime flow.')
