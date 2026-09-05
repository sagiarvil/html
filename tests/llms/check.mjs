import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const engine=await import(pathToFileURL('/tmp/llms-engine.mjs').href);
const {parseLlms,validateAst,llmsCandidates}=engine;

function rules(markdown){const p=parseLlms(markdown);return validateAst(p.nodes,markdown).rules}
function get(rs,id){const r=rs.find(x=>x.id===id);assert.ok(r,`missing rule ${id}`);return r}

const valid=`# Example\n\n> Concise project summary.\n\nImportant interpretation notes.\n\n## Docs\n\n- [Guide](https://example.com/guide.md): Main guide\n- [API](https://example.com/api.md)\n\n## Optional\n\n- [Archive](https://example.com/archive.md)\n`;
let rs=rules(valid);
for(const id of ['LLM-R001','LLM-R002','LLM-R003','LLM-R004','LLM-R005','LLM-R006','LLM-R007','LLM-R008','LLM-R009'])assert.equal(get(rs,id).ok,true,`${id} should pass valid fixture`);
assert.equal(get(rs,'LLM-R011').ok,true,'Optional is convention, not a failure gate');

rs=rules(`> summary\n\n## Docs\n- [A](https://example.com/a.md)`);
assert.equal(get(rs,'LLM-R001').ok,false,'missing H1 must fail');
assert.equal(get(rs,'LLM-R003').ok,false,'H1 must lead structural content');

rs=rules(`# One\n# Two\n\n## Docs\n- [A](https://example.com/a.md)`);
assert.equal(get(rs,'LLM-R001').ok,false,'multiple H1 must fail');

rs=rules(`# One\n\n## Docs\n- no-link-item`);
assert.equal(get(rs,'LLM-R006').ok,false,'H2 file-list item requires a markdown hyperlink');

rs=rules(`# One\n\n## Docs\nThis prose is not a file list.`);
assert.equal(get(rs,'LLM-R007').ok,false,'free prose in H2 file-list section must be flagged');

rs=rules(`# One\n\n## Docs\n- [A](http://example.com/a.md)`);
assert.equal(get(rs,'LLM-R008').ok,false,'HTTP resource is a recommendation failure, not a required-section failure');
assert.equal(get(rs,'LLM-R008').class,'RECOMMENDATION');

rs=rules(`---\ntitle: metadata\n---\n# One\n\n## Docs\n- [A](https://example.com/a.md)`);
assert.equal(get(rs,'LLM-R013').ok,true,'frontmatter is telemetry only because v2 does not explicitly prohibit it');
assert.equal(get(rs,'LLM-R013').class,'INTERNAL_HEURISTIC');

const c=llmsCandidates('https://example.com/docs/api/page.html');
assert.deepEqual(c,[
  'https://example.com/docs/api/llms.txt',
  'https://example.com/docs/llms.txt',
  'https://example.com/llms.txt'
],'most-specific path-specific llms.txt must be checked first');

const exact=llmsCandidates('https://example.com/docs/llms.txt');
assert.deepEqual(exact,['https://example.com/docs/llms.txt']);

console.log('LLMS V2 FIXTURE PASS: required H1, path specificity, file-list structure, recommendation separation and non-normative heuristics verified.');
