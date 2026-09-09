import fs from 'node:fs';
import assert from 'node:assert/strict';

const ui=fs.readFileSync('assets/js/ai-positioning.js','utf8');
const fn=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const telemetry=fs.readFileSync('functions-firebase/src/scan-telemetry.ts','utf8');
const admin=fs.readFileSync('admin/index.html','utf8');
const cachePatch=fs.readFileSync('scripts/patch_r10_quality_cache.py','utf8');

assert.match(ui,/RFC 9309 — Robots Exclusion Protocol/,'robots findings must cite RFC 9309');
assert.doesNotMatch(ui,/RFC 9110 HTTP Protocol/,'generic RFC 9110 badge must not return');
assert.match(ui,/NOT_MEASURED/,'CWV unknown state must stay explicit');
assert.match(ui,/Bu bulgu bir AI bot erişim testi değildir/,'Googlebot must be separated from AI crawler semantics');
assert.match(fn,/googlebot\.category='crawl'/,'Googlebot finding must be normalized into crawl');
assert.match(fn,/weightedScore\(/,'AI score must be recomputed without Googlebot');
assert.match(fn,/recordScanTelemetry/,'scan endpoint must record minimal telemetry');
assert.match(telemetry,/PBKDF2_ITERATIONS=600_000/,'admin verifier must use a costly password KDF');
assert.match(telemetry,/timingSafeEqual/,'admin verifier must use timing-safe comparison');
assert.doesNotMatch(telemetry,/req\.ip|x-forwarded-for|user-agent/i,'telemetry must not collect visitor identifiers');
assert.match(admin,/noindex,nofollow,noarchive,nosnippet/,'admin page must not be indexable');
assert.match(admin,/type="password"/,'admin page must request password securely in the UI');
assert.doesNotMatch(admin,/localStorage|sessionStorage/,'admin password must not persist in browser storage');
assert.match(cachePatch,/quality=001/,'production build must rotate the R10 asset cache key');
console.log('R10_QUALITY_ADMIN_GUARD_PASS');
