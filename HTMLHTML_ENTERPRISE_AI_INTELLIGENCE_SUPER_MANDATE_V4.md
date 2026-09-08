# HTML&HTML — ENTERPRISE AI INTELLIGENCE SUPER-MANDATE V4.0

**Document Code:** `HTMLHTML-EAI-2026-V4`  
**Status:** `MANDATORY / PRODUCTION-GRADE / ZERO-FABRICATION`  
**Repository:** `https://github.com/sagiarvil/html`  
**Allowed repository:** `sagiarvil/html` only  
**Source of truth branch:** `main`  
**Production:** `https://htmlandhtml.com`  
**Scope:** Free Evidence Audit + $99 Engineering Fix Mandate + $999 Enterprise AI Intelligence Audit  
**Execution model:** Deterministic engineering + controlled probabilistic observation + n8n-style orchestration  
**Primary roles:** Principal Architect / Senior SRE / AI Search Intelligence Engineer / Incident Responder / Data & Evidence Engineer  
**Supersedes:** Any prior mandate clause that conflicts with this document’s truth, evidence, safety, scoring, or product-separation rules.

---

# 0. EXECUTIVE DECISION

HTML&HTML MUST NOT sell a larger collection of technical checks as a "$999 AI Visibility Audit."

The $999 product MUST answer five management questions with reproducible evidence:

1. **Where are we actually visible or absent across AI answer surfaces?**
2. **Which named competitors are being mentioned, recommended, or cited instead of us?**
3. **Which sources are causing those competitors to win?**
4. **Which minimum technical/content/entity interventions have the highest expected business impact?**
5. **Did the intervention measurably change the outcome under the same observation protocol?**

The product architecture is therefore:

```text
PUBLIC WEBSITE
      │
      ├── PLANE A — DETERMINISTIC TECHNICAL READINESS
      │     Crawl / HTTP / HTML / robots / canonical / schema / accessibility /
      │     machine-readable surfaces / performance / security / agent operability
      │
      ├── PLANE B — OBSERVED AI ANSWER INTELLIGENCE
      │     Prompt panel / AI surface runs / mentions / citations / recommendations /
      │     competitors / source graph / hallucinations / volatility
      │
      └── PLANE C — DECISION & REMEDIATION INTELLIGENCE
            Root-cause clustering / source capture / vertical vector /
            opportunity priority / implementation mandate / validation / re-scan
```

**Non-negotiable commercial distinction:**

```text
FREE
Evidence Snapshot
"What is measurably wrong?"

$99
Engineering Fix Mandate
"What must engineering change and how is it validated?"

$999
Enterprise AI Intelligence Audit
"Where are we losing AI demand, who is capturing it, why are they winning,
what should change first, and did the change produce measurable movement?"
```

The existing $99 package remains a remediation product.  
The $999 product is an intelligence + evidence + decision system.

---

# 1. CONSTITUTION — ZERO-FABRICATION RULES

## 1.1 Evidence classes

Every claim, rule, score input, recommendation, and report statement MUST carry one of these classes:

```text
OFFICIAL_STANDARD
OFFICIAL_VENDOR
OBSERVED
MEASURED
INTERNAL_HEURISTIC
PROPOSAL
EXPERIMENTAL
REQUIRES_CONTEXT
REQUIRES_COUNSEL
NOT_APPLICABLE
NOT_MEASURED
```

No other class may be invented without modifying the central schema.

### Definitions

**OFFICIAL_STANDARD**  
Published normative standard or protocol from an authoritative standards body/specification.

**OFFICIAL_VENDOR**  
Current documented behavior or requirement published by the relevant platform/provider.

**OBSERVED**  
Captured behavior from a real, timestamped execution against the named target/surface.

**MEASURED**  
Numerical result derived from raw evidence using a documented deterministic formula.

**INTERNAL_HEURISTIC**  
HTML&HTML proprietary decision heuristic. It MUST NOT be represented as an external ranking factor or vendor requirement.

**PROPOSAL**  
Emerging proposal/convention not established as a normative standard.

**EXPERIMENTAL**  
Research or optional future-facing control with insufficient evidence for production scoring.

**REQUIRES_CONTEXT**  
Cannot be determined from URL-only scanning; codebase, account, business process, or implementation context is required.

**REQUIRES_COUNSEL**  
Legal/compliance conclusion requires qualified legal review for the relevant jurisdiction and facts.

**NOT_APPLICABLE**  
Control has no rational applicability to the target business/site.

**NOT_MEASURED**  
The system lacks sufficient valid evidence. No score penalty and no fabricated substitute.

---

## 1.2 Forbidden transformations

The system MUST NOT:

- Convert `NOT_MEASURED` into PASS or FAIL.
- Convert correlation into causation.
- Convert an internal heuristic into a vendor ranking factor.
- Convert a proposal into an RFC/standard.
- Convert a static JSON file into a live protocol implementation.
- Convert a search URL into a verified entity identifier.
- Convert synthetic fixture output into empirical production evidence.
- Convert a simulated score projection into a measured before/after result.
- Convert a successful HTTP request into proof of AI citation/recommendation.
- Convert an AI mention into a citation if no source/citation is present.
- Convert a citation into a recommendation.
- Convert one AI response into a stable visibility conclusion.
- Convert robots.txt configuration into a legal conclusion.
- Convert OpenAPI into A2A or MCP readiness.
- Claim C2PA implementation without a verifiable signed C2PA Manifest/Content Credential.
- Claim Google Knowledge Panel "activation" or "guarantee."
- Auto-create or auto-publish third-party profiles/entities merely to manufacture authority.
- Circumvent CAPTCHAs, anti-bot controls, provider terms, authentication boundaries, or rate limits.

---

## 1.3 Current protocol truth locks

These are governance rules, not permanent facts. They MUST be revalidated against official sources before production rule changes.

### OpenAI
Search visibility controls MUST distinguish at least:
- `OAI-SearchBot` — search/discovery/citation eligibility.
- `GPTBot` — potential training/model-development crawling.
- User-triggered access — separate from automatic search crawling where documented.

Never treat GPTBot as the sole ChatGPT Search visibility control.

### Anthropic
Crawler policy MUST distinguish:
- `ClaudeBot`
- `Claude-User`
- `Claude-SearchBot`

Do not collapse them into one "Claude crawler" control.

### Google
`Google-Extended` MUST NOT be scored as a Google Search ranking/indexing control. It is a separate content-use control documented by Google.

### Perplexity
Use the current official Perplexity crawler policy and robots behavior. If documentation changes, source freshness governance applies.

### llms.txt
`llms.txt` is classified `PROPOSAL`, not `OFFICIAL_STANDARD`.  
Its presence MAY be measured as agent-readability/discovery support but MUST NOT receive a fabricated ranking guarantee.

### A2A
A2A Agent Card discovery and protocol capability MUST be assessed separately.  
A static `/.well-known/agent-card.json` is discovery metadata, not proof that tasks/actions execute successfully.

