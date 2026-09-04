# Demo video

PRD Genie **requires** a ≤5-minute demo of the **working** n8n + Langfuse flow.

## Primary deliverable (in-repo)

| | |
|---|---|
| **File** | `demo/prd-genie-demo.mp4` (`.webm` / `.mov` OK) |
| **When** | First **required** at release **R4** ([docs/release-plan.md](../docs/release-plan.md)) — after Gap Analyzer is on the canvas |
| **Size** | Prefer **&lt; 25 MB**. GitHub warns large files; **100 MB** hard limit. Compress or use LFS / external URL if larger |
| **Status** | _Not recorded yet._ |

## Optional URL (backup / if file too large)

_Paste unlisted YouTube / Drive / Loom here if used:_

-

If both exist: in-repo file is canonical for clone-based grading; URL is for convenience.

## What the recording must show

1. Transcript in (T1 or Transcript 1).
2. Extraction with stated vs ambiguous visible.
3. PRD out, matching the template.
4. Stories out, with a verbatim AC if using T4.
5. Gap Analyzer flags on an ambiguous input (T2 or T5).
6. Langfuse: at least one trace with per-agent spans.

Keep it under 5:00. No slide recap inside the video — the deck is separate.

## Local-only (gitignored)

Put oversized masters in `demo/raw/` — that folder is gitignored.
