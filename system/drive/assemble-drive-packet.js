/**
 * Classify a PRD Genie run and assemble Google Drive files.
 *
 * n8n Cloud cannot require() this file — keep the Code node
 * "Assemble Drive Packet" in system/workflow.json in sync.
 *
 * This is NOT a fifth agent and NOT BR-8 input routing.
 * It is a deterministic export bucket: Ready vs Unclassified.
 */

const DRIVE_FOLDERS = {
  ready: "1iHpeQq9IUMbkTy9kBZLBqwDVM3uUQefm",
  unclassified: "1fYr-44C3iUejXEjHKFT8GS1irhTughpI",
  root: "1S_vbpfEwSZTmMY5Bcud1cQP3SX7UU8QL",
};

function extractText(out) {
  if (typeof out === "string") return out;
  if (out && typeof out.text === "string") return out.text;
  if (out && typeof out.output === "string") return out.output;
  return JSON.stringify(out ?? "");
}

function sectionAfter(md, heading) {
  const re = new RegExp(
    "##\\s+" + heading + "\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)",
    "i"
  );
  const m = String(md || "").match(re);
  return m ? m[1].trim() : "";
}

function isEmptySection(text) {
  const t = String(text || "")
    .replace(/[*_`]/g, "")
    .trim();
  if (!t) return true;
  if (/^(none|n\/a|n\.a\.|unknown|-|—|–)$/i.test(t)) return true;
  const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
  if (
    lines.length <= 2 &&
    lines.every((l) => /^[-*]\s*(none|n\/a|unknown|—|-)\s*$/i.test(l))
  ) {
    return true;
  }
  return false;
}

function classify(extractor, gap, prd) {
  const reasons = [];
  const extractability = (sectionAfter(gap, "Extractability") || "").toUpperCase();
  const extractLine = extractability.split("\n")[0].trim();
  if (/\bNONE\b/.test(extractLine) || /\bINSUFFICIENT\b/.test(extractLine)) {
    reasons.push("Gap extractability is " + extractLine);
  }
  const questions = sectionAfter(gap, "Clarification questions");
  if (questions && !isEmptySection(questions) && /question:/i.test(questions)) {
    reasons.push("Gap Analyzer produced clarification questions");
  }
  const gapContra = sectionAfter(gap, "Contradictions still unresolved");
  const extContra = sectionAfter(extractor, "Contradictions");
  if (
    (gapContra && !isEmptySection(gapContra)) ||
    (extContra && !isEmptySection(extContra))
  ) {
    reasons.push("Unresolved contradictions");
  }
  if (/\bUNKNOWN\b/.test(extractor)) {
    reasons.push("UNKNOWN present in extraction");
  }
  const openQ =
    sectionAfter(prd, "Open Questions") || sectionAfter(prd, "Open questions");
  if (openQ && !isEmptySection(openQ)) {
    reasons.push("PRD Open Questions is not empty");
  }
  return {
    bucket: reasons.length ? "unclassified" : "ready",
    reasons,
  };
}

function dateStamp(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function buildPacket({ testId, extractor, gap, prd, stories, generatedAt }) {
  const cls = classify(extractor, gap, prd);
  const day = dateStamp(generatedAt);
  const id = testId || "UNKNOWN";
  const runFolderName = day + "_" + id;
  const parentFolderId = DRIVE_FOLDERS[cls.bucket];
  const files = [
    {
      fileName: "00-run-index",
      content: [
        "# PRD Genie run",
        "",
        "- testId: " + id,
        "- bucket: **" + cls.bucket + "**",
        "- generated: " + (generatedAt || new Date().toISOString()),
        "- Drive parent: " +
          (cls.bucket === "ready"
            ? "01-Ready for TPM review"
            : "02-Unclassified - open items"),
        "- Why: " +
          (cls.reasons.length ? cls.reasons.join("; ") : "No open items detected"),
        "- Langfuse: filter tag `" + id + "` on project my-capstone-prd-genie",
        "- Next: " +
          (cls.bucket === "ready"
            ? "TPM reviews 02-prd and 03-user-stories in this folder."
            : "TPM starts with 04-open-items, answers offline, appends to source, re-runs from Extractor."),
        "",
      ].join("\n"),
    },
    {
      fileName: "01-requirement-extraction",
      content: extractor || "UNKNOWN",
    },
    {
      fileName: "02-prd",
      content: prd || "UNKNOWN",
    },
    {
      fileName: "03-user-stories",
      content: stories || "UNKNOWN",
    },
  ];
  if (cls.bucket === "unclassified") {
    files.push({
      fileName: "04-open-items",
      content: [
        "# Open items — do not treat as committed scope",
        "",
        "## Why this run is unclassified",
        cls.reasons.map((r) => "- " + r).join("\n") || "- (none listed)",
        "",
        "## Gap Analyzer output",
        "",
        gap || "UNKNOWN",
        "",
      ].join("\n"),
    });
  }
  return {
    testId: id,
    bucket: cls.bucket,
    reasons: cls.reasons,
    runFolderName,
    parentFolderId,
    files,
  };
}

function n8nReturn() {
  const cfg = $("Input Text").first().json;
  const extractor = extractText($("Requirement Extractor1").first().json);
  const prd = extractText($("PRD Generator").first().json);
  const stories = extractText($("PRD Breakdown Agent").first().json);
  const gap = extractText($("Gap Analyzer Agent").first().json);
  const packet = buildPacket({
    testId: cfg.testId || $("Get row(s) in sheet").first().json.testId || "T1",
    extractor,
    gap,
    prd,
    stories,
    generatedAt: new Date().toISOString(),
  });
  return [{ json: packet }];
}

module.exports = {
  DRIVE_FOLDERS,
  extractText,
  classify,
  buildPacket,
  n8nReturn,
};
