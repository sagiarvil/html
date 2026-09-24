/**
 * Profound Constellation Motion & Network Graph Engine
 * Lightweight interactive canvas animation simulating interconnected neural nodes
 */
(function() {
  function initProfoundCanvas() {
    const canvas = document.getElementById('profoundConstellationCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight || 500;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 500;
    });

    const nodeCount = Math.min(45, Math.floor(width / 24));
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with subtle lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + lineAlpha + ')';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Mouse interaction
        const mdx = mouse.x - n.x;
        const mdy = mouse.y - n.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          const force = (100 - mdist) / 100 * 0.4;
          n.x -= (mdx / mdist) * force;
          n.y -= (mdy / mdist) * force;
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, ' + n.alpha + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfoundCanvas);
  } else {
    initProfoundCanvas();
  }
})();


/**
 * PROFOUND INTERACTIVE WORKBENCH ENGINE (ACTION & DESTINATION ORIENTED)
 * Makes every workbench sidebar item, preview action, and report card directly functional,
 * routing the customer to the exact live operational tool, scanner, or report.
 */
(function() {
  function initWorkbench() {
    const workbenches = document.querySelectorAll('.profound-workbench-mockup');
    if (!workbenches.length) return;

    const isTr = (document.documentElement.lang || 'tr').toLowerCase().startsWith('tr') || window.location.pathname.startsWith('/tr');

    const dataMap = {
      'ai-marketer': {
        prompt: isTr ? 'Web sitemiz için yapay zeka arama optimizasyonu (AEO/GEO) iniş sayfasını hazırla ve ChatGPT/Perplexity botlarına hazır hale getir.' : 'Prepare an AI search optimization (AEO/GEO) landing page for our site and optimize for ChatGPT/Perplexity crawlers.',
        agentSteps: isTr ? [
          '✓ 18 Deterministik Motor Doğrulandı (0 Hata)',
          '✓ Schema.org @graph ve llms.txt v2 Üretildi',
          '✓ ColBERT MaxSim Semantik Skoru: 94/100'
        ] : [
          '✓ 18 Deterministic Engines Validated (0 Defect)',
          '✓ Schema.org @graph & llms.txt v2 Generated',
          '✓ ColBERT MaxSim Semantic Score: 94/100'
        ],
        agentOutput: isTr ? '<strong>Otonom Ajan Çıktısı:</strong> İniş sayfası üretildi, ilk paket AST bütçesine uyarlandı ve canlı önizlemeye aktarıldı.' : '<strong>Autonomous Agent Output:</strong> Landing page synthesized, formatted within initial packet AST budget, and piped to live preview.',
        previewTitle: isTr ? 'Yapay Zeka Destekli Yeni Nesil Performans' : 'Next-Gen AI Search Experience',
        previewDesc: isTr ? 'LLM botları (ChatGPT, Claude, Perplexity) tarafından saniyeler içinde taranan ve doğrudan alıntılanan optimize edilmiş içerik.' : 'Fully crawlable and directly citeable landing page architecture optimized for ChatGPT, Claude, and Perplexity.',
        previewBtn: isTr ? '⚡ Sayfayı Canlı Test Et →' : '⚡ Test Page Live →',
        actionUrl: isTr ? '/tr/yapay-zeka-arama-gorunurlugu/' : '/en/ai-search-visibility/'
      },
      'agent-analytics': {
        prompt: isTr ? 'ChatGPT, Perplexity ve Claude arama botlarının son 30 gündeki tarama sıklığını ve indeksleme oranlarını analiz et.' : 'Analyze crawl frequency and indexing rate of ChatGPT, Perplexity, and Claude search bots over the past 30 days.',
        agentSteps: isTr ? [
          '✓ OAI-SearchBot: Günlük 142 istek (HTTP 200: %100)',
          '✓ PerplexityBot: 84 referans alıntılama kaydedildi',
          '✓ ClaudeBot: llms.txt manifestosu üzerinden 512-token chunking doğrulandı'
        ] : [
          '✓ OAI-SearchBot: 142 daily requests (HTTP 200: 100%)',
          '✓ PerplexityBot: 84 reference citations indexed',
          '✓ ClaudeBot: 512-token chunking confirmed via llms.txt'
        ],
        agentOutput: isTr ? '<strong>Analitik Özeti:</strong> Yapay zeka kaynaklı organik yönlendirme trafiği bir önceki aya göre %48 artış gösterdi.' : '<strong>Analytics Summary:</strong> AI-driven referral traffic surged 48% month-over-month.',
        previewTitle: isTr ? 'Ajan Trafik & Bot Ziyaret Raporu' : 'Agent Traffic & Bot Visit Report',
        previewDesc: isTr ? 'Yapay zeka arama motorlarının sitenizden beslendiği gerçek zamanlı veri akışı ve bot ziyaret telemetrisi.' : 'Real-time telemetry showing crawler frequency and AI referral citations for your domain.',
        previewBtn: isTr ? '📊 Canlı Bot Analitiğini Aç →' : '📊 Open Live Bot Analytics →',
        actionUrl: isTr ? '/tr/site-tarama/' : '/en/website-scanner/'
      },
      'context-manager': {
        prompt: isTr ? 'Marka kimliği, resmi llms.txt ve Schema.org varlık tanımlarını arama modellerine sabitle.' : 'Pin brand identity, official llms.txt, and Schema.org entity definitions to search model contexts.',
        agentSteps: isTr ? [
          '✓ Wikidata QID & Google MID varlık kilidi aktif',
          '✓ llms.txt v2 spesifikasyonu W3C/IETF standartlarında hazırlandı',
          '✓ Çelişkili marka iddiaları (Halüsinasyon) filtrelendi'
        ] : [
          '✓ Wikidata QID & Google MID entity lock active',
          '✓ llms.txt v2 specification compiled to W3C/IETF standards',
          '✓ Contradictory brand hallucinations purged'
        ],
        agentOutput: isTr ? '<strong>Bağlam Kilidi:</strong> Marka varlık tanımı resmi protokollerle doğrulandı ve korumaya alındı.' : '<strong>Context Lock:</strong> Official entity manifesto verified and broadcast across AI search hubs.',
        previewTitle: isTr ? 'llms.txt Doğrulayıcı & Bağlam Yöneticisi' : 'llms.txt Validator & Context Manager',
        previewDesc: isTr ? 'Sitenizin llms.txt dosyasını test edin, sözdizim hatalarını giderin ve AI modellerinin doğru bilgi çekmesini sağlayın.' : 'Validate your domain llms.txt endpoint, fix syntax defects, and guarantee accurate AI retrieval.',
        previewBtn: isTr ? '📑 llms.txt Aracını Başlat →' : '📑 Launch llms.txt Tool →',
        actionUrl: isTr ? '/tr/llms-txt-validator/' : '/tr/llms-txt-validator/'
      },
      '18-engine': {
        prompt: isTr ? '18 bağımsız deterministik motorla sitenin tüm teknik altyapısını ve arama engellerini test et.' : 'Test full technical infrastructure and crawl barriers across 18 independent deterministic engines.',
        agentSteps: isTr ? [
          '✓ ENG-01 robots.txt RFC 9309: 100/100',
          '✓ ENG-02 llms.txt v2 Protokolü: 100/100',
          '✓ ENG-03 Schema.org @graph: 98/100'
        ] : [
          '✓ ENG-01 robots.txt RFC 9309: 100/100',
          '✓ ENG-02 llms.txt v2 Protocol: 100/100',
          '✓ ENG-03 Schema.org @graph: 98/100'
        ],
        agentOutput: isTr ? '<strong>18-Motor Teşhisi:</strong> 129 ağırlık matrisinde toplam skor: 96. Kritik P0/P1 engel bulunamadı.' : '<strong>18-Engine Diagnosis:</strong> Overall score 96/100 across 129 rules. Zero critical P0/P1 blockers.',
        previewTitle: isTr ? '18-Motor Deterministik Raporu' : '18-Engine Deterministic Audit',
        previewDesc: isTr ? 'W3C, IETF ve LLM standartlarında 129 kuralın tamamı taranarak üretilen gerçek kurumsal örnek teşhis.' : 'Production-grade deterministic diagnostic sample inspecting all 129 rules with zero synthetic guesswork.',
        previewBtn: isTr ? '🔬 Gerçek Örnek Raporu İncele →' : '🔬 Inspect Full Sample Report →',
        actionUrl: '/enterprise-analyzer/htmlandhtml-ai-report'
      },
      'factcheck': {
        prompt: isTr ? 'ChatGPT ve Perplexity modellerinde markamızla ilgili verilen yanıtları doğrula ve yanlış iddiaları tespit et.' : 'Verify AI claims about our business in ChatGPT and Perplexity to eliminate hallucinations.',
        agentSteps: isTr ? [
          '✓ 42 Yapay zeka arama yanıtı tarandı',
          '✓ 0 Yanlış iddia / Halüsinasyon tespit edildi',
          '✓ Tüm iddialar resmi web sayfalarıyla %100 eşleşti'
        ] : [
          '✓ 42 AI search outputs audited',
          '✓ 0 Hallucinations / false claims detected',
          '✓ All claims match authoritative domain sources'
        ],
        agentOutput: isTr ? '<strong>FactCheck Raporu:</strong> Marka hakikati %100 doğrulanmış kaynaklarla korunmaktadır.' : '<strong>FactCheck Report:</strong> Brand accuracy defended with 100% verified ground truth.',
        previewTitle: isTr ? 'Doğrulanmış Yapay Zeka Cevapları' : 'Verified AI Ground Truth',
        previewDesc: isTr ? 'Yapay zekanın müşterilerinize şirketiniz hakkında yalnızca doğru, güncel ve kanıtlı bilgi vermesini garanti edin.' : 'Prevent AI models from misleading prospective buyers with fabricated claims.',
        previewBtn: isTr ? '🔍 Sitemi Ücretsiz Teşhis Et →' : '🔍 Diagnose My Site Free →',
        actionUrl: isTr ? '/tr/#scanner' : '/en/#scanner'
      },
      'benchmarking': {
        prompt: isTr ? 'Sektördeki en yakın rakiplerle yapay zeka görünürlük ve alıntılanma oranlarını kıyasla.' : 'Benchmark our domain visibility and citation rate against leading category competitors.',
        agentSteps: isTr ? [
          '✓ Sektör ortalaması: %54 alıntılanma',
          '✓ Sitenizin skoru: %82 alıntılanma (82nd Percentile)',
          '✓ Sektör Lideri Konumlandırması: ONAYLANDI'
        ] : [
          '✓ Category average: 54% citation rate',
          '✓ Your domain score: 82nd percentile',
          '✓ Industry leadership status: CONFIRMED'
        ],
        agentOutput: isTr ? '<strong>Kıyaslama Analizi:</strong> Siteniz sektördeki firmaların %82 sinden daha yüksek yapay zeka görünürlüğüne sahip.' : '<strong>Benchmarking Analysis:</strong> Your domain outperforms 82% of industry peers in AI citations.',
        previewTitle: isTr ? 'AI Görünürlük Yol Haritası ()' : 'AI Visibility Implementation Pack ()',
        previewDesc: isTr ? 'Rakiplerinizi geride bırakacak hazır kod yamaları, Nginx/Apache konfigürasyonları ve test scriptleri paketi.' : 'Complete engineering package with copy-paste fixes, web server configs, and regression tests.',
        previewBtn: isTr ? '📦 Uygulama Paketini İncele () →' : '📦 View Implementation Pack () →',
        actionUrl: isTr ? '/tr/fiyatlandirma/' : '/en/pricing/'
      }
    };

    workbenches.forEach(wb => {
      const navItems = wb.querySelectorAll('.wb-nav-item');
      const chatUser = wb.querySelector('.wb-chat-user');
      const chatAgent = wb.querySelector('.wb-chat-agent');
      const previewCard = wb.querySelector('.wb-preview-card');
      const previewTitle = previewCard ? previewCard.querySelector('h4') : null;
      const previewDesc = previewCard ? previewCard.querySelector('p') : null;
      const previewBtn = previewCard ? previewCard.querySelector('.wb-preview-btn') : null;

      let currentActionUrl = dataMap['ai-marketer'].actionUrl;

      function updateActiveKey(key) {
        const data = dataMap[key];
        if (!data) return;

        currentActionUrl = data.actionUrl;

        if (chatUser) {
          chatUser.innerHTML = '<strong>' + (isTr ? 'Müşteri İstemi:' : 'User Prompt:') + '</strong><br>"' + data.prompt + '"';
        }
        if (chatAgent) {
          let stepsHtml = '';
          data.agentSteps.forEach(s => {
            stepsHtml += '<div class="wb-agent-step">' + s + '</div>';
          });
          chatAgent.innerHTML = stepsHtml + data.agentOutput;
        }
        if (previewTitle) previewTitle.textContent = data.previewTitle;
        if (previewDesc) previewDesc.textContent = data.previewDesc;
        if (previewBtn) previewBtn.textContent = data.previewBtn;
      }

      navItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');

        const text = item.textContent.toLowerCase();
        let key = 'ai-marketer';
        if (text.includes('analytics')) key = 'agent-analytics';
        else if (text.includes('context')) key = 'context-manager';
        else if (text.includes('18-engine')) key = '18-engine';
        else if (text.includes('factcheck')) key = 'factcheck';
        else if (text.includes('benchmarking')) key = 'benchmarking';

        item.dataset.key = key;

        // Visual click handler updates the workbench panel
        item.addEventListener('click', (e) => {
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          updateActiveKey(key);
        });

        // Double click or direct action opens the target destination page
        item.addEventListener('dblclick', () => {
          if (dataMap[key] && dataMap[key].actionUrl) {
            window.location.href = dataMap[key].actionUrl;
          }
        });

        item.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateActiveKey(key);
          }
        });
      });

      // Clicking the primary action button routes directly to the operational destination
      if (previewBtn) {
        previewBtn.style.cursor = 'pointer';
        previewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (currentActionUrl.startsWith('#')) {
            const el = document.querySelector(currentActionUrl);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const inp = document.getElementById('domainInput');
            if (inp) inp.focus();
          } else {
            window.location.href = currentActionUrl;
          }
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkbench);
  } else {
    initWorkbench();
  }
})();
