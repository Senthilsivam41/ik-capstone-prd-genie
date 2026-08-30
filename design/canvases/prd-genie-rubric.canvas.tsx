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

const ROWS = [
  ["Q1 Ideation", "15", "docs/charter.md §Q1", "Drafted"],
  ["Q2 Programme charter", "15", "charter + RAID + ADRs", "Drafted"],
  ["Q3 Design / rationale", "10", "writeup + SVG + ADRs", "Drafted"],
  ["Q3 Core capabilities", "12", "Extractor → PRD → stories", "Prompts only"],
  ["Q3 Extended (Gap Analyzer)", "8", "ADR-002 / ADR-004", "Designed, not wired"],
  ["Q3 Observability", "5", "Langfuse per-agent traces", "Not connected"],
  ["Q3 Baseline dataset", "5", "T1–T12 with outputs", "File in repo, not run"],
  ["Q3 Cost + eval strategy", "5", "tokens × price × volume / user / day", "A priori table"],
  ["Q4 Reflection", "5", "docs/reflection.md", "Method only"],
];

export default function PrdGenieRubric() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ padding: 24 }}>
      <Stack gap={8}>
        <Text size="small" tone="secondary" weight="medium">
          PRD Genie · NeuronForge · Session 1 rubric × problem statement
        </Text>
        <H1>Official scoring is 80 points, not 100</H1>
        <Text tone="secondary">
          CalendarMate and Mira use charter 25 + reflection 15. PRD Genie
          uses charter 15 + reflection 5. Using the wrong split pads the
          wrong artefacts and under-invests in the 45-point build.
        </Text>
      </Stack>

      <Grid columns={4} gap={16}>
        <Stat value="80" label="Total (PRD Genie)" />
        <Stat value="45" label="Build (Q3)" tone="info" />
        <Stat value="30" label="Ideation + charter" />
        <Stat value="5" label="Reflection (Q4)" />
      </Grid>

      <UsageBar
        total={80}
        topLeftLabel="Written 30 · Build 45 · Reflection 5"
        topRightLabel="80 pts"
        segments={[
          { id: "written", value: 30, color: "blue" },
          { id: "build", value: 45, color: "green" },
          { id: "reflection", value: 5, color: "orange" },
        ]}
      />

      <Callout tone="warning" title="Do not mix project rubrics">
        SalesGenie has no charter (stakeholders/benefits 10, total 80). PRD
        Genie and SalesGenie both require a 5-minute demo video.
        CalendarMate and Mira do not. Fine-tuning is optional on all four
        and never required.
      </Callout>

      <Stack gap={8}>
        <H2>Line items vs this repo</H2>
        <Text size="small" tone="secondary">
          Source: Capstone Session 1, “Point allocation by project” and
          problem-statement Q1–Q4. Status is current pack state, 30 Aug 2026.
        </Text>
        <Table
          headers={["Component", "Pts", "Artefact", "Status"]}
          rows={ROWS}
          rowTone={ROWS.map((row) =>
            row[3] === "Drafted"
              ? "success"
              : row[3] === "Prompts only" || row[3] === "Designed, not wired" || row[3] === "A priori table" || row[3] === "Method only"
                ? "warning"
                : "danger",
          )}
        />
      </Stack>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>Inside the 45-point build</CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Row justify="space-between">
                <Text>Design and rationale</Text>
                <Text weight="semibold">10</Text>
              </Row>
              <Row justify="space-between">
                <Text>Core capabilities end-to-end</Text>
                <Text weight="semibold">12</Text>
              </Row>
              <Row justify="space-between">
                <Text>Extended capability</Text>
                <Text weight="semibold">8</Text>
              </Row>
              <Row justify="space-between">
                <Text>Observability connected</Text>
                <Text weight="semibold">5</Text>
              </Row>
              <Row justify="space-between">
                <Text>Baseline documented</Text>
                <Text weight="semibold">5</Text>
              </Row>
              <Row justify="space-between">
                <Text>Cost + evaluation strategy</Text>
                <Text weight="semibold">5</Text>
              </Row>
              <Divider />
              <Text size="small" tone="secondary">
                Pattern must be justified. Cost is tokens × price × daily
                volume, reported per user per day. Name ≥3 production
                metrics from this failure mode: invented requirements.
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Stack gap={16}>
          <H3>Where marks are lost</H3>
          <Table
            headers={["Mistake", "PRD Genie counter"]}
            rows={[
              [
                "Build all agents at once",
                "Extractor thin slice on Transcript 1",
              ],
              [
                "No hallucination guardrail",
                "UNKNOWN in every agent spec",
              ],
              [
                "Baseline not documented",
                "Fill evidence/baseline-results.md as you run",
              ],
              [
                "Pattern named, not justified",
                "ADR-001: sequential because stages are shared",
              ],
              [
                "No cost analysis",
                "~$0.044 / user / day at 2 PRDs/PM",
              ],
              [
                "Observability last",
                "Langfuse before first successful run",
              ],
            ]}
          />
        </Stack>
      </Grid>

      <Stack gap={8}>
        <H2>Eval method (Agent Eval Fundamentals)</H2>
        <Text tone="secondary">
          Not extra rubric rows. This is the language Q3 traces and the
          5-point reflection have to use.
        </Text>
        <Grid columns={3} gap={12}>
          <Card>
            <CardHeader trailing={<Pill tone="neutral" size="sm">Pillar</Pill>}>
              Observability
            </CardHeader>
            <CardBody>
              <Text size="small">
                Logs (diary), traces (story), metrics (scorecard). Catalog
                the first failure in the chain, not the last bad markdown.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="neutral" size="sm">Metrics</Pill>}>
              Three families
            </CardHeader>
            <CardBody>
              <Text size="small">
                Operational (tokens, latency, steps). Effectiveness
                (groundedness, completeness). Trustworthiness (do not
                invent scope).
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill tone="neutral" size="sm">Loop</Pill>}>
              One change, repeat
            </CardHeader>
            <CardBody>
              <Text size="small">
                Prompt → model → architecture → config → fine-tune. Repeat
                the same experiment; keep it only if the gain is consistent.
              </Text>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Text size="small" style={{ color: theme.text.tertiary }}>
        Locked from Capstone Session 1 (slides 31–35) and the PRD Genie
        problem statement. Durable copy: docs/rubric.md
      </Text>
    </Stack>
  );
}
