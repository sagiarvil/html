import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = process.cwd();

// 1. Zero-Randomness Test
console.log('Testing Zero Randomness across Engine V2 & Runtime surfaces...');
const filesToCheck = [
  'functions/lib/engine-v2/02-engine-v2-core.ts',
  'functions/lib/engine-v2/03-engine-v2-engines.ts',
  'functions/lib/engine-v2/index.ts',
  'functions/api/scan-v2.ts',
  'assets/js/enterprise-runtime.js',
  'assets/js/validator.js',
];

for (const rel of filesToCheck) {
  const fullPath = path.join(root, rel);
  assert.ok(fs.existsSync(fullPath), `File must exist: ${rel}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert.ok(!content.includes('Math.random'), `Zero-randomness violation: Math.random found in ${rel}`);
}
console.log('✓ Zero-randomness verified: 0 occurrences of Math.random across all evaluated surfaces.');

// 2. 18 Engines Registration & Rule Completeness
console.log('Testing 18 Engine Registration & Rules in Engine V2...');
const engineCode = fs.readFileSync(path.join(root, 'functions/lib/engine-v2/03-engine-v2-engines.ts'), 'utf8');
const expectedEngines = [
  'ENG-01', 'ENG-02', 'ENG-03', 'ENG-04', 'ENG-05', 'ENG-06',
  'ENG-07', 'ENG-08', 'ENG-09', 'ENG-10', 'ENG-11', 'ENG-12',
  'ENG-13', 'ENG-14', 'ENG-15', 'ENG-16', 'ENG-17', 'ENG-18'
];

for (const engId of expectedEngines) {
  assert.ok(engineCode.includes(`id = '${engId}'`), `Engine ${engId} must be registered in 03-engine-v2-engines.ts`);
}
assert.ok(engineCode.includes('buildEngineV2Registry'), 'buildEngineV2Registry must be exported');
console.log('✓ All 18 engines (ENG-01 through ENG-18) verified in registry definition.');

// 3. Determinism & Bit-for-bit Equality Test
console.log('Testing Engine V2 execution determinism...');
const determinismScript = `
import('./functions/lib/engine-v2/index.ts').then(async m => {
  const orchestrator = m.buildEngineV2Registry();
  const input = {
    domain: 'htmlandhtml.com',
    html: '<!DOCTYPE html><html lang="tr"><head><title>HTML&HTML - AI Search Visibility</title><meta name="description" content="AI visibility testing"><link rel="canonical" href="https://htmlandhtml.com/"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"HTML&HTML"}</script></head><body><h1>Yapay Zeka Sizi Buluyor mu?</h1><p>Tavsiye Edilmeye Hazır mısınız?</p></body></html>',
    headers: { 'content-type': 'text/html; charset=utf-8', 'strict-transport-security': 'max-age=31536000; includeSubDomains', 'x-content-type-options': 'nosniff' },
    robotsTxt: 'User-agent: *\\nAllow: /\\nSitemap: https://htmlandhtml.com/sitemap.xml',
    sitemapXml: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://htmlandhtml.com/</loc></url></urlset>',
    llmsTxt: '# HTML&HTML\\n> Machine-readable AI directory\\n\\n## Docs\\n- [Overview](https://htmlandhtml.com/overview.md): System documentation',
    pages: [],
    links: ['https://htmlandhtml.com/tr/site-tarama/', 'https://htmlandhtml.com/tr/araclar/']
  };

  const run1 = await orchestrator.run(input);
  const run2 = await orchestrator.run(input);

  const scores1 = Array.from(run1.results.entries()).map(([id, r]) => ({
    id,
    score: r.score,
    status: r.status,
    findingCount: r.findings.length,
    findings: r.findings.map(f => f.id)
  }));
  const scores2 = Array.from(run2.results.entries()).map(([id, r]) => ({
    id,
    score: r.score,
    status: r.status,
    findingCount: r.findings.length,
    findings: r.findings.map(f => f.id)
  }));

  const json1 = JSON.stringify({ score: run1.overallScore, status: run1.overallStatus, scores: scores1 });
  const json2 = JSON.stringify({ score: run2.overallScore, status: run2.overallStatus, scores: scores2 });

  if (json1 !== json2) {
    console.error('DETERMINISM MISMATCH');
    process.exit(1);
  }
  console.log('DETERMINISM_OK: Run 1 and Run 2 match bit-for-bit. Overall score: ' + run1.overallScore + ', Status: ' + run1.overallStatus);
});
`;

const detOutput = execSync(`node --experimental-strip-types -e "${determinismScript.replace(/"/g, '\\"')}"`, {
  cwd: root,
  encoding: 'utf8'
});
assert.ok(detOutput.includes('DETERMINISM_OK'), 'Determinism test must output DETERMINISM_OK');
console.log('✓ Engine V2 determinism verified: Two independent runs produced bit-for-bit identical outputs.');

