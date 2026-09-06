import type { ScanResult } from './scan-engine';
import { generateRemediationReport, type RemediationReport } from './remediation-engine';
import { generateIntelligenceReport, type IntelligenceReport, type IntelligenceAnalysis, type IntelligenceKey } from './intelligence-engine';

export const FULL_SITE_FIX_MANDATE_PRICE_USD=149 as const;
export const FULL_SITE_FIX_MANDATE_MAX_PAGES=50 as const;

export interface IntelligencePrescription {
  analysis:IntelligenceKey;
  status:IntelligenceAnalysis['status'];
  priority_rank:number|null;
  implementation_state:'ACTIONABLE'|'VERIFY_FIRST'|'CONTEXT_REQUIRED';
  why:string;
  root_fix:string[];
  acceptance_tests:string[];
  regression_tests:string[];
  rollback_guidance:string[];
  do_not_fake:string[];
}

export interface FullSiteFixMandateReport extends RemediationReport {
  commercial_contract:'FULL_SITE_FIX_MANDATE';
  price_usd:typeof FULL_SITE_FIX_MANDATE_PRICE_USD;
  intelligence:IntelligenceReport;
  intelligence_actions:IntelligencePrescription[];
}

const commonDoNotFake=[
  'Do not invent rankings, traffic, citations, backlinks, field CWV, source-file paths, first-party data or third-party endorsements.',
  'Do not convert NOT_MEASURED or REQUIRES_CONTEXT into a pass/fail result without obtaining the missing evidence.'
];

