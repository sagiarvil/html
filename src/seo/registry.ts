import type { SeoPageRecord } from './registry.types';

export const BASE_ORGANIZATION_ENTITY = {
  id: 'https://htmlandhtml.com/#organization',
  name: 'htmlandhtml',
  type: 'Organization' as const,
  sameAs: [
    'https://www.wikidata.org/wiki/Q11589432',
    'https://www.linkedin.com/company/htmlandhtml',
    'https://www.crunchbase.com/organization/htmlandhtml',
  ],
};

export const SEO_REGISTRY: SeoPageRecord[] = [
  {
    route: '/',
    locale: 'tr',
    role: 'home',
    indexDirective: 'index, follow',
    canonicalRoute: '/',
    title: 'Yapay Zeka Sizi Tavsiye Ediyor mu? | htmlandhtml.com',
    metaDescription: '18 motor, 105 kontrol, 13 istihbarat denetimi. URL girin, AI görünürlüğünüzü ücretsiz kontrol edin. Onarım Seti — $99.',
    h1: 'Yapay Zeka Sizi Tavsiye Ediyor mu?',
    primaryIntent: 'ai search visibility audit and remediation turkish',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'providesSolution', object: 'AI Visibility Remediation Set' },
      { subject: 'htmlandhtml', predicate: 'compliesWith', object: 'LLMs.txt v1.1 RFC' },
      { subject: 'htmlandhtml', predicate: 'hasInformationGain', object: '18-Engine Deterministic Chain' },
    ],
    heroAnswerEngine: 'htmlandhtml.com, 18 motorlu deterministik zincir ile web sitenizin ChatGPT, Claude, Perplexity ve Google Gemini nezdindeki görünürlüğünü ücretsiz tarar. 105 kontrol noktası, 13 istihbarat denetimi ve 30x LLMS.TXT ile $99 Onarım Seti sunar. 30 gün garanti.',
    publishedAt: '2024-01-15T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/home.md',
    breadcrumbs: [
      { name: 'Ana Sayfa', item: 'https://htmlandhtml.com/' }
    ]
  },
  {
    route: '/en/',
    locale: 'en',
    role: 'home',
    indexDirective: 'index, follow',
    canonicalRoute: '/en/',
    title: 'Does AI Recommend You? | htmlandhtml.com',
    metaDescription: '18 engines, 105 controls, 13 intelligence audits. Enter URL to audit AI search visibility. Repair Kit — $99.',
    h1: 'Does AI Recommend You?',
    primaryIntent: 'ai search visibility audit and remediation english',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'providesSolution', object: 'AI Visibility Repair Kit' },
      { subject: 'htmlandhtml', predicate: 'compliesWith', object: 'LLMs.txt v1.1 RFC' },
      { subject: 'htmlandhtml', predicate: 'hasInformationGain', object: '18-Engine Deterministic Chain' },
    ],
    heroAnswerEngine: 'htmlandhtml.com evaluates website visibility across ChatGPT, Claude, Perplexity, and Google Gemini using an 18-engine deterministic chain. Offers a free instant diagnosis across 105 controls and 13 audits, alongside a $99 single-purchase Repair Kit with 22 files and 30x LLMS.TXT.',
    publishedAt: '2024-01-15T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/home.md',
    breadcrumbs: [
      { name: 'Home', item: 'https://htmlandhtml.com/en/' }
    ]
  },
  {
    route: '/tr/fiyatlandirma/',
    locale: 'tr',
    role: 'service',
    indexDirective: 'index, follow',
    canonicalRoute: '/tr/fiyatlandirma/',
    title: 'Fiyatlandırma & Teslimat | htmlandhtml.com',
    metaDescription: '$0 Ücretsiz Teşhis ve $99 Tek Seferlik Yapay Zeka Onarım Seti. 18 motor, 105 kontrol, 22 teslimat dosyası.',
    h1: 'Fiyatlandırma & Teslimat',
    primaryIntent: 'pricing and delivery specification turkish',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Free Diagnosis $0' },
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Fix Mandate Repair Kit $99' },
      { subject: 'htmlandhtml', predicate: 'paymentProvider', object: 'Paddle Global Merchant of Record' },
    ],
    heroAnswerEngine: 'htmlandhtml.com şeffaf 2 aşamalı ticari model sunar: $0 Ücretsiz Teşhis (18 motor, anında sonuç) ve $99 Onarım Seti (22 dosya, 30x LLMS.TXT, ICS takvimli yol haritası). Abonelik yoktur, Paddle güvencesiyle tek seferlik ödemedir.',
    publishedAt: '2024-02-01T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/pricing.md',
    breadcrumbs: [
      { name: 'Ana Sayfa', item: 'https://htmlandhtml.com/' },
      { name: 'Fiyatlandırma', item: 'https://htmlandhtml.com/tr/fiyatlandirma/' }
    ]
  },
  {
    route: '/en/pricing/',
    locale: 'en',
    role: 'service',
    indexDirective: 'index, follow',
    canonicalRoute: '/en/pricing/',
    title: 'Pricing & Delivery | htmlandhtml.com',
    metaDescription: '$0 Free Diagnosis and $99 One-Time AI Repair Kit. 18 engines, 105 controls, 22 delivery files.',
    h1: 'Pricing & Delivery',
    primaryIntent: 'pricing and delivery specification english',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Free Diagnosis $0' },
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Fix Mandate Repair Kit $99' },
      { subject: 'htmlandhtml', predicate: 'paymentProvider', object: 'Paddle Global Merchant of Record' },
    ],
    heroAnswerEngine: 'htmlandhtml.com operates on a transparent 2-tier model: $0 Free Diagnosis (18 engines, instant results) and $99 Fix Mandate Repair Kit (22 files, 30x LLMS.TXT, ICS priority roadmap). Zero subscription fees, one-time payment processed globally by Paddle.',
    publishedAt: '2024-02-01T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/pricing.md',
    breadcrumbs: [
      { name: 'Home', item: 'https://htmlandhtml.com/en/' },
      { name: 'Pricing', item: 'https://htmlandhtml.com/en/pricing/' }
    ]
  },
  {
    route: '/checkout',
    locale: 'en',
    role: 'service',
    indexDirective: 'noindex, follow',
    canonicalRoute: '/checkout',
    title: 'Order AI Visibility Repair Kit ($99) | htmlandhtml.com',
    metaDescription: 'Instant delivery of 22 implementation files, 30x LLMS.TXT, and deterministic code fixes for $99.',
    h1: 'Order AI Visibility Repair Kit',
    primaryIntent: 'checkout purchase repair kit',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'delivers', object: '22-File Remediation Package' },
      { subject: 'htmlandhtml', predicate: 'pricePoint', object: '99 USD One-Time' },
      { subject: 'htmlandhtml', predicate: 'guarantee', object: '30-Day Deterministic Verification' },
    ],
    heroAnswerEngine: 'Secure checkout for the $99 AI Visibility Repair Kit. Complete delivery of 22 files including priority roadmap, ICS integration, acceptance tests, rollback plan, and 30 custom per-page LLMS.TXT surfaces. Powered securely by Paddle Merchant of Record.',
    publishedAt: '2024-02-01T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/pricing.md',
    breadcrumbs: [
      { name: 'Home', item: 'https://htmlandhtml.com/' },
      { name: 'Checkout', item: 'https://htmlandhtml.com/checkout' }
    ]
  },
  {
    route: '/methodology.html',
    locale: 'en',
    role: 'article',
    indexDirective: 'index, follow',
    canonicalRoute: '/methodology.html',
    title: '18-Engine AI Search Visibility Methodology | htmlandhtml.com',
    metaDescription: 'Deterministic evaluation methodology across 18 engines, 105 controls, and 6 evaluation chains.',
    h1: 'AI Search Visibility Evaluation Methodology',
    primaryIntent: 'methodology and technical specifications',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'definesMethodology', object: '18-Engine Deterministic Chain' },
      { subject: 'htmlandhtml', predicate: 'implementsStandard', object: 'US Patent 10296574B2 Information Gain' },
      { subject: 'htmlandhtml', predicate: 'evaluates', object: '105 Control Points' },
    ],
    heroAnswerEngine: 'The 18-Engine Deterministic Methodology provides reproducible, bit-for-bit verifiable evaluation of web architecture for generative AI systems. Evaluating across Pre-Training, Retrieval, Entity Lock, Infrastructure, Defense, and Autonomous chains with zero random heuristics.',
    publishedAt: '2024-02-15T00:00:00+03:00',
    modifiedAt: '2026-09-07T22:00:00+03:00',
    llmSubGraphRoute: '/llms/pages/services.md',
    breadcrumbs: [
      { name: 'Home', item: 'https://htmlandhtml.com/' },
      { name: 'Methodology', item: 'https://htmlandhtml.com/methodology.html' }
    ]
  }
];
