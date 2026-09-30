<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Honesty

Honesty-instruction replay (historical S4): 30 questions in each of three arms, plus surprise confession and separate audit.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [honesty-all-summary.json](honesty-all-summary.json) | Counts from saved raw truth/key flags |
| [honesty-all-questions.json](honesty-all-questions.json) | Runner / questions / audit evidence |
| [honesty-all-raw.jsonl](honesty-all-raw.jsonl) | Canonical original rows |
| [honesty-all-report.jsonl](honesty-all-report.jsonl) | Runner / questions / audit evidence |
| [honesty-all-script.js](honesty-all-script.js) | Runner / questions / audit evidence |
| [honesty-high-raw.jsonl](honesty-high-raw.jsonl) | Exact-line arm browsing subset |
| [honesty-no-monitor-raw.jsonl](honesty-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [honesty-normal-raw.jsonl](honesty-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
