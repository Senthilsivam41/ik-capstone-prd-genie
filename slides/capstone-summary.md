# Capstone summary — speaker outline

Deck file: `slides/prd_genie_capstone_summary.pptx`. Keep to ~8–10 slides. Problem, approach, outcomes — not an n8n tutorial.

## Slide 1 — Title

PRD Genie · NeuronForge · Sendil  
Applied Agentic AI for PMs/TPMs capstone

## Slide 2 — Problem

PMs mine transcripts by hand. PRDs are inconsistent. Notes die in docs.  
**If the AI is wrong:** a hallucinated Must-Have ships to engineering.

## Slide 3 — Approach

Sequential pipeline + one branch.  
Extractor (full) → Gap Analyzer (full) ∥ PRD Generator (mini) → Story Breakdown (mini).  
Diagram: `design/architecture-diagram.png` (visual) · `design/architecture-diagram.svg` (structural)

## Slide 4 — Why this pattern

Not a router: same stages for every input type.  
Gap Analyzer **after extraction**, not after stories — catch gaps before they are rewritten twice.

## Slide 5 — Guardrails

UNKNOWN over invention.  
Contradictions listed, never resolved.  
Empty template sections stay Open Questions.  
ACs copied verbatim.

## Slide 6 — Evaluation

12-input course baseline. Langfuse from day one.  
Scores: completeness, hallucination, groundedness.  
One change per experiment (E1 / E1b / E5).

## Slide 7 — Outcomes (6 Sep Langfuse)

T1–T12 Pass; Gap Pass on T2/T3/T5/T6/T9/T10.  
Judge means over observations (not % of T-rows): Hallucination 0.17 · Groundedness 0.15 · Completeness 0.12.  
Completeness/Groundedness still use the Hallucination brief — say that.

## Slide 8 — Cost and next

Mean **~$0.0071 / run** → **~$0.014 / user / day** (2 drafts). 20 PMs ≈ $0.28/day.  
First failure is T9: Gap says NONE, PRD still writes (branch is not a gate).  
Next: gate PRD on NONE; rewrite Completeness judge; Gap → gpt-4o. No fine-tune.

## Slide 9 — Demo pointer

5-minute video: `demo/demo-video-link.md` (record from a signed-in n8n session).
