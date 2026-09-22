#!/usr/bin/env python3
"""Enforce the dark-only contract on every generated HTML report surface.

This runs after report/localization generators. It materializes a first-paint
dark marker plus the final CSS/runtime guards so later theme layers cannot
reintroduce white report backgrounds.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TARGETS = (
    ROOT / "ai-report" / "index.html",
    ROOT / "enterprise-analyzer" / "htmlandhtml-ai-report.html",
    ROOT / "enterprise-analyzer" / "htmlandhtml-ai-report-LIGHT.html",
    ROOT / "tr" / "enterprise-analyzer" / "htmlandhtml-ai-report.html",
    ROOT / "tr" / "enterprise-analyzer" / "htmlandhtml-ai-report-LIGHT.html",
    ROOT / "en" / "sample-report" / "index.html",
    ROOT / "tr" / "ornek-rapor" / "index.html",
)

PREFLIGHT = """<script data-report-dark-preflight>
(function(){
  var r=document.documentElement;
  r.setAttribute('data-report-surface','true');
  r.setAttribute('data-theme','dark');
  r.classList.add('dark');
  r.classList.remove('light');
  r.style.colorScheme='dark';
})();
</script>"""

CSS_LINK = '<link rel="stylesheet" href="/assets/css/report-dark-contract.css?v=1" data-report-dark-contract>'
JS_LINK = '<script src="/assets/js/report-dark-contract.js?v=1" data-report-dark-runtime></script>'

changed = 0
for path in TARGETS:
    if not path.exists():
        raise SystemExit(f"REPORT DARK CONTRACT FAIL: missing {path.relative_to(ROOT)}")

    html = path.read_text(encoding="utf-8")

    # Eliminate legacy LIGHT artifact state while retaining backward-compatible URLs.
    html = html.replace('data-theme="light"', 'data-theme="dark"')

    if 'data-report-dark-preflight' not in html:
        if '<head>' in html:
            html = html.replace('<head>', '<head>\n' + PREFLIGHT, 1)
        elif '<head ' in html:
            idx = html.find('>', html.find('<head '))
            if idx == -1:
                raise SystemExit(f"REPORT DARK CONTRACT FAIL: malformed head in {path.relative_to(ROOT)}")
            html = html[: idx + 1] + '\n' + PREFLIGHT + html[idx + 1 :]
        else:
            raise SystemExit(f"REPORT DARK CONTRACT FAIL: head missing in {path.relative_to(ROOT)}")

    if 'data-report-dark-contract' not in html:
        if '</head>' not in html:
            raise SystemExit(f"REPORT DARK CONTRACT FAIL: head close missing in {path.relative_to(ROOT)}")
        html = html.replace('</head>', CSS_LINK + '\n' + JS_LINK + '\n</head>', 1)

    path.write_text(html, encoding="utf-8")
    changed += 1

css = (ROOT / "assets" / "css" / "report-dark-contract.css").read_text(encoding="utf-8")
for required in (
    'html[data-report-surface="true"]',
    '[style*="background:#fff" i]',
    '#themeToggle',
    '@media print',
):
    if required not in css:
        raise SystemExit(f"REPORT DARK CONTRACT FAIL: CSS invariant missing {required}")

runtime = (ROOT / "assets" / "js" / "report-dark-contract.js").read_text(encoding="utf-8")
for required in ("MutationObserver", "data-report-surface", "data-theme", "classList.remove('light')"):
    if required not in runtime:
        raise SystemExit(f"REPORT DARK CONTRACT FAIL: runtime invariant missing {required}")

print(f"REPORT DARK CONTRACT PASS: {changed} report surfaces materialized dark-only.")
