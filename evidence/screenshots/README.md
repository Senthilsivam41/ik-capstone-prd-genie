# Screenshots

Required by the submission pack. Drop files here with these names (or update the README if names differ):

| File | What it must show | Status |
|---|---|---|
| `n8n-canvas.png` | Full n8n graph: Extractor, branch to Gap Analyzer + PRD Generator, Story Breakdown | Expected |
| `pipeline-in-action.png` | A real run: input visible, output visible (ideally T1 or T2) | Expected |
| `langfuse-traces.png` | Trace list or a single trace with per-agent spans and scores | **Present** — see below |

Do not commit mockups. Files are added only after the canvas actually runs.

## `langfuse-traces.png`

Langfuse Tracing view, org `ik-capstone-org`, project `my-capstone-prd-genie` (`cmthhhzzv02wsad0d4qogeznv`, EU). Four rows from the 4 Sep proof run: two `prd-genie-slice1` root observations (22:03:57, 22:00:47 local) each with a nested `Requirement Extractor` generation (22:03:46, 22:00:40). Satisfies criterion 7 in [docs/langfuse-observability-acceptance.md](../../docs/langfuse-observability-acceptance.md).

Two caveats a grader should know:

- The Input column reads `Meeting: Product Planning - Reporting Dashboard…` — this is the long sample transcript, **not** the short graded T1 string. This screenshot is observability evidence, not a T1 pass. T1 stays `Not run` in [baseline-results.md](../baseline-results.md).
- The token and cost columns are scrolled off the right edge. Per-generation tokens (240 in / 395 out / 635 total, $0.00455, `gpt-4o`) are recorded in [baseline-results.md](../baseline-results.md) from the trace detail view; a single-trace screenshot showing those columns is still worth adding.

The file is the unedited host screenshot. Despite the `.png` name required by the acceptance doc, the bytes are JPEG — browsers and GitHub render it regardless, and it was left unmodified rather than re-encoded.
