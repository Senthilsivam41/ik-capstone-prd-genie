# Enhancement 1.1 — Google Drive TPM inbox

**Not a scored rubric line.** Version **1.0** is what earned Q3 (core 12 + extended 8 + observability 5 + baseline 5). Version **1.1** is an optional verification path: put the PRD where a TPM can open it, instead of only in Langfuse traces.

The IK n8n Cloud account for this cohort is **deactivated**. Do not expect to Test-workflow 1.1 on `agenticai100.app.n8n.cloud`. Review 1.1 from the JSON, this note, and the Drive folder that was created for the inbox.

| Version | File | What a reviewer marks |
|---|---|---|
| **1.0** (graded) | [`system/workflow.json`](../system/workflow.json) = [`system/workflows/prd-genie-1.0.json`](../system/workflows/prd-genie-1.0.json) | Extractor → (Gap ∥ PRD → stories) → Langfuse. Evidence: [baseline-results.md](../evidence/baseline-results.md), [screenshots](../evidence/screenshots/), [demo](../demo/prd-genie-demo.mp4) |
| **1.1** (enhancement) | [`system/workflows/prd-genie-1.1.json`](../system/workflows/prd-genie-1.1.json) | Same four agents, then a **Code** classifier files Google Docs into Ready vs Unclassified. No fifth agent. Not a Gap gate. |

## Why this is better for TPM verification

Langfuse is the right place for **traces, tokens, and judges**. It is the wrong place for a TPM to **review a PRD**. A generation payload is hard to comment on, share with a stakeholder, or distinguish “ready” from “still has open questions.”

1.1 writes the same markdown the agents already produced into a Drive inbox:

```
PRD-Genie/
├── 00-How TPMs use this folder
├── 01-Ready for TPM review/{YYYY-MM-DD}_{testId}/
│   ├── 00-run-index
│   ├── 01-requirement-extraction
│   ├── 02-prd
│   └── 03-user-stories
└── 02-Unclassified - open items/{YYYY-MM-DD}_{testId}/
    ├── 00-run-index … 03-user-stories
    └── 04-open-items          ← Gap questions + why unclassified
```

Inbox that was created for this project: [PRD-Genie](https://drive.google.com/drive/folders/1S_vbpfEwSZTmMY5Bcud1cQP3SX7UU8QL)

Folder contract and routing rules: [drive-output.md](../design/drive-output.md). Classifier source: [`system/drive/assemble-drive-packet.js`](../system/drive/assemble-drive-packet.js) (keep in sync with the 1.1 Code node).

## What 1.1 does *not* change

- Still four agents. Still sequential + one branch (ADR-001 / ADR-004).
- Gap still does **not** block PRD (T9 still writes a PRD; it lands in Unclassified).
- Langfuse still runs **before** any Drive write.
- Routing is deterministic string checks (UNKNOWN, Gap questions, Open Questions). Not BR-8 input classification. Not an extra LLM.
- HITL is still **offline**: answer questions, append to the source, re-run from the Extractor. No wait/resume node.

## How to verify 1.1 without n8n Cloud

1. Open `prd-genie-1.1.json` and confirm the chain after **Send to Langfuse1**: Assemble Drive Packet → Create run folder → Stamp files with folder → Upload Google Doc.
2. Read the Code in **Assemble Drive Packet** (or `assemble-drive-packet.js`): Ready vs Unclassified rules.
3. Open the Drive root and the two bucket folders. The how-to Doc is already there.
4. On a private n8n (optional): import 1.1, attach Google Drive OAuth, run T1 (expect Ready) and T5 (expect Unclassified).

Scored T1–T12 evidence stays on **1.0**. Do not treat a missing 1.1 execution as a rubric fail.
