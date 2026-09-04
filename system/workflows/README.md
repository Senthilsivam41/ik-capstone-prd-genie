# system/workflows

n8n Cloud import files for PRD Genie (IK instance: `agenticai100.app.n8n.cloud`).

| File | Slice | What it contains |
|---|---|---|
| `prd-genie-slice1-extractor.json` | 1 (current) | Manual Trigger → Input Text (`chatInput`) → Requirement Extractor (gpt-4o) |
| `../workflow.json` | same | Canonical export path expected by the submission pack — keep identical to Slice 1 until a later export overwrites it |

## Import

1. n8n → Import from File → pick the JSON.
2. Attach credential **OpenAI account** on **OpenAI Chat Model**.
3. Edit `chatInput` in **Input Text**, then Test workflow.

After T1 is green: extend the same canvas (PRD → stories → Gap branch), then re-export over `system/workflow.json`.
