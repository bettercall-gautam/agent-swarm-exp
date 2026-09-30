<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Amnesty Threat

Amnesty/termination-threat replay (historical S5): same 90-row design; disclosure and prompt changes are in the script.

This is an earlier experiment, separate from the later field-format tests. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [amnesty-all-summary.json](results/amnesty-all-summary.json) | Counts from saved raw truth/key flags |
| [amnesty-all-questions.json](results/amnesty-all-questions.json) | Runner / questions / audit evidence |
| [amnesty-all-raw.jsonl](results/amnesty-all-raw.jsonl) | Canonical original rows |
| [amnesty-all-report.jsonl](results/amnesty-all-report.jsonl) | Runner / questions / audit evidence |
| [amnesty-all-script.js](scripts/amnesty-all-script.js) | Runner / questions / audit evidence |
| [amnesty-high-raw.jsonl](results/amnesty-high-raw.jsonl) | Exact-line arm browsing subset |
| [amnesty-no-monitor-raw.jsonl](results/amnesty-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [amnesty-normal-raw.jsonl](results/amnesty-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 90. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../FINDINGS.md) | [Runbook](../../RUNBOOK.md)

## Folder layout

- [scripts/](scripts/): executable code for this session.
- [results/](results/): saved questions, raw evidence, summaries and reports.

## Saved results

| Arm | Runs | Correct | Wrong-key matches |
| --- | ---: | ---: | ---: |
| normal | 30 | 18 | 12 |
| high | 30 | 18 | 12 |
| no-monitor | 30 | 18 | 11 |

These counts describe saved answers, not proof of intent. Monitor judgments are separate.
