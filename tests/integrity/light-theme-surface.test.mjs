import fs from 'node:fs';

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

const enterpriseTheme = fs.readFileSync('assets/css/enterprise-theme-system.css', 'utf8');
const themeCss = fs.readFileSync('assets/css/theme.css', 'utf8');
const reportCss = fs.readFileSync('enterprise-analyzer/style.css', 'utf8');
const reportHtml = fs.readFileSync('enterprise-analyzer/htmlandhtml-ai-report.html', 'utf8');

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

// 5) Report must load the guard before legacy CSS and its local report stylesheet last.
const guardIndex = reportHtml.indexOf('/assets/css/enterprise-theme-system.css');
const legacyThemeIndex = reportHtml.indexOf('/assets/css/theme.css');
const reportStyleIndex = reportHtml.indexOf('/enterprise-analyzer/style.css');
expect(guardIndex !== -1, 'report must load enterprise-theme-system.css');
expect(legacyThemeIndex > guardIndex, 'legacy theme.css load order changed; re-audit cascade');
expect(reportStyleIndex > legacyThemeIndex, 'report stylesheet must remain after legacy theme.css');

// 6) Guard selectors rely on the runtime theme engine setting both attribute and class.
expect(reportHtml.includes("classList.toggle('light', t === 'light')"), 'zero-flash light class sync missing');
expect(reportHtml.includes("setAttribute('data-theme', t)"), 'zero-flash data-theme sync missing');

if (errors.length) {
  console.error('LIGHT THEME SURFACE CONTRACT FAIL');
  for (const e of errors) console.error('- ' + e);
  process.exit(1);
}

console.log('LIGHT THEME SURFACE CONTRACT PASS: explicit light mode cannot inherit legacy dark report surfaces.');
