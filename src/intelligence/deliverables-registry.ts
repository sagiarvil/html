/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Deliverables Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 3.3)
 */

export interface DeliverableMeta {
  code: string;
  filename: string;
  tier: 'FREE' | 'FIX_MANDATE_99' | 'ENTERPRISE_AI_999';
  format: 'MD' | 'JSON' | 'NDJSON' | 'CSV';
  descriptionEn: string;
  descriptionTr: string;
}

export const CANONICAL_PREMIUM_DELIVERABLES: DeliverableMeta[] = [
  { code: 'DELIV-30', filename: '30_EXECUTIVE_DECISION_MEMO.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Executive Decision Memo answering the 5 management questions.', descriptionTr: 'Yönetim kurulu için 5 kritik soruyu yanıtlayan yönetici karar memorandumu.' },
  { code: 'DELIV-31', filename: '31_PROMPT_PANEL.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Stable 12-20 category-defining buyer-question panel.', descriptionTr: '12-20 alıcı sorusundan oluşan dondurulmuş değerlendirme paneli.' },
  { code: 'DELIV-32', filename: '32_AI_ENGINE_OBSERVATIONS.ndjson', tier: 'ENTERPRISE_AI_999', format: 'NDJSON', descriptionEn: 'Raw immutable observation receipts from AI surfaces across 3 runs.', descriptionTr: '3 bağımsız ölçümden elde edilen ham ve değiştirilemez telemetri makbuzları.' },
  { code: 'DELIV-33', filename: '33_AI_SHARE_OF_VOICE.csv', tier: 'ENTERPRISE_AI_999', format: 'CSV', descriptionEn: 'Mention, citation, recommendation and Share of Answer metrics.', descriptionTr: 'Bahsedilme, alıntılanma, önerilme ve pazar cevap payı metrikleri.' },
  { code: 'DELIV-34', filename: '34_ENGINE_DIVERGENCE.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Surface-by-surface disagreement and Engine Divergence Index.', descriptionTr: 'Motorlar arası uyumsuzluk matrisi ve Motor Sapma İndeksi.' },
  { code: 'DELIV-35', filename: '35_COMPETITOR_GAP_MATRIX.csv', tier: 'ENTERPRISE_AI_999', format: 'CSV', descriptionEn: '3-5 named competitor parity benchmark and Why Them / Not You diff.', descriptionTr: '3-5 gerçek rakip eşitsizlik matrisi ve Neden Onlar / Neden Siz Değil analizi.' },
  { code: 'DELIV-36', filename: '36_CITATION_SOURCE_GRAPH.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Prompt -> AI Answer -> Citation -> Source -> Entity DAG graph.', descriptionTr: 'Soru -> Cevap -> Kaynak -> Varlık ilişki grafı ve alıntı haritası.' },
  { code: 'DELIV-37', filename: '37_SOURCE_CAPTURE_TARGETS.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Ranked P0-P3 editorial and data source capture targets.', descriptionTr: 'Önceliklendirilmiş P0-P3 editoryal ve veri kaynağı ele geçirme hedefleri.' },
  { code: 'DELIV-38', filename: '38_ENTITY_VERIFICATION_DOSSIER.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Wikidata QID, domain, business identifiers, and profile verification.', descriptionTr: 'Wikidata QID, domain, kurumsal kimlik ve profil doğrulama dosyası.' },
  { code: 'DELIV-39', filename: '39_ENTITY_CONFLICT_LEDGER.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Discrepancy ledger of prices, addresses, and claims causing hallucination.', descriptionTr: 'Yapay zeka halüsinasyonuna neden olan fiyat, adres ve yetenek çelişki defteri.' },
  { code: 'DELIV-40', filename: '40_AI_CRAWLER_POLICY_MATRIX.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Purpose-separated crawler access matrix (Search, Grounding, Training).', descriptionTr: 'Arama, dayanak ve eğitim amaçlarına göre ayrılmış tarayıcı politika matrisi.' },
  { code: 'DELIV-41', filename: '41_AI_TDM_GOVERNANCE_DOSSIER.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'EU TDM Dir 2019/790 Art 4 reservation and copyright governance.', descriptionTr: 'AB TDM Direktifi Madde 4 hak çekincesi ve veri madenciliği yönetişim dosyası.' },
  { code: 'DELIV-42', filename: '42_VERTICAL_VECTOR_PACK.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Industry-specific vector pack controls and schema bindings.', descriptionTr: 'Sektöre özel dikey vektör paketi kontrolleri ve şema eşlemeleri.' },
  { code: 'DELIV-43', filename: '43_BEFORE_AFTER_PROTOCOL.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Frozen baseline and parity-locked before/after re-scan methodology.', descriptionTr: 'Dondurulmuş baz ölçüm ve parite korumalı yeniden tarama metodolojisi.' },
  { code: 'DELIV-44', filename: '44_RUNTIME_EVIDENCE_INDEX.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Playwright HAR, headers, HTML sha256, and probe telemetry index.', descriptionTr: 'Çalışma zamanı HAR kayıtları, başlıklar ve HTML parmak izi indeksi.' },
  { code: 'DELIV-45', filename: '45_N8N_AI_INTELLIGENCE_WORKFLOW.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: '25-node importable continuous intelligence DAG workflow.', descriptionTr: 'Doğrudan n8n içine aktarılabilir 25 düğümlü sürekli istihbarat iş akışı.' },
  { code: 'DELIV-46', filename: '46_N8N_RUNBOOK.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Operational deployment and secret management runbook for n8n DAG.', descriptionTr: 'n8n iş akışı için operasyonel kurulum, gizli anahtar ve çalıştırma el kitabı.' },
  { code: 'DELIV-47', filename: '47_N8N_DLQ_PROOF.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Controlled failure test log proving DLQ isolation and circuit breaker.', descriptionTr: 'DLQ kuyruk izolasyonunu ve devre kesiciyi kanıtlayan gerçek arıza testi JSON kaydı.' },
  { code: 'DELIV-48', filename: '48_ROOT_CAUSE_GRAPH.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Trade-secret failure deduplication graph and shared interventions.', descriptionTr: 'Ham hataları kök nedenlere ve ortak mühendislik müdahalelerine indirgeyen graf.' },
  { code: 'DELIV-49', filename: '49_OPPORTUNITY_PRIORITY.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Proprietary Opportunity Priority formula ranking P0-P3 interventions.', descriptionTr: 'Ticari etki, kapanma beklentisi ve maliyete göre önceliklendirilmiş P0-P3 reçeteleri.' },
  { code: 'DELIV-50', filename: '50_BASELINE_MEASUREMENT.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Frozen baseline measurement state for longitudinal tracking.', descriptionTr: 'Zaman serisi ve 12 haftalık takip için dondurulmuş başlangıç ölçüm durumu.' },
  { code: 'DELIV-51', filename: '51_RESCAN_DELTA_REPORT.md', tier: 'ENTERPRISE_AI_999', format: 'MD', descriptionEn: 'Formal 30-day comparable rescan delta report.', descriptionTr: '30 günlük resmi karşılaştırmalı yeniden tarama delta raporu.' },
  { code: 'DELIV-52', filename: '52_AUDIT_TRAIL.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'Cryptographic execution ledger, rule versions, and input hashes.', descriptionTr: 'Kriptografik yürütme defteri, kural versiyonları ve girdi parmak izleri.' },
  { code: 'DELIV-53', filename: '53_PACKAGE_MANIFEST.json', tier: 'ENTERPRISE_AI_999', format: 'JSON', descriptionEn: 'SHA-256 package integrity manifest across all 24 deliverables.', descriptionTr: 'Tüm 24 teslimat dosyası için SHA-256 bütünlük ve paket manifestosu.' },
];
