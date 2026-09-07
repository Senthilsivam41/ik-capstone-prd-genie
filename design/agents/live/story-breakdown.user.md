=PRD (from PRD Generator):
{{ $json.text }}

---
Gap analysis (from Gap Analyzer Agent, for traceability only — never a source of new stories):
{{ $("Gap Analyzer Agent").first().json.text }}
