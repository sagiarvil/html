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

INTENT = {
    'tr': {
        'ai-mention-tracker': 'Önce görünürlüğü ölçün, sonra hangi sorguların markanızı gerçekten taşıdığını izleyin. Mention tek başına hedef değildir; değer, görünürlüğün nitelikli ziyarete ve talebe bağlanmasıdır.',
        'ai-crawler-checker': 'AI sistemi sayfanıza ulaşamıyorsa içerik kalitesi tartışması başlamadan biter. Önce erişim ve politika katmanını doğrulayın.',
        'llms-txt-validator': 'llms.txt bir sıralama garantisi değildir. Doğru kullanıldığında makine tarafından keşfedilebilir bilgi yüzeyinin bir parçasıdır; bozuk bağlantı ve yanlış yapı fırsatı zayıflatabilir.',
        'schema-validator': 'Makine kim olduğunuzu, ne sunduğunuzu ve sayfalar arasındaki ilişkiyi çözemiyorsa kaynak seçimi zorlaşır. Entity graph bütünlüğünü doğrulayın.',
        'teknik-seo-kontrol': 'AI keşfi hâlâ taranabilir, kanonik ve anlamlı bir web temeline dayanır. Teknik SEO hataları yalnız Google’ı değil retrieval zincirini de etkileyebilir.',
        'guvenlik-basliklari-kontrol': 'Güvenli ve erişilebilir HTTP yüzeyi; crawler, agent ve kullanıcı deneyiminin ortak temelidir. Yanlış güvenlik politikaları erişimi istemeden kesebilir.',
        'erisilebilirlik-kontrol': 'Erişilebilir etiketler yalnız insanlara yardım etmez; ajanların buton, form ve sayfa yapısını doğru yorumlamasını da kolaylaştırır.',
        'link-kontrol': 'AI veya arama sonucu kullanıcıyı kırık bir URL’ye getiriyorsa keşif ticari değere dönüşmez. Yönlendirme ve link bütünlüğünü koruyun.',
        'site-tarama': 'Tek bir skor yerine, AI ve arama görünürlüğünün hangi halkada koptuğunu görün: keşif, anlama, kaynak olma veya dönüşüm.',
        'ai-website-readiness': 'AI hazırlığı; bir dosya eklemekten fazlasıdır. Erişim, entity, cevap çıkarılabilirliği, bilgi değeri, güven ve dönüşüm aynı zincirde çalışmalıdır.',
        'platform': 'HTML&HTML’nin işi “AI sizi önersin” vaadi satmak değil; öneri ve kaynak gösterimi için gerekli site tarafı koşulların hangilerinin eksik olduğunu kanıtlamaktır.',
        'araclar': 'Her araç aynı sorunun farklı halkasını ölçer: AI ve arama sistemlerinin sizi bulması, anlaması, kaynak olarak değerlendirmesi ve kullanıcıyı size taşıması.',
        'rehberler': 'Rehberlerin amacı içerik üretmek değil; AI keşfi ve nitelikli talep için uygulanabilir kararları teknik kanıtla açıklamaktır.',
        'fiyatlandirma': 'Ücretsiz katman neyin yanlış olduğunu kanıtlar. $149 Fix Mandate, bu engelleri test edilebilir uygulama sırasına çevirir.',
        'fix-mandate': 'Bir “AI tavsiye garantisi” satın almazsınız. Ölçülen engelleri kaldıran, test eden ve geri dönüş planı olan bir uygulama sözleşmesi satın alırsınız.'
    },
    'en': {
        'ai-mention-tracker': 'Measure visibility first, then track which neutral prompts actually surface your brand. A mention is not the end goal; value comes when visibility becomes qualified visits and demand.',
        'ai-crawler-checker': 'If an AI system cannot reach your page, content quality never enters the conversation. Validate access and policy before optimizing anything else.',
        'llms-txt-validator': 'llms.txt is not a ranking guarantee. Used correctly, it can support machine-readable discovery; broken links and weak structure can undermine that surface.',
        'schema-validator': 'If machines cannot resolve who you are, what you offer, and how entities connect, source selection becomes harder. Validate entity graph integrity.',
        'technical-seo-checker': 'AI discovery still depends on a crawlable, canonical, meaningful web foundation. Technical SEO failures can break retrieval as well as traditional search.',
        'security-headers-checker': 'A secure, reachable HTTP surface is shared infrastructure for crawlers, agents, and users. Misconfigured controls can block the very systems you want to reach.',
        'accessibility-checker': 'Accessible labels help people and also make buttons, forms, and page structure easier for agents to interpret correctly.',
        'link-integrity-checker': 'If AI or search sends a user to a broken URL, discovery cannot become commercial value. Protect referral paths and internal link integrity.',
        'website-scanner': 'Do not settle for one score. Find where AI and search visibility breaks: discovery, understanding, source eligibility, or conversion.',
        'ai-website-readiness': 'AI readiness is more than adding a file. Access, entities, answer extractability, information value, trust, and conversion must work as one chain.',
        'platform': 'HTML&HTML does not sell recommendation promises. It proves which site-side conditions for discovery, citation eligibility, and conversion are missing.',
        'tools': 'Each tool measures a different link in the same commercial chain: being found, understood, source-worthy, and able to convert the visit.',
        'guides': 'The guides exist to turn AI discovery into actionable engineering and content decisions, not to manufacture generic SEO copy.',
        'pricing': 'The free layer proves what is wrong. The $149 Fix Mandate turns measurable blockers into a testable implementation sequence.',
        'fix-mandate': 'You are not buying an “AI recommendation guarantee.” You are buying an implementation contract that removes measured blockers, tests the result, and defines rollback.'
    }
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

def route_lead(rel: str, lang: str, default: str) -> str:
    for key, value in INTENT[lang].items():
        if f'/{key}/' in f'/{rel}':
            return value
    return default

def evidence_html(lang: str, c: dict) -> str:
    cards = ''.join(
        f'<article><b>{name}</b><p>{text}</p><a href="{url}" target="_blank" rel="noopener noreferrer">{c["source"]} ↗</a></article>'
        for name,text,url in EVIDENCE[lang]
    )
    return f'<div class="ai-market-evidence"><h3>{c["why"]}</h3><div>{cards}</div></div>'

def section_html(rel: str, lang: str, with_evidence: bool) -> str:
    c = TR if lang == 'tr' else EN
    lead = route_lead(rel, lang, c['lead'])
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
        f'<p class="ai-opportunity-lead">{lead}</p>'
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
    section = section_html(rel, lang, rel in EVIDENCE_ROUTES)
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
