import fs from 'node:fs';
import path from 'node:path';

const files=[
  ['scan-engine.ts','scan-engine.ts'],
  ['scan-request.ts','scan-request.ts'],
  ['mention-engine.ts','mention-engine.ts'],
  ['remediation-engine.ts','remediation-engine.ts']
];
for(const [sourceName,targetName] of files){
  const source=path.resolve(process.cwd(),`../functions/lib/${sourceName}`);
  const target=path.resolve(process.cwd(),`src/${targetName}`);
  if(!fs.existsSync(source))throw new Error(`Canonical shared source missing: ${source}`);
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.copyFileSync(source,target);
}
console.log('Synced canonical scan engine, request normalization and AI mention engine into Firebase build source.');
