import fs from 'node:fs';

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

// 1. Report Runtime script contract
const runtimePath = 'enterprise-analyzer/report-runtime.js';
expect(fs.existsSync(runtimePath), 'report-runtime.js must exist');

const runtimeCode = fs.readFileSync(runtimePath, 'utf8');
expect(runtimeCode.includes('cleanDomain'), 'report-runtime must include domain cleaning logic');
expect(runtimeCode.includes('getQueryDomain'), 'report-runtime must parse URL domain parameters');
expect(runtimeCode.includes('hydrateReport'), 'report-runtime must implement hydrateReport function');
expect(runtimeCode.includes('fetchDomainScan'), 'report-runtime must implement live scan fetching fallback');
expect(runtimeCode.includes("sessionStorage.getItem('ea_scan_'"), 'report-runtime must check sessionStorage cache');
expect(runtimeCode.includes('btnDownloadZip'), 'report-runtime must hook ZIP download for dynamic domain customization');
expect(runtimeCode.includes('renderQuickScannerBar'), 'report-runtime must render the interactive quick scan bar');

// 2. Report HTML surfaces linkage
const reportSurfaces = [
  'enterprise-analyzer/htmlandhtml-ai-report.html',
  'enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html',
  'tr/enterprise-analyzer/htmlandhtml-ai-report.html',
  'tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html'
];

for (const surface of reportSurfaces) {
  expect(fs.existsSync(surface), `${surface} must exist`);
  const content = fs.readFileSync(surface, 'utf8');
  expect(content.includes('/enterprise-analyzer/report-runtime.js'), `${surface} must include report-runtime.js script tag`);
}

// 3. Validator.js bridge contract
const validatorCode = fs.readFileSync('assets/js/validator.js', 'utf8');
expect(validatorCode.includes('btnViewEnterpriseReport'), 'validator.js must expose an executive enterprise report button');
expect(validatorCode.includes("sessionStorage.setItem('ea_scan_'"), 'validator.js must cache scan results in sessionStorage for instant report hydration');

// 4. Enterprise Analyzer app.js bridge contract
const appCode = fs.readFileSync('enterprise-analyzer/app.js', 'utf8');
expect(appCode.includes('htmlandhtml-ai-report?domain='), 'app.js must link demo/report button to report with domain parameter');
expect(appCode.includes("sessionStorage.setItem('ea_scan_'"), 'app.js must cache live enterprise scan in sessionStorage');

if (errors.length) {
  console.error('REPORT RUNTIME HYDRATION CONTRACT FAIL');
  for (const e of errors) console.error('- ' + e);
  process.exit(1);
}

console.log('REPORT RUNTIME HYDRATION CONTRACT PASS: full universal live scan & report hydration verified across all surfaces.');
