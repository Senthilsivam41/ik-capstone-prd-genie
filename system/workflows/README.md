# system/workflows

n8n Cloud import files for PRD Genie (IK instance: `agenticai100.app.n8n.cloud`).

| File | Slice | What it contains |
|---|---|---|
| `prd-genie-slice1-extractor.json` | 1 (Extractor-only) | Manual Trigger → **Input Text** (`chatInput` = official T1 brief) → Extractor → Langfuse OTLP |
| `PRD Genie — Slice 1 Extractor + Langfuse-v0.5.json` | Core (Sheets lookup) | `testId` → Google Sheet row → Extractor → PRD → stories → Langfuse OTLP (one generation per agent) |
| `../workflow.json` | Core (pack export) | Same graph as v0.5 — `testId` → sheet → Extractor → PRD → stories → Langfuse OTLP |

Gap Analyzer is still out (R4 / ADR-004). Do not import `*-bkup.json` or `*-5Sept.json`.

## Import

1. n8n → Import from File → pick the JSON.
2. **OpenAI Chat Model** → Credentials → your OpenAI account.
3. **Send to Langfuse** → Credentials → **Basic Auth** → new credential:
   - Username = Langfuse **public** key (`pk-lf-…`)
   - Password = Langfuse **secret** key (`sk-lf-…`)
4. Import as a **new** workflow and delete older Slice 1 copies.
5. Re-select OpenAI and Langfuse credentials if empty.
6. Open **Input Text**, set `testId`, click **Test workflow** from Manual Trigger.

On v0.5 / `workflow.json`, `testId` selects the Google Sheet row. That row’s `chatInput` is the Extractor input. The long Sarah/Raj/Lisa meeting is not T1.

Keys live in n8n credentials. They are never written into these JSON files.

## How tracing works here

IK n8n Cloud has no first-party Langfuse *tracing* credential, so this uses **Option C (HTTP ingest)** from [langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md): a Code node builds an OTLP/HTTP JSON payload (root observation + one generation) and an HTTP Request node posts it to `POST https://cloud.langfuse.com/api/public/otel/v1/traces` with `x-langfuse-ingestion-version: 4`. Builder: [../langfuse/build-otlp-trace.js](../langfuse/build-otlp-trace.js).

Spans are explicit — one generation per agent, added as agents are added — rather than automatic LangChain callbacks. That still satisfies the acceptance bar, which asks for per-agent generations with I/O and tokens, not for a specific integration.

Host is `https://cloud.langfuse.com` (EU). Pointing at `us.cloud.langfuse.com` returns success and the project stays empty.

**Tokens:** the batch does not send a `usage` block, because `chainLlm` does not expose token counts. Langfuse derives usage from the model name. If tokens do not appear on the generation, switch the Extractor to the OpenAI **Message a Model** node with *Simplify Output* off, which returns a real `usage` object — do not hand-write token numbers.

## After a run

Copy **both** the Extractor output and the `traceId` into `evidence/baseline-results.md`. A Pass with no trace ID is an invented green.

After T1 is green: extend the same canvas (PRD → stories → Gap branch), add one generation per agent to the batch, then re-export over `system/workflow.json`.

## CSV / later automation

Machine-readable rows: [`evidence/ground-truth/eval_prdgenie_inputs.csv`](../../evidence/ground-truth/eval_prdgenie_inputs.csv). How and when to loop them in n8n: [`evidence/ground-truth/README.md`](../../evidence/ground-truth/README.md). Do not replace this Slice 1 canvas with an unfiltered 10-row loop until those IDs have been scored one at a time.
