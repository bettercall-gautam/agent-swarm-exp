<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Knowledge

Original strict knowledge session (historical B): 10 questions per arm.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [knowledge-all-summary.json](knowledge-all-summary.json) | Counts from saved raw truth/key flags |
| [knowledge-all-questions.json](knowledge-all-questions.json) | Runner / questions / audit evidence |
| [knowledge-all-raw.jsonl](knowledge-all-raw.jsonl) | Canonical original rows |
| [knowledge-high-raw.jsonl](knowledge-high-raw.jsonl) | Exact-line arm browsing subset |
| [knowledge-no-monitor-raw.jsonl](knowledge-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [knowledge-no-monitor-report.jsonl](knowledge-no-monitor-report.jsonl) | Runner / questions / audit evidence |
| [knowledge-normal-raw.jsonl](knowledge-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 30. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
