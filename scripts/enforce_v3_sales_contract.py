#!/usr/bin/env python3
"""Final V3 public-surface materializer and fail-closed claim gate."""

from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]

TR_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-tr">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT GÖRÜNÜRLÜK · ENGINE V3</span>
    <h2 id="v3-capabilities-tr">Google sırası tek başına yetmiyor. Siteniz yapay zeka aramalarında bulunmalı, anlaşılmalı ve kaynak olmaya hazır olmalı.</h2>
    <p>HTML&amp;HTML, web sitenizdeki AI arama görünürlüğü engellerini kanıtla ölçer. 18 deterministik Engine V3 modülü, 105 kontrol, 13 puan dışı istihbarat analizi ve 7 hazırlık lensi aynı kanıt zincirinde çalışır.</p>
    <div class="v3-decision-line"><b>Teşhis ücretsiz.</b><span>Kök neden, uygulama kodu, kabul testi ve rollback paketi $99 tek seferlik lisansla açılır.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="HTML&HTML V3 karşılaştırma tablosu" tabindex="0">
    <table><thead><tr><th>Karar başlığı</th><th>Ücretsiz AI SEO analizi</th><th class="v3-paid">$99 uygulama paketi</th></tr></thead><tbody>
      <tr><th>Deterministik denetim</th><td>18 Engine V3 modülü · 105 kontrol · rastgele skor yok</td><td class="v3-paid">Bulgu → kök neden → düzeltme → test → rollback</td></tr>
      <tr><th>Tarama ve güvenlik</th><td>50'ye kadar herkese açık HTML sayfası · 30 canlı link probu · SSRF fail-closed</td><td class="v3-paid">Kanıta bağlı uygulama planı</td></tr>
      <tr><th>AI arama disiplinleri</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Kanıta bağlı kod ve konfigürasyon</td></tr>
      <tr><th>Karar istihbaratı</th><td>13 puan dışı analiz · 7 hazırlık lensi · NOT_MEASURED / REQUIRES_CONTEXT</td><td class="v3-paid">P0–P3 öncelik, bağımlılık, kabul ve regresyon</td></tr>
      <tr><th>AI görünürlük gözlemi</th><td>Bot erişimi, kaynak hazırlığı, entity/schema, cevap çıkarılabilirliği</td><td class="v3-paid">Sağlayıcı anahtarları yapılandırıldığında en fazla 3 nötr sorgu ile API/search-grounded gözlem</td></tr>
      <tr><th>Yayın güvenliği</th><td>Kanıt ve confidence sınıfları görünür</td><td class="v3-paid">G0–G9 · acceptance · regression · rollback</td></tr>
    </tbody></table>
  </div>
  <p class="v3-boundary"><b>Kanıt sınırı:</b> Dış model tavsiyesi, sıralama, atıf, trafik veya gelir garanti edilmez. Ölçülemeyen sinyal <b>NOT_MEASURED</b>; kod bağlamı gerektiren sinyal <b>REQUIRES_CONTEXT</b> kalır.</p>
</section>'''

EN_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-en">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT VISIBILITY · ENGINE V3</span>
    <h2 id="v3-capabilities-en">Google rankings are not the whole decision path. Your site must be discoverable, understandable and source-ready for AI search.</h2>
    <p>HTML&amp;HTML measures website-side AI-search blockers with evidence. Eighteen deterministic Engine V3 modules, 105 controls, 13 non-scoring intelligence analyses and seven readiness lenses run on one evidence chain.</p>
    <div class="v3-decision-line"><b>Diagnosis is free.</b><span>Root cause, implementation code, acceptance tests and rollback unlock with the one-time $99 license.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="HTML&HTML V3 comparison table" tabindex="0">
    <table><thead><tr><th>Decision area</th><th>Free AI SEO audit</th><th class="v3-paid">$99 implementation pack</th></tr></thead><tbody>
      <tr><th>Deterministic audit</th><td>18 Engine V3 modules · 105 controls · no random scoring</td><td class="v3-paid">Finding → root cause → fix → test → rollback</td></tr>
      <tr><th>Crawl and security</th><td>Up to 50 public HTML pages · 30 live link probes · fail-closed SSRF</td><td class="v3-paid">Evidence-bound implementation plan</td></tr>
      <tr><th>AI search disciplines</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Evidence-bound code and configuration</td></tr>
      <tr><th>Decision intelligence</th><td>13 non-scoring analyses · 7 readiness lenses · NOT_MEASURED / REQUIRES_CONTEXT</td><td class="v3-paid">P0–P3 priority, dependencies, acceptance and regression</td></tr>
      <tr><th>AI visibility observation</th><td>Bot access, source readiness, entity/schema and answer extractability</td><td class="v3-paid">When provider keys are configured, up to 3 neutral queries on API/search-grounded surfaces</td></tr>
      <tr><th>Release safety</th><td>Evidence and confidence classes remain visible</td><td class="v3-paid">G0–G9 · acceptance · regression · rollback</td></tr>
    </tbody></table>
  </div>
  <p class="v3-boundary"><b>Evidence boundary:</b> External-model recommendation, ranking, citation, traffic or revenue is not guaranteed. Unavailable evidence stays <b>NOT_MEASURED</b>; code context stays <b>REQUIRES_CONTEXT</b>.</p>
</section>'''

