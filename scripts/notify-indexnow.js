'use strict';
/**
 * Multi-Hub IndexNow Anlık Dağıtım Motoru (MOBILE-FIRST v8.0)
 * Değişen URL'leri eşzamanlı olarak global indeks merkezlerine push eder.
 */
const https = require('https');
const INDEXNOW_CONFIG = {
  host: 'htmlandhtml.com',
  key: '9d980417475ac56c8ad72ef2c743e1e5',
  endpoints: [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
    'https://searchadvisor.naver.com/indexnow',
    'https://search.seznam.cz/indexnow'
  ]
};

async function broadcastToIndexNow(urlList) {
  if (!Array.isArray(urlList) || urlList.length === 0) {
    console.warn('⚠️ [IndexNow] Gönderilecek URL listesi boş.');
    return;
  }
  const payload = JSON.stringify({
    host: INDEXNOW_CONFIG.host,
    key: INDEXNOW_CONFIG.key,
    keyLocation: `https://${INDEXNOW_CONFIG.host}/${INDEXNOW_CONFIG.key}.txt`,
    urlList: urlList
  });
  console.log(`🚀 [IndexNow] ${urlList.length} adet URL ${INDEXNOW_CONFIG.endpoints.length} merkeze yayınlanıyor...`);
  const promises = INDEXNOW_CONFIG.endpoints.map((endpoint) => {
    return new Promise((resolve) => {
      try {
        const u = new URL(endpoint);
        const req = https.request({
          hostname: u.hostname, path: u.pathname, method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload)
          }, timeout: 6000
        }, (res) => {
          const isOk = res.statusCode === 200 || res.statusCode === 202;
          resolve({ host: u.hostname, status: res.statusCode, ok: isOk });
        });
        req.on('error', (err) => resolve({ host: u.hostname, status: 'ERROR', message: err.message }));
        req.on('timeout', () => { req.destroy(); resolve({ host: u.hostname, status: 'TIMEOUT' }); });
        req.write(payload); req.end();
      } catch (err) {
        resolve({ host: endpoint, status: 'ERROR', message: err.message });
      }
    });
  });
  const results = await Promise.allSettled(promises);
  results.forEach((r) => {
    if (r.status === 'fulfilled') {
      const { host, status, ok, message } = r.value;
      if (ok) console.log(`  ✅ [${host}] Başarılı (HTTP ${status})`);
      else console.warn(`  ⚠️ [${host}] Bildirim sonucu (HTTP ${status} - ${message || ''})`);
    }
  });
}

if (require.main === module) {
  const urls = process.argv.slice(2);
  if (urls.length > 0) broadcastToIndexNow(urls);
  else console.log('Kullanım: node scripts/notify-indexnow.js <URL1> <URL2>');
}

module.exports = { broadcastToIndexNow };
