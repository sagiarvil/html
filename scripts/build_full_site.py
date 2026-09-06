import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f"Generated: {rel_path}")

# Common Nav Links
def get_nav(lang, active_tab=''):
    if lang == 'tr':
        return f'''<nav>
  <a href="/tr/platform/">Platform</a>
  <a href="/tr/araclar/">Araçlar</a>
  <a href="/tr/rehberler/">Rehberler</a>
  <a href="/tr/methodology/">Metodoloji</a>
  <a href="/tr/fiyatlandirma/">Fiyatlandırma</a>
  <a href="/openapi.json" target="_blank" rel="noopener">API</a>
</nav>'''
    else:
        return f'''<nav>
  <a href="/en/platform/">Platform</a>
  <a href="/en/tools/">Tools</a>
  <a href="/en/guides/">Guides</a>
  <a href="/en/methodology/">Methodology</a>
  <a href="/en/pricing/">Pricing</a>
  <a href="/openapi.json" target="_blank" rel="noopener">API</a>
</nav>'''

def get_header(lang, alt_url, active_tab=''):
    home_url = "/tr/" if lang == 'tr' else "/en/"
    alt_label = "EN" if lang == 'tr' else "TR"
    alt_aria = "Switch to English" if lang == 'tr' else "Türkçeye geç"
    nav_html = get_nav(lang, active_tab)
    return f'''<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="{home_url}" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
    </a>
    {nav_html}
    <div class="nav-actions">
      <div class="langs">
        <a href="{alt_url}" aria-label="{alt_aria}">{alt_label}</a>
      </div>
    </div>
  </div>
</header>'''

