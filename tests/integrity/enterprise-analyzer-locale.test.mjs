import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const cases = [
  ['index.html', '/enterprise-analyzer', '/tr/enterprise-analyzer'],
  ['htmlandhtml-ai-report.html', '/enterprise-analyzer/htmlandhtml-ai-report', '/tr/enterprise-analyzer/htmlandhtml-ai-report'],
  ['htmlandhtml-ai-report-LIGHT.html', '/enterprise-analyzer/htmlandhtml-ai-report-LIGHT', '/tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT'],
];

function read(rel) { return fs.readFileSync(path.join(root, rel), 'utf8'); }
function visible(source) {
  return source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<!--([\s\S]*?)-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}
function engineIds(source) { return [...source.matchAll(/class="ea-engine-id"[^>]*>\s*(ENG-\d{2})\s*</g)].map(m => m[1]); }
function engineScores(source) { return [...source.matchAll(/class="ea-engine-score-val"[^>]*>\s*(\d+)%\s*</g)].map(m => Number(m[1])); }
function findingCount(source) { return (source.match(/class="[^"]*finding-card\b/g) || []).length; }

for (const [file, enPath, trPath] of cases) {
  const enRel = `enterprise-analyzer/${file}`;
  const trRel = `tr/enterprise-analyzer/${file}`;
  assert.ok(fs.existsSync(path.join(root, trRel)), `${trRel} must be materialized`);
  const en = read(enRel); const tr = read(trRel); const enText = visible(en); const trText = visible(tr);
  assert.match(en, /<html lang="en"/i, `${enRel} must be English`);
  assert.match(tr, /<html lang="tr"/i, `${trRel} must be Turkish`);
  assert.match(en, /EA_LOCALE_CONTRACT:en:URL_SSOT/, `${enRel} locale marker missing`);
  assert.match(tr, /EA_LOCALE_CONTRACT:tr:URL_SSOT/, `${trRel} locale marker missing`);
  assert.match(en, /enterprise-analyzer-locale\.js\?v=2/, `${enRel} runtime guard missing`);
  assert.match(tr, /enterprise-analyzer-locale\.js\?v=2/, `${trRel} runtime guard missing`);
  const enUrl = `https://htmlandhtml.com${enPath}`; const trUrl = `https://htmlandhtml.com${trPath}`;
  assert.ok(en.includes(`<link rel="canonical" href="${enUrl}">`), `${enRel} canonical mismatch`);
  assert.ok(tr.includes(`<link rel="canonical" href="${trUrl}">`), `${trRel} canonical mismatch`);
  for (const source of [en, tr]) {
    assert.ok(source.includes(`<link rel="alternate" hreflang="en" href="${enUrl}">`));
    assert.ok(source.includes(`<link rel="alternate" hreflang="tr" href="${trUrl}">`));
    assert.ok(source.includes(`<link rel="alternate" hreflang="x-default" href="${enUrl}">`));
  }
  assert.doesNotMatch(enText, /[ğüşöçıİĞÜŞÖÇ]/u, `${enRel} contains Turkish-character leakage in visible copy`);
  for (const leak of ['Ücretsiz', 'Çözümler', 'Haberler', 'Sözlük', 'Onarım', 'Hedef:', 'Ağırlık:', 'Tamamlandı']) assert.ok(!enText.includes(leak), `${enRel} contains Turkish leakage: ${leak}`);
  for (const leak of ['Free Check', 'Solutions', 'Glossary', 'Fix Mandate', 'Sample Report', 'Change Theme', 'Target:', 'Weight:', 'Attention Required']) assert.ok(!trText.includes(leak), `${trRel} contains English UI leakage: ${leak}`);
  assert.deepEqual(engineIds(en), engineIds(tr), `${file} engine IDs must remain structurally parallel`);
  assert.deepEqual(engineScores(en), engineScores(tr), `${file} engine scores must remain identical across locales`);
  assert.equal(findingCount(en), findingCount(tr), `${file} finding count must remain identical across locales`);
}

const enReport = read('enterprise-analyzer/htmlandhtml-ai-report.html');
const trReport = read('tr/enterprise-analyzer/htmlandhtml-ai-report.html');
assert.ok(visible(enReport).includes('Live Sample AI Visibility Report'), 'English report title missing');
assert.ok(visible(trReport).includes('Canlı Örnek Yapay Zeka Görünürlük Raporu'), 'Turkish report title missing');
assert.equal((enReport.match(/data-i18n=/g) || []).length, (trReport.match(/data-i18n=/g) || []).length, 'report localization key structure must remain parallel');
console.log('ENTERPRISE ANALYZER LOCALE CONTRACT PASS: URL SSOT, language purity, hreflang reciprocity and EN/TR score/finding parity verified.');
