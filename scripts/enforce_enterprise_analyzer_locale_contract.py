#!/usr/bin/env python3
"""Fail-closed URL-native locale materializer for Enterprise Analyzer."""
from __future__ import annotations

from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
EA = ROOT / "enterprise-analyzer"
TR_EA = ROOT / "tr" / "enterprise-analyzer"
RUNTIME_SRC = "/assets/js/enterprise-analyzer-locale.js?v=1"

PAGES = (
    ("index.html", "/enterprise-analyzer", "/tr/enterprise-analyzer"),
    ("htmlandhtml-ai-report.html", "/enterprise-analyzer/htmlandhtml-ai-report", "/tr/enterprise-analyzer/htmlandhtml-ai-report"),
    ("htmlandhtml-ai-report-LIGHT.html", "/enterprise-analyzer/htmlandhtml-ai-report-LIGHT", "/tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT"),
)

META = {
    "index.html": {
        "en": ("Enterprise AI Visibility Diagnostic Lab | HTML&HTML", "Enterprise AI visibility diagnostic lab with deterministic controls, public-page crawl evidence, live link probes, prioritized findings and a testable $99 implementation roadmap."),
        "tr": ("Kurumsal Yapay Zeka Görünürlük Teşhis Laboratuvarı | HTML&HTML", "Deterministik kontroller, herkese açık sayfa taraması, canlı bağlantı probları, önceliklendirilmiş bulgular ve test edilebilir $99 uygulama yol haritasıyla kurumsal yapay zeka görünürlük teşhisi."),
    },
    "htmlandhtml-ai-report.html": {
        "en": ("Live Sample AI Visibility Report | HTML&HTML Enterprise Analyzer", "Live HTML&HTML sample report showing the same Enterprise Analyzer scores, evidence, findings and remediation structure in a fully English production surface."),
        "tr": ("Canlı Örnek Yapay Zeka Görünürlük Raporu | HTML&HTML Enterprise Analyzer", "HTML&HTML Enterprise Analyzer skorlarını, kanıtlarını, bulgularını ve onarım yapısını tamamen Türkçe üretim yüzeyinde gösteren canlı örnek rapor."),
    },
    "htmlandhtml-ai-report-LIGHT.html": {
        "en": ("Live Sample AI Visibility Report — Light | HTML&HTML", "Light-theme live sample Enterprise Analyzer report with the same English scores, evidence, findings and remediation structure."),
        "tr": ("Canlı Örnek Yapay Zeka Görünürlük Raporu — Açık Tema | HTML&HTML", "Aynı skorları, kanıtları, bulguları ve onarım yapısını tamamen Türkçe gösteren açık temalı canlı Enterprise Analyzer örnek raporu."),
    },
}

