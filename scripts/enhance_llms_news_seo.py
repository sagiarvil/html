#!/usr/bin/env python3
"""Harden LLMS.TXT News for Google Article/News discovery.

This post-build step is intentionally deterministic and idempotent:
- enriches each generated NewsArticle JSON-LD with truthful publisher/author identity
- emits three local crawlable article-image variants (16:9, 4:3, 1:1)
- writes a dedicated Google News sitemap containing only articles <=48h old
- keeps robots.txt discovery explicit
- fails closed on invalid dates, missing generated pages, or malformed JSON-LD

Source authors are deliberately not inferred from external publishers. HTML&HTML is
the editorial author/publisher of the independent analysis rendered on these pages.
"""
from __future__ import annotations

from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.parse import urlparse
import html
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data/llms-news.json"
SITE = "https://htmlandhtml.com"
ORG_ID = f"{SITE}/#organization"
ORG_URL = f"{SITE}/about/"
ORG_LOGO = f"{SITE}/assets/brand/logo-master-2026.png"
NEWS_SITEMAP = ROOT / "sitemap-news.xml"
ROBOTS = ROOT / "robots.txt"

IMAGE_VARIANTS = (
    ("16x9", 1200, 675),
    ("4x3", 1200, 900),
    ("1x1", 1200, 1200),
)

LD_RE = re.compile(
    r'(<script\s+type=["\']application/ld\+json["\']\s*>)([\s\S]*?)(</script>)',
    re.IGNORECASE,
)
SVG_RE = re.compile(r"^\s*<svg\b[^>]*>([\s\S]*)</svg>\s*$", re.IGNORECASE)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-")[:90]


def _parse_iso(value: str, *, field: str) -> tuple[datetime, bool]:
    raw = str(value or "").strip()
    if not raw:
        raise ValueError(f"{field} is required")
    date_only = bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw))
    normalized = raw.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise ValueError(f"{field} must be ISO 8601: {raw}") from exc
    if date_only:
        dt = dt.replace(tzinfo=timezone.utc)
    elif dt.tzinfo is None:
        raise ValueError(f"{field} datetime must include timezone: {raw}")
    return dt.astimezone(timezone.utc), date_only


def editorial_now(data: dict) -> datetime:
    dt, _ = _parse_iso(str(data.get("lastUpdated") or ""), field="lastUpdated")
    return dt


def modified_at(item: dict) -> str:
    published = str(item["publishedAt"]).strip()
    modified = str(item.get("updatedAt") or published).strip()
    p_dt, _ = _parse_iso(published, field=f"{item.get('id')}.publishedAt")
    m_dt, _ = _parse_iso(modified, field=f"{item.get('id')}.updatedAt")
    if m_dt < p_dt:
        raise ValueError(f"{item.get('id')}: dateModified precedes datePublished")
    return modified


def recent_for_news_sitemap(item: dict, now: datetime) -> bool:
    """Include only URLs provably created inside Google's two-day news window."""
    published, _ = _parse_iso(str(item["publishedAt"]), field=f"{item.get('id')}.publishedAt")
    age = now - published
    return timedelta(0) <= age <= timedelta(hours=48)


def make_image_variants(item: dict, slug: str) -> dict[str, dict]:
    src = ROOT / "assets/news" / f"{slug}.svg"
    if not src.exists():
        raise FileNotFoundError(f"missing base news SVG: {src.relative_to(ROOT)}")
    source = src.read_text(encoding="utf-8")
    match = SVG_RE.match(source)
    if not match:
        raise ValueError(f"invalid base news SVG: {src.relative_to(ROOT)}")
    inner = match.group(1)

    out: dict[str, dict] = {}
    for ratio, width, height in IMAGE_VARIANTS:
        target = ROOT / "assets/news" / f"{slug}-{ratio}.svg"
        if ratio == "16x9":
            payload = source
        else:
            y = (height - 675) / 2
            y_text = str(int(y)) if y.is_integer() else str(y)
            payload = (
                f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
                f'width="{width}" height="{height}" role="img">\n'
                f'  <rect width="{width}" height="{height}" fill="#060709"/>\n'
                f'  <svg x="0" y="{y_text}" width="1200" height="675" viewBox="0 0 1200 675">\n'
                f"{inner}\n"
                f"  </svg>\n"
                f"</svg>"
            )
        target.write_text(payload, encoding="utf-8")
        out[ratio] = {
            "@type": "ImageObject",
            "url": f"{SITE}/assets/news/{target.name}",
            "width": width,
            "height": height,
        }
    return out


def expected_canonical(lang: str, slug: str) -> str:
    base = "/tr/llms-txt-haberler/" if lang == "tr" else "/en/llms-txt-news/"
    return f"{SITE}{base}{slug}/"


