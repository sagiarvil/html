# FS-GATE-001: CONTENT GATING & PAYWALL TEASER SYSTEM
## v1.0.0-20260907 | Principal Architect

---

## 1. EXECUTIVE SUMMARY

Bu mandate, yıllık 1M$+ bütçeli kurumsal AI Search Intelligence ajanslarının ücretsiz teşhis (diagnosis) ve ücretli reçete (prescription) arayüzlerinin ayrımını tanımlar. Mevcut ücretsiz katman KORUNUR; ödeme gerektiren alanlar "buzlanır" (blur-gate), merak uyandırır, kayıp/kazanç psikolojisi yaratır.

**Engine Version:** `FS-GATE-001-v1.0.0-20260907`

---

## 2. ARCHITECTURAL PRINCIPLES

| Prensip | Açıklama | Risk Mitigation |
|---------|----------|-----------------|
| **Teşhis Açık** | Sorun, skor, kanıt özetleri, etki metrikleri ücretsiz görünür | Kullanıcı güveni korunur |
| **Reçete Buzlanmış** | Çözüm adımları, kod şablonları, uygulama planı blur + overlay ile gizlenir | Değer önerisi korunur |
| **Envanter Gizli** | "22 dosya", "P0-P3", "rollback planı" gibi spesifik sayılar/süreçler asla ücretsiz gösterilmez | Self-serve leakage önlenir |
| **Etki Hissettirilir** | Kayıp: *"Bu sorun arama motorlarının sitenizi atlamasına yol açıyor"* — Kazanç: *"Kilidi açanlar ortalama 3.2x indekslenme artışı görüyor"* | FOMO + Loss Aversion |
| **Deterministic Gate** | Aynı kullanıcı tipi (free/premium) her zaman aynı görünümü alır | A/B test tutarlılığı |

---

## 3. GATING HİYERARŞİSİ (3-Tier)

```
TIER 1: FULL VISIBLE
├── Teşhis başlıkları ve skorlar
├── Kanıt dökümü özetleri (KANIT DÖKÜMÜ kutuları)
├── Ölçüm sınırı açıklamaları
├── Genel durum özetleri (GEÇTİ/UYARI/BAŞARISIZ)
└── Filtreleme ve listeleme arayüzleri

TIER 2: BLUR-TEASER
├── Çözüm başlıkları (görünür ama detay buzlanmış)
├── Etki tahmini ("Bu sorun X'e yol açıyor")
├── Kilidi Aç CTA butonları
└── Maskelenmiş ilerleme çubukları (son %25 blur)

TIER 3: COMPLETE LOCK
├── Adım adım teknik reçete
├── Kod şablonları ve patch dosyaları
├── Dosya listesi ve sayısı ("22 dosya" vb.)
├── Rollback planı ve stop conditions
├── P0-P3 öncelik sıralaması
├── Acceptance + regression test suite
└── Re-scan takvimi
```

---

## 4. UI BUZLANMA TEKNİKLERİ

### 4.1 Blur Overlay
```css
.blur-content {
  filter: blur(6px);
  opacity: 0.25;
  user-select: none;
  pointer-events: none;
}
.blur-mask {
  background: linear-gradient(
    180deg,
    rgba(11,15,25,0.3) 0%,
    rgba(11,15,25,0.85) 60%,
    rgba(11,15,25,0.95) 100%
  );
}
```

### 4.2 Teaser Masking
- Sadece ilk 12-15 karakter görünür
- Gerisi `█████` (block characters) ile maskelenir
- `user-select: none` ile kopyalama engellenir

### 4.3 Progress Bar Gating
- Ücretli çözümdeki progress bar'lar %100'e ulaşmaz
- Son %25'i blur'lu veya animasyonlu "devam ediyor" gösterir

### 4.4 CTA Psikolojisi
| Yasak (Anti-Pattern) | Zorunlu (Pattern) |
|---------------------|-------------------|
| "Detayları Gör" | "Kaybı Önle →" |
| "Daha Fazla Bilgi" | "Kazancı Aç →" |
| "22 Dosyayı İndir" | "Mühendislik Paketini Aç →" |
| "P0-P3 Planını Gör" | "Kilidi Aç →" |

---

## 5. MEVCUT YAPININ HATALARI (Tespit Edilen)

### 5.1 Self-Serve Leakage
Mevcut ekranlarda tespit edilen hatalar:

1. **"22 dosyalık mühendislik paketi, hazır kod şablonu, kabul testi ve rollback planıyla kalıcı olarak çözülür"**
   - ❌ Bu cümle **premium envanterin tam listesini** ücretsiz katmana dökmüştür.
   - ✅ Buzlanmış hali: *"Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır."*

2. **"P0-P3 uygulama sırası, Issue ID + kanıt + güven seviyesi, Acceptance + regression test, Rollback + stop conditions, 30 gün içinde 1 re-scan"**
   - ❌ Tüm bu maddeler **premium değer önerisinin içeriğini** açıkça listelemiş.
   - ✅ Buzlanmış hali: *"5 kritik kontrol noktası ████████ ile güvence altına alınır."*

3. **"Otomatik düzeltme kodları $99 Fix Mandate paketinde"**
   - ❌ "Otomatik düzeltme" ve "Fix Mandate" kelimeleri ücretsiz kullanıcıya **ne alacağını** söyler.
   - ✅ Buzlanmış hali: *"Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın."*

---

## 6. FOMO / LOSS AVERSION METİN KALIBI

### 6.1 Kayıp Hissi (Loss)
- "Bu sorun arama motorlarının sitenizi atlamasına yol açıyor"
- "Her gün erken düzeltme = daha fazla görünürlük kaybı"
- "AI botları bu sayfayı indeksleme dışı bırakabilir"

### 6.2 Kazanç Hissi (Gain)
- "Kilidi açanlar ortalama 3.2x indekslenme artışı görüyor"
- "Kalıcı çözüm + rollback güvencesi"
- "30 gün içinde ücretsiz re-scan"

### 6.3 Merak Uyandırma (Curiosity)
- "4 adımlık teknik düzeltme ████████ içerir"
- "Hazır patch dosyası ████████ ve test suite ████████"
- "P0-P3 öncelik sırası ████████ ile teslim edilir"

---

## 7. VALIDATION CHECKLIST

```
[CONTENT GATING CHECKLIST]
□ Ücretli alanlarda dosya sayısı (22, 15, vb.) asla görünmez
□ Ücretli alanlarda süreç adımları (P0-P3, rollback, regression) asla görünmez
□ Ücretli alanlarda kod şablonu içeriği asla görünmez
□ Blur overlay tıklanamaz ve metin seçilemez
□ Teaser metin sadece ilk 12-15 karakter + block mask
□ CTA'lar "Detayları Gör" değil, "Kaybı Önle" / "Kazancı Aç" kullanır
□ Free user her zaman aynı görünümü alır (deterministic)
□ Premium user blur mask'ı göremez (tam erişim)
□ Engine version manifest güncellendi
```

---

## 8. IMPLEMENTATION CONTRACT

```typescript
interface ContentGateEngine {
  version: string;
  hash: string;

  // Tier classification
  classify(content: ContentItem): 'visible' | 'blur-teaser' | 'complete-lock';

  // Blur rendering
  renderBlur(content: ContentItem, userTier: 'free' | 'premium'): HTMLElement;

  // FOMO text generation
  generateFOMO(issue: AuditIssue, type: 'loss' | 'gain' | 'curiosity'): string;

  // Validation
  validate(): GateAuditReport;
}
```

---

*Prepared by: Principal Architect*
*Date: 2026-09-07*
*Classification: Enterprise Production Ready*