# Exact visible copy pairs shared by the hub and report. Longer pairs are applied first.
PAIRS = [
    ("105 deterministik kontrol, 50'ye kadar herkese açık HTML sayfası ve 30 canlı link probu ile üretilen deterministik denetim ortamı. Kod seviyesinde teknik kanıtlar, kilitli onarım yol haritasıleri ve n8n CI/CD otomasyon paketleriyle donatılmış kurumsal analiz platformu.", "A deterministic audit environment using 105 controls, up to 50 public HTML pages and 30 live link probes. It combines code-level evidence, locked remediation roadmaps and n8n CI/CD automation artifacts in one enterprise analysis surface."),
    ("Biz sadece analiz eder ve yol haritası hazırlarız. Müşterinin kaynak koduna dokunmayız. Tespit ve çözüm yol haritasılerini kendi yazılım ekibinize teslim edersiniz.", "We analyze the evidence and prepare the remediation roadmap. We do not modify the customer's source code; findings and implementation guidance are delivered to the customer's engineering team."),
    ("Tespitler ve Çözüm yol haritasıleri", "Findings and Remediation Roadmaps"),
    ("MÜHENDİSLİK TESLİM PAKETİ (ZIP ENVANTERİ)", "ENGINEERING DELIVERY PACKAGE (ZIP INVENTORY)"),
    ("Bir PDF değil. sürümlenmiş üretim sınıfı Engine V3 mühendislik ZIP'i.", "Not a PDF: a versioned, production-grade Engine V3 engineering ZIP."),
    ("Ödeme entitlement'ı doğrulandığında sistem aynı alan adını yeniden tarar ve $99 Yol Haritası uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token'ı ile anında teslim edilir.", "After entitlement is verified, the system rescans the same domain and automatically generates the $99 Roadmap implementation package as a ZIP. No membership is required; delivery uses a secure guest-checkout token."),
    ("Firma ve yazılımcı için kullanım kılavuzu ve P0–P3 öncelik uygulama rehberi.", "Usage guide and P0–P3 implementation priorities for the customer and engineering team."),
    ("Ücretsiz Kontrol", "Free Check"), ("Çözümler", "Solutions"), ("Haberler", "News"), ("Sözlük", "Glossary"),
    ("Onarım Seti ($99)", "Fix Mandate ($99)"), ("Ücretsiz Tara", "Scan Free"), ("Ana Sayfa", "Home"), ("Site Tarama", "Website Scanner"),
    ("Tema", "Theme"), ("Temayı Değiştir", "Change Theme"), ("Temayı değiştir", "Change theme"),
    ("Örnek Rapor (htmlandhtml.com) →", "Sample Report (htmlandhtml.com) →"), ("Örnek Rapor (Sample Report)", "Sample Report"),
    ("ÖRNEK RAPOR · SAMPLE SPECIMEN", "SAMPLE REPORT · SPECIMEN"),
    ("CANLI KURUMSAL ÖRNEK RAPOR · ENTERPRISE SAMPLE SPECIMEN", "LIVE ENTERPRISE SAMPLE REPORT · AI DIAGNOSTIC SPECIMEN"),
    ("CANLI KURUMSAL DENETİM LABORATUVARI · ENTERPRISE AI DIAGNOSTIC SUITE", "LIVE ENTERPRISE AI DIAGNOSTIC LAB"),
    ("Kurumsal AI Görünürlük Analizörü &amp; Teşhis Laboratuvarı", "Enterprise AI Visibility Analyzer &amp; Diagnostic Lab"),
    ("Canlı Enterprise Taramayı Başlat", "Start Live Enterprise Scan"),
    ("18-Motorlu Dağıtık Telemetri ve N8N DAG Orkestrasyonu Çalışıyor...", "18-engine distributed telemetry and n8n DAG orchestration running..."),
    ("105 deterministik kontrol", "105 deterministic controls"), ("50'ye kadar sayfa", "Up to 50 pages"), ("30 link probu", "30 link probes"),
    ("Hedef:", "Target:"), ("Genel AI Visibility Skoru", "Overall AI Visibility Score"), ("GENEL AI VİSİBİLİTY SKORU", "OVERALL AI VISIBILITY SCORE"),
    ("Tamamlandı", "Completed"), ("Dikkat Gerekiyor", "Attention Required"), ("Kritik Risk Tespit Edildi", "Critical Risk Detected"),
    ("Dört Temel Yetkinlik Sütunu", "Four Core Capability Pillars"), ("Deterministik Skor Dağılımı", "Deterministic Score Distribution"),
    ("Keşif (Crawl &amp; Index)", "Discovery (Crawl &amp; Index)"), ("Anlaşılabilirlik (Schema/LLM)", "Understandability (Schema/LLM)"),
    ("Güven &amp; Kalite (HSTS/E-E-A-T)", "Trust &amp; Quality (HSTS/E-E-A-T)"), ("Ticari Yol (Action &amp; CTA)", "Commercial Path (Action &amp; CTA)"),
    ("HTML Boyutu:", "HTML Size:"), ("319 KB (Kritik)", "319 KB (Critical)"), ("Eksik (RFC 6596)", "Missing (RFC 6596)"), ("1 Güvensiz Kaynak", "1 Insecure Source"),
    ("Ağırlık:", "Weight:"), ("Aktif Bulgular", "Active Findings"), ("Tüm Bulgular", "All Findings"),
    ("Tümü", "All"), ("Yüksek", "High"), ("Orta", "Medium"), ("Düşük", "Low"), ("Bilgi", "Info"), ("Kritik", "Critical"),
    ("Bulgu", "Finding"), ("Bulgular", "Findings"), ("Kanıt", "Evidence"), ("Kök Neden", "Root Cause"), ("Öncelik", "Priority"),
    ("Etki", "Impact"), ("Efor", "Effort"), ("Onarım Yol Haritası", "Remediation Roadmap"), ("Kabul Testi", "Acceptance Test"),
    ("Regresyon Testi", "Regression Test"), ("Geri Alma", "Rollback"), ("Örnek Paketi İndir (ZIP)", "Download Sample Package (ZIP)"),
    ("Sitemi Ücretsiz Kontrol Et →", "Check My Site Free →"), ("Onarım Paketini İncele ($99)", "Review $99 Fix Mandate"),
    ("100% Otomatik Yazılım ve Dijital Ürünler (SaaS):", "100% Automated Software & Digital Artifacts (SaaS):"),
]

