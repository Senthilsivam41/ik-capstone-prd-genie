const test = require("node:test");
const assert = require("node:assert/strict");
const {
  toUnixNano,
  buildOtlpTrace,
  buildN8nOtlpReturn,
} = require("./build-otlp-trace.js");

const FORBIDDEN = [
  "langfuse.trace.input",
  "langfuse.trace.output",
  "trace-create",
  "generation-create",
];

function allAttrKeys(otlp) {
  const keys = [];
  for (const rs of otlp.resourceSpans) {
    for (const ss of rs.scopeSpans) {
      for (const span of ss.spans) {
        for (const a of span.attributes) keys.push(a.key);
      }
    }
  }
  return keys;
}

test("OTLP payload is v4-ready: two spans, I/O on observations, shared tags", () => {
  const { otlp, traceId } = buildOtlpTrace({
    inputText: "The user should be able to filter reports.",
    outputText: "# Extraction\nEXTRACTABLE",
    testId: "T1",
    startTime: "2026-09-05T15:02:17.961Z",
    endTime: "2026-09-05T15:02:26.125Z",
    traceId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rootSpanId: "bbbbbbbbbbbbbbbb",
    generationSpanId: "cccccccccccccccc",
  });

  assert.match(traceId, /^[0-9a-f]{32}$/);
  assert.equal(otlp.resourceSpans.length, 1);

  const spans = otlp.resourceSpans[0].scopeSpans[0].spans;
  assert.equal(spans.length, 2);

  const [root, gen] = spans;
  assert.equal(root.name, "prd-genie-slice1");
  assert.equal(gen.name, "Requirement Extractor");
  assert.equal(gen.parentSpanId, root.spanId);
  assert.equal(root.traceId, gen.traceId);

  const keys = allAttrKeys(otlp);
  for (const bad of FORBIDDEN) {
    assert.equal(keys.includes(bad), false, `must not emit ${bad}`);
  }

  const rootKeys = root.attributes.map((a) => a.key);
  const genKeys = gen.attributes.map((a) => a.key);
  for (const required of [
    "langfuse.trace.name",
    "langfuse.trace.tags",
    "langfuse.release",
    "langfuse.environment",
    "langfuse.trace.metadata.testId",
    "langfuse.observation.input",
    "langfuse.observation.output",
  ]) {
    assert.ok(rootKeys.includes(required), `root missing ${required}`);
    assert.ok(genKeys.includes(required), `generation missing ${required}`);
  }

  assert.equal(
    gen.attributes.find((a) => a.key === "langfuse.observation.type").value.stringValue,
    "generation",
  );
  assert.equal(
    gen.attributes.find((a) => a.key === "langfuse.observation.model.name").value.stringValue,
    "gpt-4o",
  );
  assert.equal(
    toUnixNano("2026-09-05T15:02:17.961Z"),
    String(BigInt(Date.parse("2026-09-05T15:02:17.961Z")) * 1_000_000n),
  );
});

test("core canvas: one generation per agent, root I/O is sheet input → last output", () => {
  const { otlp } = buildOtlpTrace({
    inputText: "T1 brief",
    outputText: "# Story breakdown",
    testId: "T12",
    traceId: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    rootSpanId: "bbbbbbbbbbbbbbbb",
    generationSpanIds: ["1111111111111111", "2222222222222222", "3333333333333333"],
    agents: [
      { name: "Requirement Extractor", model: "gpt-4o", input: "T1 brief", output: "# Extraction" },
      { name: "PRD Generator", model: "gpt-4o", input: "# Extraction", output: "# PRD" },
      { name: "Story Breakdown", model: "gpt-4o-mini", input: "# PRD", output: "# Story breakdown" },
    ],
  });
  const spans = otlp.resourceSpans[0].scopeSpans[0].spans;
  assert.equal(spans.length, 4);
  assert.equal(spans[0].name, "prd-genie-slice1");
  assert.equal(spans[1].name, "Requirement Extractor");
  assert.equal(spans[2].name, "PRD Generator");
  assert.equal(spans[3].name, "Story Breakdown");
  assert.equal(
    spans[3].attributes.find((a) => a.key === "langfuse.observation.model.name").value.stringValue,
    "gpt-4o-mini",
  );
});

test("n8n wrapper reads chatInput and chain text, not a JSON dump of $json", () => {
  const row = buildN8nOtlpReturn({
    src: {
      chatInput: "We need better reporting.",
      testId: "T2",
      startTime: "2026-09-05T10:50:39.287Z",
    },
    out: { text: "## Missing information\n- Metrics: UNKNOWN" },
  });

  assert.equal(row.testId, "T2");
  assert.equal(row.extractorOutput.startsWith("## Missing"), true);
  assert.equal(row.batch, undefined);

  const gen = row.otlp.resourceSpans[0].scopeSpans[0].spans[1];
  const input = gen.attributes.find((a) => a.key === "langfuse.observation.input").value.stringValue;
  assert.equal(input, "We need better reporting.");
  assert.equal(input.includes("{"), false);
});
