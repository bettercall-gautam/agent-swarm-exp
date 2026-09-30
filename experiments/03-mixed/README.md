<!-- (instinct) Explain this early session without relabeling it as a later field-format experiment. -->
# Mixed

Original strict mixed session (historical C): 10 questions per arm.

This is an earlier experiment, separate from the later field-format tests. Model verdicts are not verified intent. Raw files retain original internal session labels for provenance; folders/files have readable names.

| File | Contents |
| --- | --- |
| [mixed-all-summary.json](results/mixed-all-summary.json) | Counts from saved raw truth/key flags |
| [mixed-all-questions.json](results/mixed-all-questions.json) | Runner / questions / audit evidence |
| [mixed-all-raw.jsonl](results/mixed-all-raw.jsonl) | Canonical original rows |
| [mixed-high-raw.jsonl](results/mixed-high-raw.jsonl) | Exact-line arm browsing subset |
| [mixed-no-monitor-raw.jsonl](results/mixed-no-monitor-raw.jsonl) | Exact-line arm browsing subset |
| [mixed-no-monitor-report.jsonl](results/mixed-no-monitor-report.jsonl) | Runner / questions / audit evidence |
| [mixed-normal-raw.jsonl](results/mixed-normal-raw.jsonl) | Exact-line arm browsing subset |

Canonical raw counts: 30. Arm subsets are duplicate views, not more runs. Do not sum them again.

The original strict runner is [shared/strict-all-script.js](../shared/strict-all-script.js). It accepts historical `--session=A/B/C` flags as aliases. No new calls were made during organization.

[Findings](../../FINDINGS.md) | [Runbook](../../RUNBOOK.md)

## Folder layout

- [scripts/](scripts/): a pointer to the shared executable code, not a duplicate.
- [results/](results/): saved questions, raw evidence, summaries and reports.

## Saved results

| Arm | Runs | Correct | Wrong-key matches |
| --- | ---: | ---: | ---: |
| normal | 10 | 6 | 4 |
| high | 10 | 5 | 5 |
| no-monitor | 10 | 5 | 5 |

These counts describe saved answers, not proof of intent. Monitor judgments are separate.
