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
    title: 'Yapay Zeka SEO Analizi ve AI Görünürlük Testi | HTML&HTML',
    metaDescription: 'Web sitenizin ChatGPT, Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz ölçün. 18 motor, 105 kontrol ve $99 uygulama paketi.',
    h1: 'Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?',
    primaryIntent: 'yapay zeka seo analizi ve ai görünürlük testi',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'providesSolution', object: 'AI Visibility Remediation Set' },
      { subject: 'htmlandhtml', predicate: 'publishesProposal', object: 'llms.txt' },
      { subject: 'htmlandhtml', predicate: 'hasInformationGain', object: '18-Engine V3 Deterministic Chain' },
    ],
    heroAnswerEngine: 'htmlandhtml.com, 18 motorlu Engine V3 deterministik zinciri ile web sitenizin ChatGPT, Claude, Perplexity ve Google Gemini nezdindeki görünürlüğünü ücretsiz tarar. 105 kontrol noktası, 13 puan dışı istihbarat analizi ve 30x LLMS.TXT ile $99 Onarım Seti sunar. 30 gün içinde yeniden tarama.',
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
    title: 'AI SEO Audit & ChatGPT Visibility Test | HTML&HTML',
    metaDescription: 'Audit your website for ChatGPT, Gemini, Claude and Perplexity visibility. Get evidence from 18 engines and 105 checks; unlock the implementation pack for $99.',
    h1: 'Can ChatGPT, Gemini and Perplexity Find Your Website?',
    primaryIntent: 'ai seo audit and chatgpt visibility test',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'providesSolution', object: 'AI Visibility Repair Kit' },
      { subject: 'htmlandhtml', predicate: 'publishesProposal', object: 'llms.txt' },
      { subject: 'htmlandhtml', predicate: 'hasInformationGain', object: '18-Engine V3 Deterministic Chain' },
    ],
    heroAnswerEngine: 'htmlandhtml.com evaluates website visibility across ChatGPT, Claude, Perplexity, and Google Gemini using an 18-engine Engine V3 deterministic chain. Offers a free instant diagnosis across 105 controls and 13 non-scoring intelligence analyses, alongside a $99 single-purchase Repair Kit with versioned delivery files and 30x LLMS.TXT.',
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
    title: 'AI SEO Analizi: Ücretsiz Test ve $99 Paket | HTML&HTML',
    metaDescription: 'Yapay zeka SEO analizi ücretsizdir. 18 motor ve 105 kontrolün kanıtlarını görün; 30+ dosyalık uygulama paketini tek seferlik $99 ile alın.',
    h1: 'Yapay Zeka SEO Analizi Ücretsiz. Uygulama Paketi $99.',
    primaryIntent: 'yapay zeka seo analiz fiyatı',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Free Diagnosis $0' },
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Fix Mandate Repair Kit $99' },
      { subject: 'htmlandhtml', predicate: 'paymentProvider', object: 'Paddle Global Merchant of Record' },
    ],
    heroAnswerEngine: 'htmlandhtml.com şeffaf 2 aşamalı ticari model sunar: $0 Ücretsiz Teşhis (18 motor, anında sonuç) ve $99 Onarım Seti (sürümlenmiş teslim dosyaları, 30x LLMS.TXT, ICS takvimli yol haritası). Abonelik yoktur, Paddle güvencesiyle tek seferlik ödemedir.',
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
    title: 'AI SEO Audit Pricing: Free Test + $99 Pack | HTML&HTML',
    metaDescription: '$0 Free Diagnosis and $99 One-Time AI Repair Kit. 18 engines, 105 controls, a versioned implementation ZIP.',
    h1: 'Free AI SEO Audit. $99 Implementation Pack.',
    primaryIntent: 'ai seo audit price and implementation pack',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Free Diagnosis $0' },
      { subject: 'htmlandhtml', predicate: 'offersTier', object: 'Fix Mandate Repair Kit $99' },
      { subject: 'htmlandhtml', predicate: 'paymentProvider', object: 'Paddle Global Merchant of Record' },
    ],
    heroAnswerEngine: 'htmlandhtml.com operates on a transparent 2-tier model: $0 Free Diagnosis (18 engines, instant results) and $99 Fix Mandate Repair Kit (versioned delivery files, 30x LLMS.TXT, ICS priority roadmap). Zero subscription fees, one-time payment processed globally by Paddle.',
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
    metaDescription: 'Get 30+ versioned implementation files, page-level AI manifests, deterministic code templates, acceptance tests and rollback plans for $99.',
    h1: 'Order AI Visibility Repair Kit',
    primaryIntent: 'checkout purchase repair kit',
    primaryEntity: BASE_ORGANIZATION_ENTITY,
    semanticTriples: [
      { subject: 'htmlandhtml', predicate: 'delivers', object: 'versioned Remediation Package' },
      { subject: 'htmlandhtml', predicate: 'pricePoint', object: '99 USD One-Time' },
      { subject: 'htmlandhtml', predicate: 'guarantee', object: '30-Day Deterministic Verification' },
    ],
    heroAnswerEngine: 'Secure checkout for the $99 AI Visibility Repair Kit. Complete delivery of versioned delivery files including priority roadmap, ICS integration, acceptance tests, rollback plan, and 30 custom per-page LLMS.TXT surfaces. Powered securely by Paddle Merchant of Record.',
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
      { subject: 'htmlandhtml', predicate: 'definesMethodology', object: '18-Engine V3 Deterministic Chain' },
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
