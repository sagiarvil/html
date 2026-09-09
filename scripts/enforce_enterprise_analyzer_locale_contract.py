#!/usr/bin/env python3
"""Materialize a fail-closed URL-native locale contract for Enterprise Analyzer.

Contract:
- /enterprise-analyzer/** is English (x-default).
- /tr/enterprise-analyzer/** is Turkish.
- Locale is derived only from URL path, never localStorage/query state.
- EN/TR pages are generated from the same semantic source so scores, findings and engine IDs stay parallel.
- Existing data-i18n and data-tr/data-en pairs are resolved at build time.
- A runtime mutation guard handles dynamic scan copy without allowing locale drift.
"""
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
        "en": (
            "Enterprise AI Visibility Diagnostic Lab | HTML&HTML",
            "Enterprise AI visibility diagnostic lab with deterministic controls, public-page crawl evidence, live link probes, prioritized findings and a testable $99 implementation roadmap.",
        ),
        "tr": (
            "Kurumsal Yapay Zeka Görünürlük Teşhis Laboratuvarı | HTML&HTML",
            "Deterministik kontroller, herkese açık sayfa taraması, canlı bağlantı probları, önceliklendirilmiş bulgular ve test edilebilir $99 uygulama yol haritasıyla kurumsal yapay zeka görünürlük teşhisi.",
        ),
    },
    "htmlandhtml-ai-report.html": {
        "en": (
            "Live Sample AI Visibility Report | HTML&HTML Enterprise Analyzer",
            "Live HTML&HTML sample report showing the same Enterprise Analyzer scores, evidence, findings and remediation structure in a fully English production surface.",
        ),
        "tr": (
            "Canlı Örnek Yapay Zeka Görünürlük Raporu | HTML&HTML Enterprise Analyzer",
            "HTML&HTML Enterprise Analyzer skorlarını, kanıtlarını, bulgularını ve onarım yapısını tamamen Türkçe üretim yüzeyinde gösteren canlı örnek rapor.",
        ),
    },
    "htmlandhtml-ai-report-LIGHT.html": {
        "en": (
            "Live Sample AI Visibility Report — Light | HTML&HTML",
            "Light-theme live sample Enterprise Analyzer report with the same English scores, evidence, findings and remediation structure.",
        ),
        "tr": (
            "Canlı Örnek Yapay Zeka Görünürlük Raporu — Açık Tema | HTML&HTML",
            "Aynı skorları, kanıtları, bulguları ve onarım yapısını tamamen Türkçe gösteren açık temalı canlı Enterprise Analyzer örnek raporu.",
        ),
    },
}

