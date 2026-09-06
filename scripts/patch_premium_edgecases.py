#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'en/index.html'
if p.exists():
    text=p.read_text(encoding='utf-8')
    start='<!-- 08 AUTHORITY & GUIDES -->'; end='<!-- 09 SHORT FAQ -->'
    if start in text and end in text:
        section='''<!-- 08 AUTHORITY & GUIDES -->
<section class="px-section" data-premium-infographic="knowledge"><div class="px-section-head"><span class="eyebrow">HTML&amp;HTML / 06</span><h2>Technical Guides &amp; Standards</h2><p>A reference layer that connects AI visibility to a learn → verify → implement → measure loop instead of jargon memorization.</p></div><div class="px-knowledge-flow"><article class="px-knowledge-step"><span class="num">01 · LEARN</span><h3>GEO · AEO · LLMO · AAO · RAG · E-E-A-T</h3><p>Understand emerging AI visibility concepts in plain language with evidence classes.</p><a href="/en/glossary/">Open the reference glossary →</a></article><article class="px-knowledge-step"><span class="num">02 · VERIFY</span><h3>llms.txt · robots · sitemap · schema</h3><p>Verify machine-readable surfaces with real HTTP and documented evidence.</p><a href="/en/llms-txt-validator/">Validate llms.txt →</a></article><article class="px-knowledge-step"><span class="num">03 · IMPLEMENT</span><h3>$99 Fix Mandate</h3><p>Turn the free diagnosis into an execution contract for a developer or AI coding agent.</p><a href="/en/fix-mandate/">Review delivery →</a></article><article class="px-knowledge-step"><span class="num">04 · MEASURE</span><h3>AI Mention Tracker</h3><p>Keep readiness separate from observed visibility; measure neutral-prompt brand visibility independently.</p><a href="/en/ai-mention-tracker/">Review visibility tracking →</a></article></div></section>
'''
        a=text.index(start); b=text.index(end,a)
        text=text[:a]+section+'\n'+text[b:]
        p.write_text(text,encoding='utf-8')
print('Premium edge-case patch applied.')
