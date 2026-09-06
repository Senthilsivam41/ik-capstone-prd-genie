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
| Status | Core + Gap live (Extractor → PRD → stories, Gap parallel) · Langfuse v4 OTLP · T1–T12 + Gap T2/T3/T5/T6/T9/T10 documented |

## What is in this repo vs what is still to build

**In the repo now (Q1–Q3 design + course inputs):**

- Programme charter, RAID, four ADRs, 1–2 page architecture writeup
- Agent prompt specs (ROLE / INPUT / OUTPUT / RULES)
- Architecture diagram
- Official course inputs and the 12-row baseline file
- Experiment log + baseline results **templates** (no invented scores)
- Core n8n export: sheet `testId` → Extractor → (Gap Analyzer ∥ PRD → stories) → Langfuse v4 OTLP (`system/workflow.json` = v0.7)
- Baseline T1–T12 pasted from real traces (T2/T7 kept after E1/E1b; T11/T12 Pass)
- Gap Analyzer scored on T2/T3/T5/T6/T9/T10 (questions, not invented answers)
- Langfuse score configs Completeness / Hallucination / Groundedness (NUMERIC 0–1)
- 4 Sep traces screenshot and recorded tokens/cost

**Not in the repo yet:**

- Screenshots `n8n-canvas.png` and `pipeline-in-action.png` — traces screenshot **is** in
- Q4 reflection findings (method only)
- Cost table overwrite from Langfuse actuals
- 5-minute demo video and slide deck `.pptx`

## Repo map

```
docs/          Q1–Q4 writeups, RAID, ADRs, course problem statement PDF
design/        architecture SVG, agent prompts, orchestration notes, canvas git copies
evidence/      ground-truth baseline file, results + experiment log, screenshots
system/        n8n export (v0.7 core + Gap + OTLP builder), PRD template, .env.example
slides/        speaker outline for the summary deck
demo/          5-min demo clip (R4+) + demo-video-link.md pointer
```

**Scoring law:** [docs/rubric.md](docs/rubric.md) (80 pts) and `.cursor/rules/prd-genie-rubric.mdc` — every change must name the rubric line it earns. **Business framing, scope boundaries and business rules:** [docs/brd.md](docs/brd.md). Design rationale: [docs/architecture-writeup.md](docs/architecture-writeup.md). **Build order / demo:** [docs/release-plan.md](docs/release-plan.md) · clip path `demo/prd-genie-demo.mp4` (R4). **Course touch points (stay on n8n):** [docs/course-touchpoints.md](docs/course-touchpoints.md).

## Setup

Runtime is **Interview Kickstart n8n Cloud** + **Langfuse EU** ([ADR-005](docs/adr/ADR-005-workflow-platform.md)). The cohort received n8n, so that is the submission canvas. n8n→LangFlow JSON export is **broken** (facilitator, 6 Sep) — do not rebuild on LangFlow.

1. Sign in to [IK n8n](https://agenticai100.app.n8n.cloud/home/workflows).
2. Confirm the Langfuse project: [EU project](https://cloud.langfuse.com/project/cmthhhzzv02wsad0d4qogeznv) (region **EU**, host `https://cloud.langfuse.com` — not `us.cloud.langfuse.com`).
3. Copy `system/.env.example` to `system/.env` and fill keys. **Do not commit `.env`.**

```bash
cp system/.env.example system/.env
```

4. In n8n: **Credentials → Add → Basic Auth**. Username = `LANGFUSE_PUBLIC_KEY`, password = `LANGFUSE_SECRET_KEY`, with **no trailing slash and no leading space**. The `Send to Langfuse` node uses this as a generic `httpBasicAuth` credential; the host `https://cloud.langfuse.com` is already in the node URL, not in the credential. n8n Cloud does not read `system/.env`; the file is only a local backup of the same values.
5. Score configs already exist on the EU project: Completeness, Hallucination, Groundedness (NUMERIC 0–1).

**How n8n sends data to Langfuse:** the workflow has no auto-tracing callback, so a `Build Langfuse Batch` Code node builds an OTLP/HTTP JSON payload (root observation + one generation per agent) and a `Send to Langfuse` **HTTP Request** node posts it to `POST https://cloud.langfuse.com/api/public/otel/v1/traces` with `x-langfuse-ingestion-version: 4` — Option C in [docs/langfuse-observability-acceptance.md](docs/langfuse-observability-acceptance.md). Overall I/O sits on the root observation (`langfuse.observation.input` / `output`), not deprecated trace I/O. IK n8n Cloud has no first-party Langfuse *tracing* credential, so spans are explicit. Re-import the JSON after this change; n8n Cloud does not read git.

An OpenAI or Anthropic (or OpenRouter) credential is still required in n8n before T1 can run. Observability keys alone do not earn the +5 until a trace appears on that project.

## How to run (core canvas)

1. In [IK n8n](https://agenticai100.app.n8n.cloud): **… → Import from File**.
2. Choose [`system/workflow.json`](system/workflow.json) (same as [`system/workflows/PRD Genie — Slice 1 Extractor + Langfuse-v0.7.json`](system/workflows/PRD%20Genie%20%E2%80%94%20Slice%201%20Extractor%20%2B%20Langfuse-v0.7.json)).
3. Re-select OpenAI, Google Sheets, and Langfuse Basic Auth if empty.
4. Open **Input Text** and set `testId` (`T1`…`T12`). The sheet row’s `chatInput` is what the Extractor reads. T11/T12 rows should be the T1 extraction / T11 PRD, not a new transcript.
5. Click **Test workflow**. Confirm a trace in Langfuse (root + one generation per agent: Extractor, Gap Analyzer, PRD, stories).
6. Gap Analyzer runs **in parallel with PRD** off the Extractor (ADR-004). It does not gate PRD. Live Gap chat model is still gpt-4o-mini — switch to gpt-4o when convenient (ADR-003).

Full graph: [design/orchestration-notes.md](design/orchestration-notes.md).

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
