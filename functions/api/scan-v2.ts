/**
 * V2 Deterministic Scan API Endpoint
 * Executes 18 Backend Engines with DLQ Recovery & Epistemic Boundaries
 */

import { buildEngineV2Registry } from '../lib/engine-v2/03-engine-v2-engines.ts';
import type { ScanInput } from '../lib/engine-v2/02-engine-v2-core.ts';
import { runFriendlyScan } from '../lib/scan-request.ts';
import { createNDJSONStream, executeV2Scan } from '../lib/engine-v2/04-engine-v2-api.ts';



export async function gatherScanInput(domain: string): Promise<ScanInput> {
  const baseResult = await runFriendlyScan(domain);
  let homeHtml = '';
  const headers: Record<string, string> = {};
  let robotsTxt = '';
  let sitemapXml = '';
  let llmsTxt = '';

  try {
    const r = await fetch(baseResult.url, {
      headers: { 'user-agent': 'HTMLandHTML-Validator/2.0' },
      signal: AbortSignal.timeout(5000),
    });
    homeHtml = await r.text();
    r.headers.forEach((val, key) => {
      headers[key.toLowerCase()] = val;
    });
  } catch {}

  try {
    const rob = await fetch(new URL('/robots.txt', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    });
    if (rob.ok) robotsTxt = await rob.text();
  } catch {}

  try {
    const sm = await fetch(new URL('/sitemap.xml', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    });
    if (sm.ok) sitemapXml = await sm.text();
  } catch {}

  try {
    const ll = await fetch(new URL('/llms.txt', baseResult.url).href, {
      signal: AbortSignal.timeout(3000),
    });
    if (ll.ok) llmsTxt = await ll.text();
  } catch {}

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

    if (isStreaming) {
      const stream = createNDJSONStream((emit) => executeV2Scan(input, emit));
      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Cache-Control': 'no-store',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    const result = await executeV2Scan(input);
    return new Response(
      JSON.stringify(result),
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
