#!/usr/bin/env python3
from pathlib import Path
import json, html, re, hashlib
from datetime import datetime, timezone

ROOT=Path(__file__).resolve().parents[1]
DATA_PATH=ROOT/'data/llms-news.json'
DATA=json.loads(DATA_PATH.read_text(encoding='utf-8'))
TODAY=datetime.now(timezone.utc).date().isoformat()


def esc(v): return html.escape(str(v),quote=True)
def slugify(v):
    s=str(v).lower()
    repl={'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u','â':'a','î':'i'}
    for a,b in repl.items(): s=s.replace(a,b)
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    return s[:90] or hashlib.sha1(str(v).encode()).hexdigest()[:12]

def header(lang):
    if lang=='tr':
        return '''<header class="topbar"><div class="topbar-shell"><a class="brand" href="/tr/" aria-label="HTML&amp;HTML"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><nav><a href="/tr/yapay-zeka-arama-gorunurlugu/">AI Görünürlük</a><a href="/tr/llms-txt-validator/">llms.txt</a><a href="/tr/llms-txt-haberler/" aria-current="page">Haberler</a><a href="/tr/rehberler/">Rehberler</a><a href="/tr/sozluk/">Sözlük</a><a href="/tr/fiyatlandirma/">Fiyatlar</a></nav><div class="nav-actions"><a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Tara</a><div class="langs"><a href="/en/llms-txt-news/" aria-label="İngilizceye geç">EN</a></div></div></div></header>'''
    return '''<header class="topbar"><div class="topbar-shell"><a class="brand" href="/en/" aria-label="HTML&amp;HTML"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><nav><a href="/en/ai-search-visibility/">AI Visibility</a><a href="/en/llms-txt-validator/">llms.txt</a><a href="/en/llms-txt-news/" aria-current="page">News</a><a href="/en/guides/">Guides</a><a href="/en/glossary/">Glossary</a><a href="/en/pricing/">Pricing</a></nav><div class="nav-actions"><a class="nav-scan-cta" href="/en/#scanner">Scan Free</a><div class="langs"><a href="/tr/llms-txt-haberler/" aria-label="Switch to Turkish">TR</a></div></div></div></header>'''

def footer(lang):
    if lang=='tr':
        return '''<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/tr/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>Yapay zeka arama görünürlüğü, llms.txt ve web sitesi hazırlığını kanıtla ölçen teknik referans.</p></div><div class="footer-col"><h4>AI Search</h4><ul><li><a href="/tr/yapay-zeka-arama-gorunurlugu/">Yapay Zeka Görünürlüğü</a></li><li><a href="/tr/llms-txt-haberler/">LLMS.TXT Haberler</a></li><li><a href="/tr/sozluk/">Referans Sözlük</a></li><li><a href="/tr/methodology/">Metodoloji</a></li></ul></div><div class="footer-col"><h4>Ürün</h4><ul><li><a href="/tr/#scanner">Ücretsiz Tarama</a></li><li><a href="/tr/fiyatlandirma/">$99 Uygulama Planı</a></li><li><a href="/tr/ai-mention-tracker/">AI Görünürlük Takibi</a></li></ul></div><div class="footer-col"><h4>Makine Yüzeyleri</h4><ul><li><a href="/llms.txt">llms.txt</a></li><li><a href="/sitemap.xml">Sitemap</a></li><li><a href="/openapi.json">OpenAPI</a></li><li><a href="/sources.json">Kaynak Kayıt Defteri</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 HTML&amp;HTML</span><span>Tavsiye, sıralama, atıf, trafik veya gelir garanti edilmez.</span></div></footer>'''
    return '''<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/en/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>Evidence-led technical reference for AI search visibility, llms.txt and website readiness.</p></div><div class="footer-col"><h4>AI Search</h4><ul><li><a href="/en/ai-search-visibility/">AI Search Visibility</a></li><li><a href="/en/llms-txt-news/">LLMS.TXT News</a></li><li><a href="/en/glossary/">Reference Glossary</a></li><li><a href="/en/methodology/">Methodology</a></li></ul></div><div class="footer-col"><h4>Product</h4><ul><li><a href="/en/#scanner">Free Scan</a></li><li><a href="/en/pricing/">$99 Implementation Blueprint</a></li><li><a href="/en/ai-mention-tracker/">AI Visibility Tracking</a></li></ul></div><div class="footer-col"><h4>Machine Surfaces</h4><ul><li><a href="/llms.txt">llms.txt</a></li><li><a href="/sitemap.xml">Sitemap</a></li><li><a href="/openapi.json">OpenAPI</a></li><li><a href="/sources.json">Source Registry</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 HTML&amp;HTML</span><span>Recommendations, rankings, citations, traffic and revenue are not guaranteed.</span></div></footer>'''

