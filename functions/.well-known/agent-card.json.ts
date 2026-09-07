export const onRequestGet: PagesFunction = async () =>
  Response.json(
    {
      schemaVersion: '1.0.0',
      name: 'HTML&HTML AI Agent',
      description: 'Deterministic web standards, technical SEO, GEO, AEO, and AI search readiness diagnostic agent.',
      url: 'https://htmlandhtml.com',
      provider: { name: 'HTML&HTML', url: 'https://htmlandhtml.com' },
      capabilities: { tools: true, streaming: false },
      endpoints: {
        scan: 'https://htmlandhtml.com/api/scan',
        openapi: 'https://htmlandhtml.com/openapi.json',
        mcp: 'https://htmlandhtml.com/mcp'
      },
      documentation: 'https://htmlandhtml.com/standard/'
    },
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'public, max-age=3600',
        'x-content-type-options': 'nosniff'
      }
    }
  );
