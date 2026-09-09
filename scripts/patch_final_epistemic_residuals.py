#!/usr/bin/env python3
"""Normalize late-generated fixed-prompt specimen claims after all locale materializers.

The product may describe a repeatable provider-observation protocol, but public
specimens must not hard-code a 15-prompt / 15-buyer-question claim when current
SSOT caps observations differently. This pass is deliberately limited to that
claim family and does not alter measured scan findings or scores.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

EXACT = {
    '15 Alıcı Sorusu · 3 Tekrarlı Ölçüm': 'Yapılandırılmış Alıcı Soruları · Tekrarlı Ölçüm',
    '15 alıcı sorusu × 3 tekrarlı panel (ChatGPT Search, Perplexity, Gemini, Claude, Copilot) ve rakip eşitlik kıyaslaması.': 'Yapılandırılmış alıcı soruları, tekrarlı sağlayıcı-surface gözlemleri ve kanıta bağlı rakip eşitlik kıyaslaması.',
    '15 alıcı sorusu × 3 tekrarlı panel (ChatGPT Search, Perplexity, Gemini, Claude, Copilot) ve ampirik kanıt makbuzları.': 'Yapılandırılmış alıcı soruları ve tekrarlı sağlayıcı-surface gözlemleri; mevcut olduğunda ampirik kanıt makbuzlarıyla raporlanır.',
    'PARITY LOCKED (15 PROMPTS × 3 RUNS)': 'PARITY PROTOCOL · REPEATABLE OBSERVATIONS',
    'Rakipler, müşteriniz ile birebir aynı 15 alıcı sorusu, aynı 3 tekrarlı ölçüm pencereleri ve aynı deterministik kurallar ile test edilmiştir. Genel SEO tahminleri yerine kablo seviyesi telemetri farkı kanıtlanmıştır.': 'Rakip kıyası yalnız aynı yapılandırılmış sorgu protokolü ve aynı sağlayıcı-surface koşulları altında karşılaştırılır. Sağlayıcı gözlem kanıtı yoksa sonuç NOT_MEASURED olarak kalır.',
    '15 Buyer Questions · 3 Repeated Measurements': 'Structured Buyer Questions · Repeated Measurements',
    '15 buyer questions × 3 repeated panel': 'structured buyer questions with repeated provider-surface observations',
    '15 PROMPTS × 3 RUNS': 'REPEATABLE OBSERVATIONS',
}

# Catch remaining capitalization, punctuation and compound-copy variants without
# touching legitimate counts such as "15 findings" or "15 remediation roadmaps".
REGEX = [
    (re.compile(r'\b15\s+Alıcı\s+Sorusu\b', re.I), 'Yapılandırılmış Alıcı Soruları'),
    (re.compile(r'\b15\s+alıcı\s+sorusu\b', re.I), 'yapılandırılmış alıcı soruları'),
    (re.compile(r'\b15\s+Buyer\s+Questions?\b', re.I), 'Structured Buyer Questions'),
    (re.compile(r'\b15[- ]?prompts?\b', re.I), 'structured prompts'),
    (re.compile(r'\b15\s+neutral\s+prompts?\b', re.I), 'structured neutral prompts'),
    (re.compile(r'\b15\s+nötr\s+prompt\b', re.I), 'yapılandırılmış nötr sorgular'),
]

changed_files = 0
changed_occurrences = 0
for path in ROOT.rglob('*.html'):
    rel = path.relative_to(ROOT)
    if '.git' in rel.parts or 'node_modules' in rel.parts:
        continue
    text = path.read_text(encoding='utf-8', errors='ignore')
    original = text
    for old, new in EXACT.items():
        count = text.count(old)
        if count:
            changed_occurrences += count
            text = text.replace(old, new)
    for pattern, replacement in REGEX:
        text, count = pattern.subn(replacement, text)
        changed_occurrences += count
    if text != original:
        path.write_text(text, encoding='utf-8')
        changed_files += 1

print(f'FINAL EPISTEMIC RESIDUAL PATCH PASS: {changed_occurrences} fixed-prompt fragments normalized across {changed_files} public HTML files.')
