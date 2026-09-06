import type { ScanResult } from './scan-engine';
import type { FullSiteFixMandateReport, IntelligencePrescription } from './remediation-engine-v2';

export const DELIVERY_PACK_VERSION='1.1.0' as const;
export const MAX_MACHINE_SURFACES=30 as const;

export type DeliveryLocale='tr'|'en';
export interface DeliveryPack {
  version:typeof DELIVERY_PACK_VERSION;
  filename:string;
  mime:'application/zip';
  bytes:Uint8Array;
  files:string[];
}

type Entry={name:string;content:string};
type Surface={url:string;label:string;filename:string;findingIds:string[];status:'MEASURED_URL'|'REQUIRES_CONTEXT'};

const te=new TextEncoder();
function cleanName(v:string){return v.toLowerCase().replace(/^www\./,'').replace(/[^a-z0-9.-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'website'}
function crc32(bytes:Uint8Array){let crc=0xffffffff;for(const b of bytes){crc^=b;for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}return (crc^0xffffffff)>>>0}
function u16(n:number){const x=new Uint8Array(2);new DataView(x.buffer).setUint16(0,n,true);return x}
function u32(n:number){const x=new Uint8Array(4);new DataView(x.buffer).setUint32(0,n>>>0,true);return x}
function concat(parts:Uint8Array[]){const size=parts.reduce((s,x)=>s+x.length,0);const out=new Uint8Array(size);let o=0;for(const p of parts){out.set(p,o);o+=p.length}return out}

/** Minimal standards-compliant ZIP writer using STORE (method 0). No compression dependency, deterministic bytes. */
function zip(entries:Entry[]):Uint8Array{
  const locals:Uint8Array[]=[];const centrals:Uint8Array[]=[];let offset=0;
  for(const entry of entries){
    const name=te.encode(entry.name),data=te.encode(entry.content),crc=crc32(data);
    const local=concat([u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),name,data]);
    locals.push(local);
    const central=concat([u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),name]);
    centrals.push(central);offset+=local.length;
  }
  const localBlob=concat(locals),centralBlob=concat(centrals);
  return concat([localBlob,centralBlob,u32(0x06054b50),u16(0),u16(0),u16(entries.length),u16(entries.length),u32(centralBlob.length),u32(localBlob.length),u16(0)]);
}