### MCP
A design/spec file is not a live MCP server.  
A production MCP readiness PASS requires a functioning MCP endpoint/tool/resource behavior and applicable security controls.

### C2PA
A Schema.org field named "c2pa" is not a Content Credential.  
C2PA PASS requires actual verifiable provenance data according to the current C2PA specification.

---

# 2. SINGLE SOURCE OF TRUTH

## 2.1 Repository rule

Only:

```text
https://github.com/sagiarvil/html
```

may be used for this project.

No second repo.  
No shadow source-of-truth.  
No production changes that exist only in a local branch.  
`main` is the canonical production truth unless the user explicitly changes this policy.

---

## 2.2 Canonical registries

The system MUST maintain machine-readable registries for:

```text
/src/intelligence/rules-registry.*
/src/intelligence/source-registry.*
/src/intelligence/surface-registry.*
/src/intelligence/prompt-registry.*
/src/intelligence/vertical-registry.*
/src/intelligence/scoring-registry.*
/src/intelligence/deliverables-registry.*
```

Equivalent existing paths may be reused if they already serve the same role.  
Do not duplicate registries merely to satisfy naming.

Every rule record MUST include at least:

```json
{
  "ruleId": "string",
  "version": "semver",
  "title": "string",
  "plane": "TECHNICAL|OBSERVATION|DECISION",
  "evidenceClass": "OFFICIAL_STANDARD|OFFICIAL_VENDOR|OBSERVED|MEASURED|INTERNAL_HEURISTIC|PROPOSAL|EXPERIMENTAL|REQUIRES_CONTEXT|REQUIRES_COUNSEL|NOT_APPLICABLE|NOT_MEASURED",
  "sourceIds": ["string"],
  "applicability": ["string"],
  "measurement": "string",
  "failureMeaning": "string",
  "scoreImpact": "number|null",
  "confidencePolicy": "string",
  "lastVerifiedAt": "ISO-8601",
  "maxSourceAgeDays": 45
}
```

If the source is stale beyond the configured age, the rule MUST automatically move to `REQUIRES_SOURCE_REVIEW` and MUST NOT remain a silent hard-scoring rule.

---

# 3. PRODUCT SEPARATION

## 3.1 FREE — Evidence Snapshot

Free output MAY expose:

- Issue title
- Severity
- Affected URL(s)
- Raw/normalized evidence
- Evidence class
- Official source reference where applicable
- Confidence
- Business-language impact phrased conservatively
- Whether the issue is measured, inferred, proposal, or unknown

Free output MUST NOT expose:

- Proprietary scoring weights
- Root-cause graph logic
- Exact fix code
- Patch/diff
- Exact implementation sequence
- n8n workflow internals
- Prompt ontology
- Competitor/source-capture algorithm
- Opportunity Priority formula weights
- Internal thresholds
- Acceptance suite implementation
- Rollback implementation

The free product proves the problem without disclosing the trade secret.

---

## 3.2 $99 — Engineering Fix Mandate

The existing remediation package remains.

It MUST contain:

- Deduplicated root causes
- P0–P3 implementation order
- Root fix
- Recovery
- Prevention
- Acceptance tests
- Regression tests
- Rollback
- Stop conditions
- Configuration/code templates where valid
- `REQUIRES_CONTEXT` where URL-only evidence cannot determine an exact implementation
- No fake "45 minute" certainty without codebase/context
- No invented technology assumptions

The existing 22-file package may be expanded only when a new file has a distinct operational function. File count is never a value metric.

---

## 3.3 $999 — Enterprise AI Intelligence Audit

The $999 entitlement unlocks the full system described below.

Minimum premium deliverables MUST include:

```text
premium/
  30_EXECUTIVE_DECISION_MEMO.md
  31_PROMPT_PANEL.json
  32_AI_ENGINE_OBSERVATIONS.ndjson
  33_AI_SHARE_OF_VOICE.csv
  34_ENGINE_DIVERGENCE.json
  35_COMPETITOR_GAP_MATRIX.csv
  36_CITATION_SOURCE_GRAPH.json
  37_SOURCE_CAPTURE_TARGETS.md
  38_ENTITY_VERIFICATION_DOSSIER.md
  39_ENTITY_CONFLICT_LEDGER.json
  40_AI_CRAWLER_POLICY_MATRIX.json
  41_AI_TDM_GOVERNANCE_DOSSIER.md
  42_VERTICAL_VECTOR_PACK.json
  43_BEFORE_AFTER_PROTOCOL.md
  44_RUNTIME_EVIDENCE_INDEX.json
  45_N8N_AI_INTELLIGENCE_WORKFLOW.json
  46_N8N_RUNBOOK.md
  47_N8N_DLQ_PROOF.json
  48_ROOT_CAUSE_GRAPH.json
  49_OPPORTUNITY_PRIORITY.json
  50_BASELINE_MEASUREMENT.json
  51_RESCAN_DELTA_REPORT.md
  52_AUDIT_TRAIL.json
  53_PACKAGE_MANIFEST.json
```

If a premium deliverable has no valid measurement, it MUST be present with a truthful status such as `NOT_MEASURED`, `NOT_APPLICABLE`, or `REQUIRES_CONTEXT`; it MUST NOT be omitted in a way that hides coverage failure.

---

# 4. PREMIUM LAYER 1 — AI ANSWER OBSERVATORY

This is the primary difference between technical readiness and real AI visibility.

## 4.1 Required surfaces

Target measurement set SHOULD include, where a provider-compliant measurement method is available:

- ChatGPT Search
- Perplexity
- Claude search/retrieval surface
- Gemini / Google AI surface
- Microsoft Copilot

Additional surfaces may be enabled from the surface registry.

No surface may be covertly scraped or accessed by bypassing provider controls.  
If a valid programmatic measurement path is not available:

```text
status = NOT_MEASURED
reason = PROVIDER_COMPLIANT_AUTOMATION_UNAVAILABLE
```

Never fake completeness.

---

## 4.2 Prompt panel

Each audit MUST create a stable buyer-question panel.

Default:

```text
12–20 category-defining prompts
70–80% non-branded
20–30% branded/verification
3 independent runs per prompt/surface
```

Prompt families:

```text
DISCOVERY
"Who provides X?"
"Best X provider for Y?"

COMPARISON
"X vs Y"
"Alternatives to X"

PURCHASE / DECISION
"Which X should I choose for Y?"
"What does X cost?"
"Which provider supports Z?"

VALIDATION
"What is Brand X?"
"Does Brand X support Y?"

RISK / TRUST
"Is Brand X reliable for Y?"
"What are the limitations of Brand X?"
```

Prompt text MUST be frozen for longitudinal comparisons.  
Changing the prompt invalidates direct before/after trend comparison for that prompt.

---

## 4.3 Raw observation receipt

Every run MUST persist:

