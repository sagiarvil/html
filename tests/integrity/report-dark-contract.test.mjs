import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'ai-report/index.html',
  'enterprise-analyzer/htmlandhtml-ai-report.html',
  'enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html',
  'tr/enterprise-analyzer/htmlandhtml-ai-report.html',
  'tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html',
  'en/sample-report/index.html',
  'tr/ornek-rapor/index.html',
];

const failures = [];
for (const rel of targets) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    failures.push(`${rel}: missing`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('data-report-dark-preflight')) {
    failures.push(`${rel}: missing first-paint dark preflight`);
  }
  if (!html.includes('data-report-dark-contract')) {
    failures.push(`${rel}: missing dark-contract CSS link`);
  }
  if (!html.includes('data-report-dark-runtime')) {
    failures.push(`${rel}: missing dark-contract runtime`);
  }
  if (/data-theme="light"/i.test(html)) {
    failures.push(`${rel}: contains forbidden data-theme="light"`);
  }
}

const css = fs.readFileSync(path.join(root, 'assets/css/report-dark-contract.css'), 'utf8');
for (const required of [
  'html[data-report-surface="true"]',
  '[style*="background:#fff" i]',
  'background: #121827 !important',
  '@media print',
]) {
  if (!css.includes(required)) failures.push(`report-dark-contract.css missing: ${required}`);
}

const runtime = fs.readFileSync(path.join(root, 'assets/js/report-dark-contract.js'), 'utf8');
for (const required of ['MutationObserver', "classList.remove('light')", "setAttribute('data-theme', 'dark')"]) {
  if (!runtime.includes(required)) failures.push(`report-dark-contract.js missing: ${required}`);
}

if (failures.length) {
  console.error('REPORT DARK CONTRACT FAIL');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}

console.log(`REPORT DARK CONTRACT PASS: ${targets.length} report surfaces are dark-only.`);