def write_cover(item,slug):
    out=ROOT/'assets/news'/f'{slug}.svg';out.parent.mkdir(parents=True,exist_ok=True)
    topic=esc(item['topic'].replace('_',' ')); date=esc(item.get('updatedAt') or item['publishedAt'])
    # Intentionally brand-neutral original artwork: no publisher logo/artwork is copied.
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="t d"><title id="t">HTML&amp;HTML AI Search Intelligence</title><desc id="d">Original editorial graphic for {topic}</desc><rect width="1200" height="675" fill="#11110f"/><rect x="54" y="54" width="1092" height="567" rx="42" fill="#f4f1e9"/><path d="M108 470 H1092" stroke="#b9b3a7" stroke-width="2"/><circle cx="108" cy="158" r="13" fill="#11110f"/><circle cx="150" cy="158" r="13" fill="#11110f" opacity=".42"/><circle cx="192" cy="158" r="13" fill="#11110f" opacity=".18"/><text x="108" y="245" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#11110f">AI SEARCH INTELLIGENCE</text><text x="108" y="314" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="800" fill="#11110f">{topic[:28]}</text><text x="108" y="395" font-family="Arial,Helvetica,sans-serif" font-size="28" fill="#67645e">Evidence → interpretation → action</text><text x="108" y="548" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="700" letter-spacing="3" fill="#11110f">HTML&amp;HTML / {date}</text></svg>'''
    out.write_text(svg,encoding='utf-8')
    return '/assets/news/'+out.name

