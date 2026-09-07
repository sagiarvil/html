#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PAGES={
 'tr/fiyatlandirma/index.html':'<div class="guest-delivery-contract" style="margin:24px auto;max-width:980px;padding:16px 20px;background:rgba(30,41,59,0.5);border:1px solid #334155;border-radius:12px;font-size:14px;color:#94a3b8;line-height:1.6"><strong style="color:#f8fafc">100% Otomatik Yazılım ve Dijital Ürünler (SaaS):</strong> Bu platformda sunulan ürünler anında teslim edilen dijital kod paketleri ve yazılım lisanslarıdır. Şirketimiz reklam, pazarlama, SEO danışmanlığı, insan danışmanlığı veya özel yazılım geliştirme hizmeti <strong>SUNMAZ</strong>. Ödeme sonrası teslim paketi üyelik gerektirmeden anında güvenli indirme yetkisiyle sunulur.</div>',
 'en/pricing/index.html':'<div class="guest-delivery-contract" style="margin:24px auto;max-width:980px;padding:16px 20px;background:rgba(30,41,59,0.5);border:1px solid #334155;border-radius:12px;font-size:14px;color:#94a3b8;line-height:1.6"><strong style="color:#f8fafc">100% Automated Software & Digital Goods (SaaS):</strong> All products offered on this platform are instant digital code artifacts and software licenses. HTML&HTML <strong>DOES NOT</strong> provide advertising, marketing campaigns, SEO consulting, human advisory, or bespoke IT/software development services. Delivery is 100% electronic and instantaneous with no membership required.</div>'
}
for rel,block in PAGES.items():
 p=ROOT/rel;text=p.read_text(encoding='utf-8')
 marker='100% Otomatik Yazılım' if rel.startswith('tr/') else '100% Automated Software'
 if marker not in text:
  text=text.replace('</main>',block+'</main>',1) if '</main>' in text else text+block
  p.write_text(text,encoding='utf-8')
print('GUEST DELIVERY COPY PASS: automated SaaS disclaimer and no-membership delivery are explicit on TR/EN pricing surfaces.')
