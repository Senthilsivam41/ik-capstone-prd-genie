# Experiment log

Evaluation loop (Days 9–11). **One change per row.** If a row changes prompt *and* model, it is invalid.

Baseline = score on the 12-input set *before* the change. New score = after. Holdout: at least T1 (completeness) plus the tests that motivated the change.

| ID | Date | Change made (exactly one) | Baseline | New score | Result | Decision |
|---|---|---|---|---|---|---|
| E1 | | | | | | |
| E2 | | | | | | |
| E3 | | | | | | |

Planned first experiments *if* the corresponding failure appears — do not run them speculatively:

| ID | Trigger | Change |
|---|---|---|
| E1 | Invented requirements on T2 / T5 / T9 | Tighten Extractor UNKNOWN rule + one negative example |
| E2 | T3 / T6 resolved instead of flagged | "List both sides, do not recommend" on Extractor and Gap Analyzer |
| E3 | T11 pads Success Metrics or Timeline | PRD Generator: empty → Open Questions only |
| E4 | T4 / T12 paraphrase ACs | Story Breakdown: copy ACs verbatim |

After combining winners, run the full 12 again and record a final row `EX` (combined) — that combined run is allowed to include multiple prior winners, and only then.
