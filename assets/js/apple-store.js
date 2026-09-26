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
            shelf.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            shelf.style.display = 'none';
          }
        });
      });
    });

    // 3. Hızlı Tarayıcı Köprüsü
    const quickInput = document.getElementById('appleQuickScanInput');
    const quickBtn = document.getElementById('appleQuickScanBtn');
    const mainInput = document.getElementById('domainInput');
    const mainBtn = document.getElementById('scanButton');

    if (quickBtn && quickInput) {
      quickBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = (quickInput.value || '').trim();
        if (!url) return;
        if (mainInput && mainBtn) {
          mainInput.value = url;
          const scannerEl = document.getElementById('scanner');
          if (scannerEl) {
            scannerEl.scrollIntoView({ behavior: 'smooth' });
          }
          setTimeout(function() {
            mainBtn.click();
          }, 300);
        } else {
          window.location.href = '/site-tarama/?url=' + encodeURIComponent(url);
        }
      });
    }
  });
})();
