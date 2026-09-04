# Business Requirements Document — PRD Genie

NeuronForge Technologies · Applied Agentic AI for PMs/TPMs Capstone
Author: Sendil · v1.0 · 4 Sep 2026

**Rubric line:** Q1 Ideation / business case (15 pts), supporting Q2 Charter (15 pts). See [rubric.md](rubric.md).
**Related:** [Programme charter](charter.md) · [Architecture writeup](architecture-writeup.md) · [RAID log](raid-log.md) · [ADRs](adr/) · [Release plan](release-plan.md)

## 1. Purpose and how this differs from the charter

This document states **why NeuronForge would fund PRD Genie and what "working" means in business terms**: the problem, who is affected, what outcomes we are buying, where the boundaries sit, and the rules the system must obey regardless of how it is built.

The [charter](charter.md) is the programme-management artifact — vision, timeline, RAID, ADR index, rollout. The [architecture writeup](architecture-writeup.md) is the technical design. This BRD is the layer above both: it is the thing the charter is executing against, and the thing an ADR has to stay consistent with. Where the two overlap (scope, risk), the BRD states the business intent and the charter states the plan to deliver it.

Business rules in §7 are the durable commitments. Several were settled in a design review on 2–3 Sep 2026 and are recorded here because they constrain the product, not just the build.

## 2. Business context and problem

NeuronForge's PMs and TPMs produce PRDs by hand from meeting transcripts, product briefs, and stakeholder notes. Four costs follow from that, each mapped to a pain point in [charter §Q1](charter.md#q1-ideation-15-pts):

1. **Requirements are buried in conversation.** A PM re-reads a transcript and hand-picks features, owners, and deadlines out of conversational back-and-forth. The work is slow and the result depends on who did the reading.
2. **PRD format varies by author.** Engineering re-interprets structure before it can estimate, so inconsistency taxes every downstream estimate rather than just the drafting step.
3. **Breaking a PRD into epics and stories is a second manual pass**, usually iterated with engineering.
4. **Notes nobody revisits lose real constraints.** Stakeholder concerns raised outside a formal requirement (a performance worry, a multi-tenant ask) surface late — often after engineering has started building against a PRD that never mentioned them.

**The failure mode that defines this product.** A tool that produces a fluent PRD containing a requirement nobody committed to is *worse than the manual process*, because it looks finished. A "maybe" promoted to committed scope, a fabricated success metric, or a contradiction silently resolved in one direction will be read as agreed and estimated against. This is why reliability, not speed, is the primary quality attribute (BR-1).

## 3. Stakeholders

| Stakeholder | Interest in PRD Genie | What a bad outcome costs them |
|---|---|---|
| **PM / TPM** (primary user) | First-draft PRD and stories they can edit rather than write | Rewriting a plausible-but-wrong draft costs more than drafting from scratch |
| **Engineering** | Consistent template; requirements traceable to something a stakeholder said | Estimating and building invented scope |
| **Design** | Their constraints survive into the PRD rather than being dropped | Late rework when a dropped constraint resurfaces |
| **Business / product leadership** | Faster time from discussion to a reviewable spec, at a defensible cost | Funding a tool whose output still needs a full rewrite |
| **Course evaluator (capstone)** | Rubric evidence: architecture justified, guardrails proven, baseline documented from real traces | — |

Engineering, design, and business stakeholders are represented in the capstone through the course-provided transcripts and notes (Sarah, Raj, Lisa, Nina, Tom, Mike), not as live collaborators.

## 4. Business objectives

| # | Objective | Why it is a business outcome, not a feature |
|---|---|---|
| BO-1 | Cut PM/TPM time from meeting to reviewable first-draft PRD | The drafting hours are the direct cost being removed |
| BO-2 | Standardise PRD structure across all authors | Removes re-interpretation cost from every engineering estimate |
| BO-3 | Surface ambiguity and contradiction **before** engineering commits | Moves rework from post-sprint to pre-sprint, where it is cheapest |
| BO-4 | Keep untraceable content at zero so a first draft is trustworthy | Trust is the adoption gate; without it PMs revert to manual drafting |
| BO-5 | Keep per-draft cost low enough to be uncontroversial to run | Removes cost as an objection to team-wide rollout |

## 5. Success measures

Targets below are the measurement definitions. **No result is recorded here until it comes from a real run** — baseline outcomes live in `evidence/baseline-results.md` and are all unrun at the time of writing.

**Quality (primary):**
- **Groundedness / hallucination rate** — share of output items with no traceable evidence in the source input. Target 0% across the 12 baseline inputs. This is the adoption gate (BO-4).
- **Extraction completeness** — share of stated requirements captured, measured on the fully-specified baseline inputs (T1, T4, T7, T8), target 100%.
- **Format compliance** — share of generated PRDs containing every template section, with unsupported sections left as open questions rather than padded.
- **Ambiguity handling** — on the vague, contradictory, incomplete and dependency inputs (T2, T3, T5, T6, T9, T10), the system produces clarification questions and UNKNOWN markers rather than invented answers.

