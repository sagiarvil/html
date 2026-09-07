#!/usr/bin/env node
/**
 * Multi-Hub IndexNow Broadcast Engine
 * Super-Mandate V3.0 / Mandate v6.0 §5.2
 */

export const INDEXNOW_CONFIG = {
  host: 'htmlandhtml.com',
  key: '9d980417475ac56c8ad72ef2c743e1e5',
  endpoints: [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow'
  ]
};

export async function broadcastToIndexNow(urlList) {
  if (!Array.isArray(urlList) || urlList.length === 0) {
    console.log('[INDEXNOW] No URLs provided for broadcast.');
    return [];
  }

  const payload = JSON.stringify({
    host: INDEXNOW_CONFIG.host,
    key: INDEXNOW_CONFIG.key,
    keyLocation: `https://${INDEXNOW_CONFIG.host}/${INDEXNOW_CONFIG.key}.txt`,
    urlList
  });

  console.log(`[INDEXNOW] Broadcasting ${urlList.length} URLs to ${INDEXNOW_CONFIG.endpoints.length} hubs...`);

  const promises = INDEXNOW_CONFIG.endpoints.map(async (endpoint) => {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: payload
      });
      return { endpoint, status: res.status, ok: res.ok };
    } catch (err) {
      return { endpoint, status: 0, ok: false, error: err.message };
    }
  });

  const results = await Promise.allSettled(promises);
  results.forEach((r, idx) => {
    const val = r.status === 'fulfilled' ? r.value : { endpoint: INDEXNOW_CONFIG.endpoints[idx], ok: false, error: r.reason };
    console.log(`  ${val.ok ? '✓' : '✗'} ${val.endpoint}: ${val.status || val.error}`);
  });

  return results;
}

if (process.argv[1] && process.argv[1].endsWith('notify-indexnow.mjs')) {
  const urls = process.argv.slice(2);
  const defaultUrls = [
    'https://htmlandhtml.com/',
    'https://htmlandhtml.com/tr/fiyatlandirma/',
    'https://htmlandhtml.com/en/pricing/',
    'https://htmlandhtml.com/methodology.html'
  ];
  broadcastToIndexNow(urls.length > 0 ? urls : defaultUrls);
}
