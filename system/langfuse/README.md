# Langfuse v4 ingest (n8n)

Source of truth for the OTLP payload: [`build-otlp-trace.js`](build-otlp-trace.js).

n8n Cloud cannot `require()` this file. After you change the builder, copy `buildN8nOtlpReturn` into the **Build Langfuse Batch** Code node in `system/workflow.json` and `system/workflows/prd-genie-slice1-extractor.json`.

```bash
node --test system/langfuse/build-otlp-trace.test.js
```

Send path: `POST https://cloud.langfuse.com/api/public/otel/v1/traces`  
Header: `x-langfuse-ingestion-version: 4`  
Auth: existing Basic Auth (public key / secret key).

Do not post the same span IDs to `/api/public/ingestion` and OTEL in one project.
