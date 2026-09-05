const { onRequest } = require('firebase-functions/v2/https');

const scanApi = require('./lib/scan.cjs');
const llmsApi = require('./lib/llms.cjs');
const mandateApi = require('./lib/mandate.cjs');
const healthApi = require('./lib/health.cjs');

const RATE_WINDOW_MS = 10 * 60 * 1000;
const buckets = new Map();
const limits = { scan: 12, llms: 30, mandate: 10 };

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

function routeKey(path) {
  if (path.endsWith('/scan')) return 'scan';
  if (path.endsWith('/llms')) return 'llms';
  if (path.endsWith('/mandate')) return 'mandate';
  return null;
}

function clientKey(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || req.ip || req.socket?.remoteAddress || 'unknown';
}

function allowRequest(req, route) {
  const limit = limits[route];
  if (!limit) return { ok: true };
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k,v] of buckets) if (v.resetAt <= now) buckets.delete(k);
  }
  const key = `${route}:${clientKey(req)}`;
  let item = buckets.get(key);
  if (!item || item.resetAt <= now) item = { count: 0, resetAt: now + RATE_WINDOW_MS };
  item.count += 1;
  buckets.set(key, item);
  return { ok: item.count <= limit, retryAfter: Math.max(1, Math.ceil((item.resetAt - now) / 1000)), remaining: Math.max(0, limit - item.count) };
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
  maxInstances: 10,
  concurrency: 5,
  invoker: 'public'
}, async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      return res.status(204).send('');
    }
    const path = String(req.originalUrl || req.url || '').split('?')[0].replace(/\/+$/, '');
    const route = routeKey(path);
    const rate = allowRequest(req, route);
    if (!rate.ok) {
      res.setHeader('Retry-After', String(rate.retryAfter));
      res.setHeader('Cache-Control', 'no-store');
      return res.status(429).json({ error: 'Rate limit exceeded', retryAfterSeconds: rate.retryAfter });
    }
    const request = toWebRequest(req);
    let response;
    if (path.endsWith('/scan')) {
      response = req.method === 'POST' ? await scanApi.onRequestPost({ request }) : await scanApi.onRequestGet({ request });
    } else if (path.endsWith('/llms')) {
      response = req.method === 'POST' ? await llmsApi.onRequestPost({ request }) : await llmsApi.onRequestGet({ request });
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
