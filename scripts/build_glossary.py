#!/usr/bin/env python3
from pathlib import Path
import json, html

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'reference-glossary.json').read_text(encoding='utf-8'))
SOURCES=json.loads((ROOT/'sources.json').read_text(encoding='utf-8'))
SOURCE_MAP={s['id']:s for s in SOURCES['sources']}
CORE=['seo','geo','aeo','llmo','aao','rag','eeat','llms-txt','sitemap']

CLASS_LABELS={
 'en':{
  'OFFICIAL_STANDARD':'OFFICIAL STANDARD','GOOGLE_OFFICIAL_CONCEPT':'GOOGLE-DOCUMENTED','GOOGLE_SEARCH_FEATURE':'GOOGLE SEARCH FEATURE','GOOGLE_PRODUCT_CONTROL':'GOOGLE PRODUCT CONTROL','AI_TECHNIQUE':'AI TECHNIQUE','INDUSTRY_TERM':'INDUSTRY TERM','PROPOSAL':'PROPOSAL','INTERNAL_HEURISTIC':'HTML&HTML HEURISTIC','MEASUREMENT_CONCEPT':'MEASUREMENT CONCEPT'},
 'tr':{
  'OFFICIAL_STANDARD':'RESMİ STANDART','GOOGLE_OFFICIAL_CONCEPT':'GOOGLE BELGELİ','GOOGLE_SEARCH_FEATURE':'GOOGLE ARAMA ÖZELLİĞİ','GOOGLE_PRODUCT_CONTROL':'GOOGLE ÜRÜN KONTROLÜ','AI_TECHNIQUE':'AI TEKNİĞİ','INDUSTRY_TERM':'SEKTÖR TERİMİ','PROPOSAL':'ÖNERİ','INTERNAL_HEURISTIC':'HTML&HTML SEZGİSEL ANALİZİ','MEASUREMENT_CONCEPT':'ÖLÇÜM KAVRAMI'}
}

def e(v): return html.escape(str(v),quote=True)

def header(lang):
    if lang=='tr':
        nav='''<nav><a href="/tr/platform/">Platform</a><a href="/tr/araclar/">Araçlar</a><a href="/tr/sozluk/" aria-current="page">Sözlük</a><a href="/tr/methodology/">Metodoloji</a><a href="/tr/fiyatlandirma/">Fiyatlandırma</a></nav>'''
        home='/tr/'; alt='/en/glossary/'; altlabel='EN'; altaria='Switch to English'
    else:
        nav='''<nav><a href="/en/platform/">Platform</a><a href="/en/tools/">Tools</a><a href="/en/glossary/" aria-current="page">Glossary</a><a href="/en/methodology/">Methodology</a><a href="/en/pricing/">Pricing</a></nav>'''
        home='/en/'; alt='/tr/sozluk/'; altlabel='TR'; altaria='Türkçeye geç'
    return f'''<header class="topbar"><div class="topbar-shell"><a class="brand" href="{home}" aria-label="HTML&amp;HTML"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a>{nav}<div class="nav-actions"><div class="langs"><a href="{alt}" aria-label="{altaria}">{altlabel}</a></div></div></div></header>'''

def footer(lang):
    if lang=='tr':
        return '''<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/tr/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>Arama ve yapay zeka görünürlüğünü kanıt sınıflarıyla açıklayan bağımsız teknik referans.</p></div><div class="footer-col"><h4>Referans</h4><ul><li><a href="/tr/sozluk/">AI & Arama Sözlüğü</a></li><li><a href="/tr/methodology/">Metodoloji</a></li><li><a href="/tr/kanit-standardi/">Kanıt Standardı</a></li><li><a href="/tr/referans/ai-tarayicilar/">AI Tarayıcı Dizini</a></li><li><a href="/sources.json">Kaynak Kayıt Defteri</a></li></ul></div><div class="footer-col"><h4>Araçlar</h4><ul><li><a href="/tr/site-tarama/">Web Sitesi Tarayıcısı</a></li><li><a href="/tr/ai-website-readiness/">AI Hazırlığı</a></li><li><a href="/tr/llms-txt-validator/">llms.txt Doğrulayıcı</a></li><li><a href="/tr/ai-crawler-checker/">AI Tarayıcı Kontrolü</a></li></ul></div><div class="footer-col"><h4>Makine Yüzeyleri</h4><ul><li><a href="/reference-glossary.json">Sözlük JSON</a></li><li><a href="/tr/sozluk/index.md">Sözlük Markdown</a></li><li><a href="/llms.txt">llms.txt</a></li><li><a href="/openapi.json">OpenAPI</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 HTML&amp;HTML</span><span>Google onayı veya sıralama garantisi iddia edilmez.</span></div></footer>'''
    return '''<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/en/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>An independent technical reference explaining Search and AI visibility with explicit evidence classes.</p></div><div class="footer-col"><h4>Reference</h4><ul><li><a href="/en/glossary/">AI & Search Glossary</a></li><li><a href="/en/methodology/">Methodology</a></li><li><a href="/en/evidence-standard/">Evidence Standard</a></li><li><a href="/en/reference/ai-crawlers/">AI Crawler Directory</a></li><li><a href="/sources.json">Source Registry</a></li></ul></div><div class="footer-col"><h4>Tools</h4><ul><li><a href="/en/website-scanner/">Website Scanner</a></li><li><a href="/en/ai-website-readiness/">AI Website Readiness</a></li><li><a href="/en/llms-txt-validator/">llms.txt Validator</a></li><li><a href="/en/ai-crawler-checker/">AI Crawler Checker</a></li></ul></div><div class="footer-col"><h4>Machine Surfaces</h4><ul><li><a href="/reference-glossary.json">Glossary JSON</a></li><li><a href="/en/glossary/index.md">Glossary Markdown</a></li><li><a href="/llms.txt">llms.txt</a></li><li><a href="/openapi.json">OpenAPI</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 HTML&amp;HTML</span><span>No Google endorsement or ranking guarantee is claimed.</span></div></footer>'''

