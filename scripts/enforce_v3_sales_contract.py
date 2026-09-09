#!/usr/bin/env python3
"""Final customer-facing V3 capability + SEO conversion contract.

This is the last public-surface materializer and fail-closed claim gate. The order
is intentional: every HTML transformation is followed by a second normalization
pass so a later materializer cannot re-introduce a claim already removed earlier
in the pipeline.
"""

from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]

TR_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-tr">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT GÖRÜNÜRLÜK · ENGINE V3</span>
    <h2 id="v3-capabilities-tr">Google sırası tek başına yetmiyor. Siteniz yapay zeka aramalarında bulunmalı, anlaşılmalı ve kaynak olmaya hazır olmalı.</h2>
    <p>HTML&amp;HTML, web sitenizdeki AI arama görünürlüğü engellerini kanıtla ölçer. 18 deterministik Engine V3 modülü, 105 kontrol, 13 puan dışı istihbarat analizi ve 7 hazırlık lensi; teknik erişimden cevap çıkarılabilirliğine, llms.txt ve schema yüzeylerinden ajan hazırlığına kadar aynı kanıt zincirinde çalışır.</p>
    <div class="v3-decision-line"><b>Teşhis ücretsiz.</b><span>Kök neden, uygulama kodu, kabul testi ve rollback paketi $99 tek seferlik lisansla açılır.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="HTML&HTML V3 karşılaştırma tablosu" tabindex="0">
    <table>
      <thead><tr><th scope="col">Karar başlığı</th><th scope="col">Ücretsiz AI SEO analizi</th><th scope="col" class="v3-paid">$99 uygulama paketi</th></tr></thead>
      <tbody>
        <tr><th scope="row">Deterministik denetim</th><td>18 Engine V3 modülü · 105 kontrol · rastgele skor yok</td><td class="v3-paid">Aynı bulgu kimlikleriyle kök neden → düzeltme → test → rollback</td></tr>
        <tr><th scope="row">Tarama ve güvenlik</th><td>50'ye kadar herkese açık HTML sayfası · 30 canlı link probu · SSRF fail-closed sınırı</td><td class="v3-paid">Kanıtlanan URL ve bulgulara bağlı uygulama planı</td></tr>
        <tr><th scope="row">AI arama disiplinleri</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Her disiplin için kanıta bağlı kod ve konfigürasyon</td></tr>
        <tr><th scope="row">Karar istihbaratı</th><td>13 puan dışı analiz · 7 hazırlık lensi · NOT_MEASURED / REQUIRES_CONTEXT sınırları</td><td class="v3-paid">P0–P3 öncelik, bağımlılık, kabul ve regresyon kriterleri</td></tr>
        <tr><th scope="row">ChatGPT / AI görünürlük ölçümü</th><td>Bot erişimi, kaynak hazırlığı, entity/schema, cevap çıkarılabilirliği ve dönüşüm yolu</td><td class="v3-paid">Sağlayıcı anahtarları yapılandırıldığında OpenAI, Perplexity ve Gemini API/search-grounded yüzeylerinde en fazla 3 nötr sorgu ile marka/atıf gözlemi</td></tr>
        <tr><th scope="row">Makine yüzeyleri</th><td>robots.txt, sitemap, llms.txt, JSON-LD ve keşif ilişkileri</td><td class="v3-paid">Önerilen tek kök llms.txt + kanıtlanan URL'lere göre 30'a kadar sayfa bazlı Markdown manifesti</td></tr>
        <tr><th scope="row">Yayın güvenliği</th><td>Kanıt ve confidence sınıfları görünür</td><td class="v3-paid">G0–G9 fail-closed kalite kapıları · acceptance · regression · rollback</td></tr>
        <tr><th scope="row">Teslim</th><td>Hangi sorunların gerçekten var olduğunu ve önceliğini görün</td><td class="v3-paid">Sürümlenmiş ZIP teslimi; exact fix, testler, rollback, yönetim özeti ve makine-yüzeyi planı</td></tr>
      </tbody>
    </table>
  </div>
  <p class="v3-boundary"><b>Kanıt sınırı:</b> HTML&amp;HTML dış bir modelin kimi önereceğini kontrol etmez. Sıralama, atıf, trafik veya gelir garantisi vermez. Ölçülemeyen sinyal <b>NOT_MEASURED</b>; yetkili kod bağlamı gerektiren sinyal <b>REQUIRES_CONTEXT</b> kalır.</p>
