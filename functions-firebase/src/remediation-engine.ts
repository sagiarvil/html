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
  if (sev === 'critical') return 'P1';

  // P2: measurable performance degradation, repeated metadata/schema defects, broken internal links
  if (findingId.startsWith('PERF-') && sev === 'high') return 'P2';
  if (findingId.startsWith('SCHEMA-JSON')) return 'P2';
  if (findingId.startsWith('SEC-') && sev === 'high') return 'P2';
  if (findingId === 'TECH-TITLE-001') return 'P2';
  if (findingId === 'A11Y-NAME-001') return 'P2';
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
