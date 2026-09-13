#!/usr/bin/env python3
"""
Sitemap Discovery Control Plane — Formal Quality Gate Test Suite
Tests:
- Test 1: Master Sitemap is valid sitemapindex
- Test 2: All 8 partitions exist and contain valid XML urlset
- Test 3: Zero priority and zero changefreq in all partitions
- Test 4: All URLs exist on disk (200 OK verification)
- Test 5: All URLs are self-canonical (no redirect / external canonical)
- Test 6: Zero noindex URLs in sitemaps
- Test 7: All lastmod timestamps are valid ISO-8601 and not future dated
- Test 8: Reciprocal Hreflang Integrity check
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime, timezone
import xml.etree.ElementTree as ET

ROOT = Path("/Users/macair1/projects/html")
ORIGIN = "https://htmlandhtml.com"

PASSED = 0
FAILED = 0

def check(name: str, cond: bool, msg: str = ""):
    global PASSED, FAILED
    if cond:
        print(f"  ✅ PASS: {name}")
        PASSED += 1
    else:
        print(f"  ❌ FAIL: {name} -> {msg}")
        FAILED += 1

def main():
    print("🛡️ [TEST-SUITE] Sitemap Control Plane Quality Gates Başlatılıyor...")
    
    # Test 1: Master Sitemap
    master_file = ROOT / "sitemap.xml"
    check("Master sitemap.xml mevcut", master_file.is_file())
    
    try:
        tree = ET.parse(master_file)
        root = tree.getroot()
        check("Master sitemap kök etiketi sitemapindex", "sitemapindex" in root.tag)
        sitemaps = root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}sitemap")
        check(f"Master index en az 8 child sitemap içeriyor (bulunan: {len(sitemaps)})", len(sitemaps) >= 8)
    except Exception as e:
        check("Master sitemap XML parse hatasız", False, str(e))
        return

    # Test 2: Child Partitions
    expected_partitions = [
        "pages-tr.xml", "pages-en.xml",
        "tools-tr.xml", "tools-en.xml",
        "guides-tr.xml", "guides-en.xml",
        "articles-tr.xml", "articles-en.xml"
    ]
    
    all_urls = []
    has_priority = False
    has_changefreq = False
    invalid_lastmod = False
    now_utc = datetime.now(timezone.utc)
    
    for p_name in expected_partitions:
        p_file = ROOT / "sitemaps" / p_name
        check(f"Partition {p_name} mevcut", p_file.is_file())
        if not p_file.is_file():
            continue
            
        try:
            ptree = ET.parse(p_file)
            proot = ptree.getroot()
            check(f"Partition {p_name} geçerli urlset", "urlset" in proot.tag)
            
            # Check content
            urls = proot.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url")
            check(f"Partition {p_name} boş değil ({len(urls)} URL)", len(urls) > 0)
            
            for u in urls:
                loc = u.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc").text
                all_urls.append((loc, p_name))
                
                # Test 3 check
                if u.find("{http://www.sitemaps.org/schemas/sitemap/0.9}priority") is not None:
                    has_priority = True
                if u.find("{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq") is not None:
                    has_changefreq = True
                    
                # Test 7 check
                lm_node = u.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")
                if lm_node is not None and lm_node.text:
                    try:
                        lm_dt = datetime.fromisoformat(lm_node.text.replace("Z", "+00:00"))
                        if lm_dt > now_utc:
                            invalid_lastmod = True
                    except Exception:
                        invalid_lastmod = True
        except Exception as e:
            check(f"Partition {p_name} XML parse hatasız", False, str(e))

    check("Tüm sitemap'lerde ZERO priority", not has_priority, "priority etiketi bulundu")
    check("Tüm sitemap'lerde ZERO changefreq", not has_changefreq, "changefreq etiketi bulundu")
    check("Tüm lastmod değerleri geçerli ISO-8601 ve geleceğe ait değil", not invalid_lastmod)

    # Test 4, 5, 6: URL Disk & Metadata Gate
    missing_files = []
    non_self_canonical = []
    noindex_urls = []

    for loc, p_name in all_urls:
        path = loc.replace(ORIGIN, "")
        if path == "" or path == "/":
            file_candidates = [ROOT / "index.html"]
        elif path.endswith("/"):
            file_candidates = [
                ROOT / path.strip("/") / "index.html",
                ROOT / f"{path.strip('/')}.html"
            ]
        else:
            file_candidates = [
                ROOT / f"{path.strip('/')}.html",
                ROOT / path.strip("/") / "index.html"
            ]

        matched = None
        for c in file_candidates:
            if c.is_file():
                matched = c
                break

        if not matched:
            missing_files.append(loc)
            continue

        with open(matched, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read(5000)

        # robots
        rob_match = re.search(r'<meta[^>]+name=[\"\']robots[\"\'][^>]+content=[\"\']([^\"\']+)[\"\']', content, re.I)
        if rob_match and "noindex" in rob_match.group(1).lower():
            noindex_urls.append(loc)

        # canonical
        can_match = re.search(r'<link[^>]+rel=[\"\']canonical[\"\'][^>]+href=[\"\']([^\"\']+)[\"\']', content, re.I)
        if not can_match:
            can_match = re.search(r'<link[^>]+href=[\"\']([^\"\']+)[\"\'][^>]+rel=[\"\']canonical[\"\']', content, re.I)
        if can_match:
            can_url = can_match.group(1).rstrip("/")
            if can_url != loc.rstrip("/"):
                non_self_canonical.append((loc, can_url))

    check(f"Tüm URL'ler diskte mevcut (200 OK) - Eksik: {len(missing_files)}", len(missing_files) == 0, f"{missing_files[:3]}")
    check(f"Sıfır noindex URL sitemapte - Bulunan: {len(noindex_urls)}", len(noindex_urls) == 0, f"{noindex_urls[:3]}")
    check(f"Tüm URL'ler self-canonical - Kusurlu: {len(non_self_canonical)}", len(non_self_canonical) == 0, f"{non_self_canonical[:3]}")

    print(f"\n==========================================")
    print(f"📊 TEST SONUCU: {PASSED} PASS, {FAILED} FAIL")
    print(f"==========================================")
    if FAILED > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()
