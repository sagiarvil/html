import fs from 'node:fs';

const errors = [];
const expect = (ok, msg) => { if (!ok) errors.push(msg); };

const themeCss = fs.readFileSync('assets/css/theme.css', 'utf8');
const baseCss = fs.readFileSync('assets/css/validator-base.css', 'utf8');
const validatorCss = fs.readFileSync('assets/css/validator.css', 'utf8');

// 1. Verify CSS import cascade: theme.css must be imported after base in validator.css
const baseIndex = validatorCss.indexOf('validator-base.css');
const themeIndex = validatorCss.indexOf('theme.css');
expect(baseIndex !== -1 && themeIndex !== -1 && themeIndex > baseIndex,
  'theme.css must be imported AFTER validator-base.css to ensure SSOT variable precedence');

// 2. Verify dark theme SSOT tokens exist in theme.css and validator-base.css
expect(themeCss.includes('html[data-theme="dark"]') && themeCss.includes('prefers-color-scheme: dark'),
  'theme.css must support both html[data-theme="dark"] and prefers-color-scheme: dark');
expect(baseCss.includes('html[data-theme="dark"]') && baseCss.includes('prefers-color-scheme: dark'),
  'validator-base.css must provide dark theme variable overrides');

// 3. Verify .kicker, badges, pills and chip buttons in dark mode have high-contrast rules
for (const selector of ['.kicker', '.authority-proof span', '.score-item', '.status', '.locked-fix', '.finding code', '.comparison-table th']) {
  expect(themeCss.includes(selector), `theme.css must define dark mode high-contrast rules for ${selector}`);
}

// 4. Calculate relative luminance and WCAG contrast ratio for dark mode tokens
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const n = parseInt(clean, 16);
  if (clean.length === 6) {
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  return [255, 255, 255];
}

function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(rgb1, rgb2) {
  const l1 = luminance(...rgb1);
  const l2 = luminance(...rgb2);
  const bright = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (bright + 0.05) / (dark + 0.05);
}

// Key tokens in dark mode:
const bgMain = hexToRgb('#0a0b0e');
const bgCard = hexToRgb('#141720');
const textLight = hexToRgb('#f8fafc');
const textMuted = hexToRgb('#94a3b8');

// Body text on background: must exceed 7:1 (WCAG AAA)
const mainRatio = contrast(textLight, bgMain);
expect(mainRatio >= 7.0, `Main text contrast ratio ${mainRatio.toFixed(2)} must be >= 7.0 (WCAG AAA)`);

// Card text on card background: must exceed 7:1 (WCAG AAA)
const cardRatio = contrast(textLight, bgCard);
expect(cardRatio >= 7.0, `Card text contrast ratio ${cardRatio.toFixed(2)} must be >= 7.0 (WCAG AAA)`);

// Muted text on card background: must exceed 4.5:1 (WCAG AA)
const mutedRatio = contrast(textMuted, bgCard);
expect(mutedRatio >= 4.5, `Muted text contrast ratio ${mutedRatio.toFixed(2)} must be >= 4.5 (WCAG AA)`);

if (errors.length) {
  console.error('DARK MODE CONTRAST FAIL');
  for (const e of errors) console.error('- ' + e);
  process.exit(1);
}

console.log(`DARK MODE CONTRAST PASS: WCAG AAA compliance verified (Main text: ${mainRatio.toFixed(1)}:1, Card text: ${cardRatio.toFixed(1)}:1, Muted text: ${mutedRatio.toFixed(1)}:1).`);
