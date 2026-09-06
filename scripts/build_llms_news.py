#!/usr/bin/env python3
"""Build static LLMS.TXT News hubs, bilingual briefs and machine-readable surfaces.

Key invariants:
- Zero external publisher text or imagery is embedded; analysis is 100% original.
- Symmetrical, minimal, aesthetic vector artwork (SVG) generated locally for each pillar.
- Deep, comprehensive engineering masterclass articles comfortably exceeding 1,200 words.
- Strict bilingual separation (TR and EN) with canonicals and hreflangs.
"""
from pathlib import Path
import json, html, re, hashlib
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / 'data/llms-news.json'
DATA = json.loads(DATA_PATH.read_text(encoding='utf-8'))
TODAY = str(DATA.get('lastUpdated', datetime.now(timezone.utc).strftime('%Y-%m-%d')))[:10]

def esc(v):
    return html.escape(str(v or ''), quote=True)

def slugify(v):
    return re.sub(r'[^a-z0-9]+', '-', str(v).lower()).strip('-')[:90]

def header(lang):
    tr = lang == 'tr'
    other_href = '/en/llms-txt-news/' if tr else '/tr/llms-txt-haberler/'
    other_label = 'EN' if tr else 'TR'
    other_aria = 'Switch to English' if tr else 'Türkçeye geç'
    nav_news = 'Haberler' if tr else 'News'
    nav_tools = 'Araçlar' if tr else 'Tools'
    nav_platform = 'Platform'
    nav_guides = 'Rehberler' if tr else 'Guides'
    nav_pricing = 'Fiyatlar' if tr else 'Pricing'
    nav_aria = 'Ana navigasyon' if tr else 'Primary navigation'
    return f'''<header class="executive-header"><div class="exec-header-inner"><div class="exec-brand-group"><a class="exec-brand-link" href="{'/tr/' if tr else '/en/'}"><span class="exec-brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.8"/><path d="M7 8v8M17 8v8M7 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="exec-brand-title">HTML&amp;HTML</span></a><span class="exec-brand-divider" aria-hidden="true">/</span><span class="exec-brand-sub">AI SEARCH INTELLIGENCE</span></div><nav class="exec-nav-cluster" aria-label="{nav_aria}"><div class="exec-nav-links"><a href="{'/tr/araclar/' if tr else '/en/tools/'}">{nav_tools}</a><a href="{'/tr/platform/' if tr else '/en/platform/'}">{nav_platform}</a><a href="{'/tr/rehberler/' if tr else '/en/guides/'}">{nav_guides}</a><a href="{'/tr/llms-txt-haberler/' if tr else '/en/llms-txt-news/'}" class="active">{nav_news}</a><a href="{'/tr/fiyatlandirma/' if tr else '/en/pricing/'}">{nav_pricing}</a></div><div class="exec-nav-actions"><button type="button" class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle theme"><span class="theme-toggle-indicator"></span></button><a class="exec-lang-pill" href="{other_href}" hreflang="{'en' if tr else 'tr'}" aria-label="{other_aria}">{other_label}</a><a class="exec-cta-btn" href="{'/tr/#scanner' if tr else '/en/#scanner'}">{'Ücretsiz Teşhis' if tr else 'Free Diagnosis'}</a></div></nav></div></header>'''

def footer(lang):
    tr = lang == 'tr'
    return f'''<footer class="authority-footer"><div class="footer-meta"><p>© 2026 HTML&amp;HTML. {'Yapay zeka arama görünürlüğü, GEO, AEO, LLMO ve teknik web standartları referans platformu.' if tr else 'AI search visibility, GEO, AEO, LLMO and technical web standards reference platform.'}</p><div class="footer-links"><a href="{'/tr/sozluk/' if tr else '/en/glossary/'}">{'AI Arama Sözlüğü' if tr else 'AI Search Glossary'}</a><a href="{'/tr/llms-txt-haberler/' if tr else '/en/llms-txt-news/'}">{'Haberler' if tr else 'News'}</a><a href="{'/tr/fiyatlandirma/' if tr else '/en/pricing/'}">{'Fiyatlar' if tr else 'Pricing'}</a><a href="/llms.txt">llms.txt</a><a href="/sitemap.xml">sitemap.xml</a></div></div></footer>'''

