(() => {
  'use strict';

  const VERSION = '1.0.0';
  const locale = window.location.pathname === '/tr' || window.location.pathname.startsWith('/tr/') ? 'tr' : 'en';

  const EXACT = {
    en: new Map([
      ['Tema', 'Theme'],
      ['Ana Sayfa', 'Home'],
      ['Site Tarama', 'Website Scanner'],
      ['Ücretsiz Kontrol', 'Free Check'],
      ['Çözümler', 'Solutions'],
      ['Haberler', 'News'],
      ['Sözlük', 'Glossary'],
      ['Onarım Seti ($99)', 'Fix Mandate ($99)'],
      ['Örnek Rapor (htmlandhtml.com) →', 'Sample Report (htmlandhtml.com) →'],
      ['Canlı Enterprise Taramayı Başlat', 'Start Live Enterprise Scan'],
      ['18-Motorlu Dağıtık Telemetri ve N8N DAG Orkestrasyonu Çalışıyor...', '18-engine distributed telemetry and n8n DAG orchestration running...'],
      ['105 deterministik kontrol', '105 deterministic controls'],
      ["50'ye kadar sayfa", 'Up to 50 pages'],
      ['30 link probu', '30 link probes'],
      ['Tamamlandı', 'Completed'],
      ['Dikkat Gerekiyor', 'Attention Required'],
      ['Kritik Risk Tespit Edildi', 'Critical Risk Detected'],
      ['Genel AI Visibility Skoru', 'Overall AI Visibility Score'],
      ['Dört Temel Yetkinlik Sütunu', 'Four Core Capability Pillars'],
      ['Deterministik Skor Dağılımı', 'Deterministic Score Distribution'],
      ['Keşif (Crawl & Index)', 'Discovery (Crawl & Index)'],
      ['Anlaşılabilirlik (Schema/LLM)', 'Understandability (Schema/LLM)'],
      ['Güven & Kalite (HSTS/E-E-A-T)', 'Trust & Quality (HSTS/E-E-A-T)'],
      ['Ticari Yol (Action & CTA)', 'Commercial Path (Action & CTA)'],
      ['HTML Boyutu:', 'HTML Size:'],
      ['Kritik', 'Critical'],
      ['Eksik (RFC 6596)', 'Missing (RFC 6596)'],
      ['1 Güvensiz Kaynak', '1 Insecure Source'],
      ['Ağırlık:', 'Weight:'],
      ['Hedef:', 'Target:'],
      ['Bulgu', 'Finding'],
      ['Bulgular', 'Findings'],
      ['Kanıt', 'Evidence'],
      ['Öncelik', 'Priority'],
      ['Etki', 'Impact'],
      ['Efor', 'Effort'],
      ['Kök Neden', 'Root Cause'],
      ['Onarım Yol Haritası', 'Remediation Roadmap'],
      ['Kabul Testi', 'Acceptance Test'],
      ['Regresyon Testi', 'Regression Test'],
      ['Geri Alma', 'Rollback'],
      ['Kopyalandı!', 'Copied!'],
      ['Panoya Kopyala', 'Copy to Clipboard']
    ]),
    tr: new Map([
      ['Theme', 'Tema'],
      ['Home', 'Ana Sayfa'],
      ['Website Scanner', 'Site Tarama'],
      ['Free Check', 'Ücretsiz Kontrol'],
      ['Solutions', 'Çözümler'],
      ['News', 'Haberler'],
      ['Glossary', 'Sözlük'],
      ['Fix Mandate ($99)', 'Onarım Seti ($99)'],
      ['Sample Report (htmlandhtml.com) →', 'Örnek Rapor (htmlandhtml.com) →'],
      ['Start Live Enterprise Scan', 'Canlı Enterprise Taramayı Başlat'],
      ['18-engine distributed telemetry and n8n DAG orchestration running...', '18 motorlu dağıtık telemetri ve n8n DAG orkestrasyonu çalışıyor...'],
      ['105 deterministic controls', '105 deterministik kontrol'],
      ['Up to 50 pages', "50'ye kadar sayfa"],
      ['30 link probes', '30 link probu'],
      ['Completed', 'Tamamlandı'],
      ['Attention Required', 'Dikkat Gerekiyor'],
      ['Critical Risk Detected', 'Kritik Risk Tespit Edildi'],
      ['Overall AI Visibility Score', 'Genel AI Görünürlük Skoru'],
      ['Four Core Capability Pillars', 'Dört Temel Yetkinlik Sütunu'],
      ['Deterministic Score Distribution', 'Deterministik Skor Dağılımı'],
      ['Discovery (Crawl & Index)', 'Keşif (Tarama ve İndeksleme)'],
      ['Understandability (Schema/LLM)', 'Anlaşılabilirlik (Şema/LLM)'],
      ['Trust & Quality (HSTS/E-E-A-T)', 'Güven ve Kalite (HSTS/E-E-A-T)'],
      ['Commercial Path (Action & CTA)', 'Ticari Yol (Eylem ve CTA)'],
      ['HTML Size:', 'HTML Boyutu:'],
      ['Missing (RFC 6596)', 'Eksik (RFC 6596)'],
      ['1 Insecure Source', '1 Güvensiz Kaynak'],
      ['Weight:', 'Ağırlık:'],
      ['Target:', 'Hedef:'],
      ['Finding', 'Bulgu'],
      ['Findings', 'Bulgular'],
      ['Evidence', 'Kanıt'],
      ['Priority', 'Öncelik'],
      ['Impact', 'Etki'],
      ['Effort', 'Efor'],
      ['Root Cause', 'Kök Neden'],
      ['Remediation Roadmap', 'Onarım Yol Haritası'],
      ['Acceptance Test', 'Kabul Testi'],
      ['Regression Test', 'Regresyon Testi'],
      ['Rollback', 'Geri Alma'],
      ['Copied!', 'Kopyalandı!'],
      ['Copy to Clipboard', 'Panoya Kopyala']
    ])
  };

  const REGEX = {
    en: [
      [/^Hedef:\s*/u, 'Target: '],
      [/^Ağırlık:\s*/u, 'Weight: '],
      [/^(\d+) bulgu$/u, '$1 findings'],
      [/^(\d+) Motor$/u, '$1 Engines'],
      [/^(\d+) motor$/u, '$1 engines'],
      [/ için tespit edilen engeller yapay zeka görünürlük[^.]*\./iu, ' has measured blockers affecting AI search visibility and source readiness.'],
      [/ yapay zeka arama botları tarafından taranırken kritik engellere takılıyor[^.]*\./iu, ' has critical website-side blockers affecting AI crawler access and source readiness.'],
      [/ yapay zeka arama motorları ve botlar tarafından taranabilir ve önerilebilir durumda\./iu, ' is technically accessible to measured crawlers and has strong source-readiness signals.']
    ],
    tr: [
      [/^Target:\s*/u, 'Hedef: '],
      [/^Weight:\s*/u, 'Ağırlık: '],
      [/^(\d+) findings$/u, '$1 bulgu'],
      [/^(\d+) Engines$/u, '$1 Motor'],
      [/^(\d+) engines$/u, '$1 motor']
    ]
  };

  function localizedPath(targetLocale) {
    const url = new URL(window.location.href);
    url.searchParams.delete('lang');
    let path = url.pathname;
    if (targetLocale === 'tr') {
      if (!(path === '/tr' || path.startsWith('/tr/'))) path = '/tr' + (path.startsWith('/') ? path : '/' + path);
    } else {
      path = path.replace(/^\/tr(?=\/|$)/, '') || '/';
    }
    url.pathname = path;
    return url.pathname + url.search + url.hash;
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || Boolean(parent.closest('script,style,pre,code,textarea,.recipe-code,.evidence-box,.ea-file-viewer-body,[data-locale-raw]'));
  }

  function translateText(text) {
    const raw = text;
    const trimmed = raw.trim();
    if (!trimmed) return raw;
    const exact = EXACT[locale].get(trimmed);
    let translated = exact !== undefined ? exact : trimmed;
    for (const [pattern, replacement] of REGEX[locale]) translated = translated.replace(pattern, replacement);
    if (translated === trimmed) return raw;
    const lead = raw.match(/^\s*/)?.[0] || '';
    const tail = raw.match(/\s*$/)?.[0] || '';
    return lead + translated + tail;
  }

  function normalizeSubtree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (!shouldSkip(root)) root.nodeValue = translateText(root.nodeValue || '');
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    for (const textNode of nodes) if (!shouldSkip(textNode)) textNode.nodeValue = translateText(textNode.nodeValue || '');
  }

  function normalizeAttributes() {
    const input = document.getElementById('eaDomainInput');
    if (input) input.placeholder = locale === 'en' ? 'https://yourcompany.com (or domain to scan)' : 'https://sirketiniz.com (veya taranacak alan adı)';
    const theme = document.getElementById('themeToggle');
    if (theme) theme.setAttribute('aria-label', locale === 'en' ? 'Change theme' : 'Temayı değiştir');
  }

  function bindLocaleNavigation() {
    const controls = [
      ...document.querySelectorAll('[data-lang]'),
      document.getElementById('btnLangTr'),
      document.getElementById('btnLangEn')
    ].filter(Boolean);

    for (const control of controls) {
      const targetLocale = control.getAttribute('data-lang') || (control.id === 'btnLangTr' ? 'tr' : 'en');
      control.classList.toggle('active', targetLocale === locale);
      control.setAttribute('aria-pressed', targetLocale === locale ? 'true' : 'false');
      control.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const target = localizedPath(targetLocale);
        if (target !== window.location.pathname + window.location.search + window.location.hash) window.location.assign(target);
      }, true);
    }
  }

  function enforce() {
    document.documentElement.lang = locale;
    document.documentElement.dataset.eaLocale = locale;
    normalizeAttributes();
    normalizeSubtree(document.body);
  }

  window.__EA_LOCALE_CONTRACT__ = Object.freeze({ locale, version: VERSION, source: 'url-path' });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindLocaleNavigation();
      enforce();
    }, { once: true });
  } else {
    bindLocaleNavigation();
    enforce();
  }

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      enforce();
    });
  });
  observer.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
})();
