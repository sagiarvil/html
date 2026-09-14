export type GoogleSearchRegion = 'EEA' | 'TR' | 'ZA';
export type GoogleRegionalFeature =
  | 'aggregator_unit'
  | 'supplier_unit'
  | 'ecosystem_carousel'
  | 'job_sites'
  | 'places_sites'
  | 'structured_data_carousel';

export type GoogleRegionalQueryClass =
  | 'hotels'
  | 'flights'
  | 'ground_transportation'
  | 'products'
  | 'weather'
  | 'sports'
  | 'finance'
  | 'translate'
  | 'jobs'
  | 'local_businesses'
  | 'things_to_do'
  | 'vacation_rentals'
  | 'food_delivery'
  | 'car_hire';

export type RegionalEligibilityStatus =
  | 'ELIGIBLE_PATH'
  | 'REGION_UNSUPPORTED'
  | 'QUERY_UNSUPPORTED'
  | 'REQUIRES_ELIGIBILITY_CHECK'
  | 'UNKNOWN_REGION';

export interface RegionalFeatureRule {
  readonly feature: GoogleRegionalFeature;
  readonly regions: readonly GoogleSearchRegion[];
  readonly queryClasses: readonly GoogleRegionalQueryClass[];
  readonly requiresMarkup: boolean;
  readonly requiresExternalEligibility: boolean;
  readonly sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026';
}

export interface RegionalSearchEvaluation {
  readonly status: RegionalEligibilityStatus;
  readonly regionSupported: boolean | null;
  readonly querySupported: boolean | null;
  readonly requiresMarkup: boolean | null;
  readonly requiresExternalEligibility: boolean | null;
  readonly sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026';
  readonly boundary: string;
}

/**
 * Official Google Search Central feature/region/query matrix, verified 2026-09-14.
 * This is an eligibility/readiness control only. It MUST NOT be interpreted as
 * a ranking factor, ranking boost, traffic guarantee, or proof of participation.
 */
export const GOOGLE_REGIONAL_SEARCH_FEATURES: readonly RegionalFeatureRule[] = [
  {
    feature: 'aggregator_unit',
    regions: ['EEA'],
    queryClasses: ['hotels', 'flights', 'ground_transportation', 'products'],
    requiresMarkup: false,
    requiresExternalEligibility: true,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'supplier_unit',
    regions: ['EEA'],
    queryClasses: ['hotels', 'flights', 'ground_transportation', 'products'],
    requiresMarkup: false,
    requiresExternalEligibility: true,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'ecosystem_carousel',
    regions: ['EEA'],
    queryClasses: ['weather', 'sports', 'finance', 'translate'],
    requiresMarkup: false,
    requiresExternalEligibility: true,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'job_sites',
    regions: ['EEA'],
    queryClasses: ['jobs'],
    requiresMarkup: false,
    requiresExternalEligibility: true,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'places_sites',
    regions: ['TR'],
    queryClasses: ['hotels', 'local_businesses'],
    requiresMarkup: false,
    requiresExternalEligibility: true,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'structured_data_carousel',
    regions: ['EEA'],
    queryClasses: ['hotels', 'local_businesses', 'things_to_do', 'products', 'ground_transportation', 'flights', 'vacation_rentals'],
    requiresMarkup: true,
    requiresExternalEligibility: false,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'structured_data_carousel',
    regions: ['ZA'],
    queryClasses: ['hotels', 'things_to_do', 'flights', 'products', 'food_delivery', 'car_hire', 'vacation_rentals', 'ground_transportation'],
    requiresMarkup: true,
    requiresExternalEligibility: false,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
  {
    feature: 'structured_data_carousel',
    regions: ['TR'],
    queryClasses: ['hotels', 'local_businesses', 'vacation_rentals'],
    requiresMarkup: true,
    requiresExternalEligibility: false,
    sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
  },
] as const;

export function evaluateGoogleRegionalSearchExperience(input: {
  region?: string | null;
  feature: GoogleRegionalFeature;
  queryClass: GoogleRegionalQueryClass;
}): RegionalSearchEvaluation {
  const normalizedRegion = input.region?.trim().toUpperCase() || '';
  if (!['EEA', 'TR', 'ZA'].includes(normalizedRegion)) {
    return {
      status: 'UNKNOWN_REGION',
      regionSupported: null,
      querySupported: null,
      requiresMarkup: null,
      requiresExternalEligibility: null,
      sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
      boundary: 'Region is missing or outside the current official matrix. Do not infer ineligibility from missing evidence.',
    };
  }

  const region = normalizedRegion as GoogleSearchRegion;
  const featureRules = GOOGLE_REGIONAL_SEARCH_FEATURES.filter((rule) => rule.feature === input.feature);
  const regionalRules = featureRules.filter((rule) => rule.regions.includes(region));

  if (!regionalRules.length) {
    return {
      status: 'REGION_UNSUPPORTED',
      regionSupported: false,
      querySupported: null,
      requiresMarkup: null,
      requiresExternalEligibility: null,
      sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
      boundary: 'The selected feature is not documented by Google as available for this region in the current matrix.',
    };
  }

  const matchingRule = regionalRules.find((rule) => rule.queryClasses.includes(input.queryClass));
  if (!matchingRule) {
    return {
      status: 'QUERY_UNSUPPORTED',
      regionSupported: true,
      querySupported: false,
      requiresMarkup: null,
      requiresExternalEligibility: null,
      sourceId: 'GOOGLE-REGIONAL-SEARCH-EXPERIENCE-2026',
      boundary: 'The feature is regionally available, but Google does not document this query class as eligible for it.',
    };
  }

  return {
    status: matchingRule.requiresExternalEligibility ? 'REQUIRES_ELIGIBILITY_CHECK' : 'ELIGIBLE_PATH',
    regionSupported: true,
    querySupported: true,
    requiresMarkup: matchingRule.requiresMarkup,
    requiresExternalEligibility: matchingRule.requiresExternalEligibility,
    sourceId: matchingRule.sourceId,
    boundary: matchingRule.requiresExternalEligibility
      ? 'Regional/query prerequisites match, but participation still requires Google-side eligibility or approval. Do not report PASS without external verification.'
      : 'Regional/query prerequisites match. This indicates an implementation path, not guaranteed Search appearance or ranking benefit.',
  };
}
