# ADR-004: Gap Analyzer placement — after Extractor, in parallel with PRD Generator

**Status:** Accepted  
**Date:** 2026-08-30  
**Context:** Diverges from the course's suggested placement

## Decision

Run Gap Analyzer **immediately after Requirement Extractor**, in parallel with PRD Generator. Both consume the Extractor's structured output.

Do **not** place Gap Analyzer after Story Breakdown (the course's suggested parallel slot).

## Why earlier

The course diagram parks Gap Analyzer / Scope Estimator after stories. That is the wrong place for *this* failure mode. Ambiguity that survives extraction will be rewritten twice (PRD, then stories) before anyone flags it. Each rewrite is a chance to silently resolve a contradiction or invent a metric.

Catching the gap on the Extractor output:

1. Prevents an unresolved item from propagating through two transformations.
2. Is cheaper to fix — the PM answers questions and re-runs from the start, rather than editing a padded PRD.
3. Keeps Gap Analyzer's input in the same schema as the Extractor (stated vs ambiguous), which is what T2/T3/T5/T6/T9/T10 actually test.

## Why not blocking

Gap Analyzer does **not** gate PRD generation. A blocking HITL loop is out of scope (charter). PRD Generator still runs so T11/T12 can be scored on fully-specified inputs (T1, T4, T7, T8). On vague inputs, the PRD is expected to be thin and the Gap Analyzer output is the graded artifact.

## Alternatives considered

| Placement | Verdict |
|---|---|
| After Story Breakdown (course default) | Rejected. Late detection; gaps already baked into PRD + stories. |
| Before Extractor | Rejected. Gap analysis on raw text duplicates the Extractor's stated-vs-ambiguous job. |
| Blocking gate before PRD | Rejected. Requires HITL UI, which is out of scope. |

## Consequences

- Canvas has a branch, not a longer chain. Traces show two children of the Extractor span.
- Clarification questions are a terminal output. Re-runs are always full-pipeline, never resumed mid-trace.
- This deviation from the course diagram must be called out in the architecture writeup — it is a scored justification, not a silent change.
