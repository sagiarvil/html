# 🏗️ RENOVATION OS — PROJE, MUHASEBE VE MÜŞTERİ YÖNETİM SİSTEMİ
## Kapsamlı Mimari, Şema ve Cerrahi Uygulama Planı (PLAN.md)

---

### 1. MÜŞTERİNİN İŞ MODELİ VE TEMEL AMACI

**Şirket Profili:**
* İnşaat ve renovasyon (tadilat, dekorasyon, mutfak/banyo yenileme vb.) işleri yapan KOBİ ölçekli şirket.
* Ek olarak: Küçük çaplı inşaat/tadilat malzemesi alım-satımı ve ticareti yapıyor.

**Müşterinin En Hayati Şartı:**
* Sistem tamamlanıp teslim edildikten sonra **geliştiriciye bağımlılık SIFIR olmalıdır.**
* Karmaşık veritabanı kurulumları, sunucu ayarları veya bakım maliyeti olmamalıdır.
* Taşınabilir, tek tıkla cPanel/standart PHP hostinge atılıp çalışan, yedeklemesi tek bir dosya kopyalamaktan ibaret olan bir sistem olmalıdır.

---

### 2. SİSTEMİN TEMEL MODÜLLERİ VE İŞ AKIŞI

```
[MÜŞTERİ ADAYI / TALEP] ──> [RANDEVU & KEŞİF] ──> [TEKLİF HAZIRLAMA]
                                                          │
   ┌──────────────────────────────────────────────────────┴── (Teklif Onaylandı)
   ▼
[PROJE BAŞLATMA & KONTRAT]
   ├─► Hakediş / Ödeme Planı Takvimi
   ├─► Tahsilatlar ──> [ANA KASA (Nakit/Banka)]
   ├─► Proje Giderleri (Malzeme Faturası, Nakliye vb.)
   ├─► Usta / İşçilik Maliyetleri (Yevmiye / Götürü)
   └─► Canlı Maliyet & Kar/Zarar Takibi
          │
[ŞİRKET GENEL GİDERLERİ] ──> Ofis Kirası, Araç Yakıtı, Faturalar
[ÜRÜN ALIM-SATIM & STOK] ──> Alış, Satış, Basit Stok Sayımı, Marj Takibi
          │
[RAPORLAMA & YÖNETİM PANELİ] ──> Net Kar/Zarar, Kasa Bakiyesi, Bekleyen Alacaklar
```

---

### 3. TEKNİK MİMARİ VE YIĞIN SEÇİMİ

| Katman | Teknoloji | Neden Seçildi? |
|---|---|---|
| **Backend & Dil** | **PHP 8.3 / 8.5 (Strict Types, Mini-MVC)** | Sıfır harici bağımlılık. cPanel, Plesk, Apache ve Nginx'te sıfır konfigürasyon ile doğrudan çalışır. |
| **Veritabanı** | **SQLite 3 (PDO ile)** | MySQL sunucusu, kullanıcı adı, şifre ve port derdi yok. Tüm veritabanı tek bir şifreli/güvenli `.sqlite` dosyasındadır. Müşteri dosyayı kopyalayarak saniyeler içinde tam yedek alır. |
| **Arayüz (UI)** | **Tailwind CSS + Lucide Icons** | Temiz, kurumsal, modern SaaS görünümü; tablet ve mobil cihazlardan sahada kullanıma uygun (Responsive). |
| **Reaktivite** | **Alpine.js 3.x** | Hafif, sayfa yenilemeden dinamik kalem ekleme, anlık toplam hesaplama ve modal yönetimi. |
| **Dışa Aktarım** | **Yazdırılabilir Proje/Teklif PDF & Excel (CSV)** | Müşteriye verilecek resmi teklif ve sözleşmeler için temiz print/PDF şablonu. |

---

### 4. VERİTABANI İLİŞKİSEL ŞEMASI (3NF)

1. `users` (Kullanıcılar / Yöneticiler)
   - `id`, `name`, `email`, `password_hash`, `role`, `created_at`
2. `customers` (Müşteriler & CRM)
   - `id`, `name_title`, `phone`, `email`, `address`, `city_district`, `lead_status` (Aday, Keşif, Teklif Verildi, Anlaşıldı, İptal), `notes`, `created_at`
3. `appointments` (Randevular & Keşif Takvimi)
   - `id`, `customer_id`, `title`, `appointment_date`, `status` (Planlandı, Tamamlandı, İptal), `notes`
4. `projects` (Projeler / Şantiyeler)
   - `id`, `customer_id`, `project_name`, `address`, `start_date`, `target_end_date`, `status` (Planlama, Devam Ediyor, Tamamlandı, İptal), `contract_amount`, `notes`
