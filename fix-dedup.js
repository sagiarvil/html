const fs = require('fs');
let vjs = fs.readFileSync('assets/js/validator.js', 'utf8');

// Replace "data.findings.forEach(f=>{" with a deduplication wrapper
vjs = vjs.replace(/data\.findings\.forEach\(f=>\{/g, "const seenF=new Set();data.findings.forEach(f=>{if(seenF.has(f.id))return;seenF.add(f.id);");

fs.writeFileSync('assets/js/validator.js', vjs);
