# Solution journey — AS-IS, TO-BE, and what comes after

**Rubric:** Q1 pains · Q2 rollout · Q3 design / tool rationale.  
**Audience:** TA or NeuronForge PM who needs the story, not a node-by-node n8n import.  
**Live vs target:** AS-IS and TO-BE describe what happens today and what the graded canvas actually runs. Target diagrams are **not built**. Meet, Teams, Drive, SharePoint, Slack, Google Chat, and email are **not connected**.

Interactive diagrams (Archify): [AS-IS](../design/architecture/as-is.html) · [TO-BE capstone](../design/architecture/to-be.html) · [Target intake + HITL](../design/architecture/target.html) · [HITL approval loop](../design/architecture/hitl-approval.html). Source JSON sits next to each HTML. Graded 1–2 page writeup remains [architecture-writeup.md](architecture-writeup.md).

---

## 1. How we got here (problem → pains → agents)

The course problem statement is a **PM documentation** problem, not a chatbot problem. NeuronForge PMs already have transcripts, briefs, and notes. They do not have a first-draft PRD they can trust.

We did **not** invent extra pains. We mapped the statement onto the **12 planted briefs** (T1–T12). Those briefs are a specification of failure modes. They are how the pain areas were found:

| Pain (charter Q1) | How the dataset proves it | Agent that addresses it |
|---|---|---|
| 1 Requirements buried in conversation | T1/T4/T7/T8: stated facts must survive; T5 “John mentioned real-time” must not become a commitment | **Extractor** — stated vs ambiguous |
| 2 Inconsistent PRD format | T11: ten template sections; empty stays Open Questions | **PRD Generator** |
| 3 Manual story breakdown | T12 / T4: `As a [persona]`; ACs verbatim | **Story Breakdown** |
| 4 Notes and contradictions lost | T2/T3/T5/T6/T9/T10: UNKNOWN, both sides, refuse empty notes, keep SSO dependency | **Gap Analyzer** (extended +8) |

Signature failure: a **fluent invented PRD**. That is why every agent says UNKNOWN rather than “infer a reasonable dashboard,” and why Gap is a **branch after Extractor**, not a critic after stories ([ADR-004](adr/ADR-004-gap-analyzer-placement.md)).

---

## 2. AS-IS — the manual workflow

Open [as-is.html](../design/architecture/as-is.html).

Today a PM re-reads the meeting, hand-picks requirements (maybe mixed with stated), drafts a PRD in a personal format, then writes stories. Engineering re-interprets the structure to estimate. Side notes sit unused until a constraint appears **after** a sprint has started.

That path is slow. Worse: it has no guardrail against a confident wrong line. The TO-BE system is valuable only if it is **stricter** than this path (BR-1).

---

## 3. TO-BE — capstone canvas (what actually runs)

Open [to-be.html](../design/architecture/to-be.html).

```
Manual Trigger (testId)
  → Google Sheet row.chatInput
  → Extractor (gpt-4o)
       ├→ Gap Analyzer (gpt-4o-mini)     questions, not a gate
       └→ PRD Generator (gpt-4o)
            → Story Breakdown (gpt-4o-mini)
  → Merge → Langfuse EU (OTLP, four generations)
  → PM reviews markdown offline and re-runs from Extractor
```

HITL is **simulated** (BR-3): the PM answers Gap questions outside n8n, appends them to the source, and starts a **new** run. There is no wait/resume node.

One-row `testId` is intentional. The rubric scores **first-failure isolation**. A 12-way loop before T2 is green would hide which ID broke. That is the graded path. It is not the production forever path — see §5 (target intake + HITL) and §7 (roadmap).

---

## 4. Tool selection — short term vs long term

### Short term (capstone / now) — live

| Need | Choice | Why this is the *now* stack |
|---|---|---|
| Canvas | **IK n8n Cloud** | Cohort instance. Rubric accepts LangFlow or equivalent. 6 Sep: n8n→LangFlow JSON **import is broken** ([ADR-005](adr/ADR-005-workflow-platform.md)). Do not rebuild. |
| Judgment LLM | **gpt-4o** on Extractor; live PRD also gpt-4o | Stated vs ambiguous and T3/T6 contradictions are 6/12 of the set |
| Format LLM | **gpt-4o-mini** on stories; live Gap still mini | Mechanical transform; Gap-to-gpt-4o is ADR-003 intent, not a scored rebuild |
| Inputs | **Google Sheet** + Manual Trigger | Official T1–T12 `chatInput`; one `testId` per run (TDD) |
| Observability | **Langfuse EU** OTLP HTTP | Connected **before** the first scored run. Judges sit in Langfuse, not as n8n nodes |
| Agents | **Four only** | Core three + Gap. No fifth agent, no Size Estimator |

