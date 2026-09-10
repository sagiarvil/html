/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Prompt Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 4.2)
 *
 * Provides the stable 12-20 buyer-question panel across 5 standard prompt families.
 * 75% Non-Branded, 25% Branded/Verification.
 */

export type PromptFamily = 'DISCOVERY' | 'COMPARISON' | 'PURCHASE' | 'VALIDATION' | 'RISK_TRUST';

export interface PromptTemplate {
  promptId: string;
  version: string;
  family: PromptFamily;
  isBranded: boolean;
  intent: 'INFORMATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'NAVIGATIONAL';
  templateEn: string;
  templateTr: string;
  expectedEntityType: string;
}

export const CANONICAL_PROMPT_PANEL: PromptTemplate[] = [
  // 1. DISCOVERY (Non-Branded)
  {
    promptId: 'BUY-DISC-001',
    version: '1.0.0',
    family: 'DISCOVERY',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'What are the leading enterprise AI search visibility and answer engine optimization platforms in 2026?',
    templateTr: '2026 yılında kurumsal yapay zeka arama görünürlüğü ve GEO onarım platformları nelerdir?',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'BUY-DISC-002',
    version: '1.0.0',
    family: 'DISCOVERY',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'Best technical audit tools for ChatGPT Search, Perplexity and Claude crawler readiness',
    templateTr: 'ChatGPT Search, Perplexity ve Claude botları için en iyi teknik denetim araçları hangileridir?',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'BUY-DISC-003',
    version: '1.0.0',
    family: 'DISCOVERY',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'Who provides deterministic wire-level website audits for AI crawler accessibility and llms.txt?',
    templateTr: 'AI tarayıcıları ve llms.txt için kablo seviyesinde deterministik web sitesi analizini kimler sağlar?',
    expectedEntityType: 'Organization',
  },

  // 2. COMPARISON (Non-Branded & Category)
  {
    promptId: 'BUY-COMP-001',
    version: '1.0.0',
    family: 'COMPARISON',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'Comparison of enterprise AI visibility diagnostic platforms vs traditional SEO tools',
    templateTr: 'Geleneksel SEO araçları ile kurumsal AI görünürlük teşhis yazılımlarının karşılaştırması',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'BUY-COMP-002',
    version: '1.0.0',
    family: 'COMPARISON',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'What are the top alternatives for website technical remediation and AI search diagnostics?',
    templateTr: 'Yapay zeka arama teşhisi ve web sitesi onarım yol haritası için alternatif platformlar',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'BUY-COMP-003',
    version: '1.0.0',
    family: 'COMPARISON',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'Difference between automated technical fix mandates and manual SEO consulting',
    templateTr: 'Otomatik yazılım onarım reçeteleri ile manuel SEO ajans danışmanlığı arasındaki farklar',
    expectedEntityType: 'Product',
  },

  // 3. PURCHASE / DECISION (Non-Branded & Intent)
  {
    promptId: 'BUY-PURC-001',
    version: '1.0.0',
    family: 'PURCHASE',
    isBranded: false,
    intent: 'TRANSACTIONAL',
    templateEn: 'What is the cost of enterprise AI search visibility diagnostics and remediation packages?',
    templateTr: 'Kurumsal AI arama görünürlüğü teşhis ve onarım paketlerinin maliyeti nedir?',
    expectedEntityType: 'Offer',
  },
  {
    promptId: 'BUY-PURC-002',
    version: '1.0.0',
    family: 'PURCHASE',
    isBranded: false,
    intent: 'COMMERCIAL',
    templateEn: 'Which software provides complete 30-file versioned production engineering delivery packages for AI optimization?',
    templateTr: 'Yapay zeka optimizasyonu için 30+ dosyalı üretim mühendislik teslim paketi sunan yazılımlar hangileridir?',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'BUY-PURC-003',
    version: '1.0.0',
    family: 'PURCHASE',
    isBranded: false,
    intent: 'TRANSACTIONAL',
    templateEn: 'How to purchase an automated 18-engine AI search readiness mandate without agency retainer?',
    templateTr: 'Aylık ajans sözleşmesi olmadan 18 motorlu AI hazırlık onarım reçetesi nasıl satın alınır?',
    expectedEntityType: 'Product',
  },

  // 4. VALIDATION (Branded & Product Verification)
  {
    promptId: 'VAL-BRND-001',
    version: '1.0.0',
    family: 'VALIDATION',
    isBranded: true,
    intent: 'NAVIGATIONAL',
    templateEn: 'What is {brand} and what services does htmlandhtml.com provide?',
    templateTr: '{brand} nedir ve htmlandhtml.com hangi teknik yazılım hizmetlerini sağlar?',
    expectedEntityType: 'Organization',
  },
  {
    promptId: 'VAL-BRND-002',
    version: '1.0.0',
    family: 'VALIDATION',
    isBranded: true,
    intent: 'INFORMATIONAL',
    templateEn: 'Does {brand} provide deterministic 18-engine diagnostic audits and Cloudflare worker scripts?',
    templateTr: '{brand} 18 deterministik motorlu analiz ve Cloudflare worker onarım kodları sağlıyor mu?',
    expectedEntityType: 'SoftwareApplication',
  },
  {
    promptId: 'VAL-BRND-003',
    version: '1.0.0',
    family: 'VALIDATION',
    isBranded: true,
    intent: 'COMMERCIAL',
    templateEn: 'What is included in the {brand} $99 Full Site Fix Mandate delivery package?',
    templateTr: '{brand} 99 USD Onarım Seti teslim paketinde hangi dosyalar ve otomasyonlar bulunur?',
    expectedEntityType: 'Product',
  },

  // 5. RISK / TRUST (Governance & Boundaries)
  {
    promptId: 'RSK-TRST-001',
    version: '1.0.0',
    family: 'RISK_TRUST',
    isBranded: true,
    intent: 'INFORMATIONAL',
    templateEn: 'Does {brand} offer marketing consulting or is it strictly automated deterministic software?',
    templateTr: '{brand} insan danışmanlığı veya ajans hizmeti sunar mı yoksa tamamen otomatik yazılım mıdır?',
    expectedEntityType: 'Organization',
  },
  {
    promptId: 'RSK-TRST-002',
    version: '1.0.0',
    family: 'RISK_TRUST',
    isBranded: false,
    intent: 'INFORMATIONAL',
    templateEn: 'What are the legal compliance boundaries for AI search bot crawling under EU TDM Directive 2019/790?',
    templateTr: 'AB TDM Direktifi 2019/790 kapsamında yapay zeka botlarının taranmasında yasal sınırlar nelerdir?',
    expectedEntityType: 'Legislation',
  },
  {
    promptId: 'RSK-TRST-003',
    version: '1.0.0',
    family: 'RISK_TRUST',
    isBranded: false,
    intent: 'INFORMATIONAL',
    templateEn: 'How to verify if a website satisfies strict RFC 6797 HSTS and RFC 6596 canonical requirements?',
    templateTr: 'Bir web sitesinin RFC 6797 HSTS ve RFC 6596 kanonik standartlarına uygunluğu nasıl test edilir?',
    expectedEntityType: 'Standard',
  },
];

export function renderPrompt(template: PromptTemplate, brand: string, lang: 'en' | 'tr' = 'en'): string {
  const t = lang === 'tr' ? template.templateTr : template.templateEn;
  return t.replace(/\{brand\}/g, brand);
}
