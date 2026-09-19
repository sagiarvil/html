import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contracts = JSON.parse(fs.readFileSync(path.join(root, 'config/public-surface-contracts.json'), 'utf8'));
const failures = [];

const expectedHomes = ['index.html','tr/index.html','en/index.html'];
if (JSON.stringify(contracts.homePages) !== JSON.stringify(expectedHomes)) {
  failures.push('homePages contract drifted from the three public home surfaces');
}
for (const home of contracts.homePages) {
  if (contracts.v3DetailPages.includes(home)) failures.push(`home/detail ownership overlap: ${home}`);
}

const mustUseSharedContract = [
  'scripts/enforce_v3_capability_contract.py',
  'scripts/close_v3_sales_capability_drift.py',
  'scripts/enforce_final_delivery_boundaries.py',
  'scripts/enforce_preferred_source_eligibility.py',
  'tests/integrity/v3-capability-contract.test.mjs',
  'tests/integrity/preferred-source-eligibility.test.mjs',
];

for (const rel of mustUseSharedContract) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  if (!text.includes('public-surface-contracts.json')) {
    failures.push(`${rel}: does not consume shared public-surface contract`);
  }
}

for (const home of contracts.homePages) {
  const html = fs.readFileSync(path.join(root, home), 'utf8');
  if (!html.includes('PDF-INSPIRED CUSTOMER STORY V1')) failures.push(`${home}: customer-first PDF story missing`);
  if (html.includes('v3-capability-contract')) failures.push(`${home}: dense V3 matrix leaked into homepage`);
}

if (failures.length) {
  console.error('PUBLIC SURFACE OWNERSHIP FAIL');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('PUBLIC SURFACE OWNERSHIP PASS: homepage, V3 detail and Preferred Sources ownership are SSOT-aligned.');
