/**
 * CBAM / SKDM (EU Carbon Border Adjustment Mechanism) Deterministic Engine
 * Standards: Regulation (EU) 2023/956 & Implementing Regulation (EU) 2023/1773
 * Scope: Iron & Steel, Aluminium, Cement, Fertilizers, Electricity, Hydrogen
 * Zero simulation: Pure mathematical and deterministic carbon accounting
 */

export interface FuelInput {
  type: string;
  amount: number; // in tonnes or 1000 Nm3
  ncv: number;    // Net Calorific Value (TJ/t or TJ/1000 Nm3)
  ef: number;     // Emission Factor (t CO2/TJ)
  oxf?: number;   // Oxidation factor (default: 1.0)
}

export interface ElectricityInput {
  mwhConsumed: number;
  source: 'grid' | 'direct_line' | 'ppa';
  customEmissionFactor?: number; // tCO2/MWh
  countryCode?: string;         // e.g. 'TR', 'DE'
}

export interface PrecursorInput {
  name: string;
  cnCode: string;
  quantityUsedTonnes: number;
  specificEmbeddedEmissions: number; // tCO2e / tonne precursor
}

export interface CbamCalculationRequest {
  installationId: string;
  installationName: string;
  country: string;
  reportingPeriod: string;
  sector: 'iron_and_steel' | 'aluminium' | 'cement' | 'fertilizers' | 'electricity' | 'hydrogen';
  cnCode: string; // Combined Nomenclature (GTİP) 8-digit
  productionVolumeTonnes: number;
  fuels: FuelInput[];
  processEmissionsTonnes?: number;
  electricity: ElectricityInput;
  precursors?: PrecursorInput[];
  carbonPricePaidLocalEurPerTonne?: number;
  euEtsPriceEurPerTonne?: number;
}

export interface CbamCalculationResult {
  engineVersion: string;
  timestamp: string;
  sector: string;
  cnCode: string;
  productionVolumeTonnes: number;
  directEmissions: {
    combustionTonnes: number;
    processTonnes: number;
    totalDirectTonnes: number;
    specificDirectTco2ePerTonne: number;
  };
  indirectEmissions: {
    electricityMwh: number;
    gridFactorUsed: number;
    totalIndirectTonnes: number;
    specificIndirectTco2ePerTonne: number;
  };
  precursorEmissions: {
    totalPrecursorTonnes: number;
    specificPrecursorTco2ePerTonne: number;
  };
  totalEmbeddedEmissions: {
    totalEmissionsTonnes: number;
    specificTotalTco2ePerTonne: number;
  };
  financialExposure: {
    euEtsBenchmarkPriceEur: number;
    localCarbonPriceDeductionEur: number;
    netCertificateCostPerTonneEur: number;
    totalEstimatedCbamObligationEur: number;
  };
  xmlPayload: string;
}

// Default Grid Emission Factors (tCO2/MWh) based on EU Commission Default Values & IEA
export const DEFAULT_GRID_FACTORS: Record<string, number> = {
  TR: 0.442, // Turkey average grid factor
  DE: 0.385, // Germany
  PL: 0.708, // Poland
  CN: 0.555, // China
  IN: 0.715, // India
  US: 0.370, // United States
  DEFAULT: 0.450
};

// Recognized CBAM CN Codes Catalog
export const CBAM_CN_PREFIXES: Record<string, string[]> = {
  iron_and_steel: ['72', '73'],
  aluminium: ['76'],
  cement: ['2507', '2523'],
  fertilizers: ['2808', '2814', '2834', '3102', '3105'],
  electricity: ['2716'],
  hydrogen: ['28041000']
};

export function validateCnCode(sector: string, cnCode: string): boolean {
  const clean = cnCode.replace(/\s+/g, '');
  const prefixes = CBAM_CN_PREFIXES[sector];
  if (!prefixes) return false;
  return prefixes.some(p => clean.startsWith(p));
}

