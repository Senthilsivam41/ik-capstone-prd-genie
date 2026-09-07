# Experiment log

Evaluation loop (Days 9–11). **One change per row.** If a row changes prompt *and* model, it is invalid.

Because models are non-deterministic, **one run proves nothing**. Repeat the same experiment several times; keep the change only if the gain is consistent (session brief, experiment-record slide).

Optimisation levers, cheapest first: (1) prompt (2) model/provider swap (3) architecture (4) config (5) fine-tune.

Baseline = score on the 12-input set *before* the change. New score = after. Holdout: at least T1 (completeness) plus the tests that motivated the change.

| ID | Date | Change made (exactly one) | Baseline | New score | Result | Decision |
|---|---|---|---|---|---|---|
| E1 | 2026-09-05 | Extractor prompt: add rule 8 (vague → list metrics/format/users as UNKNOWN) **and** rule 9 (capacity/latency/API version → `class: NFR`). | T2 Fail `8db374ad`; T7 Fail `9f01fda6` | T2 **Pass** `1fadd877` (lists metrics/format/users UNKNOWN). T7 **Fail** `87076a54` (still no `class: NFR`) | mixed | **Keep rule 8.** Do not treat E1 as done. Next experiment E1b = tighten rule 9 only, re-run T7 only. |
| E1b | 2026-09-05 | Extractor rule 9 only: Constraints section is mandatory when capacity / p95 / API version is stated; each row `class: NFR`. | T7 Fail `87076a54` (no Constraints) | T7 **Pass** `46575316` — three CON rows `class: NFR`; 10,000 / 200ms p95 / v52 exact | pass | **Keep rule 9 (E1b).** T2 and T7 both green. Next: T11 (PRD from T1 extraction), not a new transcript. |
| E5 | 2026-09-06 | Langfuse judges only: Completeness, Hallucination, **and Groundedness** all on **gpt-4o**, generation events, sampling 1. No prompt or n8n graph change. | Groundedness on `gpt-4.1-nano` did not attach. Pre-6-Sep T1–T10 traces have generations but not a reliable 4×3 score set. | T1–T10 re-run 11:25–11:30Z. Each of four generations has H/G/C. Mean cost ~$0.0071. T9 Ext+PRD Hallucination 0.9. | pass (instrumentation) | **Keep gpt-4o judges.** Do not rewrite baseline Pass rows. Next: Q4 from these scores; optional EX after judge-prompt fix. |
| E3 | | | | | | |

Planned first experiments *if* the corresponding failure appears — do not run them speculatively:

| ID | Trigger | Change |
|---|---|---|
| E1 | Invented requirements on T2 / T5 / T9 | Tighten Extractor UNKNOWN rule + one negative example |
| E2 | T3 / T6 resolved instead of flagged | "List both sides, do not recommend" on Extractor and Gap Analyzer |
| E3 | T11 pads Success Metrics or Timeline | PRD Generator: empty → Open Questions only |
| E4 | T4 / T12 paraphrase ACs | Story Breakdown: copy ACs verbatim |

After combining winners, run the full 12 again and record a final row `EX` (combined) — that combined run is allowed to include multiple prior winners, and only then.