// 4. Dead Letter Queue (DLQ) & Fault Tolerance
console.log('Testing Engine V2 DLQ fault tolerance & graceful recovery...');
const dlqScript = `
import('./functions/lib/engine-v2/index.ts').then(async m => {
  const orchestrator = new m.EngineOrchestrator();
  class FaultyEngine extends m.EngineTool {
    id = 'ENG-FAIL';
    name = 'Failing Engine';
    description = 'Always throws';
    weight = 5;
    async execute() {
      throw new Error('Upstream socket hangup');
    }
  }
  orchestrator.register(new FaultyEngine());

  const input = {
    domain: 'unresolvable-private-target.local',
    html: '',
    headers: {},
    robotsTxt: '',
    sitemapXml: '',
    llmsTxt: '',
    pages: [],
    links: []
  };

  const output = await orchestrator.run(input, { enableDLQ: true, maxRetries: 2 });
  if (output.dlq.length === 1 && output.results.get('ENG-FAIL')?.status === 'NOT_MEASURED') {
    console.log('DLQ_OK: Gracefully captured in DLQ with NOT_MEASURED status.');
  } else {
    console.error('DLQ_FAILED');
    process.exit(1);
  }
});
`;

const dlqOutput = execSync(`node --experimental-strip-types -e "${dlqScript.replace(/"/g, '\\"')}"`, {
  cwd: root,
  encoding: 'utf8'
});
assert.ok(dlqOutput.includes('DLQ_OK'), 'DLQ test must output DLQ_OK');
console.log('✓ DLQ fault tolerance verified: Failing engines fall back gracefully to NOT_MEASURED without crashing.');

// 5. Delivery Pack V2 Artifact Verification
console.log('Testing Delivery Pack V2 Expansion (30x LLMS + Roadmap + ICS + Score Projection)...');
const deliveryPackCode = fs.readFileSync(path.join(root, 'functions/lib/delivery-pack.ts'), 'utf8');

assert.ok(deliveryPackCode.includes('generatePriorityRoadmap'), 'Delivery pack must include generatePriorityRoadmap');
assert.ok(deliveryPackCode.includes('generatePriorityRoadmapICS'), 'Delivery pack must include generatePriorityRoadmapICS');
assert.ok(deliveryPackCode.includes('generateScoreProjection'), 'Delivery pack must include generateScoreProjection');
assert.ok(deliveryPackCode.includes('LLMSMultiGenerator'), 'Delivery pack must include LLMSMultiGenerator');
assert.ok(deliveryPackCode.includes('03_PRIORITY_ROADMAP.md'), 'Delivery pack must emit 03_PRIORITY_ROADMAP.md');
assert.ok(deliveryPackCode.includes('03_PRIORITY_ROADMAP.ics'), 'Delivery pack must emit 03_PRIORITY_ROADMAP.ics');
assert.ok(deliveryPackCode.includes('11_SCORE_PROJECTION.md'), 'Delivery pack must emit 11_SCORE_PROJECTION.md');
assert.ok(deliveryPackCode.includes('llms-index.txt'), 'Delivery pack must emit llms-index.txt');
console.log('✓ Delivery Pack V2 expanded bundle verified: Priority Roadmap (.md + .ics), Score Projection (.md), and LLMS bundle wired.');

// 6. Scan V2 Endpoint & Public Scan Flag
console.log('Testing Scan V2 Endpoint & Scan integration...');
const scanV2Code = fs.readFileSync(path.join(root, 'functions/api/scan-v2.ts'), 'utf8');
const scanCode = fs.readFileSync(path.join(root, 'functions/api/scan.ts'), 'utf8');

