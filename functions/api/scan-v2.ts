/**
 * V2 Deterministic Scan API Endpoint
 * Executes 18 Backend Engines with DLQ Recovery & Epistemic Boundaries
 */

import { buildEngineV2Registry } from '../lib/engine-v2/03-engine-v2-engines.ts';
import type { ScanInput } from '../lib/engine-v2/02-engine-v2-core.ts';
import { runFriendlyScan } from '../lib/scan-request.ts';
import { createNDJSONStream, executeV2Scan } from '../lib/engine-v2/04-engine-v2-api.ts';
import { runEnterpriseIntelligenceAudit } from '../lib/enterprise-intelligence-v4.ts';

export async function probeWikidataEntity(domain: string): Promise<{
  qid: string | null;
  label: string | null;
  status: 'VERIFIED' | 'NOT_FOUND' | 'TIMEOUT_FALLBACK';
}> {
  try {
    const brand = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\.[a-z]{2,}.*$/, '');
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(brand)}&language=en&format=json&limit=1`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'HTMLandHTML-Enterprise-Bot/4.0' },
      signal: AbortSignal.timeout(1800),
    });
    if (!res.ok) return { qid: null, label: null, status: 'NOT_FOUND' };
    const data = (await res.json()) as any;
    if (data?.search && data.search.length > 0) {
      return {
        qid: data.search[0].id || null,
        label: data.search[0].label || null,
        status: 'VERIFIED',
      };
    }
    return { qid: null, label: null, status: 'NOT_FOUND' };
  } catch {
    return { qid: null, label: null, status: 'TIMEOUT_FALLBACK' };
  }
}

export async function probeCommonCrawlCorpus(domain: string): Promise<{
  captured: boolean;
  recordsCount: number;
  status: 'VERIFIED' | 'NOT_INDEXED' | 'TIMEOUT_FALLBACK';
}> {
  try {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
    const url = `https://index.commoncrawl.org/CC-MAIN-2024-51-index?url=${encodeURIComponent(cleanDomain)}&output=json&limit=1`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(1800),
    });
    if (!res.ok) return { captured: false, recordsCount: 0, status: 'NOT_INDEXED' };
    const text = await res.text();
    const captured = text.trim().length > 0 && text.includes('filename');
    return {
      captured,
      recordsCount: captured ? 1 : 0,
      status: captured ? 'VERIFIED' : 'NOT_INDEXED',
    };
  } catch {
    return { captured: false, recordsCount: 0, status: 'TIMEOUT_FALLBACK' };
  }
}

export async function gatherScanInput(domain: string): Promise<ScanInput> {
  const baseResult = await runFriendlyScan(domain);
  let homeHtml = '';
  const headers: Record<string, string> = {};
  let robotsTxt = '';
  let sitemapXml = '';
  let llmsTxt = '';
  let wikidataProbe: { qid: string | null; label: string | null; status: any } = {
    qid: null,
    label: null,
    status: 'NOT_MEASURED',
  };
  let commonCrawlProbe: { captured: boolean; recordsCount: number; status: any } = {
    captured: false,
    recordsCount: 0,
    status: 'NOT_MEASURED',
  };

  const [targetRes, robRes, smRes, llRes, wikiRes, ccRes] = await Promise.allSettled([
    fetch(baseResult.url, {
      headers: { 'user-agent': 'HTMLandHTML-Validator/2.0' },
      signal: AbortSignal.timeout(5000),
    }).then(async (r) => {
      const text = await r.text();
      const hdrs: Record<string, string> = {};
      r.headers.forEach((val, key) => {
        hdrs[key.toLowerCase()] = val;
      });
      return { html: text, headers: hdrs };
    }),
    fetch(new URL('/robots.txt', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    }).then((r) => (r.ok ? r.text() : '')),
    fetch(new URL('/sitemap.xml', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    }).then((r) => (r.ok ? r.text() : '')),
    fetch(new URL('/llms.txt', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    }).then((r) => (r.ok ? r.text() : '')),
    probeWikidataEntity(baseResult.domain),
    probeCommonCrawlCorpus(baseResult.domain),
  ]);

  if (targetRes.status === 'fulfilled' && targetRes.value) {
    homeHtml = targetRes.value.html;
    Object.assign(headers, targetRes.value.headers);
  }
  if (robRes.status === 'fulfilled') robotsTxt = robRes.value;
  if (smRes.status === 'fulfilled') sitemapXml = smRes.value;
  if (llRes.status === 'fulfilled') llmsTxt = llRes.value;
  if (wikiRes.status === 'fulfilled') wikidataProbe = wikiRes.value;
  if (ccRes.status === 'fulfilled') commonCrawlProbe = ccRes.value;

  if (!homeHtml) {
    homeHtml = `<!doctype html><html><head><title>${baseResult.domain}</title></head><body><h1>${baseResult.domain}</h1></body></html>`;
  }

  const titleMatch = homeHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDesc =
    homeHtml.match(/<meta[^>]+(?:name|property)=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || '';
  const h1s = (homeHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || []).map((h) => h.replace(/<[^>]+>/g, '').trim());
  const h2s = (homeHtml.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi) || []).map((h) => h.replace(/<[^>]+>/g, '').trim());
  const schemas = (
    homeHtml.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || []
  ).map((s) => s.replace(/<[^>]+>/g, '').trim());

  return {
    domain: baseResult.domain,
    html: homeHtml,
    headers,
    robotsTxt,
    sitemapXml,
    llmsTxt,
    wikidata: wikidataProbe,
    commonCrawl: commonCrawlProbe,
    pages: [
      {
        url: baseResult.url,
        title: titleMatch ? titleMatch[1].trim() : baseResult.domain,
        metaDescription: metaDesc,
        h1: h1s,
        h2: h2s,
        html: homeHtml,
        schema: schemas,
        canonical: baseResult.url,
      },
    ],
    links: [],
  };
}


