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
| Status | Design pack complete · Slice 1 Extractor canvas built and traced in Langfuse · baseline T1–T12 not yet run |

## What is in this repo vs what is still to build

**In the repo now (Q1–Q3 design + course inputs):**

- Programme charter, RAID, four ADRs, 1–2 page architecture writeup
- Agent prompt specs (ROLE / INPUT / OUTPUT / RULES)
- Architecture diagram
- Official course inputs and the 12-row baseline file
- Experiment log + baseline results **templates** (no invented scores)
- Slice 1 Extractor n8n export with Langfuse HTTP ingest, plus the 4 Sep trace screenshot and its recorded tokens/cost

**Not in the repo yet (Days 3–14 of the charter):**

- n8n export for the **full** pipeline — only the Slice 1 Extractor export is in (`system/workflow.json`); PRD Generator, Story Breakdown and Gap Analyzer are not wired
- Screenshots `n8n-canvas.png` and `pipeline-in-action.png` — the Langfuse traces screenshot **is** in (`evidence/screenshots/langfuse-traces.png`)
- Langfuse score configs `completeness` / `hallucination` / `groundedness`
- Filled baseline outputs for T1–T12
- Experiment E1+ with real before/after scores
- Q4 reflection findings (page is a locked method + empty results column)
- 5-minute demo video (`demo/prd-genie-demo.mp4` at release R4; optional URL backup)
- Slide deck `.pptx` (speaker outline is in `slides/`)

## Repo map

```
docs/          Q1–Q4 writeups, RAID, ADRs, course problem statement PDF
design/        architecture SVG, agent prompts, orchestration notes, canvas git copies
evidence/      ground-truth baseline file, results + experiment log, screenshots
system/        n8n export (pending), inputs, PRD template, .env.example
slides/        speaker outline for the summary deck
demo/          5-min demo clip (R4+) + demo-video-link.md pointer
```

**Scoring law:** [docs/rubric.md](docs/rubric.md) (80 pts) and `.cursor/rules/prd-genie-rubric.mdc` — every change must name the rubric line it earns. **Business framing, scope boundaries and business rules:** [docs/brd.md](docs/brd.md). Design rationale: [docs/architecture-writeup.md](docs/architecture-writeup.md). **Build order / demo:** [docs/release-plan.md](docs/release-plan.md) · clip path `demo/prd-genie-demo.mp4` (R4). **Course touch points (stay on n8n):** [docs/course-touchpoints.md](docs/course-touchpoints.md).

## Setup

Runtime is **Interview Kickstart n8n Cloud** + **Langfuse EU** ([ADR-005](docs/adr/ADR-005-workflow-platform.md)). Do not install LangFlow for the submission canvas.

1. Sign in to [IK n8n](https://agenticai100.app.n8n.cloud/home/workflows).
2. Confirm the Langfuse project: [EU project](https://cloud.langfuse.com/project/cmthhhzzv02wsad0d4qogeznv) (region **EU**, host `https://cloud.langfuse.com` — not `us.cloud.langfuse.com`).
3. Copy `system/.env.example` to `system/.env` and fill keys. **Do not commit `.env`.**

```bash
cp system/.env.example system/.env
```

4. In n8n: **Credentials → Add → Basic Auth**. Username = `LANGFUSE_PUBLIC_KEY`, password = `LANGFUSE_SECRET_KEY`, with **no trailing slash and no leading space**. The `Send to Langfuse` node uses this as a generic `httpBasicAuth` credential; the host `https://cloud.langfuse.com` is already in the node URL, not in the credential. n8n Cloud does not read `system/.env`; the file is only a local backup of the same values.
5. Create Langfuse score configs: `completeness`, `hallucination`, `groundedness`. **Still outstanding** — the one open item on the observability line.

**How n8n sends data to Langfuse:** the workflow has no auto-tracing callback, so a `Build Langfuse Batch` Code node assembles a `trace` + `generation` batch and a `Send to Langfuse` **HTTP Request** node posts it to `POST https://cloud.langfuse.com/api/public/ingestion` over Basic Auth — Option C in [docs/langfuse-observability-acceptance.md](docs/langfuse-observability-acceptance.md). IK n8n Cloud has no first-party Langfuse *tracing* credential and community-node install rights are not assumed, so spans are explicit (one HTTP call per agent) rather than automatic. Langfuse derives tokens and cost from the model name; the batch sends no `usage` block.

An OpenAI or Anthropic (or OpenRouter) credential is still required in n8n before T1 can run. Observability keys alone do not earn the +5 until a trace appears on that project.

## How to run (Slice 1 — Extractor)

Importable canvas is already in the repo (TDD: Extractor only until T1 is green).

1. In [IK n8n](https://agenticai100.app.n8n.cloud): **… → Import from File** (or Create workflow → ⋮ → Import).
2. Choose [`system/workflow.json`](system/workflow.json) (same file as [`system/workflows/prd-genie-slice1-extractor.json`](system/workflows/prd-genie-slice1-extractor.json)).
3. Open **OpenAI Chat Model** → Credentials → select **OpenAI account** (IK).
4. Open **Input Text** — `chatInput` is prefilled with Transcript 1. For graded **T1**, replace it with the T1 line from [`evidence/ground-truth/eval_prdgenie_inputs.txt`](evidence/ground-truth/eval_prdgenie_inputs.txt).
5. Click **Test workflow**. Copy the Extractor markdown into [`evidence/baseline-results.md`](evidence/baseline-results.md).
6. Do **not** add PRD / stories / Gap Analyzer until that row is Pass. Langfuse HTTP ingest is already wired and traced (4 Sep) — observability came before the first scored run, as the rubric requires.

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

PRD Genie requires a ≤5-minute recording of the working app. **Canonical:** commit a small file as `demo/prd-genie-demo.mp4` (first required at release **R4** — see [docs/release-plan.md](docs/release-plan.md)). Keep an optional URL in [demo/demo-video-link.md](demo/demo-video-link.md) if the file is too large for GitHub (&lt;25 MB preferred; 100 MB hard limit).

## License / provenance

Course problem statement, template, sample inputs, and `eval_prdgenie_inputs.txt` are from the Interview Kickstart capstone pack (© course authors). Used here as the required ground truth. Charter, ADRs, prompts, and writeups are original for this submission.
