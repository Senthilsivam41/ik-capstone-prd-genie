import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  UsageBar,
  useHostTheme,
} from "cursor/canvas";

const LINE_ROWS = [
  ["Q1 Ideation", "15", "15", "charter.md §Q1 — four pains with I/O and risk"],
  ["Q2 Programme charter", "15", "15", "Charter + RAID + four ADRs"],
  ["Q3 Design / rationale", "10", "10", "Writeup + PNG + pattern justified"],
  ["Q3 Core e2e", "12", "0", "Prompts only; workflow.json is a stub"],
  ["Q3 Extended (Gap Analyzer)", "8", "0", "Designed; TDD blocks wiring until core is green"],
  ["Q3 Observability", "5", "0", "Langfuse named; no traces"],
  ["Q3 Baseline documented", "5", "0", "T1–T12 still Not run"],
  ["Q3 Cost + eval strategy", "5", "4", " $/user/day + 3 metrics; no Langfuse actuals"],
  ["Q4 Reflection", "5", "2", "Risks + method; no trace findings"],
];

const PACK_ROWS = [
  ["README, .gitignore, no .env", "Pass"],
  ["Architecture diagram (PNG)", "Pass"],
  ["1–2 page write-up + cost formula", "Pass"],
  ["Q1–Q2 assignment answers", "Pass"],
  ["LangFlow JSON export", "Fail"],
  ["Baseline outputs for 12 inputs", "Fail"],
  ["Screenshots (canvas / run / traces)", "Fail"],
  ["Slide deck .pptx", "Fail"],
  ["5-minute demo URL", "Fail"],
];

export default function PrdGenieCompletion() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 24 }}>
      <Stack gap={8}>
        <Text size="small" tone="secondary" weight="medium">
          Rubric completion audit · 30 Aug 2026 · documentation only
        </Text>
        <H1>46 of 80 points earned</H1>
        <Text tone="secondary">
          Grader-conservative. Credit only what a TA can mark from GitHub
          without a live canvas. Written work is complete. The 45-point
          build is almost entirely unearned.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="46" label="Earned / 80" tone="warning" />
        <Stat value="30/30" label="Q1 + Q2 written" tone="success" />
        <Stat value="10/10" label="Q3 design" tone="success" />
        <Stat value="0/30" label="Core + ext + obs + baseline" tone="danger" />
      </Grid>

      <UsageBar
        total={80}
        topLeftLabel="Earned 46 · Remaining 34"
        topRightLabel="Source: docs/rubric-evaluation.md"
        segments={[
          { id: "written", value: 30, color: "green" },
          { id: "design", value: 10, color: "blue" },
          { id: "cost", value: 4, color: "yellow" },
          { id: "q4", value: 2, color: "orange" },
        ]}
      />

      <Callout tone="warning" title="Do not write more docs to chase 80">
        Next scored move is TDD: Langfuse on, then Extractor until T1 is
        green in evidence/baseline-results.md. Fine-tuning and a fifth
        agent add zero points until that is done.
      </Callout>

      <Stack gap={8}>
        <H2>Line items vs this repo</H2>
        <Text size="small" tone="secondary">
          PRD Genie split only. Max is 80. Evidence is the artefact a
          grader would open.
        </Text>
        <Table
          headers={["Component", "Max", "Earned", "Evidence / gap"]}
          rows={LINE_ROWS}
          rowTone={[
            "success",
            "success",
            "success",
            "danger",
            "danger",
            "danger",
            "danger",
            "warning",
            "warning",
          ]}
        />
      </Stack>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>How 46 is composed</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Row justify="space-between">
                <Text>Q1 Ideation</Text>
                <Text weight="semibold">15</Text>
              </Row>
              <Row justify="space-between">
                <Text>Q2 Charter (RAID + ADRs)</Text>
                <Text weight="semibold">15</Text>
              </Row>
              <Row justify="space-between">
                <Text>Q3 Design + diagram + why sequential</Text>
                <Text weight="semibold">10</Text>
              </Row>
              <Row justify="space-between">
                <Text>Q3 Cost + eval strategy (no actuals)</Text>
                <Text weight="semibold">4</Text>
              </Row>
              <Row justify="space-between">
                <Text>Q4 risks + method, no findings</Text>
                <Text weight="semibold">2</Text>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Text>Running system (core, gaps, traces, T1–T12)</Text>
                <Text weight="semibold">0</Text>
              </Row>
            </Stack>
          </CardBody>
        </Card>

        <Stack gap={12}>
          <H3>Submission pack blockers</H3>
          <Table
            headers={["Pack item", "Status"]}
            rows={PACK_ROWS}
            rowTone={PACK_ROWS.map((row) =>
              row[1] === "Pass" ? "success" : "danger",
            )}
          />
        </Stack>
      </Grid>

      <Stack gap={8}>
        <H2>Points still on the table (TDD order)</H2>
        <Table
          headers={["Next slice", "Pts", "Done when"]}
          rows={[
            [
              "Langfuse connected before first run",
              "+5",
              "Per-agent traces + tokens visible",
            ],
            [
              "Extractor → T1 green, then PRD + stories e2e",
              "+12",
              "Core capabilities actually execute",
            ],
            [
              "Paste all 12 outputs as you run them",
              "+5",
              "baseline-results.md no longer Not run",
            ],
            [
              "Gap Analyzer after core IDs are green",
              "+8",
              "Clarification questions on T2/T5/T9",
            ],
            ["Overwrite cost table from traces", "+1", "4 → 5 on cost line"],
            ["One-page trace findings", "+3", "Q4 2 → 5"],
          ]}
        />
      </Stack>

      <Text size="small" style={{ color: theme.text.tertiary }}>
        Durable copy: docs/rubric-evaluation.md · Rubric law: docs/rubric.md
      </Text>
    </Stack>
  );
}