**Cost:** measured as `tokens × price × expected daily volume`, expressed per user per day. The current a-priori estimate is **~$0.022 per full run**, ~$0.044 per PM per day at two drafts, ~$10/month for a team at 20 drafts/day. Method and table: [architecture-writeup.md](architecture-writeup.md#cost-analysis-a-priori--replace-with-langfuse-actuals-after-baseline). To be replaced with observed actuals.

**Business value:** PM drafting time saved per first-draft PRD — manual hours to hand-write an equivalent draft versus hours to review and edit generated output. **Baseline value: UNKNOWN.** No measured hours-per-PRD figure exists for NeuronForge; nothing in this document is estimated from one, and no revenue, headcount, or hours-saved figure is asserted anywhere here.

So that delivery is not blocked on a measurement we have not taken, one **stated planning assumption** stands in its place, clearly labelled as such:

> **Planning assumption (unvalidated — not evidence).** A first-draft PRD of the detail PRD Genie targets is assumed to take a PM in the order of **4–8 hours** of hands-on drafting. This is an industry-typical working range used only for sizing the opportunity and sanity-checking the cost model; it is **not measured at NeuronForge**, carries no evidentiary weight, and no benefit claim, business case, or rubric answer may cite it as a result. Registered as **A7** in the [RAID log](raid-log.md#assumptions).

**How it gets validated (the method, not a result).** Time a PM drafting one PRD unaided from a real transcript, then time the same PM reviewing and editing a PRD Genie draft of that same transcript to the same standard of "ready to share." The difference is the metric; a handful of paired runs across different PMs and input types is enough to replace the assumption with a measured figure. Until that is run, the baseline stays UNKNOWN and OQ-2 (§10) stays open.

## 6. Scope boundaries

**In scope — core.** Requirement extraction that separates stated fact from ambiguity; PRD generation against the fixed template; breakdown into epics, features, and user stories with priority suggestions.

**In scope — extended.** Gap analysis: detecting vagueness, contradiction, missing information, and dependency risk, and returning these as clarification questions. Chosen over scope estimation because half the baseline inputs already grade this exact capability ([ADR-002](adr/ADR-002-extended-capability.md)).

**In scope — both directions of the workflow.** Creating a new PRD from fresh input, and updating an existing PRD from new input, are the same capability (BR-6).

**Out of scope for the capstone**, each with the business reason:

| Excluded | Reason |
|---|---|
| In-product human-in-the-loop wait/resume | Review is simulated as an offline PM checkpoint (BR-3); building a stateful approval loop is a roadmap item, not a capstone requirement |
| Automatic project/PRD classification of incoming input | Ships only after the core capability and baseline are proven (BR-8); the graded path uses explicit context (BR-7) |
| Live integrations (issue tracker, wiki, docs export) | Output stays as Markdown; integration adds no rubric value and real delivery risk |
| Retrieval over a historical PRD corpus | No corpus exists yet; a natural follow-on once PRD Genie has produced one |
| Model fine-tuning | Forbidden until core capability and the full baseline exist; a prompt fix is always the cheaper first lever |
| Scope estimation, competitor analysis, additional input types (emails, tickets, chat) | Permitted by the facilitator only *after* the minimum is complete; premature addition is the scope-creep risk in the [RAID log](raid-log.md) (R5) |

## 7. Business rules

These are binding on any implementation. Rules BR-1 to BR-12 were confirmed in the 2–3 Sep 2026 design review. BR-13 stands as written; **BR-14 was added on 4 Sep 2026** when OQ-1 was decided (§10).

**BR-1 — Reliability is the primary non-functional requirement.** A fluent but wrong PRD is a **failed run**, not a partial success. Quality takes precedence over speed and over cost. If derived detail is inaccurate, the tool has no value, because a PM cannot tell a wrong line from a right one without re-reading the source — which is the work the tool was bought to remove.

**BR-2 — Vague input produces UNKNOWN and a clarification request, never an invention.** Clear requirements still flow through to the PRD; unclear ones are explicitly called out rather than smoothed over. Where even the domain expert cannot answer a clarification, that item is recorded as **out of scope** — an explicit, agreed exclusion — not guessed at.

**BR-3 — Human review is a mandatory step in the workflow, simulated for the capstone.** The system emits a clarification report; the PM obtains answers offline; the corrected input is re-submitted and processed from the start. Runs are stateless — there is no partial resume. In-product wait-and-resume is a post-capstone roadmap item, and its absence does not weaken BR-2: a run that needs answers says so.

**BR-4 — Gaps are detected before content is rewritten.** Gap analysis runs on the extracted requirements, alongside PRD generation rather than after story breakdown ([ADR-004](adr/ADR-004-gap-analyzer-placement.md)). Business reason: every rewrite of an unresolved ambiguity is another chance to bake it in silently, and the cost of resolving it rises at each step.

**BR-5 — Contradictions are captured, never silently resolved.** Where two stakeholders state incompatible things, the system records both and raises a clarification question. It does not pick a side, average them, or select the more recent statement. Deciding between stakeholders is a human authority the tool does not have.

**BR-6 — One pipeline serves both new PRDs and PRD updates.** Creating from scratch and revising an existing document are the same capability with different inputs, not two products.

**BR-7 — The graded and default path uses explicit project/PRD context.** Input arrives with the project or PRD it belongs to already identified (or, for baseline inputs, in a single-context setting). Automatic classification is not on this path.

**BR-8 — Automatic project/PRD classification ships only after core capability, baseline, and gap analysis are proven** (after release R4 in the [release plan](release-plan.md)). Adding a classification step before the graded capability works would put an unscored guess in front of every run.

**BR-9 — Classification confidence comes from a registry match, not from the model's self-report.** When classification does ship, the score derives from matching against a maintained registry of known project and product identifiers and their aliases — an exact alias match being the strongest signal, with fuzzy and embedding-based matching as fallback. A model's own stated confidence number is not acceptable evidence, because it is not calibrated and cannot be audited.

**BR-10 — Below a 95% match, the run is queued for PM confirmation and never linked on a guess.** If classification does not reach ≥95% registry-match confidence, the item goes to an **`unclassified` queue** and the PM is notified (email, chat, or task) to confirm which project or PRD it belongs to. The run does **not** proceed to PRD generation against a guessed project. Once the PM confirms, processing continues with that explicit context. Linking requirements to the wrong project is a silent, high-cost error — it corrupts a PRD that nobody was reviewing. Input that legitimately spans two products (for example, a comparison discussion) is *expected* to land in this queue; that is correct behaviour, not a defect.

**BR-11 — A production update run is given the new input together with the prior PRD or extraction**, so changes are assessed as a difference against known scope rather than as a fresh document. Graded baseline rows remain single fresh inputs.

**BR-12 — When a prior PRD and new input conflict, neither wins automatically.** Recency does not confer authority and neither does the existing document. The conflict becomes a clarification item, resolved by the PM, after which the input is re-run (BR-3). This is BR-5 applied across time rather than across stakeholders.

**BR-13 — A release is production-ready only on real evidence.** Each release slice is complete when its evaluation rows are green **from real observability traces**, with evidence recorded at the time each row is run rather than scored in a batch afterwards. Invented results, traces, or screenshots are not permitted at any point. This is a business rule because the entire value proposition (BR-1) rests on the evidence being real; a fabricated Pass makes every other measure meaningless.

**BR-14 — Zero untraceable items is a hard release blocker, not a logged known gap.** Any requirement, acceptance criterion, metric, or constraint that a release slice emits **must carry a supporting evidence quote from the source input**. A single item that cannot be traced back to something a stakeholder actually said or wrote **blocks that release** — it is not recorded as a known gap and shipped behind a caveat. The bar is enforcement, not reporting. Business reason: reliability is the key non-functional requirement (BR-1), and if the derived detail is not accurate the tool has no use — a PM who must verify every line against the transcript is doing the work PRD Genie was funded to remove. A "known gap" notice does not help, because the reader cannot tell *which* line is the ungrounded one without re-reading the source. This gate is stricter than the rubric requires, and that is deliberate. Operationally it is enforced at the release gate in the [release plan](release-plan.md#production-ready-means-every-release); it is the enforcement arm of BR-13, which governs whether the *evidence* is real, where BR-14 governs whether every *output item* has any.

## 8. Assumptions and constraints

**Assumptions** (the full register with failure consequences is in the [RAID log](raid-log.md)):
- The 12-input baseline dataset is course-provided ground truth and is never generated or amended by the system being evaluated. If this fails, every score is invalid.
- Inputs are plain text — transcripts, briefs, and notes. No document parsing, OCR, or spreadsheet handling is required.
- Clarification output is terminal for the capstone; a resumable loop would require stateful architecture (deferred, BR-3).
- The capstone is scored out of **80 points**, confirmed as intentional by the facilitator on 2 Sep 2026.

**Constraints:**
- Delivery runs to a compressed two-week capstone cadence, delivered as sequential releases R0–R5 with a demo gate at R4.
- Output format is Markdown matching the provided PRD template; no export integrations.
- Build order is evals-first: an evaluation row must be failing before the capability meant to pass it is built or changed, one capability at a time.
- Experiments change one variable at a time and are repeated, because output is non-deterministic; a change is kept only if the gain is consistent.
- Remediation levers are applied cheapest-first: prompt, then model, then architecture, then configuration, then fine-tuning.

## 9. Business risks

The full risk register with mitigations and status is the [RAID log](raid-log.md). In business terms the exposure concentrates in three places:

- **Invented or padded content reaching engineering** (RAID R1, R3, R6) — the direct negation of BO-4 and the reason BR-1, BR-2, BR-13, and BR-14 exist. Mitigated by the UNKNOWN rule in every prompt, by measuring groundedness rather than asserting it, by mandatory human review, and by refusing to release a slice that carries even one untraceable item.
- **Silent resolution of contradictions** (RAID R2) — harder to detect than invention, because the output looks internally consistent. Mitigated by BR-5 and BR-12.
- **Scope creep before the core capability is proven** (RAID R5) — adding optional capabilities early risks arriving at the deadline with breadth and no evidence. Mitigated by the release gating in BR-8 and BR-13.

Cost overrun (RAID R4) is managed by measuring per-step token cost from the first run rather than at the end, and by spending model budget only on the steps that require judgment.

## 10. Open questions

Recorded rather than assumed. Both were reviewed on 4 Sep 2026; one is now decided, one remains open but managed. Neither blocks current work.

| # | Question | Status |
|---|---|---|
| OQ-1 | Is "zero untraceable items" a hard release blocker, or a logged known gap? | **Decided 4 Sep 2026 — hard blocker.** Enforcement, not reporting: a single untraceable item stops the release. Chosen because reliability is the key NFR (BR-1) — if the derived detail is not accurate the tool is of no use, and a "known gap" caveat does not tell the reader which line is ungrounded. Accepted cost: a release may stall on one item even when its other evidence is complete; that is the intended trade. Now binding as **BR-14** (§7) and enforced at the release gate in [release-plan.md](release-plan.md#production-ready-means-every-release). |
| OQ-2 | What is the actual manual drafting time per PRD at NeuronForge? | **Open — managed, not blocking.** No measurement exists and none will be invented: the BO-1 baseline stays **UNKNOWN** (§5). In its place a labelled, unvalidated planning assumption of 4–8 hours per first-draft PRD is registered as **A7** in the [RAID log](raid-log.md#assumptions), usable for sizing only and never as a result. §5 names the validation method (paired unaided-draft vs. review-the-Genie-draft timings). Closes when that measurement is run; no time-saved claim ships before then. |

**Recently closed:** whether an unclassified run halts before PRD generation or proceeds with unlinked requirements — closed in favour of halting and queueing for PM confirmation (BR-10).

## 11. Consistency with existing decisions

Two points worth stating explicitly, so a later reader does not read a contradiction where there is none:

- **BR-8/BR-9/BR-10 do not reopen [ADR-001](adr/ADR-001-orchestration-pattern.md).** That ADR rejects a router/dispatcher pattern because all input types share the same processing stages and a classification step would hide failures behind an unscored decision. Classification here is a *post-capstone* concern that sits **before** the pipeline as an input-routing question, not a replacement for the sequential design. The graded path remains explicit-context (BR-7) and sequential.
- **BR-11 does not make the system stateful.** A prior PRD supplied as an input is an input, not retained state. Runs remain re-runnable from the beginning with no mid-run resume (BR-3), which is what [ADR-001](adr/ADR-001-orchestration-pattern.md) and [ADR-004](adr/ADR-004-gap-analyzer-placement.md) rely on.

## 12. Traceability

| This BRD | Delivered / detailed by |
|---|---|
| §2 Problem, §3 Stakeholders | [charter.md §Q1](charter.md#q1-ideation-15-pts) — pain point, agent, input/output, risk |
| §4 Objectives, §5 Measures | [charter.md §Q2](charter.md#q2-programme-charter-15-pts) vision and success criteria; [architecture-writeup.md](architecture-writeup.md) evaluation strategy and cost model |
| §6 Scope | [ADR-002](adr/ADR-002-extended-capability.md) extended capability; [release-plan.md](release-plan.md) what ships when |
| §7 Business rules | [ADR-001](adr/ADR-001-orchestration-pattern.md), [ADR-004](adr/ADR-004-gap-analyzer-placement.md) (BR-4); agent prompt specs in `design/agents/` (BR-2, BR-5); `.cursor/rules/tdd.mdc` (BR-13); [release-plan.md](release-plan.md#production-ready-means-every-release) release gate (BR-13, BR-14) |
| §8 Assumptions, §9 Risks | [raid-log.md](raid-log.md) |
| §10 Open questions | [facilitator-clarifications-2026-09-02.md](facilitator-clarifications-2026-09-02.md) for course-facing open items |
