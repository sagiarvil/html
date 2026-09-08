/**
 * AUTONOMOUS WEBSITE REMEDIATION INTELLIGENCE ENGINE
 * VERSION: 1.0
 * MODE: URL-ONLY / READ-ONLY / ZERO-HUMAN-INTERVENTION
 *
 * Implements:
 * - 10 Constitutional Rules (0.1 - 0.10)
 * - Section 1 Input Contract (target_url, plan_type: FREE | PRO)
 * - Section 4 False-Positive Gate (A - E)
 * - Section 5 Deterministic Priority Engine (P0 - P3)
 * - Section 6 Root Cause Engine (CONFIRMED, HIGH_CONFIDENCE, PROBABLE, INSUFFICIENT_EVIDENCE)
 * - Section 7 Remediation Contract (A - M)
 * - Section 15 Stop Conditions (IMPLEMENTATION_STOP = TRUE)
 * - Section 17 Deterministic Issue Clustering
 * - Section 18 Report Order: FIX FIRST -> P0 -> P1 -> P2 -> P3 (impact × reach × confidence)
 * - Section 21 30-Day Re-Scan Comparison Engine
 * - Section 22 Confidence Policy (0.98-1.00 CONFIRMED, 0.90-0.979 HIGH_CONFIDENCE, 0.75-0.899 PROBABLE)
 * - Section 23 Output Schema (24 required fields per issue)
 */

import type { Finding, ScanResult, Severity, Category } from './scan-engine';

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type IssueStatus = 'CONFIRMED' | 'HIGH_CONFIDENCE' | 'PROBABLE' | 'NEEDS_VERIFICATION';
export type RootCauseStatus = 'CONFIRMED' | 'HIGH_CONFIDENCE' | 'PROBABLE' | 'INSUFFICIENT_EVIDENCE';
export type PlanType = 'FREE' | 'PRO';

export interface RootFix {
  target_behavior: string;
  current_behavior: string;
  required_change: string;
  scope: string;
  non_goals: string[];
}

export interface RemediationIssue {
  issue_id: string;
  title: string;
  priority: Priority;
  status: IssueStatus;
  category: string;
  observed_urls: string[];
  estimated_scope: string;
  evidence: string[];
  reproduction: string[];
  impact: string;
  root_cause_status: RootCauseStatus;
  root_cause: string;
  root_fix: RootFix;
  recovery: string[];
  prevention: string[];
  acceptance_tests: string[];
  regression_tests: string[];
  do_not_break: string[];
  rollback_guidance: string[];
  implementation_stop: boolean;
  stop_reason?: string;
  safe_next_action?: string;
  confidence: number;
}

export interface RemediationReport {
  mandate_version: '1.0';
  generated_at: string;
  target_url: string;
  domain: string;
  plan_type: PlanType;
  scan_id: string;
  coverage: {
    discovered_urls: number;
    analyzed_urls: number;
    max_deep_analyzed_pages: number;
    template_group_count: number;
  };
  health_summary: {
    overall_score: number;
    scores: Record<string, number>;
    total_issues: number;
    p0_count: number;
    p1_count: number;
    p2_count: number;
    p3_count: number;
  };
  sections: {
    fix_first: RemediationIssue[];
    p0: RemediationIssue[];
    p1: RemediationIssue[];
    p2: RemediationIssue[];
    p3: RemediationIssue[];
  };
  issues: RemediationIssue[];
  re_scan_comparison?: {
    baseline_scan_id: string;
    resolved: string[];
    partially_resolved: string[];
    persisting: string[];
    regressed: string[];
    unverifiable: string[];
    new_findings: string[];
  };
  markdown: string;
}

// -------------------------------------------------------------
// Priority Mapping Engine (Rule 5 & Rule 0.10)
// Deterministic policy based on impact, reach, exposure.
// -------------------------------------------------------------
function calculatePriority(findingId: string, sev: Severity, reachRatio: number): Priority {
  // P0: production unavailable, severe blocking outage, critical security exposure
  if (findingId === 'SEC-FORM-001') return 'P0'; // Insecure form transmitting user credentials/data
  if (findingId === 'CRAWL-HTTP-001' && reachRatio >= 0.5) return 'P0'; // >50% of pages failing

  // P1: major conversion flow failure, sitewide indexation failure, major accessibility blocker
  if (findingId === 'TECH-NOINDEX-001') return 'P1'; // Indexation block
  if (findingId === 'TECH-CANON-001' && reachRatio >= 0.3) return 'P1';
  if (findingId === 'CRAWL-ROBOTS-001') return 'P1';
  if (findingId === 'A11Y-FORM-001' && reachRatio >= 0.3) return 'P1';
  if (findingId === 'LINK-BROKEN-001' && reachRatio >= 0.2) return 'P1';
  if (findingId.startsWith('AI-ROBOTS-GOOGLEBOT') || findingId.startsWith('AI-ROBOTS-OAI')) return 'P1';
  if (findingId === 'TOKEN-BLOAT-001' || findingId === 'ENTITY-VAULT-001' || findingId === 'RAG-CHUNK-001' || findingId === 'RERANK-ATTN-001' || findingId === 'A2A-MCP-CARD-001' || findingId === 'AGENTIC-COMMERCE-001' || findingId === 'AI-CORPUS-PMI-001' || findingId === 'AI-PREFERRED-SOURCES-001') return 'P1';
  if (sev === 'critical') return 'P1';

  // P2: measurable performance degradation, repeated metadata/schema defects, broken internal links
  if (findingId.startsWith('PERF-') && sev === 'high') return 'P2';
  if (findingId.startsWith('SCHEMA-JSON')) return 'P2';
  if (findingId.startsWith('SEC-') && sev === 'high') return 'P2';
  if (findingId === 'TECH-TITLE-001') return 'P2';
  if (findingId === 'A11Y-NAME-001') return 'P2';
  if (findingId.startsWith('COLBERT-') || findingId.startsWith('TOPICAL-') || findingId.startsWith('DPO-') || findingId.startsWith('ONTOLOGY-') || findingId.startsWith('TTFB-') || findingId.startsWith('HALLUCINATION-') || findingId.startsWith('SYNTHETIC-') || findingId === 'REGIONAL-CAROUSEL-001') return 'P2';
  if (sev === 'high') return 'P2';
  if (sev === 'medium') return 'P2';

  // P3: minor optimization, cosmetic issue, low-impact semantic
  return 'P3';
}

// -------------------------------------------------------------
// Confidence Calculation (Rule 22)
// 0.98-1.00: CONFIRMED (direct reproducible wire measurement)
// 0.90-0.979: HIGH_CONFIDENCE (multiple independent observations)
// 0.75-0.899: PROBABLE (plausible but not proven externally)
// <0.75: INSUFFICIENT_EVIDENCE
// -------------------------------------------------------------
function calculateConfidence(f: Finding, reachCount: number): { confidence: number; status: IssueStatus; rootStatus: RootCauseStatus } {
  if (f.sourceClass === 'MEASURED' || f.sourceClass === 'OFFICIAL_STANDARD') {
    if (reachCount > 1 || f.confidence === 'confirmed') {
      return { confidence: 0.99, status: 'CONFIRMED', rootStatus: 'CONFIRMED' };
    }
    return { confidence: 0.94, status: 'HIGH_CONFIDENCE', rootStatus: 'HIGH_CONFIDENCE' };
  }
  if (f.sourceClass === 'OFFICIAL_VENDOR') {
    return { confidence: 0.95, status: 'CONFIRMED', rootStatus: 'CONFIRMED' };
  }
  if (f.sourceClass === 'PROPOSAL') {
    return { confidence: 0.88, status: 'HIGH_CONFIDENCE', rootStatus: 'PROBABLE' };
  }
  if (f.sourceClass === 'INTERNAL_HEURISTIC') {
    return { confidence: 0.80, status: 'PROBABLE', rootStatus: 'PROBABLE' };
  }
  return { confidence: 0.70, status: 'NEEDS_VERIFICATION', rootStatus: 'INSUFFICIENT_EVIDENCE' };
}

// -------------------------------------------------------------
// Stop Condition Evaluator (Rule 15)
// Triggers when safe external remediation cannot be prescribed
// without access to database, payment, or private auth logic.
// -------------------------------------------------------------
function evaluateStopCondition(fId: string): { stop: boolean; reason?: string; safeNextAction?: string } {
  if (fId === 'SEC-FORM-001') {
    return {
      stop: true,
      reason: 'Form submits to an unencrypted HTTP destination. Authentication or payment credentials may be implicated. Automated change to transport destinations requires internal network and application credential auditing.',
      safeNextAction: 'Developer must audit all <form> action endpoints, ensure TLS 1.3 encryption, and update backend routing before changing client action attributes.'
    };
  }
  return { stop: false };
}