export function calculateCombustionEmissions(fuels: FuelInput[]): number {
  let total = 0;
  for (const f of fuels) {
    const oxf = f.oxf !== undefined ? f.oxf : 1.0;
    // Energy (TJ) = amount * ncv
    // Emission (tCO2) = Energy * ef * oxf
    const energy = f.amount * f.ncv;
    const em = energy * f.ef * oxf;
    total += em;
  }
  return Number(total.toFixed(4));
}

export function calculateIndirectEmissions(elec: ElectricityInput): { totalIndirect: number; factorUsed: number } {
  let factor = elec.customEmissionFactor;
  if (factor === undefined) {
    const country = elec.countryCode ? elec.countryCode.toUpperCase() : 'DEFAULT';
    factor = DEFAULT_GRID_FACTORS[country] || DEFAULT_GRID_FACTORS.DEFAULT;
  }
  const total = elec.mwhConsumed * factor;
  return {
    totalIndirect: Number(total.toFixed(4)),
    factorUsed: factor
  };
}

export function calculatePrecursorEmissions(precursors: PrecursorInput[] = []): number {
  if (!precursors || precursors.length === 0) return 0;
  let total = 0;
  for (const p of precursors) {
    total += p.quantityUsedTonnes * p.specificEmbeddedEmissions;
  }
  return Number(total.toFixed(4));
}

export function generateCbamXml(req: CbamCalculationRequest, res: Omit<CbamCalculationResult, 'xmlPayload'>): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<cbam:CBAMCommunication xmlns:cbam="urn:cbam:transitional:report:v1" version="2023.1">
  <cbam:Header>
    <cbam:InstallationID>${escapeXml(req.installationId)}</cbam:InstallationID>
    <cbam:InstallationName>${escapeXml(req.installationName)}</cbam:InstallationName>
    <cbam:CountryCode>${escapeXml(req.country)}</cbam:CountryCode>
    <cbam:ReportingPeriod>${escapeXml(req.reportingPeriod)}</cbam:ReportingPeriod>
    <cbam:CreationDate>${res.timestamp}</cbam:CreationDate>
  </cbam:Header>
  <cbam:EmissionsReport>
    <cbam:GoodsProduced>
      <cbam:Sector>${escapeXml(req.sector)}</cbam:Sector>
      <cbam:CNCode>${escapeXml(req.cnCode)}</cbam:CNCode>
      <cbam:ProductionVolumeTonnes>${res.productionVolumeTonnes}</cbam:ProductionVolumeTonnes>
    </cbam:GoodsProduced>
    <cbam:DirectEmissions>
      <cbam:TotalDirectTonnes>${res.directEmissions.totalDirectTonnes}</cbam:TotalDirectTonnes>
      <cbam:SpecificDirect>${res.directEmissions.specificDirectTco2ePerTonne}</cbam:SpecificDirect>
    </cbam:DirectEmissions>
    <cbam:IndirectEmissions>
      <cbam:TotalIndirectTonnes>${res.indirectEmissions.totalIndirectTonnes}</cbam:TotalIndirectTonnes>
      <cbam:SpecificIndirect>${res.indirectEmissions.specificIndirectTco2ePerTonne}</cbam:SpecificIndirect>
      <cbam:ElectricityFactorMwh>${res.indirectEmissions.gridFactorUsed}</cbam:ElectricityFactorMwh>
    </cbam:IndirectEmissions>
    <cbam:PrecursorEmissions>
      <cbam:TotalPrecursorTonnes>${res.precursorEmissions.totalPrecursorTonnes}</cbam:TotalPrecursorTonnes>
      <cbam:SpecificPrecursor>${res.precursorEmissions.specificPrecursorTco2ePerTonne}</cbam:SpecificPrecursor>
    </cbam:PrecursorEmissions>
    <cbam:TotalEmbeddedEmissions>
      <cbam:CumulativeTonnes>${res.totalEmbeddedEmissions.totalEmissionsTonnes}</cbam:CumulativeTonnes>
      <cbam:SpecificTotalTco2ePerTonne>${res.totalEmbeddedEmissions.specificTotalTco2ePerTonne}</cbam:SpecificTotalTco2ePerTonne>
    </cbam:TotalEmbeddedEmissions>
    <cbam:FinancialEvaluation>
      <cbam:EuEtsPriceEur>${res.financialExposure.euEtsBenchmarkPriceEur}</cbam:EuEtsPriceEur>
      <cbam:LocalPriceDeductionEur>${res.financialExposure.localCarbonPriceDeductionEur}</cbam:LocalPriceDeductionEur>
      <cbam:EstimatedObligationEur>${res.financialExposure.totalEstimatedCbamObligationEur}</cbam:EstimatedObligationEur>
    </cbam:FinancialEvaluation>
  </cbam:EmissionsReport>
