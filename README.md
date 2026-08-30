# PRD Genie

Capstone for **Applied Agentic AI for PMs/TPMs** (Interview Kickstart).  
NeuronForge Technologies — AI-powered documentation assistant.

Turns meeting transcripts, product briefs, and stakeholder notes into a grounded PRD and user stories. Hallucination is the primary risk: a fluent document that invents scope is worse than messy notes.

| | |
|---|---|
| Author | Sendil |
| Pattern | Sequential pipeline + one branch ([ADR-001](docs/adr/ADR-001-orchestration-pattern.md)) |
| Extended capability | Gap Analyzer ([ADR-002](docs/adr/ADR-002-extended-capability.md)) |
| Platform | LangFlow + Langfuse |
| Status | Design pack complete · canvas not yet built · baseline not yet run |

## What is in this repo vs what is still to build

**In the repo now (Q1–Q3 design + course inputs):**

- Programme charter, RAID, four ADRs, 1–2 page architecture writeup
- Agent prompt specs (ROLE / INPUT / OUTPUT / RULES)
- Architecture diagram
- Official course inputs and the 12-row baseline file
- Experiment log + baseline results **templates** (no invented scores)

**Not in the repo yet (Days 3–14 of the charter):**

- LangFlow `system/workflow.json` export
- Screenshots (canvas, run, Langfuse traces)
- Filled baseline outputs for T1–T12
- Experiment E1+ with real before/after scores
- Q4 reflection findings (page is a locked method + empty results column)
- 5-minute demo video link
- Slide deck `.pptx` (speaker outline is in `slides/`)

## Repo map

```
docs/          Q1–Q4 writeups, RAID, ADRs, course problem statement PDF
design/        architecture SVG, agent prompts, orchestration notes
evidence/      ground-truth baseline file, results + experiment log, screenshots
system/        LangFlow export (pending), inputs, PRD template, .env.example
slides/        speaker outline for the summary deck
demo/          placeholder for the required 5-min video URL
```

**Scoring law:** [docs/rubric.md](docs/rubric.md) (80 pts) and `.cursor/rules/prd-genie-rubric.mdc` — every change must name the rubric line it earns. Design rationale: [docs/architecture-writeup.md](docs/architecture-writeup.md).

## Setup

1. Install [LangFlow](https://docs.langflow.org/) (desktop or `uv pip install langflow` / Docker — use whatever the course environment already uses).
2. Create a project at [cloud.langfuse.com](https://cloud.langfuse.com) (free tier).
3. Copy `system/.env.example` to `system/.env` and fill keys. **Do not commit `.env`.**

```bash
cp system/.env.example system/.env
```

4. Export the same variables in the environment that launches LangFlow so traces actually reach Langfuse:

```bash
set -a && source system/.env && set +a
# then start LangFlow
```

On macOS, a LangFlow Desktop app may not inherit shell env — set the Langfuse keys in the app's environment UI if traces do not appear (they can take 5–10 minutes; auto-refresh ~30s).

5. Create Langfuse score configs: `completeness`, `hallucination`, `groundedness`.

## How to run (once the canvas exists)

1. Import `system/workflow.json` into LangFlow (**File → Import**). Until that file is an real export, build the canvas from [design/orchestration-notes.md](design/orchestration-notes.md) and the four files in `design/agents/`.
2. Paste one baseline row from `evidence/ground-truth/eval_prdgenie_inputs.txt` into the text input. T11 uses the T1 extraction; T12 uses the T11 PRD.
3. Run. Confirm a trace in Langfuse.
4. Save the output under the matching ID in `evidence/baseline-results.md`.
5. After all 12, fill `evidence/experiment-log.md` — one change per row.

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
