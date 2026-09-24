/**
 * Autonomous IndexNow Engine & Search Traffic Broadcaster
 * Protocol: IndexNow API v1.0 (Microsoft Bing, Yandex, Seznam, Naver)
 * Purpose: Instant discovery, sub-minute bot crawling, and high-frequency organic traffic acquisition.
 * Zero simulation: Authentic RFC payload construction and network dispatch.
 */

// Canonical search engine IndexNow API gateways
export const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

export const CANONICAL_HOST = 'htmlandhtml.com';
export const DEFAULT_KEY = '5a470fd32fe045828c46eeda9b83ec06'; // 32-char hex verification key
export const DEFAULT_KEY_LOCATION = `https://${CANONICAL_HOST}/${DEFAULT_KEY}.txt`;

/**
 * Validates that an IndexNow key meets specification (8-128 alphanumeric characters)
 * @param {string} key
 * @returns {boolean}
 */
export function validateIndexNowKey(key) {
  if (!key || typeof key !== 'string') return false;
  return /^[a-zA-Z0-9-]{8,128}$/.test(key.trim());
}

/**
 * Sanitizes and normalizes a list of URLs ensuring they belong to the host
 * @param {string[]} urls
 * @param {string} [host]
 * @returns {string[]}
 */
export function sanitizeUrlList(urls, host = CANONICAL_HOST) {
  if (!Array.isArray(urls)) return [];
  const cleanHost = host.toLowerCase().replace(/^https?:\/\//, '').split('/')[0];
  const valid = new Set();

  for (const raw of urls) {
    if (!raw || typeof raw !== 'string') continue;
    let trimmed = raw.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${cleanHost}/${trimmed.replace(/^\/+/, '')}`;
    }
    try {
      const u = new URL(trimmed);
      if (u.hostname.toLowerCase() === cleanHost || u.hostname.toLowerCase().endsWith(`.${cleanHost}`)) {
        u.hash = '';
        valid.add(u.toString());
      }
    } catch (_) {}
  }

  // Max 10,000 URLs per submission batch according to IndexNow spec
  return Array.from(valid).slice(0, 10000);
}

/**
 * Builds a validated IndexNow JSON payload
 * @param {string[]} urls
 * @param {string} [host]
 * @param {string} [key]
 */
export function buildIndexNowPayload(urls, host = CANONICAL_HOST, key = DEFAULT_KEY) {
  const cleanKey = String(key || '').trim();
  if (!validateIndexNowKey(cleanKey)) {
    throw new Error('Invalid IndexNow authentication key. Must be 8-128 alphanumeric characters.');
  }

  const validUrls = sanitizeUrlList(urls, host);
  if (validUrls.length === 0) {
    throw new Error('URL list cannot be empty. At least one valid URL matching host is required.');
  }

  return {
    host,
    key: cleanKey,
    keyLocation: `https://${host}/${cleanKey}.txt`,
    urlList: validUrls
  };
}

/**
 * Broadcasts payload concurrently to all search engine IndexNow gateways
 * @param {object} payload
 * @param {string[]} [endpoints]
 */
export async function broadcastToIndexNow(payload, endpoints = INDEXNOW_ENDPOINTS) {
  const results = [];

  for (const endpoint of endpoints) {
    const parsedEndpoint = new URL(endpoint);
    const engineName = parsedEndpoint.hostname;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'HTMLandHTML-IndexNow-Broadcaster/2.0'
        },
        body: JSON.stringify(payload)
      });

      // IndexNow returns 200 OK or 202 Accepted on success
      const isSuccess = res.status === 200 || res.status === 202;
      results.push({
        engine: engineName,
        endpoint,
        submittedUrlsCount: payload.urlList.length,
        status: isSuccess ? 'SUCCESS' : 'FAILED',
        httpStatus: res.status
      });
    } catch (err) {
      results.push({
        engine: engineName,
        endpoint,
        submittedUrlsCount: payload.urlList.length,
        status: 'FAILED',
        error: err && err.message ? err.message : 'Network dispatch failure'
      });
    }
  }

  const anySuccess = results.some(r => r.status === 'SUCCESS');

  return {
    ok: anySuccess,
    timestamp: new Date().toISOString(),
    host: payload.host,
    key: payload.key,
    urlCount: payload.urlList.length,
    results
  };
}
