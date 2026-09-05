import { build } from 'esbuild';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(here,'..');
const nodePaths=[path.resolve(here,'node_modules')];
const lib=path.resolve(here,'lib');
fs.mkdirSync(lib,{recursive:true});

const common={
  bundle:true,
  platform:'node',
  target:'node22',
  nodePaths,
  logLevel:'info',
  sourcemap:false,
  legalComments:'none'
};

async function bundle(entry,outfile,format='cjs'){
  await build({...common,entryPoints:[path.resolve(repo,entry)],outfile:path.resolve(outfile),format});
}

if(process.argv.includes('--test-llms')){
  await bundle('functions/lib/llms-engine.ts','/tmp/llms-engine.mjs','esm');
  console.log('Built /tmp/llms-engine.mjs with Firebase dependency resolution.');
}else{
  await bundle('functions/api/scan.ts',path.join(lib,'scan.cjs'));
  await bundle('functions/api/llms.ts',path.join(lib,'llms.cjs'));
  await bundle('functions/api/mandate.ts',path.join(lib,'mandate.cjs'));
  await bundle('functions/api/health.ts',path.join(lib,'health.cjs'));
  console.log('Firebase API bundles built from shared evidence-engine sources.');
}
