from pathlib import Path
import re

TARGETS=[Path('index.html'),Path('tr/index.html'),Path('en/index.html')]
AI='r10-20260910-2355&amp;quality=005'
HOTFIX='/assets/js/r10-quality-hotfix.js?v=20260910-005'
STYLE='/assets/css/r10-report-ux.css?v=20260910-001'
for path in TARGETS:
    text=path.read_text(encoding='utf-8')
    text=re.sub(r'\n?<script src="/assets/js/r10-quality-hotfix\.js\?v=[^"]+" defer></script>','',text)
    text=re.sub(r'\n?<link rel="stylesheet" href="/assets/css/r10-report-ux\.css\?v=[^"]+">','',text)
    pattern=re.compile(r'<script src="/assets/js/ai-positioning\.js\?v=[^"]+" defer></script>')
    replacement=f'<script src="/assets/js/ai-positioning.js?v={AI}" defer></script>\n<script src="{HOTFIX}" defer></script>'
    updated,count=pattern.subn(replacement,text)
    if count!=1:
        raise SystemExit(f'R10 quality patch expected one ai-positioning asset in {path}, got {count}')
    if '</head>' not in updated:
        raise SystemExit(f'R10 report UX patch requires </head> in {path}')
    updated=updated.replace('</head>',f'<link rel="stylesheet" href="{STYLE}">\n</head>',1)
    path.write_text(updated,encoding='utf-8')
print('R10 quality hotfix, 23:55 campaign window, light report UX and cache keys applied to root/TR/EN homepages.')
