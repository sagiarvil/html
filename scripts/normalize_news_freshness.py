#!/usr/bin/env python3
from pathlib import Path
import json,re

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'data/llms-news.json').read_text(encoding='utf-8'))
last=str(data.get('lastUpdated') or '').strip()[:10]
if not re.fullmatch(r'\d{4}-\d{2}-\d{2}',last):
    raise SystemExit('Invalid data/llms-news.json lastUpdated; refusing to fabricate sitemap freshness')
p=ROOT/'sitemap.xml';text=p.read_text(encoding='utf-8')
for loc in ['https://htmlandhtml.com/tr/llms-txt-haberler/','https://htmlandhtml.com/en/llms-txt-news/']:
    pattern=rf'(<url><loc>{re.escape(loc)}</loc><lastmod>)\d{{4}}-\d{{2}}-\d{{2}}(</lastmod>)'
    text,n=re.subn(pattern,rf'\g<1>{last}\2',text,count=1)
    if n!=1:raise SystemExit(f'News hub sitemap entry missing for freshness normalization: {loc}')
p.write_text(text,encoding='utf-8')
print(f'LLMS NEWS FRESHNESS PASS: hub lastmod={last} reflects editorial data, not build time.')
