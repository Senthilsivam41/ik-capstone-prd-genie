# Agent prompts

These four files are the scored agents. A TA can read them here without opening n8n JSON.

| Agent | n8n node | Spec (readable) | Live canvas (verbatim) | Live model |
|---|---|---|---|---|
| 1 Requirement Extractor | `Requirement Extractor1` | [requirement-extractor.md](requirement-extractor.md) | [live/requirement-extractor.system.md](live/requirement-extractor.system.md) | gpt-4o |
| 2 Gap Analyzer | `Gap Analyzer Agent` | [gap-analyzer.md](gap-analyzer.md) | [live/gap-analyzer.system.md](live/gap-analyzer.system.md) | gpt-4o-mini |
| 3 PRD Generator | `PRD Generator` | [prd-generator.md](prd-generator.md) | [live/prd-generator.system.md](live/prd-generator.system.md) | gpt-4o |
| 4 Story Breakdown | `PRD Breakdown Agent` | [story-breakdown.md](story-breakdown.md) | [live/story-breakdown.system.md](live/story-breakdown.system.md) · [user](live/story-breakdown.user.md) | gpt-4o-mini |

**Spec vs live:** the spec is the intended ROLE / INPUT / OUTPUT / RULES. `live/` is the exact system (and story user) message from [`system/workflow.json`](../../system/workflow.json) v0.7 — the strings that produced T1–T12. n8n’s editor inserts extra blank lines; Story Breakdown’s live system message starts with `=` (n8n expression prefix). Do not “clean” live files to match the spec after a scored run.

**How to paste:** copy ROLE through Self-check from the spec into the n8n chain **System Message**, then re-export JSON so `live/` stays in sync.

Judges (Completeness / Hallucination / Groundedness) are **not** agents. They live in Langfuse, not in this folder.
