// ==========================================================================
// DNA SCROLL SPY & INTERACTION ENGINE
// Updates S0 Header section number and sticky background state
// ==========================================================================
(function() {
  'use strict';
  
  function initScrollSpy() {
    var spyNumEl = document.getElementById('dna-spy-num');
    var headerEl = document.getElementById('dna-header');
    var sections = document.querySelectorAll('section[id^="s"], section[id^="scanner"], div[id^="s"]');
    
    if (!spyNumEl || sections.length === 0) return;

    var sectionMap = [
      { id: 's1-hero', num: '01' },
      { id: 'scanner', num: '01' },
      { id: 's2-aci', num: '02' },
      { id: 's3-cozum', num: '03' },
      { id: 's4-nasil-calisir', num: '04' },
      { id: 's5-hizmet-haritasi', num: '05' },
      { id: 's6-uyumluluk', num: '06' },
      { id: 's7-guven', num: '07' },
      { id: 's8-neden-biz', num: '08' },
      { id: 's9-kanit', num: '09' },
      { id: 's10-teklif', num: '10' },
      { id: 's11-sss', num: '11' },
      { id: 's12-final-cta', num: '12' }
    ];

    function updateActiveSection() {
      var scrollPos = window.scrollY + 120;
      var currentNum = '01';

      for (var i = 0; i < sectionMap.length; i++) {
        var el = document.getElementById(sectionMap[i].id);
        if (el) {
          var top = el.offsetTop;
          var height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentNum = sectionMap[i].num;
            break;
          }
        }
      }

      spyNumEl.textContent = '| ' + currentNum;

      // Header hero uzerindeyken renk ayari
      var heroEl = document.getElementById('s1-hero') || document.getElementById('scanner');
      if (heroEl && headerEl) {
        var heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        if (window.scrollY < heroBottom - 80) {
          headerEl.classList.add('dna-header-on-hero');
        } else {
          headerEl.classList.remove('dna-header-on-hero');
        }
      }
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }
})();