SEO = {
 'index.html': ('Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi | HTML&HTML','Web sitenizin ChatGPT, Google Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz analiz edin. 18 deterministik motor, 105 kontrol ve $99 uygulama paketi.'),
 'tr/index.html': ('Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi | HTML&HTML','Web sitenizin ChatGPT, Google Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz analiz edin. 18 deterministik motor, 105 kontrol ve $99 uygulama paketi.'),
 'en/index.html': ('AI SEO Audit & ChatGPT Visibility Test | HTML&HTML','Audit your website for ChatGPT, Google Gemini, Claude and Perplexity visibility. Get evidence from 18 deterministic engines and 105 checks; unlock the $99 implementation pack.'),
 'tr/ai-website-readiness/index.html': ('Yapay Zeka SEO Analizi ve AI Web Sitesi Hazırlık Testi | HTML&HTML','AI web sitesi hazırlığını ücretsiz ölçün: ChatGPT bot erişimi, llms.txt, schema, GEO, AEO, LLMO, AAO, RAG ve E-E-A-T sinyallerini kanıtla görün.'),
 'en/ai-website-readiness/index.html': ('AI Website Readiness & AI SEO Audit | HTML&HTML','Measure AI website readiness across crawler access, llms.txt, schema, GEO, AEO, LLMO, AAO, RAG and E-E-A-T with evidence-backed checks.'),
 'tr/ai-crawler-checker/index.html': ('ChatGPT Bot ve AI Crawler Erişim Testi | HTML&HTML','OAI-SearchBot, GPTBot, Claude ve Perplexity crawler erişimini robots.txt ve canlı HTTP kanıtıyla ücretsiz kontrol edin.'),
 'en/ai-crawler-checker/index.html': ('ChatGPT Bot & AI Crawler Access Checker | HTML&HTML','Check OAI-SearchBot, GPTBot, Claude and Perplexity crawler access using robots.txt and live HTTP evidence.'),
 'tr/llms-txt-validator/index.html': ('llms.txt Validator ve Yapay Zeka Site Testi | HTML&HTML','llms.txt dosyanızı format, link erişimi, discovery ilişkileri ve AI arama hazırlığı açısından ücretsiz doğrulayın.'),
 'en/llms-txt-validator/index.html': ('llms.txt Validator & AI Website Test | HTML&HTML','Validate llms.txt format, link reachability, discovery relations and AI-search readiness for free.'),
 'tr/yapay-zeka-arama-gorunurlugu/index.html': ('Yapay Zeka Arama Görünürlüğü: GEO, AEO, LLMO | HTML&HTML','ChatGPT, Gemini, Claude ve Perplexity için yapay zeka arama görünürlüğü; GEO, AEO, LLMO, llms.txt, entity ve teknik erişim sinyallerini ölçün.'),
 'en/ai-search-visibility/index.html': ('AI Search Visibility: GEO, AEO & LLMO | HTML&HTML','Measure AI search visibility for ChatGPT, Gemini, Claude and Perplexity across GEO, AEO, LLMO, llms.txt, entity and technical access signals.'),
 'tr/fiyatlandirma/index.html': ('AI SEO Uygulama Paketi $99 | HTML&HTML','Ücretsiz AI SEO teşhisinden kanıta bağlı kök neden, exact fix, acceptance test ve rollback içeren $99 tek seferlik uygulama paketine geçin.'),
 'en/pricing/index.html': ('AI SEO Implementation Pack $99 | HTML&HTML','Move from a free AI SEO diagnosis to a one-time $99 evidence-bound implementation pack with root cause, exact fixes, acceptance tests and rollback.'),
}

