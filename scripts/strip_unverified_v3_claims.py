#!/usr/bin/env python3
"""Remove unsupported V3 claims from generated text/markup surfaces.

JavaScript is intentionally excluded here: broad prose regex over executable source
can corrupt template literals. Client runtime copy is handled separately by
patch_validator_v3_claims.py with exact, syntax-preserving replacements.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIRS = {'tr', 'en', 'llms', 'ai-report', 'enterprise-analyzer'}
PUBLIC_ROOTS = {'index.html', 'index.md', 'llms.txt', 'openapi.json', 'audit-profile.json', 'pricing.html', 'methodology.html', 'enterprise-analyzer.html'}


def is_public_text(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if path.suffix.lower() not in {'.html', '.md', '.json', '.txt'}:
        return False
    return rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts) > 1 and rel.parts[0] in PUBLIC_DIRS)


def normalize(text: str) -> str:
    direct = (
        ('14KB AST bütçe aşımı', 'ölçülen HTML yükü ve semantik yapı sorunları'),
        ('14KB AST Budama Şablonu', 'HTML Yük ve Semantik Yapı Optimizasyonu'),
        ('14KB AST budget window', 'measured HTML payload and semantic-structure budget'),
        ('14KB AST budget', 'measured HTML payload budget'),
        ('Sub-14KB AST Purge Template', 'HTML Payload & Semantic Structure Template'),
        ('14.336 baytlık pencere', 'ölçülen HTML ve semantik yapı'),
        ('14,336-byte window', 'measured HTML and semantic structure'),
        ('15-Prompt Canonical Inquiry Panel Breakdown', 'Canonical Inquiry Panel Breakdown'),
        ('PARITY LOCKED (15 PROMPTS × 3 RUNS)', 'PARITY LOCKED (EMPIRICAL CROSS-PROBES)'),
    )
    for old, new in direct:
        text = text.replace(old, new)

    # Generated prose only; executable JavaScript never enters this function.
    text = re.sub(
        r'(?i)(?:14\s*KB|14,?336\s*(?:bytes?|bayt))[^\n<">]{0,160}(?:AST|window|pencere|budget|bütçe|token|AI|yapay zeka)[^\n<">]{0,160}',
        'measured HTML payload, semantic structure and source-readiness evidence',
        text,
    )
    text = re.sub(
        r'(?i)(?:AST|window|pencere|budget|bütçe|token|AI|yapay zeka)[^\n<">]{0,160}(?:14\s*KB|14,?336\s*(?:bytes?|bayt))[^\n<">]{0,160}',
        'measured HTML payload, semantic structure and source-readiness evidence',
        text,
    )
    text = text.replace('14KB', 'measured HTML payload').replace('14kb', 'measured HTML payload')
    text = re.sub(r'(?i)14[,.]?336\s*(?:bytes?|bayt)', 'measured HTML payload', text)

    # Fixed prompt counts are not a production capability contract. Keep the
    # observation concept while removing unsupported cardinality claims.
    text = re.sub(r'(?i)\b15[- ]prompt\b', 'prompt', text)
    text = re.sub(r'(?i)15\s+nötr\s+prompt', 'nötr prompt', text)
    text = re.sub(r'(?i)15\s+neutral\s+prompt', 'neutral prompt', text)

    text = re.sub(
        r'(?i)Wikidata[^\n<]{0,180}(?:SPARQL|live|canlı|query|sorgu|verify|doğrula)[^\n<]{0,180}',
        'public entity and structured-data evidence',
        text,
    )
    text = re.sub(
        r'(?i)(?:SPARQL|live|canlı|query|sorgu|verify|doğrula)[^\n<]{0,180}Wikidata[^\n<]{0,180}',
        'public entity and structured-data evidence',
        text,
    )
    text = re.sub(
        r'(?i)Common Crawl[^\n<]{0,200}(?:live|canlı|CDX|pre.?training|ön.?eğitim|verify|doğrula)[^\n<]{0,200}',
        'public crawl and discovery evidence',
        text,
    )
    text = re.sub(
        r'(?i)\b(?:30|60)\s*(?:seconds?|saniye)(?:de|da)?\b[^\n<]{0,140}(?:apply|uygula|uygulama|zero.?code|sıfır.?kod)[^\n<]{0,100}',
        'implementation time depends on the customer stack and evidence scope',
        text,
    )
    return text


def normalize_markup(text: str) -> str:
    pattern = re.compile(r'(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)', re.DOTALL | re.IGNORECASE)
    parts = pattern.split(text)
    for i in range(0, len(parts), 2):
        parts[i] = normalize(parts[i])
    return ''.join(parts)


changed = 0
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public_text(path):
        continue
    old = path.read_text(encoding='utf-8', errors='ignore')
    if path.suffix.lower() == '.html':
        new = normalize_markup(old)
    else:
        new = normalize(old)
    if new != old:
        path.write_text(new, encoding='utf-8')
        changed += 1

print(f'UNVERIFIED V3 CLAIM STRIP PASS: normalized {changed} non-executable public files; JS preserved for syntax-safe patching.')