5. `quotes` (Teklifler & Revizyonlar)
   - `id`, `project_id`, `customer_id`, `quote_number`, `total_amount`, `discount`, `net_amount`, `status` (Taslak, Gönderildi, Onaylandı, Reddedildi), `created_at`
6. `quote_items` (Teklif Kalemleri)
   - `id`, `quote_id`, `item_type` (Malzeme, İşçilik, Diğer), `description`, `quantity`, `unit`, `unit_price`, `total_price`
7. `payment_plans` (Sözleşme Ödeme Planı / Hakediş Takvimi)
   - `id`, `project_id`, `title` (Örn: Peşinat, Kaba İnşaat Sonu, Teslimat), `due_date`, `amount`, `status` (Bekliyor, Kısmi, Ödendi)
8. `transactions` (Ana Kasa & Finansal Hareketler)
   - `id`, `type` (Gelir, Gider), `category` (Hakediş Tahsilatı, Proje Gideri, İşçilik Ödemesi, Genel Şirket Gideri, Ürün Satışı, Malzeme Alımı), `project_id` (opsiyonel), `account_id` (Nakit Kasa, Banka Hesabı), `amount`, `payment_method`, `date`, `receipt_no`, `description`
9. `labor_costs` (Usta & İşçilik Takibi)
   - `id`, `project_id`, `worker_name`, `job_description`, `work_type` (Yevmiye, Götürü, Metrekare), `units`, `unit_rate`, `total_amount`, `paid_amount`, `payment_status`
10. `products` (Ürün Alım-Satım & Basit Stok)
    - `id`, `code`, `name`, `category`, `unit`, `stock_quantity`, `buy_price`, `sell_price`, `min_alert_level`
11. `stock_movements` (Stok Giriş-Çıkış)
    - `id`, `product_id`, `movement_type` (Giriş / Alış, Çıkış / Satış, Projede Kullanım), `project_id`, `quantity`, `unit_price`, `date`, `note`

---

### 5. CERRAHİ UYGULAMA VE GELİŞTİRME ADIMLARI

* **Adım 1: Proje Çekirdeği ve Güvenlik Altyapısı**
  - Klasör yapısı: `renovation-os/` (`public/`, `app/Core/`, `app/Controllers/`, `app/Views/`, `database/`, `config/`).
  - `.htaccess` ve SQLite dosya erişim kilidi (`.sqlite` dosyasına tarayıcıdan doğrudan erişim engeli).
  - CSRF koruması, PDO Prepared Statements (OWASP SQLi & XSS zırhı).

* **Adım 2: Veritabanı ve Otomatik Kurulum (Auto-Migration)**
  - İlk çalıştırmada `database.sqlite` dosyasını ve tabloları otomatik oluşturan akıllı `DatabaseInit` motoru.
  - Varsayılan yönetici hesabı (`admin@renovation.local`) ve örnek sektör verileri (demo mod seçeneği).

* **Adım 3: CRM, Müşteri & Randevu Modülü**
  - Müşteri kartı, telefon/adres rehberi, durum etiketleri (Aday ➔ Keşif ➔ Anlaşıldı).
  - Takvim ve randevu listesi (Bugünkü keşifler, gelecek görüşmeler).

* **Adım 4: Proje, Teklif ve Kontrat Yönetimi**
  - Proje detay sayfası: Hakediş planı, malzeme giderleri, usta ödemeleri, kâr marjı tek ekranda.
  - Dinamik teklif hazırlama (satır ekle/çıkar, kdv/iskonto, anlık toplam).
  - Tek tıkla yazdırılabilir profesyonel sözleşme ve teklif şablonu.

* **Adım 5: Finans, Gelir-Gider, İşçilik & Ana Kasa**
  - Kasa hareketleri (Nakit, Banka).
  - Usta puantajı ve götürü işçilik takip tablosu.
  - Genel şirket giderleri (Kira, araç, akaryakıt, yemek, ofis).

* **Adım 6: Ürün Alım-Satım & Stok Modülü**
  - Basit ürün kartları, alış/satış fiyatı, stok uyarısı.
  - Projeye malzeme çıkışı veya doğrudan müşteriye malzeme satışı.

* **Adım 7: Yönetim Özeti & Raporlama (Executive Dashboard)**
  - Net Şirket Kârı = (Tamamlanan Proje Kârları + Ürün Satış Kârı) - Genel Şirket Giderleri.
  - Vadesi geçmiş / bekleyen tahsilat listesi.
  - Güncel Nakit ve Banka Kasası durumu.

* **Adım 8: Yerel Test & Canlı Doğrulama**
  - Mac yerel sunucusunda (`php -S localhost:8000`) uçtan uca veri girişi ve testlerin yapılması.
  - Çıktının tek tıkla teslim edilebilir `renovation-os.zip` haline getirilmesi.
