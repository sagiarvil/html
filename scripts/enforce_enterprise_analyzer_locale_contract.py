#!/usr/bin/env python3
import re
import enterprise_analyzer_locale_core as core


def _localize_bilingual_attrs(source: str, locale: str) -> str:
    """Resolve data-tr/data-en using the correct five-group pattern contract."""
    pattern = re.compile(
        r'(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-tr="[^"]*"[^>]*\bdata-en="[^"]*"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)',
        re.S,
    )

    def repl(match: re.Match[str]) -> str:
        attr = re.search(rf'data-{locale}="([^"]*)"', match.group('attrs'))
        return match.group(0) if not attr else match.group(1) + attr.group(1) + match.group(5)

    return pattern.sub(repl, source)


# Patch the core module before main() executes; data-i18n has six groups, data-tr/data-en has five.
core.localize_bilingual_attrs = _localize_bilingual_attrs

# Late-generated Enterprise Analyzer copy may contain static Turkish fragments that are
# outside the embedded dictionary. Extend the canonical pair contract before materialization
# so EN and TR are generated from one source without post-generation language masking.
core.PAIRS += [
    ("Sıfır Rastgelelik & Deterministik Doğrulama", "Zero Randomness & Deterministic Verification"),
    ("Alıntı Kaynak Grafı & P0–P3 Hedefleri", "Citation Source Graph & P0–P3 Targets"),
    ("25-Node n8n CI/CD Otomasyonu & Gerçek DLQ", "25-Node n8n CI/CD Automation & Real DLQ"),
    ("E-E-A-T (Güven & Varlık)", "E-E-A-T (Trust & Entity)"),
    ("Alıntı Kaynak Grafı & Öncelikli Ele Geçirme Hedefleri (P0–P3 Matrix)", "Citation Source Graph & Priority Capture Targets (P0–P3 Matrix)"),
    ("Yapay Zeka Arama Motorları Model Tepki & Alıntı Simülasyonu", "AI Search Engine Model Response & Citation Simulation"),
    ("Yapay Zeka Arama Kaybı & Finansal Risk Hesaplayıcısı", "AI Search Visibility Loss & Financial Risk Calculator"),
    ("⚡ $99 — sürümlenmiş Onarım Paketini Al & Kaybı Durdur →", "⚡ $99 — Get the Versioned Fix Package →"),
    ("256-Bit SSL, Global Kart & Kurumsal Fatura / Tax ID Desteği", "256-Bit SSL, Global Cards & Corporate Invoice / Tax ID Support"),
    ("15 Detaylı Onarım yol haritası & Yol Haritası", "15 Detailed Remediation Roadmaps & Implementation Plan"),
    ("YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ & ÇÖZÜM yol haritası RAPORU", "AI SEARCH VISIBILITY & REMEDIATION ROADMAP REPORT"),
    ("İcra Kurulu, CEO & CTO", "Board, CEO & CTO"),
    ("Wikidata QID ve Corporation şeması doğrudan <head> içine eklenerek marka teyit edilir.", "Add a Wikidata QID reference and Organization schema in <head> only when supported by verified entity evidence."),
    ("✓ sürümlenmiş Tam Çözüm yol haritasıleri Paketi & Anında ZIP İndirme", "✓ Versioned Remediation Roadmap Package & ZIP Download"),
    ("Bahsedilme, Alıntı & Tavsiye Oranları", "Mention, Citation & Recommendation Rates"),
    ("Varlık Çelişki Defteri (Hallucination Guard)", "Entity Contradiction Ledger (Hallucination Guard)"),
    ("✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle onaylatın.", "✓ Action: Verify the official product profile, $99 fixed price and deterministic software capabilities against published evidence."),
    ("Hizmet & İş Modeli", "Service & Business Model"),
    ("Pazarlama & SEO Danışmanlık Ajansı", "Marketing & SEO Consulting Agency"),
    ("Temel robots.txt & llms.txt Kontrolü", "Basic robots.txt & llms.txt Check"),
    ("Kök Neden Analizi & P0–P3 Uygulama Sırası", "Root Cause Analysis & P0–P3 Implementation Order"),
    ("3–5 Gerçek Rakip Eşdeğerliği & \"Neden Onlar\" Analizi", "3–5 Real Competitor Parity & \"Why Them\" Analysis"),
    ("Alıntı Kaynak Grafı & P0–P3 Ele Geçirme Hedefleri", "Citation Source Graph & P0–P3 Capture Targets"),
    ("25 Düğümlü n8n Otomasyonu & Gerçek DLQ Kanıtı", "25-Node n8n Automation & Real DLQ Evidence"),
    ("12 Haftalık Dark Pool Zaman Serisi & 30 Günlük Delta", "12-Week Dark Pool Time Series & 30-Day Delta"),
    ("HTML&HTML, web siteleri için deterministik AI görünürlük analizleri ve yapılandırma yol haritasıleri üreten bağımsız bir yazılım platformudur. Şirketimiz reklam ajansı, SEO danışmanlığı veya özel yazılım geliştirme hizmeti SUNMAZ.", "HTML&HTML is an independent software platform that generates deterministic AI visibility analyses and configuration roadmaps for websites. The company does not provide advertising agency, SEO consulting or custom software development services."),
]


if __name__ == '__main__':
    core.main()