def organization_node() -> dict:
    return {
        "@type": "Organization",
        "@id": ORG_ID,
        "name": "HTML&HTML",
        "url": ORG_URL,
        "logo": {"@type": "ImageObject", "url": ORG_LOGO},
    }


def enrich_newsarticle(doc: dict, item: dict, lang: str, canonical: str, images: dict[str, dict]) -> dict:
    graph = doc.get("@graph")
    if not isinstance(graph, list):
        raise ValueError(f"{item['id']} {lang}: JSON-LD @graph missing")
    articles = [
        node for node in graph
        if isinstance(node, dict) and (
            node.get("@type") == "NewsArticle"
            or (isinstance(node.get("@type"), list) and "NewsArticle" in node["@type"])
        )
    ]
    if len(articles) != 1:
        raise ValueError(f"{item['id']} {lang}: exactly one NewsArticle required")
    article = articles[0]

    published = str(item["publishedAt"]).strip()
    modified = modified_at(item)
    article.update(
        {
            "@id": f"{canonical}#newsarticle",
            "url": canonical,
            "headline": item["title"][lang],
            "description": item["dek"][lang],
            "datePublished": published,
            "dateModified": modified,
            "mainEntityOfPage": {"@type": "WebPage", "@id": canonical},
            "image": [images["1x1"], images["4x3"], images["16x9"]],
            "author": [
                {
                    "@type": "Organization",
                    "@id": ORG_ID,
                    "name": "HTML&HTML",
                    "url": ORG_URL,
                }
            ],
            "publisher": organization_node(),
            "inLanguage": lang,
            "articleSection": str(item.get("topic") or "AI Search").replace("_", " "),
            "keywords": [str(x) for x in (item.get("keywords") or [])[:8]],
            "isAccessibleForFree": True,
            "isBasedOn": item["sourceUrl"],
        }
    )

    graph[:] = [
        node
        for node in graph
        if not (isinstance(node, dict) and node.get("@id") == ORG_ID and node is not article)
    ]
    graph.append(organization_node())
    return doc


def patch_meta(html_doc: str, *, images: dict[str, dict], published: str, modified: str) -> str:
    og = images["16x9"]["url"]
    replacements = {
        "og:image": og,
        "twitter:image": og,
        "article:published_time": published,
        "article:modified_time": modified,
    }
    for prop, content in replacements.items():
        attr = "name" if prop.startswith("twitter:") else "property"
        pattern = re.compile(
            rf'<meta\s+{attr}="{re.escape(prop)}"\s+content="[^"]*"\s*/?>',
            re.IGNORECASE,
        )
        tag = f'<meta {attr}="{prop}" content="{html.escape(content, quote=True)}">'
        if pattern.search(html_doc):
            html_doc = pattern.sub(tag, html_doc, count=1)
        else:
            html_doc = html_doc.replace("</head>", tag + "</head>", 1)

    for prop, content in (("og:image:width", "1200"), ("og:image:height", "675")):
        pattern = re.compile(
            rf'<meta\s+property="{re.escape(prop)}"\s+content="[^"]*"\s*/?>',
            re.IGNORECASE,
        )
        tag = f'<meta property="{prop}" content="{content}">'
        if pattern.search(html_doc):
            html_doc = pattern.sub(tag, html_doc, count=1)
        else:
            html_doc = html_doc.replace("</head>", tag + "</head>", 1)

    card = '<meta name="twitter:card" content="summary_large_image">'
    if not re.search(r'<meta\s+name="twitter:card"\b', html_doc, re.IGNORECASE):
        html_doc = html_doc.replace("</head>", card + "</head>", 1)
    return html_doc


def patch_visible_dates(html_doc: str, item: dict, lang: str) -> str:
    published = str(item["publishedAt"]).strip()
    modified = modified_at(item)
    old = (
        f'<time datetime="{html.escape(published, quote=True)}">'
        f'{html.escape(modified, quote=True)}</time>'
    )
    published_label = "Yayınlandı" if lang == "tr" else "Published"
    modified_label = "Güncellendi" if lang == "tr" else "Updated"
    replacement = (
        f'<span class="news-date news-date-published">{published_label}: '
        f'<time datetime="{html.escape(published, quote=True)}">{html.escape(published)}</time></span>'
    )
    if modified != published:
        replacement += (
            f'<span class="news-date news-date-modified">{modified_label}: '
            f'<time datetime="{html.escape(modified, quote=True)}">{html.escape(modified)}</time></span>'
        )

    if old in html_doc:
        return html_doc.replace(old, replacement, 1)
    if 'class="news-date news-date-published"' in html_doc:
        pattern = re.compile(
            r'<span class="news-date news-date-published">[\s\S]*?</span>'
            r'(?:<span class="news-date news-date-modified">[\s\S]*?</span>)?'
        )
        return pattern.sub(replacement, html_doc, count=1)
    raise ValueError(f"{item['id']} {lang}: expected visible date markup missing")


