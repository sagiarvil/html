export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'GET or POST only' }), {
      status: 405,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
  return Response.json(
    {
      name: 'htmlandhtml-mcp-server',
      version: '1.0.0',
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {
          scan: {
            description: 'Scan a website URL for 12-engine technical SEO, AI readiness, LLMs.txt, Schema, and accessibility signals.',
            inputSchema: {
              type: 'object',
              properties: { url: { type: 'string', description: 'The URL to scan' } },
              required: ['url']
            }
          }
        }
      },
      endpoint: 'https://htmlandhtml.com/mcp'
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
};
