import type { ScanResult } from './scan-engine';
import type { FullSiteFixMandateReport, IntelligencePrescription } from './remediation-engine-v2';

export const DELIVERY_PACK_VERSION='1.0.0' as const;

export type DeliveryLocale='tr'|'en';
export interface DeliveryPack {
  version:typeof DELIVERY_PACK_VERSION;
  filename:string;
  mime:'application/zip';
  bytes:Uint8Array;
  files:string[];
}

type Entry={name:string;content:string};

const te=new TextEncoder();
function cleanName(v:string){return v.toLowerCase().replace(/^www\./,'').replace(/[^a-z0-9.-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'website'}
function crc32(bytes:Uint8Array){
  let crc=0xffffffff;
  for(const b of bytes){
    crc^=b;
    for(let i=0;i<8;i++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);
  }
  return (crc^0xffffffff)>>>0;
}
function u16(n:number){const x=new Uint8Array(2);new DataView(x.buffer).setUint16(0,n,true);return x}
function u32(n:number){const x=new Uint8Array(4);new DataView(x.buffer).setUint32(0,n>>>0,true);return x}
function concat(parts:Uint8Array[]){const size=parts.reduce((s,x)=>s+x.length,0);const out=new Uint8Array(size);let o=0;for(const p of parts){out.set(p,o);o+=p.length}return out}

/** Minimal standards-compliant ZIP writer using STORE (method 0). No compression dependency, deterministic bytes. */
function zip(entries:Entry[]):Uint8Array{
  const locals:Uint8Array[]=[];const centrals:Uint8Array[]=[];let offset=0;
  for(const entry of entries){
    const name=te.encode(entry.name);const data=te.encode(entry.content);const crc=crc32(data);
    const local=concat([
      u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),name,data
    ]);
    locals.push(local);
    const central=concat([
      u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(offset),name
    ]);
    centrals.push(central);offset+=local.length;
  }
  const localBlob=concat(locals);const centralBlob=concat(centrals);
  const eocd=concat([u32(0x06054b50),u16(0),u16(0),u16(entries.length),u16(entries.length),u32(centralBlob.length),u32(localBlob.length),u16(0)]);
  return concat([localBlob,centralBlob,eocd]);
}

function allIssues(report:FullSiteFixMandateReport){return Array.isArray(report.issues)?report.issues:[]}
function mdList(xs:string[]){return xs.length?xs.map(x=>`- ${x}`).join('\n'):'- None / Yok'}
function prioritySummary(report:FullSiteFixMandateReport){
  const h=report.health_summary;
  return `P0: ${h.p0_count} · P1: ${h.p1_count} · P2: ${h.p2_count} · P3: ${h.p3_count}`;
}
function testsMarkdown(report:FullSiteFixMandateReport,locale:DeliveryLocale){
  const title=locale==='tr'?'# Kabul ve Regresyon Testleri':'# Acceptance & Regression Tests';
  const out=[title,''];
  for(const i of allIssues(report)){
    out.push(`## ${i.priority} · ${i.issue_id} · ${i.title}`,'',locale==='tr'?'### Kabul testleri':'### Acceptance tests',mdList(i.acceptance_tests),'',locale==='tr'?'### Regresyon testleri':'### Regression tests',mdList(i.regression_tests),'');
  }
  for(const a of report.intelligence_actions||[]){
    out.push(`## Intelligence · ${a.analysis}`,'',locale==='tr'?'### Kabul testleri':'### Acceptance tests',mdList(a.acceptance_tests),'',locale==='tr'?'### Regresyon testleri':'### Regression tests',mdList(a.regression_tests),'');
  }
  return out.join('\n');
}
function rollbackMarkdown(report:FullSiteFixMandateReport,locale:DeliveryLocale){
  const out=[locale==='tr'?'# Rollback ve Durma Koşulları':'# Rollback & Stop Conditions',''];
  for(const i of allIssues(report)){
    out.push(`## ${i.priority} · ${i.issue_id} · ${i.title}`,'',locale==='tr'?'### Rollback':'### Rollback',mdList(i.rollback_guidance));
    if(i.implementation_stop)out.push('',locale==='tr'?'### Uygulama durduruldu':'### Implementation stop',`- ${i.stop_reason||'Evidence/context required'}`,`- ${i.safe_next_action||''}`);
    out.push('');
  }
  for(const a of report.intelligence_actions||[]){out.push(`## Intelligence · ${a.analysis}`,'',mdList(a.rollback_guidance),'')}
  return out.join('\n');
}
function implementationChecklist(actions:IntelligencePrescription[],locale:DeliveryLocale){
  const lines=[locale==='tr'?'AI GÖRÜNÜRLÜK UYGULAMA KONTROL LİSTESİ':'AI VISIBILITY IMPLEMENTATION CHECKLIST',''];
  for(const a of actions){lines.push(`[ ] ${a.priority_rank?`#${a.priority_rank} `:''}${a.analysis} — ${a.implementation_state}`)}
  lines.push('',locale==='tr'?'Kural: Kabul ve regresyon testleri geçmeden ilgili madde tamamlandı sayılmaz.':'Rule: An item is not complete until its acceptance and regression tests pass.');
  return lines.join('\n');
}

export function buildDeliveryPack(scan:ScanResult,report:FullSiteFixMandateReport,locale:DeliveryLocale='en'):DeliveryPack{
  const tr=locale==='tr';
  const readme=tr?`# HTML&HTML — AI Görünürlük Uygulama Paketi\n\nAlan adı: ${scan.domain}\nTarama kimliği: ${scan.scanId}\nÜretim zamanı: ${report.generated_at}\nPaket sürümü: ${DELIVERY_PACK_VERSION}\n\nBu ZIP bir “öneri listesi” değildir. Ölçülen bulguları firma, yazılım ekibi veya yetkili geliştiricinin uygulayabileceği doğrulanabilir teknik iş paketine dönüştürür.\n\n## Kullanım sırası\n1. 01_EXECUTIVE_SUMMARY.md ile kapsamı ve önceliği okuyun.\n2. 02_IMPLEMENTATION_BLUEPRINT.md dosyasındaki P0 → P3 sırasını koruyun.\n3. Her değişiklikten sonra 04_ACCEPTANCE_TESTS.md kontrollerini çalıştırın.\n4. Regresyon oluşursa 05_ROLLBACK_PLAN.md talimatını uygulayın.\n5. Yayın sonrası aynı alan adını yeniden tarayarak doğrulayın.\n\nNOT_MEASURED ve REQUIRES_CONTEXT alanları kanıt elde edilmeden “düzeltildi” sayılmamalıdır.\n`: `# HTML&HTML — AI Visibility Implementation Package\n\nDomain: ${scan.domain}\nScan ID: ${scan.scanId}\nGenerated: ${report.generated_at}\nPackage version: ${DELIVERY_PACK_VERSION}\n\nThis ZIP is not a generic recommendation list. It converts measured findings into a verifiable engineering work package that a business, software team or authorized developer can execute.\n\n## Execution order\n1. Read 01_EXECUTIVE_SUMMARY.md for scope and priorities.\n2. Preserve the P0 → P3 order in 02_IMPLEMENTATION_BLUEPRINT.md.\n3. Run 04_ACCEPTANCE_TESTS.md after each implementation batch.\n4. Use 05_ROLLBACK_PLAN.md if a regression occurs.\n5. Re-scan the same domain after production deployment.\n\nNOT_MEASURED and REQUIRES_CONTEXT items must never be marked fixed until the missing evidence exists.\n`;
  const exec=tr?`# Yönetim Özeti\n\n- Alan adı: ${scan.domain}\n- Ana teknik skor: ${Math.round(scan.overall)}/100\n- Analiz edilen sayfa: ${report.coverage.analyzed_urls}/${report.coverage.max_deep_analyzed_pages}\n- Toplam issue: ${report.health_summary.total_issues}\n- Öncelik dağılımı: ${prioritySummary(report)}\n- Intelligence analizleri: ${report.intelligence.analyses.length}\n- Readiness lensleri: ${Object.keys(report.intelligence.readinessLenses).length}\n\n## Ürün sınırı\nBu paket, yapay zeka tavsiyesi, Google sıralaması, citation, trafik, müşteri veya gelir garantisi vermez. Ama ölçülen site kaynaklı engelleri, uygulanabilir teknik değişikliklere ve doğrulama testlerine dönüştürür.\n`: `# Executive Summary\n\n- Domain: ${scan.domain}\n- Core technical score: ${Math.round(scan.overall)}/100\n- Pages analyzed: ${report.coverage.analyzed_urls}/${report.coverage.max_deep_analyzed_pages}\n- Total issues: ${report.health_summary.total_issues}\n- Priority distribution: ${prioritySummary(report)}\n- Intelligence analyses: ${report.intelligence.analyses.length}\n- Readiness lenses: ${Object.keys(report.intelligence.readinessLenses).length}\n\n## Product boundary\nThis package does not guarantee AI recommendations, Google rankings, citations, traffic, customers or revenue. It converts measured website-side blockers into executable technical changes and verification tests.\n`;
  const entries:Entry[]=[
    {name:'00_READ_ME.md',content:readme},
    {name:'01_EXECUTIVE_SUMMARY.md',content:exec},
    {name:'02_IMPLEMENTATION_BLUEPRINT.md',content:String(report.markdown||'')},
    {name:'03_FINDINGS.json',content:JSON.stringify({domain:scan.domain,scanId:scan.scanId,coverage:report.coverage,health:report.health_summary,issues:report.issues,intelligenceActions:report.intelligence_actions},null,2)},
    {name:'04_ACCEPTANCE_TESTS.md',content:testsMarkdown(report,locale)},
    {name:'05_ROLLBACK_PLAN.md',content:rollbackMarkdown(report,locale)},
    {name:'06_AI_READINESS.json',content:JSON.stringify(report.intelligence,null,2)},
    {name:'07_IMPLEMENTATION_CHECKLIST.txt',content:implementationChecklist(report.intelligence_actions||[],locale)}
  ];
  const filename=`HTMLHTML_AI_Visibility_Implementation_Blueprint_${cleanName(scan.domain)}_${scan.scanId}.zip`;
  return {version:DELIVERY_PACK_VERSION,filename,mime:'application/zip',bytes:zip(entries),files:entries.map(x=>x.name)};
}
