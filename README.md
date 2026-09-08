# PRD Genie

Interview Kickstart capstone — **Applied Agentic AI for PMs/TPMs**.  
NeuronForge Technologies: meeting transcripts, briefs, and notes → a grounded PRD and user stories.

A fluent document that invents scope is worse than messy notes. Every agent says **UNKNOWN** when the source cannot determine X.

| | |
|---|---|
| Author | Sendil |
| Pattern | Sequential pipeline + one branch ([ADR-001](docs/adr/ADR-001-orchestration-pattern.md)) |
| Extended | Gap Analyzer only ([ADR-002](docs/adr/ADR-002-extended-capability.md)) |
| Canvas | IK n8n Cloud + Langfuse EU |
| Written+build | 80/80 on the rubric table — pack still needs the **5-min demo** |

## Start here (read in this order)

TAs will not get a Slack walkthrough. This list is the pack.

1. **This README** — what it is, how the four agents work, how to run, which folder covers what.
2. [docs/charter.md](docs/charter.md) — Q1 ideation + Q2 programme charter.
3. [docs/solution-journey.md](docs/solution-journey.md) — AS-IS / TO-BE / target intake+HITL (not built) / short vs long tool stack / roadmap.
4. [docs/architecture-writeup.md](docs/architecture-writeup.md) — Q3 design: **why** sequential + branch, what each agent does, cost per user per day.
5. [docs/reflection.md](docs/reflection.md) — Q4 (one page, after traces).
6. [evidence/baseline-results.md](evidence/baseline-results.md) — T1–T12 Must/Must-not + pasted outputs.
7. [evidence/screenshots/](evidence/screenshots/) — n8n canvas, pipeline in action, Langfuse.

Then only if needed: [docs/README.md](docs/README.md) (full docs map) · ADRs · RAID.

**Demo file (when recorded):** [`demo/prd-genie-demo.mp4`](demo/prd-genie-demo.mp4) — pointer in [demo/demo-video-link.md](demo/demo-video-link.md). That is the remaining pack item.

**Scoring law:** [docs/rubric.md](docs/rubric.md) (80 pts). Live audit: [docs/rubric-evaluation.md](docs/rubric-evaluation.md).

## How the pipeline works

Same path for every input type. Not a router. Gap is a **sibling of PRD**, not a later critic and **not a gate**.

```
Input Text.testId  →  Google Sheet row.chatInput
        ↓
  Agent 1  Requirement Extractor   gpt-4o     stated vs ambiguous
        ├──────────────────────────────┐
        ↓                              ↓
  Agent 2  Gap Analyzer            Agent 3  PRD Generator
           gpt-4o-mini                      gpt-4o
           questions only                   10 template sections
                                           ↓
                                     Agent 4  Story Breakdown
                                              gpt-4o-mini
        └──────────── Merge ───────────────┘
                         ↓
              Langfuse EU  (one generation per agent)
```

| Agent | What it does | What it must not do |
|---|---|---|
| **1 Extractor** | Split stated vs ambiguous; keep numbers exact | Invent facts; pick a side on contradictions |
| **2 Gap Analyzer** (+8) | Ask clarification questions from the extraction | Invent answers; block PRD (T9 still writes a PRD) |
| **3 PRD Generator** | Fill `system/prd_template.md` from extraction only | Pad empty sections; treat Gap output as new scope |
| **4 Story Breakdown** | `As a [persona]`; copy ACs verbatim | Paraphrase T4 ACs |

**Why sequential:** you cannot fill a PRD before extraction without inviting hallucination; you cannot break stories before the template is the contract.

**Why the branch after Extractor:** catching a contradiction after stories means it was rewritten twice. HITL is offline: PM answers, then re-runs from the Extractor. Full “why”: [design/orchestration-notes.md](design/orchestration-notes.md).

Judges (Completeness / Hallucination / Groundedness) sit **in Langfuse**, not as n8n nodes. Ground truth never enters the canvas.

## How to run

Runtime is **IK n8n Cloud** + **Langfuse EU**. n8n→LangFlow JSON export is **broken** (6 Sep) — do not rebuild.

