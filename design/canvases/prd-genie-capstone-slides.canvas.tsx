import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  UsageBar,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

const SLIDES = [
  "Title",
  "Problem",
  "Charter",
  "Architecture",
  "Tools",
  "Prompts",
  "Baseline",
  "Cost & metrics",
  "What's next",
] as const;

export default function PrdGenieCapstoneSlides() {
  const [slide, setSlide] = useCanvasState("slide", 0);
  const i = Math.min(Math.max(slide, 0), SLIDES.length - 1);

  return (
    <Stack gap={20} style={{ padding: 24 }}>
      <Stack gap={6}>
        <Text size="small" tone="secondary" weight="medium">
          PRD Genie · deck companion · 9 slides from
          slides/prd_genie_capstone_summary.pptx
        </Text>
        <H1>Capstone slides + discussion notes</H1>
        <Text tone="secondary">
          Blanks on slides 7–8 are filled from Langfuse (5–6 Sep 2026). Say
          the discussion line, not just the headline number.
        </Text>
      </Stack>

      <Row gap={8} wrap align="center">
        {SLIDES.map((label, idx) => (
          <span key={label}>
            <Button
              variant={idx === i ? "primary" : "ghost"}
              onClick={() => setSlide(idx)}
            >
              {idx + 1} {label}
            </Button>
          </span>
        ))}
      </Row>

      <Row gap={8} align="center" justify="space-between">
        <Button
          variant="secondary"
          disabled={i === 0}
          onClick={() => setSlide(i - 1)}
        >
          Previous
        </Button>
        <Text size="small" tone="secondary">
          Slide {i + 1} of {SLIDES.length}
        </Text>
        <Button
          variant="secondary"
          disabled={i === SLIDES.length - 1}
          onClick={() => setSlide(i + 1)}
        >
          Next
        </Button>
      </Row>

      <Divider />
      {i === 0 && <SlideTitle />}
      {i === 1 && <SlideProblem />}
      {i === 2 && <SlideCharter />}
      {i === 3 && <SlideArchitecture />}
      {i === 4 && <SlideTools />}
      {i === 5 && <SlidePrompts />}
      {i === 6 && <SlideBaseline />}
      {i === 7 && <SlideCost />}
      {i === 8 && <SlideNext />}
    </Stack>
  );
}

function SlideTitle() {
  return (
    <Stack gap={16}>
      <Text size="small" tone="secondary">
        APPLIED AGENTIC AI FOR PMs / TPMs · CAPSTONE
      </Text>
      <H2>PRD Genie</H2>
      <Text>AI-Powered Product Documentation Assistant</Text>
      <Text tone="secondary">
        NeuronForge Technologies · Product & Innovation Team
      </Text>
      <Text tone="secondary">Sendil · Principal Solutions Architect</Text>
      <Callout tone="neutral" title="Discussion">
        Open with the risk, not the stack: a fluent invented Must-Have is
        worse than messy notes. n8n is the live canvas because the cohort
        received that account. 6 Sep: n8n→LangFlow export is broken.
      </Callout>
    </Stack>
  );
}

function SlideProblem() {
  return (
    <Stack gap={16}>
      <H2>The problem at NeuronForge</H2>
      <Text>
        PMs/TPMs lose hours turning meeting discussion into structured PRDs
        — and requirements silently fall through the cracks.
      </Text>
      <Table
        headers={["#", "Pain"]}
        rows={[
          ["1", "Requirements scattered across unstructured meeting discussion"],
          ["2", "Inconsistent PRD formats slow engineering estimation"],
          ["3", "Manual breakdown of PRDs into epics and user stories"],
          ["4", "Valuable requirements lost in notes nobody revisits"],
        ]}
      />
      <Card>
        <CardHeader trailing={<Pill active>Highest impact</Pill>}>
          Requirement extraction
        </CardHeader>
        <CardBody>
          <Text>
            Pains 2–4 are downstream of extraction. 6 of 12 baseline tests
            grade this judgment. Errors compound into the PRD, then into
            every story.
          </Text>
        </CardBody>
      </Card>
      <Callout tone="warning" title="Discussion">
        If the AI is wrong, a hallucinated Must-Have ships to engineering.
        That is the signature risk — not latency, not missing a chatbot UI.
      </Callout>
    </Stack>
  );
}

