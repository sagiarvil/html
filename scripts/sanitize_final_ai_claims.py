#!/usr/bin/env python3
"""Last-mile claim sanitizer for generated public production files.

Runs after all content/materialization steps and before the final verify-only gate.
Only unsupported fixed prompt cardinality is normalized here. Legitimate numeric
counts used by the sources, engine registry, pricing and delivery contracts are kept.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIRS = {'tr', 'en', 'llms', 'ai-report', 'enterprise-analyzer', 'assets'}
PUBLIC_ROOTS = {
    'index.html', 'index.md', 'llms.txt', 'openapi.json', 'audit-profile.json',
    'pricing.html', 'methodology.html', 'enterprise-analyzer.html',
    'blackbox-observation-contract.json',
}
TEXT_SUFFIXES = {'.html', '.md', '.json', '.txt', '.js'}
PATTERNS = [
    (re.compile(r'\b15[- ]prompt\b', re.I), 'prompt'),
    (re.compile(r'15\s+nötr\s+prompt', re.I), 'nötr prompt'),
    (re.compile(r'15\s+neutral\s+prompt', re.I), 'neutral prompt'),
    (re.compile(r'\b15\s+(?:buyer|alıcı)\s+(?:intent\s+)?(?:prompts?|sorusu)', re.I), 'buyer-intent prompt set'),
]

def is_public(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if path.suffix.lower() not in TEXT_SUFFIXES:
        return False
    return rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts) > 1 and rel.parts[0] in PUBLIC_DIRS)

changed = 0
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path):
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    new = text
    for pattern, replacement in PATTERNS:
        new = pattern.sub(replacement, new)
    if new != text:
        path.write_text(new, encoding='utf-8')
        changed += 1

remaining = []
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path):
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    for pattern, _ in PATTERNS:
        if pattern.search(text):
            remaining.append(path.relative_to(ROOT).as_posix())
            break
if remaining:
    raise SystemExit('FINAL AI CLAIM SANITIZER FAIL: ' + ', '.join(sorted(remaining)[:20]))
print(f'FINAL AI CLAIM SANITIZER PASS: {changed} public file(s) normalized; no unsupported fixed prompt cardinality remains.')