# Visible copy not already covered by data-i18n / data-tr / data-en.
PAIRS = [
    ("Ücretsiz Kontrol", "Free Check"),
    ("Çözümler", "Solutions"),
    ("Haberler", "News"),
    ("Sözlük", "Glossary"),
    ("Onarım Seti ($99)", "Fix Mandate ($99)"),
    ("Ücretsiz Tara", "Scan Free"),
    ("Ana Sayfa", "Home"),
    ("Site Tarama", "Website Scanner"),
    ("Tema", "Theme"),
    ("Temayı Değiştir", "Change Theme"),
    ("Temayı değiştir", "Change theme"),
    ("Örnek Rapor (htmlandhtml.com) →", "Sample Report (htmlandhtml.com) →"),
    ("Örnek Rapor (Sample Report)", "Sample Report"),
    ("ÖRNEK RAPOR · SAMPLE SPECIMEN", "SAMPLE REPORT · SPECIMEN"),
    ("CANLI KURUMSAL ÖRNEK RAPOR · ENTERPRISE SAMPLE SPECIMEN", "LIVE ENTERPRISE SAMPLE REPORT · AI DIAGNOSTIC SPECIMEN"),
    ("CANLI KURUMSAL DENETİM LABORATUVARI · ENTERPRISE AI DIAGNOSTIC SUITE", "LIVE ENTERPRISE AI DIAGNOSTIC LAB"),
    ("Kurumsal AI Görünürlük Analizörü &amp; Teşhis Laboratuvarı", "Enterprise AI Visibility Analyzer &amp; Diagnostic Lab"),
    ("Canlı Enterprise Taramayı Başlat", "Start Live Enterprise Scan"),
    ("18-Motorlu Dağıtık Telemetri ve N8N DAG Orkestrasyonu Çalışıyor...", "18-engine distributed telemetry and n8n DAG orchestration running..."),
    ("105 deterministik kontrol", "105 deterministic controls"),
    ("50'ye kadar sayfa", "Up to 50 pages"),
    ("30 link probu", "30 link probes"),
    ("Hedef:", "Target:"),
    ("Genel AI Visibility Skoru", "Overall AI Visibility Score"),
    ("GENEL AI VİSİBİLİTY SKORU", "OVERALL AI VISIBILITY SCORE"),
    ("Tamamlandı", "Completed"),
    ("Dikkat Gerekiyor", "Attention Required"),
    ("Kritik Risk Tespit Edildi", "Critical Risk Detected"),
    ("Dört Temel Yetkinlik Sütunu", "Four Core Capability Pillars"),
    ("Deterministik Skor Dağılımı", "Deterministic Score Distribution"),
    ("Keşif (Crawl &amp; Index)", "Discovery (Crawl &amp; Index)"),
    ("Anlaşılabilirlik (Schema/LLM)", "Understandability (Schema/LLM)"),
    ("Güven &amp; Kalite (HSTS/E-E-A-T)", "Trust &amp; Quality (HSTS/E-E-A-T)"),
    ("Ticari Yol (Action &amp; CTA)", "Commercial Path (Action &amp; CTA)"),
    ("HTML Boyutu:", "HTML Size:"),
    ("319 KB (Kritik)", "319 KB (Critical)"),
    ("Eksik (RFC 6596)", "Missing (RFC 6596)"),
    ("1 Güvensiz Kaynak", "1 Insecure Source"),
    ("Ağırlık:", "Weight:"),
    ("Aktif Bulgular", "Active Findings"),
    ("Tüm Bulgular", "All Findings"),
    ("Kritik", "Critical"),
    ("Yüksek", "High"),
    ("Orta", "Medium"),
    ("Düşük", "Low"),
    ("Bulgu", "Finding"),
    ("Bulgular", "Findings"),
    ("Kanıt", "Evidence"),
    ("Kök Neden", "Root Cause"),
    ("Öncelik", "Priority"),
    ("Etki", "Impact"),
    ("Efor", "Effort"),
    ("Onarım Yol Haritası", "Remediation Roadmap"),
    ("Kabul Testi", "Acceptance Test"),
    ("Regresyon Testi", "Regression Test"),
    ("Geri Alma", "Rollback"),
    ("Örnek Paketi İndir (ZIP)", "Download Sample Package (ZIP)"),
    ("Sitemi Ücretsiz Kontrol Et →", "Check My Site Free →"),
    ("Onarım Paketini İncele ($99)", "Review $99 Fix Mandate"),
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

SCRIPT_RE = re.compile(r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)", re.I | re.S)
TAG_RE = re.compile(r"<[^>]+>", re.S)


def extract_dict(source: str) -> dict[str, dict[str, str]]:
    match = re.search(r"const dict\s*=\s*\{\s*tr\s*:\s*\{(.*?)\}\s*,\s*en\s*:\s*\{(.*?)\}\s*\};", source, re.S)
    if not match:
        return {"tr": {}, "en": {}}

    def parse(block: str) -> dict[str, str]:
        result: dict[str, str] = {}
        for item in re.finditer(r"([A-Za-z0-9_]+)\s*:\s*\"((?:\\.|[^\"\\])*)\"", block):
            raw = item.group(2)
            try:
                value = json.loads('"' + raw + '"')
            except json.JSONDecodeError:
                value = bytes(raw, "utf-8").decode("unicode_escape")
            result[item.group(1)] = value
        return result

    return {"tr": parse(match.group(1)), "en": parse(match.group(2))}


def markup_only(source: str, transform) -> str:
    parts = SCRIPT_RE.split(source)
    for i in range(0, len(parts), 2):
        parts[i] = transform(parts[i])
    return "".join(parts)


def localize_data_i18n(source: str, locale: str, dictionary: dict[str, dict[str, str]]) -> str:
    values = dictionary.get(locale, {})
    if not values:
        return source
    pattern = re.compile(
        r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-i18n=\"(?P<key>[A-Za-z0-9_-]+)\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)",
        re.S,
    )

    def repl(match: re.Match[str]) -> str:
        value = values.get(match.group("key"))
        if value is None:
            return match.group(0)
        return match.group(1) + html.escape(value, quote=False) + match.group(5)

    return pattern.sub(repl, source)


def localize_bilingual_attrs(source: str, locale: str) -> str:
    pattern = re.compile(
        r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-tr=\"[^\"]*\"[^>]*\bdata-en=\"[^\"]*\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)",
        re.S,
    )

    def repl(match: re.Match[str]) -> str:
        attrs = match.group("attrs")
        attr = re.search(rf"data-{locale}=\"([^\"]*)\"", attrs)
        if not attr:
            return match.group(0)
        return match.group(1) + attr.group(1) + match.group(5)

    return pattern.sub(repl, source)


def apply_pairs(source: str, locale: str) -> str:
    def transform(markup: str) -> str:
        out = markup
        if locale == "en":
            for tr, en in sorted(PAIRS, key=lambda item: len(item[0]), reverse=True):
                out = out.replace(tr, en)
        else:
            for tr, en in sorted(PAIRS, key=lambda item: len(item[1]), reverse=True):
                out = out.replace(en, tr)
            for en, tr in TR_FORCE:
                out = out.replace(en, tr)
        return out

    return markup_only(source, transform)


def set_head(source: str, filename: str, locale: str, en_path: str, tr_path: str) -> str:
    title, desc = META[filename][locale]
    canonical_path = en_path if locale == "en" else tr_path
    canonical = "https://htmlandhtml.com" + canonical_path
    en_url = "https://htmlandhtml.com" + en_path
    tr_url = "https://htmlandhtml.com" + tr_path

    source = re.sub(r"<html\s+lang=\"[^\"]+\"", f'<html lang="{locale}"', source, count=1)
    source = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", source, count=1, flags=re.S)
    source = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', f'<meta name="description" content="{html.escape(desc, quote=True)}">', source, count=1)
    source = re.sub(r'<link\s+rel="canonical"\s+href="[^"]+"\s*/?>', f'<link rel="canonical" href="{canonical}">', source, count=1)

    source = re.sub(r'\s*<link\s+rel="alternate"\s+hreflang="(?:tr|en|x-default)"\s+href="[^"]+"\s*/?>', "", source)
    alternates = (
        f'\n  <link rel="alternate" hreflang="en" href="{en_url}">'
        f'\n  <link rel="alternate" hreflang="tr" href="{tr_url}">'
        f'\n  <link rel="alternate" hreflang="x-default" href="{en_url}">'
    )
    source = source.replace(f'<link rel="canonical" href="{canonical}">', f'<link rel="canonical" href="{canonical}">{alternates}', 1)
    return source


def set_nav(source: str, locale: str) -> str:
    if locale == "en":
        nav = '''<nav class="primary-nav" aria-label="Primary navigation">
  <a href="/en/website-scanner">Free Check</a>
  <a href="/en/ai-search-visibility">Solutions</a>
  <a href="/en/llms-txt-news/">News</a>
  <a href="/en/glossary">Glossary</a>
  <a href="/en/pricing">Fix Mandate ($99)</a>
</nav>'''
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>', source, count=1, flags=re.S)
    else:
        nav = '''<nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">Çözümler</a>
  <a href="/tr/llms-txt-haberler/">Haberler</a>
  <a href="/tr/sozluk/">Sözlük</a>
  <a href="/tr/fiyatlandirma/">Onarım Seti ($99)</a>
</nav>'''
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Kontrol</a>', source, count=1, flags=re.S)
    return re.sub(r'<nav class="primary-nav"[^>]*>.*?</nav>', nav, source, count=1, flags=re.S)


def patch_locale_state(source: str, locale: str) -> str:
    # Report inline controller: path wins over query/localStorage and buttons navigate between canonical locale URLs.
    source = source.replace("let currentLang = 'tr';", "let currentLang = document.documentElement.lang === 'tr' ? 'tr' : 'en';")
    source = source.replace(
        "document.getElementById('btnLangTr').addEventListener('click', () => setLang('tr'));",
        "document.getElementById('btnLangTr').addEventListener('click', () => window.location.assign('/tr' + window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '')));",
    )
    source = source.replace(
        "document.getElementById('btnLangEn').addEventListener('click', () => setLang('en'));",
        "document.getElementById('btnLangEn').addEventListener('click', () => window.location.assign(window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '') || '/'));",
    )
    source = re.sub(
        r"const params = new URLSearchParams\(window\.location\.search\);\s*const qLang = params\.get\('lang'\) \|\| localStorage\.getItem\('ea-sample-lang'\);\s*if \(qLang === 'en'\) setLang\('en'\);",
        "setLang(document.documentElement.lang === 'tr' ? 'tr' : 'en');",
        source,
    )
    # Ensure correct active state is rendered even before runtime script executes.
    if locale == "en":
        source = source.replace('id="btnLangTr" type="button" class="lang-btn active"', 'id="btnLangTr" type="button" class="lang-btn"')
        source = source.replace('id="btnLangEn" type="button" class="lang-btn"', 'id="btnLangEn" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="tr" class="active"', 'button data-lang="tr"')
        source = source.replace('button data-lang="en">EN</button>', 'button data-lang="en" class="active">EN</button>')
    else:
        source = source.replace('id="btnLangEn" type="button" class="lang-btn active"', 'id="btnLangEn" type="button" class="lang-btn"')
        source = source.replace('id="btnLangTr" type="button" class="lang-btn"', 'id="btnLangTr" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="en" class="active">EN</button>', 'button data-lang="en">EN</button>')
        source = source.replace('button data-lang="tr">TR</button>', 'button data-lang="tr" class="active">TR</button>')
    return source


def inject_runtime(source: str, locale: str) -> str:
    source = re.sub(r'\s*<!-- EA_LOCALE_CONTRACT:[^>]*-->\s*', "\n", source)
    marker = f"<!-- EA_LOCALE_CONTRACT:{locale}:URL_SSOT -->"
    if RUNTIME_SRC not in source:
        source = source.replace("</body>", f'  <script src="{RUNTIME_SRC}" defer></script>\n{marker}\n</body>', 1)
    else:
        source = source.replace("</body>", marker + "\n</body>", 1)
    return source


def visible_text(source: str) -> str:
    cleaned = SCRIPT_RE.sub(" ", source)
    cleaned = re.sub(r"<!--.*?-->", " ", cleaned, flags=re.S)
    cleaned = TAG_RE.sub(" ", cleaned)
    cleaned = html.unescape(cleaned)
    return re.sub(r"\s+", " ", cleaned).strip()


def assert_purity(source: str, locale: str, label: str) -> None:
    text = visible_text(source)
    if locale == "en":
        forbidden_chars = re.findall(r"[^ ]{0,24}[ğüşöçıİĞÜŞÖÇ][^ ]{0,24}", text)
        forbidden_words = [w for w in (" Hedef:", " Motor ", " Ağırlık:", " Ücretsiz ", " Çözümler ", " Haberler ", " Sözlük ", " Onarım ", " Tamamlandı ") if w in " " + text + " "]
        leaks = forbidden_chars[:15] + forbidden_words
    else:
        markers = (
            "Free Check", "Solutions", "Glossary", "Fix Mandate", "Sample Report", "Change Theme",
            "Start Live Enterprise Scan", "Attention Required", "Critical Risk Detected", "Target:", "Weight:",
        )
        leaks = [m for m in markers if m in text]
    if leaks:
        raise SystemExit(f"EA LOCALE PURITY FAIL [{label} {locale}]: " + " | ".join(leaks[:20]))


def build_page(template: str, filename: str, locale: str, en_path: str, tr_path: str, dictionary) -> str:
    out = localize_data_i18n(template, locale, dictionary)
    out = localize_bilingual_attrs(out, locale)
    out = apply_pairs(out, locale)
    out = set_head(out, filename, locale, en_path, tr_path)
    out = set_nav(out, locale)
    out = patch_locale_state(out, locale)
    out = inject_runtime(out, locale)
    assert f'<html lang="{locale}"' in out
    assert_purity(out, locale, filename)
    return out


def main() -> None:
    report_template = (EA / "htmlandhtml-ai-report.html").read_text(encoding="utf-8")
    dictionary = extract_dict(report_template)
    if len(dictionary["en"]) < 20 or len(dictionary["tr"]) < 20:
        raise SystemExit("EA LOCALE CONTRACT FAIL: report translation dictionary could not be extracted")

    TR_EA.mkdir(parents=True, exist_ok=True)
    built = []
    for filename, en_path, tr_path in PAGES:
        src_path = EA / filename
        if not src_path.exists():
            raise SystemExit(f"EA LOCALE CONTRACT FAIL: missing {src_path}")
        template = src_path.read_text(encoding="utf-8")
        en_html = build_page(template, filename, "en", en_path, tr_path, dictionary)
        tr_html = build_page(template, filename, "tr", en_path, tr_path, dictionary)
        src_path.write_text(en_html, encoding="utf-8")
        (TR_EA / filename).write_text(tr_html, encoding="utf-8")
        built.append(filename)

    print("EA LOCALE CONTRACT PASS: URL-native EN/TR surfaces materialized -> " + ", ".join(built))


if __name__ == "__main__":
    main()
