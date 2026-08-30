# PRD Genie — Q1 Ideation & Q2 Programme Charter
NeuronForge Technologies | Applied Agentic AI for PMs/TPMs Capstone
Author: Sendil | Draft v0.1

Related: [Official rubric — 80 pts](rubric.md) · [RAID log](raid-log.md) · [ADRs](adr/) · [Architecture writeup](architecture-writeup.md) · [Reflection](reflection.md)

**Scoring (PRD Genie only):** Q1 Ideation 15 · Q2 Charter 15 · Q3 Build 45 · Q4 Reflection 5 · **Total 80**. Not the 100-point CalendarMate/Mira split.

---

## Q1: Ideation (15 pts)

Pain points identified in NeuronForge's PM/TPM workflow, based on the problem statement and the sample transcripts/notes provided.

### Pain Point 1 — Requirements scattered across unstructured meeting discussion
- **Manual step today:** PM manually re-listens to or re-reads meeting transcripts (e.g., the Reporting Dashboard planning meeting with Sarah/Raj/Lisa) and hand-picks out requirements, owners, and deadlines buried in conversational back-and-forth.
- **Agent solution:** Requirement Extractor Agent — parses raw transcript/notes text, extracts feature requests, constraints, stakeholders, and deadlines; explicitly separates *stated* facts from *ambiguous or assumed* ones.
- **Input / Output:** Input: transcript or notes (plain text). Output: structured list of requirements with `stated` vs `ambiguous` tags, named owners, and deadlines where present.
- **Risk:** Agent treats an assumption or a "maybe" as a firm requirement (e.g., Transcript 5's "John mentioned something about real-time... need to check" must not become a committed real-time requirement). This is the single biggest scored risk in the baseline dataset (T2, T5, T9 all test for this).

### Pain Point 2 — Inconsistent PRD formats across PMs, slowing engineering estimation
- **Manual step today:** Each PM drafts PRDs in their own structure/voice, so engineering has to re-interpret format each time before estimating.
- **Agent solution:** PRD Generator Agent — takes extracted requirements and maps them into the standard `prd_template.md` structure (overview, goals, personas, functional/non-functional requirements, acceptance criteria, assumptions, open questions).
- **Input / Output:** Input: structured requirements from the Extractor. Output: a PRD document following the fixed template, every section populated only from extracted data.
- **Risk:** Agent pads out template sections it has no grounded data for (e.g., inventing success metrics or a timeline that was never discussed) rather than leaving them as open questions.

### Pain Point 3 — Manual, iterative breakdown of PRDs into epics/stories
- **Manual step today:** PM or TPM manually re-reads the finished PRD and hand-writes epics, features, and user stories with priority calls, often iterating several times with engineering.
- **Agent solution:** Story Breakdown Agent — converts PRD feature list into Epics → Features → User Stories in "As a [persona], I want..." format, with Must/Should/Nice-to-have priority suggestions.
- **Input / Output:** Input: finished PRD (e.g., T11's output feeding T12). Output: structured story list with priorities, traceable back to specific PRD requirements.
- **Risk:** Stories drift from the source PRD's acceptance criteria (T4 specifically tests that PDF-logo and CSV-formula acceptance criteria carry through verbatim, not paraphrased or expanded).

### Pain Point 4 — Valuable requirements lost in notes nobody revisits
- **Manual step today:** Stakeholder interview notes (e.g., Raj's API performance concerns, Nina's multi-tenant/white-labeling asks) sit in documents that never get cross-referenced against active PRDs, so real constraints surface late — often after engineering has already started building.
- **Agent solution:** Same Extractor/Gap Analyzer pair, applied to stakeholder notes as a second input type alongside transcripts — flags cross-cutting constraints (e.g., Raj's "don't hammer the database" note vs. a real-time refresh requirement elsewhere) as contradictions needing resolution.
- **Input / Output:** Input: stakeholder notes (unstructured, incomplete by design — see `stakeholder_notes.txt`). Output: extracted constraints + a contradiction/gap list surfaced *before* PRD generation, not after.
- **Risk:** Agent silently drops a stakeholder's constraint because it wasn't phrased as a formal requirement (e.g., Tom's undefined churn-prediction ask, which has no data source or accuracy bar specified) — silently losing it is worse than the manual process, since a human reviewer would at least ask about it.

---

## Q2: Programme Charter (15 pts)

### Vision
PRD Genie turns NeuronForge's scattered meeting transcripts, product briefs, and stakeholder notes into consistently structured, traceable PRDs and user stories — cutting PM/TPM documentation time while making every requirement explicitly traceable to something a stakeholder actually said, not something the tool assumed.

### Objectives
1. Reduce PM/TPM time spent converting meeting discussion into a first-draft PRD.
2. Standardize PRD format across all PMs/TPMs so engineering estimation doesn't require re-interpreting structure each time.
3. Surface ambiguity and contradictions *before* they reach engineering, rather than after a sprint has already started on a misread requirement.
4. Keep a measurable hallucination rate low enough that PMs can trust the first draft as a real starting point, not something requiring a full rewrite.

### Scope
**In scope (core, mandatory):**
- Requirement Extraction (stated vs. ambiguous separation)
- PRD Generation (fixed template compliance)
- Epic / User Story Breakdown (with priority suggestions)

**In scope (extended — one selected):**
- **Gap Analyzer.** Chosen over Scope Estimator because 6 of the 12 baseline test cases (T2, T3, T5, T6, T9, T10) specifically test the system's ability to detect vagueness, contradiction, or missing information rather than generate more content — Gap Analyzer directly reinforces and is graded by that same failure mode, rather than adding an unrelated capability.

**Out of scope for this capstone:**
- Fine-tuning the Extractor (optional, deferred)
- RAG over past PRDs (optional, deferred — noted as a natural follow-on once a PRD corpus exists)
- Human-in-the-loop approval UI (optional; will be simulated as a manual review checkpoint in the writeup rather than built)
- Live integrations (Jira/Confluence export, Google Docs) — output stays as Markdown per the template

### Success Criteria
Two families of metric, per the course's evaluation framework — technical/AI metrics and business metrics:

**Technical / AI metrics:**
1. **Extraction completeness** — % of stated requirements in the baseline dataset correctly captured (target: 100% on T1, T4, T7, T8 — the fully-specified cases).
2. **Hallucination rate** — % of PRD items not traceable to source transcript/notes (target: 0% across all 12 baseline tests; this is the primary trust metric).
3. **Format compliance** — % of generated PRDs that follow every section of `prd_template.md` with no missing sections.

**Business metric:**
4. **PM drafting time saved per PRD** — estimated manual hours to hand-draft a PRD of equivalent detail vs. time to review/edit PRD Genie's output. Subjective but ties the capstone back to why NeuronForge would fund this.

### Timeline (compressed 2-week capstone cadence)
| Phase | Activity |
|---|---|
| Days 1–2 | Discovery/BRD, tool selection, architecture design (this document + Q3 design) |
| Days 3–5 | Thin slice: Requirement Extractor working end-to-end on one transcript (Transcript 1) |
| Days 6–8 | Add PRD Generator + Story Breakdown; connect observability early |
| Days 9–11 | Run full 12-input baseline dataset; evaluation-optimization loop (find failure → fix prompt → re-test) |
| Days 12–13 | Add Gap Analyzer (extended capability); re-run baseline |
| Day 14 | Cost analysis, demo video, writeup, submission pack |

### RAID Log
Named deliverable — Risks, Assumptions, Issues, Dependencies.

**Risks**
| Risk | Mitigation |
|---|---|
| Extractor invents requirements on vague/incomplete input (T2, T5, T9) | Explicit "if input is too vague to determine X, say UNKNOWN — do not invent X" rule in every agent prompt |
| Contradictions (T3, T6) get silently resolved in one direction instead of flagged | Prompt rule: never favor one stakeholder's position; always surface tension explicitly |
| PRD Generator pads template sections with no grounded data | Rule: empty sections stay under "Open Questions," never auto-filled |
| Cost overrun from re-running long transcripts through multiple agents | Track token usage per agent from day 1 via observability; use cheaper model for extraction, reserve stronger model for PRD generation |
| Scope creep into optional capabilities (fine-tuning, RAG) before core is solid | Core 3 capabilities + baseline dataset must pass before touching Gap Analyzer |

**Assumptions**
- The 12-input baseline dataset (`eval_prdgenie_inputs.txt`) is treated as ground truth — it was provided by the course, not generated by the pipeline being evaluated.
- LangFlow's file/text input nodes can batch-run all 12 baseline inputs without custom scripting.
- Langfuse free tier is sufficient for trace volume across a 2-week build.

**Issues**
- None open yet — log populated as they arise during build (Days 3+).

**Dependencies**
| Dependency | Owner | Status | Risk |
|---|---|---|---|
| LangFlow platform access/setup | Sendil | Not started | Low |
| Langfuse account + API keys | Sendil | Not started | Low |
| Model API access (Claude/GPT-4o + mini tier) | Sendil | Not started | Low |

### ADR Index (planned)
Following the same practice used on AgentLens (ADR-007, ADR-008...) — short decision records, one per major technical choice, kept in the repo alongside the workflow JSON:
- **ADR-001**: Orchestration pattern — Sequential Pipeline over Router/Hierarchical
- **ADR-002**: Extended capability — Gap Analyzer over Scope Estimator
- **ADR-003**: Split-model design — full-tier LLM for Extractor/Gap Analyzer, mini-tier for PRD Generator/Story Breakdown
- **ADR-004**: Gap Analyzer placement — **decided**: immediately after Requirement Extractor, running in parallel with PRD Generator (branching off the Extractor's output), rather than the course's suggested placement after Story Breakdown. Rationale: catching ambiguity before PRD generation prevents an unresolved gap from propagating through two more transformation steps (PRD → stories) before being flagged; earlier detection is strictly cheaper to fix and lower-risk.

### Architecture Diagram
Sequential pipeline with one branch point:

```
Transcript / brief / notes (input)
        ↓
Requirement Extractor — stated vs ambiguous
        ↓                              ↓
  Gap Analyzer                   PRD Generator — fills template, grounded
  (flags gaps, asks Qs)                 ↓
        ↓                       Story Breakdown — epics, stories, priority
Clarification questions                ↓
                                PRD + user stories (markdown, per template)
```

Color coding (for the submitted diagram): full-tier reasoning agents (Extractor, Gap Analyzer) in one color; mini-tier mechanical agents (PRD Generator, Story Breakdown) in a second color; input/output boundaries in neutral gray — visually reinforcing the split-model tool selection.

**Post-clarification loop-back (manual, by design):** Clarification Questions is a terminal output for this capstone, not a resumable branch — Human-in-the-Loop is explicitly out of scope for the build (Q2 Scope: simulated in the writeup, not implemented). The PM reviews the questions offline, gets answers from stakeholders, and appends them to the source transcript/notes. The updated input is then **re-run through the pipeline from the Requirement Extractor as a fresh run** — never resumed mid-trace. This keeps the pipeline stateless and ensures the Extractor's stated-vs-ambiguous judgment always runs against the complete picture, not a partial trace plus a bolted-on answer.

### Experiment Log Template
Used during the Step 6 evaluation loop (Days 9–11). One row per change — never change more than one thing at a time.

| ID | Change made | Baseline | New score | Result | Decision |
|---|---|---|---|---|---|
| E1 | *(e.g., add explicit "do not invent" rule to Extractor prompt)* | | | | |

### Stakeholders
- **PM/TPM (Sendil)** — product owner, prompt design, evaluation
- **Engineering personas represented in test data** (Raj, Mike) — represented via transcript/notes content, not live collaborators for this capstone
- **Design personas** (Lisa) — same, represented via input data
- **TA / Course evaluator** — grades against baseline dataset and rubric

### Rollout Plan
1. Validate against the 12-input baseline dataset (all core + extended capabilities).
2. Record 5-minute demo video showing a full run: transcript in → PRD out → stories out → Gap Analyzer flags on an ambiguous input.
3. Submit as capstone; post-submission, reuse the working pipeline as a real test subject for AgentLens's drift-detection and evaluation tooling.

---

## Q3 (partial): Tool Selection Table

Locked for the architecture writeup. All inputs are file/text uploads only — no OAuth, no live API integration required.

| Category | Choice | Why |
|---|---|---|
| **Workflow Platform** | LangFlow | Purpose-built for chaining distinct-prompt LLM agents in a fixed sequence (Extractor → PRD Generator → Story Breakdown → Gap Analyzer); no file-upload/OAuth friction since every input is plain text; course materials explicitly pair LangFlow with PRD Genie |
| **LLM — Requirement Extractor** | Claude or GPT-4o (full tier) | Highest-stakes reasoning step — stated-vs-ambiguous judgment and contradiction detection are graded directly on 6 of 12 baseline tests (T2, T3, T5, T6, T9, T10); a mini-tier model under-reasons here |
| **LLM — PRD Generator** | GPT-4o-mini / 4.1-mini | Mechanical restructuring of already-extracted, already-grounded data into the fixed template — low judgment risk once extraction is solid |
| **LLM — Story Breakdown** | GPT-4o-mini | Same profile as PRD Generator — fixed-format transformation, not open-ended reasoning |
| **LLM — Gap Analyzer** | Claude or GPT-4o (full tier) | Same risk profile as the Extractor — re-reasons over ambiguity/missing info, needs equivalent judgment quality |
| **Document Ingestion** | LangFlow file/text input nodes | All provided inputs are plain `.txt`/`.md`; no PDF OCR or CSV reshaping needed |
| **Observability** | Langfuse | Enables the open-coding/axial-coding failure-analysis workflow from class, which maps directly onto the dataset's built-in failure categories (vague, contradictory, incomplete, edge-case, dependency) |
| **Output / Export** | Markdown, matching `prd_template.md` | No Google Docs/Notion export complexity the rubric doesn't require |
| **Authentication** | None | File-upload-only pipeline; no OAuth2 or API keys needed |

**Cost rationale (feeds Q3 cost analysis):** split-model design — 2 of 4 agents on the cheap tier — keeps average cost per run down while spending the reasoning budget only where the baseline dataset actually tests judgment (extraction and gap analysis), not formatting.
