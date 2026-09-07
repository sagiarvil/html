const fs = require('fs');

const files = [
  'assets/js/intelligence-root.js?v=3',
  'assets/js/authority-tool.js?v=3',
  'assets/js/enterprise-runtime.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // TR replacements
  content = content.replace(
    /Teknik çözüm ████████ paketinde\. Kaybı önlemek için kilidi açın\./g,
    'Sitedeki TÜM sorunların çözümü TEK BİR ████████ paketindedir. Kaybı önlemek için tüm kilidi tek seferde açın.'
  );
  
  content = content.replace(
    /Bu ekranda listelenen 13 sorunun kök nedeni ve 5 kritik kontrol noktası ████████ ile güvence altına alınır\. Kaybı önlemek için kilidi açın\./g,
    'Sitedeki TÜM sorunların çözümü TEK BİR $99 paketindedir. 5 kritik kontrol noktası ████████ ile güvence altına alınır.'
  );

  // EN replacements
  content = content.replace(
    /The technical solution is in the ████████ package\. Unlock to prevent loss\./g,
    'The solution for ALL listed issues is in ONE SINGLE ████████ package. Unlock all fixes at once to prevent loss.'
  );

  content = content.replace(
    /The root causes for the 13 issues listed here and 5 critical checkpoints are secured via ████████\. Unlock to prevent loss\./g,
    'ALL listed issues are resolved with ONE SINGLE $99 package. 5 critical checkpoints are secured via ████████.'
  );

  fs.writeFileSync(file, content);
}

// commercial-intent.js
const ciFile = 'assets/js/commercial-intent.js';
if (fs.existsSync(ciFile)) {
  let ci = fs.readFileSync(ciFile, 'utf8');
  ci = ci.replace(
    /Bulgu listesi için teknik çözüm ████████ paketinde\. Kaybı önlemek için kilidi açın\./g,
    'Bulgu listesindeki TÜM sorunların teknik çözümü TEK BİR ████████ paketindedir. Kaybı önlemek için tüm kilidi tek seferde açın.'
  );
  ci = ci.replace(
    /The technical solution is in the ████████ package\. Unlock to prevent loss\./g,
    'The technical solution for ALL findings is in ONE SINGLE ████████ package. Unlock all fixes at once to prevent loss.'
  );
  fs.writeFileSync(ciFile, ci);
}
