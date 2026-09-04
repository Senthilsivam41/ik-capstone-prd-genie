# Langfuse +5 on IK n8n — what “done” looks like

**Rubric line:** Q3 Observability **5 pts**.  
**Platform:** n8n Cloud `agenticai100.app.n8n.cloud` → Langfuse EU `https://cloud.langfuse.com/project/cmthhhzzv02wsad0d4qogeznv` (`my-capstone-prd-genie`).  
**Release:** [R1 in release-plan.md](release-plan.md).  
**Open question for facilitator (only if blocked):** which of the wiring options below they accept when native LangFlow-style env tracing is unavailable.

---

## Why this is a real question

On **LangFlow**, Langfuse is usually: set `LANGFUSE_PUBLIC_KEY` / `SECRET_KEY` / `BASE_URL` in the process env → every LLM call auto-traces.

On **IK n8n Cloud**:

- There is **no first-party Langfuse *tracing*** credential type in the stock credential picker (we saw OpenAI, Header Auth, OpenRouter — not Langfuse tracing).
- Official Langfuse n8n node is mainly **prompt management**, not full agent traces ([Langfuse n8n integration](https://langfuse.com/integrations/no-code/n8n)).
- Community packages (e.g. AI Agent + Langfuse) may need **Community Nodes** install rights we may not have on a shared IK instance.

So “connect Langfuse” is **not** “paste three env vars and restart.” We must pick a wiring that still produces **grader-visible traces**, and ask the facilitator only if every path fails.

---

## What the +5 must look like (acceptance — grader view)

A TA opening the submission without a live pair session should find:

| # | Evidence | Pass when |
|---|---|---|
| 1 | **Project** | Traces land in EU project `cmthhhzzv02wsad0d4qogeznv` (host `https://cloud.langfuse.com`, **not** `us.` / not `eu.` hostname typos) |
| 2 | **At least one successful run** traced **before** we claim green T1 (rule: observability before first successful scored run) |
| 3 | **Per-agent visibility** | For the agents that ran in that workflow version, the trace shows **separate spans/generations** (or clearly named observations) — not a single opaque blob. Slice 1 = Extractor only; later releases = one span per agent |
| 4 | **Tokens / cost** | Input+output tokens (and cost if Langfuse prices the model) visible on the trace or generation |
| 5 | **I/O** | Prompt/input and model output inspectable (needed for open-coding / Q4) |
| 6 | **Score configs** | Project has `completeness`, `hallucination`, `groundedness` (manual or LLM-as-judge). Configs may score only **future** traces — re-run after enabling |
| 7 | **Screenshot** | `evidence/screenshots/langfuse-traces.png` in the pack |
| 8 | **Docs** | README or architecture writeup states how n8n sends data (HTTP / community node / gateway) |

**Not enough for +5:** keys only in `system/.env`; Langfuse project empty; n8n Executions tab alone; prompt-management node without LLM generations.

**Enough for Slice 1:** one Extractor run → one Langfuse trace with generation + tokens. Per-agent multi-span becomes mandatory once PRD/stories/Gap exist (R2/R4).

---

## Wiring options on IK n8n (try in order)

### Option A — Community “AI Agent + Langfuse” (best ergonomics)

Install community node if IK allows → credential Base URL `https://cloud.langfuse.com` + pk/sk → agent node auto-traces.

**Ask facilitator:** “Can we install community nodes on agenticai100?”

### Option B — OpenRouter (or similar) with Langfuse broadcast

Route the Chat Model through a gateway that forwards traces to Langfuse. Only if IK keys/OpenRouter are available and course-compatible.

### Option C — HTTP Request after each LLM node (**default plan**)

After Requirement Extractor (and later each agent):

1. **HTTP Request** `POST https://cloud.langfuse.com/api/public/ingestion`
2. Auth: Basic (`publicKey`:`secretKey`) or Langfuse’s documented header scheme for that API version
3. Body: minimal ingestion batch with `trace` + `generation` (name = agent name, input = `chatInput` / prior output, output = chain text, usage tokens if present)
4. Header Auth / generic credential in n8n — **do not** commit keys

This works without community nodes. Spans are **explicit** (one HTTP per agent) rather than automatic LangChain callbacks — still valid if the Langfuse UI shows per-agent generations and tokens.

### Option D — Fallback (last resort)

Document blocker in RAID I1; temporarily run Extractor in a tiny LangFlow/local runner **only** to prove Langfuse, while keeping graded canvas on n8n. Prefer fixing Option C.

---

## Exact facilitator question (copy-paste)

> On the IK n8n Cloud instance we don’t get LangFlow-style `LANGFUSE_*` env auto-tracing, and there’s no built-in Langfuse tracing credential. For the **5-point observability** line, is it acceptable if each agent posts a **generation** to Langfuse Cloud (EU) via **HTTP ingestion** (or a community Langfuse agent node), so the grader sees **per-agent traces + tokens + I/O** and a screenshot? Or must traces come from a specific n8n↔Langfuse integration?

---

## R1 checklist (ship when all true)

- [ ] Score configs created on EU project  
- [ ] One Test workflow run on Slice 1  
- [ ] Trace visible in Langfuse within a few minutes  
- [ ] Tokens visible on that generation  
- [ ] `evidence/baseline-results.md` updated for T1 / Transcript 1 from that run  
- [ ] Wiring method named in README (one sentence)  
- [ ] Optional: `langfuse-traces.png` committed  

Then mark Observability **5/5** in [rubric-evaluation.md](rubric-evaluation.md) only with that evidence — never invent.
