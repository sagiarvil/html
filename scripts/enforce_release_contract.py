#!/usr/bin/env python3
"""Final fail-closed customer-release contract.

Runs after all content/materialization scripts so the deploy artifact cannot regress to
legacy pricing, novice "reçete" language, stale delivery filenames, or ambiguous paid
product naming.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

PUBLIC_HTML = [p for p in ROOT.rglob('*.html') if 'node_modules' not in p.parts and '.git' not in p.parts]
PUBLIC_EXTRA = [ROOT / 'assets/js/enterprise-runtime.js']
RELEASE_CSS = '<link rel="stylesheet" href="/assets/css/release-contract.css?v=1">'

PRODUCT_REPLACEMENTS = [
    ('AI Görünürlük Uygulama Planı', 'AI Görünürlük Yol Haritası'),
    ('AI Görünürlük Uygulama Reçetesi', 'AI Görünürlük Yol Haritası'),
    ('AI Visibility Implementation Blueprint', 'AI Search Visibility Roadmap'),
]

RECIPE_PATTERNS = [
    (r'\$99\s+Reçeteyi\s+Aç', '$99 Yol Haritasını Aç'),
    (r'Reçeteyi\s+Aç', 'Yol Haritasını Aç'),
    (r'Düzeltme\s+reçetesi', 'Düzeltme yol haritası'),
    (r'Uygulama\s+reçetesi', 'Uygulama yol haritası'),
    (r'reçeteyi', 'yol haritasını'),
    (r'reçetesini', 'yol haritasını'),
    (r'reçetesi', 'yol haritası'),
    (r'reçete', 'yol haritası'),
]

ZIP_NAMES = [
    ('READ_ME.md', '00_READ_ME.md'),
    ('EXECUTIVE_SUMMARY.md', '01_EXECUTIVE_SUMMARY.md'),
    ('IMPLEMENTATION_BLUEPRINT.md', '02_IMPLEMENTATION_BLUEPRINT.md'),
    ('FINDINGS.json', '03_FINDINGS.json'),
    ('ACCEPTANCE_TESTS.md', '04_ACCEPTANCE_TESTS.md'),
    ('ROLLBACK_PLAN.md', '05_ROLLBACK_PLAN.md'),
    ('AI_READINESS.json', '06_AI_READINESS.json'),
    ('IMPLEMENTATION_CHECKLIST.txt', '07_IMPLEMENTATION_CHECKLIST.txt'),
]


def normalize_public_text(text: str) -> str:
    text = text.replace('$149', '$99').replace('149 USD', '99 USD')
    for old, new in PRODUCT_REPLACEMENTS:
        text = text.replace(old, new)
    for pattern, replacement in RECIPE_PATTERNS:
        text = re.sub(pattern, replacement, text, flags=re.I)
    return text


def write_if_changed(path: Path, text: str) -> None:
    old = path.read_text(encoding='utf-8')
    if old != text:
        path.write_text(text, encoding='utf-8')


def inject_before_main_end(text: str, block: str) -> str:
    if '</main>' in text:
        return text.replace('</main>', block + '</main>', 1)
    return text + block


def attach_release_css(text: str) -> str:
    if 'release-contract.css?v=1' in text:
        return text
    if '</head>' in text:
        return text.replace('</head>', RELEASE_CSS + '</head>', 1)
    return text


for path in PUBLIC_HTML + [p for p in PUBLIC_EXTRA if p.exists()]:
    write_if_changed(path, normalize_public_text(path.read_text(encoding='utf-8')))

# Pricing must preview the exact filenames the server actually generates.
for rel in ('tr/fiyatlandirma/index.html', 'en/pricing/index.html'):
    path = ROOT / rel
    text = attach_release_css(path.read_text(encoding='utf-8'))
    for raw, canonical in ZIP_NAMES:
        prefix = canonical.split('_', 1)[0] + '_'
        text = re.sub(rf'(?<!{re.escape(prefix)}){re.escape(raw)}', canonical, text)
    write_if_changed(path, text)

# Make the free/paid decision boundary unmistakable without exposing remediation in free results.
tr_pricing = ROOT / 'tr/fiyatlandirma/index.html'
tr_text = attach_release_css(tr_pricing.read_text(encoding='utf-8'))
tr_line = '<p class="release-contract-line"><strong>Ücretsiz teşhis:</strong> Ne yanlış? Nerede? Ne kadar önemli? <strong>$99 AI Görünürlük Yol Haritası:</strong> Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</p>'
if 'Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?' not in tr_text:
    tr_text = re.sub(r'(</h1>)', r'\1' + tr_line, tr_text, count=1, flags=re.I)
tr_manifest = '''<section class="pricing-delivery-manifest" aria-labelledby="delivery-manifest-tr"><div class="section-head"><span>TESLİM PAKETİ</span><h2 id="delivery-manifest-tr">Ödeme sonrası oluşturulan mühendislik ZIP’i</h2><p>Dosya adları temsili değil; sunucunun ürettiği kanonik teslim sözleşmesidir.</p></div><div class="delivery-file-grid"><code>00_READ_ME.md</code><code>01_EXECUTIVE_SUMMARY.md</code><code>02_IMPLEMENTATION_BLUEPRINT.md</code><code>03_FINDINGS.json</code><code>04_ACCEPTANCE_TESTS.md</code><code>05_ROLLBACK_PLAN.md</code><code>06_AI_READINESS.json</code><code>07_IMPLEMENTATION_CHECKLIST.txt</code></div></section>'''
if not all(canonical in tr_text for _, canonical in ZIP_NAMES):
    tr_text = inject_before_main_end(tr_text, tr_manifest)
write_if_changed(tr_pricing, tr_text)

en_pricing = ROOT / 'en/pricing/index.html'
en_text = attach_release_css(en_pricing.read_text(encoding='utf-8'))
en_line = '<p class="release-contract-line"><strong>Free diagnosis:</strong> What is wrong? Where? How important? <strong>$99 AI Search Visibility Roadmap:</strong> How should it be fixed? In what order? How will it be verified?</p>'
if 'How should it be fixed? In what order? How will it be verified?' not in en_text:
    en_text = re.sub(r'(</h1>)', r'\1' + en_line, en_text, count=1, flags=re.I)
en_manifest = '''<section class="pricing-delivery-manifest" aria-labelledby="delivery-manifest-en"><div class="section-head"><span>DELIVERY PACKAGE</span><h2 id="delivery-manifest-en">Engineering ZIP generated after verified payment</h2><p>These are not illustrative labels; they are the canonical server-generated delivery contract.</p></div><div class="delivery-file-grid"><code>00_READ_ME.md</code><code>01_EXECUTIVE_SUMMARY.md</code><code>02_IMPLEMENTATION_BLUEPRINT.md</code><code>03_FINDINGS.json</code><code>04_ACCEPTANCE_TESTS.md</code><code>05_ROLLBACK_PLAN.md</code><code>06_AI_READINESS.json</code><code>07_IMPLEMENTATION_CHECKLIST.txt</code></div></section>'''
if not all(canonical in en_text for _, canonical in ZIP_NAMES):
    en_text = inject_before_main_end(en_text, en_manifest)
write_if_changed(en_pricing, en_text)

# Customer-facing contract must be clean after every build, not merely after hand-edits.
funnel_paths = [
    ROOT / 'index.html', ROOT / 'tr/index.html', ROOT / 'en/index.html',
    tr_pricing, en_pricing, ROOT / 'checkout.html', ROOT / 'assets/js/enterprise-runtime.js',
]
errors = []
for path in funnel_paths:
    if not path.exists():
        errors.append(f'missing funnel surface: {path.relative_to(ROOT)}')
        continue
    text = path.read_text(encoding='utf-8')
    if '$149' in text:
        errors.append(f'legacy $149 leaked: {path.relative_to(ROOT)}')
    if re.search(r'reçete', text, re.I):
        errors.append(f'novice prescription wording leaked: {path.relative_to(ROOT)}')

for required in ZIP_NAMES:
    if required[1] not in tr_pricing.read_text(encoding='utf-8') or required[1] not in en_pricing.read_text(encoding='utf-8'):
        errors.append(f'pricing ZIP preview missing canonical filename: {required[1]}')

if 'AI Görünürlük Yol Haritası' not in tr_pricing.read_text(encoding='utf-8'):
    errors.append('TR pricing missing customer-facing AI Görünürlük Yol Haritası product name')
if 'AI Search Visibility Roadmap' not in en_pricing.read_text(encoding='utf-8'):
    errors.append('EN pricing missing customer-facing AI Search Visibility Roadmap product name')

if errors:
    raise SystemExit('RELEASE CONTRACT FAIL\n- ' + '\n- '.join(errors))
print('RELEASE CONTRACT PASS: $99, Roadmap naming, no prescription leakage, canonical ZIP preview and free/paid boundary locked.')