def article_schema(item,lang,canonical,alternate,cover):
    data={"@context":"https://schema.org","@graph":[{"@type":"NewsArticle","headline":item['title'][lang],"description":item['dek'][lang],"datePublished":item['publishedAt'],"dateModified":item.get('updatedAt') or item['publishedAt'],"mainEntityOfPage":canonical,"image":"https://htmlandhtml.com"+cover,"publisher":{"@type":"Organization","name":"HTML&HTML","url":"https://htmlandhtml.com/"},"isBasedOn":item['sourceUrl']},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Ana Sayfa" if lang=='tr' else 'Home',"item":"https://htmlandhtml.com/tr/" if lang=='tr' else 'https://htmlandhtml.com/en/'},{"@type":"ListItem","position":2,"name":"LLMS.TXT Haberler" if lang=='tr' else 'LLMS.TXT News',"item":"https://htmlandhtml.com/tr/llms-txt-haberler/" if lang=='tr' else 'https://htmlandhtml.com/en/llms-txt-news/'},{"@type":"ListItem","position":3,"name":item['title'][lang],"item":canonical}]}]}
    return json.dumps(data,ensure_ascii=False,separators=(',',':'))

def write_article(item):
    slug=slugify(item['id']);cover=write_cover(item,slug)
    for lang in ('tr','en'):
        hub='/tr/llms-txt-haberler/' if lang=='tr' else '/en/llms-txt-news/'
        other='/en/llms-txt-news/' if lang=='tr' else '/tr/llms-txt-haberler/'
        route=f'{hub}{slug}/'; alternate=f'https://htmlandhtml.com{other}{slug}/'; canonical='https://htmlandhtml.com'+route
        rel=route.strip('/')+'/index.html'; p=ROOT/rel;p.parent.mkdir(parents=True,exist_ok=True)
        tr=lang=='tr'; acts=''.join(f'<li>{esc(x)}</li>' for x in item['actions'][lang]); kw_map = {'yapay zeka arama görünürlüğü': 'AI search visibility'}
        raw_kws = [kw_map.get(x.lower(), x) if not tr else x for x in item['keywords'][:6]]
        tags=''.join(f'<span>{esc(x)}</span>' for x in raw_kws)
        title=esc(item['title'][lang]);dek=esc(item['dek'][lang]);summary=esc(item['summary'][lang]);why=esc(item['whyItMatters'][lang]);tech=esc(item['technicalImpact'][lang]);boundary=esc(item['boundary'][lang]);source=esc(item['sourceUrl'])
        html_doc=f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | HTML&amp;HTML</title><meta name="description" content="{dek}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/llms-txt-haberler/{slug}/"><link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/llms-txt-news/{slug}/"><link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/llms-txt-news/{slug}/"><link rel="describedby" href="https://htmlandhtml.com/llms.txt"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/premium-experience.css?v=1"><meta property="og:type" content="article"><meta property="og:title" content="{title}"><meta property="og:description" content="{dek}"><meta property="og:image" content="https://htmlandhtml.com{cover}"><script type="application/ld+json">{article_schema(item,lang,canonical,alternate,cover)}</script><script src="/assets/js/theme.js"></script></head><body>{header(lang)}<main><article class="news-article" data-news-original-analysis="true"><nav class="breadcrumbs"><a href="{'/tr/' if tr else '/en/'}">{'Ana Sayfa' if tr else 'Home'}</a><span>/</span><a href="{hub}">{'LLMS.TXT Haberler' if tr else 'LLMS.TXT News'}</a></nav><header class="news-hero"><div class="kicker"><span></span><b>HTML&amp;HTML / {'AI SEARCH İSTİHBARATI' if tr else 'AI SEARCH INTELLIGENCE'}</b></div><h1>{title}</h1><p>{dek}</p><div class="news-meta"><time datetime="{esc(item['publishedAt'])}">{esc(item.get('updatedAt') or item['publishedAt'])}</time><span>{esc(item['topic'].replace('_',' '))}</span></div></header><img class="news-cover" src="{cover}" alt="" width="1200" height="675"><div class="news-body"><section><h2>{'Ne değişti?' if tr else 'What changed?'}</h2><p>{summary}</p></section><section><h2>{'Web sitesi sahibi için neden önemli?' if tr else 'Why it matters to a website owner'}</h2><p>{why}</p></section><section><h2>{'Teknik etkisi' if tr else 'Technical impact'}</h2><p>{tech}</p></section><section class="news-actions"><h2>{'Şimdi ne kontrol edilmeli?' if tr else 'What should be checked now?'}</h2><ol>{acts}</ol></section><aside class="news-boundary"><b>{'KANIT SINIRI' if tr else 'EVIDENCE BOUNDARY'}</b><p>{boundary}</p></aside><div class="news-tags">{tags}</div><div class="news-source"><p>{'Bu analiz dış yayının metnini yeniden yayımlamaz; kaynağa dayalı bağımsız HTML&HTML yorumudur.' if tr else 'This brief does not republish the external article; it is independent HTML&HTML analysis grounded in the source.'}</p><a href="{source}" target="_blank" rel="noopener noreferrer external">{'Orijinal kaynak ↗' if tr else 'Original source ↗'}</a></div></div><section class="news-cta"><h2>{'Haberi okudunuz. Şimdi kendi sitenizi ölçün.' if tr else 'You have the context. Now measure your own website.'}</h2><p>{'llms.txt, AI crawler, GEO, AEO, LLMO, AAO, RAG, E-E-A-T ve teknik temel aynı taramada birlikte çalışır.' if tr else 'llms.txt, AI crawler access, GEO, AEO, LLMO, AAO, RAG, E-E-A-T and the technical foundation are evaluated in one scan.'}</p><a class="primary" href="{'/tr/#scanner' if tr else '/en/#scanner'}">{'Yapay Zeka Görünürlüğümü Ücretsiz Tara →' if tr else 'Check My AI Visibility Free →'}</a></section></article></main>{footer(lang)}</body></html>'''
        p.write_text(html_doc,encoding='utf-8')
    return slug,cover

def write_hub(lang,records):
    tr=lang=='tr';route='/tr/llms-txt-haberler/' if tr else '/en/llms-txt-news/';other='/en/llms-txt-news/' if tr else '/tr/llms-txt-haberler/'
    canonical='https://htmlandhtml.com'+route;alternate='https://htmlandhtml.com'+other
    cards=[]
    for item,slug,cover in records:
        cards.append(f'''<article class="news-card"><a class="news-card-image" href="{route}{slug}/"><img src="{cover}" alt="" width="1200" height="675" loading="lazy"></a><div class="news-card-body"><div class="news-meta"><time datetime="{esc(item['publishedAt'])}">{esc(item.get('updatedAt') or item['publishedAt'])}</time><span>{esc(item['topic'].replace('_',' '))}</span></div><h2><a href="{route}{slug}/">{esc(item['title'][lang])}</a></h2><p>{esc(item['dek'][lang])}</p><a class="news-read" href="{route}{slug}/">{'Analizi oku →' if tr else 'Read analysis →'}</a></div></article>''')
    schema=json.dumps({"@context":"https://schema.org","@graph":[{"@type":"CollectionPage","name":"LLMS.TXT Haberler" if tr else 'LLMS.TXT News',"description":"Yapay zeka arama, llms.txt ve web görünürlüğü için kaynak bağlantılı özgün teknik analizler." if tr else 'Original, source-linked technical analysis of AI search, llms.txt and web visibility.',"url":canonical,"dateModified":DATA.get('lastUpdated',TODAY)},{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"url":f'https://htmlandhtml.com{route}{slug}/',"name":item['title'][lang]} for i,(item,slug,_) in enumerate(records)]}]},ensure_ascii=False,separators=(',',':'))
    title='LLMS.TXT Haberler — Yapay Zeka Arama, GEO ve AI Görünürlük | HTML&HTML' if tr else 'LLMS.TXT News — AI Search, GEO & AI Visibility | HTML&HTML'
    desc='llms.txt, yapay zeka arama, GEO, AEO, LLMO, AI crawler, RAG ve agentic web gelişmelerini özgün teknik analiz ve orijinal kaynak bağlantılarıyla takip edin.' if tr else 'Track llms.txt, AI search, GEO, AEO, LLMO, AI crawlers, RAG and the agentic web through original technical analysis with direct source links.'
    hero='LLMS.TXT <em>Haberler</em>' if tr else 'LLMS.TXT <em>News</em>'
    lead='Yapay zeka arama dünyasındaki önemli değişiklikleri kopyalamıyoruz; teknik etkisini, site sahibinin neyi kontrol etmesi gerektiğini ve kanıt sınırını özgün biçimde açıklıyoruz.' if tr else 'We do not copy the AI-search news cycle. We explain the technical impact, what a website owner should verify, and where the evidence boundary sits.'
    rel=route.strip('/')+'/index.html';p=ROOT/rel;p.parent.mkdir(parents=True,exist_ok=True)
    doc=f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/llms-txt-haberler/"><link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/llms-txt-news/"><link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/llms-txt-news/"><link rel="describedby" href="https://htmlandhtml.com/llms.txt"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/premium-experience.css?v=1"><script type="application/ld+json">{schema}</script><script src="/assets/js/theme.js"></script></head><body>{header(lang)}<main><section class="authority-hero news-hub-hero" data-commercial-intent="static"><div class="kicker"><span></span><b>HTML&amp;HTML / AI SEARCH INTELLIGENCE</b></div><h1>{hero}</h1><p>{lead}</p><div class="hero-actions"><a class="primary" href="{'/tr/#scanner' if tr else '/en/#scanner'}">{'Yapay Zeka Görünürlüğümü Ücretsiz Tara →' if tr else 'Check My AI Visibility Free →'}</a><a href="{'/tr/sozluk/' if tr else '/en/glossary/'}">{'AI Arama Sözlüğü →' if tr else 'AI Search Glossary →'}</a></div></section><section class="news-grid" aria-label="{'LLMS.TXT Haberler' if tr else 'LLMS.TXT News'}">{''.join(cards)}</section><section class="px-section news-policy-strip"><div class="px-section-head"><span class="eyebrow">{'EDİTORYAL SÖZLEŞME' if tr else 'EDITORIAL CONTRACT'}</span><h2>{'Kaynak bağlantılı. Özgün. Kanıt sınırı açık.' if tr else 'Source-linked. Original. Evidence-bounded.'}</h2><p>{'Dış yayın metni ve görselleri kopyalanmaz. Her içerik HTML&HTML tarafından yeniden analiz edilir, iki dilde özgün yazılır ve doğrudan orijinal kaynağa bağlanır.' if tr else 'External article text and publisher artwork are not copied. Every brief is independently analyzed by HTML&HTML, written originally in both languages, and linked directly to its source.'}</p></div></section></main>{footer(lang)}</body></html>'''
    p.write_text(doc,encoding='utf-8')

