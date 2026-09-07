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
  'scripts/build_mention_tracker.py',
  'scripts/finalize_commercial_artifacts.py'
];

for(const file of files) {
  if(!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/theme\.css\?v=\d+/g, 'theme.css?v=3');
  fs.writeFileSync(file, content);
}