```json
{
  "observationId": "sha256",
  "domain": "example.com",
  "brand": "Brand",
  "promptId": "BUY-COMPARE-004",
  "promptVersion": "1.0.0",
  "surfaceId": "chatgpt-search",
  "surfaceVersion": "where observable",
  "run": 1,
  "timestamp": "ISO-8601",
  "responseTextHash": "sha256",
  "rawResponseLocation": "secured-reference",
  "brandMentioned": true,
  "brandCited": false,
  "brandRecommended": false,
  "competitorsMentioned": ["A", "B"],
  "citations": [],
  "verifiableClaims": [],
  "hallucinatedClaims": [],
  "measurementMethod": "PROVIDER_API|COMPLIANT_BROWSER|HITL|OTHER",
  "confidence": 0.0
}
```

Raw evidence MUST be immutable or content-addressed.

---

# 5. PREMIUM LAYER 2 — SHARE OF VOICE & RECOMMENDATION

The system MUST report separate metrics.

## 5.1 Mention Rate

```text
MentionRate =
brand-mentioned eligible observations
/
all eligible observations
```

## 5.2 Citation Rate

```text
CitationRate =
observations where brand-owned or brand-relevant source is explicitly cited
/
citation-capable eligible observations
```

## 5.3 Recommendation Rate

```text
RecommendationRate =
observations where the brand is explicitly recommended or selected
/
recommendation-intent eligible observations
```

## 5.4 Competitive Share of Answer

```text
ShareOfAnswer =
brand recommendation/selection events
/
all named competitor + brand recommendation/selection events
```

This is an HTML&HTML measured market metric, not a vendor ranking factor.

---

# 6. PREMIUM LAYER 3 — 12-WEEK DARK POOL MONITOR

`21_DARK_POOL_HALLUCINATION_MONITOR.py` MUST become a production observation system, not merely a script template.

## 6.1 Monitoring cadence

Default premium program:

```text
Week 0: baseline
Weeks 1–12: scheduled weekly observation
Day 30: formal comparable rescan
Week 12: final trend summary
```

If the commercial plan later changes the duration, entitlement configuration controls it. Do not hard-code price logic into the measurement engine.

## 6.2 Time-series outputs

At minimum:

- Mention Rate trend
- Citation Rate trend
- Recommendation Rate trend
- Competitive Share of Answer trend
- Hallucination Rate trend
- Citation Source Concentration trend
- Engine Divergence trend
- Observation Volatility

Model/provider changes MUST create a time-series annotation, not silently continue as if nothing changed.

---

# 7. PREMIUM LAYER 4 — NAMED COMPETITOR GAP

Every $999 audit MUST evaluate 3–5 named competitors where valid peers can be resolved.

## 7.1 Competitor resolution

A competitor is accepted only if:

- Same buyer category or same material purchase decision.
- Same relevant geography where geography matters.
- Same product/service class.
- Not merely a large unrelated domain ranking for one keyword.

Ambiguous competitor:

```text
status = REQUIRES_CONTEXT
```

## 7.2 Parity rule

Competitors MUST be evaluated using the same:

- prompt panel
- technical rules
- observation windows
- scoring version
- crawl limits applicable to the comparison
- evidence classes

No asymmetric benchmark.

## 7.3 Gap output

The report MUST show:

```text
YOU
Competitor A
Competitor B
Competitor C
Competitor D
```

across:

- Technical readiness
- Mention rate
- Citation rate
- Recommendation rate
- Share of Answer
- Source diversity
- Entity consistency
- Agent operability, where applicable
- Content evidence/citability
- High-value prompt coverage

The report MUST answer:

```text
WHY THEM / NOT YOU
```

with evidence rather than generic SEO advice.

---

# 8. PREMIUM LAYER 5 — CITATION SOURCE GRAPH

This is a strategic moat and MUST be treated as a first-class data product.

## 8.1 Graph topology

```text
Prompt
  ↓
AI Surface / Answer
  ↓
Citation / Source
  ↓
Entity or Competitor
  ↓
Source Type
  ↓
Controllability
  ↓
Recommended Capture Action
```

## 8.2 Source node fields

```json
{
  "sourceUrl": "https://...",
  "domain": "example.com",
  "sourceType": "OWNED|EARNED|THIRD_PARTY|DIRECTORY|REVIEW|NEWS|DOCS|FORUM|OTHER",
  "engines": ["..."],
  "promptCount": 0,
  "citationCount": 0,
  "competitorsSupported": ["..."],
  "brandSupported": false,
  "freshness": "ISO-8601|null",
  "controllability": "HIGH|MEDIUM|LOW|NONE",
  "captureFeasibility": "HIGH|MEDIUM|LOW",
  "evidenceClass": "OBSERVED"
}
```

## 8.3 Source Capture Targets

The system MUST rank source opportunities.

Example decision output:

```text
P0 SOURCE TARGET
Source: Independent category comparison page
Observed in: 4/5 AI surfaces
Supports competitor: 11 citations
Supports customer: 0 citations
Controllability: MEDIUM
Acquisition route: legitimate editorial/data contribution
Expected influence: HIGH
Confidence: 0.86
```

No paid-link spam, fake reviews, astroturfing, or fabricated third-party authority.

---

# 9. PREMIUM LAYER 6 — ENGINE DIVERGENCE

AI surfaces MUST NOT be treated as one homogeneous engine.

## 9.1 Engine Divergence Index

HTML&HTML MAY compute an internal index from:

- citation-set overlap
- competitor-set overlap
- brand mention disagreement
- recommendation disagreement
- factual conflict

Output:

```text
0.00 → high agreement
1.00 → high divergence
```

The exact weighting is proprietary `INTERNAL_HEURISTIC`.

## 9.2 Decision use

High divergence means:

- Do not prescribe a single cross-engine remedy.
- Segment source/citation strategy by surface.
- Preserve engine-specific evidence.
- Identify whether the problem is global or surface-specific.

---

# 10. PREMIUM LAYER 7 — PROMPT → PAGE → EVIDENCE FIT

For each commercial prompt:

```text
Buyer Question
      ↓
Expected Answer Entity
      ↓
Best Existing Customer URL
      ↓
Extractable Answer Unit
      ↓
Supporting Evidence
      ↓
Citation Readiness
      ↓
Observed AI Outcome
```

Possible states:

```text
NO_TARGET_PAGE
WEAK_TARGET_PAGE
NO_DIRECT_ANSWER
NO_PRIMARY_EVIDENCE
ENTITY_AMBIGUITY
OUTDATED_EVIDENCE
GOOD_RETRIEVAL_POOR_CITABILITY
GOOD_CITABILITY_NOT_OBSERVED
OBSERVED_COMPETITOR_DISPLACEMENT
STRONG
```

This mapping drives content and source investment.  
It MUST NOT become a keyword-density report.

---

# 11. PREMIUM LAYER 8 — CITABILITY ENGINEERING

The system MUST evaluate whether a page contains extractable, verifiable answer material.

