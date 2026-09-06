#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {
    'checkout.html',
    'en/privacy/index.html', 'en/terms/index.html',
    'tr/gizlilik/index.html', 'tr/kullanim-kosullari/index.html',
    'privacy/index.html', 'terms/index.html'
}
EVIDENCE_ROUTES = {
    'index.html', 'en/index.html', 'tr/index.html',
    'en/platform/index.html', 'tr/platform/index.html',
    'en/pricing/index.html', 'tr/fiyatlandirma/index.html',
    'en/fix-mandate/index.html', 'tr/fix-mandate/index.html'
}

TR = {
    'eyebrow': 'AI KEŞİF → TALEP → DÖNÜŞÜM',
    'title': 'Müşteri AI’ya “kimi seçmeliyim?” diye sorduğunda, siteniz cevapta aday mı?',
    'lead': 'AI görünürlüğü tek başına gelir değildir. Ticari değer; sitenizin bulunabilmesi, doğru anlaşılması, güvenilir bir kaynak olarak değerlendirilebilmesi, tıklanabilmesi ve ziyaretçiyi müşteriye dönüştürebilmesiyle oluşur. HTML&HTML bu zincirin site tarafındaki ölçülebilir kırıklarını bulur.',
    'primary': 'AI Görünürlük Engellerimi Ücretsiz Tara',
    'paid': '$149 Düzeltme Sözleşmesini Gör',
    'guard': 'Garanti satmıyoruz: AI sıralaması, öneri, atıf, trafik veya gelir garanti edilemez. Ölçtüğümüz şey, bu sonuçların önündeki site kaynaklı teknik ve içerik engelleridir.',
    'scan': '/tr/site-tarama/', 'fix': '/tr/fix-mandate/',
    'stages': [
        ('01','BULUN','AI ve arama tarayıcılarının kritik sayfalara erişmesini engelleyen sorunları kaldırın.'),
        ('02','ANLAŞILIN','Varlık, içerik, yapılandırılmış veri ve cevap çıkarılabilirliğini makine için netleştirin.'),
        ('03','KAYNAK OLABİLİN','Kanıt, özgün bilgi, güven ve retrieval sinyalleriyle kaynak gösterilmeye elverişli yüzey oluşturun.'),
        ('04','TIKLANIN & DÖNÜŞTÜRÜN','AI yönlendirmesini ölçülebilir trafik, güçlü teklif ve net CTA ile ticari sonuca bağlayın.')
    ],
    'why': 'Neden şimdi?', 'source': 'Kaynağı aç'
}
EN = {
    'eyebrow': 'AI DISCOVERY → DEMAND → CONVERSION',
    'title': 'When your customer asks AI “who should I choose?”, is your website eligible for the answer?',
    'lead': 'AI visibility is not revenue by itself. Commercial value appears when your site can be discovered, understood, considered as a credible source, clicked, and then convert the visit. HTML&HTML finds measurable site-side breaks across that chain.',
    'primary': 'Scan My AI Visibility Blockers Free',
    'paid': 'See the $149 Fix Mandate',
    'guard': 'We do not sell guarantees: AI rankings, recommendations, mentions, citations, traffic, or revenue cannot be guaranteed. We measure site-side technical and content blockers that can prevent eligibility, retrieval, and conversion.',
    'scan': '/en/website-scanner/', 'fix': '/en/fix-mandate/',
    'stages': [
        ('01','BE FOUND','Remove crawl, indexation, and access barriers that keep critical pages out of retrieval.'),
        ('02','BE UNDERSTOOD','Clarify entities, content structure, structured data, and answer extractability for machines.'),
        ('03','BE SOURCE-WORTHY','Strengthen evidence, original information, trust, and retrieval signals that support citation eligibility.'),
        ('04','BE CLICKED & CONVERT','Connect AI referrals to a clear offer, measurable traffic, and conversion-ready calls to action.')
    ],
    'why': 'Why now?', 'source': 'Open source'
}

