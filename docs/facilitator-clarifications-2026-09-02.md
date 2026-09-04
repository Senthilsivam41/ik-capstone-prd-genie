# Facilitator clarifications — Capstone (2 Sep 2026)

**Session:** Capstone Project — Clarifications (doubt-clearing)  
**Participant:** Sendil · Project: PRD Genie  
**Source:** Live session transcript (2 Sep 2026)

Use this when a grader or later session asks “why n8n?” or “why only 80 points?”

## Confirmed answers

| Topic | Facilitator answer | What we do |
|---|---|---|
| **80 vs 100 points** | Intentional. Scores **will be scaled**. | Keep scoring against **80** (charter 15, reflection 5). Do not pad Q4 to 15. |
| **Extra features** | Feel free to add after core (e.g. t-shirt sizing / Scope Estimator, competitor analysis). | Optional **only after** core + T1–T12 + Gap Analyzer. Still R5 until then. |
| **Inputs beyond course pack** | Use the given transcripts/baseline **first**. Then you may add synthetic transcripts, emails, support tickets, chat logs — “any source of information.” | Finish course T1–T12 before inventing new inputs. Extra inputs do not replace the graded 12. |
| **n8n vs LangFlow** | **Both OK.** Tool skill is not the takeaway; architecture + guardrails are. | Stay on IK **n8n**. Name the export clearly (`n8n` in filename / README) so the evaluator opens the right tool. Checklist: [course-touchpoints.md](course-touchpoints.md). |
| **Why we chose n8n** | Fine — IK shared an n8n account. “It doesn’t matter.” | Keep ADR-005 rationale (cohort-hosted + equivalent canvas). |
| **JSON portability** | Facilitator’s understanding: export/import may work across n8n ↔ LangFlow (older Google hit; latest unclear). | **Do not rely on cross-import.** Export real n8n JSON; document platform = n8n in README. |

## Still open (not asked on 2 Sep)

Ask next office hours only if blocked:

1. Gap Analyzer **after Extractor** (vs course diagram after stories) — is justified deviation OK? (We already wrote ADR-004.)
2. What counts as Langfuse observability on **IK n8n Cloud** — full wording and acceptance in [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md). Ask only if HTTP ingest / community node paths fail.
3. May we install **community nodes** on `agenticai100.app.n8n.cloud`? (Only if Option A is required.)
4. Must T11/T12 be one automatic chain, or is documented manual paste of T1→PRD OK?
5. Slide format (markdown→pptx)?

## Closed

| Topic | Resolution |
|---|---|
| **Demo video** | **CLOSED** — small video in repo at `demo/prd-genie-demo.mp4` (optional URL backup). Recording gate is **R4**; ≤5 min. See [release-plan.md](release-plan.md) and [demo/demo-video-link.md](../demo/demo-video-link.md). File not recorded yet — do not invent it. |
| **Stack (n8n vs LangFlow vs code)** | **CLOSED** — facilitator: any stack OK; architecture + guardrails are the takeaway. We **stay on IK n8n + Langfuse EU** (ADR-005). Tool freedom ≠ restart mid-build. See [course-touchpoints.md](course-touchpoints.md). |

## Do not change because of this session

- Rubric law stays **80** for PRD Genie.
- Do **not** add Scope Estimator / competitor analysis / synthetic emails **before** Extractor T1 is green and core e2e exists.
- Do **not** invent baseline Pass without Langfuse traces.