Cost formula does not change later: `tokens × price × volume` as **$/user/day**. Live actuals: mean ~$0.0071 / run → ~$0.014 / user / day at two drafts.

### Long term (NeuronForge after capstone) — **not built**

Approach, not a second live canvas. Open [target.html](../design/architecture/target.html).

| Need | Long-term choice | Why this is *later*, not now |
|---|---|---|
| Meeting capture | **Google Meet** and **Microsoft Teams** connectors | Ingestion of the real conversation. Not a new LLM. Capstone still pastes `chatInput` from the Sheet. |
| Related documents | **Google Drive** and **SharePoint**, **correlated** to the meeting (source id / meeting id / time window / attendees) | Extraction must be grounded in talk **and** referred files — not two disconnected piles. |
| Intake | Structured transcript record **before** Extractor | Canonical slots (below). Sheet/CSV can fill the same schema first. |
| Orchestration | n8n (or equivalent) still runs Extractor → Gap ∥ PRD → stories | Do not rebuild LangFlow ([ADR-005](adr/ADR-005-workflow-platform.md)). Do not add a fifth agent on the live canvas. |
| Observability | Langfuse stays | Every new hop gets a generation before it is called green. |
| HITL adapters | Chat (Slack, Google Chat, Teams — **one channel first**) plus **email** | Production BR-3: approve or correct in the window; not wait/resume on the graded graph. |
| Publish | Google Doc and/or SharePoint **export** | Markdown remains the pipeline system of record. Tracker/wiki export stays a later leaf. |
| Models | Same split-model | Fine-tune not required. Cost remains `tokens × price × volume` as **$/user/day**. |
| Registry | Classification after core (BR-8) | Still not a router in front of T1. |

Also later, and still not on the live graph: Loop Over Items on already-green rows; optional T9 gate (architecture lever, not a fifth agent); issue-tracker export after markdown is the SoR.

---

## 5. Target intake, HITL, and how pains map (not built)

Capstone proves the four agents on one Sheet row. Target is how NeuronForge would stop mining meetings by hand **without** inventing requirements.

### Pains → connectors

| Pain | Capstone (live) | Target (not built) |
|---|---|---|
| 1 Requirements buried in conversation | Extractor on `chatInput` | Meet/Teams transcript **plus** Drive/SharePoint files tied to that meeting |
| 2 Inconsistent PRD format | PRD Generator + template | Same generator; **export** to Google Doc / SharePoint after the markdown draft exists |
| 3 Manual story breakdown | Story Breakdown | Same agent; stories ride with the PRD into chat/email review |
| 4 Notes and contradictions lost | Gap Analyzer questions; PM answers offline | Same questions delivered in **chat**; parked items live on the structured record, not a side note |

Connectors are **ingestion**. They do not replace UNKNOWN, do not pick a side on T3/T6 contradictions, and do not pad empty PRD sections.

### Canonical intake schema (before Extractor)

Every ingested meeting becomes a structured record. Empty or unstated slots stay UNKNOWN — do not invent facts into them. Keep the existing Extractor contract (**stated vs ambiguous**).

| Slot | What it holds |
|---|---|
| Source id | Meet or Teams meeting id + connector name |
| Stakeholders / attendees | Who was in the meeting |
| Discussion points | Topics actually discussed |
| Open questions | Unresolved in the room |
| Action items | Commitments said in-meeting |
| Parked items | Explicitly deferred |
| Priority action items | Called out as first |
| Dependencies | Named blockers |
| Assumptions | Stated as assumptions, not inferred |

Capstone still feeds plain `chatInput` from the Sheet. The first cheap step after the pack is to **shape Sheet/CSV into this schema**, then attach a real connector.

### HITL approval loop (production BR-3)

Today BR-3 is **simulated**: Gap report out, PM answers offline, **new** run from Extractor. There is no wait/resume node.

Target (see [hitl-approval.html](../design/architecture/hitl-approval.html)):