def patch_machine_surfaces(records):
    urls=[]
    for item,slug,_ in records:
        urls.extend([
            ('https://htmlandhtml.com/tr/llms-txt-haberler/'+slug+'/', 'https://htmlandhtml.com/en/llms-txt-news/'+slug+'/', item.get('updatedAt') or item['publishedAt']),
            ('https://htmlandhtml.com/en/llms-txt-news/'+slug+'/', 'https://htmlandhtml.com/tr/llms-txt-haberler/'+slug+'/', item.get('updatedAt') or item['publishedAt'])
        ])
    sitemap=ROOT/'sitemap.xml';s=sitemap.read_text(encoding='utf-8')
    s=re.sub(r'\n?\s*<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*','\n',s)
    blocks=['  <!-- LLMS_NEWS_START -->']
    for loc,alt,date in [('https://htmlandhtml.com/tr/llms-txt-haberler/','https://htmlandhtml.com/en/llms-txt-news/',TODAY),('https://htmlandhtml.com/en/llms-txt-news/','https://htmlandhtml.com/tr/llms-txt-haberler/',TODAY)]+urls:
        hreflang_alt='en' if '/tr/' in loc else 'tr';self_lang='tr' if '/tr/' in loc else 'en'
        blocks.append(f'''  <url><loc>{loc}</loc><lastmod>{date}</lastmod><changefreq>daily</changefreq><priority>{'0.9' if loc.endswith(('haberler/','news/')) else '0.75'}</priority><xhtml:link rel="alternate" hreflang="{self_lang}" href="{loc}"/><xhtml:link rel="alternate" hreflang="{hreflang_alt}" href="{alt}"/></url>''')
    blocks.append('  <!-- LLMS_NEWS_END -->')
    s=s.replace('</urlset>','\n'.join(blocks)+'\n</urlset>')
    sitemap.write_text(s,encoding='utf-8')

    llms=ROOT/'llms.txt';t=llms.read_text(encoding='utf-8');t=re.sub(r'\n?<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*','\n',t)
    lines=['<!-- LLMS_NEWS_START -->','## LLMS.TXT News / AI Search Intelligence','- [LLMS.TXT Haberler (TR)](https://htmlandhtml.com/tr/llms-txt-haberler/): Yapay zeka arama ve llms.txt gelişmelerinin özgün, kaynak bağlantılı teknik analizi.','- [LLMS.TXT News (EN)](https://htmlandhtml.com/en/llms-txt-news/): Original source-linked technical analysis of AI search and llms.txt developments.']
    for item,slug,_ in records[:10]: lines.append(f'- [{item["title"]["en"]}](https://htmlandhtml.com/en/llms-txt-news/{slug}/)')
    lines.append('<!-- LLMS_NEWS_END -->')
    t=t.rstrip()+'\n\n'+'\n'.join(lines)+'\n';llms.write_text(t,encoding='utf-8')

    md=ROOT/'index.md'
    if md.exists():
        x=md.read_text(encoding='utf-8');x=re.sub(r'\n?<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*','\n',x)
        x=x.rstrip()+'\n\n<!-- LLMS_NEWS_START -->\n## LLMS.TXT News\n\n- [TR news hub](https://htmlandhtml.com/tr/llms-txt-haberler/)\n- [EN news hub](https://htmlandhtml.com/en/llms-txt-news/)\n<!-- LLMS_NEWS_END -->\n';md.write_text(x,encoding='utf-8')

records=[]
for item in sorted(DATA['items'],key=lambda x:(x.get('updatedAt') or x['publishedAt']),reverse=True):
    slug,cover=write_article(item);records.append((item,slug,cover))
write_hub('tr',records);write_hub('en',records);patch_machine_surfaces(records)
print(f'LLMS.TXT NEWS BUILD PASS: {len(records)} bilingual original-analysis briefs + hubs + machine discovery surfaces materialized.')