function prescriptionFor(a:IntelligenceAnalysis,rank:number|null):IntelligencePrescription{
  const base={analysis:a.key,status:a.status,priority_rank:rank,why:a.boundaryEn,do_not_fake:[...commonDoNotFake]};
  if(a.status==='NOT_MEASURED'||a.status==='REQUIRES_CONTEXT'){
    const contextByKey:Partial<Record<IntelligenceKey,string[]>>={
      render_parity:['Capture the same canonical URL as raw HTTP HTML and as a controlled browser-rendered DOM snapshot.','Compare title, canonical, H1, main body text, JSON-LD and internal-link counts before prescribing a rendering change.'],
      indexnow_readiness:['Obtain verified IndexNow configuration or deployment context before changing discovery infrastructure.','Confirm the canonical host, key ownership and actual notification workflow; treat IndexNow as optional discovery acceleration, not a ranking requirement.'],
      codebase_seo_governance:['Connect or provide authorized repository/source context.','Inspect route registry, metadata generation, sitemap generation, hreflang/canonical logic and CI gates before prescribing file-level edits.'],
      orphan_pages:['Obtain both the sitemap URL set and bounded internal inlink graph before declaring any URL orphaned.']
    };
    return {...base,implementation_state:'CONTEXT_REQUIRED',root_fix:contextByKey[a.key]||['Collect the missing evidence declared by this analysis before prescribing a structural change.'],acceptance_tests:['Required context is present and the analysis can be rerun without NOT_MEASURED/REQUIRES_CONTEXT.'],regression_tests:['Rerun the canonical public scan and confirm no existing crawl/security boundary was weakened.'],rollback_guidance:['No production change should be made before evidence is obtained.']};
  }

  switch(a.key){
    case 'information_gain':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'For weak priority pages, add genuinely first-party information that is verifiable: original measurements, decision tables, calculators, methodology, observed results or documented operational evidence.',
        'Attach sources to factual claims and clearly separate first-party observations from third-party references.',
        'Do not pad pages with rewritten generic definitions merely to increase word count.'
      ],acceptance_tests:[
        'Each remediated priority page contains at least one verifiable first-party evidence unit or original decision artifact that was absent before.',
        'Claims introduced by the change can be traced to a first-party observation or cited source.',
        'The canonical page intent remains distinct from neighboring pages.'
      ],regression_tests:['Duplicate-title and intent-collision checks do not worsen.','No invented statistic or unsupported comparative claim is introduced.'],rollback_guidance:['Revert any new section whose evidence cannot be verified or whose addition creates intent duplication.'],do_not_fake:[...commonDoNotFake,'Never label this internal signal as a Google Information Gain score or claim whole-web novelty without external corpus evidence.']};

    case 'intent_cannibalization':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'Review colliding pages and assign one distinct primary search intent to each canonical URL.',
        'If two pages are genuinely duplicative, consolidate content and internal authority into the stronger canonical destination; otherwise differentiate title, H1, content promise and internal anchors to reflect distinct intent.',
        'Preserve valuable URLs with redirects only when consolidation is truly permanent.'
      ],acceptance_tests:['No two retained same-locale priority pages have materially identical title/H1/content promise for the same primary intent.','Any consolidated URL resolves directly to its final canonical destination without redirect chains.'],regression_tests:['Canonical, sitemap, hreflang and internal links all reference the final retained route.'],rollback_guidance:['Restore the prior route/content mapping if consolidation removes a demonstrably distinct user intent or breaks existing inbound traffic paths.']};

    case 'answer_extractability':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'Place a concise, self-contained answer immediately after the relevant question/heading on priority informational pages.',
        'Use clear definitions, lists, tables or step sequences when they improve extraction; do not force a fixed word count or pixel position.',
        'Ensure the extracted answer remains accurate when read without the preceding paragraph.'
      ],acceptance_tests:['A human reviewer can identify the primary answer without reading unrelated introductory copy.','The answer block is self-contained and consistent with the page title/H1 and structured data.'],regression_tests:['Heading hierarchy remains valid and the page does not gain duplicate H1s or contradictory answers.'],rollback_guidance:['Revert the answer block if it oversimplifies, changes legal/technical meaning or duplicates another canonical page intent.']};

    case 'entity_graph_integrity':
    case 'structured_graph_consistency':
      return {...base,implementation_state:'ACTIONABLE',root_fix:[
        'Normalize stable @id identifiers for the Organization, WebSite, WebPage and relevant Product/Service/Person entities.',
        'Link graph nodes with explicit references instead of duplicating conflicting entity objects across pages.',
        'Remove or correct JSON-LD properties that cannot be supported by visible/public facts.'
      ],acceptance_tests:['All JSON-LD blocks parse successfully.','Repeated primary entities resolve to stable @id values across tested canonical pages.','Structured claims match visible/public site facts.'],regression_tests:['No schema type disappears from pages where it remains factually applicable.','Canonical and breadcrumb URLs stay aligned with public routing.'],rollback_guidance:['Restore the previous valid graph if a new relationship cannot be supported or causes parser errors.']};

    case 'freshness_integrity':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'Align visible update dates, dateModified/datePublished and sitemap lastmod to real content changes only.',
        'Use the actual semantic publication/update event; never advance timestamps solely to imply freshness.',
        'Keep pages without meaningful updates unchanged rather than manufacturing activity.'
      ],acceptance_tests:['For sampled changed pages, visible dates, structured-data dates and sitemap lastmod do not contradict each other.','No timestamp is in the future or changes without a documented content/data change.'],regression_tests:['Deploying unrelated code does not rewrite all page lastmod values.'],rollback_guidance:['Restore previous timestamps if the new value cannot be tied to a real content or data change.']};

    case 'llm_knowledge_surface':
      return {...base,implementation_state:'ACTIONABLE',root_fix:[
        'Keep one concise root /llms.txt as a directory/manifest and link only to current, canonical, useful resources.',
        'For deeper machine-readable content, publish scoped Markdown resources with correct Content-Type and canonical references where the product architecture supports them.',
        'Continuously validate every linked resource; remove stale or broken machine-readable surfaces.'
      ],acceptance_tests:['/llms.txt is reachable, structurally valid under the published proposal profile and all sampled linked URLs return usable responses.','Machine-readable content does not contradict canonical HTML.'],regression_tests:['llms.txt remains labeled as a proposal and no ranking/citation guarantee appears.'],rollback_guidance:['Remove a newly added machine-readable surface if it becomes stale, contradictory or unreachable.'],do_not_fake:[...commonDoNotFake,'Do not call llms.txt an RFC or mandatory web/AI standard.']};

    case 'internal_link_semantic_alignment':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'Replace vague anchors on important routes with concise descriptive text that identifies the destination intent.',
        'Ensure internal links point to the final canonical URL and reinforce the intended topical hierarchy.',
        'Do not enforce an arbitrary semantic-similarity percentage.'
      ],acceptance_tests:['Priority internal links use descriptive anchors and resolve to live canonical destinations.','No new broken link or avoidable redirect is introduced.'],regression_tests:['Navigation, accessibility names and user-facing copy remain understandable after anchor changes.'],rollback_guidance:['Restore prior anchor/navigation wording if the new wording harms usability or misrepresents destination intent.']};

    case 'orphan_pages':
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:[
        'For confirmed valuable orphan pages, add contextual internal links from relevant hub/category pages and include the canonical URL in the sitemap where appropriate.',
        'For URLs not intended for discovery, remove them from indexable discovery surfaces or apply the correct index policy instead of manufacturing links.'
      ],acceptance_tests:['Every retained indexable priority page is reachable through at least one meaningful internal path and its discovery policy is consistent.'],regression_tests:['New links do not create circular navigation clutter or duplicate-intent hubs.'],rollback_guidance:['Remove added links if the target is not intended to be indexable or the relationship is not contextually valid.']};

    case 'discovery_path':
      return {...base,implementation_state:'ACTIONABLE',root_fix:[
        'Align robots.txt, sitemap, canonicals, internal links, llms.txt and documented API/machine-readable surfaces so they point to the same intended public information architecture.',
        'Remove discovery references to dead, redirected or non-canonical destinations.'
      ],acceptance_tests:['All sampled discovery surfaces resolve to intended final canonical public URLs.','Search/retrieval bot policy choices remain explicit and do not conflate search access with training controls.'],regression_tests:['SSRF/security controls and intentional noindex/private routes remain protected.'],rollback_guidance:['Revert only the affected discovery declaration if it exposes a route that should remain private or non-indexable.']};

    default:
      return {...base,implementation_state:'VERIFY_FIRST',root_fix:['Use the measured evidence and affected URL list to correct the smallest structural cause without changing unrelated business logic.'],acceptance_tests:['The measured symptom no longer reproduces on affected URLs after deployment.'],regression_tests:['The 12 canonical engine scores remain computable and no new P0/P1 finding is introduced.'],rollback_guidance:['Revert the isolated change if acceptance tests fail or a protected flow regresses.']};
  }
}

