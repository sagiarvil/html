import assert from 'node:assert/strict';
import {
  GOOGLE_REGIONAL_SEARCH_FEATURES,
  evaluateGoogleRegionalSearchExperience,
} from '../../src/seo/regional-search-experience.ts';

assert.ok(GOOGLE_REGIONAL_SEARCH_FEATURES.length >= 8, 'Regional matrix must contain official feature-region entries');

const trPlaces = evaluateGoogleRegionalSearchExperience({
  region: 'TR',
  feature: 'places_sites',
  queryClass: 'local_businesses',
});
assert.equal(trPlaces.status, 'REQUIRES_ELIGIBILITY_CHECK');
assert.equal(trPlaces.regionSupported, true);
assert.equal(trPlaces.querySupported, true);
assert.equal(trPlaces.requiresMarkup, false);
assert.equal(trPlaces.requiresExternalEligibility, true);

const trCarousel = evaluateGoogleRegionalSearchExperience({
  region: 'TR',
  feature: 'structured_data_carousel',
  queryClass: 'vacation_rentals',
});
assert.equal(trCarousel.status, 'ELIGIBLE_PATH');
assert.equal(trCarousel.requiresMarkup, true);
assert.equal(trCarousel.requiresExternalEligibility, false);

const unsupportedRegion = evaluateGoogleRegionalSearchExperience({
  region: 'TR',
  feature: 'ecosystem_carousel',
  queryClass: 'finance',
});
assert.equal(unsupportedRegion.status, 'REGION_UNSUPPORTED');
assert.equal(unsupportedRegion.regionSupported, false);

const unsupportedQuery = evaluateGoogleRegionalSearchExperience({
  region: 'EEA',
  feature: 'ecosystem_carousel',
  queryClass: 'products',
});
assert.equal(unsupportedQuery.status, 'QUERY_UNSUPPORTED');
assert.equal(unsupportedQuery.regionSupported, true);
assert.equal(unsupportedQuery.querySupported, false);

for (const region of [undefined, null, '', 'US']) {
  const unknown = evaluateGoogleRegionalSearchExperience({
    region,
    feature: 'structured_data_carousel',
    queryClass: 'products',
  });
  assert.equal(unknown.status, 'UNKNOWN_REGION');
  assert.equal(unknown.regionSupported, null);
  assert.equal(unknown.querySupported, null);
}

console.log('REGIONAL SEARCH EXPERIENCE CONTRACT PASS');
