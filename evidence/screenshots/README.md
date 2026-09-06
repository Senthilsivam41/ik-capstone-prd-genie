# Screenshots

Required by the submission pack. Drop files here with these names (or update the README if names differ):

| File | What it must show | Status |
|---|---|---|
| `n8n-canvas.png` | Full n8n graph: Extractor, branch to Gap Analyzer + PRD Generator, Story Breakdown | Expected |
| `pipeline-in-action.png` | A real run: input visible, output visible (ideally T1 or T2) | Expected |
| `langfuse-traces.png` | Trace list or a single trace with per-agent spans and scores | **Present** — 4 Sep proof (see below) |
| `langfuse-dashboard-traces-scores.png` | Home: 11 `prd-genie-slice1` traces, $0.08, 297 H/G/C scores | **Present** — 6 Sep T1–T10 window |
| `langfuse-dashboard-cost.png` | Home: observations + gpt-4o / gpt-4o-mini cost | **Present** — same window |
| `langfuse-dashboard-latency-agents.png` | Home: H/G/C moving average + named generations | **Present** — same window |
| `langfuse-scores-completeness-groundedness.png` | Analytics: Completeness vs Groundedness (99 each) | **Present** — same window |
| `langfuse-scores-hallucination-groundedness.png` | Analytics: Hallucination vs Groundedness (99 each) | **Present** — same window |

Do not commit mockups. Files are added only after the canvas actually runs.

## `langfuse-traces.png`

Langfuse Tracing view, org `ik-capstone-org`, project `my-capstone-prd-genie` (`cmthhhzzv02wsad0d4qogeznv`, EU). Four rows from the 4 Sep proof run: two `prd-genie-slice1` root observations (22:03:57, 22:00:47 local) each with a nested `Requirement Extractor` generation (22:03:46, 22:00:40). Satisfies criterion 7 in [docs/langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md).

Two caveats a grader should know:

- The Input column reads `Meeting: Product Planning - Reporting Dashboard…` — this is the long sample transcript, **not** the short graded T1 string. This screenshot is observability evidence, not a T1 pass. T1 stays `Not run` in [baseline-results.md](../baseline-results.md).
- The token and cost columns are scrolled off the right edge. Per-generation tokens (240 in / 395 out / 635 total, $0.00455, `gpt-4o`) are recorded in [baseline-results.md](../baseline-results.md) from the trace detail view; a single-trace screenshot showing those columns is still worth adding.

The file is the unedited host screenshot. Despite the `.png` name required by the acceptance doc, the bytes are JPEG — browsers and GitHub render it regardless, and it was left unmodified rather than re-encoded.

## 6 Sep 2026 — T1–T10 dashboard and score analytics

Unedited Langfuse EU screenshots from the same “Past 30 min” window as the re-scored traces (11:25–11:30Z / ~16:53–17:03 IST). Project `my-capstone-prd-genie`, org `ik-capstone-org`. These are **dashboard / Analytics** views, not a single-trace 4×3 generation table. Per-generation H/G/C values stay in [baseline-results.md](../baseline-results.md#per-agent-judge-re-score-6-sep-2026).

| File | What a grader sees |
|---|---|
| `langfuse-dashboard-traces-scores.png` | 11 `prd-genie-slice1` traces; $0.08 (gpt-4o $0.07 / 10.07K tok, gpt-4o-mini ~$0 / 11.34K tok); 297 scores = 99 each of Hallucination (mean 0.17), Groundedness (0.15), Completeness (0.12); 55 observations |
| `langfuse-dashboard-cost.png` | Observations-by-time + cost-by-model: gpt-4o **$0.07421**, gpt-4o-mini **$0.003858** |
| `langfuse-dashboard-latency-agents.png` | H/G/C moving averages; named generations PRD Generator, Story Breakdown, Gap Analyzer; `prd-genie-slice1` p50 ~13.65s |
| `langfuse-scores-completeness-groundedness.png` | Analytics compare, n=99 each, Completeness mean 0.12 / Groundedness 0.15 |
| `langfuse-scores-hallucination-groundedness.png` | Analytics compare, n=99 each, Hallucination mean 0.17 / Groundedness 0.15 |

Dashboard means are judge averages over observations in the window, not “% of T-rows failed.” Q4 already treats Completeness as a mixed brief.
