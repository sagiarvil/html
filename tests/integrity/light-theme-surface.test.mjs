import fs from 'node:fs';

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

const enterpriseTheme = fs.readFileSync('assets/css/enterprise-theme-system.css', 'utf8');
const themeCss = fs.readFileSync('assets/css/theme.css', 'utf8');
const reportCss = fs.readFileSync('enterprise-analyzer/style.css', 'utf8');
const reportHtml = fs.readFileSync('enterprise-analyzer/htmlandhtml-ai-report.html', 'utf8');
const reportDarkCss = fs.readFileSync('assets/css/report-dark-contract.css', 'utf8');

// 1) Explicit light theme must be authoritative over legacy dark :root fallbacks.
for (const token of [
  '--bg: #f8fafc !important',
  '--bg-card: #ffffff !important',
  '--theme-bg-surface: #ffffff !important',
  '--theme-text-primary: #0f172a !important',
  '--ea-bg: #f8fafc !important',
  '--ea-bg-card: #ffffff !important',
  '--ea-code-bg: #f8fafc !important'
]) {
  expect(enterpriseTheme.includes(token), `light hard guarantee missing token: ${token}`);
}

// 2) Known historical cascade defect: theme.css forces :root .topbar dark.
// The authoritative light contract must contain a higher-specificity override.
expect(themeCss.includes(':root .topbar'), 'historical topbar cascade sentinel changed; review this test');
expect(
  enterpriseTheme.includes('html[data-theme="light"] body .topbar') &&
  enterpriseTheme.includes('background: rgba(255, 255, 255, 0.97) !important'),
  'explicit LIGHT topbar override missing'
);

// 3) Code/terminal surfaces are not allowed to remain dark in LIGHT.
expect(
  enterpriseTheme.includes('html[data-theme="light"] body pre') &&
  enterpriseTheme.includes('html[data-theme="light"] body .evidence-box') &&
  enterpriseTheme.includes('html[data-theme="light"] body .ea-file-viewer'),
  'light code/terminal surface guard missing'
);
expect(reportCss.includes('--ea-code-bg: #f8fafc;'), 'Enterprise Analyzer light code token must be #f8fafc');

// 4) Premium components that historically reused text ink as a dark background
// must be explicitly neutralized under light mode.
for (const selector of [
  '.px-three-step.paid',
  '.px-report-split .paid',
  '.px-price-card.featured',
  '.ai-decision-lock'
]) {
  expect(enterpriseTheme.includes(selector), `light premium surface override missing: ${selector}`);
}

// 5) Global LIGHT support remains valid for non-report product pages, but generated
// reports must load the final dark-only contract after every legacy/report stylesheet.
const guardIndex = reportHtml.indexOf('/assets/css/enterprise-theme-system.css');
const legacyThemeIndex = reportHtml.indexOf('/assets/css/theme.css');
const reportStyleIndex = reportHtml.indexOf('/enterprise-analyzer/style.css');
const darkContractIndex = reportHtml.indexOf('/assets/css/report-dark-contract.css');
expect(guardIndex !== -1, 'report must load enterprise-theme-system.css');
expect(legacyThemeIndex > guardIndex, 'legacy theme.css load order changed; re-audit cascade');
expect(reportStyleIndex > legacyThemeIndex, 'report stylesheet must remain after legacy theme.css');
expect(darkContractIndex > reportStyleIndex, 'dark-only report contract must load after legacy/report styles');

// 6) A stored/system LIGHT preference may be read by legacy theme code, but report
// preflight + scoped CSS + runtime lock are the final authority.
expect(reportHtml.includes('data-report-dark-preflight'), 'report first-paint dark preflight missing');
expect(reportHtml.includes('data-report-dark-contract'), 'report dark-only stylesheet marker missing');
expect(reportHtml.includes('data-report-dark-runtime'), 'report dark-only runtime marker missing');
expect(reportDarkCss.includes('html[data-report-surface="true"]'), 'report dark CSS must be scope-locked');
expect(reportDarkCss.includes('[style*="background:#fff" i]'), 'report dark CSS must neutralize inline white backgrounds');

if (errors.length) {
  console.error('LIGHT THEME SURFACE CONTRACT FAIL');
  for (const e of errors) console.error('- ' + e);
  process.exit(1);
}

console.log('LIGHT THEME SURFACE CONTRACT PASS: LIGHT remains available globally while generated reports are explicitly dark-only.');