Metrics MAY include:

- Atomic Answer Density
- Evidence-per-Claim Ratio
- Sourceable Fact Density
- Definition Precision
- Comparison Extractability
- Table Extractability
- Quotable Statistics
- Entity Explicitness
- Temporal Qualification
- Contradiction Risk
- Chunk Independence
- Answer Completeness
- Primary-source support

All of these are `INTERNAL_HEURISTIC` or `MEASURED` unless supported by an external source.

No claim such as "this increases ChatGPT ranking by 40%" is permitted without a valid measured study that directly supports the statement.

---

# 12. PREMIUM LAYER 9 — ENTITY VERIFICATION DOSSIER

## 12.1 Verify, never manufacture

The system MUST check:

- canonical organization name
- product/service names
- official domain
- legal/company name where publicly relevant
- verified social/company profiles
- LinkedIn consistency
- Crunchbase consistency where present
- Wikidata QID where legitimately present
- other high-confidence entity identifiers
- structured-data entity references

A search page is never a `sameAs`.

If no Wikidata entity exists:

```text
WIKIDATA_STATUS = NOT_FOUND
```

Do not auto-create one solely for SEO.

## 12.2 Knowledge Panel

Output:

```text
OBSERVED
NOT_OBSERVED
ENTITY_AMBIGUOUS
REQUIRES_CONTEXT
```

Never output "Knowledge Panel guaranteed" or "triggered."

## 12.3 Entity Conflict Ledger

Compare verifiable facts across owned and major third-party surfaces:

- brand name
- category
- address
- phone
- founder/expert
- product names
- pricing
- capabilities
- service geography
- publication dates
- certifications/credentials

Example:

```text
FACT: Base price
Official site: $99
Third-party A: $149
Old directory: $49
Status: CONFLICTED
AI factual-confusion exposure: HIGH
```

---

# 13. PREMIUM LAYER 10 — AI CRAWLER POLICY MATRIX

Do not ask "Are AI bots allowed?" as one binary question.

Evaluate by purpose.

## 13.1 Policy dimensions

```text
SEARCH_DISCOVERY
USER_TRIGGERED_RETRIEVAL
MODEL_TRAINING
GROUNDING
AGENT_ACTION
```

## 13.2 Technical access stack

For each relevant agent/bot:

```text
DNS
TLS
HTTP
redirects
robots effective policy
WAF/CDN response
rate-limit behavior
403/429
HTML retrieval
render availability
canonical
noindex
content visibility
auth boundary
```

The system MUST calculate the effective policy, including wildcard groups.  
Absence of a bot-specific robots block is not automatically a failure if effective wildcard behavior is valid.

---

# 14. PREMIUM LAYER 11 — AI/TDM GOVERNANCE & LEGAL POSTURE

This layer is differentiated but must remain legally disciplined.

## 14.1 Scope

The dossier MAY analyze:

- training/search/user-retrieval policy separation
- robots directives
- Terms of Use language
- publicly exposed content classes
- content containing personal data
- proprietary/paywalled/licensed content exposure
- machine-readable TDM reservation strategy
- data residency/process concerns when relevant
- internal AI-use preference declarations

## 14.2 EU TDM

Where EU copyright law is relevant, the system MAY flag whether rights reservation for text-and-data-mining has been expressly declared in an appropriate/machine-readable manner.

It MUST NOT conclude that a robots.txt rule alone resolves all copyright or data-protection questions.

## 14.3 GDPR / KVKK

The audit MUST distinguish:

```text
COPYRIGHT/TDM
PERSONAL DATA
CONTRACT/TERMS
TRADE SECRET/CONFIDENTIALITY
PLATFORM CRAWLER PREFERENCE
```

KVKK/GDPR obligations depend on actual processing facts.  
Legal conclusions MUST be:

```text
REQUIRES_COUNSEL
```

unless the statement is a narrow technical observation.

## 14.4 ai.txt

`ai.txt` or similar declarations MUST be classified:

```text
EXPERIMENTAL_POLICY_DECLARATION
```

unless a recognized standard changes this status.

No report may call it an industry standard without evidence.

---

# 15. PREMIUM LAYER 12 — VERIFIED BEFORE / AFTER

Simulation is useful for planning but MUST be visually and semantically separated from measurement.

## 15.1 Baseline

Before changes:

- timestamp
- scanner version
- prompt panel version
- surfaces
- competitor set
- technical scores
- raw observation receipts
- performance traces where measured

## 15.2 Runtime evidence

Where technically valid, capture:

- Playwright output
- screenshots
- HAR
- HTTP headers
- raw HTML snapshots/hashes
- Lighthouse or equivalent measured output
- API probe output
- bot access traces
- execution logs

Do not promise a metric that cannot be measured from the available environment.

## 15.3 Re-scan parity

A before/after comparison is valid only when:

```text
same prompt version
same scoring version OR documented migration
same target definition
same competitor rules
same or explicitly segmented surface/model conditions
same measurement methodology
```

If parity is broken:

```text
DELTA_STATUS = INVALID_COMPARISON
```

---

# 16. PREMIUM LAYER 13 — VERTICAL VECTOR PACKS

The $999 audit MUST select one primary vertical pack.

## 16.1 E-commerce

Controls include:

- Product / Offer structured data
- price/availability consistency
- variant identity
- shipping/returns facts
- merchant feed consistency where applicable
- product comparison readiness
- price hallucination exposure
- transactional/agent readiness
- inventory freshness
- product source/citation footprint

## 16.2 SaaS / B2B

Controls include:

- SoftwareApplication / Product / Service entity structure
- pricing fact consistency
- integration pages
- API/docs discoverability
- "X vs Y" comparison coverage
- category-definition coverage
- customer proof/case-study evidence
- capability hallucination exposure
- product version/date qualification

## 16.3 Local Business

Controls include:

- LocalBusiness entity consistency
- name/address/phone
- hours
- service area
- local landing pages
- maps/profile consistency
- review-source footprint
- local entity ambiguity
- location-specific answer coverage

## 16.4 Regulated / YMYL

Finance, health, legal, compliance, and other high-risk verticals:

- stricter evidence thresholds
- author/expert credentials
- date/freshness
- source quality
- claim qualification
- disclaimers where appropriate
- hallucination severity multiplier
- no unsupported recommendation language

## 16.5 Publisher / Media

- Article/NewsArticle
- authorship
- publication dates
- corrections policy
- paywall/access
- TDM policy
- syndication conflict
- provenance/C2PA where applicable
- source attribution

If no vertical applies:

```text
VERTICAL_PACK = GENERAL
```

---

# 17. PREMIUM LAYER 14 — AGENTIC ACTION READINESS

Agentic capability is conditional, not universal.

## 17.1 Applicability

Use for:

- SaaS
- APIs
- booking
- commerce
- transactional workflows
- structured service actions

Static brochure sites SHOULD receive:

```text
NOT_APPLICABLE
```

