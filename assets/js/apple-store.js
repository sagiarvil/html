/**
 * Apple App Store Interactivity & Spotlight Search Engine
 * htmlandhtml.com — Ultra hafif, sıfır-yük reaktif motor
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Spotlight Canlı Arama
    const searchInput = document.getElementById('appleStoreSearch');
    const appCards = document.querySelectorAll('.apple-app-row-card, .apple-hero-card, .mac-app-card-item, .mac-featured-card');

    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const query = (e.target.value || '').toLowerCase().trim();
        appCards.forEach(function(card) {
          const title = (card.getAttribute('data-app-title') || card.querySelector('h3, h4, .mac-app-item-title, .mac-featured-headline')?.textContent || '').toLowerCase();
          const category = (card.getAttribute('data-app-category') || card.querySelector('.mac-app-item-category, .mac-featured-kicker')?.textContent || '').toLowerCase();
          const desc = (card.getAttribute('data-app-desc') || card.textContent || '').toLowerCase();

          if (!query || title.includes(query) || category.includes(query) || desc.includes(query)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }

    // 2. Mobile Sidebar Drawer Toggle
    const mobileToggleBtn = document.getElementById('macMobileToggleBtn');
    const sidebar = document.getElementById('macSidebar');
    if (mobileToggleBtn && sidebar) {
      mobileToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('open');
      });

      document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== mobileToggleBtn) {
          sidebar.classList.remove('open');
        }
      });
    }

    // 3. Expandable Description Toggle
    const descMoreBtn = document.getElementById('macDescMoreBtn');
    const descMoreContent = document.getElementById('macDescMoreContent');
    if (descMoreBtn && descMoreContent) {
      descMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const isHidden = descMoreContent.style.display === 'none';
        descMoreContent.style.display = isHidden ? 'inline' : 'none';
        descMoreBtn.textContent = isHidden ? ' daha az' : ' ...daha fazla';
      });
    }

    // 2. Kategori Segmentasyon Filtresi (Tabs)
    const navTabs = document.querySelectorAll('.apple-nav-tab');
    const shelves = document.querySelectorAll('.apple-shelf-section');

    navTabs.forEach(function(tab) {
      tab.addEventListener('click', function(e) {
        navTabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        const category = this.getAttribute('data-category');
        if (!category || category === 'all') {
          shelves.forEach(function(s) { s.style.display = ''; });
          appCards.forEach(function(c) { c.style.display = ''; });
          return;
        }

        shelves.forEach(function(shelf) {
          const shelfCat = shelf.getAttribute('data-shelf-category');
          if (shelfCat === category) {
            shelf.style.display = '';
          } else {
            shelf.style.display = 'none';
          }
        });
      });
    });

    // 3. Spotlight Scanner İstasyonu (Paste & Clear Yardımcıları)
    const mainInput = document.getElementById('domainInput');
    const clearBtn = document.getElementById('hhInputClearBtn');
    const pasteBtn = document.getElementById('hhInputPasteBtn');

    if (clearBtn && mainInput) {
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mainInput.value = '';
        mainInput.focus();
      });
    }

    if (pasteBtn && mainInput) {
      pasteBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        try {
          const text = await navigator.clipboard.readText();
          if (text) {
            mainInput.value = text.trim();
            mainInput.focus();
          }
        } catch (err) {}
      });
    }
  });
})();