def patch_article_file(item: dict, lang: str, slug: str, images: dict[str, dict]) -> None:
    canonical = expected_canonical(lang, slug)
    base = "tr/llms-txt-haberler" if lang == "tr" else "en/llms-txt-news"
    path = ROOT / base / slug / "index.html"
    if not path.exists():
        raise FileNotFoundError(f"generated article missing: {path.relative_to(ROOT)}")
    text = path.read_text(encoding="utf-8")

    canonical_match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', text, re.IGNORECASE)
    if not canonical_match or canonical_match.group(1) != canonical:
        raise ValueError(f"{path.relative_to(ROOT)}: canonical mismatch")

    patched = False

    def repl(match: re.Match[str]) -> str:
        nonlocal patched
        raw = html.unescape(match.group(2))
        try:
            obj = json.loads(raw)
        except json.JSONDecodeError:
            return match.group(0)
        graph = obj.get("@graph") if isinstance(obj, dict) else None
        if not isinstance(graph, list) or not any(
            isinstance(node, dict)
            and (
                node.get("@type") == "NewsArticle"
                or (isinstance(node.get("@type"), list) and "NewsArticle" in node["@type"])
            )
            for node in graph
        ):
            return match.group(0)
        if patched:
            raise ValueError(f"{path.relative_to(ROOT)}: multiple NewsArticle JSON-LD blocks")
        patched = True
        obj = enrich_newsarticle(obj, item, lang, canonical, images)
        payload = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
        return f"{match.group(1)}{payload}{match.group(3)}"

    text = LD_RE.sub(repl, text)
    if not patched:
        raise ValueError(f"{path.relative_to(ROOT)}: NewsArticle JSON-LD not found")

    text = patch_meta(
        text,
        images=images,
        published=str(item["publishedAt"]).strip(),
        modified=modified_at(item),
    )
    text = patch_visible_dates(text, item, lang)
    path.write_text(text, encoding="utf-8")


def write_news_sitemap(data: dict, records: list[tuple[dict, str]]) -> int:
    now = editorial_now(data)
    recent = [(item, slug) for item, slug in records if recent_for_news_sitemap(item, now)]
    entries: list[str] = []
    for item, slug in recent:
        published = html.escape(str(item["publishedAt"]).strip())
        for lang, base in (
            ("tr", "/tr/llms-txt-haberler/"),
            ("en", "/en/llms-txt-news/"),
        ):
            loc = html.escape(f"{SITE}{base}{slug}/")
            title = html.escape(str(item["title"][lang]))
            entries.append(
                "  <url>"
                f"<loc>{loc}</loc>"
                "<news:news>"
                "<news:publication>"
                "<news:name>HTML&amp;HTML</news:name>"
                f"<news:language>{lang}</news:language>"
                "</news:publication>"
                f"<news:publication_date>{published}</news:publication_date>"
                f"<news:title>{title}</news:title>"
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
    NEWS_SITEMAP.write_text(xml, encoding="utf-8")
    return len(entries)


def patch_robots() -> None:
    if not ROBOTS.exists():
        raise FileNotFoundError("robots.txt missing")
    text = ROBOTS.read_text(encoding="utf-8").rstrip()
    directive = f"Sitemap: {SITE}/sitemap-news.xml"
    if directive not in text.splitlines():
        text += "\n" + directive
    ROBOTS.write_text(text + "\n", encoding="utf-8")


def main() -> int:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    items = data.get("items")
    if not isinstance(items, list) or not items:
        raise SystemExit("LLMS NEWS SEO FAIL: data.items must be a non-empty list")

    seen_ids: set[str] = set()
    records: list[tuple[dict, str]] = []
    for item in sorted(items, key=lambda x: str(x.get("publishedAt") or ""), reverse=True):
        item_id = str(item.get("id") or "")
        if not item_id or item_id in seen_ids:
            raise SystemExit(f"LLMS NEWS SEO FAIL: invalid/duplicate id: {item_id!r}")
        seen_ids.add(item_id)
        if urlparse(str(item.get("sourceUrl") or "")).scheme != "https":
            raise SystemExit(f"LLMS NEWS SEO FAIL: sourceUrl must be HTTPS: {item_id}")
        slug = slugify(item_id)
        images = make_image_variants(item, slug)
        for lang in ("tr", "en"):
            patch_article_file(item, lang, slug, images)
        records.append((item, slug))

    count = write_news_sitemap(data, records)
    patch_robots()
    print(
        f"LLMS NEWS SEO PASS: {len(records)} bilingual NewsArticle pairs hardened; "
        f"{len(records) * 3} ratio-specific local images; {count} <=48h Google News URLs."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
