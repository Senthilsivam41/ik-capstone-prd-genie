# system/workflows

n8n Cloud import files for PRD Genie (IK instance: `agenticai100.app.n8n.cloud`).

| File | Slice | What it contains |
|---|---|---|
| `prd-genie-slice1-extractor.json` | 1 (current) | Manual Trigger → **Input Text** (`chatInput` = official T1 brief, `testId` = `T1`) → Extractor → Langfuse |
| `../workflow.json` | same | Canonical export path expected by the submission pack — keep identical to Slice 1 until a later export overwrites it |

Extractor only, on purpose. PRD Generator, Story Breakdown and Gap Analyzer are **not** in this file: wiring all four agents before the Extractor passes T1 is the failure mode the rubric scores against.

## Import

1. n8n → Import from File → pick the JSON.
2. **OpenAI Chat Model** → Credentials → your OpenAI account.
3. **Send to Langfuse** → Credentials → **Basic Auth** → new credential:
   - Username = Langfuse **public** key (`pk-lf-…`)
   - Password = Langfuse **secret** key (`sk-lf-…`)
4. Import as a **new** workflow and delete older Slice 1 copies.
5. Re-select OpenAI and Langfuse credentials if empty.
6. Open **Input Text**. You should see the T1 brief already in `chatInput`. Click **Test workflow** from Manual Trigger.

`testId` is only a Langfuse tag. The Extractor reads `chatInput`, not `testId`. The long Sarah/Raj/Lisa meeting is not T1 — do not put it in `chatInput` for this run.

Keys live in n8n credentials. They are never written into these JSON files.

## How tracing works here

IK n8n Cloud has no first-party Langfuse *tracing* credential, so this uses **Option C (HTTP ingest)** from [langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md): a Code node builds a Langfuse ingestion batch (one `trace-create` plus one `generation-create`) and an HTTP Request node posts it to the EU endpoint.

Spans are explicit — one generation per agent, added as agents are added — rather than automatic LangChain callbacks. That still satisfies the acceptance bar, which asks for per-agent generations with I/O and tokens, not for a specific integration.

Host is `https://cloud.langfuse.com` (EU). Pointing at `us.cloud.langfuse.com` returns success and the project stays empty.

**Tokens:** the batch does not send a `usage` block, because `chainLlm` does not expose token counts. Langfuse derives usage from the model name. If tokens do not appear on the generation, switch the Extractor to the OpenAI **Message a Model** node with *Simplify Output* off, which returns a real `usage` object — do not hand-write token numbers.

## After a run

Copy **both** the Extractor output and the `traceId` into `evidence/baseline-results.md`. A Pass with no trace ID is an invented green.

After T1 is green: extend the same canvas (PRD → stories → Gap branch), add one generation per agent to the batch, then re-export over `system/workflow.json`.

## CSV / later automation

Machine-readable rows: [`evidence/ground-truth/eval_prdgenie_inputs.csv`](../../evidence/ground-truth/eval_prdgenie_inputs.csv). How and when to loop them in n8n: [`evidence/ground-truth/README.md`](../../evidence/ground-truth/README.md). Do not replace this Slice 1 canvas with an unfiltered 10-row loop until those IDs have been scored one at a time.