```
markdown PRD + stories
  → export Google Doc and/or SharePoint
  → share link to chat (Slack / GChat / Teams) AND email
       ├→ reviewer corrects points → re-run from Extractor (stateless)
       └→ reviewer approves in email reply OR in the chat window
            → only then: ready for engineering
```

Phasing: **one** chat product first, then the others. Dual approval (chat **or** email) is the gate; engineering does not take an unapproved draft as backlog.

## 6. Long-term architecture design approach

How we would grow the system without undoing the capstone:

| Principle | What it means in practice |
|---|---|
| Isolate first failure | New intake is another Extractor input type, not a router in front of T1 |
| Guardrails stay in prompts | UNKNOWN / no silent resolve / no padding / verbatim ACs — not a later filter agent |
| Observability first | Any new hop gets a Langfuse generation **before** it is called green |
| One change at a time | Prompt → model → architecture → config → fine-tune. Repeat. Keep only if consistent |
| Stateless re-run | Clarification never resumes mid-trace |
| Reliability over speed | A padded T9 PRD is the Q4 first failure; a T9 **gate** is the first architecture lever, not a fifth agent |
| Ingest, don't generate | Meet/Teams/Drive/SharePoint are sources. Docs/SharePoint on the way out are export. Markdown stays SoR inside the pipeline |

Cheapest-first sequence after the pack (detail in [release-plan.md](release-plan.md)): structured intake schema (still Sheet-fed) → one transcript connector → one doc-store correlate → one chat HITL → Doc export + email approval → remaining connectors. Classification/registry still after core (BR-8). Loop Over Items only on already-green rows.

---

## 7. High-level release plan and roadmap

### Capstone (R0–R5) — in this repo

Graded slices. Detail and DoD: [release-plan.md](release-plan.md).

| Release | What it locked | Status |
|---|---|---|
| R0 Design | Charter, ADRs, diagram | Done |
| R1 Observability + Extractor | Langfuse before T1 | Done |
| R2 Core e2e | PRD + stories (T11/T12) | Done |
| R3 Baseline | T1–T12 pasted from traces | Done |
| R4 Gap branch | Extended +8 | Done (demo video still pack-open) |
| R5 Q4 + pack | Reflection, slides | Written; **5-min demo** still required |

### After capstone (R6+) — **not built, not scored**

Cheapest first. None of these rows are nodes on `system/workflow.json`.

| Horizon | Increment | Must not |
|---|---|---|
| R6 | Structured intake schema; still fed by Sheet/CSV | Do not invent facts into empty slots; keep stated vs ambiguous |
| R7 | One transcript connector — Meet **or** Teams, not both | Do not treat the connector as a new LLM |
| R8 | Correlate one doc store — Drive **or** SharePoint — by meeting id / time / attendees | Do not extract from an uncorrelated file pile |
| R9 | Chat HITL — **one** of Slack, Google Chat, or Teams | Do not add wait/resume on the graded canvas; re-run from Extractor |
| R10 | Google Doc / SharePoint **export** + email share; approve by email reply **or** chat | Do not call a draft ready for engineering before approval (production BR-3) |
| R11 | Remaining connectors (the other meeting, doc store, chat channels) | Do not build all six products in one slice |
| R12 | Loop Over Items on **already green** `runnable=yes` rows | Do not fire unfiltered T-rows while isolating a red ID |
| R13 | Optional T9 gate: skip PRD/stories when Extractability is NONE | Do not invent a fifth agent |
| R14 | Project/PRD registry classification (BR-8) | Do not guess below 95% match |
| R15 | Markdown → issue tracker export | Do not let Jira become the source of truth |
| Optional | Fine-tune Extractor | Only if prompt/model/architecture levers are exhausted |

Cost, traces, and T1–T12 evidence stay the capstone proof. R6+ is how NeuronForge would ingest real meetings and close HITL **without** throwing away TDD.

---

## 8. Where to read next

1. [charter.md](charter.md) — Q1/Q2 scored prose  
2. [architecture-writeup.md](architecture-writeup.md) — why sequential + branch, `$/user/day`  
3. [release-plan.md](release-plan.md) — R0–R5 DoD + R6+ (not built)  
4. [brd.md](brd.md) — BR-1…BR-14  
5. [baseline-results.md](../evidence/baseline-results.md) — real outputs  
