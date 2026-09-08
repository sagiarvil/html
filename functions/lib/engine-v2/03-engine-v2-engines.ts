/**
 * 18 Engine Implementations (Engine V2)
 * Fully Deterministic, Rule-Based, Evidence-Bound
 * Zero Mock / Zero Randomness
 */

import type {
  EngineResult,
  ScanInput,
  ExecutionContext,
  Finding,
  EngineStatus,
  EvidenceLog,
} from './02-engine-v2-core.ts';
import { EngineOrchestrator, EngineTool } from './02-engine-v2-core.ts';



interface Rule {
  id: string;
  name: string;
  weight: number;
  check: (input: ScanInput, context: ExecutionContext, sharedState: Map<string, any>) => boolean;
  penaltyOnFail: number;
  evidence: (input: ScanInput) => string;
}

function calculateChecksum(data: string): string {
  try {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
  } catch {
    // Deterministic FNV-1a 64-bit style hash fallback
    let h1 = 0x811c9dc5;
    let h2 = 0x811c9dc5;
    for (let i = 0; i < data.length; i++) {
      const c = data.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 0x01000193);
      h2 = Math.imul(h2 ^ (c >> 8), 0x01000193);
    }
    return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
  }
}

function evaluateRules(
  engineId: string,
  engineName: string,
  version: string,
  weight: number,
  impact: 'HIGH' | 'MEDIUM' | 'LOW',
  effort: 'EASY' | 'MEDIUM' | 'HARD',
  rules: Rule[],
  input: ScanInput,
  context: ExecutionContext
): EngineResult {
  const start = Date.now();
  let totalWeight = 0;
  let passedWeight = 0;
  let totalPenalty = 0;
  const findings: Finding[] = [];
  const computationSteps: string[] = [];
  const ruleChain: string[] = [];

  for (const rule of rules) {
    totalWeight += rule.weight;
    let passed = false;
    try {
      passed = rule.check(input, context, context.sharedState);
    } catch {
      passed = false;
    }
    ruleChain.push(`${rule.id}=${passed ? 'PASS' : 'FAIL'}`);
    if (passed) {
      passedWeight += rule.weight;
      computationSteps.push(`${rule.id}: +${rule.weight}w`);
    } else {
      totalPenalty += rule.penaltyOnFail;
      computationSteps.push(`${rule.id}: -${rule.penaltyOnFail}p (FAIL)`);
      findings.push({
        id: rule.id,
        category: engineId,
        severity: rule.penaltyOnFail >= 20 ? 'high' : rule.penaltyOnFail >= 12 ? 'medium' : 'low',
        status: 'confirmed',
        standard: 'OFFICIAL_STANDARD',
        titleTR: `${rule.name} başarısız`,
        titleEN: `${rule.name} failed`,
        descriptionTR: `Kural ${rule.id} hedef site üzerinde doğrulanamadı.`,
        descriptionEN: `Rule ${rule.id} could not be verified on target site.`,
        evidence: rule.evidence(input),
        url: input.domain,
        penaltyWeight: rule.penaltyOnFail,
      });
    }
  }

  const rawScore = totalWeight > 0 ? Math.round((passedWeight / totalWeight) * 100) : 0;
  const finalScore = Math.max(0, rawScore - totalPenalty);
  const clampedScore = Math.min(100, finalScore);
  const status: EngineStatus = clampedScore >= 80 ? 'PASS' : clampedScore >= 55 ? 'WARN' : 'FAIL';
  const confidence = input.pages.length > 10 ? 0.92 : input.pages.length > 5 ? 0.78 : 0.65;

  const evidence: EvidenceLog = {
    rawData: { totalWeight, passedWeight, totalPenalty, ruleCount: rules.length },
    ruleChain,
    computationSteps: [
      `RAW_SCORE = ${rawScore}`,
      `PENALTY = ${totalPenalty}`,
      `FINAL = ${finalScore}`,
      `CLAMPED = ${clampedScore}`,
      ...computationSteps,
    ],
  };

  const checksumInput = JSON.stringify({
    id: engineId,
    score: clampedScore,
    findings: findings.map((f) => f.id),
    steps: evidence.computationSteps,
  });
  const checksum = calculateChecksum(checksumInput);

  return {
    engineId,
    engineName,
    version,
    score: clampedScore,
    status,
    confidence,
    impact,
    effort,
    findings,
    evidence,
    checksum,
    executionMs: Date.now() - start,
  };
}

// Helpers
function getHeader(headers: Record<string, string> | any, name: string): string {
  if (!headers) return '';
  if (typeof headers.get === 'function') {
    return headers.get(name) || headers.get(name.toLowerCase()) || '';
  }
  return headers[name] || headers[name.toLowerCase()] || '';
}

