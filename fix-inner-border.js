const fs = require('fs');

// 1. Fix premium-experience.css
let pe = fs.readFileSync('assets/css/premium-experience.css', 'utf8');
pe = pe.replace(
  /\.scanbox \.field input\{min-width:0;width:100%;height:58px;padding:0 18px;border-radius:12px;font-size:16px;background:transparent!important;color:var\(--theme-text-strong, #ffffff\)!important\}/g,
  '.scanbox .field input{min-width:0;width:100%;height:58px;padding:0 18px;border:none!important;border-width:0!important;outline:none!important;outline-width:0!important;box-shadow:none!important;border-radius:0!important;-webkit-appearance:none!important;appearance:none!important;font-size:16px;background:transparent!important;color:var(--theme-text-strong, #ffffff)!important}.scanbox .field input:focus,.scanbox .field input:focus-visible,.scanbox .field input:active{border:none!important;outline:none!important;box-shadow:none!important}'
);
fs.writeFileSync('assets/css/premium-experience.css', pe);

// 2. Fix theme.css
let theme = fs.readFileSync('assets/css/theme.css', 'utf8');
const borderFix = `
/* ==========================================================================
   PERFECT SCANBOX: ELIMINATE ANY INNER BORDER / OUTLINE IN OVAL INPUT
   ========================================================================== */
#domainInput,
.scanbox input,
.scanbox .field input,
.field input,
form#scanForm input {
  border: none !important;
  border-width: 0 !important;
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  background: transparent !important;
}

#domainInput:focus,
#domainInput:focus-visible,
#domainInput:active,
.scanbox input:focus,
.scanbox input:focus-visible,
.scanbox input:active,
.scanbox .field input:focus,
.scanbox .field input:focus-visible,
.scanbox .field input:active,
.field input:focus,
.field input:focus-visible,
.field input:active,
form#scanForm input:focus,
form#scanForm input:focus-visible,
form#scanForm input:active {
  border: none !important;
  border-width: 0 !important;
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none !important;
}
`;
theme += "\n" + borderFix;
fs.writeFileSync('assets/css/theme.css', theme);

// 3. Fix validator.css
let val = fs.readFileSync('assets/css/validator.css', 'utf8');
val = val.replace(
  /\.scanbox \.field input \{/g,
  '.scanbox .field input {\n  border: none !important;\n  outline: none !important;\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  -webkit-appearance: none !important;\n  appearance: none !important;'
);
fs.writeFileSync('assets/css/validator.css', val);

// 4. Bump cache busters in build scripts
const files = [
  'scripts/build_homepages.py',
  'scripts/build_llms_news.py',
  'scripts/build_ai_visibility_authority.py',
  'scripts/build_guides.py',
  'scripts/build_tools.py',
  'scripts/build_glossary.py',
  'scripts/build_authority_and_legal.py',
  'scripts/build_hubs.py',
  'scripts/build_mention_tracker.py',
  'scripts/apply_premium_experience.py',
  'scripts/finalize_commercial_artifacts.py'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/premium-experience\.css\?v=\d+/g, 'premium-experience.css?v=3');
  content = content.replace(/theme\.css\?v=\d+/g, 'theme.css?v=9');
  content = content.replace(/validator\.css\?v=\d+/g, 'validator.css?v=3');
  fs.writeFileSync(file, content);
}

