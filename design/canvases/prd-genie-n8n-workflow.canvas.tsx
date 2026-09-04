import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
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
  TodoListCard,
  computeDAGLayout,
  useHostTheme,
  useMemo,
} from "cursor/canvas";

const NODES = [
  { id: "trigger", label: "Manual Trigger", sub: "When clicking Test workflow" },
  { id: "set", label: "Edit Fields", sub: "transcript = pasted text" },
  { id: "extractor", label: "Basic LLM Chain", sub: "Extractor · gpt-4o" },
  { id: "gap", label: "Basic LLM Chain", sub: "Gap Analyzer · gpt-4o" },
  { id: "prd", label: "Basic LLM Chain", sub: "PRD Generator · gpt-4o-mini" },
  { id: "stories", label: "Basic LLM Chain", sub: "Story Breakdown · gpt-4o-mini" },
  { id: "merge", label: "Merge", sub: "questions + PRD + stories" },
];

const EDGES = [
  { from: "trigger", to: "set" },
  { from: "set", to: "extractor" },
  { from: "extractor", to: "gap" },
  { from: "extractor", to: "prd" },
  { from: "prd", to: "stories" },
  { from: "gap", to: "merge" },
  { from: "stories", to: "merge" },
];

const FULL_TIER = new Set(["extractor", "gap"]);
const MINI_TIER = new Set(["prd", "stories"]);

const NODE_TABLE = [
  [
    "1",
    "Manual Trigger",
    "When clicking ‘Test workflow’",
    "—",
    "Start. No webhook.",
  ],
  [
    "2",
    "Edit Fields",
    "Name: Input",
    "—",
    "One string field transcript. Paste T1 / Transcript 1 here.",
  ],
  [
    "3",
    "Basic LLM Chain",
    "Name: Requirement Extractor",
    "gpt-4o",
    "System = design/agents/requirement-extractor.md. User = {{ $json.transcript }}",
  ],
  [
    "3b",
    "OpenAI Chat Model",
    "Sub-node under Extractor",
    "gpt-4o",
    "Credential: OpenAI account (IK). Attach under the chain, not as a separate main-path node.",
  ],
  [
    "3c",
    "HTTP Request",
    "Name: Langfuse Extractor",
    "—",
    "POST https://cloud.langfuse.com/api/public/ingestion after the Extractor. Do this before the first green T1.",
  ],
  [
    "4",
    "Basic LLM Chain",
    "Name: PRD Generator",
    "gpt-4o-mini",
    "Only after T1 is green. System = prd-generator.md + prd_template.md. User = Extractor markdown.",
  ],
  [
    "5",
    "Basic LLM Chain",
    "Name: Story Breakdown",
    "gpt-4o-mini",
    "User = PRD markdown. Copy T4 ACs verbatim.",
  ],
  [
    "6",
    "Basic LLM Chain",
    "Name: Gap Analyzer",
    "gpt-4o",
    "Parallel with PRD, not after stories. System = gap-analyzer.md. User = Extractor markdown.",
  ],
  [
    "7",
    "Merge",
    "Combine both terminals",
    "—",
    "Output two blocks: clarification questions, then PRD + stories.",
  ],
];

const SLICE_TODOS = [
  {
    id: "s0",
    content:
      "Slice 0 — Langfuse HTTP after Extractor (host cloud.langfuse.com). Observability before the first successful run.",
    status: "pending" as const,
  },
  {
    id: "s1",
    content:
      "Slice 1 — Trigger → Edit Fields → Extractor (gpt-4o) only. Run Transcript 1 / T1. Paste output in evidence/baseline-results.md.",
    status: "in_progress" as const,
  },
  {
    id: "s2",
    content:
      "Slice 2 — PRD Generator (gpt-4o-mini) → Story Breakdown (gpt-4o-mini). T11 then T12.",
    status: "pending" as const,
  },
  {
    id: "s3",
    content:
      "Slice 3 — Gap Analyzer branch off Extractor (gpt-4o), Merge both terminals. T2/T3/T5/T6/T9/T10.",
    status: "pending" as const,
  },
];

