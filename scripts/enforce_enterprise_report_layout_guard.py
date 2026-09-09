#!/usr/bin/env python3
"""Materialize the Enterprise Analyzer viewport guard after locale generation.

The locale builder rewrites both EN/TR report files during every commercial build.
Inject the dedicated layout stylesheet after that step so the final rendered
artifact, not merely the repository source, carries the viewport contract.
"""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINK = '<link rel="stylesheet" href="/assets/css/enterprise-report-layout-guard.css?v=1" data-enterprise-layout-guard>'
TARGETS = (
    ROOT / 'enterprise-analyzer' / 'htmlandhtml-ai-report.html',
    ROOT / 'enterprise-analyzer' / 'htmlandhtml-ai-report-LIGHT.html',
    ROOT / 'tr' / 'enterprise-analyzer' / 'htmlandhtml-ai-report.html',
    ROOT / 'tr' / 'enterprise-analyzer' / 'htmlandhtml-ai-report-LIGHT.html',
)

changed = 0
for path in TARGETS:
    if not path.exists():
        raise SystemExit(f'ENTERPRISE REPORT LAYOUT GUARD FAIL: missing {path.relative_to(ROOT)}')
    html = path.read_text(encoding='utf-8')
    if 'data-enterprise-layout-guard' not in html:
        if '</head>' not in html:
            raise SystemExit(f'ENTERPRISE REPORT LAYOUT GUARD FAIL: head close missing in {path.relative_to(ROOT)}')
        html = html.replace('</head>', LINK + '\n</head>', 1)
        path.write_text(html, encoding='utf-8')
        changed += 1

css = (ROOT / 'assets' / 'css' / 'enterprise-report-layout-guard.css').read_text(encoding='utf-8')
for required in (
    '.topbar .topbar-shell',
    '.topbar .theme-toggle-btn .theme-label',
    '.ea-data-table-wrapper',
    '.evidence-box',
):
    if required not in css:
        raise SystemExit(f'ENTERPRISE REPORT LAYOUT GUARD FAIL: CSS invariant missing {required}')

print(f'ENTERPRISE REPORT LAYOUT GUARD PASS: stylesheet linked on {len(TARGETS)} report surfaces; {changed} materialized this run.')
