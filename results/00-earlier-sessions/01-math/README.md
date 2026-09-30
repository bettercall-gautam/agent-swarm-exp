<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Math

Original strict math session (historical A): 10 questions in each of normal/high/no-monitor arms.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [math-all-summary.json](math-all-summary.json) | Counts from saved raw truth/key flags |
| [math-all-questions.json](math-all-questions.json) | Runner / questions / audit evidence |
| [math-all-raw.jsonl](math-all-raw.jsonl) | Canonical original rows |
| [math-high-raw.jsonl](math-high-raw.jsonl) | Exact-line arm browsing subset |
| [math-no-monitor-raw.jsonl](math-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [math-no-monitor-report.jsonl](math-no-monitor-report.jsonl) | Runner / questions / audit evidence |
| [math-normal-raw.jsonl](math-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 30. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
