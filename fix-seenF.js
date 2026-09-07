const fs = require('fs');
let vjs = fs.readFileSync('assets/js/validator.js', 'utf8');

// Revert the seenF hack
vjs = vjs.replace(/const seenF=new Set\(\);data\.findings\.forEach\(f=>\{if\(seenF\.has\(f\.id\)\)return;seenF\.add\(f\.id\);/g, "data.findings.forEach(f=>{");

// Deduplicate finding list cleanly at the top of rendering where `function renderData(data)` exists?
// Let's just find "const result=document.getElementById('result');" and insert deduplication on data.findings.
vjs = vjs.replace(/data\.findings\.forEach\(f=>\{/g, "(data.findings = [...new Map(data.findings.map(f=>[f.id||f.title, f])).values()]).forEach(f=>{");

fs.writeFileSync('assets/js/validator.js', vjs);
