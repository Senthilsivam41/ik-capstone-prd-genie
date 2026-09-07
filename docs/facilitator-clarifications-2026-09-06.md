# Facilitator clarifications — Session 2 (6 Sep 2026)

**Session:** Build, Evaluate, Submit  
**Participant:** Sendil · Project: PRD Genie  

**Official decks (source of truth for what was taught):**

- Session 1: `/Users/sendils/work/Course/IK Course/Gen AI/Capstone Project/Capstone Session 1 - Course Overview and Capstone Brief.pptx`
- Session 2: `/Users/sendils/work/Course/IK Course/Gen AI/Capstone Project/Capstone Session 2 - Build, Evaluate, Submit.pptx`

**Live notes (Q&A only, where they add something the slides do not say):** Granola `953b93ac-ee79-4180-acc4-d1ce691ac146`

Do not commit the PPTX files into this repo (course materials).

## From the official slides

| Topic | Session 2 (and Session 1 where noted) | What we do |
|---|---|---|
| **Where you should be** | Project chosen, problem understood, tools selected, architecture sketched, first flow running. If **ahead** of the build, spend remaining time on written deliverables (charter / reflection / pack). | We are ahead on the pipeline. Remaining marks are pack + Q4, not a fifth agent. |
| **80 vs 100** | Session 1 slide 33 / Session 2 slide 27: PRD Genie **80** (charter 15, reflection 5). | Unchanged. |
| **n8n or LangFlow** | Either. Justify the pick. n8n = more custom logic; LangFlow = cleaner straight pipelines. | Stay on IK n8n (cohort account). |
| **Langfuse or LangWatch** | Either. Pick by integration. | Keep Langfuse EU. |
| **RAG / fine-tune** | Optional, not needed, do not spend the last two weeks here. | Unchanged. |
| **Demo video** | Session 1 + 2 pack slides: **PRD Genie and SalesGenie require a 5-minute demo.** CalendarMate / Mira do not mention one. Most commonly missed item. | We need the video. Not recorded yet. |
| **Manual trigger** | Fine for submission. Slack/webhook/schedule not marked. | Keep Manual Trigger. |
| **Brief table vs ground truth** | The T1–T12 table is a **specification** (“must contain”). It is **not** ground truth. You cannot score by comparing output to a sentence that describes the answer. You still **run every brief input** at the end and document outputs — that is the +5 baseline line. | Inputs stay `eval_prdgenie_inputs.txt`. GT v0 = Must/Must-not written before runs. See [ground-truth README](../evidence/ground-truth/README.md). |
| **Who writes GT** | A human who knows the domain. Draft in ChatGPT/Claude **outside** the pipeline, then correct by hand. Never let PRD Genie write the answer key. Five pairs is a legitimate v0. Freeze and version. | Do not generate extra pairs from n8n output. |
| **Per-agent GT** | Each agent has its own expected output. End-to-end does not replace that. | Already the TDD seams. |
| **Judge placement** | Evaluation runs **beside** the workflow, not as a node inside it. GT is supplied to the evaluator only. The pipeline must never see the answer key. | Langfuse evaluators stay in Langfuse, not n8n. |
| **PRD Genie metrics** | Signature failure: invents requirements / fills gaps. First metric: **hallucination rate (items not traceable to source)**. Companions: **extraction completeness**, **format compliance**. Groundedness is a safe extra. | Already those three in Langfuse + T11/T12 format checks. |
| **PRD Genie planted fails** | “Meeting happened. Notes: none.” → refuse. Contradiction → flag, do not resolve. Exact figures → do not round. | T9 / T3 / T6 / T7 already in the 12. |
| **Extended options** | Gap analysis, Scope estimator (T-shirt), **or version comparison across transcripts**. | Gap is the scored +8. Size Estimator is extra, not built. |
| **One change** | Prompt → model → architecture → config → fine-tune. One at a time. Repeat. Keep only if consistent. Combine winners and **re-run the full set**; record that combined row. | E1 / E1b done. Combined `EX` re-run of all 12 is still open. |
| **Experiment record** | ID, change, baseline scores, new scores, result, decision. A perfect first-run story is a red flag (Session 2 avoidable-loss slide). | `evidence/experiment-log.md`. |
| **Q1 Ideation (15)** | 2–3 use cases, each: pain, agent, I/O, **three success metrics**, **knowledge base**, assumptions, one risk. Use numbers from the problem statement. | Charter Q1 has pain / agent / I/O / risk. **Metrics and knowledge-base lines are thin** — patch before submit if chasing 15/15. |
| **Q2 Charter (15)** | Vision, scope, success criteria, timeline, risks, stakeholders, decision-making, rollout. | Written. |
| **Q4 Reflection (5)** | One page: (1) what traces showed, (2) improvement plan, (3) eval / fine-tune connection, (4) privacy/security, (5) rollout to a real team. Honesty > polish. | `docs/reflection.md` is still a **pre-trace stub**. This is the remaining written +3. |

## Live Q&A only (not on the PPTX)

| Topic | Said in the room / Granola | What we do |
|---|---|---|
| **n8n → LangFlow JSON** | **Confirmed broken as of 6 Sep.** | No import. No rebuild. [ADR-005](adr/ADR-005-workflow-platform.md). |
| **Langfuse keys to TAs** | Screenshots only. | Pack screenshots. `.env` stays out. |
| **“Aim for 30” GT pairs** | Live paraphrase. Official slide says **five is a legitimate v0**, then grow by hand. | Do not invent 18 extra pairs from the pipeline. |
| **Demo required for all four** | Live paraphrase. Official pack slide still says **only PRD Genie + SalesGenie**. | We need the video either way. |
| **PM always reviews → lower accuracy OK** | Live / earlier session. | Keep BR-14 (zero untraceable items). Do not relax. |
| **Structured output parsers in n8n** | Live tooling aside. Official: MVP first; evaluator not inside the workflow. | Do not add parser nodes before demo / Q4. |
| **Wednesday Expert Connect** | Register explicitly. 9:00 AM. | Personal action. |

## Do not change because of Session 2

- Do **not** rebuild in LangFlow.
- Do **not** generate ground truth from PRD Genie outputs.
- Do **not** put an LLM-as-judge node on the live n8n canvas.
- Do **not** leave Q4 as “traces are not yet available.”
- Do **not** add Size Estimator or a project classifier before the demo if the goal is 80/80.
