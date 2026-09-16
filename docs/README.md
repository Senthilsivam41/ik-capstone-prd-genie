# docs/ — grader reading order

Do not start this folder at RAID or the Langfuse acceptance checklist. Those are supporting. The scored writeups come first.

## Read in this order

| # | File | Rubric line | What it is |
|---|---|---|---|
| 1 | [charter.md](charter.md) | Q1 15 + Q2 15 | Pain → agent → I/O → risk; vision, scope, success, rollout |
| 1b | [solution-journey.md](solution-journey.md) | Q2 rollout + Q3 tools | AS-IS / TO-BE (live); Drive export live; Meet/chat HITL **not built** |
| 2 | [architecture-writeup.md](architecture-writeup.md) | Q3 Design 10 + Cost+eval 5 | Diagram, **why** sequential + branch, what each agent does, `$/user/day` |
| 3 | [reflection.md](reflection.md) | Q4 5 | One page after traces. Do not pad to 15 |
| 4 | [adr/](adr/) | Named Q2 deliverable | Open only if a decision is unclear |
| 5 | Then leave this folder → [../evidence/baseline-results.md](../evidence/baseline-results.md) | Baseline 5 | T1–T12 outputs from real runs |
| 6 | Then [../evidence/experiment-log.md](../evidence/experiment-log.md) | Cost+eval / Q4 | Failures found and how we improved (E1 / E1b / E5) |

**Business rules** (BR-1…BR-14) sit in [brd.md](brd.md). Read after the charter if you need the “why we refuse to invent” contract.

**Score table:** [rubric.md](rubric.md) (what the course asks). **Live audit:** [rubric-evaluation.md](rubric-evaluation.md) (what is in git today).

## ADRs (only as needed)

| ADR | Decision |
|---|---|
| [ADR-001](adr/ADR-001-orchestration-pattern.md) | Sequential + one branch, not a router |
| [ADR-002](adr/ADR-002-extended-capability.md) | Gap Analyzer is the +8, not Scope Estimator |
| [ADR-003](adr/ADR-003-split-model-design.md) | Full-tier vs mini-tier intent (live models noted in the writeup) |
| [ADR-004](adr/ADR-004-gap-analyzer-placement.md) | Gap after Extractor, **not a gate** |
| [ADR-005](adr/ADR-005-workflow-platform.md) | Stay on IK n8n; LangFlow import is broken |

## Appendix (do not lead with these)

| File | When to open it |
|---|---|
| [raid-log.md](raid-log.md) | Risks / assumptions register (Q2 named deliverable) |
| [brd.md](brd.md) | Business framing and binding rules |
| [release-plan.md](release-plan.md) | Slice order (TDD) and demo gate |
| [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md) | How n8n posts OTLP; judges stay in Langfuse |
| [course-touchpoints.md](course-touchpoints.md) | Session brief vs this repo |
| [facilitator-clarifications-2026-09-02.md](facilitator-clarifications-2026-09-02.md) | Session 1 Q&A |
| [facilitator-clarifications-2026-09-06.md](facilitator-clarifications-2026-09-06.md) | Session 2: GT vs spec, judges beside the canvas, GitHub must be self-explanatory |
| [problem-statement.pdf](problem-statement.pdf) | Course PDF (immutable) |

## Not in this folder

| Path | What it is |
|---|---|
| [`../system/workflow.json`](../system/workflow.json) | **1.0** graded n8n export — **import this** |
| [`enhancement-v1.1-drive-inbox.md`](enhancement-v1.1-drive-inbox.md) | Optional Drive TPM inbox (n8n Cloud is offline; mark from JSON + this note) |
| [`../design/drive-output.md`](../design/drive-output.md) | 1.1 folder contract |
| [`../design/agents/`](../design/agents/) | Four agent prompts (spec + live n8n copy) |
| [`../design/architecture/`](../design/architecture/) | Archify AS-IS / TO-BE / live-vs-target HTML |
| [`../evidence/screenshots/`](../evidence/screenshots/) | Canvas / in-action / Langfuse shots |
| [`../demo/prd-genie-demo.mp4`](../demo/prd-genie-demo.mp4) | **Demo** — T1 + T5, ~3:57 (5:00 is a max) |
| [`../slides/prd_genie_capstone_summary.pptx`](../slides/prd_genie_capstone_summary.pptx) | Slide deck |