def source_links(term,lang):
    out=[]
    for sid in term.get('sourceIds',[]):
        s=SOURCE_MAP.get(sid)
        if not s: continue
        label=f"{s['publisher']} — {s['title']}"
        out.append(f'<a href="{e(s["url"])}" target="_blank" rel="noopener noreferrer">{e(label)} ↗</a>')
    return ''.join(out)

def related_links(term,lang):
    terms={t['id']:t for t in DATA['terms']}
    out=[]
    for rid in term.get('related',[]):
        t=terms.get(rid)
        if t: out.append(f'<a href="#{e(rid)}">{e(t["term"])}</a>')
    return ''.join(out)

def jsonld(lang,path_url):
    terms=[]
    for t in DATA['terms']:
        terms.append({"@type":"DefinedTerm","name":t['term'],"description":t['definition'][lang],"url":path_url+'#'+t['id']})
    label='HTML&HTML AI & Search Reference Glossary' if lang=='en' else 'HTML&HTML AI & Arama Referans Sözlüğü'
    return json.dumps({"@context":"https://schema.org","@graph":[{"@type":"DefinedTermSet","name":label,"url":path_url,"dateModified":DATA['lastReviewed'],"hasDefinedTerm":terms},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home" if lang=='en' else "Ana Sayfa","item":"https://htmlandhtml.com/en/" if lang=='en' else "https://htmlandhtml.com/tr/"},{"@type":"ListItem","position":2,"name":"Glossary" if lang=='en' else "Sözlük","item":path_url}]}]},ensure_ascii=False,separators=(',',':'))

def build(lang):
    tr=lang=='tr'
    rel='tr/sozluk/index.html' if tr else 'en/glossary/index.html'
    mdrel='tr/sozluk/index.md' if tr else 'en/glossary/index.md'
    canonical='https://htmlandhtml.com/tr/sozluk/' if tr else 'https://htmlandhtml.com/en/glossary/'
    alternate='https://htmlandhtml.com/en/glossary/' if tr else 'https://htmlandhtml.com/tr/sozluk/'
    title='AI, GEO, AEO, LLMO, AAO, RAG, E-E-A-T ve SEO Sözlüğü | HTML&HTML' if tr else 'AI, GEO, AEO, LLMO, AAO, RAG, E-E-A-T & SEO Glossary | HTML&HTML'
    desc='GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemap, Google AI Mode ve teknik SEO terimlerini resmi kaynak, sektör terimi, öneri ve sezgisel analiz ayrımıyla açıklayan referans sözlük.' if tr else 'Evidence-classified definitions for GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemaps, Google AI Mode and technical SEO, separating official guidance, industry terms, proposals and heuristics.'
    hero='AI & Arama Referans Sözlüğü' if tr else 'AI & Search Reference Glossary'
    lead=('GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, site haritaları ve üretken AI arama kavramlarını tek yerde; neyin Google tarafından belgelendiğini, neyin sektör terimi olduğunu ve neyin yalnız HTML&HTML analizi olduğunu açıkça ayırarak açıklıyoruz.' if tr else 'A single evidence-classified reference for GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemaps and generative AI search—clearly separating what Google documents, what the industry calls it, and what HTML&HTML measures internally.')
    labels={
      'search':'Terim ara: GEO, RAG, sitemap, canonical…' if tr else 'Search terms: GEO, RAG, sitemap, canonical…',
      'showing':'gösteriliyor' if tr else 'shown',
      'definition':'TANIM' if tr else 'DEFINITION','google':'GOOGLE NE DİYOR?' if tr else 'WHAT GOOGLE SAYS','meaning':'SİTE SAHİBİ İÇİN' if tr else 'FOR SITE OWNERS','use':'HTML&HTML NASIL KULLANIYOR?' if tr else 'HOW HTML&HTML USES IT','myth':'YANLIŞ BİLİNEN' if tr else 'COMMON MISCONCEPTION','sources':'Kaynaklar' if tr else 'Sources','related':'İlgili terimler' if tr else 'Related terms'}
    corelinks=''.join(f'<a href="#{x}">{e(next(t["term"] for t in DATA["terms"] if t["id"]==x))}</a>' for x in CORE)
    cards=[]
    for t in DATA['terms']:
        cards.append(f'''<article class="term-card" id="{e(t['id'])}" data-glossary-term data-glossary-search="{e(t['term'])} {e(t['expanded'][lang])} {e(t['definition'][lang])}"><div class="term-head"><div><h2>{e(t['term'])}</h2><p class="term-expanded">{e(t['expanded'][lang])}</p></div><span class="term-class">{e(CLASS_LABELS[lang].get(t['class'],t['class']))}</span></div><p class="term-definition">{e(t['definition'][lang])}</p><div class="term-sections"><div class="term-section term-google"><h3>{labels['google']}</h3><p>{e(t['googlePosition'][lang])}</p></div><div class="term-section"><h3>{labels['meaning']}</h3><p>{e(t['siteOwnerMeaning'][lang])}</p></div><div class="term-section"><h3>{labels['use']}</h3><p>{e(t['htmlandhtmlUse'][lang])}</p></div><div class="term-section term-myth"><h3>{labels['myth']}</h3><p>{e(t['myth'][lang])}</p></div></div><div class="term-sources"><strong>{labels['sources']}:</strong>{source_links(t,lang)}</div><div class="term-related"><strong>{labels['related']}:</strong>{related_links(t,lang)}</div></article>''')
    if tr:
      intro_a='<h2>Bu sözlüğün farkı nedir?</h2><p>Terimleri yalnız tanımlamıyoruz. Her kavramı <strong>resmî standart, Google belgeli kavram, Google Arama özelliği, sektör terimi, proposal veya HTML&HTML sezgisel analizi</strong> olarak sınıflandırıyoruz.</p><p>Böylece “Google bunu istiyor” ile “sektör bunu konuşuyor” birbirine karışmıyor.</p>'
      intro_b='<h2>Google görünürlüğü için temel ilke</h2><p>Google’ın 2026 rehberine göre GEO/AEO çalışmaları Google Arama açısından hâlâ SEO kapsamındadır. Google ayrıca llms.txt dosyasını Arama görünürlüğü veya sıralama için kullanmadığını açıkça söyler.</p><p>Bu sözlük, özel hileler yerine taranabilirlik, özgün değer, kullanıcı odaklı içerik, teknik uygunluk ve güvenilir kaynaklandırmayı öne çıkarır.</p>'
      empty='Aramanızla eşleşen terim bulunamadı.'; methodtitle='Editoryal ve kanıt politikası'; methodp='Bu sayfadaki Google davranış iddiaları yalnız birinci taraf Google kaynaklarına dayanır. Sektör terimleri ve HTML&HTML analizleri ayrı etiketlenir. Google’ın üçüncü taraf araçları onaylamadığı ve hiçbir aracın Google’ın özel sıralama verisine erişemeyeceği ilkesi korunur.'; ctat='Kavramı öğrendiniz. Şimdi sitenizdeki engeli ölçün.'; ctap='Ücretsiz tarama; crawl, SEO, AI erişimi, llms.txt, schema, güven, retrieval ve dönüşüm katmanlarındaki gözlemlenebilir sorunları kanıtıyla gösterir.'; ctaa='/tr/site-tarama/'; ctab='AI Hazırlığımı Ücretsiz Tara →'; updated='Son editoryal doğrulama'
    else:
      intro_a='<h2>What makes this glossary different?</h2><p>We do more than define terms. Every concept is classified as an <strong>official standard, Google-documented concept, Google Search feature, industry term, proposal, or HTML&HTML heuristic</strong>.</p><p>That prevents “Google requires this” from being confused with “the industry talks about this.”</p>'
      intro_b='<h2>The core Google visibility principle</h2><p>Google’s 2026 guidance says GEO/AEO work is still SEO from Google Search’s perspective. Google also explicitly says Search ignores llms.txt for visibility and rankings.</p><p>This glossary prioritizes crawlability, original value, people-first content, technical eligibility and trustworthy sourcing over unsupported hacks.</p>'
      empty='No glossary term matches your search.'; methodtitle='Editorial and evidence policy'; methodp='Google behavior claims on this page rely on first-party Google sources. Industry terms and HTML&HTML analyses are labeled separately. We preserve Google’s warning that third-party tools are not Google-approved and do not have access to private ranking data.'; ctat='You understand the term. Now measure the blocker.'; ctap='The free scan shows observable issues across crawl, SEO, AI access, llms.txt, schema, trust, retrieval and conversion with evidence.'; ctaa='/en/website-scanner/'; ctab='Scan My AI & Search Readiness Free →'; updated='Last editorial review'
    page=f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)}</title><meta name="description" content="{e(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="{'tr' if tr else 'en'}" href="{canonical}"><link rel="alternate" hreflang="{'en' if tr else 'tr'}" href="{alternate}"><link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/glossary/"><link rel="alternate" type="text/markdown" href="/{mdrel}"><link rel="describedby" href="https://htmlandhtml.com/reference-glossary.json"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/glossary.css"><script type="application/ld+json">{jsonld(lang,canonical)}</script><script src="/assets/js/theme.js"></script></head><body>{header(lang)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="{'/tr/' if tr else '/en/'}">{'Ana Sayfa' if tr else 'Home'}</a><span>/</span><span>{'Sözlük' if tr else 'Glossary'}</span></nav><main><section class="glossary-hero"><div class="kicker"><span></span><b>{'KANIT SINIFLI REFERANS' if tr else 'EVIDENCE-CLASSIFIED REFERENCE'}</b></div><h1>{hero}</h1><p>{lead}</p><div class="glossary-proof"><span>{len(DATA['terms'])} {'terim' if tr else 'terms'}</span><span>TR / EN</span><span>Google-first sources</span><span>JSON + Markdown</span></div></section><div class="glossary-shell"><div class="glossary-intro"><section class="glossary-panel">{intro_a}</section><section class="glossary-panel">{intro_b}</section></div><div class="glossary-search"><input type="search" data-glossary-search aria-label="{e(labels['search'])}" placeholder="{e(labels['search'])}"><small><b data-glossary-count>{len(DATA['terms'])}</b> {labels['showing']}</small></div><nav class="core-terms" aria-label="Core glossary terms">{corelinks}</nav><div class="glossary-grid">{''.join(cards)}</div><div class="glossary-empty" data-glossary-empty>{empty}</div><section class="glossary-method"><h2>{methodtitle}</h2><p>{methodp}</p><ul>{''.join(f'<li>{e(x)}</li>' for x in DATA['editorialPolicy']['rules'])}</ul><p><a href="/sources.json">sources.json →</a> · <a href="/reference-glossary.json">reference-glossary.json →</a> · <a href="/{mdrel}">Markdown →</a></p></section><section class="glossary-cta"><div><h2>{ctat}</h2><p>{ctap}</p></div><a href="{ctaa}">{ctab}</a></section><p class="glossary-updated">{updated}: {DATA['lastReviewed']} · v{DATA['version']}</p></div></main>{footer(lang)}<script src="/assets/js/glossary.js"></script></body></html>'''
    dest=ROOT/rel; dest.parent.mkdir(parents=True,exist_ok=True); dest.write_text(page+'\n',encoding='utf-8')
    lines=[f"# {hero}","",lead,"",f"> {'Google-specific claims use first-party Google sources. Industry terms, proposals and HTML&HTML heuristics are explicitly labeled.' if not tr else 'Google davranış iddiaları birinci taraf Google kaynaklarına dayanır. Sektör terimleri, öneriler ve HTML&HTML sezgisel analizleri açıkça etiketlenir.'}",""]
    for t in DATA['terms']:
        lines += [f"## {t['term']} — {t['expanded'][lang]}","",f"Class: {CLASS_LABELS[lang].get(t['class'],t['class'])}","",t['definition'][lang],"",f"**{'Google ne diyor?' if tr else 'What Google says'}** {t['googlePosition'][lang]}","",f"**{'Site sahibi için' if tr else 'For site owners'}** {t['siteOwnerMeaning'][lang]}","",f"**HTML&HTML** {t['htmlandhtmlUse'][lang]}","",f"**{'Yanlış bilinen' if tr else 'Common misconception'}** {t['myth'][lang]}",""]
        srcs=[SOURCE_MAP[s] for s in t.get('sourceIds',[]) if s in SOURCE_MAP]
        if srcs:
            lines.append('Sources:' if not tr else 'Kaynaklar:')
            for s in srcs: lines.append(f"- [{s['publisher']} — {s['title']}]({s['url']})")
            lines.append('')
    md=ROOT/mdrel; md.parent.mkdir(parents=True,exist_ok=True); md.write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('Generated',rel,'and',mdrel)

if __name__=='__main__':
    build('en'); build('tr')
