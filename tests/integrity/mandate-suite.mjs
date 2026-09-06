import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

// 1. All Required Canonical Routes
const requiredRoutes = [
  // Hubs
  'en/index.html',
  'tr/index.html',
  'en/tools/index.html',
  'tr/araclar/index.html',
  'en/platform/index.html',
  'tr/platform/index.html',
  'en/guides/index.html',
  'tr/rehberler/index.html',
  'en/pricing/index.html',
  'tr/fiyatlandirma/index.html',
  'en/fix-mandate/index.html',
  'tr/fix-mandate/index.html',

  // 10 Tools (EN & TR)
  'en/website-scanner/index.html',
  'tr/site-tarama/index.html',
  'en/ai-website-readiness/index.html',
  'tr/ai-website-readiness/index.html',
  'en/llms-txt-validator/index.html',
  'tr/llms-txt-validator/index.html',
  'en/ai-crawler-checker/index.html',
  'tr/ai-crawler-checker/index.html',
  'en/schema-validator/index.html',
  'tr/schema-validator/index.html',
  'en/technical-seo-checker/index.html',
  'tr/teknik-seo-kontrol/index.html',
  'en/security-headers-checker/index.html',
  'tr/guvenlik-basliklari-kontrol/index.html',
  'en/accessibility-checker/index.html',
  'tr/erisilebilirlik-kontrol/index.html',
  'en/link-integrity-checker/index.html',
  'tr/link-kontrol/index.html',
  'en/ai-mention-tracker/index.html',
  'tr/ai-mention-tracker/index.html',

  // 5 Guides (EN & TR)
  'en/guides/ai-website-readiness-checklist/index.html',
  'tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/index.html',
  'en/guides/llms-txt/index.html',
  'tr/rehberler/llms-txt/index.html',
  'en/guides/ai-crawler-access/index.html',
  'tr/rehberler/ai-tarayici-erisimi/index.html',
  'en/guides/structured-data-for-ai/index.html',
  'tr/rehberler/ai-icin-yapisal-veri/index.html',
  'en/guides/ai-search-visibility/index.html',
  'tr/rehberler/ai-arama-gorunurlugu/index.html',

  // Authority
  'en/methodology/index.html',
  'tr/methodology/index.html',
  'en/evidence-standard/index.html',
  'tr/kanit-standardi/index.html',
  'en/reference/ai-crawlers/index.html',
  'tr/referans/ai-tarayicilar/index.html',

  // Trust & Legal
  'en/about/index.html',
  'tr/hakkimizda/index.html',
  'en/contact/index.html',
  'tr/iletisim/index.html',
  'en/privacy/index.html',
  'tr/gizlilik/index.html',
  'en/terms/index.html',
  'tr/kullanim-kosullari/index.html'
];

for (const rel of requiredRoutes) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    errors.push(`Missing canonical route: ${rel}`);
  }
}

// 2. Scan every HTML file for invariants
const titles = new Map();
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const llms = fs.readFileSync(path.join(root, 'llms.txt'), 'utf8');

const englishUiInTr = [
  'Skip to content', 'Scan a domain', 'Scan a full URL', 'Scan Free',
  'Launch Tool', 'Read Guide', 'View Checklist', 'All Guides',
  'Inspect Module', 'Transparent Pricing', 'Tools Directory',
  '>Validator<', '>Checker<', '>Tracker<', '>AI Readiness<',
  '>Neutral prompt guard<', '>Brand mention<', '>Domain citation<',
  'Evidence is free. Implementation precision is the product.'
];

const turkishUiInEn = [
  'İçeriğe geç', 'Alan adı tara', 'Tam URL tara', 'Ücretsiz Tara',
  'Aracı Aç', 'Rehberi Oku', 'Listeyi İncele', 'Tüm Rehberler',
  'Modülü İncele', 'Şeffaf Fiyatlandırma', 'Araçlar Dizini',
  'Metodoloji', 'Fiyatlandırma', 'Hakkımızda', 'İletişim', 'Gizlilik'
];