</section>'''

EN_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-en">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT VISIBILITY · ENGINE V3</span>
    <h2 id="v3-capabilities-en">Google rankings are no longer the whole decision path. Your site must be discoverable, understandable and source-ready for AI search.</h2>
    <p>HTML&amp;HTML measures website-side AI search visibility blockers with evidence. Eighteen deterministic Engine V3 modules, 105 controls, 13 non-scoring intelligence analyses and seven readiness lenses run on one evidence chain, covering technical access, answer extractability, llms.txt and schema surfaces, retrieval readiness and agent compatibility.</p>
    <div class="v3-decision-line"><b>Diagnosis is free.</b><span>Root cause, implementation code, acceptance tests and rollback unlock with the one-time $99 license.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="HTML&HTML V3 comparison table" tabindex="0">
    <table>
      <thead><tr><th scope="col">Decision area</th><th scope="col">Free AI SEO audit</th><th scope="col" class="v3-paid">$99 implementation pack</th></tr></thead>
      <tbody>
        <tr><th scope="row">Deterministic audit</th><td>18 Engine V3 modules · 105 controls · no random scoring</td><td class="v3-paid">Same finding IDs mapped to root cause → fix → test → rollback</td></tr>
        <tr><th scope="row">Crawl and security</th><td>Up to 50 public HTML pages · 30 live link probes · fail-closed SSRF boundary</td><td class="v3-paid">Implementation plan bound to evidenced URLs and findings</td></tr>
        <tr><th scope="row">AI search disciplines</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Evidence-bound code and configuration per discipline</td></tr>
        <tr><th scope="row">Decision intelligence</th><td>13 non-scoring analyses · 7 readiness lenses · NOT_MEASURED / REQUIRES_CONTEXT boundaries</td><td class="v3-paid">P0–P3 priority, dependencies, acceptance and regression criteria</td></tr>
        <tr><th scope="row">ChatGPT / AI visibility measurement</th><td>Bot access, source readiness, entity/schema, answer extractability and conversion path</td><td class="v3-paid">When provider keys are configured, up to 3 neutral queries across OpenAI, Perplexity and Gemini API/search-grounded surfaces for brand/citation observation</td></tr>
        <tr><th scope="row">Machine surfaces</th><td>robots.txt, sitemap, llms.txt, JSON-LD and discovery relations</td><td class="v3-paid">One proposed root llms.txt plus up to 30 page-level Markdown manifests from evidenced URLs</td></tr>
        <tr><th scope="row">Release safety</th><td>Evidence and confidence classes stay visible</td><td class="v3-paid">G0–G9 fail-closed quality gates · acceptance · regression · rollback</td></tr>
        <tr><th scope="row">Delivery</th><td>See which issues actually exist and which matter first</td><td class="v3-paid">Versioned ZIP delivery with exact fixes, tests, rollback, board summary and machine-surface plan</td></tr>
      </tbody>
    </table>
  </div>
  <p class="v3-boundary"><b>Evidence boundary:</b> HTML&amp;HTML does not control which brand an external model recommends. It does not guarantee rankings, citations, traffic or revenue. Unavailable evidence stays <b>NOT_MEASURED</b>; authorized code context stays <b>REQUIRES_CONTEXT</b> until supplied.</p>
</section>'''