1. Sign in to [IK n8n](https://agenticai100.app.n8n.cloud/home/workflows).
2. Langfuse project: [my-capstone-prd-genie (EU)](https://cloud.langfuse.com/project/cmthhhzzv02wsad0d4qogeznv) — host `https://cloud.langfuse.com`, not `us.cloud.langfuse.com`.
3. Copy `system/.env.example` → `system/.env` (local backup only). **Do not commit `.env`.** n8n Cloud does not read that file.
4. **Import** [`system/workflow.json`](system/workflow.json) (same graph as [`system/workflows/PRD Genie — Slice 1 Extractor + Langfuse-v0.7.json`](system/workflows/PRD%20Genie%20%E2%80%94%20Slice%201%20Extractor%20%2B%20Langfuse-v0.7.json)). Sticky notes on the canvas name each agent.
5. Re-select OpenAI, Google Sheets, and Langfuse **Basic Auth** if empty (username = public key, password = secret key).
6. Open **Input Text**, set `testId` to `T1`…`T12`. The sheet row’s `chatInput` is what Agent 1 reads. T11 = T1 extraction; T12 = T11 PRD — not a new transcript.
7. **Test workflow.** Confirm a Langfuse trace: root + four generations (Extractor, Gap, PRD, stories).

## Repo map (folder → what it covers)

| Folder / file | What a TA finds there |
|---|---|
| [README.md](README.md) | This page — start here |
| [docs/](docs/) | Graded writeups. Start with [docs/README.md](docs/README.md) |
| [docs/charter.md](docs/charter.md) | Q1 + Q2 |
| [docs/solution-journey.md](docs/solution-journey.md) | AS-IS → TO-BE → target (not built): connectors, intake schema, HITL |
| [design/architecture/](design/architecture/) | Archify AS-IS / TO-BE (live) / target + HITL (not built) |
| [docs/architecture-writeup.md](docs/architecture-writeup.md) | Q3 design, cost, eval |
| [docs/reflection.md](docs/reflection.md) | Q4 |
| [docs/adr/](docs/adr/) | Five decisions (pattern, Gap, models, Gap placement, n8n) |
| [design/agents/](design/agents/) | **All four agent prompts** — spec + verbatim n8n copies. Start at [design/agents/README.md](design/agents/README.md) |
| [design/evals/](design/evals/) | Langfuse judge briefs (Hallucination / Completeness / Groundedness) — paste into Evaluators |
| [design/architecture-diagram.png](design/architecture-diagram.png) | Submission diagram |
| [design/orchestration-notes.md](design/orchestration-notes.md) | Why sequential + branch; live n8n wiring |
| [design/canvases/](design/canvases/) | Git copies of Cursor canvases (not the live n8n file) |
| [evidence/baseline-results.md](evidence/baseline-results.md) | T1–T12 runs (the eval table) |
| [evidence/ground-truth/](evidence/ground-truth/) | Course inputs (immutable) + how GT is *not* the pipeline |
| [evidence/screenshots/](evidence/screenshots/) | Canvas, in-action, Langfuse |
| [evidence/experiment-log.md](evidence/experiment-log.md) | E1 / E1b / E5 |
| [system/workflow.json](system/workflow.json) | **Import this** — annotated v0.7 n8n export |
| [system/prd_template.md](system/prd_template.md) | Ten-section PRD contract |
| [slides/prd_genie_capstone_summary.pptx](slides/prd_genie_capstone_summary.pptx) | Slide deck |
| [demo/prd-genie-demo.mp4](demo/prd-genie-demo.mp4) | **The demo file** (not recorded yet) |

## Guardrails (non-negotiable)

- If the input cannot determine X, write UNKNOWN. Do not invent X.
- Contradictions are listed, never resolved.
- Empty template sections stay under Open Questions.
- Acceptance criteria are copied verbatim into stories (T4 / T12).

## Cost

Langfuse actuals (ten T1–T10 runs, 6 Sep): mean **~$0.0071 / run** → **~$0.014 / user / day** at two first-drafts. Formula and table: [docs/architecture-writeup.md](docs/architecture-writeup.md#cost-analysis-langfuse-actuals--6-sep-2026).

## Demo video

PRD Genie requires a ≤5-minute recording of the **working** n8n + Langfuse flow. Walk **Agent 1 out → Agent 3 in → stories**, then the Gap sibling on a vague input. Shot list: [demo/demo-video-link.md](demo/demo-video-link.md).

## License / provenance

Course problem statement, template, sample inputs, and `eval_prdgenie_inputs.txt` are from the Interview Kickstart capstone pack (© course authors). Used here as the required ground truth. Charter, ADRs, prompts, and writeups are original for this submission.
