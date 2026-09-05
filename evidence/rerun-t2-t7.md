# Re-run T2 and T7 (after prompt E1)

**E1 result (5 Sep):** T2 **Pass** (`1fadd877-560b-4db4-98fe-ca683925e2d4`). T7 **still Fail** (`87076a54-22f3-4889-aa37-a7beb8989721`) — no Constraints / `class: NFR`.

**E1b is written.** Rule 9 in [`design/agents/requirement-extractor.md`](../design/agents/requirement-extractor.md) now **requires** a `## Constraints` section with `class: NFR`. Paste that prompt into n8n, **then** run T7 only (see below). Do not run T7 before the paste.

The Fail results are already recorded. The **fix** is in the Extractor system prompt, not in a new workflow.

## Where the change is

| File | What to do |
|---|---|
| [`design/agents/requirement-extractor.md`](../design/agents/requirement-extractor.md) | Source of truth. New **rule 8** (T2) and **rule 9** (T7). Constraints now have `class: NFR`. |
| [`system/workflows/prd-genie-slice1-extractor.json`](../system/workflows/prd-genie-slice1-extractor.json) | Same prompt inside the **Requirement Extractor** node. Re-import **or** paste the prompt into the existing node. |
| [`evidence/experiment-log.md`](experiment-log.md) | Experiment **E1** — do not mark it kept until both new traces exist. |

## Steps in n8n (existing Slice 1 canvas)

1. Open **Requirement Extractor** → system message.
2. Replace it with the Prompt from `design/agents/requirement-extractor.md` (ROLE through Self-check), **or** re-import `prd-genie-slice1-extractor.json` and re-attach OpenAI + Langfuse credentials.
3. Confirm the message contains the lines `This is the T2 check` and `This is the T7 check`.
4. Run **T2 only**:
   - Input Text `testId` = `T2`
   - `chatInput` = `We need better reporting. Something like what Competitor X has.`
   - **Test workflow** from Manual Trigger
5. Run **T7 only**:
   - `testId` = `T7`
   - `chatInput` = `API must support 10,000 concurrent users. Response time < 200ms at p95. Must integrate with Salesforce REST API v52.`
   - **Test workflow**
6. Tell me when both traces exist. Do not re-run T1 or T3–T6 / T8–T10 for this experiment.

## What must appear for a Pass

**T2** Missing information must include (as UNKNOWN, not invented values):

- metrics
- format
- users

**T7** Keep `10,000`, `200ms` / `p95`, `Salesforce REST API v52` exact, **and** at least one Constraints row with `class: NFR`.
