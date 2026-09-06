#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
for rel,tr in [('index.html',True),('tr/index.html',True),('en/index.html',False),('tr/fiyatlandirma/index.html',True),('en/pricing/index.html',False)]:
    p=ROOT/rel
    if not p.exists(): continue
    s=p.read_text(encoding='utf-8')
    href='/tr/iade-politikasi/' if tr else '/en/refund/'
    label='İade Politikası' if tr else 'Refund Policy'
    if href not in s:
        # Put the policy next to existing terms/privacy where possible; otherwise before footer end.
        needles=['<li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>','<li><a href="/terms/">Kullanım Koşulları</a></li>','<li><a href="/en/terms/">Terms</a></li>'] if tr else ['<li><a href="/en/terms/">Terms</a></li>','<li><a href="/terms/">Terms</a></li>']
        inserted=False
        for n in needles:
            if n in s:
                s=s.replace(n,n+f'<li><a href="{href}">{label}</a></li>',1); inserted=True; break
        if not inserted and '</footer>' in s:
            s=s.replace('</footer>',f'<div style="text-align:center;padding:10px 20px;font-size:13px"><a href="{href}">{label}</a></div></footer>',1)
    p.write_text(s,encoding='utf-8')
print('PADDLE_NAV_PASS')
