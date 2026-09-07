# Demo video

PRD Genie **requires** a ≤5-minute demo of the **working** n8n + Langfuse flow.

## Primary deliverable (in-repo)

| | |
|---|---|
| **File** | `demo/prd-genie-demo.mp4` (`.webm` / `.mov` OK) |
| **When** | First **required** at release **R4** ([docs/release-plan.md](../docs/release-plan.md)) — after Gap Analyzer is on the canvas |
| **Size** | Prefer **&lt; 25 MB**. GitHub warns large files; **100 MB** hard limit. Compress or use LFS / external URL if larger |
| **Status** | _Not recorded yet._ Needs a signed-in n8n Cloud session (IK login). |

## One-take shot list (≤5:00)

Record from `https://agenticai100.app.n8n.cloud/workflow/Eai2sodOz0gUVnx8`. No slide recap.

1. **0:00–0:20** — Canvas zoomed out: Extractor, Gap branch, PRD, stories, Langfuse HTTP.
2. **0:20–1:10** — `testId` = T1 → Test workflow → Extractor + PRD + stories visible.
3. **1:10–2:10** — `testId` = T2 or T5 → Gap questions (no invented answers).
4. **2:10–3:40** — Langfuse EU project `my-capstone-prd-genie`: one `prd-genie-slice1` trace, four generations, H/G/C.
5. **3:40–4:30** — Say T9: Gap `NONE`, PRD still ran (branch is not a gate). Cost ~$0.007 / run.
6. **4:30–5:00** — Stop. Point at `slides/prd_genie_capstone_summary.pptx`.

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
