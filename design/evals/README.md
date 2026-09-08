# Langfuse judges — PRD Genie

Q3 Cost+eval / Q4 plan item 2. These briefs replace Langfuse’s stock Hallucination template (carrots / eyewear). That template scores against **world knowledge**. PRD Genie scores against **this generation’s input**.

| Evaluator | Score config | Polarity (0–1) | File |
|---|---|---|---|
| Hallucination | `Hallucination` | **1 = bad** (invented / untraceable) | [hallucination.md](hallucination.md) |
| Completeness | `Completeness` | **1 = good** (every *stated* item captured) | [completeness.md](completeness.md) |
| Groundedness | `Groundedness` | **1 = good** (every claim has source evidence) | [groundedness.md](groundedness.md) |

Judges stay **in Langfuse**, on **generation** events, sampling 1, model **gpt-4o**. Not n8n nodes. Ground truth files never go into the workflow. These judges use only `query` (generation input) and `generation` (generation output).

## How to paste

1. Langfuse EU → **Evaluators** → open Completeness / Hallucination / Groundedness.
2. Replace the entire prompt with the **Prompt** block from the matching file.
3. Keep NUMERIC 0–1. If the UI uses `{{input}}` / `{{output}}` instead of `{{query}}` / `{{generation}}`, swap those names. Do not leave both.
4. Save. **New traces only.** Old 6 Sep Completeness/Groundedness numbers used the Hallucination brief — do not mix polarities. Do not overwrite T1–T12 Pass rows.

You do not need an n8n re-run for the prompt swap to apply to **future** generations. Re-scoring T1–T10 needs judge tokens (and a working LLM key).

## What each generation’s I/O is

| Agent | `query` (input) | `generation` (output) |
|---|---|---|
| Requirement Extractor | Sheet `chatInput` | Extraction markdown |
| Gap Analyzer | Extractor markdown | Clarification questions |
| PRD Generator | Extractor markdown | PRD (10 sections) |
| Story Breakdown | PRD (+ Gap text for traceability only) | Stories |

## Do not

- Use the carrots / “established knowledge” template.
- Quote Completeness means from before this swap as “% of fields present.”
- Put `eval_prdgenie_inputs.txt` Must-contain lines into the judge (that is GT; TDD seams stay in `evidence/baseline-results.md`).