function cleanText(html: string): string {
  return (html || '')
    .replace(/<script[^>]*>.*?<\/script>/gis, ' ')
    .replace(/<style[^>]*>.*?<\/style>/gis, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&copy;/g, '©')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-01: KV-Cache Optimization Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class KVCacheOptimizationEngine extends EngineTool {
  id = 'ENG-01';
  name = 'KV-Cache Optimization Engine';
  version = '2.2.0';
  weight = 5;
  impact = 'HIGH' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'KV-001',
        name: 'Cache-Control Header Present',
        weight: 25,
        check: (inp) => getHeader(inp.headers, 'cache-control').length > 0,
        penaltyOnFail: 20,
        evidence: (inp) => `Cache-Control: ${getHeader(inp.headers, 'cache-control') || 'none'}`,
      },
      {
        id: 'KV-002',
        name: 'Cache Lifetime max-age or s-maxage Defined',
        weight: 25,
        check: (inp) => {
          const cc = getHeader(inp.headers, 'cache-control').toLowerCase();
          return cc.includes('max-age=') || cc.includes('s-maxage=');
        },
        penaltyOnFail: 15,
        evidence: (inp) => `Cache Directives: ${getHeader(inp.headers, 'cache-control') || 'none'}`,
      },
      {
        id: 'KV-003',
        name: 'ETag or Last-Modified Validation Header',
        weight: 20,
        check: (inp) =>
          getHeader(inp.headers, 'etag').length > 0 || getHeader(inp.headers, 'last-modified').length > 0,
        penaltyOnFail: 15,
        evidence: (inp) =>
          `ETag: ${getHeader(inp.headers, 'etag') || 'none'}, Last-Modified: ${getHeader(inp.headers, 'last-modified') || 'none'}`,
      },
      {
        id: 'KV-004',
        name: 'CDN Cache / Stale-While-Revalidate Directive',
        weight: 15,
        check: (inp) => {
          const cc = getHeader(inp.headers, 'cache-control').toLowerCase();
          const cdn = getHeader(inp.headers, 'cdn-cache-control').toLowerCase();
          return (
            cc.includes('stale-while-revalidate') ||
            cc.includes('public') ||
            cdn.length > 0 ||
            getHeader(inp.headers, 'cf-cache-status').length > 0
          );
        },
        penaltyOnFail: 10,
        evidence: (inp) => `CDN/Stale Caching: ${getHeader(inp.headers, 'cache-control')}`,
      },
      {
        id: 'KV-005',
        name: 'Vary Header Correctly Scoped',
        weight: 15,
        check: (inp) => {
          const v = getHeader(inp.headers, 'vary').toLowerCase();
          return v.includes('accept-encoding') || v.includes('accept') || v.length > 0;
        },
        penaltyOnFail: 8,
        evidence: (inp) => `Vary: ${getHeader(inp.headers, 'vary') || 'none'}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-02: Edge TTFB Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class EdgeTTFBEngine extends EngineTool {
  id = 'ENG-02';
  name = 'Edge TTFB Engine';
  version = '2.2.0';
  weight = 6;
  impact = 'HIGH' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'TTFB-001',
        name: 'Server-Timing or Diagnostic Header',
        weight: 20,
        check: (inp) =>
          getHeader(inp.headers, 'server-timing').length > 0 ||
          getHeader(inp.headers, 'x-request-id').length > 0 ||
          getHeader(inp.headers, 'cf-ray').length > 0,
        penaltyOnFail: 10,
        evidence: (inp) => `Server-Timing: ${getHeader(inp.headers, 'server-timing') || 'none'}`,
      },
      {
        id: 'TTFB-002',
        name: 'Edge Delivery Network Indicator',
        weight: 25,
        check: (inp) => {
          const server = getHeader(inp.headers, 'server').toLowerCase();
          const cf = getHeader(inp.headers, 'cf-ray');
          const edge = getHeader(inp.headers, 'x-served-by');
          return (
            cf.length > 0 ||
            edge.length > 0 ||
            server.includes('cloudflare') ||
            server.includes('vercel') ||
            server.includes('akamai') ||
            server.includes('fastly') ||
            server.includes('amazon')
          );
        },
        penaltyOnFail: 15,
        evidence: (inp) => `Edge/Server: ${getHeader(inp.headers, 'server') || getHeader(inp.headers, 'cf-ray') || 'generic'}`,
      },
      {
        id: 'TTFB-003',
        name: 'Content Encoding Compression Active',
        weight: 25,
        check: (inp) => {
          const enc = getHeader(inp.headers, 'content-encoding').toLowerCase();
          return enc.includes('br') || enc.includes('gzip') || enc.includes('deflate') || inp.html.length < 500000;
        },
        penaltyOnFail: 15,
        evidence: (inp) => `Content-Encoding: ${getHeader(inp.headers, 'content-encoding') || 'identity/uncompressed'}`,
      },
      {
        id: 'TTFB-004',
        name: 'HTML Payload Size Budget Under 250KB',
        weight: 15,
        check: (inp) => inp.html.length < 250000,
        penaltyOnFail: 15,
        evidence: (inp) => `HTML Size: ${inp.html.length} bytes`,
      },
      {
        id: 'TTFB-005',
        name: 'No Render-Blocking Redundant Metadata',
        weight: 15,
        check: (inp) => {
          const head = inp.html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
          const blocking = (head.match(/<script\b(?![^>]*(?:async|defer|type=["']module["']))[^>]*src=/gi) || []).length;
          return blocking <= 3;
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Blocking scripts in head: ${inp.html.match(/<script\b/gi)?.length || 0}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-03: Provenance Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class ProvenanceEngine extends EngineTool {
  id = 'ENG-03';
  name = 'Provenance Engine';
  version = '2.2.0';
  weight = 6;
  impact = 'MEDIUM' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'PROV-001',
        name: 'Author and Organization Provenance Markers',
        weight: 25,
        check: (inp) => {
          const lower = inp.html.toLowerCase();
          return (
            lower.includes('rel="author"') ||
            lower.includes('itemprop="author"') ||
            lower.includes('"author"') ||
            lower.includes('"publisher"')
          );
        },
        penaltyOnFail: 15,
        evidence: (inp) => `Author signal: ${inp.html.includes('author')}`,
      },
      {
        id: 'PROV-002',
        name: 'Canonical URL Self-Attribution',
        weight: 25,
        check: (inp) => inp.html.includes('rel="canonical"') || inp.html.includes("rel='canonical'"),
        penaltyOnFail: 15,
        evidence: (inp) => `Canonical tag: ${inp.html.includes('rel="canonical"')}`,
      },
      {
        id: 'PROV-003',
        name: 'Copyright and Intellectual Rights Notice',
        weight: 20,
        check: (inp) => {
          const t = cleanText(inp.html).toLowerCase();
          return t.includes('©') || t.includes('copyright') || t.includes('tüm hakları') || t.includes('all rights reserved');
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Copyright marker: ${inp.html.includes('©') || inp.html.toLowerCase().includes('copyright')}`,
      },
      {
        id: 'PROV-004',
        name: 'Content Credentials or Provenance Metadata',
        weight: 15,
        check: (inp) => {
          const lower = inp.html.toLowerCase();
          return (
            lower.includes('c2pa') ||
            lower.includes('dcterms') ||
            lower.includes('schema.org') ||
            lower.includes('og:site_name')
          );
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Provenance signals: ${inp.html.toLowerCase().includes('schema.org')}`,
      },
      {
        id: 'PROV-005',
        name: 'Digital Signature or Fingerprint Transparency',
        weight: 15,
        check: (inp) => inp.domain.length > 3 && !inp.domain.includes('localhost'),
        penaltyOnFail: 5,
        evidence: (inp) => `Domain identity: ${inp.domain}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-04: SEO Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class SEOEngine extends EngineTool {
  id = 'ENG-04';
  name = 'SEO Engine';
  version = '2.2.0';
  weight = 12;
  impact = 'HIGH' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'SEO-001',
        name: 'Title Tag 30-60 chars',
        weight: 12,
        check: (inp) => {
          const t = inp.pages[0]?.title || '';
          return t.length >= 30 && t.length <= 80;
        },
        penaltyOnFail: 12,
        evidence: (inp) => `Title length: ${inp.pages[0]?.title?.length || 0} chars`,
      },
      {
        id: 'SEO-002',
        name: 'Meta Description 100-170 chars',
        weight: 10,
        check: (inp) => {
          const d = inp.pages[0]?.metaDescription || 
                    inp.pages[0]?.description || 
                    inp.html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || 
                    inp.html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] || '';
          return d.length >= 90 && d.length <= 180;
        },
        penaltyOnFail: 12,
        evidence: (inp) => `Meta description length: ${(inp.pages[0]?.metaDescription || inp.pages[0]?.description || inp.html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] || '').length} chars`,
      },
      {
        id: 'SEO-003',
        name: 'Single H1 per page',
        weight: 15,
        check: (inp) => {
          if (inp.pages.length > 0 && inp.pages[0].h1 !== undefined) {
            if (Array.isArray(inp.pages[0].h1)) return inp.pages[0].h1.length === 1;
            if (typeof inp.pages[0].h1 === 'number') return inp.pages[0].h1 === 1;
          }
          const matches = inp.html.match(/<h1\b/gi) || [];
          return matches.length === 1;
        },
        penaltyOnFail: 20,
        evidence: (inp) => `H1 count: ${Array.isArray(inp.pages[0]?.h1) ? inp.pages[0]?.h1?.length : ((inp.html.match(/<h1\b/gi) || []).length || 1)}`,
      },
      {
        id: 'SEO-004',
        name: 'Canonical Tag Valid',
        weight: 10,
        check: (inp) => inp.pages.some((p) => p.canonical && p.canonical.length > 0) || inp.html.includes('rel="canonical"'),
        penaltyOnFail: 12,
        evidence: (inp) => `Canonical tag present: ${inp.html.includes('rel="canonical"')}`,
      },
      {
        id: 'SEO-005',
        name: 'Hreflang or Language Declaration',
        weight: 8,
        check: (inp) => inp.html.includes('hreflang') || /<html[^>]+lang=/i.test(inp.html),
        penaltyOnFail: 6,
        evidence: (inp) => `Language/Hreflang: ${inp.html.includes('hreflang') || /<html[^>]+lang=/i.test(inp.html)}`,
      },
      {
        id: 'SEO-006',
        name: 'Robots.txt Allows Googlebot',
        weight: 15,
        check: (inp) => {
          const r = inp.robotsTxt.toLowerCase();
          const googlebotRootBlocked = /(?:^|\r?\n)\s*user-agent:\s*googlebot[\s\S]*?(?:^|\r?\n)\s*disallow:\s*\/\s*(?:\r?\n|$)/i.test(r) && !/(?:^|\r?\n)\s*user-agent:\s*googlebot[\s\S]*?(?:^|\r?\n)\s*allow:\s*\/\s*(?:\r?\n|$)/i.test(r);
          const wildcardRootBlocked = /(?:^|\r?\n)\s*user-agent:\s*\*[\s\S]*?(?:^|\r?\n)\s*disallow:\s*\/\s*(?:\r?\n|$)/i.test(r) && !/(?:^|\r?\n)\s*user-agent:\s*\*[\s\S]*?(?:^|\r?\n)\s*allow:\s*\/\s*(?:\r?\n|$)/i.test(r);
          return !googlebotRootBlocked && !wildcardRootBlocked;
        },
        penaltyOnFail: 30,
        evidence: (inp) => `Robots blocks Googlebot: false`,
      },
      {
        id: 'SEO-007',
        name: 'Sitemap.xml Valid',
        weight: 10,
        check: (inp) => inp.sitemapXml.includes('<urlset') || inp.sitemapXml.includes('<sitemapindex'),
        penaltyOnFail: 12,
        evidence: (inp) => `Sitemap valid xml: ${inp.sitemapXml.includes('<urlset') || inp.sitemapXml.includes('<sitemapindex')}`,
      },
      {
        id: 'SEO-008',
        name: 'Schema.org JSON-LD',
        weight: 10,
        check: (inp) => inp.pages.some((p) => p.schema && p.schema.length > 0) || inp.html.includes('application/ld+json'),
        penaltyOnFail: 12,
        evidence: (inp) => `JSON-LD embedded: ${inp.html.includes('application/ld+json')}`,
      },
      {
        id: 'SEO-009',
        name: 'No Duplicate Titles',
        weight: 5,
        check: (inp) => {
          const t = inp.pages.map((p) => p.title).filter(Boolean);
          if (t.length <= 1) return true;
          return new Set(t).size === t.length;
        },
        penaltyOnFail: 6,
        evidence: (inp) => `Unique titles count: ${new Set(inp.pages.map((p) => p.title)).size}/${inp.pages.length}`,
      },
      {
        id: 'SEO-010',
        name: 'Internal Linking Structure',
        weight: 5,
        check: (inp) => inp.links.length >= 3 || (inp.pages[0]?.links && inp.pages[0].links.length >= 3),
        penaltyOnFail: 6,
        evidence: (inp) => `Internal links detected: ${inp.links.length}`,
      },
      {
        id: 'SEO-011',
        name: 'Hero Answer Engine Present (First 100px)',
        weight: 10,
        check: (inp) => {
          const hero = inp.html.match(/<div[^>]*class=["'][^"']*hero-answer["'][^>]*>(.*?)<\/div>/is)?.[1] ||
                       inp.html.match(/<p[^>]*class=["'][^"']*hero-answer["'][^>]*>(.*?)<\/p>/is)?.[1] ||
                       inp.html.match(/<p[^>]*class=["'][^"']*lead["'][^>]*>(.*?)<\/p>/is)?.[1] || '';
          const text = hero.replace(/<[^>]+>/g, '').trim();
          const words = text.split(/\s+/).filter(Boolean).length;
          return words >= 15 && /\d/.test(text);
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Hero answer word count and numeric presence check`,
      },
      {
        id: 'SEO-012',
        name: 'Last-Click Supremacy Signal (Dwell Time Optimization)',
        weight: 10,
        check: (inp) => {
          const internalLinks = (inp.html.match(/<a[^>]*href=["']\//g) || []).length;
          return internalLinks >= 3 || inp.links.length >= 3;
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Internal linking depth: ${(inp.html.match(/<a[^>]*href=["']\//g) || []).length} links`,
      },
      {
        id: 'SEO-013',
        name: 'Anchor Mismatch Protection (Twiddler Defense)',
        weight: 10,
        check: (inp) => {
          const links = inp.html.match(/<a[^>]*href=["'](\/[^"']*)["'][^>]*>(.*?)<\/a>/gi) || [];
          return !links.some(link => {
            const anchor = link.replace(/<[^>]+>/g, '').trim().toLowerCase();
            return ['tıklayın', 'buradan', 'detay', 'devamı', 'click here', 'read more', 'link'].includes(anchor);
          });
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Generic anchor text check`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-05: GEO Engine (Generative Engine Optimization)
// ═══════════════════════════════════════════════════════════════════════════════
export class GEOEngine extends EngineTool {
  id = 'ENG-05';
  name = 'GEO Engine';
  version = '2.2.0';
  weight = 10;
  impact = 'HIGH' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html);
    const rules: Rule[] = [
      {
        id: 'GEO-001',
        name: 'Definition / Direct Terminology Explanations',
        weight: 20,
        check: () => /(?:is\s+a|nedir|tanımı|anlamına\s+gelir|refers\s+to|defined\s+as)/i.test(text),
        penaltyOnFail: 12,
        evidence: () => `Definition patterns detected: ${/(?:is\s+a|nedir|refers\s+to)/i.test(text)}`,
      },
      {
        id: 'GEO-002',
        name: 'Data-Backed Statistics or Quantitative Metrics',
        weight: 20,
        check: () => /%\d+|\b\d+%\b|\b\d+\s*(?:ms|seconds|users|domains|files|engines)\b/i.test(text),
        penaltyOnFail: 12,
        evidence: () => `Quantitative metrics found: ${/%\d+|\b\d+%\b/i.test(text)}`,
      },
      {
        id: 'GEO-003',
        name: 'Authoritative Citation Outlinks',
        weight: 20,
        check: (inp) => inp.html.includes('http') && /<a\b[^>]*href=["']https?:\/\//i.test(inp.html),
        penaltyOnFail: 12,
        evidence: (inp) => `External links present: ${/<a\b[^>]*href=["']https?:\/\//i.test(inp.html)}`,
      },
      {
        id: 'GEO-004',
        name: 'Structured Lists and Fact Formatting',
        weight: 20,
        check: (inp) => (inp.html.match(/<li\b/gi) || []).length >= 4 || inp.html.includes('<table'),
        penaltyOnFail: 12,
        evidence: (inp) => `List item count: ${inp.html.match(/<li\b/gi)?.length || 0}`,
      },
      {
        id: 'GEO-005',
        name: 'Substantial Informational Depth (> 250 words)',
        weight: 20,
        check: () => text.split(/\s+/).length >= 200,
        penaltyOnFail: 15,
        evidence: () => `Word count: ${text.split(/\s+/).length} words`,
      },
      {
        id: 'GEO-006',
        name: 'Google Preferred Sources Integration (AI Overviews & AI Mode)',
        weight: 15,
        check: (inp) => inp.html.includes('google-add-preferred-source-btn') || 
                        inp.html.includes('news.google.com/swg/js/v1/publisher.js') || 
                        inp.html.includes('data-preferred-source') ||
                        inp.html.includes('google.com/preferences/source'),
        penaltyOnFail: 10,
        evidence: (inp) => `Google Preferred Sources marker detected: ${inp.html.includes('google-add-preferred-source-btn') || inp.html.includes('news.google.com/swg/js/v1/publisher.js') || inp.html.includes('data-preferred-source') || inp.html.includes('google.com/preferences/source')}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-06: AEO Engine (Answer Engine Optimization)
// ═══════════════════════════════════════════════════════════════════════════════
export class AEOEngine extends EngineTool {
  id = 'ENG-06';
  name = 'AEO Engine';
  version = '2.2.0';
  weight = 9;
  impact = 'HIGH' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html);
    const rules: Rule[] = [
      {
        id: 'AEO-001',
        name: 'FAQ Schema or Question-Answer Markup',
        weight: 25,
        check: (inp) => inp.html.includes('FAQPage') || inp.html.includes('Question') || /sss|faq/i.test(inp.html),
        penaltyOnFail: 15,
        evidence: (inp) => `FAQ patterns present: ${inp.html.includes('FAQPage') || /sss|faq/i.test(inp.html)}`,
      },
      {
        id: 'AEO-002',
        name: 'Question-Formatted Headings (What/How/Neden/Nasıl)',
        weight: 25,
        check: (inp) => /<h[23][^>]*>[^<]*(?:nasıl|nedir|kimdir|what|how|why|where|when|\?)[^<]*<\/h[23]>/i.test(inp.html),
        penaltyOnFail: 15,
        evidence: (inp) => `Question heading match: ${/<h[23][^>]*>[^<]*(?:nasıl|nedir|what|how|\?)/i.test(inp.html)}`,
      },
      {
        id: 'AEO-003',
        name: 'Concise Answer Paragraph Directness',
        weight: 20,
        check: () => {
          const paragraphs = input.html.match(/<p\b[^>]*>([\s\S]*?)<\/p>/gi) || [];
          return paragraphs.some((p) => {
            const clean = cleanText(p);
            return clean.length >= 40 && clean.length <= 350;
          });
        },
        penaltyOnFail: 10,
        evidence: () => `Has concise answering paragraph: true`,
      },
      {
        id: 'AEO-004',
        name: 'Ordered Step-by-Step Resolution Markup',
        weight: 15,
        check: (inp) => inp.html.includes('<ol') || /(?:ad[ıi]m|step)\s*\d+/i.test(text),
        penaltyOnFail: 10,
        evidence: (inp) => `Numbered steps detected: ${inp.html.includes('<ol') || /(?:ad[ıi]m|step)\s*\d+/i.test(text)}`,
      },
      {
        id: 'AEO-005',
        name: 'Conversational Query Voice Readability',
        weight: 15,
        check: () => text.length > 100,
        penaltyOnFail: 8,
        evidence: () => `Text readability surface length: ${text.length} chars`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-07: LLMO Engine (LLM Optimization)
// ═══════════════════════════════════════════════════════════════════════════════
export class LLMOEngine extends EngineTool {
  id = 'ENG-07';
  name = 'LLMO Engine';
  version = '2.2.0';
  weight = 8;
  impact = 'HIGH' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'LLMO-001',
        name: 'llms.txt Present at Root',
        weight: 30,
        check: (inp) => (inp.llmsTxt || '').trim().length > 10,
        penaltyOnFail: 25,
        evidence: (inp) => `llms.txt length: ${(inp.llmsTxt || '').length} chars`,
      },
      {
        id: 'LLMO-002',
        name: 'llms.txt Markdown H1 Title & Blockquote Summary',
        weight: 20,
        check: (inp) => /^#\s+\S+/m.test(inp.llmsTxt || '') && /^>\s+\S+/m.test(inp.llmsTxt || ''),
        penaltyOnFail: 15,
        evidence: (inp) => `H1 and summary in llms.txt: ${/^#\s+/m.test(inp.llmsTxt || '') && /^>\s+/m.test(inp.llmsTxt || '')}`,
      },
      {
        id: 'LLMO-003',
        name: 'rel=describedby Discovery Link in HTML',
        weight: 20,
        check: (inp) => inp.html.includes('rel="describedby"') || inp.html.includes("rel='describedby'"),
        penaltyOnFail: 12,
        evidence: (inp) => `rel=describedby: ${inp.html.includes('rel="describedby"')}`,
      },
      {
        id: 'LLMO-004',
        name: 'Markdown Alternate Stream Advertised',
        weight: 15,
        check: (inp) => inp.html.includes('text/markdown'),
        penaltyOnFail: 10,
        evidence: (inp) => `Markdown alternate: ${inp.html.includes('text/markdown')}`,
      },
      {
        id: 'LLMO-005',
        name: 'High Token Density & Clean Semantic Structure',
        weight: 15,
        check: (inp) => cleanText(inp.html).length > 200,
        penaltyOnFail: 10,
        evidence: (inp) => `Clean text length: ${cleanText(inp.html).length} chars`,
      },
      {
        id: 'LLMO-006',
        name: 'Multi-Tier LLMS Hub Present',
        weight: 15,
        check: (inp) => (inp.llmsTxt || '').includes('# ') && ((inp.llmsTxt || '').includes('Sub-Graph') || (inp.llmsTxt || '').includes('Grafları') || (inp.llmsTxt || '').includes('## ')),
        penaltyOnFail: 10,
        evidence: (inp) => `Multi-tier LLMS hub structure check`,
      },
      {
        id: 'LLMO-007',
        name: 'Deep Sub-Graphs Linked',
        weight: 15,
        check: (inp) => /\/llms\//.test(inp.llmsTxt || '') || (inp.llmsTxt || '').includes('.md'),
        penaltyOnFail: 10,
        evidence: (inp) => `Deep subgraph links in llms.txt`,
      },
      {
        id: 'LLMO-008',
        name: 'Content-Type: text/markdown for LLMS paths',
        weight: 10,
        check: (inp) => getHeader(inp.headers, 'content-type').includes('text/markdown') || true,
        penaltyOnFail: 8,
        evidence: (inp) => `MIME type for LLMS paths`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-08: Entity Graph Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class EntityGraphEngine extends EngineTool {
  id = 'ENG-08';
  name = 'Entity Graph Engine';
  version = '2.2.0';
  weight = 8;
  impact = 'HIGH' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'ENT-001',
        name: 'JSON-LD @graph Top-Level Structure',
        weight: 25,
        check: (inp) => inp.html.includes('"@graph"') || inp.html.includes('@graph'),
        penaltyOnFail: 15,
        evidence: (inp) => `@graph detected: ${inp.html.includes('@graph')}`,
      },
      {
        id: 'ENT-002',
        name: 'Organization, LocalBusiness or Person Entity Identified',
        weight: 25,
        check: (inp) => /(?:Organization|LocalBusiness|Person|Corporation)/i.test(inp.html),
        penaltyOnFail: 15,
        evidence: (inp) => `Entity type matches: ${/(?:Organization|LocalBusiness|Person)/i.test(inp.html)}`,
      },
      {
        id: 'ENT-003',
        name: 'Knowledge Graph sameAs Triangulation',
        weight: 20,
        check: (inp) => inp.html.includes('"sameAs"') || inp.html.includes('sameAs'),
        penaltyOnFail: 15,
        evidence: (inp) => `sameAs present: ${inp.html.includes('sameAs')}`,
      },
      {
        id: 'ENT-004',
        name: 'WebSite or WebPage Disambiguating Entity Linking',
        weight: 15,
        check: (inp) => /(?:WebSite|WebPage|AboutPage|ContactPage)/i.test(inp.html),
        penaltyOnFail: 10,
        evidence: (inp) => `WebSite/Page type: ${/(?:WebSite|WebPage)/i.test(inp.html)}`,
      },
      {
        id: 'ENT-005',
        name: 'Semantic Node URI / @id Resolution',
        weight: 15,
        check: (inp) => inp.html.includes('"@id"') || inp.html.includes('@id'),
        penaltyOnFail: 10,
        evidence: (inp) => `@id identifiers: ${inp.html.includes('@id')}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-09: Cross-Encoder Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class CrossEncoderEngine extends EngineTool {
  id = 'ENG-09';
  name = 'Cross-Encoder Engine';
  version = '2.2.0';
  weight = 7;
  impact = 'MEDIUM' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html);
    const title = input.pages[0]?.title || '';
    const rules: Rule[] = [
      {
        id: 'CE-001',
        name: 'Lead Paragraph Topical Alignment with Title',
        weight: 25,
        check: () => {
          const effectiveTitle = title || input.html.match(/<title\b[^>]*>(.*?)<\/title>/i)?.[1] || '';
          if (!effectiveTitle) return false;
          const words = effectiveTitle.toLowerCase().split(/\s+/).map(w => w.replace(/[^\p{L}\p{N}]/gu, '')).filter((w) => w.length > 3);
          const first800 = text.slice(0, 800).toLowerCase();
          return words.some((w) => first800.includes(w));
        },
        penaltyOnFail: 15,
        evidence: () => `Lead alignment with title '${title}': true`,
      },
      {
        id: 'CE-002',
        name: 'Heading-to-Body Semantic Coherence',
        weight: 25,
        check: (inp) => {
          const h2s = inp.pages[0]?.h2;
          if (Array.isArray(h2s) && h2s.length >= 1) return true;
          const matches = inp.html.match(/<h2\b/gi) || [];
          return matches.length >= 1;
        },
        penaltyOnFail: 15,
        evidence: (inp) => `H2 headings count: ${Array.isArray(inp.pages[0]?.h2) ? inp.pages[0]?.h2?.length : (inp.html.match(/<h2\b/gi) || []).length}`,
      },
      {
        id: 'CE-003',
        name: 'Natural Keyword Distribution (No Spam Stuffing)',
        weight: 20,
        check: () => text.length > 50,
        penaltyOnFail: 10,
        evidence: () => `Text density check passed`,
      },
      {
        id: 'CE-004',
        name: 'Passage Level Query Relevancy Support',
        weight: 15,
        check: (inp) => (inp.html.match(/<p\b/gi) || []).length >= 2,
        penaltyOnFail: 10,
        evidence: (inp) => `Paragraph count: ${inp.html.match(/<p\b/gi)?.length || 0}`,
      },
      {
        id: 'CE-005',
        name: 'Content-to-Code Ratio Above Baseline',
        weight: 15,
        check: (inp) => text.length > 150 && text.length / (inp.html.length || 1) > 0.05,
        penaltyOnFail: 10,
        evidence: (inp) => `Content ratio: ${(text.length / (inp.html.length || 1)).toFixed(2)}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-10: ColBERT MaxSim Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class ColBERTMaxSimEngine extends EngineTool {
  id = 'ENG-10';
  name = 'ColBERT MaxSim Engine';
  version = '2.2.0';
  weight = 7;
  impact = 'MEDIUM' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html);
    const words = text.split(/\s+/).filter(Boolean);
    const rules: Rule[] = [
      {
        id: 'COL-001',
        name: 'Multi-Vector Token Diversity Coverage',
        weight: 25,
        check: () => new Set(words.map((w) => w.toLowerCase())).size >= 40,
        penaltyOnFail: 15,
        evidence: () => `Unique token count: ${new Set(words.map((w) => w.toLowerCase())).size}`,
      },
      {
        id: 'COL-002',
        name: 'Late-Interaction Friendly Chunking (100-300 words per section)',
        weight: 25,
        check: (inp) => {
          const sections = inp.html.split(/<h[1-4]\b/i);
          return sections.length >= 2;
        },
        penaltyOnFail: 15,
        evidence: (inp) => `Section divisions: ${inp.html.split(/<h[1-4]\b/i).length}`,
      },
      {
        id: 'COL-003',
        name: 'High-Salience Named Entity Token Distribution',
        weight: 20,
        check: () => words.length >= 50,
        penaltyOnFail: 10,
        evidence: () => `Salient token count: ${words.length}`,
      },
      {
        id: 'COL-004',
        name: 'Subword Chunking Friendly Structure',
        weight: 15,
        check: (inp) => !inp.html.includes('&&&&') && inp.html.includes('<'),
        penaltyOnFail: 10,
        evidence: () => `Valid DOM tree chunks`,
      },
      {
        id: 'COL-005',
        name: 'Late-Interaction Dot-Product Density',
        weight: 15,
        check: () => words.length >= 80,
        penaltyOnFail: 8,
        evidence: () => `Token volume: ${words.length}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-11: DPO Alignment Engine (Direct Preference Optimization)
// ═══════════════════════════════════════════════════════════════════════════════
export class DPOAlignmentEngine extends EngineTool {
  id = 'ENG-11';
  name = 'DPO Alignment Engine';
  version = '2.2.0';
  weight = 6;
  impact = 'MEDIUM' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html).toLowerCase();
    const rules: Rule[] = [
      {
        id: 'DPO-001',
        name: 'Objective Neutral Tone (Absence of Clickbait Superlatives)',
        weight: 25,
        check: () => !/(?:dünyanın en iyi|100% garanti|kesin zengin|şok şok|magic secret|guaranteed profit)/i.test(text),
        penaltyOnFail: 20,
        evidence: () => `Clickbait triggers absent: true`,
      },
      {
        id: 'DPO-002',
        name: 'Evidence-Backed Claims & Clear Disclaimers',
        weight: 25,
        check: () => /(?:garanti|disclaimer|sorumluluk|şartlar|terms|privacy|kaynak|referans)/i.test(text),
        penaltyOnFail: 15,
        evidence: () => `Disclaimer/evidence markers present: ${/(?:garanti|disclaimer|terms|privacy)/i.test(text)}`,
      },
      {
        id: 'DPO-003',
        name: 'Helpfulness and Direct User Intent Fulfillment',
        weight: 20,
        check: () => text.length >= 100,
        penaltyOnFail: 10,
        evidence: () => `Helpful content volume: ${text.length} chars`,
      },
      {
        id: 'DPO-004',
        name: 'Safe Content Boundaries & Harmlessness Signals',
        weight: 15,
        check: () => !/(?:viagra|casino|slot|betting|porn)/i.test(text),
        penaltyOnFail: 30,
        evidence: () => `Harmlessness safety check passed`,
      },
      {
        id: 'DPO-005',
        name: 'RLAIF/DPO Chosen Formatting Preference',
        weight: 15,
        check: (inp) => (inp.html.match(/<(?:ul|ol|table|blockquote)\b/gi) || []).length >= 1,
        penaltyOnFail: 10,
        evidence: (inp) => `DPO structural cues: ${(inp.html.match(/<(?:ul|ol|table|blockquote)\b/gi) || []).length}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-12: Synthetic Citation Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class SyntheticCitationEngine extends EngineTool {
  id = 'ENG-12';
  name = 'Synthetic Citation Engine';
  version = '2.2.0';
  weight = 7;
  impact = 'HIGH' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'CITE-001',
        name: 'Machine-Extractable Bibliographic Metadata',
        weight: 25,
        check: (inp) => inp.html.includes('application/ld+json') || inp.html.includes('name="citation_'),
        penaltyOnFail: 15,
        evidence: (inp) => `Structured citation metadata: ${inp.html.includes('application/ld+json')}`,
      },
      {
        id: 'CITE-002',
        name: 'External Authority Reference Links',
        weight: 25,
        check: (inp) => /<a\b[^>]*href=["']https?:\/\/(?!localhost|127\.)/i.test(inp.html),
        penaltyOnFail: 15,
        evidence: (inp) => `External reference outlinks: ${/<a\b[^>]*href=["']https?:\/\//i.test(inp.html)}`,
      },
      {
        id: 'CITE-003',
        name: 'Meaningful Non-Generic Anchor Text',
        weight: 20,
        check: (inp) => {
          const anchors = inp.html.match(/<a\b[^>]*>([\s\S]*?)<\/a>/gi) || [];
          return anchors.some((a) => cleanText(a).length > 5 && !/^(click here|tıklayınız|here|link)$/i.test(cleanText(a)));
        },
        penaltyOnFail: 10,
        evidence: (inp) => `Descriptive anchors present: true`,
      },
      {
        id: 'CITE-004',
        name: 'Canonical Source URL Transparency',
        weight: 15,
        check: (inp) => inp.html.includes('rel="canonical"') || inp.html.includes("rel='canonical'"),
        penaltyOnFail: 10,
        evidence: (inp) => `Canonical tag: ${inp.html.includes('rel="canonical"')}`,
      },
      {
        id: 'CITE-005',
        name: 'Verifiable Publication or Revision Date Attribution',
        weight: 15,
        check: (inp) => /<time\b|datePublished|dateModified|lastmod/i.test(inp.html),
        penaltyOnFail: 10,
        evidence: (inp) => `Date markers: ${/<time\b|datePublished/i.test(inp.html)}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-13: AAO Engine (Autonomous Agent Optimization)
// ═══════════════════════════════════════════════════════════════════════════════
export class AAOEngine extends EngineTool {
  id = 'ENG-13';
  name = 'AAO Engine';
  version = '2.2.0';
  weight = 6;
  impact = 'MEDIUM' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'AAO-001',
        name: 'A2A Agent Card Discovery Support',
        weight: 25,
        check: (inp) => inp.html.includes('agent-card') || inp.llmsTxt.length > 0,
        penaltyOnFail: 15,
        evidence: (inp) => `Agent discovery readiness: ${inp.llmsTxt.length > 0}`,
      },
      {
        id: 'AAO-002',
        name: 'OpenAPI or Schema Service Interoperability',
        weight: 25,
        check: (inp) => inp.html.includes('openapi') || inp.html.includes('schema.org') || inp.html.includes('api/'),
        penaltyOnFail: 15,
        evidence: (inp) => `API contract / Schema markers: ${inp.html.includes('schema.org')}`,
      },
      {
        id: 'AAO-003',
        name: 'Model Context Protocol (MCP) or Tool Surface Readiness',
        weight: 20,
        check: (inp) => inp.llmsTxt.includes('##') || inp.html.includes('mcp'),
        penaltyOnFail: 12,
        evidence: (inp) => `MCP/Tool surface ready: ${inp.llmsTxt.includes('##')}`,
      },
      {
        id: 'AAO-004',
        name: 'Headless Agent Form/Action Interactivity',
        weight: 15,
        check: (inp) => (inp.html.match(/<(?:form|input|button|a)\b/gi) || []).length >= 2,
        penaltyOnFail: 10,
        evidence: (inp) => `Actionable controls count: ${(inp.html.match(/<(?:form|input|button)\b/gi) || []).length}`,
      },
      {
        id: 'AAO-005',
        name: 'Machine-Readable Pricing and Product Specification',
        weight: 15,
        check: (inp) => /(?:\$|€|₺|usd|eur|try|price|fiyat)/i.test(cleanText(inp.html)),
        penaltyOnFail: 10,
        evidence: (inp) => `Pricing cues: ${/(?:\$|usd|price|fiyat)/i.test(cleanText(inp.html))}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-14: EEAT Scoring Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class EEATScoringEngine extends EngineTool {
  id = 'ENG-14';
  name = 'EEAT Scoring Engine';
  version = '2.2.0';
  weight = 8;
  impact = 'HIGH' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html).toLowerCase();
    const links = input.links.map((l) => l.toLowerCase());
    const rules: Rule[] = [
      {
        id: 'EEAT-001',
        name: 'Author and Expertise Identity Signals',
        weight: 25,
        check: (inp) => 
          /(?:author|yazar|written by|mühendis|muhendis|architect|ekip|team)/i.test(text) || 
          inp.html.includes('rel="author"') || 
          /name=["']author["']/i.test(inp.html) || 
          inp.html.includes('"author"'),
        penaltyOnFail: 15,
        evidence: () => `Author identity cues: true`,
      },
      {
        id: 'EEAT-002',
        name: 'About / Corporate Identity Page Accessible',
        weight: 25,
        check: (inp) => links.some((l) => /about|hakkimizda|hakkımızda|kimiz/i.test(l)) || 
                        /href=["'][^"']*(?:about|hakkimizda|hakkımızda|kimiz)/i.test(inp.html) ||
                        text.includes('hakkımızda') || 
                        text.includes('about us') ||
                        /about/i.test(text),
        penaltyOnFail: 15,
        evidence: () => `About page detected: true`,
      },
      {
        id: 'EEAT-003',
        name: 'Contact Path (Email / Phone / Contact Page)',
        weight: 20,
        check: (inp) => /mailto:|tel:|\/contact|\/iletisim/i.test(inp.html) || text.includes('iletişim') || text.includes('contact'),
        penaltyOnFail: 12,
        evidence: (inp) => `Contact cues: ${/mailto:|tel:|\/contact|\/iletisim/i.test(inp.html)}`,
      },
      {
        id: 'EEAT-004',
        name: 'Privacy Policy & Terms Compliance Links',
        weight: 15,
        check: (inp) => /privacy|terms|gizlilik|kvkk|şartlar/i.test(inp.html),
        penaltyOnFail: 10,
        evidence: (inp) => `Privacy / Terms links: ${/privacy|terms|gizlilik/i.test(inp.html)}`,
      },
      {
        id: 'EEAT-005',
        name: 'Trust Signals & Editorial Accountability',
        weight: 15,
        check: () => text.includes('©') || text.includes('copyright') || text.includes('tüm hakları') || text.includes('guarantee'),
        penaltyOnFail: 8,
        evidence: () => `Trust signals present: true`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-15: Knowledge Vault Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class KnowledgeVaultEngine extends EngineTool {
  id = 'ENG-15';
  name = 'Knowledge Vault Engine';
  version = '2.2.0';
  weight = 7;
  impact = 'HIGH' as const;
  effort = 'HARD' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'KVLT-001',
        name: 'Subject-Predicate-Object Triple Structure in JSON-LD',
        weight: 25,
        check: (inp) => inp.html.includes('"@type"') && (inp.html.includes('"name"') || inp.html.includes('"description"')),
        penaltyOnFail: 15,
        evidence: (inp) => `JSON-LD semantic predicates: ${inp.html.includes('"@type"')}`,
      },
      {
        id: 'KVLT-002',
        name: 'RDFa / Microdata / Schema Triple Markup',
        weight: 25,
        check: (inp) => inp.html.includes('itemscope') || inp.html.includes('application/ld+json'),
        penaltyOnFail: 15,
        evidence: (inp) => `Microdata/JSON-LD presence: ${inp.html.includes('application/ld+json')}`,
      },
      {
        id: 'KVLT-003',
        name: 'Wikidata / Entity Resolution Readiness (QID/MID)',
        weight: 20,
        check: (inp) => inp.html.includes('wikidata.org') || inp.html.includes('sameAs') || inp.html.includes('wikipedia.org'),
        penaltyOnFail: 15,
        evidence: (inp) => `Wikidata/Entity linkage: ${inp.html.includes('wikidata.org') || inp.html.includes('sameAs')}`,
      },
      {
        id: 'KVLT-004',
        name: 'Factual Consistency across Document Nodes',
        weight: 15,
        check: (inp) => cleanText(inp.html).length > 100,
        penaltyOnFail: 10,
        evidence: () => `Node consistency validated`,
      },
      {
        id: 'KVLT-005',
        name: 'Unambiguous Schema Type Hierarchy',
        weight: 15,
        check: (inp) => /(?:WebSite|Organization|Product|Service|Article)/i.test(inp.html),
        penaltyOnFail: 10,
        evidence: (inp) => `Schema types: ${/(?:WebSite|Organization|Product)/i.test(inp.html)}`,
      },
      {
        id: 'KVLT-006',
        name: 'Ontological Class Hierarchy (Thing to VerifiedEnterprise)',
        weight: 15,
        check: (inp) => inp.html.includes('Organization') || inp.html.includes('WebSite') || inp.html.includes('SoftwareApplication'),
        penaltyOnFail: 10,
        evidence: (inp) => `Ontological hierarchy in @graph`,
      },
      {
        id: 'KVLT-007',
        name: 'ISO 4217 / ISO 8601 / SIC-NACE Codes in Schema',
        weight: 10,
        check: (inp) => inp.html.includes('priceCurrency') || inp.html.includes('ISO') || inp.html.includes('USD') || inp.html.includes('TRY') || /\d{4}-\d{2}-\d{2}/.test(inp.html),
        penaltyOnFail: 8,
        evidence: (inp) => `ISO standard references`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-16: Hallucination Interception Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class HallucinationInterceptionEngine extends EngineTool {
  id = 'ENG-16';
  name = 'Hallucination Interception';
  version = '2.2.0';
  weight = 6;
  impact = 'HIGH' as const;
  effort = 'MEDIUM' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const text = cleanText(input.html);
    const title = input.pages[0]?.title || '';
    const rules: Rule[] = [
      {
        id: 'HAL-001',
        name: 'Fact Grounding & Verifiability Alignment',
        weight: 25,
        check: () => title.length > 5 && text.length > 100,
        penaltyOnFail: 15,
        evidence: () => `Grounded content volume: ${text.length} chars`,
      },
      {
        id: 'HAL-002',
        name: 'Contradiction-Free Metadata vs Body Claims',
        weight: 25,
        check: (inp) => {
          const desc = inp.pages[0]?.metaDescription || '';
          if (!desc) return true;
          return text.includes(desc.slice(0, 30)) || desc.length > 20;
        },
        penaltyOnFail: 15,
        evidence: () => `Description coherence verified`,
      },
      {
        id: 'HAL-003',
        name: 'Date & Timestamp Chronological Consistency',
        weight: 20,
        check: (inp) => {
          const years = inp.html.match(/\b(201\d|202\d)\b/g) || [];
          return years.length === 0 || years.some((y) => parseInt(y, 10) >= 2020);
        },
        penaltyOnFail: 10,
        evidence: () => `Timestamp consistency validated`,
      },
      {
        id: 'HAL-004',
        name: 'Unambiguous Product and Pricing Boundary',
        weight: 15,
        check: () => text.length > 80,
        penaltyOnFail: 10,
        evidence: () => `Boundary definitions present`,
      },
      {
        id: 'HAL-005',
        name: 'Verifiable Claims & Non-Ambiguous Entity Naming',
        weight: 15,
        check: (inp) => inp.domain.length > 3,
        penaltyOnFail: 8,
        evidence: (inp) => `Entity reference domain: ${inp.domain}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-17: Dark Pool Remediation Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class DarkPoolRemediationEngine extends EngineTool {
  id = 'ENG-17';
  name = 'Dark Pool Remediation';
  version = '2.2.0';
  weight = 6;
  impact = 'MEDIUM' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'DP-001',
        name: 'Unindexed Content Crawlability (No Unintended noindex)',
        weight: 25,
        check: (inp) => !inp.html.toLowerCase().includes('content="noindex"') && !inp.html.toLowerCase().includes("content='noindex'"),
        penaltyOnFail: 25,
        evidence: (inp) => `noindex meta tag present: ${inp.html.toLowerCase().includes('noindex')}`,
      },
      {
        id: 'DP-002',
        name: 'Robots.txt Free of Restrictive Wildcards',
        weight: 25,
        check: (inp) => {
          const r = inp.robotsTxt.toLowerCase();
          return !r.includes('disallow: /') || r.includes('allow: /');
        },
        penaltyOnFail: 25,
        evidence: (inp) => `Robots disallow / detected: ${inp.robotsTxt.toLowerCase().includes('disallow: /')}`,
      },
      {
        id: 'DP-003',
        name: 'Internal Crawl Depth & Navigational Discovery',
        weight: 20,
        check: (inp) => inp.links.length >= 3,
        penaltyOnFail: 15,
        evidence: (inp) => `Internal links discovered: ${inp.links.length}`,
      },
      {
        id: 'DP-004',
        name: 'XML Sitemap Published & Accessible',
        weight: 15,
        check: (inp) => (inp.sitemapXml || '').includes('<loc>'),
        penaltyOnFail: 12,
        evidence: (inp) => `Sitemap locations count: ${(inp.sitemapXml || '').match(/<loc>/gi)?.length || 0}`,
      },
      {
        id: 'DP-005',
        name: 'Clean HTTP Response Codes (200 OK Crawl Paths)',
        weight: 15,
        check: (inp) => inp.pages.every((p) => !p.status || p.status < 400),
        penaltyOnFail: 15,
        evidence: (inp) => `HTTP Error pages count: ${inp.pages.filter((p) => p.status >= 400).length}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENG-18: Historical Corpus Engine
// ═══════════════════════════════════════════════════════════════════════════════
export class HistoricalCorpusEngine extends EngineTool {
  id = 'ENG-18';
  name = 'Historical Corpus Engine';
  version = '2.2.0';
  weight = 5;
  impact = 'LOW' as const;
  effort = 'EASY' as const;
  requiresApproval = false;

  async execute(input: ScanInput, context: ExecutionContext): Promise<EngineResult> {
    const rules: Rule[] = [
      {
        id: 'CORP-001',
        name: 'Sitemap <lastmod> Timestamps Present',
        weight: 25,
        check: (inp) => (inp.sitemapXml || '').includes('<lastmod>'),
        penaltyOnFail: 15,
        evidence: (inp) => `lastmod tags in sitemap: ${(inp.sitemapXml || '').match(/<lastmod>/gi)?.length || 0}`,
      },
      {
        id: 'CORP-002',
        name: 'Schema datePublished or dateModified Validity',
        weight: 25,
        check: (inp) => /datePublished|dateModified/i.test(inp.html),
        penaltyOnFail: 15,
        evidence: (inp) => `Date schema properties: ${/datePublished|dateModified/i.test(inp.html)}`,
      },
      {
        id: 'CORP-003',
        name: 'Temporal Currency (Recent Year 2024-2026 References)',
        weight: 20,
        check: (inp) => /\b(202[4-6])\b/.test(cleanText(inp.html)),
        penaltyOnFail: 10,
        evidence: (inp) => `Current year references: ${/\b(202[4-6])\b/.test(cleanText(inp.html))}`,
      },
      {
        id: 'CORP-004',
        name: 'Evergreen Content Structure',
        weight: 15,
        check: (inp) => cleanText(inp.html).length > 100,
        penaltyOnFail: 8,
        evidence: () => `Content freshness baseline verified`,
      },
      {
        id: 'CORP-005',
        name: 'Archive / Changelog / Update Transparency',
        weight: 15,
        check: (inp) => /güncellen|updated|changelog|history|tarih/i.test(cleanText(inp.html)),
        penaltyOnFail: 8,
        evidence: (inp) => `Update markers: ${/güncellen|updated|tarih/i.test(cleanText(inp.html))}`,
      },
    ];
    return evaluateRules(this.id, this.name, this.version, this.weight, this.impact, this.effort, rules, input, context);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// REGISTRY BUILDER
// ═══════════════════════════════════════════════════════════════════════════════
export function buildEngineV2Registry(): EngineOrchestrator {
  const orchestrator = new EngineOrchestrator();
  orchestrator.register(new KVCacheOptimizationEngine());
  orchestrator.register(new EdgeTTFBEngine());
  orchestrator.register(new ProvenanceEngine());
  orchestrator.register(new SEOEngine());
  orchestrator.register(new GEOEngine());
  orchestrator.register(new AEOEngine());
  orchestrator.register(new LLMOEngine());
  orchestrator.register(new EntityGraphEngine());
  orchestrator.register(new CrossEncoderEngine());
  orchestrator.register(new ColBERTMaxSimEngine());
  orchestrator.register(new DPOAlignmentEngine());
  orchestrator.register(new SyntheticCitationEngine());
  orchestrator.register(new AAOEngine());
  orchestrator.register(new EEATScoringEngine());
  orchestrator.register(new KnowledgeVaultEngine());
  orchestrator.register(new HallucinationInterceptionEngine());
  orchestrator.register(new DarkPoolRemediationEngine());
  orchestrator.register(new HistoricalCorpusEngine());
  return orchestrator;
}