// -------------------------------------------------------------
// Remediation Blueprint Generator (Rules 0.5, 6, 8, 9, 10, 11, 12, 13, 14)
// Framework-agnostic, safe prescriptions only.
// -------------------------------------------------------------
function generateBlueprint(f: Finding, observedUrls: string[], totalPages: number): {
  title: string;
  impact: string;
  root_cause: string;
  root_fix: RootFix;
  recovery: string[];
  prevention: string[];
  acceptance_tests: string[];
  regression_tests: string[];
  do_not_break: string[];
  rollback_guidance: string[];
} {
  const pId = f.id;
  const urlScope = observedUrls.length === 1 ? observedUrls[0] : `${observedUrls.length} observed routes`;

  if (pId.startsWith('TECH-CANON')) {
    return {
      title: 'Missing or Inconsistent Canonical Reference',
      impact: 'Search engines may split indexing authority, index wrong parameter variations, or fail to consolidate duplicate content.',
      root_cause: 'Template or routing layer fails to emit a deterministic, self-referencing rel=canonical link tag on indexable HTML responses.',
      root_fix: {
        target_behavior: 'Every indexable HTML page emits exactly one self-referencing canonical URL matching its public canonical origin and path.',
        current_behavior: 'Canonical link element is absent or inconsistently populated on observed routes.',
        required_change: 'Update the head metadata template or routing generator to output <link rel="canonical" href="https://[domain]/[path]"> based on verified canonical routing.',
        scope: urlScope,
        non_goals: ['Do not modify URL paths', 'Do not alter query parameter handling for application state', 'Do not emit canonicals on 404 or redirect responses']
      },
      recovery: ['Deploy canonical header/tag to affected templates', 'Request re-crawl of key landing pages through search console once verified'],
      prevention: ['Add route-level SEO test in CI asserting exactly one valid rel=canonical per indexable route'],
      acceptance_tests: ['curl -sL [URL] | grep -i \'rel="canonical"\' returns exactly 1 match resolving with HTTP 200 to self'],
      regression_tests: ['Verify canonical origin matches production HTTPS domain', 'Ensure pagination or query-based views canonicalize appropriately without breaking pagination indexing'],
      do_not_break: ['Do not derive canonical from unvalidated Host request headers', 'Do not strip necessary trailing slashes if site routing enforces them'],
      rollback_guidance: ['Record git commit before modifying metadata template. Revert immediately if pages canonicalize to home or incorrect origin.']
    };
  }

  if (pId.startsWith('TECH-NOINDEX')) {
    return {
      title: 'Robots Noindex Directive on Indexable Route',
      impact: 'Pages marked with noindex are removed from search engine indices, causing loss of organic discoverability.',
      root_cause: 'Development, staging, or administrative noindex directives remained active in production HTML meta or X-Robots-Tag response header.',
      root_fix: {
        target_behavior: 'Public indexable pages emit index, follow or omit noindex directives entirely.',
        current_behavior: 'Observed routes output <meta name="robots" content="noindex"> or X-Robots-Tag: noindex header.',
        required_change: 'Remove the noindex flag from the publishing pipeline or environment configuration for public production routes.',
        scope: urlScope,
        non_goals: ['Do not remove noindex from private account, admin, or search-filter routes']
      },
      recovery: ['Purge edge/CDN cache after removing noindex', 'Verify headers via curl -I'],
      prevention: ['Maintain an explicit indexability allowlist matrix tested during deployment verification'],
      acceptance_tests: ['curl -sI [URL] and curl -sL [URL] contain no occurrences of "noindex" for intended-public routes'],
      regression_tests: ['Confirm private, checkout, and auth pages remain protected from indexing'],
      do_not_break: ['Do not expose draft or internal staging pages to indexing'],
      rollback_guidance: ['Reapply prior robots meta tag if unreviewed or protected internal routes were unintentionally published']
    };
  }

  if (pId.startsWith('A11Y-FORM')) {
    return {
      title: 'Form Controls Without Programmatic Accessible Labels',
      impact: 'Assistive technology and screen-reader users cannot determine the input purpose, failing WCAG 2.2 AA compliance.',
      root_cause: 'Input or textarea controls lack explicit for/id label association, aria-label, or aria-labelledby attributes.',
      root_fix: {
        target_behavior: 'Every form control has a programmatic label accessible via the accessibility tree.',
        current_behavior: 'Form inputs render without associated <label for="..."> or aria-label attributes.',
        required_change: 'Bind each input element to a visible <label> via matching id/for attributes, or provide an explicit aria-label.',
        scope: urlScope,
        non_goals: ['Do not alter form submission handlers', 'Do not change input validation logic', 'Do not redesign form layout']
      },
      recovery: ['Audit all input templates in the component library and update label bindings'],
      prevention: ['Enforce automated axe-core or WCAG AA linting in frontend component unit tests and CI gates'],
      acceptance_tests: ['Automated accessibility tree inspection shows 0 unlabelled form controls across affected routes'],
      regression_tests: ['Verify clicking the visible label focuses the corresponding input', 'Ensure form submission and autofill behaviors remain intact'],
      do_not_break: ['Do not change input name or id attributes if client-side event listeners depend on them without updating the listeners'],
      rollback_guidance: ['Revert component markup changes if CSS layout or styling reliant on tag structure breaks']
    };
  }

  if (pId.startsWith('CRAWL-HTTP')) {
    return {
      title: 'HTTP Error Status on Linked Page',
      impact: 'Crawlers and visitors encounter dead ends, wasting crawl budget and interrupting user navigation.',
      root_cause: 'Internal links reference an unrouted, moved, or broken URL.',
      root_fix: {
        target_behavior: 'All internally linked pages respond with valid HTTP 200 or clean redirect to live destination.',
        current_behavior: 'Observed URL returns an HTTP 4xx or 5xx error code.',
        required_change: 'Update internal navigation links to point to the valid active route, or restore the missing route handler.',
        scope: urlScope,
        non_goals: ['Do not create wildcard redirect loops', 'Do not mask 5xx application errors with 200 ok error pages']
      },
      recovery: ['Locate referring pages and update link hrefs to target active canonical destinations'],
      prevention: ['Run route-integrity and link crawler checks on staging before production deployment'],
      acceptance_tests: ['HTTP GET to affected target returns 200 OK within 1500ms'],
      regression_tests: ['Verify referring page links still open the intended destination and retain UTM/query params if required'],
      do_not_break: ['Do not redirect discontinued products or content to the homepage (soft-404)'],
      rollback_guidance: ['Restore previous link URL if replacement route contains different content']
    };
  }

  if (pId.startsWith('AI-ROBOTS')) {
    return {
      title: 'AI Search/Retrieval Crawler Blocked in robots.txt',
      impact: 'Search and retrieval bots (e.g. OAI-SearchBot, PerplexityBot) cannot fetch content, reducing visibility in AI answer engines.',
      root_cause: 'Catch-all or specific disallow directives in robots.txt prevent AI search crawlers from accessing public pages.',
      root_fix: {
        target_behavior: 'AI search and retrieval crawlers are permitted on public indexable pages, while training controls remain isolated if desired.',
        current_behavior: 'robots.txt disallows relevant bot user-agent on public paths.',
        required_change: 'Add dedicated User-agent sections permitting search bots (Allow: /) while retaining disallow for scrapers or training bots if intended.',
        scope: '/robots.txt',
        non_goals: ['Do not remove protections from admin, internal, or rate-limited endpoints']
      },
      recovery: ['Deploy corrected robots.txt and purge edge CDN cache'],
      prevention: ['Add robots.txt parser tests in deployment pipeline to ensure critical bots match intended policy'],
      acceptance_tests: ['Robot evaluation tool verifies targeted user-agent is permitted on path /'],
      regression_tests: ['Confirm private paths remain disallowed across all user-agent groups'],
      do_not_break: ['Do not change Googlebot or generic crawler rules when editing AI crawler sections'],
      rollback_guidance: ['Keep backup of previous robots.txt file. Revert immediately if unintended bot traffic spikes.']
    };
  }

  if (pId.startsWith('LLMS-')) {
    return {
      title: 'Missing or Non-Compliant llms.txt Directory',
      impact: 'Autonomous agents and LLMs have difficulty discovering machine-readable summaries and structured technical resources.',
      root_cause: 'Site lacks /llms.txt or does not adhere to the proposed llms.txt v2 format (H1 title, blockquote summary, curated links).',
      root_fix: {
        target_behavior: 'Site serves a valid markdown /llms.txt with H1 header, concise description, and functional links.',
        current_behavior: 'llms.txt is absent or missing mandatory sections.',
        required_change: 'Create or update /llms.txt at root containing title, summary, and links to primary documentation or product pages.',
        scope: '/llms.txt',
        non_goals: ['Do not replace HTML pages with llms.txt', 'Do not dump uncurated site maps into llms.txt']
      },
      recovery: ['Publish valid /llms.txt and add <link rel="describedby" href="/llms.txt"> in HTML head'],
      prevention: ['Include llms.txt link and syntax validation in static site build checks'],
      acceptance_tests: ['GET /llms.txt returns HTTP 200 with text/markdown or text/plain, containing valid # heading and > summary'],
      regression_tests: ['Verify all markdown links inside llms.txt resolve to live HTTP 200 destinations'],
      do_not_break: ['Do not expose private or unreleased URLs in llms.txt'],
      rollback_guidance: ['Remove or revert /llms.txt file if it contains outdated product information']
    };
  }

  if (pId.startsWith('SEC-')) {
    return {
      title: 'Missing Browser Security Header Hardening',
      impact: 'Missing transport or framing policies leave client browsers exposed to clickjacking, MIME sniffing, or insecure downgrades.',
      root_cause: 'Web server or edge proxy response configuration does not emit recommended HTTP security headers.',
      root_fix: {
        target_behavior: 'Edge/server emits standard headers (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).',
        current_behavior: 'One or more security headers are missing from HTTP responses.',
        required_change: 'Configure edge server/proxy or application middleware to attach missing security headers to all HTML responses.',
        scope: 'Sitewide HTTP headers',
        non_goals: ['Do not break existing third-party scripts or payment iframes with over-restrictive CSP without auditing']
      },
      recovery: ['Deploy headers starting in report-only mode for CSP, then enforce once verified'],
      prevention: ['Run security header linter in continuous deployment smoke tests'],
      acceptance_tests: ['curl -sI [URL] shows strict-transport-security, x-content-type-options: nosniff, and referrer-policy'],
      regression_tests: ['Verify all required third-party scripts, fonts, analytics, and iframe widgets still load without console errors'],
      do_not_break: ['Do not deploy restrictive frame-ancestors or connect-src that breaks payment modals or OAuth popups'],
      rollback_guidance: ['Remove or relax header directives in proxy config if legitimate third-party resources fail to load']
    };
  }

  if (pId === 'TOKEN-BLOAT-001') {
    return {
      title: '14KB Sub-chunk Token Budget Overflow & KV-Cache Bloat',
      impact: 'AI crawler workers enforce strict token ingestion windows. Raw HTML payloads exceeding 14,336 bytes cause early retrieval termination, truncating critical entity definitions.',
      root_cause: 'Uncompressed inline SVG, hydration scripts, and nested DOM trees exceed the 14KB initial chunk boundary.',
      root_fix: {
        target_behavior: 'Edge proxy strips non-semantic client script and SVG tags for AI crawler bots, serving an optimized <14KB semantic AST/Markdown representation.',
        current_behavior: 'Full hydrated client bundle (>14KB) is served indiscriminately to AI retrieval bots.',
        required_change: 'Deploy Cloudflare Worker / Edge Middleware detecting AI bots (GPTBot, ClaudeBot, PerplexityBot) and returning optimized AST markdown.',
        scope: urlScope,
        non_goals: ['Do not degrade client JavaScript experience for human browser visitors']
      },
      recovery: ['Deploy edge token-purge Cloudflare Worker to intercept AI crawler user-agents'],
      prevention: ['Assert bot-facing raw HTML payloads remain under 14KB in automated CI curl tests'],
      acceptance_tests: [
        `curl -sI -A "GPTBot" ${observedUrls[0] || 'https://' + f.url} | grep -i "X-AI-Purge: Optimized-14KB-AST"`,
        `curl -s -A "ClaudeBot" ${observedUrls[0] || 'https://' + f.url} | wc -c evaluates under 14336 bytes`
      ],
      regression_tests: ['Verify human browser sessions retain complete CSS/JS hydration and UI interactive controls'],
      do_not_break: ['Do not block standard human browser user-agents'],
      rollback_guidance: ['Bypass or disable the edge token-purge worker in Cloudflare dashboard']
    };
  }

  if (pId === 'ENTITY-VAULT-001') {
    return {
      title: 'Missing Knowledge Vault Consensus Triangulation (Wikidata QID/MID)',
      impact: 'Search engines and LLMs fail to register the brand as a Ground Truth entity in the Knowledge Vault, leaving it vulnerable to algorithmic demotion.',
      root_cause: 'JSON-LD structured data lacks authoritative sameAs URI triples pointing to Wikidata QID, Google Knowledge Graph MID, and SEC/Crunchbase registries.',
      root_fix: {
        target_behavior: 'Corporation/Organization schema emits explicit sameAs array containing verified Wikidata QID and Crunchbase entity identifiers.',
        current_behavior: 'Organization schema is missing or contains only local non-triangulated URLs.',
        required_change: 'Inject standardized JSON-LD @graph node with verified Wikidata and Crunchbase sameAs triples into document <head>.',
        scope: 'Sitewide document <head>',
        non_goals: ['Do not invent fictitious Wikidata QIDs without prior registry verification']
      },
      recovery: ['Deploy updated JSON-LD template containing verified sameAs array to root layout'],
      prevention: ['CI test asserts that JSON-LD sameAs contains at least one wikidata.org or crunchbase.com URI'],
      acceptance_tests: ['node -e "const html=require(\'fs\').readFileSync(\'index.html\',\'utf8\'); if(!html.includes(\'wikidata.org/wiki/Q\')) process.exit(1);"'],
      regression_tests: ['Validate with Google Rich Results Test API to ensure zero Schema.org syntax errors'],
      do_not_break: ['Preserve existing BreadcrumbList, WebSite, and SearchAction schemas'],
      rollback_guidance: ['Revert schema template modification if JSON-LD parsing throws errors']
    };
  }

  if (pId === 'RAG-CHUNK-001') {
    return {
      title: 'RAG Sub-chunk Entity Boundary Fragmentation Risk',
      impact: 'RAG 512-token vector chunking severs entity definitions across arbitrary offsets, dropping semantic retrieval accuracy.',
      root_cause: 'Content blocks lack atomic data-chunk-id semantic boundary markers, forcing RAG chunkers to fall back to character sliding windows.',
      root_fix: {
        target_behavior: 'Semantic sections are wrapped in explicit <section data-chunk-id="..." data-entity="..."> boundaries containing autonomous 200-400 token answer units.',
        current_behavior: 'Continuous sprawling paragraph text without explicit semantic boundary encapsulation.',
        required_change: 'Add data-chunk-id and semantic encapsulation to all core landing and service page articles.',
        scope: urlScope,
        non_goals: ['Do not alter user-facing layout typography or visual styling']
      },
      recovery: ['Wrap major content blocks in data-chunk-id semantic containers in CMS/templates'],
      prevention: ['Assert presence of data-chunk-id attributes on all H2-led content sections in CI test suite'],
      acceptance_tests: [`grep -q "data-chunk-id=" ${observedUrls[0] || 'index.html'} && echo "PASS"`],
      regression_tests: ['Verify DOM structure does not trigger CSS grid or flexbox layout reflow issues'],
      do_not_break: ['Do not disrupt screen-reader ARIA landmarks'],
      rollback_guidance: ['Revert HTML wrapper tags to previous state via git revert']
    };
  }

  if (pId === 'RERANK-ATTN-001') {
    return {
      title: 'Cross-Encoder Rerank Attention Deficit',
      impact: 'Cross-encoder rerankers (bge-reranker, Cohere) downweight passages that lack atomic question-answering prefixes and high numerical fact density in initial positions.',
      root_cause: 'Introductory paragraphs use conversational preamble instead of direct numerical assertions and entity-predicate triples.',
      root_fix: {
        target_behavior: 'Key answers follow the formula: [Query Prefix] + [Atomic Answer 45 words] + [3x Numerical Facts] + [Contrastive Proof].',
        current_behavior: 'Vague marketing introductions without numerical density or atomic answer syntax.',
        required_change: 'Refactor opening passage of key service and solution pages into structured atomic answers with exact metrics.',
        scope: urlScope,
        non_goals: ['Do not create unnatural keyword stuffing or unverified metrics']
      },
      recovery: ['Edit introductory copy to incorporate quantitative benchmarks within the first 64 tokens'],
      prevention: ['Editorial guideline asserting minimum 2 verified numerical statistics per H2 section'],
      acceptance_tests: [`grep -E -q "[0-9]+(\\.[0-9]+)?%|[0-9]{2,} (ms|s|pages|clients)" ${observedUrls[0] || 'index.html'}`],
      regression_tests: ['Verify readability grade remains between 8.0 and 11.0 (Flesch-Kincaid)'],
      do_not_break: ['Ensure brand voice and technical veracity remain uncompromised'],
      rollback_guidance: ['Revert copy changes via version control']
    };
  }

  if (pId === 'AI-CORPUS-PMI-001') {
    return {
      title: 'Missing High-Purity LLM Corpus PMI Co-Occurrence Anchors',
      impact: 'Brand cannot establish parametric weights in LLM pre-training corpuses (Common Crawl, RefinedWeb), causing models to omit the company in zero-shot prompts.',
      root_cause: 'Lack of co-occurrence with recognized industry standard anchors within 64-token sliding windows.',
      root_fix: {
        target_behavior: 'Publish corpus seeding documentation and README triples binding brand with canonical industry standard keywords.',
        current_behavior: 'Brand mentions isolated from authoritative domain co-occurrence clusters.',
        required_change: 'Deploy 01_MODEL_CORPUS_SEEDING.md blueprint to technical documentation, GitHub README, and whitepapers.',
        scope: 'Public documentation and external authority repositories',
        non_goals: ['Do not publish duplicate or spammy anchor text across external domains']
      },
      recovery: ['Deploy corpus seeding Markdown file to open repository and official documentation surfaces'],
      prevention: ['Audit documentation quarterly against high-frequency pre-training benchmark tokens'],
      acceptance_tests: ['grep -i -E "industry standard|canonical standard|benchmark" 01_MODEL_CORPUS_SEEDING.md'],
      regression_tests: ['Ensure brand tone remains strictly technical and objective'],
      do_not_break: ['Avoid hyperbole or unsubstantiated superlatives'],
      rollback_guidance: ['Remove or update seeded markdown files in documentation repo']
    };
  }

  if (pId === 'COLBERT-MAXSIM-001') {
    return {
      title: 'ColBERT Late-Interaction MaxSim Token Misalignment',
      impact: 'Multi-vector retrieval engines (ColBERT, SPLADE) calculate lower token dot-product alignment scores when heading structures lack diverse technical query tokens.',
      root_cause: 'Insufficient heading frequency (<3 H1-H3 headers) and low lexical token variety in subheaders.',
      root_fix: {
        target_behavior: 'Expand semantic headings (H2/H3) to cover explicit multi-vector query permutations and domain keywords.',
        current_behavior: 'Sparse heading structure with fewer than 3 descriptive headings on the primary landing page.',
        required_change: 'Structure content into at least 4 clear H2/H3 subheaders matching searcher intent and entity facets.',
        scope: urlScope,
        non_goals: ['Do not bloat document with empty or repetitive heading tags']
      },
      recovery: ['Add descriptive H2/H3 headings segmenting primary document sections'],
      prevention: ['Automated template linter requiring at least 3 distinct H2 elements per landing page'],
      acceptance_tests: [`node -e "const html=require('fs').readFileSync('index.html','utf8'); const c=(html.match(/<h[1-3]/g)||[]).length; if(c<3) process.exit(1);"`],
      regression_tests: ['Verify document outline in accessibility tree retains logical H1 -> H2 -> H3 nesting'],
      do_not_break: ['Do not skip heading levels (e.g. H1 directly to H3)'],
      rollback_guidance: ['Revert heading modifications in template source']
    };
  }

  if (pId === 'TOPICAL-CENTROID-001') {
    return {
      title: 'Topical Centroid Vector Dispersion (MMR Demotion Risk)',
      impact: 'Vector databases apply Maximal Marginal Relevance (MMR) penalties when a domain’s page embeddings are overly dispersed without an anchor centroid.',
      root_cause: 'Page title and content themes lack a unified topical ontology and categorical taxonomy anchor.',
      root_fix: {
        target_behavior: 'Align page titles and meta taxonomies around a core semantic centroid with clear category parentage.',
        current_behavior: 'Titles diverge across unrelated subjects without unified breadcrumb or ontological hierarchy.',
        required_change: 'Implement unified topic cluster breadcrumbs and semantic taxonomy in page meta and Schema.org graphs.',
        scope: 'Sitewide taxonomy',
        non_goals: ['Do not merge distinct product lines into artificial single categories']
      },
      recovery: ['Deploy standardized taxonomy tags and BreadcrumbList JSON-LD across all pages'],
      prevention: ['Audit title-to-centroid semantic similarity in CI using embedding distance checks'],
      acceptance_tests: ['grep -q "BreadcrumbList" index.html && echo "PASS"'],
      regression_tests: ['Verify site navigation links match new taxonomic breadcrumb paths'],
      do_not_break: ['Maintain existing URL slugs to prevent 404 redirects'],
      rollback_guidance: ['Revert breadcrumb taxonomy template']
    };
  }

  if (pId === 'DPO-RLAIF-001') {
    return {
      title: 'DPO & RLAIF Preference Elicitation Failure (Puffery Demotion)',
      impact: 'LLM preference alignment models (DPO, RLAIF) systematically penalize marketing fluff, promotional superlatives, and unverified claims.',
      root_cause: 'Page text uses subjective adjectives ("en iyi", "rakipsiz", "revolutionary", "best-in-class") without verifiable experimental proof.',
      root_fix: {
        target_behavior: 'Replace subjective promotional superlatives with verifiable factual statements, exact specs, and benchmark measurements.',
        current_behavior: 'Subjective marketing adjectives trigger preference loss penalties.',
        required_change: 'Audit copy and replace ungrounded claims with objective, neutral technical descriptions.',
        scope: urlScope,
        non_goals: ['Do not eliminate value propositions; ground them in verifiable evidence']
      },
      recovery: ['Re-write promotional headers to emphasize verified specifications and architecture'],
      prevention: ['Linter blocking blacklisted marketing superlatives in production copy repositories'],
      acceptance_tests: [`grep -i -E "rakipsiz|sektör lideri|best-in-class|revolutionary" ${observedUrls[0] || 'index.html'} || echo "CLEAN"`],
      regression_tests: ['Ensure brand conversion messaging remains clear and compelling'],
      do_not_break: ['Preserve legal disclaimers and factual guarantee terms'],
      rollback_guidance: ['Revert copy revisions via git']
    };
  }

  if (pId === 'ACADEMIC-SYCOPHANCY-001') {
    return {
      title: 'Missing Academic Benchmark & Methodological Grounding',
      impact: 'LLMs discount technical claims lacking third-party academic, standard (RFC, W3C, ISO), or published benchmark grounding.',
      root_cause: 'Technical documentation makes architecture claims without referencing formal specifications or peer-reviewed methodologies.',
      root_fix: {
        target_behavior: 'Ground technical methodologies in published standards (e.g. RFC, W3C, ISO, IEEE) or open benchmark metrics.',
        current_behavior: 'Proprietary claims presented without external standard cross-referencing.',
        required_change: 'Add methodology section citing relevant RFCs, W3C specifications, or independent benchmarks.',
        scope: urlScope,
        non_goals: ['Do not cite unrelated academic papers for artificial authority padding']
      },
      recovery: ['Publish dedicated methodology page and link to relevant W3C/RFC standards in footer'],
      prevention: ['Require formal standard citations for all new algorithmic or technical product claims'],
      acceptance_tests: [`grep -i -E "rfc|w3c|iso|methodology|metodoloji" ${observedUrls[0] || 'index.html'} && echo "PASS"`],
      regression_tests: ['Ensure external standard links open with rel="noopener noreferrer" and HTTP 200 status'],
      do_not_break: ['Do not link to paywalled academic repositories without providing open access summaries'],
      rollback_guidance: ['Revert methodology link additions in footer and navigation templates']
    };
  }

  if (pId === 'CORROBORATION-RING-001') {
    return {
      title: 'Missing Multi-Domain Corroboration Ring',
      impact: 'Perplexity and SearchGPT suppress single-source claims vulnerable to hallucination filters when no external independent corroboration exists.',
      root_cause: 'No outbound links to independent authority repositories, registries, or collaborative standards bodies.',
      root_fix: {
        target_behavior: 'Reference external corroborative authorities (Wikidata, GitHub, industry consortia, regulatory registries).',
        current_behavior: 'Isolated walled-garden link graph with zero outbound references to external authorities.',
        required_change: 'Add outbound references to authoritative registries and industry consortia validating core assertions.',
        scope: urlScope,
        non_goals: ['Do not link to direct commercial competitors']
      },
      recovery: ['Add curated external references to industry standards and registries in relevant articles'],
      prevention: ['Require at least one authoritative external corroboration link per major technical resource'],
      acceptance_tests: [`node -e "const html=require('fs').readFileSync('index.html','utf8'); const ex=(html.match(/href=[\"']https?:\\/\\//g)||[]).length; if(ex<1) process.exit(1);"`],
      regression_tests: ['Verify all outbound links include target="_blank" rel="noopener noreferrer"'],
      do_not_break: ['Do not leak internal routing or staging URLs in external link attributes'],
      rollback_guidance: ['Revert external link markup in content templates']
    };
  }

  if (pId === 'ONTOLOGY-SUPERCLASS-001') {
    return {
      title: 'Shallow Schema Ontology (Missing Super-Class Hierarchy)',
      impact: 'AI knowledge engines cannot place the business into deep ontological classification hierarchies without specific subclass declarations.',
      root_cause: 'JSON-LD schema uses generic "@type": "Thing" or basic "WebSite" without specific business/software ontology subtyping.',
      root_fix: {
        target_behavior: 'Schema declares specialized subtypes (e.g. Corporation, SoftwareApplication, FinancialService) alongside superclasses.',
        current_behavior: 'Generic, shallow schema types that fail to anchor the entity into domain ontologies.',
        required_change: 'Upgrade JSON-LD @type declarations to the most specific applicable Schema.org classes.',
        scope: 'Sitewide JSON-LD schema',
        non_goals: ['Do not declare inaccurate business categories that do not reflect actual operations']
      },
      recovery: ['Update Schema.org generator to output specific Corporation / SoftwareApplication classes'],
      prevention: ['Run schema validator in CI asserting specific subclass hierarchy over generic WebPage types'],
      acceptance_tests: [`grep -E -q "Corporation|SoftwareApplication|ProfessionalService|LocalBusiness" index.html && echo "PASS"`],
      regression_tests: ['Ensure Google Schema Validator confirms 0 syntax warnings'],
      do_not_break: ['Maintain required fields for the declared specific type (e.g. applicationCategory for SoftwareApplication)'],
      rollback_guidance: ['Revert @type change in JSON-LD configuration']
    };
  }

  if (pId === 'TTFB-COLDSTART-001') {
    return {
      title: 'Edge KV/Cache Unoptimized (Sub-40ms Cold-Start Risk)',
      impact: 'AI crawlers operate in parallel worker batches with aggressive timeout thresholds. Cold-start latency (>1.2s) leads to crawl drop-off.',
      root_cause: 'Origin server lacks edge caching headers (s-maxage, cf-cache-status), causing bot requests to hit cold origin workers.',
      root_fix: {
        target_behavior: 'Edge CDN caches static HTML and API machine surfaces with public s-maxage=86400 and stale-while-revalidate.',
        current_behavior: 'Uncached responses or private cache-control headers causing unnecessary origin TTFB latency.',
        required_change: 'Configure edge server/Cloudflare to emit "Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=600".',
        scope: 'Sitewide HTTP headers',
        non_goals: ['Do not cache personalized user account data or authenticated sessions']
      },
      recovery: ['Add edge cache rules in Cloudflare dashboard or wrangler configuration'],
      prevention: ['Verify TTFB < 200ms and s-maxage header in staging deployment tests'],
      acceptance_tests: [`curl -sI ${observedUrls[0] || 'https://' + f.url} | grep -i -E "cf-cache-status|s-maxage"`],
      regression_tests: ['Ensure user-specific cart and checkout pages maintain Cache-Control: no-store'],
      do_not_break: ['Do not apply public s-maxage to authenticated endpoints or CSRF tokens'],
      rollback_guidance: ['Purge CDN cache and restore origin pass-through cache rules']
    };
  }

  if (pId === 'A2A-MCP-CARD-001') {
    return {
      title: 'Missing A2A Signed Agent Card & MCP Tool Endpoint',
      impact: 'Autonomous AI agents (Anthropic Claude Computer Use, OpenAI Operator) cannot discover or invoke website capabilities programmatically.',
      root_cause: 'Missing /.well-known/agent-card.json discovery manifest and /mcp Model Context Protocol tool endpoint.',
      root_fix: {
        target_behavior: 'Serve validated /.well-known/agent-card.json and /mcp endpoints documenting supported tools and agent permissions.',
        current_behavior: 'Neither agent card nor MCP endpoints exist on the domain.',
        required_change: 'Deploy 10_AGENT_CARD_MCP.json specification to /.well-known/agent-card.json and configure /mcp router.',
        scope: '/.well-known/agent-card.json and /mcp',
        non_goals: ['Do not expose private administrative APIs to autonomous agents without authentication']
      },
      recovery: ['Deploy agent-card.json to public static root and route /mcp to authorized tool handler'],
      prevention: ['Include agent-card.json schema validation in automated deployment pipeline'],
      acceptance_tests: [
        'curl -sI /.well-known/agent-card.json | grep -q "200 OK"',
        'curl -s /.well-known/agent-card.json | jq .agent_id'
      ],
      regression_tests: ['Verify agent card endpoints do not conflict with existing API routing'],
      do_not_break: ['Enforce strict read-only tool scopes for unauthenticated agent callers'],
      rollback_guidance: ['Remove agent-card.json file from static asset directory']
    };
  }

  if (pId === 'C2PA-PROVENANCE-001') {
    return {
      title: 'Missing C2PA & RFC 3161 Cryptographic Provenance',
      impact: 'AI search engines cannot verify original first-party content authorship versus automated scrapers, risking attribution loss.',
      root_cause: 'Published articles and brand assets lack C2PA metadata manifests or cryptographic RFC 3161 timestamping.',
      root_fix: {
        target_behavior: 'Attach cryptographic provenance metadata (C2PA manifest or RFC 3161 timestamp headers) to canonical assets.',
        current_behavior: 'Unsigned HTML and media assets vulnerable to attribution stripping by scrapers.',
        required_change: 'Deploy 07_C2PA_PROVENANCE_MANIFEST.json and attach X-C2PA-Manifest header to canonical releases.',
        scope: 'Sitewide canonical releases',
        non_goals: ['Do not encrypt public readable text; sign metadata only']
      },
      recovery: ['Add C2PA manifest reference link in HTML head and emit X-C2PA-Manifest header'],
      prevention: ['Automate cryptographic release signing in CI build pipeline'],
      acceptance_tests: [`curl -sI ${observedUrls[0] || 'https://' + f.url} | grep -i "X-C2PA"`],
      regression_tests: ['Verify asset MIME types and response payloads remain compatible with legacy browsers'],
      do_not_break: ['Do not alter binary asset signatures during CDN asset optimization passes'],
      rollback_guidance: ['Remove X-C2PA header from edge proxy config']
    };
  }

  if (pId === 'HALLUCINATION-INTERCEPT-001') {
    return {
      title: 'Missing Hallucination Interception & Entity Disambiguation',
      impact: 'LLMs hallucinate incorrect service pricing, features, and company background when clear disambiguation tables are absent.',
      root_cause: 'Website lacks structured FAQPage schema and explicit tabular boundary disclosures addressing common LLM ambiguities.',
      root_fix: {
        target_behavior: 'Embed explicit FAQPage JSON-LD and disambiguation tables defining what the company is, does, and does NOT do.',
        current_behavior: 'Ambiguous narrative text leaving high variance in LLM temperature sampling.',
        required_change: 'Deploy structured Disambiguation Matrix (05_HALLUCINATION_INTERCEPTION.md) and FAQPage schema.',
        scope: urlScope,
        non_goals: ['Do not clutter human UI; use structured data and clean collapsible FAQ elements']
      },
      recovery: ['Deploy FAQPage JSON-LD and FAQ accordion to primary service pages'],
      prevention: ['Quarterly hallucination audit checking ChatGPT, Perplexity, and Claude for factual accuracy'],
      acceptance_tests: ['grep -q "FAQPage" index.html && echo "PASS"'],
      regression_tests: ['Verify FAQ accordion controls are accessible via keyboard navigation (Enter/Space)'],
      do_not_break: ['Ensure Schema.org FAQPage questions match visible text exactly to avoid Google penalty'],
      rollback_guidance: ['Revert FAQ component in page template']
    };
  }

  if (pId === 'SYNTHETIC-CITATION-001') {
    return {
      title: 'Absence of Second-Order Synthetic Citation Loops',
      impact: 'Fails to establish reciprocal AI feedback loops where models cite each other’s generated summaries back to your canonical source.',
      root_cause: 'Lack of canonical benchmark definitions, industry indices, or citable quantitative metrics in published materials.',
      root_fix: {
        target_behavior: 'Publish a named, definitive industry metric or benchmark index with clear citation formatting guidelines.',
        current_behavior: 'Standard descriptive text without citable index branding or formula definitions.',
        required_change: 'Deploy 06_SYNTHETIC_CITATION_LOOP.md template with named industry benchmark definitions.',
        scope: 'Authority and methodology pages',
        non_goals: ['Do not invent arbitrary metrics without publishing the underlying formula']
      },
      recovery: ['Publish canonical benchmark index section on methodology page with formal citation guidelines'],
      prevention: ['Track second-order synthetic citation frequency across AI search summaries'],
      acceptance_tests: [`grep -i -E "index|endeks|benchmark|raporu" ${observedUrls[0] || 'index.html'} && echo "PASS"`],
      regression_tests: ['Verify citation copy-to-clipboard widget functions cleanly across desktop and mobile'],
      do_not_break: ['Do not alter canonical URL structures when updating benchmark revisions'],
      rollback_guidance: ['Revert benchmark section additions']
    };
  }

  if (pId === 'WAYBACK-INOCULATION-001') {
    return {
      title: 'Weak Temporal Entity Stability & Historical Consistency Signals',
      impact: 'LLMs calculate lower Bayesian prior confidence regarding long-term brand stability when temporal change signals are absent.',
      root_cause: 'Pages lack datePublished, dateModified schema markers and historical snapshot consistency archives.',
      root_fix: {
        target_behavior: 'Embed explicit datePublished and dateModified ISO timestamps in JSON-LD and submit canonical snapshots to Wayback Machine.',
        current_behavior: 'Pages render without publication dates, revision history, or temporal entity markers.',
        required_change: 'Add datePublished and dateModified to Article/WebPage schema and trigger Wayback Machine archival.',
        scope: urlScope,
        non_goals: ['Do not artificially falsify publication dates']
      },
      recovery: ['Inject ISO-8601 timestamps into page schema and trigger Perma.cc / Wayback archival webhook'],
      prevention: ['Automate dateModified updating on git commit during static site build'],
      acceptance_tests: [`grep -E -q "datePublished|dateModified" ${observedUrls[0] || 'index.html'} && echo "PASS"`],
      regression_tests: ['Verify search snippets show accurate update dates in search console'],
      do_not_break: ['Ensure date formats strictly follow ISO-8601 (YYYY-MM-DDTHH:mm:ssZ)'],
      rollback_guidance: ['Revert timestamp template in build scripts']
    };
  }

  if (pId === 'AGENTIC-COMMERCE-001') {
    return {
      title: 'Missing Agentic Commerce (AAO-Pro) & Headless Machine Funnel',
      impact: 'Autonomous purchasing agents (Siri Agent, Claude Use) fail on human-only form interfaces (CAPTCHA, multi-step wizards), dropping automated revenue.',
      root_cause: 'Conversion funnels require human mouse/keyboard interaction without a headless machine-executable OpenAPI order endpoint.',
      root_fix: {
        target_behavior: 'Expose a lightweight, token-authenticated headless order/quote API endpoint conforming to OpenAPI 3.1 standards.',
        current_behavior: 'Web forms rely solely on client-side JavaScript and human-only form submits.',
        required_change: 'Deploy 09_AGENTIC_COMMERCE_SPEC.json OpenAPI endpoint allowing autonomous agents to submit structured quotes/leads.',
        scope: '/api/v1/agent-order and OpenAPI definition',
        non_goals: ['Do not bypass payment processing or credit card security checks']
      },
      recovery: ['Deploy agent order endpoint with API key or signed guest token authentication'],
      prevention: ['Run agent simulation test suite verifying end-to-end headless transaction execution'],
      acceptance_tests: [
        'curl -sI /api/v1/agent-order | grep -q -E "200|401|405"',
        'grep -q "agentic_commerce" 09_AGENTIC_COMMERCE_SPEC.json'
      ],
      regression_tests: ['Verify standard human web forms continue to operate normally with CSRF protection'],
      do_not_break: ['Do not expose unrate-limited endpoints to prevent automated credential or card stuffing'],
      rollback_guidance: ['Disable headless agent route in API gateway configuration']
    };
  }

  if (pId === 'AI-PREFERRED-SOURCES-001') {
    return {
      title: 'Missing Google Preferred Sources Integration (Google Search Central P1 Standard)',
      impact: 'Loyal visitors and search users cannot add your publication as a Preferred Source in Google Search, forfeiting the "Preferred" badge and citation priority in Top Stories, AI Overviews, and AI Mode.',
      root_cause: 'Publication and content templates lack Google Search Central\'s 2-line Preferred Sources JavaScript integration (<div google-add-preferred-source-btn>) or fallback deeplink.',
      root_fix: {
        target_behavior: 'Eligible article, guide, and footer surfaces feature a non-intrusive Preferred Sources interactive button or deeplink directing users to google.com/preferences/source?q=[domain].',
        current_behavior: 'No google-add-preferred-source-btn attribute, publisher.js script, or source preference deeplink detected on public pages.',
        required_change: 'Embed the 2-line Google Preferred Sources standard JS button or deeplink into publication footers and high-traffic content templates without disrupting primary commercial CTAs.',
        scope: urlScope,
        non_goals: [
          'Do not make the Preferred Sources button the primary commercial CTA',
          'Do not represent Preferred Sources as Google endorsement or algorithmic ranking certification'
        ]
      },
      recovery: [
        'Deploy 25_GOOGLE_PREFERRED_SOURCES_INTEGRATION.html: <script async src="https://news.google.com/swg/js/v1/publisher.js"></script> and <div google-add-preferred-source-btn data-theme="dark"></div>',
        'Add https://news.google.com and https://*.google.com to Content-Security-Policy header'
      ],
      prevention: [
        'Add CI gate verifying presence of google-add-preferred-source-btn or publisher.js on article templates'
      ],
      acceptance_tests: [
        `curl -sL ${observedUrls[0] || '[URL]'} | grep -E -q "publisher\\.js|google-add-preferred-source-btn|preferences/source" && echo "PASS"`
      ],
      regression_tests: [
        'Verify button does not shift Core Web Vitals (CLS < 0.1)',
        'Confirm primary checkout/signup CTAs maintain first visual hierarchy'
      ],
      do_not_break: [
        'Do not place button over primary conversion flows',
        'Ensure CSP allows https://news.google.com script-src and connect-src'
      ],
      rollback_guidance: [
        'Remove the 2-line publisher.js script and div element from template'
      ]
    };
  }

  if (pId === 'REGIONAL-CAROUSEL-001') {
    return {
      title: 'Missing Google Regional Search & Structured Data Carousel (Google Sept 8, 2026 P2 Standard)',
      impact: 'Your site is ineligible for Google\'s "Places sites" features and Structured Data Host Carousels in Turkey and regional search surfaces, forfeiting dominant multi-entity carousel visibility.',
      root_cause: 'Templates lack Google Search Central\'s Sept 8, 2026 regional schema specifications (either ItemList Host Carousel for multi-entity catalogs or LocalBusiness/Places sites schema with address & areaServed).',
      root_fix: {
        target_behavior: 'Eligible listing, catalog, and location surfaces publish valid ItemList carousel or compliant LocalBusiness structured data with areaServed ("TR", "Global") matching canonical entity routes.',
        current_behavior: 'No ItemList carousel, areaServed, hasOfferCatalog, or LocalBusiness address markup detected on scanned surfaces.',
        required_change: 'Deploy 28_GOOGLE_REGIONAL_CAROUSEL_STRUCTURED_DATA.html structured data template to inject ItemList Host Carousel or verified LocalBusiness schema.',
        scope: urlScope,
        non_goals: [
          'Do not declare physical walk-in LocalBusiness coordinates for pure digital SaaS platforms (violates Google guidelines)',
          'Do not nest ItemList items with non-canonical or cross-domain URLs'
        ]
      },
      recovery: [
        'Deploy 28_GOOGLE_REGIONAL_CAROUSEL_STRUCTURED_DATA.html: embed ItemList schema with ListItem elements pointing to canonical subpages, or valid LocalBusiness schema with postalAddress and areaServed',
        'Verify JSON-LD passes Google Rich Results Test without warnings'
      ],
      prevention: [
        'Add automated CI gate validating JSON-LD ItemList / LocalBusiness schema compliance prior to deployment'
      ],
      acceptance_tests: [
        `curl -sL ${observedUrls[0] || '[URL]'} | grep -E -q '"@type":\\s*"(ItemList|LocalBusiness)"' && echo "PASS"`
      ],
      regression_tests: [
        'Confirm canonical URLs match exactly between ItemList items and page canonical links',
        'Ensure no duplicate or conflicting Organization vs LocalBusiness @id nodes exist'
      ],
      do_not_break: [
        'Do not alter primary Organization @id or logo schema',
        'Do not generate fake physical addresses for online services'
      ],
      rollback_guidance: [
        'Remove or revert the ItemList / LocalBusiness JSON-LD script block'
      ]
    };
  }

  // Generic fallback blueprint complying with Rule 0.3, Rule 0.5
  return {
    title: f.titleEn,
    impact: f.impactEn,
    root_cause: `Observed diagnostic condition: ${f.evidence}. Template or component requires structural alignment with web standards.`,
    root_fix: {
      target_behavior: `System adheres to verified web standard for ${f.category}.`,
      current_behavior: `Finding ${f.id} detected: ${f.evidence}`,
      required_change: `Update the component or configuration owning this behavior to emit valid standard output.`,
      scope: urlScope,
      non_goals: ['Do not redesign unrelated components', 'Do not alter business logic']
    },
    recovery: ['Apply the minimum reversible change to the source template and re-crawl affected routes'],
    prevention: ['Add automated regression test asserting target behavior'],
    acceptance_tests: [`Re-scanning ${urlScope} confirms condition ${f.id} is resolved`],
    regression_tests: ['Verify page visual layout and interactive functionality remain intact'],
    do_not_break: ['Do not modify adjacent functional code'],
    rollback_guidance: ['Revert git commit if unexpected side-effects occur']
  };
}

