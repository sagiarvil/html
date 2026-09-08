import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const keyPages = [
  'index.html','tr/index.html','en/index.html','tr/platform/index.html','en/platform/index.html',
  'tr/methodology/index.html','en/methodology/index.html','tr/fiyatlandirma/index.html',
  'en/pricing/index.html','tr/fix-mandate/index.html','en/fix-mandate/index.html',
];
const failures = [];
for (const rel of keyPages) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const token of ['18', '105', 'G0–G9', 'v3-capability-contract']) {
    if (!text.includes(token)) failures.push(`${rel}: missing ${token}`);
  }
  if (!text.includes('v3-decision-line')) failures.push(`${rel}: missing evidence-to-purchase decision line`);
  if (!text.includes('30+')) failures.push(`${rel}: missing versioned 30+ file package boundary`);
  if (!text.includes('NOT_MEASURED')) failures.push(`${rel}: missing measurement boundary`);
}
const profile = JSON.parse(fs.readFileSync(path.join(root, 'audit-profile.json'), 'utf8'));
if (profile.version !== '3.0.0') failures.push('audit-profile.json: version is not 3.0.0');
if (profile.engineContract?.moduleCount !== 18) failures.push('audit-profile.json: moduleCount is not 18');
if (profile.engineContract?.controlCount !== 105) failures.push('audit-profile.json: controlCount is not 105');
if (profile.engineContract?.qualityGateCount !== 10) failures.push('audit-profile.json: G0–G9 must equal 10 gates');
if (profile.machineSurfaceContract?.maxPageLevelMarkdownManifests !== 30) failures.push('audit-profile.json: machine-surface maximum is not 30');
if (profile.executionContract?.scannerPhases !== 8) failures.push('audit-profile.json: scannerPhases is not 8');
if (profile.executionContract?.neutralPromptMaximum !== 15) failures.push('audit-profile.json: neutralPromptMaximum is not 15');

if (failures.length) {
  console.error(`V3 CAPABILITY CONTRACT TEST FAIL\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('V3 CAPABILITY CONTRACT TEST PASS');
