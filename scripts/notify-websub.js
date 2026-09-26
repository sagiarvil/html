'use strict';
/**
 * WebSub PubSubHubbub Anlık Dağıtım Motoru (MOBILE-FIRST v8.0)
 * Feed değiştiğinde Hub'a ping atar, abonelere gerçek zamanlı push yapılır.
 */
const https = require('https');
const WEBSUB_CONFIG = {
  hubs: [
    'https://pubsubhubbub.appspot.com/',
    'https://pubsubhubbub.superfeedr.com/'
  ],
  feeds: [
    'https://htmlandhtml.com/feed.xml',
    'https://htmlandhtml.com/atom.xml',
    'https://htmlandhtml.com/rss.xml',
    'https://htmlandhtml.com/mobile/feed.xml'
  ]
};

async function pingWebSubHubs() {
  const params = WEBSUB_CONFIG.feeds.map(f => `hub.url=${encodeURIComponent(f)}`).join('&');
  const payload = params + '&hub.mode=publish';
  const promises = WEBSUB_CONFIG.hubs.map((hub) => {
    return new Promise((resolve) => {
      try {
        const u = new URL(hub);
        const req = https.request({
          hostname: u.hostname, path: u.pathname, method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(payload)
          }, timeout: 6000
        }, (res) => resolve({ host: u.hostname, status: res.statusCode, ok: res.statusCode === 204 || res.statusCode === 200 }));
        req.on('error', (err) => resolve({ host: u.hostname, status: 'ERROR', message: err.message }));
        req.on('timeout', () => { req.destroy(); resolve({ host: u.hostname, status: 'TIMEOUT' }); });
        req.write(payload); req.end();
      } catch (err) {
        resolve({ host: hub, status: 'ERROR', message: err.message });
      }
    });
  });
  const results = await Promise.allSettled(promises);
  results.forEach((r) => {
    if (r.status === 'fulfilled') {
      const { host, status, ok, message } = r.value;
      console.log(ok ? `  ✅ [WebSub ${host}] Başarılı (HTTP ${status})` : `  ⚠️ [WebSub ${host}] Sonuç (HTTP ${status} - ${message || ''})`);
    }
  });
}

if (require.main === module) pingWebSubHubs();
module.exports = { pingWebSubHubs };
