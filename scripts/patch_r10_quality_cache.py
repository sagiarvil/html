from pathlib import Path
import re

TARGETS=[Path('index.html'),Path('tr/index.html'),Path('en/index.html')]
AI='r10-20260910-2000&amp;quality=002'
HOTFIX='/assets/js/r10-quality-hotfix.js?v=20260910-001'
for path in TARGETS:
    text=path.read_text(encoding='utf-8')
    text=re.sub(r'\n?<script src="/assets/js/r10-quality-hotfix\.js\?v=[^"]+" defer></script>','',text)
    pattern=re.compile(r'<script src="/assets/js/ai-positioning\.js\?v=[^"]+" defer></script>')
    replacement=f'<script src="/assets/js/ai-positioning.js?v={AI}" defer></script>\n<script src="{HOTFIX}" defer></script>'
    updated,count=pattern.subn(replacement,text)
    if count!=1:
        raise SystemExit(f'R10 quality patch expected one ai-positioning asset in {path}, got {count}')
    path.write_text(updated,encoding='utf-8')
print('R10 quality hotfix and cache keys applied to root/TR/EN homepages.')
