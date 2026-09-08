import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8'
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replace(/\\/g, '/');
  let rel = clean.replace(/^\/+/, '');
  if (!rel) rel = 'index.html';
  let target = path.resolve(root, rel);
  if (!target.startsWith(path.resolve(root))) return null;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!fs.existsSync(target) && !path.extname(target) && fs.existsSync(target + '.html')) target += '.html';
  return fs.existsSync(target) && fs.statSync(target).isFile() ? target : null;
}

const server = http.createServer((req, res) => {
  const target = resolvePath(req.url || '/');
  if (!target) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'content-type': mime[path.extname(target)] || 'application/octet-stream',
    'cache-control': 'no-store'
  });
  fs.createReadStream(target).pipe(res);
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
console.log(`Test server listening on ${base}`);

const browser = await chromium.launch({ headless: true });
const errors = [];

try {
  // Test Dark Specimen Report
  const pageDark = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  pageDark.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[Dark Console Error]: ${msg.text()}`);
  });
  pageDark.on('pageerror', err => errors.push(`[Dark Page Error]: ${err.message}`));

  const respDark = await pageDark.goto(base + '/enterprise-analyzer/htmlandhtml-ai-report.html', { waitUntil: 'networkidle' });
  if (!respDark || !respDark.ok()) throw new Error(`Failed to load Dark report: ${respDark?.status()}`);

  // Assert DOM sections
  const hasPlanes = await pageDark.$('.ea-planes-summary');
  if (!hasPlanes) throw new Error('Missing .ea-planes-summary in DOM');

  const hasComp = await pageDark.$('.ea-competitor-section');
  if (!hasComp) throw new Error('Missing .ea-competitor-section in DOM');

  const hasGraph = await pageDark.$('.ea-graph-section');
  if (!hasGraph) throw new Error('Missing .ea-graph-section in DOM');

  const hasConflict = await pageDark.$('.ea-conflict-section');
  if (!hasConflict) throw new Error('Missing .ea-conflict-section in DOM');

  // Test Tier Switching: Click $999 tab
  const tab999 = await pageDark.$('#tabPkg999');
  if (!tab999) throw new Error('Missing #tabPkg999 button');
  await tab999.click();
  await pageDark.waitForTimeout(300);

  const fileCount999 = (await pageDark.$$('.ea-file-item')).length;
  console.log(`✓ 999 Package Tab Clicked: ${fileCount999} deliverables rendered`);
  if (fileCount999 < 24) throw new Error(`Expected at least 24 files for 999 package, got ${fileCount999}`);

  // Test Tier Switching: Click $99 tab
  const tab99 = await pageDark.$('#tabPkg99');
  await tab99.click();
  await pageDark.waitForTimeout(300);
  const fileCount99 = (await pageDark.$$('.ea-file-item')).length;
  console.log(`✓ 99 Package Tab Clicked: ${fileCount99} files rendered`);
  if (fileCount99 < 22) throw new Error(`Expected at least 22 files for 99 package, got ${fileCount99}`);

  // Test Language Switch to English
  const langEn = await pageDark.$('#langEn');
  if (langEn) {
    await langEn.click();
    await pageDark.waitForTimeout(200);
    const h1Text = await pageDark.innerText('h1');
    console.log(`✓ Language toggled to English: H1="${h1Text}"`);
    if (!h1Text.includes('Enterprise AI Visibility')) throw new Error('English H1 title translation failed');
  }

  // Scroll to Competitor Matrix and capture screenshot
  const compEl = await pageDark.$('.ea-competitor-section');
  if (compEl) {
    await compEl.scrollIntoViewIfNeeded();
    await pageDark.waitForTimeout(300);
    await pageDark.screenshot({ path: '/Users/macair1/.gemini/antigravity/brain/6d129c2d-7f53-49cb-ba79-bab7c91195de/v4_specimen_competitor_matrix.png' });
  }

  // Scroll to Citation Graph and capture screenshot
  const graphEl = await pageDark.$('.ea-graph-section');
  if (graphEl) {
    await graphEl.scrollIntoViewIfNeeded();
    await pageDark.waitForTimeout(300);
    await pageDark.screenshot({ path: '/Users/macair1/.gemini/antigravity/brain/6d129c2d-7f53-49cb-ba79-bab7c91195de/v4_specimen_citation_graph.png' });
  }

  await pageDark.close();

  // Test Light Specimen Report
  const pageLight = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  pageLight.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[Light Console Error]: ${msg.text()}`);
  });
  pageLight.on('pageerror', err => errors.push(`[Light Page Error]: ${err.message}`));

  const respLight = await pageLight.goto(base + '/enterprise-analyzer/htmlandhtml-ai-report-LIGHT.html', { waitUntil: 'networkidle' });
  if (!respLight || !respLight.ok()) throw new Error(`Failed to load Light report: ${respLight?.status()}`);

  await pageLight.screenshot({ path: '/Users/macair1/.gemini/antigravity/brain/6d129c2d-7f53-49cb-ba79-bab7c91195de/v4_specimen_light.png', fullPage: false });
  await pageLight.close();

  // Test Enterprise Analyzer Index Page
  const pageAnalyzer = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  pageAnalyzer.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[Analyzer Console Error]: ${msg.text()}`);
  });
  pageAnalyzer.on('pageerror', err => errors.push(`[Analyzer Page Error]: ${err.message}`));

  const respAnalyzer = await pageAnalyzer.goto(base + '/enterprise-analyzer/', { waitUntil: 'networkidle' });
  if (!respAnalyzer || !respAnalyzer.ok()) throw new Error(`Failed to load Analyzer index: ${respAnalyzer?.status()}`);

  await pageAnalyzer.screenshot({ path: '/Users/macair1/.gemini/antigravity/brain/6d129c2d-7f53-49cb-ba79-bab7c91195de/v4_analyzer_index.png', fullPage: false });
  await pageAnalyzer.close();

  if (errors.length > 0) {
    console.error('Errors found during Playwright QA:', errors);
    process.exit(1);
  }

  console.log('✓ ALL SPECIMEN QA CHECKS PASSED WITH 0 ERRORS!');
} finally {
  await browser.close();
  server.close();
}
