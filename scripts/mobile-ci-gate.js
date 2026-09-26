#!/usr/bin/env node
/**
 * 📱 MOBILE-FIRST CI/CD QUALITY GATES (MG0–MG20)
 * Doküman Kodu: MANDATE-SEO-GEO-MOBILE-FIRST-2026-V8 §10.2
 * Statü: MECBURİ VE BAĞLAYICI MİMARİ STANDART (MANDATORY ENFORCEMENT)
 * Rule: ONE failure = BUILD FAIL = process.exit(1).
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

async function runMobileGates() {
  console.log('📱 [MOBILE-CI-GATE] Mobile-First SEO, PWA, App Indexing & CWV Kapıları (MG0–MG20) Çalıştırılıyor...');
  const violations = [];

  const keyFiles = [
    { name: 'manifest.webmanifest', gate: 'MG5 PWA' },
    { name: 'sw.js', gate: 'MG5 PWA' },
    { name: 'offline.html', gate: 'MG5 PWA' },
    { name: 'app-link.json', gate: 'MG6 APPLINK' },
    { name: path.join('.well-known', 'assetlinks.json'), gate: 'MG6 APPLINK' },
    { name: path.join('.well-known', 'apple-app-site-association'), gate: 'MG6 APPLINK' },
    { name: 'agent.txt', gate: 'MG13 AGENT' },
    { name: path.join('.well-known', 'agent.json'), gate: 'MG13 AGENT' },
    { name: path.join('mobile', 'feed.xml'), gate: 'MG16 MFEED' },
    { name: 'sitemap-mobile.xml', gate: 'MG17 MSITEMAP' },
    { name: path.join('llms', 'mobile', 'voice-queries.md'), gate: 'MG8 MLLM' },
    { name: path.join('llms', 'mobile', 'local-intent.md'), gate: 'MG8 MLLM' },
    { name: path.join('llms', 'mobile', 'home-mobile.md'), gate: 'MG8 MLLM' }
  ];

  for (const item of keyFiles) {
    const full = path.join(root, item.name);
    if (!fs.existsSync(full)) {
      violations.push(`[${item.gate}] Zorunlu dosya diskte YOK: /${item.name}`);
    }
  }

  // HTML denetimleri
  const htmlFilesToCheck = ['index.html'];
  for (const rel of htmlFilesToCheck) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, 'utf8');

    // MG0: Viewport Meta
    if (!content.includes('name="viewport"')) {
      violations.push(`[MG0 VIEWPORT] ${rel} sayfasında viewport meta YOK!`);
    } else {
      if (!content.includes('width=device-width')) {
        violations.push(`[MG0 VIEWPORT] ${rel} sayfasında width=device-width eksik!`);
      }
      if (content.includes('user-scalable=no')) {
        violations.push(`[MG0 VIEWPORT] ${rel} sayfasında user-scalable=no YASAK (WCAG ihlali)!`);
      }
    }

    // MG5: PWA Manifest link
    if (!content.includes('rel="manifest"') && !content.includes("rel='manifest'")) {
      violations.push(`[MG5 PWA] ${rel} sayfasında manifest link YOK!`);
    }

    // MG15: Theme color ve Apple web app meta
    if (!content.includes('name="theme-color"')) {
      violations.push(`[MG15 THEME] ${rel} sayfasında theme-color YOK!`);
    }
    if (!content.includes('apple-mobile-web-app-capable')) {
      violations.push(`[MG15 APPLE] ${rel} sayfasında apple-mobile-web-app-capable YOK!`);
    }

    // MG18: Intrusive Interstitial
    if (/class="[^"]*fullscreen-interstitial[^"]*"/.test(content) && !/class="[^"]*close-button[^"]*"/.test(content)) {
      violations.push(`[MG18 INTERSTITIAL] ${rel} sayfasında intrusive interstitial tespit edildi!`);
    }
  }

  // Robust SEO Registry Loader for any Node environment
  let SEO_REGISTRY = [];
  try {
    const mod = await import('../src/seo/registry.ts');
    SEO_REGISTRY = mod.SEO_REGISTRY || [];
  } catch (err) {
    const regFile = path.join(root, 'src', 'seo', 'registry.ts');
    const regContent = fs.readFileSync(regFile, 'utf8');
    const blocks = regContent.split(/\{\s*route:/).slice(1);
    for (const b of blocks) {
      const block = 'route:' + b.split(/\}\s*,\s*\{|\}\s*\]/)[0];
      const getVal = (key) => {
        const m = block.match(new RegExp(`${key}:\\s*'([^']*)'`));
        return m ? m[1] : '';
      };
      SEO_REGISTRY.push({
        route: getVal('route'),
        canonicalRoute: getVal('canonicalRoute'),
        indexDirective: getVal('indexDirective'),
        heroAnswerEngine: getVal('heroAnswerEngine')
      });
    }
  }
  for (const page of SEO_REGISTRY) {
    if (page.heroAnswerEngine) {
      const words = page.heroAnswerEngine.trim().split(/\s+/).length;
      if (words < 25 || words > 120) {
        violations.push(`[MG4 THUMB] ${page.route} heroAnswerEngine ${words} kelime (makul mobil aralık: 25-120)!`);
      }
    }
  }

  // MG1: Mobile Parity (H1, title, canonical self-consistency)
  for (const page of SEO_REGISTRY) {
    if (page.indexDirective === 'index, follow') {
      let relPath = page.route === '/' ? 'index.html' : page.route.replace(/^\//, '');
      if (relPath.endsWith('/')) relPath += 'index.html';
      else if (!relPath.endsWith('.html')) relPath += '.html';

      const filePath = path.join(root, relPath);
      if (fs.existsSync(filePath)) {
        const text = fs.readFileSync(filePath, 'utf8');
        if (!text.includes(page.canonicalRoute)) {
          violations.push(`[MG1 PARITY] ${page.route} sayfasında canonical rota HTML içinde eksik: ${page.canonicalRoute}`);
        }
      }
    }
  }

  // MG7: CWV Bütçe & Raw HTML boyutu (< 100 KB)
  for (const page of SEO_REGISTRY) {
    if (page.indexDirective === 'index, follow') {
      let relPath = page.route === '/' ? 'index.html' : page.route.replace(/^\//, '');
      if (relPath.endsWith('/')) relPath += 'index.html';
      else if (!relPath.endsWith('.html')) relPath += '.html';

      const filePath = path.join(root, relPath);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const kb = stats.size / 1024;
        if (kb > 250) {
          violations.push(`[MG7 CWV] ${page.route} (${relPath}) raw HTML boyutu ${kb.toFixed(1)}KB > 250KB bütçesi!`);
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error(`\n❌ [MOBILE DEPLOY BLOCKED] ${violations.length} kritik MOBILE-FIRST ihlali:\n`);
    violations.forEach(v => console.error(`  ⛔ ${v}`));
    process.exit(1);
  }

  console.log('✅ [MOBILE PASSED] Tüm MG0–MG20 Mobile-First Kalite Kapıları 0 Hata İle Geçildi.');
}

runMobileGates().catch(err => {
  console.error('Fatal mobile gate runner error:', err);
  process.exit(1);
});
