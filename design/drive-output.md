# Google Drive output — TPM review inbox (1.1)

**Not a scored rubric line.** Version **1.0** is the graded canvas. This folder contract belongs to **1.1**. The IK n8n Cloud account is **deactivated** — mark 1.1 from [enhancement-v1.1-drive-inbox.md](../docs/enhancement-v1.1-drive-inbox.md) plus this structure, not from a live Test-workflow.

Langfuse stays the trace store. Drive is where a TPM **opens the draft**.

Live root: [PRD-Genie](https://drive.google.com/drive/folders/1S_vbpfEwSZTmMY5Bcud1cQP3SX7UU8QL)

## Folder structure

```
PRD-Genie/
├── 00-How TPMs use this folder          ← start here
├── 01-Ready for TPM review/
│   └── {YYYY-MM-DD}_{testId}/           ← one folder per run
│       ├── 00-run-index
│       ├── 01-requirement-extraction
│       ├── 02-prd
│       └── 03-user-stories
└── 02-Unclassified - open items/
    └── {YYYY-MM-DD}_{testId}/
        ├── 00-run-index
        ├── 01-requirement-extraction
        ├── 02-prd                         ← still written (Gap is not a gate)
        ├── 03-user-stories
        └── 04-open-items                  ← Gap questions + why unclassified
```

| Folder ID | Bucket |
|---|---|
| `1iHpeQq9IUMbkTy9kBZLBqwDVM3uUQefm` | Ready |
| `1fYr-44C3iUejXEjHKFT8GS1irhTughpI` | Unclassified |

Each file is uploaded as a **Google Doc** so the TPM can comment in place.

## Routing (deterministic Code node)

Unclassified if **any** of:

1. Gap extractability is `INSUFFICIENT` or `NONE`
2. Gap has clarification questions (`question:` lines)
3. Unresolved contradictions in Gap or Extractor
4. UNKNOWN in the extraction
5. PRD `Open Questions` is not empty / not “none”

Otherwise **Ready**. Typical Ready IDs: T1, T4, T7, T8. Typical Unclassified: T2, T3, T5, T6, T9, T10.

No LLM in this step. The four agents already ran. This only **files** their markdown.

## What a TPM does

**Ready:** read `02-prd` then `03-user-stories`. Comment. If you approve, engineering can use this draft.

**Unclassified:** open `04-open-items` first. Answer questions with stakeholders. Append answers to the source transcript. Re-run PRD Genie from the Extractor as a **new** run. Do not resume mid-trace (ADR-004).

## n8n wiring (after Langfuse)

```
Send to Langfuse
  → Assemble Drive Packet     (Code — classify + file list)
  → Create run folder         (Drive folder under Ready or Unclassified)
  → Stamp files with folder   (Code — one item per Doc)
  → Upload Google Doc         (Drive createFromText, convert to Doc)
```

Observability still runs **before** the Drive write. If Drive credentials are missing, set the Drive nodes to continue on error so T1–T12 traces are not blocked.

After import: select a **Google Drive OAuth** credential (Drive file scope). Folder IDs live in `system/drive/assemble-drive-packet.js` and the matching Code node.
