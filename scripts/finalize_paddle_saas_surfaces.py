#!/usr/bin/env python3
"""Final Paddle/SaaS public-surface contract.

Runs after all commercial materializers so pricing/legal/checkout disclosures cannot be
silently overwritten by older templates. It does not modify GitHub workflows or package.json.
"""
from pathlib import Path
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

legal_pages()
checkout()
patch_pricing_and_sitemap()
normalize_public_sources()
for rel,tr in [('index.html',True),('tr/index.html',True),('en/index.html',False),('tr/fiyatlandirma/index.html',True),('en/pricing/index.html',False)]:
    expose_refund_link(ROOT/rel,tr)
normalize_public_sources()
print('PADDLE_SAAS_FINAL_PASS: Paddle review surfaces finalized after commercial build without touching workflow configuration.')
