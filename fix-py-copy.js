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
  
  // TR
  content = content.replace(
    /Kalıcı çözüm \+ rollback güvencesi alır/g,
    'TÜM sorunlar için kalıcı çözüm + rollback güvencesi alır'
  );
  
  // EN
  content = content.replace(
    /Unlocking provides a permanent solution \+ rollback guarantee/g,
    'Unlocking provides a permanent solution for ALL issues + rollback guarantee'
  );

  fs.writeFileSync(file, content);
}
