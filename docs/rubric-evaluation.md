# Rubric completion evaluation

**Audit date:** 30 Aug 2026  
**Scope:** Project documentation in this repo only. No LangFlow run, no Langfuse trace, no T1–T12 output.  
**Rubric:** PRD Genie **80 points** (Session 1 × problem statement). Not CalendarMate 100.  
**Method:** Grader-conservative. Credit only what a TA could mark from GitHub without watching a live canvas.  
**Live view:** [rubric-completion canvas](../design/canvases/prd-genie-completion.canvas.tsx)

**Headline: 46 / 80 earned. Written + design are submission-ready. The 45-point build is almost entirely unearned.**

| Band | Max | Earned | % |
|---|---|---|---|
| Q1 + Q2 (written) | 30 | 30 | 100% |
| Q3 Design | 10 | 10 | 100% |
| Q3 Cost + eval strategy | 5 | 4 | 80% |
| Q4 Reflection | 5 | 2 | 40% |
| Q3 Core + extended + observability + baseline | 30 | 0 | 0% |
| **Total** | **80** | **46** | **58%** |

---

## Line-item scores

| Line | Max | Earned | Evidence | Gap a grader would cite |
|---|---|---|---|---|
| Q1 Ideation | 15 | **15** | [charter.md](charter.md) §Q1 — four pains, each with manual step, agent, I/O, risk, tied to T2/T4/T5/T9 | None for the written Q. |
| Q2 Programme charter | 15 | **15** | Charter §Q2: vision, objectives, scope (core + Gap Analyzer + out of scope), success criteria, timeline, RAID, stakeholders, rollout. Named deliverables: [raid-log.md](raid-log.md), [ADR-001](adr/ADR-001-orchestration-pattern.md)–[004](adr/ADR-004-gap-analyzer-placement.md) | Issues log empty is appropriate at Day 2. |
| Q3 Design / rationale | 10 | **10** | [architecture-writeup.md](architecture-writeup.md) 1–2 pages; PNG diagram; sequential **justified** (not just named); n8n/LangGraph rejected; HITL simulated; tool table | JSON canvas is **core**, not this line. |
| Q3 Core e2e | 12 | **0** | Prompts in `design/agents/` only | Not end-to-end. `system/workflow.json` is a placeholder. |
| Q3 Extended | 8 | **0** | ADR-002 + `gap-analyzer.md` | Not wired; TDD forbids it until core IDs are green. |
| Q3 Observability | 5 | **0** | Langfuse named; `.env.example` has keys | No traces, no per-agent tokens. RAID: Langfuse **Not started**. |
| Q3 Baseline documented | 5 | **0** | Ground truth + expected checks in [baseline-results.md](../evidence/baseline-results.md) | All 12 results `Not run`. Session requires **outputs**. Template ≠ documentation. |
| Q3 Cost + eval strategy | 5 | **4** | Formula `tokens × price × volume` as **$/user/day** (~$0.044); ≥3 failure-mode metrics; five levers; TDD loop; experiment-log template | No Langfuse actuals. −1 until traces overwrite the sketch. |
| Q4 Reflection | 5 | **2** | [reflection.md](reflection.md): risks of AI PRDs, eval-skills link, improvement-plan process | **Trace findings** empty — that is the scored half. Do not pad to 15 pts. |
| **Total** | **80** | **46** | | |

Fine-tuning: 0 and correctly omitted.

---

## Submission pack (blockers, not extra points)

| Pack item | Status |
|---|---|
| Public repo + README + `.gitignore` + no `.env` | Pass |
| Architecture diagram | Pass — `design/architecture-diagram.png` |
| 1–2 page write-up + cost + ≥3 metrics | Pass (actuals pending) |
| Assignment Q1–Q2 | Pass |
| Assignment Q3 build | Fail — not implemented |
| Assignment Q4 | Partial — method only |
| Workflow JSON export | Fail — placeholder |
| Baseline outputs for all 12 | Fail |
| Screenshots: canvas, in-action, traces | Fail |
| Slide deck `.pptx` | Fail — markdown outline only |
| 5-minute demo URL | Fail — empty |

---

## Avoidable-loss readiness

These do not add points. They prevent losing the points above.

| Loss | Docs | Proven in a run |
|---|---|---|
| Build everything at once | TDD rule + thin-slice order | Not yet — no run |
| No hallucination guardrail | UNKNOWN in all four agent specs | Not yet |
| Pattern not justified | ADR-001 | Yes (written) |
| No cost analysis | Writeup table | Sketch only |
| Observability last | Rule: Langfuse first | Not connected |

---

## What would move the number

TDD order. Do not chase 80 by writing more docs.

1. Connect Langfuse → **+5** observability (first scored build line).
2. Extractor until **T1 green** in baseline-results → start of **+12** core (full 12 only when extract + PRD + stories e2e).
3. Paste T1–T12 outputs as you go → **+5** baseline.
4. Gap Analyzer after core IDs that do not need it are green → **+8**.
5. Overwrite cost table from traces → **+1** (4→5).
6. One-page findings after traces → **+3** (2→5).

Ceiling if the above is done without extra scope: **80**. No extra points for RAG, fine-tune, or a fifth agent.
