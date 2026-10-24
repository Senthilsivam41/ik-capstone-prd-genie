# PRD Genie — official rubric (80 points)

Source of truth for **this** project, not CalendarMate / Mira / SalesGenie.  
**TA start:** [README.md](../README.md) · [docs map](README.md). This file is the point table; [rubric-evaluation.md](rubric-evaluation.md) is what is in git today.

- Problem statement: `docs/problem-statement.pdf` (Q1–Q4)
- Session brief: *Capstone Session 1 — How you are graded* (point allocation **by project**)
- Eval method (not extra marks, but how Q3/Q4 are judged): *Agent Eval Fundamentals*

**Do not use the 100-point CalendarMate/Mira split.** Those give charter 25 and reflection 15. PRD Genie is **charter 15, reflection 5, total 80.**

**Live completion audit:** [rubric-evaluation.md](rubric-evaluation.md) (written+build **80/80**; pack demo is in [`demo/prd-genie-demo.mp4`](../demo/prd-genie-demo.mp4), **≤5 min**).

## Point allocation

| Component | Pts | Where it lives | Status |
|---|---|---|---|
| Q1 Ideation / business case | 15 | [charter.md](charter.md) §Q1 | Written |
| Q2 Programme charter | 15 | [charter.md](charter.md) §Q2 · [raid-log.md](raid-log.md) · [adr/](adr/) | Written (RAID + ADRs) |
| Q3 Design and rationale | 10 | [architecture-writeup.md](architecture-writeup.md) · [architecture-diagram.png](../design/architecture-diagram.png) · ADRs | Written — pattern **justified** |
| Q3 Core capabilities | 12 | n8n **1.0** + prompts in `design/agents/` | T11/T12 Pass on traces |
| Q3 Extended capability | 8 | Gap Analyzer ([ADR-002](adr/ADR-002-extended-capability.md)) | Wired; T2/T3/T5/T6/T9/T10 documented |
| Q3 Observability | 5 | Langfuse traces per agent, tokens + cost | Connected before first scored run |
| Q3 Baseline dataset | 5 | All 12 inputs with outputs in [baseline-results.md](../evidence/baseline-results.md) | T1–T12 pasted from real traces |
| Q3 Cost + evaluation strategy | 5 | Writeup: tokens × price × volume, **cost per user per day**, ≥3 production metrics | Langfuse actuals ~$0.014 / user / day |
| Q4 Reflection | 5 | [reflection.md](reflection.md) | Written from 6 Sep traces |
| **Total** | **80** | | |

Fine-tuning is optional and never required. Recognised if present; ignore until core + baseline pass.

## Build sub-score (the 45)

These six lines are the only split inside Q3. Written work is **outside** this 45.

1. Design / rationale — 10  
2. Core (extract, PRD, stories) end-to-end — 12  
3. Extended (Gap Analyzer) — 8  
4. Observability connected — 5  
5. Baseline documented — 5  
6. Cost + eval strategy — 5  

## Submission pack (session brief)

Always:

- Public GitHub repo, README, `.gitignore`, secrets out of git
- Workflow JSON export
- Architecture diagram
- Baseline results — every input with outputs
- Screenshots: canvas, system in action, observability traces
- 1–2 page architecture write-up
- Cost analysis **and three or more production metrics**
- All assignment questions answered
- Slide deck (problem, approach, outcomes)

PRD Genie-specific:

- **Demo video, at most 5 minutes** (most commonly missed item; shorter is fine)

## Avoidable losses (session brief)

These fail the same way every cohort. Mapped to this repo:

| Loss | Our counter |
|---|---|
| Build everything at once | Thin slice: Extractor on Transcript 1 first |
| No hallucination guardrail | UNKNOWN rule in every agent spec |
| Baseline not documented | Template in `evidence/baseline-results.md` — fill as we run |
| Pattern named but not justified | ADR-001: sequential **because** every input shares stages; not a router |
| No cost analysis | Tokens × price × daily volume, expressed per user per day |
| Observability left to the end | Connect Langfuse before the first successful run |

## Production metrics (must name ≥3, from *this* failure mode)

Session brief: pick from the project's failure mode, not a generic list. PRD Genie's signature risk is **inventing requirements not in the transcript**.

**Technical / AI (track in Langfuse):**

1. **Hallucination rate** — % of PRD/story items with no evidence quote (target 0% on T1–T12)
2. **Groundedness** — LLM-as-judge or human: is each requirement traceable to source?
3. **Format compliance** — all 10 `prd_template.md` sections present (empty allowed if tagged UNKNOWN)
4. **Tokens / latency per run** — operational pillar from Agent Eval Fundamentals

**Business (charter):**

5. PM drafting time saved per first-draft PRD (subjective; why NeuronForge funds this)

Q3 needs at least three of these named in the write-up. 1–3 are the scored set; 5 is the business metric.

## Cost formula the grader wants

`tokens × price × expected daily volume` → **cost per user per day**.

Live (Langfuse, 6 Sep T1–T10): mean **~$0.0071 / run** → **~$0.014 / user / day** at 2 first-drafts. A-priori sketch was ~$0.022 / run — do not mix the two. Table: [architecture-writeup.md](architecture-writeup.md#cost-analysis-langfuse-actuals--6-sep-2026).

## Evaluation method (Agent Eval Fundamentals) — how Q3/Q4 are *done*

Not extra rubric rows. This is the language the reflection must use:

- Failures are judgment flaws, not crashes (plausible 200 OKs)
- Three observability pillars: logs, traces (the story), metrics (the scorecard)
- Three metric families: operational / effectiveness / trustworthiness
- Open-code traces; **catalog the first failure in the chain**
- Axial-code into a small non-overlapping set of binary failure modes
- Three eval approaches: HITL, automated (LLM-as-judge + code), end-user feedback — we use HITL + LLM-as-judge; no in-app thumbs-up
- Change one thing; because models are non-deterministic, **repeat the experiment and keep the change only if the gain is consistent**
- Five optimisation levers, cheapest first: prompt → model swap → architecture → config → fine-tune

## Q4 reflection (5 pts) — what the problem statement asks

One page: trace findings, improvement plan, risks of AI-generated PRDs, connection to evaluation skills. Do not pad this to CalendarMate's 15-point reflection.
