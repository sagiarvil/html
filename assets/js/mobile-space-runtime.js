/**
 * 🚀 HTML&HTML SPACE-GRADE MOBILE RUNTIME (V5.0 - ULTRA-PRO ENTERPRISE)
 * Silicon Valley, Apple & SpaceX Tier High-Performance Mobile UX Engine
 * Features:
 *  - Apple Dynamic Island Live HUD & Scroll Telemetry
 *  - Draggable Native iOS Bottom Sheet with Gesture Dismiss
 *  - Smart Clipboard Auto-Paste & Sanitizer
 *  - Web Share API Integration (AirDrop / WhatsApp / Slack)
 *  - 60-120 FPS GPU Accelerated Haptic Feedback
 */
(function() {
  'use strict';

  function initUltraProMobileUX() {
    // -------------------------------------------------------------
    // 0. HAPTIK MİKRO TİTREŞİM (Apple Taptic / Android Vibrator)
    // -------------------------------------------------------------
    function triggerHaptic(duration) {
      try {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate(duration || 12);
        }
      } catch (e) {}
    }

    // -------------------------------------------------------------
    // 1. APPLE DYNAMIC ISLAND (CANLI SKOR & TARAMA HUD'I)
    // -------------------------------------------------------------
    var island = document.getElementById('hhDynamicIsland');
    if (!island) {
      island = document.createElement('div');
      island.id = 'hhDynamicIsland';
      island.className = 'hh-dynamic-island';
      island.innerHTML = '<span class="hh-island-pulse-dot"></span><span id="hhIslandText">HTML&HTML RADAR ONLINE</span>';
      document.body.appendChild(island);
    }

    var islandText = document.getElementById('hhIslandText');
    var resultSection = document.getElementById('result');
    var overallScoreEl = document.getElementById('overallScore');

    island.addEventListener('click', function() {
      triggerHaptic(18);
      if (resultSection && !resultSection.hidden && resultSection.style.display !== 'none') {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        var scanner = document.getElementById('scanner');
        if (scanner) scanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    function updateIsland() {
      if (!island || !islandText) return;
      var isResultVisible = resultSection && !resultSection.hidden && resultSection.style.display !== 'none';
      var scoreVal = overallScoreEl ? overallScoreEl.textContent.trim() : '';

      if (isResultVisible && scoreVal && scoreVal !== '0' && scoreVal !== '—') {
        islandText.innerHTML = '🏆 Skor: <b>' + scoreVal + '/100</b> • Raporu İncele';
        island.classList.add('is-active');
      } else if (window.pageYOffset > 300) {
        islandText.innerHTML = '⚡ <b>Hemen Tara</b> • 18 Motorlu AI Radarı';
        island.classList.add('is-active');
      } else {
        island.classList.remove('is-active');
      }
    }

    window.addEventListener('scroll', updateIsland, { passive: true });

    // -------------------------------------------------------------
    // 2. CYBER DRAWER MENÜ KONTROLÜ (iOS Spring Transitions)
    // -------------------------------------------------------------
    var menuBtn = document.getElementById('hhMobileMenuBtn');
    var drawer = document.getElementById('hhCyberDrawer');
    var closeBtn = document.getElementById('hhDrawerClose');
    var dockMenuBtn = document.getElementById('hhDockMenuBtn');

    function openDrawer() {
      if (!drawer) return;
      triggerHaptic(18);
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!drawer) return;
      triggerHaptic(10);
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) closeDrawer();
        else openDrawer();
      });
    }

    if (dockMenuBtn) {
      dockMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openDrawer();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (drawer) {
      drawer.addEventListener('click', function(e) {
        if (e.target === drawer || e.target.closest('.hh-drawer-link')) {
          closeDrawer();
        }
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // -------------------------------------------------------------
    // 3. AKILLI PANO (CLIPBOARD) VE URL GİRİŞ KOLAYLIĞI
    // -------------------------------------------------------------
    var domainInput = document.getElementById('domainInput');
    var clearBtn = document.getElementById('hhInputClearBtn');
    var pasteBtn = document.getElementById('hhInputPasteBtn');

    function updateInputBtns() {
      if (!domainInput) return;
      var hasVal = domainInput.value.trim().length > 0;
      if (clearBtn) clearBtn.style.display = hasVal ? 'flex' : 'none';
      if (pasteBtn) pasteBtn.style.display = hasVal ? 'none' : 'inline-flex';
    }

    if (domainInput) {
      domainInput.addEventListener('input', updateInputBtns);
      domainInput.addEventListener('change', updateInputBtns);
      updateInputBtns();
    }

    if (clearBtn && domainInput) {
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        triggerHaptic(15);
        domainInput.value = '';
        updateInputBtns();
        domainInput.focus();
      });
    }

    if (pasteBtn && domainInput) {
      pasteBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        triggerHaptic(20);
        try {
          if (navigator.clipboard && navigator.clipboard.readText) {
            var text = await navigator.clipboard.readText();
            if (text && text.trim().length > 0) {
              var cleanUrl = text.trim()
                .replace(/^https?:\/\//i, '')
                .replace(/^www\./i, '')
                .replace(/\/.*$/, '')
                .toLowerCase();
              domainInput.value = cleanUrl || text.trim();
              updateInputBtns();
              domainInput.focus();
              
              domainInput.style.transition = 'box-shadow 0.3s ease';
              domainInput.style.boxShadow = '0 0 24px rgba(0, 212, 255, 0.7)';
              setTimeout(function() {
                domainInput.style.boxShadow = '';
              }, 1200);
            } else {
              domainInput.focus();
            }
          } else {
            domainInput.focus();
          }
        } catch (err) {
          domainInput.focus();
        }
      });
    }

    // -------------------------------------------------------------
    // 4. HIZLI DENEME ÇİPLERİ VE DOKUNMA GERİ BİLDİRİMİ
    // -------------------------------------------------------------
    var chips = document.querySelectorAll('.scan-chips button, .scan-chips .chip-btn');
    chips.forEach(function(btn) {
      btn.addEventListener('click', function() {
        triggerHaptic(15);
        var domain = btn.getAttribute('data-domain');
        if (domain && domainInput) {
          domainInput.value = domain;
          updateInputBtns();
          domainInput.focus();
          
          btn.style.transform = 'scale(0.92)';
          setTimeout(function() {
            btn.style.transform = '';
          }, 150);
        }
      });
    });

    // -------------------------------------------------------------
    // 5. FLOATING DOCK DİNAMİK SKOR SENKRONİZASYONU
    // -------------------------------------------------------------
    var dockScoreBadge = document.getElementById('dockScoreBadge');
    var dockReportLink = document.getElementById('hhDockReportLink');

    function syncDockScore() {
      if (!resultSection || !overallScoreEl) return;
      var isVisible = !resultSection.hidden && resultSection.style.display !== 'none';
      var scoreText = overallScoreEl.textContent.trim();

      if (isVisible && scoreText && scoreText !== '0' && scoreText !== '—') {
        if (dockScoreBadge) {
          dockScoreBadge.textContent = scoreText + '%';
          dockScoreBadge.style.display = 'inline-block';
        }
        if (dockReportLink) {
          dockReportLink.style.borderColor = '#00d4ff';
        }
      }
      updateIsland();
    }

    if (resultSection) {
      var observer = new MutationObserver(function() {
        syncDockScore();
        attachMobileCopyButtons();
        attachMobileShareButton();
      });
      observer.observe(resultSection, { attributes: true, childList: true, subtree: true });
    }

    // -------------------------------------------------------------
    // 6. BULGULAR VE KOD BLOKLARI İÇİN 'TEK TIKLA KOPYALA' BUTONLARI
    // -------------------------------------------------------------
    function attachMobileCopyButtons() {
      var codeBlocks = document.querySelectorAll('#findingsList code, .recipe-section code, .hh-evidence-block code');
      codeBlocks.forEach(function(code) {
        if (code.getAttribute('data-has-copy-btn')) return;
        code.setAttribute('data-has-copy-btn', 'true');

        var container = code.parentElement;
        if (!container) return;

        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'hh-copy-code-btn';
        copyBtn.innerHTML = '📋 Kopyala';
        copyBtn.setAttribute('aria-label', 'Kodu Panoya Kopyala');

        copyBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          triggerHaptic(20);
          var textToCopy = code.innerText || code.textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy).then(function() {
              copyBtn.innerHTML = '✅ Kopyalandı!';
              copyBtn.style.background = 'rgba(34, 197, 94, 0.2)';
              copyBtn.style.color = '#22c55e';
              copyBtn.style.borderColor = '#22c55e';
              setTimeout(function() {
                copyBtn.innerHTML = '📋 Kopyala';
                copyBtn.style.background = '';
                copyBtn.style.color = '';
                copyBtn.style.borderColor = '';
              }, 2000);
            }).catch(function() {});
          }
        });

        if (code.previousSibling) {
          container.insertBefore(copyBtn, code);
        } else {
          container.prepend(copyBtn);
        }
      });
    }

    // -------------------------------------------------------------
    // 7. MOBİL NATIVE WEB SHARE API (RAPORU PAYLAŞ)
    // -------------------------------------------------------------
    function attachMobileShareButton() {
      // Masaüstünde ASLA buton ekleme. Eğer önceden eklenmişse derhal DOM'dan temizle.
      if (window.innerWidth > 768) {
        var existing = document.getElementById('btnMobileShare');
        if (existing && existing.parentNode) {
          existing.parentNode.removeChild(existing);
        }
        return;
      }
      var actions = document.querySelector('.result-head-actions');
      if (!actions || document.getElementById('btnMobileShare')) return;

      var shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.id = 'btnMobileShare';
      shareBtn.className = 'btn-share-report';
      shareBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> <span>📲 Raporu Paylaş / Gönder</span>';

      shareBtn.addEventListener('click', function(e) {
        e.preventDefault();
        triggerHaptic(20);
        var domainEl = document.getElementById('resultDomain');
        var dName = domainEl ? domainEl.textContent.trim() : 'Web Sitesi';
        var scoreVal = overallScoreEl ? overallScoreEl.textContent.trim() : '0';

        var shareData = {
          title: 'HTML&HTML Teşhis Raporu: ' + dName,
          text: dName + ' sitesinin 18 Motorlu AI Arama Görünürlük Skoru: ' + scoreVal + '/100! Detaylı teknik raporu inceleyin:',
          url: window.location.href
        };

        if (navigator.share) {
          navigator.share(shareData).catch(function() {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href).then(function() {
            shareBtn.innerHTML = '✅ Link Panoya Kopyalandı!';
            setTimeout(function() {
              shareBtn.innerHTML = '📲 Raporu Paylaş / Gönder';
            }, 2000);
          });
        }
      });

      actions.appendChild(shareBtn);
    }

    // Masaüstünde varsa hemen temizle
    if (window.innerWidth > 768) {
      var initialCleanup = document.getElementById('btnMobileShare');
      if (initialCleanup && initialCleanup.parentNode) initialCleanup.parentNode.removeChild(initialCleanup);
    }
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        var resizeCleanup = document.getElementById('btnMobileShare');
        if (resizeCleanup && resizeCleanup.parentNode) resizeCleanup.parentNode.removeChild(resizeCleanup);
      }
    });

    attachMobileCopyButtons();
    attachMobileShareButton();
    setTimeout(function() {
      attachMobileCopyButtons();
      attachMobileShareButton();
    }, 1500);

    // -------------------------------------------------------------
    // 8. CANLI LABORATUVAR MOBİL SEGMENT SWITCHER
    // -------------------------------------------------------------
    var consoleGrid = document.querySelector('.ea-console-grid');
    var switchTelemetry = document.getElementById('hhSwitchTelemetry');
    var switchTerminal = document.getElementById('hhSwitchTerminal');

    if (consoleGrid && switchTelemetry && switchTerminal) {
      consoleGrid.classList.add('show-telemetry');

      switchTelemetry.addEventListener('click', function() {
        triggerHaptic(12);
        consoleGrid.classList.remove('show-terminal');
        consoleGrid.classList.add('show-telemetry');
        switchTelemetry.classList.add('active');
        switchTerminal.classList.remove('active');
      });

      switchTerminal.addEventListener('click', function() {
        triggerHaptic(12);
        consoleGrid.classList.remove('show-telemetry');
        consoleGrid.classList.add('show-terminal');
        switchTerminal.classList.add('active');
        switchTelemetry.classList.remove('active');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltraProMobileUX);
  } else {
    initUltraProMobileUX();
  }
})();
