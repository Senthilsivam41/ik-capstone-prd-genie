# ADR-001: Orchestration pattern — Sequential Pipeline with one branch

**Status:** Accepted  
**Date:** 2026-08-30  
**Context:** Q3 design / orchestration-pattern justification (scored)

## Decision

Use a **sequential pipeline** (Extractor → PRD Generator → Story Breakdown) with a **single branch** after extraction: Gap Analyzer runs in parallel with PRD Generator, both consuming the Extractor's structured output.

Do **not** use a Router/Dispatcher as the primary pattern. Do **not** use a hierarchical supervisor.

## Why sequential

Every PRD Genie input — transcript, product brief, or stakeholder notes — follows the same stages: extract → generate → break down. The course brief itself recommends sequential for that reason. A router would earn marks only if input types needed different parsers; they do not. The Extractor already handles quality variation (detailed / vague / contradictory / empty) as a judgment problem, not a routing problem.

A hierarchical supervisor would add a control agent that does not produce graded output and that makes traces harder to isolate. The evaluation loop (open-coding failing traces, one fix at a time) depends on each agent being independently inspectable in Langfuse.

## Why the branch exists

Gap Analyzer is the extended capability (ADR-002). Placing it as a branch off extraction — not after Story Breakdown — is ADR-004. The sequential spine stays intact; the branch does not turn the system into a router.

## Alternatives considered

| Pattern | Verdict |
|---|---|
| Router / Dispatcher | Rejected. All three input types share the same stages. Routing would hide failures behind a classification step the rubric does not score. |
| Hierarchical | Rejected. Extra supervisor tokens, extra failure surface, worse per-agent eval. |
| Sequential with no branch | Rejected once Gap Analyzer is in scope — it would force gap detection after stories, which is ADR-004's rejected placement. |

## Consequences

- LangFlow canvas is a straight chain plus one parallel node.
- Each agent can be scored independently (completeness, hallucination, groundedness).
- Re-runs after stakeholder answers start from the Extractor as a fresh run (stateless). No mid-trace resume.
