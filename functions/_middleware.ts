/**
 * Cloudflare Edge Middleware for htmlandhtml.com
 * Handles canonical redirects (HTTP->HTTPS, www->non-www), trailing slash policy,
 * and security & AI search crawler headers at the Edge (0ms TTFB).
 */

interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('User-Agent') || '';

  // 1. Host & Canonical Protocol Enforcement (www -> non-www)
  if (url.hostname.startsWith('www.')) {
    const canonicalHostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(`https://${canonicalHostname}${url.pathname}${url.search}`, 301);
  }

  // 2. Trailing Slash Standardization (except root)
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return Response.redirect(`https://${url.hostname}${url.pathname.slice(0, -1)}${url.search}`, 301);
  }

  // 3. Process Request via Edge Assets
  const response = await next();

  // 4. Inject Edge Headers (Strict Noindex Mode)
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

  // Set proper markdown Content-Type for llms endpoints
  if (url.pathname === '/llms.txt' || url.pathname.startsWith('/llms/')) {
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};