function SlideCharter() {
  return (
    <Stack gap={16}>
      <H2>Vision, objectives, scope</H2>
      <Text>
        Turn scattered discussion into structured, traceable PRDs — every
        requirement grounded in something a stakeholder actually said.
      </Text>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>Objectives</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>Cut time to a first-draft PRD</Text>
              <Text>Standardize the template for estimation</Text>
              <Text>Surface ambiguity before engineering starts</Text>
              <Text>Keep hallucination low enough to trust the draft</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Scope</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>
                Core: Extractor, PRD Generator, Story Breakdown
              </Text>
              <Text>Extended (live): Gap Analyzer</Text>
              <Text>
                Backlog extra: Size Estimator after stories (T-shirt)
              </Text>
              <Text>
                Out: fine-tune, RAG, HITL UI, live Jira/Docs
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <Callout tone="neutral" title="Discussion">
        Gap Analyzer is the scored +8 (ADR-002). Size Estimator is a later
        fifth agent after stories — useful, not graded by T1–T12. Do not
        present it as if it is already built.
      </Callout>
    </Stack>
  );
}

function SlideArchitecture() {
  return (
    <Stack gap={16}>
      <H2>Sequential pipeline + one early branch</H2>
      <Grid columns={4} gap={12}>
        <Card>
          <CardHeader>Extractor</CardHeader>
          <CardBody>
            <Text size="small">Stated vs ambiguous. gpt-4o.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Gap Analyzer</CardHeader>
          <CardBody>
            <Text size="small">Questions, not answers. Parallel.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>PRD Generator</CardHeader>
          <CardBody>
            <Text size="small">Template fill. No padding.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Story Breakdown</CardHeader>
          <CardBody>
            <Text size="small">Epics, As a, priorities.</Text>
          </CardBody>
        </Card>
      </Grid>
      <Text tone="secondary">
        Input → Extractor → Gap (terminal questions) and PRD → stories
        (terminal PRD + stories). Re-runs start at Extractor.
      </Text>
      <Callout tone="info" title="ADR-004 — say why, not just the name">
        Gap sits after extraction, not after stories. Ambiguity that waits
        until stories has already been rewritten twice. The branch is not a
        gate: PRD still runs so T11/T12 can score.
      </Callout>
    </Stack>
  );
}

function SlideTools() {
  return (
    <Stack gap={16}>
      <H2>Split-model design</H2>
      <Table
        headers={["Category", "Choice", "Why"]}
        rows={[
          [
            "Platform",
            "n8n (IK Cloud) now",
            "Cohort received n8n. 6 Sep: n8n→LangFlow JSON export is broken.",
          ],
          [
            "Extractor / Gap",
            "gpt-4o (ADR-003)",
            "Judgment. 6/12 tests. Live Gap is still gpt-4o-mini — call that out.",
          ],
          [
            "PRD / stories",
            "gpt-4o-mini",
            "Format from grounded data. Live PRD is still gpt-4o.",
          ],
          [
            "Observability",
            "Langfuse EU v4 OTLP",
            "Per-agent generations before the first scored run.",
          ],
        ]}
      />
      <Callout tone="neutral" title="Discussion">
        Facilitator: any stack is fine. We started on n8n because IK gave
        the account. 6 Sep: n8n→LangFlow JSON export is broken. Do not
        promise an import. Do not say we downgraded from LangFlow.
      </Callout>
    </Stack>
  );
}

