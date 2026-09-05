import fs from 'node:fs';
import path from 'node:path';

const source=path.resolve(process.cwd(),'../functions/lib/scan-engine.ts');
const target=path.resolve(process.cwd(),'src/scan-engine.ts');
if(!fs.existsSync(source))throw new Error(`Canonical scan engine missing: ${source}`);
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.copyFileSync(source,target);
console.log('Synced canonical functions/lib/scan-engine.ts into Firebase build source.');
