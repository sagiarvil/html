#!/usr/bin/env python3
"""Materialize the six-area black-box observation contract.

This is an evidence protocol, not a claim of access to proprietary model internals.
It enriches the existing non-scoring risk layer with falsifiable observation plans,
n8n-style orchestration semantics, failure boundaries and machine-readable SSOT.
"""

from __future__ import annotations

from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
PROFILE = ROOT / "audit-profile.json"
SOURCES = ROOT / "sources.json"
PUBLIC = ROOT / "blackbox-observation-contract.json"

VERSION = "2.0.0"
UPDATED = "2026-09-10"

CONTRACTS = [
    {
        "key": "query_fanout_coverage",
        "title": "Query Fan-Out Coverage",
        "hypothesis": "A single user question may fan out into multiple related retrieval intents, so landing-page coverage can fail even when the head query appears covered.",
        "observable": "Connected Search Console generative-AI performance dimensions and/or an authorized query-observation dataset mapped to canonical landing URLs.",
        "requiredInputs": ["authorized query observation data", "canonical landing URL inventory", "locale", "observation window"],
        "metrics": ["covered intent clusters", "uncovered intent clusters", "landing-page overlap", "country/device divergence when supplied"],
        "falsifier": "If repeated authorized observations show no material intent/landing divergence, the risk must remain low or NOT_MEASURED rather than being inferred from page copy.",
        "decisionRule": "No score is emitted from public HTML alone. Compare only like-for-like windows; provider-side hidden query branches are never reconstructed as fact.",
        "minimumEvidence": "At least two comparable observation windows before a trend claim; otherwise report a point-in-time observation only.",
        "temporalSensitivity": "HIGH",
        "sourceIds": ["GOOGLE-AI-OPTIMIZATION", "GOOGLE-GENAI-PERFORMANCE-2026"],
        "lenses": ["SEO", "GEO", "AEO", "RAG"],
        "failureModes": ["query taxonomy drift", "landing URL canonical changes", "insufficient connected data"],
        "mitigations": ["version the query taxonomy", "segment before/after canonical changes", "preserve NOT_MEASURED when coverage data is incomplete"],
    },
    {
        "key": "citation_volatility",
        "title": "Citation & Recommendation Volatility",
        "hypothesis": "Brand mentions, citations and recommendation position can vary by provider, prompt, locale and time even when the website is unchanged.",
        "observable": "Provider-backed response observations collected with fixed prompt IDs, locale, timestamp, surface and citation extraction.",
        "requiredInputs": ["configured provider surfaces", "versioned prompt IDs", "locale", "timestamps", "citation URLs"],
        "metrics": ["mention rate", "citation rate", "recommendation rate", "share of answer", "citation-source churn"],
        "falsifier": "If repeated fixed-protocol observations are stable within the measured window, the engine must not manufacture volatility from a single crawl.",
        "decisionRule": "Compare only identical protocol segments. A provider/model/surface change starts a new segment and invalidates direct before/after attribution.",
        "minimumEvidence": "Repeated observations across at least two comparable windows; a single response is never a trend.",
        "temporalSensitivity": "CRITICAL",
        "sourceIds": ["OPENAI-RESPONSES-WEBSEARCH", "PERPLEXITY-SONAR", "GEMINI-GOOGLE-SEARCH"],
        "lenses": ["GEO", "AEO", "LLMO", "E-E-A-T"],
        "failureModes": ["provider model update", "search grounding not triggered", "prompt drift", "citation parser ambiguity"],
        "mitigations": ["segment by provider/model/surface", "record search-used/search-not-used state", "hash versioned prompts", "retain raw citation receipts"],
    },
    {
        "key": "crawler_policy_divergence",
        "title": "Crawler Purpose & Policy Divergence",
        "hypothesis": "Search discovery, user-request retrieval and training crawlers can legitimately have different access policies; accidental cross-purpose blocking is the risk.",
        "observable": "Effective robots.txt policy and reachable HTTP behavior for identified crawler user agents.",
        "requiredInputs": ["robots.txt", "canonical URL", "crawler identity registry", "effective HTTP response"],
        "metrics": ["allow/block by crawler", "purpose-class divergence", "missing explicit observation"],
        "falsifier": "Purpose-specific divergence that matches the publisher's explicit policy is not a defect.",
        "decisionRule": "Flag only unexplained or contradictory effective policy. Never equate training access with search visibility.",
        "minimumEvidence": "One current effective-policy observation per crawler identity plus current first-party vendor guidance.",
        "temporalSensitivity": "HIGH",
        "sourceIds": ["OPENAI-PUBLISHERS", "GOOGLE-COMMON-CRAWLERS", "ANTHROPIC-CRAWLERS", "PERPLEXITY-ROBOTS"],
        "lenses": ["SEO", "GEO", "LLMO"],
        "failureModes": ["stale crawler names", "CDN/WAF user-agent blocking", "robots redirect/error"],
        "mitigations": ["source-freshness gate", "probe effective HTTP path", "separate robots parsing from CDN/WAF denial"],
    },
    {
        "key": "render_retrieval_gap",
        "title": "Render-to-Retrieval Gap",
        "hypothesis": "Critical text, links or structured evidence can exist only after client rendering, creating a retrieval gap for systems that consume raw or partially rendered HTML.",
        "observable": "Paired raw-response and controlled browser-render captures of the same canonical URL and timestamp window.",
        "requiredInputs": ["raw HTML snapshot", "rendered DOM snapshot", "canonical URL", "capture timestamps"],
        "metrics": ["critical-text parity", "canonical parity", "structured-data parity", "primary-link parity", "content hash delta"],
        "falsifier": "If critical content and machine-readable identity are equivalent across paired captures, the gap is not established.",
        "decisionRule": "Public raw-HTML scanning alone cannot pass or fail render parity. Missing browser evidence remains NOT_MEASURED.",
        "minimumEvidence": "Paired captures of the same URL under a controlled browser profile.",
        "temporalSensitivity": "MEDIUM",
        "sourceIds": ["GOOGLE-AI-OPTIMIZATION", "GOOGLE-DEVELOPER-SEO"],
        "lenses": ["SEO", "GEO", "AEO", "RAG", "AAO"],
        "failureModes": ["hydration timeout", "consent wall divergence", "geo/device conditional rendering", "capture race"],
        "mitigations": ["bounded render timeout with explicit failure", "record consent state", "segment by device/locale", "capture raw and rendered artifacts under one correlation ID"],
    },
    {
        "key": "entity_identity_drift",
        "title": "Entity Identity Drift",
        "hypothesis": "Conflicting names, URLs, prices, organization identity or product facts across owned machine-readable surfaces can increase ambiguity even without access to any private knowledge graph.",
        "observable": "Visible page facts, JSON-LD, canonical metadata and verified owned profiles supplied by the customer.",
        "requiredInputs": ["visible identity facts", "JSON-LD graph", "canonical URLs", "authorized owned-profile facts when available"],
        "metrics": ["name consistency", "URL consistency", "offer/price consistency", "organization/product @id consistency", "conflict count"],
        "falsifier": "If owned public identity facts are internally consistent, the engine must not demand Wikidata, a Google MID or any hidden identifier.",
        "decisionRule": "Score only public consistency evidence; cross-domain consensus remains REQUIRES_CONTEXT unless authoritative external evidence is supplied.",
        "minimumEvidence": "At least one visible fact source and one machine-readable representation for any claimed conflict.",
        "temporalSensitivity": "MEDIUM",
        "sourceIds": ["GOOGLE-STRUCTURED-DATA", "GOOGLE-ORGANIZATION-SCHEMA"],
        "lenses": ["SEO", "GEO", "LLMO", "E-E-A-T"],
        "failureModes": ["stale offer schema", "duplicate @id nodes", "www/apex inconsistency", "localized identity mismatch"],
        "mitigations": ["bind visible and structured facts", "canonicalize @id graph", "normalize host policy", "validate locale-specific facts independently"],
    },
    {
        "key": "agent_action_friction",
        "title": "Agent Action Friction",
        "hypothesis": "A site may be discoverable yet difficult for browser agents or assistive automation to act on because forms, controls, navigation or machine interfaces are ambiguous.",
        "observable": "Public accessibility, form labeling, action URLs, security boundaries, conversion path continuity and documented machine interfaces.",
        "requiredInputs": ["public action path", "form/control semantics", "HTTP status chain", "documented API/tool surface when intentionally published"],
        "metrics": ["labeled-control coverage", "action-path continuity", "redirect/error count", "machine-interface discoverability", "auth-wall boundary"],
        "falsifier": "If the target action is accessible, labeled and deterministic in the measured public flow, the engine must not claim autonomous-agent failure without an agent execution trace.",
        "decisionRule": "Website-side friction can be evaluated; autonomous purchase or task completion in an external agent is never guaranteed.",
        "minimumEvidence": "Measured public action path; external-agent completion requires a separate authorized execution trace.",
        "temporalSensitivity": "MEDIUM",
        "sourceIds": ["WCAG22", "OPENAPI31", "GOOGLE-AI-OPTIMIZATION"],
        "lenses": ["AAO", "AEO", "E-E-A-T"],
        "failureModes": ["unlabeled controls", "client-only navigation", "non-deterministic redirects", "undocumented auth requirement"],
        "mitigations": ["programmatic labels", "crawlable/actionable links", "bounded redirect policy", "explicit auth and permission boundary"],
    },
]

