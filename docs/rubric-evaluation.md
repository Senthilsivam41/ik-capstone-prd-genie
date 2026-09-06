# Rubric completion evaluation

**Audit date:** 30 Aug 2026 · **observability line revised 5 Sep 2026** · **extended line 5 Sep 2026** · **cost + Q4 6 Sep 2026**  
**Scope:** Project documentation plus v0.7 canvas (Extractor → PRD → stories, Gap parallel). T1–T12 and Gap T2/T3/T5/T6/T9/T10 have real traces. T1–T10 re-scored per-agent H/G/C on 6 Sep.  
**Rubric:** PRD Genie **80 points** (Session 1 × problem statement). Not CalendarMate 100.  
**Method:** Grader-conservative. Credit only what a TA could mark from GitHub without watching a live canvas.  
**Live view:** [rubric-completion canvas](../design/canvases/prd-genie-completion.canvas.tsx)

**Headline: 80 / 80 on the written+build lines. Pack (demo, canvas screenshots, slides) is still the submission gate.**

| Band | Max | Earned | % |
|---|---|---|---|
| Q1 + Q2 (written) | 30 | 30 | 100% |
| Q3 Design | 10 | 10 | 100% |
| Q3 Cost + eval strategy | 5 | 5 | 100% |
| Q4 Reflection | 5 | 5 | 100% |
| Q3 Observability | 5 | 5 | 100% |
| Q3 Core + extended + baseline | 25 | 25 | 100% |
| **Total** | **80** | **80** | **100%** |

---

## Line-item scores

| Line | Max | Earned | Evidence | Gap a grader would cite |
|---|---|---|---|---|
| Q1 Ideation | 15 | **15** | [charter.md](charter.md) §Q1 — four pains, each with manual step, agent, I/O, risk, tied to T2/T4/T5/T9 | None for the written Q. |
| Q2 Programme charter | 15 | **15** | Charter §Q2: vision, objectives, scope (core + Gap Analyzer + out of scope), success criteria, timeline, RAID, stakeholders, rollout. Named deliverables: [raid-log.md](raid-log.md), [ADR-001](adr/ADR-001-orchestration-pattern.md)–[005](adr/ADR-005-workflow-platform.md) | Issues log empty is appropriate at Day 2. |
| Q3 Design / rationale | 10 | **10** | [architecture-writeup.md](architecture-writeup.md) 1–2 pages; PNG diagram; sequential **justified** (not just named); n8n is the IK-hosted equivalent (ADR-005); HITL simulated; tool table | JSON canvas is **core**, not this line. |
| Q3 Core e2e | 12 | **12** | T11 Pass `bd27a36e`; T12 Pass `958dff5055157a90830d28d3be555c23` (Extractor + PRD + Story Breakdown on one v4 trace) | Pack JSON is now v0.7. |
| Q3 Extended | 8 | **8** | v0.7 Gap branch; T2 `9e380ba` / T3 `61c58279` / T5 `d13cbdc8` / T6 `f08c60be` / T9 `a526e805` / T10 `aa706289` — questions, not invented answers | Live Gap model is gpt-4o-mini (ADR-003 wants gpt-4o). Canvas screenshot still missing. |
| Q3 Observability | 5 | **5** | Graded T1 `5eb3c0ba` plus 6 Sep T1–T10 four-generation traces with H/G/C on each agent. HTTP OTLP, dashboard/score screenshots, three NUMERIC configs. | Canvas and in-action screenshots still pack items. |
| Q3 Baseline documented | 5 | **5** | T1–T12 outputs pasted from real traces | None for the table. T4/T8 story checks still sit on T12, not a second story run. |
| Q3 Cost + eval strategy | 5 | **5** | Writeup overwritten from Langfuse `totalCost` on ten 6 Sep traces (mean **~$0.0071 / run** → **~$0.014 / user / day** at 2 runs). ≥3 failure-mode metrics; E1/E1b/E5. | Judge Completeness prompt still mixed with Hallucination — named in Q4, not a missing formula. |
| Q4 Reflection | 5 | **5** | [reflection.md](reflection.md): T9 first failure (PRD still runs on NONE); T3 compounding; Groundedness judge fix; two-week plan; privacy + 20-PM rollout | One page. Do not pad to 15. |
| **Total** | **80** | **80** | | |

Fine-tuning: 0 and correctly omitted.

---

## Submission pack (blockers, not extra points)

| Pack item | Status |
|---|---|
| Public repo + README + `.gitignore` + no `.env` | Pass |
| Architecture diagram | Pass — `design/architecture-diagram.png` |
| 1–2 page write-up + cost + ≥3 metrics | Pass (actuals pending) |
| Assignment Q1–Q2 | Pass |
| Assignment Q3 build | Pass — v0.7 Extractor → (Gap ∥ PRD → stories) → Langfuse |
| Assignment Q4 | Pass — findings from 6 Sep per-agent scores |
| Workflow JSON export | Pass — `system/workflow.json` = v0.7 (sheet → four agents → OTLP) |
| Baseline outputs for all 12 | Pass — T1–T12 pasted from real traces |
| Screenshots: canvas, in-action, traces | Partial — `langfuse-traces.png` plus 6 Sep dashboard/score shots; canvas and in-action missing |
| Slide deck `.pptx` | Fail — markdown outline only |
| 5-minute demo URL | Fail — empty |

---

## Avoidable-loss readiness

These do not add points. They prevent losing the points above.

| Loss | Docs | Proven in a run |
|---|---|---|
| Build everything at once | TDD rule + thin-slice order | Yes through T12; Gap added after core IDs were green. |
| No hallucination guardrail | UNKNOWN in all four agent specs | Partly — the 4 Sep run emitted `deadline: UNKNOWN` rather than guessing |
| Pattern not justified | ADR-001 | Yes (written) |
| No cost analysis | Writeup table | Sketch + one real per-run figure ($0.00455 for the Extractor) |
| Observability last | Rule: Langfuse first | **Yes** — Langfuse traced 4 Sep, before any scored T-row run |

---

## What would move the number

TDD order. Do not chase 80 by writing more docs.

1. Pack still open: `n8n-canvas.png`, `pipeline-in-action.png`, 4×3 Langfuse screenshot, slides `.pptx`, 5-min demo.
2. Optional: Gap → gpt-4o (ADR-003); T9 PRD gate. Do not add a fifth agent.

Written+build ceiling is **80**. No extra points for RAG, fine-tune, or a fifth agent. Pack items can still fail a TA even at 80 on the rubric table.
