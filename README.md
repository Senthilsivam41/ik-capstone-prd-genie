# PRD Genie

Interview Kickstart capstone — **Applied Agentic AI for PMs/TPMs**.  
NeuronForge Technologies: meeting transcripts, briefs, and notes → a grounded PRD and user stories.

A fluent document that invents scope is worse than messy notes. Every agent says **UNKNOWN** when the source cannot determine X.

| | |
|---|---|
| Author | Sendil |
| Pattern | Sequential pipeline + one branch ([ADR-001](docs/adr/ADR-001-orchestration-pattern.md)) |
| Extended | Gap Analyzer only ([ADR-002](docs/adr/ADR-002-extended-capability.md)) |
| Canvas | n8n **1.0** (IK Cloud; account now closed) + Langfuse EU |
| Written+build | 80/80 on the rubric table — pack includes a **≤5 min** demo ([`demo/prd-genie-demo.mp4`](demo/prd-genie-demo.mp4)) |

## Start here (read in this order)

TAs will not get a Slack walkthrough. This list is the pack.

1. **This README** — what it is, how the four agents work, how to run, which folder covers what.
2. [docs/charter.md](docs/charter.md) — Q1 ideation + Q2 programme charter.
3. [docs/solution-journey.md](docs/solution-journey.md) — AS-IS / TO-BE / target intake+HITL (not built) / short vs long tool stack / roadmap.
4. [docs/architecture-writeup.md](docs/architecture-writeup.md) — Q3 design: **why** sequential + branch, what each agent does, cost per user per day.
5. [docs/reflection.md](docs/reflection.md) — Q4 (one page, after traces).
6. [evidence/baseline-results.md](evidence/baseline-results.md) — T1–T12 Must/Must-not + pasted outputs.
7. [evidence/experiment-log.md](evidence/experiment-log.md) — **Failures found and how we improved** (E1 T2 vague → UNKNOWN; E1b T7 NFR class; E5 judges on gpt-4o). One change per row.
8. [evidence/screenshots/](evidence/screenshots/) — n8n canvas, pipeline in action, Langfuse.

**Workflows:** import **1.0** ([`system/workflow.json`](system/workflow.json)) for scoring. **1.1** is an optional Drive inbox ([docs/enhancement-v1.1-drive-inbox.md](docs/enhancement-v1.1-drive-inbox.md)) — not a fifth agent, not required for the 80.

Then only if needed: [docs/README.md](docs/README.md) (full docs map) · ADRs · RAID.

**Demo (≤5 min max, not a 5:00 target):** [`demo/prd-genie-demo.mp4`](demo/prd-genie-demo.mp4) — T1 + T5. Pointer: [demo/demo-video-link.md](demo/demo-video-link.md).

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

The cohort **IK n8n Cloud** account is **deactivated**. Graders should **not** need a live canvas. Proof of the working pipeline:

- Workflow **1.0** JSON: [`system/workflow.json`](system/workflow.json)
- Screenshots: [`evidence/screenshots/`](evidence/screenshots/) (canvas, in-action, Langfuse)
- T1–T12 outputs + trace IDs: [`evidence/baseline-results.md`](evidence/baseline-results.md)
- Demo (T1 + T5, ≤5 min): [`demo/prd-genie-demo.mp4`](demo/prd-genie-demo.mp4)

If you have a **private** n8n + Langfuse:

1. Import [`system/workflow.json`](system/workflow.json) (**1.0**). Same graph as [`system/workflows/prd-genie-1.0.json`](system/workflows/prd-genie-1.0.json).
2. Re-select OpenAI, Google Sheets, and Langfuse **Basic Auth** (username = public key, password = secret key).
3. Open **Input Text**, set `testId` to `T1`…`T12`. The sheet row’s `chatInput` is what Agent 1 reads. T11 = T1 extraction; T12 = T11 PRD — not a new transcript.
4. **Test workflow.** Confirm a Langfuse trace: root + four generations (Extractor, Gap, PRD, stories).

**1.1 (optional):** [`system/workflows/prd-genie-1.1.json`](system/workflows/prd-genie-1.1.json) adds Google Drive Ready vs Unclassified after Langfuse. Needs Drive OAuth. How to mark it without n8n: [docs/enhancement-v1.1-drive-inbox.md](docs/enhancement-v1.1-drive-inbox.md).

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
| [design/drive-output.md](design/drive-output.md) | 1.1 Drive folder contract (enhancement) |
| [docs/enhancement-v1.1-drive-inbox.md](docs/enhancement-v1.1-drive-inbox.md) | Why Drive helps TPM review; how to mark 1.1 with n8n offline |
| [design/canvases/](design/canvases/) | Git copies of Cursor canvases (not the live n8n file) |
| [evidence/baseline-results.md](evidence/baseline-results.md) | T1–T12 runs (the eval table) |
| [evidence/experiment-log.md](evidence/experiment-log.md) | **Failures → fixes** (E1 / E1b / E5). Do not miss this for the eval loop. |
| [evidence/ground-truth/](evidence/ground-truth/) | Course inputs (immutable) + how GT is *not* the pipeline |
| [evidence/screenshots/](evidence/screenshots/) | Canvas, in-action, Langfuse |
| [system/workflow.json](system/workflow.json) | **Import this — version 1.0** (graded). 1.1 is optional |
| [system/prd_template.md](system/prd_template.md) | Ten-section PRD contract |
| [slides/prd_genie_capstone_summary.pptx](slides/prd_genie_capstone_summary.pptx) | Slide deck |
| [demo/prd-genie-demo.mp4](demo/prd-genie-demo.mp4) | **Demo** — T1 + T5, ~3:57 (5:00 is a max) |

## Guardrails (non-negotiable)

- If the input cannot determine X, write UNKNOWN. Do not invent X.
- Contradictions are listed, never resolved.
- Empty template sections stay under Open Questions.
- Acceptance criteria are copied verbatim into stories (T4 / T12).

## Cost

Langfuse actuals (ten T1–T10 runs, 6 Sep): mean **~$0.0071 / run** → **~$0.014 / user / day** at two first-drafts. Formula and table: [docs/architecture-writeup.md](docs/architecture-writeup.md#cost-analysis-langfuse-actuals--6-sep-2026).

## Demo video

PRD Genie requires a recording of the **working** n8n flow, **at most 5 minutes** (shorter is fine). This clip is T1 (Extractor → PRD → stories) then T5 (Gap on an ambiguous input). Details: [demo/demo-video-link.md](demo/demo-video-link.md).

## Zip this branch (submission pack)

Do **not** zip the working folder by hand — that would include `demo/raw/` (~289 MB) and `system/.env`. From this branch:

```bash
git archive --format=zip --output=prd-genie-submission.zip HEAD
```

That archive is **1.0** JSON, prompts, docs, traces, screenshots, slides, and the ≤5 min demo. **1.1** is included as an enhancement JSON + [docs/enhancement-v1.1-drive-inbox.md](docs/enhancement-v1.1-drive-inbox.md).

## License / provenance

Course problem statement, template, sample inputs, and `eval_prdgenie_inputs.txt` are from the Interview Kickstart capstone pack (© course authors). Used here as the required ground truth. Charter, ADRs, prompts, and writeups are original for this submission.
