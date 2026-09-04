# ADR-005: Workflow platform — n8n (IK-hosted) over LangFlow

**Status:** Accepted  
**Date:** 2026-08-31 · **Facilitator confirm:** 2026-09-02  
**Context:** Q3 design / tool selection. Replaces the 30 Aug LangFlow lock. Sequential + branch (ADR-001) is unchanged.

**2 Sep clarification:** Facilitator confirmed n8n **or** LangFlow is fine; name the export so evaluators know which tool to open. IK providing an n8n account is a valid reason to stay on n8n. See [facilitator-clarifications-2026-09-02.md](../facilitator-clarifications-2026-09-02.md).

## Decision

Build the PRD Genie canvas on **Interview Kickstart’s n8n Cloud instance**  
`https://agenticai100.app.n8n.cloud`

Observability stays **Langfuse EU**:  
`https://cloud.langfuse.com/project/cmsbfzos000iead0hcz5k5ygp`

Do **not** submit a LangFlow canvas. LangFlow Desktop may exist on the laptop as a personal sandbox; it is not the graded runtime.

## Why n8n now

The 30 Aug writeup rejected n8n as “webhook/API orchestration, not prompt-chaining.” That assumed we would pick a self-hosted builder. The course actually **provides n8n** for this cohort. Using it means:

- No local LangFlow install, Docker, or env-inheritance bugs on Desktop.
- The submission canvas is the same tool the rest of the class and TAs already open.
- The rubric asks for a documented **LangFlow or equivalent** canvas plus traces. n8n AI Agent nodes are the equivalent.
- Sequential Extractor → (Gap Analyzer ∥ PRD Generator) → Story Breakdown maps to a linear n8n graph with one split.

Langfuse credentials live in **n8n Credentials** (host `https://cloud.langfuse.com`, public + secret keys). `system/.env` is the local copy of those keys so we do not lose them; it is gitignored and is not what n8n Cloud reads.

## Alternatives considered

| Option | Verdict |
|---|---|
| LangFlow Desktop / `uv pip install langflow` | Rejected as primary. Extra install; traces depend on shell env the Desktop app does not inherit. Keep only as a private fallback. |
| Custom LangGraph / Python | Rejected. Rubric scores a visual canvas export, not a custom runtime. |
| Stay on LangFlow in writing, build on n8n | Rejected. Graders would see a design/runtime mismatch. |

## Observability on n8n Cloud

Langfuse has no first-party n8n *tracing* node (prompt-management node only). Traces still have to be earned. Preferred order after login:

1. If this n8n instance exposes Langfuse / LangChain callback credentials, use those on each AI Agent node.
2. Else OpenRouter as the model gateway with Langfuse broadcast (course-compatible).
3. Else an HTTP Request after each agent to Langfuse’s ingestion API — works on any n8n Cloud plan.

Do not call observability done until a real trace exists on the EU project. Host must be `https://cloud.langfuse.com` (EU), not `us.cloud.langfuse.com`.

## Consequences

- Export from n8n (**… → Download**) lands in `system/workflow.json` (and keep a clearly named copy under `system/workflows/*n8n*.json`).
- Screenshot `n8n-canvas.png` replaces `langflow-canvas.png`.
- README states **Platform: n8n (IK Cloud) + Langfuse EU** so graders do not open LangFlow first.
- Do not depend on n8n↔LangFlow JSON interchange for submission — export from the tool that actually ran.
- RAID dependency is the IK n8n instance, not a local LangFlow server.
- Exact model IDs are locked in n8n credentials when OpenAI/Anthropic/OpenRouter keys are added (ADR-003 tier split is unchanged).
