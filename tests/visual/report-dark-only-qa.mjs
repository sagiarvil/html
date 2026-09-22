import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent((urlPath || '/').split('?')[0]).replace(/\\/g, '/');
  let rel = clean.replace(/^\/+/, '');
  if (!rel) rel = 'index.html';
  let target = path.resolve(root, rel);
  if (!target.startsWith(path.resolve(root))) return null;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!fs.existsSync(target) && !path.extname(target) && fs.existsSync(target + '.html')) target += '.html';
  return fs.existsSync(target) && fs.statSync(target).isFile() ? target : null;
}

const server = http.createServer((req, res) => {
  const target = resolvePath(req.url);
  if (!target) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'content-type': mime[path.extname(target)] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  fs.createReadStream(target).pipe(res);
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
const routes = [
  '/ai-report/',
  '/enterprise-analyzer/htmlandhtml-ai-report',
  '/enterprise-analyzer/htmlandhtml-ai-report-LIGHT',
  '/tr/enterprise-analyzer/htmlandhtml-ai-report',
  '/tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT',
  '/en/sample-report/',
  '/tr/ornek-rapor/',
];
const viewports = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];

const errors = [];
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport, colorScheme: 'light' });
      await page.addInitScript(() => {
        localStorage.setItem('hh-theme', 'light');
        localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({ theme: 'light' }));
        try {
          document.cookie = 'htmlandhtml-theme=' + encodeURIComponent(JSON.stringify({ theme: 'light' })) + '; path=/';
        } catch {}
      });

      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      if (!response || !response.ok()) {
        errors.push(`${viewport.width}px ${route}: HTTP ${response?.status()}`);
        await page.close();
        continue;
      }

      await page.waitForTimeout(80);

      // Adversarially try to re-enable LIGHT after all page scripts have loaded.
      await page.evaluate(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', 'light');
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      });
      await page.waitForTimeout(80);

      const audit = await page.evaluate(() => {
        const root = document.documentElement;

        const parseRgb = (value) => {
          const m = value && value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
          return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
        };
        const nearWhiteNeutral = (value) => {
          const c = parseRgb(value);
          if (!c || c.a < 0.72) return false;
          const max = Math.max(c.r, c.g, c.b);
          const min = Math.min(c.r, c.g, c.b);
          const mean = (c.r + c.g + c.b) / 3;
          return mean >= 225 && (max - min) <= 28;
        };

        const offenders = [];
        const addIfOffender = (el, kind, style) => {
          if (!nearWhiteNeutral(style.backgroundColor)) return;
          const rect = el.getBoundingClientRect();
          if (rect.width < 8 || rect.height < 8) return;
          offenders.push({
            kind,
            tag: el.tagName,
            id: el.id || '',
            cls: String(el.className || '').slice(0, 140),
            bg: style.backgroundColor,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        };

        for (const el of document.querySelectorAll('body, body *')) {
          const rect = el.getBoundingClientRect();
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
          if (rect.width <= 0 || rect.height <= 0) continue;
          addIfOffender(el, 'element', cs);

          for (const pseudo of ['::before', '::after']) {
            const ps = getComputedStyle(el, pseudo);
            if (ps.content && ps.content !== 'none' && ps.content !== 'normal') {
              addIfOffender(el, pseudo, ps);
            }
          }

          if (offenders.length >= 30) break;
        }

        const toggleVisible = [...document.querySelectorAll('#themeToggle, .theme-toggle, .theme-toggle-btn, [data-theme-toggle]')]
          .some((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0;
          });

        return {
          theme: root.getAttribute('data-theme'),
          isDark: root.classList.contains('dark'),
          isLight: root.classList.contains('light'),
          colorScheme: getComputedStyle(root).colorScheme,
          bodyBackground: getComputedStyle(document.body).backgroundColor,
          toggleVisible,
          offenders,
        };
      });

      if (audit.theme !== 'dark' || !audit.isDark || audit.isLight) {
        errors.push(`${viewport.width}px ${route}: dark-only theme lock failed ${JSON.stringify({theme:audit.theme,isDark:audit.isDark,isLight:audit.isLight})}`);
      }
      if (!String(audit.colorScheme).includes('dark')) {
        errors.push(`${viewport.width}px ${route}: color-scheme is not dark (${audit.colorScheme})`);
      }
      if (audit.toggleVisible) {
        errors.push(`${viewport.width}px ${route}: theme toggle remains visible on dark-only report`);
      }
      if (audit.offenders.length) {
        errors.push(`${viewport.width}px ${route}: white/near-white background leakage ${JSON.stringify(audit.offenders.slice(0, 8))}`);
      }

      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (errors.length) {
  console.error('REPORT DARK VISUAL CONTRACT FAIL');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}

console.log(`REPORT DARK VISUAL CONTRACT PASS: ${routes.length} report routes x ${viewports.length} viewports; stored/system LIGHT + post-load mutation cannot produce white report surfaces.`);
