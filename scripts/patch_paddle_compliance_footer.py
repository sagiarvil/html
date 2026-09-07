#!/usr/bin/env python3
"""Enforce Paddle Merchant of Record compliance footer across all public surfaces."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

TR_LINKS = """        <li><a href="/tr/hakkimizda/">Hakkımızda</a></li>
        <li><a href="/tr/iletisim/">İletişim</a></li>
        <li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>
        <li><a href="/tr/gizlilik/">Gizlilik Politikası</a></li>
        <li><a href="/tr/iade-politikasi/">İade ve İptal Politikası</a></li>
        <li><a href="/tr/teslimat-politikasi/">Teslimat Politikası</a></li>"""

EN_LINKS = """        <li><a href="/en/about/">About</a></li>
        <li><a href="/en/contact/">Contact</a></li>
        <li><a href="/en/terms/">Terms of Service</a></li>
        <li><a href="/en/privacy/">Privacy Policy</a></li>
        <li><a href="/en/refund-policy/">Refund Policy</a></li>
        <li><a href="/en/delivery-policy/">Delivery Policy</a></li>"""

TR_NOTICE = "Ödemeler ve faturalandırma yetkili Satıcı ve Aracı Kurum (Merchant of Record) Paddle.com tarafından yürütülür."
EN_NOTICE = "Payments and billing are processed by our authorized reseller and Merchant of Record Paddle.com."

def main():
    count = 0
    for p in ROOT.glob("**/*.html"):
        if any(part in p.parts for part in [".git", "node_modules", "scratch", ".system_generated"]):
            continue
        rel = str(p.relative_to(ROOT))
        text = p.read_text(encoding="utf-8")
        orig = text
        
        is_tr = ("tr/" in rel) or (rel == "index.html")
        
        if is_tr:
            text = re.sub(r'<h4>Kurumsal</h4>\s*<ul>[\s\S]*?</ul>', f'<h4>Kurumsal</h4>\n      <ul>\n{TR_LINKS}\n      </ul>', text)
            if "Paddle.com" not in text and '<div class="footer-bottom">' in text:
                text = text.replace('<span>© 2026 HTML&amp;HTML. Tüm hakları saklıdır.</span>', f'<span>© 2026 HTML&amp;HTML. Tüm hakları saklıdır. {TR_NOTICE}</span>')
                text = text.replace('<span>© 2026 HTML&HTML. Tüm hakları saklıdır.</span>', f'<span>© 2026 HTML&amp;HTML. Tüm hakları saklıdır. {TR_NOTICE}</span>')
        else:
            text = re.sub(r'<h4>(?:Company|Kurumsal)</h4>\s*<ul>[\s\S]*?</ul>', f'<h4>Company</h4>\n      <ul>\n{EN_LINKS}\n      </ul>', text)
            if "Paddle.com" not in text and '<div class="footer-bottom">' in text:
                text = text.replace('<span>© 2026 HTML&amp;HTML. All rights reserved.</span>', f'<span>© 2026 HTML&amp;HTML. All rights reserved. {EN_NOTICE}</span>')
                text = text.replace('<span>© 2026 HTML&HTML. All rights reserved.</span>', f'<span>© 2026 HTML&amp;HTML. All rights reserved. {EN_NOTICE}</span>')
                
        if text != orig:
            p.write_text(text, encoding="utf-8")
            count += 1
            
    print(f"PADDLE COMPLIANCE FOOTER PASS: {count} HTML surfaces verified and synchronized.")

if __name__ == "__main__":
    main()