function SlidePrompts() {
  return (
    <Stack gap={16}>
      <H2>Every agent: ROLE / INPUT / OUTPUT / RULES</H2>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>Vague-input rule</CardHeader>
          <CardBody>
            <Text>
              If the input cannot determine X, write UNKNOWN. Do not invent
              X. Evidence quote or it does not ship.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>What T2 / T5 / T9 actually test</CardHeader>
          <CardBody>
            <Text>
              Most hallucination is an agent that was never told what to do
              with insufficient information. Same rule on all four agents.
            </Text>
          </CardBody>
        </Card>
      </Grid>
      <Callout tone="warning" title="Discussion">
        Also: never pick a side on T3/T6. Never pad empty PRD sections.
        Copy T4 ACs verbatim. Size Estimator, if added later, must use the
        same UNKNOWN rule — no invented story points.
      </Callout>
    </Stack>
  );
}

function SlideBaseline() {
  return (
    <Stack gap={16}>
      <H2>Baseline complete, Gap Analyzer live</H2>
      <Grid columns={4} gap={12}>
        <Stat value="12 / 12" label="T1–T12 Pass (Extractor / PRD / stories)" />
        <Stat value="6 / 6" label="Gap Pass (T2 T3 T5 T6 T9 T10)" />
        <Stat value="20%" label="Hallucination · EVAL mean" tone="warning" />
        <Stat value="19%" label="Completeness · EVAL mean" />
      </Grid>
      <Text size="small" tone="secondary">
        Source: Langfuse project my-capstone-prd-genie · past 1 day · n=175
        observations · NUMERIC 0–1. Mean score, not % of T-rows that
        passed. Most observations sit in 0.00–0.10; the mean is pulled by a
        tail.
      </Text>
      <Table
        headers={["ID", "Type", "Seam", "Result"]}
        rows={[
          ["T1", "Detailed", "Extractor", "Pass"],
          ["T2", "Vague", "Extractor + Gap", "Pass"],
          ["T3", "Contradictory", "Extractor + Gap", "Pass"],
          ["T4 / T12", "AC / stories", "Extractor + stories", "Pass"],
          ["T5", "Incomplete", "Extractor + Gap", "Pass"],
          ["T6", "Multi-stakeholder", "Extractor + Gap", "Pass"],
          ["T7", "NFR", "Extractor", "Pass (E1b)"],
          ["T8", "Personas", "Extractor", "Pass"],
          ["T9", "Empty", "Extractor + Gap", "Pass"],
          ["T10", "Dependency", "Extractor + Gap", "Pass"],
          ["T11", "PRD", "PRD Generator", "Pass"],
        ]}
        rowTone={[
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
          "success",
        ]}
      />
      <Callout tone="warning" title="Discussion — do not say 0% hallucination">
        Charter target is 0% untraceable items on T1–T12. The 20% figure is
        the Langfuse Hallucination · EVAL mean. Completeness 19% is the
        same kind of judge mean, not “19% of tests passed.”
      </Callout>
    </Stack>
  );
}

function SlideCost() {
  return (
    <Stack gap={16}>
      <H2>Production metrics and cost</H2>
      <Grid columns={3} gap={12}>
        <Stat value="~$0.006" label="Cost per pipeline run" />
        <Stat value="2" label="Expected runs / user / day" />
        <Stat value="~$0.012" label="Cost per user per day" />
      </Grid>
      <Grid columns={3} gap={12}>
        <Stat value="20" label="Users (initial release)" />
        <Stat value="40" label="Runs / day (20 × 2)" />
        <Stat value="~$0.25" label="Cost / day all users" />
      </Grid>
      <Text size="small" tone="secondary">
        tokens × price × volume. Per-run $ is Langfuse totalCost mean of
        six v0.7 traces (T2 T3 T5 T6 T9 T10). Volume 2 drafts/user/day is
        a planning assumption. 22-day month ≈ $5.50 for 20 users.
      </Text>
      <UsageBar
        total={1700}
        topLeftLabel="Mean tokens / run · Langfuse · n=6 full pipelines"
        topRightLabel="~1,700 tokens"
        segments={[
          { id: "judgment", value: 730, color: "blue" },
          { id: "format", value: 970, color: "green" },
        ]}
      />
      <Table
        headers={["Bucket", "Agents", "Mean tokens / run"]}
        rows={[
          ["Judgment", "Extractor + Gap Analyzer", "~730"],
          ["Format", "PRD Generator + Story Breakdown", "~970"],
        ]}
      />
      <Callout tone="neutral" title="Discussion">
        A-priori writeup was ~$0.022 / run → $0.044 / user / day. Live
        actuals are cheaper (short course briefs; Gap on mini). Do not mix
        the two without saying which. Live PRD is still gpt-4o, so T12-length
        runs can approach ~$0.010.
      </Callout>
    </Stack>
  );
}

