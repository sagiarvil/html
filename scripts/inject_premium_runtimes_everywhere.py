from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

JS = """<script src="/assets/js/enterprise-runtime.js?v=4"></script>
<script src="/assets/js/mobile-space-runtime.js?v=hh3" defer></script>"""

CSS = '<link rel="stylesheet" href="/assets/css/mobile-space-grade.css?v=21">'

count = 0
for p in ROOT.rglob('*.html'):
    if 'node_modules' in p.parts or '.git' in p.parts or 'tests' in p.parts: continue
    text = p.read_text(encoding='utf-8')
    changed = False

    # Clean old versions
    import re
    text = re.sub(r'<link rel="stylesheet" href="/assets/css/mobile-space-grade\.css[^>]*>\n?', '', text)
    text = re.sub(r'<script src="/assets/js/enterprise-runtime\.js[^>]*></script>\n?', '', text)
    text = re.sub(r'<script src="/assets/js/mobile-space-runtime\.js[^>]* defer></script>\n?', '', text)

    # Inject new ones
    if '</head>' in text:
        text = text.replace('</head>', f'{CSS}\n</head>')
        changed = True
    
    if '</body>' in text:
        text = text.replace('</body>', f'{JS}\n</body>')
        changed = True

    if changed:
        p.write_text(text, encoding='utf-8')
        count += 1

print(f"Injected premium runtimes into {count} files.")
