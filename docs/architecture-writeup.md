# Q3 Architecture Writeup — PRD Genie

NeuronForge Technologies · Applied Agentic AI for PMs/TPMs Capstone  
Author: Sendil · 1–2 page design / tool rationale / cost  
Decisions: [ADR-001](adr/ADR-001-orchestration-pattern.md) · [ADR-002](adr/ADR-002-extended-capability.md) · [ADR-003](adr/ADR-003-split-model-design.md) · [ADR-004](adr/ADR-004-gap-analyzer-placement.md)  
Diagram: [design/architecture-diagram.svg](../design/architecture-diagram.svg)

## Problem (three sentences)

PRD Genie turns NeuronForge meeting transcripts, product briefs, and stakeholder notes into a first-draft PRD and user stories so PMs stop hand-mining unstructured discussion. It is for PMs/TPMs who must ship a consistent template to engineering. The biggest risk if the AI is wrong is a hallucinated requirement — a "maybe" or a missing metric treated as committed scope — which is worse than the manual process because it looks like a finished document.

## Design

Four agents. Three are core (Extractor, PRD Generator, Story Breakdown). One is the extended capability (Gap Analyzer).

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
| Workflow platform | LangFlow | Purpose-built for chaining distinct-prompt LLM agents; course materials pair it with PRD Genie; no OAuth/file-upload friction — every input is plain text |
| LLM — Extractor / Gap Analyzer | Claude or GPT-4o (full tier) | Highest-stakes judgment; 6/12 baseline tests grade this step |
| LLM — PRD Generator / Story Breakdown | GPT-4o-mini | Mechanical fill of a fixed template from already-grounded data |
| Document ingestion | LangFlow text/file nodes | Inputs are `.txt` / `.md`; no OCR or CSV reshape |
| Observability | Langfuse | Per-agent traces, token cost, LLM-as-judge scores (completeness, hallucination, groundedness); maps to the class open-coding / axial-coding loop |
| Output | Markdown matching `prd_template.md` | Rubric does not require Docs/Notion export |
| Auth | None in-app | File-upload pipeline; provider keys live in env only |

n8n was considered and rejected: the work is prompt-chaining, not webhook/API orchestration. A coded LangGraph app was rejected because the capstone scores a documented LangFlow (or equivalent) canvas plus traces, not a custom runtime.

## Cost analysis (a priori — replace with Langfuse actuals after baseline)

Public list prices used for the estimate (USD / 1M tokens). Lock the exact model IDs in LangFlow and overwrite this table from traces.

| Model | Input | Output |
|---|---|---|
| GPT-4o (full) | $2.50 | $10.00 |
| GPT-4o-mini | $0.15 | $0.60 |

**Per-run token sketch** (typical T1-sized input, ~400–800 source tokens):

| Agent | In (est.) | Out (est.) | Cost |
|---|---|---|---|
| Extractor (full) | 1,800 | 700 | ~$0.0115 |
| Gap Analyzer (full) | 1,600 | 500 | ~$0.0090 |
| PRD Generator (mini) | 2,200 | 1,200 | ~$0.0011 |
| Story Breakdown (mini) | 1,800 | 900 | ~$0.0008 |
| **Total / run** | | | **~$0.022** |

Split-model vs all-full-tier: the two mini-tier agents would cost ~$0.018 extra per run on GPT-4o. Across 12 baseline inputs that is noise; across **20 PRDs/day × 22 working days** (~440 runs/month) it is ~$8/month saved and, more importantly, it keeps the reasoning budget on the agents the dataset actually tests.

**Volume scenario (NeuronForge, post-capstone):** 20 first-draft PRDs/day → ~$0.44/day → **~$10/month** at this token sketch, plus Langfuse free-tier tracing. Re-runs after clarification double the Extractor+Gap cost only, not a fourth agent, because the pipeline is stateless.

These numbers are a ceiling-style sketch. Actuals will be higher on T11/T12 (PRD-length context) and lower on T9 (empty notes). The scored deliverable is this formula plus Langfuse screenshots of real token totals — not the estimate itself.

## Evaluation strategy

1. Connect Langfuse **before** the first successful canvas run (not bolted on).
2. Score configs: **completeness**, **hallucination** (untraceable items), **groundedness**.
3. Run all 12 baseline inputs. Document each output in `evidence/baseline-results.md`.
4. Open-code failing traces; axial-code into the dataset's own categories (vague, contradictory, incomplete, edge-case, dependency).
5. Change **one** prompt or model setting per experiment (`evidence/experiment-log.md`). Never five things at once.
6. Production metrics to keep after submission: hallucination rate, format compliance, tokens/run, latency, PM edit-time vs hand-draft (business metric from the charter).

Baseline results and the experiment log are empty of scores until Days 9–11 of the build. The strategy above is what Q3 asks for; Q4 reflection fills in what the traces actually showed.
