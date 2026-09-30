<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Amnesty Threat

Amnesty/termination-threat replay (historical S5): same 90-row design; disclosure and prompt changes are in the script.

These are earlier designs, not v2/v3/no-key data. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [amnesty-all-summary.json](amnesty-all-summary.json) | Counts from saved raw truth/key flags |
| [amnesty-all-questions.json](amnesty-all-questions.json) | Runner / questions / audit evidence |
| [amnesty-all-raw.jsonl](amnesty-all-raw.jsonl) | Canonical original rows |
| [amnesty-all-report.jsonl](amnesty-all-report.jsonl) | Runner / questions / audit evidence |
| [amnesty-all-script.js](amnesty-all-script.js) | Runner / questions / audit evidence |
| [amnesty-high-raw.jsonl](amnesty-high-raw.jsonl) | Exact-line arm browsing subset |
| [amnesty-no-monitor-raw.jsonl](amnesty-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [amnesty-normal-raw.jsonl](amnesty-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../../FINDINGS.md) | [Runbook](../../../RUNBOOK.md)
