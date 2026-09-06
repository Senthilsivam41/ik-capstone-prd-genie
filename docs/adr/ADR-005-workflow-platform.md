# ADR-005: Workflow platform — n8n is the submission canvas

**Status:** Accepted  
**Date:** 2026-08-31 · **Facilitator confirm:** 2026-09-02 · **Import-broken:** 2026-09-06  
**Context:** Q3 design / tool selection. Replaces the 30 Aug “build on LangFlow first” lock. Sequential + branch (ADR-001) is unchanged.

**2 Sep:** n8n **or** LangFlow is fine; name the export so evaluators know which tool to open. We started on n8n because the cohort received that account.  
**6 Sep:** n8n → LangFlow JSON export is **confirmed broken**. There is no later import. See [facilitator-clarifications-2026-09-06.md](../facilitator-clarifications-2026-09-06.md).

## Decision

**Current implementation** is **Interview Kickstart’s n8n Cloud instance**  
`https://agenticai100.app.n8n.cloud`

The cohort received that account, so the live canvas, traces, and pack export (`system/workflow.json`) are n8n. Graders open n8n JSON.

**LangFlow:** not the live runtime and **not** an import target. The 6 Sep session confirmed n8n→LangFlow JSON export does not work. A LangFlow canvas would be a from-scratch rebuild and would hide the n8n traces already scored. Out of scope.

Observability stays **Langfuse EU**:  
`https://cloud.langfuse.com/project/cmthhhzzv02wsad0d4qogeznv`

Do **not** rewrite the pipeline in LangFlow while n8n is the running system. Do **not** treat a hoped-for n8n→LangFlow import as the submission until that import has been proven and re-exported.

## Why n8n now

The 30 Aug writeup treated LangFlow as the default builder and n8n as “webhook/API orchestration.” The course then **gave this cohort n8n**, so we started there:

- Same instance the class and TAs already open.
- No local LangFlow install required to earn T1–T12 and Gap.
- The rubric asks for a documented **LangFlow or equivalent** canvas plus traces. n8n AI Agent nodes are the equivalent. LangFlow is not required.
- Sequential Extractor → (Gap Analyzer ∥ PRD Generator) → Story Breakdown maps to a linear n8n graph with one split.

Langfuse credentials live in **n8n Credentials** (host `https://cloud.langfuse.com`, public + secret keys). `system/.env` is the local copy of those keys so we do not lose them; it is gitignored and is not what n8n Cloud reads.

## Alternatives considered

| Option | Verdict |
|---|---|
| Build on LangFlow first | Rejected. Cohort has n8n; starting over would hide the scored n8n traces. 6 Sep: import path is broken anyway. |
| Custom LangGraph / Python | Rejected. Rubric scores a visual canvas export, not a custom runtime. |
| Write “LangFlow” while the live canvas is n8n | Rejected. Graders must open the tool that actually ran. |

## Observability on n8n Cloud

Langfuse has no first-party n8n *tracing* node (prompt-management node only). Traces still have to be earned. Preferred order after login:

1. If this n8n instance exposes Langfuse / LangChain callback credentials, use those on each AI Agent node.
2. Else OpenRouter as the model gateway with Langfuse broadcast (course-compatible).
3. Else an HTTP Request after each agent to Langfuse’s ingestion API — works on any n8n Cloud plan.

Do not call observability done until a real trace exists on the EU project. Host must be `https://cloud.langfuse.com` (EU), not `us.cloud.langfuse.com`. Ingest is OTLP/HTTP (`/api/public/otel/v1/traces`), not the deprecated `/api/public/ingestion` batch.

## Consequences

- Export from n8n (**… → Download**) lands in `system/workflow.json` (and keep a clearly named copy under `system/workflows/*n8n*.json`).
- Screenshot `n8n-canvas.png` is the current canvas shot. Do not add a `langflow-canvas.png` unless a LangFlow rebuild is explicitly started (it is not).
- README states **Platform: n8n (IK Cloud) + Langfuse EU** so graders open n8n first.
- Keep exporting real n8n JSON. That is the pack.
- RAID dependency is the IK n8n instance. LangFlow is not a blocker and is not an import follow-up.
- Exact model IDs are locked in n8n credentials when OpenAI/Anthropic/OpenRouter keys are added (ADR-003 tier split is unchanged).