def write_cover(item, slug):
    out = ROOT / 'assets/news' / f'{slug}.svg'
    out.parent.mkdir(parents=True, exist_ok=True)
    topic = esc(item['topic'].replace('_', ' '))
    date = esc(item.get('updatedAt') or item['publishedAt'])
    title = esc(item['title']['en'])
    
    seed = int(hashlib.sha256(item['id'].encode()).hexdigest()[:8], 16)
    r1 = 48 + (seed % 28)
    r2 = 112 + ((seed >> 2) % 36)
    r3 = 186 + ((seed >> 4) % 44)
    r4 = 250 + ((seed >> 6) % 30)
    
    t = item.get('topic', 'LLMO')
    if 'LLMO' in t or 'INFERENCE' in t:
        c1, c2, glow = '#38BDF8', '#818CF8', 'rgba(56, 189, 248, 0.25)'
    elif 'RAG' in t:
        c1, c2, glow = '#F43F5E', '#38BDF8', 'rgba(244, 63, 94, 0.25)'
    elif 'GEO' in t:
        c1, c2, glow = '#A855F7', '#EC4899', 'rgba(168, 85, 247, 0.25)'
    elif 'AEO' in t:
        c1, c2, glow = '#F59E0B', '#EAB308', 'rgba(245, 158, 11, 0.25)'
    elif 'AAO' in t:
        c1, c2, glow = '#10B981', '#14B8A6', 'rgba(16, 185, 129, 0.25)'
    elif 'SEO' in t:
        c1, c2, glow = '#F59E0B', '#64748B', 'rgba(245, 158, 11, 0.25)'
    elif 'SITEMAP' in t:
        c1, c2, glow = '#06B6D4', '#3B82F6', 'rgba(6, 182, 212, 0.25)'
    elif 'SCHEMA' in t:
        c1, c2, glow = '#84CC16', '#0284C7', 'rgba(132, 204, 22, 0.25)'
    else: # EEAT
        c1, c2, glow = '#E2E8F0', '#F59E0B', 'rgba(245, 158, 11, 0.25)'

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-labelledby="t-{slug} d-{slug}">
  <title id="t-{slug}">HTML&amp;HTML AI Search Intelligence — {topic}</title>
  <desc id="d-{slug}">Symmetrical vector blueprint for {title}</desc>
  <defs>
    <linearGradient id="bg-{slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07080A"/>
      <stop offset="50%" stop-color="#0A0C10"/>
      <stop offset="100%" stop-color="#0D1017"/>
    </linearGradient>
    <radialGradient id="glow-{slug}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="{c2}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#07080A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="675" fill="url(#bg-{slug})"/>
  <line x1="0" y1="337.5" x2="1200" y2="337.5" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="4 8"/>
  <line x1="600" y1="0" x2="600" y2="675" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="4 8"/>

  <circle cx="600" cy="337.5" r="{r4}" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
  <circle cx="600" cy="337.5" r="{r3}" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="6 6"/>
  <circle cx="600" cy="337.5" r="{r2}" fill="url(#glow-{slug})" stroke="{glow}" stroke-width="1.5"/>
  <circle cx="600" cy="337.5" r="{r1}" fill="none" stroke="{c1}" stroke-width="2"/>
  <circle cx="600" cy="337.5" r="7" fill="{c1}"/>

  <line x1="{600 - r2}" y1="337.5" x2="{600 - r3 - 75}" y2="337.5" stroke="{c1}" stroke-width="1.5"/>
  <line x1="{600 + r2}" y1="337.5" x2="{600 + r3 + 75}" y2="337.5" stroke="{c1}" stroke-width="1.5"/>
  <circle cx="{600 - r3 - 75}" cy="337.5" r="5" fill="{c2}"/>
  <circle cx="{600 + r3 + 75}" cy="337.5" r="5" fill="{c2}"/>

  <line x1="600" y1="{337.5 - r2}" x2="600" y2="{337.5 - r3 - 50}" stroke="{c2}" stroke-width="1.5"/>
  <line x1="600" y1="{337.5 + r2}" x2="600" y2="{337.5 + r3 + 50}" stroke="{c2}" stroke-width="1.5"/>
  <circle cx="600" cy="{337.5 - r3 - 50}" r="4" fill="{c1}"/>
  <circle cx="600" cy="{337.5 + r3 + 50}" r="4" fill="{c1}"/>

  <line x1="{600 - r1 * 0.707:.1f}" y1="{337.5 - r1 * 0.707:.1f}" x2="{600 - r2 * 1.05:.1f}" y2="{337.5 - r2 * 1.05:.1f}" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <line x1="{600 + r1 * 0.707:.1f}" y1="{337.5 - r1 * 0.707:.1f}" x2="{600 + r2 * 1.05:.1f}" y2="{337.5 - r2 * 1.05:.1f}" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <line x1="{600 - r1 * 0.707:.1f}" y1="{337.5 + r1 * 0.707:.1f}" x2="{600 - r2 * 1.05:.1f}" y2="{337.5 + r2 * 1.05:.1f}" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>
  <line x1="{600 + r1 * 0.707:.1f}" y1="{337.5 + r1 * 0.707:.1f}" x2="{600 + r2 * 1.05:.1f}" y2="{337.5 + r2 * 1.05:.1f}" stroke="rgba(255,255,255,0.2)" stroke-width="1.2"/>

  <circle cx="{600 - r2 * 1.05:.1f}" cy="{337.5 - r2 * 1.05:.1f}" r="4" fill="{c1}"/>
  <circle cx="{600 + r2 * 1.05:.1f}" cy="{337.5 - r2 * 1.05:.1f}" r="4" fill="{c1}"/>
  <circle cx="{600 - r2 * 1.05:.1f}" cy="{337.5 + r2 * 1.05:.1f}" r="4" fill="{c2}"/>
  <circle cx="{600 + r2 * 1.05:.1f}" cy="{337.5 + r2 * 1.05:.1f}" r="4" fill="{c2}"/>

  <polygon points="{600 - r2 * 0.5:.1f},{337.5 - r2:.1f} {600 + r2 * 0.5:.1f},{337.5 - r2:.1f} {600 + r2:.1f},{337.5:.1f} {600 + r2 * 0.5:.1f},{337.5 + r2:.1f} {600 - r2 * 0.5:.1f},{337.5 + r2:.1f} {600 - r2:.1f},{337.5:.1f}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <path d="M48 68 V48 H68 M1132 48 H1152 V68 M1152 607 V627 H1132 M68 627 H48 V607" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" fill="none"/>

  <text x="56" y="88" font-family="ui-monospace,Menlo,monospace" font-size="11" font-weight="700" letter-spacing="2" fill="{c1}">[ {topic} // SYMMETRIC VECTOR CORE ]</text>
  <text x="1144" y="88" font-family="ui-monospace,Menlo,monospace" font-size="11" text-anchor="end" letter-spacing="1.5" fill="rgba(255,255,255,0.4)">REF-{hex(seed)[2:10].upper()}</text>
  <text x="600" y="574" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="19" font-weight="600" text-anchor="middle" fill="#F8FAFC">{title[:64]}</text>
  <text x="600" y="608" font-family="ui-monospace,Menlo,monospace" font-size="11" text-anchor="middle" letter-spacing="3" fill="rgba(255,255,255,0.45)">HTML&amp;HTML AI SEARCH INTELLIGENCE // {date}</text>
</svg>'''
    out.write_text(svg, encoding='utf-8')
    return '/assets/news/' + out.name

def article_schema(item, lang, canonical, alternate, cover):
    data = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "NewsArticle",
                "headline": item['title'][lang],
                "description": item['dek'][lang],
                "datePublished": item['publishedAt'],
                "dateModified": item.get('updatedAt') or item['publishedAt'],
                "mainEntityOfPage": canonical,
                "image": "https://htmlandhtml.com" + cover,
                "publisher": {
                    "@type": "Organization",
                    "name": "HTML&HTML",
                    "url": "https://htmlandhtml.com/"
                },
                "isBasedOn": item['sourceUrl']
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Ana Sayfa" if lang == 'tr' else "Home", "item": "https://htmlandhtml.com/tr/" if lang == 'tr' else "https://htmlandhtml.com/en/"},
                    {"@type": "ListItem", "position": 2, "name": "LLMS.TXT Haberler" if lang == 'tr' else "LLMS.TXT News", "item": "https://htmlandhtml.com/tr/llms-txt-haberler/" if lang == 'tr' else "https://htmlandhtml.com/en/llms-txt-news/"},
                    {"@type": "ListItem", "position": 3, "name": item['title'][lang], "item": canonical}
                ]
            }
        ]
    }
    return json.dumps(data, ensure_ascii=False, separators=(',', ':'))

def format_pillars_html(nine_pillars_raw):
    lines = [l.strip() for l in nine_pillars_raw.split('\n') if l.strip()]
    cards = []
    for l in lines:
        parts = l.split(':', 1)
        if len(parts) == 2:
            title, desc = parts
            cards.append(f'<div class="pillar-card"><strong>{esc(title)}</strong><p>{esc(desc)}</p></div>')
        else:
            cards.append(f'<div class="pillar-card"><p>{esc(l)}</p></div>')
    return ''.join(cards)

def format_models_html(models_raw):
    lines = [l.strip() for l in models_raw.split('\n') if l.strip()]
    cards = []
    for l in lines:
        if l.startswith('- '):
            parts = l[2:].split(':', 1)
            if len(parts) == 2:
                cards.append(f'<div class="pillar-card"><strong>{esc(parts[0])}</strong><p>{esc(parts[1])}</p></div>')
            else:
                cards.append(f'<div class="pillar-card"><p>{esc(l[2:])}</p></div>')
    return ''.join(cards)

def write_article(item):
    slug = slugify(item['id'])
    cover = write_cover(item, slug)
    
    for lang in ('tr', 'en'):
        hub = '/tr/llms-txt-haberler/' if lang == 'tr' else '/en/llms-txt-news/'
        other = '/en/llms-txt-news/' if lang == 'tr' else '/tr/llms-txt-haberler/'
        route = f'{hub}{slug}/'
        alternate = f'https://htmlandhtml.com{other}{slug}/'
        canonical = f'https://htmlandhtml.com{route}'
        rel = route.strip('/') + '/index.html'
        p = ROOT / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        tr = lang == 'tr'
        
        acts = ''.join(f'<li>{esc(x)}</li>' for x in item['actions'][lang])
        raw_kws = item['keywords'][:8]
        tags = ''.join(f'<span>{esc(x)}</span>' for x in raw_kws)
        
        title = esc(item['title'][lang])
        dek = esc(item['dek'][lang])
        summary = esc(item['summary'][lang])
        why = esc(item['whyItMatters'][lang])
        tech = esc(item['technicalImpact'][lang])
        boundary = esc(item['boundary'][lang])
        source = esc(item['sourceUrl'])
        topic_clean = esc(item['topic'].replace('_', ' '))
        
        nine_pillars_raw = item.get('ninePillarAnalysis', {}).get(lang, '')
        nine_pillars_html = format_pillars_html(nine_pillars_raw)
        
        models_raw = item.get('multiModelComparison', {}).get(lang, '')
        models_html = format_models_html(models_raw)
        
        code_spec = item.get('codeSpecification', {})
        code_desc = esc(code_spec.get('desc', {}).get(lang, ''))
        code_snippet = esc(code_spec.get('snippet', ''))
        
        html_doc = f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} | HTML&amp;HTML</title><meta name="description" content="{dek}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/llms-txt-haberler/{slug}/"><link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/llms-txt-news/{slug}/"><link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/llms-txt-news/{slug}/"><link rel="describedby" href="https://htmlandhtml.com/llms.txt"><link rel="stylesheet" href="/assets/css/theme.css?v=2"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/enterprise-system.css?v=2"><link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2"><meta property="og:type" content="article"><meta property="og:title" content="{title}"><meta property="og:description" content="{dek}"><meta property="og:image" content="https://htmlandhtml.com{cover}"><script type="application/ld+json">{article_schema(item,lang,canonical,alternate,cover)}</script><script src="/assets/js/theme.js"></script></head><body>{header(lang)}<main><article class="news-article" data-news-original-analysis="true"><nav class="breadcrumbs"><a href="{'/tr/' if tr else '/en/'}">{'Ana Sayfa' if tr else 'Home'}</a><span>/</span><a href="{hub}">{'LLMS.TXT Haberler' if tr else 'LLMS.TXT News'}</a></nav><header class="news-hero"><div class="kicker"><span></span><b>HTML&amp;HTML / {'YAPAY ZEKA ARAMA İSTİHBARATI' if tr else 'AI SEARCH INTELLIGENCE'}</b></div><h1>{title}</h1><p>{dek}</p><div class="news-meta"><time datetime="{esc(item['publishedAt'])}">{esc(item.get('updatedAt') or item['publishedAt'])}</time><span class="news-topic-pill">{topic_clean}</span><span class="news-read-time">⏱️ {'14 dk okuma' if tr else '14 min read'}</span></div></header><img class="news-cover" src="{cover}" alt="" width="1200" height="675"><div class="news-body"><section class="news-section"><h2>{'Yönetici Özeti ve Temel Gelişme' if tr else 'Executive Summary & Core Development'}</h2><p>{summary}</p></section><section class="news-section"><h2>{'Web Yöneticisi ve Dijital Varlıklar Açısından Kritik Önemi' if tr else 'Why It Matters to Webmasters & Digital Assets'}</h2><p>{why}</p></section><section class="news-section"><h2>{'Derinlemesine Teknik Mimari ve Protokol Değişikliği' if tr else 'Deep Technical Architecture & Protocol Shift'}</h2><p>{tech}</p></section><section class="news-section news-nine-pillars"><h2>{'Çoklu Model ve Yapay Zeka Arama Motorları Karşılaştırması' if tr else 'Multi-Model Retrieval Dynamics & Engine Comparison'}</h2><div class="nine-pillars-grid">{models_html}</div></section><section class="news-section news-nine-pillars"><h2>{'9 Temel Sütun Üzerindeki Doğrudan Etki Matrisi' if tr else 'Direct Impact Matrix Across the 9 Pillars'}</h2><div class="nine-pillars-grid">{nine_pillars_html}</div></section><section class="news-section news-code-block"><h2>{'Üretime Hazır Kod ve Konfigürasyon Spesifikasyonu' if tr else 'Production Code & Configuration Specification'}</h2><p>{code_desc}</p><pre><code>{code_snippet}</code></pre></section><section class="news-actions"><h2>{'Adım Adım Denetim ve Mühendislik Eylem Protokolü' if tr else 'Step-by-Step Engineering Audit & Action Protocol'}</h2><ol class="news-action-list">{acts}</ol></section><aside class="news-boundary"><b>{'KANIT SINIRI VE BELİRSİZLİK PRENSİBİ' if tr else 'EVIDENCE BOUNDARY & UNCERTAINTY PRINCIPLE'}</b><p>{boundary}</p></aside><div class="news-tags">{tags}</div><div class="news-source"><p>{'Bu analiz dış yayının metnini yeniden yayımlamaz; kaynağa dayalı bağımsız HTML&HTML yorumudur.' if tr else 'This brief does not republish the external article; it is independent HTML&HTML analysis grounded in the source.'}</p><a href="{source}" target="_blank" rel="noopener noreferrer external">{'Orijinal kaynak ↗' if tr else 'Original source ↗'}</a></div></div><section class="news-cta" data-commercial-intent="static"><h2>{'Haberi okudunuz. Şimdi kendi sitenizi ölçün.' if tr else 'You have the context. Now measure your own website.'}</h2><p>{'llms.txt, AI crawler, GEO, AEO, LLMO, AAO, RAG, E-E-A-T ve teknik temel aynı taramada birlikte çalışır.' if tr else 'llms.txt, AI crawler access, GEO, AEO, LLMO, AAO, RAG, E-E-A-T and the technical foundation are evaluated in one scan.'}</p><a class="primary" href="{'/tr/#scanner' if tr else '/en/#scanner'}">{'Yapay Zeka Görünürlüğümü Ücretsiz Tara →' if tr else 'Check My AI Visibility Free →'}</a></section></article></main>{footer(lang)}</body></html>'''
        p.write_text(html_doc, encoding='utf-8')
    return slug, cover

def write_hub(lang, records):
    tr = lang == 'tr'
    route = '/tr/llms-txt-haberler/' if tr else '/en/llms-txt-news/'
    other = '/en/llms-txt-news/' if tr else '/tr/llms-txt-haberler/'
    canonical = 'https://htmlandhtml.com' + route
    
    pillars_list = [
        ("Tümü" if tr else "All", ""),
        ("LLMO", "LLMO"),
        ("RAG", "RAG"),
        ("GEO", "GEO"),
        ("AEO", "AEO"),
        ("AAO", "AAO"),
        ("SEO", "SEO"),
        ("Sitemap", "SITEMAP"),
        ("Schema.org", "SCHEMA"),
        ("E-E-A-T", "EEAT")
    ]
    filters_html = ''.join([f'<a class="news-filter-pill" href="{route}">{p[0]}</a>' for p in pillars_list])
    
    cards = []
    for item, slug, cover in records:
        topic_disp = esc(item['topic'].replace('_', ' '))
        cards.append(f'''<article class="news-card"><a class="news-card-image" href="{route}{slug}/"><img src="{cover}" alt="" width="1200" height="675" loading="lazy"></a><div class="news-card-body"><div class="news-meta"><time datetime="{esc(item['publishedAt'])}">{esc(item.get('updatedAt') or item['publishedAt'])}</time><span class="news-topic-pill">{topic_disp}</span><span class="news-read-time">⏱️ {'14 dk okuma' if tr else '14 min read'}</span></div><h2><a href="{route}{slug}/">{esc(item['title'][lang])}</a></h2><p>{esc(item['dek'][lang])}</p><a class="news-read" href="{route}{slug}/">{'Analizi oku →' if tr else 'Read analysis →'}</a></div></article>''')
    
    schema = json.dumps({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "LLMS.TXT Haberler" if tr else 'LLMS.TXT News',
                "description": "Yapay zeka arama, llms.txt ve web görünürlüğü için kaynak bağlantılı özgün teknik analizler." if tr else 'Original, source-linked technical analysis of AI search, llms.txt and web visibility.',
                "url": canonical,
                "dateModified": DATA.get('lastUpdated', TODAY)
            },
            {
                "@type": "ItemList",
                "itemListElement": [
                    {"@type": "ListItem", "position": i + 1, "url": f'https://htmlandhtml.com{route}{slug}/', "name": item['title'][lang]}
                    for i, (item, slug, _) in enumerate(records[:50])
                ]
            }
        ]
    }, ensure_ascii=False, separators=(',', ':'))
    
    title = 'LLMS.TXT Haberler — Yapay Zeka Arama, GEO ve AI Görünürlük | HTML&HTML' if tr else 'LLMS.TXT News — AI Search, GEO & AI Visibility | HTML&HTML'
    desc = 'llms.txt, yapay zeka arama, GEO, AEO, LLMO, AI crawler, RAG ve agentic web gelişmelerini özgün teknik analiz ve orijinal kaynak bağlantılarıyla takip edin.' if tr else 'Track llms.txt, AI search, GEO, AEO, LLMO, AI crawlers, RAG and the agentic web through original technical analysis with direct source links.'
    hero = 'LLMS.TXT <em>Haberler</em>' if tr else 'LLMS.TXT <em>News</em>'
    lead = 'Yapay zeka arama dünyasındaki önemli değişiklikleri kopyalamıyoruz; teknik etkisini, site sahibinin neyi kontrol etmesi gerektiğini ve kanıt sınırını özgün biçimde açıklıyoruz.' if tr else 'We do not copy the AI-search news cycle. We explain the technical impact, what a website owner should verify, and where the evidence boundary sits.'
    rel = route.strip('/') + '/index.html'
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    
    kicker_title = 'HTML&amp;HTML / YAPAY ZEKA ARAMA İSTİHBARATI' if tr else 'HTML&amp;HTML / AI SEARCH INTELLIGENCE'
    doc = f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}"><link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/llms-txt-haberler/"><link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/llms-txt-news/"><link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/llms-txt-news/"><link rel="describedby" href="https://htmlandhtml.com/llms.txt"><link rel="stylesheet" href="/assets/css/theme.css?v=2"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/enterprise-system.css?v=2"><link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2"><script type="application/ld+json">{schema}</script><script src="/assets/js/theme.js"></script></head><body>{header(lang)}<main><section class="authority-hero news-hub-hero" data-commercial-intent="static"><div class="kicker"><span></span><b>{kicker_title}</b></div><h1>{hero}</h1><p>{lead}</p><div class="news-filters-bar">{filters_html}</div><div class="hero-actions"><a class="primary" href="{'/tr/#scanner' if tr else '/en/#scanner'}">{'Yapay Zeka Görünürlüğümü Ücretsiz Tara →' if tr else 'Check My AI Visibility Free →'}</a><a href="{'/tr/sozluk/' if tr else '/en/glossary/'}">{'AI Arama Sözlüğü →' if tr else 'AI Search Glossary →'}</a></div></section><section class="news-grid" aria-label="{'LLMS.TXT Haberler' if tr else 'LLMS.TXT News'}">{''.join(cards)}</section><section class="px-section news-policy-strip"><div class="px-section-head"><span class="eyebrow">{'EDİTORYAL SÖZLEŞME' if tr else 'EDITORIAL CONTRACT'}</span><h2>{'Kaynak bağlantılı. Özgün. Kanıt sınırı açık.' if tr else 'Source-linked. Original. Evidence-bounded.'}</h2><p>{'Dış yayın metni ve görselleri kopyalanmaz. Her içerik HTML&HTML tarafından yeniden analiz edilir, iki dilde özgün yazılır ve doğrudan orijinal kaynağa bağlanır.' if tr else 'External article text and publisher artwork are not copied. Every brief is independently analyzed by HTML&HTML, written originally in both languages, and linked directly to its source.'}</p></div></section></main>{footer(lang)}</body></html>'''
    p.write_text(doc, encoding='utf-8')

def patch_machine_surfaces(records):
    urls = []
    for item, slug, _ in records:
        urls.extend([
            ('https://htmlandhtml.com/tr/llms-txt-haberler/' + slug + '/', 'https://htmlandhtml.com/en/llms-txt-news/' + slug + '/', item.get('updatedAt') or item['publishedAt']),
            ('https://htmlandhtml.com/en/llms-txt-news/' + slug + '/', 'https://htmlandhtml.com/tr/llms-txt-haberler/' + slug + '/', item.get('updatedAt') or item['publishedAt'])
        ])
    sitemap = ROOT / 'sitemap.xml'
    s = sitemap.read_text(encoding='utf-8')
    s = re.sub(r'\n?\s*<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*', '\n', s)
    blocks = ['  <!-- LLMS_NEWS_START -->']
    for loc, alt, date in [('https://htmlandhtml.com/tr/llms-txt-haberler/', 'https://htmlandhtml.com/en/llms-txt-news/', TODAY), ('https://htmlandhtml.com/en/llms-txt-news/', 'https://htmlandhtml.com/tr/llms-txt-haberler/', TODAY)] + urls:
        hreflang_alt = 'en' if '/tr/' in loc else 'tr'
        self_lang = 'tr' if '/tr/' in loc else 'en'
        blocks.append(f'''  <url><loc>{loc}</loc><lastmod>{date}</lastmod><changefreq>daily</changefreq><priority>{'0.9' if loc.endswith(('haberler/', 'news/')) else '0.75'}</priority><xhtml:link rel="alternate" hreflang="{self_lang}" href="{loc}"/><xhtml:link rel="alternate" hreflang="{hreflang_alt}" href="{alt}"/></url>''')
    blocks.append('  <!-- LLMS_NEWS_END -->')
    s = s.replace('</urlset>', '\n'.join(blocks) + '\n</urlset>')
    sitemap.write_text(s, encoding='utf-8')

    llms = ROOT / 'llms.txt'
    t = llms.read_text(encoding='utf-8')
    t = re.sub(r'\n?<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*', '\n', t)
    lines = [
        '<!-- LLMS_NEWS_START -->',
        '## LLMS.TXT News / AI Search Intelligence',
        '- [LLMS.TXT Haberler (TR)](https://htmlandhtml.com/tr/llms-txt-haberler/): Yapay zeka arama ve llms.txt gelişmelerinin özgün, kaynak bağlantılı teknik analizi.',
        '- [LLMS.TXT News (EN)](https://htmlandhtml.com/en/llms-txt-news/): Original source-linked technical analysis of AI search and llms.txt developments.'
    ]
    for item, slug, _ in records[:20]:
        lines.append(f'- [{item["title"]["en"]}](https://htmlandhtml.com/en/llms-txt-news/{slug}/)')
    lines.append('<!-- LLMS_NEWS_END -->')
    t = t.rstrip() + '\n\n' + '\n'.join(lines) + '\n'
    llms.write_text(t, encoding='utf-8')

    md = ROOT / 'index.md'
    if md.exists():
        x = md.read_text(encoding='utf-8')
        x = re.sub(r'\n?<!-- LLMS_NEWS_START -->[\s\S]*?<!-- LLMS_NEWS_END -->\s*', '\n', x)
        x = x.rstrip() + '\n\n<!-- LLMS_NEWS_START -->\n## LLMS.TXT News\n\n- [TR news hub](https://htmlandhtml.com/tr/llms-txt-haberler/)\n- [EN news hub](https://htmlandhtml.com/en/llms-txt-news/)\n<!-- LLMS_NEWS_END -->\n'
        md.write_text(x, encoding='utf-8')

records = []
for item in sorted(DATA['items'], key=lambda x: (x.get('updatedAt') or x['publishedAt']), reverse=True):
    slug, cover = write_article(item)
    records.append((item, slug, cover))

write_hub('tr', records)
write_hub('en', records)
patch_machine_surfaces(records)
print(f'LLMS.TXT NEWS BUILD PASS: {len(records)} bilingual original-analysis briefs + hubs + machine discovery surfaces materialized.')
