const fs = require('fs');

const files = [
  'assets/js/intelligence-root.js',
  'assets/js/authority-tool.js'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // TR
  content = content.replace(
    /auditDiagNotice:'Teşhis: Ücretsiz Açık · Düzeltme: \$99 Yol Haritasında Dahil'/g,
    "auditDiagNotice:'Teşhis: Ücretsiz Açık · Tüm Düzeltmeler: $99 Tek Paket İçinde'"
  );
  content = content.replace(
    /capstoneCta:'🔒 Kod Tabanı İncelemesini \$99 Yol Haritası ile Başlat →'/g,
    "capstoneCta:'🔒 TÜM Çözümleri Tek Paket ($99) ile Aç →'"
  );
  content = content.replace(
    /Kaybı Önle →/g,
    "TÜM Çözümleri Tek Paket ($99) ile Aç →"
  );
  
  // EN
  content = content.replace(
    /auditDiagNotice:'Diagnosis: Free Open · Remediation: Included in \$99 Roadmap'/g,
    "auditDiagNotice:'Diagnosis: Free Open · All Fixes: Included in Single $99 Package'"
  );
  content = content.replace(
    /capstoneCta:'🔒 Initiate Codebase Review with \$99 Roadmap →'/g,
    "capstoneCta:'🔒 Unlock ALL Fixes with a Single $99 Package →'"
  );
  content = content.replace(
    /Prevent Loss →/g,
    "Unlock ALL Fixes with a Single $99 Package →"
  );

  fs.writeFileSync(file, content);
}