rather than a penalty.

## 17.2 Three separate capabilities

```text
OPENAPI
A2A
MCP
```

must be scored separately.

### OpenAPI PASS requires
- valid OpenAPI document
- live referenced endpoints
- authentication documented where needed
- response schema consistency

### A2A PASS requires
- valid Agent Card
- standards-compliant discovery location if used
- live supported interface
- task/action execution test
- authentication/authorization where needed
- failure handling
- no secrets in public Agent Card

### MCP PASS requires
- live MCP server
- valid transport
- tool/resource discovery
- tool execution test
- auth where appropriate
- Origin validation for applicable Streamable HTTP deployments
- rate limiting/abuse controls
- no credentials in public metadata

A design spec alone is:

```text
DESIGN_ONLY
```

not PASS.

---

# 18. PREMIUM LAYER 15 — PROVENANCE / C2PA

C2PA is applicable primarily where digital asset provenance matters.

## 18.1 Allowed statuses

```text
NOT_APPLICABLE
NOT_IMPLEMENTED
DESIGN_ONLY
VALID
TRUSTED
INVALID
```

Do not create a fake C2PA score from ordinary JSON-LD.

## 18.2 Verification

When applicable, validate:

- manifest presence
- content binding
- claim
- signature
- time-stamp validity where present
- signer trust state
- asset integrity

Store validation output in the evidence index.

---

# 19. PREMIUM LAYER 16 — ROOT-CAUSE CLUSTERING

A premium report MUST NOT force management to read hundreds of duplicated failures.

Pipeline:

```text
RAW OBSERVATIONS
      ↓
NORMALIZED FAILURES
      ↓
DEDUPLICATED ROOT CAUSES
      ↓
SHARED INTERVENTIONS
      ↓
EXPECTED CLOSED ISSUES
```

Example:

```text
23 failed observations
→ 4 root causes
→ 2 engineering changes
→ 19 observations expected to close
```

The root-cause graph is a paid trade-secret deliverable.

---

# 20. PREMIUM LAYER 17 — OPPORTUNITY PRIORITY ENGINE

Priority is a decision model, not an external ranking factor.

Default conceptual formula:

```text
OpportunityPriority =
BuyerIntentImportance
× ObservedVisibilityGap
× CompetitorCapture
× SourceControllability
× EvidenceConfidence
× ExpectedIssueClosure
÷
ImplementationCost
```

Exact normalization/weights remain proprietary.

Output:

```text
P0 — execute now
P1 — 7 days
P2 — 30 days
P3 — monitor
```

Every item includes:

- impact reason
- evidence
- dependency
- cost class
- reversibility
- confidence
- acceptance criterion
- rollback
- stop condition

---

# 21. PREMIUM LAYER 18 — REFERRAL & BUSINESS IMPACT TELEMETRY

Where first-party analytics are available and authorized, connect observed AI visibility to measurable business outcomes.

Possible metrics:

- AI referral sessions
- `utm_source=chatgpt.com` referrals where present
- conversions from AI referrals
- assisted conversions
- landing-page engagement
- pipeline/revenue attribution where the customer provides data

If analytics are unavailable:

```text
BUSINESS_IMPACT_TELEMETRY = REQUIRES_CONTEXT
```

Never infer revenue from mention rate alone.

---

# 22. N8N-STYLE ORCHESTRATION — PRODUCTION WORKFLOW

`22_N8N_AI_SEARCH_MONITORING_WORKFLOW.json` or its successor MUST be genuinely importable and executable.

## 22.1 Canonical workflow

```text
00_TRIGGER
  ↓
01_ENTITLEMENT_VALIDATE
  ↓
02_TARGET_NORMALIZE
  ↓
03_SSRF_GUARD
  ↓
04_DISCOVER_SITE
  ↓
05_TECHNICAL_SCAN
  ↓
06_CRAWLER_POLICY
  ↓
07_PROMPT_PANEL_LOAD
  ↓
08_AI_SURFACE_FANOUT
  ↓
09_OBSERVATION_NORMALIZE
  ↓
10_RAW_EVIDENCE_STORE
  ↓
11_COMPETITOR_FANOUT
  ↓
12_CITATION_GRAPH
  ↓
13_ENTITY_VERIFY
  ↓
14_ENTITY_CONFLICT
  ↓
15_GOVERNANCE_TDM
  ↓
16_VERTICAL_VECTOR
  ↓
17_ROOT_CAUSE_CLUSTER
  ↓
18_OPPORTUNITY_PRIORITY
  ↓
19_PACKAGE_BUILD
  ↓
20_PACKAGE_INTEGRITY
  ↓
21_DELIVERY
  ↓
22_WEEKLY_MONITOR_SCHEDULE
  ↓
23_30_DAY_RESCAN
  ↓
24_DELTA_REPORT
```

---

## 22.2 Node contract

Every node MUST define:

```json
{
  "nodeId": "string",
  "version": "semver",
  "inputSchema": "json-schema-ref",
  "outputSchema": "json-schema-ref",
  "idempotencyKey": "string",
  "timeoutMs": 0,
  "maxRetries": 0,
  "retrySchedule": [],
  "rateLimitPolicy": "string",
  "circuitBreaker": "string",
  "dlqEnabled": true,
  "evidenceWrites": [],
  "failureMode": "FAIL_CLOSED|DEGRADE|NOT_MEASURED"
}
```

---

## 22.3 Idempotency

Recommended key pattern:

```text
sha256(
 domain
 + workflowVersion
 + scanWindow
 + promptVersion
 + surfaceId
 + runNumber
)
```

Retry MUST NOT duplicate billable provider calls or duplicate stored observations where an idempotent receipt already exists.

---

## 22.4 DLQ proof

The premium package MUST include a real tested failure case:

1. Inject a deliberately invalid/unreachable target into the approved test environment.
2. Confirm the workflow does not corrupt the valid run.
3. Confirm the failed item is written to DLQ with:
   - node
   - timestamp
   - input hash
   - error class
   - retry count
   - final status
4. Confirm re-drive procedure works.

Output:

```text
47_N8N_DLQ_PROOF.json
```

No screenshot-only proof. Logs/receipts are required.

---

## 22.5 Secret handling

Workflow JSON MUST NOT contain:

- API keys
- passwords
- bearer tokens
- service-account JSON
- webhook secrets
- signing private keys

Use n8n credentials / secret manager references.

---

# 23. SECURITY & ABUSE CONTROLS

## 23.1 SSRF

Existing SSRF fail-closed behavior is mandatory.

Block at minimum:

- loopback
- RFC1918/private ranges
- link-local
- metadata endpoints
- unix/file schemes
- non-HTTP(S) where unsupported
- DNS rebinding attempts
- redirect-to-private
- IPv6 private/link-local equivalents

Re-resolve and re-validate on redirects where required.

## 23.2 Resource limits

Enforce:

