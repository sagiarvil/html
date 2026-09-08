#!/usr/bin/env python3
"""Fail closed if sitemap-news.xml was edited outside its deterministic source contract.

`sitemap-news.xml` is a generated artifact. Its only source of truth is
`data/llms-news.json` plus the canonical rendering contract in this guard and
`scripts/enhance_llms_news_seo.py`.

The guard performs a byte-for-byte comparison before any build is allowed to
regenerate the file. This is deliberate: a normal build could otherwise hide a
direct manual/agent edit by overwriting it in the CI workspace.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
from hashlib import sha256
from pathlib import Path
from urllib.parse import urlparse
import html
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data/llms-news.json"
NEWS_SITEMAP = ROOT / "sitemap-news.xml"
SITE = "https://htmlandhtml.com"


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-")[:90]


def parse_iso(value: str, *, field: str) -> datetime:
    raw = str(value or "").strip()
    if not raw:
        raise ValueError(f"{field} is required")
    date_only = bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw))
    try:
        dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError(f"{field} must be ISO 8601: {raw}") from exc
    if date_only:
        dt = dt.replace(tzinfo=timezone.utc)
    elif dt.tzinfo is None:
        raise ValueError(f"{field} datetime must include timezone: {raw}")
    return dt.astimezone(timezone.utc)


def render_expected(data: dict) -> str:
    items = data.get("items")
    if not isinstance(items, list) or not items:
        raise ValueError("data.items must be a non-empty list")

    now = parse_iso(data.get("lastUpdated"), field="lastUpdated")
    entries: list[str] = []
    seen_ids: set[str] = set()

    for item in sorted(items, key=lambda x: str(x.get("publishedAt") or ""), reverse=True):
        item_id = str(item.get("id") or "").strip()
        if not item_id or item_id in seen_ids:
            raise ValueError(f"invalid/duplicate news id: {item_id!r}")
        seen_ids.add(item_id)

        source_url = str(item.get("sourceUrl") or "")
        if urlparse(source_url).scheme != "https":
            raise ValueError(f"sourceUrl must be HTTPS: {item_id}")

        published_raw = str(item.get("publishedAt") or "").strip()
        published_dt = parse_iso(published_raw, field=f"{item_id}.publishedAt")
        age = now - published_dt
        if not (timedelta(0) <= age <= timedelta(hours=48)):
            continue

        slug = slugify(item_id)
        for lang, base in (
            ("tr", "/tr/llms-txt-haberler/"),
            ("en", "/en/llms-txt-news/"),
        ):
            title_map = item.get("title") or {}
            title = str(title_map.get(lang) or "").strip()
            if not title:
                raise ValueError(f"{item_id}: title.{lang} is required")
            loc = html.escape(f"{SITE}{base}{slug}/")
            entries.append(
                "  <url>"
                f"<loc>{loc}</loc>"
                "<news:news>"
                "<news:publication>"
                "<news:name>HTML&amp;HTML</news:name>"
                f"<news:language>{lang}</news:language>"
                "</news:publication>"
                f"<news:publication_date>{html.escape(published_raw)}</news:publication_date>"
                f"<news:title>{html.escape(title)}</news:title>"
                "</news:news>"
                "</url>"
            )

    if len(entries) > 1000:
        raise ValueError("Google News sitemap would exceed 1,000 news entries")

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )
    ET.fromstring(xml)
    return xml


def digest(value: str) -> str:
    return sha256(value.encode("utf-8")).hexdigest()


def main() -> int:
    if not DATA_PATH.is_file():
        raise SystemExit("NEWS_SITEMAP_GUARD_FAIL: data/llms-news.json missing")
    if not NEWS_SITEMAP.is_file() or NEWS_SITEMAP.is_symlink():
        raise SystemExit("NEWS_SITEMAP_GUARD_FAIL: sitemap-news.xml must be a regular generated file")

    try:
        data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
        expected = render_expected(data)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        raise SystemExit(f"NEWS_SITEMAP_GUARD_FAIL: source contract invalid: {exc}") from exc

    actual = NEWS_SITEMAP.read_text(encoding="utf-8")
    if actual != expected:
        raise SystemExit(
            "NEWS_SITEMAP_GUARD_FAIL: PROTECTED_GENERATED_ARTIFACT_DRIFT\n"
            "sitemap-news.xml does not exactly match data/llms-news.json. "
            "Direct/manual/agent edits are forbidden; change the canonical news source and regenerate.\n"
            f"expected_sha256={digest(expected)}\n"
            f"actual_sha256={digest(actual)}"
        )

    print(
        "NEWS_SITEMAP_GUARD_PASS: sitemap-news.xml is byte-identical to its deterministic source contract; "
        f"sha256={digest(actual)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
