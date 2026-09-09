#!/usr/bin/env python3
"""Syntax-safe cleanup for generated Enterprise Analyzer public copy."""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
APP=ROOT/'enterprise-analyzer/app.js'
text=APP.read_text(encoding='utf-8')
replacements=(
 ('14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js','14_CLOUDFLARE_WORKER_HTML_PAYLOAD_OPTIMIZER.js'),
 ('14KB altı mikro-HTML','ölçülen HTML yükünü azaltmaya yönelik mikro-HTML'),
 ('14KB AST','HTML yük ve semantik yapı'),('14KB','HTML_PAYLOAD'),
 ("Bu yol haritasındaki onarımlar tamamlandığında AI Visibility Skoru 70'ten 92+'ye yükselecektir.",'Skor değişimi yalnızca yeniden tarama ile ölçülür; sabit skor artışı, sıralama, atıf veya gelir garantisi verilmez.'),
 ('Siteniz Google AI Overviews, Perplexity ve Claude botları tarafından taranabilmekte ancak yapısal bariyerler (eksik canonical, ağır HTML, isimsiz kontroller, mixed content riski) nedeniyle alıntı güven puanı (Citation Confidence) baskılanmaktadır.','Tarama sonucu ölçülen erişim, canonical, HTML yükü, erişilebilirlik ve güvenlik bulguları kanıt seviyeleriyle raporlanır; dış AI sistemlerinin atıf veya tavsiye kararı garanti edilmez.'),
 ('yapay zeka arama motorları ve botlar tarafından taranabilir ve önerilebilir durumda.','ölçülen teknik erişim ve kaynak-hazırlığı kontrollerinde güçlü durumda.'),
 ('için tespit edilen engeller yapay zeka görünürlük ve alıntı güven puanını baskılıyor.','için ölçülen teknik engeller kaynak-hazırlığı ve bulunabilirlik riskini artırıyor.'),
 ('ampirik 15-prompt paneli','sağlayıcı anahtarıyla çalışan gözlem paneli'),('15 nötr prompt','nötr prompt'),('15 neutral prompt','neutral prompt'))
for old,new in replacements:text=text.replace(old,new)
text=re.sub(r'14\s*kb','HTML_PAYLOAD',text,flags=re.I)
text=re.sub(r'14[,.]?336(?:\s*(?:bytes?|bayt))?','MEASURED_HTML_PAYLOAD',text,flags=re.I)
text=re.sub(r'(?i)\b15[- ]prompt\b','prompt',text)
text=re.sub(r'(?i)15\s+nötr\s+prompt','nötr prompt',text)
text=re.sub(r'(?i)15\s+neutral\s+prompt','neutral prompt',text)
text=re.sub(r'(?i)Wikidata[^\n<]{0,80}(?:SPARQL|query|sorgu)','public entity evidence',text)
text=re.sub(r'(?i)(?:SPARQL|query|sorgu)[^\n<]{0,80}Wikidata','public entity evidence',text)
APP.write_text(text,encoding='utf-8')

# Generated sample-report HTML can re-materialize fixed prompt counts after earlier
# source cleanup. Normalize those exact public prose fragments before the final gate.
REPORTS=(ROOT/'enterprise-analyzer/htmlandhtml-ai-report.html',ROOT/'enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html')
for path in REPORTS:
    if not path.exists():continue
    s=path.read_text(encoding='utf-8')
    s=re.sub(r'(?i)\b15[- ]prompt\b','provider-backed query',s)
    s=re.sub(r'(?i)15\s+nötr\s+prompt','en fazla 3 nötr sorgu',s)
    s=re.sub(r'(?i)15\s+neutral\s+prompt','up to 3 neutral queries',s)
    path.write_text(s,encoding='utf-8')

errors=[]
for path in (APP,*REPORTS):
    if not path.exists():continue
    s=path.read_text(encoding='utf-8')
    if re.search(r'14\s*kb|14[,.]?336',s,flags=re.I):errors.append(f'fixed-window claim remains: {path.name}')
    if re.search(r'\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt',s,flags=re.I):errors.append(f'fixed prompt count remains: {path.name}')
    if path==APP and re.search(r'(?:Wikidata[^\n<]{0,80}(?:SPARQL|query|sorgu)|(?:SPARQL|query|sorgu)[^\n<]{0,80}Wikidata)',s,flags=re.I):errors.append('unsupported live Wikidata query claim remains')
if errors:raise SystemExit('ENTERPRISE ANALYZER V3 CLAIM PATCH FAIL: '+'; '.join(errors))
print('ENTERPRISE ANALYZER V3 CLAIM PATCH PASS: unsupported fixed-window, fixed-prompt and live-query claims removed across runtime and sample reports.')
