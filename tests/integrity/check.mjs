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
    if (!target || target.startsWith('#') || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(target)) continue;
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

if (errors.length) {
  console.error('INTEGRITY FAIL');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`INTEGRITY PASS: ${htmlFiles.length} HTML files, ${textFiles.length} text/code files scanned.`);
