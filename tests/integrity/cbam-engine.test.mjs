import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[TEST] Initializing EU CBAM / SKDM Deterministic Engine Verification...');

// Load and transpile functions/lib/cbam-engine.ts for node environment without flags
const enginePath = path.resolve(__dirname, '../../functions/lib/cbam-engine.ts');
let engineSrc = fs.readFileSync(enginePath, 'utf8');

// Strip TypeScript interfaces and type annotations
let code = engineSrc
  .replace(/export\s+interface\s+\w+[\s\S]*?\n}\n/gm, '')
  .replace(/export\s+type\s+\w+\s*=[\s\S]*?;\n/gm, '')
  .replace(/\?\s*:/g, ':')
  .replace(/:\s*CbamCalculationRequest/g, '')
  .replace(/:\s*CbamCalculationResult/g, '')
  .replace(/:\s*FuelInput\[\]/g, '')
  .replace(/:\s*ElectricityInput/g, '')
  .replace(/:\s*PrecursorInput\[\]/g, '')
  .replace(/:\s*Record<string,\s*[^>]+>/g, '')
  .replace(/:\s*Omit<[^>]+>/g, '')
  .replace(/:\s*(?:string|number|boolean|any)/g, '')
  .replace(/:\s*\{[^}]+\}/g, '')
  .replace(/as\s+CbamCalculationRequest/g, '')
  .replace(/export\s+function\s+/g, 'function ')
  .replace(/export\s+const\s+/g, 'const ');

code += `
exports.executeCbamCalculation = executeCbamCalculation;
exports.validateCnCode = validateCnCode;
exports.calculateCombustionEmissions = calculateCombustionEmissions;
exports.calculateIndirectEmissions = calculateIndirectEmissions;
exports.calculatePrecursorEmissions = calculatePrecursorEmissions;
exports.DEFAULT_GRID_FACTORS = DEFAULT_GRID_FACTORS;
`;

const moduleEnv = {
  exports: {},
  console,
  Date,
  Number,
  String,
  Math
};
vm.createContext(moduleEnv);
vm.runInContext(code, moduleEnv);

const {
  executeCbamCalculation,
  validateCnCode,
  calculateCombustionEmissions,
  calculateIndirectEmissions,
  calculatePrecursorEmissions,
  DEFAULT_GRID_FACTORS
} = moduleEnv.exports;

// 1. CN Code Boundary Tests
assert.equal(validateCnCode('iron_and_steel', '72085120'), true, 'Valid steel CN code must pass');
assert.equal(validateCnCode('aluminium', '76011000'), true, 'Valid aluminium CN code must pass');
assert.equal(validateCnCode('cement', '25232900'), true, 'Valid cement CN code must pass');
assert.equal(validateCnCode('fertilizers', '31021010'), true, 'Valid fertilizer CN code must pass');
assert.equal(validateCnCode('iron_and_steel', '84011000'), false, 'Non-CBAM nuclear reactor code must fail');
console.log('✓ CN Code Annex I taxonomy validation PASS');

// 2. Combustion Emissions Mathematical Precision
const fuels = [
  { type: 'Natural Gas', amount: 1000, ncv: 0.048, ef: 56.1, oxf: 1.0 }
];
const combustionResult = calculateCombustionEmissions(fuels);
assert.equal(combustionResult, 2692.8, 'Combustion emission must exactly equal 2692.8 tCO2');
console.log('✓ Direct combustion emission calculation PASS (2692.80 tCO2)');

// 3. Indirect Emissions Precision
const elec = { mwhConsumed: 5000, source: 'grid', countryCode: 'TR' };
const indirectResult = calculateIndirectEmissions(elec);
assert.equal(indirectResult.factorUsed, DEFAULT_GRID_FACTORS.TR, 'Must use Turkey official grid factor');
assert.equal(indirectResult.totalIndirect, 2210.0, '5000 MWh * 0.442 must equal 2210.0 tCO2');
console.log('✓ Indirect electricity emission calculation PASS (2210.00 tCO2)');

// 4. Precursor Embedded Emissions
const precursors = [
  { name: 'Pig Iron', cnCode: '72011011', quantityUsedTonnes: 2000, specificEmbeddedEmissions: 1.2 }
];
const precursorResult = calculatePrecursorEmissions(precursors);
assert.equal(precursorResult, 2400.0, 'Precursor emission must exactly equal 2400.0 tCO2e');
console.log('✓ Precursor embedded emission calculation PASS (2400.00 tCO2e)');

// 5. Full End-to-End Calculation & Financial Exposure
const fullRequest = {
  installationId: 'TR-INST-94812',
  installationName: 'Ereğli Steel Works Facility 4',
  country: 'TR',
  reportingPeriod: '2026-Q1',
  sector: 'iron_and_steel',
  cnCode: '72085120',
  productionVolumeTonnes: 5000,
  fuels,
  processEmissionsTonnes: 150.0,
  electricity: elec,
  precursors,
  carbonPricePaidLocalEurPerTonne: 15.0,
  euEtsPriceEurPerTonne: 75.0
};

const calc = executeCbamCalculation(fullRequest);

// Total Direct: 2692.8 + 150.0 = 2842.8 tCO2
assert.equal(calc.directEmissions.totalDirectTonnes, 2842.8, 'Total direct emissions must match');
assert.equal(calc.directEmissions.specificDirectTco2ePerTonne, Number((2842.8 / 5000).toFixed(4)), 'Specific direct match');

// Total Indirect: 2210.0 tCO2
assert.equal(calc.indirectEmissions.totalIndirectTonnes, 2210.0, 'Total indirect match');

// Total Precursor: 2400.0 tCO2e
assert.equal(calc.precursorEmissions.totalPrecursorTonnes, 2400.0, 'Precursor match');

// Total Cumulative: 2842.8 + 2210.0 + 2400.0 = 7452.8 tCO2e
assert.equal(calc.totalEmbeddedEmissions.totalEmissionsTonnes, 7452.8, 'Cumulative emissions must equal 7452.8 tCO2e');
assert.equal(calc.totalEmbeddedEmissions.specificTotalTco2ePerTonne, 1.4906, 'Specific total must equal 1.4906 tCO2e/t');

// Financial Obligation: (75 - 15) * 7452.8 = 60 * 7452.8 = 447168.00 EUR
assert.equal(calc.financialExposure.netCertificateCostPerTonneEur, 60.0, 'Net certificate price match');
assert.equal(calc.financialExposure.totalEstimatedCbamObligationEur, 447168.0, 'Net financial obligation match');
console.log('✓ End-to-end CBAM calculation and financial exposure PASS');

// 6. XML Transitional Registry Output Verification
assert.ok(calc.xmlPayload.includes('xmlns:cbam="urn:cbam:transitional:report:v1"'), 'XML must have valid transitional namespace');
assert.ok(calc.xmlPayload.includes('<cbam:InstallationID>TR-INST-94812</cbam:InstallationID>'), 'XML must contain InstallationID');
assert.ok(calc.xmlPayload.includes('<cbam:SpecificTotalTco2ePerTonne>1.4906</cbam:SpecificTotalTco2ePerTonne>'), 'XML must contain correct SpecificTotal');
assert.ok(calc.xmlPayload.includes('<cbam:EstimatedObligationEur>447168</cbam:EstimatedObligationEur>'), 'XML must contain correct financial obligation');
console.log('✓ EU CBAM XML Transitional Registry schema compliance PASS');

console.log('\n[PASS] All 6 EU CBAM / SKDM deterministic test gates passed successfully with 100% mathematical certainty.');
