# HTML&HTML.COM — AI SEARCH INTELLIGENCE ENGINE v2.0.0
## Principal Architect | Zero-Defect | Formal Verification

**Engine Version:** 2.0.0  
**Audit Date:** 2026-09-07  
**Classification:** System Architecture Document

---

## 1. SISTEM MIMARISI — Genel Bakis

```
┌─────────────────────────────────────────────────────────────────┐
│                        KULLANICI GIRISI                         │
│                    (Domain URL / llms.txt)                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ORKESTRATOR (n8n Prensibi)                   │
│              Tek giris, cikis noktasi. Hata yonetimi.           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│  TARAMA    │ │  ANALIZ    │ │  RAPOR     │
│  MOTORU    │ │  MOTORU    │ │  MOTORU    │
│  (Scanner) │ │ (Analyzer) │ │ (Renderer) │
└─────┬──────┘ └─────┬──────┘ └─────┬──────┘
      │              │              │
      └──────────────┴──────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DUZELTME MOTORU (Fix Engine)                 │
│     Issue → Template → Code → Test → ZIP (22 dosya)             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. TARAMA MOTORU (Scanner Engine)

### 2.1 Modul Listesi — 13 Bagimsiz Istihbarat Denetimi

Her modul bagimsiz calisir, kendi skorlama algoritmasina sahiptir, kendi kanitlarini uretir.

| # | Modul Kodu | Modul Adi | Ne Yapar? | Skor Araligi |
|---|-----------|-----------|-----------|-------------|
| 01 | `SCAN-INDEX` | Tarama & Indeksleme | robots.txt, sitemap.xml, HTTP status, canli link probu | 0-100 |
| 02 | `TECH-SEO` | Teknik SEO | Title, meta description, canonical, H1, H2, yapısal hiyerarsi | 0-100 |
| 03 | `AI-GEO` | AI / GEO Uygunluk | llms.txt v2, agent-card, MCP endpoint, AI bot erisimi | 0-100 |
| 04 | `LLMS-V2` | LLMS.TXT v2 | Markdown yapi, baglanti butunlugu, spesifikasyon uygunlugu | 0-100 |
| 05 | `SCHEMA` | Yapisal Veri | JSON-LD, @graph, Organization, WebSite, FAQPage, BreadcrumbList | 0-100 |
| 06 | `PERF` | Performans | LCP, CLS, INP, TTFB, Core Web Vitals | 0-100 |
| 07 | `A11Y` | Erisilebilirlik | WCAG 2.1 AAA, ARIA, form etiketleri, kontrast, skip link | 0-100 |
| 08 | `SEC` | Guvenlik | HTTPS, CSP, HSTS, X-Frame-Options, guvenlik basliklari | 0-100 |
| 09 | `TRUST` | Guven Sinyalleri | E-E-A-T, duplicate icerik, canonical, lastmod, copyright | 0-100 |
| 10 | `AGENT` | Ajan Hazirligi | robots, agent-card, endpoint, MCP, headless islem | 0-100 |
| 11 | `CONV` | Donusum | CTA gorunurlugu, form validasyonu, P0 aksiyonlari, event tracking | 0-100 |
| 12 | `LINK` | Link Sagligi | Kirik linkler, 301/302 yonlendirmeler, redirect chain, orphan pages | 0-100 |
| 13 | `ARCH` | Mimari Yonetisim | Route registry, metadata generator, CI quality gate, source-level canonical | 0-100 |

---

## 3. ANALIZ MOTORU (Analyzer Engine)

### 3.1 Bulgu Uretimi (Hastane Raporu / Is Etkisi Modeli)
Her bulgu icin:
- **Ne Oldu?** (Anlasilir sorun tanimi)
- **Nasil Anlarsiniz?** (Dogrulama adimi)
- **Is Etkisi Ne?** (Trafik kaybi, kullanici erisimi)
- **Cozum Suresi & Teknik Seviye** (5 dakika, kolay)

---

## 4. RAPOR MOTORU (Report Renderer)

1. **Genel Durum**: 0-100 arasi saglik skoru (Saglikli / Dikkat / Ciddi Durum).
2. **Organ Sagligi (4 Vital)**: Bulunabilirlik, Anlasilabilirlik, Guven & Kalite, Ticari Yol.
3. **Detayli Tahlil**: 12 alt motor skoru ve tier gosterimi.
4. **Acil Mudahale**: P0 kritik bulgular, net eylem cagrisi.
5. **Yol Haritasi**: $99 tam site duzeltme soylesmesi (22 dosya, testler, rollback).

---

## 5. DUZELTME MOTORU (Fix Engine — $99)

- **22 Dosyalik ZIP Paketi**
- **Kabul Testleri (`test.js`)**
- **Geri Alma Plani (`00-rollback-plan.md`)**
- **CI Entegrasyonu (`ci-integration.yml`)**
