const fs = require('fs');

const filesToFix = [
  'scripts/build_homepages.py',
  'scripts/build_tools.py',
  'scripts/build_guides.py',
  'scripts/inject_ai_expectation.py',
  'scripts/apply_customer_positioning.py',
  'scripts/build_authority_and_legal.py'
];

for(const file of filesToFix) {
  if(!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/22 dosya/gi, '████████');
  content = content.replace(/22-file ZIP/gi, '████████');
  content = content.replace(/22-File ZIP/g, '████████');
  content = content.replace(/P0-P3/g, '████████');
  content = content.replace(/P0–P3/g, '████████');
  content = content.replace(/rollback/gi, '████████');
  content = content.replace(/15 dakika/gi, '████████');
  content = content.replace(/Fix Mandate/gi, 'Yol Haritası');
  content = content.replace(/Otomatik düzeltme kodları/gi, '████████');
  content = content.replace(/Otomatik kod paketi/gi, '████████');
  
  fs.writeFileSync(file, content);
}

