import fs from 'node:fs';

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

const runtime = fs.readFileSync('assets/js/ai-positioning.js', 'utf8');

expect(
  runtime.includes('document.documentElement.dataset.scanView=active?\'report\':\'landing\''),
  'scan result view must expose an explicit landing/report state contract'
);
expect(
  runtime.includes("scanner.insertAdjacentElement('afterend',result)"),
  'scan result must be moved directly below the scanner before report rendering'
);
expect(
  runtime.includes('html[data-scan-view="report"] main>*:not(#scanner):not(#result){display:none!important}'),
  'report mode must suppress homepage marketing sections'
);
expect(
  runtime.includes('html[data-scan-view="report"] #result .mandate-card{display:none!important}'),
  'report mode must remove the persistent right-side pricing column'
);
expect(
  runtime.includes('html[data-scan-view="report"] #result .result-columns{grid-template-columns:minmax(0,1fr)!important;gap:0!important}'),
  'report findings must expand to a single full-width result column'
);
expect(
  runtime.includes("matchMedia('(prefers-reduced-motion: reduce)')"),
  'report autofocus/scroll must respect reduced-motion preference'
);
expect(
  !runtime.includes('html[data-scan-view="report"] .locked-fix{display:none'),
  'inline paid remediation surfaces must not be globally hidden in report mode'
);

for (const page of ['index.html', 'tr/index.html', 'en/index.html']) {
  const html = fs.readFileSync(page, 'utf8');
  expect(html.includes('id="scanner"'), `${page}: scanner sentinel missing`);
  expect(html.includes('id="result"'), `${page}: result sentinel missing`);
  expect(html.includes('/assets/js/ai-positioning.js'), `${page}: scan report state runtime missing`);
}

if (errors.length) {
  console.error('SCAN REPORT MODE CONTRACT FAIL');
  for (const e of errors) console.error('- ' + e);
  process.exit(1);
}

console.log('SCAN REPORT MODE CONTRACT PASS: successful scans switch to a flat results-only view with no persistent pricing sidebar.');