const debugPatterns = [
  /\(feat:/i, /\(fix:/i, /\(chore:/i, /\(refactor:/i,
  /TODO:/i, /FIXME:/i, /console\.debug/i
];

for (const rel of requiredRoutes) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, 'utf8');

  // A. Primary H1 check: exactly one <h1>
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  if (h1Matches.length !== 1) {
    errors.push(`${rel}: expected exactly 1 <h1>, found ${h1Matches.length}`);
  }

  // B. Title uniqueness (within same language)
  const tm = content.match(/<title>([^<]+)<\/title>/i);
  if (!tm) {
    errors.push(`${rel}: missing <title> tag`);
  } else {
    const title = tm[1].trim();
    if (titles.has(title)) {
      errors.push(`${rel}: duplicate title with ${titles.get(title)} -> "${title}"`);
    } else {
      titles.set(title, rel);
    }
  }

  // C. Self-canonical & Hreflang
  if (!content.includes('rel="canonical"')) {
    errors.push(`${rel}: missing rel="canonical"`);
  }
  if (!content.includes('hreflang="en"') || !content.includes('hreflang="tr"')) {
    errors.push(`${rel}: missing bidirectional hreflang tags`);
  }

  // D. Language Purity
  const isTr = rel.startsWith('tr/');
  const isEn = rel.startsWith('en/');
  if (isTr) {
    for (const phrase of englishUiInTr) {
      if (content.includes(phrase)) {
        errors.push(`${rel}: English UI leak detected -> "${phrase}"`);
      }
    }
  } else if (isEn) {
    for (const phrase of turkishUiInEn) {
      // Exclude hreflang link alternate targets or footer TR links
      const stripped = content.replace(/hreflang="tr" href="[^"]+"/g, '')
                              .replace(/<div class="langs">[\s\S]*?<\/div>/g, '')
                              .replace(/<link [^>]+>/g, '');
      if (stripped.includes(`>${phrase}<`) || stripped.includes(`"${phrase}"`)) {
        errors.push(`${rel}: Turkish UI leak detected -> "${phrase}"`);
      }
    }
  }

  // E. No debug leakage
  for (const dp of debugPatterns) {
    if (dp.test(content)) {
      errors.push(`${rel}: debug/commit string leaked into HTML -> ${dp}`);
    }
  }

  // F. Sitemap presence
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)">/i);
  if (canonicalMatch) {
    const canonicalUrl = canonicalMatch[1];
    if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
      errors.push(`${rel}: canonical URL ${canonicalUrl} not found in sitemap.xml`);
    }
  }

  // G. Breadcrumbs & JSON-LD
  if (!content.includes('application/ld+json')) {
    errors.push(`${rel}: missing structured data JSON-LD`);
  }
}

// 3. Check internal links across all generated HTML files
const localAttr = /(?:href|src)=["']([^"']+)["']/gi;
for (const rel of requiredRoutes) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, 'utf8');
  let m;
  while ((m = localAttr.exec(text))) {
    let t = m[1];
    if (!t || t.startsWith('#') || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(t)) continue;
    t = t.split('#')[0].split('?')[0];
    if (!t) continue;
    
    let resolved;
    if (t === '/') {
      resolved = path.join(root, 'index.html');
    } else if (t.startsWith('/')) {
      resolved = path.join(root, t.slice(1));
    } else {
      resolved = path.resolve(path.dirname(full), t);
    }

    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      resolved = path.join(resolved, 'index.html');
    } else if (!fs.existsSync(resolved) && !path.extname(resolved) && fs.existsSync(resolved + '.html')) {
      resolved += '.html';
    } else if (!fs.existsSync(resolved) && !path.extname(resolved) && fs.existsSync(path.join(resolved, 'index.html'))) {
      resolved = path.join(resolved, 'index.html');
    }

    if (!fs.existsSync(resolved)) {
      errors.push(`${rel}: broken local link -> ${m[1]}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`MANDATE SUITE INTEGRITY FAIL (${errors.length} errors):`);
  for (const e of errors.slice(0, 30)) console.error(` - ${e}`);
  if (errors.length > 30) console.error(` ... and ${errors.length - 30} more.`);
  process.exit(1);
}

console.log(`MANDATE SUITE INTEGRITY PASS: All ${requiredRoutes.length} canonical routes, language purity, single H1, title uniqueness, sitemap, and internal link graph verified.`);
