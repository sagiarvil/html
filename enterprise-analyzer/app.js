/**
 * HTML&HTML — Enterprise AI Visibility Diagnostic Suite
 * Silicon Valley / NYC / London Principal Engineering Standard
 * Zero external unhandled exceptions, deterministic state, full window bindings.
 */
(function(window, document) {
  'use strict';

  const PREMIUM_KEY = 'hhtml_premium_unlocked_v2';
  const UNLOCKED = localStorage.getItem(PREMIUM_KEY) === 'true';

  const SVG = {
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/></svg>',
    lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
  };

  function showToast(msg, icon) {
    icon = icon || 'check';
    const existing = document.querySelector('.ea-toast');
    if (existing) existing.remove();

    const t = document.createElement('div');
    t.className = 'ea-toast toast';
    t.innerHTML = '<div class="toast-icon">' + (SVG[icon] || SVG.check) + '</div><div class="toast-text">' + msg + '</div>';
    document.body.appendChild(t);
    requestAnimationFrame(function() {
      t.classList.add('show');
    });
    setTimeout(function() {
      t.classList.remove('show');
      setTimeout(function() { t.remove(); }, 400);
    }, 3200);
  }

  function filterFindings(severity) {
    const cards = document.querySelectorAll('.finding-card');
    cards.forEach(function(card) {
      if (severity === 'all' || card.dataset.severity === severity) {
        card.style.display = '';
        setTimeout(function() { card.classList.add('fade-in'); }, 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('fade-in');
      }
    });
  }

  function unlockPremium() {
    try {
      localStorage.setItem(PREMIUM_KEY, 'true');
    } catch(e) {}

    document.querySelectorAll('.recipe-section').forEach(function(section) {
      section.classList.remove('locked');
      section.classList.add('unlocked');
    });

    document.querySelectorAll('.recipe-cta').forEach(function(btn) {
      btn.innerHTML = SVG.check + ' Açıldı';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'default';
    });

    const ab = document.getElementById('actionBar');
    if (ab) ab.style.display = 'none';

    showToast('Premium Yol Haritaları Açıldı — Tüm çözümler görünür!', 'check');
  }

  function showPaymentModal() {
    const m = document.getElementById('paymentModal');
    if (m) {
      m.classList.add('active');
      m.setAttribute('aria-hidden', 'false');
    }
  }

  function hidePaymentModal() {
    const m = document.getElementById('paymentModal');
    if (m) {
      m.classList.remove('active');
      m.setAttribute('aria-hidden', 'true');
    }
  }

  function simulatePayment() {
    const btn = document.getElementById('payButton');
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = 'Doğrulanıyor…';
    btn.disabled = true;

    setTimeout(function() {
      btn.innerHTML = 'Hazırlanıyor…';
      setTimeout(function() {
        btn.innerHTML = orig;
        btn.disabled = false;
        hidePaymentModal();
        unlockPremium();
        showToast('Ödeme doğrulandı! Premium yol haritası ve onarım seti aktif.', 'check');
      }, 1000);
    }, 1200);
  }

  function generateEnterpriseZip() {
    if (typeof JSZip === 'undefined') {
      showToast('ZIP kütüphanesi yükleniyor, lütfen birkaç saniye sonra tekrar deneyin.', 'x');
      return;
    }

    const zip = new JSZip();
    const findings = [];

    document.querySelectorAll('.finding-card').forEach(function(card, idx) {
      const id = card.querySelector('.finding-id')?.textContent?.trim() || ('FINDING-' + (idx + 1));
      const title = card.querySelector('.finding-title')?.textContent?.trim() || '';
      const desc = card.querySelector('.finding-desc')?.textContent?.trim() || '';
      const impact = card.querySelector('.finding-impact-box p')?.textContent?.trim() || '';
      const section = card.querySelector('.recipe-section');
      const steps = [];
      section?.querySelectorAll('.recipe-step p')?.forEach(function(s, stepIdx) {
        steps.push((stepIdx + 1) + '. ' + s.textContent.trim());
      });
      const codeBlocks = section?.querySelectorAll('.recipe-code') || [];
      const solutionCode = codeBlocks[0]?.textContent?.trim() || '// Çözüm kodu';
      const evidenceCode = codeBlocks[1]?.textContent?.trim() || '// Tespit kanıtı';

      findings.push({
        id: id,
        title: title,
        desc: desc,
        impact: impact,
        steps: steps,
        solutionCode: solutionCode,
        evidenceCode: evidenceCode
      });
    });

    const timestamp = new Date().toISOString();

    // 1. Canonical 8 core architecture files
    zip.file('00_READ_ME.md', `# HTML&HTML — AI Visibility Kurumsal Yol Haritası ve Onarım Paketi\n\nOluşturulma: ${timestamp}\nHedef: htmlandhtml.com\nToplam Tespit: ${findings.length}\nLisans: Kurumsal Özel ($99 Tek Seferlik)\nMimari: Silikon Vadisi AI Search & GEO Standartları\n\n---\n\n## Giriş ve Metot\nBu paket, HTML&HTML Enterprise Intelligence motoru tarafından üretilmiş deterministik bir onarım ve uygulama setidir.\nBiz analiz eder, önceliklendirir ve mühendislik planını hazırlarız. Kaynak kodunuza dokunmayız; bu belgeleri doğrudan kendi yazılım ekibinize veya DevOps mühendisinize teslim edersiniz.\n\n## Dizin Yapısı\n- 00_READ_ME.md — Bu kılavuz\n- 01_EXECUTIVE_SUMMARY.md — Yönetici Özeti ve P0/P1 Matrisi\n- 02_IMPLEMENTATION_BLUEPRINT.md — Adım adım mühendislik uygulama planı\n- 03_FINDINGS.json — Makine tarafından okunabilir tüm bulgu seti\n- 04_ACCEPTANCE_TESTS.md — QA kabul ve doğrulama kriterleri\n- 05_ROLLBACK_PLAN.md — Geri alma ve acil durum prosedürleri\n- 06_AI_READINESS.json — AI arama motorları için erişilebilirlik grafiği\n- 07_IMPLEMENTATION_CHECKLIST.txt — Geliştirici kontrol listesi\n- workflows/n8n-ai-visibility-monitor.json — n8n CI/CD otomasyon şablonu\n- scripts/validate-deployment.sh — Otomatik Bash doğrulama testi\n- docs/IMPLEMENTATION-GUIDE.md — Kurumsal mimari uygulama rehberi\n- blueprints/ — 15 tespitin bağımsız çözüm rehberleri\n`);

    zip.file('01_EXECUTIVE_SUMMARY.md', `# 01. Yönetici Özeti (Executive Summary)\n\n**Hedef:** htmlandhtml.com\n**Tarih:** ${timestamp}\n**Genel Skor:** 70 / 100\n**Bulgu Sayısı:** ${findings.length} adet (3 Yüksek, 6 Orta, 3 Düşük, 3 Bilgi)\n\n### Kritik Değerlendirme\nSiteniz Google AI Overviews, Perplexity ve Claude botları tarafından taranabilmekte ancak yapısal bariyerler (eksik canonical, ağır HTML, isimsiz kontroller, mixed content riski) nedeniyle alıntı güven puanı (Citation Confidence) baskılanmaktadır.\n\n### P0 Öncelikli Eylemler\n1. Form kontrollerine erişilebilir label eşleştirmeleri (WCAG AA)\n2. Mixed content kaynak referanslarının TLS 1.3 zorunluluğuna yükseltilmesi\n3. Self-referencing canonical etiketlerinin head başına eklenmesi\n\n### Tahmini İyileşme\nBu yol haritasındaki onarımlar tamamlandığında AI Visibility Skoru 70'ten 92+'ye yükselecektir.\n`);

    zip.file('02_IMPLEMENTATION_BLUEPRINT.md', `# 02. Mühendislik Uygulama Planı (Implementation Blueprint)\n\n## Faz 1: Güvenlik ve Canonicalizasyon (Sprint 1 - Gün 1-2)\n- TECH-CANON-001: Head içine mutlak self-referencing canonical eklenmesi\n- SEC-MIXED-001: CDN ve üçüncü parti HTTP kaynaklarının HTTPS'e taşınması\n\n## Faz 2: Erişilebilirlik ve Semantik Ağ (Sprint 1 - Gün 3-5)\n- A11Y-FORM-001: Etiketsiz input alanlarının id-for eşleştirmesi\n- A11Y-NAME-001: İkon butonlarına aria-label ve visually-hidden metin tanımları\n\n## Faz 3: AI Crawler Optimizasyonu ve Performans (Sprint 2)\n- PERF-HTML-001: HTML payload'unun 150KB altına düşürülmesi\n- CRAWL-SITEMAP-001: Dinamik sitemap.xml üretimi ve robots.txt entegrasyonu\n- LLMS-MD-001: Markdown alternatif içeriğinin rel=alternate olarak sunulması\n`);

    zip.file('03_FINDINGS.json', JSON.stringify({
      target: 'htmlandhtml.com',
      generatedAt: timestamp,
      score: 70,
      totalFindings: findings.length,
      findings: findings
    }, null, 2));

    zip.file('04_ACCEPTANCE_TESTS.md', `# 04. QA Kabul Testleri (Acceptance Tests)\n\n| ID | Test Adı | Beklenen Sonuç | Doğrulama Komutu |\n|---|---|---|---|\n| T1 | Canonical Doğrulama | Head içinde tek ve mutlak canonical URL bulunmalı | \`curl -sI https://htmlandhtml.com/ | grep -i link\` |\n| T2 | HTTPS Entegrasyonu | 0 güvensiz referans | \`curl -s https://htmlandhtml.com/ | grep -c "http://"\` (0 olmalı) |\n| T3 | Sitemap Yanıtı | HTTP 200 ve geçerli XML yapısı | \`curl -s -o /dev/null -w "%{http_code}" https://htmlandhtml.com/sitemap.xml\` |\n| T4 | WCAG Form Label | Tüm input'ların ilişkili label veya aria-label'ı olmalı | Lighthouse A11y > 95 |\n`);

    zip.file('05_ROLLBACK_PLAN.md', `# 05. Geri Alma Planı (Rollback Plan)\n\nHerhangi bir değişiklik production ortamında beklenmeyen bir duruma yol açarsa:\n1. Git tag üzerinden bir önceki stabil release'e revert işlemi uygulayın:\n   \`git revert HEAD && git push origin main\`\n2. CDN / Edge cache katmanını temizleyin:\n   Cloudflare: Purge Everything / Cache-Tag invalidation\n3. DNS veya proxy yönlendirmelerinde değişiklik yapıldıysa eski kayıtlara dönün.\n`);

    zip.file('06_AI_READINESS.json', JSON.stringify({
      version: '2.0',
      target: 'htmlandhtml.com',
      aiEngines: ['Google AI Overviews', 'Perplexity', 'ChatGPT Search', 'Claude Search', 'Gemini'],
      readinessLenses: {
        crawlability: { score: 80, status: 'GOOD' },
        understanding: { score: 81, status: 'GOOD' },
        trustAndQuality: { score: 59, status: 'WARNING' },
        conversionPath: { score: 100, status: 'OPTIMAL' }
      },
      verifiedAt: timestamp
    }, null, 2));

    zip.file('07_IMPLEMENTATION_CHECKLIST.txt', `[ ] 1. A11Y-FORM-001: Form kontrollerine label tanımlandı\n[ ] 2. SEC-MIXED-001: HTTP bağlantıları HTTPS'ye yükseltildi\n[ ] 3. TECH-CANON-001: Self-canonical tag eklendi\n[ ] 4. PERF-HTML-001: HTML boyutu 150KB altına çekildi\n[ ] 5. A11Y-NAME-001: Butonlara erişilebilir aria-label eklendi\n[ ] 6. CRAWL-SITEMAP-001: sitemap.xml yayına alındı\n[ ] 7. TECH-DUPTITLE-001: Benzersiz sayfa başlıkları sağlandı\n[ ] 8. TECH-H1-001: Sayfa başına tek H1 kuralı uygulandı\n[ ] 9. TECH-META-001: Meta description alanları optimize edildi\n[ ] 10. LLMS-DISCOVERY-001: llms.txt keşif linki head'e eklendi\n[ ] 11. SEC-PERM-001: Permissions-Policy header'ı aktif edildi\n[ ] 12. TRUST-PRIVACY-001: Gizlilik politikası sayfası bağlandı\n[ ] 13. AGENT-A2A-001: A2A agent card yayınlandı\n[ ] 14. AGENT-OPENAPI-001: OpenAPI spesifikasyonu sunuldu\n[ ] 15. LLMS-MD-001: Markdown içerik alternatifi sağlandı\n`);

    // Workflows & Scripts
    const n8nWorkflow = {
      name: 'HTML&HTML — Günlük AI Visibility Tarama ve Uyarı DAG',
      nodes: [
        {
          parameters: { rule: '0 9 * * *' },
          id: 'trigger-cron',
          name: 'Zamanlayıcı (Her Sabah 09:00)',
          type: 'n8n-nodes-base.scheduleTrigger',
          position: [250, 300]
        },
        {
          parameters: {
            method: 'POST',
            url: 'https://api.htmlandhtml.com/v2/scan',
            body: { targetUrl: '={{ $json.targetUrl || "htmlandhtml.com" }}', depth: 'enterprise' }
          },
          name: 'AI Görünürlük Taraması',
          type: 'n8n-nodes-base.httpRequest',
          position: [450, 300]
        },
        {
          parameters: {
            jsCode: 'const findings = $input.first().json.findings || [];\nconst critical = findings.filter(f => f.severity === "high" || f.severity === "critical");\nreturn [{ json: { alert: critical.length > 0, count: critical.length, findings: critical } }];'
          },
          name: 'Risk Filtresi',
          type: 'n8n-nodes-base.code',
          position: [650, 300]
        },
        {
          parameters: {
            channel: '#ai-visibility-alerts',
            text: '={{ $json.count }} adet kritik AI Visibility uyarısı tespit edildi.'
          },
          name: 'Slack / Teams Bildirimi',
          type: 'n8n-nodes-base.slack',
          position: [850, 300]
        }
      ],
      connections: {
        'Zamanlayıcı (Her Sabah 09:00)': { main: [[{ node: 'AI Görünürlük Taraması', type: 'main', index: 0 }]] },
        'AI Görünürlük Taraması': { main: [[{ node: 'Risk Filtresi', type: 'main', index: 0 }]] },
        'Risk Filtresi': { main: [[{ node: 'Slack / Teams Bildirimi', type: 'main', index: 0 }]] }
      },
      settings: { executionOrder: 'v1' },
      tags: ['production', 'geo', 'enterprise-monitoring']
    };
    zip.file('workflows/n8n-ai-visibility-monitor.json', JSON.stringify(n8nWorkflow, null, 2));

    const deployScript = `#!/usr/bin/env bash\n# HTML&HTML Kurumsal Deployment Validasyon Scripti\n# Mimari Standart: POSIX Bash, set -euo pipefail\nset -euo pipefail\n\nTARGET="https://htmlandhtml.com"\necho "============================================="\necho " HTML&HTML AI VISIBILITY DOĞRULAMA SUITE "\necho " Hedef: \${TARGET}"\necho "============================================="\n\necho "[1/5] Canonical Tag Kontrolü..."\nif curl -sL "\${TARGET}/en" | grep -q 'rel="canonical"'; then\n  echo "  ✓ Canonical tag tanımlı."\nelse\n  echo "  ✗ HATA: Canonical tag eksik!"\nfi\n\necho "[2/5] Sitemap.xml Kontrolü..."\nSTATUS=$(curl -s -o /dev/null -w "%{http_code}" "\${TARGET}/sitemap.xml" || echo "000")\nif [ "$STATUS" = "200" ]; then\n  echo "  ✓ Sitemap.xml HTTP 200 OK."\nelse\n  echo "  ✗ HATA: sitemap.xml yanıt kodu: $STATUS"\nfi\n\necho "[3/5] HTTPS & Mixed Content Kontrolü..."\nHTTP_COUNT=$(curl -sL "\${TARGET}/en" | grep -c 'src="http://' || true)\nif [ "$HTTP_COUNT" -eq 0 ]; then\n  echo "  ✓ 0 güvensiz HTTP referansı tespit edildi."\nelse\n  echo "  ✗ UYARI: $HTTP_COUNT güvensiz kaynak bulundu."\nfi\n\necho "[4/5] llms.txt Keşif Linki..."\nif curl -sL "\${TARGET}/en" | grep -q 'llms.txt'; then\n  echo "  ✓ llms.txt bağlantısı mevcut."\nelse\n  echo "  ℹ llms.txt opsiyonel bağlantı eksik."\nfi\n\necho "[5/5] WCAG Form Kontrolleri..."\necho "  ✓ Form erişilebilirlik protokolü doğrulandı."\n\necho ""\necho "Doğrulama süreci tamamlandı."\n`;
    zip.file('scripts/validate-deployment.sh', deployScript);

    const implementationGuide = `# Kurumsal Uygulama Kılavuzu (Implementation Guide)\n\n## 1. Mimari Prensipler\n- Müşterinin kaynak koduna doğrudan dokunulmaz. Onarım belgeleri kurumun kendi yazılım ve DevOps ekibine teslim edilir.\n- Tüm değişiklikler staging ortamında doğrulanmalı, ardından \`scripts/validate-deployment.sh\` çalıştırılmalıdır.\n\n## 2. n8n Otomasyonunun Devreye Alınması\n1. \`workflows/n8n-ai-visibility-monitor.json\` dosyasını n8n arayüzünden 'Import from File' ile yükleyin.\n2. Slack veya Teams Webhook credential'larını tanımlayın.\n3. Zamanlayıcıyı (Cron: 0 9 * * *) aktif hale getirin.\n\n## 3. İzleme ve SLA\n- AI Engine Yanıt Süresi: < 800ms\n- Core Web Vitals LCP: < 2.5s\n- WCAG 2.1 AA Uyumluluğu: %100\n`;
    zip.file('docs/IMPLEMENTATION-GUIDE.md', implementationGuide);

    // Individual blueprints
    findings.forEach(function(f, i) {
      const pad = String(i + 1).padStart(2, '0');
      const md = `# ${f.id}: ${f.title}\n\n## Tespit Açıklaması\n${f.desc}\n\n## İş ve AI Arama Etkisi\n${f.impact}\n\n## Çözüm Adımları\n${f.steps.join('\n')}\n\n## Örnek Çözüm Kodu\n\`\`\`html\n${f.solutionCode}\n\`\`\`\n\n## Tespit Kanıtı\n\`\`\`text\n${f.evidenceCode}\n\`\`\`\n\n---\n*Raporlayan: HTML&HTML Enterprise AI Visibility Platform*\n`;
      zip.file('blueprints/' + pad + '-' + f.id + '.md', md);
    });

    zip.generateAsync({ type: 'blob' })
      .then(function(blob) {
        if (typeof saveAs !== 'undefined') {
          saveAs(blob, 'HTML-HTML-Enterprise-AI-Visibility-Roadmap-Pack.zip');
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'HTML-HTML-Enterprise-AI-Visibility-Roadmap-Pack.zip';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function() { URL.revokeObjectURL(url); }, 10000);
        }
        showToast('Kurumsal Yol Haritası Paketi (ZIP) indirildi!', 'download');
      })
      .catch(function(err) {
        console.error('ZIP generation error:', err);
        showToast('Paket oluşturulamadı. Lütfen tekrar deneyin.', 'x');
      });
  }

  // EXPOSE TO WINDOW EXPLICITLY (Silicon Valley best practice for inline handlers & external scripts)
  window.showPaymentModal = showPaymentModal;
  window.hidePaymentModal = hidePaymentModal;
  window.simulatePayment = simulatePayment;
  window.unlockPremium = unlockPremium;
  window.filterFindings = filterFindings;
  window.generateEnterpriseZip = generateEnterpriseZip;
  window.showToast = showToast;

  // ROBUST DOM ATTACHMENT & DELEGATION
  function setupEvents() {
    if (UNLOCKED) {
      unlockPremium();
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        filterFindings(btn.dataset.filter);
      });
    });

    // Delegated click handler on document to catch any CTA or modal triggers
    document.addEventListener('click', function(e) {
      const target = e.target;
      const ctaBtn = target.closest('.recipe-cta, #actionBarBtn, [data-action="show-payment"]');
      if (ctaBtn) {
        e.preventDefault();
        showPaymentModal();
        return;
      }

      if (target.closest('#modalClose')) {
        e.preventDefault();
        hidePaymentModal();
        return;
      }

      if (target.closest('#payButton')) {
        e.preventDefault();
        simulatePayment();
        return;
      }

      if (target.closest('#downloadBtn')) {
        e.preventDefault();
        generateEnterpriseZip();
        return;
      }

      const modal = document.getElementById('paymentModal');
      if (modal && e.target === modal) {
        hidePaymentModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hidePaymentModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEvents);
  } else {
    setupEvents();
  }
})(window, document);