export default function PrdGenieN8nWorkflow() {
  const theme = useHostTheme();
  const layout = useMemo(
    () =>
      computeDAGLayout({
        nodes: NODES.map((n) => ({ id: n.id })),
        edges: EDGES,
        direction: "vertical",
        nodeWidth: 188,
        nodeHeight: 58,
        rankGap: 52,
        nodeGap: 36,
        padding: 12,
      }),
    [],
  );
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <Stack gap={24} style={{ padding: 24 }}>
      <Stack gap={8}>
        <Text size="small" tone="secondary" weight="medium">
          n8n build map · IK Cloud · sequential + one branch (ADR-001 / ADR-004)
        </Text>
        <H1>PRD Genie — n8n canvas to build</H1>
        <Text tone="secondary">
          Search these exact node names in Add node. Do not use AI Agent with
          tools — these four steps are prompt-only chains. Build Slice 1 until
          T1 is green; the full graph is the target, not the first commit.
        </Text>
      </Stack>

      <Row gap={16} wrap>
        <Stat value="7" label="Main-path nodes" />
        <Stat value="1" label="Branch after Extractor" />
        <Stat value="Slice 1" label="Start here" tone="warning" />
      </Row>

      <Callout tone="warning" title="TDD — do not wire all four agents tonight">
        Extractor on Transcript 1 first. PRD, stories, and Gap Analyzer stay
        off the canvas until that output is pasted as Pass in
        evidence/baseline-results.md. Extra critic nodes are out of scope.
      </Callout>

      <Stack gap={8}>
        <H2>Target graph</H2>
        <Text size="small" tone="secondary">
          Full-tier boxes (Extractor, Gap Analyzer) use gpt-4o. Mini-tier
          (PRD, stories) use gpt-4o-mini. Gap Analyzer is a sibling of PRD
          Generator, not a step after stories.
        </Text>
        <svg
          width="100%"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          role="img"
          aria-label="n8n node graph: trigger to set to extractor, then branch to gap analyzer and PRD generator, stories after PRD, merge both terminals"
        >
          {layout.ranks.map((rank) => (
            <rect
              key={rank.rank}
              x={rank.x}
              y={rank.y}
              width={rank.width}
              height={rank.height}
              fill={theme.fill.quaternary}
              rx={6}
            />
          ))}
          {layout.edges.map((edge) => (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={edge.sourceX}
              y1={edge.sourceY}
              x2={edge.targetX}
              y2={edge.targetY}
              stroke={theme.stroke.secondary}
              strokeWidth={1.5}
            />
          ))}
          {layout.nodes.map((node) => {
            const meta = byId[node.id];
            const fill = FULL_TIER.has(node.id)
              ? theme.fill.tertiary
              : MINI_TIER.has(node.id)
                ? theme.fill.secondary
                : theme.bg.elevated;
            const stroke = FULL_TIER.has(node.id)
              ? theme.accent.primary
              : theme.stroke.secondary;
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={188}
                  height={58}
                  rx={6}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={FULL_TIER.has(node.id) ? 1.5 : 1}
                />
                <text
                  x={node.x + 94}
                  y={node.y + 24}
                  textAnchor="middle"
                  fill={theme.text.primary}
                  fontSize={12}
                  fontWeight={590}
                >
                  {meta.label}
                </text>
                <text
                  x={node.x + 94}
                  y={node.y + 42}
                  textAnchor="middle"
                  fill={theme.text.secondary}
                  fontSize={10}
                >
                  {meta.sub}
                </text>
              </g>
            );
          })}
        </svg>
        <Row gap={12} wrap>
          <Text size="small" tone="secondary">
            Accent stroke = full-tier judgment
          </Text>
          <Text size="small" tone="secondary">
            Neutral fill = mini-tier formatting
          </Text>
        </Row>
      </Stack>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader trailing={<Pill size="sm" active>Now</Pill>}>
            Slice 1 only
          </CardHeader>
          <CardBody>
            <Stack gap={8}>
              <Text>
                Manual Trigger → Edit Fields → Basic LLM Chain (Extractor) →
                HTTP Request (Langfuse). Stop. Run Transcript 1.
              </Text>
              <Text size="small" tone="secondary">
                If n8n has no “Basic LLM Chain”, use “LLM Chain” or “AI
                Agent” with zero tools. Same system prompt.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <TodoListCard todos={SLICE_TODOS} defaultExpanded />
      </Grid>

      <Stack gap={8}>
        <H2>Add these nodes in n8n</H2>
        <Table
          headers={["#", "Search for", "Rename to", "Model", "What to paste / wire"]}
          rows={NODE_TABLE}
          striped
          rowTone={[
            "info",
            "info",
            "warning",
            "warning",
            "warning",
            "neutral",
            "neutral",
            "neutral",
            "neutral",
          ]}
        />
      </Stack>

      <Stack gap={8}>
        <H2>Prompt and model per agent</H2>
        <Grid columns={2} gap={12}>
          <Card>
            <CardHeader>Requirement Extractor</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">
                  File: <Code>design/agents/requirement-extractor.md</Code>
                </Text>
                <Text size="small">
                  Model: gpt-4o. Output markdown sections Extraction /
                  Stated / Ambiguous / Contradictions. UNKNOWN if not in
                  the input.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>PRD Generator</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">
                  File: <Code>design/agents/prd-generator.md</Code> plus{" "}
                  <Code>system/prd_template.md</Code> as context.
                </Text>
                <Text size="small">
                  Model: gpt-4o-mini. Empty sections stay under Open
                  Questions. Do not pad.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Story Breakdown</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">
                  File: <Code>design/agents/story-breakdown.md</Code>
                </Text>
                <Text size="small">
                  Model: gpt-4o-mini. As a [persona]. Copy acceptance
                  criteria verbatim (T4 / T12).
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Gap Analyzer</CardHeader>
            <CardBody>
              <Stack gap={6}>
                <Text size="small">
                  File: <Code>design/agents/gap-analyzer.md</Code>
                </Text>
                <Text size="small">
                  Model: gpt-4o. Questions only. Never invent answers.
                  Branch off Extractor, not after stories (ADR-004).
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Stack>

      <Divider />

      <Stack gap={8}>
        <H3>Do not add</H3>
        <Text>
          Router, supervisor, quality-checker, confidence scorer, RAG,
          memory, or HITL wait nodes. Clarification questions are a
          terminal output; the PM answers offline and re-runs from the
          Extractor.
        </Text>
        <Text size="small" tone="secondary">
          Instance: agenticai100.app.n8n.cloud · Langfuse host:
          https://cloud.langfuse.com · Credential already in n8n: OpenAI
          account (IK).
        </Text>
      </Stack>
    </Stack>
  );
}
