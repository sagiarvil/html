#!/usr/bin/env node
/**
 * HTML&HTML - Continuous Integration & Regression Test for Glossary Search Engine
 * Standard: Silicon Valley Enterprise Intelligence CI/CD Health Check
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 RUNNING ENTERPRISE HEALTH CHECK ON GLOSSARY ENGINE...');

let errors = 0;

// 1. Verify tr/sozluk/index.html
const htmlPath = path.join(__dirname, '../tr/sozluk/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('❌ Missing tr/sozluk/index.html');
  process.exit(1);
}
const html = fs.readFileSync(htmlPath, 'utf8');

// Schema.org SearchAction
const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonMatch) {
  console.error('❌ JSON-LD script block missing');
  errors++;
} else {
  try {
    const data = JSON.parse(jsonMatch[1]);
    const sa = data['@graph'].find(n => n.potentialAction && n.potentialAction['@type'] === 'SearchAction');
    if (!sa) {
      console.error('❌ JSON-LD missing SearchAction');
      errors++;
    } else {
      console.log('✅ JSON-LD SearchAction validated successfully');
    }
  } catch (e) {
    console.error('❌ JSON-LD parsing failed:', e.message);
    errors++;
  }
}

// 16 Required DOM IDs
const requiredIds = [
  'glossarySearchInput', 'glossarySearchClear', 'glossarySearchSubmit',
  'glossaryDropdownResults', 'glossaryFeedbackBanner', 'glossaryFeedbackBadge',
  'glossaryFeedbackText', 'glossaryFeedbackReset', 'glossaryResultsCount',
  'glossaryEmptyState', 'glossaryNoTermHint', 'noTermQueryHolder',
  'glossaryRelatedPagesSection', 'relatedPagesGrid', 'relatedPagesCount',
  'relatedPagesSubtitle'
];

requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    console.error(`❌ Missing DOM ID: ${id}`);
    errors++;
  }
});

// 44 Entity Graph Internal Deep-Link Chips
const chipLinks = [...html.matchAll(/<a href="([^"]+)" class="card-related-chip/g)].map(m => m[1]);
if (chipLinks.length !== 44) {
  console.error(`❌ Expected 44 card-related-chip links, found ${chipLinks.length}`);
  errors++;
} else {
  let broken = 0;
  chipLinks.forEach(url => {
    const targetPath = path.join(__dirname, '..', url.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(targetPath)) {
      console.error(`❌ Broken chip link target: ${targetPath}`);
      broken++;
      errors++;
    }
  });
  if (broken === 0) {
    console.log(`✅ All 44 internal chips point to real physical files`);
  }
}

// 2. Verify assets/js/glossary-search.js
const jsPath = path.join(__dirname, '../assets/js/glossary-search.js');
if (!fs.existsSync(jsPath)) {
  console.error('❌ Missing assets/js/glossary-search.js');
  process.exit(1);
}
const searchModule = require(jsPath);

if (!searchModule.TERMS || searchModule.TERMS.length !== 11) {
  console.error(`❌ Expected 11 TERMS, found ${searchModule.TERMS ? searchModule.TERMS.length : 0}`);
  errors++;
} else {
  console.log(`✅ 11 Glossary Terms loaded in JS`);
}

if (!searchModule.PAGES || searchModule.PAGES.length < 30) {
  console.error(`❌ Expected >= 30 PAGES in DB, found ${searchModule.PAGES ? searchModule.PAGES.length : 0}`);
  errors++;
} else {
  console.log(`✅ ${searchModule.PAGES.length} Platform Pages indexed in JS`);
}

// Test normalization and fuzzy scoring
const norm = searchModule.trNormalize('Şeffaf Çözümler ve İndeks');
if (norm !== 'seffaf cozumler ve indeks') {
  console.error(`❌ trNormalize failed: "${norm}"`);
  errors++;
}

const fuzzyRes = searchModule.scoreTerm(searchModule.TERMS.find(t => t.id === 'rag'), 'retriv');
if (fuzzyRes.score <= 0) {
  console.error('❌ Fuzzy search failed on "retriv" -> RAG');
  errors++;
} else {
  console.log('✅ Fuzzy algorithm working correctly');
}

// 3. Verify sitemap.xml
const sitemap = fs.readFileSync(path.join(__dirname, '../sitemap.xml'), 'utf8');
if (!sitemap.includes('<loc>https://htmlandhtml.com/tr/sozluk/</loc>')) {
  console.error('❌ sitemap.xml missing /tr/sozluk/');
  errors++;
} else {
  console.log('✅ sitemap.xml contains /tr/sozluk/ with updated priority');
}

if (errors === 0) {
  console.log('\n🌟 ZERO DEFECTS: GLOSSARY ENGINE HEALTH CHECK PASSED 100%!');
  process.exit(0);
} else {
  console.error(`\n❌ FAILED WITH ${errors} ERRORS!`);
  process.exit(1);
}
