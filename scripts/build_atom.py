#!/usr/bin/env python3
"""
Enterprise Atom 1.0 Feed Engine (RFC 4287 Compliant)
Produces W3C / IETF RFC 4287 compliant Atom feeds for htmlandhtml.com:
- /atom.xml (Master Atom feed)
- /atom-tr.xml (Turkish Atom feed)
- /atom-en.xml (English Atom feed)
"""

import json
import html
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "llms-news.json"
ORIGIN = "https://htmlandhtml.com"

def to_iso8601(date_str: str) -> str:
    """Converts date string to ISO-8601 UTC string."""
    try:
        if "T" in date_str:
            clean = date_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean)
        else:
            dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def clean_xml(text: str) -> str:
    if not text:
        return ""
    return html.escape(text.strip(), quote=False)

def build_atom_feed(items: list, lang: str, feed_url: str, title: str, subtitle: str, alt_url: str) -> str:
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<feed xmlns="http://www.w3.org/2005/Atom">',
        f'  <title>{clean_xml(title)}</title>',
        f'  <subtitle>{clean_xml(subtitle)}</subtitle>',
        f'  <link href="{feed_url}" rel="self" type="application/atom+xml" />',
        f'  <link href="{alt_url}" rel="alternate" type="text/html" />',
        f'  <id>{feed_url}</id>',
        f'  <updated>{now_iso}</updated>',
        '  <author>',
        '    <name>HTML&amp;HTML Editorial Intelligence</name>',
        f'    <uri>{ORIGIN}</uri>',
        '  </author>',
        '  <generator uri="https://htmlandhtml.com" version="1.0">HTMLandHTML Enterprise Atom Engine</generator>',
    ]

    for item in items:
        item_id = item.get("id", "")
        pub_date = to_iso8601(item.get("publishedAt", ""))
        upd_date = to_iso8601(item.get("updatedAt", "") or item.get("publishedAt", ""))

        if lang.startswith("tr"):
            it_title = item.get("title", {}).get("tr", "")
            it_summary = item.get("dek", {}).get("tr", "") or item.get("summary", {}).get("tr", "")
            it_link = f"{ORIGIN}/tr/llms-txt-haberler/{item_id}"
        else:
            it_title = item.get("title", {}).get("en", "")
            it_summary = item.get("dek", {}).get("en", "") or item.get("summary", {}).get("en", "")
            it_link = f"{ORIGIN}/en/llms-txt-news/{item_id}"

        if not it_title:
            continue

        if len(it_summary) > 600:
            it_summary = it_summary[:597] + "..."

        topic = item.get("topic", "AI Search")
        keywords = item.get("keywords", [])

        lines.append('  <entry>')
        lines.append(f'    <title>{clean_xml(it_title)}</title>')
        lines.append(f'    <link href="{it_link}" rel="alternate" type="text/html" />')
        lines.append(f'    <id>{it_link}</id>')
        lines.append(f'    <published>{pub_date}</published>')
        lines.append(f'    <updated>{upd_date}</updated>')
        lines.append(f'    <summary type="html"><![CDATA[{it_summary}]]></summary>')
        lines.append(f'    <category term="{clean_xml(topic)}" />')
        for kw in keywords[:3]:
            if kw and kw != topic:
                lines.append(f'    <category term="{clean_xml(kw)}" />')
        lines.append('  </entry>')

    lines.append('</feed>\n')
    return '\n'.join(lines)

def main():
    if not DATA_FILE.exists():
        print(f"Error: {DATA_FILE} not found.")
        return 1

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    all_items = data.get("items", [])
    all_items.sort(key=lambda x: x.get("updatedAt") or x.get("publishedAt") or "", reverse=True)
    feed_items = all_items[:50]

    # 1. Master Atom Feed (/atom.xml)
    master_atom = build_atom_feed(
        items=feed_items,
        lang="en-US",
        feed_url=f"{ORIGIN}/atom.xml",
        title="HTML&HTML — AI Search & Visibility Engineering Feed",
        subtitle="Live algorithmic analysis, search engine documentation, and LLM retrieval protocol updates.",
        alt_url=f"{ORIGIN}/en/"
    )
    with open(ROOT / "atom.xml", "w", encoding="utf-8") as f:
        f.write(master_atom)
    print("Generated: atom.xml")

    # 2. English Atom Feed (/atom-en.xml)
    with open(ROOT / "atom-en.xml", "w", encoding="utf-8") as f:
        f.write(master_atom)
    print("Generated: atom-en.xml")

    # 3. Turkish Atom Feed (/atom-tr.xml)
    tr_atom = build_atom_feed(
        items=feed_items,
        lang="tr-TR",
        feed_url=f"{ORIGIN}/atom-tr.xml",
        title="HTML&HTML — Yapay Zeka Arama ve Web Mimarisi Beslemesi",
        subtitle="Google AI, ChatGPT Search, Perplexity ve Claude protokol güncellemeleri ve teknik web analizleri.",
        alt_url=f"{ORIGIN}/tr/"
    )
    with open(ROOT / "atom-tr.xml", "w", encoding="utf-8") as f:
        f.write(tr_atom)
    print("Generated: atom-tr.xml")

    print(f"Atom Engine generated feeds with {len(feed_items)} entries.")
    return 0

if __name__ == "__main__":
    exit(main())
