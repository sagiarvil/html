const fs = require('fs');

const files = [
  'scripts/apply_enterprise_system.py',
  'scripts/build_homepages.py',
  'scripts/build_hubs.py',
  'scripts/build_tools.py',
  'scripts/inject_ai_expectation.py',
  'scripts/apply_customer_positioning.py'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace Turkish leakages
  content = content.replace(
    /22 dosyalık eksiksiz mühendislik paketini içerir/g,
    'Kalıcı çözüm + rollback güvencesi alır.'
  );
  content = content.replace(
    /Otomatik ZIP teslim paketi \(22 dosyalık tam mühendislik kiti\)/g,
    '5 kritik kontrol noktası ████████ ile güvence altına alınır'
  );
  content = content.replace(
    /Kök neden ve P0–P3 uygulama sırası/g,
    'Kök neden teşhisi ve ████████'
  );
  content = content.replace(
    /Kabul ve regresyon testleri \+ Rollback planı/g,
    'Test ve güvence sistemleri ████████'
  );
  content = content.replace(
    /Yol Haritasını Aç — \$99/g,
    'Kaybı Önle — $99'
  );
  content = content.replace(
    /22 dosyalık tam mühendislik kiti/g,
    'Kalıcı çözüm güvencesi'
  );
  
  // Replace English leakages
  content = content.replace(
    /Includes the complete 22-file production engineering package/g,
    'Unlocking provides a permanent solution + rollback guarantee.'
  );
  content = content.replace(
    /Automatic ZIP delivery package \(full 22-file engineering bundle\)/g,
    '5 critical checkpoints are secured via ████████'
  );
  content = content.replace(
    /Full 9-pillar issue inventory \+ P0–P3 order/g,
    'Full 9-pillar issue inventory + ████████'
  );
  content = content.replace(
    /Acceptance \+ regression tests/g,
    'Testing and assurance systems ████████'
  );
  content = content.replace(
    /Unlock Roadmap — \$99/g,
    'Prevent Loss — $99'
  );
  
  // build_hubs.py
  content = content.replace(
    /kök neden, kabul testleri, regresyon testleri ve geri alma planları sunulur/g,
    '5 kritik kontrol noktası ████████ ile güvence altına alınır'
  );
  content = content.replace(
    /Delivers root causes, ordered PR steps, acceptance tests, and rollback safeguards/g,
    'Unlocking provides a permanent solution + rollback guarantee'
  );
  content = content.replace(
    /\$149 Fix Mandate katmanında ise kök nedenin hangi sırayla, hangi testlerle ve hangi geri alma adımlarıyla çözüleceği sunulur/g,
    'Teknik çözüm ████████ paketinde. Kaybı önlemek için kilidi açın'
  );
  content = content.replace(
    /The \$149 Fix Mandate delivers root causes, PR sequence, test assertions, and rollback plans/g,
    'The technical solution is in the ████████ package. Unlock to prevent loss'
  );
  content = content.replace(
    /mühendisler ve yapay zeka kodlama ajanları için öncelikli kök düzeltmeler, otomatik kabul testleri ve geri alma planları/g,
    'kalıcı çözüm + rollback güvencesi alır'
  );
  content = content.replace(
    /Prioritized root fixes, automated acceptance tests, regression assertions, and rollback plans/g,
    '5 critical checkpoints are secured via ████████'
  );
  
  fs.writeFileSync(file, content);
}
