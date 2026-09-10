import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'config/google-preferred-source.json'), 'utf8'));
const pages = ['index.html', 'tr/index.html', 'en/index.html'];

if (config.domain !== 'htmlandhtml.com') {
  throw new Error(`Preferred Sources config domain drifted: ${config.domain}`);
}
if (typeof config.eligible !== 'boolean') {
  throw new Error('Preferred Sources config eligible must be boolean');
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const hasButton = html.includes('google-add-preferred-source-btn');
  const hasPublisherScript = html.includes('news.google.com/swg/js/v1/publisher.js');

  if (config.eligible === false && (hasButton || hasPublisherScript)) {
    throw new Error(`Ineligible Preferred Sources integration leaked into ${page}`);
  }
}

if (config.eligible === true) {
  const rootHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!rootHtml.includes('google-add-preferred-source-btn') || !rootHtml.includes('news.google.com/swg/js/v1/publisher.js')) {
    throw new Error('eligible=true but the official Google Preferred Sources integration is missing');
  }
}

console.log(`PREFERRED_SOURCE_ELIGIBILITY_TEST_PASS eligible=${config.eligible}`);
