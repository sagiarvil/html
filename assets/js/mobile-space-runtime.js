/**
 * 🚀 HTML&HTML SPACE-GRADE MOBILE RUNTIME (V4.1)
 * SpaceX / Linear / Apple High-Performance Mobile UX Engine
 */
(function() {
  'use strict';

  function initMobileSpaceUX() {
    // 1. Cyber Drawer Menü Kontrolü
    var menuBtn = document.getElementById('hhMobileMenuBtn');
    var drawer = document.getElementById('hhCyberDrawer');
    var closeBtn = document.getElementById('hhDrawerClose');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeDrawer();
      });
    }

    // Menü dışına tıklama veya link tıklandığında kapat
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

    // 2. Arama Kapsülü URL Yapıştır / Temizle Desteği
    var domainInput = document.getElementById('domainInput');
    var clearBtn = document.getElementById('hhInputClearBtn');

    if (domainInput && clearBtn) {
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        domainInput.value = '';
        domainInput.focus();
        clearBtn.style.display = 'none';
      });

      domainInput.addEventListener('input', function() {
        clearBtn.style.display = domainInput.value.trim().length > 0 ? 'flex' : 'none';
      });
    }

    // 3. Canlı Laboratuvar Mobil Segment Switcher
    var consoleGrid = document.querySelector('.ea-console-grid');
    var switchTelemetry = document.getElementById('hhSwitchTelemetry');
    var switchTerminal = document.getElementById('hhSwitchTerminal');

    if (consoleGrid && switchTelemetry && switchTerminal) {
      // Varsayılan mobilde telemetriyi göster
      consoleGrid.classList.add('show-telemetry');

      switchTelemetry.addEventListener('click', function() {
        consoleGrid.classList.remove('show-terminal');
        consoleGrid.classList.add('show-telemetry');
        switchTelemetry.classList.add('active');
        switchTerminal.classList.remove('active');
      });

      switchTerminal.addEventListener('click', function() {
        consoleGrid.classList.remove('show-telemetry');
        consoleGrid.classList.add('show-terminal');
        switchTerminal.classList.add('active');
        switchTelemetry.classList.remove('active');
      });
    }

    // 4. Hızlı Deneme Çipleri Dokunma Animasyonu
    var chips = document.querySelectorAll('.scan-chips button');
    chips.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var domain = btn.getAttribute('data-domain');
        if (domain && domainInput) {
          domainInput.value = domain;
          if (clearBtn) clearBtn.style.display = 'flex';
          domainInput.focus();
          
          // Hafif haptik görsel titreşim
          btn.style.transform = 'scale(0.92)';
          setTimeout(function() {
            btn.style.transform = '';
          }, 150);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileSpaceUX);
  } else {
    initMobileSpaceUX();
  }
})();
