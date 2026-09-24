import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('[TEST] Initializing Autonomous IndexNow Traffic Engine Verification...');

// Load functions/lib/indexnow-engine.ts
const enginePath = path.resolve(__dirname, '../../functions/lib/indexnow-engine.ts');
let engineSrc = fs.readFileSync(enginePath, 'utf8');

// Convert ESM exports to CommonJS exports for VM context
let code = engineSrc.replace(/export\s+/g, '');

code += `
exports.validateIndexNowKey = validateIndexNowKey;
exports.sanitizeUrlList = sanitizeUrlList;
exports.buildIndexNowPayload = buildIndexNowPayload;
exports.broadcastToIndexNow = broadcastToIndexNow;
exports.INDEXNOW_ENDPOINTS = INDEXNOW_ENDPOINTS;
exports.CANONICAL_HOST = CANONICAL_HOST;
exports.DEFAULT_KEY = DEFAULT_KEY;
exports.DEFAULT_KEY_LOCATION = DEFAULT_KEY_LOCATION;
`;

const mockFetch = async (url, options) => {
  return {
    status: 200,
    ok: true,
    json: async () => ({ status: 'ok' })
  };
};

const moduleEnv = {
  exports: {},
  console,
  Date,
  Number,
  String,
  Math,
  URL,
  Array,
  Set,
  fetch: mockFetch
};
vm.createContext(moduleEnv);
vm.runInContext(code, moduleEnv);

const {
  validateIndexNowKey,
  sanitizeUrlList,
  buildIndexNowPayload,
  broadcastToIndexNow,
  INDEXNOW_ENDPOINTS,
  CANONICAL_HOST,
  DEFAULT_KEY,
  DEFAULT_KEY_LOCATION
} = moduleEnv.exports;

// 1. Key Validation Protocol
assert.equal(validateIndexNowKey(DEFAULT_KEY), true, 'Default 32-char hex key must be valid');
assert.equal(validateIndexNowKey('short'), false, 'Key shorter than 8 chars must fail');
assert.equal(validateIndexNowKey(''), false, 'Empty key must fail');
assert.equal(validateIndexNowKey('valid-key-12345678'), true, 'Hyphenated alphanumeric key must pass');
console.log('✓ IndexNow Key RFC syntax validation PASS');

// 2. Host and URL Sanitization
const rawUrls = [
  '/tr/site-tarama/',
  'https://htmlandhtml.com/tr/llms-txt-validator/',
  'https://htmlandhtml.com/tr/rehberler/#heading',
  'https://malicious-external-site.com/spam',
  'https://subdomain.htmlandhtml.com/docs'
];
const sanitized = sanitizeUrlList(rawUrls, 'htmlandhtml.com');
assert.equal(sanitized.length, 4, 'Must filter external spam and keep canonical host + subdomains');
assert.ok(sanitized.includes('https://htmlandhtml.com/tr/site-tarama/'), 'Relative paths must be resolved to canonical host');
assert.ok(!sanitized.some(u => u.includes('#')), 'URL fragments (#) must be stripped per IndexNow spec');
console.log('✓ URL sanitization and host containment PASS (4/5 valid, external filtered)');

// 3. Payload Construction
const payload = buildIndexNowPayload(rawUrls, CANONICAL_HOST, DEFAULT_KEY);
assert.equal(payload.host, CANONICAL_HOST);
assert.equal(payload.key, DEFAULT_KEY);
assert.equal(payload.keyLocation, DEFAULT_KEY_LOCATION);
assert.equal(payload.urlList.length, 4);
console.log('✓ IndexNow broadcast payload construction PASS');

// 4. Batch Limit Verification
const largeUrlBatch = Array.from({ length: 10500 }, (_, i) => `https://htmlandhtml.com/page-${i}`);
const capped = sanitizeUrlList(largeUrlBatch, CANONICAL_HOST);
assert.equal(capped.length, 10000, 'Batch must be capped at 10,000 URLs max per specification');
console.log('✓ Batch ceiling clamp (10,000 URLs) PASS');

// 5. Multi-Engine Broadcast Execution
const broadcastResult = await broadcastToIndexNow(payload, INDEXNOW_ENDPOINTS);
assert.equal(broadcastResult.ok, true, 'Broadcast must succeed');
assert.equal(broadcastResult.results.length, INDEXNOW_ENDPOINTS.length, 'All endpoints must be contacted');
assert.equal(broadcastResult.results[0].status, 'SUCCESS', 'Primary api.indexnow.org must report success');
console.log('✓ Multi-engine broadcast DAG (Bing, Yandex, IndexNow) PASS');

console.log('\n[PASS] All IndexNow Autonomous Traffic Engine tests passed successfully with 100% deterministic precision.');
