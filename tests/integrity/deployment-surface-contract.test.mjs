import fs from 'node:fs';

const failures = [];
const production = fs.readFileSync('.github/workflows/firebase-production.yml','utf8');
const smoke = fs.readFileSync('.github/workflows/live-smoke.yml','utf8');
const quality = fs.readFileSync('.github/workflows/quality.yml','utf8');
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
const buildCommercial = pkg.scripts?.['build:commercial'] || '';

for (const [name, text] of [['firebase-production',production],['live-smoke',smoke]]) {
  if (!text.includes('CUSTOMER DECISION HOMEPAGE V2') && name === 'firebase-production') {
    failures.push('firebase-production: customer-decision homepage marker is not verified before deploy');
  }
  if (/^\s*grep -Fq 'v3-capability-contract' index\.html\s*$/m.test(text)) {
    failures.push(`${name}: stale positive dense V3 homepage assertion returned`);
  }
  if (!text.includes('v3-capability-contract')) {
    failures.push(`${name}: detailed V3 surface is no longer verified anywhere`);
  }
}
if (!production.includes('npm run seo:sitemap')) failures.push('firebase-production: sitemap regeneration missing');
if (!quality.includes('npm run seo:sitemap')) failures.push('quality: sitemap validation missing');
const runtimePos = buildCommercial.indexOf('scripts/inject_premium_runtimes_everywhere.py');
const preferredPos = buildCommercial.indexOf('scripts/enforce_preferred_source_eligibility.py');
if (runtimePos < 0 || preferredPos < 0) failures.push('build:commercial: final runtime/preferred-source materializers missing');
if (preferredPos < runtimePos) failures.push('build:commercial: Preferred Sources fail-closed gate must run after all runtime materializers');
for (const rel of ['scripts/seo/generate_enterprise_sitemap.py','scripts/seo/test_sitemap_control_plane.py']) {
  const text = fs.readFileSync(rel,'utf8');
  if (text.includes('/Users/macair1/projects/html')) failures.push(`${rel}: hard-coded developer workstation path leaked into CI`);
  if (!text.includes('Path(__file__).resolve().parents[2]')) failures.push(`${rel}: repository root is not derived from the executing file`);
}

if (failures.length) {
  console.error('DEPLOYMENT SURFACE CONTRACT FAIL');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('DEPLOYMENT SURFACE CONTRACT PASS: customer-decision homepage, detailed V3 surfaces, and sitemap refresh are release-aligned.');
