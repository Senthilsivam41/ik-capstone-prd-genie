# Q4 Reflection — PRD Genie

Q4 is **5 points**. One page after traces. Not a CalendarMate 15-point essay.

**Sources:** Langfuse EU `my-capstone-prd-genie`, T1–T10 re-runs 6 Sep 2026 11:25–11:30Z (four generations each, Completeness / Hallucination / Groundedness on gpt-4o). Trace IDs in [baseline-results.md](../evidence/baseline-results.md#per-agent-judge-re-score-6-sep-2026). Prompt experiments E1 / E1b already recorded.

## What the traces showed

Open-code the **first** failure in the chain, not the final markdown.

1. **T9 is the planted refuse case, and the first failure is architectural.** Extractor + Gap say there is nothing to extract (Gap Hallucination 0.05, Groundedness 0.85). PRD Generator still runs because Gap is a branch, not a gate (ADR-004). On the same trace the PRD generation is scored Hallucination **0.9** and Completeness **0.85** — a fluent document from “Meeting happened. Notes: none.” Session 2 said a third to a half of the set checks refusal. The Extractor Pass is real; the downstream PRD is the defect.

2. **Contradiction compounds.** T3 Extractor Hallucination 0.2 → Gap 0.3 → Story Breakdown **0.4**. The Extractor listed both sides; stories are where a side can still sneak in. That matches why Gap sits after extraction: if we wait until stories, the rewrite has already happened.

3. **Vague input is mostly held.** T2 Extractor Hallucination 0.1 after E1 (metrics / format / users as UNKNOWN). T5 Extractor 0.1. The 0.20 “Hallucination · EVAL” dashboard mean is a judge mean over observations, not “20% of T-rows failed.”

4. **Groundedness was dark until today.** The score config existed; the `gpt-4.1-nano` judge did not attach. After all three judges moved to gpt-4o, every generation on T1–T10 has H/G/C. That is instrumentation, not a prompt win (E5).

5. **The Completeness judge is not yet a completeness judge.** On T1 Extractor, Completeness = 0 while the comment describes a complete, grounded listing. Several Completeness comments discuss hallucination. Do not quote Completeness means as “% of fields present.” Format compliance stays the T11 ten-section **rule**.

## Improvement plan (two more weeks, cheapest first)

| Priority | Change (one at a time) | Why |
|---|---|---|
| 1 | Gate PRD/stories when Gap extractability is `NONE` | Fixes the T9 first failure. Architecture lever, after prompts already held T2. |
| 2 | Rewrite Completeness judge so it scores required fields, not hallucination | Session 2: the judge is only as good as its brief. |
| 3 | Repeat T3 Story Breakdown only; if Hallucination stays ≥0.3, add “copy both sides, no winner” to that agent | Isolated from (1). |
| 4 | Point Gap at gpt-4o (ADR-003) | Live node is still mini. |
| 5 | Combined `EX` re-run of T1–T12 | Only after 1–3 stay consistent across repeats. |

Fine-tune and RAG stay off. Session 2: not needed.

## Risks of AI-generated PRDs (confirmed, not retired)

Silent commitment (T5 “real-time”), false consensus (T3/T6), template padding (T9 PRD still writes), AC drift (T4 Extractor Hallucination 0.4 — watch verbatim logo/CSV into stories). Re-run cost is ~$0.007 / full pipeline (Langfuse actuals) — cheap enough that HITL re-runs are not the adoption blocker.

## Eval skills and production privacy

Week 6: failures are 200 OKs with plausible text. Per-agent scores are how you see that T9’s harm is the PRD, not the Extractor. Week 7 fine-tune process is the loop we used (E1 → E1b → E5); the trained-model step is unused.

**Privacy:** traces contain stakeholder names and meeting text in Langfuse EU. For a real NeuronForge rollout, strip names, set retention, and keep `.env` out of git (already). Screenshots for TAs; no keys.

**Rollout:** charter initial release is 20 PMs. At 2 drafts/user/day the measured cost is **~$0.014 / user / day**. Human review of Gap questions stays mandatory; T9 shows why auto-ship is unsafe.
