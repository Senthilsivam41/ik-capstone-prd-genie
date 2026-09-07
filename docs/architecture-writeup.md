# Q3 Architecture Writeup — PRD Genie

NeuronForge Technologies · Applied Agentic AI for PMs/TPMs Capstone  
Author: Sendil · 1–2 page design / tool rationale / cost  
Decisions: [ADR-001](adr/ADR-001-orchestration-pattern.md) · [ADR-002](adr/ADR-002-extended-capability.md) · [ADR-003](adr/ADR-003-split-model-design.md) · [ADR-004](adr/ADR-004-gap-analyzer-placement.md) · [ADR-005](adr/ADR-005-workflow-platform.md)

## Problem 

PRD Genie turns NeuronForge meeting transcripts, product briefs, and stakeholder notes into a first-draft PRD and user stories so PMs stop hand-mining unstructured discussion. It is for PMs/TPMs who must ship a consistent template to engineering. The biggest risk if the AI is wrong is a hallucinated requirement — a "maybe" or a missing metric treated as committed scope — which is worse than the manual process because it looks like a finished document.

## Design

Four agents. Three are core (Extractor, PRD Generator, Story Breakdown). One is the extended capability (Gap Analyzer).

<div align="center">
  <img src="../design/architecture-diagram.png" alt="Automated Product Requirements Generation Workflow — sequential pipeline with Gap Analyzer branching after the Requirement Extractor" width="920" />
  <p><em>Automated Product Requirements Generation Workflow.</em><br />
  PNG is the submission visual; <a href="../design/architecture-diagram.svg">architecture-diagram.svg</a> is the structural source.</p>
</div>

Text fallback (same flow):

```
Transcript / brief / notes
        ↓
Requirement Extractor     (full-tier)  stated vs ambiguous
        ↓                         ↓
  Gap Analyzer (full-tier)    PRD Generator (mini-tier)
  clarification questions            ↓
                              Story Breakdown (mini-tier)
                                     ↓
                              PRD + user stories (markdown)
```

**Orchestration is sequential with one branch** (ADR-001). Every input type follows extract → generate → breakdown. A router would add a classification step the baseline dataset does not score. A hierarchical supervisor would hide per-agent failures — the opposite of what Langfuse evaluation needs.

**Gap Analyzer sits after the Extractor, in parallel with PRD generation** (ADR-004). The course diagram parks it after stories. That is too late: an unresolved contradiction would already have been rewritten into a PRD and then into stories. Catching it on the extraction schema is cheaper and is what T2, T3, T5, T6, T9, and T10 actually test. Clarification questions are a terminal output. Human-in-the-loop resume is out of scope; the PM answers offline and re-runs from the Extractor as a fresh, stateless run.

**Hallucination guardrail is in every prompt, not a later filter.** If the input is too vague to determine X, the agent writes UNKNOWN. Empty PRD sections stay under Open Questions. Contradictions are surfaced, never "resolved" by picking a side. Acceptance criteria (T4) are copied verbatim.

## Tool rationale

| Category | Choice | Why |
|---|---|---|
| Workflow platform | n8n (IK Cloud) | Cohort received n8n (`agenticai100.app.n8n.cloud`); that is the live canvas. Rubric accepts LangFlow **or equivalent**. 6 Sep: n8n→LangFlow JSON is broken — no import ([ADR-005](adr/ADR-005-workflow-platform.md)) |
| LLM — Extractor / Gap Analyzer | Claude or GPT-4o (full tier) | Highest-stakes judgment; 6/12 baseline tests grade this step |
| LLM — PRD Generator / Story Breakdown | GPT-4o-mini | Mechanical fill of a fixed template from already-grounded data |
| Document ingestion | n8n Manual Trigger / text | Inputs are `.txt` / `.md`; no OCR or CSV reshape |
| Observability | Langfuse | Per-agent traces, token cost, LLM-as-judge scores (completeness, hallucination, groundedness); maps to the class open-coding / axial-coding loop |
| Output | Markdown matching `prd_template.md` | Rubric does not require Docs/Notion export |
| Auth | None in-app | File-upload pipeline; provider keys live in env only |

LangFlow was the 30 Aug default builder. The cohort then received an **n8n** account, so we implemented there (ADR-005). On 6 Sep the facilitator confirmed n8n→LangFlow JSON export is **broken**, so LangFlow is not a later import. Graders open the n8n export. A coded LangGraph app stays rejected — the capstone scores a visual canvas export plus traces, not a custom runtime.

## Cost analysis (Langfuse actuals — 6 Sep 2026)

**Formula:** `tokens × price × volume` as **cost per user per day**. Prices are Langfuse `calculatedTotalCost` on the live models (Extractor/PRD **gpt-4o**, Gap/stories **gpt-4o-mini**), not a second spreadsheet.

**Per-run actuals** — ten full-pipeline traces, T1–T10, 6 Sep 11:25–11:30Z, project `my-capstone-prd-genie`. Each run = four generations. Source table: [baseline-results.md](../evidence/baseline-results.md#per-agent-judge-re-score-6-sep-2026).

| Stat | Langfuse totalCost |
|---|---|
| Mean / run (n=10) | **~$0.0071** |
| Min (T9 empty notes) | $0.00389 |
| Max (T4 long AC) | $0.00978 |
| T1 (typical brief) | $0.00586 |

A-priori sketch was ~$0.022 / run. Live briefs are shorter than that sketch; Gap and stories stay on mini. Do not mix the two without saying which.

**Volume → cost per user per day** (planning assumption: 2 first-drafts / PM / day):

| Scenario | Volume | Cost |
|---|---|---|
| One PM, 2 first-drafts / day | 2 × $0.0071 | **~$0.014 / user / day** |
| Initial release, 20 PMs | 40 runs / day | ~$0.28 / day · ~$6.20 / 22-day month |

Judge tokens (Completeness / Hallucination / Groundedness on gpt-4o) are **beside** the pipeline and are not in these run costs. Re-runs after clarification pay the full four-agent `totalCost` again (stateless).

## Evaluation strategy

1. Connect Langfuse **before** the first successful canvas run (not bolted on).
2. Score configs: **completeness**, **hallucination** (untraceable items), **groundedness**.
3. **TDD:** treat each T-row as a failing test. Green one ID (paste output + Pass/Fail) before adding the next agent. Do not run all 12 only after the full graph exists.
4. Open-code failing traces; axial-code into the dataset's own categories (vague, contradictory, incomplete, edge-case, dependency).
5. Change **one** thing per experiment (`evidence/experiment-log.md`), in this order if needed: prompt → model swap → architecture → config → fine-tune. Because outputs are non-deterministic, **re-run the same change several times** and keep it only if the gain is consistent.
6. **Three or more production metrics** (session brief; picked from this project's failure mode — invented requirements):
   1. Hallucination rate (% of items with no evidence quote)
   2. Groundedness (traceable to source)
   3. Format compliance (all 10 template sections present)
   Plus operational: tokens and latency per run. Business: PM drafting time saved per first-draft PRD.

T1–T12 outputs and E1/E1b are in [baseline-results.md](../evidence/baseline-results.md) and [experiment-log.md](../evidence/experiment-log.md). Per-agent H/G/C scores exist on the 6 Sep T1–T10 re-runs (E5). Q4 is [reflection.md](reflection.md).
