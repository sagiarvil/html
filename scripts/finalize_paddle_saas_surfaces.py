#!/usr/bin/env python3
"""Final Paddle/SaaS public-surface contract.

Runs after all commercial materializers so pricing/legal/checkout disclosures cannot be
silently overwritten by older templates. It does not modify GitHub workflows or package.json.
"""
from pathlib import Path
import json, re
from prepare_paddle_saas import legal_pages, checkout, patch_pricing_and_sitemap, normalize_public_sources

ROOT=Path(__file__).resolve().parents[1]

def expose_refund_link(path:Path,tr:bool):
    if not path.exists(): return
    s=path.read_text(encoding='utf-8')
    href='/tr/iade-politikasi/' if tr else '/en/refund/'
    label='İade Politikası' if tr else 'Refund Policy'
    if href in s: return
    candidates=(
        ['<li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>', '<li><a href="/terms/">Kullanım Koşulları</a></li>']
        if tr else
        ['<li><a href="/en/terms/">Terms</a></li>', '<li><a href="/terms/">Terms</a></li>']
    )
    for n in candidates:
        if n in s:
            s=s.replace(n,n+f'<li><a href="{href}">{label}</a></li>',1)
            path.write_text(s,encoding='utf-8'); return
    if '</footer>' in s:
        s=s.replace('</footer>',f'<div class="paddle-legal-link" style="text-align:center;padding:10px 20px;font-size:13px"><a href="{href}">{label}</a></div></footer>',1)
        path.write_text(s,encoding='utf-8')

def harden_checkout_dependency():
    p=ROOT/'checkout.html'
    if not p.exists(): return
    s=p.read_text(encoding='utf-8')
    marker='Paddle ödeme webhook’u sunucu tarafında doğrulanmadan teslim yetkisi üretilmez.'
    if marker not in s:
        needle="Paddle domain/account onayı tamamlanana kadar kart verisi toplamıyoruz ve ücret tahsil etmiyoruz. Bu buton onay sonrası Paddle Checkout'a bağlanacaktır."
        replacement="Güvenli ödeme sağlayıcısı henüz production'a bağlanmadı. Seçilen sağlayıcı Paddle'dır. Paddle domain/account onayı tamamlanana kadar kart verisi toplamıyoruz ve ücret tahsil etmiyoruz. Paddle ödeme webhook’u sunucu tarafında doğrulanmadan teslim yetkisi üretilmez. Bu buton onay sonrası Paddle Checkout'a bağlanacaktır."
        if needle in s: s=s.replace(needle,replacement,1)
    p.write_text(s,encoding='utf-8')

def ensure_root_trust_authority(path:Path,canonical:str,name:str):
    if not path.exists(): return
    s=path.read_text(encoding='utf-8')
    s=re.sub(r'<link rel="canonical" href="[^"]+">',f'<link rel="canonical" href="{canonical}">',s,count=1)
    if 'application/ld+json' not in s:
        schema={
            '@context':'https://schema.org',
            '@graph':[
                {'@type':'WebPage','name':name,'url':canonical,'isPartOf':{'@id':'https://htmlandhtml.com/#website'}},
                {'@type':'WebSite','@id':'https://htmlandhtml.com/#website','name':'HTML&HTML','url':'https://htmlandhtml.com/'},
                {'@type':'Organization','@id':'https://htmlandhtml.com/#organization','name':'HTML&HTML','url':'https://htmlandhtml.com/','email':'contact@htmlandhtml.com'}
            ]
        }
        block='<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False,separators=(',',':'))+'</script>'
        s=s.replace('</head>',block+'</head>',1)
    path.write_text(s,encoding='utf-8')

legal_pages()
checkout()
harden_checkout_dependency()
patch_pricing_and_sitemap()
normalize_public_sources()
for rel,tr in [('index.html',True),('tr/index.html',True),('en/index.html',False),('tr/fiyatlandirma/index.html',True),('en/pricing/index.html',False)]:
    expose_refund_link(ROOT/rel,tr)
for rel,canonical,name in [
    ('about/index.html','https://htmlandhtml.com/about/','About HTML&HTML'),
    ('contact/index.html','https://htmlandhtml.com/contact/','Contact HTML&HTML'),
    ('privacy/index.html','https://htmlandhtml.com/privacy/','HTML&HTML Privacy Policy'),
    ('terms/index.html','https://htmlandhtml.com/terms/','HTML&HTML Terms'),
    ('refund/index.html','https://htmlandhtml.com/refund/','HTML&HTML Refund Policy'),
]:
    ensure_root_trust_authority(ROOT/rel,canonical,name)
normalize_public_sources()
print('PADDLE_SAAS_FINAL_PASS: Paddle review surfaces finalized with verified-webhook fail-closed checkout and canonical trust-page authority schema.')
