/** HTML&HTML canonicalization, discovery and security headers. */
interface Env { ASSETS: { fetch: typeof fetch }; }
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.hostname.startsWith('www.')) return Response.redirect(`https://${url.hostname.replace(/^www\./,'')}${url.pathname}${url.search}`,301);
  if (url.pathname.length>1 && url.pathname.endsWith('/')) return Response.redirect(`https://${url.hostname}${url.pathname.slice(0,-1)}${url.search}`,301);
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options','nosniff');
  headers.set('X-Frame-Options','SAMEORIGIN');
  headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
  headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");
  if (url.pathname === '/' || url.pathname === '/index.html') headers.set('Link','</llms.txt>; rel="describedby", </index.md>; rel="alternate"; type="text/markdown"');
  if (url.pathname === '/llms.txt' || url.pathname === '/index.md') { headers.set('Content-Type','text/markdown; charset=utf-8'); headers.set('Access-Control-Allow-Origin','*'); }
  if (url.pathname.startsWith('/api/')) headers.set('Cache-Control','no-store, max-age=0');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
};
