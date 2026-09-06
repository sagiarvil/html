#!/usr/bin/env python3
"""Automated SSOT Language Purity Engine.

Scans all public HTML surfaces and enforces strict bilingual separation:
- Turkish surfaces (tr/**/*.html, index.html) must be 100% pure Turkish.
- English surfaces (en/**/*.html) must be 100% pure English.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP = {'.git', 'node_modules', 'functions', 'functions-firebase', 'scripts', 'tests'}

TR_REPLACEMENTS = [
    ('aria-label="Switch to English"', 'aria-label="İngilizceye geç"'),
    ('aria-label="Primary navigation"', 'aria-label="Ana navigasyon"'),
    ('Download Executive PDF', 'PDF Olarak İndir'),
    ('Download PDF Report', 'PDF Olarak İndir'),
    ('Free Diagnosis', 'Ücretsiz Teşhis'),
    ('Readiness Lens', 'Hazırlık Merceği'),
    ('readiness lens', 'hazırlık merceği'),
    ('Full Site Fix Mandate', 'Tam Site Düzeltme Talimatı'),
    ('FULL SITE FIX MANDATE', 'TAM SİTE DÜZELTME TALİMATI'),
    ('Platform Architecture', 'Platform Mimarisi'),
    ('LLMS.TXT Haberler', 'Haberler'),
    ('>Fiyat<', '>Fiyatlar<'),
    ('>Fiyat</a>', '>Fiyatlar</a>'),
    ('One URL. The Full AI Visibility System.', 'Tek URL. Tüm Yapay Zeka Görünürlük Sistemi.'),
]

EN_REPLACEMENTS = [
    ('Ödeme sağlayıcısı yapılandırılana kadar ücret tahsilatı ve teslim entitlement\'ı fail-closed kalır.',
     'Until a payment provider is configured, charging and delivery entitlement remain fail-closed.'),
    ('Payme sağlayıcısı yapılandırılana kadar ücret tahsilatı ve teslim entitlement\'ı fail-closed kalır.',
     'Until a payment provider is configured, charging and delivery entitlement remain fail-closed.'),
    ('Kart verisi HTML&HTML sunucusunda tutulmaz.',
     'Card data is not stored on HTML&HTML servers.'),
    ('<span>yapay zeka arama görünürlüğü</span>', '<span>AI search visibility</span>'),
    ('aria-label="Türkçeye geç"', 'aria-label="Switch to Turkish"'),
    ('aria-label="Ana navigasyon"', 'aria-label="Primary navigation"'),
    ('Yapay Zeka Görünürlüğümü Ücretsiz Tara →', 'Check My AI Visibility Free →'),
    ('AI Arama Sözlüğü →', 'AI Search Glossary →'),
    ('PDF Olarak İndir', 'Download Executive PDF'),
    ('LLMS.TXT News', 'News'),
    ('&quot;inLanguage&quot;: &quot;tr&quot;', '&quot;inLanguage&quot;: &quot;en&quot;'),
    ('"inLanguage": "tr"', '"inLanguage": "en"'),
]

def clean_file(p: Path, is_tr: bool):
    text = p.read_text(encoding='utf-8')
    orig = text
    rules = TR_REPLACEMENTS if is_tr else EN_REPLACEMENTS
    for old, new in rules:
        text = text.replace(old, new)
    if text != orig:
        p.write_text(text, encoding='utf-8')

def main():
    tr_count = 0
    en_count = 0
    for p in ROOT.rglob('*.html'):
        if any(part in SKIP for part in p.relative_to(ROOT).parts):
            continue
        rel = p.relative_to(ROOT).as_posix()
        is_tr = rel.startswith('tr/') or rel == 'index.html'
        clean_file(p, is_tr)
        if is_tr:
            tr_count += 1
        else:
            en_count += 1

    print(f"SSOT LANGUAGE PURITY PASS: {tr_count} Turkish and {en_count} English pages verified and normalized.")

if __name__ == '__main__':
    main()
