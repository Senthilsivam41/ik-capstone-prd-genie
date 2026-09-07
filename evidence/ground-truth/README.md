# Ground truth v0

**Official Session 2** (`Capstone Session 2 - Build, Evaluate, Submit.pptx`): the brief’s T1–T12 table is a **specification**, not ground truth. You cannot score by comparing a PRD to a sentence that says “must contain filters.” You still **run every brief input** and paste outputs — that is the baseline +5, not GT.

Ground truth is handcrafted ideal I/O, written by a human who knows the domain, **before** and **outside** the pipeline. Never generate the answer key from PRD Genie. Drafting in Claude/ChatGPT is allowed only if it is not *this* pipeline with *these* prompts.

| Layer | What it is | Frozen? |
|---|---|---|
| **Inputs (brief)** | [`eval_prdgenie_inputs.txt`](eval_prdgenie_inputs.txt) — course text. CSV is the same rows. | Yes. Immutable. |
| **GT v0** | Must contain / Must not / Gap checks in [`baseline-results.md`](../baseline-results.md), written **before** each ID was run. Per-agent seams in `.cursor/rules/tdd.mdc`. | Yes for T1–T12. Enrich later by **hand** only. Five pairs is a legitimate v0 (Session 2). |
| **Not GT** | Pipeline output, Langfuse scores, or “looks good.” The brief table itself. | — |

Vague/bad inputs (T2, T5, T9) expected: UNKNOWN / refuse / Gap questions — not an invented PRD. Official planted fails: empty notes refuse; contradiction flag not resolve; exact figures not rounded.

Do **not** invent extra tests from the agent. Live Q&A said “aim for 30”; the slide says start at five and grow by hand. Extra pairs after the pack = v0.1, handcrafted.

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
