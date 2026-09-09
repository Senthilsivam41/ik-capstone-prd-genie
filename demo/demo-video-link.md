# Demo video

PRD Genie **requires** a demo of the **working** n8n + Langfuse flow. **5:00 is a maximum, not a target.** Shorter is fine if T1 (core e2e) and one Gap case (T5) are visible.

## Primary deliverable (in-repo)

| | |
|---|---|
| **File** | [`demo/prd-genie-demo.mp4`](prd-genie-demo.mp4) |
| **Duration** | ~3:57 — under the 5:00 ceiling |
| **Size** | ~14 MB (compressed for GitHub; 100 MB hard limit) |
| **Runs shown** | **T1** (Extractor → PRD → stories) and **T5** (Gap questions on an ambiguous input). Two runs are enough. Do not pad with extra IDs to fill 5:00. |
| **When** | First **required** at release **R4** ([docs/release-plan.md](../docs/release-plan.md)) — after Gap Analyzer is on the canvas |
| **Status** | Recorded. Master (gitignored) at `demo/raw/PRD-Genie-Demo.mov`. |

## What this recording covers

Record from `https://agenticai100.app.n8n.cloud/workflow/Eai2sodOz0gUVnx8` **after re-importing** `system/workflow.json` so the sticky notes are visible. No slide recap. Walk **agent out → next agent in**.

1. **T1** — happy path. Extractor output, that same markdown as **PRD input**, then **stories**.
2. **T5** — Extractor UNKNOWN/ambiguous → **Gap questions** (no invented answers). Gap is a sibling of PRD, not a later critic and not a gate.

Stop when those two runs are visible. Do not add T9, a timed Langfuse tour, or a deck recap just to approach 5:00.

## Optional URL (backup / if file too large)

_Paste unlisted YouTube / Drive / Loom here if used:_

-

If both exist: in-repo file is canonical for clone-based grading; URL is for convenience.

## Local-only (gitignored)

Put oversized masters in `demo/raw/` — that folder is gitignored.
