# Course key touch points — PRD Genie

**Purpose:** Checklist of what the course wants us to *demonstrate*, mapped to this repo. Tool skill (n8n / LangFlow / code) is **not** the takeaway; architecture + guardrails + evals are.  
**Rubric:** [rubric.md](rubric.md) (80 pts) · **Releases:** [release-plan.md](release-plan.md) · **Facilitator (2 Sep):** [facilitator-clarifications-2026-09-02.md](facilitator-clarifications-2026-09-02.md)  
**Stack recommendation:** **Stay on n8n (IK Cloud) + Langfuse EU** — see §Recommendation below.

Status key: **done** = grader-visible in git / design · **next** = current release work · **later** = after next is proven · **deferred** = optional / after minimum.

---

## Recommendation: stay on n8n

Facilitator (2 Sep): **any** stack is fine (n8n, LangFlow, or code). That freedom is **not** a reason to restart mid-build.

| | |
|---|---|
| **Stay** | IK n8n Cloud + Langfuse EU ([ADR-005](adr/ADR-005-workflow-platform.md)). Slice 1 JSON already exists; cohort TAs open n8n; pattern/guardrails/evals are stack-agnostic. |
| **Do not** | Rebuild on LangFlow or custom LangGraph unless a **course touchpoint is blocked** on n8n after trying the wiring order in [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md). |
| **Contingency only** | If Options A–C fail and Observability +5 stays blocked, Option D (tiny LangFlow/local runner **only** to prove Langfuse) while keeping the graded canvas on n8n — or ask the facilitator the copy-paste question in that doc. Do **not** migrate the whole pipeline. |

---

## Touchpoint checklist

| # | Course wants | Where it lives here | Proved by | Status |
|---|---|---|---|---|
| 1 | **Architecture pattern named + justified** (sequential + branch — *why*, not just the label) | [ADR-001](adr/ADR-001-orchestration-pattern.md) · [architecture-writeup.md](architecture-writeup.md) · diagram PNG | R0 | **done** (written) |
| 2 | **Sequential pipeline + one branch** (Gap Analyzer) | ADR-001 · [ADR-002](adr/ADR-002-extended-capability.md) · [ADR-004](adr/ADR-004-gap-analyzer-placement.md) · orchestration notes | R0 design · **R4** wired | **done** design / **later** runtime |
| 3 | **Core agents e2e** — Extractor → PRD → stories, one capability at a time | `design/agents/*` · `system/workflow.json` (Slice 1) | R1 Extractor · **R2** e2e | **next** (Slice 1 drafted; T1 not green) |
| 4 | **Extended capability** — Gap Analyzer (questions, not invented answers) | `design/agents/gap-analyzer.md` · ADR-002/004 | **R4** | **later** |
| 5 | **Hallucination guardrails** — UNKNOWN; no invent; no silent contradiction resolve; no template pad; ACs verbatim | All four agent specs · README Guardrails · TDD rule | R1+ (proven on failing/passing T-rows) | **done** in prompts / **next** to prove on T1–T12 |
| 6 | **Evals-first / TDD** — red T-row before building; no horizontal slice | `.cursor/rules/tdd.mdc` · [baseline-results.md](../evidence/baseline-results.md) · AGENTS.md | R1→R3 loop | **done** as process law / **next** first green |
| 7 | **Langfuse early** — before first successful scored run; per-agent traces + tokens | [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md) · `.env.example` · ADR-005 | **R1** | **next** |
| 8 | **≥3 production metrics** from *this* failure (hallucination / groundedness / format) | [rubric.md](rubric.md) · architecture-writeup · Langfuse score configs | R0 named · **R1** configs · **R3** actuals | **done** named / **next** configs+scores |
| 9 | **Cost as $/user/day** — `tokens × price × volume` | architecture-writeup cost table | R0 a priori · **R3** Langfuse overwrite | **done** sketch / **later** actuals (−1 until then) |
| 10 | **Baseline T1–T12** documented with real outputs | `evidence/baseline-results.md` · ground-truth inputs | **R3** (fill as you run from R1) | **next**/later — all `Not run` |
| 11 | **Split-model design** — stronger model on judgment seams; mini on format | [ADR-003](adr/ADR-003-split-model-design.md) · Slice 1 uses gpt-4o for Extractor | R1–R4 as agents land | **done** design / **next** in live nodes |
| 12 | **HITL simulated** — PM reviews drafts; no auto-ship invented scope | architecture-writeup · charter rollout | R0 (written) · demo R4 | **done** (simulated in design) |
| 13 | **Open-code / axial-code** traces; catalog **first** failure in the chain | [reflection.md](reflection.md) method · experiment-log | **R5** (needs traces from R1–R3) | **later** |
| 14 | **One-change experiments**; repeat; keep only if gain consistent; levers cheapest-first | `evidence/experiment-log.md` · reflection plan | After R3 | **later** |
| 15 | **Q4 Reflection** (5 pts) — findings, plan, PRD-AI risks, eval skills | reflection.md | **R5** | **done** method / **later** findings |
| 16 | **Submission pack** — public repo, README, `.gitignore`, JSON export, diagram, 3 screenshots, slides, **≤5 min demo** | README · release-plan · `demo/` · rubric-evaluation | R0 partial · **R4** demo · **R5** pack close | **partial** — demo/screenshots/pptx/traces missing |
| 17 | **Platform named clearly** for graders (n8n vs LangFlow) | README · ADR-005 · workflow filename under `system/workflows/` | R0–R1 | **done** |
| 18 | **Extras after minimum** (Scope Estimator, competitor analysis, synthetic emails) | facilitator clarifications · release-plan “Do not ship until R4 Done” | After R4 | **deferred** |
| 19 | **Fine-tune / RAG** optional | rubric: forbidden until core + T1–T12 | After R3+ | **deferred** |
| 20 | **80-pt scoring law** (not CalendarMate 100 / Q4≠15) | rubric.md · charter · facilitator clarifications | R0 | **done** |

---

## Unproven touchpoints (build order)

These are the course items a grader **cannot** mark Pass from GitHub today:

1. **Langfuse +5** — no real EU trace yet (R1).
2. **T1 green** — Extractor thin slice not scored from a real run (R1).
3. **Core e2e +12** — PRD + stories not on canvas (R2).
4. **Baseline +5** — T1–T12 all `Not run` (R3).
5. **Gap Analyzer +8** — not wired (R4).
6. **Demo + screenshots + slides + Q4 findings** — pack/reflection (R4–R5).
7. **Cost actuals** — a priori only (−1 on Cost line until Langfuse overwrite).

Do **not** invent Pass, traces, or screenshots to close these.

---

## Rubric line → release map (quick)

| Rubric line | Pts | Release that unlocks evidence |
|---|---|---|
| Q1 + Q2 | 30 | R0 |
| Q3 Design | 10 | R0 |
| Q3 Observability | 5 | R1 |
| Q3 Core | 12 | R2 (starts R1) |
| Q3 Baseline | 5 | R3 |
| Q3 Extended | 8 | R4 |
| Q3 Cost+eval | 5 | R0 sketch → R3 actuals |
| Q4 Reflection | 5 | R5 (method R0) |
| Submission pack / demo | — | R4 demo · R5 close |

---

## Related

- [release-plan.md](release-plan.md) — R0–R5 DoD  
- [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md) — what +5 looks like on IK n8n  
- [facilitator-clarifications-2026-09-02.md](facilitator-clarifications-2026-09-02.md) — stack freedom vs stay-on-n8n  
- [rubric-evaluation.md](rubric-evaluation.md) — live score audit (~46/80 design-only)
