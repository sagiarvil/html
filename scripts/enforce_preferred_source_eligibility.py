#!/usr/bin/env python3
"""Fail-closed gate for Google's Preferred Sources publisher control.

Google's publisher button is only appropriate after the domain is actually
selectable in Google's Source preferences tool. Until that external eligibility
state is verified, remove the control from public homepages so users are not
sent into a known rejection flow.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "config" / "google-preferred-source.json"
PUBLIC_HOME_PAGES = (
    ROOT / "index.html",
    ROOT / "tr" / "index.html",
    ROOT / "en" / "index.html",
)

PUBLISHER_SCRIPT_RE = re.compile(
    r"\s*<script\b[^>]*\bsrc=[\"']https://news\.google\.com/swg/js/v1/publisher\.(?:js|mjs)[\"'][^>]*>\s*</script>\s*",
    re.IGNORECASE,
)
PREFERRED_WRAP_RE = re.compile(
    r"\s*<div\s+class=[\"']preferred-source-wrap[\"'][^>]*>\s*"
    r"<div\s+google-add-preferred-source-btn\b[^>]*>\s*</div>\s*"
    r"(?:<noscript>.*?</noscript>\s*)?"
    r"</div>\s*",
    re.IGNORECASE | re.DOTALL,
)


def load_config() -> dict:
    data = json.loads(CONFIG.read_text(encoding="utf-8"))
    if data.get("domain") != "htmlandhtml.com":
        raise SystemExit("Preferred Sources gate: unexpected domain in config")
    if not isinstance(data.get("eligible"), bool):
        raise SystemExit("Preferred Sources gate: eligible must be boolean")
    return data


def main() -> None:
    config = load_config()
    missing = [str(path.relative_to(ROOT)) for path in PUBLIC_HOME_PAGES if not path.exists()]
    if missing:
        raise SystemExit(f"Preferred Sources gate: missing public homepages: {', '.join(missing)}")

    if config["eligible"]:
        # The build pipeline already materializes Google's official integration.
        # When eligibility is deliberately re-enabled, fail if that integration
        # is unexpectedly absent rather than silently shipping a dead flag.
        root_html = (ROOT / "index.html").read_text(encoding="utf-8")
        if "google-add-preferred-source-btn" not in root_html or "news.google.com/swg/js/v1/publisher.js" not in root_html:
            raise SystemExit("Preferred Sources gate: eligible=true but publisher integration is missing")
        print("PREFERRED_SOURCE_GATE_PASS eligible=true integration=present")
        return

    changed = 0
    for path in PUBLIC_HOME_PAGES:
        html = path.read_text(encoding="utf-8")
        cleaned = PUBLISHER_SCRIPT_RE.sub("\n", html)
        cleaned = PREFERRED_WRAP_RE.sub("\n", cleaned)
        if cleaned != html:
            path.write_text(cleaned, encoding="utf-8")
            changed += 1

    for path in PUBLIC_HOME_PAGES:
        html = path.read_text(encoding="utf-8")
        if "google-add-preferred-source-btn" in html:
            raise SystemExit(f"Preferred Sources gate: button survived in {path.relative_to(ROOT)}")
        if "news.google.com/swg/js/v1/publisher.js" in html:
            raise SystemExit(f"Preferred Sources gate: publisher.js survived in {path.relative_to(ROOT)}")

    print(f"PREFERRED_SOURCE_GATE_PASS eligible=false stripped_pages={changed}")


if __name__ == "__main__":
    main()