function allIssues(report:FullSiteFixMandateReport):any[]{return Array.isArray(report.issues)?report.issues:[]}
function mdList(xs:string[]){return xs.length?xs.map(x=>`- ${x}`).join('\n'):'- None / Yok'}
function prioritySummary(report:FullSiteFixMandateReport){const h=report.health_summary;return `P0: ${h.p0_count} · P1: ${h.p1_count} · P2: ${h.p2_count} · P3: ${h.p3_count}`}
function testsMarkdown(report:FullSiteFixMandateReport,locale:DeliveryLocale){
  const out=[locale==='tr'?'# Kabul ve Regresyon Testleri':'# Acceptance & Regression Tests',''];
  for(const i of allIssues(report))out.push(`## ${i.priority} · ${i.issue_id} · ${i.title}`,'',locale==='tr'?'### Kabul testleri':'### Acceptance tests',mdList(i.acceptance_tests||[]),'',locale==='tr'?'### Regresyon testleri':'### Regression tests',mdList(i.regression_tests||[]),'');
  for(const a of report.intelligence_actions||[])out.push(`## Intelligence · ${a.analysis}`,'',locale==='tr'?'### Kabul testleri':'### Acceptance tests',mdList(a.acceptance_tests),'',locale==='tr'?'### Regresyon testleri':'### Regression tests',mdList(a.regression_tests),'');
  return out.join('\n');
}
function rollbackMarkdown(report:FullSiteFixMandateReport,locale:DeliveryLocale){
  const out=[locale==='tr'?'# Rollback ve Durma Koşulları':'# Rollback & Stop Conditions',''];
  for(const i of allIssues(report)){out.push(`## ${i.priority} · ${i.issue_id} · ${i.title}`,'','### Rollback',mdList(i.rollback_guidance||[]));if(i.implementation_stop)out.push('',locale==='tr'?'### Uygulama durduruldu':'### Implementation stop',`- ${i.stop_reason||'Evidence/context required'}`,`- ${i.safe_next_action||''}`);out.push('')}
  for(const a of report.intelligence_actions||[])out.push(`## Intelligence · ${a.analysis}`,'',mdList(a.rollback_guidance),'');
  return out.join('\n');
}
function implementationChecklist(actions:IntelligencePrescription[],locale:DeliveryLocale){
  const lines=[locale==='tr'?'AI GÖRÜNÜRLÜK UYGULAMA KONTROL LİSTESİ':'AI SEARCH VISIBILITY IMPLEMENTATION CHECKLIST',''];
  for(const a of actions)lines.push(`[ ] ${a.priority_rank?`#${a.priority_rank} `:''}${a.analysis} — ${a.implementation_state}`);
  lines.push('',locale==='tr'?'Kural: Kabul ve regresyon testleri geçmeden ilgili madde tamamlandı sayılmaz.':'Rule: An item is not complete until its acceptance and regression tests pass.');return lines.join('\n');
}
function surfaceSlug(u:URL,index:number){const raw=u.pathname==='/'?'home':u.pathname.replace(/^\/|\/$/g,'').replace(/[^a-z0-9]+/gi,'-').toLowerCase()||'page';return `${String(index+1).padStart(2,'0')}-${raw.slice(0,64)}.md`}
function surfaceLabel(u:URL){return u.pathname==='/'?'Homepage':decodeURIComponent(u.pathname).replace(/\/$/,'')||'Homepage'}
function machineSurfaces(scan:ScanResult):Surface[]{
  let home:URL;try{home=new URL(scan.url)}catch{return []}
  const urls:string[]=[];const add=(raw?:string)=>{if(!raw)return;try{const u=new URL(raw,home);u.hash='';if(u.origin!==home.origin||!['http:','https:'].includes(u.protocol))return;if(!urls.includes(u.href)&&urls.length<MAX_MACHINE_SURFACES)urls.push(u.href)}catch{}};
  add(scan.url);for(const f of scan.findings||[])add(f.url);
  return urls.map((url,index)=>{const u=new URL(url);const findingIds=(scan.findings||[]).filter(f=>{if(!f.url)return false;try{return new URL(f.url,home).href===url}catch{return false}}).map(f=>f.id);return {url,label:surfaceLabel(u),filename:`machine-surfaces/${surfaceSlug(u,index)}`,findingIds,status:findingIds.length?'MEASURED_URL':'REQUIRES_CONTEXT'}});
}
function recommendedLlmsTxt(scan:ScanResult,surfaces:Surface[],locale:DeliveryLocale){
  const note=locale==='tr'?'Önerilen kök llms.txt; yalnız taramada kanıtlanan URL’lerden oluşturuldu. Başlık/açıklama metinleri yayın öncesi gerçek sayfa içeriğiyle doğrulanmalıdır.':'Recommended root llms.txt built only from URLs evidenced by the scan. Titles/descriptions must be verified against the live page content before publishing.';
  const rows=surfaces.map(s=>`- [${s.label}](${s.url})`);
  return `# ${scan.domain}\n> ${note}\n\n## Key pages\n${rows.length?rows.join('\n'):'- No evidenced public page URL available beyond the scan target.'}\n`;
}
function surfaceManifest(surface:Surface,scan:ScanResult,locale:DeliveryLocale){
  const ids=surface.findingIds.length?surface.findingIds.map(x=>`- ${x}`).join('\n'):'- None mapped';
  if(locale==='tr')return `# Machine Surface Adayı\n\n- Kanonik URL: ${surface.url}\n- Tarama ID: ${scan.scanId}\n- Durum: ${surface.status}\n\n## Ölçülen bulgular\n${ids}\n\n## Uygulama kuralı\nBu dosya sayfa içeriği uydurmaz. Yayına alınacak Markdown yüzeyi, kanonik sayfanın güncel ve doğrulanmış içeriğinden türetilmeli; ürün/hizmet iddiaları, fiyatlar, kişi/kurum bilgileri ve kaynaklar canlı sayfayla eşleşmelidir. İçerik bağlamı yoksa REQUIRES_CONTEXT olarak kalır.\n`;
  return `# Machine Surface Candidate\n\n- Canonical URL: ${surface.url}\n- Scan ID: ${scan.scanId}\n- Status: ${surface.status}\n\n## Measured findings\n${ids}\n\n## Implementation rule\nThis file does not invent page content. Any publishable Markdown surface must be derived from the current verified canonical page; product/service claims, pricing, people/entities and sources must match the live page. Without content context it remains REQUIRES_CONTEXT.\n`;
}
function evaluationMarkdown(scan:ScanResult,report:FullSiteFixMandateReport,locale:DeliveryLocale,surfaces:Surface[]){
  const top=allIssues(report).slice(0,20).map(i=>`- ${i.priority} · ${i.issue_id} · ${i.title}`).join('\n')||'- None';
  return locale==='tr'?`# Değerlendirme ve Çözüm Haritası\n\n- Alan adı: ${scan.domain}\n- Skor: ${Math.round(scan.overall)}/100\n- Öncelikler: ${prioritySummary(report)}\n- Machine surface adayı: ${surfaces.length}/${MAX_MACHINE_SURFACES}\n\n## Öncelikli sorunlar\n${top}\n\n## Çözümün bulunduğu dosyalar\n- 02_IMPLEMENTATION_BLUEPRINT.md: kök neden, exact fix, sıra ve uygulama sınırları.\n- 04_ACCEPTANCE_TESTS.md: kabul + regresyon doğrulaması.\n- 05_ROLLBACK_PLAN.md: geri dönüş ve stop koşulları.\n- 08_LLMS_TXT_RECOMMENDED.txt: kanıtlanan URL’lerden önerilen tek root llms.txt yüzeyi.\n- 09_MACHINE_SURFACE_MAP.json + machine-surfaces/: en fazla 30 sayfalık makine yüzeyi planı.\n\nNOT_MEASURED veya REQUIRES_CONTEXT alanlarında kanıt olmadan uygulama yapılmaz.\n`:`# Evaluation & Solution Map\n\n- Domain: ${scan.domain}\n- Score: ${Math.round(scan.overall)}/100\n- Priorities: ${prioritySummary(report)}\n- Machine surface candidates: ${surfaces.length}/${MAX_MACHINE_SURFACES}\n\n## Priority findings\n${top}\n\n## Where the solution lives\n- 02_IMPLEMENTATION_BLUEPRINT.md: root cause, exact fix, order and implementation boundaries.\n- 04_ACCEPTANCE_TESTS.md: acceptance + regression verification.\n- 05_ROLLBACK_PLAN.md: rollback and stop conditions.\n- 08_LLMS_TXT_RECOMMENDED.txt: proposed single root llms.txt built from evidenced URLs.\n- 09_MACHINE_SURFACE_MAP.json + machine-surfaces/: up to 30 page-level machine-surface implementation manifests.\n\nNo implementation is allowed for NOT_MEASURED or REQUIRES_CONTEXT items until the missing evidence exists.\n`;
}

export function buildDeliveryPack(scan:ScanResult,report:FullSiteFixMandateReport,locale:DeliveryLocale='en'):DeliveryPack{
  const tr=locale==='tr',surfaces=machineSurfaces(scan);
  const readme=tr?`# HTML&HTML — AI Görünürlük Yol Haritası\n\nAlan adı: ${scan.domain}\nTarama kimliği: ${scan.scanId}\nÜretim zamanı: ${report.generated_at}\nPaket sürümü: ${DELIVERY_PACK_VERSION}\n\nBu ZIP genel öneri listesi değildir. Ölçülen bulguları firma, yazılım ekibi veya coding agent tarafından uygulanabilir ve test edilebilir iş paketine dönüştürür.\n\n## Kullanım sırası\n1. 01_EXECUTIVE_SUMMARY.md\n2. 10_EVALUATION_REPORT.md\n3. 02_IMPLEMENTATION_BLUEPRINT.md — P0 → P3 sırasını koruyun.\n4. 04_ACCEPTANCE_TESTS.md ve 05_ROLLBACK_PLAN.md\n5. 08_LLMS_TXT_RECOMMENDED.txt + 09_MACHINE_SURFACE_MAP.json\n6. Yayın sonrası RESCAN talimatını uygulayın.\n\nNOT_MEASURED ve REQUIRES_CONTEXT alanları kanıt elde edilmeden “düzeltildi” sayılmaz. Page-specific machine surfaces root llms.txt değildir; root için tek önerilen yüzey 08_LLMS_TXT_RECOMMENDED.txt dosyasıdır.\n`:`# HTML&HTML — AI Search Visibility Roadmap\n\nDomain: ${scan.domain}\nScan ID: ${scan.scanId}\nGenerated: ${report.generated_at}\nPackage version: ${DELIVERY_PACK_VERSION}\n\nThis ZIP is not a generic recommendation list. It converts measured findings into a testable engineering work package for a business, developer or coding agent.\n\n## Execution order\n1. 01_EXECUTIVE_SUMMARY.md\n2. 10_EVALUATION_REPORT.md\n3. 02_IMPLEMENTATION_BLUEPRINT.md — preserve P0 → P3 order.\n4. 04_ACCEPTANCE_TESTS.md and 05_ROLLBACK_PLAN.md\n5. 08_LLMS_TXT_RECOMMENDED.txt + 09_MACHINE_SURFACE_MAP.json\n6. Re-scan after production deployment.\n\nNOT_MEASURED and REQUIRES_CONTEXT items are never treated as fixed without evidence. Page-specific machine surfaces are not separate root llms.txt files; the single proposed root surface is 08_LLMS_TXT_RECOMMENDED.txt.\n`;
  const exec=tr?`# Yönetim Özeti\n\n- Alan adı: ${scan.domain}\n- Ana teknik skor: ${Math.round(scan.overall)}/100\n- Analiz edilen sayfa: ${report.coverage.analyzed_urls}/${report.coverage.max_deep_analyzed_pages}\n- Toplam issue: ${report.health_summary.total_issues}\n- Öncelik dağılımı: ${prioritySummary(report)}\n- Intelligence analizleri: ${report.intelligence.analyses.length}\n- Readiness lensleri: ${Object.keys(report.intelligence.readinessLenses).length}\n\n## Ürün sınırı\nBu paket yapay zeka tavsiyesi, Google sıralaması, citation, trafik, müşteri veya gelir garantisi vermez. Ölçülen site kaynaklı engelleri uygulanabilir teknik değişikliklere ve doğrulama testlerine dönüştürür.\n`:`# Executive Summary\n\n- Domain: ${scan.domain}\n- Core technical score: ${Math.round(scan.overall)}/100\n- Pages analyzed: ${report.coverage.analyzed_urls}/${report.coverage.max_deep_analyzed_pages}\n- Total issues: ${report.health_summary.total_issues}\n- Priority distribution: ${prioritySummary(report)}\n- Intelligence analyses: ${report.intelligence.analyses.length}\n- Readiness lenses: ${Object.keys(report.intelligence.readinessLenses).length}\n\n## Product boundary\nThis package does not guarantee AI recommendations, Google rankings, citations, traffic, customers or revenue. It converts measured website-side blockers into executable technical changes and verification tests.\n`;
  const entries:Entry[]=[
    {name:'00_READ_ME.md',content:readme},
    {name:'01_EXECUTIVE_SUMMARY.md',content:exec},
    {name:'02_IMPLEMENTATION_BLUEPRINT.md',content:String(report.markdown||'')},
    {name:'03_FINDINGS.json',content:JSON.stringify({domain:scan.domain,scanId:scan.scanId,coverage:report.coverage,health:report.health_summary,issues:report.issues,intelligenceActions:report.intelligence_actions},null,2)},
    {name:'04_ACCEPTANCE_TESTS.md',content:testsMarkdown(report,locale)},
    {name:'05_ROLLBACK_PLAN.md',content:rollbackMarkdown(report,locale)},
    {name:'06_AI_READINESS.json',content:JSON.stringify(report.intelligence,null,2)},
    {name:'07_IMPLEMENTATION_CHECKLIST.txt',content:implementationChecklist(report.intelligence_actions||[],locale)},
    {name:'08_LLMS_TXT_RECOMMENDED.txt',content:recommendedLlmsTxt(scan,surfaces,locale)},
    {name:'09_MACHINE_SURFACE_MAP.json',content:JSON.stringify({version:1,domain:scan.domain,scanId:scan.scanId,maxSurfaces:MAX_MACHINE_SURFACES,count:surfaces.length,rootLlmsTxt:'08_LLMS_TXT_RECOMMENDED.txt',note:'Only the root llms.txt is represented as llms.txt. Page-level files are Markdown machine-surface implementation manifests and require verified page content before publication.',surfaces},null,2)},
    {name:'10_EVALUATION_REPORT.md',content:evaluationMarkdown(scan,report,locale,surfaces)},
    ...surfaces.map(s=>({name:s.filename,content:surfaceManifest(s,scan,locale)}))
  ];
  const filename=`HTMLHTML_AI_Search_Visibility_Roadmap_${cleanName(scan.domain)}_${scan.scanId}.zip`;
  return {version:DELIVERY_PACK_VERSION,filename,mime:'application/zip',bytes:zip(entries),files:entries.map(x=>x.name)};
}
