# Q4 Reflection — PRD Genie

**Status:** Design-time reflection. Trace findings and the improvement plan will be filled after the 12-input baseline (charter Days 9–11). Submitting this section with invented scores would fail the assignment.

## What this page will prove

Q4 is 15 points in the session brief / 5 points in the problem-statement PDF — either way it is scored on (1) what traces showed, (2) a concrete improvement plan, (3) risks of AI-generated PRDs, (4) connection to evaluation skills from weeks 6–7.

## Trace findings (to complete after baseline)

Langfuse traces are not yet available. The evaluation method is locked so findings are comparable:

- Pull every failing trace in full (input, per-agent output, tool/LLM spans).
- Open-code the **first** failure in the chain — later agents will look wrong if extraction already hallucinated.
- Axial-code into the dataset's own labels: vague (T2), contradictory (T3, T6), incomplete (T5), edge-case (T9), dependency (T10), padding (T11 sections with no source), AC drift (T4, T12).
- Record tokens, latency, and scores (completeness / hallucination / groundedness) per agent, not just end-to-end.

| Test | Failure mode the dataset is probing | Trace note (fill after run) |
|---|---|---|
| T1, T7, T8 | Completeness on fully-specified input | |
| T2, T5, T9 | Must NOT invent; must flag UNKNOWN | |
| T3, T6 | Must surface contradiction; must not pick a side | |
| T4, T12 | Acceptance criteria / stories stay verbatim | |
| T10 | Feature + dependency + unknown ETA as risk | |
| T11 | Template completeness; only T1 content | |

## Improvement plan (process, then results)

The loop is the one from class: one change per experiment, logged in `evidence/experiment-log.md`.

Planned first experiments, in order, **if** the corresponding failure appears:

| ID | If we see… | Change (exactly one) | Holdout |
|---|---|---|---|
| E1 | Invented requirements on T2/T5/T9 | Tighten Extractor "UNKNOWN" rule + add a negative example | Re-run T1 (must not regress completeness) |
| E2 | T3/T6 resolved instead of flagged | Add explicit "list both sides, do not recommend" to Extractor and Gap Analyzer | Re-run T1, T4 |
| E3 | T11 pads Success Metrics / Timeline | PRD Generator: empty sections → Open Questions only | Re-run T11 + T4 |
| E4 | T4/T12 paraphrase ACs | Story Breakdown: "copy acceptance criteria verbatim" | Re-run T12 + T8 |

Do not upgrade the mini-tier model until E1–E4 are tried. Model upgrades confound prompt diagnosis (ADR-003).

## Risks of AI-generated PRDs

These are design-time risks, already in the RAID log. Traces will confirm, split, or retire them.

1. **Silent commitment.** A "John mentioned something about real-time" becomes a Must-Have NFR. Engineering estimates against fiction. Worse than messy notes, which at least look unfinished.
2. **False consensus.** T3 and T6 contain disagreements. A fluent PRD that picks Priya over Kevin (or Engineering over Design) launders a political decision as a requirement.
3. **Template-driven hallucination.** Empty Success Metrics and Timeline are the easiest sections to invent because the template *asks* for them.
4. **AC drift.** T4's PDF-logo and CSV-formula criteria are the canary. If stories paraphrase them, every later story is untrustworthy.
5. **Cost of re-runs.** Stateless full-pipeline re-runs after clarification are the HITL substitute. If traces are not cheap (split-model, ADR-003), PMs will skip the second run and ship the first hallucinated draft.

## Connection to evaluation skills

Week 6 taught that agent failures are judgment flaws, not crashes — traces look like 200 OKs with plausible text. PRD Genie is that lesson applied: the product *is* the plausible text. Langfuse is mandatory because reading the final markdown cannot tell you which agent invented the Q3 deadline vs which one copied it. Open/axial coding on this 12-row set is small enough to saturate by hand; that is the point of the capstone dataset.

The 30 Aug kickoff also flagged a production habit to carry forward after submission: log a short **reason** next to each stated/ambiguous tag so a reviewer can check the reasoning against NeuronForge constraints without re-reading the transcript. That explanation step is not in v1 prompts yet; it is the first post-baseline addition if traces show "correct-looking tags with wrong justification."

## After traces exist

Replace the empty column in the table above, paste 3–5 Langfuse screenshots into `evidence/screenshots/`, write E1+ rows with real before/after scores, and keep this page to one page of *findings* plus the risks section. Do not leave this preamble in the submitted PDF.
