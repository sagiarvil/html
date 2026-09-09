#!/usr/bin/env python3
"""Verify the final materialized public state after every mutating build step."""
from __future__ import annotations
from pathlib import Path
import json
import re
import enterprise_analyzer_locale_core as locale_core

ROOT=Path(__file__).resolve().parents[1]
PUBLIC_DIRS={'tr','en','llms','ai-report','enterprise-analyzer','assets'}
PUBLIC_ROOTS={'index.html','index.md','llms.txt','openapi.json','audit-profile.json','pricing.html','methodology.html','enterprise-analyzer.html','blackbox-observation-contract.json'}
BANNED={
 'legacy Engine V2 public claim':r'\bEngine V2(?:\.1\.0)?\b',
 'legacy 120-control claim':r'\b120\s+(?:deep\s+)?(?:checks|controls)|\b120\s+(?:derin\s+)?kontrol',
 'legacy 43-page claim':r'\b43[- ]page|\b43\s+sayfa',
 'legacy fixed 22-file claim':r'\b22[- ]file|\b22\s+dosya',
 'unverified fixed prompt claim':r'\b15[- ]prompt|15\s+nötr\s+prompt|15\s+neutral\s+prompt|\b15\s+(?:buyer|alıcı)\s+(?:intent\s+)?(?:prompts?|sorusu)',
 'unverified first-window claim':r'14(?:,?336|KB)[^\n<]{0,100}(?:AST|window|pencere|budget|bütçe|token)',
 'unverified live Wikidata query claim':r'(?:Wikidata[^\n<]{0,100}(?:SPARQL|query|sorgu)|(?:SPARQL|query|sorgu)[^\n<]{0,100}Wikidata)',
 'unverified Common Crawl live verification':r'Common Crawl[^\n<]{0,120}(?:live|canlı|verify|doğrula)',
 'fixed implementation-speed promise':r'\b(?:30|60)\s*(?:seconds?|saniye)(?:de|da)?\b[^\n<]{0,100}(?:apply|uygula|uygulama|zero.?code|sıfır.?kod)',
 'world-first claim':r'(?:world.?s first|dünyanın ilk)',
}
GUARANTEE=re.compile(r'\b(?:guarantee(?:d|s)?|garanti)\b[^\n<]{0,80}\b(?:citation|ranking|recommendation|atıf|sıralama|tavsiye)\b',re.I)
NEGATED_GUARANTEE=re.compile(
 r'(?:\b(?:no|not|never|cannot|can\x27t|doesn\x27t|does\s+not|do\s+not|without)\b[^\n<.!?]{0,80}\bguarantee(?:d|s)?\b'
 r'|\b(?:is|are|was|were)\s+not\s+guaranteed\b'
 r'|\bguarantee(?:d|s)?\b[^\n<.!?]{0,80}\b(?:not|never|none|no)\b'
 r'|\bgaranti\b[^\n<.!?]{0,80}\b(?:değil|edilmez|verilmez|vermez|yok|etmez)\b)',re.I)

def is_public(path:Path)->bool:
 rel=path.relative_to(ROOT)
 if path.suffix.lower() not in {'.html','.md','.json','.js','.txt'}: return False
 return rel.as_posix() in PUBLIC_ROOTS or (len(rel.parts)>1 and rel.parts[0] in PUBLIC_DIRS)

def verify_locale(errors:list[str])->None:
 for filename,_,_ in locale_core.PAGES:
  en_path=ROOT/'enterprise-analyzer'/filename; tr_path=ROOT/'tr'/'enterprise-analyzer'/filename
  for locale,path in (('en',en_path),('tr',tr_path)):
   if not path.exists(): errors.append(f'locale surface missing: {path.relative_to(ROOT)}'); continue
   source=path.read_text(encoding='utf-8',errors='ignore')
   if f'<html lang="{locale}"' not in source: errors.append(f'html lang mismatch: {path.relative_to(ROOT)} expected {locale}')
   leaks=locale_core.purity_leaks(source,locale)
   if leaks: errors.append(f'locale leak: {path.relative_to(ROOT)} {locale}: {leaks[:8]}')