def get_footer(lang):
    if lang == 'tr':
        return '''<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/tr/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
      </a>
      <p>Kanıt ücretsizdir. Uygulama kesinliği asıl üründür. Web sitenizin arama ve yapay zeka ajanları tarafından erişilebilirliğini kanıtlarla denetleyin.</p>
    </div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="/tr/platform/">Platform Mimarisi</a></li>
        <li><a href="/tr/fix-mandate/">Full Site Fix Mandate</a></li>
        <li><a href="/tr/fiyatlandirma/">Fiyatlandırma</a></li>
        <li><a href="/openapi.json">OpenAPI Spesifikasyonu</a></li>
        <li><a href="/audit-profile.json">Denetim Profili</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Araçlar</h4>
      <ul>
        <li><a href="/tr/site-tarama/">Web Sitesi Tarayıcısı</a></li>
        <li><a href="/tr/ai-website-readiness/">AI Hazırlık Endeksi</a></li>
        <li><a href="/tr/llms-txt-validator/">llms.txt Doğrulayıcı</a></li>
        <li><a href="/tr/ai-crawler-checker/">AI Tarayıcı Kontrolü</a></li>
        <li><a href="/tr/schema-validator/">Yapısal Veri Kontrolü</a></li>
        <li><a href="/tr/teknik-seo-kontrol/">Teknik SEO Denetimi</a></li>
        <li><a href="/tr/guvenlik-basliklari-kontrol/">Güvenlik Başlıkları</a></li>
        <li><a href="/tr/erisilebilirlik-kontrol/">Erişilebilirlik Denetimi</a></li>
        <li><a href="/tr/link-kontrol/">Link Bütünlüğü</a></li>
        <li><a href="/tr/ai-mention-tracker/">AI Marka Görünürlük Takibi</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Rehberler</h4>
      <ul>
        <li><a href="/tr/rehberler/">Tüm Rehberler</a></li>
        <li><a href="/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/">AI Hazırlık Kontrol Listesi</a></li>
        <li><a href="/tr/rehberler/llms-txt/">llms.txt v2 Standardı</a></li>
        <li><a href="/tr/rehberler/ai-tarayici-erisimi/">AI Bot ve Tarayıcı Yönetimi</a></li>
        <li><a href="/tr/rehberler/ai-icin-yapisal-veri/">AI İçin Yapısal Veri</a></li>
        <li><a href="/tr/rehberler/ai-arama-gorunurlugu/">AI Arama Görünürlüğü (GEO)</a></li>
        <li><a href="/tr/methodology/">Metodoloji</a></li>
        <li><a href="/tr/kanit-standardi/">Kanıt Standardı</a></li>
        <li><a href="/tr/referans/ai-tarayicilar/">AI Tarayıcı Dizini</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kurumsal</h4>
      <ul>
        <li><a href="/tr/hakkimizda/">Hakkımızda</a></li>
        <li><a href="/tr/iletisim/">İletişim</a></li>
        <li><a href="/tr/gizlilik/">Gizlilik Politikası</a></li>
        <li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>
        <li><a href="/tr/iade-politikasi/">İade ve İptal Politikası</a></li>
        <li><a href="/llms.txt">llms.txt (Makine Formatı)</a></li>
        <li><a href="/sources.json">Kaynak Kayıt Defteri</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 HTML&amp;HTML. Tüm hakları saklıdır. Ödemeler ve faturalandırma yetkili Satıcı (Merchant of Record) Paddle.com tarafından yürütülür.</span>
    <span>12 Bağımsız Teşhis Motoru · 50 Sayfalık Deterministik Tarama Sınırı</span>
  </div>
</footer>'''
    else:
        return '''<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
      </a>
      <p>Evidence is free. Implementation precision is the product. Audit your website for search and AI retrieval blockers with deterministic evidence.</p>
    </div>
    <div class="footer-col">
      <h4>Product</h4>
      <ul>
        <li><a href="/en/platform/">Platform Architecture</a></li>
        <li><a href="/en/fix-mandate/">Full Site Fix Mandate</a></li>
        <li><a href="/en/pricing/">Pricing</a></li>
        <li><a href="/openapi.json">OpenAPI Specification</a></li>
        <li><a href="/audit-profile.json">Audit Profile</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Tools</h4>
      <ul>
        <li><a href="/en/website-scanner/">Website Scanner</a></li>
        <li><a href="/en/ai-website-readiness/">AI Website Readiness</a></li>
        <li><a href="/en/llms-txt-validator/">llms.txt Validator</a></li>
        <li><a href="/en/ai-crawler-checker/">AI Crawler Checker</a></li>
        <li><a href="/en/schema-validator/">Schema Validator</a></li>
        <li><a href="/en/technical-seo-checker/">Technical SEO Checker</a></li>
        <li><a href="/en/security-headers-checker/">Security Headers Checker</a></li>
        <li><a href="/en/accessibility-checker/">Accessibility Checker</a></li>
        <li><a href="/en/link-integrity-checker/">Link Integrity Checker</a></li>
        <li><a href="/en/ai-mention-tracker/">AI Mention Tracker</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Resources</h4>
      <ul>
        <li><a href="/en/guides/">Guides Hub</a></li>
        <li><a href="/en/guides/ai-website-readiness-checklist/">AI Readiness Checklist</a></li>
        <li><a href="/en/guides/llms-txt/">llms.txt v2 Standard Guide</a></li>
        <li><a href="/en/guides/ai-crawler-access/">AI Crawler Access Guide</a></li>
        <li><a href="/en/guides/structured-data-for-ai/">Structured Data for AI</a></li>
        <li><a href="/en/guides/ai-search-visibility/">AI Search Visibility (GEO)</a></li>
        <li><a href="/en/methodology/">Methodology</a></li>
        <li><a href="/en/evidence-standard/">Evidence Standard</a></li>
        <li><a href="/en/reference/ai-crawlers/">AI Crawler Directory</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company & Legal</h4>
      <ul>
        <li><a href="/en/about/">About Us</a></li>
        <li><a href="/en/contact/">Contact</a></li>
        <li><a href="/en/privacy/">Privacy Policy</a></li>
        <li><a href="/en/terms/">Terms of Service</a></li>
        <li><a href="/en/refund-policy/">Refund Policy</a></li>
        <li><a href="/llms.txt">llms.txt (Directory)</a></li>
        <li><a href="/sources.json">Source Registry</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 HTML&amp;HTML. All rights reserved. Payments and invoicing are handled by our Merchant of Record, Paddle.com.</span>
    <span>12 Independent Diagnostic Engines · 50-Page Deterministic Boundary</span>
  </div>
</footer>'''

print("Footer and Header templates ready.")
