#!/usr/bin/env python3
"""Attach the canonical AI-search opportunity layer to generated LLMS.TXT News surfaces.

News remains editorial-first: article pages only mark the existing end-of-article scan CTA
as the single commercial-intent surface. Hubs retain their existing static intent marker.
All generated news surfaces receive the shared commercial-intent CSS; no paid remediation
or duplicate marketing section is injected into article bodies.
"""
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
CSS='<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2">'
roots=[ROOT/'tr/llms-txt-haberler',ROOT/'en/llms-txt-news']
changed=0
checked=0
for base in roots:
    if not base.exists():
        continue
    pages=[base/'index.html',*base.glob('*/index.html')]
    for p in pages:
        if not p.exists():
            continue
        checked+=1
        text=p.read_text(encoding='utf-8')
        if '/assets/css/commercial-intent.css?v=2' not in text and '</head>' in text:
            text=text.replace('</head>',CSS+'</head>',1)
        if p.parent!=base and 'data-commercial-intent="static"' not in text:
            text=text.replace('<section class="news-cta">','<section class="news-cta" data-commercial-intent="static">',1)
        if 'data-commercial-intent="static"' not in text:
            raise SystemExit(f'NEWS COMMERCIAL INTENT FAIL: canonical static intent marker missing in {p.relative_to(ROOT)}')
        if '/assets/css/commercial-intent.css?v=2' not in text:
            raise SystemExit(f'NEWS COMMERCIAL INTENT FAIL: shared CSS missing in {p.relative_to(ROOT)}')
        old=p.read_text(encoding='utf-8')
        if old!=text:
            p.write_text(text,encoding='utf-8');changed+=1
print(f'NEWS COMMERCIAL INTENT PASS: {checked} news surfaces verified; {changed} materialized with editorial-safe intent/CSS contract.')