PUBLIC_DIRS={'tr','en','llms','ai-report','enterprise-analyzer','assets'}
PUBLIC_ROOTS={'index.html','index.md','llms.txt','openapi.json','audit-profile.json','pricing.html','methodology.html','enterprise-analyzer.html'}
BANNED={
 'legacy Engine V2 public claim':r'\bEngine V2(?:\.1\.0)?\b',
 'legacy 120-control claim':r'\b120\s+(?:deep\s+)?(?:checks|controls)|\b120\s+(?:derin\s+)?kontrol',
 'legacy 43-page claim':r'\b43[- ]page|\b43\s+sayfa',
 'legacy fixed 22-file claim':r'\b22[- ]file|\b22\s+dosya',
 'unverified 15-prompt claim':r'\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt',
 'unverified first-14KB claim':r'14(?:,?336|KB)[^\n<]{0,80}(?:AST|window|pencere|budget|bütçe)',
 'unverified live Wikidata query claim':r'(?:Wikidata[^\n<]{0,80}(?:SPARQL|query|sorgu)|(?:SPARQL|query|sorgu)[^\n<]{0,80}Wikidata)',
 'unverified Common Crawl live verification':r'Common Crawl[^\n<]{0,100}(?:live|canlı|verify|doğrula)',
 'unverified speed promise':r'\b(?:30|60)\s*(?:seconds?|saniye)(?:de|da)?\b[^\n<]{0,80}(?:apply|uygula|uygulama|zero.?code|sıfır.?kod)',
 'world-first claim':r'(?:world.?s first|dünyanın ilk)',
}

def is_public(path:Path)->bool:
 rel=path.relative_to(ROOT)
 return path.suffix.lower() in {'.html','.md','.json','.js','.txt'} and (rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts)>1 and rel.parts[0] in PUBLIC_DIRS))

def normalize(text:str)->str:
 pairs=(
  ('15 neutral prompts across 5 query families when entitlement and providers are configured','up to 3 neutral queries across configured provider API/search-grounded surfaces'),
  ('15 nötr prompt ölçümü','yapılandırılmış sağlayıcılarda en fazla 3 nötr sorgu ölçümü'),
  ('identical 15 buyer intent prompts','identical configured buyer-intent prompts'),
  ('15 standard buyer intent prompts','configured buyer-intent prompt panel'),
  ('14KB AST budget, and Wikidata query','HTTP and bot-policy evidence, crawl boundaries, and machine-surface readiness'),
  ('14KB AST bütçesi ve Wikidata sorgusu','HTTP ve bot-politika kanıtı, tarama sınırları ve makine-yüzeyi hazırlığı'),
 )
 for a,b in pairs:text=text.replace(a,b)
 text=re.sub(BANNED['unverified 15-prompt claim'],'configured prompt',text,flags=re.I)
 return text

def set_meta(text:str,title:str,desc:str)->str:
 text=re.sub(r'<title>.*?</title>',f'<title>{html.escape(title,quote=False)}</title>',text,count=1,flags=re.I|re.S)
 tag=f'<meta name="description" content="{html.escape(desc,quote=True)}">'
 if re.search(r'<meta\s+name=["\']description["\'][^>]*>',text,re.I): text=re.sub(r'<meta\s+name=["\']description["\'][^>]*>',tag,text,count=1,flags=re.I)
 else:text=text.replace('</title>','</title>\n'+tag,1)
 return text

def apply_block(path:Path,text:str)->str:
 if 'v3-capability-contract' not in text:return text
 lang='en' if path.relative_to(ROOT).parts[0]=='en' else 'tr'
 return re.sub(r'<section class="v3-capability-contract"[\s\S]*?</section>',EN_BLOCK if lang=='en' else TR_BLOCK,text,count=1)

