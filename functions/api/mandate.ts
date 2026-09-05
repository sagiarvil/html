import { runScan } from '../lib/scan-orchestrator';
import type { Finding } from '../lib/scan-engine';

interface Env{MANDATE_ACCESS_TOKEN?:string}
type Plan={rootFix:string;recovery:string;prevention:string;test:string;rollback:string;stop:string};

function planFor(f:Finding):Plan{
  const id=f.id;
  if(/^LLM-R00[12]$/.test(id))return{
    rootFix:'Make the selected applicable llms.txt contain exactly one non-empty H1 as its first structural section after an optional BOM. Do not add extra H1 headings for categories; use H2 file-list sections.',
    recovery:'Publish only the minimum structural correction and re-run the formal llms.txt parser before touching linked resources.',
    prevention:'Keep the llms.txt v2 fixture/parser check in CI and version the rule set independently from application code.',
    test:'Fetch the most-specific applicable llms.txt, parse its AST, and require LLM-R001 and LLM-R002 to pass with h1_count=1.',
    rollback:'Restore the last known valid llms.txt if the new file changes published resource meaning or breaks downstream tooling.',
    stop:'Stop if the file being edited is not the most-specific llms.txt that applies to the target route.'};
  if(id.startsWith('LLM-R00')||id.startsWith('LLMS-LINK-'))return{
    rootFix:'Correct the measured llms.txt structure or resource reference without inventing requirements that are not present in v2. Preserve H1-first ordering, H2 file-list semantics, valid Markdown links and direct reachable destinations.',
    recovery:'Fix blocking structure/reachability findings first, then re-probe only affected links before a full re-scan.',
    prevention:'Run the versioned llms.txt parser plus bounded link checker in CI and keep official-spec rules separate from recommendations and internal heuristics.',
    test:'Re-run /api/llms against the same path. Acceptance requires the original issue ID to disappear and every changed file-list target to return an intended 2xx response.',
    rollback:'Revert the affected llms.txt section or URL if a replacement changes meaning, exposes unintended content, or introduces a new broken destination.',
    stop:'Stop if the proposed fix depends on treating an advisory heuristic as an official spec requirement.'};
  if(id.startsWith('AI-POLICY-'))return{
    rootFix:'Trace the exact robots.txt group controlling this search/retrieval crawler and change only that publisher policy if access is intentionally desired. Keep training-control tokens separate from search/retrieval tokens.',
    recovery:'Publish the smallest robots.txt change and verify longest-match REP behavior at path /.',
    prevention:'Contract-test crawler role mappings and robots outcomes against the versioned vendor registry.',
    test:'GET robots.txt and evaluate the exact user-agent token. Acceptance requires the intended allow/disallow result without altering unrelated crawler groups.',
    rollback:'Restore the previous robots.txt immediately if unrelated crawler access changes.',
    stop:'Stop if product/legal policy intentionally requires the crawler to remain blocked.'};
  if(id.startsWith('TECH-CANON'))return{
    rootFix:'Add one deterministic self-referencing canonical generated from the canonical origin and route pathname. Do not derive it from untrusted request headers.',
    recovery:'Publish canonical only on affected indexable routes, purge relevant cache, and re-fetch the sample.',
    prevention:'Add route-level SEO tests asserting exactly one intended canonical per indexable page.',
    test:'Fetch affected URLs and assert one absolute HTTPS rel=canonical with the intended host/path and no conflicting header canonical.',
    rollback:'Revert the metadata/layout change if routes canonicalize to the wrong origin or path.',
    stop:'Stop if route ownership or intended canonical target cannot be determined from source/configuration.'};
  if(id.startsWith('TECH-NOINDEX'))return{
    rootFix:'Trace noindex across HTML metadata and X-Robots-Tag. Remove it only from routes that are explicitly intended to be indexable.',
    recovery:'Re-fetch affected routes after cache purge and confirm both HTML and response headers.',
    prevention:'Maintain an explicit indexability allow/deny matrix and test it in CI.',
    test:'curl/fetch the route; an intended-indexable page must not emit noindex in either surface.',
    rollback:'Restore prior indexability configuration if protected/private routes become indexable.',
    stop:'Stop if intended indexability is not documented or cannot be established.'};
  if(id.startsWith('SCHEMA-'))return{
    rootFix:'Generate valid JSON-LD from the same source of truth as visible content. Use stable @id values and only claims represented by authoritative page/business data.',
    recovery:'Remove or correct invalid/conflicting blocks and re-validate rendered HTML.',
    prevention:'Add JSON parse tests and visible-content consistency checks for critical identity fields.',
    test:'Parse every application/ld+json block and verify critical values against rendered or canonical source data.',
    rollback:'Restore the last valid schema if the new graph becomes invalid or contradicts visible content.',
    stop:'Stop if a proposed structured-data claim has no authoritative source.'};
  if(id.startsWith('A11Y-'))return{
    rootFix:'Correct the owning component’s semantic contract: document language, alternative text, programmatic form labels, accessible names, landmarks or ARIA state as measured.',
    recovery:'Patch semantics without changing form submission, navigation destinations or business rules.',
    prevention:'Add automated accessibility assertions plus keyboard/screen-reader smoke tests for reusable components.',
    test:'Rendered output must expose the expected language/label/name relationship and the affected user flow must still work.',
    rollback:'Revert the isolated semantic patch if event handling, navigation or submission regresses.',
    stop:'Stop if the component owner or expected accessible behavior cannot be established.'};
  if(id.startsWith('PERF-'))return{
    rootFix:'Reduce the measured transfer/render-blocking source without changing application behavior. Optimize one dependency or payload class at a time.',
    recovery:'Capture before/after transfer size and blocking counts for the affected route.',
    prevention:'Set release budgets for HTML/script weight and blocking resources. Keep field CWV separate unless CrUX/PageSpeed evidence exists.',
    test:'Re-fetch the route, compare measured hygiene metrics, then run functional smoke tests for touched interactions.',
    rollback:'Revert the specific optimization if hydration, analytics, auth, checkout or interactions change.',
    stop:'Stop if the proposal claims LCP/INP/CLS improvement without field/lab evidence that actually measures those metrics.'};
  if(id.startsWith('SEC-'))return{
    rootFix:'Apply the missing transport/browser control at the edge or application header owner. For CSP, inventory dependencies and stage report-only before enforcement when risk is non-trivial.',
    recovery:'Remove insecure references/forms and verify critical resources, auth and integrations still load.',
    prevention:'Add header and mixed-content checks to release gates.',
    test:'Inspect response headers and browser/network failures. Acceptance requires the target control without blocking required application behavior.',
    rollback:'Restore the previous policy immediately if production resources, authentication, payment or integrations are blocked.',
    stop:'Stop if required third-party origins or policy ownership are unknown.'};
  if(id.startsWith('LINK-'))return{
    rootFix:'Update owned internal references to the intended final canonical destination, repair missing routes, or remove obsolete links rather than adding unnecessary redirect chains.',
    recovery:'Repair highest-impact navigation/CTA links first, then re-probe every affected target.',
    prevention:'Run internal-link validation in CI or release smoke checks.',
    test:'HEAD/GET each affected URL; acceptance requires an intended 2xx destination or an explicitly approved redirect.',
    rollback:'Restore the prior target if the replacement is not semantically equivalent or breaks user flow.',
    stop:'Stop if the correct destination cannot be determined.'};
  if(id.startsWith('TRUST-'))return{
    rootFix:'Expose missing trust/identity surfaces from authoritative business data. Never invent authors, dates, policies, addresses, credentials or legal statements.',
    recovery:'Link existing authoritative pages before creating new claims.',
    prevention:'Assign ownership for identity/legal pages and include them in release/link checks.',
    test:'Verify the route is public, internally linked and consistent with schema and visible identity data.',
    rollback:'Remove newly introduced claims if authoritative evidence cannot support them.',
    stop:'Stop on any claim that requires unavailable legal/business verification.'};
  if(id.startsWith('CONV-'))return{
    rootFix:'Make the primary next action explicit and trace CTA → destination/form → success state without changing commercial rules.',
    recovery:'Repair broken public entry points before redesigning funnel behavior.',
    prevention:'Add synthetic smoke tests for the primary non-destructive conversion path.',
    test:'Traverse the path through the last non-destructive step and assert each expected transition/status.',
    rollback:'Restore prior routing if pricing, checkout, auth or lead delivery changes unexpectedly.',
    stop:'Stop before any destructive purchase/submission action unless the environment and authorization explicitly permit it.'};
  if(id.startsWith('AGENT-'))return{
    rootFix:'Publish only agent-discovery surfaces the site actually supports. Keep A2A, MCP and OpenAPI contracts distinct and versioned; do not publish placeholder endpoints.',
    recovery:'Remove stale discovery advertising before implementing a new protocol.',
    prevention:'Version and contract-test every advertised agent/API endpoint.',
    test:'GET the advertised endpoint and validate its documented protocol/schema. Absence alone must not be treated as a search-ranking defect.',
    rollback:'Remove the discovery link/endpoint if the capability is not maintained.',
    stop:'Stop if implementation would misrepresent unsupported agent capabilities.'};
  return{
    rootFix:'Locate the code/configuration owner for the measured behavior and change the source of truth rather than patching the visible symptom.',
    recovery:'Apply the smallest reversible change that restores the measured target state.',
    prevention:'Convert the issue evidence into a deterministic regression check.',
    test:'Re-run the original evidence check and every user flow touched by the change.',
    rollback:'Revert the isolated change if acceptance or regression tests fail.',
    stop:'Stop if source ownership, intended behavior or required authorization cannot be established.'};
}

