#!/usr/bin/env node
/**
 * CI/CD Quality Gates (G0–G9)
 * Super-Mandate V3.0 / Mandate v6.0 §5
 * Rule: ONE failure = BUILD BLOCKED.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

async function runGates() {
  const { SEO_REGISTRY } = await import('../src/seo/registry.ts');
  const violations = [];

  console.log(`[CI GATES] Evaluating ${SEO_REGISTRY.length} registered canonical pages across G0–G9...`);

  // G0: Policy & Noindex Violation
  for (const page of SEO_REGISTRY) {
    if (page.indexDirective.includes('noindex') && page.role === 'home') {
      violations.push(`[G0 POLICY] Homepage cannot be noindex: ${page.route}`);
    }
  }

  // G1: Canonical Consistency
  for (const page of SEO_REGISTRY) {
    if (page.indexDirective === 'index, follow' && page.canonicalRoute !== page.route) {
      violations.push(`[G1 CANONICAL] ${page.route} indexable but canonical differs: ${page.canonicalRoute}`);
    }
  }

  // G2: Raw SSR HTML Existence Check
  for (const page of SEO_REGISTRY) {
    if (page.indexDirective === 'index, follow') {
      let relPath = page.route === '/' ? 'index.html' : page.route.replace(/^\//, '');
      if (relPath.endsWith('/')) relPath += 'index.html';
      else if (!relPath.endsWith('.html')) relPath += '.html';

      const filePath = path.join(root, relPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('<title>')) violations.push(`[G2 SSR] ${page.route} missing <title> in ${relPath}`);
        if (!content.includes('<h1') && !content.includes('<H1')) violations.push(`[G2 SSR] ${page.route} missing <H1> in ${relPath}`);
        if (!content.includes('application/ld+json')) violations.push(`[G2 SSR] ${page.route} missing JSON-LD in ${relPath}`);
        if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) violations.push(`[G2 SSR] ${page.route} missing canonical in ${relPath}`);
      } else {
        violations.push(`[G2 SSR] Target HTML file missing for route ${page.route}: ${relPath}`);
      }
    }
  }

  // G3: Search Intent & Cannibalization
  const intentMap = new Map();
  for (const page of SEO_REGISTRY) {
    const key = `${page.locale}_${page.primaryIntent.toLowerCase().trim()}`;
    if (intentMap.has(key)) {
      violations.push(`[G3 CANNIBALIZATION] "${page.primaryIntent}" assigned to both ${intentMap.get(key)} and ${page.route}`);
    } else {
      intentMap.set(key, page.route);
    }
  }

  // G4: LLM Deep Sub-Graph Integrity
  const rootLlmsPath = path.join(root, 'llms.txt');
  if (!fs.existsSync(rootLlmsPath)) {
    violations.push('[G4 LLMS ROOT] Missing /llms.txt at root');
  } else {
    const llmsTxt = fs.readFileSync(rootLlmsPath, 'utf8');
    if (!llmsTxt.includes('llms/core.md')) {
      violations.push('[G4 LLMS ROOT] /llms.txt missing reference to /llms/core.md');
    }
  }

  for (const page of SEO_REGISTRY) {
    if (page.llmSubGraphRoute) {
      const subGraphFile = path.join(root, page.llmSubGraphRoute.replace(/^\//, ''));
      if (!fs.existsSync(subGraphFile)) {
        violations.push(`[G4 SUB-GRAPH] ${page.route} missing subgraph file ${page.llmSubGraphRoute}`);
      }
    }
  }

  // G5: IndexNow Alphanumeric Key File
  const rootFiles = fs.readdirSync(root);
  const keyFiles = rootFiles.filter(f => f.endsWith('.txt') && f.length >= 16 && /^[a-zA-Z0-9-]+\.txt$/.test(f) && f !== 'robots.txt');
  if (keyFiles.length === 0) {
    violations.push('[G5 INDEXNOW] Missing IndexNow [KEY].txt validation file in root');
  } else {
    const keyContent = fs.readFileSync(path.join(root, keyFiles[0]), 'utf8').trim();
    if (!keyFiles[0].startsWith(keyContent)) {
      violations.push(`[G5 INDEXNOW] Key file content does not match filename: ${keyFiles[0]} vs ${keyContent}`);
    }
  }

  // G6: Fake Freshness Detection
  const now = Date.now();
  for (const page of SEO_REGISTRY) {
    const modTime = new Date(page.modifiedAt).getTime();
    if (isNaN(modTime)) {
      violations.push(`[G6 FAKE FRESHNESS] ${page.route} has invalid modifiedAt date: ${page.modifiedAt}`);
    } else if (modTime > now + 300000) {
      violations.push(`[G6 FAKE FRESHNESS] ${page.route} modifiedAt in future: ${page.modifiedAt}`);
    }
  }

  // G7: Information Gain Score (US Patent 10296574B2)
  for (const page of SEO_REGISTRY) {
    let relPath = page.route === '/' ? 'index.html' : page.route.replace(/^\//, '');
    if (relPath.endsWith('/')) relPath += 'index.html';
    else if (!relPath.endsWith('.html')) relPath += '.html';

    const p = path.join(root, relPath);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const hasStats = /\d+%|\d+\s*(percent|fold|x)|\$\d+/i.test(content);
      const hasMethodology = /methodology|metodoloji|framework|protocol|protokol|standard|standart|benchmark/i.test(content);
      const hasOriginalData = /our research|we analyzed|we measured|study of|survey of|analiz|motor|kontrol/i.test(content);
      if (!hasStats && !hasMethodology && !hasOriginalData) {
        violations.push(`[G7 INFO GAIN] ${page.route} lacks statistical data, methodology, or empirical evidence`);
      }
    }
  }

  // G8: Entity Triangulation Completeness
  for (const page of SEO_REGISTRY) {
    if (!page.primaryEntity || !Array.isArray(page.primaryEntity.sameAs) || page.primaryEntity.sameAs.length < 3) {
      violations.push(`[G8 ENTITY] ${page.route} has <3 sameAs references (Wikidata, LinkedIn, Crunchbase required)`);
    }
  }

  // G9: N8N Workflow Integration
  const n8nConfigPath = path.join(root, 'n8n', 'workflows.json');
  if (!fs.existsSync(n8nConfigPath)) {
    violations.push('[G9 N8N] Missing n8n workflow configuration at n8n/workflows.json');
  } else {
    try {
      const n8nData = JSON.parse(fs.readFileSync(n8nConfigPath, 'utf8'));
      if (!Array.isArray(n8nData.workflows) || n8nData.workflows.length === 0) {
        violations.push('[G9 N8N] n8n workflows array is empty or invalid');
      }
    } catch (e) {
      violations.push(`[G9 N8N] n8n/workflows.json failed JSON parse: ${e.message}`);
    }
  }

  if (violations.length > 0) {
    console.error(`\n❌ [DEPLOY BLOCKED] ${violations.length} critical gate violations:`);
    violations.forEach(v => console.error(`  ⛔ ${v}`));
    process.exit(1);
  }

  console.log('✅ [PASSED] G0–G9 Quality Gates: 0 errors');
}

runGates().catch(err => {
  console.error('Fatal gate runner error:', err);
  process.exit(1);
});