SEO = {
    'index.html': ('Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi | HTML&HTML', 'Web sitenizin ChatGPT, Google Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz analiz edin. 18 deterministik motor, 105 kontrol ve $99 uygulama paketi.'),
    'tr/index.html': ('Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi | HTML&HTML', 'Web sitenizin ChatGPT, Google Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz analiz edin. 18 deterministik motor, 105 kontrol ve $99 uygulama paketi.'),
    'en/index.html': ('AI SEO Audit & ChatGPT Visibility Test | HTML&HTML', 'Audit your website for ChatGPT, Google Gemini, Claude and Perplexity visibility. Get evidence from 18 deterministic engines and 105 checks; unlock the $99 implementation pack.'),
    'tr/ai-website-readiness/index.html': ('Yapay Zeka SEO Analizi ve AI Web Sitesi Hazırlık Testi | HTML&HTML', 'AI web sitesi hazırlığını ücretsiz ölçün: ChatGPT bot erişimi, llms.txt, schema, GEO, AEO, LLMO, AAO, RAG ve E-E-A-T sinyallerini kanıtla görün.'),
    'en/ai-website-readiness/index.html': ('AI Website Readiness & AI SEO Audit | HTML&HTML', 'Measure AI website readiness across crawler access, llms.txt, schema, GEO, AEO, LLMO, AAO, RAG and E-E-A-T with evidence-backed checks.'),
    'tr/ai-crawler-checker/index.html': ('ChatGPT Bot ve AI Crawler Erişim Testi | HTML&HTML', 'OAI-SearchBot, GPTBot, Claude ve Perplexity crawler erişimini robots.txt ve canlı HTTP kanıtıyla ücretsiz kontrol edin.'),
    'en/ai-crawler-checker/index.html': ('ChatGPT Bot & AI Crawler Access Checker | HTML&HTML', 'Check OAI-SearchBot, GPTBot, Claude and Perplexity crawler access using robots.txt and live HTTP evidence.'),
    'tr/llms-txt-validator/index.html': ('llms.txt Validator ve Yapay Zeka Site Testi | HTML&HTML', 'llms.txt dosyanızı format, link erişimi, discovery ilişkileri ve AI arama hazırlığı açısından ücretsiz doğrulayın.'),
    'en/llms-txt-validator/index.html': ('llms.txt Validator & AI Website Test | HTML&HTML', 'Validate llms.txt format, link reachability, discovery relations and AI-search readiness for free.'),
    'tr/yapay-zeka-arama-gorunurlugu/index.html': ('Yapay Zeka Arama Görünürlüğü: GEO, AEO, LLMO | HTML&HTML', 'ChatGPT, Gemini, Claude ve Perplexity için yapay zeka arama görünürlüğü; GEO, AEO, LLMO, llms.txt, entity ve teknik erişim sinyallerini ölçün.'),
    'en/ai-search-visibility/index.html': ('AI Search Visibility: GEO, AEO & LLMO | HTML&HTML', 'Measure AI search visibility for ChatGPT, Gemini, Claude and Perplexity across GEO, AEO, LLMO, llms.txt, entity and technical access signals.'),
    'tr/fiyatlandirma/index.html': ('AI SEO Uygulama Paketi $99 | HTML&HTML', 'Ücretsiz AI SEO teşhisinden kanıta bağlı kök neden, exact fix, acceptance test ve rollback içeren $99 tek seferlik uygulama paketine geçin.'),
    'en/pricing/index.html': ('AI SEO Implementation Pack $99 | HTML&HTML', 'Move from a free AI SEO diagnosis to a one-time $99 evidence-bound implementation pack with root cause, exact fixes, acceptance tests and rollback.'),
}

PUBLIC_DIRS = {'tr', 'en', 'llms', 'ai-report', 'enterprise-analyzer', 'assets'}
PUBLIC_ROOTS = {'index.html', 'index.md', 'llms.txt', 'openapi.json', 'audit-profile.json', 'pricing.html', 'methodology.html', 'enterprise-analyzer.html'}

