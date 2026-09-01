/**
 * Cloudflare Pages middleware for htmlandhtml.com.
 * Canonical host normalization plus security headers.
 */
interface Env {
  ASSETS: { fetch: typeof fetch };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);

  if (url.hostname.startsWith('www.')) {
    const canonicalHostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(`https://${canonicalHostname}${url.pathname}${url.search}`, 301);
  }

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    return Response.redirect(`https://${url.hostname}${url.pathname.slice(0, -1)}${url.search}`, 301);
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

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
