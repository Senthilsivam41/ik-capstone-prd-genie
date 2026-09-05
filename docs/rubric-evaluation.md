# Rubric completion evaluation

**Audit date:** 30 Aug 2026 · **observability line revised 5 Sep 2026** (score configs verified same day)  
**Scope:** Project documentation, plus Slice 1 Extractor and a T11 PRD run. T1–T11 have real traces. T12 remains `Not run`.  
**Rubric:** PRD Genie **80 points** (Session 1 × problem statement). Not CalendarMate 100.  
**Method:** Grader-conservative. Credit only what a TA could mark from GitHub without watching a live canvas.  
**Live view:** [rubric-completion canvas](../design/canvases/prd-genie-completion.canvas.tsx)

**Headline: 51 / 80 earned. Written + design are submission-ready. Observability is 5/5 after the graded T1 trace. Core e2e is still 0 — one agent, one row.**

| Band | Max | Earned | % |
|---|---|---|---|
| Q1 + Q2 (written) | 30 | 30 | 100% |
| Q3 Design | 10 | 10 | 100% |
| Q3 Cost + eval strategy | 5 | 4 | 80% |
| Q4 Reflection | 5 | 2 | 40% |
| Q3 Observability | 5 | 5 | 100% |
| Q3 Core + extended + baseline | 25 | 0 | 0% |
| **Total** | **80** | **51** | **64%** |

---

## Line-item scores

| Line | Max | Earned | Evidence | Gap a grader would cite |
|---|---|---|---|---|
| Q1 Ideation | 15 | **15** | [charter.md](charter.md) §Q1 — four pains, each with manual step, agent, I/O, risk, tied to T2/T4/T5/T9 | None for the written Q. |
| Q2 Programme charter | 15 | **15** | Charter §Q2: vision, objectives, scope (core + Gap Analyzer + out of scope), success criteria, timeline, RAID, stakeholders, rollout. Named deliverables: [raid-log.md](raid-log.md), [ADR-001](adr/ADR-001-orchestration-pattern.md)–[005](adr/ADR-005-workflow-platform.md) | Issues log empty is appropriate at Day 2. |
| Q3 Design / rationale | 10 | **10** | [architecture-writeup.md](architecture-writeup.md) 1–2 pages; PNG diagram; sequential **justified** (not just named); n8n is the IK-hosted equivalent (ADR-005); HITL simulated; tool table | JSON canvas is **core**, not this line. |
| Q3 Core e2e | 12 | **0** | Extractor T1–T10 green; T11 PRD **Pass** `bd27a36e` | Still **0** until Story Breakdown runs (T12). Three-agent e2e is not live. |
| Q3 Extended | 8 | **0** | ADR-002 + `gap-analyzer.md` | Not wired; TDD forbids it until core IDs are green. |
| Q3 Observability | 5 | **5** | Graded T1 trace `5eb3c0ba-2ea5-4842-93f1-6e7eb3c17210` (short brief, tags `T1`, 255 tokens). Plus 4 Sep proof run, HTTP ingest, screenshot, three NUMERIC score configs + evaluators. | LLM-as-judge scores had not appeared on the T1 generation at record time. Configs exist; attachment may lag. |
| Q3 Baseline documented | 5 | **0** | T1–T11 outputs pasted from real traces | T12 still `Not run`. The +5 needs stories as well. |
| Q3 Cost + eval strategy | 5 | **4** | Formula `tokens × price × volume` as **$/user/day** (~$0.044); ≥3 failure-mode metrics; five levers; TDD loop; experiment-log template | No Langfuse actuals. −1 until traces overwrite the sketch. |
| Q4 Reflection | 5 | **2** | [reflection.md](reflection.md): risks of AI PRDs, eval-skills link, improvement-plan process | **Trace findings** empty — that is the scored half. Do not pad to 15 pts. |
| **Total** | **80** | **51** | | |

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

1. T11 is green (`bd27a36e`). Next: Story Breakdown on **this T11 PRD** (T12). Do not feed T12 a new transcript.
2. Core +12 only when extract → PRD → stories is live on the canvas.
3. Gap Analyzer after core IDs that do not need it are green → **+8**.
4. Overwrite cost table from traces → **+1** (4→5).
5. One-page findings after traces → **+3** (2→5).

Ceiling if the above is done without extra scope: **80**. No extra points for RAG, fine-tune, or a fifth agent.
