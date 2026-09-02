import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ignoreDirs = new Set(['.git', 'node_modules']);
const htmlFiles = [];
const textFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else {
      const rel = path.relative(root, full).replaceAll('\\', '/');
      if (/\.(html|css|js|mjs|md|txt|json|xml|ts)$/i.test(rel)) textFiles.push(rel);
      if (/\.html$/i.test(rel)) htmlFiles.push(rel);
    }
  }
}
walk(root);

const forbidden = [
  /zce\.github\.io\/html5up/i,
  /pixelarity\.com/i,
  /\bHTML5 UP\b/i,
  /\bParadigm Shift\b/i,
  /\bMassively\b/i,
  /\bEthereal\b/i,
  /\bSOVEREIGN ASSET TIER\b/i,
  /21,579,731/
];

const errors = [];
for (const rel of textFiles) {
  if (rel === 'tests/integrity/check.mjs') continue;
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const pattern of forbidden) {
    if (pattern.test(text)) errors.push(`${rel}: forbidden legacy reference ${pattern}`);
  }
}

const attrRe = /(?:href|src)=["']([^"']+)["']/gi;
for (const rel of htmlFiles) {
  const file = path.join(root, rel);
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = attrRe.exec(text))) {
    let target = match[1].trim();
    if (!target || target.includes('${') || target.includes('{{') || target.startsWith('#') || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(target)) continue;
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    let resolved;
    if (target.startsWith('/')) resolved = path.join(root, target.replace(/^\/+/, ''));
    else resolved = path.resolve(path.dirname(file), target);
    if (target === '/' || target === './') resolved = path.join(root, 'index.html');
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) resolved = path.join(resolved, 'index.html');
    if (!fs.existsSync(resolved)) errors.push(`${rel}: missing local target ${match[1]}`);
  }
}

const habitatPages = [
  'demos/habitat.html',
  'demos/habitat-listings.html',
  'demos/habitat-property.html',
  'demos/habitat-neighborhoods.html',
  'demos/habitat-agents.html',
  'demos/habitat-journal.html',
  'demos/habitat-contact.html'
];
for (const rel of habitatPages) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) { errors.push(`Habitat release: missing required page ${rel}`); continue; }
  const text = fs.readFileSync(file, 'utf8');
  if (!/<title>[^<]+<\/title>/i.test(text)) errors.push(`${rel}: missing document title`);
  if (!/<meta\s+name=["']description["']/i.test(text)) errors.push(`${rel}: missing meta description`);
  if (!/assets\/css\/habitat-premium\.css/i.test(text)) errors.push(`${rel}: missing shared Habitat CSS`);
  if (!/assets\/js\/habitat-premium\.js/i.test(text)) errors.push(`${rel}: missing shared Habitat JavaScript`);
  if (/\b(?:h-wrap|h-nav|h-links|h-grid3|h-listing|h-contact-card)\b/.test(text)) errors.push(`${rel}: legacy pre-flagship Habitat markup still present`);
  if (/<a\b[^>]*>[\s\S]{0,900}?<button\b/i.test(text)) errors.push(`${rel}: nested interactive button inside anchor detected`);
}

const productsPath = path.join(root, 'assets/js/products.js');
if (fs.existsSync(productsPath)) {
  const products = fs.readFileSync(productsPath, 'utf8');
  for (const file of ['habitat.html','habitat-listings.html','habitat-property.html','habitat-neighborhoods.html','habitat-agents.html','habitat-journal.html','habitat-contact.html']) {
    if (!products.includes(file)) errors.push(`assets/js/products.js: Habitat manifest missing ${file}`);
  }
  if (!/releaseState:'RELEASE CANDIDATE'/.test(products)) errors.push('assets/js/products.js: Habitat release state missing');
  if (!/7 real HTML pages/.test(products)) errors.push('assets/js/products.js: Habitat seven-page package summary missing');
}

for (const rel of ['live-preview.html','product.html']) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  if (!/releaseState/.test(text)) errors.push(`${rel}: release-state disclosure missing`);
  if (!/product\.pages|const pages/.test(text)) errors.push(`${rel}: included page rendering logic missing`);
}

if (errors.length) {
  console.error('INTEGRITY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`INTEGRITY PASS: ${htmlFiles.length} HTML files, ${textFiles.length} text/code files scanned; Habitat flagship release contract checked.`);
