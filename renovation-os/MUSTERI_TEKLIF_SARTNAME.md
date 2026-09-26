# 🏗️ PROJE, MUHASEBE VE MÜŞTERİ YÖNETİM SİSTEMİ (RENOVATION OS)
## Kapsamlı Yazılım Mimarisi, Fonksiyonel Şartname ve Ticari Teklif

**Teklif Tarihi:** 25 Eylül 2026  
**Proje Kodu:** REN-OS-2026-V1  
**Geçerlilik Süresi:** 15 Gün  
**Teklif Tutarı:** **1.000 USD** (Anahtar Teslim, Tek Seferlik Ödeme, Sıfır Aylık Lisans)

---

## 1. YÖNETİCİ ÖZETİ VE ÇÖZÜM VİZYONU

İnşaat ve renovasyon sektörünün sahadaki dinamikleri (değişken keşifler, parçalı malzeme alımları, usta yevmiyeleri, aşamalı hakediş tahsilatları ve küçük çaplı malzeme alım-satım ticareti) standart piyasa muhasebe programlarının kalıplarına uymaz.

Size özel olarak mimarisi kurgulanan **RENOVATION OS**, şirketinizin:
1. Müşteri adayından keşif randevusuna,
2. Detaylı malzeme/işçilik teklifinden sözleşmeye,
3. Şantiye giderlerinden usta maliyetlerine,
4. Kasa/Banka takibinden net şirket kârlılığına,
5. Ürün alım-satım ve basit stok hareketlerine kadar

tüm iş süreçlerini tek bir merkezden, yalın, yüksek hızlı ve hatasız yönetmenizi sağlar.

En önemlisi; **sistem tamamlanıp teslim edildikten sonra harici bir yazılımcıya, sistem yöneticisine veya aylık sunucu bakım ücretlerine olan bağımlılığınız SIFIR olacaktır.**

---

## 2. A'DAN Z'YE SİSTEM MODÜLLERİ VE FONKSİYONEL ÖZELLİKLER

Sistem, sahadaki pratik ihtiyaçlarınıza göre tasarlanmış 7 ana modülden oluşmaktadır:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RENOVATION OS ANA MERKEZ                        │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
   ┌───────────────────┬─────────────┴─────┬───────────────────┬─────────┐
   ▼                   ▼                   ▼                   ▼         ▼
[1. CRM & KEŞİF]  [2. TEKLİF & SÖZLEŞME] [3. PROJE TAKİBİ] [4. MALİYE] [5. TİCARET & STOK]
 - Aday Takibi      - Hızlı Kalem Girişi   - Şantiye Gideri   - Ana Kasa  - Ürün Kartları
 - Randevu Takvimi  - Otomatik KDV/İskonto - Usta Puantajı    - Tahsilat  - Alış / Satış
 - Keşif Notları    - Resmi PDF / Çıktı    - Canlı Kâr/Zarar  - Giderler  - Kritik Stok
