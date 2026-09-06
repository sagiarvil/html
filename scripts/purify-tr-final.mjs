import fs from 'node:fs';
import path from 'node:path';
const files=[];function walk(d){if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith('.html'))files.push(p)}}walk('tr');
const map=[['EVIDENCE','KANIT'],['consumer','son kullanıcı'],['Consumer','Son kullanıcı']];
function tx(s){for(const [a,b] of map)s=s.replace(new RegExp(`\\b${a}\\b`,'g'),b);return s}
function purify(html){const parts=html.split(/(<[^>]+>)/g);let skip=null;for(let i=0;i<parts.length;i++){if(parts[i].startsWith('<')){const m=parts[i].match(/^<\/?\s*([a-z0-9:-]+)/i);if(!m)continue;const tag=m[1].toLowerCase(),close=/^<\//.test(parts[i]);if(['script','style','code','pre'].includes(tag)){if(close&&skip===tag)skip=null;else if(!close)skip=tag}}else if(!skip)parts[i]=tx(parts[i])}return parts.join('')}
for(const f of files)fs.writeFileSync(f,purify(fs.readFileSync(f,'utf8')));console.log('Final Turkish UI language pass complete');