- crawl page cap from canonical product configuration
- response-size cap
- per-host concurrency
- global concurrency
- timeouts
- redirect limit
- content-type allowlist
- compressed-response bomb protection
- rate limits
- maxInstances / cost controls where applicable

## 23.3 Competitor scanning

Competitor scans must:

- use public content only
- respect access controls
- avoid credentialed/private surfaces
- avoid bypass
- obey configured rate limits
- preserve parity with customer scan

---

# 24. SCORING ARCHITECTURE

## 24.1 Never use one opaque "AI Visibility Score"

The executive layer MUST show distinct dimensions:

```text
TECHNICAL READINESS
OBSERVED AI PRESENCE
CITATION AUTHORITY
COMPETITIVE SHARE OF ANSWER
ENTITY CONSISTENCY
AGENT OPERABILITY
GOVERNANCE POSTURE
```

## 24.2 Optional Enterprise AI Intelligence Index

A composite MAY be calculated only if:

```text
component coverage >= 80%
required observation minimums met
no critical component = NOT_MEASURED
```

It MUST be labelled:

```text
HTML&HTML INTERNAL DECISION INDEX
NOT A PLATFORM RANKING SCORE
```

If the coverage threshold is not met:

```text
EAI_INDEX = NOT_MEASURED
```

---

# 25. CONFIDENCE MODEL

Every premium conclusion MUST include confidence.

Recommended inputs:

- sample count
- repeat consistency
- source authority
- directness of evidence
- data freshness
- entity disambiguation confidence
- surface coverage
- model/version continuity

Confidence MUST NOT be cosmetically hard-coded to high values.

---

# 26. HALLUCINATION DETECTION

## 26.1 Hallucination definition

Count only a verifiable factual claim about the customer/competitor that conflicts with the authoritative fact ledger.

Examples:

- wrong price
- wrong capability
- wrong founder
- wrong location
- wrong product
- nonexistent certification
- obsolete service availability

Subjective opinions are not hallucinations merely because the customer dislikes them.

## 26.2 Severity

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Critical examples may include harmful regulated-domain misinformation or transaction-critical false facts.

---

# 27. BEFORE/AFTER DEMO EVIDENCE

HTML&HTML SHOULD maintain one or more controlled demo domains or its own production site as a public methodology demonstration.

The demo MUST distinguish:

```text
DEMO_MEASURED
CUSTOMER_MEASURED
SYNTHETIC_FIXTURE
```

A screenshot containing fixture data MUST NOT be labeled customer empirical evidence.

Demo package SHOULD include:

- before/after technical metrics
- raw HTTP evidence
- Playwright run output
- HAR
- screenshots
- implementation commit reference
- scanner version
- observation panel version
- caveat that AI outcomes are probabilistic

---

# 28. UI / LOCKING / COMMERCIAL SECRET DESIGN

## 28.1 Lock the prescription, not the proof

Free users see enough evidence to trust the diagnosis.

Paid secrets include:

- exact fix
- exact order
- code
- patches
- workflow
- priority algorithm
- source-capture target logic
- root-cause graph
- prompt ontology
- acceptance implementation
- rollback implementation

---

## 28.2 Locked module design

Remove giant blurred empty areas.

Each locked issue should use a compact sealed block approximately one normal card-height, containing only inventory:

```text
LOCKED ENGINEERING PAYLOAD

Root causes            3
Patches/configs        5
Affected files         8
Acceptance tests       7
Rollback paths         2
Dependencies           CDN + App
Change risk            MEDIUM
Codebase context       REQUIRED
```

No fix text.

---

## 28.3 CTA rule

Do not render a large duplicate paid CTA inside every issue plus another sticky CTA over content.

Use:

- one primary contextual CTA near the first locked payload
- one non-obstructive sticky CTA when appropriate
- one closing CTA
- no overlay that hides evidence or report text

---

## 28.4 Comparison UX

Use a plan-card + feature-comparison pattern.

Preferred structure:

```text
FREE          $99 FIX MANDATE          $999 INTELLIGENCE
Evidence      Engineering              Market/AI intelligence
```

Cards make the first decision; the comparison table supplies detailed verification underneath.

Do not put a 40-row matrix above the first decision layer.

---

# 29. PREMIUM COMPARISON MATRIX

Minimum public comparison:

| Capability | Free | $99 Fix Mandate | $999 Enterprise AI Intelligence |
|---|---:|---:|---:|
| Technical evidence | ✓ | ✓ | ✓ |
| Affected URLs | ✓ | ✓ | ✓ |
| Root-cause clustering | — | ✓ | ✓ |
| Exact remediation | — | ✓ | ✓ |
| Acceptance + rollback | — | ✓ | ✓ |
| AI surface observations | — | — | ✓ |
| Multi-run prompt panel | — | — | ✓ |
| Mention/citation/recommendation rates | — | — | ✓ |
| 3–5 named competitor benchmark | — | — | ✓ |
| Competitive Share of Answer | — | — | ✓ |
| Citation Source Graph | — | — | ✓ |
| Source Capture Targets | — | — | ✓ |
| Engine Divergence | — | — | ✓ |
| Entity Verification Dossier | — | — | ✓ |
| Entity Conflict Ledger | — | — | ✓ |
| AI crawler purpose matrix | limited | ✓ | ✓ |
| TDM/governance dossier | — | — | ✓ |
| Vertical Vector Pack | — | — | ✓ |
| Importable n8n workflow | — | — | ✓ |
| DLQ proof | — | — | ✓ |
| Before/after protocol | — | ✓ | ✓ |
| 30-day comparable rescan | — | configured | ✓ |
| 12-week AI visibility trend | — | — | ✓ |
| Machine-readable raw receipts | limited | ✓ | ✓ |

---

# 30. QUALITY GATES — G0 TO G15

Any hard gate failure blocks release of the affected deliverable.

## G0 — Truth Gate
- No unsupported standard claims.
- No `NOT_MEASURED` fabrication.
- No synthetic evidence mislabeled empirical.

## G1 — SSOT Gate
- Registry and output versions aligned.
- No duplicate scoring truth.

## G2 — Deterministic Engine Gate
- Same technical input snapshot → same technical output.
- No `Math.random()` or uncontrolled LLM-generated scoring.

## G3 — Evidence Gate
- Every failure has evidence or an explicit unknown status.
- Evidence receipt hash resolves.

## G4 — SSRF / Security Gate
- Private/loopback/metadata targets fail closed.
- Redirect revalidation passes.

## G5 — Source Freshness Gate
- Official vendor/standard source freshness within policy.
- Stale rule cannot remain hard-enforced.

## G6 — AI Observation Gate
- Minimum run count met.
- Prompt version frozen.
- Surface and measurement method recorded.

## G7 — Competitor Parity Gate
- Competitors scanned with equivalent methodology.
- No cherry-picked comparison.

## G8 — Citation Graph Gate
- Every graph edge resolves to an observation receipt.
- No invented source edges.

