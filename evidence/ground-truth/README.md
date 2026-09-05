# Ground truth (course-provided)

[`eval_prdgenie_inputs.txt`](eval_prdgenie_inputs.txt) is immutable course text.  
[`eval_prdgenie_inputs.csv`](eval_prdgenie_inputs.csv) is the same rows, machine-readable. Do not invent extra tests.

| `stage` | What runs |
|---|---|
| `extractor` / `runnable=yes` | T1–T10 — paste `chatInput` into Slice 1, or later loop these rows |
| `prd` / `stories` / `runnable=no` | T11–T12 — **not** new transcripts. T11 = T1 extraction; T12 = T11 PRD |

## Why we did not start with a batch loop

The rubric scores **first-failure isolation**. A CSV that fires T1–T10 in one click before T2 is green hides which ID broke. Manual one-row runs are the TDD path through T2 (and any red row).

Automation is for **replay** after a row is understood: same CSV, n8n Loop Over Items, one Langfuse tag per `testId`.

## Later n8n batch (R3, after T2+ are being recorded)

IK Cloud cannot read this repo file from disk. Use one of:

1. **HTTP Request** → raw GitHub URL of this CSV → **Extract from File** (CSV) → **Loop Over Items** (batch size 1) → Extractor → Langfuse. Filter `runnable=yes`. Optional: keep only `testId` you set on a Manual Trigger.
2. Paste the CSV into an n8n **Spreadsheet File** / binary once, pin it.
3. A Code node that returns the `extractor` rows as items — last resort; keep the CSV as the source of truth so the node does not drift.

Default the loop filter to **one** `testId`. An unfiltered 10-way run is for regression after those rows already have a Pass/Fail, not for first scoring.

T11/T12 stay out of the extractor loop.
