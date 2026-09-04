# PRD Genie

Capstone for **Applied Agentic AI for PMs/TPMs** (Interview Kickstart).  
NeuronForge Technologies — AI-powered documentation assistant.

Turns meeting transcripts, product briefs, and stakeholder notes into a grounded PRD and user stories. Hallucination is the primary risk: a fluent document that invents scope is worse than messy notes.

| | |
|---|---|
| Author | Sendil |
| Pattern | Sequential pipeline + one branch ([ADR-001](docs/adr/ADR-001-orchestration-pattern.md)) |
| Extended capability | Gap Analyzer ([ADR-002](docs/adr/ADR-002-extended-capability.md)) |
| Platform | n8n (IK Cloud) + Langfuse EU |
| Status | Design pack complete · canvas not yet built · baseline not yet run |

## What is in this repo vs what is still to build

**In the repo now (Q1–Q3 design + course inputs):**

- Programme charter, RAID, four ADRs, 1–2 page architecture writeup
- Agent prompt specs (ROLE / INPUT / OUTPUT / RULES)
- Architecture diagram
- Official course inputs and the 12-row baseline file
- Experiment log + baseline results **templates** (no invented scores)

**Not in the repo yet (Days 3–14 of the charter):**

- n8n `system/workflow.json` export
- Screenshots (canvas, run, Langfuse traces)
- Filled baseline outputs for T1–T12
- Experiment E1+ with real before/after scores
- Q4 reflection findings (page is a locked method + empty results column)
- 5-minute demo video link
- Slide deck `.pptx` (speaker outline is in `slides/`)

## Repo map

```
docs/          Q1–Q4 writeups, RAID, ADRs, course problem statement PDF
design/        architecture SVG, agent prompts, orchestration notes, canvas git copies
evidence/      ground-truth baseline file, results + experiment log, screenshots
system/        n8n export (pending), inputs, PRD template, .env.example
slides/        speaker outline for the summary deck
demo/          placeholder for the required 5-min video URL
```

**Scoring law:** [docs/rubric.md](docs/rubric.md) (80 pts) and `.cursor/rules/prd-genie-rubric.mdc` — every change must name the rubric line it earns. Design rationale: [docs/architecture-writeup.md](docs/architecture-writeup.md).

## Setup

Runtime is **Interview Kickstart n8n Cloud** + **Langfuse EU** ([ADR-005](docs/adr/ADR-005-workflow-platform.md)). Do not install LangFlow for the submission canvas.

1. Sign in to [IK n8n](https://agenticai100.app.n8n.cloud/home/workflows).
2. Confirm the Langfuse project: [EU project](https://cloud.langfuse.com/project/cmsbfzos000iead0hcz5k5ygp) (region **EU**, host `https://cloud.langfuse.com` — not `us.cloud.langfuse.com`).
3. Copy `system/.env.example` to `system/.env` and fill keys. **Do not commit `.env`.**

```bash
cp system/.env.example system/.env
```

4. In n8n: **Credentials → Add** → Langfuse (or HTTP if that node is missing). Paste `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`, host `https://cloud.langfuse.com` with **no trailing slash and no leading space**. n8n Cloud does not read `system/.env`; the file is only a local backup of the same values.
5. Create Langfuse score configs: `completeness`, `hallucination`, `groundedness`.

An OpenAI or Anthropic (or OpenRouter) credential is still required in n8n before T1 can run. Observability keys alone do not earn the +5 until a trace appears on that project.

## How to run (Slice 1 — Extractor)

Importable canvas is already in the repo (TDD: Extractor only until T1 is green).

1. In [IK n8n](https://agenticai100.app.n8n.cloud): **… → Import from File** (or Create workflow → ⋮ → Import).
2. Choose [`system/workflow.json`](system/workflow.json) (same file as [`system/workflows/prd-genie-slice1-extractor.json`](system/workflows/prd-genie-slice1-extractor.json)).
3. Open **OpenAI Chat Model** → Credentials → select **OpenAI account** (IK).
4. Open **Input Text** — `chatInput` is prefilled with Transcript 1. For graded **T1**, replace it with the T1 line from [`evidence/ground-truth/eval_prdgenie_inputs.txt`](evidence/ground-truth/eval_prdgenie_inputs.txt).
5. Click **Test workflow**. Copy the Extractor markdown into [`evidence/baseline-results.md`](evidence/baseline-results.md).
6. Do **not** add PRD / stories / Gap Analyzer until that row is Pass. Langfuse HTTP ingest is the next edit after a green Extractor run.

Full target graph (later slices): [design/orchestration-notes.md](design/orchestration-notes.md).

Sample long-form inputs (not the graded 12, but useful for the thin-slice on Transcript 1) live in `system/inputs/`.

## Guardrails (non-negotiable)

- If the input cannot determine X, the agent says UNKNOWN. It does not invent X.
- Contradictions are listed, not resolved.
- Empty template sections stay under Open Questions.
- Acceptance criteria are copied verbatim into stories (T4 / T12).

## Cost

A priori estimate is ~**$0.02 per full run** on the split-model design (~$10/month at 20 PRDs/day). Method and table: [docs/architecture-writeup.md](docs/architecture-writeup.md). Replace with Langfuse actuals after the baseline.

## Demo video

PRD Genie requires a 5-minute demo. Put the URL in [demo/demo-video-link.md](demo/demo-video-link.md). Do not commit the video file.

## License / provenance

Course problem statement, template, sample inputs, and `eval_prdgenie_inputs.txt` are from the Interview Kickstart capstone pack (© course authors). Used here as the required ground truth. Charter, ADRs, prompts, and writeups are original for this submission.