## G9 — Entity Gate
- `sameAs` only verified real targets.
- No search-result URLs as entity IDs.

## G10 — Governance Gate
- Legal outputs use `REQUIRES_COUNSEL` where required.
- ai.txt-like artifacts correctly classified experimental.

## G11 — n8n Gate
- Workflow imports.
- Dry run passes.
- Test run passes.
- DLQ test passes.
- Secrets absent from exported JSON.

## G12 — Package Integrity Gate
- manifest lists every file.
- SHA-256 hashes present.
- no missing required premium output.

## G13 — Locked-IP Gate
- free report contains no proprietary fix implementation.
- paid entitlement verified server-side.
- direct file URL cannot bypass entitlement.

## G14 — Live Smoke Gate
- production endpoints available.
- health check correct.
- critical files return expected content type/status.
- no partial deploy.

## G15 — Re-scan Parity Gate
- before/after protocol comparable.
- if not comparable, delta marked invalid rather than guessed.

---

# 31. RED TEAM — FAILURE MODES

## Failure Mode 1 — AI provider changes model/surface behavior mid-series

**Impact:** Trend falsely interpreted as customer improvement/decline.

**Mitigation:**
- model/surface metadata
- timestamp
- change-point annotation
- segment time series
- do not merge incompatible runs

---

## Failure Mode 2 — AI output nondeterminism creates noisy result

**Impact:** Single-run false conclusions.

**Mitigation:**
- 3+ independent runs
- weekly aggregation
- volatility metric
- confidence scoring
- minimum-sample gate

---

## Failure Mode 3 — API output differs from consumer product UI

**Impact:** Incorrect claim about actual consumer experience.

**Mitigation:**
- label exact measurement surface
- never generalize beyond measured surface
- separate `API_OBSERVATION` and `CONSUMER_UI_OBSERVATION`
- `NOT_MEASURED` if consumer UI cannot be measured compliantly

---

## Failure Mode 4 — Competitor entity collision

**Impact:** Wrong competitor share-of-answer.

**Mitigation:**
- canonical brand/entity aliases
- domain match
- category match
- geography check
- confidence threshold
- ambiguous observations excluded

---

## Failure Mode 5 — Cited source disappears or changes

**Impact:** Citation graph becomes stale.

**Mitigation:**
- timestamp
- response hash
- source snapshot/hash where legally/technically valid
- freshness field
- weekly graph update

---

## Failure Mode 6 — Legal layer overclaims

**Impact:** Compliance liability.

**Mitigation:**
- technical observation vs legal conclusion separation
- `REQUIRES_COUNSEL`
- jurisdiction field
- source registry
- no legal guarantee

---

## Failure Mode 7 — n8n retries duplicate paid API calls

**Impact:** Cost explosion / duplicate evidence.

**Mitigation:**
- idempotency keys
- provider request receipts
- retry classes
- circuit breaker
- budget ceiling

---

## Failure Mode 8 — Public scanner abused

**Impact:** Firebase/provider cost and denial of service.

**Mitigation:**
- per-IP/domain rate limit
- concurrency cap
- response-size limit
- WAF
- entitlement-aware quotas
- abuse telemetry
- maxInstances

---

## Failure Mode 9 — 0 data / new brand

**Impact:** False low score.

**Mitigation:**
- `INSUFFICIENT_OBSERVATION_DATA`
- no zero substituted for unknown
- bootstrap prompt panel
- report technical readiness separately

---

## Failure Mode 10 — 95th percentile large site

**Impact:** timeouts / partial crawl.

**Mitigation:**
- canonical URL sampling policy
- capped crawl
- stratified page classes
- partial coverage disclosure
- no whole-site claim beyond sampled scope

---

# 32. REVERSIBILITY POLICY

Every implementation item MUST carry:

```text
[Geri döndürülebilir]
```

or:

```text
[Geri döndürülemez]
```

Examples:

- robots change → usually reversible
- metadata/schema change → reversible
- third-party profile publication → partially reversible / external dependency
- destructive content deletion → potentially irreversible
- legal rights reservation change → requires review
- signing-key rotation/revocation → security-sensitive

Irreversible/high-risk actions require explicit approval and rollback/containment planning.

---

# 33. EXECUTIVE REPORT STRUCTURE

The premium customer-facing report MUST be shorter and more decision-oriented than the machine package.

Required top-level order:

```text
1. Executive Decision
2. Observed AI Presence
3. Who Wins Instead
4. Citation Source Graph
5. Why They Win
6. Technical Root Causes
7. Entity / Trust Conflicts
8. Crawler & Governance Posture
9. Vertical-Specific Gaps
10. P0–P3 Decision Roadmap
11. Before/After Baseline
12. Measurement Confidence
13. Locked Engineering Appendix
```

The report MUST answer in the first screen:

- Current technical readiness
- Current observed AI presence
- Top winning competitor
- Largest citation/source gap
- Highest-value P0 action
- Confidence level

---

# 34. DELIVERABLE MANIFEST & AUDIT TRAIL

Every package MUST generate:

```json
{
  "packageId": "uuid",
  "domain": "example.com",
  "entitlement": "ENTERPRISE_AI_INTELLIGENCE",
  "generatedAt": "ISO-8601",
  "engineVersion": "semver",
  "rulesetVersion": "semver",
  "promptPanelVersion": "semver",
  "surfaceRegistryVersion": "semver",
  "verticalPack": "string",
  "files": [
    {
      "path": "premium/...",
      "sha256": "...",
      "bytes": 0
    }
  ]
}
```

Audit trail MUST record:

- inputs
- normalized target
- page sample
- rules run
- source versions
- provider/surface observations
- errors
- retries
- DLQ events
- scoring steps
- package hashes

---

# 35. ACCEPTANCE CRITERIA FOR $999 LAUNCH

The $999 product MUST NOT be sold as complete until all required gates below pass:

```text
[PASS] Technical Readiness score separated from Observed AI Presence
[PASS] 12–20 prompt panel
[PASS] 3 independent runs
[PASS] provider-compliant measurement method per surface
[PASS] raw observation receipts
[PASS] mention/citation/recommendation separation
[PASS] 3–5 competitor parity benchmark
[PASS] competitive Share of Answer
[PASS] Citation Source Graph
[PASS] Source Capture Targets
[PASS] Engine Divergence
[PASS] Prompt→Page→Evidence Fit
[PASS] Entity Verification Dossier
[PASS] Entity Conflict Ledger
[PASS] AI Crawler Policy Matrix
[PASS] TDM/Governance dossier with legal boundaries
[PASS] one Vertical Vector Pack
[PASS] importable n8n workflow
[PASS] DLQ proof
[PASS] root-cause clustering
[PASS] opportunity priority
[PASS] runtime evidence index
[PASS] baseline measurement
[PASS] 30-day comparable rescan mechanism
[PASS] 12-week scheduled monitoring mechanism
[PASS] package manifest + hashes
[PASS] no unsupported claims in customer report
```

