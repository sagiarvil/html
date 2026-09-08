/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Vertical Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 16)
 */

export type VerticalPackId = 'ECOMMERCE' | 'SAAS_B2B' | 'LOCAL' | 'REGULATED_YMYL' | 'PUBLISHER' | 'GENERAL';

export interface VerticalPackDefinition {
  id: VerticalPackId;
  nameEn: string;
  nameTr: string;
  requiredSchemas: string[];
  mandatoryControls: string[];
  hallucinationMultiplier: number;
  descriptionEn: string;
  descriptionTr: string;
}

export const CANONICAL_VERTICAL_PACKS: Record<VerticalPackId, VerticalPackDefinition> = {
  ECOMMERCE: {
    id: 'ECOMMERCE',
    nameEn: 'E-Commerce & Digital Merchandising Vector Pack',
    nameTr: 'E-Ticaret & Dijital Satış Vektör Paketi',
    requiredSchemas: ['Product', 'Offer', 'AggregateRating', 'MerchantReturnPolicy'],
    mandatoryControls: [
      'product_price_currency_integrity',
      'inventory_availability_freshness',
      'shipping_and_returns_explicitness',
      'variant_canonical_disambiguation',
      'price_hallucination_prevention',
    ],
    hallucinationMultiplier: 1.5,
    descriptionEn: 'Evaluates product entity consistency, transactional agent feasibility, and commercial bot parity.',
    descriptionTr: 'Ürün şemaları, fiyat tutarlılığı ve alışveriş botları için çıkarma doğruluğunu denetler.',
  },
  SAAS_B2B: {
    id: 'SAAS_B2B',
    nameEn: 'SaaS & Enterprise B2B Vector Pack',
    nameTr: 'SaaS & Kurumsal B2B Vektör Paketi',
    requiredSchemas: ['SoftwareApplication', 'Organization', 'TechArticle', 'FAQPage'],
    mandatoryControls: [
      'pricing_tier_honesty_and_clarity',
      'api_documentation_discoverability',
      'integration_ecosystem_verification',
      'alternative_comparison_coverage',
      'feature_capability_hallucination_defense',
    ],
    hallucinationMultiplier: 1.25,
    descriptionEn: 'Evaluates SoftwareApplication entities, API/docs access, competitor displacement, and capability claims.',
    descriptionTr: 'Yazılım şeması, API dokümantasyonu, rakip kıyaslama ve yetenek doğrulamalarını denetler.',
  },
  LOCAL: {
    id: 'LOCAL',
    nameEn: 'Local Business & Multi-Location Vector Pack',
    nameTr: 'Yerel İşletme & Lokasyon Vektör Paketi',
    requiredSchemas: ['LocalBusiness', 'PostalAddress', 'GeoCoordinates', 'OpeningHoursSpecification'],
    mandatoryControls: [
      'nap_name_address_phone_consistency',
      'opening_hours_temporal_precision',
      'geo_coordinate_pin_accuracy',
      'maps_and_profile_parity',
      'local_intent_answer_coverage',
    ],
    hallucinationMultiplier: 1.2,
    descriptionEn: 'Audits physical entity accuracy, NAP consistency, and geo-targeted answer engine citation.',
    descriptionTr: 'Fiziksel işletme doğruluğu, adres/telefon tutarlılığı ve harita verilerini denetler.',
  },
  REGULATED_YMYL: {
    id: 'REGULATED_YMYL',
    nameEn: 'Regulated & YMYL (Finance/Health/Legal) Vector Pack',
    nameTr: 'Regüle & YMYL (Finans/Sağlık/Hukuk) Vektör Paketi',
    requiredSchemas: ['MedicalEntity', 'FinancialProduct', 'Legislation', 'Person'],
    mandatoryControls: [
      'author_credential_and_license_verification',
      'claim_evidence_and_citation_depth',
      'mandatory_regulatory_disclosures',
      'strict_factual_hallucination_elimination',
      'counsel_boundary_enforcement',
    ],
    hallucinationMultiplier: 2.5,
    descriptionEn: 'Applies strict evidence thresholds, expert verification, and severe penalty for factual hallucinations.',
    descriptionTr: 'Aşırı sıkı kanıt eşikleri, lisans doğrulaması ve halüsinasyon durumunda yüksek risk çarpanı uygular.',
  },
  PUBLISHER: {
    id: 'PUBLISHER',
    nameEn: 'Publisher & Digital Media Vector Pack',
    nameTr: 'Yayıncılık & Dijital Medya Vektör Paketi',
    requiredSchemas: ['NewsArticle', 'Article', 'Person', 'WebSite'],
    mandatoryControls: [
      'editorial_byline_and_author_authority',
      'publication_and_modification_freshness',
      'syndication_and_canonical_attribution',
      'tdm_copyright_reservation_clarity',
      'provenance_and_c2pa_readiness',
    ],
    hallucinationMultiplier: 1.3,
    descriptionEn: 'Evaluates editorial provenance, NewsArticle schema, EU TDM reservations, and syndication integrity.',
    descriptionTr: 'Haber şemaları, yazar künyeleri, TDM telif hakları çekincesi ve kaynak gösterimini denetler.',
  },
  GENERAL: {
    id: 'GENERAL',
    nameEn: 'General Web Vector Pack',
    nameTr: 'Genel Web Vektör Paketi',
    requiredSchemas: ['WebSite', 'Organization'],
    mandatoryControls: ['basic_schema_integrity', 'canonical_url_consistency'],
    hallucinationMultiplier: 1.0,
    descriptionEn: 'Fallback vector pack for multi-disciplinary or general informative domains.',
    descriptionTr: 'Belirli bir dikey sektöre doğrudan girmeyen genel siteler için temel kontrol paketi.',
  },
};

export function resolveVertical(category?: string, detectedSchemas: string[] = []): VerticalPackDefinition {
  if (category) {
    const c = category.toUpperCase();
    if (c.includes('COMMERCE') || c.includes('SHOP') || c.includes('RETAIL')) return CANONICAL_VERTICAL_PACKS.ECOMMERCE;
    if (c.includes('SAAS') || c.includes('SOFTWARE') || c.includes('B2B') || c.includes('TECH')) return CANONICAL_VERTICAL_PACKS.SAAS_B2B;
    if (c.includes('LOCAL') || c.includes('MAPS') || c.includes('CLINIC') || c.includes('RESTAURANT')) return CANONICAL_VERTICAL_PACKS.LOCAL;
    if (c.includes('FINANCE') || c.includes('HEALTH') || c.includes('LEGAL') || c.includes('YMYL')) return CANONICAL_VERTICAL_PACKS.REGULATED_YMYL;
    if (c.includes('NEWS') || c.includes('MEDIA') || c.includes('BLOG') || c.includes('PUBLISHER')) return CANONICAL_VERTICAL_PACKS.PUBLISHER;
  }
  if (detectedSchemas.includes('Product') || detectedSchemas.includes('Offer')) return CANONICAL_VERTICAL_PACKS.ECOMMERCE;
  if (detectedSchemas.includes('SoftwareApplication')) return CANONICAL_VERTICAL_PACKS.SAAS_B2B;
  if (detectedSchemas.includes('LocalBusiness')) return CANONICAL_VERTICAL_PACKS.LOCAL;
  if (detectedSchemas.includes('NewsArticle')) return CANONICAL_VERTICAL_PACKS.PUBLISHER;
  return CANONICAL_VERTICAL_PACKS.SAAS_B2B; // Default for htmlandhtml target
}
