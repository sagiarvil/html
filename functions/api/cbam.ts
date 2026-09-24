import { executeCbamCalculation, validateCnCode, type CbamCalculationRequest } from '../lib/cbam-engine';

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body = (await request.json()) as CbamCalculationRequest;
    
    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Valid JSON payload required' }, { status: 400 });
    }

    if (!body.sector || !body.cnCode || !body.productionVolumeTonnes) {
      return Response.json({
        error: 'Missing required fields: sector, cnCode, and productionVolumeTonnes are mandatory'
      }, { status: 400 });
    }

    // Validate sector CN code boundary
    const isCnValid = validateCnCode(body.sector, body.cnCode);
    if (!isCnValid) {
      return Response.json({
        error: `Invalid CN code '${body.cnCode}' for sector '${body.sector}'. Must match EU CBAM Combined Nomenclature Annex I.`
      }, { status: 422 });
    }

    const result = executeCbamCalculation(body);

    return Response.json(result, {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-cbam-engine': 'EU-2023-956-Deterministic'
      }
    });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || 'CBAM calculation failed' },
      { status: 400, headers: { 'cache-control': 'no-store' } }
    );
  }
};

export const onRequestGet: PagesFunction = () => {
  return Response.json({
    status: 'ACTIVE',
    engine: 'EU CBAM / SKDM Deterministic Engine',
    version: '2023.956.v1',
    supportedSectors: [
      'iron_and_steel',
      'aluminium',
      'cement',
      'fertilizers',
      'electricity',
      'hydrogen'
    ],
    documentation: 'Regulation (EU) 2023/956 & Implementing Regulation (EU) 2023/1773'
  }, {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
