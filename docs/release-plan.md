# Incremental release plan — PRD Genie

**Rubric lines earned by following this:** Q3 Core 12 · Extended 8 · Observability 5 · Baseline 5 · Cost+eval (+1 when actuals) · Q4 (+3 when findings) · submission pack.  
**Law:** each release leaves the repo **grader-ready for what that slice claims** — importable n8n JSON, README truthful, no invented Pass, secrets out of git.  
**Branch:** one `feature/<kebab>` per release; merge only when the Definition of Done below is green.  
**Course checklist:** which release proves each touch point → [course-touchpoints.md](course-touchpoints.md) (stay on n8n unless a touchpoint is blocked).

## Production-ready means (every release)

| Gate | Required |
|---|---|
| Runnable | `system/workflow.json` imports on IK n8n and runs the slice’s agents |
| Documented | README + this plan’s release row status updated |
| Evidence | New T-rows / traces / screenshots only if **real** (never invented) |
| Secrets | No `.env` / API keys in git |
| Platform named | README says **n8n (IK Cloud) + Langfuse EU** |
| Demo | Only when the release table says so — see [demo/](../demo/) |

Do **not** ship Scope Estimator, synthetic emails, or fine-tune until **R4** is Done (facilitator: extras after the minimum).

---

## Releases

### R0 — Design pack (already Done)

| | |
|---|---|
| **Delivers** | Charter, RAID, ADR-001…005, architecture writeup + PNG, agent prompts, 80-pt rubric law |
| **Pts locked** | Q1 15 + Q2 15 + Design 10 (+ partial Cost 4 + Q4 method 2) |
| **DoD** | Docs in git; no fake baseline Pass |
| **Demo** | None |

### R1 — Observability + Extractor thin slice (**next**)

| | |
|---|---|
| **Branch idea** | `feature/langfuse-setup` → then `feature/extractor-thin-slice` if split |
| **Delivers** | Slice 1 n8n workflow (already drafted): Trigger → InputText → Requirement Extractor (gpt-4o) + **Langfuse path that produces a real trace**; T1 (and/or Transcript 1) output pasted in `evidence/baseline-results.md`; score configs `completeness`, `hallucination`, `groundedness` |
| **Pts unlocked** | Observability **+5** (when acceptance in [langfuse-observability-acceptance.md](langfuse-observability-acceptance.md) passes); start of Core |
| **DoD** | Import works; OpenAI credential selected; **Langfuse EU shows ≥1 trace** with Extractor input/output + tokens; `langfuse-traces.png` optional but preferred; T1 row Pass/Fail from a real run |
| **Demo** | None (pipeline not e2e yet) |

### R2 — Core e2e (PRD + stories)

| | |
|---|---|
| **Delivers** | PRD Generator (gpt-4o-mini) + Story Breakdown (gpt-4o-mini) on the same canvas; T11 then T12 documented; re-export `system/workflow.json` |
| **Pts** | Core **+12** when extract→PRD→stories truly runs end-to-end |
| **DoD** | Template sections present (no padding); T4 ACs verbatim if used; screenshots `n8n-canvas.png` + `pipeline-in-action.png` |
| **Demo** | **Optional dry-run clip** (≤60s) of T1→PRD only — not the graded 5-min yet |

### R3 — Baseline T1–T12 documented

| | |
|---|---|
| **Delivers** | Every ID in `evidence/baseline-results.md` has output + Pass/Fail from real runs |
| **Pts** | Baseline **+5**; Cost table overwrite from Langfuse actuals (**4→5**) |
| **DoD** | No `Not run` left; experiment-log ready for one-change experiments |
| **Demo** | None required |

### R4 — Gap Analyzer branch

| | |
|---|---|
| **Delivers** | Gap Analyzer (gpt-4o) parallel off Extractor; Merge; T2/T3/T5/T6/T9/T10 graded on questions not invented answers |
| **Pts** | Extended **+8** |
| **DoD** | Full graph matches ADR-001/004; canvas screenshot updated |
| **Demo** | **Release gate: graded 5-min demo** — see below |

### R5 — Reflection + submission pack

| | |
|---|---|
| **Delivers** | Q4 findings from traces; slides `.pptx`; RAID closed items; final JSON export |
| **Pts** | Q4 **2→5**; pack complete |
| **DoD** | Public repo checklist in [rubric-evaluation.md](rubric-evaluation.md) all Pass |
| **Demo** | Demo already in repo from R4; refresh if UI changed |

---

## Demo video (graded pack)

**Intent (2 Sep clarification from author):** record the **working application** and put a **small video in the git repo**. External Loom/YouTube remains optional backup.

| Item | Rule |
|---|---|
| **First required in** | **R4** (full Extractor → PRD → stories + Gap + Langfuse visible) |
| **Primary file** | `demo/prd-genie-demo.mp4` (or `.webm` / `.mov`) — ≤ **5:00**, prefer **&lt; 25 MB** |
| **Pointer** | Always update [demo/demo-video-link.md](../demo/demo-video-link.md) with path + optional URL |
| **GitHub limits** | Soft warn &gt;50 MB; hard block **100 MB**. If over ~25 MB: compress, or use Git LFS, or host unlisted + keep link in `demo-video-link.md` and a 10–20s teaser in-repo |
| **gitignore** | Do **not** ignore `demo/prd-genie-demo.*`. Ignore only bloated locals: `demo/*.mov.raw`, `demo/raw/` |
| **Must show** | Transcript in → extraction → PRD → stories → Gap on T2/T5 → Langfuse trace with per-agent spans |

Earlier course note said “link only.” **Reconcile:** prefer **small in-repo video**; keep URL field for overflow or secondary share. Graders cloning the repo should see `demo/` without chasing Drive permissions.

---

## One-change experiment rule (after R3)

`evidence/experiment-log.md`: one prompt/model/config change per row; repeat; keep only if gain is consistent. Never experiment before T1 is green.
