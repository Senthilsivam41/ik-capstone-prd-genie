# Capstone summary — speaker outline

Export this to Google Slides / PowerPoint as `capstone-summary.pptx` before submission. Keep to ~8–10 slides. Problem, approach, outcomes — not a LangFlow tutorial.

## Slide 1 — Title

PRD Genie · NeuronForge · Sendil  
Applied Agentic AI for PMs/TPMs capstone

## Slide 2 — Problem

PMs mine transcripts by hand. PRDs are inconsistent. Notes die in docs.  
**If the AI is wrong:** a hallucinated Must-Have ships to engineering.

## Slide 3 — Approach

Sequential pipeline + one branch.  
Extractor (full) → Gap Analyzer (full) ∥ PRD Generator (mini) → Story Breakdown (mini).  
Diagram: `design/architecture-diagram.svg`

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
One change per experiment.

## Slide 7 — Outcomes *(fill after baseline)*

Pass/fail table T1–T12.  
Cost: $X per run (Langfuse actual).  
One failure → one fix → holdout.

## Slide 8 — Risks and next

Silent commitment, false consensus, template padding.  
Post-capstone: reuse this pipeline as the test subject for AgentLens drift detection.

## Slide 9 — Demo pointer

5-minute video: `demo/demo-video-link.md`
