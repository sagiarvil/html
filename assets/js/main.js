/**
 * HTMLANDHTML.COM - Client-Side Engine & Demo Switcher
 * Behavioral Architecture modeled after HTML&HTML with $100 USD Commercial Buyout
 */

document.addEventListener('DOMContentLoaded', () => {
  initDemoToolbar();
  initFaqAccordion();
  initBuyButtons();
});

/**
 * 1. Interactive Demo Toolbar (Responsive Frame Resizer)
 */
function initDemoToolbar() {
  const selectorItems = document.querySelectorAll('#demo-header .selector li');
  const iframe = document.getElementById('demo-iframe');
  const wrapper = document.getElementById('demo-iframe-wrapper');

  if (!selectorItems.length || !iframe) return;

  selectorItems.forEach(item => {
    item.addEventListener('click', () => {
      selectorItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const width = item.getAttribute('data-width');
      const height = item.getAttribute('data-height');

      if (!width) {
        // Desktop Full Width
        iframe.style.width = '100%';
        iframe.style.height = '880px';
      } else {
        iframe.style.width = `${width}px`;
        iframe.style.height = height ? `${height}px` : '880px';
      }
    });
  });
}

/**
 * 2. Instant Buy & Checkout Action Triggers
 */
function initBuyButtons() {
  const buyButtons = document.querySelectorAll('.btn-buy-asset, .button.buy, .button.download');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const templateName = btn.getAttribute('data-name') || 'sovereign-core';
      const templateTitle = btn.getAttribute('data-title') || 'Sovereign HTML Core Suite';
      
      // If clicking Buy or Download, route to checkout with template parameter
      if (btn.classList.contains('download') || btn.classList.contains('buy')) {
        window.location.href = `checkout.html?package=${encodeURIComponent(templateName)}&title=${encodeURIComponent(templateTitle)}`;
      }
    });
  });
}

/**
 * 3. FAQ Accordion Helper
 */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.closest('.faq-item');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });
}
