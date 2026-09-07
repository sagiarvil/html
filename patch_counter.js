const fs = require('fs');
const file = 'assets/js/validator.js?v=3';
let content = fs.readFileSync(file, 'utf8');

// Replace eng:'12' with eng:'18'
content = content.replace(/eng:'12'/g, "eng:'18'");
// Replace /12 with /18
content = content.replace(/\/12 \$\{isTr\?'Motor Aktif':'Engines Active'\}/g, "/18 ${isTr?'Motor Aktif':'Engines Active'}");
content = content.replace(/engEl\.textContent='12'/g, "engEl.textContent='18'");

// Check if I missed any other '12 ' string in validator.js?v=3
content = content.replace(/12 independent analysis engines/g, "18 independent analysis engines");

fs.writeFileSync(file, content);