ORCHESTRATION = {
    "model": "N8N_INSPIRED_EVENT_DRIVEN_OBSERVATION_CONTRACT",
    "stages": [
        "INGEST_EVIDENCE",
        "VALIDATE_AND_NORMALIZE",
        "OBSERVE_WITH_FIXED_PROTOCOL",
        "COMPARE_LIKE_FOR_LIKE",
        "DECIDE_WITH_EPISTEMIC_GATE",
        "PERSIST_RECEIPT_OR_DLQ",
    ],
    "correlationKey": "scanId + domain + riskKey + protocolVersion",
    "idempotencyKey": "sha256(domain|riskKey|windowStart|protocolVersion)",
    "retryPolicy": {
        "classification": "IMPLEMENTATION_DEFAULT_NOT_VENDOR_CLAIM",
        "retryableHttp": [408, 429, 500, 502, 503, 504],
        "maxRetries": 2,
        "backoffMs": [1000, 4000],
        "nonRetryable": ["invalid target", "authorization failure", "policy denial", "schema/contract violation"],
    },
    "dlq": {
        "on": ["retry exhaustion", "malformed provider receipt", "protocol mismatch", "stale or missing required evidence"],
        "effectOnScore": "NONE",
        "requiredReceipt": ["correlationKey", "riskKey", "failureClass", "attemptCount", "timestamp", "evidenceRefs"],
    },
    "temporalIntegrity": [
        "Provider/model/surface changes start a new comparison segment.",
        "A missing observation cannot be converted into PASS or FAIL.",
        "Removing evidence cannot increase confidence.",
        "A point-in-time result cannot be labeled a trend.",
    ],
    "security": [
        "Provider credentials stay server-side and are never serialized into scan reports.",
        "Public scanning remains read-only and SSRF fail-closed.",
        "Tool or provider output is treated as untrusted data until schema-validated.",
    ],
}