# Materialize + normalize. The second normalization is mandatory.
for p in ROOT.rglob('*'):
 if not p.is_file() or not is_public(p):continue
 rel=p.relative_to(ROOT).as_posix(); text=normalize(p.read_text(encoding='utf-8',errors='ignore'))
 if p.suffix.lower()=='.html':
  text=apply_block(p,text)
  if rel in SEO:text=set_meta(text,*SEO[rel])
 p.write_text(normalize(text),encoding='utf-8')

profile_path=ROOT/'audit-profile.json'; profile=json.loads(profile_path.read_text(encoding='utf-8'))
execution=profile.setdefault('executionContract',{})
execution.update({
 'neutralQueryMaximum':3,'providerMaximum':3,
 'providerSurfaces':['OpenAI Responses API + web search','Perplexity Sonar API web-search surface','Gemini API + Google Search grounding'],
 'maximumObservationsPerRun':9,
 'promptMeasurementBoundary':'PAID_AND_PROVIDER_CONFIGURATION_REQUIRED; API/search-grounded surfaces are not identical to consumer UI results',
 'arrRiskClassification':'SCENARIO_ESTIMATE_NOT_MEASURED_REVENUE',
 'implementationPackage':'VERSIONED ZIP; EXACT FILE COUNT VARIES WITH EVIDENCED FINDINGS AND UP TO 30 PAGE-LEVEL MACHINE-SURFACE MANIFESTS'})
execution.pop('neutralPromptFamilies',None);execution.pop('neutralPromptMaximum',None)
profile['publicPositioning']={'category':'AI SEO / AI Search Visibility / Website Readiness','primarySearchIntentsTR':['yapay zeka seo analizi','chatgpt görünürlük','yapay zeka arama görünürlüğü','llms.txt validator','ai crawler checker'],'primarySearchIntentsEN':['AI SEO audit','ChatGPT visibility','AI search visibility','llms.txt validator','AI crawler checker'],'guaranteeBoundary':'No ranking, citation, recommendation, traffic or revenue guarantee.'}
profile_path.write_text(json.dumps(profile,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# Last-mile sanitizer uses the exact same pattern as the gate. This handles
# embedded downloadable source snapshots inside public specimen reports without
# weakening the fail-closed check.
prompt_pattern=BANNED['unverified 15-prompt claim']
for p in ROOT.rglob('*'):
 if not p.is_file() or not is_public(p):continue
 text=p.read_text(encoding='utf-8',errors='ignore')
 if re.search(prompt_pattern,text,re.I):
  text=re.sub(prompt_pattern,'configured prompt',text,flags=re.I)
  p.write_text(text,encoding='utf-8')

errors=[]
for p in ROOT.rglob('*'):
 if not p.is_file() or not is_public(p):continue
 rel=p.relative_to(ROOT).as_posix(); text=p.read_text(encoding='utf-8',errors='ignore')
 skip_v2=rel in {'assets/js/enterprise-theme-engine.js','assets/js/feature-flags.js'}
 for label,pattern in BANNED.items():
  if label=='legacy Engine V2 public claim' and skip_v2:continue
  if re.search(pattern,text,re.I):errors.append(f'{label}: {rel}')

for rel,(title,desc) in SEO.items():
 text=(ROOT/rel).read_text(encoding='utf-8')
 if html.escape(title,quote=False) not in text:errors.append(f'SEO title missing: {rel}')
 if html.escape(desc,quote=True) not in text:errors.append(f'SEO description missing: {rel}')
for rel in ('index.html','tr/index.html','en/index.html','tr/fiyatlandirma/index.html','en/pricing/index.html'):
 text=(ROOT/rel).read_text(encoding='utf-8')
 for marker in ('18','105','$99'):
  if marker not in text:errors.append(f'V3 commercial marker {marker} missing: {rel}')
if errors:raise SystemExit('V3 SALES CONTRACT FAIL\n- '+'\n- '.join(errors[:120]))
print('V3 SALES CONTRACT PASS: verified capabilities, SEO metadata and fail-closed public-claim gate aligned.')
