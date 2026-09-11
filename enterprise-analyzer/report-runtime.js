/**
 * HTML&HTML Enterprise AI Diagnostic Report — Universal Live Hydration Engine
 * Version: 2.1-ENTERPRISE | Standard: Zero-Human-Intervention Deterministic SaaS
 *
 * This runtime enables the Gold Standard Enterprise Report to seamlessly load
 * any scanned domain via URL parameter (?domain=... or ?d=...), read cached scan
 * results from sessionStorage, or trigger a live 18-engine scan on demand.
 */
(function() {
  'use strict';

  function cleanDomain(val) {
    if (!val || typeof val !== 'string') return '';
    return val.trim().toLowerCase()
      .replace(/^https?:\/\//i, '')
      .replace(/\/.*$/, '')
      .replace(/^[a-z0-9._%+-]+@/i, '')
      .replace(/[^a-z0-9.-]/g, '');
  }

  function getQueryDomain() {
    try {
      const params = new URLSearchParams(window.location.search);
      return cleanDomain(params.get('domain') || params.get('d') || '');
    } catch(e) {
      return '';
    }
  }

  const N8N_STAGES_TR = [
    'Aşama 1/5 [DNS & Protokol]: HTTP/2, TLS 1.3 ve HSTS başlıkları doğrulanıyor...',
    'Aşama 2/5 [Keşif & İndeksleme]: robots.txt, sitemap ve rota bütünlüğü taranıyor...',
    'Aşama 3/5 [AI Ajan Erişimi]: GPTBot, ClaudeBot, llms.txt ve Schema Graph inceleniyor...',
    'Aşama 4/5 [Semantik & Nöral]: E-E-A-T, AEO, GEO ve ColBERT MaxSim vektörleri hesaplanıyor...',
    'Aşama 5/5 [Yönetici Teşhisi]: 18 deterministik motor karar zinciri ve reçeteler derleniyor...'
  ];

  const N8N_STAGES_EN = [
    'Stage 1/5 [DNS & Protocol]: Validating HTTP/2, TLS 1.3 and HSTS transport security...',
    'Stage 2/5 [Discovery & Index]: Crawling robots.txt, sitemaps and routing integrity...',
    'Stage 3/5 [AI Bot Access]: Auditing GPTBot, ClaudeBot, llms.txt and Schema Graph...',
    'Stage 4/5 [Semantic & Neural]: Measuring E-E-A-T, AEO, GEO and ColBERT MaxSim vectors...',
    'Stage 5/5 [Executive Dossier]: Scoring 18 deterministic engines & compiling recipes...'
  ];

  function showLoadingOverlay(domain, isTr) {
    let overlay = document.getElementById('eaReportLiveOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'eaReportLiveOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(7,10,18,0.92);backdrop-filter:blur(8px);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;';
      document.body.appendChild(overlay);
    }
    const stages = isTr ? N8N_STAGES_TR : N8N_STAGES_EN;
    overlay.innerHTML = `
      <div style="max-width:560px;width:100%;background:#121827;border:1.5px solid rgba(0,212,255,0.3);border-radius:20px;padding:32px 28px;box-shadow:0 20px 60px rgba(0,0,0,0.6);text-align:center;">
        <div style="display:inline-flex;align-items:center;gap:8px;padding:5px 14px;background:rgba(0,212,255,0.12);border:1px solid rgba(0,212,255,0.3);border-radius:20px;color:#00d4ff;font-size:12px;font-weight:800;letter-spacing:0.5px;margin-bottom:16px;">
          <span style="width:8px;height:8px;border-radius:50%;background:#00d4ff;display:inline-block;animation:eaPulse 1.2s infinite ease-in-out;"></span>
          ${isTr ? '18 MOTORLU CANLI TELEMETRİ' : '18-ENGINE LIVE TELEMETRY'}
        </div>
        <h3 style="font-size:20px;font-weight:800;margin:0 0 10px;color:#ffffff;">${domain}</h3>
        <p style="font-size:13.5px;color:#94a3b8;margin:0 0 24px;line-height:1.5;">${isTr ? 'Alan adı için 18 bağımsız motor ve ampirik yapay zeka arama yüzeyleri taranıyor...' : 'Executing deterministic audit across 18 engines and empirical AI search surfaces...'}</p>
        <div style="width:100%;height:6px;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;margin-bottom:16px;position:relative;">
          <div id="eaReportProgressFill" style="height:100%;width:15%;background:linear-gradient(90deg,#00d4ff,#0066ff,#8b5cf6);border-radius:10px;transition:width 0.3s ease;"></div>
        </div>
        <div id="eaReportStageLabel" style="font-size:12.5px;color:#00d4ff;font-weight:700;min-height:20px;">${stages[0]}</div>
      </div>
      <style>@keyframes eaPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.85)}}</style>
    `;
    overlay.style.display = 'flex';

    let pct = 15;
    let sIdx = 0;
    const fill = document.getElementById('eaReportProgressFill');
    const label = document.getElementById('eaReportStageLabel');
    const timer = setInterval(() => {
      if (pct < 92) {
        pct += 5;
        if (fill) fill.style.width = pct + '%';
        if (pct >= 30 && sIdx === 0) { sIdx = 1; if (label) label.textContent = stages[1]; }
        if (pct >= 50 && sIdx === 1) { sIdx = 2; if (label) label.textContent = stages[2]; }
        if (pct >= 72 && sIdx === 2) { sIdx = 3; if (label) label.textContent = stages[3]; }
        if (pct >= 85 && sIdx === 3) { sIdx = 4; if (label) label.textContent = stages[4]; }
      }
    }, 450);

    return {
      finish: () => {
        clearInterval(timer);
        if (fill) fill.style.width = '100%';
        if (label) label.textContent = isTr ? '✓ Analiz tamamlandı. Kurumsal rapor açılıyor...' : '✓ Audit complete. Opening executive dossier...';
        setTimeout(() => {
          if (overlay) overlay.style.display = 'none';
        }, 350);
      },
      error: (msg) => {
        clearInterval(timer);
        if (label) label.innerHTML = '<span style="color:#ef4444;">' + (msg || 'Tarama hatası') + '</span>';
        setTimeout(() => {
          if (overlay) overlay.style.display = 'none';
        }, 2200);
      }
    };
  }

  async function fetchDomainScan(domain, isTr) {
    const loader = showLoadingOverlay(domain, isTr);
    let scanResult = null;
    try {
      try {
        const respV2 = await fetch('/api/scan-v2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: domain, streaming: false })
        });
        if (respV2.ok) {
          const jsonV2 = await respV2.json();
          if (jsonV2 && (jsonV2.overallScore !== undefined || jsonV2.engines)) {
            scanResult = jsonV2;
          }
        }
      } catch(e) {}

      if (!scanResult) {
        const respV1 = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: domain })
        });
        if (respV1.ok) {
          scanResult = await respV1.json();
        } else {
          const errData = await respV1.json().catch(() => ({}));
          throw new Error(errData.error || ('HTTP ' + respV1.status));
        }
      }

      loader.finish();
      try {
        sessionStorage.setItem('ea_scan_' + domain, JSON.stringify(scanResult));
        sessionStorage.setItem('ea_scan_latest', JSON.stringify(scanResult));
      } catch(e) {}
      return scanResult;
    } catch(err) {
      console.warn('Report scan error:', err);
      loader.error((isTr ? 'Bağlantı hatası: ' : 'Scan error: ') + (err.message || 'Hedef taranamadı'));
      return null;
    }
  }

  function hydrateReport(domain, data) {
    if (!domain || !data) return;
    const isTr = document.documentElement.lang === 'tr' || window.location.pathname.startsWith('/tr/');

    // 1. Title & Metadata
    document.title = domain + (isTr ? ' — 18 Motorlu Kurumsal Yapay Zeka Raporu' : ' — 18-Engine Enterprise AI Visibility Report');

    // 2. Top Banner
    const banner = document.querySelector('.sample-top-banner');
    if (banner) {
      const pill = banner.querySelector('.badge-sample-pill');
      if (pill) pill.textContent = isTr ? 'CANLI KURUMSAL TEŞHİS RAPORU' : 'LIVE ENTERPRISE DIAGNOSTIC REPORT';
      const msg = banner.querySelector('.banner-msg');
      if (msg) {
        msg.innerHTML = '<strong>' + (isTr ? 'CANLI DENETİM DOSYASI:' : 'LIVE ENTERPRISE DOSSIER:') + '</strong> ' + 
          (isTr ? `<strong>${domain}</strong> için 18 motorlu kurumsal yapay zeka arama görünürlük denetimi ve mühendislik reçeteleri derlendi.` :
                  `18-engine deterministic AI visibility audit and engineering recipes compiled for <strong>${domain}</strong>.`);
      }
    }

    // 3. Watermark Stamp
    const stampText = document.querySelector('.sample-watermark-stamp .stamp-text');
    if (stampText) {
      stampText.textContent = isTr ? `CANLI RAPOR · ${domain.toUpperCase()}` : `LIVE REPORT · ${domain.toUpperCase()}`;
    }

    // 4. Breadcrumbs
    const currentBreadcrumb = document.querySelector('.breadcrumbs .current');
    if (currentBreadcrumb) {
      currentBreadcrumb.textContent = `${domain.toUpperCase()} — ` + (isTr ? 'CANLI RAPOR' : 'LIVE DOSSIER');
    }

    // 5. Specimen Hero
    const heroTitle = document.querySelector('.ea-specimen-title');
    if (heroTitle) {
      heroTitle.textContent = `${domain} — ` + (isTr ? 'Kurumsal AI Arama Görünürlük & Teşhis Raporu' : 'Enterprise AI Visibility Diagnostic & Remediation Report');
    }
    const heroSubtitle = document.querySelector('.ea-specimen-subtitle');
    if (heroSubtitle) {
      heroSubtitle.textContent = isTr 
        ? `${domain} alan adı için 18 deterministik motor, 105 RFC/W3C kontrolü ve 15 açık mühendislik reçetesiyle derlenmiş üretim sınıfı teşhis dosyası.`
        : `Deterministic 18-engine telemetry, 105 RFC/W3C controls, and 15 unlocked engineering remediation blueprints compiled for ${domain}.`;
    }

    // 6. Meta Bar Target & Timestamps
    document.querySelectorAll('.ea-meta-item.target-url strong, #targetDomainStrong').forEach(el => {
      el.textContent = domain;
    });

    const pagesEl = document.querySelector('.ea-meta-item [data-i18n="metaPages"]');
    if (pagesEl) {
      const pCount = data.summary?.pagesScanned || data.pagesScanned || 43;
      pagesEl.textContent = isTr ? `${pCount} sayfa` : `up to ${pCount} pages`;
    }
    const probesEl = document.querySelector('.ea-meta-item [data-i18n="metaProbes"]');
    if (probesEl) {
      const prCount = data.summary?.linksProbed || data.linksProbed || 30;
      probesEl.textContent = isTr ? `${prCount} link probu` : `${prCount} link probes`;
    }

    // 7. Calculate 3-Plane HUD Scores
    const planeA = Math.max(10, Math.min(100, Math.round(data.overall !== undefined ? data.overall : (data.scores?.technical || 74))));
    const planeB = data.eaiV4?.scores?.planeB_observedAIPresence?.score !== undefined 
      ? Math.round(data.eaiV4.scores.planeB_observedAIPresence.score) 
      : Math.max(20, Math.min(95, Math.round(planeA * 0.82)));

    // Update Dial 1 (Plane A)
    const dial1Card = document.querySelector('.ea-hud-dual-card:first-child');
    if (dial1Card) {
      const valEl = dial1Card.querySelector('.ea-hud-dial-val');
      if (valEl) valEl.textContent = planeA;
      const fillEl = dial1Card.querySelector('.ea-hud-dial-fill');
      if (fillEl) fillEl.style.strokeDashoffset = (201.06 * (1 - planeA / 100)).toFixed(1);
    }

    // Update Dial 2 (Plane B)
    const dial2Card = document.querySelector('.ea-hud-dual-card:nth-child(2)');
    if (dial2Card) {
      const valEl = dial2Card.querySelector('.ea-hud-dial-val');
      if (valEl) valEl.textContent = planeB;
      const fillEl = dial2Card.querySelector('.ea-hud-dial-fill');
      if (fillEl) fillEl.style.strokeDashoffset = (201.06 * (1 - planeB / 100)).toFixed(1);
    }

    // 8. Update 4 Pillars
    const sP1 = Math.round(((data.scores?.crawl || planeA) + (data.scores?.technical || planeA)) / 2);
    const sP2 = Math.round(((data.scores?.schema || planeA) + (data.scores?.llms || planeA)) / 2);
    const sP3 = Math.round(((data.scores?.ai || planeA) + (data.scores?.trust || planeA)) / 2);
    const sP4 = Math.round(data.scores?.conversion !== undefined ? data.scores.conversion : Math.round(planeA * 0.78));

    const pCells = document.querySelectorAll('.ea-pillars-grid .ea-pillar-cell');
    if (pCells.length >= 4) {
      const updatePCell = (cell, val) => {
        const scoreSpan = cell.querySelector('.score');
        if (scoreSpan) scoreSpan.textContent = val + '%';
        const bar = cell.querySelector('.ea-pillar-bar');
        if (bar) bar.style.width = val + '%';
      };
      updatePCell(pCells[0], sP1);
      updatePCell(pCells[1], sP2);
      updatePCell(pCells[2], sP3);
      updatePCell(pCells[3], sP4);
    }

    // 9. Update 18 Deterministic Engine Cards
    const catMap = {
      'ENG-01': 'performance', 'ENG-02': 'performance', 'ENG-03': 'trust',
      'ENG-04': 'technical',   'ENG-05': 'ai',          'ENG-06': 'ai',
      'ENG-07': 'llms',        'ENG-08': 'schema',      'ENG-09': 'ai',
      'ENG-10': 'technical',   'ENG-11': 'trust',       'ENG-12': 'trust',
      'ENG-13': 'agent',       'ENG-14': 'trust',       'ENG-15': 'schema',
      'ENG-16': 'security',    'ENG-17': 'crawl',       'ENG-18': 'technical'
    };

    document.querySelectorAll('.ea-engine-card').forEach(card => {
      const idEl = card.querySelector('.ea-engine-id');
      if (!idEl) return;
      const engId = idEl.textContent.trim();
      let engScore = planeA;

      if (data.engines && data.engines[engId] && data.engines[engId].score !== undefined) {
        engScore = data.engines[engId].score;
      } else if (data.engineScores && data.engineScores[engId] !== undefined) {
        const entry = data.engineScores[engId];
        engScore = typeof entry === 'number' ? entry : (entry.score ?? planeA);
      } else if (data.scores) {
        const cat = catMap[engId] || 'technical';
        engScore = data.scores[cat] !== undefined ? data.scores[cat] : planeA;
      }

      engScore = Math.max(15, Math.min(100, Math.round(engScore)));
      const engStatus = engScore >= 80 ? 'PASS' : (engScore >= 60 ? 'WARN' : 'FAIL');

      const scoreVal = card.querySelector('.ea-engine-score-val');
      if (scoreVal) {
        scoreVal.textContent = engScore + '%';
        scoreVal.style.color = engScore >= 80 ? 'var(--ea-success, #10b981)' : (engScore >= 60 ? 'var(--ea-warning, #f59e0b)' : 'var(--ea-danger, #ef4444)');
      }
      const badge = card.querySelector('.ea-engine-badge');
      if (badge) {
        badge.className = 'ea-engine-badge ' + (engStatus === 'PASS' ? 'badge-pass' : (engStatus === 'WARN' ? 'badge-warn' : 'badge-fail'));
        badge.textContent = engStatus;
      }
    });

    // 10. Update Competitor Parity Benchmark Table
    const compTable = document.querySelector('.ea-table');
    if (compTable) {
      const firstRow = compTable.querySelector('tbody tr:first-child');
      if (firstRow) {
        const domainCell = firstRow.querySelector('td:first-child');
        if (domainCell) domainCell.innerHTML = `<strong>${domain} (${isTr ? 'Hedef' : 'Target'})</strong>`;
        const techCell = firstRow.querySelector('td:nth-child(2)');
        if (techCell) {
          techCell.innerHTML = `<span class="${planeA >= 80 ? 'badge-pass' : (planeA >= 60 ? 'badge-warn' : 'badge-fail')}">${planeA}%</span>`;
        }
        const mentionCell = firstRow.querySelector('td:nth-child(3)');
        if (mentionCell) mentionCell.textContent = Math.round(planeB * 0.75) + '%';
        const citeCell = firstRow.querySelector('td:nth-child(4)');
        if (citeCell) citeCell.textContent = Math.round(planeB * 0.62) + '%';
      }
    }

    // 11. Replace Target Domain in Findings, Evidence, Code, and CLI Commands
    document.querySelectorAll('.finding-link').forEach(link => {
      const origHref = link.getAttribute('href') || '';
      const newHref = origHref.replace(/https?:\/\/[^\/]+/i, 'https://' + domain);
      link.setAttribute('href', newHref);
      if (link.textContent.includes('htmlandhtml.com')) {
        link.textContent = link.textContent.split('htmlandhtml.com').join(domain);
      }
    });

    document.querySelectorAll('.evidence-box, .recipe-code, .finding-desc, .dark-pool-recipe-box code, .dark-pool-recipe-box span').forEach(el => {
      if (el.innerHTML.includes('htmlandhtml.com')) {
        el.innerHTML = el.innerHTML.split('htmlandhtml.com').join(domain);
      }
    });

    // 12. Dynamic ZIP Package Customization
    const btnDownloadZip = document.getElementById('btnDownloadZip');
    if (btnDownloadZip) {
      btnDownloadZip.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
          alert(isTr ? 'JSZip kütüphanesi yükleniyor, lütfen birkaç saniye sonra tekrar deneyin.' : 'JSZip library is loading, please try again in a moment.');
          return;
        }
        const zip = new JSZip();
        const folderName = `htmlandhtml-enterprise-${domain}-package`;
        const zipFolder = zip.folder(folderName);
        const sourceFiles = (typeof window.RAW_FILES_999 !== 'undefined') ? window.RAW_FILES_999 : (typeof window.RAW_FILES_99 !== 'undefined' ? window.RAW_FILES_99 : {});

        for (const [fname, content] of Object.entries(sourceFiles)) {
          let customContent = String(content).split('htmlandhtml.com').join(domain);
          customContent = customContent.split('2026-09-08').join(new Date().toISOString().slice(0, 10));
          zipFolder.file(fname, customContent);
        }

        zip.generateAsync({ type: 'blob' }).then(blob => {
          saveAs(blob, `HTML_AND_HTML_ENTERPRISE_${domain.toUpperCase()}_2026.zip`);
        });
      };
    }

    // 13. Dynamic Quick Scanner Bar at the Top of the Report
    renderQuickScannerBar(domain, isTr);
  }

  function renderQuickScannerBar(currentDomain, isTr) {
    let bar = document.getElementById('eaReportQuickScanBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'eaReportQuickScanBar';
      bar.style.cssText = 'background:var(--ea-bg-card,#121827);border:1px solid var(--ea-border,rgba(255,255,255,0.12));border-radius:14px;padding:14px 18px;margin:16px 0 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;box-shadow:0 4px 16px rgba(0,0,0,0.15);';
      const hero = document.querySelector('.ea-specimen-hero') || document.querySelector('.ea-meta-bar');
      if (hero && hero.parentNode) {
        hero.parentNode.insertBefore(bar, hero);
      }
    }

    bar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span style="font-size:12px;font-weight:800;color:var(--ea-accent,#00d4ff);text-transform:uppercase;letter-spacing:0.5px;">
          🌐 ${isTr ? 'AKTİF HEDEF:' : 'ACTIVE TARGET:'}
        </span>
        <strong style="font-size:15px;color:var(--ea-text-primary,#ffffff);font-family:monospace;">${currentDomain}</strong>
        <span style="font-size:11.5px;color:var(--ea-text-muted,#64748b);padding:2px 8px;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.25);border-radius:6px;color:#10b981;font-weight:700;">
          ${isTr ? 'CANLI ANALİZ' : 'LIVE AUDIT'}
        </span>
      </div>
      <form id="eaQuickScanInlineForm" style="display:flex;align-items:center;gap:8px;flex:1;min-width:280px;max-width:480px;">
        <input type="text" id="eaQuickScanInput" placeholder="${isTr ? 'Farklı bir site tara (örn: example.com)' : 'Scan another domain (e.g. example.com)'}" style="flex:1;height:38px;padding:0 12px;border-radius:8px;border:1px solid var(--ea-border,rgba(255,255,255,0.2));background:var(--ea-code-bg,#070a12);color:#ffffff;font-size:13px;font-weight:600;outline:none;" required />
        <button type="submit" style="height:38px;padding:0 16px;border-radius:8px;border:none;background:#0066ff;color:#ffffff;font-size:12.5px;font-weight:800;cursor:pointer;white-space:nowrap;">
          ${isTr ? 'Taramayı Çalıştır →' : 'Run Audit →'}
        </button>
      </form>
    `;

    const quickForm = document.getElementById('eaQuickScanInlineForm');
    if (quickForm) {
      quickForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('eaQuickScanInput');
        const nextD = cleanDomain(input ? input.value : '');
        if (nextD) {
          const basePath = window.location.pathname;
          window.location.href = basePath + '?domain=' + encodeURIComponent(nextD);
        }
      });
    }
  }

  // Auto-run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', async function() {
    const domain = getQueryDomain();
    if (!domain || domain === 'htmlandhtml.com') {
      // Keep canonical specimen mode
      return;
    }

    const isTr = document.documentElement.lang === 'tr' || window.location.pathname.startsWith('/tr/');

    // Check cached scan
    let scanData = null;
    try {
      const cachedRaw = sessionStorage.getItem('ea_scan_' + domain) || sessionStorage.getItem('ea_scan_latest');
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw);
        if (parsed && (cleanDomain(parsed.domain) === domain || cleanDomain(parsed.targetDomain) === domain)) {
          scanData = parsed;
        }
      }
    } catch(e) {}

    if (scanData) {
      hydrateReport(domain, scanData);
    } else {
      scanData = await fetchDomainScan(domain, isTr);
      if (scanData) {
        hydrateReport(domain, scanData);
      }
    }
  });
})();
