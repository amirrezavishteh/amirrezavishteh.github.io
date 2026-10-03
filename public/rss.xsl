<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders /rss.xml as a readable page when opened directly in a browser.
     Feed readers ignore this and read the XML as usual. -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="/rss/channel/title" /> · RSS feed</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Sora:wght@600;700&amp;display=swap" />
        <style>
          :root {
            --bg: #f6f8fc; --surface: #fff; --text: #0b1424; --muted: #5b6b82;
            --line: #dce4f0; --brand: #1d4ed8; --brand-soft: #1d4ed814;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #060a13; --surface: #0c1322; --text: #e8eef9; --muted: #8d9cb4;
              --line: #1c2740; --brand: #6b9bff; --brand-soft: #6b9bff1f;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0; background: var(--bg); color: var(--text);
            font: 16px/1.6 "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          }
          main { max-width: 760px; margin: 0 auto; padding: 48px 16px 64px; }
          h1, h2 { font-family: "Sora", ui-sans-serif, system-ui, sans-serif; line-height: 1.25; }
          h1 { font-size: 1.9rem; margin: 0 0 8px; }
          h2 { font-size: 1.12rem; margin: 0 0 6px; }
          a { color: var(--brand); text-decoration: none; }
          a:hover { text-decoration: underline; }
          .notice {
            background: var(--brand-soft); border: 1px solid var(--line); border-radius: 14px;
            padding: 14px 18px; margin-bottom: 32px; font-size: .95rem;
          }
          .notice code {
            font-family: "JetBrains Mono", ui-monospace, monospace; font-size: .88em;
            background: var(--surface); border: 1px solid var(--line); border-radius: 6px;
            padding: 1px 6px; word-break: break-all;
          }
          .lead { color: var(--muted); margin: 0 0 24px; }
          ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
          li {
            background: var(--surface); border: 1px solid var(--line); border-radius: 14px;
            padding: 18px 20px;
          }
          li p { margin: 0; color: var(--muted); font-size: .95rem; }
          .meta { font-size: .82rem; color: var(--muted); margin-bottom: 4px; }
          .tags { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
          .tags span {
            font-size: .75rem; padding: 2px 9px; border-radius: 999px;
            background: var(--brand-soft); color: var(--brand);
          }
        </style>
      </head>
      <body>
        <main>
          <div class="notice">
            <strong>This is an RSS feed.</strong>
            Copy this page's address into a feed reader (Feedly, Inoreader, NetNewsWire, …) to get new posts automatically:
            <code>https://www.amirrezavishteh.ir/rss.xml</code>
          </div>
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="lead">
            <xsl:value-of select="/rss/channel/description" />
            <xsl:text> </xsl:text>
            <a href="{/rss/channel/link}">Visit the site →</a>
          </p>
          <ol>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <div class="meta"><xsl:value-of select="substring(pubDate, 6, 11)" /></div>
                <h2><a href="{link}"><xsl:value-of select="title" /></a></h2>
                <p><xsl:value-of select="description" /></p>
                <xsl:if test="category">
                  <div class="tags">
                    <xsl:for-each select="category"><span><xsl:value-of select="." /></span></xsl:for-each>
                  </div>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ol>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
