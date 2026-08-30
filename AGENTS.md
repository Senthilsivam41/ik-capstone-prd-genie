# AGENTS.md — PRD Genie capstone

You are working on Interview Kickstart **PRD Genie** (NeuronForge). Graders score an **80-point** rubric. Treat `.cursor/rules/prd-genie-rubric.mdc` and `docs/rubric.md` as law.

## Score before you type

Name the rubric line the current task earns (Q1 15 / Q2 15 / design 10 / core 12 / extended 8 / observability 5 / baseline 5 / cost+eval 5 / Q4 5). If it earns none, stop.

## Hard constraints

- Total is **80**. Reflection is **5**. Do not use other projects’ splits.
- Sequential pipeline + one branch (Gap Analyzer after Extractor). Justify, do not just name.
- Hallucination guardrail in every prompt: UNKNOWN, never invent, never pick a side on contradictions, never pad the template, copy ACs verbatim.
- Langfuse before the first successful run.
- Document each of T1–T12 when you run it. Never invent outputs.
- Cost: tokens × price × daily volume, as **cost per user per day**. ≥3 metrics from “invented requirements,” not a generic list.
- One experimental change at a time; repeat because non-deterministic; keep only if the gain is consistent.
- Fine-tune only after core + baseline. Demo video is required.
- Every Cursor canvas must be copied to `design/canvases/` in this repo (git reference). Live files stay in the IDE canvases folder.
- Implementation always uses branch `feature/<feature_name>` (kebab-case, no extra slashes). Never `feat/`. Never commit on `main` or `master`.

## Pointers

- Charter / RAID / ADRs: `docs/`
- Prompts: `design/agents/`
- Canvas references: `design/canvases/`
- Ground truth: `evidence/ground-truth/eval_prdgenie_inputs.txt`
- Template: `system/prd_template.md`