def main() -> None:
    profile = json.loads(PROFILE.read_text(encoding="utf-8"))
    sources = json.loads(SOURCES.read_text(encoding="utf-8"))
    source_ids = {x.get("id") for x in sources.get("sources", [])}

    keys = [x["key"] for x in CONTRACTS]
    if len(CONTRACTS) != 6 or len(set(keys)) != 6:
        raise SystemExit("BLACKBOX CONTRACT FAIL: exactly six unique analyses are required")

    missing_sources = sorted({sid for x in CONTRACTS for sid in x["sourceIds"] if sid not in source_ids})
    if missing_sources:
        raise SystemExit("BLACKBOX CONTRACT FAIL: unknown source IDs: " + ", ".join(missing_sources))

    layer = profile.setdefault("advancedBlackBoxRiskLayer", {})
    canonical_keys = layer.get("analyses", keys)
    if canonical_keys != keys:
        raise SystemExit(f"BLACKBOX CONTRACT FAIL: risk registry drift: {canonical_keys!r} != {keys!r}")

    layer.update({
        "classification": "NON_SCORING_ADVANCED_BLACKBOX_RISK_LAYER",
        "version": VERSION,
        "analysisCount": 6,
        "analyses": keys,
        "transformerReverseEngineeringBoundary": "Observable retrieval, citation, rendering, entity and action behavior is tested as a black box. Proprietary transformer weights, embeddings, rerankers, hidden prompts and private indexes are neither accessed nor inferred as fact.",
        "observationContracts": CONTRACTS,
        "orchestrationContract": ORCHESTRATION,
        "decisionStates": ["PASS", "WARN", "FAIL", "NOT_MEASURED", "REQUIRES_CONTEXT"],
        "confidenceMonotonicity": "Confidence must not increase when evidence is removed or becomes stale.",
        "comparisonRule": "Only like-for-like protocol segments may be compared as before/after evidence.",
        "publicContract": "https://htmlandhtml.com/blackbox-observation-contract.json",
    })

    profile["advancedBlackBoxRiskLayer"] = layer
    PROFILE.write_text(json.dumps(profile, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    public = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "name": "HTML&HTML Six-Area Black-Box Observation Contract",
        "version": VERSION,
        "updated": UPDATED,
        "canonical": "https://htmlandhtml.com/blackbox-observation-contract.json",
        "classification": layer["classification"],
        "nonClaim": layer["transformerReverseEngineeringBoundary"],
        "analysisCount": 6,
        "analyses": CONTRACTS,
        "orchestrationContract": ORCHESTRATION,
        "sourceRegistry": "https://htmlandhtml.com/sources.json",
        "scoreEffect": "NONE",
    }
    PUBLIC.write_text(json.dumps(public, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # Machine-readable discovery without claiming Google ranking impact.
    marker = "https://htmlandhtml.com/blackbox-observation-contract.json"
    for rel in ("llms.txt", "index.md"):
        path = ROOT / rel
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        if marker not in text:
            block = (
                "\n\n## Black-box observation methodology\n"
                f"- [{marker}]({marker}) — six non-scoring observation contracts for query fan-out, citation volatility, crawler-policy divergence, render parity, entity drift and agent-action friction. This is an evidence protocol, not secret model access.\n"
            )
            path.write_text(text.rstrip() + block, encoding="utf-8")

    print("BLACKBOX OBSERVATION CONTRACT PASS: six falsifiable non-scoring areas + n8n-style orchestration materialized.")


if __name__ == "__main__":
    main()
