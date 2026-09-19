import fs from 'node:fs';

const failures = [];
const production = fs.readFileSync('.github/workflows/firebase-production.yml','utf8');
const smoke = fs.readFileSync('.github/workflows/live-smoke.yml','utf8');
const quality = fs.readFileSync('.github/workflows/quality.yml','utf8');

for (const [name, text] of [['firebase-production',production],['live-smoke',smoke]]) {
  if (!text.includes('PDF-INSPIRED CUSTOMER STORY V1') && name === 'firebase-production') {
    failures.push('firebase-production: PDF-first homepage marker is not verified before deploy');
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

if (failures.length) {
  console.error('DEPLOYMENT SURFACE CONTRACT FAIL');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('DEPLOYMENT SURFACE CONTRACT PASS: PDF-first homepage, detailed V3 surfaces, and sitemap refresh are release-aligned.');
