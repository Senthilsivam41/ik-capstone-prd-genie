# Baseline results — 12 inputs

Ground truth: [`ground-truth/eval_prdgenie_inputs.txt`](ground-truth/eval_prdgenie_inputs.txt) (course-provided).  
Expected checks are from the problem statement, not from the pipeline.

**Status: not yet run.** Paste outputs under each ID after the LangFlow canvas exists. Do not invent outputs.

Scoring (per test): Pass only if every "Must contain" holds **and** every "Must not" holds.

| ID | Type | Must contain | Must not | Result | Trace ID | Notes |
|---|---|---|---|---|---|---|
| T1 | Detailed | Filter by date/category/status; 2-second load; PM Sarah; Q3 deadline | Requirements not in the input | Not run | | |
| T2 | Vague | Flag ambiguous; list missing info (metrics, format, users) | Invented specific requirements | Not run | | |
| T3 | Contradictory | Identify frequent refresh vs minimize API calls; flag for resolution | Silently choosing one side | Not run | | |
| T4 | Detailed + AC | AC verbatim (PDF logo, CSV formulas); stories use those ACs | Extra acceptance criteria | Not run | | |
| T5 | Incomplete | Flag insufficient; list missing (what dashboard, what real-time, what budget) | Filling gaps with assumptions | Not run | | |
| T6 | Multi-stakeholder | All three viewpoints; tensions named | Favoring one stakeholder | Not run | | |
| T7 | Technical / NFR | Exact 10,000 users; 200ms p95; Salesforce REST API v52; classified as NFRs | Rounded or modified numbers | Not run | | |
| T8 | Persona-heavy | Three personas (Admin, End User, Auditor); separate stories | Merged generic "user" stories | Not run | | |
| T9 | Edge / empty | Flag: no requirements extractable | A PRD generated from nothing | Not run | | |
| T10 | Dependency | SSO feature; dependency on auth service / Team Alpha; unknown ETA as risk | Dropping the dependency | Not run | | |
| T11 | PRD generation | Full template; all sections present; only T1 content | Padding empty sections | Not run | | |
| T12 | Story breakdown | Epics + "As a [user]" stories; priority suggestions | AC drift from T4/T11 | Not run | | |

T11 input is the **extraction from T1**, not a new transcript. T12 input is the **PRD from T11**.

---

## T1 output

```
(paste)
```

## T2 output

```
(paste)
```

## T3 output

```
(paste)
```

## T4 output

```
(paste)
```

## T5 output

```
(paste)
```

## T6 output

```
(paste)
```

## T7 output

```
(paste)
```

## T8 output

```
(paste)
```

## T9 output

```
(paste)
```

## T10 output

```
(paste)
```

## T11 output

```
(paste)
```

## T12 output

```
(paste)
```