BANNED = {
    'legacy Engine V2 public claim': r'\bEngine V2(?:\.1\.0)?\b',
    'legacy 120-control claim': r'\b120\s+(?:deep\s+)?(?:checks|controls)|\b120\s+(?:derin\s+)?kontrol',
    'legacy 43-page claim': r'\b43[- ]page|\b43\s+sayfa',
    'legacy fixed 22-file claim': r'\b22[- ]file|\b22\s+dosya',
    'unverified 15-prompt claim': r'\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt',
    'unverified first-14KB claim': r'14(?:,?336|KB)[^\n<]{0,80}(?:AST|window|pencere|budget|bütçe)',
    'unverified live Wikidata query claim': r'(?:Wikidata[^\n<]{0,80}(?:SPARQL|query|sorgu)|(?:SPARQL|query|sorgu)[^\n<]{0,80}Wikidata)',
    'unverified Common Crawl live verification': r'Common Crawl[^\n<]{0,100}(?:live|canlı|verify|doğrula)',
    'unverified speed promise': r'\b(?:30|60)\s*(?:seconds?|saniye)(?:de|da)?\b[^\n<]{0,80}(?:apply|uygula|uygulama|zero.?code|sıfır.?kod)',
    'world-first claim': r'(?:world.?s first|dünyanın ilk)',
}


def is_public(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if path.suffix.lower() not in {'.html', '.md', '.json', '.js', '.txt'}:
        return False
    return rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts) > 1 and rel.parts[0] in PUBLIC_DIRS)


def set_title_and_description(text: str, title: str, description: str) -> str:
    title_escaped = html.escape(title, quote=False)
    desc_escaped = html.escape(description, quote=True)
    text = re.sub(r'<title>.*?</title>', f'<title>{title_escaped}</title>', text, count=1, flags=re.I | re.S)
    if re.search(r'<meta\s+name=["\']description["\'][^>]*>', text, re.I):
        text = re.sub(r'<meta\s+name=["\']description["\'][^>]*>', f'<meta name="description" content="{desc_escaped}">', text, count=1, flags=re.I)
    else:
        text = text.replace('</title>', f'</title>\n<meta name="description" content="{desc_escaped}">', 1)
    return text


def normalize_claims(text: str) -> str:
    direct = (
        ('15 neutral prompts across 5 query families when entitlement and providers are configured', 'up to 3 neutral queries across configured OpenAI, Perplexity and Gemini API/search-grounded surfaces'),
        ('15 nötr prompt ölçümü', 'yapılandırılmış sağlayıcılarda en fazla 3 nötr sorgu ölçümü'),
        ('identical 15 buyer intent prompts', 'identical configured buyer-intent prompts'),
        ('15 standard buyer intent prompts', 'configured buyer-intent prompt panel'),
        ('14KB AST budget, and Wikidata query', 'HTTP and bot-policy evidence, crawl boundaries, and machine-surface readiness'),
        ('14KB AST bütçesi ve Wikidata sorgusu', 'HTTP ve bot-politika kanıtı, tarama sınırları ve makine-yüzeyi hazırlığı'),
        ('30+ versioned files · AI coding-agent prompt · WordPress/edge guide · board memo · .ics plan', 'Versioned ZIP · exact fixes · tests · rollback · board summary · machine-surface plan'),
        ('30+ sürümlenmiş dosya · AI coding agent promptu · WordPress/edge rehberi · yönetim notu · .ics planı', 'Sürümlenmiş ZIP · exact fix · test · rollback · yönetim özeti · makine-yüzeyi planı'),
    )
    for old, new in direct:
        text = text.replace(old, new)

    # Generic forms are normalized here because this script is the final public
    # materializer. This second-pass rule prevents an earlier generator from
    # re-introducing the same unsupported cardinality later in the build.
    text = re.sub(r'(?i)\b15[- ]prompt\b', 'configured prompt', text)
    text = re.sub(r'(?i)15\s+nötr\s+prompt', 'configured nötr prompt', text)
    text = re.sub(r'(?i)15\s+neutral\s+prompt', 'configured neutral prompt', text)
    return text


