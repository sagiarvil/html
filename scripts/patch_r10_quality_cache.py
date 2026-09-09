from pathlib import Path
import re

TARGETS=[Path('index.html'),Path('tr/index.html'),Path('en/index.html')]
CACHE_KEY='r10-20260910-2000&amp;quality=001'
pattern=re.compile(r'ai-positioning\.js\?v=[^"\']+')
for path in TARGETS:
    text=path.read_text(encoding='utf-8')
    updated,count=pattern.subn(f'ai-positioning.js?v={CACHE_KEY}',text)
    if count!=1:
        raise SystemExit(f'R10 quality cache patch expected exactly one ai-positioning asset in {path}, got {count}')
    path.write_text(updated,encoding='utf-8')
print('R10 quality cache key applied to root/TR/EN homepages.')
