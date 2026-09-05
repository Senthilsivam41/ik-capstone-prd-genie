# Rubric completion evaluation

**Audit date:** 30 Aug 2026 · **observability line revised 5 Sep 2026** (score configs verified same day)  
**Scope:** Project documentation plus core canvas (Extractor → PRD → stories). T1–T12 have real traces.  
**Rubric:** PRD Genie **80 points** (Session 1 × problem statement). Not CalendarMate 100.  
**Method:** Grader-conservative. Credit only what a TA could mark from GitHub without watching a live canvas.  
**Live view:** [rubric-completion canvas](../design/canvases/prd-genie-completion.canvas.tsx)

**Headline: 68 / 80 earned. Core e2e and the 12-row baseline are in. Gap Analyzer, cost actuals, and Q4 findings remain.**

| Band | Max | Earned | % |
|---|---|---|---|
| Q1 + Q2 (written) | 30 | 30 | 100% |
| Q3 Design | 10 | 10 | 100% |
| Q3 Cost + eval strategy | 5 | 4 | 80% |
| Q4 Reflection | 5 | 2 | 40% |
| Q3 Observability | 5 | 5 | 100% |
| Q3 Core + extended + baseline | 25 | 17 | 68% |
| **Total** | **80** | **68** | **85%** |

---

## Line-item scores

| Line | Max | Earned | Evidence | Gap a grader would cite |
|---|---|---|---|---|
| Q1 Ideation | 15 | **15** | [charter.md](charter.md) §Q1 — four pains, each with manual step, agent, I/O, risk, tied to T2/T4/T5/T9 | None for the written Q. |
| Q2 Programme charter | 15 | **15** | Charter §Q2: vision, objectives, scope (core + Gap Analyzer + out of scope), success criteria, timeline, RAID, stakeholders, rollout. Named deliverables: [raid-log.md](raid-log.md), [ADR-001](adr/ADR-001-orchestration-pattern.md)–[005](adr/ADR-005-workflow-platform.md) | Issues log empty is appropriate at Day 2. |
| Q3 Design / rationale | 10 | **10** | [architecture-writeup.md](architecture-writeup.md) 1–2 pages; PNG diagram; sequential **justified** (not just named); n8n is the IK-hosted equivalent (ADR-005); HITL simulated; tool table | JSON canvas is **core**, not this line. |
| Q3 Core e2e | 12 | **12** | T11 Pass `bd27a36e`; T12 Pass `958dff5055157a90830d28d3be555c23` (Extractor + PRD + Story Breakdown on one v4 trace) | Export v0.5 over `system/workflow.json` so the pack JSON matches the live canvas. |
| Q3 Extended | 8 | **0** | ADR-002 + `gap-analyzer.md` | Not wired; TDD forbids it until core IDs are green. |
| Q3 Observability | 5 | **5** | Graded T1 trace `5eb3c0ba-2ea5-4842-93f1-6e7eb3c17210` (short brief, tags `T1`, 255 tokens). Plus 4 Sep proof run, HTTP ingest, screenshot, three NUMERIC score configs + evaluators. | LLM-as-judge scores had not appeared on the T1 generation at record time. Configs exist; attachment may lag. |
| Q3 Baseline documented | 5 | **5** | T1–T12 outputs pasted from real traces | None for the table. T4/T8 story checks still sit on T12, not a second story run. |
| Q3 Cost + eval strategy | 5 | **4** | Formula `tokens × price × volume` as **$/user/day** (~$0.044); ≥3 failure-mode metrics; five levers; TDD loop; experiment-log template | No Langfuse actuals. −1 until traces overwrite the sketch. |
| Q4 Reflection | 5 | **2** | [reflection.md](reflection.md): risks of AI PRDs, eval-skills link, improvement-plan process | **Trace findings** empty — that is the scored half. Do not pad to 15 pts. |
| **Total** | **80** | **68** | | |

Fine-tuning: 0 and correctly omitted.

---

## Submission pack (blockers, not extra points)

| Pack item | Status |
|---|---|
| Public repo + README + `.gitignore` + no `.env` | Pass |
| Architecture diagram | Pass — `design/architecture-diagram.png` |
| 1–2 page write-up + cost + ≥3 metrics | Pass (actuals pending) |
| Assignment Q1–Q2 | Pass |
| Assignment Q3 build | Partial — Slice 1 Extractor runs and traces; PRD / stories / Gap unwired |
| Assignment Q4 | Partial — method only |
| Workflow JSON export | Partial — real Slice 1 export (`system/workflow.json`), not the full pipeline |
| Baseline outputs for all 12 | Fail |
| Screenshots: canvas, in-action, traces | Partial — `langfuse-traces.png` present; canvas and in-action missing |
| Slide deck `.pptx` | Fail — markdown outline only |
| 5-minute demo URL | Fail — empty |

---

## Avoidable-loss readiness

These do not add points. They prevent losing the points above.

| Loss | Docs | Proven in a run |
|---|---|---|
| Build everything at once | TDD rule + thin-slice order | Yes — only the Extractor is wired; PRD/stories/Gap deliberately absent |
| No hallucination guardrail | UNKNOWN in all four agent specs | Partly — the 4 Sep run emitted `deadline: UNKNOWN` rather than guessing |
| Pattern not justified | ADR-001 | Yes (written) |
| No cost analysis | Writeup table | Sketch + one real per-run figure ($0.00455 for the Extractor) |
| Observability last | Rule: Langfuse first | **Yes** — Langfuse traced 4 Sep, before any scored T-row run |

---

## What would move the number

TDD order. Do not chase 80 by writing more docs.

1. T12 is green (`958dff50…`). Next: Gap Analyzer only (ADR-004), then score T2/T3/T5/T6/T9/T10 on questions.
2. Re-export v0.5 as `system/workflow.json` so graders see the three-agent canvas.
3. Gap Analyzer after core IDs that do not need it are green → **+8**.
4. Overwrite cost table from traces → **+1** (4→5).
5. One-page findings after traces → **+3** (2→5).

Ceiling if the above is done without extra scope: **80**. No extra points for RAG, fine-tune, or a fifth agent.