</cbam:CBAMCommunication>`;
}

function escapeXml(str: string): string {
  return String(str || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function executeCbamCalculation(request: CbamCalculationRequest): CbamCalculationResult {
  if (!request.productionVolumeTonnes || request.productionVolumeTonnes <= 0) {
    throw new Error('Production volume in tonnes must be greater than zero.');
  }

  // 1. Direct Emissions
  const combustionTonnes = calculateCombustionEmissions(request.fuels || []);
  const processTonnes = request.processEmissionsTonnes || 0;
  const totalDirectTonnes = Number((combustionTonnes + processTonnes).toFixed(4));
  const specificDirect = Number((totalDirectTonnes / request.productionVolumeTonnes).toFixed(4));

  // 2. Indirect Emissions
  const { totalIndirect: totalIndirectTonnes, factorUsed: gridFactorUsed } = calculateIndirectEmissions(request.electricity);
  const specificIndirect = Number((totalIndirectTonnes / request.productionVolumeTonnes).toFixed(4));

  // 3. Precursor Emissions
  const totalPrecursorTonnes = calculatePrecursorEmissions(request.precursors);
  const specificPrecursor = Number((totalPrecursorTonnes / request.productionVolumeTonnes).toFixed(4));

  // 4. Total Embedded Emissions
  const totalEmissionsTonnes = Number((totalDirectTonnes + totalIndirectTonnes + totalPrecursorTonnes).toFixed(4));
  const specificTotal = Number((totalEmissionsTonnes / request.productionVolumeTonnes).toFixed(4));

  // 5. Financial Exposure (CBAM Certificate Obligation)
  const euEtsPrice = request.euEtsPriceEurPerTonne ?? 75.0; // Benchmark 75 EUR/tCO2
  const localDeduction = request.carbonPricePaidLocalEurPerTonne ?? 0.0;
  const netPricePerTonne = Math.max(0, euEtsPrice - localDeduction);
  const totalEstimatedCost = Number((totalEmissionsTonnes * netPricePerTonne).toFixed(2));

  const baseResult = {
    engineVersion: 'EU-CBAM-2023-956-V1.0-DETERMINISTIC',
    timestamp: new Date().toISOString(),
    sector: request.sector,
    cnCode: request.cnCode,
    productionVolumeTonnes: request.productionVolumeTonnes,
    directEmissions: {
      combustionTonnes,
      processTonnes,
      totalDirectTonnes,
      specificDirectTco2ePerTonne: specificDirect
    },
    indirectEmissions: {
      electricityMwh: request.electricity.mwhConsumed,
      gridFactorUsed,
      totalIndirectTonnes,
      specificIndirectTco2ePerTonne: specificIndirect
    },
    precursorEmissions: {
      totalPrecursorTonnes,
      specificPrecursorTco2ePerTonne: specificPrecursor
    },
    totalEmbeddedEmissions: {
      totalEmissionsTonnes,
      specificTotalTco2ePerTonne: specificTotal
    },
    financialExposure: {
      euEtsBenchmarkPriceEur: euEtsPrice,
      localCarbonPriceDeductionEur: localDeduction,
      netCertificateCostPerTonneEur: netPricePerTonne,
      totalEstimatedCbamObligationEur: totalEstimatedCost
    }
  };

  const xmlPayload = generateCbamXml(request, baseResult);

  return {
    ...baseResult,
    xmlPayload
  };
}
