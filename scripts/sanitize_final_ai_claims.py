#!/usr/bin/env python3
"""Final bounded cleanup for unsupported fixed AI-observation cardinality claims.

Runs after all public materializers. It changes only explicit fixed-count prompt
phrases; provider-backed observations remain available without an invented count.
"""
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
PUBLIC_DIRS={'tr','en','llms','ai-report','enterprise-analyzer','assets'}
PUBLIC_ROOTS={'index.html','index.md','llms.txt','openapi.json','audit-profile.json','pricing.html','methodology.html','enterprise-analyzer.html','blackbox-observation-contract.json'}

def is_public(path:Path)->bool:
    rel=path.relative_to(ROOT)
    if path.suffix.lower() not in {'.html','.md','.json','.js','.txt'}: return False
    return rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts)>1 and rel.parts[0] in PUBLIC_DIRS)

rules=[
    (re.compile(r'(?i)\b15[- ]prompt\b'),'provider-backed query'),
    (re.compile(r'(?i)15\s+nötr\s+prompt'),'nötr sorgu'),
    (re.compile(r'(?i)15\s+neutral\s+prompt'),'neutral query'),
    (re.compile(r'(?i)\b15\s+buyer\s+(?:intent\s+)?prompts?\b'),'versioned buyer-intent queries'),
    (re.compile(r'(?i)\b15\s+alıcı\s+sorusu\b'),'sürümlenmiş alıcı sorguları'),
]
changed=0
for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path): continue
    text=path.read_text(encoding='utf-8',errors='ignore')
    out=text
    for pattern,replacement in rules: out=pattern.sub(replacement,out)
    if out!=text:
        path.write_text(out,encoding='utf-8')
        changed+=1

remaining=[]
check=re.compile(r'(?i)\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt|\b15\s+(?:buyer|alıcı)\s+(?:intent\s+)?(?:prompts?|sorusu)')
for path in ROOT.rglob('*'):
    if path.is_file() and is_public(path) and check.search(path.read_text(encoding='utf-8',errors='ignore')):
        remaining.append(path.relative_to(ROOT).as_posix())
if remaining: raise SystemExit('FINAL AI CLAIM SANITIZER FAIL: '+', '.join(remaining[:20]))
print(f'FINAL AI CLAIM SANITIZER PASS: {changed} public file(s) normalized; no unsupported fixed prompt cardinality remains.')