def apply_block(path: Path, text: str) -> str:
    if 'v3-capability-contract' not in text:
        return text
    rel = path.relative_to(ROOT)
    lang = 'en' if rel.parts and rel.parts[0] == 'en' else 'tr'
    block = EN_BLOCK if lang == 'en' else TR_BLOCK
    return re.sub(r'<section class="v3-capability-contract"[\s\S]*?</section>', block, text, count=1)


# Materialize public surfaces. Normalize both before and after HTML transforms.
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path):
        continue
    rel = path.relative_to(ROOT).as_posix()
    text = normalize_claims(path.read_text(encoding='utf-8', errors='ignore'))
    if path.suffix.lower() == '.html':
        text = apply_block(path, text)
        if rel in SEO:
            text = set_title_and_description(text, *SEO[rel])
    text = normalize_claims(text)
    path.write_text(text, encoding='utf-8')

# Machine-readable execution boundary: real provider observations require paid
# entitlement + configured provider surfaces and are distinct from consumer UIs.
profile_path = ROOT / 'audit-profile.json'
profile = json.loads(profile_path.read_text(encoding='utf-8'))
execution = profile.setdefault('executionContract', {})
execution['neutralQueryMaximum'] = 3
execution['providerMaximum'] = 3
execution['providerSurfaces'] = ['OpenAI Responses API + web search', 'Perplexity Sonar API web-search surface', 'Gemini API + Google Search grounding']
execution['maximumObservationsPerRun'] = 9
execution.pop('neutralPromptFamilies', None)
execution.pop('neutralPromptMaximum', None)
execution['promptMeasurementBoundary'] = 'PAID_AND_PROVIDER_CONFIGURATION_REQUIRED; API/search-grounded surfaces are not identical to consumer UI results'
execution['arrRiskClassification'] = 'SCENARIO_ESTIMATE_NOT_MEASURED_REVENUE'
execution['implementationPackage'] = 'VERSIONED ZIP; EXACT FILE COUNT VARIES WITH EVIDENCED FINDINGS AND UP TO 30 PAGE-LEVEL MACHINE-SURFACE MANIFESTS'
profile['publicPositioning'] = {
    'category': 'AI SEO / AI Search Visibility / Website Readiness',
    'primarySearchIntentsTR': ['yapay zeka seo analizi', 'chatgpt görünürlük', 'yapay zeka arama görünürlüğü', 'llms.txt validator', 'ai crawler checker'],
    'primarySearchIntentsEN': ['AI SEO audit', 'ChatGPT visibility', 'AI search visibility', 'llms.txt validator', 'AI crawler checker'],
    'guaranteeBoundary': 'No ranking, citation, recommendation, traffic or revenue guarantee.'
}
profile_path.write_text(json.dumps(profile, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# Final fail-closed scan. Nothing after this point mutates public customer claims.
errors = []
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path):
        continue
    rel = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding='utf-8', errors='ignore')
    skip_engine_v2 = rel in {'assets/js/enterprise-theme-engine.js', 'assets/js/feature-flags.js'}
    for label, pattern in BANNED.items():
        if label == 'legacy Engine V2 public claim' and skip_engine_v2:
            continue
        if re.search(pattern, text, re.I):
            errors.append(f'{label}: {rel}')

for rel, (title, description) in SEO.items():
    text = (ROOT / rel).read_text(encoding='utf-8')
    if html.escape(title, quote=False) not in text:
        errors.append(f'SEO title missing: {rel}')
    if html.escape(description, quote=True) not in text:
        errors.append(f'SEO description missing: {rel}')

for rel in ('index.html', 'tr/index.html', 'en/index.html', 'tr/fiyatlandirma/index.html', 'en/pricing/index.html'):
    text = (ROOT / rel).read_text(encoding='utf-8')
    for marker in ('18', '105', '$99'):
        if marker not in text:
            errors.append(f'V3 commercial marker {marker} missing: {rel}')

if errors:
    raise SystemExit('V3 SALES CONTRACT FAIL\n- ' + '\n- '.join(errors[:120]))

print('V3 SALES CONTRACT PASS: verified capabilities, high-intent SEO metadata, comparison copy and legacy-claim gate aligned.')