EVIDENCE = {
    'tr': [
        ('OpenAI','Herkese açık sitelerin ChatGPT Search’te görünebileceğini; OAI-SearchBot erişiminin keşif ve kaynak gösterimi için önemli olduğunu ve ChatGPT yönlendirmelerinin ölçülebildiğini açıklıyor.','https://help.openai.com/en/articles/12627856-publishers-and-developers-faq'),
        ('Google','AI Overviews ve AI Mode’un milyar ölçeğinde kullanıma ulaştığını ve AI Search özelliklerinin web sitelerine milyarlarca tıklama gönderdiğini bildiriyor.','https://blog.google/products-and-platforms/products/search/new-controls-website-owners/'),
        ('Adobe','2026 ABD perakende verilerinde AI kaynaklı ziyaretlerin, AI dışı kanallara göre daha yüksek dönüşüm ve etkileşim gösterebildiğini raporluyor.','https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable')
    ],
    'en': [
        ('OpenAI','OpenAI says public websites can appear in ChatGPT Search, OAI-SearchBot access supports discovery and citation, and ChatGPT referrals can be measured.','https://help.openai.com/en/articles/12627856-publishers-and-developers-faq'),
        ('Google','Google reports billion-scale usage for AI Overviews and AI Mode and says AI Search features send billions of clicks to websites.','https://blog.google/products-and-platforms/products/search/new-controls-website-owners/'),
        ('Adobe','Adobe’s 2026 U.S. retail data reports AI-referred visits outperforming non-AI traffic on conversion and engagement in that market.','https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable')
    ]
}

def detect_lang(html: str) -> str:
    return 'tr' if re.search(r'<html[^>]+lang=["\']tr(?:-|["\'])', html, re.I) else 'en'

def evidence_html(lang: str, c: dict) -> str:
    cards = ''.join(
        f'<article><b>{name}</b><p>{text}</p><a href="{url}" target="_blank" rel="noopener noreferrer">{c["source"]} ↗</a></article>'
        for name,text,url in EVIDENCE[lang]
    )
    return f'<div class="ai-market-evidence"><h3>{c["why"]}</h3><div>{cards}</div></div>'

def section_html(lang: str, with_evidence: bool) -> str:
    c = TR if lang == 'tr' else EN
    stages = ''.join(
        f'<article><b>{n}</b><h3>{title}</h3><p>{desc}</p></article>'
        for n,title,desc in c['stages']
    )
    ev = evidence_html(lang,c) if with_evidence else ''
    return (
        '<section class="ai-opportunity" data-commercial-intent="static">'
        '<div class="ai-opportunity-shell">'
        f'<span class="ai-opportunity-eyebrow">{c["eyebrow"]}</span>'
        f'<h2>{c["title"]}</h2>'
        f'<p class="ai-opportunity-lead">{c["lead"]}</p>'
        f'<div class="ai-value-chain">{stages}</div>'
        '<div class="ai-opportunity-actions">'
        f'<a class="ai-opportunity-primary" href="{c["scan"]}">{c["primary"]} →</a>'
        f'<a class="ai-opportunity-secondary" href="{c["fix"]}">{c["paid"]} →</a>'
        '</div>'
        f'<p class="ai-opportunity-guard">{c["guard"]}</p>{ev}'
        '</div></section>'
    )

def eligible_files():
    files = [ROOT / 'index.html']
    for locale in ('en','tr'):
        base = ROOT / locale
        if base.exists(): files.extend(base.rglob('*.html'))
    return sorted({p.resolve() for p in files if p.exists()})

def inject(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in EXCLUDED: return False
    html = path.read_text(encoding='utf-8')
    if 'data-commercial-intent="static"' in html: return False
    if '<footer' not in html: return False
    lang = detect_lang(html)
    if '/assets/css/commercial-intent.css' not in html:
        html = html.replace('</head>', '<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=1" data-commercial-intent-css="static">\n</head>', 1)
    section = section_html(lang, rel in EVIDENCE_ROUTES)
    html = html.replace('<footer', section + '\n<footer', 1)
    path.write_text(html, encoding='utf-8')
    return True

def main():
    changed=[]
    for path in eligible_files():
        if inject(path): changed.append(path.relative_to(ROOT).as_posix())
    print(f'STATIC_COMMERCIAL_LAYER: {len(changed)} pages injected')
    for rel in changed: print(f'  {rel}')

if __name__ == '__main__':
    main()
