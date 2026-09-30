<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Prompt Control

Prompt control (historical S6): removes honesty/amnesty/threat and survival-score pressure. Normal/high worker text is identical.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [control-all-summary.json](control-all-summary.json) | Counts from saved raw truth/key flags |
| [control-all-questions.json](control-all-questions.json) | Runner / questions / audit evidence |
| [control-all-raw.jsonl](control-all-raw.jsonl) | Canonical original rows |
| [control-all-report.jsonl](control-all-report.jsonl) | Runner / questions / audit evidence |
| [control-all-script.js](control-all-script.js) | Runner / questions / audit evidence |
| [control-high-raw.jsonl](control-high-raw.jsonl) | Exact-line arm browsing subset |
| [control-no-monitor-raw.jsonl](control-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [control-normal-raw.jsonl](control-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
