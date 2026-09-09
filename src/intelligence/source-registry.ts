/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Source Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 2.2 & Section 40)
 */

import type { EvidenceClass } from './evidence-classes';

export interface ExternalSourceRecord {
  id: string;
  class: EvidenceClass;
  publisher: string;
  title: string;
  url: string;
  appliesTo: string[];
  lastVerified: string;
  maxAgeDays: number;
}

export const CANONICAL_SOURCES: ExternalSourceRecord[] = [
  {
    id: 'RFC9309',
    class: 'OFFICIAL_STANDARD',
    publisher: 'IETF / RFC Editor',
    title: 'Robots Exclusion Protocol',
    url: 'https://www.rfc-editor.org/rfc/rfc9309.html',
    appliesTo: ['crawl', 'ai', 'robots', 'policy'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'RFC6797',
    class: 'OFFICIAL_STANDARD',
    publisher: 'IETF / RFC Editor',
    title: 'HTTP Strict Transport Security (HSTS)',
    url: 'https://www.rfc-editor.org/rfc/rfc6797.html',
    appliesTo: ['security', 'technical', 'trust'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'RFC6596',
    class: 'OFFICIAL_STANDARD',
    publisher: 'IETF / RFC Editor',
    title: 'The Canonical Link Relation',
    url: 'https://www.rfc-editor.org/rfc/rfc6596.html',
    appliesTo: ['technical', 'crawl', 'canonical'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'OPENAI-PUBLISHERS',
    class: 'OFFICIAL_VENDOR',
    publisher: 'OpenAI',
    title: 'Publishers and Developers FAQ & Crawler Guidance (OAI-SearchBot, GPTBot)',
    url: 'https://help.openai.com/en/articles/12627856-publishers-and-developers-faq',
    appliesTo: ['ai', 'crawl', 'search', 'oai-searchbot', 'gptbot'],
    lastVerified: '2026-09-08',
    maxAgeDays: 45,
  },
  {
    id: 'ANTHROPIC-CRAWLERS',
    class: 'OFFICIAL_VENDOR',
    publisher: 'Anthropic',
    title: 'Anthropic web crawlers and site-owner controls (ClaudeBot, Claude-User, Claude-SearchBot)',
    url: 'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler',
    appliesTo: ['ai', 'crawl', 'claudebot', 'claude-user', 'claude-searchbot'],
    lastVerified: '2026-09-08',
    maxAgeDays: 45,
  },
  {
    id: 'GOOGLE-COMMON-CRAWLERS',
    class: 'OFFICIAL_VENDOR',
    publisher: 'Google Search Central',
    title: "Google's common crawlers (Googlebot, Google-Extended, Storebot)",
    url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers',
    appliesTo: ['crawl', 'ai', 'googlebot', 'google-extended'],
    lastVerified: '2026-09-08',
    maxAgeDays: 45,
  },
  {
    id: 'PERPLEXITY-ROBOTS',
    class: 'OFFICIAL_VENDOR',
    publisher: 'Perplexity',
    title: 'How does Perplexity follow robots.txt & PerplexityBot / Perplexity-User specifications',
    url: 'https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt',
    appliesTo: ['ai', 'crawl', 'perplexitybot'],
    lastVerified: '2026-09-08',
    maxAgeDays: 45,
  },
  {
    id: 'LLMS-TXT-V2',
    class: 'PROPOSAL',
    publisher: 'llmstxt.org / Jeremy Howard',
    title: 'The /llms.txt proposal for website summary contexts, v2',
    url: 'https://llmstxt.org/',
    appliesTo: ['llms', 'agent', 'context'],
    lastVerified: '2026-09-08',
    maxAgeDays: 60,
  },
  {
    id: 'A2A-SPEC',
    class: 'PROPOSAL',
    publisher: 'A2A Protocol Working Group',
    title: 'Agent-to-Agent (A2A) Protocol Specification & Agent Card Discovery',
    url: 'https://a2a-protocol.org/latest/specification/',
    appliesTo: ['agent', 'a2a', 'agent-card'],
    lastVerified: '2026-09-08',
    maxAgeDays: 60,
  },
  {
    id: 'MCP-SPEC',
    class: 'OFFICIAL_STANDARD',
    publisher: 'Model Context Protocol / Anthropic',
    title: 'Model Context Protocol (MCP) Architecture & JSON-RPC Transport Specification',
    url: 'https://modelcontextprotocol.io/specification/',
    appliesTo: ['agent', 'mcp', 'tools', 'resources'],
    lastVerified: '2026-09-08',
    maxAgeDays: 60,
  },
  {
    id: 'C2PA-SPEC',
    class: 'OFFICIAL_STANDARD',
    publisher: 'Coalition for Content Provenance and Authenticity (C2PA)',
    title: 'C2PA Technical Specifications & Content Credentials Standard',
    url: 'https://spec.c2pa.org/specifications/',
    appliesTo: ['provenance', 'c2pa', 'credentials', 'security'],
    lastVerified: '2026-09-08',
    maxAgeDays: 90,
  },
  {
    id: 'EU-TDM-DIR2019-790',
    class: 'OFFICIAL_STANDARD',
    publisher: 'European Union',
    title: 'Directive (EU) 2019/790 Article 4 — Exception or limitation for text and data mining',
    url: 'https://eur-lex.europa.eu/eli/dir/2019/790',
    appliesTo: ['governance', 'tdm', 'legal', 'copyright'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'WCAG22',
    class: 'OFFICIAL_STANDARD',
    publisher: 'W3C',
    title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
    url: 'https://www.w3.org/TR/WCAG22/',
    appliesTo: ['accessibility', 'render', 'semantics'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'OPENAPI31',
    class: 'OFFICIAL_STANDARD',
    publisher: 'OpenAPI Initiative',
    title: 'OpenAPI Specification 3.1.0',
    url: 'https://spec.openapis.org/oas/v3.1.0.html',
    appliesTo: ['agent', 'api', 'openapi'],
    lastVerified: '2026-09-08',
    maxAgeDays: 180,
  },
  {
    id: 'SCHEMA-ORG',
    class: 'OFFICIAL_STANDARD',
    publisher: 'Schema.org Consortium / W3C Community Group',
    title: 'Schema.org Data Model & Vocabulary Specification',
    url: 'https://schema.org/',
    appliesTo: ['schema', 'knowledge-graph', 'entity'],
    lastVerified: '2026-09-08',
    maxAgeDays: 90,
  },
  {
    id: 'GOOGLE-GENAI-PERFORMANCE-2026',
    class: 'OFFICIAL_VENDOR',
    publisher: 'Google Search Central',
    title: 'Introducing Search Generative AI performance reports in Search Console',
    url: 'https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports',
    appliesTo: ['seo', 'geo', 'ai', 'measurement', 'search-console'],
    lastVerified: '2026-09-09',
    maxAgeDays: 45,
  },
];

export function getSourceById(id: string): ExternalSourceRecord | undefined {
  return CANONICAL_SOURCES.find((s) => s.id === id);
}

export function isSourceStale(source: ExternalSourceRecord, now = new Date()): boolean {
  const verified = new Date(source.lastVerified).getTime();
  const diffDays = (now.getTime() - verified) / (1000 * 60 * 60 * 24);
  return diffDays > source.maxAgeDays;
}
