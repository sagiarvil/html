/**
 * htmlandhtml.com IndexNow submission helper.
 * Submit only canonical public URLs intended for indexing.
 */
'use strict';

const INDEXNOW_KEY = '9d980417475ac56c8ad72ef2c743e1e5';
const HOST = 'htmlandhtml.com';
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/architecture.html`,
  `https://${HOST}/licensing.html`,
  `https://${HOST}/llms.txt`
];

async function broadcastIndexNow() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URLS
  };

  const results = await Promise.allSettled(ENDPOINTS.map(async (endpoint) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    return { endpoint, status: res.status, ok: res.ok || res.status === 202 };
  }));

  for (const result of results) {
    if (result.status === 'fulfilled') console.log(result.value);
    else console.warn(result.reason);
  }
}

broadcastIndexNow().catch(console.error);
