/**
 * htmlandhtml.com - Multi-Hub IndexNow Broadcast Script
 * Standard: Universal SEO & GEO Mandate (Section 7)
 */

'use strict';

const INDEXNOW_KEY = '9d980417475ac56c8ad72ef2c743e1e5';
const HOST = 'htmlandhtml.com';
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow'
];

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/products.html`,
  `https://${HOST}/architecture.html`,
  `https://${HOST}/geo-seo.html`,
  `https://${HOST}/compliance.html`,
  `https://${HOST}/licensing.html`,
  `https://${HOST}/live-preview.html`,
  `https://${HOST}/checkout.html`,
  `https://${HOST}/llms.txt`
];

async function broadcastIndexNow() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URLS
  };

  console.log(`[IndexNow Broadcast] Dispatching ${URLS.length} canonical URLs across global AI & Search Hubs...`);

  const results = await Promise.allSettled(
    ENDPOINTS.map(async (endpoint) => {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      });
      return {
        endpoint,
        status: res.status,
        ok: res.ok || res.status === 200 || res.status === 202
      };
    })
  );

  results.forEach((r) => {
    if (r.status === 'fulfilled') {
      const { endpoint, status, ok } = r.value;
      const hostname = new URL(endpoint).hostname;
      if (ok) {
        console.log(`  ✅ [${hostname}] ${URLS.length} URLs accepted (HTTP ${status})`);
      } else {
        console.warn(`  ⚠️ [${hostname}] Response code: HTTP ${status}`);
      }
    } else {
      console.warn(`  ❌ Network error: ${r.reason?.message || r.reason}`);
    }
  });
}

broadcastIndexNow().catch((err) => {
  console.error('Fatal IndexNow broadcast failure:', err);
});
