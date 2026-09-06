#!/usr/bin/env python3
"""Final Paddle/SaaS public-surface contract.

Runs after all commercial materializers so pricing/legal/checkout disclosures cannot be
silently overwritten by older templates. It does not modify GitHub workflows or package.json.
"""
from pathlib import Path
import json, re
from prepare_paddle_saas import legal_pages, patch_pricing_and_sitemap, normalize_public_sources
from render_paddle_checkout import render_checkout

ROOT=Path(__file__).resolve().parents[1]
PRODUCT_CONFIG=ROOT/'config/paddle-product.json'

def paddle_product():
    if not PRODUCT_CONFIG.exists():
        raise SystemExit('PADDLE_PRODUCT_CONFIG_MISSING')
    data=json.loads(PRODUCT_CONFIG.read_text(encoding='utf-8'))
    price_id=str(data.get('priceId','')).strip()
    if not re.fullmatch(r'pri_[a-z0-9]+',price_id):
        raise SystemExit('PADDLE_PRICE_ID_INVALID')
    if int(data.get('displayPriceUsd',0))!=99:
        raise SystemExit('PADDLE_DISPLAY_PRICE_DRIFT')
    if data.get('billingType')!='one_time':
        raise SystemExit('PADDLE_BILLING_TYPE_DRIFT')
    return data

def bind_paddle_price():
    cfg=paddle_product(); price_id=cfg['priceId']
    p=ROOT/'checkout.html'
    if not p.exists(): raise SystemExit('CHECKOUT_MISSING')
    s=p.read_text(encoding='utf-8')
    if 'name="paddle-price-id"' not in s:
        s=s.replace('</head>',f'<meta name="paddle-price-id" content="{price_id}"></head>',1)
    s=s.replace('<button class="checkout-disabled" type="button" disabled data-k="buy">',f'<button class="checkout-disabled" type="button" disabled data-k="buy" data-paddle-buy data-paddle-price-id="{price_id}">',1)
    if '/assets/js/paddle-checkout.js' not in s:
        s=s.replace('</body>','<script src="/assets/js/paddle-checkout.js"></script></body>',1)
    p.write_text(s,encoding='utf-8')

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
    # Keep the fail-closed disclosure explicit until Paddle account/domain approval,
    # a valid client-side token and a verified server-side webhook are all configured.
    required="Güvenli ödeme sağlayıcısı henüz production'a bağlanmadı."
    if required not in s:
        s=s.replace('Paddle canlı onayı bekleniyor',required+' Paddle canlı onayı bekleniyor',1)
    if 'Paddle ödeme webhook' not in s and 'Paddle payment webhook' not in s:
        s=s.replace('</section>','<p class="checkout-notice">Paddle ödeme webhook\'u sunucu tarafında doğrulanmadan teslim yetkisi üretilemez.</p></section>',1)
    p.write_text(s,encoding='utf-8')

def ensure_root_trust_authority(path:Path,canonical:str,name:str):
    if not path.exists(): return
    s=path.read_text(encoding='utf-8')
    s=re.sub(r'<link rel="canonical" href="[^"]+">',f'<link rel="canonical" href="{canonical}">',s,count=1)
    if 'rel="canonical"' not in s:
        s=s.replace('</title>',f'</title><link rel="canonical" href="{canonical}">',1)
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
render_checkout()
bind_paddle_price()
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
print('PADDLE_SAAS_FINAL_PASS: bilingual checkout rendered; Paddle price ID bound; payment remains verified-webhook fail-closed until live credentials/approval.')