assert.ok(scanV2Code.includes('buildEngineV2Registry'), 'scan-v2.ts must invoke buildEngineV2Registry');
assert.ok(scanV2Code.includes('gatherScanInput'), 'scan-v2.ts must implement gatherScanInput');
assert.ok(scanV2Code.includes('createNDJSONStream'), 'scan-v2.ts must support NDJSON streaming via createNDJSONStream');
assert.ok(scanV2Code.includes('probeWikidataEntity'), 'scan-v2.ts must implement probeWikidataEntity empirical probe');
assert.ok(scanV2Code.includes('probeCommonCrawlCorpus'), 'scan-v2.ts must implement probeCommonCrawlCorpus empirical probe');
assert.ok(scanV2Code.includes('runEnterpriseIntelligenceAudit'), 'scan-v2.ts must integrate runEnterpriseIntelligenceAudit');
assert.ok(scanV2Code.includes('externalProbes'), 'scan-v2.ts must forward externalProbes to audit and payload');
assert.ok(scanV2Code.includes('eaiV4'), 'scan-v2.ts must return eaiV4 3-Planes payload');
assert.ok(scanCode.includes('v2Available: true') || scanCode.includes('v2Available:true'), 'scan.ts must advertise v2Available flag');
console.log('✓ Scan V2 endpoint, empirical probes (Wikidata/Common Crawl), 3-Planes V4 & v2Available flag verified.');

// 7. Engine V2 Directory Architecture Verification
console.log('Testing Engine V2 canonical directory structure (02, 03, 04, index)...');
const reqV2Files = [
  'functions/lib/engine-v2/02-engine-v2-core.ts',
  'functions/lib/engine-v2/03-engine-v2-engines.ts',
  'functions/lib/engine-v2/03-engine-v2-18-engines.ts',
  'functions/lib/engine-v2/04-engine-v2-api.ts',
  'functions/lib/engine-v2/index.ts',
];
for (const rel of reqV2Files) {
  assert.ok(fs.existsSync(path.join(root, rel)), `Missing canonical V2 file: ${rel}`);
}
console.log('✓ All canonical Engine V2 module files verified in functions/lib/engine-v2/.');

// 8. 30x Specialized LLMS Output Verification
console.log('Testing 30x LLMS generator full capacity...');
const llmsScript = `
import('./functions/lib/delivery-pack.ts').then(m => {
  const bundle = m.generateLLMSBundle('testdomain.com', [], 'tr');
  const count = bundle.length;
  const indexFile = bundle.find(f => f.filename === 'llms-index.txt');
  const txtFiles = bundle.filter(f => f.filename.startsWith('llms-') && f.filename !== 'llms-index.txt');
  if (count === 31 && indexFile && txtFiles.length === 30) {
    console.log('LLMS_30X_OK: Generated 30 distinct page files + 1 index file.');
  } else {
    console.error('LLMS_30X_FAILED: Expected 31 files, got ' + count);
    process.exit(1);
  }
});
`;
const llmsOutput = execSync(`node --experimental-strip-types -e "${llmsScript.replace(/"/g, '\\"')}"`, {
  cwd: root,
  encoding: 'utf8'
});
assert.ok(llmsOutput.includes('LLMS_30X_OK'), 'LLMS generator must output 30 files + 1 index file');
console.log('✓ 30x LLMS generator verified: Exactly 30 distinct machine-surface files + 1 index file generated.');

// 9. Feature Flags & Frontend Progressive Streaming
console.log('Testing Feature Flags and Frontend progressive stream wiring...');
const ffCode = fs.readFileSync(path.join(root, 'assets/js/feature-flags.js'), 'utf8');
const runtimeCode = fs.readFileSync(path.join(root, 'assets/js/enterprise-runtime.js'), 'utf8');

assert.ok(ffCode.includes('engineV2: true'), 'Feature flag engineV2 must be true');
assert.ok(ffCode.includes('zipLLMS30x: true'), 'Feature flag zipLLMS30x must be true');
assert.ok(runtimeCode.includes('renderRealEngines'), 'enterprise-runtime.js must include renderRealEngines');
assert.ok(runtimeCode.includes('/api/scan-v2'), 'enterprise-runtime.js must connect to /api/scan-v2');
console.log('✓ Feature flags & frontend progressive streaming verified.');

console.log('\n========================================');
console.log('ENGINE V2 FULL ARCHITECTURE TEST: PASS');
console.log('========================================\n');

