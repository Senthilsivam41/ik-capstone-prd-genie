# Rubric completion evaluation

**Audit date:** 30 Aug 2026 · **observability line revised 5 Sep 2026** (score configs verified same day)  
**Scope:** Project documentation, plus the Slice 1 Extractor canvas and its 4 Sep Langfuse traces. Still **no T1–T12 output** — all 12 graded rows are `Not run`.  
**Rubric:** PRD Genie **80 points** (Session 1 × problem statement). Not CalendarMate 100.  
**Method:** Grader-conservative. Credit only what a TA could mark from GitHub without watching a live canvas.  
**Live view:** [rubric-completion canvas](../design/canvases/prd-genie-completion.canvas.tsx)

**Headline: 50 / 80 earned. Written + design are submission-ready. The 45-point build is mostly unearned — observability moved 3→4 when the three score configs appeared; it is still not 5/5.**

| Band | Max | Earned | % |
|---|---|---|---|
| Q1 + Q2 (written) | 30 | 30 | 100% |
| Q3 Design | 10 | 10 | 100% |
| Q3 Cost + eval strategy | 5 | 4 | 80% |
| Q4 Reflection | 5 | 2 | 40% |
| Q3 Observability | 5 | 4 | 80% |
| Q3 Core + extended + baseline | 25 | 0 | 0% |
| **Total** | **80** | **50** | **63%** |

---

## Line-item scores

| Line | Max | Earned | Evidence | Gap a grader would cite |
|---|---|---|---|---|
| Q1 Ideation | 15 | **15** | [charter.md](charter.md) §Q1 — four pains, each with manual step, agent, I/O, risk, tied to T2/T4/T5/T9 | None for the written Q. |
| Q2 Programme charter | 15 | **15** | Charter §Q2: vision, objectives, scope (core + Gap Analyzer + out of scope), success criteria, timeline, RAID, stakeholders, rollout. Named deliverables: [raid-log.md](raid-log.md), [ADR-001](adr/ADR-001-orchestration-pattern.md)–[005](adr/ADR-005-workflow-platform.md) | Issues log empty is appropriate at Day 2. |
| Q3 Design / rationale | 10 | **10** | [architecture-writeup.md](architecture-writeup.md) 1–2 pages; PNG diagram; sequential **justified** (not just named); n8n is the IK-hosted equivalent (ADR-005); HITL simulated; tool table | JSON canvas is **core**, not this line. |
| Q3 Core e2e | 12 | **0** | Prompts in `design/agents/`; Slice 1 Extractor canvas exported to `system/workflow.json` and running | Still **0**: one agent of three is not end-to-end, and no graded T1–T12 row has passed. PRD Generator and Story Breakdown are unwired. |
| Q3 Extended | 8 | **0** | ADR-002 + `gap-analyzer.md` | Not wired; TDD forbids it until core IDs are green. |
| Q3 Observability | 5 | **4** | Traces live on EU project `cmthhhzzv02wsad0d4qogeznv`: two 4 Sep Slice 1 runs, named `Requirement Extractor` generation nested under a `prd-genie-slice1` root, tokens 240/395/635, cost $0.00455, I/O inspectable. Wiring (HTTP ingest, Option C) named in README. Screenshot [langfuse-traces.png](../evidence/screenshots/langfuse-traces.png). Score configs verified 5 Sep (`GET /api/public/score-configs`): `Completeness`, `Hallucination`, `Groundedness` — all NUMERIC 0–1 (Title Case names). Three evaluators are assigned at sampling 1; only `Hallucination` writes the matching NUMERIC config. Detail in [baseline-results.md](../evidence/baseline-results.md) §Observability proof run | **−1, not 5.** Criterion 6 (configs exist) is met. Remaining minus: no graded T1 row (T1 stays `Not run`; 4 Sep input was the long transcript) and `GET /api/public/scores` is empty. Completeness still has no evaluator; Groundedness is covered by a CATEGORICAL template (`Check Answer Groundedness`), not the NUMERIC config. |
| Q3 Baseline documented | 5 | **0** | Ground truth + expected checks in [baseline-results.md](../evidence/baseline-results.md) | All 12 results `Not run`. Session requires **outputs**. Template ≠ documentation. |
| Q3 Cost + eval strategy | 5 | **4** | Formula `tokens × price × volume` as **$/user/day** (~$0.044); ≥3 failure-mode metrics; five levers; TDD loop; experiment-log template | No Langfuse actuals. −1 until traces overwrite the sketch. |
| Q4 Reflection | 5 | **2** | [reflection.md](reflection.md): risks of AI PRDs, eval-skills link, improvement-plan process | **Trace findings** empty — that is the scored half. Do not pad to 15 pts. |
| **Total** | **80** | **50** | | |

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

1. Re-run Extractor on the **short T1 string** until **T1 green** in baseline-results (the 4 Sep long-transcript run does not count). That generation can receive a Hallucination score at sampling 1 (no backfill of 4 Sep) → **+1** observability (4→5) and the start of **+12** core. Completeness still needs its own evaluator if that score must appear automatically.
2. Paste T1–T12 outputs as you go → **+5** baseline.
3. Gap Analyzer after core IDs that do not need it are green → **+8**.
4. Overwrite cost table from traces → **+1** (4→5).
5. One-page findings after traces → **+3** (2→5).

Ceiling if the above is done without extra scope: **80**. No extra points for RAG, fine-tune, or a fifth agent.