export async function onRequestPost(context: any): Promise<Response> {
  const body = await context.request.json().catch(() => ({}));
  const rawDomain = body?.domain;
  if (!rawDomain || typeof rawDomain !== 'string' || !rawDomain.trim()) {
    return Response.json({ error: 'Domain required' }, { status: 400 });
  }

  const cleanDomain = rawDomain.trim();
  const acceptHeader = context.request.headers?.get('accept') || '';
  const isStreaming = acceptHeader.includes('application/x-ndjson') || Boolean(body.streaming || body.stream);

  const isPrivate = /^(https?:\/\/)?(localhost|127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/i.test(cleanDomain);
  if (isPrivate) {
    const scanId = (crypto as any).randomUUID ? (crypto as any).randomUUID() : `scan-${Date.now()}`;
    const fallbackPayload = {
      scanId,
      overallScore: 0,
      overallStatus: 'NOT_MEASURED',
      engines: {},
      dlq: [
        {
          scanId,
          engineId: 'NETWORK_GUARD',
          error: { code: 'ERR_PRIVATE_NETWORK', message: 'Private or local targets are not allowed' },
          inputSnapshot: { domain: cleanDomain },
          retryCount: 0,
          timestamp: Date.now(),
        },
      ],
    };

    if (isStreaming) {
      const stream = createNDJSONStream(async () => fallbackPayload);
      return new Response(stream, {
        headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' },
      });
    }

    return new Response(
      JSON.stringify(fallbackPayload),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const input = await gatherScanInput(cleanDomain);
    const externalProbes = {
      wikidata: input.wikidata,
      commonCrawl: input.commonCrawl,
    };

    if (isStreaming) {
      const stream = createNDJSONStream(async (emit) => {
        const scanRes = await executeV2Scan(input, emit);
        let eaiV4 = null;
        try {
          eaiV4 = runEnterpriseIntelligenceAudit(cleanDomain, undefined, 'SAAS_B2B', {
            externalProbes,
          });
        } catch {}
        return {
          ...scanRes,
          externalProbes,
          eaiV4,
        };
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Cache-Control': 'no-store',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    const result = await executeV2Scan(input);
    let eaiV4 = null;
    try {
      eaiV4 = runEnterpriseIntelligenceAudit(cleanDomain, undefined, 'SAAS_B2B', {
        externalProbes,
      });
    } catch {}

    const enriched = {
      ...result,
      externalProbes,
      eaiV4,
    };

    return new Response(
      JSON.stringify(enriched),
      { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    const scanId = (crypto as any).randomUUID ? (crypto as any).randomUUID() : `scan-${Date.now()}`;
    const errPayload = {
      scanId,
      overallScore: 0,
      overallStatus: 'NOT_MEASURED',
      engines: {},
      dlq: [
        {
          scanId,
          engineId: 'GLOBAL_ORCHESTRATOR',
          error: { code: 'ERR_SCAN_FAILED', message: err?.message || 'Scan failed' },
          inputSnapshot: { domain: cleanDomain },
          retryCount: 0,
          timestamp: Date.now(),
        },
      ],
    };

    if (isStreaming) {
      const stream = createNDJSONStream(async () => errPayload);
      return new Response(stream, {
        headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' },
      });
    }

    return new Response(
      JSON.stringify(errPayload),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  }
}

export const onRequestGet = () => Response.json({ error: 'POST only' }, { status: 405 });
