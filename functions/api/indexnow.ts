import {
  broadcastToIndexNow,
  buildIndexNowPayload,
  CANONICAL_HOST,
  DEFAULT_KEY,
  DEFAULT_KEY_LOCATION,
  INDEXNOW_ENDPOINTS
} from '../lib/indexnow-engine';

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const body: any = await request.json();
    const urls: string[] = Array.isArray(body?.urls) ? body.urls : (typeof body?.url === 'string' ? [body.url] : []);
    const host = typeof body?.host === 'string' && body.host.trim() ? body.host.trim() : CANONICAL_HOST;
    const key = typeof body?.key === 'string' && body.key.trim() ? body.key.trim() : DEFAULT_KEY;

    if (urls.length === 0) {
      return Response.json({ error: 'At least one URL required in urls array' }, { status: 400 });
    }

    const payload = buildIndexNowPayload(urls, host, key);
    const result = await broadcastToIndexNow(payload);

    return Response.json(result, {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-indexnow-broadcaster': 'HTMLandHTML-Enterprise-v2'
      }
    });
  } catch (err: any) {
    return Response.json({
      error: err?.message || 'IndexNow broadcast failed'
    }, {
      status: 400,
      headers: { 'cache-control': 'no-store' }
    });
  }
};

export const onRequestGet: PagesFunction = () => {
  return Response.json({
    status: 'ACTIVE',
    protocol: 'IndexNow v1.0',
    host: CANONICAL_HOST,
    key: DEFAULT_KEY,
    keyLocation: DEFAULT_KEY_LOCATION,
    supportedEndpoints: INDEXNOW_ENDPOINTS,
    quota: '10,000 URLs / day per engine',
    description: 'Instant indexation gateway for Bing, Yandex, Seznam, and Copilot AI Search.'
  }, {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};
