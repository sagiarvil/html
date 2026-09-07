const fs = require('fs');

let theme = fs.readFileSync('assets/css/theme.css', 'utf8');

const lightThemeOverrides = `
/* FS-AUDIT-002: LIGHT THEME COMPONENT OVERRIDES */
html[data-theme="light"] .brand-logo {
  filter: none !important;
}

html[data-theme="light"] .hero > p,
html[data-theme="light"] .hero h1 {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .ai-decision-map {
  background: var(--theme-bg-surface) !important;
  border-color: var(--theme-border) !important;
  color: var(--theme-text-primary) !important;
}

html[data-theme="light"] .ai-decision-map-head h3,
html[data-theme="light"] .ai-decision-map-head small {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .ai-decision-map-head p {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .ai-lens {
  background: var(--theme-bg-base) !important;
  border-color: var(--theme-border) !important;
  color: var(--theme-text-primary) !important;
}

html[data-theme="light"] .ai-lens span {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .ai-lens strong {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .ai-intelligence-row {
  background: var(--theme-bg-base) !important;
  border-color: var(--theme-border) !important;
  color: var(--theme-text-primary) !important;
}

html[data-theme="light"] .ai-intelligence-row b {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .ai-intelligence-row span {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .ai-decision-lock {
  background: var(--theme-bg-base) !important;
  border-color: var(--theme-border) !important;
  color: var(--theme-text-primary) !important;
}

html[data-theme="light"] .ai-decision-lock p {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .news-card {
  background: var(--theme-bg-base) !important;
  border-color: var(--theme-border) !important;
}

html[data-theme="light"] .news-card h3 {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .news-card p {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] footer,
html[data-theme="light"] .footer-grid a,
html[data-theme="light"] .footer-bottom p {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .footer-grid h4 {
  color: var(--theme-text-strong) !important;
}

/* Ensure borders are visible */
html[data-theme="light"] .px-report-boundary,
html[data-theme="light"] .px-report-free,
html[data-theme="light"] .px-report-paid {
  border-color: var(--theme-border) !important;
  background: var(--theme-bg-surface) !important;
}

html[data-theme="light"] .px-report-free h2,
html[data-theme="light"] .px-report-paid h2 {
  color: var(--theme-text-strong) !important;
}

html[data-theme="light"] .px-report-free p,
html[data-theme="light"] .px-report-paid p {
  color: var(--theme-text-secondary) !important;
}

html[data-theme="light"] .px-report-paid {
  background: var(--theme-bg-base) !important;
}

/* Fix "Yapay Zeka Sizi Buluyor mu?" text on homepage */
html[data-theme="light"] .hero h1 {
  color: var(--theme-text-strong) !important;
}
html[data-theme="light"] .hero > p {
  color: var(--theme-text-secondary) !important;
}

/* Fix top nav texts */
html[data-theme="light"] .primary-nav a {
  color: var(--theme-text-secondary) !important;
}
html[data-theme="light"] .primary-nav a:hover {
  color: var(--theme-text-strong) !important;
}

/* Fix buttons in light mode */
html[data-theme="light"] .nav-scan-cta {
  background: #0071e3 !important;
  color: #ffffff !important;
}
`;

// Remove the old buggy brand-logo filter if it's there
theme = theme.replace(/html\[data-theme="light"\] \.brand-logo\s*\{[^}]+\}/g, '');

theme += "\n" + lightThemeOverrides;

fs.writeFileSync('assets/css/theme.css', theme);
