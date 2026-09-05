# system/workflows

n8n Cloud import files for PRD Genie (IK instance: `agenticai100.app.n8n.cloud`).

| File | Slice | What it contains |
|---|---|---|
| `prd-genie-slice1-extractor.json` | 1 (Extractor-only) | Manual Trigger → **Input Text** (`chatInput` = official T1 brief) → Extractor → Langfuse OTLP |
| `PRD Genie — Slice 1 Extractor + Langfuse-v0.5.json` | Core (archive) | `testId` → sheet → Extractor → PRD → stories → Langfuse OTLP (no Gap) |
| `PRD Genie — Slice 1 Extractor + Langfuse-v0.7.json` | Core + Gap | `testId` → sheet → Extractor → (Gap Analyzer ∥ PRD → stories) → Merge → Langfuse OTLP |
| `../workflow.json` | Pack export | Same graph as v0.7 |

Do not import `*-bkup.json` or `*-5Sept.json`. Use v0.7 / `workflow.json` for new runs.

## Import

1. n8n → Import from File → pick the JSON.
2. **OpenAI Chat Model** → Credentials → your OpenAI account.
3. **Send to Langfuse** → Credentials → **Basic Auth** → new credential:
   - Username = Langfuse **public** key (`pk-lf-…`)
   - Password = Langfuse **secret** key (`sk-lf-…`)
4. Import as a **new** workflow and delete older Slice 1 copies.
5. Re-select OpenAI and Langfuse credentials if empty.
6. Open **Input Text**, set `testId`, click **Test workflow** from Manual Trigger.

On v0.7 / `workflow.json`, `testId` selects the Google Sheet row. That row’s `chatInput` is the Extractor input. The long Sarah/Raj/Lisa meeting is not T1. Gap Analyzer is parallel with PRD (ADR-004) and is a fourth Langfuse generation.

Keys live in n8n credentials. They are never written into these JSON files.

## How tracing works here

IK n8n Cloud has no first-party Langfuse *tracing* credential, so this uses **Option C (HTTP ingest)** from [langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md): a Code node builds an OTLP/HTTP JSON payload (root observation + one generation per agent) and an HTTP Request node posts it to `POST https://cloud.langfuse.com/api/public/otel/v1/traces` with `x-langfuse-ingestion-version: 4`. Builder: [../langfuse/build-otlp-trace.js](../langfuse/build-otlp-trace.js). v0.7 sends Extractor, Gap Analyzer, PRD, and Story Breakdown.

Spans are explicit — one generation per agent, added as agents are added — rather than automatic LangChain callbacks. That still satisfies the acceptance bar, which asks for per-agent generations with I/O and tokens, not for a specific integration.

Host is `https://cloud.langfuse.com` (EU). Pointing at `us.cloud.langfuse.com` returns success and the project stays empty.

**Tokens:** the batch does not send a `usage` block, because `chainLlm` does not expose token counts. Langfuse derives usage from the model name. If tokens do not appear on the generation, switch the Extractor to the OpenAI **Message a Model** node with *Simplify Output* off, which returns a real `usage` object — do not hand-write token numbers.

## After a run

Copy **both** the Extractor output and the `traceId` into `evidence/baseline-results.md`. A Pass with no trace ID is an invented green.

After a Gap run: copy the Gap Analyzer markdown and the `traceId` into the Gap Analyzer section of `evidence/baseline-results.md`. The Extractor Pass on that ID is a different seam.

## CSV / later automation

Machine-readable rows: [`evidence/ground-truth/eval_prdgenie_inputs.csv`](../../evidence/ground-truth/eval_prdgenie_inputs.csv). How and when to loop them in n8n: [`evidence/ground-truth/README.md`](../../evidence/ground-truth/README.md). Do not replace this Slice 1 canvas with an unfiltered 10-row loop until those IDs have been scored one at a time.