TR_FORCE = [
    ("SAMPLE REPORT · SPECIMEN SPECIFICATION", "ÖRNEK RAPOR · TEKNİK NUMUNE"),
    ("SAMPLE REPORT · SPECIMEN", "ÖRNEK RAPOR · NUMUNE"),
    ("LIVE ENTERPRISE SAMPLE REPORT · AI DIAGNOSTIC SPECIMEN", "CANLI KURUMSAL ÖRNEK RAPOR · YAPAY ZEKA TEŞHİS NUMUNESİ"),
    ("Enterprise AI Visibility Diagnostic &amp; Remediation Report (Sample Specimen)", "Kurumsal Yapay Zeka Görünürlük Teşhis ve Onarım Raporu (Canlı Numune)"),
    ("Enterprise AI Visibility Analyzer &amp; Diagnostic Lab", "Kurumsal Yapay Zeka Görünürlük Analizörü ve Teşhis Laboratuvarı"),
    ("LIVE ENTERPRISE AI DIAGNOSTIC LAB", "CANLI KURUMSAL YAPAY ZEKA TEŞHİS LABORATUVARI"),
    ("Sample Report", "Örnek Rapor"),
]

SCRIPT_STYLE_RE = re.compile(r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)", re.I | re.S)
TAG_RE = re.compile(r"<[^>]+>", re.S)
TR_CHAR_RE = re.compile(r"[ğüşöçıİĞÜŞÖÇ]")


def extract_dict(source: str) -> dict[str, dict[str, str]]:
    m = re.search(r"const dict\s*=\s*\{\s*tr\s*:\s*\{(.*?)\}\s*,\s*en\s*:\s*\{(.*?)\}\s*\};", source, re.S)
    if not m:
        return {"tr": {}, "en": {}}
    def parse(block: str) -> dict[str, str]:
        result = {}
        for item in re.finditer(r"([A-Za-z0-9_]+)\s*:\s*\"((?:\\.|[^\"\\])*)\"", block):
            try:
                result[item.group(1)] = json.loads('"' + item.group(2) + '"')
            except json.JSONDecodeError:
                result[item.group(1)] = item.group(2)
        return result
    return {"tr": parse(m.group(1)), "en": parse(m.group(2))}


def markup_only(source: str, transform) -> str:
    parts = SCRIPT_STYLE_RE.split(source)
    for i in range(0, len(parts), 2):
        parts[i] = transform(parts[i])
    return "".join(parts)


def localize_data_i18n(source: str, locale: str, dictionary: dict[str, dict[str, str]]) -> str:
    values = dictionary.get(locale, {})
    pattern = re.compile(r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-i18n=\"(?P<key>[A-Za-z0-9_-]+)\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)", re.S)
    def repl(m: re.Match[str]) -> str:
        value = values.get(m.group("key"))
        return m.group(0) if value is None else m.group(1) + html.escape(value, quote=False) + m.group(5)
    return pattern.sub(repl, source)


def localize_bilingual_attrs(source: str, locale: str) -> str:
    pattern = re.compile(r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-tr=\"[^\"]*\"[^>]*\bdata-en=\"[^\"]*\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)", re.S)
    def repl(m: re.Match[str]) -> str:
        attr = re.search(rf"data-{locale}=\"([^\"]*)\"", m.group("attrs"))
        return m.group(0) if not attr else m.group(1) + attr.group(1) + m.group(5)
    return pattern.sub(repl, source)


def apply_pairs(source: str, locale: str) -> str:
    def transform(markup: str) -> str:
        out = markup
        if locale == "en":
            for tr, en in sorted(PAIRS, key=lambda x: len(x[0]), reverse=True): out = out.replace(tr, en)
        else:
            for tr, en in sorted(PAIRS, key=lambda x: len(x[1]), reverse=True): out = out.replace(en, tr)
            for en, tr in TR_FORCE: out = out.replace(en, tr)
        return out
    return markup_only(source, transform)