```

### MODÜL 1: Müşteri Takip Sistemi (CRM) & Randevu/Keşif Ajandası
* **Müşteri Kartları:** Müşteri unvanı, iletişim bilgileri, adres ve şantiye konumu tek ekranda.
* **Aşama Yönetimi (Pipeline):** Müşterilerin durumunu renkli etiketlerle izleyin:
  *(Yeni Talep ➔ Keşif Randevusu ➔ Teklif Verildi ➔ Sözleşme İmzalandı ➔ Şantiye Devam Ediyor ➔ Tamamlandı / Arşiv).*
* **Keşif ve Randevu Takvimi:** Hangi gün, saat kaçta, hangi adreste keşif veya müşteri görüşmesi olduğunu gösteren ajanda görünümü. Yaklaşan randevular için anasayfada uyarı paneli.
* **Müşteri Geçmişi:** Müşteriye ait eski teklifler, yapılan işler ve ödeme geçmişi tek tıkla listelenir.

### MODÜL 2: Teklif Hazırlama, Revizyon & Resmi Sözleşme
* **Dinamik Kalem Girişi:** Teklif oluştururken satır satır Malzeme, İşçilik ve Nakliye kalemleri ekleme.
* **Anlık Hesaplama:** Birim fiyat, miktar, iskonto ve KDV oranları girildiği anda toplam tutar canlı güncellenir.
* **Teklif Durumları:** *Taslak, Müşteriye Sunuldu, Onaylandı, Revize Edildi, Reddedildi.*
* **1-Tık Resmi PDF / Yazdırma:** Kurumsal antetli kağıdınıza uygun, logonuzun ve standart sözleşme şartlarınızın yer aldığı, müşteriye doğrudan WhatsApp veya E-Posta ile gönderilebilir şık teklif ve sözleşme çıktısı.
* **Otomatik Projeye Dönüştürme:** Müşteri teklifi onayladığı anda tek tuşla sistemde yeni bir **"Aktif Şantiye/Proje"** oluşturulur.

### MODÜL 3: Şantiye & Proje Yönetimi (Maliyet & İlerleme)
* **Proje Kartı:** Şantiye sorumlusu, başlangıç ve hedeflenen teslim tarihi, sözleşme bedeli.
* **Hakediş ve Ödeme Planı Takvimi:** Sözleşmede anlaşılan ödeme takvimi (Örn: *%30 Peşinat, %40 Kaba Alçı/Tesisat Bitimi, %30 İnce İşler Teslimi*). Hangi hakedişin ne zaman ödeneceği, ne kadarının tahsil edildiği ve kalan bakiye canlı izlenir.
* **Şantiye Giderleri Girişi:** Alınan çimento, boya, seramik, elektrik malzemesi fiş/faturaları doğrudan ilgili projeye gider olarak işlenir.
* **Canlı Proje Kârlılığı:** Projenin toplam tahsilatı, yapılan harcamalar ve kalan net kâr oranı proje kartının en üstünde renkli grafik olarak anlık gösterilir.

### MODÜL 4: Usta & İşçilik Maliyetleri Takibi
* **Esnek Çalışma Tipleri:** İnşaat işlerinin yapısına uygun 3 farklı işçilik modeli:
  1. *Yevmiye Usulü:* Gün sayısı × Günlük Ücret (Puantaj).
  2. *Götürü / Taşeron Usulü:* İşi komple bir ustaya/ekibe anahtar teslim verme (Örn: Komple Fayans İşi: 45.000 TL).
  3. *Metrekare / Birim Usulü:* Yapılan m² veya mülk birimi başına hesaplama (Örn: 120 m² Alçıpan × Birim Fiyat).
* **Usta Cari & Hakediş Defteri:** Hangi ustaya ne kadar borç tahakkuk etti, ne kadarı elden/bankadan ödendi, ustaya kalan borç nedir eksiksiz takip edilir.

### MODÜL 5: Kasa Yönetimi (Nakit & Banka) ve Şirket Genel Giderleri
* **Ana Kasa Takibi:** 
  - *Nakit Kasa (Ofis/Elden)*
  - *Banka Hesapları (Havale/EFT/Kredi Kartı)*
* **Genel Şirket Giderleri:** Projelerden bağımsız olan şirket sabit maliyetleri (Ofis kirası, muhasebe ücreti, şirket araçlarının yakıt ve bakımları, yemek giderleri, genel faturalar) ayrı bir kategoride tutulur.
* **Gelir / Gider Fişi:** Her para giriş-çıkışında kategori, ödeme yöntemi, tarih, makbuz no ve açıklama zorunluluğu ile kaçak veya belgesiz işlem engellenir.

### MODÜL 6: Ürün Alım-Satımı ve Basit Stok Takibi
* **Ürün / Malzeme Kartları:** Ürün kodu, ürün adı, birimi (Adet, Metre, Torba, Kutu), Alış Fiyatı, Satış Fiyatı.
* **Stok Giriş / Çıkış Hareketi:** 
  - *Toptancıdan Alış (Stok Artar, Kasadan Para Çıkar)*
  - *Perakende/Müşteriye Satış (Stok Düşer, Kasaya Para Girer)*
  - *Şantiyede Sarf Malzeme Olarak Kullanım (Stok Düşer, İlgili Projeye Malzeme Maliyeti Olarak Eklenir)*
* **Kritik Stok Uyarısı:** Belirlediğiniz asgari miktarın altına düşen malzemeler anasayfada kırmızı bayrakla uyarılır.
* **Ticari Kârlılık:** Ürün alım-satımından elde edilen brüt ve net kâr anlık hesaplanır.

### MODÜL 7: Yönetim Dashboard ve Finansal Raporlama
* **Şirket Net Kârı (Gerçek Matematik):**
  $$\text{Net Şirket Kârı} = \Big(\sum \text{Proje Kârları} + \sum \text{Malzeme Satış Kârı}\Big) - \sum \text{Şirket Genel Giderleri}$$
* **Finansal Sağlık Barometresi:**
  - Kasadaki toplam güncel nakit ve banka bakiyesi.
  - Müşterilerden vadesi gelmiş ve gecikmiş bekleyen alacaklar toplamı.
  - Ustalara ve toptancılara ödenecek bekleyen borçlar toplamı.
* **Excel / CSV Dışa Aktarım:** Tek tıkla tüm hareketleri Excel formatında indirebilme.

---

## 3. TEKNİK MİMARİ VE "SIFIR GELİŞTİRİCİ BAĞIMLILIĞI" GARANTİSİ

Bu sistem piyasadaki karmaşık, sürekli güncelleme isteyen, MySQL veritabanı kilitlenen veya aylık abonelik isteyen sistemlerden **bilinçli olarak farklı inşa edilmektedir:**

| Standart Karmaşık Yazılımlar | Sizin İçin Tasarlanan RENOVATION OS |
|---|---|
| Ayrı veritabanı sunucusu (MySQL/Postgre) gerektirir, şifre/port değişirse çöker. | **Zero-Config SQLite Veritabanı:** Tüm sistem verisi tek bir güvenli dosyadadır. Kurulum, ayar veya port gerekmez. |
| Aylık/yıllık kullanıcı başı lisans ücreti ödetir. | **Sıfır Lisans:** Kodlar tamamen size aittir; ömür boyu sınırsız kullanılır. |
| Yedek almak için uzman bir yazılımcıya ihtiyaç duyulur. | **Tek Dosya Yedekleme:** Klasörü veya veritabanı dosyasını USB belleğe kopyalamanız tam yedek için yeterlidir. |
| Ağır sistemler, yavaş açılan sayfalar. | **Ultra-Hızlı PHP 8.3 & Tailwind:** 0.1 saniyede açılan yağ gibi akıcı sayfalar. |
| Karmaşık sunucu kurulumu. | **1-Tık Kurulum:** Klasörü cPanel veya herhangi bir hostingin içine atmanız yeterlidir; anında çalışır. |

---

## 4. TESLİMAT PAKETİ VE DESTEK KAPSAMI

Teslimat sırasında tarafınıza eksiksiz teslim edilecek unsurlar:

1. **Eksiksiz Kaynak Kodları (Açık Kaynak):** Tüm PHP, veritabanı ve stil dosyaları şifresiz, açık ve temiz kodlanmış olarak tek bir ZIP arşivi halinde teslim edilir.
2. **Hazır Veritabanı ve Örnek Veriler:** İlk açılışta hemen kullanmaya başlayabilmeniz için örnek proje, müşteri ve malzeme verileri tanımlı gelir (tek tıkla sıfırlanabilir).
3. **Resimli Kullanım Kılavuzu (PDF):** Sistemin nasıl kurulacağını ve her bir modülün nasıl kullanılacağını adım adım anlatan sade Türkçe kılavuz.
4. **1-Tık Yedekleme & Geri Yükleme Aracı:** Verilerinizin güvenliği için tek tıkla tam yedek indirme butonu.
5. **30 Günlük Ücretsiz Teknik Garanti:** Teslimattan sonraki 30 gün boyunca oluşabilecek her türlü kullanıcı sorusunda veya teknik pürüzde birebir ücretsiz destek.

---

## 5. TİCARİ ŞARTLAR VE FİYATLANDIRMA

* **Sistem Geliştirme Bedeli:** **1.000 USD** (veya TCMB efektif satış kuru karşılığı Türk Lirası)
* **Ödeme Planı:**
  * **%50 Peşinat (500 USD):** Mimari başlangıcı, veritabanı ve çekirdek geliştirme onayı ile.
  * **%50 Teslimatta (500 USD):** Sistem canlı test ortamında tüm modülleriyle eksiksiz gösterilip onayınız alındıktan sonra, kaynak kodlar ve kullanım kılavuzu teslim edilirken.
* **Geliştirme ve Teslim Süresi:** Sipariş ve peşinat onayından itibaren tam **7 Gün** (1 Hafta).
* **Ara Bilgilendirme:** 3. günde sistemin canlı önizlemesi (Proje, Müşteri & Randevu ekranları) onayınıza sunulacaktır.

---

## 6. SÖZLEŞME VE ONAY

Bu teklif; yukarıda detaylandırılan tüm modülleri, mimariyi ve koşulları eksiksiz karşılayan anahtar teslim bir yazılım taahhüdüdür.

**Teklifi Onaylayan Yetkili:**  
İsim / Soyisim:  
İmza / Tarih:  
Şirket Kaşesi:  