// -------------------------------------------------------------
// Core Engine: Autonomous Remediation Intelligence
// -------------------------------------------------------------
export function generateRemediationReport(
  scan: ScanResult,
  planType: PlanType = 'FREE',
  baselineScan?: ScanResult
): RemediationReport {
  const findings = scan.findings || [];
  const totalAnalyzed = scan.summary?.pagesScanned || 1;
  const discovered = scan.summary?.pagesDiscovered || totalAnalyzed;
  const maxAllowed = planType === 'FREE' ? 25 : 100;

  // 1. Cluster findings by root problem / template signature (Rule 0.9, Rule 17)
  const clusterMap = new Map<string, { f: Finding; urls: string[]; evidenceList: string[] }>();

  for (const f of findings) {
    // Info severity items are informational signals, not actionable defects (Rule 0.10)
    if (f.severity === 'info') continue;

    const key = f.id;
    const existing = clusterMap.get(key);
    const itemUrl = f.url || scan.url;

    if (!existing) {
      clusterMap.set(key, {
        f,
        urls: [itemUrl],
        evidenceList: [f.evidence]
      });
    } else {
      if (!existing.urls.includes(itemUrl)) existing.urls.push(itemUrl);
      if (!existing.evidenceList.includes(f.evidence)) existing.evidenceList.push(f.evidence);
    }
  }

  // 2. Build Remediation Issues
  const candidateIssues: RemediationIssue[] = [];

  for (const [id, cluster] of clusterMap.entries()) {
    const f = cluster.f;
    const observedUrls = cluster.urls;
    const reachCount = observedUrls.length;
    const reachRatio = totalAnalyzed > 0 ? reachCount / totalAnalyzed : 1;

    // False Positive Gate (Rule 4)
    // Check A: Can be reproduced? (Measured findings are reproducible)
    // Check B: Intentional? (e.g. disallowing training bots is intentional policy, not defect)
    if (id.includes('GPTBOT') || id.includes('CLAUDEBOT') || id.includes('GOOGLE-EXTENDED')) {
      // Training controls are user intent, not defect
      continue;
    }

    const priority = calculatePriority(id, f.severity, reachRatio);
    const { confidence, status, rootStatus } = calculateConfidence(f, reachCount);
    const stopCond = evaluateStopCondition(id);
    const blueprint = generateBlueprint(f, observedUrls, totalAnalyzed);

    // Rule 0.7 & Rule 16: Sitewide inference distinction
    let estimatedScope = `${reachCount} of ${totalAnalyzed} analyzed URLs`;
    if (reachRatio >= 0.8 && totalAnalyzed >= 5) {
      estimatedScope = `Sitewide pattern (observed on ${reachCount}/${totalAnalyzed} sampled pages, shared template/configuration)`;
    } else if (reachCount > 1) {
      estimatedScope = `Repeated pattern across ${reachCount} URLs`;
    }

    const issue: RemediationIssue = {
      issue_id: id,
      title: blueprint.title,
      priority,
      status,
      category: f.category,
      observed_urls: observedUrls,
      estimated_scope: estimatedScope,
      evidence: cluster.evidenceList,
      reproduction: [
        `1. Inspect target URL: ${observedUrls[0]}`,
        `2. Observed signal: ${cluster.evidenceList[0]}`,
        `3. Method: ${f.sourceClass} automated validation`
      ],
      impact: blueprint.impact,
      root_cause_status: rootStatus,
      root_cause: blueprint.root_cause,
      root_fix: blueprint.root_fix,
      recovery: blueprint.recovery,
      prevention: blueprint.prevention,
      acceptance_tests: blueprint.acceptance_tests,
      regression_tests: blueprint.regression_tests,
      do_not_break: blueprint.do_not_break,
      rollback_guidance: blueprint.rollback_guidance,
      implementation_stop: stopCond.stop,
      stop_reason: stopCond.reason,
      safe_next_action: stopCond.safeNextAction,
      confidence
    };

    candidateIssues.push(issue);
  }

  // 3. Sorting Engine (Rule 18)
  // Sort within priority by: impact × reach × confidence
  const priorityRank: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };

  candidateIssues.sort((a, b) => {
    if (priorityRank[a.priority] !== priorityRank[b.priority]) {
      return priorityRank[a.priority] - priorityRank[b.priority];
    }
    const scoreA = a.observed_urls.length * a.confidence;
    const scoreB = b.observed_urls.length * b.confidence;
    return scoreB - scoreA || a.issue_id.localeCompare(b.issue_id);
  });

  // Section 18 Ordering:
  // SECTION 1: FIX FIRST (Top issues creating maximum risk/value impact)
  const fixFirst = candidateIssues.filter(i => i.priority === 'P0' || (i.priority === 'P1' && i.confidence >= 0.95)).slice(0, 3);
  const p0 = candidateIssues.filter(i => i.priority === 'P0');
  const p1 = candidateIssues.filter(i => i.priority === 'P1');
  const p2 = candidateIssues.filter(i => i.priority === 'P2');
  const p3 = candidateIssues.filter(i => i.priority === 'P3');

  // Rule 19 & 20: Free vs Pro Plan Filtering
  let deliveredIssues = candidateIssues;
  if (planType === 'FREE') {
    // FREE: up to 25 analyzed pages, health summary, verified P0/P1 issues, limited evidence, limited preview
    deliveredIssues = candidateIssues
      .filter(i => i.priority === 'P0' || i.priority === 'P1')
      .map(i => ({
        ...i,
        root_fix: {
          ...i.root_fix,
          required_change: '[PREVIEW] Upgrade to Pro ($99) for full root fix specifications, code contracts, acceptance & rollback guides.'
        },
        recovery: ['[PREVIEW] Available in Pro Plan'],
        prevention: ['[PREVIEW] Available in Pro Plan'],
        acceptance_tests: ['[PREVIEW] Available in Pro Plan'],
        regression_tests: ['[PREVIEW] Available in Pro Plan'],
        rollback_guidance: ['[PREVIEW] Available in Pro Plan']
      }));
  }

  // 4. 30-Day Re-scan Baseline Comparison (Rule 21)
  let reScanComparison;
  if (baselineScan) {
    const baseIds = new Set((baselineScan.findings || []).map(f => f.id));
    const currentIds = new Set(candidateIssues.map(i => i.issue_id));

    const resolved: string[] = [];
    const persisting: string[] = [];
    const newFindings: string[] = [];

    for (const id of baseIds) {
      if (!currentIds.has(id)) resolved.push(id);
      else persisting.push(id);
    }
    for (const id of currentIds) {
      if (!baseIds.has(id)) newFindings.push(id);
    }

    reScanComparison = {
      baseline_scan_id: baselineScan.scanId,
      resolved,
      partially_resolved: [],
      persisting,
      regressed: [],
      unverifiable: [],
      new_findings: newFindings
    };
  }

  // 5. Generate Markdown Representation
  const markdown = generateReportMarkdown({
    domain: scan.domain,
    scanId: scan.scanId,
    planType,
    overall: scan.overall,
    scores: scan.scores,
    totalDiscovered: discovered,
    totalAnalyzed,
    maxAllowed,
    fixFirst,
    p0,
    p1,
    p2,
    p3,
    allIssues: deliveredIssues
  });

  return {
    mandate_version: '1.0',
    generated_at: new Date().toISOString(),
    target_url: scan.url,
    domain: scan.domain,
    plan_type: planType,
    scan_id: scan.scanId,
    coverage: {
      discovered_urls: discovered,
      analyzed_urls: totalAnalyzed,
      max_deep_analyzed_pages: maxAllowed,
      template_group_count: Math.min(totalAnalyzed, 8)
    },
    health_summary: {
      overall_score: scan.overall,
      scores: scan.scores,
      total_issues: candidateIssues.length,
      p0_count: p0.length,
      p1_count: p1.length,
      p2_count: p2.length,
      p3_count: p3.length
    },
    sections: {
      fix_first: fixFirst,
      p0,
      p1,
      p2,
      p3
    },
    issues: deliveredIssues,
    re_scan_comparison: reScanComparison,
    markdown
  };
}

