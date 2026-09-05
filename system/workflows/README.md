# system/workflows

n8n Cloud import files for PRD Genie (IK instance: `agenticai100.app.n8n.cloud`).

| File | Slice | What it contains |
|---|---|---|
| `prd-genie-slice1-extractor.json` | 1 (current) | Manual Trigger → Select Test (`testId`) → Resolve Input → Requirement Extractor → Build Langfuse Batch → Send to Langfuse. One straight line — no Switch. |
| `../workflow.json` | same | Canonical export path expected by the submission pack — keep identical to Slice 1 until a later export overwrites it |

Extractor only, on purpose. PRD Generator, Story Breakdown and Gap Analyzer are **not** in this file: wiring all four agents before the Extractor passes T1 is the failure mode the rubric scores against.

## Import

1. n8n → Import from File → pick the JSON.
2. **OpenAI Chat Model** → Credentials → your OpenAI account.
3. **Send to Langfuse** → Credentials → **Basic Auth** → new credential:
   - Username = Langfuse **public** key (`pk-lf-…`)
   - Password = Langfuse **secret** key (`sk-lf-…`)
4. Import as a **new** workflow. Delete any previous Slice 1 copies that show unconnected nodes (the Switch import often landed as two disconnected graphs).
5. Re-select OpenAI and Langfuse credentials if the nodes show none.
6. **Select Test** → `testId` = `T1` or `Transcript1`. Click **Test workflow** from Manual Trigger.

Keys live in n8n credentials. They are never written into these JSON files.

## How tracing works here

IK n8n Cloud has no first-party Langfuse *tracing* credential, so this uses **Option C (HTTP ingest)** from [langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md): a Code node builds a Langfuse ingestion batch (one `trace-create` plus one `generation-create`) and an HTTP Request node posts it to the EU endpoint.

Spans are explicit — one generation per agent, added as agents are added — rather than automatic LangChain callbacks. That still satisfies the acceptance bar, which asks for per-agent generations with I/O and tokens, not for a specific integration.

Host is `https://cloud.langfuse.com` (EU). Pointing at `us.cloud.langfuse.com` returns success and the project stays empty.

**Tokens:** the batch does not send a `usage` block, because `chainLlm` does not expose token counts. Langfuse derives usage from the model name. If tokens do not appear on the generation, switch the Extractor to the OpenAI **Message a Model** node with *Simplify Output* off, which returns a real `usage` object — do not hand-write token numbers.

## After a run

Copy **both** the Extractor output and the `traceId` into `evidence/baseline-results.md`. A Pass with no trace ID is an invented green.

After T1 is green: extend the same canvas (PRD → stories → Gap branch), add one generation per agent to the batch, then re-export over `system/workflow.json`.
