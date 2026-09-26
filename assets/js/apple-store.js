/**
 * Apple App Store Interactivity & Spotlight Search Engine
 * htmlandhtml.com — Ultra hafif, sıfır-yük reaktif motor
 */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Spotlight Canlı Arama
    const searchInput = document.getElementById('appleStoreSearch');
    const appCards = document.querySelectorAll('.apple-app-row-card, .apple-hero-card');

    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const query = (e.target.value || '').toLowerCase().trim();
        appCards.forEach(function(card) {
          const title = (card.getAttribute('data-app-title') || card.textContent || '').toLowerCase();
          const category = (card.getAttribute('data-app-category') || '').toLowerCase();
          const desc = (card.getAttribute('data-app-desc') || '').toLowerCase();

          if (!query || title.includes(query) || category.includes(query) || desc.includes(query)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
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
