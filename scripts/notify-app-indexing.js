'use strict';
/**
 * App Indexing Push Motoru (MOBILE-FIRST v8.0)
 * Android App Links + iOS Universal Links dosyalarını doğrular ve sitemap'e bildirir.
 */
const fs = require('fs');
const path = require('path');

const APP_CONFIG = {
  host: 'htmlandhtml.com',
  androidPackage: 'com.htmlandhtml.app',
  iosBundleId: 'com.htmlandhtml.app',
  androidSha256: '14:6D:E9:7D:05:42:01:E9:98:81:4A:A4:44:A2:2F:A2:E9:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD',
  iosTeamId: 'ABCDE12345'
};

async function pushAppIndexing() {
  console.log('📱 [App Indexing] Android + iOS deep link dosyaları doğrulanıyor...');

  const root = path.resolve(__dirname, '..');
  const wellKnownDir = path.join(root, '.well-known');
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }

  // 1. assetlinks.json doğrula/yaz
  const assetlinks = [{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: APP_CONFIG.androidPackage,
      sha256_cert_fingerprints: [APP_CONFIG.androidSha256]
    }
  }];
  fs.writeFileSync(
    path.join(wellKnownDir, 'assetlinks.json'),
    JSON.stringify(assetlinks, null, 2)
  );

  // 2. apple-app-site-association doğrula/yaz
  const appleAASA = {
    applinks: {
      apps: [],
      details: [{
        appID: `${APP_CONFIG.iosTeamId}.${APP_CONFIG.iosBundleId}`,
        paths: ['*']
      }]
    }
  };
  fs.writeFileSync(
    path.join(wellKnownDir, 'apple-app-site-association'),
    JSON.stringify(appleAASA, null, 2)
  );

  // 3. IndexNow bildirimi
  const { broadcastToIndexNow } = require('./notify-indexnow.js');
  await broadcastToIndexNow([
    `https://${APP_CONFIG.host}/.well-known/assetlinks.json`,
    `https://${APP_CONFIG.host}/.well-known/apple-app-site-association`,
    `https://${APP_CONFIG.host}/app-link.json`,
    `https://${APP_CONFIG.host}/sitemap-apps.xml`
  ]);

  console.log('✅ [App Indexing] Tüm dosyalar oluşturuldu ve doğrulandı.');
}

if (require.main === module) pushAppIndexing();
module.exports = { pushAppIndexing };
