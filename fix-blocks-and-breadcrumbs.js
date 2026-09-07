const fs = require('fs');

// 1. Fix authority.css breadcrumbs
let auth = fs.readFileSync('assets/css/authority.css', 'utf8');
auth = auth.replace(
  /\.breadcrumbs span\s*\{\s*color:\s*var\(--line\);\s*\}/g,
  `.breadcrumbs span { color: var(--fg-dim, #6a6a72); }\n.breadcrumbs span:last-child { color: var(--fg, #0a0a0a); font-weight: 750; }`
);
fs.writeFileSync('assets/css/authority.css', auth);

// 2. Append breadcrumb rules to theme.css
let theme = fs.readFileSync('assets/css/theme.css', 'utf8');
const breadcrumbCSS = `
/* ==========================================================================
   BREADCRUMBS HIGH CONTRAST & LEGIBILITY
   ========================================================================== */
.breadcrumbs {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  color: #475569 !important;
}
.breadcrumbs a {
  color: #475569 !important;
  text-decoration: none !important;
}
.breadcrumbs a:hover {
  color: #0f172a !important;
  text-decoration: underline !important;
}
.breadcrumbs span {
  color: #64748b !important;
}
.breadcrumbs span:last-child {
  color: #0f172a !important;
  font-weight: 800 !important;
}

html[data-theme="dark"] .breadcrumbs {
  color: #94a3b8 !important;
}
html[data-theme="dark"] .breadcrumbs a {
  color: #94a3b8 !important;
}
html[data-theme="dark"] .breadcrumbs span {
  color: #64748b !important;
}
html[data-theme="dark"] .breadcrumbs span:last-child {
  color: #f8fafc !important;
  font-weight: 800 !important;
}
`;
theme += '\n' + breadcrumbCSS;
fs.writeFileSync('assets/css/theme.css', theme);

// 3. Clean up black blocks ████████ across Python build scripts
const filesToClean = [
  'scripts/build_homepages.py',
  'scripts/apply_customer_positioning.py',
  'scripts/build_tools.py',
  'scripts/inject_ai_expectation.py',
  'scripts/build_hubs.py',
  'scripts/build_guides.py'
];

for (const f of filesToClean) {
  if (!fs.existsSync(f)) continue;
  let text = fs.readFileSync(f, 'utf8');

  // build_homepages
  text = text.replace('Teşhis ücretsiz.<br>████████ $99.', 'Teşhis ücretsiz.<br>Yol Haritası $99.');
  text = text.replace(/TEST → ████████/g, 'TEST → ROLLBACK');
  text = text.replace('<li>████████ uygulama sırası</li>', '<li>P0–P3 uygulama sırası</li>');
  text = text.replace('<li>████████ + stop conditions</li>', '<li>Rollback + stop conditions</li>');
  text = text.replace('<li>████████ implementation order</li>', '<li>P0–P3 implementation order</li>');
  text = text.replace('<li>Testing and assurance systems ████████</li>', '<li>Testing and assurance systems (Acceptance & Regression)</li>');
  text = text.replace('automated code templates, test suites and ████████ plans.', 'automated code templates, test suites and rollback plans.');

  // apply_customer_positioning
  text = text.replace('test ve ████████ planına', 'test ve rollback planına');
  text = text.replace('tests and ████████.', 'tests and rollback plans.');

  // build_tools
  text = text.replace('regression tests, and ████████ plans', 'regression tests, and rollback plans');
  text = text.replace('acceptance tests and ████████ conditions.', 'acceptance tests and rollback conditions.');
  text = text.replace('████████ için $99 Yol Haritası tercih edilir.', 'Kalıcı otomatik düzeltme için $99 Yol Haritası tercih edilir.');
  text = text.replace('contracts with tests and ████████.', 'contracts with tests and rollback safeguards.');
  text = text.replace('testler ve geri alma adımlarıyla ████████ne dönüştürün.', 'testler ve geri alma adımlarıyla uygulama planına dönüştürün.');
  text = text.replace('tests and ████████ safeguards', 'tests and rollback safeguards');
  text = text.replace('öncelikli ████████ edinin.', 'öncelikli kod paketini edinin.');

  // inject_ai_expectation
  text = text.replace('test ve ████████ kod paketidir.', 'test ve rollback güvenceli kod paketidir.');
  text = text.replace('testing and ████████ package', 'testing and rollback package');

  // build_hubs
  text = text.replace('5 kritik kontrol noktası ████████ ile güvence altına alınır.', '5 kritik kontrol noktası (SEO, GEO, AEO, Schema, Güvenlik) ile güvence altına alınır.');
  text = text.replace('Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın.', 'Teknik çözüm $99 Yol Haritası paketinde. Kaybı önlemek için kilidi açın.');
  text = text.replace('The technical solution is in the ████████ package. Unlock to prevent loss.', 'The technical solution is in the $99 Roadmap package. Unlock to prevent loss.');
  text = text.replace('5 critical checkpoints are secured via ████████', '5 critical checkpoints are secured via deterministic safeguards');

  // build_guides
  text = text.replace('acceptance tests and ████████s', 'acceptance tests and rollbacks');

  fs.writeFileSync(f, text);
}

// 4. Bump authority.css and theme.css cache busters in scripts
const scriptsToBump = [
  'scripts/build_tools.py',
  'scripts/build_homepages.py',
  'scripts/build_guides.py',
  'scripts/build_hubs.py',
  'scripts/build_ai_visibility_authority.py'
];

for (const s of scriptsToBump) {
  if (!fs.existsSync(s)) continue;
  let code = fs.readFileSync(s, 'utf8');
  code = code.replace(/authority\.css\?v=\d+/g, 'authority.css?v=3');
  code = code.replace(/authority\.css(?!\?)/g, 'authority.css?v=3');
  code = code.replace(/theme\.css\?v=\d+/g, 'theme.css?v=10');
  fs.writeFileSync(s, code);
}

console.log("All fixes applied successfully.");
