#!/usr/bin/env python3
"""
Enterprise RSS 2.0 & Atom Feed Engine v1.0
Produces W3C-compliant RSS 2.0 feeds for htmlandhtml.com:
- /rss.xml (Master global feed)
- /rss-tr.xml (Turkish feed)
- /rss-en.xml (English feed)
- /feed.xml (Root alias)
"""

import json
import html
from pathlib import Path
from datetime import datetime, timezone
import email.utils

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "llms-news.json"
ORIGIN = "https://htmlandhtml.com"

def to_rfc822(date_str: str) -> str:
    """Converts ISO-8601 or YYYY-MM-DD date to RFC 2822 date string."""
    try:
        if "T" in date_str:
            clean_date = date_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_date)
        else:
            dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        return email.utils.format_datetime(dt)
    except Exception:
        now = datetime.now(timezone.utc)
        return email.utils.format_datetime(now)

def clean_xml_text(text: str) -> str:
    """Escapes XML entities safely."""
    if not text:
        return ""
    return html.escape(text.strip(), quote=False)

def build_feed_xml(items: list, lang: str, feed_url: str, title: str, description: str, link: str) -> str:
    now_rfc822 = email.utils.format_datetime(datetime.now(timezone.utc))
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        '  <channel>',
        f'    <title>{clean_xml_text(title)}</title>',
        f'    <link>{link}</link>',
        f'    <description>{clean_xml_text(description)}</description>',
        f'    <language>{lang}</language>',
        f'    <lastBuildDate>{now_rfc822}</lastBuildDate>',
        f'    <atom:link href="{feed_url}" rel="self" type="application/rss+xml" />',
        '    <generator>HTMLandHTML Enterprise RSS Engine v1.0</generator>',
    ]

    for item in items:
        item_id = item.get("id", "")
        published_at = item.get("publishedAt", "")
        updated_at = item.get("updatedAt", published_at)
        rfc_date = to_rfc822(updated_at or published_at)

        # Language-specific fields
        if lang.startswith("tr"):
            item_title = item.get("title", {}).get("tr", "")
            item_dek = item.get("dek", {}).get("tr", "")
            item_summary = item.get("summary", {}).get("tr", "")
            item_link = f"{ORIGIN}/tr/llms-txt-haberler/{item_id}"
        else:
            item_title = item.get("title", {}).get("en", "")
            item_dek = item.get("dek", {}).get("en", "")
            item_summary = item.get("summary", {}).get("en", "")
            item_link = f"{ORIGIN}/en/llms-txt-news/{item_id}"

        if not item_title:
            continue

        desc = item_dek or item_summary or ""
        # Cut long description to reasonable length for RSS readers
        if len(desc) > 600:
            desc = desc[:597] + "..."

        topic = item.get("topic", "AI Search")
        keywords = item.get("keywords", [])

        xml_lines.append('    <item>')
        xml_lines.append(f'      <title>{clean_xml_text(item_title)}</title>')
        xml_lines.append(f'      <link>{item_link}</link>')
        xml_lines.append(f'      <guid isPermaLink="true">{item_link}</guid>')
        xml_lines.append(f'      <pubDate>{rfc_date}</pubDate>')
        xml_lines.append(f'      <description><![CDATA[{desc}]]></description>')
        xml_lines.append(f'      <category>{clean_xml_text(topic)}</category>')
        for kw in keywords[:3]:
            if kw and kw != topic:
                xml_lines.append(f'      <category>{clean_xml_text(kw)}</category>')
        xml_lines.append('    </item>')

    xml_lines.append('  </channel>')
    xml_lines.append('</rss>\n')
    return '\n'.join(xml_lines)

def main():
    if not DATA_FILE.exists():
        print(f"Error: {DATA_FILE} not found.")
        return 1

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    all_items = data.get("items", [])
    # Sort items by publishedAt / updatedAt descending
    all_items.sort(key=lambda x: x.get("updatedAt") or x.get("publishedAt") or "", reverse=True)

    # Top 50 items for the feeds
    feed_items = all_items[:50]

    # 1. English Feed (/rss-en.xml)
    en_xml = build_feed_xml(
        items=feed_items,
        lang="en-US",
        feed_url=f"{ORIGIN}/rss-en.xml",
        title="HTML&HTML — AI Search & Visibility Engineering News",
        description="Evidence-backed technical briefings, AI Search updates (Google AI Overviews, OpenAI Search, Perplexity, Claude), llms.txt developments, and enterprise crawlability analyses.",
        link=f"{ORIGIN}/en/"
    )
    with open(ROOT / "rss-en.xml", "w", encoding="utf-8") as f:
        f.write(en_xml)
    print("Generated: rss-en.xml")

    # 2. Turkish Feed (/rss-tr.xml)
    tr_xml = build_feed_xml(
        items=feed_items,
        lang="tr-TR",
        feed_url=f"{ORIGIN}/rss-tr.xml",
        title="HTML&HTML — Yapay Zeka Arama ve Web Mimarisi Analizleri",
        description="Google AI Overviews, OpenAI Search, Perplexity ve Claude tarama protokolleri, llms.txt standartları ve kurumsal web sitesi teknik teşhis analizleri.",
        link=f"{ORIGIN}/tr/"
    )
    with open(ROOT / "rss-tr.xml", "w", encoding="utf-8") as f:
        f.write(tr_xml)
    print("Generated: rss-tr.xml")

    # 3. Master Global Feed (/rss.xml & /feed.xml)
    with open(ROOT / "rss.xml", "w", encoding="utf-8") as f:
        f.write(en_xml)
    print("Generated: rss.xml")

    with open(ROOT / "feed.xml", "w", encoding="utf-8") as f:
        f.write(en_xml)
    print("Generated: feed.xml")

    print(f"RSS Engine successfully generated feeds with {len(feed_items)} items.")
    return 0

if __name__ == "__main__":
    exit(main())