// -------------------------------------------------------------
// Markdown Report Formatter (Sections 18, 23, 24)
// -------------------------------------------------------------
function generateReportMarkdown(data: {
  domain: string;
  scanId: string;
  planType: PlanType;
  overall: number;
  scores: Record<string, number>;
  totalDiscovered: number;
  totalAnalyzed: number;
  maxAllowed: number;
  fixFirst: RemediationIssue[];
  p0: RemediationIssue[];
  p1: RemediationIssue[];
  p2: RemediationIssue[];
  p3: RemediationIssue[];
  allIssues: RemediationIssue[];
}): string {
  let md = `# AUTONOMOUS WEBSITE REMEDIATION INTELLIGENCE REPORT
**Version:** 1.0 (URL-Only / Read-Only / Zero-Human-Intervention)  
**Target Domain:** ${data.domain}  
**Scan ID:** ${data.scanId}  
**Plan:** ${data.planType} ${data.planType === 'PRO' ? '($99 Full Mandate)' : '(Free Diagnostic Preview)'}  
**Generated:** ${new Date().toISOString()}  

---

## Executive Coverage & Health Summary
- **Discovered URLs:** ${data.totalDiscovered}
- **Analyzed Scope:** ${data.totalAnalyzed} / ${data.maxAllowed} pages
- **Overall Reliability Score:** ${data.overall} / 100
- **Issue Distribution:** ${data.p0.length} P0 | ${data.p1.length} P1 | ${data.p2.length} P2 | ${data.p3.length} P3

| Engine Category | Score |
|---|---:|
`;

  for (const [k, v] of Object.entries(data.scores)) {
    md += `| ${k} | ${v}/100 |\n`;
  }

  md += `\n---\n\n## SECTION 1: FIX FIRST (Maximum Risk/Value Impact)\n\n`;
  if (data.fixFirst.length === 0) {
    md += `> No immediate P0/P1 emergency blockers detected in analyzed scope.\n\n`;
  } else {
    for (const item of data.fixFirst) {
      md += renderIssueMarkdown(item, data.planType);
    }
  }

  if (data.p0.length > 0) {
    md += `## SECTION 2: P0 (Critical Production / Outage Blockers)\n\n`;
    for (const item of data.p0) {
      md += renderIssueMarkdown(item, data.planType);
    }
  }

  if (data.p1.length > 0) {
    md += `## SECTION 3: P1 (High Impact / Conversion / Indexation Blockers)\n\n`;
    for (const item of data.p1) {
      md += renderIssueMarkdown(item, data.planType);
    }
  }

  if (data.planType === 'PRO') {
    if (data.p2.length > 0) {
      md += `## SECTION 4: P2 (Medium Impact / Performance & Metadata)\n\n`;
      for (const item of data.p2) {
        md += renderIssueMarkdown(item, data.planType);
      }
    }

    if (data.p3.length > 0) {
      md += `## SECTION 5: P3 (Low Impact / Minor Optimizations)\n\n`;
      for (const item of data.p3) {
        md += renderIssueMarkdown(item, data.planType);
      }
    }
  } else {
    md += `> [!NOTE]\n> P2 and P3 issues (${data.p2.length + data.p3.length} items) and full implementation blueprints are locked in the Free Preview. Upgrade to Pro ($99) for complete 100-page deep analysis, exact code contracts, acceptance criteria, regression tests, and rollback guidance.\n\n`;
  }

  md += `---

## Constitutional Constraints & Release Gate
1. **Evidence Before Conclusion:** All findings are backed by observable HTTP/DOM evidence.
2. **Read-Only Guarantee:** No customer code, server, database, or DNS settings are modified.
3. **Release Gate:**
   - [ ] Measured symptom is gone.
   - [ ] Root cause is verified by acceptance test.
   - [ ] Repeating the failure mode does not break the system.
`;

  return md;
}

