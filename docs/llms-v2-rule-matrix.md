# llms.txt v2 Rule Matrix

| Rule | Classification | Production meaning |
|---|---|---|
| LLM-R001 single H1 | PROPOSAL / blocking | Required v2 project/site heading |
| LLM-R002 non-empty H1 | PROPOSAL / blocking | Required heading must identify something |
| LLM-R003 H1 first structural section | PROPOSAL / warning | Expected v2 sequence after optional BOM |
| LLM-R004 summary block sequencing | PROPOSAL / warning | If a summary is used, keep the expected section shape |
| LLM-R005 no pre-H2 extra headings | PROPOSAL / warning | v2 allows Markdown prose/lists before file sections but not extra headings |
| LLM-R006 H2 file-list item has Markdown link | PROPOSAL / blocking | File-list resource declaration |
| LLM-R007 H2 section contains file lists | PROPOSAL / warning | H2 sections are resource/file-list sections |
| LLM-R009 duplicate URLs | RECOMMENDATION | Quality/determinism, not required format |
| LLM-R010 summary present | RECOMMENDATION | Useful orientation, not required in v2 |
| LLM-R011 Optional section | RECOMMENDATION/pass | Convention only; no mechanical omission semantics |
| LLM-R012 file size | INTERNAL_HEURISTIC/pass | Telemetry; no fixed v2 byte limit |
| LLM-R013 frontmatter | INTERNAL_HEURISTIC/pass | Observed only; no invented spec prohibition |
| LLM-LINK-* | PROPOSAL / blocking | Declared file-list resource is not reachable from the validator runtime |
| LLM-REDIRECT-* | RECOMMENDATION | Prefer direct final destinations |
| LLM-HTTPS-* | RECOMMENDATION | Prefer HTTPS resources |

The dedicated llms score uses a disclosed HTML&HTML weighting, loaded from `llms-rules-v2.json`. It is not an official llms.txt score.
