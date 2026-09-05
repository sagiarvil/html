const { onRequest } = require('firebase-functions/v2/https');

const scanApi = require('./lib/scan.cjs');
const mandateApi = require('./lib/mandate.cjs');
const healthApi = require('./lib/health.cjs');

function requestHeaders(req) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (value == null) continue;
    if (Array.isArray(value)) for (const item of value) headers.append(key, String(item));
    else headers.set(key, String(value));
  }
  return headers;
}

function toWebRequest(req) {
  const host = req.get('host') || 'htmlandhtml.com';
  const path = req.originalUrl || req.url || '/api';
  const url = `https://${host}${path.startsWith('/') ? path : `/${path}`}`;
  const init = { method: req.method, headers: requestHeaders(req) };
  if (!['GET', 'HEAD'].includes(req.method)) {
    const raw = req.rawBody && req.rawBody.length ? req.rawBody : Buffer.from(JSON.stringify(req.body || {}));
    init.body = raw;
  }
  return new Request(url, init);
}

async function sendWebResponse(res, response) {
  res.status(response.status);
  for (const [key, value] of response.headers.entries()) {
    if (['content-length', 'transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) continue;
    res.setHeader(key, value);
  }
  res.send(Buffer.from(await response.arrayBuffer()));
}

exports.api = onRequest({
  region: 'europe-west1',
  timeoutSeconds: 55,
  memory: '512MiB',
  maxInstances: 20,
  concurrency: 20,
  invoker: 'public'
}, async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET, POST, OPTIONS');
      return res.status(204).send('');
    }
    const path = String(req.originalUrl || req.url || '').split('?')[0].replace(/\/+$/, '');
    const request = toWebRequest(req);
    let response;
    if (path.endsWith('/scan')) {
      response = req.method === 'POST' ? await scanApi.onRequestPost({ request }) : await scanApi.onRequestGet({ request });
    } else if (path.endsWith('/mandate')) {
      response = req.method === 'POST'
        ? await mandateApi.onRequestPost({ request, env: { MANDATE_ACCESS_TOKEN: process.env.MANDATE_ACCESS_TOKEN } })
        : await mandateApi.onRequestGet({ request });
    } else if (path.endsWith('/health')) {
      response = req.method === 'GET'
        ? await healthApi.onRequestGet({ env: { MANDATE_ACCESS_TOKEN: process.env.MANDATE_ACCESS_TOKEN } })
        : Response.json({ error: 'GET only' }, { status: 405 });
    } else {
      response = Response.json({ error: 'API route not found' }, { status: 404 });
    }
    return await sendWebResponse(res, response);
  } catch (error) {
    console.error('api_runtime_failure', {
      route: String(req.originalUrl || req.url || '').split('?')[0],
      method: req.method,
      message: error && error.message ? String(error.message).slice(0, 300) : 'unknown'
    });
    return res.status(500).json({ error: 'Runtime failure' });
  }
});