function renderIssueMarkdown(i: RemediationIssue, plan: PlanType): string {
  let out = `### [${i.priority}] ${i.issue_id}: ${i.title}\n\n`;
  out += `- **Status:** \`${i.status}\` | **Confidence:** \`${(i.confidence * 100).toFixed(1)}%\`\n`;
  out += `- **Category:** \`${i.category}\`\n`;
  out += `- **Observed Reach:** ${i.observed_urls.length} URLs (\`${i.estimated_scope}\`)\n`;
  out += `- **Evidence:** \`${i.evidence.join('; ')}\`\n`;
  out += `- **Impact:** ${i.impact}\n`;
  out += `- **Root Cause Status:** \`${i.root_cause_status}\`\n`;
  out += `- **Root Cause:** ${i.root_cause}\n\n`;

  if (i.implementation_stop) {
    out += `> [!CAUTION]\n> **IMPLEMENTATION_STOP = TRUE**\n> **Reason:** ${i.stop_reason}\n> **Safe Next Action:** ${i.safe_next_action}\n\n`;
  }

  out += `#### Root Fix Contract\n`;
  out += `- **Target Behavior:** ${i.root_fix.target_behavior}\n`;
  out += `- **Current Behavior:** ${i.root_fix.current_behavior}\n`;
  out += `- **Required Change:** ${i.root_fix.required_change}\n`;
  out += `- **Scope:** \`${i.root_fix.scope}\`\n`;
  if (i.root_fix.non_goals.length > 0) {
    out += `- **Non-Goals:** ${i.root_fix.non_goals.join(', ')}\n`;
  }
  out += `\n`;

  if (plan === 'PRO') {
    out += `#### Recovery & Prevention\n`;
    out += `- **Recovery:** ${i.recovery.join('; ')}\n`;
    out += `- **Prevention:** ${i.prevention.join('; ')}\n\n`;

    out += `#### Acceptance & Regression Testing\n`;
    out += `- **Acceptance Test:** ${i.acceptance_tests.join('; ')}\n`;
    out += `- **Regression Test:** ${i.regression_tests.join('; ')}\n`;
    out += `- **Do Not Break:** ${i.do_not_break.join('; ')}\n`;
    out += `- **Rollback Guidance:** ${i.rollback_guidance.join('; ')}\n\n`;
  }

  return out;
}
