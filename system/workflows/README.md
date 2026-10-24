# system/workflows

n8n JSON exports for PRD Genie.

**Graded import (version 1.0):** [`../workflow.json`](../workflow.json) = [`prd-genie-1.0.json`](prd-genie-1.0.json).

The IK n8n Cloud account for this cohort is **deactivated**. Reviewers should mark 1.0 from this JSON plus [screenshots](../../evidence/screenshots/), [baseline-results.md](../../evidence/baseline-results.md), and the [demo](../../demo/prd-genie-demo.mp4). Do not require a live Test-workflow.

| File | Version | What it contains |
|---|---|---|
| [`prd-genie-1.0.json`](prd-genie-1.0.json) | **1.0 — graded** | `testId` → sheet → Extractor → (Gap Analyzer ∥ PRD → stories) → Merge → Langfuse OTLP |
| [`prd-genie-1.1.json`](prd-genie-1.1.json) | **1.1 — enhancement** | 1.0 plus Drive inbox (Ready vs Unclassified) after Langfuse. **Not scored.** |
| [`../workflow.json`](../workflow.json) | Pack default | Same graph as **1.0** |

Do not import backups or LangFlow dumps. Those files are not in this pack.

## 1.0 — what the rubric marks

Sticky notes on the canvas name how to run, the pattern, and what each agent does (Extractor / Gap / PRD / stories / Langfuse).

`testId` selects the Google Sheet row. That row’s `chatInput` is the Extractor input. Gap Analyzer is parallel with PRD (ADR-004) and is a fourth Langfuse generation.

If you have a **private** n8n:

1. Import `prd-genie-1.0.json`.
2. **OpenAI Chat Model** → your OpenAI account.
3. **Send to Langfuse** → **Basic Auth**: username = public key (`pk-lf-…`), password = secret key (`sk-lf-…`).
4. Re-select Google Sheets if empty.
5. Open **Input Text**, set `testId`, Test workflow.

Keys live in n8n credentials. They are never written into these JSON files.

## 1.1 — Drive inbox (optional)

See [enhancement-v1.1-drive-inbox.md](../../docs/enhancement-v1.1-drive-inbox.md). Same four agents; then a Code node files Google Docs for TPM review. Import only on a private n8n with Google Drive OAuth. Not required for the 80-point table.

## How tracing works (1.0 and 1.1)

IK n8n Cloud had no first-party Langfuse tracing credential, so this uses **Option C (HTTP ingest)** from [langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md): a Code node builds OTLP/HTTP JSON (root + one generation per agent) and an HTTP Request node posts to `POST https://cloud.langfuse.com/api/public/otel/v1/traces` with `x-langfuse-ingestion-version: 4`. Builder: [../langfuse/build-otlp-trace.js](../langfuse/build-otlp-trace.js).

Host is `https://cloud.langfuse.com` (EU). Pointing at `us.cloud.langfuse.com` returns success and the project stays empty.

**Tokens:** the batch does not send a `usage` block, because `chainLlm` does not expose token counts. Langfuse derives usage from the model name.

## After a run (when n8n was live)

Copy **both** the Extractor output and the `traceId` into `evidence/baseline-results.md`. A Pass with no trace ID is an invented green. T1–T12 in this pack were recorded that way before the cohort n8n account closed.