def set_head(source: str, filename: str, locale: str, en_path: str, tr_path: str) -> str:
    title, desc = META[filename][locale]
    canonical_path = en_path if locale == "en" else tr_path
    canonical = "https://htmlandhtml.com" + canonical_path
    en_url, tr_url = "https://htmlandhtml.com" + en_path, "https://htmlandhtml.com" + tr_path
    source = re.sub(r'<html\s+lang="[^"]+"', f'<html lang="{locale}"', source, count=1)
    source = re.sub(r'<title>.*?</title>', f'<title>{html.escape(title)}</title>', source, count=1, flags=re.S)
    source = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', f'<meta name="description" content="{html.escape(desc, quote=True)}">', source, count=1)
    source = re.sub(r'<link\s+rel="canonical"\s+href="[^"]+"\s*/?>', f'<link rel="canonical" href="{canonical}">', source, count=1)
    source = re.sub(r'\s*<link\s+rel="alternate"\s+hreflang="(?:tr|en|x-default)"\s+href="[^"]+"\s*/?>', '', source)
    alts = f'\n  <link rel="alternate" hreflang="en" href="{en_url}">\n  <link rel="alternate" hreflang="tr" href="{tr_url}">\n  <link rel="alternate" hreflang="x-default" href="{en_url}">'
    return source.replace(f'<link rel="canonical" href="{canonical}">', f'<link rel="canonical" href="{canonical}">{alts}', 1)


def set_nav(source: str, locale: str) -> str:
    if locale == "en":
        nav = '<nav class="primary-nav" aria-label="Primary navigation">\n  <a href="/en/website-scanner">Free Check</a>\n  <a href="/en/ai-search-visibility">Solutions</a>\n  <a href="/en/llms-txt-news/">News</a>\n  <a href="/en/glossary">Glossary</a>\n  <a href="/en/pricing">Fix Mandate ($99)</a>\n</nav>'
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>', source, count=1, flags=re.S)
    else:
        nav = '<nav class="primary-nav" aria-label="Ana navigasyon">\n  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>\n  <a href="/tr/yapay-zeka-arama-gorunurlugu/">Çözümler</a>\n  <a href="/tr/llms-txt-haberler/">Haberler</a>\n  <a href="/tr/sozluk/">Sözlük</a>\n  <a href="/tr/fiyatlandirma/">Onarım Seti ($99)</a>\n</nav>'
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Kontrol</a>', source, count=1, flags=re.S)
    return re.sub(r'<nav class="primary-nav"[^>]*>.*?</nav>', nav, source, count=1, flags=re.S)


def patch_locale_state(source: str, locale: str) -> str:
    source = source.replace("let currentLang = 'tr';", "let currentLang = document.documentElement.lang === 'tr' ? 'tr' : 'en';")
    source = source.replace("document.getElementById('btnLangTr').addEventListener('click', () => setLang('tr'));", "document.getElementById('btnLangTr').addEventListener('click', () => window.location.assign('/tr' + window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '')));")
    source = source.replace("document.getElementById('btnLangEn').addEventListener('click', () => setLang('en'));", "document.getElementById('btnLangEn').addEventListener('click', () => window.location.assign(window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '') || '/'));")
    source = re.sub(r"const params = new URLSearchParams\(window\.location\.search\);\s*const qLang = params\.get\('lang'\) \|\| localStorage\.getItem\('ea-sample-lang'\);\s*if \(qLang === 'en'\) setLang\('en'\);", "setLang(document.documentElement.lang === 'tr' ? 'tr' : 'en');", source)
    if locale == 'en':
        source = source.replace('id="btnLangTr" type="button" class="lang-btn active"', 'id="btnLangTr" type="button" class="lang-btn"').replace('id="btnLangEn" type="button" class="lang-btn"', 'id="btnLangEn" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="tr" class="active"', 'button data-lang="tr"').replace('button data-lang="en">EN</button>', 'button data-lang="en" class="active">EN</button>')
    else:
        source = source.replace('id="btnLangEn" type="button" class="lang-btn active"', 'id="btnLangEn" type="button" class="lang-btn"').replace('id="btnLangTr" type="button" class="lang-btn"', 'id="btnLangTr" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="en" class="active">EN</button>', 'button data-lang="en">EN</button>').replace('button data-lang="tr">TR</button>', 'button data-lang="tr" class="active">TR</button>')
    return source