function esc(v:any){return String(v??'').replace(/\r/g,'').replace(/`/g,"'")}
function severityRank(s:string){return({critical:0,high:1,medium:2,low:3,info:4} as any)[s]??9}
function buildIssuePlans(scan:any){return(scan.findings||[]).filter((f:Finding)=>f.severity!=='info').sort((a:Finding,b:Finding)=>severityRank(a.severity)-severityRank(b.severity)).map((f:Finding)=>({issueId:f.id,severity:f.severity,confidence:f.confidence,sourceClass:f.sourceClass,url:f.url||scan.url,evidence:f.evidence,requiresSourceVerification:f.requiresSource,...planFor(f)}))}
function buildMarkdown(domain:string,scan:any,plans:any[]){let out=`# HTML&HTML — Full Site Fix Mandate\n\n> Domain: ${domain}\n> Scan ID: ${scan.scanId}\n> Baseline: ${scan.overall}/100\n> Evidence Engine: ${scan.engine?.version||'unknown'}\n> Standards Registry: ${scan.registry?.version||'unknown'}\n> llms.txt spec: ${scan.llmsAudit?.spec?.version||'n/a'} (${scan.llmsAudit?.spec?.modified||'n/a'})\n> Generated: ${new Date().toISOString()}\n\n## Objective\n\nRemove verified causes represented by this scan without changing business logic, authentication, payment behavior, database/API contracts, analytics semantics or legal/commercial claims unless a verified issue explicitly concerns them.\n\n## Non-Negotiable Constraints\n\n- Work on an isolated branch with a reversible checkpoint before modification.\n- Never log secrets, access tokens, cookies, authorization headers or personal data.\n- Never bypass authentication or authorization.\n- Public-scan findings must not invent source file names. Locate the owning source/configuration before editing.\n- Treat OFFICIAL_STANDARD, OFFICIAL_VENDOR, PROPOSAL, MEASURED and INTERNAL_HEURISTIC as different evidence classes.\n- Apply P0/P1 work before lower-severity work when dependencies overlap.\n- Stop if observed source/production behavior contradicts the scan evidence.\n\n## Baseline Scores\n\n| Engine | Score |\n|---|---:|\n`;
for(const [k,v] of Object.entries(scan.scores||{}))out+=`| ${esc(k)} | ${esc(v)}/100 |\n`;
out+=`\n## Issue Execution Contracts\n\n`;
for(const p of plans){out+=`### ${esc(p.issueId)}\n\n- Severity: **${String(p.severity).toUpperCase()}**\n- Confidence: **${esc(p.confidence)}**\n- Evidence class: **${esc(p.sourceClass)}**\n- URL: ${esc(p.url)}\n- Evidence: \`${esc(p.evidence)}\`\n- Source status: ${p.requiresSourceVerification?'SOURCE VERIFICATION REQUIRED — do not guess a path.':'Public/config surface; still confirm owner before editing.'}\n\n**ROOT FIX**  \n${p.rootFix}\n\n**RECOVERY**  \n${p.recovery}\n\n**PREVENTION**  \n${p.prevention}\n\n**ACCEPTANCE / FALSIFICATION TEST**  \n${p.test}\n\n**FAILURE / STOP SIGNAL**  \n${p.stop}\n\n**ROLLBACK**  \n${p.rollback}\n\n`}
out+=`## llms.txt Audit Trail\n\n`;
if(scan.llmsAudit?.present){out+=`- Target: ${esc(scan.llmsAudit.target)}\n- SHA-256: ${esc(scan.llmsAudit.response?.sha256)}\n- HTTP: ${esc(scan.llmsAudit.response?.status)}\n- Content-Type: ${esc(scan.llmsAudit.response?.contentType)}\n- Bytes: ${esc(scan.llmsAudit.response?.bytes)}\n- Links probed: ${esc(scan.llmsAudit.links?.length||0)}\n- Formal score: ${esc(scan.llmsAudit.scores?.overall)}/100\n- Verdict: ${esc(scan.llmsAudit.verdict)}\n`;}else out+=`- No applicable llms.txt was found. This is proposal-readiness telemetry, not a search-ranking failure.\n`;
out+=`\n## Implementation Order\n\n1. Capture baseline responses and create backup/branch.\n2. Re-localize each P0/P1 issue to its owning source/config before editing.\n3. Apply the smallest dependency-safe root fix.\n4. Run the issue acceptance/falsification test.\n5. Run build/unit/integration tests available in the codebase.\n6. Re-scan with HTML&HTML using fresh=true.\n7. Resolve still-valid lower-severity findings.\n8. Run regression tests for auth, session, API, forms, analytics and payment/checkout surfaces that were touched.\n\n## Release Gate\n\nFINAL is allowed only when all three conditions hold:\n\n1. The measured symptom is gone.\n2. The root cause is confirmed by test, not assumption.\n3. Repeating the same failure mode does not break the system.\n\nIf any gate fails: **DO NOT RELEASE — ROLLBACK OR RE-LOCALIZE THE FAULT BOUNDARY.**\n`;
return out}

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    const expected=env.MANDATE_ACCESS_TOKEN;
    if(!expected)return Response.json({error:'Paid mandate service is not activated: entitlement secret is missing.'},{status:503});
    const auth=request.headers.get('authorization')||'';
    if(auth!==`Bearer ${expected}`)return Response.json({error:'Valid paid entitlement required'},{status:402});
    const body:any=await request.json();
    if(!body||typeof body.domain!=='string'||!body.domain.trim())return Response.json({error:'Domain required'},{status:400});
    const scan=await runScan(body.domain);const plans=buildIssuePlans(scan);const markdown=buildMarkdown(scan.domain,scan,plans);
    return Response.json({product:'HTML&HTML Full Site Fix Mandate',priceUsd:149,domain:scan.domain,scanId:scan.scanId,engine:scan.engine,registry:scan.registry,issuePlans:plans,markdown,scan},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){return Response.json({error:e?.message||'Mandate generation failed'},{status:400,headers:{'cache-control':'no-store'}})}
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
