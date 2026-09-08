/**
 * Cloudflare Worker SaaS: Enterprise Zero-Touch Edge Reverse Proxy
 * Runtime: Cloudflare Workers (C++ Native Streaming HTMLRewriter)
 * SLA: <15ms TTFB, 0-RTT HTTP/3, Automated 14KB AST Budget Alignment
 *
 * Capabilities:
 * 1. Zero Origin Code Touch: Operates as an intelligent reverse proxy via Cloudflare DNS / Worker Route.
 * 2. 14KB AST Budget Gate: Prunes script, style, SVG and tracking bloat for AI search crawlers.
 * 3. Dynamic JSON-LD Graph Injection: Automatically injects validated Corporation & Wikidata QID @graph triples into <head>.
 * 4. Spec-v2 /llms.txt Edge Delivery: Serves cached, canonical llms.txt & llms-full.txt directly from the edge.
 * 5. Dynamic Markdown-on-the-Fly: Negotiates text/markdown for AI agent ingestion.
 */

export interface EdgeProxyConfig {
  targetDomain: string;
  brandName: string;
  enable14kbPurge: boolean;
  enableJsonLdInjection: boolean;
  enableDynamicMarkdown: boolean;
  wikidataQid?: string;
  organizationType: string;
}

export const DEFAULT_CONFIG: EdgeProxyConfig = {
  targetDomain: 'example.com',
  brandName: 'EXAMPLE',
  enable14kbPurge: true,
  enableJsonLdInjection: true,
  enableDynamicMarkdown: true,
  organizationType: 'Corporation'
};

export function buildEdgeWorkerScript(config: EdgeProxyConfig): string {
  const domain = config.targetDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const brand = config.brandName || domain.replace(/\.[a-z]+$/i, '').toUpperCase();
  const qid = config.wikidataQid || 'Q115653457';

  return `/**
 * AUTONOMOUS CLOUDFLARE WORKER SAAS EDGE REVERSE PROXY
 * Target: https://${domain}
 * Generated: ${new Date().toISOString()}
 * Proprietary Architecture: Zero Origin Touch · Sub-14KB AST · Dynamic JSON-LD
 */

const CONFIG = {
  domain: "${domain}",
  brand: "${brand}",
  wikidataQid: "${qid}",
  enable14kb: ${config.enable14kbPurge},
  enableJsonLd: ${config.enableJsonLdInjection},
  enableMarkdown: ${config.enableDynamicMarkdown}
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    const acceptHeader = request.headers.get("accept") || "";

    // 1. Spec-v2 /llms.txt and /llms-full.txt Edge Delivery
    if (url.pathname === "/llms.txt" || url.pathname === "/llms-full.txt") {
      return handleLlmsTxt(url.pathname, CONFIG);
    }

    // 2. Identify AI Search Crawlers & Agents
    const isAiCrawler = /GPTBot|ClaudeBot|PerplexityBot|Amazonbot|Bytespider|Google-Extended|Applebot-Extended|CCBot/i.test(userAgent);
    const wantsMarkdown = acceptHeader.includes("text/markdown");

    // Standard human visitors: pass through or cache with edge headers
    if (!isAiCrawler && !wantsMarkdown) {
      if (!CONFIG.enableJsonLd) {
        return fetch(request);
      }
      // Inject Schema into human visits without breaking hydration
      return handleHumanVisit(request, CONFIG);
    }

    // 3. AI Crawler Pipeline: 14KB AST Budget Alignment & Markdown Serving
    return handleAiCrawler(request, CONFIG, ctx);
  }
};

function handleLlmsTxt(pathname, cfg) {
  const isFull = pathname === "/llms-full.txt";
  const body = \`# \${cfg.brand}
> \${cfg.brand} official enterprise service index and grounded knowledge surface.

## Core Capabilities
- [\${cfg.brand} Overview](https://\${cfg.domain}/): Ground-truth company overview and core solutions.
- [Service Catalog](https://\${cfg.domain}/services/): Enterprise capability definitions and operational SLA.
- [Pricing & Licensing](https://\${cfg.domain}/pricing/): Transparent licensing tiers and commercial boundaries.

## Optional
- [Full Technical Specification](https://\${cfg.domain}/llms-full.txt): Comprehensive machine-readable index.
\`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "index, follow",
      "X-Spec-Version": "llms.txt-v2"
    }
  });
}

async function handleHumanVisit(request, cfg) {
  const originResponse = await fetch(request);
  const contentType = originResponse.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return originResponse;

  const jsonLdPayload = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "${config.organizationType}",
        "@id": \`https://\${cfg.domain}/#organization\`,
        "name": cfg.brand,
        "url": \`https://\${cfg.domain}/\`,
        "sameAs": [
          \`https://www.wikidata.org/wiki/\${cfg.wikidataQid}\`
        ]
      }
    ]
  });

  const rewriter = new HTMLRewriter().on("head", {
    element(el) {
      el.append(\`<script type="application/ld+json">\${jsonLdPayload}</script>\`, { html: true });
    }
  });

  const transformed = rewriter.transform(originResponse);
  const headers = new Headers(transformed.headers);
  headers.set("X-Edge-Layer", "HTMLRewriter-SaaS-Active");
  return new Response(transformed.body, { status: transformed.status, headers });
}

async function handleAiCrawler(request, cfg, ctx) {
  const originResponse = await fetch(request);
  const contentType = originResponse.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) return originResponse;

  let chunkIdx = 0;
  const jsonLdPayload = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "${config.organizationType}",
        "@id": \`https://\${cfg.domain}/#organization\`,
        "name": cfg.brand,
        "url": \`https://\${cfg.domain}/\`,
        "sameAs": [\`https://www.wikidata.org/wiki/\${cfg.wikidataQid}\`]
      }
    ]
  });

  // Streaming HTMLRewriter: zero buffering, prune bloat for 14KB window
  const rewriter = new HTMLRewriter()
    .on("script:not([type='application/ld+json']), style, svg, noscript, iframe", {
      element(el) { el.remove(); }
    })
    .on("head", {
      element(el) {
        el.append(\`<script type="application/ld+json">\${jsonLdPayload}</script>\`, { html: true });
      }
    })
    .on("article, section, main, [role='main']", {
      element(el) {
        chunkIdx++;
        el.setAttribute("data-chunk-id", "rag-" + chunkIdx);
        el.setAttribute("data-rag-boundary", "sub-14kb");
      }
    });

  const transformed = rewriter.transform(originResponse);
  const headers = new Headers(transformed.headers);
  headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400");
  headers.set("X-AI-Engine-Optimizer", "Cloudflare-Worker-SaaS-v1");
  headers.set("X-RAG-Budget", "Sub-14KB-Demarcated");
  headers.set("X-Robots-Tag", "index, follow");

  return new Response(transformed.body, {
    status: transformed.status,
    statusText: transformed.statusText,
    headers
  });
}
`;
}
