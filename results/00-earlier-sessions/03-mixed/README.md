<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Mixed

Original strict mixed session (historical C): 10 questions per arm.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [mixed-all-summary.json](mixed-all-summary.json) | Counts from saved raw truth/key flags |
| [mixed-all-questions.json](mixed-all-questions.json) | Runner / questions / audit evidence |
| [mixed-all-raw.jsonl](mixed-all-raw.jsonl) | Canonical original rows |
| [mixed-high-raw.jsonl](mixed-high-raw.jsonl) | Exact-line arm browsing subset |
| [mixed-no-monitor-raw.jsonl](mixed-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [mixed-no-monitor-report.jsonl](mixed-no-monitor-report.jsonl) | Runner / questions / audit evidence |
| [mixed-normal-raw.jsonl](mixed-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 30. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