def has_positive_guarantee(text:str)->bool:
 for m in GUARANTEE.finditer(text):
  context=text[max(0,m.start()-100):min(len(text),m.end()+100)]
  if NEGATED_GUARANTEE.search(context): continue
  return True
 return False

def verify_claims(errors:list[str])->None:
 for path in ROOT.rglob('*'):
  if not path.is_file() or not is_public(path): continue
  rel=path.relative_to(ROOT).as_posix(); text=path.read_text(encoding='utf-8',errors='ignore')
  skip_v2=rel in {'assets/js/enterprise-theme-engine.js','assets/js/feature-flags.js'}
  for label,pattern in BANNED.items():
   if label=='legacy Engine V2 public claim' and skip_v2: continue
   if re.search(pattern,text,re.I): errors.append(f'{label}: {rel}')
  if has_positive_guarantee(text): errors.append(f'guaranteed external AI outcome: {rel}')

def verify_blackbox(errors:list[str])->None:
 profile_path=ROOT/'audit-profile.json'; contract_path=ROOT/'blackbox-observation-contract.json'
 if not contract_path.exists(): errors.append('blackbox-observation-contract.json missing'); return
 profile=json.loads(profile_path.read_text(encoding='utf-8')); contract=json.loads(contract_path.read_text(encoding='utf-8'))
 layer=profile.get('advancedBlackBoxRiskLayer') or {}; expected=['query_fanout_coverage','citation_volatility','crawler_policy_divergence','render_retrieval_gap','entity_identity_drift','agent_action_friction']
 if layer.get('analysisCount')!=6 or contract.get('analysisCount')!=6: errors.append('blackbox analysis count drift')
 if layer.get('analyses')!=expected or [x.get('key') for x in contract.get('analyses',[])]!=expected: errors.append('blackbox analysis registry drift')
 if contract.get('scoreEffect')!='NONE': errors.append('blackbox layer must have zero canonical score effect')
 boundary=str(contract.get('nonClaim',''))
 if not re.search(r'proprietary transformer weights',boundary,re.I) or not re.search(r'neither accessed nor inferred as fact',boundary,re.I): errors.append('blackbox non-secret-access boundary missing')
 orchestration=contract.get('orchestrationContract') or {}
 if orchestration.get('dlq',{}).get('effectOnScore')!='NONE': errors.append('blackbox DLQ must not affect canonical score')
 if int(orchestration.get('retryPolicy',{}).get('maxRetries',99))>2: errors.append('blackbox retry budget is unbounded')

def verify_scan_report_state(errors:list[str])->None:
 runtime=(ROOT/'assets/js/ai-positioning.js').read_text(encoding='utf-8')
 required=["dataset.scanView=active?'report':'landing'","scanner.insertAdjacentElement('afterend',result)",'html[data-scan-view="report"] #result .mandate-card{display:none!important}','html[data-scan-view="report"] #result .result-columns{grid-template-columns:minmax(0,1fr)!important;gap:0!important}']
 for marker in required:
  if marker not in runtime: errors.append(f'scan report state marker missing: {marker}')
 for rel in ('index.html','tr/index.html','en/index.html'):
  html=(ROOT/rel).read_text(encoding='utf-8')
  if 'id="scanner"' not in html or 'id="result"' not in html: errors.append(f'{rel}: scanner/result sentinel missing')
  if '/assets/js/ai-positioning.js' not in html: errors.append(f'{rel}: ai-positioning runtime missing')

def main()->None:
 errors=[]; verify_locale(errors); verify_claims(errors); verify_blackbox(errors); verify_scan_report_state(errors)
 if errors: raise SystemExit('FINAL PUBLIC CONTRACT FAIL\n- '+'\n- '.join(errors[:160]))
 print('FINAL PUBLIC CONTRACT PASS: locale purity, epistemic claims, six-area black-box protocol and scan report-state invariants verified after all materializers.')
if __name__=='__main__': main()
