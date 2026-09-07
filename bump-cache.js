const fs = require('fs');

const files = [
  'scripts/build_homepages.py',
  'scripts/build_llms_news.py',
  'scripts/build_ai_visibility_authority.py',
  'scripts/build_guides.py',
  'scripts/build_tools.py',
  'scripts/build_glossary.py',
  'scripts/build_authority_and_legal.py',
  'scripts/build_hubs.py',
  'scripts/build_mention_tracker.py'
];

for(const file of files) {
  if(!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/theme\.js\?v=\d+/g, 'theme.js?v=7');
  content = content.replace(/enterprise-theme-engine\.js(\?v=\d+)?/g, 'enterprise-theme-engine.js?v=2');
  fs.writeFileSync(file, content);
}