function SlideNext() {
  const theme = useHostTheme();
  return (
    <Stack gap={16}>
      <H2>What worked, backlog, what's next</H2>
      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>What worked</CardHeader>
          <CardBody>
            <Text>
              Split-model + UNKNOWN caught ambiguity on all six Gap IDs
              before it was treated as committed scope. Four ADRs + RAID.
              Plus the binding problem most pipelines skip: which project
              does this transcript update? (BR-7–10, designed, not built.)
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Not yet in the pack</CardHeader>
          <CardBody>
            <Text>
              Q4 findings page, cost-table overwrite, canvas / in-action
              screenshots, slides polish, 5-min demo.
            </Text>
          </CardBody>
        </Card>
      </Grid>
      <Table
        headers={["Next", "When", "Why"]}
        rows={[
          [
            "Gap Analyzer → gpt-4o",
            "This week",
            "ADR-003. Live node is still mini.",
          ],
          [
            "Size Estimator after stories",
            "After pack / extra",
            "T-shirt US-n. Fifth agent. UNKNOWN if no complexity signal. ADR-002 deferred it for the scored +8 — allowed now as extra.",
          ],
          [
            "LangFlow rebuild",
            "Do not",
            "6 Sep: n8n→LangFlow JSON export is broken. Stay on n8n.",
          ],
          [
            "Human review of Gap questions",
            "Always",
            "Simulated HITL. Re-run from Extractor. No HITL UI in v1.",
          ],
          [
            "Project/PRD classifier + unclassified queue",
            "After R4 / extra",
            "BR-8–10. Registry match ≥95% or halt + PM notify. Never auto-bind two-product transcripts. Not a fifth in-pipeline agent.",
          ],
          [
            "AgentLens drift loop",
            "Post-submission",
            "Charter: this pipeline is the test subject. Invented requirements are semantic drift.",
          ],
        ]}
      />
      <div
        style={{
          padding: 12,
          background: theme.fill.tertiary,
          color: theme.text.secondary,
        }}
      >
        <Text size="small">
          Do not lead with RAG, fine-tune, or a critic agent. Size
          Estimator sits after Story Breakdown so it sizes grounded stories,
          not vague extraction.
        </Text>
      </div>
      <Callout tone="info" title="Discussion — Size Estimator">
        Yes, it can be next as an extra. Course allowed Gap or Scope
        Estimator; we already spent the +8 on Gap. A Size Estimator agent
        after stories (S / M / L / UNKNOWN, evidence from ACs and NFRs) is
        the honest backlog item. Do not invent points for T2/T5/T9. Do not
        build it before the demo and Q4 if the goal is 80/80.
      </Callout>
      <Callout tone="warning" title="Discussion — which project? (say this)">
        Same pipeline for create and update (BR-6). Wrong bind corrupts a
        PRD nobody is reviewing — worse than a missing requirement. Graded
        v1 never guesses: operator sets projectId, or single-context T1–T12
        (BR-7). After R4: registry match, not the model’s self-score
        (BR-9). Below 95% or two products in one transcript → unclassified
        queue + PM notify; do not generate against a guess (BR-10). Do not
        claim the classifier is built.
      </Callout>
    </Stack>
  );
}
