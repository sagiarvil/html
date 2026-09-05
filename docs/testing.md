# Test Strategy

## Static integrity

Checks required files, bilingual UI, price boundary, Firebase routing, registry/rule-set presence, SSRF controls and absence of legacy template-store references.

## llms.txt fixtures

CommonMark AST fixtures cover valid v2 shape, missing/multiple H1, invalid H2 file lists, duplicates, non-normative frontmatter handling and path-specific discovery.

## Runtime compile

Both Cloudflare-compatible function surface and canonical Firebase Functions bundles must compile.

## Production smoke

After deployment, the external domain must prove current UI, documentation, health contract, formal llms audit, 12-engine scan, SSRF fail-closed recurrence and paid entitlement fail-closed behavior.
