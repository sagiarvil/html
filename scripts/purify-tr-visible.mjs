import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(),files=[];
function walk(dir){if(!fs.existsSync(dir))return;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith('.html'))files.push(p)}}
walk(path.join(root,'tr'));

const phrases=[
  ['Structured Data','Yapısal Veri'],['Structured data','Yapısal veri'],
  ['AI Website Readiness','AI Web Sitesi Hazırlığı'],['Website Readiness','Web Sitesi Hazırlığı'],
  ['Website Scanner','Site Tarayıcısı'],['Security Headers Checker','Güvenlik Başlıkları Kontrolü'],
  ['Technical SEO Checker','Teknik SEO Kontrolü'],['Accessibility Checker','Erişilebilirlik Kontrolü'],
  ['Link Integrity Checker','Bağlantı Bütünlüğü Kontrolü'],['Evidence Standard','Kanıt Standardı'],
  ['Audit Profile','Denetim Profili'],['audit profile','denetim profili'],
  ['Source Registry','Kaynak Kayıt Sistemi'],['source registry','kaynak kayıt sistemi'],
  ['Commercial Boundary','Ticari Sınır'],['COMMERCIAL BOUNDARY','TİCARİ SINIR'],
  ['Deliverable','Teslimat'],['DELIVERABLE','TESLİMAT'],
  ['Root Fix','Kök Düzeltme'],['ROOT FIX','KÖK DÜZELTME'],
  ['Recovery','Kurtarma'],['RECOVERY','KURTARMA'],
  ['Prevention','Önleme'],['PREVENTION','ÖNLEME'],
  ['Rollback','Geri Alma'],['ROLLBACK','GERİ ALMA'],
  ['Acceptance','Kabul'],['stop conditions','durdurma koşulları'],['Stop conditions','Durdurma koşulları'],
  ['re-scan','yeniden tarama'],['Re-scan','Yeniden tarama'],['checkout','ödeme sayfası'],['Checkout','Ödeme sayfası'],
  ['single-purpose','tek amaçlı'],['full-site','tam site'],['before/after','önce/sonra'],
  ['field data','saha verisi'],['Field data','Saha verisi'],['Core Web Vitals','Core Web Vitals'],
  ['technical audit','teknik denetim'],['Technical audit','Teknik denetim'],['site audit','site denetimi'],
  ['AI citation','AI kaynak gösterimi'],['AI citations','AI kaynak gösterimleri'],
  ['source class','kaynak sınıfı'],['Source class','Kaynak sınıfı'],
  ['confidence level','güven düzeyi'],['Confidence level','Güven düzeyi'],
  ['confidence','güven düzeyi'],['evidence','kanıt'],['Evidence','Kanıt'],
  ['public product profile','kamuya açık ürün profili'],['Public product profile','Kamuya açık ürün profili'],
  ['public scanner','herkese açık tarayıcı'],['Public scanner','Herkese açık tarayıcı'],
  ['public repository','herkese açık kod deposu'],['public issue','herkese açık kayıt'],['public support channel','herkese açık destek kanalı'],
  ['public site','herkese açık site'],['Public site','Herkese açık site'],['public surface','herkese açık yüzey'],['Public surface','Herkese açık yüzey'],
  ['public response','herkese açık yanıt'],['public signals','herkese açık sinyaller'],['public target','herkese açık hedef'],['public targets','herkese açık hedefler'],
  ['private network','özel ağ'],['Private network','Özel ağ'],['private networks','özel ağlar'],['Private networks','Özel ağlar'],
  ['fail-closed','güvenli biçimde reddetme'],['Fail-closed','Güvenli biçimde reddetme'],
  ['ranking guarantee','sıralama garantisi'],['ranking','sıralama'],['citation guarantee','kaynak gösterimi garantisi'],
  ['neutral prompt','tarafsız istem'],['Neutral prompt','Tarafsız istem'],['prompt set','istem seti'],['Prompt set','İstem seti'],
  ['provider','sağlayıcı'],['Provider','Sağlayıcı'],['consumer app','son kullanıcı uygulaması'],['consumer application','son kullanıcı uygulaması'],
  ['retrieval','bilgi erişimi'],['Retrieval','Bilgi erişimi'],['generation','yanıt üretimi'],['Generation','Yanıt üretimi'],
  ['redirect','yönlendirme'],['Redirect','Yönlendirme'],['redirects','yönlendirmeler'],['Redirects','Yönlendirmeler'],
  ['crawlability','taranabilirlik'],['Crawlability','Taranabilirlik'],['crawl access','tarama erişimi'],['Crawl access','Tarama erişimi'],
  ['crawl','tarama'],['Crawl','Tarama'],['indexability','indekslenebilirlik'],['Indexability','İndekslenebilirlik'],
  ['Schema','Yapısal Veri'],['schema','yapısal veri'],
  ['validator','doğrulayıcı'],['Validator','Doğrulayıcı'],['checker','kontrol aracı'],['Checker','Kontrol Aracı'],
  ['tracker','takip modülü'],['Tracker','Takip Modülü'],['citation','kaynak gösterimi'],['Citation','Kaynak gösterimi'],['citations','kaynak gösterimleri'],['Citations','Kaynak gösterimleri'],
  ['scan findings','tarama bulguları'],['Scan findings','Tarama bulguları'],['scan result','tarama sonucu'],['Scan result','Tarama sonucu'],['scan','tarama'],['Scan','Tarama'],
  ['severity','önem düzeyi'],['Severity','Önem düzeyi'],['regression','regresyon'],['Regression','Regresyon'],
  ['issue inventory','bulgu envanteri'],['Issue inventory','Bulgu envanteri'],['issue','bulgu'],['Issue','Bulgu'],
  ['domain','alan adı'],['Domain','Alan adı'],['unknown','bilinmeyen'],['UNKNOWN','BİLİNMEYEN'],['Unknown','Bilinmeyen'],
  ['CANONICAL','TEK ANA'],['Canonical','Tek ana'],['canonical','tek ana'],
  ['PROFILE','PROFİL'],['METHOD','YÖNTEM'],['REFERENCE','REFERANS'],['ARCHITECTURE','MİMARİ'],['BOUNDARIES','SINIRLAR'],['BOUNDARY','SINIR'],
  ['PUBLIC','KAMUYA AÇIK'],['PAID','ÜCRETLİ'],['ENTITLEMENT','ERİŞİM YETKİSİ'],['SOURCE CODE','KAYNAK KOD'],
  ['Security','Güvenlik'],['Accessibility','Erişilebilirlik'],['Performance Hygiene','Performans Hijyeni'],['Content Trust','İçerik Güveni'],
  ['Agent Readiness','Ajan Hazırlığı'],['Agent Ready','Ajan Hazırlığı'],['Conversion','Dönüşüm'],['Link Integrity','Bağlantı Bütünlüğü'],
  ['Technical SEO','Teknik SEO'],['AI / GEO Access','AI / GEO Erişimi'],['Search Retrieval','Arama Bilgi Erişimi'],
  ['Tools','Araçlar'],['Guides','Rehberler'],['Pricing','Fiyatlandırma'],['About','Hakkımızda'],['Contact','İletişim'],['Privacy','Gizlilik'],['Terms','Kullanım Koşulları']
];

function translateText(text){let out=text;for(const [from,to] of phrases){const re=new RegExp(`\\b${from.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}\\b`,'g');out=out.replace(re,to)}return out}
function purify(html){const parts=html.split(/(<[^>]+>)/g);let skip=null;for(let i=0;i<parts.length;i++){const part=parts[i];if(part.startsWith('<')){const m=part.match(/^<\/?\s*([a-z0-9:-]+)/i);if(!m)continue;const tag=m[1].toLowerCase(),closing=/^<\//.test(part);if(['script','style','code','pre'].includes(tag)){if(closing&&skip===tag)skip=null;else if(!closing&&!/\/>$/.test(part))skip=tag}continue}if(!skip)parts[i]=translateText(part)}return parts.join('')}

for(const file of files){const before=fs.readFileSync(file,'utf8');const after=purify(before);fs.writeFileSync(file,after)}
console.log(`Visible Turkish copy normalization complete: ${files.length} pages`);
