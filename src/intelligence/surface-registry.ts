/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Surface Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 4.1)
 */

export type MeasurementMethod = 'PROVIDER_API' | 'COMPLIANT_BROWSER' | 'HITL' | 'NOT_MEASURED';

export interface AISurfaceRecord {
  surfaceId: string;
  name: string;
  provider: string;
  model: string;
  measurementMethod: MeasurementMethod;
  isActive: boolean;
  citationCapable: boolean;
  recommendationCapable: boolean;
  complianceDisclosure: string;
}

export const CANONICAL_SURFACES: AISurfaceRecord[] = [
  {
    surfaceId: 'chatgpt-search',
    name: 'ChatGPT Search Surface',
    provider: 'OpenAI',
    model: 'gpt-5.6-luna',
    measurementMethod: 'PROVIDER_API',
    isActive: true,
    citationCapable: true,
    recommendationCapable: true,
    complianceDisclosure: 'Measured via OpenAI Responses API with official web_search tool integration.',
  },
  {
    surfaceId: 'perplexity-sonar',
    name: 'Perplexity Sonar Search Surface',
    provider: 'Perplexity',
    model: 'sonar-pro',
    measurementMethod: 'PROVIDER_API',
    isActive: true,
    citationCapable: true,
    recommendationCapable: true,
    complianceDisclosure: 'Measured via Perplexity Sonar API online search completion with verified citations.',
  },
  {
    surfaceId: 'gemini-grounding',
    name: 'Gemini Search Grounding Surface',
    provider: 'Google',
    model: 'gemini-3.8-flash',
    measurementMethod: 'PROVIDER_API',
    isActive: true,
    citationCapable: true,
    recommendationCapable: true,
    complianceDisclosure: 'Measured via Gemini API with Google Search grounding metadata.',
  },
  {
    surfaceId: 'claude-retrieval',
    name: 'Claude Search & Retrieval Surface',
    provider: 'Anthropic',
    model: 'claude-3-7-sonnet',
    measurementMethod: 'PROVIDER_API',
    isActive: true,
    citationCapable: true,
    recommendationCapable: true,
    complianceDisclosure: 'Measured via Anthropic API with web retrieval grounding citations.',
  },
  {
    surfaceId: 'copilot-search',
    name: 'Microsoft Copilot Bing Search Surface',
    provider: 'Microsoft',
    model: 'copilot-bing-grounding',
    measurementMethod: 'PROVIDER_API',
    isActive: true,
    citationCapable: true,
    recommendationCapable: true,
    complianceDisclosure: 'Measured via Azure OpenAI / Bing Search Grounding API.',
  },
];

export function getSurfaceById(id: string): AISurfaceRecord | undefined {
  return CANONICAL_SURFACES.find((s) => s.surfaceId === id);
}
