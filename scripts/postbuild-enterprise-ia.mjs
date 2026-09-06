import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8'),write=(p,s)=>fs.writeFileSync(p,s);
let llms=read('llms.txt');
if(!llms.includes('https://htmlandhtml.com/en/tools')){
  llms=llms.replace('## Platform and commercial boundary',`## Directory hubs\n- [English tools](https://htmlandhtml.com/en/tools): Focused diagnostic entry points backed by the canonical 12-engine scan core.\n- [Türkçe araçlar](https://htmlandhtml.com/tr/araclar): Canonical 12-motor çekirdeği kullanan odaklı araç girişleri.\n- [English guides](https://htmlandhtml.com/en/guides): Sourced decision-support guides linked to measurable tools.\n- [Türkçe rehberler](https://htmlandhtml.com/tr/rehberler): Ölçülebilir araçlara bağlanan kaynaklı karar destek rehberleri.\n\n## Platform and commercial boundary`);
  write('llms.txt',llms);
}
const pkg=JSON.parse(read('package.json'));
pkg.scripts['build:ia']='node scripts/build-enterprise-ia.mjs && node scripts/postbuild-enterprise-ia.mjs';
write('package.json',JSON.stringify(pkg,null,2)+'\n');
console.log('Enterprise IA post-build normalization complete');