def inject_runtime(source: str, locale: str) -> str:
    source = re.sub(r'\s*<!-- EA_LOCALE_CONTRACT:[^>]*-->\s*', '\n', source)
    marker = f'<!-- EA_LOCALE_CONTRACT:{locale}:URL_SSOT -->'
    if RUNTIME_SRC not in source:
        return source.replace('</body>', f'  <script src="{RUNTIME_SRC}" defer></script>\n{marker}\n</body>', 1)
    return source.replace('</body>', marker + '\n</body>', 1)


def visible_segments(source: str) -> list[str]:
    cleaned = SCRIPT_STYLE_RE.sub(' ', source)
    cleaned = re.sub(r'<!--.*?-->', ' ', cleaned, flags=re.S)
    segments = []
    for raw in re.split(r'<[^>]+>', cleaned):
        text = re.sub(r'\s+', ' ', html.unescape(raw)).strip()
        if text: segments.append(text)
    return segments


def purity_leaks(source: str, locale: str) -> list[str]:
    segments = visible_segments(source)
    leaks = []
    if locale == 'en':
        forbidden_words = ('Ücretsiz', 'Çözümler', 'Haberler', 'Sözlük', 'Onarım', 'Hedef:', 'Ağırlık:', 'Tamamlandı', 'Yüksek', 'Orta', 'Düşük', 'Bilgi')
        for segment in segments:
            if TR_CHAR_RE.search(segment) or any(word in segment for word in forbidden_words): leaks.append(segment)
    else:
        forbidden = ('Free Check', 'Solutions', 'Glossary', 'Fix Mandate', 'Sample Report', 'Change Theme', 'Start Live Enterprise Scan', 'Attention Required', 'Critical Risk Detected', 'Target:', 'Weight:')
        for segment in segments:
            if any(word in segment for word in forbidden): leaks.append(segment)
    unique = []
    seen = set()
    for item in leaks:
        if item not in seen:
            seen.add(item); unique.append(item)
    return unique


def build_page(template: str, filename: str, locale: str, en_path: str, tr_path: str, dictionary) -> str:
    out = localize_data_i18n(template, locale, dictionary)
    out = localize_bilingual_attrs(out, locale)
    out = apply_pairs(out, locale)
    out = set_head(out, filename, locale, en_path, tr_path)
    out = set_nav(out, locale)
    out = patch_locale_state(out, locale)
    out = inject_runtime(out, locale)
    if f'<html lang="{locale}"' not in out: raise SystemExit(f'EA LOCALE CONTRACT FAIL: html lang mismatch {filename} {locale}')
    return out


def main() -> None:
    report_template = (EA / 'htmlandhtml-ai-report.html').read_text(encoding='utf-8')
    dictionary = extract_dict(report_template)
    if len(dictionary['en']) < 20 or len(dictionary['tr']) < 20: raise SystemExit('EA LOCALE CONTRACT FAIL: report translation dictionary could not be extracted')
    TR_EA.mkdir(parents=True, exist_ok=True)
    built, all_leaks = [], []
    for filename, en_path, tr_path in PAGES:
        src = EA / filename
        if not src.exists(): raise SystemExit(f'EA LOCALE CONTRACT FAIL: missing {src}')
        template = src.read_text(encoding='utf-8')
        en_html = build_page(template, filename, 'en', en_path, tr_path, dictionary)
        tr_html = build_page(template, filename, 'tr', en_path, tr_path, dictionary)
        src.write_text(en_html, encoding='utf-8')
        (TR_EA / filename).write_text(tr_html, encoding='utf-8')
        built.append(filename)
        for locale, output in (('en', en_html), ('tr', tr_html)):
            leaks = purity_leaks(output, locale)
            if leaks:
                all_leaks.append((filename, locale, leaks))
    if all_leaks:
        lines = ['EA LOCALE PURITY FAIL — exhaustive visible leak inventory:']
        for filename, locale, leaks in all_leaks:
            lines.append(f'[{filename} {locale}] {len(leaks)} leak segment(s)')
            lines.extend('  - ' + item[:500] for item in leaks[:120])
        raise SystemExit('\n'.join(lines))
    print('EA LOCALE CONTRACT PASS: URL-native EN/TR surfaces materialized -> ' + ', '.join(built))

if __name__ == '__main__': main()
