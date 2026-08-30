# ADR-002: Extended capability — Gap Analyzer over Scope Estimator

**Status:** Accepted  
**Date:** 2026-08-30  
**Context:** Q3 extended capability (8 pts). Course requires at least one of: Gap Analysis, Scope Estimator, Version Comparison.

## Decision

Build **Gap Analyzer**. Defer Scope Estimator and Version Comparison.

## Why Gap Analyzer

Six of the twelve baseline tests (T2, T3, T5, T6, T9, T10) score the system's ability to detect vagueness, contradiction, missing information, or dependency risk — not its ability to generate more content. Gap Analyzer is the same failure mode the dataset already grades. Scope Estimator (T-shirt sizes) and Version Comparison would add a capability the 12-input table does not test, while leaving the hardest tests to the Extractor alone.

Gap Analyzer also reinforces the hallucination guardrail: its job is to *ask questions*, not to fill gaps. That is the opposite of padding, which is R3 in the RAID log.

## Alternatives considered

| Option | Verdict |
|---|---|
| Scope Estimator | Rejected for this capstone. Useful later; not graded by T1–T12. Underspecified stories are already flagged by Gap Analyzer as missing info. |
| Version Comparison | Rejected. No paired transcript versions in the baseline set. |
| Fine-tuning the Extractor | Explicitly optional and out of scope until core + baseline pass (R5). |
| RAG over past PRDs | No PRD corpus exists yet. Natural follow-on after this capstone. |

## Consequences

- Extended-capability marks map onto the same traces as core extraction.
- Prompt budget is spent on judgment (full-tier model), not on inventing story sizes.
- Clarification questions are a **terminal output**. The PM answers them offline and re-runs from the Extractor (see charter: HITL simulated, not built).