---

# 36. STOP CONDITIONS

Immediately STOP premium report issuance if any of the following is true:

```text
- raw observation receipts missing
- synthetic data presented as live
- surface measurement method cannot be documented
- competitor set is unresolved/invalid
- fewer than minimum runs but trend is being claimed
- technical readiness is presented as observed AI visibility
- llms.txt is represented as an RFC/official standard
- GPTBot is represented as the sole ChatGPT Search crawler control
- Google-Extended is represented as a Google Search ranking signal
- OpenAPI is treated as A2A
- static MCP spec is treated as live MCP server
- JSON-LD is treated as a C2PA Content Credential
- Wikidata search URL is treated as sameAs
- Knowledge Panel is guaranteed
- fixed implementation time is invented without context
- legal conclusion exceeds available facts
- source registry is stale beyond enforcement policy
- paid content can be accessed without server-side entitlement
```

The correct output in these conditions is a blocked/partial status, not fabricated completion.

---

# 37. IMPLEMENTATION ORDER

## P0 — Truth & credibility cleanup

1. Replace opaque "General AI Visibility" with:
   - Technical Readiness
   - Observed AI Presence
2. Correct crawler semantics.
3. Reclassify llms.txt as proposal.
4. Separate OpenAPI/A2A/MCP.
5. Remove fake C2PA implementations.
6. Remove unverified entity `sameAs`.
7. Replace fixed URL-only effort times with S/M/L + confidence + `REQUIRES_CONTEXT`.
8. Label synthetic evidence.
9. Normalize:
   - checks executed
   - failed observations
   - deduplicated root causes

**Acceptance:** G0, G5, G9 pass.  
**Rollback:** revert presentation only; do not restore false semantics.

---

## P1 — AI Answer Observatory

1. prompt registry
2. surface registry
3. observation schema
4. provider-compliant execution adapters
5. repeat runs
6. raw evidence store
7. mention/citation/recommendation classifier
8. hallucination fact ledger

**Acceptance:** G6 pass.  
**Rollback:** disable unsupported surface adapter; preserve technical scan.

---

## P2 — Competitor + Citation Intelligence

1. competitor resolver
2. parity runner
3. source extractor
4. citation graph
5. source capture targets
6. engine divergence

**Acceptance:** G7 + G8 pass.  
**Rollback:** drop invalid competitor/surface from comparison and mark partial.

---

## P3 — Entity + Governance

1. entity resolver
2. verified sameAs
3. conflict ledger
4. crawler purpose matrix
5. TDM policy inventory
6. legal boundary statuses

**Acceptance:** G9 + G10 pass.  
**Rollback:** downgrade unsupported conclusions to unknown/counsel-required.

---

## P4 — n8n Production Automation

1. importable workflow
2. credentials placeholders
3. idempotency
4. retries
5. circuit breakers
6. DLQ
7. test failure
8. evidence log
9. schedule
10. package build

**Acceptance:** G11 pass.  
**Rollback:** disable scheduled runs; one-shot audit remains intact.

---

## P5 — Vertical Packs

1. vertical classifier
2. E-commerce
3. SaaS/B2B
4. Local
5. Regulated/YMYL
6. Publisher/Media

**Acceptance:** correct applicability + no cross-vertical false penalties.  
**Rollback:** GENERAL pack.

---

## P6 — Premium Report / Locking UX

1. compact locked cards
2. one clean primary CTA
3. plan comparison
4. executive dashboard
5. technical appendix
6. no duplicated giant blur blocks

**Acceptance:** evidence remains readable; proprietary fix remains hidden.  
**Rollback:** previous layout only if it does not expose IP.

---

## P7 — Baseline / Rescan / 12-week monitoring

1. baseline freeze
2. weekly schedule
3. provider/model annotations
4. day-30 comparable rescan
5. week-12 trend report

**Acceptance:** G15 pass.  
**Rollback:** report trend as separate series if parity cannot be preserved.

---

# 38. BUSINESS SUCCESS METRICS

The platform MUST track:

```text
Free scan → $99 conversion
Free scan → $999 conversion
$99 → $999 upgrade
$999 completion rate
Surface coverage
Observation success rate
DLQ rate
Provider cost per audit
Gross margin per audit
30-day rescan completion
12-week monitoring completion
Mention rate delta
Citation rate delta
Recommendation rate delta
Share-of-Answer delta
AI referral traffic delta where measurable
```

Do not optimize for file count, issue count, or inflated score movement.

---

# 39. PREMIUM VALUE TEST

A $999 audit passes the value test only if a technical buyer or C-level reader can answer:

```text
1. Which AI surfaces currently expose our brand?
2. Which exact buyer questions do we lose?
3. Which competitors capture those answers?
4. Which exact sources support them?
5. Which facts about us are wrong or inconsistent?
6. Are search, retrieval, and training crawlers configured intentionally?
7. What is the smallest intervention with the largest expected impact?
8. What must engineering implement?
9. How will we prove it worked?
10. What changed after 30 days and across 12 weeks?
```

If the report cannot answer these, it is not a $999 Enterprise AI Intelligence Audit.

---

# 40. OFFICIAL-BASIS REGISTRY — CURRENT VALIDATION ANCHORS

The source registry MUST prefer official sources. Current anchors to verify continuously include:

- OpenAI publisher/developer crawler guidance:
  `https://help.openai.com/en/articles/12627856-publishers-and-developers-faq`
- Anthropic crawler guidance:
  `https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler`
- Google crawler / Google-Extended guidance:
  `https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers`
- Perplexity robots guidance:
  `https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt`
- llms.txt v2 proposal:
  `https://llmstxt.org/`
  `https://llmstxt.org/changes.html`
- A2A current specification:
  `https://a2a-protocol.org/latest/specification/`
- MCP current specification:
  `https://modelcontextprotocol.io/specification/`
- C2PA current specifications:
  `https://spec.c2pa.org/specifications/`
- EU Directive 2019/790 Article 4 (TDM):
  `https://eur-lex.europa.eu/eli/dir/2019/790`
- 21st.dev comparison pattern reference:
  `https://21st.dev/community/components/s/comparison`

These URLs are source anchors, not permanently frozen truth.  
The source freshness system decides whether a rule remains enforceable.

---

# 41. FINAL ENFORCEMENT

This mandate’s priority order is:

```text
TRUTH
> EVIDENCE
> CUSTOMER DECISION VALUE
> REPRODUCIBILITY
> SECURITY
> AUTOMATION
> PERFORMANCE
> VISUAL POLISH
> MARKETING LANGUAGE
```

When two rules conflict, the rule producing the more truthful, evidence-backed, reversible, and auditable result wins.

**Final product rule:**

> HTML&HTML must not sell a black-box score. It must sell a reproducible evidence chain from buyer question → AI answer → competitor → citation source → root cause → minimum intervention → acceptance test → measured delta.

That evidence chain is the defensible $999 product and the proprietary moat.
