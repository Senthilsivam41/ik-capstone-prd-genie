# ADR-003: Split-model design — full-tier for judgment, mini-tier for formatting

**Status:** Accepted  
**Date:** 2026-08-30  
**Context:** Q3 tool rationale + cost analysis (scored)

## Decision

| Agent | Model tier | Why |
|---|---|---|
| Requirement Extractor | Full (Claude or GPT-4o) | Stated-vs-ambiguous judgment and contradiction detection are graded on 6/12 tests |
| Gap Analyzer | Full (Claude or GPT-4o) | Same risk profile as Extractor — re-reasons over missing/conflicting info |
| PRD Generator | Mini (GPT-4o-mini / 4.1-mini) | Mechanical mapping of already-grounded extraction into `prd_template.md` |
| Story Breakdown | Mini (GPT-4o-mini) | Fixed-format transformation, not open-ended reasoning |

Exact model IDs are locked in LangFlow when keys are connected. The *tier split* is the decision; swapping Claude for GPT-4o (or vice versa) on the full-tier pair does not change the architecture.

## Why not one model for all four

A single full-tier model wastes budget on formatting. A single mini-tier model under-reasons on T2/T3/T5/T6/T9/T10 — the tests that actually fail extraction. The split spends the reasoning budget only where the baseline dataset tests judgment.

This also gives a clean A/B in the evaluation loop: if PRD padding appears (R3), the first experiment is a prompt change on the mini-tier agent, not a model upgrade.

## Cost implication (a priori)

See [architecture-writeup.md](../architecture-writeup.md) for the token × price × volume table. Replace those estimates with Langfuse actuals after the first 12-run baseline.

## Consequences

- Architecture diagram color-codes full-tier vs mini-tier so the split is visible in the submission pack.
- Observability must report **per-agent** token cost, not just end-to-end, or the split cannot be defended.