function buildIntelligenceActions(intelligence:IntelligenceReport):IntelligencePrescription[]{
  const ranks=new Map(intelligence.topPriorities.map(p=>[p.analysis,p.rank]));
  return intelligence.analyses
    .filter(a=>a.status!=='PASS')
    .map(a=>prescriptionFor(a,ranks.get(a.key)||null))
    .sort((a,b)=>(a.priority_rank??999)-(b.priority_rank??999)||a.analysis.localeCompare(b.analysis));
}

function appendIntelligenceMarkdown(md:string,actions:IntelligencePrescription[]):string{
  if(!actions.length)return md;
  let out=`${md}\n\n---\n\n## SEARCH & AI INTELLIGENCE IMPLEMENTATION CONTRACT\n\n`;
  for(const a of actions){
    out+=`### ${a.priority_rank?`#${a.priority_rank} `:''}${a.analysis}\n`;
    out+=`- **State:** ${a.implementation_state}\n- **Observed Status:** ${a.status}\n- **Why / Boundary:** ${a.why}\n`;
    out+=`- **Root Fix:** ${a.root_fix.join(' ')}\n`;
    out+=`- **Acceptance:** ${a.acceptance_tests.join(' ')}\n`;
    out+=`- **Regression:** ${a.regression_tests.join(' ')}\n`;
    out+=`- **Rollback:** ${a.rollback_guidance.join(' ')}\n`;
    out+=`- **Do Not Fake:** ${a.do_not_fake.join(' ')}\n\n`;
  }
  return out;
}

/**
 * Commercial boundary wrapper for the Cursor remediation engine.
 * The canonical public scanner remains 50 pages on every product surface.
 * This function is called only after the API entitlement gate has passed.
 */
export function generateFullSiteFixMandate(scan:ScanResult,baselineScan?:ScanResult):FullSiteFixMandateReport{
  const legacy=generateRemediationReport(scan,'PRO',baselineScan);
  const intelligence=generateIntelligenceReport(scan);
  const intelligence_actions=buildIntelligenceActions(intelligence);
  legacy.coverage.max_deep_analyzed_pages=FULL_SITE_FIX_MANDATE_MAX_PAGES;
  legacy.coverage.analyzed_urls=Math.min(Number(legacy.coverage.analyzed_urls||0),FULL_SITE_FIX_MANDATE_MAX_PAGES);
  legacy.plan_type='PRO';
  legacy.markdown=String(legacy.markdown||'')
    .replace(/\$99/g,'$149')
    .replace(/100-page/gi,'50-page')
    .replace(/100 page/gi,'50 page')
    .replace(/25 analyzed pages/gi,'50 analyzed pages');
  legacy.markdown=appendIntelligenceMarkdown(legacy.markdown,intelligence_actions);
  return Object.assign(legacy,{
    commercial_contract:'FULL_SITE_FIX_MANDATE' as const,
    price_usd:FULL_SITE_FIX_MANDATE_PRICE_USD,
    intelligence,
    intelligence_actions
  });
}
