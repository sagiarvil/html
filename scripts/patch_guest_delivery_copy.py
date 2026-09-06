#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PAGES={
 'tr/fiyatlandirma/index.html':'<p class="guest-delivery-contract"><strong>Üyelik zorunlu değildir.</strong> Ödeme doğrulandıktan sonra teslim paketi, alan adına bağlı kısa ömürlü güvenli indirme yetkisiyle sunulur.</p>',
 'en/pricing/index.html':'<p class="guest-delivery-contract"><strong>No membership is required.</strong> After verified payment, the delivery package is served through a short-lived secure download entitlement bound to the target domain.</p>'
}
for rel,block in PAGES.items():
 p=ROOT/rel;text=p.read_text(encoding='utf-8')
 marker='Üyelik zorunlu değildir' if rel.startswith('tr/') else 'No membership is required'
 if marker not in text:
  text=text.replace('</main>',block+'</main>',1) if '</main>' in text else text+block
  p.write_text(text,encoding='utf-8')
print('GUEST DELIVERY COPY PASS: no-membership delivery is explicit on TR/EN pricing surfaces.')
