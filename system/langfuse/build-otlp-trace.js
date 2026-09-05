/**
 * Build a Langfuse v4 OTLP/HTTP JSON payload for Slice 1.
 *
 * Replaces legacy POST /api/public/ingestion { trace-create, generation-create }.
 * n8n Cloud cannot require() this file — keep the Code node in
 * system/workflow.json in sync with buildN8nOtlpReturn() below.
 *
 * Docs: https://langfuse.com/integrations/native/opentelemetry/migration-to-v4
 */

function hex32() {
  let out = "";
  for (let i = 0; i < 32; i += 1) {
    out += Math.floor(Math.random() * 16).toString(16);
  }
  return out;
}

function hex16() {
  return hex32().slice(0, 16);
}

function toUnixNano(iso) {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) {
    throw new Error(`Invalid ISO timestamp: ${iso}`);
  }
  return String(BigInt(ms) * 1_000_000n);
}

function strAttr(key, value) {
  return { key, value: { stringValue: String(value) } };
}

function arrAttr(key, values) {
  return {
    key,
    value: {
      arrayValue: {
        values: values.map((v) => ({ stringValue: String(v) })),
      },
    },
  };
}

function sharedTraceAttrs({ traceName, tags, testId, release, environment, platform }) {
  return [
    strAttr("langfuse.trace.name", traceName),
    arrAttr("langfuse.trace.tags", tags),
    strAttr("langfuse.release", release),
    strAttr("langfuse.environment", environment),
    strAttr("langfuse.trace.metadata.testId", testId),
    strAttr("langfuse.trace.metadata.release", release),
    strAttr("langfuse.trace.metadata.platform", platform),
  ];
}

function buildOtlpTrace({
  inputText,
  outputText,
  testId = "T1",
  agentName = "Requirement Extractor",
  model = "gpt-4o",
  agents,
  startTime,
  endTime,
  environment = "prd-genie-capstone",
  release = "R1",
  platform = "n8n-ik-cloud",
  traceName = "prd-genie-slice1",
  traceId = hex32(),
  rootSpanId = hex16(),
  generationSpanId = hex16(),
  generationSpanIds,
} = {}) {
  const agentList =
    Array.isArray(agents) && agents.length > 0
      ? agents
      : [{ name: agentName, model, input: inputText, output: outputText }];
  const rootInput = typeof inputText === "string" ? inputText : agentList[0].input;
  const rootOutput =
    typeof outputText === "string" ? outputText : agentList[agentList.length - 1].output;
  if (typeof rootInput !== "string" || typeof rootOutput !== "string") {
    throw new Error("inputText and outputText must be strings");
  }
  if (!/^[0-9a-f]{32}$/.test(traceId)) {
    throw new Error("traceId must be 32 lowercase hex chars");
  }
  if (!/^[0-9a-f]{16}$/.test(rootSpanId)) {
    throw new Error("span IDs must be 16 lowercase hex chars");
  }

  const start = startTime || new Date().toISOString();
  const end = endTime || start;
  const startNano = toUnixNano(start);
  const endNano = toUnixNano(end);
  const tags = ["prd-genie", "slice1", testId];
  const shared = sharedTraceAttrs({
    traceName,
    tags,
    testId,
    release,
    environment,
    platform,
  });

  const rootSpan = {
    traceId,
    spanId: rootSpanId,
    name: traceName,
    kind: 1,
    startTimeUnixNano: startNano,
    endTimeUnixNano: endNano,
    attributes: [
      ...shared,
      strAttr("langfuse.observation.type", "span"),
      strAttr("langfuse.observation.input", rootInput),
      strAttr("langfuse.observation.output", rootOutput),
    ],
  };

  const ids = generationSpanIds || [generationSpanId, ...agentList.slice(1).map(() => hex16())];
  const generationSpans = agentList.map((agent, i) => {
    const spanId = ids[i] || hex16();
    if (!/^[0-9a-f]{16}$/.test(spanId)) {
      throw new Error("span IDs must be 16 lowercase hex chars");
    }
    return {
      traceId,
      spanId,
      parentSpanId: rootSpanId,
      name: agent.name,
      kind: 1,
      startTimeUnixNano: startNano,
      endTimeUnixNano: endNano,
      attributes: [
        ...shared,
        strAttr("langfuse.observation.type", "generation"),
        strAttr("langfuse.observation.input", agent.input),
        strAttr("langfuse.observation.output", agent.output),
        strAttr("langfuse.observation.model.name", agent.model),
        strAttr("gen_ai.request.model", agent.model),
        strAttr("langfuse.observation.metadata.testId", testId),
        strAttr("langfuse.observation.metadata.agent", agent.name),
      ],
    };
  });

  const otlp = {
    resourceSpans: [
      {
        resource: {
          attributes: [
            strAttr("service.name", "prd-genie"),
            strAttr("service.version", release),
          ],
        },
        scopeSpans: [
          {
            scope: { name: "prd-genie-n8n", version: "v4" },
            spans: [rootSpan, ...generationSpans],
          },
        ],
      },
    ],
  };

  return { otlp, traceId, testId };
}

function extractOutputText(out) {
  if (typeof out === "string") return out;
  if (out && typeof out.text === "string") return out.text;
  if (out && typeof out.output === "string") return out.output;
  return JSON.stringify(out);
}

function buildN8nOtlpReturn({ src, out }) {
  const outputText = extractOutputText(out);
  const inputText = typeof src.chatInput === "string" ? src.chatInput : "";
  const built = buildOtlpTrace({
    inputText,
    outputText,
    testId: src.testId || "T1",
    startTime: src.startTime,
    endTime: new Date().toISOString(),
  });
  return {
    otlp: built.otlp,
    traceId: built.traceId,
    testId: built.testId,
    extractorOutput: outputText,
  };
}

module.exports = {
  hex16,
  hex32,
  toUnixNano,
  strAttr,
  arrAttr,
  buildOtlpTrace,
  extractOutputText,
  buildN8nOtlpReturn,
};
