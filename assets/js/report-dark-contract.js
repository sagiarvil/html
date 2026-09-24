(function () {
  'use strict';

  const root = document.documentElement;

  function forceReportDark() {
    if (root.getAttribute('data-report-surface') !== 'true') {
      root.setAttribute('data-report-surface', 'true');
    }
    if (root.getAttribute('data-theme') !== 'dark') {
      root.setAttribute('data-theme', 'dark');
    }
    if (!root.classList.contains('dark')) root.classList.add('dark');
    if (root.classList.contains('light')) root.classList.remove('light');
    if (root.style.colorScheme !== 'dark') root.style.colorScheme = 'dark';
  }

  forceReportDark();

  const observer = new MutationObserver(function () {
    const invalid =
      root.getAttribute('data-theme') !== 'dark' ||
      root.classList.contains('light') ||
      !root.classList.contains('dark') ||
      root.style.colorScheme !== 'dark';

    if (invalid) forceReportDark();
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-theme', 'class', 'style']
  });

  document.addEventListener('DOMContentLoaded', function () {
    forceReportDark();
    document
      .querySelectorAll('#themeToggle, .theme-toggle, .theme-toggle-btn, [data-theme-toggle]')
      .forEach(function (control) {
        control.setAttribute('aria-hidden', 'true');
        control.setAttribute('tabindex', '-1');
        control.hidden = true;
      });
  });
})();
