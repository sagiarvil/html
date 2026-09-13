<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="tr">
      <head>
        <title>XML Sitemap | HTML&amp;HTML</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          :root {
            --bg: #090a0f;
            --card-bg: #11131a;
            --border: #1e2230;
            --text: #f0f3fa;
            --text-muted: #8b949e;
            --accent: #3b82f6;
            --accent-hover: #60a5fa;
            --badge-bg: rgba(59, 130, 246, 0.1);
            --badge-border: rgba(59, 130, 246, 0.25);
          }
          @media (prefers-color-scheme: light) {
            :root {
              --bg: #f8fafc;
              --card-bg: #ffffff;
              --border: #e2e8f0;
              --text: #0f172a;
              --text-muted: #64748b;
              --accent: #2563eb;
              --accent-hover: #1d4ed8;
              --badge-bg: #eff6ff;
              --badge-border: #bfdbfe;
            }
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            padding: 2rem 1rem;
            font-size: 13px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border);
          }
          .header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
          }
          .header p {
            color: var(--text-muted);
            font-size: 0.875rem;
          }
          .stats-bar {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
          .stat-pill {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            background: var(--badge-bg);
            border: 1px solid var(--badge-border);
            border-radius: 9999px;
            color: var(--accent);
            font-weight: 600;
            font-size: 0.75rem;
          }
          .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background: var(--card-bg);
            padding: 0.75rem 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            border-bottom: 1px solid var(--border);
          }
          td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border);
            vertical-align: middle;
            word-break: break-all;
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          a {
            color: var(--accent);
            text-decoration: none;
            transition: color 0.15s;
          }
          a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
          }
          .lang-badge {
            display: inline-block;
            padding: 0.15rem 0.4rem;
            font-size: 0.7rem;
            font-weight: 600;
            border-radius: 4px;
            margin-right: 0.25rem;
            margin-bottom: 0.25rem;
            background: var(--badge-bg);
            border: 1px solid var(--badge-border);
            color: var(--accent);
          }
          .footer {
            margin-top: 2rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.75rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap Index</h1>
            <p>Bu dosya arama motorları ve AI tarayıcılar (Googlebot, OAI-SearchBot, Claude-SearchBot, Perplexity) için üretilmiş standart XML site haritasıdır.</p>
            <div class="stats-bar">
              <span class="stat-pill">Toplam URL: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
              <span class="stat-pill">Protokol: Sitemaps.org 0.9</span>
            </div>
          </div>
          <div class="card">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL (Adres)</th>
                  <th style="width: 15%;">Son Güncelleme</th>
                  <th style="width: 10%;">Öncelik</th>
                  <th style="width: 20%;">Dil Varyantları (Hreflang)</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="color: var(--text-muted);">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td>
                      <span class="stat-pill" style="padding: 0.15rem 0.5rem; font-size: 0.7rem;">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <xsl:for-each select="xhtml:link[@rel='alternate']">
                        <span class="lang-badge">
                          <xsl:value-of select="@hreflang"/>
                        </span>
                      </xsl:for-each>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <div class="footer">
            <p>© 2026 HTML&amp;HTML. Deterministik Web ve AI Arama Standartları.</p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
